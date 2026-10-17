import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Volume2, Sparkles, Plus, CheckCircle2, Bookmark, ArrowRight } from 'lucide-react';
import { sound } from '../../services/sound';
import { GameStorage } from '../../services/storage';
import { GRADED_READINGS } from '../../data/curriculum';
import { GameShell, GameFlowState } from './GameShell';

interface ScrollTapGlossProps {
  onClose: () => void;
  onReward: (xp: number, stars: number) => void;
}

export const ScrollTapGlossModal: React.FC<ScrollTapGlossProps> = ({ onClose, onReward }) => {
  const [flowState, setFlowState] = useState<GameFlowState>('BRIEFING');
  const [selectedStoryIdx, setSelectedStoryIdx] = useState(0);
  const [activeWordGloss, setActiveWordGloss] = useState<{ ar: string; mean: string } | null>(null);
  const [savedWords, setSavedWords] = useState<string[]>([]);
  const [mascotMood, setMascotMood] = useState<'happy' | 'cheer' | 'thinking' | 'celebrate'>('happy');
  const [mascotComment, setMascotComment] = useState('Ketuk kata mana pun untuk mendengar arti & lafalnya!');

  const story = GRADED_READINGS[selectedStoryIdx];

  const handleTapWord = (word: { ar: string; mean: string }) => {
    sound.speakArabic(word.ar);
    sound.playTap();
    setActiveWordGloss(word);
    setMascotMood('cheer');
    setMascotComment(`"${word.ar}": ${word.mean}`);
  };

  const handleSaveToCollection = (word: { ar: string; mean: string }) => {
    sound.playSparkle();
    if (!savedWords.includes(word.ar)) {
      setSavedWords(prev => [...prev, word.ar]);
      GameStorage.addReward(20, 1, 'qiraah', 4);
      onReward(20, 1);
    }
  };

  const handleCompleteStory = () => {
    sound.playSuccess();
    setMascotMood('celebrate');
    GameStorage.addReward(70, 3, 'qiraah', 10);
    onReward(70, 3);
    setFlowState('VICTORY');
  };

  return (
    <GameShell
      title="Gulungan Bacaan Qira'ah"
      titleAr="مَخْطُوطَةُ القِرَاءَةِ المُتَدَرِّجَةِ"
      islandName="Pulau Qira'ah"
      islandColor="from-rose-700 via-red-600 to-amber-700"
      gameIcon="📜"
      targetObjective="Baca naskah bertingkat, ketuk kata Arab mana pun untuk mendengar suara fasih dan terjemahan kata per kata"
      howToPlay={[
        { icon: '📜', text: 'Pilih gulungan naskah bacaan bertingkat (Qira\'ah Mutadarrijah).' },
        { icon: '👆', text: 'Ketuk kata Arab untuk membuka kartu terjemahan instan dan mendengar audionya.' },
        { icon: '🔖', text: 'Simpan kata sulit ke buku kosakata dan tekan tombol "Selesai Membaca"!' }
      ]}
      speechArabic="اِقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ!"
      speechIntro="Mari membaca gulungan hikmah di Perpustakaan Naskh Pulau Qira'ah!"
      flowState={flowState}
      onStartGame={() => {
        setFlowState('PLAYING');
        setActiveWordGloss(null);
        sound.speakArabic(story.title);
      }}
      onPlayAgain={() => {
        setFlowState('PLAYING');
        setActiveWordGloss(null);
        setSavedWords([]);
      }}
      onClose={onClose}
      currentRound={selectedStoryIdx + 1}
      totalRounds={GRADED_READINGS.length}
      score={savedWords.length + 1}
      maxScore={GRADED_READINGS.length}
      starsEarned={3}
      xpEarned={70}
      mascotMood={mascotMood}
      mascotComment={mascotComment}
      mascotArabic="قِرَاءَةٌ"
      onPlayTitleAudio={() => sound.speakArabic(story.title)}
      victorySummary={[
        { label: 'Naskah Tuntas', value: story.title },
        { label: 'Kata Disimpan', value: `${savedWords.length} Kosakata` },
        { label: 'Tingkat Literasi', value: 'Qira\'ah Mutadarrijah' },
        { label: 'Kefasihan Membaca', value: '⭐⭐⭐ Lancar' }
      ]}
    >
      {/* Story Selector Pills */}
      <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-rose-200/80 overflow-x-auto text-xs">
        {GRADED_READINGS.map((st, idx) => (
          <button
            key={st.id}
            onClick={() => {
              sound.playPop();
              setSelectedStoryIdx(idx);
              setActiveWordGloss(null);
            }}
            className={`px-3 py-1 rounded-xl font-bold whitespace-nowrap transition-all ${
              selectedStoryIdx === idx
                ? 'bg-rose-700 text-white font-black shadow-xs ring-1 ring-rose-400'
                : 'bg-rose-50 text-rose-950 border border-rose-200'
            }`}
          >
            Naskah {idx + 1}: {st.title.split(' ')[0]}
          </button>
        ))}
      </div>

      {/* Story Parchment Scroll */}
      <div className="bg-gradient-to-b from-amber-50 to-orange-50 border-2 border-amber-200 rounded-3xl p-4 sm:p-5 shadow-inner my-auto max-h-[220px] overflow-y-auto">
        <div className="flex items-center justify-between mb-2 pb-1 border-b border-amber-200/80">
          <h4 className="font-bold text-sm text-slate-800">{story.title}</h4>
          <button
            type="button"
            onClick={() => sound.speakArabic(story.paragraphs.map(p => p.ar).join(' '))}
            className="p-1 rounded-lg bg-white hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold flex items-center gap-1"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Dengar Semua</span>
          </button>
        </div>

        {/* Interactive Paragraph Words */}
        <div className="space-y-3">
          {story.paragraphs.map((p, pIdx) => (
            <div key={pIdx} className="space-y-1">
              <div className="flex flex-wrap gap-1.5 justify-end" dir="rtl">
                {p.words.map((w, wIdx) => {
                  const isGlossed = activeWordGloss?.ar === w.ar;
                  return (
                    <button
                      key={wIdx}
                      type="button"
                      onClick={() => handleTapWord(w)}
                      className={`font-arabic text-xl sm:text-2xl font-black px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                        isGlossed
                          ? 'bg-rose-600 text-white shadow-xs'
                          : 'text-slate-800 hover:bg-rose-100 hover:text-rose-900'
                      }`}
                    >
                      {w.ar}
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-slate-600 italic leading-snug">
                "{p.translation}"
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Word Gloss Inspection Bottom Bar */}
      {activeWordGloss && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 p-2.5 rounded-2xl bg-white border-2 border-rose-300 shadow-xs flex items-center justify-between gap-2"
        >
          <div className="flex items-center gap-2">
            <span className="font-arabic text-xl font-black text-rose-800">
              {activeWordGloss.ar}
            </span>
            <span className="text-xs font-bold text-slate-700">
              = {activeWordGloss.mean}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => sound.speakArabic(activeWordGloss.ar)}
              className="p-1.5 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-800"
              title="Dengarkan Kata"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => handleSaveToCollection(activeWordGloss)}
              className="px-2.5 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-1 shadow-2xs"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Simpan</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* Finish Reading Button */}
      <div className="pt-2 flex items-center justify-end">
        <button
          type="button"
          onClick={handleCompleteStory}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-black text-xs flex items-center gap-1.5 shadow-md active:scale-95 cursor-pointer"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Selesai Membaca Gulungan</span>
        </button>
      </div>
    </GameShell>
  );
};
