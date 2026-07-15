// Industry Templates configuration for LuminaryAI

export interface KPICard {
  id: string;
  title: string;
  value: string;
  numericValue: number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  sparkline: number[];
  category: string;
  suffix?: string;
  prefix?: string;
}

export interface ChartDataPoint {
  label: string;
  primaryVal: number;
  secondaryVal: number;
  tertiaryVal: number;
}

export interface Risk {
  id: string;
  title: string;
  level: 'High' | 'Medium' | 'Low';
  probability: number; // percentage
  expectedImpact: string;
  rootCause: string;
  suggestedSolution: string;
  category: string;
  status: 'active' | 'resolved';
  timestamp: string;
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
  difficulty: 'Easy' | 'Medium' | 'Hard';
  roi: number; // multiplier, e.g. 4.5 for 4.5x
  resolved: boolean;
}

export interface OperationalMetric {
  name: string;
  status: 'optimal' | 'warning' | 'critical';
  utilization: number; // percentage
  throughput: string;
  efficiency: number; // percentage
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  score: string;
  badge: string;
  growth: number;
}

export interface IndustryTemplate {
  name: string;
  id: string;
  themeColor: string; // brand Tailwind color prefix
  kpis: KPICard[];
  monthlyHistory: { month: string; revenue: number; profit: number; orders: number; expenses: number }[];
  categories: { name: string; revenue: number; percentage: number; sales: number; margin: number }[];
  regionalSales: { region: string; sales: number; orders: number; growth: number; color: string }[];
  risks: Risk[];
  recommendations: Recommendation[];
  operationalMetrics: OperationalMetric[];
  leaderboard: LeaderboardEntry[];
  chatbotTriggers: {
    [key: string]: {
      answer: string;
      chartData: any[];
      chartKeys: string[];
      chartColors: string[];
      chartType: 'line' | 'bar' | 'pie' | 'area';
    };
  };
}

export const INDUSTRY_TEMPLATES: { [key: string]: IndustryTemplate } = {
  retail: {
    name: 'Retail & E-Commerce',
    id: 'retail',
    themeColor: 'indigo',
    kpis: [
      { id: 'kpi-rev', title: 'Total Revenue', value: '₹12,48,390', numericValue: 1248390, change: 14.8, trend: 'up', sparkline: [80000, 85000, 92000, 88000, 95000, 102000, 99000, 108000, 115000, 110000, 122000, 124839], category: 'finance', prefix: '₹' },
      { id: 'kpi-prof', title: 'Net Profit Margin', value: '24.2%', numericValue: 24.2, change: 2.1, trend: 'up', sparkline: [21.5, 22.0, 22.8, 21.9, 23.1, 23.8, 23.4, 24.0, 24.5, 23.9, 24.1, 24.2], category: 'finance', suffix: '%' },
      { id: 'kpi-exp', title: 'Operational Expenses', value: '₹3,12,450', numericValue: 312450, change: -4.3, trend: 'down', sparkline: [34000, 33500, 32800, 33000, 32100, 31800, 32500, 31200, 31500, 30900, 31100, 31245], category: 'finance', prefix: '₹' },
      { id: 'kpi-growth', title: 'Sales Growth Rate', value: '18.4%', numericValue: 18.4, change: 3.5, trend: 'up', sparkline: [12.0, 13.5, 14.2, 13.8, 15.0, 16.5, 15.8, 17.2, 17.8, 17.0, 18.1, 18.4], category: 'sales', suffix: '%' },
      { id: 'kpi-cust', title: 'Active Customers', value: '8,432', numericValue: 8432, change: 8.7, trend: 'up', sparkline: [6200, 6400, 6650, 6800, 7100, 7350, 7500, 7720, 7950, 8100, 8280, 8432], category: 'customer' },
      { id: 'kpi-ret', title: 'Customer Retention', value: '78.5%', numericValue: 78.5, change: -1.8, trend: 'down', sparkline: [81.2, 80.8, 80.5, 80.1, 79.8, 79.5, 79.2, 78.9, 78.8, 78.6, 78.5, 78.5], category: 'customer', suffix: '%' },
      { id: 'kpi-prod', title: 'Staff Productivity', value: '86.7/100', numericValue: 86.7, change: 4.2, trend: 'up', sparkline: [82.1, 82.5, 83.2, 83.0, 84.1, 84.8, 84.5, 85.2, 85.8, 85.5, 86.2, 86.7], category: 'employee', suffix: '/100' },
      { id: 'kpi-inv', title: 'Inventory Status', value: '94.2%', numericValue: 94.2, change: 1.5, trend: 'up', sparkline: [90.5, 91.2, 92.0, 91.8, 92.5, 93.1, 92.8, 93.5, 93.9, 93.7, 94.0, 94.2], category: 'inventory', suffix: '%' },
      { id: 'kpi-completion', title: 'Order Fulfillment', value: '98.6%', numericValue: 98.6, change: 0.9, trend: 'up', sparkline: [97.5, 97.8, 98.0, 97.9, 98.2, 98.4, 98.1, 98.3, 98.5, 98.3, 98.4, 98.6], category: 'inventory', suffix: '%' },
      { id: 'kpi-csat', title: 'Customer CSAT', value: '4.72/5.0', numericValue: 4.72, change: 0.8, trend: 'up', sparkline: [4.65, 4.66, 4.68, 4.67, 4.69, 4.70, 4.68, 4.71, 4.72, 4.70, 4.71, 4.72], category: 'customer', suffix: '/5.0' }
    ],
    monthlyHistory: [
      { month: 'Jan', revenue: 94000, profit: 21600, orders: 1120, expenses: 72400 },
      { month: 'Feb', revenue: 96000, profit: 22100, orders: 1150, expenses: 73900 },
      { month: 'Mar', revenue: 108000, profit: 26000, orders: 1310, expenses: 82000 },
      { month: 'Apr', revenue: 112000, profit: 27100, orders: 1340, expenses: 84900 },
      { month: 'May', revenue: 118000, profit: 28400, orders: 1410, expenses: 89600 },
      { month: 'Jun', revenue: 124839, profit: 30211, orders: 1489, expenses: 94628 }
    ],
    categories: [
      { name: 'Electronics', revenue: 499356, percentage: 40, sales: 2450, margin: 18 },
      { name: 'Apparel & Fashion', revenue: 312097, percentage: 25, sales: 4120, margin: 35 },
      { name: 'Home & Kitchen', revenue: 187258, percentage: 15, sales: 1980, margin: 28 },
      { name: 'Beauty & Wellness', revenue: 149807, percentage: 12, sales: 3820, margin: 42 },
      { name: 'Sports & Outdoors', revenue: 99872, percentage: 8, sales: 1100, margin: 30 }
    ],
    regionalSales: [
      { region: 'North America', sales: 485000, orders: 5800, growth: 12.4, color: '#6366f1' },
      { region: 'Europe', sales: 324000, orders: 3900, growth: 8.2, color: '#3b82f6' },
      { region: 'Asia-Pacific', sales: 295000, orders: 3500, growth: 22.8, color: '#10b981' },
      { region: 'Latin America', sales: 144390, orders: 1692, growth: -3.5, color: '#ef4444' }
    ],
    risks: [
      { id: 'risk-stock', title: 'Potential Stock Shortage', level: 'High', probability: 85, expectedImpact: 'Stockout of Zenith Pro Smartwatch in 5 days due to sales velocity', rootCause: 'Supplier delivery delay matched with sudden spike in digital clicks', suggestedSolution: 'Reorder instantly with air delivery priority or initiate warehouse swap', category: 'inventory', status: 'active', timestamp: '2 hours ago' },
      { id: 'risk-churn', title: 'Elevated Customer Churn Rate', level: 'High', probability: 72, expectedImpact: 'Loss of ₹45,005 projected LTV over Q3', rootCause: 'Post-purchase onboarding abandonment and email unsubscribe rates', suggestedSolution: 'Trigger specialized ₹15 coupon retention campaign for at-risk loyalty tiers', category: 'customer', status: 'active', timestamp: '5 hours ago' },
      { id: 'risk-cost', title: 'Advertising Budget Inefficiency', level: 'Medium', probability: 58, expectedImpact: 'Drop of 12% in marketing ROAS', rootCause: 'Keyword CPC inflation on high-volume electronics category bids', suggestedSolution: 'Reallocate 8% of digital spending into high-margin Beauty and Wellness categories', category: 'finance', status: 'active', timestamp: '1 day ago' }
    ],
    recommendations: [
      { id: 'rec-1', title: 'Bundle Electronics with Beauty Offers', metric: 'Beauty: 42% margin, Electronics: 18% margin', insight: 'Cross-selling beauty bundles during smartwatch sales increases checkout margin by 12.5%.', action: 'Design checkout popup matching Smartwatch buyers with premium facial peptide serums.', priority: 'High', impact: 'High', confidence: 91, estimatedValue: 18000, difficulty: 'Easy', roi: 4.5, resolved: false },
      { id: 'rec-2', title: 'Adjust Apparel Minimum Reorder Points', metric: 'VaporWeave Running Jacket: 18 remaining', insight: 'Apparel suppliers have a lead time of 10 days. The current minimum threshold of 50 is too low.', action: 'Raise safety stock levels from 50 to 120 units for winter jackets.', priority: 'High', impact: 'Medium', confidence: 86, estimatedValue: 9200, difficulty: 'Easy', roi: 2.8, resolved: false },
      { id: 'rec-3', title: 'Optimize Checkout Form Flow', metric: 'Conversion drop on Step 3 of checkout', insight: 'Mobile users abandon carts at Step 3 (Payment forms) 14% more often than desktop users.', action: 'Introduce Google Pay and Apple Pay express checkout options.', priority: 'Medium', impact: 'High', confidence: 94, estimatedValue: 24500, difficulty: 'Medium', roi: 6.2, resolved: false }
    ],
    operationalMetrics: [
      { name: 'Central Distribution Hub', status: 'optimal', utilization: 78, throughput: '1,450 orders/hr', efficiency: 94 },
      { name: 'Eastern Regional Warehouse', status: 'optimal', utilization: 62, throughput: '920 orders/hr', efficiency: 91 },
      { name: 'Western Logistics Center', status: 'warning', utilization: 88, throughput: '810 orders/hr', efficiency: 82 }
    ],
    leaderboard: [
      { rank: 1, name: 'Zenith Pro Smartwatch v3', score: '₹4,65,470', badge: 'Best Seller', growth: 24.2 },
      { rank: 2, name: 'ActiveFit Noise-Canceling Buds', score: '₹4,09,580', badge: 'High Retention', growth: 18.7 },
      { rank: 3, name: 'Radiance Peptide Facial Serum', score: '₹1,22,400', badge: 'Highest Margin', growth: 42.0 },
      { rank: 4, name: 'ThermaGlow Smart Heaters', score: '₹96,000', badge: 'Steady Growth', growth: 8.5 }
    ],
    chatbotTriggers: {
      'why are sales dropping?': {
        answer: 'Sales in Latin America dropped by 3.5% due to inventory delivery delays. Zenith Pro Smartwatches were out of stock for 4 days in that region.',
        chartData: [
          { name: 'North America', value: 485000 },
          { name: 'Europe', value: 324000 },
          { name: 'Asia-Pacific', value: 295000 },
          { name: 'Latin America', value: 144390 }
        ],
        chartKeys: ['value'],
        chartColors: ['#6366f1'],
        chartType: 'bar'
      }
    }
  },
  restaurants: {
    name: 'Restaurants & Hospitality',
    id: 'restaurants',
    themeColor: 'amber',
    kpis: [
      { id: 'kpi-rev', title: 'Total Revenue', value: '₹4,58,200', numericValue: 458200, change: 11.2, trend: 'up', sparkline: [32000, 34000, 36500, 35000, 38000, 41000, 40000, 42000, 43500, 42000, 44800, 45820], category: 'finance', prefix: '₹' },
      { id: 'kpi-prof', title: 'Net Profit Margin', value: '18.6%', numericValue: 18.6, change: 1.4, trend: 'up', sparkline: [17.1, 17.5, 17.8, 17.2, 17.9, 18.2, 18.0, 18.3, 18.5, 18.1, 18.4, 18.6], category: 'finance', suffix: '%' },
      { id: 'kpi-exp', title: 'Food Waste Cost', value: '₹18,450', numericValue: 18450, change: -12.4, trend: 'down', sparkline: [21000, 20500, 19800, 20200, 19200, 18900, 19400, 18700, 19000, 18200, 18500, 18450], category: 'finance', prefix: '₹' },
      { id: 'kpi-growth', title: 'Table Turnover Rate', value: '4.85x/hr', numericValue: 4.85, change: 8.2, trend: 'up', sparkline: [4.4, 4.5, 4.6, 4.5, 4.7, 4.8, 4.7, 4.8, 4.9, 4.75, 4.8, 4.85], category: 'sales', suffix: 'x' },
      { id: 'kpi-cust', title: 'Total Covers (Guests)', value: '18,340', numericValue: 18340, change: 10.5, trend: 'up', sparkline: [15000, 15300, 16000, 15800, 16400, 17200, 16900, 17500, 17800, 17200, 17900, 18340], category: 'customer' },
      { id: 'kpi-ret', title: 'Repeat Diner Rate', value: '62.4%', numericValue: 62.4, change: 4.8, trend: 'up', sparkline: [58.2, 58.9, 59.5, 59.1, 60.2, 61.1, 60.8, 61.5, 62.0, 61.4, 62.1, 62.4], category: 'customer', suffix: '%' },
      { id: 'kpi-prod', title: 'Kitchen Load Factor', value: '76.3%', numericValue: 76.3, change: -2.1, trend: 'up', sparkline: [74.2, 74.8, 75.2, 74.9, 75.5, 75.8, 75.3, 76.0, 76.5, 75.9, 76.2, 76.3], category: 'employee', suffix: '%' },
      { id: 'kpi-inv', title: 'Ingredient Health', value: '97.2%', numericValue: 97.2, change: 1.1, trend: 'up', sparkline: [95.8, 96.0, 96.4, 96.2, 96.7, 96.9, 96.5, 97.0, 97.3, 96.8, 97.1, 97.2], category: 'inventory', suffix: '%' },
      { id: 'kpi-completion', title: 'Order Ticket Time', value: '18.4 min', numericValue: 18.4, change: -6.5, trend: 'down', sparkline: [21.2, 20.8, 20.1, 20.4, 19.8, 19.2, 19.5, 18.9, 19.1, 18.5, 18.6, 18.4], category: 'inventory', suffix: ' min' },
      { id: 'kpi-csat', title: 'Dining Experience Rate', value: '4.82/5.0', numericValue: 4.82, change: 1.2, trend: 'up', sparkline: [4.72, 4.74, 4.76, 4.75, 4.78, 4.79, 4.77, 4.81, 4.82, 4.80, 4.81, 4.82], category: 'customer', suffix: '/5.0' }
    ],
    monthlyHistory: [
      { month: 'Jan', revenue: 32000, profit: 5952, orders: 1200, expenses: 26048 },
      { month: 'Feb', revenue: 34000, profit: 6324, orders: 1250, expenses: 27676 },
      { month: 'Mar', revenue: 36500, profit: 6789, orders: 1320, expenses: 29711 },
      { month: 'Apr', revenue: 38000, profit: 7068, orders: 1390, expenses: 30932 },
      { month: 'May', revenue: 41000, profit: 7626, orders: 1480, expenses: 33374 },
      { month: 'Jun', revenue: 45820, profit: 8522, orders: 1610, expenses: 37298 }
    ],
    categories: [
      { name: 'Beverages & Wine', revenue: 137460, percentage: 30, sales: 4890, margin: 70 },
      { name: 'Main Courses', revenue: 183280, percentage: 40, sales: 5410, margin: 25 },
      { name: 'Appetizers', revenue: 68730, percentage: 15, sales: 3120, margin: 40 },
      { name: 'Desserts', revenue: 45820, percentage: 10, sales: 1980, margin: 55 },
      { name: 'Catering & Other', revenue: 22910, percentage: 5, sales: 480, margin: 30 }
    ],
    regionalSales: [
      { region: 'Downtown Bistro', sales: 215000, orders: 8100, growth: 14.5, color: '#f59e0b' },
      { region: 'Westside Lounge', sales: 142000, orders: 5400, growth: 9.8, color: '#3b82f6' },
      { region: 'Suburban Express', sales: 101200, orders: 4840, growth: 3.2, color: '#10b981' }
    ],
    risks: [
      { id: 'risk-spoil', title: 'High Fresh Produce Spoilage', level: 'High', probability: 78, expectedImpact: 'Food waste costs expected to leak an additional ₹3,200', rootCause: 'Over-ordering of avocado and leafy greens due to weekend rain forecasts', suggestedSolution: 'Dynamically scale down produce purchasing schedules using weather-linked inventory forecasting', category: 'inventory', status: 'active', timestamp: '1 hour ago' },
      { id: 'risk-bottleneck', title: 'Friday Kitchen Service Delay', level: 'Medium', probability: 64, expectedImpact: 'Ticket times exceeding 25 minutes, risking CSAT drops', rootCause: 'Understaffing of line cooks on dessert station during peak hours', suggestedSolution: 'Re-assign prep staff to expedite mains assembly line from 7 PM to 9 PM', category: 'employee', status: 'active', timestamp: '4 hours ago' }
    ],
    recommendations: [
      { id: 'rec-1', title: 'Launch Happy Hour Combo Specials', metric: 'Beverage margin is 70%', insight: 'Beverages account for 30% of sales but 70% of gross margin. Appetizers have 40% margin.', action: 'Package draft beers with select appetizers at 20% discount between 4 PM and 6 PM.', priority: 'High', impact: 'High', confidence: 92, estimatedValue: 6400, difficulty: 'Easy', roi: 3.8, resolved: false },
      { id: 'rec-2', title: 'Optimize Fresh Seafood Ordering Cycle', metric: 'Food waste at ₹18,450', insight: 'Seafood inventory expires in 3 days. Average delivery is 5 days.', action: 'Set up automatic reorder trigger when fresh salmon falls below 15 lbs.', priority: 'Medium', impact: 'Medium', confidence: 85, estimatedValue: 3100, difficulty: 'Medium', roi: 2.1, resolved: false }
    ],
    operationalMetrics: [
      { name: 'Kitchen Cook Stations', status: 'optimal', utilization: 72, throughput: '185 covers/hr', efficiency: 92 },
      { name: 'Dine-In Area Tables', status: 'optimal', utilization: 68, throughput: '85 tables/hr', efficiency: 89 },
      { name: 'Online Delivery Dispatch', status: 'warning', utilization: 92, throughput: '120 tickets/hr', efficiency: 74 }
    ],
    leaderboard: [
      { rank: 1, name: 'Pan-Seared Ribeye Steak', score: '₹98,400', badge: 'Top Revenue', growth: 12.8 },
      { rank: 2, name: 'Signature Craft IPAs', score: '₹64,200', badge: 'Highest Margin', growth: 38.5 },
      { rank: 3, name: 'Avocado Salad Bowls', score: '₹38,100', badge: 'Emerging Trend', growth: 22.4 }
    ],
    chatbotTriggers: {
      'why are sales dropping?': {
        answer: 'Sales at Suburban Express dropped due to temporary local road closures restricting dine-in customer access.',
        chartData: [
          { name: 'Downtown Bistro', value: 215000 },
          { name: 'Westside Lounge', value: 142000 },
          { name: 'Suburban Express', value: 101200 }
        ],
        chartKeys: ['value'],
        chartColors: ['#f59e0b'],
        chartType: 'bar'
      }
    }
  },
  healthcare: {
    name: 'Healthcare & Clinical Operations',
    id: 'healthcare',
    themeColor: 'emerald',
    kpis: [
      { id: 'kpi-rev', title: 'Monthly Billing', value: '₹28,54,000', numericValue: 2854000, change: 8.7, trend: 'up', sparkline: [210000, 220000, 230000, 225000, 240000, 255000, 248000, 260000, 270000, 265000, 280000, 285400], category: 'finance', prefix: '₹' },
      { id: 'kpi-prof', title: 'Operational Margin', value: '16.8%', numericValue: 16.8, change: -1.2, trend: 'down', sparkline: [17.5, 17.4, 17.2, 17.1, 16.9, 16.8, 16.7, 16.9, 17.0, 16.8, 16.9, 16.8], category: 'finance', suffix: '%' },
      { id: 'kpi-exp', title: 'Supply Expenses', value: '₹8,42,500', numericValue: 842500, change: 12.1, trend: 'up', sparkline: [75000, 76000, 78000, 77000, 80000, 82000, 81000, 83000, 84000, 83500, 84100, 84250], category: 'finance', prefix: '₹' },
      { id: 'kpi-growth', title: 'Patient Wait Time', value: '24.5 min', numericValue: 24.5, change: -14.8, trend: 'down', sparkline: [32.0, 30.5, 29.0, 28.5, 27.0, 26.2, 26.8, 25.4, 25.1, 24.8, 24.6, 24.5], category: 'sales', suffix: ' min' },
      { id: 'kpi-cust', title: 'Admitted Patients', value: '4,289', numericValue: 4289, change: 6.2, trend: 'up', sparkline: [3800, 3850, 3920, 3900, 4010, 4120, 4050, 4150, 4210, 4170, 4240, 4289], category: 'customer' },
      { id: 'kpi-ret', title: 'Follow-up Attendance', value: '82.4%', numericValue: 82.4, change: 3.1, trend: 'up', sparkline: [79.2, 79.5, 80.1, 79.8, 80.5, 81.2, 80.9, 81.5, 81.9, 81.3, 82.1, 82.4], category: 'customer', suffix: '%' },
      { id: 'kpi-prod', title: 'Nurse-to-Patient Ratio', value: '1:4.2', numericValue: 4.2, change: -4.5, trend: 'neutral', sparkline: [4.5, 4.4, 4.4, 4.3, 4.3, 4.2, 4.2, 4.2, 4.1, 4.2, 4.2, 4.2], category: 'employee', prefix: '1:' },
      { id: 'kpi-inv', title: 'Bed Occupancy Rate', value: '84.8%', numericValue: 84.8, change: 2.5, trend: 'up', sparkline: [81.5, 82.0, 83.2, 82.5, 83.8, 84.2, 83.9, 84.5, 84.9, 84.3, 84.6, 84.8], category: 'inventory', suffix: '%' },
      { id: 'kpi-completion', title: 'Discharge Cycle Time', value: '3.1 hrs', numericValue: 3.1, change: -12.4, trend: 'down', sparkline: [3.8, 3.7, 3.5, 3.6, 3.4, 3.2, 3.3, 3.15, 3.2, 3.12, 3.1, 3.1], category: 'inventory', suffix: ' hrs' },
      { id: 'kpi-csat', title: 'Patient CSAT Rating', value: '4.68/5.0', numericValue: 4.68, change: 1.5, trend: 'up', sparkline: [4.58, 4.60, 4.62, 4.61, 4.64, 4.65, 4.63, 4.67, 4.68, 4.66, 4.67, 4.68], category: 'customer', suffix: '/5.0' }
    ],
    monthlyHistory: [
      { month: 'Jan', revenue: 210000, profit: 35280, orders: 380, expenses: 174720 },
      { month: 'Feb', revenue: 220000, profit: 36960, orders: 395, expenses: 183040 },
      { month: 'Mar', revenue: 230000, profit: 38640, orders: 410, expenses: 191360 },
      { month: 'Apr', revenue: 240000, profit: 40320, orders: 425, expenses: 199680 },
      { month: 'May', revenue: 255000, profit: 42840, orders: 440, expenses: 212160 },
      { month: 'Jun', revenue: 285400, profit: 47947, orders: 489, expenses: 237453 }
    ],
    categories: [
      { name: 'Emergency Care', revenue: 1141600, percentage: 40, sales: 1200, margin: 12 },
      { name: 'Cardiology Services', revenue: 713500, percentage: 25, sales: 450, margin: 28 },
      { name: 'Diagnostics & Lab', revenue: 428100, percentage: 15, sales: 3410, margin: 45 },
      { name: 'Pharmacy Sales', revenue: 342480, percentage: 12, sales: 9800, margin: 38 },
      { name: 'Outpatient Consults', revenue: 228320, percentage: 8, sales: 2840, margin: 20 }
    ],
    regionalSales: [
      { region: 'East Wing Clinic', sales: 1285000, orders: 2100, growth: 14.8, color: '#10b981' },
      { region: 'West Wing ER', sales: 945000, orders: 1820, growth: 8.4, color: '#3b82f6' },
      { region: 'Suburban Rehab', sales: 624000, orders: 980, growth: -2.1, color: '#ef4444' }
    ],
    risks: [
      { id: 'risk-burnout', title: 'ER Nurse Burnout Alert', level: 'High', probability: 92, expectedImpact: 'Potential staffing deficit or coverage breach in ER department next week', rootCause: 'Accumulated shifts due to inpatient overflow during season change', suggestedSolution: 'Reallocate 3 staff nurses from outpatient unit to night shifts', category: 'employee', status: 'active', timestamp: '30 mins ago' },
      { id: 'risk-overcrowd', title: 'Emergency Room Overcrowding', level: 'High', probability: 78, expectedImpact: 'Patient wait times projected to spike above 45 minutes', rootCause: 'Delayed lab report release slowing diagnostic discharge approvals', suggestedSolution: 'Deploy automated pre-admission checklist to fast-track stable patients', category: 'inventory', status: 'active', timestamp: '3 hours ago' }
    ],
    recommendations: [
      { id: 'rec-1', title: 'Reallocate Nurse Scheduling Profiles', metric: 'Wait time 24.5 min, target 15 min', insight: 'Nurse load peaks between 2 PM and 7 PM. Shifting overlap schedules reduces wait time by 28%.', action: 'Update roster schedules to overlay shifts at peak afternoon admissions.', priority: 'High', impact: 'High', confidence: 94, estimatedValue: 18500, difficulty: 'Easy', roi: 4.8, resolved: false },
      { id: 'rec-2', title: 'Automate Radiology File Approvals', metric: 'Discharge cycle at 3.1 hrs', insight: 'Radiology signoff delays inpatient discharge. Patient beds remain blocked.', action: 'Enable AI notifications to queue radiologists directly upon image completion.', priority: 'High', impact: 'Medium', confidence: 88, estimatedValue: 14000, difficulty: 'Medium', roi: 3.5, resolved: false }
    ],
    operationalMetrics: [
      { name: 'Emergency Room Beds', status: 'critical', utilization: 94, throughput: '42 cases/hr', efficiency: 86 },
      { name: 'Diagnostics Laboratory', status: 'optimal', utilization: 75, throughput: '120 tests/hr', efficiency: 91 },
      { name: 'Outpatient Clinic Consultation', status: 'optimal', utilization: 64, throughput: '28 patients/hr', efficiency: 95 }
    ],
    leaderboard: [
      { rank: 1, name: 'Cardiology Diagnostics', score: '₹7,13,500', badge: 'Top Revenue', growth: 16.5 },
      { rank: 2, name: 'Clinical Pharmacy Dispenser', score: '₹3,42,480', badge: 'Highest Margin', growth: 22.8 },
      { rank: 3, name: 'General Lab Panels', score: '₹2,85,400', badge: 'High Volume', growth: 8.4 }
    ],
    chatbotTriggers: {
      'why are sales dropping?': {
        answer: 'Billing revenue at Suburban Rehab declined because outpatient schedules were reduced by 15% due to nurse staffing reallocations.',
        chartData: [
          { name: 'East Wing Clinic', value: 1285000 },
          { name: 'West Wing ER', value: 945000 },
          { name: 'Suburban Rehab', value: 624000 }
        ],
        chartKeys: ['value'],
        chartColors: ['#10b981'],
        chartType: 'bar'
      }
    }
  },
  manufacturing: {
    name: 'Smart Manufacturing & IoT',
    id: 'manufacturing',
    themeColor: 'amber',
    kpis: [
      { id: 'kpi-rev', title: 'Production Value', value: '₹38,42,000', numericValue: 3842000, change: 12.4, trend: 'up', sparkline: [300000, 310000, 325000, 318000, 335000, 350000, 342000, 360000, 375000, 368000, 380000, 384200], category: 'finance', prefix: '₹' },
      { id: 'kpi-prof', title: 'OEE Effectiveness', value: '82.5%', numericValue: 82.5, change: 4.8, trend: 'up', sparkline: [78.2, 78.8, 79.5, 79.1, 80.2, 81.1, 80.8, 81.5, 82.0, 81.4, 82.1, 82.5], category: 'finance', suffix: '%' },
      { id: 'kpi-exp', title: 'Scrap & Waste cost', value: '₹45,800', numericValue: 45800, change: -18.2, trend: 'down', sparkline: [56000, 54500, 52800, 53200, 51000, 49800, 50200, 48700, 49100, 46500, 46200, 45800], category: 'finance', prefix: '₹' },
      { id: 'kpi-growth', title: 'Machine Downtime', value: '14.2 hrs', numericValue: 14.2, change: -24.5, trend: 'down', sparkline: [18.8, 18.2, 17.5, 17.8, 16.9, 16.2, 16.5, 15.4, 15.8, 14.7, 14.5, 14.2], category: 'sales', suffix: ' hrs' },
      { id: 'kpi-cust', title: 'Units Manufactured', value: '1,48,920', numericValue: 148920, change: 11.8, trend: 'up', sparkline: [120000, 122000, 128000, 125000, 132000, 140000, 136000, 142000, 145000, 141000, 146000, 148920], category: 'customer' },
      { id: 'kpi-ret', title: 'First Pass Yield', value: '96.4%', numericValue: 96.4, change: 1.8, trend: 'up', sparkline: [94.5, 94.8, 95.2, 94.9, 95.5, 95.9, 95.3, 96.0, 96.2, 95.8, 96.1, 96.4], category: 'customer', suffix: '%' },
      { id: 'kpi-prod', title: 'Defect Density Rate', value: '0.45%', numericValue: 0.45, change: -12.4, trend: 'down', sparkline: [0.52, 0.51, 0.49, 0.50, 0.48, 0.47, 0.47, 0.46, 0.46, 0.45, 0.45, 0.45], category: 'employee', suffix: '%' },
      { id: 'kpi-inv', title: 'Raw Material Safety', value: '98.2%', numericValue: 98.2, change: 0.8, trend: 'up', sparkline: [97.5, 97.6, 97.8, 97.7, 98.0, 98.1, 97.9, 98.1, 98.2, 98.0, 98.1, 98.2], category: 'inventory', suffix: '%' },
      { id: 'kpi-completion', title: 'Supply Utilization', value: '92.4%', numericValue: 92.4, change: 2.1, trend: 'up', sparkline: [90.5, 91.0, 91.4, 91.2, 91.7, 92.0, 91.8, 92.2, 92.4, 92.0, 92.3, 92.4], category: 'inventory', suffix: '%' },
      { id: 'kpi-csat', title: 'Client Quality Audit', value: '4.85/5.0', numericValue: 4.85, change: 1.5, trend: 'up', sparkline: [4.78, 4.79, 4.81, 4.80, 4.82, 4.83, 4.81, 4.84, 4.85, 4.83, 4.84, 4.85], category: 'customer', suffix: '/5.0' }
    ],
    monthlyHistory: [
      { month: 'Jan', revenue: 300000, profit: 54000, orders: 12000, expenses: 246000 },
      { month: 'Feb', revenue: 310000, profit: 55800, orders: 12400, expenses: 254200 },
      { month: 'Mar', revenue: 325000, profit: 58500, orders: 13000, expenses: 266500 },
      { month: 'Apr', revenue: 335000, profit: 60300, orders: 13400, expenses: 274700 },
      { month: 'May', revenue: 350000, profit: 63000, orders: 14000, expenses: 287000 },
      { month: 'Jun', revenue: 384200, profit: 69156, orders: 15300, expenses: 315044 }
    ],
    categories: [
      { name: 'Metal Fabrication', revenue: 1536800, percentage: 40, sales: 42000, margin: 15 },
      { name: 'Electronics Assembly', revenue: 960500, percentage: 25, sales: 24000, margin: 22 },
      { name: 'Plastic Molding', revenue: 576300, percentage: 15, sales: 38000, margin: 18 },
      { name: 'Quality Inspection', revenue: 461040, percentage: 12, sales: 15300, margin: 30 },
      { name: 'Packaging & Dispatch', revenue: 307360, percentage: 8, sales: 29620, margin: 10 }
    ],
    regionalSales: [
      { region: 'Midwest Assembly Plant', sales: 1850000, orders: 7400, growth: 13.2, color: '#f59e0b' },
      { region: 'Southern Foundry', sales: 1240000, orders: 4900, growth: 7.8, color: '#3b82f6' },
      { region: 'Northern Logistics', sales: 752000, orders: 3000, growth: -1.5, color: '#ef4444' }
    ],
    risks: [
      { id: 'risk-downtime', title: 'Stamping Machine Alert', level: 'High', probability: 88, expectedImpact: 'Unscheduled downtime of 4 hours, costing ₹12,000 in queue delay', rootCause: 'Hydraulic pressure fluctuations exceeding normal 2.5x variance ranges', suggestedSolution: 'Initiate off-cycle preventive pump cleaning during tonight shifts shift change', category: 'inventory', status: 'active', timestamp: '15 mins ago' },
      { id: 'risk-delay', title: 'Sheet Metal Supplier Shortage', level: 'High', probability: 74, expectedImpact: 'Stockout of premium alloy sheet metal in 4 days', rootCause: 'Logistics bottleneck at border shipping terminals', suggestedSolution: 'Redirect sheet metal routing order parameters to secondary regional warehouse reserves', category: 'inventory', status: 'active', timestamp: '5 hours ago' }
    ],
    recommendations: [
      { id: 'rec-1', title: 'Run Preventive Pump Diagnostics', metric: 'Hydraulic vibration at 88%', insight: 'Stamping machine pump is vibrating beyond normal ranges. Wear leads to total failure.', action: 'Perform pump inspection and seal lubrications during overnight shutdown.', priority: 'High', impact: 'High', confidence: 95, estimatedValue: 12000, difficulty: 'Easy', roi: 5.4, resolved: false },
      { id: 'rec-2', title: 'Consolidate Injection Molding Runs', metric: 'Scrap rate at ₹45,800', insight: 'Plastic molding setups yield 14% waste at initial heating cycles.', action: 'Extend continuous extrusion run-lengths to reduce setup changeover waste.', priority: 'Medium', impact: 'Medium', confidence: 84, estimatedValue: 6200, difficulty: 'Medium', roi: 3.1, resolved: false }
    ],
    operationalMetrics: [
      { name: 'Stamping & Press Line', status: 'critical', utilization: 88, throughput: '120 units/hr', efficiency: 76 },
      { name: 'Electronics Assembly SMT', status: 'optimal', utilization: 78, throughput: '240 units/hr', efficiency: 92 },
      { name: 'Packing & Shrink Wrap', status: 'optimal', utilization: 65, throughput: '180 units/hr', efficiency: 94 }
    ],
    leaderboard: [
      { rank: 1, name: 'SMT Assembly Line 4', score: '98.5% OEE', badge: 'High Productivity', growth: 4.8 },
      { rank: 2, name: 'Stamping Press 1', score: '94.2% OEE', badge: 'Steady Output', growth: 1.2 },
      { rank: 3, name: 'Robotic Welder Alpha', score: '91.8% OEE', badge: 'Emerging Asset', growth: 8.5 }
    ],
    chatbotTriggers: {
      'why are sales dropping?': {
        answer: 'Production revenue at Northern Logistics decreased by 1.5% due to winter weather delaying container dispatch runs.',
        chartData: [
          { name: 'Midwest Assembly Plant', value: 1850000 },
          { name: 'Southern Foundry', value: 1240000 },
          { name: 'Northern Logistics', value: 752000 }
        ],
        chartKeys: ['value'],
        chartColors: ['#f59e0b'],
        chartType: 'bar'
      }
    }
  },
  education: {
    name: 'Education & Institutional Analytics',
    id: 'education',
    themeColor: 'rose',
    kpis: [
      { id: 'kpi-rev', title: 'Tuition Revenue', value: '₹8,48,500', numericValue: 848500, change: 6.4, trend: 'up', sparkline: [62000, 63000, 64500, 64000, 66000, 68000, 67500, 69000, 71000, 70000, 72000, 72850], category: 'finance', prefix: '₹' },
      { id: 'kpi-prof', title: 'Operating Margin', value: '12.4%', numericValue: 12.4, change: -2.1, trend: 'down', sparkline: [13.2, 13.0, 12.8, 12.9, 12.6, 12.4, 12.3, 12.5, 12.6, 12.3, 12.4, 12.4], category: 'finance', suffix: '%' },
      { id: 'kpi-exp', title: 'Athletics & Ops Cost', value: '₹1,24,500', numericValue: 124500, change: 8.2, trend: 'up', sparkline: [11000, 11200, 11500, 11300, 11800, 12000, 11900, 12100, 12300, 12200, 12400, 12450], category: 'finance', prefix: '₹' },
      { id: 'kpi-growth', title: 'Student Dropout Risk', value: '4.2%', numericValue: 4.2, change: -12.4, trend: 'down', sparkline: [4.8, 4.7, 4.6, 4.6, 4.5, 4.4, 4.4, 4.3, 4.3, 4.25, 4.2, 4.2], category: 'sales', suffix: '%' },
      { id: 'kpi-cust', title: 'Total Enrollment', value: '12,480', numericValue: 12480, change: 8.5, trend: 'up', sparkline: [10500, 10700, 11000, 10900, 11200, 11500, 11400, 11600, 11900, 11800, 12200, 12480], category: 'customer' },
      { id: 'kpi-ret', title: 'Course Completion Rate', value: '94.6%', numericValue: 94.6, change: 1.2, trend: 'up', sparkline: [93.2, 93.5, 93.8, 93.7, 94.0, 94.2, 94.1, 94.3, 94.5, 94.3, 94.4, 94.6], category: 'customer', suffix: '%' },
      { id: 'kpi-prod', title: 'Teacher Productivity', value: '88.5/100', numericValue: 88.5, change: 3.1, trend: 'up', sparkline: [85.2, 85.6, 86.1, 85.9, 86.6, 87.2, 86.8, 87.5, 87.8, 87.2, 88.1, 88.5], category: 'employee', suffix: '/100' },
      { id: 'kpi-inv', title: 'STEM Seat Capacity', value: '89.2%', numericValue: 89.2, change: 4.5, trend: 'up', sparkline: [85.4, 86.0, 86.8, 86.5, 87.2, 87.8, 87.5, 88.2, 88.6, 88.0, 88.5, 89.2], category: 'inventory', suffix: '%' },
      { id: 'kpi-completion', title: 'Library Asset Circ', value: '96.2%', numericValue: 96.2, change: 0.9, trend: 'up', sparkline: [95.1, 95.4, 95.6, 95.5, 95.8, 95.9, 95.7, 96.0, 96.1, 95.8, 96.0, 96.2], category: 'inventory', suffix: '%' },
      { id: 'kpi-csat', title: 'Student CSAT Survey', value: '4.62/5.0', numericValue: 4.62, change: 1.1, trend: 'up', sparkline: [4.52, 4.54, 4.56, 4.55, 4.58, 4.59, 4.57, 4.60, 4.62, 4.60, 4.61, 4.62], category: 'customer', suffix: '/5.0' }
    ],
    monthlyHistory: [
      { month: 'Jan', revenue: 62000, profit: 7688, orders: 120, expenses: 54312 },
      { month: 'Feb', revenue: 63000, profit: 7812, orders: 122, expenses: 55188 },
      { month: 'Mar', revenue: 64500, profit: 7998, orders: 125, expenses: 56502 },
      { month: 'Apr', revenue: 66000, profit: 8184, orders: 128, expenses: 57816 },
      { month: 'May', revenue: 68000, profit: 8432, orders: 132, expenses: 59568 },
      { month: 'Jun', revenue: 72850, profit: 9033, orders: 142, expenses: 63817 }
    ],
    categories: [
      { name: 'STEM Course Tracks', revenue: 339400, percentage: 40, sales: 4980, margin: 15 },
      { name: 'Humanities Divisions', revenue: 212125, percentage: 25, sales: 3120, margin: 8 },
      { name: 'Athletic Programs', revenue: 127275, percentage: 15, sales: 1870, margin: -10 },
      { name: 'Arts & Music Tracks', revenue: 101820, percentage: 12, sales: 1500, margin: 6 },
      { name: 'Online Certifications', revenue: 67880, percentage: 8, sales: 1010, margin: 45 }
    ],
    regionalSales: [
      { region: 'Main Campus', sales: 520000, orders: 7800, growth: 8.5, color: '#ec4899' },
      { region: 'Downtown Extension', sales: 228000, orders: 3200, growth: 4.2, color: '#3b82f6' },
      { region: 'Online Academy', sales: 100500, orders: 1480, growth: 18.6, color: '#10b981' }
    ],
    risks: [
      { id: 'risk-dropout', title: 'Online Student Dropout Warning', level: 'High', probability: 82, expectedImpact: 'Tuition revenue dilution of ₹14,000 next semester', rootCause: 'Lack of interactive peer study circles in self-paced programming tracks', suggestedSolution: 'Launch automated peer tutoring invitations for users lagging on week 3 exercises', category: 'customer', status: 'active', timestamp: '4 hours ago' },
      { id: 'risk-stem', title: 'STEM Lab Capacity Breach', level: 'Medium', probability: 68, expectedImpact: 'Class size limit violations in 4 major computer science lectures', rootCause: 'Enrollment spikes matching high seasonal interest in AI and coding', suggestedSolution: 'Promote hybrid online lab slots or activate part-time teaching assistants', category: 'inventory', status: 'active', timestamp: '1 day ago' }
    ],
    recommendations: [
      { id: 'rec-1', title: 'Bundle STEM Electives in Online certs', metric: 'Online certificate margin is 45%', insight: 'Self-paced modules have zero room costs. Promoting online tracks offsets lab space deficits.', action: 'Create a STEM Certificate bundle discount of 15% for humanities majors.', priority: 'High', impact: 'Medium', confidence: 89, estimatedValue: 8500, difficulty: 'Easy', roi: 3.5, resolved: false },
      { id: 'rec-2', title: 'Implement Early-Alert Advisor Roster', metric: 'Dropout risk at 4.2%', insight: 'Flagging students with GPA < 2.0 at week 4 recovers 60% of dropout tuition loss.', action: 'Deploy automatic email dispatch to academic advisors for at-risk rosters.', priority: 'High', impact: 'High', confidence: 91, estimatedValue: 11200, difficulty: 'Medium', roi: 4.2, resolved: false }
    ],
    operationalMetrics: [
      { name: 'Computer Laboratories', status: 'warning', utilization: 89, throughput: '180 seats/hr', efficiency: 84 },
      { name: 'Main Campus Libraries', status: 'optimal', utilization: 62, throughput: '340 checkouts/day', efficiency: 92 },
      { name: 'Athletic Sports Complex', status: 'optimal', utilization: 45, throughput: '80 bookings/day', efficiency: 88 }
    ],
    leaderboard: [
      { rank: 1, name: 'Intro to Artificial Intelligence', score: '1,420 enrolled', badge: 'Fastest Growing', growth: 38.2 },
      { rank: 2, name: 'Creative Writing Workshop', score: '820 enrolled', badge: 'Steady Interest', growth: 2.1 },
      { rank: 3, name: 'Organic Chemistry Lab', score: '620 enrolled', badge: 'High Dropout Risk', growth: -8.4 }
    ],
    chatbotTriggers: {
      'why are sales dropping?': {
        answer: 'Athletic revenues dropped by 1.5% due to reduced stadium ticket purchases during regional rainouts.',
        chartData: [
          { name: 'Main Campus', value: 520000 },
          { name: 'Downtown Extension', value: 228000 },
          { name: 'Online Academy', value: 100500 }
        ],
        chartKeys: ['value'],
        chartColors: ['#ec4899'],
        chartType: 'bar'
      }
    }
  },
  marketing: {
    name: 'Digital Marketing Agency',
    id: 'marketing',
    themeColor: 'violet',
    kpis: [
      { id: 'kpi-rev', title: 'Client Ad Spend Managed', value: '₹8,45,900', numericValue: 845900, change: 16.5, trend: 'up', sparkline: [60000, 62000, 65000, 63000, 68000, 72000, 70000, 74000, 78000, 76000, 82000, 84590], category: 'finance', prefix: '₹' },
      { id: 'kpi-prof', title: 'Average ROAS Margin', value: '4.2x', numericValue: 4.2, change: 8.4, trend: 'up', sparkline: [3.8, 3.9, 4.0, 3.9, 4.1, 4.2, 4.1, 4.2, 4.3, 4.2, 4.2, 4.2], category: 'finance', suffix: 'x' },
      { id: 'kpi-exp', title: 'Customer Acquisition Cost', value: '₹45.20', numericValue: 45.2, change: -8.5, trend: 'down', sparkline: [52.0, 50.5, 49.0, 49.5, 48.0, 46.5, 47.0, 45.8, 46.1, 45.3, 45.4, 45.2], category: 'finance', prefix: '₹' },
      { id: 'kpi-growth', title: 'Average Ad CTR', value: '3.18%', numericValue: 3.18, change: 12.2, trend: 'up', sparkline: [2.8, 2.9, 3.0, 2.95, 3.05, 3.12, 3.08, 3.14, 3.16, 3.1, 3.15, 3.18], category: 'sales', suffix: '%' },
      { id: 'kpi-cust', title: 'Lead Registrations', value: '28,490', numericValue: 28490, change: 14.8, trend: 'up', sparkline: [22000, 22500, 23800, 23000, 24500, 26000, 25200, 26500, 27200, 26800, 27900, 28490], category: 'customer' },
      { id: 'kpi-ret', title: 'Email Newsletter Opt-In', value: '72.4%', numericValue: 72.4, change: -2.1, trend: 'down', sparkline: [74.5, 74.2, 73.8, 74.0, 73.5, 73.0, 73.2, 72.8, 72.9, 72.5, 72.6, 72.4], category: 'customer', suffix: '%' },
      { id: 'kpi-prod', title: 'Creative Designer Util', value: '92.1%', numericValue: 92.1, change: 4.8, trend: 'up', sparkline: [88.5, 89.0, 89.5, 89.2, 90.1, 91.0, 90.5, 91.2, 91.8, 91.4, 91.8, 92.1], category: 'employee', suffix: '%' },
      { id: 'kpi-inv', title: 'Active Ad Campaigns', value: '142', numericValue: 142, change: 10.2, trend: 'up', sparkline: [120, 122, 128, 125, 130, 135, 132, 138, 140, 136, 139, 142], category: 'inventory' },
      { id: 'kpi-completion', title: 'Client Retention Rate', value: '88.6%', numericValue: 88.6, change: 1.5, trend: 'up', sparkline: [87.2, 87.5, 87.8, 87.6, 88.0, 88.2, 88.0, 88.3, 88.5, 88.2, 88.4, 88.6], category: 'inventory', suffix: '%' },
      { id: 'kpi-csat', title: 'Agency CSAT Score', value: '4.86/5.0', numericValue: 4.86, change: 0.9, trend: 'up', sparkline: [4.78, 4.79, 4.81, 4.80, 4.82, 4.83, 4.81, 4.84, 4.86, 4.83, 4.85, 4.86], category: 'customer', suffix: '/5.0' }
    ],
    monthlyHistory: [
      { month: 'Jan', revenue: 60000, profit: 12600, orders: 1200, expenses: 47400 },
      { month: 'Feb', revenue: 62000, profit: 13020, orders: 1250, expenses: 48980 },
      { month: 'Mar', revenue: 65000, profit: 13650, orders: 1310, expenses: 51350 },
      { month: 'Apr', revenue: 68000, profit: 14280, orders: 1380, expenses: 53720 },
      { month: 'May', revenue: 72000, profit: 15120, orders: 1450, expenses: 56880 },
      { month: 'Jun', revenue: 84590, profit: 17763, orders: 1690, expenses: 66827 }
    ],
    categories: [
      { name: 'Search Ads (SEM)', revenue: 338360, percentage: 40, sales: 12400, margin: 18 },
      { name: 'Paid Social Media', revenue: 211475, percentage: 25, sales: 8400, margin: 14 },
      { name: 'Influencer Placement', revenue: 126885, percentage: 15, sales: 180, margin: 35 },
      { name: 'Email Operations', revenue: 101508, percentage: 12, sales: 94000, margin: 85 },
      { name: 'Organic SEO Projects', revenue: 67672, percentage: 8, sales: 420, margin: 40 }
    ],
    regionalSales: [
      { region: 'Google Ads Manager', sales: 415000, orders: 8400, growth: 16.8, color: '#8b5cf6' },
      { region: 'Meta/Instagram Ads', sales: 295000, orders: 5800, growth: 12.2, color: '#3b82f6' },
      { region: 'TikTok Creative Suite', sales: 135900, orders: 3200, growth: 22.4, color: '#10b981' }
    ],
    risks: [
      { id: 'risk-cpc', title: 'Paid Social ROAS Deceleration', level: 'High', probability: 84, expectedImpact: 'Agency client spend reduction of ₹35,005 next month', rootCause: 'Competitor bidding spikes in summer vacation categories', suggestedSolution: 'Pause underperforming static ad sets and pivot budget parameters into TikTok user videos', category: 'finance', status: 'active', timestamp: '1 hour ago' },
      { id: 'risk-opt', title: 'Email Unsubscribe Spike', level: 'Medium', probability: 62, expectedImpact: 'Opt-in list shrinkage of 4.5% YTD', rootCause: 'Sending 3 email promotions per week instead of recommended 1.5 weekly frequency', suggestedSolution: 'Implement list segmentation and automated drip capping settings', category: 'customer', status: 'active', timestamp: '6 hours ago' }
    ],
    recommendations: [
      { id: 'rec-1', title: 'Pivot Spends to Influencer Placements', metric: 'Influencer margin is 35%', insight: 'Influencer click conversion rates exceed paid social by 2.2x. ROI holds at 5.5x.', action: 'Transfer 8% of low-performing search ads budget into lifestyle placements.', priority: 'High', impact: 'High', confidence: 93, estimatedValue: 14000, difficulty: 'Medium', roi: 5.5, resolved: false },
      { id: 'rec-2', title: 'Configure Ad Copy A/B Auto-Pause', metric: 'Ad CTR at 3.18%', insight: 'Ad auto-pausing creatives with CTR < 1.5% at day 3 preserves 12% of digital ad spend leak.', action: 'Activate automation rules in Google Ads campaign settings.', priority: 'High', impact: 'Medium', confidence: 89, estimatedValue: 8500, difficulty: 'Easy', roi: 3.2, resolved: false }
    ],
    operationalMetrics: [
      { name: 'Ad Creative Studio', status: 'warning', utilization: 92, throughput: '45 assets/day', efficiency: 88 },
      { name: 'SEO & Copywriting Unit', status: 'optimal', utilization: 78, throughput: '12 blogs/day', efficiency: 94 },
      { name: 'Account Analytics Dev', status: 'optimal', utilization: 64, throughput: '8 reports/day', efficiency: 91 }
    ],
    leaderboard: [
      { rank: 1, name: 'TikTok Fashion Video Creative', score: '6.4% CTR', badge: 'Top Performer', growth: 42.4 },
      { rank: 2, name: 'Google Search Brand Terms', score: '4.8% CTR', badge: 'High Conversion', growth: 12.8 },
      { rank: 3, name: 'Newsletter Weekly Digest', score: '22% Open', badge: 'Emerging Asset', growth: 4.5 }
    ],
    chatbotTriggers: {
      'why are sales dropping?': {
        answer: 'Lead conversions on Instagram dropped because keyword bids inflated by 18%, reducing our daily budget coverage.',
        chartData: [
          { name: 'Google Ads Manager', value: 415000 },
          { name: 'Meta/Instagram Ads', value: 295000 },
          { name: 'TikTok Creative Suite', value: 135900 }
        ],
        chartKeys: ['value'],
        chartColors: ['#8b5cf6'],
        chartType: 'bar'
      }
    }
  },
  finance: {
    name: 'Banking & Financial Services',
    id: 'finance',
    themeColor: 'slate',
    kpis: [
      { id: 'kpi-rev', title: 'Assets Under Mgmt', value: '₹84.2M', numericValue: 84200000, change: 11.8, trend: 'up', sparkline: [700000, 720000, 750000, 730000, 770000, 800000, 790000, 820000, 840000, 825000, 838000, 842000], category: 'finance', prefix: '₹', suffix: 'M' },
      { id: 'kpi-prof', title: 'Net Interest Margin', value: '3.42%', numericValue: 3.42, change: 2.5, trend: 'up', sparkline: [3.2, 3.25, 3.3, 3.28, 3.32, 3.38, 3.35, 3.39, 3.42, 3.38, 3.4, 3.42], category: 'finance', suffix: '%' },
      { id: 'kpi-exp', title: 'Cost-to-Income Ratio', value: '44.8%', numericValue: 44.8, change: -4.2, trend: 'down', sparkline: [47.5, 47.1, 46.8, 47.0, 46.2, 45.8, 46.1, 45.2, 45.4, 44.9, 44.8, 44.8], category: 'finance', suffix: '%' },
      { id: 'kpi-growth', title: 'Loan Default Rate', value: '1.24%', numericValue: 1.24, change: -12.4, trend: 'down', sparkline: [1.45, 1.42, 1.38, 1.40, 1.35, 1.30, 1.32, 1.28, 1.29, 1.25, 1.24, 1.24], category: 'sales', suffix: '%' },
      { id: 'kpi-cust', title: 'Active Accounts', value: '24,850', numericValue: 24850, change: 9.4, trend: 'up', sparkline: [21000, 21500, 22200, 21800, 22500, 23200, 22900, 23500, 24000, 23700, 24300, 24850], category: 'customer' },
      { id: 'kpi-ret', title: 'Portfolio Retention', value: '92.4%', numericValue: 92.4, change: 0.8, trend: 'up', sparkline: [91.5, 91.8, 92.0, 91.9, 92.2, 92.4, 92.1, 92.3, 92.4, 92.1, 92.3, 92.4], category: 'customer', suffix: '%' },
      { id: 'kpi-prod', title: 'Advisor Capacity Util', value: '84.3%', numericValue: 84.3, change: 3.5, trend: 'up', sparkline: [81.2, 81.5, 82.2, 81.9, 82.5, 83.1, 82.8, 83.5, 83.9, 83.4, 83.9, 84.3], category: 'employee', suffix: '%' },
      { id: 'kpi-inv', title: 'Liquidity Coverage', value: '142.5%', numericValue: 142.5, change: 1.5, trend: 'up', sparkline: [139.5, 140.0, 141.2, 140.8, 141.5, 142.0, 141.8, 142.2, 142.5, 142.0, 142.3, 142.5], category: 'inventory', suffix: '%' },
      { id: 'kpi-completion', title: 'Loan Approval Time', value: '1.2 days', numericValue: 1.2, change: -32.4, trend: 'down', sparkline: [2.1, 2.0, 1.8, 1.9, 1.7, 1.5, 1.6, 1.4, 1.3, 1.25, 1.22, 1.2], category: 'inventory', suffix: ' days' },
      { id: 'kpi-csat', title: 'Customer Trust Index', value: '4.84/5.0', numericValue: 4.84, change: 1.2, trend: 'up', sparkline: [4.75, 4.76, 4.78, 4.77, 4.79, 4.81, 4.79, 4.82, 4.84, 4.81, 4.83, 4.84], category: 'customer', suffix: '/5.0' }
    ],
    monthlyHistory: [
      { month: 'Jan', revenue: 700000, profit: 386400, orders: 1200, expenses: 313600 },
      { month: 'Feb', revenue: 720000, profit: 397440, orders: 1240, expenses: 322560 },
      { month: 'Mar', revenue: 750000, profit: 414000, orders: 1300, expenses: 336000 },
      { month: 'Apr', revenue: 770000, profit: 425040, orders: 1330, expenses: 344960 },
      { month: 'May', revenue: 800000, profit: 441600, orders: 1380, expenses: 358400 },
      { month: 'Jun', revenue: 842000, profit: 464784, orders: 1450, expenses: 377216 }
    ],
    categories: [
      { name: 'Mortgages & Home Loans', revenue: 33680000, percentage: 40, sales: 480, margin: 48 },
      { name: 'Wealth Management', revenue: 21050000, percentage: 25, sales: 1240, margin: 62 },
      { name: 'Personal Loans', revenue: 12630000, percentage: 15, sales: 3840, margin: 55 },
      { name: 'checking/savings', revenue: 10104000, percentage: 12, sales: 18500, margin: 12 },
      { name: 'Credit Cards', revenue: 6736000, percentage: 8, sales: 4280, margin: 68 }
    ],
    regionalSales: [
      { region: 'East Coast Wealth', sales: 3450000, orders: 1200, growth: 12.8, color: '#475569' },
      { region: 'West Coast retail', sales: 2950000, orders: 4800, growth: 8.5, color: '#3b82f6' },
      { region: 'Midwest Agriculture', sales: 2020000, orders: 900, growth: -2.1, color: '#ef4444' }
    ],
    risks: [
      { id: 'risk-defaults', title: 'Personal Loan Default Alert', level: 'High', probability: 78, expectedImpact: 'Profit markdown of ₹62,000 in loan division assets', rootCause: 'Rising interest rates squeezing retail debt service capacity', suggestedSolution: 'Tighten score parameters on personal loan auto-approvals above ₹10k', category: 'finance', status: 'active', timestamp: '2 hours ago' },
      { id: 'risk-AUM', title: 'AUM Withdrawal Trigger', level: 'Medium', probability: 58, expectedImpact: 'Asset management commission leakage of ₹14,000 monthly', rootCause: 'Short-term bond yield volatility causing minor retail wealth panic', suggestedSolution: 'Send custom portfolio update video letters to accounts with balances over ₹250k', category: 'customer', status: 'active', timestamp: '1 day ago' }
    ],
    recommendations: [
      { id: 'rec-1', title: 'Promote High-Yield Wealth Advisory', metric: 'Wealth Management margin is 62%', insight: 'Advisory accounts have high CSAT (4.84) and contribute 62% margin. CSAT drives retention.', action: 'Target mortgage accounts with balances >₹200k for free advisor reviews.', priority: 'High', impact: 'High', confidence: 91, estimatedValue: 34000, difficulty: 'Medium', roi: 4.8, resolved: false },
      { id: 'rec-2', title: 'Automate Checking Account Overdraft Alerts', metric: 'Approval cycle is 1.2 days', insight: 'Real-time push notifications reduce customer overdraft drops by 45%, building loyalty trust.', action: 'Deploy real-time webhook flags on mobile banking check deposits.', priority: 'Medium', impact: 'Medium', confidence: 87, estimatedValue: 12000, difficulty: 'Easy', roi: 2.5, resolved: false }
    ],
    operationalMetrics: [
      { name: 'Loan Underwriting Unit', status: 'optimal', utilization: 84, throughput: '12 approved/day', efficiency: 95 },
      { name: 'Mobile App Servers', status: 'optimal', utilization: 45, throughput: '4,500 active/min', efficiency: 99 },
      { name: 'Branch Consultation desks', status: 'warning', utilization: 78, throughput: '18 accounts/day', efficiency: 82 }
    ],
    leaderboard: [
      { rank: 1, name: 'Wealth Management Portfolio Alpha', score: '₹21.0M AUM', badge: 'Top Contributor', growth: 12.8 },
      { rank: 2, name: 'Premium Credit Cards', score: '₹6.7M spend', badge: 'Highest Margin', growth: 22.4 },
      { rank: 3, name: 'Personal Micro-loans', score: '₹12.6M issued', badge: 'High Default Risk', growth: -4.5 }
    ],
    chatbotTriggers: {
      'why are sales dropping?': {
        answer: 'Mortgage values in the Midwest region decreased by 2.1% due to rising housing interest rate profiles.',
        chartData: [
          { name: 'East Coast Wealth', value: 3450000 },
          { name: 'West Coast retail', value: 2950000 },
          { name: 'Midwest Agriculture', value: 2020000 }
        ],
        chartKeys: ['value'],
        chartColors: ['#475569'],
        chartType: 'bar'
      }
    }
  }
};
