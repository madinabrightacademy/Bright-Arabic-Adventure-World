import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Target,
  CheckCircle2,
  BookOpen,
  Gamepad2,
  Heart,
  Clock,
  Gift,
  Sparkles,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { UserProfile } from '../types/game';
import { DailyTargetService, DailyTargetStatus } from '../services/dailyTargetService';
import { sound } from '../services/sound';

interface DailyTaskTargetsModalProps {
  profile: UserProfile;
  onClose: () => void;
  onOpenIqra: () => void;
  onOpenGames: () => void;
  onOpenAdab: () => void;
  onUpdateProfile: (p: UserProfile) => void;
  onReward: (xp: number, stars: number) => void;
}

export const DailyTaskTargetsModal: React.FC<DailyTaskTargetsModalProps> = ({
  profile,
  onClose,
  onOpenIqra,
  onOpenGames,
  onOpenAdab,
  onUpdateProfile,
  onReward
}) => {
  const status: DailyTargetStatus = DailyTargetService.getDailyStatus(profile);
  const [chestToast, setChestToast] = useState<{ xp: number; stars: number } | null>(null);

  const handleClaimChest = () => {
    const res = DailyTargetService.claimDailyTargetChest();
    if (res.success) {
      onUpdateProfile(res.profile);
      onReward(res.xpReward, res.starsReward);
      setChestToast({ xp: res.xpReward, stars: res.starsReward });
      setTimeout(() => setChestToast(null), 3000);
    }
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        className="w-full max-w-lg bg-white rounded-[36px] shadow-2xl border-4 border-amber-400 overflow-hidden flex flex-col my-auto max-h-[96vh]"
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-teal-800 via-cyan-800 to-teal-900 text-white p-5 border-b-4 border-teal-400">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 text-slate-950 font-black text-2xl flex items-center justify-center shadow-md">
                🎯
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider bg-amber-400 text-amber-950 px-2 py-0.5 rounded-full">
                  Target Harian Terukur
                </span>
                <h2 className="text-xl font-black font-chibi mt-0.5">
                  Target Harian (Daily Task Targets)
                </h2>
                <p className="text-xs text-teal-200">
                  4 pilar target belajar agar perkembangan lisan & membaca seimbang
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white font-bold flex items-center justify-center transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Progress Bar Header */}
          <div className="mt-4 bg-black/30 p-3 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between text-xs mb-1 font-bold">
              <span className="text-teal-200">Total Kemajuan Target Hari Ini</span>
              <span className="text-amber-300 font-black text-sm">{status.overallPercent}%</span>
            </div>
            <div className="w-full h-3 rounded-full bg-white/20 overflow-hidden p-0.5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${status.overallPercent}%` }}
                className="h-full rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 space-y-3 overflow-y-auto">
          {/* Target 1: Iqra Reading */}
          <div className="p-3.5 rounded-2xl border border-teal-200 bg-white shadow-2xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center text-xl shrink-0">
                📖
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-xs text-slate-900">1. Baca Kata / Huruf Iqra</h4>
                  {status.iqraTarget.completed && (
                    <span className="text-[9px] font-black bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-full">
                      Tercapai ✅
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500">
                  Target: 10 suku kata • Sekarang: {status.iqraTarget.current}/10
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenIqra();
              }}
              className="px-3 py-1.5 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer flex items-center gap-1"
            >
              <span>Buka Iqra</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Target 2: Mini-Games */}
          <div className="p-3.5 rounded-2xl border border-amber-200 bg-white shadow-2xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center text-xl shrink-0">
                🎮
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-xs text-slate-900">2. Latihan Mini-Game Edukasi</h4>
                  {status.gamesTarget.completed && (
                    <span className="text-[9px] font-black bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-full">
                      Tercapai ✅
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500">
                  Target: 2 sesi game • Sekarang: {status.gamesTarget.current}/2
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenGames();
              }}
              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-xs cursor-pointer flex items-center gap-1"
            >
              <span>Buka Game</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Target 3: Islamic Manners (Adab) */}
          <div className="p-3.5 rounded-2xl border border-pink-200 bg-white shadow-2xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-pink-100 text-pink-800 flex items-center justify-center text-xl shrink-0">
                🌟
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-xs text-slate-900">3. Amalkan 1 Adab Harian</h4>
                  {status.adabTarget.completed && (
                    <span className="text-[9px] font-black bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-full">
                      Tercapai ✅
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500">
                  Target: 1 adab diamalkan • Sekarang: {status.adabTarget.current}/1
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenAdab();
              }}
              className="px-3 py-1.5 bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer flex items-center gap-1"
            >
              <span>Buka Adab</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Target 4: Study Time */}
          <div className="p-3.5 rounded-2xl border border-blue-200 bg-white shadow-2xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center text-xl shrink-0">
                ⏱️
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-xs text-slate-900">4. Waktu Belajar Sehat (10 Menit)</h4>
                  {status.minutesTarget.completed && (
                    <span className="text-[9px] font-black bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-full">
                      Tercapai ✅
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500">
                  Target: 10 menit • Sekarang: {status.minutesTarget.current}/10 Menit
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-800 bg-blue-50 px-2.5 py-1.5 rounded-xl border border-blue-200">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span>Tercatat otomatis saat belajar</span>
            </div>
          </div>

          {/* Grand Target Chest Reward Card */}
          <div className="mt-2 p-4 rounded-3xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-slate-950 border-2 border-yellow-300 shadow-lg text-center relative overflow-hidden">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-2xl">🎁</span>
              <h4 className="font-black text-sm font-chibi">
                Peti Hadiah Harian (Daily Target Mystery Chest)
              </h4>
            </div>
            <p className="text-xs font-semibold max-w-xs mx-auto mb-3">
              Selesaikan seluruh 4 pilar target di atas untuk membuka peti berisi +120 XP, +5 Bintang, dan 1 Perisai Api!
            </p>

            {status.chestClaimed ? (
              <div className="bg-white/80 py-2 px-4 rounded-xl text-xs font-black text-slate-800 inline-flex items-center gap-1.5 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Peti hari ini telah berhasil diklaim!
              </div>
            ) : status.allCompleted ? (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleClaimChest}
                className="py-2.5 px-6 rounded-2xl bg-slate-950 hover:bg-slate-900 text-amber-300 font-black text-xs shadow-md inline-flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span>Klaim Peti Hadiah Penuh Sekarang!</span>
              </motion.button>
            ) : (
              <div className="bg-black/20 text-white/90 py-1.5 px-3 rounded-xl text-[11px] font-bold inline-block">
                Selesaikan 4 target untuk membuka ({status.overallPercent}% selesai)
              </div>
            )}
          </div>

          {/* Toast */}
          <AnimatePresence>
            {chestToast && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-emerald-100 border-2 border-emerald-400 p-2.5 rounded-xl text-center text-xs font-black text-emerald-950 flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>🏆</span>
                <span>Barakallahu fiik! Bonus Peti +{chestToast.xp} XP & +{chestToast.stars} Bintang telah diklaim!</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
