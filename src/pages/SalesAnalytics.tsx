import React, { useState } from 'react';
import { 
  TrendingUp, 
  ShoppingBag, 
  Percent, 
  Map, 
  Calendar,
  Layers,
  ArrowUpRight,
  TrendingDown
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  BarChart, 
  Bar, 
  Legend,
  CartesianGrid
} from 'recharts';
import { GlassCard } from '../components/GlassCard';
import { MONTHLY_SALES_HISTORY, REGIONAL_SALES, PRODUCT_CATEGORIES } from '../utils/mockData';

export const SalesAnalytics: React.FC = () => {
  const [timeframe, setTimeframe] = useState('12m');

  const filteredHistory = timeframe === '3m' 
    ? MONTHLY_SALES_HISTORY.slice(-3) 
    : timeframe === '6m' 
      ? MONTHLY_SALES_HISTORY.slice(-6) 
      : MONTHLY_SALES_HISTORY;

  const topProducts = [
    { name: 'Zenith Pro Smartwatch v3', sku: 'EL-ZEN-940', sales: 2450, growth: 18.5, revenue: 465475 },
    { name: 'Radiance Peptide Facial Serum', sku: 'BW-RAD-110', sales: 1840, growth: 22.1, revenue: 62560 },
    { name: 'ActiveFit Noise Buds', sku: 'EL-ACT-230', sales: 1520, growth: 12.4, revenue: 121580 },
    { name: 'ThermaGlow smart Heaters', sku: 'HK-THR-402', sales: 980, growth: -4.2, revenue: 117590 }
  ];

  return (
    <div className="space-y-6 animate-fade-in p-1">
      
      {/* Sales metric summaries banner */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <GlassCard className="p-4 flex items-center justify-between border-l-4 border-l-brand-500">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Total Sales</span>
            <span className="text-lg font-bold text-slate-800 dark:text-slate-100">₹1,248,390</span>
            <span className="text-[9px] text-emerald-500 font-semibold block mt-0.5 flex items-center gap-0.5">
              <ArrowUpRight size={10} /> +14.8% YoY
            </span>
          </div>
          <div className="bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400 p-2.5 rounded-xl">
            <TrendingUp size={18} />
          </div>
        </GlassCard>

        <GlassCard className="p-4 flex items-center justify-between border-l-4 border-l-brand-400">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Total Orders</span>
            <span className="text-lg font-bold text-slate-800 dark:text-slate-100">14,892</span>
            <span className="text-[9px] text-emerald-500 font-semibold block mt-0.5 flex items-center gap-0.5">
              <ArrowUpRight size={10} /> +12.2% YoY
            </span>
          </div>
          <div className="bg-brand-50 text-brand-500 dark:bg-brand-950 dark:text-brand-400 p-2.5 rounded-xl">
            <ShoppingBag size={18} />
          </div>
        </GlassCard>

        <GlassCard className="p-4 flex items-center justify-between border-l-4 border-l-emerald-500">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Gross Profit Margin</span>
            <span className="text-lg font-bold text-slate-800 dark:text-slate-100">30.6%</span>
            <span className="text-[9px] text-emerald-500 font-semibold block mt-0.5 flex items-center gap-0.5">
              <ArrowUpRight size={10} /> +1.5% MoM
            </span>
          </div>
          <div className="bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 p-2.5 rounded-xl">
            <Percent size={18} />
          </div>
        </GlassCard>

        <GlassCard className="p-4 flex items-center justify-between border-l-4 border-l-indigo-400">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Average Order Value</span>
            <span className="text-lg font-bold text-slate-800 dark:text-slate-100">₹83.82</span>
            <span className="text-[9px] text-emerald-550 font-semibold block mt-0.5 flex items-center gap-0.5">
              <ArrowUpRight size={10} /> +2.3% vs Q1
            </span>
          </div>
          <div className="bg-indigo-50 text-indigo-500 dark:bg-indigo-950 dark:text-indigo-400 p-2.5 rounded-xl">
            <Layers size={18} />
          </div>
        </GlassCard>
      </div>

      {/* Primary sales trends chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard hover={false} className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800/80 pb-3">
            <div>
              <h3 className="font-bold text-sm text-slate-850 dark:text-slate-100 m-0">Revenue & Profit Growth Curves</h3>
              <span className="text-[10px] text-slate-400 font-semibold">Comparative time-series analysis</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-100 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800 rounded-lg text-[10px] font-bold text-slate-655 dark:text-slate-350">
              <Calendar size={12} className="text-slate-400" />
              <select 
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="bg-transparent border-none outline-none cursor-pointer"
              >
                <option value="3m">3 Months</option>
                <option value="6m">6 Months</option>
                <option value="12m">12 Months</option>
              </select>
            </div>
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={filteredHistory}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#cbd5e120" />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 10 }} stroke="#94a3b8" />
                <Tooltip formatter={(value) => `₹${value.toLocaleString('en-IN')}`} />
                <Legend wrapperStyle={{ fontSize: 10 }} />
                <Line type="monotone" name="Revenue" dataKey="revenue" stroke="#6366f1" strokeWidth={2.5} activeDot={{ r: 6 }} />
                <Line type="monotone" name="Profit" dataKey="profit" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Categories performance */}
        <GlassCard hover={false} className="p-6">
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800/80 pb-3">
            <div>
              <h3 className="font-bold text-sm text-slate-850 dark:text-slate-100 m-0">Category Comparison</h3>
              <span className="text-[10px] text-slate-400 font-semibold">Sales metrics & margin ratios</span>
            </div>
          </div>

          <div className="space-y-4">
            {PRODUCT_CATEGORIES.map((cat, idx) => (
              <div key={cat.name} className="space-y-1">
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span className="text-slate-700 dark:text-slate-300">{cat.name}</span>
                  <span className="text-slate-500">₹{cat.revenue.toLocaleString('en-IN')} <span className="text-[10px] text-emerald-500 bg-emerald-50 dark:bg-emerald-950 px-1 rounded ml-1 font-semibold">{cat.margin}% margin</span></span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full" 
                    style={{ 
                      width: `${cat.percentage}%`, 
                      backgroundColor: ['#6366f1', '#3b82f6', '#10b981', '#f59e0b', '#ec4899'][idx % 5] 
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Regional sales grid & Geographic map simulation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Regional Bar Charts */}
        <GlassCard hover={false} className="p-6">
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800/80 pb-3">
            <div>
              <h3 className="font-bold text-sm text-slate-850 dark:text-slate-100 m-0">Regional Allocation</h3>
              <span className="text-[10px] text-slate-400 font-semibold">Sales vs Volume of Orders</span>
            </div>
          </div>

          <div className="w-full h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REGIONAL_SALES}>
                <XAxis dataKey="region" tick={{ fontSize: 10 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 10 }} stroke="#94a3b8" />
                <Tooltip formatter={(value) => typeof value === 'number' && value > 10000 ? `₹${value.toLocaleString('en-IN')}` : value} />
                <Bar dataKey="sales" name="Sales Revenue (₹)" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="orders" name="Order Volumes" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* World Map Layout Simulation */}
        <GlassCard hover={false} className="p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <Map size={16} className="text-brand-500" />
              <div>
                <h3 className="font-bold text-sm text-slate-850 dark:text-slate-100 m-0">Global Sales Distribution</h3>
                <span className="text-[10px] text-slate-400 font-semibold">Geographical sales density map</span>
              </div>
            </div>
          </div>

          {/* Map display */}
          <div className="relative w-full h-44 bg-indigo-50/20 dark:bg-slate-950/40 rounded-2xl border border-slate-205/30 my-4 flex items-center justify-center overflow-hidden">
            {/* Simulated background continent lines */}
            <div className="absolute inset-0 opacity-15 dark:opacity-5 flex items-center justify-center pointer-events-none select-none text-7xl font-bold font-serif text-slate-800">
              🇮🇳 INDIA DATA MAP
            </div>

            {/* Simulated Interactive Markers */}
            <div className="absolute top-1/4 left-1/4 group cursor-pointer">
              <span className="w-3.5 h-3.5 rounded-full bg-brand-500 animate-ping absolute top-0 left-0" />
              <span className="w-3.5 h-3.5 rounded-full bg-brand-500 block relative border-2 border-white dark:border-slate-900" />
              <div className="absolute left-6 -top-4 bg-white dark:bg-slate-900 shadow-md border border-slate-200/50 dark:border-slate-800 rounded-lg p-2 text-[9px] font-bold min-w-[100px] z-10 hidden group-hover:block pointer-events-none">
                <p className="text-slate-850 dark:text-slate-200">Andhra Pradesh</p>
                <p className="text-brand-650 mt-0.5">₹485,000 Sales</p>
                <p className="text-emerald-500">+12.4% Growth</p>
              </div>
            </div>

            <div className="absolute top-1/3 left-1/2 group cursor-pointer">
              <span className="w-3.5 h-3.5 rounded-full bg-blue-500 animate-ping absolute top-0 left-0" />
              <span className="w-3.5 h-3.5 rounded-full bg-blue-500 block relative border-2 border-white dark:border-slate-900" />
              <div className="absolute left-6 -top-4 bg-white dark:bg-slate-900 shadow-md border border-slate-200/50 dark:border-slate-800 rounded-lg p-2 text-[9px] font-bold min-w-[100px] z-10 hidden group-hover:block pointer-events-none">
                <p className="text-slate-850 dark:text-slate-200">Telangana</p>
                <p className="text-blue-500 mt-0.5">₹324,000 Sales</p>
                <p className="text-emerald-500">+8.2% Growth</p>
              </div>
            </div>

            <div className="absolute top-1/3 right-1/4 group cursor-pointer">
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 animate-ping absolute top-0 left-0" />
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 block relative border-2 border-white dark:border-slate-900" />
              <div className="absolute left-6 -top-4 bg-white dark:bg-slate-900 shadow-md border border-slate-200/50 dark:border-slate-800 rounded-lg p-2 text-[9px] font-bold min-w-[100px] z-10 hidden group-hover:block pointer-events-none">
                <p className="text-slate-850 dark:text-slate-200">Karnataka</p>
                <p className="text-emerald-500 mt-0.5">₹295,000 Sales</p>
                <p className="text-emerald-500">+22.8% Growth</p>
              </div>
            </div>

            <div className="absolute bottom-1/4 left-1/3 group cursor-pointer">
              <span className="w-3.5 h-3.5 rounded-full bg-danger-500 animate-ping absolute top-0 left-0" />
              <span className="w-3.5 h-3.5 rounded-full bg-danger-500 block relative border-2 border-white dark:border-slate-900" />
              <div className="absolute left-6 -top-4 bg-white dark:bg-slate-900 shadow-md border border-slate-200/50 dark:border-slate-800 rounded-lg p-2 text-[9px] font-bold min-w-[100px] z-10 hidden group-hover:block pointer-events-none">
                <p className="text-slate-850 dark:text-slate-200">Tamil Nadu</p>
                <p className="text-danger-500 mt-0.5">₹144,390 Sales</p>
                <p className="text-danger-500">-3.5% Growth</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 text-[10px] text-center font-bold text-slate-500 border-t border-slate-100 dark:border-slate-800/60 pt-3">
            {REGIONAL_SALES.map(r => (
              <div key={r.region}>
                <span className="block text-slate-400 font-semibold">{r.region.split(' ')[0]}</span>
                <span className="text-slate-700 dark:text-slate-250 block mt-0.5">₹{(r.sales / 1000).toFixed(0)}k</span>
                <span className={`text-[8.5px] font-bold ${r.growth > 0 ? 'text-emerald-500' : 'text-danger-500'}`}>
                  {r.growth > 0 ? '+' : ''}{r.growth}%
                </span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Top Best Selling Products table */}
      <GlassCard hover={false} className="p-6">
        <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div>
            <h3 className="font-bold text-sm text-slate-850 dark:text-slate-100 m-0">Performance Standouts</h3>
            <span className="text-[10px] text-slate-400 font-semibold">Leading SKU sales contributions</span>
          </div>
        </div>

        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-850 text-slate-500 border-b border-slate-200/50 dark:border-slate-800 font-bold">
                <th className="p-3">Product Name</th>
                <th className="p-3">SKU</th>
                <th className="p-3">Volume Sold</th>
                <th className="p-3">Revenue Contribution</th>
                <th className="p-3">Sales Growth</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((prod) => (
                <tr key={prod.sku} className="border-b border-slate-100 dark:border-slate-800/60 last:border-0 font-semibold text-slate-655 dark:text-slate-350">
                  <td className="p-3 text-slate-850 dark:text-slate-200">{prod.name}</td>
                  <td className="p-3 font-mono">{prod.sku}</td>
                  <td className="p-3">{prod.sales.toLocaleString('en-IN')} units</td>
                  <td className="p-3">₹{prod.revenue.toLocaleString('en-IN')}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      prod.growth > 0 
                        ? 'bg-emerald-50 text-emerald-500 dark:bg-emerald-950/30' 
                        : 'bg-danger-50 text-danger-550 dark:bg-danger-950/30'
                    }`}>
                      {prod.growth > 0 ? '+' : ''}{prod.growth}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};
export default SalesAnalytics;
