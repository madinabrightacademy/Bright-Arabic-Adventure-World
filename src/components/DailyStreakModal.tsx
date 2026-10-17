import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Shield, Award, Sparkles, CheckCircle2, Star, Calendar, Clock, Gift } from 'lucide-react';
import { UserProfile } from '../types/game';
import { DailyTargetService } from '../services/dailyTargetService';
import { sound } from '../services/sound';
import { ConfettiSparkles } from './ConfettiSparkles';

interface DailyStreakModalProps {
  profile: UserProfile;
  onClose: () => void;
  onUpdateProfile: (p: UserProfile) => void;
  onReward: (xp: number, stars: number) => void;
}

export const DailyStreakModal: React.FC<DailyStreakModalProps> = ({
  profile,
  onClose,
  onUpdateProfile,
  onReward
}) => {
  const today = DailyTargetService.getTodayDateString();
  const isClaimedToday = profile.lastStreakClaimDate === today;
  const [claimToast, setClaimToast] = useState<{ xp: number; stars: number } | null>(null);
  const [confettiBurstKey, setConfettiBurstKey] = useState<number>(1);

  // Play fanfare and sparkle animation on mount to celebrate user's consistency!
  useEffect(() => {
    sound.playFanfare();
  }, []);

  const streakDays = [
    { day: 1, label: 'Hari 1', xp: 40, stars: 1, rewardText: '+40 XP' },
    { day: 2, label: 'Hari 2', xp: 40, stars: 1, rewardText: '+40 XP' },
    { day: 3, label: 'Hari 3', xp: 50, stars: 2, rewardText: '+50 XP • 1.2x', milestone: true },
    { day: 4, label: 'Hari 4', xp: 50, stars: 2, rewardText: '+50 XP' },
    { day: 5, label: 'Hari 5', xp: 50, stars: 2, rewardText: '+50 XP' },
    { day: 6, label: 'Hari 6', xp: 60, stars: 2, rewardText: '+60 XP' },
    { day: 7, label: 'Hari 7', xp: 100, stars: 5, rewardText: '+100 XP • 💎 Peti Emas', milestone: true, isGrand: true }
  ];

  const currentCycleDay = ((profile.dailyStreak - 1) % 7) + 1;

  const handleClaimDailyReward = () => {
    const res = DailyTargetService.claimDailyStreakReward();
    if (res.success) {
      onUpdateProfile(res.profile);
      onReward(res.xpReward, res.starsReward);
      setClaimToast({ xp: res.xpReward, stars: res.starsReward });
      setConfettiBurstKey(prev => prev + 1); // Trigger new burst of confetti
      sound.playFanfare();
      setTimeout(() => setClaimToast(null), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        className="w-full max-w-md bg-white rounded-[36px] shadow-2xl border-4 border-amber-400 overflow-hidden flex flex-col my-auto max-h-[96vh] relative"
      >
        {/* Celebratory Confetti & Sparkles Animation */}
        <ConfettiSparkles key={confettiBurstKey} particleCount={55} playSound={true} />

        {/* Header Hero */}
        <div className="relative bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 text-white p-5 text-center overflow-hidden">
          {/* Background Glow */}
          <div className="absolute -top-10 -right-10 w-36 h-36 bg-yellow-300/30 rounded-full blur-2xl pointer-events-none" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 text-white font-bold flex items-center justify-center transition-colors cursor-pointer z-10"
          >
            ✕
          </button>

          <div className="relative inline-block mx-auto mb-2">
            <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: [0, -3, 3, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-5xl shadow-lg border-2 border-white/40"
            >
              🔥
            </motion.div>
            {/* Sparkle Badges floating around Flame */}
            <motion.span
              animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.7, 1, 0.7], rotate: [0, 45, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="absolute -top-2 -right-2 text-xl filter drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]"
            >
              ✨
            </motion.span>
            <motion.span
              animate={{ scale: [1.2, 0.8, 1.2], opacity: [1, 0.6, 1], rotate: [0, -30, 0] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut', delay: 0.4 }}
              className="absolute -bottom-1 -left-2 text-lg filter drop-shadow-[0_0_6px_rgba(251,191,36,0.9)]"
            >
              🌟
            </motion.span>
          </div>

          <div className="flex items-center justify-center gap-1.5 mb-1">
            <span className="text-[10px] font-black uppercase tracking-widest bg-black/25 px-2.5 py-0.5 rounded-full inline-block">
              Istiqamah Harian (Daily Streak)
            </span>
            <span className="text-[10px] bg-amber-300 text-amber-950 font-black px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-xs">
              <Sparkles className="w-2.5 h-2.5 fill-amber-950" />
              <span>Mubarak!</span>
            </span>
          </div>

          <h2 className="text-3xl font-black font-chibi mt-1 flex items-center justify-center gap-1.5 text-yellow-100">
            <span>{profile.dailyStreak} Hari Berturut-turut!</span>
          </h2>
          <p className="text-xs text-amber-100 mt-1 max-w-xs mx-auto leading-relaxed">
            Membiasakan belajar Al-Qur'an dan bahasa Arab setiap hari melipatgandakan berkah ilmu dan pemahaman.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-4 space-y-4 overflow-y-auto">
          {/* Claim Daily Checkin Button */}
          <div>
            {!isClaimedToday ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleClaimDailyReward}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-black text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer border border-amber-300"
              >
                <Gift className="w-5 h-5 fill-slate-950" />
                <span>Klaim Bonus Hadiah Masuk Hari Ini!</span>
              </motion.button>
            ) : (
              <div className="bg-emerald-50 border border-emerald-300 p-3 rounded-2xl text-center text-xs font-bold text-emerald-900 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Hadiah masuk hari ini sudah diklaim. Datang lagi besok!</span>
              </div>
            )}
          </div>

          {/* Toast Notification */}
          <AnimatePresence>
            {claimToast && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-amber-100 border-2 border-amber-400 p-2.5 rounded-xl text-center text-xs font-black text-amber-950 flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>🎉</span>
                <span>Alhamdulillah! Bonus +{claimToast.xp} XP & +{claimToast.stars} Bintang telah ditambahkan!</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 7-Day Cycle Grid */}
          <div className="bg-slate-50 p-3.5 rounded-3xl border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-slate-800 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-600" /> Siklus 7 Hari Belajar
              </span>
              <span className="text-[10px] text-amber-800 font-extrabold bg-amber-100 px-2 py-0.5 rounded-full">
                Hari ke-{currentCycleDay} dari 7
              </span>
            </div>

            <div className="grid grid-cols-7 gap-1.5 text-center">
              {streakDays.map((sd) => {
                const isPassed = sd.day < currentCycleDay;
                const isCurrent = sd.day === currentCycleDay;
                return (
                  <div
                    key={sd.day}
                    className={`p-2 rounded-2xl border flex flex-col items-center justify-between transition-all ${
                      isCurrent
                        ? 'bg-amber-100 border-amber-400 shadow-sm ring-2 ring-amber-300 font-black'
                        : isPassed
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                        : 'bg-white border-slate-200 text-slate-400'
                    }`}
                  >
                    <span className="text-[9px] font-bold block">{sd.label}</span>
                    <span className="text-lg my-0.5">
                      {isPassed ? '✅' : isCurrent ? '🔥' : sd.isGrand ? '🎁' : '⭐'}
                    </span>
                    <span className="text-[8px] font-extrabold block leading-tight">
                      {sd.rewardText.split('•')[0]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Streak Shield Protection */}
          <div className="bg-teal-50 p-3.5 rounded-2xl border border-teal-200 flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-teal-500 text-white flex items-center justify-center text-xl shadow-xs shrink-0">
              🛡️
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs text-teal-950">Perisai Api Streak</h4>
                <span className="text-xs font-black text-teal-800 bg-teal-200 px-2 py-0.2 rounded-full">
                  {profile.streakShields || 1} Aktif
                </span>
              </div>
              <p className="text-[11px] text-teal-800 mt-0.5 leading-snug">
                Melindungi runtuhnya rentetan streak belajarmu jika sewaktu-waktu terlewat 1 hari karena udzur.
              </p>
            </div>
          </div>

          {/* Hadits Quote Card */}
          <div className="bg-amber-50/70 p-3 rounded-2xl border border-amber-200 text-center">
            <p className="font-arabic text-sm font-bold text-amber-950 leading-relaxed">
              أَحَبُّ الأَعْمَالِ إِلَى اللَّهِ أَدْوَمُهَا وَإِنْ قَلَّ
            </p>
            <p className="text-[11px] text-amber-900 mt-1 italic">
              "Amalan yang paling dicintai oleh Allah adalah amalan yang kontinu (istiqamah) walaupun sedikit."
            </p>
            <span className="text-[10px] text-amber-700 font-bold block mt-0.5">
              (HR. Muslim No. 783)
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
