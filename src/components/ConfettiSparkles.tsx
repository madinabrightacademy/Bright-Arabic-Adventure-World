import React, { useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { sound } from '../services/sound';

export interface ConfettiSparklesProps {
  active?: boolean;
  particleCount?: number;
  playSound?: boolean;
  onComplete?: () => void;
}

interface Particle {
  id: number;
  xStart: number;
  xTarget: number;
  yApex: number;
  yEnd: number;
  size: number;
  color: string;
  shape: 'rect' | 'circle' | 'star' | 'diamond';
  rotate: number;
  duration: number;
  delay: number;
}

const PALETTE = [
  '#f59e0b', // amber-500
  '#fbbf24', // amber-400
  '#f97316', // orange-500
  '#ea580c', // orange-600
  '#10b981', // emerald-500
  '#14b8a6', // teal-500
  '#3b82f6', // blue-500
  '#8b5cf6', // purple-500
  '#ec4899', // pink-500
  '#f43f5e', // rose-500
  '#ffd700'  // bright gold
];

const SHAPES: ('rect' | 'circle' | 'star' | 'diamond')[] = ['rect', 'circle', 'star', 'diamond'];

export const ConfettiSparkles: React.FC<ConfettiSparklesProps> = ({
  active = true,
  particleCount = 50,
  playSound = true,
  onComplete
}) => {
  useEffect(() => {
    if (active && playSound) {
      sound.playSparkle();
    }
  }, [active, playSound]);

  const particles: Particle[] = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => {
      // Angular spread from center-top
      const angle = (Math.random() * 160 + 10) * (Math.PI / 180); // 10 to 170 deg (upwards cone)
      const force = Math.random() * 180 + 80;
      
      const xTarget = Math.cos(angle) * force * (Math.random() > 0.5 ? 1 : -1) * 1.4;
      const yApex = -Math.sin(angle) * force * 0.7 - 20;
      const yEnd = yApex + Math.random() * 320 + 180;

      return {
        id: i,
        xStart: (Math.random() - 0.5) * 30,
        xTarget,
        yApex,
        yEnd,
        size: Math.random() * 8 + 6,
        color: PALETTE[i % PALETTE.length],
        shape: SHAPES[i % SHAPES.length],
        rotate: (Math.random() - 0.5) * 720,
        duration: Math.random() * 1.2 + 2.2, // 2.2 to 3.4s
        delay: Math.random() * 0.25
      };
    });
  }, [particleCount]);

  // Sparkle stars placed radially
  const sparkles = useMemo(() => {
    return Array.from({ length: 14 }, (_, i) => {
      const angle = (i / 14) * Math.PI * 2;
      const distance = Math.random() * 70 + 40;
      return {
        id: `sp-${i}`,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        size: Math.random() * 14 + 10,
        delay: Math.random() * 0.4
      };
    });
  }, []);

  if (!active) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-30 flex items-center justify-center">
      {/* Central Expanding Radiant Glow */}
      <motion.div
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{ scale: [0.2, 1.8, 2.4], opacity: [0, 0.75, 0] }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
        className="absolute w-44 h-44 rounded-full bg-gradient-to-r from-amber-400/40 via-yellow-300/30 to-orange-400/0 blur-xl"
      />

      {/* Golden Expanding Shockwave Ring */}
      <motion.div
        initial={{ scale: 0.4, opacity: 1, borderWidth: '6px' }}
        animate={{ scale: 2.8, opacity: 0, borderWidth: '1px' }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute w-36 h-36 rounded-full border-amber-300"
      />

      {/* Sparkle Twinkles */}
      {sparkles.map((sp) => (
        <motion.div
          key={sp.id}
          initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
          animate={{
            x: sp.x,
            y: sp.y,
            scale: [0, 1.4, 0],
            opacity: [0, 1, 0],
            rotate: [0, 180]
          }}
          transition={{
            duration: 1.1,
            delay: sp.delay,
            ease: 'easeOut'
          }}
          className="absolute text-amber-300 filter drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]"
          style={{ fontSize: `${sp.size}px` }}
        >
          ✨
        </motion.div>
      ))}

      {/* Bursting Confetti Ribbons and Shapes */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            x: p.xStart,
            y: 0,
            scale: 0,
            opacity: 1,
            rotate: 0
          }}
          animate={{
            x: [p.xStart, p.xTarget * 0.5, p.xTarget],
            y: [0, p.yApex, p.yEnd],
            scale: [0, 1.2, 0.9, 0],
            opacity: [1, 1, 0.9, 0],
            rotate: [0, p.rotate * 0.4, p.rotate]
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          className="absolute"
        >
          {p.shape === 'rect' && (
            <div
              style={{
                width: `${p.size}px`,
                height: `${p.size * 1.8}px`,
                backgroundColor: p.color,
                borderRadius: '2px',
                boxShadow: `0 0 6px ${p.color}88`
              }}
            />
          )}
          {p.shape === 'circle' && (
            <div
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: p.color,
                borderRadius: '50%',
                boxShadow: `0 0 6px ${p.color}88`
              }}
            />
          )}
          {p.shape === 'diamond' && (
            <div
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: p.color,
                transform: 'rotate(45deg)',
                borderRadius: '2px',
                boxShadow: `0 0 6px ${p.color}88`
              }}
            />
          )}
          {p.shape === 'star' && (
            <span
              style={{
                fontSize: `${p.size * 1.3}px`,
                color: p.color,
                filter: `drop-shadow(0 0 4px ${p.color})`
              }}
            >
              ★
            </span>
          )}
        </motion.div>
      ))}
    </div>
  );
};
