import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Award, Headphones, Sparkles, ArrowRight, RotateCcw, CheckCircle2, AlertCircle, Gauge, Radio, Shield } from 'lucide-react';
import { sound } from '../../services/sound';
import { GameStorage } from '../../services/storage';

interface EchoCaveProps {
  onClose: () => void;
  onReward: (xp: number, stars: number) => void;
}

interface EchoQuestion {
  id: string;
  category: 'minimal_pairs' | 'vocal_length' | 'directions_commands' | 'numbers_time';
  categoryLabel: string;
  ar_sound: string;
  translit: string;
  gloss: string;
  explanation: string;
  hint: string;
  correctId: string;
  options: {
    id: string;
    ar: string;
    label: string;
    translit: string;
    emoji: string;
    isContrastTarget?: boolean;
  }[];
}

const ECHO_STAGES: EchoQuestion[] = [
  // 1. Minimal Pairs (Qaf vs Kaf)
  {
    id: 'ep_1',
    category: 'minimal_pairs',
    categoryLabel: '🎯 Pasangan Minimal (ق vs ك)',
    ar_sound: 'قَلْب',
    translit: 'qalb',
    gloss: 'Hati / Jantung',
    explanation: 'Huruf Qaf (ق) keluar dari pangkal lidah belakang bersentuhan langit-langit lunak, tebal & dalam. Berbeda dengan Kaf (ك) yang lebih tipis dan berdesis angin.',
    hint: 'Dengarkan ketukan tebal dan bulat di pangkal tenggorokan belakang!',
    correctId: 'qalb',
    options: [
      { id: 'kalb', ar: 'كَلْب', label: 'Anjing (Kalb)', translit: 'kalb', emoji: '🐕', isContrastTarget: true },
      { id: 'qalb', ar: 'قَلْب', label: 'Hati / Jantung (Qalb)', translit: 'qalb', emoji: '❤️' },
      { id: 'qalam', ar: 'قَلَم', label: 'Pena (Qalam)', translit: 'qalam', emoji: '🖊️' },
    ]
  },
  // 2. Minimal Pairs ('Ain vs Hamzah)
  {
    id: 'ep_2',
    category: 'minimal_pairs',
    categoryLabel: '🎯 Pasangan Minimal (ع vs ء)',
    ar_sound: 'عَلِيم',
    translit: 'ʿalīm',
    gloss: 'Maha Mengetahui',
    explanation: 'Huruf \'Ain (ع) keluar dari pertengahan tenggorokan (wasathul halq) dengan tekanan halus, sedangkan Hamzah (أ) keluar dari pangkal tenggorokan terdalam.',
    hint: 'Bunyi mengalir lembut dan tertekan di tengah pita suara, bukan hentian glotal tegas.',
    correctId: 'alim',
    options: [
      { id: 'aleem', ar: 'أَلِيم', label: 'Pedih / Sakit (Alīm)', translit: 'alīm', emoji: '🩹', isContrastTarget: true },
      { id: 'alim', ar: 'عَلِيم', label: 'Maha Tahu (ʿAlīm)', translit: 'ʿalīm', emoji: '🧠' },
      { id: 'azim', ar: 'عَظِيم', label: 'Maha Agung (ʿAẓīm)', translit: 'ʿaẓīm', emoji: '👑' },
    ]
  },
  // 3. Minimal Pairs (Shad tebal vs Sin tipis)
  {
    id: 'ep_3',
    category: 'minimal_pairs',
    categoryLabel: '🎯 Pasangan Minimal (ص vs س)',
    ar_sound: 'صَيْف',
    translit: 'ṣayf',
    gloss: 'Musim Panas',
    explanation: 'Huruf Shad (ص) memiliki sifat Ithbaq & Isti\'la (tebal & lidah melengkung ke atas), menghasilkan desis bulat tebal, beda dari Sin (س) yang tipis tersenyum.',
    hint: 'Perhatikan desis tebal bernada berat, bukan desis tipis bersiul.',
    correctId: 'shayf',
    options: [
      { id: 'sayf', ar: 'سَيْف', label: 'Pedang (Sayf)', translit: 'sayf', emoji: '⚔️', isContrastTarget: true },
      { id: 'shayf', ar: 'صَيْف', label: 'Musim Panas (Ṣayf)', translit: 'ṣayf', emoji: '☀️' },
      { id: 'dhayf', ar: 'ضَيْف', label: 'Tamu (Ḍayf)', translit: 'ḍayf', emoji: '🍵' },
    ]
  },
  // 4. Vocal Length (Mad Thabi'i: Pendek vs Panjang)
  {
    id: 'ep_4',
    category: 'vocal_length',
    categoryLabel: '⏳ Vokal Panjang vs Pendek (Mad)',
    ar_sound: 'جَمَال',
    translit: 'jamāl',
    gloss: 'Keindahan',
    explanation: 'Kata ini memiliki vokal panjang (Alif Mad) 2 harakat pada huruf Mim (mā-), berlawanan dengan kata tunggal "jamal" (unta) yang pendek 1 harakat.',
    hint: 'Dengarkan nada vokal huruf kedua yang dipanjangkan!',
    correctId: 'jamaal',
    options: [
      { id: 'jamal', ar: 'جَمَل', label: 'Unta (Jamal - pendek)', translit: 'jamal', emoji: '🐫', isContrastTarget: true },
      { id: 'jamaal', ar: 'جَمَال', label: 'Keindahan (Jamāl - panjang)', translit: 'jamāl', emoji: '✨' },
      { id: 'jabal', ar: 'جَبَل', label: 'Gunung (Jabal)', translit: 'jabal', emoji: '⛰️' },
    ]
  },
  // 5. Directions / Orientasi Spasial
  {
    id: 'ep_5',
    category: 'directions_commands',
    categoryLabel: '🧭 Orientasi Spasial (Arah)',
    ar_sound: 'يَمِين',
    translit: 'yamīn',
    gloss: 'Kanan',
    explanation: 'Yamīn (يَمِين) berarti arah kanan atau tangan kanan. Lawan katanya adalah Yasār (يَسَار) yang berarti kiri.',
    hint: 'Kata ini berakar dari berkah/kanan dalam tradisi Arab.',
    correctId: 'yamin',
    options: [
      { id: 'yasar', ar: 'يَسَار', label: 'Kiri (Yasār)', translit: 'yasār', emoji: '⬅️' },
      { id: 'yamin', ar: 'يَمِين', label: 'Kanan (Yamīn)', translit: 'yamīn', emoji: '➡️' },
      { id: 'amam', ar: 'أَمَام', label: 'Depan (Amām)', translit: 'amām', emoji: '⬆️' },
    ]
  },
  // 6. Classroom Command / Instruksi Audio
  {
    id: 'ep_6',
    category: 'directions_commands',
    categoryLabel: '📜 Perintah Lisan Guru (Fi\'il Amr)',
    ar_sound: 'اِقْرَأْ كِتَابَكَ',
    translit: 'iqraʾ kitābaka',
    gloss: 'Bacalah bukumu!',
    explanation: 'Kalimat perintah amr: "Iqra\'" (bacalah!) diikuti objek "kitābaka" (bukumu). Perintah langsung yang sering terdengar di majlis ilmu.',
    hint: 'Dengar kata pertama yang mengawali wahyu pertama Al-Qur\'an!',
    correctId: 'read_book',
    options: [
      { id: 'write_book', ar: 'اُكْتُبْ دَرْسَكَ', label: 'Tulislah pelajaranmu! (Uktub)', translit: 'uktub darsaka', emoji: '✍️' },
      { id: 'read_book', ar: 'اِقْرَأْ كِتَابَكَ', label: 'Bacalah bukumu! (Iqra\')', translit: 'iqraʾ kitābaka', emoji: '📖' },
      { id: 'listen_teacher', ar: 'اِسْمَعِ الأُسْتَاذَ', label: 'Dengarkanlah gurumu! (Isma\')', translit: 'ismaʿ al-ustādh', emoji: '👂' },
    ]
  },
  // 7. Numbers & Time
  {
    id: 'ep_7',
    category: 'numbers_time',
    categoryLabel: '⏰ Waktu & Jam Arab',
    ar_sound: 'السَّاعَةُ الثَّالِثَة',
    translit: 'as-sāʿatu th-thālithah',
    gloss: 'Pukul Tiga Tepat',
    explanation: 'Penyebutan jam menggunakan isim fa\'il bertingkat (Al-Awwal, Ats-Tsani, Ats-Tsalits). As-Sa\'atu Ats-Tsalitsah menunjukkan jam 3.',
    hint: 'Dengarkan kata bilangan urutan ketiga (tsālitsah)!',
    correctId: 'time_3',
    options: [
      { id: 'time_1', ar: 'السَّاعَةُ الوَاحِدَة', label: 'Pukul Satu (Jam 01:00)', translit: 'as-sāʿatu l-wāḥidah', emoji: '🕐' },
      { id: 'time_3', ar: 'السَّاعَةُ الثَّالِثَة', label: 'Pukul Tiga (Jam 03:00)', translit: 'as-sāʿatu th-thālithah', emoji: '🕒' },
      { id: 'time_5', ar: 'السَّاعَةُ الخَامِسَة', label: 'Pukul Lima (Jam 05:00)', translit: 'as-sāʿatu l-khāmisah', emoji: '🕔' },
    ]
  },
  // 8. Minimal Pairs (Ha Tengah Tenggorokan vs Ha Dada)
  {
    id: 'ep_8',
    category: 'minimal_pairs',
    categoryLabel: '🎯 Pasangan Minimal (ح vs هـ)',
    ar_sound: 'حَمْد',
    translit: 'ḥamd',
    gloss: 'Pujian / Syukur',
    explanation: 'Huruf Ha (ح) mengalir bersih dan berdesis renyah di tengah tenggorokan (wasathul halq), sedangkan Ha (هـ) di pangkal dada dengan bukaan nafas plong.',
    hint: 'Dengarkan gesekan nafas bersih dan renyah di tengah tenggorokan!',
    correctId: 'hamd_ha',
    options: [
      { id: 'hamd_ha', ar: 'حَمْد', label: 'Pujian (Ḥamd)', translit: 'ḥamd', emoji: '🤲' },
      { id: 'hamd_h', ar: 'هَمْد', label: 'Hancur Binasa (Hamd)', translit: 'hamd', emoji: '💥', isContrastTarget: true },
      { id: 'hadd', ar: 'حَدّ', label: 'Batasan (Ḥadd)', translit: 'ḥadd', emoji: '🚧' },
    ]
  },
  // 9. Minimal Pairs (Ta Tipis vs Tha Tebal)
  {
    id: 'ep_9',
    category: 'minimal_pairs',
    categoryLabel: '🎯 Pasangan Minimal (ت vs ط)',
    ar_sound: 'طِين',
    translit: 'ṭīn',
    gloss: 'Tanah Liat',
    explanation: 'Huruf Tha (ط) memiliki sifat Ithbaq & Isti\'la paling kuat, membuat suaranya mantap dan tebal bulat dibanding huruf Ta (ت) yang tipis datar.',
    hint: 'Dengarkan ketukan tebal berbobot yang mengangkat langit-langit mulut!',
    correctId: 'teen_tha',
    options: [
      { id: 'teen_ta', ar: 'تِين', label: 'Buah Tin (Tīn)', translit: 'tīn', emoji: '🍇', isContrastTarget: true },
      { id: 'teen_tha', ar: 'طِين', label: 'Tanah Liat (Ṭīn)', translit: 'ṭīn', emoji: '🏺' },
      { id: 'dayn', ar: 'دَيْن', label: 'Hutang (Dayn)', translit: 'dayn', emoji: '📜' },
    ]
  },
  // 10. Question Word (Ayna - Di mana)
  {
    id: 'ep_10',
    category: 'directions_commands',
    categoryLabel: '❓ Kata Tanya Lokasi (أَيْنَ)',
    ar_sound: 'أَيْنَ المَسْجِدُ؟',
    translit: 'ʾayna l-masjid?',
    gloss: 'Di manakah masjid?',
    explanation: '"Ayna" (أَيْنَ) adalah kata tanya khusus untuk menanyakan lokasi tempat atau keberadaan seseorang.',
    hint: 'Dengarkan kata tanya pertama pembuka kalimat tanya tempat!',
    correctId: 'where_mosque',
    options: [
      { id: 'where_mosque', ar: 'أَيْنَ المَسْجِدُ؟', label: 'Di manakah masjid? (Ayna)', translit: 'ʾayna l-masjid?', emoji: '🕌' },
      { id: 'who_man', ar: 'مَنْ هٰذَا الرَّجُلُ؟', label: 'Siapakah pria ini? (Man)', translit: 'man hādhā r-rajul?', emoji: '👤' },
      { id: 'what_book', ar: 'مَا هٰذَا الكِتَابُ؟', label: 'Buku apakah ini? (Mā)', translit: 'mā hādhā l-kitāb?', emoji: '📚' },
    ]
  }
];

export const EchoCaveGame: React.FC<EchoCaveProps> = ({ onClose, onReward }) => {
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isPlayingEcho, setIsPlayingEcho] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [shakeWrong, setShakeWrong] = useState<string | null>(null);
  const [audioSpeed, setAudioSpeed] = useState<number>(0.85); // Normal slightly slowed for clarity
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQ = ECHO_STAGES[qIdx];

  // Auto-play sound when question changes
  useEffect(() => {
    setSelectedId(null);
    setShowExplanation(false);
    const timer = setTimeout(() => {
      triggerEcho(currentQ.ar_sound);
    }, 450);
    return () => clearTimeout(timer);
  }, [qIdx]);

  const triggerEcho = (arabicText: string) => {
    setIsPlayingEcho(true);
    sound.speakArabic(arabicText, audioSpeed);
    setTimeout(() => {
      setIsPlayingEcho(false);
    }, 1300);
  };

  const handlePlayEcho = () => {
    sound.playTap();
    triggerEcho(currentQ.ar_sound);
  };

  const handlePlayContrast = (contrastText: string) => {
    sound.playTap();
    setIsPlayingEcho(true);
    sound.speakArabic(contrastText, audioSpeed);
    setTimeout(() => setIsPlayingEcho(false), 1200);
  };

  const handleSelectAnswer = (optionId: string) => {
    if (selectedId) return; // Prevent double taps during animation
    setSelectedId(optionId);

    if (optionId === currentQ.correctId) {
      sound.playSuccess();
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);
      setShowExplanation(true);

      const xpGain = 45 + streak * 5;
      const starGain = 2;
      GameStorage.addReward(xpGain, starGain, 'sam', 10);
      onReward(xpGain, starGain);
    } else {
      sound.playGentleRetry();
      setStreak(0);
      setShakeWrong(optionId);
      setShowExplanation(true);
      setTimeout(() => setShakeWrong(null), 600);
    }
  };

  const handleNextQuestion = () => {
    sound.playTap();
    if (qIdx < ECHO_STAGES.length - 1) {
      setQIdx(prev => prev + 1);
    } else {
      setIsDone(true);
      sound.playFanfare();
    }
  };

  const toggleSpeed = () => {
    sound.playTap();
    setAudioSpeed(prev => (prev === 0.85 ? 0.65 : 0.85));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 15 }}
        className="w-full max-w-xl bg-purple-950/90 text-white rounded-3xl shadow-2xl border-4 border-purple-500/70 overflow-hidden flex flex-col max-h-[94vh]"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900 via-violet-800 to-indigo-900 px-5 py-4 flex items-center justify-between border-b border-purple-600/50">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-400/20 text-purple-200 border border-purple-400/40">
                Lembah Istima' (IST)
              </span>
              <span className="text-xs bg-amber-400 text-amber-950 font-extrabold px-2 py-0.5 rounded-full shadow-sm">
                Trait Sam' +10
              </span>
              {streak > 1 && (
                <span className="text-xs bg-emerald-500 text-white font-extrabold px-2 py-0.5 rounded-full animate-pulse">
                  🔥 Streak x{streak}
                </span>
              )}
            </div>
            <h2 className="text-lg sm:text-xl font-bold font-chibi flex items-center gap-2 mt-1 text-purple-100">
              🦇 Echo Cave (Gua Gema Istima')
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-purple-200 hover:text-white font-bold transition-all active:scale-95"
            title="Tutup Game"
          >
            ✕
          </button>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-purple-950/60 h-2">
          <div
            className="bg-gradient-to-r from-purple-400 to-pink-400 h-full transition-all duration-300"
            style={{ width: `${((qIdx + 1) / ECHO_STAGES.length) * 100}%` }}
          />
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col overflow-y-auto">
          {!isDone ? (
            <>
              {/* Question Category & Level */}
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="font-bold text-purple-300 bg-purple-900/60 px-3 py-1 rounded-xl border border-purple-700/50">
                  {currentQ.categoryLabel}
                </span>
                <span className="text-purple-300 font-medium">
                  Soal <strong className="text-white">{qIdx + 1}</strong> dari {ECHO_STAGES.length}
                </span>
              </div>

              {/* Resonating Echo Chamber Card */}
              <div className="w-full bg-gradient-to-b from-slate-900/90 via-purple-950 to-indigo-950 rounded-2xl p-5 text-center text-white border-2 border-purple-500/60 shadow-xl mb-4 relative overflow-hidden">
                {/* Visual ripple waves */}
                {isPlayingEcho && (
                  <>
                    <motion.div
                      initial={{ scale: 0.6, opacity: 0.9 }}
                      animate={{ scale: 2.2, opacity: 0 }}
                      transition={{ repeat: Infinity, duration: 1.1, ease: 'easeOut' }}
                      className="absolute inset-0 m-auto w-32 h-32 rounded-full border-4 border-purple-400/80 pointer-events-none"
                    />
                    <motion.div
                      initial={{ scale: 0.4, opacity: 0.8 }}
                      animate={{ scale: 2.8, opacity: 0 }}
                      transition={{ repeat: Infinity, duration: 1.4, ease: 'easeOut', delay: 0.3 }}
                      className="absolute inset-0 m-auto w-32 h-32 rounded-full border-2 border-pink-400/60 pointer-events-none"
                    />
                  </>
                )}

                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-purple-800/60 border border-purple-400/40 text-purple-200 mb-2 shadow-inner">
                    <Headphones className={`w-7 h-7 ${isPlayingEcho ? 'text-pink-300 animate-bounce' : 'text-purple-300'}`} />
                  </div>

                  <h3 className="text-base font-bold text-purple-100">
                    Dengarkan Pantulan Gema Audio:
                  </h3>
                  <p className="text-xs text-purple-300/90 mt-1 max-w-sm mx-auto">
                    {currentQ.hint}
                  </p>

                  {/* Audio Controls */}
                  <div className="flex items-center justify-center gap-3 mt-4">
                    <button
                      onClick={handlePlayEcho}
                      disabled={isPlayingEcho}
                      className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 active:scale-95 text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-60"
                    >
                      <Volume2 className={`w-5 h-5 ${isPlayingEcho ? 'animate-ping' : 'animate-pulse'}`} />
                      {isPlayingEcho ? 'Sedang Bergema...' : 'Putar Ulang Gema 🔊'}
                    </button>

                    <button
                      onClick={toggleSpeed}
                      className="px-3 py-3 rounded-full bg-purple-900/80 hover:bg-purple-800 border border-purple-500/50 text-xs font-bold text-purple-200 hover:text-white flex items-center gap-1.5 transition-all"
                      title="Ubah kecepatan audio"
                    >
                      <Gauge className="w-4 h-4 text-amber-300" />
                      {audioSpeed === 0.85 ? '1.0x Normal' : '0.65x Lambat'}
                    </button>
                  </div>
                </div>
              </div>

              <p className="text-xs font-bold text-purple-200 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Pilih kartu kata dan makna yang tepat sesuai suara pantulan:
              </p>

              {/* Options */}
              <div className="grid grid-cols-1 gap-2.5 w-full">
                {currentQ.options.map((opt) => {
                  const isSelected = selectedId === opt.id;
                  const isCorrect = opt.id === currentQ.correctId;
                  const isWrong = shakeWrong === opt.id;

                  let cardStyle = 'border-purple-500/40 bg-purple-900/40 hover:bg-purple-800/50 hover:border-purple-400 text-purple-100';

                  if (selectedId) {
                    if (isCorrect) {
                      cardStyle = 'border-emerald-400 bg-emerald-950/80 text-emerald-100 shadow-lg ring-2 ring-emerald-500/40';
                    } else if (isSelected) {
                      cardStyle = 'border-rose-400 bg-rose-950/80 text-rose-100 ring-2 ring-rose-500/40';
                    } else {
                      cardStyle = 'opacity-50 border-purple-800/40 bg-purple-950/30 text-purple-300';
                    }
                  }

                  return (
                    <motion.button
                      key={opt.id}
                      onClick={() => handleSelectAnswer(opt.id)}
                      disabled={!!selectedId}
                      animate={isWrong ? { x: [-8, 8, -6, 6, 0] } : {}}
                      whileHover={!selectedId ? { scale: 1.015 } : {}}
                      whileTap={!selectedId ? { scale: 0.985 } : {}}
                      className={`p-3.5 rounded-2xl border-2 flex items-center justify-between gap-3 text-left transition-all ${cardStyle}`}
                    >
                      <div className="flex items-center gap-3.5">
                        <span className="text-3xl filter drop-shadow">{opt.emoji}</span>
                        <div>
                          <div className="text-sm font-bold text-white flex items-center gap-2">
                            <span>{opt.label}</span>
                          </div>
                          <div className="text-xs text-purple-300/80 font-mono mt-0.5">
                            translit: <span className="italic text-amber-200">{opt.translit}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-2xl font-bold font-arabic text-amber-200">
                          {opt.ar}
                        </span>
                        {opt.isContrastTarget && selectedId && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePlayContrast(opt.ar);
                            }}
                            className="mt-1 block text-[10px] bg-purple-800/80 hover:bg-purple-700 text-purple-200 px-2 py-0.5 rounded-full border border-purple-500/40"
                          >
                            🔊 Dengar {opt.ar}
                          </button>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Explanation Card when answered */}
              <AnimatePresence>
                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`mt-4 p-4 rounded-2xl border-2 text-xs leading-relaxed ${
                      selectedId === currentQ.correctId
                        ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-100'
                        : 'bg-rose-950/60 border-rose-500/60 text-rose-100'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {selectedId === currentQ.correctId ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className="font-bold text-sm mb-1">
                          {selectedId === currentQ.correctId ? 'Tepat Sekali! 🎉' : 'Hampir Benar! Coba Cermati:'}
                        </p>
                        <p className="text-purple-100/90">{currentQ.explanation}</p>

                        <div className="mt-3 flex items-center justify-end">
                          <button
                            onClick={handleNextQuestion}
                            className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all hover:brightness-105"
                          >
                            <span>Lanjut Soal Berikutnya</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            /* Results Screen */
            <div className="flex-1 flex flex-col items-center justify-center text-center p-4 my-auto">
              <motion.div
                initial={{ scale: 0.5, rotate: -15 }}
                animate={{ scale: 1, rotate: 0 }}
                className="w-24 h-24 rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center mb-4 shadow-xl border-4 border-purple-300"
              >
                <Award className="w-14 h-14" />
              </motion.div>

              <h3 className="text-2xl font-bold font-chibi text-white">
                Telinga Emas Lembah Istima'!
              </h3>
              <p className="text-xs sm:text-sm text-purple-200 mt-2 max-w-md">
                Alhamdulillah! Kamu berhasil melewati seluruh gelombang gema di Echo Cave. Kamu mampu membedakan huruf mirip, ketukan vokal mad, serta instruksi lisan bahasa Arab dengan akurasi tinggi!
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-2.5 w-full max-w-sm mt-5">
                <div className="bg-purple-900/60 p-3 rounded-2xl border border-purple-500/40 text-center">
                  <div className="text-xs text-purple-300">Skor Benar</div>
                  <div className="text-xl font-extrabold text-amber-300">{score} / {ECHO_STAGES.length}</div>
                </div>
                <div className="bg-purple-900/60 p-3 rounded-2xl border border-purple-500/40 text-center">
                  <div className="text-xs text-purple-300">XP Diperoleh</div>
                  <div className="text-xl font-extrabold text-emerald-300">+{score * 45} XP</div>
                </div>
                <div className="bg-purple-900/60 p-3 rounded-2xl border border-purple-500/40 text-center">
                  <div className="text-xs text-purple-300">Trait Sam'</div>
                  <div className="text-xl font-extrabold text-purple-200">+{score * 10}</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 mt-6 w-full max-w-xs">
                <button
                  onClick={() => {
                    sound.playTap();
                    setQIdx(0);
                    setScore(0);
                    setStreak(0);
                    setIsDone(false);
                  }}
                  className="w-full py-3 bg-purple-900/80 hover:bg-purple-800 text-purple-200 font-bold rounded-2xl border border-purple-500/50 flex items-center justify-center gap-2 text-xs active:scale-95 transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  Mainkan Lagi
                </button>
                <button
                  onClick={onClose}
                  className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-2xl shadow-lg active:scale-95 transition-all text-xs"
                >
                  Kembali ke Lembah
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
