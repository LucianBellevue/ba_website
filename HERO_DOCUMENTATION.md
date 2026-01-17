# Enhanced Hero Component Documentation

## Overview

The Hero component now supports dynamic mountainscape backgrounds with advanced features for optimal performance and visual appeal.

## Key Features

### 🖼️ Background Image Support

- **Automatic optimization** via Next.js Image component
- **Responsive sizing** with `sizes="100vw"` for optimal loading
- **Quality control** set to 85% for balance between visual quality and file size
- **Blur placeholder** for improved perceived performance
- **AVIF/WebP** automatic conversion for modern browsers

### 🎨 Dynamic Overlays

- **Customizable opacity** (default: 0.7)
- **Gradient overlay** for text readability
- **Vignette effect** for depth and focus
- **Three overlay layers** working together for professional look

### ✨ Text Masking

- **Image-based text fill** - Use the mountainscape as text background
- **Gradient fallback** - Gold-to-white gradient when no image
- **Drop shadow** for depth and readability

### 📱 Mobile Optimization

- **Automatic responsive behavior**
- **Object-fit cover** ensures proper scaling
- **Performance-first** with priority loading
- **Optimized z-index layering** for smooth rendering

## Usage Examples

### Basic Image Background

```tsx
<Hero
  variant="image"
  backgroundImage="/hero-img.jpg"
  headline="Protect Your Family's Future"
  subheadline="Simplified term life insurance"
  showCTAs={true}
/>
```

### With Text Masking Effect

```tsx
<Hero
  variant="image"
  backgroundImage="/hero-img.jpg"
  textMask={true}
  headline="Mountain Strong Protection"
  subheadline="Life insurance as solid as the peaks"
  overlayOpacity={0.7}
/>
```

### Custom Overlay Control

```tsx
<Hero
  variant="image"
  backgroundImage="/hero-img.jpg"
  overlayOpacity={0.5} // Lighter overlay for more visible image
  headline="Your Journey Starts Here"
/>
```

### Default Gradient (Original Behavior)

```tsx
<Hero
  variant="default" // or omit variant
  headline="Life Insurance Made Simple"
  showShield={true}
/>
```

## Props Reference

| Prop              | Type                                 | Default     | Description                    |
| ----------------- | ------------------------------------ | ----------- | ------------------------------ |
| `headline`        | `string`                             | required    | Main heading text              |
| `subheadline`     | `string`                             | optional    | Supporting text below headline |
| `bullets`         | `string[]`                           | optional    | Bullet point list              |
| `showCTAs`        | `boolean`                            | `true`      | Show call-to-action buttons    |
| `showShield`      | `boolean`                            | `true`      | Show shield logo (right side)  |
| `className`       | `string`                             | `""`        | Additional CSS classes         |
| `backgroundImage` | `string`                             | optional    | Path to background image       |
| `overlayOpacity`  | `number`                             | `0.7`       | Overlay opacity (0-1)          |
| `textMask`        | `boolean`                            | `false`     | Enable text masking effect     |
| `variant`         | `'default' \| 'image' \| 'gradient'` | `'default'` | Hero style variant             |

## Performance Optimizations

### Automatic Compression

Next.js Image component automatically:

- Converts to AVIF/WebP for modern browsers
- Serves appropriate sizes based on device
- Implements lazy loading (except priority images)
- Provides blur placeholder during load

### File Size Reduction

Your `hero-img.jpg` (1.08 MB) will be automatically:

- **Compressed to ~85% quality** (imperceptible quality loss)
- **Converted to WebP** (~30-40% smaller)
- **Converted to AVIF** (~50% smaller on supported browsers)
- **Served at correct dimensions** (no oversized downloads)

### Mobile-Friendly

- **Responsive breakpoints**: 640, 750, 828, 1080, 1200, 1920px
- **Mobile-first loading**: Smaller images on mobile devices
- **Optimized object-fit**: Proper cropping without distortion

## Design Tips

### Overlay Opacity Recommendations

- **0.5-0.6**: Light overlay, image-focused
- **0.7**: Balanced (default, recommended)
- **0.8-0.9**: Dark overlay, text-focused

### When to Use Text Masking

- ✅ **Good for**: Bold, impactful headlines
- ✅ **Best with**: High-contrast images (like your mountainscape)
- ❌ **Avoid**: Long text or complex layouts
- ❌ **Consider**: May be hard to read on some backgrounds

### Shield vs Image

- Use `showShield={false}` when using background images
- Background images work best in full-width layouts
- Shield works better with gradient backgrounds

## Browser Support

- **Modern browsers**: Full support (AVIF, WebP, all features)
- **Older browsers**: Graceful fallback to JPEG
- **Text masking**: Webkit prefix for Safari support included

## Example Implementation

See `components/HeroExamples.tsx` for complete working examples.
