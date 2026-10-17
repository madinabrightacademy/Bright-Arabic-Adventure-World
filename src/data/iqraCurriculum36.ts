import { IqraJilid, IqraPage } from './iqraData';

export const IQRA_36_PAGES_DATA: IqraJilid[] = [
  // ==========================================
  // JILID 1: PENGENALAN HURUF TUNGGAL FATHAH (6 Halaman)
  // ==========================================
  {
    jilid: 1,
    title: 'Iqra Jilid 1',
    levelBadge: 'J0 • Pemula Mutlak',
    focus: 'Pengenalan Huruf Tunggal Hijaiyah Berharakat Fathah',
    description: 'Membaca huruf-huruf tunggal tanpa sambung dengan vokal fathah (A) secara lugas, cepat, dan tegas (1 ketukan).',
    colorScheme: {
      primary: 'text-emerald-700',
      secondary: 'bg-emerald-100',
      bgGradient: 'from-emerald-500 to-teal-700',
      border: 'border-emerald-300'
    },
    pages: [
      {
        pageNumber: 1,
        metadata: {
          pageId: 'iq1_p1',
          globalPageNumber: 1,
          jilidNumber: 1,
          difficultyTier: 'pemula',
          difficultyScore: 10,
          tajweedCategory: 'Makhraj & Vokal Fathah Dasar',
          competencyFocus: 'Pengucapan vokal A terbuka dan makhraj dua bibir (Asy-Syafatain)',
          targetCharacters: ['أَ', 'بَ'],
          estimatedMinutes: 4,
          xpReward: 50,
          starReward: 3,
          minWordMasteryCount: 6
        },
        title: 'Halaman 1: Huruf Alif & Ba (أَ - بَ)',
        subtitle: 'Perhatikan bunyi vokal "a" terbuka dan rapatnya dua bibir',
        conceptRule: 'Setiap huruf berharakat fathah dibaca 1 harakat (pendek langsung). Jangan dipanjangkan.',
        words: [
          { id: 'iq1_p1_w1', ar: 'أَ بَ', translit: 'A - Ba', syllables: ['أَ', 'بَ'], audioText: 'أَ بَ' },
          { id: 'iq1_p1_w2', ar: 'بَ أَ', translit: 'Ba - A', syllables: ['بَ', 'أَ'], audioText: 'بَ أَ' },
          { id: 'iq1_p1_w3', ar: 'أَ أَ بَ', translit: 'A - A - Ba', syllables: ['أَ', 'أَ', 'بَ'], audioText: 'أَ أَ بَ' },
          { id: 'iq1_p1_w4', ar: 'بَ أَ بَ', translit: 'Ba - A - Ba', syllables: ['بَ', 'أَ', 'بَ'], audioText: 'بَ أَ بَ' },
          { id: 'iq1_p1_w5', ar: 'أَ بَ أَ', translit: 'A - Ba - A', syllables: ['أَ', 'بَ', 'أَ'], audioText: 'أَ بَ أَ' },
          { id: 'iq1_p1_w6', ar: 'بَ بَ أَ', translit: 'Ba - Ba - A', syllables: ['بَ', 'بَ', 'أَ'], audioText: 'بَ بَ أَ' }
        ]
      },
      {
        pageNumber: 2,
        metadata: {
          pageId: 'iq1_p2',
          globalPageNumber: 2,
          jilidNumber: 1,
          difficultyTier: 'pemula',
          difficultyScore: 15,
          tajweedCategory: 'Pembeda Huruf Mirip (Ta & Tsa)',
          competencyFocus: 'Ujung lidah ke pangkal gigi seri (Ta) vs ujung lidah keluar sedikit (Tsa)',
          targetCharacters: ['تَ', 'ثَ'],
          estimatedMinutes: 4,
          xpReward: 50,
          starReward: 3,
          minWordMasteryCount: 6,
          prerequisitePageId: 'iq1_p1'
        },
        title: 'Halaman 2: Huruf Ta & Tsa (تَ - ثَ)',
        subtitle: 'Ujung lidah ke pangkal gigi seri (Ta) vs ujung lidah keluar sedikit (Tsa)',
        conceptRule: 'Bedakan titik dua di atas (ت) dan titik tiga di atas (ث). Baca lugas tanpa jeda terputus.',
        words: [
          { id: 'iq1_p2_w1', ar: 'تَ ثَ', translit: 'Ta - Tsa', syllables: ['تَ', 'ثَ'], audioText: 'تَ ثَ' },
          { id: 'iq1_p2_w2', ar: 'أَ تَ بَ', translit: 'A - Ta - Ba', syllables: ['أَ', 'تَ', 'بَ'], audioText: 'أَ تَ بَ' },
          { id: 'iq1_p2_w3', ar: 'بَ ثَ تَ', translit: 'Ba - Tsa - Ta', syllables: ['بَ', 'ثَ', 'تَ'], audioText: 'بَ ثَ تَ' },
          { id: 'iq1_p2_w4', ar: 'ثَ أَ بَ', translit: 'Tsa - A - Ba', syllables: ['ثَ', 'أَ', 'بَ'], audioText: 'ثَ أَ بَ' },
          { id: 'iq1_p2_w5', ar: 'تَ بَ ثَ', translit: 'Ta - Ba - Tsa', syllables: ['تَ', 'بَ', 'ثَ'], audioText: 'تَ بَ ثَ' },
          { id: 'iq1_p2_w6', ar: 'ثَ تَ أَ', translit: 'Tsa - Ta - A', syllables: ['ثَ', 'تَ', 'أَ'], audioText: 'ثَ تَ أَ' }
        ]
      },
      {
        pageNumber: 3,
        metadata: {
          pageId: 'iq1_p3',
          globalPageNumber: 3,
          jilidNumber: 1,
          difficultyTier: 'pemula',
          difficultyScore: 20,
          tajweedCategory: 'Makhraj Halq & Lisan (Jim, Ha, Kha)',
          competencyFocus: 'Tengah lidah, tengah tenggorokan bersih, dan atas tenggorokan serak',
          targetCharacters: ['جَ', 'حَ', 'خَ'],
          estimatedMinutes: 5,
          xpReward: 50,
          starReward: 3,
          minWordMasteryCount: 6,
          prerequisitePageId: 'iq1_p2'
        },
        title: 'Halaman 3: Huruf Jim, Ha, Kha (جَ - حَ - خَ)',
        subtitle: 'Tengah lidah rapat (Ja), tengah tenggorokan bersih (Ḥa), dan atas tenggorokan serak (Kha)',
        conceptRule: 'Jim titik di bawah perut, Ha tanpa titik, Kha titik di atas kepala.',
        words: [
          { id: 'iq1_p3_w1', ar: 'جَ حَ خَ', translit: 'Ja - Ḥa - Kha', syllables: ['جَ', 'حَ', 'خَ'], audioText: 'جَ حَ خَ' },
          { id: 'iq1_p3_w2', ar: 'جَ أَ تَ', translit: 'Ja - A - Ta', syllables: ['جَ', 'أَ', 'تَ'], audioText: 'جَ أَ تَ' },
          { id: 'iq1_p3_w3', ar: 'حَ بَ ثَ', translit: 'Ḥa - Ba - Tsa', syllables: ['حَ', 'بَ', 'ثَ'], audioText: 'حَ بَ ثَ' },
          { id: 'iq1_p3_w4', ar: 'خَ تَ جَ', translit: 'Kha - Ta - Ja', syllables: ['خَ', 'تَ', 'جَ'], audioText: 'خَ تَ جَ' },
          { id: 'iq1_p3_w5', ar: 'ثَ حَ خَ', translit: 'Tsa - Ḥa - Kha', syllables: ['ثَ', 'حَ', 'خَ'], audioText: 'ثَ حَ خَ' },
          { id: 'iq1_p3_w6', ar: 'أَ خَ جَ', translit: 'A - Kha - Ja', syllables: ['أَ', 'خَ', 'جَ'], audioText: 'أَ خَ جَ' }
        ]
      },
      {
        pageNumber: 4,
        metadata: {
          pageId: 'iq1_p4',
          globalPageNumber: 4,
          jilidNumber: 1,
          difficultyTier: 'pemula',
          difficultyScore: 25,
          tajweedCategory: 'Getaran & Desir Lidah (Dal, Dzal, Ra, Zay)',
          competencyFocus: 'Pembeda makhraj lidah: Dal tipis, Dzal berdesir, Ra bergetar, Zay tajam',
          targetCharacters: ['دَ', 'ذَ', 'رَ', 'زَ'],
          estimatedMinutes: 5,
          xpReward: 50,
          starReward: 3,
          minWordMasteryCount: 6,
          prerequisitePageId: 'iq1_p3'
        },
        title: 'Halaman 4: Huruf Dal, Dzal, Ra, Zay (دَ - ذَ - رَ - زَ)',
        subtitle: 'Pembeda makhraj lidah: Dal tipis, Dzal berdesir lembut, Ra tebal, Zay bergetar tajam',
        conceptRule: 'Dal dan Dzal tidak bersambung ke huruf sesudahnya. Ra bergetar halus di ujung lidah.',
        words: [
          { id: 'iq1_p4_w1', ar: 'دَ ذَ رَ زَ', translit: 'Da - Dza - Ra - Za', syllables: ['دَ', 'ذَ', 'رَ', 'زَ'], audioText: 'دَ ذَ رَ زَ' },
          { id: 'iq1_p4_w2', ar: 'دَ رَ سَ', translit: 'Da - Ra - Sa', syllables: ['دَ', 'رَ', 'سَ'], audioText: 'دَ رَ سَ' },
          { id: 'iq1_p4_w3', ar: 'ذَ كَ رَ', translit: 'Dza - Ka - Ra', syllables: ['ذَ', 'كَ', 'رَ'], audioText: 'ذَ كَ رَ' },
          { id: 'iq1_p4_w4', ar: 'زَ رَ عَ', translit: 'Za - Ra - ‘A', syllables: ['زَ', 'رَ', 'عَ'], audioText: 'زَ رَ عَ' },
          { id: 'iq1_p4_w5', ar: 'بَ دَ أَ', translit: 'Ba - Da - A', syllables: ['بَ', 'دَ', 'أَ'], audioText: 'بَ دَ أَ' },
          { id: 'iq1_p4_w6', ar: 'رَ زَ قَ', translit: 'Ra - Za - Qa', syllables: ['رَ', 'زَ', 'قَ'], audioText: 'رَ زَ قَ' }
        ]
      },
      {
        pageNumber: 5,
        metadata: {
          pageId: 'iq1_p5',
          globalPageNumber: 5,
          jilidNumber: 1,
          difficultyTier: 'pemula',
          difficultyScore: 30,
          tajweedCategory: 'Huruf Desis & Huruf Tebal (Sin, Syin, Shad, Dhad)',
          competencyFocus: 'Huruf desis (Safir) dan sifat Isti\'la (ketebalan rongga mulut)',
          targetCharacters: ['سَ', 'شَ', 'صَ', 'ضَ'],
          estimatedMinutes: 5,
          xpReward: 50,
          starReward: 3,
          minWordMasteryCount: 6,
          prerequisitePageId: 'iq1_p4'
        },
        title: 'Halaman 5: Huruf Sin, Syin, Shad, Dhad (سَ - شَ - صَ - ضَ)',
        subtitle: 'Huruf desis (Safir) dan huruf tebal menekan langit-langit (Isti\'la & Ithbaq)',
        conceptRule: 'Shad dan Dhad dibaca tebal (rongga mulut menggembung) bukan bunyi vokal "O", tapi konsonan tebal "Sha" dan "Dha".',
        words: [
          { id: 'iq1_p5_w1', ar: 'سَ شَ صَ ضَ', translit: 'Sa - Sya - Sha - Dha', syllables: ['سَ', 'شَ', 'صَ', 'ضَ'], audioText: 'سَ شَ صَ ضَ' },
          { id: 'iq1_p5_w2', ar: 'صَ دَ قَ', translit: 'Sha - Da - Qa', syllables: ['صَ', 'دَ', 'قَ'], audioText: 'صَ دَ قَ' },
          { id: 'iq1_p5_w3', ar: 'ضَ رَ بَ', translit: 'Dha - Ra - Ba', syllables: ['ضَ', 'رَ', 'بَ'], audioText: 'ضَ رَ بَ' },
          { id: 'iq1_p5_w4', ar: 'شَ كَ رَ', translit: 'Sya - Ka - Ra', syllables: ['شَ', 'كَ', 'رَ'], audioText: 'شَ كَ رَ' },
          { id: 'iq1_p5_w5', ar: 'حَ سَ نَ', translit: 'Ḥa - Sa - Na', syllables: ['حَ', 'سَ', 'نَ'], audioText: 'حَ سَ نَ' },
          { id: 'iq1_p5_w6', ar: 'نَ صَ رَ', translit: 'Na - Sha - Ra', syllables: ['نَ', 'صَ', 'رَ'], audioText: 'نَ صَ رَ' }
        ]
      },
      {
        pageNumber: 6,
        metadata: {
          pageId: 'iq1_p6',
          globalPageNumber: 6,
          jilidNumber: 1,
          difficultyTier: 'pemula',
          difficultyScore: 35,
          tajweedCategory: 'Evaluasi Kelancaran Rangkaian Fathah Penuh',
          competencyFocus: 'Kelancaran membaca 3 huruf berurutan 1 nafas tanpa terputus',
          targetCharacters: ['خَ لَ قَ', 'كَتَبَ', 'نَظَرَ'],
          estimatedMinutes: 6,
          xpReward: 60,
          starReward: 3,
          minWordMasteryCount: 6,
          prerequisitePageId: 'iq1_p5'
        },
        title: 'Halaman 6: Evaluasi Kelancaran Kata 3 Huruf Fathah Penuh',
        subtitle: 'Uji ketangkasan membaca dari kanan ke kiri tanpa mengeja dalam 1 tarikan nafas',
        conceptRule: 'Pastikan tempo tetap stabil, setiap huruf berbunyi tepat 1 ketukan tanpa ada yang terseret panjang.',
        words: [
          { id: 'iq1_p6_w1', ar: 'خَ لَ قَ', translit: 'Kha - La - Qa', meaning: 'Menciptakan', syllables: ['خَ', 'لَ', 'قَ'], audioText: 'خَ لَ قَ' },
          { id: 'iq1_p6_w2', ar: 'جَعَلَ', translit: 'Ja - ‘A - La', meaning: 'Menjadikan', syllables: ['جَ', 'عَ', 'لَ'], audioText: 'جَعَلَ' },
          { id: 'iq1_p6_w3', ar: 'كَتَبَ', translit: 'Ka - Ta - Ba', meaning: 'Menulis', syllables: ['كَ', 'تَ', 'بَ'], audioText: 'كَتَبَ' },
          { id: 'iq1_p6_w4', ar: 'نَظَرَ', translit: 'Na - Zha - Ra', meaning: 'Melihat', syllables: ['نَ', 'ظَ', 'رَ'], audioText: 'نَظَرَ' },
          { id: 'iq1_p6_w5', ar: 'بَلَغَ', translit: 'Ba - La - Gha', meaning: 'Sampai', syllables: ['بَ', 'لَ', 'غَ'], audioText: 'بَلَغَ' },
          { id: 'iq1_p6_w6', ar: 'وَجَدَ', translit: 'Wa - Ja - Da', meaning: 'Menemukan', syllables: ['وَ', 'جَ', 'دَ'], audioText: 'وَجَدَ' }
        ]
      }
    ],
    quizQuestions: [
      {
        id: 'q_iq1_1',
        question: 'Manakah huruf yang berbunyi "Tsa" (titik tiga di atas)?',
        options: [
          { ar: 'ثَ', translit: 'Tsa', isCorrect: true, feedback: 'Mumtaz! Tsa memiliki 3 titik di atas.' },
          { ar: 'تَ', translit: 'Ta', isCorrect: false, feedback: 'Ini Ta (titik 2).' },
          { ar: 'بَ', translit: 'Ba', isCorrect: false, feedback: 'Ini Ba (titik 1 di bawah).' }
        ]
      },
      {
        id: 'q_iq1_2',
        question: 'Dengarkan lafal: kata manakah yang berbunyi "Da - Ra - Sa"?',
        arPrompt: 'دَرَسَ',
        options: [
          { ar: 'دَرَسَ', translit: 'Da-Ra-Sa', isCorrect: true, feedback: 'Tepat sekali!' },
          { ar: 'كَتَبَ', translit: 'Ka-Ta-Ba', isCorrect: false, feedback: 'Ini Ka-Ta-Ba.' },
          { ar: 'جَعَلَ', translit: 'Ja-‘A-La', isCorrect: false, feedback: 'Ini Ja-‘A-La.' }
        ]
      }
    ]
  },

  // ==========================================
  // JILID 2: BENTUK HURUF SAMBUNG & MAD ALIF (6 Halaman)
  // ==========================================
  {
    jilid: 2,
    title: 'Iqra Jilid 2',
    levelBadge: 'J1 • Dasar Awal',
    focus: 'Huruf Bersambung & Bacaan Mad Thabi\'i (Panjang 2 Harakat)',
    description: 'Mengenal perubahan bentuk huruf saat di awal, tengah, dan akhir kata serta membaca panjang 2 harakat (Mad Thabi\'i Alif).',
    colorScheme: {
      primary: 'text-amber-800',
      secondary: 'bg-amber-100',
      bgGradient: 'from-amber-500 to-orange-700',
      border: 'border-amber-300'
    },
    pages: [
      {
        pageNumber: 1,
        metadata: {
          pageId: 'iq2_p1',
          globalPageNumber: 7,
          jilidNumber: 2,
          difficultyTier: 'dasar',
          difficultyScore: 40,
          tajweedCategory: 'Posisi Sambung Ba, Ta, Tsa, Nun, Ya',
          competencyFocus: 'Mengenali bentuk awal, tengah, dan akhir kelompok huruf berbadan sama',
          targetCharacters: ['بـ', 'ـتـ', 'ـث', 'نـ', 'يـ'],
          estimatedMinutes: 5,
          xpReward: 50,
          starReward: 3,
          minWordMasteryCount: 6,
          prerequisitePageId: 'iq1_p6'
        },
        title: 'Halaman 1: Huruf Bersambung Kelompok Ba, Ta, Tsa, Nun, Ya',
        subtitle: 'Bentuk badan huruf sama di awal dan tengah; pembedanya letak & jumlah titik',
        conceptRule: 'Huruf ba (titik 1 bawah), ta (titik 2 atas), tsa (titik 3 atas), nun (titik 1 atas), ya (titik 2 bawah).',
        words: [
          { id: 'iq2_p1_w1', ar: 'بَتَرَ', translit: 'Batara', syllables: ['بَـ', 'ـتَـ', 'ـرَ'], audioText: 'بَتَرَ' },
          { id: 'iq2_p1_w2', ar: 'ثَبَتَ', translit: 'Tsabata', syllables: ['ثَـ', 'ـبَـ', 'ـتَ'], audioText: 'ثَبَتَ' },
          { id: 'iq2_p1_w3', ar: 'نَبَتَ', translit: 'Nabata', syllables: ['نَـ', 'ـبَـ', 'ـتَ'], audioText: 'نَبَتَ' },
          { id: 'iq2_p1_w4', ar: 'يَتَبَ', translit: 'Yataba', syllables: ['يَـ', 'ـتَـ', 'ـبَ'], audioText: 'يَتَبَ' },
          { id: 'iq2_p1_w5', ar: 'بَيَنَ', translit: 'Bayana', syllables: ['بَـ', 'ـيَـ', 'ـنَ'], audioText: 'بَيَنَ' },
          { id: 'iq2_p1_w6', ar: 'تَيَنَ', translit: 'Tayana', syllables: ['تَـ', 'ـيَـ', 'ـنَ'], audioText: 'تَيَنَ' }
        ]
      },
      {
        pageNumber: 2,
        metadata: {
          pageId: 'iq2_p2',
          globalPageNumber: 8,
          jilidNumber: 2,
          difficultyTier: 'dasar',
          difficultyScore: 45,
          tajweedCategory: 'Posisi Sambung Jim-Ha-Kha & \'Ain-Ghain',
          competencyFocus: 'Bentuk kepala huruf utuh dan bagian bawah mendatar menyambung ke kiri',
          targetCharacters: ['جـ', 'حـ', 'خـ', 'عـ', 'ـعـ', 'ـغ'],
          estimatedMinutes: 5,
          xpReward: 50,
          starReward: 3,
          minWordMasteryCount: 6,
          prerequisitePageId: 'iq2_p1'
        },
        title: 'Halaman 2: Huruf Sambung Jim, Ha, Kha & \'Ain, Ghain',
        subtitle: 'Bentuk kepala huruf tetap utuh, bagian perut mendatar saat menyambung ke kiri',
        conceptRule: '\'Ain dan Ghain saat berada di tengah atau akhir kata tertutup kepalanya (menjadi segitiga terbalik gelap).',
        words: [
          { id: 'iq2_p2_w1', ar: 'جَعَلَ', translit: 'Ja‘ala', syllables: ['جَـ', 'ـعَـ', 'ـلَ'], audioText: 'جَعَلَ' },
          { id: 'iq2_p2_w2', ar: 'حَسَنَ', translit: 'Ḥasana', syllables: ['حَـ', 'ـسَـ', 'ـنَ'], audioText: 'حَسَنَ' },
          { id: 'iq2_p2_w3', ar: 'خَتَمَ', translit: 'Khatama', syllables: ['خَـ', 'ـتَـ', 'ـمَ'], audioText: 'خَتَمَ' },
          { id: 'iq2_p2_w4', ar: 'بَلَغَ', translit: 'Balagha', syllables: ['بَـ', 'ـلَـ', 'ـغَ'], audioText: 'بَلَغَ' },
          { id: 'iq2_p2_w5', ar: 'شَفَعَ', translit: 'Syafa‘a', syllables: ['شَـ', 'ـفَـ', 'ـعَ'], audioText: 'شَفَعَ' },
          { id: 'iq2_p2_w6', ar: 'صَنَعَ', translit: 'Shana‘a', syllables: ['صَـ', 'ـنَـ', 'ـعَ'], audioText: 'صَنَعَ' }
        ]
      },
      {
        pageNumber: 3,
        metadata: {
          pageId: 'iq2_p3',
          globalPageNumber: 9,
          jilidNumber: 2,
          difficultyTier: 'dasar',
          difficultyScore: 48,
          tajweedCategory: '6 Huruf Pemutus Sambungan Kiri',
          competencyFocus: 'Kaidah huruf yang menolak bersambung ke arah kiri (ا د ذ ر ز و)',
          targetCharacters: ['ا', 'د', 'ذ', 'ر', 'ز', 'و'],
          estimatedMinutes: 5,
          xpReward: 50,
          starReward: 3,
          minWordMasteryCount: 6,
          prerequisitePageId: 'iq2_p2'
        },
        title: 'Halaman 3: 6 Huruf Pemutus Sambungan Kiri (ا د ذ ر ز و)',
        subtitle: 'Huruf-huruf ini bisa disambung dari kanan, tetapi menolak tersambung ke huruf sebelah kirinya',
        conceptRule: 'Ingat rumus: "A-Da-Dza-Ra-Za-Wa". Huruf setelah mereka harus mulai dari bentuk awal baru.',
        words: [
          { id: 'iq2_p3_w1', ar: 'أَخَذَ', translit: 'Akhadza', syllables: ['أَ', 'خَـ', 'ـذَ'], audioText: 'أَخَذَ' },
          { id: 'iq2_p3_w2', ar: 'وَزَنَ', translit: 'Wazana', syllables: ['وَ', 'زَ', 'نَ'], audioText: 'وَزَنَ' },
          { id: 'iq2_p3_w3', ar: 'ذَهَبَ', translit: 'Dzahaba', syllables: ['ذَ', 'هَـ', 'ـبَ'], audioText: 'ذَهَبَ' },
          { id: 'iq2_p3_w4', ar: 'رَزَقَ', translit: 'Razaqa', syllables: ['رَ', 'زَ', 'قَ'], audioText: 'رَزَقَ' },
          { id: 'iq2_p3_w5', ar: 'دَخَلَ', translit: 'Dakhala', syllables: ['دَ', 'خَـ', 'ـلَ'], audioText: 'دَخَلَ' },
          { id: 'iq2_p3_w6', ar: 'وَرَدَ', translit: 'Warada', syllables: ['وَ', 'رَ', 'دَ'], audioText: 'وَرَدَ' }
        ]
      },
      {
        pageNumber: 4,
        metadata: {
          pageId: 'iq2_p4',
          globalPageNumber: 10,
          jilidNumber: 2,
          difficultyTier: 'dasar',
          difficultyScore: 52,
          tajweedCategory: 'Mad Thabi\'i Alif (Panjang 2 Harakat)',
          competencyFocus: 'Kontras ketukan 1 harakat (pendek cepat) vs 2 harakat (panjang berayun)',
          targetCharacters: ['بَا', 'تَا', 'ثَا', 'جَا', 'حَا', 'خَا'],
          estimatedMinutes: 6,
          xpReward: 55,
          starReward: 3,
          minWordMasteryCount: 6,
          prerequisitePageId: 'iq2_p3'
        },
        title: 'Halaman 4: Mad Thabi\'i Alif (Panjang 2 Harakat / 2 Ketukan)',
        subtitle: 'Fathah diikuti Alif mati dibaca panjang 2 harakat (Aaa)',
        conceptRule: 'Penting! Latih kontras antara 1 harakat (pendek cepat) dan 2 harakat (panjang berayun).',
        words: [
          { id: 'iq2_p4_w1', ar: 'بَا - بَ', translit: 'Baa (2) vs Ba (1)', syllables: ['بَا', 'بَ'], audioText: 'بَا بَ' },
          { id: 'iq2_p4_w2', ar: 'تَا - تَ', translit: 'Taa (2) vs Ta (1)', syllables: ['تَا', 'تَ'], audioText: 'تَا تَ' },
          { id: 'iq2_p4_w3', ar: 'ثَا - ثَ', translit: 'Tsaa (2) vs Tsa (1)', syllables: ['ثَا', 'ثَ'], audioText: 'ثَا ثَ' },
          { id: 'iq2_p4_w4', ar: 'جَا - جَ', translit: 'Jaa (2) vs Ja (1)', syllables: ['جَا', 'جَ'], audioText: 'جَا جَ' },
          { id: 'iq2_p4_w5', ar: 'حَا - حَ', translit: 'Ḥaa (2) vs Ḥa (1)', syllables: ['حَا', 'حَ'], audioText: 'حَا حَ' },
          { id: 'iq2_p4_w6', ar: 'خَا - خَ', translit: 'Khaa (2) vs Kha (1)', syllables: ['خَا', 'خَ'], audioText: 'خَا خَ' }
        ]
      },
      {
        pageNumber: 5,
        metadata: {
          pageId: 'iq2_p5',
          globalPageNumber: 11,
          jilidNumber: 2,
          difficultyTier: 'dasar',
          difficultyScore: 55,
          tajweedCategory: 'Kata 3-4 Huruf Ber-Mad Alif',
          competencyFocus: 'Penerapan panjang 2 harakat di awal dan tengah kata',
          targetCharacters: ['قَالَ', 'كَانَ', 'صَابَرَ', 'جَاهَدَ'],
          estimatedMinutes: 6,
          xpReward: 55,
          starReward: 3,
          minWordMasteryCount: 6,
          prerequisitePageId: 'iq2_p4'
        },
        title: 'Halaman 5: Kata 3-4 Huruf Ber-Mad Alif',
        subtitle: 'Terapkan panjang 2 harakat pada posisi awal dan tengah kata',
        conceptRule: 'Hanya huruf sebelum Alif yang dipanjangkan. Huruf setelahnya tetap dibaca 1 ketukan.',
        words: [
          { id: 'iq2_p5_w1', ar: 'قَالَ', translit: 'Qaala', meaning: 'Dia berkata', syllables: ['قَا', 'لَ'], audioText: 'قَالَ', ruleTag: 'Mad Alif' },
          { id: 'iq2_p5_w2', ar: 'كَانَ', translit: 'Kaana', meaning: 'Adalah', syllables: ['كَا', 'نَ'], audioText: 'كَانَ', ruleTag: 'Mad Alif' },
          { id: 'iq2_p5_w3', ar: 'صَابَرَ', translit: 'Shaabara', meaning: 'Bersabar', syllables: ['صَا', 'بَ', 'رَ'], audioText: 'صَابَرَ', ruleTag: 'Mad Alif' },
          { id: 'iq2_p5_w4', ar: 'جَاهَدَ', translit: 'Jaahada', meaning: 'Berjuang', syllables: ['جَا', 'هَ', 'دَ'], audioText: 'جَاهَدَ', ruleTag: 'Mad Alif' },
          { id: 'iq2_p5_w5', ar: 'سَافَرَ', translit: 'Saafara', meaning: 'Bepergian', syllables: ['سَا', 'فَ', 'رَ'], audioText: 'سَافَرَ', ruleTag: 'Mad Alif' },
          { id: 'iq2_p5_w6', ar: 'قَاتَلَ', translit: 'Qaatala', meaning: 'Berperang', syllables: ['قَا', 'تَ', 'لَ'], audioText: 'قَاتَلَ', ruleTag: 'Mad Alif' }
        ]
      },
      {
        pageNumber: 6,
        metadata: {
          pageId: 'iq2_p6',
          globalPageNumber: 12,
          jilidNumber: 2,
          difficultyTier: 'dasar',
          difficultyScore: 58,
          tajweedCategory: 'Evaluasi Kelancaran Kalimat Sambung & Mad Alif',
          competencyFocus: 'Membaca kalimat 2 kata bersambung dengan tempo stabil dan ketepatan mad',
          targetCharacters: ['قَالَ زَيْدٌ', 'صَالِحٌ عَالِمٌ', 'فَازَ صَابِرٌ'],
          estimatedMinutes: 6,
          xpReward: 65,
          starReward: 3,
          minWordMasteryCount: 6,
          prerequisitePageId: 'iq2_p5'
        },
        title: 'Halaman 6: Kalimat Pendek Bersambung & Evaluasi Kelancaran',
        subtitle: 'Membaca kalimat 2 kata berangkai dengan ketepatan mad alif dan makhraj',
        conceptRule: 'Jaga ritme membaca agar tidak tergesa-gesa dan tidak memanjangkan huruf pendek.',
        words: [
          { id: 'iq2_p6_w1', ar: 'قَالَ زَيْدٌ', translit: 'Qaala Zaid', meaning: 'Zaid berkata', syllables: ['قَا', 'لَ', 'زَيْدٌ'], audioText: 'قَالَ زَيْدٌ' },
          { id: 'iq2_p6_w2', ar: 'صَالِحٌ عَالِمٌ', translit: 'Shaalihun ‘Aalim', meaning: 'Shaleh itu berilmu', syllables: ['صَا', 'لِ', 'حٌ'], audioText: 'صَالِحٌ عَالِمٌ' },
          { id: 'iq2_p6_w3', ar: 'فَازَ صَابِرٌ', translit: 'Faaza Shaabir', meaning: 'Orang sabar beruntung', syllables: ['فَا', 'زَ'], audioText: 'فَازَ صَابِرٌ' },
          { id: 'iq2_p6_w4', ar: 'جَاءَ نَصْرٌ', translit: 'Jaa-a Nashr', meaning: 'Pertolongan telah datang', syllables: ['جَا', 'ءَ'], audioText: 'جَاءَ نَصْرٌ' },
          { id: 'iq2_p6_w5', ar: 'شَاهَدَ طَالِبٌ', translit: 'Syaahada Thaalib', meaning: 'Siswa menyaksikan', syllables: ['شَا', 'هَ', 'دَ'], audioText: 'شَاهَدَ طَالِبٌ' },
          { id: 'iq2_p6_w6', ar: 'كَاتَبَ كَاتِبٌ', translit: 'Kaataba Kaatib', meaning: 'Penulis saling menulis', syllables: ['كَا', 'تَ', 'بَ'], audioText: 'كَاتَبَ كَاتِبٌ' }
        ]
      }
    ],
    quizQuestions: [
      {
        id: 'q_iq2_1',
        question: 'Berapakah panjang harakat untuk kata "قَالَ" pada huruf Qa?',
        options: [
          { ar: '2 Harakat (Mad Thabi\'i)', translit: '2 Ketukan', isCorrect: true, feedback: 'Benar! Fathah bertemu alif dibaca 2 harakat.' },
          { ar: '1 Harakat (Pendek)', translit: '1 Ketukan', isCorrect: false, feedback: 'Salah, ada alif mad sehingga harus 2 harakat.' },
          { ar: '6 Harakat', translit: '6 Ketukan', isCorrect: false, feedback: 'Terlalu panjang.' }
        ]
      }
    ]
  },

  // ==========================================
  // JILID 3: KASRAH, DHAMMAH, MAD YA & MAD WAW (6 Halaman)
  // ==========================================
  {
    jilid: 3,
    title: 'Iqra Jilid 3',
    levelBadge: 'J2 • Menengah Bawah',
    focus: 'Vokal Kasrah (-i), Dhammah (-u), Mad Ya, dan Mad Waw',
    description: 'Menguasai tiga vokal utama (A, I, U) serta mad thabi\'i Ya sukun (ii) dan Waw sukun (uu).',
    colorScheme: {
      primary: 'text-blue-800',
      secondary: 'bg-blue-100',
      bgGradient: 'from-blue-600 to-indigo-800',
      border: 'border-blue-300'
    },
    pages: [
      {
        pageNumber: 1,
        metadata: {
          pageId: 'iq3_p1',
          globalPageNumber: 13,
          jilidNumber: 3,
          difficultyTier: 'menengah',
          difficultyScore: 60,
          tajweedCategory: 'Vokal Kasrah (-i: ِـ)',
          competencyFocus: 'Pelafalan vokal i murni dengan merilekskan rahang bawah tanpa bunyi e',
          targetCharacters: ['إِ', 'بِ', 'تِ', 'لِ', 'كِ'],
          estimatedMinutes: 5,
          xpReward: 50,
          starReward: 3,
          minWordMasteryCount: 6,
          prerequisitePageId: 'iq2_p6'
        },
        title: 'Halaman 1: Harakat Kasrah (-i: ِـ)',
        subtitle: 'Suara vokal "i" murni dengan menurunkan rahang dan bibir bawah melebar santai',
        conceptRule: 'Pastikan makhraj huruf tetap murni saat membaca kasrah, jangan terpengaruh bunyi "e".',
        words: [
          { id: 'iq3_p1_w1', ar: 'إِبِلِ', translit: 'Ibili', meaning: 'Unta', syllables: ['إِ', 'بِ', 'لِ'], audioText: 'إِبِلِ' },
          { id: 'iq3_p1_w2', ar: 'مَلِكِ', translit: 'Maliki', meaning: 'Raja', syllables: ['مَ', 'لِ', 'كِ'], audioText: 'مَلِكِ' },
          { id: 'iq3_p1_w3', ar: 'شَهِدَ', translit: 'Syahida', meaning: 'Menyaksikan', syllables: ['شَ', 'هِ', 'دَ'], audioText: 'شَهِدَ' },
          { id: 'iq3_p1_w4', ar: 'سَمِعَ', translit: 'Sami‘a', meaning: 'Mendengar', syllables: ['سَ', 'مِ', 'عَ'], audioText: 'سَمِعَ' },
          { id: 'iq3_p1_w5', ar: 'عَلِمَ', translit: '‘Alima', meaning: 'Mengetahui', syllables: ['عَ', 'لِ', 'مَ'], audioText: 'عَلِمَ' },
          { id: 'iq3_p1_w6', ar: 'رَحِمَ', translit: 'Raḥima', meaning: 'Mengasihi', syllables: ['رَ', 'حِ', 'مَ'], audioText: 'رَحِمَ' }
        ]
      },
      {
        pageNumber: 2,
        metadata: {
          pageId: 'iq3_p2',
          globalPageNumber: 14,
          jilidNumber: 3,
          difficultyTier: 'menengah',
          difficultyScore: 63,
          tajweedCategory: 'Vokal Dhammah (-u: ُـ)',
          competencyFocus: 'Memoncongkan kedua bibir secara penuh untuk menghasilkan vokal u murni',
          targetCharacters: ['رُ', 'سُ', 'لُ', 'كُ', 'تُ'],
          estimatedMinutes: 5,
          xpReward: 50,
          starReward: 3,
          minWordMasteryCount: 6,
          prerequisitePageId: 'iq3_p1'
        },
        title: 'Halaman 2: Harakat Dhammah (-u: ُـ)',
        subtitle: 'Suara vokal "u" murni dengan memoncongkan kedua bibir ke depan secara sempurna',
        conceptRule: 'Bibir harus membulat penuh saat dhammah agar vokal "u" tidak terdengar seperti vokal "o".',
        words: [
          { id: 'iq3_p2_w1', ar: 'رُسُلُ', translit: 'Rusulu', meaning: 'Para Rasul', syllables: ['رُ', 'سُ', 'لُ'], audioText: 'رُسُلُ' },
          { id: 'iq3_p2_w2', ar: 'كُتُبِ', translit: 'Kutubi', meaning: 'Buku-buku', syllables: ['كُ', 'تُ', 'بِ'], audioText: 'كُتُبِ' },
          { id: 'iq3_p2_w3', ar: 'سُئِلَ', translit: 'Su-ila', meaning: 'Ditanya', syllables: ['سُ', 'ئِ', 'لَ'], audioText: 'سُئِلَ' },
          { id: 'iq3_p2_w4', ar: 'خُلِقَ', translit: 'Khuliqa', meaning: 'Diciptakan', syllables: ['خُ', 'لِ', 'قَ'], audioText: 'خُلِقَ' },
          { id: 'iq3_p2_w5', ar: 'ذُكِرَ', translit: 'Dzukira', meaning: 'Disebutkan', syllables: ['ذُ', 'كِ', 'رَ'], audioText: 'ذُكِرَ' },
          { id: 'iq3_p2_w6', ar: 'عُمُرُ', translit: '‘Umuru', meaning: 'Usia', syllables: ['عُ', 'مُ', 'رُ'], audioText: 'عُمُرُ' }
        ]
      },
      {
        pageNumber: 3,
        metadata: {
          pageId: 'iq3_p3',
          globalPageNumber: 15,
          jilidNumber: 3,
          difficultyTier: 'menengah',
          difficultyScore: 66,
          tajweedCategory: 'Perpaduan 3 Vokal Dasar (A - I - U)',
          competencyFocus: 'Kelincahan lisan beralih cepat antara fathah, kasrah, dan dhammah',
          targetCharacters: ['ضُرِبَ', 'حُمِدَ', 'فُتِحَ'],
          estimatedMinutes: 6,
          xpReward: 55,
          starReward: 3,
          minWordMasteryCount: 6,
          prerequisitePageId: 'iq3_p2'
        },
        title: 'Halaman 3: Perpaduan 3 Vokal Dasar (A - I - U)',
        subtitle: 'Latihan fleksibilitas lisan beralih cepat antara fathah, kasrah, dan dhammah',
        conceptRule: 'Jaga kejelasan tiap harakat tanpa mencampuradukkan posisi rahang dan bibir.',
        words: [
          { id: 'iq3_p3_w1', ar: 'ضُرِبَ', translit: 'Dhuriba', syllables: ['ضُ', 'رِ', 'بَ'], audioText: 'ضُرِبَ' },
          { id: 'iq3_p3_w2', ar: 'حُمِدَ', translit: 'Ḥumida', syllables: ['حُ', 'مِ', 'دَ'], audioText: 'حُمِدَ' },
          { id: 'iq3_p3_w3', ar: 'فُتِحَ', translit: 'Futiḥa', syllables: ['فُ', 'تِ', 'حَ'], audioText: 'فُتِحَ' },
          { id: 'iq3_p3_w4', ar: 'كُتِبَ عَلَيْكُمْ', translit: 'Kutiba ‘alaikum', syllables: ['كُ', 'تِ', 'بَ'], audioText: 'كُتِبَ عَلَيْكُمْ' },
          { id: 'iq3_p3_w5', ar: 'بَصُرَ', translit: 'Bashura', syllables: ['بَ', 'صُ', 'رَ'], audioText: 'بَصُرَ' },
          { id: 'iq3_p3_w6', ar: 'نُصِرَ', translit: 'Nushira', syllables: ['نُ', 'صِ', 'رَ'], audioText: 'نُصِرَ' }
        ]
      },
      {
        pageNumber: 4,
        metadata: {
          pageId: 'iq3_p4',
          globalPageNumber: 16,
          jilidNumber: 3,
          difficultyTier: 'menengah',
          difficultyScore: 70,
          tajweedCategory: 'Mad Thabi\'i Ya Sukun (ـِيْ / 2 Harakat Panjang Iii)',
          competencyFocus: 'Ayunan vokal iii selama 2 ketukan stabil pada kasrah bertemu ya sukun',
          targetCharacters: ['فِي', 'بَصِيرٌ', 'عَلِيمٌ'],
          estimatedMinutes: 6,
          xpReward: 55,
          starReward: 3,
          minWordMasteryCount: 6,
          prerequisitePageId: 'iq3_p3'
        },
        title: 'Halaman 4: Mad Thabi\'i Ya Sukun (ـِيْ / 2 Harakat Panjang Iii)',
        subtitle: 'Kasrah bertemu huruf Ya sukun dibaca panjang 2 ketukan',
        conceptRule: 'Ayunan suara panjang lembut "iii" tanpa menekan berlebihan pada pita suara.',
        words: [
          { id: 'iq3_p4_w1', ar: 'فِي سَبِيلِ', translit: 'Fī Sabīli', syllables: ['فِي', 'سَ', 'بِي', 'لِ'], audioText: 'فِي سَبِيلِ', ruleTag: 'Mad Ya' },
          { id: 'iq3_p4_w2', ar: 'بَصِيرٌ', translit: 'Baṣhīrun', meaning: 'Maha Melihat', syllables: ['بَ', 'صِي', 'رٌ'], audioText: 'بَصِيرٌ', ruleTag: 'Mad Ya' },
          { id: 'iq3_p4_w3', ar: 'عَلِيمٌ', translit: '‘Alīmun', meaning: 'Maha Mengetahui', syllables: ['عَ', 'لِي', 'مٌ'], audioText: 'عَلِيمٌ', ruleTag: 'Mad Ya' },
          { id: 'iq3_p4_w4', ar: 'قَرِيبٌ', translit: 'Qarībun', meaning: 'Dekat', syllables: ['قَ', 'رِي', 'بٌ'], audioText: 'قَرِيبٌ', ruleTag: 'Mad Ya' },
          { id: 'iq3_p4_w5', ar: 'حَكِيمٌ', translit: 'Ḥakīmun', meaning: 'Maha Bijaksana', syllables: ['حَ', 'كِي', 'مٌ'], audioText: 'حَكِيمٌ', ruleTag: 'Mad Ya' },
          { id: 'iq3_p4_w6', ar: 'كَرِيمٌ', translit: 'Karīmun', meaning: 'Maha Mulia', syllables: ['كَ', 'رِي', 'مٌ'], audioText: 'كَرِيمٌ', ruleTag: 'Mad Ya' }
        ]
      },
      {
        pageNumber: 5,
        metadata: {
          pageId: 'iq3_p5',
          globalPageNumber: 17,
          jilidNumber: 3,
          difficultyTier: 'menengah',
          difficultyScore: 73,
          tajweedCategory: 'Mad Thabi\'i Waw Sukun (ـُوْ / 2 Harakat Panjang Uuu)',
          competencyFocus: 'Menahan bibir membulat ke depan selama 2 ketukan saat melafalkan mad waw',
          targetCharacters: ['يَقُولُ', 'نُورٌ', 'غَفُورٌ'],
          estimatedMinutes: 6,
          xpReward: 55,
          starReward: 3,
          minWordMasteryCount: 6,
          prerequisitePageId: 'iq3_p4'
        },
        title: 'Halaman 5: Mad Thabi\'i Waw Sukun (ـُوْ / 2 Harakat Panjang Uuu)',
        subtitle: 'Dhammah bertemu huruf Waw sukun dibaca panjang 2 ketukan',
        conceptRule: 'Bibir tetap membulat selama 2 ketukan saat mengalirkan vokal mad waw.',
        words: [
          { id: 'iq3_p5_w1', ar: 'يَقُولُ', translit: 'Yaqūlu', meaning: 'Dia berkata', syllables: ['يَ', 'قُو', 'لُ'], audioText: 'يَقُولُ', ruleTag: 'Mad Waw' },
          { id: 'iq3_p5_w2', ar: 'نُورٌ', translit: 'Nūrun', meaning: 'Cahaya', syllables: ['نُو', 'رٌ'], audioText: 'نُورٌ', ruleTag: 'Mad Waw' },
          { id: 'iq3_p5_w3', ar: 'يَمُوتُ', translit: 'Yamūtu', meaning: 'Dia meninggal', syllables: ['يَ', 'مُو', 'تُ'], audioText: 'يَمُوتُ', ruleTag: 'Mad Waw' },
          { id: 'iq3_p5_w4', ar: 'تُوبُوا', translit: 'Tūbū', meaning: 'Bertaubatlah kalian', syllables: ['تُو', 'بُوا'], audioText: 'تُوبُوا', ruleTag: 'Mad Waw' },
          { id: 'iq3_p5_w5', ar: 'غَفُورٌ', translit: 'Ghafūrun', meaning: 'Maha Pengampun', syllables: ['غَ', 'فُو', 'رٌ'], audioText: 'غَفُورٌ', ruleTag: 'Mad Waw' },
          { id: 'iq3_p5_w6', ar: 'شَكُورٌ', translit: 'Syakūrun', meaning: 'Maha Bersyukur', syllables: ['شَ', 'كُو', 'رٌ'], audioText: 'شَكُورٌ', ruleTag: 'Mad Waw' }
        ]
      },
      {
        pageNumber: 6,
        metadata: {
          pageId: 'iq3_p6',
          globalPageNumber: 18,
          jilidNumber: 3,
          difficultyTier: 'menengah',
          difficultyScore: 76,
          tajweedCategory: 'Kombinasi Tiga Mad Thabi\'i (Alif, Ya, Waw)',
          competencyFocus: 'Keseimbangan durasi 2 ketukan pada kata multi-mad (Alif, Ya, Waw)',
          targetCharacters: ['نُوحِيهَا', 'أُوذِينَا', 'يُقِيمُونَ'],
          estimatedMinutes: 7,
          xpReward: 70,
          starReward: 3,
          minWordMasteryCount: 6,
          prerequisitePageId: 'iq3_p5'
        },
        title: 'Halaman 6: Kombinasi Tiga Mad Thabi\'i (Alif, Ya, Waw)',
        subtitle: 'Penerapan 3 mad thabi\'i dalam satu kata atau kalimat utuh',
        conceptRule: 'Jaga kesetaraan panjang: mad alif, mad ya, dan mad waw semuanya bernilai sama (2 ketukan).',
        words: [
          { id: 'iq3_p6_w1', ar: 'نُوحِيهَا', translit: 'Nūḥīhā', syllables: ['نُو', 'حِي', 'هَا'], audioText: 'نُوحِيهَا', ruleTag: '3 Mad Thabi\'i' },
          { id: 'iq3_p6_w2', ar: 'أُوذِينَا', translit: 'Ūdzīnā', syllables: ['أُو', 'ذِي', 'نَا'], audioText: 'أُوذِينَا', ruleTag: '3 Mad Thabi\'i' },
          { id: 'iq3_p6_w3', ar: 'يُقِيمُونَ الصَّلَاةَ', translit: 'Yuqīmūnash-shalāh', syllables: ['يُ', 'قِي', 'مُو', 'نَ'], audioText: 'يُقِيمُونَ الصَّلَاةَ' },
          { id: 'iq3_p6_w4', ar: 'سَمِيعٌ بَصِيرٌ', translit: 'Samī‘un Baṣhīr', syllables: ['سَ', 'مِي', 'عٌ'], audioText: 'سَمِيعٌ بَصِيرٌ' },
          { id: 'iq3_p6_w5', ar: 'صَابِرُونَ شَاكِرُونَ', translit: 'Shābirūna Syākirūn', syllables: ['صَا', 'بِ', 'رُو', 'نَ'], audioText: 'صَابِرُونَ شَاكِرُونَ' },
          { id: 'iq3_p6_w6', ar: 'يَعْلَمُونَ مَا تَفْعَلُونَ', translit: 'Ya‘lamūna mā taf‘alūn', syllables: ['يَعْ', 'لَ', 'مُو', 'نَ'], audioText: 'يَعْلَمُونَ مَا تَفْعَلُونَ' }
        ]
      }
    ],
    quizQuestions: [
      {
        id: 'q_iq3_1',
        question: 'Pada kata "بَصِيرٌ", huruf manakah yang dibaca panjang 2 harakat?',
        options: [
          { ar: 'Huruf Shad (Shī)', translit: 'Shad Mad Ya', isCorrect: true, feedback: 'Tepat! Kasrah bertemu ya sukun dibaca panjang 2 harakat.' },
          { ar: 'Huruf Ba', translit: 'Ba', isCorrect: false, feedback: 'Ba berharakat pendek 1 ketukan.' }
        ]
      }
    ]
  },

  // ==========================================
  // JILID 4: TANWIN, SUKUN & QALQALAH (6 Halaman)
  // ==========================================
  {
    jilid: 4,
    title: 'Iqra Jilid 4',
    levelBadge: 'J3 • Menengah',
    focus: 'Tanwin, Sukun (Konsonan Mati), & Pantulan Qalqalah',
    description: 'Membaca tanwin (-an, -in, -un), mematikan huruf dengan sukun, dan memantulkan 5 huruf Qalqalah (Baju di Thoko).',
    colorScheme: {
      primary: 'text-purple-800',
      secondary: 'bg-purple-100',
      bgGradient: 'from-purple-600 to-violet-800',
      border: 'border-purple-300'
    },
    pages: [
      {
        pageNumber: 1,
        metadata: {
          pageId: 'iq4_p1',
          globalPageNumber: 19,
          jilidNumber: 4,
          difficultyTier: 'menengah',
          difficultyScore: 78,
          tajweedCategory: 'Harakat Tanwin Fathatain (-an: ًـ)',
          competencyFocus: 'Pelafalan vokal an di akhir kata serta pengenalan alif penopang',
          targetCharacters: ['كِتَابًا', 'عَذَابًا', 'خَيْرًا'],
          estimatedMinutes: 5,
          xpReward: 55,
          starReward: 3,
          minWordMasteryCount: 6,
          prerequisitePageId: 'iq3_p6'
        },
        title: 'Halaman 1: Harakat Tanwin Fathatain (-an: ًـ)',
        subtitle: 'Bunyi "an" di akhir kata, sering disertai huruf Alif bantu di belakangnya',
        conceptRule: 'Alif bantu pada fathatain tidak dibaca saat washal (bersambung). Bacalah "an" lugas dan jelas.',
        words: [
          { id: 'iq4_p1_w1', ar: 'كِتَابًا', translit: 'Kitāban', meaning: 'Buku', syllables: ['كِ', 'تَا', 'بًا'], audioText: 'كِتَابًا' },
          { id: 'iq4_p1_w2', ar: 'عَذَابًا', translit: '‘Adzāban', meaning: 'Siksaan', syllables: ['عَ', 'ذَا', 'بًا'], audioText: 'عَذَابًا' },
          { id: 'iq4_p1_w3', ar: 'خَيْرًا', translit: 'Khairan', meaning: 'Kebaikan', syllables: ['خَيْ', 'رًا'], audioText: 'خَيْرًا' },
          { id: 'iq4_p1_w4', ar: 'أَجْرًا عَظِيمًا', translit: 'Ajran ‘Azhīmā', syllables: ['أَجْ', 'رًا'], audioText: 'أَجْرًا عَظِيمًا' },
          { id: 'iq4_p1_w5', ar: 'رِزْقًا حَسَنًا', translit: 'Rizqan Ḥasanā', syllables: ['رِزْ', 'قًا'], audioText: 'رِزْقًا حَسَنًا' },
          { id: 'iq4_p1_w6', ar: 'فَتْحًا مُبِينًا', translit: 'Fat-ḥan Mubīnā', syllables: ['فَتْ', 'حًا'], audioText: 'فَتْحًا مُبِينًا' }
        ]
      },
      {
        pageNumber: 2,
        metadata: {
          pageId: 'iq4_p2',
          globalPageNumber: 20,
          jilidNumber: 4,
          difficultyTier: 'menengah',
          difficultyScore: 80,
          tajweedCategory: 'Tanwin Kasratain (-in) & Dhammatain (-un)',
          competencyFocus: 'Pelafalan vokal in dan un di akhir kata dengan kejelasan nun mati di lisan',
          targetCharacters: ['رَحِيمٍ', 'عَذَابٌ', 'أَحَدٌ'],
          estimatedMinutes: 5,
          xpReward: 55,
          starReward: 3,
          minWordMasteryCount: 6,
          prerequisitePageId: 'iq4_p1'
        },
        title: 'Halaman 2: Harakat Tanwin Kasratain (-in: ٍـ) & Dhammatain (-un: ٌـ)',
        subtitle: 'Bunyi "in" dan "un" di akhir kata',
        conceptRule: 'Tanwin hakikatnya adalah nun mati di akhir kata yang terdengar saat dibaca tetapi tidak ditulis nun.',
        words: [
          { id: 'iq4_p2_w1', ar: 'رَحِيمٍ', translit: 'Raḥīmin', syllables: ['رَ', 'حِي', 'مٍ'], audioText: 'رَحِيمٍ' },
          { id: 'iq4_p2_w2', ar: 'عَذَابٌ', translit: '‘Adzābun', syllables: ['عَ', 'ذَا', 'بٌ'], audioText: 'عَذَابٌ' },
          { id: 'iq4_p2_w3', ar: 'أَحَدٌ', translit: 'Aḥadun', syllables: ['أَ', 'حَ', 'دٌ'], audioText: 'أَحَدٌ' },
          { id: 'iq4_p2_w4', ar: 'قَوْلٌ مَعْرُوفٌ', translit: 'Qawlun Ma‘rūf', syllables: ['قَوْ', 'لٌ'], audioText: 'قَوْلٌ مَعْرُوفٌ' },
          { id: 'iq4_p2_w5', ar: 'فِي جَنَّاتٍ', translit: 'Fī Jannātin', syllables: ['جَنَّا', 'تٍ'], audioText: 'فِي جَنَّاتٍ' },
          { id: 'iq4_p2_w6', ar: 'غَفُورٌ رَحِيمٌ', translit: 'Ghafūrun Raḥīm', syllables: ['غَ', 'فُو', 'رٌ'], audioText: 'غَفُورٌ رَحِيمٌ' }
        ]
      },
      {
        pageNumber: 3,
        metadata: {
          pageId: 'iq4_p3',
          globalPageNumber: 21,
          jilidNumber: 4,
          difficultyTier: 'menengah',
          difficultyScore: 83,
          tajweedCategory: 'Huruf Sukun (Konsonan Mati: ـْ)',
          competencyFocus: 'Menahan makhraj huruf mati tanpa menimbulkan bunyi vokal selipan',
          targetCharacters: ['أَمْ', 'أَنْ', 'هَلْ', 'يَسْتَبْشِرُ'],
          estimatedMinutes: 6,
          xpReward: 60,
          starReward: 3,
          minWordMasteryCount: 6,
          prerequisitePageId: 'iq4_p2'
        },
        title: 'Halaman 3: Huruf Sukun (Konsonan Mati: ـْ)',
        subtitle: 'Mematikan huruf secara tepat tanpa menambah bunyi vokal baru',
        conceptRule: 'Huruf bersukun harus ditahan pada makhrajnya. Huruf yang bukan qalqalah tidak boleh memantul.',
        words: [
          { id: 'iq4_p3_w1', ar: 'أَمْ - أَنْ', translit: 'Am - An', syllables: ['أَمْ', 'أَنْ'], audioText: 'أَمْ أَنْ' },
          { id: 'iq4_p3_w2', ar: 'هَلْ - بَلْ', translit: 'Hal - Bal', syllables: ['هَلْ', 'بَلْ'], audioText: 'هَلْ بَلْ' },
          { id: 'iq4_p3_w3', ar: 'يَسْتَبْشِرُ', translit: 'Yastabsyiru', syllables: ['يَسْ', 'تَبْ', 'شِ', 'رُ'], audioText: 'يَسْتَبْشِرُ' },
          { id: 'iq4_p3_w4', ar: 'أَرْسَلْنَا', translit: 'Arsalnā', syllables: ['أَرْ', 'سَلْ', 'نَا'], audioText: 'أَرْسَلْنَا' },
          { id: 'iq4_p3_w5', ar: 'أَفْلَحَ الْمُؤْمِنُونَ', translit: 'Aflaḥal-Mu’minūn', syllables: ['أَفْ', 'لَ', 'حَ'], audioText: 'أَفْلَحَ الْمُؤْمِنُونَ' },
          { id: 'iq4_p3_w6', ar: 'وَاسْتَغْفِرْهُ', translit: 'Wastaghfirh', syllables: ['وَاسْ', 'تَغْ', 'فِرْ', 'هُ'], audioText: 'وَاسْتَغْفِرْهُ' }
        ]
      },
      {
        pageNumber: 4,
        metadata: {
          pageId: 'iq4_p4',
          globalPageNumber: 22,
          jilidNumber: 4,
          difficultyTier: 'menengah',
          difficultyScore: 85,
          tajweedCategory: '5 Huruf Qalqalah (Baju di Thoko: ب ج د ط ق)',
          competencyFocus: 'Mengenal pantulan suara membal jernih pada 5 huruf qalqalah saat sukun',
          targetCharacters: ['أَبْ', 'أَجْ', 'أَدْ', 'أَطْ', 'أَقْ'],
          estimatedMinutes: 6,
          xpReward: 60,
          starReward: 3,
          minWordMasteryCount: 6,
          prerequisitePageId: 'iq4_p3'
        },
        title: 'Halaman 4: 5 Huruf Qalqalah (Baju di Thoko: ب ج د ط ق)',
        subtitle: 'Pengenalan getaran dan pantulan suara pada 5 huruf qalqalah saat berharakat sukun',
        conceptRule: 'Hanya 5 huruf ini yang boleh memantul saat mati: Ba, Jim, Dal, Tha, Qaf. Pantulan alami dan bersih.',
        words: [
          { id: 'iq4_p4_w1', ar: 'أَبْ - إِبْ - أُبْ', translit: 'Ab - Ib - Ub', syllables: ['أَبْ', 'إِبْ', 'أُبْ'], audioText: 'أَبْ إِبْ أُبْ', ruleTag: 'Qalqalah Ba' },
          { id: 'iq4_p4_w2', ar: 'أَجْ - إِجْ - أُجْ', translit: 'Aj - Ij - Uj', syllables: ['أَجْ', 'إِجْ', 'أُجْ'], audioText: 'أَجْ إِجْ أُجْ', ruleTag: 'Qalqalah Jim' },
          { id: 'iq4_p4_w3', ar: 'أَدْ - إِدْ - أُدْ', translit: 'Ad - Id - Ud', syllables: ['أَدْ', 'إِدْ', 'أُدْ'], audioText: 'أَدْ إِدْ أُدْ', ruleTag: 'Qalqalah Dal' },
          { id: 'iq4_p4_w4', ar: 'أَطْ - إِطْ - أُطْ', translit: 'Ath - Ith - Uth', syllables: ['أَطْ', 'إِطْ', 'أُطْ'], audioText: 'أَطْ إِطْ أُطْ', ruleTag: 'Qalqalah Tha' },
          { id: 'iq4_p4_w5', ar: 'أَقْ - إِقْ - أُقْ', translit: 'Aq - Iq - Uq', syllables: ['أَقْ', 'إِقْ', 'أُقْ'], audioText: 'أَقْ إِقْ أُقْ', ruleTag: 'Qalqalah Qaf' },
          { id: 'iq4_p4_w6', ar: 'قُطْبُ جَدٍّ', translit: 'Quthbu Jaddin (Rumus)', syllables: ['قُطْ', 'بُ'], audioText: 'قُطْبُ جَدٍّ', ruleTag: 'Rumus Qalqalah' }
        ]
      },
      {
        pageNumber: 5,
        metadata: {
          pageId: 'iq4_p5',
          globalPageNumber: 23,
          jilidNumber: 4,
          difficultyTier: 'menengah',
          difficultyScore: 87,
          tajweedCategory: 'Qalqalah Shughra (Pantulan Ringan di Tengah Kata)',
          competencyFocus: 'Pantulan qalqalah ringan yang menyambung mulus ke huruf berikutnya',
          targetCharacters: ['يَدْعُ', 'أَطْعَمَهُمْ', 'يَجْعَلْ', 'يَقْطَعُونَ'],
          estimatedMinutes: 6,
          xpReward: 60,
          starReward: 3,
          minWordMasteryCount: 6,
          prerequisitePageId: 'iq4_p4'
        },
        title: 'Halaman 5: Qalqalah Shughra (Pantulan Ringan di Tengah Kata)',
        subtitle: 'Huruf qalqalah sukun berada di tengah kata dibaca memantul ringan tanpa menghentikan nafas',
        conceptRule: 'Pantulan shughra mengalir terus ke huruf berikutnya dengan mulus.',
        words: [
          { id: 'iq4_p5_w1', ar: 'يَدْعُ', translit: 'Yad‘u', meaning: 'Dia berdoa', syllables: ['يَدْ', 'عُ'], audioText: 'يَدْعُ', ruleTag: 'Qalqalah Dal' },
          { id: 'iq4_p5_w2', ar: 'أَطْعَمَهُمْ', translit: 'Aṭ‘amahum', meaning: 'Dia memberi mereka makan', syllables: ['أَطْ', 'عَ', 'مَ', 'هُمْ'], audioText: 'أَطْعَمَهُمْ', ruleTag: 'Qalqalah Tha' },
          { id: 'iq4_p5_w3', ar: 'يَجْعَلْ', translit: 'Yaj‘al', meaning: 'Dia menjadikan', syllables: ['يَجْ', 'عَلْ'], audioText: 'يَجْعَلْ', ruleTag: 'Qalqalah Jim' },
          { id: 'iq4_p5_w4', ar: 'يَقْطَعُونَ', translit: 'Yaqtha‘ūn', syllables: ['يَقْ', 'طَ', 'عُو', 'نَ'], audioText: 'يَقْطَعُونَ', ruleTag: 'Qalqalah Qaf' },
          { id: 'iq4_p5_w5', ar: 'حَبْلٌ مِن مَسَدٍ', translit: 'Ḥablum mim masad', syllables: ['حَبْ', 'لٌ'], audioText: 'حَبْلٌ مِن مَسَدٍ', ruleTag: 'Qalqalah Ba' },
          { id: 'iq4_p5_w6', ar: 'يَبْتَغُونَ فَضْلًا', translit: 'Yabtaghūna Fadhla', syllables: ['يَبْ', 'تَ', 'غُو', 'نَ'], audioText: 'يَبْتَغُونَ فَضْلًا', ruleTag: 'Qalqalah Ba' }
        ]
      },
      {
        pageNumber: 6,
        metadata: {
          pageId: 'iq4_p6',
          globalPageNumber: 24,
          jilidNumber: 4,
          difficultyTier: 'menengah',
          difficultyScore: 90,
          tajweedCategory: 'Qalqalah Kubra saat Berhenti/Waqaf',
          competencyFocus: 'Pantulan kubra yang terdengar lebih kuat, tegas, dan menggema saat waqaf di akhir ayat',
          targetCharacters: ['الْفَلَقْ', 'خَلَقْ', 'وَقَبْ', 'مَسَدْ', 'أَحَدْ'],
          estimatedMinutes: 7,
          xpReward: 75,
          starReward: 3,
          minWordMasteryCount: 6,
          prerequisitePageId: 'iq4_p5'
        },
        title: 'Halaman 6: Qalqalah Kubra (Pantulan Mantap saat Waqaf di Akhir Ayat)',
        subtitle: 'Huruf qalqalah berada di akhir kata dan dibaca sukun karena berhenti (waqaf)',
        conceptRule: 'Pantulan kubra terdengar lebih kuat, tegas, dan menggema daripada qalqalah shughra.',
        words: [
          { id: 'iq4_p6_w1', ar: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝', translit: '...birabbil-falaq', syllables: ['الْـ', 'فَ', 'لَقْ'], audioText: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ', ruleTag: 'Qalqalah Qaf' },
          { id: 'iq4_p6_w2', ar: 'مِن شَرِّ مَا خَلَقَ ۝', translit: '...mā khalaq', syllables: ['خَ', 'لَقْ'], audioText: 'مِن شَرِّ مَا خَلَقَ', ruleTag: 'Qalqalah Qaf' },
          { id: 'iq4_p6_w3', ar: 'وَإِذَا وَقَبَ ۝', translit: '...wa idzā waqab', syllables: ['وَ', 'قَبْ'], audioText: 'وَإِذَا وَقَبَ', ruleTag: 'Qalqalah Ba' },
          { id: 'iq4_p6_w4', ar: 'فِي جِيدِهَا حَبْلٌ مِّن مَّسَدٍ ۝', translit: '...mim masad', syllables: ['مَ', 'سَدْ'], audioText: 'مِّن مَّسَدٍ', ruleTag: 'Qalqalah Dal' },
          { id: 'iq4_p6_w5', ar: 'مَا أَغْنَىٰ عَنْهُ مَالُهُ وَمَا كَسَبَ ۝', translit: '...wa mā kasab', syllables: ['كَ', 'سَبْ'], audioText: 'وَمَا كَسَبَ', ruleTag: 'Qalqalah Ba' },
          { id: 'iq4_p6_w6', ar: 'قُلْ هُوَ اللَّهُ أَحَدٌ ۝', translit: 'Qul huwallāhu aḥad', syllables: ['أَ', 'حَدْ'], audioText: 'قُلْ هُوَ اللَّهُ أَحَدٌ', ruleTag: 'Qalqalah Dal' }
        ]
      }
    ],
    quizQuestions: [
      {
        id: 'q_iq4_1',
        question: 'Manakah dari kata berikut yang mengandung huruf Qalqalah?',
        options: [
          { ar: 'يَدْعُ', translit: 'Yad‘u (Huruf Dal sukun)', isCorrect: true, feedback: 'Benar! Huruf Dal adalah salah satu huruf Qalqalah (Baju di Thoko).' },
          { ar: 'سَمِعَ', translit: 'Sami‘a', isCorrect: false, feedback: 'Tidak ada huruf qalqalah sukun.' }
        ]
      }
    ]
  },

  // ==========================================
  // JILID 5: TASYDID, GHUNNAH & ALIF LAM (6 Halaman)
  // ==========================================
  {
    jilid: 5,
    title: 'Iqra Jilid 5',
    levelBadge: 'J4 • Lanjutan',
    focus: 'Tasydid, Alif Lam Qamariyah & Syamsiyah, Waqaf & Ghunnah',
    description: 'Membaca huruf rangkap tasydid ditekan ganda, membedakan Alif Lam terbaca jelas vs melebur, dan berhenti (waqaf).',
    colorScheme: {
      primary: 'text-rose-800',
      secondary: 'bg-rose-100',
      bgGradient: 'from-rose-600 to-pink-800',
      border: 'border-rose-300'
    },
    pages: [
      {
        pageNumber: 1,
        metadata: {
          pageId: 'iq5_p1',
          globalPageNumber: 25,
          jilidNumber: 5,
          difficultyTier: 'lanjutan',
          difficultyScore: 91,
          tajweedCategory: 'Harakat Tasydid / Syaddah (ـّ)',
          competencyFocus: 'Menekan makhraj huruf rangkap sebelum melafalkan harakatnya',
          targetCharacters: ['رَبَّنَا', 'مَدَّ', 'حَقَّ', 'قَدَّرَ'],
          estimatedMinutes: 6,
          xpReward: 60,
          starReward: 3,
          minWordMasteryCount: 6,
          prerequisitePageId: 'iq4_p6'
        },
        title: 'Halaman 1: Harakat Tasydid / Syaddah (ـّ)',
        subtitle: 'Huruf ganda: huruf pertama sukun, huruf kedua berharakat hidup',
        conceptRule: 'Tekan makhraj huruf dengan mantap sebelum melafalkan harakatnya.',
        words: [
          { id: 'iq5_p1_w1', ar: 'رَبَّنَا', translit: 'Rabbanā', syllables: ['رَبْ', 'بَ', 'نَا'], audioText: 'رَبَّنَا', ruleTag: 'Tasydid Ba' },
          { id: 'iq5_p1_w2', ar: 'مَدَّ - يَمُدُّ', translit: 'Madda - Yamuddu', syllables: ['مَدْ', 'دَ'], audioText: 'مَدَّ يَمُدُّ', ruleTag: 'Tasydid Dal' },
          { id: 'iq5_p1_w3', ar: 'حَقَّ عَلَيْهِ', translit: 'Ḥaqqa ‘alaihi', syllables: ['حَقْ', 'قَ'], audioText: 'حَقَّ عَلَيْهِ', ruleTag: 'Tasydid Qaf' },
          { id: 'iq5_p1_w4', ar: 'قَدَّرَ فَهَدَىٰ', translit: 'Qaddara fa-hadā', syllables: ['قَدْ', 'دَ', 'رَ'], audioText: 'قَدَّرَ فَهَدَىٰ', ruleTag: 'Tasydid Dal' },
          { id: 'iq5_p1_w5', ar: 'كَلَّا لَيُنبَذَنَّ', translit: 'Kallā layumbadzanna', syllables: ['كَلْ', 'لَا'], audioText: 'كَلَّا لَيُنبَذَنَّ', ruleTag: 'Tasydid Lam' },
          { id: 'iq5_p1_w6', ar: 'فَصَلِّ لِرَبِّكَ', translit: 'Fa-shalli li-rabbika', syllables: ['صَلْ', 'لِ'], audioText: 'فَصَلِّ لِرَبِّكَ', ruleTag: 'Tasydid Lam & Ba' }
        ]
      },
      {
        pageNumber: 2,
        metadata: {
          pageId: 'iq5_p2',
          globalPageNumber: 26,
          jilidNumber: 5,
          difficultyTier: 'lanjutan',
          difficultyScore: 93,
          tajweedCategory: 'Ghunnah Wajibah: Nun & Mim Bertasydid (نّ & مّ)',
          competencyFocus: 'Mendengungkan suara di pangkal hidung (Khaisyum) selama 2 harakat penuh',
          targetCharacters: ['إِنَّ', 'ثُمَّ', 'عَمَّ', 'مِنَ الْجِنَّةِ'],
          estimatedMinutes: 6,
          xpReward: 60,
          starReward: 3,
          minWordMasteryCount: 6,
          prerequisitePageId: 'iq5_p1'
        },
        title: 'Halaman 2: Ghunnah Wajibah: Nun & Mim Bertasydid (نّ & مّ)',
        subtitle: 'Wajib berdengung di pangkal hidung (Khaisyum) selama 2 harakat penuh',
        conceptRule: 'Tahan dengung suara di hidung sebelum melepaskan harakat akhir pada Nun dan Mim tasydid.',
        words: [
          { id: 'iq5_p2_w1', ar: 'إِنَّ', translit: 'Inna (Dengung 2 Harakat)', syllables: ['إِنْ', 'نَ'], audioText: 'إِنَّ', ruleTag: 'Ghunnah Nun' },
          { id: 'iq5_p2_w2', ar: 'ثُمَّ', translit: 'Tsumma (Dengung 2 Harakat)', syllables: ['ثُمْ', 'مَ'], audioText: 'ثُمَّ', ruleTag: 'Ghunnah Mim' },
          { id: 'iq5_p2_w3', ar: 'عَمَّ يَتَسَاءَلُونَ', translit: '‘Amma Yatasā-alūn', syllables: ['عَمْ', 'مَ'], audioText: 'عَمَّ يَتَسَاءَلُونَ', ruleTag: 'Ghunnah Mim' },
          { id: 'iq5_p2_w4', ar: 'مِنَ الْجِنَّةِ وَالنَّاسِ', translit: 'Minal-jinnati wan-nās', syllables: ['جِنْ', 'نَةِ', 'نَّا', 'سِ'], audioText: 'مِنَ الْجِنَّةِ وَالنَّاسِ', ruleTag: 'Ghunnah Nun' },
          { id: 'iq5_p2_w5', ar: 'إِنَّا أَعْطَيْنَاكَ', translit: 'Innā a‘thaināk', syllables: ['إِنْ', 'نَا'], audioText: 'إِنَّا أَعْطَيْنَاكَ', ruleTag: 'Ghunnah Nun' },
          { id: 'iq5_p2_w6', ar: 'فَأُمُّهُ هَاوِيَةٌ', translit: 'Fa-ummuhū hāwiyah', syllables: ['أُمْ', 'مُ', 'هُ'], audioText: 'فَأُمُّهُ هَاوِيَةٌ', ruleTag: 'Ghunnah Mim' }
        ]
      },
      {
        pageNumber: 3,
        metadata: {
          pageId: 'iq5_p3',
          globalPageNumber: 27,
          jilidNumber: 5,
          difficultyTier: 'lanjutan',
          difficultyScore: 94,
          tajweedCategory: 'Alif Lam Qamariyah (Dibaca Jelas / Idzhar Qamariyah)',
          competencyFocus: 'Membaca huruf Lam sukun secara jelas dan terang pada 14 huruf Qamariyah',
          targetCharacters: ['الْقَمَرُ', 'الْحَمْدُ', 'الْكِتَابُ'],
          estimatedMinutes: 6,
          xpReward: 60,
          starReward: 3,
          minWordMasteryCount: 6,
          prerequisitePageId: 'iq5_p2'
        },
        title: 'Halaman 3: Alif Lam Qamariyah (Dibaca Jelas / Idzhar Qamariyah)',
        subtitle: 'Huruf Lam berharakat sukun di atasnya, dibaca terang dan jelas "Al-"',
        conceptRule: '14 Huruf Qamariyah terangkum dalam kalimat: "Ibghi Ḥajjaka wa Khaf ‘Aqīmah" (ء ب غ ح ج ك و خ ف ع ق ي م هـ).',
        words: [
          { id: 'iq5_p3_w1', ar: 'الْقَمَرُ', translit: 'Al-Qamaru', meaning: 'Bulan', syllables: ['الْـ', 'قَ', 'مَ', 'رُ'], audioText: 'الْقَمَرُ', ruleTag: 'Qamariyah' },
          { id: 'iq5_p3_w2', ar: 'الْحَمْدُ لِلَّهِ', translit: 'Al-Ḥamdu Lillāh', syllables: ['الْـ', 'حَمْ', 'دُ'], audioText: 'الْحَمْدُ لِلَّهِ', ruleTag: 'Qamariyah' },
          { id: 'iq5_p3_w3', ar: 'الْكِتَابُ لَا رَيْبَ فِيهِ', translit: 'Al-Kitābu lā raiba fīh', syllables: ['الْـ', 'كِ', 'تَا', 'بُ'], audioText: 'الْكِتَابُ لَا رَيْبَ فِيهِ', ruleTag: 'Qamariyah' },
          { id: 'iq5_p3_w4', ar: 'الْبَلَدُ الْأَمِينُ', translit: 'Al-Baladul-Amīn', syllables: ['الْـ', 'بَ', 'لَ', 'دُ'], audioText: 'الْبَلَدُ الْأَمِينُ', ruleTag: 'Qamariyah' },
          { id: 'iq5_p3_w5', ar: 'الْغَفُورُ الْوَدُودُ', translit: 'Al-Ghafūrul-Wadūd', syllables: ['الْـ', 'غَ', 'فُو', 'رُ'], audioText: 'الْغَفُورُ الْوَدُودُ', ruleTag: 'Qamariyah' },
          { id: 'iq5_p3_w6', ar: 'الْيَوْمَ أَكْمَلْتُ لَكُمْ', translit: 'Al-Yawma akmaltu lakum', syllables: ['الْـ', 'يَوْ', 'مَ'], audioText: 'الْيَوْمَ أَكْمَلْتُ لَكُمْ', ruleTag: 'Qamariyah' }
        ]
      },
      {
        pageNumber: 4,
        metadata: {
          pageId: 'iq5_p4',
          globalPageNumber: 28,
          jilidNumber: 5,
          difficultyTier: 'lanjutan',
          difficultyScore: 95,
          tajweedCategory: 'Alif Lam Syamsiyah (Melebur / Idgham Syamsiyah)',
          competencyFocus: 'Meleburkan huruf Lam langsung ke huruf syamsiyah yang bertasydid',
          targetCharacters: ['الشَّمْسُ', 'الرَّحْمَٰنِ', 'الصَّلَاةُ'],
          estimatedMinutes: 6,
          xpReward: 60,
          starReward: 3,
          minWordMasteryCount: 6,
          prerequisitePageId: 'iq5_p3'
        },
        title: 'Halaman 4: Alif Lam Syamsiyah (Melebur / Idgham Syamsiyah)',
        subtitle: 'Huruf Lam tidak dibaca bunyi "L", melainkan melebur langsung ke huruf berikutnya yang bertasydid',
        conceptRule: 'Lam tidak diberi tanda sukun, dan huruf berikutnya bertanda tasydid (misal: Asy-Syamsu, Ar-Rahman).',
        words: [
          { id: 'iq5_p4_w1', ar: 'الشَّمْسُ', translit: 'Asy-Syamsu', meaning: 'Matahari', syllables: ['أَشْ', 'شَمْ', 'سُ'], audioText: 'الشَّمْسُ', ruleTag: 'Syamsiyah' },
          { id: 'iq5_p4_w2', ar: 'الرَّحْمَٰنِ الرَّحِيمِ', translit: 'Ar-Raḥmānir-Raḥīm', syllables: ['أَرْ', 'رَحْ', 'مَانِ'], audioText: 'الرَّحْمَٰنِ الرَّحِيمِ', ruleTag: 'Syamsiyah' },
          { id: 'iq5_p4_w3', ar: 'الصَّلَاةُ وَالزَّكَاةُ', translit: 'Ash-Shalātu waz-Zakāh', syllables: ['أَصْ', 'صَ', 'لَا', 'ةُ'], audioText: 'الصَّلَاةُ وَالزَّكَاةُ', ruleTag: 'Syamsiyah' },
          { id: 'iq5_p4_w4', ar: 'التَّائِبُونَ الْعَابِدُونَ', translit: 'At-Tā-ibūnal-‘Ābidūn', syllables: ['أَتْ', 'تَا', 'ئِ', 'بُو', 'نَ'], audioText: 'التَّائِبُونَ الْعَابِدُونَ', ruleTag: 'Syamsiyah' },
          { id: 'iq5_p4_w5', ar: 'النَّاسُ سَوَاسِيَةٌ', translit: 'An-Nāsu sawāsiyah', syllables: ['أَنDefault', 'نَا', 'سُ'], audioText: 'النَّاسُ سَوَاسِيَةٌ', ruleTag: 'Syamsiyah' },
          { id: 'iq5_p4_w6', ar: 'وَالسَّمَاءِ وَالطَّارِقِ', translit: 'Was-samā-i wath-thāriq', syllables: ['وَسْ', 'سَ', 'مَا', 'ءِ'], audioText: 'وَالسَّمَاءِ وَالطَّارِقِ', ruleTag: 'Syamsiyah' }
        ]
      },
      {
        pageNumber: 5,
        metadata: {
          pageId: 'iq5_p5',
          globalPageNumber: 29,
          jilidNumber: 5,
          difficultyTier: 'lanjutan',
          difficultyScore: 96,
          tajweedCategory: 'Kaidah Waqaf (Berhenti) & Ta Marbuthah (ـة / ة)',
          competencyFocus: 'Mengubah bunyi Ta Marbuthah menjadi H sukun saat waqaf di akhir kata/ayat',
          targetCharacters: ['الْقَارِعَةُ', 'عَالِيَةٍ', 'حَامِيَةٌ'],
          estimatedMinutes: 6,
          xpReward: 65,
          starReward: 3,
          minWordMasteryCount: 6,
          prerequisitePageId: 'iq5_p4'
        },
        title: 'Halaman 5: Kaidah Waqaf (Berhenti) & Ta Marbuthah (ـة / ة)',
        subtitle: 'Cara berhenti di akhir bacaan: huruf akhir dimatikan, dan Ta Marbuthah berubah bunyi jadi "H"',
        conceptRule: 'Jika berhenti pada kata berakhiran Ta Marbuthah (ـة / ة), suaranya menjadi "H" sukun (misal: Jannah, Qari\'ah).',
        words: [
          { id: 'iq5_p5_w1', ar: 'الْقَارِعَةُ ۝ (الْقَارِعَهْ)', translit: 'Al-Qāri‘ah', meaning: 'Hari Kiamat', syllables: ['الْـ', 'قَا', 'رِ', 'عَهْ'], audioText: 'الْقَارِعَةُ', ruleTag: 'Waqaf Ta Marbuthah' },
          { id: 'iq5_p5_w2', ar: 'فِي جَنَّةٍ عَالِيَةٍ ۝ (عَالِيَهْ)', translit: '...‘āliyah', syllables: ['عَا', 'لِ', 'يَهْ'], audioText: 'فِي جَنَّةٍ عَالِيَةٍ', ruleTag: 'Waqaf Ta Marbuthah' },
          { id: 'iq5_p5_w3', ar: 'نَارٌ حَامِيَةٌ ۝ (حَامِيَهْ)', translit: '...ḥāmiyah', syllables: ['حَا', 'مِ', 'يَهْ'], audioText: 'نَارٌ حَامِيَةٌ', ruleTag: 'Waqaf Ta Marbuthah' },
          { id: 'iq5_p5_w4', ar: 'رَحْمَةُ اللَّهِ (رَحْمَهْ)', translit: 'Raḥmatullāh / Raḥmah', syllables: ['رَحْ', 'مَهْ'], audioText: 'رَحْمَةُ اللَّهِ', ruleTag: 'Waqaf Ta Marbuthah' },
          { id: 'iq5_p5_w5', ar: 'لِإِيلَافِ قُرَيْشٍ ۝ (قُرَيْشْ)', translit: '...Quraisy', syllables: ['قُ', 'رَيْشْ'], audioText: 'لِإِيلَافِ قُرَيْشٍ', ruleTag: 'Waqaf Sukun' },
          { id: 'iq5_p5_w6', ar: 'إِيلَافِهِمْ رِحْلَةَ الشِّتَاءِ وَالصَّيْفِ ۝ (وَالصَّيْفْ)', translit: '...wash-shaif', syllables: ['وَصْ', 'صَيْفْ'], audioText: 'وَالصَّيْفِ', ruleTag: 'Waqaf Sukun' }
        ]
      },
      {
        pageNumber: 6,
        metadata: {
          pageId: 'iq5_p6',
          globalPageNumber: 30,
          jilidNumber: 5,
          difficultyTier: 'lanjutan',
          difficultyScore: 97,
          tajweedCategory: 'Tilawah Ayat Bertasydid & Bersambung',
          competencyFocus: 'Kelancaran membaca ayat bersambung dengan tasydid, ghunnah, dan alif lam',
          targetCharacters: ['إِنَّ مَعَ الْعُسْرِ يُسْرًا', 'تَبَّتْ يَدَا'],
          estimatedMinutes: 7,
          xpReward: 80,
          starReward: 3,
          minWordMasteryCount: 6,
          prerequisitePageId: 'iq5_p5'
        },
        title: 'Halaman 6: Tilawah Ayat Bertasydid & Bersambung',
        subtitle: 'Latihan membaca ayat-ayat Al-Qur\'an dengan penerapan tasydid, ghunnah, dan alif lam secara utuh',
        conceptRule: 'Jaga kesinambungan bacaan dan kesesuaian tempo tilawah secara tartil.',
        words: [
          { id: 'iq5_p6_w1', ar: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا', translit: 'Inna ma‘al-‘usri yusrā', meaning: 'Sesungguhnya bersama kesulitan ada kemudahan', syllables: ['إِنْ', 'نَ', 'مَ', 'عَ'], audioText: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا' },
          { id: 'iq5_p6_w2', ar: 'فَإِذَا فَرَغْتَ فَانصَبْ', translit: 'Fa-idzā faraghta fanshab', syllables: ['فَـ', 'إِ', 'ذَا'], audioText: 'فَإِذَا فَرَغْتَ فَانصَبْ' },
          { id: 'iq5_p6_w3', ar: 'وَإِلَىٰ رَبِّكَ فَارْغَب', translit: 'Wa ilā rabbika farghab', syllables: ['رَبِّ', 'كَ'], audioText: 'وَإِلَىٰ رَبِّكَ فَارْغَب' },
          { id: 'iq5_p6_w4', ar: 'تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ', translit: 'Tabbat yadā abī lahabiw-wa tabb', syllables: ['تَبْ', 'بَتْ'], audioText: 'تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ' },
          { id: 'iq5_p6_w5', ar: 'فِي جِيدِهَا حَبْلٌ مِّن مَّسَدٍ', translit: 'Fī jīdihā ḥablum mim masad', syllables: ['حَبْ', 'لٌ'], audioText: 'فِي جِيدِهَا حَبْلٌ مِّن مَّسَدٍ' },
          { id: 'iq5_p6_w6', ar: 'إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ', translit: 'Innā a‘thainākal-kautsar', syllables: ['إِنْ', 'نَا'], audioText: 'إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ' }
        ]
      }
    ],
    quizQuestions: [
      {
        id: 'q_iq5_1',
        question: 'Pada lafazh "الشَّمْسُ", mengapa huruf Lam tidak dibaca bunyi "L"?',
        options: [
          { ar: 'Karena Alif Lam Syamsiyah (melebur ke Syin)', translit: 'Idgham Syamsiyah', isCorrect: true, feedback: 'Mumtaz! Huruf Syin adalah huruf Syamsiyah sehingga Lam melebur.' },
          { ar: 'Karena salah harakat', translit: 'Bukan alasan', isCorrect: false, feedback: 'Ini kaidah tajweed Alif Lam Syamsiyah.' }
        ]
      }
    ]
  },

  // ==========================================
  // JILID 6: HUKUM TAJWEED LENGKAP & MUSHAF RASM UTSMANI (6 Halaman)
  // ==========================================
  {
    jilid: 6,
    title: 'Iqra Jilid 6',
    levelBadge: 'J5 • Mahir & Tajweed Al-Qur\'an',
    focus: 'Kaidah Tajweed Lengkap & Membaca Mushaf Al-Qur\'an Rasm Utsmani',
    description: 'Menguasai Hukum Nun Sukun & Tanwin (Izhar, Idgham, Ikhfa, Iqlab), Mad Far\'i, dan tilawah surat-surat pendek Al-Qur\'an.',
    colorScheme: {
      primary: 'text-teal-900',
      secondary: 'bg-teal-100',
      bgGradient: 'from-teal-700 to-cyan-900',
      border: 'border-teal-400'
    },
    pages: [
      {
        pageNumber: 1,
        metadata: {
          pageId: 'iq6_p1',
          globalPageNumber: 31,
          jilidNumber: 6,
          difficultyTier: 'tajwid_mushaf',
          difficultyScore: 98,
          tajweedCategory: 'Hukum Nun Mati & Tanwin: Izhar Halqi & Iqlab',
          competencyFocus: 'Kaidah membaca jelas tanpa dengung (Izhar) dan menukar bunyi menjadi mim (Iqlab)',
          targetCharacters: ['مَنْ ءَامَنَ', 'مِن بَعْدِ', 'سَمِيعٌ بَصِيرٌ'],
          estimatedMinutes: 7,
          xpReward: 70,
          starReward: 3,
          minWordMasteryCount: 6,
          prerequisitePageId: 'iq5_p6'
        },
        title: 'Halaman 1: Hukum Nun Mati & Tanwin: Izhar Halqi & Iqlab',
        subtitle: 'Izhar dibaca jelas tanpa dengung; Iqlab ditukar menjadi bunyi mim samar berdengung',
        conceptRule: 'Huruf Izhar ada 6 (ء هـ ع ح غ خ). Huruf Iqlab hanya 1 yaitu Ba (ب) dengan tanda mim kecil (مـ).',
        words: [
          { id: 'iq6_p1_w1', ar: 'مَنْ ءَامَنَ', translit: 'Man āmana (Izhar Halqi)', syllables: ['مَنْ', 'ءَا', 'مَ', 'نَ'], audioText: 'مَنْ ءَامَنَ', ruleTag: 'Izhar Halqi' },
          { id: 'iq6_p1_w2', ar: 'عَذَابٌ أَلِيمٌ', translit: '‘Adzābun Alīm (Izhar Halqi)', syllables: ['عَ', 'ذَا', 'بٌ', 'أَ', 'لِي', 'مٌ'], audioText: 'عَذَابٌ أَلِيمٌ', ruleTag: 'Izhar Halqi' },
          { id: 'iq6_p1_w3', ar: 'مِنْ حَكِيمٍ حَمِيدٍ', translit: 'Min ḥakīmin ḥamīd', syllables: ['مِنْ', 'حَ', 'كِي', 'مٍ'], audioText: 'مِنْ حَكِيمٍ حَمِيدٍ', ruleTag: 'Izhar Halqi' },
          { id: 'iq6_p1_w4', ar: 'مِن بَعْدِ', translit: 'Mim ba‘di (Iqlab: Jadi Mim)', syllables: ['مِمْ', 'بَعْ', 'دِ'], audioText: 'مِن بَعْدِ', ruleTag: 'Iqlab' },
          { id: 'iq6_p1_w5', ar: 'سَمِيعٌ بَصِيرٌ', translit: 'Samī‘um Bashīr (Iqlab)', syllables: ['سَ', 'مِي', 'عُمْ', 'بَ', 'صِي', 'رٌ'], audioText: 'سَمِيعٌ بَصِيرٌ', ruleTag: 'Iqlab' },
          { id: 'iq6_p1_w6', ar: 'أَنبِئْهُم بِأَسْمَائِهِمْ', translit: 'Ambi’hum bi-asmā-ihim', syllables: ['أَمْ', 'بِئْ', 'هُمْ'], audioText: 'أَنبِئْهُم بِأَسْمَائِهِمْ', ruleTag: 'Iqlab' }
        ]
      },
      {
        pageNumber: 2,
        metadata: {
          pageId: 'iq6_p2',
          globalPageNumber: 32,
          jilidNumber: 6,
          difficultyTier: 'tajwid_mushaf',
          difficultyScore: 98,
          tajweedCategory: 'Idgham Bighunnah (Dengung) & Bilaghunnah (Tanpa Dengung)',
          competencyFocus: 'Kaidah melebur dengan dengung (Yanmu) vs melebur tanpa dengung (Lam & Ra)',
          targetCharacters: ['مَن يَقُولُ', 'مِن رَّبِّهِمْ', 'خَيْرًا يَرَهُ'],
          estimatedMinutes: 7,
          xpReward: 70,
          starReward: 3,
          minWordMasteryCount: 6,
          prerequisitePageId: 'iq6_p1'
        },
        title: 'Halaman 2: Idgham Bighunnah (Dengung) & Idgham Bilaghunnah (Tanpa Dengung)',
        subtitle: 'Meleburkan suara nun mati/tanwin ke dalam huruf idgham setelahnya',
        conceptRule: 'Bighunnah ada 4 huruf: Ya, Nun, Mim, Waw (Yanmu). Bilaghunnah ada 2 huruf: Lam dan Ra (tanpa dengung).',
        words: [
          { id: 'iq6_p2_w1', ar: 'مَن يَقُولُ', translit: 'May yaqūlu (Bighunnah)', syllables: ['مَيْ', 'يَ', 'قُو', 'لُ'], audioText: 'مَن يَقُولُ', ruleTag: 'Idgham Bighunnah' },
          { id: 'iq6_p2_w2', ar: 'مِّن وَالٍ', translit: 'Miw wāl (Bighunnah)', syllables: ['مِوْ', 'وَا', 'لٍ'], audioText: 'مِّن وَالٍ', ruleTag: 'Idgham Bighunnah' },
          { id: 'iq6_p2_w3', ar: 'خَيْرًا يَرَهُ', translit: 'Khairay yarah (Bighunnah)', syllables: ['خَيْ', 'رَيْ', 'يَ', 'رَ', 'هُ'], audioText: 'خَيْرًا يَرَهُ', ruleTag: 'Idgham Bighunnah' },
          { id: 'iq6_p2_w4', ar: 'مِن رَّبِّهِمْ', translit: 'Mir rabbihim (Bilaghunnah)', syllables: ['مِرْ', 'رَبِّ', 'هِمْ'], audioText: 'مِن رَّبِّهِمْ', ruleTag: 'Idgham Bilaghunnah' },
          { id: 'iq6_p2_w5', ar: 'هُدًى لِّلْمُتَّقِينَ', translit: 'Hudal lil-muttaqīn (Bilaghunnah)', syllables: ['هُ', 'دَلْ', 'لِلْ'], audioText: 'هُدًى لِّلْمُتَّقِينَ', ruleTag: 'Idgham Bilaghunnah' },
          { id: 'iq6_p2_w6', ar: 'غَفُورٌ رَّحِيمٌ', translit: 'Ghafūrur raḥīm (Bilaghunnah)', syllables: ['غَ', 'فُو', 'رُرْ', 'رَ', 'حِي', 'مٌ'], audioText: 'غَفُورٌ رَّحِيمٌ', ruleTag: 'Idgham Bilaghunnah' }
        ]
      },
      {
        pageNumber: 3,
        metadata: {
          pageId: 'iq6_p3',
          globalPageNumber: 33,
          jilidNumber: 6,
          difficultyTier: 'tajwid_mushaf',
          difficultyScore: 99,
          tajweedCategory: 'Ikhfa Haqiqi (Samar-samar Berdengung 15 Huruf)',
          competencyFocus: 'Menyamarkan nun mati ke makhraj 15 huruf ikhfa dengan dengung 2 harakat',
          targetCharacters: ['مِن قَبْلُ', 'كُنتُمْ', 'مِن دُونِ اللَّهِ'],
          estimatedMinutes: 7,
          xpReward: 70,
          starReward: 3,
          minWordMasteryCount: 6,
          prerequisitePageId: 'iq6_p2'
        },
        title: 'Halaman 3: Ikhfa Haqiqi (Samar-samar Berdengung pada 15 Huruf)',
        subtitle: 'Menyamarkan bunyi nun mati mendekati makhraj huruf berikutnya disertai dengung 2 harakat',
        conceptRule: 'Huruf Ikhfa: Ta, Tsa, Jim, Dal, Dzal, Zay, Sin, Syin, Shad, Dhad, Tha, Zha, Fa, Qaf, Kaf.',
        words: [
          { id: 'iq6_p3_w1', ar: 'مِن قَبْلُ', translit: 'Ming qablu (Samar Tebal)', syllables: ['مِنْ', 'قَبْ', 'لُ'], audioText: 'مِن قَبْلُ', ruleTag: 'Ikhfa Haqiqi' },
          { id: 'iq6_p3_w2', ar: 'كُنتُمْ خَيْرَ أُمَّةٍ', translit: 'Kuntum khaira ummah', syllables: ['كُنْ', 'تُمْ'], audioText: 'كُنتُمْ خَيْرَ أُمَّةٍ', ruleTag: 'Ikhfa Haqiqi' },
          { id: 'iq6_p3_w3', ar: 'مِن دُونِ اللَّهِ', translit: 'Min dūnillāh', syllables: ['مِنْ', 'دُو', 'نِ'], audioText: 'مِن دُونِ اللَّهِ', ruleTag: 'Ikhfa Haqiqi' },
          { id: 'iq6_p3_w4', ar: 'عَزِيزٌ ذُو انتِقَامٍ', translit: '‘Azīzun dzuntiqām', syllables: ['عَ', 'زِي', 'زُنْ', 'ذُو'], audioText: 'عَزِيزٌ ذُو انتِقَامٍ', ruleTag: 'Ikhfa Haqiqi' },
          { id: 'iq6_p3_w5', ar: 'مِن طِينٍ', translit: 'Min thīn', syllables: ['مِنْ', 'طِي', 'نٍ'], audioText: 'مِن طِينٍ', ruleTag: 'Ikhfa Haqiqi' },
          { id: 'iq6_p3_w6', ar: 'أَنفُسَكُمْ', translit: 'Anfusakum', syllables: ['أَنْ', 'فُ', 'سَ', 'كُمْ'], audioText: 'أَنفُسَكُمْ', ruleTag: 'Ikhfa Haqiqi' }
        ]
      },
      {
        pageNumber: 4,
        metadata: {
          pageId: 'iq6_p4',
          globalPageNumber: 34,
          jilidNumber: 6,
          difficultyTier: 'tajwid_mushaf',
          difficultyScore: 99,
          tajweedCategory: 'Hukum Mim Sukun (Ikhfa Syafawi, Idgham Mimi, Izhar Syafawi)',
          competencyFocus: 'Tiga kaidah mim sukun di bibir: dengung bertemu Ba/Mim vs jelas bertemu selainnya',
          targetCharacters: ['تَرْمِيهِم بِحِجَارَةٍ', 'لَهُم مَّا', 'أَلَمْ تَرَ'],
          estimatedMinutes: 7,
          xpReward: 70,
          starReward: 3,
          minWordMasteryCount: 6,
          prerequisitePageId: 'iq6_p3'
        },
        title: 'Halaman 4: Hukum Mim Sukun (Ikhfa Syafawi, Idgham Mimi, Izhar Syafawi)',
        subtitle: 'Tiga hukum saat huruf Mim sukun (مْ) bertemu huruf hijaiyah di bibir',
        conceptRule: 'Bertemu Ba = Ikhfa Syafawi (dengung). Bertemu Mim = Idgham Mimi (dengung). Bertemu selainnya = Izhar Syafawi (jelas).',
        words: [
          { id: 'iq6_p4_w1', ar: 'تَرْمِيهِم بِحِجَارَةٍ', translit: 'Tarmīhim bi-ḥijārah (Ikhfa Syafawi)', syllables: ['تَرْ', 'مِي', 'هِمْ', 'بِـ'], audioText: 'تَرْمِيهِم بِحِجَارَةٍ', ruleTag: 'Ikhfa Syafawi' },
          { id: 'iq6_p4_w2', ar: 'لَهُم مَّا يَشَاءُونَ', translit: 'Lahum mā yasyā-ūn (Idgham Mimi)', syllables: ['لَ', 'هُمْ', 'مَا'], audioText: 'لَهُم مَّا يَشَاءُونَ', ruleTag: 'Idgham Mimi' },
          { id: 'iq6_p4_w3', ar: 'أَلَمْ تَرَ كَيْفَ', translit: 'Alam tara kaifa (Izhar Syafawi)', syllables: ['أَ', 'لَمْ', 'تَ', 'رَ'], audioText: 'أَلَمْ تَرَ كَيْفَ', ruleTag: 'Izhar Syafawi' },
          { id: 'iq6_p4_w4', ar: 'عَلَيْهِمْ وَلَا الضَّالِّينَ', translit: '‘Alaihim waladh-dhāllīn', syllables: ['عَ', 'لَيْ', 'هِمْ', 'وَ'], audioText: 'عَلَيْهِمْ وَلَا الضَّالِّينَ', ruleTag: 'Izhar Syafawi' },
          { id: 'iq6_p4_w5', ar: 'هُمْ فِيهَا خَالِدُونَ', translit: 'Hum fīhā khālidūn', syllables: ['هُمْ', 'فِي', 'هَا'], audioText: 'هُمْ فِيهَا خَالِدُونَ', ruleTag: 'Izhar Syafawi' },
          { id: 'iq6_p4_w6', ar: 'إِنَّ رَبَّهُم بِهِمْ', translit: 'Inna rabbahum bihim', syllables: ['رَبَّ', 'هُمْ', 'بِـ'], audioText: 'إِنَّ رَبَّهُم بِهِمْ', ruleTag: 'Ikhfa Syafawi' }
        ]
      },
      {
        pageNumber: 5,
        metadata: {
          pageId: 'iq6_p5',
          globalPageNumber: 35,
          jilidNumber: 6,
          difficultyTier: 'tajwid_mushaf',
          difficultyScore: 100,
          tajweedCategory: 'Tanda Mad Far\'i (Mad Wajib, Jaiz, dan Mad Lazim)',
          competencyFocus: 'Membaca tanda bendera bergelombang (~) sesuai panjang ketukan: 4, 5, hingga 6 harakat penuh',
          targetCharacters: ['جَاءَ', 'السَّمَاءِ', 'يَا أَيُّهَا', 'الضَّالِّينَ'],
          estimatedMinutes: 8,
          xpReward: 80,
          starReward: 3,
          minWordMasteryCount: 6,
          prerequisitePageId: 'iq6_p4'
        },
        title: 'Halaman 5: Tanda Mad Panjang Far\'i (Mad Wajib, Jaiz, dan Mad Lazim)',
        subtitle: 'Membaca tanda bendera bergelombang (~) di atas huruf mad: 4, 5, hingga 6 harakat',
        conceptRule: 'Mad bertemu Hamzah dalam 1 kata = Mad Wajib (4-5 harakat). Bertemu Hamzah beda kata = Mad Jaiz (4-5 harakat). Bertemu sukun/tasydid asli = Mad Lazim (6 harakat penuh).',
        words: [
          { id: 'iq6_p5_w1', ar: 'إِذَا جَاءَ نَصْرُ اللَّهِ', translit: 'Idzā jā-a nashrullāh (Mad Wajib)', syllables: ['جَا', 'ءَ'], audioText: 'إِذَا جَاءَ نَصْرُ اللَّهِ', ruleTag: 'Mad Wajib Muttashil' },
          { id: 'iq6_p5_w2', ar: 'وَالسَّمَاءِ ذَاتِ الْبُرُوجِ', translit: 'Was-samā-i dzātil-burūj', syllables: ['سَ', 'مَا', 'ءِ'], audioText: 'وَالسَّمَاءِ ذَاتِ الْبُرُوجِ', ruleTag: 'Mad Wajib Muttashil' },
          { id: 'iq6_p5_w3', ar: 'يَا أَيُّهَا النَّاسُ', translit: 'Yā ayyuhan-nās (Mad Jaiz)', syllables: ['يَا', 'أَيُّ', 'هَا'], audioText: 'يَا أَيُّهَا النَّاسُ', ruleTag: 'Mad Jaiz Munfashil' },
          { id: 'iq6_p5_w4', ar: 'إِنَّا أَنزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ', translit: 'Innā anzalnāhu (Mad Jaiz)', syllables: ['إِنَّا', 'أَنْ', 'زَلْ'], audioText: 'إِنَّا أَنزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ', ruleTag: 'Mad Jaiz Munfashil' },
          { id: 'iq6_p5_w5', ar: 'وَلَا الضَّالِّينَ', translit: 'Wa ladh-dhāllīn (Mad Lazim 6 Harakat)', syllables: ['ضَالْ', 'لِي', 'نَ'], audioText: 'وَلَا الضَّالِّينَ', ruleTag: 'Mad Lazim Kilmi' },
          { id: 'iq6_p5_w6', ar: 'فَإِذَا جَاءَتِ الصَّاخَّةُ', translit: 'Fa idzā jā-atish-shākh-khah (6 Harakat)', syllables: ['صَاخْ', 'خَةُ'], audioText: 'فَإِذَا جَاءَتِ الصَّاخَّةُ', ruleTag: 'Mad Lazim Kilmi' }
        ]
      },
      {
        pageNumber: 6,
        metadata: {
          pageId: 'iq6_p6',
          globalPageNumber: 36,
          jilidNumber: 6,
          difficultyTier: 'tajwid_mushaf',
          difficultyScore: 100,
          tajweedCategory: 'Khatam Tilawah Mushaf Al-Qur\'an Rasm Utsmani',
          competencyFocus: 'Tilawah tartil khusyuk Surah Al-Fatihah & Al-Ikhlas menerapkan seluruh kaidah tajwid',
          targetCharacters: ['بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', 'الْحَمْدُ لِلَّهِ', 'قُلْ هُوَ اللَّهُ أَحَدٌ'],
          estimatedMinutes: 10,
          xpReward: 100,
          starReward: 5,
          minWordMasteryCount: 6,
          prerequisitePageId: 'iq6_p5'
        },
        title: 'Halaman 6: Tilawah Mushaf Al-Qur\'an Rasm Utsmani (Surah Al-Fatihah & Al-Ikhlas)',
        subtitle: 'Penerapan seluruh kaidah tajweed secara tartil, fasih, dan khusyuk',
        conceptRule: 'Perhatikan makharijul huruf, ketukan mad, qalqalah saat waqaf, dan ghunnah pada seluruh ayat.',
        words: [
          { id: 'iq6_p6_w1', ar: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۝', translit: 'Bismillāhir-Raḥmānir-Raḥīm', meaning: 'Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.', audioText: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ' },
          { id: 'iq6_p6_w2', ar: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۝', translit: 'Al-ḥamdu lillāhi Rabbil-‘ālamīn', meaning: 'Segala puji bagi Allah, Tuhan seluruh alam.', audioText: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ' },
          { id: 'iq6_p6_w3', ar: 'الرَّحْمَٰنِ الرَّحِيمِ ۝ مَالِكِ يَوْمِ الدِّينِ ۝', translit: 'Ar-Raḥmānir-Raḥīm. Māliki yawmid-dīn', meaning: 'Yang Maha Pengasih, Maha Penyayang. Pemilik hari pembalasan.', audioText: 'الرَّحْمَٰنِ الرَّحِيمِ مَالِكِ يَوْمِ الدِّينِ' },
          { id: 'iq6_p6_w4', ar: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ۝', translit: 'Iyyāka na‘budu wa iyyāka nasta‘īn', meaning: 'Hanya kepada Engkaulah kami menyembah dan hanya kepada Engkaulah kami memohon pertolongan.', audioText: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ' },
          { id: 'iq6_p6_w5', ar: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ۝', translit: 'Ihdinaṣ-ṣhirāṭhal-mustaqīm', meaning: 'Tunjukilah kami jalan yang lurus.', audioText: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ' },
          { id: 'iq6_p6_w6', ar: 'قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝', translit: 'Qul huwallāhu aḥad. Allāhuṣ-ṣhamad', meaning: 'Katakanlah: Dialah Allah Yang Maha Esa. Allah tempat meminta.', audioText: 'قُلْ هُوَ اللَّهُ أَحَدٌ اللَّهُ الصَّمَدُ' }
        ]
      }
    ],
    quizQuestions: [
      {
        id: 'q_iq6_1',
        question: 'Pada bacaan "مِن بَعْدِ", apakah hukum tajweed yang terjadi?',
        options: [
          { ar: 'Iqlab (Nun mati bertemu Ba berubah menjadi bunyi Mim)', translit: 'Iqlab', isCorrect: true, feedback: 'Mumtaz! Nun mati bertemu huruf Ba adalah hukum Iqlab.' },
          { ar: 'Izhar Halqi', translit: 'Izhar', isCorrect: false, feedback: 'Izhar hanya untuk huruf tenggorokan (Hamzah, Ha, ‘Ain, Ḥa, Ghain, Kha).' }
        ]
      }
    ]
  }
];

// Helper functions for progress tracking and curriculum queries
export function getAllIqraPages(): IqraPage[] {
  return IQRA_36_PAGES_DATA.flatMap(j => j.pages);
}

export function getIqraPageById(pageId: string): { page: IqraPage; jilid: IqraJilid } | undefined {
  for (const jilid of IQRA_36_PAGES_DATA) {
    const page = jilid.pages.find(p => p.metadata?.pageId === pageId);
    if (page) return { page, jilid };
  }
  return undefined;
}

export function getIqraPageByGlobalNumber(globalNum: number): { page: IqraPage; jilid: IqraJilid } | undefined {
  for (const jilid of IQRA_36_PAGES_DATA) {
    const page = jilid.pages.find(p => p.metadata?.globalPageNumber === globalNum);
    if (page) return { page, jilid };
  }
  return undefined;
}

export function calculateIqraProgressStats(completedPageIds: string[] = []): {
  completedPagesCount: number;
  totalPagesCount: number;
  completionPercentage: number;
  currentJilidNumber: number;
  highestCompletedGlobalPage: number;
  nextRecommendedPageId: string;
} {
  const allPages = getAllIqraPages();
  const total = allPages.length; // 36
  const completedSet = new Set(completedPageIds);
  const completedCount = allPages.filter(p => p.metadata && completedSet.has(p.metadata.pageId)).length;
  const percentage = Math.round((completedCount / total) * 100);

  // Find next uncompleted page
  const nextUncompleted = allPages.find(p => p.metadata && !completedSet.has(p.metadata.pageId));
  const nextRecommendedPageId = nextUncompleted?.metadata?.pageId || 'iq6_p6';
  const currentJilidNumber = nextUncompleted?.metadata?.jilidNumber || 6;
  const highestCompletedGlobalPage = completedCount;

  return {
    completedPagesCount: completedCount,
    totalPagesCount: total,
    completionPercentage: percentage,
    currentJilidNumber,
    highestCompletedGlobalPage,
    nextRecommendedPageId
  };
}
