import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Award, Sparkles, RefreshCw, ArrowRight, Link, Unlink, CheckCircle2 } from 'lucide-react';
import { sound } from '../../services/sound';
import { GameStorage } from '../../services/storage';
import { GameShell, GameFlowState } from './GameShell';

interface PearlChainProps {
  onClose: () => void;
  onReward: (xp: number, stars: number) => void;
}

interface ChainPuzzle {
  id: string;
  wordAr: string;
  translit: string;
  meaning: string;
  pearls: {
    baseChar: string;
    name: string;
    correctPosForm: string;
    posOptions: { form: string; posName: string; isCorrect: boolean }[];
    stopsConnectionLeft: boolean;
  }[];
  pedagogyTip: string;
}

const CHAIN_PUZZLES: ChainPuzzle[] = [
  {
    id: 'chain_1',
    wordAr: 'كَتَبَ',
    translit: 'kataba',
    meaning: 'Dia telah menulis',
    pedagogyTip: 'Semua huruf ك - ت - ب menyambung satu sama lain dari awal, tengah, hingga akhir rantai.',
    pearls: [
      {
        baseChar: 'ك',
        name: 'Kaf',
        correctPosForm: 'كـ',
        stopsConnectionLeft: false,
        posOptions: [
          { form: 'كـ', posName: 'Bentuk Awal (كـ)', isCorrect: true },
          { form: 'ـكـ', posName: 'Bentuk Tengah (ـكـ)', isCorrect: false },
          { form: 'ك', posName: 'Bentuk Sendiri (ك)', isCorrect: false },
        ]
      },
      {
        baseChar: 'ت',
        name: 'Ta',
        correctPosForm: 'ـتـ',
        stopsConnectionLeft: false,
        posOptions: [
          { form: 'ـتـ', posName: 'Bentuk Tengah (ـتـ)', isCorrect: true },
          { form: 'تـ', posName: 'Bentuk Awal (تـ)', isCorrect: false },
          { form: 'ـت', posName: 'Bentuk Akhir (ـت)', isCorrect: false },
        ]
      },
      {
        baseChar: 'ب',
        name: 'Ba',
        correctPosForm: 'ـب',
        stopsConnectionLeft: false,
        posOptions: [
          { form: 'ـب', posName: 'Bentuk Akhir (ـب)', isCorrect: true },
          { form: 'بـ', posName: 'Bentuk Awal (بـ)', isCorrect: false },
          { form: 'ـبـ', posName: 'Bentuk Tengah (ـبـ)', isCorrect: false },
        ]
      }
    ]
  },
  {
    id: 'chain_2',
    wordAr: 'بَاب',
    translit: 'bāb',
    meaning: 'Pintu gerbang',
    pedagogyTip: 'Huruf Alif (ا) adalah 1 dari 6 huruf yang TIDAK BISA menyambung ke kiri.',
    pearls: [
      {
        baseChar: 'ب',
        name: 'Ba',
        correctPosForm: 'بـ',
        stopsConnectionLeft: false,
        posOptions: [
          { form: 'بـ', posName: 'Bentuk Awal (بـ)', isCorrect: true },
          { form: 'ـب', posName: 'Bentuk Akhir (ـب)', isCorrect: false },
        ]
      },
      {
        baseChar: 'ا',
        name: 'Alif',
        correctPosForm: 'ـا',
        stopsConnectionLeft: true,
        posOptions: [
          { form: 'ـا', posName: 'Sambung Kanan (ـا)', isCorrect: true },
          { form: 'ـاـ', posName: 'Dua Sisi (salah)', isCorrect: false },
        ]
      },
      {
        baseChar: 'ب',
        name: 'Ba',
        correctPosForm: 'ب',
        stopsConnectionLeft: false,
        posOptions: [
          { form: 'ب', posName: 'Bentuk Sendiri (ب)', isCorrect: true },
          { form: 'ـب', posName: 'Bentuk Sambung (ـب)', isCorrect: false },
        ]
      }
    ]
  },
  {
    id: 'chain_3',
    wordAr: 'مَسْجِد',
    translit: 'masjid',
    meaning: 'Tempat ibadah masjid',
    pedagogyTip: 'Huruf Dal (د) di akhir kata menyambung dari kanan tapi memutus sambungan ke kiri.',
    pearls: [
      {
        baseChar: 'م',
        name: 'Mim',
        correctPosForm: 'مـ',
        stopsConnectionLeft: false,
        posOptions: [
          { form: 'مـ', posName: 'Bentuk Awal (مـ)', isCorrect: true },
          { form: 'ـمـ', posName: 'Bentuk Tengah (ـمـ)', isCorrect: false },
        ]
      },
      {
        baseChar: 'س',
        name: 'Sin',
        correctPosForm: 'ـسـ',
        stopsConnectionLeft: false,
        posOptions: [
          { form: 'ـسـ', posName: 'Bentuk Tengah (ـسـ)', isCorrect: true },
          { form: 'سـ', posName: 'Bentuk Awal (سـ)', isCorrect: false },
        ]
      },
      {
        baseChar: 'ج',
        name: 'Jim',
        correctPosForm: 'ـجـ',
        stopsConnectionLeft: false,
        posOptions: [
          { form: 'ـجـ', posName: 'Bentuk Tengah (ـجـ)', isCorrect: true },
          { form: 'ج', posName: 'Bentuk Sendiri (ج)', isCorrect: false },
        ]
      },
      {
        baseChar: 'د',
        name: 'Dal',
        correctPosForm: 'ـد',
        stopsConnectionLeft: true,
        posOptions: [
          { form: 'ـد', posName: 'Sambung Kanan (ـد)', isCorrect: true },
          { form: 'د', posName: 'Bentuk Sendiri (د)', isCorrect: false },
        ]
      }
    ]
  }
];

export const PearlChainGame: React.FC<PearlChainProps> = ({ onClose, onReward }) => {
  const [flowState, setFlowState] = useState<GameFlowState>('BRIEFING');
  const [puzzleIdx, setPuzzleIdx] = useState(0);
  const [chosenForms, setChosenForms] = useState<Record<number, string>>({});
  const [isAssembled, setIsAssembled] = useState(false);
  const [wrongAttempt, setWrongAttempt] = useState(false);
  const [mascotMood, setMascotMood] = useState<'happy' | 'cheer' | 'thinking' | 'celebrate'>('happy');
  const [mascotComment, setMascotComment] = useState('Pilih bentuk sambung yang tepat untuk tiap mutiara!');

  const puzzle = CHAIN_PUZZLES[puzzleIdx];

  const handleSelectOption = (pearlIdx: number, form: string) => {
    sound.playTap();
    setChosenForms(prev => ({ ...prev, [pearlIdx]: form }));
  };

  const handleTestChain = () => {
    const isAllSelected = puzzle.pearls.every((_, idx) => Boolean(chosenForms[idx]));
    if (!isAllSelected) return;

    const isAllCorrect = puzzle.pearls.every(
      (pearl, idx) => chosenForms[idx] === pearl.correctPosForm
    );

    if (isAllCorrect) {
      sound.playSuccess();
      sound.speakArabic(puzzle.wordAr);
      setIsAssembled(true);
      setMascotMood('celebrate');
      setMascotComment(`Mumtaz! Untaian kata "${puzzle.wordAr}" bersambung sempurna!`);

      GameStorage.addReward(45, 2, 'kitabah', 7);
      onReward(45, 2);

      setTimeout(() => {
        if (puzzleIdx < CHAIN_PUZZLES.length - 1) {
          setIsAssembled(false);
          setChosenForms({});
          setPuzzleIdx(prev => prev + 1);
          setMascotMood('happy');
          setMascotComment('Rangkai untaian mutiara berikutnya!');
        } else {
          setFlowState('VICTORY');
        }
      }, 1500);
    } else {
      sound.playGentleRetry();
      setWrongAttempt(true);
      setMascotMood('thinking');
      setMascotComment('Perhatikan posisi awal, tengah, atau akhir huruf yang belum pas.');
      setTimeout(() => setWrongAttempt(false), 800);
    }
  };

  return (
    <GameShell
      title="Untaian Mutiara Sambung"
      titleAr="سِلْسِلَةُ اللُّؤْلُؤِ المُتَّصِلَةِ"
      islandName="Pulau Huruf"
      islandColor="from-purple-600 via-indigo-600 to-teal-700"
      gameIcon="📿"
      targetObjective="Pilih bentuk potongan huruf (awal, tengah, akhir) untuk merangkai untaian kata yang menyambung indah"
      howToPlay={[
        { icon: '📿', text: 'Perhatikan kata target bahasa Arab yang ingin disambungkan.' },
        { icon: '🔍', text: 'Tentukan apakah huruf berada di awal, di tengah, atau di akhir kata.' },
        { icon: '⚠️', text: 'Waspadai 6 huruf pemutus (ا, د, ذ, ر, ز, و) yang tidak menyambung ke arah kiri!' }
      ]}
      speechArabic="اِرْبِطْ حُرُوفَ الكَلِمَاتِ بِإِتْقَانٍ!"
      speechIntro="Mari menguntai kalung mutiara huruf sambung di pesisir Pulau Huruf!"
      flowState={flowState}
      onStartGame={() => {
        setFlowState('PLAYING');
        setPuzzleIdx(0);
        setChosenForms({});
        setIsAssembled(false);
      }}
      onPlayAgain={() => {
        setFlowState('PLAYING');
        setPuzzleIdx(0);
        setChosenForms({});
        setIsAssembled(false);
      }}
      onClose={onClose}
      currentRound={puzzleIdx + 1}
      totalRounds={CHAIN_PUZZLES.length}
      score={puzzleIdx + 1}
      maxScore={CHAIN_PUZZLES.length}
      starsEarned={3}
      xpEarned={CHAIN_PUZZLES.length * 45}
      mascotMood={mascotMood}
      mascotComment={mascotComment}
      mascotArabic={puzzle.wordAr}
      onPlayTitleAudio={() => sound.speakArabic(puzzle.wordAr)}
      victorySummary={[
        { label: 'Untaian Selesai', value: `${CHAIN_PUZZLES.length} Kata` },
        { label: 'Kaidah Khat', value: 'Bentuk Sambung Naskh' },
        { label: 'Kaidah Pemutus', value: '6 Huruf Non-Kiri' },
        { label: 'Kerapian Rantai', value: '⭐⭐⭐ Sempurna' }
      ]}
    >
      {/* Target Word Banner */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-indigo-200 rounded-2xl p-3 sm:p-4 mb-3 text-center shadow-xs">
        <div className="flex items-center justify-center gap-2">
          <span className="font-arabic text-3xl sm:text-4xl font-black text-indigo-950">
            {puzzle.wordAr}
          </span>
          <button
            type="button"
            onClick={() => sound.speakArabic(puzzle.wordAr)}
            className="p-1.5 rounded-full bg-white hover:bg-indigo-100 text-indigo-800 border border-indigo-200 shadow-2xs"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>
        <div className="text-xs text-slate-600 mt-0.5">
          <strong>{puzzle.translit}</strong> — "{puzzle.meaning}"
        </div>
        <p className="text-[11px] text-purple-700 font-semibold mt-1 bg-purple-100/70 py-0.5 px-2 rounded-lg inline-block">
          💡 {puzzle.pedagogyTip}
        </p>
      </div>

      {/* Pearl Chain Visual Display */}
      <div
        className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-center gap-3 my-auto ${
          isAssembled
            ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-300'
            : wrongAttempt
            ? 'bg-rose-50 border-rose-300'
            : 'bg-slate-50 border-slate-200'
        }`}
      >
        {puzzle.pearls.map((pearl, pIdx) => {
          const selected = chosenForms[pIdx];
          return (
            <div key={pIdx} className="flex flex-col items-center gap-2">
              <div
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex flex-col items-center justify-center shadow-md border-2 transition-all ${
                  selected
                    ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-indigo-300'
                    : 'bg-white border-dashed border-indigo-300 text-slate-400'
                }`}
              >
                {selected ? (
                  <span className="font-arabic text-2xl sm:text-3xl font-black">{selected}</span>
                ) : (
                  <span className="text-[10px] font-bold">Pilih {pearl.name}</span>
                )}
              </div>

              {/* Pos Options Buttons */}
              <div className="flex flex-col gap-1 w-full max-w-[90px]">
                {pearl.posOptions.map((opt, oIdx) => (
                  <button
                    key={oIdx}
                    type="button"
                    onClick={() => handleSelectOption(pIdx, opt.form)}
                    className={`px-2 py-1 rounded-lg text-xs font-bold border transition-all ${
                      selected === opt.form
                        ? 'bg-indigo-600 text-white border-indigo-400 shadow-2xs font-black'
                        : 'bg-white hover:bg-indigo-50 text-slate-700 border-slate-200 text-[10px]'
                    }`}
                  >
                    <span className="font-arabic text-sm">{opt.form}</span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Action */}
      <div className="pt-3 flex items-center justify-end">
        <button
          type="button"
          disabled={!puzzle.pearls.every((_, idx) => Boolean(chosenForms[idx]))}
          onClick={handleTestChain}
          className={`px-5 py-2.5 rounded-xl text-xs font-black shadow-md transition-all flex items-center gap-1.5 ${
            puzzle.pearls.every((_, idx) => Boolean(chosenForms[idx]))
              ? 'bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white cursor-pointer active:scale-95'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <span>Uji Untaian</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </GameShell>
  );
};
