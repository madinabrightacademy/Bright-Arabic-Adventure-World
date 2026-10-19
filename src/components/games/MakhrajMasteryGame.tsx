import React, { useState } from 'react';
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
  Gauge
} from 'lucide-react';
import { sound } from '../../services/sound';
import { GameStorage } from '../../services/storage';
import { GameShell, GameFlowState } from './GameShell';

interface MakhrajMasteryGameProps {
  onClose: () => void;
  onReward: (xp: number, stars: number) => void;
}

export interface MasteryChallenge {
  id: string;
  stageNum: number;
  zone: string;
  zoneLabel: string;
  zoneAr: string;
  focusLetters: string[];
  arabicTarget: string;
  translit: string;
  meaning: string;
  makhrajTip: string;
  sifatTip: string;
}

const CHALLENGES: MasteryChallenge[] = [
  {
    id: 'mm_1',
    stageNum: 1,
    zone: 'halq',
    zoneLabel: 'Tenggorokan (Wasath al-Halq)',
    zoneAr: 'الحَلْق',
    focusLetters: ['ع', 'ح'],
    arabicTarget: 'عَيْنٌ جَمِيلَةٌ',
    translit: 'ʿAynun jamīlah',
    meaning: 'Mata yang indah',
    makhrajTip: 'Tekan lembut pita suara tengah untuk huruf ʿAyn (ع), hembuskan nafas hangat bersih untuk Ḥāʾ (ح).',
    sifatTip: 'Jahr (jelas tanpa nafas) pada Ayn & Hams (nafas mengalir) pada Haa.'
  },
  {
    id: 'mm_2',
    stageNum: 2,
    zone: 'halq',
    zoneLabel: 'Tenggorokan Atas (Adna al-Halq)',
    zoneAr: 'أَدْنَى الحَلْق',
    focusLetters: ['خ', 'غ'],
    arabicTarget: 'خُبْزٌ سَاخِنٌ',
    translit: 'Khubzun sākhin',
    meaning: 'Roti yang hangat',
    makhrajTip: 'Keluarkan bunyi desiran serak halus dari tenggorokan atas.',
    sifatTip: 'Isti\'la (lidah naik/tebal) dan Rakhawah (aliran suara).'
  },
  {
    id: 'mm_3',
    stageNum: 3,
    zone: 'lisan_pangkal',
    zoneLabel: 'Pangkal Lidah (Aqshal Lisan)',
    zoneAr: 'أَقْصَى اللِّسَان',
    focusLetters: ['ق', 'ك'],
    arabicTarget: 'قَلَمٌ وَكِتَابٌ',
    translit: 'Qalamun wa kitāb',
    meaning: 'Pena dan buku',
    makhrajTip: 'Huruf Qaf (ق) tebal memantul di pangkal lidah, Kaf (ك) sedikit maju dan berdesis halus.',
    sifatTip: 'Qaf: Qalqalah & Isti\'la | Kaf: Hams & Syiddah.'
  }
];

export const MakhrajMasteryGame: React.FC<MakhrajMasteryGameProps> = ({ onClose, onReward }) => {
  const [flowState, setFlowState] = useState<GameFlowState>('BRIEFING');
  const [stageIdx, setStageIdx] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [voiceEvaluated, setVoiceEvaluated] = useState(false);
  const [testedCount, setTestedCount] = useState(0);
  const [mascotMood, setMascotMood] = useState<'happy' | 'cheer' | 'thinking' | 'celebrate'>('happy');
  const [mascotComment, setMascotComment] = useState('Dengarkan contoh lalu tekan tombol mic untuk berlatih!');

  const activeChallenge = CHALLENGES[stageIdx];

  const playAudio = () => {
    sound.speakArabic(activeChallenge.arabicTarget);
  };

  const handleStartRecording = () => {
    if (isRecording) return;
    setIsRecording(true);
    setVoiceEvaluated(false);
    sound.speakArabic(activeChallenge.arabicTarget);

    setTimeout(() => {
      setIsRecording(false);
      setVoiceEvaluated(true);
      sound.playSuccess();
      setTestedCount(c => c + 1);
      setMascotMood('celebrate');
      setMascotComment(`Mumtaz! Artikulasi makhraj "${activeChallenge.focusLetters.join(' & ')}" sangat fasih!`);
    }, 2200);
  };

  const handleNextStage = () => {
    sound.playPop();
    if (stageIdx < CHALLENGES.length - 1) {
      setStageIdx(i => i + 1);
      setVoiceEvaluated(false);
      setMascotMood('happy');
      setMascotComment('Latih tantangan makhraj berikutnya!');
    } else {
      setFlowState('VICTORY');
    }
  };

  return (
    <GameShell
      title="Uji Makhraj Suara Kalam"
      titleAr="إِتْقَانُ المَخَارِجِ وَالنُّطْقِ"
      islandName="Pulau Kalam"
      islandColor="from-teal-600 via-emerald-600 to-teal-800"
      gameIcon="🎤"
      targetObjective="Uji dan ukur ketepatan artikulasi makhraj lisanmu dengan indikator resonansi suara mikrofon"
      howToPlay={[
        { icon: '🎧', text: 'Dengarkan contoh lafal makhraj dan frase dari penutur fasih.' },
        { icon: '🎙️', text: 'Tekan tombol mic dan ucapkan frase dengan posisi makhraj yang benar.' },
        { icon: '📊', text: 'Dapatkan skor resonansi desis dan ketebalan suara kalam!' }
      ]}
      speechArabic="أَتْقِنْ مَخَارِجَكَ وَتَحَدَّثْ بِفَصَاحَةٍ!"
      speechIntro="Mari menguji kefasihan makhraj di Panggung Orator Pulau Kalam!"
      flowState={flowState}
      onStartGame={() => {
        setFlowState('PLAYING');
        setStageIdx(0);
        setTestedCount(0);
        setVoiceEvaluated(false);
        setTimeout(playAudio, 300);
      }}
      onPlayAgain={() => {
        setFlowState('PLAYING');
        setStageIdx(0);
        setTestedCount(0);
        setVoiceEvaluated(false);
      }}
      onClose={onClose}
      onReward={onReward}
      rewardTrait="lisan"
      traitPoints={15}
      currentRound={stageIdx + 1}
      totalRounds={CHALLENGES.length}
      score={testedCount}
      maxScore={CHALLENGES.length}
      starsEarned={3}
      xpEarned={CHALLENGES.length * 50}
      mascotMood={mascotMood}
      mascotComment={mascotComment}
      mascotArabic={activeChallenge.arabicTarget}
      onPlayTitleAudio={playAudio}
      victorySummary={[
        { label: 'Tantangan Tuntas', value: `${CHALLENGES.length} Tahap` },
        { label: 'Kategori Makhraj', value: 'Halq & Lisan' },
        { label: 'Kefasihan Kalam', value: '⭐⭐⭐ Fasih' },
        { label: 'Bonus Orator', value: '+15 Poin Kalam' }
      ]}
    >
      {/* Zone Indicator */}
      <div className="bg-teal-50 border border-teal-200 rounded-2xl p-2.5 mb-2 flex items-center justify-between text-xs">
        <span className="font-bold text-teal-900">
          Tahap {activeChallenge.stageNum}: {activeChallenge.zoneLabel}
        </span>
        <div className="flex items-center gap-1 font-arabic text-sm font-black text-teal-800">
          <span>Fokus:</span>
          {activeChallenge.focusLetters.map(l => (
            <span key={l} className="bg-teal-200 px-2 py-0.5 rounded-lg">{l}</span>
          ))}
        </div>
      </div>

      {/* Target Speech Card */}
      <div className="bg-gradient-to-r from-teal-900 to-slate-900 rounded-3xl p-5 text-white my-auto shadow-md border-2 border-teal-400/40 text-center flex flex-col items-center justify-center">
        <p className="font-arabic text-3xl sm:text-4xl font-black text-amber-300 leading-snug">
          {activeChallenge.arabicTarget}
        </p>
        <p className="text-xs text-teal-200 mt-1">
          <strong>{activeChallenge.translit}</strong> — "{activeChallenge.meaning}"
        </p>

        <div className="mt-3 flex items-center gap-2">
          <button
            type="button"
            onClick={playAudio}
            className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm active:scale-95"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Dengar Contoh</span>
          </button>
        </div>
      </div>

      {/* Mic Recording & Voice Resonance Analyzer */}
      <div className="pt-3 flex flex-col items-center">
        <motion.button
          type="button"
          whileTap={{ scale: 0.95 }}
          onClick={handleStartRecording}
          disabled={isRecording}
          className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-xl transition-all ${
            isRecording
              ? 'bg-rose-500 animate-pulse border-4 border-rose-300'
              : 'bg-gradient-to-br from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 border-4 border-teal-300 cursor-pointer active:scale-95'
          }`}
        >
          {isRecording ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
        </motion.button>
        <span className="text-xs font-bold text-slate-600 mt-2">
          {isRecording ? 'Merekam getaran vokal...' : 'Ketuk mic dan ucapkan frase di atas'}
        </span>

        {/* Feedback Tips */}
        <div className="mt-2 text-center max-w-sm text-[11px] text-teal-900 bg-teal-50 border border-teal-200 p-2 rounded-xl">
          💡 {activeChallenge.makhrajTip}
        </div>
      </div>

      {/* Next Button */}
      {voiceEvaluated && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-3 flex justify-end"
        >
          <button
            type="button"
            onClick={handleNextStage}
            className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-black text-xs flex items-center gap-1.5 shadow-md active:scale-95 cursor-pointer"
          >
            <span>{stageIdx < CHALLENGES.length - 1 ? 'Lanjut Tahap' : 'Hasil Uji Makhraj'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </GameShell>
  );
};
