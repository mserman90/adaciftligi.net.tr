import React, { useState, useRef } from 'react';
import { MapPin, Phone, MessageCircle, Mail, Clock, Send, Sparkles, Check, ExternalLink, Camera, RotateCcw, Upload } from 'lucide-react';
import { FARM_CONTACT } from '../data/farmData';
import { useFarmImages } from '../context/ImageContext';

export const ContactSection: React.FC = () => {
  const { getImage, updateImage, resetImage, isCustomImage } = useFarmImages();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    product: 'Günlük Taze Çiğ Süt',
    quantity: '',
    note: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [dragOverFacility, setDragOverFacility] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Facility image defaults to village image if set, or facility default
  const defaultVillage = getImage('about_village', '/images/hero_barn.jpg');
  const facilityImg = getImage('contact_facility', defaultVillage);
  const isCustom = isCustomImage('contact_facility');

  const handleApplyFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Lütfen geçerli bir resim dosyası seçin (JPG, PNG, WebP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        updateImage('contact_facility', base64, 'İletişim Tesis Fotoğrafı');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Build direct WhatsApp message
    const message = `Merhaba Ada Çiftliği,\nAdım: ${formData.name || 'Belirtilmedi'}\nTelefonum: ${formData.phone || 'Belirtilmedi'}\nİlgilendiğim Ürün: ${formData.product}\nMiktar/Talep: ${formData.quantity || 'Belirtilmedi'}\nNot: ${formData.note || 'Yok'}`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/905324122288?text=${encoded}`, '_blank');
    setSubmitted(true);
  };

  return (
    <section id="iletisim" className="py-20 sm:py-28 bg-stone-50/80 border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-[#123c28] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>İletişim & Konum</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight">
            Çiftliğimizi Ziyaret Edin veya Hemen Ulaşın
          </h2>
          <p className="mt-4 text-stone-600 text-base sm:text-lg leading-relaxed">
            Edirne Meriç Adasarhanlı Köyü’ndeki tesisimize dilediğiniz gün konuk olabilir;
            canlı hayvan seçimi ve taze süt tedariği için bize her an ulaşabilirsiniz.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Contact Details & Direct Actions */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-stone-200/90 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)] space-y-6">
              <h3 className="text-xl font-bold text-stone-900 pb-4 border-b border-stone-100">
                Ada Çiftliği İletişim Bilgileri
              </h3>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#123c28] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-stone-400">Çiftlik Adresi</div>
                  <div className="text-base font-semibold text-stone-900 mt-0.5">
                    {FARM_CONTACT.village}, {FARM_CONTACT.district} / {FARM_CONTACT.province}
                  </div>
                  <div className="text-sm text-stone-600">
                    {FARM_CONTACT.fullAddress}
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#123c28] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-stone-400">Telefon Hattı</div>
                  <a
                    href={`tel:${FARM_CONTACT.phoneRaw}`}
                    className="text-base font-bold text-[#123c28] hover:underline mt-0.5 block"
                  >
                    {FARM_CONTACT.phone}
                  </a>
                  <div className="text-xs text-stone-500">Doğrudan çiftlik yetkilisi ile görüşün</div>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#123c28] shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-stone-400">WhatsApp Danışma</div>
                  <a
                    href={FARM_CONTACT.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-bold text-emerald-600 hover:underline mt-0.5 flex items-center gap-1"
                  >
                    <span>{FARM_CONTACT.whatsapp}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <div className="text-xs text-stone-500">Hızlı mesaj ve canlı fotoğraf/video talebi</div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#123c28] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-stone-400">Çalışma ve Sağım Saatleri</div>
                  <div className="text-base font-semibold text-stone-900 mt-0.5">
                    {FARM_CONTACT.workingHours}
                  </div>
                  <div className="text-xs text-stone-500">Hafta sonu dahil ziyarete ve alıma açık</div>
                </div>
              </div>
            </div>

            {/* Google Maps Location Block & Embed */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)] overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">Harita Konumu</h4>
                  <p className="text-xs text-stone-500">Meriç Adasarhanlı Köyü güzergahı</p>
                </div>
                <a
                  href="https://maps.google.com/?q=Adasarhanli+Koyu+Meric+Edirne"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#123c28] hover:underline bg-stone-100 px-3 py-1.5 rounded-full"
                >
                  <span>Google Haritalarda Aç</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Embedded interactive map iframe (No API key needed) */}
              <div className="w-full h-64 rounded-2xl overflow-hidden border border-stone-200 relative bg-stone-100">
                <iframe
                  title="Ada Çiftliği Adasarhanlı Köyü Meriç Edirne Harita Konumu"
                  src="https://maps.google.com/maps?q=Adasarhanl%C4%B1+K%C3%B6y%C3%BC,+Meri%C3%A7,+Edirne&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Hidden facility file input */}
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

              {/* Farm Facility Thumbnail & Directions Note */}
              <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOverFacility(true);
                    }}
                    onDragLeave={(e) => {
                      e.preventDefault();
                      setDragOverFacility(false);
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragOverFacility(false);
                      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                        handleApplyFile(e.dataTransfer.files[0]);
                      }
                    }}
                    className={`group relative w-20 h-14 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 shrink-0 transition-all ${
                      dragOverFacility ? 'ring-2 ring-emerald-500' : ''
                    }`}
                  >
                    <img
                      src={facilityImg}
                      alt="Ada Çiftliği Adasarhanlı Köyü Tesisleri"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/hero_cows.jpg';
                      }}
                    />

                    {/* Drag overlay */}
                    {dragOverFacility && (
                      <div className="absolute inset-0 bg-emerald-950/85 flex items-center justify-center text-white z-10">
                        <Upload className="w-4 h-4 text-emerald-300 animate-bounce" />
                      </div>
                    )}

                    {/* Quick hover change button */}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      title="Tesis fotoğrafını değiştir"
                      className="absolute inset-0 bg-stone-900/60 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <Camera className="w-4 h-4 text-white" />
                    </button>
                  </div>

                  <div className="text-xs">
                    <span className="font-semibold text-stone-900 block">Kolay Ulaşım Güzergahı:</span>
                    <span className="text-stone-500">Meriç ilçe merkezine 12 km mesafede, Adasarhanlı Köyü asfalt yolu üzerinde.</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    title="Tesis fotoğrafını değiştir"
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-medium transition-colors cursor-pointer border border-stone-200"
                  >
                    <Camera className="w-3 h-3 text-[#123c28]" />
                    <span className="hidden sm:inline">Fotoğraf</span>
                  </button>

                  {isCustom && (
                    <button
                      type="button"
                      onClick={() => resetImage('contact_facility', 'Tesis Fotoğrafı')}
                      title="Varsayılan fotoğrafa dön"
                      className="p-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 text-xs transition-colors cursor-pointer border border-stone-200"
                    >
                      <RotateCcw className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Direct Message / Order Form */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-8 sm:p-10 border border-stone-200/90 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)]">
            <h3 className="text-2xl font-bold text-stone-900 mb-2">
              Hızlı Bilgi & Fiyat Talebi Formu
            </h3>
            <p className="text-sm text-stone-600 mb-6">
              İlgilendiğiniz ürün veya talebinizi belirtin, form anında WhatsApp üzerinden çiftlik yetkilimize iletilsin.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  Adınız ve Soyadınız
                </label>
                <input
                  type="text"
                  required
                  placeholder="Örn: Ahmet Yılmaz"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:border-[#123c28] focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  Telefon Numaranız
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Örn: 0532 000 00 00"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:border-[#123c28] focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  İlgilendiğiniz Ürün / Hizmet
                </label>
                <select
                  value={formData.product}
                  onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:border-[#123c28] focus:bg-white transition-colors"
                >
                  <option value="Günlük Taze Çiğ Süt">Günlük Taze Çiğ Süt (Toptan / Perakende)</option>
                  <option value="Damızlık & Kesimlik Koyun">Damızlık & Kesimlik Koyun (Kıvırcık)</option>
                  <option value="Süt Kuzusu & Besi Kuzusu">Süt Kuzusu & Besi Kuzusu</option>
                  <option value="Besi Danası & Canlı Kurbanlık">Besi Danası & Canlı Kurbanlık Tartım</option>
                  <option value="Yüksek Verimli Süt İneği">Yüksek Verimli Süt İneği (Simental / Holstein)</option>
                  <option value="Çiftlik Ziyareti / Diğer">Çiftlik Ziyareti & Diğer Konular</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  Tahmini Miktar veya Adet
                </label>
                <input
                  type="text"
                  placeholder="Örn: Günlük 150 litre süt veya 10 baş kuzu"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:border-[#123c28] focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  Mesajınız veya Sorularınız
                </label>
                <textarea
                  rows={3}
                  placeholder="Teslimat adresi veya sormak istediğiniz ayrıntıları yazabilirsiniz..."
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:border-[#123c28] focus:bg-white transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#123c28] hover:bg-[#0c291c] text-white font-bold text-sm sm:text-base py-4 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2.5 active:scale-98"
              >
                <Send className="w-4 h-4" />
                <span>WhatsApp ile Talebi Gönder</span>
              </button>

              <p className="text-center text-xs text-stone-400 mt-2">
                Bilgileriniz doğrudan Ada Çiftliği WhatsApp hattına aktarılır; sunucuya kaydedilmez.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
