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

export const QWD_DEDICATED_PEDAGOGY: Record<string, EnrichedSkillPedagogy> = {
  // =========================================================================
  // LEVEL 1: MUBTADI' (A1) - Fondasi Tata Bahasa & Klasifikasi Kata
  // =========================================================================

  // QWD-L1-01: Pembagian Kata: Isim, Fi'il, & Harf (أَقْسَامُ الكَلَام)
  'QWD-L1-01': {
    explanation: {
      conceptTitle: 'Tiga Pilar Kalimat: Isim (Benda), Fi\'il (Kerja), & Harf (Penghubung)',
      overview: 'Di Gunung Qawa\'id, setiap kata dalam bahasa Arab terbagi secara mutlak ke dalam tiga rumpun: Isim (nomina/benda/sifat), Fi\'il (verba/kata kerja terkait waktu lampau, sekarang, atau perintah), dan Harf (partikel penghubung yang baru sempurna artinya bila bersama kata lain).',
      rules: [
        {
          title: 'Ciri Pengenal Isim (Kata Benda/Sifat)',
          explanation: 'Menerima tanwin (ـٌ ـٍ ـً), diawali Alif Lam (الـ), atau didahului huruf jar. Isim tidak terikat dimensi waktu.',
          exampleAr: 'كِتَابٌ (Buku - bertanwin) | المَدْرَسَةُ (Sekolah - ber-Al)',
          exampleTranslit: 'Kitaabun | Al-Madrasatu',
          exampleId: 'Tanda isim dengan tanwin dan alif-lam'
        },
        {
          title: 'Ciri Pengenal Fi\'il (Kata Kerja)',
          explanation: 'Menunjukkan perbuatan yang terikat waktu (Madhi/lampau, Mudhari\'/sekarang, Amr/perintah). Menerima tanda qad (قَدْ), sin (سَـ), sawfa (سَوْفَ), atau ta ta\'nits sakinah (ـتْ).',
          exampleAr: 'كَتَبَ (Telah menulis) | يَكْتُبُ (Sedang menulis) | اُكْتُبْ (Tulislah!)',
          exampleTranslit: 'Kataba | Yaktubu | Uktub',
          exampleId: 'Tiga fase waktu kata kerja fi\'il'
        },
        {
          title: 'Ciri Pengenal Harf (Partikel)',
          explanation: 'Kata yang tidak menerima ciri isim maupun fi\'il. Ia berfungsi mengikat makna antarkata.',
          exampleAr: 'فِي (di dalam), عَلَى (di atas), هَلْ (apakah)',
          exampleTranslit: 'Fii, \'Alaa, Hal',
          exampleId: 'Partikel penghubung dan tanya'
        }
      ],
      hudhudTips: 'Uji dengan Alif Lam! Jika bisa ditempel "Al-" (seperti Al-Qalamu), pasti ia adalah Isim! Fi\'il pantang dimasuki Alif Lam.'
    },
    highlightVocab: [
      { ar: 'اِسْمٌ', translit: 'Ismun', id: 'Kata benda / nomina', note: 'Klasifikasi 1' },
      { ar: 'فِعْلٌ', translit: 'Fi\'lun', id: 'Kata kerja / verba', note: 'Klasifikasi 2' },
      { ar: 'حَرْفٌ', translit: 'Harfun', id: 'Partikel penghubung', note: 'Klasifikasi 3' },
      { ar: 'كَلَامٌ', translit: 'Kalaamun', id: 'Kalimat bermakna sempurna', note: 'Definisi Nahwu' }
    ],
    questions: [
      {
        id: 'qwd_l1_01_q1',
        question: 'Manakah kelompok kata yang semuanya tergolong ISIM?',
        options: [
          { text: 'كِتَابٌ، قَلَمٌ، المَسْجِدُ (bertanwin dan ber-Alif Lam)', isCorrect: true, feedback: 'Mumtaz! Tanwin dan Alif Lam adalah tanda paten isim.' },
          { text: 'ذَهَبَ، يَكْتُبُ، اِقْرَأْ', isCorrect: false, feedback: 'Ini semua adalah fi\'il (kata kerja lampau, sekarang, perintah).' },
          { text: 'فِي، مِنْ، عَلَى', isCorrect: false, feedback: 'Ini adalah kelompok huruf jar/partikel.' },
          { text: 'يَأْكُلُ، يَشْرَبُ، نَامَ', isCorrect: false, feedback: 'Ini adalah kelompok fi\'il (kata kerja aktivitas fisik).' }
        ]
      },
      {
        id: 'qwd_l1_01_q2',
        question: 'Apakah tanda utama yang TIDAK PERNAH bisa masuk ke dalam Fi\'il (kata kerja)?',
        options: [
          { text: 'Alif Lam (الـ) dan Tanwin (ـٌ)', isCorrect: true, feedback: 'Tepat sekali! Fi\'il pantang bertanwin dan pantang ber-Alif Lam.' },
          { text: 'Huruf Mudhara\'ah (Ya, Ta, Nun, Alif)', isCorrect: false, feedback: 'Huruf tersebut justru tanda fi\'il mudhari\'.' }
        ]
      }
    ]
  },

  // QWD-L1-02: Isim Nakirah & Ma'rifah (النَّكِرَةُ وَالمَعْرِفَة)
  'QWD-L1-02': {
    explanation: {
      conceptTitle: 'Ketertentuan Makna: Isim Nakirah (Umum) vs Isim Ma\'rifah (Khusus)',
      overview: 'Setiap kata benda dalam bahasa Arab berada dalam status umum/indefinite (Nakirah) atau spesifik/definite (Ma\'rifah). Konsep ini fundamental dalam pembentukan frasa sifat maupun susunan kalimat sempurna Mubtada\'-Khabar.',
      rules: [
        {
          title: 'Isim Nakirah (Umum / Belum Tertentu)',
          explanation: 'Menunjukkan benda atau sosok umum ("sebuah / seekor / seorang"). Cirinya berakhiran Tanwin dan TANPA Alif Lam.',
          exampleAr: 'كِتَابٌ (Sebuah buku - buku apa saja) | رَجُلٌ (Seorang pria)',
          exampleTranslit: 'Kitaabun | Rajulun',
          exampleId: 'Isim umum dengan tanwin'
        },
        {
          title: 'Isim Ma\'rifah (Khusus / Tertentu)',
          explanation: 'Menunjukkan benda tertentu yang sudah diketahui kedua pihak ("buku tersebut / orang itu"). Cirinya diawali Alif Lam (الـ) atau nama orang (Alam).',
          exampleAr: 'الكِتَابُ (Buku tersebut) | الرَّجُلُ (Pria itu) | زَيْدٌ (Zaid - nama orang otomatis ma\'rifah)',
          exampleTranslit: 'Al-Kitaabu | Ar-Rajulu | Zaydun',
          exampleId: 'Isim khusus ber-Alif Lam'
        },
        {
          title: 'Hukum Pantangan Tanwin & Alif Lam',
          explanation: 'Alif Lam dan Tanwin ibarat air dan minyak; tidak boleh berkumpul dalam satu kata. Kata "الكِتَابٌ" keliru secara kaidah.',
          exampleAr: 'الكِتَابُ (Benar) ⟷ كِتَابٌ (Benar) ⟷ الكِتَابٌ (Keliru)',
          exampleTranslit: 'Al-Kitaabu (Shahih) vs Al-Kitaabun (Khatha\')',
          exampleId: 'Kaidah pemutus tanwin'
        }
      ],
      hudhudTips: 'Tips Emas Hudhud: Begitu "Al-" datang, tanwin langsung terbang kabur! Harakat dhommatain berubah menjadi dhommah tunggal.'
    },
    highlightVocab: [
      { ar: 'نَكِرَةٌ', translit: 'Nakiratun', id: 'Benda umum (indefinite)' },
      { ar: 'مَعْرِفَةٌ', translit: 'Ma\'rifatun', id: 'Benda tertentu (definite)' },
      { ar: 'تَنْوِينٌ', translit: 'Tanwiinun', id: 'Bunyi "an/in/un" di akhir isim' },
      { ar: 'أَلِفٌ وَلَامٌ', translit: 'Alif wa Laam', id: 'Partikel penentu definitif (الـ)' }
    ],
    questions: [
      {
        id: 'qwd_l1_02_q1',
        question: 'Bagaimana mengubah kata nakirah "بَيْتٌ" (sebuah rumah) menjadi ma\'rifah (rumah tersebut)?',
        options: [
          { text: 'البَيْتُ (diberi Alif Lam dan tanwin dibuang menjadi dhommah tunggal)', isCorrect: true, feedback: 'Mumtaz! Alif Lam menghapus tanwin.' },
          { text: 'البَيْتٌ (diberi Alif Lam dan tetap bertanwin)', isCorrect: false, feedback: 'Keliru! Alif Lam dan tanwin tidak boleh berkumpul.' },
          { text: 'بَيْتًا (diubah menjadi fathah)', isCorrect: false, feedback: 'Mengubah harakat tidak mengubah status ma\'rifah.' }
        ]
      }
    ]
  },

  // QWD-L1-03: Gender Kata: Mudzakkar & Muannats (المُذَكَّرُ وَالمُؤَنَّث)
  'QWD-L1-03': {
    explanation: {
      conceptTitle: 'Kaidah Jenis Gender: Maskulin (Mudzakkar) & Feminin (Muannats)',
      overview: 'Bahasa Arab membagi setiap kata benda ke dalam dua gender biologis/gramatikal: Mudzakkar (pria/maskulin) dan Muannats (wanita/feminin). Penentuan gender ini wajib selaras dengan kata sifat, kata kerja, dan kata tunjuk.',
      rules: [
        {
          title: 'Ciri Utama Muannats: Ta\' Marbuthah (ـة / ة)',
          explanation: 'Sebagian besar isim muannats berakhiran ta marbuthah. Selain itu, nama wanita (Maryam, Zainab) dan anggota tubuh berpasangan (mata, tangan, kaki) berstatus muannats.',
          exampleAr: 'مَدْرَسَةٌ (Sekolah), سَيَّارَةٌ (Mobil), عَيْنٌ (Mata), يَدٌ (Tangan)',
          exampleTranslit: 'Madrasatun, Sayyaratun, \'Aynun, Yadun',
          exampleId: 'Contoh isim feminin'
        },
        {
          title: 'Ciri Isim Mudzakkar (Maskulin)',
          explanation: 'Kata yang tidak mengandung tanda muannats, nama laki-laki, atau benda maskulin secara konvensi bahasa.',
          exampleAr: 'كِتَابٌ (Buku), بَابٌ (Pintu), طَالِبٌ (Siswa laki-laki)',
          exampleTranslit: 'Kitaabun, Baabun, Thaalibun',
          exampleId: 'Contoh isim maskulin'
        },
        {
          title: 'Prinsip Keselarasan Na\'at (Kata Sifat)',
          explanation: 'Kata sifat harus meniru gender bendanya: Mudzakkar disifati kata mudzakkar, Muannats disifati kata muannats.',
          exampleAr: 'قَلَمٌ جَدِيدٌ (Pena baru) ⟷ مِسْطَرَةٌ جَدِيدَةٌ (Penggaris baru)',
          exampleTranslit: 'Qalamun Jadiidun vs Mistharatun Jadiidatun',
          exampleId: 'Kesesuaian sifat dan maushuf'
        }
      ],
      hudhudTips: 'Lihat ekor katanya! Ada lingkaran dengan dua titik (ـة / ة)? 95% itu adalah Muannats!'
    },
    highlightVocab: [
      { ar: 'مُذَكَّرٌ', translit: 'Mudzakkarun', id: 'Jenis maskulin / laki-laki' },
      { ar: 'مُؤَنَّثٌ', translit: 'Mu-annatsun', id: 'Jenis feminin / perempuan' },
      { ar: 'تَاءٌ مَرْبُوطَةٌ', translit: 'Taa\' Marbuuthah', id: 'Huruf Ta terikat penanda feminin (ـة)' },
      { ar: 'صِفَةٌ', translit: 'Shifatun', id: 'Kata sifat penjelas' }
    ],
    questions: [
      {
        id: 'qwd_l1_03_q1',
        question: 'Manakah pasangan kata benda dan sifat yang BENAR keselarasan gendernya?',
        options: [
          { text: 'حَقِيبَةٌ كَبِيرَةٌ (keduanya muannats berakhiran ta marbuthah)', isCorrect: true, feedback: 'Shahih! Benda feminin wajib disifati dengan bentuk feminin.' },
          { text: 'حَقِيبَةٌ كَبِيرٌ', isCorrect: false, feedback: 'Salah, haqiibah adalah muannats tetapi kabiir adalah mudzakkar.' },
          { text: 'كِتَابٌ صَغِيرَةٌ', isCorrect: false, feedback: 'Salah, kitaab adalah mudzakkar tetapi shaghiirah adalah muannats.' }
        ]
      }
    ]
  },

  // QWD-L1-04: Isim Isyarah Dekat: Hadha & Hadhihi (أَسْمَاءُ الإِشَارَةِ لِلْقَرِيب)
  'QWD-L1-04': {
    explanation: {
      conceptTitle: 'Kata Tunjuk Jarak Dekat: Hadha (هٰذَا) & Hadhihi (هٰذِهِ)',
      overview: 'Untuk menunjuk objek tunggal yang berada dekat dengan pembicara ("Ini"), bahasa Arab menyediakan dua partikel tunjuk: Hadha untuk mudzakkar dan Hadhihi untuk muannats.',
      rules: [
        {
          title: 'Hadha (هٰذَا) untuk Mudzakkar Tunggal',
          explanation: 'Gunakan هٰذَا di depan kata benda maskulin tunggal.',
          exampleAr: 'هٰذَا بَيْتٌ (Ini sebuah rumah) | هٰذَا مُعَلِّمٌ (Ini seorang guru pria)',
          exampleTranslit: 'Haadzaa baitun | Haadzaa mu\'allimun',
          exampleId: 'Tunjuk dekat maskulin'
        },
        {
          title: 'Hadhihi (هٰذِهِ) untuk Muannats Tunggal & Jamak Tidak Berakal',
          explanation: 'Gunakan هٰذِهِ di depan benda feminin (ber-ta marbuthah) dan kelak untuk semua benda jamak taksir benda mati.',
          exampleAr: 'هٰذِهِ غُرْفَةٌ (Ini sebuah kamar) | هٰذِهِ طَالِبَةٌ (Ini seorang siswi)',
          exampleTranslit: 'Haadzihi ghurfatun | Haadzihi thaalibatun',
          exampleId: 'Tunjuk dekat feminin'
        }
      ],
      hudhudTips: 'Bunyi "Haadzaa" tegas tanpa akhiran "hi", cocok untuk benda tanpa ta marbuthah!'
    },
    highlightVocab: [
      { ar: 'هٰذَا', translit: 'Haadzaa', id: 'Ini (maskulin tunggal)' },
      { ar: 'هٰذِهِ', translit: 'Haadzihi', id: 'Ini (feminin tunggal)' },
      { ar: 'إِشَارَةٌ', translit: 'Isyaaratun', id: 'Petunjuk / isyarat' },
      { ar: 'قَرِيبٌ', translit: 'Qariibun', id: 'Dekat jaraknya' }
    ],
    questions: [
      {
        id: 'qwd_l1_04_q1',
        question: 'Lengkapilah kalimat: ".... مَسْجِدٌ نَظِيفٌ" (Ini adalah masjid yang bersih)',
        options: [
          { text: 'هٰذَا (Haadzaa)', isCorrect: true, feedback: 'Tepat! Masjidun adalah mudzakkar, maka menggunakan Hadha.' },
          { text: 'هٰذِهِ (Haadzihi)', isCorrect: false, feedback: 'Hadzihi dikhususkan untuk benda muannats.' }
        ]
      }
    ]
  },

  // QWD-L1-05: Tanda Asli Kata Tunggal: Isim Mufrad (المُفْرَدُ وَعَلَامَاتُهُ)
  'QWD-L1-05': {
    explanation: {
      conceptTitle: 'Tiga Harakat Asli I\'rab Isim Mufrad (Dhommah, Fathah, Kasrah)',
      overview: 'Isim Mufrad adalah kata benda yang menunjukkan jumlah tunggal (satu). Kedudukannya dalam kalimat ditentukan oleh tiga tanda i\'rab asli: Rafa\' dengan Dhommah, Nashab dengan Fathah, dan Jar dengan Kasrah.',
      rules: [
        {
          title: 'Keadaan Rafa\' (مَرْفُوعٌ): Tanda Dhommah (ـُ / ـٌ)',
          explanation: 'Berlaku saat kata menjadi Subjek (Mubtada\') atau Pelaku (Fa\'il).',
          exampleAr: 'جَاءَ الطَّالِبُ (Siswa itu telah datang)',
          exampleTranslit: 'Jaa-a ath-thaalibu',
          exampleId: 'Status rafa\' bertanda dhommah'
        },
        {
          title: 'Keadaan Nashab (مَنْصُوبٌ): Tanda Fathah (ـَ / ـً)',
          explanation: 'Berlaku saat kata menjadi Objek Penderita sasaran kerja (Maf\'ul Bih).',
          exampleAr: 'رَأَيْتُ الطَّالِبَ (Aku melihat siswa itu)',
          exampleTranslit: 'Ra-aytu ath-thaaliba',
          exampleId: 'Status nashab bertanda fathah'
        },
        {
          title: 'Keadaan Jar (مَجْرُورٌ): Tanda Kasrah (ـِ / ـٍ)',
          explanation: 'Berlaku saat kata dimasuki huruf jar atau menjadi pemilik (Mudhaf Ilaih).',
          exampleAr: 'سَلَّمْتُ عَلَى الطَّالِبِ (Aku memberi salam kepada siswa itu)',
          exampleTranslit: 'Sallamtu \'ala ath-thaalibi',
          exampleId: 'Status jar bertanda kasrah'
        }
      ],
      hudhudTips: 'Ingat tangga harakat: Atas = Dhommah (Rafa\'), Tengah = Fathah (Nashab), Bawah = Kasrah (Jar).'
    },
    highlightVocab: [
      { ar: 'مُفْرَدٌ', translit: 'Mufradun', id: 'Kata tunggal (satu)' },
      { ar: 'ضَمَّةٌ', translit: 'Dhommatun', id: 'Tanda asli Rafa\' (ـُ)' },
      { ar: 'فَتْحَةٌ', translit: 'Fathatun', id: 'Tanda asli Nashab (ـَ)' },
      { ar: 'كَسْرَةٌ', translit: 'Kasratun', id: 'Tanda asli Jar (ـِ)' }
    ],
    questions: [
      {
        id: 'qwd_l1_05_q1',
        question: 'Apakah tanda harakat asli untuk isim mufrad dalam keadaan MARFU\' (subjek/pelaku)?',
        options: [
          { text: 'Dhommah (ـُ / ـٌ)', isCorrect: true, feedback: 'Mumtaz! Dhommah adalah pimpinan tanda rafa\'.' },
          { text: 'Fathah (ـَ / ـً)', isCorrect: false, feedback: 'Fathah adalah tanda nashab.' },
          { text: 'Kasrah (ـِ / ـٍ)', isCorrect: false, feedback: 'Kasrah adalah tanda jar.' }
        ]
      }
    ]
  },

  // QWD-L1-06: Kata Tanya Formal: Adawatul Istifham (أَدَوَاتُ الِاسْتِفْهَام)
  'QWD-L1-06': {
    explanation: {
      conceptTitle: 'Arsitektur Kalimat Tanya Formal (Adawatul Istifham)',
      overview: 'Kata tanya dalam bahasa Arab diletakkan di awal kalimat (Shadrul Jumlah). Setiap partikel memiliki fungsi spesifik: Hal/A (apakah - ya/tidak), Ma/Madha (apa - benda), Man (siapa - orang), Ayna (di mana - tempat), Kayfa (bagaimana - kondisi), dan Kam (berapa - kuantitas).',
      rules: [
        {
          title: 'Partikel Hal (هَلْ) & Hamzah (أَ): Konfirmasi Ya / Tidak',
          explanation: 'Digunakan untuk meminta persetujuan. Dijawab dengan Na\'am (Ya) atau La (Tidak).',
          exampleAr: 'هَلْ أَنْتَ مُعَلِّمٌ؟ نَعَمْ، أَنَا مُعَلِّمٌ',
          exampleTranslit: 'Hal anta mu\'allimun? Na\'am, ana mu\'allimun',
          exampleId: 'Tanya konfirmasi'
        },
        {
          title: 'Menanyakan Sosok Berakal (مَنْ) vs Benda (مَا / مَاذَا)',
          explanation: 'Gunakan Man untuk manusia/sosok berakal, dan Ma untuk benda non-insan.',
          exampleAr: 'مَنْ هٰذَا؟ هٰذَا طَبِيبٌ | مَا هٰذَا؟ هٰذَا كِتَابٌ',
          exampleTranslit: 'Man haadzaa? Haadzaa thabiibun | Ma haadzaa? Haadzaa kitaabun',
          exampleId: 'Perbedaan man dan ma'
        }
      ],
      hudhudTips: 'Kata tanya selalu memimpin di barisan paling depan kalimat! Tidak boleh diletakkan di akhir.'
    },
    highlightVocab: [
      { ar: 'هَلْ', translit: 'Hal', id: 'Apakah (konfirmasi)' },
      { ar: 'مَنْ', translit: 'Man', id: 'Siapa (sosok berakal)' },
      { ar: 'مَاذَا', translit: 'Maadzaa', id: 'Apa yang (diikuti fi\'il)' },
      { ar: 'أَيْنَ', translit: 'Ayna', id: 'Di mana (tempat)' }
    ],
    questions: [
      {
        id: 'qwd_l1_06_q1',
        question: 'Partikel tanya manakah yang tepat untuk menanyakan profesi seorang manusia (cth: dokter/insinyur)?',
        options: [
          { text: 'مَنْ (Man - Siapa)', isCorrect: true, feedback: 'Shahih! Man dikhususkan untuk sosok yang berakal.' },
          { text: 'مَا (Ma - Apa)', isCorrect: false, feedback: 'Ma umumnya untuk benda yang tidak berakal.' },
          { text: 'أَيْنَ (Ayna - Di mana)', isCorrect: false, feedback: 'Ayna untuk menanyakan lokasi tempat.' }
        ]
      }
    ]
  },

  // =========================================================================
  // LEVEL 2: ASASI (A2) - Kalimat Ismiyyah, Preposisi, Zharaf & Idhafah
  // =========================================================================

  // QWD-L2-01: Kalimat Nominal: Mubtada' & Khabar (الجُمْلَةُ الِاسْمِيَّة)
  'QWD-L2-01': {
    explanation: {
      conceptTitle: 'Arsitektur Kalimat Nominal: Mubtada\' (Subjek) & Khabar (Predikat)',
      overview: 'Jumlah Ismiyyah adalah kalimat yang diawali oleh kata benda (Isim). Struktur intinya terdiri dari Mubtada\' (pokok bahasan yang umumnya Ma\'rifah) dan Khabar (informasi penjelas yang umumnya Nakirah). Kedua rukun ini WAJIB berstatus Marfu\' (dhommah pada isim mufrad).',
      rules: [
        {
          title: 'Hukum Marfu\' pada Mubtada\' dan Khabar',
          explanation: 'Keduanya berharakat dhommah. Mubtada\' ber-Alif Lam dengan dhommah tunggal, Khabar bertanwin dhommatain.',
          exampleAr: 'الوَلَدُ نَشِيطٌ (Anak itu rajin) | العِلْمُ نُورٌ (Ilmu itu cahaya)',
          exampleTranslit: 'Al-waladu nasyiithun | Al-\'ilmu nuurun',
          exampleId: 'Struktur baku ismiyyah'
        },
        {
          title: 'Keselarasan Gender & Jumlah',
          explanation: 'Khabar wajib menyesuaikan jenis mudzakkar/muannats dari Mubtada\'-nya.',
          exampleAr: 'البِنْتُ ذَكِيَّةٌ (Anak perempuan itu cerdas)',
          exampleTranslit: 'Al-bintu dzakiyyatun',
          exampleId: 'Khabar feminin mengikuti subjek'
        }
      ],
      hudhudTips: 'Mubtada\' ibarat kepala kereta (ber-Al), Khabar ibarat gerbongnya (bertanwin). Dua-duanya sama-sama Marfu\' dhommah!'
    },
    highlightVocab: [
      { ar: 'مُبْتَدَأٌ', translit: 'Mubtada-un', id: 'Subjek pembuka kalimat (Marfu\')' },
      { ar: 'خَبَرٌ', translit: 'Khabarun', id: 'Predikat penjelas berita (Marfu\')' },
      { ar: 'مَرْفُوعٌ', translit: 'Marfuu\'un', id: 'Keadaan nominatif ber-dhommah' },
      { ar: 'جُمْلَةٌ اسْمِيَّةٌ', translit: 'Jumlatun Ismiyyah', id: 'Kalimat nominal' }
    ],
    questions: [
      {
        id: 'qwd_l2_01_q1',
        question: 'Manakah susunan harakat yang PALING TEPAT untuk kalimat "Anak itu jujur"?',
        options: [
          { text: 'الوَلَدُ صَادِقٌ (Mubtada\' ber-Al dhommah, Khabar tanwin dhommatain)', isCorrect: true, feedback: 'Mumtaz! Mubtada\' ma\'rifah marfu\', khabar nakirah marfu\'.' },
          { text: 'الوَلَدَ صَادِقًا', isCorrect: false, feedback: 'Keliru, keduanya difathah manshub.' },
          { text: 'الوَلَدُ صَادِقٍ', isCorrect: false, feedback: 'Keliru, khabar tidak berharakat kasrah.' }
        ]
      }
    ]
  },

  // QWD-L2-02: Ragam Bentuk Khabar (أَنْوَاعُ الخَبَر)
  'QWD-L2-02': {
    explanation: {
      conceptTitle: 'Ragam Wujud Predikat (Khabar): Mufrad, Syibhul Jumlah, & Kalimat',
      overview: 'Predikat (Khabar) tidak selalu berupa satu kata sifat tunggal. Khabar bisa berwujud frasa preposisi (Jar-Majrur), frasa keterangan tempat/waktu (Zharaf), bahkan anak kalimat kerja (Jumlah Fi\'liyyah).',
      rules: [
        {
          title: 'Khabar Mufrad (Satu Kata Nomina)',
          explanation: 'Bukan berupa kalimat maupun anak kalimat.',
          exampleAr: 'المُعَلِّمُ حَاضِرٌ (Guru itu hadir)',
          exampleTranslit: 'Al-mu\'allimu haadhirun',
          exampleId: 'Khabar tunggal kata'
        },
        {
          title: 'Khabar Syibhul Jumlah (Frasa Jar-Majrur / Zharaf)',
          explanation: 'Predikat berupa keterangan tempat atau posisi keberadaan.',
          exampleAr: 'الكِتَابُ عَلَى المَكْتَبِ (Buku itu DI ATAS MEJA) | العُصْفُورُ فَوْقَ الشَّجَرَةِ',
          exampleTranslit: 'Al-kitaabu \'ala l-maktabi | Al-\'ushfuuru fawqa sy-syajarah',
          exampleId: 'Khabar frasa preposisi & posisi'
        },
        {
          title: 'Khabar Jumlah Fi\'liyyah (Anak Kalimat Kerja)',
          explanation: 'Predikat berupa kata kerja yang menjelaskan aksi si subjek.',
          exampleAr: 'الطَّالِبُ يَقْرَأُ الكِتَابَ (Siswa itu SEDANG MEMBACA BUKU)',
          exampleTranslit: 'Ath-thaalibu yaqra-u l-kitaaba',
          exampleId: 'Khabar berwujud kata kerja'
        }
      ],
      hudhudTips: 'Jika melihat setelah subjek langsung ada "fii" atau "\'alaa", predikatnya berwujud Syibhul Jumlah!'
    },
    highlightVocab: [
      { ar: 'خَبَرٌ مُفْرَدٌ', translit: 'Khabar Mufrad', id: 'Predikat kata tunggal' },
      { ar: 'شِبْهُ جُمْلَةٍ', translit: 'Syibhu Jumlah', id: 'Frasa serupa kalimat (jar/zharaf)' },
      { ar: 'حَاضِرٌ', translit: 'Haadhirun', id: 'Hadir / berada di tempat' },
      { ar: 'عَلَى المَكْتَبِ', translit: '\'Ala l-maktabi', id: 'Di atas meja' }
    ],
    questions: [
      {
        id: 'qwd_l2_02_q1',
        question: 'Pada kalimat "الطَّائِرُ فَوْقَ الغُصْنِ" (Burung itu di atas dahan), apakah jenis khabar-nya?',
        options: [
          { text: 'Syibhul Jumlah (Frasa Zharaf Tempat)', isCorrect: true, feedback: 'Tepat sekali! Fawqa adalah zharaf makan penunjuk posisi.' },
          { text: 'Khabar Mufrad', isCorrect: false, feedback: 'Bukan, karena terdiri dari susunan keterangan posisi.' }
        ]
      }
    ]
  },

  // QWD-L2-03: Huruf Jar & Isim Majrur (حُرُوفُ الجَرِّ وَعَمَلُهَا)
  'QWD-L2-03': {
    explanation: {
      conceptTitle: 'Kekuatan Huruf Jar: Penarik Harakat Kasrah Majrur',
      overview: 'Huruf Jar adalah partikel preposisi yang memiliki satu tugas gramatikal mutlak: menjadikan kata benda (isim) sesudahnya berstatus Majrur (berharakat kasrah pada isim mufrad). Rombongan huruf jar utama meliputi: مِنْ (dari), إِلَى (ke), عَنْ (tentang), عَلَى (di atas), فِي (di dalam), بِـ (dengan), dan لِـ (untuk/milik).',
      rules: [
        {
          title: 'Pengaruh I\'rab: Mengkasrahkan Huruf Terakhir',
          explanation: 'Begitu huruf jar masuk, harakat kata benda langsung berubah menjadi kasrah atau kasratain.',
          exampleAr: 'المَسْجِدُ ⟶ فِي المَسْجِدِ | مَكْتَبٌ ⟶ عَلَى مَكْتَبٍ',
          exampleTranslit: 'Al-masjidu -> Fii l-masjidi | Maktabun -> \'Ala maktabin',
          exampleId: 'Perubahan harakat akibat huruf jar'
        },
        {
          title: 'Huruf Jar Gandeng: Bi- (بِـ) dan Li- (لِـ)',
          explanation: 'Ditulis menyatu dengan kata setelahnya tanpa spasi.',
          exampleAr: 'كَتَبْتُ بِالقَلَمِ (Aku menulis dengan pena) | الحَمْدُ لِلَّهِ (Segala puji bagi Allah)',
          exampleTranslit: 'Katabtu bi-l-qalami | Al-hamdu li-Llaahi',
          exampleId: 'Huruf jar bersambung'
        }
      ],
      hudhudTips: 'Huruf jar seperti magnet berat ke bawah: menarik harakat kata setelahnya jatuh ke dasar (kasrah)!'
    },
    highlightVocab: [
      { ar: 'حَرْفُ جَرٍّ', translit: 'Harfu Jarrin', id: 'Partikel preposisi pengkasrah' },
      { ar: 'اِسْمٌ مَجْرُورٌ', translit: 'Ismun Majruurun', id: 'Kata benda yang dikasrahkan' },
      { ar: 'مِنْ', translit: 'Min', id: 'Dari' },
      { ar: 'إِلَى', translit: 'Ilaa', id: 'Ke / menuju' }
    ],
    questions: [
      {
        id: 'qwd_l2_03_q1',
        question: 'Pilihlah harakat yang TEPAT untuk melengkapi kalimat: "ذَهَبَ عَلِيٌّ إِلَى المَدْرَسَةِ...."',
        options: [
          { text: 'المَدْرَسَةِ (berharakat kasrah karena didahului huruf jar ilaa)', isCorrect: true, feedback: 'Mumtaz! Ilaa adalah huruf jar yang mengkasrahkan isim majrur.' },
          { text: 'المَدْرَسَةُ (dhommah)', isCorrect: false, feedback: 'Salah, dhommah adalah tanda rafa\'.' },
          { text: 'المَدْرَسَةَ (fathah)', isCorrect: false, feedback: 'Salah, fathah adalah tanda nashab.' }
        ]
      }
    ]
  },

  // QWD-L2-04: Zharaf Makan & Zharaf Zaman (ظَرْفُ المَكَانِ وَالزَّمَان)
  'QWD-L2-04': {
    explanation: {
      conceptTitle: 'Keterangan Ruang & Waktu: Zharaf Makan & Zharaf Zaman',
      overview: 'Zharaf adalah nomina keterangan yang berstatus Manshub (berharakat Fathah) yang menjelaskan di mana perbuatan berlangsung (Makan/tempat) atau kapan perbuatan terjadi (Zaman/waktu).',
      rules: [
        {
          title: 'Zharaf Makan (Keterangan Tempat & Posisi)',
          explanation: 'Menunjukkan koordinat spasial: أَمَامَ (di depan), خَلْفَ (di belakang), فَوْقَ (di atas melayang), تَحْتَ (di bawah), بَيْنَ (di antara). Kata setelah zharaf berstatus Mudhaf Ilaih majrur (kasrah).',
          exampleAr: 'جَلَسَ أَمَامَ الأُسْتَاذِ (Dia duduk di depan guru)',
          exampleTranslit: 'Jalasa amaama l-ustaadzi',
          exampleId: 'Zharaf makan berfathah'
        },
        {
          title: 'Zharaf Zaman (Keterangan Waktu)',
          explanation: 'Menunjukkan waktu terjadinya aktivitas: صَبَاحًا (pagi hari), مَسَاءً (sore hari), لَيْلًا (malam hari), يَوْمًا (suatu hari).',
          exampleAr: 'سَافَرْتُ لَيْلًا (Aku bepergian pada malam hari)',
          exampleTranslit: 'Saafartu lailan',
          exampleId: 'Zharaf zaman bertanwin fathah'
        }
      ],
      hudhudTips: 'Harakat asli zharaf adalah Fathah! Dan kata benda penunjuk tempat setelahnya selalu berharakat Kasrah.'
    },
    highlightVocab: [
      { ar: 'أَمَامَ', translit: 'Amaama', id: 'Di depan (zharaf tempat)' },
      { ar: 'خَلْفَ', translit: 'Khalfa', id: 'Di belakang (zharaf tempat)' },
      { ar: 'فَوْقَ', translit: 'Fawqa', id: 'Di atas (posisi spasial)' },
      { ar: 'صَبَاحًا', translit: 'Shabaahan', id: 'Pada pagi hari (zharaf waktu)' }
    ],
    questions: [
      {
        id: 'qwd_l2_04_q1',
        question: 'Bagaimanakah harakat kata "Al-Ustaadz" setelah kata "Amāma" dalam kalimat: "جَلَسَ زَيْدٌ أَمَامَ .... "?',
        options: [
          { text: 'الأُسْتَاذِ (kasrah majrur sebagai mudhaf ilaih)', isCorrect: true, feedback: 'Benar sekali! Kata setelah zharaf makan berstatus majrur kasrah.' },
          { text: 'الأُسْتَاذُ (dhommah)', isCorrect: false, feedback: 'Salah, dhommah tidak berlaku setelah zharaf.' }
        ]
      }
    ]
  },

  // QWD-L2-05: Konsep Kepemilikan Idhafah (المُضَافُ وَالمُضَافُ إِلَيْه)
  'QWD-L2-05': {
    explanation: {
      conceptTitle: 'Arsitektur Kepemilikan Idhafah: Mudhaf (Milik) & Mudhaf Ilaih (Pemilik)',
      overview: 'Idhafah adalah penyandaran dua kata benda untuk menunjukkan kepemilikan ("Buku Zaid") atau spesifikasi ("Kunci Rumah"). Rukun pertama disebut Mudhaf (benda yang disandarkan), rukun kedua disebut Mudhaf Ilaih (pemilik atau penjelas).',
      rules: [
        {
          title: 'Hukum Ketat Mudhaf (Benda yang Dimiliki)',
          explanation: 'Mudhaf HARAM memakai Alif Lam dan HARAM bertanwin! Harakat akhirnya fleksibel mengikuti perannya dalam kalimat.',
          exampleAr: 'كِتَابُ زَيْدٍ (Bukan Al-Kitaabu Zaidin, bukan Kitaabun Zaidin)',
          exampleTranslit: 'Kitaabu Zaydin',
          exampleId: 'Mudhaf tanpa Al dan tanpa tanwin'
        },
        {
          title: 'Hukum Mutlak Mudhaf Ilaih (Sang Pemilik)',
          explanation: 'Mudhaf Ilaih SELALU Majrur (berharakat kasrah pada isim mufrad).',
          exampleAr: 'مِفْتَاحُ البَيْتِ جَدِيدٌ (Kunci rumah itu baru)',
          exampleTranslit: 'Miftaahu l-bayti jadiidun',
          exampleId: 'Mudhaf ilaih berharakat kasrah'
        }
      ],
      hudhudTips: 'Pantangan Idhafah: Jangan pernah beri Alif Lam atau Tanwin pada kata pertama (Mudhaf)!'
    },
    highlightVocab: [
      { ar: 'مُضَافٌ', translit: 'Mudhaafun', id: 'Kata pertama yang dimiliki (tanpa Al/tanwin)' },
      { ar: 'مُضَافٌ إِلَيْهِ', translit: 'Mudhaafun Ilayhi', id: 'Kata kedua sang pemilik (selalu kasrah)' },
      { ar: 'كِتَابُ الطَّالِبِ', translit: 'Kitaabu th-thaalibi', id: 'Buku siswa itu' },
      { ar: 'بَابُ المَسْجِدِ', translit: 'Baabu l-masjidi', id: 'Pintu masjid' }
    ],
    questions: [
      {
        id: 'qwd_l2_05_q1',
        question: 'Manakah susunan frasa kepemilikan Idhafah yang TEPAT kaidahnya?',
        options: [
          { text: 'قَلَمُ المُعَلِّمِ (Mudhaf tanpa Al/tanwin, Mudhaf Ilaih kasrah)', isCorrect: true, feedback: 'Mumtaz! Qalamu bersih dari Al/tanwin, dan Al-Mu\'allimi berharakat kasrah.' },
          { text: 'القَلَمُ المُعَلِّمِ (Mudhaf memakai Alif Lam)', isCorrect: false, feedback: 'Keliru! Mudhaf dilarang memakai Alif Lam.' },
          { text: 'قَلَمٌ المُعَلِّمُ (Mudhaf bertanwin dan mudhaf ilaih dhommah)', isCorrect: false, feedback: 'Keliru ganda pada kedua harakat.' }
        ]
      }
    ]
  },

  // QWD-L2-06: Dhomir Munfashil & Muttashil (الضَّمَائِرُ المُنْفَصِلَةُ وَالمُتَّصِلَة)
  'QWD-L2-06': {
    explanation: {
      conceptTitle: 'Sistem Pronomina: Dhomir Munfashil (Mandiri) & Muttashil (Melekat)',
      overview: 'Kata ganti orang (Dhomir) dalam bahasa Arab terbagi dua wujud: Munfashil (berdiri sendiri sebagai kata independen) dan Muttashil (menempel di buntut isim sebagai kepemilikan, di buntut fi\'il sebagai objek, atau di buntut huruf jar).',
      rules: [
        {
          title: 'Dhomir Munfashil Utama (Kata Ganti Mandiri)',
          explanation: 'هُوَ (dia L), هِيَ (dia P), أَنْتَ (kamu L), أَنْتِ (kamu P), أَنَا (saya), نَحْنُ (kami/kita). Menempati posisi rafa\' sebagai Mubtada\'.',
          exampleAr: 'أَنَا طَالِبٌ | هُوَ أُسْتَاذٌ | نَحْنُ مُسْلِمُونَ',
          exampleTranslit: 'Ana thaalibun | Huwa ustaadzun | Nahnu muslimuun',
          exampleId: 'Dhomir mandiri pembuka kalimat'
        },
        {
          title: 'Dhomir Muttashil Kepemilikan (Menempel di Isim)',
          explanation: 'Akhiran -hu (miliknya L), -ha (miliknya P), -ka (milikmu L), -ki (milikmu P), -i (milikku), -na (milik kita).',
          exampleAr: 'كِتَابُهُ (bukunya), كِتَابُكَ (bukumu L), كِتَابِي (bukuku), كِتَابُنَا (buku kita)',
          exampleTranslit: 'Kitaabuhu, Kitaabuka, Kitaabii, Kitaabunaa',
          exampleId: 'Dhomir kepemilikan bersambung'
        }
      ],
      hudhudTips: 'Ingat rumus kepemilikan: Isim + [ـهُ / ـهَا / ـكَ / ـكِ / ـي / ـنَا] = Milik!'
    },
    highlightVocab: [
      { ar: 'ضَمِيرٌ مُنْفَصِلٌ', translit: 'Dhomiir Munfashil', id: 'Kata ganti terpisah/mandiri' },
      { ar: 'ضَمِيرٌ مُتَّصِلٌ', translit: 'Dhomiir Muttashil', id: 'Kata ganti bersambung di ekor kata' },
      { ar: 'هُوَ / هِيَ', translit: 'Huwa / Hiya', id: 'Dia laki-laki / Dia perempuan' },
      { ar: 'كِتَابِي', translit: 'Kitaabii', id: 'Bukuku (dengan Ya mutakallim)' }
    ],
    questions: [
      {
        id: 'qwd_l2_06_q1',
        question: 'Bagaimanakah bentuk kepemilikan dari "Rumahmu (laki-laki)" menggunakan dhomir muttashil?',
        options: [
          { text: 'بَيْتُكَ (Baytuka)', isCorrect: true, feedback: 'Tepat sekali! Akhiran -ka adalah kata ganti kepemilikan lawan bicara pria.' },
          { text: 'بَيْتُهُ (Baytuhu)', isCorrect: false, feedback: 'Baytuhu artinya rumahnya (dia pria).' },
          { text: 'بَيْتُكِ (Baytuki)', isCorrect: false, feedback: 'Baytuki artinya rumahmu untuk wanita.' }
        ]
      }
    ]
  },

  // =========================================================================
  // LEVEL 3: MUTAWASSITH 1 (B1) - Kalimat Fi'liyyah, Dual, Jamak & Sharaf
  // =========================================================================

  // QWD-L3-01: Kalimat Verbal: Fi'il Madhi & Fa'il (الجُمْلَةُ الفِعْلِيَّة: فِعْلٌ مَاضٍ + فَاعِل)
  'QWD-L3-01': {
    explanation: {
      conceptTitle: 'Arsitektur Kalimat Verbal: Fi\'il Madhi (Kerja Lampau) & Fa\'il (Pelaku)',
      overview: 'Jumlah Fi\'liyyah adalah kalimat yang dimulai dengan kata kerja (Fi\'il). Rukun wajibnya adalah Fi\'il itu sendiri dan Fa\'il (pelaku perbuatan). Fa\'il SELALU berstatus Marfu\' (dhommah pada isim mufrad).',
      rules: [
        {
          title: 'Posisi Baku: Fi\'il Selalu Mendahului Fa\'il',
          explanation: 'Rumus dasarnya adalah [Kata Kerja] + [Sang Pelaku Marfu\'].',
          exampleAr: 'قَرَأَ زَيْدٌ (Zaid telah membaca) | كَتَبَ الطَّالِبُ (Siswa itu telah menulis)',
          exampleTranslit: 'Qara-a Zaydun | Kataba ath-thaalibu',
          exampleId: 'Struktur dasar kalimat verbal'
        },
        {
          title: 'Kaidah Fi\'il di Awal Kalimat Tetap Berbentuk Tunggal',
          explanation: 'Meskipun pelakunya berbentuk jamak atau dual, kata kerja di awal kalimat TETAP dalam wujud mufrad tunggal.',
          exampleAr: 'حَضَرَ الرِّجَالُ (Bukan حضروا الرجال)',
          exampleTranslit: 'Hadhara ar-rijaalu',
          exampleId: 'Fi\'il awal kalimat selalu tunggal'
        },
        {
          title: 'Pemberian Ta Ta\'nits Sakinah (ـتْ) untuk Pelaku Wanita',
          explanation: 'Jika pelakunya feminin, tempelkan huruf ta sukun di ujung fi\'il madhi.',
          exampleAr: 'قَرَأَتْ فَاطِمَةُ (Fatimah telah membaca)',
          exampleTranslit: 'Qara-at Faathimatu',
          exampleId: 'Penyesuaian gender kata kerja lampau'
        }
      ],
      hudhudTips: 'Siapa yang melakukan perbuatan? Dialah Fa\'il! Harakat akhirnya wajib dhommah Marfu\'.'
    },
    highlightVocab: [
      { ar: 'جُمْلَةٌ فِعْلِيَّةٌ', translit: 'Jumlatun Fi\'liyyah', id: 'Kalimat verbal (diawali kata kerja)' },
      { ar: 'فِعْلٌ مَاضٍ', translit: 'Fi\'lun Maadhin', id: 'Kata kerja bentuk lampau' },
      { ar: 'فَاعِلٌ', translit: 'Faa\'ilun', id: 'Subjek pelaku perbuatan (Marfu\')' },
      { ar: 'تَاءُ التَّأْنِيثِ', translit: 'Taa\' at-Ta\'niits', id: 'Ta sukun penanda pelaku wanita (ـتْ)' }
    ],
    questions: [
      {
        id: 'qwd_l3_01_q1',
        question: 'Manakah bentuk fi\'il madhi yang tepat untuk subjek pelaku wanita: ".... عَائِشَةُ الرِّسَالَةَ"?',
        options: [
          { text: 'كَتَبَتْ (Katabat - dengan ta ta\'nits sakinah)', isCorrect: true, feedback: 'Mumtaz! Pelaku feminin mewajibkan ta ta\'nits sukun pada fi\'il madhi.' },
          { text: 'كَتَبَ (Kataba)', isCorrect: false, feedback: 'Kataba adalah bentuk untuk pelaku pria.' },
          { text: 'تَكْتُبُ (Taktubu)', isCorrect: false, feedback: 'Taktubu adalah bentuk fi\'il mudhari\' (sekarang), bukan madhi.' }
        ]
      }
    ]
  },

  // QWD-L3-02: Objek Kalimat Manshub: Maf'ul Bih (المَفْعُولُ بِهِ)
  'QWD-L3-02': {
    explanation: {
      conceptTitle: 'Sasaran Perbuatan: Objek Penderita Maf\'ul Bih Manshub bi-Fathah',
      overview: 'Maf\'ul Bih adalah isim yang menjadi sasaran perbuatan dari sang pelaku. Hukum i\'rabnya SELALU Manshub (berharakat Fathah pada isim mufrad).',
      rules: [
        {
          title: 'Rumus Kalimat Lengkap Transitif (Muta\'addi)',
          explanation: '[Fi\'il (Kerja)] + [Fa\'il (Pelaku Dhommah)] + [Maf\'ul Bih (Objek Fathah)].',
          exampleAr: 'شَرِبَ الوَلَدُ المَاءَ (Anak itu meminum air)',
          exampleTranslit: 'Syariba al-waladu al-maa-a',
          exampleId: 'Sintaksis objek kalimat lengkap'
        },
        {
          title: 'Kontras Harakat: Pelaku vs Objek',
          explanation: 'Pelaku berharakat dhommah (Al-Waladu), sedangkan benda yang dimakan/diminum/dibaca berharakat fathah (Al-Maa-a).',
          exampleAr: 'أَكَلَ الأَسَدُ الغَزَالَ (Singa itu memakan rusa)',
          exampleTranslit: 'Akala al-asadu al-ghazaala',
          exampleId: 'Perbedaan harakat pelaku dan sasaran'
        }
      ],
      hudhudTips: 'Tanyakan: "Apa yang dikerjakan / dibaca / dimakan?" Jawabannya adalah Maf\'ul Bih bertanda Fathah!'
    },
    highlightVocab: [
      { ar: 'مَفْعُولٌ بِهِ', translit: 'Maf\'uulun bihi', id: 'Objek penderita kalimat (Manshub)' },
      { ar: 'مَنْصُوبٌ', translit: 'Manshuubun', id: 'Keadaan akusatif (fathah)' },
      { ar: 'فَتْحَةٌ', translit: 'Fathatun', id: 'Tanda i\'rab asli maf\'ul bih' },
      { ar: 'شَرِبَ', translit: 'Syariba', id: 'Telah meminum (verba transitif)' }
    ],
    questions: [
      {
        id: 'qwd_l3_02_q1',
        question: 'Pada kalimat "قَرَأَ زَيْدٌ الكِتَابَ", manakah kata yang berkedudukan sebagai Maf\'ul Bih (Objek)?',
        options: [
          { text: 'الكِتَابَ (Al-Kitaaba - manshub dengan fathah)', isCorrect: true, feedback: 'Benar sekali! Al-Kitaaba adalah objek yang dibaca oleh Zaid.' },
          { text: 'زَيْدٌ (Zaydun)', isCorrect: false, feedback: 'Zaydun adalah Fa\'il (pelaku yang membaca).' },
          { text: 'قَرَأَ (Qara-a)', isCorrect: false, feedback: 'Qara-a adalah Fi\'il Madhi (kata kerja).' }
        ]
      }
    ]
  },

  // QWD-L3-03: Fi'il Mudhari' Marfu' & Huruf Mudhara'ah (الفِعْلُ المُضَارِعُ المَرْفُوع)
  'QWD-L3-03': {
    explanation: {
      conceptTitle: 'Kata Kerja Masa Kini & Mendatang: Fi\'il Mudhari\' Marfu\' bi-Dhommah',
      overview: 'Fi\'il Mudhari\' menunjukkan perbuatan yang sedang berlangsung (present) atau akan datang (future). Ciri khasnya SELALU diawali salah satu dari 4 huruf Mudhara\'ah (disingkat أَنَيْتُ / Anaytu: Alif, Nun, Ya, Ta) dan harakat aslinya berstatus Marfu\' dengan Dhommah.',
      rules: [
        {
          title: 'Empat Huruf Awalan Mudhara\'ah (أَنَيْتُ)',
          explanation: 'أَ- (saya / Ana: أَكْتُبُ), نَـ (kami / Nahnu: نَكْتُبُ), يَـ (dia L / Huwa: يَكْتُبُ), تَـ (kamu L atau dia P: تَكْتُبُ).',
          exampleAr: 'أَنَا أَذْهَبُ | نَحْنُ نَذْهَبُ | هُوَ يَذْهَبُ | هِيَ تَذْهَبُ',
          exampleTranslit: 'Ana adzhabu | Nahnu nadzhabu | Huwa yadzhabu | Hiya tadzhabu',
          exampleId: 'Konjugasi 4 awalan huruf mudhara\'ah'
        },
        {
          title: 'Tanda Rafa\' Asli: Dhommah di Akhir Kata',
          explanation: 'Selama tidak didahului partikel penashab atau penjuzuk, huruf terakhir fi\'il mudhari\' selalu berharakat dhommah.',
          exampleAr: 'يَسْمَعُ (Dia sedang mendengar) | يَنْصُرُ (Dia sedang menolong)',
          exampleTranslit: 'Yasma\'u | Yanshuru',
          exampleId: 'Harakat akhir dhommah'
        }
      ],
      hudhudTips: 'Hafalkan kata ajaib: أَنَيْتُ (A-Na-Y-Tu)! Setiap fi\'il mudhari\' pasti diawali salah satu dari 4 huruf ini.'
    },
    highlightVocab: [
      { ar: 'فِعْلٌ مُضَارِعٌ', translit: 'Fi\'lun Mudhaari\'un', id: 'Kata kerja masa kini/mendatang' },
      { ar: 'حُرُوفُ المُضَارَعَةِ', translit: 'Huruuf al-Mudhaara\'ah', id: 'Awalan Anaytu (أ - ن - ي - ت)' },
      { ar: 'يَكْتُبُ', translit: 'Yaktubu', id: 'Dia (L) sedang menulis' },
      { ar: 'نَذْهَبُ', translit: 'Nadzhabu', id: 'Kami sedang pergi' }
    ],
    questions: [
      {
        id: 'qwd_l3_03_q1',
        question: 'Manakah bentuk fi\'il mudhari\' yang bermakna "Kami sedang membaca"?',
        options: [
          { text: 'نَقْرَأُ (Naqra-u - dengan awalan huruf Nun)', isCorrect: true, feedback: 'Mumtaz! Awalan Nun (نَـ) mewakili dhomir Nahnu (kami/kita).' },
          { text: 'يَقْرَأُ (Yaqra-u)', isCorrect: false, feedback: 'Yaqra-u bermakna "dia laki-laki sedang membaca".' },
          { text: 'أَقْرَأُ (Aqra-u)', isCorrect: false, feedback: 'Aqra-u bermakna "saya sedang membaca".' }
        ]
      }
    ]
  },

  // QWD-L3-04: Bentuk Ganda / Mutsanna & I'rabnya (المُثَنَّى: رَفْعًا بِالأَلِف وَنَصْبًا/جَرًّا بِاليَاء)
  'QWD-L3-04': {
    explanation: {
      conceptTitle: 'Sistem Bilangan Ganda (Mutsanna): Rafa\' bi-Alif, Nashab & Jar bi-Ya',
      overview: 'Bahasa Arab memiliki bentuk khusus untuk bilangan dua (Dual / Mutsanna). Tanda i\'rabnya tidak lagi menggunakan harakat, melainkan huruf pengganti: Alif saat Rafa\', dan Ya bertanda sukun saat Nashab maupun Jar.',
      rules: [
        {
          title: 'Saat Rafa\' (Subjek/Pelaku): Tambahkan Akhiran -āni (ـَانِ)',
          explanation: 'Isim mufrad ditempel huruf Alif dan Nun berharakat kasrah.',
          exampleAr: 'كِتَابٌ ⟶ كِتَابَانِ (Dua buku) | جَاءَ الطَّالِبَانِ (Dua siswa telah datang)',
          exampleTranslit: 'Kitaabun -> Kitaabaani | Jaa-a ath-thaalibaani',
          exampleId: 'Tanda rafa\' mutsanna dengan alif'
        },
        {
          title: 'Saat Nashab & Jar (Objek/Preposisi): Tambahkan Akhiran -ayni (ـَيْنِ)',
          explanation: 'Menggunakan Ya sukun yang didahului fathah.',
          exampleAr: 'قَرَأْتُ كِتَابَيْنِ (Aku membaca dua buku) | فِي بَيْتَيْنِ (Di dalam dua rumah)',
          exampleTranslit: 'Qara-tu kitaabayni | Fii baytayni',
          exampleId: 'Tanda nashab/jar mutsanna dengan ya'
        }
      ],
      hudhudTips: 'Mutsanna punya rumus: Dua saat Rafa\' = -āni (Alif)! Dua saat kena kerja/jar = -ayni (Ya)!'
    },
    highlightVocab: [
      { ar: 'مُثَنَّى', translit: 'Mutsannaa', id: 'Bentuk bilangan dual (dua)' },
      { ar: 'ـَانِ', translit: '-aani', id: 'Akhiran rafa\' mutsanna (Alif & Nun)' },
      { ar: 'ـَيْنِ', translit: '-ayni', id: 'Akhiran nashab/jar mutsanna (Ya & Nun)' },
      { ar: 'كِتَابَانِ', translit: 'Kitaabaani', id: 'Dua buah buku (Rafa\')' }
    ],
    questions: [
      {
        id: 'qwd_l3_04_q1',
        question: 'Pilihlah bentuk kata yang tepat sebagai objek Maf\'ul Bih: "اشْتَرَيْتُ .... " (Aku telah membeli dua pena):',
        options: [
          { text: 'قَلَمَيْنِ (Qalamayni - berakhiran ya sukun nashab)', isCorrect: true, feedback: 'Shahih! Mutsanna dalam posisi objek penderita berakhiran -ayni.' },
          { text: 'قَلَمَانِ (Qalamaani)', isCorrect: false, feedback: 'Qalamaani berakhiran Alif, hanya untuk posisi rafa\' (subjek/pelaku).' }
        ]
      }
    ]
  },

  // QWD-L3-05: Jamak Mudzakkar & Muannats Salim (جَمْعُ المُذَكَّرِ وَالمُؤَنَّثِ السَّالِم)
  'QWD-L3-05': {
    explanation: {
      conceptTitle: 'Kaidah Jamak Teratur: Mudzakkar Salim (-ūna/-īna) & Muannats Salim (-ātun)',
      overview: 'Jamak Salim adalah jamak teratur yang akar kata tunggalnya tetap utuh (selamat). Jamak Mudzakkar Salim untuk pria berakal menggunakan akhiran -ūna (rafa\') atau -īna (nashab/jar). Jamak Muannats Salim untuk perempuan berakhiran Alif dan Ta (-ātun / -ātin).',
      rules: [
        {
          title: 'Jamak Mudzakkar Salim (Laki-laki Berakal)',
          explanation: 'Rafa\' dengan huruf Waw (-ūna), Nashab dan Jar dengan huruf Ya (-īna).',
          exampleAr: 'حَضَرَ المُعَلِّمُونَ (Para guru pria hadir) ⟷ رَأَيْتُ المُعَلِّمِينَ (Aku melihat para guru)',
          exampleTranslit: 'Hadhara al-mu\'allimuuna vs Ra-aytu al-mu\'allimiina',
          exampleId: 'I\'rab jamak mudzakkar salim'
        },
        {
          title: 'Jamak Muannats Salim (Perempuan)',
          explanation: 'Rafa\' dengan dhommah (-ātun), Nashab & Jar DENGAN KASRAH (-ātin). Jamak muannats salim TIDAK PERNAH menerima fathah!',
          exampleAr: 'جَاءَتِ المُعَلِّمَاتُ (Rafa\') ⟷ رَأَيْتُ المُعَلِّمَاتِ (Nashab dengan kasrah!)',
          exampleTranslit: 'Jaa-ati al-mu\'allimaatu vs Ra-aytu al-mu\'allimaati',
          exampleId: 'Keunikan kasrah pada nashab muannats salim'
        }
      ],
      hudhudTips: 'Awas jebakan Nahwu: Jamak Muannats Salim (Muslimaat) ANTI FATHAH! Saat jadi objek, ia dikasrahkan (-ātin).'
    },
    highlightVocab: [
      { ar: 'جَمْعُ مُذَكَّرٍ سَالِمٌ', translit: 'Jam\'u Mudzakkar Saalim', id: 'Jamak teratur pria (-uuna / -iina)' },
      { ar: 'جَمْعُ مُؤَنَّثٍ سَالِمٌ', translit: 'Jam\'u Mu-annats Saalim', id: 'Jamak teratur wanita (-aatun / -aatin)' },
      { ar: 'مُسْلِمُونَ', translit: 'Muslimuuna', id: 'Orang-orang muslim pria (Rafa\')' },
      { ar: 'مُسْلِمَاتٌ', translit: 'Muslimaatun', id: 'Wanita-wanita muslimah (Rafa\')' }
    ],
    questions: [
      {
        id: 'qwd_l3_05_q1',
        question: 'Apakah harakat akhir jamak muannats salim saat menempati posisi OBJEK (Maf\'ul Bih)?',
        options: [
          { text: 'Kasrah (-ātin / ـَاتِ), karena ia pantang menerima fathah', isCorrect: true, feedback: 'Mumtaz! Inilah keunikan jamak muannats salim: fathah digantikan kasrah.' },
          { text: 'Fathah (-ātan)', isCorrect: false, feedback: 'Keliru! Jamak muannats salim tidak pernah berakhiran fathah.' }
        ]
      }
    ]
  },

  // QWD-L3-06: Morfologi Sharaf: Wazan Tsulatsi Mujarrad (أَوْزَانُ الفِعْلِ الثُّلَاثِيّ المُجَرَّد)
  'QWD-L3-06': {
    explanation: {
      conceptTitle: 'Timbangan Morfologi Kata: 6 Pintu Wazan Tsulatsi Mujarrad (فَعَلَ - يَفْعُلُ)',
      overview: 'Ilmu Sharaf menimbang setiap kata kerja 3 huruf dasar (Tsulatsi Mujarrad) dengan cetakan timbangan baku ف-ع-ل (Fa\'-Ain-Lam). Perubahan harakat pada huruf tengah (\'Ain fi\'il) saat berpindah dari Madhi ke Mudhari\' membaginya ke dalam 6 bab utama.',
      rules: [
        {
          title: 'Tiga Bab Terpopuler',
          explanation: 'Bab 1: فَعَلَ - يَفْعُلُ (Fa\'ala - Yaf\'ulu, contoh: نَصَرَ - يَنْصُرُ). Bab 2: فَعَلَ - يَفْعِلُ (Fa\'ala - Yaf\'ilu, contoh: ضَرَبَ - يَضْرِبُ). Bab 3: فَعَلَ - يَفْعَلُ (Fa\'ala - Yaf\'alu, contoh: فَتَحَ - يَفْتَحُ).',
          exampleAr: 'كَتَبَ - يَكْتُبُ (Bab 1) | جَلَسَ - يَجْلِسُ (Bab 2) | قَرَأَ - يَقْرَأُ (Bab 3)',
          exampleTranslit: 'Kataba-Yaktubu | Jalasa-Yajlisu | Qara-a-Yaqra-u',
          exampleId: 'Tiga pola wazan dasar'
        },
        {
          title: 'Fa\' Fi\'il, \'Ain Fi\'il, dan Lam Fi\'il',
          explanation: 'Huruf ke-1 disebut Fa\' fi\'il, huruf ke-2 disebut \'Ain fi\'il, dan huruf ke-3 disebut Lam fi\'il.',
          exampleAr: 'ك (Fa\') - ت (\'Ain) - ب (Lam)',
          exampleTranslit: 'Ka - Ta - Ba',
          exampleId: 'Anatomi timbangan akar kata'
        }
      ],
      hudhudTips: 'Bait pembantu hafalan wazan: Fathu dhommin, fathu kasrin, fathataani; Kasru fathin, dhommu dhommin, kasrataani!'
    },
    highlightVocab: [
      { ar: 'وَزْنٌ', translit: 'Waznun', id: 'Timbangan / cetakan pola morfologi' },
      { ar: 'ثُلَاثِيٌّ مُجَرَّدٌ', translit: 'Tsulaatsiyyun Mujarradun', id: 'Kata kerja murni 3 huruf dasar' },
      { ar: 'فَعَلَ - يَفْعُلُ', translit: 'Fa\'ala - Yaf\'ulu', id: 'Bab 1 wazan sharaf (cth: Kataba-Yaktubu)' },
      { ar: 'عَيْنُ الفِعْلِ', translit: '\'Aynul Fi\'li', id: 'Huruf tengah penentu bab wazan' }
    ],
    questions: [
      {
        id: 'qwd_l3_06_q1',
        question: 'Kata kerja "كَتَبَ - يَكْتُبُ" mengikuti pola wazan sharaf yang mana?',
        options: [
          { text: 'فَعَلَ - يَفْعُلُ (Fa\'ala - Yaf\'ulu)', isCorrect: true, feedback: 'Tepat sekali! Huruf tengah Ta berfathah di madhi dan dhommah di mudhari\'.' },
          { text: 'فَعَلَ - يَفْعِلُ (Fa\'ala - Yaf\'ilu)', isCorrect: false, feedback: 'Itu adalah wazan Jalasa - Yajlisu.' }
        ]
      }
    ]
  },

  // =========================================================================
  // LEVEL 4: MUTAWASSITH 2 (B2) - Nawasikh, Adawat Nashab-Jazm, Fi'il Amr & Tashrif
  // =========================================================================

  // QWD-L4-01: Saudara Kaana & Pengaruh I'rab (كَانَ وَأَخَوَاتُهَا)
  'QWD-L4-01': {
    explanation: {
      conceptTitle: 'Perombak Kalimat Kaana & Saudaranya: Rafa\' Isim & Nashab Khabar',
      overview: 'Kaana wa akhawatuha adalah kelompok kata kerja perombak (Af\'al Naqishah) yang masuk ke kalimat Ismiyyah. Kehadirannya MEMPERTAHANKAN Rafa\' pada subjek (disebut Isim Kaana) dan MENASHABKAN Fathah pada predikat (disebut Khabar Kaana). Saudaranya meliputi: أَصْبَحَ (di waktu pagi), أَمْسَى (di waktu sore), صَارَ (menjadi), dan لَيْسَ (bukan/tidak).',
      rules: [
        {
          title: 'Rumus Kaana: Isim Marfu\' + Khabar Manshub',
          explanation: 'Sebelum Kaana: الجَوُّ بَارِدٌ (Keduanya marfu\'). Setelah Kaana masuk: كَانَ الجَوُّ بَارِدًا.',
          exampleAr: 'كَانَ الجَوُّ بَارِدًا (Dahulu cuaca dingin)',
          exampleTranslit: 'Kaana al-jawwu baaridan',
          exampleId: 'Pengaruh i\'rab kaana'
        },
        {
          title: 'Kata Kerja Laisa (لَيْسَ) untuk Penafian Nominal',
          explanation: 'Laisa menafikan kalimat dengan rumus yang sama persis.',
          exampleAr: 'لَيْسَ النَّجَاحُ سَهْلًا (Kesuksesan itu tidaklah mudah)',
          exampleTranslit: 'Laysa an-najaahu sahlan',
          exampleId: 'Penafian isim laisa'
        }
      ],
      hudhudTips: 'Rumus Kaana: Naik dulu (Rafa\'), baru Turun (Nashab)! Isimnya Dhommah, Khabarnya Fathah.'
    },
    highlightVocab: [
      { ar: 'كَانَ', translit: 'Kaana', id: 'Dahulu / adalah (fi\'il madhi naqish)' },
      { ar: 'لَيْسَ', translit: 'Laysa', id: 'Bukan / tidaklah (kata nafy)' },
      { ar: 'صَارَ', translit: 'Shaara', id: 'Menjadi / berubah status' },
      { ar: 'خَبَرُ كَانَ', translit: 'Khabaru Kaana', id: 'Predikat kaana yang manshub fathah' }
    ],
    questions: [
      {
        id: 'qwd_l4_01_q1',
        question: 'Bagaimanakah harakat kalimat setelah dimasuki "كَانَ": "كَانَ المَاءُ .... " (Air itu dahulu dingin)?',
        options: [
          { text: 'بَارِدًا (baaridan - manshub dengan fathatain)', isCorrect: true, feedback: 'Mumtaz! Khabar kaana selalu berstatus manshub.' },
          { text: 'بَارِدٌ (baaridun - dhommah)', isCorrect: false, feedback: 'Salah, dhommah adalah harakat sebelum dimasuki kaana.' }
        ]
      }
    ]
  },

  // QWD-L4-02: Saudara Inna & Pengaruh I'rab (إِنَّ وَأَخَوَاتُهَا)
  'QWD-L4-02': {
    explanation: {
      conceptTitle: 'Partikel Penegas Inna & Saudaranya: Nashab Isim & Rafa\' Khabar',
      overview: 'Inna wa akhawatuha adalah huruf taukid (penegas makna) perombak kalimat nominal. Kebalikan mutlak dari Kaana: Inna MENASHABKAN Fathah pada Isim Inna, dan MEMPERTAHANKAN Rafa\' Dhommah pada Khabar Inna. Saudaranya meliputi: أَنَّ (bahwasanya), كَأَنَّ (seakan-akan), لٰكِنَّ (tetapi), لَعَلَّ (semoga), dan لَيْتَ (andaikan).',
      rules: [
        {
          title: 'Rumus Inna: Isim Manshub + Khabar Marfu\'',
          explanation: 'Sebelum Inna: العِلْمُ نُورٌ. Setelah Inna masuk: إِنَّ العِلْمَ نُورٌ.',
          exampleAr: 'إِنَّ اللَّهَ غَفُورٌ رَحِيمٌ (Sesungguhnya Allah Maha Pengampun lagi Maha Penyayang)',
          exampleTranslit: 'Inna Allaaha ghafuurun rahiim',
          exampleId: 'Pengaruh i\'rab inna pada lafazh jalalah'
        },
        {
          title: 'Fungsi Semantik Saudaranya',
          explanation: 'كَأَنَّ untuk penyerupaan (tasybih), لَيْتَ untuk angan-angan mustahil (tamanni), لَعَلَّ untuk harapan optimis (tarajji).',
          exampleAr: 'لَعَلَّ الفَرَجَ قَرِيبٌ (Semoga kelapangan itu dekat)',
          exampleTranslit: 'La\'alla al-faraja qariibun',
          exampleId: 'Harapan optimis dengan la\'alla'
        }
      ],
      hudhudTips: 'Ingat cermin Kaana vs Inna: Kaana = Rafa\' lalu Nashab. Inna = Nashab dulu baru Rafa\'!'
    },
    highlightVocab: [
      { ar: 'إِنَّ', translit: 'Inna', id: 'Sesungguhnya (huruf taukid & nashab)' },
      { ar: 'لَعَلَّ', translit: 'La\'alla', id: 'Semoga / barangkali (tarajji)' },
      { ar: 'لَيْتَ', translit: 'Layta', id: 'Duhai sekiranya / andaikan (tamanni)' },
      { ar: 'اِسْمُ إِنَّ', translit: 'Ismu Inna', id: 'Subjek inna yang manshub fathah' }
    ],
    questions: [
      {
        id: 'qwd_l4_02_q1',
        question: 'Manakah susunan harakat yang BENAR saat dimasuki partikel "إِنَّ"?',
        options: [
          { text: 'إِنَّ الصَّبْرَ مِفْتَاحُ الفَرَجِ (Isim Inna fathah, Khabar Inna dhommah)', isCorrect: true, feedback: 'Tepat sekali! Inna menashabkan isim dan merafa\'kan khabar.' },
          { text: 'إِنَّ الصَّبْرُ مِفْتَاحَ الفَرَجِ', isCorrect: false, feedback: 'Terbalik, itu rumus kaana.' },
          { text: 'إِنَّ الصَّبْرَ مِفْتَاحَ الفَرَجِ', isCorrect: false, feedback: 'Khabar inna tidak manshub fathah.' }
        ]
      }
    ]
  },

  // QWD-L4-03: Huruf Penashab Fi'il Mudhari' (أَدَوَاتُ نَصْبِ المُضَارِع: أَنْ، لَنْ، كَيْ)
  'QWD-L4-03': {
    explanation: {
      conceptTitle: 'Partikel Penashab Fi\'il Mudhari\': An, Lan, Kay, & Idzan',
      overview: 'Fi\'il Mudhari\' yang asalnya Marfu\' dhommah akan berubah menjadi Manshub (berharakat Fathah pada fi\'il tunggal, atau membuang huruf Nun pada af\'alul khamsah) apabila dimasuki partikel penashab (Nawasibul Mudhari\').',
      rules: [
        {
          title: 'Partikel Lan (لَنْ): Penafian Masa Depan yang Tegas',
          explanation: 'Bermakna "tidak akan pernah". Merubah dhommah menjadi fathah.',
          exampleAr: 'لَنْ يَذْهَبَ (Dia tidak akan pergi) | لَنْ تَنَالُوا البِرَّ (Kalian tidak akan meraih kebajikan)',
          exampleTranslit: 'Lan yadzhab-a | Lan tanaaluu al-birra',
          exampleId: 'Pengaruh lan penashab'
        },
        {
          title: 'Partikel An (أَنْ) & Kay (كَيْ): Konjungtif & Tujuan',
          explanation: 'أَنْ berfungsi sebagai penghubung kata kerja ("untuk / bahwa"), كَيْ berfungsi menerangkan alasan ("agar / supaya").',
          exampleAr: 'أُرِيدُ أَنْ أَتَعَلَّمَ العَرَبِيَّةَ (Aku ingin mempelajari bahasa Arab)',
          exampleTranslit: 'Uriidu an ata\'allama al-\'arabiyyata',
          exampleId: 'Konjungtif an masydariyyah'
        }
      ],
      hudhudTips: 'Lihat kata "Lan" atau "An"? Jangan baca dhommah lagi di ujung kata kerjanya; segera bunyikan Fathah!'
    },
    highlightVocab: [
      { ar: 'أَدَوَاتُ النَّصْبِ', translit: 'Adawaatun Nashbi', id: 'Partikel-partikel pengubah fathah verba' },
      { ar: 'لَنْ', translit: 'Lan', id: 'Tidak akan pernah (penafian masa depan)' },
      { ar: 'أَنْ', translit: 'An', id: 'Bahwa / untuk (masydariyyah)' },
      { ar: 'كَيْ', translit: 'Kay', id: 'Supaya / agar (tujuan perbuatan)' }
    ],
    questions: [
      {
        id: 'qwd_l4_03_q1',
        question: 'Bagaimana harakat fi\'il mudhari\' setelah partikel "لَنْ": "لَنْ يَنْجَحَ .... "?',
        options: [
          { text: 'Berharakat Fathah (يَنْجَحَ), karena Lan menashabkan fi\'il mudhari\'', isCorrect: true, feedback: 'Mumtaz! Lan adalah huruf penashab mutlak.' },
          { text: 'Tetap Dhommah (يَنْجَحُ)', isCorrect: false, feedback: 'Dhommah gugur saat partikel nashab masuk.' },
          { text: 'Sukun (يَنْجَحْ)', isCorrect: false, feedback: 'Sukun adalah pengaruh partikel jazm, bukan nashab.' }
        ]
      }
    ]
  },

  // QWD-L4-04: Huruf Penjazm Fi'il Mudhari' (أَدَوَاتُ جَزْمِ المُضَارِع: لَمْ، لَامُ الأَمْر، لَا النَّاهِيَة)
  'QWD-L4-04': {
    explanation: {
      conceptTitle: 'Partikel Penjazm Fi\'il Mudhari\': Lam, La an-Nahiyah, & Lamul Amr',
      overview: 'Jazm adalah kondisi i\'rab khusus bagi kata kerja fi\'il mudhari\'. Ditandai dengan Sukun (ـْ) pada kata berakhiran huruf shahih, atau membuang huruf illah (vokal panjang) dan membuang huruf Nun.',
      rules: [
        {
          title: 'Partikel Lam (لَمْ): Belum / Tidak Pernah di Masa Lalu',
          explanation: 'Membalik makna masa kini ke masa lampau sekaligus mensukunkan kata kerja.',
          exampleAr: 'لَمْ يَلِدْ وَلَمْ يُولَدْ (Dia tidak beranak dan tidak diperanakkan)',
          exampleTranslit: 'Lam yalid wa lam yuulad',
          exampleId: 'Sukun jazm pada surat Al-Ikhlas'
        },
        {
          title: 'La an-Nahiyah (لَا النَّاهِيَةُ): Larangan "Jangan!"',
          explanation: 'Digunakan untuk melarang lawan bicara. Berbeda dengan La Nafiyah (hanya mengabarkan "tidak"), La Nahiyah menjazmkan kata kerja.',
          exampleAr: 'لَا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا (Janganlah bersedih, sesungguhnya Allah bersama kita)',
          exampleTranslit: 'Laa tahzan inna Allaaha ma\'anaa',
          exampleId: 'Jazm pada kalimat larangan'
        }
      ],
      hudhudTips: 'Jazm itu "memotong"! Memotong harakat menjadi Sukun mati, atau memotong huruf nun yang menempel.'
    },
    highlightVocab: [
      { ar: 'جَزْمٌ', translit: 'Jazmun', id: 'Keadaan jusif (sukun / buang huruf)' },
      { ar: 'لَمْ', translit: 'Lam', id: 'Tidak pernah / belum (nafy madhi)' },
      { ar: 'لَا النَّاهِيَةُ', translit: 'Laa an-Naahiyah', id: 'Huruf larangan "Janganlah!"' },
      { ar: 'سُكُونٌ', translit: 'Sukuunun', id: 'Tanda asli jazm fi\'il mudhari\'' }
    ],
    questions: [
      {
        id: 'qwd_l4_04_q1',
        question: 'Apakah tanda jazm asli pada fi\'il mudhari\' shahih akhir setelah dimasuki "لَمْ"?',
        options: [
          { text: 'Sukun (ـْ) seperti pada kalimat: لَمْ يَكْتُبْ', isCorrect: true, feedback: 'Tepat sekali! Sukun adalah tanda asli keadaan jazm.' },
          { text: 'Fathah (ـَ)', isCorrect: false, feedback: 'Fathah adalah tanda nashab.' },
          { text: 'Kasrah (ـِ)', isCorrect: false, feedback: 'Fi\'il sama sekali tidak pernah menerima kasrah.' }
        ]
      }
    ]
  },

  // QWD-L4-05: Kata Kerja Perintah: Fi'il Amr (فِعْلُ الأَمْرِ وَبِنَاؤُهُ)
  'QWD-L4-05': {
    explanation: {
      conceptTitle: 'Instruksi Mandat: Pembentukan & Mabni Fi\'il Amr (Kata Kerja Perintah)',
      overview: 'Fi\'il Amr adalah bentuk kata kerja yang digunakan untuk memerintah atau memohon perbuatan kepada orang kedua (lawan bicara). Fi\'il Amr berstatus Mabni (tidak berubah status i\'rabnya), dibangun di atas sukun untuk kata tunggal maskulin.',
      rules: [
        {
          title: 'Cara Menurunkan Fi\'il Amr dari Fi\'il Mudhari\'',
          explanation: 'Ambil fi\'il mudhari\' (cth: تَكْتُبُ), buang awalan Ta, sukunkan huruf akhir, dan tambahkan hamzah washal berharakat dhommah jika huruf ke-2 dhommah: اُكْتُبْ (Uktub!).',
          exampleAr: 'تَكْتُبُ ⟶ اُكْتُبْ (Tulislah!) | تَقْرَأُ ⟶ اِقْرَأْ (Bacalah!) | تَجْلِسُ ⟶ اِجْلِسْ (Duduklah!)',
          exampleTranslit: 'Uktub! | Iqra\'! | Ijlis!',
          exampleId: 'Rumus pembentukan fi\'il amr'
        },
        {
          title: 'Perintah untuk Perempuan (Muannats) & Jamak',
          explanation: 'Tambahkan Ya mukhathabah untuk perempuan (اُكْتُبِي / Uktubii), dan Waw jama\'ah untuk pria banyak (اُكْتُبُوا / Uktubuu).',
          exampleAr: 'يَا فَاطِمَةُ، اِقْرَئِي! | يَا طُلَّابُ، اِجْلِسُوا!',
          exampleTranslit: 'Yaa Faathimatu, iqra-ii! | Yaa thullaabu, ijlisuu!',
          exampleId: 'Konjugasi perintah gender & kuantitas'
        }
      ],
      hudhudTips: 'Lihat huruf tengah mudhari\'-nya! Jika tengahnya dhommah (Yaktubu), hamzah amr-nya berbunyi "U-" (Uktub). Jika fathah/kasrah, berbunyi "I-" (Iqra\', Ijlis).'
    },
    highlightVocab: [
      { ar: 'فِعْلُ أَمْرٍ', translit: 'Fi\'lu Amrin', id: 'Kata kerja perintah imperatif' },
      { ar: 'مَبْنِيٌّ عَلَى السُّكُونِ', translit: 'Mabniyyun \'ala as-Sukuun', id: 'Kaidah paten di atas tanda sukun' },
      { ar: 'اِقْرَأْ', translit: 'Iqra\'', id: 'Bacalah! (Perintah wahyu pertama)' },
      { ar: 'اُسْجُدْ', translit: 'Usjud', id: 'Bersujudlah!' }
    ],
    questions: [
      {
        id: 'qwd_l4_05_q1',
        question: 'Bagaimanakah bentuk fi\'il amr dari "تَجْلِسُ" (kamu duduk) untuk memerintah seorang laki-laki?',
        options: [
          { text: 'اِجْلِسْ (Ijlis - dengan hamzah washal kasrah dan sukun di akhir)', isCorrect: true, feedback: 'Mumtaz! Karena huruf tengah mudhari\'-nya kasrah (Yajlisu), amr-nya diawali kasrah.' },
          { text: 'اُجْلِسْ (Ujlis)', isCorrect: false, feedback: 'Keliru, awalan U- hanya jika huruf tengahnya dhommah.' }
        ]
      }
    ]
  },

  // QWD-L4-06: Tashrif Lughawi 14 Dhomir (التَّصْرِيفُ اللُّغَوِيُّ لِلْأَفْعَال)
  'QWD-L4-06': {
    explanation: {
      conceptTitle: 'Matriks Konjugasi Lengkap: Tashrif Lughawi 14 Dhomir (Huwa s/d Nahnu)',
      overview: 'Tashrif Lughawi adalah seni konjugasi kata kerja yang melacak perubahan akhiran dan awalan fi\'il untuk seluruh 14 kata ganti orang dalam bahasa Arab, mulai dari pihak ketiga (Gha\'ib), pihak kedua (Mukhathab), hingga pihak pertama (Mutakallim).',
      rules: [
        {
          title: 'Tabel Pihak Ketiga (Gaib): Huwa, Huma, Hum; Hiya, Huma, Hunna',
          explanation: 'فَعَلَ (Huwa), فَعَلَا (Huma L), فَعَلُوا (Hum), فَعَلَتْ (Hiya), فَعَلَتَا (Huma P), فَعَلْنَ (Hunna).',
          exampleAr: 'ذَهَبَ، ذَهَبَا، ذَهَبُوا، ذَهَبَتْ، ذَهَبَتَا، ذَهَبْنَ',
          exampleTranslit: 'Dzahaba, Dzahabaa, Dzahabuu, Dzahabat, Dzahabataa, Dzahabna',
          exampleId: 'Konjugasi fi\'il madhi 6 dhomir gaib'
        },
        {
          title: 'Tabel Pihak Kedua & Pertama: Anta s/d Nahnu',
          explanation: 'فَعَلْتَ (Anta), فَعَلْتُمَا (Antuma), فَعَلْتُمْ (Antum), فَعَلْتِ (Anti), فَعَلْتُمَا (Antuma P), فَعَلْتُنَّ (Antunna), فَعَلْتُ (Ana), فَعَلْنَا (Nahnu).',
          exampleAr: 'كَتَبْتَ (kamu L), كَتَبْتِ (kamu P), كَتَبْتُ (saya), كَتَبْنَا (kami)',
          exampleTranslit: 'Katabta, Katabti, Katabtu, Katabnaa',
          exampleId: 'Akhiran dhomir fa\'il muttashil'
        }
      ],
      hudhudTips: 'Bedakan "Tu" dan "Na": KatabTU = Saya telah menulis (1 orang). KatabNA = Kami telah menulis (panjang = banyak orang)!'
    },
    highlightVocab: [
      { ar: 'تَصْرِيفٌ لُغَوِيٌّ', translit: 'Tashriif Lughawiy', id: 'Konjugasi kata kerja lintas 14 pronomina' },
      { ar: 'غَائِبٌ', translit: 'Ghaa-ibun', id: 'Orang ketiga yang dibicarakan' },
      { ar: 'مُخَاطَبٌ', translit: 'Mukhaathabun', id: 'Orang kedua mitra tutur' },
      { ar: 'مُتَكَلِّمٌ', translit: 'Mutakallimun', id: 'Orang pertama pembicara (Ana/Nahnu)' }
    ],
    questions: [
      {
        id: 'qwd_l4_06_q1',
        question: 'Manakah bentuk fi\'il madhi yang bermakna "KAMI TELAH KELUAR"?',
        options: [
          { text: 'خَرَجْنَا (Kharajnaa - dengan akhiran nun dan alif panjang)', isCorrect: true, feedback: 'Shahih! Akhiran -naa mewakili kata ganti Nahnu (kami).' },
          { text: 'خَرَجْتُ (Kharajtu)', isCorrect: false, feedback: 'Kharajtu bermakna "Saya telah keluar".' },
          { text: 'خَرَجُوا (Kharajuu)', isCorrect: false, feedback: 'Kharajuu bermakna "Mereka laki-laki telah keluar".' }
        ]
      }
    ]
  },

  // =========================================================================
  // LEVEL 5: MUTAQADDIM (C1-C2) - I'rab Lanjut, Mamnu', Musytaqqat & Tawabi'
  // =========================================================================

  // QWD-L5-01: Tanda I'rab Pokok & Cabang Pengganti (عَلَامَاتُ الإِعْرَابِ الأَصْلِيَّةُ وَالفَرْعِيَّة)
  'QWD-L5-01': {
    explanation: {
      conceptTitle: 'Peta Komprehensif I\'rab: Tanda Pokok (Ashliyyah) vs Cabang Pengganti (Far\'iyyah)',
      overview: 'Puncak kemahiran Nahwu terletak pada penguasaan 4 status i\'rab (Rafa\', Nashab, Jar, Jazm) beserta tanda pokoknya (Dhommah, Fathah, Kasrah, Sukun) dan tanda cabang penggantinya (Waw, Alif, Ya, Tsubutun Nun, Hadzfun Nun, Hadzfu Harfil \'Illah).',
      rules: [
        {
          title: 'Cabang Pengganti Rafa\' (Waw & Alif)',
          explanation: 'Waw menggantikan dhommah pada Jamak Mudzakkar Salim & Asma\'ul Khamsah (أَبُوكَ، أَخُوكَ). Alif menggantikan dhommah pada Mutsanna.',
          exampleAr: 'جَاءَ أَبُوكَ (Asma\'ul Khamsah rafa\' bi-Waw) | قَامَ الرَّجُلَانِ (Mutsanna rafa\' bi-Alif)',
          exampleTranslit: 'Jaa-a abuuka | Qaama ar-rajulaani',
          exampleId: 'Tanda cabang rafa\''
        },
        {
          title: 'Cabang Pengganti Nashab (Alif, Kasrah, & Ya)',
          explanation: 'Alif pada Asma\'ul Khamsah (رَأَيْتُ أَبَاكَ), Kasrah pada Jamak Muannats Salim (خَلَقَ السَّمَاوَاتِ), Ya pada Mutsanna dan Jamak Mudzakkar Salim.',
          exampleAr: 'خَلَقَ اللَّهُ السَّمَاوَاتِ (Nashab dengan kasrah)',
          exampleTranslit: 'Khalaqa Allaahu as-samaawaati',
          exampleId: 'Tanda cabang nashab'
        }
      ],
      hudhudTips: 'Asma\'ul Khamsah punya urutan vokal legendaris: Abuuka (Rafa\'), Abaaka (Nashab), Abiika (Jar)!'
    },
    highlightVocab: [
      { ar: 'إِعْرَابٌ', translit: 'I\'raabun', id: 'Perubahan ujung kata sesuai kedudukan sintaksis' },
      { ar: 'عَلَامَةٌ أَصْلِيَّةٌ', translit: '\'Alaamatun Ashliyyah', id: 'Tanda pokok (harakat dhommah/fathah/kasrah/sukun)' },
      { ar: 'عَلَامَةٌ فَرْعِيَّةٌ', translit: '\'Alaamatun Far\'iyyah', id: 'Tanda cabang huruf pengganti (waw/alif/ya/nun)' },
      { ar: 'الأَسْمَاءُ الخَمْسَةُ', translit: 'Al-Asmaa\'ul Khamsah', id: 'Lima isim istimewa (Abun, Akhun, Hamun, Fuu, Dzuu)' }
    ],
    questions: [
      {
        id: 'qwd_l5_01_q1',
        question: 'Apakah tanda i\'rab kata "أَبَاكَ" dalam kalimat "رَأَيْتُ أَبَاكَ" (Aku melihat ayahmu)?',
        options: [
          { text: 'Manshub dengan huruf Alif (tanda cabang pengganti fathah pada Asma\'ul Khamsah)', isCorrect: true, feedback: 'Mumtaz! Asma\'ul Khamsah dinashabkan dengan Alif.' },
          { text: 'Marfu\' dengan dhommah', isCorrect: false, feedback: 'Keliru, posisinya adalah maf\'ul bih objek penderita.' }
        ]
      }
    ]
  },

  // QWD-L5-02: Isim Terlarang Bertanwin: Mamnu' min ash-Sharf (المَمْنُوعُ مِنَ الصَّرْف)
  'QWD-L5-02': {
    explanation: {
      conceptTitle: 'Nomina Diptot: Kaidah Isim Terlarang Bertanwin (Al-Mamnu\' min ash-Sharf)',
      overview: 'Sebagian isim dalam bahasa Arab dilarang menerima Tanwin dan apabila berada dalam kondisi Jar (kasrah), harakatnya DIGANTIKAN DENGAN FATHAH. Hal ini terjadi karena adanya illat (sebab gramatikal) tertentu seperti pola jamak muntahal jumu\' (مَسَاجِدُ), nama non-Arab (\'Ajam: إِبْرَاهِيمُ), atau nama berwazan fi\'il (أَحْمَدُ).',
      rules: [
        {
          title: 'Dua Ciri Mutlak Mamnu\' min ash-Sharf',
          explanation: '1) Pantang menerima tanwin (selalu harakat tunggal). 2) Saat Majrur (kena huruf jar), harakatnya berbunyi Fathah.',
          exampleAr: 'صَلَّيْتُ فِي مَسَاجِدَ كَثِيرَةٍ (Bukan masajidi, bukan masajidin)',
          exampleTranslit: 'Shallaytu fii masaajida katsiirah',
          exampleId: 'Jar dengan fathah pada shighat muntahal jumu\''
        },
        {
          title: 'Kondisi Pengecualian: Kembali Menerima Kasrah Asli',
          explanation: 'Jika kata tersebut dimasuki Alif Lam (الـ) atau menjadi Mudhaf, hukum fathahnya batal dan kembali berkasrah normal.',
          exampleAr: 'صَلَّيْتُ فِي المَسَاجِدِ (Kembali berkasrah karena ber-Al)',
          exampleTranslit: 'Shallaytu fii al-masaajidi',
          exampleId: 'Batalnya mamnu\' karena Alif Lam'
        }
      ],
      hudhudTips: 'Kecuali punya Alif Lam atau jadi Mudhaf, kata Mamnu\' min ash-Sharf akan menolak kasrah dan memilih berharakat fathah saat majrur!'
    },
    highlightVocab: [
      { ar: 'مَمْنُوعٌ مِنَ الصَّرْفِ', translit: 'Mamnuu\'un minash Sharf', id: 'Kata terlarang bertanwin dan jar-nya berfathah' },
      { ar: 'مَسَاجِدُ', translit: 'Masaajidu', id: 'Masjid-masjid (shighat muntahal jumu\')' },
      { ar: 'إِبْرَاهِيمُ', translit: 'Ibraahiimu', id: 'Nama \'Ajam non-Arab terlarang tanwin' },
      { ar: 'عِلَّةٌ', translit: '\'Illatun', id: 'Alasan gramatikal penyebab pelarangan' }
    ],
    questions: [
      {
        id: 'qwd_l5_02_q1',
        question: 'Bagaimanakah membaca kalimat "سَافَرْتُ إِلَى مَكَّةَ" yang benar?',
        options: [
          { text: 'Makkata (berfathah tanpa tanwin karena nama tempat muannats mamnu\' minash sharf)', isCorrect: true, feedback: 'Shahih! Makkah adalah mamnu\' minash sharf, dijarkan dengan fathah tanpa tanwin.' },
          { text: 'Makkatin (kasratain bertanwin)', isCorrect: false, feedback: 'Keliru, kata ini terlarang bertanwin.' }
        ]
      }
    ]
  },

  // QWD-L5-03: Isim Musytaq: Isim Fa'il & Isim Maf'ul (مُشْتَقَّاتُ الأَسْمَاء: الفَاعِل وَالمَفْعُول)
  'QWD-L5-03': {
    explanation: {
      conceptTitle: 'Derivasi Morfologi: Isim Fa\'il (Pelaku) & Isim Maf\'ul (Objek Penderita)',
      overview: 'Isim Fa\'il adalah kata benda turunan yang menunjukkan pelaku perbuatan (Partisipel Aktif), sedangkan Isim Maf\'ul menunjukkan sesuatu yang dikenai perbuatan (Partisipel Pasif). Pola keduanya diturunkan dari akar kata kerja 3 huruf maupun kata kerja bermbuhan (Mazid).',
      rules: [
        {
          title: 'Wazan dari Fi\'il 3 Huruf (Tsulatsi Mujarrad)',
          explanation: 'Isim Fa\'il berwazan فَاعِلٌ (Faa\'ilun): كَتَبَ ⟶ كَاتِبٌ (Penulis). Isim Maf\'ul berwazan مَفْعُولٌ (Maf\'uulun): كَتَبَ ⟶ مَكْتُوبٌ (Tertulis / Surat).',
          exampleAr: 'قَتَلَ ⟶ قَاتِلٌ (Pembunuh) & مَقْتُولٌ (Korban terbunuh)',
          exampleTranslit: 'Qatala -> Qaatilun & Maqtuulun',
          exampleId: 'Derivasi wazan fa\'il dan maf\'ul'
        },
        {
          title: 'Wazan dari Fi\'il Lebih dari 3 Huruf (Mazid)',
          explanation: 'Ambil mudhari\'-nya, ganti huruf mudhara\'ah dengan Mim berharakat dhommah (مُـ). Huruf sebelum akhir dikasrahkan untuk Fa\'il (مُعَلِّمٌ / Mu\'allim) dan difathahkan untuk Maf\'ul (مُعَلَّمٌ / Mu\'allam).',
          exampleAr: 'أَرْسَلَ ⟶ مُرْسِلٌ (Pengirim) & مُرْسَلٌ (Utusan yang dikirim)',
          exampleTranslit: 'Arsala -> Mursilun & Mursalun',
          exampleId: 'Aturan mim dhommah pada fi\'il mazid'
        }
      ],
      hudhudTips: 'Rumus Kilat Mazid: Kasrah sebelum akhir = Pelaku aktif (Mu\'allim). Fathah sebelum akhir = Objek pasif (Mu\'allam)!'
    },
    highlightVocab: [
      { ar: 'اِسْمُ فَاعِلٍ', translit: 'Ismu Faa\'ilin', id: 'Nomina pelaku perbuatan (partisipel aktif)' },
      { ar: 'اِسْمُ مَفْعُولٍ', translit: 'Ismu Maf\'uulin', id: 'Nomina objek penderita (partisipel pasif)' },
      { ar: 'كَاتِبٌ', translit: 'Kaatibun', id: 'Penulis (wazan Faa\'il)' },
      { ar: 'مَكْتُوبٌ', translit: 'Maktuubun', id: 'Tertulis / surat takdir (wazan Maf\'uul)' }
    ],
    questions: [
      {
        id: 'qwd_l5_03_q1',
        question: 'Apakah wujud Isim Fa\'il (pelaku) dari kata kerja 3 huruf "نَصَرَ" (menolong)?',
        options: [
          { text: 'نَاصِرٌ (Naashirun - yang menolong)', isCorrect: true, feedback: 'Mumtaz! Mengikuti cetakan wazan Faa\'ilun (فَاعِلٌ).' },
          { text: 'مَنْصُورٌ (Manshuurun)', isCorrect: false, feedback: 'Manshuurun adalah Isim Maf\'ul (yang ditolong).' }
        ]
      }
    ]
  },

  // QWD-L5-04: Isim Musytaq: Isim Makan, Zaman, & Alat (أَسْمَاءُ المَكَانِ وَالزَّمَانِ وَالآلَة)
  'QWD-L5-04': {
    explanation: {
      conceptTitle: 'Derivasi Instrumental & Lokatif: Isim Makan, Isim Zaman, & Isim Alat',
      overview: 'Morfologi Arab mampu menciptakan nama tempat (Makan), nama waktu (Zaman), dan nama perkakas (Alat) dari satu akar kata kerja yang sama melalui cetakan wazan terukur.',
      rules: [
        {
          title: 'Wazan Isim Makan & Zaman: Maf\'al (مَفْعَل) & Maf\'il (مَفْعِل)',
          explanation: 'مَفْعَلٌ untuk kata yang mudhari\'-nya fathah/dhommah: كَتَبَ-يَكْتُبُ ⟶ مَكْتَبٌ (Meja/Kantor). مَفْعِلٌ jika mudhari\'-nya kasrah: سَجَدَ-يَسْجُدُ ⟶ مَسْجِدٌ (Masjid/Tempat sujud).',
          exampleAr: 'لَعِبَ ⟶ مَلْعَبٌ (Stadion/lapangan bermain) | طَبَخَ ⟶ مَطْبَخٌ (Dapur)',
          exampleTranslit: 'La\'iba -> Mal\'abun | Thabakha -> Mathbakhun',
          exampleId: 'Wazan nama tempat'
        },
        {
          title: 'Wazan Isim Alat (Instrumen/Perkakas): Mif\'al, Mif\'alah, Mif\'aal',
          explanation: 'مِفْعَلٌ (cth: مِبْرَدٌ / kikir pengasah), مِفْعَلَةٌ (cth: مِلْعَقَةٌ / sendok), مِفْعَالٌ (cth: مِفْتَاحٌ / kunci pembuka).',
          exampleAr: 'فَتَحَ ⟶ مِفْتَاحٌ (Alat pembuka / Kunci) | قَادَ ⟶ مِقْوَدٌ (Setir kemudi)',
          exampleTranslit: 'Fataha -> Miftaahun | Qaada -> Miqwadun',
          exampleId: 'Wazan nama perkakas'
        }
      ],
      hudhudTips: 'Nama tempat biasanya diawali "Ma-" (Maktab, Mathbakh). Nama perkakas instrumen biasanya diawali "Mi-" (Miftaah, Mil\'aqah)!'
    },
    highlightVocab: [
      { ar: 'اِسْمُ مَكَانٍ', translit: 'Ismu Makaanin', id: 'Nomina penunjuk tempat aktivitas' },
      { ar: 'اِسْمُ آلَةٍ', translit: 'Ismu Aalatin', id: 'Nomina penunjuk perkakas / instrumen' },
      { ar: 'مَكْتَبٌ', translit: 'Maktabun', id: 'Meja tulis / kantor (wazan Maf\'al)' },
      { ar: 'مِفْتَاحٌ', translit: 'Miftaahun', id: 'Kunci pembuka (wazan Mif\'aal)' }
    ],
    questions: [
      {
        id: 'qwd_l5_04_q1',
        question: 'Kata "مَلْعَبٌ" (lapangan olahraga) yang berasal dari kata "لَعِبَ" (bermain) adalah contoh dari:',
        options: [
          { text: 'Isim Makan (nama tempat berlangsungnya perbuatan bermain)', isCorrect: true, feedback: 'Tepat sekali! Mengikuti wazan Maf\'al (مَفْعَلٌ).' },
          { text: 'Isim Alat', isCorrect: false, feedback: 'Bukan, isim alat umumnya berawalan kasrah Mi-.' }
        ]
      }
    ]
  },

  // QWD-L5-05: Aturan Pengikut I'rab: At-Tawabi' (التَّوَابِع: النَّعْت، العَطْف، التَّوْكِيد، البَدَل)
  'QWD-L5-05': {
    explanation: {
      conceptTitle: 'Kaidah Konvoi Sintaksis: Empat Pengikut I\'rab (At-Tawabi\')',
      overview: 'At-Tawabi\' adalah kelompok kata yang tidak memiliki harakat i\'rab mandiri; statusnya sepenuhnya tunduk mengekor (mengikuti) kata sebelumnya (Al-Matbu\'). Empat pengikut tersebut adalah: Na\'at (Kata Sifat), \'Athaf (Kata Sambung), Taukid (Penegas), dan Badal (Pengganti).',
      rules: [
        {
          title: '1. An-Na\'at (Kata Sifat): Mengikuti dalam 4 Hal',
          explanation: 'Mengikuti matbu\'-nya dalam: I\'rab (Rafa\'/Nashab/Jar), Gender (Mudzakkar/Muannats), Kuantitas (Mufrad/Mutsanna/Jamak), dan Ketertentuan (Ma\'rifah/Nakirah).',
          exampleAr: 'جَاءَ الرَّجُلُ الكَرِيمُ | رَأَيْتُ رَجُلًا كَرِيمًا | مَرَرْتُ بِرَجُلٍ كَرِيمٍ',
          exampleTranslit: 'Ar-rajulu al-kariimu | Rajulan kariiman | Bi-rajulin kariimin',
          exampleId: 'Sifat mengikuti 3 kondisi i\'rab'
        },
        {
          title: '2. Al-\'Athaf & 3. Al-Badal',
          explanation: '\'Athaf menggunakan huruf sambung seperti Waw (وَ) dan Fa (فَـ). Badal adalah pengganti penjelasan inti.',
          exampleAr: 'قَرَأَ عَلِيٌّ وَحَسَنٌ (\'Athaf) | جَاءَ الخَلِيفَةُ عُمَرُ (Badal: Umar adalah Khalifah itu sendiri)',
          exampleTranslit: '\'Aliyyun wa Hasanun | Al-khaliifatu \'Umaru',
          exampleId: 'Contoh athaf dan badal'
        }
      ],
      hudhudTips: 'Tawabi\' ibarat bayangan cermin: Ke mana pun kata utama melangkah (dhommah/fathah/kasrah), ia pasti meniru harakatnya persis!'
    },
    highlightVocab: [
      { ar: 'تَوَابِعُ', translit: 'Tawaabi\'u', id: 'Kata-kata pengikut i\'rab kata sebelumnya' },
      { ar: 'نَعْتٌ', translit: 'Na\'tun', id: 'Kata sifat penjelas yang mengekor penuh' },
      { ar: 'عَطْفٌ', translit: '\'Athfun', id: 'Penyambungan kata dengan partikel waw/fa' },
      { ar: 'بَدَلٌ', translit: 'Badalun', id: 'Kata pengganti penjelas identitas subjek' }
    ],
    questions: [
      {
        id: 'qwd_l5_05_q1',
        question: 'Pada kalimat "قَرَأْتُ الكِتَابَ .... " (Aku telah membaca buku yang bermanfaat), bagaimanakah harakat sifat kata "Mufiid"?',
        options: [
          { text: 'المُفِيدَ (berharakat Fathah karena mengikuti Al-Kitaaba yang manshub)', isCorrect: true, feedback: 'Mumtaz! Na\'at tunduk 100% pada harakat objek yang disifatinya.' },
          { text: 'المُفِيدُ (dhommah)', isCorrect: false, feedback: 'Salah, objeknya berharakat fathah, maka sifatnya wajib fathah.' }
        ]
      }
    ]
  },

  // QWD-L5-06: Analisis I'rab Aplikatif Teks Klasik (الإِعْرَابُ التَّطْبِيقِيُّ فِي النُّصُوصِ الفَصِيحَة)
  'QWD-L5-06': {
    explanation: {
      conceptTitle: 'Klimaks Ilmu Nahwu: Analisis I\'rab Aplikatif Kalimat Klasik & Ayat Al-Qur\'an',
      overview: 'Puncak dari seluruh pendakian Gunung Qawa\'id adalah kemampuan membedah dan menguraikan fungsi gramatikal setiap kata dalam teks Arab gundul secara fasih, runtut, dan penuh pertanggungjawaban kaidah.',
      rules: [
        {
          title: 'Format Baku Penguraian I\'rab',
          explanation: 'Sebutkan 3 unsur: 1) Kedudukan kata (Mubtada\'/Fa\'il/Maf\'ul), 2) Status hukum (Marfu\'/Manshub/Majrur), 3) Tanda penentunya (bi-dhommah azh-zhaahirah, dll).',
          exampleAr: 'قَالَ اللَّهُ: قَالَ = فِعْلٌ مَاضٍ مَبْنِيٌّ عَلَى الفَتْحِ. اللَّهُ = اسْمُ الجَلَالَةِ فَاعِلٌ مَرْفُوعٌ بِالضَّمَّةِ الظَّاهِرَةِ',
          exampleTranslit: 'Qaala Allaahu: Qaala fi\'lun maadhin, Allaahu faa\'ilun marfuu\'un bi-dhommah',
          exampleId: 'Penguraian i\'rab baku'
        },
        {
          title: 'Bedah Frasa Majemuk Idhafah & Jar',
          explanation: 'Mampu menganalisis kalimat panjang berlapis dengan tenang dan sistematis.',
          exampleAr: 'بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ: الباء حرف جر، اسم مجرور، الله مضاف إليه مجرور، الرحمن نعت مجرور',
          exampleTranslit: 'I\'rab lengkap basmalah',
          exampleId: 'Analisis sintaksis basmalah'
        }
      ],
      hudhudTips: 'Kunci analisis I\'rab: Temukan dulu Kata Kerjanya (Fi\'il) atau Subjeknya (Mubtada\'), lalu cari pelakunya, baru periksa ekor kalimatnya!'
    },
    highlightVocab: [
      { ar: 'إِعْرَابٌ تَطْبِيقِيٌّ', translit: 'I\'raab Tathbiiqiy', id: 'Analisis bedah kaidah terapan pada teks asli' },
      { ar: 'ضَمَّةٌ ظَاهِرَةٌ', translit: 'Dhommah Zhaahirah', id: 'Dhommah tampak jelas di akhir huruf shahih' },
      { ar: 'مَبْنِيٌّ', translit: 'Mabniyyun', id: 'Bentuk kata yang kebal dari perubahan harakat' },
      { ar: 'مَحَلُّ الإِعْرَابِ', translit: 'Mahallul I\'raab', id: 'Posisi kedudukan kalimat' }
    ],
    questions: [
      {
        id: 'qwd_l5_06_q1',
        question: 'Dalam kalimat "نَصَرَ زَيْدٌ عَمْرًا", apakah kedudukan kata "عَمْرًا" (Amran)?',
        options: [
          { text: 'Maf\'ul Bih Manshub dengan Fathah Zhaahirah (Objek penderita yang ditolong)', isCorrect: true, feedback: 'Mumtaz! Zaid adalah penolong (Fa\'il), dan Amr adalah yang ditolong (Maf\'ul Bih).' },
          { text: 'Fa\'il Marfu\'', isCorrect: false, feedback: 'Pelaku penolongnya adalah Zaid.' }
        ]
      }
    ]
  }
};
