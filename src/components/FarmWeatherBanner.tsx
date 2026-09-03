import React, { useState, useEffect } from 'react';
import {
  Sun,
  CloudSun,
  Cloud,
  CloudRain,
  CloudDrizzle,
  CloudLightning,
  CloudSnow,
  Wind,
  Droplets,
  Thermometer,
  Activity,
  CheckCircle2,
  Clock,
  RefreshCw,
  Info,
  X,
  MapPin,
  Sparkles,
  AlertTriangle,
  ChevronRight,
  ShieldCheck,
  PhoneCall,
  MessageCircle,
} from 'lucide-react';
import { FarmWeatherData } from '../types';
import { fetchMericWeather } from '../utils/weatherService';
import { FARM_CONTACT } from '../data/farmData';

interface FarmWeatherBannerProps {
  lang?: 'tr' | 'en';
  onOpenInquiry?: (productName?: string) => void;
  compact?: boolean;
}

export const FarmWeatherBanner: React.FC<FarmWeatherBannerProps> = ({
  onOpenInquiry,
  compact = false,
  lang = 'tr',
}) => {
  const [weatherData, setWeatherData] = useState<FarmWeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const loadWeather = async (force: boolean = false) => {
    if (force) setRefreshing(true);
    try {
      const data = await fetchMericWeather(force);
      setWeatherData(data);
    } catch (err) {
      console.error('Failed to load weather:', err);
    } finally {
      setLoading(false);
      if (force) {
        setTimeout(() => setRefreshing(false), 500);
      }
    }
  };

  useEffect(() => {
    loadWeather();
    // Auto-refresh weather every 10 minutes
    const interval = setInterval(() => {
      loadWeather(true);
    }, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (code?: number, isDay: boolean = true) => {
    if (code === undefined) return <Sun className="w-4 h-4 text-amber-400" />;
    if (code === 0 || code === 1) return <Sun className="w-4 h-4 text-amber-400" />;
    if (code === 2) return <CloudSun className="w-4 h-4 text-amber-300" />;
    if (code === 3 || code === 45 || code === 48) return <Cloud className="w-4 h-4 text-stone-300" />;
    if (code >= 51 && code <= 57) return <CloudDrizzle className="w-4 h-4 text-sky-300" />;
    if (code >= 61 && code <= 67) return <CloudRain className="w-4 h-4 text-sky-300" />;
    if (code >= 71 && code <= 77) return <CloudSnow className="w-4 h-4 text-blue-200" />;
    if (code >= 80 && code <= 82) return <CloudRain className="w-4 h-4 text-sky-400" />;
    if (code >= 95) return <CloudLightning className="w-4 h-4 text-amber-300" />;
    return <Sun className="w-4 h-4 text-amber-400" />;
  };

  if (!weatherData && loading) {
    return (
      <aside
        aria-label="Meriç Çiftlik Hava Durumu Yükleniyor"
        className="w-full bg-[#0d2a1c] text-emerald-100/70 text-xs py-1.5 px-4 border-b border-emerald-900/50 flex items-center justify-center gap-2"
      >
        <RefreshCw className="w-3 h-3 animate-spin text-emerald-400" />
        <span>{lang === 'en' ? 'Checking current weather and pasture conditions in Meric region...' : 'Meriç bölgesi güncel hava ve mera durumu kontrol ediliyor...'}</span>
      </aside>
    );
  }

  if (!weatherData) return null;

  const isPastureOpen = weatherData.pastureStatus === 'open';
  const isPastureRestricted = weatherData.pastureStatus === 'restricted';

  return (
    <>
      {/* Top Banner Bar */}
      <aside
        id="farm-weather-banner"
        aria-label="Ada Çiftliği Canlı Mera ve Hava Durumu Bandı"
        className={`w-full bg-[#0b2418] text-stone-100 border-b border-emerald-900/60 text-xs transition-all duration-300 ${
          compact ? 'py-1.5 px-3' : 'py-2 px-3 sm:px-4'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4 flex-wrap sm:flex-nowrap">
          {/* Left: Location & Live Weather */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="flex items-center gap-1.5 text-emerald-200 font-semibold tracking-wide">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] uppercase tracking-wider text-emerald-300 hidden md:inline">
                Canlı Çiftlik Raporu:
              </span>
              <span className="inline-flex items-center gap-1 text-white font-medium">
                <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                {lang === 'en' ? 'Meric, Edirne' : 'Meriç, Edirne'}
              </span>
            </div>

            <span className="text-emerald-800/80 hidden sm:inline">|</span>

            {/* Weather Metric */}
            <div className="flex items-center gap-1.5 text-stone-200">
              {getWeatherIcon(weatherData.weatherCode, weatherData.isDay)}
              <span className="font-bold text-white tracking-tight">
                {weatherData.temperature}°C
              </span>
              <span className="text-stone-300 hidden sm:inline">
                {weatherData.weatherDescription}
              </span>
              <span className="text-emerald-300/60 hidden lg:inline text-[11px]">
                ({lang === 'en' ? 'Humidity:' : 'Nem:'} %{weatherData.humidity} · {lang === 'en' ? 'Wind:' : 'Rüzgar:'} {weatherData.windSpeed} km/s)
              </span>
            </div>
          </div>

          {/* Center / Right: Pasture & Farm Activity Badge */}
          <div className="flex items-center gap-2 sm:gap-3 ml-auto sm:ml-0 shrink-0">
            {/* Pasture Status Badge */}
            <button
              onClick={() => setIsModalOpen(true)}
              className={`group inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold border transition-all cursor-pointer shadow-xs ${
                isPastureOpen
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-600/60 hover:bg-emerald-900/90 hover:border-emerald-500'
                  : isPastureRestricted
                  ? 'bg-amber-950/80 text-amber-300 border-amber-600/60 hover:bg-amber-900/90 hover:border-amber-500'
                  : 'bg-rose-950/80 text-rose-300 border-rose-600/60 hover:bg-rose-900/90 hover:border-rose-500'
              }`}
              title="Mera ve otlatma detaylarını inceleyin"
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isPastureOpen
                    ? 'bg-emerald-400 animate-pulse'
                    : isPastureRestricted
                    ? 'bg-amber-400'
                    : 'bg-rose-400'
                }`}
              />
              <span>
                {isPastureOpen
                  ? lang === 'en' ? 'Pasture Open: Free Grazing' : 'Mera Açık: Serbest Otlatma'
                  : isPastureRestricted
                  ? lang === 'en' ? 'Protected Pasture Grazing' : 'Korumalı Mera Otlatması'
                  : 'Mera Kapalı: Barınak Besisi'}
              </span>
              <ChevronRight className="w-3 h-3 text-emerald-400/80 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Quick Milking status (hidden on small mobile to save space) */}
            <span className="hidden xl:inline-flex items-center gap-1 text-[11px] text-stone-300">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>Süt Sağımı Tamamlandı (+3.8°C Tank)</span>
            </span>

            {/* Action buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => loadWeather(true)}
                disabled={refreshing}
                title="Hava durumunu ve faaliyetleri şimdi yenile"
                className="p-1 rounded-md text-emerald-300/80 hover:text-white hover:bg-emerald-900/60 transition-colors focus:outline-none"
                aria-label="Verileri yenile"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-emerald-400' : ''}`}
                />
              </button>

              <button
                onClick={() => setIsModalOpen(true)}
                className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] text-emerald-200 hover:text-white bg-emerald-900/50 hover:bg-emerald-800/70 border border-emerald-700/50 transition-colors"
              >
                <Info className="w-3 h-3" />
                <span>Faaliyet Raporu</span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Farm Activity & Weather Details Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-900/70 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl border border-stone-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative text-stone-800"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="farm-status-modal-title"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
              aria-label="Kapat"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-start gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#123c28] text-white flex items-center justify-center shrink-0 shadow-sm">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {lang === 'en' ? 'Meric / Edirne Live Report' : 'Meriç / Edirne Canlı Rapor'}
                  </span>
                  <span className="text-xs text-stone-400">
                    Güncellendi: {weatherData.lastUpdated}
                  </span>
                </div>
                <h3
                  id="farm-status-modal-title"
                  className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight"
                >
                  Ada Çiftliği Günlük Faaliyet ve Mera Durumu
                </h3>
              </div>
            </div>

            {/* Weather Conditions Card */}
            <div className="bg-stone-50 rounded-xl p-4 sm:p-5 border border-stone-200/80 mb-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#123c28]" />
                  {lang === 'en' ? 'Meric Region Instant Meteorology Data' : 'Meriç Bölgesi Anlık Meteoroloji Verileri'}
                </h4>
                <button
                  onClick={() => loadWeather(true)}
                  disabled={refreshing}
                  className="text-xs text-emerald-700 hover:text-emerald-900 flex items-center gap-1 font-medium"
                >
                  <RefreshCw className={`w-3 h-3 ${refreshing ? 'animate-spin' : ''}`} />
                  <span>Yenile</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white p-3 rounded-lg border border-stone-200/60 shadow-2xs">
                  <div className="text-stone-400 text-xs flex items-center gap-1 mb-1">
                    <Thermometer className="w-3.5 h-3.5 text-amber-600" />
                    <span>Sıcaklık</span>
                  </div>
                  <div className="text-xl font-extrabold text-stone-900">
                    {weatherData.temperature}°C
                  </div>
                  <div className="text-[11px] text-stone-500">
                    Hissedilen: {weatherData.apparentTemperature}°C
                  </div>
                </div>

                <div className="bg-white p-3 rounded-lg border border-stone-200/60 shadow-2xs">
                  <div className="text-stone-400 text-xs flex items-center gap-1 mb-1">
                    {getWeatherIcon(weatherData.weatherCode, weatherData.isDay)}
                    <span>Gökyüzü</span>
                  </div>
                  <div className="text-sm font-bold text-stone-900 truncate">
                    {weatherData.weatherDescription}
                  </div>
                  <div className="text-[11px] text-stone-500">
                    {weatherData.isDay ? 'Gündüz Dönemi' : 'Gece Dönemi'}
                  </div>
                </div>

                <div className="bg-white p-3 rounded-lg border border-stone-200/60 shadow-2xs">
                  <div className="text-stone-400 text-xs flex items-center gap-1 mb-1">
                    <Droplets className="w-3.5 h-3.5 text-sky-600" />
                    <span>Bağıl {lang === 'en' ? 'Humidity' : 'Nem'}</span>
                  </div>
                  <div className="text-xl font-extrabold text-stone-900">
                    %{weatherData.humidity}
                  </div>
                  <div className="text-[11px] text-stone-500">
                    {lang === 'en' ? 'Precipitation:' : 'Yağış:'} {weatherData.precipitation} mm
                  </div>
                </div>

                <div className="bg-white p-3 rounded-lg border border-stone-200/60 shadow-2xs">
                  <div className="text-stone-400 text-xs flex items-center gap-1 mb-1">
                    <Wind className="w-3.5 h-3.5 text-teal-600" />
                    <span>{lang === 'en' ? 'Wind Speed' : 'Rüzgar Hızı'}</span>
                  </div>
                  <div className="text-xl font-extrabold text-stone-900">
                    {weatherData.windSpeed}{' '}
                    <span className="text-xs font-normal text-stone-500">km/s</span>
                  </div>
                  <div className="text-[11px] text-stone-500">{lang === 'en' ? 'Meric River Breeze' : 'Meriç Nehri Esintisi'}</div>
                </div>
              </div>
            </div>

            {/* Pasture Status Feature Box */}
            <div
              className={`rounded-xl p-5 border mb-6 ${
                isPastureOpen
                  ? 'bg-emerald-50/70 border-emerald-200'
                  : isPastureRestricted
                  ? 'bg-amber-50/70 border-amber-200'
                  : 'bg-rose-50/70 border-rose-200'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                    isPastureOpen
                      ? 'bg-emerald-700 text-white'
                      : isPastureRestricted
                      ? 'bg-amber-600 text-white'
                      : 'bg-rose-600 text-white'
                  }`}
                >
                  {isPastureOpen ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <AlertTriangle className="w-5 h-5" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span
                      className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                        isPastureOpen
                          ? 'bg-emerald-200/80 text-emerald-900'
                          : isPastureRestricted
                          ? 'bg-amber-200/80 text-amber-900'
                          : 'bg-rose-200/80 text-rose-900'
                      }`}
                    >
                      {weatherData.pastureBadgeText}
                    </span>
                    <span className="text-xs text-stone-600 font-medium">
                      Adasarhanlı Köyü Mera Parselleri
                    </span>
                  </div>
                  <p className="text-sm text-stone-800 leading-relaxed font-medium mb-2">
                    {weatherData.pastureDetail}
                  </p>
                  <p className="text-xs text-stone-600 leading-normal italic">
                    ℹ️ {weatherData.pastureNote}
                  </p>
                </div>
              </div>
            </div>

            {/* Daily Farm Schedule & Activities */}
            <div className="mb-6">
              <h4 className="text-sm font-bold text-stone-900 mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#123c28]" />
                Bugünkü Çiftlik Rutini ve Faaliyet Durumları
              </h4>

              <div className="space-y-2.5">
                {weatherData.activities.map((act) => (
                  <div
                    key={act.id}
                    className="p-3.5 rounded-xl border border-stone-200/80 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:border-emerald-300 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-bold text-stone-900 text-sm">{act.title}</span>
                        <span className="text-xs text-stone-500 font-medium">
                          ({act.timeRange})
                        </span>
                      </div>
                      <p className="text-xs text-stone-600">{act.description}</p>
                      <div className="text-[11px] text-stone-400 mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-stone-400" />
                        {act.location}
                      </div>
                    </div>

                    <div className="shrink-0 self-start sm:self-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                          act.status === 'completed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : act.status === 'in_progress'
                            ? 'bg-amber-100 text-amber-800 animate-pulse'
                            : 'bg-stone-100 text-stone-600'
                        }`}
                      >
                        {act.status === 'completed' && <CheckCircle2 className="w-3 h-3" />}
                        {act.status === 'in_progress' && <Activity className="w-3 h-3" />}
                        {act.statusLabel}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visit & Contact Note */}
            <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left">
                <p className="text-xs font-bold text-stone-900">
                  Çiftliğimizi ve hayvanlarımızı yerinde görmek ister misiniz?
                </p>
                <p className="text-xs text-stone-600">
                  {lang === 'en' ? 'Please call us before coming to our Meric Adasarhanli Village farm site to get current pasture' : 'Meriç Adasarhanlı Köyü çiftlik sahamıza gelmeden önce arayarak güncel mera'}
                  parseli konumunu alabilirsiniz.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                <a
                  href={`tel:${FARM_CONTACT.phoneRaw}`}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full bg-[#123c28] text-white text-xs font-semibold hover:bg-[#184e34] transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'Call Farm' : 'Çiftliği Ara'}</span>
                </a>
                <a
                  href={FARM_CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Konum İste</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
