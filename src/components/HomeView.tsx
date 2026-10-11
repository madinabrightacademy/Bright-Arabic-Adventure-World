import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Play, Sparkles, Mail, Trophy, Star, ArrowRight, BookOpen, Flame, Compass, Heart } from 'lucide-react';
import { UserProfile, IslandId } from '../types/game';
import { sound } from '../services/sound';
import { ISLANDS_DATA } from '../data/curriculum';

interface HomeViewProps {
  profile: UserProfile;
  onNavigateTab: (tab: any) => void;
  onLaunchGame: (gameId: string) => void;
  onOpenHudhudLetter: () => void;
  onOpenCompanionRoom: () => void;
  onOpenLeaderboard: () => void;
  onOpenRealWorldMissions: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  profile,
  onNavigateTab,
  onLaunchGame,
  onOpenHudhudLetter,
  onOpenCompanionRoom,
  onOpenLeaderboard,
  onOpenRealWorldMissions
}) => {
  const [hudhudInteracted, setHudhudInteracted] = useState(false);

  const handleHudhudClick = () => {
    sound.playSparkle();
    setHudhudInteracted(true);
    setTimeout(() => setHudhudInteracted(false), 1200);
  };

  const hudhudStageVisuals = {
    Egg: { emoji: '🥚', title: 'Telur Menunggu Bukti Belajar', desc: 'Selesaikan 1 skill lagi agar telur menetas!' },
    Baby: { emoji: '🐣', title: 'Katkut Mungil (Jenjang 0)', desc: 'Burung hudhud mungil berjambul tipis dan lincah.' },
    Young: { emoji: '🪶', title: 'Hudhud Muda (Jenjang 1)', desc: 'Sayap berhias pola huruf hijaiyah berkilauan.' },
    Explorer: { emoji: '🧭', title: 'Rahhal Penjelajah (Jenjang 2)', desc: 'Membawa kompas kata dan ransel petualang.' },
    Scribe: { emoji: '📜', title: 'Katib (Jenjang 3)', desc: 'Pena kalam di jambul, penguasa teks Arab.' },
    Guardian: { emoji: '🛡️', title: 'Haris (Jenjang 4)', desc: 'Jubah pelindung perisai kaligrafi megah.' },
    Master: { emoji: '👑', title: 'Adib Agung (Jenjang 5)', desc: 'Mahkota cahaya sastra mutlak.' },
  };

  const hudhudInfo = hudhudStageVisuals[profile.hudhudStage];

  return (
    <div className="space-y-4 pb-20 pt-2 px-3 max-w-xl mx-auto">
      {/* Living Home Character Stage (Bab 20) */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-teal-500 via-teal-600 to-amber-700 text-white p-5 shadow-xl border-4 border-amber-300">
        {/* Sky Clouds and Decorative Ornaments */}
        <div className="absolute top-2 right-3 text-4xl opacity-30 select-none pointer-events-none">☁️</div>
        <div className="absolute top-8 left-4 text-3xl opacity-25 select-none pointer-events-none">✨</div>

        <div className="flex items-center justify-between mb-3 relative z-10">
          <div className="flex items-center gap-2 bg-black/25 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-bold">
            <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>Streak Belajar: {profile.dailyStreak} Hari</span>
          </div>

          <button
            onClick={onOpenLeaderboard}
            className="flex items-center gap-1.5 bg-amber-400/90 hover:bg-amber-400 text-amber-950 font-extrabold text-xs px-3 py-1 rounded-full shadow-xs active:scale-95 transition-all"
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Peringkat Liga</span>
          </button>
        </div>

        {/* Center Interactive Hudhud Hero */}
        <div className="flex flex-col items-center justify-center my-3 relative z-10">
          <div
            onClick={handleHudhudClick}
            className="cursor-pointer relative p-4 group"
            title="Ketuk untuk menyapa Hudhud!"
          >
            <motion.div
              animate={hudhudInteracted ? { scale: [1, 1.3, 1], rotate: [0, -10, 10, 0] } : { y: [0, -8, 0] }}
              transition={hudhudInteracted ? { duration: 0.5 } : { repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
              className="text-7xl select-none filter drop-shadow-[0_12px_12px_rgba(0,0,0,0.5)]"
            >
              {hudhudInfo.emoji}
            </motion.div>

            {hudhudInteracted && (
              <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: -20 }}
                className="absolute top-0 right-2 text-2xl"
              >
                💖
              </motion.div>
            )}
          </div>

          <div className="text-center mt-1">
            <h3 className="text-xl font-black font-chibi flex items-center justify-center gap-1.5 drop-shadow-sm">
              <span>{hudhudInfo.title}</span>
            </h3>
            <p className="text-xs text-amber-100 max-w-xs mx-auto mt-0.5 leading-snug font-medium">
              "{profile.name}, aku menemanimu menaklukkan 8 pulau bahasa Arab hari ini!"
            </p>
          </div>

          {/* Quick interactive buttons under character */}
          <div className="flex items-center gap-2 mt-3 flex-wrap justify-center">
            <button
              onClick={onOpenCompanionRoom}
              className="px-3.5 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold flex items-center gap-1.5 backdrop-blur-xs transition-all active:scale-95"
            >
              <Heart className="w-3.5 h-3.5 text-pink-300" />
              Kamar Hudhud
            </button>
            <button
              onClick={onOpenHudhudLetter}
              className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-amber-950 text-xs font-black flex items-center gap-1.5 shadow-md transition-all active:scale-95"
            >
              <Mail className="w-3.5 h-3.5" />
              Surat Harian
            </button>
            <button
              onClick={onOpenRealWorldMissions}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-emerald-950 text-xs font-black flex items-center gap-1.5 shadow-md transition-all active:scale-95"
            >
              <span>🎖️</span> Misi Nyata
            </button>
          </div>
        </div>

        {/* Big Start Adventure CTA */}
        <div className="mt-4 pt-3 border-t border-white/20 relative z-10">
          <button
            onClick={() => onNavigateTab('learn')}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 active:scale-98 text-slate-950 font-black text-sm shadow-xl flex items-center justify-center gap-2 transition-all"
          >
            <Play className="w-5 h-5 fill-slate-950" />
            Lanjutkan Sesi Belajar Hari Ini (15 Menit)
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Core Learning Loop Checklist (Bab 10 & Bab 31 PDF) */}
      <div className="bg-white rounded-3xl p-4 border border-amber-200 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">🎯</span>
            <h4 className="font-bold text-sm text-slate-800">Alur Belajar Harian (Core Loop)</h4>
          </div>
          <span className="text-xs bg-teal-100 text-teal-800 font-extrabold px-2.5 py-0.5 rounded-full">
            10–15 Menit Sehat
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div
            onClick={() => onNavigateTab('learn')}
            className="p-3 rounded-2xl bg-teal-50/60 border border-teal-200 hover:border-teal-400 cursor-pointer transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between font-bold text-teal-900 mb-1">
              <span>1. Review SRS</span>
              <span>🔄</span>
            </div>
            <p className="text-[11px] text-slate-600">Pengulangan 5 kata terjadwal untuk memori jangka panjang.</p>
          </div>

          <div
            onClick={() => onNavigateTab('learn')}
            className="p-3 rounded-2xl bg-blue-50/60 border border-blue-200 hover:border-blue-400 cursor-pointer transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between font-bold text-blue-900 mb-1">
              <span>2. Skill Baru</span>
              <span>📖</span>
            </div>
            <p className="text-[11px] text-slate-600">Discover & Understand huruf, mufradat, atau kaidah.</p>
          </div>

          <div
            onClick={() => onNavigateTab('learn')}
            className="p-3 rounded-2xl bg-amber-50/60 border border-amber-200 hover:border-amber-400 cursor-pointer transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between font-bold text-amber-900 mb-1">
              <span>3. Practice</span>
              <span>✏️</span>
            </div>
            <p className="text-[11px] text-slate-600">8 Soal interaktif menguji pemahaman tanpa tekanan.</p>
          </div>

          <div
            onClick={() => onNavigateTab('games')}
            className="p-3 rounded-2xl bg-purple-50/60 border border-purple-200 hover:border-purple-400 cursor-pointer transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between font-bold text-purple-900 mb-1">
              <span>4. Mini-Game</span>
              <span>🎮</span>
            </div>
            <p className="text-[11px] text-slate-600">Penerapan seru: Sand Trace, Pasar Apung, dll.</p>
          </div>
        </div>
      </div>

      {/* Featured Mini-Games Showcase */}
      <div className="bg-white rounded-3xl p-4 border border-amber-200 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">🕹️</span>
            <h4 className="font-bold text-sm text-slate-800">Game Edukasi Pilihan Hari Ini</h4>
          </div>
          <button
            onClick={() => onNavigateTab('games')}
            className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-0.5"
          >
            Lihat 29 Game <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="space-y-2.5">
          {/* Game 1: Sand Trace */}
          <div
            onClick={() => onLaunchGame('sand_trace')}
            className="p-3 rounded-2xl bg-gradient-to-r from-amber-50 to-teal-50 border border-amber-300 hover:border-amber-500 cursor-pointer transition-all flex items-center justify-between gap-3 group"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-200 text-2xl flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                🏖️
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wide text-teal-700 bg-teal-100 px-2 py-0.2 rounded-full">
                  Pulau Huruf (HRF)
                </span>
                <h5 className="font-bold text-sm text-slate-900 mt-0.5">Sand Trace (Jejak Pasir)</h5>
                <p className="text-[11px] text-slate-500">Telusuri huruf di pasir pantai dengan sapuan ombak laut.</p>
              </div>
            </div>
            <span className="text-xs font-bold text-amber-800 bg-amber-200 px-2.5 py-1.5 rounded-xl shrink-0">
              Mainkan ▶
            </span>
          </div>

          {/* Game 2: Floating Market */}
          <div
            onClick={() => onLaunchGame('floating_market')}
            className="p-3 rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-300 hover:border-orange-500 cursor-pointer transition-all flex items-center justify-between gap-3 group"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-orange-200 text-2xl flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                ⛵
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wide text-orange-700 bg-orange-100 px-2 py-0.2 rounded-full">
                  Pasar Mufradat (MFR)
                </span>
                <h5 className="font-bold text-sm text-slate-900 mt-0.5">Floating Market Quest</h5>
                <p className="text-[11px] text-slate-500">Layani pelanggan pasar apung dengan kosakata Arab fasih.</p>
              </div>
            </div>
            <span className="text-xs font-bold text-orange-800 bg-orange-200 px-2.5 py-1.5 rounded-xl shrink-0">
              Mainkan ▶
            </span>
          </div>

          {/* Game 3: Sentence Bridge Builder */}
          <div
            onClick={() => onLaunchGame('sentence_bridge')}
            className="p-3 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-300 hover:border-blue-500 cursor-pointer transition-all flex items-center justify-between gap-3 group"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-200 text-2xl flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                ⛰️
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wide text-blue-700 bg-blue-100 px-2 py-0.2 rounded-full">
                  Gunung Qawa'id (QWD)
                </span>
                <h5 className="font-bold text-sm text-slate-900 mt-0.5">Sentence Bridge Builder</h5>
                <p className="text-[11px] text-slate-500">Susun balok mudzakkar & muannats agar jembatan terhubung.</p>
              </div>
            </div>
            <span className="text-xs font-bold text-blue-800 bg-blue-200 px-2.5 py-1.5 rounded-xl shrink-0">
              Mainkan ▶
            </span>
          </div>
        </div>
      </div>

      {/* 8 Islands Map Teaser */}
      <div className="bg-gradient-to-r from-teal-700 to-cyan-800 rounded-3xl p-4 text-white shadow-md flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-amber-300" />
            <h4 className="font-bold text-sm font-chibi">Jelajahi Peta 8 Kepulauan</h4>
          </div>
          <p className="text-xs text-teal-100 mt-1 max-w-xs">
            Buka kabut misteri tiap pulau dan kumpulkan 8 Kristal Pengetahuan!
          </p>
        </div>
        <button
          onClick={() => onNavigateTab('world')}
          className="px-4 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs shadow-md transition-all active:scale-95 shrink-0"
        >
          Buka Peta 🗺️
        </button>
      </div>
    </div>
  );
};
