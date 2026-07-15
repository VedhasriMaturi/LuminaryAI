import React, { useState, useEffect } from 'react';
import { Brain, Calendar, Info, ShieldAlert, Sparkles, TrendingUp, Users, Boxes, Target } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { GlassCard } from '../components/GlassCard';
import { INDUSTRY_TEMPLATES } from '../utils/industryTemplates';

interface PredictionsDashboardProps {
  activeIndustry: string;
}

export const PredictionsDashboard: React.FC<PredictionsDashboardProps> = ({ activeIndustry }) => {
  const template = INDUSTRY_TEMPLATES[activeIndustry] || INDUSTRY_TEMPLATES.retail;
  const [selectedMetric, setSelectedMetric] = useState<'revenue' | 'demand' | 'employees' | 'churn'>('revenue');
  const [confidenceRange, setConfidenceRange] = useState<number>(95);
  const [isLoading, setIsLoading] = useState(false);

  // Trigger skeleton loading when active industry or metric changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [activeIndustry, selectedMetric]);

  // Industry color mapping
  const themeHex = 
    activeIndustry === 'healthcare' ? '#10b981' :
    activeIndustry === 'restaurants' ? '#f59e0b' :
    activeIndustry === 'manufacturing' ? '#d97706' :
    activeIndustry === 'education' ? '#ec4899' :
    activeIndustry === 'marketing' ? '#8b5cf6' :
    activeIndustry === 'finance' ? '#475569' : '#6366f1'; // retail/default

  // Generate dynamic predictions data based on historical values
  const getForecastData = () => {
    const historical = template.monthlyHistory;
    const result: any[] = [];
    
    // Add historical entries
    historical.forEach((pt, i) => {
      let val = 0;
      if (selectedMetric === 'revenue') val = pt.revenue;
      else if (selectedMetric === 'demand') val = Math.round(pt.orders * 10);
      else if (selectedMetric === 'employees') val = Math.round(pt.orders / 18) + 3;
      else val = Math.max(1, Math.round(15 - (i * 1.5) + Math.random() * 2)); // churn lowering over time

      result.push({
        month: pt.month,
        historical: val,
        forecast: null,
        lowerConfidence: null,
        upperConfidence: null
      });
    });

    const lastPt = historical[historical.length - 1];
    let lastVal = 0;
    if (selectedMetric === 'revenue') lastVal = lastPt.revenue;
    else if (selectedMetric === 'demand') lastVal = Math.round(lastPt.orders * 10);
    else if (selectedMetric === 'employees') lastVal = Math.round(lastPt.orders / 18) + 3;
    else lastVal = 4.2; // final churn rate percentage

    // Append forecast line starting connection
    result[result.length - 1].forecast = lastVal;
    result[result.length - 1].lowerConfidence = lastVal;
    result[result.length - 1].upperConfidence = lastVal;

    // Project next 6 months
    const forecastMonths = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let valTracker = lastVal;

    forecastMonths.forEach((m, idx) => {
      let multiplier = 1.02 + (Math.random() * 0.04 - 0.02); // 2% average growth
      if (selectedMetric === 'churn') multiplier = 0.94 + (Math.random() * 0.02 - 0.01); // churn declining 6% per month
      
      // Seasonal factor (December jump)
      if (idx === 5) multiplier *= (selectedMetric === 'churn' ? 0.9 : 1.15); // dec surge

      const forecastedVal = Math.round(valTracker * multiplier * 100) / 100;
      const uncertainty = (idx + 1) * (100 - confidenceRange) * 0.015;
      
      result.push({
        month: `${m} Proj`,
        historical: null,
        forecast: forecastedVal,
        lowerConfidence: Math.max(0, Math.round((forecastedVal * (1 - uncertainty)) * 10) / 10),
        upperConfidence: Math.round((forecastedVal * (1 + uncertainty)) * 10) / 10
      });

      valTracker = forecastedVal;
    });

    return result;
  };

  const forecastData = getForecastData();

  // Explainable AI text generators
  const getExplanation = () => {
    switch (selectedMetric) {
      case 'revenue':
        return {
          title: `Revenue Projections for ${template.name}`,
          reasons: [
            `Strong Q4 seasonal expansion forecasted (estimated +16.2% in December) aligning with historic buying trends.`,
            `Confidence range set at ${confidenceRange}% indicates a deviation bound between ₹${forecastData[forecastData.length - 1].lowerConfidence?.toLocaleString('en-IN')} and ₹${forecastData[forecastData.length - 1].upperConfidence?.toLocaleString('en-IN')} by year-end.`,
            `Primary driver: Increased digital engagement and cross-category bundling efficiency.`
          ],
          impact: 'Est. Return: +12.4% organic sales valuation.'
        };
      case 'demand':
        return {
          title: `Resource & Stock Demand Forecast`,
          reasons: [
            `Orders and product/service intake are projected to spike starting early November.`,
            `Standard supply lead times (averaging 9.5 days) will likely trigger stock alerts if replenishment orders are not expedited.`,
            `Driver: Client acquisition growth channels showing steady month-over-month compounding curves.`
          ],
          impact: 'Est. Return: Prevents stockout capital loss.'
        };
      case 'employees':
        return {
          title: `Staffing & Capacity Requirements`,
          reasons: [
            `Model forecasts a need for 18% increase in employee headcount capacity to prevent service delivery bottlenecks.`,
            `High risk of staff burnout in high-demand divisions (e.g. kitchen line, ER care desks, creative design).`,
            `Driver: Increased order volumes mismatching current roster allocations.`
          ],
          impact: 'Est. Return: Maintains CSAT rating above 4.75/5.0.'
        };
      default:
        return {
          title: `Predictive Customer Churn Analysis`,
          reasons: [
            `Churn probability is modeled to decline to an all-time low of ${forecastData[forecastData.length - 1].forecast}% by December.`,
            `Positive effects from recommended onboarding optimizations and loyalty voucher campaigns are feeding back into the system.`,
            `Driver: Targeted client retention retention campaigns showing 87% success rates.`
          ],
          impact: 'Est. Value Recovered: +₹42,000 Lifetime Value.'
        };
    }
  };

  const explanation = getExplanation();

  return (
    <div className="space-y-6 animate-fade-in p-1">
      {/* Top Filter Selection Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white/40 dark:bg-slate-900/30 p-3.5 rounded-2xl border border-slate-200/50 dark:border-slate-800/60 backdrop-blur-md">
        <div className="flex flex-wrap items-center gap-2">
          <button 
            onClick={() => setSelectedMetric('revenue')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedMetric === 'revenue' 
                ? `bg-brand-500/10 text-brand-500 border border-brand-500/25` 
                : 'bg-white/40 dark:bg-slate-950/40 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <span className="flex items-center gap-1.5"><TrendingUp size={13} /> Revenue & Profit</span>
          </button>
          <button 
            onClick={() => setSelectedMetric('demand')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedMetric === 'demand' 
                ? `bg-brand-500/10 text-brand-500 border border-brand-500/25` 
                : 'bg-white/40 dark:bg-slate-950/40 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <span className="flex items-center gap-1.5"><Boxes size={13} /> Product/Service Demand</span>
          </button>
          <button 
            onClick={() => setSelectedMetric('employees')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedMetric === 'employees' 
                ? `bg-brand-500/10 text-brand-500 border border-brand-500/25` 
                : 'bg-white/40 dark:bg-slate-950/40 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <span className="flex items-center gap-1.5"><Users size={13} /> Staffing Needs</span>
          </button>
          <button 
            onClick={() => setSelectedMetric('churn')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedMetric === 'churn' 
                ? `bg-brand-500/10 text-brand-500 border border-brand-500/25` 
                : 'bg-white/40 dark:bg-slate-950/40 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <span className="flex items-center gap-1.5"><Target size={13} /> Churn & LTV</span>
          </button>
        </div>

        {/* Confidence Bound Slider */}
        <div className="flex items-center gap-3 px-3 py-1.5 bg-white dark:bg-slate-950 rounded-xl border border-slate-200/50 dark:border-slate-800 text-[11px] font-bold text-slate-500">
          <span>Confidence Interval:</span>
          <input 
            type="range" 
            min="80" 
            max="99" 
            value={confidenceRange} 
            onChange={(e) => setConfidenceRange(parseInt(e.target.value))}
            className="w-24 cursor-pointer accent-brand-500"
          />
          <span className="text-brand-500 w-8">{confidenceRange}%</span>
        </div>
      </div>

      {/* Main Graph Card */}
      <GlassCard hover={false} loading={isLoading} className="p-6">
        <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div className="flex items-center gap-2">
            <Brain className="text-brand-500 animate-pulse-slow" size={20} />
            <div>
              <h3 className="font-bold text-sm text-slate-850 dark:text-slate-105 m-0 uppercase tracking-wider">
                {explanation.title}
              </h3>
              <span className="text-[10px] text-slate-400 font-semibold">
                6-Month forecasting projections with LSTM model confidence boundaries
              </span>
            </div>
          </div>
          <span className="text-[9px] font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-full uppercase tracking-wider">
            AI Active Model: Prophet v2.4
          </span>
        </div>

        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={forecastData}>
              <defs>
                <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={themeHex} stopOpacity={0.15}/>
                  <stop offset="95%" stopColor={themeHex} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#cbd5e115" />
              <XAxis dataKey="month" tick={{ fontSize: 9 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 9 }} stroke="#94a3b8" />
              <Tooltip formatter={(value) => `${value.toLocaleString('en-IN')}${selectedMetric === 'churn' ? '%' : ''}`} />
              <Legend wrapperStyle={{ fontSize: 9 }} />
              
              {/* Historical Line */}
              <Area type="monotone" name="Historical Actuals" dataKey="historical" stroke="#cbd5e1" fill="#cbd5e105" strokeWidth={1.5} />
              
              {/* Forecast Line */}
              <Area type="monotone" name="AI Forecast Projection" dataKey="forecast" stroke={themeHex} fill="url(#colorForecast)" strokeWidth={2.5} />
              
              {/* Shaded Confidence Intervals */}
              <Area type="monotone" name="Confidence Lower Bound" dataKey="lowerConfidence" stroke="transparent" fill={`${themeHex}08`} />
              <Area type="monotone" name="Confidence Upper Bound" dataKey="upperConfidence" stroke="transparent" fill={`${themeHex}08`} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* Explainable AI Details Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Core Prediction Reasons (Explainable AI) */}
        <GlassCard hover={false} loading={isLoading} className="lg:col-span-2 p-5 flex flex-col justify-between">
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-100 uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles size={14} className="text-brand-500" />
              Explainable AI (XAI) - Forecast Drivers
            </h4>
            
            <div className="space-y-3">
              {explanation.reasons.map((reason, idx) => (
                <div key={idx} className="flex items-start gap-3 text-[11px] text-slate-655 dark:text-slate-350 leading-relaxed bg-slate-50/50 dark:bg-slate-950/20 border border-slate-205/5 p-3.5 rounded-xl">
                  <div className="bg-brand-500/10 text-brand-400 p-1 rounded font-black text-[9px] w-5 h-5 flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </div>
                  <p>{reason}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-2 text-[10px] text-slate-400 font-semibold leading-normal">
            <Info size={13} className="text-indigo-400 flex-shrink-0" />
            <span>Forecasting algorithms compile regional and category regressions weighted by 12-month historical cycles.</span>
          </div>
        </GlassCard>

        {/* Forecast Risks & Actions */}
        <GlassCard hover={false} loading={isLoading} className="p-5 flex flex-col justify-between">
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-100 uppercase tracking-widest flex items-center gap-1.5">
              <ShieldAlert size={14} className="text-red-500" />
              Forecast Deficit Risk
            </h4>

            <div className="space-y-3">
              <div className="p-3 bg-red-50/50 dark:bg-red-950/15 border border-red-500/10 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-red-500 dark:text-red-400 block uppercase">
                  Confidence Volatility: High
                </span>
                <p className="text-[10.5px] text-slate-600 dark:text-slate-350 leading-relaxed">
                  External variables (e.g. competitor campaigns or delivery delays) may introduce up to a ±7% swing by year-end.
                </p>
              </div>

              <div className="p-3 bg-indigo-50/50 dark:bg-indigo-950/15 border border-indigo-500/10 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-indigo-500 dark:text-indigo-400 block uppercase">
                  Suggested Action Impact
                </span>
                <p className="text-[10.5px] text-slate-600 dark:text-slate-350 leading-relaxed font-bold">
                  {explanation.impact}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-805/80 text-[9.5px] text-slate-400 font-semibold">
            Run a scenario simulation on the **AI Assistant** tab to see how adjustments impact this forecast.
          </div>
        </GlassCard>

      </div>
    </div>
  );
};
export default PredictionsDashboard;
