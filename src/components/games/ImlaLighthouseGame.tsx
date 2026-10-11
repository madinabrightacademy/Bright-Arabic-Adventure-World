import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Award, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { sound } from '../../services/sound';
import { GameStorage } from '../../services/storage';

interface ImlaLighthouseProps {
  onClose: () => void;
  onReward: (xp: number, stars: number) => void;
}

interface ImlaQuestion {
  id: string;
  wordToDictate: string;
  meaning: string;
  translit: string;
  options: { id: string; ar: string; correct: boolean }[];
  hint: string;
}

const IMLA_QUESTIONS: ImlaQuestion[] = [
  {
    id: 'imla1',
    wordToDictate: 'مَاء',
    meaning: 'Air minum segar',
    translit: 'māʾ',
    options: [
      { id: '1', ar: 'مَاء', correct: true },
      { id: '2', ar: 'مَه', correct: false },
      { id: '3', ar: 'مَا', correct: false },
    ],
    hint: 'Diakhiri dengan hamzah di atas baris (hamzah mutatharrifah).'
  },
  {
    id: 'imla2',
    wordToDictate: 'سَمَكَة',
    meaning: 'Seekor ikan laut',
    translit: 'samakah',
    options: [
      { id: '1', ar: 'سَمَكَت', correct: false },
      { id: '2', ar: 'سَمَكَة', correct: true },
      { id: '3', ar: 'شَمَكَة', correct: false },
    ],
    hint: 'Kata benda muannats diakhiri dengan Ta Marbuthah (ـة).'
  },
  {
    id: 'imla3',
    wordToDictate: 'أَحْمَر',
    meaning: 'Warna merah',
    translit: 'aḥmar',
    options: [
      { id: '1', ar: 'أَهْمَر', correct: false },
      { id: '2', ar: 'إِحْمَر', correct: false },
      { id: '3', ar: 'أَحْمَر', correct: true },
    ],
    hint: 'Diawali Alif hamzah fathah, diikuti Ha (ح) berdesah bersih.'
  }
];

export const ImlaLighthouseGame: React.FC<ImlaLighthouseProps> = ({ onClose, onReward }) => {
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [isBeaconLit, setIsBeaconLit] = useState(false);
  const [answeredId, setAnsweredId] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = IMLA_QUESTIONS[qIdx];

  const handlePlayDictation = () => {
    sound.speakArabic(currentQ.wordToDictate, 0.8);
  };

  const handleSelectOption = (optId: string) => {
    if (answeredId) return;
    setAnsweredId(optId);

    const isCorrect = currentQ.options.find(o => o.id === optId)?.correct;
    if (isCorrect) {
      sound.playSuccess();
      sound.playSparkle();
      setIsBeaconLit(true);
      setScore(s => s + 1);
      GameStorage.addReward(50, 3, 'kitabah', 8);
      onReward(50, 3);
    } else {
      sound.playGentleRetry();
      GameStorage.markWordDifficult(currentQ.wordToDictate);
    }
  };

  const handleNext = () => {
    setAnsweredId(null);
    setIsBeaconLit(false);
    if (qIdx < IMLA_QUESTIONS.length - 1) {
      setQIdx(i => i + 1);
    } else {
      setIsFinished(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/70 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-lg bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl shadow-2xl border-4 border-amber-400 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 to-yellow-600 p-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20">Pelabuhan Kitabah (KTB)</span>
              <span className="text-xs bg-slate-900 text-amber-300 font-extrabold px-2 py-0.5 rounded-full">
                Soal {qIdx + 1}/{IMLA_QUESTIONS.length}
              </span>
            </div>
            <h2 className="text-xl font-bold font-chibi flex items-center gap-2 mt-1">
              🗼 Imla' Lighthouse (Mercusuar Ejaan)
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white font-bold transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col items-center overflow-y-auto">
          {!isFinished ? (
            <>
              {/* Harbor Lighthouse Night Scene */}
              <div className="relative w-full h-44 rounded-3xl bg-gradient-to-b from-sky-950 to-indigo-900 border-2 border-amber-400/50 shadow-inner flex flex-col items-center justify-between p-3 mb-4 overflow-hidden">
                {/* Light Beam sweeping across sea if correct */}
                {isBeaconLit && (
                  <motion.div
                    initial={{ opacity: 0, rotate: -40 }}
                    animate={{ opacity: 1, rotate: [ -30, 30, -10 ] }}
                    transition={{ duration: 1.5 }}
                    className="absolute top-2 w-[400px] h-32 bg-gradient-to-r from-yellow-300/40 via-amber-200/20 to-transparent origin-top pointer-events-none filter blur-sm"
                  />
                )}

                <div className="flex items-center justify-between w-full text-xs text-amber-200">
                  <span>⚓ Dermaga Pelabuhan Tinta</span>
                  <span>{isBeaconLit ? '✨ Mercusuar Menyala Terang!' : '🌙 Menunggu Dikte'}</span>
                </div>

                {/* Lighthouse Graphic */}
                <div className="relative my-auto flex flex-col items-center">
                  <div className={`text-4xl transition-all ${isBeaconLit ? 'scale-125 filter drop-shadow-[0_0_20px_rgba(251,191,36,0.9)]' : 'opacity-80'}`}>
                    🗼
                  </div>
                </div>

                {/* Dictation Play Button */}
                <button
                  onClick={handlePlayDictation}
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 active:scale-95 text-slate-950 font-black text-xs shadow-lg flex items-center gap-2 transition-all"
                >
                  <Volume2 className="w-4 h-4 fill-slate-950" /> Putar Suara Dikte Imla' 🔊
                </button>
              </div>

              <div className="text-center mb-3">
                <span className="text-xs text-slate-400 block">Arti Kata:</span>
                <h4 className="text-base font-bold text-amber-300">"{currentQ.meaning}"</h4>
                <p className="text-[11px] text-slate-400 italic">Pilih bentuk ejaan Arab yang paling tepat sesuai kaidah imla':</p>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 gap-2.5 w-full mb-4">
                {currentQ.options.map((opt) => {
                  const isSelected = answeredId === opt.id;
                  let style = 'bg-white/10 border-white/20 hover:bg-white/20 text-white';

                  if (answeredId) {
                    if (opt.correct) {
                      style = 'bg-emerald-600/80 border-emerald-400 text-white font-bold ring-2 ring-emerald-300';
                    } else if (isSelected) {
                      style = 'bg-rose-600/80 border-rose-400 text-white';
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectOption(opt.id)}
                      disabled={Boolean(answeredId)}
                      className={`p-3.5 rounded-2xl border-2 flex items-center justify-between text-left transition-all ${style}`}
                    >
                      <span className="text-xs font-semibold text-slate-300">Pilihan:</span>
                      <span className="font-arabic text-2xl font-bold">{opt.ar}</span>
                    </button>
                  );
                })}
              </div>

              {/* Hint after answer */}
              {answeredId && (
                <div className="w-full bg-white/10 rounded-2xl p-3 border border-white/20 mb-3 text-xs text-amber-200">
                  <p className="font-bold flex items-center gap-1 mb-0.5">💡 Kaidah Ejaan Imla':</p>
                  <p>{currentQ.hint}</p>
                </div>
              )}

              {/* Next Button */}
              {answeredId && (
                <button
                  onClick={handleNext}
                  className="w-full py-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-bold rounded-2xl text-xs shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 mt-auto"
                >
                  {qIdx < IMLA_QUESTIONS.length - 1 ? 'Soal Dikte Berikutnya' : 'Selesaikan Pelabuhan Kitabah ⚓'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 my-auto">
              <div className="w-20 h-20 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center mb-3 animate-bounce">
                <Award className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold font-chibi text-white">Mercusuar Bercahaya Terang!</h3>
              <p className="text-xs text-slate-300 mt-2 max-w-sm">
                Pelabuhan Kitabah tersinari berkas cahaya ejaanmu. Ejaan kata tersimpan rapi di ingatan!
              </p>
              <div className="flex items-center gap-2 mt-4 bg-amber-400/20 text-amber-300 font-bold px-4 py-2 rounded-2xl text-xs border border-amber-400/30">
                <span>+150 XP</span> • <span>+9 Bintang</span>
              </div>
              <button
                onClick={onClose}
                className="mt-6 w-full max-w-xs py-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-bold rounded-2xl shadow-lg active:scale-95 transition-all"
              >
                Kembali ke Pelabuhan
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
