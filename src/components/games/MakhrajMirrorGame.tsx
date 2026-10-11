import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Mic, MicOff, Award, Sparkles, ArrowRight, CheckCircle2, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { sound } from '../../services/sound';
import { GameStorage } from '../../services/storage';

interface MakhrajMirrorProps {
  onClose: () => void;
  onReward: (xp: number, stars: number) => void;
}

export type MakhrajRegion = 'halq' | 'lisan' | 'syafatan' | 'jauf' | 'khaisyum';

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
  // AL-HALQ (Tenggorokan)
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
    sifat: ['Hams (nafas berhembus)', 'Rakhawah (suara mengalir)', 'Istifal (lidah turun/tipis)'],
    contrastPair: {
      letter: 'هـ',
      name: 'Hāʾ Dada',
      contrastNote: 'Huruf ح bersih di tengah tenggorokan, sedangkan هـ sangat dalam dari pangkal pita suara/dada.'
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
    sifat: ['Jahr (jelas tidak berhembus)', 'Bainiyyah (antara keras dan mengalir)', 'Infitah (terbuka tipis)'],
    contrastPair: {
      letter: 'ء',
      name: 'Hamzah',
      contrastNote: 'Huruf ع mengalir elastis di tengah kerongkongan, sedangkan ء adalah hentakan rapat katup pita suara.'
    },
    svgPoint: { cx: 125, cy: 190, color: '#059669' }
  },
  {
    id: 'mkh_khaa',
    letter: 'خ',
    name: 'Khāʾ (خَاء)',
    vowelExample: 'خَ - خِ - خُ - أَخْ',
    region: 'halq',
    regionNameAr: 'الحَلْق',
    regionNameId: 'Tenggorokan Atas (Adna al-Halq)',
    specificPointAr: 'أَدْنَى الحَلْق',
    specificPointId: 'Tenggorokan atas dekat anak lidah (uvula)',
    anatomicalDesc: 'Gesekan udara antara pangkal akar lidah atas dengan langit-langit lunak.',
    vocalTechnique: 'Keluarkan suara serak desiran halus seperti mendengkur halus saat tidur atau berkumur.',
    sifat: ['Hams (nafas mengalir)', 'Isti\'la (lidah naik/tebal)', 'Rakhawah'],
    contrastPair: {
      letter: 'غ',
      name: 'Ghayn',
      contrastNote: 'Huruf خ berhembus nafas serak, sedangkan غ bersuara basah bergetar tanpa hembusan nafas.'
    },
    svgPoint: { cx: 120, cy: 165, color: '#d97706' }
  },
  {
    id: 'mkh_ghayn',
    letter: 'غ',
    name: 'Ghayn (غَيْن)',
    vowelExample: 'غَ - غِ - غُ - أَغْ',
    region: 'halq',
    regionNameAr: 'الحَلْق',
    regionNameId: 'Tenggorokan Atas (Adna al-Halq)',
    specificPointAr: 'أَدْنَى الحَلْق',
    specificPointId: 'Tenggorokan atas perbatasan rongga mulut',
    anatomicalDesc: 'Udara bergetar basah tebal antara akar lidah dan langit-langit lunak.',
    vocalTechnique: 'Ucapkan bunyi gurgling halus tebal seperti berkumur air hangat.',
    sifat: ['Jahr (tanpa hembus nafas)', 'Isti\'la (tebal)', 'Rakhawah'],
    contrastPair: {
      letter: 'خ',
      name: 'Khāʾ',
      contrastNote: 'Huruf غ tidak mengeluarkan nafas hembus (jahr), pita suara bergetar aktif.'
    },
    svgPoint: { cx: 120, cy: 160, color: '#0284c7' }
  },

  // AL-LISAN (Lidah)
  {
    id: 'mkh_qaaf',
    letter: 'ق',
    name: 'Qāf (قَاف)',
    vowelExample: 'قَ - قِ - قُ - أَقْ',
    region: 'lisan',
    regionNameAr: 'اللِّسَان',
    regionNameId: 'Pangkal Lidah Dalam (Aqsha al-Lisan)',
    specificPointAr: 'أَقْصَى اللِّسَان مَعَ الحَنَكِ اللَّحْمِيّ',
    specificPointId: 'Pangkal lidah menempel ke langit-langit lunak dekat anak lidah',
    anatomicalDesc: 'Pangkal lidah paling dalam terangkat mantap menutup total saluran udara lalu meletup (Qalqalah).',
    vocalTechnique: 'Letupkan suara bulat tebal dari bagian paling belakang mulut.',
    sifat: ['Syiddah (tertahan kuat)', 'Isti\'la (tebal membulat)', 'Qalqalah (pantulan letupan)'],
    contrastPair: {
      letter: 'ك',
      name: 'Kāf',
      contrastNote: 'Huruf ق tebal di langit-langit lunak terdalam, sedangkan ك sedikit lebih ke depan di langit-langit keras dan berdesis (hams).'
    },
    svgPoint: { cx: 110, cy: 140, color: '#dc2626' }
  },
  {
    id: 'mkh_dhaad',
    letter: 'ض',
    name: 'Ḍād (ضَاد)',
    vowelExample: 'ضَ - ضِ - ضُ - أَضْ',
    region: 'lisan',
    regionNameAr: 'اللِّسَان',
    regionNameId: 'Tepi Sisi Lidah (Haffah al-Lisan)',
    specificPointAr: 'حَافَةُ اللِّسَان مَعَ الأَضْرَاسِ العُلْيَا',
    specificPointId: 'Tepi sisi lidah menyentuh gigi geraham atas',
    anatomicalDesc: 'Sisi lidah (kiri, kanan, atau keduanya) ditekan ke dinding gigi geraham atas bagian dalam dengan sifat Istithalah (memanjang).',
    vocalTechnique: 'Huruf paling unik dalam bahasa Arab (Lughat adh-Dhad). Tekan sisi lidah ke gigi geraham, bukan ujung lidah!',
    sifat: ['Ithbaq (lidah melengkung menutup langit mulut)', 'Istithalah (suara memanjang menyusuri geraham)', 'Jahr'],
    contrastPair: {
      letter: 'د',
      name: 'Dāl',
      contrastNote: 'Huruf د menggunakan ujung lidah ke pangkal gigi seri atas, sedangkan ض menggunakan sisi tepi lidah ke gigi geraham.'
    },
    svgPoint: { cx: 85, cy: 135, color: '#7c3aed' }
  },
  {
    id: 'mkh_shaad',
    letter: 'ص',
    name: 'Ṣād (صَاد)',
    vowelExample: 'صَ - صِ - صُ - أَصْ',
    region: 'lisan',
    regionNameAr: 'اللِّسَان',
    regionNameId: 'Ujung Lidah Desis Tebal (Asallat al-Lisan)',
    specificPointAr: 'رَأْسُ اللِّسَانِ فَوْقَ الثَّنَايَا السُّفْلَى',
    specificPointId: 'Ujung lidah di belakang gigi seri bawah dengan lidah melengkung',
    anatomicalDesc: 'Ujung lidah bertengger di belakang gigi seri bawah, pangkal lidah terangkat naik (Ithbaq) menghasilkan desis siulan tebal (Shafir).',
    vocalTechnique: 'Desis siulan burung yang penuh dan tebal di dalam rongga mulut.',
    sifat: ['Shafir (desir siulan tajam)', 'Ithbaq (penuh tebal)', 'Hams'],
    contrastPair: {
      letter: 'س',
      name: 'Sīn',
      contrastNote: 'Huruf ص tebal membulat (ithbaq), sedangkan س tipis mendatar (infitah).'
    },
    svgPoint: { cx: 65, cy: 145, color: '#0ea5e9' }
  },
  {
    id: 'mkh_thaa',
    letter: 'ط',
    name: 'Ṭāʾ (طَاء)',
    vowelExample: 'طَ - طِ - طُ - أَطْ',
    region: 'lisan',
    regionNameAr: 'اللِّسَان',
    regionNameId: 'Punggung Ujung Lidah (Tharaf al-Lisan)',
    specificPointAr: 'طَرَفُ اللِّسَانِ مَعَ أُصُولِ الثَّنَايَا العُلْيَا',
    specificPointId: 'Punggung ujung lidah menempel ke gusi gigi seri atas',
    anatomicalDesc: 'Huruf paling kuat di antara seluruh huruf hijaiyah. Seluruh lidah terangkat ke langit-langit mulut saat meletup.',
    vocalTechnique: 'Letupkan suara keras tebal tanpa menyertakan hembusan nafas (tertahan sempurna).',
    sifat: ['Syiddah (tertahan kuat)', 'Jahr (tanpa desis nafas)', 'Qalqalah', 'Ithbaq'],
    contrastPair: {
      letter: 'ت',
      name: 'Tāʾ',
      contrastNote: 'Huruf ط tebal dan tidak boleh bocor nafas, sedangkan ت tipis dan berhembus nafas halus (hams).'
    },
    svgPoint: { cx: 55, cy: 130, color: '#e11d48' }
  },

  // ASY-SYAFATAN (Dua Bibir)
  {
    id: 'mkh_faa',
    letter: 'ف',
    name: 'Fāʾ (فَاء)',
    vowelExample: 'فَ - فِ - فُ - أَفْ',
    region: 'syafatan',
    regionNameAr: 'الشَّفَتَان',
    regionNameId: 'Dua Bibir (Asy-Syafatan)',
    specificPointAr: 'بَطْنُ الشَّفَةِ السُّفْلَى مَعَ أَطْرَافِ الثَّنَايَا العُلْيَا',
    specificPointId: 'Perut bibir bawah menempel pada ujung dua gigi seri atas',
    anatomicalDesc: 'Ujung dua gigi seri atas menekan bagian dalam basah bibir bawah dengan hembusan angin keluar halus.',
    vocalTechnique: 'Sentuhkan gigi seri atas ke bagian dalam bibir bawah, hembuskan nafas lembut.',
    sifat: ['Hams (nafas berhembus)', 'Rakhawah', 'Infitah'],
    contrastPair: {
      letter: 'ب',
      name: 'Bāʾ',
      contrastNote: 'Huruf ف menggunakan gigi seri atas ke bibir bawah, sedangkan ب kedua bibir merapat rapat.'
    },
    svgPoint: { cx: 40, cy: 140, color: '#f59e0b' }
  },
  {
    id: 'mkh_baa',
    letter: 'ب',
    name: 'Bāʾ (بَاء)',
    vowelExample: 'بَ - بِ - بُ - أَبْ',
    region: 'syafatan',
    regionNameAr: 'الشَّفَتَان',
    regionNameId: 'Dua Bibir Merapat',
    specificPointAr: 'انْطِبَاقُ الشَّفَتَيْنِ مَعًا بِقُوَّة',
    specificPointId: 'Merapatkan kedua bibir bagian basah dengan kuat',
    anatomicalDesc: 'Kedua bibir tertutup rapat sempurna menahan udara, lalu dibuka seketika dengan letupan (Qalqalah saat sukun).',
    vocalTechnique: 'Rapatkan dua bibir lalu letupkan dengan mantap.',
    sifat: ['Syiddah (tertahan kuat)', 'Jahr', 'Qalqalah'],
    svgPoint: { cx: 35, cy: 145, color: '#10b981' }
  }
];

export const MakhrajMirrorGame: React.FC<MakhrajMirrorProps> = ({ onClose, onReward }) => {
  const [selectedRegion, setSelectedRegion] = useState<MakhrajRegion>('halq');
  const [selectedItemIdx, setSelectedItemIdx] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [practicedCount, setPracticedCount] = useState(0);

  const regionItems = MAKHRAJ_CATALOG.filter(item => item.region === selectedRegion);
  const currentItem = regionItems[selectedItemIdx % regionItems.length] || regionItems[0] || MAKHRAJ_CATALOG[0];

  const handlePlayLetter = () => {
    sound.speakArabic(currentItem.letter, 0.7);
  };

  const handlePlayVowelExample = () => {
    sound.speakArabic(currentItem.vowelExample, 0.85);
  };

  const handlePlayContrast = (letter: string) => {
    sound.speakArabic(letter, 0.75);
  };

  const handleSimulateRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      return;
    }
    setIsRecording(true);
    sound.playSparkle();

    setTimeout(() => {
      setIsRecording(false);
      setHasRecorded(true);
      sound.playSuccess();
      setPracticedCount(c => c + 1);
      GameStorage.addReward(35, 2, 'lisan', 6);
      onReward(35, 2);
    }, 2200);
  };

  const handleNext = () => {
    setHasRecorded(false);
    if (selectedItemIdx < regionItems.length - 1) {
      setSelectedItemIdx(i => i + 1);
    } else {
      setSelectedItemIdx(0);
    }
  };

  const handlePrev = () => {
    setHasRecorded(false);
    if (selectedItemIdx > 0) {
      setSelectedItemIdx(i => i - 1);
    } else {
      setSelectedItemIdx(regionItems.length - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/75 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        className="bg-white rounded-[32px] p-5 max-w-lg w-full border-4 border-teal-400 shadow-2xl space-y-4 my-auto max-h-[95vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full">
                Pulau Huruf (HRF) • Cermin Makhraj
              </span>
              <span className="text-[10px] font-bold text-slate-500">
                Pemandu: Syaikh Kamil
              </span>
            </div>
            <h3 className="text-lg font-black text-slate-900 mt-0.5">
              Cermin Lafal & Makhraj Fonetik
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold flex items-center justify-center active:scale-95 transition-all"
          >
            ✕
          </button>
        </div>

        {/* 5 Classical Regions Tabs */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => { setSelectedRegion('halq'); setSelectedItemIdx(0); setHasRecorded(false); }}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
              selectedRegion === 'halq'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            🗣️ Halqi (Tenggorokan)
          </button>
          <button
            onClick={() => { setSelectedRegion('lisan'); setSelectedItemIdx(0); setHasRecorded(false); }}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
              selectedRegion === 'lisan'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            👅 Lisani (Lidah)
          </button>
          <button
            onClick={() => { setSelectedRegion('syafatan'); setSelectedItemIdx(0); setHasRecorded(false); }}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
              selectedRegion === 'syafatan'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            👄 Syafawi (Dua Bibir)
          </button>
        </div>

        {/* Anatomical Cross-section Card with Glowing Articulation Point */}
        <div className="relative bg-gradient-to-b from-slate-900 via-teal-950 to-slate-900 text-white rounded-3xl p-4 overflow-hidden border-2 border-teal-500/50 shadow-inner">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-[10px] font-bold text-teal-300">Daerah Artikulasi:</span>
              <h4 className="text-xs font-black text-white">{currentItem.regionNameId}</h4>
            </div>
            <div className="text-right">
              <span className="font-arabic text-sm text-teal-300 font-bold">{currentItem.regionNameAr}</span>
              <span className="text-[10px] block text-slate-400">{currentItem.specificPointId}</span>
            </div>
          </div>

          {/* Center Display: Glowing Letter + SVG Anatomical Point */}
          <div className="grid grid-cols-2 gap-3 items-center my-2">
            {/* Arabic Big Letter Mirror Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center border border-white/20 flex flex-col items-center justify-center relative">
              <span className="text-[10px] text-teal-300 font-semibold mb-1">Huruf Target</span>
              <motion.span
                key={currentItem.letter}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="font-arabic text-6xl text-amber-300 font-bold drop-shadow-md select-none"
              >
                {currentItem.letter}
              </motion.span>
              <span className="text-xs font-black text-white mt-1">{currentItem.name}</span>

              {/* Speak Audio Button */}
              <button
                onClick={handlePlayLetter}
                className="mt-2 px-3 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
              >
                <Volume2 className="w-3.5 h-3.5" /> Dengarkan Lafal
              </button>
            </div>

            {/* Vocal & Anatomical Diagram SVG */}
            <div className="bg-white/5 rounded-2xl p-3 border border-white/10 flex flex-col items-center justify-center text-center">
              <div className="relative w-32 h-32 flex items-center justify-center">
                {/* Stylized Cross-section Face Outline SVG */}
                <svg viewBox="0 0 200 240" className="w-full h-full stroke-teal-400/60 fill-none stroke-2">
                  {/* Forehead to Nose */}
                  <path d="M 40 40 Q 60 40 60 80 L 50 110 L 35 125 L 50 135 L 40 145 L 45 155 Q 50 175 75 190 Q 100 210 130 220" />
                  {/* Lips and Mouth interior */}
                  <path d="M 40 140 Q 60 140 70 145 Q 90 150 110 145" strokeDasharray="3 3" />
                  {/* Tongue and Throat */}
                  <path d="M 60 160 Q 90 165 110 175 Q 125 190 125 230" />
                  {/* Palate / Langit-langit */}
                  <path d="M 50 125 Q 90 110 120 135 Q 130 160 130 190" strokeDasharray="2 2" stroke="#94a3b8" />
                  
                  {/* Glowing Articulation Point Indicator */}
                  <circle
                    cx={currentItem.svgPoint.cx}
                    cy={currentItem.svgPoint.cy}
                    r="9"
                    fill={currentItem.svgPoint.color}
                    className="animate-ping opacity-75"
                  />
                  <circle
                    cx={currentItem.svgPoint.cx}
                    cy={currentItem.svgPoint.cy}
                    r="6"
                    fill={currentItem.svgPoint.color}
                  />
                </svg>
              </div>
              <span className="text-[10px] text-teal-200 mt-1 font-semibold leading-tight">
                Titik Makhraj: {currentItem.specificPointAr}
              </span>
            </div>
          </div>

          {/* Vowel Example Bar */}
          <div className="bg-white/10 rounded-xl p-2.5 flex items-center justify-between border border-white/10">
            <div>
              <span className="text-[10px] text-slate-300 block">Latihan Harakat Lengkap:</span>
              <span className="font-arabic text-base text-teal-200 font-bold">{currentItem.vowelExample}</span>
            </div>
            <button
              onClick={handlePlayVowelExample}
              className="px-2.5 py-1 bg-teal-500 hover:bg-teal-400 text-white rounded-lg text-xs font-bold flex items-center gap-1 active:scale-95 transition-all"
            >
              <Volume2 className="w-3.5 h-3.5" /> Putar
            </button>
          </div>
        </div>

        {/* Pedagogical Description & Sifat */}
        <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-3 text-xs space-y-1.5">
          <div className="flex items-center gap-1 text-amber-900 font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Kaidah Artikulasi & Cara Mengeluarkan Suara:</span>
          </div>
          <p className="text-slate-700 leading-relaxed text-[11px]">{currentItem.vocalTechnique}</p>

          <div className="flex flex-wrap gap-1 mt-1 pt-1 border-t border-amber-200/60">
            <span className="text-[10px] font-bold text-amber-950 mr-1">Sifat Huruf:</span>
            {currentItem.sifat.map((s, i) => (
              <span key={i} className="text-[10px] bg-amber-100 text-amber-800 font-semibold px-1.5 py-0.5 rounded-md">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Contrast Pair Section (Pembeda Huruf Mirip) */}
        {currentItem.contrastPair && (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-slate-800 flex items-center gap-1">
                ⚖️ Pembeda dengan Huruf Mirip:
              </span>
              <button
                onClick={() => handlePlayContrast(currentItem.contrastPair!.letter)}
                className="text-[11px] bg-slate-200 hover:bg-slate-300 font-bold px-2 py-0.5 rounded-lg flex items-center gap-1 text-slate-800"
              >
                <Volume2 className="w-3 h-3" /> Bunyikan {currentItem.contrastPair.name} ({currentItem.contrastPair.letter})
              </button>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              {currentItem.contrastPair.contrastNote}
            </p>
          </div>
        )}

        {/* Interactive Practice & Voice Mirroring */}
        <div className="bg-teal-50 border-2 border-teal-200 rounded-2xl p-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={handleSimulateRecord}
              className={`w-11 h-11 rounded-2xl font-bold flex items-center justify-center transition-all shadow-md active:scale-95 ${
                isRecording
                  ? 'bg-rose-500 text-white animate-pulse'
                  : hasRecorded
                  ? 'bg-emerald-500 text-white'
                  : 'bg-teal-600 hover:bg-teal-700 text-white'
              }`}
            >
              {isRecording ? <Mic className="w-5 h-5" /> : hasRecorded ? <CheckCircle2 className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
            <div>
              <h5 className="font-bold text-xs text-slate-900">
                {isRecording ? 'Mendengarkan suaramu...' : hasRecorded ? 'Luar biasa! Pelafalan Mantap ✨' : 'Cermin Suara Syaikh Kamil'}
              </h5>
              <p className="text-[10px] text-slate-500 leading-tight">
                {hasRecorded ? '+35 XP • +2 Bintang • +6 Poin Lisan Hudhud' : 'Tekan mikrofon & tirukan bunyi huruf di atas.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handlePrev}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 active:scale-95"
              title="Huruf sebelumnya"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold flex items-center gap-0.5 active:scale-95 shadow-xs"
              title="Huruf berikutnya"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress Footer */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <span>Huruf {selectedItemIdx + 1} dari {regionItems.length} di zona {currentItem.regionNameAr}</span>
          <span className="font-bold text-teal-800">Latihan Selesai: {practicedCount}x</span>
        </div>
      </motion.div>
    </div>
  );
};
