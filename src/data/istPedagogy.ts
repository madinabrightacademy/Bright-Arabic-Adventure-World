import { SkillExplanation, PracticeQuestion } from '../types/game';

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

export const IST_DEDICATED_PEDAGOGY: Record<string, EnrichedSkillPedagogy> = {
  // =========================================================================
  // LEVEL 0: TAMHIDI (Pra-A1) - Fondasi Persepsi Akustik & Fonem Dasar
  // =========================================================================

  // IST-L0-01: Menyimak Suku Kata & Konsonan Murni
  'IST-L0-01': {
    explanation: {
      conceptTitle: 'Menyimak Suku Kata Dasar: Tiga Vokal Murni (A - I - U)',
      overview: 'Di Lembah Istima\', pendengaranmu dilatih menangkap pantulan gema suku kata Arab. Tiga vokal dasar (Fathah, Kasrah, Dhommah) harus terdengar jernih tanpa tercampur suara sengau atau vokal tengah (E/O).',
      rules: [
        {
          title: 'Ketajaman Tiga Vokal Murni',
          explanation: 'Fathah berbunyi "A" murni (bukan E/O), Kasrah berbunyi "I" jernih (bukan E), dan Dhommah berbunyi "U" bundar (bukan O).',
          exampleAr: 'بَ - بِ - بُ ⟷ تَ - تِ - تُ',
          exampleTranslit: 'Ba - Bi - Bu | Ta - Ti - Tu',
          exampleId: 'Vokal murni vokal tunggal'
        },
        {
          title: 'Menangkap Resonansi Konsonan Bersukun',
          explanation: 'Saat huruf berharakat sukun (mati), tangkap suara hentian murni atau sifat desis/getaran huruf tersebut tanpa memantul berlebihan kecuali pada huruf qalqalah.',
          exampleAr: 'أَبْ (Qalqalah membal) ⟷ أَمْ (Tahan dengung mim)',
          exampleTranslit: 'Ab (memantul) vs Am (tertahan)',
          exampleId: 'Sukun mati vs Qalqalah'
        }
      ],
      hudhudTips: 'Pejamkan mata sejenak saat tombol audio berbunyi. Rasakan apakah mulut penutur membuka lebar (Fathah), tersenyum (Kasrah), atau membulat maju (Dhommah)!'
    },
    highlightVocab: [
      { ar: 'فَتْحَةٌ', translit: 'Fat-hah', id: 'Vokal A terbuka lebar' },
      { ar: 'كَسْرَةٌ', translit: 'Kasrah', id: 'Vokal I tipis tersenyum' },
      { ar: 'ضَمَّةٌ', translit: 'Dhommah', id: 'Vokal U bibir membulat' },
      { ar: 'سُكُونٌ', translit: 'Sukuun', id: 'Tanda diam mati tanpa vokal' }
    ],
    questions: [
      {
        id: 'ist_l0_01_q1',
        question: 'Dengarkan lafal vokal Arab: Manakah harakat yang menghasilkan bunyi "U" bundar ke depan?',
        options: [
          { text: 'Dhommah (ضَمَّة)', isCorrect: true, feedback: 'Mumtaz! Dhommah mewajibkan kedua bibir membulat maju (inshimam).' },
          { text: 'Fathah (فَتْحَة)', isCorrect: false, feedback: 'Fathah menghasilkan bunyi A dengan membuka mulut.' },
          { text: 'Kasrah (كَسْرَة)', isCorrect: false, feedback: 'Kasrah menghasilkan bunyi I dengan menurunkan rahang bawah.' }
        ]
      }
    ]
  },

  // IST-L0-02: Diskriminasi Harakat Pendek vs Panjang (Mad)
  'IST-L0-02': {
    explanation: {
      conceptTitle: 'Diskriminasi Durasi Vokal: Pendek 1 Harakat vs Mad 2 Harakat',
      overview: 'Telinga pembelajar bahasa Arab wajib peka terhadap ketukan waktu. Menambah durasi vokal satu detik saja dapat membalikkan makna kata 180 derajat!',
      rules: [
        {
          title: 'Perbandingan Durasi Suara: 1 vs 2 Ketukan',
          explanation: 'Kata dengan vokal pendek berdurasi 1 ketukan wajar. Jika bertemu huruf mad (Alif, Wawu, Ya), suaranya diayun 2 ketukan stabil.',
          exampleAr: 'جَمَلٌ (Unta) ⟷ جَمَالٌ (Keindahan)',
          exampleTranslit: 'Jamal (1 ketuk) vs Jamaal (2 ketuk)',
          exampleId: 'Pembeda fonemik mad ashli'
        },
        {
          title: 'Kontras Qalam vs Kalaam',
          explanation: 'قَلَمٌ (Qalam = pena) vs كَلَامٌ (Kalaam = ucapan/perkataan). Selain beda makhraj konsonan, ada perbedaan mad pada huruf lam.',
          exampleAr: 'قَلَمٌ ⟷ كَلَامٌ',
          exampleTranslit: 'Qalam vs Kalaam',
          exampleId: 'Kontras panjang pendek vokal'
        }
      ],
      hudhudTips: 'Ketukkan jarimu di meja! Satu ketuk untuk vokal pendek, dua ketukan tenang berirama untuk vokal panjang (Mad).'
    },
    highlightVocab: [
      { ar: 'جَمَلٌ', translit: 'Jamal', id: 'Unta (vokal pendek 1 ketukan)' },
      { ar: 'جَمَالٌ', translit: 'Jamaal', id: 'Keindahan (vokal mad 2 ketukan)' },
      { ar: 'قَلَمٌ', translit: 'Qalam', id: 'Pena (vokal pendek)' },
      { ar: 'كَلَامٌ', translit: 'Kalaam', id: 'Perkataan / ucapan (ber-Mad)' }
    ],
    questions: [
      {
        id: 'ist_l0_02_q1',
        question: 'Ketika kamu mendengar kata "جَمَالٌ" (Jamaal) dengan ayunan 2 ketukan pada huruf mim, apakah artinya?',
        options: [
          { text: 'Keindahan (Jamaal dengan mad Alif)', isCorrect: true, feedback: 'Tepat sekali! Jamaal berarti keindahan, sedangkan Jamal (pendek) berarti seekor unta.' },
          { text: 'Seekor unta di padang pasir', isCorrect: false, feedback: 'Unta dilafalkan pendek tanpa mad: Jamal (جَمَل).' }
        ]
      }
    ]
  },

  // IST-L0-03: Menyimak Bunyi Tanwin & Sukun
  'IST-L0-03': {
    explanation: {
      conceptTitle: 'Resonansi Fonem Akhir: Desis Nun Tanwin (-an, -in, -un) vs Sukun',
      overview: 'Tanwin adalah bunyi "Nun mati" yang menumpang di ekor kata benda pada tuturan lisan. Telinga pendengar harus bisa membedakan apakah kata itu berakhir dengan tanwin atau konsonan sukun murni.',
      rules: [
        {
          title: 'Mendeteksi Denting Tanwin di Ekor Kata',
          explanation: 'Dengarkan bunyi desir /n/ di ujung kata: -an (fathatain), -in (kasratain), -un (dhommatain).',
          exampleAr: 'كِتَابٌ (Kitaabun), كِتَابًا (Kitaaban), كِتَابٍ (Kitaabin)',
          exampleTranslit: 'Kitaabun / Kitaaban / Kitaabin',
          exampleId: 'Tiga variasi vokal tanwin'
        },
        {
          title: 'Membedakan Tanwin vs Kata Asli Berakhiran Nun',
          explanation: 'Kata "مُسْلِمٌ" (Muslimun) berakhiran tanwin (bisa hilang saat waqaf). Kata "مُسْلِمِينَ" (Muslimiin) memiliki huruf nun asli yang tidak hilang saat diwaqafkan.',
          exampleAr: 'مُسْلِمٌ (Muslim) ⟷ مُسْلِمُونَ (Muslimuun)',
          exampleTranslit: 'Tanwin tambahan vs Nun bentuk jamak'
        }
      ],
      hudhudTips: 'Saat penutur Arab berhenti (waqaf), bunyi tanwin -un dan -in akan lenyap menjadi sukun! Dengarkan baik-baik apakah dia sedang menyambung (washal) atau berhenti.'
    },
    highlightVocab: [
      { ar: 'تَنْوِينٌ', translit: 'Tanwiin', id: 'Bunyi desir nun mati di akhir kata' },
      { ar: 'وَقْفٌ', translit: 'Waqaf', id: 'Berhenti sejenak di ujung frasa' },
      { ar: 'وَصْلٌ', translit: 'Washal', id: 'Menyambung bacaan antar-kata' },
      { ar: 'بَيْتٌ', translit: 'Baytun', id: 'Sebuah rumah (bertanwin dhommatain)' }
    ],
    questions: [
      {
        id: 'ist_l0_03_q1',
        question: 'Dengarkan suara: "كِتَابًا مُفِيدًا". Bunyi fonem apakah yang terdengar berulang di akhir kedua kata tersebut?',
        options: [
          { text: 'Tanwin Fathah (-an)', isCorrect: true, feedback: 'Mumtaz! Keduanya berakhiran tanwin fathatain -an (Kitaaban Mufiidan).' },
          { text: 'Tanwin Kasrah (-in)', isCorrect: false, feedback: 'Bunyi -in terdengar lebih rendah dan tipis.' },
          { text: 'Sukun tanpa vokal', isCorrect: false, feedback: 'Ada desisan nun mati yang jelas terdengar.' }
        ]
      }
    ]
  },

  // =========================================================================
  // LEVEL 1: MUBTADI' (A1) - Pasangan Minimal, Angka & Arah Spasial
  // =========================================================================

  // IST-L1-01: Pasangan Minimal Halq (Tenggorokan)
  'IST-L1-01': {
    explanation: {
      conceptTitle: 'Gua Akustik Halq: Kontras Huruf Tenggorokan (ع vs ء, ح vs هـ, خ vs غ)',
      overview: 'Tenggorokan manusia terbagi menjadi tiga lantai artikulasi: Aqshal Halq (pangkal bawah), Wasathul Halq (tengah), dan Adnal Halq (atas dekat anak lidah). Menyimak kontras pasangan minimal di zona ini adalah kunci kefasihan reseptif tingkat pertama.',
      rules: [
        {
          title: 'Kontras \'Ain (ع) vs Hamzah (ء)',
          explanation: '\'Ain keluar dari tengah tenggorokan dengan remasan lembut otot leher. Hamzah keluar dari dasar tenggorokan dengan hentakan tegas.',
          exampleAr: 'عَلِيمٌ (Maha Mengetahui) ⟷ أَلِيمٌ (Pedih / Sakit)',
          exampleTranslit: '\'Aliimun vs Aliimun',
          exampleId: 'Pasangan minimal \'Ain vs Hamzah'
        },
        {
          title: 'Kontras Ha Lembut (ح) vs Ha Dada (هـ)',
          explanation: 'Huruf Ha (ح) berhembus bersih dari tengah leher seperti meniup cermin dingin. Huruf Ha (هـ) berhembus dalam dari rongga dada bawah.',
          exampleAr: 'حَمْدٌ (Pujian) ⟷ هَمٌّ (Kegalauan jiwa)',
          exampleTranslit: 'Hamd vs Hamm',
          exampleId: 'Pasangan minimal Ha bersih vs Ha dada'
        },
        {
          title: 'Kontras Kha Gurih (خ) vs Ghayn Bergumam (غ)',
          explanation: 'Kha (خ) memiliki gesekan parau di langit-langit atas, sedangkan Ghayn (غ) bergetar basah seperti orang berkumur (gargle).',
          exampleAr: 'خَبَرٌ (Berita) ⟷ غَبَرٌ (Debu tebal)',
          exampleTranslit: 'Khabar vs Ghabar',
          exampleId: 'Pasangan minimal Kha vs Ghayn'
        }
      ],
      hudhudTips: 'Letakkan dua jarimu di jakun leher saat menyimak. Huruf \'Ain (ع) akan membuat otot tengah lehermu bergetar kencang!'
    },
    highlightVocab: [
      { ar: 'عَلِيمٌ', translit: '\'Aliim', id: 'Maha Mengetahui (Tengah Tenggorokan)' },
      { ar: 'أَلِيمٌ', translit: 'Aliim', id: 'Pedih / Sakit (Dasar Pangkal Tenggorokan)' },
      { ar: 'حَمْدٌ', translit: 'Hamd', id: 'Pujian syukur (Ha bersih tengah)' },
      { ar: 'هَمٌّ', translit: 'Hamm', id: 'Kegalauan / kesedihan (Ha dada)' }
    ],
    questions: [
      {
        id: 'ist_l1_01_q1',
        question: 'Dua kata audio diperdengarkan: "عَلِيمٌ" (\'Aliim) dan "أَلِيمٌ" (Aliim). Manakah kata yang berarti "Maha Mengetahui"?',
        options: [
          { text: 'عَلِيمٌ (\'Aliim dengan huruf \'Ain tengah tenggorokan)', isCorrect: true, feedback: 'Tepat sekali! \'Aliim dengan \'Ain artinya Maha Mengetahui. Aliim dengan hamzah artinya pedih.' },
          { text: 'أَلِيمٌ (Aliim dengan huruf Hamzah)', isCorrect: false, feedback: 'Aliim dengan hamzah berarti pedih/sakit.' }
        ]
      }
    ]
  },

  // IST-L1-02: Pasangan Minimal Huruf Tebal / Ithbaq
  'IST-L1-02': {
    explanation: {
      conceptTitle: 'Gema Ruang Mulut: Huruf Tebal Ithbaq vs Huruf Tipis Tarqiq',
      overview: 'Huruf tebal (ص، ض، ط، ظ، ق) menyebabkan lidah terangkat ke langit-langit mulut sehingga suara vokal memantul bergema bulat (O/A berat). Sebaliknya, huruf tipis (س، د، ت، ذ، ك) dilafalkan datar dengan bibir tersenyum.',
      rules: [
        {
          title: 'Kontras Qaf (ق) vs Kaf (ك)',
          explanation: 'Qaf keluar dari pangkal lidah terdalam menyentuh langit-langit lunak (berat berbobot). Kaf lebih maju ke depan dengan desah angin (tipis).',
          exampleAr: 'قَلْبٌ (Hati nurani) ⟷ كَلْبٌ (Anjing)',
          exampleTranslit: 'Qalb vs Kalb',
          exampleId: 'Pasangan minimal Qaf vs Kaf'
        },
        {
          title: 'Kontras Shad (ص) vs Sin (س)',
          explanation: 'Keduanya berdesis, namun Shad bergema bulat tebal, sedangkan Sin tipis tersenyum.',
          exampleAr: 'صَيْفٌ (Musim Panas) ⟷ سَيْفٌ (Pedang)',
          exampleTranslit: 'Shaif vs Saif',
          exampleId: 'Pasangan minimal Shad vs Sin'
        },
        {
          title: 'Kontras Tha (ط) vs Ta (ت)',
          explanation: 'Tha (ط) berdentum tebal bulat (cth: طِين = tanah liat), Ta (ت) tipis berhembus ringan (cth: تِين = buah tin).',
          exampleAr: 'طِينٌ (Tanah liat) ⟷ تِينٌ (Buah tin manis)',
          exampleTranslit: 'Thiin vs Tiin',
          exampleId: 'Pasangan minimal Tha vs Ta'
        }
      ],
      hudhudTips: 'Hati-hati jangan tertukar! Qalb (قَلْب) adalah hati beriman, sedangkan Kalb (كَلْب) adalah anjing. Telingamu adalah benteng maknamu!'
    },
    highlightVocab: [
      { ar: 'قَلْبٌ', translit: 'Qalb', id: 'Hati nurani (Qaf tebal pangkal lidah)' },
      { ar: 'كَلْبٌ', translit: 'Kalb', id: 'Anjing (Kaf tipis berhembus)' },
      { ar: 'صَيْفٌ', translit: 'Shaif', id: 'Musim panas (Shad tebal bergema)' },
      { ar: 'سَيْفٌ', translit: 'Saif', id: 'Pedang tajam (Sin tipis tersenyum)' }
    ],
    questions: [
      {
        id: 'ist_l1_02_q1',
        question: 'Dengarkan suara desis tebal bergema: "صَيْفٌ" (Shaif). Apakah arti kata yang kamu dengar?',
        options: [
          { text: 'Musim Panas (huruf Shad tebal bergema)', isCorrect: true, feedback: 'Mumtaz! Shaif (صَيْف) artinya musim panas. Saif (سَيْف) artinya pedang.' },
          { text: 'Pedang perang', isCorrect: false, feedback: 'Pedang dilafalkan tipis tersenyum: Saif (سَيْف).' }
        ]
      }
    ]
  },

  // IST-L1-03: Menyimak Angka 1-10 & Benda Lingkungan
  'IST-L1-03': {
    explanation: {
      conceptTitle: 'Menyimak Angka & Kuantitas dalam Obrolan Sehari-hari',
      overview: 'Dalam transaksi dan interaksi nyata, angka Arab (Wahid s/d Asyarah) sering diucapkan cepat di tengah kalimat. Pendengar harus sigap menyaring kuantitas barang yang disebutkan penutur asli.',
      rules: [
        {
          title: 'Menangkap Angka Satuan dalam Dialog',
          explanation: 'Dengarkan kata adad kunci: وَاحِد (1), اِثْنَان (2), ثَلَاثَة (3), أَرْبَعَة (4), خَمْسَة (5), سِتَّة (6), سَبْعَة (7), ثَمَانِيَة (8), تِسْعَة (9), عَشَرَة (10).',
          exampleAr: 'اشْتَرَيْتُ ثَلَاثَةَ أَقْلَامٍ (Aku membeli TIGA pena)',
          exampleTranslit: 'Isytaraytu tsalaatsata aqlaam',
          exampleId: 'Menangkap angka 3 dalam kalimat'
        },
        {
          title: 'Asosiasi Bunyi Angka dengan Objek Konkrit',
          explanation: 'Hubungkan bunyi angka dengan kata benda yang mengikutinya: Khamsatu kutub (5 buku), Arba\'atu rijal (4 pria).',
          exampleAr: 'عِنْدِي خَمْسَةُ كُتُبٍ جَدِيدَةٍ',
          exampleTranslit: '\'Indii khamsatu kutubin jadiidah',
          exampleId: 'Kuantitas lima buku'
        }
      ],
      hudhudTips: 'Fokuskan telinga pada kata yang berakhiran "-ah" sebelum kata benda; itu seringkali adalah angka 3 sampai 10!'
    },
    highlightVocab: [
      { ar: 'ثَلَاثَةٌ', translit: 'Tsalaatsah', id: 'Angka 3 (tiga)' },
      { ar: 'خَمْسَةٌ', translit: 'Khamsah', id: 'Angka 5 (lima)' },
      { ar: 'سَبْعَةٌ', translit: 'Sab\'ah', id: 'Angka 7 (tujuh)' },
      { ar: 'عَشَرَةٌ', translit: '\'Asyarah', id: 'Angka 10 (sepuluh)' }
    ],
    questions: [
      {
        id: 'ist_l1_03_q1',
        question: 'Dalam kalimat audio: "فِي الحَقِيبَةِ أَرْبَعَةُ دَفَاتِرَ", berapakah jumlah buku tulis yang ada di dalam tas?',
        options: [
          { text: '4 (Empat buku tulis - Arba\'ah)', isCorrect: true, feedback: 'Tepat sekali! Kata "Arba\'atu dafaatir" berarti empat buku tulis.' },
          { text: '3 (Tiga)', isCorrect: false, feedback: 'Tiga adalah Tsalatsah (ثلاثة).' },
          { text: '5 (Lima)', isCorrect: false, feedback: 'Lima adalah Khamsah (خمسة).' }
        ]
      }
    ]
  },

  // IST-L1-04: Menyimak Arah & Orientasi Ruang
  'IST-L1-04': {
    explanation: {
      conceptTitle: 'Kompas Audio: Menyimak Petunjuk Arah & Posisi Spasial',
      overview: 'Saat tersesat di kota Arab atau menerima panduan arah navigasi, telingamu harus mengenali kata kunci arah mata angin dan orientasi ruang secara instan.',
      rules: [
        {
          title: 'Empat Arah Kompas Tubuh',
          explanation: 'يَمِين (Kanan), يَسَار / شِمَال (Kiri), أَمَام (Depan), dan وَرَاء / خَلْف (Belakang).',
          exampleAr: 'اِتَّجِهْ إِلَى اليَمِينِ ثُمَّ إِلَى اليَسَارِ (Beloklah ke KANAN lalu ke KIRI)',
          exampleTranslit: 'Ittajih ila l-yamiin tsumma ila l-yasaar',
          exampleId: 'Instruksi belok arah'
        },
        {
          title: 'Posisi Ketinggian Vertikal: Fawqa vs Tahta',
          explanation: 'فَوْقَ (Di atas melayang), تَحْتَ (Di bawah dasar).',
          exampleAr: 'الكِتَابُ فَوْقَ المَكْتَبِ وَالقَلَمُ تَحْتَهُ',
          exampleTranslit: 'Al-kitaabu fawqa l-maktabi wal-qalamu tahtahu',
          exampleId: 'Posisi atas vs bawah'
        }
      ],
      hudhudTips: 'Yamin = Kanan (ingat tangan kanan makan). Yasar = Kiri (ingat tangan kiri bersuci)!'
    },
    highlightVocab: [
      { ar: 'يَمِينٌ', translit: 'Yamiin', id: 'Kanan (arah sebelah kanan)' },
      { ar: 'يَسَارٌ', translit: 'Yasaar', id: 'Kiri (arah sebelah kiri)' },
      { ar: 'أَمَامَ', translit: 'Amaama', id: 'Di depan' },
      { ar: 'خَلْفَ', translit: 'Khalfa', id: 'Di belakang' }
    ],
    questions: [
      {
        id: 'ist_l1_04_q1',
        question: 'Dengarkan arahan navigasi: "المَسْجِدُ عَلَى يَمِينِكَ". Di manakah posisi masjid dari tubuhmu?',
        options: [
          { text: 'Di sebelah kananmu (Yamiin)', isCorrect: true, feedback: 'Mumtaz! Yamiinika berarti di sebelah kananmu.' },
          { text: 'Di sebelah kirimu', isCorrect: false, feedback: 'Kiri adalah Yasaarika (يسارك).' }
        ]
      }
    ]
  },

  // =========================================================================
  // LEVEL 2: ASASI (A2) - Perintah Kelas, Waktu Jam, Tanya 5W1H & Intonasi
  // =========================================================================

  // IST-L2-01: Menyimak Instruksi Perintah Kelas & Aksi
  'IST-L2-01': {
    explanation: {
      conceptTitle: 'Menyimak Reseptif Instruksi Kelas (Awamirul Fasl)',
      overview: 'Guru di kelas bahasa Arab berkomunikasi dengan kata kerja perintah (Fi\'il Amr). Menangkap instruksi lisan tanpa jeda terjemahan membuat suasana belajar menjadi hidup dan alami.',
      rules: [
        {
          title: 'Perintah Membaca, Menulis, dan Menyimak',
          explanation: 'اِقْرَأْ (Bacalah!), اُكْتُبْ (Tulislah!), اِسْتَمِعْ (Dengarkan baik-baik!), اُنْظُرْ (Lihatlah!).',
          exampleAr: 'اِسْتَمِعْ إِلَى الحِوَارِ ثُمَّ أَجِبْ! (Dengarkan dialog lalu jawablah!)',
          exampleTranslit: 'Istami\' ila l-hiwaar tsumma ajib!',
          exampleId: 'Instruksi ujian menyimak'
        },
        {
          title: 'Perintah Gerakan Fisik',
          explanation: 'قِفْ (Berdirilah!), اِجْلِسْ (Duduklah!), اِفْتَحِ الكِتَابَ (Bukalah buku!).',
          exampleAr: 'يَا طُلَّابُ، قِفُوا وَابْتَسِمُوا! (Wahai para siswa, berdirilah dan tersenyumlah!)',
          exampleTranslit: 'Yaa thullaab, qifuu wabtasimuu!',
          exampleId: 'Instruksi aksi fisik'
        }
      ],
      hudhudTips: 'Perhatikan akhiran sukun pada perintah laki-laki (Iqra\'), akhiran -ii untuk perempuan (Iqra-ii), dan akhiran -uu untuk kelas bersama (Iqra-uu)!'
    },
    highlightVocab: [
      { ar: 'اِسْتَمِعْ', translit: 'Istami\'', id: 'Dengarkanlah! (Perintah menyimak)' },
      { ar: 'اِقْرَأْ', translit: 'Iqra\'', id: 'Bacalah! (Perintah membaca)' },
      { ar: 'اُكْتُبْ', translit: 'Uktub', id: 'Tulislah! (Perintah mencatat)' },
      { ar: 'اِفْتَحْ', translit: 'Iftah', id: 'Bukalah! (Perintah membuka)' }
    ],
    questions: [
      {
        id: 'ist_l2_01_q1',
        question: 'Guru berseru di kelas: "اِفْتَحُوا كُتُبَكُمْ صَفْحَةَ عَشْرَة!". Apakah tindakan yang diminta?',
        options: [
          { text: 'Membuka buku kalian pada halaman 10', isCorrect: true, feedback: 'Tepat sekali! "Iftahuu kutubakum" berarti bukalah buku-buku kalian.' },
          { text: 'Menutup buku dan keluar kelas', isCorrect: false, feedback: 'Menutup buku adalah Aghliquu (أغلقوا).' }
        ]
      }
    ]
  },

  // IST-L2-02: Menyimak Waktu & Jam Arab
  'IST-L2-02': {
    explanation: {
      conceptTitle: 'Menyimak Frasa Jam & Jadwal Kegiatan (As-Sa\'ah)',
      overview: 'Penyebutan waktu jam dalam bahasa Arab menggunakan bilangan bertingkat feminin (As-Sa\'ah al-Wahidah, ats-Tsaniyah, dll.) serta pecahan menit (an-Nishf = 30 menit, ar-Rub\' = 15 menit, dan Illa = kurang).',
      rules: [
        {
          title: 'Format Baku Jam Bulat',
          explanation: 'السَّاعَةُ الوَاحِدَة (Jam 1), السَّاعَةُ الثَّالِثَة (Jam 3), السَّاعَةُ الخَامِسَة (Jam 5).',
          exampleAr: 'السَّاعَةُ الآنَ السَّابِعَةُ صَبَاحًا (Sekarang jam 7 pagi tepat)',
          exampleTranslit: 'As-saa\'atu l-aana as-saabi\'atu shabaahan',
          exampleId: 'Penyebutan jam bulat pagi'
        },
        {
          title: 'Pecahan Menit: Wa (Lebih) vs Illa (Kurang)',
          explanation: 'وَالنِّصْف (Lebih 30 menit), وَالرُّبْع (Lebih 15 menit), إِلَّا رُبْعًا (Kurang 15 menit).',
          exampleAr: 'السَّاعَةُ الرَّابِعَةُ وَالنِّصْفُ (Jam 4 lebih 30 menit / setengah lima)',
          exampleTranslit: 'As-saa\'atu ar-raabi\'atu wan-nishf',
          exampleId: 'Pecahan jam setengah'
        }
      ],
      hudhudTips: 'Dengar kata "Illa"? Itu artinya "Kurang"! Misal: As-Saadisa illa rub\'an = Jam 6 kurang seperempat (5.45).'
    },
    highlightVocab: [
      { ar: 'السَّاعَةُ', translit: 'As-Saa\'ah', id: 'Jam / waktu penunjuk jam' },
      { ar: 'النِّصْفُ', translit: 'An-Nishf', id: 'Setengah (30 menit)' },
      { ar: 'الرُّبْعُ', translit: 'Ar-Rub\'', id: 'Seperempat (15 menit)' },
      { ar: 'إِلَّا', translit: 'Illa', id: 'Kurang (pengecualian menit jam)' }
    ],
    questions: [
      {
        id: 'ist_l2_02_q1',
        question: 'Dengarkan pengumuman jadwal kereta: "يَنْطَلِقُ القِطَارُ فِي السَّاعَةِ الخَامِسَةِ وَالرُّبْعِ". Pukul berapakah kereta berangkat?',
        options: [
          { text: '05.15 (Jam lima lebih seperempat)', isCorrect: true, feedback: 'Mumtaz! "Al-Khaamisah war-rub\'" adalah jam 5 lebih 15 menit.' },
          { text: '05.30 (Jam setengah enam)', isCorrect: false, feedback: 'Setengah adalah Wan-Nishf (والنصف).' },
          { text: '04.45 (Jam lima kurang seperempat)', isCorrect: false, feedback: 'Kurang seperempat memakai kata Illa rub\'an (إلا ربعا).' }
        ]
      }
    ]
  },

  // IST-L2-03: Identifikasi Kata Tanya 5W1H dari Audio
  'IST-L2-03': {
    explanation: {
      conceptTitle: 'Deteksi Kata Tanya Cepat: Mengenali 5W1H dalam Aliran Ucapan',
      overview: 'Dalam percakapan cepat, kata tanya Arab selalu memimpin di awal kalimat (Shadrul Kalam). Menangkap kata pertama ini langsung memberitahu otakmu informasi apa yang sedang dicari mitra tutur.',
      rules: [
        {
          title: 'Katalog Inti Kata Tanya Audio',
          explanation: 'مَا / مَاذَا (Apa - benda), مَنْ (Siapa - orang), أَيْنَ (Di mana - tempat), مَتَى (Kapan - waktu), كَيْفَ (Bagaimana - cara/kondisi), لِمَاذَا (Mengapa - alasan), كَمْ (Berapa - harga/jumlah).',
          exampleAr: 'مَتَى يَصِلُ الضَّيْفُ؟ (Kapan tamu itu tiba?)',
          exampleTranslit: 'Mataa yashilu adh-dhayf?',
          exampleId: 'Menanyakan waktu tiba'
        },
        {
          title: 'Membedakan Ma vs Man',
          explanation: 'Ma (مَا) terdengar bervokal panjang A untuk benda. Man (مَنْ) berakhiran sukun tajam /n/ untuk menanyakan manusia.',
          exampleAr: 'مَنْ زَارَكَ أَمْسِ؟ (Siapa yang mengunjungimu kemarin?)',
          exampleTranslit: 'Man zaaraka ams?',
          exampleId: 'Menanyakan subjek orang'
        }
      ],
      hudhudTips: 'Kunci kecepatan memahami pertanyaan: Pasang telinga ekstra tajam pada 2 kata pertama kalimat!'
    },
    highlightVocab: [
      { ar: 'مَتَى', translit: 'Mataa', id: 'Kapan (menanyakan waktu)' },
      { ar: 'أَيْنَ', translit: 'Ayna', id: 'Di mana (menanyakan tempat)' },
      { ar: 'كَيْفَ', translit: 'Kayfa', id: 'Bagaimana (kondisi/cara)' },
      { ar: 'لِمَاذَا', translit: 'Limaadzaa', id: 'Mengapa / kenapa (alasan)' }
    ],
    questions: [
      {
        id: 'ist_l2_03_q1',
        question: 'Dengarkan pertanyaan audio: "أَيْنَ تَقَعُ مَدِينَةُ مَكَّةَ المُكَرَّمَةِ؟". Informasi apakah yang ditanyakan pembicara?',
        options: [
          { text: 'Lokasi tempat (karena diawali kata tanya Ayna = Di mana)', isCorrect: true, feedback: 'Benar sekali! Ayna (أين) adalah kata tanya lokasi keberadaan.' },
          { text: 'Waktu keberangkatan', isCorrect: false, feedback: 'Waktu ditanyakan dengan Mataa (متى).' },
          { text: 'Alasan peristiwa', isCorrect: false, feedback: 'Alasan ditanyakan dengan Limaadzaa (لماذا).' }
        ]
      }
    ]
  },

  // IST-L2-04: Diskriminasi Intonasi Tanya vs Berita
  'IST-L2-04': {
    explanation: {
      conceptTitle: 'Prosodi & Lengkung Melodi: Membedakan Nada Tanya (Naik) vs Berita (Turun)',
      overview: 'Seringkali dalam dialek atau ujaran cepat bahasa Arab, kata tanya seperti "Hal" tidak diucapkan secara eksplisit, melainkan hanya diisyaratkan lewat lengkung intonasi nada yang melambung naik di akhir frasa.',
      rules: [
        {
          title: 'Intonasi Kalimat Tanya (Istifham): Melambung Naik',
          explanation: 'Nada suara terangkat naik di suku kata terakhir untuk mengundang respon konfirmasi dari pendengar.',
          exampleAr: 'أَنْتَ مُسَافِرٌ غَدًا؟ (Kamu bepergian besok? [nada melambung naik])',
          exampleTranslit: 'Anta musaafirun ghadan? [Rising tone]',
          exampleId: 'Intonasi nada tanya naik'
        },
        {
          title: 'Intonasi Kalimat Berita (Khabar): Menurun Datar',
          explanation: 'Nada suara menurun mantap dan tuntas di akhir kalimat untuk mengunci kepastian fakta.',
          exampleAr: 'أَنَا مُسَافِرٌ غَدًا. (Saya bepergian besok. [nada turun tuntas])',
          exampleTranslit: 'Ana musaafirun ghadan. [Falling tone]',
          exampleId: 'Intonasi berita turun'
        }
      ],
      hudhudTips: 'Dengarkan ujungnya! Jika suaranya melayang naik seperti burung terbang, itu adalah pertanyaan. Jika mendarat tenang di tanah, itu kalimat berita.'
    },
    highlightVocab: [
      { ar: 'نَبْرَةٌ', translit: 'Nabrah', id: 'Tekanan intonasi suara' },
      { ar: 'نَغْمَةٌ صَاعِدَةٌ', translit: 'Naghmah Saa\'idah', id: 'Nada melambung naik (pertanyaan)' },
      { ar: 'نَغْمَةٌ هَابِطَةٌ', translit: 'Naghmah Haabithah', id: 'Nada menurun mantap (kalimat berita)' },
      { ar: 'خَبَرٌ', translit: 'Khabar', id: 'Pemberitahuan fakta pasti' }
    ],
    questions: [
      {
        id: 'ist_l2_04_q1',
        question: 'Ketika seseorang mengucapkan "هَذَا كِتَابُكَ" dengan nada suara terangkat naik di ujung kata, apakah maksudnya?',
        options: [
          { text: 'Dia bertanya: "Apakah ini bukumu?"', isCorrect: true, feedback: 'Shahih! Nada naik (rising pitch) menandakan kalimat tanya istifham.' },
          { text: 'Dia memastikan dengan tegas: "Ini adalah bukumu."', isCorrect: false, feedback: 'Jika memastikan fakta, intonasinya akan turun datar.' }
        ]
      }
    ]
  },

  // =========================================================================
  // LEVEL 3: MUTAWASSITH 1 (B1) - Dialog Pasar, Dongeng Api Unggun & Peta Ruang
  // =========================================================================

  // IST-L3-01: Menyimak Dialog Transaksional Pasar & Toko
  'IST-L3-01': {
    explanation: {
      conceptTitle: 'Menyimak Transaksional di Pasar Apung: Tawar-Menawar, Jumlah & Total',
      overview: 'Di pasar tradisional Arab, percakapan berlangsung dinamis dengan suara hiruk-pikuk latar belakang. Pendengar harus mampu menyaring: Apa barang yang dibeli? Berapa berat/jumlahnya? Dan berapa harga akhir yang disepakati?',
      rules: [
        {
          title: 'Menangkap Frasa Pertanyaan Harga',
          explanation: 'بِكَمْ هَذَا؟ (Berapa harga ini?), كَمِ الحِسَابُ؟ (Berapa total tagihannya?).',
          exampleAr: 'بِكَمْ كِيلُو التَّمْرِ؟ بِعَشَرَةِ رِيَالَاتٍ',
          exampleTranslit: 'Bikam kiilu t-tamr? Bi-\'asyarati riyaalaat',
          exampleId: 'Tanya harga kiloan kurma'
        },
        {
          title: 'Menangkap Ungkapan Penawaran & Diskon Santun',
          explanation: 'هَلْ هُنَاكَ تَخْفِيضٌ؟ (Apakah ada diskon?), هَذَا غَالٍ قَلِيلًا (Ini agak mahal).',
          exampleAr: 'خَفِّضْ لِي قَلِيلًا مِنْ فَضْلِكَ! حَسَنًا، بِثَمَانِيَةِ رِيَالَاتٍ',
          exampleTranslit: 'Khaffidh lii qaliilan min fadhlik! Hasanan, bi-tsamaaniyati riyaalaat',
          exampleId: 'Negosiasi harga kurma turun'
        }
      ],
      hudhudTips: 'Fokuskan pendengaran pada kata "Bikam" (harga) dan angka mata uang (Riyal/Dirham/Dinar) yang disebutkan setelah kata "Hasanan"!'
    },
    highlightVocab: [
      { ar: 'بِكَمْ', translit: 'Bikam', id: 'Berapa harga (tanya biaya)' },
      { ar: 'تَخْفِيضٌ', translit: 'Takhfiidh', id: 'Diskon / potongan harga' },
      { ar: 'كِيلُو', translit: 'Kiilu', id: 'Kilogram timbangan' },
      { ar: 'الحِسَابُ', translit: 'Al-Hisaab', id: 'Total tagihan pembayaran' }
    ],
    questions: [
      {
        id: 'ist_l3_01_q1',
        question: 'Dengarkan dialog penjual kurma: "الكِيلُو بِعَشَرَةِ رِيَالَاتٍ، وَلَكِنْ لَكَ بِثَمَانِيَةِ رِيَالَاتٍ". Berapakah harga akhir yang harus dibayar pembeli?',
        options: [
          { text: '8 Riyal (setelah diberi potongan)', isCorrect: true, feedback: 'Mumtaz! Penjual menurunkan harga dari 10 menjadi 8 Riyal ("bi-tsamaniyah riyalaat").' },
          { text: '10 Riyal tanpa potongan', isCorrect: false, feedback: '10 Riyal adalah harga awal sebelum diskon.' },
          { text: '18 Riyal', isCorrect: false, feedback: 'Itu adalah penjumlahan keliru.' }
        ]
      }
    ]
  },

  // IST-L3-02: Menyimak Kisah Singkat & Cerita Fabel
  'IST-L3-02': {
    explanation: {
      conceptTitle: 'Api Unggun Cerita: Menyimak Alur Narasi Fabel & Hikmah Moral',
      overview: 'Mendengarkan kisah fabel (seperti Kalilah wa Dimnah atau dongeng Hudhud) melatih daya ingat urutan peristiwa kronologis: Pengenalan tokoh, konflik masalah, klimaks, dan resolusi hikmah moral.',
      rules: [
        {
          title: 'Menangkap Penanda Kronologis Cerita',
          explanation: 'فِي يَوْمٍ مِنَ الأَيَّامِ (Pada suatu hari), فَجْأَةً (Tiba-tiba), بَعْدَ ذَلِكَ (Setelah itu), وَفِي النِّهَايَةِ (Dan pada akhirnya).',
          exampleAr: 'فِي يَوْمٍ مِنَ الأَيَّامِ، كَانَ هُنَاكَ أَسَدٌ نَائِمٌ فِي الغَابَةِ...',
          exampleTranslit: 'Fii yawmin minal ayyaam, kaana hunaaka asadun naa-imun fil ghaabah...',
          exampleId: 'Pembuka kisah fabel klasik'
        },
        {
          title: 'Memahami Hubungan Sebab-Akibat Perilaku Tokoh',
          explanation: 'Lacak mengapa tokoh mengambil tindakan tertentu dan apa dampak bagi sahabat-sahabatnya.',
          exampleAr: 'أَنْقَذَ الفَأْرُ الأَسَدَ مِنَ الشَّبَكَةِ لِأَنَّ الأَسَدَ عَفَا عَنْهُ سَابِقًا',
          exampleTranslit: 'Anqadza al-fa\'ru al-asada minasy syabakah li-annal asada \'afaa \'anhu saabiqan',
          exampleId: 'Sebab akibat balas budi tikus kepada singa'
        }
      ],
      hudhudTips: 'Bayangkan adegan cerita di dalam kepalamu seperti menonton film animasi. Gambaran visual di otak membuat ingatan cerita menempel erat!'
    },
    highlightVocab: [
      { ar: 'فِي يَوْمٍ مِنَ الأَيَّامِ', translit: 'Fii yawmin minal ayyaam', id: 'Pada suatu hari (pembuka kisah)' },
      { ar: 'فَجْأَةً', translit: 'Faj-atan', id: 'Tiba-tiba (perubahan mendadak)' },
      { ar: 'أَنْقَذَ', translit: 'Anqadza', id: 'Menyelamatkan dari bahaya' },
      { ar: 'حِكْمَةٌ', translit: 'Hikmah', id: 'Pelajaran moral / kebijaksanaan' }
    ],
    questions: [
      {
        id: 'ist_l3_02_q1',
        question: 'Dengarkan penggalan cerita api unggun: "كَانَ الأَسَدُ نَائِمًا فَجَاءَ فَأْرٌ صَغِيرٌ". Siapakah yang datang mengganggu saat singa tertidur?',
        options: [
          { text: 'Seekor tikus kecil (Fa\'run Shaghiir)', isCorrect: true, feedback: 'Tepat sekali! Tokoh yang datang adalah tikus kecil.' },
          { text: 'Seekor rubah licik', isCorrect: false, feedback: 'Rubah adalah Tsa\'lab (ثعلب).' },
          { text: 'Pemburu hutan', isCorrect: false, feedback: 'Pemburu belum muncul di bagian awal cerita.' }
        ]
      }
    ]
  },

  // IST-L3-03: Menyimak Deskripsi Tempat & Tata Letak
  'IST-L3-03': {
    explanation: {
      conceptTitle: 'Pemetaan Spasial Audio: Menyusun Peta Mental dari Deskripsi Suara',
      overview: 'Mampu merekonstruksi denah ruangan atau tata kota hanya dengan mendengarkan deskripsi preposisi ruang yang dituturkan pemandu.',
      rules: [
        {
          title: 'Menangkap Preposisi Posisi Relatif',
          explanation: 'بِجَانِبِ / بِجِوَارِ (Di samping), أَمَامَ (Di hadapan), خَلْفَ (Di belakang), بَيْنَ (Di antara dua objek), مُقَابِلَ (Di seberang berhadapan).',
          exampleAr: 'المَسْجِدُ يَقَعُ بَيْنَ المَدْرَسَةِ وَالمَكْتَبَةِ (Masjid terletak di antara sekolah dan perpustakaan)',
          exampleTranslit: 'Al-masjidu yaqa\'u bayna l-madrasati wal-maktabah',
          exampleId: 'Deskripsi posisi di antara dua tempat'
        },
        {
          title: 'Orientasi Kompas Geografis',
          explanation: 'شَمَال (Utara), جَنُوب (Selatan), شَرْق (Timur), غَرْب (Barat).',
          exampleAr: 'البَحْرُ فِي جَنُوبِ القَرْيَةِ (Laut berada di sebelah selatan desa)',
          exampleTranslit: 'Al-bahru fii januubi l-qaryah',
          exampleId: 'Arah mata angin geografis'
        }
      ],
      hudhudTips: 'Gambarkan segitiga imajiner di benakmu saat mendengar kata "Bayna" (di antara)! Letakkan objek utama di tengah-tengah.'
    },
    highlightVocab: [
      { ar: 'بِجَانِبِ', translit: 'Bi-jaanibi', id: 'Di samping / bersebelahan' },
      { ar: 'بَيْنَ', translit: 'Bayna', id: 'Di antara dua tempat' },
      { ar: 'مُقَابِلَ', translit: 'Muqaabila', id: 'Di seberang / berhadapan muka' },
      { ar: 'يَقَعُ', translit: 'Yaqa\'u', id: 'Terletak / berposisi' }
    ],
    questions: [
      {
        id: 'ist_l3_03_q1',
        question: 'Dengarkan panduan audio: "المَسْتَشْفَى مُقَابِلَ المَحَطَّةِ". Di manakah posisi rumah sakit terhadap stasiun?',
        options: [
          { text: 'Tepat di seberang stasiun berhadapan muka (Muqaabila)', isCorrect: true, feedback: 'Mumtaz! Muqaabila berarti di seberang / berhadapan langsung.' },
          { text: 'Di dalam gedung stasiun', isCorrect: false, feedback: 'Di dalam adalah Fii (في).' },
          { text: 'Di belakang stasiun', isCorrect: false, feedback: 'Di belakang adalah Khalfa (خلف).' }
        ]
      }
    ]
  },

  // =========================================================================
  // LEVEL 4: MUTAWASSITH 2 (B2) - Tuturan Alami Penutur Asli & Pengumuman Publik
  // =========================================================================

  // IST-L4-01: Menyimak Percakapan Natural Penutur Asli
  'IST-L4-01': {
    explanation: {
      conceptTitle: 'Menembus Batas Washal: Menyimak Tuturan Cepat Berkelanjutan',
      overview: 'Penutur Arab asli tidak berbicara kata-per-kata seperti kamus; kata-kata disambung menjadi satu aliran nafas (*flow*) melalui hukum washal (penyambungan) dan pembuangan vokal lemah. Kemahiran Level 4 melatih telingamu mengurai kalimat utuh dari arus bunyi yang mengalir cepat.',
      rules: [
        {
          title: 'Hukum Alif Lam Qamariyyah vs Syamsiyyah pada Pendengaran',
          explanation: 'Pada huruf Syamsiyyah (t, th, d, dh, r, z, s, sy, sh, dll.), huruf Lam sama sekali TIDAK terdengar, melainkan melebur tasydid ke huruf berikutnya: "Wash-Syamsi" bukan "Wal-Syamsi".',
          exampleAr: 'وَالشَّمْسِ (Terdengar: Wasy-syams) ⟷ وَالقَمَرِ (Terdengar: Wal-qamar)',
          exampleTranslit: 'Wasy-syams vs Wal-qamar',
          exampleId: 'Asimilasi fonem syamsiyyah'
        },
        {
          title: 'Menangkap Hamzah Washal yang Lenyap',
          explanation: 'Huruf Alif washal (seperti pada Ism atau Ibnu) hilang saat didahului kata lain: "Bismillaahi" bukan "Bi-Ismi-Allaahi".',
          exampleAr: 'بِسْمِ اللَّهِ (Bismillaah) | مَا اسْمُكَ؟ (Mas-muka?)',
          exampleTranslit: 'Bismillaah & Masmuka',
          exampleId: 'Kaidah leburnya hamzah washal'
        }
      ],
      hudhudTips: 'Jangan panik jika terdengar cepat! Fokuslah menangkap akar kata kuncinya (biasanya 3 huruf konsonan konsisten).'
    },
    highlightVocab: [
      { ar: 'وَصْلٌ', translit: 'Washl', id: 'Penyambungan kata secara mengalir' },
      { ar: 'إِدْغَامٌ', translit: 'Idghaam', id: 'Peleburan huruf ke huruf berikutnya' },
      { ar: 'طَلَاقَةٌ', translit: 'Thalaaqah', id: 'Kelancaran tuturan alami penutur asli' },
      { ar: 'فَصِيحٌ', translit: 'Fashiih', id: 'Bahasa Arab baku yang jernih' }
    ],
    questions: [
      {
        id: 'ist_l4_01_q1',
        question: 'Dengarkan kalimat mengalir: "مَا اسْمُكَ يَا أَخِي؟". Mengapa huruf alif pada kata "ismuka" tidak dibaca terpisah?',
        options: [
          { text: 'Karena merupakan Hamzah Washal yang melebur saat didahului kata lain (terdengar "Masmuka")', isCorrect: true, feedback: 'Mumtaz! Hamzah washal melebur dalam tuturan lisan menyambung.' },
          { text: 'Karena penutur salah melafalkan kata', isCorrect: false, feedback: 'Bukan salah, itulah kaidah tuturan fusha yang benar.' }
        ]
      }
    ]
  },

  // IST-L4-02: Menyimak Pengumuman Publik & Panduan Fasilitas
  'IST-L4-02': {
    explanation: {
      conceptTitle: 'Menyimak Pengumuman Publik: Panggilan Bandara, Stasiun & Masjid',
      overview: 'Pengumuman publik Arab disampaikan dengan nada formal berwibawa, seringkali disertai desingan gema speaker bandara atau stasiun kereta. Pendengar harus sigap menyaring nomor penerbangan, gerbang keberangkatan (*portal/gate*), dan himbauan keselamatan.',
      rules: [
        {
          title: 'Frasa Panggilan Penumpang Bandara',
          explanation: 'نُعْلِنُ عَنِ انْطِلَاقِ الرِّحْلَةِ (Kami umumkan keberangkatan penerbangan), البَوَّابَةُ رَقْم (Gerbang nomor), يُرْجَى التَّوَجُّهُ فَوْرًا (Harap segera menuju).',
          exampleAr: 'نُعْلِنُ عَنْ إِقْلَاعِ الرِّحْلَةِ رَقْم ٧١٤ إِلَى الرِّيَاضِ عَبْرَ البَوَّابَةِ رَقْم ٥',
          exampleTranslit: 'Nu\'linu \'an iqlaa\'ir rihlah raqm 714 ilar Riyaadh \'abral bawwaabah raqm 5',
          exampleId: 'Pengumuman boarding bandara'
        },
        {
          title: 'Himbauan Keselamatan & Kenyamanan Publik',
          explanation: 'يُرْجَى رَبْطُ حِزَامِ الأَمَانِ (Harap pasang sabuk pengaman), مَمْنُوعُ التَّدْخِينِ (Dilarang merokok).',
          exampleAr: 'يُرْجَى مِنْ جَمِيعِ الرُّكَّابِ رَبْطُ أَحْزِمَةِ الأَمَانِ اسْتِعْدَادًا لِلْهُبُوطِ',
          exampleTranslit: 'Yurjaa min jamii\'ir rukkaab rabthu ahzimatal amaan isti\'daadan lil hubuuth',
          exampleId: 'Instruksi keselamatan pesawat mendarat'
        }
      ],
      hudhudTips: 'Fokuskan telingamu saat mendengar kata "Ar-Rihlah" (nomor penerbangan) dan "Al-Bawwaabah" (nomor pintu gerbang)!'
    },
    highlightVocab: [
      { ar: 'رِحْلَةٌ', translit: 'Rihlah', id: 'Penerbangan / perjalanan safar' },
      { ar: 'بَوَّابَةٌ', translit: 'Bawwaabah', id: 'Pintu gerbang keberangkatan (Gate)' },
      { ar: 'إِقْلَاعٌ', translit: 'Iqlaa\'', id: 'Lepas landas (Take off pesawat)' },
      { ar: 'هُبُوطٌ', translit: 'Hubuuth', id: 'Pendaratan pesawat (Landing)' }
    ],
    questions: [
      {
        id: 'ist_l4_02_q1',
        question: 'Dengarkan siaran bandara: "عَلَى رُكَّابِ الرِّحْلَةِ رَقْم 205 التَّوَجُّهُ إِلَى البَوَّابَةِ رَقْم 3". Ke manakah penumpang penerbangan 205 harus melangkah?',
        options: [
          { text: 'Menuju Gerbang (Gate) Nomor 3', isCorrect: true, feedback: 'Tepat sekali! "Al-Bawwaabah raqm 3" berarti pintu gerbang nomor 3.' },
          { text: 'Menuju tempat pengambilan bagasi', isCorrect: false, feedback: 'Bagasi adalah Mantiqatu istilaamil haqaa-ib.' },
          { text: 'Menuju loket tiket', isCorrect: false, feedback: 'Bukan, penerbangan sudah memanggil boarding gate.' }
        ]
      }
    ]
  },

  // =========================================================================
  // LEVEL 5: MUTAQADDIM (C1-C2) - Wacana Intelektual, Berita & Khutbah Fusha
  // =========================================================================

  // IST-L5-01: Menyimak Wacana Autentik, Berita & Khutbah Fusha
  'IST-L5-01': {
    explanation: {
      conceptTitle: 'Klimaks Lembah Menyimak: Analisis Kritis Wacana Fusha & Orasi Publik',
      overview: 'Puncak kemahiran menyimak adalah memahami pidato formal berbobot tinggi, warta berita diplomasi internasional, dan khutbah Jumat sastrawi bertaraf Fusha tinggi tanpa membutuhkan teks tertulis di hadapanmu.',
      rules: [
        {
          title: 'Menyaring Gagasan Pokok dari Retorika Panjang',
          explanation: 'Orator Arab kerap menggunakan sinonim berpasangan (taraduf) dan rima saja\'. Pisahkan mana hiasan estetika dan mana argumen substansial yang disampaikan.',
          exampleAr: 'أَيُّهَا الحُضُورُ الكِرَام، إِنَّ العِلْمَ هُوَ السِّلَاحُ الأَقْوَى فِي بِنَاءِ الأُمَمِ وَنَهْضَةِ الشُّعُوب...',
          exampleTranslit: 'Ayyuhal hudhuurul kiraam, innal \'ilma huwas silaahul aqwaa fii binaa-il umami wa nahdhatisy syu\'uub...',
          exampleId: 'Penggalan orasi pidato kebudayaan'
        },
        {
          title: 'Memahami Analisis Berita Diplomasi & Ekonomi',
          explanation: 'Mampu menangkap istilah makro: kesepakatan damai (Ittifaqiyah salam), devaluasi mata uang (Inkhifadh qiimah an-naqd), dan hubungan bilateral (Al-\'Alaqat ats-tsuna-iyyah).',
          exampleAr: 'أَكَّدَ البَيَانُ الخِتَامِيُّ عَلَى تَعْزِيزِ التَّعَاوُنِ الِاقْتِصَادِيِّ بَيْنَ البَلَدَيْن',
          exampleTranslit: 'Akkada al-bayaanul khitaamiyyu \'ala ta\'ziizit ta\'aawunil iqtishaadiyyi baynal baladayn',
          exampleId: 'Berita konferensi tingkat tinggi'
        }
      ],
      hudhudTips: 'Fokuskan pada kata kunci "Akkada" (menegaskan), "A\'lana" (mengumumkan), dan "Sharraha" (menyatakan secara resmi); itu adalah inti sari berita!'
    },
    highlightVocab: [
      { ar: 'بَيَانٌ خِتَامِيٌّ', translit: 'Bayaan Khitaamiy', id: 'Komunike / pernyataan akhir resmi' },
      { ar: 'تَعْزِيزُ التَّعَاوُنِ', translit: 'Ta\'ziizut Ta\'aawun', id: 'Peningkatan jalinan kerja sama' },
      { ar: 'نَهْضَةُ الأُمَمِ', translit: 'Nahdhatul Umam', id: 'Kebangkitan peradaban bangsa-bangsa' },
      { ar: 'خُطْبَةٌ بَلِيغَةٌ', translit: 'Khuthbah Baliighah', id: 'Orasi khutbah sastrawi tingkat tinggi' }
    ],
    questions: [
      {
        id: 'ist_l5_01_q1',
        question: 'Dalam laporan berita resmi: "أَكَّدَ الوَزِيرُ عَلَى تَعْزِيزِ التَّعَاوُنِ الثُّنَائِيِّ فِي مَجَالِ الطَّاقَةِ". Apa pokok penegasan yang disampaikan oleh menteri?',
        options: [
          { text: 'Meningkatkan kerja sama bilateral di bidang energi', isCorrect: true, feedback: 'Mumtaz! "Ta\'ziizut ta\'aawun ats-tsuna-iy fii majaalit thaaqah" berarti memperkuat kerja sama bilateral bidang energi.' },
          { text: 'Memutus hubungan diplomatik perdagangan', isCorrect: false, feedback: 'Sebaliknya, berita menegaskan peningkatan (ta\'ziiz) kerja sama.' },
          { text: 'Menutup seluruh pembangkit listrik', isCorrect: false, feedback: 'Itu interpretasi yang sama sekali tidak ada dalam teks wacana.' }
        ]
      }
    ]
  }
};
