import React, { useState } from 'react';
import { 
  UserCheck, 
  Award, 
  Smile, 
  Search,
  Sparkles,
  Trophy,
  Flame,
  CheckCircle2,
  TrendingUp
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';
import { GlassCard } from '../components/GlassCard';
import { MOCK_EMPLOYEES, EmployeeMetric } from '../utils/mockData';

export const EmployeeDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [department, setDepartment] = useState('All');

  // Filter staff
  const filteredStaff = MOCK_EMPLOYEES.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          emp.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = department === 'All' || emp.department === department;
    return matchesSearch && matchesDept;
  });

  // Sort by goal achievement for Leaderboard ranking
  const leaderboardStaff = [...MOCK_EMPLOYEES].sort((a, b) => b.goalAchievement - a.goalAchievement);

  // Group average metrics for radar representation
  const radarData = [
    { subject: 'Productivity', A: 90, B: 85, fullMark: 100 },
    { subject: 'Efficiency', A: 89, B: 92, fullMark: 100 },
    { subject: 'Attendance', A: 97.2, B: 98, fullMark: 100 },
    { subject: 'CSAT Rating', A: 94, B: 90, fullMark: 100 },
    { subject: 'Goals Met', A: 104, B: 95, fullMark: 100 }
  ];

  return (
    <div className="space-y-6 animate-fade-in p-1">
      
      {/* High-level staff KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <GlassCard className="p-4 flex items-center justify-between border-l-4 border-l-brand-500">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Average Productivity</span>
            <span className="text-lg font-bold text-slate-800 dark:text-slate-100">90.6%</span>
            <span className="text-[9px] text-emerald-500 font-semibold block mt-0.5">+4.2% vs Q1</span>
          </div>
          <div className="bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400 p-2.5 rounded-xl">
            <TrendingUp size={18} />
          </div>
        </GlassCard>

        <GlassCard className="p-4 flex items-center justify-between border-l-4 border-l-brand-400">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Average Efficiency</span>
            <span className="text-lg font-bold text-slate-800 dark:text-slate-100">89.2%</span>
            <span className="text-[9px] text-emerald-500 font-semibold block mt-0.5">Operating standard</span>
          </div>
          <div className="bg-brand-50 text-brand-505 dark:bg-brand-950 dark:text-brand-400 p-2.5 rounded-xl">
            <UserCheck size={18} />
          </div>
        </GlassCard>

        <GlassCard className="p-4 flex items-center justify-between border-l-4 border-l-emerald-500">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Goals Met Ratio</span>
            <span className="text-lg font-bold text-emerald-500">104.2%</span>
            <span className="text-[9px] text-emerald-555 font-semibold block mt-0.5">Surpassed target threshold</span>
          </div>
          <div className="bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-405 p-2.5 rounded-xl">
            <Award size={18} />
          </div>
        </GlassCard>

        <GlassCard className="p-4 flex items-center justify-between border-l-4 border-l-indigo-400">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Team Satisfaction</span>
            <span className="text-lg font-bold text-slate-800 dark:text-slate-100">4.48/5</span>
            <span className="text-[9px] text-slate-400 font-semibold block mt-0.5">Based on Q2 internal survey</span>
          </div>
          <div className="bg-indigo-50 text-indigo-505 dark:bg-indigo-950 dark:text-indigo-400 p-2.5 rounded-xl">
            <Smile size={18} />
          </div>
        </GlassCard>
      </div>

      {/* Radar Matrix & Performance charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Staff Radar Grid */}
        <GlassCard hover={false} className="p-6">
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800/80 pb-3">
            <div>
              <h3 className="font-bold text-sm text-slate-850 dark:text-slate-100 m-0">Performance Profile Radar</h3>
              <span className="text-[10px] text-slate-400 font-semibold">Comparing Target (A) vs current average (B)</span>
            </div>
          </div>

          <div className="w-full h-56">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="#cbd5e115" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9 }} stroke="#94a3b8" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 8 }} />
                <Radar name="Operational Standard" dataKey="A" stroke="#cbd5e1" fill="#cbd5e1" fillOpacity={0.1} />
                <Radar name="Active Metrics" dataKey="B" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} />
                <Legend wrapperStyle={{ fontSize: 9 }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Goal Achievement comparative bar */}
        <GlassCard hover={false} className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800/80 pb-3">
            <div>
              <h3 className="font-bold text-sm text-slate-850 dark:text-slate-100 m-0">Staff Goal Accomplishments</h3>
              <span className="text-[10px] text-slate-400 font-semibold">Percentage achievement vs attendance rates</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-100 dark:bg-slate-950 border border-slate-205/50 dark:border-slate-800 rounded-lg text-[10px] font-bold text-slate-655 dark:text-slate-350">
              <Search size={12} className="text-slate-400" />
              <select 
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="bg-transparent border-none outline-none cursor-pointer"
              >
                <option value="All">All Departments</option>
                <option value="Sales Operations">Sales Operations</option>
                <option value="Marketing">Marketing</option>
                <option value="Customer Success">Customer Success</option>
                <option value="Logistics & Supply Chain">Logistics</option>
              </select>
            </div>
          </div>

          <div className="w-full h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredStaff.map(s => ({ name: s.name.split(' ')[0], Goals: s.goalAchievement, Attendance: s.attendanceRate }))}>
                <XAxis dataKey="name" tick={{ fontSize: 9 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 9 }} stroke="#94a3b8" />
                <Tooltip />
                <Bar dataKey="Goals" name="Goals met (%)" fill="#6366f1" radius={[3, 3, 0, 0]} />
                <Bar dataKey="Attendance" name="Attendance (%)" fill="#10b981" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      {/* Gamified Leaderboard & Detailed Directory */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Animated Leaderboard widget */}
        <GlassCard hover={false} className="p-6">
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <Trophy className="text-amber-500" size={16} />
              <div>
                <h3 className="font-bold text-sm text-slate-850 dark:text-slate-100 m-0">Goals Leaderboard</h3>
                <span className="text-[10px] text-slate-400 font-semibold">Highest goal achievers this quarter</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {leaderboardStaff.map((staff, idx) => {
              const colors = ['border-amber-500 bg-amber-50/10 text-amber-550', 'border-slate-300 bg-slate-100/30 text-slate-500', 'border-amber-700 bg-amber-700/5 text-amber-800'];
              return (
                <div key={staff.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {idx < 3 ? (
                      <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-[10px] font-bold ${colors[idx]}`}>
                        {idx + 1}
                      </span>
                    ) : (
                      <span className="w-6 text-center text-xs font-bold text-slate-400">{idx + 1}</span>
                    )}
                    <img src={staff.avatar} alt={staff.name} className="w-8 h-8 rounded-full object-cover border" />
                    <div>
                      <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-none">{staff.name}</p>
                      <span className="text-[9px] text-slate-400 block mt-1">{staff.role}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-black text-brand-600 dark:text-brand-400 block">{staff.goalAchievement}%</span>
                    <span className="text-[8px] text-slate-400 font-bold block mt-0.5">Goal Met</span>
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>

        {/* Detailed Directory search and catalog */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              Team Directory Catalog ({filteredStaff.length})
            </span>
            <div className="flex items-center gap-1.5 bg-white dark:bg-slate-950 border border-slate-205/30 px-2 py-1 rounded-xl text-[10px] w-48">
              <Search size={10} className="text-slate-400" />
              <input 
                type="text" 
                placeholder="Search staff..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent border-none outline-none w-full text-slate-700 dark:text-slate-200"
              />
            </div>
          </div>

          <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
            {filteredStaff.map(emp => (
              <GlassCard key={emp.id} className="p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img src={emp.avatar} alt={emp.name} className="w-10 h-10 rounded-full object-cover border ring-2 ring-brand-500/10" />
                    <div>
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-none">{emp.name}</p>
                      <span className="text-[10px] text-slate-400 block mt-1.5">{emp.role} &bull; <span className="font-bold">{emp.department}</span></span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6 text-center text-[10px] font-bold text-slate-500 border-t md:border-t-0 border-slate-100 dark:border-slate-800/60 pt-3.5 md:pt-0">
                    <div>
                      <span className="block text-slate-400">Productivity</span>
                      <span className="text-slate-800 dark:text-slate-200 text-xs block mt-0.5">{emp.productivity}%</span>
                    </div>
                    <div>
                      <span className="block text-slate-400">Efficiency</span>
                      <span className="text-slate-800 dark:text-slate-200 text-xs block mt-0.5">{emp.efficiency}%</span>
                    </div>
                    <div>
                      <span className="block text-slate-400">Sales Contribution</span>
                      <span className="text-brand-600 dark:text-brand-400 text-xs block mt-0.5">
                        {emp.revenueContribution > 0 ? `₹${(emp.revenueContribution / 1000).toFixed(0)}k` : '-'}
                      </span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
export default EmployeeDashboard;
