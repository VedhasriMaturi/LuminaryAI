import React, { useState, useEffect } from 'react';
import { Sparkles, Coins, CheckCircle2, ChevronRight, HelpCircle, TrendingUp, Cpu } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { INDUSTRY_TEMPLATES, Recommendation } from '../utils/industryTemplates';
import canvasConfetti from 'canvas-confetti';

interface RecommendationsPageProps {
  activeIndustry: string;
}

export const RecommendationsPage: React.FC<RecommendationsPageProps> = ({ activeIndustry }) => {
  const template = INDUSTRY_TEMPLATES[activeIndustry] || INDUSTRY_TEMPLATES.retail;
  const [localRecs, setLocalRecs] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setLocalRecs(template.recommendations);
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [activeIndustry, template]);

  const handleApplyRecommendation = (id: string) => {
    setLocalRecs(prev =>
      prev.map(r => r.id === id ? { ...r, resolved: true } : r)
    );

    // Fire confetti
    canvasConfetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.85 }
    });
  };

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-500/10 text-red-500 border-red-500/25';
      case 'Medium': return 'bg-amber-500/10 text-amber-500 border-amber-500/25';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/25';
    }
  };

  const getDifficultyStyle = (diff: string) => {
    switch (diff) {
      case 'Easy': return 'bg-emerald-50 text-emerald-555 dark:bg-emerald-950 dark:text-emerald-400';
      case 'Medium': return 'bg-blue-50 text-blue-555 dark:bg-blue-950 dark:text-blue-400';
      default: return 'bg-violet-50 text-violet-555 dark:bg-violet-950 dark:text-violet-400';
    }
  };

  const totalValue = localRecs.reduce((acc, r) => acc + (r.resolved ? r.estimatedValue : 0), 0);

  return (
    <div className="space-y-6 animate-fade-in p-1">
      {/* Overview stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard hover={false} loading={isLoading} className="p-5 flex items-center gap-4 bg-gradient-to-r from-brand-500/10 via-indigo-500/5 to-transparent border border-brand-500/20">
          <div className="p-3 bg-brand-500 text-white rounded-2xl">
            <Coins size={22} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Mitigated Net Value Added</span>
            <span className="text-xl font-black text-slate-800 dark:text-white mt-1 block">
              +₹{totalValue.toLocaleString('en-IN')}
            </span>
          </div>
        </GlassCard>

        <GlassCard hover={false} loading={isLoading} className="p-5 flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-2xl">
            <TrendingUp size={22} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Average Recommendation ROI</span>
            <span className="text-xl font-black text-slate-800 dark:text-white mt-1 block">
              4.15x
            </span>
          </div>
        </GlassCard>

        <GlassCard hover={false} loading={isLoading} className="p-5 flex items-center gap-4">
          <div className="p-3 bg-indigo-500/10 text-indigo-500 rounded-2xl">
            <Cpu size={22} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Engine Confidence Floor</span>
            <span className="text-xl font-black text-slate-800 dark:text-white mt-1 block">
              82%
            </span>
          </div>
        </GlassCard>
      </div>

      {/* Main Recommendations Loop */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-extrabold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles size={15} className="text-brand-500 animate-spin-slow" />
            AI Recommended Strategies
          </span>
          <span className="text-[10px] font-semibold text-slate-400">
            Weighted by estimated ROI and confidence coefficients
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {localRecs.map((rec) => {
            const isResolved = rec.resolved;
            return (
              <GlassCard 
                key={rec.id} 
                hover={false} 
                className={`p-6 transition-all border-l-4 relative overflow-hidden ${
                  isResolved ? 'border-l-emerald-500 opacity-60' : 'border-l-brand-500'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  
                  {/* Info details */}
                  <div className="space-y-3 flex-1">
                    
                    {/* Header line */}
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-sm font-black text-slate-850 dark:text-slate-100">
                        {rec.title}
                      </h4>
                      <span className={`text-[8.5px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${getPriorityStyle(rec.priority)}`}>
                        {rec.priority} Priority
                      </span>
                      <span className="text-[9px] text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full font-bold">
                        Confidence: {rec.confidence}%
                      </span>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${getDifficultyStyle(rec.difficulty)}`}>
                        {rec.difficulty} setup
                      </span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase">
                        Est. ROI: {rec.roi}x
                      </span>
                    </div>

                    <span className="text-[10px] text-slate-400 font-semibold block uppercase tracking-wider">
                      Target Area: {rec.metric}
                    </span>

                    {/* Explanations */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50/50 dark:bg-slate-950/20 border border-slate-205/5 p-4 rounded-2xl text-[11px] text-slate-655 dark:text-slate-350 leading-relaxed">
                      <div>
                        <strong className="text-slate-800 dark:text-white text-[9.5px] uppercase block mb-1">Deep Insight</strong>
                        <p>{rec.insight}</p>
                      </div>
                      <div>
                        <strong className="text-slate-800 dark:text-white text-[9.5px] uppercase block mb-1">Suggested System Action</strong>
                        <p>{rec.action}</p>
                      </div>
                    </div>

                  </div>

                  {/* ROI / Execution section */}
                  <div className="flex lg:flex-col items-center justify-between lg:justify-center gap-4 lg:w-44 border-t lg:border-t-0 lg:border-l border-slate-100 dark:border-slate-800/80 pt-4 lg:pt-0 lg:pl-6">
                    <div className="text-left lg:text-center space-y-0.5">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Est. Revenue Added</span>
                      <span className="text-lg font-black text-emerald-500 block">
                        +₹{rec.estimatedValue.toLocaleString('en-IN')}
                      </span>
                    </div>

                    {isResolved ? (
                      <div className="flex items-center gap-1 text-[10px] text-emerald-500 font-extrabold px-3.5 py-2 bg-emerald-500/10 rounded-xl">
                        <CheckCircle2 size={13} />
                        <span>Applied</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleApplyRecommendation(rec.id)}
                        className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 flex items-center gap-1"
                      >
                        <span>Apply Action</span>
                        <ChevronRight size={14} />
                      </button>
                    )}
                  </div>

                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>

      {/* Advisory explanation note */}
      <GlassCard hover={false} className="p-4 bg-slate-50/50 dark:bg-slate-955/20 border border-slate-205/10 flex items-start gap-3">
        <HelpCircle size={16} className="text-indigo-400 mt-0.5 flex-shrink-0" />
        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal">
          Recommendations are re-compiled dynamically after anomalies resolve or scenarios simulate. Apply recommendations to implement automations inside CRM parameters or update inventory parameters immediately.
        </p>
      </GlassCard>
    </div>
  );
};
export default RecommendationsPage;
