import React, { useState } from 'react';
import { Lock, Mail, BrainCircuit, Sparkles, Shield, User, ArrowRight } from 'lucide-react';

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
    <div className="relative min-h-screen w-screen flex items-center justify-center bg-[#080b15] overflow-hidden p-4">
      {/* Dynamic Embedded Animations Styles */}
      <style>{`
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.35); }
          70% { box-shadow: 0 0 0 7px rgba(99, 102, 241, 0); }
          100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
        }
        @keyframes pulseSlow {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.25; transform: scale(1.08); }
        }

        .login-card-entrance {
          animation: slideUpFade 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .focus-glow:focus {
          animation: pulseGlow 1.8s infinite;
          border-color: rgba(99, 102, 241, 0.45) !important;
          background-color: #070912 !important;
        }

        .role-button-active {
          transform: scale(1.02);
          box-shadow: 0 0 14px rgba(99, 102, 241, 0.15);
          border-color: rgba(99, 102, 241, 0.3) !important;
          background-color: rgba(99, 102, 241, 0.06) !important;
          color: #818cf8 !important;
        }

        .animate-pulse-slow {
          animation: pulseSlow 6s ease-in-out infinite;
        }
      `}</style>

      {/* Background Animated Gradient Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-500/5 blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-500/5 blur-[120px] animate-pulse-slow" />
      <div className="absolute top-[30%] right-[10%] w-[30vw] h-[30vw] rounded-full bg-violet-500/5 blur-[100px]" />

      <div className="w-full max-w-[450px] relative z-10 space-y-6">
        
        {/* Brand Logo & Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex bg-[#151a2e] text-[#cbd5e1] border border-white/5 p-3.5 rounded-2xl shadow-indigo-950/20 shadow-lg mb-2">
            <BrainCircuit size={32} />
          </div>
          <h1 className="text-3xl font-light tracking-[0.2em] text-[#cbd5e1] font-sans">
            LUMINARYAI
          </h1>
          <p className="text-[10px] text-slate-500 font-light uppercase tracking-[0.25em]">
            Decision Intelligence & Analytics Platform
          </p>
        </div>

        {/* Login Form Panel */}
        <div className="login-card-entrance border border-white/5 bg-[#151a2e] rounded-[2rem] p-8 shadow-2xl relative overflow-hidden shadow-indigo-950/10">
          
          <h2 className="text-sm font-light text-slate-100 mb-6 flex items-center gap-2">
            <Shield size={16} className="text-indigo-400" />
            <span className="tracking-wide">Secure System Access</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-light uppercase text-[#94a3b8] block tracking-widest">
                Business Email
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-3.5 text-slate-500" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane.doe@luminaryai.com"
                  className="w-full bg-[#0c0f1d] hover:bg-[#080b15] border border-slate-900/60 focus:border-brand-500/80 rounded-xl py-3 pl-10 pr-4 text-xs text-slate-100 placeholder-slate-700 outline-none focus-glow transition-all font-light"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-light uppercase text-[#94a3b8] block tracking-widest">
                Password
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-3.5 text-slate-500" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#0c0f1d] hover:bg-[#080b15] border border-slate-900/60 focus:border-brand-500/80 rounded-xl py-3 pl-10 pr-4 text-xs text-slate-100 placeholder-slate-700 outline-none focus-glow transition-all font-light"
                />
              </div>
            </div>

            {/* Role Select Mode */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-light uppercase text-[#94a3b8] block tracking-widest">
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
                      className={`py-2 rounded-xl text-[10px] font-medium transition-all duration-300 border hover:scale-[1.02] ${
                        isActive
                          ? 'role-button-active'
                          : 'bg-[#0c0f1d]/60 text-slate-500 border-slate-900/60 hover:border-slate-800'
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
              <p className="text-[10px] text-red-400 font-light bg-red-950/10 border border-red-900/20 p-2.5 rounded-xl text-center">
                {error}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 mt-2 bg-[#1b233d] hover:bg-[#232c4d] hover:scale-[1.01] border border-indigo-950/40 disabled:opacity-50 text-[#cbd5e1] hover:text-white font-medium rounded-xl text-xs transition-all duration-300 text-center flex items-center justify-center gap-1.5"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Enter Platform Workspace</span>
                  <ArrowRight size={14} className="text-[#cbd5e1]" />
                </>
              )}
            </button>
          </form>

          {/* OR Separator */}
          <div className="relative my-6 text-center">
            <hr className="border-slate-900/60" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 bg-[#151a2e] text-[9px] font-light text-slate-500 uppercase tracking-widest">
              Or Connect Identity
            </span>
          </div>

          {/* Social Logins */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full py-2.5 bg-[#0c0f1d] hover:bg-[#12162a] hover:scale-[1.01] text-[#cbd5e1] hover:text-white border border-slate-900 hover:border-slate-800 font-medium rounded-xl text-[10px] transition-all duration-300 flex items-center justify-center gap-2"
          >
            {/* Google Logo SVG (monochrome silver-blue matching the theme) */}
            <svg className="w-3.5 h-3.5 text-[#cbd5e1]" viewBox="0 0 24 24">
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
          <div className="mt-6 pt-4 border-t border-slate-900/60">
            <span className="text-[9px] font-light uppercase text-slate-500 block mb-2 tracking-widest text-center">
              Quick Connect Demo Accounts
            </span>
            <div className="flex gap-1.5 justify-center">
              <button
                type="button"
                onClick={() => handleQuickDemo('Manager')}
                className="px-2.5 py-1.5 bg-[#0c0f1d] hover:bg-[#1b233d] hover:scale-[1.01] text-slate-400 hover:text-[#cbd5e1] border border-slate-900 hover:border-slate-800 rounded-lg text-[9px] font-medium transition-all duration-300 flex items-center gap-1"
              >
                <User size={10} />
                <span>Manager</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('Analyst')}
                className="px-2.5 py-1.5 bg-[#0c0f1d] hover:bg-[#1b233d] hover:scale-[1.01] text-slate-400 hover:text-[#cbd5e1] border border-slate-900 hover:border-slate-800 rounded-lg text-[9px] font-medium transition-all duration-300 flex items-center gap-1"
              >
                <User size={10} />
                <span>Analyst</span>
              </button>
            </div>
          </div>

        </div>

        {/* Footer */}
        <p className="text-[9px] text-[#475569] text-[#cbd5e1]/40 text-center font-light flex items-center justify-center gap-1 tracking-wider">
          <Sparkles size={10} className="text-slate-600 animate-pulse" />
          <span>LUMINARYAI SECURE SYSTEM TELEMETRY ENCODED CHANNEL.</span>
        </p>

      </div>
    </div>
  );
};
export default LoginPage;
