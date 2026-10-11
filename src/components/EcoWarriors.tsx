import {
  Share2, UserPlus, FileText, Award, Camera, BadgeCheck, Moon, Sunrise,
  Crown, Medal, Trophy,
} from 'lucide-react';
import type { Lang } from '@/types';
import { tr } from '@/i18n';
import { ecoWarriors, badges } from '@/data';

const badgeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  FileText, Award, Camera, BadgeCheck, Moon, Sunrise,
};

interface EcoWarriorsProps {
  lang: Lang;
  ecoPoints: number;
  onShareBadge: () => void;
  onInviteFriends: () => void;
}

export default function EcoWarriors({ lang, ecoPoints, onShareBadge, onInviteFriends }: EcoWarriorsProps) {
  const tierIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    Gold: Crown,
    Silver: Medal,
    Bronze: Trophy,
  };
  const tierColors: Record<string, string> = {
    Gold: 'text-yellow-500',
    Silver: 'text-gray-400',
    Bronze: 'text-orange-600',
  };
  const tierLabels: Record<string, string> = {
    Gold: tr(lang, 'gold'),
    Silver: tr(lang, 'silver'),
    Bronze: tr(lang, 'bronze'),
  };

  return (
    <section className="max-w-[1400px] mx-auto px-4 lg:px-6 py-6">
      <h2 className="text-xl font-bold text-gray-900 tracking-tight mb-1">{tr(lang, 'ecoWarriorsTitle')}</h2>
      <p className="text-sm text-gray-500 mb-4">{tr(lang, 'ecoWarriorsSub')}</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left: Top 10 reporters */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <h3 className="text-sm font-bold text-gray-700 mb-4">{tr(lang, 'topReporters')}</h3>
          <div className="space-y-2">
            {ecoWarriors.map((w) => {
              const TierIcon = w.tier ? tierIcons[w.tier] : null;
              return (
                <div
                  key={w.rank}
                  className={`flex items-center gap-2.5 p-2.5 rounded-lg transition-all ${
                    w.rank <= 3 ? 'bg-gray-50 border border-gray-100' : 'hover:bg-gray-50'
                  }`}
                >
                  <span className={`text-sm font-bold w-6 text-center ${
                    w.rank === 1 ? 'text-yellow-500' : w.rank === 2 ? 'text-gray-400' : w.rank === 3 ? 'text-orange-600' : 'text-gray-400'
                  }`}>{w.rank}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-800 truncate">{lang === 'te' ? w.teName : w.name}</p>
                    <p className="text-[10px] text-gray-500">{lang === 'te' ? w.teCity : w.city}</p>
                  </div>
                  {TierIcon && <TierIcon className={`w-4 h-4 ${tierColors[w.tier]}`} />}
                  <span className="text-sm font-bold text-green-600 tabular-nums">{w.points}</span>
                  <span className="text-[10px] text-gray-400">{tr(lang, 'points')}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center: Your Eco Points */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <h3 className="text-sm font-bold text-gray-700 mb-4">{tr(lang, 'yourEcoPoints')}</h3>
          <div className="text-center mb-4">
            <p className="text-5xl font-bold text-green-600 tabular-nums">{ecoPoints}</p>
            <p className="text-sm text-gray-500 mt-1">{tr(lang, 'points')}</p>
          </div>
          <div className="bg-green-50 rounded-xl p-3 mb-4 text-center">
            <p className="text-sm font-bold text-green-700">{tr(lang, 'level')} 3 · {tr(lang, 'greenGuardian')}</p>
          </div>
          {/* Progress bar */}
          <div className="mb-2">
            <div className="flex items-center justify-between text-[10px] text-gray-500 mb-1">
              <span>{ecoPoints} {tr(lang, 'points')}</span>
              <span>150 {tr(lang, 'toLevel')}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((ecoPoints / 150) * 100, 100)}%` }}
              />
            </div>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={onShareBadge}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              {tr(lang, 'shareBadge')}
            </button>
            <button
              onClick={onInviteFriends}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg text-xs font-bold transition-all cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5" />
              {tr(lang, 'inviteFriends')}
            </button>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-gray-500">{tr(lang, 'perVerified')}</p>
            <p className="text-[10px] text-gray-500">{tr(lang, 'perPhoto')}</p>
            <p className="text-[10px] text-gray-500">{tr(lang, 'perLocation')}</p>
          </div>
        </div>

        {/* Right: Badges */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <h3 className="text-sm font-bold text-gray-700 mb-4">{tr(lang, 'badgesEarned')}</h3>
          <div className="grid grid-cols-2 gap-3">
            {badges.map((b, i) => {
              const Icon = badgeIcons[b.icon] || Award;
              return (
                <div key={i} className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-3 text-center">
                  <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-2">
                    <Icon className="w-4.5 h-4.5 text-amber-600" />
                  </div>
                  <p className="text-[11px] font-bold text-gray-800">{lang === 'te' ? b.teName : b.name}</p>
                  <p className="text-[10px] text-amber-600 font-semibold">+{b.points} {tr(lang, 'points')}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
