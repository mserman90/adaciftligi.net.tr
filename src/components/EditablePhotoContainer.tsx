import React from 'react';
import { useFarmImages } from '../context/ImageContext';

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
      {/* Main Image */}
      <img
        src={currentSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-transform duration-500 ${imgClassName}`}
        referrerPolicy="no-referrer"
        loading="lazy"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          if (target.src !== defaultSrc) {
            target.src = defaultSrc;
          }
        }}
      />

      {/* Optional Badge */}
      {badge && <div className="absolute top-3 left-3 z-10">{badge}</div>}

      {/* Extra child overlays or captions */}
      {children}
    </div>
  );
};
