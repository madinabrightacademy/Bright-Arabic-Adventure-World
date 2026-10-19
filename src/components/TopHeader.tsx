import React, { useState } from 'react';
import {
  Sparkles,
  Star,
  Trophy,
  Volume2,
  VolumeX,
  Smartphone,
  Monitor,
  ShieldCheck,
  Heart,
  Home,
  BookOpen,
  Compass,
  Gamepad2,
  User,
  Menu,
  X,
  Flame,
  ChevronDown
} from 'lucide-react';
import { UserProfile } from '../types/game';
import { sound } from '../services/sound';
import { NavTab } from './Navigation';

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
  onOpenDailyStreak?: () => void;
  onOpenDailyTargets?: () => void;
  onOpenDailyAdab?: () => void;
  onOpenIqra?: () => void;
  onOpenGlossary?: () => void;
  currentTab?: NavTab;
  onNavigateTab?: (tab: NavTab) => void;
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
  onChangeAudience,
  onOpenDailyStreak,
  onOpenDailyTargets,
  onOpenDailyAdab,
  onOpenIqra,
  onOpenGlossary,
  currentTab = 'home',
  onNavigateTab
}) => {
  const [showQuickMenu, setShowQuickMenu] = useState(false);
  const crystalCount = Object.values(profile.crystals).filter(Boolean).length;

  const desktopTabs = [
    { id: 'home' as NavTab, label: 'Beranda', icon: Home },
    { id: 'learn' as NavTab, label: 'Belajar', icon: BookOpen },
    { id: 'world' as NavTab, label: 'Peta 3D', icon: Compass },
    { id: 'games' as NavTab, label: 'Game', icon: Gamepad2 },
    { id: 'profile' as NavTab, label: 'Profil', icon: User }
  ];

  const mascotAvatarIcon =
    profile.avatar === 'aira' ? '👧 Amira' : profile.avatar === 'kustom' ? '🧒 Kustom' : '👦 Zaki';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-amber-200/90 px-3 sm:px-6 py-2 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Left: Mascot Avatar & Kid Info */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenCompanionRoom}
            className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-2xl bg-gradient-to-r from-amber-100 to-teal-50 border-2 border-amber-300 hover:border-amber-400 shadow-xs transition-all active:scale-95 text-left cursor-pointer"
            title="Kamar Maskot Zaki & Hudhud"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white flex items-center justify-center text-lg shadow-xs relative">
              <span>{profile.avatar === 'aira' ? '👧' : '👦'}</span>
              <span className="absolute -bottom-1 -right-1 text-[11px]" title="Sahabat Hudhud">
                🐣
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-black text-xs text-slate-800 leading-none max-w-[70px] sm:max-w-[110px] truncate block">
                  {profile.name}
                </span>
                <span className="text-[10px] bg-teal-600 text-white font-extrabold px-1.5 py-0.2 rounded-full leading-none shrink-0">
                  {profile.rutbah}
                </span>
              </div>
              <span className="text-[10px] text-amber-800 font-bold mt-0.5 block">
                {mascotAvatarIcon}
              </span>
            </div>
          </button>

          {/* Audience switch (Anak vs Dewasa) */}
          <div className="hidden sm:flex bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-[11px] font-bold">
            <button
              type="button"
              onClick={() => onChangeAudience('child')}
              className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                profile.audience === 'child'
                  ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Jalur Anak 🎈
            </button>
            <button
              type="button"
              onClick={() => onChangeAudience('adult')}
              className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                profile.audience === 'adult'
                  ? 'bg-teal-700 text-white font-black shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Jalur Dewasa 💼
            </button>
          </div>
        </div>

        {/* Center: Desktop Navigation Bar */}
        {onNavigateTab && (
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 p-1 rounded-2xl border border-slate-200 shadow-2xs">
            {desktopTabs.map((t) => {
              const Icon = t.icon;
              const isActive = currentTab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    sound.playPop();
                    onNavigateTab(t.id);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-teal-700 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </nav>
        )}

        {/* Center-Right: Core Gamification Stats (Unified capsule, clean & shiny) */}
        <div className="flex items-center gap-1.5 text-xs font-black">
          {/* Daily Streak Flame */}
          <button
            type="button"
            onClick={onOpenDailyStreak}
            className="flex items-center gap-1 bg-gradient-to-r from-orange-100 to-amber-100 border-2 border-orange-400 text-orange-950 px-2 sm:px-2.5 py-1.2 rounded-xl shadow-xs cursor-pointer hover:scale-105 active:scale-95 transition-all"
            title="Buka Istiqamah Harian (Streak)"
          >
            <span className="text-sm">🔥</span>
            <span>{profile.dailyStreak}</span>
          </button>

          {/* XP Pill */}
          <div className="flex items-center gap-1 bg-amber-50 border border-amber-300 text-amber-950 px-2 sm:px-2.5 py-1.2 rounded-xl shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>{profile.xp} XP</span>
          </div>

          {/* Stars Pill */}
          <div className="flex items-center gap-1 bg-yellow-50 border border-yellow-300 text-yellow-950 px-2 sm:px-2.5 py-1.2 rounded-xl shadow-2xs">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{profile.stars}</span>
          </div>
        </div>

        {/* Right: Controls & Quick Menu (Reduces clutter to 0!) */}
        <div className="flex items-center gap-1.5 relative">
          {/* Quick Hub Dropdown Button (holds secondary modals without polluting the header!) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                sound.playPop();
                setShowQuickMenu(!showQuickMenu);
              }}
              className="px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-teal-700 to-cyan-800 hover:from-teal-600 hover:to-cyan-700 text-white font-black text-xs shadow-xs flex items-center gap-1 cursor-pointer transition-all active:scale-95"
              title="Menu Pendukung & Harian"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">Fitur</span>
              <ChevronDown className="w-3 h-3 text-teal-200" />
            </button>

            {/* Floating Dropdown Menu */}
            {showQuickMenu && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setShowQuickMenu(false)}
                />
                <div className="absolute right-0 top-11 w-56 bg-white rounded-2xl shadow-xl border-2 border-amber-200 p-2 z-40 space-y-1 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-2 py-1 text-[10px] font-black text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    Aktivitas & Karakter
                  </div>

                  {onOpenIqra && (
                    <button
                      type="button"
                      onClick={() => {
                        setShowQuickMenu(false);
                        onOpenIqra();
                      }}
                      className="w-full px-2.5 py-1.5 rounded-xl hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors text-left"
                    >
                      <span>📖</span>
                      <span>Petualangan Iqra 1–6</span>
                    </button>
                  )}

                  {onOpenDailyTargets && (
                    <button
                      type="button"
                      onClick={() => {
                        setShowQuickMenu(false);
                        onOpenDailyTargets();
                      }}
                      className="w-full px-2.5 py-1.5 rounded-xl hover:bg-teal-50 text-slate-700 hover:text-teal-900 font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors text-left"
                    >
                      <span>🎯</span>
                      <span>Target 4 Pilar Harian</span>
                    </button>
                  )}

                  {onOpenDailyAdab && (
                    <button
                      type="button"
                      onClick={() => {
                        setShowQuickMenu(false);
                        onOpenDailyAdab();
                      }}
                      className="w-full px-2.5 py-1.5 rounded-xl hover:bg-pink-50 text-slate-700 hover:text-pink-900 font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors text-left"
                    >
                      <span>🌟</span>
                      <span>Adab Santri & Amalan</span>
                    </button>
                  )}

                  {onOpenGlossary && (
                    <button
                      type="button"
                      onClick={() => {
                        setShowQuickMenu(false);
                        onOpenGlossary();
                      }}
                      className="w-full px-2.5 py-1.5 rounded-xl hover:bg-amber-50 text-slate-700 hover:text-amber-900 font-bold text-xs flex items-center justify-between cursor-pointer transition-colors text-left"
                    >
                      <div className="flex items-center gap-2">
                        <span>📚</span>
                        <span>Buku Kata Sulit</span>
                      </div>
                      {profile.difficultWords.length > 0 && (
                        <span className="bg-rose-500 text-white text-[10px] font-black px-1.5 py-0.2 rounded-full">
                          {profile.difficultWords.length}
                        </span>
                      )}
                    </button>
                  )}

                  <div className="border-t border-slate-100 my-1" />

                  <button
                    type="button"
                    onClick={() => {
                      setShowQuickMenu(false);
                      onOpenLeaderboard();
                    }}
                    className="w-full px-2.5 py-1.5 rounded-xl hover:bg-yellow-50 text-slate-700 hover:text-yellow-900 font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors text-left"
                  >
                    <span>🏆</span>
                    <span>Papan Peringkat Liga</span>
                  </button>

                  {profile.audience === 'child' && (
                    <button
                      type="button"
                      onClick={() => {
                        setShowQuickMenu(false);
                        onOpenParentDashboard();
                      }}
                      className="w-full px-2.5 py-1.5 rounded-xl hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors text-left"
                    >
                      <span>🛡️</span>
                      <span>Area Orang Tua (PIN)</span>
                    </button>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Sound Mute Toggle */}
          <button
            type="button"
            onClick={onToggleMute}
            aria-label={isMuted ? 'Nyalakan Suara Game' : 'Matikan Suara Game'}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-all active:scale-95 shadow-2xs cursor-pointer"
            title={isMuted ? 'Nyalakan Suara' : 'Matikan Suara'}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-rose-500" />
            ) : (
              <Volume2 className="w-4 h-4 text-teal-600" />
            )}
          </button>

          {/* Responsive Mobile Phone Toggle */}
          <button
            type="button"
            onClick={onToggleMobileFrame}
            aria-label={isMobileFrame ? 'Beralih ke Tampilan Desktop' : 'Beralih ke Simulasi Ponsel Mobile'}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all active:scale-95 shadow-2xs cursor-pointer ${
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
