import { IslandId, SkillItem, SkillExplanation, PracticeQuestion } from '../types/game';
import { LEXICON_DATA, SKILLS_DATA } from './curriculum';
import { MFR_DEDICATED_PEDAGOGY } from './mfrPedagogy';
import { QWD_DEDICATED_PEDAGOGY } from './qwdPedagogy';
import { IST_DEDICATED_PEDAGOGY } from './istPedagogy';
import { TMH_DEDICATED_PEDAGOGY } from './tmhPedagogy';

export interface FriendlyLevelInfo {
  levelNumber: number;
  friendlyCode: string;
  nameId: string;
  nameAr: string;
  fullTitle: string;
  shortLabel: string;
  description: string;
  rutbahTarget: string;
  colorGrad: string;
  badgeBg: string;
  borderCol: string;
}

export const FRIENDLY_LEVELS: FriendlyLevelInfo[] = [
  {
    levelNumber: 0,
    friendlyCode: 'Tingkat 1',
    nameId: 'Pemula (Tamhidi)',
    nameAr: 'المَرْحَلَةُ التَّمْهِيدِيَّة',
    fullTitle: 'Tingkat 1: Pemula (Tamhidi)',
    shortLabel: 'Pemula',
    description: 'Mengenal 28 huruf hijaiyah, bunyi murni vokal, harakat dasar, dan jejak goresan pasir pantai.',
    rutbahTarget: 'Musafir (Penjelajah Pemula)',
    colorGrad: 'from-teal-600 via-cyan-600 to-teal-800',
    badgeBg: 'bg-teal-600',
    borderCol: 'border-teal-400'
  },
  {
    levelNumber: 1,
    friendlyCode: 'Tingkat 2',
    nameId: 'Dasar (Mubtadi\')',
    nameAr: 'المَرْحَلَةُ الِابْتِدَائِيَّة',
    fullTitle: 'Tingkat 2: Dasar (Mubtadi\')',
    shortLabel: 'Dasar',
    description: 'Bentuk huruf sambung (awal, tengah, akhir), 6 huruf pemutus kiri, kosakata inti tematik, dan imla awal.',
    rutbahTarget: 'Thalib (Penuntut Ilmu)',
    colorGrad: 'from-amber-600 via-orange-600 to-yellow-700',
    badgeBg: 'bg-amber-600',
    borderCol: 'border-amber-400'
  },
  {
    levelNumber: 2,
    friendlyCode: 'Tingkat 3',
    nameId: 'Menengah (Asasi)',
    nameAr: 'المَرْحَلَةُ الأَسَاسِيَّة',
    fullTitle: 'Tingkat 3: Menengah (Asasi)',
    shortLabel: 'Menengah',
    description: 'Menyusun kalimat sederhana, kaidah mudzakkar-muannats, kata tunjuk, dan memahami instruksi menyimak.',
    rutbahTarget: 'Rahhal (Penjelajah Fasih)',
    colorGrad: 'from-blue-600 via-indigo-600 to-blue-800',
    badgeBg: 'bg-blue-600',
    borderCol: 'border-blue-400'
  },
  {
    levelNumber: 3,
    friendlyCode: 'Tingkat 4',
    nameId: 'Lanjutan (Mutawassith)',
    nameAr: 'المَرْحَلَةُ المُتَوَسِّطَة',
    fullTitle: 'Tingkat 4: Lanjutan (Mutawassith)',
    shortLabel: 'Lanjutan',
    description: 'Membaca wacana mandiri, mesin perubahan kata fi\'il (tashrif), dan percakapan kontekstual luwes.',
    rutbahTarget: 'Qari & Katib (Pembaca & Penulis)',
    colorGrad: 'from-purple-600 via-violet-700 to-indigo-900',
    badgeBg: 'bg-purple-600',
    borderCol: 'border-purple-400'
  },
  {
    levelNumber: 4,
    friendlyCode: 'Tingkat 5',
    nameId: 'Mandiri (Mutaqaddim)',
    nameAr: 'المَرْحَلَةُ المُتَقَدِّمَة',
    fullTitle: 'Tingkat 5: Mandiri (Mutaqaddim)',
    shortLabel: 'Mandiri',
    description: 'Penguasaan tata bahasa mendalam, ejaan dikte kompleks (hamzah & mad), dan pemahaman teks hikmah.',
    rutbahTarget: 'Adib (Pujangga Mahir)',
    colorGrad: 'from-rose-600 via-pink-700 to-red-800',
    badgeBg: 'bg-rose-600',
    borderCol: 'border-rose-400'
  },
  {
    levelNumber: 5,
    friendlyCode: 'Tingkat 6',
    nameId: 'Mahir (Mutamayyiz)',
    nameAr: 'المَرْحَلَةُ المُمَيَّزَة',
    fullTitle: 'Tingkat 6: Mahir (Mutamayyiz)',
    shortLabel: 'Mahir',
    description: 'Kefasihan lisan balaghah dan kelulusan Gerbang Mihrab Kuil Langit lintas 4 keterampilan.',
    rutbahTarget: 'Adib Agung (Mahkota Kuil Langit)',
    colorGrad: 'from-amber-400 via-yellow-500 to-amber-700',
    badgeBg: 'bg-yellow-500',
    borderCol: 'border-yellow-300'
  }
];

export function getFriendlyLevel(level?: number): FriendlyLevelInfo {
  const lvl = typeof level === 'number' && !isNaN(level) ? Math.min(Math.max(0, Math.floor(level)), FRIENDLY_LEVELS.length - 1) : 0;
  return FRIENDLY_LEVELS[lvl] || FRIENDLY_LEVELS[0];
}

export function getFriendlyIslandName(islandId: IslandId): {
  fullName: string;
  shortName: string;
  arabicName: string;
  focusArea: string;
  icon: string;
} {
  switch (islandId) {
    case 'HRF':
      return {
        fullName: 'Pulau Huruf Hijaiyah',
        shortName: 'Pulau Huruf',
        arabicName: 'جَزِيرَةُ الحُرُوف',
        focusArea: 'Bentuk Huruf, Bunyi Makhraj, Harakat & Jejak Pasir',
        icon: '🐚'
      };
    case 'MFR':
      return {
        fullName: 'Pasar Kosakata Apung (Mufradat)',
        shortName: 'Pasar Mufradat',
        arabicName: 'سُوقُ المُفْرَدَات',
        focusArea: 'Koleksi Kosakata Benda, Warna, Angka & Makanan',
        icon: '🛶'
      };
    case 'HWR':
      return {
        fullName: 'Kampung Percakapan (Hiwar)',
        shortName: 'Kampung Hiwar',
        arabicName: 'قَرْيَةُ الحِوَار',
        focusArea: 'Dialog Nyata: Perkenalan, Belanja, Kafe & Sapaan Sopan',
        icon: '🏘️'
      };
    case 'QWD':
      return {
        fullName: 'Gunung Tata Bahasa (Nahwu & Sharaf)',
        shortName: 'Gunung Qawa\'id',
        arabicName: 'جَبَلُ القَوَاعِد',
        focusArea: 'Susunan Kalimat, Mudzakkar-Muannats & Kata Tunjuk',
        icon: '⛰️'
      };
    case 'IST':
      return {
        fullName: 'Lembah Menyimak Suara (Istima\')',
        shortName: 'Lembah Istima\'',
        arabicName: 'وَادِي الِاسْتِمَاع',
        focusArea: 'Menyimak Audio Penutur Asli, Pantulan Gema & Cerita',
        icon: '👂'
      };
    case 'QRA':
      return {
        fullName: 'Perpustakaan Membaca (Qira\'ah)',
        shortName: 'Perpustakaan Qira\'ah',
        arabicName: 'مَكْتَبَةُ القِرَاءَة',
        focusArea: 'Membaca Cerita Berharakat, Surat Hudhud & Naskah',
        icon: '📚'
      };
    case 'KTB':
      return {
        fullName: 'Pelabuhan Menulis & Dikte (Kitabah)',
        shortName: 'Pelabuhan Kitabah',
        arabicName: 'مِينَاءُ الكِتَابَة',
        focusArea: 'Ejaan Dikte (Imla\'), Ta Marbuthah, Hamzah & Kaligrafi',
        icon: '⚓'
      };
    case 'KLM':
      return {
        fullName: 'Pulau Berbicara Fasih (Kalam)',
        shortName: 'Pulau Kalam',
        arabicName: 'جَزِيرَةُ الكَلَام',
        focusArea: 'Artikulasi Makhraj Tenggorokan & Lidah, Kelancaran Bicara',
        icon: '🎙️'
      };
    case 'TMH':
      return {
        fullName: 'Kuil Langit (Ujian & Misi Akhir)',
        shortName: 'Kuil Langit',
        arabicName: 'مَعْبَدُ السَّمَاء',
        focusArea: 'Ujian Kelulusan Terpadu 4 Keterampilan Bahasa Arab',
        icon: '👑'
      };
    default:
      return {
        fullName: 'Pulau Petualangan',
        shortName: 'Pulau Belajar',
        arabicName: 'جَزِيرَةُ التَّعَلُّم',
        focusArea: 'Pembelajaran Terarah',
        icon: '🏝️'
      };
  }
}

// -------------------------------------------------------------
// DEDICATED COMPLETE PEDAGOGICAL CONTENT PER SKILL
// -------------------------------------------------------------

export interface EnrichedSkillPedagogy {
  explanation: SkillExplanation;
  questions: PracticeQuestion[];
  highlightVocab: {
    ar: string;
    translit: string;
    id: string;
    note?: string;
  }[];
}

const DEDICATED_PEDAGOGY_MAP: Record<string, EnrichedSkillPedagogy> = {
  // 1. HRF-L0-01: Huruf Set 1 (ا ب ت ث ج ح خ)
  'HRF-L0-01': {
    explanation: {
      conceptTitle: 'Mengenal 7 Huruf Pertama Hijaiyah',
      overview: 'Pada unit ini, kamu akan berkenalan dengan 7 huruf awal alfabet bahasa Arab: Alif, Ba, Ta, Tsa, Jim, Ha, dan Kha. Perhatikan titik-titiknya: Ba punya 1 titik di bawah, Ta punya 2 titik di atas, Tsa punya 3 titik di atas!',
      rules: [
        {
          title: 'Huruf Alif (ا)',
          explanation: 'Berdiri tegak lurus seperti tongkat. Menghasilkan bunyi vokal pembuka "A" saat berharakat fathah.',
          exampleAr: 'أَ',
          exampleTranslit: 'A',
          exampleId: 'Bunyi terbuka vokal'
        },
        {
          title: 'Keluarga Piring: Ba (ب), Ta (ت), Tsa (ث)',
          explanation: 'Bentuk dasarnya mirip perahu/piring. Pembedanya adalah titik: Ba (1 titik di bawah), Ta (2 titik di atas), Tsa (3 titik di atas dan ujung lidah sedikit digigit lembut).',
          exampleAr: 'بَ - تَ - ثَ',
          exampleTranslit: 'Ba - Ta - Tsa',
          exampleId: 'Perhatikan posisi titik'
        },
        {
          title: 'Keluarga Perut: Jim (ج), Ha (ح), Kha (خ)',
          explanation: 'Bentuknya memiliki kepala dan lengkungan perut. Jim ada titik di perut, Ha bersih tanpa titik (bunyi bersih dari tengah tenggorokan), Kha ada titik di atas (bunyi dengkur halus dari atas tenggorokan).',
          exampleAr: 'جَ - حَ - خَ',
          exampleTranslit: 'Ja - Ha - Kha',
          exampleId: 'Beda titik dan letak makhraj'
        }
      ],
      hudhudTips: 'Tips Sahabat Hudhud: Ingat Ba = Bawah (titik di bawah), Ta = Dua (titik dua di atas), Tsa = Tiga (titik tiga di atas)!'
    },
    highlightVocab: [
      { ar: 'أَلِف', translit: 'Alif', id: 'Huruf pertama tegak lurus' },
      { ar: 'بَاء', translit: 'Baa\'', id: 'Huruf perahu titik di bawah' },
      { ar: 'تَاء', translit: 'Taa\'', id: 'Huruf perahu titik dua di atas' },
      { ar: 'ثَاء', translit: 'Tsaa\'', id: 'Huruf perahu titik tiga di atas' },
      { ar: 'جِيم', translit: 'Jiim', id: 'Huruf lengkung titik di tengah' },
      { ar: 'حَاء', translit: 'Haa\'', id: 'Huruf bersih tanpa titik dari tenggorokan' },
      { ar: 'خَاء', translit: 'Khaa\'', id: 'Huruf bersuara tebal titik di atas' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Manakah huruf yang memiliki SATU titik di bagian BAWAH?',
        options: [
          { text: 'ب (Ba)', isCorrect: true, feedback: 'Benar! Huruf Ba memiliki satu titik di bawah perahunya.' },
          { text: 'ت (Ta)', isCorrect: false, feedback: 'Huruf Ta memiliki dua titik di atas.' },
          { text: 'ث (Tsa)', isCorrect: false, feedback: 'Huruf Tsa memiliki tiga titik di atas.' }
        ],
        hint: 'Ingat singkatan: Ba = Bawah!'
      },
      {
        id: 'q2',
        question: 'Bagaimana cara mengucapkan huruf ث (Tsa) dengan tepat?',
        options: [
          { text: 'Menempelkan ujung lidah pada ujung dua gigi seri atas (sedikit digigit lembut)', isCorrect: true, feedback: 'Tepat sekali! Tsa diucapkan lembut dengan ujung lidah keluar sedikit.' },
          { text: 'Merapatkan kedua bibir rapat-rapat', isCorrect: false, feedback: 'Itu makhraj huruf Ba atau Mim.' },
          { text: 'Menggesekkan pangkal lidah ke langit-langit belakang', isCorrect: false, feedback: 'Itu makhraj huruf Qaf.' }
        ]
      },
      {
        id: 'q3',
        question: 'Huruf manakah di antara trio (ج, ح, خ) yang BERSIH tanpa memiliki titik sama sekali?',
        options: [
          { text: 'ح (Ha)', isCorrect: true, feedback: 'Mumtaz! Huruf Ha bersih tanpa titik, bunyinya halus dari tengah tenggorokan.' },
          { text: 'ج (Jim)', isCorrect: false, feedback: 'Jim memiliki titik di dalam perutnya.' },
          { text: 'خ (Kha)', isCorrect: false, feedback: 'Kha memiliki titik di atas kepalanya.' }
        ]
      }
    ]
  },

  // 2. HRF-L0-05: Harakat Dasar (Fathah, Kasrah, Dhammah)
  'HRF-L0-05': {
    explanation: {
      conceptTitle: '3 Harakat Vokal Utama (A, I, U)',
      overview: 'Harakat adalah tanda baca vokal yang menghidupkan huruf hijaiyah. Huruf hijaiyah aslinya adalah konsonan mati. Dengan harakat, huruf mengeluarkan suara vokal pendek: Fathah berbunyi "A", Kasrah berbunyi "I", dan Dhammah berbunyi "U".',
      rules: [
        {
          title: 'Fathah (ـَ) = Bunyi "A"',
          explanation: 'Garis miring kecil di ATAS huruf. Mulut dibuka sedang saat membunyikannya (Fathah artinya "membuka").',
          exampleAr: 'دَ - رَ - سَ',
          exampleTranslit: 'Da - Ra - Sa',
          exampleId: 'Bunyi vokal A'
        },
        {
          title: 'Kasrah (ـِ) = Bunyi "I"',
          explanation: 'Garis miring kecil di BAWAH huruf. Bibir ditarik ke bawah sedikit tersenyum (Kasrah artinya "memecah/menurunkan").',
          exampleAr: 'بِ - تِ - سِ',
          exampleTranslit: 'Bi - Ti - Si',
          exampleId: 'Bunyi vokal I'
        },
        {
          title: 'Dhammah (ـُ) = Bunyi "U"',
          explanation: 'Bentuk menyerupai huruf Waw kecil di ATAS huruf. Kedua bibir dimonyongkan ke depan (Dhammah artinya "mengumpulkan bibir").',
          exampleAr: 'كُ - تِ - بُ',
          exampleTranslit: 'Ku - Ti - Bu',
          exampleId: 'Bunyi vokal U'
        }
      ],
      hudhudTips: 'Fathah di atas = A, Kasrah di bawah = I, Dhammah bentuk wau mungil = U. Sangat mudah diingat!'
    },
    highlightVocab: [
      { ar: 'فَتْحَة', translit: 'Fathah', id: 'Tanda garis atas berbunyi A' },
      { ar: 'كَسْرَة', translit: 'Kasrah', id: 'Tanda garis bawah berbunyi I' },
      { ar: 'ضَمَّة', translit: 'Dhammah', id: 'Tanda wau mungil berbunyi U' },
      { ar: 'سُكُون', translit: 'Sukun', id: 'Tanda bulat mati (konsonan tanpa vokal)' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Tanda harakat yang berada di BAWAH huruf dan menghasilkan bunyi vokal "I" adalah...',
        options: [
          { text: 'Kasrah (ـِ)', isCorrect: true, feedback: 'Benar! Kasrah berada di bawah huruf dan menghasilkan vokal I.' },
          { text: 'Fathah (ـَ)', isCorrect: false, feedback: 'Fathah berada di atas huruf dan berbunyi A.' },
          { text: 'Dhammah (ـُ)', isCorrect: false, feedback: 'Dhammah berbentuk wau kecil di atas huruf dan berbunyi U.' }
        ]
      },
      {
        id: 'q2',
        question: 'Bagaimana cara membaca huruf ك yang berharakat dhammah (كُ) ?',
        options: [
          { text: 'Ku', isCorrect: true, feedback: 'Tepat! Kaf dengan dhammah dibaca Ku dengan bibir dimonyongkan.' },
          { text: 'Ka', isCorrect: false, feedback: 'Ka adalah jika berharakat fathah (كَ).' },
          { text: 'Ki', isCorrect: false, feedback: 'Ki adalah jika berharakat kasrah (كِ).' }
        ]
      }
    ]
  },

  // 3. HRF-L1-02: 6 Huruf Pemutus Sambung Kiri
  'HRF-L1-02': {
    explanation: {
      conceptTitle: '6 Huruf yang Tidak Menyambung ke Kiri',
      overview: 'Dalam tulisan Arab, hampir semua huruf bisa bergandengan ke kanan dan ke kiri. Namun ada 6 huruf istimewa yang HANYA BISA disambung dari kanan, dan MENOLAK disambung dengan huruf setelahnya (ke kiri). Huruf tersebut adalah: Alif (ا), Dal (د), Dzal (ذ), Ra (ر), Zay (ز), dan Waw (و).',
      rules: [
        {
          title: '6 Huruf Pemutus: ا د ذ ر ز و',
          explanation: 'Jika menulis huruf setelah mereka, huruf berikutnya harus ditulis dalam bentuk awal/mandiri, tidak boleh ditarik garis sambung ke kiri.',
          exampleAr: 'بَاب (b-a-b) bukan ditarik garis sambung setelah Alif',
          exampleTranslit: 'B-a-b',
          exampleId: 'Alif memutus sambungan ke Ba akhir'
        },
        {
          title: 'Dapat Disambung dari Kanan',
          explanation: 'Ingat! Huruf pemutus ini tetap bisa disambung oleh huruf sebelumnya yang datang dari kanan. Mereka hanya tidak menyambung ke arah kiri.',
          exampleAr: 'بَدَأَ (Ba menyambung ke Dal, tapi Dal memutus sambungan ke Alif)',
          exampleTranslit: 'Ba-da-a',
          exampleId: 'Lihat jeda setelah huruf Dal'
        }
      ],
      hudhudTips: 'Hudhud punya jembatan keledai: "A-Da-Dza-Ra-Za-Wa" (Alif, Dal, Dzal, Ra, Za, Waw). Hafalkan 6 pendekar pemutus sambung ini!'
    },
    highlightVocab: [
      { ar: 'بَابٌ', translit: 'Baabun', id: 'Pintu (Perhatikan jeda setelah alif)' },
      { ar: 'وَرْدَةٌ', translit: 'Wardatun', id: 'Bunga mawar (Waw dan Ra keduanya pemutus)' },
      { ar: 'دَرْسٌ', translit: 'Darsun', id: 'Pelajaran (Dal dan Ra tidak menyambung ke kiri)' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Manakah di antara kelompok huruf berikut yang merupakan 6 Huruf Pemutus Sambung Kiri?',
        options: [
          { text: 'ا د ذ ر ز و', isCorrect: true, feedback: 'Tepat sekali! Alif, Dal, Dzal, Ra, Za, Waw adalah 6 huruf pemutus.' },
          { text: 'ب ت ث ج ح خ', isCorrect: false, feedback: 'Huruf-huruf ini semuanya bisa menyambung ke kiri dan ke kanan.' },
          { text: 'س ش ص ض ط ظ', isCorrect: false, feedback: 'Huruf-huruf ini bisa menyambung ke kiri.' }
        ]
      },
      {
        id: 'q2',
        question: 'Pada kata بَابٌ (Pintu), mengapa huruf Ba yang terakhir tidak menempel pada huruf Alif?',
        options: [
          { text: 'Karena huruf Alif termasuk huruf yang menolak menyambung ke huruf setelahnya (ke kiri)', isCorrect: true, feedback: 'Benar! Alif memutus sambungan ke sebelah kiri.' },
          { text: 'Karena huruf Ba tidak bisa menyambung', isCorrect: false, feedback: 'Huruf Ba bisa menyambung, tetapi Alif yang menolaknya.' }
        ]
      }
    ]
  },

  // 4. QWD: 30 Dedicated Nahwu-Sharaf Skills (L1-L5)
  ...QWD_DEDICATED_PEDAGOGY,

  // 6. HWR-L0-01: Sapaan & Salam Ta'aruf
  'HWR-L0-01': {
    explanation: {
      conceptTitle: 'Sapaan Santun & Berkenalan (Ta\'aruf)',
      overview: 'Di Kampung Hiwar, sapaan adalah kunci membuka pintu persahabatan. Masyarakat Arab sangat menghargai kehangatan sapaan islami dan tanya kabar yang tulus.',
      rules: [
        {
          title: 'Salam Penghormatan',
          explanation: 'Ucapan salam: السَّلَامُ عَلَيْكُمْ (Semoga keselamatan tercurah padamu), dijawab dengan وَعَلَيْكُمُ السَّلَامُ.',
          exampleAr: 'السَّلَامُ عَلَيْكُمْ ⟷ وَعَلَيْكُمُ السَّلَامُ',
          exampleTranslit: 'Assalaamu \'alaikum',
          exampleId: 'Salam resmi & berkah'
        },
        {
          title: 'Selamat Datang & Sambutan',
          explanation: 'أَهْلًا وَسَهْلًا (Ahlan wa sahlan), dijawab dengan أَهْلًا بِكَ (Ahlan bika - untuk pria) atau أَهْلًا بِكِ (Ahlan biki - untuk wanita).',
          exampleAr: 'أَهْلًا وَسَهْلًا ⟷ أَهْلًا بِكَ',
          exampleTranslit: 'Ahlan wa sahlan',
          exampleId: 'Ungkapan ramah tamah'
        },
        {
          title: 'Menanyakan Kabar',
          explanation: 'كَيْفَ حَالُكَ؟ (Kaifa haaluka? - untuk pria) atau كَيْفَ حَالُكِ؟ (Kaifa haaluki? - untuk wanita). Jawabannya: بِخَيْرٍ وَالحَمْدُ لِلَّهِ (Baik, segala puji bagi Allah).',
          exampleAr: 'كَيْفَ حَالُكَ؟ ⟷ بِخَيْرٍ وَالحَمْدُ لِلَّهِ',
          exampleTranslit: 'Bikhairin walhamdulillah',
          exampleId: 'Jawaban kabar baik'
        }
      ],
      hudhudTips: 'Jika bicara dengan teman laki-laki: akhiri dengan "-ka" (haaluka, bika). Jika teman perempuan: akhiri dengan "-ki" (haaluki, biki)!'
    },
    highlightVocab: [
      { ar: 'السَّلَامُ عَلَيْكُمْ', translit: 'Assalaamu \'alaikum', id: 'Semoga kedamaian menyertaimu' },
      { ar: 'أَهْلًا وَسَهْلًا', translit: 'Ahlan wa sahlan', id: 'Selamat datang' },
      { ar: 'صَبَاحَ الخَيْرِ', translit: 'Shabaahal khair', id: 'Selamat pagi' },
      { ar: 'صَبَاحَ النُّورِ', translit: 'Shabaahan nuur', id: 'Selamat pagi juga (jawaban)' },
      { ar: 'كَيْفَ حَالُكَ؟', translit: 'Kaifa haaluka?', id: 'Bagaimana kabarmu? (pria)' },
      { ar: 'بِخَيْرٍ وَالحَمْدُ لِلَّهِ', translit: 'Bikhairin walhamdulillah', id: 'Baik, alhamdulillah' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Jika seseorang menyapamu dengan: صَبَاحَ الخَيْرِ (Selamat pagi), jawaban yang paling lazim adalah...',
        options: [
          { text: 'صَبَاحَ النُّورِ (Shabaahan nuur)', isCorrect: true, feedback: 'Benar sekali! Shabaahan nuur artinya selamat pagi penuh cahaya.' },
          { text: 'مَعَ السَّلَامَةِ (Ma\'as salaamah)', isCorrect: false, feedback: 'Ma\'as salaamah artinya selamat jalan / perpisahan.' }
        ]
      },
      {
        id: 'q2',
        question: 'Apa jawaban yang tepat jika ditanya: كَيْفَ حَالُكَ؟ (Bagaimana kabarmu?)',
        options: [
          { text: 'بِخَيْرٍ وَالحَمْدُ لِلَّهِ (Alhamdulillah, saya baik)', isCorrect: true, feedback: 'Mumtaz! Jawaban santun dan penuh syukur.' },
          { text: 'شُكْرًا جَزِيلًا (Terima kasih banyak)', isCorrect: false, feedback: 'Itu ucapan terima kasih, bukan jawaban kabar.' }
        ]
      }
    ]
  },

  // HWR-L0-02: Perkenalan Diri & Nama (التَّعَارُف وَالِاسْم)
  'HWR-L0-02': {
    explanation: {
      conceptTitle: 'Perkenalan Diri: Bertanya & Menyebutkan Nama',
      overview: 'Perkenalan dalam bahasa Arab dipenuhi doa dan penghormatan. Kata tanya nama dibedakan antara lawan bicara laki-laki dan perempuan.',
      rules: [
        {
          title: 'Kata Tanya Nama',
          explanation: 'Gunakan مَا اسْمُكَ؟ (Mā ismuka?) untuk laki-laki, dan مَا اسْمُكِ؟ (Mā ismuki?) untuk perempuan.',
          exampleAr: 'مَا اسْمُكَ؟ ⟷ اِسْمِي أَحْمَدُ',
          exampleTranslit: 'Mā ismuka? -> Ismī Aḥmad',
          exampleId: 'Tanya nama pria'
        },
        {
          title: 'Ungkapan Sambutan',
          explanation: 'تَشَرَّفْنَا (Tasyarrafnā) bermakna "Kami merasa terhormat berkenalan denganmu", dijawab dengan الشَّرَفُ لَنَا (Asy-syarafu lanā).',
          exampleAr: 'تَشَرَّفْنَا بِمَعْرِفَتِكَ ⟷ الشَّرَفُ لَنَا',
          exampleTranslit: 'Tasyarrafnā bi-maʿrifatik',
          exampleId: 'Adab kehormatan ta\'aruf'
        }
      ],
      hudhudTips: 'Ingat kuncinya: akhiran -ka untuk pria dan -ki untuk wanita. Untuk menjawab nama sendiri, selalu gunakan "Ismī..."!'
    },
    highlightVocab: [
      { ar: 'مَا اسْمُكَ؟', translit: 'Mā ismuka?', id: 'Siapa namamu? (pria)' },
      { ar: 'مَا اسْمُكِ؟', translit: 'Mā ismuki?', id: 'Siapa namamu? (wanita)' },
      { ar: 'اِسْمِي', translit: 'Ismī', id: 'Namaku' },
      { ar: 'تَشَرَّفْنَا', translit: 'Tasyarrafnā', id: 'Kehormatan bagi kami' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Bagaimana cara menanyakan nama kepada seorang anak perempuan?',
        options: [
          { text: 'مَا اسْمُكِ؟ (Mā ismuki?)', isCorrect: true, feedback: 'Tepat sekali! Harakat kasrah -ki ditujukan untuk perempuan.' },
          { text: 'مَا اسْمُكَ؟ (Mā ismuka?)', isCorrect: false, feedback: '-ka berharakat fathah ditujukan untuk laki-laki.' }
        ]
      }
    ]
  },

  // HWR-L0-03: Menunjuk Benda di Sekitar (الإِشَارَةُ إِلَى الأَشْيَاءِ)
  'HWR-L0-03': {
    explanation: {
      conceptTitle: 'Kata Tunjuk Benda Dekat: Hadza vs Hadzihi',
      overview: 'Untuk menanyakan benda sekitar dalam percakapan, tanyakan مَا هٰذَا؟ (untuk kata benda maskulin) atau مَا هٰذِهِ؟ (untuk kata benda feminin).',
      rules: [
        {
          title: 'Kata Benda Maskulin (Mudzakkar)',
          explanation: 'Benda tanpa Ta Marbuthah menggunakan هٰذَا (Hādhā). Contoh: هٰذَا كِتَابٌ (Ini buku).',
          exampleAr: 'مَا هٰذَا؟ — هٰذَا كِتَابٌ',
          exampleTranslit: 'Mā hādhā? — Hādhā kitāb',
          exampleId: 'Benda maskulin'
        },
        {
          title: 'Kata Benda Feminin (Muannats)',
          explanation: 'Benda berakhiran Ta Marbuthah menggunakan هٰذِهِ (Hādhihi). Contoh: هٰذِهِ سَاعَةٌ (Ini jam).',
          exampleAr: 'مَا هٰذِهِ؟ — هٰذِهِ سَاعَةٌ',
          exampleTranslit: 'Mā hādhihi? — Hādhihi sāʿah',
          exampleId: 'Benda feminin'
        }
      ],
      hudhudTips: 'Lihat ekor katanya! Jika ada Ta Marbuthah (ة/ـة), pakai Hadzihi. Jika tidak ada, pakai Hadza!'
    },
    highlightVocab: [
      { ar: 'مَا هٰذَا؟', translit: 'Mā hādhā?', id: 'Apa ini? (maskulin)' },
      { ar: 'مَا هٰذِهِ؟', translit: 'Mā hādhihi?', id: 'Apa ini? (feminin)' },
      { ar: 'كِتَابٌ', translit: 'Kitābun', id: 'Buku' },
      { ar: 'سَاعَةٌ', translit: 'Sāʿatun', id: 'Jam tangan / dinding' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Jika kamu ingin bertanya tentang sebuah tas (حَقِيبَة), kalimat tanyanya adalah...',
        options: [
          { text: 'مَا هٰذِهِ؟ (Mā hādhihi?)', isCorrect: true, feedback: 'Mumtaz! Haqiibah adalah muannats (ada ta marbuthah).' },
          { text: 'مَا هٰذَا؟ (Mā hādhā?)', isCorrect: false, feedback: 'Hadza hanya untuk benda mudzakkar tanpa ta marbuthah.' }
        ]
      }
    ]
  },

  // HWR-L0-04: Ucapan Perpisahan & Doa Musafir (الوَدَاع وَالمُغَادَرَة)
  'HWR-L0-04': {
    explanation: {
      conceptTitle: 'Adab Mengakhiri Pertemuan & Berpamitan',
      overview: 'Perpisahan dalam kultur percakapan Arab diiringi doa keselamatan, seperti مَعَ السَّلَامَةِ (bersama keselamatan) dan فِي أَمَانِ اللَّهِ (dalam perlindungan Allah).',
      rules: [
        {
          title: 'Ucapan Pamit',
          explanation: 'مَعَ السَّلَامَةِ (Maʿa s-salāmah) diucapkan saat melangkah pamit pulang.',
          exampleAr: 'مَعَ السَّلَامَةِ ⟷ فِي أَمَانِ اللَّهِ',
          exampleTranslit: 'Maʿa s-salāmah ⟷ Fī amāni Llāh',
          exampleId: 'Doa keselamatan pamit'
        },
        {
          title: 'Harapan Bertemu Kembali',
          explanation: 'إِلَى اللِّقَاءِ (Ilā l-liqāʾ) artinya "sampai berjumpa lagi".',
          exampleAr: 'إِلَى اللِّقَاءِ قَرِيبًا!',
          exampleTranslit: 'Ilā l-liqāʾi qarīban!',
          exampleId: 'Sampai jumpa segera'
        }
      ],
      hudhudTips: 'Ketika sahabatmu berkata "Ma\'as salamah", jawablah dengan senyum tulus: "Fi amanillah"!'
    },
    highlightVocab: [
      { ar: 'مَعَ السَّلَامَةِ', translit: 'Maʿa s-salāmah', id: 'Selamat jalan' },
      { ar: 'فِي أَمَانِ اللَّهِ', translit: 'Fī amāni Llāh', id: 'Dalam lindungan Allah' },
      { ar: 'إِلَى اللِّقَاءِ', translit: 'Ilā l-liqāʾ', id: 'Sampai jumpa' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Jawaban yang paling afdhal saat sahabatmu berpamitan dengan: مَعَ السَّلَامَةِ adalah...',
        options: [
          { text: 'فِي أَمَانِ اللَّهِ (Fī amāni Llāh)', isCorrect: true, feedback: 'Benar! Mendoakan sahabat agar selalu dijaga oleh Allah.' },
          { text: 'صَبَاحَ الخَيْرِ (Ṣabāḥa l-khayr)', isCorrect: false, feedback: 'Shabahul khair adalah sapaan pagi hari, bukan ucapan pamit.' }
        ]
      }
    ]
  },

  // HWR-L1-01: Menanyakan & Mengabarkan Kondisi (السُّؤَال عَنِ الحَال)
  'HWR-L1-01': {
    explanation: {
      conceptTitle: 'Menanyakan Kabar & Mengungkapkan Rasa Syukur',
      overview: 'Bertanya kabar adalah jembatan keakraban. Jawaban orang beriman selalu mengedepankan pujian kepada Allah: Al-hamdu lillah.',
      rules: [
        {
          title: 'Pola Pertanyaan',
          explanation: 'كَيْفَ حَالُكَ؟ (Kayfa ḥāluka?) untuk pria, dan كَيْفَ حَالُكِ؟ (Kayfa ḥāluki?) untuk wanita.',
          exampleAr: 'كَيْفَ الحَالُ؟ — بِخَيْرٍ وَعَافِيَةٍ، الحَمْدُ لِلَّهِ',
          exampleTranslit: 'Kayfa l-ḥāl? — Bi-khayrin wa-ʿāfiyah, al-ḥamdu lillāh',
          exampleId: 'Tanya kabar hangat'
        }
      ],
      hudhudTips: 'Tambahkan kata "wa \'āfiyah" (sehat wal afiat) agar jawaban kabarmu terdengar fasih dan penuh doa!'
    },
    highlightVocab: [
      { ar: 'كَيْفَ حَالُكَ؟', translit: 'Kayfa ḥāluka?', id: 'Bagaimana kabarmu? (pria)' },
      { ar: 'الحَمْدُ لِلَّهِ', translit: 'Al-ḥamdu lillāh', id: 'Segala puji bagi Allah' },
      { ar: 'بِخَيْرٍ وَعَافِيَةٍ', translit: 'Bi-khayrin wa-ʿāfiyah', id: 'Baik dan sehat afiat' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Arti dari ungkapan "بِخَيْرٍ وَعَافِيَةٍ" adalah...',
        options: [
          { text: 'Baik dan sehat afiat', isCorrect: true, feedback: 'Tepat sekali!' },
          { text: 'Sampai berjumpa lagi', isCorrect: false, feedback: 'Itu arti dari Ila al-liqa\'.' }
        ]
      }
    ]
  },

  // HWR-L1-02: Kesantunan, Izin & Syukur (عِبَارَات الشُّكْر وَالِاعْتِذَار)
  'HWR-L1-02': {
    explanation: {
      conceptTitle: 'Etika Kesantunan: Izin, Syukur & Maaf',
      overview: 'Bahasa Arab kaya dengan frasa kesantunan seperti مِنْ فَضْلِكَ (mohon kebaikanmu) dan لَوْ سَمَحْتَ (jika Anda berkenan).',
      rules: [
        {
          title: 'Meminta Tolong Santun',
          explanation: 'Awali permintaan bantuan dengan مِنْ فَضْلِكَ (min faḍlika) atau لَوْ سَمَحْتَ (law samaḥta).',
          exampleAr: 'أَعْطِنِي المَاءَ مِنْ فَضْلِكَ',
          exampleTranslit: 'Aʿṭinī l-māʾa min faḍlik',
          exampleId: 'Minta air dengan santun'
        },
        {
          title: 'Meminta Maaf',
          explanation: 'Gunakan عَفْوًا (ʿafwan) untuk permisi/maaf ringan, atau أَنَا آسِفٌ (anā āsifun) untuk permohonan maaf sungguh-sungguh.',
          exampleAr: 'عَفْوًا، هَلْ لِي بِسُؤَالٍ؟',
          exampleTranslit: 'ʿAfwan, hal lī bi-suʾāl?',
          exampleId: 'Permisi bertanya'
        }
      ],
      hudhudTips: 'Ucapkan "Min fadhlika" di setiap awal permintaan agar hatimu dan lawan bicaramu dinaungi kelembutan!'
    },
    highlightVocab: [
      { ar: 'مِنْ فَضْلِكَ', translit: 'Min faḍlika', id: 'Tolong / mohon kebaikanmu' },
      { ar: 'لَوْ سَمَحْتَ', translit: 'Law samaḥta', id: 'Jika Anda berkenan' },
      { ar: 'شُكْرًا جَزِيلًا', translit: 'Syukran jazīlan', id: 'Terima kasih banyak' },
      { ar: 'عَفْوًا', translit: 'ʿAfwan', id: 'Sama-sama / permisi' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Frasa yang diucapkan sebelum meminta bantuan kepada orang lain adalah...',
        options: [
          { text: 'مِنْ فَضْلِكَ (Min faḍlika)', isCorrect: true, feedback: 'Benar! Menunjukkan kerendahan hati dan adab tinggi.' },
          { text: 'مَعَ السَّلَامَةِ (Maʿa s-salāmah)', isCorrect: false, feedback: 'Itu ucapan pamit saat berpisah.' }
        ]
      }
    ]
  },

  // HWR-L1-03: Asal Negara & Kebangsaan (الجِنْسِيَّة وَالبَلَد)
  'HWR-L1-03': {
    explanation: {
      conceptTitle: 'Menyatakan Asal Negara & Kebangsaan',
      overview: 'Untuk menjelaskan asal negara, gunakan preposisi مِنْ (min). Untuk kebangsaan, tambahkan Ya Nisbah (ـِيّ / ـِيَّة).',
      rules: [
        {
          title: 'Asal Negara',
          explanation: 'أَنَا مِنْ إِنْدُونِيسِيَا (Anā min Indūnīsiyā) = Saya dari Indonesia.',
          exampleAr: 'مِنْ أَيْنَ أَنْتَ؟ — أَنَا مِنْ إِنْدُونِيسِيَا',
          exampleTranslit: 'Min ayna anta? — Anā min Indūnīsiyā',
          exampleId: 'Menyebut negara asal'
        },
        {
          title: 'Bentuk Kebangsaan (Ya Nisbah)',
          explanation: 'Tambahkan Ya bertasydid: إِنْدُونِيسِيٌّ (pria) atau إِنْدُونِيسِيَّةٌ (wanita).',
          exampleAr: 'أَنَا إِنْدُونِيسِيٌّ، وَأَنْتَ سُعُودِيٌّ',
          exampleTranslit: 'Anā Indūnīsiyyun, wa-anta Saʿūdiyy',
          exampleId: 'Kebangsaan ber-Ya Nisbah'
        }
      ],
      hudhudTips: 'Jika ada kata "Min", sebut nama negaranya (Min Indunisiya). Jika tanpa "Min", sebut kebangsaannya (Ana Indunisiyy)!'
    },
    highlightVocab: [
      { ar: 'مِنْ أَيْنَ أَنْتَ؟', translit: 'Min ayna anta?', id: 'Dari mana asalmu?' },
      { ar: 'أَنَا مِنْ...', translit: 'Anā min...', id: 'Saya berasal dari...' },
      { ar: 'إِنْدُونِيسِيٌّ', translit: 'Indūnīsiyy', id: 'Orang Indonesia (pria)' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Kalimat manakah yang menyatakan: "Saya berasal dari Indonesia"?',
        options: [
          { text: 'أَنَا مِنْ إِنْدُونِيسِيَا (Anā min Indūnīsiyā)', isCorrect: true, feedback: 'Mumtaz! Menggunakan huruf jar min.' },
          { text: 'أَيْنَ إِنْدُونِيسِيَا؟ (Ayna Indūnīsiyā?)', isCorrect: false, feedback: 'Itu pertanyaan: Di mana Indonesia?' }
        ]
      }
    ]
  },

  // HWR-L1-04: Pekerjaan & Profesi Sehari-hari (المِهْنَة وَالعَمَل)
  'HWR-L1-04': {
    explanation: {
      conceptTitle: 'Tanya Jawab Profesi & Aktivitas Sehari-hari',
      overview: 'Pertanyaan seputar profesi menggunakan مَاذَا تَعْمَلُ؟ (Apa pekerjaanmu?) atau مَا مِهْنَتُكَ؟.',
      rules: [
        {
          title: 'Menjawab Profesi',
          explanation: 'Cukup gunakan kata ganti أَنَا diikuti nama profesinya: طَالِبٌ (pelajar), مُدَرِّسٌ (guru), طَبِيبٌ (dokter).',
          exampleAr: 'مَاذَا تَعْمَلُ؟ — أَنَا مُدَرِّسُ اللُّغَةِ العَرَبِيَّةِ',
          exampleTranslit: 'Mādhā taʿmalu? — Anā mudarrisu l-lughah',
          exampleId: 'Menyebut profesi guru'
        }
      ],
      hudhudTips: 'Jika perempuan, tambahkan ta marbuthah: Mudarrisatun (guru wanita), Thabiibatun (dokter wanita)!'
    },
    highlightVocab: [
      { ar: 'مَاذَا تَعْمَلُ؟', translit: 'Mādhā taʿmalu?', id: 'Apa pekerjaanmu?' },
      { ar: 'طَالِبٌ', translit: 'Ṭālib', id: 'Pelajar / mahasiswa' },
      { ar: 'مُدَرِّسٌ', translit: 'Mudarris', id: 'Guru / pengajar' },
      { ar: 'طَبِيبٌ', translit: 'Ṭabīb', id: 'Dokter' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Seorang dokter perempuan menyebut dirinya dalam bahasa Arab sebagai...',
        options: [
          { text: 'أَنَا طَبِيبَةٌ (Anā ṭabībah)', isCorrect: true, feedback: 'Benar! Memakai ta marbuthah untuk muannats.' },
          { text: 'أَنَا طَبِيبٌ (Anā ṭabīb)', isCorrect: false, feedback: 'Thabiib tanpa ta marbuthah adalah untuk pria.' }
        ]
      }
    ]
  },

  // HWR-L2-01: Transaksi di Pasar Tradisional (التَّسَوُّق فِي السُّوق)
  'HWR-L2-01': {
    explanation: {
      conceptTitle: 'Seni Jual-Beli di Pasar: Harga & Negosiasi',
      overview: 'Belanja di pasar Arab penuh kehangatan tawar-menawar santun. Menanyakan harga dimulai dengan بِكَمْ (bikam).',
      rules: [
        {
          title: 'Menanyakan Harga',
          explanation: 'بِكَمْ هٰذَا؟ (Bikam hādhā? - Berapa harga barang ini?), dijawab: هٰذَا بِعَشَرَةِ دَنَانِيرَ.',
          exampleAr: 'بِكَمْ كِيلُو التَّمْرِ؟ — بِخَمْسَةِ دَنَانِيرَ',
          exampleTranslit: 'Bikam kīlū t-tamr? — Bi-khamsati danānīr',
          exampleId: 'Tanya harga kurma'
        },
        {
          title: 'Tawar-Menawar Santun',
          explanation: 'Jika harga dirasa tinggi: هٰذَا غَالٍ قَلِيلًا، هَلْ تُخَفِّضُ؟ (Ini agak mahal, bisakah dikurangi harganya?).',
          exampleAr: 'هَلْ تُخَفِّضُ السِّعْرَ مِنْ فَضْلِكَ؟',
          exampleTranslit: 'Hal tukhaffiḍu s-siʿra min faḍlik?',
          exampleId: 'Minta diskon ramah'
        }
      ],
      hudhudTips: 'Ucapkan "Baarakallaahu fi tijaratika" (Semoga Allah berkahi tokomu) kepada penjual pasar agar tercipta silaturahmi berkah!'
    },
    highlightVocab: [
      { ar: 'بِكَمْ هٰذَا؟', translit: 'Bikam hādhā?', id: 'Berapa harga ini?' },
      { ar: 'غَالٍ', translit: 'Ghālin', id: 'Mahal' },
      { ar: 'رَخِيصٌ', translit: 'Rakhīṣ', id: 'Murah' },
      { ar: 'تَمْرٌ', translit: 'Tamr', id: 'Kurma manis' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Kata tanya manakah yang digunakan untuk menanyakan harga suatu barang?',
        options: [
          { text: 'بِكَمْ؟ (Bikam?)', isCorrect: true, feedback: 'Mumtaz! Bikam artinya berapa harganya.' },
          { text: 'أَيْنَ؟ (Ayna?)', isCorrect: false, feedback: 'Ayna artinya di mana.' }
        ]
      }
    ]
  },

  // HWR-L2-02: Pemesanan Hidangan di Restoran & Kafe (فِي المَطْعَم وَالمَقْهَى)
  'HWR-L2-02': {
    explanation: {
      conceptTitle: 'Adab Memesan Kuliner & Membayar Tagihan',
      overview: 'Di kedai Kampung Hiwar, pengunjung memesan hidangan dengan meminta buku menu (قَائِمَةُ الطَّعَامِ) dan meminta nota (الحِسَابُ).',
      rules: [
        {
          title: 'Meminta Menu',
          explanation: 'أَيْنَ قَائِمَةُ الطَّعَامِ مِنْ فَضْلِكَ؟ (Di mana daftar hidangannya tolong?).',
          exampleAr: 'أُرِيدُ شَايًا بِالنَّعْنَاعِ وَرَغِيفَ خُبْزٍ',
          exampleTranslit: 'Urīdu syāyan bi-n-naʿnāʿi wa-raghīfa khubz',
          exampleId: 'Pesan teh mint & roti'
        },
        {
          title: 'Meminta Tagihan',
          explanation: 'الحِسَابُ لَوْ سَمَحْتَ (Al-ḥisābu law samaḥta - Minta tagihannya jika berkenan). Pelayan menjawab: هَنِيئًا مَرِيئًا (Selamat menikmati).',
          exampleAr: 'الحِسَابُ لَوْ سَمَحْتَ ⟷ هَنِيئًا مَرِيئًا',
          exampleTranslit: 'Al-ḥisābu law samaḥta ⟷ Hanīʾan marīʾan',
          exampleId: 'Doa kenikmatan makanan'
        }
      ],
      hudhudTips: 'Ucapkan "Hanī\'an marī\'an" saat melihat temanmu makan minum nikmat, maknanya: semoga makanan itu berkah menyehatkan!'
    },
    highlightVocab: [
      { ar: 'قَائِمَةُ الطَّعَامِ', translit: 'Qāʾimatu ṭ-ṭaʿām', id: 'Daftar menu makanan' },
      { ar: 'شَايٌ بِالنَّعْنَاعِ', translit: 'Syāy bi-n-naʿnāʿ', id: 'Teh mint hangat' },
      { ar: 'الحِسَابُ', translit: 'Al-ḥisāb', id: 'Nota / tagihan bayar' },
      { ar: 'هَنِيئًا مَرِيئًا', translit: 'Hanīʾan marīʾan', id: 'Selamat menikmati berkah' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Bagaimana cara meminta nota tagihan kepada pelayan kedai secara sopan?',
        options: [
          { text: 'الحِسَابُ لَوْ سَمَحْتَ (Al-ḥisābu law samaḥta)', isCorrect: true, feedback: 'Benar sekali! Sangat santun dan ringkas.' },
          { text: 'أَيْنَ المَسْجِدُ؟ (Ayna l-masjid?)', isCorrect: false, feedback: 'Itu pertanyaan arah masjid.' }
        ]
      }
    ]
  },

  // HWR-L2-03: Navigasi Arah & Landmark Kota (السُّؤَال عَنِ الِاتِّجَاهَات)
  'HWR-L2-03': {
    explanation: {
      conceptTitle: 'Petunjuk Arah Jalan & Lokasi Tempat Umum',
      overview: 'Saat tersesat atau mencari fasilitas umum kota, gunakan kata tanya أَيْنَ (ayna) dan pahami kompas belokan arah.',
      rules: [
        {
          title: 'Arah Pokok Navigasi',
          explanation: 'اليَمِين (kanan), اليَسَار (kiri), الأَمَام (depan), الخَلْف (belakang).',
          exampleAr: 'اِتَّجِهْ إِلَى اليَمِينِ ثُمَّ سِرْ أَمَامًا',
          exampleTranslit: 'Ittajih ilā l-yamīn thumma sir amāmā',
          exampleId: 'Belok kanan lalu lurus'
        }
      ],
      hudhudTips: 'Ittajih = beloklah / menghadaplah. Ilal yamin = ke kanan. Ilal yasar = ke kiri. Amaman = lurus terus!'
    },
    highlightVocab: [
      { ar: 'أَيْنَ المَسْجِدُ؟', translit: 'Ayna l-masjid?', id: 'Di mana masjid?' },
      { ar: 'إِلَى اليَمِينِ', translit: 'Ilā l-yamīn', id: 'Ke arah kanan' },
      { ar: 'إِلَى اليَسَارِ', translit: 'Ilā l-yasār', id: 'Ke arah kiri' },
      { ar: 'أَمَامًا', translit: 'Amāman', id: 'Lurus ke depan' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Arti dari frasa petunjuk arah "اِتَّجِهْ إِلَى اليَمِينِ" adalah...',
        options: [
          { text: 'Beloklah ke kanan', isCorrect: true, feedback: 'Tepat sekali!' },
          { text: 'Berhentilah di sini', isCorrect: false, feedback: 'Bukan, itu qif hunā.' }
        ]
      }
    ]
  },

  // HWR-L2-04: Silaturahmi Keluarga & Keramahan Tamu (حِوَار الأُسْرَة وَالضِّيَافَة)
  'HWR-L2-04': {
    explanation: {
      conceptTitle: 'Memperkenalkan Anggota Keluarga & Menerima Tamu',
      overview: 'Memuliakan tamu (Ikrāmuḍ-Ḍayf) adalah ajaran mulia Islam. Sambut tamu dengan senyuman dan kalimat sambutan hangat.',
      rules: [
        {
          title: 'Memperkenalkan Kerabat',
          explanation: 'هٰذَا أَبِي (ini ayahku), هٰذِهِ أُمِّي (ini ibuku), هٰذَا أَخِي (ini saudaraku).',
          exampleAr: 'هٰذَا أَبِي وَهُوَ مُهَنْدِسٌ',
          exampleTranslit: 'Hādhā abī wa-huwa muhandis',
          exampleId: 'Perkenalkan ayah'
        },
        {
          title: 'Mempersilakan Tamu Masuk',
          explanation: 'تَفَضَّلُوا بِالدُّخُولِ (Tafaḍḍalū bi-d-dukhūl) = Silakan masuk ke dalam rumah.',
          exampleAr: 'أَهْلًا وَسَهْلًا، تَفَضَّلُوا بِالدُّخُولِ!',
          exampleTranslit: 'Ahlan wa sahlan, tafaḍḍalū bi-d-dukhūl!',
          exampleId: 'Sambut tamu berkah'
        }
      ],
      hudhudTips: 'Keluarga dalam bahasa Arab: Abī (ayahku), Ummī (ibuku), Akhī (saudaraku), Ukhtī (saudariku)!'
    },
    highlightVocab: [
      { ar: 'هٰذَا أَبِي', translit: 'Hādhā abī', id: 'Ini ayahku' },
      { ar: 'هٰذِهِ أُمِّي', translit: 'Hādhihi ummī', id: 'Ini ibuku' },
      { ar: 'تَفَضَّلُوا', translit: 'Tafaḍḍalū', id: 'Silakan (jamak)' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Kalimat yang santun untuk mempersilakan tamu masuk ke ruang tamu adalah...',
        options: [
          { text: 'تَفَضَّلُوا بِالدُّخُولِ (Tafaḍḍalū bi-d-dukhūl)', isCorrect: true, feedback: 'Mumtaz! Adab bertamu islami yang indah.' },
          { text: 'اِتَّجِهْ إِلَى اليَسَارِ (Ittajih ilal yasar)', isCorrect: false, feedback: 'Itu petunjuk belok ke kiri.' }
        ]
      }
    ]
  },

  // HWR-L3-01: Konsultasi Medis di Klinik / RS (فِي العِيَادَة وَالمُسْتَشْفَى)
  'HWR-L3-01': {
    explanation: {
      conceptTitle: 'Komunikasi Medis: Keluhan Gejala & Doa Kesembuhan',
      overview: 'Saat berkonsultasi dengan dokter, pasien menerangkan letak rasa sakit dengan fi\'il أَشْعُرُ بِـ (saya merasakan...) dan dokter mendoakan kesembuhan.',
      rules: [
        {
          title: 'Mengutarakan Gejala',
          explanation: 'أَشْعُرُ بِأَلَمٍ فِي رَأْسِي (Saya merasa sakit di kepala), حَرَارَةٌ مُرْتَفِعَةٌ (demam panas).',
          exampleAr: 'مِمَّ تَشْكُو؟ — أَشْعُرُ بِأَلَمٍ حَادٍّ فِي بَطْنِي',
          exampleTranslit: 'Mimma tasykū? — Asyʿuru bi-alamin ḥāddin fī baṭnī',
          exampleId: 'Keluhan sakit perut'
        },
        {
          title: 'Doa Menjenguk Orang Sakit',
          explanation: 'شَفَاكَ اللَّهُ طَهُورٌ إِنْ شَاءَ اللَّهُ (Semoga Allah menyembuhkanmu, penyucian dosa insya Allah).',
          exampleAr: 'لَا بَأْسَ طَهُورٌ إِنْ شَاءَ اللَّهُ',
          exampleTranslit: 'Lā baʾsa ṭahūrun in syāʾa Llāh',
          exampleId: 'Sunnah doa orang sakit'
        }
      ],
      hudhudTips: 'Ucapkan "Lā ba\'sa thahūrun in syā\'allāh" kepada siapa pun yang sedang sakit, agar mereka bersemangat dan dinaungi ketenangan batin!'
    },
    highlightVocab: [
      { ar: 'أَشْعُرُ بِأَلَمٍ', translit: 'Asyʿuru bi-alam', id: 'Saya merasakan sakit' },
      { ar: 'حَرَارَةٌ', translit: 'Ḥarārah', id: 'Demam / suhu panas' },
      { ar: 'شَفَاكَ اللَّهُ', translit: 'Syafāka Llāh', id: 'Semoga Allah sembuhkanmu' },
      { ar: 'دَوَاءٌ', translit: 'Dawāʾ', id: 'Obat penawar' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Doa islami yang disunnahkan saat menjenguk orang sakit adalah...',
        options: [
          { text: 'لَا بَأْسَ طَهُورٌ إِنْ شَاءَ اللَّهُ (Lā baʾsa ṭahūrun)', isCorrect: true, feedback: 'Mumtaz! Mengandung optimisme kesembuhan dan pengampunan dosa.' },
          { text: 'رِحْلَةً سَعِيدَةً (Riḥlatan saʿīdah)', isCorrect: false, feedback: 'Itu ucapan selamat bepergian safar.' }
        ]
      }
    ]
  },

  // HWR-L3-02: Tiket, Bandara & Penerbangan (فِي المَطَار وَحَجْزِ السَّفَر)
  'HWR-L3-02': {
    explanation: {
      conceptTitle: 'Prosedur Bandara: Paspor, Boarding Pass & Terminal',
      overview: 'Di bandara internasional dunia Arab, percakapan berpusat pada penyerahan paspor (جَوَازُ السَّفَرِ) dan mencari gerbang keberangkatan (بَوَّابَةُ الصُّعُودِ).',
      rules: [
        {
          title: 'Dokumen Perjalanan',
          explanation: 'جَوَازُ السَّفَرِ (paspor), تَذْكِرَةُ الطَّائِرَةِ (tiket pesawat), بِطَاقَةُ الصُّعُودِ (boarding pass).',
          exampleAr: 'أَيْنَ بَوَّابَةُ الصُّعُودِ إِلَى الطَّائِرَةِ؟',
          exampleTranslit: 'Ayna bawwābatu ṣ-ṣuʿūdi ilā ṭ-ṭāʾirah?',
          exampleId: 'Tanya gerbang boarding'
        },
        {
          title: 'Ucapan Keberangkatan',
          explanation: 'رِحْلَةً سَعِيدَةً (selamat menikmati penerbangan), فِي أَمَانِ اللَّهِ وَحِفْظِهِ.',
          exampleAr: 'رِحْلَةً سَعِيدَةً وَمُبَارَكَةً!',
          exampleTranslit: 'Riḥlatan saʿīdatan wa-mubārakah!',
          exampleId: 'Doa safar mabrur'
        }
      ],
      hudhudTips: 'Mathar = bandara. Tha\'irah = pesawat terbang. Jawazus safar = paspor!'
    },
    highlightVocab: [
      { ar: 'مَطَارٌ', translit: 'Maṭār', id: 'Bandara udara' },
      { ar: 'جَوَازُ السَّفَرِ', translit: 'Jawāzu s-safar', id: 'Buku paspor' },
      { ar: 'بَوَّابَةُ الصُّعُودِ', translit: 'Bawwābatu ṣ-ṣuʿūd', id: 'Gerbang boarding' },
      { ar: 'رِحْلَةٌ سَعِيدَةٌ', translit: 'Riḥlatun saʿīdah', id: 'Penerbangan menyenangkan' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Bahasa Arab dari dokumen resmi "Paspor" adalah...',
        options: [
          { text: 'جَوَازُ السَّفَرِ (Jawāzu s-safar)', isCorrect: true, feedback: 'Benar sekali!' },
          { text: 'قَائِمَةُ الطَّعَامِ (Qāʾimatu ṭ-ṭaʿām)', isCorrect: false, feedback: 'Itu daftar menu makanan restoran.' }
        ]
      }
    ]
  },

  // HWR-L3-03: Peminjaman Buku di Perpustakaan (فِي المَكْتَبَة وَالبَحْثِ العِلْمِي)
  'HWR-L3-03': {
    explanation: {
      conceptTitle: 'Dialog Literasi: Katalog Perpustakaan & Peminjaman Kitab',
      overview: 'Perpustakaan (المَكْتَبَةُ) adalah mercusuar keilmuan. Penuntut ilmu bertanya letak kitab kepada pustakawan (أَمِينُ المَكْتَبَةِ).',
      rules: [
        {
          title: 'Mencari Judul Kitab',
          explanation: 'أَبْحَثُ عَنْ كِتَابِ... (Saya mencari kitab...). Pustakawan menunjuk rak: فِي الرَّفِّ الثَّالِثِ (di rak ketiga).',
          exampleAr: 'أَبْحَثُ عَنْ مُعْجَمِ لِسَانِ العَرَبِ فِي الفِهْرِسِ',
          exampleTranslit: 'Abḥathu ʿan muʿjami Lisāni l-ʿArab fī l-fihris',
          exampleId: 'Cari kamus di katalog'
        },
        {
          title: 'Prosedur Peminjaman',
          explanation: 'هَلْ يُمْكِنُنِي اسْتِعَارَةُ هٰذَا الكِتَابِ؟ (Bisakah saya meminjam buku ini pulang?).',
          exampleAr: 'تَفَضَّلْ بِطَاقَةَ الاسْتِعَارَةِ لِلتَّسْجِيلِ',
          exampleTranslit: 'Tafaḍḍal biṭāqata l-istiʿārah li-t-tasjīl',
          exampleId: 'Registrasi pinjam buku'
        }
      ],
      hudhudTips: 'Kata kunci: Isti\'arah = peminjaman. Fihris = katalog / indeks pencarian buku!'
    },
    highlightVocab: [
      { ar: 'مَكْتَبَةٌ', translit: 'Maktabah', id: 'Perpustakaan' },
      { ar: 'أَمِينُ المَكْتَبَةِ', translit: 'Amīnu l-maktabah', id: 'Pustakawan' },
      { ar: 'فِهْرِسٌ', translit: 'Fihris', id: 'Katalog / indeks' },
      { ar: 'اسْتِعَارَةٌ', translit: 'Istiʿārah', id: 'Peminjaman buku' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Kalimat manakah yang bermakna "Bisakah saya meminjam kitab ini?"',
        options: [
          { text: 'هَلْ يُمْكِنُنِي اسْتِعَارَةُ هٰذَا الكِتَابِ؟', isCorrect: true, feedback: 'Mumtaz! Menggunakan kata isti\'arah.' },
          { text: 'بِكَمْ هٰذَا الكِتَابُ؟', isCorrect: false, feedback: 'Itu bertanya harga untuk membeli buku.' }
        ]
      }
    ]
  },

  // HWR-L3-04: Pengaturan Jadwal & Janji Temu (تَحْدِيدُ المَوْعِد وَالوَقْت)
  'HWR-L3-04': {
    explanation: {
      conceptTitle: 'Manajemen Janji Temu & Ketepatan Waktu',
      overview: 'Menepati janji adalah karakter kehormatan seorang muslim. Pertanyaan janji temu dimulai dengan مَتَى نَلْتَقِي؟ (Kapan kita berjumpa?).',
      rules: [
        {
          title: 'Menentukan Waktu',
          explanation: 'غَدًا بَعْدَ صَلَاةِ العَصْرِ (besok ba\'da Ashar), إِنْ شَاءَ اللَّهُ (dengan izin Allah).',
          exampleAr: 'مَتَى المَوْعِدُ؟ — غَدًا فِي السَّاعَةِ الرَّابِعَةِ مَسَاءً',
          exampleTranslit: 'Matā l-mawʿid? — Ghadan fī s-sāʿati r-rābiʿati masāʾan',
          exampleId: 'Janji temu jam 4 sore'
        }
      ],
      hudhudTips: 'Selalu sandingkan janji perjumpaan dengan ucapan "In sya Allah", sebab takdir berada di tangan Sang Pencipta!'
    },
    highlightVocab: [
      { ar: 'مَوْعِدٌ', translit: 'Mawʿid', id: 'Janji temu' },
      { ar: 'مَتَى نَلْتَقِي؟', translit: 'Matā naltaqī?', id: 'Kapan kita bertemu?' },
      { ar: 'غَدًا', translit: 'Ghadan', id: 'Besok' },
      { ar: 'إِنْ شَاءَ اللَّهُ', translit: 'In syāʾa Llāh', id: 'Jika Allah menghendaki' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Arti dari kalimat "مَتَى نَلْتَقِي غَدًا؟" adalah...',
        options: [
          { text: 'Kapan kita bertemu besok?', isCorrect: true, feedback: 'Benar sekali!' },
          { text: 'Di mana rumahmu berada?', isCorrect: false, feedback: 'Itu pertanyaan letak tempat tinggal.' }
        ]
      }
    ]
  },

  // HWR-L4-01: Diskusi Halaqah & Argumen Santun (إِبْدَاء الرَّأْي وَالحِوَار الفِكْرِي)
  'HWR-L4-01': {
    explanation: {
      conceptTitle: 'Adab Halaqah Ilmiah: Mengemukakan & Menghargai Opini',
      overview: 'Dalam majelis ilmu tingkat menengah, penuntut ilmu belajar menyampaikan pandangan pribadi secara berbobot dan menghargai sudut pandang berbeda.',
      rules: [
        {
          title: 'Menyampaikan Pendapat',
          explanation: 'فِي رَأْيِي الشَّخْصِيِّ... (Menurut pandangan pribadi saya...).',
          exampleAr: 'فِي رَأْيِي هٰذَا الحَلُّ هُوَ الأَنْسَبُ وَالأَنْفَعُ',
          exampleTranslit: 'Fī raʾyī hādhā l-ḥallu huwa l-ansabu wa-l-anfaʿ',
          exampleId: 'Sampaikan usul konstruktif'
        },
        {
          title: 'Menyetujui & Menyangkal Santun',
          explanation: 'أُوَافِقُكَ الرَّأْيَ (Saya sepakat denganmu), atau أَسْمَحُ لِنَفْسِي بِمُخَالَفَةِ هٰذِهِ النُّقْطَةِ (Izinkan saya mengusulkan alternatif lain).',
          exampleAr: 'أُوَافِقُكَ الرَّأْيَ تَمَامًا فِي هٰذِهِ النُّقْطَةِ',
          exampleTranslit: 'Uwāfiquka r-raʾya tamāman fī hādhihi n-nuqṭah',
          exampleId: 'Konfirmasi kesepakatan'
        }
      ],
      hudhudTips: 'Gunakan frasa "Uwafiquka ar-ra\'y lakin..." (Saya sepakat tapi...) saat ingin memberi masukan tambahan tanpa mematahkan hati pembicara!'
    },
    highlightVocab: [
      { ar: 'فِي رَأْيِي', translit: 'Fī raʾyī', id: 'Menurut pandanganku' },
      { ar: 'أُوَافِقُكَ', translit: 'Uwāfiquka', id: 'Saya sepakat denganmu' },
      { ar: 'حُجَّةٌ', translit: 'Ḥujjah', id: 'Argumen / dalil' },
      { ar: 'حِوَارٌ فِكْرِيٌّ', translit: 'Ḥiwārun fikriyy', id: 'Diskusi intelektual' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Ungkapan yang tepat untuk mengawali opini pribadi dalam forum diskusi adalah...',
        options: [
          { text: 'فِي رَأْيِي (Fī raʾyī)', isCorrect: true, feedback: 'Tepat sekali! Artinya menurut pandanganku.' },
          { text: 'بِكَمْ هٰذَا؟ (Bikam hādhā?)', isCorrect: false, feedback: 'Itu pertanyaan harga di pasar.' }
        ]
      }
    ]
  },

  // HWR-L4-02: Wawancara Kerja & Keahlian Profesional (المُقَابَلَة الشَّخْصِيَّة)
  'HWR-L4-02': {
    explanation: {
      conceptTitle: 'Wawancara Profesional: Memaparkan Kompetensi & Prestasi',
      overview: 'Dalam sesi wawancara formal (المُقَابَلَةُ الشَّخْصِيَّةُ), kandidat memaparkan latar belakang pendidikan dan keterampilan bahasa secara percaya diri.',
      rules: [
        {
          title: 'Memaparkan Pengalaman',
          explanation: 'تَخَرَّجْتُ فِي جَامِعَةِ... (Saya lulus dari Universitas...), أَمْتَلِكُ خِبْرَةً فِي... (Saya berpengalaman dalam...).',
          exampleAr: 'أَمْتَلِكُ مَهَارَاتٍ مُتَقَدِّمَةً فِي التَّعْلِيمِ وَالتَّرْجَمَةِ',
          exampleTranslit: 'Amtaliku mahārātin mutaqaddimatan fī t-taʿlīm',
          exampleId: 'Sebutkan skill unggulan'
        }
      ],
      hudhudTips: 'Jawablah pertanyaan wawancara dengan intonasi jelas, tatap mata pewawancara, dan gunakan kata kerja lampau untuk riwayat studi!'
    },
    highlightVocab: [
      { ar: 'مُقَابَلَةٌ شَخْصِيَّةٌ', translit: 'Muqābalatun syakhṣiyyah', id: 'Wawancara kerja' },
      { ar: 'خِبْرَةٌ', translit: 'Khibrah', id: 'Pengalaman kerja' },
      { ar: 'مَهَارَاتٌ', translit: 'Mahārāt', id: 'Keterampilan / keahlian' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Arti dari kata "خِبْرَةٌ" dalam konteks profil profesional adalah...',
        options: [
          { text: 'Pengalaman kerja', isCorrect: true, feedback: 'Mumtaz!' },
          { text: 'Biaya perjalanan', isCorrect: false, feedback: 'Bukan, itu nafaqatus safar.' }
        ]
      }
    ]
  },

  // HWR-L4-03: Penyelesaian Masalah & Komplain Etis (حَلُّ المُشْكِلَات وَالشَّكَاوَى)
  'HWR-L4-03': {
    explanation: {
      conceptTitle: 'Komplain Pelanggan Santun & Solusi Win-Win',
      overview: 'Menghadapi kendala layanan (hotel, toko, pengiriman) diselesaikan dengan memaparkan data tanpa marah, serta permohonan maaf pihak penyedia.',
      rules: [
        {
          title: 'Menyampaikan Ketidaksesuaian',
          explanation: 'هُنَاكَ خَطَأٌ فِي الفَاتُورَةِ (Terdapat kekeliruan dalam faktur tagihan).',
          exampleAr: 'عَفْوًا، هٰذَا الطَّلَبُ يَخْتَلِفُ عَمَّا طَلَبْتُهُ',
          exampleTranslit: 'ʿAfwan, hādhā ṭ-ṭalabu yakhtalifu ʿammā ṭalabtuh',
          exampleId: 'Komplain santun barang salah'
        },
        {
          title: 'Respon Pelayanan yang Arif',
          explanation: 'نَعْتَذِرُ عَنِ الإِزْعَاجِ، وَسَنُعَالِجُ الأَمْرَ فَوْرًا (Kami mohon maaf dan akan perbaiki seketika).',
          exampleAr: 'حَقُّكَ عَلَيْنَا، سَنَقُومُ بِاسْتِبْدَالِهِ حَالًا',
          exampleTranslit: 'Ḥaqquka ʿalaynā, sanaqūmu bi-stibdālihi ḥālā',
          exampleId: 'Tanggung jawab pelayanan'
        }
      ],
      hudhudTips: 'Prinsip emas: "Khafdhul janah" (lemah lembut) dalam menyampaikan keluhan menghasilkan solusi berkah tercepat!'
    },
    highlightVocab: [
      { ar: 'خَطَأٌ', translit: 'Khaṭaʾ', id: 'Kesalahan / kekeliruan' },
      { ar: 'نَعْتَذِرُ', translit: 'Naʿtadhiru', id: 'Kami mohon maaf' },
      { ar: 'حَلٌّ مُتَوَازِنٌ', translit: 'Ḥallun mutawāzin', id: 'Solusi berimbang' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Bagaimana cara menyampaikan kekeliruan pesanan di restoran secara beradab?',
        options: [
          { text: 'عَفْوًا، هٰذَا الطَّلَبُ يَخْتَلِفُ عَمَّا طَلَبْتُهُ مِنْ فَضْلِكَ', isCorrect: true, feedback: 'Benar! Santun, jelas, dan tidak menyinggung perasaan pelayan.' },
          { text: 'لَا أُرِيدُ رُؤْيَتَكُمْ أَبَدًا', isCorrect: false, feedback: 'Itu kalimat kasar yang dilarang dalam etika Islam.' }
        ]
      }
    ]
  },

  // HWR-L4-04: Membicarakan Budaya, Tradisi & Hobi (الهِوَايَات وَالتَّقَالِيد)
  'HWR-L4-04': {
    explanation: {
      conceptTitle: 'Dialog Antarbudaya: Tradisi Idul Fitri & Kegemaran Seni',
      overview: 'Bercakap-cakap tentang tradisi hari raya dan hobi memperkaya wawasan peradaban dunia Islam dan mempererat tali ukhuwah.',
      rules: [
        {
          title: 'Menanyakan Hobi',
          explanation: 'مَا هِوَايَتُكَ المُفَضَّلَةُ؟ (Apa hobi favoritmu?). Jawaban: هِوَايَتِي القِرَاءَةُ وَالخَطُّ العَرَبِيُّ.',
          exampleAr: 'أُحِبُّ مُطَالَعَةَ التَّارِيخِ وَتَعَلُّمَ فُنُونِ الخَطِّ',
          exampleTranslit: 'Uḥibbu muṭālaʿata t-tārīkhi wa-taʿalluma l-khaṭṭ',
          exampleId: 'Sebutkan hobi kaligrafi'
        }
      ],
      hudhudTips: 'Hiwayah = hobi. Al-Qira\'ah = membaca. Al-Khaththul \'Arabiyy = seni kaligrafi Arab!'
    },
    highlightVocab: [
      { ar: 'هِوَايَةٌ', translit: 'Hiwāyah', id: 'Hobi / kegemaran' },
      { ar: 'تَقَالِيدُ', translit: 'Taqālīd', id: 'Tradisi warisan' },
      { ar: 'عِيدُ الفِطْرِ', translit: 'ʿĪdu l-fiṭr', id: 'Hari raya Idul Fitri' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Arti dari frasa "هِوَايَتِي القِرَاءَةُ" adalah...',
        options: [
          { text: 'Hobiku adalah membaca buku', isCorrect: true, feedback: 'Mumtaz!' },
          { text: 'Pekerjaanku adalah dokter', isCorrect: false, feedback: 'Bukan, itu mihnah.' }
        ]
      }
    ]
  },

  // HWR-L5-01: Diplomasi Lisan & Retorika Fashih (البَلَاغَة الحِوَارِيَّة وَالتَّفَاوُض)
  'HWR-L5-01': {
    explanation: {
      conceptTitle: 'Retorika Fashih & Negosiasi Tingkat Tinggi',
      overview: 'Tingkat mahir menguasai seni diplomasi lisan, gaya bahasa sastrawi tinggi (Balaghah), dan perumusan kesepakatan resmi.',
      rules: [
        {
          title: 'Sapaan Protokoler Diplomatik',
          explanation: 'سَعَادَةَ المُمَثِّلِ المُحْتَرَمِ (Yang mulia perwakilan terhormat), نَسْعَى لِتَحْقِيقِ تَفَاهُمٍ مُتَبَادَلٍ.',
          exampleAr: 'نَسْعَى لِلتَّوَصُّلِ إِلَى اتِّفَاقٍ مُتَوَازِنٍ يُرْضِي الطَّرَفَيْنِ',
          exampleTranslit: 'Nasʿā li-t-tawaṣṣul ilā ttifāqin mutawāzinin yurḍī ṭ-ṭarafayn',
          exampleId: 'Pernyataan diplomatik resmi'
        }
      ],
      hudhudTips: 'Pilih kata dengan teliti dan terukur, jeda bicara tenang, dan tekankan kepentingan bersama!'
    },
    highlightVocab: [
      { ar: 'دِبْلُومَاسِيَّةٌ', translit: 'Diblūmāsiyyah', id: 'Diplomasi resmi' },
      { ar: 'تَفَاوُضٌ', translit: 'Tafāwuḍ', id: 'Negosiasi perundingan' },
      { ar: 'مُذَكَّرَةُ تَفَاهُمٍ', translit: 'Mudhakkiratu tafāhum', id: 'Nota kesepahaman' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Ungkapan diplomatik "نَسْعَى لِاتِّفَاقٍ مُتَوَازِنٍ" bermakna...',
        options: [
          { text: 'Kami berikhtiar mencapai kesepakatan berimbang', isCorrect: true, feedback: 'Benar sekali!' },
          { text: 'Kami membatalkan pertemuan sepihak', isCorrect: false, feedback: 'Bukan, itu kebalikannya.' }
        ]
      }
    ]
  },

  // HWR-L5-02: Debat Akademik & Kritik Konstruktif (المُنَاظَرَة وَالنَّقْدُ البَنَّاء)
  'HWR-L5-02': {
    explanation: {
      conceptTitle: 'Dialektika Debat Ilmiah & Sanggahan Elegan',
      overview: 'Kematangan berdebat (Al-Munadharah) bukan untuk menjatuhkan lawan, melainkan menyingkap kebenaran dengan hujah rasional.',
      rules: [
        {
          title: 'Mengkritisi Premis Lawan',
          explanation: 'حُجَّتُكَ جَدِيرَةٌ بِالتَّأَمُّلِ، وَلٰكِنَّ الأَدِلَّةَ تُشِيرُ إِلَى خِلَافِ ذٰلِكَ.',
          exampleAr: 'نَحْتَرِمُ هٰذَا الطَّرْحَ لٰكِنْ نَقْتَرِحُ مُرَاجَعَةَ المَصَادِرِ',
          exampleTranslit: 'Naḥtarimu hādhā ṭ-ṭarḥa lākin naqtariḥu murājaʿata l-maṣādir',
          exampleId: 'Sanggahan elegan'
        }
      ],
      hudhudTips: 'Kritiklah argumennya, jangan pernah serang pribadinya. Itulah hakikat debat terpelajar!'
    },
    highlightVocab: [
      { ar: 'مُنَاظَرَةٌ', translit: 'Munāẓarah', id: 'Debat ilmiah' },
      { ar: 'نَقْدٌ بَنَّاءٌ', translit: 'Naqdun bannāʾ', id: 'Kritik konstruktif' },
      { ar: 'دَلِيلٌ قَاطِعٌ', translit: 'Dalīlun qāṭiʿ', id: 'Dalil bukti otentik' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Tujuan utama dari munadharah (debat ilmiah beradab) adalah...',
        options: [
          { text: 'Menyingkap kebenaran dengan hujah dan adab luhur', isCorrect: true, feedback: 'Mumtaz! Inilah esensi adabul bahts wal munadharah.' },
          { text: 'Mempermalukan lawan bicara di hadapan publik', isCorrect: false, feedback: 'Itu tercela dan bertentangan dengan adab Islam.' }
        ]
      }
    ]
  },

  // HWR-L5-03: Wawancara Media & Analisis Isu Publik (الحِوَار الصَّحَفِي وَالإِعْلَامِي)
  'HWR-L5-03': {
    explanation: {
      conceptTitle: 'Komunikasi Media: Juru Bicara & Analisis Isu Fusha',
      overview: 'Sebagai narasumber atau juru bicara media massa, pembicara merespons pertanyaan wartawan dengan bahasa baku Fusha jurnalistik.',
      rules: [
        {
          title: 'Pernyataan Pers Resmi',
          explanation: 'صَرَّحَ المَسْؤُولُ بِمَا يَلِي... (Pejabat terkait menyatakan hal berikut...).',
          exampleAr: 'تُؤَكِّدُ البَيَانَاتُ أَنَّ التَّعَاوُنَ سَيُؤْتِي ثِمَارَهُ قَرِيبًا',
          exampleTranslit: 'Tuʾakkidu l-bayānātu anna t-taʿāwuna sayuʾtī thimārahū qarībā',
          exampleId: 'Pernyataan optimisme pers'
        }
      ],
      hudhudTips: 'Berbicaralah dengan kalimat ringkas, padat makna, dan hindari kata yang multitafsir di depan mikrofon pers!'
    },
    highlightVocab: [
      { ar: 'حِوَارٌ صَحَفِيٌّ', translit: 'Ḥiwārun ṣaḥafiyy', id: 'Wawancara jurnalistik' },
      { ar: 'مُتَحَدِّثٌ رَسْمِيٌّ', translit: 'Mutaḥaddithun rasmiyy', id: 'Juru bicara resmi' },
      { ar: 'بَيَانٌ إِعْلَامِيٌّ', translit: 'Bayānun iʿlāmiyy', id: 'Pernyataan pers' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Sebutan bahasa Arab bagi seorang "Juru Bicara Resmi" adalah...',
        options: [
          { text: 'مُتَحَدِّثٌ رَسْمِيٌّ (Mutaḥaddithun rasmiyy)', isCorrect: true, feedback: 'Benar sekali!' },
          { text: 'طَالِبُ العِلْمِ (Ṭālibu l-ʿilm)', isCorrect: false, feedback: 'Itu penuntut ilmu / pelajar.' }
        ]
      }
    ]
  },

  // HWR-L5-04: Orasi Hikmah & Khutbah Wasiat (خُطَبُ الوَدَاع وَالمَوْعِظَة)
  'HWR-L5-04': {
    explanation: {
      conceptTitle: 'Khitabah Perpisahan: Wasiat Kebijaksanaan & Doa Majelis',
      overview: 'Puncak kemahiran percakapan adalah kemampuan menyampaikan wasiat nasihat yang menyentuh sanubari, merekatkan ukhuwah, dan menutup pertemuan dengan doa kaffarah.',
      rules: [
        {
          title: 'Wasiat Kebajikan',
          explanation: 'أُوصِيكُمْ وَنَفْسِي بِتَقْوَى اللَّهِ (Saya berwasiat kepada kalian dan diri saya untuk bertakwa kepada Allah).',
          exampleAr: 'أُوصِيكُمْ بِتَقْوَى اللَّهِ وَحُسْنِ الخُلُقِ وَصِدْقِ المَقَالِ',
          exampleTranslit: 'Ūṣīkum bi-taqwā Llāhi wa-ḥusni l-khuluqi wa-ṣidqi l-maqāl',
          exampleId: 'Wasiat takwa & akhlak'
        },
        {
          title: 'Doa Penutup Majelis',
          explanation: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا أَنْتَ، أَسْتَغْفِرُكَ وَأَتُوبُ إِلَيْكَ.',
          exampleAr: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ أَسْتَغْفِرُكَ وَأَتُوبُ إِلَيْكَ',
          exampleTranslit: 'Subḥānaka Allāhumma wa-biḥamdika...',
          exampleId: 'Kaffaratul Majelis'
        }
      ],
      hudhudTips: 'Tutuplah setiap majelis percakapan dengan doa Kaffaratul Majelis agar segala kekhilafan kata diampuni oleh Allah!'
    },
    highlightVocab: [
      { ar: 'مَوْعِظَةٌ', translit: 'Mawʿiẓah', id: 'Nasihat kebajikan' },
      { ar: 'وَصِيَّةٌ', translit: 'Waṣiyyah', id: 'Wasiat / amanah luhur' },
      { ar: 'حُسْنُ الخُلُقِ', translit: 'Ḥusnu l-khuluq', id: 'Akhlak mulia' },
      { ar: 'كَفَّارَةُ المَجْلِسِ', translit: 'Kaffāratu l-majlis', id: 'Doa penutup majelis' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Doa sunnah yang dibaca saat mengakhiri setiap perkumpulan atau majelis adalah...',
        options: [
          { text: 'دُعَاءُ كَفَّارَةِ المَجْلِسِ (Doa Kaffaratul Majelis)', isCorrect: true, feedback: 'Mumtaz! Menghapus dosa dan khilaf kata yang terjadi selama majelis.' },
          { text: 'دُعَاءُ النَّوْمِ (Doa sebelum tidur)', isCorrect: false, feedback: 'Itu dibaca saat hendak tidur malam.' }
        ]
      }
    ]
  },

  // 7. KTB-L1-01: Ejaan Ta Marbuthah (ـة / ة) vs Ta Maftuhah (ت)
  'KTB-L1-01': {
    explanation: {
      conceptTitle: 'Kaidah Imla\': Ta Marbuthah (ـة / ة) vs Ta Maftuhah (ت) vs Ha\' (ـه)',
      overview: 'Banyak pemula bingung kapan menulis Ta Terikat / Bulat (Ta Marbuthah ة), Ta Terbuka (Ta Maftuhah ت), dan Ha Dhamir (ـه). Kuncinya ada pada uji bunyi saat berhenti (waqaf) dan saat bersambung (washal).',
      rules: [
        {
          title: 'Uji Bunyi Waqaf (Berhenti)',
          explanation: 'Jika kamu mematikan huruf terakhir menjadi sukun: Jika bunyinya berubah menjadi "H" (ha), maka tulisannya pasti Ta Marbuthah (ة). Contoh: مَدْرَسَة (madrasah). Jika bunyinya tetap "T" saat dimatikan, maka tulisannya Ta Maftuhah (ت). Contoh: بَيْت (bait).',
          exampleAr: 'مَدْرَسَةٌ ⟷ مَدْرَسَهْ (dibaca H saat waqaf) | بَيْتٌ ⟷ بَيْتْ (tetap T)',
          exampleTranslit: 'Madrasatun -> Madrasah | Baitun -> Bait',
          exampleId: 'Trik membedakan paling ampuh'
        },
        {
          title: 'Perbedaan dengan Ha\' Dhamir (ـه / ه)',
          explanation: 'Ha\' dhamir (kata ganti "dia") berbunyi H baik saat waqaf maupun washal (keduanya H), dan TIDAK memakai dua titik. Contoh: كِتَابُهُ (kitābuhu saat washal, kitābuh saat waqaf).',
          exampleAr: 'كِتَابُهُ (tanpa titik, tetap bunyi H)',
          exampleTranslit: 'Kitābuhu',
          exampleId: 'Ha dhamir tanpa dua titik'
        }
      ],
      hudhudTips: 'Coba matikan kata itu di ujung lidahmu. Bunyi "H"? Tulis ة (Ta Marbuthah bertitik dua). Bunyi "T"? Tulis ت (Ta Terbuka). Tetap "H" saat berharakat? Tulis ه (Ha Dhamir tanpa titik)!'
    },
    highlightVocab: [
      { ar: 'مَدْرَسَةٌ', translit: 'Madrasatun', id: 'Sekolah (Ta Marbuthah - saat waqaf dibaca Madrasah)' },
      { ar: 'حَقِيبَةٌ', translit: 'Haqiibatun', id: 'Tas (Ta Marbuthah - saat waqaf dibaca Haqiibah)' },
      { ar: 'بَيْتٌ', translit: 'Baitun', id: 'Rumah (Ta Maftuhah terbuka - saat waqaf tetap Bait)' },
      { ar: 'بِنْتٌ', translit: 'Bintun', id: 'Anak perempuan (Ta Maftuhah terbuka)' },
      { ar: 'كِتَابُهُ', translit: 'Kitaabuhu', id: 'Bukunya (Ha dhamir tanpa titik)' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Bagaimana cara membedakan apakah kata diakhiri Ta Marbuthah (ة) atau Ta Terbuka (ت)?',
        options: [
          { text: 'Membacanya dengan sukun (berhenti): jika berubah menjadi bunyi "H", berarti Ta Marbuthah (ة)', isCorrect: true, feedback: 'Tepat sekali! Ini trik emas ilmu imla\'.' },
          { text: 'Melihat apakah katanya panjang atau pendek', isCorrect: false, feedback: 'Panjang kata tidak menentukan jenis huruf Ta.' }
        ]
      },
      {
        id: 'q2',
        question: 'Pilihlah ejaan yang BENAR untuk kata "Buku Catatan" (Kuraasah):',
        options: [
          { text: 'كُرَّاسَةٌ (dengan Ta Marbuthah bertitik dua)', isCorrect: true, feedback: 'Benar! Saat waqaf dibaca Kurraasah (bunyi H), jadi ditulis dengan Ta Marbuthah.' },
          { text: 'كُرَّاسَتٌ (dengan Ta Terbuka)', isCorrect: false, feedback: 'Salah, karena saat waqaf huruf ini berbunyi H, bukan T.' }
        ]
      }
    ]
  },

  // KTB-L0-01: 6 Huruf Pemutus Kiri (ا د ذ ر ز و)
  'KTB-L0-01': {
    explanation: {
      conceptTitle: 'Kaidah Emas: 6 Huruf Pemutus Kiri (Huruf Munfashilah)',
      overview: 'Dalam alfabet bahasa Arab, mayoritas huruf dapat menyambung ke kanan dan ke kiri. Namun ada 6 HURUF ISTIMEWA yang hanya mau disambung dari kanan, tetapi MENOLAK menyambung ke huruf di sebelah kirinya: Alif (ا), Dal (د), Dzal (ذ), Ra (ر), Zai (ز), dan Wawu (و).',
      rules: [
        {
          title: 'Hanya Menyambung dari Kanan',
          explanation: 'Huruf setelah ke-6 huruf ini HARUS ditulis dalam bentuk mandiri atau awal kata baru, tidak boleh ditarik garis sambung ke kiri.',
          exampleAr: 'بَـ + ا + بٌ = بَابٌ | وَ + رْ + دٌ = وَرْدٌ',
          exampleTranslit: 'Bābun | Wardun',
          exampleId: 'Alif, Waw, Ra tidak menyambung ke kiri'
        },
        {
          title: 'Jembatan Putus di Mercusuar',
          explanation: 'Ingat mantra Hudhud: "A-Da-Dza-Ro-Za-Wa" adalah 6 dermaga pemutus garis pena!',
          exampleAr: 'دَرَسَ (tiga-tiganya tidak bersambung: د - ر - س)',
          exampleTranslit: 'Darasa',
          exampleId: 'Semua huruf mandiri karena pemutus kiri'
        }
      ],
      hudhudTips: 'Tips Hudhud: Jika pena kamu menyentuh ا د ذ ر ز و, angkat penamu sejenak sebelum menulis huruf berikutnya!'
    },
    highlightVocab: [
      { ar: 'بَابٌ', translit: 'Bābun', id: 'Pintu (Alif menolak sambung ke Ba)' },
      { ar: 'وَرْدٌ', translit: 'Wardun', id: 'Bunga mawar (Wawu dan Ra pemutus kiri)' },
      { ar: 'دَرَسَ', translit: 'Darasa', id: 'Belajar (Dal dan Ra tidak menyambung ke kiri)' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Manakah kelompok huruf yang TIDAK BISA menyambung ke huruf setelahnya (ke sebelah kiri)?',
        options: [
          { text: 'ا، د، ذ، ر، ز، و (Alif, Dal, Dzal, Ra, Zai, Wawu)', isCorrect: true, feedback: 'Mumtaz! Keenam huruf ini adalah huruf munfashilah (pemutus kiri).' },
          { text: 'ب، ت، ث، ن، ي', isCorrect: false, feedback: 'Salah, huruf-huruf ini bisa menyambung ke kiri dan kanan.' }
        ]
      }
    ]
  },

  // KTB-L0-02: Bentuk Huruf Sambung Awal, Tengah, & Akhir
  'KTB-L0-02': {
    explanation: {
      conceptTitle: 'Kaidah Sambung Huruf: Posisi Awal, Tengah, dan Akhir Kata',
      overview: 'Huruf hijaiyah berubah bentuk tergantung posisinya dalam kata. Saat berada di awal (أَوَّل) atau tengah (وَسَط), badan atau ekor huruf biasanya dipotong agar pena bisa mengalir menyambung ke huruf berikutnya. Saat berada di akhir kata (آخِر), bentuk asli huruf dikembalikan secara utuh.',
      rules: [
        {
          title: 'Posisi Awal (بِـ / تَـ / نَـ / يـ)',
          explanation: 'Hanya ditulis kepala atau badannya saja dengan tarikan garis datar ke arah kiri menyambut huruf setelahnya.',
          exampleAr: 'بَـ + يْـ + تُ = بَيْتٌ',
          exampleTranslit: 'Baytun',
          exampleId: 'Ba di awal kata memotong mangkoknya'
        },
        {
          title: 'Posisi Tengah (ـبـ / ـجـ / ـعـ)',
          explanation: 'Memiliki dua lengan: satu lengan menyambung dari huruf sebelumnya dan satu lengan menyambung ke huruf sesudahnya.',
          exampleAr: 'مَـ + ـجْـ + ـلِـ + ـسٌ = مَجْلِسٌ',
          exampleTranslit: 'Majlisun',
          exampleId: 'Jim dan Lam di posisi tengah memiliki 2 lengan sambung'
        },
        {
          title: 'Posisi Akhir (ـب / ـج / ـم)',
          explanation: 'Ekor atau mangkok lekukan huruf ditulis kembali secara utuh menutup rangkaian kata.',
          exampleAr: 'قَـ + ـلَـ + ـمٌ = قَلَمٌ',
          exampleTranslit: 'Qalamun',
          exampleId: 'Mim di akhir kata kembali utuh dengan ekor turun ke bawah garis'
        }
      ],
      hudhudTips: 'Tips Hudhud: Bayangkan huruf sambung seperti gerbong kereta api di pelabuhan. Huruf awal membuka jalan, huruf tengah menyambungkan gerbong, dan huruf akhir menjadi gerbong penutup!'
    },
    highlightVocab: [
      { ar: 'بِـ', translit: 'Bi-', id: 'Bentuk huruf Ba di awal kata' },
      { ar: 'ـجـ', translit: '-j-', id: 'Bentuk huruf Jim di tengah kata' },
      { ar: 'ـم', translit: '-m', id: 'Bentuk huruf Mim di akhir kata' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Bagaimana bentuk huruf Mim ketika berada di akhir kata setelah huruf yang bersambung?',
        options: [
          { text: 'Memiliki lengan dari kanan dan ekornya menjulur turun ke bawah garis (ـم)', isCorrect: true, feedback: 'Tepat sekali! Huruf akhir mengembalikan bentuk ekor aslinya.' },
          { text: 'Bentuknya sama persis seperti di awal kata tanpa ekor', isCorrect: false, feedback: 'Salah, bentuk tanpa ekor hanya berlaku di posisi awal atau tengah.' }
        ]
      }
    ]
  },

  // KTB-L0-03: Goresan Gigi Huruf & Proporsi Khath Naskh
  'KTB-L0-03': {
    explanation: {
      conceptTitle: 'Estetika Khath Naskh: Gerigi Gigi & Mangkok Huruf',
      overview: 'Gaya tulisan Naskh adalah standar tulisan buku cetak dan mushaf Al-Qur\'an. Kunci kerapian naskh adalah proporsi: jumlah gerigi gigi (أسنان) dan kedalaman mangkok huruf (كأس) di atas atau di bawah garis dasar buku tulis.',
      rules: [
        {
          title: 'Gigi Huruf Sin & Syin (3 Gerigi)',
          explanation: 'Huruf Sin (س) dan Syin (ش) wajib memiliki tepat 3 gigi gerigi. Jarak antara gigi 1 dan gigi 2 sedikit lebih rapat daripada jarak ke gigi 3.',
          exampleAr: 'سَـ / شَـ / سَمْسَارٌ',
          exampleTranslit: 'Samsārun',
          exampleId: 'Tiga gigi gerigi konsisten'
        },
        {
          title: 'Garis Dasar Buku (Khatthul Asas)',
          explanation: 'Huruf dengan mangkok seperti Nun (ن), Shad (ص), Dhad (ض), Lam (ل), dan Qaf (ق) melengkung turun sedikit di bawah garis dasar kemudian naik kembali.',
          exampleAr: 'صَادٌ (ص) - قَافٌ (ق)',
          exampleTranslit: 'Ṣād - Qāf',
          exampleId: 'Mangkok turun di bawah garis buku'
        }
      ],
      hudhudTips: 'Pena Mercusuar Hudhud: Jangan terburu-buru menggores gigi Sin, pastikan ketiga gerigi berdiri tegak dan tidak tertukar dengan huruf Ba!'
    },
    highlightVocab: [
      { ar: 'أَسْنَانُ السِّينِ', translit: 'Asnānu s-sīn', id: 'Tiga gigi gerigi huruf Sin naskh' },
      { ar: 'كَأْسُ الصَّادِ', translit: 'Kaʾsu ṣ-ṣād', id: 'Mangkok lekukan huruf Shad naskh' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Berapakah jumlah gerigi (gigi pena) yang wajib ada pada huruf Sin (س) dan Syin (ش)?',
        options: [
          { text: '3 gigi gerigi teratur', isCorrect: true, feedback: 'Mumtaz! Huruf Sin dan Syin memiliki tepat 3 gigi.' },
          { text: '2 gigi gerigi', isCorrect: false, feedback: 'Kurang tepat, jika hanya 2 gerigi maka huruf tidak terbaca dengan benar.' }
        ]
      }
    ]
  },

  // KTB-L1-02: Imla' Alif Lam Qamariyyah vs Syamsiyyah
  'KTB-L1-02': {
    explanation: {
      conceptTitle: 'Imla\' Alif Lam: Terang Qamariyyah vs Lebur Syamsiyyah',
      overview: 'Saat menulis kata ber-Alif Lam (الـ), kedua huruf Alif dan Lam SELALU DITULIS. Namun harakatnya berbeda: pada Qamariyyah huruf Lam diberi sukun jelas (الْـ), sedangkan pada Syamsiyyah huruf Lam polos tanpa tanda dan huruf berikutnya diberi tasydid (الشَّـ).',
      rules: [
        {
          title: 'Al-Qamariyyah (Tampak Terang)',
          explanation: 'Huruf Lam dibaca jelas dengan sukun. Terjadi sebelum 14 huruf (ا ب غ ح ج ك و خ ف ع q k m h y).',
          exampleAr: 'الْقَلَمُ - الْكِتَابُ - الْبَابُ',
          exampleTranslit: 'Al-qalamu, Al-kitābu, Al-bābu',
          exampleId: 'Lam sukun tertulis dan terbaca'
        },
        {
          title: 'Asy-Syamsiyyah (Melebur Terbit)',
          explanation: 'Huruf Lam tetap ditulis meskipun bunyinya lebur langsung ke huruf berikutnya yang bertasydid.',
          exampleAr: 'الشَّمْسُ - النُّورُ - الرَّسُولُ',
          exampleTranslit: 'Asy-syamsu, An-nūru, Ar-rasūlu',
          exampleId: 'Lam tertulis tapi dibaca langsung syaddah'
        }
      ],
      hudhudTips: 'Kesalahan paling sering pemula: menulis "أَشَّمْسُ" tanpa Lam! Ingat: huruf Lam HARUS SELALU DITULIS: "الشَّمْسُ"!'
    },
    highlightVocab: [
      { ar: 'القَلَمُ', translit: 'Al-Qalamu', id: 'Pena (Alif Lam Qamariyyah dengan sukun)' },
      { ar: 'الشَّمْسُ', translit: 'Asy-Syamsu', id: 'Matahari (Alif Lam Syamsiyyah dengan tasydid)' },
      { ar: 'النُّورُ', translit: 'An-Nūru', id: 'Cahaya (Lam tertulis melebur ke Nun)' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Bagaimana penulisan ejaan yang BENAR untuk kata "Asy-Syamsu" (Matahari)?',
        options: [
          { text: 'الشَّمْسُ (huruf Lam tetap ditulis meskipun bunyinya melebur)', isCorrect: true, feedback: 'Tepat sekali! Huruf Lam tidak boleh dihilangkan pada Alif Lam Syamsiyyah.' },
          { text: 'أَشَّمْسُ (menghilangkan huruf Lam)', isCorrect: false, feedback: 'Keliru. Ini adalah kesalahan ejaan yang fatal dalam imla\'.' }
        ]
      }
    ]
  },

  // KTB-L1-03: Tanwin Fathatain & Alif Penopang
  'KTB-L1-03': {
    explanation: {
      conceptTitle: 'Kaidah Ejaan Tanwin & Alif Penopang Fathatain',
      overview: 'Tanwin fathatain (ً) memiliki aturan ejaan khusus: ia membutuhkan "tongkat penopang" berupa huruf Alif di akhir kata (contoh: كِتَابًا), KECUALI pada 2 tempat penting yang DILARANG menambah Alif.',
      rules: [
        {
          title: 'Wajib Ditambah Alif Penopang',
          explanation: 'Sebagian besar kata isim bertanwin fathatain wajib ditambah Alif di akhirnya.',
          exampleAr: 'كِتَابًا (Kitāban), وَلَدًا (Waladan), بَيْتًا (Baitan)',
          exampleTranslit: 'Kitāban, Waladan, Baitan',
          exampleId: 'Wajib alif penopang'
        },
        {
          title: 'Dua Pengecualian yang DILARANG Memakai Alif',
          explanation: '1. Pada Ta\' Marbuthah (ـةً): langsung ditaruh di atas Ta (مَدْرَسَةً, bukan مَدْرَسَتًا). 2. Pada Hamzah yang didahului Alif mad: langsung di atas Hamzah (مَاءً, bukan مَاءًا karena orang Arab membenci dua alif mengapit hamzah).',
          exampleAr: 'مَدْرَسَةً (sekolah) | مَاءً (air tawar)',
          exampleTranslit: 'Madrasatan | Māʾan',
          exampleId: 'Tanpa alif penopang'
        }
      ],
      hudhudTips: 'Rahasia Hudhud: Jangan pernah menulis nun sukun untuk tanwin (كِتَابَنْ itu salah!). Tulis كِتَابًا dengan alif penopang!'
    },
    highlightVocab: [
      { ar: 'كِتَابًا', translit: 'Kitāban', id: 'Sebuah buku (pakai alif penopang)' },
      { ar: 'مَدْرَسَةً', translit: 'Madrasatan', id: 'Sekolah (tanpa alif karena ta marbuthah)' },
      { ar: 'مَاءً', translit: 'Māʾan', id: 'Air segar (tanpa alif karena hamzah setelah mad)' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Pilihlah ejaan yang BENAR untuk kata "Mā\'an" (Air - manshub fathatain):',
        options: [
          { text: 'مَاءً (tanwin di atas hamzah langsung tanpa alif)', isCorrect: true, feedback: 'Mumtaz! Hamzah yang didahului alif mad dilarang ditambahi alif penopang lagi.' },
          { text: 'مَاءًا (dengan tambahan alif setelah hamzah)', isCorrect: false, feedback: 'Salah, kaidah bahasa Arab melarang hamzah diapit oleh dua huruf alif.' }
        ]
      }
    ]
  },

  // KTB-L2-01: Hamzah Qath' vs Washal
  'KTB-L2-01': {
    explanation: {
      conceptTitle: 'Hamzah Qath\' (أَ إِ أُ) vs Hamzah Washal (اِ اُ)',
      overview: 'Hamzah di awal kata terbagi dua: Hamzah Qath\' yang berkepala \'Ain (ء) dan selalu dibaca dalam kondisi apapun, serta Hamzah Washal yang ditulis alif tegak tanpa kepala \'ain dan hanya dibaca saat di awal kalimat, tetapi LEBUR saat disambung dari kata sebelumnya.',
      rules: [
        {
          title: 'Trik Uji Huruf Wawu (وَ) atau Fa (فَ)',
          explanation: 'Letakkan huruf "Wawu" di depan kata: Jika bunyinya tetap dibaca "A/I/U", itu QATH\'. Contoh: وَ + أَكْرَمَ = وَأَكْرَمَ (Wa-akrama). Jika bunyinya lebur loncat ke huruf sukun, itu WASHAL. Contoh: وَ + اِسْمُ = وَاسْمُ (Wasmu, bukan Wa-ismu).',
          exampleAr: 'وَ + أَكْرَمَ = وَأَكْرَمَ (Qath\') | وَ + اِسْمٌ = وَاسْمٌ (Washal)',
          exampleTranslit: 'Wa-akrama | Wasmun',
          exampleId: 'Trik huruf wawu deteksi lebur'
        },
        {
          title: 'Bentuk Visual Penulisan',
          explanation: 'Hamzah Qath\' WAJIB ditulis kepala ain-nya (أ / إ). Hamzah Washal DILARANG ditulis kepala ain-nya (hanya huruf Alif polos: ا).',
          exampleAr: 'اِسْتَغْفَرَ (Washal) vs أَرْسَلَ (Qath\')',
          exampleTranslit: 'Istaghfara vs Arsala',
          exampleId: 'Beda tanda kepala ain'
        }
      ],
      hudhudTips: 'Uji dengan lidahmu: ucapkan dengan "Wa...". Jika tertahan ada ketukan di tenggorokan (wa-ahmad), beri kepala ain (أَحْمَد). Jika mengalir mulus (waktub), tulis alif polos (اكْتُبْ)!'
    },
    highlightVocab: [
      { ar: 'أَكْرَمَ', translit: 'Akrama', id: 'Memuliakan (Hamzah Qath\' berkepala ain)' },
      { ar: 'اِسْمٌ', translit: 'Ismun', id: 'Nama (Hamzah Washal lebur saat washal: Wasmu)' },
      { ar: 'اِبْنٌ', translit: 'Ibnun', id: 'Putra (Hamzah Washal isim 10)' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Bagaimana cara cepat mengetahui apakah suatu kata diawali Hamzah Washal atau Hamzah Qath\'?',
        options: [
          { text: 'Menambahkan huruf Wawu (وَ) di depannya; jika bunyinya lebur langsung loncat, maka itu Hamzah Washal', isCorrect: true, feedback: 'Tepat sekali! Trik huruf wawu adalah metode paling akurat.' },
          { text: 'Melihat apakah katanya kata benda atau kata sifat', isCorrect: false, feedback: 'Hamzah washal dan qath\' ada pada isim, fi\'il, maupun huruf.' }
        ]
      }
    ]
  },

  // KTB-L2-02: Hamzah Mutatharrifah di Akhir Kata
  'KTB-L2-02': {
    explanation: {
      conceptTitle: 'Kaidah Hamzah Mutatharrifah (Hamzah di Akhir Kata)',
      overview: 'Penulisan hamzah di ujung kata adalah salah satu kaidah paling teratur dalam bahasa Arab: bentuk rumahnya HANYA ditentukan oleh harakat SATU HURUF SEBELUMNYA!',
      rules: [
        {
          title: 'Aturan 4 Rumah Hamzah Akhir',
          explanation: '1. Jika huruf sebelumnya Fathah -> tulis di atas ALIF (قَرَأَ, بَدَأَ). 2. Jika sebelumnya Dhammah -> tulis di atas WAWU (تَبَاطُؤٌ, تَرَؤُّفٌ). 3. Jika sebelumnya Kasrah -> tulis di atas YA tanpa titik (شَاطِئٌ, قَارِئٌ). 4. Jika sebelumnya Sukun atau Mad -> tulis SENDIRIAN di atas baris (مَاءٌ, شَيْءٌ, جَزَاءٌ).',
          exampleAr: 'قَرَأَ (Alif) - شَاطِئٌ (Ya) - تَبَاطُؤٌ (Wawu) - مَاءٌ (Baris)',
          exampleTranslit: 'Qaraʾa, Syāṭiʾun, Tabāṭuʾun, Māʾun',
          exampleId: 'Sesuai harakat huruf sebelumnya'
        }
      ],
      hudhudTips: 'Lihat satu huruf persis sebelum hamzah! Fathah = Alif, Kasrah = Ya, Dhammah = Wawu, Sukun/Panjang = di atas garis!'
    },
    highlightVocab: [
      { ar: 'قَرَأَ', translit: 'Qaraʾa', id: 'Membaca (huruf Ra berfathah -> di atas alif)' },
      { ar: 'شَاطِئٌ', translit: 'Syāṭiʾun', id: 'Pantai pelabuhan (huruf Tha berkasrah -> di atas ya)' },
      { ar: 'شَيْءٌ', translit: 'Syaiʾun', id: 'Sesuatu (huruf Ya bersukun -> di atas garis)' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Pada kata "Qāri\'" (Pembaca - قَارِ...), di manakah letak hamzah akhir ditulis jika huruf Ra berkasrah?',
        options: [
          { text: 'Di atas huruf Ya tanpa titik: قَارِئٌ', isCorrect: true, feedback: 'Mumtaz! Karena huruf sebelum hamzah berharakat kasrah.' },
          { text: 'Di atas huruf Alif: قَارِأٌ', isCorrect: false, feedback: 'Salah, alif hanya digunakan jika huruf sebelumnya berharakat fathah.' }
        ]
      }
    ]
  },

  // KTB-L2-03: Format Kartu Pos Korespondensi Sahabat (Tahni'ah)
  'KTB-L2-03': {
    explanation: {
      conceptTitle: 'Seni Korespondensi: Kartu Pos & Ucapan Sahabat (Tahni\'ah)',
      overview: 'Menulis kartu pos dan warkat persahabatan dalam bahasa Arab memiliki etika tata tulis (Adabur Rasa\'il): diawali basmalah/salam, doa penghormatan, isi pesan yang santun, dan ditutup dengan doa tulus serta tanda tangan pengirim.',
      rules: [
        {
          title: 'Frase Pembuka & Tahni\'ah (Selamat)',
          explanation: 'Gunakan ungkapan selamat yang lazim seperti "عِيدٌ مُبَارَكٌ" (Idul Fitri/Adha), "كُلُّ عَامٍ وَأَنْتُمْ بِخَيْرٍ", atau "شِفَاءً عَاجِلًا" (doa lekas sembuh).',
          exampleAr: 'عِيدٌ مُبَارَكٌ، تَقَبَّلَ اللَّهُ مِنَّا وَمِنْكُمْ',
          exampleTranslit: 'ʿĪdun mubārak, taqabbala Llāhu minnā wa-minkum',
          exampleId: 'Ucapan hari raya berkah'
        },
        {
          title: 'Ungkapan Rasa Syukur & Terima Kasih',
          explanation: 'Tuliskan rasa terima kasih dengan "شُكْرًا جَزِيلًا لَكَ" (terima kasih banyak) dan "جَزَاكَ اللَّهُ خَيْرًا" (semoga Allah membalas kebaikanmu).',
          exampleAr: 'أَشْكُرُكَ عَلَى هَدِيَّتِكَ الجَمِيلَةِ',
          exampleTranslit: 'Asykuruka ʿalā hadiyyatika l-jamīlah',
          exampleId: 'Ucapan terima kasih atas hadiah'
        }
      ],
      hudhudTips: 'Tips Hudhud: Merpati pos pelabuhan siap menerbangkan kartu posmu ke seberang samudera! Tulis nama sahabatmu dengan harakat yang jelas dan khat yang rapi!'
    },
    highlightVocab: [
      { ar: 'عِيدٌ مُبَارَكٌ', translit: 'ʿĪdun mubārak', id: 'Selamat hari raya berkah' },
      { ar: 'شُكْرًا جَزِيلًا', translit: 'Syukran jazīlan', id: 'Terima kasih banyak' },
      { ar: 'صَدِيقِي العَزِيزُ', translit: 'Ṣadīqī l-ʿazīz', id: 'Sahabatku yang terkasih' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Manakah ungkapan doa ucapan selamat hari raya yang paling tepat dan berharakat rapi?',
        options: [
          { text: 'عِيدٌ مُبَارَكٌ، كُلُّ عَامٍ وَأَنْتُمْ بِخَيْرٍ', isCorrect: true, feedback: 'Mumtaz! Inilah ungkapan tahni\'ah baku dan santun.' },
          { text: 'بَيْتٌ كَبِيرٌ فِي المَدِينَةِ', isCorrect: false, feedback: 'Salah, itu bermakna rumah besar di kota, bukan ucapan selamat.' }
        ]
      }
    ]
  },

  // KTB-L3-01: Tanda Baca Arab (Tarqim)
  'KTB-L3-01': {
    explanation: {
      conceptTitle: 'Kaidah Tanda Baca Arab (Alamatut Tarqim)',
      overview: 'Tanda baca dalam tulisan Arab memiliki orientasi khusus yang menyesuaikan arah penulisan dari kanan ke kiri.',
      rules: [
        {
          title: 'Koma dan Tanda Tanya Terbalik',
          explanation: 'Koma Arab (،) ekornya menghadap ke atas-kanan, bukan ke bawah seperti Latin. Tanda tanya Arab (؟) melengkung menghadap ke kiri mengikuti arah membaca teks.',
          exampleAr: 'جَاءَ زَيْدٌ، وَعَمْرٌو. | كَيْفَ حَالُكَ؟',
          exampleTranslit: 'Jāʾa Zaidun, wa ʿAmrun. | Kaifa ḥāluk?',
          exampleId: 'Arah hadap tanda baca Arab'
        },
        {
          title: 'Titik Dua dan Tanda Kutip',
          explanation: 'Titik dua (:) dipakai setelah fi\'il perkataan (قَالَ:). Tanda kutip naskah menggunakan kurung panah ganda (« ... ») atau tanda petik.',
          exampleAr: 'قَالَ المُعَلِّمُ: «العِلْمُ نُورٌ».',
          exampleTranslit: 'Qāla l-muʿallimu: «Al-ʿilmu nūr».',
          exampleId: 'Tanda perkataan dan kutipan naskah'
        }
      ],
      hudhudTips: 'Tips Mercusuar: Jangan gunakan tanda tanya Latin (?) pada kalimat Arab. Gunakan selalu tanda tanya Arab (؟) yang menghadap ke kiri!'
    },
    highlightVocab: [
      { ar: 'فَاصِلَة (،)', translit: 'Fāṣilah', id: 'Koma Arab pemisah anak kalimat' },
      { ar: 'عَلَامَةُ الِاسْتِفْهَامِ (؟)', translit: 'Alāmatu l-istifhām', id: 'Tanda tanya Arab' },
      { ar: 'نُقْطَة (.)', translit: 'Nuqṭah', id: 'Titik akhir kalimat' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Manakah tanda tanya yang BENAR digunakan pada akhir kalimat tanya bahasa Arab?',
        options: [
          { text: 'Tanda tanya yang melengkung menghadap ke kiri (؟)', isCorrect: true, feedback: 'Benar! Menyesuaikan arah baca Arab dari kanan ke kiri.' },
          { text: 'Tanda tanya Latin yang menghadap ke kanan (?)', isCorrect: false, feedback: 'Keliru, tanda tanya Latin tidak serasi dengan teks Arab.' }
        ]
      }
    ]
  },

  // KTB-L3-02: Alif Layyinah (Alif Maqshurah vs Mamdudah)
  'KTB-L3-02': {
    explanation: {
      conceptTitle: 'Kaidah Alif Layyinah: Alif Bengkok (ى) vs Alif Tegak (ا)',
      overview: 'Alif yang berada di akhir kata disebut Alif Layyinah. Terkadang ditulis bengkok seperti huruf Ya tanpa titik (Alif Maqshurah: ى), dan terkadang ditulis tegak lurus (Alif Mamdudah: ا). Bentuknya ditentukan oleh asal akar kata atau jumlah hurufnya.',
      rules: [
        {
          title: 'Kata 3 Huruf Asal Wawu -> Alif Tegak (ا)',
          explanation: 'Jika alif di ujung fi\'il atau isim tiga huruf berasal dari huruf Wawu (diketahui lewat bentuk fi\'il mudhari\' atau tasniyah), wajib ditulis Alif Tegak.',
          exampleAr: 'دَعَا (karena mudhari\'-nya: يَدْعُو) | عَصَا (tasniyah-nya: عَصَوَانِ)',
          exampleTranslit: 'Daʿā (yadʿū) | ʿAṣā (ʿaṣawān)',
          exampleId: 'Asal wawu ditulis alif tegak'
        },
        {
          title: 'Kata 3 Huruf Asal Ya -> Alif Bengkok (ى)',
          explanation: 'Jika alif di ujung kata berasal dari huruf Ya (mudhari\' atau mashdar), wajib ditulis Alif Maqshurah (Ya tanpa titik).',
          exampleAr: 'بَنَى (karena mudhari\'-nya: يَبْنِي) | هُدًى (mashdar: هَدْيٌ)',
          exampleTranslit: 'Banā (yabnī) | Hudan (hadyun)',
          exampleId: 'Asal ya ditulis alif bengkok (maqshurah)'
        },
        {
          title: 'Kata Lebih dari Tiga Huruf (Kaidah Umum)',
          explanation: 'Pada kata empat huruf atau lebih, alif akhir SELALU ditulis bengkok (ى), KECUALI jika didahului huruf Ya (seperti دُنْيَا / قَضَايَا) maka ditulis tegak.',
          exampleAr: 'مُسْتَشْفَى - مُصْطَفَى | Pengecualian: دُنْيَا',
          exampleTranslit: 'Mustasyfā, Muṣṭafā | Dunyā',
          exampleId: 'Empat huruf ke atas ditulis maqshurah kecuali didahului ya'
        }
      ],
      hudhudTips: 'Tips Hudhud: Mau tahu rahasia asal hurufnya? Ubah ke fi\'il mudhari\'! Jika muncul huruf Wawu (yad\'u) pilih Alif Tegak (ا), jika muncul huruf Ya (yabni) pilih Alif Bengkok (ى)!'
    },
    highlightVocab: [
      { ar: 'هُدًى', translit: 'Hudan', id: 'Petunjuk (alif maqshurah asal ya)' },
      { ar: 'عَصَا', translit: 'ʿAṣā', id: 'Tongkat (alif mamdudah tegak asal wawu)' },
      { ar: 'دَعَا', translit: 'Daʿā', id: 'Berdoa (alif mamdudah tegak karena yad\'u)' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Mengapa kata kerja "دَعَا" (berdoa) diakhiri dengan Alif Tegak (ا), bukan Alif Bengkok (ى)?',
        options: [
          { text: 'Karena huruf mudhari\'-nya adalah Wawu: يَدْعُو (Yad\'ū)', isCorrect: true, feedback: 'Mumtaz! Asal huruf Wawu melahirkan Alif Tegak.' },
          { text: 'Karena didahului huruf kasrah', isCorrect: false, feedback: 'Salah, huruf \'Ain berharakat fathah dan asalnya adalah Wawu.' }
        ]
      }
    ]
  },

  // KTB-L3-03: Dikte Kalimat Pendek & Imla' Mandzur
  'KTB-L3-03': {
    explanation: {
      conceptTitle: 'Kecakapan Imla\' Mandzur: Menyimak Kalimat & Ketepatan Ejaan',
      overview: 'Imla\' Mandzur adalah metode latihan di mana pembelajar mengamati kalimat berharakat, meneliti titik-titik rawan salah eja, lalu menuliskannya secara mandiri dari dikte pendengaran.',
      rules: [
        {
          title: 'Fokus Titik Rawan Ejaan',
          explanation: 'Sebelum menulis, identifikasi: mana huruf mad panjang, mana ta marbuthah vs maftuhah, dan di mana tanda koma (،) atau titik (.) diletakkan.',
          exampleAr: 'العِلْمُ نُورٌ فِي القَلْبِ، وَالجَهْلُ ظَلَامٌ.',
          exampleTranslit: 'Al-ʿilmu nūrun fī l-qalbi, wa-l-jahlu ẓalām.',
          exampleId: 'Kalimat hikmah berharakat utuh'
        },
        {
          title: 'Konsistensi Garis Buku & Harakat Lengkap',
          explanation: 'Tuliskan huruf di atas garis dasar dengan harakat rapi: dammah melingkar kecil, fathah/kasrah miring sejajar.',
          exampleAr: 'قِرْطَاسٌ أَبْيَضُ وَقَلَمٌ حَبْرٌ',
          exampleTranslit: 'Qirṭāsun abyaḍu wa-qalamun ḥabr',
          exampleId: 'Frase peralatan tulis perkamen'
        }
      ],
      hudhudTips: 'Tips Hudhud: Dengarkan audio dikte dua kali! Putaran pertama untuk menangkap arti keseluruhan, putaran kedua untuk mengunci setiap harakat dan huruf!'
    },
    highlightVocab: [
      { ar: 'قِرْطَاسٌ', translit: 'Qirṭāsun', id: 'Kertas naskah perkamen' },
      { ar: 'حِبْرٌ', translit: 'Ḥibrun', id: 'Tinta emas pelabuhan' },
      { ar: 'مِصْبَاحٌ', translit: 'Miṣbāḥun', id: 'Lentera mercusuar' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Pada metode Imla\' Mandzur, apakah langkah terbaik sebelum mulai menuliskan kalimat dari audio dikte?',
        options: [
          { text: 'Menganalisis kalimat terlebih dahulu untuk menandai huruf mad, alif lam, dan ta marbuthah', isCorrect: true, feedback: 'Benar sekali! Pengamatan teliti mencegah kesalahan ejaan fatal.' },
          { text: 'Langsung menulis tanpa menyimak sampai kalimat selesai', isCorrect: false, feedback: 'Salah, terburu-buru menyebabkan hilangnya huruf sambung.' }
        ]
      }
    ]
  },

  // KTB-L4-01: Kaidah Emas Hamzah Mutawassithah (Tengah Kata)
  'KTB-L4-01': {
    explanation: {
      conceptTitle: 'Kaidah Emas Hamzah Mutawassithah: Pertarungan Harakat Terkuat',
      overview: 'Hamzah di tengah kata ditulis berdasarkan "Peringkat Kekuatan Harakat" antara harakat hamzah itu sendiri melawan harakat huruf persis sebelumnya! Harakat yang lebih kuat yang MEMENANGKAN bentuk rumah hamzah.',
      rules: [
        {
          title: 'Hierarki 4 Tingkat Kekuatan Harakat',
          explanation: '1. KASRAH (Paling Kuat) -> Rumah Ya / Nabrah (ئـ). 2. DHAMMAH (Kuat Kedua) -> Rumah Wawu (ؤ). 3. FATHAH (Kuat Ketiga) -> Rumah Alif (أ). 4. SUKUN (Paling Lemah, selalu kalah).',
          exampleAr: 'بِئْرٌ (Kasrah vs Sukun = Kasrah Menang) | مُؤْمِنٌ (Dhammah vs Sukun = Dhammah Menang) | سَأَلَ (Fathah vs Fathah = Alif)',
          exampleTranslit: 'Biʾrun, Muʾminun, Saʾala',
          exampleId: 'Kasrah > Dhammah > Fathah > Sukun'
        }
      ],
      hudhudTips: 'Hafalkan rumus kemenangan: Kasrah adalah Raja (ئـ)! Jika ada kasrah pada hamzah atau huruf sebelumnya, langsung tulis di atas Nabrah (ئـ) tanpa ragu!'
    },
    highlightVocab: [
      { ar: 'بِئْرٌ', translit: 'Biʾrun', id: 'Sumur (Kasrah mengalahkan sukun -> di atas nabrah)' },
      { ar: 'مُؤْمِنٌ', translit: 'Muʾminun', id: 'Orang beriman (Dhammah mengalahkan sukun -> di atas wawu)' },
      { ar: 'سَأَلَ', translit: 'Saʾala', id: 'Ia bertanya (Fathah vs fathah -> di atas alif)' },
      { ar: 'رَأْسٌ', translit: 'Raʾsun', id: 'Kepala (Fathah mengalahkan sukun -> di atas alif)' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Pada kata "Bi\'r" (بـ...ـر), huruf Ba berkasrah (Bi) dan hamzah bersukun (\'). Di manakah rumah hamzah ditulis?',
        options: [
          { text: 'Di atas Nabrah/Ya (بِئْرٌ) karena harakat Kasrah adalah yang terkuat', isCorrect: true, feedback: 'Mumtaz! Kasrah mengalahkan sukun.' },
          { text: 'Di atas Alif (بِأْرٌ)', isCorrect: false, feedback: 'Salah, sukun tidak bisa mengalahkan kasrah.' }
        ]
      }
    ]
  },

  // KTB-L4-02: Huruf Zaidah
  'KTB-L4-02': {
    explanation: {
      conceptTitle: 'Kaidah Huruf Zaidah: Ditulis Tapi Tidak Dibaca',
      overview: 'Ada huruf-huruf tertentu dalam ortografi bahasa Arab yang wajib ditulis oleh pena, namun lidah dilarang melafalkannya saat membaca.',
      rules: [
        {
          title: 'Alif Fariqah setelah Wawu Jama\'ah',
          explanation: 'Huruf Alif wajib ditambahkan setelah huruf Wawu yang menunjukkan kata kerja jamak laki-laki (Wawu Jama\'ah) untuk membedakannya dari Wawu asli kata.',
          exampleAr: 'كَتَبُوا (mereka telah menulis - Alif tidak dibaca) vs يَدْعُو (ia berdoa - Wawu asli tanpa alif)',
          exampleTranslit: 'Katabū vs Yad\'ū',
          exampleId: 'Alif pembeda jamaah'
        },
        {
          title: 'Huruf Wawu pada Nama \'Amr (عَمْرٌو)',
          explanation: 'Nama "Amr" diberi tambahan huruf Wawu di ujungnya untuk membedakannya dari nama "Umar" (عُمَرُ) yang ditulis tanpa wawu.',
          exampleAr: 'عَمْرٌو (Amr - wawu tidak dibaca) vs عُمَرُ (Umar)',
          exampleTranslit: 'ʿAmrun vs ʿUmaru',
          exampleId: 'Wawu pembeda Amr dan Umar'
        }
      ],
      hudhudTips: 'Tips Mercusuar: Ingat كَتَبُوا (mereka menulis)! Alif di ujungnya adalah penjaga bahwa ini adalah perbuatan orang banyak!'
    },
    highlightVocab: [
      { ar: 'كَتَبُوا', translit: 'Katabū', id: 'Mereka telah menulis (ada alif fariqah zaidah)' },
      { ar: 'ذَهَبُوا', translit: 'Dhahabū', id: 'Mereka telah pergi (alif fariqah)' },
      { ar: 'عَمْرٌو', translit: 'ʿAmrun', id: 'Amr (ada huruf wawu zaidah pembeda)' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Apakah fungsi penulisan huruf Alif setelah Wawu Jama\'ah pada kata "كَتَبُوا" (Katabū)?',
        options: [
          { text: 'Sebagai Alif Fariqah pembeda bahwa Wawu tersebut adalah kata ganti jamak (jama\'ah)', isCorrect: true, feedback: 'Tepat sekali! Itu adalah Alif Fariqah ortografi.' },
          { text: 'Untuk dibaca panjang 6 harakat', isCorrect: false, feedback: 'Salah, huruf Alif Fariqah sama sekali tidak dibaca.' }
        ]
      }
    ]
  },

  // KTB-L4-03: Huruf Mahdzufah (Dihapus dalam Tulisan)
  'KTB-L4-03': {
    explanation: {
      conceptTitle: 'Kaidah Huruf Mahdzufah: Alif Mad yang Dibuang dalam Tulisan',
      overview: 'Sebaliknya dari huruf zaidah, ada kata-kata populer di mana bunyi vokal panjang Alif dilafalkan dengan jelas oleh lisan, namun huruf Alif-nya WAJIB DIHAPUS (Hadzaful Alif) dari penulisan resmi.',
      rules: [
        {
          title: 'Hadzaful Alif pada Isim Isyarah',
          explanation: 'Kata tunjuk seperti "Hādhā" (ini) dan "Dhālika" (itu) dilafalkan panjang (Hā), tetapi ditulis tanpa alif: هٰذَا (bukan هاذا) dan ذٰلِكَ (bukan ذالِك).',
          exampleAr: 'هٰذَا كِتَابٌ مُفِيدٌ | ذٰلِكَ الفَوْزُ العَظِيمُ',
          exampleTranslit: 'Hādhā kitābun mufīd | Dhālika l-fawzul ʿaẓīm',
          exampleId: 'Alif dibuang pada isim isyarah'
        },
        {
          title: 'Basmalah & Lafadz Ar-Rahman',
          explanation: 'Pada kalimat Basmalah utuh, hamzah washal pada Ism dibuang: "بِسْمِ اللَّهِ" (bukan باسم الله). Dan pada kata Ar-Rahman alif dibuang: "الرَّحْمٰن" (bukan الرحمان).',
          exampleAr: 'بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ',
          exampleTranslit: 'Bismi Llāhi r-Raḥmāni r-Raḥīm',
          exampleId: 'Alif mahdzufah pada Basmalah dan Ar-Rahman'
        }
      ],
      hudhudTips: 'Tips Hudhud: Jangan pernah menulis "هاذا" atau "الرحمان" dengan alif panjang penuh! Dalam mushaf dan imla\' standar, cukup beri alif tegak kecil (khanjariyyah) di atas hurufnya!'
    },
    highlightVocab: [
      { ar: 'هٰذَا', translit: 'Hādhā', id: 'Ini (alif mad dihapus dalam tulisan)' },
      { ar: 'ذٰلِكَ', translit: 'Dhālika', id: 'Itu (alif mad mahdzufah)' },
      { ar: 'الرَّحْمٰن', translit: 'Ar-Raḥmān', id: 'Maha Pengasih (alif khanjariyyah mahdzufah)' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Bagaimanakah penulisan baku ortografi Arab untuk kata tunjuk "Hādhā" (ini)?',
        options: [
          { text: 'هٰذَا (huruf Alif mad dihapus dalam tulisan)', isCorrect: true, feedback: 'Mumtaz! Alif mad-nya mahdzufah (dihapus).' },
          { text: 'هَاذَا (dengan huruf alif panjang tertulis)', isCorrect: false, feedback: 'Salah, penulisan dengan alif tertulis adalah kekeliruan ejaan umum.' }
        ]
      }
    ]
  },

  // KTB-L5-01: Insya' Hurr & Imla' Ikhtibari Hikmah
  'KTB-L5-01': {
    explanation: {
      conceptTitle: 'Tingkat Mahir: Insya\' Hurr & Imla\' Ikhtibari Hikmah Klasik',
      overview: 'Puncak kemahiran di Pelabuhan Kitabah adalah menyusun paragraf mandiri berkohesi tinggi dan menuliskan naskah hikmah dari pendengaran tanpa melihat teks.',
      rules: [
        {
          title: 'Struktur Kohesi Teks (Insya\')',
          explanation: 'Gunakan kata sambung yang tepat seperti Fa (فَـ), Tsumma (ثُمَّ), Wa (وَ), dan tanda baca tarqim Arab untuk merangkai 3-5 kalimat berbobot.',
          exampleAr: 'طَلَبُ العِلْمِ فَرِيضَةٌ، وَبِالعِلْمِ يَرْتَقِي الإِنْسَانُ.',
          exampleTranslit: 'Thalabu l-ʿilmi farīḍah, wa bi-l-ʿilmi yartaqī l-insān.',
          exampleId: 'Paragraf ringkas hikmah bersambung'
        }
      ],
      hudhudTips: 'Kamu adalah Pujangga Pelabuhan Tinta Emas! Gabungkan ketepatan ejaan imla\' dengan keindahan tata bahasa qawa\'id!'
    },
    highlightVocab: [
      { ar: 'إِنْشَاءٌ أَدَبِيٌّ', translit: 'Insyāʾun adabiyyun', id: 'Komposisi karangan tulisan indah' },
      { ar: 'دِيوَانُ الحِكْمَةِ', translit: 'Dīwānu l-ḥikmah', id: 'Antologi naskah hikmah klasik' },
      { ar: 'إِمْلَاءٌ اخْتِبَارِيٌّ', translit: 'Imlāʾun ikhtibāriyyun', id: 'Dikte evaluasi mandiri tanpa teks' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Dalam penulisan naskah bahasa Arab tingkat mahir, apakah yang paling menentukan keindahan sebuah karangan (insya\')?',
        options: [
          { text: 'Kebenaran ejaan ortografi (imla\'), ketepatan nahwu-sharaf, dan kerapian tanda baca tarqim', isCorrect: true, feedback: 'Mumtaz! Inilah kriteria naskah Adib sejati.' },
          { text: 'Hanya banyaknya kata sulit tanpa memperhatikan ejaan', isCorrect: false, feedback: 'Ketepatan ejaan dan tata bahasa adalah fondasi utama.' }
        ]
      }
    ]
  },

  // KTB-L5-02: Imla' Ikhtibari Naskah Klasik & Hadits Nabawi
  'KTB-L5-02': {
    explanation: {
      conceptTitle: 'Kecakapan Imla\' Ikhtibari: Ujian Dikte Mandiri Naskah Klasik',
      overview: 'Imla\' Ikhtibari adalah tingkat tertinggi evaluasi menulis dalam tradisi literasi Arab. Pembelajar mendengarkan kalimat mutiara hadits atau hikmah sastra, lalu menuliskan teks lengkap berharakat tanpa bantuan visual sama sekali.',
      rules: [
        {
          title: 'Integrasi Multikaidah Ejaan',
          explanation: 'Sebuah naskah ikhtibari menguji sekaligus: hamzah mutawassithah (cth: المُؤْمِنِ), hamzah washal (cth: الحِكْمَةُ), ta marbuthah (ضَالَّةُ), dan tanda baca tarqim.',
          exampleAr: 'قَالَ رَسُولُ اللَّهِ ﷺ: «الحِكْمَةُ ضَالَّةُ المُؤْمِنِ، فَحَيْثُ وَجَدَهَا فَهُوَ أَحَقُّ بِهَا».',
          exampleTranslit: 'Qāla Rasūlu Llāhi ﷺ: "Al-ḥikmatu ḍāllatu l-muʾmini, fa-ḥaythu wajadahā fa-huwa aḥaqqu bihā."',
          exampleId: 'Hadits hikmah mukmin dengan tanda kutip Arab'
        },
        {
          title: 'Akurasi Tanpa Melihat Contoh Visual',
          explanation: 'Kunci lulus Imla\' Ikhtibari adalah kecepatan pena memanggil kaidah: rumus harakat terkuat hamzah, alif penopang tanwin, dan pemutus kiri.',
          exampleAr: 'طَلَبُ العِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ.',
          exampleTranslit: 'Thalabu l-ʿilmi farīḍatun ʿalā kulli muslim.',
          exampleId: 'Hadits kewajiban menuntut ilmu'
        }
      ],
      hudhudTips: 'Tips Hudhud: Tenangkan pikiranmu di hadapan Mercusuar Tinta Emas. Setiap kata yang kamu tulis dengan benar adalah batu bata kokoh mahkota kepustakaanmu!'
    },
    highlightVocab: [
      { ar: 'إِمْلَاءٌ اخْتِبَارِيٌّ', translit: 'Imlāʾun ikhtibāriyyun', id: 'Dikte ujian komprehensif tanpa teks' },
      { ar: 'الحِكْمَةُ ضَالَّةُ المُؤْمِنِ', translit: 'Al-ḥikmatu ḍāllatu l-muʾmin', id: 'Hikmah adalah barang hilang mukmin' },
      { ar: 'فَرِيضَةٌ', translit: 'Farīḍatun', id: 'Kewajiban mulia (ta marbuthah tanwin)' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Apakah yang membedakan Imla\' Ikhtibari dari metode Imla\' Mandzur sebelumnya?',
        options: [
          { text: 'Imla\' Ikhtibari dilakukan murni dari audio pendengaran tanpa melihat contoh teks naskah sama sekali', isCorrect: true, feedback: 'Mumtaz! Menguji penguasaan kaidah ejaan secara tuntas.' },
          { text: 'Imla\' Ikhtibari hanya boleh disalin dengan melihat buku terbuka', isCorrect: false, feedback: 'Salah, itu adalah Imla\' Manqul (menyalin).' }
        ]
      }
    ]
  },

  // KTB-L5-03: Seni Khath Arab & Kaidah Kaligrafi Naskh-Tsuluts
  'KTB-L5-03': {
    explanation: {
      conceptTitle: 'Seni Khath Arab: Kaidah Ukuran Titik Pena (Mizanun Nuqath)',
      overview: 'Puncak estetika Pelabuhan Kitabah adalah seni kaligrafi Arab (Khaththul Jamil). Dalam tradisi ulama khat, ukuran dan keindahan setiap huruf diukur dengan satuan "Titik Belah Pena" (Nuqathul Qalam).',
      rules: [
        {
          title: 'Satuan Ukur Titik Belah Pena (Nuqthah)',
          explanation: 'Satu titik berbentuk belah ketupat yang dihasilkan saat ujung pena miring ditekan ke kertas. Tinggi huruf Alif pada Naskh adalah 5 titik, sedangkan pada Tsuluts adalah 7 titik!',
          exampleAr: 'خَطُّ النَّسْخِ (5 titik alif) vs خَطُّ الثُّلُثِ (7 titik alif)',
          exampleTranslit: 'Khaṭṭu n-Naskh vs Khaṭṭu th-Thuluth',
          exampleId: 'Standar tinggi huruf alif kaligrafi'
        },
        {
          title: 'Karakter Gaya Khath Populer',
          explanation: 'Khath Naskh: rapi, jelas, dan mudah dibaca (standar mushaf). Khath Tsuluts: megah, meliuk indah, dengan harakat hiasan (tarwiys) untuk prasasti dan sampul kitab.',
          exampleAr: 'خَطُّ الثُّلُثِ الجَلِيّ',
          exampleTranslit: 'Khaṭṭu th-Thuluthi l-Jalī',
          exampleId: 'Gaya kaligrafi agung'
        }
      ],
      hudhudTips: 'Tips Hudhud: Pena kaligrafi bambu (Qalam Jawi/Handam) dipotong miring dengan sudut sekitar 60 derajat untuk menghasilkan goresan tebal-tipis yang menawan!'
    },
    highlightVocab: [
      { ar: 'خَطُّ الثُّلُثِ الجَلِيّ', translit: 'Khaṭṭu th-thuluthi l-jalī', id: 'Seni kaligrafi Tsuluts megah' },
      { ar: 'مِيزَانُ الحُرُوفِ بِالنِّقَاطِ', translit: 'Mīzānu l-ḥurūfi bi-n-niqāṭ', id: 'Timbangan huruf dengan titik pena' },
      { ar: 'قَلَمُ الخَطِّ', translit: 'Qalamu l-khaṭṭ', id: 'Pena kaligrafi berujung miring' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Apakah satuan standar yang digunakan oleh master kaligrafi Arab untuk mengukur tinggi dan proporsi huruf?',
        options: [
          { text: 'Titik belah ketupat ujung pena (Nuqthah)', isCorrect: true, feedback: 'Tepat sekali! Inilah kaidah Mizanun Nuqath yang dirumuskan Ibnu Muqlah.' },
          { text: 'Satuan sentimeter atau milimeter biasa', isCorrect: false, feedback: 'Salah, kaligrafi klasik memakai titik pena agar skala huruf proporsional dengan lebar pena apa pun.' }
        ]
      }
    ]
  },

  // 8. KLM-L0-01: Artikulasi Makharijul Huruf Halq (Tenggorokan)
  'KLM-L0-01': {
    explanation: {
      conceptTitle: 'Artikulasi Makhraj Halq (6 Huruf Tenggorokan)',
      overview: 'Di Pulau Kalam, suara adalah lentera! Tenggorokan (Al-Halq) adalah tempat keluarnya 6 huruf hijaiyah: Tenggorokan bawah (ء, هـ), Tenggorokan tengah (ع, ح), dan Tenggorokan atas (غ, خ).',
      rules: [
        {
          title: 'Tenggorokan Bawah (Pangkal Leher): Hamzah (ء) & Ha Besar (هـ)',
          explanation: 'Dekat dengan dada. Bunyi Hamzah keluar tegas dan tertahan. Bunyi Ha besar keluar lapang dan berhembus bebas.',
          exampleAr: 'أَ - هَ',
          exampleTranslit: 'A - Ha',
          exampleId: 'Pangkal tenggorokan'
        },
        {
          title: 'Tenggorokan Tengah: \'Ain (ع) & Ha Pedas/Halus (ح)',
          explanation: 'Dihasilkan dengan menyempitkan dinding tenggorokan tengah. \'Ain terdengar seperti ada tekanan lembut di pita suara, Ha terdengar bersih dan tajam.',
          exampleAr: 'عَ - حَ',
          exampleTranslit: '\'A - Ha (halus)',
          exampleId: 'Tengah tenggorokan'
        },
        {
          title: 'Tenggorokan Atas: Ghain (غ) & Kha (خ)',
          explanation: 'Dekat pangkal lidah. Bunyi Ghain basah mengalir seperti berkumur air. Bunyi Kha mendengkur kering bergesek.',
          exampleAr: 'غَ - خَ',
          exampleTranslit: 'Gha - Kha',
          exampleId: 'Ujung atas tenggorokan'
        }
      ],
      hudhudTips: 'Jangan tertukar antara Ha besar (هـ) dari dada dengan Ha halus (ح) dari tengah tenggorokan yang terasa sejuk di leher!'
    },
    highlightVocab: [
      { ar: 'حَلْق', translit: 'Halq', id: 'Tenggorokan' },
      { ar: 'عَيْن', translit: '\'Ain', id: 'Mata / Huruf \'Ain makhraj tengah tenggorokan' },
      { ar: 'حَمْد', translit: 'Hamd', id: 'Pujian / Huruf Ha halus tengah tenggorokan' },
      { ar: 'خَيْر', translit: 'Khair', id: 'Kebaikan / Huruf Kha atas tenggorokan' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Dua huruf manakah yang keluar dari TENGGOROKAN TENGAH (Wasathul Halq)?',
        options: [
          { text: 'ع (\'Ain) dan ح (Ha)', isCorrect: true, feedback: 'Mumtaz! \'Ain dan Ha keluar tepat dari tengah-tengah tenggorokan.' },
          { text: 'ء (Hamzah) dan هـ (Ha besar)', isCorrect: false, feedback: 'Hamzah dan Ha besar keluar dari pangkal tenggorokan bawah.' },
          { text: 'غ (Ghain) dan خ (Kha)', isCorrect: false, feedback: 'Ghain dan Kha keluar dari tenggorokan atas.' }
        ]
      }
    ]
  },

  // KLM-L0-02: Makhraj Lisan (Lidah: Pangkal, Tengah & Tepi)
  'KLM-L0-02': {
    explanation: {
      conceptTitle: 'Makhraj Lisan: Wilayah Pangkal, Tengah, dan Tepi Lidah',
      overview: 'Lidah (Al-Lisan) adalah organ bicara paling kaya di Pulau Kalam. Memiliki 10 titik makhraj untuk 18 huruf hijaiyah, terbagi ke pangkal lidah, tengah lidah, dan tepi sisi lidah.',
      rules: [
        {
          title: 'Pangkal Lidah: Qaf (ق) dan Kaf (ك)',
          explanation: 'Qaf keluar dari pangkal lidah paling belakang membentur langit-langit lunak (suara tebal berbobot). Maju sedikit ke depan adalah Kaf, membentur langit-langit keras dengan hembusan nafas hams tipis.',
          exampleAr: 'قَالَ - كَانَ',
          exampleTranslit: 'Qaala - Kaana',
          exampleId: 'Pangkal lidah tebal vs tipis'
        },
        {
          title: 'Tengah Lidah: Jim (ج), Syin (ش), Ya (ي)',
          explanation: 'Tengah lidah terangkat ke langit-langit atas. Jim tertahan kuat (syiddah) tanpa desis "c", Syin menyebarkan angin tafasysyi ke seluruh mulut, dan Ya mengalir lembut (layyin).',
          exampleAr: 'جَمِيلٌ - شَمْسٌ - يَوْمٌ',
          exampleTranslit: 'Jamiil - Syams - Yawm',
          exampleId: 'Tengah lidah'
        },
        {
          title: 'Tepi Lidah: Dhad (ض) dan Lam (ل)',
          explanation: 'Dhad adalah huruf teristimewa: tepi lidah menekan gigi geraham atas disertai istithalah (suara memanjang). Lam keluar dari ujung tepi lidah menyentuh gusi atas.',
          exampleAr: 'ضِيَاءٌ - لِسَانٌ',
          exampleTranslit: 'Dhiyaa\' - Lisaan',
          exampleId: 'Tepi lidah mahkota bahasa Arab'
        }
      ],
      hudhudTips: 'Saat melafalkan Qaf (ق), bayangkan suaramu memantul di gua tebing kristal. Jangan sampai terdengar seperti Kaf (ك)!'
    },
    highlightVocab: [
      { ar: 'لِسَان', translit: 'Lisan', id: 'Lidah' },
      { ar: 'قَلْب', translit: 'Qalb', id: 'Hati / Huruf Qaf pangkal lidah' },
      { ar: 'كِتَاب', translit: 'Kitaab', id: 'Buku / Huruf Kaf hams' },
      { ar: 'ضَوْء', translit: 'Dhaw\'', id: 'Cahaya / Huruf Dhad tepi lidah' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Huruf apakah yang keluar dari tepi lidah menempel ke deretan gigi geraham atas?',
        options: [
          { text: 'Dhad (ض)', isCorrect: true, feedback: 'Shahih! Huruf Dhad adalah lambang keagungan bahasa Arab (Lughat adh-Dhad).' },
          { text: 'Dal (د)', isCorrect: false, feedback: 'Dal keluar dari ujung lidah menyentuh pangkal gigi seri atas.' },
          { text: 'Zha (ظ)', isCorrect: false, feedback: 'Zha keluar dari ujung lidah menempel ke ujung gigi seri atas.' }
        ]
      }
    ]
  },

  // KLM-L0-03: Makhraj Huruf Tebal & Desis (Isti'la & Shafir: ص، ض، ط، ظ)
  'KLM-L0-03': {
    explanation: {
      conceptTitle: 'Kaidah Huruf Tebal (Isti\'la/Ithbaq) & Desis Tajam (Shafir)',
      overview: 'Kekayaan suara Arab terletak pada perbedaan resonansi huruf tebal (mufakhkham) dan huruf tipis (muraqqaq), serta desis tajam burung safir di lembah suara.',
      rules: [
        {
          title: 'Empat Huruf Paling Kuat & Tebal (Ithbaq): ص، ض، ط، ظ',
          explanation: 'Pangkal dan tengah lidah terangkat menutup langit-langit mulut. Rongga mulut terisi gema suara tebal dan bulat tanpa memonyongkan bibir secara berlebihan.',
          exampleAr: 'صَابِرٌ - ضَارِبٌ - طَالِبٌ - ظَالِمٌ',
          exampleTranslit: 'Shaabir - Dhaarib - Thaalib - Zhaalim',
          exampleId: 'Gema tebal ithbaq'
        },
        {
          title: 'Tiga Huruf Desis Tajam (Shafir): ص، س، ز',
          explanation: 'Ujung lidah bertumpu di balik gigi seri bawah, meluncurkan desis jernih dan berbobot. Shad berdesis tebal, Sin berdesis tipis lembut, dan Za berdesis dengan dengungan pita suara.',
          exampleAr: 'صَوْتٌ - سَلَامٌ - زَمَنٌ',
          exampleTranslit: 'Shawt - Salaam - Zaman',
          exampleId: 'Keluarga huruf desis'
        }
      ],
      hudhudTips: 'Bedakan desis tebal Shad (ص) dengan desis tipis Sin (س). Jangan biarkan kata "Shabr" (sabar) terdengar seperti "Sariq" (pencuri)!'
    },
    highlightVocab: [
      { ar: 'صَبْر', translit: 'Shabr', id: 'Sabar' },
      { ar: 'سَلَام', translit: 'Salaam', id: 'Damai sejahtera' },
      { ar: 'طَرِيق', translit: 'Thariiq', id: 'Jalan lurus' },
      { ar: 'زَهْرَة', translit: 'Zahrah', id: 'Bunga mekar' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Manakah kelompok huruf yang memiliki sifat Ithbaq (rongga lidah terangkat rapat menutup langit-langit)?',
        options: [
          { text: 'ص، ض، ط، ظ', isCorrect: true, feedback: 'Mumtaz! Keempat huruf ini adalah huruf dengan artikulasi paling tebal dan kokoh.' },
          { text: 'ب، ت، ث، ج', isCorrect: false, feedback: 'Huruf-huruf ini bersifat Infitah (rongga lidah terbuka tipis).' },
          { text: 'ر، ز، س، ش', isCorrect: false, feedback: 'Hanya Shad yang tebal di antara huruf desis.' }
        ]
      }
    ]
  },

  // KLM-L1-01: Pelafalan Kosakata Tematik Bertanwin & Sukun
  'KLM-L1-01': {
    explanation: {
      conceptTitle: 'Artikulasi Akhir Kata: Tanwin Jelas & Sukun Tegas',
      overview: 'Dalam tradisi kalam fasih, pemula harus mampu melafalkan harakat akhir bertanwin (un, in, an) secara bulat sebelum beralih ke waqaf sukun yang rapi saat berhenti.',
      rules: [
        {
          title: 'Ketegasan Vokalisasi Tanwin (ـٌ ـٍ ـً)',
          explanation: 'Tanwin melahirkan bunyi nun sukun khayali di ujung kata. Ucapkan dengan ujung lidah ringan tanpa mendengung berlebihan: "Qalamun" bukan "Qalameng".',
          exampleAr: 'كِتَابٌ مُفِيدٌ - فِي بَيْتٍ جَمِيلٍ',
          exampleTranslit: 'Kitaabun mufiidun - fii baytin jamiilin',
          exampleId: 'Vokalisasi tanwin'
        },
        {
          title: 'Penghentian Sukun yang Bersih (Waqaf bil-Iskan)',
          explanation: 'Ketika kalimat berhenti, huruf terakhir disukunkan secara alami tanpa memotong suku kata sebelumnya secara canggung.',
          exampleAr: 'هَذَا كِتَابْ (dari: كِتَابٌ)',
          exampleTranslit: 'Haadzaa kitaab',
          exampleId: 'Sukun waqaf'
        }
      ],
      hudhudTips: 'Pastikan tanwin fathatain (-an) tidak terbawa menjadi bunyi sengau hidung, kecuali jika bertemu huruf idgham di bacaan Al-Qur\'an!'
    },
    highlightVocab: [
      { ar: 'فَصَاحَة', translit: 'Fashaahah', id: 'Kefasihan lisan' },
      { ar: 'كَلِمَة', translit: 'Kalimah', id: 'Kata / tuturan' },
      { ar: 'بَيْت', translit: 'Bayt', id: 'Rumah' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Bagaimana bunyi harakat Tanwin Dhammah (ـٌ) yang tepat saat dilafalkan bersambung (washal)?',
        options: [
          { text: 'Vokal "u" diikuti bunyi nun sukun bersih (-un)', isCorrect: true, feedback: 'Tepat sekali! Tanwin adalah nun sukun tambahan di akhir isim.' },
          { text: 'Vokal panjang "uu" tanpa nun', isCorrect: false, feedback: 'Itu adalah mad wawu, bukan tanwin.' },
          { text: 'Bunyi sengau mendengus (-ung)', isCorrect: false, feedback: 'Itu kebiasaan dialek yang perlu diluruskan menjadi nun murni.' }
        ]
      }
    ]
  },

  // KLM-L1-02: Kelancaran Kalimat Sapaan & Tahiyyat (Thalaqah Awal)
  'KLM-L1-02': {
    explanation: {
      conceptTitle: 'Thalaqah Sapaan: Ritme Hangat & Keakraban Bertutur',
      overview: 'Kelancaran berbicara (Thalaqah) tidak diukur dari kecepatan, melainkan dari ritme wajar tanpa jeda terbata-bata. Kalimat sapaan adalah etalase kesopanan lisan Arab.',
      rules: [
        {
          title: 'Tempo Melodi Ucapan Salam (As-Salamu \'Alaykum)',
          explanation: 'Awali dengan nada hangat dan ramah. Sambungkan alif lam syamsiyyah ke huruf sin dengan lentur, jangan memutus kata "As-salamu" dan "\'alaykum".',
          exampleAr: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ',
          exampleTranslit: 'As-salaamu \'alaykum wa rahmatullaahi wa barakaatuh',
          exampleId: 'Salam lengkap'
        },
        {
          title: 'Ungkapan Tanya Kabar Spontan',
          explanation: 'Gunakan nada intonasi naik lembut saat mengucapkan "Kayfa haaluk?", disusul jawaban bersyukur "Bi-khayr wal-hamdulillah".',
          exampleAr: 'كَيْفَ حَالُكَ اليَوْمَ؟ - بِخَيْرٍ وَالحَمْدُ لِلَّه',
          exampleTranslit: 'Kayfa haaluka al-yawm? - Bi-khayrin wal-hamdulillaah',
          exampleId: 'Tanya kabar bersyukur'
        }
      ],
      hudhudTips: 'Tersenyumlah saat mengucapkan salam! Senyuman membuka posisi bibir sehingga vokal "a" dan "u" terdengar jauh lebih cerah dan ramah.'
    },
    highlightVocab: [
      { ar: 'طَلَاقَة', translit: 'Thalaaqah', id: 'Kelancaran bertutur' },
      { ar: 'تَحِيَّة', translit: 'Tahiyyah', id: 'Penghormatan & sapaan' },
      { ar: 'مَرْحَبًا', translit: 'Marhaban', id: 'Selamat datang' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Apakah ciri utama Thalaqah (kelancaran berbicara) pada tingkat dasar?',
        options: [
          { text: 'Ujaran berirama wajar tanpa jeda kaku terbata-bata', isCorrect: true, feedback: 'Mumtaz! Thalaqah adalah kelancaran mengalir secara wajar.' },
          { text: 'Berbicara secepat kilat tanpa mengambil nafas', isCorrect: false, feedback: 'Kecepatan tanpa artikulasi jelas bukan thalaqah, melainkan ketergesaan.' }
        ]
      }
    ]
  },

  // KLM-L1-03: Vokalisasi Mad Thabi'i vs Harakat Pendek (2 Harakat Presisi)
  'KLM-L1-03': {
    explanation: {
      conceptTitle: 'Disiplin Ketukan Vokal: Mad Thabi\'i (2 Harakat) vs Harakat Pendek',
      overview: 'Dalam bahasa Arab, memanjangkan huruf pendek atau memendekkan huruf panjang dapat mengubah arti kata secara total. Ketukan vokal adalah fondasi musikalitas kalam.',
      rules: [
        {
          title: 'Kontras Qalam (Pena) vs Kalaam (Ujaran)',
          explanation: 'Qalam (قَلَم) kedua hurufnya bervokal pendek 1 ketukan. Kalaam (كَلَام) huruf lam bervokal mad thabi\'i 2 ketukan. Perhatikan perbedaan maknanya!',
          exampleAr: 'قَلَمٌ (Pena) vs كَلَامٌ (Tutur kata)',
          exampleTranslit: 'Qalamun vs Kalaamun',
          exampleId: 'Perubahan arti akibat mad'
        },
        {
          title: 'Ketukan Dua Jari (Madd Thabi\'i)',
          explanation: 'Ukuran 2 harakat sama dengan merentangkan atau menggenggam dua jari secara tenang. Jangan sampai terseret menjadi 4 atau 6 harakat.',
          exampleAr: 'قَالَ زَيْدٌ كِتَابِي جَدِيدٌ',
          exampleTranslit: 'Qaala Zaydun kitaabii jadiidun',
          exampleId: 'Mad thabi\'i alif dan ya'
        }
      ],
      hudhudTips: 'Ketuk mejamu pelan: tuk-tuk untuk mad 2 harakat, dan satu ketukan cepat untuk harakat tunggal.'
    },
    highlightVocab: [
      { ar: 'مَدّ', translit: 'Madd', id: 'Panjang vokal' },
      { ar: 'قَصْر', translit: 'Qashr', id: 'Pendek vokal 1 harakat' },
      { ar: 'مِيزَان', translit: 'Miizaan', id: 'Timbangan / takaran tempo' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Berapakah ketukan standar untuk melafalkan Mad Thabi\'i (huruf mad biasa)?',
        options: [
          { text: '2 harakat (ketukan wajar)', isCorrect: true, feedback: 'Tepat sekali! Mad Thabi\'i diukur 2 harakat secara tenang.' },
          { text: '1 harakat sama seperti fathah biasa', isCorrect: false, feedback: 'Jika 1 harakat, maka mad-nya hilang.' },
          { text: '6 harakat sangat panjang', isCorrect: false, feedback: 'Itu adalah Mad Lazim, bukan mad thabi\'i.' }
        ]
      }
    ]
  },

  // KLM-L2-01: Intonasi Kalimat Tanya, Perintah & Seru (Istifham & Amr)
  'KLM-L2-01': {
    explanation: {
      conceptTitle: 'Intonasi Kalimat: Nada Istifham, Amr, dan Nida\'',
      overview: 'Makna kalimat tidak hanya ditentukan oleh kata, tetapi oleh nada suara (An-Nabrah). Penutur Arab asli mengenali maksud pertanyaan atau perintah dari lengkung intonasinya.',
      rules: [
        {
          title: 'Intonasi Kalimat Tanya (Istifham): Nada Melambung di Tengah/Akhir',
          explanation: 'Pada kata tanya seperti "Hal" atau "Ayna", nada suara terangkat naik sedikit untuk mengundang jawaban dari pendengar.',
          exampleAr: 'هَلْ هَذَا كِتَابُكَ يَا عُمَرُ؟',
          exampleTranslit: 'Hal haadzaa kitaabuka yaa \'Umar?',
          exampleId: 'Intonasi tanya naik'
        },
        {
          title: 'Intonasi Kalimat Perintah (Fi\'il Amr): Nada Berwibawa & Turun Tegas',
          explanation: 'Perintah disampaikan dengan wibawa mantap, nada turun yang tegas tanpa membentak kasar.',
          exampleAr: 'اِقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ',
          exampleTranslit: 'Iqra\' bismi rabbikalladzii khalaq',
          exampleId: 'Intonasi perintah agung'
        },
        {
          title: 'Intonasi Panggilan (Nida\'): Menarik Perhatian dengan Hangat',
          explanation: 'Kata "Yaa" dipanjangkan sejenak untuk memanggil jiwa mitra tutur sebelum menyampaikan pesan inti.',
          exampleAr: 'يَا طَالِبَ العِلْمِ، اجْتَهِدْ!',
          exampleTranslit: 'Yaa thaalibal \'ilmi, ijtahid!',
          exampleId: 'Intonasi nida\''
        }
      ],
      hudhudTips: 'Ucapkan kalimat tanya dengan alis terangkat sedikit! Ini otomatis mengarahkan pita suaramu ke nada naik yang alami.'
    },
    highlightVocab: [
      { ar: 'نَبْرَة', translit: 'Nabrah', id: 'Intonasi nada suara' },
      { ar: 'اِسْتِفْهَام', translit: 'Istifhaam', id: 'Pertanyaan' },
      { ar: 'أَمْر', translit: 'Amr', id: 'Perintah' },
      { ar: 'نِدَاء', translit: 'Nidaa\'', id: 'Panggilan' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Bagaimana tren melodi suara pada kalimat tanya Arab (Istifham)?',
        options: [
          { text: 'Nada suara terangkat naik untuk mengundang respon lawan bicara', isCorrect: true, feedback: 'Shahih! Nada naik mencirikan pertanyaan yang membutuhkan klarifikasi.' },
          { text: 'Nada suara turun datar sedatar-datarnya', isCorrect: false, feedback: 'Nada datar lebih cocok untuk kalimat berita (khabari).' }
        ]
      }
    ]
  },

  // KLM-L2-02: Melafalkan Dzikir & Doa Harian dengan Tajwid Presisi
  'KLM-L2-02': {
    explanation: {
      conceptTitle: 'Kekhusyukan Lisan: Dzikir, Doa & Keindahan Tajwid Harian',
      overview: 'Melafalkan doa dan dzikir harian adalah sarana latihan fonetik spiritual tertinggi. Setiap huruf dibersihkan makhrajnya untuk menghadirkan ketenangan jiwa.',
      rules: [
        {
          title: 'Lafadz Jalalah (الله): Tafkhim vs Tarqiq',
          explanation: 'Ditebalkan (tafkhim) jika didahului fathah atau dhammah (Subhanallaah, Nasrullaah), dan ditipiskan (tarqiq) jika didahului kasrah (Bismillaah, Alhamdulillaah).',
          exampleAr: 'سُبْحَانَ اللَّهِ (tebal) vs بِسْمِ اللَّهِ (tipis)',
          exampleTranslit: 'Subhaanallaah vs Bismillaah',
          exampleId: 'Hukum lafadz Jalalah'
        },
        {
          title: 'Doa Memohon Ilmu: Rabbi Zidnii \'Ilmaa',
          explanation: 'Perhatikan huruf Ra tebal berharakat fathah, Ba bertasydid mantap, Zay berdesis jernih, Dal bersukun qalqalah ringan, dan \'Ain makhraj tengah tenggorokan.',
          exampleAr: 'رَبِّ زِدْنِي عِلْمًا وَارْزُقْنِي فَهْمًا',
          exampleTranslit: 'Rabbi zidnii \'ilman warzuqnii fahmaa',
          exampleId: 'Doa penuntut ilmu'
        }
      ],
      hudhudTips: 'Rasakan hembusan nafas yang tenang di dada saat mengucapkan dzikir. Ketenangan nafas membuat artikulasi tajwid terpelihara sempurna.'
    },
    highlightVocab: [
      { ar: 'تَسْبِيح', translit: 'Tasbiih', id: 'Penyucian (Subhanallah)' },
      { ar: 'تَحْمِيد', translit: 'Tahmiid', id: 'Pujian (Alhamdulillah)' },
      { ar: 'دُعَاء', translit: 'Du\'aa\'', id: 'Doa permohonan' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Kapan lafadz Jalalah "Allah" dilafalkan dengan suara tipis (Tarqiq)?',
        options: [
          { text: 'Ketika didahului oleh huruf berharakat kasrah (seperti Bismillaah)', isCorrect: true, feedback: 'Mumtaz! Kasrah mewajibkan tarqiq pada lam Jalalah.' },
          { text: 'Ketika didahului oleh harakat fathah', isCorrect: false, feedback: 'Fathah menjadikannya tebal (tafkhim).' },
          { text: 'Ketika berada di awal kalimat', isCorrect: false, feedback: 'Di awal kalimat dilafalkan tebal.' }
        ]
      }
    ]
  },

  // KLM-L2-03: Percakapan Transaksional Dua Arah & Kesantunan Lisan
  'KLM-L2-03': {
    explanation: {
      conceptTitle: 'Adab Berbicara: Transaksi Pasar & Interaksi Ramah Sopan',
      overview: 'Di Pulau Kalam dan Pasar Mufradat, berbicara bukan sekadar bertukar informasi, melainkan mempraktikkan etika kesantunan Timur Tengah (Luṭful Mu\'āmalah).',
      rules: [
        {
          title: 'Ungkapan Permintaan Sopan (Min Fadhlik / Law Samaht)',
          explanation: 'Gunakan ungkapan penghormatan sebelum mengajukan permintaan harga atau barang agar suasana hangat dan akrab.',
          exampleAr: 'مِنْ فَضْلِكَ، بِكَمْ هَذَا الكِتَابُ؟',
          exampleTranslit: 'Min fadhlik, bikam haadzal kitaab?',
          exampleId: 'Tanya harga sopan'
        },
        {
          title: 'Respon Penjual & Pembeli (Tafaddhal & Shukran)',
          explanation: 'Lafalkan "Tafaddhal" (silakan) dengan huruf Dhad tepi lidah yang fasih dan intonasi mempersilakan.',
          exampleAr: 'تَفَضَّلْ يَا أَخِي، هَذَا طَلَبُكَ',
          exampleTranslit: 'Tafaddhal yaa akhii, haadzaa thalabuk',
          exampleId: 'Mempersilakan ramah'
        }
      ],
      hudhudTips: 'Gunakan kata ganti kehormatan "Hadhratukum" atau "Yaa Akhi / Yaa Ukhti" untuk menciptakan rasa persaudaraan yang erat.'
    },
    highlightVocab: [
      { ar: 'مِنْ فَضْلِكَ', translit: 'Min fadhlik', id: 'Tolong / silakan' },
      { ar: 'تَفَضَّلْ', translit: 'Tafaddhal', id: 'Silakan ambil / masuk' },
      { ar: 'عَفْوًا', translit: '\'Afwan', id: 'Sama-sama / maaf' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Ungkapan manakah yang paling santun digunakan saat meminta bantuan atau menanyakan sesuatu kepada orang lain?',
        options: [
          { text: 'مِنْ فَضْلِكَ (Min fadhlik)', isCorrect: true, feedback: 'Tepat sekali! Min fadhlik berarti "dengan kebaikan budimu" (please / mohon bantuan).' },
          { text: 'أَعْطِنِي فَوْرًا (A\'thinii fawran)', isCorrect: false, feedback: 'Ungkapan ini terkesan memaksa dan kurang sopan.' }
        ]
      }
    ]
  },

  // KLM-L3-01: Pidato Singkat (Khitabah) & Presentasi Diri Fasih (Thalaqah Lanjut)
  'KLM-L3-01': {
    explanation: {
      conceptTitle: 'Khitabah Awal: Struktur Pidato & Presentasi Diri Berwibawa',
      overview: 'Di hadapan Syaikh Balaghah di Amfiteater Pulau Kalam, murid tingkat mutawassith belajar menyusun dan menyampaikan monolog presentasi diri dengan pembukaan tahmid dan penutup doa.',
      rules: [
        {
          title: 'Muqaddimah Pembuka Khitabah',
          explanation: 'Awali dengan kalimat pujian kepada Allah dan shalawat dengan nada tenang, tegas, dan menatap pandangan pendengar.',
          exampleAr: 'الحَمْدُ لِلَّهِ رَبِّ العَالَمِينَ، وَالصَّلَاةُ وَالسَّلَامُ عَلَى نَبِيِّنَا مُحَمَّدٍ',
          exampleTranslit: 'Al-hamdu lillaahi Rabbil \'aalamiin, wash-shalaatu was-salaamu \'alaa nabiyyinaa Muhammad',
          exampleId: 'Muqaddimah standar'
        },
        {
          title: 'Perkenalan Identitas & Misi Belajar',
          explanation: 'Sampaikan nama, asal, dan ketertarikan mempelajari lisan Arab tanpa melihat catatan terus-menerus.',
          exampleAr: 'اِسْمِي أَحْمَدُ، وَجِئْتُ إِلَى هَذِهِ الجَزِيرَةِ لِأَتَعَلَّمَ لُغَةَ القُرْآنِ الكَرِيم',
          exampleTranslit: 'Ismii Ahmad, wa ji\'tu ilaa haadzihil jaziirati li-ata\'allama lughatal Qur\'aanil Kariim',
          exampleId: 'Presentasi diri fasih'
        }
      ],
      hudhudTips: 'Ambil nafas dalam-dalam sebelum kalimat pertama dimulai. Berdiri tegak dan proyeksikan suaramu ke baris paling belakang audiens!'
    },
    highlightVocab: [
      { ar: 'خُطْبَة', translit: 'Khutbah', id: 'Pidato / orasi' },
      { ar: 'خَطِيب', translit: 'Khatiib', id: 'Orator pembicara' },
      { ar: 'مُقَدِّمَة', translit: 'Muqaddimah', id: 'Pembukaan pidato' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Apakah struktur pertama yang wajib ada dalam pidato resmi bahasa Arab (Khitabah)?',
        options: [
          { text: 'Muqaddimah berisi pujian kepada Allah dan shalawat', isCorrect: true, feedback: 'Mumtaz! Adab khitabah Arab selalu diawali dengan hamdalah dan shalawat.' },
          { text: 'Langsung membacakan kesimpulan di detik pertama', isCorrect: false, feedback: 'Itu melanggar adab retorika khitabah.' }
        ]
      }
    ]
  },

  // KLM-L3-02: Deskripsi Spontan Objek & Lingkungan Sekitar (Wasf al-Asyya')
  'KLM-L3-02': {
    explanation: {
      conceptTitle: 'Wasf al-Asyya\': Deskripsi Spontan Objek & Lingkungan',
      overview: 'Kecakapan berbicara mandiri teruji saat mendeskripsikan apa yang dilihat panca indera secara spontan menggunakan kata sifat, warna, ukuran, dan fungsi.',
      rules: [
        {
          title: 'Struktur Deskriptif: Isim + Sifat + Fungsi',
          explanation: 'Sebutkan bendanya, susulkan dengan na\'at sifatnya (warna, bentuk), lalu jelaskan kegunaannya dalam kehidupan.',
          exampleAr: 'هَذِهِ شَاشَةٌ ذَكِيَّةٌ كَبِيرَةٌ، نَسْتَخْدِمُهَا لِلتَّعَلُّمِ وَالبَحْثِ',
          exampleTranslit: 'Haadzihil syaasyatun dzakiyyatun kabiirah, nasta\'khdimuhaa lit-ta\'allum wal-bahts',
          exampleId: 'Deskripsi objek modern'
        },
        {
          title: 'Deskripsi Tempat: Ruangan Madrasah / Amfiteater',
          explanation: 'Gunakan kata tunjuk arah (huna, hunaka, amama, wara\'a) untuk memandu imajinasi pendengar.',
          exampleAr: 'أَمَامَنَا مَسْرَحٌ وَاسِعٌ، وَحَوْلَنَا أَشْجَارُ نَخِيلٍ بَاسِقَة',
          exampleTranslit: 'Amaamanaa masrahun waasi\', wa hawlanaa asyjaaru nakhiilin baasiqah',
          exampleId: 'Deskripsi panorama alam'
        }
      ],
      hudhudTips: 'Jika lupa sebuah kata benda spesifik, jangan diam! Jelaskan fungsinya dengan kalimat: "Huwa syay\'un nasta\'miluhu li..." (Itu benda yang kita gunakan untuk...).'
    },
    highlightVocab: [
      { ar: 'وَصْف', translit: 'Washf', id: 'Deskripsi / penggambaran' },
      { ar: 'أَمَامَ', translit: 'Amaama', id: 'Di depan' },
      { ar: 'حَوْلَ', translit: 'Hawla', id: 'Di sekitar' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Strategi apa yang paling tepat jika kita lupa kosakata spesifik suatu benda saat berbicara lisan?',
        options: [
          { text: 'Mendeskripsikan fungsi atau ciri-ciri bendanya dengan kalimat pengganti', isCorrect: true, feedback: 'Hebat! Inilah strategi komunikasi lingual (Circumlocution) yang sangat efektif.' },
          { text: 'Berhenti berbicara sama sekali dan membatalkan percakapan', isCorrect: false, feedback: 'Itu akan memutus aliran komunikasi.' }
        ]
      }
    ]
  },

  // KLM-L3-03: Artikulasi Waqaf, Washal, dan Ibtida' dalam Monolog Arab
  'KLM-L3-03': {
    explanation: {
      conceptTitle: 'Kaidah Jeda Lisan: Waqaf (Berhenti), Washal (Sambung), dan Ibtida\' (Mulai)',
      overview: 'Penutur Arab yang elegan tahu kapan harus menyambung kata dengan hamzah washal dan di mana harus berhenti mengambil nafas tanpa merusak hubungan gramatikal.',
      rules: [
        {
          title: 'Peleburan Hamzah Washal saat Menyambung (Washal)',
          explanation: 'Ketika kata diawali hamzah washal (seperti isim maushul al-ladzi atau fi\'il amr iqra\') berada di tengah kalimat, hamzah tidak dibaca.',
          exampleAr: 'قَالَ اشْرَبْ (dibaca: Qaalasy-rab, bukan Qaala Isyrab)',
          exampleTranslit: 'Qaalasy-rab',
          exampleId: 'Peleburan hamzah washal'
        },
        {
          title: 'Waqaf pada Titik Pemikiran Sempurna (Al-Waqf At-Tamm)',
          explanation: 'Berhentilah pada akhir klausul kalimat yang maknanya sudah tuntas. Jangan berhenti di antara mudhaf dan mudhaf ilaih atau fi\'il dan fa\'il.',
          exampleAr: 'جَاءَ الطَّالِبُ... (jeda wajar) ...وَحَمَلَ كِتَابَهُ',
          exampleTranslit: 'Jaa\'at-thaalib ... wa hamala kitaabah',
          exampleId: 'Waqaf yang menyehatkan makna'
        }
      ],
      hudhudTips: 'Bernafaslah pada tanda koma dan titik khayali. Jeda nafas 1 detik memberi waktu bagi pendengar untuk mencerna bobot kalimatmu.'
    },
    highlightVocab: [
      { ar: 'وَقْف', translit: 'Waqf', id: 'Berhenti / jeda' },
      { ar: 'وَصْل', translit: 'Washl', id: 'Penyambungan kata' },
      { ar: 'اِبْتِدَاء', translit: 'Ibtidaa\'', id: 'Memulai kembali ujaran' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Bagaimana cara membaca frasa "قَالَ" bertemu "اِقْرَأْ" secara washal (tersambung alami)?',
        options: [
          { text: 'Qo-laq-ro\' (قَالَ اقْرَأْ - hamzah washal lebur)', isCorrect: true, feedback: 'Mumtaz! Hamzah washal lebur ketika tersambung dengan kata sebelumnya.' },
          { text: 'Qo-la I-qro\' (terputus kaku)', isCorrect: false, feedback: 'Itu menyalahi kaidah washal Arab fasih.' }
        ]
      }
    ]
  },

  // KLM-L4-01: Narasi Kisah & Hikmah Klasik (Sard al-Qishash) Berintonasi Emosional
  'KLM-L4-01': {
    explanation: {
      conceptTitle: 'Sard al-Qishash: Seni Bercerita Fabel & Hikmah Arab',
      overview: 'Bercerita (Storytelling) menuntut perubahan nada bicara: suara lembut saat menggambarkan malam sunyi, nada cepat saat ada ketegangan, dan nada hikmah di akhir cerita.',
      rules: [
        {
          title: 'Frasa Pembuka Dongeng: Kaana Yaa Maa Kaana',
          explanation: 'Gunakan frasa pembuka legendaris Arab untuk memikat imajinasi: "كَانَ يَا مَا كَانَ فِي قَدِيمِ الزَّمَان..." (Pada suatu hari di masa silam...).',
          exampleAr: 'كَانَ يَا مَا كَانَ، فِي قَدِيمِ الزَّمَانِ، طَائِرٌ صَغِيرٌ حَكِيمٌ...',
          exampleTranslit: 'Kaana yaa maa kaana, fii qadiimiz-zamaan, thaa\'irun shaghiirun hakiim...',
          exampleId: 'Pembuka dongeng Arab'
        },
        {
          title: 'Modulasi Vokal Dialog Antar Tokoh',
          explanation: 'Bedakan nada suara sang singa yang berwibawa berat dengan suara si kancil/burung yang lincah cerdik.',
          exampleAr: 'قَالَ الأَسَدُ بِصَوْتٍ قَوِيٍّ: أَنَا مَلِكُ الغَابَة!',
          exampleTranslit: 'Qaalal asadu bi-shawtin qawiyyin: Anaa malikul ghaabah!',
          exampleId: 'Dialog tokoh fabel'
        }
      ],
      hudhudTips: 'Gunakan jeda dramatis (suspense pause) tepat sebelum klimaks cerita terungkap untuk membuat pendengarmu penasaran!'
    },
    highlightVocab: [
      { ar: 'سَرْد', translit: 'Sard', id: 'Narasi penceritaan' },
      { ar: 'قِصَّة', translit: 'Qishshah', id: 'Kisah / cerita' },
      { ar: 'عِبْرَة', translit: '\'Ibrah', id: 'Pelajaran moral / hikmah' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Apakah fungsi utama modulasi vokal (perubahan tinggi-rendah suara) dalam mendongeng bahasa Arab?',
        options: [
          { text: 'Menghidupkan karakter tokoh dan emosi adegan cerita', isCorrect: true, feedback: 'Shahih! Modulasi vokal membawa pendengar masuk ke dalam dunia cerita.' },
          { text: 'Menyamarkan kesalahan tata bahasa agar tidak disadari', isCorrect: false, feedback: 'Tata bahasa tetap harus dijaga keakuratannya.' }
        ]
      }
    ]
  },

  // KLM-L4-02: Debat & Diskusi Opini Terbuka Santun (Hiwar Jadal Mu'addab)
  'KLM-L4-02': {
    explanation: {
      conceptTitle: 'Munazharah Mu\'addabah: Debat Ilmiah & Sanggahan Diplomatis',
      overview: 'Di mimbar diskusi, adab berdebat (Adab al-Hiwar wal-Jadal) mengajarkan cara menyetujui dengan dalil atau menyanggah dengan tutur kata yang memuliakan martabat lawan bicara.',
      rules: [
        {
          title: 'Ungkapan Persetujuan: Uwaafiquka ar-Ra\'y',
          explanation: 'Sampaikan rasa sepakat dengan elegan sebelum menambahkan poin penguat.',
          exampleAr: 'أُوَافِقُكَ الرَّأْيَ فِي هَذِهِ النُّقْطَةِ، وَلَكِنْ هُنَاكَ جَانِبٌ آخَر...',
          exampleTranslit: 'Uwaafiqukar-ra\'ya fii haadzihin-nuqthah, wa laakin hunaaka jaanibun aakhar...',
          exampleId: 'Persetujuan sebagian'
        },
        {
          title: 'Sanggahan Santun: Ma\'a Ihtiraamii li-Wajhati Nazharik',
          explanation: 'Awali sanggahan dengan rasa hormat: "Dengan segala rasa hormat pada sudut pandangmu, menurut hemat saya...".',
          exampleAr: 'مَعَ احْتِرَامِي لِوَجْهَةِ نَظَرِكَ، أَرَى أَنَّ الأَمْرَ يَحْتَاجُ دَلِيلًا إِضَافِيًّا',
          exampleTranslit: 'Ma\'a ihtiraamii li-wajhati nazharik, araa annal amra yahtaaju daliilan idhaafiyyan',
          exampleId: 'Sanggahan diplomatis'
        }
      ],
      hudhudTips: 'Kendalikan volume suara saat menyanggah. Kemenangan debat ditentukan oleh kekuatan argumen (Hujjah), bukan oleh kerasnya teriakan.'
    },
    highlightVocab: [
      { ar: 'مُنَاظَرَة', translit: 'Munaazharah', id: 'Debat ilmiah terstruktur' },
      { ar: 'حُجَّة', translit: 'Hujjah', id: 'Argumen / dalil pembuktian' },
      { ar: 'اِتِّفَاق', translit: 'Ittifaaq', id: 'Kesepakatan pandangan' },
      { ar: 'اخْتِلَاف', translit: 'Ikhtilaaf', id: 'Perbedaan sudut pandang' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Manakah ungkapan yang paling elegan dalam bahasa Arab untuk menyatakan sanggahan pendapat tanpa menyinggung lawan bicara?',
        options: [
          { text: 'مَعَ احْتِرَامِي لِوَجْهَةِ نَظَرِكَ (Dengan rasa hormat pada sudut pandangmu)', isCorrect: true, feedback: 'Mumtaz! Ungkapan ini menunjukkan adab intelektual yang sangat tinggi.' },
          { text: 'كَلَامُكَ كُلُّهُ خَاطِئٌ (Bicara kamu semuanya salah)', isCorrect: false, feedback: 'Ini kalimat kasar yang melanggar adab berdialog.' }
        ]
      }
    ]
  },

  // KLM-L4-03: Pengucapan Peribahasa (Amsal & Hikam) dengan Ritme Sajak Balaghah
  'KLM-L4-03': {
    explanation: {
      conceptTitle: 'Amsal & Hikam: Pelafalan Peribahasa Arab Bersajak (Saja\')',
      overview: 'Peribahasa Arab (Amsal Sya\'biyyah & Hikam Nabawiyyah) memiliki rima musikal di ujungnya. Melafalkannya dengan ketukan yang tepat mencerminkan kematangan apresiasi sastra lisan.',
      rules: [
        {
          title: 'Ketukan Sajak Berimbang (Saja\' Mutawazi)',
          explanation: 'Perhatikan rima bunyi akhir yang berirama sama: Man jadda wajada, wa man zara\'a hasada.',
          exampleAr: 'مَنْ جَدَّ وَجَدَ، وَمَنْ زَرَعَ حَصَدَ',
          exampleTranslit: 'Man jadda wajada, wa man zara\'a hashada',
          exampleId: 'Sajak peribahasa kesungguhan'
        },
        {
          title: 'Amsal Waktu: Al-Waqtu kas-Sayf',
          explanation: 'Lafalkan dengan tempo tegas penuh peringatan agar maknanya meresap ke sanubari pendengar.',
          exampleAr: 'الوِقْتُ كَالسَّيْفِ، إِنْ لَمْ تَقْطَعْهُ قَطَعَكَ',
          exampleTranslit: 'Al-waqtu kas-sayfi, in lam taqtha\'hu qatha\'ak',
          exampleId: 'Peribahasa pedang waktu'
        }
      ],
      hudhudTips: 'Beri sedikit penekanan dinamik pada kata kerja terakhir dari tiap sajak untuk menandai kesempurnaan ketukan rima.'
    },
    highlightVocab: [
      { ar: 'مَثَل', translit: 'Matsal', id: 'Peribahasa / perumpamaan' },
      { ar: 'حِكْمَة', translit: 'Hikmah', id: 'Kata mutiara bijak' },
      { ar: 'سَجْع', translit: 'Saj\'', id: 'Rima sajak prosa berirama' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Apakah nama keindahan bahasa Arab di mana dua penggalan kalimat memiliki kesamaan bunyi huruf akhir (rima prosa)?',
        options: [
          { text: 'Saja\' (السَّجْع)', isCorrect: true, feedback: 'Tepat sekali! Saja\' adalah seni keselarasan bunyi akhir yang memberi irama musikal pada tuturan.' },
          { text: 'Tarqim (التَّرْقِيم)', isCorrect: false, feedback: 'Tarqim adalah tanda baca tulisan, bukan sajak lisan.' }
        ]
      }
    ]
  },

  // KLM-L5-01: Orasi Mimbar Agung (Al-Khitabah Al-Minbariyyah) & Retorika Persuasi
  'KLM-L5-01': {
    explanation: {
      conceptTitle: 'Al-Khitabah Al-Minbariyyah: Orasi Akbar & Persuasi Audiens',
      overview: 'Puncak kemahiran berbicara di Amfiteater Pulau Kalam adalah orasi mimbar agung. Orator memadukan wibawa vokal, kontak mata menyeluruh, dan retorika persuasif yang menyentuh akal dan hati.',
      rules: [
        {
          title: 'Gaya Orasi Persuasif (Taqrib & Tarhib)',
          explanation: 'Gunakan variasi intonasi: ajakan yang penuh harapan (targhib) dilafalkan dengan suara lembut memikat, sedangkan peringatan (tahdzir) dilafalkan dengan tegas menggema.',
          exampleAr: 'أَيُّهَا النَّاسُ، اتَّقُوا اللهَ وَكُونُوا مَعَ الصَّادِقِينَ!',
          exampleTranslit: 'Ayyuhan-naas, ittaqullaaha wa kuunuu ma\'ash-shaadiqiin!',
          exampleId: 'Seruan mimbar'
        },
        {
          title: 'Khatimah Pidato yang Membekas di Jiwa',
          explanation: 'Tutup orasi dengan rangkuman doa yang khusyuk dan salam penutup agung.',
          exampleAr: 'أَقُولُ قَوْلِي هَذَا وَأَسْتَغْفِرُ اللهَ لِي وَلَكُمْ، وَالسَّلَامُ عَلَيْكُمْ...',
          exampleTranslit: 'Aquulu qawlii haadzaa wa astaghfirullaaha lii wa lakum...',
          exampleId: 'Khatimah orasi klasik'
        }
      ],
      hudhudTips: 'Seorang khatib sejati tidak sekadar bersuara, tetapi mengalirkan ketulusan hati melalui getaran lisannya.'
    },
    highlightVocab: [
      { ar: 'مِنْبَر', translit: 'Minbar', id: 'Mimbar orasi tinggi' },
      { ar: 'إِقْنَاع', translit: 'Iqnaa\'', id: 'Persuasi meyakinkan audiens' },
      { ar: 'خَاتِمَة', translit: 'Khaatimah', id: 'Penutup pidato' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Unsur apakah yang membedakan orasi mimbar agung (Khitabah Minbariyyah) dengan pidato biasa?',
        options: [
          { text: 'Kekuatan persuasi, proyeksi vokal agung, dan sentuhan spiritual-moral', isCorrect: true, feedback: 'Mumtaz! Inilah jiwa sejati dari orasi mimbar bahasa Arab.' },
          { text: 'Penggunaan bahasa santai dan dialek pasar bebas', isCorrect: false, feedback: 'Orasi mimbar menggunakan bahasa Arab fusha tingkat tinggi.' }
        ]
      }
    ]
  },

  // KLM-L5-02: Wawancara Spontan & Respon Cepat Bahasa Arab Fusha (Masyhad Muqabalah)
  'KLM-L5-02': {
    explanation: {
      conceptTitle: 'Muqabalah \'Afwiyyah: Kecepatan Berpikir & Respon Spontan Fusha',
      overview: 'Ujian tertinggi seorang penutur mahir (Mutamayyiz) adalah menghadapi wawancara spontan tanpa persiapan naskah sebelumnya, merangkai jawaban fusha secara instan dan logis.',
      rules: [
        {
          title: 'Teknik Menghubungkan Pikiran (Filler Fusha Santun)',
          explanation: 'Hindari jeda hening atau bergumam "eee...". Gunakan kata penghubung alami seperti "Fi l-haqiiqah..." (Sebenarnya...), "Mimmaa laa syakka fiihi..." (Tak diragukan lagi...).',
          exampleAr: 'فِي الحَقِيقَةِ، هَذَا سُؤَالٌ جَوْهَرِيٌّ يَسْتَحِقُّ التَّأَمُّل...',
          exampleTranslit: 'Fil-haqiiqati, haadzaa su\'aalun jawhariyyun yastahiqqut-ta\'ammul...',
          exampleId: 'Jembatan berpikir fusha'
        },
        {
          title: 'Sintesis Jawaban Berstruktur (Awal - Argumen - Kesimpulan)',
          explanation: 'Jawab langsung inti pertanyaan dalam 1 kalimat, berikan contoh nyata, lalu simpulkan dengan mantap.',
          exampleAr: 'خُلَاصَةُ القَوْلِ: اللُّغَةُ العَرَبِيَّةُ لَيْسَتْ مُجَرَّدَ كَلِمَاتٍ، بَلْ هِيَ هُوِيَّةٌ وَحَضَارَة',
          exampleTranslit: 'Khulaashatul qawl: Al-lughatul \'arabiyyatu laysat mujarrada kalimaat, bal hiya huwiyyatun wa hadhaarah',
          exampleId: 'Kesimpulan wawancara'
        }
      ],
      hudhudTips: 'Tarik nafas saat pewawancara selesai berbicara. Satu detik hening yang tenang jauh lebih berwibawa daripada gumaman terbata-bata.'
    },
    highlightVocab: [
      { ar: 'مُقَابَلَة', translit: 'Muqaabalah', id: 'Wawancara resmi' },
      { ar: 'عَفْوِيّ', translit: '\'Afwiyy', id: 'Spontan tanpa naskah' },
      { ar: 'خُلَاصَة', translit: 'Khulaashah', id: 'Intisari / kesimpulan' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Apa strategi terbaik saat membutuhkan jeda 1-2 detik untuk memikirkan jawaban dalam wawancara bahasa Arab baku?',
        options: [
          { text: 'Menggunakan frasa pembuka santun seperti "Fi l-haqiiqah..." (Sebenarnya...)', isCorrect: true, feedback: 'Tepat sekali! Ini memberi waktu otak menyusun kalimat tanpa merusak kefasihan.' },
          { text: 'Mengeluarkan bunyi gumaman panjang tanpa arti', isCorrect: false, feedback: 'Gumaman mengurangi keanggunan kefasihan lisan.' }
        ]
      }
    ]
  },

  // KLM-L5-03: Sastra Lisan, Pembacaan Puisi (Insyad Syi'ir) & Vokalisasi Bahr Arab
  'KLM-L5-03': {
    explanation: {
      conceptTitle: 'Insyad asy-Syi\'ir: Sastra Lisan & Musikalitas Metrum Puisi (Bahr)',
      overview: 'Syair adalah mahkota tertinggi seni lisan bangsa Arab (Diwanul \'Arab). Membaca puisi menuntut kepekaan terhadap wazan metrum bahr dan penekanan rima akhir (qafiyah).',
      rules: [
        {
          title: 'Ketukan Metrum Bahr (Taf\'ilat)',
          explanation: 'Bait syair terbagi menjadi dua belahan (syathr awal & syathr tsani). Setiap belahan memiliki ketukan musikal yang mengayun teratur (seperti Bahr Thawil, Kamil, atau Basith).',
          exampleAr: 'إِذَا الشَّعْبُ يَوْمًا أَرَادَ الحَيَاة * فَلَا بُدَّ أَنْ يَسْتَجِيبَ القَدَر',
          exampleTranslit: 'Idzasy-sya\'bu yawman araadal hayaah * Fa-laa budda an yastajiibal qadar',
          exampleId: 'Bait syair kebangkitan jiwa'
        },
        {
          title: 'Kaidah Rima Akhir (Qafiyah & Rawiyy)',
          explanation: 'Huruf rawiyy di ujung bait disuarakan dengan pantulan resonansi yang indah dan stabil di setiap pergantian bait.',
          exampleAr: 'وَلَا بُدَّ لِلَّيْلِ أَنْ يَنْجَلِي * وَلَا بُدَّ لِلْقَيْدِ أَنْ يَنْكَسِر',
          exampleTranslit: 'Wa laa budda lil-layli an yanjalii * Wa laa budda lil-qaydi an yankasir',
          exampleId: 'Rima rawiyy huruf ra'
        }
      ],
      hudhudTips: 'Bayangkan dirimu sedang melantunkan melodi gurun pasir di malam purnama. Rasakan detak jantung bait syair mengalir di ujung lidahmu!'
    },
    highlightVocab: [
      { ar: 'شِعْر', translit: 'Syi\'r', id: 'Puisi syair klasik' },
      { ar: 'إِنْشَاد', translit: 'Insyaad', id: 'Lantunan pembacaan puisi bernada' },
      { ar: 'بَحْر', translit: 'Bahr', id: 'Metrum timbangan irama syair' },
      { ar: 'قَافِيَة', translit: 'Qaafiyah', id: 'Rima akhir sajak' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Apakah sebutan bagi pola ketukan irama berulang yang menjadi acuan musikalitas dalam puisi Arab klasik?',
        options: [
          { text: 'Bahr asy-Syi\'ir (بَحْرُ الشِّعْر)', isCorrect: true, feedback: 'Mumtaz! Bahr adalah lautan metrum wazan yang digagas oleh Imam Al-Khalil bin Ahmad Al-Farahidi.' },
          { text: 'Qawa\'id an-Nahw (قَوَاعِدُ النَّحْو)', isCorrect: false, feedback: 'Nahwu adalah tata bahasa, bukan pola metrum musik syair.' }
        ]
      }
    ]
  },

  // 9. MFR: 36 Dedicated Thematic Skills (L0–L5)
  ...MFR_DEDICATED_PEDAGOGY,

  // 11. IST: 17 Dedicated Listening & Phonemic Skills (L0–L5)
  ...IST_DEDICATED_PEDAGOGY,

  // 13. QRA-L1-01: Membaca Kata Bertanda Harakat Lengkap
  'QRA-L1-01': {
    explanation: {
      conceptTitle: 'Membaca Kalimat Pendek Berharakat Lengkap',
      overview: 'Di Perpustakaan Qira\'ah, kita membuka lembaran naskah pertama! Membaca bahasa Arab diawali dengan melafalkan setiap suku kata secara menyambung tanpa tersendat.',
      rules: [
        {
          title: 'Kombinasi Fathah, Kasrah, dan Dhammah',
          explanation: 'Lafalkan tiap vokal dengan sempurna: Fathah (A), Kasrah (I), Dhammah (U). Jangan memanjangkan huruf kecuali ada huruf Mad (Alif, Wawu, Ya).',
          exampleAr: 'كَتَبَ زَيْدٌ دَرْسَهُ',
          exampleTranslit: 'Kataba Zaydun Darsahu',
          exampleId: 'Zaid telah menulis pelajarannya'
        },
        {
          title: 'Membaca Tanwin di Akhir Kata',
          explanation: 'Tanwin (ـٌ ـٍ ـً) menghasilkan bunyi nun mati di ujung kata, menandakan kata benda berdiri sendiri (nakirah).',
          exampleAr: 'كِتَابٌ جَدِيدٌ (Sebuah buku baru)',
          exampleTranslit: 'Kitaabun Jadiidun',
          exampleId: 'Frasa sifat dan benda'
        }
      ],
      hudhudTips: 'Membaca dengan harakat lengkap bagaikan berjalan di jalan bertabur lentera terang benderang!'
    },
    highlightVocab: [
      { ar: 'كِتَابٌ جَدِيدٌ', translit: 'Kitaabun Jadiid', id: 'Sebuah buku yang baru' },
      { ar: 'مَدْرَسَةٌ كَبِيرَةٌ', translit: 'Madrasatun Kabiirah', id: 'Gedung sekolah yang besar' },
      { ar: 'قَلَمٌ جَمِيلٌ', translit: 'Qalamun Jamiil', id: 'Pena yang indah' },
      { ar: 'وَلَدٌ نَشِيطٌ', translit: 'Waladun Nasyiith', id: 'Anak laki-laki yang rajin' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Bagaimana cara membaca frasa: كِتَابٌ جَدِيدٌ dengan benar dan tepat harakatnya?',
        options: [
          { text: 'Kitaabun Jadiidun (Sebuah buku yang baru)', isCorrect: true, feedback: 'Tepat sekali! Keduanya bertanwin dhommatain.' },
          { text: 'Kataba Jadiida', isCorrect: false, feedback: 'Harakatnya keliru.' }
        ]
      },
      {
        id: 'q2',
        question: 'Kapan suatu huruf harus dibaca PANJANG 2 harakat?',
        options: [
          { text: 'Saat huruf berharakat bertemu huruf Mad (Alif, Wawu sukun, atau Ya sukun)', isCorrect: true, feedback: 'Mumtaz! Itu adalah kaidah Mad Thabi\'i.' },
          { text: 'Saat huruf berada di awal kata', isCorrect: false, feedback: 'Posisi awal kata tidak otomatis menjadikannya panjang.' }
        ]
      }
    ]
  },

  // 14. QRA-L2-01: Membaca Kalimat Berpreposisi Jar-Majrur
  'QRA-L2-01': {
    explanation: {
      conceptTitle: 'Membaca Kalimat Berpreposisi (Jar-Majrur)',
      overview: 'Membaca naskah yang memuat kata depan penunjuk ruang dan waktu: فِي (di dalam), عَلَى (di atas), إِلَى (ke arah), dan مِنْ (dari).',
      rules: [
        {
          title: 'Efek Preposisi pada Kata Sesudahnya',
          explanation: 'Kata benda setelah preposisi wajib dibaca berkasrah di huruf terakhirnya (disebut isim majrur).',
          exampleAr: 'الوَلَدُ فِي المَسْجِدِ (Anak itu di dalam masjid)',
          exampleTranslit: 'Al-waladu fii l-masjidi',
          exampleId: 'Perhatikan kasrah pada al-masjid'
        },
        {
          title: 'Sambungan Alif Lam (Washal)',
          explanation: 'Saat membaca "fii" bertemu "al-masjidi", vokal panjang melebur langsung menyambung ke huruf Lam: "fil-masjidi".',
          exampleAr: 'عَلَى المَكْتَبِ (Di atas meja)',
          exampleTranslit: '\'Ala l-maktabi (dibaca \'alal-maktabi)',
          exampleId: 'Lancar mengalir'
        }
      ],
      hudhudTips: 'Perhatikan Alif Lam: Jika Lam ada sukun (Qamariyah), bunyikan huruf L jelas! Jika huruf sesudahnya bertasydid (Syamsiyah), langsung lompat ke huruf tersebut!'
    },
    highlightVocab: [
      { ar: 'فِي المَسْجِدِ', translit: 'Fii l-masjidi', id: 'Di dalam masjid' },
      { ar: 'عَلَى المَكْتَبِ', translit: '\'Ala l-maktabi', id: 'Di atas meja' },
      { ar: 'إِلَى المَدْرَسَةِ', translit: 'Ila l-madrasati', id: 'Menuju ke sekolah' },
      { ar: 'مِنَ البَيْتِ', translit: 'Mina l-bayti', id: 'Keluar dari rumah' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Perhatikan kalimat: "الكِتَابُ عَلَى المَكْتَبِ". Mengapa kata "المَكْتَبِ" berharakat kasrah di akhir?',
        options: [
          { text: 'Karena didahului kata depan preposisi عَلَى (Harf Jar)', isCorrect: true, feedback: 'Benar sekali! Preposisi jar menyebabkan kata sesudahnya majrur bi-kasrah.' },
          { text: 'Karena kata itu adalah kata kerja lampau', isCorrect: false, feedback: 'Bukan, al-maktab adalah kata benda (meja).' }
        ]
      },
      {
        id: 'q2',
        question: 'Di manakah posisi anak dalam kalimat: "الوَلَدُ فِي الحَدِيقَةِ"?',
        options: [
          { text: 'Di dalam taman (Al-Hadiiqah)', isCorrect: true, feedback: 'Tepat! Hadiiqah artinya kebun atau taman.' },
          { text: 'Di atas atap rumah', isCorrect: false, feedback: 'Atap adalah as-sath.' }
        ]
      }
    ]
  },

  // 15. TMH: 12 Dedicated Integrated Graduation Exam & Rutbah Skills (L0–L5)
  ...TMH_DEDICATED_PEDAGOGY
};

// -------------------------------------------------------------
// DYNAMIC INTELLIGENT PEDAGOGICAL GENERATOR FOR ALL OTHER SKILLS
// -------------------------------------------------------------

export function getSkillPedagogy(skillOrId: SkillItem | string): EnrichedSkillPedagogy {
  if (!skillOrId) {
    return {
      explanation: {
        conceptTitle: 'Modul Pembelajaran',
        overview: 'Materi pembelajaran bahasa Arab terpadu.',
        rules: [],
        hudhudTips: 'Ulangi latihan untuk memperkuat pemahamanmu.',
        keyVocabOrPhrases: []
      },
      questions: [],
      highlightVocab: []
    };
  }

  const skillId = typeof skillOrId === 'string' ? skillOrId : (skillOrId.skill_id || (skillOrId as any).id);

  // 1. Check if we have an explicit dedicated lesson
  if (skillId && DEDICATED_PEDAGOGY_MAP[skillId]) {
    return DEDICATED_PEDAGOGY_MAP[skillId];
  }

  const skill: SkillItem = typeof skillOrId === 'string'
    ? (SKILLS_DATA.find(s => s.skill_id === skillOrId || (s as any).id === skillOrId) || {
        skill_id: skillOrId,
        owner_island: 'HRF',
        level: 0,
        name: skillOrId,
        description: 'Materi pembelajaran bahasa Arab',
        audience: 'AD',
        scope: 'Kaidah dasar'
      })
    : skillOrId;

  const islandInfo = getFriendlyIslandName(skill.owner_island);
  const levelInfo = getFriendlyLevel(skill.level);

  // 2. Filter truly relevant lexemes for this skill based on skill_id or category/domain
  const directLexemes = LEXICON_DATA.filter(l => l.skill_id === skill.skill_id);
  const islandLexemes = LEXICON_DATA.filter(l => l.owner_island === skill.owner_island && l.level <= skill.level + 1);

  const relevantLexemes = directLexemes.length > 0
    ? directLexemes
    : islandLexemes.length > 0
    ? islandLexemes.slice(0, 5)
    : LEXICON_DATA.slice(0, 4);

  // 3. Synthesize human-friendly concept overview & rules
  const conceptTitle = `Modul: ${skill.name}`;
  const overview = `${skill.description}. Di unit pembelajaran ${islandInfo.shortName} pada ${levelInfo.fullTitle} ini, kamu akan mempelajari kaidah dan praktik langsung secara bertahap tanpa tekanan.`;

  const rules = [
    {
      title: `Pilar Utama: ${skill.scope || skill.name}`,
      explanation: `Fokus pembelajaran materi ini melatih pemahaman dan penerapan langsung pada keterampilan ${islandInfo.focusArea.toLowerCase()}.`,
      exampleAr: relevantLexemes[0]?.ar_vocalized || 'تَعَلُّمٌ مُفِيدٌ',
      exampleTranslit: relevantLexemes[0]?.translit || 'Ta\'allumun Mufiidun',
      exampleId: relevantLexemes[0]?.gloss_id || 'Pembelajaran yang bermanfaat'
    },
    {
      title: 'Penerapan Kontekstual',
      explanation: 'Dengarkan pelafalan fasihnya dengan menekan ikon pengeras suara, perhatikan susunan katanya, lalu gunakan dalam latihan interaktif.',
      exampleAr: relevantLexemes[1]?.ar_vocalized || 'بَارَكَ اللَّهُ فِيكَ',
      exampleTranslit: relevantLexemes[1]?.translit || 'Baarakallahu Fiika',
      exampleId: relevantLexemes[1]?.gloss_id || 'Semoga Allah memberkahimu'
    }
  ];

  const hudhudTips = `Sahabat Hudhud membimbingmu: Ulangi mendengarkan audio kata 2-3 kali agar terekam kuat di memori jangka panjangmu!`;

  const highlightVocab = relevantLexemes.map(lex => ({
    ar: lex.ar_vocalized,
    translit: lex.translit,
    id: lex.gloss_id,
    note: lex.category || lex.pos
  }));

  // 4. Generate dynamic meaningful questions matching these relevant words
  const questions: PracticeQuestion[] = relevantLexemes.slice(0, 3).map((item, idx) => {
    // Pick distractors from other words in lexicon
    const otherWords = LEXICON_DATA.filter(l => l.id !== item.id);
    const dist1 = otherWords[(idx * 7 + 3) % otherWords.length]?.gloss_id || 'Buku tulis';
    const dist2 = otherWords[(idx * 11 + 5) % otherWords.length]?.gloss_id || 'Sekolah bersih';

    return {
      id: `dyn_q_${idx}`,
      question: `Apa arti yang paling tepat dari kata/frasa: "${item.ar_vocalized}" (${item.translit})?`,
      questionAr: item.ar_vocalized,
      options: [
        { text: item.gloss_id, isCorrect: true, feedback: `Tepat sekali! ${item.ar_vocalized} artinya "${item.gloss_id}".` },
        { text: dist1, isCorrect: false, feedback: `Belum tepat. ${item.ar_vocalized} bukan berarti ${dist1}.` },
        { text: dist2, isCorrect: false, feedback: `Belum tepat. Pilihan ini adalah arti kata lain.` }
      ],
      hint: `Kata ini termasuk dalam kategori: ${item.category || item.pos}.`
    };
  });

  return {
    explanation: {
      conceptTitle,
      overview,
      rules,
      hudhudTips,
      keyVocabOrPhrases: highlightVocab
    },
    questions: questions.length > 0 ? questions : [
      {
        id: `ped_${skill.skill_id.toLowerCase().replace(/[^a-z0-9]/g, '_')}_q1`,
        question: `Apakah fokus utama dari penguasaan materi "${skill.name}"?`,
        options: [
          { text: `Menguasai kaidah dan penerapan materi ${skill.name} secara fasih`, isCorrect: true, feedback: 'Mumtaz! Inilah sasaran utama pembelajaran modul ini.' },
          { text: 'Menghafal tanpa memahami kaidah dan ketepatan lafal', isCorrect: false, feedback: 'Bahasa Arab menuntut pemahaman makna serta ketepatan lafal murni.' },
          { text: 'Mengabaikan harakat dan artikulasi makhraj', isCorrect: false, feedback: 'Artikulasi makhraj dan harakat adalah pilar utama kefasihan fusha.' },
          { text: 'Melewati latihan tanpa mempraktikkan pengucapan', isCorrect: false, feedback: 'Praktik lisan teratur adalah kunci utama kelancaran.' }
        ]
      }
    ],
    highlightVocab
  };
}
