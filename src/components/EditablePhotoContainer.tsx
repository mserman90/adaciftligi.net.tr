import React, { useState, useRef } from 'react';
import { Camera, RotateCcw, Upload } from 'lucide-react';
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
  label,
  badge,
  children,
  onClick,
  showButtonAlways = false,
  buttonPosition = 'top-right',
  showChangeText = false,
}) => {
  const { getImage, setImage, resetImage, isCustomImage } = useFarmImages();
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentSrc = getImage(imageKey, defaultSrc);
  const isCustom = isCustomImage(imageKey);

  const handleApplyFile = (file: File) => {
    if (!file.type.startsWith('image/') && !file.name.endsWith('.jfif')) {
      alert('Lütfen geçerli bir resim dosyası seçin (.jpg, .png, .jfif, .webp)');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setImage(imageKey, result, label);
      }
    };
    reader.readAsDataURL(file);
  };

  const posClasses = {
    'top-right': 'top-3 right-3',
    'top-left': 'top-3 left-3',
    'bottom-right': 'bottom-3 right-3',
    'bottom-left': 'bottom-3 left-3',
  }[buttonPosition];

  return (
    <div
      onClick={onClick}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setIsDragging(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          handleApplyFile(e.dataTransfer.files[0]);
        }
      }}
      className={`relative overflow-hidden group transition-all duration-300 ${aspectRatio} ${
        isDragging ? 'ring-4 ring-emerald-500 ring-inset' : ''
      } ${className}`}
    >
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*,.jfif"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleApplyFile(e.target.files[0]);
            e.target.value = '';
          }
        }}
      />

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

      {/* Drag Drop Overlay */}
      {isDragging && (
        <div className="absolute inset-0 bg-emerald-950/85 backdrop-blur-xs flex flex-col items-center justify-center text-white z-30 p-4 text-center border-2 border-dashed border-emerald-400 m-1.5 rounded-2xl animate-fade-in pointer-events-none">
          <Upload className="w-8 h-8 text-emerald-300 mb-1.5 animate-bounce" />
          <p className="font-bold text-xs">Fotoğrafı Buraya Bırakın</p>
          <p className="text-[10px] text-emerald-200 mt-0.5">{label || 'Bu fotoğraf'} güncellenecektir</p>
        </div>
      )}

      {/* Optional Badge */}
      {badge && <div className="absolute top-3 left-3 z-10">{badge}</div>}

      {/* Change / Reset Photo Action Buttons */}
      <div
        className={`absolute ${posClasses} flex items-center gap-1.5 z-20 transition-opacity ${
          showButtonAlways ? 'opacity-95' : 'opacity-90 group-hover:opacity-100'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          title={`${label || 'Fotoğrafı'} değiştir (veya sürükleyip bırakın)`}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-stone-900/85 hover:bg-stone-900 text-white text-xs font-medium backdrop-blur-md border border-white/20 shadow-md transition-all active:scale-95 cursor-pointer hover:border-emerald-400"
        >
          <Camera className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          {showChangeText && <span className="text-[11px] font-medium pr-0.5">Değiştir</span>}
        </button>

        {isCustom && (
          <button
            type="button"
            onClick={() => resetImage(imageKey, label)}
            title="Varsayılan fotoğrafa geri dön"
            className="flex items-center gap-1 px-2 py-1.5 rounded-full bg-stone-900/85 hover:bg-stone-900 text-stone-200 text-xs font-medium backdrop-blur-md border border-white/20 shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3 text-stone-300" />
            <span className="hidden sm:inline text-[11px]">Sıfırla</span>
          </button>
        )}
      </div>

      {/* Extra child overlays or captions */}
      {children}
    </div>
  );
};
