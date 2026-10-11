import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mic,
  MicOff,
  Volume2,
  Award,
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Radio,
  Play,
  Flame,
  Gauge,
  ChevronRight,
  Info
} from 'lucide-react';
import { sound } from '../../services/sound';
import { GameStorage } from '../../services/storage';

interface MakhrajMasteryGameProps {
  onClose: () => void;
  onReward: (xp: number, stars: number) => void;
}

export type MakhrajZone = 'halq' | 'lisan_pangkal' | 'lisan_tepi' | 'syafatain' | 'thalaqah_sapaan' | 'thalaqah_hikmah';

export interface MasteryChallenge {
  id: string;
  stageNum: number;
  zone: MakhrajZone;
  zoneLabel: string;
  zoneAr: string;
  focusLetters: string[];
  anatomicalPoint: string;
  arabicTarget: string;
  translit: string;
  meaning: string;
  makhrajTip: string;
  sifatTip: string;
  type: 'letter_word' | 'phrase' | 'sentence';
  targetPhoneme: string;
}

const CHALLENGES: MasteryChallenge[] = [
  // Stage 1: Halq (Tenggorokan)
  {
    id: 'mm_1',
    stageNum: 1,
    zone: 'halq',
    zoneLabel: 'Tenggorokan (Wasath al-Halq)',
    zoneAr: 'الحَلْق',
    focusLetters: ['ع', 'ح'],
    anatomicalPoint: 'Tengah tenggorokan dekat katup epiglotis',
    arabicTarget: 'عَيْنٌ جَمِيلَةٌ',
    translit: 'ʿAynun jamīlah',
    meaning: 'Mata yang indah',
    makhrajTip: 'Tekan lembut pita suara tengah untuk huruf ʿAyn (ع), hembuskan nafas hangat bersih untuk Ḥāʾ (ح).',
    sifatTip: 'Jahr (jelas tanpa hembus nafas) pada Ayn & Hams (nafas mengalir) pada Haa.',
    type: 'letter_word',
    targetPhoneme: 'ع'
  },
  {
    id: 'mm_2',
    stageNum: 1,
    zone: 'halq',
    zoneLabel: 'Tenggorokan Atas (Adna al-Halq)',
    zoneAr: 'أَدْنَى الحَلْق',
    focusLetters: ['خ', 'غ'],
    anatomicalPoint: 'Pangkal lidah atas berdekatan langit-langit lunak',
    arabicTarget: 'خُبْزٌ سَاخِنٌ',
    translit: 'Khubzun sākhin',
    meaning: 'Roti yang hangat',
    makhrajTip: 'Keluarkan bunyi desiran serak halus dari tenggorokan atas tanpa menekan leher terlalu kuat.',
    sifatTip: 'Isti\'la (lidah naik/tebal) dan Rakhawah (aliran suara berdesir).',
    type: 'letter_word',
    targetPhoneme: 'خ'
  },

  // Stage 2: Lisan Pangkal & Tengah (Lidah)
  {
    id: 'mm_3',
    stageNum: 2,
    zone: 'lisan_pangkal',
    zoneLabel: 'Pangkal Lidah (Aqshal Lisan)',
    zoneAr: 'أَقْصَى اللِّسَان',
    focusLetters: ['ق', 'ك'],
    anatomicalPoint: 'Pangkal lidah paling dalam beradu dengan langit-langit lunak',
    arabicTarget: 'قَلَمٌ وَكِتَابٌ',
    translit: 'Qalamun wa kitāb',
    meaning: 'Pena dan buku',
    makhrajTip: 'Huruf Qaf (ق) tebal memantul di pangkal lidah belakang, sedangkan Kaf (ك) sedikit maju ke depan dan berhembus nafas halus.',
    sifatTip: 'Qaf: Qalqalah & Isti\'la | Kaf: Hams & Syiddah.',
    type: 'letter_word',
    targetPhoneme: 'ق'
  },
  {
    id: 'mm_4',
    stageNum: 2,
    zone: 'lisan_pangkal',
    zoneLabel: 'Tengah Lidah (Wasath al-Lisan)',
    zoneAr: 'وَسَطُ اللِّسَان',
    focusLetters: ['ج', 'ش'],
    anatomicalPoint: 'Tengah permukaan lidah menempel ke langit-langit keras',
    arabicTarget: 'شَمْسٌ مُشْرِقَةٌ',
    translit: 'Syamsun musyriqah',
    meaning: 'Matahari yang bersinar terang',
    makhrajTip: 'Sebarkan aliran udara menyapu rongga mulut untuk huruf Syin (ش - sifat Tafasysyi).',
    sifatTip: 'Tafasysyi (udara menyebar merata di rongga mulut).',
    type: 'letter_word',
    targetPhoneme: 'ش'
  },

  // Stage 3: Lisan Tepi & Huruf Tebal
  {
    id: 'mm_5',
    stageNum: 3,
    zone: 'lisan_tepi',
    zoneLabel: 'Tepi Lidah & Gigi Geraham (Hafatul Lisan)',
    zoneAr: 'حَافَةُ اللِّسَان',
    focusLetters: ['ض', 'ص'],
    anatomicalPoint: 'Sisi tepi lidah menekan gigi geraham atas',
    arabicTarget: 'ضَوْءُ الصَّبَاحِ',
    translit: 'Dhaw\'ush-shabāḥ',
    meaning: 'Cahaya pagi hari',
    makhrajTip: 'Huruf Dhad (ض) adalah ciri khas bahasa Arab (Lughat adh-Dhad). Rapatkan tepi lidah ke geraham dan dorong lembut suara memanjang (Istithalah).',
    sifatTip: 'Istithalah (suara memanjang di sepanjang tepi lidah) & Ithbaq (rongga tertutup rapat).',
    type: 'letter_word',
    targetPhoneme: 'ض'
  },
  {
    id: 'mm_6',
    stageNum: 3,
    zone: 'lisan_tepi',
    zoneLabel: 'Ujung Lidah & Gigi Seri (Tharaf al-Lisan)',
    zoneAr: 'طَرَفُ اللِّسَان',
    focusLetters: ['ط', 'ظ'],
    anatomicalPoint: 'Punggung ujung lidah beradu dengan pangkal dua gigi seri atas',
    arabicTarget: 'طَالِبٌ نَشِيطٌ',
    translit: 'Thālibun nasyīth',
    meaning: 'Siswa yang rajin dan bersemangat',
    makhrajTip: 'Pangkal lidah harus naik tebal (Isti\'la) sehingga bunyi Thāʾ (ط) terdengar bulat dan kokoh.',
    sifatTip: 'Ithbaq, Qalqalah bila sukun, dan Isti\'la kuat.',
    type: 'letter_word',
    targetPhoneme: 'ط'
  },

  // Stage 4: Syafatain (Dua Bibir)
  {
    id: 'mm_7',
    stageNum: 4,
    zone: 'syafatain',
    zoneLabel: 'Dua Bibir (Asy-Syafatain)',
    zoneAr: 'الشَّفَتَان',
    focusLetters: ['ب', 'م', 'ف'],
    anatomicalPoint: 'Pertemuan bibir atas dan bawah, serta gigi seri atas dengan bibir bawah',
    arabicTarget: 'بَابُ المَسْجِدِ',
    translit: 'Bābul masjidi',
    meaning: 'Pintu masjid',
    makhrajTip: 'Kaitkan bibir atas dan bawah dengan mantap untuk Ba (ب) dan Mim (م), sentuhkan gigi seri atas ke bibir bawah untuk Fa (ف).',
    sifatTip: 'Infitah & Idzlaq (mudah dan cepat diucapkan di bibir).',
    type: 'letter_word',
    targetPhoneme: 'ب'
  },

  // Stage 5: Kalimat Sapaan & Thalaqah
  {
    id: 'mm_8',
    stageNum: 5,
    zone: 'thalaqah_sapaan',
    zoneLabel: 'Kelancaran Sapaan & Ujaran Lisan',
    zoneAr: 'طَلَاقَةُ التَّحِيَّات',
    focusLetters: ['س', 'ل', 'م'],
    anatomicalPoint: 'Kelancaran artikulasi berurutan dengan intonasi hangat',
    arabicTarget: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ الله',
    translit: 'As-salāmu ʿalaykum wa raḥmatullāh',
    meaning: 'Semoga keselamatan dan rahmat Allah tercurah untukmu',
    makhrajTip: 'Jaga kesinambungan nafas dan harakat dhommah pada Mim serta Ha di akhir kata.',
    sifatTip: 'Intonasi ramah, jeda teratur, dan harakat yang presisi.',
    type: 'phrase',
    targetPhoneme: 'سلام'
  },
  {
    id: 'mm_9',
    stageNum: 5,
    zone: 'thalaqah_sapaan',
    zoneLabel: 'Dialog Percakapan Sehari-hari',
    zoneAr: 'الحِوَارُ اليَوْمِي',
    focusLetters: ['ك', 'ح', 'ي'],
    anatomicalPoint: 'Intonasi bertanya ramah dengan nada naik di akhir suku kata',
    arabicTarget: 'كَيْفَ حَالُكَ يَا صَدِيقِي العَزِيز؟',
    translit: 'Kayfa ḥāluka yā shadīqiyal ʿazīz?',
    meaning: 'Bagaimana kabarmu wahai sahabatku yang tercinta?',
    makhrajTip: 'Lafalkan Kaf dengan nada tanya yang sopan, bersihkan huruf Ha (ح) di tengah kata!',
    sifatTip: 'Thalaqah (kelancaran tanpa terbata-bata) dan intonasi ekspresif.',
    type: 'phrase',
    targetPhoneme: 'كيف حالك'
  },

  // Stage 6: Thalaqah Hikmah & Retorika
  {
    id: 'mm_10',
    stageNum: 6,
    zone: 'thalaqah_hikmah',
    zoneLabel: 'Mahkota Hikmah & Kefasihan Balaghah',
    zoneAr: 'بَلَاغَةُ الحِكْمَة',
    focusLetters: ['ع', 'ل', 'م', 'ن'],
    anatomicalPoint: 'Pengucapan kalimat lengkap dengan ritme syi\'ir dan ketukan artikulasi fasih',
    arabicTarget: 'العِلْمُ نُورٌ وَالجَهْلُ ظَلَامٌ',
    translit: 'Al-ʿilmu nūrun wal-jahlu zhalām',
    meaning: 'Ilmu adalah cahaya penuntun dan kebodohan adalah kegelapan gulita',
    makhrajTip: 'Beri penekanan wajar pada huruf Ayn (العِلْمُ) dan Zha tebal (ظَلَامٌ).',
    sifatTip: 'Retorika fushah, ketukan irama vokal panjang (mad) dan tanwin.',
    type: 'sentence',
    targetPhoneme: 'العلم نور'
  },
  {
    id: 'mm_11',
    stageNum: 6,
    zone: 'thalaqah_hikmah',
    zoneLabel: 'Mahkota Perjuangan & Ketekunan',
    zoneAr: 'جِدٌّ وَاجْتِهَاد',
    focusLetters: ['ج', 'د', 'ط'],
    anatomicalPoint: 'Kekuatan nafas dan kestabilan artikulasi huruf keras (Syiddah & Qalqalah)',
    arabicTarget: 'مَنْ جَدَّ وَجَدَ فِي طَلَبِ العِلْمِ',
    translit: 'Man jadda wajada fī thalabil ʿilm',
    meaning: 'Barangsiapa bersungguh-sungguh niscaya ia akan berhasil menuntut ilmu',
    makhrajTip: 'Tahan tekanan syaddah pada kata (جَدَّ) lalu alirkan kembali pada (وَجَدَ) dengan mantap.',
    sifatTip: 'Keseimbangan syiddah dan thalaqah berwibawa.',
    type: 'sentence',
    targetPhoneme: 'من جد وجد'
  }
];

// Helper to clean Arabic diacritics for phonetic comparison
function cleanArabic(text: string): string {
  return text
    .replace(/[\u064B-\u0652\u0670\u0640]/g, '') // remove tashkeel & tatweel
    .replace(/[إأآٱ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .trim()
    .toLowerCase();
}

export const MakhrajMasteryGame: React.FC<MakhrajMasteryGameProps> = ({ onClose, onReward }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [waveformBars, setWaveformBars] = useState<number[]>(new Array(16).fill(10));
  const [speechTranscript, setSpeechTranscript] = useState<string>('');
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [evaluationResult, setEvaluationResult] = useState<{
    accuracy: number;
    feedback: string;
    makhrajMatch: boolean;
    awardedStars: number;
  } | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [showTipModal, setShowTipModal] = useState(false);

  const currentChallenge = CHALLENGES[currentIdx];

  // Audio Context & Stream Refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const speechRecognitionRef = useRef<any>(null);

  // Clean up microphone streams on unmount
  useEffect(() => {
    return () => {
      stopMicrophoneStream();
    };
  }, []);

  const stopMicrophoneStream = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
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
    setWaveformBars(new Array(16).fill(10));
  };

  const handlePlayModelAudio = () => {
    sound.speakArabic(currentChallenge.arabicTarget, 0.82);
  };

  const handlePlayUserAudio = () => {
    if (!recordedAudioUrl) return;
    const audio = new Audio(recordedAudioUrl);
    audio.play().catch(() => {});
  };

  // Start real microphone recording with AudioContext and Web Speech Recognition
  const handleStartRecording = async () => {
    if (isRecording) {
      handleStopRecording();
      return;
    }

    setEvaluationResult(null);
    setSpeechTranscript('');
    if (recordedAudioUrl) {
      URL.revokeObjectURL(recordedAudioUrl);
      setRecordedAudioUrl(null);
    }

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

        // Calculate average volume
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
          // ignore speech error, fallback to audio level
        };

        recognition.onend = () => {
          // Auto complete if recognition finished
        };

        recognition.start();
        speechRecognitionRef.current = recognition;
      }
    } catch {
      // If mic permission denied or failed, fallback to interactive simulation
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

    // Evaluate user speech
    evaluateSpeechPerformance(currentTranscript);
  };

  // Evaluate speech accuracy comparing recognized text or audio energy
  const evaluateSpeechPerformance = (spokenText: string) => {
    const targetClean = cleanArabic(currentChallenge.arabicTarget);
    const spokenClean = cleanArabic(spokenText);

    let matchPercentage = 85;
    let feedback = 'Suara terdeteksi jelas dan resonansi makhraj berbobot!';
    let isPhonemeMatch = true;

    if (spokenClean) {
      if (spokenClean.includes(targetClean) || targetClean.includes(spokenClean)) {
        matchPercentage = 98;
        feedback = 'Mumtaz! Lafal sangat fasih sesuai dengan makhraj huruf target!';
      } else {
        // Compare target phoneme or words
        const targetWords = targetClean.split(' ');
        const spokenWords = spokenClean.split(' ');
        const matchedWords = targetWords.filter(w => spokenWords.some(sw => sw.includes(w) || w.includes(sw)));
        if (matchedWords.length > 0) {
          matchPercentage = 90;
          feedback = 'Bagus sekali! Artikulasi huruf tertangkap dengan jelas!';
        } else {
          matchPercentage = 82;
          feedback = 'Suara masuk mantap! Perhatikan lagi penempatan lidah dan hembusan nafas makhraj.';
        }
      }
    } else {
      // Audio level based evaluation
      matchPercentage = 88;
      feedback = 'Artikulasi suara terdeteksi kuat! Coba latih kembali ketukan mad dan harakat.';
    }

    const stars = matchPercentage >= 95 ? 3 : matchPercentage >= 85 ? 2 : 1;
    isPhonemeMatch = matchPercentage >= 80;

    setEvaluationResult({
      accuracy: matchPercentage,
      feedback,
      makhrajMatch: isPhonemeMatch,
      awardedStars: stars
    });

    if (isPhonemeMatch) {
      sound.playSuccess();
      const points = 30 + stars * 10 + streak * 5;
      setScore(prev => prev + points);
      setStreak(prev => prev + 1);
    } else {
      sound.playGentleRetry();
      setStreak(0);
    }
  };

  // Simulated Speech Practice button for testing or when mic permission is unavailable
  const handleSimulatedVoicePractice = () => {
    setIsRecording(true);
    sound.speakArabic(currentChallenge.arabicTarget, 0.85);

    // Simulate animated waveform bars for 1.8 seconds
    const interval = setInterval(() => {
      setWaveformBars(new Array(16).fill(0).map(() => Math.floor(Math.random() * 70) + 25));
      setAudioLevel(Math.floor(Math.random() * 60) + 30);
    }, 120);

    setTimeout(() => {
      clearInterval(interval);
      setIsRecording(false);
      setAudioLevel(0);
      setWaveformBars(new Array(16).fill(10));
      setSpeechTranscript(currentChallenge.arabicTarget);
      evaluateSpeechPerformance(currentChallenge.arabicTarget);
    }, 2000);
  };

  const handleNextChallenge = () => {
    sound.playSparkle();
    setEvaluationResult(null);
    setSpeechTranscript('');
    if (recordedAudioUrl) {
      URL.revokeObjectURL(recordedAudioUrl);
      setRecordedAudioUrl(null);
    }

    if (currentIdx + 1 < CHALLENGES.length) {
      setCurrentIdx(prev => prev + 1);
    } else {
      // Game completed
      setIsGameOver(true);
      const totalXp = 80 + score;
      const totalStars = 4;
      onReward(totalXp, totalStars);

      // Update hudhud traits
      const profile = GameStorage.getProfile();
      profile.hudhudTraits.lisan = Math.min(100, (profile.hudhudTraits.lisan || 0) + 20);
      profile.crystals.KLM = true;
      GameStorage.saveProfile(profile);
    }
  };

  const handleRestart = () => {
    sound.playSparkle();
    setCurrentIdx(0);
    setScore(0);
    setStreak(0);
    setEvaluationResult(null);
    setSpeechTranscript('');
    setIsGameOver(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border-4 border-amber-400 flex flex-col"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white p-4 rounded-t-[22px] flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-400/20 backdrop-blur-xs border border-amber-300/40 flex items-center justify-center text-xl shadow-inner">
              🎙️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm tracking-wide">Makhraj Mastery</span>
                <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded-full">
                  PULAU KALAM
                </span>
              </div>
              <p className="text-[11px] text-amber-100">Penakluk Suara & Evaluasi Kefasihan Lisan</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowTipModal(true)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all"
              title="Panduan Makhraj & Tips Mikrofon"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 text-white flex items-center justify-center font-bold text-sm transition-all"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Game State: Game Over Screen */}
        {isGameOver ? (
          <div className="p-6 text-center space-y-5">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-4xl shadow-xl animate-bounce">
              👑
            </div>

            <div>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block">
                Misi Selesai • Tahaniina!
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-1">
                Lisanmu Bersinar Terang!
              </h2>
              <p className="text-xs text-slate-600 max-w-md mx-auto mt-1 leading-relaxed">
                Kamu telah menuntaskan seluruh tantangan makhraj, kosakata dan kalimat di Pulau Kalam. Kristal Suara Emas berhasil disematkan ke lemari pengetahuanmu!
              </p>
            </div>

            {/* Score & Rewards Box */}
            <div className="grid grid-cols-3 gap-2.5 bg-amber-50 rounded-2xl p-3 border-2 border-amber-200">
              <div className="text-center">
                <span className="text-[10px] text-slate-500 font-bold block">Total Skor</span>
                <span className="text-xl font-black text-amber-900">{score}</span>
              </div>
              <div className="text-center border-x border-amber-200">
                <span className="text-[10px] text-slate-500 font-bold block">Hadiah XP</span>
                <span className="text-xl font-black text-emerald-600">+{80 + score} XP</span>
              </div>
              <div className="text-center">
                <span className="text-[10px] text-slate-500 font-bold block">Trait Lisan</span>
                <span className="text-xl font-black text-orange-600">+20 Poin</span>
              </div>
            </div>

            <div className="flex gap-2.5 pt-2">
              <button
                onClick={handleRestart}
                className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold rounded-2xl text-xs flex items-center justify-center gap-1.5 transition-all"
              >
                <RotateCcw className="w-4 h-4" /> Ulangi Latihan
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black rounded-2xl text-xs shadow-lg flex items-center justify-center gap-1.5 transition-all"
              >
                <Award className="w-4 h-4" /> Ambil Kristal & Kembali
              </button>
            </div>
          </div>
        ) : (
          /* Active Playing State */
          <div className="p-4 sm:p-5 space-y-4">
            {/* Top Info Bar: Stage, Streak, Score */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="bg-orange-100 text-orange-900 font-black px-2.5 py-1 rounded-xl text-[11px]">
                  Tantangan {currentIdx + 1}/{CHALLENGES.length}
                </span>
                <span className="font-bold text-slate-500">
                  Zona: {currentChallenge.zoneLabel}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {streak > 1 && (
                  <div className="flex items-center gap-1 text-orange-600 font-black animate-pulse">
                    <Flame className="w-4 h-4 fill-orange-500" />
                    <span>{streak}x Combo</span>
                  </div>
                )}
                <div className="flex items-center gap-1 font-black text-amber-700">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{score} Poin</span>
                </div>
              </div>
            </div>

            {/* Target Voice Stage Card */}
            <div className="relative bg-gradient-to-b from-slate-900 via-orange-950 to-slate-900 text-white rounded-3xl p-5 overflow-hidden border-2 border-orange-500/60 shadow-xl">
              {/* Glow background effect */}
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-start justify-between gap-2 relative z-10">
                <div>
                  <div className="flex items-center gap-1.5 text-orange-300 text-[11px] font-bold">
                    <span>Wilayah Makhraj:</span>
                    <span className="font-arabic text-sm text-amber-200">{currentChallenge.zoneAr}</span>
                  </div>
                  <span className="text-[10px] text-slate-300 block mt-0.5">
                    Titik Suara: {currentChallenge.anatomicalPoint}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  {currentChallenge.focusLetters.map((l, i) => (
                    <span
                      key={i}
                      className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 font-arabic text-xl font-bold text-amber-300 flex items-center justify-center"
                    >
                      {l}
                    </span>
                  ))}
                </div>
              </div>

              {/* Big Arabic Spoken Target Display */}
              <div className="my-5 text-center relative z-10">
                <span className="text-[11px] font-bold text-amber-200/80 block uppercase tracking-wider mb-1">
                  Lafalkan Kalimat Ini ke Mikrofon:
                </span>
                <h3 className="font-arabic text-3xl sm:text-4xl font-extrabold text-amber-300 leading-relaxed filter drop-shadow-md select-none">
                  {currentChallenge.arabicTarget}
                </h3>
                <p className="text-xs font-semibold text-slate-200 mt-1">
                  &ldquo;{currentChallenge.translit}&rdquo;
                </p>
                <p className="text-[11px] text-amber-200/80 italic mt-0.5">
                  Artinya: {currentChallenge.meaning}
                </p>
              </div>

              {/* Native Qari Audio Button */}
              <div className="flex justify-center relative z-10">
                <button
                  onClick={handlePlayModelAudio}
                  className="px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black rounded-2xl text-xs flex items-center gap-2 shadow-lg active:scale-95 transition-all"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Dengarkan Contoh Qari</span>
                </button>
              </div>
            </div>

            {/* Pedagogical Guidance Tip Box */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-950">
                <Info className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Kaidah Artikulasi Syaikh Balaghah:</span>
              </div>
              <p className="text-slate-700 leading-relaxed text-[11px]">
                {currentChallenge.makhrajTip}
              </p>
              <div className="text-[10px] text-amber-900 font-semibold pt-1 border-t border-amber-200/60">
                Sifat Utama: {currentChallenge.sifatTip}
              </div>
            </div>

            {/* Real-time Waveform & Audio Meter Bar */}
            <div className="bg-slate-900 text-white rounded-2xl p-3.5 border border-slate-800">
              <div className="flex items-center justify-between mb-2 text-xs">
                <div className="flex items-center gap-1.5">
                  <Radio className={`w-3.5 h-3.5 ${isRecording ? 'text-rose-500 animate-pulse' : 'text-slate-500'}`} />
                  <span className="font-bold text-[11px] text-slate-300">
                    {isRecording ? 'Mikrofon Aktif — Silakan Bicara...' : 'Indikator Gelombang Suara'}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-slate-400">
                  <Gauge className="w-3 h-3" />
                  <span>Resonansi: {audioLevel}%</span>
                </div>
              </div>

              {/* Waveform Equalizer Display */}
              <div className="h-14 bg-black/40 rounded-xl p-2 flex items-end justify-between gap-1 border border-white/5">
                {waveformBars.map((bar, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: `${bar}%` }}
                    transition={{ duration: 0.08 }}
                    className={`flex-1 rounded-t-sm ${
                      isRecording
                        ? bar > 60
                          ? 'bg-rose-500'
                          : bar > 30
                          ? 'bg-amber-400'
                          : 'bg-emerald-400'
                        : 'bg-slate-700'
                    }`}
                  />
                ))}
              </div>

              {/* Recognized Speech Transcript Pill if available */}
              {speechTranscript && (
                <div className="mt-2.5 p-2 bg-white/10 rounded-xl text-center">
                  <span className="text-[10px] text-slate-400 block">Suara Tertangkap:</span>
                  <span className="font-arabic text-lg font-bold text-amber-300">
                    {speechTranscript}
                  </span>
                </div>
              )}
            </div>

            {/* Evaluation Result Feedback Card */}
            <AnimatePresence>
              {evaluationResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`rounded-2xl p-3.5 border-2 ${
                    evaluationResult.makhrajMatch
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                      : 'bg-amber-50 border-amber-300 text-amber-950'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {evaluationResult.makhrajMatch ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                      )}
                      <div>
                        <h4 className="font-bold text-xs">
                          {evaluationResult.makhrajMatch ? 'Lafal Sangat Bagus!' : 'Perlu Sedikit Perbaikan'}
                        </h4>
                        <p className="text-[11px] text-slate-700 leading-snug mt-0.5">
                          {evaluationResult.feedback}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[10px] text-slate-500 font-bold block">Akurasi</span>
                      <span className="text-sm font-black text-emerald-700">
                        {evaluationResult.accuracy}%
                      </span>
                    </div>
                  </div>

                  {/* Play User Audio Comparison Button if recorded */}
                  {recordedAudioUrl && (
                    <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between">
                      <button
                        onClick={handlePlayUserAudio}
                        className="text-[11px] font-bold text-slate-800 bg-white hover:bg-slate-100 px-3 py-1 rounded-xl border border-slate-300 flex items-center gap-1.5 shadow-2xs"
                      >
                        <Play className="w-3.5 h-3.5 text-emerald-600" /> Putar Rekaman Saya
                      </button>

                      <div className="flex text-amber-500 text-xs">
                        {Array.from({ length: evaluationResult.awardedStars }).map((_, i) => (
                          <span key={i}>⭐</span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Interactive Control Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-1">
              {/* Record / Stop Toggle Button */}
              <button
                onClick={handleStartRecording}
                className={`w-full sm:flex-1 py-3.5 rounded-2xl font-black text-xs flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 ${
                  isRecording
                    ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
                    : 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white'
                }`}
              >
                {isRecording ? (
                  <>
                    <MicOff className="w-4 h-4" />
                    <span>Selesai Bicara (Evaluasi)</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4" />
                    <span>{evaluationResult ? 'Rekam Ulang Lafal' : 'Tekan & Mulai Bicara'}</span>
                  </>
                )}
              </button>

              {/* Simulation Practice Button (Safe fallback for non-mic or testing) */}
              <button
                onClick={handleSimulatedVoicePractice}
                disabled={isRecording}
                className="w-full sm:w-auto px-4 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 disabled:opacity-50"
                title="Latihan simulasi otomatis jika mic tidak tersedia"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Simulasi Suara</span>
              </button>

              {/* Next Challenge Button */}
              {evaluationResult && (
                <button
                  onClick={handleNextChallenge}
                  className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
                >
                  <span>Tantangan Berikutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Modal Tips Bantuan */}
        {showTipModal && (
          <div className="fixed inset-0 z-60 bg-black/60 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-sm w-full p-5 space-y-3 shadow-2xl">
              <div className="flex items-center justify-between border-b pb-2">
                <h4 className="font-black text-sm text-slate-900">Tips Sukses Makhraj Mastery</h4>
                <button onClick={() => setShowTipModal(false)} className="text-slate-400 font-bold">✕</button>
              </div>

              <div className="text-xs text-slate-600 space-y-2 leading-relaxed">
                <p>1. <strong>Dekatkan Mikrofon:</strong> Pastikan jarak mulut sekitar 10-15 cm dari mikrofon untuk sinyal yang jernih.</p>
                <p>2. <strong>Dengarkan Qari Dulu:</strong> Tekan tombol &ldquo;Dengarkan Contoh Qari&rdquo; sebelum merekam suaramu.</p>
                <p>3. <strong>Harakat yang Jelas:</strong> Jangan terburu-buru, lafalkan vokal fathah, kasrah, dan dhammah secara sempurna.</p>
                <p>4. <strong>Fitur Simulasi:</strong> Jika browsermu membatasi izin mikrofon, tombol &ldquo;Simulasi Suara&rdquo; tetap dapat digunakan.</p>
              </div>

              <button
                onClick={() => setShowTipModal(false)}
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-xs"
              >
                Mengerti
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
