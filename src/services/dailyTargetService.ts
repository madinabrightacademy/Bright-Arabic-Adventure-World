import { UserProfile } from '../types/game';
import { GameStorage } from './storage';
import { sound } from './sound';

export interface DailyTargetStatus {
  date: string;
  iqraTarget: { current: number; target: number; completed: boolean };
  gamesTarget: { current: number; target: number; completed: boolean };
  adabTarget: { current: number; target: number; completed: boolean };
  minutesTarget: { current: number; target: number; completed: boolean };
  overallPercent: number;
  allCompleted: boolean;
  chestClaimed: boolean;
}

export const DailyTargetService = {
  getTodayDateString(): string {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  },

  getDailyStatus(profile: UserProfile): DailyTargetStatus {
    const today = this.getTodayDateString();
    const isToday = profile.lastActiveDate === today;

    const iqraCount = isToday ? (profile.dailyReadingCount || 0) : 0;
    const minutesCount = isToday ? (profile.dailyMinutesCount || 0) : 0;
    const adabCount = isToday ? (profile.dailyAdabCompleted || []).length : 0;
    const gamesCompleted = isToday ? (profile.dailyMissionsCompletedCount ? Math.min(2, profile.dailyMissionsCompletedCount) : 0) : 0;

    const iqraTarget = { current: iqraCount, target: 10, completed: iqraCount >= 10 };
    const gamesTarget = { current: gamesCompleted, target: 2, completed: gamesCompleted >= 2 };
    const adabTarget = { current: adabCount, target: 1, completed: adabCount >= 1 };
    const minutesTarget = { current: minutesCount, target: 10, completed: minutesCount >= 10 };

    const totalWeight = 4;
    let completedCount = 0;
    if (iqraTarget.completed) completedCount++;
    if (gamesTarget.completed) completedCount++;
    if (adabTarget.completed) completedCount++;
    if (minutesTarget.completed) completedCount++;

    const overallPercent = Math.round((completedCount / totalWeight) * 100);
    const allCompleted = completedCount === totalWeight;
    const chestClaimed = profile.dailyTargetChestClaimedDate === today;

    return {
      date: today,
      iqraTarget,
      gamesTarget,
      adabTarget,
      minutesTarget,
      overallPercent,
      allCompleted,
      chestClaimed
    };
  },

  recordIqraRead(count: number = 1): UserProfile {
    const profile = GameStorage.getProfile();
    const today = this.getTodayDateString();

    if (profile.lastActiveDate !== today) {
      profile.lastActiveDate = today;
      profile.dailyReadingCount = count;
    } else {
      profile.dailyReadingCount = (profile.dailyReadingCount || 0) + count;
    }

    GameStorage.saveProfile(profile);
    return profile;
  },

  recordStudyMinutes(minutes: number = 2): UserProfile {
    const profile = GameStorage.getProfile();
    const today = this.getTodayDateString();

    if (profile.lastActiveDate !== today) {
      profile.lastActiveDate = today;
      profile.dailyMinutesCount = minutes;
    } else {
      profile.dailyMinutesCount = (profile.dailyMinutesCount || 0) + minutes;
    }

    GameStorage.saveProfile(profile);
    return profile;
  },

  toggleAdabCompleted(adabId: string, barakah: number, xp: number): { profile: UserProfile; newlyAdded: boolean } {
    const profile = GameStorage.getProfile();
    const today = this.getTodayDateString();

    if (profile.lastActiveDate !== today) {
      profile.lastActiveDate = today;
      profile.dailyAdabCompleted = [];
    }

    const currentCompleted = profile.dailyAdabCompleted || [];
    const isAlreadyCompleted = currentCompleted.includes(adabId);

    if (isAlreadyCompleted) {
      profile.dailyAdabCompleted = currentCompleted.filter(id => id !== adabId);
      profile.adabBarakahPoints = Math.max(0, (profile.adabBarakahPoints || 0) - barakah);
      GameStorage.saveProfile(profile);
      return { profile, newlyAdded: false };
    } else {
      profile.dailyAdabCompleted = [...currentCompleted, adabId];
      profile.adabBarakahPoints = (profile.adabBarakahPoints || 0) + barakah;
      profile.xp += xp;
      GameStorage.saveProfile(profile);
      sound.playSuccess();
      sound.playSparkle();
      return { profile, newlyAdded: true };
    }
  },

  claimDailyStreakReward(): { success: boolean; xpReward: number; starsReward: number; currentStreak: number; profile: UserProfile } {
    const profile = GameStorage.getProfile();
    const today = this.getTodayDateString();

    if (profile.lastStreakClaimDate === today) {
      return {
        success: false,
        xpReward: 0,
        starsReward: 0,
        currentStreak: profile.dailyStreak,
        profile
      };
    }

    // Streak increment
    const newStreak = profile.dailyStreak + 1;
    profile.dailyStreak = newStreak;
    profile.lastStreakClaimDate = today;
    profile.lastActiveDate = today;

    // Multiplier calculation
    let multiplier = 1.0;
    if (newStreak >= 14) multiplier = 2.0;
    else if (newStreak >= 7) multiplier = 1.5;
    else if (newStreak >= 3) multiplier = 1.2;

    const baseXp = 40;
    const baseStars = 2;
    const finalXp = Math.round(baseXp * multiplier);
    const finalStars = Math.round(baseStars * multiplier);

    profile.xp += finalXp;
    profile.stars += finalStars;

    // Grant 1 streak shield if at 7 days
    if (newStreak % 7 === 0) {
      profile.streakShields = (profile.streakShields || 0) + 1;
    }

    GameStorage.saveProfile(profile);
    sound.playFanfare();
    sound.playSparkle();

    return {
      success: true,
      xpReward: finalXp,
      starsReward: finalStars,
      currentStreak: newStreak,
      profile
    };
  },

  claimDailyTargetChest(): { success: boolean; xpReward: number; starsReward: number; profile: UserProfile } {
    const profile = GameStorage.getProfile();
    const status = this.getDailyStatus(profile);
    const today = this.getTodayDateString();

    if (!status.allCompleted || status.chestClaimed) {
      return { success: false, xpReward: 0, starsReward: 0, profile };
    }

    profile.dailyTargetChestClaimedDate = today;
    const xpReward = 120;
    const starsReward = 5;

    profile.xp += xpReward;
    profile.stars += starsReward;
    profile.streakShields = (profile.streakShields || 0) + 1;

    GameStorage.saveProfile(profile);
    sound.playFanfare();

    return { success: true, xpReward, starsReward, profile };
  }
};
