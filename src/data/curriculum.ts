import { Island, IslandId, SkillItem, Lexeme, DialogueNode } from '../types/game';

export const ISLANDS_DATA: Island[] = [
  {
    id: 'HRF',
    name_ar: 'جَزِيرَةُ الحُرُوف',
    name_id: 'Pulau Huruf (Mutiara)',
    domain: 'Huruf, bunyi/makhraj, harakat, bentuk sambung, tulisan tangan',
    biome3D: 'Pulau pasir putih, karang mutiara & laguna bercahaya',
    crystalName: 'Mutiara Teal',
    crystalColor: 'from-teal-400 to-cyan-500',
    crystalIconColor: 'text-teal-400',
    badgeBg: 'bg-teal-600',
    description: 'Tempat pertama petualanganmu! Kenali bentuk 28 huruf hijaiyah, makhraj murni, harakat dasar, dan jejak pasir.',
    minLevel: 0,
    skillCount: 21
  },
  {
    id: 'MFR',
    name_ar: 'سُوقُ المُفْرَدَات',
    name_id: 'Pasar Apung Mufradat',
    domain: 'Kosakata tematik isi (isim, fi\'il, sifat)',
    biome3D: 'Pasar terapung di perahu warna-warni, hewan lucu & rempah',
    crystalName: 'Emas-Jingga',
    crystalColor: 'from-amber-400 to-orange-500',
    crystalIconColor: 'text-amber-500',
    badgeBg: 'bg-amber-600',
    description: 'Jelajahi perahu-perahu pasar terapung untuk mengumpulkan kosa kata benda, warna, angka, makanan, dan hewan.',
    minLevel: 0,
    skillCount: 37
  },
  {
    id: 'HWR',
    name_ar: 'قَرْيَةُ الحِوَار',
    name_id: 'Kampung Hiwar (Percakapan)',
    domain: 'Percakapan fungsional, tanya-jawab sopan, skenario dunia nyata',
    biome3D: 'Kampung damai dengan kafe kurma, toko, dan warga ramah',
    crystalName: 'Hijau Zamrud',
    crystalColor: 'from-emerald-400 to-green-600',
    crystalIconColor: 'text-emerald-500',
    badgeBg: 'bg-emerald-600',
    description: 'Berinteraksi langsung dengan warga kampung ramah dalam situasi nyata: menyapa, berkenalan, dan memesan makanan.',
    minLevel: 0,
    skillCount: 29
  },
  {
    id: 'QWD',
    name_ar: 'جَبَلُ القَوَاعِد',
    name_id: 'Gunung Qawa\'id (Nahwu-Sharaf)',
    domain: 'Tata bahasa: struktur kalimat, gender kata, wazan & morfologi',
    biome3D: 'Gunung bertingkat dengan jembatan balok kata & menara kuno',
    crystalName: 'Biru Safir',
    crystalColor: 'from-blue-500 to-indigo-600',
    crystalIconColor: 'text-blue-500',
    badgeBg: 'bg-blue-600',
    description: 'Bangun jembatan kalimat, kuasai mudzakkar-muannats, kata tunjuk, dan susunan kalimat ismiyyah serta fi\'liyyah.',
    minLevel: 1,
    skillCount: 30
  },
  {
    id: 'IST',
    name_ar: 'وَادِي الِاسْتِمَاع',
    name_id: 'Lembah Istima\' (Simak)',
    domain: 'Keterampilan menyimak reseptif audio & intonasi',
    biome3D: 'Lembah gema ajaib, gua resonansi & api unggun cerita',
    crystalName: 'Ungu Ametis',
    crystalColor: 'from-purple-500 to-violet-600',
    crystalIconColor: 'text-purple-400',
    badgeBg: 'bg-purple-600',
    description: 'Pertajam pendengaranmu mendengarkan pantulan gema kata, cerita api unggun, dan instruksi penutur asli.',
    minLevel: 0,
    skillCount: 17
  },
  {
    id: 'QRA',
    name_ar: 'مَكْتَبَةُ القِرَاءَة',
    name_id: 'Perpustakaan Qira\'ah (Baca)',
    domain: 'Keterampilan membaca bertingkat, wacana & doa',
    biome3D: 'Hutan buku raksasa dengan pohon perpustakaan & naskah bercahaya',
    crystalName: 'Merah Marun',
    crystalColor: 'from-rose-500 to-red-700',
    crystalIconColor: 'text-rose-500',
    badgeBg: 'bg-rose-700',
    description: 'Buka gulungan hikmah, baca cerita pendek berharakat dan surat harian yang dikirim sahabatmu, Hudhud.',
    minLevel: 1,
    skillCount: 18
  },
  {
    id: 'KTB',
    name_ar: 'مِينَاءُ الكِتَابَة',
    name_id: 'Pelabuhan Kitabah (Tulis)',
    domain: 'Keterampilan menulis: imla\' (dikte), kartu ucapan, korespondensi',
    biome3D: 'Pelabuhan tinta emas, mercusuar suar & studio kaligrafi',
    crystalName: 'Kuning Tinta',
    crystalColor: 'from-yellow-400 to-amber-600',
    crystalIconColor: 'text-yellow-500',
    badgeBg: 'bg-yellow-600',
    description: 'Nyalakan mercusuar dengan ketepatan ejaan dikte, kirim kartu pos sahabat, dan rangkai karya tulisan indah.',
    minLevel: 1,
    skillCount: 16
  },
  {
    id: 'KLM',
    name_ar: 'جَزِيرَةُ الكَلَام',
    name_id: 'Pulau Kalam (Bicara)',
    domain: 'Latihan artikulasi makhraj, pelafalan kosakata dan kelancaran berbicara (Thalaqah)',
    biome3D: 'Amfiteater kristal emas, mimbar pidato & tebing resonansi suara',
    crystalName: 'Kecubung Suara Emas',
    crystalColor: 'from-amber-500 via-orange-500 to-red-600',
    crystalIconColor: 'text-amber-500',
    badgeBg: 'bg-orange-600',
    description: 'Asah kefasihan lisanmu di hadapan Syaikh Balaghah! Uji makharijul huruf dengan mikrofon, pelafalan kata tematik, dan kelancaran membaca kalimat.',
    minLevel: 0,
    skillCount: 19
  },
  {
    id: 'TMH',
    name_ar: 'مَعْبَدُ السَّمَاء',
    name_id: 'Kuil Langit (Ujian & Misi)',
    domain: 'Ujian jenjang terpadu 4 keterampilan & misi dunia nyata',
    biome3D: 'Kuil megah terapung di awan dengan 6 gerbang mihrab emas',
    crystalName: 'Emas Mahkota',
    crystalColor: 'from-amber-300 via-yellow-400 to-yellow-600',
    crystalIconColor: 'text-yellow-400',
    badgeBg: 'bg-amber-500',
    description: 'Gerbang kelulusan jenjang! Buktikan kemahiran Menyimak, Berbicara, Membaca, dan Menulis untuk menaikkan Rutbah dan evolusi Hudhud.',
    minLevel: 0,
    skillCount: 12
  }
];

export const SKILLS_DATA: SkillItem[] = [
  // HRF - Pulau Huruf
  {
    skill_id: 'HRF-L0-01',
    owner_island: 'HRF',
    level: 0,
    name: 'Huruf Set 1 (ا ب ت ث ج ح خ)',
    description: 'Nama, bunyi murni, bentuk terpisah dan jejak pasir 3D',
    audience: 'AD',
    scope: 'Huruf dasar awal Alif sampai Kha'
  },
  {
    skill_id: 'HRF-L0-02',
    owner_island: 'HRF',
    level: 0,
    name: 'Huruf Set 2 (د ذ ر ز س ش ص)',
    description: 'Nama, bunyi, pembeda huruf mirip dan makhraj',
    audience: 'AD',
    scope: 'Dal sampai Shad'
  },
  {
    skill_id: 'HRF-L0-03',
    owner_island: 'HRF',
    level: 0,
    name: 'Huruf Set 3 (ض ط ظ ع غ ف ق)',
    description: 'Huruf berat/tebal (isti\'la) dan pengucapan fasih',
    audience: 'AD',
    scope: 'Dhad sampai Qaf'
  },
  {
    skill_id: 'HRF-L0-04',
    owner_island: 'HRF',
    level: 0,
    name: 'Huruf Set 4 (ك ل م ن هـ و ي)',
    description: 'Huruf penutup alfabet hijaiyah',
    audience: 'AD',
    scope: 'Kaf sampai Ya'
  },
  {
    skill_id: 'HRF-L0-05',
    owner_island: 'HRF',
    level: 0,
    name: 'Harakat Dasar',
    description: 'Fathah (a), Kasrah (i), Dhammah (u) vokal pendek',
    audience: 'AD',
    scope: 'Bunyi vokal dasar'
  },
  {
    skill_id: 'HRF-L1-01',
    owner_island: 'HRF',
    level: 1,
    name: 'Bentuk Huruf Posisi Sambung',
    description: 'Bentuk awal, tengah, akhir, dan tunggal pada 28 huruf',
    audience: 'AD',
    scope: '28 huruf dalam 4 posisi'
  },
  {
    skill_id: 'HRF-L1-02',
    owner_island: 'HRF',
    level: 1,
    name: 'Menyambung Huruf',
    description: 'Pola sambung & 6 huruf yang tidak menyambung ke kiri (ا د ذ ر ز و)',
    audience: 'AD',
    scope: 'Huruf pemutus sambungan kiri'
  },
  {
    skill_id: 'HRF-L1-03',
    owner_island: 'HRF',
    level: 1,
    name: 'Sukun & Syaddah',
    description: 'Bunyi konsonan mati (sukun) dan huruf rangkap tasydid (syaddah)',
    audience: 'AD',
    scope: 'Sukun dan tasydid'
  },
  {
    skill_id: 'HRF-L1-04',
    owner_island: 'HRF',
    level: 1,
    name: 'Tanwin (ـً ـٍ ـٌ)',
    description: 'Fathatain (-an), Kasratain (-in), dan Dhammatain (-un)',
    audience: 'AD',
    scope: 'Bunyi nun mati di akhir kata'
  },
  {
    skill_id: 'HRF-L1-05',
    owner_island: 'HRF',
    level: 1,
    name: 'Mad (Vokal Panjang)',
    description: 'Pemanjangan bunyi vokal 2 harakat dengan Alif, Waw, dan Ya\'',
    audience: 'AD',
    scope: 'Mad thabi\'i'
  },
  {
    skill_id: 'HRF-L2-01',
    owner_island: 'HRF',
    level: 2,
    name: 'Alif-Lam Syamsiyah & Qamariyah',
    description: 'Kapan huruf Lam dibaca jelas (Qamariyah) atau melebur ke huruf berikutnya (Syamsiyah)',
    audience: 'AD',
    scope: 'Pelafalan Al- ma\'rifah'
  },
  {
    skill_id: 'HRF-L2-02',
    owner_island: 'HRF',
    level: 2,
    name: 'Hamzah Washl & Qath\'',
    description: 'Membedakan bunyi hamzah yang terbaca saat sambung vs lepas',
    audience: 'AD',
    scope: 'Pelafalan hamzah'
  },
  {
    skill_id: 'HRF-L2-03',
    owner_island: 'HRF',
    level: 2,
    name: 'Ta\' Marbuthah (ـة) & Alif Maqshurah (ى)',
    description: 'Bentuk tulisan dan perubahan bunyi saat waqaf vs washal',
    audience: 'AD',
    scope: 'Bentuk huruf khusus'
  },
  {
    skill_id: 'HRF-L2-04',
    owner_island: 'HRF',
    level: 2,
    name: 'Pasangan Huruf Mirip (Makhraj Lanjut)',
    description: 'Melatih kontras ketat: ث/س/ص, ح/هـ/خ, ع/ء, ذ/ز/ظ, ت/ط, د/ض',
    audience: 'AD',
    scope: 'Artikulasi makhraj presisi'
  },
  {
    skill_id: 'HRF-L2-05',
    owner_island: 'HRF',
    level: 2,
    name: 'Tulisan Tangan Naskh Dasar',
    description: 'Tracing goresan ke penulisan mandiri per kata',
    audience: 'AD',
    scope: 'Khat Naskh'
  },
  {
    skill_id: 'HRF-L3-01',
    owner_island: 'HRF',
    level: 3,
    name: 'Decoding Teks Tanpa Harakat',
    description: 'Mengenali pola kata gundul sering berdasarkan wazan',
    audience: 'AD',
    scope: 'Membaca tanpa vokal'
  },
  {
    skill_id: 'HRF-L3-02',
    owner_island: 'HRF',
    level: 3,
    name: 'Naskh Rapi: Jarak & Ligatur',
    description: 'Kerapian, proporsi, dan ligatur huruf umum',
    audience: 'AD',
    scope: 'Estetika tulisan'
  },
  {
    skill_id: 'HRF-L3-03',
    owner_island: 'HRF',
    level: 3,
    name: 'Prosodi: Irama & Tekanan Suara',
    description: 'Intonasi kalimat tanya, pernyataan, dan seruan',
    audience: 'AD',
    scope: 'Ritme bicara Arab'
  },
  {
    skill_id: 'HRF-L4-01',
    owner_island: 'HRF',
    level: 4,
    name: 'Tulisan Ruq\'ah Sehari-hari',
    description: 'Mengenal tulisan cepat tangan sehari-hari masyarakat Arab',
    audience: 'AD',
    scope: 'Khat Ruq\'ah'
  },
  {
    skill_id: 'HRF-L4-02',
    owner_island: 'HRF',
    level: 4,
    name: 'Apresiasi Kaligrafi Naskh & Tsuluts',
    description: 'Kreativitas membuat karya kaligrafi huruf indah',
    audience: 'AD',
    scope: 'Seni khat'
  },
  {
    skill_id: 'HRF-L5-01',
    owner_island: 'HRF',
    level: 5,
    name: 'Membaca Variasi Font & Tulisan Tangan',
    description: 'Membaca ragam font: Naskh, Ruq\'ah, Kufi, Diwani',
    audience: 'D',
    scope: 'Tipografi Arab tingkat mahir'
  },
  // MFR - Pasar Mufradat
  {
    skill_id: 'MFR-L0-01',
    owner_island: 'MFR',
    level: 0,
    name: 'Angka Dasar 1–10 (الأَرْقَام)',
    description: 'Wahid sampai Asyarah dengan angka Arab-Hindi (١–١٠)',
    audience: 'AD',
    scope: 'Bilangan satuan'
  },
  {
    skill_id: 'MFR-L0-02',
    owner_island: 'MFR',
    level: 0,
    name: 'Warna Dasar (الأَلْوَان)',
    description: 'Ahmar, azraq, akhdhar, abyadh, aswad, ashfar',
    audience: 'AD',
    scope: 'Warna utama benda'
  },
  {
    skill_id: 'MFR-L0-03',
    owner_island: 'MFR',
    level: 0,
    name: 'Keluarga Inti (الأُسْرَة)',
    description: 'Ab, Umm, Akh, Ukht, Jadd, Jaddah dalam silsilah keluarga',
    audience: 'AD',
    scope: 'Ayah, Ibu, Kakek, Nenek, Saudara'
  },
  {
    skill_id: 'MFR-L0-04',
    owner_island: 'MFR',
    level: 0,
    name: 'Benda Sekitar & Sekolah (الأَدَوَات)',
    description: 'Kitab, Qalam, Bab, Kursiy, Thawilah, Sabbuurah',
    audience: 'AD',
    scope: 'Objek kelas & rumah'
  },
  {
    skill_id: 'MFR-L1-01',
    owner_island: 'MFR',
    level: 1,
    name: 'Makanan & Minuman (الطَّعَام وَالشَّرَاب)',
    description: 'Khubz, ma\', halib, aruz, tuffahah, tamr, shāy, qahwah',
    audience: 'AD',
    scope: 'Konsumsi sehari-hari & buah'
  },
  {
    skill_id: 'MFR-L1-02',
    owner_island: 'MFR',
    level: 1,
    name: 'Hewan Peliharaan & Alam (الحَيَوَانَات)',
    description: 'Qitthah, samakah, hishan, thair, jamal, asad',
    audience: 'AD',
    scope: 'Hewan darat, laut, udara, gurun'
  },
  {
    skill_id: 'MFR-L1-03',
    owner_island: 'MFR',
    level: 1,
    name: 'Anggota Tubuh Manusia (أَعْضَاءُ الجِسْم)',
    description: 'Ra\'s, yad, \'ayn, rijl, anaf, fam, udzun',
    audience: 'AD',
    scope: 'Anatomi dasar'
  },
  {
    skill_id: 'MFR-L1-04',
    owner_island: 'MFR',
    level: 1,
    name: 'Pakaian & Perlengkapan (المَلَابِس)',
    description: 'Qamish, tsaub, hidza\', qalansuwah, hijab',
    audience: 'AD',
    scope: 'Busana dan alas kaki'
  },
  {
    skill_id: 'MFR-L1-05',
    owner_island: 'MFR',
    level: 1,
    name: 'Waktu & Hari-Hari (الأَيَّام وَالأَوْقَات)',
    description: 'Al-Ahad hingga As-Sabt, shabah, masa\', lail, nahar',
    audience: 'AD',
    scope: 'Nama 7 hari dan fase waktu'
  },
  {
    skill_id: 'MFR-L2-01',
    owner_island: 'MFR',
    level: 2,
    name: 'Rumah & Perabotan (البَيْت وَالأَثَاث)',
    description: 'Ghurfah, sarir, matbakh, hammam, mir\'ah, nafidzah',
    audience: 'AD',
    scope: 'Ruangan dan interior rumah'
  },
  {
    skill_id: 'MFR-L2-02',
    owner_island: 'MFR',
    level: 2,
    name: 'Tempat Umum & Kota (الأَمَاكِن وَالمَدِينَة)',
    description: 'Masjid, suq, madrasah, mustasyfa, mathar, hadiqah',
    audience: 'AD',
    scope: 'Fasilitas umum dan kota'
  },
  {
    skill_id: 'MFR-L2-03',
    owner_island: 'MFR',
    level: 2,
    name: 'Profesi & Cita-Cita (المِهَن وَالوِظَائِف)',
    description: 'Thabib, mudarris, muhandis, fallah, syurthiy, tajir',
    audience: 'AD',
    scope: 'Pekerjaan dan pengabdian'
  },
  {
    skill_id: 'MFR-L2-04',
    owner_island: 'MFR',
    level: 2,
    name: 'Transportasi & Kendaraan (المَوَاصَلَات)',
    description: 'Sayyarah, hafilah, qithar, thairah, safinah, darrajah',
    audience: 'AD',
    scope: 'Alat transportasi darat, laut, udara'
  },
  {
    skill_id: 'MFR-L2-05',
    owner_island: 'MFR',
    level: 2,
    name: 'Kata Kerja Rutinitas Harian (الأَفْعَال اليَوْمِيَّة)',
    description: 'Qara\'a, kataba, akala, syariba, dzahaba, raja\'a, nama, istayqazha',
    audience: 'AD',
    scope: 'Fi\'il harian dasar berfrekuensi tinggi'
  },
  {
    skill_id: 'MFR-L3-01',
    owner_island: 'MFR',
    level: 3,
    name: 'Sifat Fisik & Karakter (الصِّفَات وَالأَخْلَاق)',
    description: 'Kabir/shaghir, thawiil/qashir, jamil/qabih, karim/bakhil',
    audience: 'AD',
    scope: 'Antonym pasangan kata sifat'
  },
  {
    skill_id: 'MFR-L3-02',
    owner_island: 'MFR',
    level: 3,
    name: 'Cuaca & Musim Alam (الرَّحَلَات وَالطَّقْس)',
    description: 'Harr/barid, syams, mathar, fasl ash-shayf, asy-syita\'',
    audience: 'AD',
    scope: 'Iklim dan musim Timur Tengah'
  },
  {
    skill_id: 'MFR-L3-03',
    owner_island: 'MFR',
    level: 3,
    name: 'Kata Jamak Taksir Populer (جُمُوع التَّكْسِير الشَّائِعَة)',
    description: 'Kitab -> Kutub, Qalam -> Aqlam, Rajul -> Rijal, Walad -> Awlad',
    audience: 'AD',
    scope: 'Pola jamak taksir kata sehari-hari'
  },
  {
    skill_id: 'MFR-L4-01',
    owner_island: 'MFR',
    level: 4,
    name: 'Istilah Sains & Teknologi (العُلُوم وَالتِّكْنُولُوجِيَا)',
    description: 'Hasub, hatif, syabakah, kahraba\', fada\', bahth',
    audience: 'D',
    scope: 'Mufradat modern & terminologi digital'
  },
  {
    skill_id: 'MFR-L4-02',
    owner_island: 'MFR',
    level: 4,
    name: 'Idiom & Ungkapan Bahasa (التَّعَابِير الاِصْطِلَاحِيَّة)',
    description: 'Yadan bi-yad, min qalbin ila qalbin, \'ala kulli hal',
    audience: 'D',
    scope: 'Frasa idiomatik fasih'
  },
  {
    skill_id: 'MFR-L5-01',
    owner_island: 'MFR',
    level: 5,
    name: 'Nuansa Makna & Taraduf/Sinonim (التَّرَادُف وَالفُرُوق اللُّغَوِيَّة)',
    description: 'Farah vs Surur, Mathar vs Ghayth, Jalasa vs Qa\'ada',
    audience: 'D',
    scope: 'Ketelitian rasa bahasa Arab sastra'
  },
  // HWR - Kampung Hiwar
  {
    skill_id: 'HWR-L0-01',
    owner_island: 'HWR',
    level: 0,
    name: 'Salam & Sapaan Waktu (التَّحِيَّات وَالتَّرْحِيب)',
    description: 'Assalamu alaikum, shabah al-khayr, masa al-khayr, ahlan wa sahlan',
    audience: 'AD',
    scope: 'Etika menyapa & membalas salam islami'
  },
  {
    skill_id: 'HWR-L0-02',
    owner_island: 'HWR',
    level: 0,
    name: 'Perkenalan Diri & Nama (التَّعَارُف وَالِاسْم)',
    description: 'Ma ismuka/ismuki? Ismi Ari / Aira / Thālib',
    audience: 'AD',
    scope: 'Perkenalan identitas dasar'
  },
  {
    skill_id: 'HWR-L1-01',
    owner_island: 'HWR',
    level: 1,
    name: 'Menanyakan & Menjawab Kabar (السُّؤَال عَنِ الحَال)',
    description: 'Kayfa haluka? Al-hamdu lillahi bi-khayr wa \'afiyah',
    audience: 'AD',
    scope: 'Interaksi hangat menanyakan kondisi'
  },
  {
    skill_id: 'HWR-L1-02',
    owner_island: 'HWR',
    level: 1,
    name: 'Kesantunan & Syukur (عِبَارَات الشُّكْر وَالِاعْتِذَار)',
    description: 'Syukran, afwan, min fadhlika, law samahta, asif',
    audience: 'AD',
    scope: 'Etika percakapan sopan & permohonan maaf'
  },
  {
    skill_id: 'HWR-L1-03',
    owner_island: 'HWR',
    level: 1,
    name: 'Asal Daerah & Kebangsaan (الجِنْسِيَّة وَالبَلَد)',
    description: 'Min ayna anta? Ana min Indunisiya, ana Indunisiyy',
    audience: 'AD',
    scope: 'Menyebutkan asal negara & kota'
  },
  {
    skill_id: 'HWR-L2-01',
    owner_island: 'HWR',
    level: 2,
    name: 'Perniagaan & Bertransaksi di Pasar (التَّسَوُّق فِي السُّوق)',
    description: 'Bikam hadha? Uridu khubzan, hadha ghālin/rakhīṣ',
    audience: 'AD',
    scope: 'Tanya harga, memesan barang, negosiasi ramah'
  },
  {
    skill_id: 'HWR-L2-02',
    owner_island: 'HWR',
    level: 2,
    name: 'Memesan Makanan & Minuman di Kedai (فِي المَطْعَم وَالمَقْهَى)',
    description: 'Ayna qa\'imat ath-tha\'am? A\'thini syayan min fadhlika',
    audience: 'AD',
    scope: 'Pemesanan kuliner dan etika bersantap'
  },
  {
    skill_id: 'HWR-L2-03',
    owner_island: 'HWR',
    level: 2,
    name: 'Menanyakan Arah & Lokasi Kota (السُّؤَال عَنِ الِاتِّجَاهَات)',
    description: 'Ayna al-masjid? Ittajih ilal yamin / yasar / ilal imam',
    audience: 'AD',
    scope: 'Navigasi jalan, kompas arah kota'
  },
  {
    skill_id: 'HWR-L2-04',
    owner_island: 'HWR',
    level: 2,
    name: 'Keluarga & Silaturahmi (حِوَار الأُسْرَة وَالضِّيَافَة)',
    description: 'Man hadha? Hadha abi wa tilka ummi, tsetPreferred',
    audience: 'AD',
    scope: 'Memperkenalkan kerabat & menerima tamu'
  },
  {
    skill_id: 'HWR-L3-01',
    owner_island: 'HWR',
    level: 3,
    name: 'Konsultasi Kesehatan & Dokter (فِي العِيَادَة وَالمُسْتَشْفَى)',
    description: 'Mā bika? Ash\'uru bi-alamin fi ra\'si / bathni, syafākallāh',
    audience: 'AD',
    scope: 'Menyampaikan keluhan fisik & doa kesembuhan'
  },
  {
    skill_id: 'HWR-L3-02',
    owner_island: 'HWR',
    level: 3,
    name: 'Di Bandara & Perjalanan Wisata (فِي المَطَار وَالسَّفَر)',
    description: 'Ayna jawaz as-safar? Rihlah sa\'idah, fi amanillah',
    audience: 'AD',
    scope: 'Prosedur imigrasi, tiket, ucapan safar mabrur'
  },
  {
    skill_id: 'HWR-L4-01',
    owner_island: 'HWR',
    level: 4,
    name: 'Diskusi Halaqah & Pendapat (إِبْدَاء الرَّأْي وَالحِوَار الفِكْرِي)',
    description: 'Fi ra\'yi, uwafiguka ar-ra\'y, hal yumkinu an nunaqisya?',
    audience: 'D',
    scope: 'Menyampaikan argumen sopan & bertukar pandangan'
  },
  {
    skill_id: 'HWR-L5-01',
    owner_island: 'HWR',
    level: 5,
    name: 'Diplomasi Lisan & Retorika Fashih (البَلَاغَة الحِوَارِيَّة)',
    description: 'Khithabah, uslub lughawi fasih, husn al-istima\' wal bayan',
    audience: 'D',
    scope: 'Kepiawaian retorika & negosiasi tingkat tinggi'
  },
  // QWD - Gunung Qawa'id
  {
    skill_id: 'QWD-L1-01',
    owner_island: 'QWD',
    level: 1,
    name: 'Isim Isyarah Dekat (هٰذَا / هٰذِهِ)',
    description: 'Menunjuk benda tunggal dekat maskulin (hādhā) dan feminin (hādhihi)',
    audience: 'AD',
    scope: 'Kata tunjuk dekat dasar'
  },
  {
    skill_id: 'QWD-L1-02',
    owner_island: 'QWD',
    level: 1,
    name: 'Mudzakkar & Muannats Dasar (المُذَكَّر وَالمُؤَنَّث)',
    description: 'Identifikasi tanda ta\' marbuthah (ـة) dan keselarasan kata sifat dasar',
    audience: 'AD',
    scope: 'Gender kata & kesesuaian na\'at'
  },
  {
    skill_id: 'QWD-L1-03',
    owner_island: 'QWD',
    level: 1,
    name: 'Isim Nakirah & Ma\'rifah Ber-Alif Lam (أَلْ التَّعْرِيف)',
    description: 'Perbedaan tanwin (كِتَابٌ) vs alif lam (الكِتَابُ) tanpa tanwin',
    audience: 'AD',
    scope: 'Status ketertentuan kata benda'
  },
  {
    skill_id: 'QWD-L1-04',
    owner_island: 'QWD',
    level: 1,
    name: 'Pemisahan Kalimat Dasar: Isim, Fi\'il, & Harf (أَقْسَامُ الكَلَام)',
    description: 'Mengenal 3 pilar penyusun kalimat bahasa Arab dan ciri-cirinya',
    audience: 'AD',
    scope: 'Klasifikasi kata tata bahasa'
  },
  {
    skill_id: 'QWD-L2-01',
    owner_island: 'QWD',
    level: 2,
    name: 'Kalimat Nominal Dasar: Mubtada\' & Khabar (الجُمْلَة الاسْمِيَّة)',
    description: 'Susunan subjek dan predikat marfu\' (cth: الوَلَدُ نَشِيطٌ)',
    audience: 'AD',
    scope: 'Struktur kalimat nominal berharakat dhommah'
  },
  {
    skill_id: 'QWD-L2-02',
    owner_island: 'QWD',
    level: 2,
    name: 'Huruf Jar & Isim Majrur (حُرُوفُ الجَرّ: فِي، عَلَى، مِنْ، إِلَى)',
    description: 'Fungsi preposisi menyebabkan kata benda setelahnya berkasrah',
    audience: 'AD',
    scope: 'I\'rab jar pada isim mufrad'
  },
  {
    skill_id: 'QWD-L2-03',
    owner_island: 'QWD',
    level: 2,
    name: 'Konsep Kepemilikan Idhafah (المُضَاف وَالمُضَاف إِلَيْه)',
    description: 'Penyandaran dua kata benda: Mudhaf tanpa alif lam & mudhaf ilaih majrur',
    audience: 'AD',
    scope: 'Frasa kepemilikan (cth: كِتَابُ الطَّالِبِ)'
  },
  {
    skill_id: 'QWD-L2-04',
    owner_island: 'QWD',
    level: 2,
    name: 'Kata Ganti Bersambung (الضَّمَائِر المُتَّصِلَة: ـهُ، ـهَا، ـكَ، ـكِ، ـي، ـنَا)',
    description: 'Menyambung dhomir pada isim untuk kepemilikan (قَلَمِي، بَيْتُهُ)',
    audience: 'AD',
    scope: 'Pronomina posesif melekat'
  },
  {
    skill_id: 'QWD-L2-05',
    owner_island: 'QWD',
    level: 2,
    name: 'Isim Isyarah Jauh (ذٰلِكَ / تِلْكَ)',
    description: 'Kata tunjuk benda jauh mudzakkar (dhālika) dan muannats (tilka)',
    audience: 'AD',
    scope: 'Kata tunjuk jarak jauh'
  },
  {
    skill_id: 'QWD-L3-01',
    owner_island: 'QWD',
    level: 3,
    name: 'Kalimat Verbal Dasar (الجُمْلَة الفِعْلِيَّة: فِعْل + فَاعِل)',
    description: 'Struktur kata kerja masa lampau (Fi\'il Madhi) dan pelakunya marfu\'',
    audience: 'AD',
    scope: 'Urutan kalimat kata kerja (cth: قَرَأَ زَيْدٌ)'
  },
  {
    skill_id: 'QWD-L3-02',
    owner_island: 'QWD',
    level: 3,
    name: 'Objek Kalimat Manshub: Maf\'ul Bih (المَفْعُول بِهِ)',
    description: 'Penyebutan objek penderita berharakat fathah (cth: شَرِبَ الوَلَدُ المَاءَ)',
    audience: 'AD',
    scope: 'Kasus akusatif manshub isim mufrad'
  },
  {
    skill_id: 'QWD-L3-03',
    owner_island: 'QWD',
    level: 3,
    name: 'Morfologi Sharaf: Wazan Fa\'ala - Yaf\'ulu (وَزْنُ فَعَلَ - يَفْعُلُ)',
    description: 'Pengenalan wazan dasar tsulatsi mujarrad bab 1 (نَصَرَ - يَنْصُرُ)',
    audience: 'AD',
    scope: 'Pola timbangan konjugasi fi\'il'
  },
  {
    skill_id: 'QWD-L3-04',
    owner_island: 'QWD',
    level: 3,
    name: 'Bentuk Ganda / Mutsanna (المُثَنَّى: ـانِ / ـيْنِ)',
    description: 'Mengubah kata benda tunggal menjadi dua dengan akhiran -āni / -ayni',
    audience: 'AD',
    scope: 'Dual number morfologi'
  },
  {
    skill_id: 'QWD-L4-01',
    owner_island: 'QWD',
    level: 4,
    name: 'Jamak Salim & Jamak Taksir (جَمْعُ المُذَكَّر وَالمُؤَنَّث وَالتَّكْسِير)',
    description: 'Akhiran -ūna/-īna untuk mudzakkar, -āt untuk muannats, serta pola taksir umum',
    audience: 'D',
    scope: 'Plural regular & irregular beserta i\'rab-nya'
  },
  {
    skill_id: 'QWD-L4-02',
    owner_island: 'QWD',
    level: 4,
    name: 'Saudara Kaana & Pengaruh I\'rab (كَانَ وَأَخَوَاتُهَا)',
    description: 'Rafa\' isim Kaana dan nashab khabar Kaana dalam kalimat lampau/keadaan',
    audience: 'D',
    scope: 'Nawasikh al-Ibtida\' bab Kaana'
  },
  {
    skill_id: 'QWD-L4-03',
    owner_island: 'QWD',
    level: 4,
    name: 'Saudara Inna & Pengaruh I\'rab (إِنَّ وَأَخَوَاتُهَا)',
    description: 'Nashab isim Inna dan rafa\' khabar Inna untuk penguat taukid',
    audience: 'D',
    scope: 'Nawasikh al-Ibtida\' bab Inna'
  },
  {
    skill_id: 'QWD-L4-04',
    owner_island: 'QWD',
    level: 4,
    name: 'Konjugasi Fi\'il Mudhari\' & Huruf Nashab / Jazm (أَنْ، لَنْ، لَمْ)',
    description: 'Perubahan harakat akhir fi\'il mudhari\' (marfu\', manshub bi-lan, majzum bi-lam)',
    audience: 'D',
    scope: 'Sintaksis kata kerja masa kini dan mendatang'
  },
  {
    skill_id: 'QWD-L5-01',
    owner_island: 'QWD',
    level: 5,
    name: 'Analisis I\'rab Terperinci (الإِعْرَاب التَّفْصِيلِي)',
    description: 'Menganalisis tanda rafa\', nashab, jar, dan jazm baik asli maupun pengganti',
    audience: 'D',
    scope: 'Penguasaan analisis i\'rab struktur teks fasih'
  },
  {
    skill_id: 'QWD-L5-02',
    owner_island: 'QWD',
    level: 5,
    name: 'Tashrif Isytiqaqi: Isim Fa\'il & Isim Maf\'ul (مُشْتَقَّات الأَسْمَاء)',
    description: 'Membentuk pelaku (fa\'il: كَاتِب) dan objek penderita (maf\'ul: مَكْتُوب)',
    audience: 'D',
    scope: 'Derivasi kata morfologi lanjutan'
  },
  // IST - Lembah Istima'
  {
    skill_id: 'IST-L0-01',
    owner_island: 'IST',
    level: 0,
    name: 'Menyimak Suku Kata & Konsonan Murni',
    description: 'Membedakan pantulan bunyi konsonan murni dan harakat tunggal (fathah, kasrah, dhammah)',
    audience: 'AD',
    scope: 'Reseptif bunyi vokal dasar'
  },
  {
    skill_id: 'IST-L0-02',
    owner_island: 'IST',
    level: 0,
    name: 'Diskriminasi Harakat Pendek vs Panjang (Mad)',
    description: 'Membedakan kata dengan vokal 1 harakat vs vokal mad 2 harakat (cth: جَمَل vs جَمَال)',
    audience: 'AD',
    scope: 'Durasi vokal mad thabi\'i'
  },
  {
    skill_id: 'IST-L0-03',
    owner_island: 'IST',
    level: 0,
    name: 'Menyimak Bunyi Tanwin & Sukun',
    description: 'Menangkap desis akhir nun mati (tanwin -an, -in, -un) dan hentian konsonan sukun',
    audience: 'AD',
    scope: 'Reseptif fonem akhir kata'
  },
  {
    skill_id: 'IST-L1-01',
    owner_island: 'IST',
    level: 1,
    name: 'Pasangan Minimal Halq (Tenggorokan)',
    description: 'Membedakan bunyi ع vs ء, ح vs هـ, dan خ vs غ dalam kata audio penutur asli',
    audience: 'AD',
    scope: 'Kontras ketat makhraj halq'
  },
  {
    skill_id: 'IST-L1-02',
    owner_island: 'IST',
    level: 1,
    name: 'Pasangan Minimal Huruf Tebal / Ithbaq',
    description: 'Membedakan bunyi tipis vs tebal: ت vs ط, د vs ض, س vs ص, dan ذ vs ظ',
    audience: 'AD',
    scope: 'Kontras ketat tafkhim & tarqiq'
  },
  {
    skill_id: 'IST-L1-03',
    owner_island: 'IST',
    level: 1,
    name: 'Menyimak Angka 1-10 & Benda Lingkungan',
    description: 'Menangkap angka Arab (١-١٠) dan benda sehari-hari langsung dari audio gema',
    audience: 'AD',
    scope: 'Angka dan mufradat harian'
  },
  {
    skill_id: 'IST-L1-04',
    owner_island: 'IST',
    level: 1,
    name: 'Menyimak Arah & Orientasi Ruang',
    description: 'Memahami arah gerak audio (يَمِين / kanan, يَسَار / kiri, أَمَام / depan, وَرَاء / belakang)',
    audience: 'AD',
    scope: 'Spasial dan orientasi audio'
  },
  {
    skill_id: 'IST-L2-01',
    owner_island: 'IST',
    level: 2,
    name: 'Menyimak Instruksi Perintah Kelas & Aksi',
    description: 'Merespons instruksi fi\'il amr: اقْرَأْ (baca!), اكْتُبْ (tulis!), اسْمَعْ (dengar!), قِفْ (berdiri!)',
    audience: 'AD',
    scope: 'Perintah amr imperatif reseptif'
  },
  {
    skill_id: 'IST-L2-02',
    owner_island: 'IST',
    level: 2,
    name: 'Menyimak Waktu & Jam Arab',
    description: 'Mendengar frasa waktu jam (السَّاعَةُ الوَاحِدَة، النِّصْف، الرُّبْع) dan waktu shalat',
    audience: 'AD',
    scope: 'Kronometrik dan jadwal harian'
  },
  {
    skill_id: 'IST-L2-03',
    owner_island: 'IST',
    level: 2,
    name: 'Identifikasi Kata Tanya 5W1H dari Audio',
    description: 'Mengenali kata tanya dalam ujaran lisan: مَا، مَنْ، أَيْنَ، مَتَى، كَيْفَ، لِمَاذَا',
    audience: 'AD',
    scope: 'Adawatul istifham reseptif'
  },
  {
    skill_id: 'IST-L2-04',
    owner_island: 'IST',
    level: 2,
    name: 'Diskriminasi Intonasi Tanya vs Berita',
    description: 'Membedakan kalimat tanya retoris vs deklaratif murni lewat nada naik-turun suara',
    audience: 'AD',
    scope: 'Intonasi prosodi Arab'
  },
  {
    skill_id: 'IST-L3-01',
    owner_island: 'IST',
    level: 3,
    name: 'Menyimak Dialog Transaksional Pasar & Toko',
    description: 'Menangkap nama barang, kuantitas, dan total harga dari percakapan audio dua arah',
    audience: 'AD',
    scope: 'Simak dialog transaksional'
  },
  {
    skill_id: 'IST-L3-02',
    owner_island: 'IST',
    level: 3,
    name: 'Menyimak Kisah Singkat & Cerita Fabel',
    description: 'Menangkap alur naratif tokoh, tempat kejadian, dan pesan moral dari tuturan audio',
    audience: 'AD',
    scope: 'Pemahaman narasi kronologis'
  },
  {
    skill_id: 'IST-L3-03',
    owner_island: 'IST',
    level: 3,
    name: 'Menyimak Deskripsi Tempat & Tata Letak',
    description: 'Memetakan letak benda dari instruksi preposisi dengar (فَوْقَ، تَحْتَ، بَيْنَ، جَانِبَ)',
    audience: 'AD',
    scope: 'Pemetaan spasial audio'
  },
  {
    skill_id: 'IST-L4-01',
    owner_island: 'IST',
    level: 4,
    name: 'Menyimak Percakapan Natural Penutur Asli',
    description: 'Memahami ujaran lisan berkecepatan normal dengan pelafalan washal alami',
    audience: 'D',
    scope: 'Kecepatan penutur asli fasih'
  },
  {
    skill_id: 'IST-L4-02',
    owner_island: 'IST',
    level: 4,
    name: 'Menyimak Pengumuman Publik & Panduan Fasilitas',
    description: 'Menangkap informasi penting dari pengumuman audio di bandara, stasiun, atau masjid',
    audience: 'D',
    scope: 'Pengumuman publik formal'
  },
  {
    skill_id: 'IST-L5-01',
    owner_island: 'IST',
    level: 5,
    name: 'Menyimak Wacana Autentik, Berita & Khutbah Fusha',
    description: 'Menganalisis ide pokok, argumen, dan kesimpulan dari wacana lisan Arab formal panjang',
    audience: 'D',
    scope: 'Wacana intelektual & retorika Fusha'
  },
  // QRA - Perpustakaan Qira'ah (18 Keterampilan L1-L5)
  {
    skill_id: 'QRA-L1-01',
    owner_island: 'QRA',
    level: 1,
    name: 'Membaca Kata Bertanda Harakat Lengkap (Fathah, Kasrah, Dhammah)',
    description: 'Membaca lancar kosakata 2-3 suku kata bertanda harakat lengkap tanpa mengeja terputus-putus',
    audience: 'AD',
    scope: 'Kelancaran kata tunggal berharakat'
  },
  {
    skill_id: 'QRA-L1-02',
    owner_island: 'QRA',
    level: 1,
    name: 'Membaca Kata Bervokal Panjang (Mad Thabi\'i Alif, Wawu, Ya)',
    description: 'Menjaga tempo panjang bacaan 2 harakat pada mad ashli di tengah maupun akhir kata',
    audience: 'AD',
    scope: 'Tempo mad thabi\'i'
  },
  {
    skill_id: 'QRA-L1-03',
    owner_island: 'QRA',
    level: 1,
    name: 'Membaca Kalimat Pendek 2-3 Kata (Isim Isyarah & Khobar)',
    description: 'Membaca pola kalimat sederhana seperti هٰذَا كِتَابٌ dan هٰذِهِ مَدْرَسَةٌ dengan intonasi wajar',
    audience: 'AD',
    scope: 'Frasa isyarah & benda'
  },
  {
    skill_id: 'QRA-L1-04',
    owner_island: 'QRA',
    level: 1,
    name: 'Membaca Pembeda Al-Qamariyah vs Asy-Syamsiyah',
    description: 'Membaca jelas lam qamariyah (cth: الكِتَابُ) dan idgham syamsiyah bersyaddah (cth: الشَّمْسُ)',
    audience: 'AD',
    scope: 'Lam ta\'rif qamariyah & syamsiyah'
  },
  {
    skill_id: 'QRA-L2-01',
    owner_island: 'QRA',
    level: 2,
    name: 'Membaca Kalimat Berpreposisi (Jar-Majrur & Zharaf)',
    description: 'Membaca lancar frasa seperti فِي المَسْجِدِ dan تَحْتَ الشَّجَرَةِ dengan harakat kasrah akhir tepat',
    audience: 'AD',
    scope: 'Kelancaran struktur jar-majrur'
  },
  {
    skill_id: 'QRA-L2-02',
    owner_island: 'QRA',
    level: 2,
    name: 'Membaca Paragraf Mini Deskriptif (3-4 Baris Bergambar)',
    description: 'Membaca teks deskripsi singkat tentang rumah, sekolah, atau taman dan menangkap ide umum',
    audience: 'AD',
    scope: 'Membaca pemahaman awal paragraf'
  },
  {
    skill_id: 'QRA-L2-03',
    owner_island: 'QRA',
    level: 2,
    name: 'Membaca Wacana Dialog Pendek 2 Tokoh',
    description: 'Membaca percakapan teks dengan intonasi tanya-jawab yang tepat dan jeda tanda baca',
    audience: 'AD',
    scope: 'Intonasi membaca dialog lisan'
  },
  {
    skill_id: 'QRA-L2-04',
    owner_island: 'QRA',
    level: 2,
    name: 'Teknik Tap-Gloss: Pengenalan Kosakata Kontekstual',
    description: 'Mengidentifikasi makna kata sulit dalam kalimat melalui bantuan glosarium instan',
    audience: 'AD',
    scope: 'Glosarium kontekstual & kamus'
  },
  {
    skill_id: 'QRA-L3-01',
    owner_island: 'QRA',
    level: 3,
    name: 'Membaca Kisah Fabel & Narasi Hikmah Bertingkat',
    description: 'Membaca narasi cerita fabel moral bertokoh hewan (Kisah Semut, Merpati, Singa yang Adil)',
    audience: 'AD',
    scope: 'Wacana narasi fabel & alur'
  },
  {
    skill_id: 'QRA-L3-02',
    owner_island: 'QRA',
    level: 3,
    name: 'Menemukan Ide Pokok & Fakta Utama Paragraf',
    description: 'Menjawab pertanyaan pemahaman: siapa tokohnya, di mana lokasinya, dan apa masalah utamanya',
    audience: 'AD',
    scope: 'Ekstraksi informasi 5W1H'
  },
  {
    skill_id: 'QRA-L3-03',
    owner_island: 'QRA',
    level: 3,
    name: 'Membaca Doa Harian & Dzikir Pilihan',
    description: 'Membaca teks doa sebelum makan, tidur, keluar rumah dengan tartil dan pemahaman maknawi',
    audience: 'AD',
    scope: 'Bacaan doa & permohonan'
  },
  {
    skill_id: 'QRA-L3-04',
    owner_island: 'QRA',
    level: 3,
    name: 'Membaca Surat Sahabat & Kartu Pos Hudhud',
    description: 'Membaca teks surat persahabatan formal-santai dan menjawab pertanyaan balasan sahabat',
    audience: 'AD',
    scope: 'Korespondensi teks & pesan'
  },
  {
    skill_id: 'QRA-L4-01',
    owner_island: 'QRA',
    level: 4,
    name: 'Membaca Teks Sebagian Tanpa Harakat (Teks Gundul Parsial)',
    description: 'Menebak harakat akhir kata berdasarkan kedudukan i\'rab fa\'il (dhammah) dan maf\'ul (fathah)',
    audience: 'D',
    scope: 'Transisi teks berharakat ke gundul'
  },
  {
    skill_id: 'QRA-L4-02',
    owner_island: 'QRA',
    level: 4,
    name: 'Membaca Teks Informatif & Artikel Pengetahuan Islam',
    description: 'Membaca artikel ensiklopedia sejarah sains Islam, biografi Ibnu Sina, dan geografi dunia Islam',
    audience: 'D',
    scope: 'Wacana saintifik & biografi'
  },
  {
    skill_id: 'QRA-L4-03',
    owner_island: 'QRA',
    level: 4,
    name: 'Menganalisis Kosakata Jamak Taksir & Sinonim (Taraduf)',
    description: 'Mengidentifikasi bentuk mufrad-jamak dan pasangan kata bersinonim di dalam konteks naskah',
    audience: 'D',
    scope: 'Leksikologi kontekstual bacaan'
  },
  {
    skill_id: 'QRA-L5-01',
    owner_island: 'QRA',
    level: 5,
    name: 'Membaca Teks Klasik / Turats Singkat Tanpa Harakat',
    description: 'Membaca matan ringkas adab menuntut ilmu dan hadits nabi pilihan tanpa harakat dengan kaidah nahwu',
    audience: 'D',
    scope: 'Membaca kitab kuning / turats dasar'
  },
  {
    skill_id: 'QRA-L5-02',
    owner_island: 'QRA',
    level: 5,
    name: 'Membaca Wacana Opini, Artikel Berita & Esai Kontemporer',
    description: 'Menganalisis sudut pandang penulis, argumen pendukung, dan pesan tersirat dari tajuk rencana berita Fusha',
    audience: 'D',
    scope: 'Analisis kritis wacana modern'
  },
  {
    skill_id: 'QRA-L5-03',
    owner_island: 'QRA',
    level: 5,
    name: 'Membaca Puisi Hikmah (Syi\'ir Arab Mahfuzhat)',
    description: 'Membaca bait-bait syi\'ir Imam Syafi\'i tentang keutamaan ilmu dan ketekunan dengan rima yang indah',
    audience: 'D',
    scope: 'Apresiasi sastra & syi\'ir Arab'
  },
  // KTB - Pelabuhan Kitabah
  {
    skill_id: 'KTB-L1-01',
    owner_island: 'KTB',
    level: 1,
    name: 'Imla\' Dikte Kata Sederhana',
    description: 'Mendengar kata dan memilih susunan ejaan huruf yang tepat',
    audience: 'AD',
    scope: 'Ejaan akurat'
  },
  // KLM - Pulau Kalam (Berbicara & Pelafalan Mikrofon)
  {
    skill_id: 'KLM-L0-01',
    owner_island: 'KLM',
    level: 0,
    name: 'Makhraj Halq (Tenggorokan Atas, Tengah, Bawah)',
    description: 'Melafalkan huruf halqiah (ء هـ ع ح غ خ) dengan getaran dan letak artikulasi yang tepat',
    audience: 'AD',
    scope: 'Artikulasi 6 huruf halq'
  },
  {
    skill_id: 'KLM-L0-02',
    owner_island: 'KLM',
    level: 0,
    name: 'Makhraj Lisan (Lidah: Pangkal, Tengah & Tepi)',
    description: 'Melafalkan huruf berat pangkal lidah (ق، ك) dan tengah lidah (ج، ش، ي) dengan mikrofon',
    audience: 'AD',
    scope: 'Artikulasi pangkal dan tengah lidah'
  },
  {
    skill_id: 'KLM-L0-03',
    owner_island: 'KLM',
    level: 0,
    name: 'Makhraj Huruf Tebal & Desis (Isti\'la & Shafir: ص، ض، ط، ظ)',
    description: 'Menjaga ketebalan rongga mulut (tafkhim) pada huruf ithbaq dan isti\'la tanpa mengubah vokal',
    audience: 'AD',
    scope: 'Huruf tebal dan berdesis'
  },
  {
    skill_id: 'KLM-L1-01',
    owner_island: 'KLM',
    level: 1,
    name: 'Pelafalan Kosakata Tematik Bertanwin & Sukun',
    description: 'Melafalkan kosakata benda dan lingkungan sehari-hari dengan harakat akhir jelas dan fasih',
    audience: 'AD',
    scope: 'Kosakata tematik berharakat presisi'
  },
  {
    skill_id: 'KLM-L1-02',
    owner_island: 'KLM',
    level: 1,
    name: 'Kelancaran Kalimat Sapaan & Tahiyyat (Thalaqah Awal)',
    description: 'Melafalkan kalimat salam, tanya kabar, dan ungkapan sopan dengan ritme wajar tanpa jeda kaku',
    audience: 'AD',
    scope: 'Kalimat sapaan & intonasi lisan'
  },
  {
    skill_id: 'KLM-L2-01',
    owner_island: 'KLM',
    level: 2,
    name: 'Intonasi Kalimat Tanya, Perintah & Seru',
    description: 'Membedakan nada naik pada istifham (tanya) dan nada tegas berwibawa pada amar (perintah)',
    audience: 'AD',
    scope: 'Intonasi fonetik kalimat kompleks'
  },
  // TMH - Kuil Langit
  {
    skill_id: 'TMH-L0-01',
    owner_island: 'TMH',
    level: 0,
    name: 'Gerbang Ujian Jenjang 0 (Mihrab Tamhidi)',
    description: 'Evaluasi komprehensif 4 keterampilan untuk naik Rutbah Thalib',
    audience: 'AD',
    scope: 'Ujian Jenjang 0'
  }
];

// Lexicon Lampiran A & B dari PDF (Single Owner Rule)
export const LEXICON_DATA: Lexeme[] = [
  // --- HRF (Pulau Huruf) ---
  { id: 'lx_alif', ar_vocalized: 'أَلِف', ar_plain: 'الف', translit: 'alif', gloss_id: 'huruf alif', owner_island: 'HRF', level: 0, skill_id: 'HRF-L0-01', pos: 'huruf', category: 'Huruf Hijaiyah', visual_hint: 'أ' },
  { id: 'lx_baa', ar_vocalized: 'بَاء', ar_plain: 'باء', translit: 'bāʾ', gloss_id: 'huruf ba', owner_island: 'HRF', level: 0, skill_id: 'HRF-L0-01', pos: 'huruf', category: 'Huruf Hijaiyah', visual_hint: 'ب' },
  { id: 'lx_taa', ar_vocalized: 'تَاء', ar_plain: 'تاء', translit: 'tāʾ', gloss_id: 'huruf ta', owner_island: 'HRF', level: 0, skill_id: 'HRF-L0-01', pos: 'huruf', category: 'Huruf Hijaiyah', visual_hint: 'ت' },
  { id: 'lx_tsaa', ar_vocalized: 'ثَاء', ar_plain: 'ثاء', translit: 'thāʾ', gloss_id: 'huruf tsa', owner_island: 'HRF', level: 0, skill_id: 'HRF-L0-01', pos: 'huruf', category: 'Huruf Hijaiyah', visual_hint: 'ث' },
  { id: 'lx_jiim', ar_vocalized: 'جِيم', ar_plain: 'جيم', translit: 'jīm', gloss_id: 'huruf jim', owner_island: 'HRF', level: 0, skill_id: 'HRF-L0-01', pos: 'huruf', category: 'Huruf Hijaiyah', visual_hint: 'ج' },
  { id: 'lx_haa_halqi', ar_vocalized: 'حَاء', ar_plain: 'حاء', translit: 'ḥāʾ', gloss_id: 'huruf ha bersih (tenggorokan)', owner_island: 'HRF', level: 0, skill_id: 'HRF-L0-01', pos: 'huruf', category: 'Huruf Hijaiyah', visual_hint: 'ح' },
  { id: 'lx_khaa', ar_vocalized: 'خَاء', ar_plain: 'خاء', translit: 'khāʾ', gloss_id: 'huruf kha', owner_island: 'HRF', level: 0, skill_id: 'HRF-L0-01', pos: 'huruf', category: 'Huruf Hijaiyah', visual_hint: 'خ' },
  { id: 'lx_dal', ar_vocalized: 'دَال', ar_plain: 'دال', translit: 'dāl', gloss_id: 'huruf dal', owner_island: 'HRF', level: 0, skill_id: 'HRF-L0-02', pos: 'huruf', category: 'Huruf Hijaiyah', visual_hint: 'د' },
  { id: 'lx_dzal', ar_vocalized: 'ذَال', ar_plain: 'ذال', translit: 'dhāl', gloss_id: 'huruf dzal', owner_island: 'HRF', level: 0, skill_id: 'HRF-L0-02', pos: 'huruf', category: 'Huruf Hijaiyah', visual_hint: 'ذ' },
  { id: 'lx_raa', ar_vocalized: 'رَاء', ar_plain: 'راء', translit: 'rāʾ', gloss_id: 'huruf ra', owner_island: 'HRF', level: 0, skill_id: 'HRF-L0-02', pos: 'huruf', category: 'Huruf Hijaiyah', visual_hint: 'ر' },
  { id: 'lx_zay', ar_vocalized: 'زَاي', ar_plain: 'زاي', translit: 'zāy', gloss_id: 'huruf zai', owner_island: 'HRF', level: 0, skill_id: 'HRF-L0-02', pos: 'huruf', category: 'Huruf Hijaiyah', visual_hint: 'ز' },
  { id: 'lx_siin', ar_vocalized: 'سِين', ar_plain: 'سين', translit: 'sīn', gloss_id: 'huruf sin', owner_island: 'HRF', level: 0, skill_id: 'HRF-L0-02', pos: 'huruf', category: 'Huruf Hijaiyah', visual_hint: 'س' },
  { id: 'lx_syiin', ar_vocalized: 'شِين', ar_plain: 'شين', translit: 'shīn', gloss_id: 'huruf syin', owner_island: 'HRF', level: 0, skill_id: 'HRF-L0-02', pos: 'huruf', category: 'Huruf Hijaiyah', visual_hint: 'ش' },
  { id: 'lx_shaad', ar_vocalized: 'صَاد', ar_plain: 'صاد', translit: 'ṣād', gloss_id: 'huruf shad tebal', owner_island: 'HRF', level: 0, skill_id: 'HRF-L0-02', pos: 'huruf', category: 'Huruf Hijaiyah', visual_hint: 'ص' },
  { id: 'lx_dhaad', ar_vocalized: 'ضَاد', ar_plain: 'ضاد', translit: 'ḍād', gloss_id: 'huruf dhad', owner_island: 'HRF', level: 0, skill_id: 'HRF-L0-03', pos: 'huruf', category: 'Huruf Hijaiyah', visual_hint: 'ض' },
  { id: 'lx_thaa', ar_vocalized: 'طَاء', ar_plain: 'طاء', translit: 'ṭāʾ', gloss_id: 'huruf tha tebal', owner_island: 'HRF', level: 0, skill_id: 'HRF-L0-03', pos: 'huruf', category: 'Huruf Hijaiyah', visual_hint: 'ط' },
  { id: 'lx_zhaa', ar_vocalized: 'ظَاء', ar_plain: 'ظاء', translit: 'ẓāʾ', gloss_id: 'huruf zha', owner_island: 'HRF', level: 0, skill_id: 'HRF-L0-03', pos: 'huruf', category: 'Huruf Hijaiyah', visual_hint: 'ظ' },
  { id: 'lx_ayn', ar_vocalized: 'عَيْن', ar_plain: 'عين', translit: 'ʿayn', gloss_id: 'huruf ain', owner_island: 'HRF', level: 0, skill_id: 'HRF-L0-03', pos: 'huruf', category: 'Huruf Hijaiyah', visual_hint: 'ع' },
  { id: 'lx_ghayn', ar_vocalized: 'غَيْن', ar_plain: 'غين', translit: 'ghayn', gloss_id: 'huruf ghain', owner_island: 'HRF', level: 0, skill_id: 'HRF-L0-03', pos: 'huruf', category: 'Huruf Hijaiyah', visual_hint: 'غ' },
  { id: 'lx_faa', ar_vocalized: 'فَاء', ar_plain: 'فاء', translit: 'fāʾ', gloss_id: 'huruf fa', owner_island: 'HRF', level: 0, skill_id: 'HRF-L0-03', pos: 'huruf', category: 'Huruf Hijaiyah', visual_hint: 'ف' },
  { id: 'lx_qaaf', ar_vocalized: 'قَاف', ar_plain: 'قاف', translit: 'qāf', gloss_id: 'huruf qaf tebal', owner_island: 'HRF', level: 0, skill_id: 'HRF-L0-03', pos: 'huruf', category: 'Huruf Hijaiyah', visual_hint: 'ق' },
  { id: 'lx_kaaf', ar_vocalized: 'كَاف', ar_plain: 'كاف', translit: 'kāf', gloss_id: 'huruf kaf', owner_island: 'HRF', level: 0, skill_id: 'HRF-L0-04', pos: 'huruf', category: 'Huruf Hijaiyah', visual_hint: 'ك' },
  { id: 'lx_laam', ar_vocalized: 'لَام', ar_plain: 'لام', translit: 'lām', gloss_id: 'huruf lam', owner_island: 'HRF', level: 0, skill_id: 'HRF-L0-04', pos: 'huruf', category: 'Huruf Hijaiyah', visual_hint: 'ل' },
  { id: 'lx_miim', ar_vocalized: 'مِيم', ar_plain: 'ميم', translit: 'mīm', gloss_id: 'huruf mim', owner_island: 'HRF', level: 0, skill_id: 'HRF-L0-04', pos: 'huruf', category: 'Huruf Hijaiyah', visual_hint: 'م' },
  { id: 'lx_nuun', ar_vocalized: 'نُون', ar_plain: 'نون', translit: 'nūn', gloss_id: 'huruf nun', owner_island: 'HRF', level: 0, skill_id: 'HRF-L0-04', pos: 'huruf', category: 'Huruf Hijaiyah', visual_hint: 'ن' },
  { id: 'lx_ha_marbuth', ar_vocalized: 'هَاء', ar_plain: 'هاء', translit: 'hāʾ', gloss_id: 'huruf ha dada', owner_island: 'HRF', level: 0, skill_id: 'HRF-L0-04', pos: 'huruf', category: 'Huruf Hijaiyah', visual_hint: 'ه' },
  { id: 'lx_waaw', ar_vocalized: 'وَاو', ar_plain: 'واو', translit: 'wāw', gloss_id: 'huruf waw', owner_island: 'HRF', level: 0, skill_id: 'HRF-L0-04', pos: 'huruf', category: 'Huruf Hijaiyah', visual_hint: 'و' },
  { id: 'lx_yaa', ar_vocalized: 'يَاء', ar_plain: 'ياء', translit: 'yāʾ', gloss_id: 'huruf ya', owner_island: 'HRF', level: 0, skill_id: 'HRF-L0-04', pos: 'huruf', category: 'Huruf Hijaiyah', visual_hint: 'ي' },

  // Harakat Dasar (HRF-L0-05)
  { id: 'lx_fathah_ba', ar_vocalized: 'بَ', ar_plain: 'ب', translit: 'ba', gloss_id: 'huruf ba fathah (vokal a)', owner_island: 'HRF', level: 0, skill_id: 'HRF-L0-05', pos: 'huruf', category: 'Harakat Dasar', visual_hint: 'بَ' },
  { id: 'lx_kasrah_bi', ar_vocalized: 'بِ', ar_plain: 'ب', translit: 'bi', gloss_id: 'huruf ba kasrah (vokal i)', owner_island: 'HRF', level: 0, skill_id: 'HRF-L0-05', pos: 'huruf', category: 'Harakat Dasar', visual_hint: 'بِ' },
  { id: 'lx_dhammah_bu', ar_vocalized: 'بُ', ar_plain: 'ب', translit: 'bu', gloss_id: 'huruf ba dhammah (vokal u)', owner_island: 'HRF', level: 0, skill_id: 'HRF-L0-05', pos: 'huruf', category: 'Harakat Dasar', visual_hint: 'بُ' },
  { id: 'lx_fathah_ta', ar_vocalized: 'تَ', ar_plain: 'ت', translit: 'ta', gloss_id: 'huruf ta fathah (vokal a)', owner_island: 'HRF', level: 0, skill_id: 'HRF-L0-05', pos: 'huruf', category: 'Harakat Dasar', visual_hint: 'تَ' },
  { id: 'lx_kasrah_ti', ar_vocalized: 'تِ', ar_plain: 'ت', translit: 'ti', gloss_id: 'huruf ta kasrah (vokal i)', owner_island: 'HRF', level: 0, skill_id: 'HRF-L0-05', pos: 'huruf', category: 'Harakat Dasar', visual_hint: 'تِ' },
  { id: 'lx_dhammah_tu', ar_vocalized: 'تُ', ar_plain: 'ت', translit: 'tu', gloss_id: 'huruf ta dhammah (vokal u)', owner_island: 'HRF', level: 0, skill_id: 'HRF-L0-05', pos: 'huruf', category: 'Harakat Dasar', visual_hint: 'تُ' },
  { id: 'lx_harakat_darasa', ar_vocalized: 'دَرَسَ', ar_plain: 'درس', translit: 'darasa', gloss_id: 'dia belajar (rangkaian 3 fathah)', owner_island: 'HRF', level: 0, skill_id: 'HRF-L0-05', pos: 'fiil', category: 'Harakat Dasar', visual_hint: '📚' },

  // Bentuk Posisi Sambung (HRF-L1-01)
  { id: 'lx_pos_ba_awal', ar_vocalized: 'بـ', ar_plain: 'بـ', translit: 'b- (awal)', gloss_id: 'huruf ba di awal kata (menyambung ke kiri)', owner_island: 'HRF', level: 1, skill_id: 'HRF-L1-01', pos: 'huruf', category: 'Bentuk Sambung', visual_hint: 'بـ' },
  { id: 'lx_pos_ba_tengah', ar_vocalized: 'ـبـ', ar_plain: 'ـبـ', translit: '-b- (tengah)', gloss_id: 'huruf ba di tengah kata (menyambung dua arah)', owner_island: 'HRF', level: 1, skill_id: 'HRF-L1-01', pos: 'huruf', category: 'Bentuk Sambung', visual_hint: 'ـبـ' },
  { id: 'lx_pos_ba_akhir', ar_vocalized: 'ـب', ar_plain: 'ـب', translit: '-b (akhir)', gloss_id: 'huruf ba di akhir kata (menyambung dari kanan)', owner_island: 'HRF', level: 1, skill_id: 'HRF-L1-01', pos: 'huruf', category: 'Bentuk Sambung', visual_hint: 'ـب' },
  { id: 'lx_pos_jim_tengah', ar_vocalized: 'ـجـ', ar_plain: 'ـجـ', translit: '-j- (tengah)', gloss_id: 'huruf jim di tengah kata', owner_island: 'HRF', level: 1, skill_id: 'HRF-L1-01', pos: 'huruf', category: 'Bentuk Sambung', visual_hint: 'ـجـ' },
  { id: 'lx_pos_mim_awal', ar_vocalized: 'مـ', ar_plain: 'مـ', translit: 'm- (awal)', gloss_id: 'huruf mim di awal kata', owner_island: 'HRF', level: 1, skill_id: 'HRF-L1-01', pos: 'huruf', category: 'Bentuk Sambung', visual_hint: 'مـ' },

  // 6 Huruf Pemutus Sambungan Kiri: ا د ذ ر ز و (HRF-L1-02)
  { id: 'lx_sep_bab', ar_vocalized: 'بَاب', ar_plain: 'باب', translit: 'bāb', gloss_id: 'pintu (alif pemutus sambungan ke kiri)', owner_island: 'HRF', level: 1, skill_id: 'HRF-L1-02', pos: 'isim', category: 'Huruf Pemutus Kiri', visual_hint: '🚪' },
  { id: 'lx_sep_darasa', ar_vocalized: 'دَرَسَ', ar_plain: 'درس', translit: 'darasa', gloss_id: 'dia belajar (dal dan ra pemutus kiri)', owner_island: 'HRF', level: 1, skill_id: 'HRF-L1-02', pos: 'fiil', category: 'Huruf Pemutus Kiri', visual_hint: '📖' },
  { id: 'lx_sep_ward', ar_vocalized: 'وَرْد', ar_plain: 'ورد', translit: 'ward', gloss_id: 'bunga mawar (waw dan ra pemutus kiri)', owner_island: 'HRF', level: 1, skill_id: 'HRF-L1-02', pos: 'isim', category: 'Huruf Pemutus Kiri', visual_hint: '🌹' },
  { id: 'lx_sep_zayt', ar_vocalized: 'زَيْت', ar_plain: 'زيت', translit: 'zayt', gloss_id: 'minyak zaitun (zay pemutus kiri)', owner_island: 'HRF', level: 1, skill_id: 'HRF-L1-02', pos: 'isim', category: 'Huruf Pemutus Kiri', visual_hint: '🫒' },

  // Sukun & Syaddah (HRF-L1-03)
  { id: 'lx_suk_ab', ar_vocalized: 'أَبْ', ar_plain: 'أب', translit: 'ab', gloss_id: 'ba sukun mati (berhenti pada konsonan b)', owner_island: 'HRF', level: 1, skill_id: 'HRF-L1-03', pos: 'huruf', category: 'Sukun', visual_hint: '🛑' },
  { id: 'lx_syd_rabb', ar_vocalized: 'رَبّ', ar_plain: 'رب', translit: 'rabb', gloss_id: 'Tuhan (ba ber-syaddah ditekan rangkap)', owner_island: 'HRF', level: 1, skill_id: 'HRF-L1-03', pos: 'isim', category: 'Syaddah', visual_hint: '⚡' },
  { id: 'lx_suk_shams', ar_vocalized: 'شَمْس', ar_plain: 'شمس', translit: 'shams', gloss_id: 'matahari (mim bersukun di tengah)', owner_island: 'HRF', level: 1, skill_id: 'HRF-L1-03', pos: 'isim', category: 'Sukun', visual_hint: '☀️' },
  { id: 'lx_syd_kull', ar_vocalized: 'كُلّ', ar_plain: 'كل', translit: 'kull', gloss_id: 'setiap / semua (lam ditekan syaddah)', owner_island: 'HRF', level: 1, skill_id: 'HRF-L1-03', pos: 'isim', category: 'Syaddah', visual_hint: '🌐' },

  // Tanwin (HRF-L1-04)
  { id: 'lx_tan_kitabun', ar_vocalized: 'كِتَابٌ', ar_plain: 'كتاب', translit: 'kitābun', gloss_id: 'sebuah buku (dhammatain -un di akhir)', owner_island: 'HRF', level: 1, skill_id: 'HRF-L1-04', pos: 'isim', category: 'Tanwin', visual_hint: '📖' },
  { id: 'lx_tan_kitaban', ar_vocalized: 'كِتَابًا', ar_plain: 'كتابا', translit: 'kitāban', gloss_id: 'sebuah buku (fathatain -an dengan alif tanwin)', owner_island: 'HRF', level: 1, skill_id: 'HRF-L1-04', pos: 'isim', category: 'Tanwin', visual_hint: '📖' },
  { id: 'lx_tan_kitabin', ar_vocalized: 'كِتَابٍ', ar_plain: 'كتاب', translit: 'kitābin', gloss_id: 'sebuah buku (kasratain -in di bawah akhir)', owner_island: 'HRF', level: 1, skill_id: 'HRF-L1-04', pos: 'isim', category: 'Tanwin', visual_hint: '📖' },
  { id: 'lx_tan_baytun', ar_vocalized: 'بَيْتٌ', ar_plain: 'بيت', translit: 'baytun', gloss_id: 'sebuah rumah (dhammatain -un)', owner_island: 'HRF', level: 1, skill_id: 'HRF-L1-04', pos: 'isim', category: 'Tanwin', visual_hint: '🏠' },

  // Mad Thabi'i Vokal Panjang 2 Harakat (HRF-L1-05)
  { id: 'lx_mad_qala', ar_vocalized: 'قَالَ', ar_plain: 'قال', translit: 'qāla', gloss_id: 'dia berkata (mad alif 2 harakat)', owner_island: 'HRF', level: 1, skill_id: 'HRF-L1-05', pos: 'fiil', category: 'Mad Thabii', visual_hint: '🗣️' },
  { id: 'lx_mad_yaqulu', ar_vocalized: 'يَقُولُ', ar_plain: 'يقول', translit: 'yaqūlu', gloss_id: 'dia sedang berkata (mad waw 2 harakat)', owner_island: 'HRF', level: 1, skill_id: 'HRF-L1-05', pos: 'fiil', category: 'Mad Thabii', visual_hint: '🗣️' },
  { id: 'lx_mad_qila', ar_vocalized: 'قِيلَ', ar_plain: 'قيل', translit: 'qīla', gloss_id: 'dikatakan (mad ya 2 harakat)', owner_island: 'HRF', level: 1, skill_id: 'HRF-L1-05', pos: 'fiil', category: 'Mad Thabii', visual_hint: '💬' },
  { id: 'lx_mad_nur', ar_vocalized: 'نُور', ar_plain: 'نور', translit: 'nūr', gloss_id: 'cahaya (mad waw panjang)', owner_island: 'HRF', level: 1, skill_id: 'HRF-L1-05', pos: 'isim', category: 'Mad Thabii', visual_hint: '✨' },

  // Alif-Lam Syamsiyah & Qamariyah (HRF-L2-01)
  { id: 'lx_al_qamar', ar_vocalized: 'القَمَر', ar_plain: 'القمر', translit: 'al-qamar', gloss_id: 'bulan (alif-lam qamariyah - lam dibaca jelas)', owner_island: 'HRF', level: 2, skill_id: 'HRF-L2-01', pos: 'isim', category: 'Alif Lam', visual_hint: '🌙' },
  { id: 'lx_al_shams', ar_vocalized: 'الشَّمْس', ar_plain: 'الشمس', translit: 'ash-shams', gloss_id: 'matahari (alif-lam syamsiyah - lam lebur ke syin)', owner_island: 'HRF', level: 2, skill_id: 'HRF-L2-01', pos: 'isim', category: 'Alif Lam', visual_hint: '☀️' },
  { id: 'lx_al_najm', ar_vocalized: 'النَّجْم', ar_plain: 'النجم', translit: 'an-najm', gloss_id: 'bintang (alif-lam syamsiyah - lebur ke nun)', owner_island: 'HRF', level: 2, skill_id: 'HRF-L2-01', pos: 'isim', category: 'Alif Lam', visual_hint: '⭐' },
  { id: 'lx_al_bab', ar_vocalized: 'البَاب', ar_plain: 'الباب', translit: 'al-bāb', gloss_id: 'pintu itu (alif-lam qamariyah - jelas pada ba)', owner_island: 'HRF', level: 2, skill_id: 'HRF-L2-01', pos: 'isim', category: 'Alif Lam', visual_hint: '🚪' },

  // Hamzah Washl & Qath' (HRF-L2-02)
  { id: 'lx_hz_ab', ar_vocalized: 'أَب', ar_plain: 'أب', translit: 'ab', gloss_id: 'ayah (hamzah qath\' - selalu terbaca jelas)', owner_island: 'HRF', level: 2, skill_id: 'HRF-L2-02', pos: 'isim', category: 'Hamzah', visual_hint: '👨' },
  { id: 'lx_hz_ism', ar_vocalized: 'اِسْم', ar_plain: 'اسم', translit: 'ism', gloss_id: 'nama (hamzah washal - lebur saat bersambung)', owner_island: 'HRF', level: 2, skill_id: 'HRF-L2-02', pos: 'isim', category: 'Hamzah', visual_hint: '🏷️' },
  { id: 'lx_hz_ibn', ar_vocalized: 'اِبْن', ar_plain: 'ابن', translit: 'ibn', gloss_id: 'anak laki-laki (hamzah washal)', owner_island: 'HRF', level: 2, skill_id: 'HRF-L2-02', pos: 'isim', category: 'Hamzah', visual_hint: '👦' },
  { id: 'lx_hz_islam', ar_vocalized: 'إِسْلَام', ar_plain: 'إسلام', translit: 'islām', gloss_id: 'Islam (hamzah qath\' kasrah bawah tegak)', owner_island: 'HRF', level: 2, skill_id: 'HRF-L2-02', pos: 'isim', category: 'Hamzah', visual_hint: '🕌' },

  // Ta' Marbuthah & Alif Maqshurah (HRF-L2-03)
  { id: 'lx_tm_madrasah', ar_vocalized: 'مَدْرَسَة', ar_plain: 'مدرسة', translit: 'madrasah', gloss_id: 'sekolah (ta marbuthah: bunyi "h" waqaf, "t" washal)', owner_island: 'HRF', level: 2, skill_id: 'HRF-L2-03', pos: 'isim', category: 'Ta Marbuthah', visual_hint: '🏫' },
  { id: 'lx_tm_bint', ar_vocalized: 'بِنْت', ar_plain: 'بنت', translit: 'bint', gloss_id: 'anak perempuan (ta maftuhah/terbuka: selalu bunyi "t")', owner_island: 'HRF', level: 2, skill_id: 'HRF-L2-03', pos: 'isim', category: 'Ta Maftuhah', visual_hint: '👧' },
  { id: 'lx_tm_huda', ar_vocalized: 'هُدَى', ar_plain: 'هدى', translit: 'hudā', gloss_id: 'petunjuk (alif maqshurah bentuk ya tanpa titik bunyi a panjang)', owner_island: 'HRF', level: 2, skill_id: 'HRF-L2-03', pos: 'isim', category: 'Alif Maqshurah', visual_hint: '🧭' },

  // Pasangan Huruf Mirip Makhraj Kontras (HRF-L2-04)
  { id: 'lx_mk_qalb_kalb', ar_vocalized: 'قَلْب / كَلْب', ar_plain: 'قلب / كلب', translit: 'qalb vs kalb', gloss_id: 'qaf tebal (hati) vs kaf tipis (anjing)', owner_island: 'HRF', level: 2, skill_id: 'HRF-L2-04', pos: 'isim', category: 'Pasangan Makhraj', visual_hint: '❤️🐕' },
  { id: 'lx_mk_hamd_hamd', ar_vocalized: 'حَمْد / هَمْد', ar_plain: 'حمد / همد', translit: 'ḥamd vs hamd', gloss_id: 'ha tengah tenggorokan (puji) vs ha dada', owner_island: 'HRF', level: 2, skill_id: 'HRF-L2-04', pos: 'isim', category: 'Pasangan Makhraj', visual_hint: '🤲' },
  { id: 'lx_mk_alim_alim', ar_vocalized: 'عَلِيم / أَلِيم', ar_plain: 'عليم / أليم', translit: 'ʿalīm vs alīm', gloss_id: 'ain lentur (tahu) vs hamzah hentak (pedih)', owner_island: 'HRF', level: 2, skill_id: 'HRF-L2-04', pos: 'isim', category: 'Pasangan Makhraj', visual_hint: '🧠⚡' },
  { id: 'lx_mk_tin_tin', ar_vocalized: 'تِين / طِين', ar_plain: 'تين / طين', translit: 'tīn vs ṭīn', gloss_id: 'ta tipis (buah tin) vs tha tebal bulat (tanah liat)', owner_island: 'HRF', level: 2, skill_id: 'HRF-L2-04', pos: 'isim', category: 'Pasangan Makhraj', visual_hint: '🫐🧱' },
  { id: 'lx_mk_sayf_sayf', ar_vocalized: 'سَيْف / صَيْف', ar_plain: 'سيف / صيف', translit: 'sayf vs ṣayf', gloss_id: 'sin desis tipis (pedang) vs shad tebal (musim panas)', owner_island: 'HRF', level: 2, skill_id: 'HRF-L2-04', pos: 'isim', category: 'Pasangan Makhraj', visual_hint: '🗡️☀️' },

  // Khat Naskh & Kaligrafi (HRF-L2-05)
  { id: 'lx_khat_satr', ar_vocalized: 'السَّطْر', ar_plain: 'السطر', translit: 'as-saṭr', gloss_id: 'garis buku naskh sebagai patokan ketinggian huruf', owner_island: 'HRF', level: 2, skill_id: 'HRF-L2-05', pos: 'isim', category: 'Khat Naskh', visual_hint: '📏' },
  { id: 'lx_khat_rasm', ar_vocalized: 'رَسْمُ الحُرُوف', ar_plain: 'رسم الحروف', translit: 'rasmu l-ḥurūf', gloss_id: 'kaidah goresan huruf di atas dan bawah garis', owner_island: 'HRF', level: 2, skill_id: 'HRF-L2-05', pos: 'phrase', category: 'Khat Naskh', visual_hint: '✒️' },

  // Decoding Teks Gundul (HRF-L3-01)
  { id: 'lx_gundul_kitab', ar_vocalized: 'كتاب', ar_plain: 'كتاب', translit: 'kitāb', gloss_id: 'membaca kata tanpa harakat dari wazan isim sering', owner_island: 'HRF', level: 3, skill_id: 'HRF-L3-01', pos: 'isim', category: 'Teks Gundul', visual_hint: '📜' },
  { id: 'lx_gundul_madrasah', ar_vocalized: 'مدرسة', ar_plain: 'مدرسة', translit: 'madrasah', gloss_id: 'membaca wazan maf\'alah (tempat) tanpa harakat', owner_island: 'HRF', level: 3, skill_id: 'HRF-L3-01', pos: 'isim', category: 'Teks Gundul', visual_hint: '🏫' },

  // Ligatur Naskh (HRF-L3-02)
  { id: 'lx_lig_laa', ar_vocalized: 'لَا', ar_plain: 'لا', translit: 'lā', gloss_id: 'ligatur lam-alif menyatu (artinya: tidak/bukan)', owner_island: 'HRF', level: 3, skill_id: 'HRF-L3-02', pos: 'huruf', category: 'Ligatur Naskh', visual_hint: '❌' },
  { id: 'lx_lig_laa_hamzah', ar_vocalized: 'لَأْ', ar_plain: 'لأ', translit: 'laʾ', gloss_id: 'ligatur lam-alif dengan hamzah di tengah', owner_island: 'HRF', level: 3, skill_id: 'HRF-L3-02', pos: 'huruf', category: 'Ligatur Naskh', visual_hint: '🔤' },

  // Prosodi & Irama (HRF-L3-03)
  { id: 'lx_prs_tanya', ar_vocalized: 'هَلْ هٰذَا كِتَابٌ؟', ar_plain: 'هل هذا كتاب؟', translit: 'hal hādhā kitābun?', gloss_id: 'apakah ini buku? (irama intonasi naik)', owner_island: 'HRF', level: 3, skill_id: 'HRF-L3-03', pos: 'phrase', category: 'Prosodi', visual_hint: '❓' },
  { id: 'lx_prs_seru', ar_vocalized: 'مَا أَجْمَلَ هٰذَا!', ar_plain: 'ما أجمل هذا!', translit: 'mā ajmala hādhā!', gloss_id: 'betapa indahnya ini! (intonasi kekaguman)', owner_island: 'HRF', level: 3, skill_id: 'HRF-L3-03', pos: 'phrase', category: 'Prosodi', visual_hint: '✨' },

  // --- MFR (Pasar Apung Mufradat) ---
  // Angka (MFR-L0-01)
  { id: 'lx_wahid', ar_vocalized: 'وَاحِد', ar_plain: 'واحد', translit: 'wāḥid', gloss_id: 'satu (1)', owner_island: 'MFR', level: 0, skill_id: 'MFR-L0-01', pos: 'isim', category: 'Angka', visual_hint: '١' },
  { id: 'lx_ithnan', ar_vocalized: 'اِثْنَان', ar_plain: 'اثنان', translit: 'ithnān', gloss_id: 'dua (2)', owner_island: 'MFR', level: 0, skill_id: 'MFR-L0-01', pos: 'isim', category: 'Angka', visual_hint: '٢' },
  { id: 'lx_thalatsah', ar_vocalized: 'ثَلَاثَة', ar_plain: 'ثلاثة', translit: 'thalāthah', gloss_id: 'tiga (3)', owner_island: 'MFR', level: 0, skill_id: 'MFR-L0-01', pos: 'isim', category: 'Angka', visual_hint: '٣' },
  { id: 'lx_arbaah', ar_vocalized: 'أَرْبَعَة', ar_plain: 'أربعة', translit: 'arbaʿah', gloss_id: 'empat (4)', owner_island: 'MFR', level: 0, skill_id: 'MFR-L0-01', pos: 'isim', category: 'Angka', visual_hint: '٤' },
  { id: 'lx_khamsah', ar_vocalized: 'خَمْسَة', ar_plain: 'خمسة', translit: 'khamsah', gloss_id: 'lima (5)', owner_island: 'MFR', level: 0, skill_id: 'MFR-L0-01', pos: 'isim', category: 'Angka', visual_hint: '٥' },
  { id: 'lx_sittah', ar_vocalized: 'سِتَّة', ar_plain: 'ستة', translit: 'sittah', gloss_id: 'enam (6)', owner_island: 'MFR', level: 0, skill_id: 'MFR-L0-01', pos: 'isim', category: 'Angka', visual_hint: '٦' },
  { id: 'lx_sabah', ar_vocalized: 'سَبْعَة', ar_plain: 'سبعة', translit: 'sabʿah', gloss_id: 'tujuh (7)', owner_island: 'MFR', level: 0, skill_id: 'MFR-L0-01', pos: 'isim', category: 'Angka', visual_hint: '٧' },
  { id: 'lx_thamaniyah', ar_vocalized: 'ثَمَانِيَة', ar_plain: 'ثمانية', translit: 'thamāniyah', gloss_id: 'delapan (8)', owner_island: 'MFR', level: 0, skill_id: 'MFR-L0-01', pos: 'isim', category: 'Angka', visual_hint: '٨' },
  { id: 'lx_tisah', ar_vocalized: 'تِسْعَة', ar_plain: 'تسعة', translit: 'tisʿah', gloss_id: 'sembilan (9)', owner_island: 'MFR', level: 0, skill_id: 'MFR-L0-01', pos: 'isim', category: 'Angka', visual_hint: '٩' },
  { id: 'lx_asyarah', ar_vocalized: 'عَشَرَة', ar_plain: 'عشرة', translit: 'ʿasharah', gloss_id: 'sepuluh (10)', owner_island: 'MFR', level: 0, skill_id: 'MFR-L0-01', pos: 'isim', category: 'Angka', visual_hint: '١٠' },

  // Warna (MFR-L0-02)
  { id: 'lx_ahmar', ar_vocalized: 'أَحْمَر', ar_plain: 'أحمر', translit: 'aḥmar', gloss_id: 'merah', owner_island: 'MFR', level: 0, skill_id: 'MFR-L0-02', pos: 'isim', category: 'Warna', visual_hint: '🔴' },
  { id: 'lx_azraq', ar_vocalized: 'أَزْرَق', ar_plain: 'أزرق', translit: 'azraq', gloss_id: 'biru', owner_island: 'MFR', level: 0, skill_id: 'MFR-L0-02', pos: 'isim', category: 'Warna', visual_hint: '🔵' },
  { id: 'lx_akhdhar', ar_vocalized: 'أَخْضَر', ar_plain: 'أخضر', translit: 'akhḍar', gloss_id: 'hijau', owner_island: 'MFR', level: 0, skill_id: 'MFR-L0-02', pos: 'isim', category: 'Warna', visual_hint: '🟢' },
  { id: 'lx_abyadh', ar_vocalized: 'أَبْيَض', ar_plain: 'أبيض', translit: 'abyaḍ', gloss_id: 'putih', owner_island: 'MFR', level: 0, skill_id: 'MFR-L0-02', pos: 'isim', category: 'Warna', visual_hint: '⚪' },
  { id: 'lx_aswad', ar_vocalized: 'أَسْوَد', ar_plain: 'أسود', translit: 'aswad', gloss_id: 'hitam', owner_island: 'MFR', level: 0, skill_id: 'MFR-L0-02', pos: 'isim', category: 'Warna', visual_hint: '⚫' },
  { id: 'lx_ashfar', ar_vocalized: 'أَصْفَر', ar_plain: 'أصفر', translit: 'aṣfar', gloss_id: 'kuning', owner_island: 'MFR', level: 0, skill_id: 'MFR-L0-02', pos: 'isim', category: 'Warna', visual_hint: '🟡' },

  // Keluarga Inti (MFR-L0-03)
  { id: 'lx_ab', ar_vocalized: 'أَب', ar_plain: 'أب', translit: 'ab', gloss_id: 'ayah', owner_island: 'MFR', level: 0, skill_id: 'MFR-L0-03', pos: 'isim', category: 'Keluarga', visual_hint: '👨' },
  { id: 'lx_umm', ar_vocalized: 'أُمّ', ar_plain: 'أم', translit: 'umm', gloss_id: 'ibu', owner_island: 'MFR', level: 0, skill_id: 'MFR-L0-03', pos: 'isim', category: 'Keluarga', visual_hint: '👩' },
  { id: 'lx_akh', ar_vocalized: 'أَخ', ar_plain: 'أخ', translit: 'akh', gloss_id: 'saudara laki-laki', owner_island: 'MFR', level: 0, skill_id: 'MFR-L0-03', pos: 'isim', category: 'Keluarga', visual_hint: '👦' },
  { id: 'lx_ukht', ar_vocalized: 'أُخْت', ar_plain: 'أخت', translit: 'ukht', gloss_id: 'saudari perempuan', owner_island: 'MFR', level: 0, skill_id: 'MFR-L0-03', pos: 'isim', category: 'Keluarga', visual_hint: '👧' },

  // Benda Sekitar (MFR-L0-04)
  { id: 'lx_kitab', ar_vocalized: 'كِتَاب', ar_plain: 'كتاب', translit: 'kitāb', gloss_id: 'buku', owner_island: 'MFR', level: 0, skill_id: 'MFR-L0-04', pos: 'isim', category: 'Benda Sekitar', visual_hint: '📖' },
  { id: 'lx_qalam', ar_vocalized: 'قَلَم', ar_plain: 'قلم', translit: 'qalam', gloss_id: 'pena / pulpen', owner_island: 'MFR', level: 0, skill_id: 'MFR-L0-04', pos: 'isim', category: 'Benda Sekitar', visual_hint: '🖊️' },
  { id: 'lx_bab', ar_vocalized: 'بَاب', ar_plain: 'باب', translit: 'bāb', gloss_id: 'pintu', owner_island: 'MFR', level: 0, skill_id: 'MFR-L0-04', pos: 'isim', category: 'Benda Sekitar', visual_hint: '🚪' },
  { id: 'lx_kursiy', ar_vocalized: 'كُرْسِيّ', ar_plain: 'كرسي', translit: 'kursiyy', gloss_id: 'kursi', owner_island: 'MFR', level: 0, skill_id: 'MFR-L0-04', pos: 'isim', category: 'Benda Sekitar', visual_hint: '🪑' },
  { id: 'lx_thawilah', ar_vocalized: 'طَاوِلَة', ar_plain: 'طاولة', translit: 'ṭāwilah', gloss_id: 'meja', owner_island: 'MFR', level: 0, skill_id: 'MFR-L0-04', pos: 'isim', category: 'Benda Sekitar', visual_hint: '🪵' },

  // Makanan & Minuman (MFR-L1-01)
  { id: 'lx_khubz', ar_vocalized: 'خُبْز', ar_plain: 'خبز', translit: 'khubz', gloss_id: 'roti gandum', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-01', pos: 'isim', category: 'Makanan & Minuman', visual_hint: '🍞' },
  { id: 'lx_maa', ar_vocalized: 'مَاء', ar_plain: 'ماء', translit: 'māʾ', gloss_id: 'air tawar segar', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-01', pos: 'isim', category: 'Makanan & Minuman', visual_hint: '💧' },
  { id: 'lx_halib', ar_vocalized: 'حَلِيب', ar_plain: 'حليب', translit: 'ḥalīb', gloss_id: 'susu murni', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-01', pos: 'isim', category: 'Makanan & Minuman', visual_hint: '🥛' },
  { id: 'lx_aruzz', ar_vocalized: 'أَرُزّ', ar_plain: 'أرز', translit: 'aruzz', gloss_id: 'nasi / beras', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-01', pos: 'isim', category: 'Makanan & Minuman', visual_hint: '🍚' },
  { id: 'lx_tuffahah', ar_vocalized: 'تُفَّاحَة', ar_plain: 'تفاحة', translit: 'tuffāḥah', gloss_id: 'buah apel', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-01', pos: 'isim', category: 'Makanan & Minuman', visual_hint: '🍎' },
  { id: 'lx_tamr', ar_vocalized: 'تَمْر', ar_plain: 'تمر', translit: 'tamr', gloss_id: 'buah kurma manis', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-01', pos: 'isim', category: 'Makanan & Minuman', visual_hint: '🌴' },
  { id: 'lx_shay', ar_vocalized: 'شَاي', ar_plain: 'شاي', translit: 'shāy', gloss_id: 'teh hangat', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-01', pos: 'isim', category: 'Makanan & Minuman', visual_hint: '🫖' },
  { id: 'lx_qahwah', ar_vocalized: 'قَهْوَة', ar_plain: 'قهوة', translit: 'qahwah', gloss_id: 'kopi aromatik', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-01', pos: 'isim', category: 'Makanan & Minuman', visual_hint: '☕' },

  // Hewan (MFR-L1-02)
  { id: 'lx_qittah', ar_vocalized: 'قِطَّة', ar_plain: 'قطة', translit: 'qiṭṭah', gloss_id: 'kucing piaraan', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-02', pos: 'isim', category: 'Hewan', visual_hint: '🐱' },
  { id: 'lx_samakah', ar_vocalized: 'سَمَكَة', ar_plain: 'سمكة', translit: 'samakah', gloss_id: 'ikan sungai/laut', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-02', pos: 'isim', category: 'Hewan', visual_hint: '🐟' },
  { id: 'lx_thair', ar_vocalized: 'طَائِر', ar_plain: 'طائر', translit: 'ṭāʾir', gloss_id: 'burung berkicau', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-02', pos: 'isim', category: 'Hewan', visual_hint: '🐦' },
  { id: 'lx_hishan', ar_vocalized: 'حِصَان', ar_plain: 'حصان', translit: 'ḥiṣān', gloss_id: 'kuda jantan tangguh', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-02', pos: 'isim', category: 'Hewan', visual_hint: '🐴' },
  { id: 'lx_jamal', ar_vocalized: 'جَمَل', ar_plain: 'جمل', translit: 'jamal', gloss_id: 'unta padang pasir', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-02', pos: 'isim', category: 'Hewan', visual_hint: '🐪' },
  { id: 'lx_asad', ar_vocalized: 'أَسَد', ar_plain: 'أسد', translit: 'asad', gloss_id: 'singa raja rimba', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-02', pos: 'isim', category: 'Hewan', visual_hint: '🦁' },

  // Anggota Tubuh (MFR-L1-03)
  { id: 'lx_raas', ar_vocalized: 'رَأْس', ar_plain: 'رأس', translit: 'raʾs', gloss_id: 'kepala', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-03', pos: 'isim', category: 'Anggota Tubuh', visual_hint: '🗣️' },
  { id: 'lx_yad', ar_vocalized: 'يَد', ar_plain: 'يد', translit: 'yad', gloss_id: 'tangan', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-03', pos: 'isim', category: 'Anggota Tubuh', visual_hint: '✋' },
  { id: 'lx_ayn_body', ar_vocalized: 'عَيْن', ar_plain: 'عين', translit: 'ʿayn', gloss_id: 'mata penglihatan', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-03', pos: 'isim', category: 'Anggota Tubuh', visual_hint: '👁️' },
  { id: 'lx_rijl', ar_vocalized: 'رِجْل', ar_plain: 'رجل', translit: 'rijl', gloss_id: 'kaki langkah', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-03', pos: 'isim', category: 'Anggota Tubuh', visual_hint: '🦶' },
  { id: 'lx_anf', ar_vocalized: 'أَنْف', ar_plain: 'أنف', translit: 'anf', gloss_id: 'hidung', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-03', pos: 'isim', category: 'Anggota Tubuh', visual_hint: '👃' },
  { id: 'lx_fam', ar_vocalized: 'فَم', ar_plain: 'فم', translit: 'fam', gloss_id: 'mulut', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-03', pos: 'isim', category: 'Anggota Tubuh', visual_hint: '👄' },
  { id: 'lx_udhun', ar_vocalized: 'أُذُن', ar_plain: 'أذن', translit: 'udhun', gloss_id: 'telinga pendengaran', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-03', pos: 'isim', category: 'Anggota Tubuh', visual_hint: '👂' },

  // Pakaian & Perlengkapan (MFR-L1-04)
  { id: 'lx_qamis', ar_vocalized: 'قَمِيص', ar_plain: 'قميص', translit: 'qamīṣ', gloss_id: 'kemeja baju', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-04', pos: 'isim', category: 'Pakaian', visual_hint: '👔' },
  { id: 'lx_thawb', ar_vocalized: 'ثَوْب', ar_plain: 'ثوب', translit: 'thawb', gloss_id: 'jubah gamis', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-04', pos: 'isim', category: 'Pakaian', visual_hint: '👘' },
  { id: 'lx_hidha', ar_vocalized: 'حِذَاء', ar_plain: 'حذاء', translit: 'ḥidhāʾ', gloss_id: 'sepatu alas kaki', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-04', pos: 'isim', category: 'Pakaian', visual_hint: '👞' },
  { id: 'lx_qalansuwah', ar_vocalized: 'قَلَنْسُوَة', ar_plain: 'قلنسوة', translit: 'qalansuwah', gloss_id: 'peci / songkok / topi', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-04', pos: 'isim', category: 'Pakaian', visual_hint: '🧢' },

  // Waktu & Hari (MFR-L1-05)
  { id: 'lx_yawm_ahad', ar_vocalized: 'يَوْمُ الأَحَد', ar_plain: 'يوم الأحد', translit: 'yawm al-aḥad', gloss_id: 'hari Ahad (Minggu)', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-05', pos: 'phrase', category: 'Waktu & Hari', visual_hint: '📅' },
  { id: 'lx_yawm_jumuah', ar_vocalized: 'يَوْمُ الجُمُعَة', ar_plain: 'يوم الجمعة', translit: 'yawm al-jumuʿah', gloss_id: 'hari Jumat berkah', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-05', pos: 'phrase', category: 'Waktu & Hari', visual_hint: '🕌' },
  { id: 'lx_layl', ar_vocalized: 'لَيْل', ar_plain: 'ليل', translit: 'layl', gloss_id: 'malam hari', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-05', pos: 'isim', category: 'Waktu & Hari', visual_hint: '🌃' },
  { id: 'lx_nahar', ar_vocalized: 'نَهَار', ar_plain: 'نهار', translit: 'nahār', gloss_id: 'siang hari benderang', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-05', pos: 'isim', category: 'Waktu & Hari', visual_hint: '☀️' },

  // Rumah & Perabotan (MFR-L2-01)
  { id: 'lx_ghurfah', ar_vocalized: 'غُرْفَة', ar_plain: 'غرفة', translit: 'ghurfah', gloss_id: 'kamar ruangan', owner_island: 'MFR', level: 2, skill_id: 'MFR-L2-01', pos: 'isim', category: 'Rumah & Perabot', visual_hint: '🚪' },
  { id: 'lx_sarir', ar_vocalized: 'سَرِير', ar_plain: 'سرير', translit: 'sarīr', gloss_id: 'ranjang tempat tidur', owner_island: 'MFR', level: 2, skill_id: 'MFR-L2-01', pos: 'isim', category: 'Rumah & Perabot', visual_hint: '🛏️' },
  { id: 'lx_matbakh', ar_vocalized: 'مَطْبَخ', ar_plain: 'مطبخ', translit: 'maṭbakh', gloss_id: 'dapur memasak', owner_island: 'MFR', level: 2, skill_id: 'MFR-L2-01', pos: 'isim', category: 'Rumah & Perabot', visual_hint: '🍳' },
  { id: 'lx_nafidha', ar_vocalized: 'نَافِذَة', ar_plain: 'نافذة', translit: 'nāfidhah', gloss_id: 'jendela kaca', owner_island: 'MFR', level: 2, skill_id: 'MFR-L2-01', pos: 'isim', category: 'Rumah & Perabot', visual_hint: '🪟' },

  // Tempat Umum & Kota (MFR-L2-02)
  { id: 'lx_bayt', ar_vocalized: 'بَيْت', ar_plain: 'بيت', translit: 'bayt', gloss_id: 'rumah tinggal', owner_island: 'MFR', level: 2, skill_id: 'MFR-L2-02', pos: 'isim', category: 'Tempat & Kota', visual_hint: '🏠' },
  { id: 'lx_masjid', ar_vocalized: 'مَسْجِد', ar_plain: 'مسجد', translit: 'masjid', gloss_id: 'masjid tempat sujud', owner_island: 'MFR', level: 2, skill_id: 'MFR-L2-02', pos: 'isim', category: 'Tempat & Kota', visual_hint: '🕌' },
  { id: 'lx_suq', ar_vocalized: 'سُوق', ar_plain: 'سوق', translit: 'sūq', gloss_id: 'pasar perniagaan', owner_island: 'MFR', level: 2, skill_id: 'MFR-L2-02', pos: 'isim', category: 'Tempat & Kota', visual_hint: '🏬' },
  { id: 'lx_madrasah', ar_vocalized: 'مَدْرَسَة', ar_plain: 'مدرسة', translit: 'madrasah', gloss_id: 'sekolah tempat belajar', owner_island: 'MFR', level: 2, skill_id: 'MFR-L2-02', pos: 'isim', category: 'Tempat & Kota', visual_hint: '🏫' },
  { id: 'lx_mustasyfa', ar_vocalized: 'مُسْتَشْفَى', ar_plain: 'مستشفى', translit: 'mustashfā', gloss_id: 'rumah sakit', owner_island: 'MFR', level: 2, skill_id: 'MFR-L2-02', pos: 'isim', category: 'Tempat & Kota', visual_hint: '🏥' },
  { id: 'lx_mathar', ar_vocalized: 'مَطَار', ar_plain: 'مطار', translit: 'maṭār', gloss_id: 'bandar udara / bandara', owner_island: 'MFR', level: 2, skill_id: 'MFR-L2-02', pos: 'isim', category: 'Tempat & Kota', visual_hint: '🛫' },
  { id: 'lx_hadiqah', ar_vocalized: 'حَدِيقَة', ar_plain: 'حديقة', translit: 'ḥadīqah', gloss_id: 'taman bunga asri', owner_island: 'MFR', level: 2, skill_id: 'MFR-L2-02', pos: 'isim', category: 'Tempat & Kota', visual_hint: '🌷' },

  // Profesi & Cita-Cita (MFR-L2-03)
  { id: 'lx_thabib', ar_vocalized: 'طَبِيب', ar_plain: 'طبيب', translit: 'ṭabīb', gloss_id: 'dokter penyembuh', owner_island: 'MFR', level: 2, skill_id: 'MFR-L2-03', pos: 'isim', category: 'Profesi', visual_hint: '🩺' },
  { id: 'lx_mudarris', ar_vocalized: 'مُدَرِّس', ar_plain: 'مدرس', translit: 'mudarris', gloss_id: 'guru pengajar', owner_island: 'MFR', level: 2, skill_id: 'MFR-L2-03', pos: 'isim', category: 'Profesi', visual_hint: '👨‍🏫' },
  { id: 'lx_muhandis', ar_vocalized: 'مُهَنْدِس', ar_plain: 'مهندس', translit: 'muhandis', gloss_id: 'insinyur perancang', owner_island: 'MFR', level: 2, skill_id: 'MFR-L2-03', pos: 'isim', category: 'Profesi', visual_hint: '👷' },
  { id: 'lx_tajir', ar_vocalized: 'تَاجِر', ar_plain: 'تاجر', translit: 'tājir', gloss_id: 'saudagar pedagang', owner_island: 'MFR', level: 2, skill_id: 'MFR-L2-03', pos: 'isim', category: 'Profesi', visual_hint: '💼' },

  // Transportasi & Kendaraan (MFR-L2-04)
  { id: 'lx_sayyarah', ar_vocalized: 'سَيَّارَة', ar_plain: 'سيارة', translit: 'sayyārah', gloss_id: 'mobil pribadi', owner_island: 'MFR', level: 2, skill_id: 'MFR-L2-04', pos: 'isim', category: 'Transportasi', visual_hint: '🚗' },
  { id: 'lx_hafilah', ar_vocalized: 'حَافِلَة', ar_plain: 'حافلة', translit: 'ḥāfilah', gloss_id: 'bus penumpang', owner_island: 'MFR', level: 2, skill_id: 'MFR-L2-04', pos: 'isim', category: 'Transportasi', visual_hint: '🚌' },
  { id: 'lx_qithar', ar_vocalized: 'قِطَار', ar_plain: 'قطار', translit: 'qiṭār', gloss_id: 'kereta api jalur rel', owner_island: 'MFR', level: 2, skill_id: 'MFR-L2-04', pos: 'isim', category: 'Transportasi', visual_hint: '🚆' },
  { id: 'lx_thairah', ar_vocalized: 'طَائِرَة', ar_plain: 'طائرة', translit: 'ṭāʾirah', gloss_id: 'pesawat terbang', owner_island: 'MFR', level: 2, skill_id: 'MFR-L2-04', pos: 'isim', category: 'Transportasi', visual_hint: '✈️' },
  { id: 'lx_safinah', ar_vocalized: 'سَفِينَة', ar_plain: 'سفينة', translit: 'safīnah', gloss_id: 'kapal laut perahu samudra', owner_island: 'MFR', level: 2, skill_id: 'MFR-L2-04', pos: 'isim', category: 'Transportasi', visual_hint: '🚢' },

  // Kata Kerja Rutinitas Harian (MFR-L2-05)
  { id: 'lx_qaraa', ar_vocalized: 'قَرَأَ', ar_plain: 'قرأ', translit: 'qaraʾa', gloss_id: 'dia membaca buku', owner_island: 'MFR', level: 2, skill_id: 'MFR-L2-05', pos: 'fiil', category: 'Kata Kerja', visual_hint: '📖' },
  { id: 'lx_kataba', ar_vocalized: 'كَتَبَ', ar_plain: 'كتب', translit: 'kataba', gloss_id: 'dia menulis pelajaran', owner_island: 'MFR', level: 2, skill_id: 'MFR-L2-05', pos: 'fiil', category: 'Kata Kerja', visual_hint: '✍️' },
  { id: 'lx_dzahaba', ar_vocalized: 'ذَهَبَ', ar_plain: 'ذهب', translit: 'dhahaba', gloss_id: 'dia pergi berjalan', owner_island: 'MFR', level: 2, skill_id: 'MFR-L2-05', pos: 'fiil', category: 'Kata Kerja', visual_hint: '🚶' },
  { id: 'lx_akalla', ar_vocalized: 'أَكَلَ', ar_plain: 'أكل', translit: 'akala', gloss_id: 'dia makan santapan', owner_island: 'MFR', level: 2, skill_id: 'MFR-L2-05', pos: 'fiil', category: 'Kata Kerja', visual_hint: '🍽️' },
  { id: 'lx_syariba', ar_vocalized: 'شَرِبَ', ar_plain: 'شرب', translit: 'shariba', gloss_id: 'dia meminum air', owner_island: 'MFR', level: 2, skill_id: 'MFR-L2-05', pos: 'fiil', category: 'Kata Kerja', visual_hint: '🥤' },
  { id: 'lx_naama', ar_vocalized: 'نَامَ', ar_plain: 'نام', translit: 'nāma', gloss_id: 'dia tidur lelap', owner_island: 'MFR', level: 2, skill_id: 'MFR-L2-05', pos: 'fiil', category: 'Kata Kerja', visual_hint: '😴' },

  // Sifat Fisik & Karakter (MFR-L3-01)
  { id: 'lx_thawil', ar_vocalized: 'طَوِيل', ar_plain: 'طويل', translit: 'ṭawīl', gloss_id: 'tinggi / panjang', owner_island: 'MFR', level: 3, skill_id: 'MFR-L3-01', pos: 'isim', category: 'Sifat & Karakter', visual_hint: '🦒' },
  { id: 'lx_qashir', ar_vocalized: 'قَصِير', ar_plain: 'قصير', translit: 'qaṣīr', gloss_id: 'pendek', owner_island: 'MFR', level: 3, skill_id: 'MFR-L3-01', pos: 'isim', category: 'Sifat & Karakter', visual_hint: '🐢' },
  { id: 'lx_jamil', ar_vocalized: 'جَمِيل', ar_plain: 'جميل', translit: 'jamīl', gloss_id: 'indah / elok rupawan', owner_island: 'MFR', level: 3, skill_id: 'MFR-L3-01', pos: 'isim', category: 'Sifat & Karakter', visual_hint: '🌸' },
  { id: 'lx_karim', ar_vocalized: 'كَرِيم', ar_plain: 'كريم', translit: 'karīm', gloss_id: 'mulia dermawan', owner_island: 'MFR', level: 3, skill_id: 'MFR-L3-01', pos: 'isim', category: 'Sifat & Karakter', visual_hint: '🎁' },

  // Cuaca & Musim (MFR-L3-02)
  { id: 'lx_harr', ar_vocalized: 'حَارّ', ar_plain: 'حار', translit: 'ḥārr', gloss_id: 'panas terik', owner_island: 'MFR', level: 3, skill_id: 'MFR-L3-02', pos: 'isim', category: 'Cuaca & Musim', visual_hint: '🔥' },
  { id: 'lx_barid', ar_vocalized: 'بَارِد', ar_plain: 'بارد', translit: 'bārid', gloss_id: 'dingin sejuk', owner_island: 'MFR', level: 3, skill_id: 'MFR-L3-02', pos: 'isim', category: 'Cuaca & Musim', visual_hint: '❄️' },
  { id: 'lx_mathar_rain', ar_vocalized: 'مَطَر', ar_plain: 'مطر', translit: 'maṭar', gloss_id: 'hujan turun', owner_island: 'MFR', level: 3, skill_id: 'MFR-L3-02', pos: 'isim', category: 'Cuaca & Musim', visual_hint: '🌧️' },

  // Jamak Taksir Populer (MFR-L3-03)
  { id: 'lx_kutub', ar_vocalized: 'كُتُب', ar_plain: 'كتب', translit: 'kutub', gloss_id: 'buku-buku (jamak taksir dari kitāb)', owner_island: 'MFR', level: 3, skill_id: 'MFR-L3-03', pos: 'isim', category: 'Jamak Taksir', visual_hint: '📚' },
  { id: 'lx_aqlam', ar_vocalized: 'أَقْلَام', ar_plain: 'أقلام', translit: 'aqlām', gloss_id: 'pena-pena (jamak taksir dari qalam)', owner_island: 'MFR', level: 3, skill_id: 'MFR-L3-03', pos: 'isim', category: 'Jamak Taksir', visual_hint: '🖊️' },
  { id: 'lx_awlad', ar_vocalized: 'أَوْلَاد', ar_plain: 'أولاد', translit: 'awlād', gloss_id: 'anak-anak (jamak taksir dari walad)', owner_island: 'MFR', level: 3, skill_id: 'MFR-L3-03', pos: 'isim', category: 'Jamak Taksir', visual_hint: '👦' },

  // Istilah Sains & Teknologi (MFR-L4-01)
  { id: 'lx_hasub', ar_vocalized: 'حَاسُوب', ar_plain: 'حاسوب', translit: 'ḥāsūb', gloss_id: 'komputer digital', owner_island: 'MFR', level: 4, skill_id: 'MFR-L4-01', pos: 'isim', category: 'Sains & Teknologi', visual_hint: '💻' },
  { id: 'lx_hatif', ar_vocalized: 'هَاتِف', ar_plain: 'هاتف', translit: 'hātif', gloss_id: 'telepon genggam pintar', owner_island: 'MFR', level: 4, skill_id: 'MFR-L4-01', pos: 'isim', category: 'Sains & Teknologi', visual_hint: '📱' },
  { id: 'lx_syabakah', ar_vocalized: 'شَبَكَة', ar_plain: 'شبكة', translit: 'shabakah', gloss_id: 'jaringan internet / web', owner_island: 'MFR', level: 4, skill_id: 'MFR-L4-01', pos: 'isim', category: 'Sains & Teknologi', visual_hint: '🌐' },

  // Nuansa Makna & Taraduf (MFR-L5-01)
  { id: 'lx_trd_farah_surur', ar_vocalized: 'فَرَح / سُرُور', ar_plain: 'فرح / سرور', translit: 'faraḥ vs surūr', gloss_id: 'kegembiraan spontan lahiriah vs kegembiraan batin mendalam', owner_island: 'MFR', level: 5, skill_id: 'MFR-L5-01', pos: 'phrase', category: 'Nuansa Bahasa', visual_hint: '😊💖' },
  { id: 'lx_trd_matar_ghayth', ar_vocalized: 'مَطَر / غَيْث', ar_plain: 'مطر / غيث', translit: 'maṭar vs ghayth', gloss_id: 'hujan biasa/azab vs hujan rahmat penolong kekeringan', owner_island: 'MFR', level: 5, skill_id: 'MFR-L5-01', pos: 'phrase', category: 'Nuansa Bahasa', visual_hint: '🌧️🌱' },

  // --- HWR (Kampung Hiwar) ---
  { id: 'lx_salam', ar_vocalized: 'السَّلَامُ عَلَيْكُمْ', ar_plain: 'السلام عليكم', translit: 'as-salāmu ʿalaykum', gloss_id: 'semoga keselamatan atas kalian (salam)', owner_island: 'HWR', level: 0, skill_id: 'HWR-L0-01', pos: 'phrase', category: 'Salam & Sapaan', visual_hint: '🤝' },
  { id: 'lx_wa_salam', ar_vocalized: 'وَعَلَيْكُمُ السَّلَام', ar_plain: 'وعليكم السلام', translit: 'wa ʿalaykumu s-salām', gloss_id: 'dan atas kalian keselamatan (jawaban)', owner_island: 'HWR', level: 0, skill_id: 'HWR-L0-01', pos: 'phrase', category: 'Salam & Sapaan', visual_hint: '✨' },
  { id: 'lx_shabah_khayr', ar_vocalized: 'صَبَاحَ الخَيْر', ar_plain: 'صباح الخير', translit: 'ṣabāḥ al-khayr', gloss_id: 'selamat pagi', owner_island: 'HWR', level: 0, skill_id: 'HWR-L0-01', pos: 'phrase', category: 'Salam & Sapaan', visual_hint: '🌅' },
  { id: 'lx_shabah_nuur', ar_vocalized: 'صَبَاحَ النُّور', ar_plain: 'صباح النور', translit: 'ṣabāḥ an-nūr', gloss_id: 'selamat pagi penuh cahaya (jawaban)', owner_island: 'HWR', level: 0, skill_id: 'HWR-L0-01', pos: 'phrase', category: 'Salam & Sapaan', visual_hint: '☀️' },
  { id: 'lx_masa_khayr', ar_vocalized: 'مَسَاءَ الخَيْر', ar_plain: 'مساء الخير', translit: 'masāʾ al-khayr', gloss_id: 'selamat sore / malam', owner_island: 'HWR', level: 0, skill_id: 'HWR-L0-01', pos: 'phrase', category: 'Salam & Sapaan', visual_hint: '🌙' },
  { id: 'lx_ma_ismuka', ar_vocalized: 'مَا اسْمُكَ؟', ar_plain: 'ما اسمك؟', translit: 'mā ismuka?', gloss_id: 'siapa namamu? (ke laki-laki)', owner_island: 'HWR', level: 0, skill_id: 'HWR-L0-02', pos: 'phrase', category: 'Perkenalan', visual_hint: '👤' },
  { id: 'lx_ma_ismuki', ar_vocalized: 'مَا اسْمُكِ؟', ar_plain: 'ما اسمكِ؟', translit: 'mā ismuki?', gloss_id: 'siapa namamu? (ke perempuan)', owner_island: 'HWR', level: 0, skill_id: 'HWR-L0-02', pos: 'phrase', category: 'Perkenalan', visual_hint: '🧕' },
  { id: 'lx_ismi', ar_vocalized: 'اِسْمِي...', ar_plain: 'اسمي', translit: 'ismī...', gloss_id: 'namaku adalah...', owner_island: 'HWR', level: 0, skill_id: 'HWR-L0-02', pos: 'phrase', category: 'Perkenalan', visual_hint: '🏷️' },
  { id: 'lx_kayfa_haluk', ar_vocalized: 'كَيْفَ حَالُكَ؟', ar_plain: 'كيف حالك؟', translit: 'kayfa ḥāluka?', gloss_id: 'bagaimana kabarmu?', owner_island: 'HWR', level: 1, skill_id: 'HWR-L1-01', pos: 'phrase', category: 'Kabar', visual_hint: '❓' },
  { id: 'lx_alhamdulillah', ar_vocalized: 'الحَمْدُ لِلَّهِ', ar_plain: 'الحمد لله', translit: 'al-ḥamdu lillāh', gloss_id: 'segala puji bagi Allah (kabar baik)', owner_island: 'HWR', level: 1, skill_id: 'HWR-L1-01', pos: 'phrase', category: 'Kabar', visual_hint: '🤲' },
  { id: 'lx_syukran', ar_vocalized: 'شُكْرًا', ar_plain: 'شكرا', translit: 'shukran', gloss_id: 'terima kasih', owner_island: 'HWR', level: 1, skill_id: 'HWR-L1-02', pos: 'phrase', category: 'Kesantunan', visual_hint: '🙏' },
  { id: 'lx_afwan', ar_vocalized: 'عَفْوًا', ar_plain: 'عفوا', translit: 'ʿafwan', gloss_id: 'sama-sama / maaf', owner_island: 'HWR', level: 1, skill_id: 'HWR-L1-02', pos: 'phrase', category: 'Kesantunan', visual_hint: '🤝' },
  { id: 'lx_min_fadhlika', ar_vocalized: 'مِنْ فَضْلِكَ', ar_plain: 'من فضلك', translit: 'min faḍlika', gloss_id: 'tolong / silakan', owner_island: 'HWR', level: 1, skill_id: 'HWR-L1-02', pos: 'phrase', category: 'Kesantunan', visual_hint: '💐' },
  { id: 'lx_min_ayna', ar_vocalized: 'مِنْ أَيْنَ أَنْتَ؟', ar_plain: 'من أين أنت؟', translit: 'min ayna anta?', gloss_id: 'dari mana asalmu?', owner_island: 'HWR', level: 1, skill_id: 'HWR-L1-02', pos: 'phrase', category: 'Perkenalan', visual_hint: '🌏' },
  { id: 'lx_ana_min', ar_vocalized: 'أَنَا مِنْ إِنْدُونِيسِيَا', ar_plain: 'أنا من إندونيسيا', translit: 'anā min Indūnīsiyā', gloss_id: 'saya dari Indonesia', owner_island: 'HWR', level: 1, skill_id: 'HWR-L1-02', pos: 'phrase', category: 'Perkenalan', visual_hint: '🇮🇩' },
  { id: 'lx_bikam_hadha', ar_vocalized: 'بِكَمْ هٰذَا؟', ar_plain: 'بكم هذا؟', translit: 'bikam hādhā?', gloss_id: 'berapa harga barang ini?', owner_island: 'HWR', level: 2, skill_id: 'HWR-L2-01', pos: 'phrase', category: 'Belanja', visual_hint: '💰' },
  { id: 'lx_ayna_almasjid', ar_vocalized: 'أَيْنَ المَسْجِدُ؟', ar_plain: 'أين المسجد؟', translit: 'ayna l-masjid?', gloss_id: 'di mana masjid?', owner_island: 'HWR', level: 2, skill_id: 'HWR-L2-03', pos: 'phrase', category: 'Arah', visual_hint: '🧭' },
  { id: 'lx_yamiin', ar_vocalized: 'إِلَى اليَمِين', ar_plain: 'إلى اليمين', translit: 'ilā l-yamīn', gloss_id: 'ke arah kanan', owner_island: 'HWR', level: 2, skill_id: 'HWR-L2-03', pos: 'phrase', category: 'Arah', visual_hint: '➡️' },
  { id: 'lx_yasaar', ar_vocalized: 'إِلَى اليَسَار', ar_plain: 'إلى اليسار', translit: 'ilā l-yasār', gloss_id: 'ke arah kiri', owner_island: 'HWR', level: 2, skill_id: 'HWR-L2-03', pos: 'phrase', category: 'Arah', visual_hint: '⬅️' },

  // --- QWD (Gunung Qawa'id) ---
  { id: 'lx_hadha', ar_vocalized: 'هٰذَا', ar_plain: 'هذا', translit: 'hādhā', gloss_id: 'ini (maskulin / mudzakkar)', owner_island: 'QWD', level: 1, skill_id: 'QWD-L1-01', pos: 'isim', category: 'Isim Isyarah', visual_hint: '👉' },
  { id: 'lx_hadhihi', ar_vocalized: 'هٰذِهِ', ar_plain: 'هذه', translit: 'hādhihi', gloss_id: 'ini (feminin / muannats)', owner_island: 'QWD', level: 1, skill_id: 'QWD-L1-01', pos: 'isim', category: 'Isim Isyarah', visual_hint: '👉' },
  { id: 'lx_dhalika', ar_vocalized: 'ذٰلِكَ', ar_plain: 'ذلك', translit: 'dhālika', gloss_id: 'itu (maskulin)', owner_island: 'QWD', level: 2, skill_id: 'QWD-L2-05', pos: 'isim', category: 'Isim Isyarah', visual_hint: '👉' },
  { id: 'lx_tilka', ar_vocalized: 'تِلْكَ', ar_plain: 'تلك', translit: 'tilka', gloss_id: 'itu (feminin)', owner_island: 'QWD', level: 2, skill_id: 'QWD-L2-05', pos: 'isim', category: 'Isim Isyarah', visual_hint: '👉' },
  { id: 'lx_kabir', ar_vocalized: 'كَبِير', ar_plain: 'كبير', translit: 'kabīr', gloss_id: 'besar (mudzakkar)', owner_island: 'QWD', level: 1, skill_id: 'QWD-L1-02', pos: 'isim', category: 'Kata Sifat', visual_hint: '🐘' },
  { id: 'lx_kabirah', ar_vocalized: 'كَبِيرَة', ar_plain: 'كبيرة', translit: 'kabīrah', gloss_id: 'besar (muannats)', owner_island: 'QWD', level: 1, skill_id: 'QWD-L1-02', pos: 'isim', category: 'Kata Sifat', visual_hint: '🐘' },
  { id: 'lx_shaghir', ar_vocalized: 'صَغِير', ar_plain: 'صغير', translit: 'ṣaghīr', gloss_id: 'kecil (mudzakkar)', owner_island: 'QWD', level: 1, skill_id: 'QWD-L1-02', pos: 'isim', category: 'Kata Sifat', visual_hint: '🐜' },
  { id: 'lx_shaghirah', ar_vocalized: 'صَغِيرَة', ar_plain: 'صغيرة', translit: 'ṣaghīrah', gloss_id: 'kecil (muannats)', owner_island: 'QWD', level: 1, skill_id: 'QWD-L1-02', pos: 'isim', category: 'Kata Sifat', visual_hint: '🐜' },
  { id: 'lx_jadid', ar_vocalized: 'جَدِيد', ar_plain: 'جديد', translit: 'jadīd', gloss_id: 'baru', owner_island: 'QWD', level: 1, skill_id: 'QWD-L1-02', pos: 'isim', category: 'Kata Sifat', visual_hint: '✨' },
  { id: 'lx_qadim', ar_vocalized: 'قَدِيم', ar_plain: 'قديم', translit: 'qadīm', gloss_id: 'lama / kuno', owner_island: 'QWD', level: 1, skill_id: 'QWD-L1-02', pos: 'isim', category: 'Kata Sifat', visual_hint: '📜' },
  { id: 'lx_jamiil', ar_vocalized: 'جَمِيل', ar_plain: 'جميل', translit: 'jamīl', gloss_id: 'indah / bagus (mudzakkar)', owner_island: 'QWD', level: 1, skill_id: 'QWD-L1-02', pos: 'isim', category: 'Kata Sifat', visual_hint: '🌸' },
  { id: 'lx_jamiilah', ar_vocalized: 'جَمِيلَة', ar_plain: 'جميلة', translit: 'jamīlah', gloss_id: 'indah / bagus (muannats)', owner_island: 'QWD', level: 1, skill_id: 'QWD-L1-02', pos: 'isim', category: 'Kata Sifat', visual_hint: '🌸' },
  { id: 'lx_nasyiith', ar_vocalized: 'نَشِيط', ar_plain: 'نشيط', translit: 'nasyīṭ', gloss_id: 'rajin / bersemangat', owner_island: 'QWD', level: 2, skill_id: 'QWD-L2-01', pos: 'isim', category: 'Kata Sifat', visual_hint: '🏃' },
  { id: 'lx_kaslan', ar_vocalized: 'كَسْلَان', ar_plain: 'كسلان', translit: 'kaslān', gloss_id: 'malas', owner_island: 'QWD', level: 2, skill_id: 'QWD-L2-01', pos: 'isim', category: 'Kata Sifat', visual_hint: '😴' },
  { id: 'lx_harf_fii', ar_vocalized: 'فِي', ar_plain: 'في', translit: 'fī', gloss_id: 'di / di dalam (harf jar)', owner_island: 'QWD', level: 2, skill_id: 'QWD-L2-02', pos: 'harf', category: 'Harf Jar', visual_hint: '📥' },
  { id: 'lx_harf_ala', ar_vocalized: 'عَلَى', ar_plain: 'على', translit: 'ʿalā', gloss_id: 'di atas (harf jar)', owner_island: 'QWD', level: 2, skill_id: 'QWD-L2-02', pos: 'harf', category: 'Harf Jar', visual_hint: '🔝' },
  { id: 'lx_harf_min', ar_vocalized: 'مِنْ', ar_plain: 'من', translit: 'min', gloss_id: 'dari (harf jar)', owner_island: 'QWD', level: 2, skill_id: 'QWD-L2-02', pos: 'harf', category: 'Harf Jar', visual_hint: '🛫' },
  { id: 'lx_harf_ila', ar_vocalized: 'إِلَى', ar_plain: 'إلى', translit: 'ilā', gloss_id: 'ke / menuju (harf jar)', owner_island: 'QWD', level: 2, skill_id: 'QWD-L2-02', pos: 'harf', category: 'Harf Jar', visual_hint: '🎯' },
  { id: 'lx_harf_bi', ar_vocalized: 'بِـ', ar_plain: 'بـ', translit: 'bi-', gloss_id: 'dengan / menggunakan (harf jar)', owner_island: 'QWD', level: 2, skill_id: 'QWD-L2-02', pos: 'harf', category: 'Harf Jar', visual_hint: '✏️' },
  { id: 'lx_harf_li', ar_vocalized: 'لِـ', ar_plain: 'لـ', translit: 'li-', gloss_id: 'milik / untuk (harf jar)', owner_island: 'QWD', level: 2, skill_id: 'QWD-L2-02', pos: 'harf', category: 'Harf Jar', visual_hint: '🔑' },
  { id: 'lx_dhomir_huwa', ar_vocalized: 'هُوَ', ar_plain: 'هو', translit: 'huwa', gloss_id: 'dia (laki-laki tunggal)', owner_island: 'QWD', level: 2, skill_id: 'QWD-L2-04', pos: 'isim', category: 'Dhomir Munfashil', visual_hint: '👨' },
  { id: 'lx_dhomir_hiya', ar_vocalized: 'هِيَ', ar_plain: 'هي', translit: 'hiya', gloss_id: 'dia (perempuan tunggal)', owner_island: 'QWD', level: 2, skill_id: 'QWD-L2-04', pos: 'isim', category: 'Dhomir Munfashil', visual_hint: '👩' },
  { id: 'lx_dhomir_anta', ar_vocalized: 'أَنْتَ', ar_plain: 'أنت', translit: 'anta', gloss_id: 'kamu (laki-laki tunggal)', owner_island: 'QWD', level: 2, skill_id: 'QWD-L2-04', pos: 'isim', category: 'Dhomir Munfashil', visual_hint: '🫵' },
  { id: 'lx_dhomir_anti', ar_vocalized: 'أَنْتِ', ar_plain: 'أنتِ', translit: 'anti', gloss_id: 'kamu (perempuan tunggal)', owner_island: 'QWD', level: 2, skill_id: 'QWD-L2-04', pos: 'isim', category: 'Dhomir Munfashil', visual_hint: '🧕' },
  { id: 'lx_dhomir_ana', ar_vocalized: 'أَنَا', ar_plain: 'أنا', translit: 'anā', gloss_id: 'saya / aku', owner_island: 'QWD', level: 2, skill_id: 'QWD-L2-04', pos: 'isim', category: 'Dhomir Munfashil', visual_hint: '🙋' },
  { id: 'lx_dhomir_nahnu', ar_vocalized: 'نَحْنُ', ar_plain: 'نحن', translit: 'naḥnu', gloss_id: 'kami / kita', owner_island: 'QWD', level: 2, skill_id: 'QWD-L2-04', pos: 'isim', category: 'Dhomir Munfashil', visual_hint: '👥' },
  { id: 'lx_fiil_kataba', ar_vocalized: 'كَتَبَ', ar_plain: 'كتب', translit: 'kataba', gloss_id: 'dia telah menulis (fi\'il madhi)', owner_island: 'QWD', level: 3, skill_id: 'QWD-L3-01', pos: 'fiil', category: 'Fi\'il Madhi', visual_hint: '✍️' },
  { id: 'lx_fiil_yaktubu', ar_vocalized: 'يَكْتُبُ', ar_plain: 'يكتب', translit: 'yaktubu', gloss_id: 'dia sedang/akan menulis (fi\'il mudhari\')', owner_island: 'QWD', level: 3, skill_id: 'QWD-L3-01', pos: 'fiil', category: 'Fi\'il Mudhari\'', visual_hint: '📝' },
  { id: 'lx_fiil_qaraa', ar_vocalized: 'قَرَأَ', ar_plain: 'قرأ', translit: 'qaraʾa', gloss_id: 'dia telah membaca (fi\'il madhi)', owner_island: 'QWD', level: 3, skill_id: 'QWD-L3-01', pos: 'fiil', category: 'Fi\'il Madhi', visual_hint: '📖' },
  { id: 'lx_fiil_yaqrau', ar_vocalized: 'يَقْرَأُ', ar_plain: 'يقرأ', translit: 'yaqraʾu', gloss_id: 'dia sedang/akan membaca (fi\'il mudhari\')', owner_island: 'QWD', level: 3, skill_id: 'QWD-L3-01', pos: 'fiil', category: 'Fi\'il Mudhari\'', visual_hint: '📚' },
  { id: 'lx_fiil_dzahaba', ar_vocalized: 'ذَهَبَ', ar_plain: 'ذهب', translit: 'dhahaba', gloss_id: 'dia telah pergi (fi\'il madhi)', owner_island: 'QWD', level: 3, skill_id: 'QWD-L3-01', pos: 'fiil', category: 'Fi\'il Madhi', visual_hint: '🚶' },
  { id: 'lx_fiil_yadhabu', ar_vocalized: 'يَذْهَبُ', ar_plain: 'يذهب', translit: 'yadhhabu', gloss_id: 'dia sedang/akan pergi (fi\'il mudhari\')', owner_island: 'QWD', level: 3, skill_id: 'QWD-L3-01', pos: 'fiil', category: 'Fi\'il Mudhari\'', visual_hint: '🚶' },
  { id: 'lx_fiil_shariba', ar_vocalized: 'شَرِبَ', ar_plain: 'شرب', translit: 'syariba', gloss_id: 'dia telah minum (fi\'il madhi)', owner_island: 'QWD', level: 3, skill_id: 'QWD-L3-02', pos: 'fiil', category: 'Fi\'il Madhi', visual_hint: '🥤' },
  { id: 'lx_fiil_yashrabu', ar_vocalized: 'يَشْرَبُ', ar_plain: 'يشرب', translit: 'yasy Rabu', gloss_id: 'dia sedang minum (fi\'il mudhari\')', owner_island: 'QWD', level: 3, skill_id: 'QWD-L3-02', pos: 'fiil', category: 'Fi\'il Mudhari\'', visual_hint: '🧃' },
  { id: 'lx_harf_inna', ar_vocalized: 'إِنَّ', ar_plain: 'إن', translit: 'inna', gloss_id: 'sesungguhnya (harf taukid & nashab)', owner_island: 'QWD', level: 4, skill_id: 'QWD-L4-03', pos: 'harf', category: 'Nawasikh', visual_hint: '❗' },
  { id: 'lx_fiil_kaana', ar_vocalized: 'كَانَ', ar_plain: 'كان', translit: 'kāna', gloss_id: 'adalah / dahulu (fi\'il madhi naqish)', owner_island: 'QWD', level: 4, skill_id: 'QWD-L4-02', pos: 'fiil', category: 'Nawasikh', visual_hint: '⏳' },
  { id: 'lx_harf_lan', ar_vocalized: 'لَنْ', ar_plain: 'لن', translit: 'lan', gloss_id: 'tidak akan pernah (harf nashab nafy)', owner_island: 'QWD', level: 4, skill_id: 'QWD-L4-04', pos: 'harf', category: 'Adawat Nashab', visual_hint: '🚫' },
  { id: 'lx_harf_lam', ar_vocalized: 'لَمْ', ar_plain: 'لم', translit: 'lam', gloss_id: 'belum / tidak pernah (harf jazm nafy)', owner_island: 'QWD', level: 4, skill_id: 'QWD-L4-04', pos: 'harf', category: 'Adawat Jazm', visual_hint: '🛑' },

  // --- IST (Lembah Istima') ---
  { id: 'lx_ist_jamal', ar_vocalized: 'جَمَل', ar_plain: 'جمل', translit: 'jamal', gloss_id: 'unta (vokal pendek)', owner_island: 'IST', level: 0, skill_id: 'IST-L0-02', pos: 'isim', category: 'Vokal Pendek vs Mad', visual_hint: '🐫' },
  { id: 'lx_ist_jamaal', ar_vocalized: 'جَمَال', ar_plain: 'جمال', translit: 'jamāl', gloss_id: 'keindahan (vokal panjang mad)', owner_island: 'IST', level: 0, skill_id: 'IST-L0-02', pos: 'isim', category: 'Vokal Pendek vs Mad', visual_hint: '✨' },
  { id: 'lx_ist_qalb', ar_vocalized: 'قَلْب', ar_plain: 'قلب', translit: 'qalb', gloss_id: 'hati / jantung (huruf Qaf)', owner_island: 'IST', level: 1, skill_id: 'IST-L1-02', pos: 'isim', category: 'Pasangan Minimal', visual_hint: '❤️' },
  { id: 'lx_ist_kalb', ar_vocalized: 'كَلْب', ar_plain: 'كلب', translit: 'kalb', gloss_id: 'anjing (huruf Kaf tipis)', owner_island: 'IST', level: 1, skill_id: 'IST-L1-02', pos: 'isim', category: 'Pasangan Minimal', visual_hint: '🐕' },
  { id: 'lx_ist_sayf', ar_vocalized: 'سَيْف', ar_plain: 'سيف', translit: 'sayf', gloss_id: 'pedang (huruf Sin tipis)', owner_island: 'IST', level: 1, skill_id: 'IST-L1-02', pos: 'isim', category: 'Pasangan Minimal', visual_hint: '⚔️' },
  { id: 'lx_ist_shayf', ar_vocalized: 'صَيْف', ar_plain: 'صيف', translit: 'ṣayf', gloss_id: 'musim panas (huruf Shad tebal)', owner_island: 'IST', level: 1, skill_id: 'IST-L1-02', pos: 'isim', category: 'Pasangan Minimal', visual_hint: '☀️' },
  { id: 'lx_ist_alim', ar_vocalized: 'عَلِيم', ar_plain: 'عليم', translit: 'ʿalīm', gloss_id: 'maha mengetahui (huruf \'Ain)', owner_island: 'IST', level: 1, skill_id: 'IST-L1-01', pos: 'isim', category: 'Pasangan Minimal Halq', visual_hint: '🧠' },
  { id: 'lx_ist_aleem', ar_vocalized: 'أَلِيم', ar_plain: 'أليم', translit: 'alīm', gloss_id: 'pedih / menyakitkan (huruf Hamzah)', owner_island: 'IST', level: 1, skill_id: 'IST-L1-01', pos: 'isim', category: 'Pasangan Minimal Halq', visual_hint: '🩹' },
  { id: 'lx_ist_yamin', ar_vocalized: 'يَمِين', ar_plain: 'يمين', translit: 'yamīn', gloss_id: 'kanan (arah mata angin)', owner_island: 'IST', level: 1, skill_id: 'IST-L1-04', pos: 'isim', category: 'Arah Spasial', visual_hint: '➡️' },
  { id: 'lx_ist_yasar', ar_vocalized: 'يَسَار', ar_plain: 'يسار', translit: 'yasār', gloss_id: 'kiri (arah mata angin)', owner_island: 'IST', level: 1, skill_id: 'IST-L1-04', pos: 'isim', category: 'Arah Spasial', visual_hint: '⬅️' },
  { id: 'lx_ist_amam', ar_vocalized: 'أَمَام', ar_plain: 'أمام', translit: 'amām', gloss_id: 'depan', owner_island: 'IST', level: 1, skill_id: 'IST-L1-04', pos: 'isim', category: 'Arah Spasial', visual_hint: '⬆️' },
  { id: 'lx_ist_wara', ar_vocalized: 'وَرَاء', ar_plain: 'وراء', translit: 'warāʾ', gloss_id: 'belakang', owner_island: 'IST', level: 1, skill_id: 'IST-L1-04', pos: 'isim', category: 'Arah Spasial', visual_hint: '⬇️' },
  { id: 'lx_ist_iqra', ar_vocalized: 'اِقْرَأْ', ar_plain: 'اقرأ', translit: 'iqraʾ', gloss_id: 'bacalah! (perintah lisan)', owner_island: 'IST', level: 2, skill_id: 'IST-L2-01', pos: 'fiil', category: 'Instruksi Suara', visual_hint: '📖' },
  { id: 'lx_ist_isma', ar_vocalized: 'اِسْمَعْ', ar_plain: 'اسمع', translit: 'ismaʿ', gloss_id: 'dengarkanlah!', owner_island: 'IST', level: 2, skill_id: 'IST-L2-01', pos: 'fiil', category: 'Instruksi Suara', visual_hint: '👂' },
  { id: 'lx_ist_uktub', ar_vocalized: 'اُكْتُبْ', ar_plain: 'اكتب', translit: 'uktub', gloss_id: 'tulislah!', owner_island: 'IST', level: 2, skill_id: 'IST-L2-01', pos: 'fiil', category: 'Instruksi Suara', visual_hint: '✍️' },
  { id: 'lx_ist_qif', ar_vocalized: 'قِفْ', ar_plain: 'قف', translit: 'qif', gloss_id: 'berdirilah! / berhentilah!', owner_island: 'IST', level: 2, skill_id: 'IST-L2-01', pos: 'fiil', category: 'Instruksi Suara', visual_hint: '🧍' },
  { id: 'lx_ist_ijlis', ar_vocalized: 'اِجْلِسْ', ar_plain: 'اجلس', translit: 'ijlis', gloss_id: 'duduklah!', owner_island: 'IST', level: 2, skill_id: 'IST-L2-01', pos: 'fiil', category: 'Instruksi Suara', visual_hint: '🪑' },
  { id: 'lx_ist_saah', ar_vocalized: 'السَّاعَةُ الثَّالِثَة', ar_plain: 'الساعة الثالثة', translit: 'as-sāʿatu th-thālithah', gloss_id: 'pukul tiga tepat', owner_island: 'IST', level: 2, skill_id: 'IST-L2-02', pos: 'phrase', category: 'Waktu Simak', visual_hint: '🕒' },

  // --- QRA (Perpustakaan Qira'ah) ---
  { id: 'lx_qra_hadīqah', ar_vocalized: 'حَدِيقَة', ar_plain: 'حديقة', translit: 'ḥadīqah', gloss_id: 'taman / kebun asri', owner_island: 'QRA', level: 1, skill_id: 'QRA-L1-01', pos: 'isim', category: 'Alam & Tempat', visual_hint: '🌳' },
  { id: 'lx_qra_shajar', ar_vocalized: 'شَجَرَة', ar_plain: 'شجرة', translit: 'syajarah', gloss_id: 'pohon rindang', owner_island: 'QRA', level: 1, skill_id: 'QRA-L1-01', pos: 'isim', category: 'Alam & Tumbuhan', visual_hint: '🌲' },
  { id: 'lx_qra_maa', ar_vocalized: 'مَاءٌ عَذْبٌ', ar_plain: 'ماء عذب', translit: 'māʾun ʿadhb', gloss_id: 'air tawar / segar', owner_island: 'QRA', level: 1, skill_id: 'QRA-L1-02', pos: 'phrase', category: 'Sifat & Benda', visual_hint: '💧' },
  { id: 'lx_qra_qamar', ar_vocalized: 'القَمَر', ar_plain: 'القمر', translit: 'al-qamar', gloss_id: 'bulan (bacaan Al-Qamariyah jelas)', owner_island: 'QRA', level: 1, skill_id: 'QRA-L1-04', pos: 'isim', category: 'Lam Ta\'rif', visual_hint: '🌙' },
  { id: 'lx_qra_shams', ar_vocalized: 'الشَّمْس', ar_plain: 'الشمس', translit: 'asy-syams', gloss_id: 'matahari (bacaan Asy-Syamsiyah idgham)', owner_island: 'QRA', level: 1, skill_id: 'QRA-L1-04', pos: 'isim', category: 'Lam Ta\'rif', visual_hint: '☀️' },
  { id: 'lx_qra_qissah', ar_vocalized: 'قِصَّة', ar_plain: 'قصة', translit: 'qiṣṣah', gloss_id: 'cerita / kisah hikmah', owner_island: 'QRA', level: 2, skill_id: 'QRA-L2-02', pos: 'isim', category: 'Literasi & Buku', visual_hint: '📖' },
  { id: 'lx_qra_maktabah', ar_vocalized: 'مَكْتَبَة', ar_plain: 'مكتبة', translit: 'maktabah', gloss_id: 'perpustakaan / toko buku', owner_island: 'QRA', level: 2, skill_id: 'QRA-L2-02', pos: 'isim', category: 'Literasi & Tempat', visual_hint: '🏛️' },
  { id: 'lx_qra_hikmah', ar_vocalized: 'حِكْمَة', ar_plain: 'حكمة', translit: 'ḥikmah', gloss_id: 'kebijaksanaan / nasihat berharga', owner_island: 'QRA', level: 3, skill_id: 'QRA-L3-01', pos: 'isim', category: 'Nilai & Hikmah', visual_hint: '💡' },
  { id: 'lx_qra_namlah', ar_vocalized: 'نَمْلَة', ar_plain: 'نملة', translit: 'namlah', gloss_id: 'semut pekerja keras', owner_island: 'QRA', level: 3, skill_id: 'QRA-L3-01', pos: 'isim', category: 'Fabel Hewan', visual_hint: '🐜' },
  { id: 'lx_qra_hamaamah', ar_vocalized: 'حَمَامَة', ar_plain: 'حمامة', translit: 'ḥamāmah', gloss_id: 'burung merpati putih', owner_island: 'QRA', level: 3, skill_id: 'QRA-L3-01', pos: 'isim', category: 'Fabel Hewan', visual_hint: '🕊️' },
  { id: 'lx_qra_dua_thoom', ar_vocalized: 'بِسْمِ اللَّهِ وَعَلَى بَرَكَةِ اللَّهِ', ar_plain: 'بسم الله وعلى بركة الله', translit: 'bismi Llāh wa-ʿalā barakati Llāh', gloss_id: 'doa makan: dengan nama Allah dan berkah-Nya', owner_island: 'QRA', level: 3, skill_id: 'QRA-L3-03', pos: 'phrase', category: 'Doa Harian', visual_hint: '🤲' },
  { id: 'lx_qra_risalah', ar_vocalized: 'رِسَالَة', ar_plain: 'رسالة', translit: 'risālah', gloss_id: 'surat kabar / warkat sahabat', owner_island: 'QRA', level: 3, skill_id: 'QRA-L3-04', pos: 'isim', category: 'Korespondensi', visual_hint: '✉️' },
  { id: 'lx_qra_kutub', ar_vocalized: 'كُتُب', ar_plain: 'كتب', translit: 'kutub', gloss_id: 'buku-buku (jamak taksir dari كِتَاب)', owner_island: 'QRA', level: 4, skill_id: 'QRA-L4-03', pos: 'isim', category: 'Jamak Taksir', visual_hint: '📚' },
  { id: 'lx_qra_ulama', ar_vocalized: 'عُلَمَاء', ar_plain: 'علماء', translit: 'ʿulamāʾ', gloss_id: 'para cendekiawan / ulama (jamak dari عَالِم)', owner_island: 'QRA', level: 4, skill_id: 'QRA-L4-03', pos: 'isim', category: 'Jamak Taksir', visual_hint: '🎓' },
  { id: 'lx_qra_shiir', ar_vocalized: 'شِعْر', ar_plain: 'شعر', translit: 'syiʿr', gloss_id: 'bait syair / puisi Arab klasik', owner_island: 'QRA', level: 5, skill_id: 'QRA-L5-03', pos: 'isim', category: 'Sastra Arab', visual_hint: '📜' },
];

// Dialog Skenario Bercabang (Kampung Hiwar)
export const DIALOGUES_DATA: Record<string, DialogueNode[]> = {
  greeting_market: [
    {
      id: 'n1',
      speaker: 'paman_bakar',
      speakerName: 'Paman Bakr (Penjual Roti)',
      ar: 'السَّلَامُ عَلَيْكُمْ يَا صَدِيقِي! كَيْفَ حَالُكَ؟',
      translit: 'As-salāmu ʿalaykum yā ṣadīqī! Kayfa ḥāluka?',
      id_translation: 'Semoga keselamatan atasmu, wahai sahabatku! Bagaimana kabarmu?',
      choices: [
        {
          ar: 'وَعَلَيْكُمُ السَّلَام! الحَمْدُ لِلَّهِ بِخَيْر.',
          translit: 'Wa ʿalaykumu s-salām! Al-ḥamdu lillāh bi-khayr.',
          id_translation: 'Dan atasmu keselamatan! Segala puji bagi Allah, baik-baik saja.',
          score: 1.0,
          nextId: 'n2'
        },
        {
          ar: 'شُكْرًا!',
          translit: 'Shukran!',
          id_translation: 'Terima kasih!',
          score: 0.5,
          feedback: 'Bagus, tapi lebih sopan jawab salam dan kabarnya terlebih dahulu ya!',
          nextId: 'n2'
        }
      ]
    },
    {
      id: 'n2',
      speaker: 'paman_bakar',
      speakerName: 'Paman Bakr (Penjual Roti)',
      ar: 'أَهْلًا وَسَهْلًا فِي سُوقِنَا! مَاذَا تُرِيدُ؟',
      translit: 'Ahlan wa sahlan fī sūqinā! Mādhā turīd?',
      id_translation: 'Selamat datang di pasar kami! Apa yang kamu inginkan?',
      choices: [
        {
          ar: 'أُرِيدُ خُبْزًا وَمَاءً، مِنْ فَضْلِكَ.',
          translit: 'Urīdu khubzan wa māʾan, min faḍlika.',
          id_translation: 'Saya ingin roti dan air, tolong.',
          score: 1.0,
          nextId: 'n3'
        },
        {
          ar: 'هٰذَا كِتَابٌ.',
          translit: 'Hādhā kitāb.',
          id_translation: 'Ini adalah buku.',
          score: 0.2,
          feedback: 'Di toko roti kita memesan makanan atau minuman ya!',
          nextId: 'n3'
        }
      ]
    },
    {
      id: 'n3',
      speaker: 'paman_bakar',
      speakerName: 'Paman Bakr (Penjual Roti)',
      ar: 'تَفَضَّلْ! هَا هُوَ الخُبْزُ الطَّازَجُ وَالمَاءُ البَارِدُ.',
      translit: 'Tafaḍḍal! Hā huwa l-khubzu ṭ-ṭāzaju wa-l-māʾu l-bārid.',
      id_translation: 'Silakan! Ini roti yang masih hangat dan air yang segar.',
      choices: [
        {
          ar: 'شُكْرًا جَزِيلًا، بَارَكَ اللَّهُ فِيكَ!',
          translit: 'Shukran jazīlan, bāraka Llāhu fīk!',
          id_translation: 'Terima kasih banyak, semoga Allah memberkahimu!',
          score: 1.0
        }
      ]
    }
  ],
  meet_friend: [
    {
      id: 'mf1',
      speaker: 'sahabat_ali',
      speakerName: 'Ali (Murid Baru)',
      ar: 'صَبَاحَ الخَيْرِ! أَنَا عَلِيٌّ، مَا اسْمُكَ؟',
      translit: 'Ṣabāḥa l-khayr! Anā ʿAlī, mā ismuka?',
      id_translation: 'Selamat pagi! Saya Ali, siapa namamu?',
      choices: [
        {
          ar: 'صَبَاحَ النُّورِ! اِسْمِي طَالِبٌ مُجْتَهِدٌ.',
          translit: 'Ṣabāḥa n-nūr! Ismī ṭālibun mujtahid.',
          id_translation: 'Selamat pagi penuh cahaya! Namaku penuntut ilmu yang tekun.',
          score: 1.0,
          nextId: 'mf2'
        },
        {
          ar: 'هٰذَا كِتَابِي.',
          translit: 'Hādhā kitābī.',
          id_translation: 'Ini bukuku.',
          score: 0.3,
          feedback: 'Jawablah dengan menyebutkan namamu terlebih dahulu!',
          nextId: 'mf2'
        }
      ]
    },
    {
      id: 'mf2',
      speaker: 'sahabat_ali',
      speakerName: 'Ali (Murid Baru)',
      ar: 'أَهْلًا يَا صَدِيقِي! مِنْ أَيْنَ أَنْتَ؟',
      translit: 'Ahlan yā ṣadīqī! Min ayna anta?',
      id_translation: 'Selamat datang wahai sahabatku! Dari mana asalmu?',
      choices: [
        {
          ar: 'أَنَا مِنْ إِنْدُونِيسِيَا، وَأَنْتَ؟',
          translit: 'Anā min Indūnīsiyā, wa-anta?',
          id_translation: 'Saya dari Indonesia, dan kamu?',
          score: 1.0,
          nextId: 'mf3'
        },
        {
          ar: 'نَعَمْ، أَنَا بَارِدٌ.',
          translit: 'Naʿam, anā bārid.',
          id_translation: 'Ya, saya dingin.',
          score: 0.2,
          feedback: 'Sebutkan negaramu ya, misalnya Indonesia!',
          nextId: 'mf3'
        }
      ]
    },
    {
      id: 'mf3',
      speaker: 'sahabat_ali',
      speakerName: 'Ali (Murid Baru)',
      ar: 'مَا شَاءَ اللَّهُ! فُرْصَةٌ سَعِيدَةٌ يَا أَخِي!',
      translit: 'Mā syāʾa Llāh! Furṣatun saʿīdatun yā akhī!',
      id_translation: 'Masya Allah! Senang sekali bertemu denganmu wahai saudaraku!',
      choices: [
        {
          ar: 'وَأَنَا مَسْرُورٌ بِلِقَائِكَ، مَعَ السَّلَامَةِ!',
          translit: 'Wa-anā masrūrun bi-liqāʾika, maʿa s-salāmah!',
          id_translation: 'Dan saya juga senang berjumpa denganmu, sampai jumpa selamat tinggal!',
          score: 1.0
        }
      ]
    }
  ],
  direction_mosque: [
    {
      id: 'dm1',
      speaker: 'musafir_tariq',
      speakerName: 'Paman Tariq (Musafir)',
      ar: 'مِنْ فَضْلِكَ يَا بُنَيَّ، أَيْنَ المَسْجِدُ الكَبِيرُ؟',
      translit: 'Min faḍlika yā bunayya, ayna l-masjidu l-kabīr?',
      id_translation: 'Permisi wahai anakku, di manakah masjid besar?',
      choices: [
        {
          ar: 'المَسْجِدُ هُنَاكَ! اِتَّجِهْ إِلَى اليَمِينِ ثُمَّ إِلَى الأَمَامِ.',
          translit: 'Al-masjidu hunāk! Ittajih ilā l-yamīn thumma ilā l-amām.',
          id_translation: 'Masjid di sebelah sana! Beloklah ke kanan lalu lurus ke depan.',
          score: 1.0,
          nextId: 'dm2'
        },
        {
          ar: 'أَنَا آكُلُ خُبْزًا.',
          translit: 'Anā ākulu khubzan.',
          id_translation: 'Saya sedang makan roti.',
          score: 0.2,
          feedback: 'Tunjukkan arah jalannya ya!',
          nextId: 'dm2'
        }
      ]
    },
    {
      id: 'dm2',
      speaker: 'musafir_tariq',
      speakerName: 'Paman Tariq (Musafir)',
      ar: 'جَزَاكَ اللَّهُ خَيْرًا وَبَارَكَ فِيكَ يَا صَغِيرِي!',
      translit: 'Jazāka Llāhu khayran wa-bāraka fīka yā ṣaghīrī!',
      id_translation: 'Semoga Allah membalasmu dengan kebaikan dan memberkahimu!',
      choices: [
        {
          ar: 'وَإِيَّاكَ يَا عَمِّي، فِي أَمَانِ اللَّهِ!',
          translit: 'Wa-iyyāka yā ʿammī, fī amāni Llāh!',
          id_translation: 'Dan kepadamu juga wahai pamanku, semoga dalam lindungan Allah!',
          score: 1.0
        }
      ]
    }
  ],
  cafe_order: [
    {
      id: 'co1',
      speaker: 'pelayan_hasan',
      speakerName: 'Pelayan Hasan (Kedai Kurma)',
      ar: 'مَرْحَبًا بِكَ فِي مَقْهَى الكَوْثَرِ! مَاذَا تَشْرَبُ؟',
      translit: 'Marḥaban bika fī maqhā l-kawthar! Mādhā tashrab?',
      id_translation: 'Selamat datang di Kafe Al-Kautsar! Apa yang ingin kamu minum?',
      choices: [
        {
          ar: 'أُرِيدُ شَايًا سَاخِنًا بِالنَّعْنَاعِ، مِنْ فَضْلِكَ.',
          translit: 'Urīdu syāyan sākhinan bi-n-naʿnāʿ, min faḍlika.',
          id_translation: 'Saya ingin teh panas daun mint, tolong.',
          score: 1.0,
          nextId: 'co2'
        },
        {
          ar: 'هٰذَا حِصَانٌ سَرِيعٌ.',
          translit: 'Hādhā ḥiṣān sarīʿ.',
          id_translation: 'Ini kuda yang cepat.',
          score: 0.2,
          feedback: 'Pilihlah minuman yang ada di menu kedai!',
          nextId: 'co2'
        }
      ]
    },
    {
      id: 'co2',
      speaker: 'pelayan_hasan',
      speakerName: 'Pelayan Hasan (Kedai Kurma)',
      ar: 'حَسَنًا! وَهَلْ تُرِيدُ مَعَهُ بَعْضَ التَّمْرِ الحُلْوِ؟',
      translit: 'Ḥasanan! Wa-hal turīdu maʿahu baʿḍa t-tamri l-ḥulw?',
      id_translation: 'Baiklah! Dan apakah kamu ingin kurma manis sebagai teman minum?',
      choices: [
        {
          ar: 'نَعَمْ، تَمْرٌ لَذِيذٌ مِنْ فَضْلِكَ! بِكَمِ الحِسَابُ؟',
          translit: 'Naʿam, tamrun ladhīdhun min faḍlika! Bikami l-ḥisāb?',
          id_translation: 'Ya, kurma lezat tolong! Berapa total harganya?',
          score: 1.0,
          nextId: 'co3'
        },
        {
          ar: 'لَا أَعْرِفُ شَيْئًا.',
          translit: 'Lā aʿrifu shayʾā.',
          id_translation: 'Saya tidak tahu apa-apa.',
          score: 0.4,
          feedback: 'Jawablah tawaran kurmanya secara sopan!',
          nextId: 'co3'
        }
      ]
    },
    {
      id: 'co3',
      speaker: 'pelayan_hasan',
      speakerName: 'Pelayan Hasan (Kedai Kurma)',
      ar: 'الحِسَابُ خَمْسَةُ دَنَانِيرَ فَقَطْ، هَنِيئًا مَرِيئًا!',
      translit: 'Al-ḥisābu khamsatu danānīra faqaṭ, hanīʾan marīʾan!',
      id_translation: 'Totalnya hanya lima dinar saja, selamat menikmati!',
      choices: [
        {
          ar: 'تَفَضَّلِ النُّقُودَ، شُكْرًا جَزِيلًا لَكَ!',
          translit: 'Tafaḍḍali n-nuqūda, shukran jazīlan laka!',
          id_translation: 'Silakan uangnya, terima kasih banyak kepadamu!',
          score: 1.0
        }
      ]
    }
  ],
  doctor_clinic: [
    {
      id: 'dc1',
      speaker: 'thabib_faruq',
      speakerName: 'Dokter Faruq (Klinik Kampung)',
      ar: 'أَهْلًا يَا بُنَيَّ، لَا بَأْسَ طَهُورٌ إِنْ شَاءَ اللَّهُ! مِمَّ تَشْكُو؟',
      translit: 'Ahlan yā bunayya, lā baʾsa ṭahūrun in syāʾa Llāh! Mimma tashkū?',
      id_translation: 'Halo anakku, semoga lekas sembuh insya Allah! Apa keluhan yang kamu rasakan?',
      choices: [
        {
          ar: 'أَشْعُرُ بِأَلَمٍ فِي رَأْسِي وَحَرَارَةٍ مُرْتَفِعَةٍ.',
          translit: 'Ashʿuru bi-alamin fī raʾsī wa-ḥarāratin murtafiʿah.',
          id_translation: 'Saya merasa sakit kepala dan demam panas tinggi.',
          score: 1.0,
          nextId: 'dc2'
        },
        {
          ar: 'أَنَا أَلْعَبُ كُرَةَ القَدَمِ.',
          translit: 'Anā alʿabu kurata l-qadam.',
          id_translation: 'Saya sedang bermain sepak bola.',
          score: 0.2,
          feedback: 'Sampaikan gejala penyakit yang kamu rasakan kepada dokter!',
          nextId: 'dc2'
        }
      ]
    },
    {
      id: 'dc2',
      speaker: 'thabib_faruq',
      speakerName: 'Dokter Faruq (Klinik Kampung)',
      ar: 'تَنَاوَلْ هٰذَا الدَّوَاءَ بَعْدَ الطَّعَامِ وَارْتَحْ جَيِّدًا!',
      translit: 'Tanāwal hādhā d-dawāʾa baʿda ṭ-ṭaʿāmi wa-rtaḥ jayyidan!',
      id_translation: 'Minumlah obat ini setelah makan dan istirahatlah dengan baik!',
      choices: [
        {
          ar: 'شَفَانَا اللَّهُ جَمِيعًا، جَزَاكَ اللَّهُ خَيْرًا يَا طَبِيبُ!',
          translit: 'Syafāna Llāhu jamīʿan, jazāka Llāhu khayran yā ṭabīb!',
          id_translation: 'Semoga Allah menyembuhkan kita semua, semoga Allah membalasmu dengan kebaikan wahai dokter!',
          score: 1.0
        }
      ]
    }
  ]
};

// 29 Spesifikasi Game dari Bab 7 & 17
export interface GameDefinition {
  id: string;
  name: string;
  islandId: IslandId;
  frameworkType: string;
  mechanic: string;
  evidence: 'R' | 'P' | 'L' | 'W';
  childMode: string;
  adultMode: string;
  playable: boolean;
}

export const GAMES_CATALOG: GameDefinition[] = [
  {
    id: 'sand_trace',
    name: 'Sand Trace (Jejak Pasir Mutiara)',
    islandId: 'HRF',
    frameworkType: 'Exploration + Puzzle',
    mechanic: 'Menelusuri jejak huruf di pasir 3D mengikuti anak panah goresan',
    evidence: 'W',
    childMode: 'Garis tebal, toleransi lebar, suara burung ramah, mutiara untuk kalung Hudhud',
    adultMode: 'Toleransi kaligrafi naskh presisi & proporsi',
    playable: true
  },
  {
    id: 'floating_market',
    name: 'Floating Market Quest (Pasar Apung)',
    islandId: 'MFR',
    frameworkType: 'Matching Village',
    mechanic: 'Ambil & serahkan benda 3D dari perahu sesuai pesanan pelanggan ber-audio Arab',
    evidence: 'R',
    childMode: 'Benda besar, pelanggan hewan ramah, tanpa batas waktu',
    adultMode: 'Nuansa pasar nyata, harga, negosiasi cepat',
    playable: true
  },
  {
    id: 'scroll_tap_gloss',
    name: 'Scroll Tap-Gloss (Baca Bertingkat)',
    islandId: 'QRA',
    frameworkType: 'Graded Reader',
    mechanic: 'Ketuk kata Arab di naskah bergambar untuk arti instan dan simpan ke koleksi',
    evidence: 'R',
    childMode: 'Naskah 2-3 kalimat berharakat penuh, gambar ceria',
    adultMode: 'Naskah panjang kontekstual, kamus lokal mandiri',
    playable: true
  },
  {
    id: 'tashrif_lab',
    name: 'Tashrif Lab (Laboratorium Konjugasi)',
    islandId: 'QWD',
    frameworkType: 'Puzzle Lab',
    mechanic: 'Mesin laboratorium konjugasi fi\'il madhi & mudhari\' dengan pilihan akar kata & pelaku',
    evidence: 'P',
    childMode: 'Pola dasar dengan animasi roda gigi',
    adultMode: 'Wazan morfologi Arab lengkap dengan penjelasan',
    playable: true
  },
  {
    id: 'basket_spell',
    name: 'Basket Spell (Keranjang Ejaan)',
    islandId: 'MFR',
    frameworkType: 'Word Magic',
    mechanic: 'Susun huruf Arab dari keranjang menjadi kata benda bergambar',
    evidence: 'W',
    childMode: 'Kata 2-4 huruf, harakat penuh, petunjuk warna ramah',
    adultMode: 'Kata 3-6 huruf, tanpa petunjuk, harakat sebagian',
    playable: true
  },
  {
    id: 'makhraj_mirror',
    name: 'Makhraj Mirror (Cermin Lafal Suara)',
    islandId: 'HRF',
    frameworkType: 'Voice Challenge',
    mechanic: 'Animasi penampang makhraj tenggorokan/lidah & rekam-bandingkan pelafalan',
    evidence: 'P',
    childMode: 'Fokus bunyi huruf ceria, stiker pujian, sesi santai',
    adultMode: 'Tabel makhraj fonetik naskh & kontras huruf mirip',
    playable: true
  },
  {
    id: 'imla_lighthouse',
    name: 'Imla\' Lighthouse (Mercusuar Ejaan)',
    islandId: 'KTB',
    frameworkType: 'Word Magic',
    mechanic: 'Dikte ejaan audio; mercusuar pelabuhan menyala saat benar',
    evidence: 'W',
    childMode: 'Kata sering, ubin ejaan ramah, tanpa penalti',
    adultMode: 'Kaidah hamzah mutatharrifah & ta marbuthah',
    playable: true
  },
  {
    id: 'sentence_bridge',
    name: 'Sentence Bridge Builder (Jembatan Kalimat)',
    islandId: 'QWD',
    frameworkType: 'Puzzle Lab',
    mechanic: 'Susun balok kata mudzakkar/muannats agar jembatan tebing terhubung',
    evidence: 'R',
    childMode: 'Warna sambungan balok (puzzle kunci pas), tanpa istilah rumit',
    adultMode: 'Penjelasan tata bahasa nahwu & mode i\'rab',
    playable: true
  },
  {
    id: 'pearl_garden',
    name: 'Pearl Garden (Taman Mutiara Kerang)',
    islandId: 'HRF',
    frameworkType: 'Memory Garden',
    mechanic: 'Mencocokkan kerang huruf, bunyi audio, dan bentuk posisi',
    evidence: 'R',
    childMode: '4-6 pasang kerang dengan visual warna-warni',
    adultMode: '8-12 pasang huruf posisi awal-tengah-akhir',
    playable: true
  },
  {
    id: 'pearl_chain',
    name: 'Pearl Chain (Rantai Huruf Sambung)',
    islandId: 'HRF',
    frameworkType: 'Word Magic',
    mechanic: 'Merangkai bentuk huruf sambung menjadi kata; visualisasi 6 huruf pemutus sambungan kiri',
    evidence: 'W',
    childMode: 'Kata 2-3 huruf dengan untaian kalung mutiara berwarna',
    adultMode: 'Kata 3-5 huruf dengan analisis posisi huruf Arab lengkap',
    playable: true
  },
  {
    id: 'dialog_quest',
    name: 'Dialog Quest (Petualangan Dialog)',
    islandId: 'HWR',
    frameworkType: 'Quest Engine',
    mechanic: 'Percakapan interaktif bercabang dengan warga Kampung Hiwar',
    evidence: 'P',
    childMode: 'Dialog 2-3 giliran, pilihan hangat, NPC ramah',
    adultMode: 'Dialog 4-8 giliran variatif dengan skenario bandara/kantor',
    playable: true
  },
  {
    id: 'echo_cave',
    name: 'Echo Cave (Gua Gema Istima\')',
    islandId: 'IST',
    frameworkType: 'Listening Quest',
    mechanic: 'Dengarkan pantulan gema audio lalu tebak kata/gambar yang tepat',
    evidence: 'L',
    childMode: 'Satu kata per putaran dengan gambar besar bercahaya',
    adultMode: 'Frasa dan kalimat percakapan cepat',
    playable: true
  },
  {
    id: 'audio_detective',
    name: 'Audio Sleuth Quest (Detektif Suara Lembah)',
    islandId: 'IST',
    frameworkType: 'Listening Quest',
    mechanic: 'Dengarkan petunjuk ujaran Arab misterius, analisa makhraj & makna kontekstual, lalu temukan target kasus',
    evidence: 'L',
    childMode: 'Petunjuk 1-2 kalimat dengan visual ceria & petunjuk audio berulang',
    adultMode: 'Tantangan penutur asli bertempo cepat dengan kontras konteks tajam',
    playable: true
  },
  {
    id: 'sky_runner',
    name: 'Sky Runner Arabi (Pelari Langit)',
    islandId: 'MFR',
    frameworkType: 'Quiz Adventure',
    mechanic: '3 Jalur meluncur ke gerbang kata/arti yang benar',
    evidence: 'R',
    childMode: 'Kecepatan tenang, visual audio + kartu gambar',
    adultMode: 'Kecepatan dinamis, soal teks ke arti cepat',
    playable: true
  },
  {
    id: 'mihrab_gate',
    name: 'Mihrab Gate (Boss Exam Kuil Langit)',
    islandId: 'TMH',
    frameworkType: 'Boss Exam',
    mechanic: 'Ujian terpadu 4 keterampilan (Simak, Bicara, Baca, Tulis) untuk naik Rutbah',
    evidence: 'R',
    childMode: 'Dua sesi santai 8 menit bertema perayaan kelulusan',
    adultMode: 'Sesi evaluasi komprehensif',
    playable: true
  },
  {
    id: 'hudhud_letter',
    name: 'Surat dari Hudhud (Daily Letter)',
    islandId: 'QRA',
    frameworkType: 'Daily Letter',
    mechanic: 'Membaca surat harian dari sahabat Hudhud & menjawab kuis hikmah',
    evidence: 'R',
    childMode: 'Surat 2-3 kalimat berharakat penuh bergambar',
    adultMode: 'Catatan harian hikmah dan kosa kata kontekstual',
    playable: true
  },
  {
    id: 'makhraj_mastery',
    name: 'Makhraj Mastery (Penakluk Suara)',
    islandId: 'KLM',
    frameworkType: 'Speech Practice',
    mechanic: 'Tantangan melafalkan huruf makhraj, kosakata fasih & kalimat Arab menggunakan mikrofon interaktif',
    evidence: 'P',
    childMode: 'Lafal huruf dan kata bergambar dengan indikator bintang ceria',
    adultMode: 'Evaluasi ketepatan makhraj, sifat huruf, dan kelancaran membaca kalimat',
    playable: true
  }
];

export const REAL_WORLD_MISSIONS = [
  {
    level: 0,
    title: 'Misi Dunia Nyata J0: Rekam Benda di Rumah',
    desc: 'Cari 3 benda di rumahmu (misal: buku = كِتَاب, pena = قَلَم, pintu = بَاب), rekam atau tunjukkan sebutannya kepada orang tua!',
    badge: '🎖️ Penemu Benda Sekitar',
    xpReward: 100,
    starsReward: 5,
    sampleItems: ['كِتَاب (Kitāb - Buku)', 'قَلَم (Qalam - Pena)', 'بَاب (Bāb - Pintu)']
  },
  {
    level: 1,
    title: 'Misi Dunia Nyata J1: Kartu Biodata Diri',
    desc: 'Tuliskan biodata singkat 3 baris: Nama (اِسْمِي...), Asal (أَنَا مِنْ...), dan Makanan kesukaan (أُحِبُّ الخُبْزَ...)!',
    badge: '📜 Penulis Cilik Berbakat',
    xpReward: 150,
    starsReward: 8,
    sampleItems: ['اِسْمِي زَيْد', 'أَنَا مِنْ إِنْدُونِيسِيَا', 'أُحِبُّ الحَلِيب']
  },
  {
    level: 2,
    title: 'Misi Dunia Nyata J2: Pesan Menu di Meja Makan',
    desc: 'Lakukan simulasi memesan makanan kepada keluarga saat makan bersama dengan kalimat: "أُرِيدُ مَاءً مِنْ فَضْلِك"!',
    badge: '🍽️ Duta Santun Berbahasa',
    xpReward: 200,
    starsReward: 10,
    sampleItems: ['أُرِيدُ مَاءً مِنْ فَضْلِكَ', 'شُكْرًا جَزِيلًا']
  }
];

export const GRADED_READINGS = [
  {
    id: 'read_1',
    title: 'فِي الحَدِيقَةِ الجَمِيلَة (Di Taman yang Indah)',
    level: 0,
    theme: 'Alam & Keluarga',
    icon: '🌸',
    summary: 'Mengenal suasana taman bunga, pohon rindang, dan gemercik air segar.',
    paragraphs: [
      {
        ar: 'هٰذِهِ حَدِيقَةٌ جَمِيلَةٌ. فِيهَا شَجَرٌ كَبِيرٌ وَمَاءٌ عَذْبٌ.',
        translit: 'Hādhihi ḥadīqatun jamīlah. Fīhā syajarun kabīr wa-māʾun ʿadzb.',
        translation: 'Ini adalah taman yang indah. Di dalamnya ada pohon yang besar dan air yang segar.',
        words: [
          { ar: 'هٰذِهِ', mean: 'ini (feminin)' },
          { ar: 'حَدِيقَةٌ', mean: 'taman' },
          { ar: 'جَمِيلَةٌ', mean: 'indah' },
          { ar: 'شَجَرٌ', mean: 'pohon' },
          { ar: 'كَبِيرٌ', mean: 'besar' },
          { ar: 'مَاءٌ', mean: 'air' },
          { ar: 'عَذْبٌ', mean: 'segar / tawar' },
        ]
      },
      {
        ar: 'الوَلَدُ يَجْلِسُ تَحْتَ الشَّجَرَةِ وَيَقْرَأُ الكِتَابَ.',
        translit: 'Al-waladu yajlisu taḥta sy-syajarati wa-yaqraʾu l-kitāb.',
        translation: 'Anak laki-laki itu duduk di bawah pohon dan membaca buku.',
        words: [
          { ar: 'الوَلَدُ', mean: 'anak laki-laki' },
          { ar: 'يَجْلِسُ', mean: 'duduk' },
          { ar: 'تَحْتَ', mean: 'di bawah' },
          { ar: 'الشَّجَرَةِ', mean: 'pohon itu' },
          { ar: 'يَقْرَأُ', mean: 'dia membaca' },
          { ar: 'الكِتَابَ', mean: 'buku' },
        ]
      }
    ]
  },
  {
    id: 'read_2',
    title: 'يَوْمٌ فِي سُوقِ المَدِينَة (Sehari di Pasar Kota)',
    level: 1,
    theme: 'Pasar & Transaksi',
    icon: '🛒',
    summary: 'Ahmad berbelanja roti hangat dan buah segar bersama sang ayah tercinta.',
    paragraphs: [
      {
        ar: 'ذَهَبَ أَحْمَدُ مَعَ أَبِيهِ إِلَى سُوقِ المَدِينَةِ فِي الصَّبَاحِ.',
        translit: 'Dzahaba Aḥmad maʿa abīhi ilā sūqi l-madīnati fī ṣ-ṣabāḥ.',
        translation: 'Ahmad pergi bersama ayahnya ke pasar kota di pagi hari.',
        words: [
          { ar: 'ذَهَبَ', mean: 'dia telah pergi' },
          { ar: 'أَحْمَدُ', mean: 'Ahmad' },
          { ar: 'مَعَ', mean: 'bersama' },
          { ar: 'أَبِيهِ', mean: 'ayahnya' },
          { ar: 'إِلَى', mean: 'ke' },
          { ar: 'سُوقِ', mean: 'pasar' },
          { ar: 'المَدِينَةِ', mean: 'kota' },
          { ar: 'الصَّبَاحِ', mean: 'pagi hari' },
        ]
      },
      {
        ar: 'اِشْتَرَى أَبِي خُبْزًا طَازَجًا وَفَاكِهَةً لَذِيذَةً.',
        translit: 'Isytarā abī khubzan ṭāzajan wa-fākihatan ladzīdzah.',
        translation: 'Ayahku membeli roti segar dan buah-buahan yang lezat.',
        words: [
          { ar: 'اِشْتَرَى', mean: 'membeli' },
          { ar: 'أَبِي', mean: 'ayahku' },
          { ar: 'خُبْزًا', mean: 'roti' },
          { ar: 'طَازَجًا', mean: 'segar' },
          { ar: 'فَاكِهَةً', mean: 'buah' },
          { ar: 'لَذِيذَةً', mean: 'lezat' },
        ]
      }
    ]
  },
  {
    id: 'read_3',
    title: 'قِصَّةُ النَّمْلَةِ وَالحَمَامَة (Semut & Merpati yang Baik Hati)',
    level: 2,
    theme: 'Fabel Moral & Hikmah',
    icon: '🕊️',
    summary: 'Fabel persahabatan sejati: tolong-menolong tanpa memandang ukuran tubuh.',
    paragraphs: [
      {
        ar: 'سَقَطَتْ نَمْلَةٌ صَغِيرَةٌ فِي النَّهْرِ وَكَادَتْ تَغْرَقُ.',
        translit: 'Saqaṭat namlatun ṣaghīratun fī n-nahri wa-kādat taghraq.',
        translation: 'Seekor semut kecil terjatuh ke sungai dan hampir saja tenggelam.',
        words: [
          { ar: 'سَقَطَتْ', mean: 'terjatuh (feminin)' },
          { ar: 'نَمْلَةٌ', mean: 'seekor semut' },
          { ar: 'صَغِيرَةٌ', mean: 'kecil' },
          { ar: 'فِي', mean: 'di dalam' },
          { ar: 'النَّهْرِ', mean: 'sungai' },
          { ar: 'تَغْرَقُ', mean: 'tenggelam' },
        ]
      },
      {
        ar: 'رَأَتْهَا حَمَامَةٌ طَيِّبَةٌ، فَأَلْقَتْ لَهَا وَرَقَةَ شَجَرٍ فَأَنْقَذَتْهَا.',
        translit: 'Raʾathā ḥamāmatun ṭayyibah, fa-alqat lahā waraqata syajarin fa-anqadhathā.',
        translation: 'Merpati yang baik hati melihatnya, lalu melemparkan sehelai daun pohon untuk menyelamatkannya.',
        words: [
          { ar: 'رَأَتْهَا', mean: 'melihatnya' },
          { ar: 'حَمَامَةٌ', mean: 'burung merpati' },
          { ar: 'طَيِّبَةٌ', mean: 'baik hati' },
          { ar: 'أَلْقَتْ', mean: 'melemparkan' },
          { ar: 'وَرَقَةَ', mean: 'sehelai daun' },
          { ar: 'شَجَرٍ', mean: 'pohon' },
          { ar: 'أَنْقَذَتْهَا', mean: 'menyelamatkannya' },
        ]
      }
    ]
  },
  {
    id: 'read_4',
    title: 'طَالِبُ العِلْمِ فِي المَكْتَبَة (Penuntut Ilmu di Perpustakaan)',
    level: 3,
    theme: 'Pendidikan & Literasi',
    icon: '📚',
    summary: 'Adab mulia penuntut ilmu saat mencari referensi buku di baitul hikmah.',
    paragraphs: [
      {
        ar: 'دَخَلَ زَيْدٌ مَكْتَبَةَ المَدْرَسَةِ بِهُدُوءٍ وَاحْتِرَامٍ.',
        translit: 'Dakhala Zayd maktabata l-madrasati bi-hudūʾin wa-ḥtirām.',
        translation: 'Zaid memasuki perpustakaan sekolah dengan tenang dan penuh rasa hormat.',
        words: [
          { ar: 'دَخَلَ', mean: 'telah masuk' },
          { ar: 'زَيْدٌ', mean: 'Zaid' },
          { ar: 'مَكْتَبَةَ', mean: 'perpustakaan' },
          { ar: 'المَدْرَسَةِ', mean: 'sekolah' },
          { ar: 'بِهُدُوءٍ', mean: 'dengan tenang' },
          { ar: 'وَاحْتِرَامٍ', mean: 'dan hormat' },
        ]
      },
      {
        ar: 'بَحَثَ عَنْ كُتُبِ التَّارِيخِ الإِسْلَامِيِّ لِيَكْتُبَ بَحْثًا نَافِعًا.',
        translit: 'Baḥatha ʿan kutubi t-tārīkhi l-Islāmiyyi li-yaktuba baḥthan nāfiʿā.',
        translation: 'Ia mencari buku-buku sejarah Islam untuk menulis risalah penelitian yang bermanfaat.',
        words: [
          { ar: 'بَحَثَ', mean: 'mencari' },
          { ar: 'عَنْ', mean: 'tentang' },
          { ar: 'كُتُبِ', mean: 'buku-buku' },
          { ar: 'التَّارِيخِ', mean: 'sejarah' },
          { ar: 'الإِسْلَامِيِّ', mean: 'Islam' },
          { ar: 'يَكْتُبَ', mean: 'menulis' },
          { ar: 'نَافِعًا', mean: 'bermanfaat' },
        ]
      }
    ]
  },
  {
    id: 'read_5',
    title: 'حِكْمَةُ الإِمَامِ الشَّافِعِيّ (Hikmah Imam Asy-Syafi\'i)',
    level: 4,
    theme: 'Sastra & Syi\'ir Mahfuzhat',
    icon: '📜',
    summary: 'Bait nasihat mahfuzhat klasik tentang manisnya buah ketekunan menuntut ilmu.',
    paragraphs: [
      {
        ar: 'مَنْ لَمْ يَذُقْ مُرَّ التَّعَلُّمِ سَاعَةً، تَجَرَّعَ ذُلَّ الجَهْلِ طُولَ حَيَاتِهِ.',
        translit: 'Man lam yadhuq murra t-taʿallumi sāʿatan, tajarraʿa dzulla l-jahli ṭūla ḥayātih.',
        translation: 'Barangsiapa belum mencicipi pahitnya menuntut ilmu sejenak, ia akan meneguk hinanya kebodohan sepanjang hayatnya.',
        words: [
          { ar: 'مَنْ', mean: 'barangsiapa' },
          { ar: 'لَمْ يَذُقْ', mean: 'belum merasakan' },
          { ar: 'مُرَّ', mean: 'pahitnya' },
          { ar: 'التَّعَلُّمِ', mean: 'belajar' },
          { ar: 'سَاعَةً', mean: 'sesaat / sejenak' },
          { ar: 'تَجَرَّعَ', mean: 'ia meneguk' },
          { ar: 'ذُلَّ', mean: 'hinanya' },
          { ar: 'الجَهْلِ', mean: 'kebodohan' },
          { ar: 'طُولَ حَيَاتِهِ', mean: 'sepanjang hidupnya' },
        ]
      }
    ]
  }
];

export const TASHRIF_ROOTS = [
  {
    root: 'ك - ت - ب',
    baseMeaning: 'Menulis (Kataba)',
    conjugations: [
      { pronoun: 'هُوَ (Dia Laki-laki)', madhi: 'كَتَبَ', mudhari: 'يَكْتُبُ', meaning: 'Dia menulis' },
      { pronoun: 'هِيَ (Dia Perempuan)', madhi: 'كَتَبَتْ', mudhari: 'تَكْتُبُ', meaning: 'Dia (P) menulis' },
      { pronoun: 'أَنْتَ (Kamu Laki-laki)', madhi: 'كَتَبْتَ', mudhari: 'تَكْتُبُ', meaning: 'Kamu menulis' },
      { pronoun: 'أَنْتِ (Kamu Perempuan)', madhi: 'كَتَبْتِ', mudhari: 'تَكْتُبِينَ', meaning: 'Kamu (P) menulis' },
      { pronoun: 'أَنَا (Saya)', madhi: 'كَتَبْتُ', mudhari: 'أَكْتُبُ', meaning: 'Saya menulis' },
      { pronoun: 'نَحْنُ (Kami / Kita)', madhi: 'كَتَبْنَا', mudhari: 'نَكْتُبُ', meaning: 'Kami menulis' },
    ]
  },
  {
    root: 'ق - ر - أ',
    baseMeaning: 'Membaca (Qara\'a)',
    conjugations: [
      { pronoun: 'هُوَ (Dia Laki-laki)', madhi: 'قَرَأَ', mudhari: 'يَقْرَأُ', meaning: 'Dia membaca' },
      { pronoun: 'هِيَ (Dia Perempuan)', madhi: 'قَرَأَتْ', mudhari: 'تَقْرَأُ', meaning: 'Dia (P) membaca' },
      { pronoun: 'أَنْتَ (Kamu Laki-laki)', madhi: 'قَرَأْتَ', mudhari: 'تَقْرَأُ', meaning: 'Kamu membaca' },
      { pronoun: 'أَنَا (Saya)', madhi: 'قَرَأْتُ', mudhari: 'أَقْرَأُ', meaning: 'Saya membaca' },
      { pronoun: 'نَحْنُ (Kami / Kita)', madhi: 'قَرَأْنَا', mudhari: 'نَقْرَأُ', meaning: 'Kami membaca' },
    ]
  },
  {
    root: 'ج - ل - س',
    baseMeaning: 'Duduk (Jalasa)',
    conjugations: [
      { pronoun: 'هُوَ (Dia Laki-laki)', madhi: 'جَلَسَ', mudhari: 'يَجْلِسُ', meaning: 'Dia duduk' },
      { pronoun: 'هِيَ (Dia Perempuan)', madhi: 'جَلَسَتْ', mudhari: 'تَجْلِسُ', meaning: 'Dia (P) duduk' },
      { pronoun: 'أَنْتَ (Kamu Laki-laki)', madhi: 'جَلَسْتَ', mudhari: 'تَجْلِسُ', meaning: 'Kamu duduk' },
      { pronoun: 'أَنَا (Saya)', madhi: 'جَلَسْتُ', mudhari: 'أَجْلِسُ', meaning: 'Saya duduk' },
      { pronoun: 'نَحْنُ (Kami / Kita)', madhi: 'جَلَسْنَا', mudhari: 'نَجْلِسُ', meaning: 'Kami duduk' },
    ]
  },
  {
    root: 'ذ - هـ - ب',
    baseMeaning: 'Pergi (Dzahaba)',
    conjugations: [
      { pronoun: 'هُوَ (Dia Laki-laki)', madhi: 'ذَهَبَ', mudhari: 'يَذْهَبُ', meaning: 'Dia pergi' },
      { pronoun: 'هِيَ (Dia Perempuan)', madhi: 'ذَهَبَتْ', mudhari: 'تَذْهَبُ', meaning: 'Dia (P) pergi' },
      { pronoun: 'أَنْتَ (Kamu Laki-laki)', madhi: 'ذَهَبْتَ', mudhari: 'تَذْهَبُ', meaning: 'Kamu pergi' },
      { pronoun: 'أَنَا (Saya)', madhi: 'ذَهَبْتُ', mudhari: 'أَذْهَبُ', meaning: 'Saya pergi' },
      { pronoun: 'نَحْنُ (Kami / Kita)', madhi: 'ذَهَبْنَا', mudhari: 'نَذْهَبُ', meaning: 'Kami pergi' },
    ]
  },
  {
    root: 'ش - ر - ب',
    baseMeaning: 'Minum (Syariba)',
    conjugations: [
      { pronoun: 'هُوَ (Dia Laki-laki)', madhi: 'شَرِبَ', mudhari: 'يَشْرَبُ', meaning: 'Dia minum' },
      { pronoun: 'هِيَ (Dia Perempuan)', madhi: 'شَرِبَتْ', mudhari: 'تَشْرَبُ', meaning: 'Dia (P) minum' },
      { pronoun: 'أَنْتَ (Kamu Laki-laki)', madhi: 'شَرِبْتَ', mudhari: 'تَشْرَبُ', meaning: 'Kamu minum' },
      { pronoun: 'أَنْتِ (Kamu Perempuan)', madhi: 'شَرِبْتِ', mudhari: 'تَشْرَبِينَ', meaning: 'Kamu (P) minum' },
      { pronoun: 'أَنَا (Saya)', madhi: 'شَرِبْتُ', mudhari: 'أَشْرَبُ', meaning: 'Saya minum' },
      { pronoun: 'نَحْنُ (Kami / Kita)', madhi: 'شَرِبْنَا', mudhari: 'نَشْرَبُ', meaning: 'Kami minum' },
    ]
  },
  {
    root: 'ف - ت - ح',
    baseMeaning: 'Membuka (Fataha)',
    conjugations: [
      { pronoun: 'هُوَ (Dia Laki-laki)', madhi: 'فَتَحَ', mudhari: 'يَفْتَحُ', meaning: 'Dia membuka' },
      { pronoun: 'هِيَ (Dia Perempuan)', madhi: 'فَتَحَتْ', mudhari: 'تَفْتَحُ', meaning: 'Dia (P) membuka' },
      { pronoun: 'أَنْتَ (Kamu Laki-laki)', madhi: 'فَتَحْتَ', mudhari: 'تَفْتَحُ', meaning: 'Kamu membuka' },
      { pronoun: 'أَنَا (Saya)', madhi: 'فَتَحْتُ', mudhari: 'أَفْتَحُ', meaning: 'Saya membuka' },
      { pronoun: 'نَحْنُ (Kami / Kita)', madhi: 'فَتَحْنَا', mudhari: 'نَفْتَحُ', meaning: 'Kami membuka' },
    ]
  },
  {
    root: 'ن - ص - ر',
    baseMeaning: 'Menolong (Nashara)',
    conjugations: [
      { pronoun: 'هُوَ (Dia Laki-laki)', madhi: 'نَصَرَ', mudhari: 'يَنْصُرُ', meaning: 'Dia menolong' },
      { pronoun: 'هِيَ (Dia Perempuan)', madhi: 'نَصَرَتْ', mudhari: 'تَنْصُرُ', meaning: 'Dia (P) menolong' },
      { pronoun: 'أَنْتَ (Kamu Laki-laki)', madhi: 'نَصَرْتَ', mudhari: 'تَنْصُرُ', meaning: 'Kamu menolong' },
      { pronoun: 'أَنَا (Saya)', madhi: 'نَصَرْتُ', mudhari: 'أَنْصُرُ', meaning: 'Saya menolong' },
      { pronoun: 'نَحْنُ (Kami / Kita)', madhi: 'نَصَرْنَا', mudhari: 'نَنْصُرُ', meaning: 'Kami menolong' },
    ]
  }
];

export const INITIAL_LEADERBOARD = [
  { id: '1', rank: 1, name: 'Zaid Al-Fatih', avatar: 'ari', rutbah: 'Rahhal' as const, hudhudStage: 'Explorer' as const, xp: 2450, stars: 48, level: 2 },
  { id: '2', rank: 2, name: 'Maryam Zahra', avatar: 'aira', rutbah: 'Thalib' as const, hudhudStage: 'Young' as const, xp: 1980, stars: 39, level: 1 },
  { id: '3', rank: 3, name: 'Fatih Robbani', avatar: 'ari', rutbah: 'Thalib' as const, hudhudStage: 'Young' as const, xp: 1720, stars: 35, level: 1 },
  { id: '4', rank: 4, name: 'Aisyah Putri', avatar: 'aira', rutbah: 'Musafir' as const, hudhudStage: 'Baby' as const, xp: 1420, stars: 28, level: 0 },
  { id: '5', rank: 5, name: 'Umar Farouq', avatar: 'ari', rutbah: 'Musafir' as const, hudhudStage: 'Baby' as const, xp: 1190, stars: 22, level: 0 },
  { id: '6', rank: 6, name: 'Khadijah Nur', avatar: 'aira', rutbah: 'Musafir' as const, hudhudStage: 'Egg' as const, xp: 850, stars: 16, level: 0 }
];
