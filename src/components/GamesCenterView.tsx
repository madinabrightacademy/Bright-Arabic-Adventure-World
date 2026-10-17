import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Gamepad2,
  Play,
  Sparkles,
  Filter,
  Search,
  Star,
  Trophy,
  CheckCircle2,
  ChevronDown,
  Volume2
} from 'lucide-react';
import { GAMES_CATALOG, ISLANDS_DATA } from '../data/curriculum';
import { IslandId, UserProfile } from '../types/game';
import { getFriendlyIslandName } from '../data/skillPedagogy';
import { sound } from '../services/sound';
import { MascotCharacter, MascotType } from './MascotCharacter';

interface GamesCenterViewProps {
  profile: UserProfile;
  onLaunchGame: (gameId: string) => void;
}

type CategoryFilter = 'ALL' | 'HRF' | 'MFR' | 'QWD' | 'IST_HWR' | 'ACTION';

export const GamesCenterView: React.FC<GamesCenterViewProps> = ({ profile, onLaunchGame }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedInfoId, setExpandedInfoId] = useState<string | null>(null);
  const [mascotType, setMascotType] = useState<MascotType>(
    profile.avatar === 'aira' ? 'amira' : 'zaki'
  );

  const categories = [
    { id: 'ALL' as CategoryFilter, label: 'Semua Game', icon: '🎮', count: GAMES_CATALOG.length },
    { id: 'HRF' as CategoryFilter, label: 'Huruf & Fonik', icon: '🏖️', desc: 'Jejak Pasir & Makhraj' },
    { id: 'MFR' as CategoryFilter, label: 'Kosakata Apung', icon: '⛵', desc: 'Pasar & Ejaan' },
    { id: 'QWD' as CategoryFilter, label: 'Kaidah & Kalimat', icon: '🏰', desc: 'Jembatan & Tashrif' },
    { id: 'IST_HWR' as CategoryFilter, label: 'Suara & Dialog', icon: '🎧', desc: 'Gua Gema & Percakapan' },
    { id: 'ACTION' as CategoryFilter, label: 'Aksi & Kelulusan', icon: '🏃', desc: 'Sky Runner & Mihrab' },
  ];

  const modalityMeta: Record<'R' | 'P' | 'L' | 'W', { label: string; icon: string; color: string }> = {
    R: { label: 'Mengenali / Membaca', icon: '📖', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
    P: { label: 'Berbicara / Lisan', icon: '🗣️', color: 'bg-teal-100 text-teal-800 border-teal-300' },
    L: { label: 'Menyimak Reseptif', icon: '🎧', color: 'bg-purple-100 text-purple-800 border-purple-300' },
    W: { label: 'Menulis / Imla\'', icon: '✍️', color: 'bg-amber-100 text-amber-900 border-amber-300' },
  };

  const getGameEmoji = (id: string, islandId: IslandId): string => {
    switch (id) {
      case 'sand_trace': return '🏖️';
      case 'floating_market': return '⛵';
      case 'sentence_bridge': return '⛰️';
      case 'pearl_garden': return '🦪';
      case 'pearl_chain': return '📿';
      case 'dialog_quest': return '💬';
      case 'echo_cave': return '🦇';
      case 'audio_detective': return '🔍';
      case 'sky_runner': return '🏃';
      case 'mihrab_gate': return '⛩️';
      case 'basket_spell': return '🧺';
      case 'makhraj_mirror': return '🪞';
      case 'imla_lighthouse': return '🗼';
      case 'scroll_tap_gloss': return '📜';
      case 'tashrif_lab': return '⚗️';
      case 'makhraj_mastery': return '🎤';
      default:
        if (islandId === 'HRF') return '🔤';
        if (islandId === 'MFR') return '🍎';
        if (islandId === 'HWR') return '🗣️';
        if (islandId === 'QWD') return '🧱';
        if (islandId === 'IST') return '🎧';
        if (islandId === 'QRA') return '📖';
        if (islandId === 'KTB') return '✒️';
        if (islandId === 'KLM') return '🎙️';
        return '🎮';
    }
  };

  const getGameDifficulty = (index: number): { stars: number; label: string; xp: number } => {
    if (index % 3 === 0) return { stars: 1, label: 'Pemula', xp: 35 };
    if (index % 3 === 1) return { stars: 2, label: 'Menengah', xp: 50 };
    return { stars: 3, label: 'Tantangan', xp: 75 };
  };

  const filteredGames = GAMES_CATALOG.filter(game => {
    // Category match
    let matchCat = true;
    if (selectedCategory === 'HRF') matchCat = game.islandId === 'HRF';
    else if (selectedCategory === 'MFR') matchCat = game.islandId === 'MFR';
    else if (selectedCategory === 'QWD') matchCat = game.islandId === 'QWD';
    else if (selectedCategory === 'IST_HWR') matchCat = game.islandId === 'IST' || game.islandId === 'HWR' || game.islandId === 'KLM';
    else if (selectedCategory === 'ACTION') matchCat = game.islandId === 'TMH' || game.id.includes('runner') || game.islandId === 'KTB';

    // Search query match
    let matchSearch = true;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      matchSearch =
        game.name.toLowerCase().includes(q) ||
        game.mechanic.toLowerCase().includes(q) ||
        game.frameworkType.toLowerCase().includes(q);
    }

    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-4 pb-24 pt-2 px-3 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto">
      {/* ==========================================================
          1. PARROTO-STYLE HERO HEADER WITH ACTIVE MASCOT
          ========================================================== */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-purple-700 via-indigo-700 to-teal-700 text-white p-4 sm:p-6 shadow-xl border-4 border-amber-300">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4 text-center sm:text-left">
            <MascotCharacter
              type={mascotType}
              mood="cheer"
              size="md"
              speechArabic="اِلْعَبْ وَتَعَلَّمْ مَعَنَا!"
              speechBubble="Pilih game petualanganmu! Kumpulkan XP dan Bintang Emas!"
              onTap={() => sound.speakArabic('اِلْعَبْ وَتَعَلَّمْ')}
            />

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[11px] font-black shadow-xs mb-1">
                <span>🎮 Parroto Games Hub</span>
                <span>•</span>
                <span>29 Game Edukasi</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black font-chibi text-white drop-shadow-sm">
                Pusat Mini-Game Edukasi Bahasa Arab
              </h1>
              <p className="text-xs sm:text-sm text-purple-100 max-w-md mt-0.5 leading-snug">
                Bermain sambil melatih fonik huruf, kosakata pasar, struktur kalimat, dan ketangkasan menyimak.
              </p>
            </div>
          </div>

          {/* Quick Mascot Switcher */}
          <div className="flex items-center gap-1 bg-white/20 backdrop-blur-xs p-1 rounded-2xl text-xs font-bold shrink-0">
            <button
              type="button"
              onClick={() => {
                sound.playPop();
                setMascotType('zaki');
              }}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                mascotType === 'zaki'
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
                setMascotType('amira');
              }}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                mascotType === 'amira'
                  ? 'bg-pink-400 text-slate-950 font-black shadow-xs'
                  : 'text-white/90 hover:bg-white/20'
              }`}
            >
              🧕 Maryam
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playPop();
                setMascotType('hudhud');
              }}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                mascotType === 'hudhud'
                  ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                  : 'text-white/90 hover:bg-white/20'
              }`}
            >
              🕊️ Hudhud
            </button>
          </div>
        </div>
      </div>

      {/* ==========================================================
          2. SEARCH & PARROTO CATEGORY CHIPS
          ========================================================== */}
      <div className="space-y-2.5">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari game: Pasir, Pasar Apung, Balok Kalimat, Gema..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border-2 border-amber-200 focus:border-teal-500 focus:outline-none text-xs sm:text-sm font-medium shadow-2xs transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
            >
              Hapus
            </button>
          )}
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  sound.playPop();
                  setSelectedCategory(cat.id);
                }}
                className={`flex-shrink-0 px-3.5 py-2 rounded-2xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer border-2 ${
                  isSelected
                    ? 'bg-gradient-to-r from-teal-700 to-cyan-800 text-white border-teal-500 shadow-md scale-102'
                    : 'bg-white text-slate-700 border-amber-200 hover:border-amber-300 hover:bg-amber-50/50'
                }`}
              >
                <span className="text-base">{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ==========================================================
          3. JUICY 3D GAME CARDS GRID (PARROTO-STYLE)
          ========================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filteredGames.map((game, idx) => {
          const island = ISLANDS_DATA.find(i => i.id === game.islandId);
          const fr = getFriendlyIslandName(game.islandId);
          const mod = modalityMeta[game.evidence];
          const emoji = getGameEmoji(game.id, game.islandId);
          const diff = getGameDifficulty(idx);
          const isExpanded = expandedInfoId === game.id;

          return (
            <motion.div
              key={game.id}
              whileHover={{ y: -3 }}
              className="bg-white rounded-3xl p-4 border-2 border-amber-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Top Row: Icon + Game Info + Play Button */}
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div className="flex items-start gap-3">
                    <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 border-2 border-amber-300 flex items-center justify-center text-3xl shadow-xs shrink-0">
                      <span>{emoji}</span>
                    </div>

                    <div>
                      {/* Island & Modality Badge */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] font-black bg-teal-100 text-teal-900 border border-teal-200 px-2 py-0.2 rounded-full">
                          {fr.shortName}
                        </span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full border ${mod.color}`}>
                          {mod.icon} {mod.label}
                        </span>
                      </div>

                      <h3 className="text-base font-black text-slate-900 font-chibi mt-1 leading-snug">
                        {game.name}
                      </h3>
                    </div>
                  </div>

                  {/* Tactile 3D Play Button (Parroto style: border-b-4 bouncy) */}
                  <button
                    type="button"
                    onClick={() => onLaunchGame(game.id)}
                    className="px-4 py-2.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs rounded-2xl shadow-md border-b-4 border-amber-600 active:translate-y-1 active:border-b-0 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-slate-950" />
                    <span>Mainkan</span>
                  </button>
                </div>

                {/* Mechanic description */}
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {game.mechanic}
                </p>

                {/* Difficulty & Rewards Row */}
                <div className="flex items-center justify-between text-xs py-2 px-3 rounded-2xl bg-amber-50/70 border border-amber-200/80 mb-2">
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] font-bold text-amber-950">Tingkat:</span>
                    <div className="flex items-center text-amber-400 text-xs">
                      {Array.from({ length: diff.stars }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-slate-600 ml-1">
                      ({diff.label})
                    </span>
                  </div>

                  <span className="text-[11px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                    +{diff.xp} XP • ⭐ 2
                  </span>
                </div>
              </div>

              {/* Mode details accordion (Mode Anak vs Mode Dewasa) */}
              <div className="mt-1 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setExpandedInfoId(isExpanded ? null : game.id)}
                  className="w-full text-[11px] font-bold text-slate-500 hover:text-slate-800 flex items-center justify-between cursor-pointer py-0.5"
                >
                  <span>Lihat Mode Anak & Dewasa</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </button>

                {isExpanded && (
                  <div className="mt-2 p-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-[11px] space-y-1.5 animate-in fade-in duration-150">
                    <div>
                      <span className="font-black text-amber-800">🎈 Mode Anak:</span>
                      <p className="text-slate-600 mt-0.5">{game.childMode}</p>
                    </div>
                    <div>
                      <span className="font-black text-teal-800">💼 Mode Dewasa:</span>
                      <p className="text-slate-600 mt-0.5">{game.adultMode}</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredGames.length === 0 && (
        <div className="bg-white rounded-3xl p-8 text-center border-2 border-dashed border-amber-300">
          <span className="text-4xl block mb-2">🔍</span>
          <h4 className="font-black text-sm text-slate-800">Tidak ada game yang sesuai pencarian</h4>
          <p className="text-xs text-slate-500 mt-1">Coba kata kunci lain atau pilih tab Semua Game.</p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('ALL');
            }}
            className="mt-3 px-4 py-2 rounded-xl bg-teal-700 text-white font-bold text-xs"
          >
            Reset Filter
          </button>
        </div>
      )}
    </div>
  );
};
