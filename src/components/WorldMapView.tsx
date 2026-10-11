import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Sparkles, Lock, Play, ChevronRight, Info, Shield, Layers } from 'lucide-react';
import { UserProfile, IslandId, Island } from '../types/game';
import { ISLANDS_DATA, GAMES_CATALOG } from '../data/curriculum';
import { sound } from '../services/sound';

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
  onOpenPulauKalamHub
}) => {
  const [selectedIslandId, setSelectedIslandId] = useState<IslandId>('HRF');
  const [timeOfDay, setTimeOfDay] = useState<'day' | 'sunset' | 'night'>('day');

  const selectedIsland = ISLANDS_DATA.find(i => i.id === selectedIslandId) || ISLANDS_DATA[0];
  const islandGames = GAMES_CATALOG.filter(g => g.islandId === selectedIsland.id);
  const isIslandUnlocked = selectedIsland.minLevel <= profile.level;
  const hasCrystal = profile.crystals[selectedIsland.id];

  const skyAtmospheres = {
    day: 'from-sky-400 via-teal-500 to-blue-700',
    sunset: 'from-amber-500 via-rose-600 to-indigo-900',
    night: 'from-indigo-950 via-slate-900 to-purple-950',
  };

  const handleSelectIsland = (island: Island) => {
    sound.speakArabic(island.name_ar);
    setSelectedIslandId(island.id);
  };

  return (
    <div className="space-y-4 pb-20 pt-2 px-3 max-w-xl mx-auto">
      {/* World Map Header */}
      <div className="bg-gradient-to-r from-teal-700 via-cyan-800 to-blue-900 text-white rounded-3xl p-4 shadow-md border-2 border-teal-400/40">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-200 block">Peta Diorama 3D Kepulauan</span>
            <h2 className="text-xl font-bold font-chibi flex items-center gap-1.5 mt-0.5">
              <span>🏝️ 8 Pulau Bahasa Arab</span>
            </h2>
          </div>
          <div className="flex items-center gap-1 bg-white/20 px-2.5 py-1 rounded-xl text-xs font-bold backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Anti Tumpang Tindih</span>
          </div>
        </div>
        <p className="text-xs text-teal-100 mt-1 max-w-md leading-relaxed">
          Satu pulau menguasai satu domain keterampilan unik (1 skill = 1 pulau pemilik) sesuai standar pedagogi Brightoria Lisan.
        </p>
      </div>

      {/* Atmosphere controls */}
      <div className="flex items-center justify-between bg-white rounded-2xl p-2 px-3 border border-amber-200 shadow-xs text-xs font-bold">
        <span className="text-slate-600">Suasana Kepulauan:</span>
        <div className="flex gap-1">
          <button
            onClick={() => setTimeOfDay('day')}
            className={`px-2.5 py-1 rounded-xl transition-all ${
              timeOfDay === 'day' ? 'bg-sky-500 text-white shadow-xs' : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            ☀️ Siang
          </button>
          <button
            onClick={() => setTimeOfDay('sunset')}
            className={`px-2.5 py-1 rounded-xl transition-all ${
              timeOfDay === 'sunset' ? 'bg-rose-500 text-white shadow-xs' : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            🌇 Senja Emas
          </button>
          <button
            onClick={() => setTimeOfDay('night')}
            className={`px-2.5 py-1 rounded-xl transition-all ${
              timeOfDay === 'night' ? 'bg-indigo-900 text-white shadow-xs' : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            🌌 Malam
          </button>
        </div>
      </div>

      {/* Archipelago Diorama Map Grid (8 Islands Layout) */}
      <div className={`relative bg-gradient-to-b ${skyAtmospheres[timeOfDay]} rounded-3xl p-4 shadow-xl border-4 border-amber-300 overflow-hidden min-h-[360px] transition-colors duration-500`}>
        {/* Ocean waves texture and sailing ship */}
        <div className="absolute inset-0 opacity-15 pointer-events-none select-none text-6xl flex flex-wrap gap-12 p-4">
          <span>🌊</span><span>⛵</span><span>🐬</span><span>🏝️</span>
        </div>

        {/* Sailing boat animation between islands */}
        <motion.div
          animate={{ x: [10, 180, 80, 260, 10], y: [10, 60, 120, 40, 10] }}
          transition={{ repeat: Infinity, duration: 24, ease: 'linear' }}
          className="absolute z-20 text-3xl pointer-events-none filter drop-shadow-md"
          title="Kapal Penjelajah Ari & Aira"
        >
          ⛵
        </motion.div>

        {/* Islands Interactive Coordinates */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 relative z-10">
          {ISLANDS_DATA.map((isl) => {
            const isUnlocked = isl.minLevel <= profile.level;
            const isSelected = selectedIslandId === isl.id;
            const hasGem = profile.crystals[isl.id];

            return (
              <motion.button
                key={isl.id}
                onClick={() => handleSelectIsland(isl)}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className={`relative p-3 rounded-2xl flex flex-col items-center text-center transition-all shadow-md ${
                  isSelected
                    ? 'ring-4 ring-amber-300 scale-102 bg-white text-slate-900 shadow-xl'
                    : isUnlocked
                    ? 'bg-white/90 backdrop-blur-xs hover:bg-white text-slate-800'
                    : 'bg-slate-900/70 backdrop-blur-xs text-slate-300 border border-white/20'
                }`}
              >
                {/* Fog of war / lock icon */}
                {!isUnlocked && (
                  <div className="absolute top-1.5 right-1.5 bg-black/60 rounded-full p-1 text-slate-300" title="Tertutup kabut (butuh kenaikan level)">
                    <Lock className="w-3 h-3" />
                  </div>
                )}

                {/* Crystal indicator */}
                {hasGem && (
                  <div className="absolute top-1.5 left-1.5 text-xs animate-bounce" title="Kristal Didapat!">
                    💎
                  </div>
                )}

                {/* Island Icon */}
                <div className="text-3xl mb-1 filter drop-shadow-sm">
                  {isl.id === 'HRF' ? '🐚' :
                   isl.id === 'MFR' ? '🛶' :
                   isl.id === 'HWR' ? '🏘️' :
                   isl.id === 'QWD' ? '⛰️' :
                   isl.id === 'IST' ? '🎧' :
                   isl.id === 'QRA' ? '📚' :
                   isl.id === 'KTB' ? '🖋️' :
                   isl.id === 'KLM' ? '🎙️' : '🏛️'}
                </div>

                <span className="font-arabic font-bold text-xs text-slate-900 leading-tight">
                  {isl.name_ar}
                </span>

                <span className="text-[11px] font-bold text-slate-700 leading-tight mt-0.5 line-clamp-1">
                  {isl.name_id.split(' ')[0]} {isl.name_id.split(' ')[1] || ''}
                </span>

                <span className="text-[9px] text-teal-800 font-extrabold bg-teal-100 px-1.5 py-0.2 rounded-full mt-1">
                  {isl.skillCount} Skill
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Selected Island Detail Card */}
      <div className="bg-white rounded-3xl p-4 border border-amber-200 shadow-sm">
        <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3 mb-3">
          <div>
            <div className="flex items-center gap-1.5">
              <span className={`text-[10px] font-extrabold text-white px-2.5 py-0.5 rounded-full ${selectedIsland.badgeBg}`}>
                ID: {selectedIsland.id}
              </span>
              <span className="text-[11px] font-bold text-slate-500">
                Jenjang Pembuka: J{selectedIsland.minLevel}
              </span>
              {hasCrystal && (
                <span className="text-[10px] bg-amber-100 text-amber-900 font-extrabold px-2 py-0.5 rounded-full">
                  💎 Kristal Diperoleh
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold text-slate-900 mt-1">{selectedIsland.name_id}</h3>
            <p className="font-arabic text-xl font-bold text-teal-800 mt-0.5">{selectedIsland.name_ar}</p>
          </div>

          <div className="text-right">
            <span className="text-[11px] font-bold text-slate-500 block">Kristal Pulau:</span>
            <span className="text-xs font-extrabold text-amber-700">{selectedIsland.crystalName}</span>
          </div>
        </div>

        <p className="text-xs text-slate-600 mb-3 leading-relaxed">
          {selectedIsland.description}
        </p>

        {/* Biome 3D Detail */}
        <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-200 mb-3 text-xs">
          <strong className="text-slate-800">Biome 3D:</strong> <span className="text-slate-600">{selectedIsland.biome3D}</span>
        </div>

        {/* Hub Eksplorasi Khusus Pulau Huruf */}
        {selectedIsland.id === 'HRF' && onOpenPulauHurufHub && (
          <div className="mb-3.5 bg-gradient-to-r from-teal-700 to-cyan-800 text-white p-3 rounded-2xl flex items-center justify-between gap-3 shadow-md border-2 border-teal-400">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🐚</span>
              <div>
                <h4 className="text-xs font-black">Pusat Eksplorasi Pulau Huruf</h4>
                <p className="text-[10px] text-teal-100">Bimbingan Syaikh Kamil, Lab Harakat & Ensiklopedia 28 Huruf</p>
              </div>
            </div>
            <button
              onClick={onOpenPulauHurufHub}
              className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-xs shrink-0 active:scale-95 transition-all flex items-center gap-1"
            >
              <span>Buka Hub</span>
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Hub Eksplorasi Khusus Pulau Mufradat */}
        {selectedIsland.id === 'MFR' && onOpenPulauMufradatHub && (
          <div className="mb-3.5 bg-gradient-to-r from-amber-600 to-orange-700 text-white p-3 rounded-2xl flex items-center justify-between gap-3 shadow-md border-2 border-amber-300">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🛶</span>
              <div>
                <h4 className="text-xs font-black">Pusat Pasar Apung Mufradat</h4>
                <p className="text-[10px] text-amber-100">Bimbingan Bibi Maryam, Etalase Tematik & Dinar Pasar</p>
              </div>
            </div>
            <button
              onClick={onOpenPulauMufradatHub}
              className="px-3.5 py-1.5 bg-amber-300 hover:bg-amber-200 text-amber-950 font-black text-xs rounded-xl shadow-xs shrink-0 active:scale-95 transition-all flex items-center gap-1"
            >
              <span>Buka Pasar</span>
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Hub Eksplorasi Khusus Kampung Hiwar */}
        {selectedIsland.id === 'HWR' && onOpenPulauHiwarHub && (
          <div className="mb-3.5 bg-gradient-to-r from-emerald-700 to-teal-800 text-white p-3 rounded-2xl flex items-center justify-between gap-3 shadow-md border-2 border-emerald-400">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🏘️</span>
              <div>
                <h4 className="text-xs font-black">Pusat Kampung Hiwar (Percakapan)</h4>
                <p className="text-[10px] text-emerald-100">Bimbingan Ustaz Salman, 5 Skenario Dialog & Buku Frasa</p>
              </div>
            </div>
            <button
              onClick={onOpenPulauHiwarHub}
              className="px-3.5 py-1.5 bg-amber-300 hover:bg-amber-200 text-emerald-950 font-black text-xs rounded-xl shadow-xs shrink-0 active:scale-95 transition-all flex items-center gap-1"
            >
              <span>Buka Kampung</span>
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Hub Eksplorasi Khusus Gunung Qawa'id */}
        {selectedIsland.id === 'QWD' && onOpenPulauQawaidHub && (
          <div className="mb-3.5 bg-gradient-to-r from-blue-700 via-indigo-700 to-indigo-900 text-white p-3 rounded-2xl flex items-center justify-between gap-3 shadow-md border-2 border-blue-400">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">⛰️</span>
              <div>
                <h4 className="text-xs font-black">Pusat Gunung Qawa'id (Nahwu-Sharaf)</h4>
                <p className="text-[10px] text-blue-100">6 Pilar Nahwu, Lab Tashrif 7 Akar Kata & Jembatan Balok</p>
              </div>
            </div>
            <button
              onClick={onOpenPulauQawaidHub}
              className="px-3.5 py-1.5 bg-amber-300 hover:bg-amber-200 text-slate-950 font-black text-xs rounded-xl shadow-xs shrink-0 active:scale-95 transition-all flex items-center gap-1"
            >
              <span>Buka Gunung</span>
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Hub Eksplorasi Khusus Lembah Istima' */}
        {selectedIsland.id === 'IST' && onOpenPulauIstimaHub && (
          <div className="mb-3.5 bg-gradient-to-r from-purple-800 via-violet-800 to-indigo-900 text-white p-3 rounded-2xl flex items-center justify-between gap-3 shadow-md border-2 border-purple-400">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🎧</span>
              <div>
                <h4 className="text-xs font-black">Pusat Lembah Istima' (Mendengarkan)</h4>
                <p className="text-[10px] text-purple-200">Gua Pasangan Minimal, 5 Cerita Audio, Simulator Awamir & Detektif Suara</p>
              </div>
            </div>
            <button
              onClick={onOpenPulauIstimaHub}
              className="px-3.5 py-1.5 bg-amber-300 hover:bg-amber-200 text-slate-950 font-black text-xs rounded-xl shadow-xs shrink-0 active:scale-95 transition-all flex items-center gap-1"
            >
              <span>Buka Lembah</span>
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Hub Eksplorasi Khusus Perpustakaan Qira'ah */}
        {selectedIsland.id === 'QRA' && onOpenPulauQiraahHub && (
          <div className="mb-3.5 bg-gradient-to-r from-rose-800 via-red-700 to-amber-800 text-white p-3 rounded-2xl flex items-center justify-between gap-3 shadow-md border-2 border-rose-400">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">📖</span>
              <div>
                <h4 className="text-xs font-black">Pusat Perpustakaan Qira'ah (Membaca)</h4>
                <p className="text-[10px] text-rose-200">Scroll Tap-Gloss, Pohon Naskah Hikmah & Surat Sahabat Hudhud</p>
              </div>
            </div>
            <button
              onClick={onOpenPulauQiraahHub}
              className="px-3.5 py-1.5 bg-amber-300 hover:bg-amber-200 text-slate-950 font-black text-xs rounded-xl shadow-xs shrink-0 active:scale-95 transition-all flex items-center gap-1"
            >
              <span>Buka Perpustakaan</span>
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Hub Eksplorasi Khusus Pulau Kalam (Bicara) */}
        {selectedIsland.id === 'KLM' && onOpenPulauKalamHub && (
          <div className="mb-3.5 bg-gradient-to-r from-amber-600 via-orange-600 to-red-700 text-white p-3 rounded-2xl flex items-center justify-between gap-3 shadow-md border-2 border-amber-300">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🎙️</span>
              <div>
                <h4 className="text-xs font-black">Pusat Pulau Kalam (Bicara & Artikulasi)</h4>
                <p className="text-[10px] text-amber-100">Studio Makharijul Huruf, Mufradat Fasihah, Thalaqah & Mini-Game Makhraj Mastery</p>
              </div>
            </div>
            <button
              onClick={onOpenPulauKalamHub}
              className="px-3.5 py-1.5 bg-amber-300 hover:bg-amber-200 text-slate-950 font-black text-xs rounded-xl shadow-xs shrink-0 active:scale-95 transition-all flex items-center gap-1"
            >
              <span>Buka Pulau</span>
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Games Available in this Island */}
        <div>
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2 flex items-center justify-between">
            <span>Mini-Game di Pulau Ini:</span>
            <span className="text-teal-700 font-semibold">{islandGames.length} Game</span>
          </h4>

          <div className="space-y-2">
            {islandGames.map((game) => (
              <div
                key={game.id}
                onClick={() => onLaunchGame(game.id)}
                className="p-3 rounded-2xl border border-amber-200 hover:border-amber-400 bg-amber-50/50 hover:bg-amber-100/50 cursor-pointer transition-all flex items-center justify-between gap-2 shadow-2xs group active:scale-98"
              >
                <div>
                  <h5 className="font-bold text-xs text-slate-900 group-hover:text-amber-900">{game.name}</h5>
                  <p className="text-[11px] text-slate-500 mt-0.5">{game.mechanic}</p>
                </div>
                <button
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-xs shrink-0 flex items-center gap-1"
                >
                  <Play className="w-3.5 h-3.5 fill-slate-950" /> Main
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
