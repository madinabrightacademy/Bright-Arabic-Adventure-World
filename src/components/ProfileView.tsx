import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Trophy, ShieldCheck, Star, Sparkles, BookOpen, Crown, Heart, CheckCircle2 } from 'lucide-react';
import { UserProfile, RutbahType, IslandId } from '../types/game';
import { ISLANDS_DATA, LEXICON_DATA } from '../data/curriculum';
import { sound } from '../services/sound';
import { GameStorage } from '../services/storage';

interface ProfileViewProps {
  profile: UserProfile;
  onUpdateProfile: (p: UserProfile) => void;
  onOpenLeaderboard: () => void;
  onOpenParentDashboard: () => void;
  onOpenCompanionRoom: () => void;
  onChangeAudience: (aud: 'child' | 'adult') => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile,
  onUpdateProfile,
  onOpenLeaderboard,
  onOpenParentDashboard,
  onOpenCompanionRoom,
  onChangeAudience
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'profile' | 'words' | 'crystals'>('profile');

  const rutbahDetails: Record<RutbahType, { name_ar: string; desc: string; rights: string }> = {
    Musafir: { name_ar: 'مُسَافِر', desc: 'Jaket petualang, ransel kosong siap menjelajah.', rights: 'Peta Kepulauan, 4 pulau pertama' },
    Thalib: { name_ar: 'طَالِب', desc: 'Ransel bercahaya berisi buku naskah, lencana huruf.', rights: 'Gunung Qawa\'id, Qira\'ah & Kitabah terbuka' },
    Rahhal: { name_ar: 'رَحَّال', desc: 'Jubah perjalanan, kompas kata penunjuk arah.', rights: 'Skenario Hiwar luar rumah, kapal antar pulau' },
    Qari: { name_ar: 'قَارِئ', desc: 'Kacamata hikmah, gulungan naskah bacaan mulia.', rights: 'Perpustakaan naskah lanjutan' },
    Katib: { name_ar: 'كَاتِب', desc: 'Pena kalam bercahaya, jubah tinta kaligrafi.', rights: 'Studio kaligrafi emas & surat resmi' },
    Adib: { name_ar: 'أَدِيب', desc: 'Mahkota sastra, jubah emas mutlak.', rights: 'Aula sastra, dialek Arab & mentor' },
  };

  const handleSelectAvatar = (av: 'ari' | 'aira') => {
    sound.playSparkle();
    const updated = { ...profile, avatar: av };
    GameStorage.saveProfile(updated);
    onUpdateProfile(updated);
  };

  const masteredLexemes = LEXICON_DATA.filter(l => profile.wordsMastered.includes(l.id));

  return (
    <div className="space-y-4 pb-20 pt-2 px-3 max-w-xl mx-auto">
      {/* Profile Header Card */}
      <div className="bg-gradient-to-r from-teal-700 via-teal-800 to-amber-800 rounded-3xl p-4 text-white shadow-md border-2 border-amber-300">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-2xl bg-amber-400 text-3xl flex items-center justify-center shadow-md border-2 border-white/50">
            {profile.avatar === 'ari' ? '👦' : profile.avatar === 'aira' ? '👧' : '🧒'}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold font-chibi leading-none">{profile.name}</h2>
              <span className="text-xs bg-amber-400 text-amber-950 font-black px-2 py-0.5 rounded-full">
                {profile.rutbah}
              </span>
            </div>
            <p className="font-arabic text-sm text-amber-200 mt-0.5">
              رُتْبَةُ: {rutbahDetails[profile.rutbah].name_ar}
            </p>
            <p className="text-[11px] text-teal-100 mt-0.5">
              Hak Terbuka: {rutbahDetails[profile.rutbah].rights}
            </p>
          </div>
        </div>

        {/* Avatar Character Switcher */}
        <div className="mt-3 pt-3 border-t border-white/20 flex items-center justify-between text-xs">
          <span className="text-teal-100 font-semibold">Pilih Karakter Tokoh:</span>
          <div className="flex gap-2">
            <button
              onClick={() => handleSelectAvatar('ari')}
              className={`px-3 py-1 rounded-xl font-bold transition-all ${
                profile.avatar === 'ari' ? 'bg-amber-400 text-slate-950 shadow-xs' : 'bg-white/20 text-white'
              }`}
            >
              Ari (Penjelajah) 👦
            </button>
            <button
              onClick={() => handleSelectAvatar('aira')}
              className={`px-3 py-1 rounded-xl font-bold transition-all ${
                profile.avatar === 'aira' ? 'bg-teal-400 text-slate-950 shadow-xs' : 'bg-white/20 text-white'
              }`}
            >
              Aira (Pemandu) 👧
            </button>
          </div>
        </div>
      </div>

      {/* Sub Tabs: Profil, Buku Kata, Kristal */}
      <div className="bg-white rounded-3xl p-1.5 border border-amber-200 shadow-xs flex gap-1 text-xs font-bold">
        <button
          onClick={() => setActiveSubTab('profile')}
          className={`flex-1 py-2 rounded-2xl transition-all ${
            activeSubTab === 'profile' ? 'bg-teal-700 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          👤 Ringkasan Profil
        </button>
        <button
          onClick={() => setActiveSubTab('words')}
          className={`flex-1 py-2 rounded-2xl transition-all ${
            activeSubTab === 'words' ? 'bg-amber-500 text-slate-950 shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          📖 Buku Kata ({masteredLexemes.length})
        </button>
        <button
          onClick={() => setActiveSubTab('crystals')}
          className={`flex-1 py-2 rounded-2xl transition-all ${
            activeSubTab === 'crystals' ? 'bg-cyan-700 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          💎 Lemari Kristal
        </button>
      </div>

      {/* Tab Content 1: Profil & Pengaturan */}
      {activeSubTab === 'profile' && (
        <div className="space-y-3">
          {/* Quick Access Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={onOpenCompanionRoom}
              className="p-3.5 rounded-2xl bg-gradient-to-br from-teal-50 to-amber-50 border border-teal-200 hover:border-teal-400 text-left transition-all active:scale-98 shadow-xs"
            >
              <Heart className="w-5 h-5 text-teal-600 mb-1" />
              <h4 className="font-bold text-xs text-slate-800">Kamar Hudhud</h4>
              <p className="text-[10px] text-slate-500">Tahap: {profile.hudhudStage} • Bintang: {profile.stars}</p>
            </button>

            <button
              onClick={onOpenLeaderboard}
              className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 hover:border-amber-400 text-left transition-all active:scale-98 shadow-xs"
            >
              <Trophy className="w-5 h-5 text-amber-600 mb-1" />
              <h4 className="font-bold text-xs text-slate-800">Papan Peringkat Liga</h4>
              <p className="text-[10px] text-slate-500">Total XP: {profile.xp} • Peringkat Aktif</p>
            </button>
          </div>

          {/* Audience mode selector */}
          <div className="bg-white rounded-3xl p-4 border border-amber-200 shadow-sm">
            <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wide mb-2">
              Jalur Pembelajaran:
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => onChangeAudience('child')}
                className={`p-3 rounded-2xl border-2 text-left transition-all ${
                  profile.audience === 'child'
                    ? 'border-amber-400 bg-amber-50 text-amber-950 font-bold'
                    : 'border-slate-200 text-slate-600'
                }`}
              >
                <span className="text-base block mb-0.5">🎈 Jalur Anak (6–12 Thn)</span>
                <span className="text-[10px] text-slate-500 font-normal">Chibi, warna cerah, harakat penuh, companion wajib.</span>
              </button>

              <button
                onClick={() => onChangeAudience('adult')}
                className={`p-3 rounded-2xl border-2 text-left transition-all ${
                  profile.audience === 'adult'
                    ? 'border-teal-600 bg-teal-50 text-teal-950 font-bold'
                    : 'border-slate-200 text-slate-600'
                }`}
              >
                <span className="text-base block mb-0.5">💼 Jalur Dewasa (13+ Thn)</span>
                <span className="text-[10px] text-slate-500 font-normal">Konteks ibadah/kerja, harakat bertahap, UI tenang.</span>
              </button>
            </div>
          </div>

          {/* Protected Parent Dashboard Button */}
          {profile.audience === 'child' && (
            <button
              onClick={onOpenParentDashboard}
              className="w-full p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs flex items-center justify-between shadow-md active:scale-98 transition-all"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <div className="text-left">
                  <span>Dashboard Orang Tua & Pendidik</span>
                  <span className="text-[10px] text-slate-400 block font-normal">Dilindungi PIN keamanan anak</span>
                </div>
              </div>
              <span className="text-xs bg-white/20 px-2 py-1 rounded-xl">Buka PIN 🔒</span>
            </button>
          )}
        </div>
      )}

      {/* Tab Content 2: Buku Koleksi Kata (Stiker 3D) */}
      {activeSubTab === 'words' && (
        <div className="bg-white rounded-3xl p-4 border border-amber-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wide">
              Stiker Kosakata yang Dikuasai:
            </h4>
            <span className="text-xs bg-amber-100 text-amber-900 font-extrabold px-2 py-0.5 rounded-full">
              {masteredLexemes.length} Koleksi
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {masteredLexemes.map((lex) => (
              <div
                key={lex.id}
                onClick={() => sound.speakArabic(lex.ar_vocalized)}
                className="p-2.5 rounded-2xl bg-amber-50/60 border border-amber-200 hover:border-amber-400 cursor-pointer transition-all flex items-center justify-between gap-2 shadow-2xs"
                title="Ketuk untuk dengar suara"
              >
                <div>
                  <span className="text-xs font-bold text-slate-800 block">{lex.gloss_id}</span>
                  <span className="text-[10px] text-slate-500">{lex.translit}</span>
                </div>
                <span className="font-arabic text-xl font-bold text-teal-800">{lex.ar_vocalized}</span>
              </div>
            ))}
          </div>

          {masteredLexemes.length === 0 && (
            <p className="text-xs text-slate-500 text-center py-4 italic">
              Belum ada kosakata yang dikuasai. Mainkan Floating Market Quest atau sesi belajar untuk menambah koleksi!
            </p>
          )}
        </div>
      )}

      {/* Tab Content 3: Lemari 8 Kristal Pengetahuan */}
      {activeSubTab === 'crystals' && (
        <div className="bg-white rounded-3xl p-4 border border-amber-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wide">
              Lemari 8 Kristal Pengetahuan (Knowledge Crystals):
            </h4>
            <span className="text-xs bg-cyan-100 text-cyan-900 font-extrabold px-2 py-0.5 rounded-full">
              {Object.values(profile.crystals).filter(Boolean).length}/8 Kristal
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {ISLANDS_DATA.map((isl) => {
              const hasGem = profile.crystals[isl.id];

              return (
                <div
                  key={isl.id}
                  className={`p-3 rounded-2xl border-2 flex items-center gap-2.5 transition-all ${
                    hasGem
                      ? 'border-amber-300 bg-gradient-to-br from-amber-50 to-teal-50 shadow-xs'
                      : 'border-slate-200 bg-slate-50 opacity-60'
                  }`}
                >
                  <div className="text-2xl">{hasGem ? '💎' : '🔒'}</div>
                  <div>
                    <span className="font-bold text-xs text-slate-900 block">{isl.crystalName}</span>
                    <span className="text-[10px] text-slate-500">{isl.name_id.split(' ')[0]}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
