export type IslandId = 'HRF' | 'MFR' | 'HWR' | 'QWD' | 'IST' | 'QRA' | 'KTB' | 'KLM' | 'TMH';

export type AudienceType = 'A' | 'D' | 'AD'; // A: Anak, D: Dewasa, AD: Keduanya

export type ModalityType = 'R' | 'P' | 'L' | 'W'; // Recognition, Production, Listening, Writing

export type RutbahType = 'Musafir' | 'Thalib' | 'Rahhal' | 'Qari' | 'Katib' | 'Adib';

export type HudhudStage = 'Egg' | 'Baby' | 'Young' | 'Explorer' | 'Scribe' | 'Guardian' | 'Master';

export interface Island {
  id: IslandId;
  name_ar: string;
  name_id: string;
  domain: string;
  biome3D: string;
  crystalName: string;
  crystalColor: string;
  crystalIconColor: string;
  badgeBg: string;
  description: string;
  minLevel: number; // 0 for J0, 1 for J1...
  skillCount: number;
}

export interface SkillRule {
  title: string;
  explanation: string;
  exampleAr?: string;
  exampleTranslit?: string;
  exampleId?: string;
}

export interface SkillExplanation {
  conceptTitle: string; // Judul konsep yang mudah dipahami
  overview: string; // Penjelasan bahasa manusia yang santai dan jelas
  rules: SkillRule[]; // Kaidah/rumus penting
  hudhudTips?: string; // Tips trik dari Hudhud
  keyVocabOrPhrases?: {
    ar: string;
    translit: string;
    id: string;
    type?: string;
  }[];
}

export interface PracticeQuestion {
  id: string;
  question: string;
  questionAr?: string;
  options: {
    text: string;
    isCorrect: boolean;
    feedback?: string;
  }[];
  hint?: string;
}

export interface SkillItem {
  skill_id: string;
  owner_island: IslandId;
  level: number; // 0 to 5
  name: string;
  description: string;
  audience: AudienceType;
  scope: string;
  icon?: string;
  explanation?: SkillExplanation;
  customQuestions?: PracticeQuestion[];
}

export interface Lexeme {
  id: string;
  ar_vocalized: string;
  ar_plain: string;
  translit: string;
  gloss_id: string; // terjemahan Indonesia
  owner_island: IslandId;
  level: number;
  skill_id: string;
  pos: 'isim' | 'fiil' | 'harf' | 'phrase' | 'huruf';
  category: string;
  audio_hint?: string;
  visual_hint?: string;
}

export interface DialogueNode {
  id: string;
  speaker: string;
  speakerName: string;
  ar: string;
  translit: string;
  id_translation: string;
  choices: {
    ar: string;
    translit: string;
    id_translation: string;
    score: number;
    feedback?: string;
    nextId?: string;
  }[];
}

export interface CompanionTraits {
  lisan: number; // Bicara
  sam: number; // Menyimak
  qiraah: number; // Membaca
  kitabah: number; // Menulis
  lughah: number; // Kosakata & Kaidah
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: 'ari' | 'aira' | 'kustom';
  audience: 'child' | 'adult';
  level: number; // 0 (J0) - 5 (J5)
  rutbah: RutbahType;
  xp: number;
  stars: number;
  crystals: Record<IslandId, boolean>;
  hudhudStage: HudhudStage;
  hudhudTraits: CompanionTraits;
  hudhudEggCracks: number; // 0 to 3 before hatching
  dailyStreak: number;
  lastActiveDate: string;
  skillsMastered: string[]; // skill_ids
  wordsMastered: string[]; // lexeme ids
  difficultWords: string[]; // lexeme ids needing review (Buku Kata Sulit)
  companionRoomDecorations: string[];
  achievements?: string[]; // unlocked achievement IDs
  dailyMissionsCompletedCount?: number; // total daily missions completed
  iqraProgress?: {
    currentJilid: number; // 1 - 6
    masteredCards: string[];
    starsEarned: number;
    completedPages?: string[]; // e.g. ['iq1_p1', 'iq1_p2']
    pageStars?: Record<string, number>;
    lastReadPageId?: string;
    totalWordsRead?: number;
  };
  streakShields?: number; // Pelindung streak aktif
  lastStreakClaimDate?: string;
  dailyAdabCompleted?: string[]; // list of adab IDs completed today
  adabBarakahPoints?: number; // Poin berkah adab
  dailyTargetChestClaimedDate?: string;
  dailyReadingCount?: number; // kata/huruf iqra dibaca hari ini
  dailyMinutesCount?: number; // menit belajar hari ini
}

export interface LeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  avatar: string;
  rutbah: RutbahType;
  hudhudStage: HudhudStage;
  xp: number;
  stars: number;
  level: number;
  isCurrentUser?: boolean;
}
