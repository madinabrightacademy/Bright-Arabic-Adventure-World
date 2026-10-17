import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, RefreshCw, Volume2, ArrowRight, Award, CheckCircle2, ChevronLeft, ChevronRight, Wand2 } from 'lucide-react';
import { sound } from '../../services/sound';
import { GameStorage } from '../../services/storage';
import { BaseGameModal, GameFlowState } from './BaseGameModal';

interface SandTraceProps {
  onClose: () => void;
  onReward: (xp: number, stars: number) => void;
}

interface TraceLetter {
  char: string;
  name: string;
  guide: string;
  setNumber: 1 | 2 | 3 | 4;
  strokeSteps: string[];
}

export const ALL_LETTERS_TO_TRACE: TraceLetter[] = [
  // Set 1 (HRF-L0-01)
  { char: 'أ', name: 'Alif (أَلِف)', guide: 'Tarik garis lurus tegak dari atas ke bawah dengan hamzah di atasnya!', setNumber: 1, strokeSteps: ['1. Tarik tongkat lurus dari atas ke bawah', '2. Buat lengkung kepala hamzah', '3. Tarik ekor hamzah mendatar'] },
  { char: 'ب', name: 'Bāʾ (بَاء)', guide: 'Gores mangkok perahu dari kanan ke kiri, lalu letakkan satu mutiara di bawah!', setNumber: 1, strokeSteps: ['1. Turunkan lengkung kanan', '2. Geser mendatar di atas garis', '3. Titik mutiara di bawah'] },
  { char: 'ت', name: 'Tāʾ (تَاء)', guide: 'Gores mangkok perahu dari kanan ke kiri dengan dua mutiara berdampingan di atas!', setNumber: 1, strokeSteps: ['1. Lengkung perahu mendatar', '2. Dua mutiara di atas'] },
  { char: 'ث', name: 'Tsāʾ (ثَاء)', guide: 'Gores mangkok perahu dari kanan ke kiri dengan tiga mutiara segitiga di atas!', setNumber: 1, strokeSteps: ['1. Mangkok perahu mendatar', '2. Tiga mutiara mahkota di atas'] },
  { char: 'ج', name: 'Jīm (جِيم)', guide: 'Tarik alis mahkota dari kiri ke kanan lalu lengkungkan perut besar dengan mutiara di tengah!', setNumber: 1, strokeSteps: ['1. Alis mahkota mendatar', '2. Lengkung perut setengah lingkaran ke bawah', '3. Titik di dalam perut'] },
  { char: 'ح', name: 'Ḥāʾ (حَاء)', guide: 'Tarik alis mahkota lalu lengkungkan perut bersih tanpa titik (tengah tenggorokan)!', setNumber: 1, strokeSteps: ['1. Alis mahkota', '2. Perut besar bersih tanpa titik'] },
  { char: 'خ', name: 'Khāʾ (خَاء)', guide: 'Tarik alis mahkota lalu lengkungkan perut besar dengan satu mutiara di atas mahkota!', setNumber: 1, strokeSteps: ['1. Alis mahkota', '2. Perut besar ke bawah', '3. Titik mutiara di atas alis'] },

  // Set 2 (HRF-L0-02)
  { char: 'د', name: 'Dāl (دَال)', guide: 'Gores sudut miring dari atas kanan meluncur mendatar ke kiri!', setNumber: 2, strokeSteps: ['1. Garis miring menurun', '2. Geser mendatar ke kiri (pemutus kiri)'] },
  { char: 'ذ', name: 'Dhāl (ذَال)', guide: 'Gores sudut miring seperti Dal dengan satu mutiara di atas!', setNumber: 2, strokeSteps: ['1. Sudut miring mendatar', '2. Titik mutiara di atas'] },
  { char: 'ر', name: 'Rāʾ (رَاء)', guide: 'Gores meluncur melengkung ke bawah garis seperti bulan sabit!', setNumber: 2, strokeSteps: ['1. Sedikit di atas garis', '2. Meluncur melengkung ke bawah garis'] },
  { char: 'ز', name: 'Zāy (زَاي)', guide: 'Gores meluncur seperti Ra dengan satu mutiara berkilau di atas!', setNumber: 2, strokeSteps: ['1. Meluncur ke bawah garis', '2. Titik mutiara berkilau di atas'] },
  { char: 'س', name: 'Sīn (سِين)', guide: 'Buat tiga gerigi gigi kecil dari kanan ke kiri lalu mangkok besar di ujungnya!', setNumber: 2, strokeSteps: ['1. Gigi pertama & kedua', '2. Gigi ketiga', '3. Mangkok dalam turun melengkung'] },
  { char: 'ش', name: 'Syīn (شِين)', guide: 'Tiga gerigi gigi dengan tiga mutiara mahkota di atas!', setNumber: 2, strokeSteps: ['1. Tiga gerigi gigi', '2. Mangkok dalam', '3. Tiga mutiara di atas'] },
  { char: 'ص', name: 'Ṣād (صَاد)', guide: 'Buat simpul oval tebal melingkar lalu mangkok besar di sebelah kiri!', setNumber: 2, strokeSteps: ['1. Lingkar oval tebal', '2. Gerigi kecil', '3. Mangkok dalam'] },

  // Set 3 (HRF-L0-03)
  { char: 'ض', name: 'Ḍād (ضَاد)', guide: 'Buat simpul oval tebal seperti Shad dengan satu mutiara di atas!', setNumber: 3, strokeSteps: ['1. Simpul oval tebal', '2. Mangkok dalam', '3. Titik mutiara di atas'] },
  { char: 'ط', name: 'Ṭāʾ (طَاء)', guide: 'Buat simpul oval mendatar lalu tarik tiang tegak lurus dari atas!', setNumber: 3, strokeSteps: ['1. Simpul oval mendatar', '2. Tiang tegak lurus dari atas ke simpul'] },
  { char: 'ظ', name: 'Ẓāʾ (ظَاء)', guide: 'Bentuk seperti Tha tebal dengan satu mutiara titik di atas!', setNumber: 3, strokeSteps: ['1. Simpul oval & tiang tegak', '2. Titik mutiara di samping tiang'] },
  { char: 'ع', name: 'ʿAyn (عَيْن)', guide: 'Lengkung kepala kecil di atas garis lalu perut besar melengkung di bawah!', setNumber: 3, strokeSteps: ['1. Alis kepala kecil menghadap kanan', '2. Perut besar melengkung di bawah garis'] },
  { char: 'غ', name: 'Ghayn (غَيْن)', guide: 'Bentuk seperti Ain dengan satu mutiara di atas kepala!', setNumber: 3, strokeSteps: ['1. Kepala kecil di atas garis', '2. Perut besar di bawah', '3. Titik di atas kepala'] },
  { char: 'ف', name: 'Fāʾ (فَاء)', guide: 'Lingkaran kepala kecil di atas garis perahu datar dengan satu mutiara!', setNumber: 3, strokeSteps: ['1. Bulatan kepala berleher', '2. Garis perahu mendatar', '3. Titik di atas'] },
  { char: 'ق', name: 'Qāf (قَاف)', guide: 'Lingkaran kepala dengan mangkok melengkung dalam dan dua mutiara di atas!', setNumber: 3, strokeSteps: ['1. Bulatan kepala melingkar', '2. Mangkok melengkung ke bawah', '3. Dua titik di atas'] },

  // Set 4 (HRF-L0-04)
  { char: 'ك', name: 'Kāf (كَاف)', guide: 'Tiang tegak panjang, garis mendatar, dan hamzah kecil di tengah mangkok!', setNumber: 4, strokeSteps: ['1. Tiang tegak lurus tinggi', '2. Dasar mendatar ke kiri', '3. Tanda kaf kecil di tengah'] },
  { char: 'ل', name: 'Lām (لَام)', guide: 'Tiang tegak panjang lalu melengkung mangkok dalam ke kiri!', setNumber: 4, strokeSteps: ['1. Tiang tegak tinggi', '2. Lengkung mangkok turun di bawah garis'] },
  { char: 'م', name: 'Mīm (مِيم)', guide: 'Lingkaran kepala bulat kecil lalu tarik ekor panjang lurus ke bawah!', setNumber: 4, strokeSteps: ['1. Lingkaran kepala di atas garis', '2. Ekor panjang menjulur lurus ke bawah'] },
  { char: 'ن', name: 'Nūn (نُون)', guide: 'Mangkok bulat sempurna melengkung ke bawah dengan satu mutiara di tengah!', setNumber: 4, strokeSteps: ['1. Mangkok melengkung dalam di bawah garis', '2. Satu mutiara di tengah mangkok'] },
  { char: 'ه', name: 'Hāʾ (هَاء)', guide: 'Lingkaran luar besar dengan lingkaran kecil di dalamnya!', setNumber: 4, strokeSteps: ['1. Lengkung luar melingkar', '2. Putaran kecil di dalamnya'] },
  { char: 'و', name: 'Wāw (وَاو)', guide: 'Kepala bulat kecil lalu ekor meluncur melengkung ke bawah garis!', setNumber: 4, strokeSteps: ['1. Kepala bulat di atas garis', '2. Ekor meluncur seperti Ra ke bawah'] },
  { char: 'ي', name: 'Yāʾ (يَاء)', guide: 'Bentuk kepala bebek melengkung lalu badan melingkar ke bawah garis!', setNumber: 4, strokeSteps: ['1. Kepala melengkung di atas garis', '2. Badan melingkar di bawah garis', '3. Dua titik mutiara di bawah'] },
];

export const SandTraceGame: React.FC<SandTraceProps> = ({ onClose, onReward }) => {
  const [flowState, setFlowState] = useState<GameFlowState>('BRIEFING');
  const [selectedSet, setSelectedSet] = useState<1 | 2 | 3 | 4>(1);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [vowelMode, setVowelMode] = useState<'plain' | 'fathah' | 'kasrah' | 'dhammah'>('plain');
  const [isDrawing, setIsDrawing] = useState(false);
  const [pathPoints, setPathPoints] = useState<{ x: number; y: number }[]>([]);
  const [isWashingWave, setIsWashingWave] = useState(false);
  const [completedLetters, setCompletedLetters] = useState<string[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [mascotMood, setMascotMood] = useState<'happy' | 'cheer' | 'thinking' | 'celebrate'>('happy');
  const [mascotComment, setMascotComment] = useState('Gores pasir mengikuti panduan garis!');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const filteredLetters = ALL_LETTERS_TO_TRACE.filter(l => l.setNumber === selectedSet);
  const letter = filteredLetters[currentIdx % filteredLetters.length] || filteredLetters[0];

  const getVocalizedChar = () => {
    if (vowelMode === 'fathah') return `${letter.char}َ`;
    if (vowelMode === 'kasrah') return `${letter.char}ِ`;
    if (vowelMode === 'dhammah') return `${letter.char}ُ`;
    return letter.char;
  };

  const getPronounceText = () => {
    if (vowelMode === 'fathah') return `${letter.char}َ`;
    if (vowelMode === 'kasrah') return `${letter.char}ِ`;
    if (vowelMode === 'dhammah') return `${letter.char}ُ`;
    return letter.name.split(' ')[0];
  };

  // Draw sand canvas
  useEffect(() => {
    if (flowState !== 'PLAYING') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Canvas background - warm gold beach sand texture
    ctx.fillStyle = '#fde68a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Sand grains pattern
    ctx.fillStyle = '#f59e0b18';
    for (let i = 0; i < 350; i++) {
      const rx = (i * 37) % canvas.width;
      const ry = (i * 59) % canvas.height;
      ctx.fillRect(rx, ry, 2.5, 2.5);
    }

    // Faint guide character
    const charToDraw = getVocalizedChar();
    ctx.font = 'bold 155px "Noto Naskh Arabic", Amiri, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#d9770632';
    ctx.fillText(charToDraw, canvas.width / 2, canvas.height / 2 + 10);

    // Draw user drawn trench in the sand
    if (pathPoints.length > 1) {
      ctx.beginPath();
      ctx.moveTo(pathPoints[0].x, pathPoints[0].y);
      for (let i = 1; i < pathPoints.length; i++) {
        ctx.lineTo(pathPoints[i].x, pathPoints[i].y);
      }
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = 26;
      ctx.strokeStyle = '#b45309'; // Depressed dark sand groove
      ctx.stroke();

      // Inner sand highlight groove
      ctx.lineWidth = 14;
      ctx.strokeStyle = '#78350f';
      ctx.stroke();

      // Golden sparkling pearl dust
      pathPoints.forEach((pt, idx) => {
        if (idx % 5 === 0) {
          ctx.fillStyle = '#fef08a';
          ctx.beginPath();
          ctx.arc(pt.x + 3, pt.y - 3, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    }
  }, [flowState, letter, vowelMode, pathPoints]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const y = ((e.clientY - rect.top) / rect.height) * canvas.height;

    setIsDrawing(true);
    setPathPoints([{ x, y }]);
    sound.playPop();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const y = ((e.clientY - rect.top) / rect.height) * canvas.height;

    setPathPoints(prev => [...prev, { x, y }]);
  };

  const handlePointerUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);

    if (pathPoints.length > 14) {
      handleVerifyTrace();
    }
  };

  const triggerOceanWave = () => {
    setIsWashingWave(true);
    sound.playSparkle();
    setTimeout(() => {
      setPathPoints([]);
      setIsWashingWave(false);
    }, 600);
  };

  const handleVerifyTrace = () => {
    sound.playSuccess();
    sound.speakArabic(getPronounceText());
    setMascotMood('celebrate');
    setMascotComment(`Mumtaz! Goresan huruf ${letter.name.split(' ')[0]} indah sekali!`);

    const charKey = `${letter.char}_${vowelMode}`;
    if (!completedLetters.includes(charKey)) {
      const nextCompleted = [...completedLetters, charKey];
      setCompletedLetters(nextCompleted);
      GameStorage.addReward(35, 1, 'kitabah', 3);
      onReward(35, 1);

      if (nextCompleted.length >= Math.min(5, filteredLetters.length)) {
        setTimeout(() => {
          setFlowState('VICTORY');
        }, 1200);
        return;
      }
    }

    setShowCelebration(true);
    setTimeout(() => {
      setShowCelebration(false);
    }, 1800);
  };

  const handleNextLetter = () => {
    sound.playPop();
    setPathPoints([]);
    setShowCelebration(false);
    setCurrentIdx(prev => (prev + 1) % filteredLetters.length);
    setMascotMood('happy');
    setMascotComment('Lanjut ke huruf berikutnya di pantai pasir emas!');
  };

  const handlePrevLetter = () => {
    sound.playPop();
    setPathPoints([]);
    setShowCelebration(false);
    setCurrentIdx(prev => (prev - 1 + filteredLetters.length) % filteredLetters.length);
  };

  const handleAutoTrace = () => {
    sound.playSparkle();
    setMascotMood('cheer');
    setMascotComment('Malaikat pena membantu menggoreskan pasir emas!');

    const canvas = canvasRef.current;
    if (!canvas) return;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    const mockPoints: { x: number; y: number }[] = [];
    for (let t = 0; t <= Math.PI * 1.5; t += 0.2) {
      mockPoints.push({
        x: cx + Math.sin(t) * 45,
        y: cy + Math.cos(t) * 45
      });
    }
    setPathPoints(mockPoints);
    setTimeout(() => {
      handleVerifyTrace();
    }, 400);
  };

  return (
    <BaseGameModal
      title="Jejak Pasir Pantai Huruf"
      titleAr="أَثَرُ الرِّمَالِ فِي الشَّاطِئِ"
      islandName="Pulau Huruf"
      islandColor="from-amber-500 via-orange-500 to-amber-700"
      gameIcon="🏖️"
      targetObjective="Gores dan kenali 28 huruf hijaiah dengan kaidah khat Naskh di atas pasir pantai emas"
      howToPlay={[
        { icon: '🖐️', text: 'Sentuh atau seret jarimu di atas pasir pantai untuk membentuk goresan huruf.' },
        { icon: '🔊', text: 'Dengarkan lafal makhraj huruf dengan harakat Fathah, Kasrah, atau Dhammah.' },
        { icon: '🌊', text: 'Tekan "Sapu Ombak" untuk meratakan pasir kembali dan mencoba goresan baru.' }
      ]}
      speechArabic="اِرْسُمْ حُرُوفَ اللُّغَةِ العَرَبِيَّةِ فِي الرِّمَالِ!"
      speechIntro="Mari menggores mutiara huruf hijaiah di tepi pantai Jazirat al-Huruf!"
      flowState={flowState}
      onStartGame={() => {
        setFlowState('PLAYING');
        setPathPoints([]);
        sound.speakArabic(getPronounceText());
      }}
      onPlayAgain={() => {
        setFlowState('PLAYING');
        setCompletedLetters([]);
        setPathPoints([]);
        setCurrentIdx(0);
      }}
      onClose={onClose}
      currentRound={completedLetters.length + 1}
      totalRounds={Math.min(5, filteredLetters.length)}
      score={completedLetters.length}
      maxScore={Math.min(5, filteredLetters.length)}
      starsEarned={completedLetters.length >= 4 ? 3 : completedLetters.length >= 2 ? 2 : 1}
      xpEarned={completedLetters.length * 35}
      mascotMood={mascotMood}
      mascotComment={mascotComment}
      mascotArabic={getVocalizedChar()}
      onPlayTitleAudio={() => sound.speakArabic(getPronounceText())}
      victorySummary={[
        { label: 'Huruf Tergores', value: `${completedLetters.length} Huruf` },
        { label: 'Set Selesai', value: `Set ${selectedSet}` },
        { label: 'Tingkat Khat', value: 'Naskh Dasar' },
        { label: 'Mutiara Diperoleh', value: '💎 Berkah' }
      ]}
    >
      {/* Set Selector Pills */}
      <div className="flex items-center justify-between gap-1.5 pb-2 mb-2 border-b border-amber-200/80 overflow-x-auto text-xs">
        <span className="font-bold text-slate-700 shrink-0 text-[11px]">Set:</span>
        <div className="flex items-center gap-1">
          {[
            { id: 1 as const, label: 'أ - خ' },
            { id: 2 as const, label: 'د - ص' },
            { id: 3 as const, label: 'ض - ق' },
            { id: 4 as const, label: 'ك - ي' },
          ].map(s => (
            <button
              key={s.id}
              onClick={() => {
                sound.playPop();
                setSelectedSet(s.id);
                setCurrentIdx(0);
                setPathPoints([]);
              }}
              className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                selectedSet === s.id
                  ? 'bg-amber-500 text-slate-950 font-black shadow-xs ring-1 ring-amber-400'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Vocalization Pills */}
        <div className="flex items-center gap-1 shrink-0">
          {(['plain', 'fathah', 'kasrah', 'dhammah'] as const).map(v => (
            <button
              key={v}
              onClick={() => {
                sound.playPop();
                setVowelMode(v);
                setPathPoints([]);
              }}
              className={`px-2 py-0.5 rounded-lg text-xs font-bold transition-all ${
                vowelMode === v
                  ? 'bg-teal-600 text-white font-black shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {v === 'plain' ? 'Asli' : v === 'fathah' ? 'َ (A)' : v === 'kasrah' ? 'ِ (I)' : 'ُ (U)'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Play Area */}
      <div className="flex flex-col items-center">
        {/* Letter Card Header */}
        <div className="flex items-center justify-between w-full max-w-sm mb-2 px-1">
          <div className="flex items-center gap-2">
            <span className="font-arabic text-3xl font-black text-amber-800 leading-none">
              {getVocalizedChar()}
            </span>
            <div>
              <h4 className="text-sm font-black text-slate-800 leading-tight">{letter.name}</h4>
              <p className="text-[11px] text-slate-500 leading-tight">{letter.guide}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => sound.speakArabic(getPronounceText())}
            className="p-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 transition-colors shrink-0 shadow-2xs"
            title="Dengarkan Lafal"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        {/* Sand Canvas Frame */}
        <div className="relative w-full aspect-square max-w-[280px] sm:max-w-[320px] rounded-3xl overflow-hidden border-4 border-amber-400 shadow-inner bg-amber-200 touch-none my-1">
          <canvas
            ref={canvasRef}
            width={320}
            height={320}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className="w-full h-full cursor-crosshair"
          />

          {/* Ocean Wave Wash Animation Overlay */}
          <AnimatePresence>
            {isWashingWave && (
              <motion.div
                initial={{ y: '100%', opacity: 0.8 }}
                animate={{ y: '-100%', opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.65, ease: 'easeInOut' }}
                className="absolute inset-0 bg-gradient-to-t from-cyan-400/80 via-teal-300/80 to-white/90 pointer-events-none flex items-center justify-center"
              >
                <div className="text-white text-sm font-bold font-chibi flex items-center gap-2 drop-shadow-md">
                  🌊 Ombak menyapu pasir pantai...
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* In-canvas Success Celebration Pop */}
          <AnimatePresence>
            {showCelebration && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="absolute inset-0 bg-teal-950/60 backdrop-blur-xs flex flex-col items-center justify-center p-3 text-center z-20"
              >
                <div className="bg-white rounded-3xl p-4 shadow-2xl border-4 border-amber-300 flex flex-col items-center max-w-[240px]">
                  <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mb-1 animate-bounce">
                    <Award className="w-7 h-7" />
                  </div>
                  <h4 className="text-sm font-black text-slate-800 font-chibi">Mumtaz! Mutiara Pasir Terbuka!</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Huruf <strong className="font-arabic text-teal-700 text-base">{getVocalizedChar()}</strong> berhasil digores!
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Controls */}
        <div className="w-full max-w-sm flex items-center justify-between gap-2 mt-2 pt-1">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={triggerOceanWave}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 text-xs font-bold transition-all active:scale-95 border border-amber-300"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Sapu Ombak
            </button>
            <button
              type="button"
              onClick={handleAutoTrace}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold transition-all active:scale-95 border border-amber-200"
              title="Bantu buat goresan"
            >
              <Wand2 className="w-3.5 h-3.5 text-amber-600" />
              Bantu
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handlePrevLetter}
              className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 active:scale-95"
              title="Huruf Sebelumnya"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNextLetter}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-all active:scale-95 shadow-xs"
            >
              Lanjut
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </BaseGameModal>
  );
};
