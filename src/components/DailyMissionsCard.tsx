import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, CheckCircle2, Play, Award, Sparkles, Gift, Clock, Flame } from 'lucide-react';
import { DailyMission, DailyMissionsService } from '../services/missions';
import { sound } from '../services/sound';

interface DailyMissionsCardProps {
  onLaunchGame: (gameId: string) => void;
  onRewardClaimed: (xp: number, stars: number) => void;
}

export const DailyMissionsCard: React.FC<DailyMissionsCardProps> = ({
  onLaunchGame,
  onRewardClaimed
}) => {
  const [missions, setMissions] = useState<DailyMission[]>([]);
  const [claimedToast, setClaimedToast] = useState<{ title: string; xp: number; stars: number } | null>(null);

  useEffect(() => {
    setMissions(DailyMissionsService.getDailyMissions());
  }, []);

  const handleClaim = (mission: DailyMission) => {
    const res = DailyMissionsService.claimMissionReward(mission.id);
    if (res.success) {
      setMissions(DailyMissionsService.getDailyMissions());
      onRewardClaimed(res.xp, res.stars);
      setClaimedToast({
        title: mission.title,
        xp: res.xp,
        stars: res.stars
      });
      setTimeout(() => setClaimedToast(null), 3000);
    }
  };

  const completedCount = missions.filter(m => m.completed).length;
  const claimedCount = missions.filter(m => m.claimed).length;

  return (
    <div className="bg-white rounded-3xl p-4 border border-amber-200 shadow-sm relative overflow-hidden">
      {/* Decorative Background Accent */}
      <div className="absolute -top-10 -right-10 w-28 h-28 bg-gradient-to-br from-amber-200/40 to-orange-200/20 rounded-full blur-xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-3 relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-base shadow-2xs">
            🎯
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-800 flex items-center gap-1.5 font-chibi">
              Misi Harian (Daily Tasks)
            </h4>
            <span className="text-[10px] text-slate-500 font-medium">
              Selesaikan mini-game untuk bonus XP & Bintang harian
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full text-xs font-bold text-amber-800">
          <Clock className="w-3 h-3 text-amber-600" />
          <span>{completedCount}/3 Selesai</span>
        </div>
      </div>

      {/* Missions List */}
      <div className="space-y-2.5 relative z-10">
        {missions.map((mission) => {
          const percent = Math.min(100, Math.round((mission.currentCount / mission.targetCount) * 100));

          return (
            <motion.div
              key={mission.id}
              whileHover={{ y: -1 }}
              className={`p-3 rounded-2xl border transition-all ${
                mission.claimed
                  ? 'bg-slate-50 border-slate-200 opacity-80'
                  : mission.completed
                  ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-300 shadow-xs'
                  : 'bg-white border-amber-100 hover:border-amber-300 shadow-2xs'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-xl shrink-0 shadow-2xs">
                    {mission.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`text-[9px] font-black text-white px-1.5 py-0.2 rounded-full ${mission.badgeBg}`}>
                        {mission.islandName}
                      </span>
                      <span className="text-[10px] font-bold text-amber-900 bg-amber-100/80 px-1.5 py-0.2 rounded-full">
                        +{mission.xpReward} XP • +{mission.starsReward} ★
                      </span>
                    </div>
                    <h5 className="font-bold text-xs text-slate-900 mt-0.5 leading-snug">
                      {mission.title}
                    </h5>
                  </div>
                </div>

                {/* Right Action Button */}
                <div className="shrink-0">
                  {mission.claimed ? (
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-200 px-2.5 py-1 rounded-xl flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-slate-500" />
                      Klaim ✓
                    </span>
                  ) : mission.completed ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleClaim(mission)}
                      className="px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center gap-1 animate-pulse"
                    >
                      <Gift className="w-3.5 h-3.5" />
                      Klaim Hadiah!
                    </motion.button>
                  ) : (
                    <button
                      onClick={() => onLaunchGame(mission.gameId)}
                      className="px-3 py-1.5 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-slate-950 font-black text-xs rounded-xl shadow-xs flex items-center gap-1 active:scale-95 transition-all"
                    >
                      <Play className="w-3 h-3 fill-slate-950" />
                      Main
                    </button>
                  )}
                </div>
              </div>

              {/* Description and Progress bar */}
              <div className="space-y-1">
                <p className="text-[11px] text-slate-600 leading-tight">
                  {mission.description}
                </p>

                <div className="flex items-center gap-2 pt-1">
                  <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200/80">
                    <motion.div
                      className={`h-full rounded-full transition-all duration-500 ${
                        mission.completed
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                          : 'bg-gradient-to-r from-amber-400 to-orange-500'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 min-w-[28px] text-right">
                    {mission.currentCount}/{mission.targetCount}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* All Complete Celebration Banner */}
      {claimedCount === 3 && (
        <div className="mt-3 p-2.5 rounded-2xl bg-gradient-to-r from-amber-400/20 via-orange-400/20 to-teal-400/20 border border-amber-300 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="text-xl">🏆</span>
            <div>
              <span className="font-black text-amber-950 block">Semua Misi Hari Ini Tuntas!</span>
              <span className="text-[10px] text-amber-900">Hudhud sangat bangga dengan ketekunan belajarmu hari ini!</span>
            </div>
          </div>
          <Flame className="w-5 h-5 text-orange-500 fill-orange-400 shrink-0" />
        </div>
      )}

      {/* Claim Toast Overlay */}
      <AnimatePresence>
        {claimedToast && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="absolute inset-x-4 bottom-4 bg-slate-900/95 backdrop-blur-md text-white p-3 rounded-2xl shadow-2xl border border-amber-300 flex items-center justify-between z-30"
          >
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <div>
                <span className="text-xs font-bold block">Hadiah Misi Diklaim!</span>
                <span className="text-[10px] text-slate-300 truncate block">{claimedToast.title}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-black text-amber-300 bg-black/40 px-2.5 py-1 rounded-xl">
              <span>+{claimedToast.xp} XP</span> • <span>+{claimedToast.stars} ★</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
