import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import HomeDashboard from './pages/HomeDashboard';
import AnalyticsPage from './pages/AnalyticsPage';
import PredictionsDashboard from './pages/PredictionsDashboard';
import RiskCenter from './pages/RiskCenter';
import RecommendationsPage from './pages/RecommendationsPage';
import CustomerAnalytics from './pages/CustomerAnalytics';
import InventoryAnalytics from './pages/InventoryAnalytics';
import KPIDashboard from './pages/KPIDashboard';
import Reports from './pages/Reports';
import AIAssistantPage from './pages/AIAssistantPage';
import Settings from './pages/Settings';
import LoginPage from './pages/LoginPage';
import AIChatDrawer from './components/AIChatDrawer';
import DataUploadModal from './components/DataUploadModal';

import { MOCK_ALERTS, AnomalyAlert } from './utils/mockData';
import { CleanedDataset } from './utils/fileParser';

export const App: React.FC = () => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ email: string; name: string; role: 'Manager' | 'Analyst'; avatar?: string } | null>(null);

  // Tab and Industry Configurations
  const [activeTab, setActiveTab] = useState('home');
  const [activeIndustry, setActiveIndustry] = useState<'retail' | 'restaurants' | 'healthcare' | 'manufacturing' | 'education' | 'marketing' | 'finance'>('retail');
  const [userRole, setUserRole] = useState<'Manager' | 'Analyst'>('Manager');
  const [darkMode, setDarkMode] = useState(false);
  
  // Modals & Floating Drawer Panels
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [initialChatQuery, setInitialChatQuery] = useState('');

  // Local Alerts state
  const [alerts, setAlerts] = useState<AnomalyAlert[]>(MOCK_ALERTS);
  const [uploadedDataset, setUploadedDataset] = useState<CleanedDataset | null>(null);

  // Apply dark mode class to HTML body
  useEffect(() => {
    const bodyClass = document.body.classList;
    if (darkMode) {
      bodyClass.add('dark');
      document.documentElement.classList.add('dark');
    } else {
      bodyClass.remove('dark');
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleLogin = (email: string, name: string, role: 'Manager' | 'Analyst') => {
    setCurrentUser({
      email,
      name,
      role,
      avatar: email.includes('manager')
        ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
        : 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150'
    });
    setUserRole(role);
    setIsAuthenticated(true);
    setActiveTab('home');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  const handleResolveAlert = (id: string) => {
    setAlerts(prev => 
      prev.map(alert => alert.id === id ? { ...alert, status: 'resolved' } : alert)
    );
  };

  const handleResolveAnomalyByTitle = (title: string) => {
    setAlerts(prev => 
      prev.map(alert => {
        const alertWord = alert.title.toLowerCase().split(' ')[0];
        const recWord = title.toLowerCase().split(' ')[0];
        if (alertWord === recWord || title.toLowerCase().includes(alert.category)) {
          return { ...alert, status: 'resolved' };
        }
        return alert;
      })
    );
  };

  const handleOpenAIChatWithQuery = (query?: string) => {
    if (query) {
      setInitialChatQuery(query);
    } else {
      setInitialChatQuery('');
    }
    // Redirect to AI Assistant Tab directly for rich full-screen scenario chats
    setActiveTab('ai-assistant');
  };

  const handleApplyDataset = (dataset: CleanedDataset) => {
    setUploadedDataset(dataset);
    setActiveTab('home'); 
  };

  const handleClearUploadedDataset = () => {
    setUploadedDataset(null);
  };

  const renderActivePage = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeDashboard 
            activeIndustry={activeIndustry}
            alerts={alerts}
            onResolveAlert={handleResolveAlert}
            setActiveTab={setActiveTab}
            onOpenAIChat={handleOpenAIChatWithQuery}
          />
        );
      case 'analytics':
        return <AnalyticsPage activeIndustry={activeIndustry} />;
      case 'predictions':
        return <PredictionsDashboard activeIndustry={activeIndustry} />;
      case 'risks':
        return (
          <RiskCenter 
            activeIndustry={activeIndustry}
            alerts={alerts}
            onResolveAlert={handleResolveAlert}
          />
        );
      case 'recommendations':
        return <RecommendationsPage activeIndustry={activeIndustry} />;
      case 'customers':
        return <CustomerAnalytics activeIndustry={activeIndustry} />;
      case 'operations':
        return <InventoryAnalytics activeIndustry={activeIndustry} />;
      case 'kpis':
        return <KPIDashboard activeIndustry={activeIndustry} />;
      case 'reports':
        return <Reports activeIndustry={activeIndustry} />;
      case 'ai-assistant':
        return <AIAssistantPage activeIndustry={activeIndustry} />;
      case 'settings':
        return <Settings darkMode={darkMode} setDarkMode={setDarkMode} />;
      default:
        return <div className="text-center p-8 text-slate-400">Page not found.</div>;
    }
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 dark:bg-[#020617] font-sans transition-colors duration-300">
      
      {/* Left Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        activeIndustry={activeIndustry}
        setActiveIndustry={setActiveIndustry}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Panel Content Wrap */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Header Actions */}
        <Header 
          activeTab={activeTab}
          activeIndustry={activeIndustry}
          userRole={userRole}
          setUserRole={setUserRole}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onOpenUpload={() => setIsUploadOpen(true)}
          onOpenAIChat={handleOpenAIChatWithQuery}
          onResolveAlert={handleResolveAlert}
          setActiveTab={setActiveTab}
        />

        {/* Scrollable Workspace Pages Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          {renderActivePage()}
        </main>
      </div>

      {/* Floating Action AI chat assistant panel */}
      <AIChatDrawer 
        isOpen={isAIChatOpen} 
        onClose={() => setIsAIChatOpen(false)}
        initialQuery={initialChatQuery}
        onResolveAnomaly={handleResolveAnomalyByTitle}
      />

      {/* File Upload Cleaning Validation modal */}
      <DataUploadModal 
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onApplyDataset={handleApplyDataset}
      />

    </div>
  );
};
export default App;
