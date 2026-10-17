import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  PenTool,
  Volume2,
  Sparkles,
  Award,
  CheckCircle2,
  BookOpen,
  Send,
  HelpCircle,
  Trophy,
  Compass,
  ChevronRight,
  ChevronLeft,
  FileText,
  Filter,
  Check,
  AlertTriangle,
  RotateCcw,
  Palette,
  Layers,
  GraduationCap
} from 'lucide-react';
import { sound } from '../services/sound';
import { GameStorage } from '../services/storage';
import { Island, UserProfile } from '../types/game';

interface PulauKitabahHubModalProps {
  island: Island;
  profile: UserProfile;
  onClose: () => void;
  onLaunchGame: (gameId: string) => void;
  onReward?: (xp: number, stars: number) => void;
}

type TabType = 'imla_studio' | 'spelling_rules' | 'postcard_studio' | 'khat_art';

// 1. Data Latihan Imla' (24 Latihan Jenjang Progresif Tingkat 1 s.d. 6)
export interface ImlaPracticeItem {
  id: string;
  level: number; // 0: Tamhidi, 1: Mubtadi', 2: Asasi, 3: Mutawassith, 4: Mutaqaddim, 5: Mutamayyiz
  levelLabel: string;
  wordAr: string;
  translit: string;
  meaning: string;
  audioPrompt: string;
  spellingRule: string;
  lettersBroken: string[];
  distractors: string[];
}

export const IMLA_DRILLS_PROG: ImlaPracticeItem[] = [
  // --- TINGKAT 1: PEMULA (TAMHIDI - L0) ---
  {
    id: 'k_l0_1',
    level: 0,
    levelLabel: 'Tingkat 1 • Tamhidi',
    wordAr: 'بَابٌ',
    translit: 'bābun',
    meaning: 'Pintu gerbang pelabuhan',
    audioPrompt: 'بَابٌ',
    spellingRule: 'Huruf Alif adalah huruf pemutus kiri (munfashilah) yang tidak menyambung ke huruf Ba di sebelah kirinya.',
    lettersBroken: ['بَـ', 'ـا', 'بٌ'],
    distractors: ['تَـ', 'ـبـ']
  },
  {
    id: 'k_l0_2',
    level: 0,
    levelLabel: 'Tingkat 1 • Tamhidi',
    wordAr: 'دَرَسَ',
    translit: 'darasa',
    meaning: 'Ia telah belajar tekun',
    audioPrompt: 'دَرَسَ',
    spellingRule: 'Ketiga huruf Dal, Ra, dan Sin ditulis terpisah karena Dal dan Ra keduanya adalah huruf pemutus kiri.',
    lettersBroken: ['دَ', 'رَ', 'سَ'],
    distractors: ['ذَ', 'زَ']
  },
  {
    id: 'k_l0_3',
    level: 0,
    levelLabel: 'Tingkat 1 • Tamhidi',
    wordAr: 'وَرْدٌ',
    translit: 'wardun',
    meaning: 'Bunga mawar harum',
    audioPrompt: 'وَرْدٌ',
    spellingRule: 'Huruf Wawu dan Ra keduanya menolak sambung ke kiri, sehingga huruf Dal berdiri mandiri di akhir kata.',
    lettersBroken: ['وَ', 'رْ', 'دٌ'],
    distractors: ['زْ', 'ذٌ']
  },
  {
    id: 'k_l0_4',
    level: 0,
    levelLabel: 'Tingkat 1 • Tamhidi',
    wordAr: 'نَجَمَ',
    translit: 'najama',
    meaning: 'Bintang terbit bersinar',
    audioPrompt: 'نَجَمَ',
    spellingRule: 'Bentuk sambung utuh: Nun di awal (نَـ), Jim di tengah (ـجَـ), dan Mim di akhir (ـمَ) saling bergandengan mulus.',
    lettersBroken: ['نَـ', 'ـجَـ', 'ـمَ'],
    distractors: ['بَـ', 'ـحَـ']
  },

  // --- TINGKAT 2: DASAR (MUBTADI' - L1) ---
  {
    id: 'k_l1_1',
    level: 1,
    levelLabel: 'Tingkat 2 • Mubtadi\'',
    wordAr: 'مَدْرَسَةٌ',
    translit: 'madrasatun',
    meaning: 'Gedung sekolah ilmu',
    audioPrompt: 'مَدْرَسَةٌ',
    spellingRule: 'Diakhiri Ta\' Marbuthah (ـة) bertitik dua karena saat diwaqafkan (berhenti) bunyinya berubah menjadi "H" (Madrasah).',
    lettersBroken: ['مَـ', 'ـدْ', 'رَ', 'سَـ', 'ـةٌ'],
    distractors: ['تٌ', 'ـهٌ']
  },
  {
    id: 'k_l1_2',
    level: 1,
    levelLabel: 'Tingkat 2 • Mubtadi\'',
    wordAr: 'بِنْتٌ',
    translit: 'bintun',
    meaning: 'Seorang anak perempuan',
    audioPrompt: 'بِنْتٌ',
    spellingRule: 'Diakhiri Ta\' Maftuhah (ت) terbuka karena bunyinya tetap "T" baik saat berharakat (bintun) maupun waqaf (bint).',
    lettersBroken: ['بِـ', 'ـنْـ', 'ـتٌ'],
    distractors: ['ـةٌ', 'ـهٌ']
  },
  {
    id: 'k_l1_3',
    level: 1,
    levelLabel: 'Tingkat 2 • Mubtadi\'',
    wordAr: 'كِتَابُهُ',
    translit: 'kitābuhu',
    meaning: 'Buku pelajaran miliknya',
    audioPrompt: 'كِتَابُهُ',
    spellingRule: 'Diakhiri Ha\' Dhamir kata ganti tanpa titik (ـه). Tetap berbunyi H baik saat washal maupun waqaf.',
    lettersBroken: ['كِـ', 'ـتَـ', 'ـا', 'بُـ', 'ـهُ'],
    distractors: ['ـةُ', 'تُ']
  },
  {
    id: 'k_l1_4',
    level: 1,
    levelLabel: 'Tingkat 2 • Mubtadi\'',
    wordAr: 'الشَّمْسُ',
    translit: 'asy-syamsu',
    meaning: 'Matahari pagi cerah',
    audioPrompt: 'الشَّمْسُ',
    spellingRule: 'Alif Lam Syamsiyyah: huruf Lam wajib tetap ditulis (الـ) meskipun bunyinya lebur langsung ke huruf Syin yang bertasydid.',
    lettersBroken: ['الـ', 'ـشَّـ', 'ـمْـ', 'ـسُ'],
    distractors: ['أَشَّـ', 'لْـ']
  },
  {
    id: 'k_l1_5',
    level: 1,
    levelLabel: 'Tingkat 2 • Mubtadi\'',
    wordAr: 'كِتَابًا',
    translit: 'kitāban',
    meaning: 'Sebuah buku (manshub fathatain)',
    audioPrompt: 'كِتَابًا',
    spellingRule: 'Tanwin fathatain wajib ditopang oleh huruf Alif di akhir kata (bukan nun sukun).',
    lettersBroken: ['كِـ', 'ـتَـ', 'ـا', 'بًـ', 'ـا'],
    distractors: ['بَنْ', 'بً']
  },

  // --- TINGKAT 3: MENENGAH (ASASI - L2) ---
  {
    id: 'k_l2_1',
    level: 2,
    levelLabel: 'Tingkat 3 • Asasi',
    wordAr: 'أَكْرَمَ',
    translit: 'akrama',
    meaning: 'Ia telah memuliakan tamu',
    audioPrompt: 'أَكْرَمَ',
    spellingRule: 'Hamzah Qath\' (أَ) berkepala \'Ain wajib ditulis tegak karena selalu terbaca meskipun didahului wawu (wa-akrama).',
    lettersBroken: ['أَ', 'كْـ', 'ـرَ', 'مَ'],
    distractors: ['اَ', 'إِ']
  },
  {
    id: 'k_l2_2',
    level: 2,
    levelLabel: 'Tingkat 3 • Asasi',
    wordAr: 'اِسْمٌ',
    translit: 'ismun',
    meaning: 'Nama identitas diri',
    audioPrompt: 'اِسْمٌ',
    spellingRule: 'Hamzah Washal (اِ) tanpa kepala \'Ain. Bunyinya lebur saat disambung dengan kata lain (cth: بِاسْمِ اللَّهِ / وَاسْمُهُ).',
    lettersBroken: ['اِ', 'سْـ', 'ـمٌ'],
    distractors: ['إِ', 'أِ']
  },
  {
    id: 'k_l2_3',
    level: 2,
    levelLabel: 'Tingkat 3 • Asasi',
    wordAr: 'قَرَأَ',
    translit: 'qaraʾa',
    meaning: 'Ia telah membaca tilawah',
    audioPrompt: 'قَرَأَ',
    spellingRule: 'Hamzah mutatharrifah (akhir kata) ditulis di atas Alif karena huruf persis sebelumnya berharakat fathah (قَ-رَ-أَ).',
    lettersBroken: ['قَـ', 'ـرَ', 'أَ'],
    distractors: ['ءَ', 'ئَ']
  },
  {
    id: 'k_l2_4',
    level: 2,
    levelLabel: 'Tingkat 3 • Asasi',
    wordAr: 'شَاطِئٌ',
    translit: 'syāṭiʾun',
    meaning: 'Tepi pantai pelabuhan',
    audioPrompt: 'شَاطِئٌ',
    spellingRule: 'Hamzah akhir kata ditulis di atas Ya tanpa titik (ئ) karena huruf Tha sebelumnya berharakat kasrah (ṭi).',
    lettersBroken: ['شَـ', 'ـا', 'طِـ', 'ـئٌ'],
    distractors: ['ءٌ', 'أٌ']
  },
  {
    id: 'k_l2_5',
    level: 2,
    levelLabel: 'Tingkat 3 • Asasi',
    wordAr: 'مَاءٌ',
    translit: 'māʾun',
    meaning: 'Air tawar jernih',
    audioPrompt: 'مَاءٌ',
    spellingRule: 'Hamzah akhir kata ditulis berdiri sendiri di atas garis (ء) karena didahului oleh huruf Mad Alif.',
    lettersBroken: ['مَـ', 'ـا', 'ءٌ'],
    distractors: ['أٌ', 'هـ']
  },

  // --- TINGKAT 4: LANJUTAN (MUTAWASSITH - L3) ---
  {
    id: 'k_l3_1',
    level: 3,
    levelLabel: 'Tingkat 4 • Mutawassith',
    wordAr: 'هُدًى',
    translit: 'hudan',
    meaning: 'Petunjuk kebenaran lurus',
    audioPrompt: 'هُدًى',
    spellingRule: 'Alif Maqshurah bengkok (ى) tanpa titik di ujung kata karena asal akar katanya adalah Ya (hadyun).',
    lettersBroken: ['هُـ', 'ـدً', 'ى'],
    distractors: ['ا', 'ة']
  },
  {
    id: 'k_l3_2',
    level: 3,
    levelLabel: 'Tingkat 4 • Mutawassith',
    wordAr: 'عَصَا',
    translit: 'ʿaṣā',
    meaning: 'Tongkat penuntun jalan',
    audioPrompt: 'عَصَا',
    spellingRule: 'Alif Mamdudah tegak lurus (ا) pada isim tiga huruf karena asal bentuk tasniyah-nya adalah Wawu (ʿaṣawān).',
    lettersBroken: ['عَـ', 'ـصَـ', 'ـا'],
    distractors: ['ى', 'ة']
  },
  {
    id: 'k_l3_3',
    level: 3,
    levelLabel: 'Tingkat 4 • Mutawassith',
    wordAr: 'دَعَا',
    translit: 'daʿā',
    meaning: 'Ia telah berdoa memohon',
    audioPrompt: 'دَعَا',
    spellingRule: 'Alif Mamdudah tegak (ا) pada fi\'il tiga huruf karena huruf mudhari\'-nya kembali ke Wawu (yad\'ū).',
    lettersBroken: ['دَ', 'عَـ', 'ـا'],
    distractors: ['دَعَى', 'دَاعَ']
  },
  {
    id: 'k_l3_4',
    level: 3,
    levelLabel: 'Tingkat 4 • Mutawassith',
    wordAr: 'قِرْطَاسٌ',
    translit: 'qirṭāsun',
    meaning: 'Kertas naskah perkamen',
    audioPrompt: 'قِرْطَاسٌ',
    spellingRule: 'Ejaan naskah klasik: Qaf kasrah tebal (قِـ), Ra sukun (ـرْ), Tha fathah mad (ـطَـا), dan Sin tanwin dhammatain (سٌ).',
    lettersBroken: ['قِـ', 'ـرْ', 'طَـ', 'ـا', 'سٌ'],
    distractors: ['كِـ', 'ـصٌ']
  },

  // --- TINGKAT 5: MANDIRI (MUTAQADDIM - L4) ---
  {
    id: 'k_l4_1',
    level: 4,
    levelLabel: 'Tingkat 5 • Mutaqaddim',
    wordAr: 'بِئْرٌ',
    translit: 'biʾrun',
    meaning: 'Sumur air sumber kehidupan',
    audioPrompt: 'بِئْرٌ',
    spellingRule: 'Kaidah Emas Hamzah Tengah: Kasrah mengalahkan sukun (Kasrah > Sukun), sehingga hamzah ditulis di atas Nabrah (ئـ).',
    lettersBroken: ['بِـ', 'ـئْـ', 'ـرٌ'],
    distractors: ['ـأْ', 'ـؤْ']
  },
  {
    id: 'k_l4_2',
    level: 4,
    levelLabel: 'Tingkat 5 • Mutaqaddim',
    wordAr: 'مُؤْمِنٌ',
    translit: 'muʾminun',
    meaning: 'Seorang mukmin beriman',
    audioPrompt: 'مُؤْمِنٌ',
    spellingRule: 'Hamzah tengah bersukun didahului huruf Mim ber-dhammah (Dhammah > Sukun), maka hamzah wajib ditulis di atas Wawu (ؤ).',
    lettersBroken: ['مُـ', 'ـؤْ', 'مِـ', 'ـنٌ'],
    distractors: ['ـأْ', 'ـئْ']
  },
  {
    id: 'k_l4_3',
    level: 4,
    levelLabel: 'Tingkat 5 • Mutaqaddim',
    wordAr: 'سَأَلَ',
    translit: 'saʾala',
    meaning: 'Ia telah bertanya mencari ilmu',
    audioPrompt: 'سَأَلَ',
    spellingRule: 'Hamzah tengah berharakat fathah setelah huruf Sin berfathah (Fathah vs Fathah = Seimbang), ditulis di atas Alif (أ).',
    lettersBroken: ['سَـ', 'ـأَ', 'لَ'],
    distractors: ['ـئَ', 'ـؤَ']
  },
  {
    id: 'k_l4_4',
    level: 4,
    levelLabel: 'Tingkat 5 • Mutaqaddim',
    wordAr: 'كَتَبُوا',
    translit: 'katabū',
    meaning: 'Mereka telah menulis karya',
    audioPrompt: 'كَتَبُوا',
    spellingRule: 'Huruf Zaidah: Alif Fariqah wajib ditulis setelah Wawu Jama\'ah meskipun sama sekali tidak dilafalkan saat membaca.',
    lettersBroken: ['كَـ', 'ـتَـ', 'ـبُـ', 'ـو', 'ا'],
    distractors: ['كَتَبُو', 'كَتَبُوْن']
  },
  {
    id: 'k_l4_5',
    level: 4,
    levelLabel: 'Tingkat 5 • Mutaqaddim',
    wordAr: 'هٰذَا',
    translit: 'hādhā',
    meaning: 'Ini (benda dekat)',
    audioPrompt: 'هٰذَا',
    spellingRule: 'Huruf Mahdzufah: Huruf Alif mad dihapus dalam tulisan isim isyarah (هٰذَا) dan hanya dilambangkan dengan alif tegak kecil.',
    lettersBroken: ['هٰـ', 'ـذَ', 'ا'],
    distractors: ['هَاذَا', 'هَذَ']
  },

  // --- TINGKAT 6: MAHIR (MUTAMAYYIZ - L5) ---
  {
    id: 'k_l5_1',
    level: 5,
    levelLabel: 'Tingkat 6 • Mutamayyiz',
    wordAr: 'إِنْشَاءٌ',
    translit: 'insyāʾun',
    meaning: 'Karangan tulisan indah bersastra',
    audioPrompt: 'إِنْشَاءٌ',
    spellingRule: 'Hamzah Qath\' kasrah di awal (إِ), nun sukun ikhfa\', syin mad (شَـا), dan hamzah mutatharrifah di atas garis (ءٌ).',
    lettersBroken: ['إِ', 'نْـ', 'ـشَـ', 'ـا', 'ءٌ'],
    distractors: ['أِ', 'ـئٌ']
  },
  {
    id: 'k_l5_2',
    level: 5,
    levelLabel: 'Tingkat 6 • Mutamayyiz',
    wordAr: 'دِيوَانُ الحِكْمَةِ',
    translit: 'dīwānu l-ḥikmah',
    meaning: 'Antologi naskah mutiara hikmah',
    audioPrompt: 'دِيوَانُ الحِكْمَةِ',
    spellingRule: 'Rangkaian frase idhafah naskah naskh dengan alif lam qamariyyah sukun dan ta marbuthah waqaf ha.',
    lettersBroken: ['دِ', 'يـ', 'ـوَ', 'ا', 'نُ', 'الـ', 'ـحِـ', 'ـكْـ', 'ـمَـ', 'ـةِ'],
    distractors: ['ـتِ', 'طِ']
  },
  {
    id: 'k_l5_3',
    level: 5,
    levelLabel: 'Tingkat 6 • Mutamayyiz',
    wordAr: 'حِكْمَةٌ بَالِغَةٌ',
    translit: 'ḥikmatun bālighah',
    meaning: 'Mutiara hikmah yang mendalam dan agung',
    audioPrompt: 'حِكْمَةٌ بَالِغَةٌ',
    spellingRule: 'Penggabungan Ta\' Marbuthah bertanwin (ـةٌ) dengan mad thabi\'i (بَـا) yang berubah bunyi "H" lembut saat waqaf di ujung frasa.',
    lettersBroken: ['حِـ', 'ـكْـ', 'ـمَـ', 'ـةٌ', 'بَـ', 'ـا', 'لِـ', 'ـغَـ', 'ـةٌ'],
    distractors: ['ـتٌ', 'ـهٌ']
  },
  {
    id: 'k_l5_4',
    level: 5,
    levelLabel: 'Tingkat 6 • Mutamayyiz',
    wordAr: 'العِلْمُ نُورٌ',
    translit: 'al-ʿilmu nūrun',
    meaning: 'Ilmu adalah cahaya penuntun jiwa',
    audioPrompt: 'العِلْمُ نُورٌ',
    spellingRule: 'Alif Lam Qamariyyah sukun jelas (الْـ), \'Ain kasrah (عِـ), Lam sukun (ـلْـ), dan Mim dammah (ـمُ) dipadukan dengan Nun dammah mad wawu (نُـوْ) dan Ra tanwin (رٌ).',
    lettersBroken: ['الـ', 'ـعِـ', 'ـلْـ', 'ـمُ', 'نُـ', 'ـو', 'رٌ'],
    distractors: ['أَلْـ', 'رَنْ']
  }
];

// 2. Data Kaidah Ejaan Arab Komprehensif (10 Kaidah Terstruktur)
export interface SpellingRuleDetail {
  id: string;
  levelTarget: string;
  title: string;
  titleAr: string;
  category: string;
  conceptSummary: string;
  ruleFormula: string;
  contrastExamples: {
    correct: string;
    incorrect: string;
    explanation: string;
  }[];
  hudhudSecret: string;
}

export const COMPREHENSIVE_SPELLING_RULES: SpellingRuleDetail[] = [
  {
    id: 'sr_1',
    levelTarget: 'Tingkat 1 • Tamhidi',
    title: '6 Huruf Pemutus Kiri (Munfashilah)',
    titleAr: 'الحُرُوفُ المُنْفَصِلَة',
    category: 'Ortografi Sambung',
    conceptSummary: 'Enam huruf yang hanya menerima sambungan dari sebelah kanan, tetapi pantang menyambung ke huruf sebelah kirinya.',
    ruleFormula: 'ا د ذ ر ز و ➔ Dilarang menarik garis sambung ke kiri!',
    contrastExamples: [
      {
        correct: 'بَابٌ (Bābun)',
        incorrect: 'بـاـب',
        explanation: 'Huruf Alif tidak boleh disambung ke huruf Ba di kirinya.'
      },
      {
        correct: 'دَرَسَ (Darasa)',
        incorrect: 'دَرَـسَ',
        explanation: 'Dal dan Ra keduanya pemutus kiri, seluruh huruf ditulis mandiri.'
      }
    ],
    hudhudSecret: 'Mantra Hudhud: "A-Da-Dza-Ro-Za-Wa" adalah 6 jembatan putus pena!'
  },
  {
    id: 'sr_2',
    levelTarget: 'Tingkat 2 • Mubtadi\'',
    title: 'Ta\' Marbuthah vs Ta\' Maftuhah vs Ha\' Dhamir',
    titleAr: 'التَّاءُ المَرْبُوطَةُ وَالمَفْتُوحَةُ وَالهَاء',
    category: 'Uji Waqaf Fonetik',
    conceptSummary: 'Perbedaan esensial pada akhir kata berdasarkan bunyi saat berhenti (waqaf sukun) vs bersambung (washal).',
    ruleFormula: 'Waqaf jadi "H" & Washal jadi "T" ➔ Ta Marbuthah (ـة). Tetap "T" ➔ Ta Maftuhah (ت). Tetap "H" tanpa titik ➔ Ha Dhamir (ـه).',
    contrastExamples: [
      {
        correct: 'مَدْرَسَة (Madrasah / Madrasatun)',
        incorrect: 'مَدْرَسَت',
        explanation: 'Saat waqaf dibaca "Madrasah" (bunyi H), wajib ditulis Ta Marbuthah bertitik dua.'
      },
      {
        correct: 'بِنْت (Bint)',
        incorrect: 'بِنْة',
        explanation: 'Saat waqaf tetap berbunyi "Bint" (T tegas), wajib ditulis Ta Maftuhah terbuka.'
      },
      {
        correct: 'كِتَابُهُ (Kitābuhu / Kitābuh)',
        incorrect: 'كِتَابُة',
        explanation: 'Kata ganti "miliknya" berbunyi H baik washal maupun waqaf, tidak memakai titik dua.'
      }
    ],
    hudhudSecret: 'Matikan huruf terakhir dengan sukun: jika berubah jadi H lembut, pasang Ta Marbuthah (ة)!'
  },
  {
    id: 'sr_3',
    levelTarget: 'Tingkat 2 • Mubtadi\'',
    title: 'Ortografi Alif Lam: Qamariyyah vs Syamsiyyah',
    titleAr: 'لَامُ التَّعْرِيفِ (قَمَرِيَّة وَشَمْسِيَّة)',
    category: 'Lam Ta\'rif',
    conceptSummary: 'Huruf Lam pada Alif Lam SELALU DITULIS dalam keadaan apapun, baik terdengar jelas (sukun) maupun lebur (tasydid).',
    ruleFormula: 'Qamariyyah: الْـ (sukun jelas) | Syamsiyyah: الـ + tasydid (الشَّـ)',
    contrastExamples: [
      {
        correct: 'الشَّمْسُ (Asy-Syamsu)',
        incorrect: 'أَشَّمْسُ',
        explanation: 'Menghapus huruf Lam adalah kesalahan imla\' fatal, Lam wajib tertulis.'
      },
      {
        correct: 'الْقَلَمُ (Al-Qalamu)',
        incorrect: 'أَلْقَلَمُ',
        explanation: 'Alif Lam diawali hamzah washal, tidak memakai kepala ain di atas alifnya.'
      }
    ],
    hudhudSecret: 'Telinga mendengar "Asy-Syams", tetapi pena wajib menulis "الشمس"!'
  },
  {
    id: 'sr_4',
    levelTarget: 'Tingkat 2 • Mubtadi\'',
    title: 'Tanwin Fathatain & Alif Penopang',
    titleAr: 'تَنْوِينُ الفَتْحِ وَأَلِفُ النَّصْبِ',
    category: 'Tanwin & Alif',
    conceptSummary: 'Tanwin fathatain membutuhkan alif penopang, kecuali pada Ta Marbuthah dan Hamzah setelah alif mad.',
    ruleFormula: 'Wajib Alif: كِتَابًا | DILARANG Alif: مَدْرَسَةً & مَاءً',
    contrastExamples: [
      {
        correct: 'كِتَابًا (Kitāban)',
        incorrect: 'كِتَابَنْ',
        explanation: 'Tanwin tidak boleh ditulis dengan huruf nun sukun.'
      },
      {
        correct: 'مَاءً (Māʾan)',
        incorrect: 'مَاءًا',
        explanation: 'Bahasa Arab melarang hamzah diapit oleh dua alif mad sekaligus.'
      },
      {
        correct: 'حَدِيقَةً (Ḥadīqatan)',
        incorrect: 'حَدِيقَتًا',
        explanation: 'Ta Marbuthah tidak memerlukan alif penopang tanwin.'
      }
    ],
    hudhudSecret: 'Ingat larangan "sandwich alif": jika sebelum hamzah sudah ada alif, jangan tambah alif lagi di belakangnya!'
  },
  {
    id: 'sr_5',
    levelTarget: 'Tingkat 3 • Asasi',
    title: 'Hamzah Awal: Qath\' vs Washal (Trik Wawu)',
    titleAr: 'هَمْزَةُ الوَصْلِ وَهَمْزَةُ القَطْعِ',
    category: 'Hamzah Awal Kata',
    conceptSummary: 'Hamzah Qath\' (أ/إ) selalu terbaca dan tertulis kepalanya. Hamzah Washal (ا) lebur saat bersambung dengan kata sebelumnya.',
    ruleFormula: 'Uji dengan "Wa": Wa + Ahmad = Wa-Ahmad (Qath\') | Wa + Ism = Wasmu (Washal)',
    contrastExamples: [
      {
        correct: 'أَحْمَدُ (Aḥmad)',
        incorrect: 'احمد',
        explanation: 'Nama orang diawali hamzah qath\', wajib ada kepala \'ain.'
      },
      {
        correct: 'وَاسْمُهُ (Wasmuhu)',
        incorrect: 'وَأَسْمُهُ',
        explanation: 'Kata ism adalah hamzah washal, bunyinya lebur tanpa kepala \'ain.'
      }
    ],
    hudhudSecret: 'Ucapkan dengan awalan "Wa...". Jika ada ketukan tegas di leher, tulis kepala \'ain (أ)!'
  },
  {
    id: 'sr_6',
    levelTarget: 'Tingkat 3 • Asasi',
    title: 'Hamzah Mutatharrifah (Akhir Kata)',
    titleAr: 'الهَمْزَةُ المُتَطَرِّفَةُ فِي آخِرِ الكَلِمَة',
    category: 'Hamzah Akhir',
    conceptSummary: 'Bentuk rumah hamzah akhir HANYA ditentukan oleh harakat satu huruf persis sebelumnya.',
    ruleFormula: 'Sebelumnya Fathah ➔ Di atas Alif (قَرَأَ) | Kasrah ➔ Di atas Ya (شَاطِئٌ) | Dhammah ➔ Di atas Wawu (تَبَاطُؤٌ) | Sukun/Mad ➔ Sendirian di baris (مَاءٌ)',
    contrastExamples: [
      {
        correct: 'شَاطِئٌ (Syāṭiʾun)',
        incorrect: 'شَاطِءٌ',
        explanation: 'Huruf Tha berkasrah, maka hamzah bertengger di atas Ya.'
      },
      {
        correct: 'شَيْءٌ (Syaiʾun)',
        incorrect: 'شَيئٌ',
        explanation: 'Huruf Ya bersukun, maka hamzah berdiri sendiri di atas garis setelah Ya.'
      }
    ],
    hudhudSecret: 'Abaikan harakat hamzah itu sendiri! Cukup lihat satu harakat huruf di depannya!'
  },
  {
    id: 'sr_7',
    levelTarget: 'Tingkat 4 • Mutawassith',
    title: 'Tanda Baca Arab (Alamatut Tarqim)',
    titleAr: 'عَلَامَاتُ التَّرْقِيمِ العَرَبِيَّة',
    category: 'Tarqim & Arah Teks',
    conceptSummary: 'Tanda baca teks Arab menyesuaikan arah baca dari kanan ke kiri.',
    ruleFormula: 'Koma terbalik: (،) | Tanda tanya hadap kiri: (؟) | Titik dua: (:) | Tanda kutip naskah: « »',
    contrastExamples: [
      {
        correct: 'كَيْفَ حَالُكَ؟ (Kaifa ḥāluk?)',
        incorrect: 'كَيْفَ حَالُكَ?',
        explanation: 'Tanda tanya Latin (?) menghadap ke kanan berlawanan dengan arah teks Arab.'
      },
      {
        correct: 'جَاءَ زَيْدٌ، وَعَمْرٌو.',
        incorrect: 'جَاءَ زَيْدٌ, وَعَمْرٌو.',
        explanation: 'Koma Arab (،) ekornya melengkung ke atas-kanan.'
      }
    ],
    hudhudSecret: 'Jangan biarkan tanda tanya tersesat menghadap ke kanan seperti huruf Latin!'
  },
  {
    id: 'sr_8',
    levelTarget: 'Tingkat 4 • Mutawassith',
    title: 'Alif Layyinah: Maqshurah (ى) vs Mamdudah (ا)',
    titleAr: 'الأَلِفُ اللَّيِّنَة (المَقْصُورَة وَالمَمْدُودَة)',
    category: 'Vokal Panjang Akhir',
    conceptSummary: 'Menentukan alif bengkok (ى) atau tegak (ا) berdasarkan asal huruf pada kata tiga huruf.',
    ruleFormula: 'Asal huruf Ya (hadyun, yahdi) ➔ Maqshurah (هُدَى) | Asal huruf Wawu (yad\'u) ➔ Mamdudah (دَعَا)',
    contrastExamples: [
      {
        correct: 'هُدَى (Hudā)',
        incorrect: 'هُدَا',
        explanation: 'Berasal dari kata benda hadyun / yahdī (Ya).'
      },
      {
        correct: 'عَصَا (ʿAṣā)',
        incorrect: 'عَصَى',
        explanation: 'Bentuk dua tongkatnya adalah ʿaṣawāni (Wawu).'
      }
    ],
    hudhudSecret: 'Cek kata kerjanya di bentuk fi\'il mudhari\': ada Wawu = Alif tegak (ا), ada Ya = Alif bengkok (ى)!'
  },
  {
    id: 'sr_9',
    levelTarget: 'Tingkat 5 • Mutaqaddim',
    title: 'Kaidah Emas Hamzah Tengah (Harakat Terkuat)',
    titleAr: 'الهَمْزَةُ المُتَوَسِّطَةُ وَسُلَّمُ الحَرَكَات',
    category: 'Hamzah Mutawassithah',
    conceptSummary: 'Pertarungan harakat hamzah melawan harakat huruf sebelumnya. Yang lebih kuat menentukan bentuk rumah.',
    ruleFormula: 'KASRAH (ئـ) > DHAMMAH (ؤ) > FATHAH (أ) > SUKUN (paling lemah)',
    contrastExamples: [
      {
        correct: 'بِئْرٌ (Biʾrun)',
        incorrect: 'بِأْرٌ',
        explanation: 'Kasrah pada Ba mengalahkan sukun pada hamzah, ditulis di atas Nabrah (ئـ).'
      },
      {
        correct: 'مُؤْمِنٌ (Muʾminun)',
        incorrect: 'مُأْمِنٌ',
        explanation: 'Dhammah pada Mim mengalahkan sukun pada hamzah, ditulis di atas Wawu (ؤ).'
      },
      {
        correct: 'سَأَلَ (Saʾala)',
        incorrect: 'سَئَلَ',
        explanation: 'Fathah vs Fathah imbang, ditulis di atas Alif (أ).'
      }
    ],
    hudhudSecret: 'Kasrah adalah Sang Sultan tak terkalahkan! Ada kasrah = langsung pilih rumah Nabrah (ئـ)!'
  },
  {
    id: 'sr_10',
    levelTarget: 'Tingkat 5 • Mutaqaddim',
    title: 'Huruf Zaidah (Ditulis Tak Dibaca) & Mahdzufah',
    titleAr: 'الحُرُوفُ الزَّائِدَةُ وَالمَحْذُوفَة',
    category: 'Ortografi Naskah',
    conceptSummary: 'Huruf yang wajib ditulis pena namun lidah tidak membacanya (Zaidah), dan huruf yang dibaca tapi dibuang tulisan penanya (Mahdzufah).',
    ruleFormula: 'Zaidah: كَتَبُوا (Alif Fariqah) & عَمْرٌو (Wawu) | Mahdzufah: هٰذَا, ذٰلِكَ, الرَّحْمٰن',
    contrastExamples: [
      {
        correct: 'كَتَبُوا (Katabū)',
        incorrect: 'كَتَبُو',
        explanation: 'Wajib ada Alif Fariqah setelah Wawu Jama\'ah.'
      },
      {
        correct: 'هٰذَا (Hādhā)',
        incorrect: 'هَاذَا',
        explanation: 'Alif mad dibuang dalam ejaan baku isim isyarah.'
      }
    ],
    hudhudSecret: 'Alif Fariqah adalah lencana persatuan para pelaku jamak!'
  },
  {
    id: 'sr_11',
    levelTarget: 'Tingkat 6 • Mutamayyiz',
    title: 'Insya\' Hurr & Kohesi Paragraf Naskah',
    titleAr: 'الإِنْشَاءُ الحُرُّ وَالتَّمَاسُكُ النَّصِّيّ',
    category: 'Balaghah & Insya\'',
    conceptSummary: 'Menyusun kalimat naratif-deskriptif yang menyatu (berkohesi) dengan kata sambung baku dan tasykil seimbang.',
    ruleFormula: 'Kalimat Utama + Huruf Athaf (فَـ / ثُمَّ / وَ) + Kalimat Penjelas + Tanda Titik (.)',
    contrastExamples: [
      {
        correct: 'طَلَبُ العِلْمِ نُورٌ، وَبِهِ تَرْتَقِي الأُمَمُ.',
        incorrect: 'طلب العلم نور به ترتقي الامم',
        explanation: 'Kalimat naskah adib wajib berharakat rapi dan dipisahkan tanda koma Arab (،).'
      }
    ],
    hudhudSecret: 'Gunakan kata sambung dengan bijak, jangan menumpuk huruf Wawu di setiap kata!'
  },
  {
    id: 'sr_12',
    levelTarget: 'Tingkat 6 • Mutamayyiz',
    title: 'Mizan Nuqath Kaligrafi Naskh & Tsuluts',
    titleAr: 'مِيزَانُ الحُرُوفِ فِي الخَطِّ العَرَبِيّ',
    category: 'Kaligrafi Mizan',
    conceptSummary: 'Ukuran huruf kaligrafi diukur dengan titik belah ketupat pena bambu (Nuqathul Qalam).',
    ruleFormula: 'Alif Naskh = 5 titik pena | Alif Tsuluts = 7 titik pena | Kemiringan pena = 60° - 70°',
    contrastExamples: [
      {
        correct: 'أَلِفُ النَّسْخِ (5 نقاط)',
        incorrect: 'ألف عشوائي',
        explanation: 'Tinggi huruf alif yang terlalu pendek atau panjang merusak keseimbangan seluruh kata.'
      }
    ],
    hudhudSecret: 'Mata pena yang dipotong miring menghasilkan harmoni tebal-tipis alami tanpa perlu ditekan kuat!'
  }
];

// 3. Data Kartu Pos & Korespondensi (5 Template Berbobot)
export interface PostcardTemplate {
  id: string;
  title: string;
  occasion: string;
  themeStyle: 'gold' | 'emerald' | 'sapphire';
  contentAr: string;
  translit: string;
  meaning: string;
  recipientDefault: string;
  customPhrases: string[];
}

export const POSTCARD_TEMPLATES_PROG: PostcardTemplate[] = [
  {
    id: 'pc_1',
    title: 'Kartu Tahni\'ah Idul Fitri Mubarak',
    occasion: 'Hari Raya & Perayaan',
    themeStyle: 'gold',
    contentAr: 'تَقَبَّلَ اللَّهُ مِنَّا وَمِنْكُمْ، عِيدٌ مُبَارَكٌ وَكُلُّ عَامٍ وَأَنْتُمْ بِخَيْرٍ!',
    translit: 'Taqabbalallāhu minnā wa minkum, ʿīdun mubārak wa kullu ʿāmin wa antum bi-khayr!',
    meaning: 'Semoga Allah menerima amalan kami dan kalian. Selamat hari raya penuh berkah, semoga setiap tahun kalian senantiasa dalam kebaikan!',
    recipientDefault: 'Sahabatku Tercinta',
    customPhrases: ['أَعَادَهُ اللَّهُ عَلَيْنَا بِاليُمْنِ', 'غَفَرَ اللَّهُ لَنَا وَلَكُمْ']
  },
  {
    id: 'pc_2',
    title: 'Surat Apresiasi untuk Guru (Ustaz/Ustazah)',
    occasion: 'Pendidikan & Penghargaan',
    themeStyle: 'sapphire',
    contentAr: 'شُكْرًا يَا أُسْتَاذِي الكَرِيمَ عَلَى نُورِ العِلْمِ وَحُسْنِ التَّرْبِيَةِ، جَزَاكَ اللَّهُ خَيْرًا!',
    translit: 'Syukran yā ustādziyal karīm ʿalā nūril ʿilmi wa ḥusnit-tarbiyah, jazākallāhu khayrā!',
    meaning: 'Terima kasih wahai guruku yang mulia atas cahaya ilmu dan bimbingan akhlak. Semoga Allah membalasmu dengan kebaikan berlimpah!',
    recipientDefault: 'Ustaz & Pendidik',
    customPhrases: ['بَارَكَ اللَّهُ فِي عِلْمِكَ', 'نَفَعَ اللَّهُ بِكَ الأُمَّةَ']
  },
  {
    id: 'pc_3',
    title: 'Warkat Persahabatan untuk Burung Hudhud',
    occasion: 'Petualangan Brightoria',
    themeStyle: 'emerald',
    contentAr: 'يَا هُدْهُدُ يَا رَفِيقَ الدَّرْبِ، شُكْرًا عَلَى حَمْلِ رَسَائِلِ الخَيْرِ بَيْنَ الجُزُرِ!',
    translit: 'Yā Hudhud yā rafīqad-darb, syukran ʿalā ḥamli rasāʾilil khayri baynal juzur!',
    meaning: 'Wahai Hudhud sahabat seperjalanan, terima kasih telah membawa pesan kebaikan di antara pulau-pulau bahasa Arab!',
    recipientDefault: 'Sahabat Hudhud',
    customPhrases: ['دُمْتَ رَفِيقًا مُخْلِصًا', 'إِلَى أَمَامٍ فِي رِحْلَةِ النُّورِ']
  },
  {
    id: 'pc_4',
    title: 'Doa Kesembuhan & Afiah (I\'yadatul Maridh)',
    occasion: 'Empati & Doa Sahabat',
    themeStyle: 'emerald',
    contentAr: 'لَا بَأْسَ طَهُورٌ إِنْ شَاءَ اللَّهُ، أَسْأَلُ اللَّهَ العَظِيمَ أَنْ يَشْفِيَكَ شِفَاءً عَاجِلًا!',
    translit: 'Lā baʾsa thahūrun in syāʾallāh, asʾalullāhal ʿaẓīma an yasyfiyaka syifāʾan ʿājilā!',
    meaning: 'Tidak mengapa, semoga menjadi pembersih dosa insya Allah. Aku memohon kepada Allah Yang Maha Agung agar menyembuhkanmu dengan kesembuhan segera!',
    recipientDefault: 'Sahabat yang Sedang Sakit',
    customPhrases: ['شَفَاكَ اللَّهُ وَعَافَاكَ', 'طَهُورٌ وَأَجْرٌ مُضَاعَفٌ']
  },
  {
    id: 'pc_5',
    title: 'Tahni\'ah Kelulusan Jenjang Ilmu & Wisuda',
    occasion: 'Pencapaian & Rutbah',
    themeStyle: 'gold',
    contentAr: 'مُبَارَكٌ عَلَيْكَ النَّجَاحُ وَالتَّفَوُّقُ، وَجَعَلَ اللَّهُ عِلْمَكَ حُجَّةً لَكَ وَنُورًا فِي دَرْبِكَ!',
    translit: 'Mubārakun ʿalaykan-najāḥu wat-tafawwuq, wa jaʿalallāhu ʿilmaka ḥujjatan laka wa nūran fī darbik!',
    meaning: 'Selamat atas keberhasilan dan keunggulanmu. Semoga Allah menjadikan ilmumu pembela bagimu dan cahaya dalam langkah hidupmu!',
    recipientDefault: 'Juara Penjelajah Bahasa',
    customPhrases: ['مِنْ نَجَاحٍ إِلَى نَجَاحٍ', 'إِلَى مَرَاتِبَ أَعْلَى دَائِمًا']
  }
];

export const PulauKitabahHubModal: React.FC<PulauKitabahHubModalProps> = ({
  island,
  profile: _profile,
  onClose,
  onLaunchGame,
  onReward
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('imla_studio');
  
  // Level filter for drills (null = All levels)
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<number | null>(null);
  const [selectedDrillIdx, setSelectedDrillIdx] = useState(0);
  
  // Postcard state
  const [selectedPostcardIdx, setSelectedPostcardIdx] = useState(0);
  const [recipientName, setRecipientName] = useState('Sahabat Karib');
  const [extraPhrase, setExtraPhrase] = useState('');
  const [isPostcardSent, setIsPostcardSent] = useState(false);
  
  // Assembly puzzle state
  const [spellingQuizState, setSpellingQuizState] = useState<{
    assembled: string[];
    isCorrect: boolean | null;
  }>({ assembled: [], isCorrect: null });

  // Filtered drills based on level
  const filteredDrills = selectedLevelFilter !== null
    ? IMLA_DRILLS_PROG.filter(d => d.level === selectedLevelFilter)
    : IMLA_DRILLS_PROG;

  const currentDrill = filteredDrills[Math.min(selectedDrillIdx, filteredDrills.length - 1)] || IMLA_DRILLS_PROG[0];
  const currentPostcard = POSTCARD_TEMPLATES_PROG[selectedPostcardIdx];

  const handlePlayAudio = (text: string) => {
    sound.speakArabic(text, 0.8);
  };

  const handleAddLetterToDrill = (letter: string) => {
    sound.playSparkle();
    const next = [...spellingQuizState.assembled, letter];
    setSpellingQuizState({ ...spellingQuizState, assembled: next });

    // Check if finished assembling
    if (next.length === currentDrill.lettersBroken.length) {
      const fullText = next.join('');
      const targetText = currentDrill.lettersBroken.join('');
      const isOk = fullText === targetText;
      if (isOk) {
        sound.playSuccess();
        if (onReward) onReward(35, 2);
        const p = GameStorage.getProfile();
        p.hudhudTraits.kitabah = Math.min(100, (p.hudhudTraits.kitabah || 0) + 7);
        GameStorage.saveProfile(p);
      } else {
        sound.playGentleRetry();
      }
      setSpellingQuizState({ assembled: next, isCorrect: isOk });
    }
  };

  const handleResetDrill = () => {
    sound.playSparkle();
    setSpellingQuizState({ assembled: [], isCorrect: null });
  };

  const handleSendPostcard = () => {
    sound.playSuccess();
    sound.playSparkle();
    setIsPostcardSent(true);
    if (onReward) onReward(45, 3);
    const p = GameStorage.getProfile();
    p.hudhudTraits.kitabah = Math.min(100, (p.hudhudTraits.kitabah || 0) + 9);
    GameStorage.saveProfile(p);
    setTimeout(() => setIsPostcardSent(false), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-3xl max-w-5xl w-full max-h-[94vh] overflow-hidden shadow-2xl border-4 border-amber-400 flex flex-col"
      >
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 text-white p-3 sm:p-4 flex items-center justify-between shadow-md relative">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-amber-400/25 border border-amber-300/40 flex items-center justify-center text-2xl shadow-inner">
              ⚓
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-extrabold text-base sm:text-lg tracking-wide">{island.name_id}</h2>
                <span className="font-arabic text-amber-200 text-sm font-bold">{island.name_ar}</span>
                <span className="bg-amber-900/60 text-amber-200 text-[10px] font-black px-2 py-0.5 rounded-full border border-amber-400/40">
                  16 Modul Jenjang • 24 Imla'
                </span>
              </div>
              <p className="text-xs text-amber-100 hidden sm:block mt-0.5">
                Dermaga Tinta Emas: Kaidah Ortografi Presisi, Mercusuar Imla', Korespondensi Sahabat & Khath Naskh
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onLaunchGame('imla_lighthouse')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-300 hover:bg-amber-200 text-slate-950 font-black text-xs shadow-md active:scale-95 transition-all"
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Mercusuar Imla'</span>
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-black/20 hover:bg-black/30 text-white flex items-center justify-center font-bold text-sm transition-all"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-amber-50/80 border-b border-amber-200 px-3 py-2 flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab('imla_studio')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === 'imla_studio'
                  ? 'bg-amber-700 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-amber-100'
              }`}
            >
              <span>✍️ Studio Imla' Progresif</span>
            </button>
            <button
              onClick={() => setActiveTab('spelling_rules')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === 'spelling_rules'
                  ? 'bg-amber-700 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-amber-100'
              }`}
            >
              <span>📜 10 Kaidah Emas Imla'</span>
            </button>
            <button
              onClick={() => setActiveTab('postcard_studio')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === 'postcard_studio'
                  ? 'bg-amber-700 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-amber-100'
              }`}
            >
              <span>💌 Studio Kartu Pos Sahabat</span>
            </button>
            <button
              onClick={() => setActiveTab('khat_art')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === 'khat_art'
                  ? 'bg-amber-700 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-amber-100'
              }`}
            >
              <span>✒️ Seni Khath & Garis Satr</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-4">
          
          {/* TAB 1: STUDIO IMLA' (DIKTE MANDIRI BERTINGKAT) */}
          {activeTab === 'imla_studio' && (
            <div className="space-y-4">
              {/* Level Filter Pill Bar */}
              <div className="bg-amber-100/60 p-2 rounded-2xl border border-amber-200/80 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1 text-xs font-bold text-amber-900">
                  <Filter className="w-3.5 h-3.5 text-amber-700" />
                  <span>Pilih Jenjang:</span>
                </div>
                <div className="flex items-center gap-1 flex-wrap">
                  <button
                    onClick={() => { setSelectedLevelFilter(null); setSelectedDrillIdx(0); handleResetDrill(); }}
                    className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                      selectedLevelFilter === null
                        ? 'bg-amber-800 text-white shadow-xs'
                        : 'bg-white text-slate-700 hover:bg-amber-50'
                    }`}
                  >
                    Semua ({IMLA_DRILLS_PROG.length} Latihan)
                  </button>
                  {[
                    { lvl: 0, label: 'L1 Tamhidi' },
                    { lvl: 1, label: 'L2 Mubtadi\'' },
                    { lvl: 2, label: 'L3 Asasi' },
                    { lvl: 3, label: 'L4 Mutawassith' },
                    { lvl: 4, label: 'L5 Mutaqaddim' },
                    { lvl: 5, label: 'L6 Mutamayyiz' }
                  ].map(item => (
                    <button
                      key={item.lvl}
                      onClick={() => { setSelectedLevelFilter(item.lvl); setSelectedDrillIdx(0); handleResetDrill(); }}
                      className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                        selectedLevelFilter === item.lvl
                          ? 'bg-amber-800 text-white shadow-xs'
                          : 'bg-white text-slate-700 hover:bg-amber-50'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Drill Progress Header */}
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="font-extrabold text-slate-800">{currentDrill.levelLabel}</span>
                  <span className="text-slate-500 ml-2">• Soal {selectedDrillIdx + 1} dari {filteredDrills.length}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      setSelectedDrillIdx(prev => Math.max(0, prev - 1));
                      handleResetDrill();
                    }}
                    disabled={selectedDrillIdx === 0}
                    className="p-1 rounded-lg bg-slate-100 text-slate-700 disabled:opacity-30"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedDrillIdx(prev => Math.min(filteredDrills.length - 1, prev + 1));
                      handleResetDrill();
                    }}
                    disabled={selectedDrillIdx >= filteredDrills.length - 1}
                    className="p-1 rounded-lg bg-slate-100 text-slate-700 disabled:opacity-30"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Dictation Player & Puzzle Card */}
              <div className="bg-gradient-to-b from-slate-900 via-amber-950 to-slate-900 text-white rounded-3xl p-5 border-2 border-amber-400 shadow-xl space-y-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handlePlayAudio(currentDrill.audioPrompt)}
                      className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-500 text-slate-950 flex items-center justify-center font-bold text-xl shadow-lg active:scale-95 transition-all hover:brightness-110"
                      title="Dengarkan Dikte Audio Penutur Asli"
                    >
                      <Volume2 className="w-7 h-7" />
                    </button>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider bg-amber-400/20 px-2 py-0.5 rounded-full">
                          Lafal Dikte Suara Penutur Asli:
                        </span>
                        <span className="text-[10px] text-amber-200">Ketuk ikon speaker 🔊</span>
                      </div>
                      <h4 className="font-arabic text-2xl font-bold text-amber-200 mt-1">
                        &ldquo;{currentDrill.meaning}&rdquo;
                      </h4>
                      <p className="text-xs text-slate-300">Transliterasi ejaan: {currentDrill.translit}</p>
                    </div>
                  </div>

                  <button
                    onClick={handleResetDrill}
                    className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Susunan</span>
                  </button>
                </div>

                {/* Assembly Dropzone */}
                <div className="bg-black/40 rounded-2xl p-4 border border-white/10 text-center">
                  <span className="text-[11px] text-slate-400 block mb-2 font-medium">Kotak Susunan Ejaan Naskah:</span>
                  <div className="flex items-center justify-center gap-2 min-h-[58px] flex-row-reverse flex-wrap">
                    {spellingQuizState.assembled.length === 0 ? (
                      <span className="text-xs text-slate-400 italic">
                        Ketuk kepingan huruf di bawah ini secara berurutan dari kanan ke kiri untuk merangkai kata...
                      </span>
                    ) : (
                      spellingQuizState.assembled.map((lt, idx) => (
                        <span
                          key={idx}
                          className="px-3.5 py-1.5 bg-gradient-to-b from-amber-300 to-yellow-500 text-slate-950 font-arabic text-2xl font-bold rounded-xl shadow-md border border-amber-200 animate-in zoom-in-50 duration-150"
                        >
                          {lt}
                        </span>
                      ))
                    )}
                  </div>

                  {spellingQuizState.isCorrect !== null && (
                    <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-center gap-2 text-xs">
                      {spellingQuizState.isCorrect ? (
                        <span className="text-emerald-400 font-bold flex items-center gap-1.5 animate-in fade-in">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Mumtaz! Ejaan ortografimu sangat akurat (+35 XP • +7 Poin Kitabah)</span>
                        </span>
                      ) : (
                        <span className="text-rose-400 font-bold flex items-center gap-1.5 animate-in fade-in">
                          <AlertTriangle className="w-4 h-4 text-rose-400" />
                          <span>Ejaan belum tepat. Perhatikan kaidah sambung dan harakatnya!</span>
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Pieces Bank (Arabic Letter Pieces) */}
                <div>
                  <span className="text-[11px] text-amber-200 font-bold block mb-2">Pilih Kepingan Huruf:</span>
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    {[...currentDrill.lettersBroken, ...currentDrill.distractors]
                      .sort(() => 0.5 - Math.random())
                      .map((char, i) => (
                        <button
                          key={i}
                          onClick={() => handleAddLetterToDrill(char)}
                          disabled={spellingQuizState.isCorrect === true}
                          className="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 active:scale-95 text-white font-arabic text-2xl font-bold border border-white/20 transition-all disabled:opacity-40 shadow-xs"
                        >
                          {char}
                        </button>
                      ))}
                  </div>
                </div>

                {/* Pedagogical Rule Box */}
                <div className="bg-amber-500/15 border border-amber-400/40 rounded-2xl p-3 text-xs flex items-start gap-2.5">
                  <Compass className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-amber-200 block text-xs">Kaidah Imla' Kata Ini:</strong>
                    <span className="text-slate-200 text-[11px] leading-relaxed">{currentDrill.spellingRule}</span>
                  </div>
                </div>
              </div>

              {/* Navigation Bar */}
              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => {
                    setSelectedDrillIdx(prev => Math.max(0, prev - 1));
                    handleResetDrill();
                  }}
                  disabled={selectedDrillIdx === 0}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs disabled:opacity-40 transition-all"
                >
                  Kata Sebelumnya
                </button>
                <button
                  onClick={() => {
                    setSelectedDrillIdx(prev => Math.min(filteredDrills.length - 1, prev + 1));
                    handleResetDrill();
                  }}
                  disabled={selectedDrillIdx >= filteredDrills.length - 1}
                  className="px-4 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs disabled:opacity-40 flex items-center gap-1 transition-all shadow-xs"
                >
                  <span>Kata Berikutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: SPELLING WORKSHOP (BENGKEL 10 KAIDAH EMAS) */}
          {activeTab === 'spelling_rules' && (
            <div className="space-y-4">
              <div className="bg-amber-50 rounded-2xl p-3.5 border border-amber-200 flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-amber-700" />
                    <span>Bengkel 10 Kaidah Emas Ejaan Arab (Dhabthul Imla')</span>
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Kuasai aturan ejaan ortografi Arab paling krusial dari tingkat dasar hingga mahir dengan trik praktis Hudhud.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {COMPREHENSIVE_SPELLING_RULES.map((rule) => (
                  <div
                    key={rule.id}
                    className="bg-white border-2 border-amber-300/80 hover:border-amber-400 rounded-3xl p-4 shadow-xs space-y-3 flex flex-col justify-between transition-all"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2 border-b border-amber-100 pb-2">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-amber-100 text-amber-900">
                              {rule.levelTarget}
                            </span>
                            <span className="text-[10px] font-bold text-slate-500">
                              {rule.category}
                            </span>
                          </div>
                          <h4 className="font-black text-sm text-slate-900 mt-1">{rule.title}</h4>
                        </div>
                        <span className="font-arabic text-sm font-bold text-amber-800 shrink-0 text-right">
                          {rule.titleAr}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 leading-snug">{rule.conceptSummary}</p>

                      <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200 text-xs">
                        <span className="text-[10px] font-bold text-amber-800 uppercase block mb-0.5">Rumus Kaidah:</span>
                        <code className="text-amber-950 font-bold text-xs">{rule.ruleFormula}</code>
                      </div>

                      <div className="space-y-1.5">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                          Contoh Kontras Ejaan:
                        </span>
                        <div className="space-y-1.5">
                          {rule.contrastExamples.map((ex, i) => (
                            <div key={i} className="bg-slate-50 rounded-xl p-2.5 border border-slate-200 text-xs space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="text-emerald-700 font-bold flex items-center gap-1 font-arabic text-base">
                                  ✓ {ex.correct}
                                </span>
                                <span className="text-rose-500 font-bold line-through font-arabic text-sm">
                                  ✗ {ex.incorrect}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-600 leading-tight">{ex.explanation}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="bg-amber-500/10 rounded-xl p-2 border border-amber-300/40 text-[11px] text-amber-900 font-medium">
                      💡 {rule.hudhudSecret}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: POSTCARD STUDIO (KARTU POS & KORESPONDENSI) */}
          {activeTab === 'postcard_studio' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-extrabold text-sm text-slate-900">Studio Kartu Pos & Korespondensi Pelabuhan</h3>
                <p className="text-xs text-slate-500">
                  Rangkai warkat ucapan Arab indah dengan ejaan rapi, pilih penerima dan salam tambahan, lalu kirimkan!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Templates Selector */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-700 block">Pilih Template Warkat:</span>
                  {POSTCARD_TEMPLATES_PROG.map((tmpl, idx) => (
                    <div
                      key={tmpl.id}
                      onClick={() => {
                        setSelectedPostcardIdx(idx);
                        setRecipientName(tmpl.recipientDefault);
                        setExtraPhrase('');
                      }}
                      className={`p-3 rounded-2xl border-2 cursor-pointer transition-all ${
                        selectedPostcardIdx === idx
                          ? 'border-amber-500 bg-amber-50 shadow-xs ring-2 ring-amber-400/30'
                          : 'border-slate-200 bg-white hover:border-amber-300'
                      }`}
                    >
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                        {tmpl.occasion}
                      </span>
                      <h4 className="font-bold text-xs text-slate-900 mt-1">{tmpl.title}</h4>
                    </div>
                  ))}
                </div>

                {/* Postcard Envelope & Content Preview */}
                <div className="md:col-span-2 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 border-2 border-amber-400 rounded-3xl p-5 shadow-md space-y-4 relative">
                  <div className="flex items-start justify-between border-b border-amber-200 pb-2">
                    <div>
                      <span className="text-[10px] font-bold text-amber-800 uppercase tracking-widest block">
                        Warkat Pelabuhan Kitabah
                      </span>
                      <h4 className="font-black text-sm text-slate-900">{currentPostcard.title}</h4>
                    </div>
                    <span className="text-3xl">💌</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700 block">Nama Penerima Surat:</label>
                      <input
                        type="text"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs rounded-xl border border-amber-300 bg-white font-bold text-slate-900 focus:outline-amber-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700 block">Tambah Frasa Doa Penutup:</label>
                      <select
                        value={extraPhrase}
                        onChange={(e) => setExtraPhrase(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs rounded-xl border border-amber-300 bg-white font-bold text-slate-900 focus:outline-amber-500"
                      >
                        <option value="">(Tanpa frasa tambahan)</option>
                        {currentPostcard.customPhrases.map((phrase, i) => (
                          <option key={i} value={phrase}>{phrase}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="bg-white/90 rounded-2xl p-5 border border-amber-200 text-center space-y-2 shadow-inner">
                    <span className="text-xs font-bold text-amber-800 block">
                      إِلَى: {recipientName}
                    </span>
                    <h3 className="font-arabic text-2xl sm:text-3xl font-bold text-amber-950 leading-relaxed py-1">
                      {currentPostcard.contentAr}
                    </h3>
                    {extraPhrase && (
                      <p className="font-arabic text-xl font-bold text-amber-800">
                        {extraPhrase}
                      </p>
                    )}
                    <p className="text-xs text-slate-600 italic mt-2">
                      &ldquo;{currentPostcard.translit}&rdquo;
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Artinya: {currentPostcard.meaning}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => handlePlayAudio(currentPostcard.contentAr)}
                      className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-xs"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Dengarkan Lafal Surat
                    </button>

                    <button
                      onClick={handleSendPostcard}
                      disabled={isPostcardSent}
                      className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black rounded-xl text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isPostcardSent ? 'Warkat Terkirim! ✨' : 'Kirim Warkat (+45 XP)'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: KHAT ART (SENI KHATH & SATR) */}
          {activeTab === 'khat_art' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-extrabold text-sm text-slate-900">Seni Khath Naskh & Garis Satr Buku Tulis</h3>
                <p className="text-xs text-slate-500">
                  Panduan proporsi anatomis pena qalam dalam menulis huruf Arab di atas dan di bawah garis buku.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-white rounded-3xl p-4 border-2 border-amber-300 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
                    <PenTool className="w-4 h-4 text-amber-600" />
                    <span>Huruf yang Selalu Berada di Atas Garis Satr:</span>
                  </div>
                  <div className="font-arabic text-3xl font-bold text-amber-800 text-center py-2 bg-amber-50 rounded-2xl border border-amber-200">
                    أ  ب  ت  ث  ط  ظ  ك  لَا
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Huruf-huruf ini bertumpu kokoh di atas garis buku dan tidak pernah menembus turun ke bawah garis dasar (satr).
                  </p>
                </div>

                <div className="bg-white rounded-3xl p-4 border-2 border-amber-300 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
                    <PenTool className="w-4 h-4 text-amber-600" />
                    <span>Huruf yang Ekornya Menembus ke Bawah Garis:</span>
                  </div>
                  <div className="font-arabic text-3xl font-bold text-amber-800 text-center py-2 bg-amber-50 rounded-2xl border border-amber-200">
                    ج  ح  خ  ر  ز  س  ش  ص  ض  ع  غ  ق  ل  م  ن  و  ي
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Huruf-huruf ini memiliki lekukan ekor melingkar (*ka's* atau *dzail*) yang turun secara proporsional ke bawah garis satr.
                  </p>
                </div>
              </div>

              {/* Anatomy of Qalam Nib */}
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-3xl p-4 border border-amber-200 space-y-2">
                <h4 className="font-black text-xs text-amber-900 flex items-center gap-1.5">
                  <Palette className="w-4 h-4 text-amber-700" />
                  <span>Kaidah Sudut Kemiringan Pena Khath Naskh</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Pena kaligrafi dipegang pada sudut <strong>45 derajat</strong> terhadap garis buku. 
                  Ukuran ketebalan huruf diukur dengan <em>nuqath</em> (titik belah ketupat pena). Alif pada khath Naskh setinggi 5 titik nuqath, sedangkan lekukan huruf Ba selebar 5 titik nuqath.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Quick Launch Bar */}
        <div className="bg-amber-50 border-t border-amber-200 p-3 sm:p-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-extrabold text-slate-800">Mini-Game Pelabuhan:</span>
            <span className="bg-amber-200 text-amber-950 font-black px-2 py-0.5 rounded-lg text-[11px]">
              💎 {island.crystalName}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onLaunchGame('basket_spell')}
              className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs rounded-xl border border-slate-300 transition-all flex items-center gap-1"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-600" />
              <span>Basket Spell</span>
            </button>
            <button
              onClick={() => onLaunchGame('imla_lighthouse')}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black text-xs rounded-xl shadow-md active:scale-95 transition-all flex items-center gap-1.5"
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Mercusuar Imla'</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
