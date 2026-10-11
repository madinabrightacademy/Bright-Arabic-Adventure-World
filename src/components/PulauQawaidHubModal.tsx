import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Play, Volume2, Award, BookOpen, Layers, CheckCircle2, ChevronRight, Star, Heart, Compass, Mountain, Sliders, Shield } from 'lucide-react';
import { UserProfile, Island } from '../types/game';
import { sound } from '../services/sound';
import { SKILLS_DATA, LEXICON_DATA, TASHRIF_ROOTS } from '../data/curriculum';

interface PulauQawaidHubModalProps {
  island: Island;
  profile: UserProfile;
  onClose: () => void;
  onLaunchGame: (gameId: string) => void;
}

interface GrammarConceptCard {
  id: string;
  level: number;
  title: string;
  titleAr: string;
  category: 'nahwu' | 'sharaf' | 'isyarah' | 'nawasikh';
  conceptExplanation: string;
  ruleFormula: string;
  examples: {
    ar: string;
    translit: string;
    id: string;
    breakdown: string;
  }[];
}

const GRAMMAR_SHOWCASE: GrammarConceptCard[] = [
  {
    id: 'g1',
    level: 1,
    title: 'Isim Isyarah & Kesesuaian Gender',
    titleAr: 'أَسْمَاءُ الإِشَارَةِ وَالتَّذْكِير وَالتَّأْنِيث',
    category: 'isyarah',
    conceptExplanation: 'Menunjuk benda dekat menggunakan هٰذَا (hādhā) untuk mudzakkar (maskulin) dan هٰذِهِ (hādhihi) untuk muannats (feminin berakhiran ta marbuthah ـة).',
    ruleFormula: 'هٰذَا + [Isim Mudzakkar]  |  هٰذِهِ + [Isim Muannats / ـة]',
    examples: [
      { ar: 'هٰذَا كِتَابٌ كَبِيرٌ', translit: 'Hādhā kitābun kabīr', id: 'Ini sebuah buku yang besar.', breakdown: 'Semua kata selaras dalam bentuk maskulin (mudzakkar).' },
      { ar: 'هٰذِهِ سَمَكَةٌ كَبِيرَةٌ', translit: 'Hādhihi samakatun kabīrah', id: 'Ini seekor ikan yang besar.', breakdown: 'Semua kata selaras feminin (muannats) dengan akhiran ta marbuthah.' },
      { ar: 'ذٰلِكَ مَسْجِدٌ جَمِيلٌ', translit: 'Dhālika masjidun jamīl', id: 'Itu sebuah masjid yang indah.', breakdown: 'Kata tunjuk jauh maskulin (dhālika).' }
    ]
  },
  {
    id: 'g2',
    level: 2,
    title: 'Jumlah Ismiyyah (Mubtada\' & Khabar)',
    titleAr: 'الجُمْلَةُ الاسْمِيَّة: مُبْتَدَأ + خَبَر',
    category: 'nahwu',
    conceptExplanation: 'Kalimat berita nominal yang diawali kata benda (Mubtada\') dan dilengkapi keterangan predikat (Khabar). Kedua unsurnya berstatus Marfu\' (umumnya berharakat dhommah).',
    ruleFormula: '[Mubtada\' Marfu\'] + [Khabar Marfu\']',
    examples: [
      { ar: 'الوَلَدُ نَشِيطٌ', translit: 'Al-waladu nasyīṭun', id: 'Anak laki-laki itu rajin.', breakdown: 'الوَلَدُ = Mubtada\' ma\'rifah (dhommah), نَشِيطٌ = Khabar nakirah (tanwin dhommah).' },
      { ar: 'البِنْتُ ذَكِيَّةٌ', translit: 'Al-bintu dhakiyyah', id: 'Anak perempuan itu cerdas.', breakdown: 'Khabar muannats mengikuti gender mubtada\'.' },
      { ar: 'العِلْمُ نُورٌ', translit: 'Al-ʿilmu nūrun', id: 'Ilmu itu adalah cahaya.', breakdown: 'Contoh pepatah masyhur struktur ismiyyah dasar.' }
    ]
  },
  {
    id: 'g3',
    level: 2,
    title: 'Huruf Jar & Isim Majrur',
    titleAr: 'حُرُوفُ الجَرّ وَالإِعْرَاب',
    category: 'nahwu',
    conceptExplanation: 'Preposisi seperti فِي (di dalam), عَلَى (di atas), مِنْ (dari), dan إِلَى (ke) menyebabkan kata benda sesudahnya menjadi Majrur (berharakat kasrah).',
    ruleFormula: '[Harf Jar] + [Isim Majrur bi-Kasrah]',
    examples: [
      { ar: 'الكِتَابُ عَلَى المَكْتَبِ', translit: 'Al-kitābu ʿalā l-maktabi', id: 'Buku itu ada di atas meja.', breakdown: 'عَلَى menjadikan المَكْتَبِ berkasrah di akhir kata.' },
      { ar: 'المُسَافِرُ فِي المَسْجِدِ', translit: 'Al-musāfiru fī l-masjidi', id: 'Musafir itu ada di dalam masjid.', breakdown: 'فِي adalah harf jar penunjuk ruang / tempat.' },
      { ar: 'رَجَعَ أَبِي مِنَ السُّوقِ', translit: 'Rajaʿa abī mina s-sūqi', id: 'Ayahku pulang dari pasar.', breakdown: 'مِنْ menyebabkan السُّوقِ berharakat kasrah.' }
    ]
  },
  {
    id: 'g4',
    level: 2,
    title: 'Idhafah (Frasa Kepemilikan & Penyandaran)',
    titleAr: 'المُضَافُ وَالمُضَافُ إِلَيْه',
    category: 'nahwu',
    conceptExplanation: 'Penyandaran dua kata benda: Mudhaf (benda yang dimiliki) TIDAK boleh bertanwin dan tanpa Alif Lam. Mudhaf Ilaih (pemilik) berstatus Majrur (kasrah).',
    ruleFormula: '[Mudhaf (tanpa tanwin/Al-)] + [Mudhaf Ilaih Majrur]',
    examples: [
      { ar: 'كِتَابُ الطَّالِبِ جَدِيدٌ', translit: 'Kitābu ṭ-ṭālibi jadīd', id: 'Buku murid itu baru.', breakdown: 'كِتَابُ = Mudhaf (dhommah satu), الطَّالِبِ = Mudhaf ilaih (kasrah).' },
      { ar: 'بَابُ المَسْجِدِ مَفْتُوحٌ', translit: 'Bābu l-masjidi maftūḥ', id: 'Pintu masjid itu terbuka.', breakdown: 'Penyandaran kepemilikan bangunan.' }
    ]
  },
  {
    id: 'g5',
    level: 3,
    title: 'Jumlah Fi\'liyyah & Objek Maf\'ul Bih',
    titleAr: 'الجُمْلَةُ الفِعْلِيَّة: فِعْل + فَاعِل + مَفْعُول بِه',
    category: 'nahwu',
    conceptExplanation: 'Kalimat yang diawali kata kerja (Fi\'il). Pelakunya disebut Fa\'il (Marfu\' dhommah), sedangkan sasaran perbuatannya adalah Maf\'ul Bih (Manshub fathah).',
    ruleFormula: '[Fi\'il] + [Fa\'il Marfu\'] + [Maf\'ul Bih Manshub]',
    examples: [
      { ar: 'قَرَأَ زَيْدٌ الكِتَابَ', translit: 'Qaraʾa zayduni l-kitāba', id: 'Zaid telah membaca buku itu.', breakdown: 'قَرَأَ (Fi\'il), زَيْدٌ (Fa\'il dhommah), الكِتَابَ (Maf\'ul bih fathah).' },
      { ar: 'شَرِبَ الوَلَدُ المَاءَ', translit: 'Syariba l-waladu l-māʾa', id: 'Anak itu telah meminum air.', breakdown: 'Bentuk kalimat verbal berobjek akusatif.' }
    ]
  },
  {
    id: 'g6',
    level: 4,
    title: 'Kaidah Nawasikh (Inna wa Kaana)',
    titleAr: 'كَانَ وَإِنَّ وَأَخَوَاتُهُمَا',
    category: 'nawasikh',
    conceptExplanation: 'Kaidah perombak kalimat nominal. كَانَ merafa\'kan isim dan menashabkan khabar. Sebaliknya, إِنَّ menashabkan isim dan merafa\'kan khabar.',
    ruleFormula: 'إِنَّ + [Isim Manshub (fathah)] + [Khabar Marfu\' (dhommah)]',
    examples: [
      { ar: 'إِنَّ اللَّهَ غَفُورٌ رَحِيمٌ', translit: 'Inna Llāha ghafūrun raḥīm', id: 'Sesungguhnya Allah Maha Pengampun lagi Maha Penyayang.', breakdown: 'Lafzhul Jalalah اللَّهَ manshub fathah karena huruf inna.' },
      { ar: 'كَانَ الجَوُّ بَارِدًا', translit: 'Kāna l-jawwu bāridan', id: 'Cuaca dahulu dingin.', breakdown: 'كَانَ menjadikan الجَوُّ marfu\' dan bāridan manshub.' }
    ]
  }
];

export const PulauQawaidHubModal: React.FC<PulauQawaidHubModalProps> = ({
  island,
  profile,
  onClose,
  onLaunchGame
}) => {
  const [activeTab, setActiveTab] = useState<'pilar' | 'tashrif' | 'skills' | 'kamus'>('pilar');
  const [selectedConcept, setSelectedConcept] = useState<GrammarConceptCard>(GRAMMAR_SHOWCASE[0]);
  const [selectedRootIdx, setSelectedRootIdx] = useState(0);
  const [selectedTense, setSelectedTense] = useState<'madhi' | 'mudhari'>('madhi');

  const qwdSkills = SKILLS_DATA.filter(s => s.owner_island === 'QWD');
  const qwdLexemes = LEXICON_DATA.filter(l => l.owner_island === 'QWD');
  const activeRoot = TASHRIF_ROOTS[selectedRootIdx];

  const handleSpeak = (text: string) => {
    sound.speakArabic(text);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.94 }}
        className="w-full max-w-4xl bg-slate-900 border-2 border-blue-500/50 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[94vh] text-white"
      >
        {/* Header Hero Banner */}
        <div className="relative bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-950 p-5 sm:p-6 border-b border-blue-500/30">
          <div className="flex items-start justify-between relative z-10">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center shadow-lg border-2 border-blue-300/40 text-2xl">
                ⛰️
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-blue-500/30 text-blue-300 border border-blue-400/30">
                    Pulau ke-4 • جَبَلُ القَوَاعِد
                  </span>
                  <span className="text-xs bg-amber-400/90 text-slate-950 font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Jenjang 1–5
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-chibi mt-1 text-white flex items-center gap-2">
                  Gunung Qawa'id <span className="text-blue-300 font-arabic text-xl font-normal">(جَبَلُ القَوَاعِد)</span>
                </h2>
                <p className="text-xs sm:text-sm text-blue-200/90 mt-0.5 max-w-xl">
                  Pusat arsitektur tata bahasa Arab (Nahwu & Sharaf): struktur kalimat sempurna, gender kata, wazan konjugasi fi'il, dan kaidah i'rab.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors font-bold text-lg"
            >
              ✕
            </button>
          </div>

          {/* Quick Stats Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-5">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-2.5 flex items-center gap-2.5">
              <Mountain className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Materi Nahwu-Sharaf</p>
                <p className="text-sm font-extrabold text-blue-300">{qwdSkills.length} Modul Terstruktur</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-2.5 flex items-center gap-2.5">
              <Sliders className="w-5 h-5 text-indigo-400" />
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Akar Morfologi</p>
                <p className="text-sm font-extrabold text-indigo-300">{TASHRIF_ROOTS.length} Akar 3 Huruf</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-2.5 flex items-center gap-2.5">
              <Shield className="w-5 h-5 text-sky-400" />
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Kosakata Kaidah</p>
                <p className="text-sm font-extrabold text-sky-300">{qwdLexemes.length} Kata & Harf</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-2.5 flex items-center gap-2.5">
              <Award className="w-5 h-5 text-amber-400" />
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Pusat Latihan</p>
                <p className="text-sm font-extrabold text-amber-300">2 Game Interaktif</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 bg-slate-950/60 px-4 sm:px-6 gap-2">
          <button
            onClick={() => setActiveTab('pilar')}
            className={`py-3 px-4 font-bold text-xs sm:text-sm flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'pilar'
                ? 'border-blue-400 text-blue-300 bg-blue-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" /> 6 Pilar Kaidah Nahwu
          </button>
          <button
            onClick={() => setActiveTab('tashrif')}
            className={`py-3 px-4 font-bold text-xs sm:text-sm flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'tashrif'
                ? 'border-indigo-400 text-indigo-300 bg-indigo-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sliders className="w-4 h-4" /> Laboratorium Tashrif
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`py-3 px-4 font-bold text-xs sm:text-sm flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'skills'
                ? 'border-sky-400 text-sky-300 bg-sky-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" /> Silabus Level 1–5 ({qwdSkills.length})
          </button>
          <button
            onClick={() => setActiveTab('kamus')}
            className={`py-3 px-4 font-bold text-xs sm:text-sm flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'kamus'
                ? 'border-amber-400 text-amber-300 bg-amber-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" /> Glosarium Kaidah ({qwdLexemes.length})
          </button>
        </div>

        {/* Modal Main Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {/* TAB 1: 6 PILAR KAIDAH NAHWU */}
          {activeTab === 'pilar' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              {/* Concept Picker Sidebar */}
              <div className="md:col-span-4 space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Daftar Kaidah Utama:
                </h4>
                {GRAMMAR_SHOWCASE.map((concept) => (
                  <button
                    key={concept.id}
                    onClick={() => {
                      setSelectedConcept(concept);
                      sound.playTap();
                    }}
                    className={`w-full text-left p-3 rounded-2xl border transition-all ${
                      selectedConcept.id === concept.id
                        ? 'bg-blue-600/30 border-blue-400 text-white shadow-md'
                        : 'bg-slate-800/60 border-white/5 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-white/10 text-blue-300">
                        Level {concept.level}
                      </span>
                      <span className="text-xs font-arabic text-slate-400">{concept.titleAr.split(' ')[0]}</span>
                    </div>
                    <h5 className="font-bold text-sm text-white mt-1.5 leading-snug">{concept.title}</h5>
                  </button>
                ))}

                {/* Quick Launch Game Cards */}
                <div className="pt-3 border-t border-white/10 space-y-2">
                  <div className="bg-gradient-to-r from-blue-900/60 to-indigo-900/60 border border-blue-400/30 p-3 rounded-2xl">
                    <p className="text-[11px] font-bold text-blue-300">Latihan Susun Kalimat:</p>
                    <button
                      onClick={() => onLaunchGame('sentence_bridge')}
                      className="w-full mt-2 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" /> Mainkan Sentence Bridge
                    </button>
                  </div>
                </div>
              </div>

              {/* Concept Deep Dive View */}
              <div className="md:col-span-8 bg-slate-800/80 border border-blue-500/20 rounded-3xl p-5 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-arabic text-blue-300 block">{selectedConcept.titleAr}</span>
                    <h3 className="text-xl font-extrabold text-white mt-0.5">{selectedConcept.title}</h3>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
                    Kategori: {selectedConcept.category.toUpperCase()}
                  </span>
                </div>

                {/* Formula Badge */}
                <div className="bg-blue-950/80 border-2 border-blue-400/40 rounded-2xl p-3.5">
                  <span className="text-[10px] font-bold uppercase text-blue-300 tracking-wider block mb-1">
                    Rumus & Kaidah Susunan:
                  </span>
                  <div className="font-arabic text-lg sm:text-xl font-bold text-amber-300" dir="rtl">
                    {selectedConcept.ruleFormula}
                  </div>
                </div>

                {/* Concept Explanation */}
                <div className="bg-white/5 rounded-2xl p-4 border border-white/5 text-sm text-slate-200 leading-relaxed">
                  <p className="font-semibold text-blue-300 mb-1">Penjelasan Kaidah:</p>
                  <p>{selectedConcept.conceptExplanation}</p>
                </div>

                {/* Concrete Examples */}
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                    Contoh Kalimat Sempurna (Jumla Mufidah):
                  </h4>
                  <div className="space-y-2.5">
                    {selectedConcept.examples.map((ex, i) => (
                      <div
                        key={i}
                        className="bg-slate-900/90 border border-white/10 rounded-2xl p-3.5 flex items-start justify-between gap-3"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-arabic text-xl font-bold text-amber-300">{ex.ar}</span>
                            <button
                              onClick={() => handleSpeak(ex.ar)}
                              className="w-7 h-7 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 flex items-center justify-center transition-colors"
                              title="Dengar Lafal"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="text-xs text-blue-200 font-medium">"{ex.translit}"</p>
                          <p className="text-xs text-slate-300 font-semibold">Artinya: {ex.id}</p>
                          <p className="text-[11px] text-slate-400 italic mt-0.5">💡 {ex.breakdown}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LABORATORIUM TASHRIF */}
          {activeTab === 'tashrif' && (
            <div className="space-y-5">
              <div className="bg-gradient-to-r from-indigo-900/50 to-blue-900/50 border border-indigo-400/30 rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider">
                    Eksperimen Morfologi Sharaf:
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">
                    Mesin Konjugasi Fi'il Madhi & Mudhari'
                  </h3>
                  <p className="text-xs text-indigo-200 max-w-lg mt-0.5">
                    Pahami perubahan bentuk kata kerja Arab berdasarkan waktu dan subjek pelaku (Dhamir) dengan 7 akar kata 3 huruf terstandar.
                  </p>
                </div>
                <button
                  onClick={() => onLaunchGame('tashrif_lab')}
                  className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg active:scale-95 transition-all flex items-center gap-2 whitespace-nowrap"
                >
                  <Play className="w-4 h-4 fill-current" /> Buka Mesin Interaktif
                </button>
              </div>

              {/* Root Word Selector */}
              <div className="bg-slate-800/80 rounded-2xl p-4 border border-white/5 space-y-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Pilih Akar Kata (Al-Ashl 3 Huruf):
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                  {TASHRIF_ROOTS.map((root, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedRootIdx(idx);
                        sound.playTap();
                      }}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        selectedRootIdx === idx
                          ? 'bg-indigo-600 border-indigo-400 text-white shadow-md'
                          : 'bg-slate-900/60 border-white/5 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      <span className="font-arabic text-lg font-bold block">{root.root}</span>
                      <span className="text-[10px] text-slate-400 truncate block mt-0.5">
                        {root.baseMeaning.split(' ')[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tense Toggle */}
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedTense('madhi')}
                  className={`flex-1 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all border ${
                    selectedTense === 'madhi'
                      ? 'bg-blue-600 border-blue-400 text-white shadow-md'
                      : 'bg-slate-800/80 border-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  ⏳ Fi'il Madhi (Masa Lampau)
                </button>
                <button
                  onClick={() => setSelectedTense('mudhari')}
                  className={`flex-1 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all border ${
                    selectedTense === 'mudhari'
                      ? 'bg-indigo-600 border-indigo-400 text-white shadow-md'
                      : 'bg-slate-800/80 border-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  🔄 Fi'il Mudhari' (Masa Kini / Rutin)
                </button>
              </div>

              {/* Conjugation Grid for Selected Root */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {activeRoot.conjugations.map((conj, i) => {
                  const arabicWord = selectedTense === 'madhi' ? conj.madhi : conj.mudhari;
                  return (
                    <div
                      key={i}
                      className="bg-slate-800/90 border border-white/10 rounded-2xl p-4 flex flex-col justify-between hover:border-indigo-400/40 transition-all shadow-xs"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-indigo-300">{conj.pronoun}</span>
                        <button
                          onClick={() => handleSpeak(arabicWord)}
                          className="w-7 h-7 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 flex items-center justify-center transition-colors"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="font-arabic text-3xl font-bold text-amber-300 my-1 text-center" dir="rtl">
                        {arabicWord}
                      </div>
                      <p className="text-xs text-slate-300 text-center font-medium mt-1">"{conj.meaning}"</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: SILABUS SKILLS L1–L5 */}
          {activeTab === 'skills' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs text-slate-400">
                  Seluruh {qwdSkills.length} keterampilan tata bahasa disusun secara gradual menurut Kerangka Standar Arabi:
                </p>
                <span className="text-xs font-bold text-blue-300 bg-blue-500/20 px-2.5 py-0.5 rounded-full">
                  Semua Terdaftar
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {qwdSkills.map((sk) => (
                  <div
                    key={sk.skill_id}
                    className="bg-slate-800/70 border border-white/5 rounded-2xl p-3.5 hover:border-blue-500/30 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 border border-blue-400/20">
                        {sk.skill_id}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">Level {sk.level}</span>
                    </div>
                    <h4 className="font-bold text-sm text-white mt-1.5">{sk.name}</h4>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{sk.description}</p>
                    <div className="mt-2 text-[11px] text-blue-300 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" /> {sk.scope}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: GLOSARIUM KAIDAH */}
          {activeTab === 'kamus' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs text-slate-400">
                  {qwdLexemes.length} kosakata kata tunjuk, kata sifat, huruf jar, dhomir, dan fi'il pembangun kalimat:
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                {qwdLexemes.map((lex) => (
                  <div
                    key={lex.id}
                    className="bg-slate-800/80 border border-white/5 rounded-2xl p-3 flex flex-col justify-between hover:border-blue-500/40 transition-all"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-base">{lex.visual_hint || '📖'}</span>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-white/10 text-slate-300">
                        {lex.category}
                      </span>
                    </div>
                    <div className="my-2 text-center">
                      <span className="font-arabic text-2xl font-bold text-amber-300 block leading-tight">
                        {lex.ar_vocalized}
                      </span>
                      <span className="text-[11px] text-blue-200 font-semibold block">{lex.translit}</span>
                      <span className="text-xs text-slate-300 font-medium block mt-0.5">{lex.gloss_id}</span>
                    </div>
                    <button
                      onClick={() => handleSpeak(lex.ar_vocalized)}
                      className="w-full py-1 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 text-blue-200 text-xs font-bold flex items-center justify-center gap-1 transition-colors"
                    >
                      <Volume2 className="w-3 h-3" /> Lafalkan
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-950/80 border-t border-white/10 flex items-center justify-between">
          <div className="text-xs text-slate-400 hidden sm:block">
            Semua tantangan Qawa'id terintegrasi dengan pemberian poin XP & Bintang Safir.
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => onLaunchGame('sentence_bridge')}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-current" /> Main Sentence Bridge
            </button>
            <button
              onClick={() => onLaunchGame('tashrif_lab')}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-current" /> Main Tashrif Lab
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
