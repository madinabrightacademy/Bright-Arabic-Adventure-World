import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Award, Sparkles, RefreshCw, Star, Layers, CheckCircle2 } from 'lucide-react';
import { sound } from '../../services/sound';
import { GameStorage } from '../../services/storage';
import { GameShell, GameFlowState } from './GameShell';

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
    title: 'Tahap 1: Huruf Hijaiah',
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
      { id: 'conn_ba_awal', char: 'بـ', targetTitle: 'Ba Awal', targetSub: 'Menyambung kiri', audio: 'بَاء' },
      { id: 'conn_ba_tengah', char: 'ـبـ', targetTitle: 'Ba Tengah', targetSub: 'Menyambung 2 arah', audio: 'بَاء' },
      { id: 'conn_ba_akhir', char: 'ـب', targetTitle: 'Ba Akhir', targetSub: 'Menyambung kanan', audio: 'بَاء' },
      { id: 'conn_jim_awal', char: 'جـ', targetTitle: 'Jim Awal', targetSub: 'Alis mahkota', audio: 'جِيم' },
      { id: 'conn_mim_awal', char: 'مـ', targetTitle: 'Mim Awal', targetSub: 'Kepala bulat', audio: 'مِيم' },
      { id: 'conn_alif_putus', char: 'ا', targetTitle: 'Alif Lepas', targetSub: 'Pemutus kiri', audio: 'أَلِف' },
    ]
  },
  {
    id: 'makhraj_pairs',
    title: 'Tahap 4: Kontras Makhraj',
    subtitle: 'Cocokkan pasangan huruf dengan makhrajnya',
    pairs: [
      { id: 'p_sad_sin', char: 'ص', targetTitle: 'Ṣād (Tebal)', targetSub: 'Lidah naik / Ithbaq', audio: 'صَاد' },
      { id: 'p_sin_sad', char: 'س', targetTitle: 'Sīn (Tipis)', targetSub: 'Desis datar / Infitah', audio: 'سِين' },
      { id: 'p_tha_ta', char: 'ط', targetTitle: 'Ṭāʾ (Kuat)', targetSub: 'Letupan tebal gusi', audio: 'طَاء' },
      { id: 'p_ta_tha', char: 'ت', targetTitle: 'Tāʾ (Halus)', targetSub: 'Hembusan tipis / Hams', audio: 'تَاء' },
      { id: 'p_qaf_kaf', char: 'ق', targetTitle: 'Qāf (Pangkal)', targetSub: 'Langit-langit lunak', audio: 'قَاف' },
      { id: 'p_kaf_qaf', char: 'ك', targetTitle: 'Kāf (Desis)', targetSub: 'Langit-langit keras', audio: 'كَاف' },
    ]
  }
];

export const PearlGardenGame: React.FC<PearlGardenProps> = ({ onClose, onReward }) => {
  const [flowState, setFlowState] = useState<GameFlowState>('BRIEFING');
  const [activeStage, setActiveStage] = useState<PearlStage>('letters');
  const [cards, setCards] = useState<CardItem[]>([]);
  const [selectedCards, setSelectedCards] = useState<CardItem[]>([]);
  const [isLocked, setIsLocked] = useState(false);
  const [matchedCount, setMatchedCount] = useState(0);
  const [movesCount, setMovesCount] = useState(0);
  const [mascotMood, setMascotMood] = useState<'happy' | 'cheer' | 'thinking' | 'celebrate'>('happy');
  const [mascotComment, setMascotComment] = useState('Buka tiram mutiara dan temukan pasangannya!');

  const stageConfig = PEARL_STAGES.find(s => s.id === activeStage) || PEARL_STAGES[0];

  const initGame = (stage = activeStage) => {
    const config = PEARL_STAGES.find(s => s.id === stage) || PEARL_STAGES[0];
    const deck: CardItem[] = [];

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

    // Shuffle cards
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    setCards(deck);
    setSelectedCards([]);
    setIsLocked(false);
    setMatchedCount(0);
    setMovesCount(0);
  };

  useEffect(() => {
    if (flowState === 'PLAYING') {
      initGame(activeStage);
    }
  }, [activeStage, flowState]);

  const handleCardClick = (card: CardItem) => {
    if (isLocked || card.isFlipped || card.isMatched) return;

    sound.playTap();
    if (card.audioText) sound.speakArabic(card.audioText);

    const updated = cards.map(c => (c.id === card.id ? { ...c, isFlipped: true } : c));
    setCards(updated);

    const nextSelected = [...selectedCards, card];
    setSelectedCards(nextSelected);

    if (nextSelected.length === 2) {
      setIsLocked(true);
      setMovesCount(m => m + 1);

      const [first, second] = nextSelected;
      if (first.pairId === second.pairId && first.id !== second.id) {
        sound.playSuccess();
        setMascotMood('celebrate');
        setMascotComment(`Mumtaz! Mutiara ${first.audioText} serasi sempurna!`);

        setTimeout(() => {
          setCards(prev =>
            prev.map(c => (c.pairId === first.pairId ? { ...c, isMatched: true } : c))
          );
          setSelectedCards([]);
          setIsLocked(false);
          const newMatched = matchedCount + 1;
          setMatchedCount(newMatched);

          if (newMatched >= stageConfig.pairs.length) {
            GameStorage.addReward(50, 2, 'qiraah', 8);
            onReward(50, 2);
            setTimeout(() => {
              setFlowState('VICTORY');
            }, 1000);
          }
        }, 600);
      } else {
        sound.playGentleRetry();
        setMascotMood('thinking');
        setMascotComment('Belum cocok! Coba ingat letak mutiara sebelumnya.');
        setTimeout(() => {
          setCards(prev =>
            prev.map(c => (c.id === first.id || c.id === second.id ? { ...c, isFlipped: false } : c))
          );
          setSelectedCards([]);
          setIsLocked(false);
        }, 900);
      }
    }
  };

  return (
    <GameShell
      title="Taman Mutiara Huruf & Fonik"
      titleAr="حَدِيقَةُ لُؤْلُؤِ الحُرُوفِ"
      islandName="Pulau Huruf"
      islandColor="from-teal-600 via-cyan-600 to-emerald-700"
      gameIcon="🦪"
      targetObjective="Buka tiram mutiara laut dan pasangkan lambang huruf dengan bunyi fonetiknya"
      howToPlay={[
        { icon: '🦪', text: 'Buka sepasang cangkang tiram untuk melihat isi huruf atau namanya.' },
        { icon: '✨', text: 'Cocokkan huruf Arab dengan nama resmi atau bentuk harakatnya.' },
        { icon: '💎', text: 'Kumpulkan semua 6 pasang mutiara laut untuk menuntaskan taman!' }
      ]}
      speechArabic="اِفْتَحْ مَحَارَ اللُّؤْلُؤِ وَاكْتَشِفِ الحُرُوفَ!"
      speechIntro="Mari menyelam ke dasar laut Pulau Huruf membuka mutiara ilmu!"
      flowState={flowState}
      onStartGame={() => {
        setFlowState('PLAYING');
        initGame(activeStage);
      }}
      onPlayAgain={() => {
        setFlowState('PLAYING');
        initGame(activeStage);
      }}
      onClose={onClose}
      currentRound={matchedCount + 1}
      totalRounds={stageConfig.pairs.length}
      score={matchedCount}
      maxScore={stageConfig.pairs.length}
      starsEarned={movesCount <= stageConfig.pairs.length + 3 ? 3 : 2}
      xpEarned={stageConfig.pairs.length * 40}
      mascotMood={mascotMood}
      mascotComment={mascotComment}
      mascotArabic="لُؤْلُؤٌ"
      victorySummary={[
        { label: 'Pasangan Ditemukan', value: `${matchedCount} Pasang` },
        { label: 'Total Langkah', value: `${movesCount} Kali Balik` },
        { label: 'Tahap Selesai', value: stageConfig.title },
        { label: 'Ketelitian Ingatan', value: '⭐⭐⭐ Tajam' }
      ]}
    >
      {/* Stage Selector Pills */}
      <div className="flex items-center gap-1 pb-2 mb-2 border-b border-teal-200/80 overflow-x-auto text-xs">
        {PEARL_STAGES.map(stg => (
          <button
            key={stg.id}
            onClick={() => {
              sound.playPop();
              setActiveStage(stg.id);
            }}
            className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeStage === stg.id
                ? 'bg-teal-600 text-white font-black shadow-xs ring-1 ring-teal-400'
                : 'bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-200'
            }`}
          >
            {stg.title.split(':')[1] || stg.title}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 my-auto">
        {cards.map(card => {
          const showContent = card.isFlipped || card.isMatched;

          return (
            <motion.button
              key={card.id}
              whileHover={{ scale: card.isMatched ? 1 : 1.03 }}
              whileTap={{ scale: card.isMatched ? 1 : 0.96 }}
              onClick={() => handleCardClick(card)}
              disabled={card.isMatched || isLocked}
              className={`h-24 sm:h-28 rounded-2xl p-2 transition-all flex flex-col items-center justify-center relative cursor-pointer border-2 ${
                card.isMatched
                  ? 'bg-emerald-100 border-emerald-300 opacity-90'
                  : showContent
                  ? 'bg-white border-teal-400 shadow-md ring-2 ring-teal-200'
                  : 'bg-gradient-to-br from-teal-500 via-cyan-600 to-teal-700 border-teal-300 text-white shadow-xs'
              }`}
            >
              {showContent ? (
                card.type === 'char' ? (
                  <span className="font-arabic text-3xl sm:text-4xl font-black text-teal-900 leading-none">
                    {card.content}
                  </span>
                ) : (
                  <div className="text-center">
                    <span className="text-xs sm:text-sm font-black text-slate-800 block leading-tight">
                      {card.content}
                    </span>
                    {card.subContent && (
                      <span className="text-[10px] text-teal-700 font-semibold block mt-0.5">
                        {card.subContent}
                      </span>
                    )}
                  </div>
                )
              ) : (
                <div className="flex flex-col items-center text-teal-100">
                  <span className="text-2xl sm:text-3xl">🦪</span>
                  <span className="text-[10px] font-bold mt-1 text-teal-100">Tiram</span>
                </div>
              )}
            </motion.button>
          );
        })}
      </div>
    </GameShell>
  );
};
