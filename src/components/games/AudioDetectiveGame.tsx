import React, { useState, useEffect } from 'react';
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

interface AudioDetectiveProps {
  onClose: () => void;
  onReward: (xp: number, stars: number) => void;
}

interface DetectiveCase {
  id: string;
  caseNumber: number;
  caseTitle: string;
  mysteryPrompt: string; // Pertanyaan detektif
  arabicSpeech: string; // Audio Arab yang diucapkan saksi/penutur
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
        explanation: 'Hebat! "Al-Yamīn" berarti kanan dan "Al-Amām" berarti ke depan.'
      },
      {
        id: 'climb_mountain',
        label: 'Mendaki ke Puncak Bukit Pasir',
        arabicLabel: 'فَوْقَ الجَبَل',
        emoji: '⛰️',
        explanation: 'Tidak ada kata jabal (gunung/bukit) dalam rekaman audio.'
      }
    ]
  },
  {
    id: 'case_3',
    caseNumber: 3,
    caseTitle: 'Waktu Keberangkatan Kafilah',
    mysteryPrompt: 'Pukul berapakah kafilah unta akan memulai perjalanan melintasi gurun?',
    arabicSpeech: 'سَتَنْطَلِقُ القَافِلَةُ فِي السَّاعَةِ الخَامِسَةِ عَصْرًا!',
    translit: 'Sa-tanṭaliqu l-qāfilatu fī s-sāʿati l-khāmisati ʿaṣrā!',
    indonesianMeaning: 'Kafilah akan berangkat pada pukul lima sore!',
    audioCategory: 'waktu',
    categoryLabel: '⏰ Waktu & Jam',
    hint: 'Dengarkan bilangan tingkat "al-khāmisah" (kelima).',
    correctOptionId: 'time_5pm',
    options: [
      {
        id: 'time_3pm',
        label: 'Pukul Tiga Sore (Jam 15:00)',
        arabicLabel: 'السَّاعَةُ الثَّالِثَة',
        emoji: '🕒',
        explanation: 'Bukan, jam 3 adalah ats-tsālitsah.'
      },
      {
        id: 'time_5pm',
        label: 'Pukul Lima Sore (Jam 17:00)',
        arabicLabel: 'السَّاعَةُ الخَامِسَة',
        emoji: '🕔',
        explanation: 'Benar! "As-sā\'atu l-khāmisah" berarti jam lima.'
      },
      {
        id: 'time_7pm',
        label: 'Pukul Tujuh Malam (Jam 19:00)',
        arabicLabel: 'السَّاعَةُ السَّابِعَة',
        emoji: '🕖',
        explanation: 'Kurang tepat, as-sābi\'ah berarti jam tujuh.'
      }
    ]
  },
  {
    id: 'case_4',
    caseNumber: 4,
    caseTitle: 'Suara Alam di Tengah Lembah',
    mysteryPrompt: 'Bunyi alam apakah yang sedang didengar oleh pengembara dari kejauhan?',
    arabicSpeech: 'أَسْمَعُ صَوْتَ هَدِيرِ المَاءِ يَتَدَفَّقُ مِنَ الشَّلَّالِ العَالِي!',
    translit: 'Asmaʿu ṣawta hadīri l-māʾi yatadaffaqu mina sy-syallāli l-ʿālī!',
    indonesianMeaning: 'Aku mendengar gemuruh suara air yang mengalir deras dari air terjun yang tinggi!',
    audioCategory: 'deskripsi',
    categoryLabel: '🌿 Fenomena Alam',
    hint: 'Dengarkan kata "mā\'" (air) dan "syallāl" (air terjun).',
    correctOptionId: 'waterfall',
    options: [
      {
        id: 'howling_wind',
        label: 'Hembusan Angin Topan Gurun',
        arabicLabel: 'عَصْفُ الرِّيح',
        emoji: '🌪️',
        explanation: 'Bukan angin, rekaman menyebutkan kata "al-mā\'" (air).'
      },
      {
        id: 'waterfall',
        label: 'Gemuruh Aliran Air Terjun Gunung',
        arabicLabel: 'مَاءُ الشَّلَّال',
        emoji: '🌊',
        explanation: 'Sempurna! Teks menyebutkan "hadīr al-mā\'" dan "asy-syallāl".'
      },
      {
        id: 'roaring_lion',
        label: 'Auman Singa Sahara',
        arabicLabel: 'زَئِيرُ الأَسَد',
        emoji: '🦁',
        explanation: 'Tidak ada singa atau hewan buas yang disebutkan.'
      }
    ]
  },
  {
    id: 'case_5',
    caseNumber: 5,
    caseTitle: 'Instruksi Penting di Perpustakaan',
    mysteryPrompt: 'Perintah apakah yang disampaikan oleh penjaga perpustakaan kuno kepada para santri?',
    arabicSpeech: 'اِسْتَمِعُوا بِهُدُوءٍ وَلَا تَتَكَلَّمُوا فِي المَكْتَبَة!',
    translit: 'Istamiʿū bi-hudūʾin wa-lā tatakallamū fī l-maktabah!',
    indonesianMeaning: 'Dengarkanlah dengan tenang dan jangan berbicara di dalam perpustakaan!',
    audioCategory: 'situasi',
    categoryLabel: '📜 Perintah & Larangan',
    hint: 'Perhatikan kata larangan "lā tatakallamū" (jangan berbicara).',
    correctOptionId: 'be_quiet',
    options: [
      {
        id: 'eat_snack',
        label: 'Makan camilan kurma bersama',
        arabicLabel: 'أَكْلُ التَّمْر',
        emoji: '🍇',
        explanation: 'Bukan, di perpustakaan dilarang makan dan bersuara gaduh.'
      },
      {
        id: 'be_quiet',
        label: 'Simak dengan Tenang & Dilarang Berbicara',
        arabicLabel: 'هُدُوءٌ وَعَدَمُ الكَلَام',
        emoji: '🤫',
        explanation: 'Tepat sekali! "Lā tatakallamū" berarti jangan berbicara.'
      },
      {
        id: 'run_outside',
        label: 'Berlari keluar menuju halaman',
        arabicLabel: 'الجَرْيُ سَرِيعًا',
        emoji: '🏃',
        explanation: 'Salah, penjaga meminta untuk mendengarkan dengan tenang (bi-hudūʾ).'
      }
    ]
  },
  {
    id: 'case_6',
    caseNumber: 6,
    caseTitle: 'Kondisi Hati Sahabat Hudhud',
    mysteryPrompt: 'Bagaimana perasaan yang diungkapkan sahabat dalam rekaman suara ini?',
    arabicSpeech: 'أَنَا مَسْرُورٌ جِدًّا بِلِقَائِكُمْ يَا أَصْدِقَائِي الأَعِزَّاء!',
    translit: 'Anā masrūrun jiddan bi-liqāʾikum yā ʾaṣdiqāʾiya l-ʾaʿizzāʾ!',
    indonesianMeaning: 'Aku sangat gembira dan bersuka cita berjumpa dengan kalian wahai sahabat-sahabatku tersayang!',
    audioCategory: 'tokoh',
    categoryLabel: '❤️ Emosi & Perasaan',
    hint: 'Dengarkan kata sifat emosi "masrūr" (gembira/senang).',
    correctOptionId: 'happy_joy',
    options: [
      {
        id: 'sad_crying',
        label: 'Sedih dan Berduka Cita',
        arabicLabel: 'حَزِينٌ',
        emoji: '😢',
        explanation: 'Bukan, hazīn artinya sedih.'
      },
      {
        id: 'happy_joy',
        label: 'Sangat Gembira & Berbahagia Berjumpa',
        arabicLabel: 'مَسْرُورٌ جِدًّا',
        emoji: '🎉',
        explanation: 'Tepat! "Masrūrun jiddan" artinya sangat gembira.'
      },
      {
        id: 'angry_furious',
        label: 'Marah dan Kecewa Berat',
        arabicLabel: 'غَضْبَانُ',
        emoji: '😡',
        explanation: 'Bukan marah, sahabat menyapa dengan penuh cinta (al-a\'izzā\').'
      }
    ]
  },
  {
    id: 'case_7',
    caseNumber: 7,
    caseTitle: 'Misteri Letak Kunci Emas',
    mysteryPrompt: 'Di manakah tempat disimpannya kunci emas menurut kesaksian audio?',
    arabicSpeech: 'المِفْتَاحُ الذَّهَبِيُّ فَوْقَ الطَّاوِلَةِ بِجَانِبِ الكِتَابِ الكَبِير!',
    translit: 'Al-miftāḥu dh-dhahabiyyu fawqa ṭ-ṭāwilati bi-jānibi l-kitābi l-kabīr!',
    indonesianMeaning: 'Kunci emas itu berada di atas meja di sebelah buku besar!',
    audioCategory: 'spasial',
    categoryLabel: '🗝️ Letak Benda Preposisi',
    hint: 'Dengarkan preposisi "fawqa" (di atas) dan "bi-jānib" (di sebelah).',
    correctOptionId: 'on_table_next_book',
    options: [
      {
        id: 'inside_drawer',
        label: 'Di Dalam Laci Tertutup Rapat',
        arabicLabel: 'دَاخِلَ الدُّرْج',
        emoji: '🗄️',
        explanation: 'Salah, dākhil artinya di dalam.'
      },
      {
        id: 'on_table_next_book',
        label: 'Di Atas Meja di Sebelah Buku Besar',
        arabicLabel: 'فَوْقَ الطَّاوِلَة',
        emoji: '📖',
        explanation: 'Luar biasa! "Fawqa ṭ-ṭāwilah" berarti di atas meja.'
      },
      {
        id: 'under_carpet',
        label: 'Di Bawah Karpet Ruang Tamu',
        arabicLabel: 'تَحْتَ السَّجَّادَة',
        emoji: '🟫',
        explanation: 'Bukan, taḥta artinya di bawah.'
      }
    ]
  },
  {
    id: 'case_8',
    caseNumber: 8,
    caseTitle: 'Pemeriksaan Kesehatan di Tabib',
    mysteryPrompt: 'Keluhan apa yang dirasakan oleh pasien yang datang ke klinik?',
    arabicSpeech: 'أَشْعُرُ بِأَلَمٍ فِي رَأْسِي وَحَرَارَةٍ مُرْتَفِعَةٍ مُنْذُ الصَّبَاح!',
    translit: 'Ashʿuru bi-ʾalamin fī raʾsī wa-ḥarāratin murtafiʿatin mundhu ṣ-ṣabāḥ!',
    indonesianMeaning: 'Aku merasakan sakit di kepalaku dan demam bersuhu panas tinggi sejak pagi!',
    audioCategory: 'situasi',
    categoryLabel: '🩺 Situasi Medis & Keluhan',
    hint: 'Dengarkan kata "ra\'sī" (kepalaku) dan "harārah" (panas/demam).',
    correctOptionId: 'headache_fever',
    options: [
      {
        id: 'stomach_ache',
        label: 'Sakit Perut karena Makanan Pedas',
        arabicLabel: 'أَلَمُ البَطْن',
        emoji: '🤢',
        explanation: 'Bukan perut (bathn), pasien mengeluhkan kepala (ra\'s).'
      },
      {
        id: 'headache_fever',
        label: 'Sakit Kepala & Suhu Badan Demam Panas',
        arabicLabel: 'أَلَمُ الرَّأْسِ وَالحَرَارَة',
        emoji: '🤒',
        explanation: 'Sempurna! Pasien mengeluhkan sakit kepala (ra\'s) dan demam (harārah).'
      },
      {
        id: 'broken_leg',
        label: 'Patah Tulang Kaki Akibat Terjatuh',
        arabicLabel: 'كَسْرُ الرِّجْل',
        emoji: '🦵',
        explanation: 'Tidak ada kata rijl (kaki) dalam tuturan audio pasien.'
      }
    ]
  }
];

export const AudioDetectiveGame: React.FC<AudioDetectiveProps> = ({ onClose, onReward }) => {
  const [caseIdx, setCaseIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState<number>(0.85); // 0.65 lambat, 0.85 standar, 1.0 penutur asli
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const curCase = DETECTIVE_CASES[caseIdx];

  // Auto-play speech when new case loads
  useEffect(() => {
    setSelectedOptionId(null);
    setShowHint(false);
    setShowTranscript(false);

    const timer = setTimeout(() => {
      playAudio(curCase.arabicSpeech);
    }, 450);

    return () => clearTimeout(timer);
  }, [caseIdx]);

  const playAudio = (text: string) => {
    setIsPlayingAudio(true);
    sound.speakArabic(text, audioSpeed);
    setTimeout(() => {
      setIsPlayingAudio(false);
    }, 2400);
  };

  const handleReplay = () => {
    sound.playTap();
    playAudio(curCase.arabicSpeech);
  };

  const handleSelectOption = (optId: string) => {
    if (selectedOptionId) return; // prevent spam
    setSelectedOptionId(optId);

    if (optId === curCase.correctOptionId) {
      sound.playSuccess();
      const newStreak = streak + 1;
      setStreak(newStreak);
      setScore(prev => prev + 1);

      const xpEarned = 50 + newStreak * 10;
      const starsEarned = 2;
      GameStorage.addReward(xpEarned, starsEarned, 'sam', 15);
      onReward(xpEarned, starsEarned);
    } else {
      sound.playGentleRetry();
      setStreak(0);
    }
  };

  const handleNextCase = () => {
    sound.playTap();
    if (caseIdx < DETECTIVE_CASES.length - 1) {
      setCaseIdx(prev => prev + 1);
    } else {
      setIsDone(true);
      sound.playFanfare();
    }
  };

  const handleRestart = () => {
    sound.playSparkle();
    setCaseIdx(0);
    setScore(0);
    setStreak(0);
    setSelectedOptionId(null);
    setIsDone(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 15 }}
        className="w-full max-w-xl bg-purple-950/95 text-white rounded-3xl shadow-2xl border-4 border-purple-500/80 overflow-hidden flex flex-col max-h-[95vh]"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900 via-violet-900 to-indigo-950 px-5 py-4 flex items-center justify-between border-b border-purple-600/50">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 to-purple-600 flex items-center justify-center shadow-lg border border-amber-300/40">
              <Search className="w-5 h-5 text-slate-950 font-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-purple-400/20 text-purple-200 border border-purple-400/40">
                  Lembah Istima' • Mini-Game
                </span>
                <span className="text-[10px] bg-amber-400 text-amber-950 font-black px-2 py-0.5 rounded-full shadow-xs">
                  Trait Sam' +15
                </span>
                {streak > 1 && (
                  <span className="text-[10px] bg-emerald-500 text-white font-black px-2 py-0.5 rounded-full animate-bounce">
                    🔥 Combo x{streak}
                  </span>
                )}
              </div>
              <h2 className="text-base sm:text-lg font-bold font-chibi flex items-center gap-2 mt-0.5 text-white">
                🕵️ Detektif Suara Lembah Istima'
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-purple-200 hover:text-white font-bold transition-all active:scale-95"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        {!isDone ? (
          <div className="p-4 sm:p-5 flex-1 overflow-y-auto space-y-4">
            {/* Progress Bar & Speed Switcher */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-purple-300 font-bold">
                Kasus {curCase.caseNumber} dari {DETECTIVE_CASES.length}
              </span>

              {/* Audio Speed Control */}
              <div className="flex items-center gap-1 bg-purple-900/60 px-2 py-1 rounded-xl border border-purple-700/60">
                <Gauge className="w-3.5 h-3.5 text-amber-300" />
                <span className="text-[10px] text-purple-300">Tempo:</span>
                <button
                  onClick={() => {
                    sound.playTap();
                    setAudioSpeed(prev => (prev === 0.85 ? 0.65 : prev === 0.65 ? 1.0 : 0.85));
                  }}
                  className="font-bold text-amber-300 hover:underline text-[11px]"
                >
                  {audioSpeed === 0.65 ? '0.65x Lambat' : audioSpeed === 0.85 ? '0.85x Santai' : '1.0x Normal'}
                </button>
              </div>
            </div>

            {/* Progress Track */}
            <div className="w-full bg-purple-900/40 h-2 rounded-full overflow-hidden border border-purple-800">
              <div
                className="bg-gradient-to-r from-amber-400 to-pink-500 h-full transition-all duration-300"
                style={{ width: `${((caseIdx + 1) / DETECTIVE_CASES.length) * 100}%` }}
              />
            </div>

            {/* Detective Case Brief Card */}
            <div className="bg-gradient-to-b from-purple-900/80 to-purple-950/90 rounded-2xl p-4 border border-purple-500/50 shadow-md space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-purple-800 text-purple-200 border border-purple-600 font-bold">
                  {curCase.categoryLabel}
                </span>
                <span className="text-amber-300 font-bold">
                  {curCase.caseTitle}
                </span>
              </div>

              <h3 className="text-sm sm:text-base font-extrabold text-white leading-snug">
                {curCase.mysteryPrompt}
              </h3>

              {/* Sound Wave Resonance Box */}
              <div className="bg-purple-950 rounded-2xl p-4 border-2 border-dashed border-purple-600/60 flex flex-col items-center justify-center gap-3 relative overflow-hidden">
                {/* Visual Audio Waveform */}
                <div className="flex items-center justify-center gap-1.5 h-12 w-full">
                  {[...Array(16)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={
                        isPlayingAudio
                          ? { height: [8, 38, 12, 45, 16][i % 5] }
                          : { height: 10 }
                      }
                      transition={{
                        repeat: Infinity,
                        duration: 0.35 + (i % 3) * 0.1,
                        ease: 'easeInOut'
                      }}
                      className={`w-1.5 rounded-full transition-all ${
                        isPlayingAudio
                          ? 'bg-gradient-to-t from-pink-500 to-amber-300 shadow-sm'
                          : 'bg-purple-800'
                      }`}
                    />
                  ))}
                </div>

                {/* Primary Audio Replay Button */}
                <button
                  onClick={handleReplay}
                  disabled={isPlayingAudio}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white font-extrabold text-xs shadow-lg active:scale-95 transition-all flex items-center gap-2 border border-pink-300/40"
                >
                  <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'animate-ping' : ''}`} />
                  <span>{isPlayingAudio ? 'Sedang Memperdengarkan...' : 'Putar Ulang Rekaman Suara 🔊'}</span>
                </button>

                {/* Toggle Transcript / Hint */}
                <div className="flex items-center gap-2 pt-1 text-[11px]">
                  <button
                    onClick={() => {
                      sound.playTap();
                      setShowHint(prev => !prev);
                    }}
                    className="text-amber-300 hover:underline flex items-center gap-1"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>{showHint ? 'Tutup Petunjuk' : 'Lihat Petunjuk Kunci'}</span>
                  </button>

                  <span className="text-purple-500">•</span>

                  <button
                    onClick={() => {
                      sound.playTap();
                      setShowTranscript(prev => !prev);
                    }}
                    className="text-purple-300 hover:underline flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{showTranscript ? 'Sembunyikan Teks' : 'Buka Teks Arab'}</span>
                  </button>
                </div>

                {/* Hint Alert */}
                {showHint && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-amber-950/80 border border-amber-500/60 text-amber-200 text-xs p-2.5 rounded-xl text-center w-full"
                  >
                    💡 <strong>Petunjuk Detektif:</strong> {curCase.hint}
                  </motion.div>
                )}

                {/* Transcript Reveal */}
                {showTranscript && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-purple-900/90 border border-purple-500/60 p-3 rounded-xl text-center w-full space-y-1"
                  >
                    <div className="text-lg font-arabic font-bold text-amber-200 leading-relaxed">
                      {curCase.arabicSpeech}
                    </div>
                    <div className="text-xs text-purple-300 font-mono italic">
                      {curCase.translit}
                    </div>
                    <div className="text-xs text-purple-100 font-medium">
                      "{curCase.indonesianMeaning}"
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Answer Options */}
            <div className="space-y-2.5">
              <div className="text-xs font-bold text-purple-200">
                Pilih Kesimpulan Detektif yang Paling Akurat:
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {curCase.options.map((opt) => {
                  const isSelected = selectedOptionId === opt.id;
                  const isCorrect = opt.id === curCase.correctOptionId;

                  let borderStyle = 'border-purple-700/60 bg-purple-900/40 hover:bg-purple-900/70 hover:border-purple-400';

                  if (selectedOptionId) {
                    if (isCorrect) {
                      borderStyle = 'border-emerald-400 bg-emerald-950/80 text-emerald-100 ring-2 ring-emerald-400/50';
                    } else if (isSelected) {
                      borderStyle = 'border-rose-400 bg-rose-950/80 text-rose-100';
                    } else {
                      borderStyle = 'opacity-40 border-purple-900 bg-purple-950/30 text-purple-400';
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      disabled={selectedOptionId !== null}
                      onClick={() => handleSelectOption(opt.id)}
                      className={`p-3.5 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all active:scale-98 ${borderStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-3xl filter drop-shadow">{opt.emoji}</span>
                        <div>
                          <div className="text-xs font-bold text-white flex items-center gap-2">
                            <span>{opt.label}</span>
                            <span className="text-[11px] font-arabic font-bold text-amber-200">
                              ({opt.arabicLabel})
                            </span>
                          </div>
                          {selectedOptionId && (
                            <div className="text-[11px] text-purple-200 mt-0.5">
                              {opt.explanation}
                            </div>
                          )}
                        </div>
                      </div>

                      {selectedOptionId && (
                        <div className="shrink-0">
                          {isCorrect ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          ) : isSelected ? (
                            <AlertCircle className="w-5 h-5 text-rose-400" />
                          ) : null}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Next Button when answered */}
            {selectedOptionId && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-2"
              >
                <button
                  onClick={handleNextCase}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-sm shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <span>
                    {caseIdx < DETECTIVE_CASES.length - 1 ? 'Lanjut ke Kasus Berikutnya' : 'Buka Hasil Penyelidikan'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </div>
        ) : (
          /* Victory Completion Modal */
          <div className="p-6 sm:p-8 flex-1 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-purple-500 flex items-center justify-center shadow-2xl border-4 border-amber-300 animate-bounce">
              <Award className="w-10 h-10 text-slate-950" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-300">
                Penyelidikan Selesai!
              </span>
              <h3 className="text-2xl font-black font-chibi text-white mt-1">
                Lencana Detektif Istima' Berhasil Diraih!
              </h3>
              <p className="text-xs text-purple-200 mt-1 max-w-sm mx-auto">
                Telingamu sangat tajam menangkap nuansa bahasa Arab penutur asli di Lembah Istima'.
              </p>
            </div>

            {/* Score Stats */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-xs bg-purple-900/60 p-3 rounded-2xl border border-purple-700/60">
              <div className="text-center">
                <span className="text-[10px] text-purple-300 block font-bold">Skor Benar</span>
                <span className="text-lg font-black text-amber-300">{score}/{DETECTIVE_CASES.length}</span>
              </div>
              <div className="text-center">
                <span className="text-[10px] text-purple-300 block font-bold">Bonus XP</span>
                <span className="text-lg font-black text-emerald-300">+{score * 50}</span>
              </div>
              <div className="text-center">
                <span className="text-[10px] text-purple-300 block font-bold">Trait Sam'</span>
                <span className="text-lg font-black text-pink-300">+15</span>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full max-w-xs pt-2">
              <button
                onClick={handleRestart}
                className="flex-1 py-2.5 rounded-xl bg-purple-800 hover:bg-purple-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 border border-purple-600"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Ulangi Kasus</span>
              </button>

              <button
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs shadow-md transition-all active:scale-95"
              >
                Kembali ke Peta
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
