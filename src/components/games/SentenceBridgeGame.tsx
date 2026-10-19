import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Award, ArrowRight, RotateCcw, CheckCircle2, Sparkles, BookOpen, Layers } from 'lucide-react';
import { sound } from '../../services/sound';
import { GameStorage } from '../../services/storage';
import { GameShell, GameFlowState } from './GameShell';

interface SentenceBridgeProps {
  onClose: () => void;
  onReward: (xp: number, stars: number) => void;
}

interface BridgeLevel {
  id: string;
  theme: string;
  levelBadge: string;
  targetTranslation: string;
  correctBlocks: { ar: string; translit: string; gender: 'm' | 'f' | 'neutral' }[];
  scrambledBlocks: { id: string; ar: string; translit: string; gender: 'm' | 'f' | 'neutral' }[];
  explanation: string;
  rulePoint: string;
}

const BRIDGE_LEVELS: BridgeLevel[] = [
  {
    id: 'lvl1',
    theme: 'Isim Isyarah & Sifat (Mudzakkar)',
    levelBadge: 'Tingkat 1 - Dasar',
    targetTranslation: 'Ini sebuah buku yang besar.',
    correctBlocks: [
      { ar: 'هٰذَا', translit: 'hādhā', gender: 'm' },
      { ar: 'كِتَابٌ', translit: 'kitābun', gender: 'm' },
      { ar: 'كَبِيرٌ', translit: 'kabīrun', gender: 'm' }
    ],
    scrambledBlocks: [
      { id: 'b2', ar: 'كِتَابٌ', translit: 'kitābun', gender: 'm' },
      { id: 'b1', ar: 'هٰذَا', translit: 'hādhā', gender: 'm' },
      { id: 'b3', ar: 'كَبِيرٌ', translit: 'kabīrun', gender: 'm' },
      { id: 'b4_dummy', ar: 'هٰذِهِ', translit: 'hādhihi', gender: 'f' },
    ],
    rulePoint: 'Kesesuaian Mudzakkar',
    explanation: 'كِتَابٌ adalah kata benda maskulin (mudzakkar), maka kata tunjuknya memakai هٰذَا dan sifatnya كَبِيرٌ.'
  },
  {
    id: 'lvl2',
    theme: 'Isim Isyarah & Sifat (Muannats)',
    levelBadge: 'Tingkat 1 - Gender',
    targetTranslation: 'Ini seekor ikan yang besar.',
    correctBlocks: [
      { ar: 'هٰذِهِ', translit: 'hādhihi', gender: 'f' },
      { ar: 'سَمَكَةٌ', translit: 'samakatun', gender: 'f' },
      { ar: 'كَبِيرَةٌ', translit: 'kabīratun', gender: 'f' }
    ],
    scrambledBlocks: [
      { id: 'b2', ar: 'سَمَكَةٌ', translit: 'samakatun', gender: 'f' },
      { id: 'b1', ar: 'هٰذِهِ', translit: 'hādhihi', gender: 'f' },
      { id: 'b3', ar: 'كَبِيرَةٌ', translit: 'kabīratun', gender: 'f' },
      { id: 'b4_dummy', ar: 'كَبِيرٌ', translit: 'kabīrun', gender: 'm' },
    ],
    rulePoint: 'Tanda Ta\' Marbuthah (ـة)',
    explanation: 'سَمَكَةٌ berakhiran Ta Marbuthah sehingga feminin, kata tunjuknya memakai هٰذِهِ dan sifatnya كَبِيرَةٌ.'
  },
  {
    id: 'lvl3',
    theme: 'Huruf Jar & Isim Majrur',
    levelBadge: 'Tingkat 2 - Preposisi',
    targetTranslation: 'Anak laki-laki itu ada di dalam masjid.',
    correctBlocks: [
      { ar: 'الوَلَدُ', translit: 'al-waladu', gender: 'm' },
      { ar: 'فِي', translit: 'fī', gender: 'neutral' },
      { ar: 'المَسْجِدِ', translit: 'al-masjidi', gender: 'm' }
    ],
    scrambledBlocks: [
      { id: 'b3_1', ar: 'المَسْجِدِ', translit: 'al-masjidi', gender: 'm' },
      { id: 'b3_2', ar: 'الوَلَدُ', translit: 'al-waladu', gender: 'm' },
      { id: 'b3_3', ar: 'فِي', translit: 'fī', gender: 'neutral' },
      { id: 'b3_4_dummy', ar: 'عَلَى', translit: 'ʿalā', gender: 'neutral' },
    ],
    rulePoint: 'I\'rab Majrur bi-Kasrah',
    explanation: 'Huruf jar فِي membuat isim sesudahnya menjadi majrur dengan kasrah: المَسْجِدِ.'
  },
  {
    id: 'lvl4',
    theme: 'Frasa Kepemilikan (Idhafah)',
    levelBadge: 'Tingkat 2 - Mudhaf',
    targetTranslation: 'Buku milik murid itu baru.',
    correctBlocks: [
      { ar: 'كِتَابُ', translit: 'kitābu', gender: 'm' },
      { ar: 'الطَّالِبِ', translit: 'aṭ-ṭālibi', gender: 'm' },
      { ar: 'جَدِيدٌ', translit: 'jadīdun', gender: 'm' }
    ],
    scrambledBlocks: [
      { id: 'b4_1', ar: 'الطَّالِبِ', translit: 'aṭ-ṭālibi', gender: 'm' },
      { id: 'b4_2', ar: 'جَدِيدٌ', translit: 'jadīdun', gender: 'm' },
      { id: 'b4_3', ar: 'كِتَابُ', translit: 'kitābu', gender: 'm' },
      { id: 'b4_4_dummy', ar: 'قَدِيمٌ', translit: 'qadīmun', gender: 'm' },
    ],
    rulePoint: 'Mudhaf tanpa Tanwin',
    explanation: 'Mudhaf (كِتَابُ) tidak bertanwin dan tidak ber-alif lam, mudhaf ilaih (الطَّالِبِ) berharakat kasrah.'
  },
  {
    id: 'lvl5',
    theme: 'Jumlah Fi\'liyyah & Objek Maf\'ul Bih',
    levelBadge: 'Tingkat 3 - Fi\'il & Fā\'il',
    targetTranslation: 'Zaid telah membaca Al-Qur\'an.',
    correctBlocks: [
      { ar: 'قَرَأَ', translit: 'qaraʾa', gender: 'm' },
      { ar: 'زَيْدٌ', translit: 'zaydun', gender: 'm' },
      { ar: 'القُرْآنَ', translit: 'al-qurʾāna', gender: 'm' }
    ],
    scrambledBlocks: [
      { id: 'b5_1', ar: 'القُرْآنَ', translit: 'al-qurʾāna', gender: 'm' },
      { id: 'b5_2', ar: 'قَرَأَ', translit: 'qaraʾa', gender: 'm' },
      { id: 'b5_3', ar: 'زَيْدٌ', translit: 'zaydun', gender: 'm' },
      { id: 'b5_4_dummy', ar: 'شَرِبَ', translit: 'syariba', gender: 'm' },
    ],
    rulePoint: 'Maf\'ul Bih Manshub',
    explanation: 'Diawali fi\'il madhi قَرَأَ, pelaku fā\'il marfu\' زَيْدٌ, dan maf\'ul bih manshub berfathah القُرْآنَ.'
  }
];

export const SentenceBridgeGame: React.FC<SentenceBridgeProps> = ({ onClose, onReward }) => {
  const [flowState, setFlowState] = useState<GameFlowState>('BRIEFING');
  const [levelIdx, setLevelIdx] = useState(0);
  const [placedBlockIds, setPlacedBlockIds] = useState<string[]>([]);
  const [isCrossed, setIsCrossed] = useState(false);
  const [wrongAttempt, setWrongAttempt] = useState(false);
  const [mascotMood, setMascotMood] = useState<'happy' | 'cheer' | 'thinking' | 'celebrate'>('happy');
  const [mascotComment, setMascotComment] = useState('Susun balok kalimat di atas jembatan batu!');

  const level = BRIDGE_LEVELS[levelIdx];

  const handleSelectBlock = (blockId: string) => {
    sound.playTap();
    if (placedBlockIds.includes(blockId)) {
      setPlacedBlockIds(prev => prev.filter(id => id !== blockId));
    } else {
      if (placedBlockIds.length < level.correctBlocks.length) {
        setPlacedBlockIds(prev => [...prev, blockId]);
      }
    }
  };

  const handleSpeakSentence = () => {
    const sentence = level.correctBlocks.map(b => b.ar).join(' ');
    sound.speakArabic(sentence);
  };

  const handleTestBridge = () => {
    const placedBlocks = placedBlockIds.map(id => level.scrambledBlocks.find(b => b.id === id)!);
    const isExact =
      placedBlocks.length === level.correctBlocks.length &&
      placedBlocks.every((b, idx) => b.ar === level.correctBlocks[idx].ar);

    if (isExact) {
      sound.playSuccess();
      const sentence = level.correctBlocks.map(b => b.ar).join(' ');
      sound.speakArabic(sentence);
      setIsCrossed(true);
      setMascotMood('celebrate');
      setMascotComment('Mumtaz! Jembatan kokoh terhubung sempurna!');

      setTimeout(() => {
        if (levelIdx < BRIDGE_LEVELS.length - 1) {
          setIsCrossed(false);
          setPlacedBlockIds([]);
          setLevelIdx(prev => prev + 1);
          setMascotMood('happy');
          setMascotComment('Ngarai baru menanti susunan jembatanmu!');
        } else {
          setFlowState('VICTORY');
        }
      }, 1600);
    } else {
      sound.playGentleRetry();
      setWrongAttempt(true);
      setMascotMood('thinking');
      setMascotComment('Urutan kata belum kokoh! Periksa Mubtada-Khabar atau Fi\'il-Fa\'il.');
      setTimeout(() => setWrongAttempt(false), 800);
    }
  };

  return (
    <GameShell
      title="Jembatan Kalimat Qawaid"
      titleAr="جِسْرُ الجُمَلِ وَالقَوَاعِدِ"
      islandName="Pulau Qawaid"
      islandColor="from-blue-600 via-indigo-600 to-indigo-800"
      gameIcon="⛰️"
      targetObjective="Susun balok-balok kata bahasa Arab menjadi kalimat berfaidah sempurna untuk menyeberangi jurang pulau"
      howToPlay={[
        { icon: '📝', text: 'Baca arti terjemahan kalimat bahasa Indonesia yang dituju.' },
        { icon: '🧱', text: 'Ketuk balok kata Arab yang terserak untuk memasangnya di fondasi jembatan.' },
        { icon: '🌉', text: 'Tekan "Uji Jembatan" untuk memastikan kebenaran susunan kaidah Nahwu!' }
      ]}
      speechArabic="اِبْنِ الجِسْرَ بِكَلِمَاتِ القَوَاعِدِ!"
      speechIntro="Mari menyusun balok kata menjadi jembatan ilmu di tebing Pulau Qawaid!"
      flowState={flowState}
      onStartGame={() => {
        setFlowState('PLAYING');
        setLevelIdx(0);
        setPlacedBlockIds([]);
        setIsCrossed(false);
      }}
      onPlayAgain={() => {
        setFlowState('PLAYING');
        setLevelIdx(0);
        setPlacedBlockIds([]);
        setIsCrossed(false);
      }}
      onClose={onClose}
      currentRound={levelIdx + 1}
      totalRounds={BRIDGE_LEVELS.length}
      score={levelIdx + 1}
      maxScore={BRIDGE_LEVELS.length}
      starsEarned={3}
      xpEarned={BRIDGE_LEVELS.length * 50}
      mascotMood={mascotMood}
      mascotComment={mascotComment}
      mascotArabic={level.correctBlocks[0]?.ar}
      onPlayTitleAudio={handleSpeakSentence}
      victorySummary={[
        { label: 'Jembatan Tuntas', value: `${BRIDGE_LEVELS.length} Ngarai` },
        { label: 'Kaidah Dipelajari', value: 'Isyarah, Idhafah, Jar' },
        { label: 'Tingkat Nahwu', value: 'Jumlah Mufidah' },
        { label: 'Kekokohan Jembatan', value: '⭐⭐⭐ Sempurna' }
      ]}
    >
      {/* Target Translation Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-indigo-200 rounded-2xl p-3 sm:p-4 mb-3 text-center shadow-xs">
        <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-full inline-block mb-1">
          {level.levelBadge} • {level.theme}
        </span>
        <h3 className="text-sm sm:text-base font-black text-slate-800">
          "{level.targetTranslation}"
        </h3>
        <p className="text-[11px] text-indigo-600 font-semibold mt-0.5">
          {level.rulePoint}
        </p>
      </div>

      {/* Bridge Foundation Deck (Placed Blocks) */}
      <div
        className={`min-h-[85px] p-3 rounded-2xl border-3 border-dashed transition-all flex items-center justify-center flex-wrap gap-2.5 my-auto ${
          isCrossed
            ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-300'
            : wrongAttempt
            ? 'bg-rose-50 border-rose-400'
            : 'bg-slate-50 border-indigo-200'
        }`}
      >
        {placedBlockIds.length === 0 ? (
          <span className="text-xs text-slate-400 font-medium italic">
            Ketuk balok di bawah untuk meletakkannya di jembatan...
          </span>
        ) : (
          placedBlockIds.map((blockId, idx) => {
            const block = level.scrambledBlocks.find(b => b.id === blockId)!;
            return (
              <motion.button
                key={blockId}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={() => handleSelectBlock(blockId)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white font-arabic text-xl sm:text-2xl font-black shadow-md cursor-pointer border-2 border-indigo-300 hover:bg-indigo-700 flex flex-col items-center leading-none"
              >
                <span>{block.ar}</span>
                <span className="text-[10px] font-sans font-normal text-indigo-100 mt-1">
                  {block.translit}
                </span>
              </motion.button>
            );
          })
        )}
      </div>

      {/* Available Scrambled Blocks */}
      <div className="pt-3">
        <span className="text-[11px] font-bold text-slate-500 block mb-2">
          Pilihan Balok Kata Tersedia:
        </span>
        <div className="flex items-center justify-center flex-wrap gap-2">
          {level.scrambledBlocks.map(block => {
            const isUsed = placedBlockIds.includes(block.id);
            return (
              <button
                key={block.id}
                disabled={isUsed}
                onClick={() => handleSelectBlock(block.id)}
                className={`px-3.5 py-2 rounded-xl border-2 transition-all cursor-pointer flex flex-col items-center leading-tight ${
                  isUsed
                    ? 'bg-slate-100 text-slate-300 border-slate-200 opacity-40 cursor-not-allowed'
                    : 'bg-white hover:bg-indigo-50 text-slate-800 border-indigo-200 shadow-xs hover:border-indigo-400 hover:scale-102'
                }`}
              >
                <span className="font-arabic text-lg sm:text-xl font-black text-slate-800">
                  {block.ar}
                </span>
                <span className="text-[10px] text-slate-500">{block.translit}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bridge Bottom Action Button */}
      <div className="pt-3 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => {
            sound.playPop();
            setPlacedBlockIds([]);
          }}
          className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all"
        >
          Reset Susunan
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSpeakSentence}
            className="p-2 rounded-xl bg-indigo-100 hover:bg-indigo-200 text-indigo-900 transition-colors"
            title="Dengarkan Contoh Lafal"
          >
            <Volume2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            disabled={placedBlockIds.length !== level.correctBlocks.length}
            onClick={handleTestBridge}
            className={`px-4 py-2 rounded-xl text-xs font-black shadow-md transition-all flex items-center gap-1.5 ${
              placedBlockIds.length === level.correctBlocks.length
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer active:scale-95'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <span>Uji Jembatan</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </GameShell>
  );
};
