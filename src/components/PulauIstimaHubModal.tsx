import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Play,
  Volume2,
  Award,
  BookOpen,
  Headphones,
  CheckCircle2,
  ChevronRight,
  Star,
  Compass,
  Gauge,
  Radio,
  Flame,
  HelpCircle,
  RotateCcw
} from 'lucide-react';
import { UserProfile, Island } from '../types/game';
import { sound } from '../services/sound';
import { SKILLS_DATA, LEXICON_DATA } from '../data/curriculum';

interface PulauIstimaHubModalProps {
  island: Island;
  profile: UserProfile;
  onClose: () => void;
  onLaunchGame: (gameId: string) => void;
  onReward?: (xp: number, stars: number) => void;
}

// 1. Data Pasangan Minimal & Lab Resonansi
interface MinimalPairConcept {
  id: string;
  title: string;
  titleAr: string;
  category: 'halq' | 'ithbaq' | 'mad' | 'harakat';
  explanation: string;
  itemA: {
    ar: string;
    translit: string;
    meaning: string;
    makhrajNote: string;
  };
  itemB: {
    ar: string;
    translit: string;
    meaning: string;
    makhrajNote: string;
  };
}

const MINIMAL_PAIRS_DATA: MinimalPairConcept[] = [
  {
    id: 'mp1',
    title: 'Kontras Qaf (ق) vs Kaf (ك)',
    titleAr: 'قَلْب (Hati) vs كَلْب (Anjing)',
    category: 'ithbaq',
    explanation: 'Huruf Qaf (ق) keluar dari pangkal lidah terdalam menyentuh langit-langit lunak, menghasilkan ketukan berat & tebal. Huruf Kaf (ك) sedikit lebih ke depan di langit-langit keras, tipis dan memiliki hams (hembusan angin).',
    itemA: {
      ar: 'قَلْب',
      translit: 'qalb',
      meaning: 'Hati / Jantung',
      makhrajNote: 'Isti\'la & tebal (tafkhim) di pangkal lidah'
    },
    itemB: {
      ar: 'كَلْب',
      translit: 'kalb',
      meaning: 'Anjing',
      makhrajNote: 'Istifal & tipis (tarqiq) berhembus hams'
    }
  },
  {
    id: 'mp2',
    title: 'Kontras \'Ain (ع) vs Hamzah (ء)',
    titleAr: 'عَلِيم (Maha Mengetahui) vs أَلِيم (Pedih)',
    category: 'halq',
    explanation: 'Huruf \'Ain (ع) mengalir dengan tekanan halus di tengah tenggorokan (wasathul halq). Hamzah (ء) terhentak tegas di pangkal tenggorokan terdalam (aqshal halq). Kesalahan mendengar keduanya dapat mengubah makna doa atau ayat!',
    itemA: {
      ar: 'عَلِيم',
      translit: 'ʿalīm',
      meaning: 'Maha Mengetahui',
      makhrajNote: 'Tengah tenggorokan, suara mengalir sedang'
    },
    itemB: {
      ar: 'أَلِيم',
      translit: 'alīm',
      meaning: 'Sangat Pedih / Menyakitkan',
      makhrajNote: 'Pangkal tenggorokan bawah, hentian pita suara'
    }
  },
  {
    id: 'mp3',
    title: 'Kontras Shad (ص) vs Sin (س)',
    titleAr: 'صَيْف (Musim Panas) vs سَيْف (Pedang)',
    category: 'ithbaq',
    explanation: 'Keduanya memiliki sifat Shafīr (desis), namun Shad (ص) memiliki sifat Ithbaq (rongga mulut tertutup dan lidah terangkat ke langit-langit), membuat desisnya bergema bulat dan tebal dibanding Sin (س) yang tipis tersenyum.',
    itemA: {
      ar: 'صَيْف',
      translit: 'ṣayf',
      meaning: 'Musim Panas',
      makhrajNote: 'Ithbaq & tebal bulat (tafkhim)'
    },
    itemB: {
      ar: 'سَيْف',
      translit: 'sayf',
      meaning: 'Pedang',
      makhrajNote: 'Infitah & tipis datar (tarqiq)'
    }
  },
  {
    id: 'mp4',
    title: 'Vokal Pendek vs Mad Panjang 2 Harakat',
    titleAr: 'جَمَل (Unta) vs جَمَال (Keindahan)',
    category: 'mad',
    explanation: 'Dalam bahasa Arab, panjang vokal (Mad Thabi\'i) adalah pembeda fonemik (makna kata). Memanjangkan bunyi fathah pada huruf mim mengubah kata benda hewan "unta" menjadi kata sifat abstrak "keindahan".',
    itemA: {
      ar: 'جَمَل',
      translit: 'jamal',
      meaning: 'Unta (1 harakat)',
      makhrajNote: 'Vokal pendek tunggal (fathah murni)'
    },
    itemB: {
      ar: 'جَمَال',
      translit: 'jamāl',
      meaning: 'Keindahan (2 harakat)',
      makhrajNote: 'Alif Mad thabi\'i pemanjang 2 harakat'
    }
  },
  {
    id: 'mp5',
    title: 'Kontras Tha (ث) vs Sin (س)',
    titleAr: 'ثَمَر (Buah) vs سَمَر (Begadang)',
    category: 'halq',
    explanation: 'Huruf Tha (ث) keluar dari ujung lidah menyentuh ujung gigi seri atas (menggigit sedikit lidah). Sedangkan Sin (س) di belakang gigi seri bawah.',
    itemA: {
      ar: 'ثَمَر',
      translit: 'thamar',
      meaning: 'Buah-buahan',
      makhrajNote: 'Ujung lidah menempel ujung gigi seri atas'
    },
    itemB: {
      ar: 'سَمَر',
      translit: 'samar',
      meaning: 'Bercengkerama di malam hari',
      makhrajNote: 'Ujung lidah di atas gigi seri bawah'
    }
  },
  {
    id: 'mp6',
    title: 'Kontras Ha Pedas (ح) vs Ha Dada (هـ)',
    titleAr: 'حَمْد (Pujian) vs هَمْد (Hancur Luluh)',
    category: 'halq',
    explanation: 'Huruf Ha (ح) keluar dari tengah tenggorokan dengan hembusan bersih tanpa gesekan kasar. Sedangkan Ha (هـ) keluar dari pangkal dada/tenggorokan terdalam dengan nafas plong terbuka.',
    itemA: {
      ar: 'حَمْد',
      translit: 'ḥamd',
      meaning: 'Pujian / Syukur',
      makhrajNote: 'Tengah tenggorokan bersih (wasathul halq)'
    },
    itemB: {
      ar: 'هَمْد',
      translit: 'hamd',
      meaning: 'Hancur luluh / binasa',
      makhrajNote: 'Pangkal dada bawah (aqshal halq)'
    }
  },
  {
    id: 'mp7',
    title: 'Kontras Tha Tebal (ط) vs Ta Tipis (ت)',
    titleAr: 'طِين (Tanah Liat) vs تِين (Buah Tin)',
    category: 'ithbaq',
    explanation: 'Huruf Tha (ط) adalah huruf terkuat dalam bahasa Arab dengan sifat Ithbaq, lidah menempel erat ke langit-langit menghasilkan ketukan bulat mantap. Ta (ت) tipis datar dan berdesis hams.',
    itemA: {
      ar: 'طِين',
      translit: 'ṭīn',
      meaning: 'Tanah liat / lempung',
      makhrajNote: 'Ithbaq, Isti\'la, sangat tebal mantap'
    },
    itemB: {
      ar: 'تِين',
      translit: 'tīn',
      meaning: 'Buah Ara / Tin',
      makhrajNote: 'Infitah, Istifal, tipis dan hembusan hams'
    }
  },
  {
    id: 'mp8',
    title: 'Kontras Dzal (ذ) vs Zha Tebal (ظ)',
    titleAr: 'ذِلّ (Kehinaan) vs ظِلّ (Naungan Rindang)',
    category: 'ithbaq',
    explanation: 'Keduanya di ujung lidah dan gigi seri atas, namun Zha (ظ) terangkat pangkal lidahnya (ithbaq & isti\'la) sehingga suaranya berdengung berat membedakan naungan rindang dari kehinaan!',
    itemA: {
      ar: 'ذِلّ',
      translit: 'dhill',
      meaning: 'Kehinaan / kerendahan',
      makhrajNote: 'Ujung lidah tipis terbuka (infitah)'
    },
    itemB: {
      ar: 'ظِلّ',
      translit: 'ẓill',
      meaning: 'Naungan sejuk rindang',
      makhrajNote: 'Ujung lidah tebal tertutup (ithbaq)'
    }
  }
];

// 2. Data Api Unggun Cerita Audio (Majlis al-Qasas)
interface AudioStory {
  id: string;
  title: string;
  titleAr: string;
  theme: string;
  summary: string;
  sentences: {
    ar: string;
    translit: string;
    id: string;
  }[];
  quiz: {
    question: string;
    options: string[];
    correctIdx: number;
    explanation: string;
  };
}

const AUDIO_STORIES: AudioStory[] = [
  {
    id: 'story_hudhud',
    title: 'Kisah Burung Hudhud yang Setia',
    titleAr: 'قِصَّةُ الهُدْهُدِ الأَمِين',
    theme: 'Kejujuran & Ketajaman Penglihatan',
    summary: 'Kisah burung Hudhud yang terbang melintasi negeri Saba\' membawa berita penting kepada Nabi Sulaiman \'alaihissalam.',
    sentences: [
      {
        ar: 'تَفَقَّدَ النَّبِيُّ سُلَيْمَانُ الطَّيْرَ فِي صَبَاحٍ جَمِيلٍ.',
        translit: 'Tafaqqada n-nabiyyu Sulaymānu ṭ-ṭayra fī ṣabāḥin jamīl.',
        id: 'Nabi Sulaiman memeriksa barisan burung di suatu pagi yang cerah.'
      },
      {
        ar: 'فَقَالَ: مَا لِيَ لَا أَرَى الهُدْهُدَ؟ أَمْ كَانَ مِنَ الغَائِبِينَ؟',
        translit: 'Fa-qāla: mā liya lā ʾarā l-hudhuda? ʾAm kāna mina l-ghāʾibīn?',
        id: 'Lalu beliau berkata: Mengapa aku tidak melihat Hudhud? Apakah ia termasuk yang tidak hadir?'
      },
      {
        ar: 'جَاءَ الهُدْهُدُ مُسْرِعًا وَقَالَ: أَحَطْتُ بِمَا لَمْ تُحِطْ بِهِ!',
        translit: 'Jāʾa l-hudhudu musriʿan wa-qāla: ʾaḥaṭtu bi-mā lam tuḥiṭ bih!',
        id: 'Burung Hudhud pun datang dengan bergegas dan berkata: Aku mengetahui sesuatu yang belum engkau ketahui!'
      },
      {
        ar: 'وَجِئْتُكَ مِنْ سَبَإٍ بِنَبَإٍ يَقِينٍ عَنْ مَمْلَكَةِ بِلْقِيس.',
        translit: 'Wa-jiʾtuka min Sabaʾin bi-nabaʾin yaqīn ʿan mamlakati Bilqīs.',
        id: 'Dan aku datang kepadamu dari negeri Saba membawa kabar berita yang pasti tentang kerajaan Ratu Bilqis.'
      }
    ],
    quiz: {
      question: 'Apa yang dibawa oleh burung Hudhud saat kembali kepada Nabi Sulaiman?',
      options: [
        'Makanan dan buah-buahan lezat',
        'Kabar berita yang meyakinkan dari negeri Saba\'',
        'Sepucuk pedang emas kuno',
        'Permata mutiara laut'
      ],
      correctIdx: 1,
      explanation: 'Hudhud berkata: "Wa-ji\'tuka min Saba\'in bi-naba\'in yaqīn" (Dan aku membawakanmu kabar yang meyakinkan dari Saba\').'
    }
  },
  {
    id: 'story_cat_abu_hurairah',
    title: 'Kucing Sahabat Abu Hurairah',
    titleAr: 'هِرَّةُ أَبِي هُرَيْرَة',
    theme: 'Kasih Sayang terhadap Binatang',
    summary: 'Kisah teladan sahabat mulia yang memelihara seekor anak kucing kecil di lengan bajunya dengan penuh kelembutan.',
    sentences: [
      {
        ar: 'كَانَ عَبْدُ الرَّحْمٰنِ يُحِبُّ الحَيَوَانَاتِ الرَّفِيقَةَ كَثِيرًا.',
        translit: 'Kāna ʿAbdu r-Raḥmāni yuḥibbu l-ḥayawānāti r-rafīqata kathīrā.',
        id: 'Dahulu Abdurrahman (Abu Hurairah) sangat menyukai hewan-hewan yang jinak.'
      },
      {
        ar: 'وَجَدَ هِرَّةً صَغِيرَةً ضَعِيفَةً فِي حَدِيقَةِ المَدِينَةِ.',
        translit: 'Wajada hirratan ṣaghīratan ḍaʿīfatan fī ḥadīqati l-Madīnah.',
        id: 'Beliau menemukan seekor anak kucing kecil yang lemah di kebun kota Madinah.'
      },
      {
        ar: 'فَوَضَعَهَا فِي كُمِّ ثَوْبِهِ وَأَطْعَمَهَا لَبَنًا صَافِيًا.',
        translit: 'Fa-waḍaʿahā fī kummi thawbihi wa-ʾaṭʿamahā labanan ṣāfiyā.',
        id: 'Maka ia meletakkannya di lengan jubahnya dan memberinya minum susu murni.'
      },
      {
        ar: 'فَلَقَّبَهُ النَّبِيُّ ﷺ بِمَحَبَّةٍ: يَا أَبَا هُرَيْرَة!',
        translit: 'Fa-laqqabahu n-nabiyyu ﷺ bi-maḥabbatin: yā ʾAbā Hurayrah!',
        id: 'Maka Nabi Muhammad ﷺ memanggilnya dengan penuh kasih: Wahai bapaknya anak kucing (Abu Hurairah)!'
      }
    ],
    quiz: {
      question: 'Di manakah Abu Hurairah meletakkan anak kucing kecil tersebut agar terlindung?',
      options: [
        'Di dalam kotak kayu',
        'Di dalam tas ransel',
        'Di dalam saku/lengan jubah pakaiannya (kumm)',
        'Di atas atap rumah'
      ],
      correctIdx: 2,
      explanation: 'Teks menyebutkan: "fa-wada\'aha fi kummi thawbihi" (di lengan jubah pakaiannya).'
    }
  },
  {
    id: 'story_spring_oasis',
    title: 'Mata Air di Tengah Gurun Pasir',
    titleAr: 'عَيْنُ المَاءِ فِي الصَّحْرَاء',
    theme: 'Rasa Syukur & Keteguhan Hati',
    summary: 'Pengembara yang kehausan menemukan mata air jernih di bawah naungan pohon kurma hijau.',
    sentences: [
      {
        ar: 'سَافَرَ المُسَافِرُ فِي الصَّحْرَاءِ تَحْتَ الشَّمْسِ الحَارَّةِ.',
        translit: 'Sāfara l-musāfiru fī ṣ-ṣaḥrāʾi taḥta sy-syamsi l-ḥārrah.',
        id: 'Seorang musafir mengembara di gurun pasir di bawah terik matahari yang menyengat.'
      },
      {
        ar: 'نَفِدَ المَاءُ مِنْ قِرْبَتِهِ فَشَعَرَ بِعَطَشٍ شَدِيدٍ.',
        translit: 'Nafida l-māʾu min qirbatihi fa-syaʿara bi-ʿaṭasyin syadīd.',
        id: 'Air dari kantong minumnya telah habis, lalu ia merasakan dahaga yang teramat sangat.'
      },
      {
        ar: 'فَجْأَةً، رَأَى وَاحَةً خَضْرَاءَ فِيهَا نَخِيلٌ وَعَيْنُ مَاءٍ عَذْبٍ.',
        translit: 'Fajʾatan, raʾā wāḥatan khaḍrāʾa fīhā nakhīlun wa-ʿaynu māʾin ʿadhb.',
        id: 'Tiba-tiba, ia melihat sebuah oase hijau yang rindang dengan pohon kurma dan mata air segar.'
      },
      {
        ar: 'شَرِبَ حَتَّى ارْتَوَى وَقَالَ: الحَمْدُ لِلَّهِ رَبِّ العَالَمِينَ!',
        translit: 'Syariba ḥattā rtawā wa-qāla: Al-ḥamdu lillāhi Rabbi l-ʿālamīn!',
        id: 'Ia pun minum sampai puas dan berucap: Segala puji bagi Allah Rabb semesta alam!'
      }
    ],
    quiz: {
      question: 'Apa ucapan syukur musafir tersebut setelah minum air yang menyegarkan?',
      options: [
        'Subhanallah',
        'Alhamdulillah Rabbil \'Alamin',
        'Allahu Akbar',
        'La hawla wala quwwata illa billah'
      ],
      correctIdx: 1,
      explanation: 'Setelah minum hingga puas, musafir berucap: "Al-ḥamdu lillāhi Rabbi l-ʿālamīn".'
    }
  },
  {
    id: 'story_ship_pearl',
    title: 'Perahu Layar Nelayan Mutiara',
    titleAr: 'قَارِبُ الصَّيَّادِ وَاللُّؤْلُؤ',
    theme: 'Kerja Keras & Ketekunan',
    summary: 'Kisah penyelam muda yang berlayar ke laut dalam mencari tiram mutiara putih yang berkilauan.',
    sentences: [
      {
        ar: 'رَكِبَ الصَّيَّادُ قَارِبَهُ الصَّغِيرَ وَتَوَجَّهَ نَحْوَ البَحْرِ الأَزْرَق.',
        translit: 'Rakiba ṣ-ṣayyādu qāribahu ṣ-ṣaghīra wa-tawajjaha naḥwa l-baḥri l-ʾazraq.',
        id: 'Nelayan menaiki perahu kecilnya dan berlayar menuju ke laut biru nan luas.'
      },
      {
        ar: 'غَاصَ فِي أَعْمَاقِ المَاءِ بَيْنَ الأَسْمَاكِ المُلَوَّنَةِ البَرَّاقَة.',
        translit: 'Ghāṣa fī ʾaʿmāqi l-māʾi bayna l-ʾasmāki l-mulawwanati l-barrāqah.',
        id: 'Ia menyelam ke kedalaman air di antara ikan-ikan yang berwarna-warni berkilauan.'
      },
      {
        ar: 'وَجَدَ صَدَفَةً كَبِيرَةً فِيهَا لُؤْلُؤَةٌ بَيْضَاءُ تَلْمَعُ كَالنَّجْم.',
        translit: 'Wajada ṣadafatan kabīratan fīhā luʾluʾatun bayḍāʾu talmaʿu ka-n-najm.',
        id: 'Ia menemukan kerang besar yang di dalamnya terdapat mutiara putih berkilau laksana bintang.'
      },
      {
        ar: 'شَكَرَ اللَّهَ عَلَى رِزْقِهِ وَعَادَ فَرِحًا إِلَى بَيْتِهِ السَّعِيد.',
        translit: 'Syakara Llāha ʿalā rizqihi wa-ʿāda fariḥan ʾilā baytihi s-saʿīd.',
        id: 'Ia bersyukur kepada Allah atas rezekinya dan pulang dengan penuh rasa gembira ke rumahnya.'
      }
    ],
    quiz: {
      question: 'Benda apakah yang ditemukan oleh nelayan di dalam kerang besar?',
      options: [
        'Sepeti koin tembaga',
        'Mutiara putih yang berkilau laksana bintang',
        'Cincin besi kuno',
        'Peta rahasia samudra'
      ],
      correctIdx: 1,
      explanation: 'Teks menyebutkan: "fīhā luʾluʾatun bayḍāʾu talmaʿu ka-n-najm" (mutiara putih berkilau laksana bintang).'
    }
  },
  {
    id: 'story_dates_gift',
    title: 'Hadiah Kurma dan Persaudaraan',
    titleAr: 'هَدِيَّةُ التَّمْرِ وَالأُخُوَّة',
    theme: 'Kedermawanan & Silaturahmi',
    summary: 'Kisah teladan dua sahabat yang saling menghadiahkan keranjang kurma manis dengan penuh keikhlasan.',
    sentences: [
      {
        ar: 'قَطَفَ زَيْدٌ سَلَّةً مِنَ التَّمْرِ السُّكَّرِيِّ اللَّذِيذِ الطَّيِّب.',
        translit: 'Qaṭafa Zaydun sallatan mina t-tamri s-sukariyyi l-ladhīdhi ṭ-ṭayyib.',
        id: 'Zaid memetik sekeranjang kurma sukari yang manis dan lezat.'
      },
      {
        ar: 'قَالَ: هٰذِهِ هَدِيَّةٌ طَيِّبَةٌ لِأَخِي عُمَرَ لِيَفْرَحَ بِهَا قَلْبُه.',
        translit: 'Qāla: hādhī hadiyyatun ṭayyibatun li-ʾakhī ʿUmara li-yafraḥa bihā qalbuh.',
        id: 'Ia berkata: Ini adalah hadiah yang baik untuk saudaraku Umar agar hatinya berbahagia.'
      },
      {
        ar: 'فَرِحَ عُمَرُ كَثِيرًا وَقَالَ: جَزَاكَ اللَّهُ خَيْرًا وَبَارَكَ فِي ثَمَرِك!',
        translit: 'Fariḥa ʿUmaru kathīran wa-qāla: Jazāka Llāhu khayran wa-bāraka fī thamarik!',
        id: 'Umar sangat bersuka cita dan berkata: Semoga Allah membalasmu dengan kebaikan dan memberkahi kebun buahmu!'
      },
      {
        ar: 'التَّهَادِي يَنْشُرُ المَحَبَّةَ وَالوُدَّ بَيْنَ المُؤْمِنِين.',
        translit: 'At-tahādī yansyuru l-maḥabbata wa-l-wudda bayna l-muʾminīn.',
        id: 'Saling memberi hadiah menumbuhkan cinta kasih dan kehangatan di antara kaum beriman.'
      }
    ],
    quiz: {
      question: 'Doa apa yang diucapkan Umar ketika menerima hadiah kurma manis?',
      options: [
        'Astaghfirullahal \'Adzim',
        'Jazakallahu khayran wa baraka fi thamarik',
        'Bismillah tawakkaltu \'alallah',
        'La hawla wala quwwata illa billah'
      ],
      correctIdx: 1,
      explanation: 'Umar mendoakan: "Jazāka Llāhu khayran wa-bāraka fī thamarik" (Semoga Allah membalas kebaikanmu dan memberkahi buahmu).'
    }
  }
];

// 3. Simulator Perintah Audio (Awamir Simulator)
interface AudioCommand {
  id: string;
  commandAr: string;
  translit: string;
  meaning: string;
  directionOrTarget: string;
  correctReaction: string;
  options: {
    id: string;
    label: string;
    emoji: string;
  }[];
}

const AUDIO_COMMANDS: AudioCommand[] = [
  {
    id: 'cmd1',
    commandAr: 'اِرْفَعْ يَدَكَ اليُمْنَى!',
    translit: 'Irfaʿ yadaka l-yumnā!',
    meaning: 'Angkatlah tangan kananmu!',
    directionOrTarget: 'Tangan Kanan',
    correctReaction: 'right_hand',
    options: [
      { id: 'left_hand', label: 'Angkat Tangan Kiri', emoji: '🫲' },
      { id: 'right_hand', label: 'Angkat Tangan Kanan', emoji: '🫱' },
      { id: 'stand', label: 'Berdiri Tegak', emoji: '🧍' },
    ]
  },
  {
    id: 'cmd2',
    commandAr: 'اِلْتَفِتْ إِلَى اليَسَارِ!',
    translit: 'Iltafit ʾilā l-yasār!',
    meaning: 'Menolehlah ke arah kiri!',
    directionOrTarget: 'Arah Kiri (Yasār)',
    correctReaction: 'turn_left',
    options: [
      { id: 'turn_right', label: 'Menoleh ke Kanan', emoji: '➡️' },
      { id: 'turn_left', label: 'Menoleh ke Kiri', emoji: '⬅️' },
      { id: 'look_up', label: 'Menengadah ke Atas', emoji: '⬆️' },
    ]
  },
  {
    id: 'cmd3',
    commandAr: 'اِفْتَحِ الكِتَابَ عَلَى الصَّفْحَةِ الأُولَى!',
    translit: 'Iftaḥi l-kitāba ʿalā ṣ-ṣafḥati l-ʾūlā!',
    meaning: 'Bukalah buku pada halaman pertama!',
    directionOrTarget: 'Membuka Buku',
    correctReaction: 'open_book',
    options: [
      { id: 'close_book', label: 'Tutup Buku Pelajaran', emoji: '📕' },
      { id: 'open_book', label: 'Buka Buku Halaman Satu', emoji: '📖' },
      { id: 'write_pen', label: 'Ambil Pena Menulis', emoji: '🖊️' },
    ]
  },
  {
    id: 'cmd4',
    commandAr: 'اِسْجُدْ لِلَّهِ شُكْرًا!',
    translit: 'Isjud lillāhi syukrā!',
    meaning: 'Bersujudlah kepada Allah tanda syukur!',
    directionOrTarget: 'Sujud Syukur',
    correctReaction: 'sujud',
    options: [
      { id: 'sujud', label: 'Melakukan Sujud Syukur', emoji: '🙇' },
      { id: 'run', label: 'Berlari Cepat', emoji: '🏃' },
      { id: 'sleep', label: 'Berbaring Tidur', emoji: '🛌' },
    ]
  },
  {
    id: 'cmd5',
    commandAr: 'قِفْ عَلَى قَدَمَيْكَ وَابْتَسِمْ!',
    translit: 'Qif ʿalā qadamayka wabtasim!',
    meaning: 'Berdirilah di atas kedua kakimu dan tersenyumlah!',
    directionOrTarget: 'Berdiri & Senyum',
    correctReaction: 'stand_smile',
    options: [
      { id: 'stand_smile', label: 'Berdiri Tegak & Tersenyum Hangat', emoji: '😊' },
      { id: 'sit_floor', label: 'Duduk Melantai Santai', emoji: '🧘' },
      { id: 'drink_water', label: 'Minum Segelas Air Dingin', emoji: '🥛' },
    ]
  },
  {
    id: 'cmd6',
    commandAr: 'ضَعِ القَلَمَ فَوْقَ المَكْتَبِ!',
    translit: 'Ḍaʿi l-qalama fawqa l-maktab!',
    meaning: 'Letakkan pena di atas meja belajar!',
    directionOrTarget: 'Menaruh Pena di Meja',
    correctReaction: 'put_pen',
    options: [
      { id: 'break_pen', label: 'Patahkan Pensil Kayu', emoji: '✏️' },
      { id: 'put_pen', label: 'Letakkan Pena di Atas Meja', emoji: '🖊️' },
      { id: 'open_window', label: 'Buka Jendela Kamar', emoji: '🪟' },
    ]
  }
];

export const PulauIstimaHubModal: React.FC<PulauIstimaHubModalProps> = ({
  island,
  profile,
  onClose,
  onLaunchGame,
  onReward
}) => {
  const [activeTab, setActiveTab] = useState<'echo_lab' | 'story_campfire' | 'command_sim' | 'curriculum' | 'glossary'>('echo_lab');

  // Echo Lab States
  const [selectedPair, setSelectedPair] = useState<MinimalPairConcept>(MINIMAL_PAIRS_DATA[0]);
  const [isPlayingAudio, setIsPlayingAudio] = useState<'A' | 'B' | null>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(0.85);

  // Story Campfire States
  const [selectedStory, setSelectedStory] = useState<AudioStory>(AUDIO_STORIES[0]);
  const [playingSentenceIdx, setPlayingSentenceIdx] = useState<number | null>(null);
  const [quizSelectedIdx, setQuizSelectedIdx] = useState<number | null>(null);
  const [quizAnswered, setQuizAnswered] = useState(false);

  // Command Simulator States
  const [cmdIdx, setCmdIdx] = useState(0);
  const [cmdFeedback, setCmdFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [cmdScore, setCmdScore] = useState(0);

  const istimaSkills = SKILLS_DATA.filter(s => s.owner_island === 'IST');
  const istimaLexicon = LEXICON_DATA.filter(l => l.owner_island === 'IST');

  // Audio Playback functions
  const playArabicAudio = (text: string, tag: 'A' | 'B') => {
    sound.playTap();
    setIsPlayingAudio(tag);
    sound.speakArabic(text, playbackSpeed);
    setTimeout(() => {
      setIsPlayingAudio(null);
    }, 1300);
  };

  const playStorySentence = (arText: string, idx: number) => {
    sound.playTap();
    setPlayingSentenceIdx(idx);
    sound.speakArabic(arText, playbackSpeed);
    setTimeout(() => {
      setPlayingSentenceIdx(null);
    }, 2000);
  };

  const handleCommandAnswer = (optionId: string) => {
    const curCmd = AUDIO_COMMANDS[cmdIdx];
    if (optionId === curCmd.correctReaction) {
      sound.playSuccess();
      setCmdFeedback('correct');
      setCmdScore(prev => prev + 1);
    } else {
      sound.playGentleRetry();
      setCmdFeedback('wrong');
    }

    setTimeout(() => {
      setCmdFeedback(null);
      if (cmdIdx < AUDIO_COMMANDS.length - 1) {
        setCmdIdx(prev => prev + 1);
      } else {
        setCmdIdx(0);
      }
    }, 1300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.93, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.93, opacity: 0, y: 15 }}
        className="w-full max-w-4xl bg-purple-950/95 text-white rounded-3xl shadow-2xl border-4 border-purple-500/60 overflow-hidden flex flex-col max-h-[94vh]"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900 via-violet-800 to-indigo-950 px-5 py-4 border-b border-purple-500/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-lg border border-purple-300/40">
              <Headphones className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-500/30 text-purple-200 border border-purple-400/30">
                  {island.name_ar} • {island.id}
                </span>
                <span className="text-xs font-extrabold bg-amber-400 text-amber-950 px-2 py-0.5 rounded-full shadow-sm">
                  17 Keterampilan L0–L5
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-chibi text-white flex items-center gap-2 mt-0.5">
                Lembah Istima' (Wādī al-Istimā')
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onLaunchGame('echo_cave')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-800 hover:bg-purple-700 text-white font-bold text-xs shadow-md active:scale-95 transition-all border border-purple-500/50"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Echo Cave</span>
            </button>
            <button
              onClick={() => onLaunchGame('audio_detective')}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-pink-500 hover:from-amber-300 hover:to-pink-600 text-slate-950 font-black text-xs shadow-lg active:scale-95 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span>Detektif Suara</span>
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-purple-200 hover:text-white font-bold transition-all active:scale-95"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-purple-900/60 px-4 py-2 border-b border-purple-800/50 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs font-bold">
          <button
            onClick={() => {
              sound.playTap();
              setActiveTab('echo_lab');
            }}
            className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'echo_lab'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                : 'text-purple-300 hover:text-white hover:bg-purple-800/50'
            }`}
          >
            <Radio className="w-4 h-4" />
            <span>Gua Gema & Pasangan Minimal</span>
          </button>

          <button
            onClick={() => {
              sound.playTap();
              setActiveTab('story_campfire');
            }}
            className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'story_campfire'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                : 'text-purple-300 hover:text-white hover:bg-purple-800/50'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-300" />
            <span>Api Unggun Cerita Audio</span>
          </button>

          <button
            onClick={() => {
              sound.playTap();
              setActiveTab('command_sim');
            }}
            className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'command_sim'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                : 'text-purple-300 hover:text-white hover:bg-purple-800/50'
            }`}
          >
            <Compass className="w-4 h-4 text-emerald-300" />
            <span>Simulator Instruksi Lisan</span>
          </button>

          <button
            onClick={() => {
              sound.playTap();
              setActiveTab('curriculum');
            }}
            className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'curriculum'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                : 'text-purple-300 hover:text-white hover:bg-purple-800/50'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Silabus Lembah (17 Keterampilan)</span>
          </button>

          <button
            onClick={() => {
              sound.playTap();
              setActiveTab('glossary');
            }}
            className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'glossary'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                : 'text-purple-300 hover:text-white hover:bg-purple-800/50'
            }`}
          >
            <Volume2 className="w-4 h-4 text-teal-300" />
            <span>Kamus Reseptif Audio</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-4 sm:p-6 flex-1 overflow-y-auto">
          {/* TAB 1: ECHO LAB & MINIMAL PAIRS */}
          {activeTab === 'echo_lab' && (
            <div className="space-y-5">
              {/* Introduction Banner */}
              <div className="bg-gradient-to-r from-purple-900/80 via-indigo-900/60 to-purple-900/80 p-4 rounded-2xl border border-purple-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-bold text-white text-base flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    Lab Resonansi Gema & Diskriminasi Fonemik
                  </h3>
                  <p className="text-xs text-purple-200 mt-1 max-w-xl">
                    Dengarkan perbandingan ketat antara dua kata berbunyi mirip (*minimal pairs*) yang kerap membingungkan pembelajar non-Arab. Ketuk tombol audio untuk membedakan makhrajnya secara presisi!
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-purple-950/80 px-3 py-1.5 rounded-xl border border-purple-700/60 text-xs">
                  <Gauge className="w-4 h-4 text-amber-300" />
                  <span className="text-purple-300">Tempo:</span>
                  <button
                    onClick={() => {
                      sound.playTap();
                      setPlaybackSpeed(prev => (prev === 0.85 ? 0.65 : 0.85));
                    }}
                    className="font-bold text-amber-300 hover:underline"
                  >
                    {playbackSpeed === 0.85 ? '1.0x Standar' : '0.65x Perlahan'}
                  </button>
                </div>
              </div>

              {/* Minimal Pairs Selection Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {MINIMAL_PAIRS_DATA.map((pair) => {
                  const isSelected = selectedPair.id === pair.id;
                  return (
                    <button
                      key={pair.id}
                      onClick={() => {
                        sound.playTap();
                        setSelectedPair(pair);
                      }}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-pink-400 bg-purple-800/80 text-white shadow-md ring-2 ring-pink-500/40'
                          : 'border-purple-800/60 bg-purple-950/50 hover:bg-purple-900/40 text-purple-300'
                      }`}
                    >
                      <div className="text-[10px] uppercase font-bold text-purple-400 truncate">
                        {pair.category}
                      </div>
                      <div className="text-xs font-bold font-arabic text-amber-200 truncate mt-0.5">
                        {pair.titleAr}
                      </div>
                      <div className="text-[11px] font-medium text-white/90 truncate mt-0.5">
                        {pair.title}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active Pair A / B Comparison Board */}
              <div className="bg-gradient-to-b from-slate-900/90 to-purple-950 rounded-3xl p-5 border-2 border-purple-500/50 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-purple-800/60 pb-3">
                  <div>
                    <span className="text-xs font-extrabold text-pink-300 uppercase tracking-wider">
                      Uji Pendengaran Perbandingan
                    </span>
                    <h4 className="text-lg font-bold text-white mt-0.5">
                      {selectedPair.title}
                    </h4>
                  </div>
                  <span className="text-xs bg-purple-800/70 text-purple-200 px-3 py-1 rounded-full border border-purple-600/50">
                    Kategori: {selectedPair.category.toUpperCase()}
                  </span>
                </div>

                <p className="text-xs text-purple-200 leading-relaxed bg-purple-900/40 p-3 rounded-xl border border-purple-800/50">
                  💡 <strong>Kaidah Fonetik:</strong> {selectedPair.explanation}
                </p>

                {/* 2-Column Sound Card Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Item A */}
                  <div className="bg-purple-900/50 rounded-2xl p-4 border border-purple-600/50 flex flex-col justify-between relative overflow-hidden">
                    <div>
                      <div className="flex items-center justify-between text-xs text-purple-300">
                        <span className="font-bold px-2 py-0.5 rounded-md bg-purple-800 text-purple-200">
                          BUNYI A
                        </span>
                        <span className="text-amber-300 font-mono italic">
                          translit: {selectedPair.itemA.translit}
                        </span>
                      </div>

                      <div className="text-center my-4">
                        <div className="text-4xl font-extrabold font-arabic text-amber-200 drop-shadow">
                          {selectedPair.itemA.ar}
                        </div>
                        <div className="text-sm font-bold text-white mt-1">
                          {selectedPair.itemA.meaning}
                        </div>
                      </div>

                      <div className="text-[11px] text-purple-300 bg-purple-950/60 p-2.5 rounded-xl border border-purple-800/40">
                        🎯 <strong>Analisis Makhraj:</strong> {selectedPair.itemA.makhrajNote}
                      </div>
                    </div>

                    <button
                      onClick={() => playArabicAudio(selectedPair.itemA.ar, 'A')}
                      disabled={isPlayingAudio !== null}
                      className="mt-4 w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all"
                    >
                      <Volume2 className={`w-4 h-4 ${isPlayingAudio === 'A' ? 'animate-ping' : ''}`} />
                      <span>{isPlayingAudio === 'A' ? 'Memutar Suara...' : `Dengarkan "${selectedPair.itemA.ar}"`}</span>
                    </button>
                  </div>

                  {/* Item B */}
                  <div className="bg-purple-900/50 rounded-2xl p-4 border border-pink-600/50 flex flex-col justify-between relative overflow-hidden">
                    <div>
                      <div className="flex items-center justify-between text-xs text-purple-300">
                        <span className="font-bold px-2 py-0.5 rounded-md bg-pink-900 text-pink-200">
                          BUNYI B (KONTRAS)
                        </span>
                        <span className="text-amber-300 font-mono italic">
                          translit: {selectedPair.itemB.translit}
                        </span>
                      </div>

                      <div className="text-center my-4">
                        <div className="text-4xl font-extrabold font-arabic text-pink-200 drop-shadow">
                          {selectedPair.itemB.ar}
                        </div>
                        <div className="text-sm font-bold text-white mt-1">
                          {selectedPair.itemB.meaning}
                        </div>
                      </div>

                      <div className="text-[11px] text-pink-200 bg-purple-950/60 p-2.5 rounded-xl border border-pink-900/40">
                        🎯 <strong>Analisis Makhraj:</strong> {selectedPair.itemB.makhrajNote}
                      </div>
                    </div>

                    <button
                      onClick={() => playArabicAudio(selectedPair.itemB.ar, 'B')}
                      disabled={isPlayingAudio !== null}
                      className="mt-4 w-full py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all"
                    >
                      <Volume2 className={`w-4 h-4 ${isPlayingAudio === 'B' ? 'animate-ping' : ''}`} />
                      <span>{isPlayingAudio === 'B' ? 'Memutar Suara...' : `Dengarkan "${selectedPair.itemB.ar}"`}</span>
                    </button>
                  </div>
                </div>

                {/* Quick Practice Tip */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-purple-300">
                    Ingin menguji kemampuan membedakan suara secara acak dengan tantangan skor?
                  </span>
                  <button
                    onClick={() => onLaunchGame('echo_cave')}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs shadow-md flex items-center gap-1.5 active:scale-95 transition-all"
                  >
                    <span>Mulai Kuis Echo Cave</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: STORY CAMPFIRE (MAJLIS AL-QASAS) */}
          {activeTab === 'story_campfire' && (
            <div className="space-y-5">
              {/* Story selector pills */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                {AUDIO_STORIES.map((story) => {
                  const isSelected = selectedStory.id === story.id;
                  return (
                    <button
                      key={story.id}
                      onClick={() => {
                        sound.playTap();
                        setSelectedStory(story);
                        setQuizSelectedIdx(null);
                        setQuizAnswered(false);
                      }}
                      className={`px-4 py-2.5 rounded-2xl border text-left transition-all whitespace-nowrap flex items-center gap-2 ${
                        isSelected
                          ? 'border-amber-400 bg-purple-800 text-white shadow-lg ring-2 ring-amber-400/40'
                          : 'border-purple-800/60 bg-purple-950/60 text-purple-300 hover:bg-purple-900/50'
                      }`}
                    >
                      <Flame className={`w-4 h-4 ${isSelected ? 'text-amber-400 animate-pulse' : 'text-purple-400'}`} />
                      <div>
                        <div className="text-xs font-bold">{story.title}</div>
                        <div className="text-[10px] text-amber-200/80 font-arabic">{story.titleAr}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active Story Card */}
              <div className="bg-gradient-to-b from-slate-900/90 to-purple-950 rounded-3xl p-5 border-2 border-purple-500/50 shadow-xl space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-purple-800/60 pb-3">
                  <div>
                    <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5" />
                      Tema: {selectedStory.theme}
                    </div>
                    <h3 className="text-lg font-bold text-white mt-0.5">
                      {selectedStory.title} ({selectedStory.titleAr})
                    </h3>
                  </div>
                  <p className="text-xs text-purple-300 max-w-sm sm:text-right">
                    {selectedStory.summary}
                  </p>
                </div>

                {/* Sentences List with Audio Play button */}
                <div className="space-y-2.5">
                  <div className="text-xs font-bold text-purple-200 flex items-center justify-between">
                    <span>Naskah Audio Arab (Ketuk tombol suara untuk mendengar per kalimat):</span>
                    <span className="text-[11px] text-purple-400">Total {selectedStory.sentences.length} Kalimat</span>
                  </div>

                  {selectedStory.sentences.map((sent, idx) => {
                    const isPlaying = playingSentenceIdx === idx;
                    return (
                      <div
                        key={idx}
                        className={`p-3.5 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                          isPlaying
                            ? 'border-amber-400 bg-purple-900/80 shadow-md ring-2 ring-amber-400/30'
                            : 'border-purple-800/60 bg-purple-950/60 hover:bg-purple-900/40'
                        }`}
                      >
                        <div className="flex-1 space-y-1">
                          <div className="text-xl font-bold font-arabic text-amber-200 leading-relaxed text-right">
                            {sent.ar}
                          </div>
                          <div className="text-xs font-mono text-purple-300 italic">
                            {sent.translit}
                          </div>
                          <div className="text-xs text-purple-100 font-medium">
                            {sent.id}
                          </div>
                        </div>

                        <button
                          onClick={() => playStorySentence(sent.ar, idx)}
                          disabled={playingSentenceIdx !== null}
                          className="shrink-0 w-9 h-9 rounded-xl bg-purple-800 hover:bg-purple-700 text-purple-200 hover:text-white flex items-center justify-center transition-all active:scale-95 border border-purple-600/50"
                          title="Dengarkan kalimat ini"
                        >
                          <Volume2 className={`w-4 h-4 ${isPlaying ? 'text-amber-300 animate-ping' : ''}`} />
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Comprehension Mini Quiz */}
                <div className="mt-5 pt-4 border-t border-purple-800/60">
                  <div className="bg-purple-900/40 p-4 rounded-2xl border border-purple-700/60 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                      <HelpCircle className="w-4 h-4" />
                      <span>Uji Pemahaman Menyimak (Fahm al-Masmu'):</span>
                    </div>

                    <p className="text-sm font-bold text-white">
                      {selectedStory.quiz.question}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedStory.quiz.options.map((opt, oIdx) => {
                        const isChosen = quizSelectedIdx === oIdx;
                        const isCorrect = oIdx === selectedStory.quiz.correctIdx;

                        let btnClass = 'border-purple-700/60 bg-purple-950/70 text-purple-200 hover:bg-purple-900/60 hover:border-purple-500';

                        if (quizAnswered) {
                          if (isCorrect) {
                            btnClass = 'border-emerald-400 bg-emerald-950/80 text-emerald-100 ring-2 ring-emerald-500/40';
                          } else if (isChosen) {
                            btnClass = 'border-rose-400 bg-rose-950/80 text-rose-100';
                          } else {
                            btnClass = 'opacity-40 border-purple-900 bg-purple-950/30 text-purple-400';
                          }
                        }

                        return (
                          <button
                            key={oIdx}
                            disabled={quizAnswered}
                            onClick={() => {
                              setQuizSelectedIdx(oIdx);
                              setQuizAnswered(true);
                              if (isCorrect) {
                                sound.playSuccess();
                                if (onReward) {
                                  onReward(35, 1);
                                }
                              } else {
                                sound.playGentleRetry();
                              }
                            }}
                            className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${btnClass}`}
                          >
                            <span className="mr-2 text-purple-400 font-mono">{String.fromCharCode(65 + oIdx)}.</span>
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {quizAnswered && (
                      <div className="mt-2 text-xs p-3 rounded-xl bg-purple-950/90 border border-purple-700/50 flex items-center justify-between">
                        <span className="text-purple-200">
                          {quizSelectedIdx === selectedStory.quiz.correctIdx ? '🎉 Benar! ' : '💡 Penjelasan: '}
                          {selectedStory.quiz.explanation}
                        </span>
                        <button
                          onClick={() => {
                            setQuizSelectedIdx(null);
                            setQuizAnswered(false);
                          }}
                          className="px-3 py-1 rounded-lg bg-purple-800 text-purple-200 hover:text-white font-bold text-[11px] shrink-0 ml-2"
                        >
                          Coba Lagi
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: COMMAND SIMULATOR */}
          {activeTab === 'command_sim' && (
            <div className="space-y-5">
              <div className="bg-gradient-to-r from-purple-900/80 to-indigo-900/80 p-4 rounded-2xl border border-purple-500/40 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white text-base flex items-center gap-2">
                    <Compass className="w-4 h-4 text-emerald-300" />
                    Simulator Instruksi Suara Penutur Asli (Awamir)
                  </h3>
                  <p className="text-xs text-purple-200 mt-0.5">
                    Dengarkan perintah lisan Arab penutur asli dan pilih tindakan fisik atau objek yang diminta dengan cepat!
                  </p>
                </div>
                <div className="bg-purple-950/80 px-3 py-1.5 rounded-xl border border-purple-700/60 text-xs font-bold text-emerald-300">
                  Skor: {cmdScore}
                </div>
              </div>

              {/* Active Command Station */}
              {(() => {
                const curCmd = AUDIO_COMMANDS[cmdIdx];
                return (
                  <div className="bg-gradient-to-b from-slate-900/90 to-purple-950 rounded-3xl p-6 border-2 border-purple-500/50 shadow-xl space-y-5 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-800/70 border border-purple-600/50 text-xs text-purple-200">
                      <span>Instruksi {cmdIdx + 1} dari {AUDIO_COMMANDS.length}</span>
                      <span>•</span>
                      <span className="text-amber-300 font-bold">{curCmd.directionOrTarget}</span>
                    </div>

                    <div className="my-2">
                      <div className="text-3xl sm:text-4xl font-extrabold font-arabic text-amber-200 drop-shadow mb-2">
                        {curCmd.commandAr}
                      </div>
                      <div className="text-sm font-mono text-purple-300 italic">
                        {curCmd.translit}
                      </div>
                      <div className="text-xs text-purple-200/90 mt-1">
                        "{curCmd.meaning}"
                      </div>
                    </div>

                    {/* Audio Play button */}
                    <button
                      onClick={() => {
                        sound.playTap();
                        sound.speakArabic(curCmd.commandAr, 0.85);
                      }}
                      className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-xs shadow-lg active:scale-95 transition-all inline-flex items-center gap-2 mx-auto"
                    >
                      <Volume2 className="w-4 h-4 animate-pulse" />
                      <span>Putar Audio Instruksi 🔊</span>
                    </button>

                    {/* Command Reaction Options */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
                      {curCmd.options.map((opt) => (
                        <button
                          key={opt.id}
                          disabled={cmdFeedback !== null}
                          onClick={() => handleCommandAnswer(opt.id)}
                          className="p-4 rounded-2xl border-2 border-purple-600/50 bg-purple-900/50 hover:bg-purple-800/60 hover:border-purple-400 text-white flex flex-col items-center justify-center gap-2 transition-all active:scale-95"
                        >
                          <span className="text-4xl filter drop-shadow">{opt.emoji}</span>
                          <span className="text-xs font-bold">{opt.label}</span>
                        </button>
                      ))}
                    </div>

                    {/* Feedback Toast */}
                    {cmdFeedback && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-3 rounded-xl text-xs font-bold ${
                          cmdFeedback === 'correct'
                            ? 'bg-emerald-950 border border-emerald-500 text-emerald-200'
                            : 'bg-rose-950 border border-rose-500 text-rose-200'
                        }`}
                      >
                        {cmdFeedback === 'correct'
                          ? '🎉 Tindakan Tepat! Telingamu sangat cepat merespons perintah Arab.'
                          : 'Coba dengarkan instruksi dengan lebih seksama ya!'}
                      </motion.div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}

          {/* TAB 4: CURRICULUM SYLLABUS */}
          {activeTab === 'curriculum' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-purple-300" />
                    Silabus Lengkap: Lembah Istima' (IST)
                  </h3>
                  <p className="text-xs text-purple-300 mt-0.5">
                    Daftar 17 keterampilan fonemik & menyimak reseptif berjenjang dari Level 0 hingga Level 5
                  </p>
                </div>
                <span className="text-xs bg-purple-800 text-purple-200 font-bold px-3 py-1 rounded-full border border-purple-600/50">
                  {istimaSkills.length} Modul Terstruktur
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {istimaSkills.map((sk) => (
                  <div
                    key={sk.skill_id}
                    className="p-3.5 rounded-2xl bg-purple-900/40 border border-purple-700/50 flex items-start gap-3 hover:bg-purple-900/60 transition-all"
                  >
                    <div className="w-8 h-8 rounded-xl bg-purple-800 text-purple-200 font-extrabold text-xs flex items-center justify-center shrink-0 border border-purple-600/40">
                      L{sk.level}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-pink-300">
                          {sk.skill_id}
                        </span>
                        <span className="text-[10px] bg-purple-950 px-2 py-0.5 rounded text-purple-300">
                          Scope: {sk.scope}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white mt-0.5">
                        {sk.name}
                      </h4>
                      <p className="text-xs text-purple-200/80 mt-1 leading-relaxed">
                        {sk.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: AUDIO GLOSSARY */}
          {activeTab === 'glossary' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Volume2 className="w-5 h-5 text-teal-300" />
                    Glosarium Kosakata Reseptif Istima'
                  </h3>
                  <p className="text-xs text-purple-300 mt-0.5">
                    Sentuh kartu kata Arab untuk mendengarkan lafal pengucapan standar Fusha
                  </p>
                </div>
                <span className="text-xs bg-purple-800 text-purple-200 font-bold px-3 py-1 rounded-full border border-purple-600/50">
                  {istimaLexicon.length} Kosakata Audio
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {istimaLexicon.map((lex) => (
                  <button
                    key={lex.id}
                    onClick={() => {
                      sound.playTap();
                      sound.speakArabic(lex.ar_vocalized, 0.85);
                    }}
                    className="p-3.5 rounded-2xl bg-purple-900/40 hover:bg-purple-800/60 border border-purple-700/50 text-left flex items-center justify-between gap-3 transition-all active:scale-95 group"
                  >
                    <div>
                      <div className="flex items-center gap-1.5 text-[10px] text-purple-300 font-mono">
                        <span className="px-1.5 py-0.2 rounded bg-purple-950 text-pink-300">
                          L{lex.level}
                        </span>
                        <span>{lex.category}</span>
                      </div>
                      <div className="text-lg font-bold font-arabic text-amber-200 mt-1">
                        {lex.ar_vocalized}
                      </div>
                      <div className="text-xs font-mono text-purple-300 italic">
                        {lex.translit}
                      </div>
                      <div className="text-xs text-purple-100 font-medium mt-0.5">
                        {lex.gloss_id}
                      </div>
                    </div>

                    <div className="w-9 h-9 rounded-xl bg-purple-800/80 group-hover:bg-pink-600 text-purple-200 group-hover:text-white flex items-center justify-center shrink-0 transition-colors shadow-sm">
                      <Volume2 className="w-4 h-4" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-purple-900/60 px-5 py-3.5 border-t border-purple-800/60 flex items-center justify-between">
          <div className="text-xs text-purple-300 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Mode Audio TTS Aktif • Dukungan Penutur Asli Fusha</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onLaunchGame('echo_cave')}
              className="px-4 py-2 rounded-xl bg-purple-800 hover:bg-purple-700 text-white font-bold text-xs shadow-md active:scale-95 transition-all flex items-center gap-1.5 border border-purple-500/50"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Mainkan Echo Cave</span>
            </button>
            <button
              onClick={() => onLaunchGame('audio_detective')}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-pink-500 hover:from-amber-300 hover:to-pink-600 text-slate-950 font-black text-xs shadow-lg active:scale-95 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span>Mainkan Detektif Suara</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
