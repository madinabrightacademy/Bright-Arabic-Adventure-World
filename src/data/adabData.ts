export interface DailyAdabItem {
  id: string;
  category: 'quran' | 'akhlak' | 'harian';
  title: string;
  arabicName: string;
  badge: string;
  icon: string;
  color: string;
  summary: string;
  actionGuide: string;
  arabicDua?: string;
  translitDua?: string;
  meaningDua?: string;
  dalilHadits: string;
  dalilSource: string;
  barakahPoints: number; // Poin berkah adab
  xpReward: number;
}

export const DAILY_ADAB_CATALOG: DailyAdabItem[] = [
  {
    id: 'adab_wudhu',
    category: 'quran',
    title: 'Adab Bersuci & Berwudhu',
    arabicName: 'الطَّهَارَةُ وَالْوُضُوءُ',
    badge: 'Sebelum Belajar',
    icon: '💧',
    color: 'from-cyan-500 to-blue-600',
    summary: 'Menyucikan diri dari hadats kecil sebelum menyentuh mushaf dan belajar kalam Ilahi.',
    actionGuide: 'Berwudhulah dengan tertib dan sempurna. Niatkan menjaga kesucian lahir dan batin.',
    arabicDua: 'أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا اللّٰهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
    translitDua: 'Asyhadu allā ilāha illallāhu waḥdahū lā syarīka lah, wa asyhadu anna Muḥammadan ‘abduhū wa rasūluh.',
    meaningDua: 'Aku bersaksi tiada tuhan selain Allah Yang Maha Esa tiada sekutu bagi-Nya, dan aku bersaksi Nabi Muhammad adalah hamba dan utusan-Nya.',
    dalilHadits: 'لَا يَمَسُّ الْقُرْآنَ إِلَّا طَاهِرٌ',
    dalilSource: 'HR. Malik dalam Al-Muwaththa\' & Ad-Daruquthni (Shahih)',
    barakahPoints: 20,
    xpReward: 30
  },
  {
    id: 'adab_doa_belajar',
    category: 'quran',
    title: 'Doa Memohon Tambahan Ilmu',
    arabicName: 'دُعَاءُ طَلَبِ الْعِلْمِ',
    badge: 'Doa Utama',
    icon: '🤲',
    color: 'from-amber-500 to-orange-600',
    summary: 'Memohon kemudahan pemahaman dan ilmu yang bermanfaat kepada Allah Ta\'ala.',
    actionGuide: 'Angkat kedua tangan dengan khusyuk sebelum mulai membaca huruf pertama.',
    arabicDua: 'رَبِّ زِدْنِي عِلْمًا وَارْزُقْنِي فَهْمًا وَاجْعَلْنِي مِنَ الصَّالِحِينَ',
    translitDua: 'Rabbi zidnī ‘ilmā, warzuqnī fahmā, waj‘alnī minaṣ-ṣāliḥīn.',
    meaningDua: 'Ya Rabb-ku, tambahkanlah kepadaku ilmu pengetahuan, anugerahilah aku kepahaman, dan jadikanlah aku termasuk hamba-hamba-Mu yang shalih.',
    dalilHadits: 'وَقُلْ رَبِّ زِدْنِي عِلْمًا',
    dalilSource: 'QS. Thaha: 114',
    barakahPoints: 25,
    xpReward: 35
  },
  {
    id: 'adab_basmalah',
    category: 'quran',
    title: 'Ta\'awwudz & Basmalah',
    arabicName: 'الِاسْتِعَاذَةُ وَالْبَسْمَلَةُ',
    badge: 'Kunci Tilawah',
    icon: '📖',
    color: 'from-emerald-500 to-teal-600',
    summary: 'Meminta perlindungan Allah dari bisikan setan dan memulai setiap kebaikan dengan nama Allah.',
    actionGuide: 'Lafalkan Ta\'awwudz dan Basmalah dengan suara jelas dan tartil sebelum membaca teks Arab.',
    arabicDua: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ • بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    translitDua: 'A‘ūżu billāhi minasy-syaiṭānir-rajīm. Bismillāhir-raḥmānir-raḥīm.',
    meaningDua: 'Aku berlindung kepada Allah dari godaan setan yang terkutuk. Dengan menyebut nama Allah Yang Maha Pengasih lagi Maha Penyayang.',
    dalilHadits: 'فَإِذَا قَرَأْتَ الْقُرْآنَ فَاسْتَعِذْ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ',
    dalilSource: 'QS. An-Nahl: 98',
    barakahPoints: 20,
    xpReward: 30
  },
  {
    id: 'adab_duduk',
    category: 'quran',
    title: 'Duduk Khusyuk & Menghadap Kiblat',
    arabicName: 'حُسْنُ الْجِلْسَةِ وَاسْتِقْبَالُ الْقِبْلَةِ',
    badge: 'Sikap Santri',
    icon: '🧘‍♂️',
    color: 'from-indigo-500 to-purple-600',
    summary: 'Duduk tegap, sopan, tenang, tidak bersandar malas, dan menghadap arah kiblat.',
    actionGuide: 'Atur posisi dudukmu bersila atau bertingkat dengan rileks namun penuh rasa hormat.',
    arabicDua: 'اللَّهُمَّ حَبِّبْ إِلَيْنَا الْإِيمَانَ وَزَيِّنْهُ فِي قُلُوبِنَا',
    translitDua: 'Allāhumma ḥabbib ilainal-īmāna wa zayyinhu fī qulūbinā.',
    meaningDua: 'Ya Allah, jadikanlah kami mencintai keimanan dan hiasilah keimanan itu dalam kalbu kami.',
    dalilHadits: 'خَيْرُ الْمَجَالِسِ مَا اسْتُقْبِلَ بِهِ الْقِبْلَةُ',
    dalilSource: 'HR. At-Thabrani (Sanad Hasan)',
    barakahPoints: 15,
    xpReward: 25
  },
  {
    id: 'adab_mushaf',
    category: 'quran',
    title: 'Memuliakan Mushaf Al-Qur\'an',
    arabicName: 'تَعْظِيمُ الْمُصْحَفِ الشَّرِيفِ',
    badge: 'Penghormatan',
    icon: '✨',
    color: 'from-amber-600 to-yellow-600',
    summary: 'Menempatkan mushaf atau buku Iqra di tempat yang tinggi, bersih, dan tidak menaruh barang di atasnya.',
    actionGuide: 'Gunakan meja kecil (rehal) atau tempat terhormat. Jangan letakkan mushaf langsung di lantai.',
    arabicDua: 'ذَٰلِكَ وَمَن يُعَظِّمْ شَعَائِرَ اللَّهِ فَإِنَّهَا مِن تَقْوَى الْقُلُوبِ',
    translitDua: 'Żālika wa may yu‘aẓẓim sya‘ā’irallāhi fa innahā min taqwal-qulūb.',
    meaningDua: 'Demikianlah (perintah Allah). Dan barangsiapa mengagungkan syiar-syiar Allah, maka sesungguhnya itu timbul dari ketakwaan hati.',
    dalilHadits: 'QS. Al-Hajj: 32',
    dalilSource: 'Kalamullah Ta\'ala',
    barakahPoints: 20,
    xpReward: 30
  },
  {
    id: 'adab_birrul_walidain',
    category: 'akhlak',
    title: 'Birrul Walidain (Berbakti pada Orang Tua)',
    arabicName: 'بِرُّ الْوَالِدَيْنِ',
    badge: 'Keluarga Berkah',
    icon: '👨‍👩‍👧',
    color: 'from-rose-500 to-pink-600',
    summary: 'Meminta doa dan restu orang tua sebelum belajar, serta bertutur kata lemah lembut kepada ayah dan ibu.',
    actionGuide: 'Cium tangan ayah atau ibu dan mintalah: "Ibu/Ayah, doakan aku agar lancar belajar mengaji hari ini ya."',
    arabicDua: 'رَّبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
    translitDua: 'Rabbighfir lī wa liwālidayya warḥamhumā kamā rabbayānī ṣaghīrā.',
    meaningDua: 'Wahai Tuhanku, ampunilah dosaku dan dosa kedua orang tuaku, dan sayangilah keduanya sebagaimana mereka mendidikku di waktu kecil.',
    dalilHadits: 'رِضَا الرَّبِّ فِي رِضَا الْوَالِدَيْنِ',
    dalilSource: 'HR. At-Tirmidzi (Shahih)',
    barakahPoints: 30,
    xpReward: 40
  },
  {
    id: 'adab_makan_minum',
    category: 'harian',
    title: 'Adab Makan & Minum Sunnah',
    arabicName: 'آدَابُ الطَّعَامِ وَالشَّرَابِ',
    badge: 'Sunnah Nabi',
    icon: '🍽️',
    color: 'from-orange-500 to-amber-700',
    summary: 'Makan dan minum sambil duduk, membaca Basmalah, menggunakan tangan kanan, dan tidak bernafas di dalam gelas.',
    actionGuide: 'Pastikan minum air dengan tenang 3 tegukan terpisah dan ucapkan Alhamdulillah sesudahnya.',
    arabicDua: 'يَا غُلَامُ، سَمِّ اللَّهَ، وَكُلْ بِيَمِينِكَ، وَكُلْ مِمَّا يَلِيكَ',
    translitDua: 'Yā ghulām, sammillāha, wa kul biyamīnika, wa kul mimmā yalīk.',
    meaningDua: 'Wahai anak muda, sebutlah nama Allah (Bismillah), makanlah dengan tangan kananmu, dan makanlah makanan yang dekat denganmu.',
    dalilHadits: 'HR. Al-Bukhari & Muslim',
    dalilSource: 'Hadits Shahih Bukhari No. 5376',
    barakahPoints: 20,
    xpReward: 30
  },
  {
    id: 'adab_kalam_thayyib',
    category: 'akhlak',
    title: 'Menjaga Lisan & Berkata Santun',
    arabicName: 'حِفْظُ اللِّسَانِ وَالْكَلَامُ الطَّيِّبُ',
    badge: 'Karakter Lisan',
    icon: '🗣️',
    color: 'from-teal-600 to-emerald-700',
    summary: 'Membiasakan perkataan yang baik, jujur, sopan, serta menjauhi celaan, ejekan, dan kata kasar.',
    actionGuide: 'Katakan kata-kata yang mendamaikan: "Jazakallahu khairan", "Afwan", "Tafadhdhal", atau diam jika tidak ada yang baik.',
    arabicDua: 'مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ',
    translitDua: 'Man kāna yu’minu billāhi wal-yaumil-ākhiri falyaqul khairan au liyaṣmut.',
    meaningDua: 'Barangsiapa beriman kepada Allah dan hari akhir, hendaklah ia berkata yang baik atau diam.',
    dalilHadits: 'HR. Al-Bukhari & Muslim',
    dalilSource: 'Hadits Arba\'in An-Nawawiyyah No. 15',
    barakahPoints: 25,
    xpReward: 35
  },
  {
    id: 'adab_senyum_salam',
    category: 'harian',
    title: 'Menebar Salam & Senyum Ikhlas',
    arabicName: 'إِفْشَاءُ السَّلَامِ وَالتَّبَسُّمُ',
    badge: 'Sedekah Mudah',
    icon: '😊',
    color: 'from-amber-400 to-pink-500',
    summary: 'Menyapa sesama dengan ucapan salam penuh doa (Assalamu\'alaikum) dan wajah berseri-seri.',
    actionGuide: 'Sapa saudaramu atau teman belajarmu dengan senyuman tulus sebelum memulai percakapan.',
    arabicDua: 'تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ لَكَ صَدَقَةٌ',
    translitDua: 'Tabassumuka fī wajhi akhīka laka ṣadaqah.',
    meaningDua: 'Senyummu di hadapan saudaramu adalah sedekah bagimu.',
    dalilHadits: 'HR. At-Tirmidzi (Shahih)',
    dalilSource: 'Sunan At-Tirmidzi No. 1956',
    barakahPoints: 20,
    xpReward: 30
  },
  {
    id: 'adab_kaffaratul_majelis',
    category: 'quran',
    title: 'Doa Kaffaratul Majelis (Penutup)',
    arabicName: 'دُعَاءُ كَفَّارَةِ الْمَجْلِسِ',
    badge: 'Penutup Belajar',
    icon: '🕊️',
    color: 'from-slate-700 to-teal-800',
    summary: 'Menutup sesi belajar dengan tasbih, tahmid, dan istighfar untuk menghapus kekeliruan selama majelis ilmu.',
    actionGuide: 'Ucapkan doa penutup ini dengan penuh tadharru\' setelah selesai menyimak pelajaran.',
    arabicDua: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا أَنْتَ، أَسْتَغْفِرُكَ وَأَتُوبُ إِلَيْكَ',
    translitDua: 'Subḥānakallāhumma wa biḥamdika, asyhadu allā ilāha illā anta, astaghfiruka wa atūbu ilaik.',
    meaningDua: 'Maha Suci Engkau ya Allah dan dengan memuji-Mu, aku bersaksi tiada tuhan yang berhak disembah selain Engkau, aku memohon ampunan-Mu dan bertobat kepada-Mu.',
    dalilHadits: 'HR. At-Tirmidzi & Abu Dawud',
    dalilSource: 'Hadits Shahih Tirmidzi No. 3433',
    barakahPoints: 25,
    xpReward: 35
  }
];
