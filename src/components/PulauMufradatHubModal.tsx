import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Play,
  Volume2,
  Award,
  BookOpen,
  Layers,
  CheckCircle2,
  ChevronRight,
  Star,
  Compass,
  Filter,
  Check,
  RotateCcw,
  HelpCircle,
  TrendingUp
} from 'lucide-react';
import { UserProfile, Island } from '../types/game';
import { sound } from '../services/sound';
import { GameStorage } from '../services/storage';
import { IslandModalLayout } from './IslandModalLayout';

interface PulauMufradatHubModalProps {
  island: Island;
  profile: UserProfile;
  onClose: () => void;
  onLaunchGame: (gameId: string) => void;
  onReward: (xp: number, stars: number) => void;
}

export interface VocabularyCard {
  id: string;
  level: number; // 0 to 5
  levelLabel: string;
  name_ar: string;
  translit: string;
  meaning: string;
  category: string;
  emoji: string;
  exampleSentence: string;
  exampleMeaning: string;
}

const THEMATIC_VOCAB_COLLECTION: VocabularyCard[] = [
  // ==================== LEVEL 0: TAMHIDI (Pra-A1) ====================
  // Angka Satuan
  { id: 'v_w1', level: 0, levelLabel: 'L0 Tamhidi', name_ar: 'وَاحِد', translit: 'wāḥid', meaning: 'Satu (1)', category: 'Angka Satuan', emoji: '1️⃣', exampleSentence: 'قَلَمٌ وَاحِدٌ عَلَى الطَّاوِلَةِ', exampleMeaning: 'Satu pena di atas meja' },
  { id: 'v_w2', level: 0, levelLabel: 'L0 Tamhidi', name_ar: 'اِثْنَان', translit: 'ithnān', meaning: 'Dua (2)', category: 'Angka Satuan', emoji: '2️⃣', exampleSentence: 'عِنْدِي كِتَابَانِ اثْنَانِ', exampleMeaning: 'Saya memiliki dua buah buku' },
  { id: 'v_w3', level: 0, levelLabel: 'L0 Tamhidi', name_ar: 'ثَلَاثَة', translit: 'thalāthah', meaning: 'Tiga (3)', category: 'Angka Satuan', emoji: '3️⃣', exampleSentence: 'ثَلَاثَةُ رِجَالٍ فِي السَّفِينَةِ', exampleMeaning: 'Tiga orang pria di atas kapal' },
  { id: 'v_w4', level: 0, levelLabel: 'L0 Tamhidi', name_ar: 'خَمْسَة', translit: 'khamsah', meaning: 'Lima (5)', category: 'Angka Satuan', emoji: '5️⃣', exampleSentence: 'خَمْسُ صَلَوَاتٍ فِي اليَوْمِ', exampleMeaning: 'Lima shalat dalam sehari semalam' },
  { id: 'v_w5', level: 0, levelLabel: 'L0 Tamhidi', name_ar: 'عَشَرَة', translit: 'ʿasharah', meaning: 'Sepuluh (10)', category: 'Angka Satuan', emoji: '🔟', exampleSentence: 'عَشَرَةُ دَنَانِيرَ ذَهَبِيَّةٍ', exampleMeaning: 'Sepuluh dinar emas murni' },

  // Warna Alami
  { id: 'v_c1', level: 0, levelLabel: 'L0 Tamhidi', name_ar: 'أَحْمَر', translit: 'aḥmar', meaning: 'Merah cerah', category: 'Spektrum Warna', emoji: '🔴', exampleSentence: 'شِرَاعُ القَارِبِ أَحْمَرُ', exampleMeaning: 'Layar perahu itu berwarna merah' },
  { id: 'v_c2', level: 0, levelLabel: 'L0 Tamhidi', name_ar: 'أَزْرَق', translit: 'azraq', meaning: 'Biru samudra', category: 'Spektrum Warna', emoji: '🔵', exampleSentence: 'البَحْرُ أَزْرَقُ وَجَمِيلٌ', exampleMeaning: 'Laut itu biru dan mempesona' },
  { id: 'v_c3', level: 0, levelLabel: 'L0 Tamhidi', name_ar: 'أَخْضَر', translit: 'akhḍar', meaning: 'Hijau daun kurma', category: 'Spektrum Warna', emoji: '🟢', exampleSentence: 'شَجَرُ النَّخِيلِ أَخْضَرُ', exampleMeaning: 'Pohon kurma itu berwarna hijau' },
  { id: 'v_c4', level: 0, levelLabel: 'L0 Tamhidi', name_ar: 'أَبْيَض', translit: 'abyaḍ', meaning: 'Putih bersih', category: 'Spektrum Warna', emoji: '⚪', exampleSentence: 'القَمِيصُ أَبْيَضُ وَنَقِيٌّ', exampleMeaning: 'Kemeja itu putih dan bersih' },

  // Keluarga & Kerabat
  { id: 'v_f1', level: 0, levelLabel: 'L0 Tamhidi', name_ar: 'أَب', translit: 'ab', meaning: 'Ayah tercinta', category: 'Keluarga Inti', emoji: '👨', exampleSentence: 'أَبِي رَجُلٌ طَيِّبٌ وَكَرِيمٌ', exampleMeaning: 'Ayahku adalah pria yang baik dan dermawan' },
  { id: 'v_f2', level: 0, levelLabel: 'L0 Tamhidi', name_ar: 'أُمّ', translit: 'umm', meaning: 'Ibu penyayang', category: 'Keluarga Inti', emoji: '👩', exampleSentence: 'الجَنَّةُ تَحْتَ أَقْدَامِ الأُمَّهَاتِ', exampleMeaning: 'Surga berada di bawah telapak kaki ibu' },
  { id: 'v_f3', level: 0, levelLabel: 'L0 Tamhidi', name_ar: 'أَخ', translit: 'akh', meaning: 'Saudara laki-laki', category: 'Keluarga Inti', emoji: '👦', exampleSentence: 'أَخِي يَذْهَبُ مَعِي إِلَى السُّوقِ', exampleMeaning: 'Saudaraku pergi bersamaku ke pasar' },

  // Benda Kelas & Sudut Rumah
  { id: 'v_s1', level: 0, levelLabel: 'L0 Tamhidi', name_ar: 'كِتَاب', translit: 'kitāb', meaning: 'Buku panduan', category: 'Benda Kelas & Belajar', emoji: '📖', exampleSentence: 'هٰذَا كِتَابُ اللُّغَةِ العَرَبِيَّةِ', exampleMeaning: 'Ini buku bahasa Arab' },
  { id: 'v_s2', level: 0, levelLabel: 'L0 Tamhidi', name_ar: 'قَلَم', translit: 'qalam', meaning: 'Pena gores ilmu', category: 'Benda Kelas & Belajar', emoji: '🖊️', exampleSentence: 'أَكْتُبُ بِالقَلَمِ فِي الدَّفْتَرِ', exampleMeaning: 'Saya menulis dengan pena di buku tulis' },
  { id: 'v_h1', level: 0, levelLabel: 'L0 Tamhidi', name_ar: 'بَيْت', translit: 'bayt', meaning: 'Rumah tinggal asri', category: 'Ruangan & Rumah', emoji: '🏠', exampleSentence: 'بَيْتِي جَمِيلٌ وَوَاسِعٌ', exampleMeaning: 'Rumahku indah dan luas' },
  { id: 'v_h2', level: 0, levelLabel: 'L0 Tamhidi', name_ar: 'مَطْبَخ', translit: 'maṭbakh', meaning: 'Dapur memasak', category: 'Ruangan & Rumah', emoji: '🍳', exampleSentence: 'أُمِّي فِي المَطْبَخِ تُعِدُّ الطَّعَامَ', exampleMeaning: 'Ibuku di dapur menyiapkan hidangan' },

  // ==================== LEVEL 1: MUBTADI' 1 (A1) ====================
  // Makanan & Minuman
  { id: 'v_m1', level: 1, levelLabel: 'L1 Mubtadi 1', name_ar: 'خُبْز', translit: 'khubz', meaning: 'Roti gandum hangat', category: 'Makanan & Minuman', emoji: '🍞', exampleSentence: 'آكُلُ الخُبْزَ الطَّازَجَ فِي الصَّبَاحِ', exampleMeaning: 'Saya makan roti gandum hangat di pagi hari' },
  { id: 'v_m2', level: 1, levelLabel: 'L1 Mubtadi 1', name_ar: 'مَاء', translit: 'māʾ', meaning: 'Air tawar segar', category: 'Makanan & Minuman', emoji: '💧', exampleSentence: 'أَشْرَبُ مَاءً بَارِدًا نَقِيًّا', exampleMeaning: 'Saya minum air dingin yang murni' },
  { id: 'v_m3', level: 1, levelLabel: 'L1 Mubtadi 1', name_ar: 'تَمْر', translit: 'tamr', meaning: 'Kurma manis berkah', category: 'Makanan & Minuman', emoji: '🌴', exampleSentence: 'التَّمْرُ غِذَاءٌ طَيِّبٌ وَمُبَارَكٌ', exampleMeaning: 'Kurma adalah makanan bergizi dan penuh berkah' },
  { id: 'v_m4', level: 1, levelLabel: 'L1 Mubtadi 1', name_ar: 'قَهْوَة', translit: 'qahwah', meaning: 'Kopi aromatik Arab', category: 'Makanan & Minuman', emoji: '☕', exampleSentence: 'القَهْوَةُ العَرَبِيَّةُ ذَاتُ رَائِحَةٍ زَكِيَّةٍ', exampleMeaning: 'Kopi Arab memiliki aroma harum yang khas' },

  // Buah & Sayuran
  { id: 'v_b1', level: 1, levelLabel: 'L1 Mubtadi 1', name_ar: 'تُفَّاحَة', translit: 'tuffāḥah', meaning: 'Buah apel manis', category: 'Buah & Sayur', emoji: '🍎', exampleSentence: 'هٰذِهِ تُفَّاحَةٌ حَمْرَاءُ لَذِيذَةٌ', exampleMeaning: 'Ini buah apel merah yang lezat' },
  { id: 'v_b2', level: 1, levelLabel: 'L1 Mubtadi 1', name_ar: 'بُرْتُقَال', translit: 'burtuqāl', meaning: 'Buah jeruk segar', category: 'Buah & Sayur', emoji: '🍊', exampleSentence: 'عَصِيرُ البُرْتُقَالِ يُعْطِي النَّشَاطَ', exampleMeaning: 'Jus jeruk memberikan kebugaran raga' },

  // Hewan & Satwa
  { id: 'v_a1', level: 1, levelLabel: 'L1 Mubtadi 1', name_ar: 'جَمَل', translit: 'jamal', meaning: 'Unta padang pasir', category: 'Hewan & Margasatwa', emoji: '🐪', exampleSentence: 'الجَمَلُ يَسِيرُ صَبُورًا فِي الصَّحْرَاءِ', exampleMeaning: 'Unta melangkah dengan sabar di padang pasir' },
  { id: 'v_a2', level: 1, levelLabel: 'L1 Mubtadi 1', name_ar: 'حِصَان', translit: 'ḥiṣān', meaning: 'Kuda tangkas gagah', category: 'Hewan & Margasatwa', emoji: '🐴', exampleSentence: 'الحِصَانُ العَرَبِيُّ سَرِيعٌ وَأَصِيلٌ', exampleMeaning: 'Kuda Arab berlari cepat dan bertrah murni' },
  { id: 'v_a3', level: 1, levelLabel: 'L1 Mubtadi 1', name_ar: 'سَمَكَة', translit: 'samakah', meaning: 'Ikan air jernih', category: 'Hewan & Margasatwa', emoji: '🐟', exampleSentence: 'السَّمَكَةُ تَعِيشُ فِي البَحْرِ النَّقِيِّ', exampleMeaning: 'Ikan hidup di laut yang jernih' },

  // Tubuh & Pakaian
  { id: 'v_t1', level: 1, levelLabel: 'L1 Mubtadi 1', name_ar: 'عَيْن', translit: 'ʿayn', meaning: 'Mata penglihatan (feminin)', category: 'Tubuh & Indra', emoji: '👁️', exampleSentence: 'العَيْنُ نِعْمَةٌ عَظِيمَةٌ مِنَ اللَّهِ', exampleMeaning: 'Mata adalah kenikmatan agung dari Allah' },
  { id: 'v_p1', level: 1, levelLabel: 'L1 Mubtadi 1', name_ar: 'ثَوْب', translit: 'thawb', meaning: 'Jubah gamis putih', category: 'Busana & Pakaian', emoji: '👘', exampleSentence: 'يَلْبَسُ الرَّجُلُ ثَوْبًا أَبْيَضَ فِي الجُمُعَةِ', exampleMeaning: 'Pria itu mengenakan jubah putih di hari Jumat' },

  // ==================== LEVEL 2: MUBTADI' 2 (A2) ====================
  // Fasilitas Publik & Denah Kota
  { id: 'v_u1', level: 2, levelLabel: 'L2 Mubtadi 2', name_ar: 'مَسْجِد', translit: 'masjid', meaning: 'Masjid tempat sujud', category: 'Fasilitas Kota & Publik', emoji: '🕌', exampleSentence: 'نُصَلِّي الجَمَاعَةَ فِي المَسْجِدِ الكَبِيرِ', exampleMeaning: 'Kami shalat berjamaah di masjid raya' },
  { id: 'v_u2', level: 2, levelLabel: 'L2 Mubtadi 2', name_ar: 'مَطَار', translit: 'maṭār', meaning: 'Bandar udara internasional', category: 'Fasilitas Kota & Publik', emoji: '🛫', exampleSentence: 'وَصَلَتِ الطَّائِرَةُ إِلَى مَطَارِ جِدَّةَ', exampleMeaning: 'Pesawat telah tiba di bandara Jeddah' },
  { id: 'v_u3', level: 2, levelLabel: 'L2 Mubtadi 2', name_ar: 'مُسْتَشْفَى', translit: 'mustashfā', meaning: 'Rumah sakit pengobatan', category: 'Fasilitas Kota & Publik', emoji: '🏥', exampleSentence: 'يَعْمَلُ الطَّبِيبُ فِي المُسْتَشْفَى الحَدِيثِ', exampleMeaning: 'Dokter bekerja di rumah sakit modern' },

  // Profesi & Cita-Cita
  { id: 'v_pr1', level: 2, levelLabel: 'L2 Mubtadi 2', name_ar: 'طَبِيب', translit: 'ṭabīb', meaning: 'Dokter penyembuh', category: 'Profesi & Karir', emoji: '🩺', exampleSentence: 'فَحَصَ الطَّبِيبُ المَرِيضَ بِعِنَايَةٍ', exampleMeaning: 'Dokter memeriksa pasien dengan teliti' },
  { id: 'v_pr2', level: 2, levelLabel: 'L2 Mubtadi 2', name_ar: 'مُهَنْدِس', translit: 'muhandis', meaning: 'Insinyur perancang', category: 'Profesi & Karir', emoji: '👷', exampleSentence: 'المُهَنْدِسُ يَبْنِي الجِسْرَ القَوِيَّ', exampleMeaning: 'Insinyur membangun jembatan yang kokoh' },
  { id: 'v_pr3', level: 2, levelLabel: 'L2 Mubtadi 2', name_ar: 'تَاجِر', translit: 'tājir', meaning: 'Saudagar pedagang amanah', category: 'Profesi & Karir', emoji: '💼', exampleSentence: 'التَّاجِرُ الأَمِينُ يُحِبُّهُ النَّاسُ', exampleMeaning: 'Pedagang yang amanah dicintai semua orang' },

  // Transportasi & Fi'il Harian
  { id: 'v_tr1', level: 2, levelLabel: 'L2 Mubtadi 2', name_ar: 'سَفِينَة', translit: 'safīnah', meaning: 'Kapal laut samudra', category: 'Transportasi & Mobilitas', emoji: '🚢', exampleSentence: 'تَمْخُرُ السَّفِينَةُ أَمْوَاجَ البَحْرِ', exampleMeaning: 'Kapal membelah ombak samudra' },
  { id: 'v_tr2', level: 2, levelLabel: 'L2 Mubtadi 2', name_ar: 'قِطَار', translit: 'qiṭār', meaning: 'Kereta rel cepat', category: 'Transportasi & Mobilitas', emoji: '🚆', exampleSentence: 'سَافَرْنَا إِلَى المَدِينَةِ بِالقِطَارِ السَّرِيعِ', exampleMeaning: 'Kami bepergian ke Madinah dengan kereta cepat' },
  { id: 'v_act1', level: 2, levelLabel: 'L2 Mubtadi 2', name_ar: 'قَرَأَ', translit: 'qaraʾa', meaning: 'Telah membaca', category: 'Tindakan Harian (Fi\'il)', emoji: '📖', exampleSentence: 'قَرَأَ الوَلَدُ سُورَةَ الفَاتِحَةِ بِخُشُوعٍ', exampleMeaning: 'Anak itu membaca Surah Al-Fatihah dengan khusyuk' },

  // ==================== LEVEL 3: MUTAWASSITH 1 (B1) ====================
  // Sifat & Karakter
  { id: 'v_sf1', level: 3, levelLabel: 'L3 Mutawassith 1', name_ar: 'كَرِيم', translit: 'karīm', meaning: 'Mulia dermawan', category: 'Sifat & Karakter', emoji: '🎁', exampleSentence: 'رَجُلٌ كَرِيمٌ يُطْعِمُ المَسَاكِينَ', exampleMeaning: 'Seorang pria dermawan memberi makan kaum miskin' },
  { id: 'v_sf2', level: 3, levelLabel: 'L3 Mutawassith 1', name_ar: 'شُجَاع', translit: 'shujāʿ', meaning: 'Pemberani ksatria', category: 'Sifat & Karakter', emoji: '🦁', exampleSentence: 'الجُنْدِيُّ شُجَاعٌ فِي حِمَايَةِ الوَطَنِ', exampleMeaning: 'Prajurit itu gagah berani menjaga tanah air' },

  // Jamak Taksir Populer
  { id: 'v_jt1', level: 3, levelLabel: 'L3 Mutawassith 1', name_ar: 'كُتُب', translit: 'kutub', meaning: 'Buku-buku (jamak kitāb)', category: 'Jamak Taksir Berfrekuensi', emoji: '📚', exampleSentence: 'فِي المَكْتَبَةِ كُتُبٌ كَثِيرَةٌ نَافِعَةٌ', exampleMeaning: 'Di perpustakaan terdapat banyak buku bermanfaat' },
  { id: 'v_jt2', level: 3, levelLabel: 'L3 Mutawassith 1', name_ar: 'مَسَاجِد', translit: 'masājid', meaning: 'Masjid-masjid (jamak masjid)', category: 'Jamak Taksir Berfrekuensi', emoji: '🕌', exampleSentence: 'المَسَاجِدُ بُيُوتُ اللَّهِ فِي الأَرْضِ', exampleMeaning: 'Masjid-masjid adalah rumah Allah di muka bumi' },

  // Geografi & Bentang Alam
  { id: 'v_geo1', level: 3, levelLabel: 'L3 Mutawassith 1', name_ar: 'جَبَل', translit: 'jabal', meaning: 'Gunung menjulang kokoh', category: 'Geografi & Bentang Alam', emoji: '⛰️', exampleSentence: 'جَبَلُ أُحُدٍ يُحِبُّنَا وَنُحِبُّهُ', exampleMeaning: 'Gunung Uhud mencintai kita dan kita mencintainya' },
  { id: 'v_geo2', level: 3, levelLabel: 'L3 Mutawassith 1', name_ar: 'نَهْر', translit: 'nahr', meaning: 'Sungai mengalir jernih', category: 'Geografi & Bentang Alam', emoji: '🏞️', exampleSentence: 'مَاءُ النَّهْرِ عَذْبٌ فُرَاتٌ', exampleMeaning: 'Air sungai itu tawar dan menyegarkan' },

  // ==================== LEVEL 4: MUTAWASSITH 2 (B2) ====================
  // Sains & Teknologi Digital
  { id: 'v_sc1', level: 4, levelLabel: 'L4 Mutawassith 2', name_ar: 'حَاسُوب', translit: 'ḥāsūb', meaning: 'Komputer digital prosesor', category: 'Sains & Teknologi Digital', emoji: '💻', exampleSentence: 'الحَاسُوبُ يُسَاعِدُ البَاحِثِينَ فِي الحِسَابَاتِ', exampleMeaning: 'Komputer membantu peneliti dalam kalkulasi data' },
  { id: 'v_sc2', level: 4, levelLabel: 'L4 Mutawassith 2', name_ar: 'شَبَكَة', translit: 'shabakah', meaning: 'Jaringan internet dunia', category: 'Sains & Teknologi Digital', emoji: '🌐', exampleSentence: 'نَتَوَاصَلُ عَبْرَ الشَّبَكَةِ العَالَمِيَّةِ لَحْظِيًّا', exampleMeaning: 'Kita berkomunikasi via jaringan dunia seketika' },

  // Bisnis & Korporasi
  { id: 'v_bs1', level: 4, levelLabel: 'L4 Mutawassith 2', name_ar: 'شَرِكَة', translit: 'sharikah', meaning: 'Perusahaan korporasi', category: 'Bisnis & Manajemen', emoji: '🏢', exampleSentence: 'أَسَّسَ الشَّبَابُ شَرِكَةً رَقْمِيَّةً نَاجِحَةً', exampleMeaning: 'Pemuda itu mendirikan perusahaan digital yang sukses' },
  { id: 'v_bs2', level: 4, levelLabel: 'L4 Mutawassith 2', name_ar: 'إِدَارَة', translit: 'idārah', meaning: 'Manajemen kepengurusan', category: 'Bisnis & Manajemen', emoji: '📊', exampleSentence: 'الإِدَارَةُ الحَكِيمَةُ سَبَبُ نَجَاحِ المَشْرُوعِ', exampleMeaning: 'Manajemen yang bijak adalah kunci sukses proyek' },

  // Idiom & Pepatah
  { id: 'v_id1', level: 4, levelLabel: 'L4 Mutawassith 2', name_ar: 'يَدًا بِيَد', translit: 'yadan bi-yad', meaning: 'Bahu membahu bergandengan tangan', category: 'Idiom & Metafora', emoji: '🤝', exampleSentence: 'نَعْمَلُ يَدًا بِيَدٍ لِرِفْعَةِ الأُمَّةِ', exampleMeaning: 'Kita bekerja bahu membahu demi kemajuan umat' },
  { id: 'v_id2', level: 4, levelLabel: 'L4 Mutawassith 2', name_ar: 'مِنْ صَمِيمِ القَلْب', translit: 'min ṣamīmi l-qalb', meaning: 'Dari lubuk hati yang paling dalam', category: 'Idiom & Metafora', emoji: '💖', exampleSentence: 'أَشْكُرُكُمْ مِنْ صَمِيمِ القَلْبِ عَلَى دَعْمِكُمْ', exampleMeaning: 'Saya berterima kasih dari lubuk hati terdalam' },

  // ==================== LEVEL 5: MUTAQADDIM (C1-C2) ====================
  // Taraduf & Nuansa Semantik
  { id: 'v_tr1', level: 5, levelLabel: 'L5 Mutaqaddim', name_ar: 'فَرَح / سُرُور', translit: 'faraḥ vs surūr', meaning: 'Gembira lahiriah vs Bahagia batin tenang', category: 'Nuansa Semantik (Taraduf)', emoji: '😊💖', exampleSentence: 'الفَرَحُ يَبْدُو عَلَى الوَجْهِ وَالسُّرُورُ يَسْكُنُ الفُؤَادَ', exampleMeaning: 'Farah tampak di wajah, sedang surur bersemayam di hati' },
  { id: 'v_tr2', level: 5, levelLabel: 'L5 Mutaqaddim', name_ar: 'مَطَر / غَيْث', translit: 'maṭar vs ghayth', meaning: 'Hujan biasa/azab vs Hujan rahmat penolong', category: 'Nuansa Semantik (Taraduf)', emoji: '🌧️🌱', exampleSentence: 'نَزَلَ الغَيْثُ فَأَحْيَا الأَرْضَ بَعْدَ مَوْتِهَا', exampleMeaning: 'Hujan rahmat turun dan menghidupkan bumi yang gersang' },

  // Diplomasi & Hukum Internasional
  { id: 'v_dp1', level: 5, levelLabel: 'L5 Mutaqaddim', name_ar: 'سِيَادَة', translit: 'siyādah', meaning: 'Kedaulatan bangsa merdeka', category: 'Diplomasi & Hukum Antarbangsa', emoji: '👑', exampleSentence: 'الدِّفَاعُ عَنْ سِيَادَةِ الوَطَنِ وَاجِبٌ مُقَدَّسٌ', exampleMeaning: 'Membela kedaulatan tanah air adalah kewajiban mulia' },
  { id: 'v_dp2', level: 5, levelLabel: 'L5 Mutaqaddim', name_ar: 'مُعَاهَدَة', translit: 'muʿāhadah', meaning: 'Traktat perjanjian internasional', category: 'Diplomasi & Hukum Antarbangsa', emoji: '📜', exampleSentence: 'وَقَّعَتِ الدُّوَلُ مُعَاهَدَةَ السَّلَامِ الدَّائِمِ', exampleMeaning: 'Negara-negara menandatangani traktat perdamaian abadi' },

  // Sastra Arab & Balaghah
  { id: 'v_lt1', level: 5, levelLabel: 'L5 Mutaqaddim', name_ar: 'قَصِيدَة', translit: 'qaṣīdah', meaning: 'Antologi qasidah puisi tinggi', category: 'Sastra & Balaghah', emoji: '✒️', exampleSentence: 'أَنْشَدَ الشَّاعِرُ قَصِيدَةً عَصْمَاءَ فِي مَدْحِ النَّبِيِّ', exampleMeaning: 'Penyair melantunkan qasidah agung memuji Baginda Nabi' },
  { id: 'v_lt2', level: 5, levelLabel: 'L5 Mutaqaddim', name_ar: 'اِسْتِعَارَة', translit: 'istiʿārah', meaning: 'Metafora balaghah tingkat tinggi', category: 'Sastra & Balaghah', emoji: '✨', exampleSentence: 'الاسْتِعَارَةُ تَخْلُقُ صُورَةً خَيَالِيَّةً بَدِيعَةً', exampleMeaning: 'Metafora melahirkan imajinasi sastra yang memukau' },

  // Turats & Qur'ani
  { id: 'v_qr1', level: 5, levelLabel: 'L5 Mutaqaddim', name_ar: 'فُرْقَان', translit: 'furqān', meaning: 'Pembeda hakiki antara haq dan bathil', category: 'Khazanah Turats & Qur\'an', emoji: '📖', exampleSentence: 'تَبَارَكَ الَّذِي نَزَّلَ الفُرْقَانَ عَلَى عَبْدِهِ', exampleMeaning: 'Maha Berkah Allah yang telah menurunkan Al-Furqan' },
  { id: 'v_qr2', level: 5, levelLabel: 'L5 Mutaqaddim', name_ar: 'سَكِينَة', translit: 'sakīnah', meaning: 'Kedamaian batin ilahi', category: 'Khazanah Turats & Qur\'an', emoji: '🕊️', exampleSentence: 'أَنْزَلَ اللَّهُ سَكِينَتَهُ عَلَى قُلُوبِ الصَّادِقِينَ', exampleMeaning: 'Allah menurunkan sakinah kedamaian kepada orang tulus' }
];

export const PulauMufradatHubModal: React.FC<PulauMufradatHubModalProps> = ({
  island,
  profile,
  onClose,
  onLaunchGame,
  onReward
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'thesaurus' | 'quiz' | 'docks'>('overview');
  const [levelFilter, setLevelFilter] = useState<number | 'all'>('all');
  const [selectedWord, setSelectedWord] = useState<VocabularyCard>(THEMATIC_VOCAB_COLLECTION[0]);
  const [claimedDialogueXP, setClaimedDialogueXP] = useState(false);

  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [answeredQuestion, setAnsweredQuestion] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  // Filtered list of words based on level
  const filteredWords = useMemo(() => {
    if (levelFilter === 'all') return THEMATIC_VOCAB_COLLECTION;
    return THEMATIC_VOCAB_COLLECTION.filter(w => w.level === levelFilter);
  }, [levelFilter]);

  // Quiz questions derived from collection
  const quizQuestions = useMemo(() => {
    return THEMATIC_VOCAB_COLLECTION.slice(0, 10).map((card, idx) => {
      // Pick 2 distractors
      const otherWords = THEMATIC_VOCAB_COLLECTION.filter(w => w.id !== card.id);
      const dist1 = otherWords[(idx * 3 + 1) % otherWords.length].meaning;
      const dist2 = otherWords[(idx * 5 + 2) % otherWords.length].meaning;
      const options = [
        { text: card.meaning, isCorrect: true },
        { text: dist1, isCorrect: false },
        { text: dist2, isCorrect: false }
      ].sort(() => 0.5 - Math.random());

      return {
        card,
        options
      };
    });
  }, []);

  const handleClaimGuideReward = () => {
    if (claimedDialogueXP) return;
    sound.playSuccess();
    sound.speakArabic('مَرْحَبًا بِكُمْ فِي سُوقِ المُفْرَدَاتِ العَجِيبَة!');
    setClaimedDialogueXP(true);
    GameStorage.addReward(60, 1, 'lughah', 6);
    onReward(60, 1);
  };

  const handleAnswerQuiz = (selectedText: string, isCorrect: boolean) => {
    if (answeredQuestion) return;
    setSelectedAnswer(selectedText);
    setAnsweredQuestion(true);

    if (isCorrect) {
      sound.playSuccess();
      sound.speakArabic(quizQuestions[quizIndex].card.name_ar);
      setQuizScore(prev => prev + 1);
      GameStorage.addReward(20, 0, 'lughah', 2);
      onReward(20, 0);
    } else {
      sound.playGentleRetry();
    }
  };

  const handleNextQuiz = () => {
    setAnsweredQuestion(false);
    setSelectedAnswer(null);
    if (quizIndex + 1 < quizQuestions.length) {
      setQuizIndex(prev => prev + 1);
    } else {
      setQuizIndex(0); // loop
    }
  };

  const hasCrystal = Boolean(profile.crystals[island.id]);

  const tabs = [
    { id: 'overview', label: '🧭 Eksplorasi Pasar & Panduan' },
    { id: 'thesaurus', label: '📖 Kosakata Tematik (L0–L5)', badge: `${filteredWords.length}` },
    { id: 'quiz', label: '✨ Kuis Semantik Perahu' },
    { id: 'docks', label: '🎮 Wahana Mini-Games', badge: '3' },
  ];

  const guide = {
    name: 'Bibi Maryam al-Bahr',
    role: 'Nahkoda & Pemandu Mufradat',
    avatar: '🛶',
    greetingAr: 'أَهْلاً وَسَهْلاً فِي سُوقِ الكَلِمَاتِ!',
    speechText: 'Selamat datang di Pasar Apung Mufradat! Kuasai kosakata tematik dari Level 0 hingga Level 5 untuk membuka berkah perdagangan bahasa.',
    onClaimXP: handleClaimGuideReward,
    claimedXP: claimedDialogueXP
  };

  return (
    <IslandModalLayout
      island={{
        id: island.id,
        name_id: island.name_id,
        name_ar: island.name_ar,
        domain: island.domain,
        biome: 'Bioma Pasar Terapung Perahu',
        crystalName: island.crystalName,
        minLevel: island.minLevel,
        color: '#f59e0b'
      }}
      hasCrystal={hasCrystal}
      isUnlocked={true}
      guide={guide}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={(tabId) => setActiveTab(tabId as any)}
      onClose={onClose}
    >

        {/* Tab 1: Overview & Pemandu Pulau */}
        {activeTab === 'overview' && (
          <div className="p-6 overflow-y-auto flex-1 space-y-5">
            {/* Guide Card (Bibi Maryam al-Bahr) */}
            <div className="bg-gradient-to-r from-amber-100 via-orange-100 to-yellow-100 rounded-3xl p-5 border-2 border-amber-300 shadow-sm flex flex-col md:flex-row items-center gap-5">
              <div className="relative">
                <div className="w-24 h-24 rounded-3xl bg-amber-400 text-white flex items-center justify-center text-5xl shadow-md border-4 border-white">
                  🧕
                </div>
                <span className="absolute -bottom-2 -right-1 text-2xl" title="Bibi Maryam">
                  ⛵
                </span>
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                  <h3 className="font-bold text-lg text-slate-800">
                    Bibi Maryam (مَرْيَم البَحَّارَة)
                  </h3>
                  <span className="text-xs bg-amber-300 text-amber-950 font-bold px-2 py-0.5 rounded-full">
                    Nakhoda Pasar Mufradat
                  </span>
                </div>
                <p className="text-xs text-amber-950 italic mb-2">
                  "أَهْلًا وَسَهْلًا بِكُمْ فِي سُوقِ المُفْرَدَاتِ البَدِيعَة! Selamat datang di pasar apung kosakata kami! Di sini kurikulum telah diselaraskan menjadi 36 keterampilan tematik terstruktur rapi dari Tamhidi L0 hingga Mutaqaddim L5 (Rumah, Profesi, Alam, Teknologi, Diplomasi, dan Balaghah Sastra). Ambil perahumu dan raih kekayaan kosa kata emas!"
                </p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                  <button
                    onClick={() => sound.speakArabic('أَهْلًا وَسَهْلًا بِكُمْ فِي سُوقِ المُفْرَدَاتِ العَجِيبَة!')}
                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs"
                  >
                    <Volume2 className="w-4 h-4" /> Dengarkan Sapaan Bibi Maryam
                  </button>
                  {!claimedDialogueXP ? (
                    <button
                      onClick={handleClaimGuideReward}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs"
                    >
                      <Sparkles className="w-4 h-4" /> Terima Sambutan (+60 XP)
                    </button>
                  ) : (
                    <span className="text-xs text-emerald-700 font-bold flex items-center gap-1 bg-emerald-100 px-3 py-1.5 rounded-xl">
                      <CheckCircle2 className="w-4 h-4" /> Sambutan Diterima (+60 XP)!
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Island Statistics & Lore */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-3xl border border-amber-200 shadow-xs">
                <span className="text-xs text-slate-500 block mb-1">Cakupan Kurikulum</span>
                <div className="text-xl font-extrabold text-amber-900 flex items-center gap-2">
                  36 Skill Tematik <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">L0–L5</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-1">
                  6 jenjang bertingkat x 6 skill: Fondasi Rumah, Profesi, Alam Geografi, Sains Digital, Diplomasi, hingga Sastra Klasik.
                </p>
              </div>
              <div className="bg-white p-4 rounded-3xl border border-amber-200 shadow-xs">
                <span className="text-xs text-slate-500 block mb-1">Perbendaharaan Leksikon</span>
                <div className="text-xl font-extrabold text-orange-600 flex items-center gap-2">
                  187+ Kosakata <span className="text-xs bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full font-bold">100% Berharakat</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-1">
                  Dilengkapi audio pelafalan fasih penutur asli, transliterasi presisi, dan contoh kalimat berfaedah (jumlah mufidah).
                </p>
              </div>
              <div className="bg-white p-4 rounded-3xl border border-amber-200 shadow-xs">
                <span className="text-xs text-slate-500 block mb-1">Kedalaman Pedagogis</span>
                <div className="text-xl font-extrabold text-amber-500 flex items-center gap-2">
                  100% Standar Emas 💎
                </div>
                <p className="text-[11px] text-slate-600 mt-1">
                  Seluruh 36 skill memiliki modul kaidah, tips praktis Hudhud, dan kuis pemahaman konsep langsung.
                </p>
              </div>
            </div>

            {/* Direct Game Quick Jump */}
            <div className="bg-white rounded-3xl p-5 border border-amber-200 shadow-sm">
              <h4 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2">
                <Play className="w-4 h-4 text-amber-600" /> Pilih Wahana untuk Dimainkan Sekarang:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => onLaunchGame('floating_market')}
                  className="p-3 rounded-2xl bg-amber-50 hover:bg-amber-100 border-2 border-amber-300 text-left transition-all group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-2xl mb-1 block">⛵</span>
                    <strong className="text-slate-800 text-xs block group-hover:text-amber-800">
                      Floating Market Quest
                    </strong>
                    <span className="text-[10px] text-slate-600 block mt-0.5">
                      Layani pesanan audio pelanggan dari perahu terapung.
                    </span>
                  </div>
                  <span className="text-[10px] text-amber-700 font-bold mt-2 flex items-center gap-1">
                    Buka Game <ChevronRight className="w-3 h-3" />
                  </span>
                </button>

                <button
                  onClick={() => onLaunchGame('basket_spell')}
                  className="p-3 rounded-2xl bg-orange-50 hover:bg-orange-100 border-2 border-orange-300 text-left transition-all group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-2xl mb-1 block">🧺</span>
                    <strong className="text-slate-800 text-xs block group-hover:text-orange-800">
                      Basket Spell (Keranjang)
                    </strong>
                    <span className="text-[10px] text-slate-600 block mt-0.5">
                      Susun huruf sambung menjadi kata benda bergambar.
                    </span>
                  </div>
                  <span className="text-[10px] text-orange-700 font-bold mt-2 flex items-center gap-1">
                    Buka Game <ChevronRight className="w-3 h-3" />
                  </span>
                </button>

                <button
                  onClick={() => onLaunchGame('sky_runner')}
                  className="p-3 rounded-2xl bg-sky-50 hover:bg-sky-100 border-2 border-sky-300 text-left transition-all group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-2xl mb-1 block">🚀</span>
                    <strong className="text-slate-800 text-xs block group-hover:text-sky-800">
                      Sky Runner Arabi
                    </strong>
                    <span className="text-[10px] text-slate-600 block mt-0.5">
                      Meluncur di 3 jalur udara menuju gerbang arti kata yang tepat.
                    </span>
                  </div>
                  <span className="text-[10px] text-sky-700 font-bold mt-2 flex items-center gap-1">
                    Buka Game <ChevronRight className="w-3 h-3" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Thesaurus & Kamus Tematik Interaktif dengan Filter Jenjang L0-L5 */}
        {activeTab === 'thesaurus' && (
          <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-4">
            {/* Level Filter Bar */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-amber-200">
              <span className="text-xs font-bold text-slate-500 flex items-center gap-1 mr-1">
                <Filter className="w-3.5 h-3.5" /> Jenjang:
              </span>
              <button
                onClick={() => setLevelFilter('all')}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                  levelFilter === 'all'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white border border-amber-200 text-slate-700 hover:bg-amber-50'
                }`}
              >
                Semua Jenjang ({THEMATIC_VOCAB_COLLECTION.length})
              </button>
              {[
                { lvl: 0, label: 'L0: Tamhidi' },
                { lvl: 1, label: 'L1: Mubtadi\' 1' },
                { lvl: 2, label: 'L2: Mubtadi\' 2' },
                { lvl: 3, label: 'L3: Mutawassith 1' },
                { lvl: 4, label: 'L4: Mutawassith 2' },
                { lvl: 5, label: 'L5: Mutaqaddim' }
              ].map(item => (
                <button
                  key={item.lvl}
                  onClick={() => setLevelFilter(item.lvl)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    levelFilter === item.lvl
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-white border border-amber-200 text-slate-700 hover:bg-amber-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Split View: Word List & Word Detail Spotlight */}
            <div className="flex flex-col md:flex-row gap-5 flex-1 min-h-[380px]">
              {/* Left Column: Word List */}
              <div className="w-full md:w-1/2 space-y-2 max-h-[420px] overflow-y-auto pr-1">
                {filteredWords.map((card) => {
                  const isSelected = selectedWord.id === card.id;
                  return (
                    <button
                      key={card.id}
                      onClick={() => {
                        setSelectedWord(card);
                        sound.speakArabic(card.name_ar);
                      }}
                      className={`w-full p-3 rounded-2xl text-left border flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-amber-100/90 border-amber-400 ring-2 ring-amber-300 shadow-sm'
                          : 'bg-white border-slate-200 hover:bg-amber-50/60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{card.emoji}</span>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-arabic font-bold text-xl text-slate-900 leading-tight">
                              {card.name_ar}
                            </span>
                            <span className="text-[10px] bg-amber-200/80 text-amber-950 font-bold px-1.5 py-0.2 rounded-md">
                              {card.levelLabel}
                            </span>
                          </div>
                          <span className="text-xs font-semibold text-amber-900 block mt-0.5">
                            {card.translit} • {card.meaning}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs text-amber-600 font-bold px-2 py-1 bg-amber-50 rounded-lg">
                        🔊
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Word Detail Spotlight */}
              <div className="w-full md:w-1/2 bg-white rounded-3xl p-6 border-2 border-amber-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-amber-100 text-amber-900 font-bold px-3 py-1 rounded-full">
                        Kategori: {selectedWord.category}
                      </span>
                      <span className="text-xs bg-orange-100 text-orange-900 font-bold px-2.5 py-1 rounded-full">
                        {selectedWord.levelLabel}
                      </span>
                    </div>
                    <button
                      onClick={() => sound.speakArabic(selectedWord.name_ar)}
                      className="p-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white shadow-xs transition-transform active:scale-95"
                      title="Lafalkan kata"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="text-center py-4">
                    <div className="text-6xl mb-2">{selectedWord.emoji}</div>
                    <h3 className="font-arabic font-extrabold text-5xl text-amber-950 mb-1 leading-normal">
                      {selectedWord.name_ar}
                    </h3>
                    <p className="text-sm font-bold text-amber-800">
                      {selectedWord.translit}
                    </p>
                    <p className="text-base font-semibold text-slate-700 mt-1">
                      "{selectedWord.meaning}"
                    </p>
                  </div>

                  {/* Example sentence box */}
                  <div className="bg-amber-50/90 rounded-2xl p-4 border border-amber-200 mt-2 text-center">
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-800 block mb-1">
                      Contoh Kalimat Sempurna (جُمْلَة مُفِيدَة):
                    </span>
                    <p className="font-arabic font-bold text-xl text-slate-900 mb-1">
                      "{selectedWord.exampleSentence}"
                    </p>
                    <p className="text-xs text-slate-600 italic">
                      "{selectedWord.exampleMeaning}"
                    </p>
                    <button
                      onClick={() => sound.speakArabic(selectedWord.exampleSentence)}
                      className="mt-2 text-xs text-amber-700 hover:text-amber-900 font-bold flex items-center justify-center gap-1 mx-auto"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Dengarkan Contoh Kalimat
                    </button>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Standar Kurikulum 36 Kategori Tematik</span>
                  <span className="text-emerald-700 font-bold">100% Berharakat Penuh</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Tantangan Kuis Semantik Perahu Dagang */}
        {activeTab === 'quiz' && (
          <div className="p-6 overflow-y-auto flex-1 space-y-4">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-3xl p-5 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-100 block">
                  Uji Pemahaman Mufradat Perahu
                </span>
                <h3 className="text-lg font-bold">Tantangan Semantik Koin Emas</h3>
                <p className="text-xs text-amber-100 mt-0.5">
                  Dengarkan audio kata Arab, pilih arti yang tepat, kumpulkan koin XP!
                </p>
              </div>
              <div className="text-right bg-white/20 px-4 py-2 rounded-2xl backdrop-blur-xs">
                <span className="text-[11px] block font-bold text-amber-100">Skor Benar:</span>
                <span className="text-2xl font-extrabold">{quizScore} / {quizQuestions.length}</span>
              </div>
            </div>

            {/* Quiz Question Card */}
            {quizQuestions[quizIndex] && (
              <div className="bg-white rounded-3xl p-6 border-2 border-amber-300 shadow-md space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-amber-100 text-amber-900 font-bold px-3 py-1 rounded-full">
                    Pertanyaan {quizIndex + 1} dari {quizQuestions.length}
                  </span>
                  <button
                    onClick={() => sound.speakArabic(quizQuestions[quizIndex].card.name_ar)}
                    className="flex items-center gap-1.5 px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold shadow-xs"
                  >
                    <Volume2 className="w-4 h-4" /> Putar Audio Kata
                  </button>
                </div>

                <div className="text-center py-2">
                  <span className="text-5xl block mb-2">{quizQuestions[quizIndex].card.emoji}</span>
                  <h4 className="font-arabic font-bold text-4xl text-amber-950">
                    {quizQuestions[quizIndex].card.name_ar}
                  </h4>
                  <span className="text-xs font-bold text-amber-800 mt-1 block">
                    ({quizQuestions[quizIndex].card.translit})
                  </span>
                  <p className="text-sm font-semibold text-slate-600 mt-2">
                    Apakah arti yang paling tepat dari kosa kata di atas?
                  </p>
                </div>

                {/* Options List */}
                <div className="space-y-2.5 max-w-lg mx-auto">
                  {quizQuestions[quizIndex].options.map((opt, i) => {
                    const isSelected = selectedAnswer === opt.text;
                    let btnStyle = 'bg-slate-50 border-slate-200 hover:bg-amber-50 text-slate-800';
                    if (answeredQuestion) {
                      if (opt.isCorrect) {
                        btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-900 font-bold';
                      } else if (isSelected && !opt.isCorrect) {
                        btnStyle = 'bg-rose-100 border-rose-500 text-rose-900 line-through';
                      }
                    }

                    return (
                      <button
                        key={i}
                        disabled={answeredQuestion}
                        onClick={() => handleAnswerQuiz(opt.text, opt.isCorrect)}
                        className={`w-full p-3.5 rounded-2xl border-2 text-left text-sm font-medium transition-all flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{opt.text}</span>
                        {answeredQuestion && opt.isCorrect && (
                          <Check className="w-5 h-5 text-emerald-600" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Next Button after answering */}
                {answeredQuestion && (
                  <div className="flex justify-end pt-2">
                    <button
                      onClick={handleNextQuiz}
                      className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-2xl text-xs shadow-md hover:from-amber-600 hover:to-orange-600 flex items-center gap-2"
                    >
                      Lanjut ke Soal Berikutnya <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Docks Games Catalog */}
        {activeTab === 'docks' && (
          <div className="p-6 overflow-y-auto flex-1 space-y-4">
            <div className="text-center max-w-lg mx-auto mb-2">
              <h3 className="font-bold text-lg text-slate-800">Wahana Pembelajaran Pasar Apung</h3>
              <p className="text-xs text-slate-600">
                Setiap wahana melatih kemampuan mufradat yang berbeda: mendengarkan pesanan, menyusun huruf ejaan, dan kecepatan reaksi memilih arti kata.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Game 1 */}
              <div className="bg-white rounded-3xl p-5 border-2 border-amber-300 shadow-md flex flex-col justify-between hover:shadow-lg transition-all">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-3xl mb-3">
                    ⛵
                  </div>
                  <h4 className="font-bold text-base text-slate-800 mb-1">
                    Floating Market Quest
                  </h4>
                  <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full inline-block mb-2">
                    Reading & Audio Recognition
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Nakhoda, kucing pelaut, dan musafir datang memesan dengan kalimat Arab. Temukan barang di perahu dan dapatkan koin dinar.
                  </p>
                </div>
                <button
                  onClick={() => onLaunchGame('floating_market')}
                  className="mt-4 w-full py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl text-xs shadow-xs hover:from-amber-600 hover:to-orange-600 flex items-center justify-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5" /> Mainkan Sekarang
                </button>
              </div>

              {/* Game 2 */}
              <div className="bg-white rounded-3xl p-5 border-2 border-orange-300 shadow-md flex flex-col justify-between hover:shadow-lg transition-all">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center text-3xl mb-3">
                    🧺
                  </div>
                  <h4 className="font-bold text-base text-slate-800 mb-1">
                    Basket Spell (Keranjang)
                  </h4>
                  <span className="text-[10px] bg-orange-100 text-orange-900 font-bold px-2 py-0.5 rounded-full inline-block mb-2">
                    Writing & Spelling
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Ambil huruf dari keranjang dan susun dari kanan ke kiri sesuai sambungan huruf Arab yang tepat.
                  </p>
                </div>
                <button
                  onClick={() => onLaunchGame('basket_spell')}
                  className="mt-4 w-full py-2.5 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold rounded-xl text-xs shadow-xs hover:from-orange-600 hover:to-amber-700 flex items-center justify-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5" /> Mainkan Sekarang
                </button>
              </div>

              {/* Game 3 */}
              <div className="bg-white rounded-3xl p-5 border-2 border-sky-300 shadow-md flex flex-col justify-between hover:shadow-lg transition-all">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center text-3xl mb-3">
                    🚀
                  </div>
                  <h4 className="font-bold text-base text-slate-800 mb-1">
                    Sky Runner Arabi
                  </h4>
                  <span className="text-[10px] bg-sky-100 text-sky-900 font-bold px-2 py-0.5 rounded-full inline-block mb-2">
                    Speed Quiz & Vocab Reflex
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Pacu perahu langit di 3 jalur gerbang kata. Hindari kata yang salah sebelum menabrak portal mufradat.
                  </p>
                </div>
                <button
                  onClick={() => onLaunchGame('sky_runner')}
                  className="mt-4 w-full py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold rounded-xl text-xs shadow-xs hover:from-sky-600 hover:to-indigo-700 flex items-center justify-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5" /> Mainkan Sekarang
                </button>
              </div>
            </div>
          </div>
        )}

    </IslandModalLayout>
  );
};
