import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  CheckCircle2,
  Lock,
  Play,
  Volume2,
  BookOpen,
  Award,
  ChevronRight,
  Compass,
  ArrowRight,
  Zap,
  Shield,
  Layers,
  Crown
} from 'lucide-react';
import { UserProfile, SkillItem, IslandId } from '../types/game';
import { SKILLS_DATA, LEXICON_DATA, ISLANDS_DATA, GAMES_CATALOG } from '../data/curriculum';
import { sound } from '../services/sound';
import {
  getFriendlyLevel,
  getFriendlyIslandName,
  FRIENDLY_LEVELS,
  FriendlyLevelInfo
} from '../data/skillPedagogy';

interface SkillTreeViewProps {
  profile: UserProfile;
  activeSkillId?: string;
  onSelectSkill: (skillId: string) => void;
  onLaunchGame: (gameId: string) => void;
}

export interface HierarchyTier {
  level: number;
  code: string;
  cefr: string;
  titleAr: string;
  titleId: string;
  subtitle: string;
  rutbahTarget: string;
  hudhudEvolution: string;
  colorGrad: string;
  borderCol: string;
  badgeBg: string;
  accentCol: string;
  icon: string;
  pedagogicalFocus: string;
}

export const LINGUISTIC_TIERS: HierarchyTier[] = [
  {
    level: 0,
    code: 'Tingkat 1',
    cefr: 'Tingkat Pemula: Fondasi Awal',
    titleAr: 'المَرْحَلَةُ التَّمْهِيدِيَّة',
    titleId: 'Tingkat 1: Pemula (Tamhidi)',
    subtitle: 'Fondasi Fonetik, Huruf Hijaiyah & Artikulasi Makhraj',
    rutbahTarget: 'Musafir (Penjelajah Pemula)',
    hudhudEvolution: 'Katkut Mungil (Anak Burung)',
    colorGrad: 'from-teal-600 via-cyan-600 to-teal-800',
    borderCol: 'border-teal-400',
    badgeBg: 'bg-teal-500',
    accentCol: 'text-teal-400',
    icon: '🐚',
    pedagogicalFocus: 'Mengenal 28 huruf hijaiyah, bunyi murni vokal, harakat dasar (a, i, u), makharijul huruf tenggorokan & lidah, serta jejak goresan pasir.'
  },
  {
    level: 1,
    code: 'Tingkat 2',
    cefr: 'Tingkat Dasar: Kata & Ejaan Inti',
    titleAr: 'المَرْحَلَةُ الِابْتِدَائِيَّة',
    titleId: 'Tingkat 2: Dasar (Mubtadi\')',
    subtitle: 'Bentuk Sambung, Kosakata Inti & Imla\' Awal',
    rutbahTarget: 'Thalib (Penuntut Ilmu)',
    hudhudEvolution: 'Hudhud Muda Bersayap Huruf',
    colorGrad: 'from-amber-600 via-orange-600 to-yellow-700',
    borderCol: 'border-amber-400',
    badgeBg: 'bg-amber-500',
    accentCol: 'text-amber-400',
    icon: '🛶',
    pedagogicalFocus: 'Bentuk huruf sambung (posisi awal, tengah, akhir), 6 huruf pemutus kiri (ا د ذ ر ز و), kosakata tematik pasar, sapaan santun ta\'aruf, dan ejaan ta marbuthah.'
  },
  {
    level: 2,
    code: 'Tingkat 3',
    cefr: 'Tingkat Menengah: Struktur Kalimat',
    titleAr: 'المَرْحَلَةُ الأَسَاسِيَّة',
    titleId: 'Tingkat 3: Menengah (Asasi)',
    subtitle: 'Susunan Kalimat, Tata Bahasa (Nahwu) & Menyimak',
    rutbahTarget: 'Rahhal (Penjelajah Fasih)',
    hudhudEvolution: 'Rahhal Berkompas Kata',
    colorGrad: 'from-blue-600 via-indigo-600 to-blue-800',
    borderCol: 'border-blue-400',
    badgeBg: 'bg-blue-500',
    accentCol: 'text-blue-400',
    icon: '⛰️',
    pedagogicalFocus: 'Kaidah mudzakkar & muannats, kata tunjuk (هٰذا / هٰذِهِ), susunan kalimat ismiyyah & fi\'liyyah dasar, preposisi jar-majrur, dan menyimak audio interaktif penutur asli.'
  },
  {
    level: 3,
    code: 'Tingkat 4',
    cefr: 'Tingkat Lanjutan: Teks Mandiri & Morfologi',
    titleAr: 'المَرْحَلَةُ المُتَوَسِّطَة',
    titleId: 'Tingkat 4: Lanjutan (Mutawassith)',
    subtitle: 'Teks Mandiri, Perubahan Kata (Sharaf) & Kelancaran',
    rutbahTarget: 'Qari & Katib (Pembaca & Penulis)',
    hudhudEvolution: 'Katib Berjambul Kalam',
    colorGrad: 'from-purple-600 via-violet-700 to-indigo-900',
    borderCol: 'border-purple-400',
    badgeBg: 'bg-purple-500',
    accentCol: 'text-purple-400',
    icon: '📜',
    pedagogicalFocus: 'Membaca naskah bergambar mandiri (Scroll Tap-Gloss), mesin perubahan kata kerja (Tashrif Lab), kelancaran bertutur (thalaqah kalam), dan penulisan korespondensi.'
  },
  {
    level: 4,
    code: 'Tingkat 5',
    cefr: 'Tingkat Mahir: Ujian Terpadu 4 Keterampilan',
    titleAr: 'مَرْحَلَةُ الإِتْقَانِ وَالمَعْبَد',
    titleId: 'Tingkat 5: Mahir (Adib)',
    subtitle: 'Ujian Terpadu 4 Keterampilan & Mahkota Kepulauan',
    rutbahTarget: 'Adib Agung (Pujangga Bermahkota)',
    hudhudEvolution: 'Adib Agung Bermahkota Emas',
    colorGrad: 'from-amber-400 via-yellow-500 to-amber-700',
    borderCol: 'border-yellow-300',
    badgeBg: 'bg-yellow-500',
    accentCol: 'text-yellow-300',
    icon: '👑',
    pedagogicalFocus: 'Ujian Mihrab Kuil Langit: Evaluasi terpadu Menyimak, Berbicara, Membaca, dan Menulis untuk menamatkan seluruh 8 Kepulauan.'
  }
];

export const SkillTreeView: React.FC<SkillTreeViewProps> = ({
  profile,
  activeSkillId,
  onSelectSkill,
  onLaunchGame
}) => {
  const [selectedIslandFilter, setSelectedIslandFilter] = useState<string>('ALL');
  const [activeTierLevel, setActiveTierLevel] = useState<number | null>(null);

  // Filter skills based on island filter
  const filteredSkills = SKILLS_DATA.filter(skill => {
    if (selectedIslandFilter === 'ALL') return true;
    return skill.owner_island === selectedIslandFilter;
  });

  // Map island to its primary mini-game
  const getIslandGameId = (islandId: IslandId): string => {
    switch (islandId) {
      case 'HRF': return 'sand_trace';
      case 'MFR': return 'floating_market';
      case 'HWR': return 'dialog_quest';
      case 'QWD': return 'sentence_bridge';
      case 'IST': return 'echo_cave';
      case 'QRA': return 'scroll_tap_gloss';
      case 'KTB': return 'imla_lighthouse';
      case 'KLM': return 'makhraj_mastery';
      case 'TMH': return 'mihrab_gate';
      default: return 'sand_trace';
    }
  };

  const getSkillStatus = (skill: SkillItem): 'mastered' | 'available' | 'locked' => {
    if (profile.skillsMastered.includes(skill.skill_id)) {
      return 'mastered';
    }
    if (skill.level <= profile.level + 1) {
      return 'available';
    }
    return 'locked';
  };

  return (
    <div className="space-y-4">
      {/* Linguistic Mastery Hierarchy Banner (Clear, friendly, zero cryptic jargon) */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-4 border-2 border-amber-300 shadow-xl relative overflow-hidden">
        <div className="absolute top-1 right-2 text-2xl opacity-20 pointer-events-none">✨</div>
        <div className="absolute bottom-1 left-3 text-xl opacity-20 pointer-events-none">🌟</div>

        <div className="flex items-center justify-between mb-3 relative z-10">
          <div>
            <span className="text-[10px] font-black tracking-widest uppercase text-amber-300 bg-amber-400/20 px-2.5 py-0.5 rounded-full border border-amber-300/30">
              Hirarki Kemahiran Bahasa Arab
            </span>
            <h3 className="text-base font-black font-chibi mt-1 flex items-center gap-1.5">
              <span>Pohon Kemahiran Belajar</span>
              <span>🌳</span>
            </h3>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-300 block">Tingkat Kemahiran:</span>
            <span className="text-xs font-black text-amber-400 bg-black/40 px-3 py-1 rounded-full border border-amber-400/40 inline-block">
              {getFriendlyLevel(profile.level).fullTitle}
            </span>
          </div>
        </div>

        {/* 5-Stage Stepper Ribbon */}
        <div className="grid grid-cols-5 gap-1 pt-1 relative z-10">
          {LINGUISTIC_TIERS.map((tier) => {
            const isCompleted = profile.level > tier.level;
            const isCurrent = profile.level === tier.level;
            const isNext = tier.level === profile.level + 1;

            return (
              <button
                key={tier.level}
                onClick={() => setActiveTierLevel(activeTierLevel === tier.level ? null : tier.level)}
                className={`flex flex-col items-center p-1.5 rounded-2xl transition-all border text-center cursor-pointer ${
                  isCurrent
                    ? 'bg-amber-400/25 border-amber-300 shadow-md ring-2 ring-amber-400/50 scale-102'
                    : isCompleted
                    ? 'bg-emerald-500/20 border-emerald-400/60 text-emerald-200'
                    : isNext
                    ? 'bg-white/10 border-white/20 text-slate-300'
                    : 'bg-black/30 border-white/5 opacity-50'
                }`}
              >
                <div className="text-base mb-0.5">
                  {isCompleted ? '✓' : tier.icon}
                </div>
                <span className="text-[10px] font-black leading-none">{tier.code}</span>
                <span className="text-[8px] opacity-80 truncate mt-0.5 max-w-[55px]">
                  {tier.titleId.split(':')[1]?.trim().split(' ')[0] || tier.titleId}
                </span>
              </button>
            );
          })}
        </div>

        {/* Progress summary stats */}
        <div className="flex items-center justify-between text-[11px] text-slate-300 mt-3 pt-2.5 border-t border-white/10">
          <span>Modul Selesai: <strong className="text-emerald-400">{profile.skillsMastered.length}</strong> Unit</span>
          <span>Gelar Petualang: <strong className="text-amber-300">{profile.rutbah}</strong></span>
        </div>
      </div>

      {/* Island Filter Tabs (Filter per Pulau dengan Nama Lengkap Jelas) */}
      <div className="bg-white rounded-3xl p-3 border border-amber-200 shadow-xs">
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-amber-600" />
            Filter Berdasarkan Pulau:
          </span>
          <span className="text-[10px] text-slate-500 font-semibold">
            {selectedIslandFilter === 'ALL' ? 'Semua 8 Pulau' : getFriendlyIslandName(selectedIslandFilter as IslandId).fullName}
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs font-bold">
          <button
            onClick={() => setSelectedIslandFilter('ALL')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              selectedIslandFilter === 'ALL'
                ? 'bg-slate-900 text-white shadow-xs font-black'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Semua Pulau 🌐
          </button>

          {ISLANDS_DATA.map((isl) => {
            const isSelected = selectedIslandFilter === isl.id;
            const friendly = getFriendlyIslandName(isl.id);

            return (
              <button
                key={isl.id}
                onClick={() => setSelectedIslandFilter(isl.id)}
                className={`px-2.5 py-1.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1 cursor-pointer ${
                  isSelected
                    ? `${isl.badgeBg} text-white shadow-xs font-black ring-2 ring-white/50`
                    : 'bg-amber-50 hover:bg-amber-100 text-slate-800 border border-amber-200/60'
                }`}
              >
                <span>{friendly.icon}</span>
                <span>{friendly.shortName}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Visual Skill Tree - Grouped by 5 Tiers */}
      <div className="space-y-6">
        {LINGUISTIC_TIERS.map((tier, tierIdx) => {
          const tierSkills = filteredSkills.filter(s => s.level === tier.level);
          if (tierSkills.length === 0 && selectedIslandFilter !== 'ALL') return null;

          const isCurrentTier = profile.level === tier.level;

          return (
            <div key={tier.level} className="relative">
              {tierIdx < LINGUISTIC_TIERS.length - 1 && (
                <div className="absolute left-8 -bottom-6 w-1 h-6 bg-gradient-to-b from-amber-400 to-amber-200 z-0" />
              )}

              {/* Tier Header Card */}
              <div
                className={`rounded-3xl p-4 text-white shadow-md relative overflow-hidden transition-all bg-gradient-to-r ${tier.colorGrad} border-2 ${tier.borderCol}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl shadow-inner border border-white/30">
                      {tier.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-black uppercase tracking-wider bg-black/30 px-2 py-0.5 rounded-full border border-white/20">
                          {tier.code} • {tier.cefr}
                        </span>
                        {isCurrentTier && (
                          <span className="text-[10px] font-extrabold bg-amber-300 text-slate-950 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                            <Zap className="w-3 h-3 fill-slate-950" /> Posisi Belajarmu
                          </span>
                        )}
                      </div>

                      <h4 className="text-base font-black font-chibi mt-0.5 drop-shadow-sm">
                        {tier.titleId}
                      </h4>
                      <p className="font-arabic text-sm text-amber-200 leading-tight">
                        {tier.titleAr}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs bg-white/20 text-white font-bold px-2.5 py-1 rounded-xl backdrop-blur-xs shrink-0">
                    {tierSkills.filter(s => profile.skillsMastered.includes(s.skill_id)).length}/{tierSkills.length} Modul
                  </span>
                </div>

                <p className="text-xs text-white/90 mt-2.5 pt-2 border-t border-white/15 leading-relaxed font-medium">
                  {tier.pedagogicalFocus}
                </p>
              </div>

              {/* Skills Grid within this Tier */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3 pl-2 sm:pl-0">
                {tierSkills.map((skill) => {
                  const status = getSkillStatus(skill);
                  const island = getFriendlyIslandName(skill.owner_island);
                  const isSelected = activeSkillId === skill.skill_id;

                  return (
                    <motion.div
                      key={skill.skill_id}
                      whileHover={{ y: -2 }}
                      className={`rounded-2xl p-3 border-2 transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-teal-500 bg-teal-50/90 shadow-md ring-2 ring-teal-400'
                          : status === 'mastered'
                          ? 'border-emerald-300 bg-emerald-50/60 shadow-xs'
                          : status === 'available'
                          ? 'border-amber-300 bg-white hover:border-amber-400 shadow-xs'
                          : 'border-slate-200 bg-slate-50/80 opacity-75'
                      }`}
                    >
                      {/* Card Top: Island Tag & Status Badge */}
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[10px] font-black text-slate-800 bg-amber-100/80 px-2 py-0.5 rounded-full border border-amber-200">
                            {island.icon} {island.shortName}
                          </span>
                        </div>

                        {/* Status Icon */}
                        <div>
                          {status === 'mastered' ? (
                            <span className="flex items-center gap-0.5 text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              Dikuasai
                            </span>
                          ) : status === 'available' ? (
                            <span className="flex items-center gap-0.5 text-[10px] font-bold text-amber-800 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-full">
                              <Zap className="w-3 h-3 text-amber-600" />
                              Tersedia
                            </span>
                          ) : (
                            <span className="flex items-center gap-0.5 text-[10px] font-bold text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full">
                              <Lock className="w-3 h-3 text-slate-400" />
                              Terkunci
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Card Middle: Skill Title and Description */}
                      <div className="my-1">
                        <h5 className="font-bold text-xs text-slate-900 leading-snug">
                          {skill.name}
                        </h5>
                        <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-2 leading-relaxed">
                          {skill.description}
                        </p>
                        <span className="text-[10px] text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full font-medium mt-1.5 inline-block">
                          📌 {skill.scope}
                        </span>
                      </div>

                      {/* Card Bottom: Action Buttons */}
                      <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between gap-1.5">
                        <span className="text-[10px] text-slate-400 font-bold">
                          Modul Interaktif
                        </span>

                        <div className="flex items-center gap-1.5">
                          {/* Launch Game Button */}
                          <button
                            type="button"
                            onClick={() => onLaunchGame(getIslandGameId(skill.owner_island))}
                            className="p-1.5 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-800 font-bold text-[10px] flex items-center gap-1 active:scale-95 transition-all cursor-pointer"
                            title={`Mainkan game edukasi ${island.shortName}`}
                          >
                            <Play className="w-3 h-3 fill-purple-800" />
                            Game
                          </button>

                          {/* Open Learn Unit Button */}
                          <button
                            type="button"
                            onClick={() => onSelectSkill(skill.skill_id)}
                            className={`px-2.5 py-1.5 rounded-xl font-bold text-[10px] flex items-center gap-1 shadow-2xs active:scale-95 transition-all cursor-pointer ${
                              status === 'mastered'
                                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                : 'bg-teal-600 hover:bg-teal-700 text-white'
                            }`}
                          >
                            <span>Pelajari</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
