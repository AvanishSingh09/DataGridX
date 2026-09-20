import { Filter, X, Search } from 'lucide-react';

export default function FilterPanel({
  columns,
  filters,
  onFilterChange,
  onClearFilters,
  globalSearch,
  onGlobalSearchChange
}) {
  const activeCount =
    Object.values(filters).filter((val) => val && val.trim() !== '').length +
    (globalSearch && globalSearch.trim() !== '' ? 1 : 0);

  return (
    <div className="filter-panel-card">
      <div className="filter-panel-header">
        <div className="filter-title-group">
          <Filter size={17} className="filter-header-icon" />
          <h3 className="filter-title">Filters</h3>
          {activeCount > 0 && (
            <span className="active-filters-badge">
              {activeCount} {activeCount === 1 ? 'active' : 'active'}
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
            <span>Clear Filters</span>
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

      {/* Individual column filter inputs */}
      <div className="column-filters-grid">
        {columns.map((column) => {
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
