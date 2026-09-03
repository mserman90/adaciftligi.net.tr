import React, { useState } from 'react';
import { Lock, User, KeyRound, Eye, EyeOff, ShieldCheck, X, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';
import { checkAdminCredentials, saveAdminSession } from '../utils/adminAuth';

interface AdminLoginModalProps {
  lang?: 'tr' | 'en';
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (username: string) => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  lang = 'tr',
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('ada2024');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    setTimeout(() => {
      const result = checkAdminCredentials(username, password);
      if (result.ok) {
        saveAdminSession(username);
        setIsSubmitting(false);
        onLoginSuccess(username);
        onClose();
      } else {
        setError(result.message || 'Giriş başarısız. Lütfen bilgilerinizi kontrol ediniz.');
        setIsSubmitting(false);
      }
    }, 250);
  };

  const handleQuickFill = () => {
    setUsername('admin');
    setPassword('ada2024');
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-[#FCFBF6] rounded-2xl shadow-2xl border border-[#DCD7C4] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner */}
        <div className="bg-[#22452B] text-white px-6 py-5 relative border-b-2 border-[#B98A2B]">
          <button
            type="button"
            onClick={onClose}
            aria-label="Kapat"
            className="absolute top-4 right-4 p-1.5 rounded-full text-stone-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F3F1E4]/10 border border-[#F3F1E4]/20 flex items-center justify-center text-[#E9D9A8] shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono tracking-wider uppercase text-[#E9D9A8] font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Yetkili Erişimi
              </span>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Ada Çiftliği Yönetici Girişi
              </h2>
            </div>
          </div>
          <p className="text-xs text-[#E6EBDD] mt-2 opacity-90 leading-relaxed">
            Rasyon formülasyonu, sürü zootekni planlaması ve ekonomik analiz platformuna erişmek için kimliğinizi doğrulayınız.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="leading-snug">{error}</div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
              {lang === 'en' ? 'Admin Username' : 'Yönetici Kullanıcı Adı'}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="admin"
                className="w-full pl-9 pr-3 py-2.5 bg-white border border-stone-300 rounded-xl text-stone-900 text-sm focus:ring-2 focus:ring-[#2E5B39] focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                Yönetici Şifresi
              </label>
              <button
                type="button"
                onClick={handleQuickFill}
                className="text-[11px] text-[#2E5B39] hover:underline font-medium inline-flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-3 h-3 text-[#B98A2B]" />
                Örnek Giriş Bilgileri
              </button>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Şifreniz"
                className="w-full pl-9 pr-10 py-2.5 bg-white border border-stone-300 rounded-xl text-stone-900 text-sm focus:ring-2 focus:ring-[#2E5B39] focus:border-transparent outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-600 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Demo credential hint box */}
          <div className="p-3 bg-stone-100 rounded-xl border border-stone-200 text-stone-600 text-xs flex items-center justify-between">
            <span className="text-[11px]">
              Varsayılan Giriş: <strong>admin</strong> / <strong>ada2024</strong>
            </span>
            <button
              type="button"
              onClick={handleQuickFill}
              className="text-[11px] px-2 py-1 bg-white hover:bg-stone-200 border border-stone-300 rounded font-semibold text-stone-700 transition-colors cursor-pointer"
            >
              Uygula
            </button>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-[#22452B] hover:bg-[#18331f] text-white font-semibold rounded-xl text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              <span>{isSubmitting ? 'Doğrulanıyor...' : 'Giriş Yap ve Rasyon Sistemine Geç'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="text-center pt-1">
            <button
              type="button"
              onClick={onClose}
              className="text-xs text-stone-500 hover:text-stone-800 underline transition-colors cursor-pointer"
            >
              Çiftlik Tanıtım Sitesine Geri Dön
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
