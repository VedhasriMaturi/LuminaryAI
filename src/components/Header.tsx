import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  Sparkles, 
  Upload, 
  Sun, 
  Moon, 
  X,
  AlertTriangle,
  Info
} from 'lucide-react';
import { INDUSTRY_TEMPLATES } from '../utils/industryTemplates';

interface HeaderProps {
  activeTab: string;
  activeIndustry: string;
  userRole: 'Manager' | 'Analyst';
  setUserRole: (role: 'Manager' | 'Analyst') => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  onOpenUpload: () => void;
  onOpenAIChat: (initialQuery?: string) => void;
  onResolveAlert: (id: string) => void;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  activeIndustry,
  userRole,
  setUserRole,
  darkMode,
  setDarkMode,
  onOpenUpload,
  onOpenAIChat,
  onResolveAlert,
  setActiveTab
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch active template risks for the notification dropdown
  const template = INDUSTRY_TEMPLATES[activeIndustry] || INDUSTRY_TEMPLATES.retail;
  const activeAlerts = template.risks.filter(r => r.status === 'active');

  const getPageTitle = () => {
    switch (activeTab) {
      case 'home': return 'Home Dashboard';
      case 'analytics': return 'Advanced Analytics';
      case 'predictions': return 'Predictions & Forecasts';
      case 'risks': return 'Risk Mitigation Center';
      case 'recommendations': return 'AI Strategy Engine';
      case 'customers': return 'Customer Intelligence';
      case 'operations': return 'Operational Intelligence';
      case 'kpis': return 'KPI Leaderboard & Badges';
      case 'reports': return 'Download Center & Dispatch';
      case 'ai-assistant': return 'AI Assistant & Simulation';
      case 'settings': return 'System Settings & Profile';
      default: return 'LuminaryAI';
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Directs the global query into the AI assistant page or triggers drawer
      onOpenAIChat(searchQuery);
      setSearchQuery('');
    }
  };

  return (
    <header className="glass-panel border-b border-slate-205/50 dark:border-slate-805/50 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
      {/* Title */}
      <div>
        <h1 className="text-lg md:text-xl font-black text-slate-800 dark:text-slate-100 m-0 tracking-tight font-sans uppercase">
          {getPageTitle()}
        </h1>
        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 m-0 mt-0.5 uppercase tracking-wider">
          Active Space: {template.name}
        </p>
      </div>

      {/* Action center */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* AI search input */}
        <form onSubmit={handleSearchSubmit} className="relative hidden md:block">
          <input 
            type="text" 
            placeholder="Ask AI... e.g. 'Predict next month's sales'" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-72 bg-slate-100/60 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-900 focus:bg-white dark:focus:bg-slate-950 text-xs rounded-xl pl-9 pr-8 py-2.5 border border-slate-200/50 dark:border-slate-800 focus:border-brand-500/50 outline-none text-slate-700 dark:text-slate-200 transition-all font-semibold"
          />
          <Search size={14} className="absolute left-3.5 top-3.5 text-slate-400 dark:text-slate-500" />
          <button 
            type="submit"
            className="absolute right-2 top-2 p-1.5 rounded-lg bg-gradient-to-tr from-brand-600 to-indigo-500 text-white hover:opacity-90 active:scale-95 transition-transform"
            title="Ask AI Search"
          >
            <Sparkles size={10} />
          </button>
        </form>

        {/* Data Upload button */}
        <button 
          onClick={onOpenUpload}
          className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl bg-brand-100 hover:bg-brand-200/80 dark:bg-brand-950/40 border border-brand-200/50 dark:border-brand-900/30 text-brand-800 dark:text-brand-300 dark:hover:bg-brand-900/30 transition-all cursor-pointer"
        >
          <Upload size={14} />
          <span className="hidden sm:inline">Upload Data</span>
        </button>

        {/* Dynamic Alert Notifications */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2.5 rounded-xl bg-brand-100 hover:bg-brand-200/80 dark:bg-brand-950/40 border border-brand-200/50 dark:border-brand-900/30 text-brand-800 dark:text-brand-300 dark:hover:bg-brand-900/30 relative transition-all active:scale-95 cursor-pointer"
          >
            <Bell size={16} />
            {activeAlerts.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-[9px] font-bold ring-2 ring-white dark:ring-slate-900 animate-bounce">
                {activeAlerts.length}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200/60 dark:border-slate-800 py-2 z-50 animate-slide-up">
              <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="font-bold text-xs text-slate-805 dark:text-slate-100 uppercase tracking-wider">Active System Risks</span>
                <span className="text-[9px] bg-red-50 text-red-500 dark:bg-red-950 dark:text-red-400 font-black px-2 py-0.5 rounded-full">
                  {activeAlerts.length} Active
                </span>
              </div>
              <div className="max-h-72 overflow-y-auto">
                {activeAlerts.length === 0 ? (
                  <div className="p-6 text-center text-slate-400 dark:text-slate-550 text-[10px]">
                    <Info className="mx-auto mb-2 text-slate-350" size={24} />
                    All operating modules are optimal. No risks flagged.
                  </div>
                ) : (
                  activeAlerts.map(alert => (
                    <div 
                      key={alert.id} 
                      className="p-3 border-b border-slate-100 dark:border-slate-800 last:border-b-0 hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors"
                    >
                      <div className="flex items-start gap-2.5">
                        <AlertTriangle className="flex-shrink-0 mt-0.5 text-red-500" size={14} />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-850 dark:text-slate-200 truncate">{alert.title}</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2 leading-relaxed">{alert.expectedImpact}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-[9px] text-slate-400">{alert.timestamp}</span>
                            <button 
                              onClick={() => {
                                onResolveAlert(alert.id);
                                setShowNotifications(false);
                                setActiveTab('risks');
                              }}
                              className="text-[9px] bg-brand-500 hover:bg-brand-655 text-white font-bold px-2 py-1 rounded transition-colors"
                            >
                              Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Role switcher */}
        <div className="relative">
          <select 
            value={userRole}
            onChange={(e) => setUserRole(e.target.value as any)}
            className="bg-brand-100 hover:bg-brand-200/80 dark:bg-brand-950/40 border border-brand-200/50 dark:border-brand-900/30 text-brand-800 dark:text-brand-300 dark:hover:bg-brand-900/30 text-xs font-bold rounded-xl px-3 py-2.5 outline-none cursor-pointer transition-all"
          >
            <option value="Manager">📈 Manager</option>
            <option value="Analyst">📊 Analyst</option>
          </select>
        </div>

        {/* Light/Dark mode */}
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="p-2.5 rounded-xl bg-brand-100 hover:bg-brand-200/80 dark:bg-brand-950/40 border border-brand-200/50 dark:border-brand-900/30 text-brand-800 dark:text-brand-300 dark:hover:bg-brand-900/30 transition-all active:scale-95 cursor-pointer"
        >
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </header>
  );
};
export default Header;
