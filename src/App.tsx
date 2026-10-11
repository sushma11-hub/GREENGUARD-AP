import { useState, useEffect, useRef, useCallback } from 'react';
import type { CityData, Lang } from '@/types';
import { cities as cityData } from '@/data';
import { tr } from '@/i18n';
import Header from '@/components/Header';
import APMap from '@/components/APMap';
import CityGrid from '@/components/CityGrid';
import GunturDetail from '@/components/GunturDetail';
import WhatsAppPrevention from '@/components/WhatsAppPrevention';
import ImpactSection from '@/components/ImpactSection';
import EcoWarriors from '@/components/EcoWarriors';
import ReportPipeline from '@/components/ReportPipeline';
import Footer from '@/components/Footer';
import Toast from '@/components/Toast';
import LanguagePopup from '@/components/LanguagePopup';

function App() {
  const [lang, setLang] = useState<Lang>('en');
  const [showLangPopup, setShowLangPopup] = useState(false);
  const [selectedCity, setSelectedCity] = useState<CityData>(
    cityData.find((c) => c.name === 'Guntur') || cityData[0]
  );
  const [ecoPoints, setEcoPoints] = useState(95);
  const [toast, setToast] = useState({ show: false, message: '' });
  const [currentTime, setCurrentTime] = useState('');
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('green-guard-lang') as Lang | null;
    if (saved === 'en' || saved === 'te') {
      setLang(saved);
    } else {
      setShowLangPopup(true);
    }
  }, []);

  useEffect(() => {
    const update = () => {
      const d = new Date();
      const h = d.getHours();
      const m = d.getMinutes().toString().padStart(2, '0');
      const s = d.getSeconds().toString().padStart(2, '0');
      const ampm = h >= 12 ? 'pm' : 'am';
      const h12 = h % 12 || 12;
      setCurrentTime(`${h12}:${m}:${s} ${ampm}`);
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === 'te' ? 'te' : 'en';
    document.title = 'Green Guard — Pollution Preventing System';
  }, [lang]);

  useEffect(() => {
    const hide = () => {
      document.querySelectorAll('a[href*="bolt"]').forEach((el) => {
        const parent = el.parentElement;
        if (parent) parent.style.display = 'none';
      });
    };
    hide();
    const observer = new MutationObserver(hide);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  const handleSetLang = useCallback((l: Lang) => {
    setLang(l);
    localStorage.setItem('green-guard-lang', l);
    setShowLangPopup(false);
  }, []);

  const showToast = useCallback((message: string) => {
    setToast({ show: true, message });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast({ show: false, message: '' }), 3500);
  }, []);

  const handleDailyReport = useCallback(() => {
    const date = new Date().toISOString().split('T')[0];
    const report = [
      'GREEN GUARD — Daily Report',
      `Date: ${date}`,
      '',
      `Guntur AQI: ${selectedCity.aqi}`,
      `Cities Monitored: 47`,
      `Vehicles Checked: 1,120`,
      `Top Polluter: Visakhapatnam (AQI 90)`,
      '',
      'Summary:',
      `  Good (0-50): 10 cities`,
      `  Satisfactory (51-100): 37 cities`,
      `  Moderate (101+): 0 cities`,
      '',
      'Powered by AWS Cloud',
    ].join('\n');

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `GreenGuard_Daily_Report_${date}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast(tr(lang, 'reportDownloaded'));
  }, [selectedCity, lang, showToast]);

  const handleShareBadge = useCallback(() => {
    const text =
      lang === 'te'
        ? `నేను Green Guard పర్యావరణ యోధుడిగా ${ecoPoints} ఇకో పాయింట్లు సాధించాను!`
        : `I earned ${ecoPoints} Eco Points as a Green Guard Eco Warrior!`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  }, [ecoPoints, lang]);

  const handleInviteFriends = useCallback(() => {
    const text =
      lang === 'te'
        ? 'Green Guard యాప్‌తో కాలుష్యాన్ని పర్యవేక్షించండి. ఇప్పుడే చేరండి!'
        : 'Join Green Guard to monitor pollution in Andhra Pradesh. Sign up now!';
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    setEcoPoints((p) => p + 25);
    showToast(tr(lang, 'invited'));
  }, [lang, showToast]);

  return (
    <div className="min-h-screen bg-gray-50">
      {showLangPopup && <LanguagePopup onSelect={handleSetLang} />}

      <Header lang={lang} setLang={handleSetLang} onDailyReport={handleDailyReport} showLangPopup={showLangPopup} />

      <main>
        <APMap lang={lang} cities={cityData} onSelectCity={setSelectedCity} />
        <CityGrid lang={lang} cities={cityData} onSelectCity={setSelectedCity} />
        <GunturDetail lang={lang} selectedCity={selectedCity} currentTime={currentTime} />
        <WhatsAppPrevention lang={lang} />
        <ImpactSection lang={lang} />
        <EcoWarriors
          lang={lang}
          ecoPoints={ecoPoints}
          onShareBadge={handleShareBadge}
          onInviteFriends={handleInviteFriends}
        />
        <ReportPipeline lang={lang} />
      </main>

      <Footer lang={lang} />
      <Toast message={toast.message} show={toast.show} onClose={() => setToast({ show: false, message: '' })} />
    </div>
  );
}

export default App;
