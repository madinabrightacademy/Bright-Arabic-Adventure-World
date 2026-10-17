import { sound } from './sound';
import { GameStorage } from './storage';

export interface DailyMission {
  id: string;
  gameId: string;
  islandId: string;
  islandName: string;
  badgeBg: string;
  title: string;
  description: string;
  targetCount: number;
  currentCount: number;
  xpReward: number;
  starsReward: number;
  icon: string;
  completed: boolean;
  claimed: boolean;
}

const MISSIONS_POOL = [
  {
    gameId: 'sand_trace',
    islandId: 'HRF',
    islandName: 'Pulau Huruf',
    badgeBg: 'bg-teal-600',
    title: 'Gores Jejak Pasir Mutiara',
    description: 'Telusuri huruf hijaiyah di pasir pantai dengan sapuan ombak laut.',
    targetCount: 2,
    xpReward: 60,
    starsReward: 3,
    icon: '🏖️'
  },
  {
    gameId: 'floating_market',
    islandId: 'MFR',
    islandName: 'Pasar Mufradat',
    badgeBg: 'bg-amber-600',
    title: 'Layani Pelanggan Pasar Apung',
    description: 'Antarkan makanan dan minuman Arab sesuai pesanan nakhoda perahu.',
    targetCount: 2,
    xpReward: 55,
    starsReward: 2,
    icon: '🛶'
  },
  {
    gameId: 'sentence_bridge',
    islandId: 'QWD',
    islandName: 'Gunung Qawa\'id',
    badgeBg: 'bg-blue-600',
    title: 'Bangun Jembatan Balok Kalimat',
    description: 'Susun balok mudzakkar dan muannats agar jembatan tebing terhubung kokoh.',
    targetCount: 2,
    xpReward: 65,
    starsReward: 3,
    icon: '⛰️'
  },
  {
    gameId: 'echo_cave',
    islandId: 'IST',
    islandName: 'Lembah Istima\'',
    badgeBg: 'bg-purple-600',
    title: 'Tebak Pantulan Suara Gua Gema',
    description: 'Dengarkan ketukan makhraj audio penutur asli dan pilih kata yang benar.',
    targetCount: 2,
    xpReward: 55,
    starsReward: 2,
    icon: '👂'
  },
  {
    gameId: 'scroll_tap_gloss',
    islandId: 'QRA',
    islandName: 'Perpustakaan Qira\'ah',
    badgeBg: 'bg-rose-700',
    title: 'Buka Gulungan Naskah Bertingkat',
    description: 'Baca naskah berharakat di perpustakaan dan simpan kosa kata pilihan.',
    targetCount: 1,
    xpReward: 50,
    starsReward: 2,
    icon: '📜'
  },
  {
    gameId: 'imla_lighthouse',
    islandId: 'KTB',
    islandName: 'Pelabuhan Kitabah',
    badgeBg: 'bg-yellow-600',
    title: 'Nyalakan Mercusuar Ejaan Dikte',
    description: 'Dengarkan dikte audio dan pilih ejaan ta marbuthah atau hamzah yang tepat.',
    targetCount: 2,
    xpReward: 60,
    starsReward: 3,
    icon: '⚓'
  },
  {
    gameId: 'makhraj_mastery',
    islandId: 'KLM',
    islandName: 'Pulau Kalam',
    badgeBg: 'bg-orange-600',
    title: 'Taklukkan Suara di Mimbar Kalam',
    description: 'Lafalkan makhraj tenggorokan, lidah, atau kalimat salam dengan mikrofon.',
    targetCount: 2,
    xpReward: 65,
    starsReward: 3,
    icon: '🎙️'
  },
  {
    gameId: 'basket_spell',
    islandId: 'MFR',
    islandName: 'Pasar Mufradat',
    badgeBg: 'bg-amber-600',
    title: 'Rangkai Kata di Keranjang Ejaan',
    description: 'Ambil huruf-huruf Arab dari keranjang dan susun menjadi kata benda bergambar.',
    targetCount: 2,
    xpReward: 50,
    starsReward: 2,
    icon: '🧺'
  },
  {
    gameId: 'dialog_quest',
    islandId: 'HWR',
    islandName: 'Kampung Hiwar',
    badgeBg: 'bg-emerald-600',
    title: 'Bercakap-cakap dengan Warga Kampung',
    description: 'Pilih kalimat jawaban santun dalam percakapan dunia nyata dengan warga.',
    targetCount: 1,
    xpReward: 55,
    starsReward: 2,
    icon: '🏘️'
  },
  {
    gameId: 'audio_detective',
    islandId: 'IST',
    islandName: 'Lembah Istima\'',
    badgeBg: 'bg-purple-600',
    title: 'Pecahkan Kasus Detektif Suara',
    description: 'Analisis petunjuk lisan misterius dan temukan saksi atau objek yang dicari.',
    targetCount: 1,
    xpReward: 60,
    starsReward: 3,
    icon: '🔍'
  },
  {
    gameId: 'sky_runner',
    islandId: 'MFR',
    islandName: 'Pasar Mufradat',
    badgeBg: 'bg-amber-600',
    title: 'Meluncur di Pelari Langit Arabi',
    description: 'Gunakan karpet terbang meluncur ke gerbang kata yang benar di udara.',
    targetCount: 2,
    xpReward: 50,
    starsReward: 2,
    icon: '✨'
  }
];

export const DailyMissionsService = {
  getTodayDateString(): string {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  },

  getStorageKey(): string {
    return `brightoria_daily_missions_${this.getTodayDateString()}`;
  },

  getDailyMissions(): DailyMission[] {
    const key = this.getStorageKey();
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        // regenerate
      }
    }

    // Seed 3 pseudo-random missions deterministically based on date string
    const dateStr = this.getTodayDateString();
    let seed = 0;
    for (let i = 0; i < dateStr.length; i++) {
      seed = (seed * 31 + dateStr.charCodeAt(i)) >>> 0;
    }

    const available = [...MISSIONS_POOL];
    const picked: DailyMission[] = [];

    for (let i = 0; i < 3; i++) {
      const idx = (seed + i * 7) % available.length;
      const template = available.splice(idx, 1)[0] || MISSIONS_POOL[i];
      picked.push({
        id: `mission_${dateStr}_${i + 1}_${template.gameId}`,
        gameId: template.gameId,
        islandId: template.islandId,
        islandName: template.islandName,
        badgeBg: template.badgeBg,
        title: template.title,
        description: template.description,
        targetCount: template.targetCount,
        currentCount: 0,
        xpReward: template.xpReward,
        starsReward: template.starsReward,
        icon: template.icon,
        completed: false,
        claimed: false
      });
    }

    localStorage.setItem(key, JSON.stringify(picked));
    return picked;
  },

  saveMissions(missions: DailyMission[]) {
    localStorage.setItem(this.getStorageKey(), JSON.stringify(missions));
  },

  recordGameProgress(gameId: string): { updated: boolean; newlyCompletedMission: DailyMission | null } {
    const missions = this.getDailyMissions();
    let updated = false;
    let newlyCompletedMission: DailyMission | null = null;

    const modified = missions.map(m => {
      // Map related games
      const isMatch = m.gameId === gameId ||
        (m.gameId === 'makhraj_mastery' && gameId === 'makhraj_mirror') ||
        (m.gameId === 'echo_cave' && gameId === 'audio_detective');

      if (isMatch && !m.completed) {
        const nextCount = Math.min(m.targetCount, m.currentCount + 1);
        const isNowCompleted = nextCount >= m.targetCount;
        updated = true;

        if (isNowCompleted && !m.completed) {
          newlyCompletedMission = { ...m, currentCount: nextCount, completed: true };
        }

        return {
          ...m,
          currentCount: nextCount,
          completed: isNowCompleted
        };
      }
      return m;
    });

    if (updated) {
      this.saveMissions(modified);
    }

    return { updated, newlyCompletedMission };
  },

  claimMissionReward(missionId: string): { success: boolean; xp: number; stars: number } {
    const missions = this.getDailyMissions();
    const mission = missions.find(m => m.id === missionId);

    if (!mission || !mission.completed || mission.claimed) {
      return { success: false, xp: 0, stars: 0 };
    }

    const updated = missions.map(m => {
      if (m.id === missionId) {
        return { ...m, claimed: true };
      }
      return m;
    });

    this.saveMissions(updated);
    GameStorage.incrementDailyMissionsCompleted();
    GameStorage.addReward(mission.xpReward, mission.starsReward, 'lughah', 10);
    sound.playSuccess();
    sound.playFanfare();

    return { success: true, xp: mission.xpReward, stars: mission.starsReward };
  }
};
