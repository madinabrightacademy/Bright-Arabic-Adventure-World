import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Cog, Volume2, Award, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { sound } from '../../services/sound';
import { GameStorage } from '../../services/storage';
import { TASHRIF_ROOTS } from '../../data/curriculum';

interface TashrifLabProps {
  onClose: () => void;
  onReward: (xp: number, stars: number) => void;
}

export const TashrifLabGame: React.FC<TashrifLabProps> = ({ onClose, onReward }) => {
  const [rootIdx, setRootIdx] = useState(0);
  const [selectedTense, setSelectedTense] = useState<'madhi' | 'mudhari'>('madhi');
  const [selectedConjIdx, setSelectedConjIdx] = useState(0);
  const [isLeverPulled, setIsLeverPulled] = useState(false);
  const [testedCount, setTestedCount] = useState(0);

  const currentRoot = TASHRIF_ROOTS[rootIdx];
  const currentConj = currentRoot.conjugations[selectedConjIdx];
  const resultWord = selectedTense === 'madhi' ? currentConj.madhi : currentConj.mudhari;

  const handlePullLever = (idx: number) => {
    setIsLeverPulled(true);
    setSelectedConjIdx(idx);
    sound.playSparkle();

    setTimeout(() => {
      setIsLeverPulled(false);
      sound.speakArabic(selectedTense === 'madhi' ? currentRoot.conjugations[idx].madhi : currentRoot.conjugations[idx].mudhari);
      setTestedCount(c => c + 1);
      GameStorage.addReward(30, 1, 'lughah', 5);
      onReward(30, 1);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-lg bg-gradient-to-b from-indigo-50 to-blue-50 rounded-3xl shadow-2xl border-4 border-indigo-400 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-indigo-800 text-white p-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20">Gunung Qawa'id (QWD)</span>
              <span className="text-xs bg-yellow-400 text-slate-900 font-extrabold px-2 py-0.5 rounded-full">
                Eksperimen: {testedCount}
              </span>
            </div>
            <h2 className="text-xl font-bold font-chibi flex items-center gap-2 mt-1">
              ⚙️ Tashrif Lab (Laboratorium Konjugasi)
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white font-bold transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 flex-1 overflow-y-auto space-y-4">
          {/* Root Selector */}
          <div className="bg-white rounded-2xl p-3 border border-indigo-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase">Pilih Akar Kata 3 Huruf:</span>
              <h4 className="text-base font-bold text-indigo-900 font-arabic">{currentRoot.root}</h4>
            </div>
            <div className="flex gap-1.5">
              {TASHRIF_ROOTS.map((r, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setRootIdx(idx);
                    setSelectedConjIdx(0);
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                    rootIdx === idx ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {r.root}
                </button>
              ))}
            </div>
          </div>

          {/* Tense Toggle (Madhi vs Mudhari') */}
          <div className="bg-indigo-100 p-1 rounded-2xl flex text-xs font-bold">
            <button
              onClick={() => setSelectedTense('madhi')}
              className={`flex-1 py-2 rounded-xl transition-all ${
                selectedTense === 'madhi' ? 'bg-indigo-700 text-white shadow-xs' : 'text-indigo-900 hover:bg-indigo-200'
              }`}
            >
              ⏳ Fi'il Madhi (Masa Lampau)
            </button>
            <button
              onClick={() => setSelectedTense('mudhari')}
              className={`flex-1 py-2 rounded-xl transition-all ${
                selectedTense === 'mudhari' ? 'bg-indigo-700 text-white shadow-xs' : 'text-indigo-900 hover:bg-indigo-200'
              }`}
            >
              🔄 Fi'il Mudhari' (Masa Kini / Rutin)
            </button>
          </div>

          {/* Laboratory Machine Display */}
          <div className="relative bg-gradient-to-b from-slate-900 to-indigo-950 rounded-3xl p-6 border-4 border-indigo-300 text-center text-white shadow-inner flex flex-col items-center justify-center min-h-[180px] overflow-hidden">
            {/* Ambient gears */}
            <motion.div
              animate={isLeverPulled ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute top-3 left-4 text-slate-500 opacity-40 text-2xl"
            >
              <Cog className="w-8 h-8" />
            </motion.div>

            <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-widest block mb-1">
              Bentuk Konjugasi Morfologi:
            </span>

            <motion.div
              key={resultWord}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="font-arabic text-5xl font-bold text-amber-300 my-2 leading-tight drop-shadow-[0_4px_12px_rgba(251,191,36,0.5)]"
            >
              {resultWord}
            </motion.div>

            <span className="text-sm font-bold text-slate-200">
              {currentConj.pronoun} ➔ "{currentConj.meaning}"
            </span>

            <button
              onClick={() => sound.speakArabic(resultWord)}
              className="mt-3 px-4 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
            >
              <Volume2 className="w-3.5 h-3.5" /> Dengar Pelafalan
            </button>
          </div>

          {/* Pronouns Lever Selector */}
          <div className="bg-white rounded-2xl p-3 border border-indigo-200 shadow-xs">
            <span className="text-xs font-bold text-slate-700 block mb-2">
              Pilih Subjek / Pelaku (Dhamir):
            </span>

            <div className="grid grid-cols-3 gap-2">
              {currentRoot.conjugations.map((conj, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePullLever(idx)}
                  className={`p-2 rounded-xl text-center border-2 transition-all text-xs ${
                    selectedConjIdx === idx
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-950 font-bold shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 font-medium'
                  }`}
                >
                  <span className="font-arabic text-sm block leading-tight">{conj.pronoun.split(' ')[0]}</span>
                  <span className="text-[10px] text-slate-500 truncate block mt-0.5">{conj.meaning}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Close */}
          <div className="pt-2">
            <button
              onClick={onClose}
              className="w-full py-3 bg-gradient-to-r from-blue-700 to-indigo-700 text-white rounded-2xl font-bold text-xs shadow-md active:scale-95 transition-all"
            >
              Selesai Eksperimen Laboratorium
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
