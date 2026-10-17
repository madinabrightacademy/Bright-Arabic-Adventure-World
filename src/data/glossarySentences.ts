export interface ContextSentence {
  ar: string;
  translit: string;
  id: string;
  note?: string;
}

export const VOCAB_CONTEXT_SENTENCES: Record<string, ContextSentence> = {
  // Huruf / Makhraj
  lx_alif: {
    ar: 'أَلِفٌ حَرْفٌ مُبَارَكٌ يَبْدَأُ بِهِ كَلَامُ اللّٰهِ',
    translit: 'alifun ḥarfun mubārakun yabdaʾu bihi kalāmullāh',
    id: 'Alif adalah huruf berkah yang mengawali kalam Allah.',
    note: 'Makhraj Al-Jauf (rongga mulut)'
  },
  lx_baa: {
    ar: 'بَسْمَلَ التِّلْمِيذُ قَبْلَ قِرَاءَةِ الكِتَابِ',
    translit: 'basmala at-tilmīdhu qabla qirāʾati al-kitāb',
    id: 'Murid membaca basmalah sebelum membaca buku.',
    note: 'Makhraj Asy-Syafatan (dua bibir rapat)'
  },
  lx_taa: {
    ar: 'تَعَلَّمْتُ كِتَابَةَ حَرْفِ التَّاءِ بِنُقْطَتَيْنِ',
    translit: 'taʿallamtu kitābata ḥarfi at-tāʾi bi-nuqṭatayni',
    id: 'Aku belajar menulis huruf Ta dengan dua titik di atas.',
    note: 'Makhraj ujung lidah dengan pangkal gigi seri atas'
  },
  lx_tsaa: {
    ar: 'ثَلَاثَةُ أَقْلَامٍ جَدِيدَةٍ فِي حَقِيبَتِي',
    translit: 'thalāthatu aqlāmin jadīdatin fī ḥaqībatī',
    id: 'Tiga pena baru ada di dalam tasku.',
    note: 'Makhraj ujung lidah keluar sedikit menyentuh ujung gigi seri atas'
  },
  lx_jiim: {
    ar: 'جَلَسَ الطَّالِبُ عَلَى الكُرْسِيِّ بِخُشُوعٍ',
    translit: 'jalasa aṭ-ṭālibu ʿalā al-kursiyyi bi-khushūʿ',
    id: 'Siswa duduk di atas kursi dengan khusyuk.',
    note: 'Makhraj tengah lidah dengan langit-langit keras'
  },
  lx_haa_halqi: {
    ar: 'الحَمْدُ لِلّٰهِ رَبِّ العَالَمِينَ عَلَى نِعَمِهِ',
    translit: 'al-ḥamdu lillāhi rabbi l-ʿālamīna ʿalā niʿamih',
    id: 'Segala puji bagi Allah Rabb semesta alam atas nikmat-Nya.',
    note: 'Makhraj tengah tenggorokan (bersih & lembut)'
  },
  lx_khaa: {
    ar: 'خَرَجَ المُعَلِّمُ مِنَ الفَصْلِ بِابْتِسَامَةٍ',
    translit: 'kharaja al-muʿallimu mina l-faṣli bi-btisāmah',
    id: 'Guru keluar dari kelas sambil tersenyum.',
    note: 'Makhraj ujung tenggorokan (terdengar sedikit getaran parau)'
  },
  lx_dal: {
    ar: 'دَخَلَ سَالِمٌ المَسْجِدَ بِرِجْلِهِ اليُمْنَى',
    translit: 'dakhala sālimun al-masjida bi-rijlihi al-yumnā',
    id: 'Salim masuk ke masjid dengan kaki kanannya.',
    note: 'Makhraj ujung lidah bertemu pangkal gigi seri atas'
  },
  lx_dzal: {
    ar: 'ذَكَرَ المُؤْمِنُ رَبَّهُ صَبَاحًا وَمَسَاءً',
    translit: 'dhakara al-muʾminu rabbahu ṣabāḥan wa masāʾan',
    id: 'Orang beriman mengingat Tuhannya di pagi dan petang hari.',
    note: 'Makhraj ujung lidah menyentuh ujung gigi seri atas'
  },
  lx_raa: {
    ar: 'رَسَمَتْ عَائِشَةُ زَهْرَةً جَمِيلَةً فِي الكُرَّاسَةِ',
    translit: 'rasamat ʿāʾishatu zahratan jamīlatan fī al-kurrāsah',
    id: 'Aisyah menggambar bunga yang indah di buku tulis.',
    note: 'Makhraj ujung lidah dengan getaran ringan (takrir)'
  },
  lx_zay: {
    ar: 'زَارَ أَحْمَدُ جَدَّهُ فِي القَرْيَةِ يَوْمَ العُطْلَةِ',
    translit: 'zāra aḥmadu jaddahu fī al-qaryati yawma al-ʿuṭlah',
    id: 'Ahmad mengunjungi kakeknya di desa pada hari libur.',
    note: 'Makhraj ujung lidah dengan desis tajam serupa lebah'
  },
  lx_siin: {
    ar: 'سَمِعْتُ صَوْتَ الأَذَانِ يَمْلَأُ المَدِينَةَ',
    translit: 'samiʿtu ṣawta al-adhāni yamlaʾu al-madīnah',
    id: 'Aku mendengar suara adzan memenuhi kota.',
    note: 'Makhraj ujung lidah dengan desis lembut bersiul (shafir)'
  },
  lx_syiin: {
    ar: 'شَكَرْتُ اللّٰهَ عَلَى رِزْقِهِ الكَثِيرِ',
    translit: 'shakartullāha ʿalā rizqihi al-kathīr',
    id: 'Aku bersyukur kepada Allah atas rezeki-Nya yang melimpah.',
    note: 'Makhraj tengah lidah dengan hembusan udara meluas (tafasysyi)'
  },
  lx_shaad: {
    ar: 'صَلَّى الأَوْلَادُ صَلَاةَ الفَجْرِ فِي جَمَاعَةٍ',
    translit: 'ṣallā al-awlādu ṣalāta al-fajri fī jamāʿah',
    id: 'Anak-anak menunaikan shalat Shubuh secara berjamaah.',
    note: 'Makhraj tebal (ithbaq & istila), lidah terangkat ke langit-langit'
  },
  lx_dhaad: {
    ar: 'ضَحِكَ الطِّفْلُ فَرَحًا بِهَدِيَّةِ العِيدِ',
    translit: 'ḍaḥika aṭ-ṭiflu faraḥan bi-hadiyyati al-ʿīd',
    id: 'Anak kecil tertawa gembira menyambut hadiah Idul Fitri.',
    note: 'Makhraj tepi lidah bersentuhan dengan gigi geraham atas'
  },
  lx_thaa: {
    ar: 'طَلَبُ العِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ',
    translit: 'ṭalabu l-ʿilmi farīḍatun ʿalā kulli muslim',
    id: 'Menuntut ilmu adalah kewajiban bagi setiap muslim.',
    note: 'Makhraj ujung lidah tebal menggelembung'
  },
  lx_zhaa: {
    ar: 'ظَهَرَ النُّورُ السَّاطِعُ فِي السَّمَاءِ الصَّافِيَةِ',
    translit: 'ẓahara an-nūru as-sāṭiʿu fī as-samāʾi aṣ-ṣāfiyah',
    id: 'Tampak cahaya benderang di langit yang jernih.',
    note: 'Makhraj ujung lidah dengan gigi seri atas terangkat tebal'
  },
  lx_ayn: {
    ar: 'عَرَفَ الطَّالِبُ إِجَابَةَ السُّؤَالِ بِسُرْعَةٍ',
    translit: 'ʿarafa aṭ-ṭālibu ijābata as-suʾāli bi-surʿah',
    id: 'Murid itu mengetahui jawaban soal dengan cepat.',
    note: 'Makhraj tengah tenggorokan berayun lentur'
  },
  lx_ghayn: {
    ar: 'غَفَرَ اللّٰهُ ذُنُوبَ التَّائِبِينَ الرَّاجِعِينَ',
    translit: 'ghafarallāhu dhunūba at-tāʾibīna ar-rājiʿīn',
    id: 'Allah mengampuni dosa-dosa orang yang bertaubat.',
    note: 'Makhraj pangkal tenggorokan atas dengan getaran lembut'
  },
  lx_faa: {
    ar: 'فَتَحْتُ النَّافِذَةَ لِدُخُولِ الهَوَاءِ النَّقِيِّ',
    translit: 'fataḥtu an-nāfidhata li-dukhūli al-hawāʾi an-naqiyy',
    id: 'Aku membuka jendela agar udara segar masuk.',
    note: 'Makhraj ujung gigi seri atas menyentuh perut bibir bawah'
  },
  lx_qaaf: {
    ar: 'قَرَأَ الإِمَامُ سُورَةَ الفَاتِحَةِ بِصَوْتٍ عَذْبٍ',
    translit: 'qaraʾa al-imāmu sūrata al-fātiḥati bi-ṣawtin ʿadhb',
    id: 'Imam membaca Surat Al-Fatihah dengan suara yang merdu.',
    note: 'Makhraj pangkal lidah belakang membentur langit-langit lunak (tebal)'
  },
  lx_kaaf: {
    ar: 'كَتَبَ التِّلْمِيذُ رِسَالَةً جَمِيلَةً إِلَى أُمِّهِ',
    translit: 'kataba at-tilmīdhu risālatan jamīlatan ilā ummih',
    id: 'Murid menulis sepucuk surat manis untuk ibunya.',
    note: 'Makhraj pangkal lidah depan (tipis & keluar hembusan hams)'
  },
  lx_laam: {
    ar: 'لَعِبَ الأَطْفَالُ فِي الحَدِيقَةِ الخَضْرَاءِ',
    translit: 'laʿiba al-aṭfālu fī al-ḥadīqati al-khaḍrāʾ',
    id: 'Anak-anak bermain di taman yang hijau.',
    note: 'Makhraj ujung sisi lidah bersentuhan dengan gusi depan'
  },
  lx_miim: {
    ar: 'مَسَحْتُ رَأْسِي فِي الوُضُوءِ كَمَا أَمَرَ النَّبِيُّ',
    translit: 'masaḥtu raʾsī fī al-wuḍūʾi kamā amara an-nabiyy',
    id: 'Aku mengusap kepalaku saat berwudhu sesuai teladan Nabi.',
    note: 'Makhraj dua bibir merapat diiringi dengung halus'
  },
  lx_nuun: {
    ar: 'نَظَرَ يُوسُفُ إِلَى النُّجُومِ المُضِيئَةِ لَيْلًا',
    translit: 'naẓara yūsufu ilā an-nujūmi al-muḍīʾati laylan',
    id: 'Yusuf memandang bintang-bintang yang berkilau di waktu malam.',
    note: 'Makhraj ujung lidah dengan gusi atas berserta ghunnah pangkal hidung'
  },
  lx_ha_marbuth: {
    ar: 'هَدَى اللّٰهُ قُلُوبَنَا إِلَى صِرَاطٍ مُسْتَقِيمٍ',
    translit: 'hadallāhu qulūbanā ilā ṣirāṭin mustaqīm',
    id: 'Semoga Allah membimbing hati kita menuju jalan yang lurus.',
    note: 'Makhraj pangkal tenggorokan terdalam'
  },
  lx_waaw: {
    ar: 'وَصَلَ القِطَارُ إِلَى المَحَطَّةِ فِي المَوْعِدِ',
    translit: 'waṣala al-qiṭāru ilā al-maḥaṭṭati fī al-mawʿid',
    id: 'Kereta tiba di stasiun tepat pada waktunya.',
    note: 'Makhraj membulatkan dua bibir ke depan'
  },
  lx_yaa: {
    ar: 'يَسَّرَ اللّٰهُ لَنَا تَعَلُّمَ القُرْآنِ وَتِلَاوَتَهُ',
    translit: 'yassarallāhu lanā taʿalluma al-qurʾāni wa tilāwatah',
    id: 'Allah memudahkan bagi kita mempelajari Al-Qur\'an dan membacanya.',
    note: 'Makhraj tengah lidah naik mendekati langit-langit'
  },

  // Angka Mufradat
  lx_wahid: {
    ar: 'فِي الحَقِيبَةِ كِتَابٌ وَاحِدٌ أَقْرَأُ فِيهِ كُلَّ يَوْمٍ',
    translit: 'fī al-ḥaqībati kitābun wāḥidun aqraʾu fīhi kulla yawm',
    id: 'Di dalam tas ada satu buku yang kubaca setiap hari.',
    note: 'Konsep bilangan satu (mudzakkar)'
  },
  lx_ithnan: {
    ar: 'عِنْدِي قَلَمَانِ اثْنَانِ، أَحَدُهُمَا أَزْرَقُ وَالآخَرُ أَحْمَرُ',
    translit: 'ʿindī qalamāni ithnāni, aḥaduhumā azraqu wa al-ākharu aḥmar',
    id: 'Aku mempunyai dua pena, satu biru dan satu lagi merah.',
    note: 'Bentuk mutsanna (dua)'
  },
  lx_thalatsah: {
    ar: 'اشْتَرَيْتُ ثَلَاثَةَ كُتُبٍ مِنَ المَعْرِضِ',
    translit: 'ishtaraytu thalāthata kutubin mina l-maʿriḍ',
    id: 'Aku membeli tiga buku dari pameran.',
    note: 'Kaidah adad ma\'dud (berlawanan gender)'
  },
  lx_arbaah: {
    ar: 'فِي الأُسْبُوعِ أَرْبَعَةُ أَيَّامٍ لِدِرَاسَةِ اللُّغَةِ العَرَبِيَّةِ',
    translit: 'fī al-usbūʿi arbaʿatu ayyāmin li-dirāsati al-lughati al-ʿarabiyyah',
    id: 'Dalam sepekan ada empat hari untuk belajar bahasa Arab.',
    note: 'Bilangan empat'
  },
  lx_khamsah: {
    ar: 'نُؤَدِّي خَمْسَ صَلَوَاتٍ مَفْرُوضَةٍ فِي اليَوْمِ وَاللَّيْلَةِ',
    translit: 'nuʾaddī khamsa ṣalawātin mafrūḍatin fī al-yawmi wa al-laylah',
    id: 'Kita menunaikan lima shalat fardhu dalam sehari semalam.',
    note: 'Rukun Islam ke-2'
  },
  lx_sittah: {
    ar: 'أَرْكَانُ الإِيمَانِ سِتَّةٌ نُؤْمِنُ بِهَا جَمِيعًا',
    translit: 'arkānu al-īmāni sittatun nuʾminu bihā jamīʿā',
    id: 'Rukun iman ada enam yang wajib kita imani seluruhnya.',
    note: 'Bilangan enam'
  },
  lx_sabah: {
    ar: 'خَلَقَ اللّٰهُ سَبْعَ سَمَاوَاتٍ طِبَاقًا',
    translit: 'khalaqallāhu sabʿa samāwātin ṭibāqā',
    id: 'Allah telah menciptakan tujuh lapis langit bertingkat-tingkat.',
    note: 'Surat Al-Mulk ayat 3'
  },
  lx_thamaniyah: {
    ar: 'فِي الحَدِيقَةِ ثَمَانِيَةُ عَصَافِيرَ تُغَرِّدُ بِفَرَحٍ',
    translit: 'fī al-ḥadīqati thamāniyatu ʿaṣāfīra tugharridu bi-faraḥ',
    id: 'Di taman ada delapan burung berkicau dengan riang.',
    note: 'Bilangan delapan'
  },
  lx_tisah: {
    ar: 'حَفِظَ أَحْمَدُ تِسْعَ سُوَرٍ مِنَ الجُزْءِ الثَّلَاثِينَ',
    translit: 'ḥafiẓa aḥmadu tisʿa suwarin mina l-juzʾi ath-thalāthīn',
    id: 'Ahmad telah menghafal sembilan surat dari Juz 30.',
    note: 'Bilangan sembilan'
  },
  lx_asyarah: {
    ar: 'مَنْ جَاءَ بِالحَسَنَةِ فَلَهُ عَشْرُ أَمْثَالِهَا',
    translit: 'man jāʾa bi-l-ḥasanati falahū ʿashru amthālihā',
    id: 'Barang siapa membawa amal baik, baginya pahala sepuluh kali lipatnya.',
    note: 'Surat Al-An\'am ayat 160'
  },

  // Warna
  lx_ahmar: {
    ar: 'هٰذَا التُّفَّاحُ أَحْمَرُ وَطَعْمُهُ حُلْوٌ جِدًّا',
    translit: 'hādhā at-tuffāḥu aḥmaru wa ṭaʿmuhu ḥulwun jiddan',
    id: 'Apel ini berwarna merah dan rasanya sangat manis.',
    note: 'Sifat warna mudzakkar'
  },
  lx_azraq: {
    ar: 'البَحْرُ الوَاسِعُ أَزْرَقُ الجَمَالِ تَحْتَ الشَّمْسِ',
    translit: 'al-baḥru al-wāsiʿu azraqu al-jamāli taḥta ash-shams',
    id: 'Lautan luas itu biru indah di bawah sinar mentari.',
    note: 'Sifat warna'
  },
  lx_akhdhar: {
    ar: 'أَشْجَارُ الحَدِيقَةِ خَضْرَاءُ تُعْطِينَا ظِلِّلًّا بَارِدًا',
    translit: 'ashjāru al-ḥadīqati khaḍrāʾu tuʿṭīnā ẓillan bāridā',
    id: 'Pohon-pohon taman itu hijau memberi kita naungan teduh.',
    note: 'Bentuk muannats: khaḍrāʾ'
  },
  lx_abyadh: {
    ar: 'لَبِسَ الحَاجُّ ثَوْبًا أَبْيَضَ نَاصِعًا',
    translit: 'labisa al-ḥājju thawban abyaḍa nāṣiʿā',
    id: 'Jamaah haji mengenakan pakaian ihram putih yang bersih.',
    note: 'Warna kesukaan Nabi saw.'
  },
  lx_aswad: {
    ar: 'الحَجَرُ الأَسْوَدُ فِي رُكْنِ الكَعْبَةِ المُشَرَّفَةِ',
    translit: 'al-ḥajaru al-aswadu fī rukni al-kaʿbati al-musharrafah',
    id: 'Hajar Aswad berada di sudut Ka\'bah yang dimuliakan.',
    note: 'Sebutan batu hitam Ka\'bah'
  },
  lx_ashfar: {
    ar: 'الشَّمْسُ تُشْرِقُ بِلَوْنٍ أَصْفَرَ ذَهَبِيٍّ',
    translit: 'ash-shamsu tushriqu bi-lawnyin aṣfara dhahabiyy',
    id: 'Matahari terbit dengan warna kuning keemasan.',
    note: 'Warna kuning'
  },

  // Benda Sekitar & Rumah
  lx_kitab: {
    ar: 'هٰذَا كِتَابٌ قَيِّمٌ يُعَلِّمُنَا حِكْمَةَ الحَيَاةِ',
    translit: 'hādhā kitābun qayyimun yuʿallimunā ḥikmata al-ḥayāh',
    id: 'Ini adalah buku berharga yang mengajari kita hikmah hidup.',
    note: 'Isim mufrad mudzakkar'
  },
  lx_qalam: {
    ar: 'أَكْتُبُ كَلِمَاتِ الصِّدْقِ بِالقَلَمِ عَلَى الوَرَقِ',
    translit: 'aktubu kalimāti aṣ-ṣidqi bi-l-qalami ʿalā al-waraq',
    id: 'Aku menulis kata-kata kejujuran dengan pena di atas kertas.',
    note: 'Pena / alat tulis'
  },
  lx_bab: {
    ar: 'ادْخُلُوا البُيُوتَ مِنْ أَبْوَابِهَا بِسَلَامٍ',
    translit: 'udkhulū al-buyūta min abwābihā bi-salām',
    id: 'Masukilah rumah-rumah dari pintu-pintunya dengan penuh salam.',
    note: 'Pintu rumah / ruangan'
  },
  lx_kursiy: {
    ar: 'آيَةُ الكُرْسِيِّ أَعْظَمُ آيَةٍ فِي كِتَابِ اللّٰهِ',
    translit: 'āyatu al-kursiyyi aʿẓamu āyatin fī kitābillāh',
    id: 'Ayat Kursi adalah ayat paling agung di dalam Kitab Allah.',
    note: 'Kursi / kedudukan mulia'
  },
  lx_thawilah: {
    ar: 'وَضَعَتْ أُمِّي أَطْبَاقَ الطَّعَامِ عَلَى الطَّاوِلَةِ',
    translit: 'waḍaʿat ummī aṭbāqa aṭ-ṭaʿāmi ʿalā aṭ-ṭāwilah',
    id: 'Ibuku meletakkan piring-piring makanan di atas meja makan.',
    note: 'Meja (muannats ber-ta marbuthah)'
  },
  lx_khubz: {
    ar: 'قَسَمَ الجَدُّ الخُبْزَ بَيْنَ الأَحْفَادِ بِالعَدْلِ',
    translit: 'qasama al-jaddu al-khubza bayna al-aḥfādi bi-l-ʿadl',
    id: 'Kakek membagi roti gandum di antara cucu-cucunya secara adil.',
    note: 'Makanan pokok roti'
  },
  lx_maa: {
    ar: 'وَجَعَلْنَا مِنَ المَاءِ كُلَّ شَيْءٍ حَيٍّ',
    translit: 'wa jaʿalnā mina l-māʾi kulla shayʾin ḥayy',
    id: 'Dan Kami jadikan dari air segala sesuatu yang hidup.',
    note: 'Surat Al-Anbiya ayat 30'
  },
  lx_halib: {
    ar: 'شَرِبَ الرَّضِيعُ الحَلِيبَ الدَّافِئَ وَنَامَ هَادِئًا',
    translit: 'shariba ar-raḍīʿu al-ḥalība ad-dāfiʾa wa nāma hādiʾā',
    id: 'Bayi meminum susu hangat lalu tertidur dengan tenang.',
    note: 'Minuman berkah'
  },
  lx_tamr: {
    ar: 'كَانَ النَّبِيُّ يُفْطِرُ عَلَى تَمَرَاتٍ قَبْلَ أَنْ يُصَلِّيَ',
    translit: 'kāna an-nabiyyu yufṭiru ʿalā tamarātin qabla an yuṣallī',
    id: 'Nabi biasa berbuka dengan beberapa kurma sebelum menunaikan shalat.',
    note: 'Sunnah berbuka puasa'
  },
  lx_qittah: {
    ar: 'القِطَّةُ حَيَوَانٌ أَلِيفٌ يَجِبُ الرِّفْقُ بِهِ',
    translit: 'al-qiṭṭatu ḥayawānun alīfun yajibu ar-rifqu bih',
    id: 'Kucing adalah hewan jinak yang wajib disayangi dan diperlakukan lembut.',
    note: 'Adab menyayangi hewan'
  },
  lx_samakah: {
    ar: 'تَسْبَحُ السَّمَكَةُ الصَّغِيرَةُ بَيْنَ الشِّعَابِ المَرْجَانِيَّةِ',
    translit: 'tasbaḥu as-samakatu aṣ-ṣaghīratu bayna ash-shiʿābi al-marjāniyyah',
    id: 'Ikan kecil berenang lincah di sela-sela terumbu karang.',
    note: 'Hewan air halal bangkainya'
  },
  lx_thair: {
    ar: 'يُسَبِّحُ الطَّائِرُ رَبَّهُ بِغِنَائِهِ الجَمِيلِ كُلَّ فَجْرٍ',
    translit: 'yusabbiḥu aṭ-ṭāʾiru rabbahu bi-ghināʾihi al-jamīli kulla fajr',
    id: 'Burung bertasbih kepada Tuhannya dengan kicauan indah setiap fajar.',
    note: 'Burung di alam'
  },
  lx_jamal: {
    ar: 'أَفَلَا يَنْظُرُونَ إِلَى الإِبِلِ كَيْفَ خُلِقَتْ',
    translit: 'afalā yanẓurūna ilā al-ibili kayfa khuliqat',
    id: 'Maka tidakkah mereka memperhatikan unta bagaimana ia diciptakan?',
    note: 'Surat Al-Ghasyiyah ayat 17'
  },
  lx_asad: {
    ar: 'الأَسَدُ شُجَاعٌ يَمْشِي بِعِزَّةٍ فِي الغَابَةِ',
    translit: 'al-asadu shujāʿun yamshī bi-ʿizzatin fī al-ghābah',
    id: 'Singa itu berani berjalan penuh wibawa di dalam hutan.',
    note: 'Raja rimba'
  },

  // Anggota Keluarga & Tubuh
  lx_ab: {
    ar: 'رِضَا اللّٰهِ فِي رِضَا الوَالِدَيْنِ، فَبِرَّ أَبَاكَ وَأُمَّكَ',
    translit: 'riḍallāhi fī riḍā al-wālidayn, fa-birra abāka wa ummak',
    id: 'Ridha Allah terletak pada ridha kedua orang tua, maka berbaktilah pada ayah dan ibumu.',
    note: 'Hadits Birrul Walidain'
  },
  lx_umm: {
    ar: 'الجَنَّةُ تَحْتَ أَقْدَامِ الأُمَّهَاتِ، فَأَطِعْ أُمَّكَ وَأَحْسِنْ إِلَيْهَا',
    translit: 'al-jannatu taḥta aqdāmi al-ummahāt, fa-aṭiʿ ummaka wa aḥsin ilayhā',
    id: 'Surga berada di bawah telapak kaki ibu, maka patuhilah dan berbuat baiklah padanya.',
    note: 'Kemuliaan ibu dalam Islam'
  },
  lx_yad: {
    ar: 'اليَدُ العُلْيَا خَيْرٌ مِنَ اليَدِ السُّفْلَى فِي العَطَاءِ',
    translit: 'al-yadu al-ʿulyā khayrun mina l-yadi as-suflā fī al-ʿaṭāʾ',
    id: 'Tangan di atas (memberi) lebih baik daripada tangan di bawah (meminta).',
    note: 'Hadits anjuran bersedekah'
  },
  lx_ayn_body: {
    ar: 'غَضُّ العَيْنِ عَنِ الحَرَامِ طَهَارَةٌ لِلْقَلْبِ',
    translit: 'ghaḍḍu al-ʿayni ʿani al-ḥarāmi ṭahāratun li-l-qalb',
    id: 'Menjaga pandangan mata dari yang haram adalah kesucian bagi hati.',
    note: 'Adab menjaga penglihatan'
  },
  lx_fam: {
    ar: 'قُلْ خَيْرًا أَوْ لِتَصْمُتْ حِفْظًا لِلِسَانِكَ وَفَمِكَ',
    translit: 'qul khayran aw li-taṣmut ḥifẓan li-lisānika wa famik',
    id: 'Katakanlah perkataan yang baik atau diam demi menjaga lisan dan mulutmu.',
    note: 'Hadits etika bertutur kata'
  },
  lx_raas: {
    ar: 'ارْفَعْ رَأْسَكَ بِالعِلْمِ وَالأَخْلَاقِ الفَاضِلَةِ',
    translit: 'irfaʿ raʾsaka bi-l-ʿilmi wa al-akhlāqi al-fāḍilah',
    id: 'Tegakkan kepalamu dengan bekal ilmu dan akhlak mulia.',
    note: 'Kepala & kemuliaan akal'
  },

  // Hiwar & Frasa
  lx_marhaban: {
    ar: 'مَرْحَبًا بِكُمُ اليَوْمَ فِي نَادِي اللُّغَةِ العَرَبِيَّةِ',
    translit: 'marḥaban bikumu al-yawma fī nādī al-lughati al-ʿarabiyyah',
    id: 'Selamat datang kalian hari ini di klub bahasa Arab.',
    note: 'Ucapan sambutan hangat'
  },
  lx_salam: {
    ar: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللّٰهِ وَبَرَكَاتُهُ',
    translit: 'as-salāmu ʿalaykum wa raḥmatullāhi wa barakātuh',
    id: 'Semoga keselamatan, rahmat Allah, dan berkah-Nya tercurah atas kalian.',
    note: 'Salam penghuni surga'
  },
  lx_shukran: {
    ar: 'شُكْرًا جَزِيلًا لَكَ عَلَى مُسَاعَدَتِكَ الكَرِيمَةِ',
    translit: 'shukran jazīlan laka ʿalā musāʿadatika al-karīmah',
    id: 'Terima kasih banyak atas bantuanmu yang sangat baik.',
    note: 'Adab berterima kasih'
  },
  lx_afwan: {
    ar: 'عَفْوًا، هٰذَا وَاجِبِي فِي تَقْدِيمِ العَوْنِ لِلصَّدِيقِ',
    translit: 'ʿafwan, hādhā wājibī fī taqdīmi al-ʿawni li-ṣ-ṣadīq',
    id: 'Sama-sama (maaf), ini sudah kewajibanku membantu sahabat.',
    note: 'Jawaban sopan untuk syukran'
  },

  // Qawaid & Gramatika
  lx_sep_darasa: {
    ar: 'دَرَسَ فَاطِمَةُ وَزَيْدٌ نُصُوصَ القِرَاءَةِ سَوِيًّا',
    translit: 'darasa fāṭimatu wa zaydun nuṣūṣa al-qirāʾati sawiyyā',
    id: 'Fatimah dan Zaid mempelajari teks bacaan bersama-sama.',
    note: 'Fi\'il madhi (telah belajar)'
  },
  lx_sep_bab: {
    ar: 'فَتَحَ الحَارِسُ بَابَ المَدْرَسَةِ لِدُخُولِ التَّلَامِيذِ',
    translit: 'fataḥa al-ḥārisu bāb al-madrasati li-dukhūli at-talāmīdh',
    id: 'Penjaga membuka pintu gerbang sekolah untuk masuknya para murid.',
    note: 'Isim maf\'ul bih berharakat fathah'
  },
  lx_mad_qala: {
    ar: 'قَالَ رَسُولُ اللّٰهِ: طَلَبُ العِلْمِ فَرِيضَةٌ',
    translit: 'qāla rasūlullāh: ṭalabu l-ʿilmi farīḍah',
    id: 'Rasulullah bersabda: Menuntut ilmu adalah kewajiban.',
    note: 'Fi\'il ajwaf dengan mad thabi\'i alif'
  },
  lx_mad_nur: {
    ar: 'العِلْمُ نُورٌ يَهْدِي صَاحِبَهُ إِلَى طَرِيقِ الخَيْرِ',
    translit: 'al-ʿilmu nūrun yahdī ṣāḥibahu ilā ṭarīqi al-khayr',
    id: 'Ilmu itu laksana cahaya yang menuntun pemiliknya ke jalan kebaikan.',
    note: 'Kata mutiara Arab masyhur'
  },
  lx_tm_madrasah: {
    ar: 'مَدْرَسَتِي نَظِيفَةٌ وَمُعَلِّمُوهَا يُحِبُّونَ الخَيْرَ لَنَا',
    translit: 'madrasatī naẓīfatun wa muʿallimūhā yuḥibbūna al-khayra lanā',
    id: 'Sekolahku bersih dan para gurunya menginginkan kebaikan bagi kami.',
    note: 'Ta Marbuthah berubah bunyi "t" saat diidhafahkan'
  }
};

/**
 * Returns a high-quality context sentence for any given lexeme.
 * If not explicitly registered in VOCAB_CONTEXT_SENTENCES, constructs a pedagogically
 * accurate contextual sentence based on category, POS, and meaning.
 */
export function getLexemeContextSentence(lex: {
  id: string;
  ar_vocalized: string;
  translit: string;
  gloss_id: string;
  pos: string;
  category: string;
  owner_island: string;
}): ContextSentence {
  if (VOCAB_CONTEXT_SENTENCES[lex.id]) {
    return VOCAB_CONTEXT_SENTENCES[lex.id];
  }

  // Smart contextual fallback based on POS and island
  const word = lex.ar_vocalized;
  const meaning = lex.gloss_id;

  if (lex.pos === 'fiil') {
    return {
      ar: `${word} الوَلَدُ الصَّالِحُ فِي الصَّبَاحِ المُمَيَّزِ`,
      translit: `${lex.translit} al-waladu aṣ-ṣāliḥu fī aṣ-ṣabāḥi al-mumayyaz`,
      id: `Anak shalih ${meaning} di pagi yang istimewa.`,
      note: `Kalimat fi\'liyyah konteks perbuatan (${lex.category})`
    };
  }

  if (lex.owner_island === 'HRF' || lex.pos === 'huruf') {
    return {
      ar: `نَنْطِقُ حَرْفَ (${word}) بِمَخْرَجٍ صَحِيحٍ وَفَصِيحٍ`,
      translit: `nanṭiqu ḥarfa (${lex.translit}) bi-makhrajin ṣaḥīḥin wa faṣīḥ`,
      id: `Kita melafalkan huruf (${lex.translit}: ${meaning}) dengan makhraj yang benar dan fasih.`,
      note: `Konteks makharijul huruf & tartil Al-Qur\'an (${lex.category})`
    };
  }

  if (lex.category.includes('Warna')) {
    return {
      ar: `هٰذَا الشَّيْءُ لَوْنُهُ ${word} جَمِيلٌ جِدًّا`,
      translit: `hādhā ash-shayʾu lawnuhu ${lex.translit} jamīlun jiddan`,
      id: `Benda ini warnanya ${meaning} sangat indah.`,
      note: `Sifat warna dalam tata bahasa Arab`
    };
  }

  if (lex.category.includes('Angka')) {
    return {
      ar: `فِي المَكْتَبَةِ ${word} كُتُبٍ لِطُلَّابِ العِلْمِ`,
      translit: `fī al-maktabati ${lex.translit} kutubin li-ṭullābi al-ʿilm`,
      id: `Di perpustakaan ada ${meaning} buku untuk para penuntut ilmu.`,
      note: `Kaidah bilangan (adad ma\'dud)`
    };
  }

  // Default Isim / Kata Benda / Frasa
  return {
    ar: `هٰذَا (${word}) مُفِيدٌ لِتَعَلُّمِ اللُّغَةِ الْعَرَبِيَّةِ`,
    translit: `hādhā (${lex.translit}) mufīdun li-taʿallumi al-lughati al-ʿarabiyyah`,
    id: `Ini (${meaning}) sangat bermanfaat untuk belajar bahasa Arab.`,
    note: `Kalimat ismiyyah kontekstual (${lex.category})`
  };
}
