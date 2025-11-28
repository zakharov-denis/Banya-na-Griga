#!/usr/bin/env node

/**
 * Image Optimization Script
 * 
 * This script optimizes images in the gallery folder by:
 * 1. Resizing images to appropriate dimensions
 * 2. Compressing JPEG/PNG files
 * 3. Converting to WebP format (with fallback)
 * 
 * Requirements:
 * - Install sharp: npm install --save-dev sharp
 * 
 * Usage:
 * node scripts/optimize-images.js
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GALLERY_DIR = path.join(__dirname, '..', 'public', 'images', 'gallery');
const OPTIMIZED_DIR = path.join(__dirname, '..', 'public', 'images', 'gallery', 'optimized');

// Create optimized directory if it doesn't exist
if (!fs.existsSync(OPTIMIZED_DIR)) {
  fs.mkdirSync(OPTIMIZED_DIR, { recursive: true });
}

// Image size presets
const PRESETS = {
  thumbnail: { width: 300, height: 300, quality: 75 }, // For thumbnails
  small: { width: 640, height: 640, quality: 80 },    // Mobile
  medium: { width: 1280, height: 1280, quality: 82 }, // Tablet
  large: { width: 1920, height: 1920, quality: 85 },  // Desktop (reduced from 90 for better compression)
};

async function optimizeImage(inputPath, outputPath, preset) {
  try {
    const metadata = await sharp(inputPath).metadata();
    const { width, height, quality } = preset;
    
    // Check original file size - use more aggressive compression for large files
    const originalSize = fs.statSync(inputPath).size;
    const isLargeFile = originalSize > 200 * 1024; // > 200KB
    const adjustedQuality = isLargeFile ? Math.max(quality - 5, 70) : quality; // Reduce quality by 5 for large files, min 70
    
    // Calculate dimensions maintaining aspect ratio
    let targetWidth = width;
    let targetHeight = height;
    
    if (metadata.width && metadata.height) {
      const aspectRatio = metadata.width / metadata.height;
      if (metadata.width > metadata.height) {
        targetHeight = Math.round(width / aspectRatio);
      } else {
        targetWidth = Math.round(height * aspectRatio);
      }
    }
    
    // Only resize if image is larger than target
    const shouldResize = metadata.width > width || metadata.height > height;
    
    let pipeline = sharp(inputPath);
    
    if (shouldResize) {
      pipeline = pipeline.resize(targetWidth, targetHeight, {
        fit: 'inside',
        withoutEnlargement: true,
      });
    }
    
    // Optimize based on format
    const ext = path.extname(inputPath).toLowerCase();
    
    if (ext === '.png') {
      await pipeline
        .png({ 
          quality: adjustedQuality,
          compressionLevel: 9,
          adaptiveFiltering: true,
          palette: true, // Use palette for better compression
        })
        .toFile(outputPath);
    } else {
      // JPEG or JPG
      await pipeline
        .jpeg({ 
          quality: adjustedQuality,
          mozjpeg: true, // Better compression
          progressive: true, // Progressive JPEG for better perceived performance
          trellisQuantisation: true, // Better compression
          overshootDeringing: true, // Better quality
        })
        .toFile(outputPath);
    }
    
    const optimizedSize = fs.statSync(outputPath).size;
    const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
    
    const qualityNote = isLargeFile ? ' (aggressive)' : '';
    console.log(`✓ ${path.basename(inputPath)}: ${(originalSize / 1024).toFixed(0)}KB → ${(optimizedSize / 1024).toFixed(0)}KB (${savings}% saved)${qualityNote}`);
    
    return { originalSize, optimizedSize, savings };
  } catch (error) {
    console.error(`✗ Error optimizing ${inputPath}:`, error.message);
    return null;
  }
}

async function createWebP(inputPath, outputPath, preset) {
  try {
    const metadata = await sharp(inputPath).metadata();
    const { width, height, quality } = preset;
    
    let targetWidth = width;
    let targetHeight = height;
    
    if (metadata.width && metadata.height) {
      const aspectRatio = metadata.width / metadata.height;
      if (metadata.width > metadata.height) {
        targetHeight = Math.round(width / aspectRatio);
      } else {
        targetWidth = Math.round(height * aspectRatio);
      }
    }
    
    const shouldResize = metadata.width > width || metadata.height > height;
    
    let pipeline = sharp(inputPath);
    
    if (shouldResize) {
      pipeline = pipeline.resize(targetWidth, targetHeight, {
        fit: 'inside',
        withoutEnlargement: true,
      });
    }
    
    // Use more aggressive compression for large files
    const originalSize = fs.statSync(inputPath).size;
    const isLargeFile = originalSize > 200 * 1024; // > 200KB
    const adjustedQuality = isLargeFile ? Math.max(quality - 5, 70) : quality;
    const effort = isLargeFile ? 6 : 5; // Max effort for large files
    
    await pipeline
      .webp({ 
        quality: adjustedQuality,
        effort: effort, // 0-6, higher = better compression but slower
        smartSubsample: true, // Better quality
      })
      .toFile(outputPath);
    
    return true;
  } catch (error) {
    console.error(`✗ Error creating WebP ${inputPath}:`, error.message);
    return false;
  }
}

async function processAllImages() {
  const files = fs.readdirSync(GALLERY_DIR);
  const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'].includes(ext);
  });
  
  console.log(`\n📸 Found ${imageFiles.length} images to optimize\n`);
  console.log('Starting optimization...\n');
  
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  
  for (const file of imageFiles) {
    const inputPath = path.join(GALLERY_DIR, file);
    const baseName = path.parse(file).name;
    const ext = path.extname(file).toLowerCase();
    
    // Skip if already optimized
    if (file.includes('optimized') || file.includes('_opt')) {
      continue;
    }
    
    // Create optimized versions
    const optimizedJpg = path.join(OPTIMIZED_DIR, `${baseName}_opt${ext}`);
    const optimizedWebP = path.join(OPTIMIZED_DIR, `${baseName}_opt.webp`);
    
    // Use 'large' preset for gallery images (they can be viewed full-size)
    const result = await optimizeImage(inputPath, optimizedJpg, PRESETS.large);
    
    if (result) {
      totalOriginalSize += result.originalSize;
      totalOptimizedSize += result.optimizedSize;
    }
    
    // Create WebP version
    await createWebP(inputPath, optimizedWebP, PRESETS.large);
  }
  
  const totalSavings = ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1);
  
  console.log(`\n✨ Optimization complete!`);
  console.log(`📊 Total: ${(totalOriginalSize / 1024 / 1024).toFixed(2)}MB → ${(totalOptimizedSize / 1024 / 1024).toFixed(2)}MB`);
  console.log(`💰 Saved: ${totalSavings}% (${((totalOriginalSize - totalOptimizedSize) / 1024 / 1024).toFixed(2)}MB)\n`);
  console.log(`📁 Optimized images saved to: ${OPTIMIZED_DIR}\n`);
}

// Run optimization
processAllImages().catch(console.error);

