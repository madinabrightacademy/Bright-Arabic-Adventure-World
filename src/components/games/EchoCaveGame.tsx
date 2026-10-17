import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Award, Headphones, Sparkles, ArrowRight, RotateCcw, CheckCircle2, AlertCircle, Gauge, Radio, Shield } from 'lucide-react';
import { sound } from '../../services/sound';
import { GameStorage } from '../../services/storage';
import { GameShell, GameFlowState } from './GameShell';

interface EchoCaveProps {
  onClose: () => void;
  onReward: (xp: number, stars: number) => void;
}

interface EchoQuestion {
  id: string;
  category: 'minimal_pairs' | 'vocal_length' | 'directions_commands' | 'numbers_time';
  categoryLabel: string;
  ar_sound: string;
  translit: string;
  gloss: string;
  explanation: string;
  hint: string;
  correctId: string;
  options: {
    id: string;
    ar: string;
    label: string;
    translit: string;
    emoji: string;
    isContrastTarget?: boolean;
  }[];
}

const ECHO_STAGES: EchoQuestion[] = [
  {
    id: 'ep_1',
    category: 'minimal_pairs',
    categoryLabel: '🎯 Pasangan Minimal (ق vs ك)',
    ar_sound: 'قَلْب',
    translit: 'qalb',
    gloss: 'Hati / Jantung',
    explanation: 'Huruf Qaf (ق) keluar dari pangkal lidah belakang bersentuhan langit-langit lunak, tebal & dalam.',
    hint: 'Dengarkan ketukan tebal dan bulat di pangkal tenggorokan belakang!',
    correctId: 'qalb',
    options: [
      { id: 'kalb', ar: 'كَلْب', label: 'Anjing (Kalb)', translit: 'kalb', emoji: '🐕', isContrastTarget: true },
      { id: 'qalb', ar: 'قَلْب', label: 'Hati / Jantung (Qalb)', translit: 'qalb', emoji: '❤️' },
      { id: 'qalam', ar: 'قَلَم', label: 'Pena (Qalam)', translit: 'qalam', emoji: '🖊️' },
    ]
  },
  {
    id: 'ep_2',
    category: 'minimal_pairs',
    categoryLabel: '🎯 Pasangan Minimal (ع vs ء)',
    ar_sound: 'عَلِيم',
    translit: 'ʿalīm',
    gloss: 'Maha Mengetahui',
    explanation: 'Huruf \'Ain (ع) keluar dari pertengahan tenggorokan dengan tekanan halus mengalir.',
    hint: 'Bunyi mengalir lembut di tengah pita suara.',
    correctId: 'alim',
    options: [
      { id: 'aleem', ar: 'أَلِيم', label: 'Pedih (Alīm)', translit: 'alīm', emoji: '🩹', isContrastTarget: true },
      { id: 'alim', ar: 'عَلِيم', label: 'Maha Tahu (ʿAlīm)', translit: 'ʿalīm', emoji: '🧠' },
      { id: 'azim', ar: 'عَظِيم', label: 'Maha Agung (ʿAẓīm)', translit: 'ʿaẓīm', emoji: '👑' },
    ]
  },
  {
    id: 'ep_3',
    category: 'minimal_pairs',
    categoryLabel: '🎯 Pasangan Minimal (ص vs س)',
    ar_sound: 'صَيْف',
    translit: 'ṣayf',
    gloss: 'Musim Panas',
    explanation: 'Huruf Shad (ص) tebal & lidah melengkung ke atas, menghasilkan desis bulat berat.',
    hint: 'Perhatikan desis tebal bernada berat, bukan desis tipis bersiul.',
    correctId: 'shayf',
    options: [
      { id: 'sayf', ar: 'سَيْف', label: 'Pedang (Sayf)', translit: 'sayf', emoji: '⚔️', isContrastTarget: true },
      { id: 'shayf', ar: 'صَيْف', label: 'Musim Panas (Ṣayf)', translit: 'ṣayf', emoji: '☀️' },
      { id: 'dhayf', ar: 'ضَيْف', label: 'Tamu (Ḍayf)', translit: 'ḍayf', emoji: '🍵' },
    ]
  },
  {
    id: 'ep_4',
    category: 'vocal_length',
    categoryLabel: '⏳ Vokal Panjang vs Pendek (Mad)',
    ar_sound: 'جَمَال',
    translit: 'jamāl',
    gloss: 'Keindahan',
    explanation: 'Memiliki vokal panjang Alif Mad 2 harakat pada huruf Mim (mā-).',
    hint: 'Dengarkan nada vokal huruf kedua yang diayun panjang!',
    correctId: 'jamaal',
    options: [
      { id: 'jamal', ar: 'جَمَل', label: 'Unta (Jamal - pendek)', translit: 'jamal', emoji: '🐫', isContrastTarget: true },
      { id: 'jamaal', ar: 'جَمَال', label: 'Keindahan (Jamāl - panjang)', translit: 'jamāl', emoji: '✨' },
      { id: 'jabal', ar: 'جَبَل', label: 'Gunung (Jabal)', translit: 'jabal', emoji: '⛰️' },
    ]
  },
  {
    id: 'ep_5',
    category: 'directions_commands',
    categoryLabel: '🧭 Orientasi Spasial (Arah)',
    ar_sound: 'يَمِين',
    translit: 'yamīn',
    gloss: 'Kanan',
    explanation: 'Yamīn (يَمِين) berarti arah kanan atau tangan kanan. Lawan katanya Yasār (kiri).',
    hint: 'Kata ini melambangkan arah berkah/kanan.',
    correctId: 'yamin',
    options: [
      { id: 'yasar', ar: 'يَسَار', label: 'Kiri (Yasār)', translit: 'yasār', emoji: '⬅️' },
      { id: 'yamin', ar: 'يَمِين', label: 'Kanan (Yamīn)', translit: 'yamīn', emoji: '➡️' },
      { id: 'amam', ar: 'أَمَام', label: 'Depan (Amām)', translit: 'amām', emoji: '⬆️' },
    ]
  }
];

export const EchoCaveGame: React.FC<EchoCaveProps> = ({ onClose, onReward }) => {
  const [flowState, setFlowState] = useState<GameFlowState>('BRIEFING');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptId, setSelectedOptId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isPlayingEcho, setIsPlayingEcho] = useState(false);
  const [mascotMood, setMascotMood] = useState<'happy' | 'cheer' | 'thinking' | 'celebrate'>('happy');
  const [mascotComment, setMascotComment] = useState('Dengarkan gema gua lalu pilih kata yang tepat!');

  const q = ECHO_STAGES[currentIdx];

  const playEchoSound = () => {
    setIsPlayingEcho(true);
    sound.speakArabic(q.ar_sound, 0.8);

    // Acoustic Echo Effect simulation
    setTimeout(() => {
      sound.speakArabic(q.ar_sound, 0.7);
    }, 450);

    setTimeout(() => {
      setIsPlayingEcho(false);
    }, 1100);
  };

  const handleSelectOption = (optId: string) => {
    if (isAnswered) return;
    setSelectedOptId(optId);
    setIsAnswered(true);

    const isCorrect = optId === q.correctId;
    if (isCorrect) {
      sound.playSuccess();
      setScore(s => s + 1);
      setMascotMood('celebrate');
      setMascotComment(`Mumtaz! Telingamu tajam membedakan gema "${q.ar_sound}"!`);
      GameStorage.addReward(40, 2, 'sam', 7);
      onReward(40, 2);
    } else {
      sound.playGentleRetry();
      setMascotMood('thinking');
      setMascotComment(q.hint);
    }
  };

  const handleNext = () => {
    sound.playPop();
    if (currentIdx < ECHO_STAGES.length - 1) {
      setCurrentIdx(i => i + 1);
      setSelectedOptId(null);
      setIsAnswered(false);
      setMascotMood('happy');
      setMascotComment('Dengarkan gema soal berikutnya!');
    } else {
      setFlowState('VICTORY');
    }
  };

  return (
    <GameShell
      title="Gua Gema Istima'"
      titleAr="كَهْفُ صَدَى الصَّوْتِ"
      islandName="Pulau Istima'"
      islandColor="from-cyan-700 via-teal-700 to-slate-900"
      gameIcon="🎧"
      targetObjective="Asah ketajaman telinga menyimak bunyi gema fonetik dan bedakan pasangan huruf kembar"
      howToPlay={[
        { icon: '🦇', text: 'Ketuk kristal gema di tengah gua untuk mendengarkan lafal Arab.' },
        { icon: '👂', text: 'Perhatikan perbedaan getaran huruf tebal-tipis dan vokal pendek-panjang.' },
        { icon: '💎', text: 'Pilih batu prasasti yang memuat kata yang benar sesuai gema suara!' }
      ]}
      speechArabic="اِسْتَمِعْ إِلَى صَدَى الحُرُوفِ فِي الكَهْفِ!"
      speechIntro="Mari mengasah pendengaran di kedalaman Gua Gema Pulau Istima'!"
      flowState={flowState}
      onStartGame={() => {
        setFlowState('PLAYING');
        setCurrentIdx(0);
        setScore(0);
        setSelectedOptId(null);
        setIsAnswered(false);
        setTimeout(playEchoSound, 300);
      }}
      onPlayAgain={() => {
        setFlowState('PLAYING');
        setCurrentIdx(0);
        setScore(0);
        setSelectedOptId(null);
        setIsAnswered(false);
      }}
      onClose={onClose}
      currentRound={currentIdx + 1}
      totalRounds={ECHO_STAGES.length}
      score={score}
      maxScore={ECHO_STAGES.length}
      starsEarned={score >= 4 ? 3 : score >= 2 ? 2 : 1}
      xpEarned={score * 40}
      mascotMood={mascotMood}
      mascotComment={mascotComment}
      mascotArabic={q.ar_sound}
      onPlayTitleAudio={playEchoSound}
      victorySummary={[
        { label: 'Gema Terpecahkan', value: `${score} / ${ECHO_STAGES.length}` },
        { label: 'Fokus Fonetik', value: 'Qaf-Kaf, Ain-Hamzah, Shad-Sin' },
        { label: 'Tingkat Menyimak', value: 'Istima\' Reseptif' },
        { label: 'Ketajaman Telinga', value: '⭐⭐⭐ Tajam' }
      ]}
    >
      {/* Category Indicator */}
      <div className="bg-slate-100 rounded-2xl p-2.5 mb-2 border border-slate-200 flex items-center justify-between text-xs">
        <span className="font-bold text-teal-900">{q.categoryLabel}</span>
        <span className="text-[10px] text-slate-500 font-semibold">{q.gloss}</span>
      </div>

      {/* Acoustic Echo Crystal Orb */}
      <div className="flex flex-col items-center justify-center p-4 bg-gradient-to-b from-slate-900 to-teal-950 rounded-3xl text-white my-auto shadow-inner border-2 border-teal-500/40 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial from-teal-500/10 via-transparent to-transparent pointer-events-none" />

        <motion.button
          type="button"
          onClick={playEchoSound}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={isPlayingEcho ? { scale: [1, 1.15, 1], rotate: [0, 2, -2, 0] } : {}}
          transition={{ repeat: isPlayingEcho ? Infinity : 0, duration: 0.6 }}
          className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-teal-600 flex items-center justify-center text-white shadow-xl shadow-cyan-500/30 border-4 border-cyan-200 cursor-pointer mb-2"
        >
          <Headphones className="w-9 h-9" />
        </motion.button>

        <span className="text-xs font-bold text-cyan-200 flex items-center gap-1">
          <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
          {isPlayingEcho ? 'Gema bergaung di dalam gua...' : 'Ketuk untuk Dengarkan Gema Suara'}
        </span>
      </div>

      {/* Answer Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-3">
        {q.options.map(opt => {
          const isSelected = selectedOptId === opt.id;
          const isCorrect = opt.id === q.correctId;

          let cardStyle = 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800';
          if (isAnswered) {
            if (isCorrect) {
              cardStyle = 'bg-emerald-100 border-emerald-400 text-emerald-950 ring-2 ring-emerald-300';
            } else if (isSelected) {
              cardStyle = 'bg-rose-100 border-rose-400 text-rose-950';
            } else {
              cardStyle = 'bg-slate-50 border-slate-200 opacity-60';
            }
          }

          return (
            <motion.button
              key={opt.id}
              whileTap={{ scale: 0.97 }}
              disabled={isAnswered}
              onClick={() => handleSelectOption(opt.id)}
              className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center justify-center text-center cursor-pointer shadow-xs ${cardStyle}`}
            >
              <span className="text-2xl mb-1">{opt.emoji}</span>
              <span className="font-arabic text-2xl font-black">{opt.ar}</span>
              <span className="text-xs font-bold mt-0.5">{opt.label}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Feedback banner & Next Button */}
      {isAnswered && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 p-3 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-between gap-2 text-xs"
        >
          <p className="text-teal-900 font-medium leading-snug flex-1">
            💡 {q.explanation}
          </p>
          <button
            type="button"
            onClick={handleNext}
            className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-black flex items-center gap-1 shadow-xs shrink-0 cursor-pointer active:scale-95"
          >
            <span>{currentIdx < ECHO_STAGES.length - 1 ? 'Soal Berikutnya' : 'Lihat Hasil'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}
    </GameShell>
  );
};
