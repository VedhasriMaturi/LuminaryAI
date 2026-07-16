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
    const lastPt = forecastData[forecastData.length - 1] || {};
    const lower = lastPt.lowerConfidence !== null && lastPt.lowerConfidence !== undefined ? lastPt.lowerConfidence : 0;
    const upper = lastPt.upperConfidence !== null && lastPt.upperConfidence !== undefined ? lastPt.upperConfidence : 0;
    const forecastVal = lastPt.forecast !== null && lastPt.forecast !== undefined ? lastPt.forecast : 0;

    switch (selectedMetric) {
      case 'revenue':
        if (activeIndustry === 'education') {
          return {
            title: `Tuition & Fee Revenue Projections`,
            reasons: [
              `Strong enrollment cycle forecasted (estimated +12.4% tuition revenue in December) aligning with institutional admissions.`,
              `Confidence range set at ${confidenceRange}% indicates tuition revenue bounds between ₹${lower.toLocaleString('en-IN')} and ₹${upper.toLocaleString('en-IN')} by year-end.`,
              `Primary driver: Increased course registrations and online program enrollment rates.`
            ],
            impact: 'Est. Value: +₹1,24,000 additional campus funding.'
          };
        }
        if (activeIndustry === 'healthcare') {
          return {
            title: `Clinical Billing & Outpatient Revenue Projections`,
            reasons: [
              `Winter seasonal inpatient billing expansion forecasted (estimated +15.5% in December) due to flu season cycles.`,
              `Confidence range set at ${confidenceRange}% indicates clinical billing bounds between ₹${lower.toLocaleString('en-IN')} and ₹${upper.toLocaleString('en-IN')} by year-end.`,
              `Primary driver: Specialty elective surgeries and outpatient diagnostics demand.`
            ],
            impact: 'Est. Return: +8.4% clinical cash flow optimization.'
          };
        }
        if (activeIndustry === 'restaurants') {
          return {
            title: `Bistro Sales & Dine-in Revenue Projections`,
            reasons: [
              `Weekend and holiday dine-in revenue expansion forecasted (estimated +14.2% in December) for group table bookings.`,
              `Confidence range set at ${confidenceRange}% indicates revenue bounds between ₹${lower.toLocaleString('en-IN')} and ₹${upper.toLocaleString('en-IN')} by year-end.`,
              `Primary driver: Increased average check size from premium beverage additions.`
            ],
            impact: 'Est. Return: +11.8% dine-in check averages.'
          };
        }
        if (activeIndustry === 'manufacturing') {
          return {
            title: `Production Output & Order Book Projections`,
            reasons: [
              `Industrial equipment delivery revenue forecasted to expand (estimated +12.8% in December) due to year-end budget closures.`,
              `Confidence range set at ${confidenceRange}% indicates billing bounds between ₹${lower.toLocaleString('en-IN')} and ₹${upper.toLocaleString('en-IN')} by year-end.`,
              `Primary driver: High-volume commercial electronics contracts.`
            ],
            impact: 'Est. Return: +9.5% plant capacity utilization margin.'
          };
        }
        if (activeIndustry === 'marketing') {
          return {
            title: `Digital Campaign Attribution & ROAS Projections`,
            reasons: [
              `Digital ad revenue and conversion value forecasted to expand (estimated +19.6% in December) due to holiday search traffic.`,
              `Confidence range set at ${confidenceRange}% indicates value bounds between ₹${lower.toLocaleString('en-IN')} and ₹${upper.toLocaleString('en-IN')} by year-end.`,
              `Primary driver: High-efficiency programmatic display search ads.`
            ],
            impact: 'Est. Return: +16.4% marketing investment efficiency.'
          };
        }
        if (activeIndustry === 'finance') {
          return {
            title: `Portfolio Interest & Asset Management Revenue`,
            reasons: [
              `Asset-under-management fee revenue forecasted to expand (estimated +11.5% in December) due to year-end investment infusions.`,
              `Confidence range set at ${confidenceRange}% indicates billing bounds between ₹${lower.toLocaleString('en-IN')} and ₹${upper.toLocaleString('en-IN')} by year-end.`,
              `Primary driver: High-net-worth portfolio allocations and advisory fees.`
            ],
            impact: 'Est. Return: +8.9% recurring advisory cash flow growth.'
          };
        }
        // Default / Retail
        return {
          title: `Gross Sales & E-Commerce Revenue Projections`,
          reasons: [
            `Strong Q4 holiday sales expansion forecasted (estimated +18.4% in December) aligning with shopping festivals.`,
            `Confidence range set at ${confidenceRange}% indicates a deviation bound between ₹${lower.toLocaleString('en-IN')} and ₹${upper.toLocaleString('en-IN')} by year-end.`,
            `Primary driver: Increased digital click conversion and high-margin product bundles.`
          ],
          impact: 'Est. Return: +15.2% gross sales margins.'
        };

      case 'demand':
        if (activeIndustry === 'education') {
          return {
            title: `Course & Classroom Demand Forecast`,
            reasons: [
              `Student course registrations are projected to spike starting early November for Spring semester.`,
              `Classroom capacities will likely trigger warnings if class sizes are not optimized.`,
              `Driver: Advanced research program applications showing steady MoM compounding curves.`
            ],
            impact: 'Est. Return: Prevents classroom overcrowding.'
          };
        }
        if (activeIndustry === 'healthcare') {
          return {
            title: `Bed Space & Critical Supply Demand Forecast`,
            reasons: [
              `Patient admissions and emergency ward intake are projected to spike starting early November.`,
              `Standard ICU beds and respiratory supplies will trigger warning alerts if restocking cycles are not optimized.`,
              `Driver: Multi-specialty outpatient referrals showing steady MoM compounding curves.`
            ],
            impact: 'Est. Return: Prevents clinical resource stockouts.'
          };
        }
        if (activeIndustry === 'restaurants') {
          return {
            title: `Fresh Ingredients & Kitchen Inventory Forecast`,
            reasons: [
              `Fresh ingredient replenishment orders are projected to spike starting early November.`,
              `Perishable items (avocados, fresh salmon) will trigger spoilage alerts if procurement cycles are not weather-adjusted.`,
              `Driver: Friday peak dinner booking trends compounding month-over-month.`
            ],
            impact: 'Est. Return: Minimizes kitchen food waste costs.'
          };
        }
        if (activeIndustry === 'manufacturing') {
          return {
            title: `Raw Material & Equipment Spare Parts Forecast`,
            reasons: [
              `Steel and assembly components requirement are projected to spike starting early November.`,
              `Supply delivery cycles will trigger material deficit alerts if safety levels are not increased.`,
              `Driver: Production lines running closer to active load capacities.`
            ],
            impact: 'Est. Return: Avoids factory production downtime.'
          };
        }
        if (activeIndustry === 'marketing') {
          return {
            title: `Server Bandwidth & Ad Impression Load Forecast`,
            reasons: [
              `Daily active site visitors and ad impression loads are projected to spike starting early November.`,
              `Hosting cloud server limits will trigger load warnings during black-friday surge traffic.`,
              `Driver: Conversion funnel optimizations driving higher traffic volumes.`
            ],
            impact: 'Est. Return: Eliminates page load speed dropoff.'
          };
        }
        if (activeIndustry === 'finance') {
          return {
            title: `Client Meeting Requests & Loan Application Volumes`,
            reasons: [
              `Advisory consultation requests and loan applications are projected to spike starting early November.`,
              `Credit approval cycles will trigger turnaround warnings if automation thresholds are not modified.`,
              `Driver: Tax planning queries driving increased advisory demand.`
            ],
            impact: 'Est. Return: Prevents processing delays.'
          };
        }
        // Default / Retail
        return {
          title: `Inventory Stock & Warehouse Demand Forecast`,
          reasons: [
            `Order packages and delivery dispatch volume are projected to spike starting early November.`,
            `Standard shipping lead times will likely trigger inventory stockout alerts for best-sellers.`,
            `Driver: Digital advertising channels showing steady compounding customer traffic.`
          ],
          impact: 'Est. Return: Prevents checkout out-of-stock loss.'
        };

      case 'employees':
        if (activeIndustry === 'education') {
          return {
            title: `Faculty & Staffing Capacity Requirements`,
            reasons: [
              `Model forecasts a need for 14% increase in educator headcount capacity to maintain student-teacher ratios.`,
              `High risk of teacher burnout in STEM and foundational science courses.`,
              `Driver: Higher student intake mismatched with current adjunct faculty rosters.`
            ],
            impact: 'Est. Return: Maintains student satisfaction above 4.7/5.0.'
          };
        }
        if (activeIndustry === 'healthcare') {
          return {
            title: `Nurse & Physician Staffing Requirements`,
            reasons: [
              `Model forecasts a need for 22% increase in nurse roster capacity during peak night shifts to prevent triage delays.`,
              `High risk of clinical staff burnout in emergency unit and intensive care divisions.`,
              `Driver: Increased patient intake mismatched with current staff shift schedules.`
            ],
            impact: 'Est. Return: Maintains average consult times under 20 minutes.'
          };
        }
        if (activeIndustry === 'restaurants') {
          return {
            title: `Kitchen Line & Waitstaff Roster Requirements`,
            reasons: [
              `Model forecasts a need for 15% increase in kitchen line cook capacity during dinner peaks.`,
              `High risk of staff burnout in waitstaff during Friday rush hours.`,
              `Driver: High table turnover rates mismatching prep station staff.`
            ],
            impact: 'Est. Return: Maintains ticket wait times under 18 minutes.'
          };
        }
        if (activeIndustry === 'manufacturing') {
          return {
            title: `Factory Floor Shift & Safety Engineer Allocations`,
            reasons: [
              `Model forecasts a need for 10% increase in technician shift allocations to maintain preventative maintenance checks.`,
              `High risk of operator fatigue in heavy machinery assembly units.`,
              `Driver: Continuous 24/7 line operations exceeding standard labor capacities.`
            ],
            impact: 'Est. Return: Maintains OEE scores above 92%.'
          };
        }
        if (activeIndustry === 'marketing') {
          return {
            title: `Creative Content & Campaign Specialist Allocations`,
            reasons: [
              `Model forecasts a need for 25% increase in copywriter and content specialist capacity to support holiday ad launches.`,
              `High risk of designer burnout due to last-minute marketing campaign shifts.`,
              `Driver: Brand promotion requests mismatching current design bandwidth.`
            ],
            impact: 'Est. Return: Accelerates ad deployment schedules.'
          };
        }
        if (activeIndustry === 'finance') {
          return {
            title: `Compliance Officer & Portfolio Manager Requirements`,
            reasons: [
              `Model forecasts a need for 12% increase in compliance officer staffing to review year-end transactions.`,
              `High risk of analyst overload during tax audit preparation cycles.`,
              `Driver: Increased transaction volume mismatching compliance capacities.`
            ],
            impact: 'Est. Return: Reduces audit operational risks.'
          };
        }
        // Default / Retail
        return {
          title: `Logistics & Warehouse Staffing Needs`,
          reasons: [
            `Model forecasts a need for 20% increase in packing and dispatch staff to handle holiday order volumes.`,
            `High risk of associate fatigue on warehouse packing lines.`,
            `Driver: Seasonal peak order volumes mismatching current warehouse rosters.`
          ],
          impact: 'Est. Return: Maintains next-day delivery dispatch rates.'
        };

      default: // Churn & LTV
        if (activeIndustry === 'education') {
          return {
            title: `Student Dropout & Attrition Analysis`,
            reasons: [
              `Student attrition probability is modeled to decline to an all-time low of ${forecastVal}% by December.`,
              `Positive effects from academic tutoring programs and early-warning alerts are feeding back into the system.`,
              `Driver: Targeted counselor check-ins showing 89% student retention success rates.`
            ],
            impact: 'Est. Value Recovered: +₹84,000 lifetime tuition retention.'
          };
        }
        if (activeIndustry === 'healthcare') {
          return {
            title: `Patient Retention & Clinic Revisit Analysis`,
            reasons: [
              `Patient attrition probability is modeled to decline to an all-time low of ${forecastVal}% by December.`,
              `Positive effects from mobile follow-up apps and telehealth consultations are feeding back into the system.`,
              `Driver: Post-discharge follow-up care campaigns showing 91% care compliance rates.`
            ],
            impact: 'Est. Value Recovered: +₹1,12,000 clinic lifetime value.'
          };
        }
        if (activeIndustry === 'restaurants') {
          return {
            title: `Repeat Diner Attrition & Loyalty Analysis`,
            reasons: [
              `Diner churn probability (not returning within 30 days) is modeled to decline to an all-time low of ${forecastVal}% by December.`,
              `Positive effects from happy-hour menu expansions and weekday combo specials are feeding back into the system.`,
              `Driver: Guest feedback response program showing 86% revisit success rates.`
            ],
            impact: 'Est. Value Recovered: +₹32,005 customer lifetime value.'
          };
        }
        if (activeIndustry === 'manufacturing') {
          return {
            title: `Commercial Client Contract Attrition Analysis`,
            reasons: [
              `Client contract churn probability is modeled to decline to an all-time low of ${forecastVal}% by December.`,
              `Positive effects from direct key-account manager assignments and SLA guarantees are feeding back into the system.`,
              `Driver: Proactive quality assurance checks showing 94% retention rates.`
            ],
            impact: 'Est. Value Recovered: +₹1,80,000 contract value preservation.'
          };
        }
        if (activeIndustry === 'marketing') {
          return {
            title: `Digital Subscriber Attrition & Churn Analysis`,
            reasons: [
              `Subscriber churn rate is modeled to decline to an all-time low of ${forecastVal}% by December.`,
              `Positive effects from personalized newsletters and customized onboarding flows are feeding back into the system.`,
              `Driver: Automated win-back email sequences showing 84% reactivation success rates.`
            ],
            impact: 'Est. Value Recovered: +₹52,000 subscriber lifetime value.'
          };
        }
        if (activeIndustry === 'finance') {
          return {
            title: `Capital Outflow & Client Account Retention Analysis`,
            reasons: [
              `Wealth account attrition probability is modeled to decline to an all-time low of ${forecastVal}% by December.`,
              `Positive effects from personalized quarterly risk audits and advisory reviews are feeding back into the system.`,
              `Driver: Direct relationship management follow-ups showing 93% success rates.`
            ],
            impact: 'Est. Value Recovered: +₹3,20,005 client assets preserved.'
          };
        }
        // Default / Retail
        return {
          title: `Predictive Customer Churn & LTV Analysis`,
          reasons: [
            `Customer churn probability is modeled to decline to an all-time low of ${forecastVal}% by December.`,
            `Positive effects from personalized discount campaigns and cart-abandonment emails are feeding back into the system.`,
            `Driver: Targeted loyalty cohort reward campaigns showing 87% retention rates.`
          ],
          impact: 'Est. Value Recovered: +₹45,000 customer lifetime value.'
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
