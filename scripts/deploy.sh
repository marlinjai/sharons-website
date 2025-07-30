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
        # Switch to blue (only modify app_servers upstream, not individual upstream blocks)
        sed -i '/upstream app_servers {/,/}/ { s/# server app-blue:3000/server app-blue:3000/; s/server app-green:3000/# server app-green:3000/ }' $NGINX_CONF
    else
        # Switch to green (only modify app_servers upstream, not individual upstream blocks)
        sed -i '/upstream app_servers {/,/}/ { s/# server app-green:3000/server app-green:3000/; s/server app-blue:3000/# server app-blue:3000/ }' $NGINX_CONF
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
    
    # Check container health directly first (without nginx)
    while [ $attempt -le $max_attempts ]; do
        # Check Docker container health status
        if docker ps --format "table {{.Names}}\t{{.Status}}" | grep -q "sharons-website-$environment.*healthy"; then
            log "$environment environment container is healthy"
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
            log "Recreating nginx with SSL configuration and certificates"
            docker-compose -f $COMPOSE_FILE stop nginx
            docker-compose -f $COMPOSE_FILE rm -f nginx
            docker-compose -f $COMPOSE_FILE up -d nginx
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
    
    # Setup SSL certificates first (but don't start nginx yet)
    if [ "$SSL_ENABLED" == "true" ]; then
        log "Setting up SSL certificates"
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
        fi
    fi
    
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
    
    # Ensure current environment is running (if not already)
    if [ "$CURRENT" != "unknown" ]; then
        log "Ensuring current environment $CURRENT is running"
        APP_VERSION=$APP_VERSION docker-compose -f $COMPOSE_FILE up -d app-$CURRENT
    fi
    
    # Deploy to target environment (new version)
    log "Deploying new version to $TARGET environment"
    APP_VERSION=$APP_VERSION docker-compose -f $COMPOSE_FILE up -d --force-recreate app-$TARGET
    
    # Wait for deployment to be ready
    sleep 30
    
    # Health check target environment (container-level)
    if ! health_check $TARGET; then
        error "Health check failed for $TARGET environment"
    fi
    
    # Switch traffic to target environment (atomic switch)
    log "Switching traffic from $CURRENT to $TARGET (atomic switch)"
    switch_environment $CURRENT $TARGET
    
    # Force nginx to restart to pick up new container IPs
    log "Restarting nginx to ensure proper container connectivity"
    docker-compose -f $COMPOSE_FILE restart nginx
    
    # Wait for nginx to fully process the switch
    log "Waiting for nginx to stabilize after switch"
    sleep 15
    
    # Final health check through nginx (verify switch worked)
    log "Verifying traffic switch was successful"
    local attempts=0
    local max_attempts=6
    
    while [ $attempts -lt $max_attempts ]; do
        if curl -f -s -k "https://localhost/health" > /dev/null; then
            log "✅ Traffic switch successful - $TARGET environment serving traffic"
            break
        else
            attempts=$((attempts + 1))
            if [ $attempts -lt $max_attempts ]; then
                warn "Health check attempt $attempts/$max_attempts failed, retrying..."
                sleep 5
            else
                error "❌ Traffic switch failed after $max_attempts attempts - rolling back"
            fi
        fi
    done
    
    # Stop old environment (cleanup)
    log "Stopping old environment: $CURRENT"
    docker-compose -f $COMPOSE_FILE stop app-$CURRENT
    log "✅ Blue-green deployment completed - $TARGET is now active"
    
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