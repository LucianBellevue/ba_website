# HubSpot Integration Setup Guide

This guide explains how to connect your Bellevue Assurance website forms to HubSpot CRM for automated lead management.

## Overview

All form submissions (both the contact form and quote calculators) now automatically sync to HubSpot, creating or updating contacts with detailed information.

## What Gets Synced

### Contact Form (`LeadForm.tsx`)
- First Name, Last Name
- Phone Number
- State, Age, Gender
- Tobacco Use
- Insurance Type preference
- Additional notes
- Lead source: `contact_form`

### Quote Calculators (Term Life & Final Expense)
- First Name, Last Name
- Email Address
- Phone Number
- All quote inputs (age, gender, state, tobacco use)
- Product type (term_life or final_expense)
- Coverage amount, term length, policy style
- Lead source: `term_life_calculator` or `final_expense_calculator`
- **Bonus**: A detailed note is added to the contact with all quote details

## Setup Instructions

### Step 1: Get Your HubSpot API Key

1. Log in to your HubSpot account
2. Go to **Settings** (gear icon in top right)
3. Navigate to **Integrations** → **Private Apps**
4. Click **Create a private app**
5. Give it a name: `Bellevue Assurance Website`
6. Go to the **Scopes** tab and grant these permissions:
   - `crm.objects.contacts.write` (Create/update contacts)
   - `crm.objects.contacts.read` (Search for existing contacts)
   - `crm.objects.notes.write` (Add notes to contacts)
7. Click **Create app**
8. Copy the **Access Token** (this is your API key)

### Step 2: Configure Your Website

1. Open `.env.local` in your project root
2. Add your HubSpot API key:
   ```
   HUBSPOT_API_KEY=pat-na1-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
   ```
3. Save the file

### Step 3: Restart Your Development Server

```bash
npm run dev
```

The integration is now active!

## Custom Properties in HubSpot (Recommended)

For better organization, create these custom properties in HubSpot:

1. Go to **Settings** → **Data Management** → **Properties**
2. Select **Contact properties**
3. Create these custom fields:

| Field Name | Internal Name | Type | Description |
|------------|---------------|------|-------------|
| Tobacco Use | `tobacco_use` | Single-line text | "yes", "no", or empty |
| Insurance Type | `insurance_type` | Dropdown | "term_life", "final_expense", "burial_insurance" |
| Lead Source | `lead_source` | Dropdown | "contact_form", "term_life_calculator", "final_expense_calculator" |
| Lead ID | `lead_id` | Single-line text | Internal tracking ID |

These fields will automatically populate when leads are submitted.

## Testing the Integration

1. Submit a test lead through any form on your website
2. Check the console logs for `[HubSpot] Contact created/updated: {id}`
3. Go to HubSpot → **Contacts**
4. Find your test contact and verify all fields populated correctly

## Troubleshooting

### "API key not configured" warning
- Make sure `HUBSPOT_API_KEY` is set in `.env.local`
- Restart your dev server after adding the key

### "Contact creation failed" error
- Check that your API token has the correct scopes
- Verify the token hasn't expired
- Check HubSpot API rate limits (100 requests per 10 seconds)

### Forms submit but contacts don't appear in HubSpot
- Check the browser console for errors
- Check server logs for `[HubSpot]` messages
- Verify your HubSpot account has available contacts

## Production Deployment

When deploying to production (Vercel, Netlify, etc.):

1. Add `HUBSPOT_API_KEY` as an environment variable in your hosting platform
2. Redeploy your application
3. Test with a real submission

### Vercel
```bash
vercel env add HUBSPOT_API_KEY
```

### Netlify
Go to Site settings → Build & deploy → Environment → Add variable

## API Endpoint

The integration runs through `/api/lead` which handles both form types:

- **Basic leads**: Direct contact form submissions
- **Calculator leads**: Quote calculator submissions with detailed product info

## Features

✅ **Automatic contact creation/update**  
✅ **Duplicate detection** (searches by email if provided)  
✅ **Detailed notes** added for calculator leads  
✅ **Lead tracking** with unique IDs  
✅ **Graceful fallback** (forms work even if HubSpot is down)  
✅ **Console logging** for debugging  

## Support

For issues with:
- **HubSpot setup**: Check HubSpot documentation or contact HubSpot support
- **Website integration**: Check the code in `lib/hubspot.ts` and `app/api/lead/route.ts`
