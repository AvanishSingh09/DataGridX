import { Download, FileText, Database, Columns, RotateCcw, Table, BarChart3 } from 'lucide-react';

export default function Toolbar({
  fileName,
  totalRecords,
  totalColumns,
  filteredRecords,
  activeView,
  onViewChange,
  onExport,
  onReset
}) {
  const isFiltered = filteredRecords !== totalRecords;

  return (
    <div className="toolbar-container">
      <div className="file-info-group">
        <div className="file-name-tag">
          <FileText size={17} className="file-icon" />
          <span className="file-name" title={fileName}>
            {fileName || 'data.csv'}
          </span>
        </div>

        <div className="stats-pills">
          <div className="stat-pill" title="Total records">
            <Database size={14} />
            <span>
              <strong>{totalRecords}</strong> {totalRecords === 1 ? 'record' : 'records'}
            </span>
          </div>

          <div className="stat-pill" title="Total columns">
            <Columns size={14} />
            <span>
              <strong>{totalColumns}</strong> {totalColumns === 1 ? 'column' : 'columns'}
            </span>
          </div>

          {isFiltered && (
            <div className="stat-pill filter-active-pill" title="Matching filtered records">
              <span>
                Matching: <strong>{filteredRecords}</strong>
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="toolbar-center">
        {/* View Switcher Tabs */}
        <div className="view-switcher-tabs" role="tablist">
          <button
            type="button"
            className={`tab-btn ${activeView === 'table' ? 'active' : ''}`}
            onClick={() => onViewChange('table')}
            role="tab"
            aria-selected={activeView === 'table'}
          >
            <Table size={15} />
            <span>Table View</span>
          </button>
          <button
            type="button"
            className={`tab-btn ${activeView === 'analytics' ? 'active' : ''}`}
            onClick={() => onViewChange('analytics')}
            role="tab"
            aria-selected={activeView === 'analytics'}
          >
            <BarChart3 size={15} />
            <span>Visual Analytics</span>
          </button>
        </div>
      </div>

      <div className="toolbar-actions">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onReset}
          title="Upload a new CSV file"
        >
          <RotateCcw size={15} />
          <span>Upload New File</span>
        </button>

        <button
          type="button"
          className="btn btn-primary"
          onClick={onExport}
          disabled={filteredRecords === 0}
          title="Export filtered records as CSV"
        >
          <Download size={15} />
          <span>Export Filtered CSV</span>
        </button>
      </div>
    </div>
  );
}
