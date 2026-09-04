import React, { useState, useRef, useEffect } from 'react';

export interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  fallbackSrc?: string;
  aspectRatio?: string;
  onClick?: () => void;
  title?: string;
}

/**
 * Returns the corresponding .webp URL for standard image paths if available
 */
export function getWebpUrl(url: string): string {
  if (!url || url.startsWith('data:') || url.startsWith('blob:') || url.endsWith('.webp')) {
    return url;
  }
  return url.replace(/\.(jpg|jpeg|jfif|png)$/i, '.webp');
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  imgClassName = '',
  priority = false,
  fallbackSrc = '/images/hero_cows.webp',
  aspectRatio,
  onClick,
  title,
}) => {
  const [isLoaded, setIsLoaded] = useState(priority);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Sync if parent updates src
  useEffect(() => {
    setCurrentSrc(src);
    setHasError(false);
    if (!priority) {
      setIsLoaded(false);
    }
  }, [src, priority]);

  // Check if image is already cached or completed
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [currentSrc]);

  const webpSrc = getWebpUrl(currentSrc);
  const isDifferentWebp = webpSrc !== currentSrc;

  const handleError = () => {
    if (!hasError && currentSrc !== fallbackSrc) {
      setHasError(true);
      setCurrentSrc(fallbackSrc);
    }
  };

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden ${aspectRatio ? aspectRatio : ''} ${className}`}
    >
      {/* Smooth Shimmer Placeholder only when loading non-priority image */}
      {!isLoaded && !priority && (
        <div className="absolute inset-0 bg-stone-200/90 animate-pulse transition-opacity duration-300 pointer-events-none z-0" />
      )}

      <picture className="w-full h-full block">
        {isDifferentWebp && (
          <source srcSet={webpSrc} type="image/webp" />
        )}
        <img
          ref={(el) => {
            imgRef.current = el;
            if (el && el.complete && el.naturalWidth > 0) {
              setIsLoaded(true);
            }
          }}
          src={currentSrc}
          alt={alt}
          title={title}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          {...(priority ? { fetchPriority: 'high' } : {})}
          referrerPolicy="no-referrer"
          onLoad={() => setIsLoaded(true)}
          onError={handleError}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            priority || isLoaded ? 'opacity-100' : 'opacity-0'
          } ${imgClassName}`}
        />
      </picture>
    </div>
  );
};
