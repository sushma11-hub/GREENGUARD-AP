import { useState, useEffect, useCallback } from 'react';
import {
  Shield, Bell, User, Settings, FileText, X, LogOut, Radio,
  RefreshCw, AlertTriangle, Mail, ChevronRight,
} from 'lucide-react';
import type { Lang } from '@/types';
import { tr } from '@/i18n';

interface HeaderProps {
  lang: Lang;
  setLang: (l: Lang) => void;
  onDailyReport: () => void;
  showLangPopup: boolean;
}

export default function Header({ lang, setLang, onDailyReport }: HeaderProps) {
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const closeAll = useCallback(() => {
    setShowNotif(false);
    setShowProfile(false);
  }, []);

  const formatTime = (d: Date) => {
    const h = d.getHours();
    const m = d.getMinutes().toString().padStart(2, '0');
    const s = d.getSeconds().toString().padStart(2, '0');
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${m}:${s} ${ampm}`;
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-6">
          {/* Line 1: Logo + Status + Actions */}
          <div className="flex items-center justify-between gap-4 py-3">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-md shrink-0">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-gray-900 leading-tight tracking-tight">GREEN GUARD</h1>
                <p className="text-[11px] text-gray-500 font-medium">{tr(lang, 'subtitle')}</p>
              </div>
            </div>

            {/* Status badges */}
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-50 border border-green-200 rounded-lg">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-bold text-green-700">{tr(lang, 'live')}</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 border border-gray-200 rounded-lg">
                <span className="text-[11px] text-gray-500">{tr(lang, 'uptime')}</span>
                <span className="text-xs font-bold text-gray-800">99.98%</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 border border-gray-200 rounded-lg">
                <span className="text-[11px] text-gray-500">{tr(lang, 'lastUpdate')}</span>
                <span className="text-xs font-bold text-gray-800 tabular-nums">{formatTime(currentTime)} {tr(lang, 'ist')}</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 border border-gray-200 rounded-lg">
                <Radio className="w-3.5 h-3.5 text-green-600" />
                <span className="text-xs font-bold text-gray-800">70 {tr(lang, 'sensorsOnline')}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2">
              {/* Language selector */}
              <div className="flex items-center gap-1 border border-gray-200 rounded-lg p-0.5">
                <button
                  onClick={() => setLang('en')}
                  className={`px-2.5 py-1 text-sm font-bold rounded-md transition-all ${
                    lang === 'en' ? 'bg-[#00D68F] text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLang('te')}
                  className={`px-2.5 py-1 text-sm font-bold rounded-md transition-all ${
                    lang === 'te' ? 'bg-[#00D68F] text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  తెలుగు
                </button>
              </div>

              {/* Daily Report */}
              <button
                onClick={onDailyReport}
                className="flex items-center gap-1.5 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm cursor-pointer hover:shadow-md"
              >
                <FileText className="w-4 h-4" />
                <span className="hidden lg:inline">{tr(lang, 'dailyReport')}</span>
              </button>

              {/* Notification */}
              <div className="relative">
                <button
                  onClick={() => { setShowNotif(!showNotif); setShowProfile(false); }}
                  className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-lg transition-all cursor-pointer relative"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                </button>
                {showNotif && (
                  <div className="absolute right-0 top-11 w-80 bg-white border border-gray-200 shadow-xl rounded-xl p-4 z-50">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-bold text-gray-900">{tr(lang, 'notifications')} (3)</h3>
                      <button onClick={() => setShowNotif(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-2">
                      {[
                        { icon: AlertTriangle, color: 'text-amber-500', text: tr(lang, 'notif1') },
                        { icon: AlertTriangle, color: 'text-red-500', text: tr(lang, 'notif2') },
                        { icon: FileText, color: 'text-green-500', text: tr(lang, 'notif3') },
                      ].map((n, i) => (
                        <div key={i} className="flex items-start gap-2 p-2.5 bg-gray-50 rounded-lg">
                          <n.icon className={`w-4 h-4 ${n.color} mt-0.5 shrink-0`} />
                          <p className="text-xs text-gray-700">{n.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Profile */}
              <div className="relative">
                <button
                  onClick={() => { setShowProfile(!showProfile); setShowNotif(false); }}
                  className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-lg transition-all cursor-pointer"
                >
                  <User className="w-5 h-5" />
                </button>
                {showProfile && (
                  <div className="absolute right-0 top-11 w-64 bg-white border border-gray-200 shadow-xl rounded-xl p-4 z-50">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold">
                        A
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{tr(lang, 'adminUser')}</p>
                        <p className="text-[11px] text-gray-500">{tr(lang, 'role')}</p>
                      </div>
                    </div>
                    <div className="space-y-1.5 mb-3">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Mail className="w-3.5 h-3.5" />
                        <span>{tr(lang, 'adminEmail')}</span>
                      </div>
                    </div>
                    <button className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-bold transition-all cursor-pointer">
                      <LogOut className="w-4 h-4" />
                      {tr(lang, 'logout')}
                    </button>
                  </div>
                )}
              </div>

              {/* Settings */}
              <button
                onClick={() => setShowSettings(true)}
                className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-lg transition-all cursor-pointer"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Line 2: AWS info */}
          <div className="flex items-center gap-2 pb-2 border-t border-gray-100 pt-2">
            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-orange-50 border border-orange-200 rounded">
              <span className="text-[10px] font-bold text-orange-700 tracking-wide">{tr(lang, 'builtOnAws')}</span>
            </div>
            <span className="text-[11px] text-gray-500">{tr(lang, 'awsCredits')}</span>
          </div>

          {/* Mobile status */}
          <div className="md:hidden flex items-center gap-2 pb-2 flex-wrap">
            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-green-50 border border-green-200 rounded-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-bold text-green-700">{tr(lang, 'live')}</span>
            </div>
            <span className="text-[10px] text-gray-600 tabular-nums">{formatTime(currentTime)} {tr(lang, 'ist')}</span>
            <span className="text-[10px] text-gray-600">70 {tr(lang, 'sensorsOnline')}</span>
          </div>
        </div>
      </header>

      {/* Settings modal */}
      {showSettings && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]"
          onClick={() => setShowSettings(false)}
        >
          <div
            className="w-[400px] max-w-[90vw] bg-white rounded-2xl shadow-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">{tr(lang, 'settings')}</h2>
              <button onClick={() => setShowSettings(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1.5 block">{tr(lang, 'refreshInterval')}</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 cursor-pointer">
                  <option>3 seconds</option>
                  <option>5 seconds</option>
                  <option>10 seconds</option>
                  <option>30 seconds</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1.5 block">{tr(lang, 'alertThreshold')}</label>
                <input type="number" defaultValue={100} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-800" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1.5 block">{tr(lang, 'themeMode')}</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 cursor-pointer">
                  <option>{tr(lang, 'light')}</option>
                  <option>Dark</option>
                  <option>Auto</option>
                </select>
              </div>
              <button
                onClick={() => setShowSettings(false)}
                className="w-full py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-bold transition-all cursor-pointer"
              >
                {tr(lang, 'save')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Click-away overlay for dropdowns */}
      {(showNotif || showProfile) && (
        <div className="fixed inset-0 z-30" onClick={closeAll} />
      )}
    </>
  );
}
