import React from 'react';
import { useFarmImages } from '../context/ImageContext';
import { OptimizedImage } from './OptimizedImage';

export interface EditablePhotoContainerProps {
  imageKey: string;
  defaultSrc: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  imgClassName?: string;
  label?: string;
  badge?: React.ReactNode;
  children?: React.ReactNode; // Extra overlays / captions inside container
  onClick?: () => void;
  showButtonAlways?: boolean;
  buttonPosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  showChangeText?: boolean;
}

export const EditablePhotoContainer: React.FC<EditablePhotoContainerProps> = ({
  imageKey,
  defaultSrc,
  alt,
  className = '',
  aspectRatio = 'aspect-[16/10]',
  imgClassName = '',
  badge,
  children,
  onClick,
}) => {
  const { getImage } = useFarmImages();
  const currentSrc = getImage(imageKey, defaultSrc);

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden group transition-all duration-300 ${aspectRatio} ${className}`}
    >
      {/* Main Image with WebP & Skeleton */}
      <OptimizedImage
        src={currentSrc}
        alt={alt}
        fallbackSrc={defaultSrc}
        className="w-full h-full"
        imgClassName={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${imgClassName}`}
      />

      {/* Optional Badge */}
      {badge && (
        <div data-image-badge="true" className="image-corner-badge absolute top-3 left-3 z-10">
          {badge}
        </div>
      )}

      {/* Extra child overlays or captions */}
      {children}
    </div>
  );
};

