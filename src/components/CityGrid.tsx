import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import type { CityData, Lang } from '@/types';
import { aqiColor, aqiCategory } from '@/types';
import { tr } from '@/i18n';

interface CityGridProps {
  lang: Lang;
  cities: CityData[];
  onSelectCity: (city: CityData) => void;
}

export default function CityGrid({ lang, cities, onSelectCity }: CityGridProps) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query) return cities;
    const q = query.toLowerCase();
    return cities.filter(c => c.name.toLowerCase().includes(q) || c.teName.includes(query));
  }, [cities, query]);

  return (
    <section className="max-w-[1400px] mx-auto px-4 lg:px-6 py-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">{tr(lang, 'citiesTitle')}</h2>
        <p className="text-sm text-gray-500 mt-1">{tr(lang, 'citiesSubtitle')}</p>
      </div>

      {/* Search */}
      <div className="relative mb-4 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={tr(lang, 'searchPlaceholder')}
          className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {filtered.map((city) => {
          const color = aqiColor(city.aqi);
          const cat = aqiCategory(city.aqi);
          const catLabel = cat === 'good' ? tr(lang, 'good') : cat === 'satisfactory' ? tr(lang, 'satisfactory') : tr(lang, 'moderate');
          const cityName = lang === 'te' ? city.teName : city.name;

          return (
            <div
              key={city.id}
              onClick={() => onSelectCity(city)}
              className="bg-white border border-gray-200 rounded-xl p-3.5 cursor-pointer hover:shadow-md hover:border-green-300 transition-all"
            >
              {/* Header row */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  {city.isPilot && (
                    <span className="text-[9px] font-bold text-yellow-700 bg-yellow-100 px-1.5 py-0.5 rounded">PILOT</span>
                  )}
                  <h3 className="text-sm font-bold text-gray-800 truncate">{cityName}</h3>
                </div>
                <span
                  className="text-2xl font-bold tabular-nums leading-none"
                  style={{ color }}
                >
                  {city.aqi}
                </span>
              </div>

              {/* Status badge */}
              <div className="flex items-center gap-1.5 mb-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                <span className="text-xs font-semibold" style={{ color }}>{catLabel}</span>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-1.5 mb-2">
                <div className="bg-gray-50 rounded-lg px-1.5 py-1">
                  <p className="text-[9px] text-gray-500">{tr(lang, 'pm25')}</p>
                  <p className="text-xs font-bold text-gray-700 tabular-nums">{city.pm25}</p>
                </div>
                <div className="bg-gray-50 rounded-lg px-1.5 py-1">
                  <p className="text-[9px] text-gray-500">{tr(lang, 'pm10')}</p>
                  <p className="text-xs font-bold text-gray-700 tabular-nums">{city.pm10}</p>
                </div>
                <div className="bg-gray-50 rounded-lg px-1.5 py-1">
                  <p className="text-[9px] text-gray-500">{tr(lang, 'no2')}</p>
                  <p className="text-xs font-bold text-gray-700 tabular-nums">{city.no2}</p>
                </div>
              </div>

              {/* Weather */}
              <div className="flex items-center gap-2 text-[10px] text-gray-500 mb-2">
                <span>{city.temp}°C</span>
                <span>·</span>
                <span>{city.wind} {tr(lang, 'kmh')} {city.windDir}</span>
                <span>·</span>
                <span>{city.humidity}%</span>
              </div>

              {/* AI Forecast timeline */}
              <div className="bg-green-50 rounded-lg px-2 py-1.5 mb-1.5">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold text-green-700">AI</span>
                  <div className="flex items-center gap-1">
                    {city.aiForecast.map((f, i) => (
                      <span key={i} className="font-semibold text-gray-700">
                        {i > 0 && <span className="text-gray-400 mx-0.5">→</span>}
                        {lang === 'te' ? f.teLabel : f.label} {f.value}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <p className="text-[9px] text-gray-400 text-center">
                AWS Bedrock · {city.confidence}% {tr(lang, 'confidence')}
              </p>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-8 text-gray-400 text-sm">No cities found</div>
      )}
    </section>
  );
}
