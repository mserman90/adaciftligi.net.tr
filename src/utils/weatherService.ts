import { FarmWeatherData, FarmDailyActivity } from '../types';

// Meriç / Adasarhanlı Köyü Coordinates
export const MERIC_COORDINATES = {
  lat: 41.1834,
  lng: 26.4215,
  name: 'Meriç, Edirne (Adasarhanlı Köyü)',
};

export function getWeatherConditionText(code: number, isDay: boolean = true): string {
  switch (code) {
    case 0:
      return isDay ? 'Açık & Güneşli' : 'Açık & Yıldızlı';
    case 1:
      return 'Çoğunlukla Açık';
    case 2:
      return 'Parçalı Bulutlu';
    case 3:
      return 'Bulutlu';
    case 45:
    case 48:
      return 'Puslu / Sisli';
    case 51:
    case 53:
    case 55:
      return 'Hafif Çisenti';
    case 56:
    case 57:
      return 'Soğuk Çisenti';
    case 61:
      return 'Hafif Yağmurlu';
    case 63:
      return 'Orta Şiddette Yağmur';
    case 65:
      return 'Kuvvetli Yağmurlu';
    case 66:
    case 67:
      return 'Dondurucu Yağmur';
    case 71:
    case 73:
    case 75:
      return 'Kar Yağışlı';
    case 77:
      return 'Kar Taneli';
    case 80:
    case 81:
    case 82:
      return 'Sağanak Yağışlı';
    case 85:
    case 86:
      return 'Kar Sağanağı';
    case 95:
      return 'Gök Gürültülü Fırtına';
    case 96:
    case 99:
      return 'Dolu ve Gök Gürültülü Fırtına';
    default:
      return 'Açık & Elverişli';
  }
}

export function evaluatePastureStatus(params: {
  precipitation: number;
  weatherCode: number;
  windSpeed: number;
  temperature: number;
}): {
  status: 'open' | 'closed' | 'restricted';
  badgeText: string;
  detail: string;
  note: string;
} {
  const { precipitation, weatherCode, windSpeed, temperature } = params;

  // Severe adverse conditions: heavy rain, snow, thunderstorms or freezing
  const isSevereRainOrSnow =
    precipitation >= 1.0 ||
    [63, 65, 67, 71, 73, 75, 81, 82, 85, 86, 95, 96, 99].includes(weatherCode) ||
    temperature < -1;

  if (isSevereRainOrSnow) {
    return {
      status: 'closed',
      badgeText: 'MERA KAPALI (Barınak Besisi)',
      detail:
        'Meriç havzasındaki yağış veya zemin ıslaklığı nedeniyle hayvanlarımız havadar kapalı padoklarda kuru ot, korunga ve dengeli kaba yem ile korunmaktadır.',
      note: 'Hayvan refahı ve ayak sağlığı için çamurlu arazide otlatma durdurulmuştur.',
    };
  }

  // Moderate wind or mild rain
  const isWindyOrDrizzly =
    windSpeed > 40 ||
    (precipitation > 0.1 && precipitation < 1.0) ||
    [51, 53, 55, 61, 80].includes(weatherCode);

  if (isWindyOrDrizzly) {
    return {
      status: 'restricted',
      badgeText: 'KORUMALI MERA (Rüzgar Kalkanlı Alanlar)',
      detail:
        'Hafif çisenti veya serin rüzgar nedeniyle sürülerimiz Meriç nehir şeridindeki korunaklı ağaç altı mera parsellerinde kontrollü otlatılmaktadır.',
      note: 'Hayvanlar gözetimli yayılımda, yem takviyeli bakım uygulanmaktadır.',
    };
  }

  // Ideal grazing conditions
  return {
    status: 'open',
    badgeText: 'MERA AÇIK (Doğal Serbest Otlatma)',
    detail:
      'Hava şartları ve mera nemi ideal seviyede. Koyun, kuzu ve düvelerimiz Meriç nehri taşkın ovasının taze kekikli doğal otlaklarında serbestçe yayılmaktadır.',
    note: 'Sürülerimiz gün boyunca temiz su kaynakları ve bol oksijen eşliğinde arazidedir.',
  };
}

export function generateDailyActivities(now: Date = new Date()): FarmDailyActivity[] {
  // Current hour in local time (0 - 23)
  const hour = now.getHours();

  return [
    {
      id: 'act-1',
      title: 'Sabah Sağımı & Soğuk Zincir',
      timeRange: '05:30 – 08:00',
      status: hour >= 8 ? 'completed' : hour >= 5 ? 'in_progress' : 'scheduled',
      statusLabel: hour >= 8 ? 'Tamamlandı (+3.8°C Tank)' : hour >= 5 ? 'Sağım Yapılıyor' : 'Planlandı',
      description: 'El değmeden vakumlu modern sağım ve anında soğutma tankına aktarım.',
      location: 'Sağımhane & Soğuk Hava Deposu',
    },
    {
      id: 'act-2',
      title: 'Serbest Mera Otlatması',
      timeRange: '08:30 – 18:30',
      status: hour >= 18 ? 'completed' : hour >= 8 ? 'in_progress' : 'scheduled',
      statusLabel: hour >= 18 ? 'Padoklara Dönüldü' : hour >= 8 ? 'Meralarda Yayılımda' : 'Hazırlık Yapılıyor',
      description: 'Küçükbaş ve büyükbaş sürüler Meriç deltası doğal çayırlarında serbest otlatmada.',
      location: 'Meriç Nehri Boyu Mera Parselleri',
    },
    {
      id: 'act-3',
      title: 'Akşam Kontrolü & İkinci Sağım',
      timeRange: '18:30 – 20:30',
      status: hour >= 21 ? 'completed' : hour >= 18 ? 'in_progress' : 'scheduled',
      statusLabel: hour >= 21 ? 'Tamamlandı' : hour >= 18 ? 'Kontrol & Sağım Devam Ediyor' : 'Planlandı',
      description: 'Sürü sayımı, veteriner gözlemi ve akşam taze süt sağımı.',
      location: 'Merkez Padoklar & Barınak',
    },
    {
      id: 'act-4',
      title: 'Çiftlik Ziyareti & Canlı İnceleme',
      timeRange: '08:00 – 19:30',
      status: hour >= 8 && hour < 20 ? 'in_progress' : 'scheduled',
      statusLabel: hour >= 8 && hour < 20 ? 'Ziyarete Açık' : 'Yarın 08:00 Açılacak',
      description: 'Kurbanlık, adaklık ve damızlık canlı hayvanları yerinde görme ve inceleme.',
      location: 'Adasarhanlı Köyü Çiftlik Alanı',
    },
  ];
}

// In-memory cache for 3 minutes
let cachedData: FarmWeatherData | null = null;
let cacheTime: number = 0;
const CACHE_TTL_MS = 3 * 60 * 1000;

export async function fetchMericWeather(forceRefresh: boolean = false): Promise<FarmWeatherData> {
  const now = Date.now();
  if (!forceRefresh && cachedData && now - cacheTime < CACHE_TTL_MS) {
    return cachedData;
  }

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${MERIC_COORDINATES.lat}&longitude=${MERIC_COORDINATES.lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&timezone=auto`;
    
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Weather API returned ${res.status}`);
    }

    const data = await res.json();
    const current = data.current;

    const temperature = Math.round(current.temperature_2m * 10) / 10;
    const apparentTemperature = Math.round(current.apparent_temperature * 10) / 10;
    const humidity = current.relative_humidity_2m;
    const windSpeed = Math.round(current.wind_speed_10m * 10) / 10;
    const precipitation = current.precipitation || 0;
    const weatherCode = current.weather_code || 0;
    const isDay = current.is_day === 1;

    const weatherDesc = getWeatherConditionText(weatherCode, isDay);
    const pasture = evaluatePastureStatus({
      precipitation,
      weatherCode,
      windSpeed,
      temperature,
    });

    const currentDateObj = new Date();
    const timeFormatted = currentDateObj.toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const result: FarmWeatherData = {
      locationName: 'Meriç, Edirne',
      district: 'Meriç',
      province: 'Edirne',
      temperature,
      apparentTemperature,
      humidity,
      windSpeed,
      precipitation,
      weatherCode,
      weatherDescription: weatherDesc,
      isDay,
      lastUpdated: timeFormatted,
      pastureStatus: pasture.status,
      pastureBadgeText: pasture.badgeText,
      pastureDetail: pasture.detail,
      pastureNote: pasture.note,
      activities: generateDailyActivities(currentDateObj),
    };

    cachedData = result;
    cacheTime = now;
    return result;
  } catch (err) {
    console.warn('Live weather fetch failed, using realistic fallback for Meriç:', err);

    // Fallback data for Meriç
    const currentDateObj = new Date();
    const timeFormatted = currentDateObj.toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const fallback: FarmWeatherData = {
      locationName: 'Meriç, Edirne',
      district: 'Meriç',
      province: 'Edirne',
      temperature: 24,
      apparentTemperature: 24.5,
      humidity: 48,
      windSpeed: 14,
      precipitation: 0,
      weatherCode: 1,
      weatherDescription: 'Açık & Güneşli',
      isDay: true,
      lastUpdated: timeFormatted,
      pastureStatus: 'open',
      pastureBadgeText: 'MERA AÇIK (Doğal Serbest Otlatma)',
      pastureDetail:
        'Hava ve zemin koşulları elverişli. Sürülerimiz Meriç nehri taşkın ovasının taze kekikli doğal otlaklarında serbestçe otlamaktadır.',
      pastureNote: 'Sürülerimiz gün boyunca temiz su kaynakları ve bol oksijen eşliğinde arazidedir.',
      activities: generateDailyActivities(currentDateObj),
    };

    return fallback;
  }
}
