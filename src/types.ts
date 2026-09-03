export interface FarmStat {
  id: string;
  value: string;
  numberValue: number;
  suffix: string;
  label: string;
  sublabel: string;
}

export interface FarmProduct {
  id: string;
  title: string;
  category: 'kucukbas' | 'buyukbas' | 'sut';
  categoryLabel: string;
  image: string;
  tag: string;
  breed: string;
  feeding: string;
  deliveryType: string;
  description: string;
  highlights: string[];
  pricingNote: string;
}

export interface ProductionStep {
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  details: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  comment: string;
  rating: number;
  avatar: string;
  badge: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'siparis' | 'saglik' | 'teslimat' | 'ciftlik';
}

export interface ContactInfo {
  farmName: string;
  village: string;
  district: string;
  province: string;
  fullAddress: string;
  phone: string;
  phoneRaw: string;
  whatsapp: string;
  whatsappUrl: string;
  email: string;
  workingHours: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface FarmDailyActivity {
  id: string;
  title: string;
  timeRange: string;
  status: 'completed' | 'in_progress' | 'scheduled';
  statusLabel: string;
  description: string;
  location: string;
}

export interface FarmWeatherData {
  locationName: string;
  district: string;
  province: string;
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  weatherCode: number;
  weatherDescription: string;
  isDay: boolean;
  lastUpdated: string;
  pastureStatus: 'open' | 'closed' | 'restricted';
  pastureBadgeText: string;
  pastureDetail: string;
  pastureNote: string;
  activities: FarmDailyActivity[];
}
