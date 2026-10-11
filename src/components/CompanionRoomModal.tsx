import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Star, Heart, Award, Feather, ArrowUpRight } from 'lucide-react';
import { sound } from '../services/sound';
import { GameStorage } from '../services/storage';
import { UserProfile, HudhudStage } from '../types/game';

interface CompanionRoomProps {
  profile: UserProfile;
  onClose: () => void;
  onUpdateProfile: (p: UserProfile) => void;
}

const STAGES_INFO: Record<HudhudStage, { name_ar: string; desc: string; icon: string }> = {
  Egg: { name_ar: 'بَيْضَة (Baydah)', desc: 'Telur misterius bermotif ornamen Arab yang retak saat bukti belajar dikumpulkan.', icon: '🥚' },
  Baby: { name_ar: 'كَتْكُوت (Katkut)', desc: 'Anak burung mungil berjambul tipis yang ceria menemani petualangan.', icon: '🐣' },
  Young: { name_ar: 'هُدْهُد شَاب (Hudhud Muda)', desc: 'Jambul mahkota penuh, sayap berpola huruf hijaiyah.', icon: '🪶' },
  Explorer: { name_ar: 'رَحَّال (Rahhal)', desc: 'Mengenakan tas pos petualang dan topi penjelajah pulau.', icon: '🧭' },
  Scribe: { name_ar: 'كَاتِب (Katib)', desc: 'Pena kalam di jambul, membawa gulungan naskah hikmah.', icon: '📜' },
  Guardian: { name_ar: 'حَارِس (Haris)', desc: 'Jubah pelindung megah dengan perisai kaligrafi bercahaya.', icon: '🛡️' },
  Master: { name_ar: 'أَدِيب (Adib)', desc: 'Mahkota cahaya gemerlap dengan aura tinta emas mutlak.', icon: '👑' },
};

const ROOM_DECORATIONS = [
  { id: 'lampu_maroko', name: 'Lentera Cahaya Fanous', emoji: '🏮', cost: 10 },
  { id: 'karpet_emas', name: 'Permadani Tenun Sutra', emoji: '🧶', cost: 15 },
  { id: 'pohon_kurma', name: 'Miniatur Pohon Kurma', emoji: '🌴', cost: 20 },
  { id: 'buku_hikmah', name: 'Meja Kaligrafi Kalam', emoji: '📚', cost: 25 },
];

export const CompanionRoomModal: React.FC<CompanionRoomProps> = ({ profile, onClose, onUpdateProfile }) => {
  const [petHappy, setPetHappy] = useState(false);
  const stage = STAGES_INFO[profile.hudhudStage];

  const handlePetHudhud = () => {
    sound.playSparkle();
    setPetHappy(true);
    setTimeout(() => setPetHappy(false), 1200);
  };

  const handleBuyDecoration = (dec: typeof ROOM_DECORATIONS[0]) => {
    if (profile.stars >= dec.cost && !profile.companionRoomDecorations.includes(dec.id)) {
      sound.playSuccess();
      const updated = {
        ...profile,
        stars: profile.stars - dec.cost,
        companionRoomDecorations: [...profile.companionRoomDecorations, dec.id]
      };
      GameStorage.saveProfile(updated);
      onUpdateProfile(updated);
    } else {
      sound.playGentleRetry();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-lg bg-gradient-to-b from-amber-50 to-orange-50 rounded-3xl shadow-2xl border-4 border-amber-300 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 via-amber-500 to-orange-500 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Feather className="w-6 h-6 text-yellow-300" />
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-200 block">Sahabat Setia Petualang</span>
              <h2 className="text-xl font-bold font-chibi">Kamar Companion: Hudhud</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white font-bold transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Room Area */}
        <div className="p-4 flex-1 overflow-y-auto space-y-4">
          {/* 3D/2.5D Living Room Stage */}
          <div className="relative bg-gradient-to-b from-teal-700 via-teal-800 to-amber-950 rounded-3xl p-6 text-center text-white border-2 border-amber-400 shadow-xl overflow-hidden min-h-[220px] flex flex-col items-center justify-between">
            {/* Ambient stars */}
            <div className="absolute top-3 left-4 flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-xs font-bold">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              <span>{profile.stars} Bintang Tersedia</span>
            </div>

            {/* Room Decorations applied */}
            <div className="absolute top-3 right-4 flex items-center gap-1 text-xl">
              {profile.companionRoomDecorations.map(decId => {
                const dec = ROOM_DECORATIONS.find(d => d.id === decId);
                return dec ? <span key={decId} title={dec.name}>{dec.emoji}</span> : null;
              })}
            </div>

            {/* Hudhud Character Animation */}
            <div className="my-auto relative cursor-pointer" onClick={handlePetHudhud}>
              <motion.div
                animate={petHappy ? { scale: [1, 1.25, 1], rotate: [0, -8, 8, 0] } : { y: [0, -6, 0] }}
                transition={petHappy ? { duration: 0.6 } : { repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                className="text-7xl select-none filter drop-shadow-[0_10px_10px_rgba(0,0,0,0.4)]"
              >
                {stage.icon}
              </motion.div>

              {petHappy && (
                <div className="absolute -top-3 -right-3 text-2xl animate-ping">
                  ❤️
                </div>
              )}
            </div>

            {/* Info and pet button */}
            <div className="w-full flex items-center justify-between bg-black/40 backdrop-blur-xs p-2.5 rounded-2xl border border-white/20">
              <div className="text-left">
                <h4 className="font-bold text-sm text-yellow-300 font-arabic">{stage.name_ar}</h4>
                <p className="text-[11px] text-white/80">{stage.desc}</p>
              </div>
              <button
                onClick={handlePetHudhud}
                className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-1 active:scale-95 shadow-md transition-all shrink-0 ml-2"
              >
                <Heart className="w-3.5 h-3.5 fill-red-600 text-red-600" /> Elus
              </button>
            </div>
          </div>

          {/* 5 Companion Traits (Bab 8.2 PDF) */}
          <div className="bg-white rounded-2xl p-4 border border-amber-200 shadow-xs">
            <h4 className="font-bold text-sm text-slate-800 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              5 Trait Perkembangan Hudhud
            </h4>

            <div className="space-y-2.5">
              {[
                { label: 'Lisan (لِسَان - Bicara & Percakapan)', val: profile.hudhudTraits.lisan, color: 'bg-emerald-500' },
                { label: 'Sam\' (سَمْع - Menyimak & Audio)', val: profile.hudhudTraits.sam, color: 'bg-purple-500' },
                { label: 'Qira\'ah (قِرَاءَة - Membaca Teks)', val: profile.hudhudTraits.qiraah, color: 'bg-rose-500' },
                { label: 'Kitabah (كِتَابَة - Ejaan & Tulisan)', val: profile.hudhudTraits.kitabah, color: 'bg-amber-500' },
                { label: 'Lughah (لُغَة - Kosakata & Kaidah)', val: profile.hudhudTraits.lughah, color: 'bg-blue-500' },
              ].map((trait, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-700">{trait.label}</span>
                    <span className="text-slate-900 font-bold">{trait.val}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                    <div
                      className={`h-full ${trait.color} transition-all duration-500 rounded-full`}
                      style={{ width: `${trait.val}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Room Decor Shop with Stars */}
          <div className="bg-white rounded-2xl p-4 border border-amber-200 shadow-xs">
            <h4 className="font-bold text-sm text-slate-800 mb-2 flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              Dekorasi Ruangan (Tukar dengan Bintang)
            </h4>

            <div className="grid grid-cols-2 gap-2 mt-2">
              {ROOM_DECORATIONS.map((dec) => {
                const isOwned = profile.companionRoomDecorations.includes(dec.id);
                const canAfford = profile.stars >= dec.cost;

                return (
                  <button
                    key={dec.id}
                    onClick={() => handleBuyDecoration(dec)}
                    disabled={isOwned || !canAfford}
                    className={`p-2.5 rounded-2xl border flex items-center justify-between text-left transition-all ${
                      isOwned
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                        : canAfford
                        ? 'bg-amber-50/50 border-amber-300 hover:bg-amber-100 text-slate-800'
                        : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{dec.emoji}</span>
                      <div>
                        <span className="font-bold text-xs block">{dec.name}</span>
                        <span className="text-[10px] text-slate-500">
                          {isOwned ? 'Sudah Dimiliki' : `${dec.cost} Bintang`}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
