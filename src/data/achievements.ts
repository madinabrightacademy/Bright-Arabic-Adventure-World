import { UserProfile } from '../types/game';

export type AchievementTier = 'bronze' | 'silver' | 'gold' | 'diamond';
export type AchievementCategory = 'all' | 'words' | 'islands' | 'skills' | 'milestones';

export interface AchievementItem {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  category: AchievementCategory;
  badgeIcon: string;
  badgeTier: AchievementTier;
  badgeBg: string;
  badgeBorder: string;
  badgeGlow: string;
  target: number;
  currentProgress: (profile: UserProfile) => number;
  isUnlocked: (profile: UserProfile) => boolean;
  rewardXp: number;
  rewardStars: number;
}

export const ACHIEVEMENTS_CATALOG: AchievementItem[] = [
  // 1. Milestones: Pulau Pertama
  {
    id: 'ach_first_island',
    title: 'Langkah Pertama Penjelajah',
    titleAr: 'الخُطْوَةُ الأُولَى',
    description: 'Selesaikan eksplorasi pulau pertamamu dan peroleh Kristal Pengetahuan perdana (Mutiara Teal).',
    category: 'milestones',
    badgeIcon: '🏝️',
    badgeTier: 'bronze',
    badgeBg: 'from-teal-500 to-cyan-600',
    badgeBorder: 'border-teal-400',
    badgeGlow: 'shadow-teal-500/30',
    target: 1,
    currentProgress: (p) => Object.values(p.crystals).filter(Boolean).length,
    isUnlocked: (p) => Object.values(p.crystals).some(Boolean),
    rewardXp: 50,
    rewardStars: 2
  },

  // 2. Words: 10 Words
  {
    id: 'ach_words_10',
    title: 'Kolektor Kata Pemula',
    titleAr: 'جَامِعُ الكَلِمَاتِ',
    description: 'Kuasai 10 kosakata bahasa Arab dalam Buku Kata pribadimu.',
    category: 'words',
    badgeIcon: '📖',
    badgeTier: 'bronze',
    badgeBg: 'from-amber-500 to-orange-600',
    badgeBorder: 'border-amber-400',
    badgeGlow: 'shadow-amber-500/30',
    target: 10,
    currentProgress: (p) => p.wordsMastered.length,
    isUnlocked: (p) => p.wordsMastered.length >= 10,
    rewardXp: 50,
    rewardStars: 2
  },

  // 3. Words: 25 Words
  {
    id: 'ach_words_25',
    title: 'Pustakawan Cilik',
    titleAr: 'أَمِينُ المَكْتَبَةِ',
    description: 'Kuasai 25 kosakata bahasa Arab dan pahami artinya dengan fasih.',
    category: 'words',
    badgeIcon: '📚',
    badgeTier: 'silver',
    badgeBg: 'from-blue-500 to-indigo-600',
    badgeBorder: 'border-blue-400',
    badgeGlow: 'shadow-blue-500/30',
    target: 25,
    currentProgress: (p) => p.wordsMastered.length,
    isUnlocked: (p) => p.wordsMastered.length >= 25,
    rewardXp: 80,
    rewardStars: 3
  },

  // 4. Words: 50 Words
  {
    id: 'ach_words_50',
    title: 'Kamus Berjalan',
    titleAr: 'مُعْجَمٌ مُتَنَقِّلٌ',
    description: 'Kuasai 50 kosakata Arab dari ragam isim, fi\'il, harf, dan sifat.',
    category: 'words',
    badgeIcon: '🏛️',
    badgeTier: 'gold',
    badgeBg: 'from-amber-400 via-yellow-500 to-orange-500',
    badgeBorder: 'border-yellow-300',
    badgeGlow: 'shadow-yellow-500/40',
    target: 50,
    currentProgress: (p) => p.wordsMastered.length,
    isUnlocked: (p) => p.wordsMastered.length >= 50,
    rewardXp: 120,
    rewardStars: 5
  },

  // 5. Words: 100 Words Mastered (Explicit user milestone request: Learned 100 Words)
  {
    id: 'ach_words_100',
    title: 'Learned 100 Words (Mahaguru 100 Kosakata)',
    titleAr: 'سَيِّدُ مِئَةِ كَلِمَةٍ',
    description: 'Pencapaian luar biasa! Kuasai 100 kosakata bahasa Arab pilihan lintas pulau dan jenjang.',
    category: 'words',
    badgeIcon: '👑',
    badgeTier: 'diamond',
    badgeBg: 'from-purple-600 via-pink-600 to-amber-500',
    badgeBorder: 'border-amber-300',
    badgeGlow: 'shadow-pink-500/50',
    target: 100,
    currentProgress: (p) => p.wordsMastered.length,
    isUnlocked: (p) => p.wordsMastered.length >= 100,
    rewardXp: 250,
    rewardStars: 10
  },

  // 6. Islands: 4 Islands Unlocked
  {
    id: 'ach_islands_4',
    title: 'Penjelajah Khatulistiwa',
    titleAr: 'رَحَّالُ الأَرْخَبِيلِ',
    description: 'Buka dan jelajahi 4 pulau awal kepulauan bahasa Arab.',
    category: 'islands',
    badgeIcon: '⛵',
    badgeTier: 'silver',
    badgeBg: 'from-emerald-500 to-teal-700',
    badgeBorder: 'border-emerald-300',
    badgeGlow: 'shadow-emerald-500/30',
    target: 4,
    currentProgress: (p) => Object.values(p.crystals).filter(Boolean).length,
    isUnlocked: (p) => Object.values(p.crystals).filter(Boolean).length >= 4,
    rewardXp: 100,
    rewardStars: 4
  },

  // 7. Islands: All 8 Crystals (Finished Archipelago)
  {
    id: 'ach_all_crystals',
    title: 'Penguasa Mahkota 8 Kristal',
    titleAr: 'تَاجُ الجَوَاهِرِ الثَّمَانِيَة',
    description: 'Kumpulkan seluruh 8 Kristal Pengetahuan dari Huruf, Mufradat, Hiwar, Qawa\'id, Istima\', Qira\'ah, Kitabah & Kalam!',
    category: 'islands',
    badgeIcon: '💎',
    badgeTier: 'diamond',
    badgeBg: 'from-amber-400 via-rose-500 to-indigo-600',
    badgeBorder: 'border-yellow-200',
    badgeGlow: 'shadow-yellow-400/50',
    target: 8,
    currentProgress: (p) => Object.values(p.crystals).filter(Boolean).length,
    isUnlocked: (p) => Object.values(p.crystals).filter(Boolean).length >= 8,
    rewardXp: 300,
    rewardStars: 15
  },

  // 8. Skills: Trait Lisan (Kalam & Balaghah)
  {
    id: 'ach_skill_lisan',
    title: 'Lisan Balaghah Fasih',
    titleAr: 'فَصَاحَةُ اللِّسَانِ',
    description: 'Tingkatkan trait Lisan Hudhud mencapai 30 poin melalui latihan makhraj dan berbicara.',
    category: 'skills',
    badgeIcon: '🎙️',
    badgeTier: 'gold',
    badgeBg: 'from-orange-500 to-red-600',
    badgeBorder: 'border-orange-400',
    badgeGlow: 'shadow-orange-500/40',
    target: 30,
    currentProgress: (p) => p.hudhudTraits.lisan || 0,
    isUnlocked: (p) => (p.hudhudTraits.lisan || 0) >= 30,
    rewardXp: 75,
    rewardStars: 3
  },

  // 9. Skills: Trait Sam' (Istima')
  {
    id: 'ach_skill_sam',
    title: 'Penyimak Tajam & Teliti',
    titleAr: 'السَّمْعُ الثَّاقِبُ',
    description: 'Tingkatkan trait Sam\' Hudhud mencapai 30 poin dengan menaklukkan teka-teki Lembah Istima\'.',
    category: 'skills',
    badgeIcon: '🎧',
    badgeTier: 'gold',
    badgeBg: 'from-purple-600 to-indigo-700',
    badgeBorder: 'border-purple-400',
    badgeGlow: 'shadow-purple-500/40',
    target: 30,
    currentProgress: (p) => p.hudhudTraits.sam || 0,
    isUnlocked: (p) => (p.hudhudTraits.sam || 0) >= 30,
    rewardXp: 75,
    rewardStars: 3
  },

  // 10. Skills: Trait Qira'ah
  {
    id: 'ach_skill_qiraah',
    title: 'Pembaca Hikmah Mulia',
    titleAr: 'قَارِئُ الحِكْمَةِ',
    description: 'Tingkatkan trait Qira\'ah Hudhud mencapai 35 poin lewat naskah Perpustakaan Qira\'ah.',
    category: 'skills',
    badgeIcon: '📜',
    badgeTier: 'gold',
    badgeBg: 'from-rose-600 to-red-700',
    badgeBorder: 'border-rose-400',
    badgeGlow: 'shadow-rose-500/40',
    target: 35,
    currentProgress: (p) => p.hudhudTraits.qiraah || 0,
    isUnlocked: (p) => (p.hudhudTraits.qiraah || 0) >= 35,
    rewardXp: 80,
    rewardStars: 3
  },

  // 11. Skills: Trait Kitabah
  {
    id: 'ach_skill_kitabah',
    title: 'Goresan Tinta Emas',
    titleAr: 'مِدَادُ الذَّهَبِ',
    description: 'Tingkatkan trait Kitabah Hudhud mencapai 25 poin lewat tantangan dikte imla\' dan kaligrafi.',
    category: 'skills',
    badgeIcon: '🖋️',
    badgeTier: 'silver',
    badgeBg: 'from-amber-600 to-yellow-600',
    badgeBorder: 'border-amber-400',
    badgeGlow: 'shadow-amber-500/30',
    target: 25,
    currentProgress: (p) => p.hudhudTraits.kitabah || 0,
    isUnlocked: (p) => (p.hudhudTraits.kitabah || 0) >= 25,
    rewardXp: 75,
    rewardStars: 3
  },

  // 12. Milestones: Hudhud Hatching
  {
    id: 'ach_hudhud_hatch',
    title: 'Kelahiran Sahabat Setia',
    titleAr: 'وِلَادَةُ الصَّدِيقِ',
    description: 'Evolusikan telur burung Hudhud hingga menetas menjadi Baby Hudhud yang lincah.',
    category: 'milestones',
    badgeIcon: '🐣',
    badgeTier: 'silver',
    badgeBg: 'from-teal-400 to-emerald-600',
    badgeBorder: 'border-teal-300',
    badgeGlow: 'shadow-teal-400/30',
    target: 1,
    currentProgress: (p) => p.hudhudStage !== 'Egg' ? 1 : p.hudhudEggCracks >= 3 ? 1 : 0,
    isUnlocked: (p) => p.hudhudStage !== 'Egg' || p.hudhudEggCracks >= 3,
    rewardXp: 60,
    rewardStars: 3
  },

  // 13. Streak: 3 Days
  {
    id: 'ach_streak_3',
    title: 'Api Keistiqamahan 3 Hari',
    titleAr: 'شُعْلَةُ الاِسْتِقَامَةِ',
    description: 'Pertahankan Daily Streak berturut-turut minimal 3 hari belajar.',
    category: 'milestones',
    badgeIcon: '🔥',
    badgeTier: 'bronze',
    badgeBg: 'from-orange-500 to-amber-600',
    badgeBorder: 'border-orange-400',
    badgeGlow: 'shadow-orange-500/30',
    target: 3,
    currentProgress: (p) => p.dailyStreak || 0,
    isUnlocked: (p) => (p.dailyStreak || 0) >= 3,
    rewardXp: 40,
    rewardStars: 2
  },

  // 14. Streak: 5 Days (Explicit user milestone request: 5-Day Streak)
  {
    id: 'ach_streak_5',
    title: '5-Day Streak (Api Istiqamah 5 Hari)',
    titleAr: 'شُعْلَةُ الأَيَّامِ الخَمْسَة',
    description: 'Buktikan keistiqamahan sejati dengan konsisten belajar 5 hari berturut-turut tanpa jeda!',
    category: 'milestones',
    badgeIcon: '🔥',
    badgeTier: 'gold',
    badgeBg: 'from-amber-500 via-orange-500 to-red-600',
    badgeBorder: 'border-amber-300',
    badgeGlow: 'shadow-orange-500/40',
    target: 5,
    currentProgress: (p) => p.dailyStreak || 0,
    isUnlocked: (p) => (p.dailyStreak || 0) >= 5,
    rewardXp: 80,
    rewardStars: 4
  },

  // 15. Streak: 7 Days
  {
    id: 'ach_streak_7',
    title: 'Pilar Ketekunan Sepekan',
    titleAr: 'رُكْنُ المُثَابَرَةِ',
    description: 'Belajar istiqamah selama 7 hari tanpa terputus!',
    category: 'milestones',
    badgeIcon: '⚡',
    badgeTier: 'gold',
    badgeBg: 'from-amber-500 via-orange-600 to-rose-600',
    badgeBorder: 'border-amber-300',
    badgeGlow: 'shadow-orange-500/40',
    target: 7,
    currentProgress: (p) => p.dailyStreak || 0,
    isUnlocked: (p) => (p.dailyStreak || 0) >= 7,
    rewardXp: 100,
    rewardStars: 5
  },

  // 15. Stars: 50 Stars
  {
    id: 'ach_stars_50',
    title: 'Rasi Bintang Hikmah',
    titleAr: 'كَوْكَبَةُ النُّجُومِ',
    description: 'Kumpulkan total 50 Bintang emas dari permainan dan kuis.',
    category: 'milestones',
    badgeIcon: '⭐',
    badgeTier: 'silver',
    badgeBg: 'from-yellow-400 to-amber-500',
    badgeBorder: 'border-yellow-300',
    badgeGlow: 'shadow-yellow-400/40',
    target: 50,
    currentProgress: (p) => p.stars || 0,
    isUnlocked: (p) => (p.stars || 0) >= 50,
    rewardXp: 80,
    rewardStars: 4
  },

  // 16. XP: 1000 XP
  {
    id: 'ach_xp_1000',
    title: 'Pendekar 1000 XP',
    titleAr: 'فَارِسُ الأَلْفِ نُقْطَة',
    description: 'Capai total perolehan 1000 XP petualangan bahasa Arab.',
    category: 'milestones',
    badgeIcon: '🏆',
    badgeTier: 'diamond',
    badgeBg: 'from-indigo-600 via-purple-600 to-pink-600',
    badgeBorder: 'border-purple-300',
    badgeGlow: 'shadow-indigo-500/50',
    target: 1000,
    currentProgress: (p) => p.xp || 0,
    isUnlocked: (p) => (p.xp || 0) >= 1000,
    rewardXp: 150,
    rewardStars: 5
  },

  // 17. Milestones: 10 Misi Harian Selesai (Explicit User Request)
  {
    id: 'ach_daily_missions_10',
    title: 'Pahlawan 10 Misi Harian',
    titleAr: 'بَطَلُ العَشْرِ مَهَامّ',
    description: 'Buktikan kedisiplinan belajarmu dengan menuntaskan 10 misi harian mini-game!',
    category: 'milestones',
    badgeIcon: '🎯',
    badgeTier: 'gold',
    badgeBg: 'from-amber-400 via-orange-500 to-amber-600',
    badgeBorder: 'border-amber-300',
    badgeGlow: 'shadow-orange-500/40',
    target: 10,
    currentProgress: (p) => p.dailyMissionsCompletedCount || 0,
    isUnlocked: (p) => (p.dailyMissionsCompletedCount || 0) >= 10,
    rewardXp: 150,
    rewardStars: 5
  },

  // 18. Islands: Penguasa Pulau Huruf (Tingkat 1 Selesai)
  {
    id: 'ach_island_hrf',
    title: 'Penguasa Pulau Huruf',
    titleAr: 'سَيِّدُ جَزِيرَةِ الحُرُوف',
    description: 'Kuasai modul fonetik huruf hijaiyah Tingkat 1 dan raih Kristal Mutiara Teal.',
    category: 'islands',
    badgeIcon: '🐚',
    badgeTier: 'bronze',
    badgeBg: 'from-teal-500 to-cyan-600',
    badgeBorder: 'border-teal-300',
    badgeGlow: 'shadow-teal-500/30',
    target: 1,
    currentProgress: (p) => p.crystals.HRF ? 1 : 0,
    isUnlocked: (p) => Boolean(p.crystals.HRF),
    rewardXp: 80,
    rewardStars: 3
  },

  // 19. Islands: Saudagar Fasih Pasar Mufradat (Tingkat 2 Selesai)
  {
    id: 'ach_island_mfr',
    title: 'Saudagar Fasih Pasar Mufradat',
    titleAr: 'تَاجِرُ سُوقِ المُفْرَدَات',
    description: 'Kuasai ragam kosakata tematik pasar Tingkat 2 dan raih Kristal Emas-Jingga.',
    category: 'islands',
    badgeIcon: '🛶',
    badgeTier: 'silver',
    badgeBg: 'from-amber-500 to-orange-600',
    badgeBorder: 'border-amber-300',
    badgeGlow: 'shadow-amber-500/30',
    target: 1,
    currentProgress: (p) => p.crystals.MFR ? 1 : 0,
    isUnlocked: (p) => Boolean(p.crystals.MFR),
    rewardXp: 100,
    rewardStars: 4
  },

  // 20. Islands: Duta Ramah Kampung Hiwar (Tingkat 2 Selesai)
  {
    id: 'ach_island_hwr',
    title: 'Duta Ramah Kampung Hiwar',
    titleAr: 'سَفِيرُ قَرْيَةِ الحِوَار',
    description: 'Taklukkan percakapan ramah ta\'aruf warga kampung dan raih Kristal Zamrud Hijau.',
    category: 'islands',
    badgeIcon: '🏘️',
    badgeTier: 'silver',
    badgeBg: 'from-emerald-500 to-green-600',
    badgeBorder: 'border-emerald-300',
    badgeGlow: 'shadow-emerald-500/30',
    target: 1,
    currentProgress: (p) => p.crystals.HWR ? 1 : 0,
    isUnlocked: (p) => Boolean(p.crystals.HWR),
    rewardXp: 100,
    rewardStars: 4
  },

  // 21. Islands: Arsitek Kalimat Gunung Qawa'id (Tingkat 3 Selesai)
  {
    id: 'ach_island_qwd',
    title: 'Arsitek Kalimat Gunung Qawa\'id',
    titleAr: 'مُهَنْدِسُ جَبَلِ القَوَاعِد',
    description: 'Kuasai susunan mudzakkar-muannats & kata tunjuk serta raih Kristal Safir Biru.',
    category: 'islands',
    badgeIcon: '⛰️',
    badgeTier: 'gold',
    badgeBg: 'from-blue-600 to-indigo-700',
    badgeBorder: 'border-blue-300',
    badgeGlow: 'shadow-blue-500/40',
    target: 1,
    currentProgress: (p) => p.crystals.QWD ? 1 : 0,
    isUnlocked: (p) => Boolean(p.crystals.QWD),
    rewardXp: 120,
    rewardStars: 5
  },

  // 22. Islands: Penyimak Sakti Lembah Istima' (Tingkat 3 Selesai)
  {
    id: 'ach_island_ist',
    title: 'Penyimak Sakti Lembah Istima\'',
    titleAr: 'سَمِيعُ وَادِي الِاسْتِمَاع',
    description: 'Pecahkan pantulan suara gema audio penutur asli dan raih Kristal Ametis Ungu.',
    category: 'islands',
    badgeIcon: '👂',
    badgeTier: 'gold',
    badgeBg: 'from-purple-600 to-violet-700',
    badgeBorder: 'border-purple-300',
    badgeGlow: 'shadow-purple-500/40',
    target: 1,
    currentProgress: (p) => p.crystals.IST ? 1 : 0,
    isUnlocked: (p) => Boolean(p.crystals.IST),
    rewardXp: 120,
    rewardStars: 5
  },

  // 23. Islands: Cendekiawan Perpustakaan Qira'ah (Tingkat 4 Selesai)
  {
    id: 'ach_island_qra',
    title: 'Cendekiawan Perpustakaan Qira\'ah',
    titleAr: 'عَالِمُ مَكْتَبَةِ القِرَاءَة',
    description: 'Buka gulungan hikmah dan baca naskah mandiri untuk meraih Kristal Delima Merah.',
    category: 'islands',
    badgeIcon: '📚',
    badgeTier: 'gold',
    badgeBg: 'from-rose-600 to-red-700',
    badgeBorder: 'border-rose-300',
    badgeGlow: 'shadow-rose-500/40',
    target: 1,
    currentProgress: (p) => p.crystals.QRA ? 1 : 0,
    isUnlocked: (p) => Boolean(p.crystals.QRA),
    rewardXp: 140,
    rewardStars: 5
  },

  // 24. Islands: Khatib Emas Pelabuhan Kitabah (Tingkat 5 Selesai)
  {
    id: 'ach_island_ktb',
    title: 'Khatib Emas Pelabuhan Kitabah',
    titleAr: 'خَطَّاطُ مِينَاءِ الكِتَابَة',
    description: 'Kuasai ejaan dikte imla\' presisi ta marbuthah & hamzah dan raih Kristal Tinta Emas.',
    category: 'islands',
    badgeIcon: '⚓',
    badgeTier: 'diamond',
    badgeBg: 'from-yellow-500 via-amber-600 to-orange-600',
    badgeBorder: 'border-amber-300',
    badgeGlow: 'shadow-amber-500/50',
    target: 1,
    currentProgress: (p) => p.crystals.KTB ? 1 : 0,
    isUnlocked: (p) => Boolean(p.crystals.KTB),
    rewardXp: 150,
    rewardStars: 6
  },

  // 25. Islands: Singa Mimbar Pulau Kalam (Tingkat 5 Selesai)
  {
    id: 'ach_island_klm',
    title: 'Singa Mimbar Pulau Kalam',
    titleAr: 'خَطِيبُ جَزِيرَةِ الكَلَام',
    description: 'Taklukkan artikulasi makharijul huruf fasih dan raih Kristal Kecubung Suara Emas.',
    category: 'islands',
    badgeIcon: '🎙️',
    badgeTier: 'diamond',
    badgeBg: 'from-orange-600 via-red-600 to-amber-600',
    badgeBorder: 'border-orange-300',
    badgeGlow: 'shadow-orange-500/50',
    target: 1,
    currentProgress: (p) => p.crystals.KLM ? 1 : 0,
    isUnlocked: (p) => Boolean(p.crystals.KLM),
    rewardXp: 150,
    rewardStars: 6
  },

  // 26. Islands: Jawara Mahkota Kuil Langit (Tingkat 6 Selesai)
  {
    id: 'ach_island_tmh',
    title: 'Jawara Mahkota Kuil Langit',
    titleAr: 'مُتَوَّجُ مَعْبَدِ السَّمَاء',
    description: 'Lulus Ujian Mihrab 4 Keterampilan Terpadu dan raih Mahkota Kelulusan Mutamayyiz!',
    category: 'islands',
    badgeIcon: '👑',
    badgeTier: 'diamond',
    badgeBg: 'from-amber-400 via-yellow-400 to-amber-600',
    badgeBorder: 'border-yellow-200',
    badgeGlow: 'shadow-yellow-400/60',
    target: 1,
    currentProgress: (p) => p.crystals.TMH ? 1 : 0,
    isUnlocked: (p) => Boolean(p.crystals.TMH),
    rewardXp: 300,
    rewardStars: 15
  }
];
