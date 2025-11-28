/**
 * Utility functions for image optimization
 */

/**
 * Converts an original image path to an optimized path
 * @param originalPath - Original image path (e.g., '/images/gallery/Баня 1.JPG')
 * @returns Optimized image path (e.g., '/images/gallery/optimized/Баня 1_opt.jpg')
 */
export function getOptimizedImagePath(originalPath: string): string {
  const pathParts = originalPath.split('/');
  const filename = pathParts[pathParts.length - 1];
  const ext = filename.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i)?.[0] || '.jpg';
  const baseName = filename.replace(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i, '');
  const directory = pathParts.slice(0, -1).join('/');
  
  // Convert extension to lowercase for optimized files
  const optimizedExt = ext.toLowerCase();
  
  return `${directory}/optimized/${baseName}_opt${optimizedExt}`;
}

/**
 * Gets WebP version of optimized image
 * @param originalPath - Original image path
 * @returns WebP optimized image path
 */
export function getWebPImagePath(originalPath: string): string {
  const pathParts = originalPath.split('/');
  const filename = pathParts[pathParts.length - 1];
  const baseName = filename.replace(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i, '');
  const directory = pathParts.slice(0, -1).join('/');
  
  return `${directory}/optimized/${baseName}_opt.webp`;
}

/**
 * Converts an array of original image paths to optimized paths
 * @param originalPaths - Array of original image paths
 * @returns Array of optimized image paths
 */
export function getOptimizedImagePaths(originalPaths: string[]): string[] {
  return originalPaths.map(getOptimizedImagePath);
}

