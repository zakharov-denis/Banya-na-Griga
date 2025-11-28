'use client';

import { useState, useRef } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  onError?: () => void;
}

/**
 * OptimizedImage component that:
 * 1. Uses WebP format when available (smaller file size)
 * 2. Falls back to original format for older browsers
 * 3. Supports responsive images with srcset
 * 4. Implements lazy loading
 * 5. Shows placeholder during loading
 * 6. Retries loading on error (up to 3 times)
 */
export function OptimizedImage({
  src,
  alt,
  className,
  style,
  loading = 'lazy',
  priority = false,
  onError: onErrorCallback,
}: OptimizedImageProps) {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const imgRef = useRef<HTMLImageElement>(null);
  const maxRetries = 3;

  // Check if path is already optimized
  const isAlreadyOptimized = src.includes('/optimized/') && src.includes('_opt');
  
  // Generate WebP version path
  const getWebPSrc = (imageSrc: string) => {
    if (isAlreadyOptimized) {
      // If already optimized, just replace extension with .webp
      return imageSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    }
    // If not optimized, generate optimized WebP path
    const pathParts = imageSrc.split('/');
    const filename = pathParts[pathParts.length - 1];
    const baseName = filename.replace(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i, '');
    const directory = pathParts.slice(0, -1).join('/');
    
    return `${directory}/optimized/${baseName}_opt.webp`;
  };

  // Get fallback image (optimized JPEG/PNG or original)
  const getFallbackSrc = (imageSrc: string) => {
    if (isAlreadyOptimized) {
      // Already optimized, use as-is
      return imageSrc;
    }
    // Generate optimized path
    const pathParts = imageSrc.split('/');
    const filename = pathParts[pathParts.length - 1];
    const ext = filename.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i)?.[0] || '.jpg';
    const baseName = filename.replace(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i, '');
    const directory = pathParts.slice(0, -1).join('/');
    
    return `${directory}/optimized/${baseName}_opt${ext.toLowerCase()}`;
  };

  const webpSrc = getWebPSrc(src);
  const fallbackSrc = getFallbackSrc(src);

  const handleLoad = () => {
    setIsLoading(false);
    setError(false);
  };

  // Use original if optimized versions don't exist or error occurred
  // Try original source if optimized fails
  const [useOriginal, setUseOriginal] = useState(false);
  const finalSrc = (error && retryCount >= maxRetries) || useOriginal ? src : fallbackSrc;
  const finalWebpSrc = (error && retryCount >= maxRetries) || useOriginal ? null : webpSrc;

  // Enhanced error handler - try original source before giving up
  const handleErrorEnhanced = () => {
    if (retryCount < maxRetries) {
      // Retry with increasing delay
      const delay = (retryCount + 1) * 500; // 500ms, 1000ms, 1500ms
      setTimeout(() => {
        setRetryCount(prev => prev + 1);
        if (imgRef.current) {
          // Force reload by changing src slightly
          const currentSrc = imgRef.current.src;
          imgRef.current.src = '';
          setTimeout(() => {
            if (imgRef.current) {
              imgRef.current.src = currentSrc;
            }
          }, 100);
        }
      }, delay);
    } else if (!useOriginal && !src.includes('/optimized/')) {
      // If optimized version failed and we haven't tried original yet, try original
      setUseOriginal(true);
      setRetryCount(0); // Reset retry count for original
      setIsLoading(true);
      if (imgRef.current) {
        imgRef.current.src = src;
      }
    } else {
      // Max retries reached and original also failed, show error state
      setError(true);
      setIsLoading(false);
      // Call parent error handler if provided
      if (onErrorCallback) {
        onErrorCallback();
      }
    }
  };

  return (
    <div className="relative w-full h-full" style={style}>
      {/* Placeholder/Skeleton during loading */}
      {isLoading && !error && (
        <div
          className={`absolute inset-0 bg-gradient-to-br from-[#3D3226]/20 via-[#2A2318]/30 to-[#3D3226]/20 ${className || ''}`}
          style={style}
        >
          <div className="absolute inset-0 flex items-center justify-center opacity-30">
            <div className="w-8 h-8 border-2 border-[#D4A574]/30 border-t-[#D4A574]/80 rounded-full animate-spin" />
          </div>
        </div>
      )}

      {/* Error placeholder - only show if both optimized and original failed */}
      {error && retryCount >= maxRetries && useOriginal && (
        <div 
          className={`absolute inset-0 bg-gradient-to-br from-[#3D3226]/40 via-[#2A2318]/50 to-[#3D3226]/40 flex items-center justify-center ${className || ''}`}
          style={style}
        >
          <div className="text-center p-4">
            <svg 
              className="w-12 h-12 mx-auto mb-2 text-[#D4A574]/40" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
            <p className="text-xs text-[#D4A574]/60">Не удалось загрузить</p>
          </div>
        </div>
      )}

      {/* Actual image */}
      <picture>
        {/* WebP source for modern browsers */}
        {finalWebpSrc && (
          <source
            srcSet={finalWebpSrc}
            type="image/webp"
          />
        )}
        {/* Fallback to optimized JPEG/PNG or original */}
        <img
          ref={imgRef}
          src={finalSrc}
          alt={alt}
          className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
          style={{ ...style, display: (error && retryCount >= maxRetries && useOriginal) ? 'none' : undefined }}
          loading={priority ? 'eager' : loading}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          onError={handleErrorEnhanced}
          onLoad={handleLoad}
        />
      </picture>
    </div>
  );
}

