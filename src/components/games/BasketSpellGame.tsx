import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Award, RotateCcw, ArrowRight, Sparkles, CheckCircle2, Layers } from 'lucide-react';
import { sound } from '../../services/sound';
import { GameStorage } from '../../services/storage';

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
  // Kategori: Sekolah & Belajar
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
    name_ar: 'بَاب',
    translit: 'bāb',
    name_id: 'Pintu gerbang',
    emoji: '🚪',
    letters: ['ب', 'ـا', 'ب'],
    category: 'Sekolah'
  },
  // Kategori: Makanan & Minuman
  {
    id: 'w4',
    name_ar: 'خُبْز',
    translit: 'khubz',
    name_id: 'Roti gandum',
    emoji: '🍞',
    letters: ['خ', 'ـبـ', 'ز'],
    category: 'Makanan'
  },
  {
    id: 'w5',
    name_ar: 'حَلِيب',
    translit: 'ḥalīb',
    name_id: 'Susu murni',
    emoji: '🥛',
    letters: ['ح', 'ـلـ', 'ـيـ', 'ب'],
    category: 'Makanan'
  },
  {
    id: 'w6',
    name_ar: 'تَمْر',
    translit: 'tamr',
    name_id: 'Kurma manis',
    emoji: '🌴',
    letters: ['ت', 'ـمـ', 'ر'],
    category: 'Makanan'
  },
  // Kategori: Fauna & Hewan
  {
    id: 'w7',
    name_ar: 'قِطَّة',
    translit: 'qiṭṭah',
    name_id: 'Kucing manis',
    emoji: '🐱',
    letters: ['ق', 'ـطـ', 'ـة'],
    category: 'Hewan'
  },
  {
    id: 'w8',
    name_ar: 'جَمَل',
    translit: 'jamal',
    name_id: 'Unta gurun',
    emoji: '🐪',
    letters: ['ج', 'ـمـ', 'ـل'],
    category: 'Hewan'
  },
  {
    id: 'w9',
    name_ar: 'سَمَكَة',
    translit: 'samakah',
    name_id: 'Ikan segar',
    emoji: '🐟',
    letters: ['س', 'ـمـ', 'ـكـ', 'ـة'],
    category: 'Hewan'
  },
  // Kategori: Rumah & Tempat
  {
    id: 'w10',
    name_ar: 'بَيْت',
    translit: 'bayt',
    name_id: 'Rumah tinggal',
    emoji: '🏠',
    letters: ['ب', 'ـيـ', 'ـت'],
    category: 'Tempat'
  },
  {
    id: 'w11',
    name_ar: 'مَسْجِد',
    translit: 'masjid',
    name_id: 'Masjid suci',
    emoji: '🕌',
    letters: ['م', 'ـسـ', 'ـجـ', 'ـد'],
    category: 'Tempat'
  }
];

export const BasketSpellGame: React.FC<BasketSpellProps> = ({ onClose, onReward }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [wordIdx, setWordIdx] = useState(0);
  const [placedLetters, setPlacedLetters] = useState<string[]>([]);
  const [availablePool, setAvailablePool] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const categories = ['Semua', 'Sekolah', 'Makanan', 'Hewan', 'Tempat'];

  const filteredWords = selectedCategory === 'Semua'
    ? ALL_SPELL_WORDS
    : ALL_SPELL_WORDS.filter(w => w.category === selectedCategory);

  const word = filteredWords[wordIdx] || filteredWords[0];

  const initWord = (w: SpellWord) => {
    if (!w) return;
    const distractors = ['م', 'ر', 'س', 'ن', 'و', 'د'];
    const extra = distractors[(wordIdx + 1) % distractors.length];
    const pool = [...w.letters, extra];
    pool.sort(() => Math.random() - 0.5);
    setAvailablePool(pool);
    setPlacedLetters([]);
    setIsSuccess(false);
  };

  React.useEffect(() => {
    initWord(word);
  }, [wordIdx, selectedCategory]);

  const handlePickLetter = (letter: string, poolIndex: number) => {
    if (isSuccess || placedLetters.length >= word.letters.length) return;

    sound.speakArabic(letter);
    const newPlaced = [...placedLetters, letter];
    setPlacedLetters(newPlaced);

    const newPool = [...availablePool];
    newPool.splice(poolIndex, 1);
    setAvailablePool(newPool);

    if (newPlaced.length === word.letters.length) {
      const isMatch = newPlaced.join('') === word.letters.join('');
      if (isMatch) {
        sound.playSuccess();
        sound.speakArabic(word.name_ar);
        setIsSuccess(true);
        setScore(s => s + 1);
        GameStorage.addReward(45, 2, 'kitabah', 7);
        onReward(45, 2);
      } else {
        sound.playGentleRetry();
        setTimeout(() => {
          initWord(word);
        }, 800);
      }
    }
  };

  const handleResetSlots = () => {
    initWord(word);
  };

  const handleNextWord = () => {
    if (wordIdx < filteredWords.length - 1) {
      setWordIdx(i => i + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleChangeCategory = (cat: string) => {
    setSelectedCategory(cat);
    setWordIdx(0);
    setIsFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-lg bg-gradient-to-b from-amber-50 to-orange-100 rounded-3xl shadow-2xl border-4 border-amber-300 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20">Pasar Apung Mufradat (MFR)</span>
              <span className="text-xs bg-amber-300 text-amber-950 font-extrabold px-2 py-0.5 rounded-full">Skor: {score}</span>
            </div>
            <h2 className="text-xl font-bold font-chibi flex items-center gap-2 mt-1">
              🧺 Basket Spell (Keranjang Ejaan)
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white font-bold transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Category Filters */}
        <div className="bg-amber-100 px-4 py-2 flex items-center gap-2 overflow-x-auto border-b border-amber-200">
          <span className="text-xs font-bold text-amber-900 flex items-center gap-1 whitespace-nowrap">
            <Layers className="w-3.5 h-3.5" /> Tema:
          </span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => handleChangeCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-white/80 text-amber-900 hover:bg-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="p-4 flex-1 flex flex-col items-center justify-between overflow-y-auto">
          {!isFinished && word ? (
            <>
              {/* Target Word Clue Card */}
              <div className="w-full bg-white rounded-3xl p-4 shadow-sm border border-amber-200 flex flex-col items-center text-center relative overflow-hidden mb-3">
                <div className="text-5xl mb-2 animate-pulse">{word.emoji}</div>
                <h3 className="text-base font-bold text-slate-800">{word.name_id}</h3>
                <span className="text-xs text-amber-700 font-bold bg-amber-50 px-2.5 py-0.5 rounded-full mt-1 border border-amber-200">
                  {word.translit} • ({wordIdx + 1}/{filteredWords.length})
                </span>
                <span className="text-[11px] text-slate-500 mt-1">
                  Kategori: {word.category}
                </span>
              </div>

              {/* Slot Target Letters (RTL) */}
              <div className="w-full bg-amber-50/70 rounded-3xl p-4 border-2 border-amber-200 flex flex-col items-center justify-center mb-3">
                <span className="text-xs font-bold text-amber-900 mb-2">
                  Tempatkan huruf sambung dari kanan ke kiri:
                </span>

                <div className="flex items-center gap-2" dir="rtl">
                  {word.letters.map((_, idx) => {
                    const placed = placedLetters[idx];
                    return (
                      <div
                        key={idx}
                        className={`w-14 h-16 rounded-2xl border-2 flex items-center justify-center text-2xl font-bold font-arabic shadow-sm transition-all ${
                          placed
                            ? isSuccess
                              ? 'bg-emerald-100 border-emerald-500 text-emerald-950 scale-105'
                              : 'bg-white border-amber-400 text-slate-900'
                            : 'bg-white/40 border-dashed border-amber-300 text-transparent'
                        }`}
                      >
                        {placed || '•'}
                      </div>
                    );
                  })}
                </div>

                {isSuccess && (
                  <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300 animate-bounce">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Mumtaz! Ejaan tepat: {word.name_ar}</span>
                  </div>
                )}
              </div>

              {/* Letter Basket (Keranjang Huruf) */}
              <div className="w-full bg-white rounded-3xl p-4 border border-amber-200 shadow-xs mb-3">
                <span className="text-xs font-bold text-slate-700 block mb-2.5">
                  🧺 Ambil huruf dari keranjang:
                </span>

                <div className="flex flex-wrap items-center justify-center gap-2.5" dir="rtl">
                  {availablePool.map((letter, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.08, y: -2 }}
                      whileTap={{ scale: 0.94 }}
                      onClick={() => handlePickLetter(letter, idx)}
                      className="w-12 h-14 rounded-2xl bg-amber-50 hover:bg-amber-100 active:bg-amber-200 border-2 border-amber-300 font-arabic text-2xl font-bold text-amber-950 shadow-xs flex items-center justify-center transition-all"
                    >
                      {letter}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="w-full flex items-center justify-between gap-2 mt-auto">
                <button
                  onClick={handleResetSlots}
                  className="px-4 py-3 rounded-2xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold flex items-center gap-1.5 active:scale-95 transition-all"
                >
                  <RotateCcw className="w-4 h-4" /> Reset
                </button>

                {isSuccess ? (
                  <button
                    onClick={handleNextWord}
                    className="flex-1 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl font-bold text-xs shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    Kata Berikutnya <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => sound.speakArabic(word.name_ar)}
                    className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-2xl font-bold text-xs shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" /> Putar Bunyi Kata
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 my-auto">
              <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mb-3 animate-bounce">
                <Award className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold font-chibi text-slate-800">Keranjang Ejaan Penuh!</h3>
              <p className="text-xs text-slate-600 mt-2 max-w-sm">
                Kamu telah mengeja seluruh kosa kata tema {selectedCategory} dengan sambungan huruf yang sempurna. Trait Kitabah bertambah!
              </p>
              <div className="flex items-center gap-2 mt-4 bg-amber-100 text-amber-900 font-bold px-4 py-2 rounded-2xl text-xs">
                <span>+180 XP</span> • <span>+8 Bintang</span>
              </div>
              <button
                onClick={onClose}
                className="mt-6 w-full max-w-xs py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-2xl shadow-lg active:scale-95 transition-all"
              >
                Selesai & Ambil Reward
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
