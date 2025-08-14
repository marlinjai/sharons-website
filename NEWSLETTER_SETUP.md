# Newsletter Setup Instructions

## Environment Variables Required

Create a `.env.local` file in the root directory with the following variables:

```env
RESEND_API_KEY=your_resend_api_key_here
RESEND_AUDIENCE_ID=your_audience_id_here
```

## How to Get These Values

1. **RESEND_API_KEY**:
   - Go to your Resend dashboard
   - Navigate to API Keys section
   - Copy your API key

2. **RESEND_AUDIENCE_ID**:
   - Go to your Resend dashboard
   - Navigate to Audiences section
   - Create a new audience or use an existing one
   - Copy the audience ID

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

- Ensure your domain `regressionhypnosis.com` is verified in Resend dashboard
- Check DNS records are properly configured
- Verify the "from" email domain matches your verified domain

### 2. Environment Variables

- Confirm `.env.local` contains both `RESEND_API_KEY` and `RESEND_AUDIENCE_ID`
- Restart your development server after adding environment variables
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

- **Domain not verified**: Verify `regressionhypnosis.com` in Resend dashboard
- **Invalid API key**: Generate new API key in Resend dashboard
- **Wrong audience ID**: Copy correct audience ID from Resend dashboard
- **Rate limits**: Check if you've exceeded Resend's sending limits

## Next Steps

- Customize the welcome email template in `/app/api/newsletter/route.ts`
- Set up email templates in Resend dashboard for future newsletters
- Consider adding unsubscribe functionality
- Add analytics tracking for newsletter performance
- Remove test endpoint (`/app/api/test-email/route.ts`) after debugging
