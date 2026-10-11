import type { Lang } from '@/types';
import { tr } from '@/i18n';

interface LanguagePopupProps {
  onSelect: (lang: Lang) => void;
}

export default function LanguagePopup({ onSelect }: LanguagePopupProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[80]">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-[90vw]">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">{tr('en', 'chooseLanguage')}</h2>
          <p className="text-lg font-bold text-gray-700">{tr('te', 'chooseLanguageTe')}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => onSelect('en')}
            className="flex flex-col items-center gap-2 p-6 border-2 border-gray-200 hover:border-green-500 hover:bg-green-50 rounded-xl transition-all cursor-pointer group"
          >
            <span className="text-4xl">🇬🇧</span>
            <span className="text-lg font-bold text-gray-800 group-hover:text-green-700">English</span>
            <span className="text-xs text-gray-500 text-center">Click to view in English</span>
          </button>

          <button
            onClick={() => onSelect('te')}
            className="flex flex-col items-center gap-2 p-6 border-2 border-gray-200 hover:border-green-500 hover:bg-green-50 rounded-xl transition-all cursor-pointer group"
          >
            <span className="text-4xl">🇮🇳</span>
            <span className="text-lg font-bold text-gray-800 group-hover:text-green-700">తెలుగు</span>
            <span className="text-xs text-gray-500 text-center">తెలుగులో చూడటానికి క్లిక్ చేయండి</span>
          </button>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">You can change anytime from top menu</p>
      </div>
    </div>
  );
}
