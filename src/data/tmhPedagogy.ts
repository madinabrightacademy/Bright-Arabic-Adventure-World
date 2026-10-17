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

export const TMH_DEDICATED_PEDAGOGY: Record<string, EnrichedSkillPedagogy> = {
  // =========================================================================
  // LEVEL 0: TAMHIDI (Pra-A1) - Musafir Menuju Thalib
  // =========================================================================

  // TMH-L0-01: Ujian Saringan Awal: Diskriminasi Fonem, Makhraj & Artikulasi Huruf
  'TMH-L0-01': {
    explanation: {
      conceptTitle: 'Gerbang Saringan Musafir: Ujian Fonetik & Makhraj Murni',
      overview: 'Sebelum melangkah memasuki gerbang mihrab emas Kuil Langit, setiap Musafir diuji ketajaman pendengaran dan artikulasi fonem hijaiyah. Ujian ini memastikan kamu mampu membedakan huruf tipis vs tebal serta panjang harakat pendek vs mad 2 ketukan.',
      rules: [
        {
          title: 'Presisi Makhraj Tenggorokan & Lidah',
          explanation: 'Bedakan secara tegas antara Ha bersih (ح) dari tengah tenggorokan vs Ha dada (هـ), dan Qaf pangkal lidah (ق) vs Kaf (ك).',
          exampleAr: 'حَبَّ (cinta) ⟷ هَبَّ (berhembus) | قَلْبٌ (hati) ⟷ كَلْبٌ (anjing)',
          exampleTranslit: 'Ḥabba vs Habba | Qalbun vs Kalbun',
          exampleId: 'Presisi fonemik mencegah kekeliruan fatal makna'
        },
        {
          title: 'Keseimbangan Durasi Harakat',
          explanation: 'Pastikan harakat pendek selesai dalam satu ketukan tanpa memanjang, dan huruf mad bervokal tepat dua harakat.',
          exampleAr: 'جَمَلٌ (unta) ⟷ جَمَالٌ (keindahan)',
          exampleTranslit: 'Jamal (1 ketuk) vs Jamāl (2 ketuk)',
          exampleId: 'Durasi vokal adalah pembeda arti'
        }
      ],
      hudhudTips: 'Ucapkan setiap huruf dengan tenang sambil meletakkan telapak tangan di depan mulut untuk merasakan hembusan nafas hams atau ketiadaannya (jahr)!'
    },
    highlightVocab: [
      { ar: 'مَخْرَجٌ', translit: 'Makhraj', id: 'Titik artikulasi keluarnya bunyi huruf' },
      { ar: 'حَرَكَةٌ', translit: 'Ḥarakah', id: 'Tanda vokal hidup (fathah, kasrah, dhammah)' },
      { ar: 'مُسَافِرٌ', translit: 'Musāfir', id: 'Pengelana pemula penjelajah kepulauan' },
      { ar: 'تَمْهِيدِيٌّ', translit: 'Tamhīdiyy', id: 'Tahap persiapan awal pra-A1' }
    ],
    questions: [
      {
        id: 'tmh_l0_01_q1',
        question: 'Dalam ujian saringan awal makhraj, dari manakah huruf Ha bersih (ح) dikeluarkan?',
        options: [
          { text: 'Wasathul Halq (Tengah tenggorokan tanpa gesekan mendengkur)', isCorrect: true, feedback: 'Mumtaz! Huruf Ha (ح) murni keluar dari tengah tenggorokan dengan hembusan nafas bersih.' },
          { text: 'Aqshal Halq (Pangkal tenggorokan dekat dada)', isCorrect: false, feedback: 'Pangkal tenggorokan dekat dada adalah tempat keluarnya huruf Ha (هـ) dan Hamzah (ء).' },
          { text: 'Adnal Halq (Ujung tenggorokan dekat anak lidah)', isCorrect: false, feedback: 'Ujung tenggorokan adalah makhraj huruf Kha (خ) dan Ghain (غ).' }
        ]
      },
      {
        id: 'tmh_l0_01_q2',
        question: 'Manakah pasangan kata yang membedakan vokal pendek 1 ketukan dengan vokal panjang mad 2 ketukan?',
        options: [
          { text: 'جَمَلٌ (unta) vs جَمَالٌ (keindahan)', isCorrect: true, feedback: 'Tepat sekali! Jamal bermakna unta, sedangkan vokal panjang mim (Jamāl) bermakna keindahan.' },
          { text: 'كَلْبٌ vs قَلْبٌ', isCorrect: false, feedback: 'Ini adalah perbedaan konsonan Kaf dan Qaf, bukan durasi vokal.' }
        ]
      }
    ]
  },

  // TMH-L0-02: Gerbang Ujian Mihrab Tamhidi: Integrasi 4 Kemahiran Pra-A1 (Penobatan Thalib)
  'TMH-L0-02': {
    explanation: {
      conceptTitle: 'Mihrab Tamhidi: Integrasi 4 Kemahiran & Penobatan Thalib',
      overview: 'Gerbang kelulusan resmi Jenjang 0. Kamu diuji dalam 4 pilar terpadu: menyimak bunyi kata dasar, melafalkan salam dengan artikulasi fasih, membaca kata berharakat tunggal, dan memilih bentuk sambung huruf yang benar. Lulus dari mihrab ini menganugerahkan gelar Thalib dan menetaskan telur Hudhud.',
      rules: [
        {
          title: 'Integrasi Empat Pilar Kemahiran',
          explanation: 'Seorang penuntut ilmu sejati (Thalib) harus mampu mendengar (Istima), berbicara (Kalam), membaca (Qiraah), dan menuliskan (Kitabah) bentuk kata Arab secara berkesinambungan.',
          exampleAr: 'سَمِعَ ⟶ نَطَقَ ⟶ قَرَأَ ⟶ كَتَبَ',
          exampleTranslit: 'Samiʿa -> Naṭaqa -> Qaraʾa -> Kataba',
          exampleId: 'Siklus emas pembelajaran bahasa Arab'
        },
        {
          title: 'Batas Kelulusan Mihrab (Mumtaz & Jayyid Jiddan)',
          explanation: 'Skor minimal untuk membuka segel mihrab adalah 80% dengan ketepatan di setiap pilar keterampilan.',
          exampleAr: 'نَجَاحٌ بَاهِرٌ',
          exampleTranslit: 'Najāḥun bāhir',
          exampleId: 'Kelulusan gemilang peraih bintang'
        }
      ],
      hudhudTips: 'Telur pendampingmu di Kuil Langit bergetar saat kamu menyelesaikan setiap pilar soal! Selesaikan dengan fokus untuk menyaksikan kelahirannya!'
    },
    highlightVocab: [
      { ar: 'مِحْرَابٌ', translit: 'Miḥrāb', id: 'Gerbang mihrab kelulusan suci' },
      { ar: 'طَالِبٌ', translit: 'Ṭālib', id: 'Rutbah gelar: Penuntut Ilmu Resmi' },
      { ar: 'اِمْتِحَانٌ', translit: 'Imtiḥān', id: 'Ujian komprehensif 4 pilar' },
      { ar: 'بَيْضَةٌ', translit: 'Bayḍah', id: 'Telur pendamping Hudhud pertama' }
    ],
    questions: [
      {
        id: 'tmh_l0_02_q1',
        question: 'Gelar kehormatan apa yang dianugerahkan Kuil Langit saat Musafir berhasil menuntaskan ujian integrasi 4 pilar Jenjang 0?',
        options: [
          { text: 'Thalib (طَالِب) — Penuntut ilmu pembelajar resmi kepulauan', isCorrect: true, feedback: 'Shahih! Gelar Thalib menandai langkah formal pertama sebagai murid bahasa Arab sejati.' },
          { text: 'Katib (كَاتِب)', isCorrect: false, feedback: 'Gelar Katib diperuntukkan bagi lulusan Jenjang 3 (Mutawassith).' },
          { text: 'Adib (أَدِيب)', isCorrect: false, feedback: 'Gelar Adib adalah gelar puncak tingkat mahir sastrawan Arab.' }
        ]
      }
    ]
  },

  // =========================================================================
  // LEVEL 1: MUBTADI' (A1) - Thalib Menuju Rahhal
  // =========================================================================

  // TMH-L1-01: Ujian Evaluasi Leksikal & Frasa
  'TMH-L1-01': {
    explanation: {
      conceptTitle: 'Evaluasi Leksikal & Frasa Keseharian A1',
      overview: 'Ujian komprehensif penguasaan 100 kosakata inti A1: benda rumah dan kelas, kata ganti orang (Dhamir Munfashil: Huwa, Hiya, Anta, Anti, Ana), kata tunjuk Isim Isyarah (Hadha/Hadhihi), serta frasa salam dan taaruf santun.',
      rules: [
        {
          title: 'Kesesuaian Gender Kata Tunjuk',
          explanation: 'Gunakan Hadha (هٰذَا) untuk isim mudzakkar tanpa ta marbuthah, dan Hadhihi (هٰذِهِ) untuk isim muannats bertanda ta marbuthah (ـة).',
          exampleAr: 'هٰذَا كِتَابٌ (Buku) ⟷ هٰذِهِ مَدْرَسَةٌ (Sekolah)',
          exampleTranslit: 'Hādhā kitābun vs Hādhihi madrasatun',
          exampleId: 'Kesesuaian isim isyarah dan gender nomina'
        },
        {
          title: 'Dhamir Munfashil (Subjek)',
          explanation: 'Kenali subjek penutur tunggal (Ana), lawan bicara pria (Anta) dan wanita (Anti), serta orang ketiga (Huwa/Hiya).',
          exampleAr: 'أَنَا طَالِبٌ | أَنْتَ مُعَلِّمٌ | هِيَ طَبِيبَةٌ',
          exampleTranslit: 'Anā ṭālib | Anta muʿallim | Hiya ṭabībah',
          exampleId: 'Dhamir orang pertama, kedua, dan ketiga'
        }
      ],
      hudhudTips: 'Selalu perhatikan akhir kata! Adanya ta marbuthah (ة) adalah kompas penunjuk bahwa kata tersebut muannats!'
    },
    highlightVocab: [
      { ar: 'مُفْرَدَاتٌ', translit: 'Mufradāt', id: 'Koleksi perbendaharaan kosakata' },
      { ar: 'ضَمِيرٌ', translit: 'Ḍamīr', id: 'Kata ganti orang (pronomina)' },
      { ar: 'تَعَارُفٌ', translit: 'Taʿāruf', id: 'Perkenalan diri ramah beradab' },
      { ar: 'إِشَارَةٌ', translit: 'Isyārah', id: 'Penunjukan dekat dan jauh' }
    ],
    questions: [
      {
        id: 'tmh_l1_01_q1',
        question: 'Manakah kalimat penunjukan isim isyarah yang paling tepat sesuai kaidah gender?',
        options: [
          { text: 'هٰذِهِ سَيَّارَةٌ جَمِيلَةٌ (Hādhihi sayyārah jamīlah)', isCorrect: true, feedback: 'Tepat sekali! Sayyarah berakhiran ta marbuthah (muannats), sehingga wajib menggunakan Hadhihi.' },
          { text: 'هٰذَا سَيَّارَةٌ كَبِيرَةٌ', isCorrect: false, feedback: 'Keliru, hadha hanya untuk mudzakkar tanpa ta marbuthah.' }
        ]
      }
    ]
  },

  // TMH-L1-02: Gerbang Ujian Mihrab Mubtadi': Integrasi 4 Kemahiran A1 (Penobatan Rahhal)
  'TMH-L1-02': {
    explanation: {
      conceptTitle: 'Mihrab Mubtadi: Menjadi Pengelana Cakrawala (Rahhal)',
      overview: 'Ujian puncak Jenjang 1. Menguji kemampuan memahami audio perkenalan diri orang lain, merespon sapaan secara lisan tanpa gugup, membaca teks deskripsi keluarga dan profesi, serta merangkai kata acak menjadi kalimat berstruktur. Kelulusan menaikkan Rutbah menjadi Rahhal dan berevolusinya Hudhud menjadi burung muda lincah.',
      rules: [
        {
          title: 'Kecakapan Dialog Taaruf Mandiri',
          explanation: 'Mampu menanyakan nama (Ma ismuka?), asal daerah (Min ayna anta?), dan kabar (Kayfa haluka?) secara spontan dan benar.',
          exampleAr: 'مَا اسْمُكَ؟ — اِسْمِي أَحْمَدُ، وَأَنَا مِنْ جَاكَرْتَا',
          exampleTranslit: 'Mā ismuka? - Ismī Aḥmad, wa-anā min Jākartā',
          exampleId: 'Pilar komunikasi taaruf lisan'
        },
        {
          title: 'Rutbah Rahhal (Sang Pengembara)',
          explanation: 'Gelar Rahhal membuktikan kamu tidak lagi terikat hanya pada huruf dasar, melainkan siap mengembara melintasi 8 kepulauan bahasa Arab.',
          exampleAr: 'رَحَّالُ الآفَاقِ العَرَبِيَّةِ',
          exampleTranslit: 'Raḥḥālu l-āfāqi l-ʿarabiyyah',
          exampleId: 'Kehormatan pengelana lintas pulau'
        }
      ],
      hudhudTips: 'Pastikan pelafalan baris huruf akhir tidak tertelan agar lawan bicara memahami status kalimatmu!'
    },
    highlightVocab: [
      { ar: 'رَحَّالٌ', translit: 'Raḥḥāl', id: 'Rutbah: Sang Pengembara kepulauan' },
      { ar: 'شَهَادَةٌ', translit: 'Syahādah', id: 'Sertifikat ijazah resmi' },
      { ar: 'فَرْخٌ', translit: 'Farkh', id: 'Hudhud muda dengan bulu sayap baru' },
      { ar: 'نَجَاحٌ', translit: 'Najāḥ', id: 'Keberhasilan lulus ujian mihrab' }
    ],
    questions: [
      {
        id: 'tmh_l1_02_q1',
        question: 'Evolusi wujud apa yang dialami pendamping Hudhud ketika pemain berhasil menembus Mihrab Mubtadi Jenjang 1?',
        options: [
          { text: 'Menetas dari telur menjadi Hudhud Muda (Young Explorer) berbulu cerah', isCorrect: true, feedback: 'Mubarak! Hudhud muda kini siap terbang mendampingi penjelajahanmu.' },
          { text: 'Berubah menjadi Burung Garuda raksasa', isCorrect: false, feedback: 'Hudhud berevolusi bertahap dari Baby, Young, Explorer, Scribe, Guardian, hingga Master.' }
        ]
      }
    ]
  },

  // =========================================================================
  // LEVEL 2: ASASI (A2) - Rahhal Menuju Qari
  // =========================================================================

  // TMH-L2-01: Ujian Evaluasi Sintaksis & Struktur
  'TMH-L2-01': {
    explanation: {
      conceptTitle: 'Evaluasi Sintaksis A2: Jumlah Ismiyyah & Fi\'liyyah',
      overview: 'Menguji ketajaman mendeteksi dua tipe kalimat pokok dalam bahasa Arab: Jumlah Ismiyyah (Mubtada-Khabar berstatus Marfu) dan Jumlah Filiyyah (Fiil-Fail berstatus Marfu), efek partikel preposisi Harf Jar terhadap kasrah majrur, serta susunan kepemilikan Idhafah.',
      rules: [
        {
          title: 'Hukum Marfu Mubtada & Khabar',
          explanation: 'Keduanya berharakat akhir dhommah. Jika isim mufrad, mubtada ber-alif lam dan khabar bertanwin.',
          exampleAr: 'العِلْمُ نُورٌ (Ilmu itu cahaya)',
          exampleTranslit: 'Al-ʿilmu nūrun (keduanya dhommah marfu)',
          exampleId: 'Struktur dasar kalimat nominal'
        },
        {
          title: 'Pengaruh Harf Jar terhadap Nomina',
          explanation: 'Huruf seperti Fi, Min, Ila, Ala, dan Bi menyebabkan kata benda setelahnya menjadi Majrur dengan tanda kasrah.',
          exampleAr: 'فِي المَسْجِدِ الكَبِيرِ',
          exampleTranslit: 'Fī l-masjidi l-kabīr',
          exampleId: 'Pengaruh amil harf jar'
        }
      ],
      hudhudTips: 'Jika kalimat diawali kata kerja (fiil), carilah pelakunya (fail) yang selalu berharakat dhommah!'
    },
    highlightVocab: [
      { ar: 'جُمْلَةٌ اسْمِيَّةٌ', translit: 'Jumlah Ismiyyah', id: 'Kalimat diawali kata benda' },
      { ar: 'جُمْلَةٌ فِعْلِيَّةٌ', translit: 'Jumlah Fi\'liyyah', id: 'Kalimat diawali kata kerja' },
      { ar: 'مُبْتَدَأٌ', translit: 'Mubtadaʾ', id: 'Subjek kalimat nominal di awal' },
      { ar: 'خَبَرٌ', translit: 'Khabar', id: 'Predikat pelengkap informasi' }
    ],
    questions: [
      {
        id: 'tmh_l2_01_q1',
        question: 'Manakah susunan Jumlah Ismiyyah yang benar harakat akhirnya sesuai kaidah nahwu?',
        options: [
          { text: 'القَلَمُ جَدِيدٌ (Al-qalamu jadīdun — dhommah & dhommatain)', isCorrect: true, feedback: 'Benar sekali! Mubtada beralif lam marfu dan khabar bertanwin marfu.' },
          { text: 'القَلَمَ جَدِيدٍ', isCorrect: false, feedback: 'Harakatnya keliru; mubtada tidak difathah dan khabar tidak dikasrah.' }
        ]
      }
    ]
  },

  // TMH-L2-02: Gerbang Ujian Mihrab Asasi: Integrasi 4 Kemahiran A2 (Penobatan Qari)
  'TMH-L2-02': {
    explanation: {
      conceptTitle: 'Mihrab Asasi: Penobatan Sang Pembaca Fasih (Qari)',
      overview: 'Ujian komprehensif menguji pemahaman instruksi kelas lisan (awamir al-fasl), percakapan di pasar atau stasiun, membaca wacana fabel pendek bertema hikmah, dan menyusun kalimat majemuk dengan kata hubung (wa, tsumma, fa, aw). Lulusan ditahbiskan dengan Rutbah Qari dan evolusi Hudhud Penjelajah.',
      rules: [
        {
          title: 'Fahm al-Maqru (Pemahaman Teks)',
          explanation: 'Mampu menangkap ide pokok paragraf pendek dan menjawab pertanyaan analitis (Siapa, Di mana, Mengapa).',
          exampleAr: 'مَاذَا فَعَلَتِ النَّمْلَةُ فِي الغَابَةِ؟',
          exampleTranslit: 'Mādhā faʿalati n-namlatu fī l-ghābah?',
          exampleId: 'Pemahaman bacaan teks fabel'
        },
        {
          title: 'Gelar Kehormatan Qari (قَارِئ)',
          explanation: 'Mencerminkan kemampuan membaca teks Arab berharakat dengan artikulasi fasih dan intonasi tanda baca yang hidup.',
          exampleAr: 'قَارِئُ البَيَانِ المُتْقِنُ',
          exampleTranslit: 'Qāriʾu l-bayāni l-mutqin',
          exampleId: 'Kefasihan membaca wacana Arab'
        }
      ],
      hudhudTips: 'Saat membaca wacana, tandai kata kerja kunci untuk melacak alur kronologis peristiwa!'
    },
    highlightVocab: [
      { ar: 'قَارِئٌ', translit: 'Qāriʾ', id: 'Rutbah: Sang Pembaca Fasih' },
      { ar: 'دَرَجَةٌ', translit: 'Darajah', id: 'Derajat peringkat kemahiran' },
      { ar: 'جَوَّالٌ', translit: 'Jawwāl', id: 'Evolusi Hudhud Penjelajah Tangguh' },
      { ar: 'تَفَوُّقٌ', translit: 'Tafawwuq', id: 'Keunggulan prestasi belajar' }
    ],
    questions: [
      {
        id: 'tmh_l2_02_q1',
        question: 'Gelar kehormatan apa yang diraih saat pemain menyelesaikan Mihrab Asasi Jenjang 2?',
        options: [
          { text: 'Qari (قَارِئ) — Pembaca wacana fasih bertata bahasa teratur', isCorrect: true, feedback: 'Mumtaz! Qari melambangkan kematangan membaca dan memahami wacana Arab.' },
          { text: 'Musafir', isCorrect: false, feedback: 'Musafir adalah predikat awal sebelum masuk jenjang.' }
        ]
      }
    ]
  },

  // =========================================================================
  // LEVEL 3: MUTAWASSITH (B1) - Qari Menuju Katib
  // =========================================================================

  // TMH-L3-01: Ujian Evaluasi Paragraf, Dikte & Konjugasi Tashrif
  'TMH-L3-01': {
    explanation: {
      conceptTitle: 'Evaluasi Dikte Imla & Tashrif Lughawi B1',
      overview: 'Ujian ketelitian menulis imla (kaidah hamzah washal vs qatha, alif layyinah, dan ta marbuthah vs maftuhah) serta konjugasi perubahan kata kerja fiil tsulatsi mujarrad ke dalam 14 dhamir madhi, mudhari, dan amr.',
      rules: [
        {
          title: 'Kaidah Penulisan Hamzah Washal vs Qatha',
          explanation: 'Hamzah washal tidak ditulis kepala ain jika didahului wau/fa (wal-kitab), sedangkan hamzah qatha tetap ditulis tegas (wa-ahmad).',
          exampleAr: 'وَاسْمُهُ (washmuhu) ⟷ وَأَكْرَمَهُ (wa-akramahu)',
          exampleTranslit: 'Washmuhu (washal) vs Wa-akramahu (qatha)',
          exampleId: 'Presisi ortografi imla'
        },
        {
          title: 'Konjugasi Fiil Madhi & Mudhari 14 Dhamir',
          explanation: 'Kuasai perubahan akhiran jamak mudzakkar salim (wau jamaah -ū) dan muannats (nun niswah -na).',
          exampleAr: 'كَتَبُوا (mereka pria menulis) ⟷ يَكْتُبْنَ (mereka wanita menulis)',
          exampleTranslit: 'Katabū vs Yaktubna',
          exampleId: 'Morfologi sharaf konjugatif'
        }
      ],
      hudhudTips: 'Sebelum menulis hamzah di awal kata, tambahkan huruf Wau (و). Jika bunyinya tetap terucap jelas, itu adalah Hamzah Qatha (أ)!'
    },
    highlightVocab: [
      { ar: 'إِمْلَاءٌ', translit: 'Imlāʾ', id: 'Dikte ortografi penulisan akurat' },
      { ar: 'تَصْرِيفٌ', translit: 'Taṣrīf', id: 'Konjugasi morfologi kata kerja' },
      { ar: 'هَمْزَةُ قَطْعٍ', translit: 'Hamzah Qatha', id: 'Hamzah berkepala ain wajib dibaca' },
      { ar: 'هَمْزَةُ وَصْلٍ', translit: 'Hamzah Washal', id: 'Hamzah jembatan pelebur vokal' }
    ],
    questions: [
      {
        id: 'tmh_l3_01_q1',
        question: 'Manakah bentuk fiil madhi yang tepat untuk subjek jamak pria (هُمْ - mereka pria)?',
        options: [
          { text: 'كَتَبُوا (Katabū — diakhiri wau jamaah dan alif fariqah)', isCorrect: true, feedback: 'Shahih! Wau jamaah menunjukkan subjek jamak mudzakkar orang ketiga.' },
          { text: 'كَتَبْنَ', isCorrect: false, feedback: 'Katabna digunakan untuk jamak wanita (hunna).' }
        ]
      }
    ]
  },

  // TMH-L3-02: Gerbang Ujian Mihrab Mutawassith: Integrasi 4 Kemahiran B1 (Penobatan Katib)
  'TMH-L3-02': {
    explanation: {
      conceptTitle: 'Mihrab Mutawassith: Penobatan Juru Tulis Cendekia (Katib)',
      overview: 'Ujian kematangan menengah. Menuntut peserta untuk memahami siaran audio percakapan tempo normal, menyampaikan opini atau deskripsi situasi secara lisan, menganalisis artikel biografi/tokoh sejarah, dan menulis esai paragraf terpadu (insya). Kelulusan menobatkan gelar Katib dan menganugerahkan Pena Emas serta evolusi Hudhud Cendekia (Scribe).',
      rules: [
        {
          title: 'Komposisi Insya Paragraf Kohesif',
          explanation: 'Menyusun minimal satu paragraf utuh yang memuat kalimat topik, kalimat penjelas, dan kalimat kesimpulan dengan kata transisi yang tepat.',
          exampleAr: 'فِي البِدَايَةِ... ثُمَّ بَعْدَ ذٰلِكَ... وَفِي الخِتَامِ...',
          exampleTranslit: 'Fī l-bidāyah... tsumma baʿda dhālik... wa-fī l-khitām...',
          exampleId: 'Konektor logika penulisan naratif'
        },
        {
          title: 'Gelar Kehormatan Katib (كَاتِب)',
          explanation: 'Melambangkan penguasaan pena dan sastra tulis, mampu merangkai pikiran abstrak ke dalam teks bahasa Arab yang anggun.',
          exampleAr: 'كَاتِبُ الحِكْمَةِ وَالبَيَانِ',
          exampleTranslit: 'Kātibu l-ḥikmati wa-l-bayān',
          exampleId: 'Gelar sarjana pena Kuil Langit'
        }
      ],
      hudhudTips: 'Gunakan variasi kalimat ismiyyah dan filiyyah secara bergantian dalam esaimu agar karangan terasa dinamis dan indah dibaca!'
    },
    highlightVocab: [
      { ar: 'كَاتِبٌ', translit: 'Kātib', id: 'Rutbah: Sang Juru Tulis Cendekia' },
      { ar: 'قَلَمٌ ذَهَبِيٌّ', translit: 'Qalam Dhahabiyy', id: 'Pena emas simbol kehormatan' },
      { ar: 'مُسَجِّلٌ', translit: 'Musajjil', id: 'Hudhud Cendekia pencatat ilmu' },
      { ar: 'إِنْشَاءٌ', translit: 'Insyāʾ', id: 'Komposisi karangan sastra mandiri' }
    ],
    questions: [
      {
        id: 'tmh_l3_02_q1',
        question: 'Gelar Rutbah apa yang disematkan kepada murid yang lulus ujian Mihrab Mutawassith Jenjang 3?',
        options: [
          { text: 'Katib (كَاتِب) — Penguasa pena dan komposisi tulisan terpadu', isCorrect: true, feedback: 'Mubarak! Gelar Katib adalah tonggak pencapaian literasi mandiri di Kuil Langit.' },
          { text: 'Thalib', isCorrect: false, feedback: 'Thalib adalah gelar tingkat dasar (Jenjang 0).' }
        ]
      }
    ]
  },

  // =========================================================================
  // LEVEL 4: MUTAQADDIM (B2) - Katib Menuju Adib Mutaqaddim
  // =========================================================================

  // TMH-L4-01: Ujian Evaluasi Morfo-Sintaksis Lanjut, I'rab & Wacana Argumentatif
  'TMH-L4-01': {
    explanation: {
      conceptTitle: 'Evaluasi I\'rab Analitis & Fi\'il Tsulatsi Maziid B2',
      overview: 'Ujian level mahir untuk mengurai kedudukan i\'rab kata secara mendalam (Fa\'il marfu bil-waw, Maf\'ul bih manshub bil-ya, Mudhaf ilaih majrur), memahami perubahan makna dari penambahan huruf pada wazan tsulatsi maziid (Af\'ala, Fa\'\'ala, Fā\'ala, Tafa\'\'ala, Istaf\'ala), serta membedah teks argumentatif.',
      rules: [
        {
          title: 'Kedudukan I\'rab Khusus Isim Jamak & Mutsanna',
          explanation: 'Jamak mudzakkar salim marfu dengan wau dan manshub/majrur dengan ya. Isim tatsniyah marfu dengan alif dan manshub/majrur dengan ya.',
          exampleAr: 'جَاءَ المُعَلِّمُونَ (Marfu Wau) ⟷ رَأَيْتُ المُعَلِّمِينَ (Manshub Ya)',
          exampleTranslit: 'Jāʾa l-muʿallimūn vs Raʾaytu l-muʿallimīn',
          exampleId: 'Tanda i\'rab far\'iyyah (cabang)'
        },
        {
          title: 'Perluasan Makna Wazan Tsulatsi Maziid',
          explanation: 'Wazan Istaf\'ala (اِسْتَفْعَلَ) umumnya mengandung makna thalab (memohon/mencari), seperti Istaghfara (memohon ampunan).',
          exampleAr: 'غَفَرَ (mengampuni) ⟶ اِسْتَغْفَرَ (memohon ampunan)',
          exampleTranslit: 'Ghafara -> Istaghfara',
          exampleId: 'Morfologi semantik wazan'
        }
      ],
      hudhudTips: 'Lihatlah huruf penanda jamak di ujung kata! Huruf Nun bukanlah tanda i\'rab, melainkan huruf Wau atau Ya yang mendahuluinya!'
    },
    highlightVocab: [
      { ar: 'إِعْرَابٌ', translit: 'Iʿrāb', id: 'Analisis perubahan status akhir kata' },
      { ar: 'مَزِيدٌ', translit: 'Mazīd', id: 'Verba dengan imbuhan huruf tambahan' },
      { ar: 'مُنَاظَرَةٌ', translit: 'Munāẓarah', id: 'Debat intelektual berhujjah kuat' },
      { ar: 'نَثْرٌ', translit: 'Natsr', id: 'Prosa wacana bernilai sastra' }
    ],
    questions: [
      {
        id: 'tmh_l4_01_q1',
        question: 'Dalam kalimat "كَرَّمَ المَدْرَسَةُ الفَائِزِينَ", apa tanda i\'rab untuk kata "الفَائِزِينَ" sebagai objek (Maf\'ul Bih)?',
        options: [
          { text: 'Manshub dengan huruf Ya (ي) karena merupakan Jamak Mudzakkar Salim', isCorrect: true, feedback: 'Mumtaz! Objek penderita jamak mudzakkar salim ditandai dengan huruf Ya.' },
          { text: 'Marfu dengan huruf Wau', isCorrect: false, feedback: 'Wau adalah tanda marfu untuk subjek/fa\'il.' }
        ]
      }
    ]
  },

  // TMH-L4-02: Gerbang Ujian Mihrab Mutaqaddim: Integrasi 4 Kemahiran B2 (Penobatan Adib Mutaqaddim)
  'TMH-L4-02': {
    explanation: {
      conceptTitle: 'Mihrab Mutaqaddim: Penobatan Adib Mutaqaddim & Perisai Pelindung',
      overview: 'Ujian komprehensif 4 pilar tingkat tinggi: menyimak siaran warta atau wawancara analitis, berpidato dan berdebat secara lisan dengan argumentasi retoris yang santun, membaca artikel konseptual bebas tanpa harakat penuh, dan menyusun esai argumentatif kritis. Kelulusan menganugerahkan gelar Adib Mutaqaddim dan evolusi Hudhud Pelindung (Guardian).',
      rules: [
        {
          title: 'Kefasihan Orasi & Dialektika Santun',
          explanation: 'Mampu mempertahankan pendapat dengan menggunakan dalil logika dan ungkapan retorika Arab fusha tanpa emosi meledak.',
          exampleAr: 'مِنْ وُجْهَةِ نَظَرِي... مَعَ احْتِرَامِي لِرَأْيِكَ...',
          exampleTranslit: 'Min wijhati naẓarī... maʿa-ḥtirāmī li-raʾyik...',
          exampleId: 'Etika adab munadharah intelektual'
        },
        {
          title: 'Hudhud Pelindung Peradaban (Guardian)',
          explanation: 'Hudhud kini bermetamorfosis menjadi elang mahkota berzirah pelindung, lambang pembela kemurnian bahasa Arab fusha di seluruh kepulauan.',
          exampleAr: 'دِرْعُ اللُّغَةِ العَرَبِيَّةِ الخَالِدَةِ',
          exampleTranslit: 'Dirʿu l-lughati l-ʿarabiyyati l-khālidah',
          exampleId: 'Simbol penjaga pusaka bahasa wahyu'
        }
      ],
      hudhudTips: 'Saat berhadapan dengan teks tanpa harakat, gunakan analisis posisi kata (mubtada, fail, maf\'ul) untuk menentukan harakat secara mandiri!'
    },
    highlightVocab: [
      { ar: 'أَدِيبٌ مُتَقَدِّمٌ', translit: 'Adīb Mutaqaddim', id: 'Rutbah: Sastrawan Tingkat Mahir' },
      { ar: 'حَارِسٌ', translit: 'Ḥāris', id: 'Hudhud Pelindung Peradaban (Guardian)' },
      { ar: 'دِرْعٌ', translit: 'Dirʿ', id: 'Perisai kemurnian lisan fusha' },
      { ar: 'خِطَابَةٌ', translit: 'Khiṭābah', id: 'Seni orasi memukau audiens' }
    ],
    questions: [
      {
        id: 'tmh_l4_02_q1',
        question: 'Evolusi Hudhud apa yang tercapai setelah menaklukkan Mihrab Mutaqaddim Jenjang 4?',
        options: [
          { text: 'Hudhud Pelindung (Guardian) berzirah emas penjaga kemurnian bahasa', isCorrect: true, feedback: 'Mubarak! Hudhud kini gagah perkasa melindungi khazanah bahasa Arabmu.' },
          { text: 'Hudhud Bayi', isCorrect: false, feedback: 'Hudhud Bayi adalah tahap pertama saat menetas di Jenjang 0.' }
        ]
      }
    ]
  },

  // =========================================================================
  // LEVEL 5: MUTAMAYYIZ (C1/C2) - Adib Menuju Adib Agung Paripurna
  // =========================================================================

  // TMH-L5-01: Ujian Evaluasi Balaghah (Bayan, Ma'ani, Badi') & Stilistika Sastra Arab
  'TMH-L5-01': {
    explanation: {
      conceptTitle: 'Evaluasi Trilogi Balaghah: Bayan, Ma\'ani, & Badi\'',
      overview: 'Ujian puncak estetika bahasa Arab. Menguji kemampuan mendeteksi keindahan metafora tasybih dan majaz (Ilmu Bayan), kecocokan struktur kalimat dengan konteks situasi muqtadhal hal (Ilmu Ma\'ani), serta ornamen keindahan bunyi seperti jinas dan thibaq (Ilmu Badi\').',
      rules: [
        {
          title: 'Ilmu Bayan: Menyingkap Rahasia Majaz & Tasybih',
          explanation: 'Membedakan antara ungkapan literal (haqiqah) dengan ungkapan kiasan puitis (majaz) yang memperkaya daya imajinasi.',
          exampleAr: 'العِلْمُ كَالنُّورِ يَهْدِي كُلَّ حَائِرٍ',
          exampleTranslit: 'Al-ʿilmu ka-n-nūri yahdī kulla ḥāʾir',
          exampleId: 'Tasybih tam (penyerupaan sempurna: ilmu laksana cahaya)'
        },
        {
          title: 'Ilmu Badi\': Harmoni Jinas & Thibaq',
          explanation: 'Thibaq adalah penyandingan dua kata yang berlawanan arti dalam satu kalimat untuk mempertegas kontras makna.',
          exampleAr: 'يَعْلَمُ السِّرَّ وَالعَلَانِيَةَ (Rahasia vs Terang-terangan)',
          exampleTranslit: 'Yaʿlamu s-sirra wa-l-ʿalāniyah',
          exampleId: 'Thibaq ijab memperkaya keindahan sajak'
        }
      ],
      hudhudTips: 'Jangan hanya mencari makna kata di kamus; carilah rasa dan nuansa emosional (zawq adabi) yang ditiupkan pengarang ke dalam kalimat!'
    },
    highlightVocab: [
      { ar: 'بَلَاغَةٌ', translit: 'Balāghah', id: 'Seni retorika dan estetika bahasa Arab tinggi' },
      { ar: 'بَيَانٌ', translit: 'Bayān', id: 'Ilmu metafora, tasybih, dan kinayah' },
      { ar: 'مَعَانٍ', translit: 'Maʿānī', id: 'Ilmu kesesuaian tuturan dengan konteks' },
      { ar: 'بَدِيعٌ', translit: 'Badīʿ', id: 'Ilmu ornamen keindahan rima dan kontras' }
    ],
    questions: [
      {
        id: 'tmh_l5_01_q1',
        question: 'Dalam kalimat "رَأَيْتُ بَحْرًا يَتَصَدَّقُ عَلَى الفُقَرَاءِ" (Aku melihat lautan bersedekah kepada orang miskin), kata "Bahr" (lautan) bermakna kiasan majaz untuk:',
        options: [
          { text: 'Seorang dermawan yang luar biasa luas kedermawanannya', isCorrect: true, feedback: 'Mumtaz! Ini adalah majaz isti\'arah, menyamakan orang dermawan dengan lautan yang melimpah ruah.' },
          { text: 'Air laut yang meluap ke daratan', isCorrect: false, feedback: 'Air laut asli tidak mungkin bersedekah; ini adalah kiasan puitis.' }
        ]
      }
    ]
  },

  // TMH-L5-02: Gerbang Ujian Mihrab Agung Mutamayyiz: Syahadah Akbar Penguasaan 8 Kepulauan
  'TMH-L5-02': {
    explanation: {
      conceptTitle: 'Mihrab Agung: Khatamul Kepulauan & Penobatan Adib Agung',
      overview: 'Ujian pamungkas seluruh petualangan Madinah Bright Academy. Mihrab tertinggi di puncak awan emas Kuil Langit menguji sintesis sempurna dari kedelapan kepulauan: Huruf, Mufradat, Hiwar, Qawa\'id, Istima\', Qira\'ah, Kalam, dan Kitabah. Kelulusan menganugerahkan Ijazah Sanad Akbar, Mahkota Emas Adib Agung, dan evolusi Hudhud Maharaja (Master).',
      rules: [
        {
          title: 'Sintesis Delapan Kepulauan Beradab',
          explanation: 'Seorang Adib Agung tidak hanya mahir secara teknis, namun mengintegrasikan adab lisan, ketajaman nalar gramatikal, dan kemuliaan akhlak dalam setiap tuturan bahasa Arab.',
          exampleAr: 'خَاتَمُ الكَمَالِ فِي اللُّغَةِ وَالأَدَبِ',
          exampleTranslit: 'Khātamu l-kamāli fī l-lughati wa-l-adab',
          exampleId: 'Puncak integrasi ilmu dan adab kepulauan'
        },
        {
          title: 'Penganugerahan Mahkota Emas & Ijazah Sanad',
          explanation: 'Nama pemain terukir abadi di Prasasti Kehormatan Kuil Langit dan diakui sebagai Penguasa Cakrawala Bahasa Arab.',
          exampleAr: 'تَاجُ الفَصَاحَةِ وَالإِجَازَةُ العُظْمَى',
          exampleTranslit: 'Tāju l-faṣāḥati wa-l-ijāzatu l-ʿuẓmā',
          exampleId: 'Prestasi tertinggi paripurna'
        }
      ],
      hudhudTips: 'Pandanglah ke bawah dari puncak Kuil Langit: delapan kepulauan kini bercahaya terang berkat ikhtiarmu! Kamu adalah Adib Agung sejati!'
    },
    highlightVocab: [
      { ar: 'أَدِيبُ الكُلِّ الأَعْظَم', translit: 'Adību l-Kull', id: 'Rutbah Tertinggi: Pujangga Agung Paripurna' },
      { ar: 'تَاجُ الفَصَاحَةِ', translit: 'Tāj al-Faṣāḥah', id: 'Mahkota emas kemuliaan sastra' },
      { ar: 'إِجَازَةٌ بِالسَّنَدِ', translit: 'Ijāzah bi-s-Sanad', id: 'Sertifikat sanad kelulusan akbar' },
      { ar: 'مَلَكِيٌّ', translit: 'Malakiyy', id: 'Hudhud Maharaja Sayap Keemasan (Master)' }
    ],
    questions: [
      {
        id: 'tmh_l5_02_q1',
        question: 'Gelar puncak dan mahkota tertinggi apa yang dianugerahkan oleh Kuil Langit bagi penjelajah yang berhasil menuntaskan seluruh 8 kepulauan?',
        options: [
          { text: 'Adib Agung Paripurna (أَدِيبُ الكُلِّ الأَعْظَم) dengan Mahkota Emas Kefasihan', isCorrect: true, feedback: 'Mubarakal fawz al-azhim! Kamu telah mencapai martabat tertinggi peradaban bahasa Arab kepulauan!' },
          { text: 'Thalib Awal', isCorrect: false, feedback: 'Thalib Awal adalah gelar jenjang permulaan.' }
        ]
      }
    ]
  }
};
