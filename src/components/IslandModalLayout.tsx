import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Volume2,
  Sparkles,
  CheckCircle2,
  Lock,
  Layers,
  Award,
  ChevronRight,
  X
} from 'lucide-react';
import { sound } from '../services/sound';

export interface IslandModalTab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
}

export interface IslandGuideInfo {
  name: string;
  role: string;
  avatar: string; // emoji or character
  greetingAr: string;
  speechText: string;
  onClaimXP?: () => void;
  claimedXP?: boolean;
}

export interface IslandModalLayoutProps {
  island: {
    id: string;
    name_id: string;
    name_ar: string;
    domain?: string;
    biome?: string;
    crystalName?: string;
    minLevel?: number;
    color?: string;
  };
  hasCrystal?: boolean;
  isUnlocked?: boolean;
  guide?: IslandGuideInfo;
  tabs: IslandModalTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  onClose: () => void;
  children: React.ReactNode;
}

export const IslandModalLayout: React.FC<IslandModalLayoutProps> = ({
  island,
  hasCrystal = false,
  isUnlocked = true,
  guide,
  tabs,
  activeTab,
  onTabChange,
  onClose,
  children
}) => {
  const handlePlayArabic = () => {
    sound.speakArabic(island.name_ar, 0.9);
  };

  const handleGuideGreeting = () => {
    if (guide?.greetingAr) {
      sound.speakArabic(guide.greetingAr);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 16 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="w-full max-w-4xl bg-gradient-to-b from-white via-slate-50 to-amber-50/40 rounded-3xl sm:rounded-[36px] shadow-2xl border-2 sm:border-4 border-amber-300 overflow-hidden flex flex-col my-auto max-h-[94vh]"
      >
        {/* PARROTO UNIFIED HERO HEADER */}
        <div className="relative bg-gradient-to-r from-teal-800 via-cyan-800 to-indigo-900 text-white p-4 sm:p-5 border-b-2 sm:border-b-4 border-amber-300 shadow-md">
          {/* Subtle decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-400/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-amber-400/10 rounded-full blur-xl pointer-events-none" />

          <div className="relative z-10 flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              {/* Island Icon Badge */}
              <div
                className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl flex items-center justify-center text-3xl sm:text-4xl shadow-md border-2 border-white/30 shrink-0"
                style={{ backgroundColor: island.color ? `${island.color}40` : 'rgba(255,255,255,0.2)' }}
              >
                🏝️
              </div>

              <div>
                {/* Status Badges */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider bg-teal-400 text-teal-950 px-2.5 py-0.5 rounded-full shadow-xs">
                    {island.minLevel !== undefined ? `Level ${island.minLevel}` : 'Pulau Utama'}
                  </span>
                  {island.biome && (
                    <span className="text-[10px] sm:text-xs bg-white/20 text-teal-100 font-bold px-2 py-0.5 rounded-full">
                      {island.biome}
                    </span>
                  )}
                  {hasCrystal ? (
                    <span className="text-[10px] sm:text-xs font-black text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded-full border border-amber-300/40 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>💎 {island.crystalName || 'Kristal Diraih'}</span>
                    </span>
                  ) : (
                    <span className="text-[10px] sm:text-xs text-teal-200 font-bold bg-white/10 px-2 py-0.5 rounded-full">
                      💎 {island.crystalName || 'Misi Kristal'}
                    </span>
                  )}
                </div>

                {/* Island Names & Audio Speaker */}
                <div className="flex items-baseline gap-2.5 mt-1">
                  <h2 className="text-lg sm:text-2xl font-black font-chibi text-white flex items-center gap-1.5">
                    <span>{island.name_id}</span>
                  </h2>
                  <span className="text-xl sm:text-2xl font-arabic font-black text-amber-300">
                    {island.name_ar}
                  </span>
                  <button
                    type="button"
                    onClick={handlePlayArabic}
                    className="p-1 rounded-lg bg-white/15 hover:bg-white/25 active:scale-95 text-amber-300 transition-all cursor-pointer"
                    title="Dengarkan pelafalan bahasa Arab"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/15 hover:bg-white/30 text-white font-bold flex items-center justify-center transition-all active:scale-95 cursor-pointer shrink-0 shadow-md border border-white/20"
              title="Tutup Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* MASCOT GUIDE SPEECH STRIP (Progressive Disclosure) */}
          {guide && (
            <div className="mt-3 bg-white/10 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 border border-white/20 flex flex-col sm:flex-row items-center justify-between gap-2.5">
              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleGuideGreeting}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-amber-400 text-amber-950 font-black text-2xl flex items-center justify-center shrink-0 shadow-md active:scale-95 transition-all hover:bg-amber-300 cursor-pointer"
                  title="Dengarkan Sapaan Pemandu"
                >
                  {guide.avatar}
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-black text-amber-200 truncate">{guide.name}</h4>
                    <span className="text-[10px] text-teal-200 font-bold bg-white/15 px-1.5 py-0.2 rounded-md">
                      {guide.role}
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-teal-100/90 leading-tight mt-0.5 line-clamp-2 sm:line-clamp-1">
                    "{guide.speechText}"
                  </p>
                </div>
              </div>

              {/* Guide Action / Reward Button */}
              <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={handleGuideGreeting}
                  className="py-1 px-2.5 bg-white/15 hover:bg-white/25 text-amber-200 text-xs font-bold rounded-xl flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Dengar</span>
                </button>

                {guide.onClaimXP && !guide.claimedXP && (
                  <button
                    type="button"
                    onClick={guide.onClaimXP}
                    className="py-1 px-3 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 text-xs font-black rounded-xl shadow-xs flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                    <span>Ambil Berkah (+60 XP)</span>
                  </button>
                )}
                {guide.claimedXP && (
                  <span className="text-[11px] font-bold text-emerald-300 bg-emerald-500/20 px-2.5 py-1 rounded-xl flex items-center gap-1 border border-emerald-400/30">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Berkah Diterima (+60 XP)</span>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* UNIFIED SEGMENTED PILL TAB NAVIGATION */}
        <div className="bg-amber-100/70 border-b border-amber-200/80 px-3 sm:px-6 py-2.5 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  sound.playPop();
                  onTabChange(tab.id);
                }}
                className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-2xl font-bold text-xs whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-teal-700 text-white shadow-md font-black scale-102 ring-2 ring-teal-500/50'
                    : 'bg-white/80 text-slate-700 hover:bg-white hover:text-slate-900 border border-amber-200/50'
                }`}
              >
                {tab.icon && <span className="text-sm">{tab.icon}</span>}
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                      isActive ? 'bg-amber-400 text-slate-950' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* MODAL MAIN CONTENT BODY (Smooth Scrollable) */}
        <div className="p-3 sm:p-5 flex-1 overflow-y-auto space-y-4">
          {children}
        </div>
      </motion.div>
    </div>
  );
};
