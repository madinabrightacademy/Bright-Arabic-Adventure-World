import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Mic, MicOff, MessageSquare, Award, ArrowRight, CheckCircle2 } from 'lucide-react';
import { sound } from '../../services/sound';
import { GameStorage } from '../../services/storage';
import { DIALOGUES_DATA } from '../../data/curriculum';
import { GameShell, GameFlowState } from './GameShell';

interface DialogQuestProps {
  onClose: () => void;
  onReward: (xp: number, stars: number) => void;
}

export const DialogQuestGame: React.FC<DialogQuestProps> = ({ onClose, onReward }) => {
  const [flowState, setFlowState] = useState<GameFlowState>('BRIEFING');
  const [selectedScenarioKey, setSelectedScenarioKey] = useState<string>('greeting_market');
  const dialogNodes = DIALOGUES_DATA[selectedScenarioKey] || DIALOGUES_DATA.greeting_market;
  const [currentNodeId, setCurrentNodeId] = useState(dialogNodes[0].id);
  const [history, setHistory] = useState<{ speaker: string; text: string; isUser?: boolean }[]>([]);
  const [score, setScore] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [mascotMood, setMascotMood] = useState<'happy' | 'cheer' | 'thinking' | 'celebrate'>('happy');
  const [mascotComment, setMascotComment] = useState('Pilih jawaban dialog yang sopan dan fasih!');

  const currentNode = dialogNodes.find(n => n.id === currentNodeId) || dialogNodes[0];

  const handleSwitchScenario = (key: string) => {
    sound.playPop();
    setSelectedScenarioKey(key);
    const nodes = DIALOGUES_DATA[key];
    if (nodes && nodes.length > 0) {
      setCurrentNodeId(nodes[0].id);
    }
    setHistory([]);
    setFeedback(null);
  };

  const handlePlayAudio = (text: string) => {
    sound.speakArabic(text);
  };

  const handleSelectChoice = (choice: { ar: string; translit: string; id_translation: string; score: number; feedback?: string; nextId?: string }) => {
    const isAccurate = choice.score > 0 && !choice.feedback;
    if (isAccurate) {
      sound.playSuccess();
      setFeedback(null);
      setScore(s => s + 1);
      setMascotMood('celebrate');
      setMascotComment('Mumtaz! Jawaban percakapanmu sangat santun dan tepat!');
    } else {
      sound.playGentleRetry();
      setFeedback(choice.feedback || 'Pilihan respon kurang tepat atau kurang santun.');
      setMascotMood('thinking');
      setMascotComment(choice.feedback || 'Pilihlah kalimat yang lebih sopan dan sesuai adab.');
    }

    setHistory(prev => [
      ...prev,
      { speaker: currentNode.speakerName, text: currentNode.ar },
      { speaker: 'Kamu', text: choice.ar, isUser: true }
    ]);

    if (choice.nextId) {
      setTimeout(() => {
        setCurrentNodeId(choice.nextId!);
        setMascotMood('happy');
        setMascotComment('Dengarkan respon teman bicaramu!');
      }, 900);
    } else {
      // Completed conversation
      setTimeout(() => {
        setFlowState('VICTORY');
      }, 1200);
    }
  };

  const handleTalqinPractice = () => {
    sound.speakArabic(currentNode.ar);
    sound.playSparkle();
    setMascotMood('cheer');
    setMascotComment('Dengarkan lafal fusha penutur asli, lalu tirukan dengan santun dan lantang!');
  };

  return (
    <GameShell
      title="Petualangan Dialog Percakapan"
      titleAr="مُغَامَرَةُ الحِوَارِ العَرَبِيِّ"
      islandName="Pulau Hiwar"
      islandColor="from-emerald-600 via-teal-600 to-emerald-800"
      gameIcon="💬"
      targetObjective="Pilih respon dan adab komunikasi bahasa Arab fusha dalam skenario percakapan nyata"
      howToPlay={[
        { icon: '👂', text: 'Dengarkan perkataan penutur asli dalam bahasa Arab.' },
        { icon: '🗣️', text: 'Pilih pilihan respon yang sesuai dengan adab dan tata bahasa yang tepat.' },
        { icon: '🎙️', text: 'Gunakan tombol mic untuk merekam dan melatih kelancaran pelafalanmu!' }
      ]}
      speechArabic="تَحَدَّثْ بِاللُّغَةِ العَرَبِيَّةِ بِكُلِّ ثِقَةٍ!"
      speechIntro="Mari berlatih hiwar seru di Kampung Percakapan Pulau Hiwar!"
      flowState={flowState}
      onStartGame={() => {
        setFlowState('PLAYING');
        setHistory([]);
        setFeedback(null);
        handlePlayAudio(currentNode.ar);
      }}
      onPlayAgain={() => {
        setFlowState('PLAYING');
        const nodes = DIALOGUES_DATA[selectedScenarioKey] || DIALOGUES_DATA.greeting_market;
        setCurrentNodeId(nodes[0].id);
        setHistory([]);
        setFeedback(null);
      }}
      onClose={onClose}
      onReward={onReward}
      rewardTrait="lisan"
      traitPoints={10}
      currentRound={history.length / 2 + 1}
      totalRounds={dialogNodes.length}
      score={score}
      maxScore={dialogNodes.length}
      starsEarned={score >= dialogNodes.length * 0.8 ? 3 : score >= dialogNodes.length * 0.5 ? 2 : 1}
      xpEarned={Math.max(25, score * 20)}
      mascotMood={mascotMood}
      mascotComment={mascotComment}
      mascotArabic="حِوَارٌ"
      onPlayTitleAudio={() => handlePlayAudio(currentNode.ar)}
      victorySummary={[
        { label: 'Skenario Tuntas', value: selectedScenarioKey === 'greeting_market' ? 'Di Toko Roti' : 'Bertemu Teman' },
        { label: 'Giliran Dialog', value: `${history.length} Pertukaran` },
        { label: 'Kecakapan Adab', value: '⭐⭐⭐ Santun' },
        { label: 'Kelancaran Lisan', value: '+10 Poin Lisan' }
      ]}
    >
      {/* Scenario Selector Pills */}
      <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-emerald-200/80 overflow-x-auto text-xs">
        <button
          onClick={() => handleSwitchScenario('greeting_market')}
          className={`px-3 py-1 rounded-xl font-bold whitespace-nowrap transition-all ${
            selectedScenarioKey === 'greeting_market'
              ? 'bg-emerald-700 text-white font-black shadow-xs ring-1 ring-emerald-400'
              : 'bg-emerald-50 text-emerald-950 border border-emerald-200'
          }`}
        >
          🥖 Di Toko Roti
        </button>
        <button
          onClick={() => handleSwitchScenario('meet_friend')}
          className={`px-3 py-1 rounded-xl font-bold whitespace-nowrap transition-all ${
            selectedScenarioKey === 'meet_friend'
              ? 'bg-emerald-700 text-white font-black shadow-xs ring-1 ring-emerald-400'
              : 'bg-emerald-50 text-emerald-950 border border-emerald-200'
          }`}
        >
          🤝 Bertemu Sahabat
        </button>
        <button
          onClick={() => handleSwitchScenario('school_library')}
          className={`px-3 py-1 rounded-xl font-bold whitespace-nowrap transition-all ${
            selectedScenarioKey === 'school_library'
              ? 'bg-emerald-700 text-white font-black shadow-xs ring-1 ring-emerald-400'
              : 'bg-emerald-50 text-emerald-950 border border-emerald-200'
          }`}
        >
          📚 Perpustakaan
        </button>
      </div>

      {/* Dialogue Chat History */}
      <div className="flex-1 overflow-y-auto space-y-2 p-2 bg-slate-50/70 border border-emerald-200 rounded-2xl min-h-[140px] max-h-[220px]">
        {history.map((msg, i) => (
          <div
            key={i}
            className={`flex flex-col ${msg.isUser ? 'items-end' : 'items-start'}`}
          >
            <span className="text-[10px] text-slate-500 font-bold mb-0.5">{msg.speaker}</span>
            <div
              className={`p-2.5 rounded-2xl max-w-[85%] text-xs font-bold leading-relaxed ${
                msg.isUser
                  ? 'bg-emerald-600 text-white font-arabic text-sm'
                  : 'bg-white text-slate-800 border border-slate-200 font-arabic text-sm'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {/* Current Speaker Bubble */}
        <div className="flex flex-col items-start pt-1">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="w-6 h-6 rounded-full bg-emerald-200 flex items-center justify-center text-xs">
              👳‍♂️
            </span>
            <span className="text-xs font-black text-emerald-900">{currentNode.speakerName}</span>
            <button
              type="button"
              onClick={() => handlePlayAudio(currentNode.ar)}
              className="p-1 rounded-full bg-white hover:bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-2xs"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="bg-white border-2 border-emerald-300 rounded-2xl p-3 shadow-xs max-w-[90%]">
            <p className="font-arabic text-xl font-black text-slate-900 leading-snug">
              {currentNode.ar}
            </p>
            <p className="text-xs text-slate-600 italic mt-1">
              "{currentNode.id_translation}"
            </p>
          </div>
        </div>
      </div>

      {/* Branching Response Choices */}
      <div className="pt-3 space-y-2">
        <span className="text-[11px] font-bold text-slate-600 block">
          Pilih Jawaban Balasanmu:
        </span>
        <div className="space-y-1.5">
          {currentNode.choices.map((choice, idx) => (
            <motion.button
              key={idx}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelectChoice(choice)}
              className="w-full p-2.5 rounded-2xl bg-white hover:bg-emerald-50/80 border-2 border-emerald-200 hover:border-emerald-400 text-left transition-all shadow-xs cursor-pointer flex items-center justify-between gap-3"
            >
              <div>
                <span className="font-arabic text-base sm:text-lg font-black text-emerald-900 block leading-tight">
                  {choice.ar}
                </span>
                <span className="text-xs text-slate-600 block mt-0.5">
                  "{choice.id_translation}"
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-emerald-600 shrink-0" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Voice Practice Button */}
      <div className="pt-2 flex items-center justify-between">
        <span className="text-[11px] text-slate-500 font-semibold">
          Latihan Talqin (Simak & Tirukan):
        </span>
        <button
          type="button"
          onClick={handleTalqinPractice}
          className="px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer bg-emerald-100 hover:bg-emerald-200 text-emerald-950 border border-emerald-300 shadow-2xs active:scale-95"
        >
          <Volume2 className="w-3.5 h-3.5 text-emerald-700" />
          <span>Talqin Kalimat Ini</span>
        </button>
      </div>
    </GameShell>
  );
};
