import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  Volume2,
  Sparkles,
  Award,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Layers,
  Star,
  Check,
  X,
  Play,
  RotateCcw,
  HelpCircle,
  Flame,
  Info
} from 'lucide-react';
import { UserProfile } from '../types/game';
import {
  HIJAIYAH_DATA,
  IQRA_JILID_DATA,
  HijaiyahLetter,
  IqraJilid,
  IqraPage,
  IqraWordItem,
  calculateIqraProgressStats
} from '../data/iqraData';
import { sound } from '../services/sound';
import { DailyTargetService } from '../services/dailyTargetService';
import { GameStorage } from '../services/storage';

interface IqraAdventureModalProps {
  profile: UserProfile;
  onClose: () => void;
  onReward: (xp: number, stars: number) => void;
}

export const IqraAdventureModal: React.FC<IqraAdventureModalProps> = ({
  profile,
  onClose,
  onReward
}) => {
  const [activeTab, setActiveTab] = useState<'reader' | 'hijaiyah' | 'quiz'>('reader');
  const [selectedJilidNum, setSelectedJilidNum] = useState<number>(profile.iqraProgress?.currentJilid || 1);
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [activeWordId, setActiveWordId] = useState<string | null>(null);
  const [selectedMakhrajFilter, setSelectedMakhrajFilter] = useState<string>('ALL');
  const [selectedLetter, setSelectedLetter] = useState<HijaiyahLetter>(HIJAIYAH_DATA[1]); // Ba default
  const [selectedLetterHarakat, setSelectedLetterHarakat] = useState<'fathah' | 'kasrah' | 'dhammah' | 'tanwin' | 'sukun' | 'tasydid'>('fathah');
  
  // Quiz state
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [quizFeedback, setQuizFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [quizScore, setQuizScore] = useState<number>(0);

  const completedPageIds = profile.iqraProgress?.completedPages || [];
  const stats = calculateIqraProgressStats(completedPageIds);

  const currentJilid: IqraJilid = IQRA_JILID_DATA.find(j => j.jilid === selectedJilidNum) || IQRA_JILID_DATA[0];
  const currentPage: IqraPage = currentJilid.pages[currentPageIndex] || currentJilid.pages[0];

  const handlePlayWord = (word: IqraWordItem) => {
    setActiveWordId(word.id);
    sound.speakArabic(word.audioText || word.ar, 0.85);
    // Record word read in daily target
    DailyTargetService.recordIqraRead(1);
  };

  const handleCompletePage = () => {
    sound.playSuccess();
    sound.playFanfare();
    DailyTargetService.recordIqraRead(currentPage.words.length);
    GameStorage.addReward(50, 2, 'qiraah', 5);
    if (currentPage.metadata) {
      GameStorage.recordIqraPageCompleted(currentPage.metadata.pageId, 3, selectedJilidNum);
    }
    onReward(50, 2);

    if (currentPageIndex < currentJilid.pages.length - 1) {
      setCurrentPageIndex(prev => prev + 1);
    }
  };

  const handlePlayLetter = (letter: HijaiyahLetter, harakatKey?: typeof selectedLetterHarakat) => {
    const hk = harakatKey || selectedLetterHarakat;
    const example = letter.harakatExamples[hk];
    sound.speakArabic(example.ar, 0.85);
  };

  const filteredLetters = HIJAIYAH_DATA.filter(l => {
    if (selectedMakhrajFilter === 'ALL') return true;
    return l.makhrajCategory.includes(selectedMakhrajFilter);
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        className="w-full max-w-4xl bg-teal-50 rounded-[36px] shadow-2xl border-4 border-teal-400 overflow-hidden flex flex-col my-auto max-h-[96vh]"
      >
        {/* Header Banner */}
        <div className="relative bg-gradient-to-r from-teal-800 via-cyan-800 to-teal-900 text-white p-4 sm:p-5 border-b-4 border-teal-400">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 text-slate-950 font-black text-2xl flex items-center justify-center shadow-md">
                📖
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-amber-400 text-amber-950 px-2 py-0.5 rounded-full">
                    Qur'an Learning Adventure
                  </span>
                  <span className="text-[10px] bg-white/20 text-teal-200 font-bold px-2 py-0.5 rounded-full">
                    Metode Iqra 1–6 & 28 Hijaiyah
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-black font-chibi mt-0.5 flex items-center gap-1.5">
                  <span>Petualangan Iqra & Tartil Hijaiyah</span>
                </h2>
                <p className="text-xs text-teal-200">
                  Belajar membaca dari nol hingga mahir bertajweed dengan audio makhraj interaktif
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white font-bold flex items-center justify-center transition-colors active:scale-95 shrink-0"
            >
              ✕
            </button>
          </div>

          {/* Sub Navigation Bar */}
          <div className="mt-4 flex gap-1.5 bg-black/20 p-1 rounded-2xl backdrop-blur-xs text-xs font-bold">
            <button
              onClick={() => setActiveTab('reader')}
              className={`flex-1 py-1.5 px-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'reader'
                  ? 'bg-amber-400 text-amber-950 shadow-md font-black'
                  : 'text-teal-100 hover:bg-white/10'
              }`}
            >
              <span>📖</span>
              <span>Iqra 1–6 Interaktif</span>
            </button>

            <button
              onClick={() => setActiveTab('hijaiyah')}
              className={`flex-1 py-1.5 px-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'hijaiyah'
                  ? 'bg-amber-400 text-amber-950 shadow-md font-black'
                  : 'text-teal-100 hover:bg-white/10'
              }`}
            >
              <span>🔤</span>
              <span>Ensiklopedia 28 Huruf</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex-1 py-1.5 px-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'quiz'
                  ? 'bg-amber-400 text-amber-950 shadow-md font-black'
                  : 'text-teal-100 hover:bg-white/10'
              }`}
            >
              <span>🎯</span>
              <span>Kuis Uji Kelancaran</span>
            </button>
          </div>

          {/* Global 36-Page Progress Bar */}
          <div className="mt-3 bg-teal-950/70 p-2.5 rounded-2xl border border-teal-500/40">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-extrabold text-amber-300 flex items-center gap-1.5">
                <span>🌟</span> Kemajuan Belajar Iqra 36 Lembar Progresif
              </span>
              <span className="font-black text-teal-200">
                {stats.completedPagesCount} / 36 Lembar ({stats.completionPercentage}%)
              </span>
            </div>
            <div className="w-full h-2.5 bg-black/40 rounded-full overflow-hidden p-0.5 border border-teal-500/30">
              <div
                className="h-full bg-gradient-to-r from-amber-400 via-yellow-400 to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${Math.max(3, stats.completionPercentage)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 flex-1 overflow-y-auto">
          {/* TAB 1: IQRA PROGRESSIVE READER (JILID 1-6) */}
          {activeTab === 'reader' && (
            <div className="space-y-4">
              {/* Jilid 1 to 6 selector strip */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {IQRA_JILID_DATA.map((jld) => {
                  const isSelected = selectedJilidNum === jld.jilid;
                  const jilidCompletedCount = jld.pages.filter(p => completedPageIds.includes(p.metadata?.pageId || '')).length;
                  return (
                    <button
                      key={jld.jilid}
                      onClick={() => {
                        setSelectedJilidNum(jld.jilid);
                        setCurrentPageIndex(0);
                        sound.playSparkle();
                      }}
                      className={`flex-shrink-0 px-3 py-1.5 rounded-xl border font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? 'bg-teal-700 text-white border-teal-800 shadow-sm font-black'
                          : 'bg-white text-slate-700 border-teal-200 hover:bg-teal-50'
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full bg-amber-400 text-amber-950 font-black text-[10px] flex items-center justify-center">
                        {jld.jilid}
                      </span>
                      <span>Iqra {jld.jilid}</span>
                      {jilidCompletedCount === 6 && (
                        <span className="text-[10px] text-emerald-400 font-black">✓</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Jilid Overview Card */}
              <div className="bg-white p-3.5 rounded-2xl border border-teal-200 shadow-2xs">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-teal-700 bg-teal-100 px-2 py-0.2 rounded-full">
                      {currentJilid.levelBadge}
                    </span>
                    <h3 className="font-extrabold text-sm text-slate-900 mt-1">
                      {currentJilid.title}: {currentJilid.focus}
                    </h3>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] font-bold text-slate-400 block">Halaman Jilid</span>
                    <span className="text-xs font-black text-teal-800">
                      {currentPageIndex + 1} dari {currentJilid.pages.length}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {currentJilid.description}
                </p>
              </div>

              {/* 6-Page Progressive Navigator */}
              <div className="bg-teal-900/10 p-2 sm:p-2.5 rounded-2xl border border-teal-200">
                <div className="flex items-center justify-between mb-1.5 px-1">
                  <span className="text-[11px] font-extrabold text-teal-900 flex items-center gap-1.5">
                    <span>📑</span> 6 Lembar Progresif Iqra {selectedJilidNum} (Total 36 Lembar)
                  </span>
                  <span className="text-[10px] font-bold text-teal-700 bg-white/80 px-2 py-0.5 rounded-full border border-teal-200">
                    Hal. {currentPageIndex + 1} dari 6
                  </span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                  {currentJilid.pages.map((pg, idx) => {
                    const isCurrent = currentPageIndex === idx;
                    const isCompleted = completedPageIds.includes(pg.metadata?.pageId || '');
                    return (
                      <button
                        key={pg.pageNumber}
                        onClick={() => {
                          setCurrentPageIndex(idx);
                          sound.playPop();
                        }}
                        className={`py-1.5 px-2 rounded-xl text-xs font-black transition-all flex flex-col items-center justify-center cursor-pointer border relative ${
                          isCurrent
                            ? 'bg-teal-700 text-white border-teal-800 shadow-md ring-2 ring-teal-400'
                            : isCompleted
                            ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                            : 'bg-white hover:bg-teal-50 text-slate-700 border-teal-200 shadow-2xs'
                        }`}
                      >
                        <div className="flex items-center gap-1">
                          <span className="text-[11px]">Hal. {idx + 1}</span>
                          {isCompleted && <span className="text-emerald-600 text-[10px]">✓</span>}
                        </div>
                        <span className={`text-[8px] font-semibold truncate max-w-full ${isCurrent ? 'text-teal-200' : isCompleted ? 'text-emerald-700' : 'text-slate-500'}`}>
                          {idx === 5 ? 'Evaluasi' : `Materi ${idx + 1}`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Current Page Header & Detailed Progress Metadata */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-3.5 rounded-2xl border border-amber-200 space-y-2">
                <div className="flex items-center justify-between flex-wrap gap-1.5">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-teal-800 text-teal-100 px-2.5 py-0.5 rounded-full shadow-2xs">
                      Lembar {currentPage.metadata?.globalPageNumber || (selectedJilidNum - 1) * 6 + currentPageIndex + 1} / 36
                    </span>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full capitalize ${
                      currentPage.metadata?.difficultyTier === 'pemula'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : currentPage.metadata?.difficultyTier === 'dasar'
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : currentPage.metadata?.difficultyTier === 'menengah'
                        ? 'bg-blue-100 text-blue-800 border border-blue-300'
                        : currentPage.metadata?.difficultyTier === 'lanjutan'
                        ? 'bg-purple-100 text-purple-800 border border-purple-300'
                        : 'bg-rose-100 text-rose-800 border border-rose-300'
                    }`}>
                      Tingkat: {currentPage.metadata?.difficultyTier || 'Dasar'} (Skor: {currentPage.metadata?.difficultyScore || 20}/100)
                    </span>
                    {currentPage.metadata?.tajweedCategory && (
                      <span className="text-[10px] font-bold bg-white text-slate-700 px-2 py-0.5 rounded-full border border-amber-300">
                        Tajwid: {currentPage.metadata.tajweedCategory}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1 text-[11px] font-black text-amber-900">
                    {completedPageIds.includes(currentPage.metadata?.pageId || '') ? (
                      <span className="bg-emerald-600 text-white px-2 py-0.5 rounded-full flex items-center gap-1 text-[10px]">
                        <Check className="w-3 h-3" /> Sudah Dikuasai
                      </span>
                    ) : (
                      <span className="bg-amber-200/80 text-amber-950 px-2 py-0.5 rounded-full text-[10px]">
                        Target Belajar
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-extrabold text-sm text-amber-950 flex items-center gap-1.5">
                    <span>💡</span> {currentPage.title}
                  </h4>
                  <p className="text-xs text-amber-900 mt-0.5 font-medium leading-relaxed">
                    {currentPage.conceptRule}
                  </p>
                </div>

                {/* Competency & Target Characters Metadata Row */}
                {currentPage.metadata && (
                  <div className="pt-2 border-t border-amber-200/80 flex items-center justify-between flex-wrap gap-2 text-[11px] text-slate-600">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-bold text-slate-500">Fokus Kompetensi:</span>
                      <span className="font-semibold text-slate-800">{currentPage.metadata.competencyFocus}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {currentPage.metadata.targetCharacters && currentPage.metadata.targetCharacters.length > 0 && (
                        <div className="flex items-center gap-1">
                          <span className="font-bold text-slate-500">Target:</span>
                          <div className="flex gap-1">
                            {currentPage.metadata.targetCharacters.slice(0, 4).map((ch, cIdx) => (
                              <span key={cIdx} className="font-arabic font-bold bg-white px-1.5 py-0.2 rounded border border-amber-300 text-teal-800 text-xs">
                                {ch}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      <span className="text-slate-400 font-bold">•</span>
                      <span className="font-bold text-amber-800">⏱️ {currentPage.metadata.estimatedMinutes} Mnt</span>
                      <span className="text-slate-400 font-bold">•</span>
                      <span className="font-bold text-emerald-800">+{currentPage.metadata.xpReward} XP</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Iqra Words Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {currentPage.words.map((word) => {
                  const isPlaying = activeWordId === word.id;
                  return (
                    <motion.div
                      key={word.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handlePlayWord(word)}
                      className={`p-3.5 rounded-2xl border-2 text-center transition-all cursor-pointer relative flex flex-col justify-between ${
                        isPlaying
                          ? 'bg-amber-100/90 border-amber-500 shadow-md ring-2 ring-amber-400'
                          : 'bg-white border-teal-200 hover:border-teal-400 shadow-2xs'
                      }`}
                    >
                      {word.ruleTag && (
                        <span className="absolute top-1.5 left-1.5 text-[8px] font-black uppercase bg-teal-100 text-teal-800 px-1.5 py-0.2 rounded-md">
                          {word.ruleTag}
                        </span>
                      )}

                      <div className="my-2">
                        <span className="font-arabic text-3xl font-bold text-slate-900 tracking-wider block">
                          {word.ar}
                        </span>
                        <span className="text-xs font-bold text-teal-700 block mt-1">
                          {word.translit}
                        </span>
                        {word.meaning && (
                          <span className="text-[10px] text-slate-500 block leading-tight">
                            "{word.meaning}"
                          </span>
                        )}
                      </div>

                      {/* Syllable pill taps */}
                      {word.syllables && word.syllables.length > 1 && (
                        <div className="flex items-center justify-center gap-1 pt-1 border-t border-slate-100">
                          {word.syllables.map((syl, sIdx) => (
                            <span
                              key={sIdx}
                              className="text-[10px] font-arabic font-bold bg-teal-50 text-teal-900 border border-teal-200 px-1.5 py-0.2 rounded-md"
                            >
                              {syl}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="mt-2 flex items-center justify-center gap-1 text-[10px] text-slate-400 font-bold">
                        <Volume2 className="w-3 h-3 text-teal-600" />
                        <span>Ketuk Suara</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Page Controls & Completion */}
              <div className="flex items-center justify-between pt-2 border-t border-teal-200">
                <button
                  disabled={currentPageIndex === 0}
                  onClick={() => setCurrentPageIndex(prev => Math.max(0, prev - 1))}
                  className="px-3 py-2 rounded-xl bg-white border border-teal-200 text-slate-700 font-bold text-xs disabled:opacity-40 flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Halaman Sebelumnya
                </button>

                <button
                  onClick={handleCompletePage}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-extrabold text-xs shadow-md flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />
                  <span>Selesai Dibaca (+50 XP)</span>
                </button>

                <button
                  disabled={currentPageIndex === currentJilid.pages.length - 1}
                  onClick={() => setCurrentPageIndex(prev => Math.min(currentJilid.pages.length - 1, prev + 1))}
                  className="px-3 py-2 rounded-xl bg-white border border-teal-200 text-slate-700 font-bold text-xs disabled:opacity-40 flex items-center gap-1 cursor-pointer"
                >
                  Halaman Berikutnya <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: ENCYCLOPEDIA 28 HIJAIYAH & MAKHARIJUL HURUF */}
          {activeTab === 'hijaiyah' && (
            <div className="space-y-4">
              {/* Makhraj Category Filter */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none text-xs font-bold">
                {[
                  { id: 'ALL', label: 'Semua 28 Huruf' },
                  { id: 'Al-Jauf', label: 'Rongga Mulut' },
                  { id: 'Al-Halq', label: 'Tenggorokan' },
                  { id: 'Al-Lisan', label: 'Lidah' },
                  { id: 'Asy-Syafatan', label: 'Dua Bibir' }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedMakhrajFilter(f.id)}
                    className={`px-3 py-1.5 rounded-xl border whitespace-nowrap cursor-pointer transition-all ${
                      selectedMakhrajFilter === f.id
                        ? 'bg-teal-700 text-white border-teal-800 shadow-2xs font-black'
                        : 'bg-white text-slate-700 border-teal-200 hover:bg-teal-50'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Letter Grid */}
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                {filteredLetters.map((l) => {
                  const isSelected = selectedLetter.char === l.char;
                  return (
                    <motion.button
                      key={l.char}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSelectedLetter(l);
                        handlePlayLetter(l);
                      }}
                      className={`p-2.5 rounded-2xl border-2 text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-gradient-to-br from-amber-400 to-orange-400 border-amber-600 text-slate-950 shadow-md font-black'
                          : 'bg-white border-teal-200 hover:border-teal-400 text-slate-900 shadow-2xs'
                      }`}
                    >
                      <span className="font-arabic text-2xl font-bold block">{l.char}</span>
                      <span className="text-[10px] font-bold block mt-0.5">{l.translit}</span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Detailed Active Letter Inspector Card */}
              <div className="bg-white p-4 rounded-3xl border-2 border-teal-300 shadow-sm space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-2xl bg-teal-100 border-2 border-teal-300 flex items-center justify-center text-4xl font-arabic font-black text-teal-900 shadow-xs">
                      {selectedLetter.char}
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase text-teal-800 bg-teal-100 px-2 py-0.2 rounded-full">
                        {selectedLetter.makhrajCategory}
                      </span>
                      <h4 className="font-black text-base text-slate-900 mt-0.5">
                        Huruf {selectedLetter.name} ({selectedLetter.translit})
                      </h4>
                      <p className="text-xs text-slate-600 leading-tight">
                        {selectedLetter.makhrajDesc}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handlePlayLetter(selectedLetter)}
                    className="p-3 bg-amber-400 hover:bg-amber-300 active:scale-95 text-amber-950 rounded-2xl shadow-md transition-all flex items-center gap-1 text-xs font-black cursor-pointer shrink-0"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Lafalkan</span>
                  </button>
                </div>

                {/* Harakat Switcher */}
                <div>
                  <span className="text-[11px] font-black text-slate-700 block mb-1">
                    Coba Suara Berbagai Harakat:
                  </span>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 text-xs font-bold">
                    {(['fathah', 'kasrah', 'dhammah', 'tanwin', 'sukun', 'tasydid'] as const).map((hk) => {
                      const isHkActive = selectedLetterHarakat === hk;
                      const ex = selectedLetter.harakatExamples[hk];
                      return (
                        <button
                          key={hk}
                          onClick={() => {
                            setSelectedLetterHarakat(hk);
                            handlePlayLetter(selectedLetter, hk);
                          }}
                          className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                            isHkActive
                              ? 'bg-teal-700 text-white border-teal-800 shadow-2xs font-black'
                              : 'bg-slate-50 border-slate-200 hover:bg-teal-50 text-slate-800'
                          }`}
                        >
                          <span className="font-arabic text-lg font-bold block">{ex.ar}</span>
                          <span className="text-[9px] uppercase tracking-wider block opacity-90">{hk}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4 Connected Letter Forms (Lepas, Awal, Tengah, Akhir) */}
                <div className="pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-black text-slate-700 block mb-1">
                    Bentuk Sambung dalam Kata (Khat Rasm):
                  </span>
                  <div className="grid grid-cols-4 gap-2 text-center text-xs">
                    <div className="p-2 rounded-xl bg-teal-50/70 border border-teal-200">
                      <span className="text-[10px] text-teal-800 font-bold block">Mandiri</span>
                      <span className="font-arabic text-xl font-bold text-slate-900 mt-0.5 block">
                        {selectedLetter.forms.isolated}
                      </span>
                    </div>
                    <div className="p-2 rounded-xl bg-teal-50/70 border border-teal-200">
                      <span className="text-[10px] text-teal-800 font-bold block">Di Awal</span>
                      <span className="font-arabic text-xl font-bold text-slate-900 mt-0.5 block">
                        {selectedLetter.forms.start}
                      </span>
                    </div>
                    <div className="p-2 rounded-xl bg-teal-50/70 border border-teal-200">
                      <span className="text-[10px] text-teal-800 font-bold block">Di Tengah</span>
                      <span className="font-arabic text-xl font-bold text-slate-900 mt-0.5 block">
                        {selectedLetter.forms.middle}
                      </span>
                    </div>
                    <div className="p-2 rounded-xl bg-teal-50/70 border border-teal-200">
                      <span className="text-[10px] text-teal-800 font-bold block">Di Akhir</span>
                      <span className="font-arabic text-xl font-bold text-slate-900 mt-0.5 block">
                        {selectedLetter.forms.end}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200 text-xs text-amber-900 font-medium">
                  <strong>Sifat Huruf:</strong> {selectedLetter.sifat}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: QUIZ & TAJWEED EVALUATION */}
          {activeTab === 'quiz' && (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-3xl border border-teal-200 shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black text-teal-800 uppercase tracking-wide">
                    Evaluasi Kelancaran Iqra {selectedJilidNum}
                  </span>
                  <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                    Skor: {quizScore} Benar
                  </span>
                </div>

                {currentJilid.quizQuestions.length > 0 ? (
                  (() => {
                    const q = currentJilid.quizQuestions[quizIndex % currentJilid.quizQuestions.length];
                    return (
                      <div className="space-y-3">
                        <div className="p-3 bg-teal-50 rounded-2xl border border-teal-200">
                          <h4 className="font-bold text-sm text-slate-900 leading-snug">
                            {q.question}
                          </h4>
                          {q.arPrompt && (
                            <div className="mt-2 text-center">
                              <span className="font-arabic text-3xl font-black text-teal-900 inline-block px-4 py-1 bg-white rounded-xl border border-teal-300">
                                {q.arPrompt}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Options */}
                        <div className="space-y-2">
                          {q.options.map((opt, oIdx) => (
                            <button
                              key={oIdx}
                              onClick={() => {
                                if (quizFeedback !== null) return;
                                setQuizFeedback({ isCorrect: opt.isCorrect, text: opt.feedback });
                                if (opt.isCorrect) {
                                  sound.playSuccess();
                                  setQuizScore(prev => prev + 1);
                                  GameStorage.addReward(30, 1, 'qiraah', 5);
                                  onReward(30, 1);
                                } else {
                                  sound.playGentleRetry();
                                }
                              }}
                              className={`w-full p-3 rounded-2xl border text-left font-bold text-xs transition-all flex items-center justify-between cursor-pointer ${
                                quizFeedback !== null
                                  ? opt.isCorrect
                                    ? 'bg-emerald-100 border-emerald-400 text-emerald-950'
                                    : 'bg-slate-50 border-slate-200 text-slate-400'
                                  : 'bg-white border-teal-200 hover:border-teal-400 text-slate-800'
                              }`}
                            >
                              <div>
                                <span className="font-arabic text-lg font-bold mr-2">{opt.ar}</span>
                                <span className="text-slate-600 font-medium">({opt.translit})</span>
                              </div>
                              <span className="text-xs text-teal-700">Pilih ▶</span>
                            </button>
                          ))}
                        </div>

                        {/* Feedback Banner */}
                        {quizFeedback && (
                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`p-3 rounded-2xl border text-xs font-bold ${
                              quizFeedback.isCorrect
                                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                                : 'bg-rose-50 border-rose-300 text-rose-900'
                            }`}
                          >
                            <p>{quizFeedback.text}</p>
                            <button
                              onClick={() => {
                                setQuizFeedback(null);
                                setQuizIndex(prev => (prev + 1) % currentJilid.quizQuestions.length);
                              }}
                              className="mt-2 px-3 py-1 bg-teal-700 text-white rounded-xl text-xs font-bold hover:bg-teal-800"
                            >
                              Lanjut Soal Berikutnya ▶
                            </button>
                          </motion.div>
                        )}
                      </div>
                    );
                  })()
                ) : (
                  <p className="text-xs text-slate-500">Soal kuis untuk jilid ini siap diperbarui.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
