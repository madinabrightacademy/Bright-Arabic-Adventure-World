import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Mic, MicOff, MessageSquare, Award, ArrowRight, CheckCircle2 } from 'lucide-react';
import { sound } from '../../services/sound';
import { GameStorage } from '../../services/storage';
import { DIALOGUES_DATA } from '../../data/curriculum';

interface DialogQuestProps {
  onClose: () => void;
  onReward: (xp: number, stars: number) => void;
}

export const DialogQuestGame: React.FC<DialogQuestProps> = ({ onClose, onReward }) => {
  const [selectedScenarioKey, setSelectedScenarioKey] = useState<string>('greeting_market');
  const dialogNodes = DIALOGUES_DATA[selectedScenarioKey] || DIALOGUES_DATA.greeting_market;
  const [currentNodeId, setCurrentNodeId] = useState(dialogNodes[0].id);
  const [history, setHistory] = useState<{ speaker: string; text: string; isUser?: boolean }[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentNode = dialogNodes.find(n => n.id === currentNodeId) || dialogNodes[0];

  const handleSwitchScenario = (key: string) => {
    setSelectedScenarioKey(key);
    const nodes = DIALOGUES_DATA[key];
    if (nodes && nodes.length > 0) {
      setCurrentNodeId(nodes[0].id);
    }
    setHistory([]);
    setFeedback(null);
    setIsCompleted(false);
  };

  const handlePlayAudio = (text: string) => {
    sound.speakArabic(text);
  };

  const handleSelectChoice = (choice: { ar: string; translit: string; id_translation: string; score: number; feedback?: string; nextId?: string }) => {
    sound.speakArabic(choice.ar);
    if (choice.feedback) {
      sound.playGentleRetry();
      setFeedback(choice.feedback);
    } else {
      sound.playSuccess();
      setFeedback(null);
    }

    setHistory(prev => [
      ...prev,
      { speaker: currentNode.speakerName, text: currentNode.ar },
      { speaker: 'Kamu', text: choice.ar, isUser: true }
    ]);

    if (choice.nextId) {
      setCurrentNodeId(choice.nextId);
    } else {
      // Completed conversation
      setIsCompleted(true);
      GameStorage.addReward(60, 3, 'lisan', 10);
      onReward(60, 3);
    }
  };

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      // Simulate 2 seconds voice recording
      setTimeout(() => {
        setIsRecording(false);
        sound.playSparkle();
      }, 2500);
    } else {
      setIsRecording(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-lg bg-emerald-50 rounded-3xl shadow-2xl border-4 border-emerald-300 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20">Kampung Hiwar (HWR)</span>
              <span className="text-xs bg-amber-300 text-amber-950 font-extrabold px-2 py-0.5 rounded-full">Trait Lisan +10</span>
            </div>
            <h2 className="text-xl font-bold font-chibi flex items-center gap-2 mt-1">
              💬 Dialog Quest: Petualangan Percakapan
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white font-bold transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Scenario Switcher */}
        <div className="bg-emerald-100/80 p-2 border-b border-emerald-200 flex items-center gap-1.5 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => handleSwitchScenario('greeting_market')}
            className={`px-3 py-1 rounded-xl whitespace-nowrap transition-all ${
              selectedScenarioKey === 'greeting_market' ? 'bg-emerald-700 text-white shadow-xs' : 'text-emerald-950 hover:bg-emerald-200'
            }`}
          >
            🥖 Di Toko Roti
          </button>
          <button
            onClick={() => handleSwitchScenario('meet_friend')}
            className={`px-3 py-1 rounded-xl whitespace-nowrap transition-all ${
              selectedScenarioKey === 'meet_friend' ? 'bg-emerald-700 text-white shadow-xs' : 'text-emerald-950 hover:bg-emerald-200'
            }`}
          >
            🤝 Kenalan Sahabat Baru
          </button>
          <button
            onClick={() => handleSwitchScenario('direction_mosque')}
            className={`px-3 py-1 rounded-xl whitespace-nowrap transition-all ${
              selectedScenarioKey === 'direction_mosque' ? 'bg-emerald-700 text-white shadow-xs' : 'text-emerald-950 hover:bg-emerald-200'
            }`}
          >
            🕌 Tanya Arah ke Masjid
          </button>
          <button
            onClick={() => handleSwitchScenario('cafe_order')}
            className={`px-3 py-1 rounded-xl whitespace-nowrap transition-all ${
              selectedScenarioKey === 'cafe_order' ? 'bg-emerald-700 text-white shadow-xs' : 'text-emerald-950 hover:bg-emerald-200'
            }`}
          >
            🫖 Di Kedai Kurma
          </button>
          <button
            onClick={() => handleSwitchScenario('doctor_clinic')}
            className={`px-3 py-1 rounded-xl whitespace-nowrap transition-all ${
              selectedScenarioKey === 'doctor_clinic' ? 'bg-emerald-700 text-white shadow-xs' : 'text-emerald-950 hover:bg-emerald-200'
            }`}
          >
            🩺 Di Klinik Dokter
          </button>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col overflow-y-auto">
          {!isCompleted ? (
            <>
              {/* NPC Presentation */}
              <div className="bg-white rounded-2xl p-4 border border-emerald-200 shadow-sm mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">👳‍♂️</span>
                    <div>
                      <h4 className="font-bold text-sm text-slate-800">{currentNode.speakerName}</h4>
                      <span className="text-[11px] text-emerald-700 font-semibold">Warga Kampung Hiwar</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handlePlayAudio(currentNode.ar)}
                    className="w-9 h-9 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-md active:scale-95 transition-all"
                    title="Dengarkan suara penutur asli"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Speech Bubble */}
                <div className="bg-emerald-50/70 p-3.5 rounded-2xl border border-emerald-100">
                  <p className="font-arabic text-xl font-bold text-slate-900 text-right leading-relaxed mb-1">
                    {currentNode.ar}
                  </p>
                  <p className="text-xs text-slate-600 font-medium italic">
                    "{currentNode.id_translation}"
                  </p>
                </div>
              </div>

              {/* Feedback note if any */}
              {feedback && (
                <div className="bg-amber-100 text-amber-950 text-xs p-3 rounded-2xl mb-3 border border-amber-300">
                  💡 {feedback}
                </div>
              )}

              {/* Choices / Response Options */}
              <div className="mt-auto">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-emerald-900">Pilih respons yang santun & tepat:</span>
                  <button
                    onClick={toggleRecording}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                      isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-emerald-200 text-emerald-900 hover:bg-emerald-300'
                    }`}
                  >
                    {isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                    {isRecording ? 'Merekam ucapanmu...' : 'Mode Latihan Bicara'}
                  </button>
                </div>

                <div className="space-y-2">
                  {currentNode.choices.map((choice, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => handleSelectChoice(choice)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full text-left p-3.5 rounded-2xl border-2 border-emerald-300 bg-white hover:border-emerald-500 hover:bg-emerald-50/50 shadow-sm transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-arabic text-lg font-bold text-slate-800 text-right w-full block">
                          {choice.ar}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-1 text-xs text-slate-500">
                        <span className="font-medium">{choice.translit}</span>
                        <span className="text-emerald-700 italic">"{choice.id_translation}"</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 my-auto">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3 animate-bounce">
                <Award className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold font-chibi text-slate-800">Hiwar Berhasil Diselesaikan!</h3>
              <p className="text-sm text-slate-600 mt-2 max-w-sm">
                Kamu telah menyapa dan berbelanja dengan etika serta kesantunan percakapan Arab yang luhur. Trait Lisan Hudhud meningkat!
              </p>
              <div className="flex items-center gap-2 mt-4 bg-emerald-100 text-emerald-900 font-bold px-4 py-2 rounded-2xl text-sm">
                <span>+60 XP</span> • <span>+3 Bintang</span> • <span>Trait Lisan +10</span>
              </div>
              <button
                onClick={onClose}
                className="mt-6 w-full max-w-xs py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-2xl shadow-lg active:scale-95 transition-all"
              >
                Kembali ke Kampung Hiwar
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
