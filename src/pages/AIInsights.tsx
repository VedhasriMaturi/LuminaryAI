import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  TrendingUp,
  Brain,
  AlertTriangle,
  Coins,
  ShieldCheck,
  TrendingDown,
  Info
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid 
} from 'recharts';
import { GlassCard } from '../components/GlassCard';
import { Recommendation, getAIRecommendations, generateSalesForecast } from '../utils/analyticsEngine';
import { MOCK_INVENTORY, MOCK_CUSTOMERS, MONTHLY_SALES_HISTORY, AnomalyAlert } from '../utils/mockData';
import canvasConfetti from 'canvas-confetti';

interface AIInsightsProps {
  alerts: AnomalyAlert[];
  onResolveAlert: (id: string) => void;
}

export const AIInsights: React.FC<AIInsightsProps> = ({ alerts, onResolveAlert }) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>(
    getAIRecommendations(MOCK_INVENTORY, MOCK_CUSTOMERS)
  );

  const forecastData = generateSalesForecast(MONTHLY_SALES_HISTORY, 6);
  const activeAlerts = alerts.filter(a => a.status === 'active');

  const handleResolveRec = (id: string, alertCategory?: string) => {
    setRecommendations(prev => 
      prev.map(r => r.id === id ? { ...r, resolved: true } : r)
    );

    // Trigger confetti
    canvasConfetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 }
    });

    // Also resolve associated anomaly alert if possible
    if (alertCategory) {
      const match = alerts.find(a => a.category === alertCategory && a.status === 'active');
      if (match) {
        onResolveAlert(match.id);
      }
    }
  };

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-danger-50 text-danger-500 border-danger-200/50 dark:bg-danger-950 dark:text-danger-400';
      case 'Medium': return 'bg-warning-50 text-warning-500 border-warning-200/50 dark:bg-warning-950 dark:text-warning-400';
      default: return 'bg-slate-50 text-slate-500 border-slate-200/50 dark:bg-slate-800 dark:text-slate-400';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in p-1">
      
      {/* Forecasting Section */}
      <GlassCard hover={false} className="p-6">
        <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div className="flex items-center gap-2">
            <Brain className="text-brand-600 dark:text-brand-400" size={18} />
            <div>
              <h3 className="font-bold text-sm text-slate-850 dark:text-slate-100 m-0">Predictive Sales Intelligence</h3>
              <span className="text-[10px] text-slate-400 font-semibold">6-Month sales forecasting with Prophet/ARIMA confidence intervals</span>
            </div>
          </div>
        </div>

        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#cbd5e115" />
              <XAxis dataKey="month" tick={{ fontSize: 9 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 9 }} stroke="#94a3b8" />
              <Tooltip formatter={(value) => `₹${value.toLocaleString('en-IN')}`} />
              <Legend wrapperStyle={{ fontSize: 9 }} />
              
              {/* Historical Revenue */}
              <Area type="monotone" name="Historical Revenue" dataKey="historical" stroke="#cbd5e1" fill="#cbd5e105" strokeWidth={1.5} />
              
              {/* Forecast */}
              <Area type="monotone" name="AI Forecast" dataKey="forecast" stroke="#6366f1" fill="#6366f115" strokeWidth={2.5} />
              
              {/* Shaded Confidence Intervals */}
              <Area type="monotone" name="Lower confidence bound" dataKey="lowerConfidence" stroke="transparent" fill="#818cf808" />
              <Area type="monotone" name="Upper confidence bound" dataKey="upperConfidence" stroke="transparent" fill="#818cf808" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* Recommendations & Anomalies Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recommendation Cards */}
        <div className="lg:col-span-2 space-y-3.5">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 px-1">
            <Sparkles size={14} className="text-brand-500" />
            High-Impact Recommendations
          </span>

          <div className="space-y-4">
            {recommendations.map((rec) => {
              // Map recommendation categories to mock data trigger categories for resolving
              let alertCategory = '';
              if (rec.id === 'rec-stockout') alertCategory = 'inventory';
              if (rec.id === 'rec-churn') alertCategory = 'customer';
              if (rec.id === 'rec-margin') alertCategory = 'finance';
              
              return (
                <GlassCard key={rec.id} hover={false} className="p-5 border-l-4 border-l-brand-500 relative">
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
                      <Coins size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate pr-4">
                          {rec.title}
                        </span>
                        <div className="flex gap-2">
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${getPriorityStyle(rec.priority)}`}>
                            {rec.priority} Priority
                          </span>
                          <span className="text-[9px] text-emerald-500 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full font-bold">
                            {rec.confidence}% Confidence
                          </span>
                        </div>
                      </div>

                      <p className="text-[10px] text-slate-400 font-semibold mt-1">{rec.metric}</p>
                      
                      <div className="bg-slate-50/50 dark:bg-slate-950/20 border border-slate-205/10 p-3 rounded-xl mt-3 space-y-2">
                        <p className="text-[10px] text-slate-655 dark:text-slate-350 leading-relaxed">
                          <strong>Insight:</strong> {rec.insight}
                        </p>
                        <p className="text-[10px] text-slate-655 dark:text-slate-350 leading-relaxed">
                          <strong>Recommendation:</strong> {rec.action}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-2 border-t border-slate-100 dark:border-slate-800/60">
                        <span className="text-[10px] text-emerald-555 font-bold">
                          Est. Value: +₹{rec.estimatedValue.toLocaleString('en-IN')}
                        </span>
                        
                        {rec.resolved ? (
                          <span className="inline-flex items-center gap-1 text-[10px] text-slate-400 dark:text-slate-500 font-bold">
                            <CheckCircle2 size={12} className="text-emerald-500" />
                            Executed
                          </span>
                        ) : (
                          <button
                            onClick={() => handleResolveRec(rec.id, alertCategory)}
                            className="px-3.5 py-1.5 bg-brand-500 hover:bg-brand-600 text-white rounded-lg text-[10px] font-bold transition-all shadow-md shadow-brand-500/10 active:scale-95 animate-pulse"
                          >
                            Apply Recommendation
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>

        {/* Anomaly Log list */}
        <div className="space-y-3.5">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 px-1">
            <AlertTriangle size={14} className="text-danger-500" />
            Active System Anomalies
          </span>

          <GlassCard hover={false} className="p-5 flex flex-col justify-between min-h-[300px]">
            <div className="space-y-3.5 overflow-y-auto max-h-[360px] pr-1">
              {activeAlerts.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-[10px]">
                  <ShieldCheck size={28} className="text-emerald-500 mx-auto mb-2" />
                  All active indicators are within standard operating deviation bounds.
                </div>
              ) : (
                activeAlerts.map(alert => (
                  <div key={alert.id} className="border-b border-slate-100 dark:border-slate-805/60 pb-3 last:border-b-0 last:pb-0 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 truncate pr-2" title={alert.title}>
                        {alert.title}
                      </span>
                      <span className={`text-[8px] font-bold px-1.5 rounded uppercase tracking-wider ${
                        alert.severity === 'critical' ? 'bg-danger-50 text-danger-500 dark:bg-danger-950 dark:text-danger-400' : 'bg-warning-50 text-warning-500 dark:bg-warning-950 dark:text-warning-400'
                      }`}>
                        {alert.severity}
                      </span>
                    </div>
                    <p className="text-[9.5px] text-slate-500 dark:text-slate-405 leading-relaxed line-clamp-2">
                      {alert.description}
                    </p>
                    <span className="text-[8px] text-slate-400 block mt-1">{alert.timestamp}</span>
                  </div>
                ))
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center gap-2">
              <Info size={12} className="text-brand-500 flex-shrink-0" />
              <span className="text-[9px] text-slate-400 font-semibold leading-normal">
                Anomalies are flagged automatically when data points deviate beyond ₹2.5\times₹ rolling standard deviation averages.
              </span>
            </div>
          </GlassCard>
        </div>

      </div>

    </div>
  );
};
export default AIInsights;
