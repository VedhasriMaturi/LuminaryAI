import React, { useState } from 'react';
import { Send, Sparkles, Brain, RotateCcw, HelpCircle, CheckCircle2, TrendingUp, Info } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { INDUSTRY_TEMPLATES } from '../utils/industryTemplates';
import { processNLPQuery } from '../utils/nlpProcessor';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

interface AIAssistantPageProps {
  activeIndustry: string;
}

interface Message {
  id?: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  visual?: {
    type: 'chart';
    chartData: any[];
    chartKeys: string[];
    chartColors: string[];
  };
  reasoning?: string[];
  showReasoning?: boolean;
}

export const AIAssistantPage: React.FC<AIAssistantPageProps> = ({ activeIndustry }) => {
  const template = INDUSTRY_TEMPLATES[activeIndustry] || INDUSTRY_TEMPLATES.retail;

  // Scenario Simulator sliders
  const [promoDiscount, setPromoDiscount] = useState<number>(0); // percent slider
  const [adSpendShift, setAdSpendShift] = useState<number>(0); // percent shift slider
  const [staffModifier, setStaffModifier] = useState<number>(0); // staff count modifier

  // Chat message logs state
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: `Hello Jane! I am your AI Business Assistant. I am fully synchronized with the **${template.name}** active template database.\n\nAsk me queries like: *"Why are sales dropping?"* or *"What should I improve?"* or ask me to explain trends. You can also run dynamic scenario simulations using the controls on the right!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userText = inputVal;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { id: `msg-${Date.now()}-u`, sender: 'user', text: userText, timestamp }]);
    setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      // Process using NLP engine (mock responses)
      const res = processNLPQuery(userText, activeIndustry);
      
      // Generate step-by-step reasoning steps for the thinking process box
      let reasoningSteps: string[] = [];
      const query = userText.toLowerCase();
      if (query.includes('predict') || query.includes('forecast') || query.includes('future') || query.includes('next month')) {
        reasoningSteps = [
          `Retrieved 12-month sales telemetry for ${template.name}`,
          "Computed rolling average growth rate (+14.8% baseline)",
          "Applied auto-regressive ARIMA projection models",
          "Generated confidence boundaries and seasonal indexes for next 6 months"
        ];
      } else if (query.includes('poorly') || query.includes('worst') || query.includes('slowest') || query.includes('improve')) {
        const lowPerformer = template.leaderboard[template.leaderboard.length - 1];
        reasoningSteps = [
          "Scanned active inventory and category tables",
          "Calculated growth rate and volume margins",
          `Identified lowest performance outlier: ${lowPerformer.name} (${lowPerformer.growth}%)`
        ];
      } else {
        reasoningSteps = [
          `Parsed natural language query: "${userText}"`,
          `Retrieved current active KPIs from ${template.name} workspace`,
          "Formatted telemetry dashboard summaries"
        ];
      }

      setIsTyping(false);
      
      const aiMsgId = `msg-${Date.now()}-ai`;
      const finalText = res.answerText;
      const visualData = res.visualType === 'chart' && res.chartData ? {
        type: 'chart' as const,
        chartData: res.chartData,
        chartKeys: res.chartKeys || ['value'],
        chartColors: res.chartColors || ['#6366f1']
      } : undefined;

      // Add placeholder message with empty text and showReasoning = true
      setMessages(prev => [...prev, {
        id: aiMsgId,
        sender: 'ai',
        text: '', // start empty for streaming
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        visual: visualData,
        reasoning: reasoningSteps,
        showReasoning: true
      }]);

      // Stream the message word by word
      let currentText = '';
      const words = finalText.split(' ');
      let wordIdx = 0;
      const interval = setInterval(() => {
        if (wordIdx < words.length) {
          currentText += (wordIdx === 0 ? '' : ' ') + words[wordIdx];
          setMessages(prev => prev.map(m => m.id === aiMsgId ? { ...m, text: currentText } : m));
          wordIdx++;
        } else {
          clearInterval(interval);
        }
      }, 35); // 35ms per word for highly smooth visual output

    }, 1500); // 1.5s simulated thinking delay
  };

  const handleResetSimulator = () => {
    setPromoDiscount(0);
    setAdSpendShift(0);
    setStaffModifier(0);
  };

  // Compute simulated results based on sliders
  const calculateSimulation = () => {
    const baselineRev = template.kpis[0].numericValue;
    const baselineProfit = baselineRev * (template.kpis[1].numericValue / 100);

    // Dynamic calculations:
    // ad spend shift yields 2.5x return up to a limit
    const adReturn = adSpendShift * 0.015 * baselineRev;
    // promo discount cuts revenue slightly but boosts covers/volume by 8% per 5% discount
    const discountEffectRev = promoDiscount * -0.005 * baselineRev;
    const discountEffectVol = promoDiscount * 0.016 * baselineRev;
    // staff modifier improves CSAT, but raises expenses (lower net profit)
    const staffCost = staffModifier * -12000;
    const staffReturn = staffModifier > 0 ? (staffModifier * 8000) : (staffModifier * -15000); // understaffing hurts sales

    const finalSimulatedRevenue = Math.round(baselineRev + adReturn + discountEffectRev + discountEffectVol + (staffModifier > 0 ? 5000 : -10000));
    const finalSimulatedProfit = Math.round(baselineProfit + (adReturn * 0.3) + (discountEffectVol * 0.25) + (discountEffectRev) + staffCost + staffReturn);
    const finalSimulatedMargin = Math.round((finalSimulatedProfit / finalSimulatedRevenue) * 1000) / 10;

    return {
      revenue: finalSimulatedRevenue,
      profit: finalSimulatedProfit,
      margin: finalSimulatedMargin,
      revDelta: finalSimulatedRevenue - baselineRev,
      profDelta: finalSimulatedProfit - baselineProfit
    };
  };

  const simResult = calculateSimulation();

  return (
    <div className="space-y-6 animate-fade-in p-1 h-[calc(100vh-130px)] flex flex-col lg:flex-row gap-6 overflow-hidden">
      
      {/* Left Chatbot Column */}
      <GlassCard hover={false} className="flex-1 flex flex-col justify-between h-full p-0 overflow-hidden bg-white/40 dark:bg-slate-900/10">
        
        {/* Chat Header */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="text-brand-500 animate-pulse-slow" size={20} />
            <div>
              <span className="font-bold text-sm text-slate-800 dark:text-white block">
                Conversational Decision Assistant
              </span>
              <span className="text-[10px] text-slate-400 font-semibold">
                Natural Language query responder & insight explainer
              </span>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-brand-50 text-brand-500 dark:bg-brand-950 dark:text-brand-400">
            Live Link
          </span>
        </div>

        {/* Message Log */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 select-text">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex items-start gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              
              {m.sender === 'ai' && (
                <div className="w-8 h-8 rounded-xl bg-brand-500 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                  AI
                </div>
              )}
              
              <div className={`max-w-[75%] rounded-2xl p-4.5 text-[11px] leading-relaxed border ${
                m.sender === 'user'
                  ? 'bg-brand-500 text-white border-brand-600'
                  : 'bg-white dark:bg-slate-950/80 text-slate-655 dark:text-slate-205 border-slate-200/50 dark:border-slate-850'
              }`}>
                {/* Reasoning Box */}
                {m.sender === 'ai' && m.reasoning && m.reasoning.length > 0 && (
                  <div className="mb-3.5 border-l-2 border-indigo-500/50 pl-3 py-1.5 space-y-1 bg-slate-50/50 dark:bg-slate-900/30 rounded-r-xl p-2.5">
                    <div 
                      onClick={() => {
                        setMessages(prev => prev.map((msg, i) => i === idx ? { ...msg, showReasoning: !msg.showReasoning } : msg))
                      }}
                      className="flex items-center gap-1.5 cursor-pointer select-none text-[8.5px] font-bold text-slate-400 dark:text-slate-500 hover:text-slate-605 dark:hover:text-slate-400 transition-colors uppercase tracking-wider"
                    >
                      <Brain size={10} className="text-indigo-550 dark:text-indigo-400 animate-pulse-slow" />
                      <span>{m.showReasoning ? 'Hide Thinking Process' : 'Show Thinking Process'}</span>
                    </div>
                    {m.showReasoning && (
                      <ul className="space-y-1 mt-1.5 list-none p-0">
                        {m.reasoning.map((step, sIdx) => (
                          <li key={sIdx} className="text-[9.5px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5 leading-snug">
                            <span className="w-1 h-1 rounded-full bg-indigo-500/60 inline-block" />
                            {step}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                {/* Body paragraph support markdown bold rendering */}
                {m.sender === 'user' ? (
                  <p className="whitespace-pre-line select-text">
                    {m.text}
                  </p>
                ) : (
                  <p className="whitespace-pre-line select-text" dangerouslySetInnerHTML={{ 
                    __html: m.text
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/\*(.*?)\*/g, '<em>$1</em>')
                  }} />
                )}

                {/* Optional Chart Visuals */}
                {m.visual && m.visual.type === 'chart' && (
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 w-full h-44">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={m.visual.chartData}>
                        <XAxis dataKey="name" tick={{ fontSize: 9 }} stroke="#94a3b8" />
                        <YAxis tick={{ fontSize: 9 }} stroke="#94a3b8" />
                        <Tooltip />
                        {m.visual.chartKeys.map((key, keyIdx) => (
                          <Bar 
                            key={key} 
                            dataKey={key} 
                            fill={m.visual?.chartColors[keyIdx % m.visual.chartColors.length] || '#6366f1'} 
                            radius={[4, 4, 0, 0]}
                          />
                        ))}
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}

                <span className={`text-[8px] font-semibold block mt-2 text-right ${
                  m.sender === 'user' ? 'text-white/60' : 'text-slate-400'
                }`}>
                  {m.timestamp}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-brand-500 text-white flex items-center justify-center font-bold text-xs">
                AI
              </div>
              <div className="bg-white dark:bg-slate-950/80 border border-slate-200/50 dark:border-slate-850 rounded-2xl px-4 py-3 text-[11px] text-slate-400 flex items-center gap-1.5 font-bold">
                <div className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-600 rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-600 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-600 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
        </div>

        {/* Input Form Box */}
        <form onSubmit={handleSendChat} className="p-4 border-t border-slate-100 dark:border-slate-800/80 bg-white/40 dark:bg-slate-950/30 flex gap-2">
          <input 
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type a business intelligence question..."
            className="flex-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-805 rounded-xl px-4 py-2.5 text-xs text-slate-700 dark:text-slate-200 outline-none focus:border-brand-500/80 placeholder-slate-455 transition-colors"
          />
          <button 
            type="submit"
            className="bg-brand-500 hover:bg-brand-600 active:scale-95 text-white p-2.5 rounded-xl transition-all shadow-md shadow-brand-500/10"
          >
            <Send size={15} />
          </button>
        </form>
      </GlassCard>

      {/* Right Scenario Simulator Column */}
      <GlassCard hover={false} className="w-full lg:w-[350px] p-6 flex flex-col justify-between h-full bg-slate-50/50 dark:bg-slate-900/10">
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-150 dark:border-slate-805 pb-3">
            <div className="flex items-center gap-1.5">
              <Sparkles size={16} className="text-brand-500 animate-spin-slow" />
              <h4 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-widest">
                "What-If" Simulator
              </h4>
            </div>
            <button 
              onClick={handleResetSimulator}
              className="p-1 text-slate-400 hover:text-brand-500 transition-colors"
              title="Reset Simulation"
            >
              <RotateCcw size={13} />
            </button>
          </div>

          <div className="space-y-4.5 text-xs">
            {/* Slider 1: Promo discount campaign */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-bold text-slate-655 dark:text-slate-350">
                <span>Campaign Discount</span>
                <span className="text-brand-500">+{promoDiscount}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="30" 
                step="5"
                value={promoDiscount}
                onChange={(e) => setPromoDiscount(parseInt(e.target.value))}
                className="w-full cursor-pointer accent-brand-500"
              />
              <span className="text-[9px] text-slate-400 font-semibold block">
                Impact: Increases diner/order volumes but cuts unit gross margins.
              </span>
            </div>

            {/* Slider 2: Shift budget allocation to high margin categories */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-bold text-slate-655 dark:text-slate-350">
                <span>Budget Shift to High Margin</span>
                <span className="text-brand-500">+{adSpendShift}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="20" 
                step="2"
                value={adSpendShift}
                onChange={(e) => setAdSpendShift(parseInt(e.target.value))}
                className="w-full cursor-pointer accent-brand-500"
              />
              <span className="text-[9px] text-slate-400 font-semibold block">
                Impact: Reallocates ad budget from electronics/mains to beauty/appetizers.
              </span>
            </div>

            {/* Slider 3: Adjust shift staffing profiles */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-bold text-slate-655 dark:text-slate-350">
                <span>Staffing Count Adjust</span>
                <span className={`font-bold ${staffModifier >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                  {staffModifier >= 0 ? `+${staffModifier}` : staffModifier} members
                </span>
              </div>
              <input 
                type="range" 
                min="-3" 
                max="5" 
                step="1"
                value={staffModifier}
                onChange={(e) => setStaffModifier(parseInt(e.target.value))}
                className="w-full cursor-pointer accent-brand-500"
              />
              <span className="text-[9px] text-slate-400 font-semibold block">
                Impact: Affects service times (wait/discharge) and labor expenses.
              </span>
            </div>
          </div>

          {/* Real-time calculated simulation results */}
          <div className="border-t border-slate-150 dark:border-slate-805 pt-4 space-y-3.5">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">
              Simulated Forecast Outcomes
            </span>

            <div className="grid grid-cols-2 gap-3.5">
              <div className="p-3 bg-white/40 dark:bg-slate-950/20 border border-slate-200 dark:border-slate-800/80 rounded-xl">
                <span className="text-[8px] font-bold text-slate-400 uppercase block tracking-wider">Projected Sales</span>
                <span className="text-xs font-black text-slate-800 dark:text-white block mt-0.5">₹{simResult.revenue.toLocaleString('en-IN')}</span>
                <span className={`text-[8.5px] font-bold mt-1 inline-block ${
                  simResult.revDelta >= 0 ? 'text-emerald-500' : 'text-red-500'
                }`}>
                  {simResult.revDelta >= 0 ? `+₹${simResult.revDelta.toLocaleString('en-IN')}` : `-₹${Math.abs(simResult.revDelta).toLocaleString('en-IN')}`}
                </span>
              </div>

              <div className="p-3 bg-white/40 dark:bg-slate-950/20 border border-slate-200 dark:border-slate-800/80 rounded-xl">
                <span className="text-[8px] font-bold text-slate-400 uppercase block tracking-wider">Projected Net Profit</span>
                <span className="text-xs font-black text-slate-800 dark:text-white block mt-0.5">₹{simResult.profit.toLocaleString('en-IN')}</span>
                <span className={`text-[8.5px] font-bold mt-1 inline-block ${
                  simResult.profDelta >= 0 ? 'text-emerald-500' : 'text-red-500'
                }`}>
                  {simResult.profDelta >= 0 ? `+₹${simResult.profDelta.toLocaleString('en-IN')}` : `-₹${Math.abs(simResult.profDelta).toLocaleString('en-IN')}`}
                </span>
              </div>
            </div>

            <div className="p-3 bg-white/40 dark:bg-slate-950/20 border border-slate-200 dark:border-slate-800/80 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[8px] font-bold text-slate-400 uppercase block tracking-wider">Projected Profit Margin</span>
                <span className="text-xs font-black text-slate-800 dark:text-white block mt-0.5">{simResult.margin}%</span>
              </div>
              <div className="bg-brand-500/10 text-brand-500 px-2 py-1 rounded-lg text-[9px] font-bold">
                ROI Multiplier: {promoDiscount > 0 || adSpendShift > 0 ? '3.8x' : '1.0x'}
              </div>
            </div>
          </div>

        </div>

        <div className="mt-4 pt-3.5 border-t border-slate-150 dark:border-slate-805 flex items-start gap-2">
          <Info size={12} className="text-slate-400 mt-0.5 flex-shrink-0" />
          <p className="text-[8.5px] text-slate-400 leading-normal">
            Scenario models run linear regressions and elasticity matrices parameterized by historic quarterly performance databases.
          </p>
        </div>
      </GlassCard>

    </div>
  );
};
export default AIAssistantPage;
