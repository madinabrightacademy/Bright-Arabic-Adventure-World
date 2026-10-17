import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Trophy, ShieldCheck, Star, Sparkles, BookOpen, Crown, Heart, CheckCircle2, Award, Flame, Lock, ChevronRight, ArrowRight, Gift } from 'lucide-react';
import { UserProfile, RutbahType, IslandId } from '../types/game';
import { ISLANDS_DATA, LEXICON_DATA } from '../data/curriculum';
import { ACHIEVEMENTS_CATALOG, AchievementCategory, AchievementItem } from '../data/achievements';
import { sound } from '../services/sound';
import { GameStorage } from '../services/storage';
import { AchievementBadgeModal } from './AchievementBadgeModal';
import { LinguisticRadarChart } from './LinguisticRadarChart';
import { MascotCharacter } from './MascotCharacter';

interface ProfileViewProps {
  profile: UserProfile;
  onUpdateProfile: (p: UserProfile) => void;
  onOpenLeaderboard: () => void;
  onOpenParentDashboard: () => void;
  onOpenCompanionRoom: () => void;
  onChangeAudience: (aud: 'child' | 'adult') => void;
  onLaunchGame?: (gameId: string) => void;
  onNavigateLearn?: () => void;
  onOpenGlossary?: (tab?: 'difficult' | 'mastered' | 'all') => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile,
  onUpdateProfile,
  onOpenLeaderboard,
  onOpenParentDashboard,
  onOpenCompanionRoom,
  onChangeAudience,
  onLaunchGame,
  onNavigateLearn,
  onOpenGlossary
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'profile' | 'radar' | 'achievements' | 'words' | 'crystals'>('profile');
  const [selectedAchievementCat, setSelectedAchievementCat] = useState<AchievementCategory>('all');
  const [selectedBadgeModal, setSelectedBadgeModal] = useState<AchievementItem | null>(null);

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

  const handleClaimAchievement = (ach: AchievementItem) => {
    sound.playSuccess();
    sound.playSparkle();
    const existing = profile.achievements || [];
    if (!existing.includes(ach.id)) {
      const updated = {
        ...profile,
        xp: profile.xp + ach.rewardXp,
        stars: profile.stars + ach.rewardStars,
        achievements: [...existing, ach.id]
      };
      GameStorage.saveProfile(updated);
      onUpdateProfile(updated);
    }
  };

  const masteredLexemes = LEXICON_DATA.filter(l => profile.wordsMastered.includes(l.id));
  const unlockedCount = ACHIEVEMENTS_CATALOG.filter(a => a.isUnlocked(profile)).length;

  const featuredAchievements = [
    ACHIEVEMENTS_CATALOG.find(a => a.id === 'ach_streak_5') || ACHIEVEMENTS_CATALOG[13],
    ACHIEVEMENTS_CATALOG.find(a => a.id === 'ach_words_100') || ACHIEVEMENTS_CATALOG[4],
    ACHIEVEMENTS_CATALOG.find(a => a.id === 'ach_first_island') || ACHIEVEMENTS_CATALOG[0],
    ACHIEVEMENTS_CATALOG.find(a => a.id === 'ach_all_crystals') || ACHIEVEMENTS_CATALOG[6],
    ACHIEVEMENTS_CATALOG.find(a => a.id === 'ach_daily_missions_10') || ACHIEVEMENTS_CATALOG[16],
    ACHIEVEMENTS_CATALOG.find(a => a.id === 'ach_streak_7') || ACHIEVEMENTS_CATALOG[14],
  ].filter(Boolean) as AchievementItem[];

  const filteredAchievements = selectedAchievementCat === 'all'
    ? ACHIEVEMENTS_CATALOG
    : ACHIEVEMENTS_CATALOG.filter(a => a.category === selectedAchievementCat);

  return (
    <div className="space-y-4 pb-20 pt-2 px-3 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto">
      {/* Profile Header Card */}
      <div className="bg-gradient-to-r from-teal-700 via-teal-800 to-amber-800 rounded-3xl p-4 text-white shadow-md border-2 border-amber-300">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-2xl bg-amber-400 flex items-center justify-center shadow-md border-2 border-white/50 overflow-hidden shrink-0">
            <MascotCharacter
              type={profile.avatar === 'aira' ? 'amira' : 'zaki'}
              mood="cheer"
              size="sm"
              interactive={false}
              showHudhudTogether={false}
            />
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
          <span className="text-teal-100 font-semibold">Pilih Maskot Karakter:</span>
          <div className="flex gap-2">
            <button
              onClick={() => handleSelectAvatar('ari')}
              className={`px-3 py-1 rounded-xl font-bold transition-all cursor-pointer ${
                profile.avatar !== 'aira' ? 'bg-amber-400 text-slate-950 shadow-xs' : 'bg-white/20 text-white'
              }`}
            >
              👦 Zaki (Penjelajah)
            </button>
            <button
              onClick={() => handleSelectAvatar('aira')}
              className={`px-3 py-1 rounded-xl font-bold transition-all cursor-pointer ${
                profile.avatar === 'aira' ? 'bg-pink-400 text-slate-950 shadow-xs' : 'bg-white/20 text-white'
              }`}
            >
              👧 Amira (Penjelajah)
            </button>
          </div>
        </div>
      </div>

      {/* Sub Tabs: Profil, Radar 8 Pulau, Prestasi, Buku Kata, Kristal */}
      <div className="bg-white rounded-3xl p-1.5 border border-amber-200 shadow-xs flex gap-1 text-xs font-bold overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveSubTab('profile')}
          className={`px-3 py-2 rounded-2xl whitespace-nowrap transition-all ${
            activeSubTab === 'profile' ? 'bg-teal-700 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          👤 Ringkasan
        </button>
        <button
          onClick={() => setActiveSubTab('radar')}
          className={`px-3 py-2 rounded-2xl whitespace-nowrap transition-all ${
            activeSubTab === 'radar' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          📊 Radar 8 Pulau
        </button>
        <button
          onClick={() => setActiveSubTab('achievements')}
          className={`px-3 py-2 rounded-2xl whitespace-nowrap transition-all ${
            activeSubTab === 'achievements' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          🏆 Prestasi ({unlockedCount})
        </button>
        <button
          onClick={() => setActiveSubTab('words')}
          className={`px-3 py-2 rounded-2xl whitespace-nowrap transition-all ${
            activeSubTab === 'words' ? 'bg-amber-500 text-slate-950 shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          📖 Kata ({masteredLexemes.length})
        </button>
        <button
          onClick={() => setActiveSubTab('crystals')}
          className={`px-3 py-2 rounded-2xl whitespace-nowrap transition-all ${
            activeSubTab === 'crystals' ? 'bg-cyan-700 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          💎 Kristal
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
              onClick={() => setActiveSubTab('achievements')}
              className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-300 hover:border-amber-400 text-left transition-all active:scale-98 shadow-xs"
            >
              <Award className="w-5 h-5 text-amber-600 mb-1" />
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs text-slate-800">Prestasi & Lencana</h4>
                <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.2 rounded-md">
                  {unlockedCount}/{ACHIEVEMENTS_CATALOG.length}
                </span>
              </div>
              <p className="text-[10px] text-slate-500">Buka Lencana Milestone & Klaim Hadiah</p>
            </button>

            <button
              onClick={onOpenLeaderboard}
              className="p-3.5 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 hover:border-indigo-400 text-left transition-all active:scale-98 shadow-xs col-span-2 sm:col-span-1"
            >
              <Trophy className="w-5 h-5 text-indigo-600 mb-1" />
              <h4 className="font-bold text-xs text-slate-800">Papan Peringkat Liga</h4>
              <p className="text-[10px] text-slate-500">Total XP: {profile.xp} • Peringkat Aktif</p>
            </button>

            <button
              onClick={() => setActiveSubTab('radar')}
              className="p-3.5 rounded-2xl bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-300 hover:border-teal-400 text-left transition-all active:scale-98 shadow-xs col-span-2 sm:col-span-1"
            >
              <Sparkles className="w-5 h-5 text-teal-600 mb-1" />
              <h4 className="font-bold text-xs text-slate-800">Radar 8 Keterampilan</h4>
              <p className="text-[10px] text-slate-500">Analisis Kekuatan & Area Latihan</p>
            </button>
          </div>

          {/* =========================================================================
              DEDICATED ACHIEVEMENTS SYSTEM SECTION (ON MAIN PROFILE VIEW)
              - Highlights milestone badges: 5-Day Streak, Learned 100 Words, etc.
              - Visual progress meters, tier badges, and direct reward claim
             ========================================================================= */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-amber-300 shadow-md space-y-3.5">
            {/* Header with Title and "Lihat Semua" CTA */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-amber-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center text-xl shadow-xs border border-white">
                  🏆
                </div>
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h3 className="font-black text-sm text-slate-900 font-chibi">
                      Lencana Prestasi (Achievements)
                    </h3>
                    <span className="text-[10px] font-black bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.2 rounded-full">
                      {unlockedCount} / {ACHIEVEMENTS_CATALOG.length} Terbuka
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Buktikan dedikasi belajar dengan meraih milestone istimewa seperti 5-Day Streak & 100 Kosakata!
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveSubTab('achievements')}
                className="self-start sm:self-auto px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-black flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
              >
                <span>Lihat Semua ({ACHIEVEMENTS_CATALOG.length})</span>
                <ChevronRight className="w-3.5 h-3.5 text-amber-700" />
              </button>
            </div>

            {/* Overall Progress Strip */}
            <div className="bg-amber-50/70 p-3 rounded-2xl border border-amber-200/80 flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-bold text-slate-700">Koleksi Lencana Petualang:</span>
              </div>
              <div className="flex items-center gap-2 flex-1 max-w-xs">
                <div className="flex-1 bg-amber-200/60 h-2.5 rounded-full overflow-hidden p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-500"
                    style={{ width: `${(unlockedCount / ACHIEVEMENTS_CATALOG.length) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-black text-amber-900 shrink-0">
                  {Math.round((unlockedCount / ACHIEVEMENTS_CATALOG.length) * 100)}%
                </span>
              </div>
            </div>

            {/* Grid of Highlighted Milestone Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {featuredAchievements.map((ach) => {
                const isUnlocked = ach.isUnlocked(profile);
                const isClaimed = (profile.achievements || []).includes(ach.id);
                const currentVal = ach.currentProgress(profile);
                const progressPercent = Math.min(100, Math.round((currentVal / ach.target) * 100));

                return (
                  <div
                    key={ach.id}
                    onClick={() => setSelectedBadgeModal(ach)}
                    className={`p-3 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                      isUnlocked
                        ? isClaimed
                          ? 'bg-gradient-to-br from-white to-amber-50/40 border-amber-300 shadow-xs hover:border-amber-400'
                          : 'bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 border-amber-400 shadow-md ring-2 ring-amber-300/60'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300 opacity-80'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        {/* Medallion Icon */}
                        <div
                          className={`w-11 h-11 rounded-xl bg-gradient-to-br ${ach.badgeBg} border-2 ${ach.badgeBorder} flex items-center justify-center text-xl shadow-xs shrink-0 relative`}
                        >
                          <span>{ach.badgeIcon}</span>
                          {ach.badgeTier === 'diamond' && (
                            <span className="absolute -top-1 -right-1 text-[10px]">💎</span>
                          )}
                          {ach.badgeTier === 'gold' && (
                            <span className="absolute -top-1 -right-1 text-[10px]">👑</span>
                          )}
                        </div>

                        {/* Tier Label */}
                        <span
                          className={`text-[9px] font-black px-1.5 py-0.2 rounded-md uppercase tracking-wider ${
                            ach.badgeTier === 'diamond'
                              ? 'bg-purple-100 text-purple-900 border border-purple-200'
                              : ach.badgeTier === 'gold'
                              ? 'bg-amber-100 text-amber-900 border border-amber-200'
                              : ach.badgeTier === 'silver'
                              ? 'bg-slate-200 text-slate-800'
                              : 'bg-orange-100 text-orange-900'
                          }`}
                        >
                          {ach.badgeTier}
                        </span>
                      </div>

                      {/* Title & Arabic */}
                      <div className="mt-2">
                        <h4 className="font-black text-xs text-slate-900 leading-tight">
                          {ach.title}
                        </h4>
                        <span className="font-arabic text-[11px] font-bold text-amber-800 block mt-0.5">
                          {ach.titleAr}
                        </span>
                        <p className="text-[10px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                          {ach.description}
                        </p>
                      </div>
                    </div>

                    {/* Progress Bar & Status CTA */}
                    <div className="mt-3 pt-2 border-t border-slate-100/80">
                      <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 mb-1">
                        <span>Progres:</span>
                        <span className={isUnlocked ? 'text-emerald-700 font-black' : 'text-slate-600'}>
                          {currentVal} / {ach.target}
                        </span>
                      </div>

                      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mb-2">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isUnlocked
                              ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                              : 'bg-gradient-to-r from-amber-400 to-orange-500'
                          }`}
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>

                      {isUnlocked ? (
                        isClaimed ? (
                          <div className="py-1 px-2 rounded-lg bg-emerald-50 text-emerald-800 text-[10px] font-black flex items-center justify-center gap-1 border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>Dikoleksi (+{ach.rewardXp} XP)</span>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleClaimAchievement(ach);
                            }}
                            className="w-full py-1.5 px-2.5 rounded-lg bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 text-[10px] font-black shadow-xs flex items-center justify-center gap-1 animate-pulse active:scale-95 transition-all cursor-pointer"
                          >
                            <Sparkles className="w-3 h-3 fill-slate-950" />
                            <span>Klaim Hadiah (+{ach.rewardXp} XP)!</span>
                          </button>
                        )
                      ) : (
                        <div className="py-1 px-2 rounded-lg bg-slate-100 text-slate-500 text-[10px] font-bold flex items-center justify-center gap-1">
                          <Lock className="w-2.5 h-2.5" />
                          <span>Terkunci (Sisa {Math.max(0, ach.target - currentVal)})</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Radar Chart Component */}
          <LinguisticRadarChart
            profile={profile}
            onLaunchGame={onLaunchGame}
            onNavigateLearn={onNavigateLearn}
          />

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

      {/* Tab Content 2: Dedicated Radar 8 Pulau */}
      {activeSubTab === 'radar' && (
        <div className="space-y-3">
          <LinguisticRadarChart
            profile={profile}
            onLaunchGame={onLaunchGame}
            onNavigateLearn={onNavigateLearn}
          />
        </div>
      )}

      {/* Tab Content: Prestasi & Lencana (Achievements System) */}
      {activeSubTab === 'achievements' && (
        <div className="space-y-3">
          {/* Progress Header Card */}
          <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-4 text-white shadow-md border-2 border-amber-300 space-y-2.5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-amber-200 uppercase tracking-widest block">
                  Galeri Penghargaan Petualang
                </span>
                <h3 className="text-base font-black flex items-center gap-1.5">
                  <Award className="w-5 h-5 text-amber-200" />
                  <span>Sistem Prestasi & Lencana</span>
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs font-black bg-amber-400 text-slate-950 px-2.5 py-1 rounded-full shadow-xs">
                  {unlockedCount} / {ACHIEVEMENTS_CATALOG.length} Terbuka
                </span>
              </div>
            </div>

            {/* Total Completion Progress Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-bold text-amber-100">
                <span>Kelengkapan Koleksi Lencana:</span>
                <span>{Math.round((unlockedCount / ACHIEVEMENTS_CATALOG.length) * 100)}%</span>
              </div>
              <div className="w-full h-2.5 bg-black/30 rounded-full overflow-hidden p-0.5 border border-white/20">
                <div
                  className="h-full bg-gradient-to-r from-yellow-300 to-amber-200 rounded-full transition-all duration-500"
                  style={{ width: `${(unlockedCount / ACHIEVEMENTS_CATALOG.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Tiers Legend */}
            <div className="pt-1 border-t border-white/20 flex items-center justify-between text-[10px] text-amber-100">
              <span className="flex items-center gap-1">🥉 Perunggu</span>
              <span className="flex items-center gap-1">🥈 Perak</span>
              <span className="flex items-center gap-1">🥇 Emas</span>
              <span className="flex items-center gap-1 font-bold text-white">💎 Berlian</span>
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="bg-white rounded-2xl p-1.5 border border-amber-200 shadow-2xs flex gap-1 overflow-x-auto text-[11px] font-bold">
            {[
              { id: 'all', label: 'Semua Lencana' },
              { id: 'words', label: 'Milestone Kata (10–100)' },
              { id: 'islands', label: 'Eksplorasi Pulau' },
              { id: 'skills', label: 'Keahlian Lisan & Tulis' },
              { id: 'milestones', label: 'Spesial & Streak' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedAchievementCat(tab.id as AchievementCategory)}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                  selectedAchievementCat === tab.id
                    ? 'bg-amber-600 text-white shadow-xs font-black'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Achievements Grid */}
          <div className="space-y-2.5">
            {filteredAchievements.map((ach) => {
              const isUnlocked = ach.isUnlocked(profile);
              const isClaimed = (profile.achievements || []).includes(ach.id);
              const progress = Math.min(ach.target, ach.currentProgress(profile));
              const percent = Math.min(100, Math.round((progress / ach.target) * 100));

              return (
                <div
                  key={ach.id}
                  onClick={() => setSelectedBadgeModal(ach)}
                  className={`p-3.5 rounded-3xl border-2 transition-all relative overflow-hidden cursor-pointer hover:scale-[1.01] ${
                    isUnlocked
                      ? isClaimed
                        ? 'border-amber-300 bg-white shadow-xs'
                        : 'border-amber-400 bg-gradient-to-r from-amber-50 to-yellow-50 shadow-md ring-2 ring-amber-300/60'
                      : 'border-slate-200 bg-slate-50/80 opacity-75'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Decorative Badge Crest */}
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${ach.badgeBg} border-2 ${ach.badgeBorder} flex items-center justify-center text-2xl shadow-md shrink-0 relative`}
                    >
                      <span>{ach.badgeIcon}</span>
                      {ach.badgeTier === 'diamond' && (
                        <div className="absolute -top-1.5 -right-1.5 text-xs animate-bounce">
                          💎
                        </div>
                      )}
                      {ach.badgeTier === 'gold' && (
                        <div className="absolute -top-1.5 -right-1.5 text-xs">
                          👑
                        </div>
                      )}
                    </div>

                    {/* Badge Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h4 className="font-black text-xs text-slate-900 leading-snug">{ach.title}</h4>
                            <span
                              className={`text-[9px] font-black px-1.5 py-0.2 rounded-md uppercase ${
                                ach.badgeTier === 'diamond'
                                  ? 'bg-purple-100 text-purple-900'
                                  : ach.badgeTier === 'gold'
                                  ? 'bg-amber-100 text-amber-900'
                                  : ach.badgeTier === 'silver'
                                  ? 'bg-slate-200 text-slate-800'
                                  : 'bg-orange-100 text-orange-900'
                              }`}
                            >
                              {ach.badgeTier}
                            </span>
                          </div>
                          <span className="font-arabic text-xs font-bold text-amber-800 block mt-0.5">
                            {ach.titleAr}
                          </span>
                        </div>

                        {/* Claim or Status Badge */}
                        <div>
                          {isUnlocked ? (
                            isClaimed ? (
                              <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                                <CheckCircle2 className="w-3 h-3" /> Diklaim
                              </span>
                            ) : (
                              <button
                                onClick={() => handleClaimAchievement(ach)}
                                className="px-2.5 py-1 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 font-black text-[10px] rounded-xl shadow-md active:scale-95 transition-all flex items-center gap-1 animate-pulse"
                              >
                                <Sparkles className="w-3 h-3 text-slate-950" />
                                <span>Klaim +{ach.rewardXp} XP</span>
                              </button>
                            )
                          ) : (
                            <span className="text-[10px] font-bold text-slate-400 bg-slate-200/60 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Lock className="w-2.5 h-2.5" /> Terkunci
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                        {ach.description}
                      </p>

                      {/* Progress Bar & Counter */}
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center justify-between text-[10px] font-bold">
                          <span className="text-slate-500">
                            Kemajuan: {progress} / {ach.target}
                          </span>
                          <span className={isUnlocked ? 'text-emerald-600 font-extrabold' : 'text-slate-400'}>
                            {percent}%
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              isUnlocked ? 'bg-emerald-500' : 'bg-amber-500'
                            }`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab Content 2: Buku Koleksi Kata & Buku Kata Sulit */}
      {activeSubTab === 'words' && (
        <div className="space-y-3">
          {/* Featured Glosarium Modal Banner */}
          <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 rounded-3xl p-4 text-white shadow-md border-2 border-amber-300 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-2xl">
                📚
              </div>
              <div>
                <h4 className="font-bold text-sm text-white font-chibi">
                  Glosarium & Kamus Lengkap
                </h4>
                <p className="text-[11px] text-amber-100">
                  Pelafalan audio fasih, analisis makhraj & kalimat konteks
                </p>
              </div>
            </div>

            {onOpenGlossary && (
              <button
                onClick={() => onOpenGlossary('difficult')}
                className="px-3.5 py-2 rounded-2xl bg-white text-orange-950 font-black text-xs shadow-sm hover:bg-amber-100 active:scale-95 transition-all whitespace-nowrap"
              >
                Buka Glosarium 🚀
              </button>
            )}
          </div>

          {/* Buku Kata Sulit Mini-Game (Perlu Pemantapan) */}
          <div className="bg-white rounded-3xl p-4 border border-rose-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wide">
                  Kata Sulit dari Mini-Game (Perlu Dilatih):
                </h4>
              </div>
              <span className="text-xs bg-rose-100 text-rose-800 font-extrabold px-2 py-0.5 rounded-full">
                {profile.difficultWords.length} Item
              </span>
            </div>

            {profile.difficultWords.length > 0 ? (
              <div className="space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {profile.difficultWords.map((id) => {
                    const lex = LEXICON_DATA.find((l) => l.id === id);
                    if (!lex) return null;
                    return (
                      <div
                        key={id}
                        className="p-2.5 rounded-2xl bg-rose-50/70 border border-rose-200 flex items-center justify-between gap-2 shadow-2xs"
                      >
                        <div>
                          <span className="text-xs font-bold text-slate-800 block">
                            {lex.gloss_id}
                          </span>
                          <span className="text-[10px] text-slate-500">{lex.translit}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-arabic text-xl font-bold text-rose-900">
                            {lex.ar_vocalized}
                          </span>
                          <button
                            onClick={() => sound.speakArabic(lex.ar_vocalized)}
                            className="p-1 rounded-lg bg-rose-200/80 text-rose-900 hover:bg-rose-300 text-xs"
                            title="Dengarkan Suara"
                          >
                            🔊
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {onOpenGlossary && (
                  <button
                    onClick={() => onOpenGlossary('difficult')}
                    className="w-full py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-95"
                  >
                    <span>🎯 Latih Kata Sulit dengan Kuis & Flashcard</span>
                  </button>
                )}
              </div>
            ) : (
              <p className="text-xs text-emerald-600 font-medium italic text-center py-2">
                ✨ Alhamdulillah! Belum ada kata sulit saat ini. Semua kosakata berjalan lancar!
              </p>
            )}
          </div>

          {/* Stiker Kosakata yang Dikuasai */}
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

      {/* Visual Achievement Badge Award Modal */}
      {selectedBadgeModal && (
        <AchievementBadgeModal
          achievement={selectedBadgeModal}
          profile={profile}
          onClose={() => setSelectedBadgeModal(null)}
          onClaim={(ach) => {
            handleClaimAchievement(ach);
            setSelectedBadgeModal({ ...ach });
          }}
        />
      )}
    </div>
  );
};
