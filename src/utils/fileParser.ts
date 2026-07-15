export interface CleanedDataset {
  fileName: string;
  columns: string[];
  data: any[];
  validationReport: {
    totalRows: number;
    validRows: number;
    missingValuesCorrected: number;
    detectedType: string; // e.g. "TimeSeries", "Categorical", "General"
  };
  suggestedChartType: 'line' | 'bar' | 'pie' | 'scatter';
  suggestedKeys: {
    xAxisKey: string;
    yAxisKeys: string[];
  };
}

/**
 * Client-side parser that validates, cleans, and structures CSV text data.
 */
export function parseAndCleanCSV(fileName: string, rawText: string): CleanedDataset {
  const lines = rawText.split(/\r?\n/).map(line => line.trim()).filter(line => line.length > 0);
  
  if (lines.length < 2) {
    throw new Error("Dataset is empty or does not contain header columns.");
  }

  // Parse Headers
  // handle comma, semicolon, and tab delimiters
  let delimiter = ',';
  if (lines[0].includes(';')) delimiter = ';';
  else if (lines[0].includes('\t')) delimiter = '\t';

  const columns = lines[0].split(delimiter).map(col => col.replace(/['"]+/g, '').trim());
  const parsedData: any[] = [];
  
  let missingValuesCorrected = 0;
  let validRows = 0;

  for (let i = 1; i < lines.length; i++) {
    const rowRaw = lines[i].split(delimiter);
    // Skip empty lines or mismatching column counts
    if (rowRaw.length < columns.length) continue;

    const rowObj: any = {};
    let isRowValid = true;

    columns.forEach((col, colIdx) => {
      let cellValue = rowRaw[colIdx]?.replace(/['"]+/g, '').trim() || "";
      
      // Clean and validate data types
      if (cellValue === "" || cellValue.toLowerCase() === "null" || cellValue.toLowerCase() === "nan" || cellValue === "undefined") {
        missingValuesCorrected++;
        // If it's a numeric field, fill with 0. Else, fill with "N/A"
        cellValue = "0"; // temporary fallback
      }

      // Detect if it should be parsed as float
      const cleanedValue = cellValue.replace(/[₹,%]/g, '');
      const parsedNum = parseFloat(cleanedValue);

      if (!isNaN(parsedNum) && cleanedValue !== "") {
        rowObj[col] = parsedNum;
      } else {
        // Keep as string
        rowObj[col] = cellValue === "0" ? "N/A" : cellValue;
      }
    });

    if (isRowValid) {
      parsedData.push(rowObj);
      validRows++;
    }
  }

  // Auto-detect columns purpose: Date/Time axis, Value axes
  let xAxisKey = columns[0];
  const yAxisKeys: string[] = [];

  // Look for time/date columns for X-axis
  const dateCol = columns.find(col => {
    const name = col.toLowerCase();
    return name.includes('date') || name.includes('month') || name.includes('year') || name.includes('time') || name.includes('day');
  });
  if (dateCol) xAxisKey = dateCol;

  // Look for numerical columns for Y-axis
  columns.forEach(col => {
    if (col === xAxisKey) return;
    // Check if the majority of entries for this column are numbers
    const sample = parsedData.slice(0, 5).map(row => row[col]);
    const numericSamples = sample.filter(val => typeof val === 'number');
    if (numericSamples.length >= sample.length * 0.6) {
      yAxisKeys.push(col);
    }
  });

  // If no numerical keys, use the second column
  if (yAxisKeys.length === 0 && columns.length > 1) {
    yAxisKeys.push(columns[1]);
  }

  // Suggest a chart type based on content
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
  } else {
    suggestedChartType = 'bar';
    detectedType = "Comparison Categorical";
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

/**
 * Generate a clean standard mock CSV file template for testing
 */
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
