import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, ArrowLeft, ArrowRight, Zap, Play, Volume2, Sparkles, RefreshCw } from 'lucide-react';
import { sound } from '../../services/sound';
import { GameStorage } from '../../services/storage';

interface SkyRunnerProps {
  onClose: () => void;
  onReward: (xp: number, stars: number) => void;
}

interface RunnerLane {
  text: string;
  translit?: string;
  meaning?: string;
  correct: boolean;
}

interface RunnerWave {
  category: string;
  prompt: string;
  subPrompt: string;
  lanes: RunnerLane[];
}

const RUNNER_WAVES: RunnerWave[] = [
  {
    category: 'Makanan & Minuman (الطَّعَام)',
    prompt: 'Cari kata: "ROTI GANDUM" (Khubz)',
    subPrompt: 'Pilih jalur kata Arab yang tepat sebelum menabrak gerbang!',
    lanes: [
      { text: 'مَاء', translit: 'māʾ', meaning: 'Air', correct: false },
      { text: 'خُبْز', translit: 'khubz', meaning: 'Roti', correct: true },
      { text: 'حَلِيب', translit: 'ḥalīb', meaning: 'Susu', correct: false },
    ]
  },
  {
    category: 'Warna Dasar (الأَلْوَان)',
    prompt: 'Cari kata: "MERAH" (Ahmar)',
    subPrompt: 'Lihat warna dan teks Arabnya!',
    lanes: [
      { text: 'أَحْمَر', translit: 'aḥmar', meaning: 'Merah', correct: true },
      { text: 'أَزْرَق', translit: 'azraq', meaning: 'Biru', correct: false },
      { text: 'أَخْضَر', translit: 'akhḍar', meaning: 'Hijau', correct: false },
    ]
  },
  {
    category: 'Angka Arab (الأَرْقَام)',
    prompt: 'Cari angka: "TIGA" (Thalatsah - ٣)',
    subPrompt: 'Kenali lafal dan tulisan bilangan Arab!',
    lanes: [
      { text: 'وَاحِد', translit: 'wāḥid', meaning: 'Satu', correct: false },
      { text: 'ثَلَاثَة', translit: 'thalāthah', meaning: 'Tiga', correct: true },
      { text: 'اِثْنَان', translit: 'ithnān', meaning: 'Dua', correct: false },
    ]
  },
  {
    category: 'Benda Sekitar (الأَدَوَات)',
    prompt: 'Cari kata: "KITAB / BUKU" (Kitab)',
    subPrompt: 'Benda utama penuntut ilmu!',
    lanes: [
      { text: 'قَلَم', translit: 'qalam', meaning: 'Pena', correct: false },
      { text: 'بَاب', translit: 'bāb', meaning: 'Pintu', correct: false },
      { text: 'كِتَاب', translit: 'kitāb', meaning: 'Kitab', correct: true },
    ]
  },
  {
    category: 'Fauna Alam (الحَيَوَانَات)',
    prompt: 'Cari kata: "UNTA GURUN" (Jamal)',
    subPrompt: 'Hewan tangguh pengembara padang pasir!',
    lanes: [
      { text: 'جَمَل', translit: 'jamal', meaning: 'Unta', correct: true },
      { text: 'حِصَان', translit: 'ḥiṣān', meaning: 'Kuda', correct: false },
      { text: 'أَسَد', translit: 'asad', meaning: 'Singa', correct: false },
    ]
  },
  {
    category: 'Profesi & Tokoh (المِهَن)',
    prompt: 'Cari kata: "DOKTER" (Thabib)',
    subPrompt: 'Penyembuh dengan izin Allah!',
    lanes: [
      { text: 'مُدَرِّس', translit: 'mudarris', meaning: 'Guru', correct: false },
      { text: 'طَبِيب', translit: 'ṭabīb', meaning: 'Dokter', correct: true },
      { text: 'تَاجِر', translit: 'tājir', meaning: 'Pedagang', correct: false },
    ]
  },
  {
    category: 'Kata Kerja Harian (الأَفْعَال)',
    prompt: 'Cari kata: "DIA MEMBACA" (Qara\'a)',
    subPrompt: 'Wahyu pertama yang mulia!',
    lanes: [
      { text: 'كَتَبَ', translit: 'kataba', meaning: 'Menulis', correct: false },
      { text: 'ذَهَبَ', translit: 'dhahaba', meaning: 'Pergi', correct: false },
      { text: 'قَرَأَ', translit: 'qaraʾa', meaning: 'Membaca', correct: true },
    ]
  }
];

export const SkyRunnerGame: React.FC<SkyRunnerProps> = ({ onClose, onReward }) => {
  const [waveIdx, setWaveIdx] = useState(0);
  const [currentLane, setCurrentLane] = useState<number>(1); // 0: Kiri, 1: Tengah, 2: Kanan
  const [progress, setProgress] = useState(0); // 0 sampai 100%
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [hitFeedback, setHitFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const wave = RUNNER_WAVES[waveIdx];

  // Moving forward runner loop
  useEffect(() => {
    if (isFinished || isPaused) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          const chosenGate = wave.lanes[currentLane];
          if (chosenGate.correct) {
            sound.playSuccess();
            sound.speakArabic(chosenGate.text);
            setHitFeedback('correct');
            setScore(s => s + 1);
            GameStorage.addReward(35, 2, 'lughah', 5);
            onReward(35, 2);
          } else {
            sound.playGentleRetry();
            setHitFeedback('wrong');
          }

          setTimeout(() => {
            setHitFeedback(null);
            if (waveIdx < RUNNER_WAVES.length - 1) {
              setWaveIdx(w => w + 1);
              setProgress(0);
            } else {
              setIsFinished(true);
            }
          }, 700);

          return 0;
        }
        return prev + 3.8;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [waveIdx, currentLane, isFinished, isPaused, wave]);

  const moveLane = (dir: -1 | 1) => {
    setCurrentLane(prev => Math.max(0, Math.min(2, prev + dir)));
  };

  const handleRestart = () => {
    setWaveIdx(0);
    setCurrentLane(1);
    setProgress(0);
    setScore(0);
    setIsFinished(false);
    setHitFeedback(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-lg bg-slate-900 text-white rounded-3xl shadow-2xl border-4 border-amber-400 overflow-hidden flex flex-col max-h-[94vh]"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 p-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                Pasar Apung Mufradat (MFR)
              </span>
              <span className="text-xs bg-amber-300 text-slate-950 font-extrabold px-2 py-0.5 rounded-full">
                Skor: {score}
              </span>
            </div>
            <h3 className="font-chibi font-bold text-lg flex items-center gap-2 mt-1">
              🚀 Sky Runner Arabi — Pelari Langit Mufradat
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center font-bold text-sm"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 flex-1 flex flex-col justify-between overflow-hidden">
          {!isFinished ? (
            <>
              {/* Question Banner */}
              <div className="bg-slate-800/90 rounded-2xl p-3 border border-amber-500/40 text-center mb-2 shadow-inner">
                <span className="text-[10px] uppercase tracking-wider text-amber-300 font-bold block mb-1">
                  Gelombang {waveIdx + 1} dari {RUNNER_WAVES.length} • {wave.category}
                </span>
                <h4 className="text-base font-bold text-white mb-0.5">
                  {wave.prompt}
                </h4>
                <p className="text-[11px] text-slate-300">
                  {wave.subPrompt}
                </p>
              </div>

              {/* Runner Track Simulation (Perspective 3 Lanes) */}
              <div className="relative flex-1 bg-gradient-to-b from-sky-950 via-slate-900 to-amber-950/40 rounded-2xl border border-white/10 overflow-hidden flex flex-col justify-between p-3 min-h-[220px]">
                {/* Distance Progress Bar */}
                <div className="w-full bg-slate-800 rounded-full h-2 mb-2 overflow-hidden border border-white/10">
                  <motion.div
                    className="h-full bg-gradient-to-r from-amber-400 to-orange-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Approaching Gates in 3 Lanes */}
                <div className="grid grid-cols-3 gap-2 my-auto">
                  {wave.lanes.map((lane, i) => {
                    const isSelectedLane = currentLane === i;
                    const isHitting = progress > 85 && isSelectedLane;

                    return (
                      <div
                        key={i}
                        className={`relative rounded-2xl p-2.5 text-center flex flex-col items-center justify-center transition-all border-2 ${
                          isSelectedLane
                            ? 'border-amber-400 bg-amber-500/20 shadow-lg shadow-amber-500/20 scale-102 ring-2 ring-amber-300/50'
                            : 'border-white/10 bg-white/5 opacity-70'
                        } ${
                          isHitting && hitFeedback === 'correct'
                            ? 'bg-emerald-500/40 border-emerald-400 ring-4 ring-emerald-400'
                            : ''
                        } ${
                          isHitting && hitFeedback === 'wrong'
                            ? 'bg-rose-500/40 border-rose-400 ring-4 ring-rose-400'
                            : ''
                        }`}
                      >
                        <span className="text-[9px] text-slate-400 uppercase font-bold mb-1">
                          {i === 0 ? 'Jalur Kiri' : i === 1 ? 'Jalur Tengah' : 'Jalur Kanan'}
                        </span>

                        <div className="font-arabic font-bold text-2xl text-amber-200 leading-tight">
                          {lane.text}
                        </div>

                        {lane.translit && (
                          <div className="text-[10px] text-slate-300 font-semibold mt-1">
                            {lane.translit}
                          </div>
                        )}

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            sound.speakArabic(lane.text);
                          }}
                          className="mt-1 text-[9px] text-amber-300 hover:text-white flex items-center gap-1"
                        >
                          <Volume2 className="w-2.5 h-2.5" /> Lafal
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Flying Avatar / Magic Carpet at Bottom Lane Position */}
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {[0, 1, 2].map((idx) => (
                    <div key={idx} className="flex justify-center items-center h-12">
                      {currentLane === idx && (
                        <motion.div
                          layoutId="runner-avatar"
                          className="flex flex-col items-center"
                        >
                          <span className="text-3xl filter drop-shadow-[0_4px_8px_rgba(245,158,11,0.5)]">
                            🛶
                          </span>
                          <span className="text-[10px] bg-amber-400 text-slate-950 font-extrabold px-2 py-0.2 rounded-full mt-0.5">
                            Kamu
                          </span>
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Lane Controls */}
              <div className="grid grid-cols-2 gap-3 mt-3">
                <button
                  onClick={() => moveLane(-1)}
                  disabled={currentLane === 0}
                  className="py-3.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 rounded-2xl font-bold flex items-center justify-center gap-2 border border-white/10 active:scale-95 transition-all text-sm"
                >
                  <ArrowLeft className="w-5 h-5 text-amber-400" /> Geser Kiri
                </button>
                <button
                  onClick={() => moveLane(1)}
                  disabled={currentLane === 2}
                  className="py-3.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 rounded-2xl font-bold flex items-center justify-center gap-2 border border-white/10 active:scale-95 transition-all text-sm"
                >
                  Geser Kanan <ArrowRight className="w-5 h-5 text-amber-400" />
                </button>
              </div>
            </>
          ) : (
            /* Finished Victory Card */
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 my-auto">
              <div className="w-20 h-20 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center mb-3 ring-4 ring-amber-400/40 animate-pulse">
                <Award className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold font-chibi text-white">
                Penerbangan Selesai!
              </h3>
              <p className="text-xs text-slate-300 mt-2 max-w-sm">
                Kamu telah menavigasi perahu melintasi gerbang-gerbang mufradat langit dengan gemilang.
              </p>
              <div className="flex items-center gap-4 mt-5 bg-slate-800 p-3 rounded-2xl border border-amber-400/30">
                <div>
                  <span className="text-[10px] text-slate-400 block">Skor Akhir</span>
                  <span className="text-lg font-bold text-amber-400">{score} / {RUNNER_WAVES.length}</span>
                </div>
                <div className="h-6 w-px bg-white/20" />
                <div>
                  <span className="text-[10px] text-slate-400 block">Reward XP</span>
                  <span className="text-lg font-bold text-emerald-400">+150 XP</span>
                </div>
              </div>
              <div className="flex gap-2 w-full max-w-xs mt-6">
                <button
                  onClick={handleRestart}
                  className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl border border-white/20 flex items-center justify-center gap-1.5 text-xs"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Ulangi
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-extrabold rounded-2xl shadow-lg active:scale-95 transition-all text-xs"
                >
                  Selesai
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
