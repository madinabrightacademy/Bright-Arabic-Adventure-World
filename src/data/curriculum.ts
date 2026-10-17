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
    skillCount: 36
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
    skillCount: 24
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
    minLevel: 0,
    skillCount: 18
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
    skillCount: 18
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
  // MFR - Pasar Mufradat (36 Skill Tematik Terstruktur Progresif: L0-L5)
  // Level 0: Tamhidi (Pra-A1) - Fondasi Konkrit & Lingkungan Terdekat
  {
    skill_id: 'MFR-L0-01',
    owner_island: 'MFR',
    level: 0,
    name: 'Angka Satuan 1–10 (الأَرْقَامُ الأَسَاسِيَّة)',
    description: 'Wahid (١) sampai Asyarah (١٠) dengan angka Arab-Hindi',
    audience: 'AD',
    scope: 'Bilangan satuan dasar'
  },
  {
    skill_id: 'MFR-L0-02',
    owner_island: 'MFR',
    level: 0,
    name: 'Spektrum Warna Alami (الأَلْوَانُ البَصَرِيَّة)',
    description: 'Warna primer & sekunder: Ahmar, azraq, akhdhar, abyadh, aswad, ashfar',
    audience: 'AD',
    scope: 'Warna utama benda'
  },
  {
    skill_id: 'MFR-L0-03',
    owner_island: 'MFR',
    level: 0,
    name: 'Keluarga Inti & Kerabat Dekat (الأُسْرَةُ وَالأَقَارِب)',
    description: 'Panggilan silsilah: Ab, Umm, Akh, Ukht, Jadd, Jaddah, Ibn, Bint',
    audience: 'AD',
    scope: 'Silsilah keluarga & kerabat'
  },
  {
    skill_id: 'MFR-L0-04',
    owner_island: 'MFR',
    level: 0,
    name: 'Benda Kelas & Perlengkapan Belajar (أَدَوَاتُ الدِّرَاسَةِ وَالفَصْل)',
    description: 'Kitab, Qalam, Bab, Kursiy, Thawilah, Sabburah, Haqibah, Daftar',
    audience: 'AD',
    scope: 'Peralatan belajar di kelas'
  },
  {
    skill_id: 'MFR-L0-05',
    owner_island: 'MFR',
    level: 0,
    name: 'Ruangan Rumah & Sudut Hunian (أَرْكَانُ البَيْتِ وَالغُرَف)',
    description: 'Bayt, Bab, Nafidzah, Ghurfah, Matbakh, Hammam, Saqf, Jidar',
    audience: 'AD',
    scope: 'Bagian & ruangan rumah'
  },
  {
    skill_id: 'MFR-L0-06',
    owner_island: 'MFR',
    level: 0,
    name: 'Bentuk Geometri & Ukuran Dasar (الأَشْكَالُ وَالمَقَايِيسُ البَسِيطَة)',
    description: 'Dairah (lingkaran), Murabba\' (persegi), Kabir (besar), Shaghir (kecil)',
    audience: 'AD',
    scope: 'Bentuk geometris dan dimensi dasar'
  },

  // Level 1: Mubtadi\' 1 (A1) - Kebutuhan Hayati & Lingkungan Sekitar
  {
    skill_id: 'MFR-L1-01',
    owner_island: 'MFR',
    level: 1,
    name: 'Makanan Pokok & Minuman Segar (الطَّعَامُ وَالشَّرَاب)',
    description: 'Khubz, ma\', halib, aruz, tamr, syay, qahwah, lahm',
    audience: 'AD',
    scope: 'Konsumsi pokok sehari-hari'
  },
  {
    skill_id: 'MFR-L1-02',
    owner_island: 'MFR',
    level: 1,
    name: 'Buah-Buahan & Sayuran Pasar (الفَوَاكِهُ وَالخُضْرَوَات)',
    description: 'Tuffahah, burtuqal, mauz, inab, thimathim, khiyar, basal',
    audience: 'AD',
    scope: 'Hasil bumi & buah pasar'
  },
  {
    skill_id: 'MFR-L1-03',
    owner_island: 'MFR',
    level: 1,
    name: 'Hewan Jinak & Margasatwa (الحَيَوَانَاتُ الأَلِيفَةُ وَالبَرِّيَّة)',
    description: 'Qitthah, samakah, hishan, thair, jamal, asad, fil, ghanam',
    audience: 'AD',
    scope: 'Fauna darat, air, dan gurun'
  },
  {
    skill_id: 'MFR-L1-04',
    owner_island: 'MFR',
    level: 1,
    name: 'Anggota Tubuh & Panca Indra (أَعْضَاءُ الجِسْمِ وَالحَوَاسّ)',
    description: 'Ra\'s, yad, \'ayn, rijl, anaf, fam, udzun, lisan, qalb',
    audience: 'AD',
    scope: 'Anatomi tubuh & indra penangkap'
  },
  {
    skill_id: 'MFR-L1-05',
    owner_island: 'MFR',
    level: 1,
    name: 'Busana, Pakaian & Perhiasan (المَلَابِسُ وَالزِّينَة)',
    description: 'Qamish, tsaub, hidza\', sirwal, qalansuwah, hijab, sa\'ah',
    audience: 'AD',
    scope: 'Pakaian harian dan aksesoris'
  },
  {
    skill_id: 'MFR-L1-06',
    owner_island: 'MFR',
    level: 1,
    name: 'Waktu Harian, Hari & Jam (الأَيَّامُ وَالأَوْقَاتُ وَالسَّاعَة)',
    description: 'Nama 7 hari (Ahad–Sabt), shabah, masa\', lail, nahar, sa\'ah',
    audience: 'AD',
    scope: 'Penanggalan mingguan & ritme waktu'
  },

  // Level 2: Mubtadi\' 2 (A2) - Perabot, Kota, Profesi & Mobilitas
  {
    skill_id: 'MFR-L2-01',
    owner_island: 'MFR',
    level: 2,
    name: 'Perabot Rumah & Perkakas Dapur (الأَثَاثُ وَأَدَوَاتُ المَطْبَخ)',
    description: 'Sarir, khizanah, matbakh, shahn, kub, mil\'aqah, sikkin',
    audience: 'AD',
    scope: 'Perabotan interior & alat makan'
  },
  {
    skill_id: 'MFR-L2-02',
    owner_island: 'MFR',
    level: 2,
    name: 'Fasilitas Publik & Denah Kota (المَرَافِقُ العَامَّةُ وَالمَدِينَة)',
    description: 'Masjid, suq, madrasah, mustasyfa, mathar, hadiqah, funduq, mahathah',
    audience: 'AD',
    scope: 'Fasilitas umum perkotaan'
  },
  {
    skill_id: 'MFR-L2-03',
    owner_island: 'MFR',
    level: 2,
    name: 'Profesi & Ragam Pekerjaan (المِهَنُ وَالوِظَائِفُ المُتَنَوِّعَة)',
    description: 'Thabib, mudarris, muhandis, fallah, syurthiy, tajir, sa\'iq, jundiy',
    audience: 'AD',
    scope: 'Dunia profesi dan karir'
  },
  {
    skill_id: 'MFR-L2-04',
    owner_island: 'MFR',
    level: 2,
    name: 'Sarana Transportasi & Kendaraan (المَوَاصَلَاتُ وَالمَرْكَبَات)',
    description: 'Sayyarah, hafilah, qithar, thairah, safinah, darrajah, syahinah',
    audience: 'AD',
    scope: 'Transportasi darat, laut, udara'
  },
  {
    skill_id: 'MFR-L2-05',
    owner_island: 'MFR',
    level: 2,
    name: 'Kata Kerja Tindakan Harian (الأَفْعَالُ الحَرَكِيَّةُ اليَوْمِيَّة)',
    description: 'Qara\'a, kataba, akala, syariba, dzahaba, raja\'a, nama, istayqazha',
    audience: 'AD',
    scope: 'Fi\'il kegiatan sehari-hari'
  },
  {
    skill_id: 'MFR-L2-06',
    owner_island: 'MFR',
    level: 2,
    name: 'Transaksi Toko, Pasar & Mata Uang (السُّوقُ وَالمُشْتَرَيَاتُ وَالعُمْلَة)',
    description: 'Dinar, dirham, si\'r, thazij, bay\', syira\', hisab, fatirah',
    audience: 'AD',
    scope: 'Perniagaan dan transaksi pasar'
  },

  // Level 3: Mutawassith 1 (B1) - Eksplorasi Alam, Deskripsi & Karakter
  {
    skill_id: 'MFR-L3-01',
    owner_island: 'MFR',
    level: 3,
    name: 'Sifat Fisik, Rupa & Karakter (الصِّفَاتُ وَالطِّبَاعُ الشَّخْصِيَّة)',
    description: 'Kabir/shaghir, thawil/qashir, jamil/qabih, karim/bakhil, syuja\'/juban',
    audience: 'AD',
    scope: 'Sifat kontras fisik dan akhlak'
  },
  {
    skill_id: 'MFR-L3-02',
    owner_island: 'MFR',
    level: 3,
    name: 'Cuaca, Iklim & Musim Alam (الطَّقْسُ وَالمَنَاخُ وَالفُصُول)',
    description: 'Harr/barid, syams, mathar, fasl ash-shayf, asy-syita\', ar-rabi\', al-kharif',
    audience: 'AD',
    scope: 'Kondisi meteorologi & 4 musim'
  },
  {
    skill_id: 'MFR-L3-03',
    owner_island: 'MFR',
    level: 3,
    name: 'Jamak Taksir Berfrekuensi Tinggi (جُمُوعُ التَّكْسِيرِ الشَّائِعَة)',
    description: 'Kutub, aqlam, buyut, rijal, awlad, madaris, masajid, abwab',
    audience: 'AD',
    scope: 'Pola jamak taksir kata benda umum'
  },
  {
    skill_id: 'MFR-L3-04',
    owner_island: 'MFR',
    level: 3,
    name: 'Geografi, Bentang Darat & Samudra (الجُغْرَافِيَا وَالتَّضَارِيسُ وَالبِحَار)',
    description: 'Jabal, nahr, bahr, sahra\', jazirah, buhayrah, wadi, ghabah',
    audience: 'AD',
    scope: 'Geomorfologi dan lanskap alam'
  },
  {
    skill_id: 'MFR-L3-05',
    owner_island: 'MFR',
    level: 3,
    name: 'Kesehatan, Keluhan Medis & Obat (الصِّحَّةُ وَالأَعْرَاضُ وَالعِلَاج)',
    description: 'Sihhah, maradh, alam, humma, suda\', dawa\', syifa\', thabib',
    audience: 'AD',
    scope: 'Dunia medis & perawatan tubuh'
  },
  {
    skill_id: 'MFR-L3-06',
    owner_island: 'MFR',
    level: 3,
    name: 'Hobi, Olahraga & Rekreasi (الهِوَايَاتُ وَالرِّيَاضَةُ وَالتَّرْفِيه)',
    description: 'Riyadhah, kurat al-qadam, sibahah, rasm, qira\'ah, safar, rihlah',
    audience: 'AD',
    scope: 'Aktivitas santai dan kebugaran'
  },

  // Level 4: Mutawassith 2 (B2) - Sains, Digital, Bisnis & Media
  {
    skill_id: 'MFR-L4-01',
    owner_island: 'MFR',
    level: 4,
    name: 'Sains, Komputasi & Jagat Digital (العُلُومُ وَالتِّقْنِيَاتُ الرَّقْمِيَّة)',
    description: 'Hasub, hatif, syabakah, kahraba\', bahts, barnamaj, malaf, fada\'',
    audience: 'D',
    scope: 'Sains modern & perangkat keras/lunak'
  },
  {
    skill_id: 'MFR-L4-02',
    owner_island: 'MFR',
    level: 4,
    name: 'Media Massa, Jurnalistik & Siaran (الإِعْلَامُ وَالصِّحَافَةُ وَالبَثّ)',
    description: 'Jaridah, majallah, akhbar, qanah, idza\'ah, muqabalah, khabar',
    audience: 'D',
    scope: 'Dunia pers & pemberitaan publik'
  },
  {
    skill_id: 'MFR-L4-03',
    owner_island: 'MFR',
    level: 4,
    name: 'Dunia Bisnis, Kantor & Manajemen (الأَعْمَالُ وَالشَّرِكَاتُ وَالإِدَارَة)',
    description: 'Syarikah, idarah, mudir, mashraf, aqd, istitsmar, muwazhzhaf',
    audience: 'D',
    scope: 'Organisasi perusahaan & tata kelola'
  },
  {
    skill_id: 'MFR-L4-04',
    owner_island: 'MFR',
    level: 4,
    name: 'Lingkungan Hidup, Ekologi & Energi (البِيئَةُ وَالإِيكُولُوجِيَا وَالطَّاقَة)',
    description: 'Bi\'ah, talawwuts, himayah, thaqah mutajaddidah, manakh, tabadul',
    audience: 'D',
    scope: 'Konservasi alam dan transisi hijau'
  },
  {
    skill_id: 'MFR-L4-05',
    owner_island: 'MFR',
    level: 4,
    name: 'Idiom & Ungkapan Bahasa Populer (التَّعَابِيرُ الاِصْطِلَاحِيَّةُ وَالأَمْثَال)',
    description: 'Yadan bi-yad, min samim al-qalb, \'ala qadami wa saq, la budda minhu',
    audience: 'D',
    scope: 'Frasa idiomatik & metafora lisan fasih'
  },
  {
    skill_id: 'MFR-L4-06',
    owner_island: 'MFR',
    level: 4,
    name: 'Pariwisata, Tiket & Perjalanan Udara (السِّيَاحَةُ وَالفَنَادِقُ وَالسَّفَر)',
    description: 'Jawaz as-safar, ta\'syirah, tadzkirah, rihlah jawwiyyah, hajaz, mat-haf',
    audience: 'D',
    scope: 'Mobilitas wisata internasional'
  },

  // Level 5: Mutaqaddim (C1-C2) - Diplomasi, Retorika, Sastra & Turats
  {
    skill_id: 'MFR-L5-01',
    owner_island: 'MFR',
    level: 5,
    name: 'Presisi Nuansa Sinonim / Taraduf (الفُرُوقُ اللُّغَوِيَّةُ وَالتَّرَادُفُ الدَّقِيق)',
    description: 'Farah vs Surur, Mathar vs Ghayth, Jalasa vs Qa\'ada, A\'thiy vs Wahaba',
    audience: 'D',
    scope: 'Rasa bahasa dan perbedaan halus sinonim'
  },
  {
    skill_id: 'MFR-L5-02',
    owner_island: 'MFR',
    level: 5,
    name: 'Diplomasi, Hukum Internasional & Protokol (الدِّبْلُومَاسِيَّةُ وَالقَانُونُ الدَّوْلِيّ)',
    description: 'Sifarah, safir, mu\'ahadah, ittifaqiyyah, siyadah, qanun, mufawadzat',
    audience: 'D',
    scope: 'Hubungan antar-bangsa & hukum publik'
  },
  {
    skill_id: 'MFR-L5-03',
    owner_island: 'MFR',
    level: 5,
    name: 'Sastra Arab, Estetika & Balaghah (الأَدَبُ وَالبَلَاغَةُ وَالفُنُونُ النَّثْرِيَّة)',
    description: 'Syi\'r, qasidah, nathr, bayt, isti\'arah, kinayah, bahr, saja\'',
    audience: 'D',
    scope: 'Kritik sastra & estetika bahasa Arab tinggi'
  },
  {
    skill_id: 'MFR-L5-04',
    owner_island: 'MFR',
    level: 5,
    name: 'Filsafat, Pemikiran Kritis & Peradaban (الفِكْرُ وَالفَلْسَفَةُ وَالحَضَارَة)',
    description: 'Falsafah, burhan, aql, manthiq, hadharah, wujud, ma\'rifah',
    audience: 'D',
    scope: 'Diskursus epistemologi & sejarah pemikiran'
  },
  {
    skill_id: 'MFR-L5-05',
    owner_island: 'MFR',
    level: 5,
    name: 'Ekonomi Makro, Pasar Modal & Moneter (الاِقْتِصَادُ الكُلِّيُّ وَالأَسْوَاقُ المَالِيَّة)',
    description: 'Iqtishad, tadakhkhum, aswaq maliyyah, fa\'idah, riyadhah maliyyah',
    audience: 'D',
    scope: 'Teori ekonomi, fiskal, dan bursa efek'
  },
  {
    skill_id: 'MFR-L5-06',
    owner_island: 'MFR',
    level: 5,
    name: 'Khazanah Kosa Kata Klasik Turats & Qur\'ani (مُفْرَدَاتُ التُّرَاثِ وَالبَيَانِ القُرْآنِيّ)',
    description: 'Furqan, hikmah, burhan, falah, basyir, nadzir, ghayb, sakinah',
    audience: 'D',
    scope: 'Leksikon Al-Qur\'an dan khazanah klasik Islam'
  },
  // HWR - Kampung Hiwar (24 Skill Progresif: Percakapan Nyata, Adab & Retorika Lisan)
  // Level 0: Tamhidi (Pra-A1)
  {
    skill_id: 'HWR-L0-01',
    owner_island: 'HWR',
    level: 0,
    name: 'Salam & Sapaan Waktu (التَّحِيَّات وَالتَّرْحِيب)',
    description: 'Mengucapkan dan membalas ucapan salam islami (Assalamu alaikum) serta sapaan waktu (shabah al-khayr, masa al-khayr, ahlan wa sahlan)',
    audience: 'AD',
    scope: 'Etika menyapa & membalas salam islami'
  },
  {
    skill_id: 'HWR-L0-02',
    owner_island: 'HWR',
    level: 0,
    name: 'Perkenalan Diri & Nama (التَّعَارُف وَالِاسْم)',
    description: 'Menanyakan dan menyebutkan nama diri (Ma ismuka/ismuki? Ismi...) serta ucapan sambutan hangat (Tasyarrafna)',
    audience: 'AD',
    scope: 'Perkenalan identitas dasar'
  },
  {
    skill_id: 'HWR-L0-03',
    owner_island: 'HWR',
    level: 0,
    name: 'Menunjuk Benda di Sekitar (الإِشَارَةُ إِلَى الأَشْيَاءِ)',
    description: 'Menanyakan nama benda sekitar (Ma hadha? Ma hadhihi?) dan menjawab nama perabot serta benda kelas',
    audience: 'AD',
    scope: 'Identifikasi objek lingkungan terdekat'
  },
  {
    skill_id: 'HWR-L0-04',
    owner_island: 'HWR',
    level: 0,
    name: 'Ucapan Perpisahan & Doa Musafir (الوَدَاع وَالمُغَادَرَة)',
    description: 'Mengucapkan kalimat pamit santun (Ma\'as salamah, Ila al-liqa\', Fi amanillah) saat mengakhiri obrolan',
    audience: 'AD',
    scope: 'Etika menutup pertemuan & doa keselamatan'
  },

  // Level 1: Mubtadi' 1 (A1.1)
  {
    skill_id: 'HWR-L1-01',
    owner_island: 'HWR',
    level: 1,
    name: 'Menanyakan & Mengabarkan Kondisi (السُّؤَال عَنِ الحَال)',
    description: 'Menanyakan kondisi sahabat (Kayfa haluka/haluki?) dan merespons dengan penuh syukur (Al-hamdu lillahi bi-khayr wa \'afiyah)',
    audience: 'AD',
    scope: 'Interaksi hangat menanyakan kondisi'
  },
  {
    skill_id: 'HWR-L1-02',
    owner_island: 'HWR',
    level: 1,
    name: 'Kesantunan, Izin & Syukur (عِبَارَات الشُّكْر وَالِاعْتِذَار)',
    description: 'Menggunakan frasa kesantunan: syukran jazilan, \'afwan, min fadhlika, law samahta, asif jiddan',
    audience: 'AD',
    scope: 'Etika percakapan sopan & permohonan maaf'
  },
  {
    skill_id: 'HWR-L1-03',
    owner_island: 'HWR',
    level: 1,
    name: 'Asal Negara & Kebangsaan (الجِنْسِيَّة وَالبَلَد)',
    description: 'Menanyakan tempat asal (Min ayna anta?) dan menjawab identitas kebangsaan (Ana min Indunisiya, ana Indunisiyy)',
    audience: 'AD',
    scope: 'Menyebutkan asal negara & kota'
  },
  {
    skill_id: 'HWR-L1-04',
    owner_island: 'HWR',
    level: 1,
    name: 'Pekerjaan & Profesi Sehari-hari (المِهْنَة وَالعَمَل)',
    description: 'Menanyakan dan menjelaskan pekerjaan (Madha ta\'malu? Ana thalibun / mudarrisun / thabibun / muhandisun)',
    audience: 'AD',
    scope: 'Pertukaran informasi profesi & keseharian'
  },

  // Level 2: Mubtadi' 2 (A1.2)
  {
    skill_id: 'HWR-L2-01',
    owner_island: 'HWR',
    level: 2,
    name: 'Transaksi di Pasar Tradisional (التَّسَوُّق فِي السُّوق)',
    description: 'Menanyakan harga (Bikam hadha?), memesan jumlah timbangan, dan menawar secara ramah santun',
    audience: 'AD',
    scope: 'Tanya harga, memesan barang, negosiasi ramah'
  },
  {
    skill_id: 'HWR-L2-02',
    owner_island: 'HWR',
    level: 2,
    name: 'Pemesanan Hidangan di Restoran & Kafe (فِي المَطْعَم وَالمَقْهَى)',
    description: 'Meminta menu makanan (Qa\'imat ath-tha\'am), memesan teh kurma / makanan berat, dan meminta tagihan santun (Al-hisab law samahta)',
    audience: 'AD',
    scope: 'Pemesanan kuliner dan etika bersantap'
  },
  {
    skill_id: 'HWR-L2-03',
    owner_island: 'HWR',
    level: 2,
    name: 'Navigasi Arah & Landmark Kota (السُّؤَال عَنِ الِاتِّجَاهَات)',
    description: 'Menanyakan letak tempat umum (Ayna al-masjid / al-funduq / al-mustasyfa?) dan memahami petunjuk belokan arah',
    audience: 'AD',
    scope: 'Navigasi jalan, kompas arah kota'
  },
  {
    skill_id: 'HWR-L2-04',
    owner_island: 'HWR',
    level: 2,
    name: 'Silaturahmi Keluarga & Keramahan Tamu (حِوَار الأُسْرَة وَالضِّيَافَة)',
    description: 'Memperkenalkan anggota keluarga (Hadha abi, tilka ummi) dan mempraktikkan adab menyambut tamu ke rumah',
    audience: 'AD',
    scope: 'Memperkenalkan kerabat & menerima tamu'
  },

  // Level 3: Mutawassith 1 (A2.1)
  {
    skill_id: 'HWR-L3-01',
    owner_island: 'HWR',
    level: 3,
    name: 'Konsultasi Medis di Klinik / RS (فِي العِيَادَة وَالمُسْتَشْفَى)',
    description: 'Menjelaskan gejala sakit (Asy\'uru bi-alamin fi ra\'si / bathni), menanyakan aturan obat, dan mendoakan kesembuhan (Syafakallah)',
    audience: 'AD',
    scope: 'Menyampaikan keluhan fisik & instruksi medis'
  },
  {
    skill_id: 'HWR-L3-02',
    owner_island: 'HWR',
    level: 3,
    name: 'Tiket, Bandara & Penerbangan (فِي المَطَار وَحَجْزِ السَّفَر)',
    description: 'Prosedur check-in tiket, paspor, boarding pass (Bithaqatu su\'udith tha\'irah), serta tata cara bertanya informasi penerbangan',
    audience: 'AD',
    scope: 'Prosedur imigrasi, tiket, percakapan safar'
  },
  {
    skill_id: 'HWR-L3-03',
    owner_island: 'HWR',
    level: 3,
    name: 'Peminjaman Buku di Perpustakaan (فِي المَكْتَبَة وَالبَحْثِ العِلْمِي)',
    description: 'Mencari katalog buku rujukan, bertanya kepada pustakawan, dan prosedur peminjaman (Isti\'aratul kutub)',
    audience: 'AD',
    scope: 'Dialog literatur ilmiah & layanan perpustakaan'
  },
  {
    skill_id: 'HWR-L3-04',
    owner_island: 'HWR',
    level: 3,
    name: 'Pengaturan Jadwal & Janji Temu (تَحْدِيدُ المَوْعِد وَالوَقْت)',
    description: 'Menyepakati waktu pertemuan (Mata naltaqi? Ghadan ba\'da shalatil \'ashr), konfirmasi hadir, dan rescheduling sopan',
    audience: 'AD',
    scope: 'Manajemen janji temu & ketepatan waktu'
  },

  // Level 4: Mutawassith 2 (A2.2)
  {
    skill_id: 'HWR-L4-01',
    owner_island: 'HWR',
    level: 4,
    name: 'Diskusi Halaqah & Argumen Santun (إِبْدَاء الرَّأْي وَالحِوَار الفِكْرِي)',
    description: 'Menyampaikan sudut pandang (Fi ra\'yi, uwafiquka ar-ra\'ya), memberikan alasan logis, dan menyanggah secara elegan',
    audience: 'D',
    scope: 'Menyampaikan argumen sopan & bertukar gagasan'
  },
  {
    skill_id: 'HWR-L4-02',
    owner_island: 'HWR',
    level: 4,
    name: 'Wawancara Kerja & Keahlian Profesional (المُقَابَلَة الشَّخْصِيَّة)',
    description: 'Menjawab pertanyaan wawancara tentang latar belakang pendidikan, kompetensi bahasa Arab, dan motivasi kerja',
    audience: 'D',
    scope: 'Wawancara profesional & presentasi kompetensi'
  },
  {
    skill_id: 'HWR-L4-03',
    owner_island: 'HWR',
    level: 4,
    name: 'Penyelesaian Masalah & Komplain Etis (حَلُّ المُشْكِلَات وَالشَّكَاوَى)',
    description: 'Menyampaikan ketidaksesuaian layanan di hotel/toko tanpa emosi, dan merumuskan solusi win-win secara bijak',
    audience: 'D',
    scope: 'Negosiasi komplain pelanggan beretika'
  },
  {
    skill_id: 'HWR-L4-04',
    owner_island: 'HWR',
    level: 4,
    name: 'Membicarakan Budaya, Tradisi & Hobi (الهِوَايَات وَالتَّقَالِيد)',
    description: 'Bercakap-cakap mendalam mengenai tradisi perayaan hari raya, seni kaligrafi, dan hobi literasi dengan sahabat Arab',
    audience: 'D',
    scope: 'Pertukaran wawasan budaya & tradisi'
  },

  // Level 5: Mutaqaddim (B1-B2)
  {
    skill_id: 'HWR-L5-01',
    owner_island: 'HWR',
    level: 5,
    name: 'Diplomasi Lisan & Retorika Fashih (البَلَاغَة الحِوَارِيَّة وَالتَّفَاوُض)',
    description: 'Menggunakan uslub balaghah santun, kiasan fasih, dan taktik diplomasi dalam forum perundingan resmi',
    audience: 'D',
    scope: 'Kepiawaian retorika & negosiasi tingkat tinggi'
  },
  {
    skill_id: 'HWR-L5-02',
    owner_island: 'HWR',
    level: 5,
    name: 'Debat Akademik & Kritik Konstruktif (المُنَاظَرَة وَالنَّقْدُ البَنَّاء)',
    description: 'Mengemukakan dalil dan analogi rasional dalam debat ilmiah serta menyanggah kelemahan premis lawan tanpa merendahkan',
    audience: 'D',
    scope: 'Debat dialektika & perdebatan ilmiah'
  },
  {
    skill_id: 'HWR-L5-03',
    owner_island: 'HWR',
    level: 5,
    name: 'Wawancara Media & Analisis Isu Publik (الحِوَار الصَّحَفِي وَالإِعْلَامِي)',
    description: 'Menjawab pertanyaan wartawan media massa, memberikan tanggapan isu terkini dengan bahasa Fusha berstandar pers',
    audience: 'D',
    scope: 'Komunikasi media massa & juru bicara'
  },
  {
    skill_id: 'HWR-L5-04',
    owner_island: 'HWR',
    level: 5,
    name: 'Orasi Hikmah & Khutbah Wasiat (خُطَبُ الوَدَاع وَالمَوْعِظَة)',
    description: 'Menyampaikan kalimat nasihat perpisahan yang menggugah kalbu, petuah kebajikan, dan untaian doa penutup majelis',
    audience: 'D',
    scope: 'Orasi penutupan & nasihat kebijaksanaan'
  },
  // QWD - Gunung Qawa'id (30 Skill Nahwu & Sharaf Terstruktur Progresif: L1-L5)
  // Level 1: Mubtadi' (A1) - Fondasi Tata Bahasa & Klasifikasi Kata
  {
    skill_id: 'QWD-L1-01',
    owner_island: 'QWD',
    level: 1,
    name: 'Pembagian Kata: Isim, Fi\'il, & Harf (أَقْسَامُ الكَلَام)',
    description: 'Mengenal 3 pilar kata bahasa Arab: ciri isim (tanwin/alif-lam), fi\'il (waktu), dan harf',
    audience: 'AD',
    scope: 'Klasifikasi kata tata bahasa dasar'
  },
  {
    skill_id: 'QWD-L1-02',
    owner_island: 'QWD',
    level: 1,
    name: 'Isim Nakirah & Ma\'rifah (النَّكِرَةُ وَالمَعْرِفَة)',
    description: 'Perbedaan benda umum bertanwin (كِتَابٌ) vs benda tertentu ber-Alif Lam (الكِتَابُ)',
    audience: 'AD',
    scope: 'Status ketertentuan kata benda'
  },
  {
    skill_id: 'QWD-L1-03',
    owner_island: 'QWD',
    level: 1,
    name: 'Gender Kata: Mudzakkar & Muannats (المُذَكَّرُ وَالمُؤَنَّث)',
    description: 'Ciri ta\' marbuthah (ـة), muannats hakiki vs majazi, dan keselarasan sifat (Na\'at)',
    audience: 'AD',
    scope: 'Gender kata dan kesesuaian sifat'
  },
  {
    skill_id: 'QWD-L1-04',
    owner_island: 'QWD',
    level: 1,
    name: 'Isim Isyarah Dekat: Hadha & Hadhihi (أَسْمَاءُ الإِشَارَةِ لِلْقَرِيب)',
    description: 'Menunjuk benda tunggal dekat maskulin (hādhā) dan feminin (hādhihi)',
    audience: 'AD',
    scope: 'Kata tunjuk dekat dasar'
  },
  {
    skill_id: 'QWD-L1-05',
    owner_island: 'QWD',
    level: 1,
    name: 'Tanda Asli Kata Tunggal: Isim Mufrad (المُفْرَدُ وَعَلَامَاتُهُ)',
    description: 'Tanda i\'rab asli isim mufrad: dhommah rafa\', fathah nashab, kasrah jar',
    audience: 'AD',
    scope: 'I\'rab kata benda tunggal'
  },
  {
    skill_id: 'QWD-L1-06',
    owner_island: 'QWD',
    level: 1,
    name: 'Kata Tanya Formal: Adawatul Istifham (أَدَوَاتُ الِاسْتِفْهَام)',
    description: 'Menyusun kalimat tanya berkaidah nahwu: Ma, Man, Hal, Ayna, Kaifa, Kam',
    audience: 'AD',
    scope: 'Partikel tanya dan susunannya'
  },

  // Level 2: Asasi (A2) - Kalimat Ismiyyah, Preposisi, Zharaf & Idhafah
  {
    skill_id: 'QWD-L2-01',
    owner_island: 'QWD',
    level: 2,
    name: 'Kalimat Nominal: Mubtada\' & Khabar (الجُمْلَةُ الِاسْمِيَّة)',
    description: 'Susunan subjek dan predikat berstatus Marfu\' dengan dhommah (الوَلَدُ نَشِيطٌ)',
    audience: 'AD',
    scope: 'Struktur dasar kalimat nominal'
  },
  {
    skill_id: 'QWD-L2-02',
    owner_island: 'QWD',
    level: 2,
    name: 'Ragam Bentuk Khabar (أَنْوَاعُ الخَبَر)',
    description: 'Predikat kata tunggal, frasa jar-majrur, dan frasa keterangan (Syibhul Jumlah)',
    audience: 'AD',
    scope: 'Variasi predikat nominal'
  },
  {
    skill_id: 'QWD-L2-03',
    owner_island: 'QWD',
    level: 2,
    name: 'Huruf Jar & Isim Majrur (حُرُوفُ الجَرِّ وَعَمَلُهَا)',
    description: 'Preposisi fī, ʿalā, min, ilā, ʿan, bi-, li- yang mengkasrahkan kata setelahnya',
    audience: 'AD',
    scope: 'I\'rab jar pada isim mufrad'
  },
  {
    skill_id: 'QWD-L2-04',
    owner_island: 'QWD',
    level: 2,
    name: 'Zharaf Makan & Zharaf Zaman (ظَرْفُ المَكَانِ وَالزَّمَان)',
    description: 'Keterangan posisi tempat (amāma, khalfa, fawqa, taḥta) dan waktu (shabāḥan, masāʾan)',
    audience: 'AD',
    scope: 'Kata keterangan posisi dan waktu manshub'
  },
  {
    skill_id: 'QWD-L2-05',
    owner_island: 'QWD',
    level: 2,
    name: 'Konsep Kepemilikan Idhafah (المُضَافُ وَالمُضَافُ إِلَيْه)',
    description: 'Penyandaran dua kata: Mudhaf tanpa alif-lam/tanwin + Mudhaf Ilaih majrur',
    audience: 'AD',
    scope: 'Frasa kepemilikan genitif (cth: كِتَابُ الطَّالِبِ)'
  },
  {
    skill_id: 'QWD-L2-06',
    owner_island: 'QWD',
    level: 2,
    name: 'Dhomir Munfashil & Muttashil (الضَّمَائِرُ المُنْفَصِلَةُ وَالمُتَّصِلَة)',
    description: 'Kata ganti lepas (huwa, hiya, anta, ana) dan kata ganti bersambung (-hu, -ha, -ka, -i, -na)',
    audience: 'AD',
    scope: 'Pronomina independen dan dependen'
  },

  // Level 3: Mutawassith 1 (B1) - Kalimat Fi'liyyah, Dual, Jamak & Sharaf Dasar
  {
    skill_id: 'QWD-L3-01',
    owner_island: 'QWD',
    level: 3,
    name: 'Kalimat Verbal: Fi\'il Madhi & Fa\'il (الجُمْلَةُ الفِعْلِيَّة: فِعْلٌ مَاضٍ + فَاعِل)',
    description: 'Struktur kata kerja lampau dan subjek pelaku marfu\' (cth: قَرَأَ زَيْدٌ)',
    audience: 'AD',
    scope: 'Sintaksis kalimat kata kerja lampau'
  },
  {
    skill_id: 'QWD-L3-02',
    owner_island: 'QWD',
    level: 3,
    name: 'Objek Kalimat Manshub: Maf\'ul Bih (المَفْعُولُ بِهِ)',
    description: 'Objek sasaran perbuatan berharakat Fathah manshub (cth: شَرِبَ الوَلَدُ المَاءَ)',
    audience: 'AD',
    scope: 'Kasus akusatif objek isim mufrad'
  },
  {
    skill_id: 'QWD-L3-03',
    owner_island: 'QWD',
    level: 3,
    name: 'Fi\'il Mudhari\' Marfu\' & Huruf Mudhara\'ah (الفِعْلُ المُضَارِعُ المَرْفُوع)',
    description: 'Kata kerja masa kini/mendatang berawalan Anaytu berharakat dhommah (يَكْتُبُ)',
    audience: 'AD',
    scope: 'Struktur fi\'il mudhari\' dasar'
  },
  {
    skill_id: 'QWD-L3-04',
    owner_island: 'QWD',
    level: 3,
    name: 'Bentuk Ganda / Mutsanna & I\'rabnya (المُثَنَّى: رَفْعًا بِالأَلِف وَنَصْبًا/جَرًّا بِاليَاء)',
    description: 'Mengubah isim mufrad menjadi dual: akhiran -āni saat rafa\' dan -ayni saat nashab/jar',
    audience: 'AD',
    scope: 'Morfologi dan i\'rab bilangan dual'
  },
  {
    skill_id: 'QWD-L3-05',
    owner_island: 'QWD',
    level: 3,
    name: 'Jamak Mudzakkar & Muannats Salim (جَمْعُ المُذَكَّرِ وَالمُؤَنَّثِ السَّالِم)',
    description: 'Akhiran -ūna/-īna untuk laki-laki, -ātun/-ātin untuk perempuan beserta hukum i\'rabnya',
    audience: 'AD',
    scope: 'Plural regular regulasi i\'rab'
  },
  {
    skill_id: 'QWD-L3-06',
    owner_island: 'QWD',
    level: 3,
    name: 'Morfologi Sharaf: Wazan Tsulatsi Mujarrad (أَوْزَانُ الفِعْلِ الثُّلَاثِيّ المُجَرَّد)',
    description: 'Pola fa\'ala-yaf\'ulu (نَصَرَ-يَنْصُرُ), fa\'ala-yaf\'ilu (ضَرَبَ-يَضْرِبُ), fa\'ala-yaf\'alu (فَتَحَ-يَفْتَحُ)',
    audience: 'AD',
    scope: 'Timbangan akar kata kerja 3 huruf'
  },

  // Level 4: Mutawassith 2 (B2) - Nawasikh, Adawat Nashab-Jazm, Fi'il Amr & Tashrif
  {
    skill_id: 'QWD-L4-01',
    owner_island: 'QWD',
    level: 4,
    name: 'Saudara Kaana & Pengaruh I\'rab (كَانَ وَأَخَوَاتُهَا)',
    description: 'Rafa\' isim Kaana dan nashab khabar Kaana (cth: كَانَ الجَوُّ بَارِدًا)',
    audience: 'D',
    scope: 'Nawasikh al-Ibtida\' bab Kaana'
  },
  {
    skill_id: 'QWD-L4-02',
    owner_island: 'QWD',
    level: 4,
    name: 'Saudara Inna & Pengaruh I\'rab (إِنَّ وَأَخَوَاتُهَا)',
    description: 'Nashab isim Inna dan rafa\' khabar Inna untuk penguat taukid (إِنَّ العِلْمَ نُورٌ)',
    audience: 'D',
    scope: 'Nawasikh al-Ibtida\' bab Inna'
  },
  {
    skill_id: 'QWD-L4-03',
    owner_island: 'QWD',
    level: 4,
    name: 'Huruf Penashab Fi\'il Mudhari\' (أَدَوَاتُ نَصْبِ المُضَارِع: أَنْ، لَنْ، كَيْ)',
    description: 'Partikel penashab yang mengubah vokal akhir kata kerja menjadi fathah (لَنْ يَذْهَبَ)',
    audience: 'D',
    scope: 'Sintaksis subjungtif kata kerja'
  },
  {
    skill_id: 'QWD-L4-04',
    owner_island: 'QWD',
    level: 4,
    name: 'Huruf Penjazm Fi\'il Mudhari\' (أَدَوَاتُ جَزْمِ المُضَارِع: لَمْ، لَامُ الأَمْر، لَا النَّاهِيَة)',
    description: 'Partikel penjuzuk yang mensukunkan kata kerja atau membuang huruf nun (لَمْ يَكْتُبْ)',
    audience: 'D',
    scope: 'Sintaksis jusif kata kerja'
  },
  {
    skill_id: 'QWD-L4-05',
    owner_island: 'QWD',
    level: 4,
    name: 'Kata Kerja Perintah: Fi\'il Amr (فِعْلُ الأَمْرِ وَبِنَاؤُهُ)',
    description: 'Membentuk kalimat instruksi suruhan: uktub, iqra\', ijlis berdasarkan fi\'il mudhari\'',
    audience: 'D',
    scope: 'Morfologi kata kerja imperatif'
  },
  {
    skill_id: 'QWD-L4-06',
    owner_island: 'QWD',
    level: 4,
    name: 'Tashrif Lughawi 14 Dhomir (التَّصْرِيفُ اللُّغَوِيُّ لِلْأَفْعَال)',
    description: 'Konjugasi kata kerja lengkap 14 kata ganti dari Huwa hingga Nahnu (fa\'ala s/d fa\'alna)',
    audience: 'D',
    scope: 'Tabel konjugasi pronomina lengkap'
  },

  // Level 5: Mutaqaddim (C1-C2) - I'rab Lanjut, Mamnu' min ash-Sharf, Musytaqqat & Tawabi'
  {
    skill_id: 'QWD-L5-01',
    owner_island: 'QWD',
    level: 5,
    name: 'Tanda I\'rab Pokok & Cabang Pengganti (عَلَامَاتُ الإِعْرَابِ الأَصْلِيَّةُ وَالفَرْعِيَّة)',
    description: 'Analisis menyeluruh dhommah/waw/alif/nun (rafa\'), fathah/kasrah/ya (nashab/jar)',
    audience: 'D',
    scope: 'Penguasaan sistematis seluruh cabang i\'rab'
  },
  {
    skill_id: 'QWD-L5-02',
    owner_island: 'QWD',
    level: 5,
    name: 'Isim Terlarang Bertanwin: Mamnu\' min ash-Sharf (المَمْنُوعُ مِنَ الصَّرْف)',
    description: 'Kaidah isim tanpa tanwin dan bertanda kasrah diganti fathah saat majrur (masājida, Aḥmada)',
    audience: 'D',
    scope: 'Nomina diptot dalam tata bahasa Arab'
  },
  {
    skill_id: 'QWD-L5-03',
    owner_island: 'QWD',
    level: 5,
    name: 'Isim Musytaq: Isim Fa\'il & Isim Maf\'ul (مُشْتَقَّاتُ الأَسْمَاء: الفَاعِل وَالمَفْعُول)',
    description: 'Membentuk pelaku (fa\'il: كَاتِب) dan objek penderita (maf\'ul: مَكْتُوب) tsulatsi & mazid',
    audience: 'D',
    scope: 'Derivasi partisipel aktif dan pasif'
  },
  {
    skill_id: 'QWD-L5-04',
    owner_island: 'QWD',
    level: 5,
    name: 'Isim Musytaq: Isim Makan, Zaman, & Alat (أَسْمَاءُ المَكَانِ وَالزَّمَانِ وَالآلَة)',
    description: 'Wazan maf\'al (maktab), maf\'il (masjid), mif\'al (mibrad), mif\'alah (mil\'aqah)',
    audience: 'D',
    scope: 'Derivasi nomina instrumen dan lokatif'
  },
  {
    skill_id: 'QWD-L5-05',
    owner_island: 'QWD',
    level: 5,
    name: 'Aturan Pengikut I\'rab: At-Tawabi\' (التَّوَابِع: النَّعْت، العَطْف، التَّوْكِيد، البَدَل)',
    description: 'Empat konstruksi sintaksis yang harakatnya tunduk penuh pada kata sebelumnya',
    audience: 'D',
    scope: 'Sintaksis kata bawahan fleksibel'
  },
  {
    skill_id: 'QWD-L5-06',
    owner_island: 'QWD',
    level: 5,
    name: 'Analisis I\'rab Aplikatif Teks Klasik (الإِعْرَابُ التَّطْبِيقِيُّ فِي النُّصُوصِ الفَصِيحَة)',
    description: 'Bedah sintaksis komprehensif ayat Al-Qur\'an, matan jurumiyyah, dan bait hikmah sastra',
    audience: 'D',
    scope: 'Aplikasi i\'rab tingkat tinggi pada teks autentik'
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
  // KTB - Pelabuhan Kitabah (Tulis, Imla' & Kaligrafi) - 16 Lembar Jenjang Progresif
  {
    skill_id: 'KTB-L0-01',
    owner_island: 'KTB',
    level: 0,
    name: '6 Huruf Pemutus Kiri (ا د ذ ر ز و)',
    description: 'Menuliskan bentuk huruf pemutus kiri (munfashilah) yang tidak bersambung ke huruf setelahnya',
    audience: 'AD',
    scope: 'Ortografi dasar huruf pemutus kiri'
  },
  {
    skill_id: 'KTB-L0-02',
    owner_island: 'KTB',
    level: 0,
    name: 'Bentuk Huruf Sambung Awal, Tengah, & Akhir',
    description: 'Menuliskan perubahan visual huruf hijaiyah saat di posisi awal (بـ), tengah (ـبـ), dan akhir (ـب)',
    audience: 'AD',
    scope: 'Bentuk posisi huruf sambung'
  },
  {
    skill_id: 'KTB-L0-03',
    owner_island: 'KTB',
    level: 0,
    name: 'Goresan Gigi Huruf & Proporsi Khath Naskh',
    description: 'Membedakan jumlah gerigi huruf (س vs ش) dan mangkok lekukan (ص vs ض) dalam buku tulis bergaris',
    audience: 'AD',
    scope: 'Proporsi fisik pena naskh'
  },
  {
    skill_id: 'KTB-L1-01',
    owner_island: 'KTB',
    level: 1,
    name: 'Imla\' Ta\' Marbuthah (ـة/ة) vs Ta\' Maftuhah (ت) vs Ha\' (ـه)',
    description: 'Membedakan bunyi h saat waqaf (ta marbuthah), t permanen (ta maftuhah), dan kata ganti ha dhamir',
    audience: 'AD',
    scope: 'Ortografi ta marbuthah dan ha dhamir'
  },
  {
    skill_id: 'KTB-L1-02',
    owner_island: 'KTB',
    level: 1,
    name: 'Imla\' Alif Lam Qamariyyah (Sukun) vs Syamsiyyah (Syaddah)',
    description: 'Menuliskan alif lam yang berharakat sukun jelas (Qamariyyah) dan ber-syaddah lebur (Syamsiyyah)',
    audience: 'AD',
    scope: 'Ortografi Alif Lam Syamsiyyah & Qamariyyah'
  },
  {
    skill_id: 'KTB-L1-03',
    owner_island: 'KTB',
    level: 1,
    name: 'Kaidah Ejaan Tanwin & Alif Penopang Fathatain',
    description: 'Menuliskan alif penopang fathatain (كِتَابًا) dan pengecualiannya pada ta marbuthah (مَدْرَسَةً) serta hamzah (مَاءً)',
    audience: 'AD',
    scope: 'Kaidah tanwin fathatain dan alif penopang'
  },
  {
    skill_id: 'KTB-L2-01',
    owner_island: 'KTB',
    level: 2,
    name: 'Hamzah Qath\' (أَ إِ أُ) vs Hamzah Washal (اِ اُ)',
    description: 'Membedakan hamzah kepala ain tetap terbaca dengan hamzah washal yang lebur di tengah kalimat menggunakan uji huruf Wawu/Fa',
    audience: 'AD',
    scope: 'Hamzah qath\' dan hamzah washal'
  },
  {
    skill_id: 'KTB-L2-02',
    owner_island: 'KTB',
    level: 2,
    name: 'Hamzah Mutatharrifah di Akhir Kata',
    description: 'Menentukan rumah hamzah di ujung kata sesuai harakat huruf sebelumnya (di atas alif, waw, ya, atau baris)',
    audience: 'AD',
    scope: 'Hamzah mutatharrifah di akhir kata'
  },
  {
    skill_id: 'KTB-L2-03',
    owner_island: 'KTB',
    level: 2,
    name: 'Format Kartu Pos Korespondensi Sahabat (Tahni\'ah)',
    description: 'Menulis kartu ucapan selamat hari raya, doa kesembuhan, dan ucapan terima kasih dengan ejaan indah',
    audience: 'AD',
    scope: 'Penulisan kartu pos korespondensi'
  },
  {
    skill_id: 'KTB-L3-01',
    owner_island: 'KTB',
    level: 3,
    name: 'Tanda Baca Arab (Tarqim: ، : ؟ ! « »)',
    description: 'Menerapkan tanda koma Arab terbalik (،), titik dua (:), tanda tanya (؟), dan tanda seru (!) dalam teks',
    audience: 'AD',
    scope: 'Tanda baca tarqim & insya\' muwajjah'
  },
  {
    skill_id: 'KTB-L3-02',
    owner_island: 'KTB',
    level: 3,
    name: 'Alif Layyinah: Alif Maqshurah (ى) vs Mamdudah (ا)',
    description: 'Menuliskan alif bengkok (ى) dan alif tegak (ا) di ujung kata berdasarkan asal akar kata (Wawu atau Ya)',
    audience: 'AD',
    scope: 'Alif layyinah maqshurah dan mamdudah'
  },
  {
    skill_id: 'KTB-L3-03',
    owner_island: 'KTB',
    level: 3,
    name: 'Dikte Kalimat Pendek & Imla\' Mandzur',
    description: 'Menyalin dan menuliskan kalimat berharakat lengkap dari audio dikte Mercusuar tanpa kesalahan ortografi',
    audience: 'AD',
    scope: 'Imla\' mandzur kalimat berharakat'
  },
  {
    skill_id: 'KTB-L4-01',
    owner_island: 'KTB',
    level: 4,
    name: 'Kaidah Emas Hamzah Mutawassithah (Tengah Kata)',
    description: 'Menentukan rumah hamzah tengah kata dengan perbandingan harakat terkuat: Kasrah > Dhammah > Fathah > Sukun',
    audience: 'AD',
    scope: 'Kaidah hamzah mutawassithah harakat terkuat'
  },
  {
    skill_id: 'KTB-L4-02',
    owner_island: 'KTB',
    level: 4,
    name: 'Huruf Zaidah (Ditulis Tapi Tidak Dibaca)',
    description: 'Menguasai penulisan Alif Fariqah setelah Wawu Jama\'ah (كَتَبُوا), Wawu pada عَمْرٌو, dan Alif pada مِائَة',
    audience: 'AD',
    scope: 'Huruf zaidah ortografi Arab'
  },
  {
    skill_id: 'KTB-L4-03',
    owner_island: 'KTB',
    level: 4,
    name: 'Huruf Mahdzufah (Dihapus dalam Tulisan)',
    description: 'Menguasai penulisan kata yang huruf alif mad-nya dibuang seperti isim isyarah (هٰذَا, ذٰلِكَ), الرَّحْمٰن, dan Basmalah',
    audience: 'AD',
    scope: 'Hadzaful alif dan huruf mahdzufah'
  },
  {
    skill_id: 'KTB-L5-01',
    owner_island: 'KTB',
    level: 5,
    name: 'Insya\' Hurr & Komposisi Paragraf Bertema',
    description: 'Menuliskan paragraf karangan bebas berkohesi, kaya kosakata mutiara, dan tanda baca sempurna',
    audience: 'AD',
    scope: 'Insya\' bebas dan komposisi paragraf narasi deskripsi'
  },
  {
    skill_id: 'KTB-L5-02',
    owner_island: 'KTB',
    level: 5,
    name: 'Imla\' Ikhtibari Naskah Klasik & Hadits Nabawi',
    description: 'Dikte evaluasi komprehensif tanpa melihat teks naskah dengan kaidah ejaan hamzah, tanwin, dan huruf mahdzufah/zaidah',
    audience: 'AD',
    scope: 'Imla\' ikhtibari tingkat mahir dan hadits nabawi'
  },
  {
    skill_id: 'KTB-L5-03',
    owner_island: 'KTB',
    level: 5,
    name: 'Seni Khath Arab & Kaidah Kaligrafi Naskh-Tsuluts',
    description: 'Menguasai proporsi titik pena miring, mangkok huruf, dan estetika komposisi tulisan Arab naskh dan tsuluts',
    audience: 'AD',
    scope: 'Kaidah proporsi kaligrafi dan seni khath'
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
    skill_id: 'KLM-L1-03',
    owner_island: 'KLM',
    level: 1,
    name: 'Vokalisasi Mad Thabi\'i vs Harakat Pendek (2 Harakat Presisi)',
    description: 'Membedakan tempo panjang 2 ketukan pada huruf mad (ا، و، ي) dibanding harakat tunggal dalam tuturan lisan',
    audience: 'AD',
    scope: 'Ketukan mad thabi\'i fonetik lisan'
  },
  {
    skill_id: 'KLM-L2-01',
    owner_island: 'KLM',
    level: 2,
    name: 'Intonasi Kalimat Tanya, Perintah & Seru (Istifham & Amr)',
    description: 'Membedakan nada naik pada istifham (tanya) dan nada tegas berwibawa pada amar (perintah)',
    audience: 'AD',
    scope: 'Intonasi fonetik kalimat kompleks'
  },
  {
    skill_id: 'KLM-L2-02',
    owner_island: 'KLM',
    level: 2,
    name: 'Melafalkan Dzikir & Doa Harian dengan Tajwid Presisi',
    description: 'Melafalkan doa harian dan tasbih dengan makhraj fasih dan intonasi tenang',
    audience: 'AD',
    scope: 'Doa harian & kelancaran tajwid'
  },
  {
    skill_id: 'KLM-L2-03',
    owner_island: 'KLM',
    level: 2,
    name: 'Percakapan Transaksional Dua Arah & Kesantunan Lisan',
    description: 'Melakukan ujaran timbal-balik dalam interaksi pasar dan madrasah dengan intonasi ramah dan sopan',
    audience: 'AD',
    scope: 'Dialog lisan dua arah interaktif'
  },
  {
    skill_id: 'KLM-L3-01',
    owner_island: 'KLM',
    level: 3,
    name: 'Pidato Singkat (Khitabah) & Presentasi Diri Fasih (Thalaqah Lanjut)',
    description: 'Menyampaikan perkenalan diri dan pesan hikmah lisan dengan percaya diri di hadapan penutur asli',
    audience: 'AD',
    scope: 'Retorika khitabah & thalaqah mandiri'
  },
  {
    skill_id: 'KLM-L3-02',
    owner_island: 'KLM',
    level: 3,
    name: 'Deskripsi Spontan Objek & Lingkungan Sekitar (Wasf al-Asyya\')',
    description: 'Menjelaskan ciri-ciri benda, ruangan, dan profesi secara lisan tanpa membaca naskah tertulis',
    audience: 'AD',
    scope: 'Ujaran monolog deskriptif mandiri'
  },
  {
    skill_id: 'KLM-L3-03',
    owner_island: 'KLM',
    level: 3,
    name: 'Artikulasi Waqaf, Washal, dan Ibtida\' dalam Monolog Arab',
    description: 'Mengatur nafas jeda (waqaf), penyambungan kata (washal), dan titik mulai (ibtida\') agar tuturan alami',
    audience: 'AD',
    scope: 'Fasilitas jeda nafas dan jeda gramatikal'
  },
  {
    skill_id: 'KLM-L4-01',
    owner_island: 'KLM',
    level: 4,
    name: 'Narasi Kisah & Hikmah Klasik (Sard al-Qishash) Berintonasi Emosional',
    description: 'Menceritakan fabel dan hikmah Arab dengan dinamika vokal dramatik, nada jeda suspense, dan kejelasan artikulasi',
    audience: 'AD',
    scope: 'Penceritaan naratif lisan ekspresif'
  },
  {
    skill_id: 'KLM-L4-02',
    owner_island: 'KLM',
    level: 4,
    name: 'Debat & Diskusi Opini Terbuka Santun (Hiwar Jadal Mu\'addab)',
    description: 'Menyampaikan argumen persetujuan (ittifaq) dan sanggahan santun (ikhtilaf) dengan ungkapan diplomatik Arab',
    audience: 'AD',
    scope: 'Retorika debat santun dan respon opini'
  },
  {
    skill_id: 'KLM-L4-03',
    owner_island: 'KLM',
    level: 4,
    name: 'Pengucapan Peribahasa (Amsal & Hikam) dengan Ritme Sajak Balaghah',
    description: 'Melafalkan mutiara hikmah bersajak (saja\') dengan rima akhir musikal dan penekanan makna mendalam',
    audience: 'AD',
    scope: 'Fonetik sajak balaghah & amsal hikmah'
  },
  {
    skill_id: 'KLM-L5-01',
    owner_island: 'KLM',
    level: 5,
    name: 'Orasi Mimbar Agung (Al-Khitabah Al-Minbariyyah) & Retorika Persuasi',
    description: 'Menyampaikan orasi bertema sosial-kemanusiaan dengan proyeksi vokal lantang, intonasi menggugah, dan gestur retoris',
    audience: 'AD',
    scope: 'Orasi mimbar publik & persuasi audiens'
  },
  {
    skill_id: 'KLM-L5-02',
    owner_island: 'KLM',
    level: 5,
    name: 'Wawancara Spontan & Respon Cepat Bahasa Arab Fusha (Masyhad Muqabalah)',
    description: 'Menjawab pertanyaan tak terduga secara langsung dalam bahasa Arab baku tanpa jeda terbata-bata',
    audience: 'AD',
    scope: 'Spontanitas respon lisan fusha tingkat mahir'
  },
  {
    skill_id: 'KLM-L5-03',
    owner_island: 'KLM',
    level: 5,
    name: 'Sastra Lisan, Pembacaan Puisi (Insyad Syi\'ir) & Vokalisasi Bahr Arab',
    description: 'Melantunkan bait-bait syair Arab klasik dengan ketukan wazan bahr, tajamnya artikulasi rima (qafiyah), dan penjiwaan puitis',
    audience: 'AD',
    scope: 'Sastra lisan insyad syi\'ir & intonasi bahr'
  },
  // TMH - Kuil Langit: 12 Modul Ujian Jenjang Terpadu 4 Keterampilan & Penobatan Rutbah (L0-L5)
  // Level 0: Tamhidi (Pra-A1) - Musafir menuju Thalib
  {
    skill_id: 'TMH-L0-01',
    owner_island: 'TMH',
    level: 0,
    name: 'Ujian Saringan Awal: Diskriminasi Fonem, Makhraj & Artikulasi Huruf Hijaiyah',
    description: 'Ujian kecakapan awal mengenali suara huruf, ketepatan makhraj murni, serta vokal pendek dan panjang sebagai syarat masuk jenjang dari Musafir',
    audience: 'AD',
    scope: 'Evaluasi fonetik & ortografi dasar Pra-A1'
  },
  {
    skill_id: 'TMH-L0-02',
    owner_island: 'TMH',
    level: 0,
    name: 'Gerbang Ujian Mihrab Tamhidi: Integrasi 4 Kemahiran Pra-A1 (Penobatan Rutbah Thalib)',
    description: 'Ujian komprehensif terpadu (Istima bunyi, Kalam artikulasi, Qiraah kata terpisah, Kitabah bentuk tunggal-sambung) untuk penobatan resmi gelar Thalib dan penetasan Hudhud',
    audience: 'AD',
    scope: 'Kelulusan Jenjang 0 & Penobatan Rutbah Thalib'
  },

  // Level 1: Mubtadi (A1) - Thalib menuju Rahhal
  {
    skill_id: 'TMH-L1-01',
    owner_island: 'TMH',
    level: 1,
    name: 'Ujian Evaluasi Leksikal & Frasa: Penguasaan Kosakata Reseptif-Produktif Inti A1',
    description: 'Menguji ketepatan identifikasi kosakata inti keseharian, benda sekitar, kata ganti dhamir munfashil, dan isim isyarah',
    audience: 'AD',
    scope: 'Evaluasi leksikal & frasa nominatif A1'
  },
  {
    skill_id: 'TMH-L1-02',
    owner_island: 'TMH',
    level: 1,
    name: 'Gerbang Ujian Mihrab Mubtadi: Integrasi 4 Kemahiran A1 (Penobatan Rutbah Rahhal)',
    description: 'Ujian terpadu 4 pilar (Istima dialog sapaan, Kalam perkenalan diri taaruf, Qiraah frasa berharakat, Kitabah penulisan kata bersambung) untuk penobatan gelar Rahhal dan evolusi Hudhud Muda',
    audience: 'AD',
    scope: 'Kelulusan Jenjang 1 & Penobatan Rutbah Rahhal'
  },

  // Level 2: Asasi (A2) - Rahhal menuju Qari
  {
    skill_id: 'TMH-L2-01',
    owner_island: 'TMH',
    level: 2,
    name: 'Ujian Evaluasi Sintaksis & Struktur: Jumlah Ismiyyah, Filiyyah & Kaidah Harakat A2',
    description: 'Ujian analisis tata bahasa dasar: kesesuaian mubtada-khabar, subjek-predikat (fiil-fail), harf jar, dan kepemilikan idhafah',
    audience: 'AD',
    scope: 'Evaluasi struktur qawaid kalimat dasar A2'
  },
  {
    skill_id: 'TMH-L2-02',
    owner_island: 'TMH',
    level: 2,
    name: 'Gerbang Ujian Mihrab Asasi: Integrasi 4 Kemahiran A2 (Penobatan Rutbah Qari)',
    description: 'Ujian komprehensif 4 pilar (Istima arahan kelas awamir, Kalam dialog pasar/keluarga, Qiraah wacana fabel pendek, Kitabah penyusunan kalimat terstruktur) untuk penobatan gelar Qari dan evolusi Hudhud Penjelajah',
    audience: 'AD',
    scope: 'Kelulusan Jenjang 2 & Penobatan Rutbah Qari'
  },

  // Level 3: Mutawassith (B1) - Qari menuju Katib
  {
    skill_id: 'TMH-L3-01',
    owner_island: 'TMH',
    level: 3,
    name: 'Ujian Evaluasi Paragraf, Dikte & Konjugasi Tashrif Lughawi B1',
    description: 'Ujian kemampuan imla mandiri, penguasaan konjugasi fiil madhi-mudhari-amr berbagai dhamir, serta pemahaman alur naratif wacana',
    audience: 'AD',
    scope: 'Evaluasi imla paragraf & morfologi sharaf B1'
  },
  {
    skill_id: 'TMH-L3-02',
    owner_island: 'TMH',
    level: 3,
    name: 'Gerbang Ujian Mihrab Mutawassith: Integrasi 4 Kemahiran B1 (Penobatan Rutbah Katib)',
    description: 'Ujian terpadu 4 pilar (Istima percakapan bandara/stasiun, Kalam deskripsi situasi & opini santai, Qiraah cerita biografi/sejarah, Kitabah insya paragraf terpadu) untuk penobatan gelar Katib dan evolusi Hudhud Cendekia',
    audience: 'AD',
    scope: 'Kelulusan Jenjang 3 & Penobatan Rutbah Katib'
  },

  // Level 4: Mutaqaddim (B2) - Katib menuju Adib Mutaqaddim
  {
    skill_id: 'TMH-L4-01',
    owner_island: 'TMH',
    level: 4,
    name: 'Ujian Evaluasi Morfo-Sintaksis Lanjut, Irab Detail & Wacana Argumentatif B2',
    description: 'Ujian penentuan tanda irab (rafa, nashab, jar, jazm), wazan fiil tsulatsi maziid, adat syarth, dan analisis teks konseptual',
    audience: 'AD',
    scope: 'Evaluasi irab terapan & analisis teks konseptual B2'
  },
  {
    skill_id: 'TMH-L4-02',
    owner_island: 'TMH',
    level: 4,
    name: 'Gerbang Ujian Mihrab Mutaqaddim: Integrasi 4 Kemahiran B2 (Penobatan Rutbah Adib Mutaqaddim)',
    description: 'Ujian komprehensif 4 pilar (Istima siaran berita/wawancara, Kalam debat santun & pidato mini, Qiraah artikel analitis, Kitabah surat resmi & opini argumentatif) untuk penobatan gelar Adib Mutaqaddim dan evolusi Hudhud Pelindung',
    audience: 'AD',
    scope: 'Kelulusan Jenjang 4 & Penobatan Rutbah Adib Mutaqaddim'
  },

  // Level 5: Mutamayyiz (C1/C2) - Adib menuju Adib Agung Paripurna
  {
    skill_id: 'TMH-L5-01',
    owner_island: 'TMH',
    level: 5,
    name: 'Ujian Evaluasi Balaghah (Bayan, Maani, Badi) & Stilistika Sastra Arab Mutamayyiz',
    description: 'Ujian apresiasi majaz, tasybih, kinayah, sajak badi, wazan bahr syiir klasik, dan keindahan estetika bahasa Arab fusha tinggi',
    audience: 'AD',
    scope: 'Evaluasi balaghah & estetika sastra fusha C1/C2'
  },
  {
    skill_id: 'TMH-L5-02',
    owner_island: 'TMH',
    level: 5,
    name: 'Gerbang Ujian Mihrab Agung Mutamayyiz: Syahadah Akbar Penguasaan 8 Kepulauan',
    description: 'Ujian puncak mahkota Kuil Langit menguji sintesis paripurna 8 kepulauan (Huruf, Mufradat, Hiwar, Qawaid, Istima, Qiraah, Kalam, Kitabah) untuk penganugerahan Ijazah Sanad Akbar dan Mahkota Emas Adib Agung',
    audience: 'AD',
    scope: 'Kelulusan Paripurna (Khatamul Kepulauan) & Penobatan Adib Agung'
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

  // --- MFR (Pasar Apung Mufradat: 36 Kategori Tematik Terstruktur L0-L5) ---
  // Level 0: Tamhidi (Pra-A1) - Fondasi Konkrit & Lingkungan Terdekat
  // Angka Satuan 1–10 (MFR-L0-01)
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

  // Warna Alami (MFR-L0-02)
  { id: 'lx_ahmar', ar_vocalized: 'أَحْمَر', ar_plain: 'أحمر', translit: 'aḥmar', gloss_id: 'merah', owner_island: 'MFR', level: 0, skill_id: 'MFR-L0-02', pos: 'isim', category: 'Warna', visual_hint: '🔴' },
  { id: 'lx_azraq', ar_vocalized: 'أَزْرَق', ar_plain: 'أزرق', translit: 'azraq', gloss_id: 'biru', owner_island: 'MFR', level: 0, skill_id: 'MFR-L0-02', pos: 'isim', category: 'Warna', visual_hint: '🔵' },
  { id: 'lx_akhdhar', ar_vocalized: 'أَخْضَر', ar_plain: 'أخضر', translit: 'akhḍar', gloss_id: 'hijau', owner_island: 'MFR', level: 0, skill_id: 'MFR-L0-02', pos: 'isim', category: 'Warna', visual_hint: '🟢' },
  { id: 'lx_abyadh', ar_vocalized: 'أَبْيَض', ar_plain: 'أبيض', translit: 'abyaḍ', gloss_id: 'putih', owner_island: 'MFR', level: 0, skill_id: 'MFR-L0-02', pos: 'isim', category: 'Warna', visual_hint: '⚪' },
  { id: 'lx_aswad', ar_vocalized: 'أَسْوَد', ar_plain: 'أسود', translit: 'aswad', gloss_id: 'hitam', owner_island: 'MFR', level: 0, skill_id: 'MFR-L0-02', pos: 'isim', category: 'Warna', visual_hint: '⚫' },
  { id: 'lx_ashfar', ar_vocalized: 'أَصْفَر', ar_plain: 'أصفر', translit: 'aṣfar', gloss_id: 'kuning', owner_island: 'MFR', level: 0, skill_id: 'MFR-L0-02', pos: 'isim', category: 'Warna', visual_hint: '🟡' },
  { id: 'lx_burtuqali', ar_vocalized: 'بُرْتُقَالِيّ', ar_plain: 'برتقالي', translit: 'burtuqāliyy', gloss_id: 'oranye / jingga', owner_island: 'MFR', level: 0, skill_id: 'MFR-L0-02', pos: 'isim', category: 'Warna', visual_hint: '🟠' },

  // Keluarga Inti (MFR-L0-03)
  { id: 'lx_ab', ar_vocalized: 'أَب', ar_plain: 'أب', translit: 'ab', gloss_id: 'ayah', owner_island: 'MFR', level: 0, skill_id: 'MFR-L0-03', pos: 'isim', category: 'Keluarga', visual_hint: '👨' },
  { id: 'lx_umm', ar_vocalized: 'أُمّ', ar_plain: 'أم', translit: 'umm', gloss_id: 'ibu', owner_island: 'MFR', level: 0, skill_id: 'MFR-L0-03', pos: 'isim', category: 'Keluarga', visual_hint: '👩' },
  { id: 'lx_akh', ar_vocalized: 'أَخ', ar_plain: 'أخ', translit: 'akh', gloss_id: 'saudara laki-laki', owner_island: 'MFR', level: 0, skill_id: 'MFR-L0-03', pos: 'isim', category: 'Keluarga', visual_hint: '👦' },
  { id: 'lx_ukht', ar_vocalized: 'أُخْت', ar_plain: 'أخت', translit: 'ukht', gloss_id: 'saudari perempuan', owner_island: 'MFR', level: 0, skill_id: 'MFR-L0-03', pos: 'isim', category: 'Keluarga', visual_hint: '👧' },
  { id: 'lx_jadd', ar_vocalized: 'جَدّ', ar_plain: 'جد', translit: 'jadd', gloss_id: 'kakek tercinta', owner_island: 'MFR', level: 0, skill_id: 'MFR-L0-03', pos: 'isim', category: 'Keluarga', visual_hint: '👴' },
  { id: 'lx_jaddah', ar_vocalized: 'جَدَّة', ar_plain: 'جدة', translit: 'jaddah', gloss_id: 'nenek penyayang', owner_island: 'MFR', level: 0, skill_id: 'MFR-L0-03', pos: 'isim', category: 'Keluarga', visual_hint: '👵' },

  // Benda Kelas & Belajar (MFR-L0-04)
  { id: 'lx_kitab', ar_vocalized: 'كِتَاب', ar_plain: 'كتاب', translit: 'kitāb', gloss_id: 'buku panduan', owner_island: 'MFR', level: 0, skill_id: 'MFR-L0-04', pos: 'isim', category: 'Benda Sekitar', visual_hint: '📖' },
  { id: 'lx_qalam', ar_vocalized: 'قَلَم', ar_plain: 'قلم', translit: 'qalam', gloss_id: 'pena / pulpen', owner_island: 'MFR', level: 0, skill_id: 'MFR-L0-04', pos: 'isim', category: 'Benda Sekitar', visual_hint: '🖊️' },
  { id: 'lx_bab', ar_vocalized: 'بَاب', ar_plain: 'باب', translit: 'bāb', gloss_id: 'pintu ruangan', owner_island: 'MFR', level: 0, skill_id: 'MFR-L0-04', pos: 'isim', category: 'Benda Sekitar', visual_hint: '🚪' },
  { id: 'lx_kursiy', ar_vocalized: 'كُرْسِيّ', ar_plain: 'كرسي', translit: 'kursiyy', gloss_id: 'kursi duduk', owner_island: 'MFR', level: 0, skill_id: 'MFR-L0-04', pos: 'isim', category: 'Benda Sekitar', visual_hint: '🪑' },
  { id: 'lx_thawilah', ar_vocalized: 'طَاوِلَة', ar_plain: 'طاولة', translit: 'ṭāwilah', gloss_id: 'meja belajar', owner_island: 'MFR', level: 0, skill_id: 'MFR-L0-04', pos: 'isim', category: 'Benda Sekitar', visual_hint: '🪵' },
  { id: 'lx_sabburah', ar_vocalized: 'سَبُّورَة', ar_plain: 'سبورة', translit: 'sabbūrah', gloss_id: 'papan tulis kelas', owner_island: 'MFR', level: 0, skill_id: 'MFR-L0-04', pos: 'isim', category: 'Benda Sekitar', visual_hint: '📋' },
  { id: 'lx_haqibah', ar_vocalized: 'حَقِيبَة', ar_plain: 'حقيبة', translit: 'ḥaqībah', gloss_id: 'tas ransel belajar', owner_island: 'MFR', level: 0, skill_id: 'MFR-L0-04', pos: 'isim', category: 'Benda Sekitar', visual_hint: '🎒' },

  // Ruangan Rumah & Sudut Hunian (MFR-L0-05)
  { id: 'lx_bayt_l0', ar_vocalized: 'بَيْت', ar_plain: 'بيت', translit: 'bayt', gloss_id: 'rumah tinggal', owner_island: 'MFR', level: 0, skill_id: 'MFR-L0-05', pos: 'isim', category: 'Rumah & Sudut', visual_hint: '🏠' },
  { id: 'lx_ghurfah_l0', ar_vocalized: 'غُرْفَة', ar_plain: 'غرفة', translit: 'ghurfah', gloss_id: 'kamar / bilik', owner_island: 'MFR', level: 0, skill_id: 'MFR-L0-05', pos: 'isim', category: 'Rumah & Sudut', visual_hint: '🛏️' },
  { id: 'lx_matbakh_l0', ar_vocalized: 'مَطْبَخ', ar_plain: 'مطبخ', translit: 'maṭbakh', gloss_id: 'dapur memasak', owner_island: 'MFR', level: 0, skill_id: 'MFR-L0-05', pos: 'isim', category: 'Rumah & Sudut', visual_hint: '🍳' },
  { id: 'lx_hammam_l0', ar_vocalized: 'حَمَّام', ar_plain: 'حمام', translit: 'ḥammām', gloss_id: 'kamar mandi bersih', owner_island: 'MFR', level: 0, skill_id: 'MFR-L0-05', pos: 'isim', category: 'Rumah & Sudut', visual_hint: '🚿' },
  { id: 'lx_saqf', ar_vocalized: 'سَقْف', ar_plain: 'سقف', translit: 'saqf', gloss_id: 'atap langit-langit', owner_island: 'MFR', level: 0, skill_id: 'MFR-L0-05', pos: 'isim', category: 'Rumah & Sudut', visual_hint: '🏠' },
  { id: 'lx_jidar', ar_vocalized: 'جِدَار', ar_plain: 'جدار', translit: 'jidār', gloss_id: 'dinding kokoh', owner_island: 'MFR', level: 0, skill_id: 'MFR-L0-05', pos: 'isim', category: 'Rumah & Sudut', visual_hint: '🧱' },

  // Bentuk & Ukuran Dasar (MFR-L0-06)
  { id: 'lx_dairah', ar_vocalized: 'دَائِرَة', ar_plain: 'دائرة', translit: 'dāʾirah', gloss_id: 'lingkaran bulat', owner_island: 'MFR', level: 0, skill_id: 'MFR-L0-06', pos: 'isim', category: 'Bentuk & Ukuran', visual_hint: '⭕' },
  { id: 'lx_murabba', ar_vocalized: 'مُرَبَّع', ar_plain: 'مربع', translit: 'murabbaʿ', gloss_id: 'persegi empat', owner_island: 'MFR', level: 0, skill_id: 'MFR-L0-06', pos: 'isim', category: 'Bentuk & Ukuran', visual_hint: '🔲' },
  { id: 'lx_muthallath', ar_vocalized: 'مُثَلَّث', ar_plain: 'مثلث', translit: 'muthallath', gloss_id: 'segitiga', owner_island: 'MFR', level: 0, skill_id: 'MFR-L0-06', pos: 'isim', category: 'Bentuk & Ukuran', visual_hint: '🔺' },
  { id: 'lx_kabir_l0', ar_vocalized: 'كَبِير', ar_plain: 'كبير', translit: 'kabīr', gloss_id: 'berukuran besar', owner_island: 'MFR', level: 0, skill_id: 'MFR-L0-06', pos: 'isim', category: 'Bentuk & Ukuran', visual_hint: '🐘' },
  { id: 'lx_shaghir_l0', ar_vocalized: 'صَغِير', ar_plain: 'صغير', translit: 'ṣaghīr', gloss_id: 'berukuran kecil', owner_island: 'MFR', level: 0, skill_id: 'MFR-L0-06', pos: 'isim', category: 'Bentuk & Ukuran', visual_hint: '🐜' },

  // Level 1: Mubtadi' 1 (A1) - Kebutuhan Hayati & Lingkungan Sekitar
  // Makanan & Minuman (MFR-L1-01)
  { id: 'lx_khubz', ar_vocalized: 'خُبْز', ar_plain: 'خبز', translit: 'khubz', gloss_id: 'roti gandum hangat', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-01', pos: 'isim', category: 'Makanan & Minuman', visual_hint: '🍞' },
  { id: 'lx_maa', ar_vocalized: 'مَاء', ar_plain: 'ماء', translit: 'māʾ', gloss_id: 'air tawar segar', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-01', pos: 'isim', category: 'Makanan & Minuman', visual_hint: '💧' },
  { id: 'lx_halib', ar_vocalized: 'حَلِيب', ar_plain: 'حليب', translit: 'ḥalīb', gloss_id: 'susu murni sehat', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-01', pos: 'isim', category: 'Makanan & Minuman', visual_hint: '🥛' },
  { id: 'lx_aruzz', ar_vocalized: 'أَرُزّ', ar_plain: 'أرز', translit: 'aruzz', gloss_id: 'nasi / beras', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-01', pos: 'isim', category: 'Makanan & Minuman', visual_hint: '🍚' },
  { id: 'lx_tamr', ar_vocalized: 'تَمْر', ar_plain: 'تمر', translit: 'tamr', gloss_id: 'buah kurma manis', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-01', pos: 'isim', category: 'Makanan & Minuman', visual_hint: '🌴' },
  { id: 'lx_shay', ar_vocalized: 'شَاي', ar_plain: 'شاي', translit: 'shāy', gloss_id: 'teh hangat harum', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-01', pos: 'isim', category: 'Makanan & Minuman', visual_hint: '🫖' },
  { id: 'lx_qahwah', ar_vocalized: 'قَهْوَة', ar_plain: 'قهوة', translit: 'qahwah', gloss_id: 'kopi aromatik Arab', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-01', pos: 'isim', category: 'Makanan & Minuman', visual_hint: '☕' },
  { id: 'lx_lahm', ar_vocalized: 'لَحْم', ar_plain: 'لحم', translit: 'laḥm', gloss_id: 'daging segar bergizi', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-01', pos: 'isim', category: 'Makanan & Minuman', visual_hint: '🥩' },

  // Buah & Sayuran Pasar (MFR-L1-02)
  { id: 'lx_tuffahah', ar_vocalized: 'تُفَّاحَة', ar_plain: 'تفاحة', translit: 'tuffāḥah', gloss_id: 'buah apel ranum', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-02', pos: 'isim', category: 'Buah & Sayur', visual_hint: '🍎' },
  { id: 'lx_burtuqal', ar_vocalized: 'بُرْتُقَال', ar_plain: 'برتقال', translit: 'burtuqāl', gloss_id: 'buah jeruk segar', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-02', pos: 'isim', category: 'Buah & Sayur', visual_hint: '🍊' },
  { id: 'lx_mauz', ar_vocalized: 'مَوْز', ar_plain: 'موز', translit: 'mawz', gloss_id: 'buah pisang manis', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-02', pos: 'isim', category: 'Buah & Sayur', visual_hint: '🍌' },
  { id: 'lx_inab', ar_vocalized: 'عِنَب', ar_plain: 'عنب', translit: 'ʿinab', gloss_id: 'buah anggur manis', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-02', pos: 'isim', category: 'Buah & Sayur', visual_hint: '🍇' },
  { id: 'lx_thimathim', ar_vocalized: 'طَمَاطِم', ar_plain: 'طماطم', translit: 'ṭamāṭim', gloss_id: 'sayur tomat merah', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-02', pos: 'isim', category: 'Buah & Sayur', visual_hint: '🍅' },
  { id: 'lx_khiyar', ar_vocalized: 'خِيَار', ar_plain: 'خيار', translit: 'khiyār', gloss_id: 'mentimun segar', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-02', pos: 'isim', category: 'Buah & Sayur', visual_hint: '🥒' },
  { id: 'lx_basal', ar_vocalized: 'بَصَل', ar_plain: 'بصل', translit: 'baṣal', gloss_id: 'bawang merah/bombay', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-02', pos: 'isim', category: 'Buah & Sayur', visual_hint: '🧅' },

  // Hewan Jinak & Satwa (MFR-L1-03)
  { id: 'lx_qittah', ar_vocalized: 'قِطَّة', ar_plain: 'قطة', translit: 'qiṭṭah', gloss_id: 'kucing piaraan', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-03', pos: 'isim', category: 'Hewan', visual_hint: '🐱' },
  { id: 'lx_samakah', ar_vocalized: 'سَمَكَة', ar_plain: 'سمكة', translit: 'samakah', gloss_id: 'ikan sungai/laut', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-03', pos: 'isim', category: 'Hewan', visual_hint: '🐟' },
  { id: 'lx_thair', ar_vocalized: 'طَائِر', ar_plain: 'طائر', translit: 'ṭāʾir', gloss_id: 'burung berkicau', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-03', pos: 'isim', category: 'Hewan', visual_hint: '🐦' },
  { id: 'lx_hishan', ar_vocalized: 'حِصَان', ar_plain: 'حصان', translit: 'ḥiṣān', gloss_id: 'kuda jantan tangguh', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-03', pos: 'isim', category: 'Hewan', visual_hint: '🐴' },
  { id: 'lx_jamal', ar_vocalized: 'جَمَل', ar_plain: 'جمل', translit: 'jamal', gloss_id: 'unta padang pasir', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-03', pos: 'isim', category: 'Hewan', visual_hint: '🐪' },
  { id: 'lx_asad', ar_vocalized: 'أَسَد', ar_plain: 'أسد', translit: 'asad', gloss_id: 'singa raja rimba', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-03', pos: 'isim', category: 'Hewan', visual_hint: '🦁' },
  { id: 'lx_fil', ar_vocalized: 'فِيل', ar_plain: 'فيل', translit: 'fīl', gloss_id: 'gajah belalai besar', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-03', pos: 'isim', category: 'Hewan', visual_hint: '🐘' },

  // Anggota Tubuh & Panca Indra (MFR-L1-04)
  { id: 'lx_raas', ar_vocalized: 'رَأْس', ar_plain: 'رأس', translit: 'raʾs', gloss_id: 'kepala', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-04', pos: 'isim', category: 'Anggota Tubuh', visual_hint: '🗣️' },
  { id: 'lx_yad', ar_vocalized: 'يَد', ar_plain: 'يد', translit: 'yad', gloss_id: 'tangan terampil', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-04', pos: 'isim', category: 'Anggota Tubuh', visual_hint: '✋' },
  { id: 'lx_ayn_body', ar_vocalized: 'عَيْن', ar_plain: 'عين', translit: 'ʿayn', gloss_id: 'mata penglihatan', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-04', pos: 'isim', category: 'Anggota Tubuh', visual_hint: '👁️' },
  { id: 'lx_rijl', ar_vocalized: 'رِجْل', ar_plain: 'رجل', translit: 'rijl', gloss_id: 'kaki melangkah', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-04', pos: 'isim', category: 'Anggota Tubuh', visual_hint: '🦶' },
  { id: 'lx_anf', ar_vocalized: 'أَنْف', ar_plain: 'أنف', translit: 'anf', gloss_id: 'hidung penciuman', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-04', pos: 'isim', category: 'Anggota Tubuh', visual_hint: '👃' },
  { id: 'lx_fam', ar_vocalized: 'فَم', ar_plain: 'فم', translit: 'fam', gloss_id: 'mulut berbicara', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-04', pos: 'isim', category: 'Anggota Tubuh', visual_hint: '👄' },
  { id: 'lx_udhun', ar_vocalized: 'أُذُن', ar_plain: 'أذن', translit: 'udhun', gloss_id: 'telinga pendengaran', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-04', pos: 'isim', category: 'Anggota Tubuh', visual_hint: '👂' },
  { id: 'lx_qalb', ar_vocalized: 'قَلْب', ar_plain: 'قلب', translit: 'qalb', gloss_id: 'hati / kalbu nurani', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-04', pos: 'isim', category: 'Anggota Tubuh', visual_hint: '❤️' },

  // Busana & Pakaian (MFR-L1-05)
  { id: 'lx_qamis', ar_vocalized: 'قَمِيص', ar_plain: 'قميص', translit: 'qamīṣ', gloss_id: 'kemeja baju', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-05', pos: 'isim', category: 'Pakaian', visual_hint: '👔' },
  { id: 'lx_thawb', ar_vocalized: 'ثَوْب', ar_plain: 'ثوب', translit: 'thawb', gloss_id: 'jubah gamis', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-05', pos: 'isim', category: 'Pakaian', visual_hint: '👘' },
  { id: 'lx_hidha', ar_vocalized: 'حِذَاء', ar_plain: 'حذاء', translit: 'ḥidhāʾ', gloss_id: 'sepatu alas kaki', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-05', pos: 'isim', category: 'Pakaian', visual_hint: '👞' },
  { id: 'lx_qalansuwah', ar_vocalized: 'قَلَنْسُوَة', ar_plain: 'قلنسوة', translit: 'qalansuwah', gloss_id: 'peci / songkok / topi', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-05', pos: 'isim', category: 'Pakaian', visual_hint: '🧢' },
  { id: 'lx_sirwal', ar_vocalized: 'سِرْوَال', ar_plain: 'سروال', translit: 'sirwāl', gloss_id: 'celana panjang', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-05', pos: 'isim', category: 'Pakaian', visual_hint: '👖' },
  { id: 'lx_saah_jam', ar_vocalized: 'سَاعَةُ اليَد', ar_plain: 'ساعة اليد', translit: 'sāʿatu l-yad', gloss_id: 'jam tangan perhiasan', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-05', pos: 'phrase', category: 'Pakaian', visual_hint: '⌚' },

  // Waktu Harian & Jam (MFR-L1-06)
  { id: 'lx_yawm_ahad', ar_vocalized: 'يَوْمُ الأَحَد', ar_plain: 'يوم الأحد', translit: 'yawm al-aḥad', gloss_id: 'hari Ahad (Minggu)', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-06', pos: 'phrase', category: 'Waktu & Hari', visual_hint: '📅' },
  { id: 'lx_yawm_jumuah', ar_vocalized: 'يَوْمُ الجُمُعَة', ar_plain: 'يوم الجمعة', translit: 'yawm al-jumuʿah', gloss_id: 'hari Jumat berkah', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-06', pos: 'phrase', category: 'Waktu & Hari', visual_hint: '🕌' },
  { id: 'lx_layl', ar_vocalized: 'لَيْل', ar_plain: 'ليل', translit: 'layl', gloss_id: 'malam bertabur bintang', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-06', pos: 'isim', category: 'Waktu & Hari', visual_hint: '🌃' },
  { id: 'lx_nahar', ar_vocalized: 'نَهَار', ar_plain: 'نهار', translit: 'nahār', gloss_id: 'siang benderang', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-06', pos: 'isim', category: 'Waktu & Hari', visual_hint: '☀️' },
  { id: 'lx_shabah_time', ar_vocalized: 'صَبَاح', ar_plain: 'صباح', translit: 'ṣabāḥ', gloss_id: 'waktu pagi cerah', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-06', pos: 'isim', category: 'Waktu & Hari', visual_hint: '🌅' },
  { id: 'lx_masa_time', ar_vocalized: 'مَسَاء', ar_plain: 'مساء', translit: 'masāʾ', gloss_id: 'waktu petang senja', owner_island: 'MFR', level: 1, skill_id: 'MFR-L1-06', pos: 'isim', category: 'Waktu & Hari', visual_hint: '🌆' },

  // Level 2: Mubtadi' 2 (A2) - Perabot, Kota, Profesi & Mobilitas
  // Perabot Rumah & Dapur (MFR-L2-01)
  { id: 'lx_sarir', ar_vocalized: 'سَرِير', ar_plain: 'سرير', translit: 'sarīr', gloss_id: 'ranjang tempat tidur', owner_island: 'MFR', level: 2, skill_id: 'MFR-L2-01', pos: 'isim', category: 'Rumah & Perabot', visual_hint: '🛏️' },
  { id: 'lx_khizanah', ar_vocalized: 'خِزَانَة', ar_plain: 'خزانة', translit: 'khizānah', gloss_id: 'lemari pakaian / buku', owner_island: 'MFR', level: 2, skill_id: 'MFR-L2-01', pos: 'isim', category: 'Rumah & Perabot', visual_hint: '🚪' },
  { id: 'lx_shahn', ar_vocalized: 'صَحْن', ar_plain: 'صحن', translit: 'ṣaḥn', gloss_id: 'piring santap', owner_island: 'MFR', level: 2, skill_id: 'MFR-L2-01', pos: 'isim', category: 'Rumah & Perabot', visual_hint: '🍽️' },
  { id: 'lx_milraqah', ar_vocalized: 'مِلْعَقَة', ar_plain: 'ملعقة', translit: 'milʿaqah', gloss_id: 'sendok makan', owner_island: 'MFR', level: 2, skill_id: 'MFR-L2-01', pos: 'isim', category: 'Rumah & Perabot', visual_hint: '🥄' },
  { id: 'lx_sikkin', ar_vocalized: 'سِكِّين', ar_plain: 'سكين', translit: 'sikkīn', gloss_id: 'pisau dapur tajam', owner_island: 'MFR', level: 2, skill_id: 'MFR-L2-01', pos: 'isim', category: 'Rumah & Perabot', visual_hint: '🔪' },

  // Fasilitas Publik & Denah Kota (MFR-L2-02)
  { id: 'lx_bayt', ar_vocalized: 'بَيْت', ar_plain: 'بيت', translit: 'bayt', gloss_id: 'rumah tinggal', owner_island: 'MFR', level: 2, skill_id: 'MFR-L2-02', pos: 'isim', category: 'Tempat & Kota', visual_hint: '🏠' },
  { id: 'lx_masjid', ar_vocalized: 'مَسْجِد', ar_plain: 'مسجد', translit: 'masjid', gloss_id: 'masjid tempat sujud', owner_island: 'MFR', level: 2, skill_id: 'MFR-L2-02', pos: 'isim', category: 'Tempat & Kota', visual_hint: '🕌' },
  { id: 'lx_suq', ar_vocalized: 'سُوق', ar_plain: 'سوق', translit: 'sūq', gloss_id: 'pasar perniagaan', owner_island: 'MFR', level: 2, skill_id: 'MFR-L2-02', pos: 'isim', category: 'Tempat & Kota', visual_hint: '🏬' },
  { id: 'lx_madrasah', ar_vocalized: 'مَدْرَسَة', ar_plain: 'مدرسة', translit: 'madrasah', gloss_id: 'sekolah tempat belajar', owner_island: 'MFR', level: 2, skill_id: 'MFR-L2-02', pos: 'isim', category: 'Tempat & Kota', visual_hint: '🏫' },
  { id: 'lx_mustasyfa', ar_vocalized: 'مُسْتَشْفَى', ar_plain: 'مستشفى', translit: 'mustashfā', gloss_id: 'rumah sakit pengobatan', owner_island: 'MFR', level: 2, skill_id: 'MFR-L2-02', pos: 'isim', category: 'Tempat & Kota', visual_hint: '🏥' },
  { id: 'lx_mathar', ar_vocalized: 'مَطَار', ar_plain: 'مطار', translit: 'maṭār', gloss_id: 'bandara penerbangan', owner_island: 'MFR', level: 2, skill_id: 'MFR-L2-02', pos: 'isim', category: 'Tempat & Kota', visual_hint: '🛫' },
  { id: 'lx_funduq', ar_vocalized: 'فُنْدُق', ar_plain: 'فندق', translit: 'funduq', gloss_id: 'hotel penginapan', owner_island: 'MFR', level: 2, skill_id: 'MFR-L2-02', pos: 'isim', category: 'Tempat & Kota', visual_hint: '🏨' },

  // Profesi & Pekerjaan (MFR-L2-03)
  { id: 'lx_thabib', ar_vocalized: 'طَبِيب', ar_plain: 'طبيب', translit: 'ṭabīb', gloss_id: 'dokter penyembuh', owner_island: 'MFR', level: 2, skill_id: 'MFR-L2-03', pos: 'isim', category: 'Profesi', visual_hint: '🩺' },
  { id: 'lx_mudarris', ar_vocalized: 'مُدَرِّس', ar_plain: 'مدرس', translit: 'mudarris', gloss_id: 'guru pengajar ilmu', owner_island: 'MFR', level: 2, skill_id: 'MFR-L2-03', pos: 'isim', category: 'Profesi', visual_hint: '👨‍🏫' },
  { id: 'lx_muhandis', ar_vocalized: 'مُهَنْدِس', ar_plain: 'مهندس', translit: 'muhandis', gloss_id: 'insinyur perancang', owner_island: 'MFR', level: 2, skill_id: 'MFR-L2-03', pos: 'isim', category: 'Profesi', visual_hint: '👷' },
  { id: 'lx_fallah', ar_vocalized: 'فَلَّاح', ar_plain: 'فلاح', translit: 'fallāḥ', gloss_id: 'petani pembajak sawah', owner_island: 'MFR', level: 2, skill_id: 'MFR-L2-03', pos: 'isim', category: 'Profesi', visual_hint: '🌾' },
  { id: 'lx_syurthiy', ar_vocalized: 'شُرْطِيّ', ar_plain: 'شرطي', translit: 'shurṭiyy', gloss_id: 'polisi penegak hukum', owner_island: 'MFR', level: 2, skill_id: 'MFR-L2-03', pos: 'isim', category: 'Profesi', visual_hint: '👮' },
  { id: 'lx_tajir', ar_vocalized: 'تَاجِر', ar_plain: 'تاجر', translit: 'tājir', gloss_id: 'saudagar pedagang amanah', owner_island: 'MFR', level: 2, skill_id: 'MFR-L2-03', pos: 'isim', category: 'Profesi', visual_hint: '💼' },

  // Transportasi & Kendaraan (MFR-L2-04)
  { id: 'lx_sayyarah', ar_vocalized: 'سَيَّارَة', ar_plain: 'سيارة', translit: 'sayyārah', gloss_id: 'mobil penumpang', owner_island: 'MFR', level: 2, skill_id: 'MFR-L2-04', pos: 'isim', category: 'Transportasi', visual_hint: '🚗' },
  { id: 'lx_hafilah', ar_vocalized: 'حَافِلَة', ar_plain: 'حافلة', translit: 'ḥāfilah', gloss_id: 'bus umum kota', owner_island: 'MFR', level: 2, skill_id: 'MFR-L2-04', pos: 'isim', category: 'Transportasi', visual_hint: '🚌' },
  { id: 'lx_qithar', ar_vocalized: 'قِطَار', ar_plain: 'قطار', translit: 'qiṭār', gloss_id: 'kereta rel cepat', owner_island: 'MFR', level: 2, skill_id: 'MFR-L2-04', pos: 'isim', category: 'Transportasi', visual_hint: '🚆' },
  { id: 'lx_thairah', ar_vocalized: 'طَائِرَة', ar_plain: 'طائرة', translit: 'ṭāʾirah', gloss_id: 'pesawat terbang', owner_island: 'MFR', level: 2, skill_id: 'MFR-L2-04', pos: 'isim', category: 'Transportasi', visual_hint: '✈️' },
  { id: 'lx_safinah', ar_vocalized: 'سَفِينَة', ar_plain: 'سفينة', translit: 'safīnah', gloss_id: 'kapal laut perahu samudra', owner_island: 'MFR', level: 2, skill_id: 'MFR-L2-04', pos: 'isim', category: 'Transportasi', visual_hint: '🚢' },

  // Tindakan Harian / Fi'il (MFR-L2-05)
  { id: 'lx_qaraa', ar_vocalized: 'قَرَأَ', ar_plain: 'قرأ', translit: 'qaraʾa', gloss_id: 'dia telah membaca', owner_island: 'MFR', level: 2, skill_id: 'MFR-L2-05', pos: 'fiil', category: 'Kata Kerja', visual_hint: '📖' },
  { id: 'lx_kataba', ar_vocalized: 'كَتَبَ', ar_plain: 'كتب', translit: 'kataba', gloss_id: 'dia telah menulis', owner_island: 'MFR', level: 2, skill_id: 'MFR-L2-05', pos: 'fiil', category: 'Kata Kerja', visual_hint: '✍️' },
  { id: 'lx_dzahaba', ar_vocalized: 'ذَهَبَ', ar_plain: 'ذهب', translit: 'dhahaba', gloss_id: 'dia telah pergi', owner_island: 'MFR', level: 2, skill_id: 'MFR-L2-05', pos: 'fiil', category: 'Kata Kerja', visual_hint: '🚶' },
  { id: 'lx_rajaa', ar_vocalized: 'رَجَعَ', ar_plain: 'رجع', translit: 'rajaʿa', gloss_id: 'dia telah kembali pulang', owner_island: 'MFR', level: 2, skill_id: 'MFR-L2-05', pos: 'fiil', category: 'Kata Kerja', visual_hint: '🏠' },
  { id: 'lx_akalla', ar_vocalized: 'أَكَلَ', ar_plain: 'أكل', translit: 'akala', gloss_id: 'dia menyantap makanan', owner_island: 'MFR', level: 2, skill_id: 'MFR-L2-05', pos: 'fiil', category: 'Kata Kerja', visual_hint: '🍽️' },
  { id: 'lx_syariba', ar_vocalized: 'شَرِبَ', ar_plain: 'شرب', translit: 'shariba', gloss_id: 'dia meminum air', owner_island: 'MFR', level: 2, skill_id: 'MFR-L2-05', pos: 'fiil', category: 'Kata Kerja', visual_hint: '🥤' },
  { id: 'lx_naama', ar_vocalized: 'نَامَ', ar_plain: 'نام', translit: 'nāma', gloss_id: 'dia tidur lelap', owner_island: 'MFR', level: 2, skill_id: 'MFR-L2-05', pos: 'fiil', category: 'Kata Kerja', visual_hint: '😴' },

  // Transaksi Pasar & Mata Uang (MFR-L2-06)
  { id: 'lx_dinar', ar_vocalized: 'دِينَار', ar_plain: 'دينار', translit: 'dīnār', gloss_id: 'keping uang dinar emas', owner_island: 'MFR', level: 2, skill_id: 'MFR-L2-06', pos: 'isim', category: 'Transaksi', visual_hint: '🪙' },
  { id: 'lx_dirham', ar_vocalized: 'دِرْهَم', ar_plain: 'درهم', translit: 'dirham', gloss_id: 'keping koin perak dirham', owner_island: 'MFR', level: 2, skill_id: 'MFR-L2-06', pos: 'isim', category: 'Transaksi', visual_hint: '🪙' },
  { id: 'lx_siir', ar_vocalized: 'سِعْر', ar_plain: 'سعر', translit: 'siʿr', gloss_id: 'harga barang perahu', owner_island: 'MFR', level: 2, skill_id: 'MFR-L2-06', pos: 'isim', category: 'Transaksi', visual_hint: '🏷️' },
  { id: 'lx_bay_syira', ar_vocalized: 'بَيْعٌ وَشِرَاء', ar_plain: 'بيع وشراء', translit: 'bayʿun wa-shirāʾ', gloss_id: 'jual beli yang halal', owner_island: 'MFR', level: 2, skill_id: 'MFR-L2-06', pos: 'phrase', category: 'Transaksi', visual_hint: '🤝' },

  // Level 3: Mutawassith 1 (B1) - Sifat, Alam, Geografi, Kesehatan & Hobi
  // Sifat Fisik & Karakter (MFR-L3-01)
  { id: 'lx_thawil', ar_vocalized: 'طَوِيل', ar_plain: 'طويل', translit: 'ṭawīl', gloss_id: 'tinggi / panjang', owner_island: 'MFR', level: 3, skill_id: 'MFR-L3-01', pos: 'isim', category: 'Sifat & Karakter', visual_hint: '🦒' },
  { id: 'lx_qashir', ar_vocalized: 'قَصِير', ar_plain: 'قصير', translit: 'qaṣīr', gloss_id: 'pendek mungil', owner_island: 'MFR', level: 3, skill_id: 'MFR-L3-01', pos: 'isim', category: 'Sifat & Karakter', visual_hint: '🐢' },
  { id: 'lx_jamil', ar_vocalized: 'جَمِيل', ar_plain: 'جميل', translit: 'jamīl', gloss_id: 'indah / elok rupawan', owner_island: 'MFR', level: 3, skill_id: 'MFR-L3-01', pos: 'isim', category: 'Sifat & Karakter', visual_hint: '🌸' },
  { id: 'lx_karim', ar_vocalized: 'كَرِيم', ar_plain: 'كريم', translit: 'karīm', gloss_id: 'mulia dermawan', owner_island: 'MFR', level: 3, skill_id: 'MFR-L3-01', pos: 'isim', category: 'Sifat & Karakter', visual_hint: '🎁' },
  { id: 'lx_syuja', ar_vocalized: 'شُجَاع', ar_plain: 'شجاع', translit: 'shujāʿ', gloss_id: 'pemberani ksatria', owner_island: 'MFR', level: 3, skill_id: 'MFR-L3-01', pos: 'isim', category: 'Sifat & Karakter', visual_hint: '🦁' },

  // Cuaca & Musim Alam (MFR-L3-02)
  { id: 'lx_harr', ar_vocalized: 'حَارّ', ar_plain: 'حار', translit: 'ḥārr', gloss_id: 'cuaca panas terik', owner_island: 'MFR', level: 3, skill_id: 'MFR-L3-02', pos: 'isim', category: 'Cuaca & Musim', visual_hint: '🔥' },
  { id: 'lx_barid', ar_vocalized: 'بَارِد', ar_plain: 'بارد', translit: 'bārid', gloss_id: 'cuaca dingin sejuk', owner_island: 'MFR', level: 3, skill_id: 'MFR-L3-02', pos: 'isim', category: 'Cuaca & Musim', visual_hint: '❄️' },
  { id: 'lx_mathar_rain', ar_vocalized: 'مَطَر', ar_plain: 'مطر', translit: 'maṭar', gloss_id: 'hujan lebat turun', owner_island: 'MFR', level: 3, skill_id: 'MFR-L3-02', pos: 'isim', category: 'Cuaca & Musim', visual_hint: '🌧️' },
  { id: 'lx_fasl_shayf', ar_vocalized: 'فَصْلُ الصَّيْف', ar_plain: 'فصل الصيف', translit: 'faṣlu ṣ-ṣayf', gloss_id: 'musim panas kemarau', owner_island: 'MFR', level: 3, skill_id: 'MFR-L3-02', pos: 'phrase', category: 'Cuaca & Musim', visual_hint: '☀️' },
  { id: 'lx_fasl_syita', ar_vocalized: 'فَصْلُ الشِّتَاء', ar_plain: 'فصل الشتاء', translit: 'faṣlu sh-shitāʾ', gloss_id: 'musim dingin bersalju', owner_island: 'MFR', level: 3, skill_id: 'MFR-L3-02', pos: 'phrase', category: 'Cuaca & Musim', visual_hint: '⛄' },

  // Jamak Taksir Populer (MFR-L3-03)
  { id: 'lx_kutub', ar_vocalized: 'كُتُب', ar_plain: 'كتب', translit: 'kutub', gloss_id: 'buku-buku (jamak dari kitāb)', owner_island: 'MFR', level: 3, skill_id: 'MFR-L3-03', pos: 'isim', category: 'Jamak Taksir', visual_hint: '📚' },
  { id: 'lx_aqlam', ar_vocalized: 'أَقْلَام', ar_plain: 'أقلام', translit: 'aqlām', gloss_id: 'pena-pena (jamak dari qalam)', owner_island: 'MFR', level: 3, skill_id: 'MFR-L3-03', pos: 'isim', category: 'Jamak Taksir', visual_hint: '🖊️' },
  { id: 'lx_awlad', ar_vocalized: 'أَوْلَاد', ar_plain: 'أولاد', translit: 'awlād', gloss_id: 'anak-anak (jamak dari walad)', owner_island: 'MFR', level: 3, skill_id: 'MFR-L3-03', pos: 'isim', category: 'Jamak Taksir', visual_hint: '👦' },
  { id: 'lx_buyut', ar_vocalized: 'بُيُوت', ar_plain: 'بيوت', translit: 'buyūt', gloss_id: 'rumah-rumah (jamak dari bayt)', owner_island: 'MFR', level: 3, skill_id: 'MFR-L3-03', pos: 'isim', category: 'Jamak Taksir', visual_hint: '🏘️' },
  { id: 'lx_masajid', ar_vocalized: 'مَسَاجِد', ar_plain: 'مساجد', translit: 'masājid', gloss_id: 'masjid-masjid (jamak dari masjid)', owner_island: 'MFR', level: 3, skill_id: 'MFR-L3-03', pos: 'isim', category: 'Jamak Taksir', visual_hint: '🕌' },

  // Geografi & Bentang Alam (MFR-L3-04)
  { id: 'lx_jabal', ar_vocalized: 'جَبَل', ar_plain: 'جبل', translit: 'jabal', gloss_id: 'gunung menjulang tinggi', owner_island: 'MFR', level: 3, skill_id: 'MFR-L3-04', pos: 'isim', category: 'Geografi', visual_hint: '⛰️' },
  { id: 'lx_nahr', ar_vocalized: 'نَهْر', ar_plain: 'نهر', translit: 'nahr', gloss_id: 'sungai mengalir jernih', owner_island: 'MFR', level: 3, skill_id: 'MFR-L3-04', pos: 'isim', category: 'Geografi', visual_hint: '🏞️' },
  { id: 'lx_bahr', ar_vocalized: 'بَحْر', ar_plain: 'بحر', translit: 'baḥr', gloss_id: 'laut samudra biru luas', owner_island: 'MFR', level: 3, skill_id: 'MFR-L3-04', pos: 'isim', category: 'Geografi', visual_hint: '🌊' },
  { id: 'lx_sahra', ar_vocalized: 'صَحْرَاء', ar_plain: 'صحراء', translit: 'ṣaḥrāʾ', gloss_id: 'padang pasir bukit pasir', owner_island: 'MFR', level: 3, skill_id: 'MFR-L3-04', pos: 'isim', category: 'Geografi', visual_hint: '🏜️' },
  { id: 'lx_jazirah_geo', ar_vocalized: 'جَزِيرَة', ar_plain: 'جزيرة', translit: 'jazīrah', gloss_id: 'pulau di tengah perairan', owner_island: 'MFR', level: 3, skill_id: 'MFR-L3-04', pos: 'isim', category: 'Geografi', visual_hint: '🏝️' },

  // Kesehatan & Gejala Medis (MFR-L3-05)
  { id: 'lx_sihhah', ar_vocalized: 'صِحَّة', ar_plain: 'صحة', translit: 'ṣiḥḥah', gloss_id: 'kebugaran kesehatan raga', owner_island: 'MFR', level: 3, skill_id: 'MFR-L3-05', pos: 'isim', category: 'Kesehatan', visual_hint: '💪' },
  { id: 'lx_maradh', ar_vocalized: 'مَرَض', ar_plain: 'مرض', translit: 'maraḍ', gloss_id: 'penyakit keluhan sakit', owner_island: 'MFR', level: 3, skill_id: 'MFR-L3-05', pos: 'isim', category: 'Kesehatan', visual_hint: '🤒' },
  { id: 'lx_dawa', ar_vocalized: 'دَوَاء', ar_plain: 'دواء', translit: 'dawāʾ', gloss_id: 'obat penawar penyakit', owner_island: 'MFR', level: 3, skill_id: 'MFR-L3-05', pos: 'isim', category: 'Kesehatan', visual_hint: '💊' },
  { id: 'lx_syifa', ar_vocalized: 'شِفَاء', ar_plain: 'شفاء', translit: 'shifāʾ', gloss_id: 'kesembuhan paripurna', owner_island: 'MFR', level: 3, skill_id: 'MFR-L3-05', pos: 'isim', category: 'Kesehatan', visual_hint: '✨' },

  // Hobi & Olahraga (MFR-L3-06)
  { id: 'lx_riyadhah', ar_vocalized: 'رِيَاضَة', ar_plain: 'رياضة', translit: 'riyāḍah', gloss_id: 'olahraga aktivitas fisik', owner_island: 'MFR', level: 3, skill_id: 'MFR-L3-06', pos: 'isim', category: 'Hobi & Olahraga', visual_hint: '🏃' },
  { id: 'lx_kurat_qadam', ar_vocalized: 'كُرَةُ القَدَم', ar_plain: 'كرة القدم', translit: 'kuratu l-qadam', gloss_id: 'sepak bola lapangan', owner_island: 'MFR', level: 3, skill_id: 'MFR-L3-06', pos: 'phrase', category: 'Hobi & Olahraga', visual_hint: '⚽' },
  { id: 'lx_sibahah', ar_vocalized: 'سِبَاحَة', ar_plain: 'سباحة', translit: 'sibāḥah', gloss_id: 'renang mengarungi air', owner_island: 'MFR', level: 3, skill_id: 'MFR-L3-06', pos: 'isim', category: 'Hobi & Olahraga', visual_hint: '🏊' },
  { id: 'lx_rasm', ar_vocalized: 'رَسْم', ar_plain: 'رسم', translit: 'rasm', gloss_id: 'seni lukis & menggambar', owner_island: 'MFR', level: 3, skill_id: 'MFR-L3-06', pos: 'isim', category: 'Hobi & Olahraga', visual_hint: '🎨' },

  // Level 4: Mutawassith 2 (B2) - Sains, Digital, Bisnis, Lingkungan & Pariwisata
  // Sains & Teknologi Digital (MFR-L4-01)
  { id: 'lx_hasub', ar_vocalized: 'حَاسُوب', ar_plain: 'حاسوب', translit: 'ḥāsūb', gloss_id: 'komputer digital prosesor', owner_island: 'MFR', level: 4, skill_id: 'MFR-L4-01', pos: 'isim', category: 'Sains & Teknologi', visual_hint: '💻' },
  { id: 'lx_hatif', ar_vocalized: 'هَاتِف', ar_plain: 'هاتف', translit: 'hātif', gloss_id: 'telepon genggam pintar', owner_island: 'MFR', level: 4, skill_id: 'MFR-L4-01', pos: 'isim', category: 'Sains & Teknologi', visual_hint: '📱' },
  { id: 'lx_syabakah', ar_vocalized: 'شَبَكَة', ar_plain: 'شبكة', translit: 'shabakah', gloss_id: 'jaringan internet dunia', owner_island: 'MFR', level: 4, skill_id: 'MFR-L4-01', pos: 'isim', category: 'Sains & Teknologi', visual_hint: '🌐' },
  { id: 'lx_kahraba', ar_vocalized: 'كَهْرَبَاء', ar_plain: 'كهرباء', translit: 'kahrabāʾ', gloss_id: 'daya energi listrik', owner_island: 'MFR', level: 4, skill_id: 'MFR-L4-01', pos: 'isim', category: 'Sains & Teknologi', visual_hint: '⚡' },
  { id: 'lx_barnamaj', ar_vocalized: 'بَرْنَامَج', ar_plain: 'برنامج', translit: 'barnāmaj', gloss_id: 'perangkat lunak / aplikasi', owner_island: 'MFR', level: 4, skill_id: 'MFR-L4-01', pos: 'isim', category: 'Sains & Teknologi', visual_hint: '💾' },

  // Media & Pers (MFR-L4-02)
  { id: 'lx_jaridah', ar_vocalized: 'جَرِيدَة', ar_plain: 'جريدة', translit: 'jarīdah', gloss_id: 'surat kabar harian berita', owner_island: 'MFR', level: 4, skill_id: 'MFR-L4-02', pos: 'isim', category: 'Media & Pers', visual_hint: '📰' },
  { id: 'lx_majallah', ar_vocalized: 'مَجَلَّة', ar_plain: 'مجلة', translit: 'majallah', gloss_id: 'majalah rubrik berkala', owner_island: 'MFR', level: 4, skill_id: 'MFR-L4-02', pos: 'isim', category: 'Media & Pers', visual_hint: '📑' },
  { id: 'lx_akhbar', ar_vocalized: 'أَخْبَار', ar_plain: 'أخبار', translit: 'akhbār', gloss_id: 'warta berita terkini', owner_island: 'MFR', level: 4, skill_id: 'MFR-L4-02', pos: 'isim', category: 'Media & Pers', visual_hint: '📺' },
  { id: 'lx_qanah', ar_vocalized: 'قَنَاة', ar_plain: 'قناة', translit: 'qanāh', gloss_id: 'saluran televisi / siaran', owner_island: 'MFR', level: 4, skill_id: 'MFR-L4-02', pos: 'isim', category: 'Media & Pers', visual_hint: '📡' },

  // Bisnis & Manajemen (MFR-L4-03)
  { id: 'lx_syarikah', ar_vocalized: 'شَرِكَة', ar_plain: 'شركة', translit: 'sharikah', gloss_id: 'perusahaan korporasi', owner_island: 'MFR', level: 4, skill_id: 'MFR-L4-03', pos: 'isim', category: 'Bisnis', visual_hint: '🏢' },
  { id: 'lx_idarah', ar_vocalized: 'إِدَارَة', ar_plain: 'إدارة', translit: 'idārah', gloss_id: 'manajemen kepengurusan', owner_island: 'MFR', level: 4, skill_id: 'MFR-L4-03', pos: 'isim', category: 'Bisnis', visual_hint: '📊' },
  { id: 'lx_mudir', ar_vocalized: 'مُدِير', ar_plain: 'مدير', translit: 'mudīr', gloss_id: 'direktur kepala pemimpin', owner_island: 'MFR', level: 4, skill_id: 'MFR-L4-03', pos: 'isim', category: 'Bisnis', visual_hint: '👔' },
  { id: 'lx_mashraf', ar_vocalized: 'مَصْرِف', ar_plain: 'مصرف', translit: 'maṣrif', gloss_id: 'bank sentral keuangan', owner_island: 'MFR', level: 4, skill_id: 'MFR-L4-03', pos: 'isim', category: 'Bisnis', visual_hint: '🏦' },

  // Lingkungan & Ekologi (MFR-L4-04)
  { id: 'lx_biah', ar_vocalized: 'بِيئَة', ar_plain: 'بيئة', translit: 'bīʾah', gloss_id: 'lingkungan alam sekitar', owner_island: 'MFR', level: 4, skill_id: 'MFR-L4-04', pos: 'isim', category: 'Lingkungan', visual_hint: '🌱' },
  { id: 'lx_talawwuts', ar_vocalized: 'تَلَوُّث', ar_plain: 'تلوث', translit: 'talawwuth', gloss_id: 'pencemaran polusi udara/air', owner_island: 'MFR', level: 4, skill_id: 'MFR-L4-04', pos: 'isim', category: 'Lingkungan', visual_hint: '🏭' },
  { id: 'lx_thaqah_mutajaddidah', ar_vocalized: 'طَاقَةٌ مُتَجَدِّدَة', ar_plain: 'طاقة متجددة', translit: 'ṭāqatun mutajaddidah', gloss_id: 'energi baru terbarukan', owner_island: 'MFR', level: 4, skill_id: 'MFR-L4-04', pos: 'phrase', category: 'Lingkungan', visual_hint: '☀️🌬️' },

  // Idiom & Peribahasa (MFR-L4-05)
  { id: 'lx_yadan_bi_yad', ar_vocalized: 'يَدًا بِيَد', ar_plain: 'يدا بيد', translit: 'yadan bi-yad', gloss_id: 'bergandengan tangan (kerja sama kompak)', owner_island: 'MFR', level: 4, skill_id: 'MFR-L4-05', pos: 'phrase', category: 'Idiom & Bahasa', visual_hint: '🤝' },
  { id: 'lx_min_samim_qalb', ar_vocalized: 'مِنْ صَمِيمِ القَلْب', ar_plain: 'من صميم القلب', translit: 'min ṣamīmi l-qalb', gloss_id: 'dari lubuk hati yang paling dalam', owner_island: 'MFR', level: 4, skill_id: 'MFR-L4-05', pos: 'phrase', category: 'Idiom & Bahasa', visual_hint: '💖' },
  { id: 'lx_ala_kulli_hal', ar_vocalized: 'عَلَى كُلِّ حَال', ar_plain: 'على كل حال', translit: 'ʿalā kulli ḥāl', gloss_id: 'bagaimanapun keadaannya', owner_island: 'MFR', level: 4, skill_id: 'MFR-L4-05', pos: 'phrase', category: 'Idiom & Bahasa', visual_hint: '🧭' },

  // Pariwisata & Bandara (MFR-L4-06)
  { id: 'lx_jawaz_safar', ar_vocalized: 'جَوَازُ السَّفَر', ar_plain: 'جواز السفر', translit: 'jawāzu s-safar', gloss_id: 'paspor perjalanan antarnegara', owner_island: 'MFR', level: 4, skill_id: 'MFR-L4-06', pos: 'phrase', category: 'Pariwisata', visual_hint: '🛂' },
  { id: 'lx_tasyirah', ar_vocalized: 'تَأْشِيرَة', ar_plain: 'تأشيرة', translit: 'taʾshīrah', gloss_id: 'visa izin tinggal kunjungan', owner_island: 'MFR', level: 4, skill_id: 'MFR-L4-06', pos: 'isim', category: 'Pariwisata', visual_hint: '🔖' },
  { id: 'lx_tadzkirah', ar_vocalized: 'تَذْكِرَة', ar_plain: 'تذكرة', translit: 'tadhkirah', gloss_id: 'tiket tiket penerbangan/perjalanan', owner_island: 'MFR', level: 4, skill_id: 'MFR-L4-06', pos: 'isim', category: 'Pariwisata', visual_hint: '🎟️' },

  // Level 5: Mutaqaddim (C1-C2) - Taraduf, Diplomasi, Sastra, Filsafat, Makroekonomi & Turats
  // Nuansa Makna & Taraduf (MFR-L5-01)
  { id: 'lx_trd_farah_surur', ar_vocalized: 'فَرَح / سُرُور', ar_plain: 'فرح / سرور', translit: 'faraḥ vs surūr', gloss_id: 'kegembiraan spontan lahiriah vs kebahagiaan batin tenteram', owner_island: 'MFR', level: 5, skill_id: 'MFR-L5-01', pos: 'phrase', category: 'Nuansa Bahasa', visual_hint: '😊💖' },
  { id: 'lx_trd_matar_ghayth', ar_vocalized: 'مَطَر / غَيْث', ar_plain: 'مطر / غيث', translit: 'maṭar vs ghayth', gloss_id: 'hujan biasa/azab vs hujan rahmat penolong kekeringan', owner_island: 'MFR', level: 5, skill_id: 'MFR-L5-01', pos: 'phrase', category: 'Nuansa Bahasa', visual_hint: '🌧️🌱' },
  { id: 'lx_trd_jalasa_qaada', ar_vocalized: 'جَلَسَ / قَعَدَ', ar_plain: 'جلس / قعد', translit: 'jalasa vs qaʿada', gloss_id: 'duduk dari berbaring vs duduk dari berdiri tegak', owner_island: 'MFR', level: 5, skill_id: 'MFR-L5-01', pos: 'phrase', category: 'Nuansa Bahasa', visual_hint: '🪑' },

  // Diplomasi & Hukum Internasional (MFR-L5-02)
  { id: 'lx_sifarah', ar_vocalized: 'سِفَارَة', ar_plain: 'سفارة', translit: 'sifārah', gloss_id: 'kedutaan besar perwakilan', owner_island: 'MFR', level: 5, skill_id: 'MFR-L5-02', pos: 'isim', category: 'Diplomasi', visual_hint: '🏛️' },
  { id: 'lx_safir', ar_vocalized: 'سَفِير', ar_plain: 'سفير', translit: 'safīr', gloss_id: 'duta besar perunding', owner_island: 'MFR', level: 5, skill_id: 'MFR-L5-02', pos: 'isim', category: 'Diplomasi', visual_hint: '🤵' },
  { id: 'lx_muahadah', ar_vocalized: 'مُعَاهَدَةٌ دَوْلِيَّة', ar_plain: 'معاهدة دولية', translit: 'muʿāhadatun dawliyyah', gloss_id: 'perjanjian traktat internasional', owner_island: 'MFR', level: 5, skill_id: 'MFR-L5-02', pos: 'phrase', category: 'Diplomasi', visual_hint: '📜' },
  { id: 'lx_siyadah', ar_vocalized: 'سِيَادَة', ar_plain: 'سيادة', translit: 'siyādah', gloss_id: 'kedaulatan negara merdeka', owner_island: 'MFR', level: 5, skill_id: 'MFR-L5-02', pos: 'isim', category: 'Diplomasi', visual_hint: '👑' },

  // Sastra Arab & Balaghah (MFR-L5-03)
  { id: 'lx_syair_arab', ar_vocalized: 'شِعْر', ar_plain: 'شعر', translit: 'shiʿr', gloss_id: 'puisi bait syair ritmis', owner_island: 'MFR', level: 5, skill_id: 'MFR-L5-03', pos: 'isim', category: 'Sastra', visual_hint: '📜' },
  { id: 'lx_qasidah', ar_vocalized: 'قَصِيدَة', ar_plain: 'قصيدة', translit: 'qaṣīdah', gloss_id: 'antologi puisi qasidah agung', owner_island: 'MFR', level: 5, skill_id: 'MFR-L5-03', pos: 'isim', category: 'Sastra', visual_hint: '✒️' },
  { id: 'lx_istiarah', ar_vocalized: 'اِسْتِعَارَة', ar_plain: 'استعارة', translit: 'istiʿārah', gloss_id: 'metafora gaya bahasa balaghah', owner_island: 'MFR', level: 5, skill_id: 'MFR-L5-03', pos: 'isim', category: 'Sastra', visual_hint: '✨' },
  { id: 'lx_kinayah', ar_vocalized: 'كِنَايَة', ar_plain: 'كناية', translit: 'kināyah', gloss_id: 'makna tersirat kiasan halus', owner_island: 'MFR', level: 5, skill_id: 'MFR-L5-03', pos: 'isim', category: 'Sastra', visual_hint: '🔮' },

  // Filsafat & Pemikiran (MFR-L5-04)
  { id: 'lx_falsafah', ar_vocalized: 'فَلْسَفَة', ar_plain: 'فلسفة', translit: 'falsafah', gloss_id: 'filsafat pencarian hikmah kebenaran', owner_island: 'MFR', level: 5, skill_id: 'MFR-L5-04', pos: 'isim', category: 'Filsafat', visual_hint: '🦉' },
  { id: 'lx_burhan_fils', ar_vocalized: 'بُرْهَان', ar_plain: 'برهان', translit: 'burhān', gloss_id: 'argumentasi bukti demonstratif konklusif', owner_island: 'MFR', level: 5, skill_id: 'MFR-L5-04', pos: 'isim', category: 'Filsafat', visual_hint: '💡' },
  { id: 'lx_hadharah', ar_vocalized: 'حَضَارَة', ar_plain: 'حضارة', translit: 'ḥaḍārah', gloss_id: 'peradaban kemajuan peradaban luhur', owner_island: 'MFR', level: 5, skill_id: 'MFR-L5-04', pos: 'isim', category: 'Filsafat', visual_hint: '🏛️' },

  // Ekonomi Makro & Moneter (MFR-L5-05)
  { id: 'lx_iqtishad', ar_vocalized: 'اِقْتِصَاد', ar_plain: 'اقتصاد', translit: 'iqtiṣād', gloss_id: 'ekonomi tata kelola sumber daya', owner_island: 'MFR', level: 5, skill_id: 'MFR-L5-05', pos: 'isim', category: 'Ekonomi Makro', visual_hint: '📈' },
  { id: 'lx_tadakhkhum', ar_vocalized: 'تَضَخُّم', ar_plain: 'تضخم', translit: 'taḍakhkhum', gloss_id: 'inflasi kenaikan harga umum', owner_island: 'MFR', level: 5, skill_id: 'MFR-L5-05', pos: 'isim', category: 'Ekonomi Makro', visual_hint: '📉' },
  { id: 'lx_aswaq_maliyyah', ar_vocalized: 'أَسْوَاقٌ مَالِيَّة', ar_plain: 'أسواق مالية', translit: 'aswāqun māliyyah', gloss_id: 'pasar bursa modal & keuangan', owner_island: 'MFR', level: 5, skill_id: 'MFR-L5-05', pos: 'phrase', category: 'Ekonomi Makro', visual_hint: '💹' },

  // Khazanah Turats & Qur'ani (MFR-L5-06)
  { id: 'lx_furqan', ar_vocalized: 'فُرْقَان', ar_plain: 'فرقان', translit: 'furqān', gloss_id: 'pembeda hakiki antara haq dan bathil', owner_island: 'MFR', level: 5, skill_id: 'MFR-L5-06', pos: 'isim', category: 'Khazanah Turats', visual_hint: '📖' },
  { id: 'lx_hikmah', ar_vocalized: 'حِكْمَة', ar_plain: 'حكمة', translit: 'ḥikmah', gloss_id: 'kearifan hikmah mendalam', owner_island: 'MFR', level: 5, skill_id: 'MFR-L5-06', pos: 'isim', category: 'Khazanah Turats', visual_hint: '🌟' },
  { id: 'lx_sakinah', ar_vocalized: 'سَكِينَة', ar_plain: 'سكينة', translit: 'sakīnah', gloss_id: 'ketenangan batin kedamaian ilahi', owner_island: 'MFR', level: 5, skill_id: 'MFR-L5-06', pos: 'isim', category: 'Khazanah Turats', visual_hint: '🕊️' },

  // --- HWR (Kampung Hiwar - Kosakata & Frasa Percakapan Nyata Bertingkat) ---
  // Level 0: Tamhidi (Pra-A1)
  { id: 'lx_salam', ar_vocalized: 'السَّلَامُ عَلَيْكُمْ', ar_plain: 'السلام عليكم', translit: 'as-salāmu ʿalaykum', gloss_id: 'semoga keselamatan atas kalian (salam islami pembuka)', owner_island: 'HWR', level: 0, skill_id: 'HWR-L0-01', pos: 'phrase', category: 'Salam & Sapaan', visual_hint: '🤝' },
  { id: 'lx_wa_salam', ar_vocalized: 'وَعَلَيْكُمُ السَّلَام', ar_plain: 'وعليكم السلام', translit: 'wa ʿalaykumu s-salām', gloss_id: 'dan atas kalian keselamatan (jawaban salam)', owner_island: 'HWR', level: 0, skill_id: 'HWR-L0-01', pos: 'phrase', category: 'Salam & Sapaan', visual_hint: '✨' },
  { id: 'lx_shabah_khayr', ar_vocalized: 'صَبَاحَ الخَيْر', ar_plain: 'صباح الخير', translit: 'ṣabāḥ al-khayr', gloss_id: 'selamat pagi penuh berkah', owner_island: 'HWR', level: 0, skill_id: 'HWR-L0-01', pos: 'phrase', category: 'Salam & Sapaan', visual_hint: '🌅' },
  { id: 'lx_shabah_nuur', ar_vocalized: 'صَبَاحَ النُّور', ar_plain: 'صباح النور', translit: 'ṣabāḥ an-nūr', gloss_id: 'selamat pagi bercahaya (jawaban)', owner_island: 'HWR', level: 0, skill_id: 'HWR-L0-01', pos: 'phrase', category: 'Salam & Sapaan', visual_hint: '☀️' },
  { id: 'lx_masa_khayr', ar_vocalized: 'مَسَاءَ الخَيْر', ar_plain: 'مساء الخير', translit: 'masāʾ al-khayr', gloss_id: 'selamat sore / petang', owner_island: 'HWR', level: 0, skill_id: 'HWR-L0-01', pos: 'phrase', category: 'Salam & Sapaan', visual_hint: '🌙' },
  { id: 'lx_ahlan_sahlan', ar_vocalized: 'أَهْلًا وَسَهْلًا', ar_plain: 'أهلا وسهلا', translit: 'ahlan wa sahlan', gloss_id: 'selamat datang dengan hangat', owner_island: 'HWR', level: 0, skill_id: 'HWR-L0-01', pos: 'phrase', category: 'Salam & Sapaan', visual_hint: '🏡' },
  { id: 'lx_ma_ismuka', ar_vocalized: 'مَا اسْمُكَ؟', ar_plain: 'ما اسمك؟', translit: 'mā ismuka?', gloss_id: 'siapa namamu? (ke laki-laki)', owner_island: 'HWR', level: 0, skill_id: 'HWR-L0-02', pos: 'phrase', category: 'Perkenalan', visual_hint: '👤' },
  { id: 'lx_ma_ismuki', ar_vocalized: 'مَا اسْمُكِ؟', ar_plain: 'ما اسمكِ؟', translit: 'mā ismuki?', gloss_id: 'siapa namamu? (ke perempuan)', owner_island: 'HWR', level: 0, skill_id: 'HWR-L0-02', pos: 'phrase', category: 'Perkenalan', visual_hint: '🧕' },
  { id: 'lx_ismi', ar_vocalized: 'اِسْمِي...', ar_plain: 'اسمي', translit: 'ismī...', gloss_id: 'namaku adalah...', owner_island: 'HWR', level: 0, skill_id: 'HWR-L0-02', pos: 'phrase', category: 'Perkenalan', visual_hint: '🏷️' },
  { id: 'lx_tasyarrafna', ar_vocalized: 'تَشَرَّفْنَا بِمَعْرِفَتِكَ', ar_plain: 'تشرفنا بمعرفتك', translit: 'tasyarrafnā bi-maʿrifatik', gloss_id: 'suatu kehormatan berkenalan denganmu', owner_island: 'HWR', level: 0, skill_id: 'HWR-L0-02', pos: 'phrase', category: 'Perkenalan', visual_hint: '🌟' },
  { id: 'lx_ma_hadha', ar_vocalized: 'مَا هٰذَا؟ هٰذَا كِتَابٌ', ar_plain: 'ما هذا؟ هذا كتاب', translit: 'mā hādhā? hādhā kitāb', gloss_id: 'apa ini? ini buku (kata tunjuk maskulin)', owner_island: 'HWR', level: 0, skill_id: 'HWR-L0-03', pos: 'phrase', category: 'Benda Sekitar', visual_hint: '📖' },
  { id: 'lx_ma_hadhihi', ar_vocalized: 'مَا هٰذِهِ؟ هٰذِهِ سَاعَةٌ', ar_plain: 'ما هذه؟ هذه ساعة', translit: 'mā hādhihi? hādhihi sāʿah', gloss_id: 'apa ini? ini jam (kata tunjuk feminin)', owner_island: 'HWR', level: 0, skill_id: 'HWR-L0-03', pos: 'phrase', category: 'Benda Sekitar', visual_hint: '⏰' },
  { id: 'lx_maas_salamah', ar_vocalized: 'مَعَ السَّلَامَةِ', ar_plain: 'مع السلامة', translit: 'maʿa s-salāmah', gloss_id: 'selamat jalan / perpisahan damai', owner_island: 'HWR', level: 0, skill_id: 'HWR-L0-04', pos: 'phrase', category: 'Perpisahan', visual_hint: '👋' },
  { id: 'lx_ila_lliqa', ar_vocalized: 'إِلَى اللِّقَاءِ فِي أَمَانِ اللَّهِ', ar_plain: 'إلى اللقاء في أمان الله', translit: 'ilā l-liqāʾi fī amāni Llāh', gloss_id: 'sampai jumpa lagi dalam lindungan Allah', owner_island: 'HWR', level: 0, skill_id: 'HWR-L0-04', pos: 'phrase', category: 'Perpisahan', visual_hint: '🕊️' },

  // Level 1: Mubtadi' 1 (A1.1)
  { id: 'lx_kayfa_haluk', ar_vocalized: 'كَيْفَ حَالُكَ؟', ar_plain: 'كيف حالك؟', translit: 'kayfa ḥāluka?', gloss_id: 'bagaimana kabarmu?', owner_island: 'HWR', level: 1, skill_id: 'HWR-L1-01', pos: 'phrase', category: 'Kabar', visual_hint: '❓' },
  { id: 'lx_alhamdulillah', ar_vocalized: 'الحَمْدُ لِلَّهِ بِخَيْرٍ وَعَافِيَة', ar_plain: 'الحمد لله بخير وعافية', translit: 'al-ḥamdu lillāhi bi-khayrin wa-ʿāfiyah', gloss_id: 'alhamdulillah sehat wal afiat', owner_island: 'HWR', level: 1, skill_id: 'HWR-L1-01', pos: 'phrase', category: 'Kabar', visual_hint: '🤲' },
  { id: 'lx_syukran', ar_vocalized: 'شُكْرًا جَزِيلًا', ar_plain: 'شكرا جزيلا', translit: 'shukran jazīlan', gloss_id: 'terima kasih banyak', owner_island: 'HWR', level: 1, skill_id: 'HWR-L1-02', pos: 'phrase', category: 'Kesantunan', visual_hint: '🙏' },
  { id: 'lx_afwan', ar_vocalized: 'عَفْوًا، أَهْلًا بِكَ', ar_plain: 'عفوا، أهلا بك', translit: 'ʿafwan, ahlan bika', gloss_id: 'sama-sama, dengan senang hati', owner_island: 'HWR', level: 1, skill_id: 'HWR-L1-02', pos: 'phrase', category: 'Kesantunan', visual_hint: '🤝' },
  { id: 'lx_min_fadhlika', ar_vocalized: 'مِنْ فَضْلِكَ / لَوْ سَمَحْتَ', ar_plain: 'من فضلك / لو سمحت', translit: 'min faḍlika / law samaḥta', gloss_id: 'jika Anda berkenan / tolong / permisi', owner_island: 'HWR', level: 1, skill_id: 'HWR-L1-02', pos: 'phrase', category: 'Kesantunan', visual_hint: '💐' },
  { id: 'lx_min_ayna', ar_vocalized: 'مِنْ أَيْنَ أَنْتَ؟', ar_plain: 'من أين أنت؟', translit: 'min ayna anta?', gloss_id: 'dari mana Anda berasal?', owner_island: 'HWR', level: 1, skill_id: 'HWR-L1-03', pos: 'phrase', category: 'Kebangsaan', visual_hint: '🌏' },
  { id: 'lx_ana_min', ar_vocalized: 'أَنَا مِنْ إِنْدُونِيسِيَا', ar_plain: 'أنا من إندونيسيا', translit: 'anā min Indūnīsiyā', gloss_id: 'saya berasal dari Indonesia', owner_island: 'HWR', level: 1, skill_id: 'HWR-L1-03', pos: 'phrase', category: 'Kebangsaan', visual_hint: '🇮🇩' },
  { id: 'lx_madha_tamal', ar_vocalized: 'مَاذَا تَعْمَلُ؟ أَنَا طَالِبٌ', ar_plain: 'ماذا تعمل؟ أنا طالب', translit: 'mādhā taʿmalu? anā ṭālib', gloss_id: 'apa pekerjaanmu? saya seorang pelajar', owner_island: 'HWR', level: 1, skill_id: 'HWR-L1-04', pos: 'phrase', category: 'Profesi', visual_hint: '🎒' },
  { id: 'lx_mudarris', ar_vocalized: 'أَنَا مُدَرِّسُ اللُّغَةِ العَرَبِيَّة', ar_plain: 'أنا مدرس اللغة العربية', translit: 'anā mudarrisu l-lughati l-ʿarabiyyah', gloss_id: 'saya guru pengajar bahasa Arab', owner_island: 'HWR', level: 1, skill_id: 'HWR-L1-04', pos: 'phrase', category: 'Profesi', visual_hint: '👨‍🏫' },

  // Level 2: Mubtadi' 2 (A1.2)
  { id: 'lx_bikam_hadha', ar_vocalized: 'بِكَمْ هٰذَا؟ هٰذَا بِعَشَرَةِ دَنَانِير', ar_plain: 'بكم هذا؟ هذا بعشرة دنانير', translit: 'bikam hādhā? hādhā bi-ʿasyarati danānīr', gloss_id: 'berapa harganya? harganya sepuluh dinar', owner_island: 'HWR', level: 2, skill_id: 'HWR-L2-01', pos: 'phrase', category: 'Pasar', visual_hint: '💰' },
  { id: 'lx_uridu_khubz', ar_vocalized: 'أُرِيدُ رَغِيفَ خُبْزٍ وَكِيلُو تَمْر', ar_plain: 'أريد رغيف خبز وكيلو تمر', translit: 'urīdu raghīfa khubzin wa-kīlū tamr', gloss_id: 'saya ingin sepotong roti dan sekilo kurma', owner_island: 'HWR', level: 2, skill_id: 'HWR-L2-01', pos: 'phrase', category: 'Pasar', visual_hint: '🥖' },
  { id: 'lx_ghalin_rakhish', ar_vocalized: 'هٰذَا غَالٍ قَلِيلًا، هَلْ تُخَفِّضُ؟', ar_plain: 'هذا غال قليلا، هل تخفض؟', translit: 'hādhā ghālin qalīlan, hal tukhaffiḍ?', gloss_id: 'ini agak mahal, bisakah dikurangi harganya?', owner_island: 'HWR', level: 2, skill_id: 'HWR-L2-01', pos: 'phrase', category: 'Pasar', visual_hint: '🏷️' },
  { id: 'lx_qaimat_taam', ar_vocalized: 'أَيْنَ قَائِمَةُ الطَّعَامِ مِنْ فَضْلِكَ؟', ar_plain: 'أين قائمة الطعام من فضلك؟', translit: 'ayna qāʾimatu ṭ-ṭaʿāmi min faḍlik?', gloss_id: 'di mana buku menu hidangannya tolong?', owner_island: 'HWR', level: 2, skill_id: 'HWR-L2-02', pos: 'phrase', category: 'Restoran', visual_hint: '📜' },
  { id: 'lx_syay_nanaa', ar_vocalized: 'أُرِيدُ كُوبَ شَايٍ بِالنَّعْنَاعِ دَافِئًا', ar_plain: 'أريد كوب شاي بالنعناع دافئا', translit: 'urīdu kūba syāyin bi-n-naʿnāʿi dāfiʾan', gloss_id: 'saya pesan secangkir teh mint hangat', owner_island: 'HWR', level: 2, skill_id: 'HWR-L2-02', pos: 'phrase', category: 'Restoran', visual_hint: '🍵' },
  { id: 'lx_alhisab', ar_vocalized: 'الحِسَابُ لَوْ سَمَحْتَ، تَفَضَّلِ النُّقُود', ar_plain: 'الحساب لو سمحت، تفضل النقود', translit: 'al-ḥisābu law samaḥta, tafaḍḍali n-nuqūd', gloss_id: 'minta nota pembayarannya, ini uangnya', owner_island: 'HWR', level: 2, skill_id: 'HWR-L2-02', pos: 'phrase', category: 'Restoran', visual_hint: '💳' },
  { id: 'lx_ayna_almasjid', ar_vocalized: 'أَيْنَ المَسْجِدُ الجَامِعُ؟', ar_plain: 'أين المسجد الجامع؟', translit: 'ayna l-masjidu l-jāmiʿ?', gloss_id: 'di mana lokasi masjid agung kota?', owner_island: 'HWR', level: 2, skill_id: 'HWR-L2-03', pos: 'phrase', category: 'Arah', visual_hint: '🕌' },
  { id: 'lx_yamiin_amaman', ar_vocalized: 'اِتَّجِهْ إِلَى اليَمِينِ ثُمَّ أَمَامًا', ar_plain: 'اتجه إلى اليمين ثم أماما', translit: 'ittajih ilā l-yamīni thumma amāmā', gloss_id: 'beloklah ke kanan kemudian lurus ke depan', owner_island: 'HWR', level: 2, skill_id: 'HWR-L2-03', pos: 'phrase', category: 'Arah', visual_hint: '➡️' },
  { id: 'lx_ahlan_dhuyuf', ar_vocalized: 'أَهْلًا بِالضُّيُوفِ، تَفَضَّلُوا بِالدُّخُول', ar_plain: 'أهلا بالضيوف، تفضلوا بالدخول', translit: 'ahlan bi-ḍ-ḍuyūfi, tafaḍḍalū bi-d-dukhūl', gloss_id: 'selamat datang para tamu, silakan masuk ke ruang tamu', owner_island: 'HWR', level: 2, skill_id: 'HWR-L2-04', pos: 'phrase', category: 'Silaturahmi', visual_hint: '🚪' },

  // Level 3: Mutawassith 1 (A2.1)
  { id: 'lx_asyuru_bi_alam', ar_vocalized: 'أَشْعُرُ بِأَلَمٍ حَادٍّ فِي رَأْسِي', ar_plain: 'أشعر بألم حاد في رأسي', translit: 'asyaʿuru bi-alamin ḥāddin fī raʾsī', gloss_id: 'saya merasakan sakit berdenyut di kepala', owner_island: 'HWR', level: 3, skill_id: 'HWR-L3-01', pos: 'phrase', category: 'Medis', visual_hint: '🩺' },
  { id: 'lx_syafakallah', ar_vocalized: 'شَفَاكَ اللَّهُ طَهُورٌ إِنْ شَاءَ اللَّه', ar_plain: 'شفاك الله طهور إن شاء الله', translit: 'syafāka Llāhu ṭahūrun in syāʾa Llāh', gloss_id: 'semoga Allah menyembuhkanmu, penyucian dosa insya Allah', owner_island: 'HWR', level: 3, skill_id: 'HWR-L3-01', pos: 'phrase', category: 'Medis', visual_hint: '💊' },
  { id: 'lx_jawaz_asafar', ar_vocalized: 'تَفَضَّلْ جَوَازَ السَّفَرِ وَتَذْكِرَةَ الطَّائِرَة', ar_plain: 'تفضل جواز السفر وتذكرة الطائرة', translit: 'tafaḍḍal jawāza s-safari wa-tadhkirata ṭ-ṭāʾirah', gloss_id: 'silakan paspor dan tiket pesawat terbangnya', owner_island: 'HWR', level: 3, skill_id: 'HWR-L3-02', pos: 'phrase', category: 'Bandara', visual_hint: '✈️' },
  { id: 'lx_rihlah_saidah', ar_vocalized: 'رِحْلَةً سَعِيدَةً وَفِي أَمَانِ اللَّهِ', ar_plain: 'رحلة سعيدة وفي أمان الله', translit: 'riḥlatan saʿīdatan wa-fī amāni Llāh', gloss_id: 'selamat menikmati perjalanan dan dalam penjagaan Allah', owner_island: 'HWR', level: 3, skill_id: 'HWR-L3-02', pos: 'phrase', category: 'Bandara', visual_hint: '🧳' },
  { id: 'lx_fahras_maktabah', ar_vocalized: 'أَبْحَثُ عَنْ مُعْجَمِ اللُّغَةِ فِي الفِهْرِس', ar_plain: 'أبحث عن معجم اللغة في الفهرس', translit: 'abḥathu ʿan muʿjami l-lughati fī l-fihris', gloss_id: 'saya mencari kamus bahasa Arab di katalog buku', owner_island: 'HWR', level: 3, skill_id: 'HWR-L3-03', pos: 'phrase', category: 'Perpustakaan', visual_hint: '📚' },
  { id: 'lx_mata_naltaqi', ar_vocalized: 'مَتَى نَلْتَقِي غَدًا؟ بَعْدَ صَلَاةِ العَصْر', ar_plain: 'متى نلتقي غدا؟ بعد صلاة العصر', translit: 'matā naltaqī ghadan? baʿda ṣalāti l-ʿaṣr', gloss_id: 'kapan kita bertemu besok? setelah salat Ashar', owner_island: 'HWR', level: 3, skill_id: 'HWR-L3-04', pos: 'phrase', category: 'Janji Temu', visual_hint: '📅' },

  // Level 4: Mutawassith 2 (A2.2)
  { id: 'lx_fi_rayi', ar_vocalized: 'فِي رَأْيِي الشَّخْصِيِّ هٰذَا الحَلُّ هُوَ الأَنْسَب', ar_plain: 'في رأيي الشخصي هذا الحل هو الأنسب', translit: 'fī raʾyī sy-syakhṣiyyi hādhā l-ḥallu huwa l-ansab', gloss_id: 'menurut pandangan pribadi saya, opsi ini yang paling tepat', owner_island: 'HWR', level: 4, skill_id: 'HWR-L4-01', pos: 'phrase', category: 'Diskusi Halaqah', visual_hint: '💡' },
  { id: 'lx_uwafiquka', ar_vocalized: 'أُوَافِقُكَ الرَّأْيَ تَمَامًا فِي هٰذِهِ النُّقْطَة', ar_plain: 'أوافقك الرأي تماما في هذه النقطة', translit: 'uwāfiquka r-raʾya tamāman fī hādhihi n-nuqṭah', gloss_id: 'saya sepakat sepenuhnya dengan pendapat Anda pada poin ini', owner_island: 'HWR', level: 4, skill_id: 'HWR-L4-01', pos: 'phrase', category: 'Diskusi Halaqah', visual_hint: '🎯' },
  { id: 'lx_muqabalah_amal', ar_vocalized: 'تَحَدَّثْ عَنْ خِبْرَاتِكَ وَمَهَارَاتِكَ اللُّغَوِيَّة', ar_plain: 'تحدث عن خبراتك ومهاراتك اللغوية', translit: 'taḥaddath ʿan khibrātika wa-mahārātika l-lughawiyyah', gloss_id: 'ceritakan pengalaman dan keterampilan kebahasaan Anda', owner_island: 'HWR', level: 4, skill_id: 'HWR-L4-02', pos: 'phrase', category: 'Wawancara', visual_hint: '💼' },
  { id: 'lx_hal_musykilah', ar_vocalized: 'نَعْتَذِرُ عَنِ الخَطَأِ، وَسَنَقُومُ بِاسْتِبْدَالِهِ فَوْرًا', ar_plain: 'نعتذر عن الخطأ، وسنقوم باستبداله فورا', translit: 'naʿtadhiru ʿani l-khaṭaʾ, wa-sanaqūmu bi-stibdālihi fawrā', gloss_id: 'kami mohon maaf atas kekeliruan ini, dan akan kami ganti segera', owner_island: 'HWR', level: 4, skill_id: 'HWR-L4-03', pos: 'phrase', category: 'Solusi Masalah', visual_hint: '🛠️' },
  { id: 'lx_taqalid_hiwayah', ar_vocalized: 'نَحْتَفِلُ بِعِيدِ الفِطْرِ بِتَبَادُلِ الزِّيَارَاتِ وَالتَّهَانِي', ar_plain: 'نحتفل بعيد الفطر بتبادل الزيارات والتهاني', translit: 'naḥtafilu bi-ʿīdi l-fiṭri bi-tabāduli z-ziyārāti wa-t-tahānī', gloss_id: 'kami merayakan Idul Fitri dengan saling berkunjung dan bertukar selamat', owner_island: 'HWR', level: 4, skill_id: 'HWR-L4-04', pos: 'phrase', category: 'Tradisi & Budaya', visual_hint: '🎉' },

  // Level 5: Mutaqaddim (B1-B2)
  { id: 'lx_tafawud_fashih', ar_vocalized: 'نَسْعَى لِلتَّوَصُّلِ إِلَى اتِّفَاقٍ مُتَوَازِنٍ يُرْضِي الطَّرَفَيْن', ar_plain: 'نسعى للتوصل إلى اتفاق متوازن يرضي الطرفين', translit: 'nasʿā li-t-tawaṣṣuli ilā ttifāqin mutawāzinin yurḍī ṭ-ṭarafayn', gloss_id: 'kami berikhtiar mencapai kesepakatan berimbang yang memuaskan kedua belah pihak', owner_island: 'HWR', level: 5, skill_id: 'HWR-L5-01', pos: 'phrase', category: 'Diplomasi', visual_hint: '🤝' },
  { id: 'lx_munadharah_hujjah', ar_vocalized: 'حُجَّتُكَ قَوِيَّةٌ لٰكِنَّ الأَدِلَّةَ التَّارِيخِيَّةَ تُثْبِتُ خِلَافَ ذٰلِك', ar_plain: 'حجتك قوية لكن الأدلة التاريخية تثبت خلاف ذلك', translit: 'ḥujjatuka qawiyyatun lākinna l-adillata t-tārīkhiyyata tuthbitu khilāfa dhālik', gloss_id: 'argumen Anda kuat namun bukti historis membuktikan sebaliknya', owner_island: 'HWR', level: 5, skill_id: 'HWR-L5-02', pos: 'phrase', category: 'Debat Akademik', visual_hint: '⚖️' },
  { id: 'lx_tashrih_shuhufi', ar_vocalized: 'صَرَّحَ المُتَحَدِّثُ الرَّسْمِيُّ بِأَنَّ التَّعَاوُنَ مُسْتَمِرّ', ar_plain: 'صرح المتحدث الرسمي بأن التعاون مستمر', translit: 'ṣarraḥa l-mutaḥaddithu r-rasmiyyu bi-anna t-taʿāwuna mustamirr', gloss_id: 'juru bicara resmi menyatakan bahwa kerja sama terus berlanjut', owner_island: 'HWR', level: 5, skill_id: 'HWR-L5-03', pos: 'phrase', category: 'Media Pers', visual_hint: '🎙️' },
  { id: 'lx_wasiyat_khitabah', ar_vocalized: 'أُوصِيكُمْ بِتَقْوَى اللَّهِ وَحُسْنِ الخُلُقِ وَصِدْقِ المَقَال', ar_plain: 'أوصيكم بتقوى الله وحسن الخلق وصدق المقال', translit: 'ūṣīkum bi-taqwā Llāhi wa-ḥusni l-khuluqi wa-ṣidqi l-maqāl', gloss_id: 'saya berwasiat kepada kalian untuk bertakwa kepada Allah, berakhlak mulia, dan jujur bertutur', owner_island: 'HWR', level: 5, skill_id: 'HWR-L5-04', pos: 'phrase', category: 'Khitabah Hikmah', visual_hint: '📜' },

  // --- QWD (Gunung Qawa'id: 30 Modul Kaidah Nahwu & Sharaf L1-L5) ---
  // Level 1: Mubtadi' (A1) - Fondasi Tata Bahasa & Klasifikasi Kata
  // QWD-L1-01: Pembagian Kata
  { id: 'lx_qwd_ism', ar_vocalized: 'اِسْمٌ', ar_plain: 'اسم', translit: 'ismun', gloss_id: 'kata benda / nomina (menerima tanwin & al-lam)', owner_island: 'QWD', level: 1, skill_id: 'QWD-L1-01', pos: 'isim', category: 'Pembagian Kata', visual_hint: '🏷️' },
  { id: 'lx_qwd_fiil', ar_vocalized: 'فِعْلٌ', ar_plain: 'فعل', translit: 'fiʿlun', gloss_id: 'kata kerja / verba (terikat dimensi waktu)', owner_island: 'QWD', level: 1, skill_id: 'QWD-L1-01', pos: 'isim', category: 'Pembagian Kata', visual_hint: '⚡' },
  { id: 'lx_qwd_harf', ar_vocalized: 'حَرْفٌ', ar_plain: 'حرف', translit: 'ḥarfun', gloss_id: 'partikel penghubung antar-kata', owner_island: 'QWD', level: 1, skill_id: 'QWD-L1-01', pos: 'isim', category: 'Pembagian Kata', visual_hint: '🔗' },
  { id: 'lx_qwd_kalam', ar_vocalized: 'كَلَامٌ مُفِيدٌ', ar_plain: 'كلام مفيد', translit: 'kalāmun mufīdun', gloss_id: 'kalimat berfaedah yang sempurna maknanya', owner_island: 'QWD', level: 1, skill_id: 'QWD-L1-01', pos: 'phrase', category: 'Pembagian Kata', visual_hint: '💬' },

  // QWD-L1-02: Isim Nakirah & Ma'rifah
  { id: 'lx_qwd_kitabun', ar_vocalized: 'كِتَابٌ', ar_plain: 'كتاب', translit: 'kitābun', gloss_id: 'sebuah buku (isim nakirah umum bertanwin)', owner_island: 'QWD', level: 1, skill_id: 'QWD-L1-02', pos: 'isim', category: 'Nakirah & Ma\'rifah', visual_hint: '📖' },
  { id: 'lx_qwd_alkitabu', ar_vocalized: 'الكِتَابُ', ar_plain: 'الكتاب', translit: 'al-kitābu', gloss_id: 'buku tertentu (isim ma\'rifah ber-Alif Lam)', owner_island: 'QWD', level: 1, skill_id: 'QWD-L1-02', pos: 'isim', category: 'Nakirah & Ma\'rifah', visual_hint: '📕' },
  { id: 'lx_qwd_rajulun', ar_vocalized: 'رَجُلٌ', ar_plain: 'رجل', translit: 'rajulun', gloss_id: 'seorang pria (nakirah tanpa penentu)', owner_island: 'QWD', level: 1, skill_id: 'QWD-L1-02', pos: 'isim', category: 'Nakirah & Ma\'rifah', visual_hint: '👤' },
  { id: 'lx_qwd_arrajulu', ar_vocalized: 'الرَّجُلُ', ar_plain: 'الرجل', translit: 'ar-rajulu', gloss_id: 'pria tersebut (ma\'rifah spesifik)', owner_island: 'QWD', level: 1, skill_id: 'QWD-L1-02', pos: 'isim', category: 'Nakirah & Ma\'rifah', visual_hint: '🧔' },

  // QWD-L1-03: Gender Kata: Mudzakkar & Muannats
  { id: 'lx_qwd_sayyarah', ar_vocalized: 'سَيَّارَةٌ جَدِيدَةٌ', ar_plain: 'سيارة جديدة', translit: 'sayyāratun jadīdatun', gloss_id: 'mobil baru (muannats berakhiran ta marbuthah)', owner_island: 'QWD', level: 1, skill_id: 'QWD-L1-03', pos: 'phrase', category: 'Mudzakkar & Muannats', visual_hint: '🚗' },
  { id: 'lx_qwd_qalam_jadid', ar_vocalized: 'قَلَمٌ جَدِيدٌ', ar_plain: 'قلم جديد', translit: 'qalamun jadīdun', gloss_id: 'pena baru (mudzakkar tanpa ta marbuthah)', owner_island: 'QWD', level: 1, skill_id: 'QWD-L1-03', pos: 'phrase', category: 'Mudzakkar & Muannats', visual_hint: '🖊️' },
  { id: 'lx_qwd_haqibah', ar_vocalized: 'حَقِيبَةٌ كَبِيرَةٌ', ar_plain: 'حقيبة كبيرة', translit: 'ḥaqībatun kabīrah', gloss_id: 'tas besar (keselarasan sifat feminin)', owner_island: 'QWD', level: 1, skill_id: 'QWD-L1-03', pos: 'phrase', category: 'Mudzakkar & Muannats', visual_hint: '🎒' },
  { id: 'lx_qwd_bab_kabir', ar_vocalized: 'بَابٌ كَبِيرٌ', ar_plain: 'باب كبير', translit: 'bābun kabīr', gloss_id: 'pintu besar (keselarasan sifat maskulin)', owner_island: 'QWD', level: 1, skill_id: 'QWD-L1-03', pos: 'phrase', category: 'Mudzakkar & Muannats', visual_hint: '🚪' },

  // QWD-L1-04: Isim Isyarah Dekat: Hadha & Hadhihi
  { id: 'lx_qwd_hadha_bayt', ar_vocalized: 'هٰذَا بَيْتٌ', ar_plain: 'هذا بيت', translit: 'hādhā baytun', gloss_id: 'ini sebuah rumah (tunjuk dekat mudzakkar)', owner_island: 'QWD', level: 1, skill_id: 'QWD-L1-04', pos: 'phrase', category: 'Isim Isyarah', visual_hint: '🏠' },
  { id: 'lx_qwd_hadhihi_ghurfah', ar_vocalized: 'هٰذِهِ غُرْفَةٌ', ar_plain: 'هذه غرفة', translit: 'hādhihi ghurfatun', gloss_id: 'ini sebuah kamar (tunjuk dekat muannats)', owner_island: 'QWD', level: 1, skill_id: 'QWD-L1-04', pos: 'phrase', category: 'Isim Isyarah', visual_hint: '🛋️' },
  { id: 'lx_qwd_hadha_masjid', ar_vocalized: 'هٰذَا مَسْجِدٌ جَمِيلٌ', ar_plain: 'هذا مسجد جميل', translit: 'hādhā masjidun jamīl', gloss_id: 'ini masjid yang indah', owner_island: 'QWD', level: 1, skill_id: 'QWD-L1-04', pos: 'phrase', category: 'Isim Isyarah', visual_hint: '🕌' },
  { id: 'lx_qwd_hadhihi_madrasah', ar_vocalized: 'هٰذِهِ مَدْرَسَةٌ نَظِيفَةٌ', ar_plain: 'هذه مدرسة نظيفة', translit: 'hādhihi madrasatun naẓīfah', gloss_id: 'ini sekolah yang bersih', owner_island: 'QWD', level: 1, skill_id: 'QWD-L1-04', pos: 'phrase', category: 'Isim Isyarah', visual_hint: '🏫' },

  // QWD-L1-05: Tanda Asli Kata Tunggal: Isim Mufrad
  { id: 'lx_qwd_dhommah_marfu', ar_vocalized: 'الطَّالِبُ مُجْتَهِدٌ', ar_plain: 'الطالب مجتهد', translit: 'aṭ-ṭālibu mujtahidun', gloss_id: 'siswa itu tekun (rafa\' dhommah)', owner_island: 'QWD', level: 1, skill_id: 'QWD-L1-05', pos: 'phrase', category: 'I\'rab Mufrad', visual_hint: '🔝' },
  { id: 'lx_qwd_fathah_manshub', ar_vocalized: 'رَأَيْتُ الطَّالِبَ', ar_plain: 'رأيت الطالب', translit: 'raʾaytu ṭ-ṭāliba', gloss_id: 'aku melihat siswa itu (nashab fathah)', owner_island: 'QWD', level: 1, skill_id: 'QWD-L1-05', pos: 'phrase', category: 'I\'rab Mufrad', visual_hint: '👁️' },
  { id: 'lx_qwd_kasrah_majrur', ar_vocalized: 'مَرَرْتُ بِالطَّالِبِ', ar_plain: 'مررت بالطالب', translit: 'marartu bi-ṭ-ṭālibi', gloss_id: 'aku berpapasan dengan siswa itu (jar kasrah)', owner_island: 'QWD', level: 1, skill_id: 'QWD-L1-05', pos: 'phrase', category: 'I\'rab Mufrad', visual_hint: '🚶' },

  // QWD-L1-06: Kata Tanya Formal: Adawatul Istifham
  { id: 'lx_qwd_hal_anta', ar_vocalized: 'هَلْ أَنْتَ طَالِبٌ؟', ar_plain: 'هل أنت طالب؟', translit: 'hal anta ṭālibun?', gloss_id: 'apakah kamu seorang pelajar? (konfirmasi hal)', owner_island: 'QWD', level: 1, skill_id: 'QWD-L1-06', pos: 'phrase', category: 'Adawatul Istifham', visual_hint: '❓' },
  { id: 'lx_qwd_man_hadha', ar_vocalized: 'مَنْ هٰذَا الرَّجُلُ؟', ar_plain: 'من هذا الرجل؟', translit: 'man hādhā r-rajulu?', gloss_id: 'siapakah pria ini? (tanya sosok berakal)', owner_island: 'QWD', level: 1, skill_id: 'QWD-L1-06', pos: 'phrase', category: 'Adawatul Istifham', visual_hint: '🤔' },
  { id: 'lx_qwd_ayna_kitab', ar_vocalized: 'أَيْنَ الكِتَابُ؟', ar_plain: 'أين الكتاب؟', translit: 'ayna l-kitābu?', gloss_id: 'di manakah buku itu? (tanya tempat lokasi)', owner_island: 'QWD', level: 1, skill_id: 'QWD-L1-06', pos: 'phrase', category: 'Adawatul Istifham', visual_hint: '📍' },

  // Level 2: Asasi (A2) - Kalimat Ismiyyah, Preposisi, Zharaf & Idhafah
  // QWD-L2-01: Kalimat Nominal: Mubtada' & Khabar
  { id: 'lx_qwd_alwaladu_nasyith', ar_vocalized: 'الوَلَدُ نَشِيطٌ', ar_plain: 'الولد نشيط', translit: 'al-waladu nasyīṭun', gloss_id: 'anak itu rajin (mubtada\' ma\'rifah + khabar nakirah)', owner_island: 'QWD', level: 2, skill_id: 'QWD-L2-01', pos: 'phrase', category: 'Jumlah Ismiyyah', visual_hint: '🏃' },
  { id: 'lx_qwd_alilmu_nur', ar_vocalized: 'العِلْمُ نُورٌ', ar_plain: 'العلم نور', translit: 'al-ʿilmu nūrun', gloss_id: 'ilmu itu adalah cahaya (struktur nominal klasik)', owner_island: 'QWD', level: 2, skill_id: 'QWD-L2-01', pos: 'phrase', category: 'Jumlah Ismiyyah', visual_hint: '💡' },
  { id: 'lx_qwd_albintu_dzakiyyah', ar_vocalized: 'البِنْتُ ذَكِيَّةٌ', ar_plain: 'البنت ذكية', translit: 'al-bintu dhakiyyatun', gloss_id: 'anak perempuan itu cerdas (keselarasan khabar feminin)', owner_island: 'QWD', level: 2, skill_id: 'QWD-L2-01', pos: 'phrase', category: 'Jumlah Ismiyyah', visual_hint: '🧠' },

  // QWD-L2-02: Ragam Bentuk Khabar
  { id: 'lx_qwd_khabar_mufrad_ex', ar_vocalized: 'المُعَلِّمُ حَاضِرٌ', ar_plain: 'المعلم حاضر', translit: 'al-muʿallimu ḥāḍirun', gloss_id: 'guru itu hadir (khabar mufrad satu kata)', owner_island: 'QWD', level: 2, skill_id: 'QWD-L2-02', pos: 'phrase', category: 'Ragam Khabar', visual_hint: '👨‍🏫' },
  { id: 'lx_qwd_khabar_jar_ex', ar_vocalized: 'الكِتَابُ عَلَى المَكْتَبِ', ar_plain: 'الكتاب على المكتب', translit: 'al-kitābu ʿalā l-maktabi', gloss_id: 'buku itu di atas meja (khabar syibhul jumlah jar-majrur)', owner_island: 'QWD', level: 2, skill_id: 'QWD-L2-02', pos: 'phrase', category: 'Ragam Khabar', visual_hint: '📚' },
  { id: 'lx_qwd_khabar_zharaf_ex', ar_vocalized: 'العُصْفُورُ فَوْقَ الشَّجَرَةِ', ar_plain: 'العصفور فوق الشجرة', translit: 'al-ʿuṣfūru fawqa sy-syajarah', gloss_id: 'burung itu di atas pohon (khabar zharaf keterangan)', owner_island: 'QWD', level: 2, skill_id: 'QWD-L2-02', pos: 'phrase', category: 'Ragam Khabar', visual_hint: '🐦' },

  // QWD-L2-03: Huruf Jar & Isim Majrur
  { id: 'lx_qwd_fii_masjid', ar_vocalized: 'فِي المَسْجِدِ', ar_plain: 'في المسجد', translit: 'fī l-masjidi', gloss_id: 'di dalam masjid (preposisi fii + majrur kasrah)', owner_island: 'QWD', level: 2, skill_id: 'QWD-L2-03', pos: 'phrase', category: 'Huruf Jar', visual_hint: '🕌' },
  { id: 'lx_qwd_min_bayt', ar_vocalized: 'مِنَ البَيْتِ', ar_plain: 'من البيت', translit: 'mina l-bayti', gloss_id: 'dari rumah (preposisi min + majrur)', owner_island: 'QWD', level: 2, skill_id: 'QWD-L2-03', pos: 'phrase', category: 'Huruf Jar', visual_hint: '🏡' },
  { id: 'lx_qwd_ilaa_suq', ar_vocalized: 'إِلَى السُّوقِ', ar_plain: 'إلى السوق', translit: 'ilā s-sūqi', gloss_id: 'ke pasar (preposisi ilaa + majrur)', owner_island: 'QWD', level: 2, skill_id: 'QWD-L2-03', pos: 'phrase', category: 'Huruf Jar', visual_hint: '🛒' },
  { id: 'lx_qwd_bi_qalam', ar_vocalized: 'بِالقَلَمِ', ar_plain: 'بالقلم', translit: 'bi-l-qalami', gloss_id: 'dengan pena (preposisi bi gandeng)', owner_island: 'QWD', level: 2, skill_id: 'QWD-L2-03', pos: 'phrase', category: 'Huruf Jar', visual_hint: '✒️' },

  // QWD-L2-04: Zharaf Makan & Zharaf Zaman
  { id: 'lx_qwd_amama_ustadz', ar_vocalized: 'أَمَامَ الأُسْتَاذِ', ar_plain: 'أمام الأستاذ', translit: 'amāma l-ustādhi', gloss_id: 'di depan sang guru (zharaf makan manshub fathah)', owner_island: 'QWD', level: 2, skill_id: 'QWD-L2-04', pos: 'phrase', category: 'Zharaf', visual_hint: '👨‍🏫' },
  { id: 'lx_qwd_khalfa_bab', ar_vocalized: 'خَلْفَ البَابِ', ar_plain: 'خلف الباب', translit: 'khalfa l-bābi', gloss_id: 'di belakang pintu (posisi spasial)', owner_island: 'QWD', level: 2, skill_id: 'QWD-L2-04', pos: 'phrase', category: 'Zharaf', visual_hint: '🚪' },
  { id: 'lx_qwd_shabahan_zaman', ar_vocalized: 'سَافَرْتُ صَبَاحًا', ar_plain: 'سافرت صباحا', translit: 'sāfartu ṣabāḥan', gloss_id: 'aku bepergian di waktu pagi (zharaf zaman waktu)', owner_island: 'QWD', level: 2, skill_id: 'QWD-L2-04', pos: 'phrase', category: 'Zharaf', visual_hint: '🌅' },
  { id: 'lx_qwd_lailan_zaman', ar_vocalized: 'رَجَعْتُ لَيْلًا', ar_plain: 'رجعت ليلا', translit: 'rajaʿtu laylan', gloss_id: 'aku kembali di waktu malam', owner_island: 'QWD', level: 2, skill_id: 'QWD-L2-04', pos: 'phrase', category: 'Zharaf', visual_hint: '🌙' },

  // QWD-L2-05: Konsep Kepemilikan Idhafah
  { id: 'lx_qwd_kitabut_talib', ar_vocalized: 'كِتَابُ الطَّالِبِ', ar_plain: 'كتاب الطالب', translit: 'kitābu ṭ-ṭālibi', gloss_id: 'buku murid itu (mudhaf tanpa al/tanwin + mudhaf ilaih majrur)', owner_island: 'QWD', level: 2, skill_id: 'QWD-L2-05', pos: 'phrase', category: 'Idhafah', visual_hint: '📘' },
  { id: 'lx_qwd_babul_masjid', ar_vocalized: 'بَابُ المَسْجِدِ مَفْتُوحٌ', ar_plain: 'باب المسجد مفتوح', translit: 'bābu l-masjidi maftūḥ', gloss_id: 'pintu masjid itu terbuka', owner_island: 'QWD', level: 2, skill_id: 'QWD-L2-05', pos: 'phrase', category: 'Idhafah', visual_hint: '🚪' },
  { id: 'lx_qwd_miftahul_bayt', ar_vocalized: 'مِفْتَاحُ البَيْتِ', ar_plain: 'مفتاح البيت', translit: 'miftāḥu l-bayti', gloss_id: 'kunci rumah (kepemilikan genitif)', owner_island: 'QWD', level: 2, skill_id: 'QWD-L2-05', pos: 'phrase', category: 'Idhafah', visual_hint: '🔑' },

  // QWD-L2-06: Dhomir Munfashil & Muttashil
  { id: 'lx_qwd_dhomir_huwa_hiya', ar_vocalized: 'هُوَ مُعَلِّمٌ وَهِيَ طَبِيبَةٌ', ar_plain: 'هو معلم وهي طبيبة', translit: 'huwa muʿallimun wa-hiya ṭabībah', gloss_id: 'dia guru dan dia (wanita) dokter (dhomir mandiri)', owner_island: 'QWD', level: 2, skill_id: 'QWD-L2-06', pos: 'phrase', category: 'Dhomir', visual_hint: '👥' },
  { id: 'lx_qwd_dhomir_baytuhu', ar_vocalized: 'بَيْتُهُ قَرِيبٌ', ar_plain: 'بيته قريب', translit: 'baytuhu qarībun', gloss_id: 'rumahnya dekat (akhiran -hu dhommir muttashil)', owner_island: 'QWD', level: 2, skill_id: 'QWD-L2-06', pos: 'phrase', category: 'Dhomir', visual_hint: '🏡' },
  { id: 'lx_qwd_dhomir_kitabuka', ar_vocalized: 'كِتَابُكَ جَدِيدٌ', ar_plain: 'كتابك جديد', translit: 'kitābuka jadīd', gloss_id: 'bukumu baru (akhiran -ka dhomir muttashil)', owner_island: 'QWD', level: 2, skill_id: 'QWD-L2-06', pos: 'phrase', category: 'Dhomir', visual_hint: '📖' },

  // Level 3: Mutawassith 1 (B1) - Kalimat Fi'liyyah, Dual, Jamak & Sharaf
  // QWD-L3-01: Kalimat Verbal: Fi'il Madhi & Fa'il
  { id: 'lx_qwd_qaraa_zayd_ex', ar_vocalized: 'قَرَأَ زَيْدٌ الكِتَابَ', ar_plain: 'قرأ زيد الكتاب', translit: 'qaraʾa zayduni l-kitāba', gloss_id: 'Zaid telah membaca buku (fi\'il madhi + fa\'il marfu\')', owner_island: 'QWD', level: 3, skill_id: 'QWD-L3-01', pos: 'phrase', category: 'Jumlah Fi\'liyyah', visual_hint: '📖' },
  { id: 'lx_qwd_katabat_fatimah', ar_vocalized: 'كَتَبَتْ فَاطِمَةُ الرِّسَالَةَ', ar_plain: 'كتبت فاطمة الرسالة', translit: 'katabat fāṭimatu r-risālah', gloss_id: 'Fatimah telah menulis surat (ta ta\'nits sakinah)', owner_island: 'QWD', level: 3, skill_id: 'QWD-L3-01', pos: 'phrase', category: 'Jumlah Fi\'liyyah', visual_hint: '✉️' },
  { id: 'lx_qwd_hadhara_tullab', ar_vocalized: 'حَضَرَ الطُّلَّابُ', ar_plain: 'حضر الطلاب', translit: 'ḥaḍara ṭ-ṭullābu', gloss_id: 'para siswa telah hadir (kata kerja awal tetap tunggal)', owner_island: 'QWD', level: 3, skill_id: 'QWD-L3-01', pos: 'phrase', category: 'Jumlah Fi\'liyyah', visual_hint: '👨‍🎓' },

  // QWD-L3-02: Objek Kalimat Manshub: Maf'ul Bih
  { id: 'lx_qwd_shariba_maa_ex', ar_vocalized: 'شَرِبَ الوَلَدُ المَاءَ', ar_plain: 'شرب الولد الماء', translit: 'syariba l-waladu l-māʾa', gloss_id: 'anak itu meminum air (maf\'ul bih berharakat fathah)', owner_island: 'QWD', level: 3, skill_id: 'QWD-L3-02', pos: 'phrase', category: 'Maf\'ul Bih', visual_hint: '🥤' },
  { id: 'lx_qwd_akala_khubz_ex', ar_vocalized: 'أَكَلَ الضَّيْفُ الخُبْزَ', ar_plain: 'أكل الضيف الخبز', translit: 'akala ḍ-ḍayfu l-khubza', gloss_id: 'tamu itu memakan roti (objek sasaran akusatif)', owner_island: 'QWD', level: 3, skill_id: 'QWD-L3-02', pos: 'phrase', category: 'Maf\'ul Bih', visual_hint: '🍞' },
  { id: 'lx_qwd_kasara_qalam', ar_vocalized: 'كَسَرَ الوَلَدُ القَلَمَ', ar_plain: 'كسر الولد القلم', translit: 'kasara l-waladu l-qalama', gloss_id: 'anak itu mematahkan pena', owner_island: 'QWD', level: 3, skill_id: 'QWD-L3-02', pos: 'phrase', category: 'Maf\'ul Bih', visual_hint: '✏️' },

  // QWD-L3-03: Fi'il Mudhari' Marfu' & Huruf Mudhara'ah
  { id: 'lx_qwd_yaktubu_mudhari', ar_vocalized: 'يَكْتُبُ الطَّالِبُ الدَّرْسَ', ar_plain: 'يكتب الطالب الدرس', translit: 'yaktubu ṭ-ṭālibu d-darsa', gloss_id: 'siswa itu sedang menulis pelajaran (mudhari\' dhommah)', owner_island: 'QWD', level: 3, skill_id: 'QWD-L3-03', pos: 'phrase', category: 'Fi\'il Mudhari\'', visual_hint: '✍️' },
  { id: 'lx_qwd_naqrau_mudhari', ar_vocalized: 'نَقْرَأُ القُرْآنَ كُلَّ يَوْمٍ', ar_plain: 'نقرأ القرآن كل يوم', translit: 'naqraʾu l-qurʾāna kulla yawm', gloss_id: 'kami membaca Al-Qur\'an setiap hari (awalan nun)', owner_island: 'QWD', level: 3, skill_id: 'QWD-L3-03', pos: 'phrase', category: 'Fi\'il Mudhari\'', visual_hint: '📖' },
  { id: 'lx_qwd_adhhabu_mudhari', ar_vocalized: 'أَنَا أَذْهَبُ إِلَى المَسْجِدِ', ar_plain: 'أنا أذهب إلى المسجد', translit: 'anā adhhabu ilā l-masjidi', gloss_id: 'saya sedang pergi ke masjid (awalan hamzah anaytu)', owner_island: 'QWD', level: 3, skill_id: 'QWD-L3-03', pos: 'phrase', category: 'Fi\'il Mudhari\'', visual_hint: '🚶' },

  // QWD-L3-04: Bentuk Ganda / Mutsanna & I'rabnya
  { id: 'lx_qwd_kitabani_rafa', ar_vocalized: 'هٰذَانِ كِتَابَانِ مُفِيدَانِ', ar_plain: 'هذان كتابان مفيدان', translit: 'hādhāni kitābāni mufīdān', gloss_id: 'ini dua buku bermanfaat (mutsanna rafa\' bi-alif)', owner_island: 'QWD', level: 3, skill_id: 'QWD-L3-04', pos: 'phrase', category: 'Mutsanna', visual_hint: '📚' },
  { id: 'lx_qwd_kitabayni_nashb', ar_vocalized: 'قَرَأْتُ كِتَابَيْنِ اثْنَيْنِ', ar_plain: 'قرأت كتابين اثنين', translit: 'qaraʾtu kitābayni thnayn', gloss_id: 'aku telah membaca dua buah buku (mutsanna nashab bi-ya)', owner_island: 'QWD', level: 3, skill_id: 'QWD-L3-04', pos: 'phrase', category: 'Mutsanna', visual_hint: '📖' },
  { id: 'lx_qwd_qalamayni_jar', ar_vocalized: 'كَتَبْتُ بِقَلَمَيْنِ', ar_plain: 'كتبت بقلمين', translit: 'katabtu bi-qalamayni', gloss_id: 'aku menulis dengan dua pena (mutsanna jar bi-ya)', owner_island: 'QWD', level: 3, skill_id: 'QWD-L3-04', pos: 'phrase', category: 'Mutsanna', visual_hint: '🖊️' },

  // QWD-L3-05: Jamak Mudzakkar & Muannats Salim
  { id: 'lx_qwd_muslimuna_salim', ar_vocalized: 'حَضَرَ المُعَلِّمُونَ', ar_plain: 'حضر المعلمون', translit: 'ḥaḍara l-muʿallimūna', gloss_id: 'para guru pria telah hadir (jamak mudzakkar salim rafa\' bi-waw)', owner_island: 'QWD', level: 3, skill_id: 'QWD-L3-05', pos: 'phrase', category: 'Jamak Salim', visual_hint: '👨‍🏫' },
  { id: 'lx_qwd_muslimina_salim', ar_vocalized: 'رَأَيْتُ المُعَلِّمِينَ', ar_plain: 'رأيت المعلمين', translit: 'raʾaytu l-muʿallimīna', gloss_id: 'aku melihat para guru pria (nashab bi-ya)', owner_island: 'QWD', level: 3, skill_id: 'QWD-L3-05', pos: 'phrase', category: 'Jamak Salim', visual_hint: '👥' },
  { id: 'lx_qwd_muallimat_salim', ar_vocalized: 'جَاءَتِ المُعَلِّمَاتُ', ar_plain: 'جاءت المعلمات', translit: 'jāʾati l-muʿallimātu', gloss_id: 'para guru wanita telah datang (jamak muannats salim dhommah)', owner_island: 'QWD', level: 3, skill_id: 'QWD-L3-05', pos: 'phrase', category: 'Jamak Salim', visual_hint: '👩‍🏫' },
  { id: 'lx_qwd_samawati_kasrah', ar_vocalized: 'خَلَقَ اللَّهُ السَّمَاوَاتِ', ar_plain: 'خلق الله السماوات', translit: 'khalaqa Llāhu s-samāwāti', gloss_id: 'Allah menciptakan langit (muannats salim nashab dengan kasrah!)', owner_island: 'QWD', level: 3, skill_id: 'QWD-L3-05', pos: 'phrase', category: 'Jamak Salim', visual_hint: '🌌' },

  // QWD-L3-06: Morfologi Sharaf: Wazan Tsulatsi Mujarrad
  { id: 'lx_qwd_nasara_yanshuru', ar_vocalized: 'نَصَرَ - يَنْصُرُ - نَصْرًا', ar_plain: 'نصر - ينصر - نصرا', translit: 'naṣara - yanṣuru - naṣran', gloss_id: 'menolong (wazan fa\'ala - yaf\'ulu bab 1)', owner_island: 'QWD', level: 3, skill_id: 'QWD-L3-06', pos: 'phrase', category: 'Wazan Tsulatsi', visual_hint: '🤝' },
  { id: 'lx_qwd_dharaba_yadhribu', ar_vocalized: 'ضَرَبَ - يَضْرِبُ - ضَرْبًا', ar_plain: 'ضرب - يضرب - ضربا', translit: 'ḍaraba - yaḍribu - ḍarban', gloss_id: 'memukul / memberi contoh (wazan fa\'ala - yaf\'ilu bab 2)', owner_island: 'QWD', level: 3, skill_id: 'QWD-L3-06', pos: 'phrase', category: 'Wazan Tsulatsi', visual_hint: '🔨' },
  { id: 'lx_qwd_fataha_yaftahu', ar_vocalized: 'فَتَحَ - يَفْتَحُ - فَتْحًا', ar_plain: 'فتح - يفتح - فتحا', translit: 'fataḥa - yaftaḥu - fatḥan', gloss_id: 'membuka (wazan fa\'ala - yaf\'alu bab 3)', owner_island: 'QWD', level: 3, skill_id: 'QWD-L3-06', pos: 'phrase', category: 'Wazan Tsulatsi', visual_hint: '🔓' },

  // Level 4: Mutawassith 2 (B2) - Nawasikh, Adawat Nashab-Jazm, Fi'il Amr & Tashrif
  // QWD-L4-01: Saudara Kaana & Pengaruh I'rab
  { id: 'lx_qwd_kana_jawwu_ex', ar_vocalized: 'كَانَ الجَوُّ بَارِدًا', ar_plain: 'كان الجو باردا', translit: 'kāna l-jawwu bāridan', gloss_id: 'cuaca dahulu dingin (isim kaana marfu\' & khabar kaana manshub)', owner_island: 'QWD', level: 4, skill_id: 'QWD-L4-01', pos: 'phrase', category: 'Kaana wa Akhawatuha', visual_hint: '❄️' },
  { id: 'lx_qwd_laysa_shaban', ar_vocalized: 'لَيْسَ النَّجَاحُ سَهْلًا', ar_plain: 'ليس النجاح سهلا', translit: 'laysa n-najāḥu sahlan', gloss_id: 'kesuksesan itu tidaklah mudah (penafian laysa)', owner_island: 'QWD', level: 4, skill_id: 'QWD-L4-01', pos: 'phrase', category: 'Kaana wa Akhawatuha', visual_hint: '⛰️' },
  { id: 'lx_qwd_shara_taljan', ar_vocalized: 'صَارَ المَاءُ ثَلْجًا', ar_plain: 'صار الماء ثلجا', translit: 'ṣāra l-māʾu thaljan', gloss_id: 'air telah berubah menjadi es (perubahan status)', owner_island: 'QWD', level: 4, skill_id: 'QWD-L4-01', pos: 'phrase', category: 'Kaana wa Akhawatuha', visual_hint: '🧊' },

  // QWD-L4-02: Saudara Inna & Pengaruh I'rab
  { id: 'lx_qwd_inna_allaha_ex', ar_vocalized: 'إِنَّ اللَّهَ غَفُورٌ رَحِيمٌ', ar_plain: 'إن الله غفور رحيم', translit: 'inna Llāha ghafūrun raḥīm', gloss_id: 'sesungguhnya Allah Maha Pengampun (isim inna fathah & khabar inna dhommah)', owner_island: 'QWD', level: 4, skill_id: 'QWD-L4-02', pos: 'phrase', category: 'Inna wa Akhawatuha', visual_hint: '✨' },
  { id: 'lx_qwd_inna_sabri_miftah', ar_vocalized: 'إِنَّ الصَّبْرَ مِفْتَاحُ الفَرَجِ', ar_plain: 'إن الصبر مفتاح الفرج', translit: 'inna ṣ-ṣabra miftāḥu l-faraj', gloss_id: 'sesungguhnya kesabaran adalah kunci jalan keluar', owner_island: 'QWD', level: 4, skill_id: 'QWD-L4-02', pos: 'phrase', category: 'Inna wa Akhawatuha', visual_hint: '🗝️' },
  { id: 'lx_qwd_laalla_faraj', ar_vocalized: 'لَعَلَّ النَّصْرَ قَرِيبٌ', ar_plain: 'لعل النصر قريب', translit: 'laʿalla n-naṣra qarīb', gloss_id: 'semoga pertolongan itu dekat (harapan tarajji)', owner_island: 'QWD', level: 4, skill_id: 'QWD-L4-02', pos: 'phrase', category: 'Inna wa Akhawatuha', visual_hint: '🌅' },

  // QWD-L4-03: Huruf Penashab Fi'il Mudhari'
  { id: 'lx_qwd_lan_yadhhaba_ex', ar_vocalized: 'لَنْ يَذْهَبَ الكَسْلَانُ', ar_plain: 'لن يذهب الكسلان', translit: 'lan yadhhaba l-kaslānu', gloss_id: 'orang malas itu tidak akan pernah pergi (lan penashab)', owner_island: 'QWD', level: 4, skill_id: 'QWD-L4-03', pos: 'phrase', category: 'Nawasibul Mudhari\'', visual_hint: '🚫' },
  { id: 'lx_qwd_an_ataallama_ex', ar_vocalized: 'أُرِيدُ أَنْ أَتَعَلَّمَ العَرَبِيَّةَ', ar_plain: 'أريد أن أتعلم العربية', translit: 'urīdu an ataʿallama l-ʿarabiyyah', gloss_id: 'aku ingin mempelajari bahasa Arab (an penashab masydariyyah)', owner_island: 'QWD', level: 4, skill_id: 'QWD-L4-03', pos: 'phrase', category: 'Nawasibul Mudhari\'', visual_hint: '📚' },
  { id: 'lx_qwd_kay_tandjaha_ex', ar_vocalized: 'اجْتَهِدْ كَيْ تَنْجَحَ', ar_plain: 'اجتهد كي تنجح', translit: 'ijtahid kay tanjaḥa', gloss_id: 'bersungguh-sungguhlah agar kamu sukses (kay tujuan)', owner_island: 'QWD', level: 4, skill_id: 'QWD-L4-03', pos: 'phrase', category: 'Nawasibul Mudhari\'', visual_hint: '🎯' },

  // QWD-L4-04: Huruf Penjazm Fi'il Mudhari'
  { id: 'lx_qwd_lam_yaktub_ex', ar_vocalized: 'لَمْ يَكْتُبْ دَرْسَهُ', ar_plain: 'لم يكتب درسه', translit: 'lam yaktub darsahu', gloss_id: 'dia belum menulis pelajarannya (lam penjuzuk sukun)', owner_island: 'QWD', level: 4, skill_id: 'QWD-L4-04', pos: 'phrase', category: 'Jawazimul Mudhari\'', visual_hint: '🛑' },
  { id: 'lx_qwd_la_tahzan_ex', ar_vocalized: 'لَا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا', ar_plain: 'لا تحزن إن الله معنا', translit: 'lā taḥzan inna Llāha maʿanā', gloss_id: 'janganlah bersedih, sesungguhnya Allah bersama kita (la nahiyah)', owner_island: 'QWD', level: 4, skill_id: 'QWD-L4-04', pos: 'phrase', category: 'Jawazimul Mudhari\'', visual_hint: '🤲' },
  { id: 'lx_qwd_li_yunfiq_ex', ar_vocalized: 'لِيُنْفِقْ ذُو سَعَةٍ مِنْ سَعَتِهِ', ar_plain: 'لينفق ذو سعة من سعته', translit: 'li-yunfiq dhū saʿatin min saʿatih', gloss_id: 'hendaklah orang yang mampu menafkahkan hartanya (lam amr)', owner_island: 'QWD', level: 4, skill_id: 'QWD-L4-04', pos: 'phrase', category: 'Jawazimul Mudhari\'', visual_hint: '💰' },

  // QWD-L4-05: Kata Kerja Perintah: Fi'il Amr
  { id: 'lx_qwd_iqra_amr_ex', ar_vocalized: 'اِقْرَأْ بِاسْمِ رَبِّكَ', ar_plain: 'اقرأ باسم ربك', translit: 'iqraʾ bi-smi rabbika', gloss_id: 'bacalah dengan nama Tuhanmu (amr mabni sukun)', owner_island: 'QWD', level: 4, skill_id: 'QWD-L4-05', pos: 'phrase', category: 'Fi\'il Amr', visual_hint: '📜' },
  { id: 'lx_qwd_uktub_amr_ex', ar_vocalized: 'اُكْتُبْ بِخَطٍّ جَمِيلٍ', ar_plain: 'اكتب بخط جميل', translit: 'uktub bi-khaṭṭin jamīl', gloss_id: 'tulislah dengan khat yang indah (perintah pria tunggal)', owner_island: 'QWD', level: 4, skill_id: 'QWD-L4-05', pos: 'phrase', category: 'Fi\'il Amr', visual_hint: '✍️' },
  { id: 'lx_qwd_isjudi_amr_ex', ar_vocalized: 'اُسْجُدِي يَا مَرْيَمُ', ar_plain: 'اسجدي يا مريم', translit: 'usjudī yā maryam', gloss_id: 'sujudlah wahai Maryam (perintah wanita ya mukhathabah)', owner_island: 'QWD', level: 4, skill_id: 'QWD-L4-05', pos: 'phrase', category: 'Fi\'il Amr', visual_hint: '🧎‍♀️' },

  // QWD-L4-06: Tashrif Lughawi 14 Dhomir
  { id: 'lx_qwd_katabna_nahnu', ar_vocalized: 'كَتَبْنَا الرِّسَالَةَ جَمِيعًا', ar_plain: 'كتبنا الرسالة جميعا', translit: 'katabnā r-risālata jamīʿan', gloss_id: 'kami semua telah menulis surat (dhomir nahnu)', owner_island: 'QWD', level: 4, skill_id: 'QWD-L4-06', pos: 'phrase', category: 'Tashrif Lughawi', visual_hint: '👥' },
  { id: 'lx_qwd_katabtum_antum', ar_vocalized: 'هَلْ كَتَبْتُمُ الوَاجِبَ؟', ar_plain: 'هل كتبتم الواجب؟', translit: 'hal katabtumu l-wājiba?', gloss_id: 'apakah kalian (para pria) telah menulis tugas? (dhomir antum)', owner_island: 'QWD', level: 4, skill_id: 'QWD-L4-06', pos: 'phrase', category: 'Tashrif Lughawi', visual_hint: '👨‍🎓' },
  { id: 'lx_qwd_dhahabuu_hum', ar_vocalized: 'هُمْ ذَهَبُوا إِلَى المَسْجِدِ', ar_plain: 'هم ذهبوا إلى المسجد', translit: 'hum dhahabū ilā l-masjidi', gloss_id: 'mereka telah pergi ke masjid (dhomir hum waw jama\'ah)', owner_island: 'QWD', level: 4, skill_id: 'QWD-L4-06', pos: 'phrase', category: 'Tashrif Lughawi', visual_hint: '🚶‍♂️' },

  // Level 5: Mutaqaddim (C1-C2) - I'rab Lanjut, Mamnu', Musytaqqat & Tawabi'
  // QWD-L5-01: Tanda I'rab Pokok & Cabang Pengganti
  { id: 'lx_qwd_abuuka_marfu', ar_vocalized: 'جَاءَ أَبُوكَ الكَرِيمُ', ar_plain: 'جاء أبوك الكريم', translit: 'jāʾa abūka l-karīmu', gloss_id: 'ayahmu yang mulia telah datang (asma\'ul khamsah rafa\' bi-waw)', owner_island: 'QWD', level: 5, skill_id: 'QWD-L5-01', pos: 'phrase', category: 'I\'rab Far\'i', visual_hint: '🧓' },
  { id: 'lx_qwd_abaaka_manshub', ar_vocalized: 'رَأَيْتُ أَبَاكَ فِي المَسْجِدِ', ar_plain: 'رأيت أباك في المسجد', translit: 'raʾaytu abāka fī l-masjidi', gloss_id: 'aku melihat ayahmu di masjid (asma\'ul khamsah nashab bi-alif)', owner_island: 'QWD', level: 5, skill_id: 'QWD-L5-01', pos: 'phrase', category: 'I\'rab Far\'i', visual_hint: '👁️' },
  { id: 'lx_qwd_abiika_majrur', ar_vocalized: 'سَلَّمْتُ عَلَى أَبِيكَ', ar_plain: 'سلمت على أبيك', translit: 'sallamtu ʿalā abīka', gloss_id: 'aku bersalam kepada ayahmu (asma\'ul khamsah jar bi-ya)', owner_island: 'QWD', level: 5, skill_id: 'QWD-L5-01', pos: 'phrase', category: 'I\'rab Far\'i', visual_hint: '🤝' },

  // QWD-L5-02: Isim Terlarang Bertanwin: Mamnu' min ash-Sharf
  { id: 'lx_qwd_masaajida_fathah', ar_vocalized: 'صَلَّيْتُ فِي مَسَاجِدَ كَثِيرَةٍ', ar_plain: 'صليت في مساجد كثيرة', translit: 'ṣallaytu fī masājida kathīrah', gloss_id: 'aku salat di banyak masjid (majrur berfathah tanpa tanwin)', owner_island: 'QWD', level: 5, skill_id: 'QWD-L5-02', pos: 'phrase', category: 'Mamnu\' minash Sharf', visual_hint: '🕌' },
  { id: 'lx_qwd_ibrahima_fathah', ar_vocalized: 'أَوْحَيْنَا إِلَى إِبْرَاهِيمَ', ar_plain: 'أوحينا إلى إبراهيم', translit: 'awḥaynā ilā ibrāhīma', gloss_id: 'Kami wahyukan kepada Ibrahim (nama non-Arab majrur fathah)', owner_island: 'QWD', level: 5, skill_id: 'QWD-L5-02', pos: 'phrase', category: 'Mamnu\' minash Sharf', visual_hint: '📜' },
  { id: 'lx_qwd_almasajidi_kasrah', ar_vocalized: 'فِي المَسَاجِدِ التَّارِيخِيَّةِ', ar_plain: 'في المساجد التاريخية', translit: 'fī l-masājidi t-tārīkhiyyah', gloss_id: 'di masjid-masjid bersejarah (kembali berkasrah berkat Alif Lam)', owner_island: 'QWD', level: 5, skill_id: 'QWD-L5-02', pos: 'phrase', category: 'Mamnu\' minash Sharf', visual_hint: '🏛️' },

  // QWD-L5-03: Isim Musytaq: Isim Fa'il & Isim Maf'ul
  { id: 'lx_qwd_katib_maktub', ar_vocalized: 'الكَاتِبُ يَكْتُبُ المَكْتُوبَ', ar_plain: 'الكاتب يكتب المكتوب', translit: 'al-kātibu yaktubu l-maktūba', gloss_id: 'sang penulis menulis surat takdir (isim fa\'il + isim maf\'ul)', owner_island: 'QWD', level: 5, skill_id: 'QWD-L5-03', pos: 'phrase', category: 'Isim Musytaq', visual_hint: '✍️' },
  { id: 'lx_qwd_muallim_muallam', ar_vocalized: 'المُعَلِّمُ يَنْصَحُ الطَّالِبَ المُعَلَّمَ', ar_plain: 'المعلم ينصح الطالب المعلم', translit: 'al-muʿallimu yanṣaḥu ṭ-ṭāliba l-muʿallam', gloss_id: 'sang guru menasihati murid yang terdidik (fa\'il kasrah vs maf\'ul fathah mazid)', owner_island: 'QWD', level: 5, skill_id: 'QWD-L5-03', pos: 'phrase', category: 'Isim Musytaq', visual_hint: '🎓' },
  { id: 'lx_qwd_mursil_mursal', ar_vocalized: 'المُرْسِلُ وَالمُرْسَلُ إِلَيْهِ', ar_plain: 'المرسل والمرسل إليه', translit: 'al-mursilu wa-l-mursalu ilayh', gloss_id: 'pihak pengirim dan pihak penerima yang dikirimi', owner_island: 'QWD', level: 5, skill_id: 'QWD-L5-03', pos: 'phrase', category: 'Isim Musytaq', visual_hint: '📦' },

  // QWD-L5-04: Isim Musytaq: Isim Makan, Zaman, & Alat
  { id: 'lx_qwd_maktab_makan', ar_vocalized: 'مَكْتَبُ الإِدَارَةِ وَمَسْجِدُ الحَيِّ', ar_plain: 'مكتب الإدارة ومسجد الحي', translit: 'maktabu l-idārati wa-masjidu l-ḥayy', gloss_id: 'meja administrasi dan masjid kawasan (isim makan wazan maf\'al & maf\'il)', owner_island: 'QWD', level: 5, skill_id: 'QWD-L5-04', pos: 'phrase', category: 'Isim Alat & Tempat', visual_hint: '🏢' },
  { id: 'lx_qwd_miftah_alat', ar_vocalized: 'مِفْتَاحُ البَابِ وَمِلْعَقَةُ الطَّعَامِ', ar_plain: 'مفتاح الباب وملعقة الطعام', translit: 'miftāḥu l-bābi wa-milʿaqatu ṭ-ṭaʿām', gloss_id: 'kunci pintu dan sendok hidangan (isim alat wazan mif\'aal & mif\'alah)', owner_island: 'QWD', level: 5, skill_id: 'QWD-L5-04', pos: 'phrase', category: 'Isim Alat & Tempat', visual_hint: '🗝️' },
  { id: 'lx_qwd_malab_riyadhi', ar_vocalized: 'مَلْعَبُ كُرَةِ القَدَمِ', ar_plain: 'ملعب كرة القدم', translit: 'malʿabu kurati l-qadam', gloss_id: 'lapangan sepak bola (isim makan tempat bermain)', owner_island: 'QWD', level: 5, skill_id: 'QWD-L5-04', pos: 'phrase', category: 'Isim Alat & Tempat', visual_hint: '⚽' },

  // QWD-L5-05: Aturan Pengikut I'rab: At-Tawabi'
  { id: 'lx_qwd_naat_tabi', ar_vocalized: 'جَاءَ العَالِمُ الكَبِيرُ وَابْنُهُ', ar_plain: 'جاء العالم الكبير وابنه', translit: 'jāʾa l-ʿālimu l-kabīru wa-bnuhu', gloss_id: 'ilmuwan besar itu dan putranya telah datang (na\'at sifat + \'athaf waw)', owner_island: 'QWD', level: 5, skill_id: 'QWD-L5-05', pos: 'phrase', category: 'At-Tawabi\'', visual_hint: '🌟' },
  { id: 'lx_qwd_badal_khalifah', ar_vocalized: 'عَدَلَ الخَلِيفَةُ عُمَرُ', ar_plain: 'عدل الخليفة عمر', translit: 'ʿadala l-khalīfatu ʿumaru', gloss_id: 'Khalifah Umar telah berlaku adil (badal pengganti penjelas marfu\')', owner_island: 'QWD', level: 5, skill_id: 'QWD-L5-05', pos: 'phrase', category: 'At-Tawabi\'', visual_hint: '⚖️' },
  { id: 'lx_qwd_taukid_kulluhum', ar_vocalized: 'نَجَحَ الطُّلَّابُ كُلُّهُمْ', ar_plain: 'نجح الطلاب كلهم', translit: 'najaḥa ṭ-ṭullābu kulluhum', gloss_id: 'para siswa telah lulus semuanya (taukid maknawi penguat)', owner_island: 'QWD', level: 5, skill_id: 'QWD-L5-05', pos: 'phrase', category: 'At-Tawabi\'', visual_hint: '🎉' },

  // QWD-L5-06: Analisis I'rab Aplikatif Teks Klasik
  { id: 'lx_qwd_qaala_allahu_taala', ar_vocalized: 'قَالَ اللَّهُ تَبَارَكَ وَتَعَالَى', ar_plain: 'قال الله تبارك وتعالى', translit: 'qāla Llāhu tabāraka wa-taʿālā', gloss_id: 'Allah Tabaraka wa Ta\'ala berfirman (analisis fi\'il madhi mabni fathah + fa\'il jalalah marfu\')', owner_island: 'QWD', level: 5, skill_id: 'QWD-L5-06', pos: 'phrase', category: 'I\'rab Aplikatif', visual_hint: '📖' },
  { id: 'lx_qwd_bismillahi_irab', ar_vocalized: 'بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ', ar_plain: 'بسم الله الرحمن الرحيم', translit: 'bi-smi Llāhi r-raḥmāni r-raḥīm', gloss_id: 'dengan nama Allah Yang Maha Pengasih (analisis bedah frasa jar, mudhaf ilaih, dan dua sifat na\'at)', owner_island: 'QWD', level: 5, skill_id: 'QWD-L5-06', pos: 'phrase', category: 'I\'rab Aplikatif', visual_hint: '🕌' },
  { id: 'lx_qwd_alhamdu_lillahi_irab', ar_vocalized: 'الحَمْدُ لِلَّهِ رَبِّ العَالَمِينَ', ar_plain: 'الحمد لله رب العالمين', translit: 'al-ḥamdu li-Llāhi rabbi l-ʿālamīn', gloss_id: 'segala puji bagi Allah Tuhan semesta alam (mubtada\', khabar jar-majrur, badal majrur, mudhaf ilaih ya)', owner_island: 'QWD', level: 5, skill_id: 'QWD-L5-06', pos: 'phrase', category: 'I\'rab Aplikatif', visual_hint: '🤲' },

  // --- IST (Lembah Istima': 17 Modul Menyimak & Fonem Akustik L0-L5) ---
  // Level 0: Tamhidi - Fonetik Dasar, Durasi Vokal, & Resonansi
  // IST-L0-01: Menyimak Suku Kata & Konsonan Murni
  { id: 'lx_ist_kataba', ar_vocalized: 'كَتَبَ', ar_plain: 'كتب', translit: 'kataba', gloss_id: 'menulis (tiga vokal fathah murni teratur)', owner_island: 'IST', level: 0, skill_id: 'IST-L0-01', pos: 'fiil', category: 'Suku Kata Dasar', visual_hint: '✍️' },
  { id: 'lx_ist_kutiba', ar_vocalized: 'كُتِبَ', ar_plain: 'كتب', translit: 'kutiba', gloss_id: 'ditulis (kombinasi vokal u - i - a)', owner_island: 'IST', level: 0, skill_id: 'IST-L0-01', pos: 'fiil', category: 'Suku Kata Dasar', visual_hint: '📜' },
  { id: 'lx_ist_rusima', ar_vocalized: 'رُسِمَ', ar_plain: 'رسم', translit: 'rusima', gloss_id: 'digambar (kombinasi vokal pasif)', owner_island: 'IST', level: 0, skill_id: 'IST-L0-01', pos: 'fiil', category: 'Suku Kata Dasar', visual_hint: '🎨' },
  { id: 'lx_ist_daba', ar_vocalized: 'دَبَّ', ar_plain: 'دب', translit: 'dabba', gloss_id: 'melangkah pelan (konsonan rangkap tasydid)', owner_island: 'IST', level: 0, skill_id: 'IST-L0-01', pos: 'fiil', category: 'Suku Kata Dasar', visual_hint: '🐾' },

  // IST-L0-02: Diskriminasi Harakat Pendek vs Panjang (Mad)
  { id: 'lx_ist_jamal', ar_vocalized: 'جَمَلٌ', ar_plain: 'جمل', translit: 'jamalun', gloss_id: 'unta (vokal pendek ma satu ketukan)', owner_island: 'IST', level: 0, skill_id: 'IST-L0-02', pos: 'isim', category: 'Vokal Pendek vs Mad', visual_hint: '🐫' },
  { id: 'lx_ist_jamaal', ar_vocalized: 'جَمَالٌ', ar_plain: 'جمال', translit: 'jamālun', gloss_id: 'keindahan (vokal panjang mad mā dua ketukan)', owner_island: 'IST', level: 0, skill_id: 'IST-L0-02', pos: 'isim', category: 'Vokal Pendek vs Mad', visual_hint: '✨' },
  { id: 'lx_ist_alima', ar_vocalized: 'عَلِمَ', ar_plain: 'علم', translit: 'ʿalima', gloss_id: 'mengetahui (vokal pendek tanpa mad)', owner_island: 'IST', level: 0, skill_id: 'IST-L0-02', pos: 'fiil', category: 'Vokal Pendek vs Mad', visual_hint: '💡' },
  { id: 'lx_ist_aalim', ar_vocalized: 'عَالِمٌ', ar_plain: 'عالم', translit: 'ʿālimun', gloss_id: 'ilmuwan / ulama (vokal panjang mad ʿā)', owner_island: 'IST', level: 0, skill_id: 'IST-L0-02', pos: 'isim', category: 'Vokal Pendek vs Mad', visual_hint: '🎓' },

  // IST-L0-03: Menyimak Bunyi Tanwin & Sukun
  { id: 'lx_ist_kitabun', ar_vocalized: 'كِتَابٌ', ar_plain: 'كتاب', translit: 'kitābun', gloss_id: 'sebuah buku (tanwin dhammah berdengung -un)', owner_island: 'IST', level: 0, skill_id: 'IST-L0-03', pos: 'isim', category: 'Tanwin vs Sukun', visual_hint: '📚' },
  { id: 'lx_ist_kitaban', ar_vocalized: 'كِتَابًا', ar_plain: 'كتابا', translit: 'kitāban', gloss_id: 'buku (tanwin fathah -an terbuka)', owner_island: 'IST', level: 0, skill_id: 'IST-L0-03', pos: 'isim', category: 'Tanwin vs Sukun', visual_hint: '📖' },
  { id: 'lx_ist_kitabin', ar_vocalized: 'كِتَابٍ', ar_plain: 'كتاب', translit: 'kitābin', gloss_id: 'buku (tanwin kasrah -in majrur)', owner_island: 'IST', level: 0, skill_id: 'IST-L0-03', pos: 'isim', category: 'Tanwin vs Sukun', visual_hint: '📑' },
  { id: 'lx_ist_kitab_waqaf', ar_vocalized: 'كِتَابْ', ar_plain: 'كتاب', translit: 'kitāb', gloss_id: 'buku (berhenti waqaf sukun tanpa dengung nun)', owner_island: 'IST', level: 0, skill_id: 'IST-L0-03', pos: 'isim', category: 'Tanwin vs Sukun', visual_hint: '⏹️' },

  // Level 1: Mubtadi' (A1) - Pasangan Minimal Halq, Ithbaq, Kuantitas, & Ruang
  // IST-L1-01: Pasangan Minimal Halq (Tenggorokan)
  { id: 'lx_ist_alim', ar_vocalized: 'عَلِيمٌ', ar_plain: 'عليم', translit: 'ʿalīmun', gloss_id: 'maha mengetahui (huruf \'Ain dari tengah tenggorokan)', owner_island: 'IST', level: 1, skill_id: 'IST-L1-01', pos: 'isim', category: 'Pasangan Minimal Halq', visual_hint: '🧠' },
  { id: 'lx_ist_aleem', ar_vocalized: 'أَلِيمٌ', ar_plain: 'أليم', translit: 'alīmun', gloss_id: 'pedih / menyakitkan (huruf Hamzah dari pangkal pita suara)', owner_island: 'IST', level: 1, skill_id: 'IST-L1-01', pos: 'isim', category: 'Pasangan Minimal Halq', visual_hint: '🩹' },
  { id: 'lx_ist_hamala', ar_vocalized: 'حَمَلَ', ar_plain: 'حمل', translit: 'ḥamala', gloss_id: 'memikul / membawa (huruf Ha pedas bersih)', owner_island: 'IST', level: 1, skill_id: 'IST-L1-01', pos: 'fiil', category: 'Pasangan Minimal Halq', visual_hint: '🎒' },
  { id: 'lx_ist_hamala_ha', ar_vocalized: 'هَمَلَ', ar_plain: 'همل', translit: 'hamala', gloss_id: 'terlantar / terabaikan (huruf Ha dada berhembus)', owner_island: 'IST', level: 1, skill_id: 'IST-L1-01', pos: 'fiil', category: 'Pasangan Minimal Halq', visual_hint: '🍂' },
  { id: 'lx_ist_khalil', ar_vocalized: 'خَلِيلٌ', ar_plain: 'خليل', translit: 'khalīlun', gloss_id: 'sahabat sejati (huruf Kha getar kerongkongan atas)', owner_island: 'IST', level: 1, skill_id: 'IST-L1-01', pos: 'isim', category: 'Pasangan Minimal Halq', visual_hint: '🤝' },
  { id: 'lx_ist_ghalil', ar_vocalized: 'غَلِيلٌ', ar_plain: 'غليل', translit: 'ghalīlun', gloss_id: 'dahaga hebat (huruf Ghain basah mendengkur)', owner_island: 'IST', level: 1, skill_id: 'IST-L1-01', pos: 'isim', category: 'Pasangan Minimal Halq', visual_hint: '💧' },

  // IST-L1-02: Pasangan Minimal Huruf Tebal / Ithbaq
  { id: 'lx_ist_qalb', ar_vocalized: 'قَلْبٌ', ar_plain: 'قلب', translit: 'qalbun', gloss_id: 'hati / nurani (Qaf tebal pangkal lidah berdentum)', owner_island: 'IST', level: 1, skill_id: 'IST-L1-02', pos: 'isim', category: 'Pasangan Minimal Tebal-Tipis', visual_hint: '❤️' },
  { id: 'lx_ist_kalb', ar_vocalized: 'كَلْبٌ', ar_plain: 'كلب', translit: 'kalbun', gloss_id: 'anjing (Kaf tipis desis renyah di rongga depan)', owner_island: 'IST', level: 1, skill_id: 'IST-L1-02', pos: 'isim', category: 'Pasangan Minimal Tebal-Tipis', visual_hint: '🐕' },
  { id: 'lx_ist_sayf', ar_vocalized: 'سَيْفٌ', ar_plain: 'سيف', translit: 'sayfun', gloss_id: 'pedang tajam (Sin tipis desis lidah depan)', owner_island: 'IST', level: 1, skill_id: 'IST-L1-02', pos: 'isim', category: 'Pasangan Minimal Tebal-Tipis', visual_hint: '⚔️' },
  { id: 'lx_ist_shayf', ar_vocalized: 'صَيْفٌ', ar_plain: 'صيف', translit: 'ṣayfun', gloss_id: 'musim panas terik (Shad tebal bulat bergaung)', owner_island: 'IST', level: 1, skill_id: 'IST-L1-02', pos: 'isim', category: 'Pasangan Minimal Tebal-Tipis', visual_hint: '☀️' },
  { id: 'lx_ist_teen', ar_vocalized: 'تِينٌ', ar_plain: 'تين', translit: 'tīnun', gloss_id: 'buah tin manis (Ta tipis ketukan gigi seri)', owner_island: 'IST', level: 1, skill_id: 'IST-L1-02', pos: 'isim', category: 'Pasangan Minimal Tebal-Tipis', visual_hint: '🫐' },
  { id: 'lx_ist_theen', ar_vocalized: 'طِينٌ', ar_plain: 'طين', translit: 'ṭīnun', gloss_id: 'tanah liat basah (Tha tebal menggelembung)', owner_island: 'IST', level: 1, skill_id: 'IST-L1-02', pos: 'isim', category: 'Pasangan Minimal Tebal-Tipis', visual_hint: '🧱' },

  // IST-L1-03: Menyimak Angka 1-10 & Benda Lingkungan
  { id: 'lx_ist_khamsah', ar_vocalized: 'خَمْسَةٌ', ar_plain: 'خمسة', translit: 'khamsatun', gloss_id: 'lima (angka simakan lisan dengan huruf Kha)', owner_island: 'IST', level: 1, skill_id: 'IST-L1-03', pos: 'isim', category: 'Angka & Lingkungan', visual_hint: '🖐️' },
  { id: 'lx_ist_sabah', ar_vocalized: 'سَبْعَةٌ', ar_plain: 'سبعة', translit: 'sabʿatun', gloss_id: 'tujuh (angka dengan getaran qalqalah Ba dan \'Ain)', owner_island: 'IST', level: 1, skill_id: 'IST-L1-03', pos: 'isim', category: 'Angka & Lingkungan', visual_hint: '7️⃣' },
  { id: 'lx_ist_asharah', ar_vocalized: 'عَشَرَةٌ', ar_plain: 'عشرة', translit: 'ʿasyaratun', gloss_id: 'sepuluh (angka puluhan simakan)', owner_island: 'IST', level: 1, skill_id: 'IST-L1-03', pos: 'isim', category: 'Angka & Lingkungan', visual_hint: '🔟' },
  { id: 'lx_ist_bayt_wasi', ar_vocalized: 'بَيْتٌ وَاسِعٌ', ar_plain: 'بيت واسع', translit: 'baytun wāsiʿ', gloss_id: 'rumah yang luas (deskripsi lingkungan)', owner_island: 'IST', level: 1, skill_id: 'IST-L1-03', pos: 'phrase', category: 'Angka & Lingkungan', visual_hint: '🏡' },

  // IST-L1-04: Menyimak Arah & Orientasi Ruang
  { id: 'lx_ist_yamin', ar_vocalized: 'يَمِينٌ', ar_plain: 'يمين', translit: 'yamīnun', gloss_id: 'arah kanan (petunjuk navigasi audio)', owner_island: 'IST', level: 1, skill_id: 'IST-L1-04', pos: 'isim', category: 'Arah Spasial', visual_hint: '➡️' },
  { id: 'lx_ist_yasar', ar_vocalized: 'يَسَارٌ', ar_plain: 'يسار', translit: 'yasārun', gloss_id: 'arah kiri (petunjuk navigasi audio)', owner_island: 'IST', level: 1, skill_id: 'IST-L1-04', pos: 'isim', category: 'Arah Spasial', visual_hint: '⬅️' },
  { id: 'lx_ist_amam', ar_vocalized: 'أَمَامَ المَبْنَى', ar_plain: 'أمام المبنى', translit: 'amāma l-mabnā', gloss_id: 'di depan gedung (posisi muka)', owner_island: 'IST', level: 1, skill_id: 'IST-L1-04', pos: 'phrase', category: 'Arah Spasial', visual_hint: '⬆️' },
  { id: 'lx_ist_wara', ar_vocalized: 'وَرَاءَ البَابِ', ar_plain: 'وراء الباب', translit: 'warāʾa l-bāb', gloss_id: 'di balik pintu (posisi belakang)', owner_island: 'IST', level: 1, skill_id: 'IST-L1-04', pos: 'phrase', category: 'Arah Spasial', visual_hint: '🚪' },

  // Level 2: Menengah Awal (A2) - Awamir, Waktu, 5W1H, & Intonasi Prosodi
  // IST-L2-01: Menyimak Instruksi Perintah Kelas & Aksi
  { id: 'lx_ist_iqra_sawtan', ar_vocalized: 'اِقْرَأْ بِصَوْتٍ عَالٍ', ar_plain: 'اقرأ بصوت عال', translit: 'iqraʾ bi-ṣawtin ʿālin', gloss_id: 'bacalah dengan suara lantang! (instruksi kelas)', owner_island: 'IST', level: 2, skill_id: 'IST-L2-01', pos: 'phrase', category: 'Instruksi Suara', visual_hint: '📢' },
  { id: 'lx_ist_isma_jayyidan', ar_vocalized: 'اِسْمَعْ جَيِّدًا', ar_plain: 'اسمع جيدا', translit: 'ismaʿ jayyidan', gloss_id: 'dengarkanlah baik-baik! (perintah fokus simak)', owner_island: 'IST', level: 2, skill_id: 'IST-L2-01', pos: 'phrase', category: 'Instruksi Suara', visual_hint: '👂' },
  { id: 'lx_ist_uktub_daftar', ar_vocalized: 'اُكْتُبْ فِي دَفْتَرِكَ', ar_plain: 'اكتب في دفترك', translit: 'uktub fī daftarik', gloss_id: 'tulislah di buku catatanmu! (perintah imla\')', owner_island: 'IST', level: 2, skill_id: 'IST-L2-01', pos: 'phrase', category: 'Instruksi Suara', visual_hint: '✍️' },
  { id: 'lx_ist_ijlis_makanaka', ar_vocalized: 'اِجْلِسْ فِي مَكَانِكَ', ar_plain: 'اجلس في مكانك', translit: 'ijlis fī makānik', gloss_id: 'duduklah di tempatmu! (disiplin kelas)', owner_island: 'IST', level: 2, skill_id: 'IST-L2-01', pos: 'phrase', category: 'Instruksi Suara', visual_hint: '🪑' },

  // IST-L2-02: Menyimak Waktu & Jam Arab
  { id: 'lx_ist_saah_thalithah', ar_vocalized: 'السَّاعَةُ الثَّالِثَةُ تَمَامًا', ar_plain: 'الساعة الثالثة تماما', translit: 'as-sāʿatu th-thālithatu tamāman', gloss_id: 'pukul tiga tepat (simakan waktu pas)', owner_island: 'IST', level: 2, skill_id: 'IST-L2-02', pos: 'phrase', category: 'Waktu Simak', visual_hint: '🕒' },
  { id: 'lx_ist_saah_nisf', ar_vocalized: 'الخَامِسَةُ وَالنِّصْفُ', ar_plain: 'الخامسة والنصف', translit: 'al-khāmisatu wa-n-niṣf', gloss_id: 'pukul setengah enam / 05:30 (simakan nisfu)', owner_island: 'IST', level: 2, skill_id: 'IST-L2-02', pos: 'phrase', category: 'Waktu Simak', visual_hint: '🕠' },
  { id: 'lx_ist_saah_rub', ar_vocalized: 'السَّادِسَةُ وَالرُّبْعُ', ar_plain: 'السادسة والربع', translit: 'as-sādisatu wa-r-rubʿ', gloss_id: 'pukul enam lebih seperempat / 06:15 (simakan rubu\')', owner_island: 'IST', level: 2, skill_id: 'IST-L2-02', pos: 'phrase', category: 'Waktu Simak', visual_hint: '🕕' },
  { id: 'lx_ist_masaan_bakir', ar_vocalized: 'فِي المَسَاءِ البَاكِرِ', ar_plain: 'في المساء الباكر', translit: 'fī l-masāʾi l-bākir', gloss_id: 'pada awal petang hari (keterangan waktu narasi)', owner_island: 'IST', level: 2, skill_id: 'IST-L2-02', pos: 'phrase', category: 'Waktu Simak', visual_hint: '🌆' },

  // IST-L2-03: Identifikasi Kata Tanya 5W1H dari Audio
  { id: 'lx_ist_man_anta', ar_vocalized: 'مَنْ هَذَا الرَّجُلُ؟', ar_plain: 'من هذا الرجل؟', translit: 'man hādhā r-rajul?', gloss_id: 'siapakah pria ini? (kata tanya orang lisan)', owner_island: 'IST', level: 2, skill_id: 'IST-L2-03', pos: 'phrase', category: 'Kata Tanya 5W1H', visual_hint: '❓' },
  { id: 'lx_ist_ayna_almahathah', ar_vocalized: 'أَيْنَ المَحَطَّةُ؟', ar_plain: 'أين المحطة؟', translit: 'ayna l-maḥaṭṭah?', gloss_id: 'di manakah stasiun kereta? (kata tanya tempat lisan)', owner_island: 'IST', level: 2, skill_id: 'IST-L2-03', pos: 'phrase', category: 'Kata Tanya 5W1H', visual_hint: '🚉' },
  { id: 'lx_ist_mata_tusafir', ar_vocalized: 'مَتَى تُسَافِرُ غَدًا؟', ar_plain: 'متى تسافر غدا؟', translit: 'matā tusāfiru ghadan?', gloss_id: 'kapan engkau berangkat esok? (kata tanya waktu lisan)', owner_island: 'IST', level: 2, skill_id: 'IST-L2-03', pos: 'phrase', category: 'Kata Tanya 5W1H', visual_hint: '🛫' },
  { id: 'lx_ist_kam_thaman', ar_vocalized: 'كَمْ ثَمَنُ هَذَا؟', ar_plain: 'كم ثمن هذا؟', translit: 'kam thamanu hādhā?', gloss_id: 'berapa harga barang ini? (kata tanya kuantitas pasar)', owner_island: 'IST', level: 2, skill_id: 'IST-L2-03', pos: 'phrase', category: 'Kata Tanya 5W1H', visual_hint: '💰' },

  // IST-L2-04: Diskriminasi Intonasi Tanya vs Berita
  { id: 'lx_ist_talib_tanya', ar_vocalized: 'أَنْتَ طَالِبٌ؟', ar_plain: 'أنت طالب؟', translit: 'anta ṭālibun?', gloss_id: 'kamu seorang mahasiswa? (intonasi nada melengking naik)', owner_island: 'IST', level: 2, skill_id: 'IST-L2-04', pos: 'phrase', category: 'Intonasi & Prosodi', visual_hint: '📈' },
  { id: 'lx_ist_talib_berita', ar_vocalized: 'أَنْتَ طَالِبٌ.', ar_plain: 'أنت طالب.', translit: 'anta ṭālibun.', gloss_id: 'kamu adalah seorang mahasiswa. (intonasi nada datar menurun tuntas)', owner_island: 'IST', level: 2, skill_id: 'IST-L2-04', pos: 'phrase', category: 'Intonasi & Prosodi', visual_hint: '📉' },
  { id: 'lx_ist_safara_tanya', ar_vocalized: 'سَافَرَ خَالِدٌ؟', ar_plain: 'سافر خالد؟', translit: 'sāfara khālidun?', gloss_id: 'apakah Khalid sudah berangkat? (pertanyaan tanpa kata tanya berintonasi nada tinggi)', owner_island: 'IST', level: 2, skill_id: 'IST-L2-04', pos: 'phrase', category: 'Intonasi & Prosodi', visual_hint: '❓' },
  { id: 'lx_ist_safara_berita', ar_vocalized: 'سَافَرَ خَالِدٌ.', ar_plain: 'سافر خالد.', translit: 'sāfara khālidun.', gloss_id: 'Khalid telah berangkat. (pernyataan afirmatif nada stabil)', owner_island: 'IST', level: 2, skill_id: 'IST-L2-04', pos: 'phrase', category: 'Intonasi & Prosodi', visual_hint: '✅' },

  // Level 3: Menengah Lanjut (B1) - Transaksi Pasar, Fabel, & Deskripsi Tempat
  // IST-L3-01: Menyimak Dialog Transaksional Pasar & Toko
  { id: 'lx_ist_bikam_qamis', ar_vocalized: 'بِكَمْ هَذَا القَمِيصُ؟', ar_plain: 'بكم هذا القميص؟', translit: 'bi-kam hādhā l-qamīṣ?', gloss_id: 'berapa harga kemeja ini? (tanya transaksi pasar)', owner_island: 'IST', level: 3, skill_id: 'IST-L3-01', pos: 'phrase', category: 'Pasar & Transaksi', visual_hint: '👔' },
  { id: 'lx_ist_khamsun_riyal', ar_vocalized: 'خَمْسُونَ رِيَالًا فَقَطْ', ar_plain: 'خمسون ريالا فقط', translit: 'khamsūna riyālan faqaṭ', gloss_id: 'lima puluh riyal saja (penawaran pedagang)', owner_island: 'IST', level: 3, skill_id: 'IST-L3-01', pos: 'phrase', category: 'Pasar & Transaksi', visual_hint: '💵' },
  { id: 'lx_ist_hal_min_takhfidh', ar_vocalized: 'هَلْ مِنْ تَخْفِيضٍ؟', ar_plain: 'هل من تخفيض؟', translit: 'hal min takhfīḍ?', gloss_id: 'apakah ada diskon / potongan harga? (tawar menawar)', owner_island: 'IST', level: 3, skill_id: 'IST-L3-01', pos: 'phrase', category: 'Pasar & Transaksi', visual_hint: '🏷️' },
  { id: 'lx_ist_khudh_baqi', ar_vocalized: 'خُذِ البَاقِيَ شُكْرًا', ar_plain: 'خذ الباقي شكرا', translit: 'khudhi l-bāqiya syukran', gloss_id: 'ambillah uang kembalianmu, terima kasih! (penutupan jual beli)', owner_island: 'IST', level: 3, skill_id: 'IST-L3-01', pos: 'phrase', category: 'Pasar & Transaksi', visual_hint: '🪙' },

  // IST-L3-02: Menyimak Kisah Singkat & Cerita Fabel
  { id: 'lx_ist_kaana_asad', ar_vocalized: 'كَانَ الأَسَدُ نَائِمًا', ar_plain: 'كان الأسد نائما', translit: 'kāna l-asadu nāʾiman', gloss_id: 'singa itu sedang tidur lelap (pembuka narasi fabel)', owner_island: 'IST', level: 3, skill_id: 'IST-L3-02', pos: 'phrase', category: 'Cerita Audio & Hikmah', visual_hint: '🦁' },
  { id: 'lx_ist_faara_saghirah', ar_vocalized: 'فَأْرَةٌ صَغِيرَةٌ شُجَاعَةٌ', ar_plain: 'فأرة صغيرة شجاعة', translit: 'faʾratun ṣaghīratun syujāʿah', gloss_id: 'seekor tikus kecil yang pemberani (tokoh fabel)', owner_island: 'IST', level: 3, skill_id: 'IST-L3-02', pos: 'phrase', category: 'Cerita Audio & Hikmah', visual_hint: '🐭' },
  { id: 'lx_ist_shabakah_sayyad', ar_vocalized: 'شَبَكَةُ الصَّيَّادِ', ar_plain: 'شبكة الصياد', translit: 'syabakatu ṣ-ṣayyād', gloss_id: 'jaring perangkap pemburu (rintangan kisah)', owner_island: 'IST', level: 3, skill_id: 'IST-L3-02', pos: 'phrase', category: 'Cerita Audio & Hikmah', visual_hint: '🕸️' },
  { id: 'lx_ist_anqadhahu', ar_vocalized: 'أَنْقَذَهُ بِوَفَاءٍ', ar_plain: 'أنقذه بوفاء', translit: 'anqadhahu bi-wafāʾ', gloss_id: 'ia menyelamatkannya dengan penuh kesetiaan (hikmah moral)', owner_island: 'IST', level: 3, skill_id: 'IST-L3-02', pos: 'phrase', category: 'Cerita Audio & Hikmah', visual_hint: '🌟' },

  // IST-L3-03: Menyimak Deskripsi Tempat & Tata Letak
  { id: 'lx_ist_bijanib_masjid', ar_vocalized: 'بِجَانِبِ المَسْجِدِ الكَبِيرِ', ar_plain: 'بجانب المسجد الكبير', translit: 'bi-jānibi l-masjidi l-kabīr', gloss_id: 'di sebelah samping masjid agung (rujukan spasial)', owner_island: 'IST', level: 3, skill_id: 'IST-L3-03', pos: 'phrase', category: 'Deskripsi Tempat', visual_hint: '🕌' },
  { id: 'lx_ist_wasat_madinah', ar_vocalized: 'فِي وَسَطِ المَدِينَةِ', ar_plain: 'في وسط المدينة', translit: 'fī wasaṭi l-madīnah', gloss_id: 'di jantung pusat kota (orientasi wilayah)', owner_island: 'IST', level: 3, skill_id: 'IST-L3-03', pos: 'phrase', category: 'Deskripsi Tempat', visual_hint: '🏙️' },
  { id: 'lx_ist_muqabil_souq', ar_vocalized: 'مُقَابِلَ السُّوقِ المَرْكَزِيِّ', ar_plain: 'مقابل السوق المركزي', translit: 'muqābila s-sūqi l-markaziyy', gloss_id: 'berhadapan tepat dengan pasar induk', owner_island: 'IST', level: 3, skill_id: 'IST-L3-03', pos: 'phrase', category: 'Deskripsi Tempat', visual_hint: '🏬' },
  { id: 'lx_ist_taqaul_qaryah', ar_vocalized: 'تَقَعُ القَرْيَةُ فَوْقَ التَّلِّ', ar_plain: 'تقع القرية فوق التل', translit: 'taqaʿu l-qaryatu fawqa t-tall', gloss_id: 'desa itu terletak di atas bukit (peta suara)', owner_island: 'IST', level: 3, skill_id: 'IST-L3-03', pos: 'phrase', category: 'Deskripsi Tempat', visual_hint: '🏞️' },

  // Level 4: Mahir Awal (B2) - Tuturan Alami Penutur Asli & Pengumuman Publik
  // IST-L4-01: Menyimak Percakapan Natural Penutur Asli
  { id: 'lx_ist_kayfa_haluk', ar_vocalized: 'كَيْفَ حَالُكَ اليَوْمَ يَا صَاحِبِي؟', ar_plain: 'كيف حالك اليوم يا صاحبي؟', translit: 'kayfa ḥāluka l-yawma yā ṣāḥibī?', gloss_id: 'bagaimana kabarmu hari ini sahabatku? (sapaan hangat natural)', owner_island: 'IST', level: 4, skill_id: 'IST-L4-01', pos: 'phrase', category: 'Tuturan Natural', visual_hint: '☕' },
  { id: 'lx_ist_lam_araka', ar_vocalized: 'لَمْ أَرَكَ مُنْذُ مُدَّةٍ طَوِيلَةٍ', ar_plain: 'لم أرك منذ مدة طويلة', translit: 'lam araka mundhu muddatin ṭawīlah', gloss_id: 'sudah lama sekali aku tak berjumpa denganmu (frasa temu kangen)', owner_island: 'IST', level: 4, skill_id: 'IST-L4-01', pos: 'phrase', category: 'Tuturan Natural', visual_hint: '⏳' },
  { id: 'lx_ist_murtah_liqaa', ar_vocalized: 'أَنَا مُرْتَاحٌ جِدًّا بِلِقَائِكَ', ar_plain: 'أنا مرتاح جدا بلقائك', translit: 'anā murtāḥun jiddan bi-liqāʾik', gloss_id: 'aku sungguh senang bisa berbincang denganmu', owner_island: 'IST', level: 4, skill_id: 'IST-L4-01', pos: 'phrase', category: 'Tuturan Natural', visual_hint: '😊' },
  { id: 'lx_ist_rahbi_saa', ar_vocalized: 'عَلَى الرَّحْبِ وَالسَّعَةِ', ar_plain: 'على الرحب والسعة', translit: 'ʿalā r-raḥbi wa-s-saʿah', gloss_id: 'dengan segenap rasa senang hati (ekspresi keramahan Arab)', owner_island: 'IST', level: 4, skill_id: 'IST-L4-01', pos: 'phrase', category: 'Tuturan Natural', visual_hint: '🌸' },

  // IST-L4-02: Menyimak Pengumuman Publik & Panduan Fasilitas
  { id: 'lx_ist_nidaa_rukkab', ar_vocalized: 'نِدَاءٌ عَاجِلٌ إِلَى جَمِيعِ الرُّكَّابِ', ar_plain: 'نداء عاجل إلى جميع الركاب', translit: 'nidāʾun ʿājilun ilā jamīʿi r-rukkāb', gloss_id: 'panggilan segera kepada segenap penumpang (announcement bandara)', owner_island: 'IST', level: 4, skill_id: 'IST-L4-02', pos: 'phrase', category: 'Pengumuman Publik', visual_hint: '📣' },
  { id: 'lx_ist_rihlah_jiddah', ar_vocalized: 'الرِّحْلَةُ رَقْمُ ٧٠٥ المُتَّجِهَةُ إِلَى جِدَّةَ', ar_plain: 'الرحلة رقم ٧٠٥ المتجهة إلى جدة', translit: 'ar-riḥlatu raqmu 705 al-muttajahatu ilā Jiddah', gloss_id: 'penerbangan nomor 705 tujuan kota Jeddah', owner_island: 'IST', level: 4, skill_id: 'IST-L4-02', pos: 'phrase', category: 'Pengumuman Publik', visual_hint: '✈️' },
  { id: 'lx_ist_bawwabah_arba', ar_vocalized: 'التَّوَجُّهُ فَوْرًا إِلَى البَوَّابَةِ رَقْمِ ٤', ar_plain: 'التوجه فورا إلى البوابة رقم ٤', translit: 'at-tawajjuhu fawran ilā l-bawwābati raqmi 4', gloss_id: 'harap segera bergegas menuju gerbang nomor 4', owner_island: 'IST', level: 4, skill_id: 'IST-L4-02', pos: 'phrase', category: 'Pengumuman Publik', visual_hint: '🚪' },
  { id: 'lx_ist_intibah_haqaib', ar_vocalized: 'الرَّجَاءُ الانْتِبَاهُ لِحَقَائِبِكُمُ الشَّخْصِيَّةِ', ar_plain: 'الرجاء الانتباه لحقائبكم الشخصية', translit: 'ar-rajāʾu l-intibāhu li-ḥaqāʾibikumu sy-syakhṣiyyah', gloss_id: 'harap senantiasa memperhatikan barang bawaan pribadi Anda', owner_island: 'IST', level: 4, skill_id: 'IST-L4-02', pos: 'phrase', category: 'Pengumuman Publik', visual_hint: '🧳' },

  // Level 5: Mahir Lanjut (C1) - Wacana Autentik, Berita Resmi, & Khutbah Fusha
  // IST-L5-01: Menyimak Wacana Autentik, Berita & Khutbah Fusha
  { id: 'lx_ist_akkada_wazir', ar_vocalized: 'أَكَّدَ الوَزِيرُ فِي مُؤْتَمَرٍ صَحَفِيٍّ', ar_plain: 'أكد الوزير في مؤتمر صحفي', translit: 'akkada l-wazīru fī muʾtamarin ṣaḥafiyy', gloss_id: 'menteri menegaskan dalam konferensi pers (wacana diplomasi berita)', owner_island: 'IST', level: 5, skill_id: 'IST-L5-01', pos: 'phrase', category: 'Berita & Orasi Fusha', visual_hint: '🎙️' },
  { id: 'lx_ist_tazeez_iqtisad', ar_vocalized: 'تَعْزِيزُ التَّعَاوُنِ الاقْتِصَادِيِّ', ar_plain: 'تعزيز التعاون الاقتصادي', translit: 'taʿzīzu t-taʿāwuni l-iqtiṣādiyy', gloss_id: 'peningkatan jalinan kerja sama di sektor ekonomi', owner_island: 'IST', level: 5, skill_id: 'IST-L5-01', pos: 'phrase', category: 'Berita & Orasi Fusha', visual_hint: '📈' },
  { id: 'lx_ist_khutbah_taqwa', ar_vocalized: 'أَيُّهَا النَّاسُ، اتَّقُوا اللَّهَ حَقَّ تُقَاتِهِ', ar_plain: 'أيها الناس اتsecondوا الله حق تقاته', translit: 'ayyuhā n-nāsu t-taqū Llāha ḥaqqa tuqātih', gloss_id: 'wahai segenap manusia, bertakwalah kepada Allah dengan sebenar takwa (orasi khutbah)', owner_island: 'IST', level: 5, skill_id: 'IST-L5-01', pos: 'phrase', category: 'Berita & Orasi Fusha', visual_hint: '🕌' },
  { id: 'lx_ist_bayan_khitam', ar_vocalized: 'صَدَرَ البَيَانُ الخِتَامِيُّ لِلْقِمَّةِ', ar_plain: 'صدر البيان الختامي للقمة', translit: 'ṣadara l-bayānu l-khitāmiyyu li-l-qimmah', gloss_id: 'komunike / pernyataan akhir resmi KTT telah diterbitkan', owner_island: 'IST', level: 5, skill_id: 'IST-L5-01', pos: 'phrase', category: 'Berita & Orasi Fusha', visual_hint: '📜' },

  // --- QRA (Perpustakaan Qira'ah: 18 Modul Membaca Teks Berharakat L1-L5) ---
  // Level 1: Mubtadi' (A1) - Harakat Lengkap, Mad, Kalimat Pendek, & Lam Ta'rif
  // QRA-L1-01: Membaca Kata Bertanda Harakat Lengkap
  { id: 'lx_qra_hadīqah', ar_vocalized: 'حَدِيقَةٌ جَمِيلَةٌ', ar_plain: 'حديقة جميلة', translit: 'ḥadīqatun jamīlah', gloss_id: 'taman yang indah (kombinasi vokal teratur)', owner_island: 'QRA', level: 1, skill_id: 'QRA-L1-01', pos: 'phrase', category: 'Harakat Lengkap', visual_hint: '🌸' },
  { id: 'lx_qra_shajar', ar_vocalized: 'شَجَرَةٌ مُثْمِرَةٌ', ar_plain: 'شجرة مثمرة', translit: 'syajaratun muthmirah', gloss_id: 'pohon yang berbuah lebat', owner_island: 'QRA', level: 1, skill_id: 'QRA-L1-01', pos: 'phrase', category: 'Harakat Lengkap', visual_hint: '🌳' },
  { id: 'lx_qra_zahrah', ar_vocalized: 'زَهْرَةٌ فَيَّاحَةٌ', ar_plain: 'زهرة فياحة', translit: 'zahratun fayyāḥah', gloss_id: 'bunga yang harum semerbak', owner_island: 'QRA', level: 1, skill_id: 'QRA-L1-01', pos: 'phrase', category: 'Harakat Lengkap', visual_hint: '🌹' },
  { id: 'lx_qra_fakihatun', ar_vocalized: 'فَاكِهَةٌ نَاضِجَةٌ', ar_plain: 'فاكهة ناضجة', translit: 'fākihatun nāḍijah', gloss_id: 'buah-buahan yang ranum manis', owner_island: 'QRA', level: 1, skill_id: 'QRA-L1-01', pos: 'phrase', category: 'Harakat Lengkap', visual_hint: '🍎' },

  // QRA-L1-02: Membaca Kata Bervokal Panjang (Mad Thabi'i)
  { id: 'lx_qra_maa', ar_vocalized: 'مَاءٌ عَذْبٌ', ar_plain: 'ماء عذب', translit: 'māʾun ʿadhb', gloss_id: 'air tawar yang jernih dan segar (mad alif)', owner_island: 'QRA', level: 1, skill_id: 'QRA-L1-02', pos: 'phrase', category: 'Vokal Panjang Mad', visual_hint: '💧' },
  { id: 'lx_qra_bustan', ar_vocalized: 'بُسْتَانٌ وَاسِعٌ', ar_plain: 'بستان واسع', translit: 'bustānun wāsiʿ', gloss_id: 'kebun buah yang terbentang luas', owner_island: 'QRA', level: 1, skill_id: 'QRA-L1-02', pos: 'phrase', category: 'Vokal Panjang Mad', visual_hint: '🏡' },
  { id: 'lx_qra_sarir', ar_vocalized: 'سَرِيرٌ مُرِيحٌ', ar_plain: 'سرير مريح', translit: 'sarīrun murīḥ', gloss_id: 'tempat tidur yang empuk dan nyaman (mad ya)', owner_island: 'QRA', level: 1, skill_id: 'QRA-L1-02', pos: 'phrase', category: 'Vokal Panjang Mad', visual_hint: '🛏️' },
  { id: 'lx_qra_tayr', ar_vocalized: 'طَيْرٌ يُغَرِّدُ', ar_plain: 'طير يغرد', translit: 'ṭayrun yugharrid', gloss_id: 'burung yang berkicau merdu di dahan', owner_island: 'QRA', level: 1, skill_id: 'QRA-L1-02', pos: 'phrase', category: 'Vokal Panjang Mad', visual_hint: '🐦' },

  // QRA-L1-03: Membaca Kalimat Pendek 2-3 Kata (Isyarah & Khobar)
  { id: 'lx_qra_hadha_kitab', ar_vocalized: 'هٰذَا كِتَابٌ مُفِيدٌ', ar_plain: 'هذا كتاب مفيد', translit: 'hādhā kitābun mufīd', gloss_id: 'ini adalah buku yang berfaedah', owner_island: 'QRA', level: 1, skill_id: 'QRA-L1-03', pos: 'phrase', category: 'Kalimat Pendek', visual_hint: '📘' },
  { id: 'lx_qra_tilka_madrasah', ar_vocalized: 'تِلْكَ مَدْرَسَةٌ نَظِيفَةٌ', ar_plain: 'تلك مدرسة نظيفة', translit: 'tilka madrasatun naẓīfah', gloss_id: 'itu adalah gedung sekolah yang bersih', owner_island: 'QRA', level: 1, skill_id: 'QRA-L1-03', pos: 'phrase', category: 'Kalimat Pendek', visual_hint: '🏫' },
  { id: 'lx_qra_alwalad_muaddab', ar_vocalized: 'الوَلَدُ مُؤَدَّبٌ جِدًّا', ar_plain: 'الولد مؤدب جدا', translit: 'al-waladu muʾaddabun jiddan', gloss_id: 'anak laki-laki itu sangat santun perangainya', owner_island: 'QRA', level: 1, skill_id: 'QRA-L1-03', pos: 'phrase', category: 'Kalimat Pendek', visual_hint: '👦' },
  { id: 'lx_qra_alghurfah_mudiah', ar_vocalized: 'الغُرْفَةُ مُضِيئَةٌ', ar_plain: 'الغرفة مضيئة', translit: 'al-ghurfatu muḍīʾah', gloss_id: 'kamar belajar itu terang benderang', owner_island: 'QRA', level: 1, skill_id: 'QRA-L1-03', pos: 'phrase', category: 'Kalimat Pendek', visual_hint: '💡' },

  // QRA-L1-04: Membaca Pembeda Al-Qamariyah vs Asy-Syamsiyah
  { id: 'lx_qra_qamar', ar_vocalized: 'القَمَرُ المُنِيرُ', ar_plain: 'القمر المنير', translit: 'al-qamaru l-munīr', gloss_id: 'bulan yang bersinar lembut (Al-Qamariyah jelas)', owner_island: 'QRA', level: 1, skill_id: 'QRA-L1-04', pos: 'phrase', category: 'Lam Ta\'rif', visual_hint: '🌙' },
  { id: 'lx_qra_shams', ar_vocalized: 'الشَّمْسُ المُشْرِقَةُ', ar_plain: 'الشمس المشرقة', translit: 'asy-syamsu l-musyriqah', gloss_id: 'matahari yang terbit hangat (Asy-Syamsiyah idgham)', owner_island: 'QRA', level: 1, skill_id: 'QRA-L1-04', pos: 'phrase', category: 'Lam Ta\'rif', visual_hint: '☀️' },
  { id: 'lx_qra_najm', ar_vocalized: 'النَّجْمُ اللَّامِعُ', ar_plain: 'النجم اللامع', translit: 'an-najmu l-lāmiʿ', gloss_id: 'bintang yang berkilau gemerlap di langit', owner_island: 'QRA', level: 1, skill_id: 'QRA-L1-04', pos: 'phrase', category: 'Lam Ta\'rif', visual_hint: '⭐' },
  { id: 'lx_qra_kitab_al', ar_vocalized: 'الكِتَابُ المَفْتُوحُ', ar_plain: 'الكتاب المفتوح', translit: 'al-kitābu l-maftūḥ', gloss_id: 'buku yang terbuka di atas meja', owner_island: 'QRA', level: 1, skill_id: 'QRA-L1-04', pos: 'phrase', category: 'Lam Ta\'rif', visual_hint: '📖' },

  // Level 2: Menengah Awal (A2) - Preposisi, Paragraf Mini, Dialog, & Tap-Gloss
  // QRA-L2-01: Membaca Kalimat Berpreposisi (Jar-Majrur & Zharaf)
  { id: 'lx_qra_fii_fasl', ar_vocalized: 'فِي الفَصْلِ الدِّرَاسِيِّ', ar_plain: 'في الفصل الدراسي', translit: 'fī l-faṣli d-dirāsiyy', gloss_id: 'di dalam ruang kelas pembelajaran', owner_island: 'QRA', level: 2, skill_id: 'QRA-L2-01', pos: 'phrase', category: 'Preposisi & Posisi', visual_hint: '🏫' },
  { id: 'lx_qra_ala_maktab', ar_vocalized: 'عَلَى المَكْتَبِ الخَشَبِيِّ', ar_plain: 'على المكتب الخشبي', translit: 'ʿalā l-maktabi l-khasyabiyy', gloss_id: 'di atas meja kayu pustaka', owner_island: 'QRA', level: 2, skill_id: 'QRA-L2-01', pos: 'phrase', category: 'Preposisi & Posisi', visual_hint: '🪵' },
  { id: 'lx_qra_tahta_shajarah', ar_vocalized: 'تَحْتَ الشَّجَرَةِ البَاسِقَةِ', ar_plain: 'تحت الشجرة الباسقة', translit: 'taḥta sy-syajarati l-bāsiqah', gloss_id: 'di bawah pohon rindang yang menjulang', owner_island: 'QRA', level: 2, skill_id: 'QRA-L2-01', pos: 'phrase', category: 'Preposisi & Posisi', visual_hint: '🌳' },
  { id: 'lx_qra_fawqa_sahab', ar_vocalized: 'فَوْقَ السَّحَابِ', ar_plain: 'فوق السحاب', translit: 'fawqa s-saḥāb', gloss_id: 'di atas awan putih berarak', owner_island: 'QRA', level: 2, skill_id: 'QRA-L2-01', pos: 'phrase', category: 'Preposisi & Posisi', visual_hint: '☁️' },

  // QRA-L2-02: Membaca Paragraf Mini Deskriptif (3-4 Baris)
  { id: 'lx_qra_qissah', ar_vocalized: 'قِصَّةٌ مُلْهِمَةٌ', ar_plain: 'قصة ملهمة', translit: 'qiṣṣatun mulhimah', gloss_id: 'cerita pendek yang memberi inspirasi budi', owner_island: 'QRA', level: 2, skill_id: 'QRA-L2-02', pos: 'phrase', category: 'Paragraf Deskriptif', visual_hint: '📜' },
  { id: 'lx_qra_maktabah', ar_vocalized: 'مَكْتَبَةٌ عَامِرَةٌ بِالكُتُبِ', ar_plain: 'مكتبة عامرة بالكتب', translit: 'maktabatun ʿāmiratun bi-l-kutub', gloss_id: 'perpustakaan megah yang dipenuhi buku', owner_island: 'QRA', level: 2, skill_id: 'QRA-L2-02', pos: 'phrase', category: 'Paragraf Deskriptif', visual_hint: '🏛️' },
  { id: 'lx_qra_suq_madinah', ar_vocalized: 'سُوقُ المَدِينَةِ الصَّاخِبُ', ar_plain: 'سوق المدينة الصاخب', translit: 'sūqu l-madīnati ṣ-ṣākhib', gloss_id: 'pasar kota yang ramai dikunjungi pembeli', owner_island: 'QRA', level: 2, skill_id: 'QRA-L2-02', pos: 'phrase', category: 'Paragraf Deskriptif', visual_hint: '🛒' },
  { id: 'lx_qra_bana_baytan', ar_vocalized: 'بَنَى بَيْتًا جَمِيلًا', ar_plain: 'بنى بيتا جميلا', translit: 'banā baytan jamīlā', gloss_id: 'dia membangun rumah asri impian keluarga', owner_island: 'QRA', level: 2, skill_id: 'QRA-L2-02', pos: 'phrase', category: 'Paragraf Deskriptif', visual_hint: '🏡' },

  // QRA-L2-03: Membaca Wacana Dialog Pendek 2 Tokoh
  { id: 'lx_qra_qaala_alwalad', ar_vocalized: 'قَالَ الوَلَدُ لِأَبِيهِ', ar_plain: 'قال الولد لأبيه', translit: 'qāla l-waladu li-abīh', gloss_id: 'anak itu berkata santun kepada ayahnya', owner_island: 'QRA', level: 2, skill_id: 'QRA-L2-03', pos: 'phrase', category: 'Wacana Dialog', visual_hint: '💬' },
  { id: 'lx_qra_ajaaba_alustadz', ar_vocalized: 'أَجَابَ الأُسْتَاذُ بِابْتِسَامَةٍ', ar_plain: 'أجاب الأستاذ بابتسامة', translit: 'ajāba l-ustādhu bi-btisāmah', gloss_id: 'guru menjawab dengan senyuman ramah', owner_island: 'QRA', level: 2, skill_id: 'QRA-L2-03', pos: 'phrase', category: 'Wacana Dialog', visual_hint: '👨‍🏫' },
  { id: 'lx_qra_saala_assaail', ar_vocalized: 'سَأَلَ عَنِ الطَّرِيقِ', ar_plain: 'سأل عن الطريق', translit: 'saʾala ʿani ṭ-ṭarīq', gloss_id: 'musafir menanyakan arah jalan menuju masjid', owner_island: 'QRA', level: 2, skill_id: 'QRA-L2-03', pos: 'phrase', category: 'Wacana Dialog', visual_hint: '🗺️' },
  { id: 'lx_qra_shukran_jazilan', ar_vocalized: 'شُكْرًا جَزِيلًا عَلَى عَوْنِكَ', ar_plain: 'شكرا جزيلا على عونك', translit: 'syukran jazīlan ʿalā ʿawnik', gloss_id: 'terima kasih banyak atas segenap bantuanmu', owner_island: 'QRA', level: 2, skill_id: 'QRA-L2-03', pos: 'phrase', category: 'Wacana Dialog', visual_hint: '🤝' },

  // QRA-L2-04: Teknik Tap-Gloss: Pengenalan Kosakata Kontekstual
  { id: 'lx_qra_mufradat_jadidah', ar_vocalized: 'مُفْرَدَاتٌ جَدِيدَةٌ فِي النَّصِّ', ar_plain: 'مفردات جديدة في النص', translit: 'mufradātun jadīdatun fī n-naṣṣ', gloss_id: 'kosakata baru yang dipelajari dalam konteks bacaan', owner_island: 'QRA', level: 2, skill_id: 'QRA-L2-04', pos: 'phrase', category: 'Tap-Gloss Konteks', visual_hint: '👆' },
  { id: 'lx_qra_maana_kalimah', ar_vocalized: 'مَعْنَى الكَلِمَةِ فِي السِّيَاقِ', ar_plain: 'معنى الكلمة في السياق', translit: 'maʿnā l-kalimati fī s-siyāq', gloss_id: 'makna kata yang tepat sesuai untaian kalimat', owner_island: 'QRA', level: 2, skill_id: 'QRA-L2-04', pos: 'phrase', category: 'Tap-Gloss Konteks', visual_hint: '🔍' },
  { id: 'lx_qra_muradif', ar_vocalized: 'مُرَادِفُ الكَلِمَةِ', ar_plain: 'مرادف الكلمة', translit: 'murādifu l-kalimah', gloss_id: 'kata yang sepadan maknanya (sinonim)', owner_island: 'QRA', level: 2, skill_id: 'QRA-L2-04', pos: 'phrase', category: 'Tap-Gloss Konteks', visual_hint: '🔄' },
  { id: 'lx_qra_didd', ar_vocalized: 'ضِدُّ الكَلِمَةِ فِي المَعْنَى', ar_plain: 'ضد الكلمة في المعنى', translit: 'ḍiddu l-kalimati fī l-maʿnā', gloss_id: 'lawan kata / antonim wacana', owner_island: 'QRA', level: 2, skill_id: 'QRA-L2-04', pos: 'phrase', category: 'Tap-Gloss Konteks', visual_hint: '⚖️' },

  // Level 3: Menengah Lanjut (B1) - Fabel, Ide Pokok, Doa Harian, & Surat Warkat
  // QRA-L3-01: Membaca Kisah Fabel & Narasi Hikmah Bertingkat
  { id: 'lx_qra_hikmah', ar_vocalized: 'حِكْمَةٌ بَالِغَةٌ', ar_plain: 'حكمة بالغة', translit: 'ḥikmatun bālighah', gloss_id: 'kebijaksanaan mendalam dan nasihat luhur', owner_island: 'QRA', level: 3, skill_id: 'QRA-L3-01', pos: 'phrase', category: 'Fabel & Hikmah', visual_hint: '💡' },
  { id: 'lx_qra_namlah', ar_vocalized: 'نَمْلَةٌ نَشِيطَةٌ وَمُجِدَّةٌ', ar_plain: 'نملة نشيطة ومجدة', translit: 'namlatun nasyīṭatun wa-mujiddah', gloss_id: 'semut pekerja keras yang pantang menyerah', owner_island: 'QRA', level: 3, skill_id: 'QRA-L3-01', pos: 'phrase', category: 'Fabel & Hikmah', visual_hint: '🐜' },
  { id: 'lx_qra_hamaamah', ar_vocalized: 'حَمَامَةٌ بَيْضَاءُ وَفِيَّةٌ', ar_plain: 'حمامة بيضاء وفية', translit: 'ḥamāmatun bayḍāʾu wafiyyah', gloss_id: 'burung merpati putih yang berhati mulia', owner_island: 'QRA', level: 3, skill_id: 'QRA-L3-01', pos: 'phrase', category: 'Fabel & Hikmah', visual_hint: '🕊️' },
  { id: 'lx_qra_tasaada', ar_vocalized: 'تَعَاوَنَا عَلَى فِعْلِ الخَيْرِ', ar_plain: 'تعاونا على فعل الخير', translit: 'taʿāwanā ʿalā fiʿli l-khayr', gloss_id: 'keduanya saling tolong-menolong dalam kebajikan', owner_island: 'QRA', level: 3, skill_id: 'QRA-L3-01', pos: 'phrase', category: 'Fabel & Hikmah', visual_hint: '🤝' },

  // QRA-L3-02: Menemukan Ide Pokok & Fakta Utama Paragraf
  { id: 'lx_qra_fikrah_raeesah', ar_vocalized: 'الفِكْرَةُ الرَّئِيسَةُ لِلْفِقْرَةِ', ar_plain: 'الفكرة الرئيسة للفقرة', translit: 'al-fikratu r-raʾīsatu li-l-fiqrah', gloss_id: 'gagasan utama / ide pokok dari sebuah paragraf', owner_island: 'QRA', level: 3, skill_id: 'QRA-L3-02', pos: 'phrase', category: 'Pemahaman Wacana', visual_hint: '🎯' },
  { id: 'lx_qra_haqiqah_ilmiyyah', ar_vocalized: 'حَقِيقَةٌ عِلْمِيَّةٌ ثَابِتَةٌ', ar_plain: 'حقيقة علمية ثابتة', translit: 'ḥaqīqatun ʿilmiyyatun thābitah', gloss_id: 'fakta ilmiah yang ditegaskan dalam teks', owner_island: 'QRA', level: 3, skill_id: 'QRA-L3-02', pos: 'phrase', category: 'Pemahaman Wacana', visual_hint: '🔬' },
  { id: 'lx_qra_natijah_bahth', ar_vocalized: 'خُلَاصَةُ النَّصِّ المُفِيدَةُ', ar_plain: 'خلاصة النص المفيدة', translit: 'khulāṣatu n-naṣṣi l-mufīdah', gloss_id: 'kesimpulan inti sari dari naskah bacaan', owner_island: 'QRA', level: 3, skill_id: 'QRA-L3-02', pos: 'phrase', category: 'Pemahaman Wacana', visual_hint: '📋' },
  { id: 'lx_qra_dalil_nass', ar_vocalized: 'دَلِيلٌ وَاضِحٌ مِنَ السِّيَاقِ', ar_plain: 'دليل واضح من السياق', translit: 'dalīlun wāḍiḥun mina s-siyāq', gloss_id: 'bukti rujukan faktual yang tertera di teks', owner_island: 'QRA', level: 3, skill_id: 'QRA-L3-02', pos: 'phrase', category: 'Pemahaman Wacana', visual_hint: '📌' },

  // QRA-L3-03: Membaca Doa Harian & Dzikir Pilihan
  { id: 'lx_qra_dua_thoom', ar_vocalized: 'بِسْمِ اللَّهِ وَعَلَى بَرَكَةِ اللَّهِ', ar_plain: 'بسم الله وعلى بركة الله', translit: 'bismi Llāh wa-ʿalā barakati Llāh', gloss_id: 'doa makan: dengan menyebut asma Allah dan berkah-Nya', owner_island: 'QRA', level: 3, skill_id: 'QRA-L3-03', pos: 'phrase', category: 'Doa & Dzikir', visual_hint: '🤲' },
  { id: 'lx_qra_dua_nawm', ar_vocalized: 'بِاسْمِكَ اللَّهُمَّ أَحْيَا وَأَمُوتُ', ar_plain: 'باسمك اللهم أحيا وأموت', translit: 'bi-smika Llāhumma aḥyā wa-amūt', gloss_id: 'doa menjelang tidur malam dengan penyerahan diri', owner_island: 'QRA', level: 3, skill_id: 'QRA-L3-03', pos: 'phrase', category: 'Doa & Dzikir', visual_hint: '🌙' },
  { id: 'lx_qra_dua_istayqaza', ar_vocalized: 'الحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا', ar_plain: 'الحمد لله الذي أحيانا', translit: 'al-ḥamdu li-Llāhi lladzī aḥyānā', gloss_id: 'doa bangun tidur: segala puji bagi Allah yang menghidupkan', owner_island: 'QRA', level: 3, skill_id: 'QRA-L3-03', pos: 'phrase', category: 'Doa & Dzikir', visual_hint: '🌅' },
  { id: 'lx_qra_rabbana_atina', ar_vocalized: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً', ar_plain: 'ربنا آتنا في الدنيا حسنة', translit: 'rabbanā ātinā fī d-dunyā ḥasanah', gloss_id: 'wahai Tuhan kami, anugerahilah kami kebaikan di dunia', owner_island: 'QRA', level: 3, skill_id: 'QRA-L3-03', pos: 'phrase', category: 'Doa & Dzikir', visual_hint: '🕌' },

  // QRA-L3-04: Membaca Surat Sahabat & Kartu Pos Hudhud
  { id: 'lx_qra_risalah', ar_vocalized: 'رِسَالَةُ مَوَدَّةٍ وَإِخَاءٍ', ar_plain: 'رسالة مودة وإخاء', translit: 'risālatu mawaddatin wa-ikhāʾ', gloss_id: 'surat warkat cinta dan tali persaudaraan', owner_island: 'QRA', level: 3, skill_id: 'QRA-L3-04', pos: 'phrase', category: 'Korespondensi', visual_hint: '✉️' },
  { id: 'lx_qra_bitaqah_barid', ar_vocalized: 'بِطَاقَةٌ بَرِيدِيَّةٌ مُلَوَّنَةٌ', ar_plain: 'بطاقة بريدية ملونة', translit: 'biṭāqatun barīdiyyatun mulawwanah', gloss_id: 'kartu pos berseri dari pengembaraan Hudhud', owner_island: 'QRA', level: 3, skill_id: 'QRA-L3-04', pos: 'phrase', category: 'Korespondensi', visual_hint: '📮' },
  { id: 'lx_qra_tahiyyah_tayyibah', ar_vocalized: 'تَحِيَّةً طَيِّبَةً وَبَعْدُ', ar_plain: 'تحية طيبة وبعد', translit: 'taḥiyyatan ṭayyibatan wa-baʿd', gloss_id: 'salam penghormatan hangat pembuka warkat', owner_island: 'QRA', level: 3, skill_id: 'QRA-L3-04', pos: 'phrase', category: 'Korespondensi', visual_hint: '🖋️' },
  { id: 'lx_qra_dimtum_bikhayr', ar_vocalized: 'دُمْتُمْ فِي رِعَايَةِ اللَّهِ وَحِفْظِهِ', ar_plain: 'دمتم في رعاية الله وحفظه', translit: 'dumtum fī riʿāyati Llāhi wa-ḥifẓih', gloss_id: 'semoga engkau senantiasa dalam perlindungan Allah', owner_island: 'QRA', level: 3, skill_id: 'QRA-L3-04', pos: 'phrase', category: 'Korespondensi', visual_hint: '🕊️' },

  // Level 4: Mahir Awal (B2) - Gundul Parsial, Artikel Pengetahuan, & Jamak Taksir
  // QRA-L4-01: Membaca Teks Sebagian Tanpa Harakat (Teks Gundul Parsial)
  { id: 'lx_qra_tariq_najah', ar_vocalized: 'طَرِيقُ النَّجَاحِ يَبْدَأُ بِخُطْوَةٍ', ar_plain: 'طريق النجاح يبدأ بخطوة', translit: 'ṭarīqu n-najāḥi yabdaʾu bi-khuṭwah', gloss_id: 'jalan kesuksesan senantiasa diawali oleh satu langkah tekun', owner_island: 'QRA', level: 4, skill_id: 'QRA-L4-01', pos: 'phrase', category: 'Gundul Parsial', visual_hint: '🪜' },
  { id: 'lx_qra_alilmu_nur', ar_vocalized: 'العِلْمُ نُورٌ يَهْدِي العُقُولَ', ar_plain: 'العلم نور يهدي العقول', translit: 'al-ʿilmu nūrun yahdī l-ʿuqūl', gloss_id: 'ilmu pengetahuan adalah cahaya pemandu akal budi', owner_island: 'QRA', level: 4, skill_id: 'QRA-L4-01', pos: 'phrase', category: 'Gundul Parsial', visual_hint: '💡' },
  { id: 'lx_qra_alijtihad_asasi', ar_vocalized: 'الاِجْتِهَادُ أَسَاسُ التَّفَوُّقِ', ar_plain: 'الاجتهاد أساس التفوق', translit: 'al-ijtihādu asāsu t-tafawwuq', gloss_id: 'kesungguhan belajar adalah pondasi keunggulan prestasi', owner_island: 'QRA', level: 4, skill_id: 'QRA-L4-01', pos: 'phrase', category: 'Gundul Parsial', visual_hint: '🏆' },
  { id: 'lx_qra_alakhlaq_karimah', ar_vocalized: 'الأَخْلَاقُ الكَرِيمَةُ تَاجُ الإِنْسَانِ', ar_plain: 'الأخلاق الكريمة تاج الإنسان', translit: 'al-akhlāqu l-karīmatu tāju l-insān', gloss_id: 'akhlak budi pekerti mulia adalah mahkota sejati insan', owner_island: 'QRA', level: 4, skill_id: 'QRA-L4-01', pos: 'phrase', category: 'Gundul Parsial', visual_hint: '👑' },

  // QRA-L4-02: Membaca Teks Informatif & Artikel Pengetahuan Islam
  { id: 'lx_qra_baytul_hikmah', ar_vocalized: 'بَيْتُ الحِكْمَةِ فِي بَغْدَادَ', ar_plain: 'بيت الحكمة في بغداد', translit: 'baytu l-ḥikmati fī Baghdād', gloss_id: 'Baitul Hikmah di Baghdad: mercusuar penerjemahan sains Islam', owner_island: 'QRA', level: 4, skill_id: 'QRA-L4-02', pos: 'phrase', category: 'Artikel Pengetahuan', visual_hint: '🏛️' },
  { id: 'lx_qra_ikhtira_qalam', ar_vocalized: 'صِنَاعَةُ الوَرَقِ وَانْتِشَارُ الكُتُبِ', ar_plain: 'صناعة الورق وانتشار الكتب', translit: 'ṣināʿatu l-waraqi wa-ntisyāru l-kutub', gloss_id: 'industri kertas dan pesatnya penyebaran manuskrip', owner_island: 'QRA', level: 4, skill_id: 'QRA-L4-02', pos: 'phrase', category: 'Artikel Pengetahuan', visual_hint: '📜' },
  { id: 'lx_qra_ilm_falak', ar_vocalized: 'عِلْمُ الفَلَكِ وَمَرَاصِدُ النُّجُومِ', ar_plain: 'علم الفلك ومراصد النجوم', translit: 'ʿilmu l-falaki wa-marāṣidu n-nujūm', gloss_id: 'ilmu astronomi dan observatorium perbintangan', owner_island: 'QRA', level: 4, skill_id: 'QRA-L4-02', pos: 'phrase', category: 'Artikel Pengetahuan', visual_hint: '🔭' },
  { id: 'lx_qra_tibb_arabi', ar_vocalized: 'كِتَابُ القَانُونِ فِي الطِّبِّ لاِبْنِ سِينَا', ar_plain: 'كتاب القانون في الطب لابن سينا', translit: 'kitābu l-qānūni fī ṭ-ṭibbi li-bni Sīnā', gloss_id: 'masterpiece kedokteran klasik karya Ibnu Sina', owner_island: 'QRA', level: 4, skill_id: 'QRA-L4-02', pos: 'phrase', category: 'Artikel Pengetahuan', visual_hint: '🩺' },

  // QRA-L4-03: Menganalisis Kosakata Jamak Taksir & Sinonim (Taraduf)
  { id: 'lx_qra_kutub', ar_vocalized: 'كُتُبٌ قَيِّمَةٌ وَنَفِيسَةٌ', ar_plain: 'كتب قيمة ونفيسة', translit: 'kutubun qayyimatun wa-nafīsah', gloss_id: 'buku-buku berharga (jamak taksir dari كِتَاب)', owner_island: 'QRA', level: 4, skill_id: 'QRA-L4-03', pos: 'phrase', category: 'Jamak & Sinonim', visual_hint: '📚' },
  { id: 'lx_qra_ulama', ar_vocalized: 'عُلَمَاءُ بَارِزُونَ فِي التَّارِيخِ', ar_plain: 'علماء بارزون في التاريخ', translit: 'ʿulamāʾu bārizūna fī t-tārīkh', gloss_id: 'para ulama dan ilmuwan terkemuka (jamak dari عَالِم)', owner_island: 'QRA', level: 4, skill_id: 'QRA-L4-03', pos: 'phrase', category: 'Jamak & Sinonim', visual_hint: '🎓' },
  { id: 'lx_qra_ashjar', ar_vocalized: 'أَشْجَارٌ بَاسِقَةٌ وَمُثْمِرَةٌ', ar_plain: 'أشجار باسقة ومثمرة', translit: 'asyjārun bāsiqatun wa-muthmirah', gloss_id: 'pepohonan rimbun yang lebat buahnya (jamak dari شَجَرَة)', owner_island: 'QRA', level: 4, skill_id: 'QRA-L4-03', pos: 'phrase', category: 'Jamak & Sinonim', visual_hint: '🌲' },
  { id: 'lx_qra_abwaab', ar_vocalized: 'أَبْوَابُ المَعْرِفَةِ مَفْتُوحَةٌ', ar_plain: 'أبواب المعرفة مفتوحة', translit: 'abwābu l-maʿrifati maftūḥah', gloss_id: 'pintu-pintu pengetahuan terbuka lebar (jamak dari بَاب)', owner_island: 'QRA', level: 4, skill_id: 'QRA-L4-03', pos: 'phrase', category: 'Jamak & Sinonim', visual_hint: '🚪' },

  // Level 5: Mahir Lanjut (C1) - Turats Tanpa Harakat, Esai Kontemporer, & Syi'ir Mahfuzhat
  // QRA-L5-01: Membaca Teks Klasik / Turats Singkat Tanpa Harakat
  { id: 'lx_qra_muqaddimah_ibn_khaldun', ar_vocalized: 'مُقَدِّمَةُ ابْنِ خَلْدُونَ فِي العُمْرَانِ', ar_plain: 'مقدمة ابن خلدون في العمران', translit: 'muqaddimatu bni Khaldūn fī l-ʿumrān', gloss_id: 'Muqaddimah Ibnu Khaldun tentang sosiologi peradaban manusia', owner_island: 'QRA', level: 5, skill_id: 'QRA-L5-01', pos: 'phrase', category: 'Turats Klasik', visual_hint: '📜' },
  { id: 'lx_qra_adab_almuallimin', ar_vocalized: 'أَدَبُ العَالِمِ وَالمُتَعَلِّمِ', ar_plain: 'أدب العالم والمتعلم', translit: 'adabu l-ʿālimi wa-l-mutaʿallim', gloss_id: 'etika mulia hubungan pendidik dan penuntut ilmu', owner_island: 'QRA', level: 5, skill_id: 'QRA-L5-01', pos: 'phrase', category: 'Turats Klasik', visual_hint: '📖' },
  { id: 'lx_qra_fadlul_ilm', ar_vocalized: 'فَضْلُ العِلْمِ الشَّرِيفِ عَلَى المَالِ', ar_plain: 'فضل العلم الشريف على المال', translit: 'faḍlu l-ʿilmi sy-syarīfi ʿalā l-māl', gloss_id: 'keutamaan luhur ilmu pengetahuan di atas limpahan harta', owner_island: 'QRA', level: 5, skill_id: 'QRA-L5-01', pos: 'phrase', category: 'Turats Klasik', visual_hint: '💎' },
  { id: 'lx_qra_albalaghah_fasahah', ar_vocalized: 'البَلَاغَةُ مُطَابَقَةُ الكَلَامِ لِمُقْتَضَى الحَالِ', ar_plain: 'البلاغة مطابقة الكلام لمقتضى الحال', translit: 'al-balāghatu muṭābaqatu l-kalāmi li-muqtaḍā l-ḥāl', gloss_id: 'hakikat balaghah: keselarasan tutur kata dengan konteks khalayak', owner_island: 'QRA', level: 5, skill_id: 'QRA-L5-01', pos: 'phrase', category: 'Turats Klasik', visual_hint: '🖋️' },

  // QRA-L5-02: Membaca Wacana Opini, Artikel Berita & Esai Kontemporer
  { id: 'lx_qra_maqal_sahafi', ar_vocalized: 'مَقَالٌ صَحَفِيٌّ تَحْلِيلِيٌّ دَقِيقٌ', ar_plain: 'مقال صحفي تحليلي دقيق', translit: 'maqālun ṣaḥafiyyun taḥlīliyyun daqīq', gloss_id: 'artikel opini analisis jurnalistik kontemporer', owner_island: 'QRA', level: 5, skill_id: 'QRA-L5-02', pos: 'phrase', category: 'Artikel & Esai', visual_hint: '📰' },
  { id: 'lx_qra_alittihad_duwali', ar_vocalized: 'التَّضَامُنُ الدَّوْلِيُّ بَيْنَ الشُّعُوبِ', ar_plain: 'التضامن الدولي بين الشعوب', translit: 'at-taḍāmunu d-duwaliyyu bayna sy-syuʿūb', gloss_id: 'solidaritas internasional dan persaudaraan antar bangsa', owner_island: 'QRA', level: 5, skill_id: 'QRA-L5-02', pos: 'phrase', category: 'Artikel & Esai', visual_hint: '🌍' },
  { id: 'lx_qra_attatawwur_tiknuluji', ar_vocalized: 'التَّطَوُّرُ التِّكْنُولُوجِيُّ وَالذَّكَاءُ الاصْطِنَاعِيُّ', ar_plain: 'التطور التكنولوجي والذكاء الاصطناعي', translit: 'at-taṭawwuru t-tiknūlūjiyyu wa-dh-dhakāʾu l-iṣṭināʿiyy', gloss_id: 'kemajuan teknologi kecerdasan buatan dalam peradaban modern', owner_island: 'QRA', level: 5, skill_id: 'QRA-L5-02', pos: 'phrase', category: 'Artikel & Esai', visual_hint: '🤖' },
  { id: 'lx_qra_himayatul_biah', ar_vocalized: 'حِمَايَةُ البِيئَةِ وَالمَوَارِدِ الطَّبِيعِيَّةِ', ar_plain: 'حماية البيئة والموارد الطبيعية', translit: 'ḥimāyatu l-bīʾati wa-l-mawāridi ṭ-ṭabīʿiyyah', gloss_id: 'pelestarian lingkungan hidup dan kekayaan alam semesta', owner_island: 'QRA', level: 5, skill_id: 'QRA-L5-02', pos: 'phrase', category: 'Artikel & Esai', visual_hint: '🌱' },

  // QRA-L5-03: Membaca Puisi Hikmah (Syi'ir Arab Mahfuzhat)
  { id: 'lx_qra_shiir', ar_vocalized: 'شِعْرٌ تَعْلِيمِيٌّ بَلِيغٌ', ar_plain: 'شعر تعليمي بليغ', translit: 'syiʿrun taʿlīmiyyun balīgh', gloss_id: 'bait syair sastra yang sarat kebijaksanaan hidup', owner_island: 'QRA', level: 5, skill_id: 'QRA-L5-03', pos: 'phrase', category: 'Sastra & Mahfuzhat', visual_hint: '📜' },
  { id: 'lx_qra_qawl_shafii', ar_vocalized: 'تَعَلَّمْ فَلَيْسَ المَرْءُ يُولَدُ عَالِمًا', ar_plain: 'تعلم فليس المرء يولد عالما', translit: 'taʿallam fa-laysa l-marʾu yūladu ʿālimā', gloss_id: 'belajarlah, sebab tidak ada insan yang terlahir langsung alim', owner_island: 'QRA', level: 5, skill_id: 'QRA-L5-03', pos: 'phrase', category: 'Sastra & Mahfuzhat', visual_hint: '🎓' },
  { id: 'lx_qra_man_jadda', ar_vocalized: 'مَنْ جَدَّ وَجَدَ، وَمَنْ زَرَعَ حَصَدَ', ar_plain: 'من جد وجد ومن زرع حصد', translit: 'man jadda wajada, wa-man zaraʿa ḥaṣad', gloss_id: 'siapa bersungguh pasti berhasil, siapa menanam akan menuai', owner_island: 'QRA', level: 5, skill_id: 'QRA-L5-03', pos: 'phrase', category: 'Sastra & Mahfuzhat', visual_hint: '🌾' },
  { id: 'lx_qra_alwaqt_kassaif', ar_vocalized: 'الوَقْتُ كَالسَّيْفِ إِنْ لَمْ تَقْطَعْهُ قَطَعَكَ', ar_plain: 'الوقت كالسيف إن لم تقطعه قطعك', translit: 'al-waqtu ka-s-sayfi in lam taqṭaʿhu qaṭaʿak', gloss_id: 'waktu laksana pedang, bila tak engkau tebas maka ia menebasmu', owner_island: 'QRA', level: 5, skill_id: 'QRA-L5-03', pos: 'phrase', category: 'Sastra & Mahfuzhat', visual_hint: '⚔️' },

  // --- KTB (Pelabuhan Kitabah - 30 Kosakata Bertingkat Sesuai 16 Skill) ---
  // Level 0: Pemula (Tamhidi)
  { id: 'lx_ktb_bab', ar_vocalized: 'بَابٌ', ar_plain: 'باب', translit: 'bābun', gloss_id: 'pintu (huruf alif pemutus kiri)', owner_island: 'KTB', level: 0, skill_id: 'KTB-L0-01', pos: 'isim', category: 'Pemutus Kiri', visual_hint: '🚪' },
  { id: 'lx_ktb_darasa', ar_vocalized: 'دَرَسَ', ar_plain: 'درس', translit: 'darasa', gloss_id: 'belajar (dal dan ra pemutus kiri)', owner_island: 'KTB', level: 0, skill_id: 'KTB-L0-01', pos: 'fiil', category: 'Pemutus Kiri', visual_hint: '📖' },
  { id: 'lx_ktb_ward', ar_vocalized: 'وَرْدٌ', ar_plain: 'ورد', translit: 'wardun', gloss_id: 'bunga mawar (waw dan ra pemutus kiri)', owner_island: 'KTB', level: 0, skill_id: 'KTB-L0-01', pos: 'isim', category: 'Pemutus Kiri', visual_hint: '🌹' },
  { id: 'lx_ktb_ba_awal', ar_vocalized: 'بِـ', ar_plain: 'بـ', translit: 'bi-', gloss_id: 'huruf ba di awal kata sambung', owner_island: 'KTB', level: 0, skill_id: 'KTB-L0-02', pos: 'huruf', category: 'Bentuk Sambung', visual_hint: 'بـ' },
  { id: 'lx_ktb_jim_wasath', ar_vocalized: 'ـجـ', ar_plain: 'ـجـ', translit: '-j-', gloss_id: 'huruf jim di tengah kata sambung', owner_island: 'KTB', level: 0, skill_id: 'KTB-L0-02', pos: 'huruf', category: 'Bentuk Sambung', visual_hint: 'ـجـ' },
  { id: 'lx_ktb_mim_akhir', ar_vocalized: 'ـم', ar_plain: 'ـم', translit: '-m', gloss_id: 'huruf mim di akhir kata sambung', owner_island: 'KTB', level: 0, skill_id: 'KTB-L0-02', pos: 'huruf', category: 'Bentuk Sambung', visual_hint: 'ـم' },
  { id: 'lx_ktb_sin_gigi', ar_vocalized: 'أَسْنَانُ السِّينِ', ar_plain: 'أسنان السين', translit: 'asnānu s-sīn', gloss_id: 'tiga gerigi huruf sin khath naskh', owner_island: 'KTB', level: 0, skill_id: 'KTB-L0-03', pos: 'phrase', category: 'Khath Naskh', visual_hint: '✍️' },
  { id: 'lx_ktb_shod_kasa', ar_vocalized: 'كَأْسُ الصَّادِ', ar_plain: 'كأس الصاد', translit: 'kaʾsu ṣ-ṣād', gloss_id: 'mangkok lekukan huruf shad naskh', owner_island: 'KTB', level: 0, skill_id: 'KTB-L0-03', pos: 'phrase', category: 'Khath Naskh', visual_hint: '🖋️' },

  // Level 1: Dasar (Mubtadi')
  { id: 'lx_ktb_madrasah', ar_vocalized: 'مَدْرَسَةٌ', ar_plain: 'مدرسة', translit: 'madrasatun', gloss_id: 'sekolah (ta marbuthah ـة berbunyi h saat waqaf)', owner_island: 'KTB', level: 1, skill_id: 'KTB-L1-01', pos: 'isim', category: 'Ta Marbuthah', visual_hint: '🏫' },
  { id: 'lx_ktb_bint', ar_vocalized: 'بِنْتٌ', ar_plain: 'بنت', translit: 'bintun', gloss_id: 'anak perempuan (ta maftuhah ت tetap t saat waqaf)', owner_island: 'KTB', level: 1, skill_id: 'KTB-L1-01', pos: 'isim', category: 'Ta Maftuhah', visual_hint: '👧' },
  { id: 'lx_ktb_kitabuhu', ar_vocalized: 'كِتَابُهُ', ar_plain: 'كتابه', translit: 'kitābuhu', gloss_id: 'bukunya (ha dhamir kata ganti tanpa titik)', owner_island: 'KTB', level: 1, skill_id: 'KTB-L1-01', pos: 'isim', category: 'Ha Dhamir', visual_hint: '📘' },
  { id: 'lx_ktb_al_qalam', ar_vocalized: 'القَلَمُ', ar_plain: 'القلم', translit: 'al-qalamu', gloss_id: 'pena (alif lam qamariyyah sukun jelas)', owner_island: 'KTB', level: 1, skill_id: 'KTB-L1-02', pos: 'isim', category: 'Alif Lam Qamariyyah', visual_hint: '🖊️' },
  { id: 'lx_ktb_asy_syams', ar_vocalized: 'الشَّمْسُ', ar_plain: 'الشمس', translit: 'asy-syamsu', gloss_id: 'matahari (alif lam syamsiyyah tasydid)', owner_island: 'KTB', level: 1, skill_id: 'KTB-L1-02', pos: 'isim', category: 'Alif Lam Syamsiyyah', visual_hint: '☀️' },
  { id: 'lx_ktb_kitaban', ar_vocalized: 'كِتَابًا', ar_plain: 'كتابا', translit: 'kitāban', gloss_id: 'sebuah buku (tanwin fathatain butuh alif penopang)', owner_island: 'KTB', level: 1, skill_id: 'KTB-L1-03', pos: 'isim', category: 'Tanwin Fathatain', visual_hint: '📚' },
  { id: 'lx_ktb_madrasatan', ar_vocalized: 'مَدْرَسَةً', ar_plain: 'مدرسة', translit: 'madrasatan', gloss_id: 'gedung sekolah (tanwin fathatain tanpa alif pada ta marbuthah)', owner_island: 'KTB', level: 1, skill_id: 'KTB-L1-03', pos: 'isim', category: 'Tanwin Fathatain', visual_hint: '🏫' },
  { id: 'lx_ktb_maan', ar_vocalized: 'مَاءً', ar_plain: 'ماء', translit: 'māʾan', gloss_id: 'air segar (tanwin fathatain tanpa alif setelah hamzah mad)', owner_island: 'KTB', level: 1, skill_id: 'KTB-L1-03', pos: 'isim', category: 'Tanwin Fathatain', visual_hint: '💧' },

  // Level 2: Menengah (Asasi)
  { id: 'lx_ktb_akrama', ar_vocalized: 'أَكْرَمَ', ar_plain: 'أكرم', translit: 'akrama', gloss_id: 'memuliakan (hamzah qath\' kepala ain selalu dibaca: wa-akrama)', owner_island: 'KTB', level: 2, skill_id: 'KTB-L2-01', pos: 'fiil', category: 'Hamzah Qath\'', visual_hint: '🤝' },
  { id: 'lx_ktb_ism', ar_vocalized: 'اِسْمٌ', ar_plain: 'اسم', translit: 'ismun', gloss_id: 'nama (hamzah washal lebur saat disambung: wasmu)', owner_island: 'KTB', level: 2, skill_id: 'KTB-L2-01', pos: 'isim', category: 'Hamzah Washal', visual_hint: '🏷️' },
  { id: 'lx_ktb_qaraa', ar_vocalized: 'قَرَأَ', ar_plain: 'قرأ', translit: 'qaraʾa', gloss_id: 'membaca (hamzah akhir di atas alif karena huruf sebelumnya fathah)', owner_island: 'KTB', level: 2, skill_id: 'KTB-L2-02', pos: 'fiil', category: 'Hamzah Akhir', visual_hint: '📖' },
  { id: 'lx_ktb_shathi', ar_vocalized: 'شَاطِئٌ', ar_plain: 'شاطئ', translit: 'syāṭiʾun', gloss_id: 'pantai pelabuhan (hamzah akhir di atas ya karena sebelumnya kasrah)', owner_island: 'KTB', level: 2, skill_id: 'KTB-L2-02', pos: 'isim', category: 'Hamzah Akhir', visual_hint: '🏖️' },
  { id: 'lx_ktb_tabathu', ar_vocalized: 'تَبَاطُؤٌ', ar_plain: 'تباطؤ', translit: 'tabāṭuʾun', gloss_id: 'keterlambatan (hamzah akhir di atas wawu karena sebelumnya dhammah)', owner_island: 'KTB', level: 2, skill_id: 'KTB-L2-02', pos: 'isim', category: 'Hamzah Akhir', visual_hint: '⏳' },
  { id: 'lx_ktb_maa', ar_vocalized: 'مَاءٌ', ar_plain: 'ماء', translit: 'māʾun', gloss_id: 'air tawar (hamzah mutatharrifah di atas garis setelah mad)', owner_island: 'KTB', level: 2, skill_id: 'KTB-L2-02', pos: 'isim', category: 'Hamzah Akhir', visual_hint: '💧' },
  { id: 'lx_ktb_id_mubarak', ar_vocalized: 'عِيدٌ مُبَارَكٌ', ar_plain: 'عيد مبارك', translit: 'ʿīdun mubārak', gloss_id: 'selamat hari raya berkah (tahni\'ah kartu pos)', owner_island: 'KTB', level: 2, skill_id: 'KTB-L2-03', pos: 'phrase', category: 'Kartu Pos Sahabat', visual_hint: '🎉' },
  { id: 'lx_ktb_shukran', ar_vocalized: 'شُكْرًا جَزِيلًا', ar_plain: 'شكرا جزيلا', translit: 'syukran jazīlan', gloss_id: 'terima kasih banyak kepadamu (korespondensi)', owner_island: 'KTB', level: 2, skill_id: 'KTB-L2-03', pos: 'phrase', category: 'Kartu Pos Sahabat', visual_hint: '💌' },

  // Level 3: Lanjutan (Mutawassith)
  { id: 'lx_ktb_tarqim_fasila', ar_vocalized: 'فَاصِلَة (،)', ar_plain: 'فاصلة', translit: 'fāṣilah', gloss_id: 'tanda baca koma Arab terbalik (،)', owner_island: 'KTB', level: 3, skill_id: 'KTB-L3-01', pos: 'isim', category: 'Tanda Baca Tarqim', visual_hint: '،' },
  { id: 'lx_ktb_istifham', ar_vocalized: 'عَلَامَةُ الِاسْتِفْهَامِ (؟)', ar_plain: 'علامة الاستفهام', translit: 'ʿalāmatu l-istifhām', gloss_id: 'tanda tanya Arab hadap kiri (؟)', owner_island: 'KTB', level: 3, skill_id: 'KTB-L3-01', pos: 'isim', category: 'Tanda Baca Tarqim', visual_hint: '؟' },
  { id: 'lx_ktb_huda', ar_vocalized: 'هُدًى', ar_plain: 'هدى', translit: 'hudan', gloss_id: 'petunjuk lurus (alif maqshurah bengkok ya tanpa titik)', owner_island: 'KTB', level: 3, skill_id: 'KTB-L3-02', pos: 'isim', category: 'Alif Layyinah', visual_hint: '🧭' },
  { id: 'lx_ktb_asa', ar_vocalized: 'عَصَا', ar_plain: 'عصا', translit: 'ʿaṣā', gloss_id: 'tongkat penuntun (alif mamdudah tegak asal wawu)', owner_island: 'KTB', level: 3, skill_id: 'KTB-L3-02', pos: 'isim', category: 'Alif Layyinah', visual_hint: '🦯' },
  { id: 'lx_ktb_daa', ar_vocalized: 'دَعَا', ar_plain: 'دعا', translit: 'daʿā', gloss_id: 'berdoa memohon (alif mamdudah tegak karena mudhari yad\'u)', owner_island: 'KTB', level: 3, skill_id: 'KTB-L3-02', pos: 'fiil', category: 'Alif Layyinah', visual_hint: '🤲' },
  { id: 'lx_ktb_qirthas', ar_vocalized: 'قِرْطَاسٌ', ar_plain: 'قرطاس', translit: 'qirṭāsun', gloss_id: 'kertas perkamen naskah mercusuar pelabuhan', owner_island: 'KTB', level: 3, skill_id: 'KTB-L3-03', pos: 'isim', category: 'Alat Tulis Naskah', visual_hint: '📄' },

  // Level 4: Mandiri (Mutaqaddim)
  { id: 'lx_ktb_bier', ar_vocalized: 'بِئْرٌ', ar_plain: 'بئر', translit: 'biʾrun', gloss_id: 'sumur air (hamzah tengah di atas nabrah karena kasrah terkuat)', owner_island: 'KTB', level: 4, skill_id: 'KTB-L4-01', pos: 'isim', category: 'Hamzah Mutawassithah', visual_hint: '🪣' },
  { id: 'lx_ktb_mumin', ar_vocalized: 'مُؤْمِنٌ', ar_plain: 'مؤمن', translit: 'muʾminun', gloss_id: 'orang beriman (hamzah tengah di atas wawu karena dhammah menang dari sukun)', owner_island: 'KTB', level: 4, skill_id: 'KTB-L4-01', pos: 'isim', category: 'Hamzah Mutawassithah', visual_hint: '🕌' },
  { id: 'lx_ktb_saala', ar_vocalized: 'سَأَلَ', ar_plain: 'سأل', translit: 'saʾala', gloss_id: 'ia bertanya (hamzah tengah di atas alif karena fathah vs fathah)', owner_island: 'KTB', level: 4, skill_id: 'KTB-L4-01', pos: 'fiil', category: 'Hamzah Mutawassithah', visual_hint: '❓' },
  { id: 'lx_ktb_raas', ar_vocalized: 'رَأْسٌ', ar_plain: 'رأس', translit: 'raʾsun', gloss_id: 'kepala (hamzah tengah sukun di atas alif setelah fathah)', owner_island: 'KTB', level: 4, skill_id: 'KTB-L4-01', pos: 'isim', category: 'Hamzah Mutawassithah', visual_hint: '👤' },
  { id: 'lx_ktb_katabu', ar_vocalized: 'كَتَبُوا', ar_plain: 'كتبوا', translit: 'katabū', gloss_id: 'mereka telah menulis (alif fariqah zaidah setelah wawu jamaah)', owner_island: 'KTB', level: 4, skill_id: 'KTB-L4-02', pos: 'fiil', category: 'Huruf Zaidah', visual_hint: '👥' },
  { id: 'lx_ktb_amr', ar_vocalized: 'عَمْرٌو', ar_plain: 'عمرو', translit: 'ʿamr', gloss_id: 'Amr (wawu zaidah pembeda dari Umar)', owner_island: 'KTB', level: 4, skill_id: 'KTB-L4-02', pos: 'isim', category: 'Huruf Zaidah', visual_hint: '🏷️' },
  { id: 'lx_ktb_hadha', ar_vocalized: 'هٰذَا', ar_plain: 'هذا', translit: 'hādhā', gloss_id: 'ini (alif mad dihapus dalam tulisan / mahdzufah)', owner_island: 'KTB', level: 4, skill_id: 'KTB-L4-03', pos: 'isim', category: 'Huruf Mahdzufah', visual_hint: '👉' },
  { id: 'lx_ktb_dhalika', ar_vocalized: 'ذٰلِكَ', ar_plain: 'ذلك', translit: 'dhālika', gloss_id: 'itu (alif mad mahdzufah)', owner_island: 'KTB', level: 4, skill_id: 'KTB-L4-03', pos: 'isim', category: 'Huruf Mahdzufah', visual_hint: '👈' },
  { id: 'lx_ktb_ar_rahman', ar_vocalized: 'الرَّحْمٰن', ar_plain: 'الرحمن', translit: 'ar-raḥmān', gloss_id: 'Maha Pengasih (alif khanjariyyah mahdzufah)', owner_island: 'KTB', level: 4, skill_id: 'KTB-L4-03', pos: 'isim', category: 'Huruf Mahdzufah', visual_hint: '💖' },

  // Level 5: Mahir (Mutamayyiz)
  { id: 'lx_ktb_insya', ar_vocalized: 'إِنْشَاءٌ أَدَبِيٌّ', ar_plain: 'إنشاء أدبي', translit: 'insyāʾun adabiyyun', gloss_id: 'komposisi karangan tulisan indah bersastra', owner_island: 'KTB', level: 5, skill_id: 'KTB-L5-01', pos: 'phrase', category: 'Insya\' Bebas', visual_hint: '📜' },
  { id: 'lx_ktb_diwan', ar_vocalized: 'دِيوَانُ الحِكْمَةِ', ar_plain: 'ديوان الحكمة', translit: 'dīwānu l-ḥikmati', gloss_id: 'kumpulan naskah hikmah klasik pelabuhan mercusuar', owner_island: 'KTB', level: 5, skill_id: 'KTB-L5-01', pos: 'phrase', category: 'Sastra Tulis', visual_hint: '🏛️' },
  { id: 'lx_ktb_imla_ikhtibari', ar_vocalized: 'إِمْلَاءٌ اخْتِبَارِيٌّ', ar_plain: 'إملاء اختباري', translit: 'imlāʾun ikhtibāriyyun', gloss_id: 'dikte evaluasi komprehensif tanpa melihat teks naskah', owner_island: 'KTB', level: 5, skill_id: 'KTB-L5-02', pos: 'phrase', category: 'Imla\' Ikhtibari', visual_hint: '🎓' },
  { id: 'lx_ktb_hikmah_mukmin', ar_vocalized: 'الحِكْمَةُ ضَالَّةُ المُؤْمِنِ', ar_plain: 'الحكمة ضالة المؤمن', translit: 'al-ḥikmatu ḍāllatu l-muʾmin', gloss_id: 'hikmah adalah mutiara milik orang beriman', owner_island: 'KTB', level: 5, skill_id: 'KTB-L5-02', pos: 'phrase', category: 'Hadits & Naskah', visual_hint: '💎' },
  { id: 'lx_ktb_khat_tsuluts', ar_vocalized: 'خَطُّ الثُّلُثِ الجَلِيّ', ar_plain: 'خط الثلث الجلي', translit: 'khaṭṭu th-thuluthi l-jalī', gloss_id: 'seni kaligrafi khath tsuluts megah berharakat lengkap', owner_island: 'KTB', level: 5, skill_id: 'KTB-L5-03', pos: 'phrase', category: 'Kaligrafi Arab', visual_hint: '🖋️' },
  { id: 'lx_ktb_mizan_khat', ar_vocalized: 'مِيزَانُ الحُرُوفِ بِالنِّقَاطِ', ar_plain: 'ميزان الحروف بالنقاط', translit: 'mīzānu l-ḥurūfi bi-n-niqāṭ', gloss_id: 'kaidah timbangan titik pena kaligrafi naskh & tsuluts', owner_island: 'KTB', level: 5, skill_id: 'KTB-L5-03', pos: 'phrase', category: 'Kaligrafi Arab', visual_hint: '📐' },

  // --- KLM (Pulau Kalam - Kosakata Bertingkat Pelafalan, Retorika, Idiom Fusha & Orasi Mimbar L0-L5) ---
  // Level 0: Tamhidi (Pra-A1) - Artikulasi & Makharijul Huruf (KLM-L0-01 s/d KLM-L0-03)
  { id: 'lx_klm_kalam', ar_vocalized: 'كَلَامٌ فَصِيحٌ', ar_plain: 'كلام فصيح', translit: 'kalāmun faṣīḥ', gloss_id: 'tutur kata / ujaran pembicaraan fasih', owner_island: 'KLM', level: 0, skill_id: 'KLM-L0-01', pos: 'phrase', category: 'Lisan & Suara', visual_hint: '💬' },
  { id: 'lx_klm_makhraj', ar_vocalized: 'مَخْرَجُ الحُرُوفِ', ar_plain: 'مخرج الحروف', translit: 'makhraju l-ḥurūfi', gloss_id: 'tempat keluarnya bunyi artikulasi huruf', owner_island: 'KLM', level: 0, skill_id: 'KLM-L0-01', pos: 'phrase', category: 'Artikulasi', visual_hint: '🎯' },
  { id: 'lx_klm_sawt', ar_vocalized: 'صَوْتٌ جَهْرِيٌّ', ar_plain: 'صوت جهري', translit: 'ṣawtun jahriyyun', gloss_id: 'suara pita suara vokal jelas berbobot', owner_island: 'KLM', level: 0, skill_id: 'KLM-L0-01', pos: 'phrase', category: 'Lisan & Suara', visual_hint: '🔊' },
  { id: 'lx_klm_halq', ar_vocalized: 'حَلْقٌ وَمَخْرَجٌ', ar_plain: 'حلق ومخرج', translit: 'ḥalqun wa-makhraj', gloss_id: 'tenggorokan rongga artikulasi 6 huruf', owner_island: 'KLM', level: 0, skill_id: 'KLM-L0-01', pos: 'phrase', category: 'Artikulasi', visual_hint: '🗣️' },
  { id: 'lx_klm_adna_halq', ar_vocalized: 'أَدْنَى الحَلْقِ', ar_plain: 'أدنى الحلق', translit: 'adnā l-ḥalqi', gloss_id: 'tenggorokan atas makhraj kha (خ) dan ghain (غ)', owner_island: 'KLM', level: 0, skill_id: 'KLM-L0-01', pos: 'phrase', category: 'Artikulasi', visual_hint: '🎯' },
  { id: 'lx_klm_nutq', ar_vocalized: 'نُطْقٌ سَلِيمٌ', ar_plain: 'نطق سليم', translit: 'nuṭqun salīm', gloss_id: 'pelafalan huruf berharakat yang benar', owner_island: 'KLM', level: 0, skill_id: 'KLM-L0-02', pos: 'phrase', category: 'Artikulasi', visual_hint: '👄' },
  { id: 'lx_klm_lisan', ar_vocalized: 'لِسَانٌ عَرَبِيٌّ', ar_plain: 'لسان عربي', translit: 'lisānun ʿarabiyyun', gloss_id: 'lidah artikulasi fonetik bahasa Arab murni', owner_island: 'KLM', level: 0, skill_id: 'KLM-L0-02', pos: 'phrase', category: 'Artikulasi', visual_hint: '👅' },
  { id: 'lx_klm_aqsha_lisan', ar_vocalized: 'أَقْصَى اللِّسَانِ', ar_plain: 'أقصى اللسان', translit: 'aqṣā l-lisāni', gloss_id: 'pangkal lidah makhraj huruf qaf (ق) dan kaf (ك)', owner_island: 'KLM', level: 0, skill_id: 'KLM-L0-02', pos: 'phrase', category: 'Artikulasi', visual_hint: '🎯' },
  { id: 'lx_klm_wasath_lisan', ar_vocalized: 'وَسَطُ اللِّسَانِ', ar_plain: 'وسط اللسان', translit: 'wasaṭu l-lisāni', gloss_id: 'tengah lidah artikulasi jim (ج), syin (ش), ya (ي)', owner_island: 'KLM', level: 0, skill_id: 'KLM-L0-02', pos: 'phrase', category: 'Artikulasi', visual_hint: '🎯' },
  { id: 'lx_klm_isti_la', ar_vocalized: 'صَوْتٌ مُفَخَّمٌ', ar_plain: 'صوت مفخم', translit: 'ṣawtun mufakhkham', gloss_id: 'bunyi tebal (isti\'la & ithbaq: ص ض ط ظ)', owner_island: 'KLM', level: 0, skill_id: 'KLM-L0-03', pos: 'phrase', category: 'Huruf Tebal', visual_hint: '📢' },
  { id: 'lx_klm_shafir', ar_vocalized: 'حُرُوفُ الصَّفِيرِ', ar_plain: 'حروف الصفير', translit: 'ḥurūfu ṣ-ṣafīr', gloss_id: 'desis tajam burung (ص، س، ز)', owner_island: 'KLM', level: 0, skill_id: 'KLM-L0-03', pos: 'phrase', category: 'Huruf Desis', visual_hint: '🪶' },
  { id: 'lx_klm_hams', ar_vocalized: 'هَمْسٌ جَلِيٌّ', ar_plain: 'همس جلي', translit: 'hamsun jaliyyun', gloss_id: 'hembusan nafas fonetis pada huruf mahmusah', owner_island: 'KLM', level: 0, skill_id: 'KLM-L0-03', pos: 'phrase', category: 'Sifat Huruf', visual_hint: '💨' },

  // Level 1: Mubtadi' 1 (A1.1) - Kosakata Tematik, Sapaan & Ketukan Fonetik (KLM-L1-01 s/d KLM-L1-03)
  { id: 'lx_klm_fasahah', ar_vocalized: 'فَصَاحَةُ اللِّسَانِ', ar_plain: 'فصاحة اللسان', translit: 'faṣāḥatu l-lisāni', gloss_id: 'kefasihan lidah berbahasa murni bertanwin', owner_island: 'KLM', level: 1, skill_id: 'KLM-L1-01', pos: 'phrase', category: 'Retorika Lisan', visual_hint: '✨' },
  { id: 'lx_klm_tanwin_lisan', ar_vocalized: 'نُطْقُ التَّنْوِينِ', ar_plain: 'نطق التنوين', translit: 'nuṭqu t-tanwīni', gloss_id: 'pembunyian nun sukun di akhir isim bertanwin jelas', owner_island: 'KLM', level: 1, skill_id: 'KLM-L1-01', pos: 'phrase', category: 'Ketukan Fonetik', visual_hint: '🔔' },
  { id: 'lx_klm_harakah_khashsh', ar_vocalized: 'حَرَكَةٌ خَالِصَةٌ', ar_plain: 'حركة خالصة', translit: 'ḥarakatun khāliṣah', gloss_id: 'vokal tunggal pendek presisi tanpa miring vokal (a, i, u)', owner_island: 'KLM', level: 1, skill_id: 'KLM-L1-01', pos: 'phrase', category: 'Ketukan Fonetik', visual_hint: '🎯' },
  { id: 'lx_klm_tahiyyat', ar_vocalized: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ', ar_plain: 'السلام عليكم ورحمة الله', translit: 'as-salāmu ʿalaykum wa-raḥmatu Llāh', gloss_id: 'salam sapaan damai fasih penuh keberkahan', owner_island: 'KLM', level: 1, skill_id: 'KLM-L1-02', pos: 'phrase', category: 'Sapaan Thalaqah', visual_hint: '🤝' },
  { id: 'lx_klm_thalaqah', ar_vocalized: 'طَلَاقَةُ الحَدِيثِ', ar_plain: 'طلاقة الحديث', translit: 'ṭalāqatu l-ḥadītsi', gloss_id: 'kelancaran berbicara tanpa jeda kaku', owner_island: 'KLM', level: 1, skill_id: 'KLM-L1-02', pos: 'phrase', category: 'Retorika Lisan', visual_hint: '🌊' },
  { id: 'lx_klm_ahlan', ar_vocalized: 'أَهْلًا وَسَهْلًا وَمَرْحَبًا', ar_plain: 'أهلا وسهلا ومرحبا', translit: 'ahlan wa-sahlan wa-marḥaban', gloss_id: 'selamat datang sambutan hangat keramahan Arab', owner_island: 'KLM', level: 1, skill_id: 'KLM-L1-02', pos: 'phrase', category: 'Sapaan Thalaqah', visual_hint: '🌸' },
  { id: 'lx_klm_kaifa_haluk', ar_vocalized: 'كَيْفَ حَالُكَ يَا أَخِي', ar_plain: 'كيف حالك يا أخي', translit: 'kayfa ḥāluka yā akhī', gloss_id: 'bagaimana kabarmu saudaraku sapaan ramah', owner_island: 'KLM', level: 1, skill_id: 'KLM-L1-02', pos: 'phrase', category: 'Sapaan Thalaqah', visual_hint: '😊' },
  { id: 'lx_klm_madd_thabii', ar_vocalized: 'مَدٌّ طَبِيعِيٌّ مُتَّزِنٌ', ar_plain: 'مد طبيعي متزن', translit: 'maddun ṭabīʿiyyun muttazin', gloss_id: 'panjang 2 ketukan harakat vokal seimbang', owner_island: 'KLM', level: 1, skill_id: 'KLM-L1-03', pos: 'phrase', category: 'Ketukan Fonetik', visual_hint: '⏱️' },
  { id: 'lx_klm_mizan_sawti', ar_vocalized: 'مِيزَانٌ صَوْتِيٌّ', ar_plain: 'ميزان صوتي', translit: 'mīzānun ṣawtiyyun', gloss_id: 'timbangan tempo ritme bunyi vokal panjang-pendek', owner_island: 'KLM', level: 1, skill_id: 'KLM-L1-03', pos: 'phrase', category: 'Ketukan Fonetik', visual_hint: '⚖️' },

  // Level 2: Mubtadi' 2 (A1.2) - Intonasi Kompleks, Dzikir & Kesantunan Lisan (KLM-L2-01 s/d KLM-L2-03)
  { id: 'lx_klm_nabrah', ar_vocalized: 'نَبْرَةُ الصَّوْتِ', ar_plain: 'نبرة الصوت', translit: 'nabratu ṣ-ṣawti', gloss_id: 'intonasi tinggi-rendah nada tanya & seru berwibawa', owner_island: 'KLM', level: 2, skill_id: 'KLM-L2-01', pos: 'phrase', category: 'Intonasi', visual_hint: '📈' },
  { id: 'lx_klm_istifham_sawti', ar_vocalized: 'نَبْرَةُ الِاسْتِفْهَامِ', ar_plain: 'نبرة الاستفهام', translit: 'nabratu l-istifhāmi', gloss_id: 'intonasi nada naik di ujung kalimat tanya', owner_island: 'KLM', level: 2, skill_id: 'KLM-L2-01', pos: 'phrase', category: 'Intonasi', visual_hint: '❓' },
  { id: 'lx_klm_nida', ar_vocalized: 'نِدَاءٌ وَتَرْحِيبٌ', ar_plain: 'نداء وترحيب', translit: 'nidāʾun wa-tarḥībun', gloss_id: 'intonasi panggilan hormat ya ayyuhal ikhwah', owner_island: 'KLM', level: 2, skill_id: 'KLM-L2-01', pos: 'phrase', category: 'Intonasi', visual_hint: '📢' },
  { id: 'lx_klm_tasbih', ar_vocalized: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ', ar_plain: 'سبحان الله وبحمده', translit: 'subḥāna Llāhi wa-bi-ḥamdih', gloss_id: 'tasbih: maha suci Allah dan segala puji bagi-Nya', owner_island: 'KLM', level: 2, skill_id: 'KLM-L2-02', pos: 'phrase', category: 'Doa & Dzikir', visual_hint: '🤲' },
  { id: 'lx_klm_dua_ilm', ar_vocalized: 'رَبِّ زِدْنِي عِلْمًا وَارْزُقْنِي فَهْمًا', ar_plain: 'رب زدني علما وارزقني فهما', translit: 'rabbi zidnī ʿilman wa-rzuqnī fahmā', gloss_id: 'doa: ya Tuhanku tambahkanlah ilmu dan karuniakan kepahaman', owner_island: 'KLM', level: 2, skill_id: 'KLM-L2-02', pos: 'phrase', category: 'Doa & Dzikir', visual_hint: '📖' },
  { id: 'lx_klm_istighfar', ar_vocalized: 'أَسْتَغْفِرُ اللَّهَ العَظِيمَ وَأَتُوبُ إِلَيْهِ', ar_plain: 'أستغفر الله العظيم وأتوب إليه', translit: 'astaghfiru Llāha l-ʿaẓīma wa-atūbu ilayh', gloss_id: 'istighfar permohonan ampunan penuh khusyuk lisan', owner_island: 'KLM', level: 2, skill_id: 'KLM-L2-02', pos: 'phrase', category: 'Doa & Dzikir', visual_hint: '🤍' },
  { id: 'lx_klm_hiwar_muaddab', ar_vocalized: 'حِوَارٌ مُؤَدَّبٌ رَاقٍ', ar_plain: 'حوار مؤدب راق', translit: 'ḥiwārun muʾaddabun rāq', gloss_id: 'tutur kata dialog santun dan ramah berkelas', owner_island: 'KLM', level: 2, skill_id: 'KLM-L2-03', pos: 'phrase', category: 'Kesantunan Lisan', visual_hint: '🌿' },
  { id: 'lx_klm_min_fadlik', ar_vocalized: 'مِنْ فَضْلِكَ لَوْ سَمَحْتَ', ar_plain: 'من فضلك لو سمحت', translit: 'min faḍlika law samaḥta', gloss_id: 'tolong / permisi ungkapan santun permohonan bantuan', owner_island: 'KLM', level: 2, skill_id: 'KLM-L2-03', pos: 'phrase', category: 'Kesantunan Lisan', visual_hint: '🙏' },
  { id: 'lx_klm_syukran_jazila', ar_vocalized: 'شُكْرًا جَزِيلًا وَبَارَكَ اللَّهُ فِيكَ', ar_plain: 'شكرا جزيلا وبارك الله فيك', translit: 'syukran jazīlan wa-bāraka Llāhu fīk', gloss_id: 'terima kasih banyak dan semoga Allah memberkahimu', owner_island: 'KLM', level: 2, skill_id: 'KLM-L2-03', pos: 'phrase', category: 'Kesantunan Lisan', visual_hint: '🎁' },

  // Level 3: Mutawassith 1 (A2.1) - Khitabah, Deskripsi Spontan & Jeda Tuturan (KLM-L3-01 s/d KLM-L3-03)
  { id: 'lx_klm_khutbah', ar_vocalized: 'خُطْبَةٌ بَلِيغَةٌ', ar_plain: 'خطبة بليغة', translit: 'khuṭbatun balīghah', gloss_id: 'pidato mimbar orasi terstruktur menyentuh kalbu', owner_island: 'KLM', level: 3, skill_id: 'KLM-L3-01', pos: 'phrase', category: 'Orasi & Pidato', visual_hint: '🏛️' },
  { id: 'lx_klm_khatib', ar_vocalized: 'خَطِيبٌ مِفْوَهٌ', ar_plain: 'خطيب مفوه', translit: 'khaṭībun mifwah', gloss_id: 'orator pembicara ulung fasih percaya diri', owner_island: 'KLM', level: 3, skill_id: 'KLM-L3-01', pos: 'phrase', category: 'Profesi Lisan', visual_hint: '🎙️' },
  { id: 'lx_klm_balaghah', ar_vocalized: 'بَلَاغَةُ الكَلَامِ', ar_plain: 'بلاغة الكلام', translit: 'balāghatu l-kalāmi', gloss_id: 'retorika sastra kesesuaian tutur dengan situasi', owner_island: 'KLM', level: 3, skill_id: 'KLM-L3-01', pos: 'phrase', category: 'Retorika Lisan', visual_hint: '👑' },
  { id: 'lx_klm_muqaddimah_kalam', ar_vocalized: 'مُقَدِّمَةُ الكَلَامِ', ar_plain: 'مقدمة الكلام', translit: 'muqaddimatu l-kalāmi', gloss_id: 'pembuka pidato tahmid dan salam takzim pendengar', owner_island: 'KLM', level: 3, skill_id: 'KLM-L3-01', pos: 'phrase', category: 'Orasi & Pidato', visual_hint: '📜' },
  { id: 'lx_klm_wasf', ar_vocalized: 'وَصْفُ الأَشْيَاءِ بِدِقَّةٍ', ar_plain: 'وصف الأشياء بدقة', translit: 'waṣfu l-asyyāʾi bi-diqqah', gloss_id: 'deskripsi lisan visual objek secara spontan dan detail', owner_island: 'KLM', level: 3, skill_id: 'KLM-L3-02', pos: 'phrase', category: 'Deskripsi Lisan', visual_hint: '🔍' },
  { id: 'lx_klm_tafashil', ar_vocalized: 'بَيَانُ التَّفَاصِيلِ', ar_plain: 'بيان التفاصيل', translit: 'bayānu t-tafāṣīl', gloss_id: 'penguraian detail visual secara runtut dalam monolog', owner_island: 'KLM', level: 3, skill_id: 'KLM-L3-02', pos: 'phrase', category: 'Deskripsi Lisan', visual_hint: '📐' },
  { id: 'lx_klm_taswīr_lafzhi', ar_vocalized: 'تَصْوِيرٌ لَفْظِيٌّ', ar_plain: 'تصوير لفظي', translit: 'taṣwīrun lafẓiyyun', gloss_id: 'penggambaran objek secara hidup lewat tuturan kata lisan', owner_island: 'KLM', level: 3, skill_id: 'KLM-L3-02', pos: 'phrase', category: 'Deskripsi Lisan', visual_hint: '🎨' },
  { id: 'lx_klm_waqf_ibtida', ar_vocalized: 'وَقْفٌ وَابْتِدَاءٌ صَحِيحٌ', ar_plain: 'وقف وابتداء صحيح', translit: 'waqfun wa-btidāʾun ṣaḥīḥ', gloss_id: 'pengaturan jeda nafas dan titik henti tuturan gramatikal', owner_island: 'KLM', level: 3, skill_id: 'KLM-L3-03', pos: 'phrase', category: 'Jeda Tuturan', visual_hint: '⏸️' },
  { id: 'lx_klm_washl', ar_vocalized: 'وَصْلُ الكَلَامِ بِانْسِيَابٍ', ar_plain: 'وصل الكلام بانسياب', translit: 'waṣlu l-kalāmi bi-nsiyāb', gloss_id: 'penyambungan dua kata secara harmonis mengalir tanpa terputus', owner_island: 'KLM', level: 3, skill_id: 'KLM-L3-03', pos: 'phrase', category: 'Jeda Tuturan', visual_hint: '🔗' },

  // Level 4: Mutawassith 2 (A2.2) - Narasi Kisah, Debat Ilmiah & Amsal Hikmah (KLM-L4-01 s/d KLM-L4-03)
  { id: 'lx_klm_sard_qishash', ar_vocalized: 'سَرْدُ القِصَصِ المُؤَثِّرَةِ', ar_plain: 'سرد القصص المؤثرة', translit: 'sardu l-qiṣaṣi l-muʾatstsirah', gloss_id: 'narasi penceritaan kisah dramatik berjiwa dan bermakna', owner_island: 'KLM', level: 4, skill_id: 'KLM-L4-01', pos: 'phrase', category: 'Narasi Cerita', visual_hint: '📚' },
  { id: 'lx_klm_hubkah_qashashiyyah', ar_vocalized: 'حُبْكَةٌ قَصَصِيَّةٌ', ar_plain: 'حبكة قصصية', translit: 'ḥubkatun qaṣaṣiyyah', gloss_id: 'jalinan alur plot dramatis dalam dongeng dan fabel klasik', owner_island: 'KLM', level: 4, skill_id: 'KLM-L4-01', pos: 'phrase', category: 'Narasi Cerita', visual_hint: '🧶' },
  { id: 'lx_klm_tasywiq', ar_vocalized: 'تَشْوِيقُ السَّامِعِينَ', ar_plain: 'تشويق السامعين', translit: 'tasywīqu s-sāmiʿīn', gloss_id: 'pembawaan vokal yang membuat pendengar penasaran dan terpikat', owner_island: 'KLM', level: 4, skill_id: 'KLM-L4-01', pos: 'phrase', category: 'Narasi Cerita', visual_hint: '✨' },
  { id: 'lx_klm_jadal', ar_vocalized: 'مُنَاظَرَةٌ أَدَبِيَّةٌ رَاقِيَةٌ', ar_plain: 'مناظرة أدبية راقية', translit: 'munāẓaratun adabiyyatun rāqiyah', gloss_id: 'debat argumentasi terpelajar yang santun dan berbobot', owner_island: 'KLM', level: 4, skill_id: 'KLM-L4-02', pos: 'phrase', category: 'Debat & Argumentasi', visual_hint: '⚖️' },
  { id: 'lx_klm_hujjah_qathiyyah', ar_vocalized: 'حُجَّةٌ قَاطِعَةٌ دَامِغَةٌ', ar_plain: 'حجة قاطعة دامغة', translit: 'ḥujjatun qāṭiʿatun dāmighah', gloss_id: 'argumen logika kuat tak terbantahkan dalam diskusi ilmiah', owner_island: 'KLM', level: 4, skill_id: 'KLM-L4-02', pos: 'phrase', category: 'Debat & Argumentasi', visual_hint: '🛡️' },
  { id: 'lx_klm_ittifaq_ikhtilaf', ar_vocalized: 'أَدَبُ الِاتِّفَاقِ وَالِاخْتِلَافِ', ar_plain: 'أدب الاتفاق والاختلاف', translit: 'adabu l-ittifāqi wa-l-ikhtilāf', gloss_id: 'etika bersepakat dan menyanggah pendapat secara santun diplomatik', owner_island: 'KLM', level: 4, skill_id: 'KLM-L4-02', pos: 'phrase', category: 'Debat & Argumentasi', visual_hint: '🤝' },
  { id: 'lx_klm_hikam', ar_vocalized: 'أَمْثَالٌ وَحِكَمٌ خَالِدَةٌ', ar_plain: 'أمثال وحكم خالدة', translit: 'amtsālun wa-ḥikamun khālidah', gloss_id: 'peribahasa bertutur sajak indah abadi bernilai luhur', owner_island: 'KLM', level: 4, skill_id: 'KLM-L4-03', pos: 'phrase', category: 'Mutiara Sajak', visual_hint: '💎' },
  { id: 'lx_klm_saja', ar_vocalized: 'سَجْعٌ بَلِيغٌ مُطْرِبٌ', ar_plain: 'سجع بليغ مطرب', translit: 'sajʿun balīghun muṭrib', gloss_id: 'rima akhir kalimat bersajak yang memesona pendengaran', owner_island: 'KLM', level: 4, skill_id: 'KLM-L4-03', pos: 'phrase', category: 'Mutiara Sajak', visual_hint: '🎵' },
  { id: 'lx_klm_amtsal_fusha', ar_vocalized: 'مَثَلٌ سَائِرٌ فِي الآفَاقِ', ar_plain: 'مثل سائر في الآفاق', translit: 'matsalun sāʾirun fī l-āfāq', gloss_id: 'pepatah Arab populer termasyhur penuntun kebijaksanaan', owner_island: 'KLM', level: 4, skill_id: 'KLM-L4-03', pos: 'phrase', category: 'Mutiara Sajak', visual_hint: '🌟' },

  // Level 5: Mutamayyiz (B1 Mahir) - Orasi Mimbar Agung, Wawancara Spontan & Insyad Syi'ir (KLM-L5-01 s/d KLM-L5-03)
  { id: 'lx_klm_khitabah_minbariyyah', ar_vocalized: 'خِطَابَةٌ مِنْبَرِيَّةٌ مُؤَثِّرَةٌ', ar_plain: 'خطابة منبرية مؤثرة', translit: 'khiṭābatun minbariyyatun muʾatstsirah', gloss_id: 'orasi mimbar agung persuasif menggugah jiwa dan tekad audiens', owner_island: 'KLM', level: 5, skill_id: 'KLM-L5-01', pos: 'phrase', category: 'Orasi Mimbar', visual_hint: '🗣️' },
  { id: 'lx_klm_ta_tsir_jamahir', ar_vocalized: 'تَأْثِيرٌ فِي الجَمَاهِيرِ', ar_plain: 'تأثير في الجماهير', translit: 'taʾthīrun fī l-jamāhīr', gloss_id: 'daya pikat vokal orator yang menggetarkan massa hadirin', owner_island: 'KLM', level: 5, skill_id: 'KLM-L5-01', pos: 'phrase', category: 'Orasi Mimbar', visual_hint: '🔥' },
  { id: 'lx_klm_mashadir_iqna', ar_vocalized: 'مَصَادِرُ الإِقْنَاعِ الخِطَابِيِّ', ar_plain: 'مصادر الإقناع الخطابي', translit: 'maṣādiru l-iqnāʿi l-khiṭābiyy', gloss_id: 'teknik persuasi retoris pembicara ulung meyakinkan lawan bicara', owner_island: 'KLM', level: 5, skill_id: 'KLM-L5-01', pos: 'phrase', category: 'Orasi Mimbar', visual_hint: '⚡' },
  { id: 'lx_klm_muqabalah', ar_vocalized: 'مُقَابَلَةٌ عَفْوِيَّةٌ ارْتِجَالِيَّةٌ', ar_plain: 'مقابلة عفوية ارتجالية', translit: 'muqābalatun ʿafwiyyatun irtijāliyyah', gloss_id: 'wawancara spontan respon cepat bahasa fusha tanpa persiapan', owner_island: 'KLM', level: 5, skill_id: 'KLM-L5-02', pos: 'phrase', category: 'Respon Spontan', visual_hint: '🎙️' },
  { id: 'lx_klm_badihah', ar_vocalized: 'بَدِيهَةٌ حَاضِرَةٌ ذَكِيَّةٌ', ar_plain: 'بديهة حاضرة ذكية', translit: 'badīhatun ḥāḍiratun dzakiyyah', gloss_id: 'kecerdasan daya tanggap lisan spontan dalam berargumen', owner_island: 'KLM', level: 5, skill_id: 'KLM-L5-02', pos: 'phrase', category: 'Respon Spontan', visual_hint: '💡' },
  { id: 'lx_klm_insyad_syir', ar_vocalized: 'إِنْشَادُ الشِّعْرِ العَرَبِيِّ الأَصِيلِ', ar_plain: 'إنشاد الشعر العربي الأصيل', translit: 'insyādu sy-syiʿri l-ʿarabiyyi l-aṣīl', gloss_id: 'lantunan bait syair klasik dengan ritme bahr dan penghayatan rasa', owner_island: 'KLM', level: 5, skill_id: 'KLM-L5-03', pos: 'phrase', category: 'Sastra Lisan', visual_hint: '🪕' },
  { id: 'lx_klm_qafiyah_syir', ar_vocalized: 'قَافِيَةٌ عَذْبَةٌ رَنَّانَةٌ', ar_plain: 'قافية عذبة رنانة', translit: 'qāfiyatun ʿadzbatun rannānah', gloss_id: 'rima sajak akhir bait puisi yang merdu dan bergetar indah', owner_island: 'KLM', level: 5, skill_id: 'KLM-L5-03', pos: 'phrase', category: 'Sastra Lisan', visual_hint: '🎶' },
  { id: 'lx_klm_bahr_arudh', ar_vocalized: 'بَحْرُ العَرُوضِ وَأَوْزَانُهُ', ar_plain: 'بحر العروض وأوزانه', translit: 'baḥru l-ʿarūḍi wa-awzānuh', gloss_id: 'ketukan matra metrum bahr puisi Arab klasik (Thawil, Kamil, Basith)', owner_island: 'KLM', level: 5, skill_id: 'KLM-L5-03', pos: 'phrase', category: 'Sastra Lisan', visual_hint: '🌊' },

  // --- TMH (Kuil Langit: 12 Modul Ujian Jenjang, Syahadah & Gelar Rutbah L0-L5) ---
  // Level 0: Tamhidi (Pra-A1) - Musafir -> Thalib
  // TMH-L0-01: Saringan Awal Fonem & Makhraj
  { id: 'lx_tmh_makhraj_ikhtibar', ar_vocalized: 'مَخْرَجٌ صَحِيحٌ', ar_plain: 'مخرج صحيح', translit: 'makhrajun ṣaḥīḥ', gloss_id: 'makhraj artikulasi murni dalam ujian fonetik', owner_island: 'TMH', level: 0, skill_id: 'TMH-L0-01', pos: 'phrase', category: 'Ujian Fonetik', visual_hint: '🎯' },
  { id: 'lx_tmh_harakah_ikhtibar', ar_vocalized: 'حَرَكَةٌ مُعْتَدِلَةٌ', ar_plain: 'حركة معتدلة', translit: 'ḥarakatun muʿtadilan', gloss_id: 'harakat vokal seimbang tanpa imalah', owner_island: 'TMH', level: 0, skill_id: 'TMH-L0-01', pos: 'phrase', category: 'Ujian Fonetik', visual_hint: '⚖️' },
  { id: 'lx_tmh_musafir', ar_vocalized: 'مُسَافِرٌ بَاحِثٌ', ar_plain: 'مسافر باحث', translit: 'musāfirun bāḥits', gloss_id: 'gelar pemula musafir pengelana awal', owner_island: 'TMH', level: 0, skill_id: 'TMH-L0-01', pos: 'isim', category: 'Rutbah Gelar', visual_hint: '🧭' },
  { id: 'lx_tmh_tamhidi_ikhtibar', ar_vocalized: 'مَرْحَلَةٌ تَمْهِيدِيَّةٌ', ar_plain: 'مرحلة تمهيدية', translit: 'marḥalatun tamhīdiyyah', gloss_id: 'tahapan persiapan ujian pra-A1 tamhidi', owner_island: 'TMH', level: 0, skill_id: 'TMH-L0-01', pos: 'phrase', category: 'Jenjang Ujian', visual_hint: '🪜' },
  // TMH-L0-02: Gerbang Mihrab Tamhidi (Penobatan Thalib)
  { id: 'lx_tmh_mihrab', ar_vocalized: 'مِحْرَابُ التَّمْهِيدِ', ar_plain: 'محراب التمهيد', translit: 'miḥrābu t-tamhīd', gloss_id: 'gerbang mihrab kelulusan jenjang 0', owner_island: 'TMH', level: 0, skill_id: 'TMH-L0-02', pos: 'phrase', category: 'Mihrab Ujian', visual_hint: '🏛️' },
  { id: 'lx_tmh_imtihan', ar_vocalized: 'اِمْتِحَانٌ شَامِلٌ', ar_plain: 'امتحان شامل', translit: 'imtiḥānun syāmil', gloss_id: 'ujian evaluasi 4 kemahiran dasar', owner_island: 'TMH', level: 0, skill_id: 'TMH-L0-02', pos: 'phrase', category: 'Evaluasi 4 Pilar', visual_hint: '📋' },
  { id: 'lx_tmh_thalib', ar_vocalized: 'طَالِبُ العِلْمِ', ar_plain: 'طالب العلم', translit: 'ṭālibu l-ʿilm', gloss_id: 'gelar rutbah thalib penuntut ilmu teruji', owner_island: 'TMH', level: 0, skill_id: 'TMH-L0-02', pos: 'isim', category: 'Rutbah Gelar', visual_hint: '🎓' },
  { id: 'lx_tmh_baydhah', ar_vocalized: 'بَيْضَةُ الهُدْهُدِ', ar_plain: 'بيضة الهدهد', translit: 'bayḍatu l-hudhud', gloss_id: 'telur pendamping hudhud menetas', owner_island: 'TMH', level: 0, skill_id: 'TMH-L0-02', pos: 'isim', category: 'Evolusi Hudhud', visual_hint: '🥚' },

  // Level 1: Mubtadi (A1) - Thalib -> Rahhal
  // TMH-L1-01: Evaluasi Leksikal & Frasa
  { id: 'lx_tmh_mufradat_asasi', ar_vocalized: 'مُفْرَدَاتٌ أَسَاسِيَّةٌ', ar_plain: 'مفردات أساسية', translit: 'mufradātun asāsiyyah', gloss_id: 'perbendaharaan kosakata inti A1', owner_island: 'TMH', level: 1, skill_id: 'TMH-L1-01', pos: 'phrase', category: 'Ujian Leksikal', visual_hint: '📖' },
  { id: 'lx_tmh_taaruf_ikhtibar', ar_vocalized: 'تَعَارُفٌ سَلِيمٌ', ar_plain: 'تعارف سليم', translit: 'taʿārufun salīm', gloss_id: 'perkenalan diri santun kaidah fusha', owner_island: 'TMH', level: 1, skill_id: 'TMH-L1-01', pos: 'phrase', category: 'Ujian Lisan', visual_hint: '🤝' },
  { id: 'lx_tmh_dhamir_ikhtibar', ar_vocalized: 'ضَمِيرٌ مُنْفَصِلٌ', ar_plain: 'ضمير منفصل', translit: 'ḍamīrun munfaṣil', gloss_id: 'kata ganti independen dalam evaluasi', owner_island: 'TMH', level: 1, skill_id: 'TMH-L1-01', pos: 'phrase', category: 'Ujian Qawaid', visual_hint: '👤' },
  { id: 'lx_tmh_fahm_alfadh', ar_vocalized: 'فَهْمُ الأَلْفَاظِ', ar_plain: 'فهم الألفاظ', translit: 'fahmu l-alfāẓ', gloss_id: 'daya tangkap makna lafadz keseharian', owner_island: 'TMH', level: 1, skill_id: 'TMH-L1-01', pos: 'phrase', category: 'Ujian Leksikal', visual_hint: '💡' },
  // TMH-L1-02: Gerbang Mihrab Mubtadi (Penobatan Rahhal)
  { id: 'lx_tmh_mihrab_mubtadi', ar_vocalized: 'مِحْرَابُ المُبْتَدِئِ', ar_plain: 'محراب المبتدئ', translit: 'miḥrābu l-mubtadiʾ', gloss_id: 'gerbang mihrab kelulusan jenjang 1', owner_island: 'TMH', level: 1, skill_id: 'TMH-L1-02', pos: 'phrase', category: 'Mihrab Ujian', visual_hint: '🏛️' },
  { id: 'lx_tmh_syahadah', ar_vocalized: 'شَهَادَةُ النَّجَاحِ', ar_plain: 'شهادة النجاح', translit: 'syahādatu n-najāḥ', gloss_id: 'sertifikat ijazah kelulusan jenjang 1', owner_island: 'TMH', level: 1, skill_id: 'TMH-L1-02', pos: 'phrase', category: 'Syahadah Ijazah', visual_hint: '📜' },
  { id: 'lx_tmh_rahhal', ar_vocalized: 'رَحَّالُ الآفَاقِ', ar_plain: 'رحال الآفاق', translit: 'raḥḥālu l-āfāq', gloss_id: 'gelar rutbah rahhal penjelajah cakrawala', owner_island: 'TMH', level: 1, skill_id: 'TMH-L1-02', pos: 'isim', category: 'Rutbah Gelar', visual_hint: '🌟' },
  { id: 'lx_tmh_farh', ar_vocalized: 'فَرْخُ الهُدْهُدِ', ar_plain: 'فرخ الهدهد', translit: 'farkhu l-hudhud', gloss_id: 'hudhud muda mulai terbang mandiri', owner_island: 'TMH', level: 1, skill_id: 'TMH-L1-02', pos: 'isim', category: 'Evolusi Hudhud', visual_hint: '🐣' },

  // Level 2: Asasi (A2) - Rahhal -> Qari
  // TMH-L2-01: Evaluasi Sintaksis & Struktur
  { id: 'lx_tmh_jumlah_ismiyyah', ar_vocalized: 'جُمْلَةٌ اسْمِيَّةٌ مُعْرَبَةٌ', ar_plain: 'جملة اسمية معربة', translit: 'jumlatun ismiyyatun muʿrabah', gloss_id: 'kalimat nominal tersusun marfu', owner_island: 'TMH', level: 2, skill_id: 'TMH-L2-01', pos: 'phrase', category: 'Ujian Sintaksis', visual_hint: '🏗️' },
  { id: 'lx_tmh_jumlah_filiyyah', ar_vocalized: 'جُمْلَةٌ فِعْلِيَّةٌ سَلِيمَةٌ', ar_plain: 'جملة فعلية سليمة', translit: 'jumlatun fiʿliyyatun salīmah', gloss_id: 'kalimat verbal fiil-fail selaras', owner_island: 'TMH', level: 2, skill_id: 'TMH-L2-01', pos: 'phrase', category: 'Ujian Sintaksis', visual_hint: '⚡' },
  { id: 'lx_tmh_harf_jar_ikhtibar', ar_vocalized: 'حَرْفُ جَرٍّ وَمَجْرُورٌ', ar_plain: 'حرف جر ومجرور', translit: 'ḥarfu jarrin wa-majrūr', gloss_id: 'preposisi jar dan kata majrur teruji', owner_island: 'TMH', level: 2, skill_id: 'TMH-L2-01', pos: 'phrase', category: 'Ujian Sintaksis', visual_hint: '🔗' },
  { id: 'lx_tmh_tarkib_idhafah', ar_vocalized: 'تَرْكِيبٌ إِضَافِيٌّ', ar_plain: 'تركيب إضافي', translit: 'tarkībun iḍāfiyyun', gloss_id: 'struktur kepemilikan mudhaf ilaih', owner_island: 'TMH', level: 2, skill_id: 'TMH-L2-01', pos: 'phrase', category: 'Ujian Sintaksis', visual_hint: '🗝️' },
  // TMH-L2-02: Gerbang Mihrab Asasi (Penobatan Qari)
  { id: 'lx_tmh_mihrab_asasi', ar_vocalized: 'مِحْرَابُ الأَسَاسِيِّ', ar_plain: 'محراب الأساسي', translit: 'miḥrābu l-asāsiyyi', gloss_id: 'gerbang mihrab kelulusan jenjang 2', owner_island: 'TMH', level: 2, skill_id: 'TMH-L2-02', pos: 'phrase', category: 'Mihrab Ujian', visual_hint: '🏛️' },
  { id: 'lx_tmh_qari', ar_vocalized: 'قَارِئُ البَيَانِ', ar_plain: 'قارئ البيان', translit: 'qāriʾu l-bayān', gloss_id: 'gelar rutbah qari pembaca fasih teruji', owner_island: 'TMH', level: 2, skill_id: 'TMH-L2-02', pos: 'isim', category: 'Rutbah Gelar', visual_hint: '🎖️' },
  { id: 'lx_tmh_darajah', ar_vocalized: 'دَرَجَةُ التَّفَوُّقِ', ar_plain: 'درجة التفوق', translit: 'darajatu t-tafawwuq', gloss_id: 'peringkat derajat prestasi istimewa', owner_island: 'TMH', level: 2, skill_id: 'TMH-L2-02', pos: 'phrase', category: 'Pencapaian', visual_hint: '🏅' },
  { id: 'lx_tmh_hudhud_jawwal', ar_vocalized: 'هُدْهُدٌ جَوَّالٌ', ar_plain: 'هدهد جوال', translit: 'hudhudun jawwāl', gloss_id: 'hudhud penjelajah antar benteng', owner_island: 'TMH', level: 2, skill_id: 'TMH-L2-02', pos: 'isim', category: 'Evolusi Hudhud', visual_hint: '🦅' },

  // Level 3: Mutawassith (B1) - Qari -> Katib
  // TMH-L3-01: Evaluasi Paragraf, Dikte & Tashrif
  { id: 'lx_tmh_imla_ikhtibar', ar_vocalized: 'إِمْلَاءٌ مُنْتَظَمٌ', ar_plain: 'إملاء منتظم', translit: 'imlāʾun muntaẓam', gloss_id: 'dikte imla tulisan tanpa cacat ejaan', owner_island: 'TMH', level: 3, skill_id: 'TMH-L3-01', pos: 'phrase', category: 'Ujian Dikte', visual_hint: '✍️' },
  { id: 'lx_tmh_tashrif_ikhtibar', ar_vocalized: 'تَصْرِيفُ الأَفْعَالِ', ar_plain: 'تصريف الأفعال', translit: 'taṣrīfu l-afʿāl', gloss_id: 'konjugasi perubahan verba sistematis', owner_island: 'TMH', level: 3, skill_id: 'TMH-L3-01', pos: 'phrase', category: 'Ujian Morfologi', visual_hint: '🔄' },
  { id: 'lx_tmh_insha_mutawassith', ar_vocalized: 'إِنْشَاءٌ فَقَرِيٌّ', ar_plain: 'إنشاء فقري', translit: 'insyāʾun faqariyyun', gloss_id: 'karangan paragraf terpadu koheren', owner_island: 'TMH', level: 3, skill_id: 'TMH-L3-01', pos: 'phrase', category: 'Ujian Komposisi', visual_hint: '📝' },
  { id: 'lx_tmh_istima_daqiq', ar_vocalized: 'اِسْتِمَاعٌ دَقِيقٌ', ar_plain: 'استماع دقيق', translit: 'istimāʿun daqīq', gloss_id: 'daya simak kritis detail intonasi', owner_island: 'TMH', level: 3, skill_id: 'TMH-L3-01', pos: 'phrase', category: 'Ujian Simak', visual_hint: '🎧' },
  // TMH-L3-02: Gerbang Mihrab Mutawassith (Penobatan Katib)
  { id: 'lx_tmh_mihrab_mutawassith', ar_vocalized: 'مِحْرَابُ المُتَوَسِّطِ', ar_plain: 'محراب المتوسط', translit: 'miḥrābu l-mutawassiṭ', gloss_id: 'gerbang mihrab kelulusan jenjang 3', owner_island: 'TMH', level: 3, skill_id: 'TMH-L3-02', pos: 'phrase', category: 'Mihrab Ujian', visual_hint: '🏛️' },
  { id: 'lx_tmh_katib', ar_vocalized: 'كَاتِبُ الحِكْمَةِ', ar_plain: 'كاتب الحكمة', translit: 'kātibu l-ḥikmah', gloss_id: 'gelar rutbah katib juru tulis hikmah', owner_island: 'TMH', level: 3, skill_id: 'TMH-L3-02', pos: 'isim', category: 'Rutbah Gelar', visual_hint: '✒️' },
  { id: 'lx_tmh_qalam_dhahabi', ar_vocalized: 'قَلَمٌ ذَهَبِيٌّ', ar_plain: 'قلم ذهبي', translit: 'qalamun dhahabiyyun', gloss_id: 'pena emas kehormatan sang katib', owner_island: 'TMH', level: 3, skill_id: 'TMH-L3-02', pos: 'phrase', category: 'Pencapaian', visual_hint: '🖋️' },
  { id: 'lx_tmh_hudhud_katib', ar_vocalized: 'هُدْهُدٌ مُسَجِّلٌ', ar_plain: 'هدهد مسجل', translit: 'hudhudun musajjil', gloss_id: 'hudhud cendekia pencatat ilmu (Scribe)', owner_island: 'TMH', level: 3, skill_id: 'TMH-L3-02', pos: 'isim', category: 'Evolusi Hudhud', visual_hint: '📜' },

  // Level 4: Mutaqaddim (B2) - Katib -> Adib Mutaqaddim
  // TMH-L4-01: Evaluasi Morfo-Sintaksis Lanjut & Irab
  { id: 'lx_tmh_irab_mufashshal', ar_vocalized: 'إِعْرَابٌ مُفَصَّلٌ', ar_plain: 'إعراب مفصل', translit: 'iʿrābun mufaṣṣal', gloss_id: 'analisis irab kedudukan kata mendalam', owner_island: 'TMH', level: 4, skill_id: 'TMH-L4-01', pos: 'phrase', category: 'Ujian Irab', visual_hint: '🔍' },
  { id: 'lx_tmh_afal_mazidah', ar_vocalized: 'أَفْعَالٌ مَزِيدَةٌ', ar_plain: 'أفعال مزيدة', translit: 'afʿālun mazīdah', gloss_id: 'pola verba maziid dengan imbuhan wazan', owner_island: 'TMH', level: 4, skill_id: 'TMH-L4-01', pos: 'phrase', category: 'Ujian Morfologi', visual_hint: '⚙️' },
  { id: 'lx_tmh_nasyr_adabi', ar_vocalized: 'نَثْرٌ أَدَبِيٌّ', ar_plain: 'نثر أدبي', translit: 'natsrun adabiyyun', gloss_id: 'prosa wacana bernilai sastra fusha', owner_island: 'TMH', level: 4, skill_id: 'TMH-L4-01', pos: 'phrase', category: 'Ujian Wacana', visual_hint: '📚' },
  { id: 'lx_tmh_munadharah', ar_vocalized: 'مُنَاظَرَةٌ فِكْرِيَّةٌ', ar_plain: 'مناظرة فكرية', translit: 'munāẓaratun fikriyyah', gloss_id: 'debat ilmiah santun berhujjah kuat', owner_island: 'TMH', level: 4, skill_id: 'TMH-L4-01', pos: 'phrase', category: 'Ujian Debat', visual_hint: '⚖️' },
  // TMH-L4-02: Gerbang Mihrab Mutaqaddim (Penobatan Adib Mutaqaddim)
  { id: 'lx_tmh_mihrab_mutaqaddim', ar_vocalized: 'مِحْرَابُ المُتَقَدِّمِ', ar_plain: 'محراب المتقدم', translit: 'miḥrābu l-mutaqaddim', gloss_id: 'gerbang mihrab kelulusan jenjang 4', owner_island: 'TMH', level: 4, skill_id: 'TMH-L4-02', pos: 'phrase', category: 'Mihrab Ujian', visual_hint: '🏛️' },
  { id: 'lx_tmh_adib_mutaqaddim', ar_vocalized: 'أَدِيبٌ مُتَقَدِّمٌ', ar_plain: 'أديب متقدم', translit: 'adībun mutaqaddim', gloss_id: 'gelar rutbah adib sastrawan mahir', owner_island: 'TMH', level: 4, skill_id: 'TMH-L4-02', pos: 'isim', category: 'Rutbah Gelar', visual_hint: '🎖️' },
  { id: 'lx_tmh_dir_muhafizh', ar_vocalized: 'دِرْعُ المُحَافِظِ', ar_plain: 'درع المحافظ', translit: 'dirʿu l-muḥāfiẓ', gloss_id: 'perisai kemurnian lisan fasih fusha', owner_island: 'TMH', level: 4, skill_id: 'TMH-L4-02', pos: 'phrase', category: 'Pencapaian', visual_hint: '🛡️' },
  { id: 'lx_tmh_hudhud_haris', ar_vocalized: 'هُدْهُدٌ حَارِسٌ', ar_plain: 'هدهد حارس', translit: 'hudhudun ḥāris', gloss_id: 'hudhud pelindung peradaban (Guardian)', owner_island: 'TMH', level: 4, skill_id: 'TMH-L4-02', pos: 'isim', category: 'Evolusi Hudhud', visual_hint: '🦅' },

  // Level 5: Mutamayyiz (C1/C2) - Adib -> Adib Agung Paripurna
  // TMH-L5-01: Evaluasi Balaghah & Stilistika Sastra
  { id: 'lx_tmh_balaghah_ulum', ar_vocalized: 'عُلُومُ البَلَاغَةِ', ar_plain: 'علوم البلاغة', translit: 'ʿulūmu l-balāghah', gloss_id: 'trilogi pilar maani, bayan, dan badi', owner_island: 'TMH', level: 5, skill_id: 'TMH-L5-01', pos: 'phrase', category: 'Ujian Balaghah', visual_hint: '🌟' },
  { id: 'lx_tmh_fashahah_uqwa', ar_vocalized: 'فَصَاحَةٌ عُلْيَا', ar_plain: 'فصاحة عليا', translit: 'faṣāḥatun ʿulyā', gloss_id: 'puncak keluhuran bertutur kata murni', owner_island: 'TMH', level: 5, skill_id: 'TMH-L5-01', pos: 'phrase', category: 'Ujian Retorika', visual_hint: '💎' },
  { id: 'lx_tmh_bahru_syir', ar_vocalized: 'بُحُورُ الشِّعْرِ', ar_plain: 'بحور الشعر', translit: 'buḥūru sy-syiʿr', gloss_id: 'matra wazan irama syiir klasik Arab', owner_island: 'TMH', level: 5, skill_id: 'TMH-L5-01', pos: 'phrase', category: 'Ujian Sastra', visual_hint: '🪕' },
  { id: 'lx_tmh_ijaz_lughawi', ar_vocalized: 'إِعْجَازٌ لُغَوِيٌّ', ar_plain: 'إعجاز لغوي', translit: 'iʿjāzun lughawiyyun', gloss_id: 'kemukjizatan keindahan sastra kalam', owner_island: 'TMH', level: 5, skill_id: 'TMH-L5-01', pos: 'phrase', category: 'Ujian Balaghah', visual_hint: '✨' },
  // TMH-L5-02: Gerbang Mihrab Agung (Penobatan Adib Agung Paripurna)
  { id: 'lx_tmh_mihrab_a_la', ar_vocalized: 'المِحْرَابُ الأَعْلَى', ar_plain: 'المحراب الأعلى', translit: 'al-miḥrābu l-aʿlā', gloss_id: 'gerbang mihrab agung puncak kuil langit', owner_island: 'TMH', level: 5, skill_id: 'TMH-L5-02', pos: 'phrase', category: 'Mihrab Ujian', visual_hint: '🏛️' },
  { id: 'lx_tmh_adib', ar_vocalized: 'أَدِيبُ الكُلِّ الأَعْظَم', ar_plain: 'أديب الكل الأعظم', translit: 'adību l-kulli l-aʿẓam', gloss_id: 'gelar rutbah tertinggi penguasa 8 kepulauan', owner_island: 'TMH', level: 5, skill_id: 'TMH-L5-02', pos: 'isim', category: 'Rutbah Gelar', visual_hint: '🏆' },
  { id: 'lx_tmh_taj', ar_vocalized: 'تَاجُ الفَصَاحَةِ', ar_plain: 'تاج الفصاحة', translit: 'tāju l-faṣāḥah', gloss_id: 'mahkota emas murni adib agung', owner_island: 'TMH', level: 5, skill_id: 'TMH-L5-02', pos: 'phrase', category: 'Pencapaian', visual_hint: '👑' },
  { id: 'lx_tmh_ijazah_sanad', ar_vocalized: 'إِجَازَةٌ بِالسَّنَدِ', ar_plain: 'إجازة بالسند', translit: 'ijāzatun bi-s-sanad', gloss_id: 'ijazah sanad akbar penamat 8 kepulauan', owner_island: 'TMH', level: 5, skill_id: 'TMH-L5-02', pos: 'phrase', category: 'Syahadah Ijazah', visual_hint: '📜' },
  { id: 'lx_tmh_hudhud_malaki', ar_vocalized: 'هُدْهُدٌ مَلَكِيٌّ', ar_plain: 'هدهد ملكي', translit: 'hudhudun malakiyyun', gloss_id: 'hudhud maharaja sayap keemasan (Master)', owner_island: 'TMH', level: 5, skill_id: 'TMH-L5-02', pos: 'isim', category: 'Evolusi Hudhud', visual_hint: '🦚' }
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
  ],
  airport_checkin: [
    {
      id: 'ac1',
      speaker: 'muwadhdhaf_mathar',
      speakerName: 'Petugas Bandara (المُوَظَّف)',
      ar: 'أَهْلًا بِكَ يَا أَخِي! تَفَضَّلْ جَوَازَ السَّفَرِ وَتَذْكِرَةَ الرِّحْلَةِ.',
      translit: 'Ahlan bika yā akhī! Tafaḍḍal jawāza s-safari wa-tadhkirata r-riḥlah.',
      id_translation: 'Selamat datang saudaraku! Silakan tunjukkan paspor dan tiket penerbangan Anda.',
      choices: [
        {
          ar: 'تَفَضَّلْ هٰذَا جَوَازِي وَتَذْكِرَتِي إِلَى مَكَّةَ المُكَرَّمَةِ.',
          translit: 'Tafaḍḍal hādhā jawāzī wa-tadhkiratī ilā Makkata l-mukarramah.',
          id_translation: 'Silakan, ini paspor dan tiket perjalanan saya menuju Makkah al-Mukarramah.',
          score: 1.0,
          nextId: 'ac2'
        },
        {
          ar: 'أَنَا أُرِيدُ القَهْوَةَ فَقَطْ.',
          translit: 'Anā urīdu l-qahwata faqaṭ.',
          id_translation: 'Saya hanya ingin kopi saja.',
          score: 0.3,
          feedback: 'Serahkan dokumen perjalananmu terlebih dahulu kepada petugas!',
          nextId: 'ac2'
        }
      ]
    },
    {
      id: 'ac2',
      speaker: 'muwadhdhaf_mathar',
      speakerName: 'Petugas Bandara (المُوَظَّف)',
      ar: 'كُلُّ شَيْءٍ تَمَامٌ! بَوَّابَةُ الصُّعُودِ رَقْمُ ٧، رِحْلَةً سَعِيدَةً وَمُبَارَكَةً!',
      translit: 'Kullu syayʾin tamām! Bawwābatu ṣ-ṣuʿūdi raqmu sabʿah, riḥlatan saʿīdatan wa-mubārakah!',
      id_translation: 'Semua dokumen beres! Gerbang keberangkatan nomor 7, semoga penerbangan Anda menyenangkan dan penuh berkah!',
      choices: [
        {
          ar: 'شُكْرًا جَزِيلًا لَكَ، وَفِي أَمَانِ اللَّهِ وَحِفْظِهِ!',
          translit: 'Syukran jazīlan laka, wa-fī amāni Llāhi wa-ḥifẓih!',
          id_translation: 'Terima kasih banyak, semoga selalu dalam lindungan dan pemeliharaan Allah!',
          score: 1.0
        }
      ]
    }
  ],
  library_inquiry: [
    {
      id: 'lb1',
      speaker: 'amin_maktabah',
      speakerName: 'Pustakawan Salman (أَمِينُ المَكْتَبَة)',
      ar: 'أَهْلًا بِالبَاحِثِ الكَرِيمِ! عَنْ أَيِّ كِتَابٍ أَوْ مَرْجِعٍ تَبْحَثُ اليَوْمَ؟',
      translit: 'Ahlan bi-l-bāḥithi l-karīm! ʿan ayyi kitābin aw marjiʿin tabḥathu l-yawm?',
      id_translation: 'Selamat datang wahai peneliti budiman! Buku atau rujukan apa yang sedang Anda cari hari ini?',
      choices: [
        {
          ar: 'أَبْحَثُ عَنْ مُعْجَمِ لِسَانِ العَرَبِ وَكُتُبِ البَلَاغَةِ.',
          translit: 'Abḥathu ʿan muʿjami Lisāni l-ʿArab wa-kutubi l-balāghah.',
          id_translation: 'Saya mencari kamus Lisanul Arab dan kitab-kitab balaghah sastra.',
          score: 1.0,
          nextId: 'lb2'
        },
        {
          ar: 'المَطَرُ يَنْزِلُ كَثِيرًا.',
          translit: 'Al-maṭaru yanzilu kathīrā.',
          id_translation: 'Hujan sedang turun lebat.',
          score: 0.3,
          feedback: 'Sebutkan judul kitab yang ingin kamu baca di perpustakaan!',
          nextId: 'lb2'
        }
      ]
    },
    {
      id: 'lb2',
      speaker: 'amin_maktabah',
      speakerName: 'Pustakawan Salman (أَمِينُ المَكْتَبَة)',
      ar: 'تَجِدُهَا فِي الرَّفِّ الثَّالِثِ قِسْمِ اللُّغَوِيَّاتِ، هَلْ تُرِيدُ اسْتِعَارَتَهَا؟',
      translit: 'Tajiduhā fī r-raffi th-thālithi qismi l-lughawiyyāt, hal turīdu stiʿāratahā?',
      id_translation: 'Anda dapat menemukannya di rak ketiga bagian kebahasaan, apakah Anda ingin meminjamnya pulang?',
      choices: [
        {
          ar: 'نَعَمْ مِنْ فَضْلِكَ، مَعِي بِطَاقَةُ الاسْتِعَارَةِ.',
          translit: 'Naʿam min faḍlika, maʿī biṭāqatu l-istiʿārah.',
          id_translation: 'Ya jika berkenan, saya membawa kartu keanggotaan peminjaman.',
          score: 1.0
        }
      ]
    }
  ],
  halaqah_discussion: [
    {
      id: 'hd1',
      speaker: 'syaikh_halaqah',
      speakerName: 'Ustaz Karim (Mudir Halaqah)',
      ar: 'مَا رَأْيُكُمْ فِي دَوْرِ التَّعَلُّمِ الذَّاتِيِّ لِإِتْقَانِ اللُّغَةِ العَرَبِيَّةِ؟',
      translit: 'Mā raʾyukum fī dawri t-taʿallumi dh-dhātiyyi li-itqāni l-lughati l-ʿarabiyyah?',
      id_translation: 'Bagaimana pandangan kalian mengenai peran belajar mandiri dalam menguasai bahasa Arab?',
      choices: [
        {
          ar: 'فِي رَأْيِي هُوَ رُكْنٌ أَسَاسِيٌّ مَعَ حُضُورِ مَجَالِسِ الأَسَاتِذَةِ.',
          translit: 'Fī raʾyī huwa ruknun asāsiyyun maʿa ḥuḍūri majālisi l-asātidhah.',
          id_translation: 'Menurut hemat saya belajar mandiri adalah fondasi utama yang dipadukan dengan bimbingan guru langsung.',
          score: 1.0,
          nextId: 'hd2'
        },
        {
          ar: 'لَا أُرِيدُ التَّكَلُّمَ.',
          translit: 'Lā urīdu t-takallum.',
          id_translation: 'Saya tidak mau bicara.',
          score: 0.2,
          feedback: 'Sampaikan argumenmu secara aktif dan santun dalam halaqah!',
          nextId: 'hd2'
        }
      ]
    },
    {
      id: 'hd2',
      speaker: 'syaikh_halaqah',
      speakerName: 'Ustaz Karim (Mudir Halaqah)',
      ar: 'أَحْسَنْتَ قَوْلًا وَأَصَبْتَ المَقْصِدَ! فَبِالتَّكْرَارِ وَالمُمَارَسَةِ تَثْبُتُ المَعْرِفَةُ.',
      translit: 'Aḥsanta qawlan wa-aṣabta l-maqṣid! Fa-bi-t-takrāri wa-l-mumārasati tathbutu l-maʿrifah.',
      id_translation: 'Bagus sekali argumenmu dan tepat sasaran! Sebab dengan pengulangan dan latihan terus-meneruslah ilmu terpatri.',
      choices: [
        {
          ar: 'جَزَاكُمُ اللَّهُ خَيْرًا عَلَى هٰذِهِ الإِفَادَةِ القَيِّمَةِ.',
          translit: 'Jazākumu Llāhu khayran ʿalā hādhihi l-ifādati l-qayyimah.',
          id_translation: 'Semoga Allah membalas Anda dengan kebaikan atas faedah ilmu yang sangat berharga ini.',
          score: 1.0
        }
      ]
    }
  ],
  diplomacy_negotiation: [
    {
      id: 'dp1',
      speaker: 'safir_adab',
      speakerName: 'Duta Besar Luqman (السَّفِير لُقْمَان)',
      ar: 'سَعَادَةَ المُمَثِّلِ، نَرْغَبُ فِي وَضْعِ خُطَّةِ عَمَلٍ مُشْتَرَكَةٍ لِلتَّبَادُلِ الثَّقَافِيِّ.',
      translit: 'Saʿādata l-mumaththil, narghabu fī waḍʿi khuṭṭati ʿamalin musytarakatin li-t-tabāduli th-thaqāfī.',
      id_translation: 'Yang mulia perwakilan, kami berkehendak merumuskan rencana aksi bersama untuk pertukaran kebudayaan.',
      choices: [
        {
          ar: 'نُوَافِقُ عَلَى هٰذَا المَسْعَى الكَرِيمِ، وَنَقْتَرِحُ تَوْقِيعَ مُذَكَّرَةِ تَفَاهُمٍ رَسْمِيَّةٍ.',
          translit: 'Nuwāfiqu ʿalā hādhā l-masʿā l-karīm, wa-naqtariḥu tawqīʿa mudhakkirati tafāhumin rasmiyyah.',
          id_translation: 'Kami menyambut baik ikhtiar mulia ini, dan mengusulkan penandatanganan nota kesepahaman diplomatik resmi.',
          score: 1.0,
          nextId: 'dp2'
        },
        {
          ar: 'نَحْنُ مَشْغُولُونَ جِدًّا.',
          translit: 'Naḥnu masyghūlūna jiddan.',
          id_translation: 'Kami sangat sibuk.',
          score: 0.2,
          feedback: 'Gunakan uslub diplomasi yang fashih dan menghormati mitra perundingan!',
          nextId: 'dp2'
        }
      ]
    },
    {
      id: 'dp2',
      speaker: 'safir_adab',
      speakerName: 'Duta Besar Luqman (السَّفِير لُقْمَان)',
      ar: 'مُبَارَكٌ هٰذَا الاتِّفَاقُ! إِنَّهُ جِسْرٌ لِتَوْطِيدِ أَوْاصِرِ الأُخُوَّةِ وَالمَعْرِفَةِ.',
      translit: 'Mubārakun hādhā l-ittifāq! Innahu jisrun li-tawṭīdi awāṣiri l-ukhuwwati wa-l-maʿrifah.',
      id_translation: 'Selamat atas kesepakatan yang berkah ini! Ini adalah jembatan pengokoh tali persaudaraan dan peradaban.',
      choices: [
        {
          ar: 'شَرَفٌ لَنَا هٰذَا التَّعَاوُنُ، وَبِالتَّوْفِيقِ وَالسَّدَادِ دَائِمًا!',
          translit: 'Syarafun lanā hādhā t-taʿāwun, wa-bi-t-tawfīqi wa-s-sadādi dāʾiman!',
          id_translation: 'Sebuah kehormatan bagi kami atas kemitraan ini, semoga senantiasa dalam taufik dan kelurusan!',
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

export interface ReadingQuizQuestion {
  question: string;
  options: {
    text: string;
    correct: boolean;
    explanation: string;
  }[];
}

export interface GradedReadingItem {
  id: string;
  title: string;
  level: number;
  theme: string;
  icon: string;
  summary: string;
  paragraphs: {
    ar: string;
    translit: string;
    translation: string;
    words: { ar: string; mean: string }[];
  }[];
  quiz: ReadingQuizQuestion[];
}

export const GRADED_READINGS: GradedReadingItem[] = [
  // --- LEVEL 0: Tamhidi (Fondasi Kalimat Tunggal & Vokal Murni) ---
  {
    id: 'read_1',
    title: 'فِي الحَدِيقَةِ الجَمِيلَة (Di Taman yang Indah)',
    level: 0,
    theme: 'Alam & Lingkungan',
    icon: '🌸',
    summary: 'Mengenal suasana taman bunga asri, pohon rindang, dan gemercik air tawar segar.',
    paragraphs: [
      {
        ar: 'هٰذِهِ حَدِيقَةٌ جَمِيلَةٌ. فِيهَا شَجَرٌ كَبِيرٌ وَمَاءٌ عَذْبٌ.',
        translit: 'Hādhihi ḥadīqatun jamīlah. Fīhā syajarun kabīr wa-māʾun ʿadhb.',
        translation: 'Ini adalah taman yang indah. Di dalamnya ada pohon besar dan air yang segar.',
        words: [
          { ar: 'هٰذِهِ', mean: 'ini (feminin)' },
          { ar: 'حَدِيقَةٌ', mean: 'taman / kebun' },
          { ar: 'جَمِيلَةٌ', mean: 'indah' },
          { ar: 'فِيهَا', mean: 'di dalamnya' },
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
          { ar: 'يَجْلِسُ', mean: 'sedang duduk' },
          { ar: 'تَحْتَ', mean: 'di bawah' },
          { ar: 'الشَّجَرَةِ', mean: 'pohon itu' },
          { ar: 'يَقْرَأُ', mean: 'dia membaca' },
          { ar: 'الكِتَابَ', mean: 'buku' },
        ]
      }
    ],
    quiz: [
      {
        question: 'Di manakah anak laki-laki itu duduk saat membaca buku?',
        options: [
          { text: 'Di bawah pohon rindang (تَحْتَ الشَّجَرَةِ)', correct: true, explanation: 'Tepat sekali! Teks menyatakan: "الوَلَدُ يَجْلِسُ تَحْتَ الشَّجَرَةِ".' },
          { text: 'Di dalam mobil yang melaju', correct: false, explanation: 'Bukan, latar cerita adalah di taman asri.' },
          { text: 'Di atas atap rumah', correct: false, explanation: 'Jawaban ini tidak sesuai dengan isi naskah.' }
        ]
      },
      {
        question: 'Bagaimanakah sifat air yang berada di taman tersebut?',
        options: [
          { text: 'Air tawar yang jernih dan segar (مَاءٌ عَذْبٌ)', correct: true, explanation: 'Mumtaz! Kata "عَذْبٌ" berarti air tawar yang segar.' },
          { text: 'Air laut yang asin', correct: false, explanation: 'Teks secara tegas menyebut air tawar (ʿadhb).' },
          { text: 'Air mendidih yang panas', correct: false, explanation: 'Tidak ada keterangan air panas di naskah.' }
        ]
      }
    ]
  },
  {
    id: 'read_6',
    title: 'بَيْتِي الصَّغِيرُ النَّظِيف (Rumah Mungilku yang Bersih)',
    level: 0,
    theme: 'Keluarga & Tempat Tinggal',
    icon: '🏡',
    summary: 'Mengenal ruangan-ruangan rumah mungil yang tertata rapi dan bersih.',
    paragraphs: [
      {
        ar: 'هٰذَا بَيْتِي الصَّغِيرُ. البَيْتُ نَظِيفٌ وَمُرَتَّبٌ دَائِمًا.',
        translit: 'Hādhā baytī ṣ-ṣaghīr. Al-baytu naẓīfun wa-murattabun dāʾimā.',
        translation: 'Ini adalah rumah mungilku. Rumah ini senantiasa bersih dan rapi.',
        words: [
          { ar: 'هٰذَا', mean: 'ini (maskulin)' },
          { ar: 'بَيْتِي', mean: 'rumahku' },
          { ar: 'الصَّغِيرُ', mean: 'yang kecil / mungil' },
          { ar: 'البَيْتُ', mean: 'rumah itu' },
          { ar: 'نَظِيفٌ', mean: 'bersih' },
          { ar: 'مُرَتَّبٌ', mean: 'tertata rapi' },
          { ar: 'دَائِمًا', mean: 'selalu / senantiasa' }
        ]
      },
      {
        ar: 'فِي بَيْتِي غُرْفَةُ جُلُوسٍ مُرِيحَةٌ وَمَطْبَخٌ وَاسِعٌ.',
        translit: 'Fī baytī ghurfatu julūsin murīḥah wa-maṭbakhun wāsiʿ.',
        translation: 'Di dalam rumahku ada ruang tamu yang nyaman dan dapur yang lapang.',
        words: [
          { ar: 'فِي', mean: 'di dalam' },
          { ar: 'بَيْتِي', mean: 'rumahku' },
          { ar: 'غُرْفَةُ', mean: 'ruangan' },
          { ar: 'جُلُوسٍ', mean: 'duduk / tamu' },
          { ar: 'مُرِيحَةٌ', mean: 'nyaman' },
          { ar: 'مَطْبَخٌ', mean: 'dapur' },
          { ar: 'وَاسِعٌ', mean: 'luas / lapang' }
        ]
      }
    ],
    quiz: [
      {
        question: 'Bagaimana keadaan rumah sang penutur dalam teks?',
        options: [
          { text: 'Bersih dan selalu tertata rapi (نَظِيفٌ وَمُرَتَّبٌ)', correct: true, explanation: 'Benar! "Al-baytu naẓīfun wa-murattabun dāʾimā".' },
          { text: 'Gelap gulita dan berantakan', correct: false, explanation: 'Kebalikannya, rumah tersebut selalu bersih dan tertata.' },
          { text: 'Kosong ditinggal penghuni', correct: false, explanation: 'Rumah tersebut dihuni dan terawat baik.' }
        ]
      }
    ]
  },

  // --- LEVEL 1: Mubtadi' (Kalimat Pendek 2-3 Kata & Pasar) ---
  {
    id: 'read_2',
    title: 'يَوْمٌ فِي سُوقِ المَدِينَة (Sehari di Pasar Kota)',
    level: 1,
    theme: 'Pasar & Transaksi',
    icon: '🛒',
    summary: 'Ahmad berbelanja roti gandum hangat dan buah segar bersama sang ayah tercinta.',
    paragraphs: [
      {
        ar: 'ذَهَبَ أَحْمَدُ مَعَ أَبِيهِ إِلَى سُوقِ المَدِينَةِ فِي الصَّبَاحِ البَاكِرِ.',
        translit: 'Dzahaba Aḥmad maʿa abīhi ilā sūqi l-madīnati fī ṣ-ṣabāḥi l-bākir.',
        translation: 'Ahmad pergi bersama ayahnya ke pasar kota pada pagi-pagi buta.',
        words: [
          { ar: 'ذَهَبَ', mean: 'telah pergi' },
          { ar: 'أَحْمَدُ', mean: 'Ahmad' },
          { ar: 'مَعَ', mean: 'bersama' },
          { ar: 'أَبِيهِ', mean: 'ayahnya' },
          { ar: 'إِلَى', mean: 'ke arah' },
          { ar: 'سُوقِ', mean: 'pasar' },
          { ar: 'المَدِينَةِ', mean: 'kota' },
          { ar: 'فِي', mean: 'pada' },
          { ar: 'الصَّبَاحِ', mean: 'pagi hari' },
          { ar: 'البَاكِرِ', mean: 'pagi buta' }
        ]
      },
      {
        ar: 'اِشْتَرَى أَبِي خُبْزًا طَازَجًا وَفَاكِهَةً لَذِيذَةً مِنَ التَّاجِرِ الأَمِينِ.',
        translit: 'Isytarā abī khubzan ṭāzajan wa-fākihatan ladzīdhatan mina t-tājiri l-amīn.',
        translation: 'Ayahku membeli roti segar dan buah-buahan lezat dari pedagang yang jujur amanah.',
        words: [
          { ar: 'اِشْتَرَى', mean: 'telah membeli' },
          { ar: 'أَبِي', mean: 'ayahku' },
          { ar: 'خُبْزًا', mean: 'roti gandum' },
          { ar: 'طَازَجًا', mean: 'segar / hangat' },
          { ar: 'فَاكِهَةً', mean: 'buah-buahan' },
          { ar: 'لَذِيذَةً', mean: 'lezat' },
          { ar: 'مِنَ', mean: 'dari' },
          { ar: 'التَّاجِرِ', mean: 'pedagang' },
          { ar: 'الأَمِينِ', mean: 'yang amanah / jujur' }
        ]
      }
    ],
    quiz: [
      {
        question: 'Kapan Ahmad dan ayahnya pergi menuju pasar kota?',
        options: [
          { text: 'Pada pagi-pagi buta (فِي الصَّبَاحِ البَاكِرِ)', correct: true, explanation: 'Tepat! "fī ṣ-ṣabāḥi l-bākir".' },
          { text: 'Pada tengah malam buta', correct: false, explanation: 'Pasar dikunjungi pada pagi hari.' },
          { text: 'Setelah matahari terbenam', correct: false, explanation: 'Bukan, mereka pergi di waktu pagi.' }
        ]
      },
      {
        question: 'Barang apa sajakah yang dibeli oleh ayah Ahmad?',
        options: [
          { text: 'Roti segar dan buah-buahan lezat (خُبْزًا وَفَاكِهَةً)', correct: true, explanation: 'Mumtaz! "Isytarā abī khubzan ṭāzajan wa-fākihatan ladzīdhah".' },
          { text: 'Pakaian dan kain sutra', correct: false, explanation: 'Teks menyatakan roti dan buah-buahan.' },
          { text: 'Sepeda dan mainan kayu', correct: false, explanation: 'Tidak ada pembelian mainan dalam teks.' }
        ]
      }
    ]
  },
  {
    id: 'read_7',
    title: 'الصَّبَاحُ فِي المَدْرَسَة (Pagi Hari di Sekolah)',
    level: 1,
    theme: 'Pendidikan & Murid',
    icon: '🏫',
    summary: 'Para murid berbaris rapi di halaman sekolah dan menyapa bapak ibu guru.',
    paragraphs: [
      {
        ar: 'يَدْخُلُ التَّلَامِيذُ فِنَاءَ المَدْرَسَةِ بِنَشَاطٍ وَسُرُورٍ.',
        translit: 'Yadkhulu t-talāmīdhu fināʾa l-madrasati bi-nasyāṭin wa-surūr.',
        translation: 'Para murid memasuki halaman sekolah dengan penuh semangat dan keceriaan.',
        words: [
          { ar: 'يَدْخُلُ', mean: 'memasuki' },
          { ar: 'التَّلَامِيذُ', mean: 'para murid' },
          { ar: 'فِنَاءَ', mean: 'halaman' },
          { ar: 'المَدْرَسَةِ', mean: 'sekolah' },
          { ar: 'بِنَشَاطٍ', mean: 'dengan semangat' },
          { ar: 'وَسُرُورٍ', mean: 'dan kegembiraan' }
        ]
      },
      {
        ar: 'يُسَلِّمُ الوَلَدُ عَلَى المُعَلِّمِ وَيَقُولُ: صَبَاحَ الخَيْرِ يَا أُسْتَاذِي!',
        translit: 'Yusallimu l-waladu ʿalā l-muʿallimi wa-yaqūlu: ṣabāḥa l-khayri yā ustādhī!',
        translation: 'Murid memberi salam kepada guru seraya berucap: Selamat pagi wahai guruku!',
        words: [
          { ar: 'يُسَلِّمُ', mean: 'memberi salam' },
          { ar: 'الوَلَدُ', mean: 'murid / anak' },
          { ar: 'عَلَى', mean: 'kepada' },
          { ar: 'المُعَلِّمِ', mean: 'guru' },
          { ar: 'وَيَقُولُ', mean: 'dan berkata' },
          { ar: 'صَبَاحَ الخَيْرِ', mean: 'selamat pagi' },
          { ar: 'يَا أُسْتَاذِي', mean: 'wahai guruku' }
        ]
      }
    ],
    quiz: [
      {
        question: 'Ungkapan salam apa yang diucapkan oleh murid kepada sang guru?',
        options: [
          { text: 'Selamat pagi wahai guruku (صَبَاحَ الخَيْرِ يَا أُسْتَاذِي)', correct: true, explanation: 'Benar! Ucapan santun murid adalah Ṣabāḥa l-khayri yā ustādhī.' },
          { text: 'Selamat tidur nyenyak', correct: false, explanation: 'Suasana teks adalah pagi hari di sekolah.' },
          { text: 'Sampai berjumpa tahun depan', correct: false, explanation: 'Bukan, itu adalah salam perpisahan.' }
        ]
      }
    ]
  },

  // --- LEVEL 2: Menengah Awal (Fabel & Dialog) ---
  {
    id: 'read_3',
    title: 'قِصَّةُ النَّمْلَةِ وَالحَمَامَة (Semut & Merpati yang Baik Hati)',
    level: 2,
    theme: 'Fabel Moral & Hikmah',
    icon: '🕊️',
    summary: 'Fabel tolong-menolong: seekor merpati menyelamatkan semut dari derasnya arus sungai.',
    paragraphs: [
      {
        ar: 'سَقَطَتْ نَمْلَةٌ صَغِيرَةٌ فِي النَّهْرِ وَكَادَتْ تَغْرَقُ فِي المَاءِ.',
        translit: 'Saqaṭat namlatun ṣaghīratun fī n-nahri wa-kādat taghraqu fī l-māʾ.',
        translation: 'Seekor semut kecil terjatuh ke dalam sungai dan hampir saja tenggelam di air.',
        words: [
          { ar: 'سَقَطَتْ', mean: 'telah terjatuh' },
          { ar: 'نَمْلَةٌ', mean: 'seekor semut' },
          { ar: 'صَغِيرَةٌ', mean: 'kecil' },
          { ar: 'فِي', mean: 'di dalam' },
          { ar: 'النَّهْرِ', mean: 'sungai' },
          { ar: 'وَكَادَتْ', mean: 'dan hampir saja' },
          { ar: 'تَغْرَقُ', mean: 'ia tenggelam' },
          { ar: 'المَاءِ', mean: 'air' }
        ]
      },
      {
        ar: 'رَأَتْهَا حَمَامَةٌ بَيْضَاءُ، فَأَلْقَتْ لَهَا وَرَقَةَ شَجَرٍ، فَرَكِبَتْ عَلَيْهَا النَّمْلَةُ وَنَجَتْ بِسَلَامٍ.',
        translit: 'Raʾathā ḥamāmatun bayḍāʾ, fa-alqat lahā waraqata syajarin, fa-rakibat ʿalayhā n-namlatu wa-najat bi-salām.',
        translation: 'Merpati putih melihatnya, lalu melemparkan sehelai daun pohon; semut pun menaikinya dan selamat sentosa.',
        words: [
          { ar: 'رَأَتْهَا', mean: 'melihatnya' },
          { ar: 'حَمَامَةٌ', mean: 'burung merpati' },
          { ar: 'بَيْضَاءُ', mean: 'putih bersih' },
          { ar: 'فَأَلْقَتْ', mean: 'maka melemparkan' },
          { ar: 'لَهَا', mean: 'kepadanya' },
          { ar: 'وَرَقَةَ', mean: 'sehelai daun' },
          { ar: 'شَجَرٍ', mean: 'pohon' },
          { ar: 'فَرَكِبَتْ', mean: 'lalu menaikinya' },
          { ar: 'عَلَيْهَا', mean: 'di atasnya' },
          { ar: 'النَّمْلَةُ', mean: 'semut itu' },
          { ar: 'وَنَجَتْ', mean: 'dan selamatlah' },
          { ar: 'بِسَلَامٍ', mean: 'dengan selamat' }
        ]
      }
    ],
    quiz: [
      {
        question: 'Benda apakah yang dilemparkan oleh burung merpati untuk menolong sang semut?',
        options: [
          { text: 'Sehelai daun pohon (وَرَقَة شَجَر)', correct: true, explanation: 'Tepat sekali! Merpati melemparkan waraqata syajarin sebagai perahu darurat.' },
          { text: 'Sebongkah batu karang berat', correct: false, explanation: 'Batu akan langsung tenggelam ke dasar sungai.' },
          { text: 'Seutas tali pancing', correct: false, explanation: 'Merpati menggunakan daun pohon di sekitarnya.' }
        ]
      },
      {
        question: 'Pelajaran moral utama apakah yang dipetik dari fabel di atas?',
        options: [
          { text: 'Kebaikan kecil dan tolong-menolong mampu menyelamatkan nyawa', correct: true, explanation: 'Mumtaz! Budi pekerti tolong-menolong adalah inti fabel hikmah ini.' },
          { text: 'Jangan pernah mendekati sungai sendirian', correct: false, explanation: 'Itu tips keselamatan, bukan pesan moral utama naskah.' },
          { text: 'Hewan kecil tidak membutuhkan pertolongan', correct: false, explanation: 'Justru semut kecil selamat berkat pertolongan merpati.' }
        ]
      }
    ]
  },
  {
    id: 'read_8',
    title: 'حِوَارٌ فِي المَطْعَمِ العَرَبِيّ (Percakapan di Restoran Tradisional)',
    level: 2,
    theme: 'Kuliner & Budaya',
    icon: '🍽️',
    summary: 'Percakapan santun antara pelanggan dan pelayan restoran tradisional tentang hidangan khas Arab.',
    paragraphs: [
      {
        ar: 'النَّادِلُ: مَرْحَبًا بِكُمْ فِي مَطْعَمِنَا! مَاذَا تُفَضِّلُونَ مِنَ الطَّعَامِ؟',
        translit: 'An-nādilu: marḥaban bikum fī maṭʿaminā! Mādhā tufaḍḍilūna mina ṭ-ṭaʿām?',
        translation: 'Pelayan: Selamat datang di restoran kami! Menu makanan apakah yang Anda sukai?',
        words: [
          { ar: 'النَّادِلُ', mean: 'pelayan restoran' },
          { ar: 'مَرْحَبًا', mean: 'selamat datang' },
          { ar: 'فِي', mean: 'di' },
          { ar: 'مَطْعَمِنَا', mean: 'restoran kami' },
          { ar: 'مَاذَا', mean: 'apa yang' },
          { ar: 'تُفَضِّلُونَ', mean: 'kalian sukai / pilih' },
          { ar: 'الطَّعَامِ', mean: 'makanan' }
        ]
      },
      {
        ar: 'الزَّبُونُ: نُرِيدُ أَرُزًّا مَعَ لَحْمِ الخَرُوفِ المَشْوِيِّ وَشَايًا بِالنَّعْنَاعِ.',
        translit: 'Az-zabūnu: nurīdu aruzzan maʿa laḥmi l-kharūfi l-masywiyyi wa-syāyan bi-n-naʿnāʿ.',
        translation: 'Pelanggan: Kami memesan nasi kebuli bersama daging domba panggang dan teh aroma daun mint segar.',
        words: [
          { ar: 'الزَّبُونُ', mean: 'pelanggan / pembeli' },
          { ar: 'نُرِيدُ', mean: 'kami menginginkan' },
          { ar: 'أَرُزًّا', mean: 'nasi' },
          { ar: 'لَحْمِ', mean: 'daging' },
          { ar: 'الخَرُوفِ', mean: 'domba' },
          { ar: 'المَشْوِيِّ', mean: 'panggang / bakar' },
          { ar: 'شَايًا', mean: 'teh' },
          { ar: 'النَّعْنَاعِ', mean: 'daun mint segar' }
        ]
      }
    ],
    quiz: [
      {
        question: 'Minuman apakah yang dipesan oleh sang pelanggan?',
        options: [
          { text: 'Teh beraroma daun mint (شَايًا بِالنَّعْنَاع)', correct: true, explanation: 'Benar! "Syāyan bi-n-naʿnāʿ" adalah teh khas tradisi Arab.' },
          { text: 'Kopi hitam tanpa gula', correct: false, explanation: 'Pelanggan memesan teh daun mint.' },
          { text: 'Air es buah mangga', correct: false, explanation: 'Tidak dipesan dalam dialog di atas.' }
        ]
      }
    ]
  },

  // --- LEVEL 3: Menengah Lanjut (Penuntut Ilmu & Perjalanan) ---
  {
    id: 'read_4',
    title: 'طَالِبُ العِلْمِ فِي المَكْتَبَة (Penuntut Ilmu di Perpustakaan)',
    level: 3,
    theme: 'Pendidikan & Baitul Hikmah',
    icon: '📚',
    summary: 'Adab mulia penuntut ilmu saat mencari referensi naskah sejarah Islam di baitul hikmah.',
    paragraphs: [
      {
        ar: 'دَخَلَ زَيْدٌ مَكْتَبَةَ المَدْرَسَةِ بِهُدُوءٍ وَاحْتِرَامٍ لِأَهْلِ العِلْمِ.',
        translit: 'Dakhala Zayd maktabata l-madrasati bi-hudūʾin wa-ḥtirāmin li-ahli l-ʿilm.',
        translation: 'Zaid memasuki perpustakaan sekolah dengan tenang dan penuh rasa hormat kepada para pencari ilmu.',
        words: [
          { ar: 'دَخَلَ', mean: 'telah masuk' },
          { ar: 'زَيْدٌ', mean: 'Zaid' },
          { ar: 'مَكْتَبَةَ', mean: 'perpustakaan' },
          { ar: 'المَدْرَسَةِ', mean: 'sekolah' },
          { ar: 'بِهُدُوءٍ', mean: 'dengan tenang' },
          { ar: 'وَاحْتِرَامٍ', mean: 'dan rasa hormat' },
          { ar: 'العِلْمِ', mean: 'ilmu pengetahuan' }
        ]
      },
      {
        ar: 'بَحَثَ فِي الرُّفُوفِ عَنْ كُتُبِ التَّارِيخِ الإِسْلَامِيِّ لِيَكْتُبَ بَحْثًا عِلْمِيًّا نَافِعًا.',
        translit: 'Baḥatha fī r-rufūfi ʿan kutubi t-tārīkhi l-Islāmiyyi li-yaktuba baḥthan ʿilmiyyan nāfiʿā.',
        translation: 'Ia mencari di antara deretan rak buku tentang sejarah Islam guna menyusun risalah ilmiah yang berfaedah.',
        words: [
          { ar: 'بَحَثَ', mean: 'dia mencari' },
          { ar: 'فِي', mean: 'di' },
          { ar: 'الرُّفُوفِ', mean: 'rak-rak buku' },
          { ar: 'عَنْ', mean: 'tentang' },
          { ar: 'كُتُبِ', mean: 'buku-buku' },
          { ar: 'التَّارِيخِ', mean: 'sejarah' },
          { ar: 'الإِسْلَامِيِّ', mean: 'Islam' },
          { ar: 'لِيَكْتُبَ', mean: 'agar dia menulis' },
          { ar: 'بَحْثًا', mean: 'risalah / karya tulis' },
          { ar: 'عِلْمِيًّا', mean: 'ilmiah' },
          { ar: 'نَافِعًا', mean: 'yang bermanfaat' }
        ]
      }
    ],
    quiz: [
      {
        question: 'Apakah tujuan utama Zaid mencari buku sejarah Islam di rak perpustakaan?',
        options: [
          { text: 'Menulis risalah penelitian ilmiah yang bermanfaat (بَحْثًا نَافِعًا)', correct: true, explanation: 'Tepat! "Li-yaktuba baḥthan ʿilmiyyan nāfiʿā".' },
          { text: 'Membeli buku untuk dijual kembali di pasar', correct: false, explanation: 'Zaid adalah murid yang sedang meneliti, bukan pedagang buku.' },
          { text: 'Menggambar sampul buku naskah', correct: false, explanation: 'Tujuannya adalah menulis karya risalah ilmiah.' }
        ]
      }
    ]
  },
  {
    id: 'read_9',
    title: 'رِحْلَةٌ إِلَى الجَبَلِ الأَخْضَر (Ekspedisi ke Lembah Hijau)',
    level: 3,
    theme: 'Petualangan & Alam',
    icon: '⛰️',
    summary: 'Catatan perjalanan penjelajah muda melintasi lembah subur dan membaca tanda kebesaran Sang Pencipta.',
    paragraphs: [
      {
        ar: 'سَافَرَ الرَّحَّالَةُ الشَّابُّ نَحْوَ الجَبَلِ الأَخْضَرِ مُتَأَمِّلًا فِي جَمَالِ الخَلْقِ.',
        translit: 'Sāfara r-raḥḥālatu sy-syābbu naḥwa l-jabali l-akhḍari mutaʾammilan fī jamāli l-khalq.',
        translation: 'Pengembara muda itu bepergian menuju Gunung Hijau sembari bertafakur merenungi keindahan ciptaan Sang Maha Kuasa.',
        words: [
          { ar: 'سَافَرَ', mean: 'melakukan perjalanan' },
          { ar: 'الرَّحَّالَةُ', mean: 'sang pengembara' },
          { ar: 'الشَّابُّ', mean: 'pemuda' },
          { ar: 'نَحْوَ', mean: 'menuju ke arah' },
          { ar: 'الجَبَلِ', mean: 'gunung' },
          { ar: 'الأَخْضَرِ', mean: 'hijau asri' },
          { ar: 'مُتَأَمِّلًا', mean: 'sambil bertafakur' },
          { ar: 'جَمَالِ', mean: 'keindahan' },
          { ar: 'الخَلْقِ', mean: 'ciptaan semesta' }
        ]
      },
      {
        ar: 'فِي قِمَّةِ الجَبَلِ، رَأَى سُحُبًا بَيْضَاءَ تَمُرُّ كَأَنَّهَا قِطَارٌ مِنَ الحَرِيرِ.',
        translit: 'Fī qimmati l-jabali, raʾā suḥuban bayḍāʾa tamurru ka-annahā qiṭārun mina l-ḥarīr.',
        translation: 'Di puncak gunung, ia menyaksikan gumpalan awan putih berarak laksana jalinan kereta sutra yang memesona.',
        words: [
          { ar: 'فِي', mean: 'di' },
          { ar: 'قِمَّةِ', mean: 'puncak' },
          { ar: 'الجَبَلِ', mean: 'gunung' },
          { ar: 'رَأَى', mean: 'ia melihat' },
          { ar: 'سُحُبًا', mean: 'awan-awan' },
          { ar: 'بَيْضَاءَ', mean: 'putih' },
          { ar: 'تَمُرُّ', mean: 'melintas' },
          { ar: 'قِطَارٌ', mean: 'kereta' },
          { ar: 'الحَرِيرِ', mean: 'sutra' }
        ]
      }
    ],
    quiz: [
      {
        question: 'Diumpamakan seperti apakah awan putih yang melintas di puncak gunung?',
        options: [
          { text: 'Laksana kereta yang terbuat dari kain sutra (قِطَار مِنَ الحَرِير)', correct: true, explanation: 'Benar! Penulis menggambarkan awan lembut laksana kereta sutra berarak.' },
          { text: 'Laksana benteng besi hitam', correct: false, explanation: 'Teks menyebutkan warna putih selembut sutra (bayḍāʾ mina l-ḥarīr).' },
          { text: 'Laksana kobaran api membara', correct: false, explanation: 'Metafora tersebut tidak terdapat dalam wacana.' }
        ]
      }
    ]
  },

  // --- LEVEL 4: Mahir Awal (Artikel Sejarah Sains & Baitul Hikmah) ---
  {
    id: 'read_10',
    title: 'بَيْتُ الحِكْمَةِ وَعَصْرُ التَّرْجَمَة (Baitul Hikmah & Era Keemasan Sains)',
    level: 4,
    theme: 'Sejarah Peradaban Islam',
    icon: '🏛️',
    summary: 'Artikel informatif tentang Baitul Hikmah di Baghdad sebagai pusat sains dan penerjemahan ilmu pengetahuan dunia.',
    paragraphs: [
      {
        ar: 'أَسَّسَ الخَلِيفَةُ هَارُونُ الرَّشِيدُ "بَيْتَ الحِكْمَةِ" فِي بَغْدَادَ، فَكَانَ أَعْظَمَ مَرْكَزٍ لِلْعِلْمِ فِي العَصْرِ العَبَّاسِيِّ.',
        translit: 'Assasa l-khalīfatu Hārūnu r-Rasyīdu "Bayta l-Ḥikmati" fī Baghdād, fa-kāna aʿẓama markazin li-l-ʿilmi fī l-ʿaṣri l-ʿAbbāsiyy.',
        translation: 'Khalifah Harun Ar-Rasyid mendirikan "Baitul Hikmah" di Baghdad, menjadikannya pusat sains teragung pada era kekhalifahan Abbasiyah.',
        words: [
          { ar: 'أَسَّسَ', mean: 'telah mendirikan' },
          { ar: 'الخَلِيفَةُ', mean: 'khalifah' },
          { ar: 'بَيْتَ الحِكْمَةِ', mean: 'Baitul Hikmah' },
          { ar: 'بَغْدَادَ', mean: 'Baghdad' },
          { ar: 'أَعْظَمَ', mean: 'paling agung / terbesar' },
          { ar: 'مَرْكَزٍ', mean: 'pusat / sentra' },
          { ar: 'العَصْرِ', mean: 'era / zaman' }
        ]
      },
      {
        ar: 'تَرْجَمَ العُلَمَاءُ فِيهِ كُتُبَ الفَلَكِ وَالطِّبِّ وَالرِّيَاضِيَّاتِ، وَأَضَافُوا إِلَيْهَا ابْتِكَارَاتٍ جَدِيدَةً أَنَارَتْ طَرِيقَ الإِنْسَانِيَّةِ.',
        translit: 'Tarjama l-ʿulamāʾu fīhi kutuba l-falaki wa-ṭ-ṭibbi wa-r-riyāḍiyyāt, wa-aḍāfū ilayhā btikārātin jadīdatan anārat ṭarīqa l-insāniyyah.',
        translation: 'Para ilmuwan menerjemahkan buku-buku astronomi, kedokteran, dan matematika, serta menambahkan penemuan orisinal yang menerangi peradaban umat manusia.',
        words: [
          { ar: 'تَرْجَمَ', mean: 'menerjemahkan' },
          { ar: 'العُلَمَاءُ', mean: 'para ilmuwan / ulama' },
          { ar: 'الفَلَكِ', mean: 'astronomi' },
          { ar: 'الطِّبِّ', mean: 'kedokteran' },
          { ar: 'الرِّيَاضِيَّاتِ', mean: 'matematika' },
          { ar: 'ابْتِكَارَاتٍ', mean: 'inovasi / penemuan baru' },
          { ar: 'أَنَارَتْ', mean: 'telah menerangi' },
          { ar: 'الإِنْسَانِيَّةِ', mean: 'kemanusiaan / peradaban' }
        ]
      }
    ],
    quiz: [
      {
        question: 'Di kota manakah institusi Baitul Hikmah yang legendaris didirikan?',
        options: [
          { text: 'Baghdad (بَغْدَاد)', correct: true, explanation: 'Tepat! Baitul Hikmah berpusat di kota Baghdad pada masa keemasan Daulah Abbasiyah.' },
          { text: 'Kordoba di Spanyol', correct: false, explanation: 'Kordoba adalah pusat peradaban di Andalusia, bukan lokasi Baitul Hikmah.' },
          { text: 'Konstantinopel', correct: false, explanation: 'Baitul Hikmah berada di ibu kota Abbasiyah, Baghdad.' }
        ]
      },
      {
        question: 'Bidang ilmu apa sajakah yang diterjemahkan dan dikembangkan para ulama di Baitul Hikmah?',
        options: [
          { text: 'Astronomi, kedokteran, dan matematika (الفَلَك وَالطِّبّ وَالرِّيَاضِيَّات)', correct: true, explanation: 'Mumtaz! Wacana menyebutkan ketiga pilar sains tersebut.' },
          { text: 'Ilmu sihir dan perdukunan kuno', correct: false, explanation: 'Baitul Hikmah fokus pada sains rasional empiris dan literatur hikmah.' },
          { text: 'Hanya tata cara berburu burung', correct: false, explanation: 'Bukan, risalah sains Baitul Hikmah bersifat universal dan ensiklopedis.' }
        ]
      }
    ]
  },

  // --- LEVEL 5: Mahir Lanjut (Turats & Syi'ir Mahfuzhat Klasik) ---
  {
    id: 'read_5',
    title: 'دِيوَانُ الحِكْمَةِ لِلإِمَامِ الشَّافِعِيّ (Untaian Nasihat Mahfuzhat Klasik)',
    level: 5,
    theme: 'Sastra & Syi\'ir Mahfuzhat',
    icon: '📜',
    summary: 'Bait nasihat mahfuzhat klasik tentang manisnya buah ketekunan dan mahalnya kehormatan ilmu.',
    paragraphs: [
      {
        ar: 'مَنْ لَمْ يَذُقْ مُرَّ التَّعَلُّمِ سَاعَةً، تَجَرَّعَ ذُلَّ الجَهْلِ طُولَ حَيَاتِهِ.',
        translit: 'Man lam yadhuq murra t-taʿallumi sāʿatan, tajarraʿa dzulla l-jahli ṭūla ḥayātih.',
        translation: 'Barangsiapa belum mencicipi pahitnya menuntut ilmu sejenak, ia akan meneguk hinanya kebodohan sepanjang hayatnya.',
        words: [
          { ar: 'مَنْ', mean: 'barangsiapa' },
          { ar: 'لَمْ يَذُقْ', mean: 'belum merasakan' },
          { ar: 'مُرَّ', mean: 'pahitnya' },
          { ar: 'التَّعَلُّمِ', mean: 'belajar / menuntut ilmu' },
          { ar: 'سَاعَةً', mean: 'sesaat / sejenak' },
          { ar: 'تَجَرَّعَ', mean: 'ia meneguk' },
          { ar: 'ذُلَّ', mean: 'kehinaan' },
          { ar: 'الجَهْلِ', mean: 'kebodohan' },
          { ar: 'طُولَ حَيَاتِهِ', mean: 'sepanjang umurnya' }
        ]
      },
      {
        ar: 'وَمَنْ فَاتَهُ التَّعْلِيمُ وَقْتَ شَبَابِهِ، فَكَبِّرْ عَلَيْهِ أَرْبَعًا لِوَفَاتِهِ.',
        translit: 'Wa-man fātahu t-taʿlīmu waqta syabābihi, fa-kabbir ʿalayhi arbaʿan li-wafātih.',
        translation: 'Dan barangsiapa luput dari belajar di masa mudanya, maka bertakbirlah empat kali atas kematian jiwanya.',
        words: [
          { ar: 'وَمَنْ', mean: 'dan barangsiapa' },
          { ar: 'فَاتَهُ', mean: 'luput darinya' },
          { ar: 'التَّعْلِيمُ', mean: 'pendidikan' },
          { ar: 'وَقْتَ', mean: 'pada waktu' },
          { ar: 'شَبَابِهِ', mean: 'masa mudanya' },
          { ar: 'فَكَبِّرْ', mean: 'maka bertakbirlah' },
          { ar: 'أَرْبَعًا', mean: 'empat kali (shalat jenazah)' },
          { ar: 'لِوَفَاتِهِ', mean: 'atas kematiannya' }
        ]
      }
    ],
    quiz: [
      {
        question: 'Apakah konsekuensi bagi orang yang enggan bersabar menanggung kepayahan menuntut ilmu?',
        options: [
          { text: 'Akan meneguk hinanya kebodohan sepanjang hidupnya (تَجَرَّعَ ذُلَّ الجَهْل)', correct: true, explanation: 'Benar! Imam Syafi\'i mengingatkan: "Tajarraʿa dzulla l-jahli ṭūla ḥayātih".' },
          { text: 'Akan menjadi saudagar kaya raya tanpa belajar', correct: false, explanation: 'Syair menegaskan bahwa kebodohan membawa kehinaan abadi.' },
          { text: 'Akan terbebas dari segala tugas', correct: false, explanation: 'Bukan, ia merugi seumur hidupnya.' }
        ]
      },
      {
        question: 'Makna kiasan apakah yang dimaksud dengan "bertakbir empat kali atas kematiannya" pada bait kedua?',
        options: [
          { text: 'Kiasan shalat jenazah bagi jiwa yang mati karena mengabaikan ilmu di masa muda', correct: true, explanation: 'Mumtaz! Bertakbir 4 kali adalah rukun shalat jenazah, mengisyaratkan matinya ruh dan masa depan seseorang yang menyia-nyiakan masa mudanya.' },
          { text: 'Ajakan merayakan kemenangan perang', correct: false, explanation: 'Takbir 4 kali di sini merujuk pada shalat jenazah.' },
          { text: 'Perintah untuk menaiki menara masjid', correct: false, explanation: 'Ini metafora sastrawi tinggi tentang kerugian intelektual.' }
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
