#!/bin/bash
# scripts/setup-ssl.sh - Generate self-signed SSL certificates

set -e

echo "🔐 Setting up SSL certificates..."

# Create SSL directory
mkdir -p ssl

# Generate self-signed certificate
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout ssl/key.pem \
    -out ssl/cert.pem \
    -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"

# Set proper permissions
chmod 600 ssl/key.pem
chmod 644 ssl/cert.pem

echo "✅ SSL certificates generated successfully!"
echo "📁 Certificates saved to: ssl/cert.pem and ssl/key.pem"
echo "⚠️  Note: These are self-signed certificates for development/testing"
echo "   For production, replace with certificates from a trusted CA" 