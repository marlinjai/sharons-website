#!/bin/sh
set -e

PROJECT_ID="12bf305e-0146-4128-9272-2a5286a79443"
DOMAIN="https://infisical.lumitra.co"

# Login via Universal Auth (machine identity)
INFISICAL_TOKEN=$(infisical login \
  --method=universal-auth \
  --client-id="$INFISICAL_UNIVERSAL_AUTH_CLIENT_ID" \
  --client-secret="$INFISICAL_UNIVERSAL_AUTH_CLIENT_SECRET" \
  --domain "$DOMAIN" \
  --silent --plain)

# Run app with secret injection
exec infisical run \
  --env=prod \
  --projectId="$PROJECT_ID" \
  --domain "$DOMAIN" \
  --token "$INFISICAL_TOKEN" \
  -- node server.js
