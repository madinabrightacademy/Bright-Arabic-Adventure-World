import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, RefreshCw, Volume2, ArrowRight, Award, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { sound } from '../../services/sound';
import { GameStorage } from '../../services/storage';

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
  const [selectedSet, setSelectedSet] = useState<1 | 2 | 3 | 4>(1);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [vowelMode, setVowelMode] = useState<'plain' | 'fathah' | 'kasrah' | 'dhammah'>('plain');
  const [isDrawing, setIsDrawing] = useState(false);
  const [pathPoints, setPathPoints] = useState<{ x: number; y: number }[]>([]);
  const [isWashingWave, setIsWashingWave] = useState(false);
  const [completedLetters, setCompletedLetters] = useState<string[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);

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
  }, [letter, vowelMode, pathPoints]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const y = ((e.clientY - rect.top) / rect.height) * canvas.height;
    setIsDrawing(true);
    setPathPoints([{ x, y }]);
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
    setIsDrawing(false);
    if (pathPoints.length > 18) {
      handleVerifyTrace();
    }
  };

  const handleVerifyTrace = () => {
    sound.playSuccess();
    sound.speakArabic(getPronounceText());
    if (!completedLetters.includes(letter.char)) {
      setCompletedLetters(prev => [...prev, letter.char]);
      GameStorage.addReward(50, 3, 'kitabah', 8);
      onReward(50, 3);
    }
    setShowCelebration(true);
  };

  const triggerOceanWave = () => {
    sound.playWave();
    setIsWashingWave(true);
    setTimeout(() => {
      setPathPoints([]);
      setIsWashingWave(false);
      setShowCelebration(false);
    }, 650);
  };

  const handleNextLetter = () => {
    triggerOceanWave();
    if (currentIdx < filteredLetters.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setCurrentIdx(0);
    }
  };

  const handlePrevLetter = () => {
    triggerOceanWave();
    if (currentIdx > 0) {
      setCurrentIdx(prev => prev - 1);
    } else {
      setCurrentIdx(filteredLetters.length - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/75 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        className="w-full max-w-lg bg-amber-50 rounded-[32px] shadow-2xl border-4 border-amber-300 overflow-hidden flex flex-col max-h-[95vh]"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-700 via-teal-600 to-amber-600 text-white p-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-white/20 uppercase tracking-wider">
                Pulau Huruf (HRF)
              </span>
              <span className="text-[10px] bg-amber-400 text-amber-950 font-extrabold px-2 py-0.5 rounded-full">
                Mutiara: {completedLetters.length}/{ALL_LETTERS_TO_TRACE.length}
              </span>
            </div>
            <h2 className="text-lg font-black font-chibi flex items-center gap-1.5 mt-1">
              🏖️ Sand Trace (Jejak Pasir Mutiara)
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white font-bold transition-colors active:scale-95"
          >
            ✕
          </button>
        </div>

        {/* Set Tab Buttons */}
        <div className="bg-amber-100/70 p-2 border-b border-amber-200">
          <div className="grid grid-cols-4 gap-1.5 text-xs font-bold">
            <button
              onClick={() => { setSelectedSet(1); setCurrentIdx(0); triggerOceanWave(); }}
              className={`py-1.5 rounded-xl transition-all ${
                selectedSet === 1 ? 'bg-teal-700 text-white shadow-xs font-black' : 'bg-white/80 text-slate-700 hover:bg-white'
              }`}
            >
              Set 1 (ا-خ)
            </button>
            <button
              onClick={() => { setSelectedSet(2); setCurrentIdx(0); triggerOceanWave(); }}
              className={`py-1.5 rounded-xl transition-all ${
                selectedSet === 2 ? 'bg-teal-700 text-white shadow-xs font-black' : 'bg-white/80 text-slate-700 hover:bg-white'
              }`}
            >
              Set 2 (د-ص)
            </button>
            <button
              onClick={() => { setSelectedSet(3); setCurrentIdx(0); triggerOceanWave(); }}
              className={`py-1.5 rounded-xl transition-all ${
                selectedSet === 3 ? 'bg-teal-700 text-white shadow-xs font-black' : 'bg-white/80 text-slate-700 hover:bg-white'
              }`}
            >
              Set 3 (ض-ق)
            </button>
            <button
              onClick={() => { setSelectedSet(4); setCurrentIdx(0); triggerOceanWave(); }}
              className={`py-1.5 rounded-xl transition-all ${
                selectedSet === 4 ? 'bg-teal-700 text-white shadow-xs font-black' : 'bg-white/80 text-slate-700 hover:bg-white'
              }`}
            >
              Set 4 (ك-ي)
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 flex-1 flex flex-col items-center overflow-y-auto">
          {/* Target Character & Audio bar */}
          <div className="w-full flex items-center justify-between bg-white rounded-2xl p-3 border border-amber-200 shadow-xs mb-2.5">
            <div className="flex items-center gap-3">
              <button
                onClick={() => sound.speakArabic(getPronounceText())}
                className="w-11 h-11 rounded-2xl bg-teal-600 hover:bg-teal-700 active:scale-95 text-white flex items-center justify-center shadow-md transition-all shrink-0"
                title="Dengarkan pengucapan fasih"
              >
                <Volume2 className="w-5 h-5" />
              </button>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Huruf Telusur:</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-black text-slate-900">{letter.name}</h3>
                  <span className="font-arabic text-xl font-bold text-teal-800">{getVocalizedChar()}</span>
                </div>
              </div>
            </div>

            {/* Vowel Switcher */}
            <div className="flex gap-1 bg-amber-50 p-1 rounded-xl border border-amber-200 text-xs">
              <button
                onClick={() => setVowelMode('plain')}
                className={`px-2 py-1 rounded-lg font-bold transition-all ${vowelMode === 'plain' ? 'bg-amber-500 text-slate-950 font-black shadow-xs' : 'text-slate-600'}`}
                title="Huruf Polos"
              >
                Polos
              </button>
              <button
                onClick={() => setVowelMode('fathah')}
                className={`px-2 py-1 rounded-lg font-bold font-arabic transition-all ${vowelMode === 'fathah' ? 'bg-amber-500 text-slate-950 font-black shadow-xs' : 'text-slate-600'}`}
                title="Fathah (a)"
              >
                ـَ
              </button>
              <button
                onClick={() => setVowelMode('kasrah')}
                className={`px-2 py-1 rounded-lg font-bold font-arabic transition-all ${vowelMode === 'kasrah' ? 'bg-amber-500 text-slate-950 font-black shadow-xs' : 'text-slate-600'}`}
                title="Kasrah (i)"
              >
                ـِ
              </button>
              <button
                onClick={() => setVowelMode('dhammah')}
                className={`px-2 py-1 rounded-lg font-bold font-arabic transition-all ${vowelMode === 'dhammah' ? 'bg-amber-500 text-slate-950 font-black shadow-xs' : 'text-slate-600'}`}
                title="Dhammah (u)"
              >
                ـُ
              </button>
            </div>
          </div>

          {/* Stroke steps guide */}
          <div className="bg-amber-100/80 border border-amber-200 rounded-2xl p-2.5 w-full mb-3 text-xs">
            <span className="font-bold text-amber-950 block mb-1">✍️ Kaidah Urutan Goresan (Khat Naskh):</span>
            <div className="flex flex-wrap gap-1.5 text-[11px] text-amber-900">
              {letter.strokeSteps.map((step, sIdx) => (
                <span key={sIdx} className="bg-white/80 px-2 py-0.5 rounded-lg border border-amber-200/60">
                  {step}
                </span>
              ))}
            </div>
          </div>

          {/* Interactive Beach Sand Canvas */}
          <div className="relative w-full aspect-square max-w-[320px] rounded-3xl overflow-hidden border-4 border-amber-400 shadow-inner bg-amber-200 touch-none my-auto">
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
                  <div className="text-white text-base font-bold font-chibi flex items-center gap-2 drop-shadow-md">
                    🌊 Ombak menyapu pasir pantai...
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success Celebration Overlay */}
            <AnimatePresence>
              {showCelebration && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="absolute inset-0 bg-teal-950/60 backdrop-blur-xs flex flex-col items-center justify-center p-4 text-center z-20"
                >
                  <div className="bg-white rounded-3xl p-5 shadow-2xl border-4 border-amber-300 flex flex-col items-center max-w-[260px]">
                    <div className="w-14 h-14 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mb-2 animate-bounce">
                      <Award className="w-8 h-8" />
                    </div>
                    <h4 className="text-base font-black text-slate-800 font-chibi">Mumtaz! Mutiara Pasir Terbuka!</h4>
                    <p className="text-xs text-slate-600 mt-1">
                      Mutiara huruf <strong className="font-arabic text-teal-700 text-lg">{getVocalizedChar()}</strong> berhasil digores!
                    </p>
                    <div className="mt-3 flex gap-2 w-full">
                      <button
                        onClick={handleNextLetter}
                        className="flex-1 py-2 px-3 bg-gradient-to-r from-amber-500 to-teal-600 text-white rounded-xl font-bold text-xs shadow-md flex items-center justify-center gap-1 active:scale-95"
                      >
                        Huruf Berikutnya <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Action buttons */}
          <div className="w-full flex items-center justify-between gap-2 mt-3 pt-1">
            <button
              onClick={triggerOceanWave}
              className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-amber-200/90 hover:bg-amber-300 text-amber-950 text-xs font-bold transition-all active:scale-95 shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Sapu Ombak Pasir
            </button>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrevLetter}
                className="p-2 rounded-2xl bg-white hover:bg-amber-100 text-slate-700 border border-amber-200 active:scale-95"
                title="Huruf Sebelumnya"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextLetter}
                className="flex items-center gap-1 px-4 py-2 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-all active:scale-95 shadow-md"
              >
                Lanjut Huruf
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
