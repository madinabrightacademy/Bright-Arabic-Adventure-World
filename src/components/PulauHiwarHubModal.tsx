import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Play, Volume2, Award, BookOpen, CheckCircle2, ChevronRight, Star, Heart, MessageSquare, Compass, ShieldCheck, RefreshCw, MessageCircle } from 'lucide-react';
import { UserProfile, Island, DialogueNode } from '../types/game';
import { sound } from '../services/sound';
import { GameStorage } from '../services/storage';
import { DIALOGUES_DATA } from '../data/curriculum';
import { IslandModalLayout } from './IslandModalLayout';

interface PulauHiwarHubModalProps {
  island: Island;
  profile: UserProfile;
  onClose: () => void;
  onLaunchGame: (gameId: string) => void;
  onReward: (xp: number, stars: number) => void;
}

interface FunctionalPhrase {
  id: string;
  level: number;
  levelLabel: string;
  category: string;
  ar: string;
  translit: string;
  id_translation: string;
  context: string;
  replyAr: string;
  replyTranslit: string;
  replyId: string;
}

const PHRASE_BOOK: FunctionalPhrase[] = [
  // Level 0: Tamhidi (Pra-A1)
  {
    id: 'h1',
    level: 0,
    levelLabel: 'L0 • Tamhidi',
    category: 'Salam & Sapaan',
    ar: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ',
    translit: 'As-salāmu ʿalaykum wa-raḥmatu Llāhi wa-barakātuh',
    id_translation: 'Semoga keselamatan, rahmat Allah, dan berkah-Nya tercurah atas kalian',
    context: 'Ucapan salam pembuka islami penuh doa keselamatan',
    replyAr: 'وَعَلَيْكُمُ السَّلَامُ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ',
    replyTranslit: 'Wa-ʿalaykumu s-salāmu wa-raḥmatu Llāhi wa-barakātuh',
    replyId: 'Dan atas kalian keselamatan, rahmat Allah, dan berkah-Nya'
  },
  {
    id: 'h2',
    level: 0,
    levelLabel: 'L0 • Tamhidi',
    category: 'Salam & Sapaan',
    ar: 'صَبَاحَ الخَيْرِ',
    translit: 'Ṣabāḥa l-khayr',
    id_translation: 'Selamat pagi!',
    context: 'Sapaan hangat di pagi hari saat menyapa tetangga atau teman',
    replyAr: 'صَبَاحَ النُّورِ وَالسُّرُورِ',
    replyTranslit: 'Ṣabāḥa n-nūri wa-s-surūr',
    replyId: 'Selamat pagi yang bercahaya dan penuh sukacita!'
  },
  {
    id: 'h3',
    level: 0,
    levelLabel: 'L0 • Tamhidi',
    category: 'Perkenalan & Asal',
    ar: 'مَا اسْمُكَ؟ — اِسْمِي طَالِبٌ مُجْتَهِدٌ',
    translit: 'Mā ismuka? — Ismī ṭālibun mujtahid',
    id_translation: 'Siapa namamu? — Namaku penuntut ilmu yang tekun',
    context: 'Perkenalan nama pertama kali bertemu',
    replyAr: 'أَهْلًا وَسَهْلًا! تَشَرَّفْنَا بِمَعْرِفَتِكَ!',
    replyTranslit: 'Ahlan wa sahlan! Tasyarrafnā bi-maʿrifatik!',
    replyId: 'Selamat datang! Suatu kehormatan berkenalan denganmu!'
  },
  {
    id: 'h4',
    level: 0,
    levelLabel: 'L0 • Tamhidi',
    category: 'Perpisahan & Doa',
    ar: 'مَعَ السَّلَامَةِ، إِلَى اللِّقَاءِ قَرِيبًا!',
    translit: 'Maʿa s-salāmah, ilā l-liqāʾi qarībā!',
    id_translation: 'Selamat jalan, sampai jumpa lagi segera!',
    context: 'Berpamitan saat mengakhiri pertemuan persahabatan',
    replyAr: 'فِي أَمَانِ اللَّهِ وَحِفْظِهِ وَرِعَايَتِهِ!',
    replyTranslit: 'Fī amāni Llāhi wa-ḥifẓihi wa-riʿāyatih!',
    replyId: 'Dalam lindungan, pemeliharaan, dan penjagaan Allah!'
  },

  // Level 1: Mubtadi' 1 (A1.1)
  {
    id: 'h5',
    level: 1,
    levelLabel: 'L1 • Mubtadi 1',
    category: 'Kabar & Silaturahmi',
    ar: 'كَيْفَ حَالُكَ اليَوْمَ؟',
    translit: 'Kayfa ḥāluka l-yawm?',
    id_translation: 'Bagaimana kabarmu hari ini?',
    context: 'Menanyakan kabar kondisi kesehatan sahabat',
    replyAr: 'الحَمْدُ لِلَّهِ، أَنَا بِخَيْرٍ وَعَافِيَةٍ!',
    replyTranslit: 'Al-ḥamdu lillāh, anā bi-khayrin wa-ʿāfiyah!',
    replyId: 'Segala puji bagi Allah, saya sehat wal afiat!'
  },
  {
    id: 'h6',
    level: 1,
    levelLabel: 'L1 • Mubtadi 1',
    category: 'Kesantunan & Syukur',
    ar: 'جَزَاكَ اللَّهُ خَيْرًا وَبَارَكَ فِيكَ',
    translit: 'Jazāka Llāhu khayran wa-bāraka fīka',
    id_translation: 'Semoga Allah membalasmu dengan kebaikan dan memberkahimu',
    context: 'Ucapan terima kasih tertinggi dalam adab Islam',
    replyAr: 'وَإِيَّاكَ، وَفِيكَ بَارَكَ اللَّهُ!',
    replyTranslit: 'Wa-iyyāk, wa-fīka bāraka Llāh!',
    replyId: 'Dan kepadamu juga, semoga Allah memberkahimu!'
  },
  {
    id: 'h7',
    level: 1,
    levelLabel: 'L1 • Mubtadi 1',
    category: 'Kesantunan & Syukur',
    ar: 'عَفْوًا، مِنْ فَضْلِكَ / لَوْ سَمَحْتَ',
    translit: 'ʿAfwan, min faḍlika / law samaḥta',
    id_translation: 'Permisi / tolong / jika Anda berkenan',
    context: 'Frasa santun sebelum meminta bantuan orang lain',
    replyAr: 'تَفَضَّلْ، بِكُلِّ سُرُورٍ وَعَلَى الرَّأْسِ وَالعَيْنِ!',
    replyTranslit: 'Tafaḍḍal, bi-kulli surūrin wa-ʿalā r-raʾsi wa-l-ʿayn!',
    replyId: 'Silakan, dengan senang hati dan penuh penghormatan!'
  },
  {
    id: 'h8',
    level: 1,
    levelLabel: 'L1 • Mubtadi 1',
    category: 'Perkenalan & Asal',
    ar: 'مِنْ أَيْنَ أَنْتَ؟ — أَنَا مِنْ إِنْدُونِيسِيَا',
    translit: 'Min ayna anta? — Anā min Indūnīsiyā',
    id_translation: 'Dari mana asalmu? — Saya dari Indonesia',
    context: 'Menjelaskan asal negara atau kota domisili',
    replyAr: 'مَرْحَبًا بِأَهْلِ إِنْدُونِيسِيَا الكِرَامِ!',
    replyTranslit: 'Marḥaban bi-ahli Indūnīsiyā l-kirām!',
    replyId: 'Selamat datang wahai saudaraku dari Indonesia yang mulia!'
  },

  // Level 2: Mubtadi' 2 (A1.2)
  {
    id: 'h9',
    level: 2,
    levelLabel: 'L2 • Mubtadi 2',
    category: 'Arah & Navigasi',
    ar: 'أَيْنَ المَسْجِدُ الجَامِعُ؟ — اِتَّجِهْ إِلَى اليَمِينِ ثُمَّ أَمَامًا',
    translit: 'Ayna l-masjidu l-jāmiʿ? — Ittajih ilā l-yamīn thumma amāmā',
    id_translation: 'Di mana masjid agung? — Beloklah ke kanan lalu lurus ke depan',
    context: 'Petunjuk arah navigasi jalan kota Kampung Hiwar',
    replyAr: 'شُكْرًا لَكَ، جَزَاكَ اللَّهُ عَنِّي خَيْرَ الجَزَاءِ!',
    replyTranslit: 'Syukran laka, jazāka Llāhu ʿannī khayra l-jazāʾ!',
    replyId: 'Terima kasih banyak, semoga Allah membalasmu dengan balasan terbaik!'
  },
  {
    id: 'h10',
    level: 2,
    levelLabel: 'L2 • Mubtadi 2',
    category: 'Pasar & Kuliner',
    ar: 'بِكَمْ هٰذَا التَّمْرُ؟ — هٰذَا بِعَشَرَةِ دَنَانِيرَ لِلْكِيلُو',
    translit: 'Bikam hādhā t-tamr? — Hādhā bi-ʿasyarati danānīra li-l-kīlū',
    id_translation: 'Berapa harga kurma ini? — Ini seharga sepuluh dinar per kilo',
    context: 'Transaksi jual beli kurma di pasar Kampung Hiwar',
    replyAr: 'تَفَضَّلِ النُّقُودَ، بَارَكَ اللَّهُ فِي تِجَارَتِكَ وَرِزْقِكَ!',
    replyTranslit: 'Tafaḍḍali n-nuqūda, bāraka Llāhu fī tijāratika wa-rizqik!',
    replyId: 'Silakan uangnya, semoga Allah memberkahi perniagaan dan rezekimu!'
  },
  {
    id: 'h11',
    level: 2,
    levelLabel: 'L2 • Mubtadi 2',
    category: 'Pasar & Kuliner',
    ar: 'أَيْنَ قَائِمَةُ الطَّعَامِ؟ أُرِيدُ شَايًا بِالنَّعْنَاعِ دَافِئًا',
    translit: 'Ayna qāʾimatu ṭ-ṭaʿām? Urīdu syāyan bi-n-naʿnāʿi dāfiʾan',
    id_translation: 'Di mana buku menu? Saya ingin secangkir teh mint hangat',
    context: 'Pemesanan minuman hangat di Kafe Al-Kautsar',
    replyAr: 'حَاضِرٌ يَا سَيِّدِي، هَنِيئًا مَرِيئًا لَكَ!',
    replyTranslit: 'Ḥāḍirun yā sayyidī, hanīʾan marīʾan lak!',
    replyId: 'Segera disiapkan tuan, selamat menikmati berkah kelezatan!'
  },
  {
    id: 'h12',
    level: 2,
    levelLabel: 'L2 • Mubtadi 2',
    category: 'Keluarga & Silaturahmi',
    ar: 'هٰذَا أَبِي وَهٰذِهِ أُمِّي، أَهْلًا بِكُمْ فِي بَيْتِنَا',
    translit: 'Hādhā abī wa-hādhihi ummī, ahlan bikum fī baytinā',
    id_translation: 'Ini ayahku dan ini ibuku, selamat datang di rumah kami',
    context: 'Memperkenalkan anggota keluarga kepada tamu yang bersilaturahmi',
    replyAr: 'بَارَكَ اللَّهُ فِي أَهْلِكَ وَدَارِكَ الكَرِيمَةِ!',
    replyTranslit: 'Bāraka Llāhu fī ahlika wa-dārika l-karīmah!',
    replyId: 'Semoga Allah memberkahi keluargamu dan rumahmu yang mulia!'
  },

  // Level 3: Mutawassith 1 (A2.1)
  {
    id: 'h13',
    level: 3,
    levelLabel: 'L3 • Mutawassith 1',
    category: 'Medis & Kesehatan',
    ar: 'أَشْعُرُ بِأَلَمٍ حَادٍّ فِي رَأْسِي وَحَرَارَةٍ مُرْتَفِعَةٍ',
    translit: 'Asyʿuru bi-alamin ḥāddin fī raʾsī wa-ḥarāratin murtafiʿah',
    id_translation: 'Saya merasa sakit berdenyut di kepala dan demam panas',
    context: 'Menyampaikan keluhan penyakit kepada dokter di klinik',
    replyAr: 'لَا بَأْسَ طَهُورٌ إِنْ شَاءَ اللَّهُ، تَنَاوَلْ هٰذَا الدَّوَاءَ',
    replyTranslit: 'Lā baʾsa ṭahūrun in syāʾa Llāh, tanāwal hādhā d-dawāʾ',
    replyId: 'Semoga lekas sembuh pensuci dosa insya Allah, minumlah obat ini'
  },
  {
    id: 'h14',
    level: 3,
    levelLabel: 'L3 • Mutawassith 1',
    category: 'Bandara & Perjalanan',
    ar: 'أَيْنَ بَوَّابَةُ الصُّعُودِ إِلَى الطَّائِرَةِ رَقْمُ ٧؟',
    translit: 'Ayna bawwābatu ṣ-ṣuʿūdi ilā ṭ-ṭāʾirati raqmu sabʿah?',
    id_translation: 'Di manakah gerbang keberangkatan pesawat nomor 7?',
    context: 'Bertanya letak gerbang boarding kepada petugas bandara',
    replyAr: 'فِي نِهَايَةِ المَمَرِّ عَلَى اليَسَارِ، رِحْلَةً سَعِيدَةً!',
    replyTranslit: 'Fī nihāyati l-mamarri ʿalā l-yasār, riḥlatan saʿīdah!',
    replyId: 'Di ujung lorong sebelah kiri, selamat menikmati perjalanan!'
  },
  {
    id: 'h15',
    level: 3,
    levelLabel: 'L3 • Mutawassith 1',
    category: 'Perpustakaan & Riset',
    ar: 'أَبْحَثُ عَنْ مُعْجَمِ لِسَانِ العَرَبِ، هَلْ يُمْكِنُنِي اسْتِعَارَتُهُ؟',
    translit: 'Abḥathu ʿan muʿjami Lisāni l-ʿArab, hal yumkinunī stiʿāratuh?',
    id_translation: 'Saya mencari kamus Lisanul Arab, bisakah saya meminjamnya pulang?',
    context: 'Prosedur pencarian dan peminjaman kitab di perpustakaan',
    replyAr: 'تَجِدُهُ فِي قِسْمِ المَرَاجِعِ، قَدِّمْ بِطَاقَتَكَ لِلتَّسْجِيلِ!',
    replyTranslit: 'Tajiduhu fī qismi l-marājiʿ, qaddim biṭāqataka li-t-tasjīl!',
    replyId: 'Kitab itu ada di bagian referensi, serahkan kartumu untuk registrasi!'
  },
  {
    id: 'h16',
    level: 3,
    levelLabel: 'L3 • Mutawassith 1',
    category: 'Janji Temu & Waktu',
    ar: 'مَتَى نَلْتَقِي غَدًا؟ هَلْ يُنَاسِبُكَ بَعْدَ صَلَاةِ العَصْرِ؟',
    translit: 'Matā naltaqī ghadan? Hal yunāsibuka baʿda ṣalāti l-ʿaṣr?',
    id_translation: 'Kapan kita bertemu besok? Apakah cocok bagimu ba\'da shalat Ashar?',
    context: 'Menentukan dan mengonfirmasi waktu janji temu yang berkah',
    replyAr: 'نَعَمْ، مَوْعِدُنَا غَدًا إِنْ شَاءَ اللَّهُ عَلَى الوَقْتِ!',
    replyTranslit: 'Naʿam, mawʿidunā ghadan in syāʾa Llāh ʿalā l-waqt!',
    replyId: 'Ya, janji temu kita besok insya Allah tepat pada waktunya!'
  },

  // Level 4: Mutawassith 2 (A2.2)
  {
    id: 'h17',
    level: 4,
    levelLabel: 'L4 • Mutawassith 2',
    category: 'Diskusi & Halaqah',
    ar: 'فِي رَأْيِي الشَّخْصِيِّ هٰذَا الطَّرْحُ هُوَ الأَنْسَبُ وَالأَنْفَعُ',
    translit: 'Fī raʾyī sy-syakhṣiyyi hādhā ṭ-ṭarḥu huwa l-ansabu wa-l-anfaʿ',
    id_translation: 'Menurut pandangan pribadi saya, opsi usulan ini yang paling tepat dan bermanfaat',
    context: 'Mengemukakan gagasan logis dalam halaqah musyawarah',
    replyAr: 'أُوَافِقُكَ الرَّأْيَ تَمَامًا، فَقَدْ أَبْدَعْتَ فِي التَّحْلِيلِ!',
    replyTranslit: 'Uwāfiquka r-raʾya tamāman, fa-qad abdaʿta fī t-taḥlīl!',
    replyId: 'Saya sepakat sepenuhnya, Anda telah menganalisisnya secara cemerlang!'
  },
  {
    id: 'h18',
    level: 4,
    levelLabel: 'L4 • Mutawassith 2',
    category: 'Wawancara & Profesi',
    ar: 'أَمْتَلِكُ خِبْرَةً مُمْتَازَةً فِي التَّعْلِيمِ وَالتَّرْجَمَةِ الفَوْرِيَّةِ',
    translit: 'Amtaliku khibratan mumtāzatan fī t-taʿlīmi wa-t-tarjamati l-fawriyyah',
    id_translation: 'Saya memiliki pengalaman unggul dalam bidang pengajaran dan penerjemahan simultan',
    context: 'Memaparkan keahlian diri dalam wawancara kerja profesional',
    replyAr: 'سِيرَتُكَ مُشَرِّفَةٌ، سَنَتَوَاصَلُ مَعَكَ قَرِيبًا بِإِذْنِ اللَّهِ!',
    replyTranslit: 'Sīratuka musyarrifah, sanatawāṣalu maʿaka qarīban bi-idhni Llāh!',
    replyId: 'Portofolio Anda sangat membanggakan, kami akan hubungi segera insya Allah!'
  },
  {
    id: 'h19',
    level: 4,
    levelLabel: 'L4 • Mutawassith 2',
    category: 'Solusi & Komplain',
    ar: 'عَفْوًا، هٰذَا الطَّلَبُ يَخْتَلِفُ عَمَّا اتَّفَقْنَا عَلَيْهِ فِي الفَاتُورَةِ',
    translit: 'ʿAfwan, hādhā ṭ-ṭalabu yakhtalifu ʿammā ttafaqnā ʿalayhi fī l-fātūrah',
    id_translation: 'Permisi, barang yang tiba ini berbeda dengan rincian di nota faktur',
    context: 'Menyampaikan komplain layanan tanpa emosi secara elegan',
    replyAr: 'نَعْتَذِرُ عَنِ الخَطَأِ، حَقُّكَ عَلَيْنَا وَسَنَقُومُ بِاسْتِبْدَالِهِ حَالًا!',
    replyTranslit: 'Naʿtadhiru ʿani l-khaṭaʾ, ḥaqquka ʿalaynā wa-sanaqūmu bi-stibdālihi ḥālā!',
    replyId: 'Kami mohon maaf atas kekeliruan ini, hak Anda di atas kami dan segera kami tukar!'
  },
  {
    id: 'h20',
    level: 4,
    levelLabel: 'L4 • Mutawassith 2',
    category: 'Tradisi & Budaya',
    ar: 'كَيْفَ تَحْتَفِلُونَ بِعِيدِ الفِطْرِ فِي بِلَادِكُمْ؟',
    translit: 'Kayfa taḥtafilūna bi-ʿīdi l-fiṭri fī bilādikum?',
    id_translation: 'Bagaimana cara masyarakat Anda merayakan hari raya Idul Fitri?',
    context: 'Pertukaran informasi tradisi dan kebudayaan antarnegara muslim',
    replyAr: 'نَتَبَادَلُ الزِّيَارَاتِ وَنَصِلُ الأَرْحَامَ وَنُطْعِمُ الطَّعَامَ!',
    replyTranslit: 'Natabādalu z-ziyārāti wa-naṣilu l-arḥāma wa-nuṭʿimu ṭ-ṭaʿām!',
    replyId: 'Kami saling mengunjungi silaturahmi, menyambung kerabat, dan menyajikan hidangan!'
  },

  // Level 5: Mutaqaddim (B1-B2)
  {
    id: 'h21',
    level: 5,
    levelLabel: 'L5 • Mutaqaddim',
    category: 'Diplomasi & Negosiasi',
    ar: 'نَسْعَى لِلتَّوَصُّلِ إِلَى اتِّفَاقٍ مُتَوَازِنٍ يُرْضِي كِلَا الطَّرَفَيْنِ',
    translit: 'Nasʿā li-t-tawaṣṣuli ilā ttifāqin mutawāzinin yurḍī kilā ṭ-ṭarafayn',
    id_translation: 'Kami berikhtiar mencapai kesepakatan berimbang yang memuaskan kedua belah pihak',
    context: 'Pernyataan retorika tingkat tinggi dalam negosiasi diplomatik resmi',
    replyAr: 'نُثَمِّنُ هٰذِهِ الرُّوحَ الإِيجَابِيَّةَ، وَنُوَافِقُ عَلَى بَنُودِ المُعَاهَدَةِ!',
    replyTranslit: 'Nuthamminu hādhihi r-rūḥa l-ījābiyyah, wa-nuwāfiqu ʿalā banūdi l-muʿāhadah!',
    replyId: 'Kami mengapresiasi iktikad positif ini, dan menyetujui butir-butir traktat!'
  },
  {
    id: 'h22',
    level: 5,
    levelLabel: 'L5 • Mutaqaddim',
    category: 'Debat & Argumentasi',
    ar: 'حُجَّتُكَ جَدِيرَةٌ بِالتَّأَمُّلِ، لٰكِنَّ الأَدِلَّةَ التَّارِيخِيَّةَ تُثْبِتُ خِلَافَ ذٰلِكَ',
    translit: 'Ḥujjatuka jadīratun bi-t-taʾammul, lākinna l-adillata t-tārīkhiyyata tuthbitu khilāfa dhālik',
    id_translation: 'Argumen Anda sangat layak direnungkan, namun bukti historis membuktikan sebaliknya',
    context: 'Sanggahan santun berbobot dalam forum debat intelektual akademik',
    replyAr: 'نَحْتَرِمُ هٰذَا الطَّرْحَ العِلْمِيَّ، وَنَدْعُو لِمَزِيدٍ مِنَ التَّحْقِيقِ!',
    replyTranslit: 'Naḥtarimu hādhā ṭ-ṭarḥa l-ʿilmiyy, wa-nadʿū li-mazīdin mina t-taḥqīq!',
    replyId: 'Kami menghormati perspektif ilmiah ini, dan mengundang verifikasi lebih mendalam!'
  },
  {
    id: 'h23',
    level: 5,
    levelLabel: 'L5 • Mutaqaddim',
    category: 'Media & Pers',
    ar: 'صَرَّحَ المُتَحَدِّثُ الرَّسْمِيُّ بِأَنَّ التَّعَاوُنَ الثَّقَافِيَّ يُؤْتِي ثِمَارَهُ',
    translit: 'Ṣarraḥa l-mutaḥaddithu r-rasmiyyu bi-anna t-taʿāwuna th-thaqāfiyya yuʾtī thimārah',
    id_translation: 'Juru bicara resmi menyatakan bahwa kemitraan kebudayaan mulai membuahkan hasil nyata',
    context: 'Pernyataan pers kepada para wartawan berita Fusha',
    replyAr: 'هَلْ يُمْكِنُ إِعْطَاؤُنَا مَزِيدًا مِنَ التَّفَاصِيلِ حَوْلَ المَشْرُوعِ؟',
    replyTranslit: 'Hal yumkinu iʿṭāʾunā mazīdan mina t-tafāṣīli ḥawla l-masyrūʿ?',
    replyId: 'Bisakah kami diberikan rincian lebih lanjut seputar pelaksanaan proyek ini?'
  },
  {
    id: 'h24',
    level: 5,
    levelLabel: 'L5 • Mutaqaddim',
    category: 'Wasiat & Nasihat',
    ar: 'أُوصِيكُمْ وَنَفْسِي بِتَقْوَى اللَّهِ وَحُسْنِ الخُلُقِ وَصِدْقِ الحَدِيثِ',
    translit: 'Ūṣīkum wa-nafsī bi-taqwā Llāhi wa-ḥusni l-khuluqi wa-ṣidqi l-ḥadīth',
    id_translation: 'Saya berwasiat kepada kalian dan diri saya untuk bertakwa kepada Allah, berakhlak mulia, dan jujur bertutur kata',
    context: 'Khitabah wasiat perpisahan yang menggugah sanubari majelis',
    replyAr: 'جَزَاكَ اللَّهُ عَنَّا خَيْرَ المَوْعِظَةِ، وَنَسْأَلُ اللَّهَ الثَّبَاتَ!',
    replyTranslit: 'Jazāka Llāhu ʿannā khayra l-mawʿiẓah, wa-nasʾalu Llāha th-thabāt!',
    replyId: 'Semoga Allah membalasmu dengan sebaik-baik nasihat, dan kita mohon keteguhan iman!'
  }
];

// Interactive Roleplay Scenarios for in-modal practice
interface RoleplayScenario {
  id: string;
  key: string;
  level: number;
  levelLabel: string;
  icon: string;
  title: string;
  subtitle: string;
  character: string;
  role: string;
}

const ROLEPLAY_SCENARIOS: RoleplayScenario[] = [
  {
    id: 's1',
    key: 'greeting_market',
    level: 0,
    levelLabel: 'L0 • Tamhidi',
    icon: '🥖',
    title: 'Di Toko Roti Paman Bakr',
    subtitle: 'Menjawab salam, menanyakan kabar, dan memesan roti hangat',
    character: 'Paman Bakr',
    role: 'Penjual Roti Ramah'
  },
  {
    id: 's2',
    key: 'meet_friend',
    level: 0,
    levelLabel: 'L0 • Tamhidi',
    icon: '🤝',
    title: 'Ta\'aruf dengan Ali Murid Baru',
    subtitle: 'Menyapa pagi, memperkenalkan identitas diri dan asal negara',
    character: 'Ali',
    role: 'Murid Baru Madinah'
  },
  {
    id: 's3',
    key: 'direction_mosque',
    level: 1,
    levelLabel: 'L1 • Mubtadi 1',
    icon: '🕌',
    title: 'Arah Masjid bersama Paman Tariq',
    subtitle: 'Menunjukkan kompas arah belokan ke kanan dan doa keselamatan',
    character: 'Paman Tariq',
    role: 'Musafir Pejalan Kaki'
  },
  {
    id: 's4',
    key: 'cafe_order',
    level: 2,
    levelLabel: 'L2 • Mubtadi 2',
    icon: '🫖',
    title: 'Memesan Teh & Kurma di Kafe',
    subtitle: 'Meminta menu, memesan teh mint manis, dan membayar nota santun',
    character: 'Pelayan Hasan',
    role: 'Pelayan Kafe Al-Kautsar'
  },
  {
    id: 's5',
    key: 'doctor_clinic',
    level: 3,
    levelLabel: 'L3 • Mutawassith 1',
    icon: '🩺',
    title: 'Konsultasi di Klinik Dokter Faruq',
    subtitle: 'Menjelaskan keluhan pusing & demam, serta doa kesembuhan',
    character: 'Dokter Faruq',
    role: 'Thabib Klinik Kampung'
  },
  {
    id: 's6',
    key: 'airport_checkin',
    level: 3,
    levelLabel: 'L3 • Mutawassith 1',
    icon: '✈️',
    title: 'Prosedur Bandara Safar Makkah',
    subtitle: 'Menyerahkan paspor, tiket penerbangan, dan doa safar mabrur',
    character: 'Petugas Bandara',
    role: 'Petugas Imigrasi & Boarding'
  },
  {
    id: 's7',
    key: 'halaqah_discussion',
    level: 4,
    levelLabel: 'L4 • Mutawassith 2',
    icon: '💡',
    title: 'Diskusi Halaqah bersama Ustaz Karim',
    subtitle: 'Mengutarakan argumen belajar mandiri dengan adab ilmiah luhur',
    character: 'Ustaz Karim',
    role: 'Mudir Halaqah Ilmu'
  },
  {
    id: 's8',
    key: 'diplomacy_negotiation',
    level: 5,
    levelLabel: 'L5 • Mutaqaddim',
    icon: '👑',
    title: 'Diplomasi bersama Dubes Luqman',
    subtitle: 'Perundingan traktat kebudayaan dengan uslub balaghah resmi',
    character: 'Duta Besar Luqman',
    role: 'Diplomat Ulung Negara Sahabat'
  }
];

// Golden Rules of Islamic Communication
const ADAB_COMMUNICATION_RULES = [
  {
    id: 'r1',
    icon: '👂',
    titleAr: 'حُسْنُ الاسْتِمَاعِ',
    titleId: 'Husnul Istima\' (Mendengar dengan Seksama)',
    principle: 'Jangan pernah memotong pembicaraan orang lain sebelum tuntas. Tunjukkan perhatian dengan tatapan bersahabat dan anggukan santun.',
    dalil: 'مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَاليَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ',
    dalilMeaning: 'Barangsiapa beriman kepada Allah dan hari akhir, hendaklah berkata baik atau diam. (HR. Bukhari-Muslim)'
  },
  {
    id: 'r2',
    icon: '🕊️',
    titleAr: 'خَفْضُ الجَنَاحِ وَاللِّينُ',
    titleId: 'Khafdhul Janah (Kerendahan Hati & Tutur Lembut)',
    principle: 'Berbicaralah dengan intonasi teduh, tidak meninggikan suara secara angkuh, dan memilih kosakata yang memuliakan lawan bicara.',
    dalil: 'وَاخْفِضْ جَنَاحَكَ لِلْمُؤْمِنِينَ',
    dalilMeaning: 'Dan rendahkanlah sayapmu (bersikap lemah lembutlah) kepada orang-orang yang beriman. (QS. Al-Hijr: 88)'
  },
  {
    id: 'r3',
    icon: '😊',
    titleAr: 'الابْتِسَامَةُ وَالبَشَاشَةُ',
    titleId: 'Al-Ibtisamah (Senyum Ramah adalah Sedekah)',
    principle: 'Awali setiap percakapan dengan wajah ceria dan senyuman tulus. Senyuman mencairkan ketegangan dan membuka pintu keakraban.',
    dalil: 'تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ لَكَ صَدَقَةٌ',
    dalilMeaning: 'Senyumanmu di hadapan saudaramu adalah sedekah bagimu. (HR. Tirmidzi)'
  },
  {
    id: 'r4',
    icon: '🎯',
    titleAr: 'القَوْلُ السَّدِيدُ',
    titleId: 'Qawlan Sadidan (Perkataan yang Benar & Tepat)',
    principle: 'Bicaralah dengan data yang valid, hindari kabar burung tanpa tabayyun, dan hindari kata berbelit-belit yang membingungkan.',
    dalil: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ وَقُولُوا قَوْلًا سَدِيدًا',
    dalilMeaning: 'Wahai orang-orang yang beriman, bertakwalah kepada Allah dan katakanlah perkataan yang benar. (QS. Al-Ahzab: 70)'
  },
  {
    id: 'r5',
    icon: '🤝',
    titleAr: 'الاعْتِذَارُ عِنْدَ الخَطَأِ',
    titleId: 'Al-I\'tidhar (Keberanian Meminta Maaf)',
    principle: 'Jika keliru berucap atau menyinggung perasaan, jangan tunda meminta maaf secara kesatria dengan frasa \'Afwan atau Asif jiddan.',
    dalil: 'كُلُّ بَنِي آدَمَ خَطَّاءٌ وَخَيْرُ الخَطَّائِينَ التَّوَّابُونَ',
    dalilMeaning: 'Setiap anak cucu Adam berbuat salah, dan sebaik-baik orang yang bersalah adalah yang bertaubat dan meminta maaf.'
  },
  {
    id: 'r6',
    icon: '🤲',
    titleAr: 'الدُّعَاءُ لِلْمُحَاوِرِ',
    titleId: 'Ad-Du\'a bil-Khayr (Menyelipkan Doa Berkah)',
    principle: 'Hiasilah ucapanmu dengan doa: Jazakallahu khayran, Barakallahu fika, Syafakallah, dan Fi amanillah sebagai tanda cinta ukhuwah.',
    dalil: 'مَنْ صَنَعَ إِلَيْكُمْ مَعْرُوفًا فَكَافِئُوهُ، فَإِنْ لَمْ تَجِدُوا فَادْعُوا لَهُ',
    dalilMeaning: 'Siapa yang berbuat baik kepadamu, balaslah. Jika tak mampu, doakanlah dia hingga engkau merasa telah membalasnya.'
  }
];

export const PulauHiwarHubModal: React.FC<PulauHiwarHubModalProps> = ({
  island,
  profile,
  onClose,
  onLaunchGame,
  onReward
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'simulator' | 'phrasebook' | 'adab'>('overview');
  
  // Filter states
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<number | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPhrase, setSelectedPhrase] = useState<FunctionalPhrase>(PHRASE_BOOK[0]);
  const [claimedGuideXP, setClaimedGuideXP] = useState(false);

  // Simulator State
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const [currentNodeId, setCurrentNodeId] = useState<string>('n1');
  const [dialogHistory, setDialogHistory] = useState<{ speaker: string; text: string; isUser: boolean }[]>([]);
  const [scenarioCompleted, setScenarioCompleted] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const currentScenario = ROLEPLAY_SCENARIOS[activeScenarioIdx];
  const scenarioDialogueNodes = DIALOGUES_DATA[currentScenario.key] || [];
  const currentNode: DialogueNode | undefined = scenarioDialogueNodes.find(n => n.id === currentNodeId) || scenarioDialogueNodes[0];

  // Start scenario
  const handleSelectScenario = (idx: number) => {
    setActiveScenarioIdx(idx);
    const scen = ROLEPLAY_SCENARIOS[idx];
    const nodes = DIALOGUES_DATA[scen.key] || [];
    if (nodes.length > 0) {
      setCurrentNodeId(nodes[0].id);
      setDialogHistory([
        {
          speaker: nodes[0].speakerName,
          text: nodes[0].ar,
          isUser: false
        }
      ]);
      sound.speakArabic(nodes[0].ar);
    }
    setScenarioCompleted(false);
    setFeedbackMsg(null);
  };

  const handleChooseOption = (choice: { ar: string; translit: string; id_translation: string; score: number; feedback?: string; nextId?: string }) => {
    sound.playTap();
    
    // Add user choice to history
    setDialogHistory(prev => [
      ...prev,
      {
        speaker: 'Kamu (المُتَكَلِّم)',
        text: choice.ar,
        isUser: true
      }
    ]);

    if (choice.feedback) {
      setFeedbackMsg(choice.feedback);
    } else {
      setFeedbackMsg(null);
    }

    if (choice.nextId) {
      const nextNode = scenarioDialogueNodes.find(n => n.id === choice.nextId);
      if (nextNode) {
        setTimeout(() => {
          setCurrentNodeId(nextNode.id);
          setDialogHistory(prev => [
            ...prev,
            {
              speaker: nextNode.speakerName,
              text: nextNode.ar,
              isUser: false
            }
          ]);
          sound.speakArabic(nextNode.ar);
        }, 600);
      }
    } else {
      // Completed scenario!
      setTimeout(() => {
        setScenarioCompleted(true);
        sound.playSuccess();
        GameStorage.addReward(30, 1, 'lisan', 5);
        onReward(30, 1);
      }, 700);
    }
  };

  // Filter phrases
  const filteredPhrases = PHRASE_BOOK.filter(p => {
    const matchLevel = selectedLevelFilter === 'all' || p.level === selectedLevelFilter;
    const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
    return matchLevel && matchCat;
  });

  // Filter scenarios
  const filteredScenarios = ROLEPLAY_SCENARIOS.filter(s => {
    return selectedLevelFilter === 'all' || s.level === selectedLevelFilter;
  });

  const allCategories = ['all', 'Salam & Sapaan', 'Perkenalan & Asal', 'Kesantunan & Syukur', 'Arah & Navigasi', 'Pasar & Kuliner', 'Medis & Kesehatan', 'Diskusi & Halaqah', 'Diplomasi & Negosiasi'];

  const handleClaimGuideReward = () => {
    if (claimedGuideXP) return;
    sound.playSuccess();
    sound.speakArabic('أَهْلًا وَسَهْلًا بِكُمْ فِي قَرْيَةِ الحِوَارِ المُبَارَكَةِ!');
    setClaimedGuideXP(true);
    GameStorage.addReward(50, 1, 'lisan', 5);
    onReward(50, 1);
  };

  const tabs = [
    { id: 'overview', label: '🧭 Eksplorasi Kampung' },
    { id: 'simulator', label: '💬 Simulasi Percakapan', badge: '8' },
    { id: 'phrasebook', label: '📖 24 Buku Frasa Audio', badge: '24' },
    { id: 'adab', label: '🛡️ 6 Adab Komunikasi Islam', badge: '6' }
  ];

  const guide = {
    name: 'Ustaz Salman al-Qurasyi',
    role: 'Pemandu Fusha & Adab Bicara',
    avatar: '🏘️',
    greetingAr: 'أَهْلًا وَسَهْلًا بِكُمْ فِي قَرْيَةِ الحِوَارِ المُبَارَكَةِ!',
    speechText: 'Ahlan wa Sahlan di Kampung Percakapan! Bicaralah dengan tutur fusha yang santun, dengarkan dengan adab, dan amalkan adab komunikasi Qurani.',
    onClaimXP: handleClaimGuideReward,
    claimedXP: claimedGuideXP
  };

  return (
    <IslandModalLayout
      island={{
        id: island.id,
        name_id: island.name_id,
        name_ar: island.name_ar,
        domain: island.domain,
        biome: 'Bioma Kampung Kafe & Warga Ramah',
        crystalName: island.crystalName,
        minLevel: island.minLevel,
        color: '#059669'
      }}
      hasCrystal={Boolean(profile.crystals[island.id])}
      isUnlocked={true}
      guide={guide}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={(tabId) => {
        if (tabId === 'simulator') {
          handleSelectScenario(activeScenarioIdx);
        }
        setActiveTab(tabId as any);
      }}
      onClose={onClose}
    >

        {/* Tab 1: Overview & Pemandu Kampung */}
        {activeTab === 'overview' && (
          <div className="p-6 overflow-y-auto flex-1 space-y-5">
            {/* Guide Card (Ustaz Salman al-Qurasyi) */}
            <div className="bg-gradient-to-r from-emerald-100 via-teal-100 to-green-100 rounded-3xl p-5 border-2 border-emerald-300 shadow-sm flex flex-col md:flex-row items-center gap-5">
              <div className="relative">
                <div className="w-24 h-24 rounded-3xl bg-emerald-600 text-white flex items-center justify-center text-5xl shadow-md border-4 border-white">
                  👳‍♂️
                </div>
                <span className="absolute -bottom-2 -right-1 text-2xl" title="Ustaz Salman">
                  ☕
                </span>
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                  <h3 className="font-bold text-lg text-slate-800">
                    Ustaz Salman (الأُسْتَاذ سَلْمَان)
                  </h3>
                  <span className="text-xs bg-emerald-300 text-emerald-950 font-bold px-2 py-0.5 rounded-full">
                    Pemandu Kampung Hiwar
                  </span>
                </div>
                <p className="text-xs text-emerald-950 italic mb-2">
                  "أَهْلًا وَسَهْلًا بِكُمْ فِي قَرْيَةِ الحِوَار! Di kampung kami, bahasa Arab hidup dalam senyuman warga, obrolan kedai kopi kurma, dan sapaan hangat di jalanan. Jangan takut salah bicara! Mari melatih lidahmu menjawab salam, menanyakan arah, dan memesan teh dengan santun!"
                </p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                  <button
                    onClick={() => sound.speakArabic('أَهْلًا وَسَهْلًا بِكُمْ فِي قَرْيَةِ الحِوَارِ، تَفَضَّلُوا بِالدُّخُولِ!')}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs"
                  >
                    <Volume2 className="w-4 h-4" /> Dengarkan Sapaan Ustaz Salman
                  </button>
                  {!claimedGuideXP ? (
                    <button
                      onClick={handleClaimGuideReward}
                      className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs"
                    >
                      <Sparkles className="w-4 h-4" /> Terima Nasihat (+50 XP)
                    </button>
                  ) : (
                    <span className="text-xs text-emerald-800 font-bold flex items-center gap-1 bg-emerald-200 px-3 py-1.5 rounded-xl">
                      <CheckCircle2 className="w-4 h-4" /> Nasihat Diterima!
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Lore and Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-3xl border border-emerald-200 shadow-xs">
                <span className="text-xs text-slate-500 block mb-1">Cakupan Kurikulum</span>
                <div className="text-xl font-extrabold text-emerald-900">24 Skill Hiwar Terpadu</div>
                <p className="text-[11px] text-slate-600 mt-1">
                  Mencakup Salam L0, Perkenalan Diri L1, Belanja Pasar & Kafe L2, Konsultasi Medis & Bandara L3, Diskusi Halaqah L4, hingga Retorika Fashih L5.
                </p>
              </div>
              <div className="bg-white p-4 rounded-3xl border border-emerald-200 shadow-xs">
                <span className="text-xs text-slate-500 block mb-1">Fokus Bukti (Evidence)</span>
                <div className="text-xl font-extrabold text-teal-700">Producing (P) - Lisan Aktif</div>
                <p className="text-[11px] text-slate-600 mt-1">
                  Melatih keberanian berbicara lisan aktif, artikulasi fonetik tepat, dan pemilihan frasa kesantunan adab islami.
                </p>
              </div>
              <div className="bg-white p-4 rounded-3xl border border-emerald-200 shadow-xs">
                <span className="text-xs text-slate-500 block mb-1">Kristal Pulau</span>
                <div className="text-xl font-extrabold text-emerald-600">Kristal Hijau Zamrud 💎</div>
                <p className="text-[11px] text-slate-600 mt-1">
                  Didapatkan saat menuntaskan seluruh 8 skenario simulasi dialog bercabang dengan adab sempurna.
                </p>
              </div>
            </div>

            {/* Quick Play Banner */}
            <div className="bg-white rounded-3xl p-5 border border-emerald-200 shadow-sm flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                  <Play className="w-4 h-4 text-emerald-600" /> Masuk ke Wahana Dialog Quest Sekarang
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Berbincang langsung dengan Paman Bakr, Ali murid baru, Paman Tariq, Pelayan Hasan, Dokter Faruq, dan Pustakawan Salman.
                </p>
              </div>
              <button
                onClick={() => onLaunchGame('dialog_quest')}
                className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-2xl text-xs shadow-md hover:from-emerald-700 hover:to-teal-700 flex items-center gap-1.5 shrink-0"
              >
                <span>Mulai Percakapan Penuh</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Studio Simulasi Percakapan Interaktif */}
        {activeTab === 'simulator' && (
          <div className="p-6 overflow-y-auto flex-1 flex flex-col md:flex-row gap-5">
            {/* Left: Scenarios Picker */}
            <div className="w-full md:w-1/3 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-xs text-slate-700 uppercase tracking-wider">
                  Pilih 8 Skenario Bertingkat
                </h3>
                <span className="text-[11px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                  {filteredScenarios.length} Skenario
                </span>
              </div>

              {/* Level Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                <button
                  onClick={() => setSelectedLevelFilter('all')}
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all ${
                    selectedLevelFilter === 'all'
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-emerald-50'
                  }`}
                >
                  Semua
                </button>
                {[0, 1, 2, 3, 4, 5].map(lvl => (
                  <button
                    key={lvl}
                    onClick={() => setSelectedLevelFilter(lvl)}
                    className={`px-2 py-1 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all ${
                      selectedLevelFilter === lvl
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-emerald-50'
                    }`}
                  >
                    L{lvl}
                  </button>
                ))}
              </div>

              {/* List */}
              <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                {filteredScenarios.map((scen, idx) => {
                  const globalIdx = ROLEPLAY_SCENARIOS.findIndex(s => s.id === scen.id);
                  const isSelected = activeScenarioIdx === globalIdx;
                  return (
                    <button
                      key={scen.id}
                      onClick={() => handleSelectScenario(globalIdx)}
                      className={`w-full p-3 rounded-2xl text-left border flex items-center gap-3 transition-all ${
                        isSelected
                          ? 'bg-emerald-100/90 border-emerald-500 ring-2 ring-emerald-300 shadow-xs'
                          : 'bg-white border-slate-200 hover:bg-emerald-50/60'
                      }`}
                    >
                      <span className="text-2xl shrink-0">{scen.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded-md">
                            {scen.levelLabel}
                          </span>
                        </div>
                        <h4 className="font-bold text-xs text-slate-900 truncate mt-0.5">
                          {scen.title}
                        </h4>
                        <p className="text-[10px] text-slate-500 truncate">
                          {scen.character} • {scen.role}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: In-Modal Dialogue Simulator */}
            <div className="w-full md:w-2/3 bg-white rounded-3xl p-5 border-2 border-emerald-200 shadow-sm flex flex-col justify-between">
              <div>
                {/* Header current scenario */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <span className="text-3xl">{currentScenario.icon}</span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full">
                          {currentScenario.levelLabel}
                        </span>
                        <span className="text-xs font-bold text-slate-700">
                          {currentScenario.character} ({currentScenario.role})
                        </span>
                      </div>
                      <h3 className="font-extrabold text-sm text-slate-900 mt-0.5">
                        {currentScenario.title}
                      </h3>
                    </div>
                  </div>
                  <button
                    onClick={() => handleSelectScenario(activeScenarioIdx)}
                    className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                    title="Ulangi skenario ini"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>

                {/* Dialog Stream Box */}
                <div className="my-4 space-y-3 max-h-[250px] overflow-y-auto p-2">
                  {dialogHistory.map((d, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex flex-col ${d.isUser ? 'items-end' : 'items-start'}`}
                    >
                      <span className="text-[10px] text-slate-500 mb-0.5 px-1 font-semibold">
                        {d.speaker}
                      </span>
                      <div
                        className={`p-3.5 rounded-2xl max-w-[85%] ${
                          d.isUser
                            ? 'bg-emerald-600 text-white rounded-br-xs'
                            : 'bg-emerald-50 text-slate-900 border border-emerald-200 rounded-bl-xs'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <p className="font-arabic font-bold text-lg leading-relaxed">
                            {d.text}
                          </p>
                          <button
                            onClick={() => sound.speakArabic(d.text)}
                            className={`p-1 rounded-lg ${
                              d.isUser ? 'bg-emerald-500/80 text-white hover:bg-emerald-500' : 'bg-emerald-200/60 text-emerald-900 hover:bg-emerald-200'
                            }`}
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Feedback notification */}
                  {feedbackMsg && (
                    <div className="p-2.5 rounded-xl bg-amber-100 border border-amber-300 text-amber-900 text-xs font-semibold flex items-center gap-2">
                      <span>💡 Tips Adab:</span>
                      <span>{feedbackMsg}</span>
                    </div>
                  )}

                  {scenarioCompleted && (
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-100 to-teal-100 border-2 border-emerald-400 text-center space-y-2">
                      <div className="text-3xl">🎉</div>
                      <h4 className="font-bold text-sm text-emerald-950">
                        Skenario Selesai dengan Nilai Adab Sempurna!
                      </h4>
                      <p className="text-xs text-emerald-800">
                        Kamu telah mempraktikkan dialog fasih dan santun dengan {currentScenario.character}. (+30 XP & 1 Bintang)
                      </p>
                      <button
                        onClick={() => handleSelectScenario((activeScenarioIdx + 1) % ROLEPLAY_SCENARIOS.length)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5 shadow-sm"
                      >
                        <span>Lanjut ke Skenario Berikutnya</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Choices Buttons */}
              {!scenarioCompleted && currentNode && (
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <span className="text-[11px] font-bold text-slate-500 block">
                    Pilih Respons Terbaikmu:
                  </span>
                  <div className="grid grid-cols-1 gap-2">
                    {currentNode.choices.map((choice: DialogueNode['choices'][number], i: number) => (
                      <button
                        key={i}
                        onClick={() => handleChooseOption(choice)}
                        className="w-full p-3 rounded-2xl border-2 border-emerald-200 hover:border-emerald-500 hover:bg-emerald-50/70 text-left transition-all flex items-center justify-between group"
                      >
                        <div>
                          <span className="font-arabic font-bold text-base text-slate-900 block leading-tight">
                            {choice.ar}
                          </span>
                          <span className="text-xs text-emerald-800 font-semibold block mt-0.5">
                            {choice.translit}
                          </span>
                          <span className="text-[11px] text-slate-500 block">
                            "{choice.id_translation}"
                          </span>
                        </div>
                        <span className="text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition-transform ml-2 shrink-0">
                          Pilih ➜
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Buku Frasa Adab & Percakapan Audio (24 Frasa) */}
        {activeTab === 'phrasebook' && (
          <div className="p-6 overflow-y-auto flex-1 flex flex-col md:flex-row gap-5">
            {/* Left list */}
            <div className="w-full md:w-1/2 space-y-3">
              {/* Level Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                <button
                  onClick={() => setSelectedLevelFilter('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedLevelFilter === 'all'
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-emerald-50'
                  }`}
                >
                  Semua Tingkat ({PHRASE_BOOK.length})
                </button>
                {[0, 1, 2, 3, 4, 5].map(lvl => (
                  <button
                    key={lvl}
                    onClick={() => setSelectedLevelFilter(lvl)}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      selectedLevelFilter === lvl
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-emerald-50'
                    }`}
                  >
                    L{lvl}
                  </button>
                ))}
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {allCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2.5 py-1 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all ${
                      selectedCategory === cat
                        ? 'bg-teal-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat === 'all' ? 'Semua Topik' : cat}
                  </button>
                ))}
              </div>

              {/* Phrases List */}
              <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
                {filteredPhrases.map((phrase) => {
                  const isSelected = selectedPhrase.id === phrase.id;
                  return (
                    <button
                      key={phrase.id}
                      onClick={() => {
                        setSelectedPhrase(phrase);
                        sound.speakArabic(phrase.ar);
                      }}
                      className={`w-full p-3 rounded-2xl text-left border flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-emerald-100/90 border-emerald-500 ring-2 ring-emerald-300'
                          : 'bg-white border-slate-200 hover:bg-emerald-50/60'
                      }`}
                    >
                      <div className="flex-1 min-w-0 pr-2">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded-md">
                            {phrase.levelLabel}
                          </span>
                          <span className="text-[10px] text-slate-500 font-semibold truncate">
                            {phrase.category}
                          </span>
                        </div>
                        <span className="font-arabic font-bold text-lg text-slate-900 block leading-tight truncate">
                          {phrase.ar}
                        </span>
                        <span className="text-xs text-emerald-800 font-semibold block mt-0.5 truncate">
                          {phrase.translit}
                        </span>
                        <span className="text-[11px] text-slate-600 block line-clamp-1">
                          {phrase.id_translation}
                        </span>
                      </div>
                      <span className="text-xs text-emerald-600 font-bold shrink-0">
                        🔊
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right details spotlight */}
            <div className="w-full md:w-1/2 bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-emerald-100 text-emerald-900 font-bold px-3 py-1 rounded-full">
                      {selectedPhrase.levelLabel}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">
                      {selectedPhrase.category}
                    </span>
                  </div>
                  <button
                    onClick={() => sound.speakArabic(selectedPhrase.ar)}
                    className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
                    title="Lafalkan kalimat"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="bg-emerald-50/80 rounded-2xl p-4 border border-emerald-200 mb-4">
                  <span className="text-[10px] uppercase font-bold text-emerald-800 block mb-1">
                    Frasa yang Diucapkan:
                  </span>
                  <h3 className="font-arabic font-extrabold text-2xl text-emerald-950 mb-1 leading-relaxed">
                    "{selectedPhrase.ar}"
                  </h3>
                  <p className="text-xs font-bold text-emerald-800">
                    {selectedPhrase.translit}
                  </p>
                  <p className="text-xs text-slate-700 italic mt-1">
                    "{selectedPhrase.id_translation}"
                  </p>
                </div>

                {/* Response Pair */}
                <div className="bg-amber-50/80 rounded-2xl p-4 border border-amber-200">
                  <span className="text-[10px] uppercase font-bold text-amber-800 block mb-1">
                    Jawaban Balasan yang Lazim (الرَّدُّ المُنَاسِب):
                  </span>
                  <h4 className="font-arabic font-extrabold text-2xl text-amber-950 mb-1 leading-relaxed">
                    "{selectedPhrase.replyAr}"
                  </h4>
                  <p className="text-xs font-bold text-amber-800">
                    {selectedPhrase.replyTranslit}
                  </p>
                  <p className="text-xs text-slate-700 italic mt-1">
                    "{selectedPhrase.replyId}"
                  </p>
                  <button
                    onClick={() => sound.speakArabic(selectedPhrase.replyAr)}
                    className="mt-2 text-xs text-amber-800 hover:text-amber-950 font-bold flex items-center gap-1"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Putar Bunyi Jawaban Balasan
                  </button>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Konteks: {selectedPhrase.context}</span>
                <span className="text-emerald-700 font-bold">Adab Islami Fashih</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Bengkel 6 Kaidah Emas Adab Komunikasi Islam */}
        {activeTab === 'adab' && (
          <div className="p-6 overflow-y-auto flex-1 space-y-4">
            <div className="text-center max-w-xl mx-auto mb-2">
              <h3 className="font-bold text-lg text-slate-800">
                6 Kaidah Emas Adab Komunikasi Islam (آدَابُ الحِوَارِ الإِسْلَامِيّ)
              </h3>
              <p className="text-xs text-slate-600">
                Percakapan bahasa Arab bukan sekadar kelancaran artikulasi, melainkan cerminan keindahan akhlak, kelembutan tutur kata, dan penghormatan tulus.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ADAB_COMMUNICATION_RULES.map((rule) => (
                <div
                  key={rule.id}
                  className="bg-white p-4 rounded-3xl border-2 border-emerald-200 shadow-xs hover:border-emerald-400 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className="text-3xl">{rule.icon}</span>
                      <div>
                        <h4 className="font-arabic font-bold text-base text-emerald-950">
                          {rule.titleAr}
                        </h4>
                        <span className="text-xs font-bold text-slate-700">
                          {rule.titleId}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 mb-2">
                      {rule.principle}
                    </p>
                  </div>

                  <div className="bg-emerald-50/80 p-3 rounded-2xl border border-emerald-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] uppercase font-bold text-emerald-800">
                        Dalil / Hikmah Adab:
                      </span>
                      <button
                        onClick={() => sound.speakArabic(rule.dalil)}
                        className="text-emerald-700 hover:text-emerald-900"
                        title="Dengarkan dalil"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="font-arabic font-bold text-sm text-emerald-950 mb-0.5">
                      "{rule.dalil}"
                    </p>
                    <p className="text-[11px] text-slate-600 italic">
                      {rule.dalilMeaning}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contrast Table Adab */}
            <div className="bg-white rounded-3xl p-5 border-2 border-emerald-200 shadow-sm mt-4">
              <h4 className="font-bold text-sm text-slate-900 mb-3 flex items-center gap-2">
                <span>⚖️</span> Tabel Kontras: Adab Fashih vs Kebiasaan Keliru
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="bg-emerald-100/80 text-emerald-950 font-bold border-b border-emerald-200">
                      <th className="p-2.5 rounded-l-xl">Situasi Percakapan</th>
                      <th className="p-2.5 text-emerald-800">Adab Santun Islami (Fashih)</th>
                      <th className="p-2.5 text-rose-800 rounded-r-xl">Kekeliruan yang Dihindari</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-2.5 font-bold text-slate-800">Menyapa Sesama Muslim</td>
                      <td className="p-2.5 text-emerald-900">Mengucapkan salam lengkap: As-Salāmu ʿalaykum wa-raḥmatu Llāh</td>
                      <td className="p-2.5 text-rose-700">Hanya melambaikan tangan tanpa doa keselamatan</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-slate-800">Meminta Tolong</td>
                      <td className="p-2.5 text-emerald-900">Mengawali dengan Min faḍlika / Law samaḥta</td>
                      <td className="p-2.5 text-rose-700">Memerintah langsung tanpa kata permisi</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-slate-800">Menerima Bantuan</td>
                      <td className="p-2.5 text-emerald-900">Jazākallāhu khayran wa-bāraka fīka</td>
                      <td className="p-2.5 text-rose-700">Berlalu begitu saja tanpa rasa terima kasih</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-slate-800">Perbedaan Pendapat</td>
                      <td className="p-2.5 text-emerald-900">Fī ra\'yī... Uwāfiquka lakin hunāka nuqṭah ukhra</td>
                      <td className="p-2.5 text-rose-700">Menyela dan mencela orang yang berbeda pandangan</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

    </IslandModalLayout>
  );
};
