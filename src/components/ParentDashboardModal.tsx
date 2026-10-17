import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Lock, CheckCircle2, Clock, BookOpen, AlertCircle, RefreshCw } from 'lucide-react';
import { UserProfile } from '../types/game';
import { ISLANDS_DATA, LEXICON_DATA } from '../data/curriculum';

interface ParentDashboardProps {
  profile: UserProfile;
  onClose: () => void;
  onPracticeDifficultWords: () => void;
  onOpenGlossary?: () => void;
}

export const ParentDashboardModal: React.FC<ParentDashboardProps> = ({
  profile,
  onClose,
  onPracticeDifficultWords,
  onOpenGlossary
}) => {
  const [pinInput, setPinInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinError, setPinError] = useState(false);

  const handleVerifyPin = (digit: string) => {
    if (pinInput.length < 4) {
      const nextPin = pinInput + digit;
      setPinInput(nextPin);
      if (nextPin.length === 4) {
        // Default parent PIN or standard test PIN: 1234 or any 4 digits
        if (nextPin === '1234' || nextPin === '0000') {
          setIsAuthenticated(true);
          setPinError(false);
        } else {
          setPinError(true);
          setTimeout(() => {
            setPinInput('');
            setPinError(false);
          }, 800);
        }
      }
    }
  };

  const [copiedStatus, setCopiedStatus] = useState(false);

  const handleResetPinInput = () => {
    setPinInput('');
    setPinError(false);
  };

  const handleCopyReport = () => {
    const textReport = `LAPORAN BELAJAR BRIGHTORIA LISAN\nNama Anak: ${profile.name}\nRutbah: ${profile.rutbah}\nXP: ${profile.xp} | Bintang: ${profile.stars}\nStreak: ${profile.dailyStreak} Hari\nSkill Dikuasai: ${profile.skillsMastered.length}\nKata Dikuasai: ${profile.wordsMastered.length}\nTahap Hudhud: ${profile.hudhudStage}\nTanggal Laporan: ${new Date().toLocaleDateString('id-ID')}`;
    navigator.clipboard?.writeText(textReport);
    setCopiedStatus(true);
    setTimeout(() => setCopiedStatus(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-lg bg-slate-50 rounded-3xl shadow-2xl border-4 border-slate-300 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">Zona Aman & Laporan</span>
              <h2 className="text-xl font-bold font-chibi">Dashboard Orang Tua / Pendidik</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white font-bold transition-colors"
          >
            ✕
          </button>
        </div>

        {/* PIN Authentication Gate */}
        {!isAuthenticated ? (
          <div className="p-6 flex-1 flex flex-col items-center justify-center text-center my-auto">
            <div className="w-16 h-16 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center mb-3">
              <Lock className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Masukkan PIN Orang Tua</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              PIN pengaman bawaan: <strong className="text-slate-800">1234</strong>
            </p>

            {/* PIN Indicators */}
            <div className="flex justify-center gap-3 mb-6">
              {[0, 1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  className={`w-4 h-4 rounded-full border-2 transition-all ${
                    pinInput.length > idx
                      ? pinError ? 'bg-rose-500 border-rose-500' : 'bg-teal-600 border-teal-600'
                      : 'border-slate-400 bg-white'
                  }`}
                />
              ))}
            </div>

            {pinError && (
              <p className="text-xs text-rose-600 font-bold mb-3 animate-shake">
                PIN keliru! Gunakan 1234
              </p>
            )}

            {/* Numeric Keypad */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-[240px]">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '✓'].map((key) => (
                <button
                  key={key}
                  onClick={() => {
                    if (key === 'C') handleResetPinInput();
                    else if (key === '✓') {
                      if (pinInput === '1234' || pinInput === '0000') setIsAuthenticated(true);
                    } else handleVerifyPin(key);
                  }}
                  className="h-12 rounded-2xl bg-white border border-slate-300 font-bold text-base text-slate-800 hover:bg-slate-100 active:scale-95 shadow-xs transition-all"
                >
                  {key}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Dashboard Content */
          <div className="p-4 flex-1 overflow-y-auto space-y-4">
            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-2.5">
              <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs text-center">
                <Clock className="w-4 h-4 text-teal-600 mx-auto mb-1" />
                <span className="text-[11px] text-slate-500 font-medium">Hari Aktif</span>
                <p className="text-lg font-bold text-slate-800">{profile.dailyStreak} Hari</p>
              </div>

              <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs text-center">
                <BookOpen className="w-4 h-4 text-indigo-600 mx-auto mb-1" />
                <span className="text-[11px] text-slate-500 font-medium">Skill Dikuasai</span>
                <p className="text-lg font-bold text-slate-800">{profile.skillsMastered.length} Unit</p>
              </div>

              <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs text-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                <span className="text-[11px] text-slate-500 font-medium">Kata Dipahami</span>
                <p className="text-lg font-bold text-slate-800">{profile.wordsMastered.length} Kata</p>
              </div>
            </div>

            {/* Buku Kata Sulit Section (Bab 12 & 37 PDF) */}
            <div className="bg-white rounded-2xl p-4 border border-amber-300 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-500" />
                  <h4 className="font-bold text-sm text-slate-800">Buku Kata Sulit (Perlu Dilatih)</h4>
                </div>
                <span className="text-xs bg-amber-100 text-amber-800 font-extrabold px-2 py-0.5 rounded-full">
                  {profile.difficultWords.length} Item
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-3">
                Daftar kosa kata yang sempat keliru saat latihan. Sistem menyediakan latihan adaptif 3 menit untuk mematangkan retensi.
              </p>

              {profile.difficultWords.length > 0 ? (
                <div className="space-y-1.5 mb-3">
                  {profile.difficultWords.map((id) => {
                    const lex = LEXICON_DATA.find(l => l.id === id);
                    if (!lex) return null;
                    return (
                      <div key={id} className="flex items-center justify-between p-2 rounded-xl bg-amber-50/70 border border-amber-200 text-xs">
                        <span className="font-arabic font-bold text-base text-slate-800">{lex.ar_vocalized}</span>
                        <span className="text-slate-600 font-medium">{lex.gloss_id} ({lex.translit})</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs text-emerald-600 font-medium italic mb-3">
                  Belum ada kata sulit saat ini. Semua latihan berjalan lancar!
                </p>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    onClose();
                    onPracticeDifficultWords();
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Latihan Cepat 3 Menit
                </button>

                {onOpenGlossary && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenGlossary();
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    Buka Glosarium & Audio
                  </button>
                )}
              </div>
            </div>

            {/* Progres Per Pulau */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-sm text-slate-800">Penguasaan Keterampilan 8 Pulau</h4>
                <button
                  onClick={handleCopyReport}
                  className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-2.5 py-1 rounded-xl transition-all"
                >
                  {copiedStatus ? '✅ Tersalin!' : '📋 Salin Laporan'}
                </button>
              </div>
              <div className="space-y-2">
                {ISLANDS_DATA.map((isl) => {
                  const hasCrystal = profile.crystals[isl.id];
                  return (
                    <div key={isl.id} className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-700">{isl.name_id}</span>
                      <span className={`px-2 py-0.5 rounded-full font-bold ${
                        hasCrystal ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {hasCrystal ? 'Kristal Dibuka ✨' : 'Dalam Proses'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
