import { Filter, X, Search, Calendar, RotateCcw } from 'lucide-react';

export default function FilterPanel({
  columns,
  columnTypes = {},
  filters = {},
  onFilterChange,
  dateFilters = {},
  onDateFilterChange,
  onClearColumnDateFilter,
  onClearFilters,
  globalSearch = '',
  onGlobalSearchChange
}) {
  const activeTextFiltersCount = Object.values(filters).filter(
    (val) => val && val.trim() !== ''
  ).length;

  const activeDateFiltersCount = Object.values(dateFilters).filter(
    (df) => df && (df.start || df.end)
  ).length;

  const activeCount =
    activeTextFiltersCount +
    activeDateFiltersCount +
    (globalSearch && globalSearch.trim() !== '' ? 1 : 0);

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

      {/* Main Column Filters Grid */}
      <div className="column-filters-grid">
        {columns.map((column) => {
          const isDateCol =
            columnTypes[column] === 'date' ||
            /date|time|created|updated|enrolled|dob|joined|timestamp/i.test(column);

          if (isDateCol) {
            const range = dateFilters[column] || { start: '', end: '' };
            const isColDateActive = Boolean(range.start || range.end);

            return (
              <div key={column} className={`filter-field filter-field-date ${isColDateActive ? 'has-active-date' : ''}`}>
                <div className="filter-label-group">
                  <label className="filter-label" title={column}>
                    <Calendar size={13} className="date-label-icon" />
                    <span>{column}</span>
                    <span className="col-type-tag">Date</span>
                  </label>
                  {isColDateActive && (
                    <button
                      type="button"
                      className="btn-clear-col-date"
                      onClick={() => onClearColumnDateFilter(column)}
                      title={`Clear date filter for ${column}`}
                    >
                      <RotateCcw size={11} />
                      <span>Reset</span>
                    </button>
                  )}
                </div>

                {/* Inline Start & End Date Inputs */}
                <div className="inline-date-range-grid">
                  <div className="inline-date-item">
                    <span className="inline-date-prefix">From:</span>
                    <div className="filter-input-wrapper">
                      <input
                        type="date"
                        className={`filter-input inline-date-input ${range.start ? 'has-value' : ''}`}
                        value={range.start || ''}
                        max={range.end || undefined}
                        onChange={(e) => onDateFilterChange(column, 'start', e.target.value)}
                        title={`Start date for ${column}`}
                      />
                      {range.start && (
                        <button
                          type="button"
                          className="btn-clear-input"
                          onClick={() => onDateFilterChange(column, 'start', '')}
                          title="Clear start date"
                        >
                          <X size={13} />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="inline-date-item">
                    <span className="inline-date-prefix">To:</span>
                    <div className="filter-input-wrapper">
                      <input
                        type="date"
                        className={`filter-input inline-date-input ${range.end ? 'has-value' : ''}`}
                        value={range.end || ''}
                        min={range.start || undefined}
                        onChange={(e) => onDateFilterChange(column, 'end', e.target.value)}
                        title={`End date for ${column}`}
                      />
                      {range.end && (
                        <button
                          type="button"
                          className="btn-clear-input"
                          onClick={() => onDateFilterChange(column, 'end', '')}
                          title="Clear end date"
                        >
                          <X size={13} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          // Standard non-date column filter
          const val = filters[column] || '';
          return (
            <div key={column} className="filter-field">
              <label htmlFor={`filter-${column}`} className="filter-label" title={column}>
                {column}
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
  );
}
