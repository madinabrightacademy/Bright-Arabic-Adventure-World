import { UserProfile, IslandId, RutbahType, HudhudStage, CompanionTraits, LeaderboardEntry } from '../types/game';
import { INITIAL_LEADERBOARD } from '../data/curriculum';

const STORAGE_KEY = 'brightoria_lisan_profile_v1';
const LEADERBOARD_KEY = 'brightoria_lisan_leaderboard_v1';

export const DEFAULT_PROFILE: UserProfile = {
  id: 'usr_me',
  name: 'Petualang Cilik',
  avatar: 'ari',
  audience: 'child',
  level: 0,
  rutbah: 'Musafir',
  xp: 320,
  stars: 12,
  crystals: {
    HRF: true,
    MFR: false,
    HWR: false,
    QWD: false,
    IST: false,
    QRA: false,
    KTB: false,
    KLM: false,
    TMH: false
  },
  hudhudStage: 'Egg',
  hudhudEggCracks: 1, // Ready to hatch soon!
  hudhudTraits: {
    lisan: 15,
    sam: 20,
    qiraah: 25,
    kitabah: 10,
    lughah: 20
  },
  dailyStreak: 3,
  lastActiveDate: new Date().toISOString().split('T')[0],
  skillsMastered: ['HRF-L0-01', 'MFR-L0-01'],
  wordsMastered: ['lx_alif', 'lx_baa', 'lx_wahid'],
  difficultWords: ['lx_tsaa', 'lx_asyarah'],
  companionRoomDecorations: ['lampu_maroko', 'karpet_emas']
};

export class GameStorage {
  public static getProfile(): UserProfile {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch {
      // ignore
    }
    return DEFAULT_PROFILE;
  }

  public static saveProfile(profile: UserProfile): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {
      // ignore
    }
  }

  public static addReward(xpDelta: number, starsDelta: number, trait?: keyof CompanionTraits, traitDelta: number = 5): UserProfile {
    const profile = this.getProfile();
    profile.xp += xpDelta;
    profile.stars += starsDelta;

    if (trait) {
      profile.hudhudTraits[trait] = Math.min(100, (profile.hudhudTraits[trait] || 0) + traitDelta);
    }

    // Check Egg hatching
    if (profile.hudhudStage === 'Egg') {
      profile.hudhudEggCracks = Math.min(3, profile.hudhudEggCracks + 1);
      if (profile.hudhudEggCracks >= 3 && profile.xp >= 350) {
        profile.hudhudStage = 'Baby';
      }
    }

    this.saveProfile(profile);
    this.updateLeaderboardForUser(profile);
    return profile;
  }

  public static unlockCrystal(islandId: IslandId): UserProfile {
    const profile = this.getProfile();
    profile.crystals[islandId] = true;
    this.saveProfile(profile);
    return profile;
  }

  public static markWordLearned(wordId: string): UserProfile {
    const profile = this.getProfile();
    if (!profile.wordsMastered.includes(wordId)) {
      profile.wordsMastered.push(wordId);
    }
    // Remove from difficult words if mastered
    profile.difficultWords = profile.difficultWords.filter(id => id !== wordId);
    this.saveProfile(profile);
    return profile;
  }

  public static markWordDifficult(wordId: string): UserProfile {
    const profile = this.getProfile();
    if (!profile.difficultWords.includes(wordId)) {
      profile.difficultWords.push(wordId);
    }
    this.saveProfile(profile);
    return profile;
  }

  public static promoteRutbah(newRutbah: RutbahType, newLevel: number, newStage: HudhudStage): UserProfile {
    const profile = this.getProfile();
    profile.rutbah = newRutbah;
    profile.level = newLevel;
    profile.hudhudStage = newStage;
    profile.xp += 500;
    profile.stars += 25;
    this.saveProfile(profile);
    this.updateLeaderboardForUser(profile);
    return profile;
  }

  public static getLeaderboard(): LeaderboardEntry[] {
    try {
      const data = localStorage.getItem(LEADERBOARD_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch {
      // ignore
    }
    // Add current user to leaderboard
    const profile = this.getProfile();
    const list = [...INITIAL_LEADERBOARD, {
      id: profile.id,
      rank: 4,
      name: profile.name,
      avatar: profile.avatar,
      rutbah: profile.rutbah,
      hudhudStage: profile.hudhudStage,
      xp: profile.xp,
      stars: profile.stars,
      level: profile.level,
      isCurrentUser: true
    }];

    list.sort((a, b) => b.xp - a.xp);
    return list.map((item, idx) => ({ ...item, rank: idx + 1, isCurrentUser: item.id === profile.id }));
  }

  public static updateLeaderboardForUser(profile: UserProfile): void {
    const list = this.getLeaderboard();
    const existingIdx = list.findIndex(e => e.id === profile.id);
    const myEntry: LeaderboardEntry = {
      id: profile.id,
      rank: 1,
      name: profile.name,
      avatar: profile.avatar,
      rutbah: profile.rutbah,
      hudhudStage: profile.hudhudStage,
      xp: profile.xp,
      stars: profile.stars,
      level: profile.level,
      isCurrentUser: true
    };

    if (existingIdx >= 0) {
      list[existingIdx] = myEntry;
    } else {
      list.push(myEntry);
    }

    list.sort((a, b) => b.xp - a.xp);
    const sorted = list.map((item, idx) => ({ ...item, rank: idx + 1 }));
    try {
      localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(sorted));
    } catch {
      // ignore
    }
  }
}
