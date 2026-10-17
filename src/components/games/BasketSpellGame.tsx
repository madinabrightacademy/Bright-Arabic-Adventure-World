import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Award, RotateCcw, ArrowRight, Sparkles, CheckCircle2, Layers } from 'lucide-react';
import { sound } from '../../services/sound';
import { GameStorage } from '../../services/storage';
import { GameShell, GameFlowState } from './GameShell';

interface BasketSpellProps {
  onClose: () => void;
  onReward: (xp: number, stars: number) => void;
}

interface SpellWord {
  id: string;
  name_ar: string;
  translit: string;
  name_id: string;
  emoji: string;
  letters: string[];
  category: string;
}

const ALL_SPELL_WORDS: SpellWord[] = [
  {
    id: 'w1',
    name_ar: 'كِتَاب',
    translit: 'kitāb',
    name_id: 'Buku pelajaran',
    emoji: '📖',
    letters: ['ك', 'ـتـ', 'ـا', 'ب'],
    category: 'Sekolah'
  },
  {
    id: 'w2',
    name_ar: 'قَلَم',
    translit: 'qalam',
    name_id: 'Pena tulis',
    emoji: '🖊️',
    letters: ['ق', 'ـلـ', 'ـم'],
    category: 'Sekolah'
  },
  {
    id: 'w3',
    name_ar: 'خُبْز',
    translit: 'khubz',
    name_id: 'Roti gandum',
    emoji: '🍞',
    letters: ['خ', 'ـبـ', 'ز'],
    category: 'Makanan'
  },
  {
    id: 'w4',
    name_ar: 'جَمَل',
    translit: 'jamal',
    name_id: 'Unta gurun',
    emoji: '🐪',
    letters: ['ج', 'ـمـ', 'ـل'],
    category: 'Hewan'
  },
  {
    id: 'w5',
    name_ar: 'سَمَكَة',
    translit: 'samakah',
    name_id: 'Ikan segar',
    emoji: '🐟',
    letters: ['س', 'ـمـ', 'ـكـ', 'ـة'],
    category: 'Hewan'
  }
];

export const BasketSpellGame: React.FC<BasketSpellProps> = ({ onClose, onReward }) => {
  const [flowState, setFlowState] = useState<GameFlowState>('BRIEFING');
  const [wordIdx, setWordIdx] = useState(0);
  const [basketLetters, setBasketLetters] = useState<string[]>([]);
  const [wrongShake, setWrongShake] = useState(false);
  const [score, setScore] = useState(0);
  const [mascotMood, setMascotMood] = useState<'happy' | 'cheer' | 'thinking' | 'celebrate'>('happy');
  const [mascotComment, setMascotComment] = useState('Pilih huruf mengambang untuk mengeja kata!');

  const word = ALL_SPELL_WORDS[wordIdx];

  // Scrambled letters + 2 dummy distractor letters
  const [availableLetters, setAvailableLetters] = useState<string[]>([]);

  const setupRound = (idx: number) => {
    const currentW = ALL_SPELL_WORDS[idx];
    const distractors = ['ـر', 'ن', 'ـد'];
    const pool = [...currentW.letters, distractors[idx % distractors.length]];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    setAvailableLetters(pool);
    setBasketLetters([]);
  };

  const handlePickLetter = (letter: string, lIdx: number) => {
    sound.playTap();
    const nextBasket = [...basketLetters, letter];
    setBasketLetters(nextBasket);

    // Remove picked letter from pool
    const nextAvail = [...availableLetters];
    nextAvail.splice(lIdx, 1);
    setAvailableLetters(nextAvail);

    // Check if basket is full
    if (nextBasket.length === word.letters.length) {
      const isCorrect = nextBasket.every((l, i) => l === word.letters[i]);
      if (isCorrect) {
        sound.playSuccess();
        sound.speakArabic(word.name_ar);
        setScore(s => s + 1);
        setMascotMood('celebrate');
        setMascotComment(`Mumtaz! Kata "${word.name_ar}" berhasil dieja rapi ke keranjang!`);
        GameStorage.addReward(35, 1, 'lughah', 6);
        onReward(35, 1);

        setTimeout(() => {
          if (wordIdx < ALL_SPELL_WORDS.length - 1) {
            setWordIdx(i => i + 1);
            setupRound(wordIdx + 1);
            setMascotMood('happy');
            setMascotComment('Eja kosakata berikutnya ke dalam keranjang!');
          } else {
            setFlowState('VICTORY');
          }
        }, 1200);
      } else {
        sound.playGentleRetry();
        setWrongShake(true);
        setMascotMood('thinking');
        setMascotComment('Ejaan belum tepat! Coba atur kembali hurufnya.');
        setTimeout(() => {
          setWrongShake(false);
          setupRound(wordIdx);
        }, 800);
      }
    }
  };

  const handleResetRound = () => {
    sound.playPop();
    setupRound(wordIdx);
  };

  return (
    <GameShell
      title="Keranjang Ejaan Mufradat"
      titleAr="سَلَّةُ التَّهْجِئَةِ العَرَبِيَّةِ"
      islandName="Pulau Mufradat"
      islandColor="from-amber-500 via-yellow-500 to-orange-600"
      gameIcon="🧺"
      targetObjective="Kumpulkan huruf-huruf potongan yang melayang dan masukkan ke keranjang untuk mengeja kosakata"
      howToPlay={[
        { icon: '🍎', text: 'Perhatikan gambar dan nama benda yang hendak dieja.' },
        { icon: '🎈', text: 'Ketuk potongan huruf yang melayang sesuai urutan kata Arab dari kanan ke kiri.' },
        { icon: '🧺', text: 'Kumpulkan semua 5 kosakata ke dalam keranjang untuk memenangkan bintang!' }
      ]}
      speechArabic="اِجْمَعِ الحُرُوفَ فِي السَّلَّةِ لِتُهَجِّئَ الكَلِمَاتِ!"
      speechIntro="Mari memanen ejaan huruf Arab ke dalam keranjang Pulau Mufradat!"
      flowState={flowState}
      onStartGame={() => {
        setFlowState('PLAYING');
        setWordIdx(0);
        setScore(0);
        setupRound(0);
        sound.speakArabic(ALL_SPELL_WORDS[0].name_ar);
      }}
      onPlayAgain={() => {
        setFlowState('PLAYING');
        setWordIdx(0);
        setScore(0);
        setupRound(0);
      }}
      onClose={onClose}
      currentRound={wordIdx + 1}
      totalRounds={ALL_SPELL_WORDS.length}
      score={score}
      maxScore={ALL_SPELL_WORDS.length}
      starsEarned={score >= 4 ? 3 : score >= 2 ? 2 : 1}
      xpEarned={score * 35}
      mascotMood={mascotMood}
      mascotComment={mascotComment}
      mascotArabic={word.name_ar}
      onPlayTitleAudio={() => sound.speakArabic(word.name_ar)}
      victorySummary={[
        { label: 'Kosakata Tereja', value: `${score} / ${ALL_SPELL_WORDS.length}` },
        { label: 'Kategori Kata', value: 'Sekolah, Makanan, Hewan' },
        { label: 'Kerapian Ejaan', value: '⭐⭐⭐ Sempurna' },
        { label: 'Bonus Dinar', value: '🪙 15 Dinar' }
      ]}
    >
      {/* Target Word Clue Card */}
      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-300 rounded-2xl p-3 sm:p-4 mb-3 flex items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{word.emoji}</span>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded-full">
              {word.category}
            </span>
            <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight mt-0.5">
              {word.name_id} ({word.translit})
            </h3>
          </div>
        </div>

        <button
          type="button"
          onClick={() => sound.speakArabic(word.name_ar)}
          className="p-2 rounded-xl bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs"
          title="Dengarkan Lafal Target"
        >
          <Volume2 className="w-4 h-4" />
        </button>
      </div>

      {/* The Woven Basket Collection Deck */}
      <div
        className={`p-4 rounded-3xl border-3 border-dashed transition-all flex flex-col items-center justify-center my-auto min-h-[110px] ${
          wrongShake
            ? 'bg-rose-50 border-rose-400 animate-shake'
            : 'bg-gradient-to-b from-amber-100/60 to-orange-100/60 border-amber-300'
        }`}
      >
        <span className="text-[11px] font-bold text-amber-900 mb-2 flex items-center gap-1">
          🧺 Keranjang Ejaan ({basketLetters.length} / {word.letters.length} huruf):
        </span>

        <div className="flex items-center justify-center flex-row-reverse gap-2">
          {word.letters.map((_, slotIdx) => {
            const letter = basketLetters[slotIdx];
            return (
              <div
                key={slotIdx}
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center font-arabic text-2xl sm:text-3xl font-black shadow-sm border-2 ${
                  letter
                    ? 'bg-amber-500 text-slate-950 border-amber-300'
                    : 'bg-white/70 border-dashed border-amber-300 text-slate-300'
                }`}
              >
                {letter || '•'}
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Available Letter Bubbles */}
      <div className="pt-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-slate-600">
            Pilih Huruf untuk Keranjang:
          </span>
          <button
            type="button"
            onClick={handleResetRound}
            className="text-[11px] text-amber-800 font-bold hover:underline flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Kocok Ulang</span>
          </button>
        </div>

        <div className="flex items-center justify-center flex-wrap gap-2.5">
          {availableLetters.map((letter, idx) => (
            <motion.button
              key={`${letter}_${idx}`}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => handlePickLetter(letter, idx)}
              className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-white hover:bg-amber-50 text-slate-900 border-2 border-amber-300 shadow-md flex items-center justify-center font-arabic text-2xl sm:text-3xl font-black cursor-pointer active:scale-95 transition-all"
            >
              {letter}
            </motion.button>
          ))}
        </div>
      </div>
    </GameShell>
  );
};
