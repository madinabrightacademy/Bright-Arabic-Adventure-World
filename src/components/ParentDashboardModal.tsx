import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Lock, CheckCircle2, Clock, BookOpen, AlertCircle, RefreshCw, KeyRound, Key } from 'lucide-react';
import { UserProfile } from '../types/game';
import { ISLANDS_DATA, LEXICON_DATA } from '../data/curriculum';

interface ParentDashboardProps {
  profile: UserProfile;
  onClose: () => void;
  onPracticeDifficultWords: () => void;
  onOpenGlossary?: () => void;
}

const PIN_STORAGE_KEY = 'brightoria_parent_pin_v1';

export const ParentDashboardModal: React.FC<ParentDashboardProps> = ({
  profile,
  onClose,
  onPracticeDifficultWords,
  onOpenGlossary
}) => {
  const [storedPin, setStoredPin] = useState<string | null>(() => {
    return localStorage.getItem(PIN_STORAGE_KEY);
  });
  const isSettingNewPin = !storedPin;

  const [pinInput, setPinInput] = useState('');
  const [pinConfirmInput, setPinConfirmInput] = useState('');
  const [setupStep, setSetupStep] = useState<'create' | 'confirm'>('create');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutTimer, setLockoutTimer] = useState(0);
  const [isChangingPin, setIsChangingPin] = useState(false);
  const [copiedStatus, setCopiedStatus] = useState(false);

  // Keyboard accessibility: Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Lockout countdown timer
  useEffect(() => {
    if (lockoutTimer > 0) {
      const timer = setTimeout(() => setLockoutTimer(t => t - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [lockoutTimer]);

  const handleVerifyOrSetPin = (digit: string) => {
    if (lockoutTimer > 0) return;

    if (isSettingNewPin || isChangingPin) {
      // Flow for setting up a new PIN
      if (setupStep === 'create') {
        if (pinInput.length < 4) {
          const next = pinInput + digit;
          setPinInput(next);
          if (next.length === 4) {
            setSetupStep('confirm');
            setErrorMessage(null);
          }
        }
      } else {
        if (pinConfirmInput.length < 4) {
          const next = pinConfirmInput + digit;
          setPinConfirmInput(next);
          if (next.length === 4) {
            if (next === pinInput) {
              // PIN match! Save PIN
              localStorage.setItem(PIN_STORAGE_KEY, next);
              setStoredPin(next);
              setIsAuthenticated(true);
              setIsChangingPin(false);
              setErrorMessage(null);
            } else {
              setErrorMessage('PIN konfirmasi tidak cocok. Silakan ulangi.');
              setPinInput('');
              setPinConfirmInput('');
              setSetupStep('create');
            }
          }
        }
      }
      return;
    }

    // Normal PIN verification
    if (pinInput.length < 4) {
      const nextPin = pinInput + digit;
      setPinInput(nextPin);
      if (nextPin.length === 4) {
        if (nextPin === storedPin) {
          setIsAuthenticated(true);
          setErrorMessage(null);
          setFailedAttempts(0);
        } else {
          const attempts = failedAttempts + 1;
          setFailedAttempts(attempts);
          if (attempts >= 3) {
            setLockoutTimer(60);
            setErrorMessage('Terlalu banyak percobaan salah. Tunggu 60 detik.');
          } else {
            setErrorMessage(`PIN tidak tepat. Sisa percobaan: ${3 - attempts}`);
          }
          setTimeout(() => {
            setPinInput('');
          }, 800);
        }
      }
    }
  };

  const handleResetPinInput = () => {
    setPinInput('');
    setPinConfirmInput('');
    setErrorMessage(null);
  };

  const handleCopyReport = () => {
    const textReport = `LAPORAN BELAJAR BRIGHTORIA LISAN\nNama: ${profile.name}\nRutbah: ${profile.rutbah}\nXP: ${profile.xp} | Bintang: ${profile.stars}\nStreak: ${profile.dailyStreak} Hari\nSkill Dikuasai: ${profile.skillsMastered.length}\nKata Dikuasai: ${profile.wordsMastered.length}\nTahap Hudhud: ${profile.hudhudStage}\nTanggal: ${new Date().toLocaleDateString('id-ID')}`;
    navigator.clipboard?.writeText(textReport);
    setCopiedStatus(true);
    setTimeout(() => setCopiedStatus(false), 2500);
  };

  const currentEnteringPin = (isSettingNewPin || isChangingPin) && setupStep === 'confirm' 
    ? pinConfirmInput 
    : pinInput;

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="parent-dashboard-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        className="w-full max-w-lg bg-slate-50 rounded-3xl shadow-2xl border-4 border-slate-300 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" aria-hidden="true" />
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">Zona Aman & Laporan</span>
              <h2 id="parent-dashboard-title" className="text-xl font-bold font-chibi">Dashboard Orang Tua / Pendidik</h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup dashboard orang tua"
            className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white font-bold transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* PIN Authentication Gate */}
        {!isAuthenticated ? (
          <div className="p-6 flex-1 flex flex-col items-center justify-center text-center my-auto">
            <div className="w-16 h-16 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center mb-3">
              <Lock className="w-8 h-8" aria-hidden="true" />
            </div>

            <h3 className="text-lg font-bold text-slate-800">
              {isSettingNewPin || isChangingPin
                ? setupStep === 'create'
                  ? 'Atur 4-Digit PIN Baru Orang Tua'
                  : 'Konfirmasi 4-Digit PIN Anda'
                : 'Masukkan PIN Orang Tua'}
            </h3>

            <p className="text-xs text-slate-500 mt-1 mb-4 max-w-xs">
              {isSettingNewPin || isChangingPin
                ? 'Buat PIN 4-digit rahasia agar dashboard hanya dapat diakses oleh orang tua atau guru.'
                : 'Akses khusus pendidik untuk memantau waktu belajar, kata sulit, dan hasil evaluasi.'}
            </p>

            {/* PIN Indicators */}
            <div className="flex justify-center gap-3 mb-4">
              {[0, 1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  className={`w-4 h-4 rounded-full border-2 transition-all ${
                    currentEnteringPin.length > idx
                      ? errorMessage ? 'bg-rose-500 border-rose-500' : 'bg-teal-600 border-teal-600'
                      : 'border-slate-400 bg-white'
                  }`}
                />
              ))}
            </div>

            {errorMessage && (
              <p className="text-xs text-rose-600 font-bold mb-3 animate-shake">
                {errorMessage}
              </p>
            )}

            {lockoutTimer > 0 && (
              <p className="text-xs text-amber-700 font-bold mb-3 bg-amber-100 px-3 py-1.5 rounded-xl">
                ⏳ Keamanan aktif: Coba lagi dalam {lockoutTimer} detik
              </p>
            )}

            {/* Numeric Keypad */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-[260px]">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '✓'].map((key) => (
                <button
                  key={key}
                  type="button"
                  disabled={lockoutTimer > 0}
                  onClick={() => {
                    if (key === 'C') handleResetPinInput();
                    else if (key === '✓') {
                      // Handled automatically at 4 digits
                    } else handleVerifyOrSetPin(key);
                  }}
                  className={`h-12 min-w-[44px] min-h-[44px] rounded-2xl bg-white border border-slate-300 font-bold text-base text-slate-800 hover:bg-slate-100 active:scale-95 shadow-xs transition-all ${
                    lockoutTimer > 0 ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
                  }`}
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
                <Clock className="w-5 h-5 text-teal-600 mx-auto mb-1" aria-hidden="true" />
                <span className="text-[11px] text-slate-500 font-medium">Hari Aktif</span>
                <p className="text-lg font-bold text-slate-800">{profile.dailyStreak} Hari</p>
              </div>

              <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs text-center">
                <BookOpen className="w-5 h-5 text-indigo-600 mx-auto mb-1" aria-hidden="true" />
                <span className="text-[11px] text-slate-500 font-medium">Skill Dikuasai</span>
                <p className="text-lg font-bold text-slate-800">{profile.skillsMastered.length} Unit</p>
              </div>

              <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs text-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 mx-auto mb-1" aria-hidden="true" />
                <span className="text-[11px] text-slate-500 font-medium">Kata Dipahami</span>
                <p className="text-lg font-bold text-slate-800">{profile.wordsMastered.length} Kata</p>
              </div>
            </div>

            {/* Buku Kata Sulit Section (Materi Baina Yadaik & Auladina) */}
            <div className="bg-white rounded-2xl p-4 border border-amber-300 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-500" aria-hidden="true" />
                  <h4 className="font-bold text-sm text-slate-800">Buku Kata Sulit (Perlu Dilatih)</h4>
                </div>
                <span className="text-xs bg-amber-100 text-amber-800 font-extrabold px-2 py-0.5 rounded-full">
                  {profile.difficultWords.length} Item
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-3">
                Daftar kosa kata yang sempat keliru saat latihan. Sistem menyediakan latihan adaptif untuk mematangkan retensi memori jangka panjang.
              </p>

              {profile.difficultWords.length > 0 ? (
                <div className="space-y-1.5 mb-3 max-h-40 overflow-y-auto">
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
                  type="button"
                  onClick={() => {
                    onClose();
                    onPracticeDifficultWords();
                  }}
                  className="flex-1 min-h-[44px] py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs active:scale-95 transition-all cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  Latihan Cepat 3 Menit
                </button>

                {onOpenGlossary && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenGlossary();
                    }}
                    className="flex-1 min-h-[44px] py-2.5 px-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs active:scale-95 transition-all cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4" />
                    Buka Glosarium & Audio
                  </button>
                )}
              </div>
            </div>

            {/* Progres Per Pulau */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-sm text-slate-800">Penguasaan Keterampilan 9 Pulau</h4>
                <button
                  type="button"
                  onClick={handleCopyReport}
                  className="min-h-[44px] text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1"
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
                        {hasCrystal ? 'Kristal Terbuka ✨' : 'Dalam Proses'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pengaturan PIN Orang Tua */}
            <div className="p-3 bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-slate-600" />
                <span className="text-xs font-bold text-slate-700">Keamanan PIN Orang Tua</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsAuthenticated(false);
                  setIsChangingPin(true);
                  setPinInput('');
                  setPinConfirmInput('');
                  setSetupStep('create');
                }}
                className="text-xs text-teal-700 hover:text-teal-800 font-bold hover:underline cursor-pointer"
              >
                Ganti PIN
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
