import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  AlertTriangle, 
  Sparkles, 
  Calendar, 
  MapPin,
  Tag,
  ArrowRight,
  TrendingUp,
  Brain,
  FileCheck,
  CheckCircle2,
  Info
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  BarChart,
  Bar
} from 'recharts';
import { GlassCard } from '../components/GlassCard';
import { INDUSTRY_TEMPLATES, Risk } from '../utils/industryTemplates';

interface HomeDashboardProps {
  activeIndustry: string;
  alerts: any[];
  onResolveAlert: (id: string) => void;
  setActiveTab: (tab: string) => void;
  onOpenAIChat: (initialQuery?: string) => void;
}

// Simple Animated Counter Component
const AnimatedCounter: React.FC<{ value: number; prefix?: string; suffix?: string; decimals?: number }> = ({ 
  value, 
  prefix = '', 
  suffix = '',
  decimals = 0 
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (end === 0) return;
    
    const duration = 800; // ms
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing out quadratic
      const easeProgress = progress * (2 - progress);
      const current = start + (end - start) * easeProgress;
      
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(end);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return (
    <span>
      {prefix}
      {displayValue.toLocaleString('en-IN', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      })}
      {suffix}
    </span>
  );
};

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  activeIndustry,
  alerts,
  onResolveAlert,
  setActiveTab,
  onOpenAIChat
}) => {
  const template = INDUSTRY_TEMPLATES[activeIndustry] || INDUSTRY_TEMPLATES.retail;
  const [selectedDate, setSelectedDate] = useState('Last 30 Days');
  const [selectedRegion, setSelectedRegion] = useState('All Sectors');
  const [isLoading, setIsLoading] = useState(false);

  // Trigger skeleton loading when filters change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 350);
    return () => clearTimeout(timer);
  }, [selectedRegion, selectedDate, activeIndustry]);

  const COLORS = ['#6366f1', '#3b82f6', '#10b981', '#f59e0b', '#ec4899'];

  const getPieData = () => {
    return template.categories.map(cat => ({
      name: cat.name,
      value: cat.revenue
    }));
  };

  const getTerminology = () => {
    switch (activeIndustry) {
      case 'healthcare':
        return {
          salesLabel: 'Clinic Admissions',
          regionLabel: 'Clinical Areas',
          categoryLabel: 'Specialties'
        };
      case 'restaurants':
        return {
          salesLabel: 'Dining Covers',
          regionLabel: 'Bistro Branches',
          categoryLabel: 'Menu Categories'
        };
      case 'manufacturing':
        return {
          salesLabel: 'Production Yield',
          regionLabel: 'IoT Plants',
          categoryLabel: 'Fabrication Types'
        };
      case 'education':
        return {
          salesLabel: 'Student Enrollments',
          regionLabel: 'Campus Locations',
          categoryLabel: 'Subject Tracks'
        };
      case 'marketing':
        return {
          salesLabel: 'Lead Conversions',
          regionLabel: 'Ad Channels',
          categoryLabel: 'Campaign Sectors'
        };
      case 'finance':
        return {
          salesLabel: 'Loan Approvals',
          regionLabel: 'Wealth Centers',
          categoryLabel: 'Asset Categories'
        };
      default:
        return {
          salesLabel: 'Sales Volume',
          regionLabel: 'Sales Regions',
          categoryLabel: 'Product Categories'
        };
    }
  };

  const term = getTerminology();

  // Active risks matching active industry
  const activeRisks = template.risks.filter(r => r.status === 'active');

  return (
    <div className="space-y-6 animate-fade-in p-1">
      {/* Filters and Search Bar Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white/40 dark:bg-slate-900/30 p-3.5 rounded-2xl border border-slate-200/50 dark:border-slate-800/60 backdrop-blur-md">
        <div className="flex flex-wrap items-center gap-3">
          {/* Date Filter */}
          <div className="flex items-center gap-1.5 px-3 py-2 bg-white dark:bg-slate-950 rounded-xl border border-slate-200/50 dark:border-slate-800 text-xs font-semibold text-slate-655 dark:text-slate-350">
            <Calendar size={14} className="text-slate-400" />
            <select 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-transparent border-none outline-none cursor-pointer text-slate-750 dark:text-slate-300"
            >
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="Q1 2026">Q1 2026</option>
              <option value="Q2 2026">Q2 2026</option>
              <option value="Full Year 2025">Full Year 2025</option>
            </select>
          </div>

          {/* Sector/Region Filter */}
          <div className="flex items-center gap-1.5 px-3 py-2 bg-white dark:bg-slate-950 rounded-xl border border-slate-200/50 dark:border-slate-800 text-xs font-semibold text-slate-655 dark:text-slate-350">
            <MapPin size={14} className="text-slate-400" />
            <select 
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="bg-transparent border-none outline-none cursor-pointer text-slate-750 dark:text-slate-300 font-bold"
            >
              <option value="All Sectors">All Branches / Space</option>
              {template.regionalSales.map(r => (
                <option key={r.region} value={r.region}>{r.region}</option>
              ))}
            </select>
          </div>
        </div>

        {/* AI Insight Trigger */}
        <button 
          onClick={() => onOpenAIChat(`Provide executive summary for ${template.name}`)}
          className="inline-flex items-center gap-2 bg-gradient-to-tr from-brand-600 to-indigo-500 hover:opacity-95 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-brand-500/10 active:scale-95 transition-all"
        >
          <Brain size={14} />
          <span>Ask AI Summary</span>
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {template.kpis.slice(0, 10).map((kpi) => {
          const isUp = kpi.trend === 'up';
          const isDown = kpi.trend === 'down';
          const isNeutral = kpi.trend === 'neutral';
          
          return (
            <GlassCard key={kpi.id} loading={isLoading} className="relative overflow-hidden">
              <div className="flex flex-col justify-between h-full space-y-2">
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider truncate">
                  {kpi.title}
                </span>
                
                {/* Numeric value Counter */}
                <div className="text-lg md:text-xl font-black text-slate-850 dark:text-slate-50">
                  <AnimatedCounter 
                    value={kpi.numericValue} 
                    prefix={kpi.prefix || ''} 
                    suffix={kpi.suffix || ''} 
                    decimals={kpi.numericValue < 10 && kpi.numericValue > 0 ? 2 : 0}
                  />
                </div>

                {/* Sparkline & trend indicator */}
                <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-805/60 mt-1">
                  <div className="flex items-center gap-0.5 font-bold text-[9px]">
                    {isUp && (
                      <span className="text-emerald-500 flex items-center bg-emerald-50 dark:bg-emerald-950/30 px-1 py-0.5 rounded">
                        <ArrowUpRight size={10} />
                        +{kpi.change}%
                      </span>
                    )}
                    {isDown && (
                      <span className={`flex items-center px-1 py-0.5 rounded ${
                        kpi.category === 'finance' && kpi.title.includes('Expense') || kpi.title.includes('Waste') || kpi.title.includes('Default')
                          ? 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30' // expenses down is good
                          : 'text-red-500 bg-red-50 dark:bg-red-950/30'
                      }`}>
                        <ArrowDownRight size={10} />
                        {kpi.change}%
                      </span>
                    )}
                    {isNeutral && (
                      <span className="text-slate-400 bg-slate-50 dark:bg-slate-800 px-1 py-0.5 rounded">
                        {kpi.change}%
                      </span>
                    )}
                  </div>

                  {/* sparkline */}
                  <div className="w-12 h-5">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={kpi.sparkline.map((v, i) => ({ val: v, idx: i }))}>
                        <Area 
                          type="monotone" 
                          dataKey="val" 
                          stroke={isUp ? '#10b981' : isDown ? '#ef4444' : '#94a3b8'} 
                          fill={isUp ? '#10b98110' : isDown ? '#ef444410' : '#94a3b810'} 
                          strokeWidth={1.5}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Area Chart */}
        <GlassCard hover={false} loading={isLoading} className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-805/85 pb-3">
            <div>
              <h3 className="font-bold text-sm text-slate-850 dark:text-slate-100 m-0 uppercase tracking-wider">Historical performance</h3>
              <span className="text-[10px] text-slate-455">6-Month revenue & profit margins</span>
            </div>
            <div className="flex gap-4 text-[10px] font-bold">
              <span className="flex items-center gap-1 text-slate-500"><span className="w-2.5 h-2.5 rounded-full bg-brand-500 inline-block"></span>Revenue</span>
              <span className="flex items-center gap-1 text-slate-500"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>Profit</span>
            </div>
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={template.monthlyHistory}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorProf" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontSize: 9 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 9 }} stroke="#94a3b8" />
                <Tooltip formatter={(value) => `₹${value.toLocaleString('en-IN')}`} />
                <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#6366f1" fill="url(#colorRev)" strokeWidth={2.5} />
                <Area type="monotone" dataKey="profit" name="Profit" stroke="#10b981" fill="url(#colorProf)" strokeWidth={1.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Category breakdown Pie Chart */}
        <GlassCard hover={false} loading={isLoading} className="p-6 flex flex-col justify-between">
          <div className="border-b border-slate-100 dark:border-slate-805/85 pb-3">
            <h3 className="font-bold text-sm text-slate-850 dark:text-slate-100 m-0 uppercase tracking-wider">{term.categoryLabel} distribution</h3>
            <span className="text-[10px] text-slate-455">Share of sales contribution</span>
          </div>

          <div className="w-full h-44 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={getPieData()}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {getPieData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `₹${value.toLocaleString('en-IN')}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Custom legends */}
          <div className="space-y-2 border-t border-slate-100 dark:border-slate-805/60 pt-3 text-[10px] font-semibold text-slate-500">
            {template.categories.map((cat, idx) => (
              <div key={cat.name} className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></span>
                  <span className="truncate">{cat.name}</span>
                </div>
                <span>{cat.percentage}%</span>
              </div>
            ))}
          </div>
        </GlassCard>

      </div>

      {/* Risks and Regional breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Active Risks list */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 px-1">
            <AlertTriangle size={14} className="text-red-500" />
            Active Anomalies ({activeRisks.length})
          </span>

          <GlassCard hover={false} loading={isLoading} className="p-5 flex flex-col justify-between min-h-[260px]">
            <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1">
              {activeRisks.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-[10px]">
                  <CheckCircle2 size={24} className="text-emerald-500 mx-auto mb-2" />
                  All active telemetry indicators are operating optimally.
                </div>
              ) : (
                activeRisks.slice(0, 2).map((risk) => (
                  <div key={risk.id} className="border-b border-slate-100 dark:border-slate-805 pb-3 last:border-b-0 last:pb-0 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-850 dark:text-slate-200 truncate pr-2">
                        {risk.title}
                      </span>
                      <span className="text-[8px] font-extrabold text-red-500 bg-red-500/10 px-1.5 py-0.5 rounded uppercase">
                        {risk.level}
                      </span>
                    </div>
                    <p className="text-[9.5px] text-slate-500 dark:text-slate-400 leading-normal line-clamp-2">
                      {risk.expectedImpact}
                    </p>
                    <span className="text-[8px] text-slate-400 block mt-1">{risk.timestamp}</span>
                  </div>
                ))
              )}
            </div>

            <button 
              onClick={() => setActiveTab('risks')}
              className="w-full mt-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-850 dark:hover:bg-slate-800 text-[10px] text-slate-655 dark:text-slate-350 font-bold rounded-xl border border-slate-205/30 transition-all text-center flex items-center justify-center gap-1"
            >
              <span>Audit Risk Center</span>
              <ArrowRight size={11} />
            </button>
          </GlassCard>
        </div>

        {/* Regional performance */}
        <GlassCard hover={false} loading={isLoading} className="lg:col-span-2 p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-805 pb-3">
              <h4 className="text-xs font-black text-slate-805 dark:text-slate-100 uppercase tracking-widest">
                Regional & Branch Performance
              </h4>
              <span className="text-[10px] text-slate-400 font-semibold">Active locations</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {template.regionalSales.map((region) => (
                <div key={region.region} className="p-3 bg-slate-50/50 dark:bg-slate-950/20 border border-slate-205/5 rounded-2xl flex items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block truncate">
                      {region.region}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      Covers: {region.orders} orders
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black text-slate-805 dark:text-slate-150 block">
                      ₹{region.sales.toLocaleString('en-IN')}
                    </span>
                    <span className={`text-[9px] font-bold inline-block mt-0.5 ${
                      region.growth >= 0 ? 'text-emerald-500' : 'text-red-500'
                    }`}>
                      {region.growth >= 0 ? `+${region.growth}%` : `${region.growth}%`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-805/80 flex items-start gap-1.5">
            <Info size={12} className="text-brand-500 mt-0.5 flex-shrink-0" />
            <p className="text-[8.5px] text-slate-400 leading-normal">
              Active branch details sync dynamically with local telemetric database arrays. Adjust values inside AI ChatDrawer simulation widgets.
            </p>
          </div>
        </GlassCard>

      </div>

    </div>
  );
};
export default HomeDashboard;
