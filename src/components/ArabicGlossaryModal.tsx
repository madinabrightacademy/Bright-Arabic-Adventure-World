import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  Volume2,
  Sparkles,
  Search,
  CheckCircle2,
  AlertCircle,
  X,
  Play,
  RotateCcw,
  Layers,
  Star,
  Check,
  Bookmark,
  Filter,
  ArrowRight,
  Shuffle
} from 'lucide-react';
import { UserProfile, Lexeme, IslandId } from '../types/game';
import { LEXICON_DATA, ISLANDS_DATA } from '../data/curriculum';
import { getLexemeContextSentence } from '../data/glossarySentences';
import { GameStorage } from '../services/storage';
import { sound } from '../services/sound';

interface ArabicGlossaryModalProps {
  profile: UserProfile;
  onClose: () => void;
  onUpdateProfile: (updatedProfile: UserProfile) => void;
  onReward: (xp: number, stars: number) => void;
  initialTab?: 'difficult' | 'mastered' | 'all';
}

type GlossaryTab = 'difficult' | 'mastered' | 'all';

export const ArabicGlossaryModal: React.FC<ArabicGlossaryModalProps> = ({
  profile,
  onClose,
  onUpdateProfile,
  onReward,
  initialTab = 'difficult'
}) => {
  const [activeTab, setActiveTab] = useState<GlossaryTab>(initialTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIsland, setSelectedIsland] = useState<string>('all');
  const [selectedPos, setSelectedPos] = useState<string>('all');
  const [currentlyPlayingAudio, setCurrentlyPlayingAudio] = useState<string | null>(null);

  // Flashcard mode state
  const [isFlashcardMode, setIsFlashcardMode] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [practiceCompleted, setPracticeCompleted] = useState(false);

  // Map island ID to Island object
  const islandMap = useMemo(() => {
    const map = new Map<IslandId, typeof ISLANDS_DATA[0]>();
    ISLANDS_DATA.forEach(isl => map.set(isl.id, isl));
    return map;
  }, []);

  // Filter words based on activeTab
  const baseWords = useMemo(() => {
    if (activeTab === 'difficult') {
      return LEXICON_DATA.filter(l => profile.difficultWords.includes(l.id));
    }
    if (activeTab === 'mastered') {
      return LEXICON_DATA.filter(l => profile.wordsMastered.includes(l.id));
    }
    return LEXICON_DATA;
  }, [activeTab, profile.difficultWords, profile.wordsMastered]);

  // Apply search query, island, and POS filters
  const filteredWords = useMemo(() => {
    return baseWords.filter(word => {
      // Search match
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        word.ar_vocalized.includes(q) ||
        word.ar_plain.includes(q) ||
        word.translit.toLowerCase().includes(q) ||
        word.gloss_id.toLowerCase().includes(q) ||
        word.category.toLowerCase().includes(q);

      // Island match
      const matchIsland = selectedIsland === 'all' || word.owner_island === selectedIsland;

      // POS match
      const matchPos = selectedPos === 'all' || word.pos === selectedPos;

      return matchSearch && matchIsland && matchPos;
    });
  }, [baseWords, searchQuery, selectedIsland, selectedPos]);

  // Audio playback handler
  const handlePlayAudio = (text: string, rate: number = 0.85, audioId: string) => {
    setCurrentlyPlayingAudio(audioId);
    sound.speakArabic(text, rate);
    setTimeout(() => {
      setCurrentlyPlayingAudio(null);
    }, 1800);
  };

  // Mark word learned (resolve difficult word)
  const handleMarkLearned = (wordId: string) => {
    sound.playSuccess();
    const updated = GameStorage.markWordLearned(wordId);
    onUpdateProfile(updated);
    onReward(15, 1);
  };

  // Mark word as difficult (add to study list)
  const handleMarkDifficult = (wordId: string) => {
    sound.playGentleRetry();
    const updated = GameStorage.markWordDifficult(wordId);
    onUpdateProfile(updated);
  };

  // Seed sample challenging words if difficult list is empty
  const handleAddSampleDifficult = () => {
    sound.playSparkle();
    const sampleIds = ['lx_tsaa', 'lx_asyarah', 'lx_qalb_kalb', 'lx_mad_qala', 'lx_tamr'];
    let p = profile;
    sampleIds.forEach(id => {
      p = GameStorage.markWordDifficult(id);
    });
    onUpdateProfile(p);
  };

  // Flashcard controls
  const flashcardWords = useMemo(() => {
    return filteredWords.length > 0 ? filteredWords : baseWords;
  }, [filteredWords, baseWords]);

  const currentFlashcard = flashcardWords[cardIndex] || null;

  const handleNextFlashcard = (passed: boolean) => {
    if (!currentFlashcard) return;

    if (passed) {
      sound.playSuccess();
      handleMarkLearned(currentFlashcard.id);
    } else {
      sound.playGentleRetry();
    }

    setIsFlipped(false);
    if (cardIndex + 1 < flashcardWords.length) {
      setCardIndex(prev => prev + 1);
    } else {
      setPracticeCompleted(true);
    }
  };

  const handleResetFlashcards = () => {
    setCardIndex(0);
    setIsFlipped(false);
    setPracticeCompleted(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 16 }}
        className="bg-amber-50/95 border-2 border-amber-300 w-full max-w-2xl max-h-[92vh] rounded-[32px] shadow-2xl flex flex-col overflow-hidden text-slate-800"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white p-4 sm:p-5 relative border-b border-amber-400 flex-shrink-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl shadow-inner border border-white/30">
                📚
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-lg sm:text-xl font-chibi">
                    Glosarium & Buku Kata Sulit
                  </h3>
                  <span className="text-[10px] bg-amber-300 text-amber-950 font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {profile.audience === 'child' ? 'Anak' : 'Dewasa'}
                  </span>
                </div>
                <p className="font-arabic text-amber-100 text-sm mt-0.5">
                  مُعْجَمُ الكَلِمَاتِ الصَّعْبَةِ وَالمُفْرَدَاتِ المُتَقَدِّمَةِ
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-black/20 hover:bg-black/30 text-white flex items-center justify-center transition-all active:scale-90"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Subtitle & Quick Stats */}
          <div className="mt-3 pt-3 border-t border-white/20 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 bg-rose-950/40 px-2.5 py-1 rounded-xl font-bold text-rose-200">
                <AlertCircle className="w-3.5 h-3.5 text-rose-300" />
                {profile.difficultWords.length} Kata Perlu Dilatih
              </span>
              <span className="flex items-center gap-1.5 bg-emerald-950/40 px-2.5 py-1 rounded-xl font-bold text-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                {profile.wordsMastered.length} Kata Dikuasai
              </span>
            </div>

            {/* Toggle Flashcard Review Mode */}
            <button
              onClick={() => {
                sound.playSparkle();
                setIsFlashcardMode(!isFlashcardMode);
                handleResetFlashcards();
              }}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm active:scale-95 ${
                isFlashcardMode
                  ? 'bg-white text-orange-700'
                  : 'bg-amber-400 text-slate-950 hover:bg-amber-300'
              }`}
            >
              {isFlashcardMode ? (
                <>
                  <BookOpen className="w-3.5 h-3.5" />
                  Mode Daftar Kamus
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  Latih Kilat Flashcard
                </>
              )}
            </button>
          </div>
        </div>

        {/* Normal List View */}
        {!isFlashcardMode ? (
          <>
            {/* Filter Bar & Tabs */}
            <div className="bg-white/80 border-b border-amber-200 p-3 flex-shrink-0 space-y-2">
              {/* Main Tabs */}
              <div className="flex gap-1.5 bg-amber-100/70 p-1 rounded-2xl text-xs font-bold">
                <button
                  onClick={() => {
                    sound.playSparkle();
                    setActiveTab('difficult');
                  }}
                  className={`flex-1 py-1.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === 'difficult'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'text-slate-700 hover:bg-white/50'
                  }`}
                >
                  <AlertCircle className="w-3.5 h-3.5" />
                  Kata Sulit ({profile.difficultWords.length})
                </button>

                <button
                  onClick={() => {
                    sound.playSparkle();
                    setActiveTab('mastered');
                  }}
                  className={`flex-1 py-1.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === 'mastered'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-700 hover:bg-white/50'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Dikuasai ({profile.wordsMastered.length})
                </button>

                <button
                  onClick={() => {
                    sound.playSparkle();
                    setActiveTab('all');
                  }}
                  className={`flex-1 py-1.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === 'all'
                      ? 'bg-teal-700 text-white shadow-xs'
                      : 'text-slate-700 hover:bg-white/50'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  Semua ({LEXICON_DATA.length})
                </button>
              </div>

              {/* Search input & Filter row */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari kata Arab, arti Indonesia, atau transliterasi..."
                    className="w-full pl-9 pr-3 py-2 bg-amber-50/70 rounded-xl border border-amber-200 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-800 placeholder-slate-400"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                    >
                      ×
                    </button>
                  )}
                </div>

                {/* Island Filter */}
                <select
                  value={selectedIsland}
                  onChange={(e) => setSelectedIsland(e.target.value)}
                  className="bg-amber-50/70 border border-amber-200 rounded-xl px-2 py-2 text-xs font-medium text-slate-700 focus:outline-none"
                >
                  <option value="all">Semua Pulau</option>
                  {ISLANDS_DATA.map(isl => (
                    <option key={isl.id} value={isl.id}>
                      {isl.name_id.split(' ')[0]} ({isl.id})
                    </option>
                  ))}
                </select>

                {/* Part of Speech Filter */}
                <select
                  value={selectedPos}
                  onChange={(e) => setSelectedPos(e.target.value)}
                  className="bg-amber-50/70 border border-amber-200 rounded-xl px-2 py-2 text-xs font-medium text-slate-700 focus:outline-none"
                >
                  <option value="all">Semua Jenis</option>
                  <option value="isim">Isim (Benda/Sifat)</option>
                  <option value="fiil">Fi'il (Kata Kerja)</option>
                  <option value="huruf">Huruf / Makhraj</option>
                  <option value="phrase">Frasa / Kalimat</option>
                </select>
              </div>
            </div>

            {/* Words List Scrollable Container */}
            <div className="p-3 sm:p-4 flex-1 overflow-y-auto space-y-3">
              {filteredWords.length > 0 ? (
                filteredWords.map((lex) => {
                  const isDifficult = profile.difficultWords.includes(lex.id);
                  const isMastered = profile.wordsMastered.includes(lex.id);
                  const contextSentence = getLexemeContextSentence(lex);
                  const island = islandMap.get(lex.owner_island);

                  return (
                    <div
                      key={lex.id}
                      className="bg-white rounded-2xl p-3.5 border border-amber-200/90 shadow-2xs hover:shadow-sm transition-all"
                    >
                      {/* Top metadata tags */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {/* Island badge */}
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${island?.badgeBg || 'bg-slate-700'} text-white`}>
                            {island?.name_id.split(' ')[0] || lex.owner_island}
                          </span>

                          {/* Category badge */}
                          <span className="text-[10px] bg-amber-100 text-amber-900 font-semibold px-2 py-0.5 rounded-md">
                            {lex.category}
                          </span>

                          {/* POS tag */}
                          <span className="text-[10px] bg-slate-100 text-slate-700 font-semibold px-1.5 py-0.5 rounded-md uppercase">
                            {lex.pos}
                          </span>
                        </div>

                        {/* Status label */}
                        {isDifficult ? (
                          <span className="text-[10px] font-extrabold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            Perlu Dilatih
                          </span>
                        ) : isMastered ? (
                          <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Dikuasai
                          </span>
                        ) : null}
                      </div>

                      {/* Main Word Row: Arabic, Audio, Meaning */}
                      <div className="flex items-center justify-between gap-3 bg-amber-50/50 rounded-xl p-3 border border-amber-100">
                        <div>
                          <div className="flex items-baseline gap-2">
                            <h4 className="font-arabic font-bold text-2xl sm:text-3xl text-teal-900 leading-snug">
                              {lex.ar_vocalized}
                            </h4>
                            {lex.visual_hint && (
                              <span className="text-lg">{lex.visual_hint}</span>
                            )}
                          </div>
                          <p className="text-xs font-bold text-slate-700 mt-0.5">
                            {lex.translit} • <span className="text-teal-700 font-bold">{lex.gloss_id}</span>
                          </p>
                        </div>

                        {/* Audio Controls */}
                        <div className="flex items-center gap-1.5">
                          {/* Standard Audio */}
                          <button
                            onClick={() => handlePlayAudio(lex.ar_vocalized, 0.85, `word_${lex.id}`)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 shadow-2xs ${
                              currentlyPlayingAudio === `word_${lex.id}`
                                ? 'bg-teal-600 text-white animate-pulse'
                                : 'bg-teal-700 hover:bg-teal-800 text-white'
                            }`}
                            title="Dengarkan pelafalan normal"
                          >
                            <Volume2 className="w-4 h-4" />
                            <span>Lafal</span>
                          </button>

                          {/* Slow Audio for Makhraj Precision */}
                          <button
                            onClick={() => handlePlayAudio(lex.ar_vocalized, 0.65, `slow_${lex.id}`)}
                            className="p-1.5 rounded-xl text-xs font-semibold bg-amber-200/80 hover:bg-amber-300 text-amber-950 transition-all active:scale-95"
                            title="Lafal pelan (0.65x) untuk analisis makhraj"
                          >
                            🐢
                          </button>
                        </div>
                      </div>

                      {/* Contoh Kalimat Dalam Konteks (Context Sentence) */}
                      <div className="mt-2.5 bg-gradient-to-r from-emerald-50/60 to-teal-50/40 rounded-xl p-3 border border-emerald-200/80">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[11px] font-bold text-emerald-800 flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                            Contoh Kalimat Kontekstual:
                          </span>

                          {/* Listen to Sentence */}
                          <button
                            onClick={() => handlePlayAudio(contextSentence.ar, 0.82, `sent_${lex.id}`)}
                            className={`text-[11px] font-bold px-2 py-0.5 rounded-lg flex items-center gap-1 transition-all ${
                              currentlyPlayingAudio === `sent_${lex.id}`
                                ? 'bg-emerald-600 text-white'
                                : 'text-emerald-700 hover:bg-emerald-100'
                            }`}
                          >
                            <Play className="w-3 h-3 fill-current" />
                            Putar Kalimat
                          </button>
                        </div>

                        {/* Arabic Sentence */}
                        <p className="font-arabic font-bold text-base sm:text-lg text-emerald-950 text-right leading-relaxed dir-rtl" dir="rtl">
                          {contextSentence.ar}
                        </p>

                        {/* Transliteration and Translation */}
                        <p className="text-[11px] text-slate-500 italic mt-0.5">
                          {contextSentence.translit}
                        </p>
                        <p className="text-xs text-slate-700 font-medium mt-0.5">
                          "{contextSentence.id}"
                        </p>

                        {contextSentence.note && (
                          <div className="mt-1.5 pt-1.5 border-t border-emerald-100 flex items-center justify-between text-[10px] text-emerald-700 font-semibold">
                            <span>💡 Kaidah: {contextSentence.note}</span>
                          </div>
                        )}
                      </div>

                      {/* Card Action Footer */}
                      <div className="mt-3 flex items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
                        <span className="text-[11px] text-slate-400">
                          ID: <code className="text-slate-600">{lex.id}</code>
                        </span>

                        <div className="flex items-center gap-2">
                          {isDifficult ? (
                            <button
                              onClick={() => handleMarkLearned(lex.id)}
                              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs active:scale-95 transition-all"
                            >
                              <Check className="w-3.5 h-3.5" />
                              Tandai Sudah Paham (+15 XP)
                            </button>
                          ) : (
                            <button
                              onClick={() => handleMarkDifficult(lex.id)}
                              className="px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs flex items-center gap-1 active:scale-95 transition-all"
                            >
                              <Bookmark className="w-3.5 h-3.5" />
                              Masukkan ke Kata Sulit
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                /* Empty state */
                <div className="bg-white rounded-3xl p-6 text-center border border-amber-200 space-y-3">
                  <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto text-3xl">
                    {activeTab === 'difficult' ? '🎉' : '🔍'}
                  </div>

                  {activeTab === 'difficult' ? (
                    <>
                      <h4 className="font-bold text-base text-slate-800">
                        Tidak Ada Kata Sulit Saat Ini!
                      </h4>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto">
                        Alhamdulillah! Kamu berhasil menguasai kata-kata yang pernah dilatih. Kamu bisa menjelajahi glosarium kurikulum dan menandai kata baru untuk dipelajari.
                      </p>
                      <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                        <button
                          onClick={() => setActiveTab('all')}
                          className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-xs"
                        >
                          Buka Semua Glosarium Kurikulum
                        </button>
                        <button
                          onClick={handleAddSampleDifficult}
                          className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs shadow-xs"
                        >
                          + Tambah Kata Uji Coba
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h4 className="font-bold text-base text-slate-800">
                        Tidak Ditemukan Kata yang Sesuai
                      </h4>
                      <p className="text-xs text-slate-500">
                        Coba ubah kata kunci pencarian atau sesuaikan filter pulau dan jenis kata.
                      </p>
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedIsland('all');
                          setSelectedPos('all');
                        }}
                        className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs"
                      >
                        Reset Semua Filter
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </>
        ) : (
          /* Flashcard Review Mode */
          <div className="p-4 sm:p-6 flex-1 overflow-y-auto flex flex-col justify-between items-center text-center">
            {!practiceCompleted && currentFlashcard ? (
              <div className="w-full max-w-md flex flex-col items-center">
                {/* Progress bar */}
                <div className="w-full flex items-center justify-between text-xs font-bold text-slate-500 mb-3">
                  <span>Kartu {cardIndex + 1} dari {flashcardWords.length}</span>
                  <span className="text-teal-700">Mode Latihan Cepat 3 Menit</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full mb-4 overflow-hidden">
                  <div
                    className="bg-amber-500 h-full transition-all duration-300"
                    style={{ width: `${((cardIndex + 1) / flashcardWords.length) * 100}%` }}
                  />
                </div>

                {/* 3D Flip Card */}
                <div
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="w-full min-h-[300px] bg-white rounded-3xl p-6 border-2 border-amber-300 shadow-lg cursor-pointer hover:border-amber-400 transition-all flex flex-col justify-between relative group select-none"
                >
                  <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2.5 py-1 rounded-full self-start">
                    {currentFlashcard.category} • Ketuk untuk Balik 🔄
                  </span>

                  {!isFlipped ? (
                    /* Front side: Arabic word & audio */
                    <div className="my-auto py-6 space-y-4">
                      <p className="font-arabic font-extrabold text-5xl sm:text-6xl text-teal-900">
                        {currentFlashcard.ar_vocalized}
                      </p>
                      <p className="text-xs text-slate-400">
                        Bisa baca & ingat artinya? Ketuk kartu untuk melihat kunci jawaban!
                      </p>

                      <div className="flex justify-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePlayAudio(currentFlashcard.ar_vocalized, 0.85, 'fc_word');
                          }}
                          className="px-4 py-2 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm active:scale-95"
                        >
                          <Volume2 className="w-4 h-4" />
                          Dengarkan Audio
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePlayAudio(currentFlashcard.ar_vocalized, 0.65, 'fc_slow');
                          }}
                          className="px-3 py-2 rounded-2xl bg-amber-200 hover:bg-amber-300 text-amber-950 font-bold text-xs active:scale-95"
                          title="Pelan"
                        >
                          🐢
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Back side: Meaning, Translit & Context Sentence */
                    <div className="my-auto py-4 space-y-3 text-left">
                      <div className="text-center border-b border-amber-100 pb-3">
                        <p className="font-arabic font-bold text-3xl text-teal-800">
                          {currentFlashcard.ar_vocalized}
                        </p>
                        <p className="text-sm font-bold text-slate-800 mt-1">
                          {currentFlashcard.translit}
                        </p>
                        <p className="text-base font-extrabold text-amber-600">
                          {currentFlashcard.gloss_id}
                        </p>
                      </div>

                      {/* Context Sentence */}
                      {(() => {
                        const sent = getLexemeContextSentence(currentFlashcard);
                        return (
                          <div className="bg-emerald-50 rounded-2xl p-3 border border-emerald-200">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[10px] font-bold text-emerald-800">
                                Contoh Konteks:
                              </span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handlePlayAudio(sent.ar, 0.82, 'fc_sent');
                                }}
                                className="text-[10px] font-bold text-emerald-700 hover:underline flex items-center gap-0.5"
                              >
                                <Play className="w-2.5 h-2.5 fill-current" />
                                Audio
                              </button>
                            </div>
                            <p className="font-arabic font-bold text-sm text-emerald-950 text-right dir-rtl leading-relaxed" dir="rtl">
                              {sent.ar}
                            </p>
                            <p className="text-[11px] text-slate-600 mt-1">
                              "{sent.id}"
                            </p>
                          </div>
                        );
                      })()}
                    </div>
                  )}

                  <div className="text-[10px] text-slate-400 font-medium">
                    {isFlipped ? 'Pilih respon di bawah:' : 'Ketuk di mana saja pada kartu untuk membalik'}
                  </div>
                </div>

                {/* Flashcard Action Buttons */}
                <div className="w-full flex items-center gap-3 mt-4">
                  <button
                    onClick={() => handleNextFlashcard(false)}
                    className="flex-1 py-3 rounded-2xl bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold text-xs flex items-center justify-center gap-1.5 border border-rose-300 transition-all active:scale-95"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Masih Sulit (Ulangi)
                  </button>

                  <button
                    onClick={() => handleNextFlashcard(true)}
                    className="flex-1 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-95"
                  >
                    <Check className="w-4 h-4" />
                    Sudah Paham! (+15 XP)
                  </button>
                </div>
              </div>
            ) : (
              /* Practice Completed Screen */
              <div className="my-auto py-8 space-y-4 max-w-sm">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 flex items-center justify-center mx-auto text-4xl shadow-lg animate-bounce">
                  🏆
                </div>
                <h4 className="font-bold text-xl text-slate-800">
                  Latihan Flashcard Selesai!
                </h4>
                <p className="text-xs text-slate-500">
                  MasyaAllah, kamu telah mereview kata-kata ini dengan baik. Terus pertahankan ritme belajar harianmu untuk menjaga ingatan kosakata tetap segar!
                </p>

                <div className="flex gap-2 justify-center pt-2">
                  <button
                    onClick={handleResetFlashcards}
                    className="px-4 py-2.5 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs"
                  >
                    Ulangi Latihan
                  </button>
                  <button
                    onClick={() => setIsFlashcardMode(false)}
                    className="px-4 py-2.5 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-xs"
                  >
                    Kembali ke Daftar Kamus
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Modal Footer */}
        <div className="bg-amber-100/60 p-3 sm:p-4 border-t border-amber-200 flex items-center justify-between text-xs text-slate-600 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-ping" />
            <span className="text-[11px] font-medium">
              Sistem Repetisi Berjarak (Spaced Repetition & Audio Native)
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs transition-all active:scale-95"
          >
            Tutup
          </button>
        </div>
      </motion.div>
    </div>
  );
};
