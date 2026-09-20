import { Database, TrendingUp, PieChart, CheckCircle2 } from 'lucide-react';
import { getNumericStats, getCategoryCounts } from '../utils/dataAnalyzer';

export default function MetricCards({
  data,
  totalRawCount,
  columns,
  columnTypes
}) {
  if (!data || data.length === 0) return null;

  // 1. Records Card
  const isFiltered = data.length !== totalRawCount;
  const filteredPercentage = ((data.length / totalRawCount) * 100).toFixed(0);

  // 2. Find primary numeric column for stats
  const numericColumns = columns.filter((col) => columnTypes[col] === 'numeric');
  const primaryNumericCol = numericColumns[0] || null;
  const numericStats = primaryNumericCol ? getNumericStats(data, primaryNumericCol) : null;

  // 3. Find primary categorical column for dominant category
  const categoricalColumns = columns.filter(
    (col) => columnTypes[col] === 'categorical' || columnTypes[col] === 'date'
  );
  const primaryCatCol = categoricalColumns[0] || null;
  const categoryCounts = primaryCatCol ? getCategoryCounts(data, primaryCatCol, 5) : [];
  const topCategory = categoryCounts[0] || null;

  // 4. Data Quality / Completeness
  let totalCells = data.length * columns.length;
  let filledCells = 0;
  data.forEach((row) => {
    columns.forEach((col) => {
      const v = row[col];
      if (v !== undefined && v !== null && String(v).trim() !== '') {
        filledCells++;
      }
    });
  });
  const completeness = totalCells > 0 ? ((filledCells / totalCells) * 100).toFixed(1) : 100;

  return (
    <div className="metric-cards-grid">
      {/* Card 1: Active Records */}
      <div className="metric-card">
        <div className="metric-card-header">
          <span className="metric-label">Active Records</span>
          <div className="metric-icon-box bg-blue">
            <Database size={16} />
          </div>
        </div>
        <div className="metric-value">{data.length.toLocaleString()}</div>
        <div className="metric-footer">
          {isFiltered ? (
            <span className="badge-subtle text-primary">
              {filteredPercentage}% of {totalRawCount} total
            </span>
          ) : (
            <span className="text-muted">100% of dataset loaded</span>
          )}
        </div>
      </div>

      {/* Card 2: Numeric Insights */}
      {primaryNumericCol && numericStats && (
        <div className="metric-card">
          <div className="metric-card-header">
            <span className="metric-label" title={`Average ${primaryNumericCol}`}>
              Avg {primaryNumericCol}
            </span>
            <div className="metric-icon-box bg-emerald">
              <TrendingUp size={16} />
            </div>
          </div>
          <div className="metric-value">{numericStats.avg}</div>
          <div className="metric-footer">
            <span className="text-muted">
              Min: <strong>{numericStats.min}</strong> &bull; Max: <strong>{numericStats.max}</strong>
            </span>
          </div>
        </div>
      )}

      {/* Card 3: Top Category */}
      {primaryCatCol && topCategory && (
        <div className="metric-card">
          <div className="metric-card-header">
            <span className="metric-label" title={`Top ${primaryCatCol}`}>
              Top {primaryCatCol}
            </span>
            <div className="metric-icon-box bg-purple">
              <PieChart size={16} />
            </div>
          </div>
          <div className="metric-value metric-value-text" title={topCategory.name}>
            {topCategory.name}
          </div>
          <div className="metric-footer">
            <span className="text-muted">
              <strong>{topCategory.count}</strong> rows ({topCategory.percentage}%)
            </span>
          </div>
        </div>
      )}

      {/* Card 4: Completeness */}
      <div className="metric-card">
        <div className="metric-card-header">
          <span className="metric-label">Data Completeness</span>
          <div className="metric-icon-box bg-amber">
            <CheckCircle2 size={16} />
          </div>
        </div>
        <div className="metric-value">{completeness}%</div>
        <div className="metric-footer">
          <span className="text-muted">{filledCells.toLocaleString()} / {totalCells.toLocaleString()} cells filled</span>
        </div>
      </div>
    </div>
  );
}
