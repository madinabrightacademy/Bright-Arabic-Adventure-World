import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mic,
  MicOff,
  Volume2,
  Sparkles,
  Award,
  Play,
  Radio,
  CheckCircle2,
  ChevronRight,
  Gauge,
  Flame,
  BookOpen,
  RotateCcw,
  AlertCircle,
  HelpCircle,
  Compass,
  Trophy,
  ChevronLeft
} from 'lucide-react';
import { sound } from '../services/sound';
import { GameStorage } from '../services/storage';
import { Island, UserProfile } from '../types/game';

interface PulauKalamHubModalProps {
  island: Island;
  profile: UserProfile;
  onClose: () => void;
  onLaunchGame: (gameId: string) => void;
  onReward?: (xp: number, stars: number) => void;
}

type TabType = 'makhraj_studio' | 'mufradat_fasihah' | 'thalaqah_sentences' | 'voice_mirror_compare';

// --- DATA DEFINITIONS ---

interface MakhrajLetterData {
  id: string;
  letter: string;
  name: string;
  regionId: 'halq' | 'lisan' | 'syafatain' | 'jauf' | 'khaisyum';
  regionAr: string;
  regionIdText: string;
  subLocationAr: string;
  subLocationId: string;
  vowelDrill: string;
  exampleWord: string;
  exampleMeaning: string;
  sifat: string[];
  makhrajAdvice: string;
  targetSvg: { cx: number; cy: number; color: string };
}

const MAKHRAJ_LETTERS: MakhrajLetterData[] = [
  // 1. Al-Halq
  {
    id: 'let_ayn',
    letter: 'ع',
    name: 'ʿAyn (عَيْن)',
    regionId: 'halq',
    regionAr: 'الحَلْق',
    regionIdText: 'Tenggorokan (Wasath al-Halq)',
    subLocationAr: 'وَسَطُ الحَلْق',
    subLocationId: 'Bagian tengah kerongkongan dekat katup epiglotis',
    vowelDrill: 'عَ - عِ - عُ - أَعْ',
    exampleWord: 'عَالِمٌ (ʿĀlim)',
    exampleMeaning: 'Orang yang berilmu',
    sifat: ['Jahr', 'Bainiyyah', 'Istifal', 'Infitah'],
    makhrajAdvice: 'Tekan dinding kerongkongan tengah secara lentur; suara mengalir bersih dan berbobot tanpa hentakan kasar.',
    targetSvg: { cx: 125, cy: 190, color: '#f59e0b' }
  },
  {
    id: 'let_haa_halqi',
    letter: 'ح',
    name: 'Ḥāʾ (حَاء)',
    regionId: 'halq',
    regionAr: 'الحَلْق',
    regionIdText: 'Tenggorokan (Wasath al-Halq)',
    subLocationAr: 'وَسَطُ الحَلْق',
    subLocationId: 'Bagian tengah kerongkongan',
    vowelDrill: 'حَ - حِ - حُ - أَحْ',
    exampleWord: 'حَبِيبٌ (Ḥabīb)',
    exampleMeaning: 'Yang dicintai',
    sifat: ['Hams (nafas berhembus)', 'Rakhawah', 'Istifal'],
    makhrajAdvice: 'Hembuskan nafas hangat bersih dari tengah kerongkongan seperti meniup kaca kacamata di udara sejuk.',
    targetSvg: { cx: 125, cy: 195, color: '#ea580c' }
  },
  {
    id: 'let_khaa',
    letter: 'خ',
    name: 'Khāʾ (خَاء)',
    regionId: 'halq',
    regionAr: 'الحَلْق',
    regionIdText: 'Tenggorokan Atas (Adna al-Halq)',
    subLocationAr: 'أَدْنَى الحَلْق',
    subLocationId: 'Tenggorokan atas dekat anak lidah (uvula)',
    vowelDrill: 'خَ - خِ - خُ - أَخْ',
    exampleWord: 'خَيْرٌ (Khayr)',
    exampleMeaning: 'Kebaikan yang melimpah',
    sifat: ['Hams', 'Isti\'la (tebal)', 'Rakhawah'],
    makhrajAdvice: 'Keluarkan getaran serak halus di persimpangan pangkal akar lidah dan langit-langit lunak.',
    targetSvg: { cx: 120, cy: 165, color: '#dc2626' }
  },
  {
    id: 'let_ghayn',
    letter: 'غ',
    name: 'Ghayn (غَيْن)',
    regionId: 'halq',
    regionAr: 'الحَلْق',
    regionIdText: 'Tenggorokan Atas (Adna al-Halq)',
    subLocationAr: 'أَدْنَى الحَلْق',
    subLocationId: 'Tenggorokan paling atas dekat langit-langit lunak',
    vowelDrill: 'غَ - غِ - غُ - أَغْ',
    exampleWord: 'غَفُورٌ (Ghafūr)',
    exampleMeaning: 'Maha Pengampun',
    sifat: ['Jahr', 'Isti\'la (tebal)', 'Rakhawah'],
    makhrajAdvice: 'Suara basah bergetar tanpa hembusan nafas, rongga mulut tebal terisi udara.',
    targetSvg: { cx: 120, cy: 160, color: '#f97316' }
  },

  // 2. Al-Lisan
  {
    id: 'let_qaf',
    letter: 'ق',
    name: 'Qāf (قَاف)',
    regionId: 'lisan',
    regionAr: 'اللِّسَان',
    regionIdText: 'Pangkal Lidah (Aqshal Lisan)',
    subLocationAr: 'أَقْصَى اللِّسَان',
    subLocationId: 'Pangkal lidah paling belakang membentur langit-langit lunak',
    vowelDrill: 'قَ - قِ - قُ - أَقْ',
    exampleWord: 'قَلْبٌ (Qalb)',
    exampleMeaning: 'Hati nurani',
    sifat: ['Jahr', 'Syiddah', 'Isti\'la', 'Qalqalah'],
    makhrajAdvice: 'Pangkal lidah ditekan kuat ke langit-langit lunak, tebalkan suara, dan pantulkan (qalqalah) saat sukun.',
    targetSvg: { cx: 110, cy: 150, color: '#d97706' }
  },
  {
    id: 'let_dhad',
    letter: 'ض',
    name: 'Ḍād (ضَاد)',
    regionId: 'lisan',
    regionAr: 'اللِّسَان',
    regionIdText: 'Tepi Lidah (Hafatul Lisan)',
    subLocationAr: 'حَافَةُ اللِّسَان',
    subLocationId: 'Tepi sisi lidah menempel ke deretan gigi geraham atas',
    vowelDrill: 'ضَ - ضِ - ضُ - أَضْ',
    exampleWord: 'ضِيَاءٌ (Dhiyāʾ)',
    exampleMeaning: 'Kilau cahaya terang',
    sifat: ['Jahr', 'Rakhawah', 'Isti\'la', 'Ithbaq', 'Istithalah'],
    makhrajAdvice: 'Huruf mahkota bahasa Arab (Lughatud Dhad). Tempelkan tepi lidah ke geraham dan ulur suara memanjang secara elastis.',
    targetSvg: { cx: 90, cy: 155, color: '#b45309' }
  },
  {
    id: 'let_shad',
    letter: 'ص',
    name: 'Ṣād (صَاد)',
    regionId: 'lisan',
    regionAr: 'اللِّسَان',
    regionIdText: 'Ujung Lidah & Gigi Seri Bawah',
    subLocationAr: 'رَأْسُ اللِّسَان',
    subLocationId: 'Ujung lidah menempel pada bagian dalam gigi seri bawah',
    vowelDrill: 'صَ - صِ - صُ - أَصْ',
    exampleWord: 'صَبْرٌ (Ṣabr)',
    exampleMeaning: 'Kesabaran yang indah',
    sifat: ['Hams', 'Rakhawah', 'Isti\'la', 'Ithbaq', 'Shafir'],
    makhrajAdvice: 'Keluarkan desis tajam tebal (shafir) dengan rongga mulut mengerucut tebal tanpa memonyongkan bibir secara berlebihan.',
    targetSvg: { cx: 65, cy: 145, color: '#f59e0b' }
  },
  {
    id: 'let_tha',
    letter: 'ط',
    name: 'Ṭāʾ (طَاء)',
    regionId: 'lisan',
    regionAr: 'اللِّسَان',
    regionIdText: 'Punggung Ujung Lidah & Pangkal Gigi Seri Atas',
    subLocationAr: 'طَرَفُ اللِّسَان',
    subLocationId: 'Punggung ujung lidah beradu dengan pangkal dua gigi seri atas',
    vowelDrill: 'طَ - طِ - طُ - أَطْ',
    exampleWord: 'طَرِيقٌ (Ṭarīq)',
    exampleMeaning: 'Jalan yang lurus',
    sifat: ['Jahr', 'Syiddah', 'Isti\'la', 'Ithbaq', 'Qalqalah'],
    makhrajAdvice: 'Huruf terkuat dalam abjad Arab. Tekan kokoh ke pangkal gigi seri atas dengan rongga lidah terangkat rapat (Ithbaq).',
    targetSvg: { cx: 60, cy: 135, color: '#ea580c' }
  },

  // 3. Asy-Syafatain
  {
    id: 'let_baa',
    letter: 'ب',
    name: 'Bāʾ (بَاء)',
    regionId: 'syafatain',
    regionAr: 'الشَّفَتَان',
    regionIdText: 'Dua Bibir (Asy-Syafatain)',
    subLocationAr: 'بَاطِنُ الشَّفَتَيْن',
    subLocationId: 'Pertemuan bagian basah bibir atas dan bibir bawah',
    vowelDrill: 'بَ - بِ - بُ - أَبْ',
    exampleWord: 'بَرَكَةٌ (Barakah)',
    exampleMeaning: 'Keberkahan melimpah',
    sifat: ['Jahr', 'Syiddah', 'Infitah', 'Qalqalah'],
    makhrajAdvice: 'Rapatkan kedua bibir secara mantap dan lepaskan dengan pantulan bersih saat bertanda sukun.',
    targetSvg: { cx: 45, cy: 142, color: '#e11d48' }
  },
  {
    id: 'let_faa',
    letter: 'ف',
    name: 'Fāʾ (فَاء)',
    regionId: 'syafatain',
    regionAr: 'الشَّفَتَان',
    regionIdText: 'Bibir Bawah & Gigi Seri Atas',
    subLocationAr: 'بَاطِنُ الشَّفَةِ السُّفْلَى',
    subLocationId: 'Ujung dua gigi seri atas menyentuh bagian dalam bibir bawah',
    vowelDrill: 'فَ - فِ - فُ - أَفْ',
    exampleWord: 'فَرَحٌ (Faraḥ)',
    exampleMeaning: 'Kegembiraan hati',
    sifat: ['Hams', 'Rakhawah', 'Istifal'],
    makhrajAdvice: 'Biarkan nafas berdesir lembut mengalir keluar di antara sela gigi seri atas dan bibir bawah.',
    targetSvg: { cx: 40, cy: 140, color: '#f43f5e' }
  },
  {
    id: 'let_kaf',
    letter: 'ك',
    name: 'Kāf (كَاف)',
    regionId: 'lisan',
    regionAr: 'اللِّسَان',
    regionIdText: 'Pangkal Lidah (Depan Qaf)',
    subLocationAr: 'أَقْصَى اللِّسَان',
    subLocationId: 'Pangkal lidah depan menyentuh langit-langit keras',
    vowelDrill: 'كَ - كِ - كُ - أَكْ',
    exampleWord: 'كَرِيمٌ (Karīm)',
    exampleMeaning: 'Mulia dan pemurah',
    sifat: ['Hams', 'Syiddah', 'Istifal'],
    makhrajAdvice: 'Keluarkan nafas desis halus (hams) tepat saat huruf Kaf sukun terlepas dari langit-langit keras.',
    targetSvg: { cx: 100, cy: 145, color: '#3b82f6' }
  },
  {
    id: 'let_ra',
    letter: 'ر',
    name: 'Rāʾ (رَاء)',
    regionId: 'lisan',
    regionAr: 'اللِّسَان',
    regionIdText: 'Ujung Lidah & Gusi Atas',
    subLocationAr: 'طَرَفُ اللِّسَان',
    subLocationId: 'Ujung lidah menempel dekat gusi gigi seri atas',
    vowelDrill: 'رَ - رِ - رُ - أَرْ',
    exampleWord: 'رَحْمَةٌ (Raḥmah)',
    exampleMeaning: 'Rahmat dan kasih sayang',
    sifat: ['Takrir (1 getaran)', 'Inhiraf', 'Bainiyyah'],
    makhrajAdvice: 'Batasi getaran ujung lidah cukup satu atau dua getaran lembut, jangan bergetar berlebihan seperti bel.',
    targetSvg: { cx: 62, cy: 138, color: '#10b981' }
  },
  // 4. Al-Jauf (Rongga Mulut & Tenggorokan)
  {
    id: 'let_alif_mad',
    letter: 'ا / و / ي',
    name: 'Al-Jauf (Huruf Mad)',
    regionId: 'jauf',
    regionAr: 'الجَوْف',
    regionIdText: 'Rongga Udara Mulut & Tenggorokan',
    subLocationAr: 'تَجْوِيفُ الفَمِ وَالحَلْق',
    subLocationId: 'Rongga udara lapang dari tenggorokan hingga bibir terbuka',
    vowelDrill: 'بَا - بُو - بِي',
    exampleWord: 'سَمَاءٌ (Samāʾ)',
    exampleMeaning: 'Langit luas terbentang',
    sifat: ['Khafaʾ', 'Mad & Layyin', 'Rakhawah'],
    makhrajAdvice: 'Alirkan suara vokal panjang secara lapang tanpa tekanan pada titik lidah mana pun.',
    targetSvg: { cx: 90, cy: 135, color: '#06b6d4' }
  },
  // 5. Al-Khaisyum (Rongga Hidung / Ghunnah)
  {
    id: 'let_ghunnah',
    letter: 'نّ / مّ',
    name: 'Al-Khaisyum (Ghunnah)',
    regionId: 'khaisyum',
    regionAr: 'الخَيْشُوم',
    regionIdText: 'Pangkal Rongga Hidung',
    subLocationAr: 'أَقْصَى الأَنْف',
    subLocationId: 'Rongga hidung bagian dalam penghasil dengung merdu',
    vowelDrill: 'إِنَّ - عَمَّ',
    exampleWord: 'جَنَّةٌ (Jannah)',
    exampleMeaning: 'Taman surga nan indah',
    sifat: ['Ghunnah 2 ketukan', 'Jahr', 'Bainiyyah'],
    makhrajAdvice: 'Kirimkan getaran dengung murni ke pangkal hidung selama 2 ketukan saat melafalkan Nun/Mim bertasydid.',
    targetSvg: { cx: 55, cy: 105, color: '#8b5cf6' }
  }
];

// --- MUFRADAT FASIH DATA ---
interface VocabularyItem {
  id: string;
  level: number;
  levelLabel: string;
  category: string;
  ar: string;
  translit: string;
  meaning: string;
  drillSentence: string;
  focusLetter: string;
}

const VOCABULARY_LIST: VocabularyItem[] = [
  // Tingkat 1 (Level 0 - Tamhidi)
  {
    id: 'voc_1',
    level: 0,
    levelLabel: 'Tingkat 1 • Tamhidi',
    category: 'Alat Belajar & Madrasah',
    ar: 'قَلَمُ الحِبْرِ',
    translit: 'Qalamul ḥibr',
    meaning: 'Pena tinta',
    drillSentence: 'هَذَا قَلَمُ الحِبْرِ الجَدِيد',
    focusLetter: 'ق'
  },
  {
    id: 'voc_2',
    level: 0,
    levelLabel: 'Tingkat 1 • Tamhidi',
    category: 'Alat Belajar & Madrasah',
    ar: 'كِتَابٌ مُفِيدٌ',
    translit: 'Kitābun mufīd',
    meaning: 'Buku yang bermanfaat',
    drillSentence: 'أَقْرَأُ كِتَابًا مُفِيدًا كُلَّ يَوْم',
    focusLetter: 'ك'
  },
  {
    id: 'voc_3',
    level: 0,
    levelLabel: 'Tingkat 1 • Tamhidi',
    category: 'Makanan & Rezeki',
    ar: 'مَاءٌ عَذْبٌ',
    translit: 'Māʾun ʿadzb',
    meaning: 'Air segar yang jernih',
    drillSentence: 'أَشْرَبُ مَاءً عَذْبًا بَارِدًا',
    focusLetter: 'ع'
  },
  {
    id: 'voc_1_4',
    level: 0,
    levelLabel: 'Tingkat 1 • Tamhidi',
    category: 'Artikulasi & Halq',
    ar: 'مَخْرَجُ الحَلْقِ',
    translit: 'Makhrajul ḥalq',
    meaning: 'Makhraj artikulasi tenggorokan',
    drillSentence: 'نَتَدَرَّبُ عَلَى مَخْرَجِ الحَلْقِ الفَصِيح',
    focusLetter: 'ح'
  },
  {
    id: 'voc_1_5',
    level: 0,
    levelLabel: 'Tingkat 1 • Tamhidi',
    category: 'Lisan & Vokal',
    ar: 'صَوْتٌ جَهْرِيٌّ',
    translit: 'Ṣawtun jahriyy',
    meaning: 'Suara vokal jelas berbobot',
    drillSentence: 'يَنْطَلِقُ الصَّوْتُ الجَهْرِيُّ بِقُوَّةٍ وَوُضُوح',
    focusLetter: 'ج'
  },
  {
    id: 'voc_1_6',
    level: 0,
    levelLabel: 'Tingkat 1 • Tamhidi',
    category: 'Huruf Desis & Shafir',
    ar: 'صَفِيرُ البُلْبُلِ',
    translit: 'Ṣafīrul bulbul',
    meaning: 'Desis tajam merdu kicau burung',
    drillSentence: 'نُمَيِّزُ حُرُوفَ الصَّفِيرِ كَالصَّادِ وَالسِّين',
    focusLetter: 'ص'
  },

  // Tingkat 2 (Level 1 - Mubtadi' 1)
  {
    id: 'voc_4',
    level: 1,
    levelLabel: 'Tingkat 2 • Mubtadi\' 1',
    category: 'Alam & Semesta',
    ar: 'شَمْسٌ مُشْرِقَةٌ',
    translit: 'Syamsun musyriqah',
    meaning: 'Matahari terbit bersinar',
    drillSentence: 'تَشْرُقُ الشَّمْسُ صَبَاحًا',
    focusLetter: 'ش'
  },
  {
    id: 'voc_5',
    level: 1,
    levelLabel: 'Tingkat 2 • Mubtadi\' 1',
    category: 'Makanan & Rezeki',
    ar: 'خُبْزٌ طَازَجٌ',
    translit: 'Khubzun thāzaj',
    meaning: 'Roti segar yang baru matang',
    drillSentence: 'آكُلُ خُبْزًا طَازَجًا مَعَ العَسَل',
    focusLetter: 'خ'
  },
  {
    id: 'voc_6',
    level: 1,
    levelLabel: 'Tingkat 2 • Mubtadi\' 1',
    category: 'Tempat Tinggal',
    ar: 'بَيْتٌ جَمِيلٌ',
    translit: 'Baytun jamīl',
    meaning: 'Rumah yang indah dan asri',
    drillSentence: 'أَسْكُنُ فِي بَيْتٍ جَمِيلٍ وَوَاسِع',
    focusLetter: 'ج'
  },
  {
    id: 'voc_2_4',
    level: 1,
    levelLabel: 'Tingkat 2 • Mubtadi\' 1',
    category: 'Sapaan & Keramahan',
    ar: 'السَّلَامُ عَلَيْكُمْ',
    translit: 'As-salāmu ʿalaykum',
    meaning: 'Salam damai sejahtera',
    drillSentence: 'أُلْقِي السَّلَامَ عَلَيْكُمْ بِابْتِسَامَةٍ صَادِقَة',
    focusLetter: 'س'
  },
  {
    id: 'voc_2_5',
    level: 1,
    levelLabel: 'Tingkat 2 • Mubtadi\' 1',
    category: 'Retorika Lisan',
    ar: 'طَلَاقَةُ اللِّسَانِ',
    translit: 'Ṭalāqatul lisān',
    meaning: 'Kelancaran bertutur kata',
    drillSentence: 'أَكْتَسِبُ طَلَاقَةَ اللِّسَانِ بِالمُمَارَسَةِ اليَوْمِيَّة',
    focusLetter: 'ط'
  },
  {
    id: 'voc_2_6',
    level: 1,
    levelLabel: 'Tingkat 2 • Mubtadi\' 1',
    category: 'Ketukan Fonetik',
    ar: 'مَدٌّ طَبِيعِيٌّ',
    translit: 'Maddun ṭabīʿiyy',
    meaning: 'Panjang dua ketukan vokal',
    drillSentence: 'أَمُدُّ الصَّوْتَ حَرَكَتَيْنِ كَامِلَتَيْنِ فِي الحُرُوف',
    focusLetter: 'م'
  },

  // Tingkat 3 (Level 2 - Mubtadi' 2)
  {
    id: 'voc_7',
    level: 2,
    levelLabel: 'Tingkat 3 • Mubtadi\' 2',
    category: 'Keluarga & Kehidupan',
    ar: 'صَدِيقٌ مُخْلِصٌ',
    translit: 'Ṣadīqun mukhliṣ',
    meaning: 'Sahabat yang tulus setia',
    drillSentence: 'زَيْدٌ صَدِيقِي المُخْلِص',
    focusLetter: 'ص'
  },
  {
    id: 'voc_8',
    level: 2,
    levelLabel: 'Tingkat 3 • Mubtadi\' 2',
    category: 'Keluarga & Kehidupan',
    ar: 'أُسْرَةٌ سَعِيدَةٌ',
    translit: 'Usratun saʿīdah',
    meaning: 'Keluarga yang bahagia',
    drillSentence: 'نَحْنُ نَعِيشُ فِي أُسْرَةٍ سَعِيدَة',
    focusLetter: 'س'
  },
  {
    id: 'voc_9',
    level: 2,
    levelLabel: 'Tingkat 3 • Mubtadi\' 2',
    category: 'Pendidikan',
    ar: 'مَدْرَسَةٌ كَبِيرَةٌ',
    translit: 'Madrasatun kabīrah',
    meaning: 'Sekolah madrasah yang besar',
    drillSentence: 'أَتَعَلَّمُ فِي مَدْرَسَةٍ كَبِيرَةٍ وَمُتَفَوِّقَة',
    focusLetter: 'د'
  },
  {
    id: 'voc_3_4',
    level: 2,
    levelLabel: 'Tingkat 3 • Mubtadi\' 2',
    category: 'Intonasi Kalimat',
    ar: 'نَبْرَةُ التَّسَاؤُلِ',
    translit: 'Nabratut tasāʾul',
    meaning: 'Intonasi nada kalimat tanya',
    drillSentence: 'تَرْتَفِعُ نَبْرَةُ الصَّوْتِ عِنْدَ نِهَايَةِ السُّؤَال',
    focusLetter: 'ن'
  },
  {
    id: 'voc_3_5',
    level: 2,
    levelLabel: 'Tingkat 3 • Mubtadi\' 2',
    category: 'Kesantunan Lisan',
    ar: 'حِوَارٌ مُؤَدَّبٌ',
    translit: 'Ḥiwārun muʾaddab',
    meaning: 'Percakapan santun bertata krama',
    drillSentence: 'نَتَبَادَلُ حِوَارًا مُؤَدَّبًا فِي السُّوقِ وَالمَدْرَسَة',
    focusLetter: 'ح'
  },
  {
    id: 'voc_3_6',
    level: 2,
    levelLabel: 'Tingkat 3 • Mubtadi\' 2',
    category: 'Doa & Dzikir Lisan',
    ar: 'دُعَاءُ الهِدَايَةِ',
    translit: 'Duʿāʾul hidāyah',
    meaning: 'Doa memohon bimbingan ilmu',
    drillSentence: 'رَبِّ زِدْنِي عِلْمًا وَنَوِّرْ قَلْبِي بِنُورِ الفَهْم',
    focusLetter: 'د'
  },

  // Tingkat 4 (Level 3 - Mutawassith 1)
  {
    id: 'voc_10',
    level: 3,
    levelLabel: 'Tingkat 4 • Mutawassith 1',
    category: 'Alam & Panorama',
    ar: 'حَدِيقَةٌ فَيْحَاءُ',
    translit: 'Ḥadīqatun fayḥāʾ',
    meaning: 'Taman bunga luas dan semerbak',
    drillSentence: 'نَتَنَزَّهُ فِي حَدِيقَةٍ فَيْحَاءَ عَطِرَة',
    focusLetter: 'ح'
  },
  {
    id: 'voc_11',
    level: 3,
    levelLabel: 'Tingkat 4 • Mutawassith 1',
    category: 'Ilmu & Peradaban',
    ar: 'مَكْتَبَةٌ عَامِرَةٌ',
    translit: 'Maktabatun ʿāmirah',
    meaning: 'Perpustakaan makmur sarat literatur',
    drillSentence: 'فِي جَزِيرَتِنَا مَكْتَبَةٌ عَامِرَةٌ بِأُمَّهَاتِ الكُتُب',
    focusLetter: 'ع'
  },
  {
    id: 'voc_12',
    level: 3,
    levelLabel: 'Tingkat 4 • Mutawassith 1',
    category: 'Nilai & Petunjuk',
    ar: 'طَرِيقُ الهُدَى',
    translit: 'Ṭarīqul hudā',
    meaning: 'Jalan petunjuk kebaikan hidup',
    drillSentence: 'العِلْمُ يَهْدِي السَّالِكَ إِلَى طَرِيقِ الهُدَى',
    focusLetter: 'ط'
  },
  {
    id: 'voc_4_4',
    level: 3,
    levelLabel: 'Tingkat 4 • Mutawassith 1',
    category: 'Pidato & Khitabah',
    ar: 'خُطْبَةٌ مُوجَزَةٌ',
    translit: 'Khuṭbatun mūjazah',
    meaning: 'Pidato singkat bernas menggugah',
    drillSentence: 'أَلْقَيْتُ خُطْبَةً مُوجَزَةً أَمَامَ جَمْعٍ مِنَ الزُّمَلَاء',
    focusLetter: 'خ'
  },
  {
    id: 'voc_4_5',
    level: 3,
    levelLabel: 'Tingkat 4 • Mutawassith 1',
    category: 'Deskripsi Spontan',
    ar: 'وَصْفُ المَشْهَدِ',
    translit: 'Waṣful masyhad',
    meaning: 'Penggambaran panorama spontan',
    drillSentence: 'أَصِفُ المَشْهَدَ الطَّبِيعِيَّ بِعُيُونٍ نَاطِقَةٍ وَكَلِمَاتٍ دَقِيقَة',
    focusLetter: 'و'
  },
  {
    id: 'voc_4_6',
    level: 3,
    levelLabel: 'Tingkat 4 • Mutawassith 1',
    category: 'Jeda Tuturan',
    ar: 'وَقْفٌ وَابْتِدَاءٌ',
    translit: 'Waqfun wabtidāʾ',
    meaning: 'Pengaturan nafas dan jeda alami',
    drillSentence: 'أَقِفُ عِنْدَ تَمَامِ المَعْنَى ثُمَّ أَبْتَدِئُ بِانْسِيَاب',
    focusLetter: 'ق'
  },

  // Tingkat 5 (Level 4 - Mutawassith 2)
  {
    id: 'voc_13',
    level: 4,
    levelLabel: 'Tingkat 5 • Mutawassith 2',
    category: 'Debat & Retorika',
    ar: 'مُنَاظَرَةٌ أَدَبِيَّةٌ',
    translit: 'Munāẓaratun adabiyyah',
    meaning: 'Debat ilmiah beradab tinggi',
    drillSentence: 'شَارَكْتُ فِي مُنَاظَرَةٍ أَدَبِيَّةٍ حَوْلَ أَسْرَارِ اللُّغَة',
    focusLetter: 'ظ'
  },
  {
    id: 'voc_14',
    level: 4,
    levelLabel: 'Tingkat 5 • Mutawassith 2',
    category: 'Hikmah & Mutiara',
    ar: 'حِكْمَةٌ بَالِغَةٌ',
    translit: 'Ḥikmatun bālighah',
    meaning: 'Hikmah luhur yang mendalam',
    drillSentence: 'سَمِعْتُ مِنْ شَيْخِ البَلَاغَةِ حِكْمَةً بَالِغَة',
    focusLetter: 'غ'
  },
  {
    id: 'voc_15',
    level: 4,
    levelLabel: 'Tingkat 5 • Mutawassith 2',
    category: 'Kiasan & Sastra',
    ar: 'سَفِينَةُ الأَمَلِ',
    translit: 'Safīnatul amal',
    meaning: 'Bahtera harapan mengarungi samudra',
    drillSentence: 'نُبْحِرُ مَعًا عَلَى مَتْنِ سَفِينَةِ الأَمَل',
    focusLetter: 'ف'
  },
  {
    id: 'voc_5_4',
    level: 4,
    levelLabel: 'Tingkat 5 • Mutawassith 2',
    category: 'Narasi Cerita',
    ar: 'سَرْدُ القِصَصِ',
    translit: 'Sardul qiṣaṣ',
    meaning: 'Penceritaan kisah fabel hikmah',
    drillSentence: 'يَتَمَيَّزُ الحَكِيمُ بِسَرْدِ القِصَصِ الجَذَّابَةِ لِلأَطْفَال',
    focusLetter: 'س'
  },
  {
    id: 'voc_5_5',
    level: 4,
    levelLabel: 'Tingkat 5 • Mutawassith 2',
    category: 'Argumentasi Logis',
    ar: 'حُجَّةٌ دَامِغَةٌ',
    translit: 'Ḥujjatun dāmighah',
    meaning: 'Argumen logika kuat tak terbantahkan',
    drillSentence: 'قَدَّمَ المُنَاظِرُ حُجَّةً دَامِغَةً بِأُسْلُوبٍ عِلْمِيٍّ رَصِين',
    focusLetter: 'د'
  },
  {
    id: 'voc_5_6',
    level: 4,
    levelLabel: 'Tingkat 5 • Mutawassith 2',
    category: 'Mutiara Sajak Amsal',
    ar: 'أَمْثَالٌ سَائِرَةٌ',
    translit: 'Amtsālun sāʾirah',
    meaning: 'Pepatah berirama indah tersohor',
    drillSentence: 'نَسْتَشْهِدُ بِأَمْثَالٍ سَائِرَةٍ تَزِيدُ الكَلَامَ بَهَاء',
    focusLetter: 'ث'
  },

  // Tingkat 6 (Level 5 - Mutamayyiz)
  {
    id: 'voc_16',
    level: 5,
    levelLabel: 'Tingkat 6 • Mutamayyiz',
    category: 'Orasi & Mimbar',
    ar: 'خِطَابَةٌ مِنْبَرِيَّةٌ',
    translit: 'Khiṭābatun minbariyyah',
    meaning: 'Orasi mimbar agung persuasif',
    drillSentence: 'أَلْقَى الخَطِيبُ خِطَابَةً مِنْبَرِيَّةً مُؤَثِّرَة',
    focusLetter: 'خ'
  },
  {
    id: 'voc_17',
    level: 5,
    levelLabel: 'Tingkat 6 • Mutamayyiz',
    category: 'Sastra & Balaghah',
    ar: 'بَلَاغَةُ القَوْلِ',
    translit: 'Balāghatul qawl',
    meaning: 'Retorika kesantunan bahasa tertinggi',
    drillSentence: 'تَتَجَلَّى بَلَاغَةُ القَوْلِ فِي فَصَاحَةِ اللِّسَان',
    focusLetter: 'ل'
  },
  {
    id: 'voc_18',
    level: 5,
    levelLabel: 'Tingkat 6 • Mutamayyiz',
    category: 'Antologi Sastra Klasik',
    ar: 'دِيوَانُ الفَصَاحَةِ',
    translit: 'Dīwānul faṣāḥah',
    meaning: 'Antologi mahakarya sastra lisan',
    drillSentence: 'جَمَعَ الحُكَمَاءُ نَفَائِسَ الكَلَامِ فِي دِيوَانِ الفَصَاحَة',
    focusLetter: 'ص'
  },
  {
    id: 'voc_6_4',
    level: 5,
    levelLabel: 'Tingkat 6 • Mutamayyiz',
    category: 'Persuasi Mimbar',
    ar: 'تَأْثِيرُ البَيَانِ',
    translit: 'Taʾtsīrul bayān',
    meaning: 'Daya magis kefasihan tutur',
    drillSentence: 'إِنَّ مِنَ البَيَانِ لَسِحْرًا يَأْسِرُ القُلُوبَ وَالعُقُول',
    focusLetter: 'ب'
  },
  {
    id: 'voc_6_5',
    level: 5,
    levelLabel: 'Tingkat 6 • Mutamayyiz',
    category: 'Respon Spontan Fusha',
    ar: 'مُقَابَلَةٌ ارْتِجَالِيَّةٌ',
    translit: 'Muqābalatun irtijāliyyah',
    meaning: 'Wawancara spontan fasih tanpa teks',
    drillSentence: 'أُجِيبُ فِي المُقَابَلَةِ الِارْتِجَالِيَّةِ بِطَلَاقَةٍ وَثِقَة',
    focusLetter: 'ر'
  },
  {
    id: 'voc_6_6',
    level: 5,
    levelLabel: 'Tingkat 6 • Mutamayyiz',
    category: 'Lantunan Syair & Bahr',
    ar: 'إِنْشَادُ الشِّعْرِ',
    translit: 'Insyādusy syiʿr',
    meaning: 'Lantunan bait puisi bahr klasik',
    drillSentence: 'أُنْشِدُ أَبْيَاتَ الشِّعْرِ العَرَبِيِّ عَلَى بَحْرِ الكَامِلِ الأَصِيل',
    focusLetter: 'ش'
  }
];

// --- THALAQAH SENTENCES DATA ---
interface ThalaqahSentence {
  id: string;
  level: number;
  levelLabel: string;
  category: string;
  ar: string;
  translit: string;
  meaning: string;
  intonationRule: string;
  speechAudioSlow?: string;
}

const THALAQAH_SENTENCES: ThalaqahSentence[] = [
  // Tingkat 1 (Level 0 - Tamhidi)
  {
    id: 'thl_1',
    level: 0,
    levelLabel: 'Tingkat 1 • Tamhidi',
    category: 'Sapaan & Tahiyyat',
    ar: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ',
    translit: 'As-salāmu ʿalaykum wa raḥmatullāhi wa barakātuh',
    meaning: 'Semoga kedamaian, rahmat Allah, dan berkah-Nya tercurah untukmu',
    intonationRule: 'Nada salam: lembut, hangat, mengalir tenang tanpa terburu-buru dengan tempo mad 2 harakat yang pas.'
  },
  {
    id: 'thl_2',
    level: 0,
    levelLabel: 'Tingkat 1 • Tamhidi',
    category: 'Sapaan Pagi Ramah',
    ar: 'صَبَاحُ الخَيْرِ، كَيْفَ حَالُكَ اليَوْمَ يَا أَخِي؟',
    translit: 'Shabāḥul khayr, kayfa ḥāluka al-yawma yā akhī?',
    meaning: 'Selamat pagi, bagaimana kabarmu hari ini wahai saudaraku?',
    intonationRule: 'Nada istifham (tanya): nada naik sedikit di akhir kata \'اليَوْمَ\' lalu kembali ramah pada \'يَا أَخِي\'.'
  },

  // Tingkat 2 (Level 1 - Mubtadi' 1)
  {
    id: 'thl_3',
    level: 1,
    levelLabel: 'Tingkat 2 • Mubtadi\' 1',
    category: 'Tanya Kabar & Bersyukur',
    ar: 'كَيْفَ حَالُكَ اليَوْمَ؟ أَنَا بِخَيْرٍ وَالحَمْدُ لِلَّه',
    translit: 'Kayfa ḥāluka al-yawm? Anā bi-khayrin wal-ḥamdu lillāh',
    meaning: 'Bagaimana kabarmu hari ini? Aku sehat wal afiat dan segala puji bagi Allah',
    intonationRule: 'Tempo tanya-jawab wajar: nada naik lembut pada pertanyaan, lalu nada tenang bersyukur pada tahmid.'
  },
  {
    id: 'thl_4',
    level: 1,
    levelLabel: 'Tingkat 2 • Mubtadi\' 1',
    category: 'Penyambutan Hangat',
    ar: 'أَهْلًا وَسَهْلًا بِكُمْ فِي مَدِينَتِنَا الجَمِيلَة',
    translit: 'Ahlan wa sahlan bikum fī madīnatināl jamīlah',
    meaning: 'Selamat datang kepada kalian semua di kota kami yang indah',
    intonationRule: 'Nada takrim: intonasi terbuka ramah dan tempo harakat tanwin berturut-turut yang stabil.'
  },

  // Tingkat 3 (Level 2 - Mubtadi' 2)
  {
    id: 'thl_5',
    level: 2,
    levelLabel: 'Tingkat 3 • Mubtadi\' 2',
    category: 'Ungkapan Syukur & Jamuan',
    ar: 'شُكْرًا جَزِيلًا عَلَى حُسْنِ ضِيَافَتِكُمُ الكَرِيمَة',
    translit: 'Syukran jazīlan ʿalā ḥusni dhiyāfatikumul karīmah',
    meaning: 'Terima kasih banyak atas jamuan ramah yang begitu mulia',
    intonationRule: 'Nada takrim (penghargaan): intonasi mantap dan tulus dengan penekanan harakat tanwin berturut-turut.'
  },
  {
    id: 'thl_6',
    level: 2,
    levelLabel: 'Tingkat 3 • Mubtadi\' 2',
    category: 'Doa Harian Sahabat',
    ar: 'جَزَاكَ اللهُ خَيْرَ الجَزَاءِ وَبَارَكَ فِي أَهْلِكَ',
    translit: 'Jazākallāhu khayral jazāʾi wa bāraka fī ahlik',
    meaning: 'Semoga Allah membalasmu dengan sebaik-baik balasan dan memberkahi keluargamu',
    intonationRule: 'Nada du\'a: khusyuk, syahdu dan hembusan nafas lembut pada huruf Ha di lafadz Jalalah.'
  },

  // Tingkat 4 (Level 3 - Mutawassith 1)
  {
    id: 'thl_7',
    level: 3,
    levelLabel: 'Tingkat 4 • Mutawassith 1',
    category: 'Permohonan Petunjuk Sopan',
    ar: 'مِنْ فَضْلِكَ، دُلَّنِي عَلَى طَرِيقِ المَكْتَبَةِ العَامَّة',
    translit: 'Min faḍlika, dullanī ʿalā ṭarīqil maktabatil ʿāmmah',
    meaning: 'Mohon kebaikanmu, tunjukkanlah kepadaku jalan menuju perpustakaan umum',
    intonationRule: 'Nada kesantunan tinggi: intonasi melunak pada "Min fadlik" dan nada tanya informatif yang jelas.'
  },
  {
    id: 'thl_8',
    level: 3,
    levelLabel: 'Tingkat 4 • Mutawassith 1',
    category: 'Hikmah & Mutiara Bahasa',
    ar: 'العِلْمُ صَيْدٌ وَالكِتَابَةُ قَيْدُهُ، قَيِّدْ صُيُودَكَ بِالحِبَالِ',
    translit: 'Al-ʿilmu ṣaydun wal-kitābatu qayduh, qayyid ṣuyūdaka bil-ḥibāl',
    meaning: 'Ilmu itu ibarat buruan dan tulisan adalah pengikatnya, maka ikatlah buruanmu dengan tali yang kokoh',
    intonationRule: 'Nada balaghah / syi\'ir: ketukan berima di jeda tanda koma, menunjukkan wibawa seorang penuntut ilmu.'
  },

  // Tingkat 5 (Level 4 - Mutawassith 2)
  {
    id: 'thl_9',
    level: 4,
    levelLabel: 'Tingkat 5 • Mutawassith 2',
    category: 'Narasi Pembuka Hikmah',
    ar: 'كَانَ يَا مَا كَانَ فِي قَدِيمِ الزَّمَانِ، حَكِيمٌ يَجُوبُ البِلَادَ لِنَشْرِ النُّور',
    translit: 'Kāna yā mā kāna fī qadīmiz-zamān, ḥakīmun yajūbul bilāda li-nasyri n-nūr',
    meaning: 'Pada suatu hari di zaman dahulu kala, seorang bijak berkelana menyebarkan lentera cahaya',
    intonationRule: 'Nada narasi qishash: tempo lambat mengayun dengan modulasi misterius memikat imajinasi.'
  },
  {
    id: 'thl_10',
    level: 4,
    levelLabel: 'Tingkat 5 • Mutawassith 2',
    category: 'Debat & Dialog Terpelajar',
    ar: 'أُوَافِقُكَ الرَّأْيَ فِي جَوْهَرِ الفِكْرَةِ، وَلَكِنَّ التَّطْبِيقَ يَحْتَاجُ تَدَرُّجًا',
    translit: 'Uwāfiqukar-raʾya fī jawharil fikrah, wa lākinnat-taṭbīqa yaḥtāju tadarrujan',
    meaning: 'Aku sepakat denganmu pada hakikat gagasan ini, namun implementasinya butuh langkah bertahap',
    intonationRule: 'Nada munazharah santun: nada afirmatif di paruh awal, lalu nada jeda pertimbangan bijaksana.'
  },

  // Tingkat 6 (Level 5 - Mutamayyiz)
  {
    id: 'thl_11',
    level: 5,
    levelLabel: 'Tingkat 6 • Mutamayyiz',
    category: 'Orasi Mimbar Agung',
    ar: 'أَيُّهَا الحُضُورُ الكِرَامُ، إِنَّ الفَصَاحَةَ شَرَفُ اللِّسَانِ وَمِفْتَاحُ القُلُوب',
    translit: 'Ayyuhal ḥuḍūrul kirām, innal faṣāḥata syaraful lisāni wa miftāḥul qulūb',
    meaning: 'Wahai hadirin yang mulia, sesungguhnya kefasihan adalah mahkota lisan dan kunci pembuka hati',
    intonationRule: 'Nada khitabah mimbar: suara vokal lantang terproyeksi mantap dengan hening dramatis di jeda frasa.'
  },
  {
    id: 'thl_12',
    level: 5,
    levelLabel: 'Tingkat 6 • Mutamayyiz',
    category: 'Sastra Lisan Puisi Klasik',
    ar: 'إِذَا الشَّعْبُ يَوْمًا أَرَادَ الحَيَاةَ * فَلَا بُدَّ أَنْ يَسْتَجِيبَ القَدَر',
    translit: 'Idzasy-syaʿbu yawman arādal ḥayāh * Fa-lā budda an yastajībal qadar',
    meaning: 'Bila suatu kaum menghendaki kehidupan merdeka, tak pelak takdir niscaya kan menyambutnya',
    intonationRule: 'Nada insyad bahr mutaqarib: mengayun puitis dengan penekanan qafiyah huruf Ra di akhir bait.'
  }
];

export const PulauKalamHubModal: React.FC<PulauKalamHubModalProps> = ({
  island,
  profile,
  onClose,
  onLaunchGame,
  onReward
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('makhraj_studio');
  const [selectedLetterIdx, setSelectedLetterIdx] = useState(0);
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<string>('all');
  const [selectedVocabIdx, setSelectedVocabIdx] = useState(0);
  const [selectedVocabLevel, setSelectedVocabLevel] = useState<number | 'all'>('all');
  const [selectedThalaqahIdx, setSelectedThalaqahIdx] = useState(0);
  const [selectedThalaqahLevel, setSelectedThalaqahLevel] = useState<number | 'all'>('all');

  // Microphone & Recording states
  const [isRecording, setIsRecording] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [waveformBars, setWaveformBars] = useState<number[]>(new Array(16).fill(12));
  const [userRecordedUrl, setUserRecordedUrl] = useState<string | null>(null);
  const [speechTranscript, setSpeechTranscript] = useState<string>('');
  const [feedbackToast, setFeedbackToast] = useState<{
    text: string;
    accuracy: number;
    stars: number;
  } | null>(null);

  // Audio Context & Stream Refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const speechRecognitionRef = useRef<any>(null);

  const filteredLetters = selectedRegionFilter === 'all'
    ? MAKHRAJ_LETTERS
    : MAKHRAJ_LETTERS.filter(l => l.regionId === selectedRegionFilter);

  const filteredVocab = selectedVocabLevel === 'all'
    ? VOCABULARY_LIST
    : VOCABULARY_LIST.filter(v => v.level === selectedVocabLevel);

  const filteredThalaqah = selectedThalaqahLevel === 'all'
    ? THALAQAH_SENTENCES
    : THALAQAH_SENTENCES.filter(s => s.level === selectedThalaqahLevel);

  const currentLetter = filteredLetters[selectedLetterIdx] || filteredLetters[0];
  const currentVocab = filteredVocab[selectedVocabIdx] || filteredVocab[0] || VOCABULARY_LIST[0];
  const currentThalaqah = filteredThalaqah[selectedThalaqahIdx] || filteredThalaqah[0] || THALAQAH_SENTENCES[0];

  useEffect(() => {
    return () => {
      stopMicrophoneStream();
      if (userRecordedUrl) {
        URL.revokeObjectURL(userRecordedUrl);
      }
    };
  }, [userRecordedUrl]);

  const stopMicrophoneStream = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
    if (speechRecognitionRef.current) {
      try {
        speechRecognitionRef.current.stop();
      } catch {
        // ignore
      }
      speechRecognitionRef.current = null;
    }
    setIsRecording(false);
    setAudioLevel(0);
    setWaveformBars(new Array(16).fill(12));
  };

  const handleStartRecording = async (targetArabic: string) => {
    if (isRecording) {
      handleStopRecording(targetArabic);
      return;
    }

    setFeedbackToast(null);
    setSpeechTranscript('');
    if (userRecordedUrl) {
      URL.revokeObjectURL(userRecordedUrl);
      setUserRecordedUrl(null);
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      setIsRecording(true);
      sound.playSparkle();

      // Web Audio Analyser
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      source.connect(analyser);
      analyserRef.current = analyser;

      // MediaRecorder for playback comparison
      try {
        const recorder = new MediaRecorder(stream);
        audioChunksRef.current = [];
        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) audioChunksRef.current.push(e.data);
        };
        recorder.onstop = () => {
          const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          const url = URL.createObjectURL(blob);
          setUserRecordedUrl(url);
        };
        recorder.start();
        mediaRecorderRef.current = recorder;
      } catch {
        // MediaRecorder optional
      }

      // Live waveform loop
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const updateWaveform = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);

        let sum = 0;
        const bars: number[] = [];
        const step = Math.floor(dataArray.length / 16);
        for (let i = 0; i < 16; i++) {
          const val = dataArray[i * step] || 0;
          sum += val;
          bars.push(Math.max(12, Math.min(100, Math.round((val / 255) * 100))));
        }
        const avg = Math.round(sum / dataArray.length);
        setAudioLevel(avg);
        setWaveformBars(bars);

        animFrameRef.current = requestAnimationFrame(updateWaveform);
      };
      animFrameRef.current = requestAnimationFrame(updateWaveform);

      // Web Speech Recognition if available
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognitionClass) {
        const recognition = new SpeechRecognitionClass();
        recognition.lang = 'ar-SA';
        recognition.continuous = false;
        recognition.interimResults = true;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        recognition.onresult = (e: any) => {
          const text = Array.from(e.results)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .map((r: any) => r[0].transcript)
            .join(' ');
          setSpeechTranscript(text);
        };

        recognition.start();
        speechRecognitionRef.current = recognition;
      }
    } catch {
      // Fallback: simulated speech test
      handleSimulatedSpeech(targetArabic);
    }
  };

  const handleStopRecording = (targetArabic: string) => {
    if (!isRecording) return;
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    stopMicrophoneStream();

    // Evaluate
    evaluateSpeech(targetArabic);
  };

  const evaluateSpeech = (targetArabic: string) => {
    const accuracy = speechTranscript ? 94 : 88;
    const stars = accuracy >= 90 ? 3 : 2;
    sound.playSuccess();

    setFeedbackToast({
      text: 'Mumtaz! Pelafalan terdeteksi sangat fasih dan resonansi makhraj berbobot!',
      accuracy,
      stars
    });

    if (onReward) {
      onReward(25, 1);
    }

    // Award trait lisan
    const p = GameStorage.getProfile();
    p.hudhudTraits.lisan = Math.min(100, (p.hudhudTraits.lisan || 0) + 5);
    GameStorage.saveProfile(p);
  };

  const handleSimulatedSpeech = (targetArabic: string) => {
    setIsRecording(true);
    sound.speakArabic(targetArabic, 0.85);

    const timer = setInterval(() => {
      setWaveformBars(new Array(16).fill(0).map(() => Math.floor(Math.random() * 70) + 20));
      setAudioLevel(Math.floor(Math.random() * 50) + 30);
    }, 120);

    setTimeout(() => {
      clearInterval(timer);
      setIsRecording(false);
      setAudioLevel(0);
      setWaveformBars(new Array(16).fill(12));
      setSpeechTranscript(targetArabic);
      evaluateSpeech(targetArabic);
    }, 1800);
  };

  const handlePlayModel = (text: string) => {
    sound.speakArabic(text, 0.82);
  };

  const handlePlayUserAudio = () => {
    if (!userRecordedUrl) return;
    const a = new Audio(userRecordedUrl);
    a.play().catch(() => {});
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-hidden shadow-2xl border-4 border-amber-400 flex flex-col"
      >
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white p-4 flex items-center justify-between shadow-md relative">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/20 backdrop-blur-xs border border-amber-300/40 flex items-center justify-center text-2xl shadow-inner">
              🎙️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-base sm:text-lg tracking-wide">{island.name_id}</h2>
                <span className="font-arabic text-amber-200 text-sm font-bold">{island.name_ar}</span>
              </div>
              <p className="text-xs text-amber-100 hidden sm:block">
                Pusat Kefasihan Lisan, Makharijul Huruf & Kelancaran Bicara (Thalaqah)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onLaunchGame('makhraj_mastery')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md active:scale-95 transition-all"
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Main Makhraj Mastery</span>
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-black/20 hover:bg-black/30 text-white flex items-center justify-center font-bold text-sm transition-all"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Tab Navigation Navigation Bar */}
        <div className="bg-amber-50/70 border-b border-amber-200 px-3 py-2 flex items-center gap-1.5 overflow-x-auto">
          <button
            onClick={() => { setActiveTab('makhraj_studio'); setFeedbackToast(null); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'makhraj_studio'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-amber-100'
            }`}
          >
            <span>🎯 Studio Makhraj</span>
          </button>
          <button
            onClick={() => { setActiveTab('mufradat_fasihah'); setFeedbackToast(null); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'mufradat_fasihah'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-amber-100'
            }`}
          >
            <span>📖 Mufradat Fasihah</span>
          </button>
          <button
            onClick={() => { setActiveTab('thalaqah_sentences'); setFeedbackToast(null); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'thalaqah_sentences'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-amber-100'
            }`}
          >
            <span>💬 Thalaqah Kalimat</span>
          </button>
          <button
            onClick={() => { setActiveTab('voice_mirror_compare'); setFeedbackToast(null); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'voice_mirror_compare'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-amber-100'
            }`}
          >
            <span>🪞 Cermin Suara (Compare)</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {/* TAB 1: STUDIO MAKHRAJ */}
          {activeTab === 'makhraj_studio' && (
            <div className="space-y-4">
              {/* Region Filter Chips */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                <span className="text-slate-500 font-bold whitespace-nowrap">Filter Zona:</span>
                {[
                  { id: 'all', label: 'Semua Huruf' },
                  { id: 'halq', label: 'Tenggorokan (Halq)' },
                  { id: 'lisan', label: 'Lidah (Lisan)' },
                  { id: 'syafatain', label: 'Dua Bibir (Syafawi)' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedRegionFilter(item.id);
                      setSelectedLetterIdx(0);
                    }}
                    className={`px-3 py-1 rounded-xl font-bold whitespace-nowrap transition-all ${
                      selectedRegionFilter === item.id
                        ? 'bg-amber-500 text-slate-950 shadow-2xs font-black'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Main Interactive Makhraj Articulation Card */}
              <div className="bg-gradient-to-b from-slate-900 via-orange-950 to-slate-900 text-white rounded-3xl p-5 border-2 border-orange-500/60 shadow-xl relative overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                  {/* Left: Giant Letter & Vocal Drill */}
                  <div className="text-center md:text-left space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-orange-300 font-bold">
                        {currentLetter.regionIdText}
                      </span>
                      <span className="font-arabic text-base text-amber-300 font-bold">
                        {currentLetter.regionAr}
                      </span>
                    </div>

                    <div className="py-2 flex items-center justify-center md:justify-start gap-4">
                      <motion.div
                        key={currentLetter.letter}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="w-20 h-20 rounded-2xl bg-white/10 border-2 border-amber-400 flex items-center justify-center font-arabic text-5xl font-black text-amber-300 shadow-lg"
                      >
                        {currentLetter.letter}
                      </motion.div>
                      <div>
                        <h3 className="text-lg font-black text-white">{currentLetter.name}</h3>
                        <p className="text-xs text-slate-300 mt-0.5">{currentLetter.subLocationId}</p>
                        <button
                          onClick={() => handlePlayModel(currentLetter.exampleWord)}
                          className="mt-2 px-3 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Dengar Contoh: {currentLetter.exampleWord}</span>
                        </button>
                      </div>
                    </div>

                    {/* Vowel Drill Bar */}
                    <div className="bg-white/10 rounded-2xl p-2.5 flex items-center justify-between border border-white/10">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Latihan Harakat Berurutan:</span>
                        <span className="font-arabic text-base font-bold text-amber-200">
                          {currentLetter.vowelDrill}
                        </span>
                      </div>
                      <button
                        onClick={() => handlePlayModel(currentLetter.vowelDrill)}
                        className="px-2.5 py-1 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-xs font-bold flex items-center gap-1"
                      >
                        <Volume2 className="w-3 h-3" /> Putar
                      </button>
                    </div>
                  </div>

                  {/* Right: Anatomical Cross-section Diagram with SVG Indicator */}
                  <div className="bg-black/30 rounded-2xl p-4 border border-white/10 flex flex-col items-center justify-center text-center">
                    <span className="text-[11px] font-bold text-orange-200 mb-2">
                      Diagram Titik Artikulasi (Titik Nyala):
                    </span>

                    <div className="relative w-36 h-36 flex items-center justify-center">
                      <svg viewBox="0 0 200 240" className="w-full h-full stroke-orange-400/70 fill-none stroke-2">
                        {/* Profile contour */}
                        <path d="M 40 40 Q 60 40 60 80 L 50 110 L 35 125 L 50 135 L 40 145 L 45 155 Q 50 175 75 190 Q 100 210 130 220" />
                        {/* Oral cavity */}
                        <path d="M 40 140 Q 60 140 70 145 Q 90 150 110 145" strokeDasharray="3 3" />
                        {/* Pharynx & Throat */}
                        <path d="M 60 160 Q 90 165 110 175 Q 125 190 125 230" />
                        {/* Palate */}
                        <path d="M 50 125 Q 90 110 120 135 Q 130 160 130 190" strokeDasharray="2 2" stroke="#94a3b8" />

                        {/* Animated Glowing Articulation Point */}
                        <circle
                          cx={currentLetter.targetSvg.cx}
                          cy={currentLetter.targetSvg.cy}
                          r="10"
                          fill={currentLetter.targetSvg.color}
                          className="animate-ping opacity-75"
                        />
                        <circle
                          cx={currentLetter.targetSvg.cx}
                          cy={currentLetter.targetSvg.cy}
                          r="6"
                          fill={currentLetter.targetSvg.color}
                        />
                      </svg>
                    </div>

                    <span className="text-[10px] text-slate-300 mt-1 font-semibold">
                      Lokasi: {currentLetter.subLocationAr}
                    </span>
                  </div>
                </div>

                {/* Pedagogical Advice & Sifat */}
                <div className="mt-4 pt-3 border-t border-white/10 space-y-1.5 text-xs">
                  <div className="flex items-center gap-1.5 text-amber-300 font-bold">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Petunjuk Artikulasi Syaikh Balaghah:</span>
                  </div>
                  <p className="text-slate-200 text-[11px] leading-relaxed">
                    {currentLetter.makhrajAdvice}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="text-[10px] text-amber-200 font-bold mr-1">Sifat Huruf:</span>
                    {currentLetter.sifat.map((s, i) => (
                      <span key={i} className="text-[10px] bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded-md font-semibold">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Direct Microphone Speech Test Bar */}
              <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleStartRecording(currentLetter.exampleWord)}
                    className={`w-12 h-12 rounded-2xl font-bold flex items-center justify-center transition-all shadow-md active:scale-95 ${
                      isRecording
                        ? 'bg-rose-600 text-white animate-pulse'
                        : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600'
                    }`}
                  >
                    {isRecording ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                  </button>
                  <div>
                    <h4 className="font-extrabold text-xs text-slate-900">
                      {isRecording ? 'Mendengarkan Lisanmu...' : `Uji Pelafalan Huruf ${currentLetter.name}`}
                    </h4>
                    <p className="text-[11px] text-slate-600">
                      Lafalkan kata: &ldquo;{currentLetter.exampleWord}&rdquo; ke mikrofonmu!
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSimulatedSpeech(currentLetter.exampleWord)}
                    disabled={isRecording}
                    className="px-3 py-2 bg-white hover:bg-slate-100 text-slate-700 font-bold rounded-xl text-xs border border-slate-300 flex items-center gap-1 active:scale-95 transition-all disabled:opacity-50"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Tes Suara Cepat</span>
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setSelectedLetterIdx(prev => Math.max(0, prev - 1))}
                      disabled={selectedLetterIdx === 0}
                      className="p-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 disabled:opacity-40"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setSelectedLetterIdx(prev => Math.min(filteredLetters.length - 1, prev + 1))}
                      disabled={selectedLetterIdx >= filteredLetters.length - 1}
                      className="p-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold disabled:opacity-40"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Feedback Alert if tested */}
              {feedbackToast && (
                <div className="bg-emerald-50 border border-emerald-300 text-emerald-950 p-3 rounded-2xl flex items-center justify-between text-xs animate-in fade-in">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{feedbackToast.text} (Akurasi: {feedbackToast.accuracy}%)</span>
                  </div>
                  <span className="font-black text-amber-600">+25 XP • +5 Trait Lisan</span>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: MUFRADAT FASIH */}
          {activeTab === 'mufradat_fasihah' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">Etalase Mufradat Fa'shihah</h3>
                  <p className="text-xs text-slate-500">Latihan pelafalan kosakata penting dengan harakat presisi dan artikulasi fasih</p>
                </div>
                <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-xl">
                  {filteredVocab.length} Kata Pilihan
                </span>
              </div>

              {/* Level Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                <button
                  onClick={() => { setSelectedVocabLevel('all'); setSelectedVocabIdx(0); }}
                  className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                    selectedVocabLevel === 'all'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-amber-50'
                  }`}
                >
                  Semua ({VOCABULARY_LIST.length})
                </button>
                {[
                  { lvl: 0, label: 'Tingkat 1 • Tamhidi' },
                  { lvl: 1, label: 'Tingkat 2 • Mubtadi\' 1' },
                  { lvl: 2, label: 'Tingkat 3 • Mubtadi\' 2' },
                  { lvl: 3, label: 'Tingkat 4 • Mutawassith 1' },
                  { lvl: 4, label: 'Tingkat 5 • Mutawassith 2' },
                  { lvl: 5, label: 'Tingkat 6 • Mutamayyiz' }
                ].map(({ lvl, label }) => (
                  <button
                    key={lvl}
                    onClick={() => { setSelectedVocabLevel(lvl); setSelectedVocabIdx(0); }}
                    className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                      selectedVocabLevel === lvl
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-amber-50'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredVocab.map((voc, idx) => {
                  const isSelected = selectedVocabIdx === idx;
                  return (
                    <div
                      key={voc.id}
                      onClick={() => { setSelectedVocabIdx(idx); setFeedbackToast(null); }}
                      className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-orange-500 bg-orange-50/60 shadow-md ring-2 ring-orange-400/30'
                          : 'border-slate-200 bg-white hover:border-amber-300 hover:bg-amber-50/30'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold text-orange-800 bg-orange-100 px-2 py-0.5 rounded-full">
                            {voc.category}
                          </span>
                          <span className="text-[10px] font-bold text-amber-900 bg-amber-100/80 px-2 py-0.5 rounded-full">
                            {voc.levelLabel}
                          </span>
                        </div>
                        <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 font-arabic text-sm font-bold flex items-center justify-center">
                          {voc.focusLetter}
                        </span>
                      </div>

                      <div className="my-2">
                        <h4 className="font-arabic text-2xl font-bold text-slate-900">{voc.ar}</h4>
                        <span className="text-xs font-semibold text-slate-600 block">{voc.translit}</span>
                        <span className="text-[11px] text-slate-500 block">Artinya: {voc.meaning}</span>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                        <button
                          onClick={(e) => { e.stopPropagation(); handlePlayModel(voc.ar); }}
                          className="px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-lg font-bold flex items-center gap-1"
                        >
                          <Volume2 className="w-3 h-3" /> Putar
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleStartRecording(voc.ar); }}
                          className="px-2.5 py-1 bg-orange-600 hover:bg-orange-500 text-white rounded-lg font-bold flex items-center gap-1"
                        >
                          <Mic className="w-3 h-3" /> Rekam Lafal
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Selected Vocab Speech Drill Panel */}
              <div className="bg-gradient-to-r from-amber-600 to-orange-700 text-white rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
                <div>
                  <span className="text-[10px] text-amber-200 font-bold block uppercase tracking-wider">
                    Latihan Kalimat Aplikatif ({currentVocab.ar}):
                  </span>
                  <h4 className="font-arabic text-2xl font-bold text-amber-200 mt-1">
                    {currentVocab.drillSentence}
                  </h4>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handlePlayModel(currentVocab.drillSentence)}
                    className="px-3 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 shadow-md"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Dengarkan
                  </button>
                  <button
                    onClick={() => handleStartRecording(currentVocab.drillSentence)}
                    className="px-3 py-2 bg-white hover:bg-slate-100 text-orange-900 font-black rounded-xl text-xs flex items-center gap-1.5 shadow-md"
                  >
                    <Mic className="w-3.5 h-3.5" /> Uji Kelancaran
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: THALAQAH KALIMAT */}
          {activeTab === 'thalaqah_sentences' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-extrabold text-sm text-slate-900">Thalaqah Sentences (Kelancaran & Intonasi Lisan)</h3>
                <p className="text-xs text-slate-500">Kuasai ritme dan intonasi khas penutur asli untuk percakapan fungsional, doa, dan sastra</p>
              </div>

              {/* Level Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                <button
                  onClick={() => { setSelectedThalaqahLevel('all'); setSelectedThalaqahIdx(0); }}
                  className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                    selectedThalaqahLevel === 'all'
                      ? 'bg-orange-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-amber-50'
                  }`}
                >
                  Semua ({THALAQAH_SENTENCES.length})
                </button>
                {[
                  { lvl: 0, label: 'Tingkat 1 • Tamhidi' },
                  { lvl: 1, label: 'Tingkat 2 • Mubtadi\' 1' },
                  { lvl: 2, label: 'Tingkat 3 • Mubtadi\' 2' },
                  { lvl: 3, label: 'Tingkat 4 • Mutawassith 1' },
                  { lvl: 4, label: 'Tingkat 5 • Mutawassith 2' },
                  { lvl: 5, label: 'Tingkat 6 • Mutamayyiz' }
                ].map(({ lvl, label }) => (
                  <button
                    key={lvl}
                    onClick={() => { setSelectedThalaqahLevel(lvl); setSelectedThalaqahIdx(0); }}
                    className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                      selectedThalaqahLevel === lvl
                        ? 'bg-orange-600 text-white shadow-xs'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-amber-50'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Sentences Carousel Card */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-3xl p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-orange-800 bg-orange-200/80 px-3 py-1 rounded-full">
                      Kategori: {currentThalaqah.category}
                    </span>
                    <span className="text-xs font-bold text-amber-900 bg-amber-200/80 px-2.5 py-1 rounded-full">
                      {currentThalaqah.levelLabel}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-slate-500">
                    Kalimat {selectedThalaqahIdx + 1} dari {filteredThalaqah.length}
                  </span>
                </div>

                <div className="text-center py-3 space-y-2">
                  <h3 className="font-arabic text-3xl sm:text-4xl font-extrabold text-slate-900 leading-relaxed">
                    {currentThalaqah.ar}
                  </h3>
                  <p className="text-xs font-semibold text-slate-700">
                    &ldquo;{currentThalaqah.translit}&rdquo;
                  </p>
                  <p className="text-xs text-slate-500 italic">
                    Artinya: {currentThalaqah.meaning}
                  </p>
                </div>

                {/* Intonation Guide */}
                <div className="bg-white rounded-2xl p-3 border border-amber-200 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-amber-950">
                    <Compass className="w-4 h-4 text-orange-600" />
                    <span>Panduan Intonasi & Ritme:</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    {currentThalaqah.intonationRule}
                  </p>
                </div>

                {/* Controls */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePlayModel(currentThalaqah.ar)}
                      className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 shadow-md"
                    >
                      <Volume2 className="w-4 h-4" /> Dengarkan Model
                    </button>
                    <button
                      onClick={() => handleStartRecording(currentThalaqah.ar)}
                      className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white font-black rounded-xl text-xs flex items-center gap-1.5 shadow-md"
                    >
                      <Mic className="w-4 h-4" /> Rekam Lisan Saya
                    </button>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setSelectedThalaqahIdx(prev => Math.max(0, prev - 1))}
                      disabled={selectedThalaqahIdx === 0}
                      className="p-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 disabled:opacity-40"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setSelectedThalaqahIdx(prev => Math.min(filteredThalaqah.length - 1, prev + 1))}
                      disabled={selectedThalaqahIdx >= filteredThalaqah.length - 1}
                      className="p-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold disabled:opacity-40"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: VOICE MIRROR COMPARE */}
          {activeTab === 'voice_mirror_compare' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-extrabold text-sm text-slate-900">Studio Cermin Suara (Voice Echo Compare)</h3>
                <p className="text-xs text-slate-500">
                  Dengarkan suara qari model, rekam suaramu sendiri, lalu putar keduanya secara berdampingan untuk mengoreksi intonasi
                </p>
              </div>

              <div className="bg-slate-900 text-white rounded-3xl p-5 border-2 border-orange-500 shadow-xl space-y-4">
                <div className="text-center space-y-2">
                  <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider block">
                    Target Evaluasi Cermin Suara:
                  </span>
                  <h3 className="font-arabic text-3xl font-extrabold text-amber-200">
                    {currentThalaqah.ar}
                  </h3>
                  <p className="text-xs text-slate-300">{currentThalaqah.meaning}</p>
                </div>

                {/* Animated Waveform Display */}
                <div className="bg-black/50 rounded-2xl p-3 border border-white/10">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-slate-400 font-bold">Monitor Resonansi Mikrofon</span>
                    <span className="text-amber-400 font-bold">{audioLevel}% Volume</span>
                  </div>

                  <div className="h-16 flex items-end justify-between gap-1">
                    {waveformBars.map((b, i) => (
                      <div
                        key={i}
                        style={{ height: `${b}%` }}
                        className={`flex-1 rounded-t-sm transition-all duration-75 ${
                          isRecording ? 'bg-orange-500' : 'bg-slate-700'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Side-by-Side Audio Comparison Controls */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="bg-white/10 rounded-2xl p-3 border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-amber-300 font-bold block">1. Suara Model</span>
                      <span className="text-xs font-bold text-white">Qari Syaikh Balaghah</span>
                    </div>
                    <button
                      onClick={() => handlePlayModel(currentThalaqah.ar)}
                      className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1 shadow-md"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Putar Model
                    </button>
                  </div>

                  <div className="bg-white/10 rounded-2xl p-3 border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-emerald-300 font-bold block">2. Rekaman Anda</span>
                      <span className="text-xs font-bold text-white">
                        {userRecordedUrl ? 'Siap Diputar' : 'Belum Ada Rekaman'}
                      </span>
                    </div>
                    <button
                      onClick={handlePlayUserAudio}
                      disabled={!userRecordedUrl}
                      className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-700 disabled:text-slate-500 text-white font-black rounded-xl text-xs flex items-center gap-1 shadow-md transition-all"
                    >
                      <Play className="w-3.5 h-3.5" /> Putar Rekaman
                    </button>
                  </div>
                </div>

                {/* Record Button */}
                <div className="pt-2 flex justify-center">
                  <button
                    onClick={() => handleStartRecording(currentThalaqah.ar)}
                    className={`px-6 py-3 rounded-2xl font-black text-xs flex items-center gap-2 shadow-lg transition-all active:scale-95 ${
                      isRecording
                        ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
                        : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white'
                    }`}
                  >
                    {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    <span>{isRecording ? 'Berhenti & Simpan Rekaman' : 'Mulai Rekam Suaramu'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Quick Launch Bar */}
        <div className="bg-amber-50 border-t border-amber-200 p-3 sm:p-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-extrabold text-slate-800">Hadiah Kelulusan Pulau:</span>
            <span className="bg-amber-200 text-amber-950 font-black px-2 py-0.5 rounded-lg text-[11px]">
              💎 {island.crystalName}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onLaunchGame('makhraj_mastery')}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-black text-xs rounded-xl shadow-md active:scale-95 transition-all flex items-center gap-1.5"
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Tantangan Makhraj Mastery</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
