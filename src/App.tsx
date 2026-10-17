import React, { useState, useEffect } from 'react';
import { UserProfile, IslandId } from './types/game';
import { ISLANDS_DATA } from './data/curriculum';
import { GameStorage } from './services/storage';
import { sound } from './services/sound';
import { DailyMissionsService } from './services/missions';
import { TopHeader } from './components/TopHeader';
import { Navigation, NavTab } from './components/Navigation';
import { HomeView } from './components/HomeView';
import { LearnView } from './components/LearnView';
import { WorldMapView } from './components/WorldMapView';
import { GamesCenterView } from './components/GamesCenterView';
import { ProfileView } from './components/ProfileView';

// Modals
import { LeaderboardModal } from './components/LeaderboardModal';
import { ParentDashboardModal } from './components/ParentDashboardModal';
import { CompanionRoomModal } from './components/CompanionRoomModal';
import { HudhudLetterModal } from './components/games/HudhudLetterModal';

// Mini Games
import { SandTraceGame } from './components/games/SandTraceGame';
import { FloatingMarketGame } from './components/games/FloatingMarketGame';
import { SentenceBridgeGame } from './components/games/SentenceBridgeGame';
import { PearlGardenGame } from './components/games/PearlGardenGame';
import { PearlChainGame } from './components/games/PearlChainGame';
import { DialogQuestGame } from './components/games/DialogQuestGame';
import { EchoCaveGame } from './components/games/EchoCaveGame';
import { AudioDetectiveGame } from './components/games/AudioDetectiveGame';
import { SkyRunnerGame } from './components/games/SkyRunnerGame';
import { MihrabGateExam } from './components/games/MihrabGateExam';
import { BasketSpellGame } from './components/games/BasketSpellGame';
import { MakhrajMirrorGame } from './components/games/MakhrajMirrorGame';
import { ImlaLighthouseGame } from './components/games/ImlaLighthouseGame';
import { ScrollTapGlossModal } from './components/games/ScrollTapGlossModal';
import { TashrifLabGame } from './components/games/TashrifLabGame';
import { MakhrajMasteryGame } from './components/games/MakhrajMasteryGame';
import { RealWorldMissionsModal } from './components/RealWorldMissionsModal';
import { PulauHurufHubModal } from './components/PulauHurufHubModal';
import { PulauMufradatHubModal } from './components/PulauMufradatHubModal';
import { PulauHiwarHubModal } from './components/PulauHiwarHubModal';
import { PulauQawaidHubModal } from './components/PulauQawaidHubModal';
import { PulauIstimaHubModal } from './components/PulauIstimaHubModal';
import { PulauQiraahHubModal } from './components/PulauQiraahHubModal';
import { PulauKalamHubModal } from './components/PulauKalamHubModal';
import { PulauKitabahHubModal } from './components/PulauKitabahHubModal';
import { PulauTamhidHubModal } from './components/PulauTamhidHubModal';
import { IqraAdventureModal } from './components/IqraAdventureModal';
import { DailyStreakModal } from './components/DailyStreakModal';
import { DailyTaskTargetsModal } from './components/DailyTaskTargetsModal';
import { DailyAdabModal } from './components/DailyAdabModal';
import { ArabicGlossaryModal } from './components/ArabicGlossaryModal';

export default function App() {
  const [profile, setProfile] = useState<UserProfile>(GameStorage.getProfile());
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [isMuted, setIsMuted] = useState(false);
  const [isMobileFrame, setIsMobileFrame] = useState(false);

  // Active Modals & Games
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showParentDashboard, setShowParentDashboard] = useState(false);
  const [showCompanionRoom, setShowCompanionRoom] = useState(false);
  const [showHudhudLetter, setShowHudhudLetter] = useState(false);
  const [showRealWorldMissions, setShowRealWorldMissions] = useState(false);
  const [showPulauHurufHub, setShowPulauHurufHub] = useState(false);
  const [showPulauMufradatHub, setShowPulauMufradatHub] = useState(false);
  const [showPulauHiwarHub, setShowPulauHiwarHub] = useState(false);
  const [showPulauQawaidHub, setShowPulauQawaidHub] = useState(false);
  const [showPulauIstimaHub, setShowPulauIstimaHub] = useState(false);
  const [showPulauQiraahHub, setShowPulauQiraahHub] = useState(false);
  const [showPulauKalamHub, setShowPulauKalamHub] = useState(false);
  const [showPulauKitabahHub, setShowPulauKitabahHub] = useState(false);
  const [showPulauTamhidHub, setShowPulauTamhidHub] = useState(false);
  const [showIqraModal, setShowIqraModal] = useState(false);
  const [showDailyStreakModal, setShowDailyStreakModal] = useState(false);
  const [showDailyTargetsModal, setShowDailyTargetsModal] = useState(false);
  const [showDailyAdabModal, setShowDailyAdabModal] = useState(false);
  const [showArabicGlossary, setShowArabicGlossary] = useState(false);
  const [glossaryInitialTab, setGlossaryInitialTab] = useState<'difficult' | 'mastered' | 'all'>('difficult');
  const [floatingRewardToast, setFloatingRewardToast] = useState<{ xp: number; stars: number } | null>(null);

  const handleOpenGlossary = (tab?: 'difficult' | 'mastered' | 'all') => {
    setGlossaryInitialTab(tab || 'difficult');
    setShowArabicGlossary(true);
  };

  const handleReward = (xp: number, stars: number) => {
    setProfile(GameStorage.getProfile());
    if (activeGame) {
      DailyMissionsService.recordGameProgress(activeGame);
    }
    setFloatingRewardToast({ xp, stars });
    setTimeout(() => setFloatingRewardToast(null), 2500);
  };

  const handleToggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    sound.setMuted(next);
  };

  const handleChangeAudience = (aud: 'child' | 'adult') => {
    sound.playSparkle();
    const updated = { ...profile, audience: aud };
    GameStorage.saveProfile(updated);
    setProfile(updated);
  };

  return (
    <div
      className={`min-h-screen text-slate-800 flex justify-center items-start w-full transition-colors duration-300 ${
        isMobileFrame
          ? 'bg-slate-950 py-4 sm:py-6 px-2'
          : 'bg-gradient-to-b from-amber-50/80 via-white to-teal-50/30'
      }`}
    >
      {/* Outer wrapper: Fullscreen or Simulated Android Smartphone Frame */}
      <div
        className={`w-full transition-all duration-300 min-h-screen flex flex-col relative ${
          isMobileFrame
            ? 'max-w-[440px] rounded-[42px] border-[10px] border-slate-800 overflow-hidden min-h-[92vh] ring-8 ring-slate-900/40 bg-amber-50/70 shadow-2xl my-auto'
            : 'w-full bg-transparent shadow-none'
        }`}
      >
        {/* Android status bar notch indicator in Mobile Frame mode */}
        {isMobileFrame && (
          <div className="bg-slate-800 text-white text-[10px] px-6 py-1 flex items-center justify-between font-bold select-none z-50">
            <span>09:41</span>
            <div className="w-16 h-3 bg-black rounded-full" />
            <span>5G 🔋 98%</span>
          </div>
        )}

        {/* Global Sticky Top Header */}
        <TopHeader
          profile={profile}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          isMobileFrame={isMobileFrame}
          onToggleMobileFrame={() => setIsMobileFrame(prev => !prev)}
          onOpenLeaderboard={() => setShowLeaderboard(true)}
          onOpenParentDashboard={() => setShowParentDashboard(true)}
          onOpenCompanionRoom={() => setShowCompanionRoom(true)}
          onChangeAudience={handleChangeAudience}
          onOpenDailyStreak={() => setShowDailyStreakModal(true)}
          onOpenDailyTargets={() => setShowDailyTargetsModal(true)}
          onOpenDailyAdab={() => setShowDailyAdabModal(true)}
          onOpenIqra={() => setShowIqraModal(true)}
          onOpenGlossary={() => handleOpenGlossary('difficult')}
          currentTab={currentTab}
          onNavigateTab={setCurrentTab}
        />

        {/* Main Tab View Routing */}
        <main className="flex-1 overflow-x-hidden">
          {currentTab === 'home' && (
            <HomeView
              profile={profile}
              onNavigateTab={(tab) => setCurrentTab(tab)}
              onLaunchGame={(gameId) => setActiveGame(gameId)}
              onOpenHudhudLetter={() => setShowHudhudLetter(true)}
              onOpenCompanionRoom={() => setShowCompanionRoom(true)}
              onOpenLeaderboard={() => setShowLeaderboard(true)}
              onOpenRealWorldMissions={() => setShowRealWorldMissions(true)}
              onReward={handleReward}
              onOpenIqra={() => setShowIqraModal(true)}
              onOpenDailyStreak={() => setShowDailyStreakModal(true)}
              onOpenDailyTargets={() => setShowDailyTargetsModal(true)}
              onOpenDailyAdab={() => setShowDailyAdabModal(true)}
              onOpenGlossary={() => handleOpenGlossary('difficult')}
            />
          )}

          {currentTab === 'learn' && (
            <LearnView
              profile={profile}
              onReward={handleReward}
              onLaunchGame={(gameId) => setActiveGame(gameId)}
              onOpenParentDashboard={() => setShowParentDashboard(true)}
              onOpenIqra={() => setShowIqraModal(true)}
            />
          )}

          <div className={currentTab === 'world' ? 'block' : 'hidden'}>
            <WorldMapView
              profile={profile}
              onLaunchGame={(gameId) => setActiveGame(gameId)}
              onNavigateLearn={() => setCurrentTab('learn')}
              onOpenPulauHurufHub={() => setShowPulauHurufHub(true)}
              onOpenPulauMufradatHub={() => setShowPulauMufradatHub(true)}
              onOpenPulauHiwarHub={() => setShowPulauHiwarHub(true)}
              onOpenPulauQawaidHub={() => setShowPulauQawaidHub(true)}
              onOpenPulauIstimaHub={() => setShowPulauIstimaHub(true)}
              onOpenPulauQiraahHub={() => setShowPulauQiraahHub(true)}
              onOpenPulauKalamHub={() => setShowPulauKalamHub(true)}
              onOpenPulauKitabahHub={() => setShowPulauKitabahHub(true)}
              onOpenPulauTamhidHub={() => setShowPulauTamhidHub(true)}
            />
          </div>

          {currentTab === 'games' && (
            <GamesCenterView
              profile={profile}
              onLaunchGame={(gameId) => setActiveGame(gameId)}
            />
          )}

          {currentTab === 'profile' && (
            <ProfileView
              profile={profile}
              onUpdateProfile={(p) => setProfile(p)}
              onOpenLeaderboard={() => setShowLeaderboard(true)}
              onOpenParentDashboard={() => setShowParentDashboard(true)}
              onOpenCompanionRoom={() => setShowCompanionRoom(true)}
              onChangeAudience={handleChangeAudience}
              onLaunchGame={(gameId) => setActiveGame(gameId)}
              onNavigateLearn={() => setCurrentTab('learn')}
              onOpenGlossary={handleOpenGlossary}
            />
          )}
        </main>

        {/* Global Bottom Navigation */}
        <Navigation
          currentTab={currentTab}
          onTabChange={(tab) => {
            sound.playSparkle();
            setCurrentTab(tab);
          }}
        />

        {/* Floating Reward Toast */}
        {floatingRewardToast && (
          <div className="fixed top-14 inset-x-0 mx-auto w-fit z-50 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2 animate-bounce border-2 border-white">
            <span>✨</span>
            <span>+{floatingRewardToast.xp} XP</span>
            <span>•</span>
            <span>+{floatingRewardToast.stars} Bintang</span>
          </div>
        )}

        {/* Modals */}
        {showLeaderboard && (
          <LeaderboardModal
            profile={profile}
            onClose={() => setShowLeaderboard(false)}
          />
        )}

        {showParentDashboard && (
          <ParentDashboardModal
            profile={profile}
            onClose={() => setShowParentDashboard(false)}
            onPracticeDifficultWords={() => {
              setCurrentTab('learn');
            }}
            onOpenGlossary={() => handleOpenGlossary('difficult')}
          />
        )}

        {showCompanionRoom && (
          <CompanionRoomModal
            profile={profile}
            onClose={() => setShowCompanionRoom(false)}
            onUpdateProfile={(p) => setProfile(p)}
          />
        )}

        {showHudhudLetter && (
          <HudhudLetterModal
            onClose={() => setShowHudhudLetter(false)}
            onReward={handleReward}
          />
        )}

        {showRealWorldMissions && (
          <RealWorldMissionsModal
            profile={profile}
            onClose={() => setShowRealWorldMissions(false)}
            onReward={handleReward}
          />
        )}

        {showPulauHurufHub && (
          <PulauHurufHubModal
            profile={profile}
            onClose={() => setShowPulauHurufHub(false)}
            onLaunchGame={(gameId) => {
              setShowPulauHurufHub(false);
              setActiveGame(gameId);
            }}
            onReward={handleReward}
            onOpenIqra={() => {
              setShowPulauHurufHub(false);
              setShowIqraModal(true);
            }}
          />
        )}

        {/* QUR'AN LEARNING ADVENTURE & IQRA PLATFORM MODAL */}
        {showIqraModal && (
          <IqraAdventureModal
            profile={profile}
            onClose={() => setShowIqraModal(false)}
            onReward={handleReward}
          />
        )}

        {/* DAILY STREAK (ISTIQAMAH) MODAL */}
        {showDailyStreakModal && (
          <DailyStreakModal
            profile={profile}
            onClose={() => setShowDailyStreakModal(false)}
            onUpdateProfile={(p) => setProfile(p)}
            onReward={handleReward}
          />
        )}

        {/* DAILY TASK TARGETS (4 PILAR TARGET HARIAN) MODAL */}
        {showDailyTargetsModal && (
          <DailyTaskTargetsModal
            profile={profile}
            onClose={() => setShowDailyTargetsModal(false)}
            onOpenIqra={() => setShowIqraModal(true)}
            onOpenGames={() => setCurrentTab('games')}
            onOpenAdab={() => setShowDailyAdabModal(true)}
            onUpdateProfile={(p) => setProfile(p)}
            onReward={handleReward}
          />
        )}

        {/* DAILY ADAB & ISLAMIC CHARACTER QUEST MODAL */}
        {showDailyAdabModal && (
          <DailyAdabModal
            profile={profile}
            onClose={() => setShowDailyAdabModal(false)}
            onUpdateProfile={(p) => setProfile(p)}
            onReward={handleReward}
          />
        )}

        {/* ARABIC GLOSSARY & BUKU KATA SULIT MODAL (USER REQUEST #8) */}
        {showArabicGlossary && (
          <ArabicGlossaryModal
            profile={profile}
            initialTab={glossaryInitialTab}
            onClose={() => setShowArabicGlossary(false)}
            onUpdateProfile={(p) => setProfile(p)}
            onReward={handleReward}
          />
        )}

        {showPulauMufradatHub && (
          <PulauMufradatHubModal
            island={ISLANDS_DATA.find(i => i.id === 'MFR') || ISLANDS_DATA[1]}
            profile={profile}
            onClose={() => setShowPulauMufradatHub(false)}
            onLaunchGame={(gameId) => {
              setShowPulauMufradatHub(false);
              setActiveGame(gameId);
            }}
            onReward={handleReward}
          />
        )}

        {showPulauHiwarHub && (
          <PulauHiwarHubModal
            island={ISLANDS_DATA.find(i => i.id === 'HWR') || ISLANDS_DATA[2]}
            profile={profile}
            onClose={() => setShowPulauHiwarHub(false)}
            onLaunchGame={(gameId) => {
              setShowPulauHiwarHub(false);
              setActiveGame(gameId);
            }}
            onReward={handleReward}
          />
        )}

        {showPulauQawaidHub && (
          <PulauQawaidHubModal
            island={ISLANDS_DATA.find(i => i.id === 'QWD') || ISLANDS_DATA[3]}
            profile={profile}
            onClose={() => setShowPulauQawaidHub(false)}
            onLaunchGame={(gameId) => {
              setShowPulauQawaidHub(false);
              setActiveGame(gameId);
            }}
          />
        )}

        {showPulauIstimaHub && (
          <PulauIstimaHubModal
            island={ISLANDS_DATA.find(i => i.id === 'IST') || ISLANDS_DATA[4]}
            profile={profile}
            onClose={() => setShowPulauIstimaHub(false)}
            onLaunchGame={(gameId) => {
              setShowPulauIstimaHub(false);
              setActiveGame(gameId);
            }}
          />
        )}

        {showPulauQiraahHub && (
          <PulauQiraahHubModal
            island={ISLANDS_DATA.find(i => i.id === 'QRA') || ISLANDS_DATA[5]}
            profile={profile}
            onClose={() => setShowPulauQiraahHub(false)}
            onLaunchGame={(gameId) => {
              setShowPulauQiraahHub(false);
              setActiveGame(gameId);
            }}
            onReward={handleReward}
          />
        )}

        {showPulauKalamHub && (
          <PulauKalamHubModal
            island={ISLANDS_DATA.find(i => i.id === 'KLM') || ISLANDS_DATA[7]}
            profile={profile}
            onClose={() => setShowPulauKalamHub(false)}
            onLaunchGame={(gameId) => {
              setShowPulauKalamHub(false);
              setActiveGame(gameId);
            }}
            onReward={handleReward}
          />
        )}

        {showPulauKitabahHub && (
          <PulauKitabahHubModal
            island={ISLANDS_DATA.find(i => i.id === 'KTB') || ISLANDS_DATA[6]}
            profile={profile}
            onClose={() => setShowPulauKitabahHub(false)}
            onLaunchGame={(gameId) => {
              setShowPulauKitabahHub(false);
              setActiveGame(gameId);
            }}
            onReward={handleReward}
          />
        )}

        {showPulauTamhidHub && (
          <PulauTamhidHubModal
            island={ISLANDS_DATA.find(i => i.id === 'TMH') || ISLANDS_DATA[8]}
            profile={profile}
            onClose={() => setShowPulauTamhidHub(false)}
            onLaunchGame={(gameId) => {
              setShowPulauTamhidHub(false);
              setActiveGame(gameId);
            }}
            onReward={handleReward}
            onPromote={() => {
              setProfile(GameStorage.getProfile());
            }}
          />
        )}

        {/* Playable Mini Games */}
        {activeGame === 'scroll_tap_gloss' && (
          <ScrollTapGlossModal
            onClose={() => setActiveGame(null)}
            onReward={handleReward}
          />
        )}

        {activeGame === 'tashrif_lab' && (
          <TashrifLabGame
            onClose={() => setActiveGame(null)}
            onReward={handleReward}
          />
        )}

        {activeGame === 'sand_trace' && (
          <SandTraceGame
            onClose={() => setActiveGame(null)}
            onReward={handleReward}
          />
        )}

        {activeGame === 'floating_market' && (
          <FloatingMarketGame
            onClose={() => setActiveGame(null)}
            onReward={handleReward}
          />
        )}

        {activeGame === 'sentence_bridge' && (
          <SentenceBridgeGame
            onClose={() => setActiveGame(null)}
            onReward={handleReward}
          />
        )}

        {activeGame === 'pearl_garden' && (
          <PearlGardenGame
            onClose={() => setActiveGame(null)}
            onReward={handleReward}
          />
        )}

        {activeGame === 'pearl_chain' && (
          <PearlChainGame
            onClose={() => setActiveGame(null)}
            onReward={handleReward}
          />
        )}

        {activeGame === 'dialog_quest' && (
          <DialogQuestGame
            onClose={() => setActiveGame(null)}
            onReward={handleReward}
          />
        )}

        {activeGame === 'echo_cave' && (
          <EchoCaveGame
            onClose={() => setActiveGame(null)}
            onReward={handleReward}
          />
        )}

        {activeGame === 'audio_detective' && (
          <AudioDetectiveGame
            onClose={() => setActiveGame(null)}
            onReward={handleReward}
          />
        )}

        {activeGame === 'sky_runner' && (
          <SkyRunnerGame
            onClose={() => setActiveGame(null)}
            onReward={handleReward}
          />
        )}

        {activeGame === 'basket_spell' && (
          <BasketSpellGame
            onClose={() => setActiveGame(null)}
            onReward={handleReward}
          />
        )}

        {activeGame === 'makhraj_mirror' && (
          <MakhrajMirrorGame
            onClose={() => setActiveGame(null)}
            onReward={handleReward}
          />
        )}

        {activeGame === 'makhraj_mastery' && (
          <MakhrajMasteryGame
            onClose={() => setActiveGame(null)}
            onReward={handleReward}
          />
        )}

        {activeGame === 'imla_lighthouse' && (
          <ImlaLighthouseGame
            onClose={() => setActiveGame(null)}
            onReward={handleReward}
          />
        )}

        {activeGame === 'hudhud_letter' && (
          <HudhudLetterModal
            onClose={() => setActiveGame(null)}
            onReward={handleReward}
          />
        )}

        {activeGame === 'mihrab_gate' && (
          <MihrabGateExam
            onClose={() => setActiveGame(null)}
            onReward={handleReward}
            onPromote={() => {
              setProfile(GameStorage.getProfile());
            }}
          />
        )}
      </div>
    </div>
  );
}
