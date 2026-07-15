import React from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  TrendingDown,
  PieChart as PieIcon,
  Percent,
  Calculator
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  BarChart, 
  Bar,
  CartesianGrid
} from 'recharts';
import { GlassCard } from '../components/GlassCard';
import { MONTHLY_SALES_HISTORY, MOCK_DEPARTMENTS } from '../utils/mockData';

export const FinanceDashboard: React.FC = () => {
  
  // Calculate aggregate figures
  const totalRevenue = MONTHLY_SALES_HISTORY.reduce((acc, curr) => acc + curr.revenue, 0);
  const totalExpenses = MONTHLY_SALES_HISTORY.reduce((acc, curr) => acc + curr.expenses, 0);
  const netProfit = totalRevenue - totalExpenses;
  const avgMargin = (netProfit / totalRevenue) * 100;

  const budgetPerformanceData = MOCK_DEPARTMENTS.map(d => ({
    name: d.department.substring(0, 10),
    Budget: d.budget,
    Spent: d.spent,
    remaining: d.budget - d.spent
  }));

  const profitLossSummary = [
    { label: 'Gross Operating Revenue', value: totalRevenue, change: 14.8, type: 'income' },
    { label: 'Cost of Goods Sold (COGS)', value: Math.round(totalRevenue * 0.45), change: 11.2, type: 'expense' },
    { label: 'Gross Profit', value: Math.round(totalRevenue * 0.55), change: 18.1, type: 'income' },
    { label: 'Research & Development (R&D)', value: 198000, change: 4.8, type: 'expense' },
    { label: 'Sales & Marketing Expenses', value: 251400, change: -2.3, type: 'expense' },
    { label: 'General & Administrative (G&A)', value: 125600, change: 1.5, type: 'expense' },
    { label: 'Total Operating Expenses (OPEX)', value: totalExpenses, change: -4.3, type: 'expense' },
    { label: 'Net Income / Profit Margin', value: netProfit, change: 24.2, type: 'profit' }
  ];

  return (
    <div className="space-y-6 animate-fade-in p-1">
      
      {/* Finance KPI cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <GlassCard className="p-4 flex items-center justify-between border-l-4 border-l-brand-500">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">YTD Gross Revenue</span>
            <span className="text-lg font-bold text-slate-800 dark:text-slate-100">₹{totalRevenue.toLocaleString('en-IN')}</span>
            <span className="text-[9px] text-emerald-500 font-semibold block mt-0.5 flex items-center gap-0.5">
              <ArrowUpRight size={10} /> +14.8% YoY
            </span>
          </div>
          <div className="bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400 p-2.5 rounded-xl">
            <DollarSign size={18} />
          </div>
        </GlassCard>

        <GlassCard className="p-4 flex items-center justify-between border-l-4 border-l-brand-400">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">YTD Expenses (OPEX)</span>
            <span className="text-lg font-bold text-slate-800 dark:text-slate-100">₹{totalExpenses.toLocaleString('en-IN')}</span>
            <span className="text-[9px] text-emerald-500 font-semibold block mt-0.5 flex items-center gap-0.5">
              <ArrowDownRight size={10} /> -4.3% YoY
            </span>
          </div>
          <div className="bg-brand-50 text-brand-500 dark:bg-brand-950 dark:text-brand-400 p-2.5 rounded-xl">
            <TrendingDown size={18} />
          </div>
        </GlassCard>

        <GlassCard className="p-4 flex items-center justify-between border-l-4 border-l-emerald-500">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">YTD Net profit</span>
            <span className="text-lg font-bold text-slate-800 dark:text-slate-100">₹{netProfit.toLocaleString('en-IN')}</span>
            <span className="text-[9px] text-emerald-555 font-semibold block mt-0.5 flex items-center gap-0.5">
              <ArrowUpRight size={10} /> +22.4% vs target
            </span>
          </div>
          <div className="bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 p-2.5 rounded-xl">
            <TrendingUp size={18} />
          </div>
        </GlassCard>

        <GlassCard className="p-4 flex items-center justify-between border-l-4 border-l-indigo-400">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Net margin Average</span>
            <span className="text-lg font-bold text-slate-800 dark:text-slate-100">{avgMargin.toFixed(1)}%</span>
            <span className="text-[9px] text-emerald-500 font-semibold block mt-0.5 flex items-center gap-0.5">
              <ArrowUpRight size={10} /> +2.1% YoY
            </span>
          </div>
          <div className="bg-indigo-50 text-indigo-500 dark:bg-indigo-950 dark:text-indigo-400 p-2.5 rounded-xl">
            <Percent size={18} />
          </div>
        </GlassCard>
      </div>

      {/* Cash Flow and Department Budget Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Inflow vs Outflow Cash Curves */}
        <GlassCard hover={false} className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800/80 pb-3">
            <div>
              <h3 className="font-bold text-sm text-slate-850 dark:text-slate-100 m-0">Inflows vs Outflows (Cash Flow)</h3>
              <span className="text-[10px] text-slate-400 font-semibold">Comparison of monthly receipts vs operational spending</span>
            </div>
            <div className="flex gap-4 text-[10px] font-bold">
              <span className="flex items-center gap-1 text-slate-500"><span className="w-2.5 h-2.5 rounded-full bg-brand-500 inline-block"></span>Inflow</span>
              <span className="flex items-center gap-1 text-slate-500"><span className="w-2.5 h-2.5 rounded-full bg-brand-400 inline-block"></span>Outflow</span>
            </div>
          </div>

          <div className="w-full h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MONTHLY_SALES_HISTORY}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#cbd5e115" />
                <XAxis dataKey="month" tick={{ fontSize: 9 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 9 }} stroke="#94a3b8" />
                <Tooltip formatter={(value) => `₹${value.toLocaleString('en-IN')}`} />
                <Line type="monotone" name="Inflow (Revenue)" dataKey="revenue" stroke="#6366f1" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" name="Outflow (Expenses)" dataKey="expenses" stroke="#818cf8" strokeWidth={1.5} strokeDasharray="3 3" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Budget vs Actual spent bars */}
        <GlassCard hover={false} className="p-6">
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800/80 pb-3">
            <div>
              <h3 className="font-bold text-sm text-slate-850 dark:text-slate-100 m-0">Budget Utilization</h3>
              <span className="text-[10px] text-slate-400 font-semibold">Allocated vs. spent per department</span>
            </div>
          </div>

          <div className="w-full h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={budgetPerformanceData}>
                <XAxis dataKey="name" tick={{ fontSize: 9 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 9 }} stroke="#94a3b8" />
                <Tooltip formatter={(value) => `₹${value.toLocaleString('en-IN')}`} />
                <Bar dataKey="Budget" name="Allocated Budget" fill="#cbd5e1" radius={[3, 3, 0, 0]} />
                <Bar dataKey="Spent" name="Actual Spent" fill="#6366f1" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      {/* P&L Statement Grid */}
      <GlassCard hover={false} className="p-6">
        <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <div className="flex items-center gap-2">
            <Calculator size={16} className="text-brand-500" />
            <div>
              <h3 className="font-bold text-sm text-slate-850 dark:text-slate-100 m-0">Profit & Loss (P&L) Statement Overview</h3>
              <span className="text-[10px] text-slate-400 font-semibold">Year-to-date accounting summary sheet</span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-850 text-slate-500 border-b border-slate-205/30 font-bold">
                <th className="p-3">Accounting Ledger Row</th>
                <th className="p-3">Cash Value</th>
                <th className="p-3">Account Type</th>
                <th className="p-3 text-right">YoY Variance (%)</th>
              </tr>
            </thead>
            <tbody>
              {profitLossSummary.map(row => {
                const isIncome = row.type === 'income';
                const isProfit = row.type === 'profit';
                const isExpense = row.type === 'expense';
                
                return (
                  <tr 
                    key={row.label} 
                    className={`border-b border-slate-100 dark:border-slate-800/60 last:border-b-0 font-semibold ${
                      isProfit ? 'bg-slate-50/50 dark:bg-slate-850/30 font-black' : 'text-slate-655 dark:text-slate-350'
                    }`}
                  >
                    <td className={`p-3 ${isProfit ? 'text-brand-600 dark:text-brand-400 font-bold' : ''}`}>
                      {row.label}
                    </td>
                    <td className={`p-3 ${isProfit ? 'text-brand-700 dark:text-brand-300 font-bold' : 'text-slate-800 dark:text-slate-150'}`}>
                      ₹{row.value.toLocaleString('en-IN')}
                    </td>
                    <td className="p-3">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${
                        isIncome ? 'bg-emerald-50 text-emerald-500 border-emerald-200/50' : 
                        isProfit ? 'bg-brand-50 text-brand-500 border-brand-200/50' :
                        'bg-slate-50 text-slate-500 border-slate-200/50 dark:bg-slate-800 dark:text-slate-400'
                      }`}>
                        {row.type}
                      </span>
                    </td>
                    <td className={`p-3 text-right ${row.change > 0 ? 'text-emerald-500' : 'text-danger-550'}`}>
                      {row.change > 0 ? '+' : ''}{row.change}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};
export default FinanceDashboard;
