import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Sparkles, 
  X, 
  ChevronRight, 
  RotateCcw,
  TrendingUp,
  Brain,
  CheckCircle2
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  Tooltip 
} from 'recharts';
import { processNLPQuery, NLPResponse } from '../utils/nlpProcessor';
import canvasConfetti from 'canvas-confetti';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
  visual?: {
    type: 'chart' | 'table' | 'cards' | 'none';
    chartType?: 'line' | 'bar' | 'pie' | 'area';
    chartData?: any[];
    chartKeys?: string[];
    chartColors?: string[];
  };
  recommendation?: {
    title: string;
    action: string;
    impact: string;
    applied?: boolean;
  };
}

interface AIChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
  onResolveAnomaly?: (recTitle: string) => void;
}

export const AIChatDrawer: React.FC<AIChatDrawerProps> = ({
  isOpen,
  onClose,
  initialQuery = '',
  onResolveAnomaly
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: `Welcome! I am **LuminaryAI Assistant**. 
      
Ask me anything about your business data, predictions, or anomaly reports. For example, you can query:
* *"Predict next month's sales"*
* *"Which products perform poorly?"*
* *"Why are profits declining?"*`,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Handle external search triggers from header
  useEffect(() => {
    if (isOpen && initialQuery) {
      handleNewQuery(initialQuery);
    }
  }, [isOpen, initialQuery]);

  const handleNewQuery = (query: string) => {
    const userMsg: Message = {
      id: `msg-${Date.now()}-u`,
      sender: 'user',
      text: query,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate AI thinking and reply
    setTimeout(() => {
      const response: NLPResponse = processNLPQuery(query);
      
      const aiMsg: Message = {
        id: `msg-${Date.now()}-ai`,
        sender: 'ai',
        text: response.answerText,
        timestamp: new Date(),
        visual: response.visualType !== 'none' ? {
          type: response.visualType,
          chartType: response.chartType,
          chartData: response.chartData,
          chartKeys: response.chartKeys,
          chartColors: response.chartColors
        } : undefined,
        recommendation: response.recommendation ? {
          ...response.recommendation,
          applied: false
        } : undefined
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    handleNewQuery(inputValue);
    setInputValue('');
  };

  const handleQuickQuestion = (q: string) => {
    handleNewQuery(q);
  };

  const handleApplyAction = (msgId: string, recTitle: string) => {
    setMessages(prev => 
      prev.map(m => {
        if (m.id === msgId && m.recommendation) {
          return {
            ...m,
            recommendation: { ...m.recommendation, applied: true }
          };
        }
        return m;
      })
    );

    // Trigger confetti
    canvasConfetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 }
    });

    if (onResolveAnomaly) {
      onResolveAnomaly(recTitle);
    }
  };

  const renderVisual = (visual: NonNullable<Message['visual']>) => {
    if (!visual.chartData || visual.chartData.length === 0) return null;

    const data = visual.chartData;
    const keys = visual.chartKeys || [];
    const colors = visual.chartColors || ['#6366f1'];

    return (
      <div className="w-full h-48 bg-slate-50 dark:bg-slate-950 rounded-xl p-3 border border-slate-100 dark:border-slate-800/80 my-3">
        <ResponsiveContainer width="100%" height="100%">
          {visual.chartType === 'area' ? (
            <AreaChart data={data}>
              <XAxis dataKey="month" tick={{ fontSize: 9 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 9 }} stroke="#94a3b8" />
              <Tooltip />
              <Area type="monotone" dataKey={keys[0]} stroke={colors[0]} fill={`${colors[0]}20`} strokeWidth={2} />
              {keys[1] && <Area type="monotone" dataKey={keys[1]} stroke={colors[1]} fill={`${colors[1]}10`} strokeWidth={1} strokeDasharray="3 3" />}
              {keys[2] && <Area type="monotone" dataKey={keys[2]} stroke={colors[2]} fill={`${colors[2]}10`} strokeWidth={1} strokeDasharray="3 3" />}
            </AreaChart>
          ) : visual.chartType === 'bar' ? (
            <BarChart data={data}>
              <XAxis dataKey="name" tick={{ fontSize: 9 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 9 }} stroke="#94a3b8" />
              <Tooltip />
              <Bar dataKey={keys[0]} fill={colors[0]} radius={[4, 4, 0, 0]} />
              {keys[1] && <Bar dataKey={keys[1]} fill={colors[1]} radius={[4, 4, 0, 0]} />}
            </BarChart>
          ) : visual.chartType === 'pie' ? (
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={55}
                paddingAngle={3}
                dataKey={keys[0]}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `₹${value.toLocaleString('en-IN')}`} />
            </PieChart>
          ) : (
            <LineChart data={data}>
              <XAxis dataKey="month" tick={{ fontSize: 9 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 9 }} stroke="#94a3b8" />
              <Tooltip />
              <Line type="monotone" dataKey={keys[0]} stroke={colors[0]} strokeWidth={2} dot={{ r: 3 }} />
              {keys[1] && <Line type="monotone" dataKey={keys[1]} stroke={colors[1]} strokeWidth={1.5} />}
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/20 backdrop-blur-sm z-50 flex justify-end animate-fade-in">
      {/* Click outside container to close */}
      <div className="flex-1" onClick={onClose} />

      {/* Drawer panel */}
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl h-full flex flex-col justify-between animate-slide-up relative">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400 p-2 rounded-lg">
              <Brain size={18} />
            </div>
            <div>
              <span className="font-bold text-sm text-slate-800 dark:text-slate-100 block">LuminaryAI Assistant</span>
              <span className="text-[10px] text-slate-400 font-semibold uppercase">Real-time analytical reasoning</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 dark:text-slate-500 hover:text-slate-650"
          >
            <X size={16} />
          </button>
        </div>

        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div 
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                  msg.sender === 'user' 
                    ? 'bg-gradient-to-tr from-brand-600 to-indigo-500 text-white rounded-br-none shadow-md shadow-brand-500/10' 
                    : 'bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-250 rounded-bl-none border border-slate-200/20'
                }`}
              >
                {/* Text body */}
                <p className="whitespace-pre-line select-text" dangerouslySetInnerHTML={{ 
                  // convert markdown bold tags to html bold tags
                  __html: msg.text
                    .replace(/\*\*(.*?)\*\*/g, '<strong>₹1</strong>')
                    .replace(/\*(.*?)\*/g, '<em>₹1</em>')
                }} />

                {/* Render visual if present */}
                {msg.visual && renderVisual(msg.visual)}

                {/* Render recommendation triggers if present */}
                {msg.recommendation && (
                  <div className="mt-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-3 rounded-xl">
                    <div className="flex items-center gap-1.5 text-brand-600 dark:text-brand-400 font-bold mb-1">
                      <Sparkles size={12} />
                      <span>AI Recommendation</span>
                    </div>
                    <p className="font-semibold text-slate-800 dark:text-slate-200 text-[11px]">{msg.recommendation.title}</p>
                    <p className="text-slate-500 dark:text-slate-400 text-[10px] mt-1 leading-relaxed">{msg.recommendation.action}</p>
                    <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/60">
                      <span className="text-[9px] text-emerald-500 font-bold bg-emerald-50 dark:bg-emerald-950/30 px-1.5 py-0.5 rounded">
                        {msg.recommendation.impact} Impact
                      </span>
                      {msg.recommendation.applied ? (
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1 font-bold">
                          <CheckCircle2 size={12} className="text-emerald-500" />
                          Applied
                        </span>
                      ) : (
                        <button
                          onClick={() => handleApplyAction(msg.id, msg.recommendation!.title)}
                          className="text-[10px] font-bold bg-brand-500 hover:bg-brand-600 text-white px-2.5 py-1 rounded-lg transition-colors"
                        >
                          Execute Plan
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-slate-100 dark:bg-slate-800/80 rounded-2xl rounded-bl-none px-4 py-3 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input & Quick Helpers */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
          {/* Quick Prompts */}
          <div className="flex flex-wrap gap-1.5">
            <button 
              onClick={() => handleQuickQuestion('Predict next month\'s sales')}
              className="text-[10px] bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-500 dark:text-slate-300 font-semibold px-2 py-1 rounded-lg border border-slate-200/30 dark:border-slate-700/30 transition-colors"
            >
              🔮 Predict Sales
            </button>
            <button 
              onClick={() => handleQuickQuestion('Which products perform poorly?')}
              className="text-[10px] bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-500 dark:text-slate-300 font-semibold px-2 py-1 rounded-lg border border-slate-200/30 dark:border-slate-700/30 transition-colors"
            >
              📉 Poor Sellers
            </button>
            <button 
              onClick={() => handleQuickQuestion('Why are profits declining?')}
              className="text-[10px] bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-500 dark:text-slate-300 font-semibold px-2 py-1 rounded-lg border border-slate-200/30 dark:border-slate-700/30 transition-colors"
            >
              💸 Margin Analysis
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSend} className="flex gap-2">
            <input 
              type="text"
              placeholder="Ask a question..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 bg-slate-100 dark:bg-slate-950 focus:bg-white dark:focus:bg-black border border-slate-200/50 dark:border-slate-800 focus:border-brand-500/50 rounded-xl px-3.5 py-2.5 text-xs outline-none text-slate-700 dark:text-slate-200 transition-all"
            />
            <button 
              type="submit"
              disabled={!inputValue.trim()}
              className="bg-brand-500 hover:bg-brand-600 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 dark:disabled:text-slate-600 text-white rounded-xl px-3.5 flex items-center justify-center transition-colors active:scale-95"
            >
              <Send size={14} />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
export default AIChatDrawer;
