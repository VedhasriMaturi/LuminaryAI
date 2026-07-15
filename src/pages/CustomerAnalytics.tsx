import React, { useState, useEffect } from 'react';
import { Users, Search, Filter, Sparkles, Coins, Trophy, Heart, ShieldAlert } from 'lucide-react';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Cell } from 'recharts';
import { GlassCard } from '../components/GlassCard';
import { INDUSTRY_TEMPLATES } from '../utils/industryTemplates';

interface CustomerAnalyticsProps {
  activeIndustry: string;
}

export const CustomerAnalytics: React.FC<CustomerAnalyticsProps> = ({ activeIndustry }) => {
  const template = INDUSTRY_TEMPLATES[activeIndustry] || INDUSTRY_TEMPLATES.retail;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSegment, setSelectedSegment] = useState('All');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [activeIndustry]);

  // Dynamic industry terminology
  const getTerminology = () => {
    switch (activeIndustry) {
      case 'healthcare':
        return {
          title: 'Patient Intelligence',
          custLabel: 'Patient List',
          segmentLabels: ['VIP Care', 'Loyal Outpatient', 'New Admission', 'At Risk Case', 'Discharged Cases'],
          descriptions: ['Frequent specialist visits', 'Regular annual checkups', 'Admitted within 30 days', 'Missed follow-ups', 'Transferred or completed treatments']
        };
      case 'restaurants':
        return {
          title: 'Diner Intelligence',
          custLabel: 'Diner Roster',
          segmentLabels: ['VIP Diner', 'Loyal Foodie', 'New Guest', 'At Risk Diner', 'Lost Guest'],
          descriptions: ['Premium wine & main course spenders', 'Weekend regular dining profiles', 'First visit covers within 30 days', 'No bookings in 45 days', 'Inactive diners for 6 months']
        };
      case 'manufacturing':
        return {
          title: 'Client B2B Intelligence',
          custLabel: 'B2B Client List',
          segmentLabels: ['VIP Buyer', 'Loyal Account', 'New Account', 'At Risk Account', 'Inactive Account'],
          descriptions: ['High-volume metal fabrication bulk buyers', 'Regular batch ordering schedules', 'Activated within 30 days', 'Pending catalog reorders', 'Defected contracts or closed portals']
        };
      case 'education':
        return {
          title: 'Student Body Intelligence',
          custLabel: 'Student Enrollment Roster',
          segmentLabels: ['Honor Scholars', 'Stable Track', 'New Student', 'At Risk Scholar', 'Withdrawn Student'],
          descriptions: ['STEM tracks with GPA > 3.8', 'Regular course completions', 'Enrolled current semester', 'GPA < 2.0 or attendance warnings', 'Withdrawn or dropped out']
        };
      case 'marketing':
        return {
          title: 'Account Intelligence',
          custLabel: 'Agency Account List',
          segmentLabels: ['VIP Brand', 'Loyal Partner', 'New Campaign', 'At Risk Account', 'Lost Partner'],
          descriptions: ['High ad spend managed balance (> ₹100k)', 'Recurring monthly SEO contracts', 'Activated within 30 days', 'Lower CTR conversions or budget reductions', 'Canceled agreements or paused billing']
        };
      case 'finance':
        return {
          title: 'Depositor Intelligence',
          custLabel: 'Depositor Account List',
          segmentLabels: ['High Net Worth', 'Core Account', 'New Account', 'At Risk Margin', 'Closed Account'],
          descriptions: ['Assets managed > ₹500k', 'Regular deposit/checking operations', 'Opened account within 30 days', 'Overdraft flags or default alerts', 'Account closed or asset transfers']
        };
      default:
        return {
          title: 'Customer Intelligence',
          custLabel: 'Customer Profiles',
          segmentLabels: ['VIP Customer', 'Loyal Customer', 'New Customer', 'At Risk', 'Lost Account'],
          descriptions: ['High spending, frequent checkouts', 'Regular monthly purchases', 'First checkout within 30 days', 'No checkouts in 45 days', 'Inactive for 6 months']
        };
    }
  };

  const terminology = getTerminology();

  // Mock list of customers corresponding to the active industry
  const getIndustryCustomers = () => {
    const names = [
      ['Sarah Jenkins', 'admin.jane@luminaryai.com', 4850, 4.8, 94],
      ['Marcus Vance', 'marcus.v@gmail.com', 2980, 3.2, 82],
      ['Elena Rostova', 'elena.r@yandex.com', 5120, 5.1, 97],
      ['David Kim', 'david.kim@naver.com', 1450, 1.1, 35],
      ['Chloe Tremblay', 'chloe.t@yahoo.ca', 320, 1.0, 68],
      ['James Reynolds', 'jreynolds@gmail.com', 890, 0.5, 12],
      ['Aisha Bello', 'aisha.b@glowup.ng', 2410, 2.8, 79],
      ['Robert Miller', 'rmiller@verizon.net', 1100, 0.8, 40]
    ];

    return names.map(([name, email, ltv, freq, engagement], idx) => {
      // Map segments based on index
      let segment = terminology.segmentLabels[2]; // New
      if (idx === 0 || idx === 2) segment = terminology.segmentLabels[0]; // VIP
      else if (idx === 1 || idx === 6) segment = terminology.segmentLabels[1]; // Loyal
      else if (idx === 3 || idx === 7) segment = terminology.segmentLabels[3]; // At Risk
      else if (idx === 5) segment = terminology.segmentLabels[4]; // Lost

      return {
        id: `c-${idx + 1}`,
        name: name as string,
        email: email as string,
        segment,
        ltv: ltv as number,
        purchaseFrequency: freq as number,
        engagementScore: engagement as number,
        avatar: `https://images.unsplash.com/photo-${1490000000000 + idx * 100000}?w=150`
      };
    });
  };

  const customers = getIndustryCustomers();

  // Filter logic
  const filteredCustomers = customers.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSegment = selectedSegment === 'All' || c.segment === selectedSegment;
    return matchesSearch && matchesSegment;
  });

  const getSegmentColor = (segment: string) => {
    if (segment === terminology.segmentLabels[0]) return '#818cf8';
    if (segment === terminology.segmentLabels[1]) return '#34d399';
    if (segment === terminology.segmentLabels[2]) return '#60a5fa';
    if (segment === terminology.segmentLabels[3]) return '#fbbf24';
    return '#f87171';
  };

  // Funnel analysis representation
  const funnelData = [
    { stage: 'Stage 1: Awareness (Impressions)', count: activeIndustry === 'finance' ? '1.2M hits' : '120k clicks', percentage: '100%' },
    { stage: 'Stage 2: Acquisition (Visits)', count: activeIndustry === 'finance' ? '450k profiles' : '45k guests', percentage: '37.5%' },
    { stage: 'Stage 3: Activation (Engagement)', count: activeIndustry === 'finance' ? '180k active' : '18k covers', percentage: '15.0%' },
    { stage: 'Stage 4: Conversion (Transacted)', count: activeIndustry === 'finance' ? '24k portfolios' : '8.4k members', percentage: '8.4%' }
  ];

  // Cohorts Retention Matrix Mock
  const cohortData = [
    { cohort: 'Cohort Jan 2026', size: 1200, m1: 100, m2: 85, m3: 78, m4: 72, m5: 68 },
    { cohort: 'Cohort Feb 2026', size: 1150, m1: 100, m2: 82, m3: 75, m4: 69, m5: 64 },
    { cohort: 'Cohort Mar 2026', size: 1310, m1: 100, m2: 88, m3: 81, m4: 75, m5: null },
    { cohort: 'Cohort Apr 2026', size: 1340, m1: 100, m2: 84, m3: 77, m4: null, m5: null },
    { cohort: 'Cohort May 2026', size: 1410, m1: 100, m2: 86, m3: null, m4: null, m5: null }
  ];

  const getHeatmapColor = (val: number | null) => {
    if (val === null) return 'transparent';
    if (val === 100) return 'rgba(99, 102, 241, 0.4)';
    if (val >= 85) return 'rgba(99, 102, 241, 0.3)';
    if (val >= 75) return 'rgba(99, 102, 241, 0.2)';
    return 'rgba(99, 102, 241, 0.1)';
  };

  // AI generated segment summary text
  const getAISummary = () => {
    switch (activeIndustry) {
      case 'healthcare':
        return `High-yield VIP patient tiers contribute 52% of total operational claims. Attendance in ER care followups grew 3.1% YoY, but At-Risk cases reflect clinic scheduling friction.`;
      case 'restaurants':
        return `VIP Diners (beverage spenders) represent 30% of tables but 70% of gross margin. Repeat Diner retention is up, though weekend walk-in conversions dipped.`;
      case 'education':
        return `STEM online students demonstrate high course completion (94.6%). Honor Scholars segments retain 82% over semesters, while Athlete program margins are under scrutiny.`;
      case 'marketing':
        return `Social media campaign accounts contribute high billing margins. Digital lead conversions compounding monthly, but search ad CPC bids are at-risk due to competition.`;
      case 'finance':
        return `Mortgages hold 40% of B2B allocations. High Net Worth depositors contribute a core share of Assets Under Management (AUM), though personal loan default bounds are monitored.`;
      default:
        return `Premium VIP customers contribute 52% of total revenue share. Active retention curves hold at 78.5%, though shopping cart funnel conversion drops on mobile checkout Step 3.`;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in p-1">
      {/* 5 Stats columns */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {terminology.segmentLabels.map((label, idx) => {
          // Count mapping
          const count = idx === 0 || idx === 2 ? 2 : 2;
          return (
            <GlassCard key={label} className="p-4 relative overflow-hidden" hover={false} loading={isLoading}>
              <div className="flex flex-col justify-between h-full space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide truncate">{label}</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-slate-800 dark:text-slate-100">{count}</span>
                  <span className="text-[9px] text-slate-400 font-semibold">(25% base)</span>
                </div>
                <p className="text-[9px] text-slate-500 mt-1 truncate">{terminology.descriptions[idx]}</p>
                <span className="absolute right-0 bottom-0 top-0 w-1" style={{ backgroundColor: getSegmentColor(label) }}></span>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Main Charts: Scatter RFM Matrix & Conversion Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* RFM Matrix */}
        <GlassCard hover={false} loading={isLoading} className="p-6">
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800/80 pb-3">
            <div>
              <h3 className="font-bold text-sm text-slate-850 dark:text-slate-100 m-0 uppercase tracking-wider">{terminology.title} Matrix</h3>
              <span className="text-[10px] text-slate-400 font-semibold">Value (₹) vs Frequency (Bubble size: Engagement score)</span>
            </div>
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
                <XAxis type="number" dataKey="ltv" name="Value" unit="₹" tick={{ fontSize: 9 }} stroke="#94a3b8" />
                <YAxis type="number" dataKey="purchaseFrequency" name="Freq" tick={{ fontSize: 9 }} stroke="#94a3b8" />
                <ZAxis type="number" dataKey="engagementScore" range={[40, 200]} name="Engagement" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="Profiles" data={customers}>
                  {customers.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getSegmentColor(entry.segment)} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-3.5 text-[9px] font-bold text-slate-500 mt-3 border-t border-slate-100 dark:border-slate-800/60 pt-3">
            {terminology.segmentLabels.map((lbl) => (
              <div key={lbl} className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: getSegmentColor(lbl) }}></span>
                <span>{lbl}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Funnel Chart */}
        <GlassCard hover={false} loading={isLoading} className="p-6">
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800/80 pb-3">
            <div>
              <h3 className="font-bold text-sm text-slate-850 dark:text-slate-100 m-0 uppercase tracking-wider">Conversion Funnel</h3>
              <span className="text-[10px] text-slate-400 font-semibold">User acquisition & retention funnel stages</span>
            </div>
          </div>

          <div className="space-y-3.5">
            {funnelData.map((stage, idx) => {
              const widthPerc = 100 - idx * 18;
              return (
                <div key={stage.stage} className="flex items-center text-xs">
                  <span className="w-44 font-bold text-slate-500 dark:text-slate-400 text-[10px] truncate pr-2">{stage.stage}</span>
                  <div className="flex-1 h-7.5 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden relative">
                    <div 
                      className="h-full bg-gradient-to-r from-brand-600 to-indigo-500 opacity-90 rounded-lg flex items-center pl-3 text-white font-black text-[10px] shadow-sm"
                      style={{ width: `${widthPerc}%` }}
                    >
                      {stage.count}
                    </div>
                    <span className="absolute right-3 top-2 text-slate-400 dark:text-slate-500 text-[10px] font-bold">{stage.percentage}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>
      </div>

      {/* Cohort Retention & Roster List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Cohort Heatmap table */}
        <GlassCard hover={false} loading={isLoading} className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800/80 pb-3">
            <div>
              <h3 className="font-bold text-sm text-slate-850 dark:text-slate-100 m-0 uppercase tracking-wider">Cohort Retention Matrix</h3>
              <span className="text-[10px] text-slate-400 font-semibold">Monthly percentage of returning client activities</span>
            </div>
          </div>

          <div className="overflow-x-auto text-[10px] font-bold text-slate-700 dark:text-slate-300">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-850 text-slate-455 border-b border-slate-200/50 dark:border-slate-800">
                  <th className="p-2.5 text-left">Cohort Month</th>
                  <th className="p-2.5">Accounts</th>
                  <th className="p-2.5">Month 1</th>
                  <th className="p-2.5">Month 2</th>
                  <th className="p-2.5">Month 3</th>
                  <th className="p-2.5">Month 4</th>
                  <th className="p-2.5">Month 5</th>
                </tr>
              </thead>
              <tbody>
                {cohortData.map((cohort, idx) => (
                  <tr key={idx} className="border-b border-slate-100 dark:border-slate-850/60 last:border-b-0">
                    <td className="p-2.5 text-left font-bold">{cohort.cohort}</td>
                    <td className="p-2.5 text-slate-400">{cohort.size}</td>
                    <td className="p-2.5 text-slate-900 dark:text-white font-extrabold" style={{ backgroundColor: getHeatmapColor(cohort.m1) }}>{cohort.m1}%</td>
                    <td className="p-2.5 text-slate-900 dark:text-white font-extrabold" style={{ backgroundColor: getHeatmapColor(cohort.m2) }}>{cohort.m2 ? `${cohort.m2}%` : '-'}</td>
                    <td className="p-2.5 text-slate-900 dark:text-white font-extrabold" style={{ backgroundColor: getHeatmapColor(cohort.m3) }}>{cohort.m3 ? `${cohort.m3}%` : '-'}</td>
                    <td className="p-2.5 text-slate-900 dark:text-white font-extrabold" style={{ backgroundColor: getHeatmapColor(cohort.m4) }}>{cohort.m4 ? `${cohort.m4}%` : '-'}</td>
                    <td className="p-2.5 text-slate-900 dark:text-white font-extrabold" style={{ backgroundColor: getHeatmapColor(cohort.m5) }}>{cohort.m5 ? `${cohort.m5}%` : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        {/* AI Segment Summary Insights */}
        <GlassCard hover={false} loading={isLoading} className="p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800/80 pb-3">
              <Sparkles size={16} className="text-brand-500" />
              <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-105 uppercase tracking-widest">
                AI Behavior summary
              </h4>
            </div>

            <div className="p-4 bg-brand-500/5 border border-brand-500/20 rounded-2xl">
              <p className="text-[11px] text-slate-655 dark:text-slate-300 leading-relaxed font-semibold italic">
                "{getAISummary()}"
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-[9.5px] font-bold text-slate-400 uppercase block tracking-wider">
                Behavior highlights:
              </span>
              <ul className="space-y-1.5 text-[10px] text-slate-500 dark:text-slate-400 font-semibold">
                <li className="flex items-center gap-1">✨ Average Customer Lifetime Value: ₹2,850</li>
                <li className="flex items-center gap-1">✨ Customer CSAT satisfaction score: {template.kpis[9]?.value || '4.7'}</li>
                <li className="flex items-center gap-1">✨ Churn probability index down 4.2% MoM</li>
              </ul>
            </div>
          </div>

          <div className="mt-4 pt-3.5 border-t border-slate-150 dark:border-slate-805 flex items-start gap-1.5">
            <Coins size={12} className="text-indigo-400 mt-0.5 flex-shrink-0" />
            <p className="text-[9px] text-slate-450 dark:text-slate-500 leading-normal">
              Behavior indexes recalculate dynamic values when checking campaign adjustments on AI Simulation dashboards.
            </p>
          </div>
        </GlassCard>

      </div>

    </div>
  );
};
export default CustomerAnalytics;
