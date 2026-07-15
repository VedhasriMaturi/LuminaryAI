import React, { useState, useEffect, useRef } from 'react';
import { 
  // Icons
  LayoutDashboard, 
  TrendingUp, 
  Users, 
  Boxes, 
  DollarSign, 
  UserCheck, 
  Sparkles, 
  FileText, 
  Settings as SettingsIcon, 
  ChevronLeft, 
  ChevronRight,
  Building2,
  BrainCircuit,
  Bell, 
  Search, 
  Upload, 
  Sun, 
  Moon, 
  X,
  AlertTriangle,
  Info,
  Send,
  RotateCcw,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
  ShoppingBag,
  Percent,
  Layers,
  Map,
  Trophy,
  Award,
  Smile,
  Printer,
  Clock,
  ShieldCheck,
  Coins,
  Plug,
  FileCheck,
  BarChart2,
  Calendar,
  MapPin,
  Tag,
  ArrowRight,
  Brain,
  Calculator
} from 'lucide-react';
import { 
  // Recharts
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
  Tooltip,
  Legend,
  CartesianGrid,
  ScatterChart,
  Scatter,
  ZAxis,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import canvasConfetti from 'canvas-confetti';

// ==========================================
// 1. DATA TYPES & INTERFACES
// ==========================================

export interface KPICardData {
  id: string;
  title: string;
  value: string;
  numericValue: number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  sparkline: number[];
  category: string;
}

export interface SalesDataPoint {
  month: string;
  revenue: number;
  profit: number;
  orders: number;
  expenses: number;
}

export interface CustomerDataPoint {
  id: string;
  name: string;
  email: string;
  segment: 'VIP' | 'Loyal' | 'New' | 'At Risk' | 'Lost';
  ltv: number;
  purchaseFrequency: number;
  churnProbability: number;
  engagementScore: number;
  spendingHistory: number[];
  avatar: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  stockLevel: number;
  minThreshold: number;
  demandForecast: number;
  warehouse: string;
  supplierName: string;
  supplierRating: number;
  leadTimeDays: number;
  cost: number;
  price: number;
}

export interface DepartmentBudget {
  department: string;
  budget: number;
  spent: number;
  color: string;
}

export interface EmployeeMetric {
  id: string;
  name: string;
  role: string;
  department: string;
  productivity: number;
  efficiency: number;
  revenueContribution: number;
  goalAchievement: number;
  attendanceRate: number;
  satisfactionScore: number;
  avatar: string;
}

export interface AnomalyAlert {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  category: 'sales' | 'inventory' | 'finance' | 'employee' | 'customer';
  status: 'active' | 'resolved';
  recommendation: string;
  impact: string;
}

export interface CleanedDataset {
  fileName: string;
  columns: string[];
  data: any[];
  validationReport: {
    totalRows: number;
    validRows: number;
    missingValuesCorrected: number;
    detectedType: string;
  };
  suggestedChartType: 'line' | 'bar' | 'pie' | 'scatter';
  suggestedKeys: {
    xAxisKey: string;
    yAxisKeys: string[];
  };
}

export interface Recommendation {
  id: string;
  title: string;
  metric: string;
  insight: string;
  action: string;
  priority: 'High' | 'Medium' | 'Low';
  impact: 'High' | 'Medium' | 'Low';
  confidence: number;
  estimatedValue: number;
  resolved: boolean;
}

export interface NLPResponse {
  query: string;
  answerText: string;
  visualType: 'chart' | 'table' | 'cards' | 'none';
  chartType?: 'line' | 'bar' | 'pie' | 'area';
  chartData?: any[];
  chartKeys?: string[];
  chartColors?: string[];
  recommendation?: {
    title: string;
    action: string;
    impact: string;
  };
}

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

// ==========================================
// 2. MOCK DATABASES
// ==========================================

export const INITIAL_KPI_CARDS: KPICardData[] = [
  {
    id: 'kpi-revenue',
    title: 'Total Revenue',
    value: '₹1,248,390',
    numericValue: 1248390,
    change: 14.8,
    trend: 'up',
    sparkline: [80000, 85000, 92000, 88000, 95000, 102000, 99000, 108000, 115000, 110000, 122000, 124839],
    category: 'finance'
  },
  {
    id: 'kpi-profit',
    title: 'Net Profit Margin',
    value: '24.2%',
    numericValue: 24.2,
    change: 2.1,
    trend: 'up',
    sparkline: [21.5, 22.0, 22.8, 21.9, 23.1, 23.8, 23.4, 24.0, 24.5, 23.9, 24.1, 24.2],
    category: 'finance'
  },
  {
    id: 'kpi-expenses',
    title: 'Operational Expenses',
    value: '₹312,450',
    numericValue: 312450,
    change: -4.3,
    trend: 'down',
    sparkline: [34000, 33500, 32800, 33000, 32100, 31800, 32500, 31200, 31500, 30900, 31100, 31245],
    category: 'finance'
  },
  {
    id: 'kpi-sales-growth',
    title: 'Sales Growth Rate',
    value: '18.4%',
    numericValue: 18.4,
    change: 3.5,
    trend: 'up',
    sparkline: [12.0, 13.5, 14.2, 13.8, 15.0, 16.5, 15.8, 17.2, 17.8, 17.0, 18.1, 18.4],
    category: 'sales'
  },
  {
    id: 'kpi-orders',
    title: 'Total Orders',
    value: '14,892',
    numericValue: 14892,
    change: 12.2,
    trend: 'up',
    sparkline: [950, 1020, 1100, 1050, 1180, 1250, 1210, 1320, 1380, 1310, 1420, 1489],
    category: 'sales'
  },
  {
    id: 'kpi-customers',
    title: 'Active Customers',
    value: '8,432',
    numericValue: 8432,
    change: 8.7,
    trend: 'up',
    sparkline: [6200, 6400, 6650, 6800, 7100, 7350, 7500, 7720, 7950, 8100, 8280, 8432],
    category: 'customer'
  },
  {
    id: 'kpi-retention',
    title: 'Customer Retention Rate',
    value: '78.5%',
    numericValue: 78.5,
    change: -1.8,
    trend: 'down',
    sparkline: [81.2, 80.8, 80.5, 80.1, 79.8, 79.5, 79.2, 78.9, 78.8, 78.6, 78.5, 78.5],
    category: 'customer'
  },
  {
    id: 'kpi-inventory',
    title: 'Inventory Health',
    value: '94.2%',
    numericValue: 94.2,
    change: 1.5,
    trend: 'up',
    sparkline: [90.5, 91.2, 92.0, 91.8, 92.5, 93.1, 92.8, 93.5, 93.9, 93.7, 94.0, 94.2],
    category: 'inventory'
  },
  {
    id: 'kpi-productivity',
    title: 'Employee Productivity',
    value: '86.7/100',
    numericValue: 86.7,
    change: 4.2,
    trend: 'up',
    sparkline: [82.1, 82.5, 83.2, 83.0, 84.1, 84.8, 84.5, 85.2, 85.8, 85.5, 86.2, 86.7],
    category: 'employee'
  },
  {
    id: 'kpi-satisfaction',
    title: 'Customer CSAT',
    value: '4.72/5.0',
    numericValue: 4.72,
    change: 0.8,
    trend: 'up',
    sparkline: [4.65, 4.66, 4.68, 4.67, 4.69, 4.70, 4.68, 4.71, 4.72, 4.70, 4.71, 4.72],
    category: 'customer'
  }
];

export const MONTHLY_SALES_HISTORY: SalesDataPoint[] = [
  { month: 'Jul 2025', revenue: 82000, profit: 19800, orders: 980, expenses: 62200 },
  { month: 'Aug 2025', revenue: 86000, profit: 20600, orders: 1040, expenses: 65400 },
  { month: 'Sep 2025', revenue: 91000, profit: 21800, orders: 1100, expenses: 69200 },
  { month: 'Oct 2025', revenue: 89000, profit: 20400, orders: 1060, expenses: 68600 },
  { month: 'Nov 2025', revenue: 98000, profit: 23500, orders: 1200, expenses: 74500 },
  { month: 'Dec 2025', revenue: 125000, profit: 32000, orders: 1550, expenses: 93000 },
  { month: 'Jan 2026', revenue: 94000, profit: 21600, orders: 1120, expenses: 72400 },
  { month: 'Feb 2026', revenue: 96000, profit: 22100, orders: 1150, expenses: 73900 },
  { month: 'Mar 2026', revenue: 108000, profit: 26000, orders: 1310, expenses: 82000 },
  { month: 'Apr 2026', revenue: 112000, profit: 27100, orders: 1340, expenses: 84900 },
  { month: 'May 2026', revenue: 118000, profit: 28400, orders: 1410, expenses: 89600 },
  { month: 'Jun 2026', revenue: 124839, profit: 30211, orders: 1489, expenses: 94628 }
];

export const REGIONAL_SALES = [
  { region: 'Andhra Pradesh', sales: 485000, orders: 5800, growth: 12.4, color: '#6366f1' },
  { region: 'Telangana', sales: 324000, orders: 3900, growth: 8.2, color: '#3b82f6' },
  { region: 'Karnataka', sales: 295000, orders: 3500, growth: 22.8, color: '#10b981' },
  { region: 'Tamil Nadu', sales: 144390, orders: 1692, growth: -3.5, color: '#ef4444' }
];

export const PRODUCT_CATEGORIES = [
  { name: 'Electronics', revenue: 499356, percentage: 40, sales: 2450, margin: 18 },
  { name: 'Apparel & Fashion', revenue: 312097, percentage: 25, sales: 4120, margin: 35 },
  { name: 'Home & Kitchen', revenue: 187258, percentage: 15, sales: 1980, margin: 28 },
  { name: 'Beauty & Wellness', revenue: 149807, percentage: 12, sales: 3820, margin: 42 },
  { name: 'Sports & Outdoors', revenue: 99872, percentage: 8, sales: 1100, margin: 30 }
];

export const MOCK_CUSTOMERS: CustomerDataPoint[] = [
  {
    id: 'c-1',
    name: 'Sarah Jenkins',
    email: 'sarah.j@outlook.com',
    segment: 'VIP',
    ltv: 4850,
    purchaseFrequency: 4.8,
    churnProbability: 8,
    engagementScore: 94,
    spendingHistory: [400, 350, 480, 520, 610, 490, 580, 710, 700],
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'
  },
  {
    id: 'c-2',
    name: 'Marcus Vance',
    email: 'marcus.v@gmail.com',
    segment: 'Loyal',
    ltv: 2980,
    purchaseFrequency: 3.2,
    churnProbability: 15,
    engagementScore: 82,
    spendingHistory: [210, 240, 300, 180, 320, 410, 390, 450],
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150'
  },
  {
    id: 'c-3',
    name: 'Elena Rostova',
    email: 'elena.r@yandex.com',
    segment: 'VIP',
    ltv: 5120,
    purchaseFrequency: 5.1,
    churnProbability: 4,
    engagementScore: 97,
    spendingHistory: [500, 620, 410, 550, 680, 590, 610, 650, 720, 800],
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150'
  },
  {
    id: 'c-4',
    name: 'David Kim',
    email: 'david.kim@naver.com',
    segment: 'At Risk',
    ltv: 1450,
    purchaseFrequency: 1.1,
    churnProbability: 72,
    engagementScore: 35,
    spendingHistory: [300, 250, 400, 200, 150, 150, 0, 0],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
  },
  {
    id: 'c-5',
    name: 'Chloe Tremblay',
    email: 'chloe.t@yahoo.ca',
    segment: 'New',
    ltv: 320,
    purchaseFrequency: 1.0,
    churnProbability: 28,
    engagementScore: 68,
    spendingHistory: [320],
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150'
  },
  {
    id: 'c-6',
    name: 'James Reynolds',
    email: 'jreynolds@gmail.com',
    segment: 'Lost',
    ltv: 890,
    purchaseFrequency: 0.0,
    churnProbability: 98,
    engagementScore: 5,
    spendingHistory: [120, 220, 180, 200, 170, 0, 0, 0, 0, 0],
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150'
  },
  {
    id: 'c-7',
    name: 'Aisha Bello',
    email: 'aisha.b@glowup.ng',
    segment: 'Loyal',
    ltv: 2410,
    purchaseFrequency: 2.8,
    churnProbability: 18,
    engagementScore: 79,
    spendingHistory: [150, 180, 220, 210, 310, 340, 290, 350, 360],
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150'
  },
  {
    id: 'c-8',
    name: 'Robert Miller',
    email: 'rmiller@verizon.net',
    segment: 'At Risk',
    ltv: 1100,
    purchaseFrequency: 0.8,
    churnProbability: 65,
    engagementScore: 40,
    spendingHistory: [250, 300, 280, 150, 120, 0, 0],
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150'
  }
];

export const CUSTOMER_COHORT_RETENTION = [
  { cohort: 'Jan 2026', size: 1200, m1: 100, m2: 85, m3: 78, m4: 72, m5: 68, m6: 65 },
  { cohort: 'Feb 2026', size: 1150, m1: 100, m2: 82, m3: 75, m4: 69, m5: 64, m6: null },
  { cohort: 'Mar 2026', size: 1310, m1: 100, m2: 88, m3: 81, m4: 75, m5: null, m6: null },
  { cohort: 'Apr 2026', size: 1340, m1: 100, m2: 84, m3: 77, m4: null, m5: null, m6: null },
  { cohort: 'May 2026', size: 1410, m1: 100, m2: 86, m3: null, m4: null, m5: null, m6: null },
  { cohort: 'Jun 2026', size: 1489, m1: 100, m2: null, m3: null, m4: null, m5: null, m6: null }
];

export const MOCK_INVENTORY: InventoryItem[] = [
  {
    id: 'i-1',
    name: 'Zenith Pro Smartwatch v3',
    sku: 'EL-ZEN-940',
    category: 'Electronics',
    stockLevel: 145,
    minThreshold: 150,
    demandForecast: 310,
    warehouse: 'Central Hub',
    supplierName: 'Apex Electronics Corp',
    supplierRating: 4.6,
    leadTimeDays: 7,
    cost: 85.00,
    price: 189.99
  },
  {
    id: 'i-2',
    name: 'ActiveFit Noise-Canceling Buds',
    sku: 'EL-ACT-230',
    category: 'Electronics',
    stockLevel: 512,
    minThreshold: 100,
    demandForecast: 480,
    warehouse: 'East Warehouse',
    supplierName: 'SoundWave Shenzhen Co',
    supplierRating: 4.8,
    leadTimeDays: 14,
    cost: 32.50,
    price: 79.99
  },
  {
    id: 'i-3',
    name: 'VaporWeave Running Jacket',
    sku: 'AP-VAP-812',
    category: 'Apparel & Fashion',
    stockLevel: 18,
    minThreshold: 50,
    demandForecast: 120,
    warehouse: 'West Logistics Center',
    supplierName: 'TexStyle Fabrics Ind',
    supplierRating: 3.9,
    leadTimeDays: 10,
    cost: 18.00,
    price: 49.99
  },
  {
    id: 'i-4',
    name: 'ThermaGlow smart Heaters',
    sku: 'HK-THR-402',
    category: 'Home & Kitchen',
    stockLevel: 80,
    minThreshold: 30,
    demandForecast: 25,
    warehouse: 'Central Hub',
    supplierName: 'HomeComfort Solutions',
    supplierRating: 4.2,
    leadTimeDays: 5,
    cost: 45.00,
    price: 119.99
  },
  {
    id: 'i-5',
    name: 'Radiance Peptide Facial Serum',
    sku: 'BW-RAD-110',
    category: 'Beauty & Wellness',
    stockLevel: 1200,
    minThreshold: 200,
    demandForecast: 640,
    warehouse: 'East Warehouse',
    supplierName: 'LuxeCare Cosmetics',
    supplierRating: 4.9,
    leadTimeDays: 8,
    cost: 9.50,
    price: 34.00
  },
  {
    id: 'i-6',
    name: 'HydroMax Insulated Flask 1L',
    sku: 'SO-HYD-502',
    category: 'Sports & Outdoors',
    stockLevel: 32,
    minThreshold: 80,
    demandForecast: 150,
    warehouse: 'West Logistics Center',
    supplierName: 'EcoFlask Manufacturing',
    supplierRating: 4.1,
    leadTimeDays: 12,
    cost: 7.00,
    price: 24.99
  }
];

export const MOCK_DEPARTMENTS: DepartmentBudget[] = [
  { department: 'Marketing', budget: 150000, spent: 142500, color: '#6366f1' },
  { department: 'Sales Operations', budget: 120000, spent: 108900, color: '#10b981' },
  { department: 'R&D Product Development', budget: 200000, spent: 198000, color: '#3b82f6' },
  { department: 'Customer Success', budget: 80000, spent: 76000, color: '#f59e0b' },
  { department: 'Logistics & Supply Chain', budget: 90000, spent: 88500, color: '#ec4899' }
];

export const MOCK_EMPLOYEES: EmployeeMetric[] = [
  {
    id: 'e-1',
    name: 'Alexander Mercer',
    role: 'Senior Enterprise AE',
    department: 'Sales Operations',
    productivity: 94,
    efficiency: 91,
    revenueContribution: 165000,
    goalAchievement: 118,
    attendanceRate: 98.5,
    satisfactionScore: 4.8,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
  },
  {
    id: 'e-2',
    name: 'Miranda Lopez',
    role: 'Growth Marketing Manager',
    department: 'Marketing',
    productivity: 88,
    efficiency: 85,
    revenueContribution: 94000,
    goalAchievement: 104,
    attendanceRate: 96.0,
    satisfactionScore: 4.5,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150'
  },
  {
    id: 'e-3',
    name: 'Justin Timberlake',
    role: 'Warehouse Coordinator',
    department: 'Logistics & Supply Chain',
    productivity: 96,
    efficiency: 97,
    revenueContribution: 0,
    goalAchievement: 108,
    attendanceRate: 100.0,
    satisfactionScore: 4.2,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150'
  },
  {
    id: 'e-4',
    name: 'Priya Sharma',
    role: 'Customer Support Lead',
    department: 'Customer Success',
    productivity: 91,
    efficiency: 94,
    revenueContribution: 24000,
    goalAchievement: 98,
    attendanceRate: 97.2,
    satisfactionScore: 4.9,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150'
  },
  {
    id: 'e-5',
    name: 'Dieter Wagner',
    role: 'Solutions Engineer',
    department: 'Sales Operations',
    productivity: 84,
    efficiency: 88,
    revenueContribution: 112000,
    goalAchievement: 93,
    attendanceRate: 94.5,
    satisfactionScore: 4.0,
    avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150'
  }
];

export const MOCK_ALERTS: AnomalyAlert[] = [
  {
    id: 'alert-1',
    title: 'Sudden Revenue Drop (South Region)',
    description: 'Revenue dropped 18% in the South region over the last 7 days compared to rolling 30-day averages.',
    timestamp: '2 hours ago',
    severity: 'high',
    category: 'sales',
    status: 'active',
    recommendation: 'Launch localized digital advertising campaign. Increase marketing spend by 12% in the Southern division and run region-specific promo discount keys.',
    impact: 'Estimated value: +₹18,400 in regional sales recovery.'
  },
  {
    id: 'alert-2',
    title: 'Critical Inventory Shortage (VaporWeave Jacket)',
    description: 'Stock levels of VaporWeave Running Jacket (AP-VAP-812) dropped to 18 units (Safety threshold: 50). Out of stock predicted in 4.8 days based on demand metrics.',
    timestamp: '5 hours ago',
    severity: 'critical',
    category: 'inventory',
    status: 'active',
    recommendation: 'Reorder 500 units from supplier TexStyle Fabrics immediately. Expedited delivery option recommended due to high demand forecast.',
    impact: 'Est. value: Prevents ₹24,990 in lost sales opportunities.'
  },
  {
    id: 'alert-3',
    title: 'Declining Customer Retention Trend',
    description: 'Customer retention rate dropped to 78.5% (-1.8% month-over-month). Segment analyses reveal rising attrition rates in At Risk customers.',
    timestamp: '1 day ago',
    severity: 'medium',
    category: 'customer',
    status: 'active',
    recommendation: 'Launch a loyalty rewards program targeting churn-prone customers with ₹15 loyalty vouchers and 2x points benefits.',
    impact: 'Est. value: Decreases churn probability of At Risk tier by 15-20%.'
  },
  {
    id: 'alert-4',
    title: 'Positive Profit Margin Spikes',
    description: 'Net Profit margin peaked at 24.2% today, driven by strong growth trends in premium margin categories (Beauty & Wellness margin at 42%).',
    timestamp: '2 days ago',
    severity: 'low',
    category: 'finance',
    status: 'resolved',
    recommendation: 'Expand high-margin Beauty & Wellness product catalog and redirect 5% marketing budget allocation from Electronics (18% margin).',
    impact: 'Est. value: Projected net profit increase of +₹12,000/month.'
  }
];

// ==========================================
// 3. CORE ANALYTICAL ENGINES & NLP
// ==========================================

export function generateSalesForecast(history: SalesDataPoint[], forecastMonthsCount = 6): ForecastPoint[] {
  const result: ForecastPoint[] = [];
  history.forEach(item => {
    result.push({
      month: item.month,
      historical: item.revenue
    });
  });

  const len = history.length;
  if (len === 0) return result;

  let totalGrowth = 0;
  for (let i = 1; i < len; i++) {
    totalGrowth += (history[i].revenue - history[i - 1].revenue) / history[i - 1].revenue;
  }
  const avgGrowth = totalGrowth / (len - 1);

  const lastPoint = history[len - 1];
  let lastRevenue = lastPoint.revenue;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const parts = lastPoint.month.split(' ');
  const lastMonthName = parts[0];
  const lastYear = parseInt(parts[1], 10);
  let currentMonthIndex = months.indexOf(lastMonthName);
  let currentYear = lastYear;

  result[len - 1].forecast = lastRevenue;
  result[len - 1].lowerConfidence = lastRevenue;
  result[len - 1].upperConfidence = lastRevenue;

  for (let i = 1; i <= forecastMonthsCount; i++) {
    currentMonthIndex++;
    if (currentMonthIndex >= 12) {
      currentMonthIndex = 0;
      currentYear++;
    }

    const projectedMonthName = `${months[currentMonthIndex]} ${currentYear}`;
    let seasonalFactor = 1.0;
    if (currentMonthIndex === 10) seasonalFactor = 1.08;
    if (currentMonthIndex === 11) seasonalFactor = 1.25;
    if (currentMonthIndex === 0) seasonalFactor = 0.85;
    
    const baseProjected = lastRevenue * (1 + avgGrowth + (Math.random() * 0.02 - 0.01));
    const finalForecast = Math.round(baseProjected * seasonalFactor);
    const uncertaintyMultiplier = i * 0.04;

    result.push({
      month: projectedMonthName,
      forecast: finalForecast,
      lowerConfidence: Math.round(finalForecast * (1 - uncertaintyMultiplier)),
      upperConfidence: Math.round(finalForecast * (1 + uncertaintyMultiplier))
    });

    lastRevenue = baseProjected;
  }

  return result;
}

export function parseAndCleanCSV(fileName: string, rawText: string): CleanedDataset {
  const lines = rawText.split(/\r?\n/).map(line => line.trim()).filter(line => line.length > 0);
  if (lines.length < 2) {
    throw new Error("Dataset is empty or does not contain header columns.");
  }

  let delimiter = ',';
  if (lines[0].includes(';')) delimiter = ';';
  else if (lines[0].includes('\t')) delimiter = '\t';

  const columns = lines[0].split(delimiter).map(col => col.replace(/['"]+/g, '').trim());
  const parsedData: any[] = [];
  let missingValuesCorrected = 0;
  let validRows = 0;

  for (let i = 1; i < lines.length; i++) {
    const rowRaw = lines[i].split(delimiter);
    if (rowRaw.length < columns.length) continue;

    const rowObj: any = {};
    columns.forEach((col, colIdx) => {
      let cellValue = rowRaw[colIdx]?.replace(/['"]+/g, '').trim() || "";
      if (cellValue === "" || cellValue.toLowerCase() === "null" || cellValue.toLowerCase() === "nan") {
        missingValuesCorrected++;
        cellValue = "0";
      }

      const cleanedValue = cellValue.replace(/[₹,%]/g, '');
      const parsedNum = parseFloat(cleanedValue);
      if (!isNaN(parsedNum) && cleanedValue !== "") {
        rowObj[col] = parsedNum;
      } else {
        rowObj[col] = cellValue === "0" ? "N/A" : cellValue;
      }
    });

    parsedData.push(rowObj);
    validRows++;
  }

  let xAxisKey = columns[0];
  const yAxisKeys: string[] = [];
  const dateCol = columns.find(col => {
    const name = col.toLowerCase();
    return name.includes('date') || name.includes('month') || name.includes('year');
  });
  if (dateCol) xAxisKey = dateCol;

  columns.forEach(col => {
    if (col === xAxisKey) return;
    const sample = parsedData.slice(0, 5).map(row => row[col]);
    const numericSamples = sample.filter(val => typeof val === 'number');
    if (numericSamples.length >= sample.length * 0.6) {
      yAxisKeys.push(col);
    }
  });

  if (yAxisKeys.length === 0 && columns.length > 1) {
    yAxisKeys.push(columns[1]);
  }

  let suggestedChartType: 'line' | 'bar' | 'pie' | 'scatter' = 'bar';
  let detectedType = "General Categorical";
  const isTimeSeries = columns.some(col => {
    const name = col.toLowerCase();
    return name.includes('date') || name.includes('month') || name.includes('year');
  });

  if (isTimeSeries) {
    suggestedChartType = 'line';
    detectedType = "Time-Series Data";
  } else if (yAxisKeys.length > 0 && parsedData.length > 2 && parsedData.length < 8) {
    suggestedChartType = 'pie';
    detectedType = "Share/Distribution Data";
  }

  return {
    fileName,
    columns,
    data: parsedData,
    validationReport: {
      totalRows: lines.length - 1,
      validRows,
      missingValuesCorrected,
      detectedType
    },
    suggestedChartType,
    suggestedKeys: {
      xAxisKey,
      yAxisKeys
    }
  };
}

export function processNLPQuery(queryText: string): NLPResponse {
  const query = queryText.toLowerCase().trim();

  if (query.includes('predict') || query.includes('forecast') || query.includes('future')) {
    const forecastData = generateSalesForecast(MONTHLY_SALES_HISTORY, 6);
    return {
      query: queryText,
      answerText: `Here is the **Sales Forecast** generated by our simulated **Prophet/ARIMA** hybrid model for the next 6 months (Jul 2026 - Dec 2026). 

The model predicts a **12.4% sales expansion** heading into Q4, driven by positive seasonal sales boosts.`,
      visualType: 'chart',
      chartType: 'area',
      chartData: forecastData.map(f => ({
        month: f.month,
        forecast: f.forecast || f.historical,
        lowerBound: f.lowerConfidence || f.historical,
        upperBound: f.upperConfidence || f.historical
      })),
      chartKeys: ['forecast', 'lowerBound', 'upperBound'],
      chartColors: ['#6366f1', '#a5b4fc', '#e0e7ff'],
      recommendation: {
        title: 'Adjust Supply Chain Lead Times',
        action: 'Increase ordering frequency for high-demand apparel and electronics by 15% to prepare for predicted December peaks.',
        impact: 'High'
      }
    };
  }

  if (query.includes('poorly') || query.includes('worst') || query.includes('slowest')) {
    const lowPerformers = MOCK_INVENTORY.map(item => ({
      name: item.name.substring(0, 15),
      stock: item.stockLevel,
      demand: item.demandForecast,
      ratio: Math.round((item.stockLevel / (item.demandForecast || 1)) * 100)
    })).sort((a, b) => b.ratio - a.ratio);

    return {
      query: queryText,
      answerText: `Based on demand-to-stock ratio analysis, here are the items with the **slowest stock turnover** (highest overstock ratio).`,
      visualType: 'chart',
      chartType: 'bar',
      chartData: lowPerformers,
      chartKeys: ['stock', 'demand'],
      chartColors: ['#f87171', '#60a5fa'],
      recommendation: {
        title: 'Run Promotional Bundling',
        action: `Set up a buy-one-get-one-50% promotion for ${lowPerformers[0].name} to liquidate surplus units and reduce warehouse space.`,
        impact: 'Medium'
      }
    };
  }

  if (query.includes('profit') || query.includes('decline') || query.includes('why')) {
    const expenseData = PRODUCT_CATEGORIES.map(cat => ({
      name: cat.name,
      revenue: cat.revenue,
      margin: cat.margin,
      profit: Math.round(cat.revenue * (cat.margin / 100))
    }));

    return {
      query: queryText,
      answerText: `Profits are performing robustly overall at **24.2% Net Margin**, but primary profit leakage is currently in **Electronics**, which has the largest sales volume but the lowest net profit margin (**18%**).`,
      visualType: 'chart',
      chartType: 'pie',
      chartData: expenseData,
      chartKeys: ['profit'],
      chartColors: ['#6366f1', '#3b82f6', '#10b981', '#fbbf24', '#f87171'],
      recommendation: {
        title: 'Reallocate Advertising Spend',
        action: 'Reallocate 5% to 8% of low-performing search ads spend from electronics items into premium high-margin beauty and wellness search campaigns.',
        impact: 'High'
      }
    };
  }

  return {
    query: queryText,
    answerText: `I parsed your query: "${queryText}". Here are the matching highlights from the LuminaryAI Analytics DB:
- **Total Revenue**: ₹1,248,390 (expanding +14.8% YoY)
- **Active Anomalies**: 3 warnings detected (critical stockout, regional sales dips)

Try asking: *"Predict next month's sales"*, *"Which products perform poorly?"*, or *"Why are profits declining?"*.`,
    visualType: 'none'
  };
}

export function getAIRecommendations(items: InventoryItem[], customers: CustomerDataPoint[]): Recommendation[] {
  const recommendations: Recommendation[] = [];

  const lowStockItems = items.filter(item => item.stockLevel <= item.minThreshold);
  if (lowStockItems.length > 0) {
    const item = lowStockItems[0];
    const reorderAmount = Math.ceil(item.demandForecast * 1.5);
    recommendations.push({
      id: 'rec-stockout',
      title: `Restock Required: ${item.name}`,
      metric: `Inventory: ${item.stockLevel} units remaining`,
      insight: `Current stock level is below safety threshold (${item.minThreshold}). Forecast indicates stockout in less than 5 days.`,
      action: `Order ${reorderAmount} units from supplier '${item.supplierName}' (Lead time: ${item.leadTimeDays} days).`,
      priority: 'High',
      impact: 'High',
      confidence: 94,
      estimatedValue: Math.round(reorderAmount * (item.price - item.cost)),
      resolved: false
    });
  }

  const atRiskCustomersCount = customers.filter(c => c.segment === 'At Risk').length;
  if (atRiskCustomersCount > 0) {
    recommendations.push({
      id: 'rec-churn',
      title: 'Address Growing Customer Attrition',
      metric: `${atRiskCustomersCount} high-value customers flagged 'At Risk'`,
      insight: `Customer retention shows downward trends due to prolonged inactivity. Churn probability for these customers averages 68.5%.`,
      action: `Deploy an email campaign offering custom ₹15 product loyalty vouchers and exclusive early-access perks.`,
      priority: 'High',
      impact: 'Medium',
      confidence: 87,
      estimatedValue: Math.round(atRiskCustomersCount * 450 * 0.4),
      resolved: false
    });
  }

  recommendations.push({
    id: 'rec-margin',
    title: 'Optimize Marketing Spend Allocation',
    metric: 'Beauty Category Margin: 42% (Electronics: 18%)',
    insight: `Beauty & Wellness category generates 42% net profit margin, yet currently represents only 12% of total category revenue share.`,
    action: `Redirect 5% of digital advertising budget from low-margin Electronics to high-margin Beauty campaigns.`,
    priority: 'Medium',
    impact: 'High',
    confidence: 89,
    estimatedValue: 12000,
    resolved: false
  });

  return recommendations;
}

// ==========================================
// 4. SHARED UI ELEMENTS
// ==========================================

export const GlassCard: React.FC<{ children?: React.ReactNode; className?: string; loading?: boolean; hover?: boolean; onClick?: () => void }> = ({
  children,
  className = '',
  loading = false,
  hover = true,
  onClick
}) => {
  const baseClass = 'glass-panel rounded-2xl p-6 transition-all duration-300';
  const hoverClass = hover ? 'glass-card-hover cursor-pointer' : '';
  const clickClass = onClick ? 'active:scale-[0.98]' : '';

  if (loading) {
    return (
      <div className={`${baseClass} min-h-[150px] flex flex-col justify-between space-y-4 ${className}`}>
        <div className="h-4 w-1/3 skeleton rounded" />
        <div className="h-8 w-2/3 skeleton rounded" />
        <div className="h-4 w-full skeleton rounded" />
      </div>
    );
  }

  return (
    <div className={`${baseClass} ${hoverClass} ${clickClass} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};

const AnimatedCounter: React.FC<{ value: number; prefix?: string; suffix?: string; decimals?: number }> = ({ 
  value, 
  prefix = '', 
  suffix = '',
  decimals = 0 
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (end === 0) return;
    const duration = 1000;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = progress * (2 - progress);
      const current = start + (end - start) * easeProgress;
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(end);
      }
    };
    requestAnimationFrame(animate);
  }, [value]);

  return (
    <span>
      {prefix}
      {displayValue.toLocaleString('en-IN', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      })}
      {suffix}
    </span>
  );
};

// ==========================================
// 5. SHELL CONTAINERS (SIDEBAR, HEADER, MODALS)
// ==========================================

export const Sidebar: React.FC<{ activeTab: string; setActiveTab: (tab: string) => void; userRole: 'Admin' | 'Manager' | 'Analyst' }> = ({
  activeTab,
  setActiveTab,
  userRole
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [workspace, setWorkspace] = useState('GlobalMart HQ');

  const menuItems = [
    { id: 'home', label: 'Home Dashboard', icon: LayoutDashboard },
    { id: 'sales', label: 'Sales Analytics', icon: TrendingUp },
    { id: 'customers', label: 'Customer Analytics', icon: Users },
    { id: 'inventory', label: 'Inventory Analytics', icon: Boxes },
    { id: 'finance', label: 'Finance Dashboard', icon: DollarSign },
    { id: 'employees', label: 'Employee Dashboard', icon: UserCheck },
    { id: 'insights', label: 'AI Insights', icon: Sparkles, badge: 'New' },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <aside className={`glass-panel border-r border-slate-200/50 dark:border-slate-800/50 h-screen flex flex-col justify-between transition-all duration-300 relative z-30 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <button onClick={() => setIsCollapsed(!isCollapsed)} className="absolute top-6 -right-3.5 bg-brand-600 hover:bg-brand-700 text-white rounded-full p-1 border border-brand-500 shadow-md active:scale-95 transition-transform">
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      <div>
        <div className="p-6 flex items-center gap-3 border-b border-slate-200/50 dark:border-slate-800/50">
          <div className="bg-gradient-to-tr from-brand-600 to-indigo-400 p-2.5 rounded-xl shadow-md text-white flex-shrink-0 animate-pulse-slow">
            <BrainCircuit size={22} />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-brand-600 to-indigo-400 bg-clip-text text-transparent dark:from-brand-400 dark:to-indigo-300">LuminaryAI</span>
              <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">Decision Intelligence</span>
            </div>
          )}
        </div>

        <div className="p-4 border-b border-slate-200/50 dark:border-slate-800/50">
          {isCollapsed ? (
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 mx-auto" title={workspace}>
              <Building2 size={18} />
            </div>
          ) : (
            <div className="relative">
              <label className="text-[10px] font-semibold text-slate-400 uppercase block mb-1">Active Space</label>
              <select value={workspace} onChange={(e) => setWorkspace(e.target.value)} className="w-full bg-slate-100/50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold rounded-lg p-2 border border-slate-202/50 outline-none text-slate-700 dark:text-slate-200 cursor-pointer">
                <option value="GlobalMart HQ">🏢 GlobalMart HQ</option>
                <option value="Logistics Hub East">📦 Logistics East</option>
                <option value="E-Commerce Division">🌐 E-Commerce Dev</option>
              </select>
            </div>
          )}
        </div>

        <nav className="p-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all relative group ${isActive ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20' : 'text-slate-550 hover:bg-slate-100/70 dark:hover:bg-slate-800/50 hover:text-slate-800 dark:hover:text-slate-200'}`}>
                {isActive && <span className="absolute left-0 top-3 bottom-3 w-1 bg-brand-500 rounded-r-full" />}
                <Icon size={18} className={isActive ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400 group-hover:text-slate-655'} />
                {!isCollapsed && <span className="flex-grow text-left font-semibold">{item.label}</span>}
                {!isCollapsed && item.badge && <span className="bg-brand-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">{item.badge}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-200/50 dark:border-slate-800/50">
        <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" alt="Avatar" className="w-10 h-10 rounded-full object-cover border ring-2 ring-brand-500/20" />
          {!isCollapsed && (
            <div className="flex flex-col truncate">
              <span className="font-semibold text-xs text-slate-800 dark:text-slate-200 truncate">Jane Doe</span>
              <span className="text-[10px] text-slate-400 flex items-center gap-1 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
                {userRole} Mode
              </span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export const Header: React.FC<{
  activeTab: string;
  userRole: 'Admin' | 'Manager' | 'Analyst';
  setUserRole: (role: 'Admin' | 'Manager' | 'Analyst') => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  onOpenUpload: () => void;
  onOpenAIChat: (initialQuery?: string) => void;
  alerts: AnomalyAlert[];
  onResolveAlert: (id: string) => void;
  setActiveTab: (tab: string) => void;
}> = ({
  activeTab,
  userRole,
  setUserRole,
  darkMode,
  setDarkMode,
  onOpenUpload,
  onOpenAIChat,
  alerts,
  onResolveAlert,
  setActiveTab
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const activeAlerts = alerts.filter(a => a.status === 'active');

  const getPageTitle = () => {
    switch (activeTab) {
      case 'home': return 'Home Dashboard';
      case 'sales': return 'Sales Analytics';
      case 'customers': return 'Customer Analytics';
      case 'inventory': return 'Inventory Analytics';
      case 'finance': return 'Finance Dashboard';
      case 'employees': return 'Employee Dashboard';
      case 'insights': return 'AI Recommendation & Insights';
      case 'reports': return 'Business Reports Center';
      case 'settings': return 'System Settings';
      default: return 'LuminaryAI';
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onOpenAIChat(searchQuery);
      setSearchQuery('');
    }
  };

  return (
    <header className="glass-panel border-b border-slate-200/50 dark:border-slate-800/50 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100 m-0 tracking-tight">{getPageTitle()}</h1>
        <p className="text-xs text-slate-400 m-0 mt-0.5 font-medium">Real-time decision intelligence overview</p>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        <form onSubmit={handleSearchSubmit} className="relative hidden md:block">
          <input type="text" placeholder="Ask AI... e.g. 'Predict next month's sales'" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-72 bg-slate-100/60 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-900 focus:bg-white dark:focus:bg-slate-950 text-xs rounded-xl pl-9 pr-8 py-2.5 border border-slate-200/50 dark:border-slate-800 focus:border-brand-500/50 outline-none text-slate-700 dark:text-slate-200 transition-all font-medium" />
          <Search size={14} className="absolute left-3.5 top-3.5 text-slate-400" />
          <button type="submit" className="absolute right-2 top-2 p-1.5 rounded-lg bg-gradient-to-tr from-brand-600 to-indigo-500 text-white hover:opacity-90 active:scale-95 transition-transform">
            <Sparkles size={10} />
          </button>
        </form>

        <button onClick={onOpenUpload} className="flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-850 dark:hover:bg-slate-800 border border-slate-202/50 text-slate-750 dark:text-slate-200 transition-all">
          <Upload size={14} />
          <span className="hidden sm:inline">Upload Data</span>
        </button>

        <div className="relative">
          <button onClick={() => setShowNotifications(!showNotifications)} className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-850 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-202/50 text-slate-655 dark:text-slate-300 relative transition-all active:scale-95">
            <Bell size={16} />
            {activeAlerts.length > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-danger-500 text-white rounded-full flex items-center justify-center text-[9px] font-bold ring-2 ring-white dark:ring-slate-900 animate-bounce">{activeAlerts.length}</span>}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-slide-up">
              <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="font-bold text-sm text-slate-855 dark:text-slate-100">Operational Alerts</span>
                <span className="text-[10px] bg-danger-50 text-danger-500 font-bold px-2 py-0.5 rounded-full">{activeAlerts.length} Active</span>
              </div>
              <div className="max-h-72 overflow-y-auto">
                {activeAlerts.length === 0 ? (
                  <div className="p-6 text-center text-slate-400 text-xs">
                    <Info className="mx-auto mb-2" size={24} />
                    All operating modules are clean. No anomalies detected.
                  </div>
                ) : (
                  activeAlerts.map(alert => (
                    <div key={alert.id} className="p-3 border-b border-slate-100 dark:border-slate-800 last:border-b-0 hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors">
                      <div className="flex items-start gap-2.5">
                        <AlertTriangle className={`flex-shrink-0 mt-0.5 ${alert.severity === 'critical' ? 'text-danger-500' : 'text-warning-550'}`} size={14} />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{alert.title}</p>
                          <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-2 leading-relaxed">{alert.description}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-[9px] text-slate-400">{alert.timestamp}</span>
                            <button onClick={() => { onResolveAlert(alert.id); setShowNotifications(false); setActiveTab('insights'); }} className="text-[9px] bg-brand-500 text-white font-bold px-2 py-1 rounded hover:bg-brand-600 transition-colors">Resolve</button>
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

        <div className="relative">
          <select value={userRole} onChange={(e) => setUserRole(e.target.value as any)} className="bg-slate-100 dark:bg-slate-850 hover:bg-slate-200 dark:hover:bg-slate-800 text-xs font-bold rounded-xl px-3 py-2 border border-slate-202/50 outline-none text-slate-700 dark:text-slate-200 cursor-pointer">
            <option value="Admin">🛠️ Admin</option>
            <option value="Manager">📈 Manager</option>
            <option value="Analyst">📊 Analyst</option>
          </select>
        </div>

        <button onClick={() => setDarkMode(!darkMode)} className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-850 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-202/50 text-slate-655 dark:text-slate-350 transition-all active:scale-95">
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </header>
  );
};

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

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

    setTimeout(() => {
      const response = processNLPQuery(query);
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

  const handleApplyAction = (msgId: string, recTitle: string) => {
    setMessages(prev => 
      prev.map(m => m.id === msgId && m.recommendation ? { ...m, recommendation: { ...m.recommendation, applied: true } } : m)
    );

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
              <Pie data={data} cx="50%" cy="50%" innerRadius={30} outerRadius={55} paddingAngle={3} dataKey={keys[0]}>
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `₹${Number(value).toLocaleString('en-IN')}`} />
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
      <div className="flex-1" onClick={onClose} />
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl h-full flex flex-col justify-between animate-slide-up relative">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-brand-50 text-brand-600 dark:bg-brand-950 p-2 rounded-lg"><Brain size={18} /></div>
            <div>
              <span className="font-bold text-sm text-slate-800 dark:text-slate-100 block">LuminaryAI Assistant</span>
              <span className="text-[10px] text-slate-400 font-semibold uppercase">Real-time analytical reasoning</span>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-105 text-slate-400"><X size={16} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${msg.sender === 'user' ? 'bg-gradient-to-tr from-brand-600 to-indigo-500 text-white rounded-br-none' : 'bg-slate-105 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 rounded-bl-none'}`}>
                <p className="whitespace-pre-line select-text" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>₹1</strong>').replace(/\*(.*?)\*/g, '<em>₹1</em>') }} />
                {msg.visual && renderVisual(msg.visual)}
                {msg.recommendation && (
                  <div className="mt-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-3 rounded-xl">
                    <div className="flex items-center gap-1.5 text-brand-600 font-bold mb-1"><Sparkles size={12} /><span>AI Recommendation</span></div>
                    <p className="font-semibold text-slate-800 dark:text-slate-200 text-[11px]">{msg.recommendation.title}</p>
                    <p className="text-slate-500 text-[10px] mt-1">{msg.recommendation.action}</p>
                    <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/60">
                      <span className="text-[9px] text-emerald-500 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">{msg.recommendation.impact} Impact</span>
                      {msg.recommendation.applied ? <span className="text-[10px] text-slate-400 flex items-center gap-1"><CheckCircle2 size={12} className="text-emerald-500" />Applied</span> : <button onClick={() => handleApplyAction(msg.id, msg.recommendation!.title)} className="text-[10px] font-bold bg-brand-500 hover:bg-brand-600 text-white px-2.5 py-1 rounded-lg">Execute Plan</button>}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-slate-105 dark:bg-slate-800/80 rounded-2xl rounded-bl-none px-4 py-3 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
          <div className="flex flex-wrap gap-1.5">
            <button onClick={() => handleNewQuery('Predict next month\'s sales')} className="text-[10px] bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-500 dark:text-slate-300 font-semibold px-2 py-1 rounded-lg border border-slate-200/30">🔮 Predict Sales</button>
            <button onClick={() => handleNewQuery('Which products perform poorly?')} className="text-[10px] bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-500 dark:text-slate-300 font-semibold px-2 py-1 rounded-lg border border-slate-200/30">📉 Poor Sellers</button>
            <button onClick={() => handleNewQuery('Why are profits declining?')} className="text-[10px] bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-500 dark:text-slate-300 font-semibold px-2 py-1 rounded-lg border border-slate-200/30">💸 Margin Analysis</button>
          </div>

          <form onSubmit={handleSend} className="flex gap-2">
            <input type="text" placeholder="Ask a question..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="flex-1 bg-slate-105 dark:bg-slate-950 focus:bg-white dark:focus:bg-black border border-slate-200/50 dark:border-slate-800 focus:border-brand-500/50 rounded-xl px-3.5 py-2.5 text-xs outline-none text-slate-700 dark:text-slate-200 transition-all" />
            <button type="submit" disabled={!inputValue.trim()} className="bg-brand-500 hover:bg-brand-600 disabled:bg-slate-200 text-white rounded-xl px-3.5 flex items-center justify-center"><Send size={14} /></button>
          </form>
        </div>
      </div>
    </div>
  );
};

export function generateMockCSVTemplate(): string {
  return `Month,Revenue,Expenses,Orders,CustomerGrowth
July,82000,62200,980,120
August,86000,65400,1040,145
September,91000,69200,1100,160
October,89000,68600,1060,110
November,98000,74500,1200,210
December,125000,93000,1550,340
`;
}

export const DataUploadModal: React.FC<DataUploadModalProps> = ({
  isOpen,
  onClose,
  onApplyDataset
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [parsedDataset, setParsedDataset] = useState<CleanedDataset | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const processFileContent = (fileName: string, text: string) => {
    try {
      setErrorMsg('');
      const cleaned = parseAndCleanCSV(fileName, text);
      setParsedDataset(cleaned);
      canvasConfetti({ particleCount: 50, spread: 40, origin: { y: 0.6 } });
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to parse CSV dataset.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => processFileContent(file.name, event.target?.result as string);
      reader.readAsText(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-955/30 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl relative animate-slide-up">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-brand-50 text-brand-600 dark:bg-brand-950 p-2 rounded-lg"><Upload size={18} /></div>
            <div>
              <h2 className="text-sm font-bold text-slate-850 dark:text-slate-100 m-0">Data Upload Wizard</h2>
              <span className="text-[10px] text-slate-400 font-semibold uppercase">Smart data cleaning & visualization</span>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400"><X size={18} /></button>
        </div>

        <div className="p-6">
          {!parsedDataset ? (
            <div className="space-y-4">
              <div className="border-2 border-dashed rounded-2xl p-8 text-center bg-slate-50/50 dark:bg-slate-950/20 border-slate-200">
                <input type="file" id="csv-file-input" accept=".csv,.txt" onChange={handleFileChange} className="hidden" />
                <Upload size={40} className="mx-auto text-slate-400 mb-3" />
                <p className="text-xs font-bold text-slate-700">Drag and drop your spreadsheet file here</p>
                <label htmlFor="csv-file-input" className="mt-4 inline-flex items-center bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-bold px-4 py-2 cursor-pointer transition-colors shadow-lg">Browse Files</label>
              </div>
              <div className="flex items-center justify-between p-3.5 bg-slate-100/50 dark:bg-slate-850/50 rounded-xl border">
                <span className="text-[10px] text-slate-500 font-semibold">No data file? Test the validation wizard instantly.</span>
                <button onClick={() => processFileContent('Sample_Report.csv', generateMockCSVTemplate())} className="text-[10px] font-bold text-brand-600 hover:underline">Load Sample Dataset</button>
              </div>
            </div>
          ) : (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-slate-50 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-200/10">
                  <span className="text-[10px] text-slate-400 uppercase block font-semibold">Total Rows</span>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{parsedDataset.validationReport.totalRows}</span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-200/10">
                  <span className="text-[10px] text-slate-400 uppercase block font-semibold">Clean Rows</span>
                  <span className="text-sm font-bold text-emerald-500">{parsedDataset.validationReport.validRows}</span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-200/10">
                  <span className="text-[10px] text-slate-400 uppercase block font-semibold">Cleaned Nulls</span>
                  <span className="text-sm font-bold text-warning-550">{parsedDataset.validationReport.missingValuesCorrected}</span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-200/10">
                  <span className="text-[10px] text-slate-400 uppercase block font-semibold">Category</span>
                  <span className="text-[11px] font-bold text-brand-500 truncate block mt-0.5">{parsedDataset.validationReport.detectedType}</span>
                </div>
              </div>

              <div className="bg-emerald-50/30 dark:bg-emerald-950/10 border border-emerald-500/20 p-3 rounded-xl flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-500" />
                <span className="text-[10px] text-emerald-600 font-bold">File '{parsedDataset.fileName}' successfully parsed and validated.</span>
              </div>

              <div className="w-full h-40 bg-slate-50 dark:bg-slate-950 border rounded-xl p-2">
                <ResponsiveContainer width="100%" height="100%">
                  {parsedDataset.suggestedChartType === 'line' ? (
                    <LineChart data={parsedDataset.data}>
                      <XAxis dataKey={parsedDataset.suggestedKeys.xAxisKey} tick={{ fontSize: 9 }} stroke="#94a3b8" />
                      <YAxis tick={{ fontSize: 9 }} stroke="#94a3b8" />
                      <Tooltip />
                      {parsedDataset.suggestedKeys.yAxisKeys.map((key, idx) => (
                        <Line key={key} type="monotone" dataKey={key} stroke={['#6366f1', '#10b981'][idx % 2]} strokeWidth={2} />
                      ))}
                    </LineChart>
                  ) : (
                    <BarChart data={parsedDataset.data}>
                      <XAxis dataKey={parsedDataset.suggestedKeys.xAxisKey} tick={{ fontSize: 9 }} stroke="#94a3b8" />
                      <YAxis tick={{ fontSize: 9 }} stroke="#94a3b8" />
                      <Tooltip />
                      {parsedDataset.suggestedKeys.yAxisKeys.map((key, idx) => (
                        <Bar key={key} dataKey={key} fill={['#6366f1', '#10b981'][idx % 2]} radius={[3, 3, 0, 0]} />
                      ))}
                    </BarChart>
                  )}
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between">
          {!parsedDataset ? (
            <button onClick={onClose} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold ml-auto">Cancel</button>
          ) : (
            <>
              <button onClick={() => setParsedDataset(null)} className="px-3.5 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold">Reset</button>
              <div className="flex gap-2">
                <button onClick={onClose} className="px-3.5 py-2 border text-slate-500 rounded-xl text-xs font-bold">Close</button>
                <button onClick={() => { onApplyDataset(parsedDataset); onClose(); }} className="inline-flex items-center gap-1 px-4 py-2 bg-brand-500 text-white rounded-xl text-xs font-bold shadow-md shadow-brand-500/10"><span>Apply to Dashboard</span><ChevronRight size={14} /></button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 6. DASHBOARD PAGE VIEWS
// ==========================================

export const HomeDashboard: React.FC<{
  alerts: AnomalyAlert[];
  onResolveAlert: (id: string) => void;
  setActiveTab: (tab: string) => void;
  onOpenAIChat: (initialQuery?: string) => void;
  uploadedDataset: CleanedDataset | null;
  onClearUploadedDataset: () => void;
}> = ({
  alerts,
  onResolveAlert,
  setActiveTab,
  onOpenAIChat,
  uploadedDataset,
  onClearUploadedDataset
}) => {
  const [kpis, setKpis] = useState<KPICardData[]>(INITIAL_KPI_CARDS);
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [isLoading, setIsLoading] = useState(false);
  const activeAlerts = alerts.filter(a => a.status === 'active');

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
      let multiplier = 1.0;
      if (selectedRegion === 'Andhra Pradesh') multiplier = 1.1;
      else if (selectedRegion === 'Telangana') multiplier = 0.95;
      else if (selectedRegion === 'Karnataka') multiplier = 1.15;
      else if (selectedRegion === 'Tamil Nadu') multiplier = 0.8;

      setKpis(INITIAL_KPI_CARDS.map(kpi => {
        if (['kpi-revenue', 'kpi-orders', 'kpi-customers'].includes(kpi.id)) {
          const newVal = Math.round(kpi.numericValue * multiplier);
          return {
            ...kpi,
            numericValue: newVal,
            value: kpi.id === 'kpi-revenue' ? `₹${newVal.toLocaleString('en-IN')}` : newVal.toLocaleString('en-IN')
          };
        }
        return kpi;
      }));
    }, 400);

    return () => clearTimeout(timer);
  }, [selectedRegion]);

  return (
    <div className="space-y-6 animate-fade-in p-1">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white/40 dark:bg-slate-900/30 p-3.5 rounded-2xl border border-slate-200/50 dark:border-slate-800/60 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-2 bg-white dark:bg-slate-950 rounded-xl border border-slate-200/50 text-xs font-semibold text-slate-500">
            <MapPin size={14} className="text-slate-400" />
            <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)} className="bg-transparent outline-none cursor-pointer text-slate-705 dark:text-slate-350">
              <option value="All Regions">All Regions</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Telangana">Telangana</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
            </select>
          </div>
        </div>
        <button onClick={() => onOpenAIChat("Provide executive business summary")} className="inline-flex items-center gap-2 bg-gradient-to-tr from-brand-600 to-indigo-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg">
          <Brain size={14} /><span>Ask AI Summary</span>
        </button>
      </div>

      {uploadedDataset && (
        <div className="bg-gradient-to-r from-brand-500/20 via-indigo-500/10 to-transparent border border-brand-500/30 p-5 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="bg-brand-500 text-white p-2.5 rounded-2xl shadow-lg"><FileCheck size={20} /></div>
            <div>
              <h3 className="text-sm font-bold text-slate-850 dark:text-slate-100 m-0">Custom Dataset Applied: <span className="underline text-brand-600 font-bold">{uploadedDataset.fileName}</span></h3>
              <p className="text-xs text-slate-500 mt-1">{uploadedDataset.validationReport.validRows} rows parsed, {uploadedDataset.validationReport.missingValuesCorrected} missing cells corrected.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => onOpenAIChat(`Analyze dataset ${uploadedDataset.fileName}`)} className="px-3.5 py-1.5 bg-brand-500 text-white text-xs font-bold rounded-xl">Analyze with AI</button>
            <button onClick={onClearUploadedDataset} className="px-3 py-1.5 bg-slate-100 text-slate-500 text-xs font-bold rounded-xl border">Reset</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {kpis.slice(0, 5).map((kpi) => {
          const isUp = kpi.trend === 'up';
          return (
            <GlassCard key={kpi.id} loading={isLoading} className="relative overflow-hidden">
              <div className="flex flex-col justify-between h-full space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide truncate">{kpi.title}</span>
                <div className="text-xl md:text-2xl font-black text-slate-850 dark:text-slate-50">
                  {kpi.id === 'kpi-revenue' ? <AnimatedCounter value={kpi.numericValue} prefix="₹" /> : ['kpi-profit', 'kpi-retention', 'kpi-inventory'].includes(kpi.id) ? <AnimatedCounter value={kpi.numericValue} suffix="%" decimals={1} /> : <AnimatedCounter value={kpi.numericValue} />}
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-slate-100 mt-1">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isUp ? 'text-emerald-500 bg-emerald-50' : 'text-danger-500 bg-danger-50'}`}>{isUp ? '+' : ''}{kpi.change}%</span>
                  <div className="w-14 h-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={kpi.sparkline.map((v, i) => ({ val: v, idx: i }))}>
                        <Area type="monotone" dataKey="val" stroke={isUp ? '#10b981' : '#ef4444'} fill={isUp ? '#10b98108' : '#ef444408'} strokeWidth={1.5} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {uploadedDataset ? (
        <GlassCard hover={false} className="p-6">
          <div className="flex items-center justify-between mb-4 border-b pb-3">
            <div>
              <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 m-0">Uploaded Dataset Chart Visualization</h3>
              <span className="text-[10px] text-slate-400">Auto mapping of: {uploadedDataset.suggestedKeys.xAxisKey} vs values</span>
            </div>
            <span className="text-[10px] uppercase font-bold text-brand-500 bg-brand-50 px-2.5 py-1 rounded-xl">Visualizer Mode</span>
          </div>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              {uploadedDataset.suggestedChartType === 'line' ? (
                <LineChart data={uploadedDataset.data}>
                  <XAxis dataKey={uploadedDataset.suggestedKeys.xAxisKey} tick={{ fontSize: 10 }} stroke="#94a3b8" />
                  <YAxis tick={{ fontSize: 10 }} stroke="#94a3b8" />
                  <Tooltip />
                  {uploadedDataset.suggestedKeys.yAxisKeys.map((key, index) => (
                    <Line key={key} type="monotone" dataKey={key} stroke={['#6366f1', '#10b981', '#fbbf24'][index % 3]} strokeWidth={2} />
                  ))}
                </LineChart>
              ) : (
                <BarChart data={uploadedDataset.data}>
                  <XAxis dataKey={uploadedDataset.suggestedKeys.xAxisKey} tick={{ fontSize: 10 }} stroke="#94a3b8" />
                  <YAxis tick={{ fontSize: 10 }} stroke="#94a3b8" />
                  <Tooltip />
                  {uploadedDataset.suggestedKeys.yAxisKeys.map((key, index) => (
                    <Bar key={key} dataKey={key} fill={['#6366f1', '#10b981', '#fbbf24'][index % 3]} radius={[4, 4, 0, 0]} />
                  ))}
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </GlassCard>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <GlassCard hover={false} className="lg:col-span-2 p-6">
            <div className="flex items-center justify-between mb-4 border-b pb-3">
              <div>
                <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 m-0">Revenue & Profit Margins</h3>
                <span className="text-[10px] text-slate-400">Monthly operations overview</span>
              </div>
            </div>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MONTHLY_SALES_HISTORY}>
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke="#94a3b8" />
                  <YAxis tick={{ fontSize: 10 }} stroke="#94a3b8" />
                  <Tooltip formatter={(value) => `₹${Number(value).toLocaleString('en-IN')}`} />
                  <Area type="monotone" dataKey="revenue" stroke="#6366f1" fill="url(#colorRevenue)" strokeWidth={2} />
                  <Area type="monotone" dataKey="profit" stroke="#10b981" fill="url(#colorProfit)" strokeWidth={1.5} />
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          <GlassCard hover={false} className="p-6">
            <div className="flex items-center justify-between mb-4 border-b pb-3">
              <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 m-0">Category Share</h3>
            </div>
            <div className="w-full h-48 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={PRODUCT_CATEGORIES.map(c => ({ name: c.name, value: c.revenue }))} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                    {PRODUCT_CATEGORIES.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={['#6366f1', '#3b82f6', '#10b981', '#f59e0b', '#ec4899'][index % 5]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `₹${Number(value).toLocaleString('en-IN')}`} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <span className="text-[10px] text-slate-400 font-bold block">Total Share</span>
                <span className="text-base font-black text-slate-800 dark:text-slate-100">₹1.24M</span>
              </div>
            </div>
          </GlassCard>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5"><AlertTriangle size={14} className="text-danger-500" />Active Warnings ({activeAlerts.length})</span>
          {activeAlerts.slice(0, 2).map((alert) => (
            <GlassCard key={alert.id} className="p-5 border-l-4 border-l-danger-555">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-danger-50 text-danger-500"><AlertTriangle size={18} /></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">{alert.title}</span>
                    <span className="text-[9px] font-bold px-2 py-0.5 bg-danger-50 text-danger-500 rounded-full uppercase">{alert.severity}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">{alert.description}</p>
                  <button onClick={() => { onResolveAlert(alert.id); setActiveTab('insights'); }} className="mt-3 px-3.5 py-1.5 bg-brand-500 text-white rounded-lg text-[10px] font-bold">Review Recommendation</button>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        <div className="space-y-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5"><Sparkles size={14} className="text-brand-505" />AI Insights Summary</span>
          <GlassCard hover={false} className="p-5">
            <div className="space-y-4">
              <div className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5" />
                <div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Customer Base Expanding</span>
                  <p className="text-[10px] text-slate-500 mt-0.5">Loyal customers tier rose 8.7% MoM. Spend averages ₹210/mo.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5" />
                <div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Beauty Margins Peak</span>
                  <p className="text-[10px] text-slate-500 mt-0.5">Average margins in Beauty reached 42%. Net profitability is high.</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export const SalesAnalytics: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in p-1">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[{ title: 'Total Sales', val: '₹1,248,390', change: '+14.8%' }, { title: 'Total Orders', val: '14,892', change: '+12.2%' }, { title: 'Gross profit margin', val: '30.6%', change: '+1.5%' }, { title: 'Avg Order Value', val: '₹83.82', change: '+2.3%' }].map(c => (
          <GlassCard key={c.title} className="p-4 border-l-4 border-l-brand-500">
            <span className="text-[10px] text-slate-400 font-bold block uppercase">{c.title}</span>
            <span className="text-lg font-bold text-slate-800 dark:text-slate-100">{c.val}</span>
            <span className="text-[9px] text-emerald-500 block mt-0.5">{c.change} YoY</span>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard hover={false} className="lg:col-span-2 p-6">
          <h3 className="font-bold text-sm text-slate-850 dark:text-slate-100 mb-4">Revenue & Profit Growth Curves</h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MONTHLY_SALES_HISTORY}>
                <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e115" />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 10 }} stroke="#94a3b8" />
                <Tooltip formatter={(value) => `₹${Number(value).toLocaleString('en-IN')}`} />
                <Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} />
                <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={1.5} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard hover={false} className="p-6">
          <h3 className="font-bold text-sm text-slate-850 dark:text-slate-100 mb-4">Category Margin Breakdown</h3>
          <div className="space-y-4">
            {PRODUCT_CATEGORIES.map((cat, idx) => (
              <div key={cat.name} className="space-y-1">
                <div className="flex justify-between text-[11px] font-bold">
                  <span>{cat.name}</span>
                  <span className="text-slate-550">₹{cat.revenue.toLocaleString('en-IN')}</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full">
                  <div className="h-full rounded-full bg-brand-500" style={{ width: `${cat.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export const CustomerAnalytics: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in p-1">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard hover={false} className="p-6">
          <h3 className="font-bold text-sm text-slate-850 dark:text-slate-105 mb-4">RFM Customer Segments Bubble Matrix</h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart>
                <XAxis type="number" dataKey="ltv" name="LTV" tick={{ fontSize: 9 }} stroke="#94a3b8" />
                <YAxis type="number" dataKey="frequency" name="Freq" tick={{ fontSize: 9 }} stroke="#94a3b8" />
                <ZAxis type="number" dataKey="engagement" range={[40, 200]} />
                <Tooltip />
                <Scatter data={MOCK_CUSTOMERS.map(c => ({ ltv: c.ltv, frequency: c.purchaseFrequency, engagement: c.engagementScore, name: c.name }))} fill="#6366f1" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard hover={false} className="p-6">
          <h3 className="font-bold text-sm text-slate-850 dark:text-slate-100 mb-4">Cohort Retention Analysis</h3>
          <div className="overflow-x-auto text-[10px] font-bold">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-850 border-b">
                  <th className="p-2 text-left">Cohort Month</th>
                  <th className="p-2">Month 1</th>
                  <th className="p-2">Month 2</th>
                  <th className="p-2">Month 3</th>
                </tr>
              </thead>
              <tbody>
                {CUSTOMER_COHORT_RETENTION.map(c => (
                  <tr key={c.cohort} className="border-b">
                    <td className="p-2 text-left font-bold">{c.cohort}</td>
                    <td className="p-2" style={{ backgroundColor: 'rgba(99, 102, 241, 0.25)' }}>100%</td>
                    <td className="p-2" style={{ backgroundColor: 'rgba(99, 102, 241, 0.15)' }}>{c.m2}%</td>
                    <td className="p-2" style={{ backgroundColor: 'rgba(99, 102, 241, 0.08)' }}>{c.m3}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export const InventoryAnalytics: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in p-1">
      <GlassCard hover={false} className="p-6">
        <h3 className="font-bold text-sm text-slate-850 dark:text-slate-105 mb-4">Stock safety Ledger</h3>
        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-850 border-b">
                <th className="p-3">SKU</th>
                <th className="p-3">Category</th>
                <th className="p-3">Stock Level</th>
                <th className="p-3">Safety Threshold</th>
                <th className="p-3 text-right">Supplier</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_INVENTORY.map(item => (
                <tr key={item.id} className="border-b last:border-b-0 font-semibold">
                  <td className="p-3">{item.name}<span className="text-[9px] text-slate-400 block">{item.sku}</span></td>
                  <td className="p-3">{item.category}</td>
                  <td className="p-3">{item.stockLevel} units</td>
                  <td className="p-3 text-warning-550">{item.minThreshold} units</td>
                  <td className="p-3 text-right">{item.supplierName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};

export const FinanceDashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in p-1">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard hover={false} className="p-6">
          <h3 className="font-bold text-sm text-slate-850 dark:text-slate-100 mb-4">Cash Inflow vs Outflows</h3>
          <div className="w-full h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MONTHLY_SALES_HISTORY}>
                <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e115" />
                <XAxis dataKey="month" tick={{ fontSize: 9 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 9 }} stroke="#94a3b8" />
                <Tooltip formatter={(value) => `₹${Number(value).toLocaleString('en-IN')}`} />
                <Line type="monotone" dataKey="revenue" name="Inflow" stroke="#6366f1" strokeWidth={2} />
                <Line type="monotone" dataKey="expenses" name="Outflow" stroke="#fbbf24" strokeWidth={1.5} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard hover={false} className="p-6">
          <h3 className="font-bold text-sm text-slate-850 dark:text-slate-105 mb-4">Department Budgets</h3>
          <div className="w-full h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_DEPARTMENTS}>
                <XAxis dataKey="department" tick={{ fontSize: 9 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 9 }} stroke="#94a3b8" />
                <Tooltip formatter={(value) => `₹${Number(value).toLocaleString('en-IN')}`} />
                <Bar dataKey="budget" name="Allocated" fill="#cbd5e1" radius={[3,3,0,0]} />
                <Bar dataKey="spent" name="Spent" fill="#6366f1" radius={[3,3,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export const EmployeeDashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in p-1">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard hover={false} className="p-6">
          <h3 className="font-bold text-sm text-slate-855 mb-4">Radar performance capability</h3>
          <div className="w-full h-52">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={[{ subject: 'Productivity', val: 86 }, { subject: 'Efficiency', val: 90 }, { subject: 'Attendance', val: 98 }, { subject: 'Satisfaction', val: 92 }]}>
                <PolarGrid stroke="#cbd5e120" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9 }} stroke="#94a3b8" />
                <Radar name="Active metrics" dataKey="val" stroke="#6366f1" fill="#6366f1" fillOpacity={0.25} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard hover={false} className="lg:col-span-2 p-6">
          <h3 className="font-bold text-sm text-slate-855 mb-4">Productivity metrics directories</h3>
          <div className="space-y-3">
            {MOCK_EMPLOYEES.map(emp => (
              <div key={emp.id} className="flex justify-between items-center border-b pb-2">
                <span>{emp.name} &bull; <span className="text-[10px] text-slate-400">{emp.role}</span></span>
                <span className="font-bold text-brand-600">{emp.productivity}% Rating</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export const AIInsights: React.FC<{ alerts: AnomalyAlert[]; onResolveAlert: (id: string) => void }> = ({ alerts, onResolveAlert }) => {
  const [recs, setRecs] = useState<Recommendation[]>(getAIRecommendations(MOCK_INVENTORY, MOCK_CUSTOMERS));

  const handleApplyRec = (id: string) => {
    setRecs(prev => prev.map(r => r.id === id ? { ...r, resolved: true } : r));
    canvasConfetti({ particleCount: 60, spread: 50, origin: { y: 0.8 } });
  };

  return (
    <div className="space-y-6 animate-fade-in p-1">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Decision Actions Recommendations</span>
          {recs.map(rec => (
            <GlassCard key={rec.id} hover={false} className="p-5 border-l-4 border-l-brand-500">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-100">{rec.title}</span>
                <span className="text-[9px] bg-brand-50 text-brand-600 font-bold px-2 py-0.5 rounded-full">{rec.priority} Priority</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-2 leading-relaxed">{rec.insight}</p>
              <div className="flex justify-between items-center mt-4 pt-3 border-t">
                <span className="text-[10px] text-emerald-500 font-black">Est Value: +₹{rec.estimatedValue.toLocaleString('en-IN')}</span>
                {rec.resolved ? <span className="text-[10px] text-slate-400 font-bold">Applied</span> : <button onClick={() => handleApplyRec(rec.id)} className="bg-brand-500 hover:bg-brand-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg">Apply Recommendation</button>}
              </div>
            </GlassCard>
          ))}
        </div>

        <GlassCard hover={false} className="p-5 h-80 flex flex-col justify-between">
          <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">6-Month AI predictions</h3>
          <div className="w-full h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={generateSalesForecast(MONTHLY_SALES_HISTORY, 6).map(f => ({ month: f.month, forecast: f.forecast || f.historical }))}>
                <XAxis dataKey="month" tick={{ fontSize: 9 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 9 }} stroke="#94a3b8" />
                <Tooltip formatter={(value) => `₹${Number(value).toLocaleString('en-IN')}`} />
                <Area type="monotone" dataKey="forecast" stroke="#6366f1" fill="#6366f115" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export const Reports: React.FC = () => {
  const [reportType, setReportType] = useState('executive');
  const [showBanner, setShowBanner] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setShowBanner(true);
      canvasConfetti({ particleCount: 50, spread: 40, origin: { y: 0.6 } });
    }, 800);
  };

  return (
    <div className="space-y-6 animate-fade-in p-1">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard hover={false} className="p-6">
          <h3 className="font-bold text-sm text-slate-855 mb-4">Export reports Center</h3>
          <form onSubmit={handleGenerate} className="space-y-4 text-xs font-semibold">
            <select value={reportType} onChange={(e) => setReportType(e.target.value)} className="w-full bg-slate-105 dark:bg-slate-950 p-2.5 rounded-xl border">
              <option value="executive">🏢 Executive Business Summary</option>
              <option value="sales">📈 Sales & Regional Growth</option>
              <option value="inventory">📦 Inventory Safety & Supply</option>
            </select>
            <button type="submit" className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-2.5 rounded-xl text-center">Compile and Export</button>
          </form>
        </GlassCard>

        <div className="lg:col-span-2 space-y-4">
          <GlassCard hover={false} className="p-5 min-h-[150px]">
            <h3 className="font-bold text-sm text-slate-855 border-b pb-2 mb-3">Live Compiled Report Preview</h3>
            <p className="text-[10px] text-slate-500 leading-relaxed font-semibold">Report contains detailed visual matrices, anomaly summaries, and prediction graphs.</p>
          </GlassCard>

          {showBanner && (
            <div className="bg-emerald-50 text-emerald-600 border p-4.5 rounded-2xl flex items-center gap-2">
              <CheckCircle2 size={16} />
              <span className="text-xs font-bold">Report successfully compiled and is ready for print.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const Settings: React.FC<{ darkMode: boolean; setDarkMode: (dark: boolean) => void }> = ({ darkMode, setDarkMode }) => {
  const [apiKey, setApiKey] = useState('diq_live_948f2a1b9c3e4f7a');
  return (
    <div className="space-y-6 animate-fade-in p-1">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
        <GlassCard hover={false} className="p-6">
          <h3 className="font-bold text-sm text-slate-855 border-b pb-2 mb-3">Organization settings</h3>
          <div className="space-y-3.5">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Organization Name</span>
              <input type="text" defaultValue="GlobalMart HQ" className="w-full bg-slate-105 p-2 rounded-lg border outline-none font-bold" />
            </div>
            <div className="flex items-center gap-3">
              <span className="font-bold text-slate-700">Dark Theme Mode</span>
              <button onClick={() => setDarkMode(!darkMode)} className="p-1 px-3 bg-brand-500 text-white rounded font-bold">Toggle Theme</button>
            </div>
          </div>
        </GlassCard>

        <GlassCard hover={false} className="p-6">
          <h3 className="font-bold text-sm text-slate-855 border-b pb-2 mb-3">API Credentials</h3>
          <div className="space-y-3">
            <div className="bg-slate-105 p-3 rounded-lg font-mono text-[10px]">{apiKey}</div>
            <button onClick={() => setApiKey('diq_live_' + Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10))} className="w-full bg-slate-100 hover:bg-slate-200 border py-2 rounded text-slate-655 font-bold">Regenerate Client Token</button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

// ==========================================
// 7. MAIN APP SHELL DEFINITION
// ==========================================

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [userRole, setUserRole] = useState<'Admin' | 'Manager' | 'Analyst'>('Admin');
  const [darkMode, setDarkMode] = useState(true);
  
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [initialChatQuery, setInitialChatQuery] = useState('');

  const [alerts, setAlerts] = useState<AnomalyAlert[]>(MOCK_ALERTS);
  const [uploadedDataset, setUploadedDataset] = useState<CleanedDataset | null>(null);

  useEffect(() => {
    const bodyClass = document.body.classList;
    if (darkMode) {
      bodyClass.add('dark');
    } else {
      bodyClass.remove('dark');
    }
  }, [darkMode]);

  const handleResolveAlert = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'resolved' } : a));
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
    setInitialChatQuery(query || '');
    setIsAIChatOpen(true);
  };

  const renderActivePage = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeDashboard 
            alerts={alerts}
            onResolveAlert={handleResolveAlert}
            setActiveTab={setActiveTab}
            onOpenAIChat={handleOpenAIChatWithQuery}
            uploadedDataset={uploadedDataset}
            onClearUploadedDataset={() => setUploadedDataset(null)}
          />
        );
      case 'sales': return <SalesAnalytics />;
      case 'customers': return <CustomerAnalytics />;
      case 'inventory': return <InventoryAnalytics />;
      case 'finance': return <FinanceDashboard />;
      case 'employees': return <EmployeeDashboard />;
      case 'insights': return <AIInsights alerts={alerts} onResolveAlert={handleResolveAlert} />;
      case 'reports': return <Reports />;
      case 'settings': return <Settings darkMode={darkMode} setDarkMode={setDarkMode} />;
      default: return <div className="text-center p-8 text-slate-400">Page not found.</div>;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 dark:bg-[#020617] font-sans transition-colors duration-300">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} userRole={userRole} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header 
          activeTab={activeTab}
          userRole={userRole}
          setUserRole={setUserRole}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onOpenUpload={() => setIsUploadOpen(true)}
          onOpenAIChat={handleOpenAIChatWithQuery}
          alerts={alerts}
          onResolveAlert={handleResolveAlert}
          setActiveTab={setActiveTab}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          {renderActivePage()}
        </main>
      </div>

      <AIChatDrawer 
        isOpen={isAIChatOpen} 
        onClose={() => setIsAIChatOpen(false)}
        initialQuery={initialChatQuery}
        onResolveAnomaly={handleResolveAnomalyByTitle}
      />

      <DataUploadModal 
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onApplyDataset={(data) => { setUploadedDataset(data); setActiveTab('home'); }}
      />
    </div>
  );
};

export default App;

// ==========================================
// INTERNALLY REFERENCED HELPER TYPES
// ==========================================
export interface ForecastPoint {
  month: string;
  historical?: number;
  forecast?: number;
  lowerConfidence?: number;
  upperConfidence?: number;
}
interface AIChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
  onResolveAnomaly?: (recTitle: string) => void;
}
interface DataUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyDataset: (dataset: CleanedDataset) => void;
}
