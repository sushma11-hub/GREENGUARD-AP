import {
  MessageCircle, QrCode, ExternalLink, TreePine, Factory, Car,
  Flame, Trees, CloudRain, Droplets,
} from 'lucide-react';
import type { Lang } from '@/types';
import { tr } from '@/i18n';
import { preventionPrograms } from '@/data';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  TreePine, Factory, Car, Flame, Trees, MessageCircle, CloudRain, Droplets,
};

export default function WhatsAppPrevention({ lang }: { lang: Lang }) {
  return (
    <section className="max-w-[1400px] mx-auto px-4 lg:px-6 py-6 space-y-6">
      {/* WhatsApp Banner */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 shadow-lg overflow-hidden relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center relative z-10">
          {/* Left */}
          <div className="text-white">
            <div className="flex items-center gap-2 mb-3">
              <MessageCircle className="w-7 h-7" />
              <h2 className="text-xl font-bold">{tr(lang, 'whatsappTitle')}</h2>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 bg-white/15 rounded-lg px-3 py-2 w-fit">
                <span className="font-semibold">{tr(lang, 'whatsappSend')}</span>
              </div>
              <p className="text-green-100 text-xs">{tr(lang, 'whatsappUpdates')}</p>
              <p className="text-green-100 text-xs">{tr(lang, 'citizensConnected')}</p>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={() => window.open('https://wa.me/919876543210', '_blank')}
                className="flex items-center gap-2 px-4 py-2.5 bg-white text-green-700 rounded-xl text-sm font-bold hover:bg-green-50 transition-all cursor-pointer shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                {tr(lang, 'chatWhatsapp')}
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right: QR + preview */}
          <div className="flex items-center gap-4 justify-end">
            <div className="bg-white rounded-xl p-3 shadow-lg max-w-[220px]">
              <div className="bg-gray-50 rounded-lg p-2.5 mb-2 border border-gray-100">
                <div className="flex items-start gap-2">
                  <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white rounded-lg px-2.5 py-1.5 text-[11px] text-gray-700 shadow-sm">
                    {tr(lang, 'whatsappPreview')}
                  </div>
                </div>
              </div>
              <p className="text-[9px] text-gray-400 text-center">WhatsApp Bot Preview</p>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-lg text-center shrink-0">
              <div className="w-24 h-24 bg-gray-900 rounded-lg flex items-center justify-center mb-2">
                <QrCode className="w-16 h-16 text-white" />
              </div>
              <p className="text-[10px] font-bold text-gray-600">{tr(lang, 'qrScan')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Prevention */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 tracking-tight mb-4">{tr(lang, 'preventionTitle')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {preventionPrograms.map((p, i) => {
            const Icon = iconMap[p.icon] || TreePine;
            return (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-green-300 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-sm font-bold text-gray-800 mb-1">{lang === 'te' ? p.teName : p.name}</h3>
                <p className="text-xs text-gray-500">{lang === 'te' ? p.teStat : p.stat}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
