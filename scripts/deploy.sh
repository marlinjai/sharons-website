#!/bin/bash
# scripts/deploy.sh - Blue-green deployment script

set -e

# Configuration
COMPOSE_FILE="docker-compose.prod.yml"
NGINX_CONF="nginx/nginx.conf"
NGINX_SSL_CONF="nginx/nginx-ssl.conf"
IMAGE_NAME="ghcr.io/marlinjai/sharons-website"
SSL_ENABLED=${3:-false}

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

warn() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
    exit 1
}

# Check which environment is currently active
get_active_environment() {
    if grep -q "server app-blue:3000" $NGINX_CONF && ! grep -q "# server app-blue:3000" $NGINX_CONF; then
        echo "blue"
    elif grep -q "server app-green:3000" $NGINX_CONF && ! grep -q "# server app-green:3000" $NGINX_CONF; then
        echo "green"
    else
        echo "unknown"
    fi
}

# Switch nginx configuration
switch_environment() {
    local from=$1
    local to=$2
    
    log "Switching from $from to $to environment"
    
    # Create backup of current config
    cp $NGINX_CONF "${NGINX_CONF}.backup"
    
    if [ "$to" == "blue" ]; then
        # Switch to blue
        sed -i 's/# server app-blue:3000/server app-blue:3000/' $NGINX_CONF
        sed -i 's/server app-green:3000/# server app-green:3000/' $NGINX_CONF
    else
        # Switch to green
        sed -i 's/# server app-green:3000/server app-green:3000/' $NGINX_CONF
        sed -i 's/server app-blue:3000/# server app-blue:3000/' $NGINX_CONF
    fi
    
    # Reload nginx
    docker-compose -f $COMPOSE_FILE exec nginx nginx -s reload
    log "Switched to $to environment"
}

# Health check function
health_check() {
    local environment=$1
    local max_attempts=30
    local attempt=1
    
    log "Checking health of $environment environment"
    
    while [ $attempt -le $max_attempts ]; do
        if curl -f -s -k "https://localhost/health/$environment" > /dev/null; then
            log "$environment environment is healthy"
            return 0
        fi
        
        warn "Health check attempt $attempt/$max_attempts failed for $environment"
        sleep 10
        ((attempt++))
    done
    
    error "$environment environment failed health checks"
}

# Rollback function
rollback() {
    warn "Rolling back deployment"
    if [ -f "${NGINX_CONF}.backup" ]; then
        cp "${NGINX_CONF}.backup" $NGINX_CONF
        docker-compose -f $COMPOSE_FILE exec nginx nginx -s reload
        log "Rollback completed"
    else
        error "No backup configuration found for rollback"
    fi
}

# Setup SSL if enabled
setup_ssl() {
    if [ "$SSL_ENABLED" == "true" ]; then
        log "Setting up SSL certificates"
        
        # Create SSL directory
        mkdir -p ssl
        
        # Generate self-signed certificate if not exists
        if [ ! -f "ssl/cert.pem" ] || [ ! -f "ssl/key.pem" ]; then
            log "Generating self-signed SSL certificates"
            chmod +x scripts/setup-ssl.sh
            ./scripts/setup-ssl.sh
        fi
        
        # Switch to SSL nginx config
        if [ -f "$NGINX_SSL_CONF" ]; then
            cp "$NGINX_SSL_CONF" "$NGINX_CONF"
            log "Switched to SSL nginx configuration"
            
            # Restart nginx to pick up new config and SSL certificates
            log "Restarting nginx with SSL configuration"
            docker-compose -f $COMPOSE_FILE restart nginx
        else
            warn "SSL nginx configuration not found, using default"
        fi
    fi
}

# Main deployment function
deploy() {
    # Set APP_VERSION from the second parameter
    APP_VERSION=${2:-latest}
    log "Starting blue-green deployment for version $APP_VERSION"
    
    # Setup SSL if enabled
    setup_ssl
    
    # Get current active environment
    CURRENT=$(get_active_environment)
    
    if [ "$CURRENT" == "blue" ]; then
        TARGET="green"
    elif [ "$CURRENT" == "green" ]; then
        TARGET="blue"
    else
        warn "Cannot determine current environment, defaulting to blue"
        TARGET="blue"
        CURRENT="green"
    fi
    
    log "Current environment: $CURRENT, Target environment: $TARGET"
    
    # Deploy to target environment
    log "Deploying to $TARGET environment"
    APP_VERSION=$APP_VERSION docker-compose -f $COMPOSE_FILE up -d app-$TARGET
    
    # Wait for deployment to be ready
    sleep 30
    
    # Health check target environment
    if ! health_check $TARGET; then
        error "Health check failed for $TARGET environment"
    fi
    
    # Switch traffic to target environment
    switch_environment $CURRENT $TARGET
    
    # Final health check
    sleep 10
    if ! health_check $TARGET; then
        rollback
        error "Final health check failed, deployment rolled back"
    fi
    
    # Stop old environment
    log "Stopping $CURRENT environment"
    docker-compose -f $COMPOSE_FILE stop app-$CURRENT
    
    # Cleanup old backup
    rm -f "${NGINX_CONF}.backup"
    
    log "Deployment completed successfully! $TARGET environment is now active"
}

# Script execution
case "${1:-deploy}" in
    "deploy")
        deploy
        ;;
    "rollback")
        rollback
        ;;
    "status")
        echo "Current active environment: $(get_active_environment)"
        ;;
    "health")
        health_check blue
        health_check green
        ;;
    *)
        echo "Usage: $0 {deploy|rollback|status|health} [version] [ssl_enabled]"
        echo "  version: Docker image tag (default: latest)"
        echo "  ssl_enabled: true/false (default: false)"
        exit 1
        ;;
esac 