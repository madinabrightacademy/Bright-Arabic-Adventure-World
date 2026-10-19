import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Star, Award, CheckCircle2, Lock, X, ArrowRight, Shield } from 'lucide-react';
import { AchievementItem } from '../data/achievements';
import { UserProfile } from '../types/game';
import { sound } from '../services/sound';
import { ConfettiSparkles } from './ConfettiSparkles';

interface AchievementBadgeModalProps {
  achievement: AchievementItem | null;
  profile: UserProfile;
  onClose: () => void;
  onClaim: (achievement: AchievementItem) => void;
}

export const AchievementBadgeModal: React.FC<AchievementBadgeModalProps> = ({
  achievement,
  profile,
  onClose,
  onClaim
}) => {
  const [hasCelebrated, setHasCelebrated] = useState(false);

  // Keyboard accessibility: Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!achievement) return null;
  const isUnlocked = achievement.isUnlocked(profile);
  const isClaimed = (profile.achievements || []).includes(achievement.id);
  const currentVal = achievement.currentProgress(profile);
  const progressPercent = Math.min(100, Math.round((currentVal / achievement.target) * 100));

  const tierLabels = {
    bronze: { name: 'Tingkat Perunggu', color: 'from-amber-700 to-amber-900', border: 'border-amber-600', text: 'text-amber-200' },
    silver: { name: 'Tingkat Perak', color: 'from-slate-400 to-slate-600', border: 'border-slate-300', text: 'text-slate-100' },
    gold: { name: 'Tingkat Emas Murni', color: 'from-amber-400 via-yellow-500 to-amber-600', border: 'border-yellow-300', text: 'text-amber-950 font-black' },
    diamond: { name: 'Tingkat Berlian Abadi', color: 'from-cyan-400 via-blue-500 to-purple-600', border: 'border-cyan-300', text: 'text-white font-black' }
  };

  const currentTier = tierLabels[achievement.badgeTier] || tierLabels.gold;

  const handleClaimClick = () => {
    sound.playFanfare();
    sound.playSparkle();
    setHasCelebrated(true);
    onClaim(achievement);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 20 }}
          className="w-full max-w-md bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 rounded-[36px] border-3 border-amber-300/80 shadow-2xl overflow-hidden relative text-white"
        >
          {/* Confetti & Sparkles Celebration */}
          <ConfettiSparkles active={hasCelebrated || (isUnlocked && !isClaimed)} particleCount={50} playSound={false} />

          {/* Top Radial Glow Backdrop */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 bg-gradient-to-br from-amber-400/25 to-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header & Big Visual 3D Badge */}
          <div className="pt-8 pb-4 px-6 text-center relative z-10">
            {/* 3D Visual Medal Frame */}
            <div className="relative inline-block mx-auto mb-4">
              {/* Rotating Gold Aura */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 16, ease: 'linear' }}
                className="absolute -inset-4 rounded-full bg-gradient-to-r from-amber-400/40 via-yellow-200/20 to-orange-500/40 blur-md pointer-events-none"
              />

              {/* Outer Medallion Ring */}
              <div className={`w-28 h-28 rounded-3xl bg-gradient-to-br ${achievement.badgeBg} p-1 shadow-2xl border-4 ${achievement.badgeBorder} flex items-center justify-center relative transform rotate-3 hover:rotate-0 transition-transform`}>
                <div className="w-full h-full rounded-2xl bg-black/30 backdrop-blur-xs flex flex-col items-center justify-center border border-white/30">
                  <span className="text-5xl select-none filter drop-shadow-[0_8px_8px_rgba(0,0,0,0.6)]">
                    {achievement.badgeIcon}
                  </span>
                </div>
              </div>

              {/* Status Ribbon Indicator */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className={`px-3 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-black shadow-md border ${currentTier.border} bg-gradient-to-r ${currentTier.color} ${currentTier.text}`}>
                  {currentTier.name}
                </span>
              </div>
            </div>

            {/* Arabic Title */}
            <p className="font-arabic text-2xl font-bold text-amber-300 mt-2 leading-tight">
              {achievement.titleAr}
            </p>

            {/* Indonesian Title */}
            <h3 className="text-xl font-black font-chibi text-white mt-1">
              {achievement.title}
            </h3>

            {/* Milestone Description */}
            <p className="text-xs text-slate-300 mt-2 leading-relaxed max-w-xs mx-auto">
              {achievement.description}
            </p>
          </div>

          {/* Progress & Reward Box */}
          <div className="px-6 py-4 space-y-3 relative z-10">
            {/* Progress Bar Card */}
            <div className="bg-slate-800/80 rounded-2xl p-3.5 border border-white/10">
              <div className="flex items-center justify-between text-xs mb-1.5 font-bold">
                <span className="text-slate-400">Progres Pencapaian:</span>
                <span className={isUnlocked ? 'text-emerald-400' : 'text-amber-300'}>
                  {currentVal} / {achievement.target} ({progressPercent}%)
                </span>
              </div>

              <div className="w-full bg-slate-700/80 h-2.5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className={`h-full ${
                    isUnlocked
                      ? 'bg-gradient-to-r from-emerald-400 to-teal-400'
                      : 'bg-gradient-to-r from-amber-400 to-orange-500'
                  }`}
                />
              </div>

              {isUnlocked ? (
                <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-300 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Target tercapai! Lencana siap diklaim.</span>
                </div>
              ) : (
                <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">
                  <Lock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>Sisa {Math.max(0, achievement.target - currentVal)} lagi untuk membuka lencana ini.</span>
                </div>
              )}
            </div>

            {/* Reward Preview */}
            <div className="bg-gradient-to-r from-amber-400/15 via-yellow-400/10 to-amber-500/15 rounded-2xl p-3 border border-amber-300/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <span className="text-xs font-bold text-amber-200">Hadiah Penghargaan:</span>
              </div>

              <div className="flex items-center gap-2 text-xs font-black">
                <span className="bg-amber-400 text-amber-950 px-2 py-0.5 rounded-lg flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> +{achievement.rewardXp} XP
                </span>
                <span className="bg-yellow-400 text-yellow-950 px-2 py-0.5 rounded-lg flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-950" /> +{achievement.rewardStars}
                </span>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="p-6 pt-2 pb-6 border-t border-white/10 relative z-10 flex gap-2">
            {isUnlocked && !isClaimed ? (
              <button
                type="button"
                onClick={handleClaimClick}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-amber-950 font-black text-sm shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 fill-amber-950" />
                <span>Klaim Lencana & Raih Hadiah!</span>
              </button>
            ) : isClaimed ? (
              <div className="w-full py-3 px-4 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-extrabold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Lencana Telah Terpajang di Profilmu!</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="w-full py-3 px-4 rounded-2xl bg-white/10 hover:bg-white/20 text-slate-300 text-xs font-bold transition-all cursor-pointer"
              >
                Tutup & Lanjutkan Belajar
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
