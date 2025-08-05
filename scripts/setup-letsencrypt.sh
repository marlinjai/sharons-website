#!/bin/bash
# scripts/setup-letsencrypt.sh - Setup Let's Encrypt SSL certificates

set -e

# Configuration
DOMAIN=${1:-""}
EMAIL=${2:-"admin@example.com"}

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

# Check if domain is provided
if [ -z "$DOMAIN" ]; then
    error "Domain name is required. Usage: $0 <domain> [email]"
fi

log "Setting up Let's Encrypt SSL for domain: $DOMAIN"

# Install certbot if not installed
if ! command -v certbot &> /dev/null; then
    log "Installing certbot..."
    sudo apt update
    sudo apt install -y certbot
fi

# Create SSL directory
mkdir -p ssl

# Stop nginx temporarily for certificate generation
log "Stopping nginx for certificate generation..."
docker-compose -f docker-compose.prod.yml stop nginx

# Generate Let's Encrypt certificate
log "Generating Let's Encrypt certificate..."
sudo certbot certonly --standalone \
    --email "$EMAIL" \
    --agree-tos \
    --no-eff-email \
    --domains "$DOMAIN" \
    --cert-path /etc/letsencrypt/live/$DOMAIN/fullchain.pem \
    --key-path /etc/letsencrypt/live/$DOMAIN/privkey.pem

# Copy certificates to project directory
log "Copying certificates to project directory..."
sudo cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem ssl/cert.pem
sudo cp /etc/letsencrypt/live/$DOMAIN/privkey.pem ssl/key.pem
sudo chown $USER:$USER ssl/cert.pem ssl/key.pem
chmod 600 ssl/key.pem
chmod 644 ssl/cert.pem

# Create Let's Encrypt nginx config
log "Creating Let's Encrypt nginx configuration..."
cat > nginx/nginx-letsencrypt.conf << EOF
# nginx/nginx-letsencrypt.conf - Let's Encrypt SSL configuration
events {
    worker_connections 1024;
}

http {
    upstream app_servers {
        server app-blue:3000 max_fails=3 fail_timeout=30s;
    }

    upstream blue_upstream {
        server app-blue:3000 max_fails=3 fail_timeout=30s;
    }

    upstream green_upstream {
        server app-green:3000 max_fails=3 fail_timeout=30s;
    }

    limit_req_zone \$binary_remote_addr zone=api:10m rate=10r/s;

    # HTTP to HTTPS redirect
    server {
        listen 80;
        server_name $DOMAIN;
        return 301 https://\$server_name\$request_uri;
    }

    # HTTPS server with Let's Encrypt
    server {
        listen 443 ssl http2;
        server_name $DOMAIN;

        # Let's Encrypt SSL configuration
        ssl_certificate /etc/nginx/ssl/cert.pem;
        ssl_certificate_key /etc/nginx/ssl/key.pem;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384;
        ssl_prefer_server_ciphers off;
        ssl_session_cache shared:SSL:10m;
        ssl_session_timeout 10m;

        # Security headers
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

        # Health check endpoint
        location /health {
            access_log off;
            proxy_pass http://app_servers/api/health;
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto \$scheme;
        }

        # Blue environment health check
        location /health/blue {
            access_log off;
            proxy_pass http://blue_upstream/api/health;
            proxy_set_header Host \$host;
        }

        # Green environment health check
        location /health/green {
            access_log off;
            proxy_pass http://green_upstream/api/health;
            proxy_set_header Host \$host;
        }

        # API endpoints with rate limiting
        location ~ ^/api/ {
            limit_req zone=api burst=20 nodelay;
            proxy_pass http://app_servers;
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto \$scheme;
        }

        # Main application traffic
        location / {
            proxy_pass http://app_servers;
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto \$scheme;
        }

        # Static assets caching
        location /_next/static/ {
            proxy_pass http://app_servers;
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
EOF

# Start nginx with new configuration
log "Starting nginx with Let's Encrypt configuration..."
cp nginx/nginx-letsencrypt.conf nginx/nginx.conf
docker-compose -f docker-compose.prod.yml up -d nginx

# Setup auto-renewal
log "Setting up certificate auto-renewal..."
sudo crontab -l 2>/dev/null | { cat; echo "0 12 * * * /usr/bin/certbot renew --quiet && cd /home/deploy/sharons-website && sudo cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem ssl/cert.pem && sudo cp /etc/letsencrypt/live/$DOMAIN/privkey.pem ssl/key.pem && sudo chown deploy:deploy ssl/cert.pem ssl/key.pem && docker-compose -f docker-compose.prod.yml exec nginx nginx -s reload"; } | sudo crontab -

log "✅ Let's Encrypt SSL setup completed!"
log "🌐 Your site is now available at: https://$DOMAIN"
log "🔄 Certificates will auto-renew daily at 12:00 PM" 