import React, { useState, useEffect } from 'react';
import { X, Send, Phone, MessageCircle, Sparkles, CheckCircle } from 'lucide-react';
import { FARM_CONTACT } from '../data/farmData';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProduct?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  initialProduct = 'Günlük Taze Çiğ Süt',
}) => {
  const [selectedProduct, setSelectedProduct] = useState(initialProduct);
  const [orderType, setOrderType] = useState('Toptan');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [quantity, setQuantity] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    if (initialProduct) {
      setSelectedProduct(initialProduct);
    }
  }, [initialProduct]);

  if (!isOpen) return null;

  const handleWhatsAppSend = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Merhaba Ada Çiftliği,\n*Fiyat & Bilgi Talebi*\n- İsim: ${name || 'Belirtilmedi'}\n- Telefon: ${phone || 'Belirtilmedi'}\n- Ürün: ${selectedProduct}\n- Alım Türü: ${orderType}\n- Miktar/Adet: ${quantity || 'Görüşülecek'}\n- Not: ${note || 'Yok'}\n\nDetaylı bilgi ve güncel fiyat teklifi alabilir miyim?`;
    window.open(`https://wa.me/905324122288?text=${encodeURIComponent(text)}`, '_blank');
    onClose();
  };

  return (
    <div
      id="inquiry-modal-backdrop"
      className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors"
          aria-label="Kapat"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#123c28] text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hızlı Sipariş & Bilgi Talebi</span>
          </div>
          <h3 className="text-2xl font-bold text-stone-900">
            Ada Çiftliği ile İletişime Geçin
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Meriç Adasarhanlı Köyü çiftliğimizden doğrudan güncel fiyat ve temin bilgisi alın.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleWhatsAppSend} className="space-y-4">
          {/* Order Type Toggle */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
              Alım Türü
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Toptan', 'Perakende', 'Kurbanlık'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setOrderType(type)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                    orderType === type
                      ? 'bg-[#123c28] text-white shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Product Select */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
              Ürün Seçimi
            </label>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:border-[#123c28]"
            >
              <option value="Günlük Taze Çiğ Süt">Günlük Taze Çiğ Süt (+4°C Soğuk Tank)</option>
              <option value="Damızlık & Kesimlik Koyun">Damızlık & Kesimlik Koyun (Kıvırcık)</option>
              <option value="Süt Kuzusu & Besi Kuzusu">Süt Kuzusu & Besi Kuzusu</option>
              <option value="Yüksek Verimli Süt İneği">Yüksek Verimli Süt İneği (Simental / Holstein)</option>
              <option value="Besi Danası & Canlı Kurbanlık">Besi Danası & Canlı Kurbanlık</option>
              <option value="Çiftlik Ziyareti / Genel Bilgi">Çiftlik Ziyareti / Genel Bilgi</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                Adınız Soyadınız
              </label>
              <input
                type="text"
                required
                placeholder="Örn: Mehmet Bey"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:border-[#123c28]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                Telefon Numaranız
              </label>
              <input
                type="tel"
                required
                placeholder="0532..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:border-[#123c28]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
              İstenen Miktar / Baş Sayısı (Opsiyonel)
            </label>
            <input
              type="text"
              placeholder="Örn: 200 Litre süt veya 5 kuzu"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:border-[#123c28]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
              Ek Not / Soru (Opsiyonel)
            </label>
            <textarea
              rows={2}
              placeholder="Teslimat bölgenizi veya sormak istediğiniz ayrıntıyı yazabilirsiniz..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:border-[#123c28] resize-none"
            />
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex flex-col gap-2.5">
            <button
              type="submit"
              className="w-full bg-[#123c28] hover:bg-[#0c291c] text-white font-bold py-3.5 px-5 rounded-full flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 text-sm"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp ile Anında Teklif İste</span>
            </button>

            <a
              href={`tel:${FARM_CONTACT.phoneRaw}`}
              className="w-full py-2.5 text-center text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors flex items-center justify-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#123c28]" />
              <span>veya {FARM_CONTACT.phone} numarasını doğrudan arayın</span>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};
