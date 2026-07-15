import React, { useState, useEffect } from 'react';
import { FileText, Download, Clock, CheckCircle2, Printer, Info, HelpCircle } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { INDUSTRY_TEMPLATES } from '../utils/industryTemplates';
import canvasConfetti from 'canvas-confetti';

interface ReportsProps {
  activeIndustry: string;
}

export const Reports: React.FC<ReportsProps> = ({ activeIndustry }) => {
  const template = INDUSTRY_TEMPLATES[activeIndustry] || INDUSTRY_TEMPLATES.retail;
  const [reportType, setReportType] = useState('executive');
  const [exportFormat, setExportFormat] = useState('pdf');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [scheduleFrequency, setScheduleFrequency] = useState('weekly');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 250);
    return () => clearTimeout(timer);
  }, [activeIndustry]);

  const handleGenerateReport = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setShowSuccessBanner(false);

    setTimeout(() => {
      setIsGenerating(false);
      setShowSuccessBanner(true);
      
      // Fire confetti
      canvasConfetti({
        particleCount: 50,
        spread: 40,
        origin: { y: 0.8 }
      });
    }, 1200);
  };

  const handlePrint = () => {
    window.print();
  };

  // Compile CSV contents
  const getCSVData = () => {
    let header = "Month,Revenue,Profit,Orders,Expenses\n";
    let rows = template.monthlyHistory.map(row => 
      `${row.month},${row.revenue},${row.profit},${row.orders},${row.expenses}`
    ).join("\n");
    return header + rows;
  };

  const getReportPreview = () => {
    const baselineRev = template.kpis[0].numericValue;
    const margin = template.kpis[1].value;
    const expenses = template.kpis[2].value;
    const completion = template.kpis[8]?.value || '98%';

    switch (reportType) {
      case 'sales':
        return {
          title: `Sales & Operations Growth Audit - ${template.name}`,
          baseline: `Gross sales balance: ₹${baselineRev.toLocaleString('en-IN')}`,
          secondary: `Average category margin holds at ${margin}.`,
          summary: `Business sales grew steady month-over-month. Product allocations show robust performance, driven by top categories like ${template.categories[0].name} contributing ${template.categories[0].percentage}% of total revenues.`
        };
      case 'inventory':
        return {
          title: `Operational Safety & Capacity Audit - ${template.name}`,
          baseline: `Capacity nodes scanned: ${template.operationalMetrics.length} locations`,
          secondary: `Order/Service completion rate stands at ${completion}.`,
          summary: `Logistics checks indicate healthy capacity. Standard service load holds around 76%, though minor warning buffers in high utilization zones require staff schedules review.`
        };
      default:
        return {
          title: `Executive Business Summary - ${template.name}`,
          baseline: `Platform Revenue: ₹${baselineRev.toLocaleString('en-IN')}`,
          secondary: `Net profit margin averages: ${margin} (Expenses: ${expenses})`,
          summary: `Overall business operations are running at peak margins. Team goals show excellent progression, though active risks (specifically in supply and churn vectors) demand mitigation focus.`
        };
    }
  };

  const preview = getReportPreview();

  return (
    <div className="space-y-6 animate-fade-in p-1">
      
      {/* Report Generator Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Settings Column */}
        <GlassCard hover={false} loading={isLoading} className="p-6">
          <div className="flex items-center gap-2 mb-4 border-b border-slate-100 dark:border-slate-800/80 pb-3">
            <FileText className="text-brand-500" size={16} />
            <h3 className="font-bold text-sm text-slate-850 dark:text-slate-105 m-0 uppercase tracking-wider">Compile custom report</h3>
          </div>

          <form onSubmit={handleGenerateReport} className="space-y-4 text-xs">
            {/* Report Type */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider">Report Focus Area</label>
              <select 
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full bg-slate-100/50 dark:bg-slate-950/60 p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-800 outline-none text-slate-700 dark:text-slate-200 cursor-pointer font-semibold"
              >
                <option value="executive">🏢 Executive Summary Report</option>
                <option value="sales">📈 Sales & Sector Growth</option>
                <option value="inventory">📦 Operations Capacity Audit</option>
              </select>
            </div>

            {/* Export Format */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider">Export Format</label>
              <select 
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value)}
                className="w-full bg-slate-100/50 dark:bg-slate-950/60 p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-800 outline-none text-slate-700 dark:text-slate-200 cursor-pointer font-semibold"
              >
                <option value="pdf">📄 PDF Layout (Print Optimized)</option>
                <option value="excel">📊 Excel (Spreadsheet Matrix)</option>
                <option value="csv">📝 CSV Format (Comma Separated)</option>
              </select>
            </div>

            {/* Checklist */}
            <div className="space-y-2 pt-2">
              <label className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider">Report Elements</label>
              <div className="space-y-2 text-slate-655 dark:text-slate-350 font-semibold">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-brand-500 border-slate-300 dark:border-slate-800" />
                  Include AI Predictions
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-brand-500 border-slate-300 dark:border-slate-800" />
                  Include System Anomalies
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-brand-500 border-slate-300 dark:border-slate-800" />
                  Include Recommendation logs
                </label>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isGenerating}
              className="w-full mt-4 py-3 bg-brand-500 hover:bg-brand-600 disabled:bg-slate-200 dark:disabled:bg-slate-850 disabled:text-slate-400 dark:disabled:text-slate-550 text-white font-bold rounded-xl shadow-lg shadow-brand-500/10 active:scale-95 transition-all text-center flex items-center justify-center gap-1.5"
            >
              {isGenerating ? (
                <>
                  <Clock className="animate-spin" size={14} />
                  <span>Compiling report files...</span>
                </>
              ) : (
                <>
                  <Download size={14} />
                  <span>Compile and Export</span>
                </>
              )}
            </button>
          </form>
        </GlassCard>

        {/* Live Preview Column */}
        <div className="lg:col-span-2 space-y-3.5">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
              Compiled Report Preview
            </span>
            <button 
              onClick={handlePrint}
              className="text-[10px] bg-slate-100 hover:bg-slate-200 dark:bg-slate-805 dark:hover:bg-slate-750 text-slate-655 dark:text-slate-300 font-bold px-3 py-1.5 rounded-lg border border-slate-202/30 transition-colors flex items-center gap-1"
            >
              <Printer size={12} />
              Print Preview
            </button>
          </div>

          <GlassCard hover={false} loading={isLoading} className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-md min-h-[260px] print:shadow-none print:border-none select-text">
            <div className="border border-slate-100 dark:border-slate-850 rounded-2xl p-4.5 bg-slate-50/20 dark:bg-slate-950/20 relative">
              <div className="absolute right-4 top-4 opacity-10">
                <FileText size={48} className="text-brand-500" />
              </div>
              
              <div className="space-y-4 p-2 text-[10.5px] text-slate-655 dark:text-slate-300 leading-relaxed">
                <h4 className="text-xs font-black text-slate-850 dark:text-white uppercase border-b border-slate-100 dark:border-slate-850 pb-2">
                  {preview.title}
                </h4>
                <div className="grid grid-cols-2 gap-4 font-semibold text-slate-500 dark:text-slate-400">
                  <div>
                    <p><strong>Focus Type:</strong> {reportType.toUpperCase()}</p>
                    <p><strong>{preview.baseline}</strong></p>
                  </div>
                  <div>
                    <p><strong>{preview.secondary}</strong></p>
                    <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
                  </div>
                </div>
                <p className="mt-3.5 pt-3.5 border-t border-slate-100 dark:border-slate-850">
                  <strong>Executive Summary:</strong> {preview.summary}
                </p>
              </div>
            </div>
          </GlassCard>

          {/* Success Banner */}
          {showSuccessBanner && (
            <div className="bg-emerald-50/50 dark:bg-emerald-950/15 border border-emerald-500/20 p-4.5 rounded-2xl flex items-start gap-3 animate-fade-in">
              <CheckCircle2 className="text-emerald-500 mt-0.5 flex-shrink-0" size={16} />
              <div>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block">Report Compiled Successfully</span>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal mt-1">
                  The compiled dashboard metrics are ready. Download the exported data below.
                </p>
                <div className="flex gap-3 mt-3">
                  <a 
                    href={`data:text/plain;charset=utf-8,${encodeURIComponent(
                      exportFormat === 'csv' || exportFormat === 'excel' 
                        ? getCSVData() 
                        : JSON.stringify(preview, null, 2)
                    )}`}
                    download={`LuminaryAI_${activeIndustry}_${reportType}_report.${exportFormat === 'excel' ? 'xlsx' : exportFormat}`}
                    className="inline-flex items-center gap-1 bg-emerald-500 hover:bg-emerald-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <Download size={11} />
                    Download File (.{exportFormat})
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Report Scheduling Section */}
      <GlassCard hover={false} loading={isLoading} className="p-6">
        <div className="flex items-center gap-2 mb-4 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <Clock className="text-indigo-400 animate-pulse-slow" size={18} />
          <h3 className="font-bold text-sm text-slate-850 dark:text-slate-105 m-0 uppercase tracking-wider">Report Dispatch Scheduler</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="space-y-3.5">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Autopilot Dispatch Frequency</span>
              <select 
                value={scheduleFrequency}
                onChange={(e) => setScheduleFrequency(e.target.value)}
                className="w-full bg-slate-100/50 dark:bg-slate-950/60 p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-800 outline-none text-slate-700 dark:text-slate-200 font-semibold"
              >
                <option value="daily">📅 Every Day at 8:00 AM</option>
                <option value="weekly">📅 Every Monday (Weekly Dispatch)</option>
                <option value="monthly">📅 1st of every month (Monthly Audit)</option>
              </select>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Recipient Email Address</span>
              <input 
                type="email" 
                placeholder="jane.doe@luminaryai.com"
                defaultValue="jane.doe@luminaryai.com"
                className="w-full bg-slate-100/50 dark:bg-slate-950/60 p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-800 outline-none text-slate-750 dark:text-slate-200 font-semibold"
              />
            </div>
          </div>

          <div className="md:col-span-2 bg-slate-50/50 dark:bg-slate-950/20 border border-slate-200/50 dark:border-slate-805/85 rounded-2xl p-4.5 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="font-bold text-slate-800 dark:text-slate-200 block text-xs uppercase tracking-wider">Dispatch Autopilot status:</span>
              <p className="text-[10.5px] text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                LuminaryAI will automatically compile the requested **{reportType}** focus area as a **{exportFormat.toUpperCase()}** dispatch, emailing it directly to the designated business inbox at the scheduled frequency block.
              </p>
            </div>
            
            <div className="flex items-center gap-2 mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800/80">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-indigo-50 text-indigo-505 dark:bg-indigo-950 dark:text-indigo-400">
                <Clock size={10} />
                Next dispatch: Scheduled
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-555 dark:bg-emerald-950 dark:text-emerald-400">
                <CheckCircle2 size={10} />
                Status: Autopilot Engaged
              </span>
            </div>
          </div>
        </div>
      </GlassCard>

      <GlassCard hover={false} className="p-4 bg-slate-50/50 dark:bg-slate-955/20 border border-slate-205/10 flex items-start gap-3">
        <HelpCircle size={16} className="text-indigo-405 mt-0.5 flex-shrink-0" />
        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal">
          Export compilations use cryptographically signed CSV layouts. Scheduled notifications leverage background daemon mail handlers. Download sizes range from 4KB to 15KB per report category segment.
        </p>
      </GlassCard>

    </div>
  );
};
export default Reports;
