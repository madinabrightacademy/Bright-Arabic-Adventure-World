import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Sparkles,
  Mail,
  Trophy,
  Star,
  ArrowRight,
  BookOpen,
  Flame,
  Compass,
  Heart,
  Award,
  CheckCircle2,
  Lock,
  ChevronRight,
  Gift,
  Check,
  Volume2
} from 'lucide-react';
import { UserProfile, IslandId } from '../types/game';
import { sound } from '../services/sound';
import { ISLANDS_DATA } from '../data/curriculum';
import { ACHIEVEMENTS_CATALOG, AchievementItem } from '../data/achievements';
import { GameStorage } from '../services/storage';
import { AchievementBadgeModal } from './AchievementBadgeModal';
import { MascotCharacter, MascotType } from './MascotCharacter';

interface HomeViewProps {
  profile: UserProfile;
  onNavigateTab: (tab: any) => void;
  onLaunchGame: (gameId: string) => void;
  onOpenHudhudLetter: () => void;
  onOpenCompanionRoom: () => void;
  onOpenLeaderboard: () => void;
  onOpenRealWorldMissions: () => void;
  onReward?: (xp: number, stars: number) => void;
  onOpenIqra?: () => void;
  onOpenDailyStreak?: () => void;
  onOpenDailyTargets?: () => void;
  onOpenDailyAdab?: () => void;
  onOpenGlossary?: () => void;
  onUpdateProfile?: (p: UserProfile) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  profile,
  onNavigateTab,
  onLaunchGame,
  onOpenHudhudLetter,
  onOpenCompanionRoom,
  onOpenLeaderboard,
  onOpenRealWorldMissions,
  onReward,
  onOpenIqra,
  onOpenDailyStreak,
  onOpenDailyTargets,
  onOpenDailyAdab,
  onOpenGlossary,
  onUpdateProfile
}) => {
  const [selectedBadgeModal, setSelectedBadgeModal] = useState<AchievementItem | null>(null);
  const [activeMascot, setActiveMascot] = useState<MascotType>(
    profile.avatar === 'aira' ? 'amira' : 'zaki'
  );
  
  // Persisted in GameStorage so switching tabs does not reset chest status
  const isChestAlreadyClaimed = GameStorage.isDailyChestClaimed();

  // Today's 4-Step Adventure Journey (Parroto / Duolingo clear step-by-step game progression)
  const dailyJourneySteps = [
    {
      step: 1,
      title: 'Pemanasan Huruf',
      subtitle: 'Jejak Pasir Mutiara (Huruf Hijaiyah)',
      icon: '🏖️',
      gameId: 'sand_trace',
      reward: '+30 XP • ⭐ 1',
      isCompleted: (profile.skillsMastered || []).length > 0,
      color: 'from-amber-400 to-yellow-500',
      borderColor: 'border-amber-400',
      badgeBg: 'bg-amber-100 text-amber-900'
    },
    {
      step: 2,
      title: 'Tebak Kosakata Apung',
      subtitle: 'Belanja Buah & Benda Arab (Mufradat)',
      icon: '⛵',
      gameId: 'floating_market',
      reward: '+40 XP • ⭐ 1',
      isCompleted: (profile.wordsMastered || []).length >= 3,
      color: 'from-orange-400 to-amber-500',
      borderColor: 'border-orange-400',
      badgeBg: 'bg-orange-100 text-orange-900'
    },
    {
      step: 3,
      title: 'Detektif Suara & Gema',
      subtitle: 'Tebak Suara Huruf Fusha (Istima\')',
      icon: '🎧',
      gameId: 'echo_cave',
      reward: '+50 XP • ⭐ 2',
      isCompleted: (profile.hudhudTraits.sam || 0) >= 10,
      color: 'from-teal-400 to-emerald-500',
      borderColor: 'border-teal-400',
      badgeBg: 'bg-teal-100 text-teal-900'
    },
    {
      step: 4,
      title: 'Peti Harta Karun Berkah',
      subtitle: 'Buka Hadiah Harian & Bintang Emas',
      icon: '🎁',
      gameId: 'chest',
      reward: '+100 XP • ⭐ 3',
      isCompleted: isChestAlreadyClaimed,
      color: 'from-purple-500 to-indigo-600',
      borderColor: 'border-purple-400',
      badgeBg: 'bg-purple-100 text-purple-900'
    }
  ];

  // Determine current active step
  const currentStepIndex = dailyJourneySteps.findIndex(s => !s.isCompleted);
  const activeStep = currentStepIndex !== -1 ? dailyJourneySteps[currentStepIndex] : dailyJourneySteps[3];

  const handleClaimChest = () => {
    if (isChestAlreadyClaimed) return;
    const res = GameStorage.claimDailyChest();
    if (res.success) {
      sound.playFanfare();
      sound.playSparkle();
      if (onReward) {
        onReward(res.xp, res.stars);
      }
      if (onUpdateProfile) {
        onUpdateProfile(res.profile);
      }
    }
  };

  const handleMascotSpeech = () => {
    sound.speakArabic('أَهْلًا وَسَهْلًا يَا صَدِيقِي');
  };

  const unlockedAchievementsCount = ACHIEVEMENTS_CATALOG.filter(a => a.isUnlocked(profile)).length;
  const highlightAchievementIds = [
    'ach_first_island',
    'ach_words_100',
    'ach_daily_missions_10',
    'ach_all_crystals',
    'ach_island_hrf',
    'ach_streak_7'
  ];
  const homeBadges = highlightAchievementIds
    .map(id => ACHIEVEMENTS_CATALOG.find(a => a.id === id))
    .filter(Boolean) as AchievementItem[];

  return (
    <div className="space-y-4 pb-24 pt-2 px-3 sm:px-6 lg:px-8 w-full max-w-5xl mx-auto">
      {/* ==========================================================
          1. PARROTO-STYLE HERO BANNER: MASCOT STAGE & STEP-BY-STEP
          ========================================================== */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-teal-600 via-teal-700 to-emerald-800 text-white p-4 sm:p-6 shadow-xl border-4 border-amber-300">
        {/* Playful Floating Badges / Clouds */}
        <div className="absolute top-2 right-4 text-3xl opacity-20 pointer-events-none select-none">☁️</div>
        <div className="absolute bottom-2 left-6 text-3xl opacity-20 pointer-events-none select-none">✨</div>

        {/* Top Mini Bar: Streak Flame + Mascot Selector */}
        <div className="flex items-center justify-between mb-3 relative z-10 flex-wrap gap-2">
          <div className="flex items-center gap-1.5 bg-black/25 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-black">
            <Flame className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
            <span>Streak: {profile.dailyStreak} Hari Berturut-turut!</span>
          </div>

          {/* Quick Mascot Selector (Zaki / Amira / Hudhud) */}
          <div className="flex items-center gap-1 bg-white/20 backdrop-blur-xs p-1 rounded-full text-[11px] font-bold">
            <span className="text-white/80 px-1 text-[10px] hidden sm:inline">Sahabat:</span>
            <button
              type="button"
              onClick={() => {
                sound.playPop();
                setActiveMascot('zaki');
              }}
              className={`px-2.5 py-0.5 rounded-full transition-all cursor-pointer ${
                activeMascot === 'zaki'
                  ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                  : 'text-white/90 hover:bg-white/20'
              }`}
            >
              👦 Zaki
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playPop();
                setActiveMascot('amira');
              }}
              className={`px-2.5 py-0.5 rounded-full transition-all cursor-pointer ${
                activeMascot === 'amira'
                  ? 'bg-pink-400 text-slate-950 font-black shadow-xs'
                  : 'text-white/90 hover:bg-white/20'
              }`}
            >
              👧 Amira
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playPop();
                setActiveMascot('hudhud');
              }}
              className={`px-2.5 py-0.5 rounded-full transition-all cursor-pointer ${
                activeMascot === 'hudhud'
                  ? 'bg-amber-300 text-slate-950 font-black shadow-xs'
                  : 'text-white/90 hover:bg-white/20'
              }`}
            >
              🐣 Hudhud
            </button>
          </div>
        </div>

        {/* Mascot Center Stage with Speech Bubble */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 my-2 relative z-10">
          <MascotCharacter
            type={activeMascot}
            mood={activeStep.step === 4 ? 'celebrate' : 'cheer'}
            size="lg"
            speechArabic="مَرْحَبًا بِكَ يَا بَطَل!"
            speechBubble={`Hai ${profile.name}! Aku menemanimu hari ini. Yuk selesaikan Langkah ${activeStep.step}: ${activeStep.title}!`}
            onTap={handleMascotSpeech}
          />

          <div className="text-center sm:text-left max-w-md">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black shadow-sm mb-1.5">
              <span>🎯 Misi Petualangan Hari Ini</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-chibi text-white leading-tight drop-shadow-sm">
              Langkah {activeStep.step} dari 4: {activeStep.title}
            </h2>
            <p className="text-xs sm:text-sm text-teal-100 mt-1 leading-relaxed">
              {activeStep.subtitle}. Selesaikan seluruh langkah untuk membuka Peti Harta Karun Berkah!
            </p>

            {/* Prominent Tactile 3D Action Button (Parroto style) */}
            <div className="mt-3.5 flex items-center gap-2 flex-wrap">
              {activeStep.gameId === 'chest' ? (
                <button
                  type="button"
                  onClick={handleClaimChest}
                  disabled={isChestAlreadyClaimed}
                  className={`py-3 px-6 rounded-2xl font-black text-sm shadow-xl flex items-center gap-2 border-b-4 transition-all cursor-pointer active:translate-y-1 active:border-b-0 ${
                    isChestAlreadyClaimed
                      ? 'bg-slate-400 border-slate-600 text-slate-800'
                      : 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 border-amber-600 text-slate-950'
                  }`}
                >
                  <Gift className="w-5 h-5" />
                  <span>{isChestAlreadyClaimed ? 'Peti Harian Sudah Diklaim ✨' : 'Buka Peti Emas Sekarang (+100 XP) 🎁'}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => onLaunchGame(activeStep.gameId)}
                  className="py-3 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm shadow-xl flex items-center gap-2 border-b-4 border-amber-600 transition-all cursor-pointer active:translate-y-1 active:border-b-0"
                >
                  <Play className="w-5 h-5 fill-slate-950" />
                  <span>Mainkan Langkah {activeStep.step} Sekarang</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              <button
                type="button"
                onClick={onOpenCompanionRoom}
                className="py-3 px-4 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs flex items-center gap-1.5 backdrop-blur-xs transition-all active:scale-95 cursor-pointer"
              >
                <Heart className="w-4 h-4 text-pink-300" />
                <span>Kamar Sahabat</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4-Step Progress Journey Bar (Visual Clarity, No Confusion) */}
        <div className="mt-5 pt-4 border-t border-teal-500/50 relative z-10">
          <div className="flex items-center justify-between text-xs font-bold text-teal-200 mb-2">
            <span>Alur Petualangan 4 Langkah</span>
            <span className="text-amber-300 font-black">
              {dailyJourneySteps.filter(s => s.isCompleted).length}/4 Selesai
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {dailyJourneySteps.map((step) => {
              const isCurrent = step.step === activeStep.step;
              return (
                <button
                  key={step.step}
                  type="button"
                  onClick={() => {
                    if (step.gameId === 'chest') {
                      handleClaimChest();
                    } else {
                      onLaunchGame(step.gameId);
                    }
                  }}
                  className={`p-2.5 rounded-2xl border-2 text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                    step.isCompleted
                      ? 'bg-teal-900/80 border-emerald-400 text-white shadow-xs'
                      : isCurrent
                      ? 'bg-amber-400 text-slate-950 border-white shadow-lg ring-2 ring-amber-300 scale-102'
                      : 'bg-black/20 border-white/20 text-teal-100 hover:bg-black/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg">{step.icon}</span>
                    {step.isCompleted ? (
                      <span className="bg-emerald-400 text-emerald-950 text-[9px] font-black px-1.5 py-0.2 rounded-full flex items-center gap-0.5">
                        <Check className="w-2.5 h-2.5" /> Selesai
                      </span>
                    ) : isCurrent ? (
                      <span className="bg-slate-950 text-amber-300 text-[9px] font-black px-1.5 py-0.2 rounded-full animate-pulse">
                        Giliranmu ▶
                      </span>
                    ) : (
                      <span className="text-[10px] text-teal-300">#{step.step}</span>
                    )}
                  </div>

                  <div className="mt-2">
                    <span className="block font-black text-xs leading-tight line-clamp-1">
                      {step.title}
                    </span>
                    <span className={`block text-[10px] font-medium line-clamp-1 mt-0.5 ${isCurrent ? 'text-slate-800' : 'text-teal-200'}`}>
                      {step.reward}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ==========================================================
          2. PUSAT 4 PILAR EDUKASI (CLEAN, NO DUPLICATION)
          ========================================================== */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Pilar 1: Iqra & Tartil */}
        <button
          type="button"
          onClick={onOpenIqra}
          className="p-3.5 rounded-3xl bg-white border-2 border-emerald-200 hover:border-emerald-400 shadow-xs hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-xl group-hover:scale-105 transition-transform">
              📖
            </div>
            <span className="text-[10px] font-black bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
              Iqra 1–6
            </span>
          </div>
          <div className="mt-3">
            <h4 className="font-black text-sm text-slate-900 group-hover:text-emerald-700 transition-colors">
              Iqra & Tartil
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
              Panduan baca huruf Al-Qur'an
            </p>
          </div>
        </button>

        {/* Pilar 2: Target Harian */}
        <button
          type="button"
          onClick={onOpenDailyTargets}
          className="p-3.5 rounded-3xl bg-white border-2 border-teal-200 hover:border-teal-400 shadow-xs hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center text-xl group-hover:scale-105 transition-transform">
              🎯
            </div>
            <span className="text-[10px] font-black bg-teal-50 text-teal-800 px-2 py-0.5 rounded-full border border-teal-200">
              4 Target
            </span>
          </div>
          <div className="mt-3">
            <h4 className="font-black text-sm text-slate-900 group-hover:text-teal-700 transition-colors">
              Target Belajar
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
              Membaca, kosa kata & game
            </p>
          </div>
        </button>

        {/* Pilar 3: Adab Santri */}
        <button
          type="button"
          onClick={onOpenDailyAdab}
          className="p-3.5 rounded-3xl bg-white border-2 border-pink-200 hover:border-pink-400 shadow-xs hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-pink-100 text-pink-800 flex items-center justify-center text-xl group-hover:scale-105 transition-transform">
              🌟
            </div>
            <span className="text-[10px] font-black bg-pink-50 text-pink-800 px-2 py-0.5 rounded-full border border-pink-200">
              10 Amalan
            </span>
          </div>
          <div className="mt-3">
            <h4 className="font-black text-sm text-slate-900 group-hover:text-pink-700 transition-colors">
              Adab & Karakter
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
              Kebaikan santri sehari-hari
            </p>
          </div>
        </button>

        {/* Pilar 4: Buku Kata Sulit */}
        <button
          type="button"
          onClick={onOpenGlossary}
          className="p-3.5 rounded-3xl bg-white border-2 border-amber-200 hover:border-amber-400 shadow-xs hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer relative"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-xl group-hover:scale-105 transition-transform">
              📚
            </div>
            <span className="text-[10px] font-black bg-amber-50 text-amber-800 px-2 py-0.5 rounded-full border border-amber-200">
              {profile.difficultWords.length} Kata
            </span>
          </div>
          <div className="mt-3">
            <h4 className="font-black text-sm text-slate-900 group-hover:text-amber-700 transition-colors">
              Buku Kata Sulit
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
              Pengulangan kosa kata penting
            </p>
          </div>
        </button>
      </div>

      {/* ==========================================================
          3. PINTU KE DUNIA 8 PULAU & MODUL BELAJAR (COMPACT & CLEAR)
          ========================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* Card 1: Peta Dunia 8 Pulau */}
        <div className="rounded-3xl p-4.5 bg-gradient-to-r from-teal-800 via-cyan-900 to-blue-950 text-white shadow-md border-2 border-teal-400/40 flex flex-col justify-between">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 block">
                Petualangan Kepulauan
              </span>
              <h3 className="font-black text-base font-chibi text-white mt-0.5 flex items-center gap-1.5">
                <span>🗺️ Peta 8 Pulau Bahasa Arab</span>
              </h3>
              <p className="text-xs text-teal-200 mt-1 leading-snug">
                Jelajahi pulau Huruf, Mufradat, Hiwar, Qawa'id, hingga Istima' dalam dunia 3D.
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-teal-600/40 border border-teal-300/40 flex items-center justify-center text-2xl shrink-0">
              🏝️
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-teal-700/60 flex items-center justify-between">
            <span className="text-xs font-bold text-teal-200">
              💎 {Object.values(profile.crystals).filter(Boolean).length}/8 Kristal Diraih
            </span>
            <button
              type="button"
              onClick={() => onNavigateTab('world')}
              className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-1"
            >
              <span>Buka Peta 3D</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card 2: Kurikulum & Jalur Belajar Bertingkat */}
        <div className="rounded-3xl p-4.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 shadow-md border-2 border-amber-300 flex flex-col justify-between">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-950 block">
                Kurikulum Mandiri & Lengkap
              </span>
              <h3 className="font-black text-base font-chibi text-slate-950 mt-0.5 flex items-center gap-1.5">
                <span>📖 Modul Belajar Bertingkat</span>
              </h3>
              <p className="text-xs text-amber-950/80 mt-1 leading-snug">
                Belajar teori, mendengarkan makhraj, dan latihan interaktif dari tingkat Pemula (J0) hingga Mahir (J5).
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-300/40 border border-amber-400/40 flex items-center justify-center text-2xl shrink-0">
              🎓
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-amber-400/60 flex items-center justify-between">
            <span className="text-xs font-black text-amber-950">
              Gelar: {profile.rutbah}
            </span>
            <button
              type="button"
              onClick={() => onNavigateTab('learn')}
              className="px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-amber-300 font-black text-xs shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-1"
            >
              <span>Buka Kurikulum</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ==========================================================
          4. LENCANA PRESTASI (ACHIEVEMENTS RIBBON - CLEAN & NON-INTRUSIVE)
          ========================================================== */}
      <div className="bg-white rounded-3xl p-4 border-2 border-amber-200 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center text-base">
              🏆
            </div>
            <div>
              <h4 className="font-black text-sm text-slate-900">Medali Prestasi</h4>
              <p className="text-[11px] text-slate-500">
                {unlockedAchievementsCount} dari {ACHIEVEMENTS_CATALOG.length} medali telah kamu raih!
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigateTab('profile')}
            className="text-xs font-black text-teal-700 hover:text-teal-900 flex items-center gap-0.5 cursor-pointer"
          >
            Lihat Semua <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Badges Carousel */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
          {homeBadges.map((ach) => {
            const isUnlocked = ach.isUnlocked(profile);
            const isClaimed = (profile.achievements || []).includes(ach.id);

            return (
              <button
                key={ach.id}
                type="button"
                onClick={() => {
                  sound.playSparkle();
                  setSelectedBadgeModal(ach);
                }}
                className={`flex-shrink-0 w-24 p-2 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between ${
                  isUnlocked
                    ? isClaimed
                      ? 'bg-slate-50 border-amber-300 text-slate-800'
                      : 'bg-amber-50 border-amber-400 text-amber-950 ring-2 ring-amber-300 animate-pulse'
                    : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${ach.badgeBg} border ${ach.badgeBorder} flex items-center justify-center text-xl shadow-xs mb-1`}
                >
                  <span>{ach.badgeIcon}</span>
                </div>
                <span className="text-[10px] font-black line-clamp-1 leading-tight">
                  {ach.title}
                </span>
                <span className="text-[9px] font-bold text-amber-700 mt-0.5">
                  +{ach.rewardXp} XP
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Modal Detail Badge */}
      <AchievementBadgeModal
        achievement={selectedBadgeModal}
        profile={profile}
        onClose={() => setSelectedBadgeModal(null)}
        onClaim={(ach) => {
          if ((profile.achievements || []).includes(ach.id)) return;
          const nextAchievements = [...(profile.achievements || []), ach.id];
          const updated = {
            ...profile,
            achievements: nextAchievements,
            xp: profile.xp + ach.rewardXp,
            stars: profile.stars + ach.rewardStars
          };
          GameStorage.saveProfile(updated);
          if (onReward) onReward(ach.rewardXp, ach.rewardStars);
        }}
      />
    </div>
  );
};
