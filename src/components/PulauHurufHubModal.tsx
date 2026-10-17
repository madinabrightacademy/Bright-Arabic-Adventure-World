import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Play, Volume2, Award, BookOpen, Layers, CheckCircle2, ChevronRight, Star, Heart } from 'lucide-react';
import { UserProfile, Island } from '../types/game';
import { ISLANDS_DATA, SKILLS_DATA, LEXICON_DATA } from '../data/curriculum';
import { sound } from '../services/sound';
import { GameStorage } from '../services/storage';
import { IslandModalLayout } from './IslandModalLayout';

interface PulauHurufHubProps {
  profile: UserProfile;
  onClose: () => void;
  onLaunchGame: (gameId: string) => void;
  onReward: (xp: number, stars: number) => void;
  onOpenIqra?: () => void;
}

export const PulauHurufHubModal: React.FC<PulauHurufHubProps> = ({ profile, onClose, onLaunchGame, onReward, onOpenIqra }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'lab' | 'alphabet_table'>('overview');
  const [labLetter, setLabLetter] = useState('ب');
  const [labHarakat, setLabHarakat] = useState<'fathah' | 'kasrah' | 'dhammah' | 'sukun' | 'syaddah' | 'tanwin_dham' | 'mad_alif' | 'mad_waw' | 'mad_yaa'>('fathah');
  const [syaikhSpeech, setSyaikhSpeech] = useState<string>(
    'Ahlan wa sahlan di Jazirat al-Huruf! Dengarkan keindahan setiap huruf murni dari makhraj aslinya.'
  );

  const islandData = ISLANDS_DATA.find(i => i.id === 'HRF') || ISLANDS_DATA[0];
  const hrfSkills = SKILLS_DATA.filter(s => s.owner_island === 'HRF');
  const hrfLexemes = LEXICON_DATA.filter(l => l.owner_island === 'HRF');
  const masteredSkills = hrfSkills.filter(s => profile.skillsMastered.includes(s.skill_id));

  const hasCrystal = profile.crystals['HRF'];

  const LETTERS_LIST = [
    { char: 'ا', name: 'Alif', awal: 'ا', tengah: 'ـا', akhir: 'ـا', makhraj: 'Al-Jauf (Rongga Mulut)', sifat: 'Mad / Nafas Mengalir' },
    { char: 'ب', name: 'Bāʾ', awal: 'بـ', tengah: 'ـبـ', akhir: 'ـب', makhraj: 'Asy-Syafatan (Dua Bibir Merapat)', sifat: 'Jahr / Syiddah / Qalqalah' },
    { char: 'ت', name: 'Tāʾ', awal: 'تـ', tengah: 'ـتـ', akhir: 'ـت', makhraj: 'Tharaf al-Lisan (Ujung Lidah ke Gusi Gigi Seri Atas)', sifat: 'Hams / Syiddah / Tipis' },
    { char: 'ث', name: 'Tsāʾ', awal: 'ثـ', tengah: 'ـثـ', akhir: 'ـث', makhraj: 'Tharaf al-Lisan (Ujung Lidah ke Gigi Seri Atas)', sifat: 'Hams / Rakhawah / Lembut' },
    { char: 'ج', name: 'Jīm', awal: 'جـ', tengah: 'ـجـ', akhir: 'ـج', makhraj: 'Wasath al-Lisan (Tengah Lidah ke Langit-langit)', sifat: 'Jahr / Syiddah / Qalqalah' },
    { char: 'ح', name: 'Ḥāʾ', awal: 'حـ', tengah: 'ـحـ', akhir: 'ـح', makhraj: 'Wasath al-Halq (Tengah Tenggorokan)', sifat: 'Hams / Rakhawah / Bersih' },
    { char: 'خ', name: 'Khāʾ', awal: 'خـ', tengah: 'ـخـ', akhir: 'ـخ', makhraj: 'Adna al-Halq (Atas Tenggorokan dekat Uvula)', sifat: 'Hams / Rakhawah / Isti\'la Tebal' },
    { char: 'د', name: 'Dāl', awal: 'د', tengah: 'ـد', akhir: 'ـد', makhraj: 'Tharaf al-Lisan (Pangkal Gigi Seri Atas)', sifat: 'Jahr / Syiddah / Qalqalah / Pemutus Kiri' },
    { char: 'ذ', name: 'Dhāl', awal: 'ذ', tengah: 'ـذ', akhir: 'ـذ', makhraj: 'Tharaf al-Lisan (Ujung Gigi Seri Atas)', sifat: 'Jahr / Rakhawah / Pemutus Kiri' },
    { char: 'ر', name: 'Rāʾ', awal: 'ر', tengah: 'ـر', akhir: 'ـر', makhraj: 'Tharaf al-Lisan (Punggung Ujung Lidah Bergetar)', sifat: 'Jahr / Inhiraf / Takrir / Pemutus Kiri' },
    { char: 'ز', name: 'Zāy', awal: 'ز', tengah: 'ـز', akhir: 'ـز', makhraj: 'Asallat al-Lisan (Ujung Lidah di Belakang Gigi Bawah)', sifat: 'Shafir (Desir) / Pemutus Kiri' },
    { char: 'س', name: 'Sīn', awal: 'سـ', tengah: 'ـسـ', akhir: 'ـس', makhraj: 'Asallat al-Lisan (Ujung Lidah di Belakang Gigi Bawah)', sifat: 'Hams / Shafir / Infitah Tipis' },
    { char: 'ش', name: 'Syīn', awal: 'شـ', tengah: 'ـشـ', akhir: 'ـش', makhraj: 'Wasath al-Lisan (Tengah Lidah Menyebar)', sifat: 'Hams / Tafasy-syi (Udara Berhamburan)' },
    { char: 'ص', name: 'Ṣād', awal: 'صـ', tengah: 'ـصـ', akhir: 'ـص', makhraj: 'Asallat al-Lisan (Ujung Lidah ke Gigi Bawah)', sifat: 'Shafir / Ithbaq / Tebal Bulat' },
    { char: 'ض', name: 'Ḍād', awal: 'ضـ', tengah: 'ـضـ', akhir: 'ـض', makhraj: 'Haffah al-Lisan (Tepi Lidah ke Geraham Atas)', sifat: 'Jahr / Ithbaq / Istithalah (Memanjang)' },
    { char: 'ط', name: 'Ṭāʾ', awal: 'طـ', tengah: 'ـطـ', akhir: 'ـط', makhraj: 'Tharaf al-Lisan (Pangkal Gigi Seri Atas)', sifat: 'Syiddah / Ithbaq Paling Kuat / Qalqalah' },
    { char: 'ظ', name: 'Ẓāʾ', awal: 'ظـ', tengah: 'ـظـ', akhir: 'ـظ', makhraj: 'Tharaf al-Lisan (Ujung Gigi Seri Atas)', sifat: 'Jahr / Rakhawah / Ithbaq Tebal' },
    { char: 'ع', name: 'ʿAyn', awal: 'عـ', tengah: 'ـعـ', akhir: 'ـع', makhraj: 'Wasath al-Halq (Tengah Tenggorokan Lentur)', sifat: 'Jahr / Bainiyyah / Elastis' },
    { char: 'غ', name: 'Ghayn', awal: 'غـ', tengah: 'ـغـ', akhir: 'ـغ', makhraj: 'Adna al-Halq (Atas Tenggorokan Basah)', sifat: 'Jahr / Rakhawah / Isti\'la Tebal' },
    { char: 'ف', name: 'Fāʾ', awal: 'فـ', tengah: 'ـفـ', akhir: 'ـف', makhraj: 'Asy-Syafatan (Gigi Seri Atas ke Perut Bibir Bawah)', sifat: 'Hams / Rakhawah' },
    { char: 'ق', name: 'Qāf', awal: 'قـ', tengah: 'ـقـ', akhir: 'ـق', makhraj: 'Aqsha al-Lisan (Pangkal Lidah ke Langit-langit Lunak)', sifat: 'Syiddah / Qalqalah / Isti\'la' },
    { char: 'ك', name: 'Kāf', awal: 'كـ', tengah: 'ـكـ', akhir: 'ـك', makhraj: 'Aqsha al-Lisan (Pangkal Lidah ke Langit Keras)', sifat: 'Hams / Syiddah / Tipis' },
    { char: 'ل', name: 'Lām', awal: 'لـ', tengah: 'ـلـ', akhir: 'ـل', makhraj: 'Tharaf al-Lisan (Ujung Lidah Sisi Depan)', sifat: 'Jahr / Inhiraf (Menyimpang) / Tawassuth' },
    { char: 'م', name: 'Mīm', awal: 'مـ', tengah: 'ـمـ', akhir: 'ـم', makhraj: 'Asy-Syafatan (Dua Bibir Merapat dengan Ghunnah)', sifat: 'Jahr / Ghunnah / Tawassuth' },
    { char: 'ن', name: 'Nūn', awal: 'نـ', tengah: 'ـنـ', akhir: 'ـن', makhraj: 'Tharaf al-Lisan di Bawah Lam dengan Ghunnah', sifat: 'Jahr / Ghunnah Hidung' },
    { char: 'هـ', name: 'Hāʾ', awal: 'هـ', tengah: 'ـهـ', akhir: 'ـه', makhraj: 'Aqsha al-Halq (Pangkal Tenggorokan / Dada Bawah)', sifat: 'Hams / Khafa (Samar Tersembunyi)' },
    { char: 'و', name: 'Wāw', awal: 'و', tengah: 'ـو', akhir: 'ـو', makhraj: 'Asy-Syafatan (Membulatkan Dua Bibir ke Depan)', sifat: 'Jahr / Lin / Pemutus Kiri' },
    { char: 'ي', name: 'Yāʾ', awal: 'يـ', tengah: 'ـيـ', akhir: 'ـي', makhraj: 'Wasath al-Lisan (Tengah Lidah Naik Tanpa Menempel)', sifat: 'Jahr / Lin' }
  ];

  const getLabForm = () => {
    switch (labHarakat) {
      case 'fathah': return `${labLetter}َ`;
      case 'kasrah': return `${labLetter}ِ`;
      case 'dhammah': return `${labLetter}ُ`;
      case 'sukun': return `أَ${labLetter}ْ`;
      case 'syaddah': return `رَ${labLetter}ّ`;
      case 'tanwin_dham': return `${labLetter}ٌ`;
      case 'mad_alif': return `${labLetter}َا`;
      case 'mad_waw': return `${labLetter}ُو`;
      case 'mad_yaa': return `${labLetter}ِي`;
    }
  };

  const getLabDesc = () => {
    switch (labHarakat) {
      case 'fathah': return 'Vokal pendek terbuka "a" (1 harakat)';
      case 'kasrah': return 'Vokal pendek turun "i" (1 harakat)';
      case 'dhammah': return 'Vokal pendek membulat "u" (1 harakat)';
      case 'sukun': return 'Konsonan mati tanpa vokal (berhenti di makhraj)';
      case 'syaddah': return 'Tasydid: Konsonan rangkap ditekan ganda';
      case 'tanwin_dham': return 'Dhammatain: Bunyi nun mati "-un" di akhir';
      case 'mad_alif': return 'Mad Thabi\'i Alif: Vokal "aa" panjang 2 harakat';
      case 'mad_waw': return 'Mad Thabi\'i Waw: Vokal "uu" panjang 2 harakat';
      case 'mad_yaa': return 'Mad Thabi\'i Ya\': Vokal "ii" panjang 2 harakat';
    }
  };

  const handleSpeakLab = () => {
    sound.speakArabic(getLabForm(), 0.85);
  };

  const handleSyaikhGreeting = () => {
    sound.speakArabic('جَزِيرَةُ الحُرُوفِ تُرَحِّبُ بِكُمْ');
    setSyaikhSpeech('Membaca huruf hijaiyah dengan fasih adalah kunci memahami seluruh Al-Qur\'an dan bahasa Arab.');
  };

  const tabs = [
    { id: 'overview', label: '🎮 4 Mini-Game Pulau', badge: '4' },
    { id: 'lab', label: '🔬 Lab Harakat & Mad' },
    { id: 'alphabet_table', label: '📖 Ensiklopedia 28 Huruf', badge: '28' }
  ];

  const guide = {
    name: 'Syaikh Kamil',
    role: "Pemandu Qira'at",
    avatar: '👳‍♂️',
    greetingAr: 'جَزِيرَةُ الحُرُوفِ تُرَحِّبُ بِكُمْ',
    speechText: syaikhSpeech,
    onClaimXP: () => {
      onReward(60, 1);
      sound.playSparkle();
    }
  };

  return (
    <IslandModalLayout
      island={{
        id: islandData.id,
        name_id: islandData.name_id,
        name_ar: islandData.name_ar,
        domain: islandData.domain,
        biome: 'Bioma Pantai Gurun Pasir',
        crystalName: islandData.crystalName,
        minLevel: islandData.minLevel,
        color: '#0d9488'
      }}
      hasCrystal={Boolean(hasCrystal)}
      isUnlocked={true}
      guide={guide}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={(tabId) => setActiveTab(tabId as any)}
      onClose={onClose}
    >
          {/* TAB 1: OVERVIEW & 4 MINI GAMES */}
          {activeTab === 'overview' && (
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-2xl border border-teal-200 shadow-2xs">
                <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wide">Domain Pulau Huruf:</span>
                <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">
                  {islandData.domain}. Seluruh keterampilan disusun dengan kaidah <strong>Anti Tumpang Tindih (1 Skill = 1 Pulau Pemilik)</strong>.
                </p>
              </div>

              <h4 className="text-xs font-black text-slate-800 uppercase tracking-wide pt-1">
                Mini-Game Terdaftar di Pulau Huruf:
              </h4>

              {/* Iqra Learning Platform Integration */}
              {onOpenIqra && (
                <div className="bg-gradient-to-r from-emerald-800 to-teal-900 p-3.5 rounded-2xl border-2 border-emerald-400 text-white shadow-xs flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 font-black text-2xl flex items-center justify-center shrink-0 shadow-xs">
                      📖
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h5 className="font-bold text-sm text-amber-300">
                          Petualangan Iqra 1–6 & Tartil Hijaiyah
                        </h5>
                        <span className="text-[9px] bg-teal-400 text-teal-950 font-black px-1.5 py-0.2 rounded-full">
                          Platform Utama
                        </span>
                      </div>
                      <p className="text-[11px] text-teal-100 mt-0.5">
                        Modul lengkap Iqra Jilid 1 sampai 6, audio suku kata, ensiklopedia makharijul huruf, dan kuis.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => { onClose(); onOpenIqra(); }}
                    className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-xs shrink-0 flex items-center gap-1 active:scale-95 cursor-pointer"
                  >
                    <span>Buka Iqra ▶</span>
                  </button>
                </div>
              )}

              {/* Game 1: Sand Trace */}
              <div className="bg-white p-3.5 rounded-2xl border-2 border-amber-300 hover:border-amber-400 shadow-xs flex items-center justify-between gap-3 group transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 font-bold text-2xl flex items-center justify-center shrink-0">
                    🏖️
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h5 className="font-bold text-sm text-slate-900 group-hover:text-amber-900">
                        Sand Trace (Jejak Pasir Mutiara)
                      </h5>
                      <span className="text-[9px] bg-amber-100 text-amber-800 font-extrabold px-1.5 py-0.2 rounded-full">
                        28 Huruf 3D
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Tracing goresan huruf Arab di atas pasir pantai dengan harakat & ombak laut.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => { onClose(); onLaunchGame('sand_trace'); }}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs rounded-xl shadow-xs shrink-0 flex items-center gap-1 active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-slate-950" /> Main
                </button>
              </div>

              {/* Game 2: Makhraj Mirror */}
              <div className="bg-white p-3.5 rounded-2xl border-2 border-teal-300 hover:border-teal-400 shadow-xs flex items-center justify-between gap-3 group transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 font-bold text-2xl flex items-center justify-center shrink-0">
                    🪞
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h5 className="font-bold text-sm text-slate-900 group-hover:text-teal-900">
                        Makhraj Mirror (Cermin Fonetik)
                      </h5>
                      <span className="text-[9px] bg-teal-100 text-teal-800 font-extrabold px-1.5 py-0.2 rounded-full">
                        5 Daerah Makhraj
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Visual penampang anatomi rongga mulut/tenggorokan & perbandingan huruf mirip.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => { onClose(); onLaunchGame('makhraj_mirror'); }}
                  className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white font-black text-xs rounded-xl shadow-xs shrink-0 flex items-center gap-1 active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-white" /> Main
                </button>
              </div>

              {/* Game 3: Pearl Garden */}
              <div className="bg-white p-3.5 rounded-2xl border-2 border-cyan-300 hover:border-cyan-400 shadow-xs flex items-center justify-between gap-3 group transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-700 font-bold text-2xl flex items-center justify-center shrink-0">
                    🦪
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h5 className="font-bold text-sm text-slate-900 group-hover:text-cyan-900">
                        Pearl Garden (Taman Kerang)
                      </h5>
                      <span className="text-[9px] bg-cyan-100 text-cyan-800 font-extrabold px-1.5 py-0.2 rounded-full">
                        Memori 4 Tahap
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Mencocokkan pasangan mutiara kerang: huruf dasar, harakat, bentuk sambung & makhraj.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => { onClose(); onLaunchGame('pearl_garden'); }}
                  className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white font-black text-xs rounded-xl shadow-xs shrink-0 flex items-center gap-1 active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-white" /> Main
                </button>
              </div>

              {/* Game 4: Pearl Chain */}
              <div className="bg-white p-3.5 rounded-2xl border-2 border-emerald-300 hover:border-emerald-400 shadow-xs flex items-center justify-between gap-3 group transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 font-bold text-2xl flex items-center justify-center shrink-0">
                    📿
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h5 className="font-bold text-sm text-slate-900 group-hover:text-emerald-900">
                        Pearl Chain (Untaian Sambung)
                      </h5>
                      <span className="text-[9px] bg-emerald-100 text-emerald-800 font-extrabold px-1.5 py-0.2 rounded-full">
                        6 Huruf Pemutus Kiri
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Merangkai bentuk huruf sambung awal-tengah-akhir mematuhi pemutus sambungan (ا د ذ ر ز و).
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => { onClose(); onLaunchGame('pearl_chain'); }}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-xs shrink-0 flex items-center gap-1 active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-white" /> Main
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: INTERACTIVE HARAKAT & MAD LAB */}
          {activeTab === 'lab' && (
            <div className="space-y-4">
              <div className="bg-white p-3 rounded-2xl border border-teal-200">
                <h4 className="text-xs font-black text-teal-900">Laboratorium Harakat, Mad & Sukun</h4>
                <p className="text-[11px] text-slate-600">
                  Padukan huruf hijaiyah pilihanmu dengan tanda vokal, sukun, tasydid, atau mad untuk mendengar bunyinya secara instan!
                </p>
              </div>

              {/* Select Letter Grid */}
              <div>
                <span className="text-xs font-bold text-slate-700 block mb-1">1. Pilih Huruf:</span>
                <div className="grid grid-cols-7 gap-1.5 bg-white p-2.5 rounded-2xl border border-teal-200 max-h-32 overflow-y-auto" dir="rtl">
                  {LETTERS_LIST.map((l) => (
                    <button
                      key={l.char}
                      onClick={() => setLabLetter(l.char)}
                      className={`h-9 rounded-xl font-arabic text-xl font-bold flex items-center justify-center transition-all ${
                        labLetter === l.char
                          ? 'bg-teal-600 text-white shadow-xs scale-105'
                          : 'bg-teal-50 text-slate-800 hover:bg-teal-100'
                      }`}
                    >
                      {l.char}
                    </button>
                  ))}
                </div>
              </div>

              {/* Select Harakat Mode */}
              <div>
                <span className="text-xs font-bold text-slate-700 block mb-1">2. Pilih Harakat / Kaidah:</span>
                <div className="grid grid-cols-3 gap-1.5 text-xs">
                  <button
                    onClick={() => setLabHarakat('fathah')}
                    className={`p-2 rounded-xl border text-center transition-all ${
                      labHarakat === 'fathah' ? 'bg-amber-500 text-slate-950 font-bold border-amber-600 shadow-xs' : 'bg-white text-slate-700'
                    }`}
                  >
                    <span className="font-arabic text-base font-bold block">ـَ</span>
                    <span>Fathah (a)</span>
                  </button>
                  <button
                    onClick={() => setLabHarakat('kasrah')}
                    className={`p-2 rounded-xl border text-center transition-all ${
                      labHarakat === 'kasrah' ? 'bg-amber-500 text-slate-950 font-bold border-amber-600 shadow-xs' : 'bg-white text-slate-700'
                    }`}
                  >
                    <span className="font-arabic text-base font-bold block">ـِ</span>
                    <span>Kasrah (i)</span>
                  </button>
                  <button
                    onClick={() => setLabHarakat('dhammah')}
                    className={`p-2 rounded-xl border text-center transition-all ${
                      labHarakat === 'dhammah' ? 'bg-amber-500 text-slate-950 font-bold border-amber-600 shadow-xs' : 'bg-white text-slate-700'
                    }`}
                  >
                    <span className="font-arabic text-base font-bold block">ـُ</span>
                    <span>Dhammah (u)</span>
                  </button>
                  <button
                    onClick={() => setLabHarakat('sukun')}
                    className={`p-2 rounded-xl border text-center transition-all ${
                      labHarakat === 'sukun' ? 'bg-amber-500 text-slate-950 font-bold border-amber-600 shadow-xs' : 'bg-white text-slate-700'
                    }`}
                  >
                    <span className="font-arabic text-base font-bold block">ـْ</span>
                    <span>Sukun (Mati)</span>
                  </button>
                  <button
                    onClick={() => setLabHarakat('syaddah')}
                    className={`p-2 rounded-xl border text-center transition-all ${
                      labHarakat === 'syaddah' ? 'bg-amber-500 text-slate-950 font-bold border-amber-600 shadow-xs' : 'bg-white text-slate-700'
                    }`}
                  >
                    <span className="font-arabic text-base font-bold block">ـّ</span>
                    <span>Syaddah (Rangkap)</span>
                  </button>
                  <button
                    onClick={() => setLabHarakat('tanwin_dham')}
                    className={`p-2 rounded-xl border text-center transition-all ${
                      labHarakat === 'tanwin_dham' ? 'bg-amber-500 text-slate-950 font-bold border-amber-600 shadow-xs' : 'bg-white text-slate-700'
                    }`}
                  >
                    <span className="font-arabic text-base font-bold block">ـٌ</span>
                    <span>Tanwin (-un)</span>
                  </button>
                  <button
                    onClick={() => setLabHarakat('mad_alif')}
                    className={`p-2 rounded-xl border text-center transition-all ${
                      labHarakat === 'mad_alif' ? 'bg-teal-600 text-white font-bold border-teal-700 shadow-xs' : 'bg-white text-slate-700'
                    }`}
                  >
                    <span className="font-arabic text-base font-bold block">ـَا</span>
                    <span>Mad Alif (aa)</span>
                  </button>
                  <button
                    onClick={() => setLabHarakat('mad_waw')}
                    className={`p-2 rounded-xl border text-center transition-all ${
                      labHarakat === 'mad_waw' ? 'bg-teal-600 text-white font-bold border-teal-700 shadow-xs' : 'bg-white text-slate-700'
                    }`}
                  >
                    <span className="font-arabic text-base font-bold block">ـُو</span>
                    <span>Mad Waw (uu)</span>
                  </button>
                  <button
                    onClick={() => setLabHarakat('mad_yaa')}
                    className={`p-2 rounded-xl border text-center transition-all ${
                      labHarakat === 'mad_yaa' ? 'bg-teal-600 text-white font-bold border-teal-700 shadow-xs' : 'bg-white text-slate-700'
                    }`}
                  >
                    <span className="font-arabic text-base font-bold block">ـِي</span>
                    <span>Mad Ya' (ii)</span>
                  </button>
                </div>
              </div>

              {/* Lab Synthesizer Display Result */}
              <div className="bg-gradient-to-r from-slate-900 to-teal-950 rounded-3xl p-5 text-white flex items-center justify-between border-2 border-teal-400 shadow-lg">
                <div>
                  <span className="text-[10px] text-teal-300 font-bold uppercase tracking-wider block">
                    Hasil Pengucapan Lab:
                  </span>
                  <span className="font-arabic text-5xl font-bold text-amber-300 block my-1">
                    {getLabForm()}
                  </span>
                  <p className="text-xs text-slate-300">{getLabDesc()}</p>
                </div>
                <button
                  onClick={handleSpeakLab}
                  className="px-5 py-3.5 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black rounded-2xl flex items-center gap-2 shadow-xl active:scale-95 transition-all"
                >
                  <Volume2 className="w-5 h-5 fill-slate-950" />
                  <span>Bunyikan</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: ENSIKLOPEDIA 28 HURUF LENGKAP */}
          {activeTab === 'alphabet_table' && (
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-2xl border border-teal-200 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-black text-slate-900">Ensiklopedia 28 Huruf Hijaiyah</h4>
                  <p className="text-[11px] text-slate-500">Klik ikon audio pada huruf untuk mendengarkan lafal murni.</p>
                </div>
                <span className="text-[10px] bg-teal-100 text-teal-800 font-black px-2 py-0.5 rounded-full">
                  28 Huruf Terdaftar
                </span>
              </div>

              <div className="space-y-2">
                {LETTERS_LIST.map((item, idx) => (
                  <div
                    key={item.char}
                    className="bg-white p-3 rounded-2xl border border-teal-200/80 shadow-2xs hover:border-teal-400 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <button
                          onClick={() => sound.speakArabic(item.name)}
                          className="w-10 h-10 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold flex items-center justify-center active:scale-95 transition-all shadow-xs"
                          title="Dengarkan huruf"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-arabic text-2xl font-bold text-slate-900 leading-none">
                              {item.char}
                            </span>
                            <span className="font-black text-xs text-teal-900">
                              {idx + 1}. {item.name}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-500 block mt-0.5">
                            Makhraj: {item.makhraj}
                          </span>
                        </div>
                      </div>

                      {/* 4 Shapes Badges */}
                      <div className="flex items-center gap-1 bg-teal-50/70 p-1.5 rounded-xl border border-teal-100 text-center" dir="rtl">
                        <div className="px-1.5 py-0.5 rounded bg-white border border-teal-200">
                          <span className="text-[9px] text-slate-400 block">Lepas</span>
                          <span className="font-arabic text-sm font-bold text-slate-900">{item.char}</span>
                        </div>
                        <div className="px-1.5 py-0.5 rounded bg-white border border-teal-200">
                          <span className="text-[9px] text-slate-400 block">Awal</span>
                          <span className="font-arabic text-sm font-bold text-slate-900">{item.awal}</span>
                        </div>
                        <div className="px-1.5 py-0.5 rounded bg-white border border-teal-200">
                          <span className="text-[9px] text-slate-400 block">Tengah</span>
                          <span className="font-arabic text-sm font-bold text-slate-900">{item.tengah}</span>
                        </div>
                        <div className="px-1.5 py-0.5 rounded bg-white border border-teal-200">
                          <span className="text-[9px] text-slate-400 block">Akhir</span>
                          <span className="font-arabic text-sm font-bold text-slate-900">{item.akhir}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                      <span>Sifat Utama: <strong className="text-slate-700">{item.sifat}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
    </IslandModalLayout>
  );
};
