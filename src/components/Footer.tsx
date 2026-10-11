import { Shield } from 'lucide-react';
import type { Lang } from '@/types';
import { tr } from '@/i18n';

export default function Footer({ lang }: { lang: Lang }) {
  return (
    <footer className="border-t border-gray-200 bg-white mt-6">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6 py-5">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800">© 2026 GREEN GUARD</p>
              <p className="text-[10px] text-gray-500">{tr(lang, 'footer')}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-[10px] text-gray-400">{tr(lang, 'dataRefreshed')}</span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold text-gray-500">{tr(lang, 'export')}:</span>
              <button className="text-[10px] text-green-600 hover:underline cursor-pointer">PDF {tr(lang, 'dailyReport')}</button>
              <span className="text-gray-300">|</span>
              <button className="text-[10px] text-green-600 hover:underline cursor-pointer">Weekly</button>
              <span className="text-gray-300">|</span>
              <button className="text-[10px] text-green-600 hover:underline cursor-pointer">Monthly</button>
              <span className="text-gray-300">|</span>
              <button className="text-[10px] text-green-600 hover:underline cursor-pointer">CSV</button>
            </div>
            <button className="text-[10px] text-gray-500 hover:underline cursor-pointer">{tr(lang, 'privacyPolicy')}</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
