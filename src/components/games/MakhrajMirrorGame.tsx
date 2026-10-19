import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Mic, MicOff, Award, Sparkles, ArrowRight, CheckCircle2, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { sound } from '../../services/sound';
import { GameStorage } from '../../services/storage';
import { GameShell, GameFlowState } from './GameShell';

interface MakhrajMirrorProps {
  onClose: () => void;
  onReward: (xp: number, stars: number) => void;
}

export type MakhrajRegion = 'halq' | 'lisan' | 'syafatan';

export interface MakhrajItem {
  id: string;
  letter: string;
  name: string;
  vowelExample: string;
  region: MakhrajRegion;
  regionNameAr: string;
  regionNameId: string;
  specificPointAr: string;
  specificPointId: string;
  anatomicalDesc: string;
  vocalTechnique: string;
  sifat: string[];
  contrastPair?: {
    letter: string;
    name: string;
    contrastNote: string;
  };
  svgPoint: { cx: number; cy: number; color: string };
}

export const MAKHRAJ_CATALOG: MakhrajItem[] = [
  {
    id: 'mkh_haa',
    letter: 'ح',
    name: 'Ḥāʾ (حَاء)',
    vowelExample: 'حَ - حِ - حُ - أَحْ',
    region: 'halq',
    regionNameAr: 'الحَلْق',
    regionNameId: 'Tenggorokan (Wasath al-Halq)',
    specificPointAr: 'وَسَطُ الحَلْق',
    specificPointId: 'Tenggorokan bagian tengah (katup epiglotis)',
    anatomicalDesc: 'Dihasilkan dari pengetatan lembut dinding tengah kerongkongan. Udara mengalir bersih tanpa getaran pita suara.',
    vocalTechnique: 'Keluarkan hembusan nafas hangat bersih seperti meniup kaca kacamata di udara dingin.',
    sifat: ['Hams (nafas berhembus)', 'Rakhawah (suara mengalir)', 'Istifal (tipis)'],
    contrastPair: {
      letter: 'هـ',
      name: 'Hāʾ Dada',
      contrastNote: 'Huruf ح bersih di tengah tenggorokan, sedangkan هـ sangat dalam dari pangkal dada.'
    },
    svgPoint: { cx: 125, cy: 195, color: '#0d9488' }
  },
  {
    id: 'mkh_ayn',
    letter: 'ع',
    name: 'ʿAyn (عَيْن)',
    vowelExample: 'عَ - عِ - عُ - أَعْ',
    region: 'halq',
    regionNameAr: 'الحَلْق',
    regionNameId: 'Tenggorokan (Wasath al-Halq)',
    specificPointAr: 'وَسَطُ الحَلْق',
    specificPointId: 'Tenggorokan tengah dengan tekanan dinding faring',
    anatomicalDesc: 'Dinding kerongkongan bagian tengah ditekan mundur ke arah belakang dengan lentur dan bergetar.',
    vocalTechnique: 'Tekan lembut pita suara tengah; bunyinya mengalir mantap, bukan hentakan kasar.',
    sifat: ['Jahr (jelas)', 'Bainiyyah (sedang)', 'Infitah (terbuka)'],
    contrastPair: {
      letter: 'ء',
      name: 'Hamzah',
      contrastNote: 'Huruf ع mengalir elastis di tengah kerongkongan, sedangkan ء adalah hentakan katup pita suara.'
    },
    svgPoint: { cx: 125, cy: 190, color: '#059669' }
  },
  {
    id: 'mkh_qaf',
    letter: 'ق',
    name: 'Qāf (قَاف)',
    vowelExample: 'قَ - قِ - قُ - أَقْ',
    region: 'lisan',
    regionNameAr: 'اللِّسَان',
    regionNameId: 'Pangkal Lidah (Aqsha al-Lisan)',
    specificPointAr: 'أَقْصَى اللِّسَان',
    specificPointId: 'Pangkal lidah belakang bersentuhan langit-langit lunak',
    anatomicalDesc: 'Pangkal lidah paling belakang dinaikkan menyentuh langit-langit berdaging lunak di atas anak lidah.',
    vocalTechnique: 'Keluarkan ketukan tebal bulat dengan pantulan kuat (Qalqalah) saat berharakat sukun.',
    sifat: ['Jahr', 'Syiddah (tertahan kuat)', 'Isti\'la (tebal)', 'Qalqalah'],
    contrastPair: {
      letter: 'ك',
      name: 'Kaf',
      contrastNote: 'Huruf ق tebal bulat di langit-langit lunak, sedangkan ك tipis berdesis di langit-langit keras.'
    },
    svgPoint: { cx: 120, cy: 145, color: '#2563eb' }
  },
  {
    id: 'mkh_baa',
    letter: 'ب',
    name: 'Bāʾ (بَاء)',
    vowelExample: 'بَ - بِ - بُ - أَبْ',
    region: 'syafatan',
    regionNameAr: 'الشَّفَتَان',
    regionNameId: 'Dua Bibir (Asy-Syafatan)',
    specificPointAr: 'بَيْنَ الشَّفَتَيْنِ',
    specificPointId: 'Dua bibir terkatup rapat',
    anatomicalDesc: 'Kedua bibir atas dan bawah dikatupkan secara rapat dengan tekanan sedang.',
    vocalTechnique: 'Rapatkan kedua bibir lalu lepaskan dengan pantulan memantul (Qalqalah) jika berharakat mati.',
    sifat: ['Jahr', 'Syiddah', 'Infitah', 'Qalqalah'],
    contrastPair: {
      letter: 'م',
      name: 'Mim',
      contrastNote: 'Huruf ب meletup tanpa dengung hidung, sedangkan م keluar bersama dengung Ghunnah di rongga hidung.'
    },
    svgPoint: { cx: 62, cy: 155, color: '#db2777' }
  }
];

export const MakhrajMirrorGame: React.FC<MakhrajMirrorProps> = ({ onClose, onReward }) => {
  const [flowState, setFlowState] = useState<GameFlowState>('BRIEFING');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState<MakhrajRegion>('halq');
  const [isRecording, setIsRecording] = useState(false);
  const [testedCount, setTestedCount] = useState(0);
  const [mascotMood, setMascotMood] = useState<'happy' | 'cheer' | 'thinking' | 'celebrate'>('happy');
  const [mascotComment, setMascotComment] = useState('Amati titik artikulasi vokal dan latih bunyinya!');

  const filteredCatalog = MAKHRAJ_CATALOG.filter(m => m.region === selectedRegion);
  const makhraj = filteredCatalog[currentIdx % filteredCatalog.length] || filteredCatalog[0] || MAKHRAJ_CATALOG[0];

  const handleSpeakSound = (text = makhraj.letter) => {
    sound.speakArabic(text);
  };

  const handleTestVoice = () => {
    setIsRecording(true);
    sound.speakArabic(makhraj.letter);
    setMascotMood('cheer');
    setMascotComment(`Simak titik letup ${makhraj.name} (${makhraj.letter}), lalu tirukan dengan jelas!`);

    setTimeout(() => {
      setIsRecording(false);
      sound.playSuccess();
      setTestedCount(c => c + 1);
      setMascotMood('celebrate');
      setMascotComment(`Mumtaz! Latihan artikulasi ${makhraj.name} (${makhraj.letter}) berhasil disimak & dilatih!`);

      if (testedCount + 1 >= 3) {
        setTimeout(() => {
          setFlowState('VICTORY');
        }, 1000);
      }
    }, 1200);
  };

  return (
    <GameShell
      title="Cermin Anatomi Makhraj"
      titleAr="مِرْآةُ مَخَارِجِ الحُرُوفِ"
      islandName="Pulau Kalam"
      islandColor="from-teal-700 via-cyan-800 to-slate-900"
      gameIcon="🪞"
      targetObjective="Pahami organ artikulasi bicara manusia dan latih ketepatan letup makhraj huruf Arab"
      howToPlay={[
        { icon: '🗣️', text: 'Pilih wilayah makhraj: Tenggorokan (Halq), Lidah (Lisan), atau Bibir (Syafatan).' },
        { icon: '📍', text: 'Perhatikan titik anatomi pada sketsa organ bicara.' },
        { icon: '🎤', text: 'Ucapkan 4 variasi harakat dan rekam suara untuk menguji kefasihan makhraj!' }
      ]}
      speechArabic="تَعَلَّمْ مَخَارِجَ الحُرُوفِ وَأَتْقِنْ نُطْقَهَا!"
      speechIntro="Mari bercermin melihat anatomi organ bicara di Pulau Kalam!"
      flowState={flowState}
      onStartGame={() => {
        setFlowState('PLAYING');
        setCurrentIdx(0);
        setTestedCount(0);
        handleSpeakSound();
      }}
      onPlayAgain={() => {
        setFlowState('PLAYING');
        setCurrentIdx(0);
        setTestedCount(0);
      }}
      onClose={onClose}
      onReward={onReward}
      rewardTrait="lisan"
      traitPoints={12}
      currentRound={testedCount + 1}
      totalRounds={3}
      score={testedCount}
      maxScore={3}
      starsEarned={3}
      xpEarned={testedCount * 40}
      mascotMood={mascotMood}
      mascotComment={mascotComment}
      mascotArabic={makhraj.letter}
      onPlayTitleAudio={() => handleSpeakSound(makhraj.letter)}
      victorySummary={[
        { label: 'Huruf Terlatih', value: `${testedCount} Huruf` },
        { label: 'Wilayah Anatomi', value: makhraj.regionNameAr },
        { label: 'Presisi Makhraj', value: '⭐⭐⭐ Sempurna' },
        { label: 'Bonus Kalam', value: '+12 Poin Lisan' }
      ]}
    >
      {/* Region Selector Pills */}
      <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-teal-200/80 overflow-x-auto text-xs">
        {[
          { id: 'halq' as const, label: 'Tenggorokan (الحَلْق)' },
          { id: 'lisan' as const, label: 'Lidah (اللِّسَان)' },
          { id: 'syafatan' as const, label: 'Bibir (الشَّفَتَان)' },
        ].map(reg => (
          <button
            key={reg.id}
            onClick={() => {
              sound.playPop();
              setSelectedRegion(reg.id);
              setCurrentIdx(0);
            }}
            className={`px-3 py-1 rounded-xl font-bold whitespace-nowrap transition-all ${
              selectedRegion === reg.id
                ? 'bg-teal-700 text-white font-black shadow-xs ring-1 ring-teal-400'
                : 'bg-teal-50 hover:bg-teal-100 text-teal-950 border border-teal-200'
            }`}
          >
            {reg.label}
          </button>
        ))}
      </div>

      {/* Main Anatomy Inspection Card */}
      <div className="bg-slate-50 border-2 border-teal-200 rounded-2xl p-3 sm:p-4 mb-2 flex flex-col sm:flex-row items-center gap-4 my-auto">
        {/* Head Diagram SVG */}
        <div className="relative w-36 h-36 bg-white rounded-2xl p-2 border border-slate-200 shadow-inner flex items-center justify-center shrink-0">
          <svg viewBox="0 0 200 240" className="w-full h-full">
            <path
              d="M130 30 C70 30 50 80 50 140 C50 160 55 170 65 175 C80 180 85 190 85 220 L160 220 C160 200 160 170 170 140 C175 100 170 30 130 30 Z"
              fill="#f1f5f9"
              stroke="#cbd5e1"
              strokeWidth="2"
            />
            {/* Active Articulation Glow Point */}
            <circle
              cx={makhraj.svgPoint.cx}
              cy={makhraj.svgPoint.cy}
              r="9"
              fill={makhraj.svgPoint.color}
              className="animate-ping opacity-75"
            />
            <circle
              cx={makhraj.svgPoint.cx}
              cy={makhraj.svgPoint.cy}
              r="7"
              fill={makhraj.svgPoint.color}
            />
          </svg>
          <span className="absolute bottom-1 right-2 font-arabic text-2xl font-black text-teal-900">
            {makhraj.letter}
          </span>
        </div>

        {/* Anatomical Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1">
            <h4 className="font-black text-slate-800 text-base leading-tight">
              {makhraj.name}
            </h4>
            <span className="text-[10px] bg-teal-100 text-teal-800 font-bold px-2 py-0.5 rounded-full">
              {makhraj.specificPointAr}
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1 leading-snug">
            {makhraj.anatomicalDesc}
          </p>
          <div className="mt-2 p-2 bg-teal-50 border border-teal-200 rounded-xl text-[11px] text-teal-900 font-medium">
            💡 <strong>Teknik Suara:</strong> {makhraj.vocalTechnique}
          </div>
        </div>
      </div>

      {/* 4 Vocalization Harakat Pills */}
      <div className="pt-2 flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-bold text-slate-500">Contoh Harakat:</span>
          <button
            type="button"
            onClick={() => handleSpeakSound(makhraj.vowelExample)}
            className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 font-arabic text-base font-black text-teal-900 flex items-center gap-1 shadow-2xs"
          >
            <span>{makhraj.vowelExample}</span>
            <Volume2 className="w-3.5 h-3.5 text-teal-600" />
          </button>
        </div>

        <button
          type="button"
          onClick={handleTestVoice}
          className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-md transition-all cursor-pointer ${
            isRecording
              ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-300 animate-pulse'
              : 'bg-teal-700 hover:bg-teal-800 text-white active:scale-95'
          }`}
        >
          {isRecording ? <Volume2 className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
          <span>{isRecording ? 'Menyimak Lafal...' : 'Latihan Talqin & Tirukan'}</span>
        </button>
      </div>
    </GameShell>
  );
};
