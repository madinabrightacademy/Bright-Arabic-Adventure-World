import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Sparkles, Heart } from 'lucide-react';
import { sound } from '../services/sound';

export type MascotType = 'zaki' | 'zayd' | 'amira' | 'maryam' | 'hudhud' | 'duo';
export type MascotMood = 'happy' | 'cheer' | 'thinking' | 'celebrate' | 'guide' | 'idle';

interface MascotCharacterProps {
  type?: MascotType;
  mood?: MascotMood;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  speechBubble?: string;
  speechArabic?: string;
  className?: string;
  interactive?: boolean;
  onTap?: () => void;
  showHudhudTogether?: boolean;
}

export const MascotCharacter: React.FC<MascotCharacterProps> = ({
  type = 'zaki',
  mood = 'happy',
  size = 'md',
  speechBubble,
  speechArabic,
  className = '',
  interactive = true,
  onTap,
  showHudhudTogether = true,
}) => {
  const [isTapped, setIsTapped] = useState(false);
  const [showHeart, setShowHeart] = useState(false);

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-24 h-24 sm:w-28 sm:h-28',
    lg: 'w-36 h-36 sm:w-44 sm:h-44',
    xl: 'w-48 h-48 sm:w-56 sm:h-56',
  };

  const handleTap = () => {
    if (!interactive) return;
    setIsTapped(true);
    setShowHeart(true);
    sound.playSparkle();

    if (speechArabic) {
      sound.speakArabic(speechArabic);
    }

    if (onTap) onTap();

    setTimeout(() => setIsTapped(false), 800);
    setTimeout(() => setShowHeart(false), 1500);
  };

  const handlePlayVoice = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (speechArabic) {
      sound.speakArabic(speechArabic);
    } else if (speechBubble) {
      sound.playSparkle();
    }
  };

  // Determine active character rendering
  const isZaki = type === 'zaki' || type === 'zayd' || type === 'duo';
  const isAmira = type === 'amira' || type === 'maryam';
  const isPureHudhud = type === 'hudhud';

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* Interactive Floating Speech Bubble (Parroto / Duolingo style) */}
      <AnimatePresence>
        {speechBubble && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="mb-2 relative z-20 max-w-xs bg-white text-slate-800 rounded-2xl px-3.5 py-2 shadow-lg border-2 border-amber-300 text-xs sm:text-sm font-bold text-center"
          >
            <div className="flex items-center justify-center gap-1.5 flex-wrap">
              {speechArabic && (
                <span className="font-arabic text-teal-800 text-base sm:text-lg font-black block w-full mb-0.5">
                  {speechArabic}
                </span>
              )}
              <span className="text-slate-700 leading-snug">{speechBubble}</span>
              {speechArabic && (
                <button
                  type="button"
                  onClick={handlePlayVoice}
                  className="p-1 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-800 transition-colors ml-1"
                  title="Dengarkan Suara"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Bubble Tail */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r-2 border-b-2 border-amber-300 rotate-45 transform" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mascot Vector SVG Container */}
      <motion.div
        whileHover={interactive ? { scale: 1.05 } : {}}
        whileTap={interactive ? { scale: 0.95 } : {}}
        animate={
          isTapped
            ? { y: [-6, 0, -10, 0], scale: [1, 1.1, 0.95, 1], rotate: [0, -6, 6, 0] }
            : mood === 'cheer' || mood === 'celebrate'
            ? { y: [0, -8, 0], rotate: [-2, 2, -2] }
            : mood === 'thinking'
            ? { rotate: [0, 4, 0] }
            : { y: [0, -4, 0] }
        }
        transition={
          isTapped
            ? { duration: 0.6 }
            : { repeat: Infinity, duration: mood === 'cheer' ? 1.4 : 3, ease: 'easeInOut' }
        }
        onClick={handleTap}
        className={`relative ${sizeClasses[size]} cursor-pointer filter drop-shadow-md flex items-center justify-center`}
      >
        {/* Floating Heart / Sparkle on Tap */}
        {showHeart && (
          <motion.div
            initial={{ opacity: 0, y: 0, scale: 0.5 }}
            animate={{ opacity: 1, y: -30, scale: 1.2 }}
            exit={{ opacity: 0 }}
            className="absolute -top-4 right-0 z-30 text-rose-500"
          >
            <Heart className="w-6 h-6 fill-rose-500 animate-pulse" />
          </motion.div>
        )}

        {/* ========================================================
            MASCOT 1: ZAKI (Adventurer Boy Explorer)
            ======================================================== */}
        {(isZaki || (!isAmira && !isPureHudhud)) && (
          <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="zakiSkin" x1="100" y1="50" x2="100" y2="150" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFE0BD" />
                <stop offset="1" stopColor="#FCD0A1" />
              </linearGradient>
              <linearGradient id="zakiHat" x1="100" y1="20" x2="100" y2="80" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F59E0B" />
                <stop offset="1" stopColor="#D97706" />
              </linearGradient>
              <linearGradient id="zakiVest" x1="100" y1="120" x2="100" y2="190" gradientUnits="userSpaceOnUse">
                <stop stopColor="#0D9488" />
                <stop offset="1" stopColor="#0F766E" />
              </linearGradient>
              <linearGradient id="zakiScarf" x1="100" y1="110" x2="100" y2="135" gradientUnits="userSpaceOnUse">
                <stop stopColor="#EF4444" />
                <stop offset="1" stopColor="#B91C1C" />
              </linearGradient>
            </defs>

            {/* Shadow beneath feet */}
            <ellipse cx="100" cy="192" rx="42" ry="7" fill="#000" fillOpacity="0.12" />

            {/* Explorer Backpack Straps & Body / Vest */}
            <path d="M68 130 C68 120 132 120 132 130 L138 185 C138 188 135 190 132 190 L68 190 C65 190 62 188 62 185 Z" fill="url(#zakiVest)" />
            {/* Inner White Shirt */}
            <polygon points="90,130 110,130 105,165 95,165" fill="#FFFFFF" />
            
            {/* Scarf / Neckerchief */}
            <path d="M82 124 Q100 138 118 124 Q108 140 100 148 Q92 140 82 124 Z" fill="url(#zakiScarf)" />
            <circle cx="100" cy="132" r="4" fill="#FBBF24" />

            {/* Compass badge on vest */}
            <circle cx="80" cy="155" r="7" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
            <polygon points="80,150 82,155 80,160 78,155" fill="#EF4444" />
            <polygon points="80,150 82,155 80,155 78,155" fill="#FFFFFF" />

            {/* Arms / Hands */}
            {mood === 'cheer' || mood === 'celebrate' ? (
              <>
                {/* Cheering raised arms */}
                <path d="M65 136 C50 120 44 95 48 85 C52 75 62 82 66 102 L70 132" fill="#FCD0A1" stroke="#E5AC75" strokeWidth="2" strokeLinecap="round" />
                <circle cx="48" cy="84" r="8" fill="#FCD0A1" />
                <path d="M135 136 C150 120 156 95 152 85 C148 75 138 82 134 102 L130 132" fill="#FCD0A1" stroke="#E5AC75" strokeWidth="2" strokeLinecap="round" />
                <circle cx="152" cy="84" r="8" fill="#FCD0A1" />
              </>
            ) : mood === 'guide' ? (
              <>
                {/* Pointing hand right */}
                <path d="M68 136 L58 152 C55 157 60 162 65 158 L74 142" fill="#FCD0A1" stroke="#E5AC75" strokeWidth="2" />
                <circle cx="58" cy="156" r="7" fill="#FCD0A1" />
                <path d="M132 136 C148 136 160 124 172 120 C176 118 178 124 172 128 L140 148" fill="#FCD0A1" stroke="#E5AC75" strokeWidth="2" />
                <circle cx="174" cy="122" r="6" fill="#FCD0A1" />
              </>
            ) : (
              <>
                {/* Relaxed hands at hips */}
                <path d="M68 136 C55 145 52 160 62 168 C66 170 72 165 72 155 Z" fill="#FCD0A1" stroke="#E5AC75" strokeWidth="1.5" />
                <path d="M132 136 C145 145 148 160 138 168 C134 170 128 165 128 155 Z" fill="#FCD0A1" stroke="#E5AC75" strokeWidth="1.5" />
              </>
            )}

            {/* Neck */}
            <rect x="91" y="115" width="18" height="15" rx="4" fill="#FCD0A1" />

            {/* Head / Face */}
            <path d="M60 85 C60 55 140 55 140 85 C140 115 125 128 100 128 C75 128 60 115 60 85 Z" fill="url(#zakiSkin)" />

            {/* Ears */}
            <circle cx="58" cy="86" r="9" fill="#FCD0A1" />
            <circle cx="58" cy="86" r="5" fill="#F8B682" />
            <circle cx="142" cy="86" r="9" fill="#FCD0A1" />
            <circle cx="142" cy="86" r="5" fill="#F8B682" />

            {/* Brown Hair bangs peeking out under hat */}
            <path d="M64 72 Q78 84 90 74 Q100 86 112 73 Q125 84 136 72 C135 60 65 60 64 72 Z" fill="#451A03" />

            {/* Rosy Cheeks */}
            <ellipse cx="73" cy="95" rx="7" ry="4" fill="#F87171" fillOpacity="0.45" />
            <ellipse cx="127" cy="95" rx="7" ry="4" fill="#F87171" fillOpacity="0.45" />

            {/* Big Expressive Chibi Eyes */}
            {mood === 'cheer' || mood === 'celebrate' ? (
              <>
                {/* Joyful crescent eyes ^_^ */}
                <path d="M72 88 Q80 80 88 88" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                <path d="M112 88 Q120 80 128 88" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              </>
            ) : (
              <>
                {/* Round sparkling brown eyes */}
                <circle cx="80" cy="87" r="7.5" fill="#1E293B" />
                <circle cx="78" cy="84" r="2.8" fill="#FFFFFF" />
                <circle cx="82" cy="89" r="1.4" fill="#FFFFFF" />

                <circle cx="120" cy="87" r="7.5" fill="#1E293B" />
                <circle cx="118" cy="84" r="2.8" fill="#FFFFFF" />
                <circle cx="122" cy="89" r="1.4" fill="#FFFFFF" />
              </>
            )}

            {/* Eyebrows */}
            <path d="M73 78 Q80 75 87 78" stroke="#451A03" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M113 78 Q120 75 127 78" stroke="#451A03" strokeWidth="2.5" strokeLinecap="round" fill="none" />

            {/* Nose */}
            <path d="M99 91 Q100 93 101 91" stroke="#E5AC75" strokeWidth="2" strokeLinecap="round" fill="none" />

            {/* Cheerful Smile */}
            {mood === 'cheer' || mood === 'celebrate' ? (
              <path d="M88 98 Q100 114 112 98 Z" fill="#DC2626" stroke="#991B1B" strokeWidth="1.5" />
            ) : (
              <path d="M90 98 Q100 108 110 98" stroke="#991B1B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            )}

            {/* Explorer Safari Hat */}
            <ellipse cx="100" cy="62" rx="55" ry="14" fill="#B45309" />
            <ellipse cx="100" cy="60" rx="54" ry="12" fill="url(#zakiHat)" />
            <path d="M68 58 C70 30 130 30 132 58 Z" fill="url(#zakiHat)" />
            {/* Hat Band with Ribbon */}
            <path d="M68 56 Q100 64 132 56 L132 60 Q100 68 68 60 Z" fill="#047857" />
            {/* Golden Star/Badge on Hat */}
            <circle cx="100" cy="46" r="6" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />
            <polygon points="100,42 101.5,45 105,45 102,47.5 103,51 100,49 97,51 98,47.5 95,45 98.5,45" fill="#FFFFFF" />

            {/* HUDHUD PERCHED ON ZAKI'S HAT (When Duo Mode is Active!) */}
            {showHudhudTogether && (
              <g transform="translate(112, 8) scale(0.65)">
                {/* Perched Mini Hudhud */}
                {/* Crest Feathers */}
                <path d="M25 20 Q30 5 35 12" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
                <path d="M22 22 Q20 2 24 10" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
                <path d="M28 22 Q38 8 40 16" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
                <circle cx="35" cy="11" r="2" fill="#000" />
                <circle cx="24" cy="9" r="2" fill="#000" />
                {/* Body */}
                <ellipse cx="26" cy="30" rx="12" ry="14" fill="#F59E0B" />
                {/* Wing with stripes */}
                <path d="M20 28 Q10 32 16 42 Q26 40 24 30 Z" fill="#D97706" />
                <line x1="16" y1="34" x2="22" y2="34" stroke="#FFFFFF" strokeWidth="1.5" />
                <line x1="18" y1="38" x2="24" y2="38" stroke="#000000" strokeWidth="1.5" />
                {/* Eye */}
                <circle cx="31" cy="26" r="2.5" fill="#000" />
                <circle cx="31.5" cy="25.5" r="0.8" fill="#FFF" />
                {/* Beak */}
                <path d="M34 26 L45 28 L34 30 Z" fill="#FBBF24" stroke="#B45309" strokeWidth="0.8" />
              </g>
            )}
          </svg>
        )}

        {/* ========================================================
            MASCOT 2: AMIRA (Adventurer Girl Explorer)
            ======================================================== */}
        {isAmira && (
          <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="amiraHijab" x1="100" y1="30" x2="100" y2="130" gradientUnits="userSpaceOnUse">
                <stop stopColor="#EC4899" />
                <stop offset="1" stopColor="#BE185D" />
              </linearGradient>
              <linearGradient id="amiraVest" x1="100" y1="120" x2="100" y2="190" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F59E0B" />
                <stop offset="1" stopColor="#D97706" />
              </linearGradient>
            </defs>

            {/* Shadow */}
            <ellipse cx="100" cy="192" rx="42" ry="7" fill="#000" fillOpacity="0.12" />

            {/* Explorer Dress / Vest */}
            <path d="M66 130 C66 120 134 120 134 130 L140 185 C140 188 136 190 132 190 L68 190 C64 190 60 188 60 185 Z" fill="url(#amiraVest)" />
            {/* White Tunic Underneath */}
            <polygon points="90,130 110,130 106,165 94,165" fill="#FDF2F8" />
            <circle cx="100" cy="140" r="2.5" fill="#DB2777" />
            <circle cx="100" cy="150" r="2.5" fill="#DB2777" />

            {/* Adventurer Satchel strap */}
            <line x1="72" y1="130" x2="128" y2="175" stroke="#78350F" strokeWidth="3.5" strokeLinecap="round" />
            <rect x="120" y="165" width="16" height="14" rx="3" fill="#92400E" />
            <circle cx="128" cy="172" r="2" fill="#FCD34D" />

            {/* Arms */}
            {mood === 'cheer' || mood === 'celebrate' ? (
              <>
                <path d="M64 136 C48 118 42 95 48 85 C52 75 62 82 66 102 L70 132" fill="#FCD0A1" stroke="#E5AC75" strokeWidth="2" />
                <circle cx="48" cy="84" r="7.5" fill="#FCD0A1" />
                <path d="M136 136 C152 118 158 95 152 85 C148 75 138 82 134 102 L130 132" fill="#FCD0A1" stroke="#E5AC75" strokeWidth="2" />
                <circle cx="152" cy="84" r="7.5" fill="#FCD0A1" />
              </>
            ) : (
              <>
                <path d="M66 136 C54 145 52 160 62 168 C66 170 72 165 72 155 Z" fill="#FCD0A1" stroke="#E5AC75" strokeWidth="1.5" />
                <path d="M134 136 C146 145 148 160 138 168 C134 170 128 165 128 155 Z" fill="#FCD0A1" stroke="#E5AC75" strokeWidth="1.5" />
              </>
            )}

            {/* Hijab / Headcover Hood */}
            <path d="M52 85 C52 42 148 42 148 85 C148 125 136 138 100 138 C64 138 52 125 52 85 Z" fill="url(#amiraHijab)" />

            {/* Face Inner Oval */}
            <path d="M68 85 C68 62 132 62 132 85 C132 114 122 122 100 122 C78 122 68 114 68 85 Z" fill="#FFE0BD" />

            {/* Hijab drape under chin */}
            <path d="M80 122 Q100 134 120 122 Q112 138 100 144 Q88 138 80 122 Z" fill="#9D174D" />

            {/* Rosy Cheeks */}
            <ellipse cx="76" cy="95" rx="7" ry="4" fill="#F43F5E" fillOpacity="0.45" />
            <ellipse cx="124" cy="95" rx="7" ry="4" fill="#F43F5E" fillOpacity="0.45" />

            {/* Amira's sparkling cute eyes with long lashes */}
            {mood === 'cheer' || mood === 'celebrate' ? (
              <>
                <path d="M74 88 Q82 80 90 88" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                <path d="M110 88 Q118 80 126 88" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              </>
            ) : (
              <>
                <circle cx="82" cy="87" r="7.5" fill="#1E293B" />
                <circle cx="80" cy="84" r="2.8" fill="#FFFFFF" />
                <circle cx="84" cy="89" r="1.4" fill="#FFFFFF" />
                {/* Lashes */}
                <path d="M76 81 L72 78" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M82 79 L82 75" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" />

                <circle cx="118" cy="87" r="7.5" fill="#1E293B" />
                <circle cx="116" cy="84" r="2.8" fill="#FFFFFF" />
                <circle cx="120" cy="89" r="1.4" fill="#FFFFFF" />
                <path d="M124 81 L128 78" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M118 79 L118 75" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" />
              </>
            )}

            {/* Nose & Smile */}
            <path d="M99 91 Q100 93 101 91" stroke="#E5AC75" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M90 99 Q100 108 110 99" stroke="#991B1B" strokeWidth="2.5" strokeLinecap="round" fill="none" />

            {/* Adventurer Headband with Flower Clip */}
            <path d="M54 68 Q100 54 146 68 L146 74 Q100 60 54 74 Z" fill="#FBBF24" />
            <g transform="translate(64, 52)">
              <circle cx="8" cy="8" r="7" fill="#10B981" />
              <circle cx="8" cy="8" r="4" fill="#FDF2F8" />
              <polygon points="8,4 9.5,7 12.5,7 10,9 11,12 8,10.5 5,12 6,9 3.5,7 6.5,7" fill="#F59E0B" />
            </g>

            {/* HUDHUD PERCHED BESIDE AMIRA */}
            {showHudhudTogether && (
              <g transform="translate(122, 16) scale(0.65)">
                <path d="M25 20 Q30 5 35 12" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
                <path d="M22 22 Q20 2 24 10" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
                <path d="M28 22 Q38 8 40 16" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
                <circle cx="35" cy="11" r="2" fill="#000" />
                <ellipse cx="26" cy="30" rx="12" ry="14" fill="#F59E0B" />
                <path d="M20 28 Q10 32 16 42 Q26 40 24 30 Z" fill="#D97706" />
                <circle cx="31" cy="26" r="2.5" fill="#000" />
                <circle cx="31.5" cy="25.5" r="0.8" fill="#FFF" />
                <path d="M34 26 L45 28 L34 30 Z" fill="#FBBF24" stroke="#B45309" strokeWidth="0.8" />
              </g>
            )}
          </svg>
        )}

        {/* ========================================================
            MASCOT 3: HUDHUD AL-FASIH (Pure Bird Companion)
            ======================================================== */}
        {isPureHudhud && (
          <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="hudhudBody" x1="100" y1="50" x2="100" y2="160" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F59E0B" />
                <stop offset="0.6" stopColor="#D97706" />
                <stop offset="1" stopColor="#B45309" />
              </linearGradient>
              <linearGradient id="hudhudCrest" x1="100" y1="20" x2="100" y2="80" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FBBF24" />
                <stop offset="1" stopColor="#EA580C" />
              </linearGradient>
            </defs>

            {/* Shadow */}
            <ellipse cx="100" cy="186" rx="46" ry="8" fill="#000" fillOpacity="0.15" />

            {/* Crest Royal Feathers (Iconic Hoopoe Crown) */}
            <g>
              <path d="M85 65 Q70 15 90 25" stroke="url(#hudhudCrest)" strokeWidth="6" strokeLinecap="round" />
              <circle cx="90" cy="25" r="4.5" fill="#000000" />
              <circle cx="89" cy="24" r="2" fill="#FFFFFF" />

              <path d="M95 62 Q92 5 108 14" stroke="url(#hudhudCrest)" strokeWidth="6.5" strokeLinecap="round" />
              <circle cx="108" cy="14" r="5" fill="#000000" />
              <circle cx="107" cy="13" r="2.2" fill="#FFFFFF" />

              <path d="M105 65 Q115 10 128 22" stroke="url(#hudhudCrest)" strokeWidth="6" strokeLinecap="round" />
              <circle cx="128" cy="22" r="4.5" fill="#000000" />
              <circle cx="127" cy="21" r="2" fill="#FFFFFF" />

              <path d="M115 70 Q138 25 145 40" stroke="url(#hudhudCrest)" strokeWidth="5.5" strokeLinecap="round" />
              <circle cx="145" cy="40" r="4" fill="#000000" />
            </g>

            {/* Round Pudgy Body */}
            <ellipse cx="98" cy="122" rx="46" ry="48" fill="url(#hudhudBody)" />

            {/* Soft Creamy Chest */}
            <path d="M80 100 Q105 100 115 125 Q115 155 92 165 Q75 140 80 100 Z" fill="#FEF3C7" />

            {/* Striped Wings */}
            <path d="M60 110 C50 120 40 145 60 162 C75 170 82 145 80 120 Z" fill="#1E293B" />
            <line x1="52" y1="130" x2="72" y2="130" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
            <line x1="50" y1="142" x2="74" y2="142" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="55" y1="154" x2="76" y2="154" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />

            {/* Right Wing (Waving or Tucked) */}
            {mood === 'cheer' || mood === 'celebrate' ? (
              <g transform="translate(130, 95) rotate(-35)">
                <path d="M0 0 C15 -15 35 5 25 25 C15 35 0 20 0 0 Z" fill="#1E293B" />
                <line x1="8" y1="8" x2="22" y2="8" stroke="#FFFFFF" strokeWidth="3" />
                <line x1="5" y1="16" x2="18" y2="16" stroke="#F59E0B" strokeWidth="2.5" />
              </g>
            ) : (
              <path d="M136 110 C146 120 156 145 136 162 C121 170 114 145 116 120 Z" fill="#1E293B" />
            )}

            {/* Tail Feathers */}
            <polygon points="85,165 95,188 105,188 115,165" fill="#0F172A" />
            <line x1="95" y1="175" x2="105" y2="175" stroke="#FFFFFF" strokeWidth="3" />

            {/* Feet / Talons */}
            <circle cx="85" cy="172" r="5" fill="#D97706" />
            <circle cx="112" cy="172" r="5" fill="#D97706" />

            {/* Big Friendly Eyes */}
            <circle cx="118" cy="85" r="11" fill="#1E293B" />
            <circle cx="115" cy="82" r="4.5" fill="#FFFFFF" />
            <circle cx="121" cy="88" r="2" fill="#FFFFFF" />

            {/* Long Slim Curved Beak */}
            <path d="M125 88 Q155 94 175 102 Q150 102 124 96 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />

            {/* Rosy Blush */}
            <ellipse cx="112" cy="98" rx="7" ry="4" fill="#F43F5E" fillOpacity="0.4" />
          </svg>
        )}
      </motion.div>
    </div>
  );
};
