import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, CheckCircle2, Award, ShoppingBag, ArrowRight, RefreshCw, Star, Layers, Sparkles } from 'lucide-react';
import { sound } from '../../services/sound';
import { GameStorage } from '../../services/storage';
import { GameShell, GameFlowState } from './GameShell';

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
  const [flowState, setFlowState] = useState<GameFlowState>('BRIEFING');
  const [selectedStageIdx, setSelectedStageIdx] = useState(0);
  const [custIdx, setCustIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [coinsEarned, setCoinsEarned] = useState(0);
  const [shakeWrong, setShakeWrong] = useState<string | null>(null);
  const [successItem, setSuccessItem] = useState<MarketItem | null>(null);
  const [mascotMood, setMascotMood] = useState<'happy' | 'cheer' | 'thinking' | 'celebrate'>('happy');
  const [mascotComment, setMascotComment] = useState('Pilih barang pesanan pembeli di rak!');

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
      setMascotMood('celebrate');
      setMascotComment(`Mumtaz! ${item.name_id} berhasil diserahkan ke pembeli!`);

      GameStorage.markWordLearned(item.id);
      GameStorage.addReward(40, 2, 'lughah', 6);
      onReward(40, 2);

      setTimeout(() => {
        setSuccessItem(null);
        if (custIdx < stage.customers.length - 1) {
          setCustIdx(prev => prev + 1);
          setMascotMood('happy');
          setMascotComment('Pembeli baru tiba di dermaga!');
        } else {
          setFlowState('VICTORY');
        }
      }, 1200);
    } else {
      sound.playGentleRetry();
      sound.speakArabic(targetItem.name_ar);
      setShakeWrong(item.id);
      setMascotMood('thinking');
      setMascotComment(`Belum tepat! Pembeli mencari ${targetItem.name_id} (${targetItem.name_ar}).`);
      GameStorage.markWordDifficult(targetItem.id);
      setTimeout(() => setShakeWrong(null), 600);
    }
  };

  const playCustomerAudio = () => {
    sound.speakArabic(customer.requestPhrase);
  };

  const handleSwitchStage = (idx: number) => {
    sound.playPop();
    setSelectedStageIdx(idx);
    setCustIdx(0);
    setSuccessItem(null);
  };

  return (
    <GameShell
      title="Pasar Apung Mufradat"
      titleAr="سُوقُ المُفْرَدَاتِ العَائِمَةِ"
      islandName="Pulau Mufradat"
      islandColor="from-amber-600 via-orange-500 to-yellow-600"
      gameIcon="⛵"
      targetObjective="Layani pembeli perahu dermaga dengan mencocokkan kosakata bahasa Arab yang diminta"
      howToPlay={[
        { icon: '👳‍♂️', text: 'Perhatikan kalimat pesanan pembeli yang mendarat di dermaga pasar.' },
        { icon: '🍎', text: 'Pilih barang dagangan yang sesuai dengan nama dan tulisan bahasa Arabnya.' },
        { icon: '🪙', text: 'Kumpulkan koin Dinar dan bintang pemuas pembeli untuk naik tingkat!' }
      ]}
      speechArabic="أَهْلاً بِكُمْ فِي سُوقِ الكَلِمَاتِ!"
      speechIntro="Mari melayani para musafir di dermaga pasar apung Pulau Mufradat!"
      flowState={flowState}
      onStartGame={() => {
        setFlowState('PLAYING');
        setCustIdx(0);
        setScore(0);
        setCoinsEarned(0);
        playCustomerAudio();
      }}
      onPlayAgain={() => {
        setFlowState('PLAYING');
        setCustIdx(0);
        setScore(0);
        setCoinsEarned(0);
        setSuccessItem(null);
      }}
      onClose={onClose}
      currentRound={custIdx + 1}
      totalRounds={stage.customers.length}
      score={score}
      maxScore={stage.customers.length}
      starsEarned={score >= stage.customers.length ? 3 : score >= 2 ? 2 : 1}
      xpEarned={score * 40}
      mascotMood={mascotMood}
      mascotComment={mascotComment}
      mascotArabic={targetItem.name_ar}
      victorySummary={[
        { label: 'Pembeli Terlayani', value: `${score} Orang` },
        { label: 'Dinar Terkumpul', value: `🪙 ${coinsEarned} Dinar` },
        { label: 'Tema Dermaga', value: stage.theme },
        { label: 'Kepuasan Pasar', value: '⭐⭐⭐ Sempurna' }
      ]}
    >
      {/* Stage Selector Pills */}
      <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-amber-200/80 overflow-x-auto text-xs">
        <span className="font-bold text-amber-900 shrink-0 text-[11px] flex items-center gap-1">
          <Layers className="w-3.5 h-3.5" /> Dermaga:
        </span>
        {MARKET_STAGES.map((stg, i) => (
          <button
            key={stg.id}
            onClick={() => handleSwitchStage(i)}
            className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedStageIdx === i
                ? 'bg-amber-600 text-white font-black shadow-xs ring-1 ring-amber-400'
                : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200'
            }`}
          >
            {stg.title}
          </button>
        ))}
      </div>

      {/* Customer Quest Banner */}
      <div className="bg-gradient-to-r from-sky-50 to-amber-50 border-2 border-amber-300 rounded-2xl p-3 sm:p-4 mb-3 flex items-center gap-3 shadow-xs">
        <div className="w-12 h-12 rounded-2xl bg-amber-200 flex items-center justify-center text-3xl shadow-inner border border-amber-300 shrink-0">
          {customer.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1">
            <span className="text-[11px] font-black text-amber-800 uppercase tracking-wider">
              {customer.name} memesan:
            </span>
            <button
              type="button"
              onClick={playCustomerAudio}
              className="p-1 rounded-lg bg-white hover:bg-amber-100 text-amber-800 border border-amber-200 text-[11px] font-bold flex items-center gap-1 shadow-2xs"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Dengar</span>
            </button>
          </div>
          <p className="font-arabic text-teal-900 text-base sm:text-lg font-black leading-snug truncate mt-0.5">
            "{customer.requestPhrase}"
          </p>
          <p className="text-xs text-slate-600 italic leading-snug">
            "{customer.requestIndo}"
          </p>
        </div>
      </div>

      {/* Market Shelf Items Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 my-auto">
        {stage.items.map(item => {
          const isShaking = shakeWrong === item.id;
          const isTarget = item.id === targetItem.id;
          const isSuccess = successItem?.id === item.id;

          return (
            <motion.button
              key={item.id}
              type="button"
              animate={isShaking ? { x: [-8, 8, -6, 6, 0] } : isSuccess ? { scale: [1, 1.06, 1] } : {}}
              transition={{ duration: 0.3 }}
              onClick={() => handleSelectItem(item)}
              className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer relative ${
                isSuccess
                  ? 'bg-emerald-100 border-emerald-400 ring-2 ring-emerald-300 shadow-md'
                  : 'bg-white hover:bg-amber-50/80 border-slate-200 hover:border-amber-400 shadow-xs hover:shadow-md'
              }`}
            >
              <span className="text-3xl sm:text-4xl">{item.emoji}</span>
              <span className="font-arabic text-lg sm:text-xl font-black text-slate-800">
                {item.name_ar}
              </span>
              <span className="text-[11px] font-bold text-slate-600 text-center leading-tight">
                {item.name_id}
              </span>

              {/* Price Tag */}
              <div className="mt-1 bg-amber-100 px-2 py-0.5 rounded-full text-[10px] font-black text-amber-900">
                🪙 {item.priceDinar} Dinar
              </div>
            </motion.button>
          );
        })}
      </div>
    </GameShell>
  );
};
