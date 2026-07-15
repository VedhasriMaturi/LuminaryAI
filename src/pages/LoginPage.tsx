import React, { useState } from 'react';
import { Lock, Mail, BrainCircuit, Sparkles, Shield, User, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface LoginPageProps {
  onLogin: (email: string, name: string, role: 'Manager' | 'Analyst') => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'Manager' | 'Analyst'>('Manager');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all credentials fields.');
      return;
    }
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      // Derive display name from email prefix
      const name = email.split('@')[0]
        .replace(/[._]/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());
      onLogin(email, name || 'Jane Doe', role);
    }, 1200);
  };

  const handleQuickDemo = (demoRole: 'Manager' | 'Analyst') => {
    setRole(demoRole);
    if (demoRole === 'Manager') {
      setEmail('manager.alex@luminaryai.com');
      setPassword('manager1234');
    } else {
      setEmail('analyst.sam@luminaryai.com');
      setPassword('analyst1234');
    }
    setError('');
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin('google.user@luminaryai.com', 'Google User', 'Manager');
    }, 1000);
  };

  return (
    <div className="relative min-h-screen w-screen flex items-center justify-center bg-[#020617] overflow-hidden p-4">
      {/* Background Animated Gradient Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-500/10 blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-brand-500/10 blur-[120px] animate-pulse-slow" />
      <div className="absolute top-[30%] right-[10%] w-[30vw] h-[30vw] rounded-full bg-violet-500/5 blur-[100px]" />

      <div className="w-full max-w-[450px] relative z-10 space-y-6">
        
        {/* Brand Logo & Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex bg-gradient-to-tr from-brand-600 to-indigo-400 p-3.5 rounded-2xl shadow-indigo-500/20 shadow-lg text-white mb-2 animate-bounce-slow">
            <BrainCircuit size={32} />
          </div>
          <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent font-sans">
            LuminaryAI
          </h1>
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest">
            Decision Intelligence & Analytics Platform
          </p>
        </div>

        {/* Login Form Glass Card */}
        <div className="glass-panel border border-white/5 bg-slate-900/40 rounded-3xl p-8 shadow-2xl relative overflow-hidden backdrop-blur-2xl">
          
          <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Shield size={18} className="text-indigo-400" />
            <span>Secure System Access</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider">
                Business Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-3.5 text-slate-500" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane.doe@luminaryai.com"
                  className="w-full bg-slate-950/50 hover:bg-slate-950/80 focus:bg-slate-950 border border-slate-800 focus:border-brand-500/80 rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-slate-600 outline-none transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-3.5 text-slate-500" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-950/50 hover:bg-slate-950/80 focus:bg-slate-950 border border-slate-800 focus:border-brand-500/80 rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-slate-600 outline-none transition-all"
                />
              </div>
            </div>

            {/* Role Select Mode */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider">
                System Role Mode
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['Manager', 'Analyst'] as const).map((r) => {
                  const isActive = role === r;
                  return (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`py-2 rounded-xl text-[10px] font-bold transition-all border ${
                        isActive
                          ? 'bg-brand-500/10 text-brand-400 border-brand-500/30'
                          : 'bg-slate-950/30 text-slate-550 border-slate-900 hover:border-slate-800'
                      }`}
                    >
                      {r}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-[10px] text-red-400 font-bold bg-red-950/20 border border-red-900/30 p-2.5 rounded-xl text-center">
                {error}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 mt-2 bg-gradient-to-tr from-brand-600 to-indigo-500 hover:opacity-95 disabled:opacity-50 text-white font-bold rounded-xl text-xs shadow-lg shadow-brand-500/10 active:scale-95 transition-all text-center flex items-center justify-center gap-1.5"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Enter Platform Workspace</span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>

          {/* OR Separator */}
          <div className="relative my-6 text-center">
            <hr className="border-slate-800/80" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 bg-[#0c1226] text-[9px] font-bold text-slate-500 uppercase tracking-widest">
              Or Connect Identity
            </span>
          </div>

          {/* Social Logins */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full py-2.5 bg-slate-950/40 hover:bg-slate-950/80 text-slate-300 hover:text-white border border-slate-850 hover:border-slate-800 font-semibold rounded-xl text-[10px] transition-all flex items-center justify-center gap-2"
          >
            {/* Google Logo Icon SVG */}
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Sign in with Google Workspace</span>
          </button>

          {/* Quick Demo Pre-fill section */}
          <div className="mt-6 pt-4 border-t border-slate-800/40">
            <span className="text-[9px] font-bold uppercase text-slate-500 block mb-2 tracking-wider text-center">
              Quick Connect Demo Accounts
            </span>
            <div className="flex gap-1.5 justify-center">
              <button
                type="button"
                onClick={() => handleQuickDemo('Manager')}
                className="px-2.5 py-1.5 bg-slate-950/80 hover:bg-brand-500/10 text-slate-400 hover:text-brand-400 border border-slate-900 hover:border-brand-500/30 rounded-lg text-[9px] font-bold transition-all flex items-center gap-1"
              >
                <User size={10} />
                <span>Manager</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('Analyst')}
                className="px-2.5 py-1.5 bg-slate-950/80 hover:bg-brand-500/10 text-slate-400 hover:text-brand-400 border border-slate-900 hover:border-brand-500/30 rounded-lg text-[9px] font-bold transition-all flex items-center gap-1"
              >
                <User size={10} />
                <span>Analyst</span>
              </button>
            </div>
          </div>

        </div>

        {/* Footer */}
        <p className="text-[10px] text-slate-600 text-center font-semibold flex items-center justify-center gap-1">
          <Sparkles size={11} className="text-slate-500" />
          <span>LuminaryAI uses end-to-end sandbox telemetry encoding models.</span>
        </p>

      </div>
    </div>
  );
};
export default LoginPage;
