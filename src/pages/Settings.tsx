import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Globe,
  Key,
  Database,
  CheckCircle2,
  Plug
} from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import canvasConfetti from 'canvas-confetti';

interface SettingsProps {
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

export const Settings: React.FC<SettingsProps> = ({ darkMode, setDarkMode }) => {
  const [apiKey, setApiKey] = useState('diq_live_948f2a1b9c3e4f7a');
  const [companyName, setCompanyName] = useState('GlobalMart HQ');
  const [currency, setCurrency] = useState('USD');
  const [isSaved, setIsSaved] = useState(false);

  const [connectedApps, setConnectedApps] = useState({
    salesforce: false,
    quickbooks: false,
    shopify: true
  });

  const handleGenerateKey = () => {
    const chars = 'abcdef0123456789';
    let result = 'diq_live_';
    for (let i = 0; i < 16; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setApiKey(result);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    
    // Trigger confetti
    canvasConfetti({
      particleCount: 50,
      spread: 40,
      origin: { y: 0.8 }
    });

    setTimeout(() => {
      setIsSaved(false);
    }, 3000);
  };

  const toggleConnection = (app: keyof typeof connectedApps) => {
    setConnectedApps(prev => ({
      ...prev,
      [app]: !prev[app]
    }));
  };

  return (
    <div className="space-y-6 animate-fade-in p-1">
      
      {/* Save Settings confirmation banner */}
      {isSaved && (
        <div className="bg-emerald-50/50 dark:bg-emerald-950/15 border border-emerald-500/20 p-4.5 rounded-2xl flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="text-emerald-500 flex-shrink-0" size={16} />
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
            System settings saved successfully. Global configuration states updated.
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Company Settings Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Details card */}
          <GlassCard hover={false} className="p-6">
            <div className="flex items-center gap-2 mb-4 border-b border-slate-100 dark:border-slate-800/80 pb-3">
              <User className="text-brand-500" size={16} />
              <h3 className="font-bold text-sm text-slate-850 dark:text-slate-100 m-0">Company Configuration</h3>
            </div>

            <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-slate-400">Organization Name</label>
                <input 
                  type="text" 
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full bg-slate-100/50 dark:bg-slate-950/60 p-2.5 rounded-xl border border-slate-205/30 outline-none text-slate-700 dark:text-slate-200 font-semibold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-slate-400">Reporting Currency</label>
                <select 
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full bg-slate-100/50 dark:bg-slate-950/60 p-2.5 rounded-xl border border-slate-205/30 outline-none text-slate-700 dark:text-slate-200 font-semibold"
                >
                  <option value="USD">USD (₹) Dollar</option>
                  <option value="EUR">EUR (€) Euro</option>
                  <option value="GBP">GBP (£) Pound</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-slate-400">Operating Country</label>
                <input 
                  type="text" 
                  defaultValue="United States"
                  className="w-full bg-slate-100/50 dark:bg-slate-950/60 p-2.5 rounded-xl border border-slate-205/30 outline-none text-slate-700 dark:text-slate-200 font-semibold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-slate-400">Default Locale Language</label>
                <select 
                  defaultValue="en-US"
                  className="w-full bg-slate-100/50 dark:bg-slate-950/60 p-2.5 rounded-xl border border-slate-205/30 outline-none text-slate-700 dark:text-slate-200 font-semibold"
                >
                  <option value="en-US">English (en-US)</option>
                  <option value="fr-FR">Français (fr-FR)</option>
                  <option value="de-DE">Deutsch (de-DE)</option>
                </select>
              </div>

              <div className="md:col-span-2 pt-2 text-right">
                <button 
                  type="submit"
                  className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl shadow-lg shadow-brand-500/10 active:scale-95 transition-all"
                >
                  Save Configuration
                </button>
              </div>
            </form>
          </GlassCard>

          {/* System Notifications Details card */}
          <GlassCard hover={false} className="p-6">
            <div className="flex items-center gap-2 mb-4 border-b border-slate-100 dark:border-slate-800/80 pb-3">
              <Bell className="text-brand-400" size={16} />
              <h3 className="font-bold text-sm text-slate-850 dark:text-slate-100 m-0">Alert Notification Triggers</h3>
            </div>

            <div className="space-y-3.5 text-xs text-slate-655 dark:text-slate-350">
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="mt-0.5 rounded text-brand-500 border-slate-300 dark:border-slate-800" />
                <div>
                  <span className="font-bold text-slate-800 dark:text-slate-250 block">Critical Inventory Warnings</span>
                  <span className="text-[10px] text-slate-400 font-semibold">Email dispatcher will trigger immediately when stock drops below 40% safety margins.</span>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="mt-0.5 rounded text-brand-500 border-slate-300 dark:border-slate-800" />
                <div>
                  <span className="font-bold text-slate-800 dark:text-slate-250 block">Operational Revenue Drops</span>
                  <span className="text-[10px] text-slate-400 font-semibold">Flag anomalies when local division revenues slide below 1.8x standard deviation averages.</span>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="mt-0.5 rounded text-brand-500 border-slate-300 dark:border-slate-800" />
                <div>
                  <span className="font-bold text-slate-800 dark:text-slate-250 block">Weekly Dispatches autopilot</span>
                  <span className="text-[10px] text-slate-400 font-semibold">Deliver printable PDF business summaries automatically every Monday morning.</span>
                </div>
              </label>
            </div>
          </GlassCard>
        </div>

        {/* Integration APIs Column */}
        <div className="space-y-6">
          {/* API keys credentials generator card */}
          <GlassCard hover={false} className="p-6">
            <div className="flex items-center gap-2 mb-4 border-b border-slate-100 dark:border-slate-800/80 pb-3">
              <Key className="text-brand-500" size={16} />
              <h3 className="font-bold text-sm text-slate-850 dark:text-slate-100 m-0">API Credentials</h3>
            </div>

            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-400">Live Client Secret Token</span>
                <div className="flex items-center gap-2 bg-slate-100/50 dark:bg-slate-950/60 p-2.5 rounded-xl border border-slate-205/30 font-mono text-[10px] text-slate-655 dark:text-slate-250">
                  <span className="flex-1 truncate">{apiKey}</span>
                </div>
              </div>

              <button 
                onClick={handleGenerateKey}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-655 dark:text-slate-300 font-bold rounded-xl border border-slate-202/30 transition-all text-center block"
              >
                Regenerate Client Token
              </button>
            </div>
          </GlassCard>

          {/* Connected applications directory checklist card */}
          <GlassCard hover={false} className="p-6">
            <div className="flex items-center gap-2 mb-4 border-b border-slate-100 dark:border-slate-800/80 pb-3">
              <Plug className="text-indigo-400" size={16} />
              <h3 className="font-bold text-sm text-slate-850 dark:text-slate-100 m-0">App Integrations</h3>
            </div>

            <div className="space-y-4 text-xs font-bold">
              {/* Shopify */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-emerald-50 text-emerald-600 dark:bg-emerald-950 p-2 rounded-lg text-sm">🛍️</div>
                  <div>
                    <span className="text-slate-800 dark:text-slate-200 block text-xs">Shopify Store API</span>
                    <span className="text-[9px] text-slate-400 font-semibold block mt-0.5">Active Syncing</span>
                  </div>
                </div>
                <button 
                  onClick={() => toggleConnection('shopify')}
                  className={`text-[9px] font-bold px-2 py-1 rounded-lg border transition-colors ${
                    connectedApps.shopify 
                      ? 'bg-emerald-50 text-emerald-500 border-emerald-202/50 dark:bg-emerald-950/30' 
                      : 'bg-slate-50 text-slate-400 border-slate-202/50 dark:bg-slate-800'
                  }`}
                >
                  {connectedApps.shopify ? 'Connected' : 'Connect'}
                </button>
              </div>

              {/* Salesforce */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-50 text-blue-500 dark:bg-blue-950 p-2 rounded-lg text-sm">☁️</div>
                  <div>
                    <span className="text-slate-800 dark:text-slate-200 block text-xs">Salesforce Sync</span>
                    <span className="text-[9px] text-slate-400 font-semibold block mt-0.5">Inactive</span>
                  </div>
                </div>
                <button 
                  onClick={() => toggleConnection('salesforce')}
                  className={`text-[9px] font-bold px-2 py-1 rounded-lg border transition-colors ${
                    connectedApps.salesforce 
                      ? 'bg-emerald-50 text-emerald-500 border-emerald-202/50 dark:bg-emerald-950/30' 
                      : 'bg-slate-50 text-slate-400 border-slate-202/50 dark:bg-slate-800'
                  }`}
                >
                  {connectedApps.salesforce ? 'Connected' : 'Connect'}
                </button>
              </div>

              {/* QuickBooks */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-amber-50 text-amber-500 dark:bg-amber-950 p-2 rounded-lg text-sm">💵</div>
                  <div>
                    <span className="text-slate-800 dark:text-slate-200 block text-xs">QuickBooks Accounts</span>
                    <span className="text-[9px] text-slate-400 font-semibold block mt-0.5">Inactive</span>
                  </div>
                </div>
                <button 
                  onClick={() => toggleConnection('quickbooks')}
                  className={`text-[9px] font-bold px-2 py-1 rounded-lg border transition-colors ${
                    connectedApps.quickbooks 
                      ? 'bg-emerald-50 text-emerald-500 border-emerald-202/50 dark:bg-emerald-950/30' 
                      : 'bg-slate-50 text-slate-400 border-slate-202/50 dark:bg-slate-800'
                  }`}
                >
                  {connectedApps.quickbooks ? 'Connected' : 'Connect'}
                </button>
              </div>
            </div>
          </GlassCard>
        </div>

      </div>

    </div>
  );
};
export default Settings;
