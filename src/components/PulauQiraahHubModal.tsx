import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  Volume2,
  Sparkles,
  Award,
  Bookmark,
  CheckCircle2,
  ChevronRight,
  Star,
  Compass,
  Search,
  BookMarked,
  Layers,
  Heart,
  Eye,
  Type,
  FileText,
  Mail,
  Zap,
  RotateCcw
} from 'lucide-react';
import { UserProfile, Island } from '../types/game';
import { sound } from '../services/sound';
import { GameStorage } from '../services/storage';
import { GRADED_READINGS, SKILLS_DATA } from '../data/curriculum';

interface PulauQiraahHubModalProps {
  island: Island;
  profile: UserProfile;
  onClose: () => void;
  onLaunchGame: (gameId: string) => void;
  onReward: (xp: number, stars: number) => void;
}

type QraTab = 'scroll_reader' | 'tree_shelves' | 'hudhud_letters' | 'curriculum';

export const PulauQiraahHubModal: React.FC<PulauQiraahHubModalProps> = ({
  island,
  profile,
  onClose,
  onLaunchGame,
  onReward
}) => {
  const [activeTab, setActiveTab] = useState<QraTab>('scroll_reader');
  const [selectedStoryIdx, setSelectedStoryIdx] = useState(0);
  const [activeWordGloss, setActiveWordGloss] = useState<{ ar: string; mean: string } | null>(null);
  const [savedWords, setSavedWords] = useState<string[]>([]);
  const [completedStories, setCompletedStories] = useState<string[]>([]);
  const [readingLevelFilter, setReadingLevelFilter] = useState<number | 'all'>('all');
  const [fontSizeClass, setFontSizeClass] = useState<'text-xl' | 'text-2xl' | 'text-3xl'>('text-2xl');
  const [showHarakat, setShowHarakat] = useState(true);

  // Hudhud Daily Letters State
  const [activeLetterIdx, setActiveLetterIdx] = useState(0);
  const [letterQuizAnswers, setLetterQuizAnswers] = useState<Record<number, number>>({});

  const HUDHUD_ARCHIVE_LETTERS = [
    {
      id: 1,
      sender: 'Sahabat Hudhud (Burung Petualang)',
      date: 'Surat Pagi: Hari ke-1 di Hutan Naskah',
      preview: 'Pohon Buku & Bunga Mawar Harakat...',
      ar: 'صَبَاحَ الخَيْرِ يَا صَدِيقِي العَزِيز! أَنَا أَطِيرُ فَوْقَ أَشْجَارِ المَكْتَبَةِ وَرَأَيْتُ وَرَقَةً ذَهَبِيَّةً تَلْمَعُ فِي الشَّمْسِ. اقْرَأْ كُلَّ يَوْمٍ لِيَنْمُوَ عَقْلُكَ!',
      translit: 'Ṣabāḥa l-khayri yā ṣadīqī l-ʿazīz! Anā aṭīru fawqa asyjāri l-maktabati wa-raʾaytu waraqatan dhahabiyyatan talmaʿu fī sy-syams. Iqraʾ kulla yawmin li-yanmuwa ʿaqluk!',
      translation: 'Selamat pagi wahai sahabat karibku! Aku sedang terbang melintasi pohon-pohon perpustakaan dan melihat selembar naskah emas berkilau di bawah sinar mentari. Bacalah setiap hari agar akal budimu bertumbuh subur!',
      question: 'Apa yang dilihat oleh Hudhud saat terbang di atas pohon perpustakaan?',
      options: [
        { text: 'Selembar naskah emas berkilau (وَرَقَة ذَهَبِيَّة)', correct: true },
        { text: 'Sebuah pedang kuno berkarat', correct: false },
        { text: 'Seekor kucing yang sedang tidur', correct: false }
      ],
      wisdom: 'Membaca adalah sayap bagi pikiran untuk menjelajah semesta ilmu tanpa batas.'
    },
    {
      id: 2,
      sender: 'Sahabat Hudhud (Burung Petualang)',
      date: 'Surat Senja: Rahasia Tanda Harakat',
      preview: 'Harakat bagaikan lentera jalan...',
      ar: 'يَا طَالِبَ العِلْمِ، إِنَّ الحَرَكَاتِ (الفَتْحَةَ وَالكَسْرَةَ وَالضَّمَّةَ) مِثْلُ المَصَابِيحِ الَّتِي تُنِيرُ طَرِيقَ القَارِئِ. تَأَنَّ فِي القِرَاءَةِ وَلَا تَتَعَجَّلْ!',
      translit: 'Yā ṭāliba l-ʿilmi, inna l-ḥarakāti (al-fatḥata wa-l-kasrata wa-ḍ-ḍammata) mithlu l-maṣābīḥi llatī tunīru ṭarīqa l-qāriʾ. Taʾanna fī l-qirāʾati wa-lā tataʿajjal!',
      translation: 'Wahai penuntut ilmu, sesungguhnya harakat (fathah, kasrah, dan dhammah) ibarat pelita lentera yang menerangi jalan sang pembaca. Bacalah dengan cermat dan jangan terburu-buru!',
      question: 'Menurut Hudhud, harakat diibaratkan seperti apa bagi pembaca?',
      options: [
        { text: 'Pelita lentera penerang jalan (مَصَابِيح)', correct: true },
        { text: 'Batu karang di tengah samudra', correct: false },
        { text: 'Kunci pintu gudang makanan', correct: false }
      ],
      wisdom: 'Kecermatan melafalkan harakat adalah kunci memahami keindahan firman dan sabda nabi.'
    },
    {
      id: 3,
      sender: 'Sahabat Hudhud (Burung Petualang)',
      date: 'Surat Malam: Mutiara Baitul Hikmah',
      preview: 'Perpustakaan para khalifah...',
      ar: 'زُرْتُ اليَوْمَ قِمَّةَ الشَّجَرَةِ الكُبْرَى حَيْثُ حِكْمَةُ الإِمَامِ الشَّافِعِيِّ. تَعَلَّمْ فَلَيْسَ المَرْءُ يُولَدُ عَالِمًا، وَلَيْسَ أَخُو عِلْمٍ كَمَنْ هُوَ جَاهِلُ!',
      translit: 'Zurtu l-yawma qimmata sy-syajarati l-kubrā ḥaythu ḥikmatu l-Imāmi sy-Syāfiʿī. Taʿallam fa-laysa l-marʾu yūladu ʿāliman, wa-laysa akhū ʿilmin ka-man huwa jāhil!',
      translation: 'Hari ini aku mengunjungi puncak pohon buku raksasa tempat bertengger bait hikmah Imam Asy-Syafi\'i: "Belajarlah, sebab tidak ada manusia yang terlahir sudah menjadi alim ulama, dan orang berilmu tidaklah sama dengan orang yang bodoh!"',
      question: 'Apakah manusia terlahir langsung berilmu menurut bait syi\'ir di atas?',
      options: [
        { text: 'Tidak, setiap insan harus berjuang belajar tekun', correct: true },
        { text: 'Ya, semua manusia langsung tahu segala ilmu', correct: false },
        { text: 'Hanya orang kaya yang bisa berilmu', correct: false }
      ],
      wisdom: 'Ketekunan dan rasa haus akan hikmah adalah kemuliaan sejati seorang murid.'
    }
  ];

  const filteredStories = GRADED_READINGS.filter(story => {
    if (readingLevelFilter === 'all') return true;
    return story.level === readingLevelFilter;
  });

  const currentStory = GRADED_READINGS[selectedStoryIdx] || GRADED_READINGS[0];

  const handleTapWord = (word: { ar: string; mean: string }) => {
    sound.speakArabic(word.ar);
    setActiveWordGloss(word);
  };

  const handleSaveToCollection = (word: { ar: string; mean: string }) => {
    sound.playSparkle();
    if (!savedWords.includes(word.ar)) {
      setSavedWords(prev => [...prev, word.ar]);
      GameStorage.addReward(25, 1, 'qiraah', 4);
      onReward(25, 1);
    }
  };

  const handleCompleteCurrentStory = () => {
    sound.playSuccess();
    sound.playFanfare();
    if (!completedStories.includes(currentStory.id)) {
      setCompletedStories(prev => [...prev, currentStory.id]);
      GameStorage.addReward(80, 5, 'qiraah', 12);
      onReward(80, 5);
    }
  };

  const handleAnswerLetter = (letterIdx: number, optIdx: number) => {
    if (letterQuizAnswers[letterIdx] !== undefined) return;
    setLetterQuizAnswers(prev => ({ ...prev, [letterIdx]: optIdx }));

    const letter = HUDHUD_ARCHIVE_LETTERS[letterIdx];
    if (letter.options[optIdx].correct) {
      sound.playSuccess();
      GameStorage.addReward(35, 2, 'qiraah', 6);
      onReward(35, 2);
    } else {
      sound.playGentleRetry();
    }
  };

  const qraSkills = SKILLS_DATA.filter(s => s.owner_island === 'QRA');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/75 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        className="w-full max-w-5xl bg-gradient-to-b from-rose-50 via-white to-amber-50/40 rounded-3xl shadow-2xl border-4 border-rose-300 overflow-hidden flex flex-col max-h-[94vh]"
      >
        {/* Header Mahkota Perpustakaan Qira'ah */}
        <div className="bg-gradient-to-r from-rose-800 via-red-700 to-amber-800 text-white p-4 sm:p-5 relative overflow-hidden shadow-lg">
          <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute right-32 -bottom-10 w-36 h-36 bg-amber-400/20 rounded-full blur-xl pointer-events-none" />

          <div className="relative z-10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-13 h-13 rounded-2xl bg-white/15 border border-white/30 backdrop-blur-md flex items-center justify-center text-3xl shadow-md">
                📖
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-rose-950/40 text-rose-200 border border-rose-400/30">
                    Pulau ke-6 • Perpustakaan Qira'ah
                  </span>
                  <span className="text-xs text-amber-200 font-arabic font-bold">
                    مَكْتَبَةُ القِرَاءَة
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black font-chibi tracking-wide text-white drop-shadow-xs">
                  Pusat Membaca Bertingkat & Gulungan Hikmah
                </h2>
                <p className="text-xs text-rose-100 max-w-xl line-clamp-1 mt-0.5">
                  Buka naskah hikmah berharakat, gunakan teknologi sentuh kata (Tap-Gloss), dan kumpulkan surat harian sahabat Hudhud.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 text-white font-bold flex items-center justify-center transition-all shadow-md shrink-0 border border-white/20"
              title="Tutup Modal"
            >
              ✕
            </button>
          </div>

          {/* Navigation Bar Tabs */}
          <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1 text-xs font-bold scrollbar-none">
            <button
              onClick={() => setActiveTab('scroll_reader')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap shadow-xs ${
                activeTab === 'scroll_reader'
                  ? 'bg-amber-400 text-slate-950 shadow-md font-black scale-102 ring-2 ring-amber-200'
                  : 'bg-white/15 text-rose-100 hover:bg-white/25'
              }`}
            >
              <BookOpen className="w-4 h-4 text-rose-950" />
              <span>Scroll Tap-Gloss (Baca Bertingkat)</span>
            </button>

            <button
              onClick={() => setActiveTab('tree_shelves')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap shadow-xs ${
                activeTab === 'tree_shelves'
                  ? 'bg-amber-400 text-slate-950 shadow-md font-black scale-102 ring-2 ring-amber-200'
                  : 'bg-white/15 text-rose-100 hover:bg-white/25'
              }`}
            >
              <BookMarked className="w-4 h-4 text-rose-950" />
              <span>Rak Naskah & Koleksi Kosakata ({savedWords.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('hudhud_letters')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap shadow-xs ${
                activeTab === 'hudhud_letters'
                  ? 'bg-amber-400 text-slate-950 shadow-md font-black scale-102 ring-2 ring-amber-200'
                  : 'bg-white/15 text-rose-100 hover:bg-white/25'
              }`}
            >
              <Mail className="w-4 h-4 text-rose-950" />
              <span>Arsip Surat Sahabat Hudhud ({HUDHUD_ARCHIVE_LETTERS.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('curriculum')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap shadow-xs ${
                activeTab === 'curriculum'
                  ? 'bg-amber-400 text-slate-950 shadow-md font-black scale-102 ring-2 ring-amber-200'
                  : 'bg-white/15 text-rose-100 hover:bg-white/25'
              }`}
            >
              <Award className="w-4 h-4 text-rose-950" />
              <span>18 Kompetensi Qira'ah</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/50">
          {/* TAB 1: SCROLL TAP-GLOSS READER */}
          {activeTab === 'scroll_reader' && (
            <div className="space-y-5">
              {/* Top Banner Guide */}
              <div className="bg-gradient-to-r from-rose-100 via-amber-50 to-orange-50 border-2 border-rose-200 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center font-bold text-lg shrink-0">
                    ✨
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-rose-950">
                      Metode Membaca Berbantuan Tap-Gloss
                    </h3>
                    <p className="text-xs text-rose-800">
                      Ketuk kata mana pun untuk mendengar pelafalan fasih penutur asli dan melihat maknanya secara instan tanpa memecah konsentrasi membaca.
                    </p>
                  </div>
                </div>

                {/* Display Preferences */}
                <div className="flex items-center gap-2 self-end md:self-auto shrink-0 text-xs">
                  <div className="bg-white px-2.5 py-1.5 rounded-xl border border-rose-200 flex items-center gap-1.5 shadow-2xs">
                    <Type className="w-3.5 h-3.5 text-rose-600" />
                    <span className="text-[11px] font-bold text-slate-600">Ukuran Teks:</span>
                    <button
                      onClick={() => setFontSizeClass('text-xl')}
                      className={`px-1.5 py-0.5 rounded font-bold ${fontSizeClass === 'text-xl' ? 'bg-rose-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
                    >
                      S
                    </button>
                    <button
                      onClick={() => setFontSizeClass('text-2xl')}
                      className={`px-1.5 py-0.5 rounded font-bold ${fontSizeClass === 'text-2xl' ? 'bg-rose-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
                    >
                      M
                    </button>
                    <button
                      onClick={() => setFontSizeClass('text-3xl')}
                      className={`px-1.5 py-0.5 rounded font-bold ${fontSizeClass === 'text-3xl' ? 'bg-rose-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
                    >
                      L
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      sound.playPop();
                      setShowHarakat(!showHarakat);
                    }}
                    className={`px-3 py-1.5 rounded-xl border font-bold text-xs flex items-center gap-1.5 transition-all ${
                      showHarakat
                        ? 'bg-emerald-600 text-white border-emerald-500 shadow-2xs'
                        : 'bg-white text-slate-700 border-rose-200 hover:bg-rose-50'
                    }`}
                  >
                    <span>{showHarakat ? 'Harakat Aktif' : 'Teks Gundul'}</span>
                  </button>
                </div>
              </div>

              {/* Story Shelf Selector */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold scrollbar-none">
                <span className="text-[11px] font-black uppercase text-slate-500 shrink-0 mr-1">
                  Pilih Naskah:
                </span>
                {GRADED_READINGS.map((st, idx) => {
                  const isSelected = selectedStoryIdx === idx;
                  const isDone = completedStories.includes(st.id);

                  return (
                    <button
                      key={st.id}
                      onClick={() => {
                        setSelectedStoryIdx(idx);
                        setActiveWordGloss(null);
                        sound.playPop();
                      }}
                      className={`px-3.5 py-2 rounded-2xl flex items-center gap-2 whitespace-nowrap transition-all shadow-xs border ${
                        isSelected
                          ? 'bg-rose-700 text-white border-rose-800 shadow-md scale-102 font-black'
                          : 'bg-white text-slate-700 border-rose-200 hover:bg-rose-50'
                      }`}
                    >
                      <span>{st.icon || '📜'}</span>
                      <span>Jenjang {st.level}: {st.title.split(' ')[0]}</span>
                      {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 fill-emerald-600" />}
                    </button>
                  );
                })}
              </div>

              {/* Main Reading Canvas */}
              <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-rose-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-bl-full pointer-events-none" />

                {/* Story Meta Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 mb-5 border-b border-rose-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-black uppercase tracking-wider">
                        Jenjang {currentStory.level} • {currentStory.theme || 'Literasi Bertingkat'}
                      </span>
                      {completedStories.includes(currentStory.id) && (
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Selesai Dibaca
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                      {currentStory.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {currentStory.summary}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={() => {
                        const fullText = currentStory.paragraphs.map(p => p.ar).join(' ');
                        sound.speakArabic(fullText);
                      }}
                      className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-xs shadow-xs active:scale-95 transition-all flex items-center gap-1.5"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>Dengarkan Seluruh Teks</span>
                    </button>

                    <button
                      onClick={() => onLaunchGame('scroll_tap_gloss')}
                      className="px-3.5 py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-xl font-black text-xs shadow-xs active:scale-95 transition-all flex items-center gap-1.5"
                    >
                      <Zap className="w-4 h-4" />
                      <span>Mode Game Penuh</span>
                    </button>
                  </div>
                </div>

                {/* Interactive Paragraphs with Tap-Gloss Blocks */}
                <div className="space-y-6">
                  {currentStory.paragraphs.map((p, pIdx) => (
                    <div
                      key={pIdx}
                      className="p-4 sm:p-5 rounded-2xl bg-amber-50/40 border border-amber-200/60 transition-all hover:bg-amber-50/80"
                    >
                      {/* Arabic Words Clickable Flow */}
                      <div
                        className="flex flex-wrap items-center justify-end gap-2 sm:gap-2.5 mb-3 leading-relaxed"
                        dir="rtl"
                      >
                        {p.words.map((w, wIdx) => {
                          const isSelected = activeWordGloss?.ar === w.ar;
                          const isSaved = savedWords.includes(w.ar);

                          return (
                            <button
                              key={wIdx}
                              onClick={() => handleTapWord(w)}
                              className={`font-arabic ${fontSizeClass} px-3 py-1.5 rounded-2xl transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-rose-600 text-white shadow-md ring-2 ring-rose-400 scale-105 font-bold'
                                  : isSaved
                                  ? 'bg-emerald-100 text-emerald-950 border border-emerald-300 font-bold shadow-2xs hover:bg-emerald-200'
                                  : 'bg-white hover:bg-rose-100/70 text-slate-800 border border-rose-200/80 font-medium shadow-2xs active:scale-95'
                              }`}
                              title={`Ketuk untuk arti: ${w.mean}`}
                            >
                              {w.ar}
                            </button>
                          );
                        })}
                      </div>

                      {/* Indonesian Meaning & Transliteration */}
                      <div className="pt-3 border-t border-amber-200/60 flex flex-col gap-0.5">
                        <p className="text-xs sm:text-sm font-semibold text-slate-800">
                          {p.translation}
                        </p>
                        <p className="text-[11px] text-slate-500 italic">
                          {p.translit}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Active Tap-Gloss Card Popover */}
                <AnimatePresence>
                  {activeWordGloss && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      className="mt-6 bg-gradient-to-r from-rose-700 via-red-600 to-amber-700 text-white rounded-2xl p-4 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-2 border-rose-300"
                    >
                      <div className="flex items-center gap-3.5">
                        <button
                          onClick={() => sound.speakArabic(activeWordGloss.ar)}
                          className="w-12 h-12 rounded-2xl bg-white/20 hover:bg-white/30 text-white flex items-center justify-center shadow-md active:scale-95 transition-all shrink-0"
                          title="Ulangi pelafalan audio"
                        >
                          <Volume2 className="w-6 h-6" />
                        </button>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase text-amber-300 tracking-wider">
                              Kosakata Tap-Gloss
                            </span>
                            <span className="text-xs text-rose-200">• Sentuh & Simpan</span>
                          </div>
                          <h4 className="font-arabic text-3xl font-bold leading-tight">
                            {activeWordGloss.ar}
                          </h4>
                          <p className="text-sm font-bold text-amber-200">
                            Artinya: "{activeWordGloss.mean}"
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                        <button
                          onClick={() => handleSaveToCollection(activeWordGloss)}
                          className={`px-4 py-2.5 rounded-xl font-black text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all ${
                            savedWords.includes(activeWordGloss.ar)
                              ? 'bg-emerald-400 text-slate-950'
                              : 'bg-amber-300 hover:bg-amber-400 text-slate-950'
                          }`}
                        >
                          <Bookmark className="w-4 h-4 fill-slate-950" />
                          <span>
                            {savedWords.includes(activeWordGloss.ar)
                              ? 'Tersimpan di Rak'
                              : 'Simpan ke Rak Buku (+25 XP)'}
                          </span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Bottom Story Completion Bar */}
                <div className="mt-7 pt-4 border-t border-rose-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-xs text-slate-500 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>
                      Hadiah penyelesaian: <strong>+80 XP</strong> & <strong>+5 Bintang</strong> untuk peringkat Hudhud!
                    </span>
                  </div>

                  {!completedStories.includes(currentStory.id) ? (
                    <button
                      onClick={handleCompleteCurrentStory}
                      className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white rounded-2xl font-black text-xs shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Tandai Naskah Selesai Dibaca</span>
                    </button>
                  ) : (
                    <div className="px-5 py-2.5 bg-emerald-50 text-emerald-900 border border-emerald-300 rounded-2xl font-bold text-xs flex items-center gap-2 shadow-2xs">
                      <span>🎉 Naskah ini telah tuntas dibaca & dipahami!</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TREE SHELVES & VOCABULARY COLLECTION */}
          {activeTab === 'tree_shelves' && (
            <div className="space-y-5">
              {/* Header Showcase */}
              <div className="bg-gradient-to-r from-amber-700 to-rose-800 text-white p-5 rounded-3xl shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-300">
                    Pohon Naskah Bercahaya
                  </span>
                  <h3 className="text-xl font-black">
                    Rak Koleksi Kosakata Bacaan Mandiri
                  </h3>
                  <p className="text-xs text-amber-100 mt-1 max-w-xl">
                    Semua kata yang kamu tandai saat membaca tersimpan rapi di sini. Ulangi pelafalannya kapan saja untuk memperkuat daya ingat aktif!
                  </p>
                </div>
                <div className="bg-white/15 px-4 py-3 rounded-2xl border border-white/20 text-center shrink-0">
                  <span className="text-[11px] font-bold text-amber-200 block">Total Koleksi:</span>
                  <span className="text-2xl font-black text-white">{savedWords.length} Kata</span>
                </div>
              </div>

              {savedWords.length === 0 ? (
                <div className="bg-white rounded-3xl p-8 border-2 border-dashed border-rose-200 text-center space-y-3">
                  <div className="text-4xl">📚</div>
                  <h4 className="text-base font-bold text-slate-800">
                    Belum Ada Kata yang Disimpan di Rak
                  </h4>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Kembalilah ke tab <strong>"Scroll Tap-Gloss"</strong>, ketuk kata mana saja pada naskah, lalu klik tombol <em>"Simpan ke Rak Buku"</em>.
                  </p>
                  <button
                    onClick={() => setActiveTab('scroll_reader')}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-xs shadow-xs active:scale-95 transition-all inline-flex items-center gap-1.5"
                  >
                    <span>Mulai Baca Naskah Sekarang</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {savedWords.map((wordStr, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white p-4 rounded-2xl border border-rose-200 shadow-xs flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => sound.speakArabic(wordStr)}
                          className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white flex items-center justify-center transition-colors shadow-2xs shrink-0"
                          title="Dengarkan audio"
                        >
                          <Volume2 className="w-5 h-5" />
                        </button>
                        <div>
                          <span className="font-arabic text-2xl font-bold text-slate-900 block leading-tight">
                            {wordStr}
                          </span>
                          <span className="text-[11px] text-slate-500 font-medium">
                            Koleksi Naskah #{idx + 1}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setSavedWords(prev => prev.filter(w => w !== wordStr));
                          sound.playPop();
                        }}
                        className="text-xs text-slate-400 hover:text-rose-600 font-bold p-1"
                        title="Hapus dari koleksi"
                      >
                        ✕
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Curated Vocabulary Showcase of QRA Island */}
              <div className="mt-8 pt-4 border-t border-rose-200">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-black uppercase text-slate-700 tracking-wider flex items-center gap-2">
                    <BookMarked className="w-4 h-4 text-rose-600" />
                    <span>Kosa Kata Kunci Literasi Perpustakaan (Kurikulum QRA)</span>
                  </h4>
                  <span className="text-[11px] text-rose-700 font-bold">15 Istilah Inti</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
                  {[
                    { ar: 'حَدِيقَة', tr: 'ḥadīqah', id: 'Taman Asri', hint: '🌳' },
                    { ar: 'شَجَرَة', tr: 'syajarah', id: 'Pohon Rindang', hint: '🌲' },
                    { ar: 'القَمَر', tr: 'al-qamar', id: 'Bulan (Qamariyah)', hint: '🌙' },
                    { ar: 'الشَّمْس', tr: 'asy-syams', id: 'Matahari (Syamsiyah)', hint: '☀️' },
                    { ar: 'قِصَّة', tr: 'qiṣṣah', id: 'Kisah / Cerita', hint: '📖' },
                    { ar: 'مَكْتَبَة', tr: 'maktabah', id: 'Perpustakaan', hint: '🏛️' },
                    { ar: 'حِكْمَة', tr: 'ḥikmah', id: 'Kebijaksanaan', hint: '💡' },
                    { ar: 'نَمْلَة', tr: 'namlah', id: 'Semut Fabel', hint: '🐜' },
                    { ar: 'حَمَامَة', tr: 'ḥamāmah', id: 'Burung Merpati', hint: '🕊️' },
                    { ar: 'كُتُب', tr: 'kutub', id: 'Buku-Buku (Jamak)', hint: '📚' }
                  ].map((v, i) => (
                    <div
                      key={i}
                      onClick={() => sound.speakArabic(v.ar)}
                      className="bg-white p-3 rounded-2xl border border-rose-100 shadow-2xs hover:border-rose-300 hover:shadow-xs cursor-pointer transition-all flex flex-col items-center text-center group"
                    >
                      <span className="text-xl mb-1 group-hover:scale-110 transition-transform">{v.hint}</span>
                      <span className="font-arabic text-xl font-bold text-slate-900 group-hover:text-rose-700">
                        {v.ar}
                      </span>
                      <span className="text-[10px] text-slate-400 italic">{v.tr}</span>
                      <span className="text-[11px] font-bold text-slate-700 mt-0.5">{v.id}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: HUDHUD LETTERS ARCHIVE */}
          {activeTab === 'hudhud_letters' && (
            <div className="space-y-5">
              {/* Daily Letter Top Banner */}
              <div className="bg-gradient-to-r from-rose-700 via-pink-700 to-amber-700 text-white p-5 rounded-3xl shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 border border-white/30 backdrop-blur-md flex items-center justify-center text-2xl shadow-sm">
                    🕊️
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-200">
                      Korespondensi Burung Cerdas
                    </span>
                    <h3 className="text-xl font-black">
                      Surat Harian dari Sahabat Hudhud
                    </h3>
                    <p className="text-xs text-rose-100 mt-0.5">
                      Hudhud mengirimkan catatan hikmah dari langit Brightoria. Baca suratnya, dengarkan audio suaranya, dan jawab pertanyaan untuk bonus XP!
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onLaunchGame('hudhud_letter')}
                  className="px-4 py-2 bg-amber-300 hover:bg-amber-400 text-slate-950 rounded-xl font-black text-xs shadow-md active:scale-95 transition-all shrink-0 flex items-center gap-1.5"
                >
                  <Mail className="w-4 h-4" />
                  <span>Mainkan Surat Hari Ini</span>
                </button>
              </div>

              {/* Letter Selection Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {HUDHUD_ARCHIVE_LETTERS.map((letter, idx) => {
                  const isSelected = activeLetterIdx === idx;
                  const isAnswered = letterQuizAnswers[idx] !== undefined;

                  return (
                    <button
                      key={letter.id}
                      onClick={() => {
                        setActiveLetterIdx(idx);
                        sound.playPop();
                      }}
                      className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                        isSelected
                          ? 'bg-rose-50 border-rose-400 shadow-md ring-2 ring-rose-300'
                          : 'bg-white border-slate-200 hover:border-rose-200 shadow-2xs'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="text-[10px] font-black uppercase text-rose-700 px-2 py-0.5 bg-rose-100 rounded-full">
                            Surat #{letter.id}
                          </span>
                          {isAnswered && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          )}
                        </div>
                        <h4 className="text-xs font-bold text-slate-800 line-clamp-1">
                          {letter.date}
                        </h4>
                        <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                          {letter.preview}
                        </p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-rose-600 font-bold">
                        <span>Buka Surat</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active Letter Reading & Quiz View */}
              {(() => {
                const letter = HUDHUD_ARCHIVE_LETTERS[activeLetterIdx];
                const answeredOptIdx = letterQuizAnswers[activeLetterIdx];

                return (
                  <div className="bg-amber-50/70 border-2 border-amber-300 rounded-3xl p-5 sm:p-7 shadow-sm space-y-5">
                    {/* Letter Header */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-amber-200">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-amber-800">
                          {letter.sender}
                        </span>
                        <h3 className="text-lg font-black text-slate-900 mt-0.5">
                          📜 {letter.date}
                        </h3>
                      </div>

                      <button
                        onClick={() => sound.speakArabic(letter.ar)}
                        className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-xl font-black text-xs shadow-xs active:scale-95 transition-all flex items-center gap-2"
                      >
                        <Volume2 className="w-4 h-4" />
                        <span>Dengarkan Surat Hudhud</span>
                      </button>
                    </div>

                    {/* Letter Arabic Content */}
                    <div className="bg-white rounded-2xl p-5 border border-amber-200 shadow-2xs space-y-3">
                      <p
                        className="font-arabic text-2xl sm:text-3xl font-bold text-slate-900 leading-relaxed text-right"
                        dir="rtl"
                      >
                        {letter.ar}
                      </p>
                      <div className="pt-3 border-t border-amber-100 text-xs sm:text-sm text-slate-700 leading-normal">
                        <p className="font-semibold text-slate-800">{letter.translation}</p>
                        <p className="text-[11px] text-slate-400 italic mt-1">{letter.translit}</p>
                      </div>
                    </div>

                    {/* Letter Wisdom Note */}
                    <div className="bg-rose-100/60 border border-rose-200 rounded-2xl p-3.5 flex items-center gap-3">
                      <span className="text-2xl">💡</span>
                      <div>
                        <span className="text-[10px] font-black uppercase text-rose-800 block">
                          Hikmah Sahabat Hudhud:
                        </span>
                        <p className="text-xs font-semibold text-slate-800">
                          "{letter.wisdom}"
                        </p>
                      </div>
                    </div>

                    {/* Comprehension Question */}
                    <div className="space-y-2.5">
                      <h4 className="text-xs font-black uppercase text-slate-800 tracking-wider flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-amber-600" />
                        <span>Kuis Pemahaman Wacana:</span>
                      </h4>
                      <p className="text-sm font-bold text-slate-900">
                        {letter.question}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                        {letter.options.map((opt, optIdx) => {
                          const isPicked = answeredOptIdx === optIdx;
                          const showCorrect = answeredOptIdx !== undefined && opt.correct;
                          const showWrong = isPicked && !opt.correct;

                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleAnswerLetter(activeLetterIdx, optIdx)}
                              disabled={answeredOptIdx !== undefined}
                              className={`p-3.5 rounded-2xl text-xs font-bold transition-all text-left border flex items-center justify-between gap-2 ${
                                showCorrect
                                  ? 'bg-emerald-500 text-white border-emerald-600 shadow-md'
                                  : showWrong
                                  ? 'bg-rose-500 text-white border-rose-600 shadow-md'
                                  : answeredOptIdx !== undefined
                                  ? 'bg-slate-100 text-slate-400 border-slate-200'
                                  : 'bg-white hover:bg-amber-100 text-slate-800 border-amber-200 shadow-2xs active:scale-95'
                              }`}
                            >
                              <span>{opt.text}</span>
                              {showCorrect && <CheckCircle2 className="w-4 h-4 text-white shrink-0" />}
                            </button>
                          );
                        })}
                      </div>

                      {answeredOptIdx !== undefined && (
                        <p className="text-xs font-bold text-center pt-2 text-emerald-800">
                          {letter.options[answeredOptIdx].correct
                            ? '✨ Jawabanmu benar! +35 XP dan +2 Bintang telah ditambahkan!'
                            : 'Cobalah cermati kembali arti kalimat surat Hudhud di atas.'}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* TAB 4: 18 SKILLS CURRICULUM */}
          {activeTab === 'curriculum' && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-rose-700 to-amber-700 text-white p-4 sm:p-5 rounded-2xl shadow-sm flex items-center justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-black">
                    Peta Kurikulum 18 Keterampilan Perpustakaan Qira'ah (QRA)
                  </h3>
                  <p className="text-xs text-rose-100">
                    Mencakup membaca lancar berharakat (L1), jar-majrur & wacana fabel (L2-L3), hingga teks gundul dan syi'ir mahfuzhat (L4-L5).
                  </p>
                </div>
                <div className="px-3.5 py-1.5 rounded-xl bg-white/20 text-xs font-black text-amber-200 shrink-0">
                  18 Kompetensi
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {qraSkills.map(sk => (
                  <div
                    key={sk.skill_id}
                    className="p-3.5 bg-white rounded-2xl border border-rose-100 shadow-2xs hover:shadow-xs transition-all flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center font-black text-xs shrink-0">
                      L{sk.level}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase text-rose-600">
                          {sk.skill_id}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold">
                          {sk.scope}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-800 mt-0.5">
                        {sk.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {sk.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Quick Launch Actions */}
        <div className="p-3.5 bg-white border-t border-rose-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-bold">Mini-Game Qira'ah:</span>
            <button
              onClick={() => onLaunchGame('scroll_tap_gloss')}
              className="px-3 py-1.5 bg-rose-100 hover:bg-rose-200 text-rose-900 rounded-xl font-bold flex items-center gap-1.5 transition-colors"
            >
              <span>📜 Scroll Tap-Gloss</span>
            </button>
            <button
              onClick={() => onLaunchGame('hudhud_letter')}
              className="px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-950 rounded-xl font-bold flex items-center gap-1.5 transition-colors"
            >
              <span>✉️ Surat Hudhud</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl font-bold transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
