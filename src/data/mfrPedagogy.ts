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

export const MFR_DEDICATED_PEDAGOGY: Record<string, EnrichedSkillPedagogy> = {
  // =========================================================================
  // LEVEL 0: TAMHIDI (Pra-A1) - Fondasi Konkrit & Lingkungan Terdekat
  // =========================================================================

  // MFR-L0-01: Angka Satuan 1–10 (الأَرْقَامُ الأَسَاسِيَّة)
  'MFR-L0-01': {
    explanation: {
      conceptTitle: 'Angka Satuan 1 sampai 10 di Pasar Mufradat',
      overview: 'Di Pasar Apung, angka adalah kunci transaksi perahu! Mulai dari satu keping dinar hingga sepuluh butir kurma manis, kuasai sebutan angka Arab 1–10 dengan pelafalan fasih penutur asli.',
      rules: [
        {
          title: 'Angka 1 (وَاحِد) dan 2 (اِثْنَان)',
          explanation: 'Bentuknya mengikuti jenis mudzakkar/muannats kata benda yang dihitung (sebagai sifat penjelas di belakangnya).',
          exampleAr: 'قَلَمٌ وَاحِدٌ (1 Pena) | كِتَابَانِ اثْنَانِ (2 Buku)',
          exampleTranslit: 'Qalamun Waahidun | Kitaabaani Itsnaani',
          exampleId: 'Satu pena dan dua buku'
        },
        {
          title: 'Angka 3 sampai 10 (ثَلَاثَة s/d عَشَرَة)',
          explanation: 'Untuk menghitung benda mudzakkar, gunakan angka berakhiran Ta Marbuthah (ثَلَاثَة، أَرْبَعَة، خَمْسَة، سِتَّة، سَبْعَة، ثَمَانِيَة، تِسْعَة، عَشَرَة).',
          exampleAr: 'ثَلَاثَةُ رِجَالٍ (3 Pria) | خَمْسَةُ أَيَّامٍ (5 Hari)',
          exampleTranslit: 'Tsalaatsatu Rijaal | Khamsatu Ayyaam',
          exampleId: 'Kaidah adad ma\'dud 3-10'
        }
      ],
      hudhudTips: 'Tips Hudhud: Hafalkan dengan ritme berima: Wahid (1), Itsnan (2), Tsalatsah (3), Arba\'ah (4), Khamsah (5)!'
    },
    highlightVocab: [
      { ar: 'وَاحِد (١)', translit: 'Waahid', id: 'Satu' },
      { ar: 'اِثْنَان (٢)', translit: 'Itsnaan', id: 'Dua' },
      { ar: 'ثَلَاثَة (٣)', translit: 'Tsalaatsah', id: 'Tiga' },
      { ar: 'أَرْبَعَة (٤)', translit: 'Arba\'ah', id: 'Empat' },
      { ar: 'خَمْسَة (٥)', translit: 'Khamsah', id: 'Lima' },
      { ar: 'سِتَّة (٦)', translit: 'Sittah', id: 'Enam' },
      { ar: 'سَبْعَة (٧)', translit: 'Sab\'ah', id: 'Tujuh' },
      { ar: 'ثَمَانِيَة (٨)', translit: 'Tsamaaniyah', id: 'Delapan' },
      { ar: 'تِسْعَة (٩)', translit: 'Tis\'ah', id: 'Sembilan' },
      { ar: 'عَشَرَة (١٠)', translit: '\'Asyarah', id: 'Sepuluh' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Berapakah nilai dari kata bilangan "ثَلَاثَةٌ" (Tsalaatsah)?',
        options: [
          { text: 'Tiga (3)', isCorrect: true, feedback: 'Benar sekali! Tsalaatsah artinya tiga (٣).' },
          { text: 'Dua (2)', isCorrect: false, feedback: 'Dua adalah Itsnan (اِثْنَان).' },
          { text: 'Empat (4)', isCorrect: false, feedback: 'Empat adalah Arba\'ah (أَرْبَعَة).' }
        ]
      },
      {
        id: 'q2',
        question: 'Bagaimana menyebut angka 5 (LIMA) dalam bahasa Arab?',
        options: [
          { text: 'خَمْسَةٌ (Khamsah)', isCorrect: true, feedback: 'Tepat! Khamsah artinya lima (٥).' },
          { text: 'سِتَّةٌ (Sittah)', isCorrect: false, feedback: 'Sittah artinya enam (٦).' },
          { text: 'عَشَرَةٌ (\'Asyarah)', isCorrect: false, feedback: '\'Asyarah artinya sepuluh (١٠).' }
        ]
      }
    ]
  },

  // MFR-L0-02: Spektrum Warna Alami (الأَلْوَانُ البَصَرِيَّة)
  'MFR-L0-02': {
    explanation: {
      conceptTitle: 'Spektrum Warna Alami Pasar Terapung',
      overview: 'Perahu-perahu pasar terapung dihiasi tenda-tenda berwarna semarak: merah, biru samudra, hijau kurma, dan putih layar. Kenali wazan warna mudzakkar berawalan hamzah (أَفْعَل).',
      rules: [
        {
          title: 'Wazan Warna Maskulin (أَفْعَلُ)',
          explanation: 'Warna untuk benda mudzakkar mengikuti pola أَفْعَلُ: أَحْمَر (ahmar), أَزْرَق (azraq), أَخْضَر (akhdhar), أَبْيَض (abyadh), أَسْوَد (aswad), أَصْفَر (ashfar).',
          exampleAr: 'قَلَمٌ أَحْمَرُ | بَحْرٌ أَزْرَقُ',
          exampleTranslit: 'Qalamun ahmar | Bahrun azraq',
          exampleId: 'Pena merah & laut biru'
        },
        {
          title: 'Penyesuaian Feminin (فَعْلَاءُ)',
          explanation: 'Jika bendanya berjenis muannats, warnanya berubah menjadi pola فَعْلَاء: حَمْرَاء (hamraa\'), زَرْقَاء (zarqaa\'), خَضْرَاء (khadhraa\').',
          exampleAr: 'سَيَّارَةٌ حَمْرَاءُ',
          exampleTranslit: 'Sayyāratun ḥamrāʾ',
          exampleId: 'Mobil merah'
        }
      ],
      hudhudTips: 'Tips Hudhud: Daun kurma itu أَخْضَر (hijau), langit siang itu أَزْرَق (biru), dan buah apel itu أَحْمَر (merah)!'
    },
    highlightVocab: [
      { ar: 'أَحْمَر', translit: 'Aḥmar', id: 'Merah cerah' },
      { ar: 'أَزْرَق', translit: 'Azraq', id: 'Biru samudra' },
      { ar: 'أَخْضَر', translit: 'Akhḍar', id: 'Hijau daun' },
      { ar: 'أَبْيَض', translit: 'Abyaḍ', id: 'Putih bersih' },
      { ar: 'أَسْوَد', translit: 'Aswad', id: 'Hitam pekat' },
      { ar: 'أَصْفَر', translit: 'Aṣfar', id: 'Kuning keemasan' },
      { ar: 'بُرْتُقَالِيّ', translit: 'Burtuqāliyy', id: 'Oranye / jingga' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Apakah warna dari langit yang cerah dalam bahasa Arab?',
        options: [
          { text: 'أَزْرَقُ (Azraq — Biru)', isCorrect: true, feedback: 'Tepat! Biru adalah Azraq.' },
          { text: 'أَحْمَرُ (Ahmar — Merah)', isCorrect: false, feedback: 'Ahmar adalah merah.' },
          { text: 'أَسْوَدُ (Aswad — Hitam)', isCorrect: false, feedback: 'Aswad adalah hitam.' }
        ]
      },
      {
        id: 'q2',
        question: 'Kata "أَبْيَضُ" (Abyadh) memiliki arti:',
        options: [
          { text: 'Putih', isCorrect: true, feedback: 'Mumtaz! Abyadh artinya putih.' },
          { text: 'Hijau', isCorrect: false, feedback: 'Hijau adalah Akhdhar.' },
          { text: 'Kuning', isCorrect: false, feedback: 'Kuning adalah Ashfar.' }
        ]
      }
    ]
  },

  // MFR-L0-03: Keluarga Inti & Kerabat Dekat (الأُسْرَةُ وَالأَقَارِب)
  'MFR-L0-03': {
    explanation: {
      conceptTitle: 'Panggilan Kasih Sayang Keluarga Inti',
      overview: 'Keluarga adalah pelabuhan hati pertama. Pelajari sebutan ayah, ibu, saudara laki-laki, saudari perempuan, kakek, dan nenek dalam bahasa Arab yang penuh adab.',
      rules: [
        {
          title: 'Panggilan Kasih Sayang',
          explanation: 'Kata أَب (ab) dan أُمّ (umm) dapat disematkan dhamir kepemilikan menjadi أَبِي (Abi = ayahku) dan أُمِّي (Ummi = ibuku).',
          exampleAr: 'أَبِي كَرِيمٌ وَأُمِّي حَنُونَةٌ',
          exampleTranslit: 'Abī karīm wa-ummī ḥanūnah',
          exampleId: 'Ayahku mulia dan ibuku penuh kasih'
        },
        {
          title: 'Kakek & Nenek',
          explanation: 'Panggilan kakek adalah جَدّ (jadd), sedangkan nenek adalah جَدَّة (jaddah) dengan akhiran ta marbuthah.',
          exampleAr: 'جَدِّي وَجَدَّتِي فِي القَرْيَةِ',
          exampleTranslit: 'Jaddī wa-jaddatī fī l-qaryah',
          exampleId: 'Kakek dan nenekku di desa'
        }
      ],
      hudhudTips: 'Selalu doakan kedua orang tua dengan: رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ (Rabbighfir lii wa liwaalidayya).'
    },
    highlightVocab: [
      { ar: 'أَب', translit: 'Ab', id: 'Ayah' },
      { ar: 'أُمّ', translit: 'Umm', id: 'Ibu' },
      { ar: 'أَخ', translit: 'Akh', id: 'Saudara laki-laki' },
      { ar: 'أُخْت', translit: 'Ukht', id: 'Saudari perempuan' },
      { ar: 'جَدّ', translit: 'Jadd', id: 'Kakek' },
      { ar: 'جَدَّة', translit: 'Jaddah', id: 'Nenek' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Bagaimana memanggil saudara laki-laki dalam bahasa Arab?',
        options: [
          { text: 'أَخٌ (Akh)', isCorrect: true, feedback: 'Benar! Akh artinya saudara laki-laki.' },
          { text: 'أُخْتٌ (Ukht)', isCorrect: false, feedback: 'Ukht adalah saudari perempuan.' },
          { text: 'أُمٌّ (Umm)', isCorrect: false, feedback: 'Umm adalah ibu.' }
        ]
      },
      {
        id: 'q2',
        question: 'Apa arti dari kata "جَدَّةٌ" (Jaddah)?',
        options: [
          { text: 'Nenek', isCorrect: true, feedback: 'Tepat sekali! Jaddah adalah nenek tercinta.' },
          { text: 'Bibi', isCorrect: false, feedback: 'Bibi dari ayah adalah \'Ammah, dari ibu adalah Khalah.' },
          { text: 'Ibu', isCorrect: false, feedback: 'Ibu adalah Umm.' }
        ]
      }
    ]
  },

  // MFR-L0-04: Benda Kelas & Perlengkapan Belajar (أَدَوَاتُ الدِّرَاسَةِ وَالفَصْل)
  'MFR-L0-04': {
    explanation: {
      conceptTitle: 'Benda Kelas & Alat Belajar',
      overview: 'Setiap pencari ilmu membutuhkan perlengkapan setia: kitab bacaan, pena perak perahu, meja belajar, dan papan tulis tempat terukirnya hikmah.',
      rules: [
        {
          title: 'Kata Tunjuk Benda Kelas',
          explanation: 'Gunakan هٰذَا (hadha) untuk kata mudzakkar seperti كِتَاب (kitab) dan هٰذِهِ (hadhihi) untuk kata muannats seperti سَبُّورَة (sabburah).',
          exampleAr: 'هٰذَا كِتَابٌ وَهٰذِهِ سَبُّورَةٌ',
          exampleTranslit: 'Hādhā kitābun wa-hādhihi sabbūrah',
          exampleId: 'Ini buku dan ini papan tulis'
        }
      ],
      hudhudTips: 'Tips Hudhud: Jika kata berakhiran huruf bulat ة (Ta Marbuthah), selalu pasangkan dengan هٰذِهِ!'
    },
    highlightVocab: [
      { ar: 'كِتَاب', translit: 'Kitāb', id: 'Buku panduan' },
      { ar: 'قَلَم', translit: 'Qalam', id: 'Pena / pulpen' },
      { ar: 'بَاب', translit: 'Bāb', id: 'Pintu' },
      { ar: 'كُرْسِيّ', translit: 'Kursiyy', id: 'Kursi duduk' },
      { ar: 'طَاوِلَة', translit: 'Ṭāwilah', id: 'Meja belajar' },
      { ar: 'سَبُّورَة', translit: 'Sabbūrah', id: 'Papan tulis kelas' },
      { ar: 'حَقِيبَة', translit: 'Ḥaqībah', id: 'Tas ransel' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Manakah kata yang berarti "pena / pulpen"?',
        options: [
          { text: 'قَلَمٌ (Qalam)', isCorrect: true, feedback: 'Betul! Qalam adalah pena gores ilmu.' },
          { text: 'كِتَابٌ (Kitāb)', isCorrect: false, feedback: 'Kitāb artinya buku.' },
          { text: 'كُرْسِيٌّ (Kursiyy)', isCorrect: false, feedback: 'Kursiyy artinya kursi.' }
        ]
      }
    ]
  },

  // MFR-L0-05: Ruangan Rumah & Sudut Hunian (أَرْكَانُ البَيْتِ وَالغُرَف)
  'MFR-L0-05': {
    explanation: {
      conceptTitle: 'Ruangan Rumah & Sudut Hunian Asri',
      overview: 'Rumah (بَيْت) adalah tempat berkumpul yang penuh berkah. Jelajahi ruangan-ruangannya: kamar tidur, dapur tempat memasak hidangan, kamar mandi, hingga pintu gerbang.',
      rules: [
        {
          title: 'Penyebutan Ruangan dengan Ghurfah (غُرْفَة)',
          explanation: 'Kata غُرْفَة berarti kamar/ruangan. Contoh: غُرْفَةُ النَّوْمِ (kamar tidur), غُرْفَةُ الجُلُوسِ (ruang tamu).',
          exampleAr: 'أَنَا فِي غُرْفَةِ النَّوْمِ',
          exampleTranslit: 'Anā fī ghurfati n-nawm',
          exampleId: 'Saya berada di kamar tidur'
        }
      ],
      hudhudTips: 'Ucapkan salam setiap kali melangkahkan kaki masuk ke dalam rumah: السَّلَامُ عَلَيْكُمْ!'
    },
    highlightVocab: [
      { ar: 'بَيْت', translit: 'Bayt', id: 'Rumah tinggal' },
      { ar: 'غُرْفَة', translit: 'Ghurfah', id: 'Kamar / bilik' },
      { ar: 'مَطْبَخ', translit: 'Maṭbakh', id: 'Dapur memasak' },
      { ar: 'حَمَّام', translit: 'Ḥammām', id: 'Kamar mandi' },
      { ar: 'سَقْف', translit: 'Saqf', id: 'Atap langit-langit' },
      { ar: 'جِدَار', translit: 'Jidār', id: 'Dinding kokoh' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Di manakah tempat memasak hidangan dalam rumah?',
        options: [
          { text: 'المَطْبَخُ (Al-Maṭbakh)', isCorrect: true, feedback: 'Benar! Maṭbakh adalah dapur.' },
          { text: 'الحَمَّامُ (Al-Ḥammām)', isCorrect: false, feedback: 'Ḥammām adalah kamar mandi.' },
          { text: 'البَابُ (Al-Bāb)', isCorrect: false, feedback: 'Bāb adalah pintu.' }
        ]
      }
    ]
  },

  // MFR-L0-06: Bentuk Geometri & Ukuran Dasar (الأَشْكَالُ وَالمَقَايِيسُ البَسِيطَة)
  'MFR-L0-06': {
    explanation: {
      conceptTitle: 'Bentuk Geometris & Ukuran Dasar',
      overview: 'Perhatikan dayung perahu yang bulat, kotak peti rempah yang persegi, dan layar segitiga yang tertiup angin laut. Pahami bentuk dan ukuran dasarnya.',
      rules: [
        {
          title: 'Kontras Ukuran Besar vs Kecil',
          explanation: 'Kata كَبِير (kabīr = besar) dan صَغِير (ṣaghīr = kecil) adalah pasangan antonim yang sangat sering digunakan.',
          exampleAr: 'فِيلٌ كَبِيرٌ وَنَمْلَةٌ صَغِيرَةٌ',
          exampleTranslit: 'Fīlun kabīrun wa-namlatun ṣaghīrah',
          exampleId: 'Gajah besar dan semut kecil'
        }
      ],
      hudhudTips: 'Tips: Dā\'irah itu bulat melingkar seperti koin emas dinar!'
    },
    highlightVocab: [
      { ar: 'دَائِرَة', translit: 'Dāʾirah', id: 'Lingkaran bulat' },
      { ar: 'مُرَبَّع', translit: 'Murabbaʿ', id: 'Persegi empat' },
      { ar: 'مُثَلَّث', translit: 'Muthallath', id: 'Segitiga' },
      { ar: 'كَبِير', translit: 'Kabīr', id: 'Berukuran besar' },
      { ar: 'صَغِير', translit: 'Ṣaghīr', id: 'Berukuran kecil' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Apa lawan kata dari "كَبِيرٌ" (Kabīr - Besar)?',
        options: [
          { text: 'صَغِيرٌ (Ṣaghīr - Kecil)', isCorrect: true, feedback: 'Tepat sekali! Lawan dari besar adalah kecil.' },
          { text: 'طَوِيلٌ (Ṭawīl - Panjang)', isCorrect: false, feedback: 'Ṭawīl artinya panjang/tinggi.' },
          { text: 'جَمِيلٌ (Jamīl - Indah)', isCorrect: false, feedback: 'Jamīl artinya elok.' }
        ]
      }
    ]
  },

  // =========================================================================
  // LEVEL 1: MUBTADI' 1 (A1) - Kebutuhan Hayati & Lingkungan Sekitar
  // =========================================================================

  // MFR-L1-01: Makanan Pokok & Minuman Segar (الطَّعَامُ وَالشَّرَاب)
  'MFR-L1-01': {
    explanation: {
      conceptTitle: 'Kosa Kata Makanan & Minuman Pasar Apung',
      overview: 'Perahu-perahu pasar terapung menjajakan aneka santapan lezat: roti gandum hangat, air tawar pegunungan, susu murni, dan kurma manis. Kuasai kosakatanya untuk berbelanja lancar.',
      rules: [
        {
          title: 'Kata Benda Sajian Pokok',
          explanation: 'Sebagian besar isim makanan bersifat mudzakkar: Khubz (roti), Ma\' (air), Halib (susu), Tamr (kurma), Shay (teh).',
          exampleAr: 'خُبْزٌ، مَاءٌ، حَلِيبٌ، تَمْرٌ',
          exampleTranslit: 'Khubzun, Maa\'un, Haliibun, Tamrun',
          exampleId: 'Sajian pokok pasar'
        },
        {
          title: 'Frasa Santun Memesan',
          explanation: 'Gunakan kata kerja أُرِيدُ (Uriidu = Saya ingin) diikuti makanan dan ditutup مِنْ فَضْلِكَ (Tolong / jika berkenan).',
          exampleAr: 'أُرِيدُ خُبْزًا مِنْ فَضْلِكَ',
          exampleTranslit: 'Uriidu khubzan min fadhlik',
          exampleId: 'Saya ingin roti, tolong'
        }
      ],
      hudhudTips: 'Selalu awali dengan basmalah saat menikmati makanan dan akhiri dengan hamdalah!'
    },
    highlightVocab: [
      { ar: 'خُبْزٌ', translit: 'Khubzun', id: 'Roti gandum hangat' },
      { ar: 'مَاءٌ', translit: 'Maa\'un', id: 'Air tawar segar' },
      { ar: 'حَلِيبٌ', translit: 'Haliibun', id: 'Susu murni sehat' },
      { ar: 'تَمْرٌ', translit: 'Tamrun', id: 'Buah kurma manis' },
      { ar: 'شَايٌ', translit: 'Syaayun', id: 'Teh hangat' },
      { ar: 'قَهْوَةٌ', translit: 'Qahwatun', id: 'Kopi aromatik' },
      { ar: 'لَحْمٌ', translit: 'Laḥmun', id: 'Daging segar bergizi' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Apa arti dari kosakata "تَمْرٌ" (Tamr)?',
        options: [
          { text: 'Buah kurma manis berkah', isCorrect: true, feedback: 'Benar! Tamr adalah kurma yang lezat.' },
          { text: 'Segelas susu murni', isCorrect: false, feedback: 'Susu adalah Haliib (حَلِيب).' },
          { text: 'Sebotong roti gandum', isCorrect: false, feedback: 'Roti adalah Khubz (خُبْز).' }
        ]
      },
      {
        id: 'q2',
        question: 'Bagaimana cara santun memesan air di kedai pasar apung?',
        options: [
          { text: 'أُرِيدُ مَاءً مِنْ فَضْلِكَ (Saya ingin air, tolong)', isCorrect: true, feedback: 'Mumtaz! Ini ungkapan santun penutur asli.' },
          { text: 'أَيْنَ البَيْتُ؟ (Di mana rumah?)', isCorrect: false, feedback: 'Itu pertanyaan menanyakan arah rumah.' }
        ]
      }
    ]
  },

  // MFR-L1-02: Buah-Buahan & Sayuran Pasar (الفَوَاكِهُ وَالخُضْرَوَات)
  'MFR-L1-02': {
    explanation: {
      conceptTitle: 'Buah-Buahan & Sayuran Segar Pasar',
      overview: 'Keranjang pedagang penuh dengan apel merah, jeruk manis bertunas, pisang ranum, dan anggur berkilau. Pelajari nama buah dan sayuran pasar apung.',
      rules: [
        {
          title: 'Muannats pada Nama Buah Satuan',
          explanation: 'Sebagian besar buah saat ditambahkan ta marbuthah menunjukkan satu butir/buah (ism marrah): تُفَّاحَة (sebutir apel), بُرْتُقَالَة (sebutir jeruk).',
          exampleAr: 'آكُلُ تُفَّاحَةً حَمْرَاءَ',
          exampleTranslit: 'Ākulu tuffāḥatan ḥamrāʾ',
          exampleId: 'Saya memakan sebutir apel merah'
        }
      ],
      hudhudTips: 'Tips: Burtuqāl dinamai mirip nama negeri Portugal tempat bibit jeruk manis disebarkan zaman dahulu!'
    },
    highlightVocab: [
      { ar: 'تُفَّاحَة', translit: 'Tuffāḥah', id: 'Buah apel' },
      { ar: 'بُرْتُقَال', translit: 'Burtuqāl', id: 'Buah jeruk' },
      { ar: 'مَوْز', translit: 'Mawz', id: 'Buah pisang' },
      { ar: 'عِنَب', translit: 'ʿInab', id: 'Buah anggur' },
      { ar: 'طَمَاطِم', translit: 'Ṭamāṭim', id: 'Tomat segar' },
      { ar: 'خِيَار', translit: 'Khiyār', id: 'Mentimun' },
      { ar: 'بَصَل', translit: 'Baṣal', id: 'Bawang merah' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Manakah kosakata yang berarti "buah pisang manis"?',
        options: [
          { text: 'مَوْزٌ (Mawz)', isCorrect: true, feedback: 'Benar sekali! Mawz adalah pisang.' },
          { text: 'عِنَبٌ (ʿInab)', isCorrect: false, feedback: 'ʿInab adalah anggur.' },
          { text: 'بَصَلٌ (Baṣal)', isCorrect: false, feedback: 'Baṣal adalah bawang.' }
        ]
      }
    ]
  },

  // MFR-L1-03: Hewan Jinak & Margasatwa (الحَيَوَانَاتُ الأَلِيفَةُ وَالبَرِّيَّة)
  'MFR-L1-03': {
    explanation: {
      conceptTitle: 'Satwa Gurun, Air & Rimba',
      overview: 'Bahasa Arab kaya akan nama fauna legendaris: unta sang kapal padang pasir (جَمَل), kuda tangkas (حِصَان), hingga kucing menggemaskan di geladak perahu (قِطَّة).',
      rules: [
        {
          title: 'Gelar Satwa Gurun',
          explanation: 'Unta dijuluki سَفِينَةُ الصَّحْرَاءِ (safīnah aṣ-ṣaḥrā\') karena kemampuannya menyeberangi lautan pasir tanpa lelah.',
          exampleAr: 'الجَمَلُ صَبُورٌ فِي الصَّحْرَاءِ',
          exampleTranslit: 'Al-jamalu ṣabūrun fī ṣ-ṣaḥrāʾ',
          exampleId: 'Unta sangat sabar di padang pasir'
        }
      ],
      hudhudTips: 'Sayangilah hewan di sekitarmu, karena Rasulullah bersabda dalam setiap makhluk bernyawa ada pahala kebajikan!'
    },
    highlightVocab: [
      { ar: 'قِطَّة', translit: 'Qiṭṭah', id: 'Kucing piaraan' },
      { ar: 'سَمَكَة', translit: 'Samakah', id: 'Ikan air jernih' },
      { ar: 'طَائِر', translit: 'Ṭāʾir', id: 'Burung berkicau' },
      { ar: 'حِصَان', translit: 'Ḥiṣān', id: 'Kuda gagah' },
      { ar: 'جَمَل', translit: 'Jamal', id: 'Unta padang pasir' },
      { ar: 'أَسَد', translit: 'Asad', id: 'Singa raja rimba' },
      { ar: 'فِيل', translit: 'Fīl', id: 'Gajah besar' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Hewan apakah yang dijuluki "perahu padang pasir"?',
        options: [
          { text: 'الجَمَلُ (Al-Jamal - Unta)', isCorrect: true, feedback: 'Tepat! Unta mampu bertahan di panas gurun berhari-hari.' },
          { text: 'الحِصَانُ (Al-Ḥiṣān - Kuda)', isCorrect: false, feedback: 'Kuda adalah ḥiṣān.' },
          { text: 'الفِيلُ (Al-Fīl - Gajah)', isCorrect: false, feedback: 'Gajah adalah fīl.' }
        ]
      }
    ]
  },

  // MFR-L1-04: Anggota Tubuh & Panca Indra (أَعْضَاءُ الجِسْمِ وَالحَوَاسّ)
  'MFR-L1-04': {
    explanation: {
      conceptTitle: 'Anatomi Tubuh Manusia & Panca Indra',
      overview: 'Tubuh adalah karunia Sang Maha Pencipta. Pelajari nama anggota tubuh: kepala, tangan yang berbuat kebajikan, mata yang memandang keindahan ciptaan-Nya, dan kalbu.',
      rules: [
        {
          title: 'Anggota Tubuh Berpasangan Bersifat Feminin',
          explanation: 'Sebagian besar anggota tubuh yang berjumlah sepasang (mata, telinga, tangan, kaki) dihukumi muannats dalam tata bahasa Arab!',
          exampleAr: 'هٰذِهِ عَيْنٌ جَمِيلَةٌ | هٰذِهِ يَدٌ قَوِيَّةٌ',
          exampleTranslit: 'Hādhihi ʿaynun jamīlah | Hādhihi yadun qawiyyah',
          exampleId: 'Ini mata yang indah & ini tangan yang kuat'
        }
      ],
      hudhudTips: 'Tips Hudhud: \'Ayn (mata) dan Yad (tangan) itu sepasang, maka selalu gunakan kata tunjuk هٰذِهِ!'
    },
    highlightVocab: [
      { ar: 'رَأْس', translit: 'Raʾs', id: 'Kepala' },
      { ar: 'يَد', translit: 'Yad', id: 'Tangan (feminin)' },
      { ar: 'عَيْن', translit: 'ʿAyn', id: 'Mata (feminin)' },
      { ar: 'رِجْل', translit: 'Rijl', id: 'Kaki (feminin)' },
      { ar: 'أَنْف', translit: 'Anf', id: 'Hidung' },
      { ar: 'فَم', translit: 'Fam', id: 'Mulut' },
      { ar: 'أُذُن', translit: 'Udhun', id: 'Telinga (feminin)' },
      { ar: 'قَلْب', translit: 'Qalb', id: 'Hati nurani' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Mengapa kata "عَيْنٌ" (mata) diperlakukan sebagai kata feminin (muannats)?',
        options: [
          { text: 'Karena merupakan anggota tubuh yang berpasangan secara alami', isCorrect: true, feedback: 'Mumtaz! Anggota tubuh berpasangan dihukumi muannats sima\'iy.' },
          { text: 'Karena berakhiran Ta Marbuthah', isCorrect: false, feedback: '\'Ayn tidak berakhiran Ta Marbuthah.' }
        ]
      }
    ]
  },

  // MFR-L1-05: Busana, Pakaian & Perhiasan (المَلَابِسُ وَالزِّينَة)
  'MFR-L1-05': {
    explanation: {
      conceptTitle: 'Busana Harian & Pakaian Adat',
      overview: 'Pakaian melindungi raga dan mencerminkan kerapian pribadi muslim. Kenali kemeja (قَمِيص), jubah gamis (ثَوْب), celana panjang (سِرْوَال), dan peci (قَلَنْسُوَة).',
      rules: [
        {
          title: 'Kata Kerja Mengenakan Pakaian',
          explanation: 'Gunakan kata kerja يَلْبَسُ (yalbasu = dia memakai) atau أَلْبَسُ (albasu = saya memakai).',
          exampleAr: 'أَلْبَسُ قَمِيصًا أَبْيَضَ نَظِيفًا',
          exampleTranslit: 'Albasu qamīṣan abyaḍa naẓīfan',
          exampleId: 'Saya memakai kemeja putih yang bersih'
        }
      ],
      hudhudTips: 'Kenakan pakaian terbaik dan terbersihmu saat hendak menunaikan shalat berjamaah di masjid!'
    },
    highlightVocab: [
      { ar: 'قَمِيص', translit: 'Qamīṣ', id: 'Kemeja baju' },
      { ar: 'ثَوْب', translit: 'Thawb', id: 'Jubah gamis' },
      { ar: 'حِذَاء', translit: 'Ḥidhāʾ', id: 'Sepatu alas kaki' },
      { ar: 'قَلَنْسُوَة', translit: 'Qalansuwah', id: 'Peci / songkok' },
      { ar: 'سِرْوَال', translit: 'Sirwāl', id: 'Celana panjang' },
      { ar: 'سَاعَةُ اليَد', translit: 'Sāʿatu l-yad', id: 'Jam tangan' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Apa arti kata "قَمِيصٌ" (Qamīṣ)?',
        options: [
          { text: 'Kemeja / baju berkancing', isCorrect: true, feedback: 'Benar! Qamīṣ adalah kemeja.' },
          { text: 'Sepatu kulit', isCorrect: false, feedback: 'Sepatu adalah Ḥidhā\'.' },
          { text: 'Peci penutup kepala', isCorrect: false, feedback: 'Peci adalah Qalansuwah.' }
        ]
      }
    ]
  },

  // MFR-L1-06: Waktu Harian, Hari & Jam (الأَيَّامُ وَالأَوْقَاتُ وَالسَّاعَة)
  'MFR-L1-06': {
    explanation: {
      conceptTitle: 'Penanggalan Mingguan & Ritme Waktu Harian',
      overview: 'Waktu adalah modal termahal manusia. Pelajari nama 7 hari dalam sepekan (Ahad sampai Sabtu) serta siklus fajar, siang, petang, dan malam hari.',
      rules: [
        {
          title: 'Nama-nama Hari Berakar dari Angka',
          explanation: 'Perhatikan kesamaan: Al-Ahad (1-Wahid), Al-Itsnayn (2-Itsnan), Ats-Tsulatsa (3-Tsalatsah), Al-Arbi\'a (4-Arba\'ah), Al-Khamis (5-Khamsah)!',
          exampleAr: 'اليَوْمَ يَوْمُ الجُمُعَةِ المُبَارَكُ',
          exampleTranslit: 'Al-yawma yawmu l-jumuʿati l-mubārak',
          exampleId: 'Hari ini hari Jumat penuh berkah'
        }
      ],
      hudhudTips: 'Tips Hudhud: Hari Jumat (Al-Jumu\'ah) berasal dari kata "ijtima\'" yang berarti berkumpulnya kaum muslimin untuk ibadah.'
    },
    highlightVocab: [
      { ar: 'يَوْمُ الأَحَد', translit: 'Yawm al-aḥad', id: 'Hari Ahad (Minggu)' },
      { ar: 'يَوْمُ الجُمُعَة', translit: 'Yawm al-jumuʿah', id: 'Hari Jumat' },
      { ar: 'لَيْل', translit: 'Layl', id: 'Malam hari' },
      { ar: 'نَهَار', translit: 'Nahār', id: 'Siang hari' },
      { ar: 'صَبَاح', translit: 'Ṣabāḥ', id: 'Waktu pagi' },
      { ar: 'مَسَاء', translit: 'Masāʾ', id: 'Waktu petang' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Hari apakah yang dinamai dari akar angka tiga (ثَلَاثَة)?',
        options: [
          { text: 'يَوْمُ الثُّلَاثَاءِ (Yawm ath-Thulāthāʾ - Selasa)', isCorrect: true, feedback: 'Tepat sekali! Thulāthā\' berakar dari kata tiga.' },
          { text: 'يَوْمُ الأَرْبِعَاءِ (Yawm al-Arbiʿāʾ - Rabu)', isCorrect: false, feedback: 'Arbi\'ā\' berakar dari kata empat.' },
          { text: 'يَوْمُ الخَمِيسِ (Yawm al-Khamīs - Kamis)', isCorrect: false, feedback: 'Khamīs berakar dari kata lima.' }
        ]
      }
    ]
  },

  // =========================================================================
  // LEVEL 2: MUBTADI' 2 (A2) - Perabot, Kota, Profesi & Mobilitas
  // =========================================================================

  // MFR-L2-01: Perabot Rumah & Perkakas Dapur (الأَثَاثُ وَأَدَوَاتُ المَطْبَخ)
  'MFR-L2-01': {
    explanation: {
      conceptTitle: 'Perabotan Interior & Perkakas Dapur',
      overview: 'Lengkapi pengetahuan rumah tangga dengan perkakas dapur: ranjang tidur (سَرِير), lemari penyimpan (خِزَانَة), piring makan (صَحْن), sendok (مِلْعَقَة), dan pisau (سِكِّين).',
      rules: [
        {
          title: 'Wazan Ism Alat (مِفْعَلَة)',
          explanation: 'Banyak peralatan dapur mengikuti pola isim alat مِفْعَلَة: مِلْعَقَة (mil\'aqah = sendok, dari kata la\'iqa = menjilat kuah).',
          exampleAr: 'آكُلُ الحَسَاءَ بِالمِلْعَقَةِ',
          exampleTranslit: 'Ākulu l-ḥasāʾa bi-l-milʿaqah',
          exampleId: 'Saya menyantap sup dengan sendok'
        }
      ],
      hudhudTips: 'Gunakan tangan kanan saat memegang sendok dan makan dengan tertib!'
    },
    highlightVocab: [
      { ar: 'سَرِير', translit: 'Sarīr', id: 'Ranjang tempat tidur' },
      { ar: 'خِزَانَة', translit: 'Khizānah', id: 'Lemari simpan' },
      { ar: 'صَحْن', translit: 'Ṣaḥn', id: 'Piring hidangan' },
      { ar: 'مِلْعَقَة', translit: 'Milʿaqah', id: 'Sendok makan' },
      { ar: 'سِكِّين', translit: 'Sikkīn', id: 'Pisau dapur' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Alat apakah yang digunakan untuk memotong bahan makanan di dapur?',
        options: [
          { text: 'السِّكِّينُ (As-Sikkīn)', isCorrect: true, feedback: 'Benar! Sikkīn adalah pisau dapur.' },
          { text: 'المِلْعَقَةُ (Al-Milʿaqah)', isCorrect: false, feedback: 'Milʿaqah adalah sendok.' },
          { text: 'الصَّحْنُ (Aṣ-Ṣaḥn)', isCorrect: false, feedback: 'Ṣaḥn adalah piring.' }
        ]
      }
    ]
  },

  // MFR-L2-02: Fasilitas Publik & Denah Kota (المَرَافِقُ العَامَّةُ وَالمَدِينَة)
  'MFR-L2-02': {
    explanation: {
      conceptTitle: 'Denah Kota & Fasilitas Publik',
      overview: 'Kota Madinah yang makmur memiliki fasilitas lengkap: masjid pusat ibadah, pasar ramai, madrasah penuntut ilmu, rumah sakit penyembuhan, dan bandara pintu gerbang dunia.',
      rules: [
        {
          title: 'Pola Ism Makan Tempat (مَفْعَل / مَفْعِل)',
          explanation: 'Banyak nama tempat publik berawalan huruf mim: مَسْجِد (masjid = tempat sujud), مَدْرَسَة (madrasah = tempat belajar), مَطَار (mathar = tempat burung/pesawat terbang).',
          exampleAr: 'المَدِينَةُ فِيهَا مَسْجِدٌ كَبِيرٌ وَمَطَارٌ حَدِيثٌ',
          exampleTranslit: 'Al-madīnatu fīhā masjidun kabīrun wa-maṭārun ḥadīth',
          exampleId: 'Kota ini memiliki masjid besar dan bandara modern'
        }
      ],
      hudhudTips: 'Tips: Huruf awal "Mim" pada kata masjid, madrasah, dan mathar adalah penanda tempat (ism makan)!'
    },
    highlightVocab: [
      { ar: 'مَسْجِد', translit: 'Masjid', id: 'Masjid tempat ibadah' },
      { ar: 'سُوق', translit: 'Sūq', id: 'Pasar perdagangan' },
      { ar: 'مَدْرَسَة', translit: 'Madrasah', id: 'Sekolah' },
      { ar: 'مُسْتَشْفَى', translit: 'Mustashfā', id: 'Rumah sakit' },
      { ar: 'مَطَار', translit: 'Maṭār', id: 'Bandara penerbangan' },
      { ar: 'فُنْدُق', translit: 'Funduq', id: 'Hotel penginapan' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Tempat apakah yang disebut "مُسْتَشْفَى" (Mustashfā)?',
        options: [
          { text: 'Rumah sakit (tempat memohon kesembuhan/syifa)', isCorrect: true, feedback: 'Mumtaz! Mustashfā berakar dari kata syifā\' (kesembuhan).' },
          { text: 'Sekolah tempat ujian', isCorrect: false, feedback: 'Sekolah adalah Madrasah.' },
          { text: 'Bandara pesawat', isCorrect: false, feedback: 'Bandara adalah Maṭār.' }
        ]
      }
    ]
  },

  // MFR-L2-03: Profesi & Ragam Pekerjaan (المِهَنُ وَالوِظَائِفُ المُتَنَوِّعَة)
  'MFR-L2-03': {
    explanation: {
      conceptTitle: 'Dunia Profesi, Karir & Pengabdian',
      overview: 'Setiap profesi bernilai mulia jika dijalankan dengan integritas: dokter yang mengobati pasien, guru penyemai peradaban, insinyur pembangun infrastruktur, hingga saudagar terpercaya.',
      rules: [
        {
          title: 'Wazan Pelaku Profesi (فَعَّال / مُفَعِّل)',
          explanation: 'Banyak nama profesi mengikuti pola fā\'il (تَاجِر), fa\'\'āl (فَلَّاح, نَجَّار), atau mudarris (مُدَرِّس).',
          exampleAr: 'التَّاجِرُ الصَّدُوقُ مَعَ النَّبِيِّينَ',
          exampleTranslit: 'At-tājiru ṣ-ṣadūqu maʿa n-nabiyyīn',
          exampleId: 'Pedagang yang jujur bersama para nabi'
        }
      ],
      hudhudTips: 'Cita-citakan profesi yang mendatangkan kemanfaatan terbesar bagi umat manusia!'
    },
    highlightVocab: [
      { ar: 'طَبِيب', translit: 'Ṭabīb', id: 'Dokter penyembuh' },
      { ar: 'مُدَرِّس', translit: 'Mudarris', id: 'Guru pengajar' },
      { ar: 'مُهَنْدِس', translit: 'Muhandis', id: 'Insinyur teknik' },
      { ar: 'فَلَّاح', translit: 'Fallāḥ', id: 'Petani sawah' },
      { ar: 'شُرْطِيّ', translit: 'Shurṭiyy', id: 'Polisi penjaga ketertiban' },
      { ar: 'تَاجِر', translit: 'Tājir', id: 'Pedagang / saudagar' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Siapakah yang bertugas merancang bangunan gedung dan jembatan?',
        options: [
          { text: 'المُهَنْدِسُ (Al-Muhandis - Insinyur)', isCorrect: true, feedback: 'Benar! Insinyur adalah muhandis.' },
          { text: 'الفَلَّاحُ (Al-Fallāḥ - Petani)', isCorrect: false, feedback: 'Fallāḥ adalah petani.' },
          { text: 'الشُّرْطِيُّ (Ash-Shurṭiyy - Polisi)', isCorrect: false, feedback: 'Shurṭiyy adalah polisi.' }
        ]
      }
    ]
  },

  // MFR-L2-04: Sarana Transportasi & Kendaraan (المَوَاصَلَاتُ وَالمَرْكَبَات)
  'MFR-L2-04': {
    explanation: {
      conceptTitle: 'Moda Transportasi Darat, Laut & Udara',
      overview: 'Jelajahi mobilitas peradaban: mobil keluarga (سَيَّارَة), bus penumpang (حَافِلَة), kereta rel panjang (قِطَار), kapal laut penembus ombak (سَفِينَة), dan pesawat terbang (طَائِرَة).',
      rules: [
        {
          title: 'Kata Depan Naik Kendaraan (بِـ)',
          explanation: 'Gunakan huruf jar bi- (بِـ) saat menyebutkan kendaraan yang dinaiki: بِالسَّيَّارَةِ (dengan mobil), بِالقِطَارِ (dengan kereta).',
          exampleAr: 'أُسَافِرُ إِلَى مَكَّةَ بِالطَّائِرَةِ',
          exampleTranslit: 'Usāfiru ilā Makkata bi-ṭ-ṭāʾirah',
          exampleId: 'Saya bepergian ke Makkah dengan pesawat'
        }
      ],
      hudhudTips: 'Ucapkan doa naik kendaraan: سُبْحَانَ الَّذِي سَخَّرَ لَنَا هٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ.'
    },
    highlightVocab: [
      { ar: 'سَيَّارَة', translit: 'Sayyārah', id: 'Mobil penumpang' },
      { ar: 'حَافِلَة', translit: 'Ḥāfilah', id: 'Bus umum' },
      { ar: 'قِطَار', translit: 'Qiṭār', id: 'Kereta api rel' },
      { ar: 'طَائِرَة', translit: 'Ṭāʾirah', id: 'Pesawat terbang' },
      { ar: 'سَفِينَة', translit: 'Safīnah', id: 'Kapal laut samudra' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Kendaraan manakah yang melaju di atas rel jalur khusus?',
        options: [
          { text: 'القِطَارُ (Al-Qiṭār - Kereta Api)', isCorrect: true, feedback: 'Tepat sekali! Qiṭār adalah kereta api.' },
          { text: 'السَّفِينَةُ (As-Safīnah - Kapal Laut)', isCorrect: false, feedback: 'Safīnah berlayar di laut.' },
          { text: 'الحَافِلَةُ (Al-Ḥāfilah - Bus)', isCorrect: false, feedback: 'Ḥāfilah berjalan di jalan raya.' }
        ]
      }
    ]
  },

  // MFR-L2-05: Kata Kerja Tindakan Harian (الأَفْعَالُ الحَرَكِيَّةُ اليَوْمِيَّة)
  'MFR-L2-05': {
    explanation: {
      conceptTitle: 'Kata Kerja Tindakan Harian Paling Penting',
      overview: 'Kehidupan tersusun dari aktivitas: membaca (قَرَأَ), menulis (كَتَبَ), pergi (ذَهَبَ), pulang (رَجَعَ), makan (أَكَلَ), minum (شَرِبَ), dan istirahat tidur (نَامَ).',
      rules: [
        {
          title: 'Pola Dasar Fi\'il Madhi 3 Huruf (فَعَلَ)',
          explanation: 'Bentuk lampau dasar terdiri atas 3 konsonan berharakat fathah: قَرَأَ, كَتَبَ, ذَهَبَ, رَجَعَ.',
          exampleAr: 'كَتَبَ الطَّالِبُ الدَّرْسَ',
          exampleTranslit: 'Kataba ṭ-ṭālibu d-dars',
          exampleId: 'Siswa itu telah menulis pelajaran'
        }
      ],
      hudhudTips: 'Hafalkan pasangan kata kerja: ذَهَبَ (pergi) lawannya رَجَعَ (pulang/kembali)!'
    },
    highlightVocab: [
      { ar: 'قَرَأَ', translit: 'Qaraʾa', id: 'Telah membaca' },
      { ar: 'كَتَبَ', translit: 'Kataba', id: 'Telah menulis' },
      { ar: 'ذَهَبَ', translit: 'Dhahaba', id: 'Telah pergi' },
      { ar: 'رَجَعَ', translit: 'Rajaʿa', id: 'Telah kembali/pulang' },
      { ar: 'أَكَلَ', translit: 'Akala', id: 'Telah makan' },
      { ar: 'شَرِبَ', translit: 'Shariba', id: 'Telah minum' },
      { ar: 'نَامَ', translit: 'Nāma', id: 'Telah tidur lelap' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Apa arti dari kata kerja "قَرَأَ" (Qaraʾa)?',
        options: [
          { text: 'Dia telah membaca', isCorrect: true, feedback: 'Benar! Qara\'a adalah membaca, kata pertama wahyu Al-Qur\'an (Iqra\').' },
          { text: 'Dia telah menulis', isCorrect: false, feedback: 'Menulis adalah Kataba.' },
          { text: 'Dia telah pergi', isCorrect: false, feedback: 'Pergi adalah Dhahaba.' }
        ]
      }
    ]
  },

  // MFR-L2-06: Transaksi Toko, Pasar & Mata Uang (السُّوقُ وَالمُشْتَرَيَاتُ وَالعُمْلَة)
  'MFR-L2-06': {
    explanation: {
      conceptTitle: 'Perniagaan, Transaksi Pasar & Mata Uang',
      overview: 'Pasar apung hidup oleh tawar menawar yang adil: koin dinar emas, dirham perak, menanyakan harga (سِعْر), barang dagangan segar (طَازَج), dan nota pembayaran.',
      rules: [
        {
          title: 'Menanyakan Harga Barang',
          explanation: 'Gunakan frasa كَمْ سِعْرُ هٰذَا؟ (Kam si\'ru hadha? = Berapa harga ini?) atau بِكَمْ هٰذَا؟ (Bikam hadha?).',
          exampleAr: 'بِكَمْ هٰذَا التَّمْرُ اللَّذِيذُ؟',
          exampleTranslit: 'Bi-kam hādhā t-tamru l-ladhīdh?',
          exampleId: 'Berapakah harga kurma lezat ini?'
        }
      ],
      hudhudTips: 'Rasulullah mendoakan keberkahan bagi orang yang mempermudah saat menjual dan mempermudah saat membeli!'
    },
    highlightVocab: [
      { ar: 'دِينَار', translit: 'Dīnār', id: 'Uang dinar emas' },
      { ar: 'دِرْهَم', translit: 'Dirham', id: 'Uang dirham perak' },
      { ar: 'سِعْر', translit: 'Siʿr', id: 'Harga barang' },
      { ar: 'بَيْعٌ وَشِرَاء', translit: 'Bayʿun wa-shirāʾ', id: 'Jual beli yang sah' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Bagaimana cara menanyakan harga suatu barang di pasar?',
        options: [
          { text: 'كَمْ سِعْرُ هٰذَا؟ (Kam siʿru hādhā?)', isCorrect: true, feedback: 'Mumtaz! Ini ungkapan fasih menanyakan harga.' },
          { text: 'مَا اسْمُكَ؟ (Mā ismuka?)', isCorrect: false, feedback: 'Itu menanyakan nama.' }
        ]
      }
    ]
  },

  // =========================================================================
  // LEVEL 3: MUTAWASSITH 1 (B1) - Karakter, Alam, Geografi, Kesehatan & Hobi
  // =========================================================================

  // MFR-L3-01: Sifat Fisik, Rupa & Karakter (الصِّفَاتُ وَالطِّبَاعُ الشَّخْصِيَّة)
  'MFR-L3-01': {
    explanation: {
      conceptTitle: 'Sifat Fisik, Rupa & Akhlak Kepribadian',
      overview: 'Gambarkan karakter manusia dan rupa benda dengan kata sifat berpasangan: tinggi (طَوِيل) vs pendek (قَصِير), rupawan (جَمِيل), dermawan (كَرِيم), dan pemberani (شُجَاع).',
      rules: [
        {
          title: 'Kesesuaian Sifat dan Kata Benda (Na\'at Man\'ut)',
          explanation: 'Kata sifat harus cocok dengan kata benda dalam 4 hal: jenis kelamin (mudzakkar/muannats), jumlah, kejelasan (ma\'rifah/nakirah), dan harakat i\'rab.',
          exampleAr: 'رَجُلٌ كَرِيمٌ | امْرَأَةٌ كَرِيمَةٌ',
          exampleTranslit: 'Rajulun karīm | Imraʾatun karīmah',
          exampleId: 'Pria dermawan | Wanita dermawan'
        }
      ],
      hudhudTips: 'Pilihlah teman yang berkarakter كَرِيم (mulia) dan شُجَاع (pemberani dalam kebenaran)!'
    },
    highlightVocab: [
      { ar: 'طَوِيل', translit: 'Ṭawīl', id: 'Tinggi / panjang' },
      { ar: 'قَصِير', translit: 'Qaṣīr', id: 'Pendek mungil' },
      { ar: 'جَمِيل', translit: 'Jamīl', id: 'Indah / elok' },
      { ar: 'كَرِيم', translit: 'Karīm', id: 'Mulia dermawan' },
      { ar: 'شُجَاع', translit: 'Shujāʿ', id: 'Pemberani ksatria' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Lawan kata dari sifat penakut (جَبَانٌ) adalah:',
        options: [
          { text: 'شُجَاعٌ (Shujāʿ - Pemberani)', isCorrect: true, feedback: 'Benar sekali! Shuja\' artinya ksatria pemberani.' },
          { text: 'كَرِيمٌ (Karīm - Dermawan)', isCorrect: false, feedback: 'Karim artinya dermawan.' }
        ]
      }
    ]
  },

  // MFR-L3-02: Cuaca, Iklim & Musim Alam (الطَّقْسُ وَالمَنَاخُ وَالفُصُول)
  'MFR-L3-02': {
    explanation: {
      conceptTitle: 'Fenomena Cuaca, Iklim & 4 Musim',
      overview: 'Kenali perubahan alam semesta: panas terik gurun (حَارّ), dingin pegunungan (بَارِد), hujan rahmat (مَطَر), musim panas (الصَّيْف), dan musim dingin salju (الشِّتَاء).',
      rules: [
        {
          title: 'Frasa Menyatakan Cuaca Hari Ini',
          explanation: 'Gunakan frasa الطَّقْسُ اليَوْمَ... (Al-ṭaqsu l-yawma... = Cuaca hari ini...) diikuti sifat cuacanya.',
          exampleAr: 'الطَّقْسُ اليَوْمَ حَارٌّ جِدًّا',
          exampleTranslit: 'Aṭ-ṭaqsu l-yawma ḥārrun jiddā',
          exampleId: 'Cuaca hari ini sangat panas'
        }
      ],
      hudhudTips: 'Saat hujan turun, ucapkan doa: اللَّهُمَّ صَيِّبًا نَافِعًا (Ya Allah, jadikan hujan ini bermanfaat).'
    },
    highlightVocab: [
      { ar: 'حَارّ', translit: 'Ḥārr', id: 'Panas terik' },
      { ar: 'بَارِد', translit: 'Bārid', id: 'Dingin sejuk' },
      { ar: 'مَطَر', translit: 'Maṭar', id: 'Hujan lebat' },
      { ar: 'فَصْلُ الصَّيْف', translit: 'Faṣlu ṣ-ṣayf', id: 'Musim panas' },
      { ar: 'فَصْلُ الشِّتَاء', translit: 'Faṣlu sh-shitāʾ', id: 'Musim dingin' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Musim apakah yang disebut "فَصْلُ الشِّتَاءِ" (Faṣlu sh-shitāʾ)?',
        options: [
          { text: 'Musim dingin', isCorrect: true, feedback: 'Tepat! Asy-Syita\' artinya musim dingin.' },
          { text: 'Musim panas kemarau', isCorrect: false, feedback: 'Musim panas adalah Aṣ-Ṣayf.' }
        ]
      }
    ]
  },

  // MFR-L3-03: Jamak Taksir Berfrekuensi Tinggi (جُمُوعُ التَّكْسِيرِ الشَّائِعَة)
  'MFR-L3-03': {
    explanation: {
      conceptTitle: 'Keajaiban Jamak Taksir (Bentuk Tak Beraturan)',
      overview: 'Jamak Taksir adalah keunikan bahasa Arab di mana struktur kata tunggalnya "dipecah" mengikuti wazan tertentu, bukan sekadar ditambah akhiran wāw-nūn.',
      rules: [
        {
          title: 'Pola-pola Jamak Taksir Populer',
          explanation: 'Wazan فُعُل: كِتَاب ➔ كُتُب | Wazan أَفْعَال: قَلَم ➔ أَقْلَام, وَلَد ➔ أَوْلَاد | Wazan فُعُول: بَيْت ➔ بُيُوت | Wazan مَفَاعِل: مَسْجِد ➔ مَسَاجِد.',
          exampleAr: 'قَرَأْتُ خَمْسَةَ كُتُبٍ مُفِيدَةٍ',
          exampleTranslit: 'Qaraʾtu khamsata kutubin mufīdah',
          exampleId: 'Saya membaca lima buku yang bermanfaat'
        },
        {
          title: 'Kaidah Jamak Tak Berakal Dianggap Muannats Tunggal',
          explanation: 'Setiap jamak benda mati/tak berakal dihukumi sebagai muannats tunggal (كُلُّ جَمْعٍ لِغَيْرِ العَاقِلِ يُعَامَلُ مُعَامَلَةَ المُفْرَدِ المُؤَنَّثِ).',
          exampleAr: 'هٰذِهِ كُتُبٌ جَمِيلَةٌ (bukan هٰؤُلَاءِ)',
          exampleTranslit: 'Hādhihi kutubun jamīlah',
          exampleId: 'Ini buku-buku yang bagus'
        }
      ],
      hudhudTips: 'Kaidah Emas: Benda jamak selain manusia disifati dengan kata tunggal feminin (هٰذِهِ كُتُبٌ kabiirah)!'
    },
    highlightVocab: [
      { ar: 'كُتُب', translit: 'Kutub', id: 'Buku-buku (jamak kitāb)' },
      { ar: 'أَقْلَام', translit: 'Aqlām', id: 'Pena-pena (jamak qalam)' },
      { ar: 'أَوْلَاد', translit: 'Awlād', id: 'Anak-anak (jamak walad)' },
      { ar: 'بُيُوت', translit: 'Buyūt', id: 'Rumah-rumah (jamak bayt)' },
      { ar: 'مَسَاجِد', translit: 'Masājid', id: 'Masjid-masjid (jamak masjid)' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Apakah bentuk jamak taksir dari kata "كِتَابٌ" (kitāb)?',
        options: [
          { text: 'كُتُبٌ (Kutub)', isCorrect: true, feedback: 'Benar! Kitāb menjadi kutub pada wazan fu\'ul.' },
          { text: 'كِتَابَاتٌ (Kitābāt)', isCorrect: false, feedback: 'Kitābāt artinya tulisan-tulisan.' },
          { text: 'كِتَابُونَ (Kitābūn)', isCorrect: false, feedback: 'Benda mati tidak dijamak mudzakkar salim.' }
        ]
      }
    ]
  },

  // MFR-L3-04: Geografi, Bentang Darat & Samudra (الجُغْرَافِيَا وَالتَّضَارِيسُ وَالبِحَار)
  'MFR-L3-04': {
    explanation: {
      conceptTitle: 'Bentang Alam, Geografi & Samudra',
      overview: 'Jelajahi keagungan lanskap bumi: gunung kokoh (جَبَل), sungai mengalir air tawar (نَهْر), samudra luas berombak (بَحْر), padang pasir (صَحْرَاء), dan gugusan pulau (جَزِيرَة).',
      rules: [
        {
          title: 'Kata Jazirah dalam Geografi Arab',
          explanation: 'Kata جَزِيرَة berarti pulau. Semenanjung Arab disebut شِبْهُ الجَزِيرَةِ العَرَبِيَّةِ (Syibh al-Jazīrah al-ʿArabiyyah).',
          exampleAr: 'تَجْرِي السُّفُنُ فِي البَحْرِ الوَاسِعِ',
          exampleTranslit: 'Tajrī s-sufunu fī l-baḥri l-wāsiʿ',
          exampleId: 'Kapal-kapal berlayar di laut lepas'
        }
      ],
      hudhudTips: 'Perhatikan firman Allah: وَأَلْقَى فِي الأَرْضِ رَوَاسِيَ أَنْ تَمِيدَ بِكُمْ وَأَنْهَارًا وَسُبُلًا!'
    },
    highlightVocab: [
      { ar: 'جَبَل', translit: 'Jabal', id: 'Gunung perkasa' },
      { ar: 'نَهْر', translit: 'Nahr', id: 'Sungai jernih' },
      { ar: 'بَحْر', translit: 'Baḥr', id: 'Laut samudra' },
      { ar: 'صَحْرَاء', translit: 'Ṣaḥrāʾ', id: 'Padang pasir' },
      { ar: 'جَزِيرَة', translit: 'Jazīrah', id: 'Pulau perairan' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Apakah arti dari istilah "نَهْرُ النِّيلِ" (Nahru n-Nīl)?',
        options: [
          { text: 'Sungai Nil', isCorrect: true, feedback: 'Tepat! Nahr artinya sungai mengalir.' },
          { text: 'Laut Nil', isCorrect: false, feedback: 'Laut adalah Baḥr.' }
        ]
      }
    ]
  },

  // MFR-L3-05: Kesehatan, Keluhan Medis & Obat (الصِّحَّةُ وَالأَعْرَاضُ وَالعِلَاج)
  'MFR-L3-05': {
    explanation: {
      conceptTitle: 'Kesehatan Tubuh, Gejala Sakit & Kesembuhan',
      overview: 'Kesehatan adalah mahkota di atas kepala orang sehat. Pelajari kosakata medis: kesehatan prima (صِحَّة), penyakit (مَرَض), penawar obat (دَوَاء), dan doa kesembuhan (شِفَاء).',
      rules: [
        {
          title: 'Doa Menjenguk Orang Sakit',
          explanation: 'Kaidah sunnah penutur asli saat menjenguk: لَا بَأْسَ طَهُورٌ إِنْ شَاءَ اللَّهُ (Lā ba\'sa thahūrun in syā\'a Allāh).',
          exampleAr: 'أَسْأَلُ اللَّهَ العَظِيمَ أَنْ يَشْفِيَكَ',
          exampleTranslit: 'As\'alu Llāha l-ʿaẓīma an yashfiyak',
          exampleId: 'Aku memohon kepada Allah yang Maha Agung agar menyembuhkanmu'
        }
      ],
      hudhudTips: 'Selalu syukuri nikmat kesehatan sebelum datangnya masa sakitmu!'
    },
    highlightVocab: [
      { ar: 'صِحَّة', translit: 'Ṣiḥḥah', id: 'Kebugaran sehat' },
      { ar: 'مَرَض', translit: 'Maraḍ', id: 'Penyakit' },
      { ar: 'دَوَاء', translit: 'Dawāʾ', id: 'Obat penawar' },
      { ar: 'شِفَاء', translit: 'Shifāʾ', id: 'Kesembuhan sempurna' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Kata "دَوَاءٌ" (Dawāʾ) memiliki arti:',
        options: [
          { text: 'Obat penawar sakit', isCorrect: true, feedback: 'Benar! Dawā\' adalah obat pengusir penyakit.' },
          { text: 'Rasa sakit menusuk', isCorrect: false, feedback: 'Rasa sakit adalah Alam (أَلَم).' }
        ]
      }
    ]
  },

  // MFR-L3-06: Hobi, Olahraga & Rekreasi (الهِوَايَاتُ وَالرِّيَاضَةُ وَالتَّرْفِيه)
  'MFR-L3-06': {
    explanation: {
      conceptTitle: 'Hobi, Olahraga & Rekreasi Jiwa',
      overview: 'Akal yang sehat bersemayam pada tubuh yang bugar. Pelajari aktivitas kebugaran: olahraga (رِيَاضَة), sepak bola (كُرَةُ القَدَم), renang (سِبَاحَة), dan seni lukis (رَسْم).',
      rules: [
        {
          title: 'Menyatakan Hobi Favorit',
          explanation: 'Gunakan susunan هِوَايَتِي المُفَضَّلَةُ هِيَ... (Hobby favoritku adalah...).',
          exampleAr: 'هِوَايَتِي المُفَضَّلَةُ هِيَ القِرَاءَةُ وَالسِّبَاحَةُ',
          exampleTranslit: 'Hiwāyatī l-mufaḍḍalatu hiya l-qirāʾatu wa-s-sibāḥah',
          exampleId: 'Hobi favoritku adalah membaca dan berenang'
        }
      ],
      hudhudTips: 'Umar bin Khattab berpesan: Ajarkan anak-anakmu berenang, memanah, dan menunggang kuda!'
    },
    highlightVocab: [
      { ar: 'رِيَاضَة', translit: 'Riyāḍah', id: 'Olahraga tubuh' },
      { ar: 'كُرَةُ القَدَم', translit: 'Kuratu l-qadam', id: 'Sepak bola' },
      { ar: 'سِبَاحَة', translit: 'Sibāḥah', id: 'Renang mengarungi air' },
      { ar: 'رَسْم', translit: 'Rasm', id: 'Seni melukis' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Cabang olahraga apakah yang disebut "سِبَاحَةٌ" (Sibāḥah)?',
        options: [
          { text: 'Berenang di air', isCorrect: true, feedback: 'Tepat sekali! Sibāḥah adalah berenang.' },
          { text: 'Bermain bola kaki', isCorrect: false, feedback: 'Bola kaki adalah Kuratu l-qadam.' }
        ]
      }
    ]
  },

  // =========================================================================
  // LEVEL 4: MUTAWASSITH 2 (B2) - Sains, Digital, Bisnis, Media & Pariwisata
  // =========================================================================

  // MFR-L4-01: Sains, Komputasi & Jagat Digital (العُلُومُ وَالتِّقْنِيَاتُ الرَّقْمِيَّة)
  'MFR-L4-01': {
    explanation: {
      conceptTitle: 'Sains Modern & Jagat Komputasi Digital',
      overview: 'Bahasa Arab hidup beradaptasi dengan era teknologi: komputer (حَاسُوب), telepon pintar (هَاتِف), jaringan internet (شَبَكَة), energi listrik (كَهْرَبَاء), dan perangkat lunak (بَرْنَامَج).',
      rules: [
        {
          title: 'Wazan Ism Alat Modern (فَاعُول)',
          explanation: 'Kata حَاسُوب (komputer) dibentuk dari kata hasaba (menghitung) mengikuti wazan فَاعُول seperti حَاسُوب dan صَارُوخ (roket).',
          exampleAr: 'تَتَّصِلُ الأَجْهِزَةُ بِالشَّبَكَةِ العَالَمِيَّةِ',
          exampleTranslit: 'Tattaṣilu l-ajhizatu bi-sh-shabakati l-ʿālamiyyah',
          exampleId: 'Perangkat terhubung dengan jaringan global internet'
        }
      ],
      hudhudTips: 'Manfaatkan teknologi komputer dan internet untuk menyebarkan ilmu yang bermanfaat ke seluruh penjuru dunia!'
    },
    highlightVocab: [
      { ar: 'حَاسُوب', translit: 'Ḥāsūb', id: 'Komputer digital' },
      { ar: 'هَاتِف', translit: 'Hātif', id: 'Telepon genggam' },
      { ar: 'شَبَكَة', translit: 'Shabakah', id: 'Jaringan internet' },
      { ar: 'كَهْرَبَاء', translit: 'Kahrabāʾ', id: 'Energi listrik' },
      { ar: 'بَرْنَامَج', translit: 'Barnāmaj', id: 'Aplikasi program' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Istilah Arab resmi untuk perangkat komputer adalah:',
        options: [
          { text: 'حَاسُوبٌ (Ḥāsūb)', isCorrect: true, feedback: 'Mumtaz! Ḥāsūb adalah komputer pemroses data.' },
          { text: 'هَاتِفٌ (Hātif)', isCorrect: false, feedback: 'Hātif adalah telepon.' }
        ]
      }
    ]
  },

  // MFR-L4-02: Media Massa, Jurnalistik & Siaran (الإِعْلَامُ وَالصِّحَافَةُ وَالبَثّ)
  'MFR-L4-02': {
    explanation: {
      conceptTitle: 'Media Massa, Pers & Penyiaran Publik',
      overview: 'Pahami berita dan tajuk rencana dunia Arab: koran harian (جَرِيدَة), majalah tematik (مَجَلَّة), warta berita (أَخْبَار), dan saluran penyiaran (قَنَاة).',
      rules: [
        {
          title: 'Gaya Bahasa Berita (Uslub Jurnalistik)',
          explanation: 'Media Arab menggunakan ragam fusha modern yang lugas, mengedepankan objektivitas fakta dan keakuratan verifikasi sumber (المَصَادِر).',
          exampleAr: 'نَشَرَتِ الجَرِيدَةُ خَبَرًا هَامًّا اليَوْمَ',
          exampleTranslit: 'Nasharati l-jarīdatu khabaran hāmman al-yawm',
          exampleId: 'Surat kabar menerbitkan berita penting hari ini'
        }
      ],
      hudhudTips: 'Tabayyun-lah (periksa kebenaran informasi) sebelum mempercayai atau membagikan berita!'
    },
    highlightVocab: [
      { ar: 'جَرِيدَة', translit: 'Jarīdah', id: 'Surat kabar harian' },
      { ar: 'مَجَلَّة', translit: 'Majallah', id: 'Majalah berkala' },
      { ar: 'أَخْبَار', translit: 'Akhbār', id: 'Warta berita' },
      { ar: 'قَنَاة', translit: 'Qanāh', id: 'Saluran siaran TV' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Kata "جَرِيدَةٌ" (Jarīdah) bermakna:',
        options: [
          { text: 'Koran / surat kabar berita', isCorrect: true, feedback: 'Benar! Jarīdah adalah koran harian.' },
          { text: 'Buku dongeng', isCorrect: false, feedback: 'Buku dongeng adalah Qishshah.' }
        ]
      }
    ]
  },

  // MFR-L4-03: Dunia Bisnis, Kantor & Manajemen (الأَعْمَالُ وَالشَّرِكَاتُ وَالإِدَارَة)
  'MFR-L4-03': {
    explanation: {
      conceptTitle: 'Ekosistem Bisnis, Perusahaan & Manajemen',
      overview: 'Masuki dunia profesional korporasi: entitas perseroan (شَرِكَة), kepengurusan manajemen (إِدَارَة), pimpinan direktur (مُدِير), dan perbankan (مَصْرِف).',
      rules: [
        {
          title: 'Istilah Kepemimpinan Kantor',
          explanation: 'Kata مُدِير berasal dari kata dāra (berputar/menggerakkan roda organisasi), menggambarkan sosok pemimpin penggerak tim.',
          exampleAr: 'عَقَدَ المَدِيرُ اجْتِمَاعًا مَعَ المُمَثِّلِينَ',
          exampleTranslit: '\'Aqada l-mudīru jtimāʿan maʿa l-mumaththilīn',
          exampleId: 'Direktur mengadakan rapat koordinasi'
        }
      ],
      hudhudTips: 'Amanah dalam pekerjaan kantor adalah kunci keberkahan rezeki keluarga!'
    },
    highlightVocab: [
      { ar: 'شَرِكَة', translit: 'Sharikah', id: 'Perusahaan korporasi' },
      { ar: 'إِدَارَة', translit: 'Idārah', id: 'Manajemen kantor' },
      { ar: 'مُدِير', translit: 'Mudīr', id: 'Direktur / pimpinan' },
      { ar: 'مَصْرِف', translit: 'Maṣrif', id: 'Bank sentral keuangan' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Apakah sebutan bagi lembaga perbankan dalam bahasa Arab?',
        options: [
          { text: 'مَصْرِفٌ (Maṣrif)', isCorrect: true, feedback: 'Tepat! Maṣrif atau Bank adalah lembaga keuangan.' },
          { text: 'شَرِكَةٌ (Sharikah)', isCorrect: false, feedback: 'Sharikah adalah perusahaan umum.' }
        ]
      }
    ]
  },

  // MFR-L4-04: Lingkungan Hidup, Ekologi & Energi (البِيئَةُ وَالإِيكُولُوجِيَا وَالطَّاقَة)
  'MFR-L4-04': {
    explanation: {
      conceptTitle: 'Konservasi Lingkungan Hidup & Transisi Energi',
      overview: 'Bumi adalah amanah khalifah: menjaga kelestarian lingkungan (بِيئَة), mencegah polusi (تَلَوُّث), dan mengembangkan energi baru terbarukan (طَاقَة مُتَجَدِّدَة).',
      rules: [
        {
          title: 'Frasa Ekologi Arab Modern',
          explanation: 'Istilah حِمَايَةُ البِيئَةِ (ḥimāyatu l-bīʾah = perlindungan lingkungan) menjadi agenda global di negara-negara Timur Tengah.',
          exampleAr: 'نَحْنُ بِحَاجَةٍ إِلَى طَاقَةٍ نَظِيفَةٍ مُتَجَدِّدَةٍ',
          exampleTranslit: 'Naḥnu bi-ḥājatin ilā ṭāqatin naẓīfatin mutajaddidah',
          exampleId: 'Kita membutuhkan energi bersih terbarukan'
        }
      ],
      hudhudTips: 'Menanam satu pohon yang buahnya dimakan burung bernilai sedekah jariah yang agung!'
    },
    highlightVocab: [
      { ar: 'بِيئَة', translit: 'Bīʾah', id: 'Lingkungan alam' },
      { ar: 'تَلَوُّث', translit: 'Talawwuth', id: 'Polusi pencemaran' },
      { ar: 'طَاقَةٌ مُتَجَدِّدَة', translit: 'Ṭāqatun mutajaddidah', id: 'Energi terbarukan' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Kata "تَلَوُّثٌ" (Talawwuth) memiliki arti:',
        options: [
          { text: 'Pencemaran / polusi lingkungan', isCorrect: true, feedback: 'Benar! Talawwuth adalah polusi.' },
          { text: 'Penghijauan hutan', isCorrect: false, feedback: 'Penghijauan adalah Tashjīr.' }
        ]
      }
    ]
  },

  // MFR-L4-05: Idiom & Ungkapan Bahasa Populer (التَّعَابِيرُ الاِصْطِلَاحِيَّةُ وَالأَمْثَال)
  'MFR-L4-05': {
    explanation: {
      conceptTitle: 'Idiom & Ungkapan Metaforis Bahasa Arab',
      overview: 'Idiom memberikan rasa seni pada tutur lisan: bergandengan tangan kompak (يَدًا بِيَد), ketulusan dari lubuk hati (مِنْ صَمِيمِ القَلْب), dan kepasrahan lapang dada.',
      rules: [
        {
          title: 'Makna Idiomatik vs Makna Harfiah',
          explanation: 'Idiom tidak dapat diterjemahkan kata per kata secara kaku, melainkan harus dipahami pesan kiasan kultural di baliknya.',
          exampleAr: 'تَعَاوَنَّا يَدًا بِيَدٍ لِبِنَاءِ المَسْجِدِ',
          exampleTranslit: 'Taʿāwannā yadan bi-yadin li-bināʾi l-masjid',
          exampleId: 'Kami bahu-membahu bergandengan tangan membangun masjid'
        }
      ],
      hudhudTips: 'Menggunakan idiom tepat pada tempatnya membuat ucapanmu terdengar sangat fasih seperti sastrawan tulen!'
    },
    highlightVocab: [
      { ar: 'يَدًا بِيَد', translit: 'Yadan bi-yad', id: 'Bergandengan tangan kompak' },
      { ar: 'مِنْ صَمِيمِ القَلْب', translit: 'Min ṣamīmi l-qalb', id: 'Dari lubuk hati terdalam' },
      { ar: 'عَلَى كُلِّ حَال', translit: 'ʿAlā kulli ḥāl', id: 'Bagaimanapun keadaannya' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Apa makna ungkapan kiasan "يَدًا بِيَدٍ" (yadan bi-yad)?',
        options: [
          { text: 'Bekerja sama bahu-membahu dengan solid', isCorrect: true, feedback: 'Mumtaz! Menggambarkan persatuan dan solidaritas.' },
          { text: 'Berjabat tangan saat berpisah saja', isCorrect: false, feedback: 'Bukan sekadar salaman biasa.' }
        ]
      }
    ]
  },

  // MFR-L4-06: Pariwisata, Tiket & Perjalanan Udara (السِّيَاحَةُ وَالفَنَادِقُ وَالسَّفَر)
  'MFR-L4-06': {
    explanation: {
      conceptTitle: 'Prosedur Bandara, Paspor & Perjalanan Wisata',
      overview: 'Mengarungi dunia antarbangsa memerlukan dokumen resmi: buku paspor pas lintas batas (جَوَازُ السَّفَر), visa izin tinggal (تَأْشِيرَة), dan tiket penerbangan (تَذْكِرَة).',
      rules: [
        {
          title: 'Pemeriksaan Imigrasi Bandara',
          explanation: 'Di konter imigrasi, petugas akan menanyakan: أَرِنِي جَوَازَ سَفَرِكَ مِنْ فَضْلِكَ (Perlihatkan paspormu, tolong).',
          exampleAr: 'حَجَزْتُ تَذْكِرَةَ الطَّائِرَةِ إِلَى مَكَّةَ',
          exampleTranslit: 'Ḥajaztu tadhkirata ṭ-ṭāʾirati ilā Makkah',
          exampleId: 'Saya telah memesan tiket penerbangan ke Makkah'
        }
      ],
      hudhudTips: 'Simpan paspor dan dokumen perjalananmu di tempat yang aman dan mudah dijangkau saat bepergian!'
    },
    highlightVocab: [
      { ar: 'جَوَازُ السَّفَر', translit: 'Jawāzu s-safar', id: 'Paspor perjalanan' },
      { ar: 'تَأْشِيرَة', translit: 'Taʾshīrah', id: 'Visa izin kunjungan' },
      { ar: 'تَذْكِرَة', translit: 'Tadhkirah', id: 'Tiket penerbangan' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Apakah dokumen resmi yang disebut "جَوَازُ السَّفَرِ"?',
        options: [
          { text: 'Buku paspor antarnegara', isCorrect: true, feedback: 'Tepat! Jawāz as-safar adalah paspor.' },
          { text: 'Kuitansi hotel', isCorrect: false, feedback: 'Kuitansi adalah Fātūrah.' }
        ]
      }
    ]
  },

  // =========================================================================
  // LEVEL 5: MUTAQADDIM (C1-C2) - Taraduf, Diplomasi, Sastra, Filsafat & Turats
  // =========================================================================

  // MFR-L5-01: Presisi Nuansa Sinonim / Taraduf (الفُرُوقُ اللُّغَوِيَّةُ وَالتَّرَادُفُ الدَّقِيق)
  'MFR-L5-01': {
    explanation: {
      conceptTitle: 'Ketelitian Rasa Bahasa: Furūq Lughawiyyah & Tarāduf',
      overview: 'Puncak kemahiran bahasa Arab adalah memahami bahwa tidak ada dua kata yang seratus persen sama persis. Setiap sinonim memiliki nuansa semantik rahasia yang berbeda.',
      rules: [
        {
          title: 'Farah (فَرَح) vs Surur (سُرُور)',
          explanation: 'فَرَح adalah kegembiraan spontan yang tampak di wajah dan gerak tubuh, sedangkan سُرُور adalah kebahagiaan batin yang tenang dan menetap di lubuk hati.',
          exampleAr: 'الفَرَحُ ظَاهِرٌ وَالسُّرُورُ فِي البَاطِنِ',
          exampleTranslit: 'Al-faraḥu ẓāhirun wa-s-surūru fī l-bāṭin',
          exampleId: 'Farah tampak lahiriah, surur tenang di batin'
        },
        {
          title: 'Mathar (مَطَر) vs Ghayth (غَيْث)',
          explanation: 'Di dalam Al-Qur\'an, مَطَر sering berkonotasi hujan biasa atau azab batu bagi kaum durhaka, sedangkan غَيْث adalah hujan rahmat penyelamat kekeringan.',
          exampleAr: 'وَهُوَ الَّذِي يُنَزِّلُ الغَيْثَ مِنْ بَعْدِ مَا قَنَطُوا',
          exampleTranslit: 'Wa-huwa lladhī yunazzilu l-ghaytha min baʿdi mā qanaṭū',
          exampleId: 'Dialah yang menurunkan hujan rahmat penolong keputusasaan'
        }
      ],
      hudhudTips: 'Kitab Al-Furuq al-Lughawiyyah karya Abu Hilal al-Askari adalah rujukan utama mutiara rasa bahasa ini!'
    },
    highlightVocab: [
      { ar: 'فَرَح / سُرُور', translit: 'Faraḥ vs Surūr', id: 'Gembira lahiriah vs Bahagia batin' },
      { ar: 'مَطَر / غَيْث', translit: 'Maṭar vs Ghayth', id: 'Hujan umum/azab vs Hujan rahmat' },
      { ar: 'جَلَسَ / قَعَدَ', translit: 'Jalasa vs Qaʿada', id: 'Duduk dari rebahan vs Duduk dari berdiri' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Apakah perbedaan nuansa makna antara kata "فَرَح" dan "سُرُور"?',
        options: [
          { text: 'Farah adalah kegembiraan lahiriah spontan, sedangkan Surur adalah kebahagiaan batin yang tenang', isCorrect: true, feedback: 'Mumtaz! Inilah ketelitian rasa bahasa sastrawan klasik.' },
          { text: 'Kedua kata itu persis sama tidak ada bedanya sama sekali', isCorrect: false, feedback: 'Bahasa Arab tinggi memiliki perbedaan nuansa pada setiap kata.' }
        ]
      }
    ]
  },

  // MFR-L5-02: Diplomasi, Hukum Internasional & Protokol (الدِّبْلُومَاسِيَّةُ وَالقَانُونُ الدَّوْلِيّ)
  'MFR-L5-02': {
    explanation: {
      conceptTitle: 'Diplomasi Antarbangsa, Hukum Publik & Protokol',
      overview: 'Bahasa Arab adalah salah satu dari 6 bahasa resmi Perserikatan Bangsa-Bangsa (PBB). Kuasai leksikon diplomasi: kedutaan (سِفَارَة), duta besar (سَفِير), traktat (مُعَاهَدَة), dan kedaulatan (سِيَادَة).',
      rules: [
        {
          title: 'Terminologi Kedaulatan Negara',
          explanation: 'Kata سِيَادَة bermakna kedaulatan tertinggi suatu negara yang tidak boleh diintervensi oleh kekuatan asing.',
          exampleAr: 'احْتِرَامُ سِيَادَةِ الدُّوَلِ مَبْدَأٌ أَسَاسِيٌّ فِي القَانُونِ الدَّوْلِيِّ',
          exampleTranslit: 'Iḥtirāmu siyādati d-duwali mabdaʾun asāsiyyun fī l-qānūni d-dawliyy',
          exampleId: 'Menghormati kedaulatan negara adalah asas fundamental hukum internasional'
        }
      ],
      hudhudTips: 'Diplomasi Islam dibangun atas dasar pemenuhan janji (Wafā\' bil-\'Uhūd) dan keadilan universal.'
    },
    highlightVocab: [
      { ar: 'سِفَارَة', translit: 'Sifārah', id: 'Kedutaan besar' },
      { ar: 'سَفِير', translit: 'Safīr', id: 'Duta besar perunding' },
      { ar: 'مُعَاهَدَةٌ دَوْلِيَّة', translit: 'Muʿāhadatun dawliyyah', id: 'Traktat perjanjian internasional' },
      { ar: 'سِيَادَة', translit: 'Siyādah', id: 'Kedaulatan negara' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Gelar diplomatik tertinggi perwakilan suatu negara di negara sahabat adalah:',
        options: [
          { text: 'سَفِيرٌ (Safīr - Duta Besar)', isCorrect: true, feedback: 'Tepat! Safīr adalah duta besar luar biasa.' },
          { text: 'تَاجِرٌ (Tājir - Saudagar)', isCorrect: false, feedback: 'Tājir adalah pedagang.' }
        ]
      }
    ]
  },

  // MFR-L5-03: Sastra Arab, Estetika & Balaghah (الأَدَبُ وَالبَلَاغَةُ وَالفُنُونُ النَّثْرِيَّة)
  'MFR-L5-03': {
    explanation: {
      conceptTitle: 'Estetika Sastra Arab, Puisi & Balaghah',
      overview: 'Masuki samudra keindahan retorika bahasa Arab: qasidah syair klasik (قَصِيدَة), metafora peminjaman makna (اِسْتِعَارَة), kiasan halus (كِنَايَة), dan rima prosa berima (سَجْع).',
      rules: [
        {
          title: 'Ilmu Bayan: Isti\'arah (Metafora)',
          explanation: 'Isti\'arah adalah penyerupaan (tasybih) yang dibuang salah satu unsurnya (musyabbah atau musyabbah bih) untuk menciptakan daya puitis yang dahsyat.',
          exampleAr: 'رَأَيْتُ أَسَدًا يَخْطُبُ عَلَى المِنْبَرِ (maknanya: penceramah pemberani)',
          exampleTranslit: 'Ra\'aytu asadan yakhṭubu ʿalā l-minbar',
          exampleId: 'Aku melihat singa berkhutbah di mimbar (metafora penceramah gagah)'
        }
      ],
      hudhudTips: 'Bacalah syair Diwan Imam Syafi\'i untuk meresapi kebijaksanaan hidup dalam bait-bait sastra yang anggun!'
    },
    highlightVocab: [
      { ar: 'شِعْر', translit: 'Shiʿr', id: 'Puisi berima' },
      { ar: 'قَصِيدَة', translit: 'Qaṣīdah', id: 'Karya puisi utuh' },
      { ar: 'اِسْتِعَارَة', translit: 'Istiʿārah', id: 'Metafora balaghah' },
      { ar: 'كِنَايَة', translit: 'Kināyah', id: 'Kiasan makna tersirat' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Gaya bahasa balaghah yang meminjam nama suatu objek untuk menyifati objek lain disebut:',
        options: [
          { text: 'اِسْتِعَارَةٌ (Istiʿārah - Metafora)', isCorrect: true, feedback: 'Benar sekali! Isti\'arah adalah metafora tingkat tinggi.' },
          { text: 'سَجْعٌ (Sajʿ)', isCorrect: false, feedback: 'Saj\' adalah rima akhir kalimat prosa.' }
        ]
      }
    ]
  },

  // MFR-L5-04: Filsafat, Pemikiran Kritis & Peradaban (الفِكْرُ وَالفَلْسَفَةُ وَالحَضَارَة)
  'MFR-L5-04': {
    explanation: {
      conceptTitle: 'Filsafat, Pemikiran Kritis & Sejarah Peradaban',
      overview: 'Jejak emas ilmuwan muslim masa Baitul Hikmah: filsafat kebijaksanaan (فَلْسَفَة), pembuktian argumentatif demonstratif (بُرْهَان), nalar logika (مَنْطِق), dan peradaban luhur (حَضَارَة).',
      rules: [
        {
          title: 'Metode Burhani Ibnu Rusyd',
          explanation: 'Metode Burhani mengandalkan silogisme logis dan bukti empiris rasional yang tidak terbantahkan, berbeda dengan retorika persuasif (khatabi).',
          exampleAr: 'الدَّلِيلُ البُرْهَانِيُّ لَا يَتَطَرَّقُ إِلَيْهِ الشَّكُّ',
          exampleTranslit: 'Ad-dalīlu l-burhāniyyu lā yataṭarraqu ilayhi sh-shakk',
          exampleId: 'Bukti demonstratif burhani tidak dapat disusupi keraguan'
        }
      ],
      hudhudTips: 'Peradaban Islam berjaya karena memadukan wahyu ilahi dengan pencarian akal budi yang merdeka dan kritis!'
    },
    highlightVocab: [
      { ar: 'فَلْسَفَة', translit: 'Falsafah', id: 'Filsafat kearifan' },
      { ar: 'بُرْهَان', translit: 'Burhān', id: 'Argumen bukti konklusif' },
      { ar: 'حَضَارَة', translit: 'Ḥaḍārah', id: 'Peradaban manusia' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Tingkatan dalil rasional tertinggi yang menghasilkan keyakinan mutlak dinamai:',
        options: [
          { text: 'البُرْهَانُ (Al-Burhān)', isCorrect: true, feedback: 'Mumtaz! Burhān adalah dalil demonstratif tertinggi.' },
          { text: 'الظَّنُّ (Aẓ-Ẓann - Dugaan)', isCorrect: false, feedback: 'Ẓann hanyalah asumsi relatif.' }
        ]
      }
    ]
  },

  // MFR-L5-05: Ekonomi Makro, Pasar Modal & Moneter (الاِقْتِصَادُ الكُلِّيُّ وَالأَسْوَاقُ المَالِيَّة)
  'MFR-L5-05': {
    explanation: {
      conceptTitle: 'Ekonomi Makro, Pasar Modal & Teori Moneter',
      overview: 'Kuasai diskursus ekonomi global dalam bahasa Arab: sistem ekonomi (اِقْتِصَاد), laju inflasi harga (تَضَخُّم), bursa efek surat berharga (أَسْوَاق مَالِيَّة), dan peredaran moneter berkeadilan.',
      rules: [
        {
          title: 'Prinsip Ekonomi Islam Tanpa Riba & Gharar',
          explanation: 'Ekonomi syariah berlandaskan sektor riil dan pembagian risiko (risk sharing) tanpa spekulasi perjudian (maysir) maupun ketidakpastian manipulatif (gharar).',
          exampleAr: 'تَهْدِفُ السِّيَاسَةُ النَّقْدِيَّةُ إِلَى اسْتِقْرَارِ الأَسْعَارِ',
          exampleTranslit: 'Tahdifu s-siyāsatu n-naqdiyyatu ilā stiqrāri l-asʿār',
          exampleId: 'Kebijakan moneter bertujuan menjaga stabilitas harga riil'
        }
      ],
      hudhudTips: 'Konsep zakat dan wakaf produktif adalah instrumen pemerataan ekonomi terhebat sepanjang sejarah peradaban!'
    },
    highlightVocab: [
      { ar: 'اِقْتِصَاد', translit: 'Iqtiṣād', id: 'Tata kelola ekonomi' },
      { ar: 'تَضَخُّم', translit: 'Taḍakhkhum', id: 'Laju inflasi harga' },
      { ar: 'أَسْوَاقٌ مَالِيَّة', translit: 'Aswāqun māliyyah', id: 'Bursa pasar modal' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Istilah moneter Arab untuk fenomena inflasi kenaikan harga adalah:',
        options: [
          { text: 'تَضَخُّمٌ (Taḍakhkhum)', isCorrect: true, feedback: 'Benar! Taḍakhkhum adalah inflasi.' },
          { text: 'اِسْتِثْمَارٌ (Istithmār)', isCorrect: false, feedback: 'Istithmār adalah investasi penanaman modal.' }
        ]
      }
    ]
  },

  // MFR-L5-06: Khazanah Kosa Kata Klasik Turats & Qur'ani (مُفْرَدَاتُ التُّرَاثِ وَالبَيَانِ القُرْآنِيّ)
  'MFR-L5-06': {
    explanation: {
      conceptTitle: 'Leksikon Al-Qur\'an & Khazanah Klasik Turats',
      overview: 'Puncak perbendaharaan kata luhur yang menembus zaman: pembeda hakiki (فُرْقَان), kearifan hikmah (حِكْمَة), kemenangan sejati (فَلَاح), dan ketenangan batin ilahiah (سَكِينَة).',
      rules: [
        {
          title: 'Kemukjizatan Pilihan Kata (I\'jaz al-Alfazh)',
          explanation: 'Setiap kata dalam Al-Qur\'an ditempatkan dengan presisi mutlak yang tidak dapat digantikan oleh kata lain tanpa mengurangi kedalaman maknanya.',
          exampleAr: 'هُوَ الَّذِي أَنْزَلَ السَّكِينَةَ فِي قُلُوبِ المُؤْمِنِينَ',
          exampleTranslit: 'Huwa lladhī anzala s-sakīnata fī qulūbi l-muʾminīn',
          exampleId: 'Dialah yang menurunkan sakinah (ketenteraman ilahi) ke dalam hati kaum mukminin'
        }
      ],
      hudhudTips: 'Selamat! Menguasai unit ini menandakan kamu telah mengumpulkan seluruh kekayaan kosa kata emas di Pasar Mufradat!'
    },
    highlightVocab: [
      { ar: 'فُرْقَان', translit: 'Furqān', id: 'Pembeda haq dan bathil' },
      { ar: 'حِكْمَة', translit: 'Ḥikmah', id: 'Kearifan mendalam' },
      { ar: 'سَكِينَة', translit: 'Sakīnah', id: 'Ketenangan batin ilahi' }
    ],
    questions: [
      {
        id: 'q1',
        question: 'Kata "فُرْقَانٌ" (Furqān) yang disematkan kepada kitab suci Al-Qur\'an bermakna:',
        options: [
          { text: 'Pembeda yang terang benderang antara kebenaran (haq) dan kebatilan', isCorrect: true, feedback: 'Mumtaz! Furqān adalah pembeda hakiki jalan petunjuk.' },
          { text: 'Kumpulan cerita fiktif zaman kuno', isCorrect: false, feedback: 'Al-Qur\'an adalah wahyu ilahi yang hak.' }
        ]
      }
    ]
  }
};
