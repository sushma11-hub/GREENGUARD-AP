import { useRef, useState } from 'react';
import { TreePine, Factory, Car, MoveHorizontal } from 'lucide-react';
import type { Lang } from '@/types';
import { tr } from '@/i18n';
import { impactStats } from '@/data';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  TreePine, Factory, Car,
};

export default function ImpactSection({ lang }: { lang: Lang }) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(0, Math.min(100, pct)));
  };

  return (
    <section className="max-w-[1400px] mx-auto px-4 lg:px-6 py-6">
      <h2 className="text-xl font-bold text-gray-900 tracking-tight mb-1">{tr(lang, 'impactTitle')}</h2>
      <p className="text-sm text-gray-500 mb-4">{tr(lang, 'impactSubtitle')}</p>

      {/* Before/After slider */}
      <div
        ref={containerRef}
        className="relative w-full h-[320px] rounded-2xl overflow-hidden cursor-ew-resize select-none shadow-lg"
        onMouseDown={(e) => { isDragging.current = true; handleMove(e.clientX); }}
        onMouseMove={(e) => isDragging.current && handleMove(e.clientX)}
        onMouseUp={() => isDragging.current = false}
        onMouseLeave={() => isDragging.current = false}
        onTouchStart={(e) => { isDragging.current = true; handleMove(e.touches[0].clientX); }}
        onTouchMove={(e) => isDragging.current && handleMove(e.touches[0].clientX)}
        onTouchEnd={() => isDragging.current = false}
      >
        {/* AFTER (right - full width, clear green) */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-green-500 to-green-600">
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-white text-5xl font-bold drop-shadow-lg">AQI 78</p>
            <p className="text-white text-lg font-semibold mt-1">{tr(lang, 'after')} · {tr(lang, 'dec2024')} · {tr(lang, 'satisfactory')}</p>
            <div className="mt-3 px-3 py-1 bg-white/20 rounded-full text-white text-xs font-bold">{tr(lang, 'after')}</div>
          </div>
        </div>

        {/* BEFORE (left - clipped, dark smog) */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-gray-200 text-5xl font-bold drop-shadow-lg">AQI 145</p>
            <p className="text-gray-300 text-lg font-semibold mt-1">{tr(lang, 'before')} · {tr(lang, 'jan2024')} · {tr(lang, 'poor')}</p>
            <div className="mt-3 px-3 py-1 bg-white/10 rounded-full text-gray-200 text-xs font-bold">{tr(lang, 'before')}</div>
          </div>
        </div>

        {/* Slider handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl"
          style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center">
            <MoveHorizontal className="w-5 h-5 text-gray-700" />
          </div>
        </div>
      </div>

      {/* Impact cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
        {impactStats.map((s, i) => {
          const Icon = iconMap[s.icon] || TreePine;
          return (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-800">{lang === 'te' ? s.teName : s.name}</h3>
                  <p className="text-xs text-gray-500">{lang === 'te' ? s.teStat : s.stat}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-green-600">{lang === 'te' ? s.teReduction : s.reduction}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
