import React, { useState, useEffect } from 'react';
import { Trophy, Award, TrendingUp, Sparkles, AlertCircle, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { INDUSTRY_TEMPLATES } from '../utils/industryTemplates';

interface KPIDashboardProps {
  activeIndustry: string;
}

export const KPIDashboard: React.FC<KPIDashboardProps> = ({ activeIndustry }) => {
  const template = INDUSTRY_TEMPLATES[activeIndustry] || INDUSTRY_TEMPLATES.retail;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [activeIndustry]);

  // Derive top metric values for leaderboard winner cards
  const winnerEntry = template.leaderboard[0];
  const secondEntry = template.leaderboard[1];
  const thirdEntry = template.leaderboard[2];

  return (
    <div className="space-y-6 animate-fade-in p-1">
      
      {/* Monthly Winner Showcase Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Gold 1st Place */}
        <GlassCard hover={true} loading={isLoading} className="p-6 relative overflow-hidden bg-gradient-to-tr from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 text-center flex flex-col justify-between min-h-[220px]">
          <div className="absolute top-4 right-4 opacity-15">
            <Trophy size={48} className="text-amber-500" />
          </div>
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1 bg-amber-500 text-slate-950 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
              🏆 Monthly Winner #1
            </span>
            <h3 className="text-base font-black text-slate-800 dark:text-white pt-2 leading-tight">
              {winnerEntry?.name}
            </h3>
            <p className="text-[10px] text-slate-400 font-semibold uppercase">
              Current metric: {winnerEntry?.score}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-200/50 dark:border-slate-800/60 flex items-center justify-center gap-2">
            <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">
              Badge Award: {winnerEntry?.badge}
            </span>
            <span className="text-[10px] text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded font-black flex items-center gap-0.5">
              <ArrowUpRight size={10} />
              +{winnerEntry?.growth}%
            </span>
          </div>
        </GlassCard>

        {/* Silver 2nd Place */}
        <GlassCard hover={true} loading={isLoading} className="p-6 relative overflow-hidden bg-gradient-to-tr from-slate-400/10 via-slate-400/5 to-transparent border border-slate-400/30 text-center flex flex-col justify-between min-h-[220px]">
          <div className="absolute top-4 right-4 opacity-15">
            <Trophy size={48} className="text-slate-400" />
          </div>
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1 bg-slate-400 text-slate-950 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
              🥈 Runner Up #2
            </span>
            <h3 className="text-base font-black text-slate-800 dark:text-white pt-2 leading-tight">
              {secondEntry?.name}
            </h3>
            <p className="text-[10px] text-slate-400 font-semibold uppercase">
              Current metric: {secondEntry?.score}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-200/50 dark:border-slate-800/60 flex items-center justify-center gap-2">
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
              Badge Award: {secondEntry?.badge}
            </span>
            <span className="text-[10px] text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded font-black flex items-center gap-0.5">
              <ArrowUpRight size={10} />
              +{secondEntry?.growth}%
            </span>
          </div>
        </GlassCard>

        {/* Bronze 3rd Place */}
        <GlassCard hover={true} loading={isLoading} className="p-6 relative overflow-hidden bg-gradient-to-tr from-amber-700/10 via-amber-700/5 to-transparent border border-amber-700/30 text-center flex flex-col justify-between min-h-[220px]">
          <div className="absolute top-4 right-4 opacity-15">
            <Award size={48} className="text-amber-700" />
          </div>
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1 bg-amber-750 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
              🥉 Honorable Mention #3
            </span>
            <h3 className="text-base font-black text-slate-800 dark:text-white pt-2 leading-tight">
              {thirdEntry?.name}
            </h3>
            <p className="text-[10px] text-slate-400 font-semibold uppercase">
              Current metric: {thirdEntry?.score}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-200/50 dark:border-slate-800/60 flex items-center justify-center gap-2">
            <span className="text-[10px] font-bold text-amber-750 dark:text-amber-600">
              Badge Award: {thirdEntry?.badge}
            </span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded font-black flex items-center gap-0.5 ${
              (thirdEntry?.growth || 0) >= 0 
                ? 'text-emerald-500 bg-emerald-500/10' 
                : 'text-red-500 bg-red-500/10'
            }`}>
              {(thirdEntry?.growth || 0) >= 0 ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
              {thirdEntry?.growth}%
            </span>
          </div>
        </GlassCard>

      </div>

      {/* Dynamic Ranking Leaderboard Log */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Detailed Leaderboard List */}
        <GlassCard hover={false} loading={isLoading} className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6 border-b border-slate-100 dark:border-slate-800/80 pb-3">
            <div className="flex items-center gap-1.5">
              <Trophy size={18} className="text-brand-500 animate-pulse-slow" />
              <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-100 uppercase tracking-widest">
                Operations Performance Rankings
              </h4>
            </div>
            <span className="text-[9px] uppercase font-bold text-brand-500 bg-brand-50 dark:bg-brand-950 px-2 py-0.5 rounded-xl">
              Active List
            </span>
          </div>

          <div className="space-y-3.5">
            {template.leaderboard.map((item, idx) => (
              <div 
                key={idx} 
                className="flex items-center justify-between p-3.5 bg-slate-50/50 dark:bg-slate-950/20 border border-slate-205/5 rounded-2xl hover:translate-x-1 transition-transform"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs ${
                    idx === 0 ? 'bg-amber-500 text-slate-950 shadow-md' :
                    idx === 1 ? 'bg-slate-400 text-slate-950 shadow-md' :
                    idx === 2 ? 'bg-amber-700 text-white shadow-md' :
                    'bg-slate-100 text-slate-400 dark:bg-slate-900 dark:text-slate-500'
                  }`}>
                    {idx + 1}
                  </div>
                  <div className="truncate">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block truncate">
                      {item.name}
                    </span>
                    <span className="text-[9px] font-bold text-brand-500 block uppercase mt-0.5">
                      {item.badge}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-xs font-black text-slate-800 dark:text-slate-100">
                    {item.score}
                  </span>
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded flex items-center gap-0.5 ${
                    item.growth >= 0 ? 'text-emerald-500 bg-emerald-500/10' : 'text-red-500 bg-red-500/10'
                  }`}>
                    {item.growth >= 0 ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                    {item.growth}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Dynamic Badge Showcase */}
        <GlassCard hover={false} loading={isLoading} className="p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800/80 pb-3">
              <Sparkles size={16} className="text-brand-500 animate-pulse-slow" />
              <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-100 uppercase tracking-widest">
                KPI Performance Badges
              </h4>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-white/40 dark:bg-slate-950/20 border border-slate-200/50 dark:border-slate-800/60 rounded-xl text-center space-y-1">
                <span className="text-xl">🚀</span>
                <span className="text-[9px] font-extrabold text-slate-800 dark:text-slate-200 block truncate">Best Seller</span>
                <span className="text-[8px] text-slate-400 font-semibold block">Top revenue category</span>
              </div>
              <div className="p-3 bg-white/40 dark:bg-slate-950/20 border border-slate-200/50 dark:border-slate-800/60 rounded-xl text-center space-y-1">
                <span className="text-xl">💰</span>
                <span className="text-[9px] font-extrabold text-slate-800 dark:text-slate-200 block truncate">Max Margin</span>
                <span className="text-[8px] text-slate-400 font-semibold block">Highest profit margin</span>
              </div>
              <div className="p-3 bg-white/40 dark:bg-slate-950/20 border border-slate-200/50 dark:border-slate-800/60 rounded-xl text-center space-y-1">
                <span className="text-xl">📈</span>
                <span className="text-[9px] font-extrabold text-slate-800 dark:text-slate-200 block truncate">Steady Flow</span>
                <span className="text-[8px] text-slate-400 font-semibold block">Under control variance</span>
              </div>
              <div className="p-3 bg-white/40 dark:bg-slate-950/20 border border-slate-205/50 dark:border-slate-805/60 rounded-xl text-center space-y-1">
                <span className="text-xl">🔔</span>
                <span className="text-[9px] font-extrabold text-slate-800 dark:text-slate-200 block truncate">Risk Flagged</span>
                <span className="text-[8px] text-slate-400 font-semibold block">Needs mitigation resolve</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex items-start gap-2">
            <AlertCircle size={13} className="text-indigo-400 mt-0.5 flex-shrink-0" />
            <p className="text-[9.5px] text-slate-450 dark:text-slate-500 leading-normal">
              Leaderboards are automatically re-indexed at the end of every calendar month. Active badges reflect operations telemetry from the current week.
            </p>
          </div>
        </GlassCard>

      </div>

    </div>
  );
};
export default KPIDashboard;
