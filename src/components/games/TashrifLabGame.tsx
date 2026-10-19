import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cog, Volume2, Award, Sparkles, ArrowRight, CheckCircle2, RotateCcw, BookOpen, Layers } from 'lucide-react';
import { sound } from '../../services/sound';
import { GameStorage } from '../../services/storage';
import { GameShell, GameFlowState } from './GameShell';

interface TashrifLabProps {
  onClose: () => void;
  onReward: (xp: number, stars: number) => void;
}

interface VerbConjugationItem {
  pronoun: string;
  pronounLabel: string;
  meaning: string;
  madhi: string;
  mudhari: string;
  prefixMudhari: string;
  suffixMadhi: string;
  grammarNote: string;
}

interface TashrifRootData {
  root: string;
  rootPlain: string;
  meaningId: string;
  wazan: string;
  conjugations: VerbConjugationItem[];
}

export const COMPREHENSIVE_TASHRIF_ROOTS: TashrifRootData[] = [
  {
    root: 'ك - ت - ب',
    rootPlain: 'كتب',
    meaningId: 'Menulis',
    wazan: 'فَعَلَ - يَفْعُلُ (Bab 1 / Nasara-Yansuru)',
    conjugations: [
      { pronoun: 'هُوَ (Huwa)', pronounLabel: 'Dia (L)', meaning: 'Dia telah/sedang menulis', madhi: 'كَتَبَ', mudhari: 'يَكْتُبُ', prefixMudhari: 'يَـ', suffixMadhi: 'َ', grammarNote: 'Fi\'il dasar tanpa imbuhan pada madhi, awalan Ya pada mudhari\'.' },
      { pronoun: 'هِيَ (Hiya)', pronounLabel: 'Dia (P)', meaning: 'Dia (P) telah/sedang menulis', madhi: 'كَتَبَتْ', mudhari: 'تَكْتُبُ', prefixMudhari: 'تَـ', suffixMadhi: 'ـتْ', grammarNote: 'Ta ta\'nits sakinah (ـتْ) pada madhi, awalan Ta pada mudhari\'.' },
      { pronoun: 'أَنْتَ (Anta)', pronounLabel: 'Kamu (L)', meaning: 'Kamu (L) telah/sedang menulis', madhi: 'كَتَبْتَ', mudhari: 'تَكْتُبُ', prefixMudhari: 'تَـ', suffixMadhi: 'ـتَ', grammarNote: 'Ta mutaharrikah (ـتَ) pada madhi, awalan Ta pada mudhari\'.' },
      { pronoun: 'أَنْتِ (Anti)', pronounLabel: 'Kamu (P)', meaning: 'Kamu (P) telah/sedang menulis', madhi: 'كَتَبْتِ', mudhari: 'تَكْتُبِينَ', prefixMudhari: 'تَـ', suffixMadhi: 'ـتِ', grammarNote: 'Ta kasrah (ـتِ) pada madhi, ya mukhatabah + nun (ـِينَ) pada mudhari\'.' },
      { pronoun: 'أَنَا (Anā)', pronounLabel: 'Saya / Aku', meaning: 'Saya telah/sedang menulis', madhi: 'كَتَبْتُ', mudhari: 'أَكْتُبُ', prefixMudhari: 'أَ', suffixMadhi: 'ـتُ', grammarNote: 'Ta dhommah (ـتُ) pada madhi, awalan Hamzah (أَ) pada mudhari\'.' },
      { pronoun: 'نَحْنُ (Naḥnu)', pronounLabel: 'Kami / Kita', meaning: 'Kami telah/sedang menulis', madhi: 'كَتَبْنَا', mudhari: 'نَكْتُبُ', prefixMudhari: 'نَـ', suffixMadhi: 'ـنَا', grammarNote: 'Na fa\'ilin (ـنَا) pada madhi, awalan Nun (نَـ) pada mudhari\'.' },
    ]
  },
  {
    root: 'ق - ر - أ',
    rootPlain: 'قرأ',
    meaningId: 'Membaca',
    wazan: 'فَعَلَ - يَفْعَلُ (Bab 3 / Fataha-Yaftahu)',
    conjugations: [
      { pronoun: 'هُوَ (Huwa)', pronounLabel: 'Dia (L)', meaning: 'Dia telah/sedang membaca', madhi: 'قَرَأَ', mudhari: 'يَقْرَأُ', prefixMudhari: 'يَـ', suffixMadhi: 'َ', grammarNote: 'Akar kata dengan hamzah mutatharrifah di atas alif.' },
      { pronoun: 'هِيَ (Hiya)', pronounLabel: 'Dia (P)', meaning: 'Dia (P) telah/sedang membaca', madhi: 'قَرَأَتْ', mudhari: 'تَقْرَأُ', prefixMudhari: 'تَـ', suffixMadhi: 'ـتْ', grammarNote: 'Ta ta\'nits sakinah penanda subjek feminin tunggal.' },
      { pronoun: 'أَنْتَ (Anta)', pronounLabel: 'Kamu (L)', meaning: 'Kamu (L) telah/sedang membaca', madhi: 'قَرَأْتَ', mudhari: 'تَقْرَأُ', prefixMudhari: 'تَـ', suffixMadhi: 'ـتَ', grammarNote: 'Hamzah sukun sebelum ta mutaharrikah (ـتَ).' },
      { pronoun: 'أَنْتِ (Anti)', pronounLabel: 'Kamu (P)', meaning: 'Kamu (P) telah/sedang membaca', madhi: 'قَرَأْتِ', mudhari: 'تَقْرَئِينَ', prefixMudhari: 'تَـ', suffixMadhi: 'ـتِ', grammarNote: 'Hamzah ditulis di atas ya (ئِـ) karena berharakat kasrah.' },
      { pronoun: 'أَنَا (Anā)', pronounLabel: 'Saya / Aku', meaning: 'Saya telah/sedang membaca', madhi: 'قَرَأْتُ', mudhari: 'أَقْرَأُ', prefixMudhari: 'أَ', suffixMadhi: 'ـتُ', grammarNote: 'Hamzah awalan mudhara\'ah untuk subjek Ana (أَقْرَأُ).' },
      { pronoun: 'نَحْنُ (Naḥnu)', pronounLabel: 'Kami / Kita', meaning: 'Kami telah/sedang membaca', madhi: 'قَرَأْنَا', mudhari: 'نَقْرَأُ', prefixMudhari: 'نَـ', suffixMadhi: 'ـنَا', grammarNote: 'Awalan Nun mudhara\'ah untuk subjek Nahnu (نَقْرَأُ).' },
    ]
  },
  {
    root: 'ذ - ه - ب',
    rootPlain: 'ذهب',
    meaningId: 'Pergi',
    wazan: 'فَعَلَ - يَفْعَلُ (Bab 3 / Fataha-Yaftahu)',
    conjugations: [
      { pronoun: 'هُوَ (Huwa)', pronounLabel: 'Dia (L)', meaning: 'Dia telah/sedang pergi', madhi: 'ذَهَبَ', mudhari: 'يَذْهَبُ', prefixMudhari: 'يَـ', suffixMadhi: 'َ', grammarNote: "Madhi berharakat fathah pada 'ain fi'il (ـهَـ)." },
      { pronoun: 'هِيَ (Hiya)', pronounLabel: 'Dia (P)', meaning: 'Dia (P) telah/sedang pergi', madhi: 'ذَهَبَتْ', mudhari: 'تَذْهَبُ', prefixMudhari: 'تَـ', suffixMadhi: 'ـتْ', grammarNote: 'Awalan Ta penanda perempuan pada mudhari\'.' },
      { pronoun: 'أَنْتَ (Anta)', pronounLabel: 'Kamu (L)', meaning: 'Kamu (L) telah/sedang pergi', madhi: 'ذَهَبْتَ', mudhari: 'تَذْهَبُ', prefixMudhari: 'تَـ', suffixMadhi: 'ـتَ', grammarNote: 'Mudhari\' sama dengan Hiya (تَذْهَبُ) dibedakan konteks.' },
      { pronoun: 'أَنْتِ (Anti)', pronounLabel: 'Kamu (P)', meaning: 'Kamu (P) telah/sedang pergi', madhi: 'ذَهَبْتِ', mudhari: 'تَذْهَبِينَ', prefixMudhari: 'تَـ', suffixMadhi: 'ـتِ', grammarNote: 'Akhiran ya dan nun (ـِينَ) untuk lawan bicara perempuan.' },
      { pronoun: 'أَنَا (Anā)', pronounLabel: 'Saya / Aku', meaning: 'Saya telah/sedang pergi', madhi: 'ذَهَبْتُ', mudhari: 'أَذْهَبُ', prefixMudhari: 'أَ', suffixMadhi: 'ـتُ', grammarNote: 'Ana selalu diawali Hamzah pada mudhari\'.' },
      { pronoun: 'نَحْنُ (Naḥnu)', pronounLabel: 'Kami / Kita', meaning: 'Kami telah/sedang pergi', madhi: 'ذَهَبْنَا', mudhari: 'نَذْهَبُ', prefixMudhari: 'نَـ', suffixMadhi: 'ـنَا', grammarNote: 'Nahnu diawali Nun pada mudhari\'.' },
    ]
  }
];

export const TashrifLabGame: React.FC<TashrifLabProps> = ({ onClose, onReward }) => {
  const [flowState, setFlowState] = useState<GameFlowState>('BRIEFING');
  const [rootIdx, setRootIdx] = useState(0);
  const [tenseMode, setTenseMode] = useState<'madhi' | 'mudhari'>('mudhari');
  const [testedPronouns, setTestedPronouns] = useState<string[]>([]);
  const [mascotMood, setMascotMood] = useState<'happy' | 'cheer' | 'thinking' | 'celebrate'>('happy');
  const [mascotComment, setMascotComment] = useState('Eksplorasi rumus tashrif untuk tiap dhomir!');

  const activeRoot = COMPREHENSIVE_TASHRIF_ROOTS[rootIdx];

  const handleInspectPronoun = (item: VerbConjugationItem) => {
    const word = tenseMode === 'madhi' ? item.madhi : item.mudhari;
    sound.speakArabic(word);
    sound.playTap();

    setMascotMood('cheer');
    setMascotComment(`${item.pronoun}: ${item.grammarNote}`);

    if (!testedPronouns.includes(item.pronoun)) {
      const next = [...testedPronouns, item.pronoun];
      setTestedPronouns(next);

      if (next.length >= activeRoot.conjugations.length) {
        sound.playSuccess();
        setTimeout(() => {
          setFlowState('VICTORY');
        }, 1200);
      }
    }
  };

  return (
    <GameShell
      title="Laboratorium Tashrif Qawaid"
      titleAr="مُخْتَبَرُ التَّصْرِيفِ وَالصَّرْفِ"
      islandName="Pulau Qawaid"
      islandColor="from-blue-700 via-indigo-700 to-purple-800"
      gameIcon="⚗️"
      targetObjective="Kuasai rumus konjugasi perubahan kata kerja lampau (Madhi) dan kini (Mudhari') menurut 6 Dhomir"
      howToPlay={[
        { icon: '🌿', text: 'Pilih akar kata kerja tiga huruf (kataba, qara\'a, atau dzahaba).' },
        { icon: '⏳', text: 'Beralih antara Fi\'il Madhi (masa lampau) dan Fi\'il Mudhari\' (masa kini).' },
        { icon: '🔬', text: 'Ketuk tiap dhomir untuk mendengarkan lafal dan mengamati rumus imbuhannya!' }
      ]}
      speechArabic="اِكْتَشِفْ قَوَاعِدَ التَّصْرِيفِ وَالصَّرْفِ!"
      speechIntro="Mari bereksperimen di laboratorium sharaf Pulau Qawaid!"
      flowState={flowState}
      onStartGame={() => {
        setFlowState('PLAYING');
        setRootIdx(0);
        setTestedPronouns([]);
        sound.speakArabic(activeRoot.conjugations[0].mudhari);
      }}
      onPlayAgain={() => {
        setFlowState('PLAYING');
        setRootIdx(0);
        setTestedPronouns([]);
      }}
      onClose={onClose}
      onReward={onReward}
      rewardTrait="lughah"
      traitPoints={10}
      currentRound={testedPronouns.length + 1}
      totalRounds={activeRoot.conjugations.length}
      score={testedPronouns.length}
      maxScore={activeRoot.conjugations.length}
      starsEarned={testedPronouns.length >= 5 ? 3 : testedPronouns.length >= 3 ? 2 : 1}
      xpEarned={testedPronouns.length * 35}
      mascotMood={mascotMood}
      mascotComment={mascotComment}
      mascotArabic="تَصْرِيفٌ"
      onPlayTitleAudio={() => sound.speakArabic(activeRoot.rootPlain)}
      victorySummary={[
        { label: 'Dhomir Terkuasai', value: `${testedPronouns.length} / 6 Dhomir` },
        { label: 'Akar Kata', value: activeRoot.root },
        { label: 'Kategori Wazan', value: 'Tsulatsi Mujarrad' },
        { label: 'Ketepatan Sharaf', value: '⭐⭐⭐ Mahir' }
      ]}
    >
      {/* Root Verb Selector */}
      <div className="flex items-center justify-between gap-1.5 pb-2 mb-2 border-b border-indigo-200/80 overflow-x-auto text-xs">
        <div className="flex items-center gap-1">
          {COMPREHENSIVE_TASHRIF_ROOTS.map((r, i) => (
            <button
              key={r.root}
              onClick={() => {
                sound.playPop();
                setRootIdx(i);
                setTestedPronouns([]);
              }}
              className={`px-3 py-1 rounded-xl font-bold whitespace-nowrap transition-all ${
                rootIdx === i
                  ? 'bg-indigo-700 text-white font-black shadow-xs ring-1 ring-indigo-400'
                  : 'bg-indigo-50 text-indigo-950 border border-indigo-200'
              }`}
            >
              {r.meaningId} ({r.rootPlain})
            </button>
          ))}
        </div>

        {/* Tense Toggle (Madhi vs Mudhari) */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl shrink-0">
          <button
            type="button"
            onClick={() => {
              sound.playPop();
              setTenseMode('madhi');
            }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              tenseMode === 'madhi' ? 'bg-indigo-600 text-white font-black shadow-2xs' : 'text-slate-600'
            }`}
          >
            Madhi (Lampau)
          </button>
          <button
            type="button"
            onClick={() => {
              sound.playPop();
              setTenseMode('mudhari');
            }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              tenseMode === 'mudhari' ? 'bg-indigo-600 text-white font-black shadow-2xs' : 'text-slate-600'
            }`}
          >
            Mudhari' (Kini)
          </button>
        </div>
      </div>

      {/* Conjugation Matrix Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 my-auto">
        {activeRoot.conjugations.map((item, idx) => {
          const isInspected = testedPronouns.includes(item.pronoun);
          const word = tenseMode === 'madhi' ? item.madhi : item.mudhari;
          const marker = tenseMode === 'madhi' ? item.suffixMadhi : item.prefixMudhari;

          return (
            <motion.button
              key={idx}
              whileTap={{ scale: 0.96 }}
              onClick={() => handleInspectPronoun(item)}
              className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center justify-center text-center cursor-pointer shadow-xs ${
                isInspected
                  ? 'bg-gradient-to-b from-indigo-50 to-blue-50 border-indigo-300 ring-2 ring-indigo-200'
                  : 'bg-white hover:bg-slate-50 border-slate-200'
              }`}
            >
              <span className="text-[11px] font-black text-indigo-800 mb-0.5">
                {item.pronoun}
              </span>
              <span className="font-arabic text-2xl sm:text-3xl font-black text-slate-900 leading-none my-1">
                {word}
              </span>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-[10px] bg-indigo-100 text-indigo-900 px-2 py-0.5 rounded-full font-bold">
                  Imbuhan: {marker}
                </span>
                <Volume2 className="w-3.5 h-3.5 text-indigo-600" />
              </div>
            </motion.button>
          );
        })}
      </div>
    </GameShell>
  );
};
