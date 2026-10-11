import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Award, Sparkles, RefreshCw, ArrowRight, Link, Unlink, CheckCircle2 } from 'lucide-react';
import { sound } from '../../services/sound';
import { GameStorage } from '../../services/storage';

interface PearlChainProps {
  onClose: () => void;
  onReward: (xp: number, stars: number) => void;
}

interface ChainPuzzle {
  id: string;
  wordAr: string;
  translit: string;
  meaning: string;
  // Non-connecting letters to the left: ا د ذ ر ز و
  pearls: {
    baseChar: string;
    name: string;
    correctPosForm: string; // Bentuk sambung yang benar
    posOptions: { form: string; posName: string; isCorrect: boolean }[];
    stopsConnectionLeft: boolean; // 6 huruf tak menyambung ke kiri
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
    meaning: 'Pintu',
    pedagogyTip: 'Huruf Alif (ا) adalah 1 dari 6 huruf yang TIDAK BISA menyambung ke kiri. Rantai terputus visual!',
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
        stopsConnectionLeft: true, // TAK MENYAMBUNG KE KIRI!
        posOptions: [
          { form: 'ـا', posName: 'Bentuk Sambung Kanan (ـا)', isCorrect: true },
          { form: 'ـاـ', posName: 'Sambung Dua Sisi (salah)', isCorrect: false },
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
    wordAr: 'وَلَد',
    translit: 'walad',
    meaning: 'Anak laki-laki',
    pedagogyTip: 'Huruf Waw (و) dan Dal (د) sama-sama huruf pemutus sambungan ke kiri (ا د ذ ر ز و)!',
    pearls: [
      {
        baseChar: 'و',
        name: 'Waw',
        correctPosForm: 'و',
        stopsConnectionLeft: true,
        posOptions: [
          { form: 'و', posName: 'Bentuk Awal Mandiri (و)', isCorrect: true },
          { form: 'وـ', posName: 'Sambung Kiri (salah)', isCorrect: false },
        ]
      },
      {
        baseChar: 'ل',
        name: 'Lam',
        correctPosForm: 'لـ',
        stopsConnectionLeft: false,
        posOptions: [
          { form: 'لـ', posName: 'Bentuk Awal Baru (لـ)', isCorrect: true },
          { form: 'ـلـ', posName: 'Bentuk Tengah (ـلـ)', isCorrect: false },
        ]
      },
      {
        baseChar: 'د',
        name: 'Dal',
        correctPosForm: 'ـد',
        stopsConnectionLeft: true,
        posOptions: [
          { form: 'ـد', posName: 'Bentuk Akhir (ـد)', isCorrect: true },
          { form: 'د', posName: 'Bentuk Sendiri (د)', isCorrect: false },
        ]
      }
    ]
  },
  {
    id: 'chain_4',
    wordAr: 'دَرَسَ',
    translit: 'darasa',
    meaning: 'Dia telah belajar',
    pedagogyTip: 'Kata yang sangat istimewa: Dal (د) dan Ra (ر) adalah huruf pemutus sambungan kiri, sehingga ketiga huruf berdiri terpisah!',
    pearls: [
      {
        baseChar: 'د',
        name: 'Dal',
        correctPosForm: 'د',
        stopsConnectionLeft: true,
        posOptions: [
          { form: 'د', posName: 'Bentuk Lepas (د)', isCorrect: true },
          { form: 'ـد', posName: 'Bentuk Akhir (ـد)', isCorrect: false },
        ]
      },
      {
        baseChar: 'ر',
        name: 'Ra',
        correctPosForm: 'ر',
        stopsConnectionLeft: true,
        posOptions: [
          { form: 'ر', posName: 'Bentuk Lepas (ر)', isCorrect: true },
          { form: 'ـر', posName: 'Bentuk Sambung (ـر)', isCorrect: false },
        ]
      },
      {
        baseChar: 'س',
        name: 'Sin',
        correctPosForm: 'س',
        stopsConnectionLeft: false,
        posOptions: [
          { form: 'س', posName: 'Bentuk Sendiri (س)', isCorrect: true },
          { form: 'ـس', posName: 'Bentuk Akhir Sambung (ـس)', isCorrect: false },
          { form: 'سـ', posName: 'Bentuk Awal (سـ)', isCorrect: false },
        ]
      }
    ]
  },
  {
    id: 'chain_5',
    wordAr: 'مَسْجِد',
    translit: 'masjid',
    meaning: 'Masjid (tempat sujud)',
    pedagogyTip: 'Rantai 4 huruf terhubung: Mim awal (مـ), Sin tengah (ـسـ), Jim tengah (ـجـ), dan Dal akhir (ـد).',
    pearls: [
      {
        baseChar: 'م',
        name: 'Mim',
        correctPosForm: 'مـ',
        stopsConnectionLeft: false,
        posOptions: [
          { form: 'مـ', posName: 'Bentuk Awal (مـ)', isCorrect: true },
          { form: 'ـمـ', posName: 'Bentuk Tengah (ـمـ)', isCorrect: false },
          { form: 'م', posName: 'Bentuk Sendiri (م)', isCorrect: false },
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
          { form: 'ـس', posName: 'Bentuk Akhir (ـس)', isCorrect: false },
        ]
      },
      {
        baseChar: 'ج',
        name: 'Jim',
        correctPosForm: 'ـجـ',
        stopsConnectionLeft: false,
        posOptions: [
          { form: 'ـجـ', posName: 'Bentuk Tengah (ـجـ)', isCorrect: true },
          { form: 'جـ', posName: 'Bentuk Awal (جـ)', isCorrect: false },
          { form: 'ـج', posName: 'Bentuk Akhir (ـج)', isCorrect: false },
        ]
      },
      {
        baseChar: 'د',
        name: 'Dal',
        correctPosForm: 'ـد',
        stopsConnectionLeft: true,
        posOptions: [
          { form: 'ـد', posName: 'Bentuk Akhir (ـد)', isCorrect: true },
          { form: 'د', posName: 'Bentuk Sendiri (د)', isCorrect: false },
        ]
      }
    ]
  },
  {
    id: 'chain_6',
    wordAr: 'زَهْرَة',
    translit: 'zahrah',
    meaning: 'Bunga mawar / mekar',
    pedagogyTip: 'Kombinasi Zay (pemutus kiri), Ha dada tengah awal (هـ), Ra (pemutus kiri), dan Ta Marbuthah tunggal (ة).',
    pearls: [
      {
        baseChar: 'ز',
        name: 'Zay',
        correctPosForm: 'ز',
        stopsConnectionLeft: true,
        posOptions: [
          { form: 'ز', posName: 'Bentuk Lepas (ز)', isCorrect: true },
          { form: 'ـز', posName: 'Sambung Kanan (ـز)', isCorrect: false },
        ]
      },
      {
        baseChar: 'هـ',
        name: 'Ha',
        correctPosForm: 'هـ',
        stopsConnectionLeft: false,
        posOptions: [
          { form: 'هـ', posName: 'Bentuk Awal Baru (هـ)', isCorrect: true },
          { form: 'ـهـ', posName: 'Bentuk Pita Tengah (ـهـ)', isCorrect: false },
        ]
      },
      {
        baseChar: 'ر',
        name: 'Ra',
        correctPosForm: 'ـر',
        stopsConnectionLeft: true,
        posOptions: [
          { form: 'ـر', posName: 'Bentuk Akhir Sambung (ـر)', isCorrect: true },
          { form: 'ر', posName: 'Bentuk Lepas (ر)', isCorrect: false },
        ]
      },
      {
        baseChar: 'ة',
        name: 'Ta Marbuthah',
        correctPosForm: 'ة',
        stopsConnectionLeft: false,
        posOptions: [
          { form: 'ة', posName: 'Ta Marbuthah Bulat (ة)', isCorrect: true },
          { form: 'ـة', posName: 'Ta Marbuthah Sambung (ـة)', isCorrect: false },
        ]
      }
    ]
  }
];

export const PearlChainGame: React.FC<PearlChainProps> = ({ onClose, onReward }) => {
  const [puzzleIdx, setPuzzleIdx] = useState(0);
  const [selectedForms, setSelectedForms] = useState<Record<number, string>>({});
  const [isChainLinked, setIsChainLinked] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentPuzzle = CHAIN_PUZZLES[puzzleIdx];

  const handleSelectForm = (pearlIdx: number, form: string) => {
    sound.speakArabic(form);
    const updated = { ...selectedForms, [pearlIdx]: form };
    setSelectedForms(updated);

    // Check if all pearls are selected
    if (Object.keys(updated).length === currentPuzzle.pearls.length) {
      const allCorrect = currentPuzzle.pearls.every((p, idx) => updated[idx] === p.correctPosForm);
      if (allCorrect) {
        sound.playSuccess();
        sound.playSparkle();
        setIsChainLinked(true);
        GameStorage.addReward(55, 3, 'qiraah', 8);
        onReward(55, 3);
      } else {
        sound.playGentleRetry();
      }
    }
  };

  const handleNextPuzzle = () => {
    setSelectedForms({});
    setIsChainLinked(false);
    if (puzzleIdx < CHAIN_PUZZLES.length - 1) {
      setPuzzleIdx(i => i + 1);
    } else {
      setIsFinished(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-lg bg-teal-50 rounded-3xl shadow-2xl border-4 border-teal-300 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-700 via-cyan-600 to-teal-800 text-white p-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20">Pulau Huruf (HRF - J1)</span>
              <span className="text-xs bg-amber-300 text-amber-950 font-extrabold px-2 py-0.5 rounded-full">
                Rantai {puzzleIdx + 1}/{CHAIN_PUZZLES.length}
              </span>
            </div>
            <h2 className="text-xl font-bold font-chibi flex items-center gap-2 mt-1">
              📿 Pearl Chain (Rantai Huruf Sambung)
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white font-bold transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Game Body */}
        <div className="p-4 flex-1 flex flex-col items-center overflow-y-auto">
          {!isFinished ? (
            <>
              {/* Target Word Overview */}
              <div className="bg-white rounded-2xl p-3.5 border border-teal-200 shadow-xs w-full flex items-center justify-between mb-3">
                <div>
                  <span className="text-[10px] font-bold text-teal-700 uppercase">Target Rangkaian Kata:</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-arabic text-3xl font-bold text-slate-900">{currentPuzzle.wordAr}</span>
                    <span className="text-xs font-bold text-slate-600">({currentPuzzle.translit})</span>
                  </div>
                  <p className="text-xs text-slate-500">{currentPuzzle.meaning}</p>
                </div>
                <button
                  onClick={() => sound.speakArabic(currentPuzzle.wordAr)}
                  className="w-10 h-10 rounded-xl bg-teal-600 hover:bg-teal-700 text-white flex items-center justify-center shadow-xs active:scale-95"
                  title="Dengarkan kata utuh"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              {/* Pedagogy explanation badge */}
              <p className="text-xs text-teal-900 bg-teal-100/80 p-2.5 rounded-xl border border-teal-200 w-full mb-3">
                💡 <strong>Kaidah Sambung:</strong> {currentPuzzle.pedagogyTip}
              </p>

              {/* The Pearl Necklace Wire (Visual Rantai Mutiara) */}
              <div className="w-full bg-gradient-to-r from-teal-900 via-slate-900 to-teal-950 p-5 rounded-3xl border-2 border-teal-400 shadow-inner mb-4 flex flex-col items-center justify-center min-h-[140px] relative overflow-hidden">
                <span className="text-[10px] font-bold text-teal-300 uppercase tracking-wider mb-2">
                  Untaian Kalung Mutiara (Kanan ke Kiri)
                </span>

                <div className="flex items-center justify-center gap-2 relative z-10" dir="rtl">
                  {currentPuzzle.pearls.map((pearl, idx) => {
                    const selected = selectedForms[idx];
                    const isCorrect = selected === pearl.correctPosForm;

                    return (
                      <React.Fragment key={idx}>
                        {/* The Pearl Orb */}
                        <div
                          className={`w-16 h-16 rounded-full flex flex-col items-center justify-center text-center shadow-lg transition-all border-2 ${
                            selected
                              ? isCorrect
                                ? 'bg-gradient-to-br from-cyan-300 to-teal-500 border-white text-slate-950 font-bold scale-105'
                                : 'bg-rose-100 border-rose-400 text-rose-950 font-bold'
                              : 'bg-white/20 border-dashed border-teal-300 text-teal-200'
                          }`}
                        >
                          {selected ? (
                            <span className="font-arabic text-3xl block leading-none">{selected}</span>
                          ) : (
                            <span className="text-xs font-bold font-arabic">{pearl.baseChar}</span>
                          )}
                        </div>

                        {/* Connector Link between pearls */}
                        {idx < currentPuzzle.pearls.length - 1 && (
                          <div className="flex items-center text-teal-300">
                            {pearl.stopsConnectionLeft ? (
                              <div className="flex items-center gap-0.5 text-rose-300 bg-black/40 px-1.5 py-0.5 rounded-md text-[9px] font-bold" title="6 Huruf Tak Menyambung Kiri">
                                <Unlink className="w-3 h-3 text-rose-400" />
                                <span>Pisah</span>
                              </div>
                            ) : (
                              <div className="flex items-center text-amber-300" title="Menyambung">
                                <Link className="w-4 h-4 text-teal-300" />
                              </div>
                            )}
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>

                {isChainLinked && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 flex items-center gap-1.5 text-xs font-bold text-amber-300 bg-black/40 px-3 py-1 rounded-full border border-amber-300/40"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Rantai Mutiara Terangkai Sempurna!</span>
                  </motion.div>
                )}
              </div>

              {/* Pearl Shape Option Selectors */}
              <div className="w-full space-y-2 mb-3">
                <span className="text-xs font-bold text-slate-700 block">
                  Pilih bentuk posisi mutiara yang tepat:
                </span>

                {currentPuzzle.pearls.map((pearl, pIdx) => (
                  <div key={pIdx} className="bg-white p-3 rounded-2xl border border-teal-200 shadow-2xs">
                    <div className="flex justify-between items-center mb-1.5 text-xs">
                      <span className="font-bold text-teal-900">
                        Mutiara ke-{pIdx + 1}: Huruf {pearl.name} ({pearl.baseChar})
                      </span>
                      {selectedForms[pIdx] === pearl.correctPosForm && (
                        <span className="text-emerald-700 font-extrabold text-[11px]">✓ Tepat</span>
                      )}
                    </div>

                    <div className="flex gap-2" dir="rtl">
                      {pearl.posOptions.map((opt, optIdx) => {
                        const isChosen = selectedForms[pIdx] === opt.form;
                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectForm(pIdx, opt.form)}
                            className={`flex-1 py-2 px-2 rounded-xl border-2 flex items-center justify-center gap-2 transition-all ${
                              isChosen
                                ? opt.isCorrect
                                  ? 'bg-teal-600 border-teal-700 text-white font-bold shadow-xs'
                                  : 'bg-rose-100 border-rose-400 text-rose-900'
                                : 'bg-teal-50/50 hover:bg-teal-100/70 border-teal-200 text-slate-800'
                            }`}
                          >
                            <span className="font-arabic text-2xl font-bold leading-none">{opt.form}</span>
                            <span className="text-[10px] text-slate-600 block">{opt.posName}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Next Button */}
              {isChainLinked && (
                <button
                  onClick={handleNextPuzzle}
                  className="w-full py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-2xl font-bold text-xs shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 mt-auto"
                >
                  {puzzleIdx < CHAIN_PUZZLES.length - 1 ? 'Rangkai Kata Berikutnya' : 'Selesaikan Rantai Mutiara! 📿'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 my-auto">
              <div className="w-20 h-20 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mb-3 animate-bounce">
                <Award className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold font-chibi text-slate-800">Kalung Mutiara Telah Lengkap!</h3>
              <p className="text-xs text-slate-600 mt-2 max-w-sm">
                Kamu telah memahami kaidah sambung huruf awal, tengah, akhir, serta 6 huruf pemutus rantai dengan sangat teliti!
              </p>
              <div className="flex items-center gap-2 mt-4 bg-teal-100 text-teal-900 font-bold px-4 py-2 rounded-2xl text-xs">
                <span>+165 XP</span> • <span>+9 Bintang</span> • <span>Mutiara Teal</span>
              </div>
              <button
                onClick={onClose}
                className="mt-6 w-full max-w-xs py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold rounded-2xl shadow-lg active:scale-95 transition-all"
              >
                Kembali ke Pulau Huruf
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
