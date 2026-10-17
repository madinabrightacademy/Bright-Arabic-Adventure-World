import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart,
  Volume2,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Award,
  ChevronRight,
  Shield,
  Star,
  Check
} from 'lucide-react';
import { UserProfile } from '../types/game';
import { DAILY_ADAB_CATALOG, DailyAdabItem } from '../data/adabData';
import { DailyTargetService } from '../services/dailyTargetService';
import { sound } from '../services/sound';

interface DailyAdabModalProps {
  profile: UserProfile;
  onClose: () => void;
  onUpdateProfile: (p: UserProfile) => void;
  onReward: (xp: number, stars: number) => void;
}

export const DailyAdabModal: React.FC<DailyAdabModalProps> = ({
  profile,
  onClose,
  onUpdateProfile,
  onReward
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | 'quran' | 'akhlak' | 'harian'>('ALL');
  const [activeAdabDuaId, setActiveAdabDuaId] = useState<string | null>(null);

  const completedList = profile.dailyAdabCompleted || [];

  const handleToggleAdab = (item: DailyAdabItem) => {
    const { profile: updated, newlyAdded } = DailyTargetService.toggleAdabCompleted(
      item.id,
      item.barakahPoints,
      item.xpReward
    );
    onUpdateProfile(updated);
    if (newlyAdded) {
      onReward(item.xpReward, 1);
    }
  };

  const handlePlayDua = (item: DailyAdabItem) => {
    if (!item.arabicDua) return;
    setActiveAdabDuaId(item.id);
    sound.speakArabic(item.arabicDua, 0.85);
  };

  const filteredItems = DAILY_ADAB_CATALOG.filter(item => {
    if (selectedCategory === 'ALL') return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        className="w-full max-w-xl bg-pink-50/60 rounded-[36px] shadow-2xl border-4 border-pink-400 overflow-hidden flex flex-col my-auto max-h-[96vh]"
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-pink-700 via-rose-700 to-amber-700 text-white p-5 border-b-4 border-pink-400">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-pink-300 text-slate-950 font-black text-2xl flex items-center justify-center shadow-md">
                🌟
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider bg-pink-400 text-pink-950 px-2 py-0.5 rounded-full">
                  Karakter & Akhlak Islami
                </span>
                <h2 className="text-xl font-black font-chibi mt-0.5">
                  Adab Harian Penuntut Ilmu
                </h2>
                <p className="text-xs text-pink-100">
                  Belajar Al-Qur'an dan bahasa Arab harus dihiasi adab mulia lahir dan batin
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white font-bold flex items-center justify-center transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Barakah Points Status Bar */}
          <div className="mt-4 flex items-center justify-between bg-black/25 px-3 py-2 rounded-2xl border border-white/10 text-xs font-bold">
            <div className="flex items-center gap-1.5 text-amber-300">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Poin Berkah Adab:</span>
              <span className="text-sm font-black text-white">{profile.adabBarakahPoints || 0} Berkah</span>
            </div>
            <div className="text-[11px] text-pink-200">
              {completedList.length}/{DAILY_ADAB_CATALOG.length} Diamalkan Hari Ini
            </div>
          </div>

          {/* Filter Subtabs */}
          <div className="mt-3 flex gap-1.5 text-xs font-bold">
            {[
              { id: 'ALL', label: 'Semua 10 Adab' },
              { id: 'quran', label: '📖 Adab Al-Qur\'an' },
              { id: 'akhlak', label: '🤝 Akhlak Mulia' },
              { id: 'harian', label: '☀️ Sunnah Harian' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id as any)}
                className={`flex-1 py-1 px-1.5 rounded-xl transition-all text-center ${
                  selectedCategory === tab.id
                    ? 'bg-amber-400 text-slate-950 shadow-xs font-black'
                    : 'bg-white/10 text-pink-100 hover:bg-white/20'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 space-y-3.5 overflow-y-auto">
          {filteredItems.map(item => {
            const isCompleted = completedList.includes(item.id);

            return (
              <motion.div
                key={item.id}
                whileHover={{ y: -1 }}
                className={`p-4 rounded-3xl border-2 transition-all ${
                  isCompleted
                    ? 'bg-emerald-50/90 border-emerald-300 shadow-xs'
                    : 'bg-white border-pink-200 hover:border-pink-300 shadow-2xs'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-11 h-11 rounded-2xl bg-pink-100 text-pink-900 flex items-center justify-center text-2xl shrink-0 shadow-2xs">
                      {item.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[9px] font-black uppercase text-pink-900 bg-pink-100 px-2 py-0.2 rounded-full">
                          {item.badge}
                        </span>
                        <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.2 rounded-full">
                          +{item.barakahPoints} Berkah • +{item.xpReward} XP
                        </span>
                      </div>
                      <h4 className="font-black text-sm text-slate-900 mt-0.5">
                        {item.title}
                      </h4>
                      <span className="font-arabic text-sm text-pink-800 block">
                        {item.arabicName}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleToggleAdab(item)}
                    className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all flex items-center gap-1 cursor-pointer shrink-0 ${
                      isCompleted
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-800 border border-slate-300'
                    }`}
                  >
                    {isCompleted ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Diamalkan</span>
                      </>
                    ) : (
                      <span>+ Amalkan</span>
                    )}
                  </button>
                </div>

                {/* Action Guide */}
                <p className="text-xs text-slate-700 mt-2 bg-pink-50/50 p-2.5 rounded-2xl border border-pink-100 leading-relaxed">
                  <strong>Cara Mengamalkan:</strong> {item.actionGuide}
                </p>

                {/* Arabic Dua & Audio */}
                {item.arabicDua && (
                  <div className="mt-2 p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold text-amber-900 uppercase">Lafal Doa & Dzikir:</span>
                      <button
                        onClick={() => handlePlayDua(item)}
                        className="px-2 py-0.5 bg-amber-400 hover:bg-amber-300 active:scale-95 text-amber-950 font-bold text-[10px] rounded-lg flex items-center gap-1 cursor-pointer"
                      >
                        <Volume2 className="w-3 h-3" />
                        <span>Dengarkan Audio</span>
                      </button>
                    </div>

                    <p className="font-arabic text-base font-bold text-slate-950 text-right leading-loose">
                      {item.arabicDua}
                    </p>
                    {item.translitDua && (
                      <p className="text-[11px] text-amber-950 font-medium italic mt-1">
                        "{item.translitDua}"
                      </p>
                    )}
                    {item.meaningDua && (
                      <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                        Artinya: {item.meaningDua}
                      </p>
                    )}
                  </div>
                )}

                {/* Hadits Dalil */}
                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 font-medium pt-1 border-t border-slate-100">
                  <span className="truncate mr-2">Dalil: {item.dalilHadits}</span>
                  <span className="text-[10px] text-slate-400 shrink-0 font-bold">({item.dalilSource})</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
