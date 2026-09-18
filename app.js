// Ada Çiftliği - Web Sitesi İnteraktif Scripti (Mobil ve Masaüstü Optimize)

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobil Menü Açma / Kapama & Dışarı Tıklayınca Kapatma
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  const toggleMobileMenu = (forceClose = false) => {
    if (!mobileMenu) return;
    const isCurrentlyOpen = !mobileMenu.classList.contains('hidden');

    if (forceClose || isCurrentlyOpen) {
      mobileMenu.classList.add('hidden');
      if (mobileBtn) {
        const icon = mobileBtn.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars text-2xl';
      }
    } else {
      mobileMenu.classList.remove('hidden');
      if (mobileBtn) {
        const icon = mobileBtn.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-xmark text-2xl';
      }
    }
  };

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });

    // Menü bağlantılarına tıklandığında menüyü kapat
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggleMobileMenu(true);
      });
    });

    // Menü açıkken sayfa içinde başka yere tıklanırsa kapat
    document.addEventListener('click', (e) => {
      if (!mobileMenu.classList.contains('hidden') && !mobileMenu.contains(e.target) && !mobileBtn.contains(e.target)) {
        toggleMobileMenu(true);
      }
    });
  }

  // 2. Navbar Scroll Efekti & Başa Dön Butonu
  const navbar = document.getElementById('navbar');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (navbar) {
      if (scrollY > 30) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    if (backToTopBtn) {
      if (scrollY > 320) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.add('opacity-100', 'pointer-events-auto');
      } else {
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.remove('opacity-100', 'pointer-events-auto');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 3. Sipariş & Bilgi Formu Gönderimi
  const orderForm = document.getElementById('order-form');
  const successAlert = document.getElementById('form-success-alert');

  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('fullName').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const selectedInterest = document.querySelector('input[name="interest"]:checked')?.value || 'Besi Danası (Simental & Şarole)';
      const message = document.getElementById('message').value.trim();

      if (!name || !phone) {
        showToast('Eksik Bilgi', 'Lütfen adınızı ve telefon numaranızı giriniz.', 'error');
        return;
      }

      // Referans Kodu Üret
      const refCode = 'ADA-' + Math.floor(100000 + Math.random() * 900000);

      // Başarı Bildirimini Göster
      if (successAlert) {
        successAlert.innerHTML = `
          <div class="flex items-center gap-2 font-bold text-sm text-emerald-900 mb-1">
            <i class="fa-solid fa-circle-check text-emerald-600 text-lg"></i>
            Sayın ${name}, Talebiniz Başarıyla Alındı!
          </div>
          <p class="text-xs text-emerald-800 leading-relaxed">
            <strong>İlgi Alanı:</strong> ${selectedInterest} <br>
            <strong>Takip Kodunuz:</strong> <span class="font-mono font-bold bg-white px-2 py-0.5 rounded border border-emerald-300 text-emerald-950">${refCode}</span> <br>
            Çiftlik yetkilimiz gün içinde <strong>${phone}</strong> numaranızdan sizinle iletişime geçecektir.
          </p>
        `;
        successAlert.classList.remove('hidden');
      }

      showToast('Talebiniz Alındı', `Referans No: ${refCode}. Çiftlik yetkilimiz sizinle iletişime geçecektir.`, 'success');
      orderForm.reset();
    });
  }

  // 4. WhatsApp Hızlı İletim Butonları
  const setupWhatsApp = (btnId) => {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    btn.addEventListener('click', () => {
      const name = document.getElementById('fullName')?.value.trim() || 'Değerli Ziyaretçi';
      const phone = document.getElementById('phone')?.value.trim() || 'Belirtilmedi';
      const selectedInterest = document.querySelector('input[name="interest"]:checked')?.value || 'Besi Danası (Simental & Şarole)';
      const message = document.getElementById('message')?.value.trim() || 'Detaylı bilgi ve fiyat teklifi almak istiyorum.';

      const waText = encodeURIComponent(
        `*Ada Çiftliği - Besi & Rezervasyon Talebi*\n\n` +
        `• *Ad Soyad:* ${name}\n` +
        `• *Telefon:* ${phone}\n` +
        `• *İlgi Alanı:* ${selectedInterest}\n` +
        `• *Mesaj:* ${message}\n\n` +
        `Adasarhanlı / Meriç / Edirne`
      );

      window.open(`https://wa.me/905323428200?text=${waText}`, '_blank');
    });
  };

  setupWhatsApp('whatsapp-send-btn');
  setupWhatsApp('whatsapp-direct-btn');

  // 5. Toast Bildirimi Fonksiyonu
  function showToast(title, message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastTitle = document.getElementById('toast-title');
    const toastMsg = document.getElementById('toast-message');

    if (!toast || !toastTitle || !toastMsg) return;

    toastTitle.textContent = title;
    toastMsg.innerHTML = message;

    toast.classList.remove('translate-y-24', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-24', 'opacity-0');
    }, 4500);
  }
});
