import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, ArrowLeft, ArrowRight, Zap, Play, Volume2, Sparkles, RefreshCw, CheckCircle2, Pause } from 'lucide-react';
import { sound } from '../../services/sound';
import { GameStorage } from '../../services/storage';
import { GameShell, GameFlowState } from './GameShell';

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
  targetArabic: string;
  subPrompt: string;
  lanes: RunnerLane[];
}

export const SKY_RUNNER_WAVES: RunnerWave[] = [
  {
    category: 'Makanan & Minuman (الطَّعَام)',
    prompt: 'Cari kata: "ROTI GANDUM HANGAT"',
    targetArabic: 'خُبْز',
    subPrompt: 'Lafalkan "Khubz" dan pilih jalur yang tepat!',
    lanes: [
      { text: 'مَاء', translit: 'māʾ', meaning: 'Air Segar', correct: false },
      { text: 'خُبْز', translit: 'khubz', meaning: 'Roti Gandum', correct: true },
      { text: 'حَلِيب', translit: 'ḥalīb', meaning: 'Susu Murni', correct: false },
    ]
  },
  {
    category: 'Warna Dasar (الأَلْوَان)',
    prompt: 'Cari kata: "MERAH CERAH"',
    targetArabic: 'أَحْمَر',
    subPrompt: 'Warna bendera dan buah delima yang ranum!',
    lanes: [
      { text: 'أَحْمَر', translit: 'aḥmar', meaning: 'Merah', correct: true },
      { text: 'أَزْرَق', translit: 'azraq', meaning: 'Biru', correct: false },
      { text: 'أَخْضَر', translit: 'akhḍar', meaning: 'Hijau', correct: false },
    ]
  },
  {
    category: 'Angka Arab (الأَرْقَام)',
    prompt: 'Cari angka: "TIGA" (٣)',
    targetArabic: 'ثَلَاثَة',
    subPrompt: 'Hitungan ketiga dalam bahasa Arab!',
    lanes: [
      { text: 'وَاحِد', translit: 'wāḥid', meaning: 'Satu (١)', correct: false },
      { text: 'ثَلَاثَة', translit: 'thalāthah', meaning: 'Tiga (٣)', correct: true },
      { text: 'اِثْنَان', translit: 'ithnān', meaning: 'Dua (٢)', correct: false },
    ]
  },
  {
    category: 'Benda Sekitar & Sekolah (الأَدَوَات)',
    prompt: 'Cari kata: "KITAB / BUKU PELAJARAN"',
    targetArabic: 'كِتَاب',
    subPrompt: 'Sumber ilmu pengetahuan para penuntut hikmah!',
    lanes: [
      { text: 'قَلَم', translit: 'qalam', meaning: 'Pena Kaligrafi', correct: false },
      { text: 'بَاب', translit: 'bāb', meaning: 'Pintu Gerbang', correct: false },
      { text: 'كِتَاب', translit: 'kitāb', meaning: 'Buku / Kitab', correct: true },
    ]
  },
  {
    category: 'Fauna Alam (الحَيَوَانَات)',
    prompt: 'Cari kata: "UNTA PADANG PASIR"',
    targetArabic: 'جَمَل',
    subPrompt: 'Kapal padang pasir pengembara kafilah!',
    lanes: [
      { text: 'جَمَل', translit: 'jamal', meaning: 'Unta', correct: true },
      { text: 'حِصَان', translit: 'ḥiṣān', meaning: 'Kuda Tangkas', correct: false },
      { text: 'أَسَد', translit: 'asad', meaning: 'Singa Perkasa', correct: false },
    ]
  }
];

export const SkyRunnerGame: React.FC<SkyRunnerProps> = ({ onClose, onReward }) => {
  const [flowState, setFlowState] = useState<GameFlowState>('BRIEFING');
  const [waveIdx, setWaveIdx] = useState(0);
  const [currentLane, setCurrentLane] = useState<number>(1);
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState(0);
  const [hitFeedback, setHitFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [mascotMood, setMascotMood] = useState<'happy' | 'cheer' | 'thinking' | 'celebrate'>('happy');
  const [mascotComment, setMascotComment] = useState('Geser ke jalur gerbang kata yang benar!');

  const wave = SKY_RUNNER_WAVES[waveIdx];

  // Moving forward runner loop
  useEffect(() => {
    if (flowState !== 'PLAYING' || isPaused) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 94) {
          const chosenGate = wave.lanes[currentLane];
          if (chosenGate.correct) {
            sound.playSuccess();
            sound.speakArabic(chosenGate.text);
            setHitFeedback('correct');
            setScore(s => s + 1);
            setMascotMood('celebrate');
            setMascotComment(`Mumtaz! Gerbang "${chosenGate.text}" berhasil ditembus!`);
          } else {
            sound.playGentleRetry();
            setHitFeedback('wrong');
            setMascotMood('thinking');
            setMascotComment(`Aduh! Jawaban yang benar adalah "${wave.targetArabic}".`);
          }

          setTimeout(() => {
            setHitFeedback(null);
            if (waveIdx < SKY_RUNNER_WAVES.length - 1) {
              setWaveIdx(w => w + 1);
              setProgress(0);
              setMascotMood('happy');
              setMascotComment('Gelombang awan baru di depan!');
            } else {
              setFlowState('VICTORY');
            }
          }, 800);

          return 0;
        }
        return prev + 3.4;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [flowState, waveIdx, currentLane, isPaused, wave, onReward]);

  const moveLane = (dir: -1 | 1) => {
    sound.playPop();
    setCurrentLane(prev => Math.max(0, Math.min(2, prev + dir)));
  };

  const handleSelectDirect = (idx: number) => {
    sound.playPop();
    setCurrentLane(idx);
    sound.speakArabic(wave.lanes[idx].text);
  };

  return (
    <GameShell
      title="Pelari Langit Arabi"
      titleAr="فَارِسُ السَّمَاءِ العَرَبِيُّ"
      islandName="Pulau Tamhid"
      islandColor="from-amber-600 via-orange-600 to-amber-800"
      gameIcon="🏃"
      targetObjective="Kemudikan pelari cilik melintasi 3 gerbang awan dan pilih kata Arab yang cocok dengan cepat"
      howToPlay={[
        { icon: '☁️', text: 'Perhatikan kata target bahasa Indonesia yang muncul di atas langit.' },
        { icon: '🎮', text: 'Tekan tombol arah kiri/kanan atau ketuk jalur untuk berpindah posisi.' },
        { icon: '⚡', text: 'Tembus gerbang kata Arab yang tepat sebelum pelari mencapai ujung!' }
      ]}
      speechArabic="اِرْكُضْ فِي السَّمَاءِ وَاخْتَرْ كَلِمَاتِكَ!"
      speechIntro="Mari berlari di atas awan melatih ketangkasan refleks bahasa Arab!"
      flowState={flowState}
      onStartGame={() => {
        setFlowState('PLAYING');
        setWaveIdx(0);
        setCurrentLane(1);
        setProgress(0);
        setScore(0);
        setHitFeedback(null);
        sound.speakArabic(wave.targetArabic);
      }}
      onPlayAgain={() => {
        setFlowState('PLAYING');
        setWaveIdx(0);
        setCurrentLane(1);
        setProgress(0);
        setScore(0);
        setHitFeedback(null);
      }}
      onClose={onClose}
      onReward={onReward}
      rewardTrait="lughah"
      traitPoints={10}
      currentRound={waveIdx + 1}
      totalRounds={SKY_RUNNER_WAVES.length}
      score={score}
      maxScore={SKY_RUNNER_WAVES.length}
      starsEarned={score >= 4 ? 3 : score >= 2 ? 2 : 1}
      xpEarned={score * 35}
      mascotMood={mascotMood}
      mascotComment={mascotComment}
      mascotArabic={wave.targetArabic}
      onPlayTitleAudio={() => sound.speakArabic(wave.targetArabic)}
      victorySummary={[
        { label: 'Gerbang Ditembus', value: `${score} / ${SKY_RUNNER_WAVES.length}` },
        { label: 'Kecepatan Refleks', value: 'Kilat & Tepat' },
        { label: 'Kosakata Terkuasai', value: 'Makanan, Warna, Fauna' },
        { label: 'Skor Petualang', value: '⭐⭐⭐ Sempurna' }
      ]}
    >
      {/* Target Question Banner */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-2xl p-3 text-center shadow-xs mb-2">
        <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider bg-amber-200/80 px-2 py-0.5 rounded-full inline-block mb-1">
          {wave.category}
        </span>
        <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
          {wave.prompt}
        </h3>
        <p className="text-xs text-slate-500 italic mt-0.5">
          {wave.subPrompt}
        </p>
      </div>

      {/* 3D Runway Simulation Arena */}
      <div className="relative h-60 sm:h-64 rounded-3xl overflow-hidden bg-gradient-to-b from-sky-400 via-indigo-600 to-slate-900 border-4 border-amber-400 shadow-inner flex flex-col justify-between p-3 select-none">
        {/* Background Clouds */}
        <div className="absolute top-2 left-6 text-3xl opacity-60">☁️</div>
        <div className="absolute top-8 right-8 text-2xl opacity-60">☁️</div>

        {/* Approaching Gates at Top */}
        <div className="grid grid-cols-3 gap-2 relative z-10 pt-2">
          {wave.lanes.map((lane, lIdx) => (
            <motion.div
              key={lIdx}
              onClick={() => handleSelectDirect(lIdx)}
              animate={{
                scale: 0.85 + (progress / 100) * 0.25,
                y: (progress / 100) * 45
              }}
              className={`p-2 rounded-2xl text-center border-2 transition-all cursor-pointer shadow-md flex flex-col items-center justify-center ${
                currentLane === lIdx
                  ? 'bg-amber-300 text-slate-950 border-white ring-4 ring-amber-400/50'
                  : 'bg-white/85 hover:bg-white text-slate-800 border-white/60'
              }`}
            >
              <span className="font-arabic text-xl sm:text-2xl font-black block leading-none">
                {lane.text}
              </span>
              <span className="text-[10px] font-sans text-slate-600 block mt-1">
                {lane.meaning}
              </span>
            </motion.div>
          ))}
        </div>

        {/* 3-Lane Tracks Divider Lines */}
        <div className="absolute inset-x-0 bottom-0 h-44 flex justify-around pointer-events-none opacity-30">
          <div className="w-1 bg-white/40 h-full transform -skew-x-12" />
          <div className="w-1 bg-white/40 h-full transform skew-x-12" />
        </div>

        {/* Player Runner Character at Bottom */}
        <div className="grid grid-cols-3 gap-2 relative z-20 pb-2">
          {[0, 1, 2].map(lIdx => (
            <div key={lIdx} className="flex justify-center items-center h-16">
              {currentLane === lIdx && (
                <motion.div
                  layoutId="runnerPlayer"
                  className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 border-2 border-white shadow-xl flex items-center justify-center text-3xl"
                >
                  {hitFeedback === 'correct' ? '🎉' : hitFeedback === 'wrong' ? '💥' : '🏃'}
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Approaching Distance Bar */}
        <div className="absolute bottom-1 inset-x-4 h-1.5 bg-black/40 rounded-full overflow-hidden">
          <div
            className="h-full bg-amber-400 transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Touch Steering Controls */}
      <div className="pt-3 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => moveLane(-1)}
          disabled={currentLane === 0}
          className={`flex-1 py-3 px-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 border-2 transition-all ${
            currentLane > 0
              ? 'bg-slate-800 hover:bg-slate-700 text-white border-amber-400 shadow-md active:scale-95 cursor-pointer'
              : 'bg-slate-200 text-slate-400 border-slate-300 opacity-50 cursor-not-allowed'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Geser Kiri</span>
        </button>

        <button
          type="button"
          onClick={() => sound.speakArabic(wave.targetArabic)}
          className="p-3 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300 shadow-xs"
          title="Dengarkan Lafal Target"
        >
          <Volume2 className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={() => moveLane(1)}
          disabled={currentLane === 2}
          className={`flex-1 py-3 px-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 border-2 transition-all ${
            currentLane < 2
              ? 'bg-slate-800 hover:bg-slate-700 text-white border-amber-400 shadow-md active:scale-95 cursor-pointer'
              : 'bg-slate-200 text-slate-400 border-slate-300 opacity-50 cursor-not-allowed'
          }`}
        >
          <span>Geser Kanan</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </GameShell>
  );
};
