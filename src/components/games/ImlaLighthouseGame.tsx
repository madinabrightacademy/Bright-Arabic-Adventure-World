import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Award, Sparkles, ArrowRight, CheckCircle2, RotateCcw, Filter, Anchor } from 'lucide-react';
import { sound } from '../../services/sound';
import { GameStorage } from '../../services/storage';
import { GameShell, GameFlowState } from './GameShell';

interface ImlaLighthouseProps {
  onClose: () => void;
  onReward: (xp: number, stars: number) => void;
}

export interface ImlaQuestion {
  id: string;
  level: number;
  levelLabel: string;
  wordToDictate: string;
  meaning: string;
  translit: string;
  options: { id: string; ar: string; correct: boolean }[];
  hint: string;
}

export const IMLA_QUESTIONS: ImlaQuestion[] = [
  {
    id: 'imla_l0_1',
    level: 0,
    levelLabel: 'Huruf Pemutus Kiri',
    wordToDictate: 'بَابٌ',
    meaning: 'Pintu gerbang pelabuhan',
    translit: 'bābun',
    options: [
      { id: '1', ar: 'بَابٌ', correct: true },
      { id: '2', ar: 'بـاـبٌ', correct: false },
      { id: '3', ar: 'تَابٌ', correct: false },
    ],
    hint: 'Huruf Alif adalah pemutus kiri, tidak boleh menyambung ke huruf Ba di sebelah kirinya.'
  },
  {
    id: 'imla_l0_2',
    level: 0,
    levelLabel: 'Huruf Pemutus Kiri',
    wordToDictate: 'دَرَسَ',
    meaning: 'Ia telah belajar tekun',
    translit: 'darasa',
    options: [
      { id: '1', ar: 'دَرَـسَ', correct: false },
      { id: '2', ar: 'دَرَسَ', correct: true },
      { id: '3', ar: 'ذَرَسَ', correct: false },
    ],
    hint: 'Huruf Dal dan Ra keduanya adalah pemutus kiri, ditulis mandiri.'
  },
  {
    id: 'imla_l1_1',
    level: 1,
    levelLabel: 'Ta Marbuthah vs Maftuhah',
    wordToDictate: 'مَدْرَسَة',
    meaning: 'Gedung sekolah ilmu',
    translit: 'madrasah',
    options: [
      { id: '1', ar: 'مَدْرَسَت', correct: false },
      { id: '2', ar: 'مَدْرَسَة', correct: true },
      { id: '3', ar: 'مَدْرَسَه', correct: false },
    ],
    hint: 'Kata feminin berbunyi "H" saat waqaf wajib berakhiran Ta Marbuthah (ـة).'
  },
  {
    id: 'imla_l1_2',
    level: 1,
    levelLabel: 'Alif Lam Syamsiyyah',
    wordToDictate: 'الشَّمْس',
    meaning: 'Matahari terik',
    translit: 'asy-syams',
    options: [
      { id: '1', ar: 'الشَّمْس', correct: true },
      { id: '2', ar: 'أَشَّمْس', correct: false },
      { id: '3', ar: 'إِلْشَّمْس', correct: false },
    ],
    hint: 'Huruf Lam pada Alif Lam Syamsiyyah tetap wajib ditulis meski bunyinya melebur ke Syin.'
  }
];

export const ImlaLighthouseGame: React.FC<ImlaLighthouseProps> = ({ onClose, onReward }) => {
  const [flowState, setFlowState] = useState<GameFlowState>('BRIEFING');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptId, setSelectedOptId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [mascotMood, setMascotMood] = useState<'happy' | 'cheer' | 'thinking' | 'celebrate'>('happy');
  const [mascotComment, setMascotComment] = useState('Dengarkan dikte mercusuar dan pilih rasm ejaan yang tepat!');

  const q = IMLA_QUESTIONS[currentIdx];

  const playDictation = () => {
    sound.speakArabic(q.wordToDictate);
  };

  const handleSelectOption = (opt: { id: string; ar: string; correct: boolean }) => {
    if (isAnswered) return;
    setSelectedOptId(opt.id);
    setIsAnswered(true);

    if (opt.correct) {
      sound.playSuccess();
      setScore(s => s + 1);
      setMascotMood('celebrate');
      setMascotComment(`Mumtaz! Rasm ejaan "${q.wordToDictate}" tepat menyalakan mercusuar!`);
      GameStorage.addReward(40, 2, 'kitabah', 7);
      onReward(40, 2);
    } else {
      sound.playGentleRetry();
      setMascotMood('thinking');
      setMascotComment(q.hint);
    }
  };

  const handleNext = () => {
    sound.playPop();
    if (currentIdx < IMLA_QUESTIONS.length - 1) {
      setCurrentIdx(i => i + 1);
      setSelectedOptId(null);
      setIsAnswered(false);
      setMascotMood('happy');
      setMascotComment('Dengarkan dikte soal berikutnya!');
    } else {
      setFlowState('VICTORY');
    }
  };

  return (
    <GameShell
      title="Mercusuar Imla' Kitabah"
      titleAr="مَنَارَةُ الإِمْلَاءِ وَالكِتَابَةِ"
      islandName="Pulau Kitabah"
      islandColor="from-amber-700 via-orange-700 to-stone-900"
      gameIcon="🗼"
      targetObjective="Dengarkan dikte audio mercusuar dan pilih penulisan ejaan kaidah rasm Imla' yang tepat"
      howToPlay={[
        { icon: '🗼', text: 'Dengarkan kata yang didiktekan dari menara mercusuar.' },
        { icon: '✍️', text: 'Perhatikan kaidah penulisan (Ta Marbuthah, Alif Lam, huruf pemutus).' },
        { icon: '💡', text: 'Pilih ejaan yang tepat untuk menyalakan lentera pemandu kapal!' }
      ]}
      speechArabic="اِسْتَمِعْ إِلَى الإِمْلَاءِ وَاكْتُبْ بِإِتْقَانٍ!"
      speechIntro="Mari menyalakan lentera ilmu di Mercusuar Imla' Pulau Kitabah!"
      flowState={flowState}
      onStartGame={() => {
        setFlowState('PLAYING');
        setCurrentIdx(0);
        setScore(0);
        setSelectedOptId(null);
        setIsAnswered(false);
        setTimeout(playDictation, 300);
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
      totalRounds={IMLA_QUESTIONS.length}
      score={score}
      maxScore={IMLA_QUESTIONS.length}
      starsEarned={score >= 3 ? 3 : score >= 2 ? 2 : 1}
      xpEarned={score * 40}
      mascotMood={mascotMood}
      mascotComment={mascotComment}
      mascotArabic={q.wordToDictate}
      onPlayTitleAudio={playDictation}
      victorySummary={[
        { label: 'Dikte Selesai', value: `${score} / ${IMLA_QUESTIONS.length}` },
        { label: 'Kaidah Rasm', value: 'Ta Marbuthah, Alif Lam' },
        { label: 'Lentera Menyala', value: 'Lentera Terang Penuh' },
        { label: 'Ketepatan Ejaan', value: '⭐⭐⭐ Sempurna' }
      ]}
    >
      {/* Category Indicator */}
      <div className="bg-amber-100/70 rounded-2xl p-2.5 mb-2 border border-amber-300 flex items-center justify-between text-xs">
        <span className="font-bold text-amber-950">{q.levelLabel}</span>
        <span className="text-[11px] text-amber-800 font-semibold">{q.meaning}</span>
      </div>

      {/* Dictation Lighthouse Audio Beacon */}
      <div className="p-5 rounded-3xl bg-gradient-to-b from-stone-900 to-amber-950 text-white flex flex-col items-center justify-center my-auto shadow-inner border-2 border-amber-500/40">
        <button
          type="button"
          onClick={playDictation}
          className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center shadow-lg border-4 border-amber-200 cursor-pointer active:scale-95 mb-2"
          title="Putar Dikte"
        >
          <Volume2 className="w-9 h-9" />
        </button>

        <span className="text-xs font-bold text-amber-200">
          Ketuk untuk mendengarkan lafal dikte mercusuar
        </span>
      </div>

      {/* Spelling Choice Options */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-3">
        {q.options.map(opt => {
          const isSelected = selectedOptId === opt.id;
          let style = 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800';
          if (isAnswered) {
            if (opt.correct) {
              style = 'bg-emerald-100 border-emerald-400 text-emerald-950 ring-2 ring-emerald-300';
            } else if (isSelected) {
              style = 'bg-rose-100 border-rose-400 text-rose-950';
            } else {
              style = 'bg-slate-50 border-slate-200 opacity-60';
            }
          }

          return (
            <motion.button
              key={opt.id}
              whileTap={{ scale: 0.97 }}
              disabled={isAnswered}
              onClick={() => handleSelectOption(opt)}
              className={`p-3.5 rounded-2xl border-2 transition-all flex flex-col items-center justify-center cursor-pointer shadow-xs ${style}`}
            >
              <span className="font-arabic text-2xl sm:text-3xl font-black">
                {opt.ar}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Feedback banner & Next Button */}
      {isAnswered && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 p-3 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-2 text-xs"
        >
          <p className="text-amber-950 font-medium leading-snug flex-1">
            💡 {q.hint}
          </p>
          <button
            type="button"
            onClick={handleNext}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-black flex items-center gap-1 shadow-xs shrink-0 cursor-pointer active:scale-95"
          >
            <span>{currentIdx < IMLA_QUESTIONS.length - 1 ? 'Soal Berikutnya' : 'Lihat Hasil'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}
    </GameShell>
  );
};
