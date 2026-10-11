import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, CheckCircle2, Award, ShoppingBag, ArrowRight, RefreshCw, Star, Layers, Sparkles } from 'lucide-react';
import { sound } from '../../services/sound';
import { GameStorage } from '../../services/storage';

interface FloatingMarketProps {
  onClose: () => void;
  onReward: (xp: number, stars: number) => void;
}

interface MarketItem {
  id: string;
  name_ar: string;
  translit: string;
  name_id: string;
  emoji: string;
  color: string;
  priceDinar: number;
}

interface MarketStage {
  id: string;
  title: string;
  theme: string;
  items: MarketItem[];
  customers: {
    name: string;
    avatar: string;
    targetItemId: string;
    requestPhrase: string;
    requestIndo: string;
  }[];
}

const MARKET_STAGES: MarketStage[] = [
  {
    id: 'food_drinks',
    title: 'Dermaga Makanan & Buah',
    theme: 'الطَّعَام وَالشَّرَاب',
    items: [
      { id: 'lx_khubz', name_ar: 'خُبْز', translit: 'khubz', name_id: 'Roti Gandum Hangat', emoji: '🍞', color: 'from-amber-200 to-amber-400', priceDinar: 2 },
      { id: 'lx_maa', name_ar: 'مَاء', translit: 'māʾ', name_id: 'Air Tawar Segar', emoji: '💧', color: 'from-sky-200 to-cyan-300', priceDinar: 1 },
      { id: 'lx_halib', name_ar: 'حَلِيب', translit: 'ḥalīb', name_id: 'Susu Murni Segar', emoji: '🥛', color: 'from-slate-100 to-amber-100', priceDinar: 3 },
      { id: 'lx_tuffahah', name_ar: 'تُفَّاحَة', translit: 'tuffāḥah', name_id: 'Apel Merah Manis', emoji: '🍎', color: 'from-rose-200 to-red-400', priceDinar: 4 },
      { id: 'lx_tamr', name_ar: 'تَمْر', translit: 'tamr', name_id: 'Kurma Madinah', emoji: '🌴', color: 'from-amber-300 to-yellow-600', priceDinar: 5 },
      { id: 'lx_shay', name_ar: 'شَاي', translit: 'shāy', name_id: 'Teh Hangat Daun Mint', emoji: '🫖', color: 'from-emerald-200 to-green-400', priceDinar: 2 },
    ],
    customers: [
      { name: 'Nakhoda Tariq', avatar: '👳‍♂️', targetItemId: 'lx_khubz', requestPhrase: 'أُرِيدُ خُبْزًا طَازَجًا مِنْ فَضْلِكَ!', requestIndo: 'Saya ingin roti gandum hangat untuk bekal berlayar!' },
      { name: 'Musafir Laila', avatar: '🧕', targetItemId: 'lx_maa', requestPhrase: 'أُرِيدُ مَاءً بَارِدًا، جَزَاكَ اللَّهُ خَيْرًا!', requestIndo: 'Tenggorokanku haus, berikan air tawar segar!' },
      { name: 'Anak Gembala Salman', avatar: '👦', targetItemId: 'lx_halib', requestPhrase: 'أُرِيدُ حَلِيبًا لَذِيذًا لِلْإِفْطَارِ!', requestIndo: 'Saya ingin segelas susu murni lezat untuk sarapan!' },
      { name: 'Nenek Maryam', avatar: '👵', targetItemId: 'lx_tamr', requestPhrase: 'أُرِيدُ تَمْرًا حُلْوًا مِنَ المَدِينَةِ!', requestIndo: 'Saya ingin kurma manis Madinah yang berkah!' },
    ]
  },
  {
    id: 'school_tools',
    title: 'Dermaga Sekolah & Ilmu',
    theme: 'الأَدَوَات المَدْرَسِيَّة',
    items: [
      { id: 'lx_kitab', name_ar: 'كِتَاب', translit: 'kitāb', name_id: 'Kitab Pelajaran', emoji: '📖', color: 'from-emerald-200 to-teal-400', priceDinar: 5 },
      { id: 'lx_qalam', name_ar: 'قَلَم', translit: 'qalam', name_id: 'Pena Kaligrafi', emoji: '🖊️', color: 'from-indigo-200 to-purple-400', priceDinar: 2 },
      { id: 'lx_kursiy', name_ar: 'كُرْسِيّ', translit: 'kursiyy', name_id: 'Kursi Belajar Kayu', emoji: '🪑', color: 'from-amber-200 to-stone-400', priceDinar: 6 },
      { id: 'lx_thawilah', name_ar: 'طَاوِلَة', translit: 'ṭāwilah', name_id: 'Meja Tulis Perpustakaan', emoji: '🪵', color: 'from-yellow-200 to-amber-500', priceDinar: 8 },
      { id: 'lx_hasub', name_ar: 'حَاسُوب', translit: 'ḥāsūb', name_id: 'Komputer Digital', emoji: '💻', color: 'from-blue-200 to-indigo-400', priceDinar: 15 },
      { id: 'lx_hatif', name_ar: 'هَاتِف', translit: 'hātif', name_id: 'Telepon Pintar', emoji: '📱', color: 'from-cyan-200 to-teal-400', priceDinar: 12 },
    ],
    customers: [
      { name: 'Penuntut Ilmu Zaid', avatar: '🧑‍🎓', targetItemId: 'lx_kitab', requestPhrase: 'أُرِيدُ كِتَابَ اللُّغَةِ العَرَبِيَّةِ!', requestIndo: 'Saya ingin kitab bahasa Arab untuk belajar di halaqah!' },
      { name: 'Khathath Ahmad', avatar: '👨‍🎨', targetItemId: 'lx_qalam', requestPhrase: 'أُرِيدُ قَلَمًا لِخَطِّ النَّسْخِ!', requestIndo: 'Saya butuh pena tajam untuk menorehkan khat Naskh!' },
      { name: 'Muhandis Karim', avatar: '👷', targetItemId: 'lx_hasub', requestPhrase: 'أُرِيدُ حَاسُوبًا لِلتَّصْمِيمِ!', requestIndo: 'Saya butuh komputer untuk merancang jembatan!' },
    ]
  },
  {
    id: 'animals_nature',
    title: 'Dermaga Fauna Samudra & Gurun',
    theme: 'الحَيَوَانَات وَالطَّبِيعَة',
    items: [
      { id: 'lx_samakah', name_ar: 'سَمَكَة', translit: 'samakah', name_id: 'Ikan Segar Emas', emoji: '🐟', color: 'from-sky-200 to-blue-400', priceDinar: 3 },
      { id: 'lx_qittah', name_ar: 'قِطَّة', translit: 'qiṭṭah', name_id: 'Kucing Lucu Bersih', emoji: '🐱', color: 'from-amber-200 to-orange-300', priceDinar: 4 },
      { id: 'lx_thair', name_ar: 'طَائِر', translit: 'ṭāʾir', name_id: 'Burung Merpati Hijau', emoji: '🐦', color: 'from-teal-200 to-emerald-400', priceDinar: 3 },
      { id: 'lx_jamal', name_ar: 'جَمَل', translit: 'jamal', name_id: 'Unta Karavan Pasir', emoji: '🐪', color: 'from-yellow-200 to-amber-600', priceDinar: 20 },
      { id: 'lx_hishan', name_ar: 'حِصَان', translit: 'ḥiṣān', name_id: 'Kuda Arab Tangkas', emoji: '🐴', color: 'from-orange-200 to-amber-700', priceDinar: 25 },
      { id: 'lx_asad', name_ar: 'أَسَد', translit: 'asad', name_id: 'Singa Berani', emoji: '🦁', color: 'from-amber-300 to-yellow-500', priceDinar: 50 },
    ],
    customers: [
      { name: 'Kucing Pelaut Mishi', avatar: '🐱', targetItemId: 'lx_samakah', requestPhrase: 'أُرِيدُ سَمَكَةً طَازَجَةً كَبِيرَةً، مِيَاوْ!', requestIndo: 'Saya ingin ikan segar sungai yang lezat, meow!' },
      { name: 'Kafilah Gurun Badawi', avatar: '🧕', targetItemId: 'lx_jamal', requestPhrase: 'أُرِيدُ جَمَلًا صَبُورًا لِلسَّفَرِ فِي الصَّحْرَاءِ!', requestIndo: 'Saya butuh unta tangguh untuk menyeberangi padang pasir!' },
      { name: 'Ksatria Faris', avatar: '🏇', targetItemId: 'lx_hishan', requestPhrase: 'أُرِيدُ حِصَانًا سَرِيعًا وَقَوِيًّا!', requestIndo: 'Saya ingin seekor kuda gagah perkasa untuk melintasi lembah!' },
    ]
  }
];

export const FloatingMarketGame: React.FC<FloatingMarketProps> = ({ onClose, onReward }) => {
  const [selectedStageIdx, setSelectedStageIdx] = useState(0);
  const [custIdx, setCustIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [coinsEarned, setCoinsEarned] = useState(0);
  const [shakeWrong, setShakeWrong] = useState<string | null>(null);
  const [successItem, setSuccessItem] = useState<MarketItem | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const stage = MARKET_STAGES[selectedStageIdx];
  const customer = stage.customers[custIdx];
  const targetItem = stage.items.find(i => i.id === customer.targetItemId) || stage.items[0];

  const handleSelectItem = (item: MarketItem) => {
    if (item.id === targetItem.id) {
      sound.playSuccess();
      sound.speakArabic(item.name_ar);
      setSuccessItem(item);
      setScore(prev => prev + 1);
      setCoinsEarned(prev => prev + item.priceDinar);
      GameStorage.markWordLearned(item.id);
      GameStorage.addReward(40, 2, 'lughah', 6);
      onReward(40, 2);

      setTimeout(() => {
        setSuccessItem(null);
        if (custIdx < stage.customers.length - 1) {
          setCustIdx(prev => prev + 1);
        } else {
          setIsFinished(true);
        }
      }, 1400);
    } else {
      sound.playGentleRetry();
      sound.speakArabic(targetItem.name_ar);
      setShakeWrong(item.id);
      GameStorage.markWordDifficult(targetItem.id);
      setTimeout(() => setShakeWrong(null), 600);
    }
  };

  const playCustomerAudio = () => {
    sound.speakArabic(customer.requestPhrase);
  };

  const handleSwitchStage = (idx: number) => {
    setSelectedStageIdx(idx);
    setCustIdx(0);
    setIsFinished(false);
    setSuccessItem(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-xl bg-gradient-to-b from-sky-50 via-amber-50 to-orange-50 rounded-3xl shadow-2xl border-4 border-amber-300 overflow-hidden flex flex-col max-h-[94vh]"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white p-4 flex items-center justify-between shadow-md">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20">Pasar Apung Mufradat (MFR)</span>
              <span className="text-xs bg-amber-300 text-amber-950 font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
                ⭐ {score} Pembeli
              </span>
              <span className="text-xs bg-yellow-300 text-yellow-950 font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
                🪙 {coinsEarned} Dinar
              </span>
            </div>
            <h2 className="text-xl font-bold font-chibi flex items-center gap-2 mt-1">
              ⛵ Floating Market Quest — سُوقُ المُفْرَدَات
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white font-bold transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Stage Selector Pills */}
        <div className="bg-amber-100/80 px-4 py-2 flex items-center gap-2 overflow-x-auto border-b border-amber-200">
          <span className="text-xs font-bold text-amber-900 flex items-center gap-1 whitespace-nowrap">
            <Layers className="w-3.5 h-3.5" /> Dermaga:
          </span>
          {MARKET_STAGES.map((stg, i) => (
            <button
              key={stg.id}
              onClick={() => handleSwitchStage(i)}
              className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedStageIdx === i
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-white/80 text-amber-900 hover:bg-white'
              }`}
            >
              {stg.title}
            </button>
          ))}
        </div>

        {/* Body Container */}
        <div className="p-4 overflow-y-auto flex-1 flex flex-col justify-between">
          {!isFinished ? (
            <>
              {/* Customer Floating Boat Order Card */}
              <div className="bg-white rounded-3xl p-4 shadow-lg border-2 border-amber-200 relative overflow-hidden mb-4">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100/50 rounded-full blur-2xl -mr-10 -mt-10" />

                <div className="flex items-start gap-4">
                  {/* Customer Avatar & Boat Icon */}
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-400 flex items-center justify-center text-3xl shadow-md border-2 border-white">
                      {customer.avatar}
                    </div>
                    <span className="absolute -bottom-2 -right-1 text-base" title="Perahu Terapung">
                      🛶
                    </span>
                  </div>

                  {/* Customer speech bubble */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-slate-800 text-sm">{customer.name}</h4>
                      <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                        Pesanan {custIdx + 1} dari {stage.customers.length}
                      </span>
                    </div>

                    {/* Arabic Request with Voice */}
                    <div className="flex items-center gap-2 bg-amber-50/80 p-2.5 rounded-2xl border border-amber-200/80">
                      <p className="font-arabic font-bold text-xl text-amber-950 flex-1 leading-relaxed">
                        "{customer.requestPhrase}"
                      </p>
                      <button
                        onClick={playCustomerAudio}
                        className="w-9 h-9 rounded-xl bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center shadow-xs transition-transform active:scale-95 shrink-0"
                        title="Dengarkan Suara Pembeli"
                      >
                        <Volume2 className="w-5 h-5" />
                      </button>
                    </div>

                    <p className="text-xs text-slate-600 italic mt-1.5 flex items-center gap-1">
                      <span>💡 Terjemahan:</span> "{customer.requestIndo}"
                    </p>
                  </div>
                </div>

                {/* Target item clue badge */}
                <div className="mt-3 pt-3 border-t border-amber-100 flex items-center justify-between text-xs text-amber-900 font-semibold">
                  <span>Pilih barang dari perahu terapung di bawah:</span>
                  <span className="bg-amber-200 text-amber-900 px-2.5 py-0.5 rounded-full font-bold">
                    Upah: +{targetItem.priceDinar} Dinar 🪙
                  </span>
                </div>
              </div>

              {/* River Waves Waterline Indicator */}
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-sky-700 my-1">
                <span>〰️</span>
                <span>Aliran Sungai Pasar Apung (سُوقُ المُفْرَدَات)</span>
                <span>〰️</span>
              </div>

              {/* Boat Goods Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-2">
                {stage.items.map((item) => {
                  const isShaking = shakeWrong === item.id;
                  const isSuccess = successItem?.id === item.id;

                  return (
                    <motion.button
                      key={item.id}
                      animate={isShaking ? { x: [-8, 8, -6, 6, 0] } : {}}
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleSelectItem(item)}
                      className={`relative p-3 rounded-2xl bg-white border-2 text-left shadow-md flex flex-col justify-between transition-all ${
                        isSuccess
                          ? 'border-emerald-500 ring-4 ring-emerald-300 bg-emerald-50'
                          : isShaking
                          ? 'border-rose-400 bg-rose-50'
                          : 'border-amber-200 hover:border-amber-400 hover:shadow-lg'
                      }`}
                    >
                      {/* Top icon and price */}
                      <div className="flex items-center justify-between mb-1">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl shadow-xs`}>
                          {item.emoji}
                        </div>
                        <span className="text-[10px] font-extrabold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full border border-amber-200">
                          {item.priceDinar} Dinar
                        </span>
                      </div>

                      {/* Item Arabic Word */}
                      <div className="mt-1">
                        <div className="font-arabic font-bold text-2xl text-slate-900 leading-tight">
                          {item.name_ar}
                        </div>
                        <div className="text-[11px] font-bold text-amber-800">
                          {item.translit}
                        </div>
                        <div className="text-[11px] text-slate-600 line-clamp-1">
                          {item.name_id}
                        </div>
                      </div>

                      {/* Sound speak small button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          sound.speakArabic(item.name_ar);
                        }}
                        className="mt-2 text-[10px] text-amber-700 font-bold flex items-center gap-1 hover:text-amber-900"
                      >
                        <Volume2 className="w-3 h-3" /> Lafalkan
                      </button>

                      {/* Success mark overlay */}
                      {isSuccess && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute inset-0 bg-emerald-500/90 rounded-2xl flex flex-col items-center justify-center text-white"
                        >
                          <CheckCircle2 className="w-8 h-8 mb-1" />
                          <span className="font-bold text-xs">MUMTAZ!</span>
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </>
          ) : (
            /* Stage Finished Victory Card */
            <div className="bg-white rounded-3xl p-6 text-center shadow-xl border-4 border-amber-300 my-auto">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-20 h-20 rounded-full bg-amber-500 text-white flex items-center justify-center mx-auto mb-3 shadow-lg"
              >
                <Award className="w-10 h-10" />
              </motion.div>

              <h3 className="text-2xl font-bold font-chibi text-slate-800 mb-1">
                Barakallahu Feek!
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                Kamu telah berhasil melayani seluruh pembeli di <strong>{stage.title}</strong>!
              </p>

              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 mb-5 flex items-center justify-around">
                <div>
                  <span className="text-xs text-slate-500 block">Total Skor</span>
                  <span className="text-xl font-extrabold text-amber-900">⭐ {score}</span>
                </div>
                <div className="h-8 w-px bg-amber-200" />
                <div>
                  <span className="text-xs text-slate-500 block">Dinar Terkumpul</span>
                  <span className="text-xl font-extrabold text-amber-900">🪙 {coinsEarned}</span>
                </div>
                <div className="h-8 w-px bg-amber-200" />
                <div>
                  <span className="text-xs text-slate-500 block">Bonus XP</span>
                  <span className="text-xl font-extrabold text-emerald-600">+120 XP</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                {selectedStageIdx < MARKET_STAGES.length - 1 ? (
                  <button
                    onClick={() => handleSwitchStage(selectedStageIdx + 1)}
                    className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-2xl shadow-lg hover:from-amber-600 hover:to-orange-600 flex items-center justify-center gap-2"
                  >
                    Lanjut ke Dermaga Berikutnya <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleSwitchStage(0)}
                    className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-2xl shadow-lg hover:from-amber-600 hover:to-orange-600 flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" /> Mainkan Lagi
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl"
                >
                  Selesai
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
