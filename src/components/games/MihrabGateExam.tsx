import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Award, Crown, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { sound } from '../../services/sound';
import { GameStorage } from '../../services/storage';

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

interface LevelExamSuite {
  level: number;
  levelName: string;
  targetRutbah: 'Thalib' | 'Rahhal' | 'Qari';
  targetHudhudStage: 'Baby' | 'Young' | 'Explorer';
  questions: ExamQuestion[];
}

const ALL_EXAMS: LevelExamSuite[] = [
  {
    level: 0,
    levelName: 'Jenjang 0 (Tamhidi - تمهيدي)',
    targetRutbah: 'Thalib',
    targetHudhudStage: 'Baby',
    questions: [
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
    ]
  },
  {
    level: 1,
    levelName: 'Jenjang 1 (Mubtadi\' - مبتدئ)',
    targetRutbah: 'Rahhal',
    targetHudhudStage: 'Young',
    questions: [
      {
        modality: 'L',
        skillLabel: 'Keterampilan 1: Menyimak (Istima\')',
        prompt: 'Dengarkan kalimat berikut: "كَيْفَ حَالُكَ؟". Kapan kalimat ini digunakan?',
        arText: 'كَيْفَ حَالُكَ؟',
        options: [
          { id: '1', text: 'Saat menanyakan kabar sahabat', correct: true },
          { id: '2', text: 'Saat berpamitan tidur', correct: false },
          { id: '3', text: 'Saat meminta harga barang', correct: false },
        ],
        hint: 'Artinya: Bagaimana kabarmu?'
      },
      {
        modality: 'P',
        skillLabel: 'Keterampilan 2: Berbicara & Hiwar (Lisan)',
        prompt: 'Ketika seseorang menanyakan: "مِنْ أَيْنَ أَنْتَ؟", jawaban yang tepat adalah:',
        options: [
          { id: '1', text: 'أَنَا مِنْ إِنْدُونِيسِيَا (Saya dari Indonesia)', arText: 'أَنَا مِنْ إِنْدُونِيسِيَا', correct: true },
          { id: '2', text: 'شُكْرًا جَزِيلًا (Terima kasih banyak)', arText: 'شُكْرًا', correct: false },
          { id: '3', text: 'هٰذَا قَلَمٌ (Ini pulpen)', arText: 'هٰذَا قَلَمٌ', correct: false },
        ],
        hint: 'Menyebutkan asal negara / tempat.'
      },
      {
        modality: 'R',
        skillLabel: 'Keterampilan 3: Membaca (Qira\'ah)',
        prompt: 'Bacalah frasa sifat berikut: "سَمَكَةٌ كَبِيرَةٌ". Mengapa kata kedua berakhiran Ta Marbuthah (ـة)?',
        arText: 'سَمَكَةٌ كَبِيرَةٌ',
        options: [
          { id: '1', text: 'Karena menyelaraskan gender feminin (muannats) kata bendanya', correct: true },
          { id: '2', text: 'Karena menunjukkan kata kerja lampau', correct: false },
          { id: '3', text: 'Karena merupakan huruf jar', correct: false },
        ],
        hint: 'Sifat mengikuti yang disifati dalam jenis kelamin mudzakkar/muannats.'
      },
      {
        modality: 'W',
        skillLabel: 'Keterampilan 4: Menulis & Ejaan (Kitabah)',
        prompt: 'Manakah bentuk ejaan yang benar untuk kata "air minum segar"?',
        options: [
          { id: '1', text: 'مَاء (dengan hamzah mutatharrifah)', arText: 'مَاء', correct: true },
          { id: '2', text: 'مَه (dengan ha)', arText: 'مَه', correct: false },
          { id: '3', text: 'مَا (tanpa hamzah)', arText: 'مَا', correct: false },
        ],
        hint: 'Diakhiri hamzah berdiri sendiri di atas garis.'
      }
    ]
  }
];

export const MihrabGateExam: React.FC<MihrabGateProps> = ({ onClose, onReward, onPromote }) => {
  const [examLevelIdx, setExamLevelIdx] = useState(0);
  const currentExamSuite = ALL_EXAMS[examLevelIdx];
  const [stepIdx, setStepIdx] = useState(0);
  const [scores, setScores] = useState<Record<number, boolean>>({});
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isExamCompleted, setIsExamCompleted] = useState(false);

  const currentQ = currentExamSuite.questions[stepIdx];

  const handlePlayAudio = (text: string) => {
    sound.speakArabic(text);
  };

  const handleSelect = (id: string) => {
    if (isAnswered) return;
    setSelectedId(id);
    setIsAnswered(true);

    const isCorrect = currentQ.options.find(o => o.id === id)?.correct || false;
    setScores(prev => ({ ...prev, [stepIdx]: isCorrect }));

    if (isCorrect) {
      sound.playSuccess();
    } else {
      sound.playGentleRetry();
    }
  };

  const handleNextStep = () => {
    setIsAnswered(false);
    setSelectedId(null);
    if (stepIdx < currentExamSuite.questions.length - 1) {
      setStepIdx(prev => prev + 1);
    } else {
      // Calculate results
      sound.playFanfare();
      GameStorage.unlockCrystal('TMH');
      GameStorage.promoteRutbah(currentExamSuite.targetRutbah, currentExamSuite.level + 1, currentExamSuite.targetHudhudStage);
      GameStorage.addReward(300, 15);
      onReward(300, 15);
      onPromote();
      setIsExamCompleted(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/70 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-lg bg-gradient-to-b from-amber-50 via-yellow-50 to-orange-50 rounded-3xl shadow-2xl border-4 border-amber-400 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 text-white p-4 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            <Crown className="w-6 h-6 text-yellow-300" />
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-200 block">Kuil Langit (Ma'bad as-Sama')</span>
              <h2 className="text-xl font-bold font-chibi">Gerbang Mihrab {currentExamSuite.levelName.split(' ')[0]}</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white font-bold transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Level Suite Selector */}
        <div className="bg-amber-100 p-2 border-b border-amber-200 flex items-center gap-1.5 text-xs font-bold">
          {ALL_EXAMS.map((suite, idx) => (
            <button
              key={suite.level}
              onClick={() => {
                setExamLevelIdx(idx);
                setStepIdx(0);
                setScores({});
                setSelectedId(null);
                setIsAnswered(false);
                setIsExamCompleted(false);
              }}
              className={`flex-1 py-1.5 rounded-xl transition-all ${
                examLevelIdx === idx
                  ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                  : 'text-amber-900 hover:bg-amber-200'
              }`}
            >
              Ujian J{suite.level} (Naik ke {suite.targetRutbah})
            </button>
          ))}
        </div>

        {/* Exam Body */}
        <div className="p-4 flex-1 flex flex-col overflow-y-auto">
          {!isExamCompleted ? (
            <>
              {/* Progress 4 modalities indicator */}
              <div className="flex items-center justify-between bg-white rounded-2xl p-2.5 border border-amber-200 mb-3 shadow-xs">
                {currentExamSuite.questions.map((q, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 flex-1 justify-center">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                      idx === stepIdx
                        ? 'bg-amber-500 text-white ring-2 ring-amber-300 ring-offset-1'
                        : scores[idx] !== undefined
                        ? scores[idx] ? 'bg-emerald-500 text-white' : 'bg-slate-300 text-slate-700'
                        : 'bg-slate-100 text-slate-400'
                    }`}>
                      {q.modality}
                    </div>
                    {idx < currentExamSuite.questions.length - 1 && (
                      <div className="h-0.5 w-4 bg-amber-200 hidden sm:block" />
                    )}
                  </div>
                ))}
              </div>

              {/* Skill Tag & Question */}
              <div className="bg-white rounded-2xl p-4 border border-amber-300 shadow-sm mb-3">
                <span className="text-xs font-extrabold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full inline-block mb-2">
                  {currentQ.skillLabel}
                </span>

                <h3 className="text-base font-bold text-slate-800 leading-snug">
                  {currentQ.prompt}
                </h3>

                {currentQ.arText && (
                  <div className="mt-3 bg-amber-50/80 p-3 rounded-xl border border-amber-200 flex items-center justify-between">
                    <span className="font-arabic text-2xl font-bold text-slate-900 leading-relaxed">
                      {currentQ.arText}
                    </span>
                    <button
                      onClick={() => handlePlayAudio(currentQ.arText!)}
                      className="w-10 h-10 rounded-xl bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center shadow-md active:scale-95 transition-all"
                      title="Dengarkan pelafalan fasih"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Options */}
              <div className="space-y-2 mb-4">
                {currentQ.options.map((option) => {
                  const isSelected = selectedId === option.id;
                  let btnColor = 'border-amber-200 bg-white hover:border-amber-400';
                  if (isAnswered) {
                    if (option.correct) {
                      btnColor = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                    } else if (isSelected) {
                      btnColor = 'border-rose-400 bg-rose-50 text-rose-900';
                    }
                  }

                  return (
                    <button
                      key={option.id}
                      onClick={() => handleSelect(option.id)}
                      disabled={isAnswered}
                      className={`w-full p-3.5 rounded-2xl border-2 text-left flex items-center justify-between transition-all shadow-xs ${btnColor}`}
                    >
                      <span className="text-sm font-semibold">{option.text}</span>
                      {option.arText && (
                        <span className="font-arabic text-lg font-bold text-slate-800 mr-2">
                          {option.arText}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <div className="mt-auto">
                  <button
                    onClick={handleNextStep}
                    className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl font-bold text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    {stepIdx < currentExamSuite.questions.length - 1 ? 'Pertanyaan Berikutnya' : 'Buka Gerbang Kelulusan! 🏆'}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 my-auto">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 text-white flex items-center justify-center mb-4 shadow-xl animate-bounce">
                <Crown className="w-14 h-14" />
              </div>
              <span className="text-xs font-bold text-amber-800 bg-amber-200 px-3 py-1 rounded-full uppercase tracking-wider">
                MUBARAK! LULUS {currentExamSuite.levelName.toUpperCase()}
              </span>
              <h3 className="text-2xl font-bold font-chibi text-slate-800 mt-2">
                Rutbah Naik Menjadi "{currentExamSuite.targetRutbah}"!
              </h3>
              <p className="text-xs text-slate-600 mt-2 max-w-sm">
                Sahabat Hudhud berevolusi ke tahap <strong>{currentExamSuite.targetHudhudStage}</strong>! Pulau-pulau lanjutan dan tantangan baru kini terbuka untuk dijelajahi.
              </p>

              <div className="flex items-center gap-2 mt-4 bg-white border border-amber-300 text-amber-900 font-bold px-4 py-2.5 rounded-2xl text-sm shadow-sm">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>+300 XP</span> • <span>+15 Bintang</span> • <span>Kristal Emas Mahkota</span>
              </div>

              <button
                onClick={onClose}
                className="mt-6 w-full max-w-xs py-3.5 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold rounded-2xl shadow-lg active:scale-95 transition-all"
              >
                Rayakan & Jelajahi Pulau Baru!
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
