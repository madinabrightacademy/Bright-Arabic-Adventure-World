import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Award, Sparkles, RefreshCw, Star, Layers, CheckCircle2 } from 'lucide-react';
import { sound } from '../../services/sound';
import { GameStorage } from '../../services/storage';

interface PearlGardenProps {
  onClose: () => void;
  onReward: (xp: number, stars: number) => void;
}

interface CardItem {
  id: string;
  pairId: string;
  type: 'char' | 'target';
  content: string;
  subContent?: string;
  audioText: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export type PearlStage = 'letters' | 'harakat' | 'connecting' | 'makhraj_pairs';

interface StageConfig {
  id: PearlStage;
  title: string;
  subtitle: string;
  pairs: {
    id: string;
    char: string;
    targetTitle: string;
    targetSub: string;
    audio: string;
  }[];
}

const PEARL_STAGES: StageConfig[] = [
  {
    id: 'letters',
    title: 'Tahap 1: Huruf Hijaiyah',
    subtitle: 'Cocokkan bentuk huruf dengan nama resminya',
    pairs: [
      { id: 'alif', char: 'أ', targetTitle: 'Alif', targetSub: 'أَلِف', audio: 'أَلِف' },
      { id: 'baa', char: 'ب', targetTitle: 'Bāʾ', targetSub: 'بَاء', audio: 'بَاء' },
      { id: 'taa', char: 'ت', targetTitle: 'Tāʾ', targetSub: 'تَاء', audio: 'تَاء' },
      { id: 'tsaa', char: 'ث', targetTitle: 'Tsāʾ', targetSub: 'ثَاء', audio: 'ثَاء' },
      { id: 'jiim', char: 'ج', targetTitle: 'Jīm', targetSub: 'جِيم', audio: 'جِيم' },
      { id: 'haa', char: 'ح', targetTitle: 'Ḥāʾ', targetSub: 'حَاء', audio: 'حَاء' },
    ]
  },
  {
    id: 'harakat',
    title: 'Tahap 2: Harakat Vokal',
    subtitle: 'Cocokkan huruf berharakat dengan bunyi vokal',
    pairs: [
      { id: 'ba_fathah', char: 'بَ', targetTitle: 'Ba (Fathah)', targetSub: 'Vokal a', audio: 'بَ' },
      { id: 'ba_kasrah', char: 'بِ', targetTitle: 'Bi (Kasrah)', targetSub: 'Vokal i', audio: 'بِ' },
      { id: 'ba_dhammah', char: 'بُ', targetTitle: 'Bu (Dhammah)', targetSub: 'Vokal u', audio: 'بُ' },
      { id: 'ta_fathah', char: 'تَ', targetTitle: 'Ta (Fathah)', targetSub: 'Vokal a', audio: 'تَ' },
      { id: 'ta_kasrah', char: 'تِ', targetTitle: 'Ti (Kasrah)', targetSub: 'Vokal i', audio: 'تِ' },
      { id: 'ta_dhammah', char: 'تُ', targetTitle: 'Tu (Dhammah)', targetSub: 'Vokal u', audio: 'تُ' },
    ]
  },
  {
    id: 'connecting',
    title: 'Tahap 3: Bentuk Sambung',
    subtitle: 'Cocokkan potongan awal/tengah/akhir dengan huruf tunggal',
    pairs: [
      { id: 'conn_ba_awal', char: 'بـ', targetTitle: 'Ba Awal', targetSub: 'Menyambung ke kiri', audio: 'بَاء' },
      { id: 'conn_ba_tengah', char: 'ـبـ', targetTitle: 'Ba Tengah', targetSub: 'Menyambung 2 arah', audio: 'بَاء' },
      { id: 'conn_ba_akhir', char: 'ـب', targetTitle: 'Ba Akhir', targetSub: 'Menyambung dari kanan', audio: 'بَاء' },
      { id: 'conn_jim_awal', char: 'جـ', targetTitle: 'Jim Awal', targetSub: 'Alis mahkota awal', audio: 'جِيم' },
      { id: 'conn_mim_awal', char: 'مـ', targetTitle: 'Mim Awal', targetSub: 'Kepala bulat awal', audio: 'مِيم' },
      { id: 'conn_alif_putus', char: 'ا', targetTitle: 'Alif Lepas', targetSub: 'Pemutus sambungan kiri', audio: 'أَلِف' },
    ]
  },
  {
    id: 'makhraj_pairs',
    title: 'Tahap 4: Kontras Makhraj',
    subtitle: 'Cocokkan pasangan huruf mirip dengan makhrajnya',
    pairs: [
      { id: 'p_sad_sin', char: 'ص', targetTitle: 'Ṣād (Tebal)', targetSub: 'Lidah naik / Ithbaq', audio: 'صَاد' },
      { id: 'p_sin_sad', char: 'س', targetTitle: 'Sīn (Tipis)', targetSub: 'Desis datar / Infitah', audio: 'سِين' },
      { id: 'p_tha_ta', char: 'ط', targetTitle: 'Ṭāʾ (Kuat)', targetSub: 'Letupan tebal gusi atas', audio: 'طَاء' },
      { id: 'p_ta_tha', char: 'ت', targetTitle: 'Tāʾ (Halus)', targetSub: 'Hembusan tipis / Hams', audio: 'تَاء' },
      { id: 'p_qaf_kaf', char: 'ق', targetTitle: 'Qāf (Pangkal)', targetSub: 'Langit-langit lunak', audio: 'قَاف' },
      { id: 'p_kaf_qaf', char: 'ك', targetTitle: 'Kāf (Desis)', targetSub: 'Langit-langit keras', audio: 'كَاف' },
    ]
  }
];

export const PearlGardenGame: React.FC<PearlGardenProps> = ({ onClose, onReward }) => {
  const [activeStage, setActiveStage] = useState<PearlStage>('letters');
  const [cards, setCards] = useState<CardItem[]>([]);
  const [selectedCards, setSelectedCards] = useState<CardItem[]>([]);
  const [isLocked, setIsLocked] = useState(false);
  const [matchedCount, setMatchedCount] = useState(0);
  const [movesCount, setMovesCount] = useState(0);

  const stageConfig = PEARL_STAGES.find(s => s.id === activeStage) || PEARL_STAGES[0];

  const initGame = (stage = activeStage) => {
    const config = PEARL_STAGES.find(s => s.id === stage) || PEARL_STAGES[0];
    const deck: CardItem[] = [];

    // Use 6 pairs (12 cards) for balanced engagement
    config.pairs.forEach(pair => {
      deck.push({
        id: `${pair.id}_char`,
        pairId: pair.id,
        type: 'char',
        content: pair.char,
        audioText: pair.audio,
        isFlipped: false,
        isMatched: false
      });
      deck.push({
        id: `${pair.id}_target`,
        pairId: pair.id,
        type: 'target',
        content: pair.targetTitle,
        subContent: pair.targetSub,
        audioText: pair.audio,
        isFlipped: false,
        isMatched: false
      });
    });

    // Shuffle deck
    deck.sort(() => Math.random() - 0.5);
    setCards(deck);
    setSelectedCards([]);
    setIsLocked(false);
    setMatchedCount(0);
    setMovesCount(0);
  };

  useEffect(() => {
    initGame(activeStage);
  }, [activeStage]);

  const handleCardClick = (card: CardItem) => {
    if (isLocked || card.isFlipped || card.isMatched) return;

    sound.speakArabic(card.audioText);

    const updated = cards.map(c => c.id === card.id ? { ...c, isFlipped: true } : c);
    setCards(updated);

    const newSelected = [...selectedCards, card];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      setIsLocked(true);
      setMovesCount(m => m + 1);
      const [first, second] = newSelected;

      if (first.pairId === second.pairId) {
        // Matched!
        sound.playSparkle();
        setTimeout(() => {
          setCards(prev => prev.map(c => c.pairId === first.pairId ? { ...c, isMatched: true } : c));
          setSelectedCards([]);
          setIsLocked(false);
          setMatchedCount(prev => {
            const next = prev + 1;
            if (next === stageConfig.pairs.length) {
              sound.playSuccess();
              GameStorage.addReward(60, 3, 'qiraah', 8);
              onReward(60, 3);
            }
            return next;
          });
        }, 500);
      } else {
        // Not matched
        sound.playGentleRetry();
        setTimeout(() => {
          setCards(prev => prev.map(c => (c.id === first.id || c.id === second.id) ? { ...c, isFlipped: false } : c));
          setSelectedCards([]);
          setIsLocked(false);
        }, 1000);
      }
    }
  };

  const isAllMatched = matchedCount === stageConfig.pairs.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/75 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        className="w-full max-w-lg bg-teal-50 rounded-[32px] shadow-2xl border-4 border-teal-400 overflow-hidden flex flex-col max-h-[95vh]"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-700 via-cyan-700 to-teal-800 text-white p-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-white/20 uppercase tracking-wider">
                Pulau Huruf (HRF)
              </span>
              <span className="text-[10px] bg-teal-300 text-teal-950 font-extrabold px-2 py-0.5 rounded-full">
                Mutiara Terbuka: {matchedCount}/{stageConfig.pairs.length}
              </span>
              <span className="text-[10px] bg-white/20 text-teal-100 font-bold px-2 py-0.5 rounded-full">
                Langkah: {movesCount}
              </span>
            </div>
            <h2 className="text-lg font-black font-chibi flex items-center gap-1.5 mt-1">
              🦪 Pearl Garden (Taman Mutiara Kerang)
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white font-bold transition-colors active:scale-95"
          >
            ✕
          </button>
        </div>

        {/* Stage Selector Tabs */}
        <div className="bg-teal-100/70 p-2 border-b border-teal-200">
          <div className="grid grid-cols-4 gap-1 text-[11px] font-bold">
            {PEARL_STAGES.map((stg) => {
              const isSelected = activeStage === stg.id;
              return (
                <button
                  key={stg.id}
                  onClick={() => setActiveStage(stg.id)}
                  className={`py-1.5 px-1 rounded-xl text-center transition-all ${
                    isSelected
                      ? 'bg-teal-700 text-white shadow-xs font-black'
                      : 'bg-white/70 text-slate-700 hover:bg-white'
                  }`}
                >
                  <span className="block truncate">{stg.title.split(':')[1] || stg.title}</span>
                </button>
              );
            })}
          </div>
          <p className="text-[11px] text-teal-900 text-center font-semibold mt-1">
            {stageConfig.subtitle}
          </p>
        </div>

        {/* Content & Cards Grid */}
        <div className="p-4 flex-1 flex flex-col items-center overflow-y-auto">
          {/* Cards Grid: 12 cards (3x4 or 4x3) */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 w-full flex-1 max-w-md my-auto py-2">
            {cards.map((card) => {
              const showFace = card.isFlipped || card.isMatched;

              return (
                <motion.button
                  key={card.id}
                  onClick={() => handleCardClick(card)}
                  whileHover={{ scale: card.isMatched ? 1 : 1.04 }}
                  whileTap={{ scale: 0.95 }}
                  className={`aspect-square rounded-2xl flex flex-col items-center justify-center p-2 text-center transition-all shadow-md relative overflow-hidden ${
                    card.isMatched
                      ? 'bg-gradient-to-br from-teal-400 to-emerald-500 text-white border-2 border-emerald-300 shadow-teal-300'
                      : showFace
                      ? 'bg-white border-2 border-teal-500 text-slate-900 shadow-teal-100'
                      : 'bg-gradient-to-br from-teal-600 to-cyan-700 text-white border-2 border-teal-400 cursor-pointer shadow-teal-700/30'
                  }`}
                >
                  {showFace ? (
                    <div className="p-1">
                      {card.type === 'char' ? (
                        <span className="font-arabic text-3xl font-bold block leading-none text-teal-950">
                          {card.content}
                        </span>
                      ) : (
                        <div>
                          <span className="text-xs font-black block leading-tight text-slate-900">
                            {card.content}
                          </span>
                          {card.subContent && (
                            <span className="text-[10px] text-teal-800 font-bold block mt-0.5 line-clamp-1">
                              {card.subContent}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center select-none">
                      <span className="text-2xl drop-shadow-xs">🦪</span>
                      <Sparkles className="w-3 h-3 text-teal-200 mt-0.5" />
                    </div>
                  )}

                  {card.isMatched && (
                    <div className="absolute top-1 right-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-white fill-emerald-600" />
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Victory Modal Overlay */}
          {isAllMatched ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full bg-emerald-50 border-2 border-emerald-400 rounded-3xl p-4 text-center mt-3 shadow-lg"
            >
              <div className="flex justify-center gap-1 mb-1">
                <Star className="w-6 h-6 text-amber-400 fill-amber-400 animate-bounce" />
                <Star className="w-6 h-6 text-amber-400 fill-amber-400 animate-bounce delay-75" />
                <Star className="w-6 h-6 text-amber-400 fill-amber-400 animate-bounce delay-150" />
              </div>
              <h4 className="text-base font-black text-emerald-950 font-chibi">
                🎉 Mutiara Terbuka Sempurna!
              </h4>
              <p className="text-xs text-emerald-800 mt-0.5">
                Kamu menyelesaikan {stageConfig.title} dalam {movesCount} langkah!
              </p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => initGame(activeStage)}
                  className="flex-1 py-2 rounded-xl bg-teal-100 hover:bg-teal-200 text-teal-900 text-xs font-bold transition-colors"
                >
                  Ulangi Tahap Ini
                </button>
                <button
                  onClick={() => {
                    // Advance to next stage
                    const idx = PEARL_STAGES.findIndex(s => s.id === activeStage);
                    if (idx < PEARL_STAGES.length - 1) {
                      setActiveStage(PEARL_STAGES[idx + 1].id);
                    } else {
                      onClose();
                    }
                  }}
                  className="flex-1 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-md transition-colors"
                >
                  Tahap Berikutnya ➔
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="w-full flex justify-between items-center mt-3 pt-2 border-t border-teal-200/60">
              <button
                onClick={() => initGame(activeStage)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-teal-100 text-teal-800 text-xs font-bold border border-teal-200 shadow-xs transition-all active:scale-95"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Acak Kerang
              </button>
              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs transition-all active:scale-95"
              >
                Kembali
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
