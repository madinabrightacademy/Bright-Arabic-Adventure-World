import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Play, Volume2, Award, BookOpen, Layers, CheckCircle2, ChevronRight, Star, Heart, MessageSquare, Compass, Mic } from 'lucide-react';
import { UserProfile, Island } from '../types/game';
import { sound } from '../services/sound';
import { GameStorage } from '../services/storage';
import { DIALOGUES_DATA } from '../data/curriculum';

interface PulauHiwarHubModalProps {
  island: Island;
  profile: UserProfile;
  onClose: () => void;
  onLaunchGame: (gameId: string) => void;
  onReward: (xp: number, stars: number) => void;
}

interface FunctionalPhrase {
  id: string;
  category: string;
  ar: string;
  translit: string;
  id_translation: string;
  context: string;
  replyAr: string;
  replyTranslit: string;
  replyId: string;
}

const PHRASE_BOOK: FunctionalPhrase[] = [
  {
    id: 'h1',
    category: 'Salam & Sapaan',
    ar: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ',
    translit: 'As-salāmu ʿalaykum wa-raḥmatu Llāhi wa-barakātuh',
    id_translation: 'Semoga keselamatan, rahmat Allah, dan berkah-Nya tercurah atas kalian',
    context: 'Ucapan salam pembuka islami penuh doa keselamatan',
    replyAr: 'وَعَلَيْكُمُ السَّلَامُ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ',
    replyTranslit: 'Wa-ʿalaykumu s-salāmu wa-raḥmatu Llāhi wa-barakātuh',
    replyId: 'Dan atas kalian keselamatan, rahmat Allah, dan berkah-Nya'
  },
  {
    id: 'h2',
    category: 'Salam & Sapaan',
    ar: 'صَبَاحَ الخَيْرِ',
    translit: 'Ṣabāḥa l-khayr',
    id_translation: 'Selamat pagi!',
    context: 'Sapaan hangat di pagi hari saat menyapa tetangga atau teman',
    replyAr: 'صَبَاحَ النُّورِ وَالسُّرُورِ',
    replyTranslit: 'Ṣabāḥa n-nūri wa-s-surūr',
    replyId: 'Selamat pagi yang bercahaya dan penuh sukacita!'
  },
  {
    id: 'h3',
    category: 'Perkenalan & Asal',
    ar: 'مَا اسْمُكَ؟ — اِسْمِي طَالِبٌ مُجْتَهِدٌ',
    translit: 'Mā ismuka? — Ismī ṭālibun mujtahid',
    id_translation: 'Siapa namamu? — Namaku penuntut ilmu yang tekun',
    context: 'Perkenalan nama pertama kali bertemu',
    replyAr: 'أَهْلًا وَسَهْلًا! تَشَرَّفْنَا بِمَعْرِفَتِكَ!',
    replyTranslit: 'Ahlan wa sahlan! Tasyarrafnā bi-maʿrifatik!',
    replyId: 'Selamat datang! Suatu kehormatan berkenalan denganmu!'
  },
  {
    id: 'h4',
    category: 'Perkenalan & Asal',
    ar: 'مِنْ أَيْنَ أَنْتَ؟ — أَنَا مِنْ إِنْدُونِيسِيَا',
    translit: 'Min ayna anta? — Anā min Indūnīsiyā',
    id_translation: 'Dari mana asalmu? — Saya dari Indonesia',
    context: 'Menjelaskan asal negara atau kota domisili',
    replyAr: 'مَرْحَبًا بِأَهْلِ إِنْدُونِيسِيَا الكِرَامِ!',
    replyTranslit: 'Marḥaban bi-ahli Indūnīsiyā l-kirām!',
    replyId: 'Selamat datang wahai saudaraku dari Indonesia yang mulia!'
  },
  {
    id: 'h5',
    category: 'Kesantunan & Syukur',
    ar: 'جَزَاكَ اللَّهُ خَيْرًا وَبَارَكَ فِيكَ',
    translit: 'Jazāka Llāhu khayran wa-bāraka fīka',
    id_translation: 'Semoga Allah membalasmu dengan limpahan kebaikan dan memberkahimu',
    context: 'Ucapan terima kasih tertinggi dalam adab Islam',
    replyAr: 'وَإِيَّاكَ، وَفِيكَ بَارَكَ اللَّهُ!',
    replyTranslit: 'Wa-iyyāk, wa-fīka bāraka Llāh!',
    replyId: 'Dan kepadamu juga, semoga Allah memberkahimu!'
  },
  {
    id: 'h6',
    category: 'Kesantunan & Syukur',
    ar: 'عَفْوًا، مِنْ فَضْلِكَ / لَوْ سَمَحْتَ',
    translit: 'ʿAfwan, min faḍlika / law samaḥta',
    id_translation: 'Permisi / tolong / jika Anda berkenan',
    context: 'Frasa santun sebelum meminta bantuan orang lain',
    replyAr: 'تَفَضَّلْ، بِكُلِّ سُرُورٍ!',
    replyTranslit: 'Tafaḍḍal, bi-kulli surūr!',
    replyId: 'Silakan, dengan senang hati!'
  },
  {
    id: 'h7',
    category: 'Arah & Belanja',
    ar: 'أَيْنَ المَسْجِدُ؟ — اِتَّجِهْ إِلَى اليَمِينِ ثُمَّ أَمَامًا',
    translit: 'Ayna l-masjid? — Ittajih ilā l-yamīn thumma amāmā',
    id_translation: 'Di mana masjid? — Beloklah ke kanan lalu lurus ke depan',
    context: 'Petunjuk arah navigasi jalan kota',
    replyAr: 'شُكْرًا لَكَ، فِي أَمَانِ اللَّهِ!',
    replyTranslit: 'Syukran laka, fī amāni Llāh!',
    replyId: 'Terima kasih banyak, semoga dalam perlindungan Allah!'
  },
  {
    id: 'h8',
    category: 'Arah & Belanja',
    ar: 'بِكَمْ هٰذَا؟ — هٰذَا بِعَشَرَةِ دَنَانِيرَ',
    translit: 'Bikam hādhā? — Hādhā bi-ʿasyarati danānīr',
    id_translation: 'Berapa harga barang ini? — Ini seharga sepuluh dinar',
    context: 'Transaksi jual beli di pasar tradisional Kampung Hiwar',
    replyAr: 'تَفَضَّلِ النُّقُودَ، بَارَكَ اللَّهُ فِي تِجَارَتِكَ!',
    replyTranslit: 'Tafaḍḍali n-nuqūda, bāraka Llāhu fī tijāratik!',
    replyId: 'Silakan uangnya, semoga Allah memberkahi perniagaanmu!'
  }
];

export const PulauHiwarHubModal: React.FC<PulauHiwarHubModalProps> = ({
  island,
  profile,
  onClose,
  onLaunchGame,
  onReward
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'scenarios' | 'phrasebook'>('overview');
  const [selectedCategory, setSelectedCategory] = useState<string>('Salam & Sapaan');
  const [selectedPhrase, setSelectedPhrase] = useState<FunctionalPhrase>(PHRASE_BOOK[0]);
  const [claimedGuideXP, setClaimedGuideXP] = useState(false);

  const categories = ['Salam & Sapaan', 'Perkenalan & Asal', 'Kesantunan & Syukur', 'Arah & Belanja'];
  const filteredPhrases = PHRASE_BOOK.filter(p => p.category === selectedCategory);

  const handleClaimGuideReward = () => {
    if (claimedGuideXP) return;
    sound.playSuccess();
    sound.speakArabic('أَهْلًا وَسَهْلًا بِكُمْ فِي قَرْيَةِ الحِوَارِ المُبَارَكَةِ!');
    setClaimedGuideXP(true);
    GameStorage.addReward(50, 1, 'lisan', 5);
    onReward(50, 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        className="w-full max-w-4xl bg-gradient-to-b from-emerald-50 via-white to-teal-50 rounded-3xl shadow-2xl border-4 border-emerald-400 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Top Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700 text-white p-5 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-3xl shadow-inner">
              🏘️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-extrabold uppercase bg-black/20 px-2.5 py-0.5 rounded-full text-emerald-100">
                  Pulau ke-3 • Bioma Kampung Kafe & Warga Ramah
                </span>
                <span className="text-xs bg-emerald-300 text-emerald-950 font-extrabold px-2 py-0.5 rounded-full">
                  Kristal: Hijau Zamrud 💎
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
        <div className="bg-emerald-100/90 border-b border-emerald-200 px-6 py-2.5 flex items-center gap-3">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'text-emerald-900 hover:bg-white/80'
            }`}
          >
            <Compass className="w-4 h-4" /> Eksplorasi Kampung & Tokoh
          </button>
          <button
            onClick={() => setActiveTab('scenarios')}
            className={`px-4 py-2 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
              activeTab === 'scenarios'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'text-emerald-900 hover:bg-white/80'
            }`}
          >
            <MessageSquare className="w-4 h-4" /> 5 Skenario Dialog Quest
          </button>
          <button
            onClick={() => setActiveTab('phrasebook')}
            className={`px-4 py-2 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 ${
              activeTab === 'phrasebook'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'text-emerald-900 hover:bg-white/80'
            }`}
          >
            <BookOpen className="w-4 h-4" /> Buku Frasa Adab & Percakapan
          </button>
        </div>

        {/* Tab 1: Overview & Pemandu Kampung */}
        {activeTab === 'overview' && (
          <div className="p-6 overflow-y-auto flex-1 space-y-5">
            {/* Guide Card (Ustaz Salman al-Qurasyi) */}
            <div className="bg-gradient-to-r from-emerald-100 via-teal-100 to-green-100 rounded-3xl p-5 border-2 border-emerald-300 shadow-sm flex flex-col md:flex-row items-center gap-5">
              <div className="relative">
                <div className="w-24 h-24 rounded-3xl bg-emerald-600 text-white flex items-center justify-center text-5xl shadow-md border-4 border-white">
                  👳‍♂️
                </div>
                <span className="absolute -bottom-2 -right-1 text-2xl" title="Ustaz Salman">
                  ☕
                </span>
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                  <h3 className="font-bold text-lg text-slate-800">
                    Ustaz Salman (الأُسْتَاذ سَلْمَان)
                  </h3>
                  <span className="text-xs bg-emerald-300 text-emerald-950 font-bold px-2 py-0.5 rounded-full">
                    Pemandu Kampung Hiwar
                  </span>
                </div>
                <p className="text-xs text-emerald-950 italic mb-2">
                  "أَهْلًا وَسَهْلًا بِكُمْ فِي قَرْيَةِ الحِوَار! Di kampung kami, bahasa Arab hidup dalam senyuman warga, obrolan kedai kopi kurma, dan sapaan hangat di jalanan. Jangan takut salah bicara! Mari melatih lidahmu menjawab salam, menanyakan arah, dan memesan teh dengan santun!"
                </p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                  <button
                    onClick={() => sound.speakArabic('أَهْلًا وَسَهْلًا بِكُمْ فِي قَرْيَةِ الحِوَارِ، تَفَضَّلُوا بِالدُّخُولِ!')}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs"
                  >
                    <Volume2 className="w-4 h-4" /> Dengarkan Sapaan Ustaz Salman
                  </button>
                  {!claimedGuideXP ? (
                    <button
                      onClick={handleClaimGuideReward}
                      className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs"
                    >
                      <Sparkles className="w-4 h-4" /> Terima Nasihat (+50 XP)
                    </button>
                  ) : (
                    <span className="text-xs text-emerald-800 font-bold flex items-center gap-1 bg-emerald-200 px-3 py-1.5 rounded-xl">
                      <CheckCircle2 className="w-4 h-4" /> Nasihat Diterima!
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Lore and Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-3xl border border-emerald-200 shadow-xs">
                <span className="text-xs text-slate-500 block mb-1">Cakupan Kurikulum</span>
                <div className="text-xl font-extrabold text-emerald-900">29 Skill Hiwar</div>
                <p className="text-[11px] text-slate-600 mt-1">
                  Mencakup Salam, Perkenalan Diri, Tanya Kabar, Belanja di Pasar, Restoran, Navigasi Arah, hingga Retorika Fashih.
                </p>
              </div>
              <div className="bg-white p-4 rounded-3xl border border-emerald-200 shadow-xs">
                <span className="text-xs text-slate-500 block mb-1">Fokus Bukti (Evidence)</span>
                <div className="text-xl font-extrabold text-teal-700">Producing (P) - Lisan</div>
                <p className="text-[11px] text-slate-600 mt-1">
                  Melatih keberanian berbicara lisan aktif, artikulasi fonetik tepat, dan pemilihan frasa kesantunan islami.
                </p>
              </div>
              <div className="bg-white p-4 rounded-3xl border border-emerald-200 shadow-xs">
                <span className="text-xs text-slate-500 block mb-1">Kristal Pulau</span>
                <div className="text-xl font-extrabold text-emerald-600">Kristal Hijau Zamrud 💎</div>
                <p className="text-[11px] text-slate-600 mt-1">
                  Didapatkan saat menuntaskan seluruh 5 skenario dialog bercabang dengan nilai adab sempurna.
                </p>
              </div>
            </div>

            {/* Quick Play Banner */}
            <div className="bg-white rounded-3xl p-5 border border-emerald-200 shadow-sm flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                  <Play className="w-4 h-4 text-emerald-600" /> Masuk ke Wahana Dialog Quest Sekarang
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Berbincang langsung dengan Paman Bakr, Ali murid baru, Paman Tariq, Pelayan Hasan, dan Dokter Faruq.
                </p>
              </div>
              <button
                onClick={() => onLaunchGame('dialog_quest')}
                className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-2xl text-xs shadow-md hover:from-emerald-700 hover:to-teal-700 flex items-center gap-1.5 shrink-0"
              >
                <span>Mulai Percakapan</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: 5 Skenario Dialog Quest */}
        {activeTab === 'scenarios' && (
          <div className="p-6 overflow-y-auto flex-1 space-y-4">
            <div className="text-center max-w-lg mx-auto mb-1">
              <h3 className="font-bold text-lg text-slate-800">5 Skenario Dunia Nyata di Kampung Hiwar</h3>
              <p className="text-xs text-slate-600">
                Pilih skenario interaktif di bawah ini untuk memulai simulasi percakapan dunia nyata:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Scenario 1 */}
              <div className="bg-white p-4 rounded-3xl border-2 border-emerald-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🥖</span>
                    <div>
                      <h4 className="font-bold text-sm text-slate-800">Di Toko Roti Paman Bakr</h4>
                      <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                        Etika Menyapa & Memesan Makanan
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600">
                    Menjawab salam ramah, mengabarkan kondisi kesehatan, lalu memesan roti gandum hangat dan air tawar.
                  </p>
                </div>
                <button
                  onClick={() => onLaunchGame('dialog_quest')}
                  className="mt-3 w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1"
                >
                  <Play className="w-3.5 h-3.5" /> Buka Skenario Ini
                </button>
              </div>

              {/* Scenario 2 */}
              <div className="bg-white p-4 rounded-3xl border-2 border-emerald-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🤝</span>
                    <div>
                      <h4 className="font-bold text-sm text-slate-800">Kenalan dengan Ali (Murid Baru)</h4>
                      <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                        Perkenalan Diri & Asal Negara
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600">
                    Menyapa di pagi hari (*Ṣabāḥa l-khayr*), menyebutkan nama diri, dan bangga menyebutkan asal negara Indonesia.
                  </p>
                </div>
                <button
                  onClick={() => onLaunchGame('dialog_quest')}
                  className="mt-3 w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1"
                >
                  <Play className="w-3.5 h-3.5" /> Buka Skenario Ini
                </button>
              </div>

              {/* Scenario 3 */}
              <div className="bg-white p-4 rounded-3xl border-2 border-emerald-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🕌</span>
                    <div>
                      <h4 className="font-bold text-sm text-slate-800">Tanya Arah Masjid dengan Paman Tariq</h4>
                      <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                        Navigasi & Adab Menolong Musafir
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600">
                    Memberikan petunjuk arah belok kanan (*Ittajih ilā l-yamīn*) dan saling mendoakan keberkahan keselamatan.
                  </p>
                </div>
                <button
                  onClick={() => onLaunchGame('dialog_quest')}
                  className="mt-3 w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1"
                >
                  <Play className="w-3.5 h-3.5" /> Buka Skenario Ini
                </button>
              </div>

              {/* Scenario 4 */}
              <div className="bg-white p-4 rounded-3xl border-2 border-emerald-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🫖</span>
                    <div>
                      <h4 className="font-bold text-sm text-slate-800">Memesan Teh & Kurma di Kafe Al-Kautsar</h4>
                      <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                        Pemesanan Kuliner & Tanya Harga
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600">
                    Memesan teh mint panas (*Syay bi-n-na'na'*), kurma manis, menanyakan total harga dinar, dan membayar santun.
                  </p>
                </div>
                <button
                  onClick={() => onLaunchGame('dialog_quest')}
                  className="mt-3 w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1"
                >
                  <Play className="w-3.5 h-3.5" /> Buka Skenario Ini
                </button>
              </div>

              {/* Scenario 5 */}
              <div className="bg-white p-4 rounded-3xl border-2 border-emerald-200 shadow-xs flex flex-col justify-between md:col-span-2">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🩺</span>
                    <div>
                      <h4 className="font-bold text-sm text-slate-800">Konsultasi Kesehatan dengan Dokter Faruq</h4>
                      <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                        Menyampaikan Keluhan Sakit & Doa Kesembuhan
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600">
                    Menjelaskan sakit kepala atau demam (*Ash'uru bi-alamin fi ra'si*), menerima anjuran obat, dan mendoakan kesembuhan.
                  </p>
                </div>
                <button
                  onClick={() => onLaunchGame('dialog_quest')}
                  className="mt-3 w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1"
                >
                  <Play className="w-3.5 h-3.5" /> Buka Skenario Ini
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Buku Frasa Adab & Percakapan Audio */}
        {activeTab === 'phrasebook' && (
          <div className="p-6 overflow-y-auto flex-1 flex flex-col md:flex-row gap-5">
            {/* Left list */}
            <div className="w-full md:w-1/2 space-y-3">
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      const first = PHRASE_BOOK.find(p => p.category === cat);
                      if (first) setSelectedPhrase(first);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      selectedCategory === cat
                        ? 'bg-emerald-700 text-white shadow-sm'
                        : 'bg-white border border-emerald-200 text-slate-700 hover:bg-emerald-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
                {filteredPhrases.map((phrase) => {
                  const isSelected = selectedPhrase.id === phrase.id;
                  return (
                    <button
                      key={phrase.id}
                      onClick={() => {
                        setSelectedPhrase(phrase);
                        sound.speakArabic(phrase.ar);
                      }}
                      className={`w-full p-3 rounded-2xl text-left border flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-emerald-100/90 border-emerald-500 ring-2 ring-emerald-300'
                          : 'bg-white border-slate-200 hover:bg-emerald-50/60'
                      }`}
                    >
                      <div>
                        <span className="font-arabic font-bold text-lg text-slate-900 block leading-tight">
                          {phrase.ar}
                        </span>
                        <span className="text-xs text-emerald-800 font-semibold block mt-0.5">
                          {phrase.translit}
                        </span>
                        <span className="text-[11px] text-slate-600 block line-clamp-1">
                          {phrase.id_translation}
                        </span>
                      </div>
                      <span className="text-xs text-emerald-600 font-bold ml-2">
                        🔊
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right details spotlight */}
            <div className="w-full md:w-1/2 bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs bg-emerald-100 text-emerald-900 font-bold px-3 py-1 rounded-full">
                    Kategori: {selectedPhrase.category}
                  </span>
                  <button
                    onClick={() => sound.speakArabic(selectedPhrase.ar)}
                    className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
                    title="Lafalkan kalimat"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="bg-emerald-50/80 rounded-2xl p-4 border border-emerald-200 mb-4">
                  <span className="text-[10px] uppercase font-bold text-emerald-800 block mb-1">
                    Frasa yang Diucapkan:
                  </span>
                  <h3 className="font-arabic font-extrabold text-2xl text-emerald-950 mb-1 leading-relaxed">
                    "{selectedPhrase.ar}"
                  </h3>
                  <p className="text-xs font-bold text-emerald-800">
                    {selectedPhrase.translit}
                  </p>
                  <p className="text-xs text-slate-700 italic mt-1">
                    "{selectedPhrase.id_translation}"
                  </p>
                </div>

                {/* Response Pair */}
                <div className="bg-amber-50/80 rounded-2xl p-4 border border-amber-200">
                  <span className="text-[10px] uppercase font-bold text-amber-800 block mb-1">
                    Jawaban Balasan yang Lazim (الرَّدُّ المُنَاسِب):
                  </span>
                  <h4 className="font-arabic font-extrabold text-2xl text-amber-950 mb-1 leading-relaxed">
                    "{selectedPhrase.replyAr}"
                  </h4>
                  <p className="text-xs font-bold text-amber-800">
                    {selectedPhrase.replyTranslit}
                  </p>
                  <p className="text-xs text-slate-700 italic mt-1">
                    "{selectedPhrase.replyId}"
                  </p>
                  <button
                    onClick={() => sound.speakArabic(selectedPhrase.replyAr)}
                    className="mt-2 text-xs text-amber-800 hover:text-amber-950 font-bold flex items-center gap-1"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Putar Bunyi Jawaban Balasan
                  </button>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Konteks: {selectedPhrase.context}</span>
                <span className="text-emerald-700 font-bold">Adab Islami Fashih</span>
              </div>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="bg-emerald-50 px-6 py-3 border-t border-emerald-200 flex items-center justify-between text-xs text-emerald-900">
          <div className="flex items-center gap-2">
            <span>🏘️ Kampung Hiwar (HWR)</span>
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
