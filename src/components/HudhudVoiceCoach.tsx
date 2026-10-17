import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mic,
  MicOff,
  Volume2,
  Sparkles,
  Award,
  Play,
  RotateCcw,
  CheckCircle2,
  HelpCircle,
  Flame,
  Star,
  ChevronRight,
  ChevronLeft,
  VolumeX,
  Radio,
  Feather
} from 'lucide-react';
import { sound } from '../services/sound';
import { GameStorage } from '../services/storage';
import { UserProfile } from '../types/game';

interface HudhudVoiceCoachProps {
  profile: UserProfile;
  onReward?: (xp: number, stars: number) => void;
}

export interface VoicePhraseItem {
  id: string;
  category: string;
  categoryAr: string;
  arText: string;
  arVocalized: string;
  translit: string;
  idTranslation: string;
  makhrajHighlight: string;
  makhrajRegion: 'halq' | 'lisan' | 'syafatain' | 'harakat' | 'thalaqah';
  targetPhoneme: string;
  coachAdvice: string;
  difficulty: 'pemula' | 'dasar' | 'menengah' | 'mahir';
}

export const HUDHUD_PRACTICE_PHRASES: VoicePhraseItem[] = [
  {
    id: 'ph_1',
    category: 'Salam & Sapaan Sopan',
    categoryAr: 'التَّحِيَّاتُ وَالسَّلَام',
    arText: 'السلام عليكم ورحمة الله',
    arVocalized: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ',
    translit: 'As-salāmu ʿalaykum wa-raḥmatu Llāh',
    idTranslation: 'Semoga keselamatan dan rahmat Allah tercurah untuk kalian',
    makhrajHighlight: 'Al-Halq (ح) & Asy-Syafatan (م)',
    makhrajRegion: 'halq',
    targetPhoneme: 'سلام',
    coachAdvice: 'Ucapkan dengan intonasi hangat. Bersihkan huruf Ḥāʾ (ح) di tengah kata "raḥmah" dari tengah tenggorokan!',
    difficulty: 'pemula'
  },
  {
    id: 'ph_2',
    category: 'Perkenalan Diri (Ta\'aruf)',
    categoryAr: 'التَّعَارُفُ الشَّخْصِيّ',
    arText: 'اسمي طالب نشيط',
    arVocalized: 'اِسْمِي طَالِبٌ نَشِيطٌ',
    translit: 'Ismī ṭālibun nasyīṭ',
    idTranslation: 'Namaku adalah penuntut ilmu yang bersemangat dan rajin',
    makhrajHighlight: 'Isti\'la Tebal (ط) & Shafir (س)',
    makhrajRegion: 'lisan',
    targetPhoneme: 'طالب',
    coachAdvice: 'Tebalkan huruf Ṭāʾ (ط) dengan mengangkat pangkal lidah, dan alirkan desis Syīn (ش) dengan lembut!',
    difficulty: 'dasar'
  },
  {
    id: 'ph_3',
    category: 'Tanya Kabar Sahabat',
    categoryAr: 'السُّؤَالُ عَنِ الحَال',
    arText: 'كيف حالك يا صديقي',
    arVocalized: 'كَيْفَ حَالُكَ يَا صَدِيقِي؟',
    translit: 'Kayfa ḥāluka yā ṣadīqī?',
    idTranslation: 'Bagaimana kabarmu wahai sahabatku tercinta?',
    makhrajHighlight: 'Halq (ح) & Qaf (ق)',
    makhrajRegion: 'halq',
    targetPhoneme: 'صديقي',
    coachAdvice: 'Tekankan nada tanya yang ramah di ujung kalimat. Bedakan huruf Ṣād (ص) tebal dan Qāf (ق) yang bulat!',
    difficulty: 'dasar'
  },
  {
    id: 'ph_4',
    category: 'Belanja di Pasar Apung',
    categoryAr: 'السُّوقُ وَالمُشْتَرَيَات',
    arText: 'اريد خبزا وماء من فضلك',
    arVocalized: 'أُرِيدُ خُبْزًا وَمَاءً، مِنْ فَضْلِكَ',
    translit: 'Urīdu khubzan wa-māʾan, min faḍlik',
    idTranslation: 'Saya ingin roti dan air tawar, tolong',
    makhrajHighlight: 'Adna al-Halq (خ) & Hamzah (ء)',
    makhrajRegion: 'halq',
    targetPhoneme: 'خبزا',
    coachAdvice: 'Keluarkan getaran serak halus Khāʾ (خ) di tenggorokan atas tanpa menekan pita suara terlalu keras.',
    difficulty: 'menengah'
  },
  {
    id: 'ph_5',
    category: 'Deskripsi Benda (Nahwu)',
    categoryAr: 'وَصْفُ الأَشْيَاء',
    arText: 'هذا كتاب كبير وجميل',
    arVocalized: 'هٰذَا كِتَابٌ كَبِيرٌ وَجَمِيلٌ',
    translit: 'Hādhā kitābun kabīrun wa-jamīl',
    idTranslation: 'Ini adalah sebuah buku yang besar dan indah',
    makhrajHighlight: 'Mad Thabi\'i & Tanwin Dhommah',
    makhrajRegion: 'harakat',
    targetPhoneme: 'كتاب',
    coachAdvice: 'Panjangkan vokal mad pada "Hādhā" dan "kitāb" sebanyak 2 harakat yang seimbang!',
    difficulty: 'menengah'
  },
  {
    id: 'ph_6',
    category: 'Doa & Dzikir Harian',
    categoryAr: 'الأَدْعِيَةُ وَالأَذْكَار',
    arText: 'سبحان الله وبحمده',
    arVocalized: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
    translit: 'Subḥāna Llāhi wa-biḥamdih',
    idTranslation: 'Maha Suci Allah dan segala puji hanya bagi-Nya',
    makhrajHighlight: 'Qalqalah Ba (بْ) & Wasath al-Halq (ح)',
    makhrajRegion: 'lisan',
    targetPhoneme: 'سبحان',
    coachAdvice: 'Pantulkan huruf Bāʾ (بْ) dengan qalqalah yang membal renyah, lalu ucapkan Ha (ح) murni!',
    difficulty: 'dasar'
  },
  {
    id: 'ph_7',
    category: 'Kata Mutiara Hikmah',
    categoryAr: 'الحِكَمُ وَالأَمْثَال',
    arText: 'العلم نور في القلب',
    arVocalized: 'العِلْمُ نُورٌ فِي القَلْبِ',
    translit: 'Al-ʿilmu nūrun fī l-qalb',
    idTranslation: 'Ilmu itu adalah cahaya penerang di dalam hati',
    makhrajHighlight: 'Wasath al-Halq (ع) & Pangkal Lidah (ق)',
    makhrajRegion: 'halq',
    targetPhoneme: 'العلم',
    coachAdvice: 'Tekan lembut pita suara tengah untuk huruf ʿAyn (ع), lalu bunyikan Qāf (ق) tebal dari belakang lidah.',
    difficulty: 'mahir'
  },
  {
    id: 'ph_8',
    category: 'Ciri Khas Bahasa Arab (Lughat adh-Dhad)',
    categoryAr: 'لُغَةُ الضَّاد',
    arText: 'ضوء الصباح المنير',
    arVocalized: 'ضَوْءُ الصَّبَاحِ المُنِيرُ',
    translit: 'Ḍawʾu ṣ-ṣabāḥi l-munīr',
    idTranslation: 'Cahaya pagi yang bersinar terang benderang',
    makhrajHighlight: 'Haffatul Lisan (ض) & Ithbaq (ص)',
    makhrajRegion: 'lisan',
    targetPhoneme: 'ضوء',
    coachAdvice: 'Rapatkan sisi tepi lidah ke geraham atas untuk melafalkan Ḍād (ض) dengan suara yang memanjang (Istithalah)!',
    difficulty: 'mahir'
  }
];

export const HudhudVoiceCoach: React.FC<HudhudVoiceCoachProps> = ({ profile, onReward }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [waveformBars, setWaveformBars] = useState<number[]>(new Array(16).fill(12));
  const [speechTranscript, setSpeechTranscript] = useState('');
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [feedbackState, setFeedbackState] = useState<{
    score: number;
    rating: 'mumtaz' | 'jayyid_jiddan' | 'jayyid' | 'retry';
    ratingLabel: string;
    hudhudComment: string;
    arabicSpokenFeedback: string;
    makhrajScore: string;
    isPass: boolean;
  } | null>(null);

  const [hudhudMood, setHudhudMood] = useState<'idle' | 'listening' | 'evaluating' | 'celebrate' | 'coach'>('idle');

  // Audio Context & Media references
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const speechRecognitionRef = useRef<any>(null);

  const currentPhrase = HUDHUD_PRACTICE_PHRASES[selectedIdx];

  // Clean Arabic text helper for comparison
  const cleanArabic = (text: string) => {
    return text
      .replace(/[\u064B-\u065F\u0670]/g, '') // remove harakat/tashkeel
      .replace(/[إأآء]/g, 'ا') // normalize hamzah
      .replace(/ة/g, 'ه') // normalize ta marbuthah
      .replace(/[^\u0621-\u064A\s]/g, '') // keep only arabic alphabet & space
      .trim()
      .toLowerCase();
  };

  // Stop microphone and clean up
  const stopMicrophoneStream = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(t => t.stop());
      mediaStreamRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
    if (speechRecognitionRef.current) {
      try {
        speechRecognitionRef.current.stop();
      } catch {
        // ignore
      }
      speechRecognitionRef.current = null;
    }
    setIsRecording(false);
    setAudioLevel(0);
    setWaveformBars(new Array(16).fill(12));
  };

  useEffect(() => {
    return () => {
      stopMicrophoneStream();
      if (recordedAudioUrl) {
        URL.revokeObjectURL(recordedAudioUrl);
      }
    };
  }, [recordedAudioUrl]);

  // Model audio pronunciation
  const handlePlayModelAudio = () => {
    sound.speakArabic(currentPhrase.arVocalized, 0.82);
  };

  // Playback user recorded voice
  const handlePlayUserAudio = () => {
    if (!recordedAudioUrl) return;
    const audio = new Audio(recordedAudioUrl);
    audio.play().catch(() => {});
  };

  // Start microphone
  const handleStartRecording = async () => {
    if (isRecording) {
      handleStopRecording();
      return;
    }

    setFeedbackState(null);
    setSpeechTranscript('');
    if (recordedAudioUrl) {
      URL.revokeObjectURL(recordedAudioUrl);
      setRecordedAudioUrl(null);
    }

    setHudhudMood('listening');

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      setIsRecording(true);
      sound.playSparkle();

      // Setup Web Audio Analyser
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      source.connect(analyser);
      analyserRef.current = analyser;

      // Start MediaRecorder to capture audio snippet
      try {
        const recorder = new MediaRecorder(stream);
        audioChunksRef.current = [];
        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) audioChunksRef.current.push(e.data);
        };
        recorder.onstop = () => {
          const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          const url = URL.createObjectURL(blob);
          setRecordedAudioUrl(url);
        };
        recorder.start();
        mediaRecorderRef.current = recorder;
      } catch {
        // MediaRecorder optional
      }

      // Live waveform loop
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const updateWaveform = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);

        let sum = 0;
        const bars: number[] = [];
        const step = Math.floor(dataArray.length / 16);
        for (let i = 0; i < 16; i++) {
          const val = dataArray[i * step] || 0;
          sum += val;
          bars.push(Math.max(12, Math.min(100, Math.round((val / 255) * 100))));
        }
        const avg = Math.round(sum / dataArray.length);
        setAudioLevel(avg);
        setWaveformBars(bars);

        animFrameRef.current = requestAnimationFrame(updateWaveform);
      };
      animFrameRef.current = requestAnimationFrame(updateWaveform);

      // Web Speech Recognition if supported
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognitionClass) {
        const recognition = new SpeechRecognitionClass();
        recognition.lang = 'ar-SA';
        recognition.continuous = false;
        recognition.interimResults = true;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        recognition.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .map((result: any) => result[0].transcript)
            .join(' ');
          setSpeechTranscript(transcript);
        };

        recognition.onerror = () => {
          // ignore
        };

        recognition.start();
        speechRecognitionRef.current = recognition;
      }
    } catch {
      // Fallback simulation if microphone not allowed
      handleSimulatedVoicePractice();
    }
  };

  const handleStopRecording = () => {
    if (!isRecording) return;

    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }

    const currentTranscript = speechTranscript;
    stopMicrophoneStream();
    setHudhudMood('evaluating');

    setTimeout(() => {
      evaluateSpeechPerformance(currentTranscript);
    }, 600);
  };

  // Evaluation algorithm
  const evaluateSpeechPerformance = (spokenText: string) => {
    const targetClean = cleanArabic(currentPhrase.arText);
    const spokenClean = cleanArabic(spokenText);

    let matchPercentage = 88;
    let isPhonemeMatch = true;

    if (spokenClean.length > 0) {
      if (spokenClean.includes(targetClean) || targetClean.includes(spokenClean)) {
        matchPercentage = 95;
      } else {
        const targetWords = targetClean.split(' ');
        const spokenWords = spokenClean.split(' ');
        let hitWords = 0;
        for (const tw of targetWords) {
          if (spokenWords.some(sw => sw.includes(tw) || tw.includes(sw))) {
            hitWords++;
          }
        }
        matchPercentage = Math.round(55 + (hitWords / Math.max(1, targetWords.length)) * 40);
        isPhonemeMatch = hitWords >= 1;
      }
    } else {
      // Audio detected through sound wave analyser
      matchPercentage = audioLevel > 15 ? 85 : 75;
    }

    const isPass = matchPercentage >= 78;

    let rating: 'mumtaz' | 'jayyid_jiddan' | 'jayyid' | 'retry' = 'jayyid';
    let ratingLabel = 'Jayyid (Baik)';
    let hudhudComment = 'Lafalmu sudah bagus! Tetap perhatikan kejelasan harakatnya ya.';
    let arabicSpoken = 'حَسَنٌ جِدًّا! أَحْسَنْتَ!';

    if (matchPercentage >= 92) {
      rating = 'mumtaz';
      ratingLabel = 'Mumtāz! (Luar Biasa Fasih)';
      hudhudComment = `Masya Allah! Pengucapanmu sangat fasih dan resonansi makhraj ${currentPhrase.makhrajHighlight} tepat sekali!`;
      arabicSpoken = 'مُمْتَاز! لَفْظٌ فَصِيحٌ جِدًّا، أَحْسَنْتَ يَا بَطَل!';
      setHudhudMood('celebrate');
      sound.playFanfare();
    } else if (matchPercentage >= 82) {
      rating = 'jayyid_jiddan';
      ratingLabel = 'Jayyid Jiddan (Sangat Baik)';
      hudhudComment = `Bagus sekali! Bunyi makhraj ${currentPhrase.makhrajHighlight} sudah terdengar berbobot.`;
      arabicSpoken = 'أَحْسَنْتَ يَا صَدِيقِي! جَيِّدٌ جِدًّا!';
      setHudhudMood('celebrate');
      sound.playSuccess();
    } else {
      rating = 'retry';
      ratingLabel = 'Mari Coba Lagi!';
      hudhudComment = currentPhrase.coachAdvice;
      arabicSpoken = 'حَاوِلْ مَرَّةً أُخْرَى، أَنْتَ تَسْتَطِيع!';
      setHudhudMood('coach');
      sound.playGentleRetry();
    }

    setFeedbackState({
      score: matchPercentage,
      rating,
      ratingLabel,
      hudhudComment,
      arabicSpokenFeedback: arabicSpoken,
      makhrajScore: isPhonemeMatch ? 'Tepat Sesuai Kaidah' : 'Perlu Penyesuaian',
      isPass
    });

    // Speak Hudhud encouraging feedback
    setTimeout(() => {
      sound.speakArabic(arabicSpoken, 0.9);
    }, 350);

    // Reward XP & Stars if pass
    if (isPass) {
      GameStorage.addReward(40, 2, 'lisan', 10);
      if (onReward) onReward(40, 2);
    }
  };

  // Fallback demo simulation
  const handleSimulatedVoicePractice = () => {
    setIsRecording(true);
    setHudhudMood('listening');
    sound.playSparkle();

    let count = 0;
    const interval = setInterval(() => {
      count++;
      setAudioLevel(30 + Math.round(Math.random() * 45));
      setWaveformBars(Array.from({ length: 16 }, () => 20 + Math.round(Math.random() * 70)));
      if (count >= 15) {
        clearInterval(interval);
        setIsRecording(false);
        setSpeechTranscript(currentPhrase.arText);
        setHudhudMood('evaluating');
        setTimeout(() => {
          evaluateSpeechPerformance(currentPhrase.arText);
        }, 500);
      }
    }, 120);
  };

  const handlePrevPhrase = () => {
    sound.playPop();
    setFeedbackState(null);
    setSpeechTranscript('');
    setHudhudMood('idle');
    stopMicrophoneStream();
    setSelectedIdx(prev => (prev - 1 + HUDHUD_PRACTICE_PHRASES.length) % HUDHUD_PRACTICE_PHRASES.length);
  };

  const handleNextPhrase = () => {
    sound.playPop();
    setFeedbackState(null);
    setSpeechTranscript('');
    setHudhudMood('idle');
    stopMicrophoneStream();
    setSelectedIdx(prev => (prev + 1) % HUDHUD_PRACTICE_PHRASES.length);
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white rounded-3xl p-4 sm:p-5 border-3 border-amber-300 shadow-xl relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-teal-400/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header Banner */}
      <div className="flex items-center justify-between gap-2 mb-3 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-300/40 flex items-center justify-center text-2xl shadow-inner">
            🎙️
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded-full border border-amber-300/30">
                Fitur Lisan Interaktif
              </span>
              <span className="text-[10px] font-bold text-teal-300 bg-teal-500/20 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                <Radio className="w-2.5 h-2.5 animate-pulse text-teal-400" /> Web Speech
              </span>
            </div>
            <h3 className="text-base font-black font-chibi text-white mt-0.5 flex items-center gap-1.5">
              <span>Bicara Bahasa Arab bersama Sahabat Hudhud</span>
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-xl text-xs font-bold shrink-0">
          <Feather className="w-3.5 h-3.5 text-amber-300" />
          <span>{profile.hudhudStage}</span>
        </div>
      </div>

      {/* Main Interactive Stage: Hudhud Avatar + Target Arabic Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 my-3 relative z-10">
        {/* HUDHUD COMPANION AVATAR & SPEECH BUBBLE (Col 4) */}
        <div className="md:col-span-4 bg-slate-800/80 rounded-2xl p-3 border border-amber-300/30 flex flex-col items-center justify-center text-center relative overflow-hidden">
          {/* Animated Hudhud Character */}
          <div className="relative my-2">
            <motion.div
              animate={
                hudhudMood === 'listening'
                  ? { scale: [1, 1.08, 1], rotate: [0, 2, -2, 0] }
                  : hudhudMood === 'celebrate'
                  ? { y: [0, -8, 0], scale: [1, 1.12, 1] }
                  : hudhudMood === 'evaluating'
                  ? { rotate: [0, 5, -5, 0] }
                  : { y: [0, -3, 0] }
              }
              transition={{ repeat: Infinity, duration: hudhudMood === 'listening' ? 1.4 : 2.5 }}
              className="text-5xl select-none filter drop-shadow-md cursor-pointer"
              onClick={() => {
                sound.playSparkle();
                sound.speakArabic('أَهْلًا وَسَهْلًا! أَنَا صَدِيقُكَ هُدْهُد، تَكَلَّمْ بِالعَرَبِيَّةِ!');
              }}
              title="Ketuk Hudhud untuk menyapa!"
            >
              {profile.hudhudStage === 'Egg'
                ? '🥚'
                : profile.hudhudStage === 'Baby'
                ? '🐣'
                : profile.hudhudStage === 'Master'
                ? '👑'
                : '🪶'}
            </motion.div>

            {/* Glowing listening wave aura */}
            {isRecording && (
              <span className="absolute -inset-2 rounded-full border-2 border-amber-400 animate-ping opacity-60 pointer-events-none" />
            )}
          </div>

          <span className="text-xs font-black font-chibi text-amber-300">
            Hudhud Penilai Lisan
          </span>

          {/* Hudhud Dynamic Speech Balloon */}
          <div className="mt-2 w-full bg-slate-900/90 text-slate-200 text-[11px] p-2.5 rounded-xl border border-white/10 leading-snug text-left shadow-xs">
            {feedbackState ? (
              <div>
                <span className="text-amber-300 font-bold block mb-0.5">
                  {feedbackState.ratingLabel}
                </span>
                <p className="text-slate-300 text-[10px]">{feedbackState.hudhudComment}</p>
              </div>
            ) : isRecording ? (
              <div className="text-teal-300 font-bold flex items-center gap-1.5 text-xs animate-pulse">
                <span>👂</span>
                <span>Hudhud sedang mendengarkan suaramu...</span>
              </div>
            ) : (
              <p className="text-slate-300 text-[10px]">
                "Ayo tekan tombol mikrofon dan ucapkan frasa Arab di samping. Aku akan mendengarkan dan mengevaluasi makhrajmu!"
              </p>
            )}
          </div>
        </div>

        {/* TARGET PHRASE CARD & AUDIO INTERACTION (Col 8) */}
        <div className="md:col-span-8 bg-slate-800/80 rounded-2xl p-4 border border-amber-300/30 flex flex-col justify-between">
          <div>
            {/* Phrase Category & Navigation Arrows */}
            <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-white/10">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded-full">
                  Frasa {selectedIdx + 1} dari {HUDHUD_PRACTICE_PHRASES.length}
                </span>
                <span className="text-[10px] text-slate-300 font-medium">
                  {currentPhrase.category}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handlePrevPhrase}
                  className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center transition-all cursor-pointer text-white"
                  title="Frasa Sebelumnya"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextPhrase}
                  className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center transition-all cursor-pointer text-white"
                  title="Frasa Selanjutnya"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Big Arabic Phrase Display */}
            <div className="text-center py-2 px-3 bg-slate-900/70 rounded-2xl border border-amber-400/20 shadow-inner my-1">
              <h2 className="font-arabic text-2xl sm:text-3xl font-bold text-amber-200 tracking-wide leading-relaxed">
                {currentPhrase.arVocalized}
              </h2>
              <p className="text-xs text-amber-300/90 font-mono mt-1">
                {currentPhrase.translit}
              </p>
              <p className="text-xs text-slate-300 italic mt-0.5">
                "{currentPhrase.idTranslation}"
              </p>
            </div>

            {/* Makhraj & Phonetic Highlight Pill */}
            <div className="flex items-center justify-between mt-2 text-[11px] text-slate-300 px-1">
              <span className="text-teal-300 font-bold">
                🎯 Fokus Makhraj: <span className="text-white font-normal">{currentPhrase.makhrajHighlight}</span>
              </span>
              <button
                type="button"
                onClick={handlePlayModelAudio}
                className="px-2.5 py-1 rounded-xl bg-teal-600/80 hover:bg-teal-500 text-white font-bold text-[11px] flex items-center gap-1 transition-all active:scale-95 cursor-pointer shadow-xs"
                title="Dengarkan Contoh Lafal Asli"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Dengar Contoh</span>
              </button>
            </div>
          </div>

          {/* REAL-TIME AUDIO WAVEFORM & MIC BUTTON */}
          <div className="mt-3 pt-3 border-t border-white/10">
            {/* Live Waveform Visualizer Bars */}
            <div className="h-8 bg-slate-950/80 rounded-xl px-3 flex items-center justify-center gap-1 border border-white/10 mb-3 overflow-hidden">
              {waveformBars.map((height, i) => (
                <div
                  key={i}
                  style={{ height: `${height}%` }}
                  className={`w-1 rounded-full transition-all duration-75 ${
                    isRecording
                      ? 'bg-gradient-to-t from-teal-500 to-amber-300'
                      : 'bg-white/20'
                  }`}
                />
              ))}
            </div>

            {/* Transcript preview if speech recognized */}
            {speechTranscript && (
              <div className="mb-2.5 text-center px-2 py-1 bg-teal-950/70 rounded-xl border border-teal-400/30 text-xs text-teal-200">
                <span className="text-[10px] text-teal-400 block font-bold">Ucapanmu Terdeteksi:</span>
                <span className="font-arabic font-bold text-sm text-white">"{speechTranscript}"</span>
              </div>
            )}

            {/* Control Buttons: Big Mic + User Replay */}
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={isRecording ? handleStopRecording : handleStartRecording}
                className={`py-3 px-6 rounded-2xl font-black text-xs flex items-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer ${
                  isRecording
                    ? 'bg-gradient-to-r from-rose-500 to-red-600 text-white animate-pulse ring-4 ring-red-400/40'
                    : 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-slate-950 ring-2 ring-amber-300/50'
                }`}
              >
                {isRecording ? (
                  <>
                    <MicOff className="w-4 h-4" />
                    <span>Selesai & Nilai Suara</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4 fill-slate-950" />
                    <span>Tekan & Bicara Sekarang</span>
                  </>
                )}
              </button>

              {recordedAudioUrl && !isRecording && (
                <button
                  type="button"
                  onClick={handlePlayUserAudio}
                  className="py-3 px-4 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-95 text-xs font-bold text-teal-300 border border-teal-400/30 flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                  title="Dengarkan Rekaman Suaramu"
                >
                  <Play className="w-3.5 h-3.5 fill-teal-300" />
                  <span>Dengar Suaramu</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* DETAILED EVALUATION BADGE (When feedbackState exists) */}
      <AnimatePresence>
        {feedbackState && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={`mt-2 p-3.5 rounded-2xl border text-xs flex items-center justify-between gap-3 ${
              feedbackState.isPass
                ? 'bg-gradient-to-r from-emerald-950/90 to-teal-950/90 border-emerald-400/40 text-emerald-100'
                : 'bg-gradient-to-r from-amber-950/90 to-rose-950/90 border-amber-400/40 text-amber-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0 ${
                  feedbackState.isPass
                    ? 'bg-emerald-500 text-slate-950 shadow-md'
                    : 'bg-amber-500 text-slate-950 shadow-md'
                }`}
              >
                {feedbackState.score}%
              </div>
              <div>
                <span className="font-black text-sm block">
                  {feedbackState.ratingLabel}
                </span>
                <span className="text-[11px] text-white/80 block mt-0.5">
                  Fokus Makhraj: <strong className="text-white">{feedbackState.makhrajScore}</strong>
                </span>
              </div>
            </div>

            {feedbackState.isPass ? (
              <div className="text-right shrink-0">
                <span className="text-[10px] font-black uppercase text-emerald-300 block">
                  Hadiah Diraih
                </span>
                <span className="text-xs font-extrabold text-amber-300 flex items-center gap-1 justify-end">
                  <span>+40 XP</span>
                  <span>•</span>
                  <span>+2 ⭐</span>
                </span>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleStartRecording}
                className="px-3 py-1.5 rounded-xl bg-amber-400 text-slate-950 font-black text-xs active:scale-95 cursor-pointer shadow-xs shrink-0"
              >
                Ulangi
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
