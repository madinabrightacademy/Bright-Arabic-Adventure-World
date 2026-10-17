import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Play, Volume2, Award, BookOpen, Layers, CheckCircle2, ChevronRight, Star, Heart, Compass, Mountain, Sliders, Shield, Filter, Search, HelpCircle } from 'lucide-react';
import { UserProfile, Island } from '../types/game';
import { sound } from '../services/sound';
import { SKILLS_DATA, LEXICON_DATA, TASHRIF_ROOTS } from '../data/curriculum';

interface PulauQawaidHubModalProps {
  island: Island;
  profile: UserProfile;
  onClose: () => void;
  onLaunchGame: (gameId: string) => void;
}

interface GrammarConceptCard {
  id: string;
  level: number;
  levelLabel: string;
  title: string;
  titleAr: string;
  category: 'nahwu' | 'sharaf' | 'isyarah' | 'nawasikh' | 'irab';
  conceptExplanation: string;
  ruleFormula: string;
  hudhudTips: string;
  examples: {
    ar: string;
    translit: string;
    id: string;
    breakdown: string;
  }[];
}

const GRAMMAR_SHOWCASE: GrammarConceptCard[] = [
  {
    id: 'g1',
    level: 1,
    levelLabel: 'Level 1: Mubtadi\' (A1)',
    title: 'Tiga Pembagian Kata: Isim, Fi\'il, & Harf',
    titleAr: 'أَقْسَامُ الكَلَام: اِسْمٌ، فِعْلٌ، وَحَرْفٌ',
    category: 'nahwu',
    conceptExplanation: 'Setiap kata dalam bahasa Arab terbagi mutlak ke dalam tiga rumpun: Isim (nomina benda/sifat yang menerima tanwin & al-lam), Fi\'il (verba kerja terikat waktu lampau/kini/perintah), dan Harf (partikel pengikat makna).',
    ruleFormula: 'كَلَام = [اِسْمٌ] + [فِعْلٌ] + [حَرْفٌ]',
    hudhudTips: 'Uji dengan Alif Lam! Jika bisa ditempel "Al-" (seperti Al-Kitab), ia adalah Isim!',
    examples: [
      { ar: 'كِتَابٌ جَدِيدٌ', translit: 'Kitābun jadīd', id: 'Sebuah buku baru.', breakdown: 'Kedua kata bertanwin = Isim (nomina & adjektiva).' },
      { ar: 'كَتَبَ زَيْدٌ رِسَالَةً', translit: 'Kataba zaydun risālah', id: 'Zaid telah menulis surat.', breakdown: 'Kataba = Fi\'il Madhi (kata kerja masa lalu).' },
      { ar: 'فِي المَدْرَسَةِ', translit: 'Fī l-madrasah', id: 'Di sekolah.', breakdown: 'Fī = Harf Jar (partikel preposisi).' }
    ]
  },
  {
    id: 'g2',
    level: 1,
    levelLabel: 'Level 1: Mubtadi\' (A1)',
    title: 'Isim Isyarah & Kesesuaian Gender Kata',
    titleAr: 'أَسْمَاءُ الإِشَارَةِ لِلْقَرِيب وَالتَّذْكِير وَالتَّأْنِيث',
    category: 'isyarah',
    conceptExplanation: 'Menunjuk benda dekat menggunakan هٰذَا (hādhā) untuk mudzakkar (maskulin) dan هٰذِهِ (hādhihi) untuk muannats (feminin berakhiran ta marbuthah ـة).',
    ruleFormula: 'هٰذَا + [Isim Mudzakkar]  |  هٰذِهِ + [Isim Muannats / ـة]',
    hudhudTips: 'Lihat ekor katanya! Ada ta marbuthah (ـة)? 95% gunakan Hadhihi (هٰذِهِ)!',
    examples: [
      { ar: 'هٰذَا كِتَابٌ كَبِيرٌ', translit: 'Hādhā kitābun kabīr', id: 'Ini sebuah buku yang besar.', breakdown: 'Semua kata selaras dalam bentuk maskulin (mudzakkar).' },
      { ar: 'هٰذِهِ سَيَّارَةٌ جَدِيدَةٌ', translit: 'Hādhihi sayyāratun jadīdah', id: 'Ini sebuah mobil yang baru.', breakdown: 'Semua kata selaras feminin (muannats) dengan akhiran ta marbuthah.' },
      { ar: 'ذٰلِكَ مَسْجِدٌ جَمِيلٌ', translit: 'Dhālika masjidun jamīl', id: 'Itu sebuah masjid yang indah.', breakdown: 'Kata tunjuk jarak jauh maskulin (dhālika).' }
    ]
  },
  {
    id: 'g3',
    level: 2,
    levelLabel: 'Level 2: Asasi (A2)',
    title: 'Jumlah Ismiyyah: Mubtada\' (Subjek) & Khabar (Predikat)',
    titleAr: 'الجُمْلَةُ الاسْمِيَّة: مُبْتَدَأ + خَبَر',
    category: 'nahwu',
    conceptExplanation: 'Kalimat berita nominal yang diawali kata benda (Mubtada\' ma\'rifah ber-Al) dan dilengkapi keterangan predikat (Khabar nakirah). Kedua unsurnya berstatus Marfu\' dengan dhommah.',
    ruleFormula: '[Mubtada\' Ma\'rifah Marfu\'] + [Khabar Nakirah Marfu\']',
    hudhudTips: 'Mubtada\' ibarat kepala lokomotif (ber-Al), Khabar ibarat gerbongnya (bertanwin dhommatain)!',
    examples: [
      { ar: 'الوَلَدُ نَشِيطٌ', translit: 'Al-waladu nasyīṭun', id: 'Anak laki-laki itu rajin.', breakdown: 'الوَلَدُ = Mubtada\' dhommah tunggal, نَشِيطٌ = Khabar tanwin dhommatain.' },
      { ar: 'العِلْمُ نُورٌ', translit: 'Al-ʿilmu nūrun', id: 'Ilmu itu adalah cahaya.', breakdown: 'Contoh pepatah masyhur struktur ismiyyah dasar.' },
      { ar: 'البِنْتُ ذَكِيَّةٌ', translit: 'Al-bintu dhakiyyah', id: 'Anak perempuan itu cerdas.', breakdown: 'Khabar muannats wajib menyelaraskan diri dengan mubtada\'.' }
    ]
  },
  {
    id: 'g4',
    level: 2,
    levelLabel: 'Level 2: Asasi (A2)',
    title: 'Ragam Wujud Khabar: Mufrad & Syibhul Jumlah',
    titleAr: 'أَنْوَاعُ الخَبَر: مُفْرَد وَشِبْهُ جُمْلَة',
    category: 'nahwu',
    conceptExplanation: 'Predikat (Khabar) tidak selalu berupa satu kata sifat tunggal. Khabar dapat berwujud frasa jar-majrur atau keterangan posisi ruang (zharaf makan).',
    ruleFormula: '[Mubtada\'] + [Khabar: Jar-Majrur / Zharaf]',
    hudhudTips: 'Jika setelah subjek langsung ada "fii" atau "fawqa", jenis khabarnya adalah Syibhul Jumlah!',
    examples: [
      { ar: 'الكِتَابُ عَلَى المَكْتَبِ', translit: 'Al-kitābu ʿalā l-maktabi', id: 'Buku itu ada di atas meja.', breakdown: 'عَلَى المَكْتَبِ = Khabar syibhul jumlah frasa preposisi jar-majrur.' },
      { ar: 'العُصْفُورُ فَوْقَ الشَّجَرَةِ', translit: 'Al-ʿuṣfūru fawqa sy-syajarah', id: 'Burung itu di atas pohon.', breakdown: 'فَوْقَ = Zharaf makan penunjuk koordinat ruang.' },
      { ar: 'المُعَلِّمُ حَاضِرٌ', translit: 'Al-muʿallimu ḥāḍirun', id: 'Guru itu hadir.', breakdown: 'حَاضِرٌ = Contoh khabar mufrad satu kata.' }
    ]
  },
  {
    id: 'g5',
    level: 2,
    levelLabel: 'Level 2: Asasi (A2)',
    title: 'Idhafah (Frasa Kepemilikan & Penyandaran)',
    titleAr: 'المُضَافُ وَالمُضَافُ إِلَيْه',
    category: 'nahwu',
    conceptExplanation: 'Penyandaran dua kata benda: Mudhaf (benda yang dimiliki) HARAM bertanwin dan HARAM ber-Alif Lam. Mudhaf Ilaih (pemilik) SELALU berstatus Majrur (kasrah).',
    ruleFormula: '[Mudhaf (tanpa Al/tanwin)] + [Mudhaf Ilaih Majrur (-i)]',
    hudhudTips: 'Pantangan Idhafah: Jangan pernah beri Alif Lam atau Tanwin pada kata pertama!',
    examples: [
      { ar: 'كِتَابُ الطَّالِبِ جَدِيدٌ', translit: 'Kitābu ṭ-ṭālibi jadīd', id: 'Buku murid itu baru.', breakdown: 'كِتَابُ = Mudhaf dhommah tunggal, الطَّالِبِ = Mudhaf Ilaih kasrah majrur.' },
      { ar: 'بَابُ المَسْجِدِ مَفْتُوحٌ', translit: 'Bābu l-masjidi maftūḥ', id: 'Pintu masjid itu terbuka.', breakdown: 'Penyandaran kepemilikan bangunan suci.' }
    ]
  },
  {
    id: 'g6',
    level: 3,
    levelLabel: 'Level 3: Mutawassith 1 (B1)',
    title: 'Jumlah Fi\'liyyah: Kata Kerja, Pelaku, & Objek',
    titleAr: 'الجُمْلَةُ الفِعْلِيَّة: فِعْل + فَاعِل + مَفْعُول بِه',
    category: 'nahwu',
    conceptExplanation: 'Kalimat verbal yang diawali kata kerja (Fi\'il). Pelakunya disebut Fa\'il (Marfu\' dhommah), sedangkan sasaran perbuatannya adalah Maf\'ul Bih (Manshub fathah).',
    ruleFormula: '[Fi\'il] + [Fa\'il Marfu\' (-u)] + [Maf\'ul Bih Manshub (-a)]',
    hudhudTips: 'Tanyakan: Siapa pelakunya? (Fa\'il dhommah). Apa yang dikenai perbuatan? (Maf\'ul bih fathah)!',
    examples: [
      { ar: 'قَرَأَ زَيْدٌ الكِتَابَ', translit: 'Qaraʾa zayduni l-kitāba', id: 'Zaid telah membaca buku itu.', breakdown: 'قَرَأَ (Fi\'il), زَيْدٌ (Fa\'il dhommah), الكِتَابَ (Maf\'ul bih fathah).' },
      { ar: 'شَرِبَ الوَلَدُ المَاءَ', translit: 'Syariba l-waladu l-māʾa', id: 'Anak itu telah meminum air.', breakdown: 'Struktur baku transitif akusatif.' },
      { ar: 'كَتَبَتْ عَائِشَةُ الرِّسَالَةَ', translit: 'Katabat ʿāʾisyatu r-risālah', id: 'Aisyah telah menulis surat.', breakdown: 'Penambahan ta ta\'nits sukun (ـتْ) karena pelaku perempuan.' }
    ]
  },
  {
    id: 'g7',
    level: 3,
    levelLabel: 'Level 3: Mutawassith 1 (B1)',
    title: 'I\'rab Bentuk Ganda (Mutsanna) & Jamak Salim',
    titleAr: 'إِعْرَابُ المُثَنَّى وَجَمْعِ المُذَكَّرِ وَالمُؤَنَّثِ السَّالِم',
    category: 'irab',
    conceptExplanation: 'Bentuk dua (Mutsanna) rafa\' dengan Alif (-āni) dan nashab/jar dengan Ya (-ayni). Jamak Mudzakkar Salim rafa\' dengan Waw (-ūna) dan nashab/jar dengan Ya (-īna). Jamak Muannats Salim ANTI FATHAH; saat nashab digantikan kasrah (-ātin)!',
    ruleFormula: 'Mutsanna: -āni (Rafa\') / -ayni (Nashab/Jar) | Mudzakkar: -ūna / -īna',
    hudhudTips: 'Awas jebakan Nahwu: Jamak Muannats Salim saat jadi objek penderita pantang menerima fathah; ia dikasrahkan!',
    examples: [
      { ar: 'حَضَرَ الطَّالِبَانِ الاثْنَانِ', translit: 'Ḥaḍara ṭ-ṭālibāni thnān', id: 'Dua siswa itu telah hadir.', breakdown: 'الطَّالِبَانِ = Fa\'il marfu\' dengan huruf Alif (bukan dhommah).' },
      { ar: 'اشْتَرَيْتُ قَلَمَيْنِ اثْنَيْنِ', translit: 'Isytaraytu qalamayni thnayn', id: 'Aku telah membeli dua buah pena.', breakdown: 'قَلَمَيْنِ = Maf\'ul bih manshub dengan huruf Ya sukun.' },
      { ar: 'خَلَقَ اللَّهُ السَّمَاوَاتِ', translit: 'Khalaqa Llāhu s-samāwāt', id: 'Allah telah menciptakan langit.', breakdown: 'السَّمَاوَاتِ = Jamak muannats salim manshub dengan tanda KASRAH.' }
    ]
  },
  {
    id: 'g8',
    level: 4,
    levelLabel: 'Level 4: Mutawassith 2 (B2)',
    title: 'Kaidah Nawasikh: Kaana vs Inna wa Akhawatuha',
    titleAr: 'كَانَ وَإِنَّ وَأَخَوَاتُهُمَا (نَوَاسِخُ الِابْتِدَاء)',
    category: 'nawasikh',
    conceptExplanation: 'Kaidah perombak kalimat nominal. كَانَ merafa\'kan isim dan menashabkan khabar. Sebaliknya, إِنَّ menashabkan isim dan merafa\'kan khabar.',
    ruleFormula: 'كَانَ: Isim Marfu\' + Khabar Manshub  |  إِنَّ: Isim Manshub + Khabar Marfu\'',
    hudhudTips: 'Cermin Kaana vs Inna: Kaana = Naik dulu baru Turun. Inna = Turun dulu baru Naik!',
    examples: [
      { ar: 'إِنَّ اللَّهَ غَفُورٌ رَحِيمٌ', translit: 'Inna Llāha ghafūrun raḥīm', id: 'Sesungguhnya Allah Maha Pengampun lagi Maha Penyayang.', breakdown: 'اللَّهَ = Isim Inna manshub fathah, غَفُورٌ = Khabar Inna marfu\' dhommah.' },
      { ar: 'كَانَ الجَوُّ بَارِدًا', translit: 'Kāna l-jawwu bāridan', id: 'Cuaca dahulu dingin.', breakdown: 'كَانَ menjadikan الجَوُّ marfu\' dan bāridan manshub fathatain.' },
      { ar: 'لَيْسَ النَّجَاحُ سَهْلًا', translit: 'Laysa n-najāḥu sahlan', id: 'Kesuksesan itu tidaklah mudah.', breakdown: 'Laysa adalah saudara Kaana untuk penafian nominal.' }
    ]
  },
  {
    id: 'g9',
    level: 4,
    levelLabel: 'Level 4: Mutawassith 2 (B2)',
    title: 'Adawat Nashab & Jazm Fi\'il Mudhari\' (Lan vs Lam)',
    titleAr: 'نَوَاصِبُ وَجَوَازِمُ الفِعْلِ المُضَارِع (لَنْ وَلَمْ)',
    category: 'nahwu',
    conceptExplanation: 'Fi\'il mudhari\' yang asalnya marfu\' dhommah berubah menjadi fathah jika didahului partikel penashab (An, Lan, Kay), dan berubah menjadi sukun jika dimasuki penjuzuk (Lam, La Nahiyah).',
    ruleFormula: 'لَنْ + [Fi\'il Mudhari\' Manshub (-a)]  |  لَمْ + [Fi\'il Mudhari\' Majzum (-ْ)]',
    hudhudTips: 'Lan menashabkan masa depan (tidak akan pernah), Lam menjazmkan masa lalu (belum pernah)!',
    examples: [
      { ar: 'لَنْ يَذْهَبَ الكَسْلَانُ', translit: 'Lan yadhhaba l-kaslān', id: 'Orang malas tidak akan pernah pergi.', breakdown: 'يَذْهَبَ = Manshub fathah karena partikel Lan.' },
      { ar: 'لَمْ يَلِدْ وَلَمْ يُولَدْ', translit: 'Lam yalid wa-lam yūlad', id: 'Tidak beranak dan tidak diperanakkan.', breakdown: 'يَلِدْ = Majzum sukun karena partikel Lam penafi.' },
      { ar: 'لَا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا', translit: 'Lā taḥzan inna Llāha maʿanā', id: 'Jangan bersedih, sesungguhnya Allah bersama kita.', breakdown: 'Lā an-Nahiyah menjazmkan kata kerja larangan.' }
    ]
  },
  {
    id: 'g10',
    level: 5,
    levelLabel: 'Level 5: Mutaqaddim (C1-C2)',
    title: 'Nomina Diptot: Mamnu\' min ash-Sharf',
    titleAr: 'المَمْنُوعُ مِنَ الصَّرْفِ (مَا لَا يَنْصَرِف)',
    category: 'irab',
    conceptExplanation: 'Isim tertentu dilarang menerima Tanwin dan apabila berada dalam kondisi Jar (kasrah), harakatnya DIGANTIKAN DENGAN FATHAH (seperti nama non-Arab Ibrahim, pola jamak Masajid).',
    ruleFormula: 'Kena Harf Jar ⟶ Berharakat Fathah tanpa tanwin!',
    hudhudTips: 'Kecuali dimasuki Alif Lam atau menjadi Mudhaf, kata Mamnu\' min ash-Sharf pantang menerima kasrah!',
    examples: [
      { ar: 'صَلَّيْتُ فِي مَسَاجِدَ كَثِيرَةٍ', translit: 'Ṣallaytu fī masājida kathīrah', id: 'Aku salat di banyak masjid.', breakdown: 'مَسَاجِدَ = Majrur dengan harakat Fathah tanpa tanwin.' },
      { ar: 'إِلَى إِبْرَاهِيمَ وَإِسْمَاعِيلَ', translit: 'Ilā ibrāhīma wa-ismāʿīl', id: 'Kepada Ibrahim dan Ismail.', breakdown: 'Nama \'Ajam non-Arab majrur berharakat fathah.' },
      { ar: 'فِي المَسَاجِدِ التَّارِيخِيَّةِ', translit: 'Fī l-masājidi t-tārīkhiyyah', id: 'Di masjid-masjid bersejarah.', breakdown: 'Kembali berkasrah normal karena dimasuki Alif Lam.' }
    ]
  },
  {
    id: 'g11',
    level: 5,
    levelLabel: 'Level 5: Mutaqaddim (C1-C2)',
    title: 'Derivasi Isim Musytaq: Isim Fa\'il, Maf\'ul, & Alat',
    titleAr: 'مُشْتَقَّاتُ الأَسْمَاء: الفَاعِل، المَفْعُول، وَالآلَة',
    category: 'sharaf',
    conceptExplanation: 'Morfologi Arab menciptakan nama pelaku (Fa\'il: Kaatib), objek penderita (Maf\'ul: Maktuub), nama tempat (Maktab), dan perkakas (Alat: Miftaah) dari akar 3 huruf yang sama.',
    ruleFormula: 'كَتَبَ ⟶ كَاتِبٌ (Pelaku) | مَكْتُوبٌ (Objek) | مَكْتَبٌ (Tempat)',
    hudhudTips: 'Pelaku aktif wazan Fa\'ilun (katib), objek penderita wazan Maf\'ulun (maktub), perkakas diawali Mi- (miftah)!',
    examples: [
      { ar: 'الكَاتِبُ يَكْتُبُ المَكْتُوبَ', translit: 'Al-kātibu yaktubu l-maktūb', id: 'Penulis itu menulis surat takdir.', breakdown: 'Perpaduan Isim Fa\'il dan Isim Maf\'ul dari akar K-T-B.' },
      { ar: 'مِفْتَاحُ البَابِ عَلَى المَكْتَبِ', translit: 'Miftāḥu l-bābi ʿalā l-maktab', id: 'Kunci pintu ada di atas meja kantor.', breakdown: 'Miftāḥ = Isim Alat perkakas, Maktab = Isim Makan nama tempat.' }
    ]
  },
  {
    id: 'g12',
    level: 5,
    levelLabel: 'Level 5: Mutaqaddim (C1-C2)',
    title: 'Klimaks Ilmu Nahwu: Analisis I\'rab Aplikatif',
    titleAr: 'الإِعْرَابُ التَّطْبِيقِيُّ فِي النُّصُوصِ الفَصِيحَة',
    category: 'irab',
    conceptExplanation: 'Puncak kemahiran Nahwu: membedah kedudukan sintaksis, hukum hukum i\'rab, dan tanda harakat setiap kata dalam teks Arab gundul klasik dan ayat Al-Qur\'an.',
    ruleFormula: '[Kedudukan Kata] + [Hukum I\'rab] + [Tanda Harakat / Huruf]',
    hudhudTips: 'Temukan dulu kata kerjanya (Fi\'il) atau subjeknya (Mubtada\'), lalu cari pelakunya, baru bedah ekor kalimatnya!',
    examples: [
      { ar: 'قَالَ اللَّهُ تَبَارَكَ وَتَعَالَى', translit: 'Qāla Llāhu tabāraka wa-taʿālā', id: 'Allah Tabaraka wa Ta\'ala berfirman.', breakdown: 'قَالَ = Fi\'il Madhi mabni fathah, اللَّهُ = Fa\'il lafzhul jalalah marfu\' bi-dhommah.' },
      { ar: 'بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ', translit: 'Bi-smi Llāhi r-raḥmāni r-raḥīm', id: 'Dengan menyebut nama Allah Yang Maha Pengasih lagi Maha Penyayang.', breakdown: 'Bedah lengkap: Harf Jar, Isim Majrur, Mudhaf Ilaih, dan dua Na\'at majrur kasrah.' }
    ]
  }
];

export const PulauQawaidHubModal: React.FC<PulauQawaidHubModalProps> = ({
  island,
  profile,
  onClose,
  onLaunchGame
}) => {
  const [activeTab, setActiveTab] = useState<'pilar' | 'tashrif' | 'skills' | 'kamus'>('pilar');
  const [selectedConcept, setSelectedConcept] = useState<GrammarConceptCard>(GRAMMAR_SHOWCASE[0]);
  const [selectedRootIdx, setSelectedRootIdx] = useState(0);
  const [selectedTense, setSelectedTense] = useState<'madhi' | 'mudhari'>('madhi');
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<'all' | 1 | 2 | 3 | 4 | 5>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const qwdSkills = SKILLS_DATA.filter(s => s.owner_island === 'QWD');
  const qwdLexemes = LEXICON_DATA.filter(l => l.owner_island === 'QWD');
  const activeRoot = TASHRIF_ROOTS[selectedRootIdx];

  const handleSpeak = (text: string) => {
    sound.speakArabic(text);
  };

  // Filtered skills based on level and search
  const filteredSkills = useMemo(() => {
    return qwdSkills.filter(sk => {
      const matchLevel = selectedLevelFilter === 'all' || sk.level === selectedLevelFilter;
      const matchSearch = searchQuery.trim() === '' ||
        sk.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sk.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sk.skill_id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchLevel && matchSearch;
    });
  }, [qwdSkills, selectedLevelFilter, searchQuery]);

  // Filtered showcase cards
  const filteredShowcase = useMemo(() => {
    if (selectedLevelFilter === 'all') return GRAMMAR_SHOWCASE;
    return GRAMMAR_SHOWCASE.filter(c => c.level === selectedLevelFilter);
  }, [selectedLevelFilter]);

  // Filtered lexemes based on level and search
  const filteredLexemes = useMemo(() => {
    return qwdLexemes.filter(lex => {
      const matchLevel = selectedLevelFilter === 'all' || lex.level === selectedLevelFilter;
      const matchSearch = searchQuery.trim() === '' ||
        lex.ar_vocalized.includes(searchQuery) ||
        lex.translit.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lex.gloss_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (lex.category && lex.category.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchLevel && matchSearch;
    });
  }, [qwdLexemes, selectedLevelFilter, searchQuery]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.94 }}
        className="w-full max-w-5xl bg-slate-900 border-2 border-blue-500/50 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[95vh] text-white"
      >
        {/* Header Hero Banner */}
        <div className="relative bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-950 p-5 sm:p-6 border-b border-blue-500/30">
          <div className="flex items-start justify-between relative z-10">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center shadow-lg border-2 border-blue-300/40 text-2xl">
                ⛰️
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-blue-500/30 text-blue-300 border border-blue-400/30">
                    Pulau ke-4 • جَبَلُ القَوَاعِد
                  </span>
                  <span className="text-xs bg-emerald-400/90 text-slate-950 font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Kurikulum 100% Penuh (30 Modul Dedikatif)
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-chibi mt-1 text-white flex items-center gap-2">
                  Gunung Qawa'id <span className="text-blue-300 font-arabic text-xl font-normal">(جَبَلُ القَوَاعِد)</span>
                </h2>
                <p className="text-xs sm:text-sm text-blue-200/90 mt-0.5 max-w-2xl leading-relaxed">
                  Pusat arsitektur tata bahasa Arab (Nahwu & Sharaf): struktur kalimat sempurna, gender kata, wazan konjugasi fi'il, dan kaidah i'rab lintas Jenjang 1 sampai 5.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors font-bold text-lg"
            >
              ✕
            </button>
          </div>

          {/* Quick Stats Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-5">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-2.5 flex items-center gap-2.5">
              <Mountain className="w-5 h-5 text-blue-400 shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Materi Nahwu-Sharaf</p>
                <p className="text-sm font-extrabold text-blue-300">30 Skill Dedikatif (100%)</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-2.5 flex items-center gap-2.5">
              <Sliders className="w-5 h-5 text-indigo-400 shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Akar Morfologi</p>
                <p className="text-sm font-extrabold text-indigo-300">{TASHRIF_ROOTS.length} Akar 3 Huruf</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-2.5 flex items-center gap-2.5">
              <Shield className="w-5 h-5 text-sky-400 shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Kosakata Kaidah</p>
                <p className="text-sm font-extrabold text-sky-300">{qwdLexemes.length} Leksikon Terapan</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-2.5 flex items-center gap-2.5">
              <Award className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Standar Kurikulum</p>
                <p className="text-sm font-extrabold text-amber-300">Gold Standard CEFR A1-C2</p>
              </div>
            </div>
          </div>
        </div>

        {/* Level Filter Bar & Search */}
        <div className="bg-slate-950/80 px-4 sm:px-6 py-2.5 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5 text-blue-400" /> Jenjang:
            </span>
            {(['all', 1, 2, 3, 4, 5] as const).map(lvl => (
              <button
                key={lvl}
                onClick={() => {
                  setSelectedLevelFilter(lvl);
                  sound.playTap();
                }}
                className={`text-xs px-2.5 py-1 rounded-xl font-bold transition-all ${
                  selectedLevelFilter === lvl
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {lvl === 'all' ? 'Semua Jenjang' : `L${lvl} (${lvl === 1 ? 'Mubtadi\'' : lvl === 2 ? 'Asasi' : lvl === 3 ? 'Mutawassith 1' : lvl === 4 ? 'Mutawassith 2' : 'Mutaqaddim'})`}
              </button>
            ))}
          </div>

          <div className="relative min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kaidah atau kata..."
              className="w-full pl-8 pr-3 py-1 text-xs bg-slate-800/80 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-400"
            />
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 bg-slate-950/60 px-4 sm:px-6 gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('pilar')}
            className={`py-3 px-4 font-bold text-xs sm:text-sm flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'pilar'
                ? 'border-blue-400 text-blue-300 bg-blue-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" /> 12 Pilar Kaidah Emas
          </button>
          <button
            onClick={() => setActiveTab('tashrif')}
            className={`py-3 px-4 font-bold text-xs sm:text-sm flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'tashrif'
                ? 'border-indigo-400 text-indigo-300 bg-indigo-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sliders className="w-4 h-4" /> Laboratorium Tashrif
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`py-3 px-4 font-bold text-xs sm:text-sm flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'skills'
                ? 'border-sky-400 text-sky-300 bg-sky-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" /> Silabus 30 Modul Dedikatif ({filteredSkills.length})
          </button>
          <button
            onClick={() => setActiveTab('kamus')}
            className={`py-3 px-4 font-bold text-xs sm:text-sm flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'kamus'
                ? 'border-amber-400 text-amber-300 bg-amber-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" /> Glosarium Kaidah ({filteredLexemes.length})
          </button>
        </div>

        {/* Modal Main Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {/* TAB 1: 12 PILAR KAIDAH NAHWU */}
          {activeTab === 'pilar' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              {/* Concept Picker Sidebar */}
              <div className="md:col-span-5 space-y-2 max-h-[58vh] overflow-y-auto pr-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Pilih Kaidah ({filteredShowcase.length}):
                  </h4>
                </div>
                {filteredShowcase.map((concept) => (
                  <button
                    key={concept.id}
                    onClick={() => {
                      setSelectedConcept(concept);
                      sound.playTap();
                    }}
                    className={`w-full text-left p-3 rounded-2xl border transition-all ${
                      selectedConcept.id === concept.id
                        ? 'bg-blue-600/30 border-blue-400 text-white shadow-md'
                        : 'bg-slate-800/60 border-white/5 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-white/10 text-blue-300">
                        {concept.levelLabel.split(':')[0]}
                      </span>
                      <span className="text-xs font-arabic text-slate-400">{concept.titleAr.split(' ')[0]}</span>
                    </div>
                    <h5 className="font-bold text-sm text-white mt-1.5 leading-snug">{concept.title}</h5>
                  </button>
                ))}

                {/* Quick Launch Game Cards */}
                <div className="pt-3 border-t border-white/10 space-y-2">
                  <div className="bg-gradient-to-r from-blue-900/60 to-indigo-900/60 border border-blue-400/30 p-3 rounded-2xl">
                    <p className="text-[11px] font-bold text-blue-300">Latihan Susun Kalimat:</p>
                    <button
                      onClick={() => onLaunchGame('sentence_bridge')}
                      className="w-full mt-2 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" /> Mainkan Sentence Bridge
                    </button>
                  </div>
                </div>
              </div>

              {/* Concept Deep Dive View */}
              <div className="md:col-span-7 bg-slate-800/80 border border-blue-500/20 rounded-3xl p-5 space-y-4 max-h-[58vh] overflow-y-auto">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-xs font-arabic text-blue-300 block">{selectedConcept.titleAr}</span>
                    <h3 className="text-xl font-extrabold text-white mt-0.5">{selectedConcept.title}</h3>
                    <span className="text-[11px] text-blue-300/80 font-semibold">{selectedConcept.levelLabel}</span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 shrink-0">
                    {selectedConcept.category.toUpperCase()}
                  </span>
                </div>

                {/* Formula Badge */}
                <div className="bg-blue-950/80 border-2 border-blue-400/40 rounded-2xl p-3.5">
                  <span className="text-[10px] font-bold uppercase text-blue-300 tracking-wider block mb-1">
                    Rumus & Kaidah Susunan:
                  </span>
                  <div className="font-arabic text-lg sm:text-xl font-bold text-amber-300" dir="rtl">
                    {selectedConcept.ruleFormula}
                  </div>
                </div>

                {/* Concept Explanation */}
                <div className="bg-white/5 rounded-2xl p-4 border border-white/5 text-sm text-slate-200 leading-relaxed space-y-2">
                  <p className="font-semibold text-blue-300">Uraian Kaidah:</p>
                  <p>{selectedConcept.conceptExplanation}</p>
                </div>

                {/* Hudhud Tips */}
                <div className="bg-amber-500/10 border border-amber-400/30 rounded-2xl p-3 text-xs text-amber-200 flex items-start gap-2.5">
                  <span className="text-lg">🪶</span>
                  <div>
                    <p className="font-bold text-amber-300">Tips Hudhud si Burung Bijak:</p>
                    <p className="mt-0.5">{selectedConcept.hudhudTips}</p>
                  </div>
                </div>

                {/* Concrete Examples */}
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                    Contoh Kalimat Sempurna (Jumla Mufidah):
                  </h4>
                  <div className="space-y-2.5">
                    {selectedConcept.examples.map((ex, i) => (
                      <div
                        key={i}
                        className="bg-slate-900/90 border border-white/10 rounded-2xl p-3.5 flex items-start justify-between gap-3"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-arabic text-xl font-bold text-amber-300">{ex.ar}</span>
                            <button
                              onClick={() => handleSpeak(ex.ar)}
                              className="w-7 h-7 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 flex items-center justify-center transition-colors"
                              title="Dengar Lafal"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="text-xs text-blue-200 font-medium">"{ex.translit}"</p>
                          <p className="text-xs text-slate-300 font-semibold">Artinya: {ex.id}</p>
                          <p className="text-[11px] text-slate-400 italic mt-0.5">💡 {ex.breakdown}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LABORATORIUM TASHRIF */}
          {activeTab === 'tashrif' && (
            <div className="space-y-5">
              <div className="bg-gradient-to-r from-indigo-900/50 to-blue-900/50 border border-indigo-400/30 rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider">
                    Eksperimen Morfologi Sharaf:
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">
                    Mesin Konjugasi Fi'il Madhi & Mudhari'
                  </h3>
                  <p className="text-xs text-indigo-200 max-w-lg mt-0.5">
                    Pahami perubahan bentuk kata kerja Arab berdasarkan waktu dan subjek pelaku (Dhamir) dengan 7 akar kata 3 huruf terstandar.
                  </p>
                </div>
                <button
                  onClick={() => onLaunchGame('tashrif_lab')}
                  className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg active:scale-95 transition-all flex items-center gap-2 whitespace-nowrap"
                >
                  <Play className="w-4 h-4 fill-current" /> Buka Mesin Interaktif
                </button>
              </div>

              {/* Root Word Selector */}
              <div className="bg-slate-800/80 rounded-2xl p-4 border border-white/5 space-y-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Pilih Akar Kata (Al-Ashl 3 Huruf):
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                  {TASHRIF_ROOTS.map((root, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedRootIdx(idx);
                        sound.playTap();
                      }}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        selectedRootIdx === idx
                          ? 'bg-indigo-600 border-indigo-400 text-white shadow-md'
                          : 'bg-slate-900/60 border-white/5 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      <span className="font-arabic text-lg font-bold block">{root.root}</span>
                      <span className="text-[10px] text-slate-400 truncate block mt-0.5">
                        {root.baseMeaning.split(' ')[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tense Toggle */}
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedTense('madhi')}
                  className={`flex-1 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all border ${
                    selectedTense === 'madhi'
                      ? 'bg-blue-600 border-blue-400 text-white shadow-md'
                      : 'bg-slate-800/80 border-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  ⏳ Fi'il Madhi (Masa Lampau)
                </button>
                <button
                  onClick={() => setSelectedTense('mudhari')}
                  className={`flex-1 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all border ${
                    selectedTense === 'mudhari'
                      ? 'bg-indigo-600 border-indigo-400 text-white shadow-md'
                      : 'bg-slate-800/80 border-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  🔄 Fi'il Mudhari' (Masa Kini / Rutin)
                </button>
              </div>

              {/* Conjugation Grid for Selected Root */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {activeRoot.conjugations.map((conj, i) => {
                  const arabicWord = selectedTense === 'madhi' ? conj.madhi : conj.mudhari;
                  return (
                    <div
                      key={i}
                      className="bg-slate-800/90 border border-white/10 rounded-2xl p-4 flex flex-col justify-between hover:border-indigo-400/40 transition-all shadow-xs"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-indigo-300">{conj.pronoun}</span>
                        <button
                          onClick={() => handleSpeak(arabicWord)}
                          className="w-7 h-7 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 flex items-center justify-center transition-colors"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="font-arabic text-3xl font-bold text-amber-300 my-1 text-center" dir="rtl">
                        {arabicWord}
                      </div>
                      <p className="text-xs text-slate-300 text-center font-medium mt-1">"{conj.meaning}"</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: SILABUS SKILLS L1–L5 */}
          {activeTab === 'skills' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs text-slate-400">
                  Menampilkan {filteredSkills.length} dari 30 keterampilan terstruktur Gunung Qawa'id:
                </p>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> 100% Modul Lengkap
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredSkills.map((sk) => (
                  <div
                    key={sk.skill_id}
                    className="bg-slate-800/70 border border-white/5 rounded-2xl p-3.5 hover:border-blue-500/30 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-blue-500/30 text-blue-200 border border-blue-400/30">
                          Tingkat {sk.level} • {sk.level === 1 ? 'Mubtadi\'' : sk.level === 2 ? 'Asasi' : sk.level === 3 ? 'Mutawassith 1' : sk.level === 4 ? 'Mutawassith 2' : 'Mutaqaddim'}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400">{sk.skill_id}</span>
                      </div>
                      <h4 className="font-bold text-sm text-white mt-1.5">{sk.name}</h4>
                      <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{sk.description}</p>
                    </div>
                    <div className="mt-2 pt-2 border-t border-white/5 text-[11px] text-blue-300 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" /> {sk.scope}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: GLOSARIUM KAIDAH */}
          {activeTab === 'kamus' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs text-slate-400">
                  Menampilkan {filteredLexemes.length} kosakata, partikel harf, contoh kalimat & istilah gramatika:
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {filteredLexemes.map((lex) => (
                  <div
                    key={lex.id}
                    className="bg-slate-800/80 border border-white/5 rounded-2xl p-3 flex flex-col justify-between hover:border-blue-500/40 transition-all"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-base">{lex.visual_hint || '📖'}</span>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-white/10 text-blue-300">
                        {lex.category || `Level ${lex.level}`}
                      </span>
                    </div>
                    <div className="my-2 text-center">
                      <span className="font-arabic text-2xl font-bold text-amber-300 block leading-tight">
                        {lex.ar_vocalized}
                      </span>
                      <span className="text-[11px] text-blue-200 font-semibold block">{lex.translit}</span>
                      <span className="text-xs text-slate-300 font-medium block mt-0.5">{lex.gloss_id}</span>
                    </div>
                    <button
                      onClick={() => handleSpeak(lex.ar_vocalized)}
                      className="w-full py-1.5 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 text-blue-200 text-xs font-bold flex items-center justify-center gap-1 transition-colors"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Lafalkan
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-950/80 border-t border-white/10 flex items-center justify-between">
          <div className="text-xs text-slate-400 hidden sm:block">
            Semua modul Gunung Qawa'id terintegrasi dengan pemberian XP & Bintang Safir.
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => onLaunchGame('sentence_bridge')}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-current" /> Main Sentence Bridge
            </button>
            <button
              onClick={() => onLaunchGame('tashrif_lab')}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-current" /> Main Tashrif Lab
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
