import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Volume2, CheckCircle2, Award, Sparkles, AlertCircle, ArrowRight, Play, RefreshCw } from 'lucide-react';
import { UserProfile, SkillItem, Lexeme } from '../types/game';
import { SKILLS_DATA, LEXICON_DATA, ISLANDS_DATA } from '../data/curriculum';
import { sound } from '../services/sound';
import { GameStorage } from '../services/storage';

interface LearnViewProps {
  profile: UserProfile;
  onReward: (xp: number, stars: number) => void;
  onLaunchGame: (gameId: string) => void;
  onOpenParentDashboard: () => void;
}

export const LearnView: React.FC<LearnViewProps> = ({ profile, onReward, onLaunchGame, onOpenParentDashboard }) => {
  const [selectedLevel, setSelectedLevel] = useState<number>(profile.level);
  const [activeSkillId, setActiveSkillId] = useState<string>('HRF-L0-01');
  const [learnPhase, setLearnPhase] = useState<'discover' | 'practice' | 'summary'>('discover');
  const [practiceStep, setPracticeStep] = useState(0);
  const [practiceScore, setPracticeScore] = useState(0);

  const skillsAtLevel = SKILLS_DATA.filter(s => s.level === selectedLevel);
  const currentSkill = SKILLS_DATA.find(s => s.skill_id === activeSkillId) || skillsAtLevel[0] || SKILLS_DATA[0];
  const ownerIsland = ISLANDS_DATA.find(i => i.id === currentSkill.owner_island);

  // Filter lexemes belonging to this skill (Lampiran A Single Owner)
  const skillLexemes = LEXICON_DATA.filter(l => l.skill_id === currentSkill.skill_id);

  // Practice items
  const practiceItems = skillLexemes.length > 0 ? skillLexemes : LEXICON_DATA.slice(0, 3);
  const currentPractice = practiceItems[practiceStep % practiceItems.length];

  const handlePlayArabic = (text: string) => {
    sound.speakArabic(text);
  };

  const handleAnswerPractice = (isCorrect: boolean) => {
    if (isCorrect) {
      sound.playSuccess();
      sound.speakArabic(currentPractice.ar_vocalized);
      setPracticeScore(prev => prev + 1);
      GameStorage.markWordLearned(currentPractice.id);
    } else {
      sound.playGentleRetry();
      GameStorage.markWordDifficult(currentPractice.id);
    }

    if (practiceStep < 2) {
      setPracticeStep(prev => prev + 1);
    } else {
      // Completed practice
      sound.playFanfare();
      const isNew = !profile.skillsMastered.includes(currentSkill.skill_id);
      if (isNew) {
        profile.skillsMastered.push(currentSkill.skill_id);
      }
      GameStorage.addReward(80, 4, 'qiraah', 10);
      onReward(80, 4);
      setLearnPhase('summary');
    }
  };

  const levelsList = [
    { lvl: 0, code: 'J0', name: 'Tamhidi (تمهيدي)', desc: 'Pra-A1: Bunyi & Huruf' },
    { lvl: 1, code: 'J1', name: 'Mubtadi\' (مبتدئ)', desc: 'A1: Sambung & Kata Inti' },
    { lvl: 2, code: 'J2', name: 'Asasi (أساسي)', desc: 'A2: Kalimat & Qawa\'id' },
    { lvl: 3, code: 'J3', name: 'Mutawassith (متوسط)', desc: 'B1: Teks Mandiri' },
  ];

  return (
    <div className="space-y-4 pb-20 pt-2 px-3 max-w-xl mx-auto">
      {/* Jenjang Level Tabs Selector */}
      <div className="bg-white rounded-3xl p-3 border border-amber-200 shadow-xs">
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-xs font-bold text-slate-700">Pilih Jenjang Kurikulum:</span>
          <span className="text-[10px] bg-teal-100 text-teal-800 font-extrabold px-2 py-0.5 rounded-full">
            Rutbahmu: {profile.rutbah}
          </span>
        </div>

        <div className="grid grid-cols-4 gap-1.5">
          {levelsList.map((lvl) => {
            const isSelected = selectedLevel === lvl.lvl;
            const isLocked = lvl.lvl > profile.level + 1;

            return (
              <button
                key={lvl.lvl}
                disabled={isLocked}
                onClick={() => {
                  setSelectedLevel(lvl.lvl);
                  const firstSkill = SKILLS_DATA.find(s => s.level === lvl.lvl);
                  if (firstSkill) setActiveSkillId(firstSkill.skill_id);
                  setLearnPhase('discover');
                  setPracticeStep(0);
                }}
                className={`py-2 px-1.5 rounded-2xl text-center transition-all ${
                  isSelected
                    ? 'bg-gradient-to-b from-teal-600 to-teal-700 text-white shadow-md font-bold'
                    : isLocked
                    ? 'bg-slate-100 text-slate-400 opacity-60 cursor-not-allowed'
                    : 'bg-amber-50 hover:bg-amber-100 text-slate-800 font-semibold'
                }`}
              >
                <span className="text-xs font-black block leading-none">{lvl.code}</span>
                <span className="text-[10px] block truncate mt-1">{lvl.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Difficult Words Review Banner (Bab 12 PDF) */}
      {profile.difficultWords.length > 0 && (
        <div className="bg-gradient-to-r from-amber-400/20 via-orange-400/20 to-amber-400/10 border-2 border-amber-300 rounded-3xl p-3.5 flex items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center font-bold text-lg shrink-0">
              ⚡
            </div>
            <div>
              <h5 className="font-bold text-xs text-amber-950">Buku Kata Sulit ({profile.difficultWords.length} Item)</h5>
              <p className="text-[11px] text-amber-900 leading-tight">Pengulangan terjadwal SRS untuk memperkuat daya ingat.</p>
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
            Latihan 3 Mnt
          </button>
        </div>
      )}

      {/* Main Learning Unit View */}
      <div className="bg-white rounded-3xl p-4 border border-amber-200 shadow-sm">
        {/* Unit Info Header */}
        <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3 mb-3">
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className={`text-[10px] font-black text-white px-2 py-0.5 rounded-full ${ownerIsland?.badgeBg || 'bg-teal-600'}`}>
                {ownerIsland?.name_id || 'Pulau Keterampilan'}
              </span>
              <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-full">
                ID: {currentSkill.skill_id}
              </span>
              {profile.skillsMastered.includes(currentSkill.skill_id) && (
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                  <CheckCircle2 className="w-3 h-3" /> Mastered
                </span>
              )}
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-1">{currentSkill.name}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{currentSkill.description}</p>
          </div>
        </div>

        {/* Learning Phase Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl mb-4 text-xs font-bold">
          <button
            onClick={() => setLearnPhase('discover')}
            className={`flex-1 py-1.5 rounded-xl transition-all ${
              learnPhase === 'discover' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            1. Pahami (Discover)
          </button>
          <button
            onClick={() => {
              setLearnPhase('practice');
              setPracticeStep(0);
            }}
            className={`flex-1 py-1.5 rounded-xl transition-all ${
              learnPhase === 'practice' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            2. Latihan (Practice)
          </button>
          <button
            onClick={() => onLaunchGame(currentSkill.owner_island === 'HRF' ? 'sand_trace' : currentSkill.owner_island === 'MFR' ? 'floating_market' : 'sentence_bridge')}
            className="flex-1 py-1.5 rounded-xl text-purple-700 font-extrabold hover:bg-white/50 transition-all flex items-center justify-center gap-1"
          >
            <span>3. Game (Apply)</span> 🎮
          </button>
        </div>

        {/* Phase 1: Discover & Understand */}
        {learnPhase === 'discover' && (
          <div className="space-y-3">
            <p className="text-xs font-bold text-slate-700">
              Daftar Kosakata & Bentuk Kata Unit Ini (Ketuk untuk audio):
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {skillLexemes.map((lex) => (
                <div
                  key={lex.id}
                  onClick={() => handlePlayArabic(lex.ar_vocalized)}
                  className="p-3 rounded-2xl bg-gradient-to-r from-amber-50/70 to-teal-50/70 border border-amber-200 hover:border-teal-400 cursor-pointer transition-all flex items-center justify-between gap-2 shadow-2xs group active:scale-98"
                >
                  <div className="flex items-center gap-2.5">
                    <button
                      className="w-10 h-10 rounded-xl bg-teal-500 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform"
                      title="Putar Audio Fasih"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">{lex.gloss_id}</span>
                      <span className="text-[11px] text-slate-500">{lex.translit}</span>
                    </div>
                  </div>

                  <span className="font-arabic text-2xl font-bold text-teal-900 leading-none">
                    {lex.ar_vocalized}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setLearnPhase('practice');
                setPracticeStep(0);
              }}
              className="w-full mt-4 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-2xl font-bold text-xs shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              Mulai Latihan Interaktif (Practice) <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Phase 2: Practice Latihan Interaktif */}
        {learnPhase === 'practice' && currentPractice && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-bold text-teal-800">Soal {practiceStep + 1} dari 3</span>
              <span>Skor Benar: {practiceScore}</span>
            </div>

            {/* Prompt Card */}
            <div className="bg-gradient-to-b from-amber-50 to-teal-50 rounded-2xl p-5 border-2 border-teal-200 text-center shadow-xs">
              <span className="text-xs text-slate-500 font-semibold">Tebak arti kata berikut:</span>
              <div className="my-2 flex items-center justify-center gap-2">
                <span className="font-arabic text-4xl font-bold text-slate-900 leading-tight">
                  {currentPractice.ar_vocalized}
                </span>
                <button
                  onClick={() => handlePlayArabic(currentPractice.ar_vocalized)}
                  className="w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center shadow-xs active:scale-95"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <span className="text-xs text-slate-500 font-medium">({currentPractice.translit})</span>
            </div>

            {/* Multiple Choice Options */}
            <div className="space-y-2">
              {(() => {
                // Pick 2 real distractor words from LEXICON_DATA
                const otherWords = LEXICON_DATA.filter(l => l.id !== currentPractice.id);
                const d1 = otherWords[(practiceStep * 3 + 1) % otherWords.length]?.gloss_id || 'kata lain';
                const d2 = otherWords[(practiceStep * 3 + 4) % otherWords.length]?.gloss_id || 'pilihan lain';
                const opts = [
                  { text: currentPractice.gloss_id, isCorrect: true },
                  { text: d1, isCorrect: false },
                  { text: d2, isCorrect: false },
                ];
                // Stable pseudo-random order based on step
                const shuffled = practiceStep % 3 === 0
                  ? [opts[1], opts[0], opts[2]]
                  : practiceStep % 3 === 1
                  ? [opts[2], opts[1], opts[0]]
                  : [opts[0], opts[2], opts[1]];

                return shuffled.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswerPractice(opt.isCorrect)}
                    className="w-full p-3.5 rounded-2xl border-2 border-amber-200 hover:border-teal-500 hover:bg-teal-50/50 text-left text-xs font-bold text-slate-800 transition-all shadow-2xs active:scale-98"
                  >
                    {opt.text}
                  </button>
                ));
              })()}
            </div>
          </div>
        )}

        {/* Phase 3: Summary of Skill */}
        {learnPhase === 'summary' && (
          <div className="text-center py-4 space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
              <Award className="w-9 h-9" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 font-chibi">Mumtaz! Latihan Selesai!</h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto">
              Kamu telah menyelesaikan unit pembelajaran ini. Bukti belajar telah dicatat di Learning Engine!
            </p>

            <div className="flex items-center justify-center gap-2 bg-amber-100 text-amber-900 font-bold px-4 py-2 rounded-2xl text-xs max-w-xs mx-auto">
              <span>+80 XP</span> • <span>+4 Bintang</span>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setLearnPhase('discover')}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
              >
                Ulangi Unit
              </button>
              <button
                onClick={() => onLaunchGame(currentSkill.owner_island === 'HRF' ? 'sand_trace' : currentSkill.owner_island === 'MFR' ? 'floating_market' : 'sentence_bridge')}
                className="flex-1 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-md"
              >
                Mainkan Game Pulau 🎮
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Skills list selector in this level */}
      <div className="bg-white rounded-3xl p-4 border border-amber-200 shadow-sm">
        <h4 className="font-bold text-xs text-slate-700 uppercase tracking-wide mb-2.5">
          Unit Skill Tersedia di Jenjang {levelsList.find(l => l.lvl === selectedLevel)?.name}:
        </h4>

        <div className="space-y-1.5">
          {skillsAtLevel.map((skill) => {
            const isSelected = skill.skill_id === activeSkillId;
            const isMastered = profile.skillsMastered.includes(skill.skill_id);

            return (
              <button
                key={skill.skill_id}
                onClick={() => {
                  setActiveSkillId(skill.skill_id);
                  setLearnPhase('discover');
                  setPracticeStep(0);
                }}
                className={`w-full p-2.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
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
                  <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {skill.owner_island}
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
  );
};
