import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Volume2,
  X,
  Play,
  RotateCcw,
  Sparkles,
  Trophy,
  Star,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  Award
} from 'lucide-react';
import { sound } from '../services/sound';
import { GameStorage } from '../services/storage';
import { CompanionTraits } from '../types/game';
import { MascotCharacter, MascotMood, MascotType } from './MascotCharacter';
import { ConfettiSparkles } from './ConfettiSparkles';

export type GameFlowState = 'BRIEFING' | 'PLAYING' | 'VICTORY';

export interface HowToPlayStep {
  icon: string | React.ReactNode;
  text: string;
}

export interface VictorySummaryItem {
  label: string;
  value: string | number;
}

export interface BaseGameHelpers {
  flowState: GameFlowState;
  startGame: () => void;
  finishGame: (finalScore?: number) => void;
  playAgain: () => void;
  closeGame: () => void;
  setMascotMood: (mood: MascotMood) => void;
  setMascotComment: (comment: string) => void;
}

export interface BaseGameModalProps {
  // Game identity & branding
  title: string;
  titleAr?: string;
  gameIcon?: string | React.ReactNode;
  islandName: string;
  islandColor?: string; // Tailwind gradient or class, e.g. "from-teal-600 via-emerald-600 to-teal-800"
  targetObjective: string;
  howToPlay: HowToPlayStep[];
  speechArabic?: string;
  speechIntro?: string;

  // Flow State (controlled or uncontrolled)
  flowState?: GameFlowState;
  initialState?: GameFlowState;
  onStateChange?: (state: GameFlowState) => void;
  onStartGame?: () => void;
  onPlayAgain?: () => void;
  onClose: () => void;

  // Progress Tracking
  currentRound?: number;
  totalRounds?: number;
  score?: number;
  maxScore?: number;

  // Reward Flow
  starsEarned?: number; // 1, 2, or 3 (if omitted, auto-calculated from score/maxScore)
  xpEarned?: number; // if omitted, auto-calculated from score or defaults to 50
  rewardTrait?: keyof CompanionTraits;
  traitPoints?: number;
  onReward?: (xp: number, stars: number) => void;
  autoSaveReward?: boolean; // defaults to true: automatically triggers GameStorage.addReward on victory

  // Mascot Assistant
  mascotType?: MascotType;
  mascotMood?: MascotMood;
  mascotComment?: string;
  mascotArabic?: string;

  // Audio Handler
  onPlayTitleAudio?: () => void;

  // Victory Custom Stats Summary
  victorySummary?: VictorySummaryItem[];

  // Children: can be ReactNode or render prop receiving BaseGameHelpers
  children: React.ReactNode | ((helpers: BaseGameHelpers) => React.ReactNode);
}

export const BaseGameModal: React.FC<BaseGameModalProps> = ({
  title,
  titleAr,
  gameIcon = '🎮',
  islandName,
  islandColor = 'from-teal-600 via-emerald-600 to-teal-800',
  targetObjective,
  howToPlay,
  speechArabic = 'بِسْمِ اللَّهِ نَبْدَأُ!',
  speechIntro = 'Ayo kumpulkan bintang dan kuasai materi seru ini!',
  flowState: controlledFlowState,
  initialState = 'BRIEFING',
  onStateChange,
  onStartGame,
  onPlayAgain,
  onClose,
  currentRound,
  totalRounds,
  score = 0,
  maxScore,
  starsEarned: explicitStars,
  xpEarned: explicitXp,
  rewardTrait = 'lughah',
  traitPoints = 6,
  onReward,
  autoSaveReward = true,
  mascotType = 'zaki',
  mascotMood: controlledMascotMood,
  mascotComment: controlledMascotComment,
  mascotArabic,
  onPlayTitleAudio,
  victorySummary,
  children
}) => {
  // Internal state for uncontrolled mode
  const [internalFlowState, setInternalFlowState] = useState<GameFlowState>(initialState);
  const activeFlowState = controlledFlowState !== undefined ? controlledFlowState : internalFlowState;

  const [internalMascotMood, setInternalMascotMood] = useState<MascotMood>('happy');
  const [internalMascotComment, setInternalMascotComment] = useState<string>('');
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [rewardClaimed, setRewardClaimed] = useState(false);

  const activeMascotMood = controlledMascotMood !== undefined ? controlledMascotMood : internalMascotMood;
  const activeMascotComment = controlledMascotComment !== undefined ? controlledMascotComment : internalMascotComment;

  // Calculate stars: if explicitStars is provided use it, else calculate from score / maxScore
  const computedStars = explicitStars !== undefined
    ? explicitStars
    : maxScore && maxScore > 0
    ? score >= maxScore * 0.8
      ? 3
      : score >= maxScore * 0.5
      ? 2
      : 1
    : 3;

  // Calculate XP reward
  const computedXp = explicitXp !== undefined
    ? explicitXp
    : Math.max(35, (score || 1) * 25);

  const setFlow = (next: GameFlowState) => {
    if (controlledFlowState === undefined) {
      setInternalFlowState(next);
    }
    if (onStateChange) {
      onStateChange(next);
    }
  };

  const handleStartGame = () => {
    sound.playSuccess();
    setFlow('PLAYING');
    if (onStartGame) onStartGame();
  };

  const handleFinishGame = (finalScore?: number) => {
    setFlow('VICTORY');
  };

  const handlePlayAgain = () => {
    sound.playPop();
    setRewardClaimed(false);
    setFlow('PLAYING');
    if (onPlayAgain) onPlayAgain();
  };

  const handleTitleAudio = () => {
    if (onPlayTitleAudio) {
      onPlayTitleAudio();
    } else if (titleAr) {
      sound.speakArabic(titleAr);
    } else {
      sound.playSparkle();
    }
  };

  // Automated reward dispatch on victory
  useEffect(() => {
    if (activeFlowState === 'VICTORY' && !rewardClaimed) {
      setRewardClaimed(true);
      if (autoSaveReward) {
        GameStorage.addReward(computedXp, computedStars, rewardTrait, traitPoints);
      }
      if (onReward) {
        onReward(computedXp, computedStars);
      }
    }
  }, [activeFlowState, rewardClaimed, autoSaveReward, computedXp, computedStars, rewardTrait, traitPoints, onReward]);

  const helpers: BaseGameHelpers = {
    flowState: activeFlowState,
    startGame: handleStartGame,
    finishGame: handleFinishGame,
    playAgain: handlePlayAgain,
    closeGame: onClose,
    setMascotMood: setInternalMascotMood,
    setMascotComment: setInternalMascotComment
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 16 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="relative w-full max-w-2xl bg-white text-slate-800 rounded-3xl shadow-2xl border-4 border-amber-300 overflow-hidden flex flex-col my-auto max-h-[96vh]"
      >
        {/* ==========================================================
            1. STANDARDIZED HEADER
            ========================================================== */}
        <div className={`relative bg-gradient-to-r ${islandColor} text-white p-3 sm:p-4 shrink-0 shadow-md`}>
          <div className="flex items-center justify-between gap-3">
            {/* Left: Island Tag & Game Title */}
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-xl sm:text-2xl shadow-inner border border-white/25 shrink-0">
                {gameIcon}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 text-white px-2 py-0.5 rounded-full">
                    {islandName}
                  </span>
                  {totalRounds && currentRound !== undefined && activeFlowState === 'PLAYING' && (
                    <span className="text-[10px] font-black bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full shadow-2xs">
                      Soal {Math.min(currentRound, totalRounds)} / {totalRounds}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <h2 className="text-sm sm:text-base font-black truncate font-chibi text-white drop-shadow-xs">
                    {title}
                  </h2>
                  {titleAr && (
                    <button
                      type="button"
                      onClick={handleTitleAudio}
                      className="p-1 rounded-full bg-white/15 hover:bg-white/25 text-amber-200 transition-colors shrink-0"
                      title="Dengarkan pengucapan Arab"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Score/Exit buttons */}
            <div className="flex items-center gap-2 shrink-0">
              {score !== undefined && activeFlowState === 'PLAYING' && (
                <div className="flex items-center gap-1 bg-black/25 px-2.5 py-1 rounded-xl border border-white/20 text-xs font-black text-amber-300">
                  <Star className="w-3.5 h-3.5 fill-amber-300" />
                  <span>{score}{maxScore ? `/${maxScore}` : ''}</span>
                </div>
              )}
              <button
                type="button"
                onClick={() => {
                  if (activeFlowState === 'PLAYING') {
                    setShowExitConfirm(true);
                  } else {
                    onClose();
                  }
                }}
                className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Tutup Game"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Progress bar across header bottom when playing */}
          {activeFlowState === 'PLAYING' && totalRounds && currentRound !== undefined && (
            <div className="w-full bg-black/20 h-1.5 mt-2 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-amber-300 rounded-full"
                animate={{ width: `${Math.min(100, (currentRound / totalRounds) * 100)}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          )}
        </div>

        {/* ==========================================================
            2. FLOW STATE A: BRIEFING (Intro & How to Play)
            ========================================================== */}
        {activeFlowState === 'BRIEFING' && (
          <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
            {/* Mascot Welcome Card */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left shadow-sm">
              <MascotCharacter
                type={mascotType}
                mood="cheer"
                size="md"
                speechArabic={speechArabic}
                speechBubble={speechIntro}
                onTap={() => sound.speakArabic(speechArabic)}
              />
              <div className="flex-1">
                <span className="text-[11px] font-black text-amber-800 uppercase tracking-wider block mb-1">
                  🎯 Target Misi Belajar:
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-800 leading-snug">
                  {targetObjective}
                </h3>
                {titleAr && (
                  <p className="font-arabic text-teal-800 text-lg sm:text-xl font-black mt-1">
                    {titleAr}
                  </p>
                )}
              </div>
            </div>

            {/* How to Play Rules */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
              <div className="flex items-center gap-1.5 text-xs font-black text-slate-700 uppercase tracking-wide mb-2.5">
                <HelpCircle className="w-4 h-4 text-teal-600" />
                <span>Petunjuk Cara Bermain:</span>
              </div>
              <div className="space-y-2">
                {howToPlay.map((rule, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <span className="text-base shrink-0">{rule.icon}</span>
                    <span className="font-medium">{rule.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Primary Start CTA Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleStartGame}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 active:scale-98 text-slate-950 font-black text-base shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 transition-all cursor-pointer border-2 border-amber-300"
              >
                <Play className="w-5 h-5 fill-slate-950" />
                <span>Mulai Bermain! (بِسْمِ اللَّهِ)</span>
              </button>
            </div>
          </div>
        )}

        {/* ==========================================================
            2. FLOW STATE B: ACTIVE PLAYING VIEW
            ========================================================== */}
        {activeFlowState === 'PLAYING' && (
          <div className="flex-1 flex flex-col min-h-0 overflow-y-auto">
            {/* Active Game Content (Children or Render Prop) */}
            <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between">
              {typeof children === 'function' ? children(helpers) : children}
            </div>

            {/* Live Mascot Cheerer Footer Bar */}
            <div className="bg-amber-50/80 border-t border-amber-200/80 px-3 py-2 flex items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-9 h-9 shrink-0 flex items-center justify-center">
                  <MascotCharacter
                    type={mascotType}
                    mood={activeMascotMood}
                    size="sm"
                    interactive={false}
                  />
                </div>
                <div className="min-w-0">
                  {mascotArabic && (
                    <span className="font-arabic text-teal-800 text-xs font-bold block truncate">
                      {mascotArabic}
                    </span>
                  )}
                  <p className="text-xs text-slate-700 font-semibold truncate">
                    {activeMascotComment || 'Fokus dan teliti, kamu pasti bisa!'}
                  </p>
                </div>
              </div>

              {mascotArabic && (
                <button
                  type="button"
                  onClick={() => sound.speakArabic(mascotArabic)}
                  className="p-1.5 rounded-xl bg-amber-200/80 hover:bg-amber-300 text-amber-900 transition-colors shrink-0"
                  title="Dengarkan Suara Maskot"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* ==========================================================
            2. FLOW STATE C: VICTORY & REWARD FLOW
            ========================================================== */}
        {activeFlowState === 'VICTORY' && (
          <div className="relative p-5 sm:p-8 flex flex-col items-center text-center overflow-y-auto space-y-4 flex-1">
            <ConfettiSparkles active={true} playSound={false} />

            {/* Celebratory Mascot */}
            <div className="pt-2">
              <MascotCharacter
                type={mascotType}
                mood="celebrate"
                size="lg"
                speechArabic="مُمْتَازٌ! أَحْسَنْتَ صُنْعًا!"
                speechBubble="Hebat sekali! Misi game berhasil kamu selesaikan dengan cemerlang!"
                onTap={() => sound.speakArabic('مُمْتَازٌ! أَحْسَنْتَ!')}
              />
            </div>

            {/* Title & Stars */}
            <div>
              <h3 className="text-xl sm:text-2xl font-black font-chibi text-slate-900">
                Alhamdulillah! Misi Tuntas!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-sm mx-auto">
                Keahlian bahasa Arabmu semakin bertambah kuat dan berkah.
              </p>

              {/* Stars Display */}
              <div className="flex items-center justify-center gap-2 mt-3">
                {[1, 2, 3].map((starIdx) => (
                  <motion.div
                    key={starIdx}
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: starIdx * 0.15, type: 'spring' }}
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-md border-2 ${
                      starIdx <= computedStars
                        ? 'bg-gradient-to-br from-amber-300 to-yellow-500 text-amber-950 border-amber-200 ring-2 ring-amber-300/60'
                        : 'bg-slate-100 text-slate-300 border-slate-200'
                    }`}
                  >
                    ★
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Rewards Card */}
            <div className="w-full max-w-md bg-gradient-to-r from-amber-50 to-teal-50 border-2 border-amber-200 rounded-2xl p-3.5 flex items-center justify-around gap-2 text-xs font-bold">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
                  ⚡
                </div>
                <div className="text-left">
                  <span className="text-[10px] text-slate-500 block">XP Diperoleh</span>
                  <span className="text-sm font-black text-amber-700">+{computedXp} XP</span>
                </div>
              </div>

              <div className="w-px h-8 bg-amber-200" />

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-teal-500 text-white flex items-center justify-center font-black">
                  ⭐
                </div>
                <div className="text-left">
                  <span className="text-[10px] text-slate-500 block">Bintang</span>
                  <span className="text-sm font-black text-teal-700">+{computedStars} Bintang</span>
                </div>
              </div>
            </div>

            {/* Optional Summary Stats */}
            {victorySummary && victorySummary.length > 0 && (
              <div className="w-full max-w-md grid grid-cols-2 gap-2 text-left">
                {victorySummary.map((item, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-2.5">
                    <span className="text-[10px] text-slate-500 block">{item.label}</span>
                    <span className="text-xs font-black text-slate-800">{item.value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="w-full max-w-md flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handlePlayAgain}
                className="flex-1 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-slate-300"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Main Lagi</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playSuccess();
                  onClose();
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md shadow-teal-600/30 transition-all cursor-pointer border-2 border-emerald-400"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Kembali ke Peta</span>
              </button>
            </div>
          </div>
        )}

        {/* Exit Confirmation Dialog */}
        <AnimatePresence>
          {showExitConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-3xl p-5 max-w-xs text-center border-2 border-amber-300 shadow-xl space-y-3">
                <span className="text-3xl block">⛵</span>
                <h4 className="font-bold text-slate-900 text-base">Keluar dari Game?</h4>
                <p className="text-xs text-slate-600">
                  Progres ronde saat ini tidak akan disimpan jika kamu keluar sekarang.
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowExitConfirm(false)}
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                  >
                    Lanjut Main
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      sound.playPop();
                      onClose();
                    }}
                    className="flex-1 py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs"
                  >
                    Ya, Keluar
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
