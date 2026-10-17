import React, { useState, useMemo } from 'react';
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
  RotateCcw,
  Search,
  Sliders,
  Zap,
  Check,
  X,
  ShieldCheck,
  Activity
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
  category: 'halq' | 'ithbaq' | 'mad' | 'harakat' | 'waqaf';
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
      makhrajNote: 'Isti\'la & tebal (tafkhim) di pangkal lidah terdalam'
    },
    itemB: {
      ar: 'كَلْب',
      translit: 'kalb',
      meaning: 'Anjing',
      makhrajNote: 'Istifal & tipis (tarqiq) berhembus hams depan'
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
      makhrajNote: 'Tengah tenggorokan, pita suara bergetar lembut'
    },
    itemB: {
      ar: 'أَلِيم',
      translit: 'alīm',
      meaning: 'Sangat Pedih / Menyakitkan',
      makhrajNote: 'Pangkal tenggorokan bawah, hentian katup pita suara'
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
      makhrajNote: 'Ithbaq & tebal bulat (tafkhim) ruang mulut penuh'
    },
    itemB: {
      ar: 'سَيْف',
      translit: 'sayf',
      meaning: 'Pedang',
      makhrajNote: 'Infitah & tipis datar (tarqiq) bibir tersenyum'
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
      makhrajNote: 'Vokal pendek tunggal (fathah murni 1 ketukan)'
    },
    itemB: {
      ar: 'جَمَال',
      translit: 'jamāl',
      meaning: 'Keindahan (2 harakat)',
      makhrajNote: 'Alif Mad thabi\'i pemanjang 2 harakat berayun'
    }
  },
  {
    id: 'mp5',
    title: 'Kontras Tha (ث) vs Sin (س)',
    titleAr: 'ثَمَر (Buah) vs سَمَر (Begadang)',
    category: 'halq',
    explanation: 'Huruf Tha (ث) keluar dari ujung lidah menyentuh ujung gigi seri atas (menggigit sedikit ujung lidah lembut). Sedangkan Sin (س) di belakang gigi seri bawah dengan desis tajam.',
    itemA: {
      ar: 'ثَمَر',
      translit: 'thamar',
      meaning: 'Buah-buahan',
      makhrajNote: 'Ujung lidah menempel ujung gigi seri atas lembut'
    },
    itemB: {
      ar: 'سَمَر',
      translit: 'samar',
      meaning: 'Bercengkerama di malam hari',
      makhrajNote: 'Ujung lidah di atas gigi seri bawah mendesis'
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
      makhrajNote: 'Pangkal dada bawah (aqshal halq) berhembus'
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
      makhrajNote: 'Ithbaq, Isti\'la, sangat tebal mantap di gusi atas'
    },
    itemB: {
      ar: 'تِين',
      translit: 'tīn',
      meaning: 'Buah Ara / Tin',
      makhrajNote: 'Infitah, Istifal, tipis dan hembusan hams ringan'
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
      makhrajNote: 'Ujung lidah tipis terbuka (infitah & tarqiq)'
    },
    itemB: {
      ar: 'ظِلّ',
      translit: 'ẓill',
      meaning: 'Naungan sejuk rindang',
      makhrajNote: 'Ujung lidah tebal tertutup (ithbaq & tafkhim)'
    }
  },
  {
    id: 'mp9',
    title: 'Kontras Kha (خ) vs Ghain (غ)',
    titleAr: 'خَلِيل (Sahabat Karib) vs غَلِيل (Dahaga Berat)',
    category: 'halq',
    explanation: 'Keduanya dari tenggorokan atas (adnal halq). Kha (خ) berhembus hams tanpa getaran pita suara (desir pasir kering), sedangkan Ghain (غ) jahar bergetar basah seperti suara mendengkur berkumur!',
    itemA: {
      ar: 'خَلِيل',
      translit: 'khalīl',
      meaning: 'Sahabat karib sejati',
      makhrajNote: 'Tenggorokan atas, hembusan hams tanpa getar pita suara'
    },
    itemB: {
      ar: 'غَلِيل',
      translit: 'ghalīl',
      meaning: 'Dahaga berat yang membakar',
      makhrajNote: 'Tenggorokan atas, getaran jahar bersuara basah mantap'
    }
  },
  {
    id: 'mp10',
    title: 'Kontras Dhad (ض) vs Dal (د)',
    titleAr: 'ضَلَّ (Tersesat) vs دَلَّ (Menunjukkan)',
    category: 'ithbaq',
    explanation: 'Dhad (ض) adalah ciri khas bahasa Arab (Lughat adh-Dhad) dari tepi lidah menempel geraham atas dengan sifat Istithalah (memanjang) & Ithbaq tebal. Dal (د) dari ujung lidah tipis renyah.',
    itemA: {
      ar: 'ضَلَّ',
      translit: 'ḍalla',
      meaning: 'Tersesat dari jalan',
      makhrajNote: 'Tepi lidah menyentuh gigi geraham atas dengan istithalah'
    },
    itemB: {
      ar: 'دَلَّ',
      translit: 'dalla',
      meaning: 'Menunjukkan petunjuk jalan',
      makhrajNote: 'Ujung lidah menempel pangkal gigi seri atas tipis'
    }
  },
  {
    id: 'mp11',
    title: 'Kontras Tanwin (-un) vs Waqaf Sukun',
    titleAr: 'كِتَابٌ (Sebuah Buku) vs كِتَابْ (Waqaf)',
    category: 'waqaf',
    explanation: 'Tanwin menghadirkan bunyi dengung "Nun Sakinah" tambahan di akhir kata ketika dibaca washal. Ketika waqaf (berhenti), tanwin luluh menjadi sukun tenang tanpa desis nun.',
    itemA: {
      ar: 'كِتَابٌ',
      translit: 'kitābun',
      meaning: 'Sebuah buku (berharakat tanwin -un)',
      makhrajNote: 'Resonansi dengung ghunnah nun di rongga hidung'
    },
    itemB: {
      ar: 'كِتَابْ',
      translit: 'kitāb',
      meaning: 'Buku (berhenti waqaf sukun)',
      makhrajNote: 'Bibir mengatup rapat pada huruf Ba berqalqalah'
    }
  },
  {
    id: 'mp12',
    title: 'Kontras Ta Marbuthah vs Ha Dhamir',
    titleAr: 'حَدِيقَة (Taman Kebun) vs حَدِيقَتُه (Taman Miliknya)',
    category: 'harakat',
    explanation: 'Ta Marbuthah (ـة) saat waqaf berubah menjadi bunyi Ha lembut tanpa kepemilikan. Sedangkan Ha dhamir (ـهُ) menunjuk kata ganti kepemilikan orang ketiga tunggal maskulin (miliknya).',
    itemA: {
      ar: 'حَدِيقَة',
      translit: 'ḥadīqah',
      meaning: 'Taman / Kebun asri',
      makhrajNote: 'Akhiran muannats isim luluh menjadi hembusan ha lembut'
    },
    itemB: {
      ar: 'حَدِيقَتُهُ',
      translit: 'ḥadīqatuhu',
      meaning: 'Taman miliknya (laki-laki)',
      makhrajNote: 'Dhamir muttashil kepemilikan dengan harakat dhammah'
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
        'Mahkota emas kerajaan'
      ],
      correctIdx: 1,
      explanation: 'Hudhud berkata: "Waji\'tuka min Saba\'in bi-naba\'in yaqiin" (Dan aku datang kepadamu dari negeri Saba membawa berita yang meyakinkan).'
    }
  },
  {
    id: 'story_lion_mouse',
    title: 'Fabel Singa & Tikus Cerdik',
    titleAr: 'الأَسَدُ وَالفَأْرَةُ الصَّغِيرَة',
    theme: 'Kebaikan & Tolong-Menolong',
    summary: 'Seekor singa perkasa melepaskan tikus kecil, dan kelak tikus itulah yang menyelamatkannya dari jaring perangkap pemburu.',
    sentences: [
      {
        ar: 'كَانَ الأَسَدُ يَسْتَرِيحُ تَحْتَ ظِلِّ شَجَرَةٍ كَبِيرَةٍ.',
        translit: 'Kāna l-asadu yastarīḥu taḥta ẓilli syajaratin kabīrah.',
        id: 'Singa itu sedang beristirahat di bawah naungan pohon rindang yang besar.'
      },
      {
        ar: 'مَرَّتْ فَأْرَةٌ صَغِيرَةٌ وَقَفَزَتْ فَوْقَ أَنْفِهِ دُونَ قَصْدٍ.',
        translit: 'Marrat faʾratun ṣaghīratun wa-qafazat fawqa ʾanfihi dūna qaṣdin.',
        id: 'Lewatlah seekor tikus kecil dan tak sengaja melompat di atas hidungnya.'
      },
      {
        ar: 'أَمْسَكَ الأَسَدُ الفَأْرَةَ، فَقَالَتْ: اعْفُ عَنِّي، لَعَلِّي أَنْفَعُكَ يَوْمًا!',
        translit: 'ʾAmsaka l-asadu l-faʾrata, fa-qālat: iʿfu ʿannī, laʿallī ʾanfaʿuka yawmā!',
        id: 'Singa mencengkeram sang tikus, lalu ia memohon: Maafkanlah aku, semoga suatu hari nanti aku bisa membantumu!'
      },
      {
        ar: 'ضَحِكَ الأَسَدُ وَتَرَكَهَا. وَبَعْدَ أَيَّامٍ، قَطَعَتِ الفَأْرَةُ حِبَالَ الشَّبَكَةِ بِأَسْنَانِهَا وَأَنْقَذَتْهُ!',
        translit: 'Ḍaḥika l-asadu wa-tarakahā. Wa-baʿda ʾayyām, qaṭaʿati l-faʾratu ḥibāla sy-syabakati bi-ʾasnānihā wa-ʾanqadhat-h!',
        id: 'Singa tertawa lalu melepaskannya. Selang beberapa hari, sang tikus mengerat tali jaring dengan giginya dan menyelamatkannya!'
      }
    ],
    quiz: {
      question: 'Bagaimana cara tikus kecil menyelamatkan singa yang terperangkap?',
      options: [
        'Memanggil pasukan gajah untuk merobohkan perangkap',
        'Mengerat tali jaring pemburu dengan giginya yang tajam',
        'Menggali lubang di bawah tanah'
      ],
      correctIdx: 1,
      explanation: 'Tikus menggunakan gigi tajamnya ("bi-asnaaniha") untuk memutuskan tali jala ("qaatha\'at hibala asy-syabakah").'
    }
  }
];

// 3. Data Perintah Lisan Simulator (Awamirul Fasl)
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
    commandAr: 'اِفْتَحْ كِتَابَكَ عَلَى الصَّفْحَةِ العَاشِرَةِ!',
    translit: 'Iftaḥ kitābaka ʿalā ṣ-ṣafḥati l-ʿāsyirah!',
    meaning: 'Bukalah bukumu pada halaman sepuluh!',
    directionOrTarget: 'Aksi Buku',
    correctReaction: 'open_book',
    options: [
      { id: 'open_book', label: 'Buka Buku Pelajaran', emoji: '📖' },
      { id: 'close_door', label: 'Tutup Pintu Kelas', emoji: '🚪' },
      { id: 'drink_water', label: 'Minum Air Segar', emoji: '🥤' }
    ]
  },
  {
    id: 'cmd2',
    commandAr: 'اِرْفَعْ يَدَكَ اليُمْنَى قَبْلَ الكَلَامِ!',
    translit: 'Irfaʿ yadaka l-yumnā qabla l-kalām!',
    meaning: 'Angkatlah tangan kananmu sebelum berbicara!',
    directionOrTarget: 'Aksi Gerak',
    correctReaction: 'raise_hand',
    options: [
      { id: 'sit_down', label: 'Duduk di Kursi', emoji: '🪑' },
      { id: 'raise_hand', label: 'Angkat Tangan Kanan', emoji: '🙋‍♂️' },
      { id: 'write_board', label: 'Menulis di Papan Tulis', emoji: '📝' }
    ]
  },
  {
    id: 'cmd3',
    commandAr: 'اِتَّجِهْ إِلَى اليَمِينِ ثُمَّ تَوَقَّفْ!',
    translit: 'Ittajih ilā l-yamīni thumma tawaqqaf!',
    meaning: 'Menolehlah ke arah kanan lalu berhentilah!',
    directionOrTarget: 'Arah Ruang',
    correctReaction: 'turn_right',
    options: [
      { id: 'turn_left', label: 'Belok ke Kiri', emoji: '⬅️' },
      { id: 'turn_right', label: 'Belok ke Kanan', emoji: '➡️' },
      { id: 'run_fast', label: 'Lari Cepat', emoji: '🏃' }
    ]
  },
  {
    id: 'cmd4',
    commandAr: 'ضَعْ قَلَمَكَ فَوْقَ الطَّاوِلَةِ بِهُدُوءٍ!',
    translit: 'Ḍaʿ qalamaka fawqa ṭ-ṭāwilati bi-hudūʾ!',
    meaning: 'Letakkan penamu di atas meja dengan tenang!',
    directionOrTarget: 'Aksi Meja',
    correctReaction: 'put_pen',
    options: [
      { id: 'break_pen', label: 'Patahkan Pensil Kayu', emoji: '✏️' },
      { id: 'put_pen', label: 'Letakkan Pena di Meja', emoji: '🖊️' },
      { id: 'open_window', label: 'Buka Jendela Kamar', emoji: '🪟' }
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

  // Echo Lab States: 'explore' | 'blind_quiz'
  const [echoSubMode, setEchoSubMode] = useState<'explore' | 'blind_quiz'>('explore');
  const [selectedPair, setSelectedPair] = useState<MinimalPairConcept>(MINIMAL_PAIRS_DATA[0]);
  const [isPlayingAudio, setIsPlayingAudio] = useState<'A' | 'B' | 'mystery' | null>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(0.85);

  // Blind Quiz States
  const [blindQuizPairIdx, setBlindQuizPairIdx] = useState<number>(0);
  const [blindTargetSound, setBlindTargetSound] = useState<'A' | 'B'>('A');
  const [blindHasPlayed, setBlindHasPlayed] = useState<boolean>(false);
  const [blindUserAnswer, setBlindUserAnswer] = useState<'A' | 'B' | null>(null);
  const [blindFeedback, setBlindFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [blindScore, setBlindScore] = useState<number>(0);
  const [blindStreak, setBlindStreak] = useState<number>(0);

  // Story Campfire States
  const [selectedStory, setSelectedStory] = useState<AudioStory>(AUDIO_STORIES[0]);
  const [playingSentenceIdx, setPlayingSentenceIdx] = useState<number | null>(null);
  const [quizSelectedIdx, setQuizSelectedIdx] = useState<number | null>(null);
  const [quizAnswered, setQuizAnswered] = useState(false);

  // Command Simulator States
  const [cmdIdx, setCmdIdx] = useState(0);
  const [cmdFeedback, setCmdFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [cmdScore, setCmdScore] = useState(0);

  // Filters for Curriculum & Glossary
  const [curriculumLevelFilter, setCurriculumLevelFilter] = useState<'all' | number>('all');
  const [curriculumSearch, setCurriculumSearch] = useState('');
  const [glossaryLevelFilter, setGlossaryLevelFilter] = useState<'all' | number>('all');
  const [glossarySearch, setGlossarySearch] = useState('');

  const istimaSkills = useMemo(() => {
    let list = SKILLS_DATA.filter(s => s.owner_island === 'IST');
    if (curriculumLevelFilter !== 'all') {
      list = list.filter(s => s.level === curriculumLevelFilter);
    }
    if (curriculumSearch.trim()) {
      const q = curriculumSearch.toLowerCase();
      list = list.filter(s => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q));
    }
    return list;
  }, [curriculumLevelFilter, curriculumSearch]);

  const istimaLexicon = useMemo(() => {
    let list = LEXICON_DATA.filter(l => l.owner_island === 'IST');
    if (glossaryLevelFilter !== 'all') {
      list = list.filter(l => l.level === glossaryLevelFilter);
    }
    if (glossarySearch.trim()) {
      const q = glossarySearch.toLowerCase();
      list = list.filter(l =>
        l.ar_vocalized.includes(q) ||
        l.translit.toLowerCase().includes(q) ||
        l.gloss_id.toLowerCase().includes(q)
      );
    }
    return list;
  }, [glossaryLevelFilter, glossarySearch]);

  // Audio Playback functions
  const playArabicAudio = (text: string, tag: 'A' | 'B' | 'mystery') => {
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

  // Blind Quiz Logic
  const startBlindQuizQuestion = (pairIdx: number) => {
    const chosenSound: 'A' | 'B' = Math.random() > 0.5 ? 'A' : 'B';
    setBlindQuizPairIdx(pairIdx);
    setBlindTargetSound(chosenSound);
    setBlindHasPlayed(false);
    setBlindUserAnswer(null);
    setBlindFeedback(null);
  };

  const playMysterySound = () => {
    const pair = MINIMAL_PAIRS_DATA[blindQuizPairIdx % MINIMAL_PAIRS_DATA.length];
    const targetWord = blindTargetSound === 'A' ? pair.itemA.ar : pair.itemB.ar;
    playArabicAudio(targetWord, 'mystery');
    setBlindHasPlayed(true);
  };

  const handleBlindQuizAnswer = (chosen: 'A' | 'B') => {
    if (!blindHasPlayed) {
      playMysterySound();
      return;
    }
    setBlindUserAnswer(chosen);
    if (chosen === blindTargetSound) {
      sound.playSuccess();
      setBlindFeedback('correct');
      setBlindScore(s => s + 15);
      setBlindStreak(st => st + 1);
      if (onReward) onReward(15, 1);
    } else {
      sound.playGentleRetry();
      setBlindFeedback('wrong');
      setBlindStreak(0);
    }
  };

  const nextBlindQuestion = () => {
    const nextIdx = (blindQuizPairIdx + 1) % MINIMAL_PAIRS_DATA.length;
    startBlindQuizQuestion(nextIdx);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.93, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.93, opacity: 0, y: 15 }}
        className="w-full max-w-5xl bg-gradient-to-b from-purple-950 via-slate-900 to-slate-950 border-2 border-purple-500/60 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-purple-900/90 via-indigo-900/80 to-purple-950 border-b border-purple-500/40 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg border border-purple-300/40">
              <Headphones className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-pink-300 bg-pink-950/80 px-2 py-0.5 rounded-full border border-pink-700/50">
                  Reseptif Auditori Fusha
                </span>
                <span className="text-xs text-purple-200">
                  Tingkat Kemahiran: L0 - L5
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <span>{island.name_id}</span>
                <span className="text-base font-arabic text-amber-300 font-normal">
                  ({island.name_ar})
                </span>
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playTap();
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-purple-900/80 hover:bg-purple-800 text-purple-200 hover:text-white flex items-center justify-center transition-colors border border-purple-700/60"
            aria-label="Tutup Modal"
          >
            ✕
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 px-4 sm:px-6 pt-3 pb-2 bg-purple-950/70 border-b border-purple-800/50 overflow-x-auto text-xs font-bold scrollbar-none">
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
            <span>Lab Gema & Pasangan Minimal</span>
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
            <span>Kamus Audio ({LEXICON_DATA.filter(l => l.owner_island === 'IST').length} Kata)</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-4 sm:p-6 flex-1 overflow-y-auto">
          {/* TAB 1: ECHO LAB & MINIMAL PAIRS */}
          {activeTab === 'echo_lab' && (
            <div className="space-y-5">
              {/* Introduction Banner & Sub-mode switch */}
              <div className="bg-gradient-to-r from-purple-900/80 via-indigo-900/60 to-purple-900/80 p-4 rounded-2xl border border-purple-500/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                <div>
                  <h3 className="font-bold text-white text-base flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    Laboratorium Gema Suara & Diskriminasi Fonemik
                  </h3>
                  <p className="text-xs text-purple-200 mt-1 max-w-xl">
                    Perbandingan akustik ketat antara dua kata berbunyi mirip (*minimal pairs*) yang kerap membingungkan pembelajar non-Arab. Dengarkan perbedaan artikulasi makhraj dan uji ketajaman telingamu!
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {/* Mode Switch Pills */}
                  <div className="bg-purple-950 p-1 rounded-xl border border-purple-700/60 flex items-center gap-1 text-xs">
                    <button
                      onClick={() => {
                        sound.playTap();
                        setEchoSubMode('explore');
                      }}
                      className={`px-3 py-1.5 rounded-lg transition-all ${
                        echoSubMode === 'explore'
                          ? 'bg-purple-600 text-white shadow font-bold'
                          : 'text-purple-300 hover:text-white'
                      }`}
                    >
                      Eksplorasi (A vs B)
                    </button>
                    <button
                      onClick={() => {
                        sound.playTap();
                        setEchoSubMode('blind_quiz');
                        startBlindQuizQuestion(0);
                      }}
                      className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
                        echoSubMode === 'blind_quiz'
                          ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow font-bold'
                          : 'text-purple-300 hover:text-white'
                      }`}
                    >
                      <Zap className="w-3.5 h-3.5 text-amber-300" />
                      <span>Kuis Diskriminasi Fonem</span>
                    </button>
                  </div>

                  {/* Playback Speed selector */}
                  <div className="flex items-center gap-1.5 bg-purple-950/80 px-2.5 py-1.5 rounded-xl border border-purple-700/60 text-xs">
                    <Gauge className="w-3.5 h-3.5 text-amber-300" />
                    <button
                      onClick={() => {
                        sound.playTap();
                        setPlaybackSpeed(prev => (prev === 0.85 ? 0.65 : prev === 0.65 ? 1.0 : 0.85));
                      }}
                      className="font-bold text-amber-300 hover:underline"
                    >
                      {playbackSpeed === 0.85 ? '0.85x Sedang' : playbackSpeed === 0.65 ? '0.65x Lambat' : '1.0x Normal'}
                    </button>
                  </div>
                </div>
              </div>

              {/* SUBMODE 1: EXPLORATION (A vs B) */}
              {echoSubMode === 'explore' && (
                <div className="space-y-4">
                  {/* Minimal Pairs Selection Grid (12 items) */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
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
                          <div className="text-[9px] uppercase font-bold text-purple-400 truncate">
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
                          Uji Resonansi & Perbandingan Akustik
                        </span>
                        <h4 className="text-lg font-bold text-white mt-0.5">
                          {selectedPair.title}
                        </h4>
                      </div>
                      <span className="text-xs bg-purple-800/70 text-purple-200 px-3 py-1 rounded-full border border-purple-600/50 uppercase">
                        Kategori: {selectedPair.category}
                      </span>
                    </div>

                    <p className="text-xs text-purple-200 leading-relaxed bg-purple-900/40 p-3 rounded-xl border border-purple-800/50">
                      💡 <strong>Kaidah Fonetik & Titik Artikulasi:</strong> {selectedPair.explanation}
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
                          <Volume2 className={`w-4 h-4 ${isPlayingAudio === 'A' ? 'animate-bounce text-amber-300' : ''}`} />
                          <span>{isPlayingAudio === 'A' ? 'Memutar Bunyi A...' : `Dengarkan "${selectedPair.itemA.ar}"`}</span>
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
                          <Volume2 className={`w-4 h-4 ${isPlayingAudio === 'B' ? 'animate-bounce text-amber-300' : ''}`} />
                          <span>{isPlayingAudio === 'B' ? 'Memutar Bunyi B...' : `Dengarkan "${selectedPair.itemB.ar}"`}</span>
                        </button>
                      </div>
                    </div>

                    {/* Quick Practice CTA */}
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-purple-300">
                        Siap menguji telinga secara buta tanpa melihat teks tulisan?
                      </span>
                      <button
                        onClick={() => {
                          sound.playTap();
                          setEchoSubMode('blind_quiz');
                          startBlindQuizQuestion(MINIMAL_PAIRS_DATA.findIndex(p => p.id === selectedPair.id));
                        }}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-amber-400 hover:from-pink-400 hover:to-amber-300 text-slate-950 font-black text-xs shadow-md flex items-center gap-1.5 active:scale-95 transition-all"
                      >
                        <Zap className="w-4 h-4 fill-current" />
                        <span>Mulai Kuis Diskriminasi Fonem Ini</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* SUBMODE 2: BLIND ACOUSTIC DISCRIMINATION QUIZ */}
              {echoSubMode === 'blind_quiz' && (() => {
                const currentPair = MINIMAL_PAIRS_DATA[blindQuizPairIdx % MINIMAL_PAIRS_DATA.length];
                const targetItem = blindTargetSound === 'A' ? currentPair.itemA : currentPair.itemB;

                return (
                  <div className="bg-gradient-to-b from-slate-900/95 via-purple-950 to-slate-950 rounded-3xl p-6 border-2 border-pink-500/60 shadow-2xl space-y-6">
                    {/* Header Quiz Bar */}
                    <div className="flex items-center justify-between border-b border-purple-800/60 pb-3 flex-wrap gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-full bg-pink-900/80 text-pink-200 text-[10px] font-bold border border-pink-700/50">
                            Tantangan {blindQuizPairIdx + 1} dari {MINIMAL_PAIRS_DATA.length}
                          </span>
                          <span className="text-xs text-purple-300">
                            Kategori: {currentPair.category.toUpperCase()}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-white mt-1">
                          {currentPair.title}
                        </h4>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="bg-purple-950/80 px-3 py-1.5 rounded-xl border border-purple-700/60 text-xs">
                          <span className="text-purple-300">Skor: </span>
                          <span className="font-extrabold text-amber-300">+{blindScore} XP</span>
                        </div>
                        <div className="bg-pink-950/80 px-3 py-1.5 rounded-xl border border-pink-700/60 text-xs">
                          <span className="text-pink-300">Streak: </span>
                          <span className="font-extrabold text-pink-300">🔥 {blindStreak}</span>
                        </div>
                      </div>
                    </div>

                    {/* Central Audio Mystery Console */}
                    <div className="text-center py-6 px-4 bg-purple-900/30 rounded-2xl border border-purple-700/40 space-y-4">
                      <div className="text-xs text-purple-200 font-medium">
                        Tekan tombol di bawah untuk mendengarkan lafal misteri penutur asli Fusha:
                      </div>

                      {/* Sound Wave Animation Visualizer */}
                      <div className="flex items-center justify-center gap-1.5 h-12">
                        {[18, 35, 24, 48, 30, 42, 20, 38, 28, 45, 22, 32].map((h, i) => (
                          <motion.div
                            key={i}
                            animate={{
                              height: isPlayingAudio === 'mystery' ? [h * 0.4, h, h * 0.4] : 8,
                              backgroundColor: isPlayingAudio === 'mystery' ? '#f472b6' : '#6b21a8'
                            }}
                            transition={{
                              repeat: Infinity,
                              duration: 0.5 + (i % 3) * 0.15,
                              ease: 'easeInOut'
                            }}
                            className="w-1.5 rounded-full"
                          />
                        ))}
                      </div>

                      <button
                        onClick={playMysterySound}
                        className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 hover:from-purple-400 hover:to-rose-400 text-white font-extrabold text-sm shadow-xl active:scale-95 transition-all inline-flex items-center gap-2.5"
                      >
                        <Volume2 className={`w-5 h-5 ${isPlayingAudio === 'mystery' ? 'animate-ping' : ''}`} />
                        <span>{blindHasPlayed ? 'Dengarkan Ulang Bunyi Misteri 🔊' : 'Putar Bunyi Misteri Sekarang 🎧'}</span>
                      </button>

                      {!blindHasPlayed && (
                        <p className="text-[11px] text-amber-300/90 font-medium animate-pulse">
                          ⚠️ Putar audionya terlebih dahulu sebelum memilih jawaban!
                        </p>
                      )}
                    </div>

                    {/* Discrimination Options (Two Big Cards) */}
                    <div className="space-y-2">
                      <div className="text-xs font-bold text-purple-300">
                        Manakah kata yang barusan kamu dengarkan?
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Option A */}
                        <button
                          disabled={!blindHasPlayed || blindFeedback !== null}
                          onClick={() => handleBlindQuizAnswer('A')}
                          className={`p-4 rounded-2xl border-2 text-left transition-all ${
                            blindUserAnswer === 'A'
                              ? blindFeedback === 'correct'
                                ? 'bg-emerald-950/80 border-emerald-400 text-white ring-2 ring-emerald-400'
                                : 'bg-rose-950/80 border-rose-400 text-white ring-2 ring-rose-400'
                              : 'bg-purple-900/40 hover:bg-purple-800/60 border-purple-700/60 text-purple-200'
                          } ${!blindHasPlayed ? 'opacity-50 cursor-not-allowed' : 'active:scale-98'}`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold px-2 py-0.5 rounded bg-purple-800 text-purple-200">
                              PILIHAN A
                            </span>
                            <span className="text-xs text-amber-300 font-mono">
                              /{currentPair.itemA.translit}/
                            </span>
                          </div>
                          <div className="text-base font-bold text-white mt-2">
                            {currentPair.itemA.meaning}
                          </div>
                          <div className="text-[11px] text-purple-300 mt-1">
                            {currentPair.itemA.makhrajNote}
                          </div>
                          {blindFeedback !== null && (
                            <div className="text-2xl font-arabic font-extrabold text-amber-200 mt-2">
                              {currentPair.itemA.ar}
                            </div>
                          )}
                        </button>

                        {/* Option B */}
                        <button
                          disabled={!blindHasPlayed || blindFeedback !== null}
                          onClick={() => handleBlindQuizAnswer('B')}
                          className={`p-4 rounded-2xl border-2 text-left transition-all ${
                            blindUserAnswer === 'B'
                              ? blindFeedback === 'correct'
                                ? 'bg-emerald-950/80 border-emerald-400 text-white ring-2 ring-emerald-400'
                                : 'bg-rose-950/80 border-rose-400 text-white ring-2 ring-rose-400'
                              : 'bg-purple-900/40 hover:bg-purple-800/60 border-purple-700/60 text-purple-200'
                          } ${!blindHasPlayed ? 'opacity-50 cursor-not-allowed' : 'active:scale-98'}`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold px-2 py-0.5 rounded bg-pink-900 text-pink-200">
                              PILIHAN B
                            </span>
                            <span className="text-xs text-amber-300 font-mono">
                              /{currentPair.itemB.translit}/
                            </span>
                          </div>
                          <div className="text-base font-bold text-white mt-2">
                            {currentPair.itemB.meaning}
                          </div>
                          <div className="text-[11px] text-pink-300 mt-1">
                            {currentPair.itemB.makhrajNote}
                          </div>
                          {blindFeedback !== null && (
                            <div className="text-2xl font-arabic font-extrabold text-pink-200 mt-2">
                              {currentPair.itemB.ar}
                            </div>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Feedback Toast & Next Button */}
                    {blindFeedback && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                          blindFeedback === 'correct'
                            ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200'
                            : 'bg-rose-950/90 border-rose-500 text-rose-200'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="font-extrabold text-sm flex items-center gap-1.5">
                            {blindFeedback === 'correct' ? (
                              <>
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                <span>Luar Biasa! Tebakanmu Akurat (+15 XP)</span>
                              </>
                            ) : (
                              <>
                                <X className="w-4 h-4 text-rose-400" />
                                <span>Kurang Tepat, Bunyi yang Benar Adalah Pilihan {blindTargetSound}</span>
                              </>
                            )}
                          </div>
                          <p className="text-xs opacity-90 leading-relaxed">
                            Kata yang diputar: <strong className="font-arabic text-amber-300 text-base">{targetItem.ar}</strong> ({targetItem.translit} - {targetItem.meaning}). {targetItem.makhrajNote}.
                          </p>
                        </div>

                        <button
                          onClick={() => {
                            sound.playTap();
                            nextBlindQuestion();
                          }}
                          className="px-5 py-2.5 rounded-xl bg-white text-slate-950 font-black text-xs shadow hover:bg-slate-100 active:scale-95 transition-all shrink-0 flex items-center gap-1.5"
                        >
                          <span>Soal Berikutnya</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </motion.div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}

          {/* TAB 2: STORY CAMPFIRE */}
          {activeTab === 'story_campfire' && (
            <div className="space-y-5">
              <div className="bg-gradient-to-r from-purple-900/80 via-amber-950/50 to-purple-900/80 p-4 rounded-2xl border border-purple-500/40 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white text-base flex items-center gap-2">
                    <Flame className="w-4 h-4 text-amber-300" />
                    Api Unggun Cerita Menyimak (Majlis al-Qashash)
                  </h3>
                  <p className="text-xs text-purple-200 mt-0.5">
                    Dengarkan hikmah dan fabel Arab kalimat demi kalimat, latih daya tangkap wacana dan jawab kuis pemahaman lisan!
                  </p>
                </div>
              </div>

              {/* Story selector buttons */}
              <div className="flex gap-2">
                {AUDIO_STORIES.map((st) => (
                  <button
                    key={st.id}
                    onClick={() => {
                      sound.playTap();
                      setSelectedStory(st);
                      setQuizSelectedIdx(null);
                      setQuizAnswered(false);
                    }}
                    className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                      selectedStory.id === st.id
                        ? 'border-amber-400 bg-amber-950/60 text-amber-200 shadow ring-1 ring-amber-400/50'
                        : 'border-purple-800 bg-purple-950/40 text-purple-300 hover:bg-purple-900/40'
                    }`}
                  >
                    <span>{st.title}</span>
                  </button>
                ))}
              </div>

              {/* Story Narrator Player */}
              <div className="bg-gradient-to-b from-slate-900/90 to-purple-950 rounded-3xl p-5 border-2 border-purple-500/50 shadow-xl space-y-4">
                <div className="border-b border-purple-800/60 pb-3 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest">
                      Tema: {selectedStory.theme}
                    </span>
                    <h4 className="text-lg font-bold text-white mt-0.5">
                      {selectedStory.title}
                    </h4>
                  </div>
                  <div className="text-sm font-arabic text-amber-200 font-bold">
                    {selectedStory.titleAr}
                  </div>
                </div>

                {/* Sentence by Sentence audio player */}
                <div className="space-y-3">
                  {selectedStory.sentences.map((sent, idx) => {
                    const isPlaying = playingSentenceIdx === idx;
                    return (
                      <div
                        key={idx}
                        className={`p-3.5 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                          isPlaying
                            ? 'bg-purple-800/70 border-pink-400 shadow-md ring-1 ring-pink-400/40'
                            : 'bg-purple-900/30 border-purple-700/40 hover:bg-purple-900/50'
                        }`}
                      >
                        <div className="flex-1 space-y-1">
                          <div className="text-lg font-arabic font-bold text-amber-200 leading-relaxed">
                            {sent.ar}
                          </div>
                          <div className="text-xs font-mono text-purple-300 italic">
                            {sent.translit}
                          </div>
                          <div className="text-xs text-purple-100">
                            {sent.id}
                          </div>
                        </div>

                        <button
                          onClick={() => playStorySentence(sent.ar, idx)}
                          disabled={playingSentenceIdx !== null}
                          className="w-9 h-9 rounded-xl bg-purple-700 hover:bg-pink-600 text-white flex items-center justify-center shrink-0 transition-colors shadow-sm"
                          aria-label={`Dengarkan kalimat ${idx + 1}`}
                        >
                          <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-ping' : ''}`} />
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Story Quiz */}
                <div className="pt-4 border-t border-purple-800/60 space-y-3">
                  <div className="text-xs font-bold text-pink-300 uppercase tracking-wider flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4" />
                    <span>Kuis Pemahaman Menyimak (Fahm al-Masmū')</span>
                  </div>

                  <p className="text-sm font-bold text-white">
                    {selectedStory.quiz.question}
                  </p>

                  <div className="grid grid-cols-1 gap-2">
                    {selectedStory.quiz.options.map((opt, oIdx) => {
                      const isSelected = quizSelectedIdx === oIdx;
                      const isCorrect = oIdx === selectedStory.quiz.correctIdx;

                      return (
                        <button
                          key={oIdx}
                          disabled={quizAnswered}
                          onClick={() => {
                            sound.playTap();
                            setQuizSelectedIdx(oIdx);
                            setQuizAnswered(true);
                            if (isCorrect) {
                              sound.playSuccess();
                              if (onReward) onReward(20, 1);
                            } else {
                              sound.playGentleRetry();
                            }
                          }}
                          className={`p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                            quizAnswered
                              ? isCorrect
                                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold'
                                : isSelected
                                ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                                : 'bg-purple-950/40 border-purple-800/40 text-purple-400 opacity-60'
                              : 'bg-purple-900/40 hover:bg-purple-800/60 border-purple-700/60 text-purple-200'
                          }`}
                        >
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {quizAnswered && (
                    <div className="p-3 rounded-xl bg-purple-950/80 border border-purple-700/60 text-xs text-purple-200 flex items-center justify-between">
                      <span>
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

          {/* TAB 4: CURRICULUM SYLLABUS WITH LEVEL FILTER & SEARCH */}
          {activeTab === 'curriculum' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-purple-300" />
                    Silabus Lengkap: Lembah Menyimak • 17 Modul Terstruktur
                  </h3>
                  <p className="text-xs text-purple-300 mt-0.5">
                    Kurikulum fonemik & menyimak reseptif berjenjang dari Tingkat 1 (Tamhidi) hingga Tingkat 6 (Mahir Lanjut)
                  </p>
                </div>
                <span className="text-xs bg-purple-800 text-purple-200 font-bold px-3 py-1 rounded-full border border-purple-600/50 shrink-0 self-start sm:self-auto">
                  {istimaSkills.length} Modul Terfilter
                </span>
              </div>

              {/* Filters & Search Toolbar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 bg-purple-950/60 p-2.5 rounded-2xl border border-purple-800/50">
                {/* Level chips */}
                <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs">
                  <span className="text-purple-400 font-bold px-1.5 flex items-center gap-1">
                    <Sliders className="w-3.5 h-3.5" /> Tingkat:
                  </span>
                  {(['all', 0, 1, 2, 3, 4, 5] as const).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => {
                        sound.playTap();
                        setCurriculumLevelFilter(lvl);
                      }}
                      className={`px-2.5 py-1 rounded-lg font-bold transition-all whitespace-nowrap ${
                        curriculumLevelFilter === lvl
                          ? 'bg-purple-600 text-white shadow'
                          : 'bg-purple-900/40 text-purple-300 hover:bg-purple-800/50'
                      }`}
                    >
                      {lvl === 'all' ? 'Semua' : `Tingkat ${lvl + 1}`}
                    </button>
                  ))}
                </div>

                {/* Search Input */}
                <div className="relative min-w-[200px]">
                  <Search className="w-3.5 h-3.5 text-purple-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={curriculumSearch}
                    onChange={(e) => setCurriculumSearch(e.target.value)}
                    placeholder="Cari materi simakan..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-purple-900/50 border border-purple-700/60 text-xs text-white placeholder-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {istimaSkills.map((sk) => (
                  <div
                    key={sk.skill_id}
                    className="p-3.5 rounded-2xl bg-purple-900/40 border border-purple-700/50 flex items-start gap-3 hover:bg-purple-900/60 transition-all"
                  >
                    <div className="w-8 h-8 rounded-xl bg-purple-800 text-purple-200 font-extrabold text-xs flex items-center justify-center shrink-0 border border-purple-600/40">
                      T{sk.level + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-pink-300">
                          Tingkat {sk.level + 1} • {sk.skill_id}
                        </span>
                        <span className="text-[10px] bg-purple-950 px-2 py-0.5 rounded text-purple-300">
                          {sk.scope}
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

          {/* TAB 5: AUDIO GLOSSARY WITH SEARCH & LEVEL FILTER */}
          {activeTab === 'glossary' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Volume2 className="w-5 h-5 text-teal-300" />
                    Glosarium Audio Reseptif: Lembah Istima'
                  </h3>
                  <p className="text-xs text-purple-300 mt-0.5">
                    Koleksi lengkap kosakata & frasa audio berharakat lengkap dengan penutur Fusha. Sentuh kartu untuk menyimak lafal!
                  </p>
                </div>
                <span className="text-xs bg-purple-800 text-purple-200 font-bold px-3 py-1 rounded-full border border-purple-600/50 shrink-0 self-start sm:self-auto">
                  {istimaLexicon.length} Kosakata Audio
                </span>
              </div>

              {/* Toolbar Filters */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 bg-purple-950/60 p-2.5 rounded-2xl border border-purple-800/50">
                {/* Level chips */}
                <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs">
                  <span className="text-purple-400 font-bold px-1.5 flex items-center gap-1">
                    <Sliders className="w-3.5 h-3.5" /> Level:
                  </span>
                  {(['all', 0, 1, 2, 3, 4, 5] as const).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => {
                        sound.playTap();
                        setGlossaryLevelFilter(lvl);
                      }}
                      className={`px-2.5 py-1 rounded-lg font-bold transition-all whitespace-nowrap ${
                        glossaryLevelFilter === lvl
                          ? 'bg-purple-600 text-white shadow'
                          : 'bg-purple-900/40 text-purple-300 hover:bg-purple-800/50'
                      }`}
                    >
                      {lvl === 'all' ? 'Semua' : `L${lvl}`}
                    </button>
                  ))}
                </div>

                {/* Search Input */}
                <div className="relative min-w-[200px]">
                  <Search className="w-3.5 h-3.5 text-purple-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={glossarySearch}
                    onChange={(e) => setGlossarySearch(e.target.value)}
                    placeholder="Cari kata Arab / arti..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-purple-900/50 border border-purple-700/60 text-xs text-white placeholder-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {istimaLexicon.map((lex) => (
                  <button
                    key={lex.id}
                    onClick={() => {
                      sound.playTap();
                      sound.speakArabic(lex.ar_vocalized, 0.85);
                    }}
                    className="p-3.5 rounded-2xl bg-purple-900/40 hover:bg-purple-800/60 border border-purple-700/50 text-left flex items-center justify-between gap-3 transition-all active:scale-95 group shadow-sm"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5 text-[10px] text-purple-300 font-mono">
                        <span className="px-1.5 py-0.2 rounded bg-purple-950 text-pink-300 font-bold">
                          L{lex.level}
                        </span>
                        <span className="truncate">{lex.category}</span>
                      </div>
                      <div className="text-xl font-bold font-arabic text-amber-200 mt-1">
                        {lex.ar_vocalized}
                      </div>
                      <div className="text-xs font-mono text-purple-300 italic">
                        {lex.translit}
                      </div>
                      <div className="text-xs text-purple-100 font-medium mt-0.5 line-clamp-2">
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
