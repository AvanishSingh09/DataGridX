import { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  AreaChart,
  Area
} from 'recharts';
import { BarChart3, PieChart as PieIcon, SlidersHorizontal, BarChart2 } from 'lucide-react';
import MetricCards from './MetricCards';
import {
  detectColumnTypes,
  getCategoryCounts,
  getGroupedMetrics
} from '../utils/dataAnalyzer';

// Modern clean palette for charts
const CHART_COLORS = [
  '#4f46e5', // Indigo
  '#06b6d4', // Cyan
  '#10b981', // Emerald
  '#f59e0b', // Amber
  '#ec4899', // Pink
  '#8b5cf6', // Purple
  '#3b82f6', // Blue
  '#64748b'  // Slate
];

export default function AnalyticsDashboard({
  data,
  totalRawCount,
  columns
}) {
  // Detect column types
  const columnTypes = useMemo(() => {
    return detectColumnTypes(data, columns);
  }, [data, columns]);

  const categoricalColumns = useMemo(() => {
    return columns.filter((col) => columnTypes[col] === 'categorical' || columnTypes[col] === 'date');
  }, [columns, columnTypes]);

  const numericColumns = useMemo(() => {
    return columns.filter((col) => columnTypes[col] === 'numeric');
  }, [columns, columnTypes]);

  // Interactive Chart Builder State
  const [selectedCategoryCol, setSelectedCategoryCol] = useState(
    categoricalColumns[0] || columns[0] || ''
  );
  const [selectedNumericCol, setSelectedNumericCol] = useState(
    numericColumns[0] || 'count'
  );
  const [selectedMetric, setSelectedMetric] = useState(
    numericColumns.length > 0 ? 'avg' : 'count'
  );
  const [chartType, setChartType] = useState('bar'); // 'bar' | 'area' | 'pie'

  // Computed data for the custom interactive chart
  const customChartData = useMemo(() => {
    if (!data || data.length === 0 || !selectedCategoryCol) return [];

    if (selectedNumericCol === 'count' || selectedMetric === 'count') {
      return getCategoryCounts(data, selectedCategoryCol, 8).map((item) => ({
        name: item.name,
        value: item.count
      }));
    }

    return getGroupedMetrics(data, selectedCategoryCol, selectedNumericCol, selectedMetric);
  }, [data, selectedCategoryCol, selectedNumericCol, selectedMetric]);

  // Computed data for default distribution pie/donut chart
  const distributionData = useMemo(() => {
    if (!selectedCategoryCol) return [];
    return getCategoryCounts(data, selectedCategoryCol, 6);
  }, [data, selectedCategoryCol]);

  if (!data || data.length === 0) {
    return (
      <div className="table-card empty-card">
        <BarChart3 size={40} className="empty-icon" />
        <h4 className="empty-title">No Data for Analytics</h4>
        <p className="empty-subtitle">Upload a CSV or clear your filters to view visual charts.</p>
      </div>
    );
  }

  return (
    <div className="analytics-dashboard-container">
      {/* 1. Summary KPI Metric Cards */}
      <MetricCards
        data={data}
        totalRawCount={totalRawCount}
        columns={columns}
        columnTypes={columnTypes}
      />

      {/* 2. Interactive Chart Builder Controls */}
      <div className="chart-builder-card">
        <div className="chart-builder-header">
          <div className="chart-title-group">
            <SlidersHorizontal size={17} className="text-primary" />
            <h3 className="chart-card-title">Interactive Visualizer</h3>
          </div>

          {/* Chart Type Toggle */}
          <div className="chart-type-toggle">
            <button
              type="button"
              className={`btn-chart-toggle ${chartType === 'bar' ? 'active' : ''}`}
              onClick={() => setChartType('bar')}
              title="Bar Chart"
            >
              <BarChart2 size={15} />
              <span>Bar</span>
            </button>
            <button
              type="button"
              className={`btn-chart-toggle ${chartType === 'area' ? 'active' : ''}`}
              onClick={() => setChartType('area')}
              title="Area Chart"
            >
              <TrendingUpIcon size={15} />
              <span>Area</span>
            </button>
            <button
              type="button"
              className={`btn-chart-toggle ${chartType === 'pie' ? 'active' : ''}`}
              onClick={() => setChartType('pie')}
              title="Donut / Pie Chart"
            >
              <PieIcon size={15} />
              <span>Donut</span>
            </button>
          </div>
        </div>

        {/* Axis & Metric Selectors */}
        <div className="chart-selectors-grid">
          <div className="selector-field">
            <label className="selector-label">Group By (X-Axis):</label>
            <select
              className="chart-select"
              value={selectedCategoryCol}
              onChange={(e) => setSelectedCategoryCol(e.target.value)}
            >
              {columns.map((col) => (
                <option key={col} value={col}>
                  {col} ({columnTypes[col] || 'text'})
                </option>
              ))}
            </select>
          </div>

          <div className="selector-field">
            <label className="selector-label">Value (Y-Axis):</label>
            <select
              className="chart-select"
              value={selectedNumericCol}
              onChange={(e) => setSelectedNumericCol(e.target.value)}
            >
              <option value="count">Record Count (Frequency)</option>
              {numericColumns.map((col) => (
                <option key={col} value={col}>
                  {col} (Numeric)
                </option>
              ))}
            </select>
          </div>

          {selectedNumericCol !== 'count' && (
            <div className="selector-field">
              <label className="selector-label">Calculation:</label>
              <select
                className="chart-select"
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
              >
                <option value="avg">Average (Mean)</option>
                <option value="sum">Total Sum</option>
                <option value="count">Count of Records</option>
              </select>
            </div>
          )}
        </div>

        {/* Main Chart Render Area */}
        <div className="chart-render-area">
          <ResponsiveContainer width="100%" height={320}>
            {chartType === 'bar' ? (
              <BarChart data={customChartData} margin={{ top: 15, right: 20, left: 10, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis
                  dataKey="name"
                  stroke="#64748b"
                  fontSize={12}
                  tickLine={false}
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {customChartData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={CHART_COLORS[index % CHART_COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            ) : chartType === 'area' ? (
              <AreaChart data={customChartData} margin={{ top: 15, right: 20, left: 10, bottom: 25 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis
                  dataKey="name"
                  stroke="#64748b"
                  fontSize={12}
                  tickLine={false}
                  angle={-15}
                  textAnchor="end"
                />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#4f46e5"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            ) : (
              <PieChart>
                <Pie
                  data={customChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={105}
                  paddingAngle={3}
                >
                  {customChartData.map((_, index) => (
                    <Cell
                      key={`pie-cell-${index}`}
                      fill={CHART_COLORS[index % CHART_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. Breakdown Grid: Categorical Distribution & Numeric Trends */}
      <div className="charts-secondary-grid">
        {/* Category Share Donut */}
        <div className="chart-card">
          <div className="chart-card-header">
            <h4 className="chart-card-title">Distribution by {selectedCategoryCol}</h4>
          </div>
          <div className="chart-render-area">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={distributionData}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={85}
                  paddingAngle={2}
                >
                  {distributionData.map((_, index) => (
                    <Cell
                      key={`donut-cell-${index}`}
                      fill={CHART_COLORS[index % CHART_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip unit="rows" />} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Frequency Table */}
        <div className="chart-card">
          <div className="chart-card-header">
            <h4 className="chart-card-title">Top Categories Summary</h4>
          </div>
          <div className="category-rank-list">
            {distributionData.map((item, idx) => (
              <div key={item.name} className="category-rank-item">
                <div className="rank-left">
                  <span className="rank-badge">{idx + 1}</span>
                  <span className="rank-name">{item.name}</span>
                </div>
                <div className="rank-right">
                  <div className="rank-bar-bg">
                    <div
                      className="rank-bar-fill"
                      style={{
                        width: `${item.percentage}%`,
                        backgroundColor: CHART_COLORS[idx % CHART_COLORS.length]
                      }}
                    />
                  </div>
                  <span className="rank-count">
                    <strong>{item.count}</strong> ({item.percentage}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Custom Tooltip component for Recharts
function CustomTooltip({ active, payload, label, unit }) {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="custom-chart-tooltip">
        <div className="tooltip-label">{data.payload?.name || label}</div>
        <div className="tooltip-value">
          <span className="tooltip-dot" style={{ backgroundColor: data.fill || '#4f46e5' }} />
          <span>Value: <strong>{data.value?.toLocaleString()}</strong> {unit || ''}</span>
        </div>
      </div>
    );
  }
  return null;
}

function TrendingUpIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}
