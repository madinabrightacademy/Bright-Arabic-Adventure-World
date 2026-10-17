import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  ChevronRight, 
  ChevronLeft,
  Layers, 
  Compass, 
  Play, 
  Volume2, 
  CheckCircle2, 
  Lock, 
  ArrowRight, 
  Maximize2, 
  RotateCw, 
  MapPin, 
  Flame, 
  Award,
  Star,
  BookOpen,
  Info,
  Smile,
  Zap,
  Target
} from 'lucide-react';
import { UserProfile, IslandId } from '../types/game';
import { sound } from '../services/sound';
import { ISLANDS_DATA } from '../data/curriculum';
import { getFriendlyIslandName, getFriendlyLevel } from '../data/skillPedagogy';
import { R3FWorldMap, ISLAND_CONFIGS } from './R3FWorldMap';
import { MascotCharacter } from './MascotCharacter';

export type MascotId = 'hudhud' | 'zayd' | 'maryam';

interface MascotConfig {
  id: MascotId;
  name: string;
  title: string;
  avatar: string;
  roleBadge: string;
  themeColor: string;
  greetingAr: string;
  dialogues: {
    welcome: string;
    stepPrompt: string;
    crystalPrompt: string;
  };
}

const MASCOTS: MascotConfig[] = [
  {
    id: 'zayd',
    name: 'Zayd',
    title: 'Petualang Cilik Ceria',
    avatar: '👦',
    roleBadge: 'Kapten Petualang',
    themeColor: 'from-amber-400 to-orange-500',
    greetingAr: 'مَرْحَبًا يَا أَصْدِقَائِي! هَيَّا نَسْتَكْشِفُ الجُزُرَ!',
    dialogues: {
      welcome: 'Ahlan Petualang! Ayo pilih pulau atau ikuti Jalur Langkah Petualangan seperti di Parroto!',
      stepPrompt: 'Langkah demi langkah, kita kumpulkan semua 8 Kristal Bahasa Arab!',
      crystalPrompt: 'Hebat! Terus tingkatkan kemampuan bahasa fusha-mu!'
    }
  },
  {
    id: 'maryam',
    name: 'Maryam',
    title: 'Penjelajah Cilik Cerdas',
    avatar: '🧕',
    roleBadge: 'Pemandu Qurani',
    themeColor: 'from-teal-400 to-emerald-500',
    greetingAr: 'أَهْلاً وَسَهْلاً! كَلِمَاتُ القُرْآنِ نُورٌ لَنَا!',
    dialogues: {
      welcome: 'Assalamu\'alaikum! Mari menjelajah pulau demi pulau dengan gembira dan teratur.',
      stepPrompt: 'Mulai dari Huruf, Mufradat, hingga Balaghah di Pulau Kalam!',
      crystalPrompt: 'Masya Allah! Bintang dan kristalmu makin bertambah banyak!'
    }
  },
  {
    id: 'hudhud',
    name: 'Hudhud',
    title: 'Burung Pemandu Setia',
    avatar: '🕊️',
    roleBadge: 'Pemandu Dirgantara',
    themeColor: 'from-sky-400 to-indigo-500',
    greetingAr: 'أَنَا هُدْهُدُ المَعْرِفَةِ، أَطِيرُ مَعَكُمْ إِلَى كُلِّ جَزِيرَةٍ!',
    dialogues: {
      welcome: 'Kepakkan sayapmu! Aku siap memandumu terbang mendarat di pulau mana pun!',
      stepPrompt: 'Gunakan Jalur Langkah agar belajarmu runut dan tidak membingungkan!',
      crystalPrompt: 'Semua dermaga kepulauan menyambut kedatangan sang juara!'
    }
  }
];

interface WorldMapViewProps {
  profile: UserProfile;
  onLaunchGame: (gameId: string) => void;
  onNavigateLearn: () => void;
  onOpenPulauHurufHub?: () => void;
  onOpenPulauMufradatHub?: () => void;
  onOpenPulauHiwarHub?: () => void;
  onOpenPulauQawaidHub?: () => void;
  onOpenPulauIstimaHub?: () => void;
  onOpenPulauQiraahHub?: () => void;
  onOpenPulauKalamHub?: () => void;
  onOpenPulauKitabahHub?: () => void;
  onOpenPulauTamhidHub?: () => void;
}

export const WorldMapView: React.FC<WorldMapViewProps> = ({
  profile,
  onLaunchGame,
  onNavigateLearn,
  onOpenPulauHurufHub,
  onOpenPulauMufradatHub,
  onOpenPulauHiwarHub,
  onOpenPulauQawaidHub,
  onOpenPulauIstimaHub,
  onOpenPulauQiraahHub,
  onOpenPulauKalamHub,
  onOpenPulauKitabahHub,
  onOpenPulauTamhidHub
}) => {
  const [viewMode, setViewMode] = useState<'path' | '3d' | 'catalog'>('path');
  const [selectedMascotId, setSelectedMascotId] = useState<MascotId>('zayd');
  const [selectedIslandId, setSelectedIslandId] = useState<IslandId>('HRF');
  const [showCurriculumDrawer, setShowCurriculumDrawer] = useState(false);
  const [landingToast, setLandingToast] = useState<{ message: string; submessage: string } | null>(null);
  const [draggedToken, setDraggedToken] = useState<boolean>(false);
  const [dragOverIslandId, setDragOverIslandId] = useState<IslandId | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const activeMascot = MASCOTS.find((m) => m.id === selectedMascotId) || MASCOTS[0];

  const selectedIslandData =
    ISLANDS_DATA.find((i) => i.id === selectedIslandId) || ISLANDS_DATA[0];
  const selectedConfig =
    ISLAND_CONFIGS.find((c) => c.id === selectedIslandId) || ISLAND_CONFIGS[0];
  const friendly = getFriendlyIslandName(selectedIslandData.id);
  const hasCrystal = Boolean(profile.crystals[selectedIslandData.id]);
  const isUnlocked = selectedIslandData.minLevel <= profile.level;

  // Ordered list of islands following the curriculum progression (J0 to J5)
  const orderedIslandsList = [
    ISLANDS_DATA.find((i) => i.id === 'TMH') || ISLANDS_DATA[8],
    ISLANDS_DATA.find((i) => i.id === 'HRF') || ISLANDS_DATA[0],
    ISLANDS_DATA.find((i) => i.id === 'MFR') || ISLANDS_DATA[1],
    ISLANDS_DATA.find((i) => i.id === 'HWR') || ISLANDS_DATA[2],
    ISLANDS_DATA.find((i) => i.id === 'QWD') || ISLANDS_DATA[3],
    ISLANDS_DATA.find((i) => i.id === 'IST') || ISLANDS_DATA[4],
    ISLANDS_DATA.find((i) => i.id === 'QRA') || ISLANDS_DATA[5],
    ISLANDS_DATA.find((i) => i.id === 'KLM') || ISLANDS_DATA[7],
    ISLANDS_DATA.find((i) => i.id === 'KTB') || ISLANDS_DATA[6],
  ];

  const totalCrystalsEarned = Object.values(profile.crystals).filter(Boolean).length;

  const handleIslandSelect = (islandId: IslandId, notify = true) => {
    setSelectedIslandId(islandId);
    sound.playSparkle();
    const isl = ISLANDS_DATA.find((i) => i.id === islandId);
    if (isl) {
      sound.speakArabic(isl.name_ar, 0.9);
    }
    if (notify) {
      const fr = getFriendlyIslandName(islandId);
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
      setLandingToast({
        message: `🎯 Fokus Pulau: ${fr.fullName}`,
        submessage: `Siap menjelajah ${isl?.name_ar || ''}! Klik 'Buka Hub' untuk materi lengkap atau 'Mini-Game'.`
      });
      toastTimeoutRef.current = setTimeout(() => {
        setLandingToast(null);
      }, 3500);
    }
  };

  const handleOpenHub = (islandId: IslandId) => {
    sound.playPop();
    switch (islandId) {
      case 'HRF':
        onOpenPulauHurufHub?.();
        break;
      case 'MFR':
        onOpenPulauMufradatHub?.();
        break;
      case 'HWR':
        onOpenPulauHiwarHub?.();
        break;
      case 'QWD':
        onOpenPulauQawaidHub?.();
        break;
      case 'IST':
        onOpenPulauIstimaHub?.();
        break;
      case 'QRA':
        onOpenPulauQiraahHub?.();
        break;
      case 'KLM':
        onOpenPulauKalamHub?.();
        break;
      case 'KTB':
        onOpenPulauKitabahHub?.();
        break;
      case 'TMH':
        if (onOpenPulauTamhidHub) {
          onOpenPulauTamhidHub();
        } else {
          onLaunchGame('mihrab_gate');
        }
        break;
    }
  };

  const handleSpeakMascot = () => {
    sound.speakArabic(activeMascot.greetingAr, 0.95);
  };

  return (
    <div className="space-y-4 pb-28 pt-2 px-3 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto">
      {/* =========================================================================
          1. PARROTO-STYLE KID MASCOT COMPANION HEADER
         ========================================================================= */}
      <div className="relative bg-gradient-to-r from-teal-800 via-cyan-800 to-indigo-900 text-white rounded-3xl p-4 sm:p-5 shadow-xl border-3 border-amber-300 overflow-hidden">
        {/* Soft Background Accents */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Left: Mascot Avatar + Cheerful Dialogue */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Lively Animated Vector Mascot */}
            <div className="relative group shrink-0">
              <div 
                onClick={() => {
                  sound.playSparkle();
                  const nextIndex = (MASCOTS.findIndex((m) => m.id === selectedMascotId) + 1) % MASCOTS.length;
                  setSelectedMascotId(MASCOTS[nextIndex].id);
                }}
                className="cursor-pointer"
                title="Klik untuk berinteraksi & ganti maskot (Zayd / Maryam / Hudhud)"
              >
                <MascotCharacter
                  type={activeMascot.id}
                  mood="happy"
                  size="sm"
                  interactive={true}
                  onTap={handleSpeakMascot}
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  sound.playPop();
                  const nextIndex = (MASCOTS.findIndex((m) => m.id === selectedMascotId) + 1) % MASCOTS.length;
                  setSelectedMascotId(MASCOTS[nextIndex].id);
                }}
                className="absolute -bottom-1 -right-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-[9px] px-2 py-0.5 rounded-full border border-white shadow-xs transition-transform active:scale-90"
              >
                Ganti ⇄
              </button>
            </div>

            {/* Mascot Dialogue Bubble */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs sm:text-sm font-black text-amber-300 font-chibi">
                  {activeMascot.name}
                </span>
                <span className="text-[10px] bg-white/15 text-teal-100 font-bold px-2 py-0.5 rounded-full">
                  {activeMascot.roleBadge}
                </span>
                <button
                  type="button"
                  onClick={handleSpeakMascot}
                  className="p-1 rounded-lg bg-white/15 hover:bg-white/25 active:scale-95 text-amber-300 transition-all cursor-pointer flex items-center gap-1 text-[11px]"
                  title="Dengarkan salam sapaan maskot"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Dengar Salam</span>
                </button>
              </div>

              <div className="mt-1 bg-black/25 backdrop-blur-xs rounded-2xl px-3 py-1.5 border border-white/15 inline-block">
                <p className="text-xs sm:text-[13px] text-teal-50 font-medium leading-snug">
                  "{activeMascot.dialogues.welcome}"
                </p>
              </div>
            </div>
          </div>

          {/* Right: Player Stats Bar (Clean & Gamified) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/20 self-start md:self-auto">
            {/* Level */}
            <div className="flex items-center gap-1.5">
              <div className="w-7 h-7 rounded-xl bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center shadow-xs">
                L{profile.level}
              </div>
              <div className="leading-none">
                <span className="text-[10px] text-teal-200 block">Tingkat</span>
                <span className="text-xs font-black text-white">Petualang</span>
              </div>
            </div>

            <div className="w-px h-6 bg-white/20" />

            {/* Stars */}
            <div className="flex items-center gap-1.5">
              <span className="text-base text-amber-400">⭐</span>
              <div className="leading-none">
                <span className="text-[10px] text-teal-200 block">Bintang</span>
                <span className="text-xs font-black text-amber-300">{profile.stars}</span>
              </div>
            </div>

            <div className="w-px h-6 bg-white/20" />

            {/* Crystals */}
            <div className="flex items-center gap-1.5">
              <span className="text-base">💎</span>
              <div className="leading-none">
                <span className="text-[10px] text-teal-200 block">Kristal</span>
                <span className="text-xs font-black text-emerald-300">{totalCrystalsEarned}/8</span>
              </div>
            </div>
          </div>
        </div>

        {/* VIEW MODE SEGMENTED CONTROL (Parroto Clean Tabs) */}
        <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-1.5 p-1 bg-black/30 rounded-2xl border border-white/15">
            <button
              type="button"
              onClick={() => {
                sound.playPop();
                setViewMode('path');
              }}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'path'
                  ? 'bg-amber-400 text-slate-950 shadow-md scale-102 ring-2 ring-amber-300'
                  : 'text-teal-100 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>🌟</span>
              <span>Jalur Langkah Petualangan</span>
            </button>

            <button
              type="button"
              onClick={() => {
                sound.playPop();
                setViewMode('3d');
              }}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === '3d'
                  ? 'bg-amber-400 text-slate-950 shadow-md scale-102 ring-2 ring-amber-300'
                  : 'text-teal-100 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>🏝️</span>
              <span>Peta Dunia 3D</span>
            </button>

            <button
              type="button"
              onClick={() => {
                sound.playPop();
                setViewMode('catalog');
              }}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'catalog'
                  ? 'bg-amber-400 text-slate-950 shadow-md scale-102 ring-2 ring-amber-300'
                  : 'text-teal-100 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>📚</span>
              <span>Katalog Pulau</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onNavigateLearn}
            className="py-1.5 px-3 bg-white/15 hover:bg-white/25 text-teal-100 hover:text-white text-xs font-bold rounded-xl flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Pohon Kurikulum Detail</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {landingToast && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            className="p-3 bg-gradient-to-r from-teal-700 to-indigo-800 text-white rounded-2xl shadow-xl border-2 border-amber-300 flex items-center justify-between gap-3 relative z-30"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-2xl animate-bounce">🕊️</span>
              <div>
                <h4 className="text-xs font-black text-amber-300">{landingToast.message}</h4>
                <p className="text-[11px] text-teal-100 font-medium">{landingToast.submessage}</p>
              </div>
            </div>
            <button
              onClick={() => setLandingToast(null)}
              className="text-white/80 hover:text-white text-xs px-2.5 py-1 rounded-lg bg-black/20 font-bold cursor-pointer"
            >
              Tutup
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          VIEW MODE 1: JALUR LANGKAH PETUALANGAN (PARROTO-STYLE STEPPING STONES)
          - Clear, step-by-step sequential path (no confusing navigation!)
          - Child mascot physically standing on the player's active island
          - Direct CTAs: "Mulai Belajar" & "Mini-Game"
         ========================================================================= */}
      {viewMode === 'path' && (
        <div className="space-y-4">
          {/* Path Header Info */}
          <div className="bg-amber-100/80 rounded-2xl p-3 border border-amber-300/80 flex items-center justify-between text-xs text-slate-800 font-bold">
            <div className="flex items-center gap-2">
              <span className="text-base">🗺️</span>
              <span>
                Jalur Petualangan Terarah: Selesaikan pulau secara berurutan dari <strong>Tingkat Dasar (J0)</strong> hingga <strong>Mahir (J5)</strong>!
              </span>
            </div>
            <span className="text-[11px] bg-amber-400 text-slate-950 px-2.5 py-1 rounded-xl font-black">
              8 Pulau + Mihrab
            </span>
          </div>

          {/* Stepping Stones Vertical Trail */}
          <div className="relative py-4 flex flex-col items-center">
            {/* Visual Dotted Trail Background Line */}
            <div className="absolute top-8 bottom-8 w-2 bg-gradient-to-b from-amber-400 via-teal-400 to-indigo-500 rounded-full opacity-40 -z-0" />

            <div className="w-full max-w-2xl space-y-5 z-10">
              {orderedIslandsList.map((isl, index) => {
                const config = ISLAND_CONFIGS.find((c) => c.id === isl.id) || ISLAND_CONFIGS[0];
                const fr = getFriendlyIslandName(isl.id);
                const isSelected = isl.id === selectedIslandId;
                const crystalEarned = Boolean(profile.crystals[isl.id]);
                const unlocked = isl.minLevel <= profile.level;
                const isCurrentMilestone = unlocked && (index === 0 || profile.level >= isl.minLevel);

                // Alternating zig-zag offset for playful Parroto trail
                const offsetClass = index % 2 === 0 ? 'sm:translate-x-3' : 'sm:-translate-x-3';

                return (
                  <motion.div
                    key={isl.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`relative rounded-3xl p-4 sm:p-5 transition-all ${offsetClass} ${
                      isSelected
                        ? 'bg-gradient-to-r from-teal-900 via-cyan-900 to-indigo-950 text-white shadow-2xl border-4 border-amber-300 ring-4 ring-amber-400/30'
                        : unlocked
                        ? 'bg-white hover:bg-slate-50 text-slate-800 shadow-md border-2 border-amber-200'
                        : 'bg-slate-100 text-slate-400 shadow-xs border-2 border-slate-300/60 opacity-80'
                    }`}
                  >
                    {/* Active Mascot Avatar Sitting on Current Island */}
                    {isSelected && (
                      <div className="absolute -top-6 left-6 bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full shadow-lg border-2 border-white flex items-center gap-2 animate-bounce">
                        <div className="w-6 h-6 shrink-0 flex items-center justify-center">
                          <MascotCharacter
                            type={activeMascot.id}
                            mood="cheer"
                            size="sm"
                            interactive={false}
                          />
                        </div>
                        <span>{activeMascot.name} menjelajah di sini!</span>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3.5">
                        {/* Big Step Number Circle */}
                        <div
                          onClick={() => handleIslandSelect(isl.id)}
                          className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex flex-col items-center justify-center font-black text-2xl shrink-0 shadow-md cursor-pointer transition-transform hover:scale-105 active:scale-95 border-2 ${
                            unlocked
                              ? 'bg-gradient-to-br from-amber-400 to-yellow-500 text-slate-950 border-white'
                              : 'bg-slate-200 text-slate-400 border-slate-300'
                          }`}
                        >
                          {unlocked ? (
                            <span>{fr.icon}</span>
                          ) : (
                            <Lock className="w-6 h-6 text-slate-400" />
                          )}
                          <span className="text-[9px] font-black uppercase tracking-tight mt-0.5">
                            {isl.id === 'TMH' ? 'Gerbang' : `Tahap ${index}`}
                          </span>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[10px] font-black uppercase tracking-wider bg-teal-500/20 text-teal-700 dark:text-teal-300 px-2 py-0.5 rounded-full">
                              Tingkat {isl.minLevel} • {fr.focusArea}
                            </span>
                            {crystalEarned ? (
                              <span className="text-[10px] font-black text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300 flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                <span>💎 Kristal Diraih</span>
                              </span>
                            ) : (
                              <span className="text-[10px] text-slate-500 bg-slate-200/60 px-2 py-0.5 rounded-full">
                                💎 {isl.crystalName}
                              </span>
                            )}
                          </div>

                          <div className="flex items-baseline gap-2 mt-1">
                            <h3 className={`text-base sm:text-lg font-black font-chibi ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                              {fr.fullName}
                            </h3>
                            <span className="text-lg sm:text-xl font-arabic font-bold text-amber-400">
                              {isl.name_ar}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                sound.speakArabic(isl.name_ar);
                              }}
                              className="text-amber-500 hover:text-amber-400 p-0.5 cursor-pointer"
                              title="Dengarkan pelafalan"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <p className={`text-xs mt-0.5 leading-snug line-clamp-1 ${isSelected ? 'text-teal-100' : 'text-slate-500'}`}>
                            {isl.description}
                          </p>
                        </div>
                      </div>

                      {/* Action Buttons for this Step */}
                      <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200/40">
                        {unlocked ? (
                          <>
                            <button
                              type="button"
                              onClick={() => handleOpenHub(isl.id)}
                              className="flex-1 sm:flex-initial py-2 px-3.5 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-black text-xs shadow-md flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer"
                            >
                              <span>Buka Hub</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>

                            <button
                              type="button"
                              onClick={() => onLaunchGame(config.primaryGameId)}
                              className="py-2 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md flex items-center gap-1 active:scale-95 transition-all cursor-pointer"
                              title="Mainkan mini-game pulau ini"
                            >
                              <Play className="w-3.5 h-3.5 fill-slate-950" />
                              <span>Game</span>
                            </button>
                          </>
                        ) : (
                          <div className="py-2 px-3 rounded-xl bg-slate-200 text-slate-500 font-bold text-xs flex items-center gap-1">
                            <Lock className="w-3.5 h-3.5" />
                            <span>Butuh Level {isl.minLevel}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW MODE 2: PETA DUNIA 3D (CLEAN, WIDESCREEN, ZERO REDUNDANT SIDEBAR)
          - Full width 3D canvas
          - Floating quick mascot pin launcher
          - Single unified Parroto-style Island Action Deck with progressive disclosure
         ========================================================================= */}
      {viewMode === '3d' && (
        <div className="space-y-4">
          {/* Full-Width 3D Diorama Container */}
          <div className="bg-slate-950 rounded-3xl p-1.5 shadow-2xl border-3 border-amber-300 relative overflow-hidden">
            <R3FWorldMap
              profile={profile}
              selectedIslandId={selectedIslandId}
              onSelectIsland={(id) => handleIslandSelect(id, true)}
              onLaunchGame={onLaunchGame}
              onOpenIslandHub={handleOpenHub}
              onNavigateLearn={onNavigateLearn}
            />
          </div>

          {/* Unified Clean Bottom Expedition Bar */}
          <div className="bg-gradient-to-b from-white to-amber-50/60 rounded-3xl p-4 sm:p-5 shadow-xl border-2 border-amber-300 space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-13 h-13 rounded-2xl bg-amber-400 text-slate-950 font-black text-2xl flex items-center justify-center shadow-md border-2 border-white shrink-0">
                  {friendly.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-black uppercase text-teal-800 bg-teal-100 px-2 py-0.2 rounded-full">
                      Pulau Terpilih
                    </span>
                    <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2 py-0.2 rounded-full">
                      {getFriendlyLevel(selectedIslandData.minLevel).fullTitle}
                    </span>
                    {hasCrystal ? (
                      <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.2 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Kristal Diraih 💎</span>
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.2 rounded-full">
                        💎 {selectedIslandData.crystalName}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-black font-chibi text-slate-900 flex items-center gap-2 mt-0.5">
                    <span>{friendly.fullName}</span>
                    <span className="text-xl font-arabic font-bold text-teal-700">{selectedIslandData.name_ar}</span>
                    <button
                      type="button"
                      onClick={() => sound.speakArabic(selectedIslandData.name_ar)}
                      className="p-1 rounded-lg hover:bg-amber-100 text-amber-700 transition-colors cursor-pointer"
                      title="Dengarkan nama pulau"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </h3>
                </div>
              </div>

              {/* Main Action CTAs (Clear & Unified) */}
              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => handleOpenHub(selectedIslandData.id)}
                  className="flex-1 sm:flex-initial py-2.5 px-5 rounded-2xl bg-gradient-to-r from-teal-700 to-cyan-700 hover:from-teal-600 hover:to-cyan-600 text-white font-black text-xs shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
                >
                  <span>Buka Hub Pulau</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => onLaunchGame(selectedConfig.primaryGameId)}
                  className="py-2.5 px-4 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-xs shadow-md flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>Main Game</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowCurriculumDrawer(!showCurriculumDrawer)}
                  className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1 active:scale-95 transition-all cursor-pointer"
                  title="Intip kurikulum & leksikon pulau ini"
                >
                  <Info className="w-4 h-4" />
                  <span className="hidden sm:inline">Kurikulum</span>
                </button>
              </div>
            </div>

            {/* Progressive Disclosure: Collapsible Curriculum & Mission Intel */}
            <AnimatePresence>
              {showCurriculumDrawer && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden pt-2 border-t border-amber-200/80"
                >
                  <div className="bg-amber-100/60 rounded-2xl p-3 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-black text-teal-900">Pedagogi & Kompetensi:</span>
                      <span className="text-[11px] text-slate-600 font-semibold">
                        Standar Fusha Terpadu
                      </span>
                    </div>
                    <p className="text-slate-700 leading-relaxed font-medium">
                      {selectedIslandData.description}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap pt-1 text-[11px] text-slate-600 font-bold">
                      <span className="bg-white px-2 py-0.5 rounded-lg border border-amber-200">
                        🎯 Fokus: {friendly.focusArea}
                      </span>
                      <span className="bg-white px-2 py-0.5 rounded-lg border border-amber-200">
                        💎 Kristal: {selectedIslandData.crystalName}
                      </span>
                      <span className="bg-white px-2 py-0.5 rounded-lg border border-amber-200">
                        🎮 Game Utama: {selectedConfig.primaryGameId}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW MODE 3: KATALOG 8 PULAU LENGKAP
          - Grid overview for quick visual lookup
         ========================================================================= */}
      {viewMode === 'catalog' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {orderedIslandsList.map((isl) => {
            const config = ISLAND_CONFIGS.find((c) => c.id === isl.id) || ISLAND_CONFIGS[0];
            const fr = getFriendlyIslandName(isl.id);
            const crystalEarned = Boolean(profile.crystals[isl.id]);
            const unlocked = isl.minLevel <= profile.level;

            return (
              <div
                key={isl.id}
                className="bg-white rounded-3xl p-4 shadow-md border-2 border-amber-200 hover:border-amber-400 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 text-2xl flex items-center justify-center">
                      {fr.icon}
                    </div>
                    <div className="flex items-center gap-1">
                      {crystalEarned ? (
                        <span className="text-[10px] font-black text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
                          💎 Diraih
                        </span>
                      ) : unlocked ? (
                        <span className="text-[10px] font-bold text-teal-700 bg-teal-100 px-2 py-0.5 rounded-full">
                          Terbuka
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                          <Lock className="w-2.5 h-2.5" /> L{isl.minLevel}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-2.5">
                    <div className="flex items-baseline justify-between">
                      <h4 className="text-sm font-black text-slate-900 font-chibi">
                        {fr.fullName}
                      </h4>
                      <span className="text-lg font-arabic font-bold text-teal-700">
                        {isl.name_ar}
                      </span>
                    </div>
                    <span className="text-[10px] text-teal-600 font-bold block mt-0.5">
                      Tingkat {isl.minLevel} • {fr.focusArea}
                    </span>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                      {isl.description}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenHub(isl.id)}
                    className="flex-1 py-2 px-3 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-black text-xs shadow-xs flex items-center justify-center gap-1 active:scale-95 transition-all cursor-pointer"
                  >
                    <span>Masuk Hub</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onLaunchGame(config.primaryGameId)}
                    className="py-2 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-xs flex items-center gap-1 active:scale-95 transition-all cursor-pointer"
                  >
                    <Play className="w-3 h-3 fill-slate-950" />
                    <span>Game</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
