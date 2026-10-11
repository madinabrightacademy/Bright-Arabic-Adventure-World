import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Gamepad2, Play, Sparkles, Filter, CheckCircle2 } from 'lucide-react';
import { GAMES_CATALOG, ISLANDS_DATA } from '../data/curriculum';
import { IslandId, UserProfile } from '../types/game';

interface GamesCenterViewProps {
  profile: UserProfile;
  onLaunchGame: (gameId: string) => void;
}

export const GamesCenterView: React.FC<GamesCenterViewProps> = ({ profile, onLaunchGame }) => {
  const [selectedFilter, setSelectedFilter] = useState<IslandId | 'ALL'>('ALL');

  const filteredGames = selectedFilter === 'ALL'
    ? GAMES_CATALOG
    : GAMES_CATALOG.filter(g => g.islandId === selectedFilter);

  const modalityLabels: Record<'R' | 'P' | 'L' | 'W', { label: string; color: string }> = {
    R: { label: 'Recognition (Membaca/Mengenali)', color: 'bg-emerald-100 text-emerald-800' },
    P: { label: 'Production (Berbicara/Lisan)', color: 'bg-teal-100 text-teal-800' },
    L: { label: 'Listening (Menyimak Reseptif)', color: 'bg-purple-100 text-purple-800' },
    W: { label: 'Writing (Menulis/Imla\')', color: 'bg-amber-100 text-amber-800' },
  };

  return (
    <div className="space-y-4 pb-20 pt-2 px-3 max-w-xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-teal-700 text-white rounded-3xl p-4 shadow-md border-2 border-purple-400/40">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-200 block">Pusat Permainan Edukasi</span>
            <h2 className="text-xl font-bold font-chibi flex items-center gap-1.5 mt-0.5">
              <span>🎮 29 Game Brightoria Lisan</span>
            </h2>
          </div>
          <span className="text-xs bg-amber-400 text-slate-950 font-black px-2.5 py-1 rounded-full shadow-xs">
            +XP & Bintang
          </span>
        </div>
        <p className="text-xs text-purple-100 mt-1 leading-relaxed">
          Game mengasah ingatan dan refleks tanpa rasa bersalah. Dapatkan exposure, XP, dan Bintang untuk Hudhud!
        </p>
      </div>

      {/* Filter by Island */}
      <div className="bg-white rounded-3xl p-3 border border-amber-200 shadow-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs font-bold">
          <button
            onClick={() => setSelectedFilter('ALL')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
              selectedFilter === 'ALL' ? 'bg-purple-700 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Semua Game ({GAMES_CATALOG.length})
          </button>
          {ISLANDS_DATA.map(isl => (
            <button
              key={isl.id}
              onClick={() => setSelectedFilter(isl.id)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                selectedFilter === isl.id ? 'bg-teal-700 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {isl.id} - {isl.name_id.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Games Cards Grid */}
      <div className="space-y-3">
        {filteredGames.map((game) => {
          const island = ISLANDS_DATA.find(i => i.id === game.islandId);
          const mod = modalityLabels[game.evidence];

          return (
            <motion.div
              key={game.id}
              whileHover={{ y: -2 }}
              className="bg-white rounded-3xl p-4 border border-amber-200 shadow-sm transition-all"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className={`text-[10px] font-black text-white px-2 py-0.2 rounded-full ${island?.badgeBg || 'bg-slate-700'}`}>
                      {island?.name_id}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded-full">
                      Tipe: {game.frameworkType}
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${mod.color}`}>
                      Bukti: {mod.label}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mt-1">{game.name}</h3>
                </div>

                <button
                  onClick={() => onLaunchGame(game.id)}
                  className="px-3.5 py-2 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-xs rounded-xl shadow-md active:scale-95 transition-all flex items-center gap-1.5 shrink-0"
                >
                  <Play className="w-3.5 h-3.5 fill-slate-950" />
                  Main
                </button>
              </div>

              <p className="text-xs text-slate-600 mb-3">{game.mechanic}</p>

              {/* Child vs Adult Mode specifics */}
              <div className="bg-slate-50 rounded-2xl p-2.5 border border-slate-100 text-[11px] grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <span className="font-bold text-amber-800">🎈 Mode Anak:</span>
                  <p className="text-slate-600 mt-0.5">{game.childMode}</p>
                </div>
                <div>
                  <span className="font-bold text-teal-800">💼 Mode Dewasa:</span>
                  <p className="text-slate-600 mt-0.5">{game.adultMode}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
