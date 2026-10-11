import { Star } from 'lucide-react';
import type { CityData, Lang } from '@/types';
import { aqiColor, aqiCategory } from '@/types';
import { tr } from '@/i18n';

interface APMapProps {
  lang: Lang;
  cities: CityData[];
  onSelectCity: (city: CityData) => void;
}

export default function APMap({ lang, cities, onSelectCity }: APMapProps) {
  return (
    <section className="max-w-[1400px] mx-auto px-4 lg:px-6 py-6">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">
          {tr(lang, 'mapTitle')}
        </h2>
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-50 border border-green-200 rounded-lg">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-bold text-green-700">{tr(lang, 'live47')}</span>
        </div>
      </div>

      <div
        className="relative bg-white border border-gray-200 rounded-2xl shadow-sm overflow-visible"
        style={{ height: '650px' }}
      >
        {/* AP State Outline SVG - centered */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            width="600"
            height="580"
            viewBox="0 0 600 580"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="opacity-90"
          >
            {/* AP state outline - stylized polygon resembling Andhra Pradesh */}
            <path
              d="M 120 30 L 180 20 L 220 25 L 260 35 L 300 30 L 340 20 L 380 15 L 420 25 L 450 40 L 470 60 L 480 90 L 490 120 L 500 150 L 510 180 L 520 210 L 530 250 L 540 290 L 545 330 L 540 370 L 535 410 L 530 440 L 520 470 L 500 490 L 470 500 L 440 505 L 410 510 L 380 515 L 350 520 L 320 525 L 290 530 L 260 535 L 230 540 L 200 545 L 170 540 L 140 530 L 110 520 L 80 500 L 60 470 L 50 440 L 45 410 L 50 380 L 60 350 L 70 320 L 80 290 L 90 260 L 100 230 L 110 200 L 115 170 L 110 140 L 105 110 L 110 80 L 115 50 Z"
              fill="#f0fdf4"
              stroke="#22c55e"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {/* Internal grid lines for map texture */}
            <path
              d="M 120 30 L 180 20 L 220 25 L 260 35 L 300 30 L 340 20 L 380 15 L 420 25 L 450 40 L 470 60 L 480 90 L 490 120 L 500 150 L 510 180 L 520 210 L 530 250 L 540 290 L 545 330 L 540 370 L 535 410 L 530 440 L 520 470 L 500 490 L 470 500 L 440 505 L 410 510 L 380 515 L 350 520 L 320 525 L 290 530 L 260 535 L 230 540 L 200 545 L 170 540 L 140 530 L 110 520 L 80 500 L 60 470 L 50 440 L 45 410 L 50 380 L 60 350 L 70 320 L 80 290 L 90 260 L 100 230 L 110 200 L 115 170 L 110 140 L 105 110 L 110 80 L 115 50 Z"
              fill="none"
              stroke="#86efac"
              strokeWidth="0.5"
              strokeDasharray="4 4"
              opacity="0.5"
            />
            {/* Label */}
            <text x="300" y="560" textAnchor="middle" className="fill-green-600" style={{ fontSize: 14, fontWeight: 600 }}>
              {lang === 'te' ? 'ఆంధ్రప్రదేశ్' : 'Andhra Pradesh'}
            </text>
          </svg>
        </div>

        {/* City pills distributed across map */}
        {cities.map((city) => {
          const color = aqiColor(city.aqi);
          const cat = aqiCategory(city.aqi);
          const borderColor = cat === 'good' ? '#22c55e' : cat === 'satisfactory' ? '#f59e0b' : '#ef4444';
          const cityName = lang === 'te' ? city.teName : city.name;

          return (
            <div
              key={city.id}
              className="absolute group cursor-pointer z-10"
              style={{ left: city.mapPos.left, top: city.mapPos.top, transform: 'translate(-50%, -50%)' }}
              onClick={() => onSelectCity(city)}
            >
              {city.isPilot ? (
                <div
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full shadow-md transition-all duration-200 group-hover:scale-110 group-hover:z-50 bg-yellow-100 border-2 border-yellow-400 animate-pulse"
                >
                  <Star className="w-3 h-3 text-yellow-600 fill-yellow-500" />
                  <span className="text-[11px] font-bold text-gray-800 whitespace-nowrap">{cityName}</span>
                  <span className="text-[11px] font-bold text-gray-900 tabular-nums">{city.aqi}</span>
                </div>
              ) : (
                <div
                  className="flex items-center gap-1 px-2.5 py-1 bg-white rounded-full shadow-sm transition-all duration-200 group-hover:scale-110 group-hover:z-50 group-hover:shadow-md"
                  style={{ border: `1.5px solid ${borderColor}` }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-[11px] font-semibold text-gray-700 whitespace-nowrap">{cityName}</span>
                  <span className="text-[11px] font-bold tabular-nums" style={{ color }}>{city.aqi}</span>
                </div>
              )}

              {/* Tooltip on hover */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2.5 py-1.5 bg-gray-900 text-white rounded-lg shadow-lg text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-[60]">
                <div className="font-bold">{cityName} · AQI {city.aqi}</div>
                <div className="text-gray-300">PM2.5: {city.pm25} · PM10: {city.pm10} · NO₂: {city.no2}</div>
              </div>
            </div>
          );
        })}

        {/* AQI Legend */}
        <div className="absolute bottom-3 right-3 bg-white border border-gray-200 rounded-xl p-2.5 shadow-md">
          <p className="text-[10px] font-bold text-gray-600 mb-1.5">{tr(lang, 'aqiLegend')}</p>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
              <span className="text-[10px] text-gray-700">0-50 {tr(lang, 'good')}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="text-[10px] text-gray-700">51-100 {tr(lang, 'satisfactory')}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <span className="text-[10px] text-gray-700">101+ {tr(lang, 'moderate')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
