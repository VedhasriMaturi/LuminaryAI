import React, { useState, useEffect } from 'react';
import { Boxes, ShieldAlert, Cpu, CheckCircle2, AlertTriangle, Info, MapPin } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { INDUSTRY_TEMPLATES } from '../utils/industryTemplates';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface InventoryAnalyticsProps {
  activeIndustry: string;
}

export const InventoryAnalytics: React.FC<InventoryAnalyticsProps> = ({ activeIndustry }) => {
  const template = INDUSTRY_TEMPLATES[activeIndustry] || INDUSTRY_TEMPLATES.retail;
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
          title: 'Clinical Operations',
          subtitle: 'Bed allocations, diagnostic labs, and ward capacities',
          unitLabel: 'Active Clinic Areas',
          itemLabel: 'Staffing Status',
          statLabel: 'Beds occupied'
        };
      case 'restaurants':
        return {
          title: 'Kitchen & Table Operations',
          subtitle: 'Cook stations, table covers, and dispatch lines',
          unitLabel: 'Dining Sections',
          itemLabel: 'Kitchen Load',
          statLabel: 'Tables seated'
        };
      case 'manufacturing':
        return {
          title: 'Equipment & Assembly Lines',
          subtitle: 'CNC presses, SMT lines, and robotic operations',
          unitLabel: 'Fabrication Centers',
          itemLabel: 'IoT Load Factor',
          statLabel: 'OEE utilization'
        };
      case 'education':
        return {
          title: 'Campus & Lecture Capacity',
          subtitle: 'Lecture halls, laboratory desks, and asset libraries',
          unitLabel: 'STEM Lab Capacity',
          itemLabel: 'Seat occupancy',
          statLabel: 'Asset circulation'
        };
      case 'marketing':
        return {
          title: 'Agency Capacity Operations',
          subtitle: 'Creative output, campaign assets, and account managers',
          unitLabel: 'Designer Teams',
          itemLabel: 'Asset output',
          statLabel: 'Managed allocations'
        };
      case 'finance':
        return {
          title: 'Underwriting & Bank Branches',
          subtitle: 'Loan processors, checking capacity, and teller counters',
          unitLabel: 'Branch Desks',
          itemLabel: 'Approval cycle load',
          statLabel: 'Account requests'
        };
      default:
        return {
          title: 'Supply Chain & Inventory',
          subtitle: 'Distribution hubs, safety thresholds, and SKU levels',
          unitLabel: 'Logistics Warehouses',
          itemLabel: 'Warehouse capacity',
          statLabel: 'Stock utilization'
        };
    }
  };

  const terminology = getTerminology();

  // Radar data mapping operations metrics
  const radarData = template.operationalMetrics.map(item => ({
    subject: item.name.substring(0, 15),
    utilization: item.utilization,
    efficiency: item.efficiency,
    fullMark: 100
  }));

  const getStatusColor = (status: string) => {
    if (status === 'optimal') return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
    if (status === 'warning') return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
    return 'bg-red-500/10 text-red-500 border-red-500/20';
  };

  return (
    <div className="space-y-6 animate-fade-in p-1">
      
      {/* Dynamic Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1 */}
        <GlassCard hover={false} loading={isLoading} className="p-5 flex items-center gap-4">
          <div className="p-3 bg-brand-500/10 text-brand-500 rounded-2xl">
            <Cpu size={22} className="animate-spin-slow" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Operational Load Avg</span>
            <span className="text-xl font-black text-slate-800 dark:text-white mt-1 block">
              {Math.round(template.operationalMetrics.reduce((acc, m) => acc + m.utilization, 0) / template.operationalMetrics.length)}%
            </span>
          </div>
        </GlassCard>

        {/* Card 2 */}
        <GlassCard hover={false} loading={isLoading} className="p-5 flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-2xl">
            <CheckCircle2 size={22} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Average Operations Efficiency</span>
            <span className="text-xl font-black text-slate-800 dark:text-white mt-1 block">
              {Math.round(template.operationalMetrics.reduce((acc, m) => acc + m.efficiency, 0) / template.operationalMetrics.length)}%
            </span>
          </div>
        </GlassCard>

        {/* Card 3 */}
        <GlassCard hover={false} loading={isLoading} className="p-5 flex items-center gap-4">
          <div className="p-3 bg-amber-500/10 text-amber-505 rounded-2xl">
            <ShieldAlert size={22} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Safety Warning Indicators</span>
            <span className="text-xl font-black text-slate-800 dark:text-white mt-1 block">
              {template.operationalMetrics.filter(m => m.status !== 'optimal').length} active
            </span>
          </div>
        </GlassCard>

      </div>

      {/* Main Grid: Radar performance and list */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Radar efficiency map */}
        <GlassCard hover={false} loading={isLoading} className="lg:col-span-1 p-6 flex flex-col justify-between">
          <div className="border-b border-slate-100 dark:border-slate-800/80 pb-3 mb-4">
            <h4 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-widest">
              Performance Efficiency Radar
            </h4>
            <span className="text-[10px] text-slate-455">Capacity Utilization vs Quality Output Yields</span>
          </div>

          <div className="w-full h-56 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#cbd5e120" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 8, fill: '#94a3b8' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 7 }} />
                <Radar name="Utilization" dataKey="utilization" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} />
                <Radar name="Efficiency" dataKey="efficiency" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-center gap-4 text-[9px] font-bold text-slate-400 mt-4 border-t border-slate-100 dark:border-slate-800/60 pt-3">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-brand-500 inline-block"></span>Utilization</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>Efficiency</span>
          </div>
        </GlassCard>

        {/* Detailed Operations Area Table */}
        <GlassCard hover={false} loading={isLoading} className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800/80 pb-3">
            <div>
              <h3 className="font-bold text-sm text-slate-850 dark:text-slate-100 m-0 uppercase tracking-wider">
                {terminology.title}
              </h3>
              <span className="text-[10px] text-slate-400 font-semibold">
                {terminology.subtitle}
              </span>
            </div>
            <span className="text-[9px] uppercase font-bold text-brand-500 bg-brand-50 dark:bg-brand-950 px-2.5 py-1 rounded-xl">
              Capacity Monitoring Active
            </span>
          </div>

          <div className="space-y-4">
            {template.operationalMetrics.map((metric, idx) => (
              <div 
                key={idx} 
                className="p-4 bg-slate-50/50 dark:bg-slate-950/20 border border-slate-205/5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-500 flex-shrink-0">
                    <MapPin size={16} />
                  </div>
                  <div className="truncate">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-250 block truncate">
                      {metric.name}
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold mt-0.5 block">
                      Current Throughput: {metric.throughput}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-6">
                  {/* Utilization Progress bar */}
                  <div className="w-28 text-[9px] font-bold text-slate-400">
                    <div className="flex justify-between mb-1">
                      <span>Utilized</span>
                      <span>{metric.utilization}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          metric.utilization > 85 ? 'bg-red-500' : 'bg-brand-500'
                        }`} 
                        style={{ width: `${metric.utilization}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Efficiency Progress bar */}
                  <div className="w-28 text-[9px] font-bold text-slate-400">
                    <div className="flex justify-between mb-1">
                      <span>Quality Yield</span>
                      <span>{metric.efficiency}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${metric.efficiency}%` }}></div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <span className={`text-[9px] font-bold px-2.5 py-1.5 rounded-xl border uppercase tracking-wider ${getStatusColor(metric.status)}`}>
                    {metric.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

      </div>

      {/* Advisory explanation note */}
      <GlassCard hover={false} className="p-4 bg-slate-50/50 dark:bg-slate-955/20 border border-slate-205/10 flex items-start gap-3">
        <AlertTriangle size={16} className="text-indigo-405 mt-0.5 flex-shrink-0" />
        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal">
          Operations are scanned via IoT endpoints. Utilization warnings flag automatically when resources sustain averages above 85% for more than 4 consecutive hours.
        </p>
      </GlassCard>
    </div>
  );
};
export default InventoryAnalytics;
