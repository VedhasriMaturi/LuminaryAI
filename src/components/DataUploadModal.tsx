import React, { useState } from 'react';
import { 
  UploadCloud, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  X,
  ChevronRight,
  Info,
  BarChart2
} from 'lucide-react';
import { 
  ResponsiveContainer, 
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
import { parseAndCleanCSV, generateMockCSVTemplate, CleanedDataset } from '../utils/fileParser';
import canvasConfetti from 'canvas-confetti';

interface DataUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyDataset: (dataset: CleanedDataset) => void;
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
      
      // Trigger subtle success confetti
      canvasConfetti({
        particleCount: 50,
        spread: 40,
        origin: { y: 0.6 }
      });
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to parse CSV dataset.');
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        processFileContent(file.name, text);
      };
      reader.readAsText(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        processFileContent(file.name, text);
      };
      reader.readAsText(file);
    }
  };

  const handleLoadSample = () => {
    const sampleCSV = generateMockCSVTemplate();
    processFileContent('GlobalMart_Sample_Report.csv', sampleCSV);
  };

  const handleConfirm = () => {
    if (parsedDataset) {
      onApplyDataset(parsedDataset);
      onClose();
    }
  };

  const handleReset = () => {
    setParsedDataset(null);
    setErrorMsg('');
  };

  const renderPreviewChart = () => {
    if (!parsedDataset) return null;
    const { data, suggestedChartType, suggestedKeys } = parsedDataset;
    const { xAxisKey, yAxisKeys } = suggestedKeys;
    const colors = ['#6366f1', '#10b981', '#3b82f6', '#fbbf24', '#ec4899'];

    return (
      <div className="w-full h-40 bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/80 rounded-xl p-2">
        <ResponsiveContainer width="100%" height="100%">
          {suggestedChartType === 'line' ? (
            <LineChart data={data}>
              <XAxis dataKey={xAxisKey} tick={{ fontSize: 9 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 9 }} stroke="#94a3b8" />
              <Tooltip />
              {yAxisKeys.map((key, idx) => (
                <Line 
                  key={key} 
                  type="monotone" 
                  dataKey={key} 
                  stroke={colors[idx % colors.length]} 
                  strokeWidth={2}
                  dot={{ r: 2 }}
                />
              ))}
            </LineChart>
          ) : suggestedChartType === 'pie' ? (
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={25}
                outerRadius={45}
                paddingAngle={2}
                dataKey={yAxisKeys[0]}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          ) : (
            <BarChart data={data}>
              <XAxis dataKey={xAxisKey} tick={{ fontSize: 9 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 9 }} stroke="#94a3b8" />
              <Tooltip />
              {yAxisKeys.map((key, idx) => (
                <Bar 
                  key={key} 
                  dataKey={key} 
                  fill={colors[idx % colors.length]} 
                  radius={[3, 3, 0, 0]}
                />
              ))}
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-slate-950/30 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl relative animate-slide-up">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400 p-2 rounded-lg">
              <UploadCloud size={18} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100 m-0">Data Upload Wizard</h2>
              <span className="text-[10px] text-slate-400 font-semibold uppercase">Smart data cleaning & visualization</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6">
          {!parsedDataset ? (
            /* Upload Screen */
            <div className="space-y-4">
              <div 
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all relative ${
                  dragActive 
                    ? 'border-brand-500 bg-brand-50/20 dark:bg-brand-950/10' 
                    : 'border-slate-200 hover:border-slate-350 dark:border-slate-800 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-950/20'
                }`}
              >
                <input 
                  type="file" 
                  id="csv-file-input"
                  accept=".csv,.txt"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <UploadCloud size={40} className="mx-auto text-slate-400 dark:text-slate-650 mb-3" />
                <p className="text-xs font-bold text-slate-700 dark:text-slate-350">
                  Drag and drop your spreadsheet file here
                </p>
                <p className="text-[10px] text-slate-400 mt-1">
                  Supports CSV, TXT files (Delimiter: comma, semicolon, tab)
                </p>
                
                <label 
                  htmlFor="csv-file-input"
                  className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors shadow-lg shadow-brand-500/10"
                >
                  Browse Files
                </label>
              </div>

              {errorMsg && (
                <div className="bg-danger-50 dark:bg-danger-950/20 border border-danger-550/20 p-3 rounded-xl flex items-start gap-2.5">
                  <AlertTriangle className="text-danger-500 mt-0.5 flex-shrink-0" size={14} />
                  <span className="text-[11px] text-danger-600 dark:text-danger-400 leading-relaxed font-semibold">
                    {errorMsg}
                  </span>
                </div>
              )}

              {/* Sample Helper */}
              <div className="flex items-center justify-between p-3.5 bg-slate-100/50 dark:bg-slate-850/50 border border-slate-200/20 rounded-xl">
                <div className="flex items-center gap-2">
                  <Info size={14} className="text-brand-500" />
                  <span className="text-[10px] text-slate-500 dark:text-slate-450 font-semibold leading-none">
                    No data file? Test the validation wizard instantly.
                  </span>
                </div>
                <button 
                  onClick={handleLoadSample}
                  className="text-[10px] font-bold text-brand-600 dark:text-brand-400 hover:underline"
                >
                  Load Sample Dataset
                </button>
              </div>
            </div>
          ) : (
            /* Report Screen */
            <div className="space-y-4 animate-fade-in">
              
              {/* Validation Badges */}
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
                  <span className="text-sm font-bold text-warning-500">{parsedDataset.validationReport.missingValuesCorrected}</span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-200/10">
                  <span className="text-[10px] text-slate-400 uppercase block font-semibold">Data Category</span>
                  <span className="text-[11px] font-bold text-brand-500 truncate block mt-0.5" title={parsedDataset.validationReport.detectedType}>
                    {parsedDataset.validationReport.detectedType}
                  </span>
                </div>
              </div>

              {/* Data Cleaning Status */}
              <div className="bg-emerald-50/30 dark:bg-emerald-950/10 border border-emerald-500/20 p-3 rounded-xl flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-500" />
                <span className="text-[10px] text-emerald-600 dark:text-emerald-450 font-bold">
                  File '{parsedDataset.fileName}' successfully parsed and validated. Null values corrected to 0.
                </span>
              </div>

              {/* Chart Preview */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase text-slate-400 flex items-center gap-1">
                  <BarChart2 size={12} />
                  Auto-Generated Visualization Preview ({parsedDataset.suggestedChartType} Chart)
                </span>
                {renderPreviewChart()}
              </div>

              {/* Grid Preview (First 3 rows) */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase text-slate-400 flex items-center gap-1">
                  <FileText size={12} />
                  Parsed Rows Preview
                </span>
                <div className="border border-slate-200/50 dark:border-slate-800 rounded-xl overflow-hidden text-[10px]">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-850 text-slate-500 border-b border-slate-200/50 dark:border-slate-800">
                        {parsedDataset.columns.slice(0, 4).map(col => (
                          <th key={col} className="p-2 truncate max-w-[120px]">{col}</th>
                        ))}
                        {parsedDataset.columns.length > 4 && <th className="p-2">...</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {parsedDataset.data.slice(0, 3).map((row, idx) => (
                        <tr key={idx} className="border-b border-slate-100 dark:border-slate-800/60 last:border-b-0 text-slate-655 dark:text-slate-350">
                          {parsedDataset.columns.slice(0, 4).map(col => (
                            <td key={col} className="p-2 truncate max-w-[120px]">{typeof row[col] === 'number' ? row[col].toLocaleString('en-IN') : row[col]}</td>
                          ))}
                          {parsedDataset.columns.length > 4 && <td className="p-2 text-slate-400">...</td>}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between">
          {!parsedDataset ? (
            <>
              <span className="text-[10px] text-slate-400 font-semibold">Select a file to begin validation.</span>
              <button 
                onClick={onClose}
                className="px-4 py-2 bg-slate-150 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-bold transition-colors"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={handleReset}
                className="px-3.5 py-2 bg-slate-150 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-bold transition-colors"
              >
                Reset Upload
              </button>
              <div className="flex gap-2">
                <button 
                  onClick={onClose}
                  className="px-3.5 py-2 border border-slate-200/50 dark:border-slate-700/50 text-slate-550 dark:text-slate-400 rounded-xl text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                >
                  Close
                </button>
                <button 
                  onClick={handleConfirm}
                  className="inline-flex items-center gap-1 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-bold transition-colors shadow-lg shadow-brand-500/10"
                >
                  <span>Apply to Dashboard</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
};
export default DataUploadModal;
