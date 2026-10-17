import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Compass,
  Sparkles,
  CheckCircle2,
  Lock,
  Play,
  ArrowRight,
  BookOpen,
  Volume2,
  Award,
  ChevronRight,
  Shield,
  Layers,
  Star,
  MapPin,
  Flame,
  Info,
  X,
  Eye
} from 'lucide-react';
import { UserProfile, IslandId, SkillItem } from '../types/game';
import { ISLANDS_DATA, SKILLS_DATA, LEXICON_DATA } from '../data/curriculum';
import { sound } from '../services/sound';
import {
  getFriendlyLevel,
  getFriendlyIslandName,
  FRIENDLY_LEVELS,
  FriendlyLevelInfo
} from '../data/skillPedagogy';

interface CurriculumMapProps {
  profile: UserProfile;
  onSelectSkill: (skillId: string) => void;
  onLaunchGame: (gameId: string) => void;
  onOpenIslandHub?: (islandId: IslandId) => void;
}

export interface CurriculumIslandNode {
  order: number;
  islandId: IslandId;
  nameId: string;
  nameAr: string;
  linguisticLevelText: string;
  linguisticLevelNumber: number;
  levelCategory: string; // e.g., 'Tingkat 1: Pemula (Tamhidi)'
  domainFocus: string;
  description: string;
  crystalName: string;
  crystalColor: string;
  crystalEmoji: string;
  primaryGameId: string;
  primaryGameName: string;
  recommendedSkillId: string;
  highlightSkills: string[];
  gradientTheme: string;
  accentBorder: string;
  badgeColor: string;
}

export const CURRICULUM_PATH_NODES: CurriculumIslandNode[] = [
  {
    order: 1,
    islandId: 'HRF',
    nameId: 'Pulau Huruf Hijaiyah',
    nameAr: 'جَزِيرَةُ الحُرُوف',
    linguisticLevelText: 'Tingkat 1: Pemula (Tamhidi)',
    linguisticLevelNumber: 0,
    levelCategory: 'Tingkat Pemula',
    domainFocus: 'Fondasi Fonetik, 28 Huruf Hijaiyah, 3 Harakat Dasar & Jejak Pasir Pantai',
    description: 'Titik tolak petualangan bahasa Arab. Kenali bentuk asli 28 alfabet, makhraj murni, vokal fathah-kasrah-dhammah, dan goresan huruf.',
    crystalName: 'Mutiara Teal',
    crystalColor: 'from-teal-400 to-cyan-500',
    crystalEmoji: '🐚',
    primaryGameId: 'sand_trace',
    primaryGameName: 'Gores Jejak Pasir (Sand Trace)',
    recommendedSkillId: 'HRF-L0-01',
    highlightSkills: ['28 Huruf Hijaiyah', 'Harakat Dasar (A, I, U)', 'Artikulasi Makhraj'],
    gradientTheme: 'from-teal-700 via-teal-800 to-cyan-900',
    accentBorder: 'border-teal-400',
    badgeColor: 'bg-teal-600'
  },
  {
    order: 2,
    islandId: 'MFR',
    nameId: 'Pasar Kosakata Apung (Mufradat)',
    nameAr: 'سُوقُ المُفْرَدَات',
    linguisticLevelText: 'Tingkat 2: Dasar (Mubtadi\')',
    linguisticLevelNumber: 1,
    levelCategory: 'Tingkat Dasar',
    domainFocus: 'Kosakata Tematik Inti: Benda, Makanan, Hewan, Warna & Angka',
    description: 'Jelajahi perahu-perahu pasar terapung untuk menghimpun kosa kata konkret yang sering dijumpai dalam kehidupan harian.',
    crystalName: 'Kristal Emas-Jingga',
    crystalColor: 'from-amber-400 to-orange-500',
    crystalEmoji: '🛶',
    primaryGameId: 'floating_market',
    primaryGameName: 'Pasar Apung Mufradat (Floating Market)',
    recommendedSkillId: 'MFR-L0-01',
    highlightSkills: ['Benda Sekitar & Rumah', 'Warna & Buah-buahan', 'Angka 1 sampai 10'],
    gradientTheme: 'from-amber-600 via-orange-700 to-amber-900',
    accentBorder: 'border-amber-400',
    badgeColor: 'bg-amber-600'
  },
  {
    order: 3,
    islandId: 'HWR',
    nameId: 'Kampung Percakapan (Hiwar)',
    nameAr: 'قَرْيَةُ الحِوَار',
    linguisticLevelText: 'Tingkat 2: Dasar (Mubtadi\')',
    linguisticLevelNumber: 1,
    levelCategory: 'Tingkat Dasar',
    domainFocus: 'Dialog Komunikasi Nyata: Perkenalan Diri, Sapaan Ramah & Pesan Kafe',
    description: 'Berbincang langsung dengan warga kampung ramah. Praktikkan sapaan islami, perkenalan (ta\'aruf), serta memesan kurma dan kopi.',
    crystalName: 'Zamrud Hijau',
    crystalColor: 'from-emerald-400 to-green-600',
    crystalEmoji: '🏘️',
    primaryGameId: 'dialog_quest',
    primaryGameName: 'Petualangan Dialog (Dialog Quest)',
    recommendedSkillId: 'HWR-L0-01',
    highlightSkills: ['Salam & Sapaan Ta\'aruf', 'Tanya Kabar & Perpisahan', 'Pesan Menu di Kafe Kurma'],
    gradientTheme: 'from-emerald-700 via-green-800 to-teal-900',
    accentBorder: 'border-emerald-400',
    badgeColor: 'bg-emerald-600'
  },
  {
    order: 4,
    islandId: 'QWD',
    nameId: 'Gunung Tata Bahasa (Nahwu & Sharaf)',
    nameAr: 'جَبَلُ القَوَاعِد',
    linguisticLevelText: 'Tingkat 3: Menengah (Asasi)',
    linguisticLevelNumber: 2,
    levelCategory: 'Tingkat Menengah',
    domainFocus: 'Susunan Kalimat Sempurna, Kaidah Mudzakkar-Muannats & Kata Tunjuk',
    description: 'Bangun jembatan balok kalimat di puncak tebing. Pahami perbedaan kata laki-laki vs perempuan dan kata tunjuk ini/itu.',
    crystalName: 'Safir Biru',
    crystalColor: 'from-blue-500 to-indigo-600',
    crystalEmoji: '⛰️',
    primaryGameId: 'sentence_bridge',
    primaryGameName: 'Jembatan Balok Kalimat (Sentence Bridge)',
    recommendedSkillId: 'QWD-L2-01',
    highlightSkills: ['Mudzakkar & Muannats', 'Kata Tunjuk (Hadza / Hadzihi)', 'Kalimat Ismiyyah & Fi\'liyyah'],
    gradientTheme: 'from-blue-700 via-indigo-800 to-slate-900',
    accentBorder: 'border-blue-400',
    badgeColor: 'bg-blue-600'
  },
  {
    order: 5,
    islandId: 'IST',
    nameId: 'Lembah Menyimak Suara (Istima\')',
    nameAr: 'وَادِي الِاسْتِمَاع',
    linguisticLevelText: 'Tingkat 3: Menengah (Asasi)',
    linguisticLevelNumber: 2,
    levelCategory: 'Tingkat Menengah',
    domainFocus: 'Keterampilan Menyimak Reseptif, Pantulan Suara Gema & Intonasi Asli',
    description: 'Pertajam pendengaranmu di gua resonansi. Bedakan bunyi huruf yang mirip dan tangkap makna cerita dari penutur asli.',
    crystalName: 'Ametis Ungu',
    crystalColor: 'from-purple-500 to-violet-600',
    crystalEmoji: '👂',
    primaryGameId: 'echo_cave',
    primaryGameName: 'Pantulan Suara Gua (Echo Cave)',
    recommendedSkillId: 'IST-L0-01',
    highlightSkills: ['Pembeda Bunyi Huruf Mirip', 'Instruksi Suara Lisan', 'Cerita Pendek Penutur Asli'],
    gradientTheme: 'from-purple-700 via-violet-800 to-indigo-950',
    accentBorder: 'border-purple-400',
    badgeColor: 'bg-purple-600'
  },
  {
    order: 6,
    islandId: 'QRA',
    nameId: 'Perpustakaan Membaca (Qira\'ah)',
    nameAr: 'مَكْتَبَةُ القِرَاءَة',
    linguisticLevelText: 'Tingkat 4: Lanjutan (Mutawassith)',
    linguisticLevelNumber: 3,
    levelCategory: 'Tingkat Lanjutan',
    domainFocus: 'Membaca Teks Mandiri Berharakat, Surat Hudhud & Wacana Cerita',
    description: 'Buka gulungan hikmah di hutan buku raksasa. Tingkatkan kelancaran membaca narasi bahasa Arab dan pahami pesan surat sahabatmu.',
    crystalName: 'Delima Merah Marun',
    crystalColor: 'from-rose-500 to-red-700',
    crystalEmoji: '📚',
    primaryGameId: 'scroll_tap_gloss',
    primaryGameName: 'Gulungan Naskah Bertingkat (Scroll Tap Gloss)',
    recommendedSkillId: 'QRA-L1-01',
    highlightSkills: ['Surat Sahabat Hudhud', 'Kisah Hikmah Bertingkat', 'Terjemah Kosakata Per Kata'],
    gradientTheme: 'from-rose-700 via-red-800 to-rose-950',
    accentBorder: 'border-rose-400',
    badgeColor: 'bg-rose-700'
  },
  {
    order: 7,
    islandId: 'KTB',
    nameId: 'Pelabuhan Menulis & Dikte (Kitabah)',
    nameAr: 'مِينَاءُ الكِتَابَة',
    linguisticLevelText: 'Tingkat 5: Mandiri (Mutaqaddim)',
    linguisticLevelNumber: 4,
    levelCategory: 'Tingkat Mandiri',
    domainFocus: 'Kaidah Ejaan Dikte (Imla\'), Ta Marbuthah, Hamzah & Kaligrafi',
    description: 'Nyalakan mercusuar pelabuhan dengan ketepatan ejaan dikte audio. Tulis surat ucapan selamat dan rangkai tulisan Arab yang rapi.',
    crystalName: 'Tinta Emas Kaligrafi',
    crystalColor: 'from-yellow-400 to-amber-600',
    crystalEmoji: '⚓',
    primaryGameId: 'imla_lighthouse',
    primaryGameName: 'Mercusuar Ejaan Dikte (Imla Lighthouse)',
    recommendedSkillId: 'KTB-L1-01',
    highlightSkills: ['Ejaan Ta Marbuthah vs Terbuka', 'Hamzah Washal & Qatha\'', 'Dikte Suara Mercusuar'],
    gradientTheme: 'from-amber-600 via-yellow-700 to-amber-900',
    accentBorder: 'border-yellow-400',
    badgeColor: 'bg-yellow-600'
  },
  {
    order: 8,
    islandId: 'KLM',
    nameId: 'Pulau Berbicara Fasih (Kalam)',
    nameAr: 'جَزِيرَةُ الكَلَام',
    linguisticLevelText: 'Tingkat 6: Mahir (Mutamayyiz)',
    linguisticLevelNumber: 5,
    levelCategory: 'Tingkat Mahir',
    domainFocus: 'Artikulasi Makhraj Tenggorokan & Lidah, Mimbar Khitabah & Kelancaran',
    description: 'Asah artikulasi suara di mimbar amfiteater kristal. Latih kelancaran berbicara (thalaqah) dengan intonasi fasih dan percaya diri.',
    crystalName: 'Kecubung Suara Emas',
    crystalColor: 'from-orange-500 via-amber-500 to-red-600',
    crystalEmoji: '🎙️',
    primaryGameId: 'makhraj_mastery',
    primaryGameName: 'Uji Suara Mimbar Kalam (Makhraj Mastery)',
    recommendedSkillId: 'KLM-L0-01',
    highlightSkills: ['Makhraj Halq (Tenggorokan)', 'Makhraj Lisan (Lidah)', 'Kelancaran Tutur Kata'],
    gradientTheme: 'from-orange-700 via-red-800 to-amber-950',
    accentBorder: 'border-orange-400',
    badgeColor: 'bg-orange-600'
  },
  {
    order: 9,
    islandId: 'TMH',
    nameId: 'Kuil Langit (Ujian Kelulusan Utama)',
    nameAr: 'مَعْبَدُ السَّمَاء',
    linguisticLevelText: 'Tingkat 6: Mahir Sempurna (Mutamayyiz)',
    linguisticLevelNumber: 5,
    levelCategory: 'Tingkat Mahir Sempurna',
    domainFocus: 'Ujian Kelulusan Terpadu 4 Keterampilan: Menyimak, Berbicara, Membaca, Menulis',
    description: 'Puncak kejayaan kepulauan bahasa Arab! Buktikan kemahiran menyeluruh untuk meraih gelar tertinggi dan mahkota emas.',
    crystalName: 'Mahkota Emas Sempurna',
    crystalColor: 'from-amber-300 via-yellow-400 to-yellow-600',
    crystalEmoji: '👑',
    primaryGameId: 'mihrab_gate',
    primaryGameName: 'Gerbang Ujian Mihrab (Mihrab Gate Exam)',
    recommendedSkillId: 'TMH-L0-01',
    highlightSkills: ['Evaluasi Menyimak & Berbicara', 'Evaluasi Membaca & Menulis', 'Kenaikan Gelar Adib Agung'],
    gradientTheme: 'from-amber-500 via-yellow-600 to-amber-800',
    accentBorder: 'border-yellow-300',
    badgeColor: 'bg-amber-500'
  }
];

export const CurriculumMap: React.FC<CurriculumMapProps> = ({
  profile,
  onSelectSkill,
  onLaunchGame,
  onOpenIslandHub
}) => {
  const [selectedFilterCategory, setSelectedFilterCategory] = useState<string>('ALL');
  const [activeIslandModal, setActiveIslandModal] = useState<CurriculumIslandNode | null>(null);

  // Filter nodes based on selected linguistic tier
  const filteredNodes = CURRICULUM_PATH_NODES.filter(node => {
    if (selectedFilterCategory === 'ALL') return true;
    return node.levelCategory === selectedFilterCategory;
  });

  const getIslandState = (node: CurriculumIslandNode): 'completed' | 'current' | 'locked' => {
    const hasCrystal = profile.crystals[node.islandId];
    if (hasCrystal) return 'completed';

    // Current island is the first uncompleted unlocked island
    const isUnlocked = node.linguisticLevelNumber <= profile.level + 1;
    if (isUnlocked) {
      return 'current';
    }
    return 'locked';
  };

  const completedCount = CURRICULUM_PATH_NODES.filter(n => profile.crystals[n.islandId]).length;
  const currentLevelInfo = getFriendlyLevel(profile.level);

  const categories = [
    { id: 'ALL', label: 'Semua Destinasi (9 Titik)' },
    { id: 'Tingkat Pemula', label: 'Tingkat Pemula' },
    { id: 'Tingkat Dasar', label: 'Tingkat Dasar' },
    { id: 'Tingkat Menengah', label: 'Tingkat Menengah' },
    { id: 'Tingkat Lanjutan', label: 'Tingkat Lanjutan' },
    { id: 'Tingkat Mandiri', label: 'Tingkat Mandiri' },
    { id: 'Tingkat Mahir Sempurna', label: 'Tingkat Mahir Sempurna' },
  ];

  const handleOpenIslandModal = (node: CurriculumIslandNode) => {
    sound.playSparkle();
    sound.speakArabic(node.nameAr);
    setActiveIslandModal(node);
  };

  return (
    <div className="space-y-4">
      {/* Visual Header: Peta Petualangan Kepulauan */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-4 sm:p-5 border-2 border-amber-300 shadow-xl relative overflow-hidden">
        {/* Starfield & Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-start justify-between relative z-10 gap-3">
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 bg-amber-400/20 px-2.5 py-0.5 rounded-full border border-amber-300/30">
                Alur Progres Belajar Terpadu
              </span>
              <span className="text-[10px] font-bold text-teal-300 bg-teal-400/15 px-2 py-0.5 rounded-full border border-teal-400/20">
                8 Pulau + Kuil Langit
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-black font-chibi mt-1 flex items-center gap-2">
              <span>Peta Kurikulum Bahasa Arab</span>
              <span>🗺️</span>
            </h3>

            <p className="text-xs text-slate-300 mt-1 max-w-md leading-relaxed font-medium">
              Jalur terstruktur dari <strong>Pemula (Tamhidi)</strong> hingga <strong>Mahir Sempurna (Mutamayyiz)</strong>. Setiap pulau melatih satu keterampilan unik tanpa materi yang tumpang tindih dan tanpa singkatan membingungkan.
            </p>
          </div>

          <div className="text-right shrink-0">
            <span className="text-[10px] text-slate-400 block font-semibold">Kristal Terkumpul:</span>
            <div className="text-xs sm:text-sm font-black text-amber-300 bg-black/50 px-3 py-1 rounded-2xl border border-amber-400/40 mt-0.5">
              💎 {completedCount}/8 Kristal
            </div>
            <span className="text-[10px] text-teal-300 block mt-1">
              Gelar: {profile.rutbah}
            </span>
          </div>
        </div>

        {/* Current status pill */}
        <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-300 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span>Posisi Belajarmu: <strong className="text-white">{currentLevelInfo.fullTitle}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-amber-300 font-bold">
              {profile.skillsMastered.length} Modul Selesai
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-teal-300 font-bold">
              {profile.wordsMastered.length} Kosakata
            </span>
          </div>
        </div>
      </div>

      {/* Filter Selector per Jenjang Linguistik (Gamblang tanpa singkatan) */}
      <div className="bg-white rounded-3xl p-3 border border-amber-200 shadow-xs">
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-amber-600" />
            Pilih Tingkat Kemahiran Bahasa:
          </span>
          <span className="text-[10px] text-slate-500 font-semibold">
            {selectedFilterCategory === 'ALL' ? 'Semua Jalur Pulau' : selectedFilterCategory}
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs font-bold">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                sound.playPop();
                setSelectedFilterCategory(cat.id);
              }}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                selectedFilterCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-xs font-black'
                  : 'bg-amber-50/70 hover:bg-amber-100 text-slate-700 border border-amber-200/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Winding Trail / Archipelago Roadmap */}
      <div className="relative space-y-4 py-2">
        {filteredNodes.map((node, index) => {
          const state = getIslandState(node);
          const isCompleted = state === 'completed';
          const isCurrent = state === 'current';
          const isLocked = state === 'locked';

          return (
            <div key={node.islandId} className="relative">
              {/* Vertical connector line between islands */}
              {index < filteredNodes.length - 1 && (
                <div className="absolute left-7 top-16 bottom-0 w-1 bg-gradient-to-b from-amber-400 via-teal-400 to-amber-200 z-0 opacity-70 border-r-2 border-dashed border-amber-400" />
              )}

              {/* Island Card */}
              <motion.div
                whileHover={{ y: -2 }}
                className={`relative z-10 rounded-3xl p-4 sm:p-5 border-2 transition-all shadow-md overflow-hidden ${
                  isCurrent
                    ? 'bg-white border-amber-400 ring-4 ring-amber-300/50 shadow-xl'
                    : isCompleted
                    ? 'bg-gradient-to-r from-emerald-50/60 to-teal-50/40 border-emerald-400'
                    : 'bg-slate-50/80 border-slate-200 opacity-80'
                }`}
              >
                {/* Decorative status strip */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-3">
                    {/* Island Order Badge & Icon */}
                    <div
                      onClick={() => handleOpenIslandModal(node)}
                      className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center shrink-0 shadow-md text-2xl border cursor-pointer hover:scale-105 active:scale-95 transition-transform ${
                        isCurrent
                          ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 border-amber-300 ring-2 ring-amber-300'
                          : isCompleted
                          ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-emerald-300'
                          : 'bg-slate-200 text-slate-500 border-slate-300'
                      }`}
                      title="Klik untuk melihat detail silabus pulau"
                    >
                      <span>{node.crystalEmoji}</span>
                      <span className="text-[9px] font-black leading-none mt-0.5">
                        #{node.order}
                      </span>
                    </div>

                    <div>
                      {/* Linguistic Level Label (Explicit, Friendly, Full Text) */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className={`text-[10px] font-black uppercase text-white px-2.5 py-0.5 rounded-full ${node.badgeColor}`}>
                          {node.linguisticLevelText}
                        </span>

                        {isCurrent && (
                          <span className="text-[10px] font-black bg-amber-300 text-amber-950 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs animate-pulse">
                            <Flame className="w-3 h-3 fill-amber-950" />
                            {profile.avatar === 'aira' ? 'Aira di Sini!' : 'Ari di Sini!'}
                          </span>
                        )}

                        {isCompleted && (
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Selesai & Diraih
                          </span>
                        )}

                        {isLocked && (
                          <span className="text-[10px] font-bold text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                            <Lock className="w-3 h-3 text-slate-400" /> Terkunci
                          </span>
                        )}
                      </div>

                      {/* Island Title */}
                      <h4
                        onClick={() => handleOpenIslandModal(node)}
                        className="text-base sm:text-lg font-bold text-slate-900 mt-1 font-chibi flex items-center gap-2 cursor-pointer hover:text-amber-800 transition-colors"
                      >
                        <span>{node.nameId}</span>
                      </h4>

                      <div className="flex items-center gap-2 mt-0.5">
                        <p className="font-arabic text-base font-bold text-amber-800 leading-none">
                          {node.nameAr}
                        </p>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            sound.speakArabic(node.nameAr);
                          }}
                          className="w-5 h-5 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 flex items-center justify-center transition-colors cursor-pointer"
                          title="Dengarkan lafal"
                        >
                          <Volume2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Crystal Pill */}
                  <div className="text-right shrink-0">
                    <span className="text-[9px] text-slate-500 block font-semibold">Hadiah Kristal:</span>
                    <span className="text-[11px] font-bold text-slate-800 bg-amber-100/70 px-2 py-0.5 rounded-lg border border-amber-200 inline-block mt-0.5">
                      💎 {node.crystalName}
                    </span>
                  </div>
                </div>

                {/* Domain Focus & Description */}
                <div className="mt-3 pt-2.5 border-t border-slate-100 text-xs">
                  <div className="flex items-start gap-1.5 text-slate-700 font-semibold leading-relaxed">
                    <span className="text-amber-600 shrink-0">🎯</span>
                    <span><strong>Fokus Kemahiran:</strong> {node.domainFocus}</span>
                  </div>

                  <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed pl-5">
                    {node.description}
                  </p>
                </div>

                {/* Highlight skills tags */}
                <div className="mt-3 flex items-center gap-1.5 flex-wrap pl-5">
                  <span className="text-[10px] text-slate-500 font-bold">Materi Utama:</span>
                  {node.highlightSkills.map((sk, skIdx) => (
                    <span
                      key={skIdx}
                      className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200"
                    >
                      {sk}
                    </span>
                  ))}
                </div>

                {/* Bottom Action Buttons */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => handleOpenIslandModal(node)}
                    className="flex items-center gap-1 text-[11px] text-slate-600 hover:text-slate-900 font-semibold cursor-pointer py-1"
                  >
                    <Eye className="w-3.5 h-3.5 text-amber-600" />
                    <span>Lihat Silabus Lengkap</span>
                  </button>

                  <div className="flex items-center gap-2">
                    {/* Launch Game */}
                    <button
                      type="button"
                      onClick={() => onLaunchGame(node.primaryGameId)}
                      className="px-3 py-1.5 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-900 font-bold text-xs flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
                      title="Mainkan game edukasi pulau ini"
                    >
                      <Play className="w-3.5 h-3.5 fill-purple-900" />
                      <span>Game</span>
                    </button>

                    {/* Learn Module Action */}
                    <button
                      type="button"
                      onClick={() => onSelectSkill(node.recommendedSkillId)}
                      className={`px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer ${
                        isCurrent
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black'
                          : isCompleted
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          : 'bg-teal-600 hover:bg-teal-700 text-white'
                      }`}
                    >
                      <span>Mulai Belajar</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* INTERACTIVE ISLAND DETAIL MODAL (PREVIEW OF SYLLABUS & ACTIONS) */}
      <AnimatePresence>
        {activeIslandModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-lg bg-white rounded-[32px] overflow-hidden shadow-2xl border-4 border-amber-300 relative text-slate-900"
            >
              {/* Modal Header */}
              <div className={`p-5 bg-gradient-to-r ${activeIslandModal.gradientTheme} text-white relative`}>
                <button
                  type="button"
                  onClick={() => setActiveIslandModal(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 border-2 border-white/30 text-3xl flex items-center justify-center shadow-md">
                    {activeIslandModal.crystalEmoji}
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-200 bg-black/30 px-2.5 py-0.5 rounded-full border border-white/20">
                      {activeIslandModal.linguisticLevelText}
                    </span>
                    <h3 className="text-xl font-bold font-chibi mt-1 text-white">
                      {activeIslandModal.nameId}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <p className="font-arabic text-xl font-bold text-amber-300">
                        {activeIslandModal.nameAr}
                      </p>
                      <button
                        type="button"
                        onClick={() => sound.speakArabic(activeIslandModal.nameAr)}
                        className="w-5 h-5 rounded-full bg-white/20 hover:bg-white/30 text-amber-200 flex items-center justify-center cursor-pointer"
                      >
                        <Volume2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
                {/* Domain Focus Card */}
                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
                  <span className="text-[10px] font-black text-amber-900 uppercase tracking-wide block mb-1">
                    🎯 Fokus Linguistik Utama
                  </span>
                  <p className="text-xs font-bold text-slate-800 leading-relaxed">
                    {activeIslandModal.domainFocus}
                  </p>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {activeIslandModal.description}
                  </p>
                </div>

                {/* Highlight skills list */}
                <div>
                  <h4 className="text-xs font-black text-slate-800 mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-teal-600" />
                    <span>Materi & Kaidah yang Dipelajari di Pulau Ini:</span>
                  </h4>
                  <div className="space-y-1.5">
                    {activeIslandModal.highlightSkills.map((sk, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2 font-bold text-slate-800">
                          <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 text-[10px] font-black flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <span>{sk}</span>
                        </div>
                        <span className="text-[10px] text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full font-bold">
                          Terstruktur
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Crystal Prize Card */}
                <div className="p-3 rounded-2xl bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">💎</span>
                    <div>
                      <span className="text-[10px] font-bold text-teal-700 block">Kristal Pengetahuan:</span>
                      <h5 className="font-bold text-xs text-slate-900">{activeIslandModal.crystalName}</h5>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold px-2.5 py-1 rounded-xl bg-teal-200 text-teal-950">
                    {profile.crystals[activeIslandModal.islandId] ? 'Sudah Diraih ✅' : 'Tersedia 🎁'}
                  </span>
                </div>
              </div>

              {/* Modal Actions Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setActiveIslandModal(null);
                    onLaunchGame(activeIslandModal.primaryGameId);
                  }}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-xs"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Mainkan Game</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveIslandModal(null);
                    onSelectSkill(activeIslandModal.recommendedSkillId);
                  }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-md"
                >
                  <span>Buka Modul Belajar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
