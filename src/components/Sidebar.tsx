import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Users, 
  Boxes, 
  Sparkles, 
  FileText, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  BrainCircuit,
  AlertTriangle,
  Coins,
  Trophy,
  Brain,
  LogOut,
  User
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeIndustry: string;
  setActiveIndustry: (industry: 'retail' | 'restaurants' | 'healthcare' | 'manufacturing' | 'education' | 'marketing' | 'finance') => void;
  currentUser: { email: string; name: string; role: 'Manager' | 'Analyst'; avatar?: string } | null;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  setActiveTab, 
  activeIndustry, 
  setActiveIndustry,
  currentUser,
  onLogout 
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Home Dashboard', icon: LayoutDashboard },
    { id: 'analytics', label: 'Advanced Analytics', icon: TrendingUp },
    { id: 'predictions', label: 'Predictions & Forecasts', icon: BrainCircuit },
    { id: 'risks', label: 'Risk Center', icon: AlertTriangle, badge: 'System' },
    { id: 'recommendations', label: 'Recommendations', icon: Coins },
    { id: 'customers', label: 'Customer Intelligence', icon: Users },
    { id: 'operations', label: 'Operational Intel', icon: Boxes },
    { id: 'kpis', label: 'KPI Leaderboard', icon: Trophy },
    { id: 'reports', label: 'Report Center', icon: FileText },
    { id: 'ai-assistant', label: 'AI Simulation Chat', icon: Brain, badge: 'XAI' },
    { id: 'settings', label: 'Settings & Profile', icon: Settings },
  ];

  return (
    <aside 
      className={`glass-panel border-r border-slate-205/50 dark:border-slate-805/50 h-screen flex flex-col justify-between transition-all duration-300 relative z-30 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Collapse Trigger Button */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-6 -right-3.5 bg-brand-600 hover:bg-brand-700 text-white rounded-full p-1 border border-brand-500 shadow-md active:scale-95 transition-transform"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      <div className="flex-1 flex flex-col min-h-0 overflow-y-auto">
        {/* Brand Header */}
        <div className={`p-6 flex items-center gap-3 border-b border-slate-200/50 dark:border-slate-800/50 flex-shrink-0`}>
          <div className="bg-gradient-to-tr from-brand-600 to-indigo-400 p-2.5 rounded-xl shadow-indigo-500/20 shadow-md text-white flex-shrink-0 animate-pulse-slow">
            <BrainCircuit size={22} />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-brand-600 to-indigo-400 bg-clip-text text-transparent dark:from-brand-400 dark:to-indigo-300 font-sans">
                LuminaryAI
              </span>
              <span className="text-[9px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
                Decision Intelligence
              </span>
            </div>
          )}
        </div>

        {/* Industry Switcher Dropdown */}
        <div className="p-4 border-b border-slate-200/50 dark:border-slate-800/50 flex-shrink-0">
          {isCollapsed ? (
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 mx-auto" title="Switch Industry Template">
              ⚙️
            </div>
          ) : (
            <div className="relative">
              <label className="text-[9px] font-bold text-slate-405 uppercase block mb-1">Industry Template</label>
              <select 
                value={activeIndustry} 
                onChange={(e) => setActiveIndustry(e.target.value as any)}
                className="w-full bg-slate-100/50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold rounded-lg p-2 border border-slate-200/50 dark:border-slate-700/50 outline-none text-slate-750 dark:text-slate-200 cursor-pointer transition-colors"
              >
                <option value="retail">🛒 Retail & E-Commerce</option>
                <option value="restaurants">🍔 Restaurants & Bistro</option>
                <option value="healthcare">🏥 Healthcare Clinic</option>
                <option value="manufacturing">⚙️ Smart Manufacturing</option>
                <option value="education">🎓 Education & Campus</option>
                <option value="marketing">📣 Marketing Agency</option>
                <option value="finance">🏦 Banking & Finance</option>
              </select>
            </div>
          )}
        </div>

        {/* Nav Items */}
        <nav className="p-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-xs transition-all relative group ${
                  isActive 
                    ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20' 
                    : 'text-slate-550 dark:text-slate-400 hover:bg-slate-100/70 dark:hover:bg-slate-800/50 hover:text-slate-800 dark:hover:text-slate-205'
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-3 bottom-3 w-1 bg-brand-500 rounded-r-full" />
                )}
                <Icon size={16} className={isActive ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-350'} />
                
                {!isCollapsed && (
                  <span className="flex-grow text-left font-bold">{item.label}</span>
                )}
                
                {!isCollapsed && item.badge && (
                  <span className="bg-brand-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* User profile footer & Logout */}
      <div className="p-4 border-t border-slate-200/50 dark:border-slate-800/50 flex-shrink-0">
        <div className={`flex flex-col gap-2`}>
          <div className={`flex items-center gap-2.5 min-w-0 ${isCollapsed ? 'justify-center' : ''}`}>
            <img 
              src={currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"} 
              alt="Profile Avatar" 
              className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700 ring-2 ring-brand-500/20"
            />
            {!isCollapsed && (
              <div className="flex flex-col truncate">
                <span className="font-extrabold text-[11px] text-slate-800 dark:text-slate-200 truncate leading-none">
                  {currentUser?.name || 'Jane Doe'}
                </span>
                <span className="text-[8.5px] text-slate-400 dark:text-slate-550 font-bold block mt-1 uppercase">
                  {currentUser?.role || 'Admin'} Mode
                </span>
              </div>
            )}
          </div>
          
          {/* Logout Bar Button */}
          {!isCollapsed ? (
            <button 
              onClick={() => setShowConfirm(true)}
              className="w-full mt-2 flex items-center justify-center gap-2 py-2 px-3 bg-red-500/5 hover:bg-red-500/10 border border-red-500/20 hover:border-red-500/35 text-red-500 text-[10.5px] font-bold rounded-xl transition-all"
            >
              <LogOut size={12} />
              <span>Log Out Session</span>
            </button>
          ) : (
            <button 
              onClick={() => setShowConfirm(true)}
              className="w-full mt-2 flex items-center justify-center p-2 bg-red-500/5 hover:bg-red-500/10 text-red-500 rounded-xl transition-all border border-red-500/15"
              title="Log out session"
            >
              <LogOut size={13} />
            </button>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <style>{`
            @keyframes scaleIn {
              from { opacity: 0; transform: scale(0.95); }
              to { opacity: 1; transform: scale(1); }
            }
            .modal-scale-in {
              animation: scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
          `}</style>
          <div className="modal-scale-in w-full max-w-sm bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-6 text-slate-800 dark:text-slate-100 relative overflow-hidden">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
              <LogOut size={16} className="text-red-500" />
              <span>Confirm Platform Logout</span>
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mb-5">
              Are you sure you want to end your active workspace session? Unsaved progress and telemetry filters will be reset.
            </p>
            <div className="flex items-center justify-end gap-2.5">
              <button 
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 border border-slate-250 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-500 dark:text-slate-400 text-xs font-bold rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setShowConfirm(false);
                  onLogout();
                }}
                className="px-4 py-2 bg-red-500 hover:bg-red-650 text-white text-xs font-bold rounded-xl shadow-md shadow-red-500/10 transition-colors"
              >
                Confirm Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
export default Sidebar;
