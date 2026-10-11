import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Trophy, Crown, Star, Sparkles, Medal, Users, Shield } from 'lucide-react';
import { GameStorage } from '../services/storage';
import { UserProfile, LeaderboardEntry } from '../types/game';

interface LeaderboardModalProps {
  profile: UserProfile;
  onClose: () => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({ profile, onClose }) => {
  const [leagueTab, setLeagueTab] = useState<'musafir' | 'thalib' | 'all'>('all');
  const leaderboard = GameStorage.getLeaderboard();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-lg bg-amber-50 rounded-3xl shadow-2xl border-4 border-amber-300 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-slate-950 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-900" />
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-900 block">Papan Peringkat Mingguan</span>
              <h2 className="text-xl font-bold font-chibi">Liga Petualang Brightoria</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center text-slate-900 font-bold transition-colors"
          >
            ✕
          </button>
        </div>

        {/* League Selector */}
        <div className="p-3 bg-amber-100/70 border-b border-amber-200 flex items-center justify-between gap-1 text-xs font-bold">
          <button
            onClick={() => setLeagueTab('all')}
            className={`flex-1 py-1.5 rounded-xl transition-all ${
              leagueTab === 'all' ? 'bg-amber-500 text-white shadow-xs' : 'text-amber-900 hover:bg-amber-200'
            }`}
          >
            🌍 Semua Liga
          </button>
          <button
            onClick={() => setLeagueTab('musafir')}
            className={`flex-1 py-1.5 rounded-xl transition-all ${
              leagueTab === 'musafir' ? 'bg-teal-600 text-white shadow-xs' : 'text-amber-900 hover:bg-amber-200'
            }`}
          >
            🧭 Liga Musafir
          </button>
          <button
            onClick={() => setLeagueTab('thalib')}
            className={`flex-1 py-1.5 rounded-xl transition-all ${
              leagueTab === 'thalib' ? 'bg-blue-600 text-white shadow-xs' : 'text-amber-900 hover:bg-amber-200'
            }`}
          >
            📚 Liga Thalib
          </button>
        </div>

        {/* Leaderboard List */}
        <div className="p-4 flex-1 overflow-y-auto space-y-2">
          {leaderboard.map((entry) => {
            const isMe = entry.isCurrentUser;
            let rankBadge = (
              <span className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold">
                {entry.rank}
              </span>
            );
            if (entry.rank === 1) {
              rankBadge = (
                <span className="w-7 h-7 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center text-xs font-bold shadow-md">
                  🥇
                </span>
              );
            } else if (entry.rank === 2) {
              rankBadge = (
                <span className="w-7 h-7 rounded-full bg-slate-300 text-slate-900 flex items-center justify-center text-xs font-bold shadow-md">
                  🥈
                </span>
              );
            } else if (entry.rank === 3) {
              rankBadge = (
                <span className="w-7 h-7 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs font-bold shadow-md">
                  🥉
                </span>
              );
            }

            return (
              <div
                key={entry.id}
                className={`p-3 rounded-2xl border-2 flex items-center justify-between gap-3 transition-all ${
                  isMe
                    ? 'border-amber-400 bg-amber-100/90 shadow-md ring-2 ring-amber-300/60'
                    : 'border-amber-200/80 bg-white shadow-xs'
                }`}
              >
                <div className="flex items-center gap-3">
                  {rankBadge}

                  <div className="w-10 h-10 rounded-full bg-teal-100 border border-teal-300 flex items-center justify-center text-xl">
                    {entry.avatar === 'ari' ? '👦' : entry.avatar === 'aira' ? '👧' : '🧒'}
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-sm text-slate-900">
                        {entry.name} {isMe && <span className="text-[10px] bg-amber-400 text-slate-950 font-extrabold px-1.5 py-0.2 rounded-full">Kamu</span>}
                      </h4>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                      <span className="text-teal-700 font-semibold">Rutbah: {entry.rutbah}</span>
                      <span>•</span>
                      <span>Hudhud: {entry.hudhudStage}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center justify-end gap-1 font-bold text-amber-700 text-sm">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>{entry.xp} XP</span>
                  </div>
                  <div className="flex items-center justify-end gap-1 text-[11px] text-amber-600 font-medium">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{entry.stars} Bintang</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Motivational Banner */}
        <div className="p-3 bg-white border-t border-amber-200 text-center">
          <p className="text-xs text-slate-600 font-medium">
            🌟 Belajar teratur setiap hari menaikkan peringkatmu di Liga Petualang tanpa tekanan!
          </p>
        </div>
      </motion.div>
    </div>
  );
};
