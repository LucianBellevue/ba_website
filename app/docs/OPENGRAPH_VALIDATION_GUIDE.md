# OpenGraph Image Validation Guide

## ✅ What Was Fixed

### Root Layout (Main Fix)
**File**: `app/layout.tsx`
- Changed OpenGraph image from `/og-image.png` → `https://bellevueassurance.com/og-image.png`
- Changed Twitter card image to absolute URL
- Added proper alt text for better accessibility

### Individual Pages Fixed
- ✅ `app/about/page.tsx` - Added OpenGraph image
- ✅ `app/term-life-insurance/page.tsx` - Added OpenGraph image

### New Files Created
- ✅ `lib/metadata.ts` - Reusable metadata utility
- ✅ `app/opengraph-image.tsx` - Dynamic OpenGraph image generator (Next.js 13+)

## 🔍 How to Validate

### 1. Facebook Sharing Debugger
**URL**: https://developers.facebook.com/tools/debug/

**Steps**:
1. Enter: `https://bellevueassurance.com`
2. Click "Debug"
3. Click "Scrape Again" to clear cache
4. Verify image shows: **1200x630px**

**Expected Result**:
```
og:image: https://bellevueassurance.com/og-image.png
og:image:width: 1200
og:image:height: 630
og:title: Bellevue Assurance | Simplified Term Life & Final Expense Insurance
```

### 2. LinkedIn Post Inspector
**URL**: https://www.linkedin.com/post-inspector/

**Steps**:
1. Enter: `https://bellevueassurance.com`
2. Click "Inspect"
3. Check if image preview displays

### 3. Twitter Card Validator
**URL**: https://cards-dev.twitter.com/validator

**Steps**:
1. Enter: `https://bellevueassurance.com`
2. Click "Preview card"
3. Verify "summary_large_image" card type displays correctly

### 4. OpenGraph.xyz
**URL**: https://www.opengraph.xyz/

**Steps**:
1. Enter: `https://bellevueassurance.com`
2. View preview across multiple platforms
3. Check Facebook, Twitter, LinkedIn, Discord, Slack previews

## 🚨 Common Issues & Solutions

### Issue: Image Not Showing
**Cause**: Social platforms cache aggressively
**Solution**: 
- Use the "Scrape Again" or "Clear Cache" buttons on validators
- Wait 24-48 hours for cache to expire naturally
- Ensure your site is deployed and live (not localhost)

### Issue: Wrong Image Showing
**Cause**: Old cache from previous metadata
**Solution**:
1. Use Facebook Debug Tool's "Scrape Again"
2. Use LinkedIn's Post Inspector
3. Consider changing filename (e.g., og-image-v2.png)

### Issue: Image Shows Broken/404
**Cause**: Image not accessible publicly
**Solution**:
- Verify `/public/og-image.png` exists
- Check file permissions
- Ensure image is deployed to production
- Test direct URL: `https://bellevueassurance.com/og-image.png`

## 📋 Validation Checklist

Before considering this complete, verify:

- [ ] Homepage shows image in Facebook debugger
- [ ] Homepage shows image in LinkedIn inspector
- [ ] Homepage shows image in Twitter validator
- [ ] About page shows image when shared
- [ ] Term Life page shows image when shared
- [ ] Image is exactly 1200x630px (OpenGraph standard)
- [ ] Image loads at: https://bellevueassurance.com/og-image.png
- [ ] No console errors in browser dev tools
- [ ] Site is deployed (not localhost)

## 🔧 Apply to Other Pages

To add OpenGraph images to remaining pages, follow this pattern:

```tsx
import type { Metadata } from "next";
import { defaultOgImage } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Page Title",
  description: "Page description",
  alternates: {
    canonical: "/page-url",
  },
  openGraph: {
    title: "OpenGraph Title",
    description: "OpenGraph description",
    url: "https://bellevueassurance.com/page-url",
    type: "website",
    images: [defaultOgImage],
  },
};
```

## 📄 Pages That Still Need OpenGraph Images

Run this search to find pages without OpenGraph images:
```bash
# In your terminal
grep -r "openGraph:" app/ --include="*.tsx" | grep -v "images:"
```

Likely candidates:
- `/final-expense-insurance`
- `/guaranteed-issue-life-insurance`
- `/life-insurance-for-seniors`
- `/burial-insurance`
- `/quotes`
- `/get-a-quote`
- `/contact`
- `/faq`
- All state pages
- All blog posts

## 🎯 Pro Tips

### Test Locally First
Before deploying, use:
```bash
npm run dev
```
Then use ngrok or similar to expose localhost for testing:
```bash
ngrok http 3000
```
This gives you a public URL to test with validators.

### Monitor Image Size
Keep your OpenGraph image under 8MB (recommended: < 300KB)
Current `og-image.png`: ~169KB ✅

### Use Multiple Images
For different content types, create variations:
- `og-image-blog.png` - For blog posts
- `og-image-quote.png` - For quote pages
- `og-image-state.png` - For state pages

### Dynamic OpenGraph Images
The `app/opengraph-image.tsx` file can generate images on-the-fly.
It will be available at: `/opengraph-image` (Next.js 13+ feature)

## 🚀 Next Steps

1. **Deploy your changes** to production
2. **Wait 5-10 minutes** for deployment to complete
3. **Test direct image URL**: https://bellevueassurance.com/og-image.png
4. **Run validators** using the links above
5. **Clear social media caches** if needed
6. **Apply pattern** to remaining pages using `lib/metadata.ts`

## 📞 Support Resources

- [OpenGraph Protocol](https://ogp.me/)
- [Twitter Cards Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Facebook Sharing Best Practices](https://developers.facebook.com/docs/sharing/webmasters)
- [Next.js Metadata Documentation](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
