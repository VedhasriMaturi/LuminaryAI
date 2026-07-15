import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Users, Calendar, Percent, ShieldCheck, MapPin, Trophy, Star, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, CartesianGrid } from 'recharts';
import { GlassCard } from '../components/GlassCard';
import { INDUSTRY_TEMPLATES } from '../utils/industryTemplates';

interface AnalyticsPageProps {
  activeIndustry: string;
}

export const AnalyticsPage: React.FC<AnalyticsPageProps> = ({ activeIndustry }) => {
  const template = INDUSTRY_TEMPLATES[activeIndustry] || INDUSTRY_TEMPLATES.retail;
  const [subTab, setSubTab] = useState<'sales' | 'finance' | 'employees'>('sales');
  const [timeframe, setTimeframe] = useState('12m');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [activeIndustry, subTab]);

  const COLORS = ['#6366f1', '#3b82f6', '#10b981', '#f59e0b', '#ec4899'];

  // 1. Sales & Category Overview Render
  const renderSalesTab = () => {
    const totalRev = template.kpis[0].numericValue;
    const salesGrowth = template.kpis[3].value;
    const itemsCompleted = template.kpis[8]?.value || '98%';

    return (
      <div className="space-y-6">
        {/* Sales summaries row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <GlassCard hover={false} className="p-4 flex items-center justify-between border-l-4 border-l-brand-500">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Gross Sales Value</span>
              <span className="text-lg font-bold text-slate-800 dark:text-slate-100">₹{totalRev.toLocaleString('en-IN')}</span>
              <span className="text-[9px] text-emerald-500 font-semibold block mt-0.5 flex items-center gap-0.5">
                <ArrowUpRight size={10} /> +{salesGrowth} YoY
              </span>
            </div>
            <div className="bg-brand-50 text-brand-605 dark:bg-brand-950 dark:text-brand-400 p-2.5 rounded-xl">
              <TrendingUp size={18} />
            </div>
          </GlassCard>

          <GlassCard hover={false} className="p-4 flex items-center justify-between border-l-4 border-l-emerald-500">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Average margin rate</span>
              <span className="text-lg font-bold text-slate-850 dark:text-slate-100">{template.kpis[1].value}</span>
              <span className="text-[9px] text-emerald-500 font-semibold block mt-0.5 flex items-center gap-0.5">
                <ArrowUpRight size={10} /> Optimal range
              </span>
            </div>
            <div className="bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 p-2.5 rounded-xl">
              <Percent size={18} />
            </div>
          </GlassCard>

          <GlassCard hover={false} className="p-4 flex items-center justify-between border-l-4 border-l-indigo-400">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Service Completion rate</span>
              <span className="text-lg font-bold text-slate-850 dark:text-slate-100">{itemsCompleted}</span>
              <span className="text-[9px] text-slate-455 font-semibold block mt-0.5">SLA achievement</span>
            </div>
            <div className="bg-indigo-50 text-indigo-505 dark:bg-indigo-950 dark:text-indigo-405 p-2.5 rounded-xl">
              <ShieldCheck size={18} />
            </div>
          </GlassCard>
        </div>

        {/* Charts: Time-Series Line & Category Bars */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <GlassCard hover={false} className="lg:col-span-2 p-6">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-805/80 pb-3">
              <div>
                <h3 className="font-bold text-sm text-slate-850 dark:text-slate-100 m-0">Revenue & Profit Margins</h3>
                <span className="text-[10px] text-slate-455">Comparative actuals curve over timeframe</span>
              </div>
            </div>

            <div className="w-full h-60">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={template.monthlyHistory}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#cbd5e115" />
                  <XAxis dataKey="month" tick={{ fontSize: 9 }} stroke="#94a3b8" />
                  <YAxis tick={{ fontSize: 9 }} stroke="#94a3b8" />
                  <Tooltip formatter={(value) => `₹${value.toLocaleString('en-IN')}`} />
                  <Line type="monotone" name="Revenue" dataKey="revenue" stroke="#6366f1" strokeWidth={2.5} activeDot={{ r: 5 }} />
                  <Line type="monotone" name="Profit" dataKey="profit" stroke="#10b981" strokeWidth={1.8} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Category progression list */}
          <GlassCard hover={false} className="p-6">
            <div className="flex items-center justify-between mb-4 border-b border-slate-105 dark:border-slate-805 pb-3">
              <div>
                <h3 className="font-bold text-sm text-slate-850 dark:text-slate-100 m-0">Sector Breakdown</h3>
                <span className="text-[10px] text-slate-455">Revenue allocation & margin parameters</span>
              </div>
            </div>

            <div className="space-y-4">
              {template.categories.map((cat, idx) => (
                <div key={cat.name} className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <span className="text-slate-700 dark:text-slate-300 truncate pr-2">{cat.name}</span>
                    <span className="text-slate-455">₹{cat.revenue.toLocaleString('en-IN')} <span className="text-[9.5px] text-emerald-555 font-bold">({cat.margin}% margin)</span></span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full" 
                      style={{ 
                        width: `${cat.percentage}%`, 
                        backgroundColor: COLORS[idx % COLORS.length] 
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    );
  };

  // 2. Finance Ledger Render
  const renderFinanceTab = () => {
    const totalRev = template.kpis[0].numericValue;
    const totalExpenses = template.kpis[2].numericValue;
    const netProfit = Math.round(totalRev * (template.kpis[1].numericValue / 100));

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <GlassCard hover={false} className="p-4 border-l-4 border-l-brand-500">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">YTD Gross Revenue</span>
            <span className="text-lg font-bold text-slate-850 dark:text-slate-100">₹{totalRev.toLocaleString('en-IN')}</span>
          </GlassCard>

          <GlassCard hover={false} className="p-4 border-l-4 border-l-brand-400">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">YTD Operational Expenses (OPEX)</span>
            <span className="text-lg font-bold text-slate-850 dark:text-slate-100">₹{totalExpenses.toLocaleString('en-IN')}</span>
          </GlassCard>

          <GlassCard hover={false} className="p-4 border-l-4 border-l-emerald-500">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">YTD Calculated Net profit</span>
            <span className="text-lg font-bold text-slate-850 dark:text-slate-100">₹{netProfit.toLocaleString('en-IN')}</span>
          </GlassCard>
        </div>

        {/* Ledger Table */}
        <GlassCard hover={false} className="p-6">
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-805 pb-3 mb-4">
            <DollarSign className="text-brand-500" size={16} />
            <h4 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-widest">
              Standard Profit & Loss Ledger Details
            </h4>
          </div>

          <div className="overflow-x-auto text-[11px] font-bold text-slate-700 dark:text-slate-300">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-850 text-slate-455 border-b border-slate-200/50 dark:border-slate-800 font-bold">
                  <th className="p-3">Ledger Section</th>
                  <th className="p-3">Cash Value</th>
                  <th className="p-3">Variance Rating</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100 dark:border-slate-800/60">
                  <td className="p-3">Gross Operating Inflows</td>
                  <td className="p-3">₹{totalRev.toLocaleString('en-IN')}</td>
                  <td className="p-3 text-emerald-500 font-bold">+14.8% YoY</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-800/60">
                  <td className="p-3">Sector Direct Cost of Service</td>
                  <td className="p-3">₹{Math.round(totalRev * 0.45).toLocaleString('en-IN')}</td>
                  <td className="p-3 text-slate-400 font-semibold">Standard bounds</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-800/60 bg-brand-500/5 font-extrabold">
                  <td className="p-3 text-brand-500">Net Calculated Profit margin</td>
                  <td className="p-3 text-brand-500">₹{netProfit.toLocaleString('en-IN')}</td>
                  <td className="p-3 text-emerald-500 font-bold">Over Target bounds</td>
                </tr>
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>
    );
  };

  // 3. Employee & Personnel Render
  const renderEmployeesTab = () => {
    // Roster lists mock
    const employees = [
      { name: 'Dr. Sarah Jenkins', role: 'Department Head', dept: 'Operations division', prod: 94, eff: 92, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
      { name: 'Marcus Vance', role: 'Shift Lead', dept: 'Service unit', prod: 82, eff: 89, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' },
      { name: 'Elena Rostova', role: 'Operations Officer', dept: 'Admin logistics', prod: 97, eff: 96, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150' }
    ];

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Radar profile */}
          <GlassCard hover={false} className="p-6 flex flex-col justify-between">
            <div className="border-b border-slate-105 dark:border-slate-805 pb-3 mb-4">
              <h4 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-widest">Target Radar</h4>
              <span className="text-[10px] text-slate-400">Comparing goal metric targets vs staff averages</span>
            </div>

            <div className="w-full h-52 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={[
                  { name: 'Efficiency', target: 90, average: 88 },
                  { name: 'Productivity', target: 85, average: 86 },
                  { name: 'Attendance', target: 95, average: 97 },
                  { name: 'CSAT Focus', target: 92, average: 91 }
                ]}>
                  <PolarGrid stroke="#cbd5e115" />
                  <PolarAngleAxis dataKey="name" tick={{ fontSize: 9, fill: '#94a3b8' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 8 }} />
                  <Radar name="Target SLA" dataKey="target" stroke="#cbd5e1" fill="#cbd5e1" fillOpacity={0.1} />
                  <Radar name="Staff Actual" dataKey="average" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Employee metrics table roster */}
          <GlassCard hover={false} className="md:col-span-2 p-6">
            <div className="flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800/80 pb-3 mb-4">
              <Users className="text-brand-500" size={16} />
              <h4 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-widest font-sans">
                Personnel & Productivity Directory
              </h4>
            </div>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {employees.map((emp, idx) => (
                <div key={idx} className="p-3.5 bg-slate-50/50 dark:bg-slate-950/20 border border-slate-205/5 rounded-2xl flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img src={emp.avatar} alt={emp.name} className="w-8 h-8 rounded-full object-cover border" />
                    <div>
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-none">{emp.name}</p>
                      <span className="text-[10px] text-slate-400 block mt-1.5">{emp.role} &bull; <span className="font-semibold">{emp.dept}</span></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-[10px] font-bold text-slate-500">
                    <div>
                      <span className="block text-slate-455 text-[9px] uppercase">Productivity</span>
                      <span className="text-slate-800 dark:text-slate-200 text-xs block mt-0.5">{emp.prod}%</span>
                    </div>
                    <div>
                      <span className="block text-slate-455 text-[9px] uppercase">Efficiency</span>
                      <span className="text-slate-800 dark:text-slate-205 text-xs block mt-0.5">{emp.eff}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in p-1">
      {/* Tab selection row */}
      <div className="flex flex-wrap items-center gap-2 bg-white/40 dark:bg-slate-900/30 p-2 rounded-2xl border border-slate-200/50 dark:border-slate-800/60 backdrop-blur-md">
        <button
          onClick={() => setSubTab('sales')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            subTab === 'sales'
              ? 'bg-brand-500 text-white shadow-md shadow-brand-500/10'
              : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          📈 Sales & Sector Overview
        </button>
        <button
          onClick={() => setSubTab('finance')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            subTab === 'finance'
              ? 'bg-brand-500 text-white shadow-md shadow-brand-500/10'
              : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          💵 Finance Ledger Matrix
        </button>
        <button
          onClick={() => setSubTab('employees')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            subTab === 'employees'
              ? 'bg-brand-500 text-white shadow-md shadow-brand-500/10'
              : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          👥 Personnel & Productivity
        </button>
      </div>

      {/* Render selected tab */}
      {isLoading ? (
        <div className="w-full h-64 flex items-center justify-center text-slate-400">
          <div className="w-6 h-6 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : subTab === 'sales' ? (
        renderSalesTab()
      ) : subTab === 'finance' ? (
        renderFinanceTab()
      ) : (
        renderEmployeesTab()
      )}
    </div>
  );
};
export default AnalyticsPage;
