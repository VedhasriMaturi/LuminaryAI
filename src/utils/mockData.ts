// Mock datasets for GlobalMart - LuminaryAI platform

export interface KPICardData {
  id: string;
  title: string;
  value: string;
  numericValue: number;
  change: number; // percentage change
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
  purchaseFrequency: number; // purchases per month
  churnProbability: number; // percentage 0-100
  engagementScore: number; // 0-100
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
  demandForecast: number; // predicted demand for next 30 days
  warehouse: string;
  supplierName: string;
  supplierRating: number; // 0-5
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
  productivity: number; // 0-100
  efficiency: number; // 0-100
  revenueContribution: number;
  goalAchievement: number; // percentage
  attendanceRate: number; // percentage
  satisfactionScore: number; // 1-5
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

export const INITIAL_KPI_CARDS: KPICardData[] = [
  {
    id: 'kpi-revenue',
    title: 'Total Revenue',
    value: '₹12,48,390',
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
    value: '₹3,12,450',
    numericValue: 312450,
    change: -4.3,
    trend: 'down', // down is good for expenses
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
    minThreshold: 150, // triggers warning
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
    minThreshold: 50, // triggers critical warning
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
    minThreshold: 80, // triggers warning
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
    revenueContribution: 0, // Logistics
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
