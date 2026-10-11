import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Award, ArrowRight, RotateCcw, CheckCircle2, Sparkles, BookOpen, Layers } from 'lucide-react';
import { sound } from '../../services/sound';
import { GameStorage } from '../../services/storage';

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
    explanation: 'كِتَابٌ adalah kata benda maskulin (mudzakkar), maka kata tunjuknya memakai هٰذَا dan kata sifatnya كَبِيرٌ (sama-sama berstatus mudzakkar dan tanwin dhommah).'
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
    explanation: 'سَمَكَةٌ berakhiran Ta Marbuthah (ـة) sehingga berstatus muannats (feminin). Kata tunjuknya menggunakan هٰذِهِ dan sifatnya mengikuti memakai akhiran ta marbuthah (كَبِيرَةٌ).'
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
    explanation: 'Huruf jar فِي (di dalam) membuat kata benda sesudahnya menjadi majrur dengan harakat akhir kasrah: المَسْجِدِ.'
  },
  {
    id: 'lvl4',
    theme: 'Frasa Kepemilikan (Idhafah)',
    levelBadge: 'Tingkat 2 - Mudhaf & Mudhaf Ilaih',
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
    explanation: 'Susunan kepemilikan Idhafah: Mudhaf (كِتَابُ) tidak boleh bertanwin dan tidak memakai alif lam, sedangkan Mudhaf Ilaih (الطَّالِبِ) berharakat kasrah.'
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
    rulePoint: 'Maf\'ul Bih Manshub bi-Fathah',
    explanation: 'Kalimat kata kerja (Jumlah Fi\'liyyah): Diawali kata kerja lampau قَرَأَ, pelaku (Fa\'il) marfu\' زَيْدٌ, dan sasaran objek (Maf\'ul bih) manshub berharakat fathah القُرْآنَ.'
  },
  {
    id: 'lvl6',
    theme: 'Kaidah Nawasikh (Inna wa Akhawatuha)',
    levelBadge: 'Tingkat 4 - Penguat Taukid',
    targetTranslation: 'Sesungguhnya ilmu itu adalah cahaya.',
    correctBlocks: [
      { ar: 'إِنَّ', translit: 'inna', gender: 'neutral' },
      { ar: 'العِلْمَ', translit: 'al-ʿilma', gender: 'm' },
      { ar: 'نُورٌ', translit: 'nūrun', gender: 'm' }
    ],
    scrambledBlocks: [
      { id: 'b6_1', ar: 'نُورٌ', translit: 'nūrun', gender: 'm' },
      { id: 'b6_2', ar: 'إِنَّ', translit: 'inna', gender: 'neutral' },
      { id: 'b6_3', ar: 'العِلْمَ', translit: 'al-ʿilma', gender: 'm' },
      { id: 'b6_4_dummy', ar: 'العِلْمُ', translit: 'al-ʿilmu', gender: 'm' },
    ],
    rulePoint: 'Inna Menashabkan Isim',
    explanation: 'Huruf penguat إِنَّ menashabkan isim di depannya menjadi fathah (العِلْمَ) dan merafa\'kan khabar-nya tetap berharakat dhommah tanwin (نُورٌ).'
  },
  {
    id: 'lvl7',
    theme: 'Isim Isyarah Jauh & Keselarasan Jamak',
    levelBadge: 'Tingkat 5 - Tingkat Lanjut',
    targetTranslation: 'Itu sebuah mobil yang cepat.',
    correctBlocks: [
      { ar: 'تِلْكَ', translit: 'tilka', gender: 'f' },
      { ar: 'سَيَّارَةٌ', translit: 'sayyāratun', gender: 'f' },
      { ar: 'سَرِيعَةٌ', translit: 'sarīʿatun', gender: 'f' }
    ],
    scrambledBlocks: [
      { id: 'b7_1', ar: 'سَرِيعَةٌ', translit: 'sarīʿatun', gender: 'f' },
      { id: 'b7_2', ar: 'تِلْكَ', translit: 'tilka', gender: 'f' },
      { id: 'b7_3', ar: 'سَيَّارَةٌ', translit: 'sayyāratun', gender: 'f' },
      { id: 'b7_4_dummy', ar: 'ذٰلِكَ', translit: 'dhālika', gender: 'm' },
    ],
    rulePoint: 'Isyarah Jauh Muannats',
    explanation: 'Untuk kata benda muannats yang jauh, digunakan تِلْكَ (bukan ذٰلِكَ), dan kata sifatnya mengikuti jenis feminin yaitu سَرِيعَةٌ.'
  }
];

export const SentenceBridgeGame: React.FC<SentenceBridgeProps> = ({ onClose, onReward }) => {
  const [levelIdx, setLevelIdx] = useState(0);
  const [placedBlockIds, setPlacedBlockIds] = useState<string[]>([]);
  const [isCrossed, setIsCrossed] = useState(false);
  const [isFinishedAll, setIsFinishedAll] = useState(false);
  const [wrongAttempt, setWrongAttempt] = useState(false);

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
      GameStorage.addReward(60, 3, 'lughah', 8);
      onReward(60, 3);
    } else {
      sound.playGentleRetry();
      setWrongAttempt(true);
      setTimeout(() => setWrongAttempt(false), 800);
    }
  };

  const handleNextLevel = () => {
    setIsCrossed(false);
    setPlacedBlockIds([]);
    if (levelIdx < BRIDGE_LEVELS.length - 1) {
      setLevelIdx(prev => prev + 1);
    } else {
      setIsFinishedAll(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/70 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-lg bg-gradient-to-b from-indigo-50 to-blue-50 rounded-3xl shadow-2xl border-4 border-blue-400 overflow-hidden flex flex-col max-h-[94vh]"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-indigo-900 text-white p-4 flex items-center justify-between shadow-md">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/20">
                Gunung Qawa'id (QWD)
              </span>
              <span className="text-[11px] bg-amber-400 text-slate-900 font-extrabold px-2 py-0.5 rounded-full">
                {level.levelBadge}
              </span>
            </div>
            <h2 className="text-xl font-bold font-chibi flex items-center gap-2 mt-1">
              ⛰️ Sentence Bridge Builder
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white font-bold transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-blue-100 h-2">
          <div
            className="bg-blue-600 h-2 transition-all duration-300"
            style={{ width: `${((levelIdx + 1) / BRIDGE_LEVELS.length) * 100}%` }}
          />
        </div>

        {/* Game Body */}
        <div className="p-4 flex-1 flex flex-col overflow-y-auto">
          {!isFinishedAll ? (
            <>
              {/* Target Statement Card */}
              <div className="bg-white rounded-2xl p-3.5 border border-blue-200 shadow-sm mb-3 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wide">
                      Topik Kaidah: {level.theme}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mt-0.5">
                    "{level.targetTranslation}"
                  </h3>
                </div>
                {isCrossed && (
                  <button
                    onClick={handleSpeakSentence}
                    className="w-10 h-10 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-800 flex items-center justify-center transition-colors shadow-xs"
                    title="Dengar Lafal Kalimat"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Gorge Cliff & Jembatan Visual Scene */}
              <div className={`relative h-44 rounded-2xl bg-gradient-to-b from-sky-400 via-blue-300 to-indigo-950 border-2 overflow-hidden flex flex-col justify-between p-3 mb-3 shadow-inner transition-colors ${
                wrongAttempt ? 'border-rose-400' : 'border-indigo-300'
              }`}>
                {/* Cloud and cliff peaks */}
                <div className="flex justify-between items-start text-xs font-extrabold text-white/95">
                  <span className="bg-slate-900/50 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-white/20">
                    🏔️ Tebing Mubtada'
                  </span>
                  <span className="bg-slate-900/50 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-white/20">
                    🏔️ Puncak Khabar
                  </span>
                </div>

                {/* Bridge Slot Area (RTL orientation) */}
                <div className="flex items-center justify-center gap-2 my-auto" dir="rtl">
                  {Array.from({ length: level.correctBlocks.length }).map((_, idx) => {
                    const blockId = placedBlockIds[idx];
                    const block = blockId ? level.scrambledBlocks.find(b => b.id === blockId) : null;

                    return (
                      <motion.div
                        key={idx}
                        layout
                        className={`h-16 flex-1 max-w-[110px] rounded-xl border-2 flex flex-col items-center justify-center transition-all ${
                          block
                            ? 'bg-amber-100/95 border-amber-500 shadow-md scale-100'
                            : 'bg-white/30 border-dashed border-white/80 shadow-inner'
                        }`}
                      >
                        {block ? (
                          <div className="text-center px-1">
                            <span className="font-arabic font-bold text-lg text-slate-950 block leading-tight">
                              {block.ar}
                            </span>
                            <span className="text-[10px] text-amber-900 font-semibold truncate block">
                              {block.translit}
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs font-bold text-white/80">Balok {idx + 1}</span>
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Character crossing bridge animation */}
                <div className="flex justify-between items-end">
                  <motion.div
                    animate={isCrossed ? { x: 280 } : { x: 0 }}
                    transition={{ duration: 1.1, ease: 'easeInOut' }}
                    className="text-3xl filter drop-shadow-md"
                  >
                    🚶‍♂️
                  </motion.div>
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                    isCrossed
                      ? 'bg-emerald-500 text-white shadow-sm'
                      : wrongAttempt
                      ? 'bg-rose-600 text-white animate-shake'
                      : 'bg-black/50 text-amber-200'
                  }`}>
                    {isCrossed ? '✨ Jembatan Kokoh Terhubung!' : wrongAttempt ? '⚠️ Urutan belum tepat!' : '⏳ Susun balok kalimat'}
                  </span>
                </div>
              </div>

              {/* Instruction */}
              <div className="flex items-center justify-between text-xs text-slate-600 mb-2 font-medium">
                <span>Pilih balok kata dari kanan ke kiri sesuai susunan bahasa Arab:</span>
                <span className="font-bold text-blue-700">{placedBlockIds.length}/{level.correctBlocks.length} terpasang</span>
              </div>

              {/* Scrambled Word Blocks */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                {level.scrambledBlocks.map((block) => {
                  const isPlaced = placedBlockIds.includes(block.id);
                  return (
                    <motion.button
                      key={block.id}
                      onClick={() => handleSelectBlock(block.id)}
                      whileTap={{ scale: 0.96 }}
                      className={`p-3 rounded-2xl border-2 font-bold transition-all shadow-xs flex items-center justify-between ${
                        isPlaced
                          ? 'border-slate-300 bg-slate-100 text-slate-400 opacity-50'
                          : block.gender === 'm'
                          ? 'border-blue-400 bg-white hover:border-blue-600 text-blue-950'
                          : block.gender === 'f'
                          ? 'border-purple-400 bg-white hover:border-purple-600 text-purple-950'
                          : 'border-emerald-400 bg-white hover:border-emerald-600 text-emerald-950'
                      }`}
                    >
                      <div className="text-left">
                        <span className="text-xs font-semibold text-slate-600 block">{block.translit}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded-md font-semibold bg-slate-100 text-slate-700">
                          {block.gender === 'm' ? 'Mudzakkar' : block.gender === 'f' ? 'Muannats' : 'Harf / Kaidah'}
                        </span>
                      </div>
                      <span className="font-arabic text-xl text-slate-900">{block.ar}</span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Explanation upon completion */}
              {isCrossed && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-3.5 mb-3 text-xs text-emerald-950 shadow-xs"
                >
                  <p className="font-bold flex items-center gap-1.5 text-emerald-800 mb-1 text-sm">
                    <BookOpen className="w-4 h-4 text-emerald-600" />
                    Kaidah Qawa'id: {level.rulePoint}
                  </p>
                  <p className="leading-relaxed">{level.explanation}</p>
                </motion.div>
              )}

              {/* Bottom Actions */}
              <div className="flex items-center gap-2 mt-auto pt-2">
                <button
                  onClick={() => {
                    sound.playTap();
                    setPlacedBlockIds([]);
                  }}
                  className="p-3.5 rounded-2xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold transition-colors active:scale-95 flex items-center justify-center"
                  title="Reset Balok"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {!isCrossed ? (
                  <button
                    onClick={handleTestBridge}
                    disabled={placedBlockIds.length === 0}
                    className="flex-1 py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 disabled:opacity-50 text-white rounded-2xl font-bold text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    Uji Kekuatan Jembatan 🌉
                  </button>
                ) : (
                  <button
                    onClick={handleNextLevel}
                    className="flex-1 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl font-bold text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    Lanjut Menyeberang <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
              <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-3 animate-bounce shadow-md">
                <Award className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold font-chibi text-slate-800">
                Puncak Gunung Qawa'id Tercapai!
              </h3>
              <p className="text-sm text-slate-600 mt-2 max-w-sm">
                Kamu telah menghubungkan seluruh 7 tingkatan jembatan kalimat: mudzakkar-muannats, huruf jar, idhafah, fi'il-fa'il, hingga kaidah inna!
              </p>
              <div className="flex items-center gap-2 mt-4 bg-blue-100 text-blue-900 font-bold px-4 py-2 rounded-2xl text-sm shadow-xs">
                <span>+180 XP</span> • <span>+8 Bintang</span> • <span>💎 Kristal Safir Aktif</span>
              </div>
              <button
                onClick={onClose}
                className="mt-6 w-full max-w-xs py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl shadow-lg active:scale-95 transition-all"
              >
                Kembali ke Kepulauan
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
