import {
  Activity, Download, Thermometer, Wind, Droplets, AlertTriangle,
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid,
} from 'recharts';
import type { CityData, Lang } from '@/types';
import { aqiColor, aqiCategory } from '@/types';
import { tr } from '@/i18n';
import { vehicleData } from '@/data';

interface GunturDetailProps {
  lang: Lang;
  selectedCity: CityData;
  currentTime: string;
}

export default function GunturDetail({ lang, selectedCity, currentTime }: GunturDetailProps) {
  const color = aqiColor(selectedCity.aqi);
  const cat = aqiCategory(selectedCity.aqi);
  const catLabel = cat === 'good' ? tr(lang, 'good') : cat === 'satisfactory' ? tr(lang, 'satisfactory') : tr(lang, 'moderate');
  const cityName = lang === 'te' ? selectedCity.teName : selectedCity.name;
  const detailTitle = lang === 'te' ? `${selectedCity.teName} వివరాలు` : `${selectedCity.name.toUpperCase()} DETAIL`;

  const forecastData = selectedCity.aiForecast.map((f) => ({
    name: lang === 'te' ? f.teLabel : f.label,
    value: f.value,
  }));

  const metrics = [
    { icon: Activity, label: tr(lang, 'pm25'), value: selectedCity.pm25, status: selectedCity.pm25 > 40 ? tr(lang, 'moderate') : tr(lang, 'good') },
    { icon: Activity, label: tr(lang, 'pm10'), value: selectedCity.pm10, status: selectedCity.pm10 > 60 ? tr(lang, 'moderate') : tr(lang, 'good') },
    { icon: Activity, label: tr(lang, 'no2'), value: selectedCity.no2, status: tr(lang, 'good') },
    { icon: Thermometer, label: tr(lang, 'temperature'), value: `${selectedCity.temp}°C`, status: tr(lang, 'feelsWarm') },
    { icon: Wind, label: tr(lang, 'wind'), value: `${selectedCity.wind} ${tr(lang, 'kmh')}`, status: selectedCity.windDir },
    { icon: Droplets, label: tr(lang, 'humidity'), value: `${selectedCity.humidity}%`, status: '' },
  ];

  return (
    <section className="max-w-[1400px] mx-auto px-4 lg:px-6 py-6">
      <h2 className="text-xl font-bold text-gray-900 tracking-tight mb-4">{detailTitle}</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left: Main AQI display */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="w-4 h-4 text-green-600" />
            <span className="text-xs font-bold text-gray-600">70 {tr(lang, 'sensors')}</span>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-full ml-auto"
              style={{ backgroundColor: `${color}20`, color }}
            >
              {catLabel}
            </span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">{cityName}</h3>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-5xl font-bold tabular-nums" style={{ color }}>{selectedCity.aqi}</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full mb-4" style={{ backgroundColor: `${color}15` }}>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-xs font-bold" style={{ color }}>{catLabel}</span>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="bg-gray-50 rounded-lg px-2 py-1.5 text-center">
              <p className="text-[9px] text-gray-500">{tr(lang, 'pm25')}</p>
              <p className="text-sm font-bold text-gray-800 tabular-nums">{selectedCity.pm25}</p>
            </div>
            <div className="bg-gray-50 rounded-lg px-2 py-1.5 text-center">
              <p className="text-[9px] text-gray-500">{tr(lang, 'pm10')}</p>
              <p className="text-sm font-bold text-gray-800 tabular-nums">{selectedCity.pm10}</p>
            </div>
            <div className="bg-gray-50 rounded-lg px-2 py-1.5 text-center">
              <p className="text-[9px] text-gray-500">{tr(lang, 'no2')}</p>
              <p className="text-sm font-bold text-gray-800 tabular-nums">{selectedCity.no2}</p>
            </div>
          </div>

          <p className="text-[10px] text-gray-400 mb-3">{tr(lang, 'updated')} {currentTime} {tr(lang, 'ist')}</p>

          <button className="w-full flex items-center justify-center gap-2 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-bold transition-all cursor-pointer">
            <Download className="w-4 h-4" />
            {tr(lang, 'exportReport')}
          </button>
        </div>

        {/* Middle: 6 metrics */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <h3 className="text-sm font-bold text-gray-700 mb-4">{tr(lang, 'temperature')} / {tr(lang, 'wind')} / {tr(lang, 'humidity')}</h3>
          <div className="grid grid-cols-2 gap-3">
            {metrics.map((m, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                <div className="flex items-center gap-1.5 mb-1">
                  <m.icon className="w-4 h-4 text-gray-500" />
                  <span className="text-[10px] font-semibold text-gray-500">{m.label}</span>
                </div>
                <p className="text-lg font-bold text-gray-800 tabular-nums">{m.value}</p>
                {m.status && <p className="text-[10px] text-gray-400">{m.status}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Right: AI Forecast */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-gray-700">{tr(lang, 'aiForecast')}</h3>
            <span className="text-[10px] text-gray-500">AWS Bedrock · {selectedCity.confidence}% {tr(lang, 'confidence')}</span>
          </div>

          {/* Forecast timeline */}
          <div className="flex items-center justify-between mb-3 bg-green-50 rounded-lg px-2 py-1.5">
            {selectedCity.aiForecast.map((f, i) => (
              <div key={i} className="text-center">
                <p className="text-[10px] text-gray-500 font-semibold">{lang === 'te' ? f.teLabel : f.label}</p>
                <p className="text-sm font-bold text-gray-800 tabular-nums">{f.value}</p>
              </div>
            ))}
          </div>

          {/* Recharts graph */}
          <div style={{ height: '120px' }} className="mb-3">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={forecastData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                <YAxis domain={['dataMin - 5', 'dataMax + 5']} tick={{ fontSize: 10, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #e5e7eb' }}
                  labelStyle={{ fontWeight: 600 }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#22c55e"
                  strokeWidth={2.5}
                  dot={{ fill: '#22c55e', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Alert */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-2.5 mb-2">
            <div className="flex items-start gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-red-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-[10px] font-semibold text-red-700">{tr(lang, 'alertModerate')}</p>
                <p className="text-[10px] text-red-600 mt-0.5">{tr(lang, 'warningTe')}</p>
              </div>
            </div>
          </div>

          <p className="text-[9px] text-gray-400">{tr(lang, 'model')}</p>
        </div>
      </div>

      {/* Vehicle Emission Check */}
      <VehicleEmission lang={lang} currentTime={currentTime} />
    </section>
  );
}

function VehicleEmission({ lang, currentTime }: { lang: Lang; currentTime: string }) {
  const maxCount = Math.max(...vehicleData.map(v => v.count));

  return (
    <div className="mt-6 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h3 className="text-lg font-bold text-gray-900">{tr(lang, 'vehicleEmission')}</h3>
        <div className="flex items-center gap-3 text-xs">
          <span className="font-bold text-green-600">{tr(lang, 'checkpointsActive')}</span>
          <span className="text-gray-400">·</span>
          <span className="text-gray-500">{tr(lang, 'autoRefresh')}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Big number */}
        <div className="flex flex-col justify-center bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 border border-green-200">
          <p className="text-sm font-semibold text-green-700 mb-1">{tr(lang, 'vehiclesChecked')}</p>
          <p className="text-4xl font-bold text-green-800 tabular-nums">1,120</p>
          <p className="text-xs text-green-600 mt-2">
            {tr(lang, 'lastVehicle')} {currentTime} {tr(lang, 'ist')}
          </p>
          <div className="flex items-center gap-1.5 mt-3 flex-wrap">
            {['Guntur', 'Vijayawada', 'Vizag', 'Tirupati', 'Kurnool', 'Nellore', 'Rajahmundry', 'Kakinada'].map((c) => (
              <span key={c} className="px-2 py-0.5 bg-white border border-green-200 rounded-full text-[10px] font-semibold text-green-700">
                {lang === 'te' ? cityTeMap[c] || c : c}
              </span>
            ))}
          </div>
        </div>

        {/* Bars */}
        <div className="lg:col-span-2 space-y-3">
          {vehicleData.map((v) => (
            <div key={v.type}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-gray-700">
                  {lang === 'te' ? v.teType : v.type} <span className="text-gray-400 font-normal">· {v.count}</span>
                </span>
                <span className="text-xs font-bold text-green-600">{tr(lang, 'pass')} {v.pass}%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-500"
                    style={{ width: `${(v.count / maxCount) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500 tabular-nums w-10 text-right">{v.count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const cityTeMap: Record<string, string> = {
  Guntur: 'గుంటూరు',
  Vijayawada: 'విజయవాడ',
  Vizag: 'విశాఖ',
  Tirupati: 'తిరుపతి',
  Kurnool: 'కర్నూలు',
  Nellore: 'నెల్లూరు',
  Rajahmundry: 'రాజమండ్రి',
  Kakinada: 'కాకినాడ',
};
