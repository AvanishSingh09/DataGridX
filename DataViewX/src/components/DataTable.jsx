import { ArrowUpDown, ArrowUp, ArrowDown, SearchX, FileSpreadsheet } from 'lucide-react';

export default function DataTable({
  columns,
  data,
  sortConfig,
  onSort,
  startIndex = 0,
  hasFilters = false,
  onClearFilters
}) {
  if (!columns || columns.length === 0) {
    return (
      <div className="table-card empty-card">
        <FileSpreadsheet size={40} className="empty-icon" />
        <h4 className="empty-title">No CSV Loaded</h4>
        <p className="empty-subtitle">Upload a CSV file to view and analyze your data.</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="table-card empty-card">
        <SearchX size={40} className="empty-icon" />
        <h4 className="empty-title">No matching records found</h4>
        <p className="empty-subtitle">No rows match your current filter criteria.</p>
        {hasFilters && (
          <button
            type="button"
            className="btn btn-secondary mt-3"
            onClick={onClearFilters}
          >
            Clear Filters
          </button>
        )}
      </div>
    );
  }

  const renderSortIcon = (column) => {
    if (!sortConfig || sortConfig.key !== column) {
      return <ArrowUpDown size={13} className="sort-icon-neutral" />;
    }
    if (sortConfig.direction === 'asc') {
      return <ArrowUp size={13} className="sort-icon-active" />;
    }
    return <ArrowDown size={13} className="sort-icon-active" />;
  };

  return (
    <div className="table-card">
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th className="th-index">#</th>
              {columns.map((column) => {
                const isSorted = sortConfig && sortConfig.key === column;
                return (
                  <th
                    key={column}
                    className={`th-column ${isSorted ? 'th-sorted' : ''}`}
                    onClick={() => onSort(column)}
                    title={`Sort by ${column}`}
                  >
                    <div className="th-content">
                      <span className="th-label">{column}</span>
                      <span className="th-sort-icon">{renderSortIcon(column)}</span>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => {
              const rowNumber = startIndex + idx + 1;
              return (
                <tr key={`row-${rowNumber}`} className="table-row">
                  <td className="td-index">{rowNumber}</td>
                  {columns.map((column) => {
                    const rawVal = row[column];
                    const display =
                      rawVal === undefined || rawVal === null || rawVal === ''
                        ? '—'
                        : String(rawVal);

                    return (
                      <td key={`${idx}-${column}`} className="td-cell" title={display}>
                        <span className={rawVal === '' || rawVal === undefined ? 'empty-cell' : ''}>
                          {display}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
