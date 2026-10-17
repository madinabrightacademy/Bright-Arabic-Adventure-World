import React, { useMemo, useState } from 'react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip
} from 'recharts';
import { Sparkles, Trophy, AlertCircle, ArrowUpRight, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import { UserProfile, IslandId } from '../types/game';
import { sound } from '../services/sound';

export interface IslandRadarDatum {
  islandId: IslandId;
  name: string;
  arabicName: string;
  score: number;
  fullMark: number;
  skillsMasteredCount: number;
  crystalUnlocked: boolean;
  gradeLabel: string;
  color: string;
  icon: string;
  recommendedGameId: string;
  recommendedGameName: string;
  summary: string;
}

interface LinguisticRadarChartProps {
  profile: UserProfile;
  onLaunchGame?: (gameId: string) => void;
  onNavigateLearn?: () => void;
}

const ISLAND_RADAR_DEFINITIONS: {
  id: IslandId;
  name: string;
  arabicName: string;
  icon: string;
  color: string;
  recommendedGameId: string;
  recommendedGameName: string;
  summary: string;
}[] = [
  {
    id: 'HRF',
    name: 'Huruf',
    arabicName: 'الحُرُوف',
    icon: '🔤',
    color: '#0d9488', // teal-600
    recommendedGameId: 'sand_trace',
    recommendedGameName: 'Jejak Pasir Huruf',
    summary: 'Bentuk 28 hijaiyah, makhraj murni, dan harakat dasar.'
  },
  {
    id: 'MFR',
    name: 'Mufradat',
    arabicName: 'المُفْرَدَات',
    icon: '🍎',
    color: '#f59e0b', // amber-500
    recommendedGameId: 'floating_market',
    recommendedGameName: 'Pasar Apung Mufradat',
    summary: 'Perbendaharaan kosakata tematik, benda, sifat, & fi\'il.'
  },
  {
    id: 'HWR',
    name: 'Hiwar',
    arabicName: 'الحِوَار',
    icon: '💬',
    color: '#10b981', // emerald-500
    recommendedGameId: 'dialog_quest',
    recommendedGameName: 'Petualangan Percakapan',
    summary: 'Komunikasi dua arah sehari-hari & skenario dunia nyata.'
  },
  {
    id: 'QWD',
    name: 'Qawaid',
    arabicName: 'القَوَاعِد',
    icon: '🏛️',
    color: '#3b82f6', // blue-500
    recommendedGameId: 'sentence_bridge',
    recommendedGameName: 'Jembatan Kalimat',
    summary: 'Kaidah nahwu-sharaf, susunan jumlah ismiyyah & fi\'liyyah.'
  },
  {
    id: 'IST',
    name: 'Istima\'',
    arabicName: 'الِاسْتِمَاع',
    icon: '🎧',
    color: '#8b5cf6', // purple-500
    recommendedGameId: 'audio_detective',
    recommendedGameName: 'Detektif Audio',
    summary: 'Kepekaan menyimak audio, fonetik, dan intonasi penutur asli.'
  },
  {
    id: 'QRA',
    name: 'Qira\'ah',
    arabicName: 'القِرَاءَة',
    icon: '📖',
    color: '#e11d48', // rose-600
    recommendedGameId: 'scroll_tap_gloss',
    recommendedGameName: 'Gulungan Hikmah Berharakat',
    summary: 'Kelancaran membaca wacana berharakat & pemahaman teks.'
  },
  {
    id: 'KLM',
    name: 'Kalam',
    arabicName: 'الكَلَام',
    icon: '🎙️',
    color: '#f97316', // orange-500
    recommendedGameId: 'makhraj_mirror',
    recommendedGameName: 'Cermin Makhraj & Lisan',
    summary: 'Artikulasi lisan, kelancaran berbicara (Thalaqah), & makhraj.'
  },
  {
    id: 'KTB',
    name: 'Kitabah',
    arabicName: 'الكِتَابَة',
    icon: '✍️',
    color: '#d97706', // amber-600
    recommendedGameId: 'imla_lighthouse',
    recommendedGameName: 'Mercusuar Imla\' Dikte',
    summary: 'Keterampilan menulis imla\', ejaan hamzah, & tata tulis Arab.'
  }
];

export const LinguisticRadarChart: React.FC<LinguisticRadarChartProps> = ({
  profile,
  onLaunchGame,
  onNavigateLearn
}) => {
  const [selectedIsland, setSelectedIsland] = useState<IslandId | null>(null);

  // Compute stats for all 8 islands
  const radarData: IslandRadarDatum[] = useMemo(() => {
    return ISLAND_RADAR_DEFINITIONS.map((item) => {
      const skillsCount = (profile.skillsMastered || []).filter((sId) =>
        sId.startsWith(item.id)
      ).length;

      const hasCrystal = Boolean(profile.crystals?.[item.id]);

      // Base progression from player level (0 to 5)
      const levelBase = (profile.level || 0) * 10;

      // Trait points synergy
      let traitContribution = 0;
      if (item.id === 'KLM') {
        traitContribution = Math.min(25, (profile.hudhudTraits?.lisan || 0) * 0.4);
      } else if (item.id === 'IST') {
        traitContribution = Math.min(25, (profile.hudhudTraits?.sam || 0) * 0.4);
      } else if (item.id === 'QRA') {
        traitContribution = Math.min(25, (profile.hudhudTraits?.qiraah || 0) * 0.4);
      } else if (item.id === 'KTB') {
        traitContribution = Math.min(25, (profile.hudhudTraits?.kitabah || 0) * 0.4);
      } else {
        traitContribution = Math.min(25, (profile.hudhudTraits?.lughah || 0) * 0.4);
      }

      // Word mastery bonus for vocabulary/letters
      const wordBonus =
        item.id === 'MFR' || item.id === 'HRF'
          ? Math.min(20, (profile.wordsMastered?.length || 0) * 1.5)
          : 0;

      // Crystal bonus
      const crystalBonus = hasCrystal ? 22 : 6;

      // Mastered skills bonus
      const skillBonus = Math.min(28, skillsCount * 12);

      // Raw score
      const rawScore = Math.round(
        18 + levelBase + crystalBonus + traitContribution + wordBonus + skillBonus
      );

      // Clamped between 20 and 100 for a realistic polygon representation
      const score = Math.max(20, Math.min(100, rawScore));

      // Grade classification
      let gradeLabel = 'Perlu Latihan';
      if (score >= 80) gradeLabel = 'Mahir (Mumtaz)';
      else if (score >= 60) gradeLabel = 'Kuat (Jayyid Jiddan)';
      else if (score >= 45) gradeLabel = 'Berkembang (Jayyid)';

      return {
        islandId: item.id,
        name: item.name,
        arabicName: item.arabicName,
        score,
        fullMark: 100,
        skillsMasteredCount: skillsCount,
        crystalUnlocked: hasCrystal,
        gradeLabel,
        color: item.color,
        icon: item.icon,
        recommendedGameId: item.recommendedGameId,
        recommendedGameName: item.recommendedGameName,
        summary: item.summary
      };
    });
  }, [profile]);

  // Overall statistics
  const averageMastery = useMemo(() => {
    const total = radarData.reduce((acc, d) => acc + d.score, 0);
    return Math.round(total / radarData.length);
  }, [radarData]);

  // Sorted strengths & weaknesses
  const sortedByMastery = useMemo(() => {
    return [...radarData].sort((a, b) => b.score - a.score);
  }, [radarData]);

  const topStrengths = useMemo(() => sortedByMastery.slice(0, 3), [sortedByMastery]);
  const growthAreas = useMemo(() => sortedByMastery.slice(-3).reverse(), [sortedByMastery]);

  const activeFocus = selectedIsland
    ? radarData.find((d) => d.islandId === selectedIsland) || radarData[0]
    : growthAreas[0];

  return (
    <div className="bg-white rounded-3xl p-4 border border-amber-200 shadow-md space-y-4">
      {/* Header Banner */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-teal-700">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Radar Kemahiran Linguistik 8 Pulau</span>
          </div>
          <h3 className="text-base font-black text-slate-900 mt-0.5">
            Peta Kekuatan & Penguasaan Bahasa Arab
          </h3>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Visualisasi radar poligon dari 8 pulau keterampilan (J0–J5).
          </p>
        </div>
        <div className="bg-gradient-to-br from-teal-500 to-emerald-600 text-white px-3 py-1.5 rounded-2xl text-center shadow-xs">
          <span className="text-[9px] uppercase font-bold tracking-wider block opacity-90">Rata-rata</span>
          <span className="text-lg font-black leading-none">{averageMastery}%</span>
        </div>
      </div>

      {/* Radar Chart Display */}
      <div className="w-full h-72 sm:h-80 -my-2 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="72%" data={radarData}>
            <PolarGrid stroke="#cbd5e1" strokeDasharray="3 3" />
            <PolarAngleAxis
              dataKey="name"
              tick={({ payload, x, y, textAnchor }) => {
                const item = radarData.find((d) => d.name === payload.value);
                const isSelected = selectedIsland === item?.islandId;
                return (
                  <g
                    transform={`translate(${x},${y})`}
                    className="cursor-pointer"
                    onClick={() => {
                      if (item) {
                        sound.playPop();
                        setSelectedIsland(item.islandId);
                      }
                    }}
                  >
                    <text
                      textAnchor={textAnchor}
                      dy={Number(y) > 140 ? 12 : -4}
                      className={`text-[11px] font-black transition-all ${
                        isSelected ? 'fill-amber-600 font-extrabold' : 'fill-slate-700'
                      }`}
                    >
                      {item?.icon} {payload.value}
                    </text>
                    <text
                      textAnchor={textAnchor}
                      dy={Number(y) > 140 ? 24 : 8}
                      className="text-[9px] font-arabic fill-slate-400"
                    >
                      {item?.arabicName}
                    </text>
                  </g>
                );
              }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{ fontSize: 9, fill: '#94a3b8' }}
              stroke="#e2e8f0"
            />
            <Radar
              name="Penguasaan (%)"
              dataKey="score"
              stroke="#0d9488"
              fill="#14b8a6"
              fillOpacity={0.45}
              strokeWidth={2.5}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload as IslandRadarDatum;
                  return (
                    <div className="bg-slate-900/95 text-white p-3 rounded-2xl shadow-xl border border-teal-400 text-xs space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-amber-300">
                        <span>{data.icon}</span>
                        <span>Pulau {data.name}</span>
                        <span className="font-arabic font-normal text-slate-300">({data.arabicName})</span>
                      </div>
                      <div className="flex items-center justify-between gap-4 text-[11px]">
                        <span className="text-slate-300">Tingkat Penguasaan:</span>
                        <span className="font-black text-emerald-400 text-sm">{data.score}%</span>
                      </div>
                      <div className="text-[10px] text-teal-200">
                        Status: <span className="font-bold text-white">{data.gradeLabel}</span>
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Kristal: {data.crystalUnlocked ? '💎 Terkumpul' : '🔒 Belum Terbuka'}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Analysis Grid: Strengths vs Growth Areas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {/* Top Strengths */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50/60 p-3 rounded-2xl border border-emerald-200 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase text-emerald-800 tracking-wider flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5 text-emerald-600" />
              <span>Kekuatan Utama (Top Strengths)</span>
            </span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
              Paling Dikuasai
            </span>
          </div>
          <div className="space-y-1.5 pt-1">
            {topStrengths.map((item, idx) => (
              <div
                key={item.islandId}
                onClick={() => {
                  sound.playPop();
                  setSelectedIsland(item.islandId);
                }}
                className={`p-2 rounded-xl flex items-center justify-between text-xs transition-all cursor-pointer ${
                  selectedIsland === item.islandId
                    ? 'bg-emerald-200/80 ring-2 ring-emerald-500'
                    : 'bg-white/80 hover:bg-white shadow-2xs'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-emerald-700">#{idx + 1}</span>
                  <span className="text-base">{item.icon}</span>
                  <div>
                    <h5 className="font-black text-slate-800 leading-none">{item.name}</h5>
                    <span className="text-[9px] font-arabic text-slate-500">{item.arabicName}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-black text-emerald-700 text-xs">{item.score}%</span>
                  <span className="text-[9px] block text-slate-400">{item.gradeLabel.split(' ')[0]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Growth Areas (Weaknesses / Practice Focus) */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50/60 p-3 rounded-2xl border border-amber-300 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase text-amber-900 tracking-wider flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
              <span>Area Perlu Latihan (Fokus Peningkatan)</span>
            </span>
            <span className="text-[10px] font-bold text-amber-800 bg-amber-200/70 px-2 py-0.5 rounded-full">
              Rekomendasi
            </span>
          </div>
          <div className="space-y-1.5 pt-1">
            {growthAreas.map((item, idx) => (
              <div
                key={item.islandId}
                onClick={() => {
                  sound.playPop();
                  setSelectedIsland(item.islandId);
                }}
                className={`p-2 rounded-xl flex items-center justify-between text-xs transition-all cursor-pointer ${
                  selectedIsland === item.islandId
                    ? 'bg-amber-200/90 ring-2 ring-amber-500'
                    : 'bg-white/80 hover:bg-white shadow-2xs'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-amber-700">⚠️</span>
                  <span className="text-base">{item.icon}</span>
                  <div>
                    <h5 className="font-black text-slate-800 leading-none">{item.name}</h5>
                    <span className="text-[9px] font-arabic text-slate-500">{item.arabicName}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-black text-amber-800 text-xs">{item.score}%</span>
                  <span className="text-[9px] block text-amber-600 font-bold">Latihan Segera</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Island Action Card */}
      {activeFocus && (
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-3.5 rounded-2xl border-2 border-amber-400/50 shadow-md">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-xl shadow-inner border border-white/20">
                {activeFocus.icon}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-black text-sm text-white">Pulau {activeFocus.name}</h4>
                  <span className="text-xs font-arabic text-amber-300">({activeFocus.arabicName})</span>
                  <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.2 rounded-md">
                    {activeFocus.score}%
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 mt-0.5 line-clamp-1">
                  {activeFocus.summary}
                </p>
              </div>
            </div>
            {onLaunchGame && (
              <button
                type="button"
                onClick={() => {
                  sound.playSparkle();
                  onLaunchGame(activeFocus.recommendedGameId);
                }}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 text-xs font-black shadow-xs flex items-center gap-1 transition-all active:scale-95 cursor-pointer shrink-0"
              >
                <span>Mainkan Game</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="mt-2.5 pt-2 border-t border-white/15 flex items-center justify-between text-[11px] text-slate-300">
            <span className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-400" />
              <span>Mini-Game Rekomendasi: <strong className="text-white">{activeFocus.recommendedGameName}</strong></span>
            </span>
            <span>
              {activeFocus.crystalUnlocked ? '💎 Kristal Terbuka' : '🔒 Belum Buka Kristal'}
            </span>
          </div>
        </div>
      )}

      {/* 8 Island Masteries Quick Grid */}
      <div className="pt-1 border-t border-slate-100">
        <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
          Detail Penguasaan Seluruh 8 Pulau:
        </h5>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {radarData.map((d) => (
            <button
              key={d.islandId}
              type="button"
              onClick={() => {
                sound.playPop();
                setSelectedIsland(d.islandId);
              }}
              className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                selectedIsland === d.islandId
                  ? 'border-teal-500 bg-teal-50/70 shadow-2xs'
                  : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-base">{d.icon}</span>
                <span className="text-xs font-black text-slate-800">{d.score}%</span>
              </div>
              <div className="font-bold text-xs text-slate-800 mt-1 truncate">{d.name}</div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${d.score}%`,
                    backgroundColor: d.color
                  }}
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
