import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Volume2,
  Award,
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Shield,
  Gauge,
  Radio,
  Compass,
  Search,
  Eye,
  Star
} from 'lucide-react';
import { sound } from '../../services/sound';
import { GameStorage } from '../../services/storage';
import { GameShell, GameFlowState } from './GameShell';

interface AudioDetectiveProps {
  onClose: () => void;
  onReward: (xp: number, stars: number) => void;
}

interface DetectiveCase {
  id: string;
  caseNumber: number;
  caseTitle: string;
  mysteryPrompt: string;
  arabicSpeech: string;
  translit: string;
  indonesianMeaning: string;
  audioCategory: 'situasi' | 'spasial' | 'deskripsi' | 'tokoh' | 'waktu';
  categoryLabel: string;
  hint: string;
  correctOptionId: string;
  options: {
    id: string;
    label: string;
    arabicLabel: string;
    emoji: string;
    explanation: string;
  }[];
}

const DETECTIVE_CASES: DetectiveCase[] = [
  {
    id: 'case_1',
    caseNumber: 1,
    caseTitle: 'Misteri Aroma di Sudut Pasar',
    mysteryPrompt: 'Dengarkan suara saksi mata! Siapakah tokoh yang sedang berbicara di pasar ini?',
    arabicSpeech: 'أَنَا أَبِيعُ الفَوَاكِهَ الطَّازَجَةَ؛ التُّفَّاحَ وَالبُرْتُقَالَ اللَّذِيذ!',
    translit: 'Anā ʾabīʿu l-fawākiha ṭ-ṭāzijah; at-tuffāḥa wa-l-burtuqāla l-ladhīdh!',
    indonesianMeaning: 'Aku menjual buah-buahan segar; apel dan jeruk yang lezat!',
    audioCategory: 'tokoh',
    categoryLabel: '🔍 Identifikasi Tokoh',
    hint: 'Dengarkan kata "fawakih" (buah-buahan) dan buah apel serta jeruk.',
    correctOptionId: 'fruit_seller',
    options: [
      {
        id: 'bread_baker',
        label: 'Tukang Roti Hangat (Khabbāz)',
        arabicLabel: 'خَبَّازٌ',
        emoji: '🥖',
        explanation: 'Bukan, ia tidak menyebutkan gandum atau roti (khubz).'
      },
      {
        id: 'fruit_seller',
        label: 'Penjual Buah Segar (Bā\'iʿ al-Fawākih)',
        arabicLabel: 'بَائِعُ الفَوَاكِه',
        emoji: '🍎',
        explanation: 'Tepat sekali! Saksi berkata "abī\'u l-fawākih" (menjual buah-buahan).'
      },
      {
        id: 'carpenter',
        label: 'Tukang Kayu (Najjār)',
        arabicLabel: 'نَجَّارٌ',
        emoji: '🪚',
        explanation: 'Kurang tepat, tidak ada kayu atau perkakas yang disebutkan.'
      }
    ]
  },
  {
    id: 'case_2',
    caseNumber: 2,
    caseTitle: 'Pesan Rahasia Sang Musafir',
    mysteryPrompt: 'Di manakah arah lokasi persembunyian peti perak berdasarkan instruksi suara?',
    arabicSpeech: 'اِتَّجِهْ إِلَى اليَمِينِ عِنْدَ المَسْجِدِ، ثُمَّ امْشِ إِلَى الأَمَام!',
    translit: 'Ittajih ʾilā l-yamīni ʿinda l-masjid, thumma-msyi ʾilā l-ʾamām!',
    indonesianMeaning: 'Beloklah ke arah kanan di dekat masjid, lalu berjalanlah lurus ke depan!',
    audioCategory: 'spasial',
    categoryLabel: '🧭 Arah Spasial',
    hint: 'Fokus pada kata "al-yamīn" (kanan) dan "al-amām" (depan).',
    correctOptionId: 'right_forward',
    options: [
      {
        id: 'left_backward',
        label: 'Belok Kiri lalu Mundur ke Belakang',
        arabicLabel: 'يَسَار ثُمَّ وَرَاء',
        emoji: '⬅️',
        explanation: 'Salah, yasār artinya kiri, bukan kanan.'
      },
      {
        id: 'right_forward',
        label: 'Belok Kanan di Masjid lalu Lurus ke Depan',
        arabicLabel: 'يَمِين ثُمَّ أَمَام',
        emoji: '➡️',
        explanation: 'Tepat! Yamīn = kanan, dan Amām = depan.'
      },
      {
        id: 'stay_inside',
        label: 'Tetap Diam di dalam Masjid',
        arabicLabel: 'فِي دَاخِلِ المَسْجِد',
        emoji: '🕌',
        explanation: 'Saksi menyuruh belok kanan lalu melangkah ke depan.'
      }
    ]
  },
  {
    id: 'case_3',
    caseNumber: 3,
    caseTitle: 'Waktu Perjumpaan Kafilah',
    mysteryPrompt: 'Kapan kafilah pengembara akan berkumpul di dermaga teluk?',
    arabicSpeech: 'سَنَلْتَقِي غَدًا فِي الصَّبَاحِ البَاكِرِ بَعْدَ صَلَاةِ الفَجْرِ!',
    translit: 'Sanaltaqī ghadan fī ṣ-ṣabāḥi l-bākiri baʿda ṣalāti l-fajr!',
    indonesianMeaning: 'Kita akan bertemu besok di pagi buta setelah shalat Subuh!',
    audioCategory: 'waktu',
    categoryLabel: '⏰ Waktu & Jadwal',
    hint: 'Dengarkan kata "ghadan" (besok) dan "ash-shabahil bakir" (pagi buta).',
    correctOptionId: 'morning_dawn',
    options: [
      {
        id: 'night_isha',
        label: 'Malam Hari Setelah Isya (Lailan)',
        arabicLabel: 'لَيْلاً بَعْدَ العِشَاء',
        emoji: '🌙',
        explanation: 'Bukan, lailan artinya malam hari.'
      },
      {
        id: 'morning_dawn',
        label: 'Pagi Buta Setelah Subuh (Aṣ-Ṣabāḥ)',
        arabicLabel: 'الصَّبَاح البَاكِر',
        emoji: '🌅',
        explanation: 'Tepat sekali! Sanaltaqī fī ṣ-ṣabāḥi l-bākiri baʿda ṣalāti l-fajr.'
      },
      {
        id: 'afternoon',
        label: 'Siang Hari Terik (Az-Zuhr)',
        arabicLabel: 'الظُّهْر',
        emoji: '☀️',
        explanation: 'Kurang tepat, kata yang diucapkan adalah subuh dan pagi buta.'
      }
    ]
  }
];

export const AudioDetectiveGame: React.FC<AudioDetectiveProps> = ({ onClose, onReward }) => {
  const [flowState, setFlowState] = useState<GameFlowState>('BRIEFING');
  const [caseIdx, setCaseIdx] = useState(0);
  const [selectedOptId, setSelectedOptId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [mascotMood, setMascotMood] = useState<'happy' | 'cheer' | 'thinking' | 'celebrate'>('happy');
  const [mascotComment, setMascotComment] = useState('Dengarkan rekaman suara saksi untuk memecahkan kasus!');

  const activeCase = DETECTIVE_CASES[caseIdx];

  const playWitnessAudio = () => {
    setIsPlayingAudio(true);
    sound.speakArabic(activeCase.arabicSpeech);
    setTimeout(() => setIsPlayingAudio(false), 2000);
  };

  const handleSelectOption = (optId: string) => {
    if (isAnswered) return;
    setSelectedOptId(optId);
    setIsAnswered(true);

    const isCorrect = optId === activeCase.correctOptionId;
    if (isCorrect) {
      sound.playSuccess();
      setScore(s => s + 1);
      setMascotMood('celebrate');
      setMascotComment('Mumtaz! Analisis detektifmu sangat akurat memecahkan misteri!');
      GameStorage.addReward(50, 2, 'sam', 8);
      onReward(50, 2);
    } else {
      sound.playGentleRetry();
      setMascotMood('thinking');
      setMascotComment(activeCase.hint);
    }
  };

  const handleNextCase = () => {
    sound.playPop();
    if (caseIdx < DETECTIVE_CASES.length - 1) {
      setCaseIdx(i => i + 1);
      setSelectedOptId(null);
      setIsAnswered(false);
      setMascotMood('happy');
      setMascotComment('Buka berkas kasus berikutnya!');
    } else {
      setFlowState('VICTORY');
    }
  };

  return (
    <GameShell
      title="Detektif Suara Istima'"
      titleAr="المُحَقِّقُ السَّمْعِيُّ"
      islandName="Pulau Istima'"
      islandColor="from-indigo-700 via-purple-700 to-slate-900"
      gameIcon="🔍"
      targetObjective="Pecahkan berkas kasus misteri pulau dengan menganalisis rekaman saksi mata dalam bahasa Arab"
      howToPlay={[
        { icon: '📻', text: 'Putar rekaman petunjuk saksi mata dalam bahasa Arab.' },
        { icon: '🧠', text: 'Perhatikan kata kunci tentang nama profesi, arah mata angin, atau waktu.' },
        { icon: '🔍', text: 'Tentukan kesimpulan investigasi detektif yang paling tepat!' }
      ]}
      speechArabic="كُنْ مُحَقِّقًا بَارِعًا وَاكْتَشِفِ الحَقِيقَةَ!"
      speechIntro="Mari memecahkan berkas kasus rahasia bersama Detektif Suara Pulau Istima'!"
      flowState={flowState}
      onStartGame={() => {
        setFlowState('PLAYING');
        setCaseIdx(0);
        setScore(0);
        setSelectedOptId(null);
        setIsAnswered(false);
        setTimeout(playWitnessAudio, 400);
      }}
      onPlayAgain={() => {
        setFlowState('PLAYING');
        setCaseIdx(0);
        setScore(0);
        setSelectedOptId(null);
        setIsAnswered(false);
      }}
      onClose={onClose}
      currentRound={caseIdx + 1}
      totalRounds={DETECTIVE_CASES.length}
      score={score}
      maxScore={DETECTIVE_CASES.length}
      starsEarned={score >= 3 ? 3 : score >= 2 ? 2 : 1}
      xpEarned={score * 50}
      mascotMood={mascotMood}
      mascotComment={mascotComment}
      mascotArabic="تَحْقِيقٌ"
      onPlayTitleAudio={playWitnessAudio}
      victorySummary={[
        { label: 'Kasus Terpecahkan', value: `${score} / ${DETECTIVE_CASES.length}` },
        { label: 'Pangkat Detektif', value: 'Detektif Utama' },
        { label: 'Analisis Bukti', value: '⭐⭐⭐ Sempurna' },
        { label: 'Ketajaman Bahasa', value: '+15 Poin Istima\'' }
      ]}
    >
      {/* Case Header Banner */}
      <div className="bg-slate-100 rounded-2xl p-2.5 mb-2 border border-slate-200 flex items-center justify-between text-xs">
        <span className="font-bold text-indigo-900">
          Kasus #{activeCase.caseNumber}: {activeCase.caseTitle}
        </span>
        <span className="text-[10px] font-bold bg-indigo-200 text-indigo-900 px-2 py-0.5 rounded-full">
          {activeCase.categoryLabel}
        </span>
      </div>

      {/* Witness Audio Recording Tape */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-2xl p-4 text-white my-auto shadow-md border-2 border-indigo-400/40">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-indigo-200 uppercase tracking-wide flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
            Rekaman Suara Saksi Mata:
          </span>
          <button
            type="button"
            onClick={playWitnessAudio}
            className="px-3 py-1.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm active:scale-95"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>{isPlayingAudio ? 'Memutar...' : 'Putar Rekaman'}</span>
          </button>
        </div>

        <p className="font-arabic text-xl sm:text-2xl font-black text-amber-300 leading-snug">
          "{activeCase.arabicSpeech}"
        </p>
        <p className="text-xs text-slate-300 italic mt-1 leading-snug">
          "{activeCase.indonesianMeaning}"
        </p>
      </div>

      {/* Prompt Question */}
      <div className="pt-2">
        <span className="text-xs font-black text-slate-800 block mb-2">
          ❓ {activeCase.mysteryPrompt}
        </span>

        {/* Options List */}
        <div className="space-y-2">
          {activeCase.options.map(opt => {
            const isSelected = selectedOptId === opt.id;
            const isCorrect = opt.id === activeCase.correctOptionId;

            let cardStyle = 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800';
            if (isAnswered) {
              if (isCorrect) {
                cardStyle = 'bg-emerald-100 border-emerald-400 text-emerald-950 ring-2 ring-emerald-300';
              } else if (isSelected) {
                cardStyle = 'bg-rose-100 border-rose-400 text-rose-950';
              } else {
                cardStyle = 'bg-slate-50 border-slate-200 opacity-60';
              }
            }

            return (
              <motion.button
                key={opt.id}
                whileTap={{ scale: 0.98 }}
                disabled={isAnswered}
                onClick={() => handleSelectOption(opt.id)}
                className={`w-full p-3 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 text-left shadow-xs cursor-pointer ${cardStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{opt.emoji}</span>
                  <div>
                    <span className="font-bold text-xs sm:text-sm block leading-tight">
                      {opt.label}
                    </span>
                    <span className="font-arabic text-sm text-indigo-700 font-bold block mt-0.5">
                      {opt.arabicLabel}
                    </span>
                  </div>
                </div>
                {isAnswered && isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Next Case Button */}
      {isAnswered && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 flex items-center justify-end"
        >
          <button
            type="button"
            onClick={handleNextCase}
            className="px-4 py-2 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-black text-xs flex items-center gap-1.5 shadow-md active:scale-95 cursor-pointer"
          >
            <span>{caseIdx < DETECTIVE_CASES.length - 1 ? 'Kasus Selanjutnya' : 'Hasil Investigasi'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </GameShell>
  );
};
