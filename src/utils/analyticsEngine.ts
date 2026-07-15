import { MONTHLY_SALES_HISTORY, SalesDataPoint, MOCK_INVENTORY, InventoryItem, MOCK_CUSTOMERS, CustomerDataPoint } from './mockData';

export interface ForecastPoint {
  month: string;
  historical?: number;
  forecast?: number;
  lowerConfidence?: number;
  upperConfidence?: number;
}

export interface Recommendation {
  id: string;
  title: string;
  metric: string;
  insight: string;
  action: string;
  priority: 'High' | 'Medium' | 'Low';
  impact: 'High' | 'Medium' | 'Low';
  confidence: number; // percentage 0-100
  estimatedValue: number; // in dollars
  resolved: boolean;
}

/**
 * Simulates a Prophet / ARIMA / LSTM forecasting model.
 * Takes the historical monthly sales data and forecasts the next 6 months.
 */
export function generateSalesForecast(history: SalesDataPoint[], forecastMonthsCount = 6): ForecastPoint[] {
  const result: ForecastPoint[] = [];

  // Add historical points
  history.forEach(item => {
    result.push({
      month: item.month,
      historical: item.revenue,
      forecast: undefined,
      lowerConfidence: undefined,
      upperConfidence: undefined
    });
  });

  // Calculate moving trends from historical data
  const len = history.length;
  if (len === 0) return result;

  // Let's compute average growth rate
  let totalGrowth = 0;
  for (let i = 1; i < len; i++) {
    totalGrowth += (history[i].revenue - history[i - 1].revenue) / history[i - 1].revenue;
  }
  const avgGrowth = totalGrowth / (len - 1);

  // Generate projections
  const lastPoint = history[len - 1];
  let lastRevenue = lastPoint.revenue;

  // Monthly names helper
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Extract month/year from last historical entry, e.g. "Jun 2026"
  const parts = lastPoint.month.split(' ');
  const lastMonthName = parts[0];
  const lastYear = parseInt(parts[1], 10);
  
  let currentMonthIndex = months.indexOf(lastMonthName);
  let currentYear = lastYear;

  // Connect forecast with the last historical point
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
    
    // Add seasonal variations (e.g. November/December bump, January dip)
    let seasonalFactor = 1.0;
    if (currentMonthIndex === 10) seasonalFactor = 1.08; // Nov +8%
    if (currentMonthIndex === 11) seasonalFactor = 1.25; // Dec +25%
    if (currentMonthIndex === 0) seasonalFactor = 0.85;  // Jan -15%
    
    // Simulated ARIMA/Prophet calculation
    const baseProjected = lastRevenue * (1 + avgGrowth + (Math.random() * 0.02 - 0.01));
    const finalForecast = Math.round(baseProjected * seasonalFactor);

    // Calculate increasing confidence interval bounds (more uncertainty in the future)
    const uncertaintyMultiplier = i * 0.04;
    const lowerConfidence = Math.round(finalForecast * (1 - uncertaintyMultiplier));
    const upperConfidence = Math.round(finalForecast * (1 + uncertaintyMultiplier));

    result.push({
      month: projectedMonthName,
      forecast: finalForecast,
      lowerConfidence,
      upperConfidence
    });

    // Advance tracker
    lastRevenue = baseProjected; // use baseline growth for next projection
  }

  return result;
}

/**
 * Calculates simulated customer segmentation analysis (VIP, Loyal, New, At Risk, Lost)
 */
export function analyzeCustomerSegments(customers: CustomerDataPoint[]) {
  const segments = {
    VIP: 0,
    Loyal: 0,
    New: 0,
    'At Risk': 0,
    Lost: 0
  };

  customers.forEach(c => {
    segments[c.segment]++;
  });

  return [
    { name: 'VIP Customer', value: segments.VIP, color: '#818cf8' },
    { name: 'Loyal Customer', value: segments.Loyal, color: '#34d399' },
    { name: 'New Customer', value: segments.New, color: '#60a5fa' },
    { name: 'At Risk', value: segments['At Risk'], color: '#fbbf24' },
    { name: 'Lost', value: segments.Lost, color: '#f87171' }
  ];
}

/**
 * Detects anomalies in a dataset based on simple standard deviation thresholds
 */
export function detectDataAnomalies(values: number[], labels: string[]): { label: string; value: number; type: 'spike' | 'drop' }[] {
  if (values.length < 3) return [];

  // Calculate Mean
  const sum = values.reduce((a, b) => a + b, 0);
  const mean = sum / values.length;

  // Calculate Variance & StdDev
  const variance = values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length;
  const stdDev = Math.sqrt(variance);

  const anomalies: { label: string; value: number; type: 'spike' | 'drop' }[] = [];

  values.forEach((val, idx) => {
    const deviation = (val - mean) / stdDev;
    if (deviation > 1.8) {
      anomalies.push({ label: labels[idx], value: val, type: 'spike' });
    } else if (deviation < -1.8) {
      anomalies.push({ label: labels[idx], value: val, type: 'drop' });
    }
  });

  return anomalies;
}

/**
 * AI recommendation generator based on current mock database thresholds.
 */
export function getAIRecommendations(items: InventoryItem[], customers: CustomerDataPoint[]): Recommendation[] {
  const recommendations: Recommendation[] = [];

  // 1. Check stockout indicators
  const lowStockItems = items.filter(item => item.stockLevel <= item.minThreshold);
  if (lowStockItems.length > 0) {
    const item = lowStockItems[0];
    const reorderAmount = Math.ceil(item.demandForecast * 1.5);
    recommendations.push({
      id: 'rec-stockout',
      title: `Restock Required: ${item.name}`,
      metric: `Inventory: ${item.stockLevel} units remaining`,
      insight: `Current stock level is below safety threshold (${item.minThreshold}). Forecast indicates stockout in less than 5 days.`,
      action: `Order ${reorderAmount} units from supplier '${item.supplierName}' (Lead time: ${item.leadTimeDays} days, Reliability: ${(item.supplierRating * 20).toFixed(0)}%).`,
      priority: 'High',
      impact: 'High',
      confidence: 94,
      estimatedValue: Math.round(reorderAmount * (item.price - item.cost)),
      resolved: false
    });
  }

  // 2. Customer retention alert
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
      estimatedValue: Math.round(atRiskCustomersCount * 450 * 0.4), // recover 40% LTV
      resolved: false
    });
  }

  // 3. Margin optimization
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

  // 4. Overstock warning
  const overstockItems = items.filter(item => item.stockLevel > item.demandForecast * 3);
  if (overstockItems.length > 0) {
    const item = overstockItems[0];
    recommendations.push({
      id: 'rec-overstock',
      title: `Inventory Optimization: ${item.name}`,
      metric: `Holding Cost Leak: ${item.stockLevel} units vs 30d demand forecast of ${item.demandForecast}`,
      insight: `Capital is tied up in slow-moving inventory. Excess units represent holding costs of ~₹1.20 per unit/month.`,
      action: `Implement a 15% promotional discount or bundle offer to accelerate stock liquidations.`,
      priority: 'Low',
      impact: 'Medium',
      confidence: 82,
      estimatedValue: Math.round(item.stockLevel * item.price * 0.15),
      resolved: false
    });
  }

  return recommendations;
}
