import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle2, ShieldAlert, Sparkles, RefreshCw, Info, HelpCircle } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { INDUSTRY_TEMPLATES, Risk } from '../utils/industryTemplates';
import canvasConfetti from 'canvas-confetti';

interface RiskCenterProps {
  activeIndustry: string;
  alerts: any[];
  onResolveAlert: (id: string) => void;
}

export const RiskCenter: React.FC<RiskCenterProps> = ({ activeIndustry, alerts, onResolveAlert }) => {
  const template = INDUSTRY_TEMPLATES[activeIndustry] || INDUSTRY_TEMPLATES.retail;
  
  // Local state for tracking template-specific risks
  const [localRisks, setLocalRisks] = useState<Risk[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setLocalRisks(template.risks);
      setIsLoading(false);
    }, 350);
    return () => clearTimeout(timer);
  }, [activeIndustry, template]);

  const handleResolveRisk = (id: string) => {
    setLocalRisks(prev =>
      prev.map(r => r.id === id ? { ...r, status: 'resolved' } : r)
    );
    
    // Resolve globally in App alerts state if there is a match
    const match = localRisks.find(r => r.id === id);
    if (match) {
      // Find a matching global alert by keyword or category and resolve it
      const globalAlertMatch = alerts.find(a => a.category === match.category && a.status === 'active');
      if (globalAlertMatch) {
        onResolveAlert(globalAlertMatch.id);
      }
    }

    // Fire confetti
    canvasConfetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.85 }
    });
  };

  const getLevelStyle = (level: string) => {
    switch (level) {
      case 'High': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'Medium': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  const activeCount = localRisks.filter(r => r.status === 'active').length;
  const resolvedCount = localRisks.filter(r => r.status === 'resolved').length;

  return (
    <div className="space-y-6 animate-fade-in p-1">
      {/* Top Banner summary stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlassCard hover={false} loading={isLoading} className="p-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Active Risk Signals</span>
            <span className="text-2xl font-black text-slate-800 dark:text-white mt-1 block">{activeCount}</span>
          </div>
          <div className="bg-red-500/10 text-red-500 p-3 rounded-2xl">
            <ShieldAlert size={20} />
          </div>
        </GlassCard>

        <GlassCard hover={false} loading={isLoading} className="p-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Resolved Mitigation Actions</span>
            <span className="text-2xl font-black text-emerald-500 mt-1 block">{resolvedCount}</span>
          </div>
          <div className="bg-emerald-500/10 text-emerald-500 p-3 rounded-2xl">
            <CheckCircle2 size={20} />
          </div>
        </GlassCard>

        <GlassCard hover={false} loading={isLoading} className="p-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Telemetry System Scan</span>
            <span className="text-xs font-bold text-brand-500 dark:text-brand-400 flex items-center gap-1 mt-1 block">
              <RefreshCw size={12} className="animate-spin text-brand-500" />
              <span>Scanning Operations Live...</span>
            </span>
          </div>
          <div className="bg-brand-500/10 text-brand-500 p-3 rounded-2xl">
            <Info size={20} />
          </div>
        </GlassCard>
      </div>

      {/* Main Risks List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-extrabold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
            <AlertTriangle size={15} className="text-red-500" />
            Detected Operational Risks
          </span>
          <span className="text-[10px] font-semibold text-slate-400">
            Scanning 15 operational data nodes in {template.name}
          </span>
        </div>

        {localRisks.length === 0 ? (
          <GlassCard hover={false} className="p-8 text-center text-slate-400">
            <CheckCircle2 size={36} className="text-emerald-500 mx-auto mb-2" />
            <p className="text-xs font-bold">No active anomalies detected.</p>
            <p className="text-[10px] mt-1 text-slate-500">All signals lie within standard deviations.</p>
          </GlassCard>
        ) : (
          <div className="space-y-4">
            {localRisks.map((risk) => {
              const isResolved = risk.status === 'resolved';
              return (
                <GlassCard 
                  key={risk.id} 
                  hover={false} 
                  className={`p-6 border-l-4 transition-all relative ${
                    isResolved 
                      ? 'border-l-emerald-500 opacity-60 bg-emerald-500/5' 
                      : 'border-l-red-500 bg-red-500/5'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="space-y-3 flex-1">
                      
                      {/* Risk Header */}
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                          {risk.title}
                        </h4>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${getLevelStyle(risk.level)}`}>
                          {risk.level} Severity
                        </span>
                        <span className="text-[9px] text-slate-400 font-semibold bg-slate-100 dark:bg-slate-900 px-2 py-0.5 rounded-full">
                          Probability: {risk.probability}%
                        </span>
                        <span className="text-[8px] text-slate-400 font-semibold uppercase">
                          Detected {risk.timestamp}
                        </span>
                      </div>

                      {/* Detail Breakdown */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white/40 dark:bg-slate-950/20 border border-slate-205/5 rounded-2xl p-4 text-[11px] text-slate-655 dark:text-slate-350 leading-relaxed">
                        <div>
                          <strong className="text-slate-850 dark:text-slate-100 uppercase text-[9px] tracking-wider block mb-1">Expected Business Impact</strong>
                          <p>{risk.expectedImpact}</p>
                        </div>
                        <div>
                          <strong className="text-slate-850 dark:text-slate-100 uppercase text-[9px] tracking-wider block mb-1">Identified Root Cause</strong>
                          <p>{risk.rootCause}</p>
                        </div>
                        <div>
                          <strong className="text-slate-850 dark:text-slate-100 uppercase text-[9px] tracking-wider block mb-1">Suggested System Action</strong>
                          <p>{risk.suggestedSolution}</p>
                        </div>
                      </div>

                    </div>

                    {/* Action buttons */}
                    <div className="flex-shrink-0 pt-1">
                      {isResolved ? (
                        <div className="flex items-center gap-1 text-[11px] text-emerald-500 font-bold px-3 py-1.5 bg-emerald-500/10 rounded-xl">
                          <CheckCircle2 size={13} />
                          <span>Resolved</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleResolveRisk(risk.id)}
                          className="px-4 py-2 bg-gradient-to-tr from-brand-600 to-indigo-500 hover:opacity-95 text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-1.5"
                        >
                          <Sparkles size={12} />
                          <span>Resolve Risk</span>
                        </button>
                      )}
                    </div>

                  </div>
                </GlassCard>
              );
            })}
          </div>
        )}
      </div>

      {/* Advisory explanation note */}
      <GlassCard hover={false} className="p-4 bg-slate-50/50 dark:bg-slate-955/20 border border-slate-205/10 flex items-start gap-3">
        <HelpCircle size={16} className="text-indigo-400 mt-0.5 flex-shrink-0" />
        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal">
          Active risk telemetry scans indicators every 10 seconds. Threshold breaches trigger alerts when data points deviate beyond normal historic distributions. Mitigation resolutions log actions in reports for audit compliance.
        </p>
      </GlassCard>
    </div>
  );
};
export default RiskCenter;
