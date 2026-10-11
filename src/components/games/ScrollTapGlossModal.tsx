import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Volume2, Sparkles, Plus, CheckCircle2, Bookmark, ArrowRight } from 'lucide-react';
import { sound } from '../../services/sound';
import { GameStorage } from '../../services/storage';
import { GRADED_READINGS } from '../../data/curriculum';

interface ScrollTapGlossProps {
  onClose: () => void;
  onReward: (xp: number, stars: number) => void;
}

export const ScrollTapGlossModal: React.FC<ScrollTapGlossProps> = ({ onClose, onReward }) => {
  const [selectedStoryIdx, setSelectedStoryIdx] = useState(0);
  const [activeWordGloss, setActiveWordGloss] = useState<{ ar: string; mean: string } | null>(null);
  const [savedWords, setSavedWords] = useState<string[]>([]);
  const [isFinishedReading, setIsFinishedReading] = useState(false);

  const story = GRADED_READINGS[selectedStoryIdx];

  const handleTapWord = (word: { ar: string; mean: string }) => {
    sound.speakArabic(word.ar);
    setActiveWordGloss(word);
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
    sound.playFanfare();
    setIsFinishedReading(true);
    GameStorage.addReward(70, 4, 'qiraah', 10);
    onReward(70, 4);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-lg bg-rose-50 rounded-3xl shadow-2xl border-4 border-rose-300 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-700 via-red-600 to-amber-700 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-300" />
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-200 block">
                Perpustakaan Qira'ah (QRA)
              </span>
              <h2 className="text-xl font-bold font-chibi">Scroll Tap-Gloss (Baca Bertingkat)</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white font-bold transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Story Selector */}
        <div className="p-3 bg-white/80 border-b border-rose-200 flex items-center gap-2 overflow-x-auto text-xs font-bold">
          {GRADED_READINGS.map((st, idx) => (
            <button
              key={st.id}
              onClick={() => {
                setSelectedStoryIdx(idx);
                setActiveWordGloss(null);
                setIsFinishedReading(false);
              }}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                selectedStoryIdx === idx
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-rose-100 text-rose-900 hover:bg-rose-200'
              }`}
            >
              Naskah {idx + 1}: {st.title.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="p-4 flex-1 overflow-y-auto space-y-4">
          {/* Title and Audio Play of Story */}
          <div className="bg-white rounded-2xl p-3.5 border border-rose-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-rose-700 uppercase">Judul Gulungan Naskah:</span>
              <h3 className="text-base font-bold text-slate-800">{story.title}</h3>
            </div>
            <button
              onClick={() => sound.speakArabic(story.paragraphs.map(p => p.ar).join(' '))}
              className="w-9 h-9 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow-xs active:scale-95 transition-all"
              title="Dengarkan seluruh cerita"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-rose-900 bg-rose-100/70 p-2.5 rounded-xl border border-rose-200">
            💡 <strong>Ketuk kata Arab mana saja</strong> untuk mendengar pelafalan fasih dan melihat terjemahan kata per kata!
          </p>

          {/* Reading Paragraphs with Clickable Arabic Words */}
          <div className="space-y-3">
            {story.paragraphs.map((p, pIdx) => (
              <div key={pIdx} className="bg-white rounded-2xl p-4 border border-rose-200 shadow-xs">
                {/* Clickable Word Blocks */}
                <div className="flex flex-wrap items-center justify-end gap-1.5 mb-2.5" dir="rtl">
                  {p.words.map((w, wIdx) => {
                    const isSelected = activeWordGloss?.ar === w.ar;
                    const isSaved = savedWords.includes(w.ar);

                    return (
                      <button
                        key={wIdx}
                        onClick={() => handleTapWord(w)}
                        className={`font-arabic text-xl px-2.5 py-1 rounded-xl transition-all ${
                          isSelected
                            ? 'bg-rose-600 text-white ring-2 ring-rose-400 scale-105 shadow-sm font-bold'
                            : isSaved
                            ? 'bg-emerald-50 text-emerald-900 border border-emerald-300 font-bold'
                            : 'bg-rose-50 hover:bg-rose-100 text-slate-800 border border-rose-100 font-semibold'
                        }`}
                      >
                        {w.ar}
                      </button>
                    );
                  })}
                </div>

                {/* Indonesian Translation & Translit */}
                <div className="pt-2 border-t border-rose-100">
                  <p className="text-xs font-semibold text-slate-700">{p.translation}</p>
                  <p className="text-[11px] text-slate-400 italic mt-0.5">{p.translit}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Word Popover Card (Tap-Gloss) */}
          <AnimatePresence>
            {activeWordGloss && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="bg-gradient-to-r from-amber-50 to-rose-50 border-2 border-rose-400 rounded-2xl p-3.5 shadow-md flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => sound.speakArabic(activeWordGloss.ar)}
                    className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-xs active:scale-95"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                  <div>
                    <span className="font-arabic text-2xl font-bold text-slate-900 block leading-tight">
                      {activeWordGloss.ar}
                    </span>
                    <span className="text-xs font-bold text-rose-800">
                      Artinya: "{activeWordGloss.mean}"
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleSaveToCollection(activeWordGloss)}
                  className="px-3 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs flex items-center gap-1 shadow-xs active:scale-95 transition-all shrink-0"
                >
                  <Bookmark className="w-3.5 h-3.5 fill-slate-950" />
                  {savedWords.includes(activeWordGloss.ar) ? 'Tersimpan' : 'Simpan Kata'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Completion Action */}
          <div className="pt-2">
            {!isFinishedReading ? (
              <button
                onClick={handleCompleteStory}
                className="w-full py-3.5 bg-gradient-to-r from-rose-600 to-amber-600 text-white rounded-2xl font-bold text-xs shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>Tandai Selesai Membaca Naskah Ini</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            ) : (
              <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-3 text-center text-xs text-emerald-900 font-bold">
                🎉 Naskah telah selesai dibaca! +70 XP & +4 Bintang ditambahkan ke profilmu.
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
