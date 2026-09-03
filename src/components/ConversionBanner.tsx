import React, { useRef, useState } from 'react';
import { MessageCircle, Phone, ArrowRight, CheckCircle2, Shield, Camera, RotateCcw, Upload } from 'lucide-react';
import { FARM_CONTACT } from '../data/farmData';
import { useFarmImages } from '../context/ImageContext';

interface ConversionBannerProps {
  onOpenInquiry: () => void;
}

export const ConversionBanner: React.FC<ConversionBannerProps> = ({ onOpenInquiry }) => {
  const { getImage, updateImage, resetImage, isCustomImage } = useFarmImages();
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const bannerImg = getImage('conversion_bg', '/images/farm_landscape.jpg');
  const isCustom = isCustomImage('conversion_bg');

  const handleApplyFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Lütfen geçerli bir resim dosyası seçin (JPG, PNG, WebP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        updateImage('conversion_bg', base64, 'Teklif Bandı Arka Planı');
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <section id="talep-bandi" className="relative bg-[#123c28] text-white py-16 sm:py-20 overflow-hidden">
      {/* Hidden file input */}
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

      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setDragOver(false);
          }}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
              handleApplyFile(e.dataTransfer.files[0]);
            }
          }}
          className={`relative bg-[#174730] border border-emerald-700/50 rounded-3xl p-8 sm:p-12 lg:p-14 shadow-2xl overflow-hidden transition-all duration-300 ${
            dragOver ? 'ring-4 ring-emerald-400 ring-inset' : ''
          }`}
        >
          {/* Subtle farm landscape background overlay */}
          <img
            src={bannerImg}
            alt="Ada Çiftliği mera manzarası"
            className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity pointer-events-none transition-all duration-700"
            referrerPolicy="no-referrer"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/hero_cows.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#174730] via-[#174730]/90 to-[#123c28]/95 pointer-events-none" />

          {/* Drag & drop overlay */}
          {dragOver && (
            <div className="absolute inset-0 bg-emerald-950/85 flex flex-col items-center justify-center text-white z-30 p-4 text-center pointer-events-none">
              <Upload className="w-10 h-10 text-emerald-300 mb-2 animate-bounce" />
              <p className="font-bold text-base">Arka Plan Fotoğrafını Buraya Bırakın</p>
            </div>
          )}

          {/* Photo change and reset buttons on top right of the banner card */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title="Teklif bandı arka plan fotoğrafını değiştir"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-900/80 hover:bg-stone-900 text-white text-xs font-medium backdrop-blur-md border border-white/20 shadow-md transition-all active:scale-95 cursor-pointer hover:border-emerald-400"
            >
              <Camera className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Fon Fotoğrafını Değiştir</span>
            </button>

            {isCustom && (
              <button
                type="button"
                onClick={() => resetImage('conversion_bg', 'Teklif Bandı Fonu')}
                title="Varsayılan arka plan fotoğrafına dön"
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-stone-900/80 hover:bg-stone-900 text-stone-200 text-xs font-medium backdrop-blur-md border border-white/20 shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3 text-stone-300" />
                <span className="hidden sm:inline">Sıfırla</span>
              </button>
            )}
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Main Message */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-900/60 border border-emerald-600/40 text-emerald-300 text-xs font-semibold tracking-wide uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Toptan & Perakende Alım Fırsatları</span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Mandıranız, Kasabınız veya Aileniz İçin Doğrudan Çiftlik Fiyatları
              </h2>

              <p className="text-emerald-100/90 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl">
                Haftalık düzenli soğuk süt tedariği, sürü bazında toptan kuzu/koyun sevkiyatı veya
                canlı baskül kurbanlık/besi danası talepleriniz için anında teklif alın.
              </p>

              {/* Guarantees */}
              <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-emerald-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Resmi İlçe Tarım Sevk Belgeli</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Hassas Dijital Baskül Tartımı</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Hızlı Trakya Lojistik Desteği</span>
                </div>
              </div>
            </div>

            {/* Action Buttons Column */}
            <div className="lg:col-span-4 flex flex-col gap-3.5">
              <button
                type="button"
                onClick={onOpenInquiry}
                className="w-full bg-white hover:bg-stone-100 text-[#123c28] font-bold text-base py-4 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2.5 active:scale-98 cursor-pointer"
              >
                <span>Hemen Fiyat Teklifi Al</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <a
                href={FARM_CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-sm sm:text-base py-3.5 px-6 rounded-full transition-all duration-200 flex items-center justify-center gap-2.5 shadow-md active:scale-98"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>WhatsApp’tan Anında Yazın</span>
              </a>

              <a
                href={`tel:${FARM_CONTACT.phoneRaw}`}
                className="w-full bg-transparent hover:bg-emerald-900/50 text-white font-medium text-xs sm:text-sm py-2.5 px-4 rounded-full border border-emerald-600/40 transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-emerald-300" />
                <span>Telefon: {FARM_CONTACT.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
