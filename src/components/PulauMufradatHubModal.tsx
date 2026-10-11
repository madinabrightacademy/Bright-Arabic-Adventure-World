import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Play, Volume2, Award, BookOpen, Layers, CheckCircle2, ChevronRight, Star, Heart, ShoppingBag, Compass } from 'lucide-react';
import { UserProfile, Island } from '../types/game';
import { sound } from '../services/sound';
import { GameStorage } from '../services/storage';

interface PulauMufradatHubModalProps {
  island: Island;
  profile: UserProfile;
  onClose: () => void;
  onLaunchGame: (gameId: string) => void;
  onReward: (xp: number, stars: number) => void;
}

interface VocabularyCard {
  id: string;
  name_ar: string;
  translit: string;
  meaning: string;
  category: string;
  emoji: string;
  exampleSentence: string;
  exampleMeaning: string;
}

const THEMATIC_VOCAB_COLLECTION: Record<string, VocabularyCard[]> = {
  'Makanan & Minuman': [
    { id: 'v1', name_ar: 'خُبْز', translit: 'khubz', meaning: 'Roti gandum hangat', category: 'Makanan', emoji: '🍞', exampleSentence: 'آكُلُ الخُبْزَ فِي الصَّبَاحِ', exampleMeaning: 'Saya makan roti di pagi hari' },
    { id: 'v2', name_ar: 'مَاء', translit: 'māʾ', meaning: 'Air tawar segar', category: 'Makanan', emoji: '💧', exampleSentence: 'أَشْرَبُ مَاءً بَارِدًا', exampleMeaning: 'Saya minum air dingin yang segar' },
    { id: 'v3', name_ar: 'حَلِيب', translit: 'ḥalīb', meaning: 'Susu murni sehat', category: 'Makanan', emoji: '🥛', exampleSentence: 'الحَلِيبُ مُفِيدٌ لِلْجِسْمِ', exampleMeaning: 'Susu sangat bermanfaat bagi tubuh' },
    { id: 'v4', name_ar: 'تَمْر', translit: 'tamr', meaning: 'Kurma manis berkah', category: 'Makanan', emoji: '🌴', exampleSentence: 'التَّمْرُ حُلْوٌ وَلَذِيذٌ', exampleMeaning: 'Kurma itu manis dan lezat' },
    { id: 'v5', name_ar: 'تُفَّاحَة', translit: 'tuffāḥah', meaning: 'Buah apel ranum', category: 'Makanan', emoji: '🍎', exampleSentence: 'هٰذِهِ تُفَّاحَةٌ حَمْرَاءُ', exampleMeaning: 'Ini adalah buah apel merah' },
    { id: 'v6', name_ar: 'شَاي', translit: 'shāy', meaning: 'Teh harum hangat', category: 'Makanan', emoji: '🫖', exampleSentence: 'أَشْرَبُ الشَّايَ مَعَ أَبِي', exampleMeaning: 'Saya minum teh bersama ayahku' },
  ],
  'Hewan & Alam': [
    { id: 'v7', name_ar: 'قِطَّة', translit: 'qiṭṭah', meaning: 'Kucing rumahan', category: 'Hewan', emoji: '🐱', exampleSentence: 'القِطَّةُ جَمِيلَةٌ وَصَغِيرَةٌ', exampleMeaning: 'Kucing itu cantik dan mungil' },
    { id: 'v8', name_ar: 'سَمَكَة', translit: 'samakah', meaning: 'Ikan air jernih', category: 'Hewan', emoji: '🐟', exampleSentence: 'السَّمَكَةُ تَسْبَحُ فِي المَاءِ', exampleMeaning: 'Ikan itu berenang di dalam air' },
    { id: 'v9', name_ar: 'جَمَل', translit: 'jamal', meaning: 'Unta padang pasir', category: 'Hewan', emoji: '🐪', exampleSentence: 'الجَمَلُ سَفِينَةُ الصَّحْرَاءِ', exampleMeaning: 'Unta adalah perahu padang pasir' },
    { id: 'v10', name_ar: 'حِصَان', translit: 'ḥiṣān', meaning: 'Kuda tangkas gagah', category: 'Hewan', emoji: '🐴', exampleSentence: 'الحِصَانُ سَرِيعٌ جِدًّا', exampleMeaning: 'Kuda itu berlari sangat cepat' },
    { id: 'v11', name_ar: 'طَائِر', translit: 'ṭāʾir', meaning: 'Burung berkicau', category: 'Hewan', emoji: '🐦', exampleSentence: 'الطَّائِرُ يَطِيرُ فِي السَّمَاءِ', exampleMeaning: 'Burung terbang di angkasa' },
  ],
  'Sekolah & Alat': [
    { id: 'v12', name_ar: 'كِتَاب', translit: 'kitāb', meaning: 'Kitab buku panduan', category: 'Sekolah', emoji: '📖', exampleSentence: 'أَقْرَأُ كِتَابَ اللُّغَةِ العَرَبِيَّةِ', exampleMeaning: 'Saya membaca kitab bahasa Arab' },
    { id: 'v13', name_ar: 'قَلَم', translit: 'qalam', meaning: 'Pena gores tinta', category: 'Sekolah', emoji: '🖊️', exampleSentence: 'أَكْتُبُ بِالقَلَمِ فِي الدَّفْتَرِ', exampleMeaning: 'Saya menulis dengan pena di buku catatan' },
    { id: 'v14', name_ar: 'مَدْرَسَة', translit: 'madrasah', meaning: 'Sekolah tempat belajar', category: 'Sekolah', emoji: '🏫', exampleSentence: 'أَذْهَبُ إِلَى المَدْرَسَةِ صَبَاحًا', exampleMeaning: 'Saya pergi ke sekolah di pagi hari' },
    { id: 'v15', name_ar: 'حَاسُوب', translit: 'ḥāsūb', meaning: 'Komputer canggih', category: 'Sekolah', emoji: '💻', exampleSentence: 'الحَاسُوبُ جِهَازٌ حَدِيثٌ', exampleMeaning: 'Komputer adalah perangkat modern' },
  ],
  'Angka Arab (١–١٠)': [
    { id: 'v16', name_ar: 'وَاحِد (١)', translit: 'wāḥid', meaning: 'Satu', category: 'Angka', emoji: '1️⃣', exampleSentence: 'قَلَمٌ وَاحِدٌ', exampleMeaning: 'Satu buah pena' },
    { id: 'v17', name_ar: 'اِثْنَان (٢)', translit: 'ithnān', meaning: 'Dua', category: 'Angka', emoji: '2️⃣', exampleSentence: 'كِتَابَانِ اثْنَانِ', exampleMeaning: 'Dua buah kitab' },
    { id: 'v18', name_ar: 'ثَلَاثَة (٣)', translit: 'thalāthah', meaning: 'Tiga', category: 'Angka', emoji: '3️⃣', exampleSentence: 'ثَلَاثَةُ كُتُبٍ', exampleMeaning: 'Tiga buah buku' },
    { id: 'v19', name_ar: 'أَرْبَعَة (٤)', translit: 'arbaʿah', meaning: 'Empat', category: 'Angka', emoji: '4️⃣', exampleSentence: 'أَرْبَعَةُ أَيَّامٍ', exampleMeaning: 'Empat hari' },
    { id: 'v20', name_ar: 'خَمْسَة (٥)', translit: 'khamsah', meaning: 'Lima', category: 'Angka', emoji: '5️⃣', exampleSentence: 'خَمْسُ صَلَوَاتٍ', exampleMeaning: 'Lima waktu shalat' },
    { id: 'v21', name_ar: 'عَشَرَة (١٠)', translit: 'ʿasharah', meaning: 'Sepuluh', category: 'Angka', emoji: '🔟', exampleSentence: 'عَشَرَةُ طُلَّابٍ', exampleMeaning: 'Sepuluh siswa' },
  ]
};

export const PulauMufradatHubModal: React.FC<PulauMufradatHubModalProps> = ({
  island,
  profile,
  onClose,
  onLaunchGame,
  onReward
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'docks' | 'thesaurus'>('overview');
  const [selectedCategory, setSelectedCategory] = useState<string>('Makanan & Minuman');
  const [selectedWord, setSelectedWord] = useState<VocabularyCard>(THEMATIC_VOCAB_COLLECTION['Makanan & Minuman'][0]);
  const [claimedDialogueXP, setClaimedDialogueXP] = useState(false);

  const categories = Object.keys(THEMATIC_VOCAB_COLLECTION);
  const currentWords = THEMATIC_VOCAB_COLLECTION[selectedCategory] || [];

  const handleClaimGuideReward = () => {
    if (claimedDialogueXP) return;
    sound.playSuccess();
    sound.speakArabic('مَرْحَبًا بِكُمْ فِي سُوقِ المُفْرَدَات!');
    setClaimedDialogueXP(true);
    GameStorage.addReward(50, 1, 'lughah', 5);
    onReward(50, 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        className="w-full max-w-4xl bg-gradient-to-b from-amber-50 via-white to-orange-50 rounded-3xl shadow-2xl border-4 border-amber-300 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white p-5 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-3xl shadow-inner">
              🛶
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-extrabold uppercase bg-black/20 px-2.5 py-0.5 rounded-full text-amber-100">
                  Pulau ke-2 • Bioma Pasar Terapung Perahu
                </span>
                <span className="text-xs bg-amber-200 text-amber-950 font-extrabold px-2 py-0.5 rounded-full">
                  Kristal: Emas-Jingga 💎
                </span>
              </div>
              <h2 className="text-2xl font-bold font-chibi flex items-center gap-2 mt-0.5">
                {island.name_ar} — {island.name_id}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white font-bold transition-transform active:scale-95"
          >
            ✕
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-amber-100/90 border-b border-amber-200 px-6 py-2.5 flex items-center gap-3">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-amber-900 hover:bg-white/80'
            }`}
          >
            <Compass className="w-4 h-4" /> Eksplorasi Pasar & Tokoh
          </button>
          <button
            onClick={() => setActiveTab('thesaurus')}
            className={`px-4 py-2 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
              activeTab === 'thesaurus'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-amber-900 hover:bg-white/80'
            }`}
          >
            <BookOpen className="w-4 h-4" /> Etalase Mufradat Tematik (Kamus Audio)
          </button>
          <button
            onClick={() => setActiveTab('docks')}
            className={`px-4 py-2 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
              activeTab === 'docks'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-amber-900 hover:bg-white/80'
            }`}
          >
            <Play className="w-4 h-4" /> Wahana Mini-Games MFR (3 Game)
          </button>
        </div>

        {/* Tab 1: Overview & Pemandu Pulau */}
        {activeTab === 'overview' && (
          <div className="p-6 overflow-y-auto flex-1 space-y-5">
            {/* Guide Card (Bibi Maryam al-Bahr) */}
            <div className="bg-gradient-to-r from-amber-100 via-orange-100 to-yellow-100 rounded-3xl p-5 border-2 border-amber-300 shadow-sm flex flex-col md:flex-row items-center gap-5">
              <div className="relative">
                <div className="w-24 h-24 rounded-3xl bg-amber-400 text-white flex items-center justify-center text-5xl shadow-md border-4 border-white">
                  🧕
                </div>
                <span className="absolute -bottom-2 -right-1 text-2xl" title="Bibi Maryam">
                  ⛵
                </span>
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                  <h3 className="font-bold text-lg text-slate-800">
                    Bibi Maryam (مَرْيَم البَحَّارَة)
                  </h3>
                  <span className="text-xs bg-amber-300 text-amber-950 font-bold px-2 py-0.5 rounded-full">
                    Pemandu Pulau Mufradat
                  </span>
                </div>
                <p className="text-xs text-amber-950 italic mb-2">
                  "أَهْلًا وَسَهْلًا بِكُمْ فِي سُوقِ المُفْرَدَات! Selamat datang di pasar apung kami! Di sini setiap perahu memuat kata-kata berharga untuk bekal lisanmu. Dengarkan cara orang pasar memesan, pilih bendanya, dan kumpulkan Dinar pengetahuan!"
                </p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                  <button
                    onClick={() => sound.speakArabic('أَهْلًا وَسَهْلًا بِكُمْ فِي سُوقِ المُفْرَدَاتِ العَجِيبَة!')}
                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs"
                  >
                    <Volume2 className="w-4 h-4" /> Dengarkan Sapaan Bibi Maryam
                  </button>
                  {!claimedDialogueXP ? (
                    <button
                      onClick={handleClaimGuideReward}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs"
                    >
                      <Sparkles className="w-4 h-4" /> Terima Sambutan (+50 XP)
                    </button>
                  ) : (
                    <span className="text-xs text-emerald-700 font-bold flex items-center gap-1 bg-emerald-100 px-3 py-1.5 rounded-xl">
                      <CheckCircle2 className="w-4 h-4" /> Sambutan Diterima!
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Island Statistics & Lore */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-3xl border border-amber-200 shadow-xs">
                <span className="text-xs text-slate-500 block mb-1">Cakupan Kurikulum</span>
                <div className="text-xl font-extrabold text-amber-900">37 Skill Mufradat</div>
                <p className="text-[11px] text-slate-600 mt-1">
                  Mencakup Angka 1-10, Warna, Keluarga, Sekolah, Makanan, Hewan, Kendaraan, hingga Jamak Taksir.
                </p>
              </div>
              <div className="bg-white p-4 rounded-3xl border border-amber-200 shadow-xs">
                <span className="text-xs text-slate-500 block mb-1">Misi Utama Pulau</span>
                <div className="text-xl font-extrabold text-orange-600">Pelayan Pasar Cerdas</div>
                <p className="text-[11px] text-slate-600 mt-1">
                  Mendengar permintaan pelanggan Arab, mengambil barang dari perahu, mengeja kata di keranjang.
                </p>
              </div>
              <div className="bg-white p-4 rounded-3xl border border-amber-200 shadow-xs">
                <span className="text-xs text-slate-500 block mb-1">Kristal Pulau</span>
                <div className="text-xl font-extrabold text-amber-500">Kristal Emas-Jingga 💎</div>
                <p className="text-[11px] text-slate-600 mt-1">
                  Diperoleh saat menguasai seluruh perahu tema kosakata dan lulus ujian pasar.
                </p>
              </div>
            </div>

            {/* Direct Game Quick Jump */}
            <div className="bg-white rounded-3xl p-5 border border-amber-200 shadow-sm">
              <h4 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2">
                <Play className="w-4 h-4 text-amber-600" /> Pilih Wahana untuk Dimainkan Sekarang:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => onLaunchGame('floating_market')}
                  className="p-3 rounded-2xl bg-amber-50 hover:bg-amber-100 border-2 border-amber-300 text-left transition-all group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-2xl mb-1 block">⛵</span>
                    <strong className="text-slate-800 text-xs block group-hover:text-amber-800">
                      Floating Market Quest
                    </strong>
                    <span className="text-[10px] text-slate-600 block mt-0.5">
                      Layani pesanan audio pelanggan dari perahu terapung.
                    </span>
                  </div>
                  <span className="text-[10px] text-amber-700 font-bold mt-2 flex items-center gap-1">
                    Buka Game <ChevronRight className="w-3 h-3" />
                  </span>
                </button>

                <button
                  onClick={() => onLaunchGame('basket_spell')}
                  className="p-3 rounded-2xl bg-orange-50 hover:bg-orange-100 border-2 border-orange-300 text-left transition-all group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-2xl mb-1 block">🧺</span>
                    <strong className="text-slate-800 text-xs block group-hover:text-orange-800">
                      Basket Spell (Keranjang)
                    </strong>
                    <span className="text-[10px] text-slate-600 block mt-0.5">
                      Susun huruf sambung menjadi kata benda bergambar.
                    </span>
                  </div>
                  <span className="text-[10px] text-orange-700 font-bold mt-2 flex items-center gap-1">
                    Buka Game <ChevronRight className="w-3 h-3" />
                  </span>
                </button>

                <button
                  onClick={() => onLaunchGame('sky_runner')}
                  className="p-3 rounded-2xl bg-sky-50 hover:bg-sky-100 border-2 border-sky-300 text-left transition-all group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-2xl mb-1 block">🚀</span>
                    <strong className="text-slate-800 text-xs block group-hover:text-sky-800">
                      Sky Runner Arabi
                    </strong>
                    <span className="text-[10px] text-slate-600 block mt-0.5">
                      Meluncur di 3 jalur udara menuju gerbang arti kata yang tepat.
                    </span>
                  </div>
                  <span className="text-[10px] text-sky-700 font-bold mt-2 flex items-center gap-1">
                    Buka Game <ChevronRight className="w-3 h-3" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Thesaurus & Kamus Tematik Interaktif */}
        {activeTab === 'thesaurus' && (
          <div className="p-6 overflow-y-auto flex-1 flex flex-col md:flex-row gap-5">
            {/* Left: Category Picker & Words List */}
            <div className="w-full md:w-1/2 space-y-3">
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setSelectedWord(THEMATIC_VOCAB_COLLECTION[cat][0]);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      selectedCategory === cat
                        ? 'bg-amber-600 text-white shadow-sm'
                        : 'bg-white border border-amber-200 text-slate-700 hover:bg-amber-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Word List Buttons */}
              <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
                {currentWords.map((card) => {
                  const isSelected = selectedWord.id === card.id;
                  return (
                    <button
                      key={card.id}
                      onClick={() => {
                        setSelectedWord(card);
                        sound.speakArabic(card.name_ar);
                      }}
                      className={`w-full p-3 rounded-2xl text-left border flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-amber-100/90 border-amber-400 ring-2 ring-amber-300'
                          : 'bg-white border-slate-200 hover:bg-amber-50/60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{card.emoji}</span>
                        <div>
                          <span className="font-arabic font-bold text-xl text-slate-900 block leading-tight">
                            {card.name_ar}
                          </span>
                          <span className="text-xs font-semibold text-amber-800 block">
                            {card.translit} • {card.meaning}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs text-amber-600 font-bold">
                        🔊
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Word Detail Spotlight */}
            <div className="w-full md:w-1/2 bg-white rounded-3xl p-6 border-2 border-amber-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs bg-amber-100 text-amber-900 font-bold px-3 py-1 rounded-full">
                    Kategori: {selectedWord.category}
                  </span>
                  <button
                    onClick={() => sound.speakArabic(selectedWord.name_ar)}
                    className="p-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white shadow-xs"
                    title="Lafalkan kata"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="text-center py-4">
                  <div className="text-6xl mb-2">{selectedWord.emoji}</div>
                  <h3 className="font-arabic font-extrabold text-5xl text-amber-950 mb-1 leading-normal">
                    {selectedWord.name_ar}
                  </h3>
                  <p className="text-sm font-bold text-amber-800">
                    {selectedWord.translit}
                  </p>
                  <p className="text-base font-semibold text-slate-700 mt-1">
                    "{selectedWord.meaning}"
                  </p>
                </div>

                {/* Example sentence box */}
                <div className="bg-amber-50/90 rounded-2xl p-4 border border-amber-200 mt-4 text-center">
                  <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-800 block mb-1">
                    Contoh Kalimat Sempurna (جُمْلَة مُفِيدَة):
                  </span>
                  <p className="font-arabic font-bold text-xl text-slate-900 mb-1">
                    "{selectedWord.exampleSentence}"
                  </p>
                  <p className="text-xs text-slate-600 italic">
                    "{selectedWord.exampleMeaning}"
                  </p>
                  <button
                    onClick={() => sound.speakArabic(selectedWord.exampleSentence)}
                    className="mt-2 text-xs text-amber-700 hover:text-amber-900 font-bold flex items-center justify-center gap-1 mx-auto"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Dengarkan Contoh Kalimat
                  </button>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Kosakata Terstandarisasi Brightoria Lisan</span>
                <span className="text-emerald-700 font-bold">100% Berharakat Penuh</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Docks Games Catalog */}
        {activeTab === 'docks' && (
          <div className="p-6 overflow-y-auto flex-1 space-y-4">
            <div className="text-center max-w-lg mx-auto mb-2">
              <h3 className="font-bold text-lg text-slate-800">Wahana Pembelajaran Pasar Apung</h3>
              <p className="text-xs text-slate-600">
                Setiap wahana melatih kemampuan mufradat yang berbeda: mendengarkan pesanan, menyusun huruf ejaan, dan kecepatan reaksi memilih arti kata.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Game 1 */}
              <div className="bg-white rounded-3xl p-5 border-2 border-amber-300 shadow-md flex flex-col justify-between hover:shadow-lg transition-all">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-3xl mb-3">
                    ⛵
                  </div>
                  <h4 className="font-bold text-base text-slate-800 mb-1">
                    Floating Market Quest
                  </h4>
                  <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full inline-block mb-2">
                    Evidence: Reading & Responding
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Nakhoda, kucing pelaut, dan musafir datang memesan dengan kalimat Arab. Temukan barang di perahu dan dapatkan koin dinar.
                  </p>
                </div>
                <button
                  onClick={() => onLaunchGame('floating_market')}
                  className="mt-4 w-full py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl text-xs shadow-xs hover:from-amber-600 hover:to-orange-600 flex items-center justify-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5" /> Mainkan Sekarang
                </button>
              </div>

              {/* Game 2 */}
              <div className="bg-white rounded-3xl p-5 border-2 border-orange-300 shadow-md flex flex-col justify-between hover:shadow-lg transition-all">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center text-3xl mb-3">
                    🧺
                  </div>
                  <h4 className="font-bold text-base text-slate-800 mb-1">
                    Basket Spell (Keranjang)
                  </h4>
                  <span className="text-[10px] bg-orange-100 text-orange-900 font-bold px-2 py-0.5 rounded-full inline-block mb-2">
                    Evidence: Writing & Spelling
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Ambil huruf dari keranjang dan susun dari kanan ke kiri sesuai sambungan huruf Arab yang tepat.
                  </p>
                </div>
                <button
                  onClick={() => onLaunchGame('basket_spell')}
                  className="mt-4 w-full py-2.5 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold rounded-xl text-xs shadow-xs hover:from-orange-600 hover:to-amber-700 flex items-center justify-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5" /> Mainkan Sekarang
                </button>
              </div>

              {/* Game 3 */}
              <div className="bg-white rounded-3xl p-5 border-2 border-sky-300 shadow-md flex flex-col justify-between hover:shadow-lg transition-all">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center text-3xl mb-3">
                    🚀
                  </div>
                  <h4 className="font-bold text-base text-slate-800 mb-1">
                    Sky Runner Arabi
                  </h4>
                  <span className="text-[10px] bg-sky-100 text-sky-900 font-bold px-2 py-0.5 rounded-full inline-block mb-2">
                    Evidence: Speed Quiz & Vocab
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Pacu perahu langit di 3 jalur gerbang kata. Hindari kata yang salah sebelum menabrak portal mufradat.
                  </p>
                </div>
                <button
                  onClick={() => onLaunchGame('sky_runner')}
                  className="mt-4 w-full py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold rounded-xl text-xs shadow-xs hover:from-sky-600 hover:to-indigo-700 flex items-center justify-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5" /> Mainkan Sekarang
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="bg-amber-50 px-6 py-3 border-t border-amber-200 flex items-center justify-between text-xs text-amber-900">
          <div className="flex items-center gap-2">
            <span>🏝️ Pulau Mufradat (MFR)</span>
            <span>•</span>
            <span className="font-bold">{profile.name} (Level {profile.level})</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl transition-colors"
          >
            Tutup Hub
          </button>
        </div>
      </motion.div>
    </div>
  );
};
