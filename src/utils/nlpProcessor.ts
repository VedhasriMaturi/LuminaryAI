import { INDUSTRY_TEMPLATES } from './industryTemplates';

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

/**
 * Natural Language Processor
 * Simple rules-based NLP parser simulating an AI engine for business intelligence queries.
 */
export function processNLPQuery(queryText: string, activeIndustry: string = 'retail'): NLPResponse {
  const query = queryText.toLowerCase().trim();
  const template = INDUSTRY_TEMPLATES[activeIndustry] || INDUSTRY_TEMPLATES.retail;

  // 1. Direct match triggers from templates
  if (template.chatbotTriggers[query]) {
    const t = template.chatbotTriggers[query];
    return {
      query: queryText,
      answerText: t.answer,
      visualType: 'chart',
      chartType: t.chartType,
      chartData: t.chartData,
      chartKeys: t.chartKeys,
      chartColors: t.chartColors
    };
  }

  // 2. Predictions & Forecasting
  if (
    query.includes('predict') || 
    query.includes('forecast') || 
    query.includes('future') || 
    query.includes('next month')
  ) {
    const totalVal = template.kpis[0].numericValue;
    const projected = Math.round(totalVal * 1.12);
    
    // Simple projected chart
    const chartData = template.monthlyHistory.map(pt => ({
      name: pt.month,
      forecast: pt.revenue
    }));
    chartData.push({ name: 'Jul Proj', forecast: Math.round(chartData[chartData.length - 1].forecast * 1.05) });
    chartData.push({ name: 'Aug Proj', forecast: Math.round(chartData[chartData.length - 1].forecast * 1.08) });

    return {
      query: queryText,
      answerText: `Analyzing predictive regressions for **${template.name}**.\n\nOur models forecast a **12% expansion** over the next quarter. Baseline metrics indicate total values rising towards **₹${projected.toLocaleString('en-IN')}** by year-end, driven by strong seasonal indices.`,
      visualType: 'chart',
      chartType: 'area',
      chartData: chartData,
      chartKeys: ['forecast'],
      chartColors: ['#6366f1'],
      recommendation: {
        title: 'Optimize Resources for Forecast Growth',
        action: 'Review shift rosters and adjust ordering points to match the projected 12% rise.',
        impact: 'Estimated value: Prevents potential stock or staffing bottlenecks.'
      }
    };
  }

  // 3. Performance / Weakest / Low Performers
  if (
    query.includes('poorly') || 
    query.includes('worst') || 
    query.includes('slowest') || 
    query.includes('improve')
  ) {
    const lowPerformer = template.leaderboard[template.leaderboard.length - 1];
    
    return {
      query: queryText,
      answerText: `Based on current telemetry analysis for **${template.name}**, the lowest performing area is **${lowPerformer.name}** showing a growth index of **${lowPerformer.growth}%**.\n\nWe recommend auditing the resource limits or running promotional incentives for this segment.`,
      visualType: 'none',
      recommendation: {
        title: `Mitigate Performance Loss in ${lowPerformer.name}`,
        action: `Run promotional bundles or adjust resource margins to boost output values.`,
        impact: 'Est. value: +₹4,500 monthly margin recovery.'
      }
    };
  }

  // 4. Default dynamic help response
  const baselineRev = template.kpis[0].value;
  const activeAlertsCount = template.risks.filter(r => r.status === 'active').length;

  return {
    query: queryText,
    answerText: `I parsed your query: "${queryText}". Here are the matching highlights from the **${template.name}** dashboard:
    
- **Current Performance Value**: ${baselineRev}
- **Active System Risks**: ${activeAlertsCount} warnings detected
- **Category Leader**: ${template.leaderboard[0].name} (${template.leaderboard[0].score})

Try asking me:
* *"Why are sales dropping?"*
* *"Predict next month's sales"*
* *"What should I improve?"*`,
    visualType: 'none'
  };
}
