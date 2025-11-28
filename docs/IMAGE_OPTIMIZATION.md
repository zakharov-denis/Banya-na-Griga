# Image Optimization Guide

## Current Problem

Many images in the gallery are **13-18MB each**, which severely impacts page load speed. A single page load could require downloading 200-300MB of images!

## Optimization Strategy

### 1. **Image Compression** (Immediate Impact)
- Compress JPEG images to 85-90% quality (often 70-80% smaller)
- Optimize PNG files with compression level 9
- Use progressive JPEG for better perceived performance

### 2. **Format Conversion** (Modern Browsers)
- Convert images to **WebP** format (30-50% smaller than JPEG)
- Keep JPEG as fallback for older browsers
- Use `<picture>` element with multiple sources

### 3. **Responsive Images** (Bandwidth Savings)
- Create multiple sizes: thumbnail, small, medium, large
- Use `srcset` to serve appropriate size based on viewport
- Mobile users get smaller images, desktop gets full quality

### 4. **Lazy Loading** (Already Implemented ✓)
- Images load only when needed
- First 4-8 images load immediately, rest load on scroll

## Implementation Steps

### Step 1: Install Dependencies

```bash
npm install --save-dev sharp
```

### Step 2: Run Optimization Script

```bash
node scripts/optimize-images.js
```

This will:
- Create optimized JPEG versions (85-90% quality)
- Create WebP versions for modern browsers
- Save optimized images to `public/images/gallery/optimized/`

### Step 3: Update Components to Use Optimized Images

Update `GallerySection.tsx` and other components to:
1. Use optimized images from `/images/gallery/optimized/`
2. Add WebP support with fallback
3. Implement responsive `srcset` for different screen sizes

## Expected Results

- **File Size Reduction**: 70-85% smaller files
- **Load Time**: 3-5x faster initial page load
- **Bandwidth**: 200-300MB → 40-60MB per page
- **User Experience**: Much faster, especially on mobile

## Manual Optimization (Alternative)

If you prefer manual optimization:

1. **Use Online Tools**:
   - [Squoosh](https://squoosh.app/) - Google's image optimizer
   - [TinyPNG](https://tinypng.com/) - PNG/JPEG compressor
   - [ImageOptim](https://imageoptim.com/) - Mac app

2. **Recommended Settings**:
   - JPEG: 85% quality, progressive
   - PNG: Compression level 9
   - WebP: 85% quality

3. **Target Sizes**:
   - Thumbnails: 300x300px
   - Mobile: 640x640px
   - Tablet: 1280x1280px
   - Desktop: 1920x1920px (max)

## Next Steps

1. ✅ Create optimization script
2. ⏳ Install sharp dependency
3. ⏳ Run optimization script
4. ⏳ Update components to use optimized images
5. ⏳ Test load performance

## Performance Monitoring

After optimization, check:
- Lighthouse Performance Score (should improve significantly)
- Network tab in DevTools (check total download size)
- Page Load Time (should be 3-5x faster)

