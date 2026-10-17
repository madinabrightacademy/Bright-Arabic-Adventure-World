import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Volume2, Award, Sparkles, CheckCircle2, ChevronRight, ChevronLeft, Feather, BookOpen, Heart } from 'lucide-react';
import { sound } from '../../services/sound';
import { GameStorage } from '../../services/storage';

interface HudhudLetterProps {
  onClose: () => void;
  onReward: (xp: number, stars: number) => void;
}

interface LetterItem {
  id: number;
  levelBadge: string;
  islandOrigin: string;
  islandBg: string;
  date: string;
  title: string;
  arText: string;
  translit: string;
  translation: string;
  question: string;
  options: { text: string; correct: boolean }[];
  wisdom: string;
}

const HUDHUD_ALL_LETTERS: LetterItem[] = [
  {
    id: 1,
    levelBadge: 'Jenjang 0 • Tamhidi',
    islandOrigin: 'Pulau Huruf',
    islandBg: 'bg-teal-600',
    date: 'Hari ke-1 • Menatap Pasir Mutiara',
    title: 'Keajaiban 28 Huruf di Pasir Pantai',
    arText: 'صَبَاحَ الخَيْرِ يَا صَدِيقِي الصَّغِير! أَنَا أَطِيرُ فَوْقَ جَزِيرَةِ الحُرُوفِ وَرَأَيْتُ حُرُوفَ الهِجَاءِ تَلْمَعُ فِي رِمَالِ الشَّاطِئِ مِثْلَ اللَّآلِئِ. تَعَلَّمِ النَّطْقَ الصَّحِيحَ تَبْتَهِجْ!',
    translit: 'Ṣabāḥa l-khayri yā ṣadīqī ṣ-ṣaghīr! Anā aṭīru fawqa jazīrati l-ḥurūfi wa-raʾaytu ḥurūfa l-hijāʾi talmaʿu fī rimāli sy-syāṭiʾi mithla l-laʾāliʾ. Taʿallami n-nuṭqa ṣ-ṣaḥīḥa tabtahij!',
    translation: 'Selamat pagi wahai sahabat kecilku! Aku sedang terbang di atas Pulau Huruf dan melihat huruf-huruf hijaiyah berkilauan di pasir pantai bagaikan mutiara. Pelajarilah pelafalan yang benar niscaya hatimu bergembira!',
    question: 'Di manakah huruf-huruf hijaiyah berkilauan bagai mutiara?',
    options: [
      { text: 'Di pasir pantai Pulau Huruf (رِمَالِ الشَّاطِئ)', correct: true },
      { text: 'Di dalam sumur yang gelap gulita', correct: false },
      { text: 'Di atas awan mendung', correct: false },
    ],
    wisdom: 'Mengenali bentuk huruf adalah langkah pertama membuka pintu gerbang ilmu wahyu.'
  },
  {
    id: 2,
    levelBadge: 'Jenjang 1 • Mubtadi\'',
    islandOrigin: 'Pasar Mufradat',
    islandBg: 'bg-amber-600',
    date: 'Hari ke-2 • Aroma Roti & Kurma Madinah',
    title: 'Kafilah Perahu di Dermaga Apung',
    arText: 'يَا طَالِبَ الخَيْرِ، زُرْتُ اليَوْمَ سُوقَ المُفْرَدَاتِ؛ رَأَيْتُ الخُبْزَ الطَّازَجَ وَالمَاءَ البَارِدَ وَالتَّمْرَ الحُلْوَ. لَا تَنْسَ أَنْ تَسْأَلَ بِلُطْفٍ: «أُرِيدُ خُبْزًا مِنْ فَضْلِكَ»!',
    translit: 'Yā ṭāliba l-khayr, zurtu l-yawma sūqa l-mufradāt; raʾaytu l-khubza ṭ-ṭāzaja wa-l-māʾa l-bārida wa-t-tamra l-ḥulw. Lā tansa an tasʾala bi-luṭf: «Urīdu khubzan min faḍlik»!',
    translation: 'Wahai penuntut kebaikan, hari ini aku mengunjungi Pasar Mufradat; aku melihat roti gandum hangat, air tawar sejuk, dan kurma manis. Jangan lupa meminta dengan santun: "Saya ingin roti, tolong"!',
    question: 'Bagaimana cara meminta roti dengan santun menurut surat Hudhud?',
    options: [
      { text: '«أُرِيدُ خُبْزًا مِنْ فَضْلِكَ» (Urīdu khubzan min faḍlik)', correct: true },
      { text: '«أَعْطِنِي سَرِيعًا» (Beri aku cepat!)', correct: false },
      { text: '«أَنَا لَا أُرِيدُ شَيْئًا» (Aku tidak mau apa-apa)', correct: false },
    ],
    wisdom: 'Adab kesantunan berbahasa lebih harum daripada wewangian kesturi di pasar.'
  },
  {
    id: 3,
    levelBadge: 'Jenjang 2 • Mutawassith Awal',
    islandOrigin: 'Kampung Hiwar',
    islandBg: 'bg-emerald-600',
    date: 'Hari ke-3 • Hangatnya Salam di Kedai',
    title: 'Menyebarkan Salam & Senyuman Saudara',
    arText: 'أَهْلًا يَا صَدِيقِي، جَلَسْتُ فِي قَرْيَةِ الحِوَارِ مَعَ أَهْلِ الكَرَمِ. إِذَا لَقِيتَ أَخَاكَ فَابْتَسِمْ وَقُلْ: «السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ»؛ فَهِيَ مِفْتَاحُ القُلُوبِ!',
    translit: 'Ahlan yā ṣadīqī, jalastu fī qaryati l-ḥiwāri maʿa ahli l-karam. Idhā laqīta akhāka fa-btasim wa-qul: «As-salāmu ʿalaykum wa-raḥmatu Llāh»; fa-hiya miftāḥu l-qulūb!',
    translation: 'Halo sahabatku, aku duduk di Kampung Hiwar bersama para dermawan. Jika engkau bertemu saudaramu, tersenyumlah dan ucapkan: "As-salāmu ʿalaykum wa-raḥmatu Llāh"; karena itu adalah kunci pembuka hati!',
    question: 'Apakah yang menjadi kunci pembuka hati saat berjumpa sesama saudara?',
    options: [
      { text: 'Senyuman dan ucapan Salam (السَّلَامُ عَلَيْكُم)', correct: true },
      { text: 'Menghindar dan berpaling wajah', correct: false },
      { text: 'Berbicara dengan nada marah', correct: false },
    ],
    wisdom: 'Salam bukan sekadar sapaan, melainkan doa keselamatan yang mengikat persaudaraan abadi.'
  },
  {
    id: 4,
    levelBadge: 'Jenjang 3 • Mutawassith',
    islandOrigin: 'Gunung Qawa\'id',
    islandBg: 'bg-blue-600',
    date: 'Hari ke-4 • Tegaknya Menara Nahwu',
    title: 'Keteraturan Kalimat Menjaga Makna',
    arText: 'يَا بَاحِثًا عَنِ الحِكْمَةِ، صَعِدْتُ جَبَلَ القَوَاعِدِ وَرَأَيْتُ كَيْفَ تَسْتَقِيمُ الجُمَلُ كَمَا تَسْتَقِيمُ المَبَانِي! تَعَلَّمِ الإِعْرَابَ لِتَفْهَمَ مَعَانِيَ الكَلَامِ بِدِقَّةٍ.',
    translit: 'Yā bāḥithan ʿani l-ḥikmah, ṣaʿidtu jabala l-qawāʿidi wa-raʾaytu kayfa tastaqīmu l-jumalu kamā tastaqīmu l-mabānī! Taʿallami l-iʿrāba li-tafhama maʿāniya l-kalāmi bi-diqqah.',
    translation: 'Wahai pencari hikmah, aku mendaki Gunung Qawa\'id dan melihat bagaimana kalimat-kalimat berdiri kokoh bagaikan gedung megah! Pelajarilah i\'rab untuk memahami kedalaman makna perkataan secara presisi.',
    question: 'Mengapa kita perlu mempelajari qawa\'id dan i\'rab?',
    options: [
      { text: 'Agar memahami kedalaman makna perkataan secara presisi (بِدِقَّة)', correct: true },
      { text: 'Hanya untuk memamerkan kecerdasan', correct: false },
      { text: 'Supaya tidak perlu membaca buku lagi', correct: false },
    ],
    wisdom: 'Tata bahasa adalah timbangan akal; lisan yang terjaga mencerminkan pikiran yang tertata rapi.'
  },
  {
    id: 5,
    levelBadge: 'Jenjang 4 • Mutaqaddim',
    islandOrigin: 'Lembah Istima\' & Perpustakaan',
    islandBg: 'bg-rose-700',
    date: 'Hari ke-5 • Merdunya Bait Hikmah Imam Syafi\'i',
    title: 'Manisnya Buah Ketekunan Belajar',
    arText: 'تَأَمَّلْ يَا رَفِيقِي: «مَنْ لَمْ يَذُقْ مُرَّ التَّعَلُّمِ سَاعَةً، تَجَرَّعَ ذُلَّ الجَهْلِ طُولَ حَيَاتِهِ». صَبْرُكَ فِي طَلَبِ العِلْمِ اليَوْمَ سَيَكُونُ تَاجَ عِزٍّ لَكَ غَدًا!',
    translit: 'Taʾammal yā rafīqī: «Man lam yadhuq murra t-taʿallumi sāʿatan, tajarraʿa dzulla l-jahli ṭūla ḥayātih». Ṣabruka fī ṭalabi l-ʿilmi l-yawma sayakūnu tāja ʿizzin laka ghadā!',
    translation: 'Renungkanlah wahai karibku: "Barangsiapa belum mencicipi pahitnya belajar sejenak, ia akan meneguk hinanya kebodohan sepanjang hayatnya". Kesabaranmu menuntut ilmu hari ini akan menjadi mahkota kemuliaanmu esok!',
    question: 'Apa balasan bagi kesabaran menuntut ilmu hari ini menurut surat Hudhud?',
    options: [
      { text: 'Menjadi mahkota kemuliaan di masa depan (تَاجَ عِزٍّ)', correct: true },
      { text: 'Kelelahan yang sia-sia tanpa guna', correct: false },
      { text: 'Tertinggal dari kafilah sahabat', correct: false },
    ],
    wisdom: 'Pahitnya tinta para ulama jauh lebih mulia daripada manisnya madu kemalasan.'
  },
  {
    id: 6,
    levelBadge: 'Jenjang 5 • Mutamayyiz',
    islandOrigin: 'Kuil Langit & Pulau Kalam',
    islandBg: 'bg-amber-500',
    date: 'Hari ke-6 • Sayap Emas Menembus Cakrawala',
    title: 'Menjadi Duta Bahasa Al-Qur\'an',
    arText: 'مَا شَاءَ اللَّهُ تَبَارَكَ اللَّهُ! لَقَدْ بَلَغْتَ رُتْبَةَ الكَلَامِ الفَصِيحِ. كُنْ نُورًا يَهْدِي النَّاسَ، وَانْشُرِ الخَيْرَ بِلِسَانٍ عَرَبِيٍّ مُبِينٍ. أَنَا فَخُورٌ بِكَ يَا بَطَلَ بْرَايْتُورْيَا!',
    translit: 'Mā syāʾa Llāhu tabāraka Llāh! Laqad balaghta rutbata l-kalāmi l-faṣīḥ. Kun nūran yahdī n-nās, wa-nsyuri l-khayra bi-lisānin ʿarabiyyin mubīn. Anā fakhūrun bika yā baṭala Brāytūryā!',
    translation: 'Masya Allah Tabarakallah! Engkau telah mencapai derajat kelancaran bicara yang fasih. Jadilah cahaya penuntun sesama, dan tebarkanlah kebaikan dengan lisan Arab yang jelas. Aku sangat bangga kepadamu, wahai pahlawan Brightoria!',
    question: 'Dengan apakah pahlawan Brightoria menebarkan kebaikan?',
    options: [
      { text: 'Dengan lisan Arab yang jelas dan mulia (بِلِسَانٍ عَرَبِيٍّ مُبِين)', correct: true },
      { text: 'Dengan perdebatan yang kasar', correct: false },
      { text: 'Dengan menyembunyikan ilmu pengetahuan', correct: false },
    ],
    wisdom: 'Kemahiran lisan adalah amanah ilahi untuk membimbing umat menuju kebenaran dan kedamaian.'
  }
];

export const HudhudLetterModal: React.FC<HudhudLetterProps> = ({ onClose, onReward }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showWisdom, setShowWisdom] = useState(false);

  const currentLetter = HUDHUD_ALL_LETTERS[selectedIdx];
  const isAnswered = answers[currentLetter.id] !== undefined;
  const chosenOption = answers[currentLetter.id];

  const handlePlayAudio = () => {
    sound.speakArabic(currentLetter.arText);
  };

  const handleSelectOption = (optIdx: number) => {
    if (isAnswered) return;
    setAnswers(prev => ({ ...prev, [currentLetter.id]: optIdx }));

    if (currentLetter.options[optIdx].correct) {
      sound.playSuccess();
      sound.playSparkle();
      setShowWisdom(true);
      GameStorage.addReward(40, 2, 'qiraah', 5);
      onReward(40, 2);
    } else {
      sound.playGentleRetry();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/70 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-lg bg-gradient-to-b from-amber-50 via-yellow-50 to-orange-50 rounded-3xl shadow-2xl border-4 border-amber-300 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600 text-white p-4 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-xl shadow-xs">
              💌
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-200 block">
                Perpustakaan Qira'ah • Warkat Sahabat
              </span>
              <h2 className="text-lg font-bold font-chibi">Surat Harian dari Hudhud</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white font-bold transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Letters Carousel Ribbon */}
        <div className="bg-amber-100/90 p-2 border-b border-amber-200 flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs font-bold">
          {HUDHUD_ALL_LETTERS.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                setSelectedIdx(idx);
                setShowWisdom(false);
              }}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                selectedIdx === idx
                  ? 'bg-rose-600 text-white font-black shadow-xs'
                  : 'bg-white/70 text-slate-700 hover:bg-white'
              }`}
            >
              <span>{answers[item.id] !== undefined ? '⭐' : '✉️'}</span>
              <span>Surat {item.id} (J{item.id - 1})</span>
            </button>
          ))}
        </div>

        {/* Letter Scroll Paper */}
        <div className="p-4 flex-1 flex flex-col overflow-y-auto space-y-3.5">
          {/* Header Info */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-black text-white px-2.5 py-0.5 rounded-full ${currentLetter.islandBg}`}>
                {currentLetter.islandOrigin}
              </span>
              <span className="text-[10px] font-bold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-full">
                {currentLetter.levelBadge}
              </span>
            </div>

            <button
              onClick={handlePlayAudio}
              className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
              title="Dengarkan pembacaan surat"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Dengar Audio Surat</span>
            </button>
          </div>

          {/* Letter Body Paper */}
          <div className="bg-amber-100/80 rounded-2xl p-4 border-2 border-amber-300 shadow-inner relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-amber-900 flex items-center gap-1">
                <Feather className="w-3.5 h-3.5 text-amber-700" />
                {currentLetter.date}
              </span>
              <span className="text-xs font-black text-amber-800">
                "{currentLetter.title}"
              </span>
            </div>

            {/* Arabic Text with Vocalized Font */}
            <p className="font-arabic text-xl font-bold text-slate-900 text-right leading-loose mb-3 bg-white/90 p-3.5 rounded-xl border border-amber-200 shadow-2xs">
              {currentLetter.arText}
            </p>

            <p className="text-xs text-slate-700 italic bg-amber-200/60 p-2.5 rounded-xl border border-amber-300/40 leading-relaxed">
              "{currentLetter.translation}"
            </p>
          </div>

          {/* Comprehension Quiz Card */}
          <div className="bg-white rounded-2xl p-3.5 border border-amber-200 shadow-xs">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Tantangan Pemahaman Bacaan:
            </h4>
            <p className="text-sm font-bold text-slate-900 mb-3">{currentLetter.question}</p>

            <div className="space-y-2">
              {currentLetter.options.map((opt, idx) => {
                const isSelected = chosenOption === idx;
                let btnStyle = 'border-amber-200 bg-amber-50/50 hover:border-amber-400 text-slate-800';
                if (isAnswered) {
                  if (opt.correct) {
                    btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                  } else if (isSelected) {
                    btnStyle = 'border-rose-400 bg-rose-50 text-rose-900';
                  } else {
                    btnStyle = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isAnswered}
                    className={`w-full p-3 rounded-xl border-2 text-left text-xs font-medium transition-all cursor-pointer ${btnStyle}`}
                  >
                    {opt.text}
                  </button>
                );
              })}
            </div>

            {/* Wisdom Reveal upon answering */}
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 p-3 rounded-xl bg-gradient-to-r from-amber-100 to-yellow-100 border border-amber-300 text-xs text-amber-950 font-medium flex items-start gap-2"
              >
                <span className="text-base">💡</span>
                <div>
                  <span className="font-black text-amber-900 block">Hikmah Harian Hudhud:</span>
                  <span>{currentLetter.wisdom}</span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Bottom Actions */}
          <div className="mt-auto pt-2 flex items-center justify-between gap-2">
            <button
              onClick={() => {
                setSelectedIdx(prev => Math.max(0, prev - 1));
                setShowWisdom(false);
              }}
              disabled={selectedIdx === 0}
              className="px-3.5 py-2.5 rounded-xl border border-amber-300 text-amber-900 text-xs font-bold hover:bg-amber-100 disabled:opacity-40 transition-all flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              Surat Sebelumnya
            </button>

            {selectedIdx < HUDHUD_ALL_LETTERS.length - 1 ? (
              <button
                onClick={() => {
                  setSelectedIdx(prev => Math.min(HUDHUD_ALL_LETTERS.length - 1, prev + 1));
                  setShowWisdom(false);
                }}
                className="px-4 py-2.5 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white rounded-xl font-bold text-xs shadow-md active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
              >
                Surat Berikutnya
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-md active:scale-95 transition-all cursor-pointer"
              >
                Tutup & Simpan
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
