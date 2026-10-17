import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Award, Sparkles, Mic, MicOff, Camera, ArrowRight, ShieldCheck } from 'lucide-react';
import { REAL_WORLD_MISSIONS } from '../data/curriculum';
import { sound } from '../services/sound';
import { GameStorage } from '../services/storage';
import { UserProfile } from '../types/game';

interface RealWorldMissionsProps {
  profile: UserProfile;
  onClose: () => void;
  onReward: (xp: number, stars: number) => void;
}

export const RealWorldMissionsModal: React.FC<RealWorldMissionsProps> = ({ profile, onClose, onReward }) => {
  const [completedMissions, setCompletedMissions] = useState<number[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [activeRecordingIdx, setActiveRecordingIdx] = useState<number | null>(null);

  const handleToggleRecord = (idx: number) => {
    if (activeRecordingIdx === idx && isRecording) {
      setIsRecording(false);
      setActiveRecordingIdx(null);
    } else {
      setActiveRecordingIdx(idx);
      setIsRecording(true);
      setTimeout(() => {
        setIsRecording(false);
        sound.playSparkle();
      }, 2500);
    }
  };

  const handleCompleteMission = (mission: typeof REAL_WORLD_MISSIONS[0], idx: number) => {
    if (!completedMissions.includes(idx)) {
      sound.playSuccess();
      sound.playFanfare();
      setCompletedMissions(prev => [...prev, idx]);
      GameStorage.addReward(mission.xpReward, mission.starsReward, 'lisan', 12);
      onReward(mission.xpReward, mission.starsReward);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-lg bg-amber-50 rounded-3xl shadow-2xl border-4 border-amber-300 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-yellow-300" />
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-200 block">Kuil Langit Adib Agung • Tingkat Mahir Sempurna</span>
              <h2 className="text-xl font-bold font-chibi">Misi Dunia Nyata Terpadu</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white font-bold transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Missions List */}
        <div className="p-4 flex-1 overflow-y-auto space-y-3.5">
          <p className="text-xs text-amber-900 bg-amber-100 p-2.5 rounded-2xl border border-amber-300 leading-relaxed">
            🛡️ <strong>Aman & Ramah Keluarga:</strong> Misi dipraktikkan bersama orang tua di rumah tanpa memerlukan interaksi dengan orang asing. Rekaman suara tersimpan lokal di perangkat.
          </p>

          {REAL_WORLD_MISSIONS.map((m, idx) => {
            const isDone = completedMissions.includes(idx);
            const isThisRecording = activeRecordingIdx === idx && isRecording;

            return (
              <div
                key={idx}
                className={`p-4 rounded-3xl border-2 transition-all shadow-xs ${
                  isDone
                    ? 'bg-emerald-50 border-emerald-300'
                    : 'bg-white border-amber-200 hover:border-amber-400'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-[10px] font-black uppercase text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                      Jenjang {m.level}
                    </span>
                    <h4 className="font-bold text-sm text-slate-800 mt-1">{m.title}</h4>
                  </div>
                  <span className="text-xs bg-amber-400 text-amber-950 font-black px-2 py-0.5 rounded-full shrink-0">
                    +{m.xpReward} XP
                  </span>
                </div>

                <p className="text-xs text-slate-600 mb-3">{m.desc}</p>

                {/* Sample items prompt */}
                <div className="bg-amber-50/70 p-2.5 rounded-xl border border-amber-200 mb-3 text-xs">
                  <span className="font-bold text-slate-700 block mb-1">Contoh Praktik:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {m.sampleItems.map((item, itemIdx) => (
                      <span key={itemIdx} className="bg-white px-2 py-0.5 rounded-lg border border-amber-300 text-amber-950 font-semibold text-[11px]">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleRecord(idx)}
                    className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 ${
                      isThisRecording
                        ? 'bg-red-500 text-white animate-pulse'
                        : 'bg-amber-100 hover:bg-amber-200 text-amber-900'
                    }`}
                  >
                    {isThisRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                    {isThisRecording ? 'Merekam Suara...' : 'Latihan Rekam'}
                  </button>

                  <button
                    onClick={() => handleCompleteMission(m, idx)}
                    disabled={isDone}
                    className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-95 ${
                      isDone
                        ? 'bg-emerald-600 text-white cursor-default'
                        : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black'
                    }`}
                  >
                    {isDone ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" /> Misi Selesai!
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" /> Selesaikan Misi
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
