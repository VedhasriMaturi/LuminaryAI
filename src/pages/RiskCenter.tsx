import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle2, ShieldAlert, Sparkles, RefreshCw, Info, HelpCircle, X, Brain } from 'lucide-react';
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
  const [activeResolutionRisk, setActiveResolutionRisk] = useState<Risk | null>(null);

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
                          onClick={() => setActiveResolutionRisk(risk)}
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
      <GlassCard hover={false} className="p-4 bg-slate-50/50 dark:bg-slate-905/20 border border-slate-200/10 flex items-start gap-3">
        <HelpCircle size={16} className="text-indigo-400 mt-0.5 flex-shrink-0" />
        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal">
          Active risk telemetry scans indicators every 10 seconds. Threshold breaches trigger alerts when data points deviate beyond normal historic distributions. Mitigation resolutions log actions in reports for audit compliance.
        </p>
      </GlassCard>

      {/* Dynamic Resolution Modal */}
      {activeResolutionRisk && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-955/60 backdrop-blur-sm">
          <style>{`
            @keyframes slideIn {
              from { opacity: 0; transform: translateY(12px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes dash {
              to { stroke-dashoffset: -20; }
            }
            .flow-step-1 { animation: slideIn 0.35s ease-out forwards; opacity: 0; }
            .flow-step-2 { animation: slideIn 0.35s ease-out forwards; animation-delay: 200ms; opacity: 0; }
            .flow-step-3 { animation: slideIn 0.35s ease-out forwards; animation-delay: 450ms; opacity: 0; }
            .flow-step-4 { animation: slideIn 0.35s ease-out forwards; animation-delay: 700ms; opacity: 0; }
            
            .flow-line-1 { animation: slideIn 0.2s ease-out forwards; animation-delay: 120ms; opacity: 0; }
            .flow-line-2 { animation: slideIn 0.2s ease-out forwards; animation-delay: 370ms; opacity: 0; }
            .flow-line-3 { animation: slideIn 0.2s ease-out forwards; animation-delay: 620ms; opacity: 0; }
            
            .animate-dash {
              stroke-dasharray: 6;
              animation: dash 1.5s linear infinite;
            }
          `}</style>
          <div className="relative w-full max-w-md bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-6 overflow-hidden text-slate-800 dark:text-slate-100 flex flex-col max-h-[90vh]">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3.5 mb-4">
              <div className="flex items-center gap-2">
                <div className="bg-brand-500/10 text-brand-500 p-2 rounded-xl">
                  <Brain size={18} className="animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm font-bold">Risk Mitigation Planner</h3>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Automated resolution protocol planner</span>
                </div>
              </div>
              <button 
                onClick={() => setActiveResolutionRisk(null)}
                className="p-1 rounded-lg hover:bg-slate-105 dark:hover:bg-slate-800 text-slate-400"
              >
                <X size={16} />
              </button>
            </div>

            {/* Steps Flowchart */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-3.5 my-2 py-1">
              
              {/* Step 1 */}
              <div className="flow-step-1 p-3.5 bg-slate-50 dark:bg-[#0f1b3b]/70 border border-slate-100 dark:border-indigo-950/40 rounded-2xl">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span className="w-5 h-5 rounded-full bg-brand-500/15 text-brand-500 flex items-center justify-center text-[10px] font-black">1</span>
                  <span className="text-xs font-bold text-slate-850 dark:text-slate-202">Telemetry Ingestion & Isolation</span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Anomalous signal identified: <strong className="text-brand-500 font-bold">{activeResolutionRisk.title}</strong> ({activeResolutionRisk.level} Severity). Traceback initiated.
                </p>
              </div>

              {/* Connection Line 1 */}
              <div className="flow-line-1 flex justify-center py-0.5">
                <svg className="w-4 h-6 text-brand-500/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} strokeDasharray="4 4" className="animate-dash" d="M12 5v14" />
                </svg>
              </div>

              {/* Step 2 */}
              <div className="flow-step-2 p-3.5 bg-slate-50 dark:bg-[#0f1b3b]/70 border border-slate-100 dark:border-indigo-950/40 rounded-2xl">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span className="w-5 h-5 rounded-full bg-brand-500/15 text-brand-500 flex items-center justify-center text-[10px] font-black">2</span>
                  <span className="text-xs font-bold text-slate-855 dark:text-slate-202">Root Cause Traceback</span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  System telemetry isolates variance to: <em className="italic font-medium text-slate-700 dark:text-slate-302">"{activeResolutionRisk.rootCause}"</em>. Affected nodes quarantined.
                </p>
              </div>

              {/* Connection Line 2 */}
              <div className="flow-line-2 flex justify-center py-0.5">
                <svg className="w-4 h-6 text-brand-500/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} strokeDasharray="4 4" className="animate-dash" d="M12 5v14" />
                </svg>
              </div>

              {/* Step 3 */}
              <div className="flow-step-3 p-3.5 bg-slate-50 dark:bg-[#0f1b3b]/70 border border-slate-100 dark:border-indigo-950/40 rounded-2xl">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span className="w-5 h-5 rounded-full bg-brand-500/15 text-brand-500 flex items-center justify-center text-[10px] font-black">3</span>
                  <span className="text-xs font-bold text-slate-855 dark:text-slate-202">Mitigation Policy Execution</span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Deploying corrective resolution: <span className="font-semibold text-emerald-500 dark:text-emerald-400">"{activeResolutionRisk.suggestedSolution}"</span>.
                </p>
              </div>

              {/* Connection Line 3 */}
              <div className="flow-line-3 flex justify-center py-0.5">
                <svg className="w-4 h-6 text-brand-500/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} strokeDasharray="4 4" className="animate-dash" d="M12 5v14" />
                </svg>
              </div>

              {/* Step 4 */}
              <div className="flow-step-4 p-3.5 bg-slate-50 dark:bg-[#0f1b3b]/70 border border-slate-100 dark:border-indigo-950/40 rounded-2xl">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center text-[10px] font-black">4</span>
                  <span className="text-xs font-bold text-slate-855 dark:text-slate-202">Reconciliation & Validation</span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Expected Outcome: <span className="text-slate-800 dark:text-slate-202 font-bold">{activeResolutionRisk.expectedImpact}</span>. Verifying signal thresholds.
                </p>
              </div>

            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800 pt-4 mt-4">
              <button 
                onClick={() => setActiveResolutionRisk(null)}
                className="px-4 py-2 border border-slate-250 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-500 dark:text-slate-400 text-xs font-bold rounded-xl"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  handleResolveRisk(activeResolutionRisk.id);
                  setActiveResolutionRisk(null);
                }}
                className="px-4 py-2 bg-gradient-to-tr from-brand-600 to-indigo-500 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5"
              >
                <CheckCircle2 size={13} />
                <span>Confirm SLA Resolution</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
export default RiskCenter;
