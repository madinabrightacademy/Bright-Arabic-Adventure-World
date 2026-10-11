import React from 'react';
import { Sparkles, Star, Trophy, Volume2, VolumeX, Smartphone, Monitor, ShieldCheck, Heart } from 'lucide-react';
import { UserProfile, IslandId } from '../types/game';
import { sound } from '../services/sound';
import { ISLANDS_DATA } from '../data/curriculum';

interface TopHeaderProps {
  profile: UserProfile;
  isMuted: boolean;
  onToggleMute: () => void;
  isMobileFrame: boolean;
  onToggleMobileFrame: () => void;
  onOpenLeaderboard: () => void;
  onOpenParentDashboard: () => void;
  onOpenCompanionRoom: () => void;
  onChangeAudience: (aud: 'child' | 'adult') => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  profile,
  isMuted,
  onToggleMute,
  isMobileFrame,
  onToggleMobileFrame,
  onOpenLeaderboard,
  onOpenParentDashboard,
  onOpenCompanionRoom,
  onChangeAudience
}) => {
  const crystalCount = Object.values(profile.crystals).filter(Boolean).length;

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-amber-200/80 px-3 py-2.5 shadow-xs">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
        {/* Left: Avatar & Rutbah */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCompanionRoom}
            className="relative flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-2xl bg-gradient-to-r from-amber-100 to-teal-50 border border-amber-300 hover:border-amber-400 shadow-xs transition-all active:scale-95 text-left"
            title="Buka Kamar Hudhud"
          >
            <div className="w-9 h-9 rounded-xl bg-teal-500 text-white flex items-center justify-center text-xl shadow-xs">
              {profile.avatar === 'ari' ? '👦' : profile.avatar === 'aira' ? '👧' : '🧒'}
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-bold text-xs text-slate-800 leading-none">{profile.name}</span>
                <span className="text-[10px] bg-teal-600 text-white font-extrabold px-1.5 py-0.2 rounded-full leading-none">
                  {profile.rutbah}
                </span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-amber-800 font-medium mt-0.5">
                <span>🐣 Hudhud: {profile.hudhudStage}</span>
              </div>
            </div>
          </button>

          {/* Audience switch (Anak vs Dewasa) */}
          <div className="hidden sm:flex bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-[11px] font-bold">
            <button
              onClick={() => onChangeAudience('child')}
              className={`px-2 py-1 rounded-lg transition-all ${
                profile.audience === 'child' ? 'bg-amber-400 text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              Jalur Anak 🎈
            </button>
            <button
              onClick={() => onChangeAudience('adult')}
              className={`px-2 py-1 rounded-lg transition-all ${
                profile.audience === 'adult' ? 'bg-teal-700 text-white shadow-xs' : 'text-slate-600'
              }`}
            >
              Jalur Dewasa 💼
            </button>
          </div>
        </div>

        {/* Center: Gamification Stats (XP, Stars, Crystals) */}
        <div className="flex items-center gap-1.5 sm:gap-2 text-xs font-bold">
          {/* XP */}
          <div className="flex items-center gap-1 bg-amber-50 border border-amber-300 text-amber-900 px-2.5 py-1.5 rounded-xl shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>{profile.xp} XP</span>
          </div>

          {/* Stars */}
          <div className="flex items-center gap-1 bg-yellow-50 border border-yellow-300 text-yellow-900 px-2.5 py-1.5 rounded-xl shadow-2xs">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{profile.stars}</span>
          </div>

          {/* Crystals */}
          <div
            className="flex items-center gap-1 bg-teal-50 border border-teal-300 text-teal-900 px-2.5 py-1.5 rounded-xl shadow-2xs cursor-pointer hover:bg-teal-100 transition-colors"
            title="Kristal Pengetahuan Terkumpul"
          >
            <span>💎</span>
            <span>{crystalCount}/8</span>
          </div>
        </div>

        {/* Right: Quick Action Controls */}
        <div className="flex items-center gap-1.5">
          {/* Leaderboard button */}
          <button
            onClick={onOpenLeaderboard}
            className="w-9 h-9 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 flex items-center justify-center transition-all active:scale-95 shadow-2xs"
            title="Papan Peringkat Liga"
          >
            <Trophy className="w-4 h-4 text-amber-600" />
          </button>

          {/* Parent Zone PIN Button */}
          {profile.audience === 'child' && (
            <button
              onClick={onOpenParentDashboard}
              className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-all active:scale-95 shadow-2xs"
              title="Area Orang Tua (PIN)"
            >
              <ShieldCheck className="w-4 h-4 text-slate-600" />
            </button>
          )}

          {/* Sound Mute Toggle */}
          <button
            onClick={onToggleMute}
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-all active:scale-95 shadow-2xs"
            title={isMuted ? 'Nyalakan Suara' : 'Matikan Suara'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-teal-600" />}
          </button>

          {/* Mobile Phone / Responsive Web Frame Toggle */}
          <button
            onClick={onToggleMobileFrame}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all active:scale-95 shadow-2xs ${
              isMobileFrame ? 'bg-teal-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
            title={isMobileFrame ? 'Tampilan Desktop Lebar' : 'Simulasi Android Mobile Phone'}
          >
            {isMobileFrame ? <Smartphone className="w-4 h-4" /> : <Monitor className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
