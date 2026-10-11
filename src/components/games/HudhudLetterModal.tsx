import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Volume2, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { sound } from '../../services/sound';
import { GameStorage } from '../../services/storage';

interface HudhudLetterProps {
  onClose: () => void;
  onReward: (xp: number, stars: number) => void;
}

export const HudhudLetterModal: React.FC<HudhudLetterProps> = ({ onClose, onReward }) => {
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);

  const letterData = {
    date: 'Hari ke-4 di Kepulauan Brightoria',
    arText: 'صَبَاحَ الخَيْرِ يَا صَدِيقِي العَزِيز! أَنَا أَطِيرُ فَوْقَ سُوقِ المُفْرَدَاتِ وَرَأَيْتُ الخُبْزَ وَالمَاءَ. هَلْ أَنْتَ مُسْتَعِدٌّ لِمُغَامَرَةِ اليَوْمِ؟',
    translit: 'Ṣabāḥa l-khayri yā ṣadīqī l-ʿazīz! Anā aṭīru fawqa sūqi l-mufradāti wa-raʾaytu l-khubza wa-l-māʾ. Hal anta mustaʿiddun li-mughāmarati l-yawm?',
    translation: 'Selamat pagi wahai sahabat karibku! Aku sedang terbang di atas Pasar Mufradat dan melihat roti hangat serta air segar. Apakah engkau siap untuk petualangan hari ini?',
    question: 'Di manakah Hudhud sedang terbang menyapa sahabatnya?',
    options: [
      { text: 'Di atas Pasar Mufradat (سُوقُ المُفْرَدَات)', correct: true },
      { text: 'Di dalam Gua Lembah Istima\'', correct: false },
      { text: 'Di puncak Gunung Salju', correct: false },
    ]
  };

  const handlePlayAudio = () => {
    sound.speakArabic(letterData.arText);
  };

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOpt(idx);
    setIsAnswered(true);

    if (letterData.options[idx].correct) {
      sound.playSuccess();
      GameStorage.addReward(30, 2, 'qiraah', 5);
      onReward(30, 2);
    } else {
      sound.playGentleRetry();
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
        <div className="bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-amber-200" />
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-rose-200 block">Perpustakaan Qira'ah</span>
              <h2 className="text-xl font-bold font-chibi">Surat dari Hudhud</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white font-bold transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Letter Scroll Paper */}
        <div className="p-4 flex-1 flex flex-col overflow-y-auto">
          <div className="bg-amber-100/90 rounded-2xl p-4 border-2 border-amber-300 shadow-inner relative mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
                🪶 Dari Sahabatmu, Hudhud • {letterData.date}
              </span>
              <button
                onClick={handlePlayAudio}
                className="w-8 h-8 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow-md active:scale-95 transition-all"
                title="Dengarkan pembacaan surat"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {/* Arabic Text */}
            <p className="font-arabic text-xl font-bold text-slate-800 text-right leading-loose mb-3 bg-white/70 p-3 rounded-xl border border-amber-200">
              {letterData.arText}
            </p>

            <p className="text-xs text-slate-600 italic bg-amber-200/50 p-2.5 rounded-xl border border-amber-300/40">
              "{letterData.translation}"
            </p>
          </div>

          {/* Question from Hudhud */}
          <div className="bg-white rounded-2xl p-3.5 border border-amber-200 shadow-xs mb-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Pertanyaan Pemahaman:
            </h4>
            <p className="text-sm font-bold text-slate-800 mb-3">{letterData.question}</p>

            <div className="space-y-2">
              {letterData.options.map((opt, idx) => {
                const isSelected = selectedOpt === idx;
                let btnStyle = 'border-amber-200 bg-amber-50/50 hover:border-amber-400';
                if (isAnswered) {
                  if (opt.correct) {
                    btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                  } else if (isSelected) {
                    btnStyle = 'border-rose-400 bg-rose-50 text-rose-900';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    disabled={isAnswered}
                    className={`w-full p-3 rounded-xl border-2 text-left text-xs font-medium transition-all ${btnStyle}`}
                  >
                    {opt.text}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-auto">
            <button
              onClick={onClose}
              className="w-full py-3 bg-gradient-to-r from-rose-600 to-amber-600 text-white rounded-2xl font-bold text-sm shadow-md active:scale-95 transition-all"
            >
              Simpan Surat ke Peti Kenangan
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
