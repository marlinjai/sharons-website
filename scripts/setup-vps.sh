#!/bin/bash
# scripts/setup-vps.sh - Initial VPS setup for blue-green deployment

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

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

# Check if running as root
if [ "$EUID" -eq 0 ]; then
    error "Please don't run this script as root. Run as a regular user with sudo privileges."
fi

log "Starting VPS setup for blue-green deployment"

# Update system packages
log "Updating system packages"
sudo apt update && sudo apt upgrade -y

# Install required packages
log "Installing required packages"
sudo apt install -y \
    curl \
    wget \
    git \
    unzip \
    software-properties-common \
    apt-transport-https \
    ca-certificates \
    gnupg \
    lsb-release

# Install Docker
log "Installing Docker"
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Add user to docker group
sudo usermod -aG docker $USER

# Install Docker Compose (standalone)
log "Installing Docker Compose"
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Create project directory
log "Creating project directory"
mkdir -p ~/sharons-website/{nginx,scripts,ssl}

# Setup firewall
log "Configuring firewall"
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable

# Create systemd service for automatic startup
log "Creating systemd service"
sudo tee /etc/systemd/system/sharons-website.service > /dev/null << EOF
[Unit]
Description=Sharon's Website Blue-Green Deployment
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/home/$USER/sharons-website
ExecStart=/usr/local/bin/docker-compose -f docker-compose.prod.yml up -d
ExecStop=/usr/local/bin/docker-compose -f docker-compose.prod.yml down
TimeoutStartSec=0
User=$USER
Group=docker

[Install]
WantedBy=multi-user.target
EOF

# Enable the service
sudo systemctl enable sharons-website.service

# Setup log rotation
log "Setting up log rotation"
sudo tee /etc/logrotate.d/sharons-website > /dev/null << EOF
/home/$USER/sharons-website/logs/*.log {
    daily
    missingok
    rotate 14
    compress
    notifempty
    create 644 $USER $USER
    sharedscripts
    postrotate
        docker-compose -f /home/$USER/sharons-website/docker-compose.prod.yml exec nginx nginx -s reload 2>/dev/null || true
    endscript
}
EOF

# Create logs directory
mkdir -p ~/sharons-website/logs

# Setup SSL certificate (Let's Encrypt placeholder)
log "Setting up SSL certificate directory"
mkdir -p ~/sharons-website/nginx/ssl

# Create environment file template
log "Creating environment template"
tee ~/sharons-website/.env.template > /dev/null << EOF
# Environment Configuration Template
APP_VERSION=latest
DOMAIN=your-domain.com
EMAIL=your-email@example.com

# GitHub Container Registry
GHCR_USERNAME=your-github-username
GHCR_TOKEN=your-github-token
EOF

# Create deployment status script
log "Creating deployment status monitoring"
tee ~/sharons-website/scripts/status.sh > /dev/null << 'EOF'
#!/bin/bash
# Status monitoring script

echo "=== Sharon's Website Deployment Status ==="
echo "Date: $(date)"
echo ""

echo "=== Docker Containers ==="
docker ps --filter "name=sharons-website" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
echo ""

echo "=== Active Environment ==="
if grep -q "server app-blue:3000" nginx/nginx.conf && ! grep -q "# server app-blue:3000" nginx/nginx.conf; then
    echo "🔵 Blue environment is active"
elif grep -q "server app-green:3000" nginx/nginx.conf && ! grep -q "# server app-green:3000" nginx/nginx.conf; then
    echo "🟢 Green environment is active"
else
    echo "❓ Cannot determine active environment"
fi
echo ""

echo "=== Health Checks ==="
echo "Main application:"
curl -s -f http://localhost/health && echo " ✅ Healthy" || echo " ❌ Unhealthy"

echo "Blue environment:"
curl -s -f http://localhost/health/blue && echo " ✅ Healthy" || echo " ❌ Unhealthy"

echo "Green environment:"
curl -s -f http://localhost/health/green && echo " ✅ Healthy" || echo " ❌ Unhealthy"
echo ""

echo "=== Disk Usage ==="
df -h /
echo ""

echo "=== Memory Usage ==="
free -h
EOF

chmod +x ~/sharons-website/scripts/status.sh

# Create monitoring cron job
log "Setting up monitoring cron job"
(crontab -l 2>/dev/null; echo "*/5 * * * * cd ~/sharons-website && ./scripts/status.sh >> logs/status.log 2>&1") | crontab -

log "VPS setup completed successfully!"
log ""
log "Next steps:"
log "1. Copy your deployment files to ~/sharons-website/"
log "2. Configure your .env file based on .env.template"
log "3. Setup SSL certificates (Let's Encrypt recommended)"
log "4. Configure your GitHub repository secrets:"
log "   - SSH_PRIVATE_KEY: Your private SSH key"
log "   - SSH_USER: $USER"
log "   - SERVER_HOST: Your VPS IP address"
log "   - GITHUB_TOKEN: GitHub personal access token"
log ""
log "⚠️  Please log out and log back in for Docker group changes to take effect" 