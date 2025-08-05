# DEPLOYMENT_GUIDE.md - Blue-Green Deployment Setup Guide

## Blue-Green Deployment Setup Guide

This guide walks you through setting up a complete Dockerized blue-green deployment system for Sharon's website using GitHub Actions and a VPS.

## Architecture Overview

```
GitHub Repository → GitHub Actions → Docker Images → VPS → Blue/Green Environments
                                                      ↓
                                              Nginx Load Balancer
                                                      ↓
                                               Public Traffic
```

## Quick Start

### 1. VPS Setup (One-time)

**SSH into your VPS and run:**

```bash
# Upload the setup script
scp scripts/setup-vps.sh user@your-vps-ip:~/
ssh user@your-vps-ip

# Run setup script
chmod +x setup-vps.sh
./setup-vps.sh

# Log out and back in for Docker group changes
exit
ssh user@your-vps-ip
```

### 2. GitHub Repository Configuration

**Add these secrets to your GitHub repository:**

- Go to Settings → Secrets and variables → Actions
- Add the following secrets:

```
SSH_PRIVATE_KEY     = Your private SSH key content
SSH_USER            = your-vps-username  
SERVER_HOST         = your-vps-ip-address
GITHUB_TOKEN        = Your GitHub personal access token
```

### 3. Deploy

**Push to main branch or trigger manually:**

```bash
git add .
git commit -m "Setup blue-green deployment"
git push origin main
```

## Detailed Setup

### Prerequisites

- **VPS Requirements:**
  - Ubuntu 20.04+ or similar Linux distribution
  - Minimum 2GB RAM, 20GB storage
  - Root or sudo access
  - SSH key authentication setup

- **Local Requirements:**
  - SSH access to your VPS
  - GitHub repository admin access

### VPS Configuration

1. **Initial Server Setup:**

   ```bash
   # Create deployment user (if not exists)
   sudo useradd -m -s /bin/bash deploy
   sudo usermod -aG sudo deploy
   
   # Setup SSH key authentication
   sudo mkdir -p /home/deploy/.ssh
   sudo cp ~/.ssh/authorized_keys /home/deploy/.ssh/
   sudo chown -R deploy:deploy /home/deploy/.ssh
   sudo chmod 700 /home/deploy/.ssh
   sudo chmod 600 /home/deploy/.ssh/authorized_keys
   ```

2. **Run Setup Script:**
   The `scripts/setup-vps.sh` script will:
   - Install Docker and Docker Compose
   - Create project directories
   - Configure firewall
   - Setup systemd service
   - Configure log rotation
   - Create monitoring scripts

### GitHub Actions Configuration

The workflow automatically:

1. **Tests** - Runs linting and builds
2. **Builds** - Creates Docker images and pushes to GitHub Container Registry
3. **Deploys** - Uses blue-green deployment strategy
4. **Verifies** - Performs health checks
5. **Notifies** - Reports deployment status

### SSL Certificate Setup (Optional but Recommended)

**Install Certbot for Let's Encrypt:**

```bash
sudo apt install certbot
sudo certbot certonly --standalone -d your-domain.com
```

**Update nginx configuration for HTTPS:**

```nginx
server {
    listen 443 ssl;
    server_name your-domain.com;
    
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    
    # Rest of your configuration...
}

server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}
```

## Usage

### Manual Deployment

**From your VPS:**

```bash
cd ~/sharons-website
./scripts/deploy.sh deploy [version]
```

### Monitoring

**Check deployment status:**

```bash
./scripts/deploy.sh status
./scripts/deploy.sh health
./scripts/status.sh
```

**View logs:**

```bash
docker-compose -f docker-compose.prod.yml logs -f
tail -f logs/status.log
```

### Rollback

**Emergency rollback:**

```bash
./scripts/deploy.sh rollback
```

## Health Checks

The system provides multiple health check endpoints:

- `http://your-domain.com/health` - Main application health
- `http://your-domain.com/health/blue` - Blue environment health  
- `http://your-domain.com/health/green` - Green environment health

## Environment Management

### Blue-Green Switching Process

1. **Deploy to inactive environment** (e.g., if blue is active, deploy to green)
2. **Health check** the new environment
3. **Switch nginx traffic** to the new environment
4. **Final health check** to ensure everything works
5. **Stop old environment** to free resources

### Environment States

- **Blue Active**: Traffic goes to blue environment, green is standby
- **Green Active**: Traffic goes to green environment, blue is standby
- **Both Running**: During deployment, both environments run temporarily

## Troubleshooting

### Common Issues

1. **Deployment fails at health check:**

   ```bash
   # Check container logs
   docker-compose -f docker-compose.prod.yml logs app-blue
   docker-compose -f docker-compose.prod.yml logs app-green
   
   # Check if ports are accessible
   curl -f http://localhost:3001/api/health  # Blue
   curl -f http://localhost:3002/api/health  # Green
   ```

2. **Nginx can't reach containers:**

   ```bash
   # Check network connectivity
   docker network ls
   docker network inspect sharons-website_app-network
   ```

3. **GitHub Actions fails:**
   - Verify all secrets are correctly set
   - Check VPS SSH connectivity
   - Ensure user has Docker permissions

### Manual Recovery

**If deployment gets stuck:**

```bash
# Stop all containers
docker-compose -f docker-compose.prod.yml down

# Start fresh
docker-compose -f docker-compose.prod.yml up -d

# Check status
./scripts/status.sh
```

## Security Considerations

1. **Use SSH keys** (not passwords) for VPS access
2. **Limit SSH access** to specific IPs if possible
3. **Keep Docker images updated** regularly
4. **Use HTTPS** with valid SSL certificates
5. **Monitor logs** for suspicious activity
6. **Regular backups** of application data

## Performance Optimization

1. **Enable gzip compression** in nginx
2. **Set up CDN** for static assets
3. **Configure caching headers** appropriately
4. **Monitor resource usage** and scale as needed
5. **Use Docker image caching** for faster builds

## Monitoring and Alerts

The setup includes:

- **Health check endpoints** for monitoring services
- **Status monitoring script** that runs every 5 minutes
- **Log rotation** to manage disk space
- **Docker container health checks**

You can extend this with:

- **Uptime monitoring** services (UptimeRobot, Pingdom)
- **Log aggregation** (ELK stack, Grafana)
- **Alert notifications** (Slack, email, Discord)

## Backup Strategy

**Recommended backup approach:**

```bash
# Regular database backups (if applicable)
# Static file backups
# Configuration backups
tar -czf backup-$(date +%Y%m%d).tar.gz ~/sharons-website/
```

## Cost Optimization

1. **Use GitHub Container Registry** (free for public repos)
2. **Choose appropriate VPS size** (start small, scale up)
3. **Monitor resource usage** to optimize container resources
4. **Clean up old Docker images** regularly

This setup provides a professional, scalable deployment solution with zero-downtime deployments and easy rollback capabilities.
