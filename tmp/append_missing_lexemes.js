const fs = require('fs');

const missingLexemes = [
  // HRF
  { id: 'lx_hrf_hamz_akram', ar_vocalized: 'أَكْرَمَ', ar_plain: 'أكرم', translit: 'akrama', gloss_id: 'dia memuliakan (hamzah qath\' nyata)', owner_island: 'HRF', level: 4, skill_id: 'HRF-L4-01', pos: 'fiil', category: 'Kaidah Hamzah', visual_hint: '🌟' },
  { id: 'lx_hrf_hamz_ism', ar_vocalized: 'اِسْم', ar_plain: 'اسم', translit: 'ism', gloss_id: 'nama (hamzah washal sambung)', owner_island: 'HRF', level: 4, skill_id: 'HRF-L4-01', pos: 'isim', category: 'Kaidah Hamzah', visual_hint: '🏷️' },
  { id: 'lx_hrf_alif_huda', ar_vocalized: 'هُدَى', ar_plain: 'هدى', translit: 'hudā', gloss_id: 'petunjuk (alif layyinah bentuk ya)', owner_island: 'HRF', level: 4, skill_id: 'HRF-L4-02', pos: 'isim', category: 'Alif Layyinah', visual_hint: '🧭' },
  { id: 'lx_hrf_alif_asa', ar_vocalized: 'عَصَا', ar_plain: 'عصا', translit: 'ʿaṣā', gloss_id: 'tongkat (alif mamdudah tegak)', owner_island: 'HRF', level: 4, skill_id: 'HRF-L4-02', pos: 'isim', category: 'Alif Layyinah', visual_hint: '🦯' },
  { id: 'lx_hrf_khat_mizan', ar_vocalized: 'مِيزَانُ النُّقَط', ar_plain: 'ميزان النقط', translit: 'mīzānu n-nuqaṭ', gloss_id: 'timbangan titik ukur khat naskh', owner_island: 'HRF', level: 5, skill_id: 'HRF-L5-01', pos: 'phrase', category: 'Seni Khat Naskh', visual_hint: '⚖️' },
  { id: 'lx_hrf_khat_jamil', ar_vocalized: 'خَطٌّ جَمِيلٌ', ar_plain: 'خط جميل', translit: 'khaṭṭun jamīl', gloss_id: 'tulisan kaligrafi yang indah proporsional', owner_island: 'HRF', level: 5, skill_id: 'HRF-L5-01', pos: 'phrase', category: 'Seni Khat Naskh', visual_hint: '✨' },

  // MFR
  { id: 'lx_mfr_sama', ar_vocalized: 'سَمَاء', ar_plain: 'سماء', translit: 'samāʾ', gloss_id: 'langit biru cerah', owner_island: 'MFR', level: 4, skill_id: 'MFR-L4-02', pos: 'isim', category: 'Alam & Cuaca', visual_hint: '🌌' },
  { id: 'lx_mfr_matar', ar_vocalized: 'مَطَر', ar_plain: 'مطر', translit: 'maṭar', gloss_id: 'hujan rahmat berkah', owner_island: 'MFR', level: 4, skill_id: 'MFR-L4-02', pos: 'isim', category: 'Alam & Cuaca', visual_hint: '🌧️' },
  { id: 'lx_mfr_zaman', ar_vocalized: 'زَمَان', ar_plain: 'زمان', translit: 'zamān', gloss_id: 'waktu / kurun zaman', owner_island: 'MFR', level: 4, skill_id: 'MFR-L4-02', pos: 'isim', category: 'Waktu Abstrak', visual_hint: '⏳' },

  // HWR
  { id: 'lx_hwr_man_anta', ar_vocalized: 'مَنْ أَنْتَ؟', ar_plain: 'من أنت', translit: 'man anta?', gloss_id: 'siapakah engkau?', owner_island: 'HWR', level: 1, skill_id: 'HWR-L1-03', pos: 'phrase', category: 'Tanya Identitas', visual_hint: '❓' },
  { id: 'lx_hwr_mudarris', ar_vocalized: 'أَنَا مُدَرِّسٌ', ar_plain: 'أنا مدرس', translit: 'anā mudarris', gloss_id: 'saya seorang guru', owner_island: 'HWR', level: 1, skill_id: 'HWR-L1-03', pos: 'phrase', category: 'Profesi', visual_hint: '👨‍🏫' },
  { id: 'lx_hwr_bikam_hadha', ar_vocalized: 'بِكَمْ هٰذَا؟', ar_plain: 'بكم هذا', translit: 'bikam hādhā?', gloss_id: 'berapa harga barang ini?', owner_island: 'HWR', level: 2, skill_id: 'HWR-L2-02', pos: 'phrase', category: 'Transaksi Pasar', visual_hint: '🏷️' },
  { id: 'lx_hwr_khams_dananir', ar_vocalized: 'خَمْسَةُ دَنَانِيرَ', ar_plain: 'خمسة دنانير', translit: 'khamsatu danānīr', gloss_id: 'lima dinar saja', owner_island: 'HWR', level: 2, skill_id: 'HWR-L2-02', pos: 'phrase', category: 'Transaksi Pasar', visual_hint: '🪙' },
  { id: 'lx_hwr_ayna_masjid', ar_vocalized: 'أَيْنَ المَسْجِدُ؟', ar_plain: 'أين المسجد', translit: 'ayna l-masjid?', gloss_id: 'di manakah masjid berada?', owner_island: 'HWR', level: 2, skill_id: 'HWR-L2-04', pos: 'phrase', category: 'Petunjuk Arah', visual_hint: '🕌' },
  { id: 'lx_hwr_ala_yamin', ar_vocalized: 'عَلَى اليَمِينِ', ar_plain: 'على اليمين', translit: 'ʿalā l-yamīn', gloss_id: 'di sebelah kanan jalan', owner_island: 'HWR', level: 2, skill_id: 'HWR-L2-04', pos: 'phrase', category: 'Petunjuk Arah', visual_hint: '➡️' },
  { id: 'lx_hwr_tabib_shukr', ar_vocalized: 'أَشْعُرُ بِأَلَمٍ', ar_plain: 'أشعر بألم', translit: 'asyʿuru bi-alam', gloss_id: 'saya merasakan keluhan sakit', owner_island: 'HWR', level: 3, skill_id: 'HWR-L3-01', pos: 'phrase', category: 'Klinik Dokter', visual_hint: '🩺' },
  { id: 'lx_hwr_dawa_tibb', ar_vocalized: 'تَنَاوَلِ الدَّوَاءَ', ar_plain: 'تناول الدواء', translit: 'tanāwali d-dawāʾ', gloss_id: 'minumlah obat penyembuh', owner_island: 'HWR', level: 3, skill_id: 'HWR-L3-01', pos: 'phrase', category: 'Klinik Dokter', visual_hint: '💊' },
  { id: 'lx_hwr_qaimat_taam', ar_vocalized: 'قَائِمَةُ الطَّعَام', ar_plain: 'قائمة الطعام', translit: 'qāʾimatu ṭ-ṭaʿām', gloss_id: 'daftar menu makanan kedai', owner_island: 'HWR', level: 3, skill_id: 'HWR-L3-02', pos: 'isim', category: 'Kedai & Restoran', visual_hint: '📋' },
  { id: 'lx_hwr_talab_shay', ar_vocalized: 'أُرِيدُ شَايًا سَاخِنًا', ar_plain: 'أريد شايا ساخنا', translit: 'urīdu syāyan sākhinā', gloss_id: 'saya memesan teh hangat daun mint', owner_island: 'HWR', level: 3, skill_id: 'HWR-L3-02', pos: 'phrase', category: 'Kedai & Restoran', visual_hint: '🫖' },
  { id: 'lx_hwr_matar_safar', ar_vocalized: 'جَوَازُ السَّفَر', ar_plain: 'جواز السفر', translit: 'jawāzu s-safar', gloss_id: 'paspor perjalanan musafir', owner_island: 'HWR', level: 4, skill_id: 'HWR-L4-01', pos: 'isim', category: 'Bandara & Perjalanan', visual_hint: '🛂' },
  { id: 'lx_hwr_tadhkirah', ar_vocalized: 'تَذْكِرَةُ الطَّيَرَان', ar_plain: 'تذكرة الطيران', translit: 'tadhkiratu ṭ-ṭayarān', gloss_id: 'tiket penerbangan pesawat', owner_island: 'HWR', level: 4, skill_id: 'HWR-L4-01', pos: 'isim', category: 'Bandara & Perjalanan', visual_hint: '🎫' },
  { id: 'lx_hwr_dalil_qati', ar_vocalized: 'دَلِيلٌ قَاطِعٌ', ar_plain: 'دليل قاطع', translit: 'dalīlun qāṭiʿ', gloss_id: 'argumen bukti ilmiah meyakinkan', owner_island: 'HWR', level: 5, skill_id: 'HWR-L5-01', pos: 'phrase', category: 'Diskusi Ilmiah', visual_hint: '💡' },
  { id: 'lx_hwr_adab_hiwar', ar_vocalized: 'أَدَبُ الحِوَار', ar_plain: 'أدب الحوار', translit: 'adabu l-ḥiwār', gloss_id: 'adab etika santun berdialog', owner_island: 'HWR', level: 5, skill_id: 'HWR-L5-01', pos: 'isim', category: 'Diskusi Ilmiah', visual_hint: '🤝' },

  // QWD
  { id: 'lx_qwd_al_kitabu', ar_vocalized: 'الكِتَابُ', ar_plain: 'الكتاب', translit: 'al-kitābu', gloss_id: 'buku tertentu (makrifat ber-alif lam)', owner_island: 'QWD', level: 1, skill_id: 'QWD-L1-03', pos: 'isim', category: 'Nakirah & Ma\'rifat', visual_hint: '📘' },
  { id: 'lx_qwd_kitabun_nak', ar_vocalized: 'كِتَابٌ', ar_plain: 'كتاب', translit: 'kitābun', gloss_id: 'sebuah buku umum (nakirah bertanwin)', owner_island: 'QWD', level: 1, skill_id: 'QWD-L1-03', pos: 'isim', category: 'Nakirah & Ma\'rifat', visual_hint: '📖' },
  { id: 'lx_qwd_fiil_madhi', ar_vocalized: 'كَتَبَ (فِعْلٌ مَاضٍ)', ar_plain: 'كتب', translit: 'kataba', gloss_id: 'dia telah menulis (kata kerja fi\'il)', owner_island: 'QWD', level: 1, skill_id: 'QWD-L1-04', pos: 'fiil', category: 'Pilar Kalimat', visual_hint: '✍️' },
  { id: 'lx_qwd_harf_jar', ar_vocalized: 'فِي (حَرْفُ جَرٍّ)', ar_plain: 'في', translit: 'fī', gloss_id: 'di dalam (kata tugas harf)', owner_island: 'QWD', level: 1, skill_id: 'QWD-L1-04', pos: 'huruf', category: 'Pilar Kalimat', visual_hint: '📦' },
  { id: 'lx_qwd_idhafah_kitab', ar_vocalized: 'كِتَابُ الطَّالِبِ', ar_plain: 'كتاب الطالب', translit: 'kitābu ṭ-ṭālib', gloss_id: 'buku milik murid (idhafah mudhaf-mudhaf ilaih)', owner_island: 'QWD', level: 2, skill_id: 'QWD-L2-03', pos: 'phrase', category: 'Kaidah Idhafah', visual_hint: '📚' },
  { id: 'lx_qwd_idhafah_bab', ar_vocalized: 'بَابُ المَسْجِدِ', ar_plain: 'باب المسجد', translit: 'bābu l-masjid', gloss_id: 'pintu masjid (idhafah kepemilikan)', owner_island: 'QWD', level: 2, skill_id: 'QWD-L2-03', pos: 'phrase', category: 'Kaidah Idhafah', visual_hint: '🚪' },
  { id: 'lx_qwd_wazan_nasara', ar_vocalized: 'نَصَرَ - يَنْصُرُ', ar_plain: 'نصر ينصر', translit: 'naṣara - yanṣuru', gloss_id: 'menolong (wazan fa\'ala yaf\'ulu)', owner_island: 'QWD', level: 3, skill_id: 'QWD-L3-03', pos: 'fiil', category: 'Wazan Morfologi', visual_hint: '🤝' },
  { id: 'lx_qwd_wazan_dakhala', ar_vocalized: 'دَخَلَ - يَدْخُلُ', ar_plain: 'دخل يدخل', translit: 'dakhala - yadkhulu', gloss_id: 'memasuki (wazan fa\'ala yaf\'ulu)', owner_island: 'QWD', level: 3, skill_id: 'QWD-L3-03', pos: 'fiil', category: 'Wazan Morfologi', visual_hint: '🚪' },
  { id: 'lx_qwd_mutsanna_kitaban', ar_vocalized: 'كِتَابَانِ', ar_plain: 'كتابان', translit: 'kitābāni', gloss_id: 'dua buah buku (mutsanna akhiran -āni)', owner_island: 'QWD', level: 3, skill_id: 'QWD-L3-04', pos: 'isim', category: 'Bentuk Ganda (Dual)', visual_hint: '👥' },
  { id: 'lx_qwd_mutsanna_waladan', ar_vocalized: 'وَلَدَانِ', ar_plain: 'ولدان', translit: 'waladāni', gloss_id: 'dua anak laki-laki (mutsanna rafa\')', owner_island: 'QWD', level: 3, skill_id: 'QWD-L3-04', pos: 'isim', category: 'Bentuk Ganda (Dual)', visual_hint: '👬' },
  { id: 'lx_qwd_jamak_mudzakkar', ar_vocalized: 'مُعَلِّمُونَ', ar_plain: 'معلمون', translit: 'muʿallimūn', gloss_id: 'para guru pria (jamak mudzakkar salim -ūna)', owner_island: 'QWD', level: 4, skill_id: 'QWD-L4-01', pos: 'isim', category: 'Jamak Salim & Taksir', visual_hint: '👨‍🏫' },
  { id: 'lx_qwd_jamak_muannats', ar_vocalized: 'مُعَلِّمَاتٌ', ar_plain: 'معلمات', translit: 'muʿallimāt', gloss_id: 'para guru wanita (jamak muannats salim -āt)', owner_island: 'QWD', level: 4, skill_id: 'QWD-L4-01', pos: 'isim', category: 'Jamak Salim & Taksir', visual_hint: '👩‍🏫' },
  { id: 'lx_qwd_irab_marfu', ar_vocalized: 'فَاعِلٌ مَرْفُوعٌ بِالضَّمَّة', ar_plain: 'فاعل مرفوع بالضمة', translit: 'fāʿil marfūʿ bi-ḍ-ḍammah', gloss_id: 'pelaku fa\'il status marfu\' dhommah', owner_island: 'QWD', level: 5, skill_id: 'QWD-L5-01', pos: 'phrase', category: 'Analisis I\'rab', visual_hint: '📐' },
  { id: 'lx_qwd_irab_manshub', ar_vocalized: 'مَفْعُولٌ بِهِ مَنْصُوبٌ بِالفَتْحَة', ar_plain: 'مفعول به منصوب بالفتحة', translit: 'mafʿūl bihi manṣūb bi-l-fatḥah', gloss_id: 'objek penderita status manshub fathah', owner_island: 'QWD', level: 5, skill_id: 'QWD-L5-01', pos: 'phrase', category: 'Analisis I\'rab', visual_hint: '🎯' },
  { id: 'lx_qwd_isim_fail_katib', ar_vocalized: 'كَاتِبٌ (اِسْمُ فَاعِل)', ar_plain: 'كاتب', translit: 'kātib', gloss_id: 'penulis (isim fa\'il pelaku derivasi)', owner_island: 'QWD', level: 5, skill_id: 'QWD-L5-02', pos: 'isim', category: 'Tashrif Isytiqaqi', visual_hint: '✍️' },
  { id: 'lx_qwd_isim_maful_maktub', ar_vocalized: 'مَكْتُوبٌ (اِسْمُ مَفْعُول)', ar_plain: 'مكتوب', translit: 'maktūb', gloss_id: 'tertulis (isim maf\'ul objek derivasi)', owner_island: 'QWD', level: 5, skill_id: 'QWD-L5-02', pos: 'isim', category: 'Tashrif Isytiqaqi', visual_hint: '📜' },

  // IST
  { id: 'lx_ist_suk_ba', ar_vocalized: 'بَ - بِ - بُ - أَبْ', ar_plain: 'ب ب ب أب', translit: 'ba - bi - bu - ab', gloss_id: 'pantulan vokal tunggal & konsonan sukun ba', owner_island: 'IST', level: 0, skill_id: 'IST-L0-01', pos: 'phrase', category: 'Reseptif Vokal Dasar', visual_hint: '🔔' },
  { id: 'lx_ist_suk_ta', ar_vocalized: 'تَ - تِ - تُ - أَتْ', ar_plain: 'ت ت ت أت', translit: 'ta - ti - tu - at', gloss_id: 'pantulan vokal tunggal & konsonan sukun ta', owner_island: 'IST', level: 0, skill_id: 'IST-L0-01', pos: 'phrase', category: 'Reseptif Vokal Dasar', visual_hint: '🔔' },
  { id: 'lx_ist_tanwin_un', ar_vocalized: 'بٌ - بٍ - بً', ar_plain: 'ب ب ب', translit: 'bun - bin - ban', gloss_id: 'desis gema tanwin dhammatain, kasratain, fathatain', owner_island: 'IST', level: 0, skill_id: 'IST-L0-03', pos: 'phrase', category: 'Reseptif Tanwin', visual_hint: '🎶' },
  { id: 'lx_ist_arqam_wahid', ar_vocalized: 'وَاحِد، اِثْنَان، ثَلَاثَة', ar_plain: 'واحد اثنان ثلاثة', translit: 'wāḥid, ithnān, thalāthah', gloss_id: 'angka satu, dua, tiga lisan penutur asli', owner_island: 'IST', level: 1, skill_id: 'IST-L1-03', pos: 'phrase', category: 'Angka Dengar', visual_hint: '🔢' },
  { id: 'lx_ist_arqam_asharah', ar_vocalized: 'عَشَرَة', ar_plain: 'عشرة', translit: 'ʿasyarah', gloss_id: 'angka sepuluh (١٠) dalam tuturan audio', owner_island: 'IST', level: 1, skill_id: 'IST-L1-03', pos: 'isim', category: 'Angka Dengar', visual_hint: '🔟' },
  { id: 'lx_ist_istifham_hal', ar_vocalized: 'هَلْ كَتَبْتَ؟', ar_plain: 'هل كتبت', translit: 'hal katabta?', gloss_id: 'apakah kamu sudah menulis? (kata tanya hal)', owner_island: 'IST', level: 2, skill_id: 'IST-L2-03', pos: 'phrase', category: 'Kata Tanya Audio', visual_hint: '❓' },
  { id: 'lx_ist_istifham_kayfa', ar_vocalized: 'كَيْفَ حَالُكَ؟', ar_plain: 'كيف حالك', translit: 'kayfa ḥāluk?', gloss_id: 'bagaimana kabarmu? (kata tanya kayfa)', owner_island: 'IST', level: 2, skill_id: 'IST-L2-03', pos: 'phrase', category: 'Kata Tanya Audio', visual_hint: '❓' },
  { id: 'lx_ist_intonasi_sual', ar_vocalized: 'أَنْتَ طَالِبٌ؟ (نَبْرَةُ اسْتِفْهَام)', ar_plain: 'أنت طالب', translit: 'anta ṭālib?', gloss_id: 'nada naik kalimat tanya lisan', owner_island: 'IST', level: 2, skill_id: 'IST-L2-04', pos: 'phrase', category: 'Intonasi Prosodi', visual_hint: '↗️' },
  { id: 'lx_ist_suq_khiyar', ar_vocalized: 'كِيلُو مِنَ التُّفَّاحِ', ar_plain: 'كيلو من التفاح', translit: 'kīlū mina t-tuffāḥ', gloss_id: 'satu kilo buah apel segar di pasar', owner_island: 'IST', level: 3, skill_id: 'IST-L3-01', pos: 'phrase', category: 'Simak Transaksi', visual_hint: '🍎' },
  { id: 'lx_ist_fabel_naml', ar_vocalized: 'سَقَطَتِ النَّمْلَةُ فِي المَاءِ', ar_plain: 'سقطت النملة في الماء', translit: 'saqaṭati n-namlah', gloss_id: 'semut kecil tercebur ke air (dongeng simak)', owner_island: 'IST', level: 3, skill_id: 'IST-L3-02', pos: 'phrase', category: 'Kisah Dengar', visual_hint: '🐜' },
  { id: 'lx_ist_spasial_fawqa', ar_vocalized: 'فَوْقَ المَكْتَبِ', ar_plain: 'فوق المكتب', translit: 'fawqa l-maktab', gloss_id: 'di atas meja belajar (posisi dengar)', owner_island: 'IST', level: 3, skill_id: 'IST-L3-03', pos: 'phrase', category: 'Tata Letak Audio', visual_hint: '📦' },
  { id: 'lx_ist_washal_sari', ar_vocalized: 'فِي البَيْتِ الكَبِيرِ', ar_plain: 'في البيت الكبير', translit: 'fi l-bayti l-kabīr', gloss_id: 'pengucapan washal cepat menyatu alami', owner_island: 'IST', level: 4, skill_id: 'IST-L4-01', pos: 'phrase', category: 'Penutur Asli', visual_hint: '⚡' },
  { id: 'lx_ist_nida_matar', ar_vocalized: 'رِحْلَةٌ رَقْمُ مِائَةٍ', ar_plain: 'رحلة رقم مائة', translit: 'riḥlatun raqmu miʾah', gloss_id: 'pengumuman penerbangan nomor seratus', owner_island: 'IST', level: 4, skill_id: 'IST-L4-02', pos: 'phrase', category: 'Pengumuman Publik', visual_hint: '📢' },
  { id: 'lx_ist_khutbah_fusha', ar_vocalized: 'أَيُّهَا الحَاضِرُونَ الكِرَام', ar_plain: 'أيها الحاضرون الكرام', translit: 'ayyuha l-ḥāḍirūna l-kirām', gloss_id: 'wahai para hadirin yang mulia (orasi simak)', owner_island: 'IST', level: 5, skill_id: 'IST-L5-01', pos: 'phrase', category: 'Wacana Formal', visual_hint: '🏛️' },

  // QRA
  { id: 'lx_qra_hadha_kitab', ar_vocalized: 'هٰذَا كِتَابٌ مُفِيدٌ', ar_plain: 'هذا كتاب مفيد', translit: 'hādhā kitābun mufīd', gloss_id: 'ini sebuah buku yang bermanfaat', owner_island: 'QRA', level: 1, skill_id: 'QRA-L1-03', pos: 'phrase', category: 'Kalimat Pendek', visual_hint: '📖' },
  { id: 'lx_qra_fi_maktabah', ar_vocalized: 'فِي مَكْتَبَةِ المَدْرَسَةِ', ar_plain: 'في مكتبة المدرسة', translit: 'fī maktabati l-madrasah', gloss_id: 'di dalam perpustakaan sekolah (jar-majrur)', owner_island: 'QRA', level: 2, skill_id: 'QRA-L2-01', pos: 'phrase', category: 'Struktur Jar Majrur', visual_hint: '🏛️' },
  { id: 'lx_qra_dialog_baca', ar_vocalized: 'قَالَ أَحْمَدُ: مَرْحَبًا!', ar_plain: 'قال أحمد مرحبا', translit: 'qāla Aḥmad: marḥaban!', gloss_id: 'Ahmad berkata: selamat datang! (dialog teks)', owner_island: 'QRA', level: 2, skill_id: 'QRA-L2-03', pos: 'phrase', category: 'Wacana Dialog', visual_hint: '💬' },
  { id: 'lx_qra_tap_gloss_mufradat', ar_vocalized: 'مُفْرَدَاتٌ مُخْتَارَةٌ', ar_plain: 'مفردات مختارة', translit: 'mufradātun mukhtārah', gloss_id: 'kosa kata pilihan glosarium instan', owner_island: 'QRA', level: 2, skill_id: 'QRA-L2-04', pos: 'phrase', category: 'Teknik Tap-Gloss', visual_hint: '🔍' },
  { id: 'lx_qra_fikrah_raisa', ar_vocalized: 'الفِكْرَةُ الرَّئِيسَة', ar_plain: 'الفكرة الرئيسة', translit: 'al-fikratu r-raʾīsah', gloss_id: 'gagasan / ide pokok paragraf hikmah', owner_island: 'QRA', level: 3, skill_id: 'QRA-L3-02', pos: 'isim', category: 'Pemahaman Bacaan', visual_hint: '💡' },
  { id: 'lx_qra_nas_juz_i', ar_vocalized: 'قَرَأَ الطَّالِبُ الكِتَابَ', ar_plain: 'قرأ الطالب الكتاب', translit: 'qaraʾa ṭ-ṭālibu l-kitāb', gloss_id: 'murid membaca buku (teks gundul parsial)', owner_island: 'QRA', level: 4, skill_id: 'QRA-L4-01', pos: 'phrase', category: 'Teks Semi-Gundul', visual_hint: '📜' },
  { id: 'lx_qra_ibn_sina', ar_vocalized: 'ابْنُ سِينَا طَبِيبٌ عَبْقَرِيّ', ar_plain: 'ابن سينا طبيب عبقري', translit: 'Ibnu Sīnā ṭabībun ʿabqarī', gloss_id: 'Ibnu Sina dokter cerdas ensiklopedia Islam', owner_island: 'QRA', level: 4, skill_id: 'QRA-L4-02', pos: 'phrase', category: 'Ensiklopedia Tokoh', visual_hint: '🩺' },
  { id: 'lx_qra_turats_adab', ar_vocalized: 'طَلَبُ العِلْمِ فَرِيضَةٌ', ar_plain: 'طلب العلم فريضة', translit: 'ṭalabu l-ʿilmi farīḍah', gloss_id: 'menuntut ilmu adalah kewajiban (hadits turats)', owner_island: 'QRA', level: 5, skill_id: 'QRA-L5-01', pos: 'phrase', category: 'Teks Klasik Turats', visual_hint: '🕌' },
  { id: 'lx_qra_maqalah_haditsah', ar_vocalized: 'مَقَالَةٌ فِكْرِيَّةٌ مُعَاصِرَة', ar_plain: 'مقالة فكرية معاصرة', translit: 'maqālatun fikriyyah', gloss_id: 'esai opini pemikiran kontemporer Fusha', owner_island: 'QRA', level: 5, skill_id: 'QRA-L5-02', pos: 'phrase', category: 'Artikel Analisis', visual_hint: '📰' }
];

let content = fs.readFileSync('src/data/curriculum.ts', 'utf8');

// Insert missing lexemes before the closing `];` of LEXICON_DATA
const targetStr = `  // --- TMH (Kuil Langit / Tamhidi - Ujian 4 Kemahiran Bertingkat) ---
  { id: 'lx_tmh_mihrab', ar_vocalized: 'مِحْرَاب', ar_plain: 'محراب', translit: 'miḥrāb', gloss_id: 'gerbang mihrab kelulusan Jenjang 0', owner_island: 'TMH', level: 0, skill_id: 'TMH-L0-01', pos: 'isim', category: 'Kuil Langit', visual_hint: '🏛️' },
  { id: 'lx_tmh_imtihan', ar_vocalized: 'اِمْتِحَان', ar_plain: 'امتحان', translit: 'imtiḥān', gloss_id: 'ujian evaluasi empat kemahiran', owner_island: 'TMH', level: 0, skill_id: 'TMH-L0-01', pos: 'isim', category: 'Kuil Langit', visual_hint: '📋' },
  { id: 'lx_tmh_syahadah', ar_vocalized: 'شَهَادَة', ar_plain: 'شهادة', translit: 'syahādah', gloss_id: 'ijazah sertifikat kelulusan Jenjang 1', owner_island: 'TMH', level: 1, skill_id: 'TMH-L1-01', pos: 'isim', category: 'Kuil Langit', visual_hint: '📜' },
  { id: 'lx_tmh_najah', ar_vocalized: 'نَجَاح', ar_plain: 'نجاح', translit: 'najāḥ', gloss_id: 'kesuksesan naik Rutbah Rahhal', owner_island: 'TMH', level: 1, skill_id: 'TMH-L1-01', pos: 'isim', category: 'Kuil Langit', visual_hint: '🌟' },
  { id: 'lx_tmh_darajah', ar_vocalized: 'دَرَجَة', ar_plain: 'درجة', translit: 'darajah', gloss_id: 'derajat kemahiran Jenjang 2 (Qari)', owner_island: 'TMH', level: 2, skill_id: 'TMH-L2-01', pos: 'isim', category: 'Kuil Langit', visual_hint: '🎖️' },
  { id: 'lx_tmh_taj', ar_vocalized: 'تَاج', ar_plain: 'تاج', translit: 'tāj', gloss_id: 'mahkota kemuliaan Adib Kuil Langit', owner_island: 'TMH', level: 3, skill_id: 'TMH-L3-01', pos: 'isim', category: 'Kuil Langit', visual_hint: '👑' },
  { id: 'lx_tmh_adib', ar_vocalized: 'أَدِيبُ الكُلّ', ar_plain: 'أديب الكل', translit: 'adību l-kull', gloss_id: 'pujangga agung penguasa 8 kepulauan', owner_island: 'TMH', level: 3, skill_id: 'TMH-L3-01', pos: 'isim', category: 'Kuil Langit', visual_hint: '🏆' }
];`;

const replacementFormatted = missingLexemes.map(l =>
  `  { id: '${l.id}', ar_vocalized: '${l.ar_vocalized}', ar_plain: '${l.ar_plain}', translit: '${l.translit}', gloss_id: '${l.gloss_id}', owner_island: '${l.owner_island}', level: ${l.level}, skill_id: '${l.skill_id}', pos: '${l.pos}', category: '${l.category}', visual_hint: '${l.visual_hint}' },`
).join('\n');

const replacementStr = `  // --- TMH (Kuil Langit / Tamhidi - Ujian 4 Kemahiran Bertingkat) ---
  { id: 'lx_tmh_mihrab', ar_vocalized: 'مِحْرَاب', ar_plain: 'محراب', translit: 'miḥrāb', gloss_id: 'gerbang mihrab kelulusan Jenjang 0', owner_island: 'TMH', level: 0, skill_id: 'TMH-L0-01', pos: 'isim', category: 'Kuil Langit', visual_hint: '🏛️' },
  { id: 'lx_tmh_imtihan', ar_vocalized: 'اِمْتِحَان', ar_plain: 'امتحان', translit: 'imtiḥān', gloss_id: 'ujian evaluasi empat kemahiran', owner_island: 'TMH', level: 0, skill_id: 'TMH-L0-01', pos: 'isim', category: 'Kuil Langit', visual_hint: '📋' },
  { id: 'lx_tmh_syahadah', ar_vocalized: 'شَهَادَة', ar_plain: 'شهادة', translit: 'syahādah', gloss_id: 'ijazah sertifikat kelulusan Jenjang 1', owner_island: 'TMH', level: 1, skill_id: 'TMH-L1-01', pos: 'isim', category: 'Kuil Langit', visual_hint: '📜' },
  { id: 'lx_tmh_najah', ar_vocalized: 'نَجَاح', ar_plain: 'نجاح', translit: 'najāḥ', gloss_id: 'kesuksesan naik Rutbah Rahhal', owner_island: 'TMH', level: 1, skill_id: 'TMH-L1-01', pos: 'isim', category: 'Kuil Langit', visual_hint: '🌟' },
  { id: 'lx_tmh_darajah', ar_vocalized: 'دَرَجَة', ar_plain: 'درجة', translit: 'darajah', gloss_id: 'derajat kemahiran Jenjang 2 (Qari)', owner_island: 'TMH', level: 2, skill_id: 'TMH-L2-01', pos: 'isim', category: 'Kuil Langit', visual_hint: '🎖️' },
  { id: 'lx_tmh_taj', ar_vocalized: 'تَاج', ar_plain: 'تاج', translit: 'tāj', gloss_id: 'mahkota kemuliaan Adib Kuil Langit', owner_island: 'TMH', level: 3, skill_id: 'TMH-L3-01', pos: 'isim', category: 'Kuil Langit', visual_hint: '👑' },
  { id: 'lx_tmh_adib', ar_vocalized: 'أَدِيبُ الكُلّ', ar_plain: 'أديب الكل', translit: 'adību l-kull', gloss_id: 'pujangga agung penguasa 8 kepulauan', owner_island: 'TMH', level: 3, skill_id: 'TMH-L3-01', pos: 'isim', category: 'Kuil Langit', visual_hint: '🏆' },

  // --- Kosakata Pengayaan Tingkat Lanjut Seluruh Pulau (39 Skill) ---
${replacementFormatted}
];`;

if (content.includes(targetStr)) {
  content = content.replace(targetStr, replacementStr);
  fs.writeFileSync('src/data/curriculum.ts', content, 'utf8');
  console.log('Successfully appended all 39 missing lexemes!');
} else {
  console.error('Target string not found in curriculum.ts');
  process.exit(1);
}
