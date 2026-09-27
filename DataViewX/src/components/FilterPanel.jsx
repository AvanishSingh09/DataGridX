import { Filter, X, Search, CalendarRange, RotateCcw } from 'lucide-react';

export default function FilterPanel({
  columns,
  columnTypes = {},
  filters,
  onFilterChange,
  onClearFilters,
  globalSearch,
  onGlobalSearchChange,
  dateRange = { column: '', startDate: '', endDate: '' },
  onDateRangeChange
}) {
  // Find detected date columns
  const dateColumns = columns.filter(
    (col) =>
      columnTypes[col] === 'date' ||
      /date|time|created|updated|enrolled|dob|joined|timestamp/i.test(col)
  );

  // Fallback to all columns if no date column explicitly detected
  const availableDateCols = dateColumns.length > 0 ? dateColumns : columns;
  const activeDateCol = dateRange.column || availableDateCols[0] || '';

  const isDateRangeActive = Boolean(
    dateRange.column && (dateRange.startDate || dateRange.endDate)
  );

  const activeCount =
    Object.values(filters).filter((val) => val && val.trim() !== '').length +
    (globalSearch && globalSearch.trim() !== '' ? 1 : 0) +
    (isDateRangeActive ? 1 : 0);

  const handleClearDateRange = () => {
    if (onDateRangeChange) {
      onDateRangeChange({
        ...dateRange,
        startDate: '',
        endDate: ''
      });
    }
  };

  return (
    <div className="filter-panel-card">
      <div className="filter-panel-header">
        <div className="filter-title-group">
          <Filter size={17} className="filter-header-icon" />
          <h3 className="filter-title">Filters</h3>
          {activeCount > 0 && (
            <span className="active-filters-badge">
              {activeCount} {activeCount === 1 ? 'filter active' : 'filters active'}
            </span>
          )}
        </div>

        {activeCount > 0 && (
          <button
            type="button"
            className="btn btn-sm btn-outline-danger"
            onClick={onClearFilters}
            title="Clear all filters"
          >
            <X size={14} />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {/* Global search across all columns */}
      <div className="global-search-container">
        <div className="search-input-wrapper">
          <Search size={15} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search across all columns..."
            value={globalSearch || ''}
            onChange={(e) => onGlobalSearchChange(e.target.value)}
          />
          {globalSearch && (
            <button
              type="button"
              className="btn-clear-input"
              onClick={() => onGlobalSearchChange('')}
              title="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Date Range Filter Section */}
      {availableDateCols.length > 0 && onDateRangeChange && (
        <div className={`date-range-filter-box ${isDateRangeActive ? 'active-range' : ''}`}>
          <div className="date-range-header">
            <div className="date-range-title">
              <CalendarRange size={16} className="date-icon" />
              <span>Date Range Filter</span>
              {isDateRangeActive && (
                <span className="date-active-pill">Active</span>
              )}
            </div>

            {isDateRangeActive && (
              <button
                type="button"
                className="btn-clear-date-range"
                onClick={handleClearDateRange}
                title="Reset date range"
              >
                <RotateCcw size={12} />
                <span>Reset Dates</span>
              </button>
            )}
          </div>

          <div className="date-range-controls-grid">
            <div className="date-control-field">
              <label className="date-field-label">Date Column:</label>
              <select
                className="date-select-input"
                value={activeDateCol}
                onChange={(e) =>
                  onDateRangeChange({
                    ...dateRange,
                    column: e.target.value
                  })
                }
              >
                {availableDateCols.map((col) => (
                  <option key={col} value={col}>
                    {col} {columnTypes[col] === 'date' ? '(Date)' : ''}
                  </option>
                ))}
              </select>
            </div>

            <div className="date-control-field">
              <label className="date-field-label">Start Date:</label>
              <div className="date-input-wrapper">
                <input
                  type="date"
                  className={`date-picker-input ${dateRange.startDate ? 'has-date' : ''}`}
                  value={dateRange.startDate || ''}
                  max={dateRange.endDate || undefined}
                  onChange={(e) =>
                    onDateRangeChange({
                      ...dateRange,
                      column: activeDateCol,
                      startDate: e.target.value
                    })
                  }
                />
                {dateRange.startDate && (
                  <button
                    type="button"
                    className="btn-clear-date-input"
                    onClick={() =>
                      onDateRangeChange({
                        ...dateRange,
                        startDate: ''
                      })
                    }
                    title="Clear start date"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>
            </div>

            <div className="date-control-field">
              <label className="date-field-label">End Date:</label>
              <div className="date-input-wrapper">
                <input
                  type="date"
                  className={`date-picker-input ${dateRange.endDate ? 'has-date' : ''}`}
                  value={dateRange.endDate || ''}
                  min={dateRange.startDate || undefined}
                  onChange={(e) =>
                    onDateRangeChange({
                      ...dateRange,
                      column: activeDateCol,
                      endDate: e.target.value
                    })
                  }
                />
                {dateRange.endDate && (
                  <button
                    type="button"
                    className="btn-clear-date-input"
                    onClick={() =>
                      onDateRangeChange({
                        ...dateRange,
                        endDate: ''
                      })
                    }
                    title="Clear end date"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Individual column filter inputs */}
      <div className="column-filters-container">
        <div className="column-filters-header">
          <span className="column-filters-title">Column Substring Filters:</span>
        </div>
        <div className="column-filters-grid">
          {columns.map((column) => {
            const val = filters[column] || '';
            const isDateCol = columnTypes[column] === 'date';
            return (
              <div key={column} className="filter-field">
                <label htmlFor={`filter-${column}`} className="filter-label" title={column}>
                  {column} {isDateCol && <span className="col-type-tag">Date</span>}
                </label>
                <div className="filter-input-wrapper">
                  <input
                    id={`filter-${column}`}
                    type="text"
                    className={`filter-input ${val ? 'has-value' : ''}`}
                    placeholder={`Filter ${column}...`}
                    value={val}
                    onChange={(e) => onFilterChange(column, e.target.value)}
                  />
                  {val && (
                    <button
                      type="button"
                      className="btn-clear-input"
                      onClick={() => onFilterChange(column, '')}
                      title={`Clear ${column} filter`}
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
