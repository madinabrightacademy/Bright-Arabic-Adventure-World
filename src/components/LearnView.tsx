import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  Volume2,
  CheckCircle2,
  Award,
  Sparkles,
  AlertCircle,
  ArrowRight,
  Play,
  RefreshCw,
  Layers,
  ChevronLeft,
  Lightbulb,
  Check,
  X,
  HelpCircle,
  Compass
} from 'lucide-react';
import { UserProfile, SkillItem, Lexeme, IslandId } from '../types/game';
import { SKILLS_DATA, LEXICON_DATA, ISLANDS_DATA } from '../data/curriculum';
import { sound } from '../services/sound';
import { GameStorage } from '../services/storage';
import { SkillTreeView } from './SkillTreeView';
import { CurriculumMap } from './CurriculumMap';
import {
  getFriendlyLevel,
  getFriendlyIslandName,
  getSkillPedagogy,
  FRIENDLY_LEVELS
} from '../data/skillPedagogy';
import { MascotCharacter } from './MascotCharacter';

interface LearnViewProps {
  profile: UserProfile;
  onReward: (xp: number, stars: number) => void;
  onLaunchGame: (gameId: string) => void;
  onOpenParentDashboard: () => void;
  onOpenIqra?: () => void;
}

export const LearnView: React.FC<LearnViewProps> = ({
  profile,
  onReward,
  onLaunchGame,
  onOpenParentDashboard,
  onOpenIqra
}) => {
  const [viewMode, setViewMode] = useState<'map' | 'tree' | 'module'>('map');
  const [selectedLevel, setSelectedLevel] = useState<number>(profile.level);
  const [selectedIslandFilter, setSelectedIslandFilter] = useState<string>('ALL');
  const [activeSkillId, setActiveSkillId] = useState<string>('HRF-L0-01');
  const [learnPhase, setLearnPhase] = useState<'discover' | 'practice' | 'summary'>('discover');
  const [practiceStep, setPracticeStep] = useState(0);
  const [practiceScore, setPracticeScore] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [answeredFeedback, setAnsweredFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  const skillsAtLevel = SKILLS_DATA.filter(s => {
    const matchLevel = s.level === selectedLevel;
    const matchIsland = selectedIslandFilter === 'ALL' || s.owner_island === selectedIslandFilter;
    return matchLevel && matchIsland;
  });

  const currentSkill = SKILLS_DATA.find(s => s.skill_id === activeSkillId) ||
    skillsAtLevel[0] ||
    SKILLS_DATA.find(s => s.level === selectedLevel) ||
    SKILLS_DATA[0];

  const ownerIslandInfo = getFriendlyIslandName(currentSkill.owner_island);
  const currentLevelInfo = getFriendlyLevel(currentSkill.level);
  const pedagogy = getSkillPedagogy(currentSkill);
  const currentQuestions = pedagogy.questions;
  const currentQuestion = currentQuestions[practiceStep % currentQuestions.length];

  const getIslandGameId = (islandId: IslandId): string => {
    switch (islandId) {
      case 'HRF': return 'sand_trace';
      case 'MFR': return 'floating_market';
      case 'HWR': return 'dialog_quest';
      case 'QWD': return 'sentence_bridge';
      case 'IST': return 'echo_cave';
      case 'QRA': return 'scroll_tap_gloss';
      case 'KTB': return 'imla_lighthouse';
      case 'KLM': return 'makhraj_mastery';
      case 'TMH': return 'mihrab_gate';
      default: return 'sand_trace';
    }
  };

  const handlePlayArabic = (text: string) => {
    sound.speakArabic(text);
  };

  const handleSelectSkillFromTree = (skillId: string) => {
    setActiveSkillId(skillId);
    const target = SKILLS_DATA.find(s => s.skill_id === skillId);
    if (target) {
      setSelectedLevel(target.level);
    }
    setLearnPhase('discover');
    setPracticeStep(0);
    setPracticeScore(0);
    setSelectedOptionIndex(null);
    setAnsweredFeedback(null);
    setViewMode('module');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPracticeOption = (idx: number, isCorrect: boolean, feedbackText?: string) => {
    if (answeredFeedback !== null) return; // Prevent double click

    setSelectedOptionIndex(idx);
    setAnsweredFeedback({
      isCorrect,
      text: feedbackText || (isCorrect ? 'Mumtaz! Jawabanmu benar sekali!' : 'Belum tepat, mari pelajari kembali.')
    });

    if (isCorrect) {
      sound.playSuccess();
      setPracticeScore(prev => prev + 1);
    } else {
      sound.playGentleRetry();
    }

    // Auto advance after 1.5 seconds
    setTimeout(() => {
      setSelectedOptionIndex(null);
      setAnsweredFeedback(null);

      if (practiceStep < currentQuestions.length - 1) {
        setPracticeStep(prev => prev + 1);
      } else {
        // Finished all practice questions
        sound.playFanfare();
        const isNew = !profile.skillsMastered.includes(currentSkill.skill_id);
        if (isNew) {
          profile.skillsMastered.push(currentSkill.skill_id);
          GameStorage.saveProfile(profile);
        }
        GameStorage.addReward(80, 4, 'qiraah', 10);
        onReward(80, 4);
        setLearnPhase('summary');
      }
    }, 1500);
  };

  return (
    <div className="space-y-4 pb-20 pt-2 px-3 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto">
      {/* Featured Iqra & Hijaiyah Banner */}
      {onOpenIqra && (
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-2xl p-3 text-white border-2 border-emerald-400 shadow-md flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">📖</span>
            <div>
              <h4 className="font-black text-xs text-amber-300">
                Petualangan Iqra 1–6 & Tartil 28 Hijaiyah
              </h4>
              <p className="text-[11px] text-teal-100 leading-tight">
                Latihan baca per suku kata dengan audio makhraj & uji kelancaran
              </p>
            </div>
          </div>
          <button
            onClick={onOpenIqra}
            className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-xs shrink-0 cursor-pointer active:scale-95 transition-all flex items-center gap-1"
          >
            <span>Buka Iqra ▶</span>
          </button>
        </div>
      )}

      {/* Top View Mode Switcher: Map vs Tree vs Lesson Module */}
      <div className="bg-white rounded-2xl p-1.5 border border-amber-200 shadow-2xs flex items-center gap-1">
        <button
          onClick={() => setViewMode('map')}
          className={`flex-1 py-2 px-2 sm:px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1 transition-all cursor-pointer ${
            viewMode === 'map'
              ? 'bg-gradient-to-r from-teal-700 to-cyan-700 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <span className="text-sm">🗺️</span>
          <span>Peta Kurikulum</span>
        </button>

        <button
          onClick={() => setViewMode('tree')}
          className={`flex-1 py-2 px-2 sm:px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1 transition-all cursor-pointer ${
            viewMode === 'tree'
              ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <span className="text-sm">🌳</span>
          <span>Pohon Kemahiran</span>
        </button>

        <button
          onClick={() => setViewMode('module')}
          className={`flex-1 py-2 px-2 sm:px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1 transition-all cursor-pointer ${
            viewMode === 'module'
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <span className="text-sm">📖</span>
          <span>Modul Belajar</span>
        </button>
      </div>

      {/* VIEW MODE 1: CURRICULUM MAP (8 ISLAND PROGRESSION PATH) */}
      {viewMode === 'map' ? (
        <CurriculumMap
          profile={profile}
          onSelectSkill={handleSelectSkillFromTree}
          onLaunchGame={onLaunchGame}
        />
      ) : viewMode === 'tree' ? (
        /* VIEW MODE 2: VISUAL SKILL TREE */
        <SkillTreeView
          profile={profile}
          activeSkillId={activeSkillId}
          onSelectSkill={handleSelectSkillFromTree}
          onLaunchGame={onLaunchGame}
        />
      ) : (
        /* VIEW MODE 3: INTERACTIVE LESSON MODULE PLAYER */
        <div className="space-y-4">
          {/* Navigation Back Banner */}
          <div className="flex items-center justify-between bg-amber-100/70 border border-amber-200 px-3.5 py-2 rounded-2xl text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('map')}
                className="text-amber-900 font-extrabold hover:text-amber-950 flex items-center gap-1 active:scale-95 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Peta Kurikulum</span>
              </button>
              <span className="text-amber-300">•</span>
              <button
                onClick={() => setViewMode('tree')}
                className="text-amber-800 hover:text-amber-950 font-bold active:scale-95 transition-all cursor-pointer"
              >
                Pohon Kemahiran
              </button>
            </div>

            <span className="text-[11px] bg-amber-200/90 text-amber-950 font-black px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <span>{ownerIslandInfo.icon}</span>
              <span>{ownerIslandInfo.shortName}</span>
            </span>
          </div>

          {/* Jenjang Level Tabs Selector (Clear, friendly, no cryptic codes) */}
          <div className="bg-white rounded-3xl p-3 border border-amber-200 shadow-xs">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-xs font-bold text-slate-800">Pilih Jenjang Kemahiran:</span>
              <span className="text-[10px] bg-teal-100 text-teal-800 font-extrabold px-2 py-0.5 rounded-full">
                Tingkat Belajarmu: {getFriendlyLevel(profile.level).fullTitle}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {FRIENDLY_LEVELS.map((lvl) => {
                const isSelected = selectedLevel === lvl.levelNumber;
                const isLocked = lvl.levelNumber > profile.level + 1;

                return (
                  <button
                    key={lvl.levelNumber}
                    disabled={isLocked}
                    onClick={() => {
                      setSelectedLevel(lvl.levelNumber);
                      const firstSkill = SKILLS_DATA.find(s => s.level === lvl.levelNumber);
                      if (firstSkill) setActiveSkillId(firstSkill.skill_id);
                      setLearnPhase('discover');
                      setPracticeStep(0);
                      setPracticeScore(0);
                    }}
                    className={`p-2 rounded-2xl text-left transition-all border ${
                      isSelected
                        ? 'bg-gradient-to-r from-teal-700 to-teal-800 border-teal-600 text-white shadow-md font-bold'
                        : isLocked
                        ? 'bg-slate-100 border-slate-200 text-slate-400 opacity-60 cursor-not-allowed'
                        : 'bg-amber-50/60 border-amber-200 hover:bg-amber-100 text-slate-800 font-semibold'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black block leading-none">{lvl.friendlyCode}</span>
                      <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${isSelected ? 'bg-teal-900/60 text-teal-200' : 'bg-amber-200/60 text-amber-900'}`}>
                        {lvl.shortLabel}
                      </span>
                    </div>
                    <span className="text-[10px] opacity-85 block truncate mt-1">{lvl.nameAr}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Difficult Words Review Banner */}
          {profile.difficultWords.length > 0 && (
            <div className="bg-gradient-to-r from-amber-400/20 via-orange-400/20 to-amber-400/10 border-2 border-amber-300 rounded-3xl p-3.5 flex items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center font-bold text-lg shrink-0">
                  ⚡
                </div>
                <div>
                  <h5 className="font-bold text-xs text-amber-950">Buku Kata Sulit ({profile.difficultWords.length} Kosakata)</h5>
                  <p className="text-[11px] text-amber-900 leading-tight">Pengulangan terjadwal untuk memperkuat memori jangka panjang.</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setActiveSkillId('MFR-L0-02');
                  setLearnPhase('practice');
                  setPracticeStep(0);
                }}
                className="px-3 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-extrabold rounded-xl shadow-xs shrink-0 active:scale-95 transition-all"
              >
                Latihan Ulang
              </button>
            </div>
          )}

          {/* Main Learning Unit View */}
          <div className="bg-white rounded-3xl p-4 border border-amber-200 shadow-sm space-y-4">
            {/* Unit Info Header (Clear, explanatory, zero cryptic codes) */}
            <div className="border-b border-slate-100 pb-3">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className={`text-[10px] font-black text-white px-2.5 py-0.5 rounded-full ${ownerIslandInfo.shortName.includes('Huruf') ? 'bg-teal-600' : ownerIslandInfo.shortName.includes('Pasar') ? 'bg-amber-600' : ownerIslandInfo.shortName.includes('Gunung') ? 'bg-blue-600' : 'bg-purple-600'}`}>
                  {ownerIslandInfo.fullName}
                </span>

                <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                  {currentLevelInfo.fullTitle}
                </span>

                {profile.skillsMastered.includes(currentSkill.skill_id) && (
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Dikuasai
                  </span>
                )}
              </div>

              <h3 className="text-lg font-bold text-slate-900 mt-2 font-chibi flex items-center gap-2">
                <span>{currentSkill.name}</span>
              </h3>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{currentSkill.description}</p>
            </div>

            {/* Learning Phase Tabs */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl text-xs font-bold">
              <button
                onClick={() => setLearnPhase('discover')}
                className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1 ${
                  learnPhase === 'discover' ? 'bg-white text-teal-800 shadow-xs font-extrabold' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <span>1. Pahami Materi (Discover)</span>
              </button>
              <button
                onClick={() => {
                  setLearnPhase('practice');
                  setPracticeStep(0);
                  setSelectedOptionIndex(null);
                  setAnsweredFeedback(null);
                }}
                className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1 ${
                  learnPhase === 'practice' ? 'bg-white text-teal-800 shadow-xs font-extrabold' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <span>2. Latihan Interaktif (Practice)</span>
              </button>
              <button
                onClick={() => onLaunchGame(getIslandGameId(currentSkill.owner_island))}
                className="flex-1 py-2 rounded-xl text-purple-700 font-extrabold hover:bg-white/50 transition-all flex items-center justify-center gap-1"
              >
                <span>3. Mainkan Game</span> 🎮
              </button>
            </div>

            {/* PHASE 1: DISCOVER & UNDERSTAND (Rich, structured pedagogical material!) */}
            {learnPhase === 'discover' && (
              <div className="space-y-4 pt-1">
                {/* Pedagogical Concept Box */}
                <div className="bg-gradient-to-br from-amber-50 via-teal-50/40 to-cyan-50/50 rounded-2xl p-4 border border-amber-200">
                  <div className="flex items-center gap-2 mb-2 text-teal-900 font-extrabold text-sm font-chibi">
                    <Lightbulb className="w-4 h-4 text-amber-500" />
                    <span>{pedagogy.explanation.conceptTitle}</span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {pedagogy.explanation.overview}
                  </p>

                  {/* Rules Breakdown */}
                  {pedagogy.explanation.rules && pedagogy.explanation.rules.length > 0 && (
                    <div className="mt-3 space-y-2 pt-2 border-t border-amber-200/60">
                      <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wide block">
                        Kaidah & Cara Memahami:
                      </span>
                      {pedagogy.explanation.rules.map((rule, idx) => (
                        <div key={idx} className="bg-white/90 rounded-xl p-2.5 border border-amber-200/70 text-xs">
                          <span className="font-bold text-teal-900 block">{rule.title}</span>
                          <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">{rule.explanation}</p>
                          {rule.exampleAr && (
                            <div className="mt-1.5 pt-1 border-t border-slate-100 flex items-center justify-between text-[11px]">
                              <span className="font-arabic text-base font-bold text-slate-900">{rule.exampleAr}</span>
                              <span className="text-slate-500">
                                {rule.exampleTranslit ? `(${rule.exampleTranslit}) — ` : ''}{rule.exampleId}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Hudhud Tips */}
                  {pedagogy.explanation.hudhudTips && (
                    <div className="mt-3 p-2.5 rounded-xl bg-amber-100/70 border border-amber-300 text-xs flex items-start gap-2">
                      <span className="text-base leading-none">🦜</span>
                      <div>
                        <span className="font-bold text-amber-950 block">Tips Sahabat Hudhud:</span>
                        <p className="text-[11px] text-amber-900 leading-snug mt-0.5">
                          {pedagogy.explanation.hudhudTips}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Highly Relevant Lexicon / Phrases Box */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-teal-600" />
                      Kosakata & Frasa Terkait (Ketuk untuk dengarkan audio fasih):
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {pedagogy.highlightVocab.length} Kosakata
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {pedagogy.highlightVocab.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => handlePlayArabic(item.ar)}
                        className="p-3 rounded-2xl bg-gradient-to-r from-amber-50/60 to-teal-50/50 border border-amber-200/80 hover:border-teal-400 cursor-pointer transition-all flex items-center justify-between gap-2 shadow-2xs group active:scale-98"
                      >
                        <div className="flex items-center gap-2.5">
                          <button
                            type="button"
                            className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform shrink-0"
                            title="Putar Audio Pelafalan"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                          <div>
                            <span className="text-xs font-bold text-slate-900 block leading-tight">{item.id}</span>
                            <span className="text-[10px] text-slate-500">{item.translit}</span>
                          </div>
                        </div>

                        <span className="font-arabic text-xl font-bold text-teal-900 leading-none">
                          {item.ar}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Continue to Practice Button */}
                <button
                  onClick={() => {
                    setLearnPhase('practice');
                    setPracticeStep(0);
                    setSelectedOptionIndex(null);
                    setAnsweredFeedback(null);
                  }}
                  className="w-full mt-2 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white rounded-2xl font-bold text-xs shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Mulai Latihan Pemahaman Interaktif</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* PHASE 2: PRACTICE (Tailored interactive concept questions) */}
            {learnPhase === 'practice' && currentQuestion && (
              <div className="space-y-4 pt-1">
                {/* Progress bar */}
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span className="font-bold text-teal-900">
                    Soal {practiceStep + 1} dari {currentQuestions.length}
                  </span>
                  <span className="font-semibold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full text-[11px]">
                    Skor: {practiceScore} Benar
                  </span>
                </div>

                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-teal-600 h-full transition-all duration-300"
                    style={{ width: `${((practiceStep + 1) / currentQuestions.length) * 100}%` }}
                  />
                </div>

                {/* Mascot Coach & Question Prompt Card */}
                <div className="bg-gradient-to-b from-amber-50 to-teal-50 rounded-2xl p-4 border-2 border-teal-200 text-center shadow-xs">
                  {/* Interactive Mascot Coach */}
                  <div className="flex justify-center mb-1">
                    <MascotCharacter
                      type={profile.avatar === 'aira' ? 'amira' : 'zaki'}
                      mood={
                        answeredFeedback
                          ? answeredFeedback.isCorrect
                            ? 'celebrate'
                            : 'thinking'
                          : 'cheer'
                      }
                      size="sm"
                      interactive={false}
                    />
                  </div>

                  <span className="text-xs text-slate-500 font-bold block mb-1">Pertanyaan Pemahaman:</span>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug">
                    {currentQuestion.question}
                  </h4>

                  {currentQuestion.questionAr && (
                    <div className="my-3 flex items-center justify-center gap-2">
                      <span className="font-arabic text-3xl font-bold text-teal-950">
                        {currentQuestion.questionAr}
                      </span>
                      <button
                        type="button"
                        onClick={() => handlePlayArabic(currentQuestion.questionAr!)}
                        className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center shadow-xs active:scale-95 hover:bg-teal-700"
                        title="Dengarkan Suara Arab"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {currentQuestion.hint && (
                    <span className="text-[11px] text-amber-800 bg-amber-100/70 px-2.5 py-0.5 rounded-full inline-block mt-2 font-medium">
                      💡 Petunjuk: {currentQuestion.hint}
                    </span>
                  )}
                </div>

                {/* Options List */}
                <div className="space-y-2">
                  {currentQuestion.options.map((opt, idx) => {
                    const isSelected = selectedOptionIndex === idx;
                    const isAnswered = answeredFeedback !== null;

                    let btnStyle = 'border-amber-200 hover:border-teal-500 hover:bg-teal-50/50 bg-white text-slate-800';
                    if (isAnswered) {
                      if (opt.isCorrect) {
                        btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-black ring-2 ring-emerald-400';
                      } else if (isSelected && !opt.isCorrect) {
                        btnStyle = 'border-rose-400 bg-rose-50 text-rose-950';
                      } else {
                        btnStyle = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        type="button"
                        disabled={isAnswered}
                        onClick={() => handleSelectPracticeOption(idx, opt.isCorrect, opt.feedback)}
                        className={`w-full p-3.5 rounded-2xl border-2 text-left text-xs font-bold transition-all shadow-2xs flex items-center justify-between gap-2 active:scale-98 cursor-pointer ${btnStyle}`}
                      >
                        <span>{opt.text}</span>
                        {isAnswered && opt.isCorrect && (
                          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                        {isAnswered && isSelected && !opt.isCorrect && (
                          <X className="w-4 h-4 text-rose-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback Toast */}
                {answeredFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-3 rounded-2xl text-xs font-bold flex items-center gap-2 border ${
                      answeredFeedback.isCorrect
                        ? 'bg-emerald-100 border-emerald-300 text-emerald-900'
                        : 'bg-amber-100 border-amber-300 text-amber-900'
                    }`}
                  >
                    <span>{answeredFeedback.isCorrect ? '✨' : '💡'}</span>
                    <span>{answeredFeedback.text}</span>
                  </motion.div>
                )}
              </div>
            )}

            {/* PHASE 3: SUMMARY */}
            {learnPhase === 'summary' && (
              <div className="text-center py-4 space-y-3">
                <div className="flex justify-center">
                  <MascotCharacter
                    type={profile.avatar === 'aira' ? 'amira' : 'zaki'}
                    mood="celebrate"
                    size="md"
                    speechBubble="Mumtaz! Kamu hebat sekali!"
                  />
                </div>
                <h4 className="text-lg font-bold text-slate-900 font-chibi">Mumtaz! Unit Selesai dengan Sempurna!</h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Kamu telah memahami konsep materi <strong>{currentSkill.name}</strong> dan menyelesaikan latihan interaktifnya!
                </p>

                <div className="flex items-center justify-center gap-2 bg-amber-100 text-amber-900 font-bold px-4 py-2 rounded-2xl text-xs max-w-xs mx-auto">
                  <span>+80 XP</span> • <span>+4 Bintang</span>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setLearnPhase('discover');
                      setPracticeStep(0);
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
                  >
                    Ulangi Materi
                  </button>
                  <button
                    type="button"
                    onClick={() => onLaunchGame(getIslandGameId(currentSkill.owner_island))}
                    className="flex-1 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-md cursor-pointer"
                  >
                    Mainkan Game Pulau 🎮
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Other Skills in this Level */}
          <div className="bg-white rounded-3xl p-4 border border-amber-200 shadow-sm">
            <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wide mb-2.5 flex items-center justify-between">
              <span>Daftar Modul Lain di {currentLevelInfo.fullTitle}:</span>
              <span className="text-[10px] text-slate-500 font-semibold">{skillsAtLevel.length} Modul</span>
            </h4>

            <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
              {skillsAtLevel.map((skill) => {
                const isSelected = skill.skill_id === activeSkillId;
                const isMastered = profile.skillsMastered.includes(skill.skill_id);
                const skillIsland = getFriendlyIslandName(skill.owner_island);

                return (
                  <button
                    key={skill.skill_id}
                    type="button"
                    onClick={() => {
                      setActiveSkillId(skill.skill_id);
                      setLearnPhase('discover');
                      setPracticeStep(0);
                      setPracticeScore(0);
                      setSelectedOptionIndex(null);
                      setAnsweredFeedback(null);
                    }}
                    className={`w-full p-2.5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'border-teal-500 bg-teal-50/70 shadow-xs ring-1 ring-teal-400'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div>
                      <span className="font-bold text-xs text-slate-800 block">{skill.name}</span>
                      <span className="text-[10px] text-slate-500">{skill.scope}</span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {skillIsland.shortName}
                      </span>
                      {isMastered && (
                        <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">
                          ✓
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
