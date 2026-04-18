# Newsletter Setup Instructions

## Environment Variables Required

Secrets live in self-hosted Infisical at `https://infisical.lumitra.co`, project `sharons-website` (workspace `12bf305e-0146-4128-9272-2a5286a79443`, Lumitra org). The `dev` npm script wraps `next dev` with `infisical run` so secrets are injected at process start. No `.env.local` file is needed (or allowed) locally.

Secrets consumed by the newsletter flow:

```
RESEND_API_KEY
RESEND_AUDIENCE_ID
```

## How to Get These Values

1. **RESEND_API_KEY** and **RESEND_AUDIENCE_ID** are already stored in Infisical under `/dev` and `/prod`. To inspect or rotate:
   - `infisical secrets list --projectId=12bf305e-0146-4128-9272-2a5286a79443 --env=dev --domain=https://infisical.lumitra.co`
   - Or use the Infisical UI.

2. If you need to source fresh values from Resend:
   - **API key**: Resend dashboard → API Keys → copy
   - **Audience ID**: Resend dashboard → Audiences → pick or create → copy ID
   - Then `infisical secrets set <NAME>=<value> --projectId=... --env=dev --domain=...`

## Features Implemented

✅ **Resend SDK installed** - `npm install resend` completed
✅ **API Route created** - `/api/newsletter` handles subscriptions
✅ **Newsletter component updated** - Form now submits to API
✅ **Error handling** - Shows success/error messages
✅ **Loading states** - Button shows "Subscribing..." during submission
✅ **Email validation** - Client-side validation before submission
✅ **Welcome email** - Sends confirmation email to subscribers

## How to Test

1. Start your development server: `npm run dev`
2. Navigate to the newsletter section on your website
3. Enter a valid email address
4. Click "Subscribe to Newsletter"
5. Check that:
   - Success message appears
   - Email is added to your Resend audience
   - Welcome email is sent to the subscriber

## Troubleshooting Welcome Emails

If welcome emails aren't being sent, check these common issues:

### 1. Domain Verification

- Ensure your domain `returnhypnosis.com` is verified in Resend dashboard
- Check DNS records are properly configured
- Verify the "from" email domain matches your verified domain

### 2. Environment Variables

- Confirm both `RESEND_API_KEY` and `RESEND_AUDIENCE_ID` are set in Infisical `/dev`: `infisical secrets list --projectId=12bf305e-0146-4128-9272-2a5286a79443 --env=dev --domain=https://infisical.lumitra.co`
- Restart `pnpm dev` after updating secrets (the Infisical wrapper only fetches on process start)
- Check server logs for configuration errors

### 3. Test Email Functionality

Use the test endpoint to isolate email sending issues:

```bash
curl -X POST http://localhost:3000/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"email":"your-email@example.com"}'
```

### 4. Check Server Logs

Monitor your development server logs for detailed error messages:

- Look for "Newsletter subscription error" messages
- Check for API key validation errors
- Verify audience ID is valid

### 5. Common Fixes

- **Domain not verified**: Verify `returnhypnosis.com` in Resend dashboard
- **Invalid API key**: Generate new API key in Resend dashboard
- **Wrong audience ID**: Copy correct audience ID from Resend dashboard
- **Rate limits**: Check if you've exceeded Resend's sending limits

## Next Steps

- Customize the welcome email template in `/app/api/newsletter/route.ts`
- Set up email templates in Resend dashboard for future newsletters
- Consider adding unsubscribe functionality
- Add analytics tracking for newsletter performance
- Remove test endpoint (`/app/api/test-email/route.ts`) after debugging
