export type Lang = 'en' | 'te';

export interface CityData {
  id: number;
  name: string;
  teName: string;
  aqi: number;
  pm25: number;
  pm10: number;
  no2: number;
  temp: number;
  wind: number;
  windDir: string;
  humidity: number;
  aiForecast: { label: string; teLabel: string; value: number }[];
  confidence: number;
  mapPos: { left: string; top: string };
  isPilot?: boolean;
}

export function aqiCategory(aqi: number): 'good' | 'satisfactory' | 'moderate' {
  if (aqi <= 50) return 'good';
  if (aqi <= 100) return 'satisfactory';
  return 'moderate';
}

export function aqiColor(aqi: number): string {
  const cat = aqiCategory(aqi);
  if (cat === 'good') return '#22c55e';
  if (cat === 'satisfactory') return '#f59e0b';
  return '#ef4444';
}
