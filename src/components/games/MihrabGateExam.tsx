import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Award, Crown, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { sound } from '../../services/sound';
import { GameStorage } from '../../services/storage';
import { GameShell, GameFlowState } from './GameShell';

interface MihrabGateProps {
  onClose: () => void;
  onReward: (xp: number, stars: number) => void;
  onPromote: () => void;
}

interface ExamQuestion {
  modality: 'L' | 'P' | 'R' | 'W';
  skillLabel: string;
  prompt: string;
  arText?: string;
  options: { id: string; text: string; arText?: string; correct: boolean }[];
  hint: string;
}

const EXAM_QUESTIONS: ExamQuestion[] = [
  {
    modality: 'L',
    skillLabel: 'Keterampilan 1: Menyimak (Istima\')',
    prompt: 'Dengarkan suara berikut, lalu tentukan benda yang dimaksud:',
    arText: 'خُبْز',
    options: [
      { id: '1', text: 'Air segar (مَاء)', correct: false },
      { id: '2', text: 'Roti hangat (خُبْز)', correct: true },
      { id: '3', text: 'Susu putih (حَلِيب)', correct: false },
    ],
    hint: 'Kata ini adalah makanan pokok yang dipanggang.'
  },
  {
    modality: 'P',
    skillLabel: 'Keterampilan 2: Berbicara & Hiwar (Lisan)',
    prompt: 'Jika seseorang menyapa dengan "السَّلَامُ عَلَيْكُمْ", jawaban yang paling tepat dan sempurna adalah:',
    options: [
      { id: '1', text: 'وَعَلَيْكُمُ السَّلَام (Wa ʿalaykumu s-salām)', arText: 'وَعَلَيْكُمُ السَّلَام', correct: true },
      { id: '2', text: 'مَا اسْمُكَ؟ (Siapa namamu?)', arText: 'مَا اسْمُكَ؟', correct: false },
      { id: '3', text: 'أَنَا أَب (Saya seorang ayah)', arText: 'أَنَا أَب', correct: false },
    ],
    hint: 'Menjawab salam dengan mendoakan keselamatan kembali.'
  },
  {
    modality: 'R',
    skillLabel: 'Keterampilan 3: Membaca (Qira\'ah)',
    prompt: 'Bacalah kalimat tunjuk berikut: "هٰذَا كِتَابٌ كَبِيرٌ". Apa maknanya?',
    arText: 'هٰذَا كِتَابٌ كَبِيرٌ',
    options: [
      { id: '1', text: 'Ini sebuah pena kecil', correct: false },
      { id: '2', text: 'Ini sebuah buku yang besar', correct: true },
      { id: '3', text: 'Itu sebuah pintu yang terbuka', correct: false },
    ],
    hint: 'Kata كِتَابٌ berarti buku, dan كَبِيرٌ berarti besar.'
  },
  {
    modality: 'W',
    skillLabel: 'Keterampilan 4: Menulis & Ejaan (Kitabah)',
    prompt: 'Manakah bentuk huruf tunggal pertama dari alfabet hijaiyah?',
    options: [
      { id: '1', text: 'Huruf Alif', arText: 'أ', correct: true },
      { id: '2', text: 'Huruf Ba', arText: 'ب', correct: false },
      { id: '3', text: 'Huruf Jim', arText: 'ج', correct: false },
    ],
    hint: 'Huruf yang tegak lurus dengan hamzah di atasnya.'
  }
];

export const MihrabGateExam: React.FC<MihrabGateProps> = ({ onClose, onReward, onPromote }) => {
  const [flowState, setFlowState] = useState<GameFlowState>('BRIEFING');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptId, setSelectedOptId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [mascotMood, setMascotMood] = useState<'happy' | 'cheer' | 'thinking' | 'celebrate'>('happy');
  const [mascotComment, setMascotComment] = useState('Uji 4 pilar kecakapan bahasa Arabmu di gerbang mihrab!');

  const q = EXAM_QUESTIONS[currentIdx];

  const handlePlayAudio = (text: string) => {
    sound.speakArabic(text);
  };

  const handleSelectOption = (opt: { id: string; correct: boolean }) => {
    if (isAnswered) return;
    setSelectedOptId(opt.id);
    setIsAnswered(true);

    if (opt.correct) {
      sound.playSuccess();
      setScore(s => s + 1);
      setMascotMood('celebrate');
      setMascotComment('Mumtaz! Jawaban pilar ujianmu tepat dan benar!');
      GameStorage.addReward(50, 2, 'lughah', 8);
      onReward(50, 2);
    } else {
      sound.playGentleRetry();
      setMascotMood('thinking');
      setMascotComment(q.hint);
    }
  };

  const handleNext = () => {
    sound.playPop();
    if (currentIdx < EXAM_QUESTIONS.length - 1) {
      setCurrentIdx(i => i + 1);
      setSelectedOptId(null);
      setIsAnswered(false);
      setMascotMood('happy');
      setMascotComment('Pilar kecakapan berikutnya!');
    } else {
      onPromote();
      setFlowState('VICTORY');
    }
  };

  return (
    <GameShell
      title="Ujian Gerbang Mihrab"
      titleAr="اِمْتِحَانُ بَوَّابَةِ المِحْرَابِ"
      islandName="Gerbang Mihrab"
      islandColor="from-amber-600 via-yellow-600 to-amber-800"
      gameIcon="⛩️"
      targetObjective="Tuntaskan 4 pilar evaluasi komprehensif (Istima', Kalam, Qira'ah, Kitabah) untuk kenaikan jenjang petualang"
      howToPlay={[
        { icon: '🏛️', text: 'Selesaikan 4 pilar ujian: Menyimak, Berbicara, Membaca, dan Menulis.' },
        { icon: '🌟', text: 'Pilih jawaban yang paling tepat sesuai kaidah fusha.' },
        { icon: '👑', text: 'Raih kelulusan untuk membuka kenaikan tingkat petualang!' }
      ]}
      speechArabic="بَارَكَ اللَّهُ فِيكُمْ، بَوَّابَةُ المِحْرَابِ مَفْتُوحَةٌ!"
      speechIntro="Selamat datang di Gerbang Kelulusan Mihrab Kepulauan Bahasa Arab!"
      flowState={flowState}
      onStartGame={() => {
        setFlowState('PLAYING');
        setCurrentIdx(0);
        setScore(0);
        setSelectedOptId(null);
        setIsAnswered(false);
        if (EXAM_QUESTIONS[0].arText) {
          handlePlayAudio(EXAM_QUESTIONS[0].arText);
        }
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
      totalRounds={EXAM_QUESTIONS.length}
      score={score}
      maxScore={EXAM_QUESTIONS.length}
      starsEarned={score >= 3 ? 3 : score >= 2 ? 2 : 1}
      xpEarned={score * 50}
      mascotMood={mascotMood}
      mascotComment={mascotComment}
      mascotArabic="مِحْرَابٌ"
      onPlayTitleAudio={() => handlePlayAudio('مِحْرَابٌ')}
      victorySummary={[
        { label: 'Hasil Ujian', value: `${score} / ${EXAM_QUESTIONS.length} Pilar Tuntas` },
        { label: 'Status Kelulusan', value: score >= 3 ? 'Lulus Mumtaz' : 'Lulus Baik' },
        { label: 'Gelar Petualang', value: '👑 Rahhal Cilik' },
        { label: 'Tingkat Baru', value: 'Level 1 Terbuka' }
      ]}
    >
      {/* Question Skill Label */}
      <div className="bg-amber-100/70 border border-amber-300 rounded-2xl p-2.5 mb-2 flex items-center justify-between text-xs">
        <span className="font-bold text-amber-950">{q.skillLabel}</span>
        <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded-full">
          Pilar {q.modality}
        </span>
      </div>

      {/* Question Prompt */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-3xl p-4 sm:p-5 text-center my-auto shadow-xs">
        <h4 className="text-sm sm:text-base font-bold text-slate-800 leading-snug">
          {q.prompt}
        </h4>

        {q.arText && (
          <div className="mt-3 flex items-center justify-center gap-2">
            <span className="font-arabic text-3xl font-black text-amber-900">
              {q.arText}
            </span>
            <button
              type="button"
              onClick={() => handlePlayAudio(q.arText!)}
              className="p-1.5 rounded-full bg-white hover:bg-amber-100 text-amber-800 border border-amber-300 shadow-2xs"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Options List */}
      <div className="space-y-2 pt-3">
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
              whileTap={{ scale: 0.98 }}
              disabled={isAnswered}
              onClick={() => handleSelectOption(opt)}
              className={`w-full p-3 rounded-2xl border-2 transition-all flex items-center justify-between text-left shadow-xs cursor-pointer ${style}`}
            >
              <div>
                <span className="text-xs sm:text-sm font-bold block">{opt.text}</span>
                {opt.arText && (
                  <span className="font-arabic text-base font-black text-amber-900 block mt-0.5">
                    {opt.arText}
                  </span>
                )}
              </div>
              {isAnswered && opt.correct && (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Next Button */}
      {isAnswered && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 flex items-center justify-end"
        >
          <button
            type="button"
            onClick={handleNext}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-black text-xs flex items-center gap-1.5 shadow-md active:scale-95 cursor-pointer"
          >
            <span>{currentIdx < EXAM_QUESTIONS.length - 1 ? 'Pilar Berikutnya' : 'Buka Hasil Gerbang'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </GameShell>
  );
};
