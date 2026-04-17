#!/bin/bash
# Populate Infisical secrets for Sharon's Website from .env.local
# Run after: infisical login --domain="https://infisical.lumitra.co"
#
# Usage: bash scripts/populate-infisical.sh

set -e

PROJECT_ID="12bf305e-0146-4128-9272-2a5286a79443"
DOMAIN="https://infisical.lumitra.co"
ENV="prod"
ENV_FILE="$(dirname "$0")/../.env.local"

if [ ! -f "$ENV_FILE" ]; then
  echo "Error: $ENV_FILE not found"
  exit 1
fi

echo "=== Populating Infisical secrets from .env.local ==="
echo "Project: $PROJECT_ID | Env: $ENV"
echo ""

# Keys to import from .env.local
KEYS=(
  ADMIN_PASSWORD
  JWT_SECRET
  RESEND_API_KEY
  RESEND_AUDIENCE_ID
  OPENAI_API_KEY
)

# Build the secrets set command args
ARGS=""
while IFS='=' read -r key value; do
  # Skip comments and empty lines
  [[ "$key" =~ ^#.*$ || -z "$key" ]] && continue
  # Trim whitespace
  key=$(echo "$key" | xargs)
  # Only import keys we care about
  for k in "${KEYS[@]}"; do
    if [ "$key" = "$k" ]; then
      ARGS="$ARGS $key=$value"
      echo "  → $key"
    fi
  done
done < "$ENV_FILE"

# Add secrets not in .env.local (from GitHub Actions)
# These need to be provided manually or are already known
echo ""
echo "Setting secrets from .env.local..."
infisical secrets set \
  --projectId="$PROJECT_ID" \
  --env="$ENV" \
  --domain="$DOMAIN" \
  $ARGS \
  DATABASE_PATH="/app/data/blog.db"

echo ""
echo "Now set the remaining secrets manually (from GitHub Actions):"
echo "  infisical secrets set --projectId=$PROJECT_ID --env=$ENV --domain=$DOMAIN FROM_EMAIL=<value>"
echo "  infisical secrets set --projectId=$PROJECT_ID --env=$ENV --domain=$DOMAIN TO_EMAIL=<value>"
echo "  infisical secrets set --projectId=$PROJECT_ID --env=$ENV --domain=$DOMAIN CALCOM_WEBHOOK_SECRET=<value>"
echo ""
echo "Verify: infisical secrets list --projectId=$PROJECT_ID --env=$ENV --domain=$DOMAIN"
