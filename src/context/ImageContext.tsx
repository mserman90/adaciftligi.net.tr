import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Camera, RotateCcw, Upload, Check, Image as ImageIcon, X, FolderOpen, Sparkles, ExternalLink } from 'lucide-react';
import { compressUploadedImage } from '../utils/imageCompressor';

export interface ImageSlot {
  key: string;
  label: string;
  section: string;
  defaultSrc: string;
}

export interface DrivePhotoItem {
  id: string;
  name: string;
  src: string;
  title: string;
  category: string;
  description: string;
}

export const GOOGLE_DRIVE_PHOTOS: DrivePhotoItem[] = [
  {
    id: 'gdrive_milk_tank',
    name: 'Gemini_Generated_Image_ln24chln24chln24.webp',
    src: '/images/drive/Gemini_Generated_Image_ln24chln24chln24.webp',
    title: 'Süt Sağım Ünitesi & Soğuk Depolama Krom Tankı (+4.1°C)',
    category: 'Süt & Tesis',
    description: 'Vakumlu sağım sistemi, paslanmaz çelik süt tankı ve Holstein inekler.',
  },
  {
    id: 'gdrive_lamb_cuts',
    name: '027b9871-269f-464e-84c0-9843159a765b.webp',
    src: '/images/drive/027b9871-269f-464e-84c0-9843159a765b.webp',
    title: 'Trakya Kıvırcık Süt & Besi Kuzusu Taze Et Parçaları',
    category: 'Kuzu Eti',
    description: 'Ahşap masada biberiye ve kekikli pirzola, but ve kuzu parçaları.',
  },
  {
    id: 'gdrive_sheep_flock',
    name: 'Gemini_Generated_Image_p665hcp665hcp665.webp',
    src: '/images/drive/Gemini_Generated_Image_p665hcp665hcp665.webp',
    title: 'Meriç Ovası Trakya Kıvırcık Koyun & Kuzu Sürüsü',
    category: 'Kıvırcık Koyun',
    description: 'Nehir kıyısı kır çiçekli geniş merada otlayan koyun sürüsü ve çoban.',
  },
  {
    id: 'gdrive_cows_river',
    name: 'Gemini_Generated_Image_byt5yibyt5yibyt5.webp',
    src: '/images/drive/Gemini_Generated_Image_byt5yibyt5yibyt5.webp',
    title: 'Meriç Nehri Boyunda Otlayan Sütçü İnekler',
    category: 'Büyükbaş',
    description: 'Yemyeşil nehir kıyısı çayırda serbestçe otlayan inekler.',
  },
  {
    id: 'gdrive_beef_feedlot',
    name: 'Gemini_Generated_Image_dvn834dvn834dvn8.webp',
    src: '/images/drive/Gemini_Generated_Image_dvn834dvn834dvn8.webp',
    title: 'Güneşli Açık Padoklarda Besi Danaları',
    category: 'Besi Danası',
    description: 'Açık gezinti alanında doğal yemliklerden beslenen etçi besi sığırları.',
  },
  {
    id: 'gdrive_river_pasture',
    name: '0397dc1f-a0b2-416d-b580-a6e60fa3e026.webp',
    src: '/images/drive/0397dc1f-a0b2-416d-b580-a6e60fa3e026.webp',
    title: 'Meriç Kıyısı Otlak & Ot Balya Manzarası',
    category: 'Mera & Manzara',
    description: 'Nehir kenarı otlakta otlayan koyunlar ve yemyeşil Trakya doğası.',
  },
  {
    id: 'gdrive_village_facility',
    name: '23911dbc-b407-46d5-95fb-656107f0c494.webp',
    src: '/images/drive/23911dbc-b407-46d5-95fb-656107f0c494.webp',
    title: 'Edirne Meriç Adasarhanlı Köyü Tesis Alanı & Mera',
    category: 'Çiftlik & Konum',
    description: 'Ada Çiftliği Adasarhanlı köyü nehri kıyısı doğal çiftlik arazisi.',
  },
];

export const ALL_IMAGE_SLOTS: ImageSlot[] = [
  // 1. Hero
  {
    key: 'hero',
    label: 'Hero Başlık Ana Çiftlik Görseli (Meriç İnekleri)',
    section: 'Giriş (Hero)',
    defaultSrc: '/images/drive/Gemini_Generated_Image_byt5yibyt5yibyt5.webp',
  },
  // 2. Ürünler
  {
    key: 'product_koyun',
    label: 'Damızlık & Kesimlik Trakya Kıvırcık Koyunu',
    section: 'Ürünlerimiz',
    defaultSrc: '/images/drive/Gemini_Generated_Image_p665hcp665hcp665.webp',
  },
  {
    key: 'product_kuzu',
    label: 'Trakya Kıvırcık Süt & Besi Kuzusu',
    section: 'Ürünlerimiz',
    defaultSrc: '/images/drive/027b9871-269f-464e-84c0-9843159a765b.webp',
  },
  {
    key: 'product_sut',
    label: 'Günlük Taze Çiğ Çiftlik Sütü (+4°C Krom Tank)',
    section: 'Ürünlerimiz',
    defaultSrc: '/images/drive/Gemini_Generated_Image_ln24chln24chln24.webp',
  },
  {
    key: 'product_dana',
    label: 'Simental & Şarole Besi Danası (Açık Padok)',
    section: 'Ürünlerimiz',
    defaultSrc: '/images/drive/Gemini_Generated_Image_dvn834dvn834dvn8.webp',
  },
  {
    key: 'product_inek',
    label: 'Süt Verimli Gebe Düve & Süt İneği',
    section: 'Ürünlerimiz',
    defaultSrc: '/images/drive/Gemini_Generated_Image_byt5yibyt5yibyt5.webp',
  },
  // 3. Çiftlik & Hakkımızda
  {
    key: 'about_village',
    label: 'Adasarhanlı Köyü / Meriç / Edirne Doğal Mera Manzarası',
    section: 'Hakkımızda',
    defaultSrc: '/images/drive/23911dbc-b407-46d5-95fb-656107f0c494.webp',
  },
  {
    key: 'about_tank',
    label: '+4°C Krom Hijyenik Süt Soğutma Tankı',
    section: 'Hakkımızda',
    defaultSrc: '/images/drive/Gemini_Generated_Image_ln24chln24chln24.webp',
  },
  {
    key: 'about_sheep',
    label: 'Mera Kıvırcık Sürüsü (Meriç Havzası)',
    section: 'Hakkımızda',
    defaultSrc: '/images/drive/Gemini_Generated_Image_p665hcp665hcp665.webp',
  },
  // 4. Galeri
  {
    key: 'gallery_g1',
    label: 'Meriç Deltası Doğal Mera Yayılımı',
    section: 'Galeri',
    defaultSrc: '/images/drive/Gemini_Generated_Image_byt5yibyt5yibyt5.webp',
  },
  {
    key: 'gallery_g2',
    label: 'Kıvırcık Koyun ve Koç Damızlıkları',
    section: 'Galeri',
    defaultSrc: '/images/drive/Gemini_Generated_Image_p665hcp665hcp665.webp',
  },
  {
    key: 'gallery_g3',
    label: 'Trakya Kıvırcık Kuzu Eti Parçaları',
    section: 'Galeri',
    defaultSrc: '/images/drive/027b9871-269f-464e-84c0-9843159a765b.webp',
  },
  {
    key: 'gallery_g4',
    label: 'Simental Süt İnekleri & Havadar Mera',
    section: 'Galeri',
    defaultSrc: '/images/drive/Gemini_Generated_Image_byt5yibyt5yibyt5.webp',
  },
  {
    key: 'gallery_g5',
    label: 'AISI 304 Krom Süt Soğutma Tankı (+4°C)',
    section: 'Galeri',
    defaultSrc: '/images/drive/Gemini_Generated_Image_ln24chln24chln24.webp',
  },
  {
    key: 'gallery_g6',
    label: 'Besi Danaları & Açık Gezinti Padokları',
    section: 'Galeri',
    defaultSrc: '/images/drive/Gemini_Generated_Image_dvn834dvn834dvn8.webp',
  },
  // 5. Üretim Süreci
  {
    key: 'process_step_1',
    label: 'Adım 1: Doğal Otlatma & Dengeli Besleme',
    section: 'Üretim Süreci',
    defaultSrc: '/images/drive/0397dc1f-a0b2-416d-b580-a6e60fa3e026.webp',
  },
  {
    key: 'process_step_2',
    label: 'Adım 2: Otomatik Sağım & Soğuk Zincir Tankı',
    section: 'Üretim Süreci',
    defaultSrc: '/images/drive/Gemini_Generated_Image_ln24chln24chln24.webp',
  },
  {
    key: 'process_step_3',
    label: 'Adım 3: Tesis Çıkışı & Güvenli Teslimat',
    section: 'Üretim Süreci',
    defaultSrc: '/images/drive/23911dbc-b407-46d5-95fb-656107f0c494.webp',
  },
  // 6. İletişim / Harita Yanı Tesis
  {
    key: 'contact_facility',
    label: 'Ada Çiftliği Adasarhanlı Tesisleri',
    section: 'İletişim & Konum',
    defaultSrc: '/images/drive/23911dbc-b407-46d5-95fb-656107f0c494.webp',
  },
  // 7. Teklif Bandı Arka Plan
  {
    key: 'conversion_bg',
    label: 'Teklif Bandı Arka Planı (Meriç Otlağı)',
    section: 'Teklif Bandı',
    defaultSrc: '/images/drive/0397dc1f-a0b2-416d-b580-a6e60fa3e026.webp',
  },
  // 8. Müşteri Yorumları Avatarları
  {
    key: 'testimonial_1',
    label: 'Hüseyin K. (Kasap & Izgara)',
    section: 'Müşteri Yorumları',
    defaultSrc: '/images/avatar_1.webp',
  },
  {
    key: 'testimonial_2',
    label: 'Murat & Selim B. (Mandıra Üreticisi)',
    section: 'Müşteri Yorumları',
    defaultSrc: '/images/avatar_2.webp',
  },
  {
    key: 'testimonial_3',
    label: 'Erdoğan Y. (Kurbanlık Alıcısı)',
    section: 'Müşteri Yorumları',
    defaultSrc: '/images/avatar_3.webp',
  },
  {
    key: 'testimonial_4',
    label: 'Gülten H. (Aile Tüketicisi)',
    section: 'Müşteri Yorumları',
    defaultSrc: '/images/avatar_4.webp',
  },
];

interface ImageContextType {
  getImage: (key: string, fallback?: string) => string;
  setImage: (key: string, dataUrl: string, label?: string) => void;
  resetImage: (key: string, label?: string) => void;
  resetAllImages: () => void;
  isCustomImage: (key: string) => boolean;
  customCount: number;
  openPhotoManager: () => void;
  closePhotoManager: () => void;
  isPhotoManagerOpen: boolean;
  toastMessage: string | null;
  setToast: (msg: string) => void;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

const STORAGE_KEY = 'adaciftligi_unified_images_v2';

export const ImageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [images, setImages] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    if (typeof window !== 'undefined') {
      try {
        // 1. Unified storage
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          const cleaned: Record<string, string> = {};
          for (const [k, v] of Object.entries(parsed)) {
            if (typeof v === 'string' && v.trim()) {
              // Normalize old jfif/unoptimized references to webp
              cleaned[k] = v.replace(/\.(jfif)$/i, '.webp');
            }
          }
          Object.assign(initial, cleaned);
        }
      } catch (e) {
        console.warn('ImageContext init storage error', e);
      }
    }
    return initial;
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isPhotoManagerOpen, setIsPhotoManagerOpen] = useState(false);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const setToast = (msg: string) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage(msg);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  const getImage = (key: string, fallback?: string): string => {
    if (images[key]) return images[key];
    if (fallback) return fallback;
    const slot = ALL_IMAGE_SLOTS.find((s) => s.key === key);
    return slot ? slot.defaultSrc : '/images/hero_cows.jpg';
  };

  const isCustomImage = (key: string): boolean => {
    return Boolean(images[key]);
  };

  const setImage = (key: string, dataUrl: string, label?: string) => {
    setImages((prev) => {
      const updated = { ...prev, [key]: dataUrl };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn('Storage save error', e);
      }
      return updated;
    });

    const slot = ALL_IMAGE_SLOTS.find((s) => s.key === key);
    const name = label || (slot ? slot.label : 'Fotoğraf');
    setToast(`"${name}" fotoğrafı güncellendi!`);
  };

  const resetImage = (key: string, label?: string) => {
    setImages((prev) => {
      const updated = { ...prev };
      delete updated[key];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn('Storage reset error', e);
      }
      return updated;
    });

    const slot = ALL_IMAGE_SLOTS.find((s) => s.key === key);
    const name = label || (slot ? slot.label : 'Fotoğraf');
    setToast(`"${name}" varsayılan fotoğrafa döndürüldü.`);
  };

  const resetAllImages = () => {
    setImages({});
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem('adaciftligi_custom_hero_image');
      localStorage.removeItem('adaciftligi_village_image');
      localStorage.removeItem('adaciftligi_tank_image');
      localStorage.removeItem('adaciftligi_custom_images');
    } catch (e) {
      console.warn('Storage reset all error', e);
    }
    setToast('Tüm fotoğraflar varsayılana sıfırlandı.');
  };

  const customCount = Object.keys(images).length;

  return (
    <ImageContext.Provider
      value={{
        getImage,
        setImage,
        resetImage,
        resetAllImages,
        isCustomImage,
        customCount,
        openPhotoManager: () => setIsPhotoManagerOpen(true),
        closePhotoManager: () => setIsPhotoManagerOpen(false),
        isPhotoManagerOpen,
        toastMessage,
        setToast,
      }}
    >
      {children}

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#123c28] text-white px-5 py-3 rounded-2xl shadow-2xl border border-emerald-500/40 flex items-center gap-3 text-sm font-medium animate-fade-in backdrop-blur-md">
          <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
            <Check className="w-4 h-4" />
          </div>
          <span className="leading-snug">{toastMessage}</span>
        </div>
      )}
    </ImageContext.Provider>
  );
};

export const useFarmImages = () => {
  const ctx = useContext(ImageContext);
  if (!ctx) {
    throw new Error('useFarmImages must be used within an ImageProvider');
  }
  return ctx;
};

/**
 * Passive Photo Change placeholder (buttons removed per user request)
 */
export interface PhotoChangeControlProps {
  imageKey?: string;
  label?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const PhotoChangeControl: React.FC<PhotoChangeControlProps> = () => {
  return null;
};

/**
 * Full "Manage All Photos" Modal (Tüm Fotoğrafları Yönet)
 */
const PhotoManagerModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { getImage, setImage, resetImage, resetAllImages, isCustomImage, customCount } = useFarmImages();
  const [selectedSection, setSelectedSection] = useState<string>('Tümü');
  const [searchQuery, setSearchQuery] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const activeKeyRef = useRef<string | null>(null);

  const sections = ['Tümü', 'Giriş (Hero)', 'Ürünlerimiz', 'Hakkımızda', 'Galeri', 'Üretim Süreci', 'İletişim & Konum'];

  const filteredSlots = ALL_IMAGE_SLOTS.filter((slot) => {
    const matchSection = selectedSection === 'Tümü' || slot.section === selectedSection;
    const matchSearch =
      slot.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      slot.section.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSection && matchSearch;
  });

  const handleUploadClick = (key: string) => {
    activeKeyRef.current = key;
    fileInputRef.current?.click();
  };

  const handleFileSelected = async (file: File) => {
    if (!activeKeyRef.current) return;
    if (!file.type.startsWith('image/') && !file.name.endsWith('.jfif')) {
      alert('Lütfen geçerli bir resim dosyası seçin (.jpg, .png, .jfif, .webp)');
      return;
    }
    const targetKey = activeKeyRef.current;
    try {
      // Automatically compress client-side to prevent massive localStorage payload & slow loading
      const compressedDataUrl = await compressUploadedImage(file, 1600, 0.82);
      setImage(targetKey, compressedDataUrl);
    } catch {
      // Fallback to FileReader if canvas compression fails
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          setImage(targetKey, result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in overflow-y-auto">
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*,.jfif"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFileSelected(e.target.files[0]);
            e.target.value = '';
          }
        }}
      />

      <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden my-auto">
        {/* Header */}
        <div className="px-6 py-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#123c28] text-white flex items-center justify-center shadow-md">
              <Camera className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-stone-900">Çiftlik Fotoğraf Yöneticisi</h3>
              <p className="text-xs text-stone-500">
                Sitedeki tüm 19 görsel alanını bu panelden veya sayfadaki butonlardan kolayca değiştirebilirsiniz.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {customCount > 0 && (
              <button
                type="button"
                onClick={resetAllImages}
                className="px-3 py-1.5 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors cursor-pointer"
              >
                Tümünü Sıfırla ({customCount})
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Google Drive Photos Banner */}
        <div className="bg-gradient-to-r from-emerald-900 via-[#123c28] to-stone-900 p-4 sm:p-5 text-white border-b border-emerald-800/40">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3.5">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-400/30">
                <FolderOpen className="w-4 h-4" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold tracking-tight">Google Drive Fotoğraf Koleksiyonu</h4>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                    7 Gerçek Çiftlik Fotoğrafı Aktif
                  </span>
                </div>
                <p className="text-xs text-stone-300 mt-0.5">
                  Drive klasörünüzdeki fotoğraflar sitenin ana görselleri, ürünleri, süt tankı ve mera alanlarına yerleştirildi.
                </p>
              </div>
            </div>

            <a
              href="https://drive.google.com/drive/folders/1gm-NKj2BsGiV4OAgbgCdzaAIvpgbRDEE?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium backdrop-blur-xs border border-white/10 transition-colors shrink-0"
            >
              <span>Drive Klasörünü Aç</span>
              <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
            </a>
          </div>

          {/* Drive Photo Thumbnails Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 pt-2 border-t border-white/10">
            {GOOGLE_DRIVE_PHOTOS.map((dp) => (
              <div
                key={dp.id}
                className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-2 flex flex-col group transition-all"
              >
                <div className="aspect-[4/3] rounded-lg overflow-hidden relative mb-1.5 bg-black/40">
                  <img
                    src={dp.src}
                    alt={dp.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-1 left-1 px-1.5 py-0.5 bg-black/70 text-emerald-300 rounded text-[9px] font-semibold">
                    {dp.category}
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-white truncate line-clamp-1" title={dp.title}>
                  {dp.title}
                </span>
                <span className="text-[9px] text-stone-400 truncate font-mono mt-0.5">
                  {dp.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Filters & Search */}
        <div className="p-4 border-b border-stone-100 bg-white flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {sections.map((sec) => (
              <button
                key={sec}
                type="button"
                onClick={() => setSelectedSection(sec)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedSection === sec
                    ? 'bg-[#123c28] text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {sec}
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="Fotoğraf ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3.5 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 w-48 sm:w-60"
          />
        </div>

        {/* Image Grid */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 bg-stone-50/50">
          {filteredSlots.map((slot) => {
            const currentSrc = getImage(slot.key, slot.defaultSrc);
            const isCustom = isCustomImage(slot.key);

            return (
              <div
                key={slot.key}
                className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="relative aspect-[16/10] bg-stone-100 overflow-hidden group">
                  <img
                    src={currentSrc}
                    alt={slot.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = slot.defaultSrc;
                    }}
                  />
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-stone-900/80 text-white rounded-md text-[10px] font-semibold backdrop-blur-xs">
                    {slot.section}
                  </div>

                  {isCustom && (
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-emerald-600 text-white rounded-md text-[10px] font-bold shadow-xs">
                      Özel Fotoğraf
                    </div>
                  )}
                </div>

                <div className="p-3.5 flex-1 flex flex-col justify-between">
                  <div className="mb-3">
                    <h4 className="text-xs font-bold text-stone-900 line-clamp-1">{slot.label}</h4>
                    <p className="text-[11px] text-stone-500 mt-0.5 font-mono">{slot.key}</p>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-stone-100">
                    <button
                      type="button"
                      onClick={() => handleUploadClick(slot.key)}
                      className="flex-1 py-1.5 px-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Değiştir</span>
                    </button>

                    {isCustom && (
                      <button
                        type="button"
                        onClick={() => resetImage(slot.key, slot.label)}
                        className="py-1.5 px-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium flex items-center justify-center gap-1 transition-colors cursor-pointer"
                        title="Varsayılana sıfırla"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Sıfırla</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-stone-100 bg-white flex items-center justify-between text-xs text-stone-500">
          <span>Toplam {filteredSlots.length} görsel alanı gösteriliyor</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-semibold transition-colors cursor-pointer"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
