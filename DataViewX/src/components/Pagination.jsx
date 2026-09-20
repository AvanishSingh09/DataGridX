import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

export default function Pagination({
  currentPage,
  totalPages,
  rowsPerPage,
  totalRecords,
  filteredRecordsCount,
  onPageChange,
  onRowsPerPageChange
}) {
  if (filteredRecordsCount === 0) {
    return null;
  }

  const startRecord = Math.min((currentPage - 1) * rowsPerPage + 1, filteredRecordsCount);
  const endRecord = Math.min(currentPage * rowsPerPage, filteredRecordsCount);

  // Generate numbered pages with ellipsis
  const getPageList = () => {
    const list = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        list.push(i);
      }
    } else {
      if (currentPage <= 3) {
        list.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        list.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        list.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return list;
  };

  return (
    <div className="pagination-container">
      {/* Rows per page & record counter */}
      <div className="pagination-info-group">
        <div className="rows-per-page-wrapper">
          <label htmlFor="rows-select" className="rows-label">
            Rows per page:
          </label>
          <select
            id="rows-select"
            className="rows-select"
            value={rowsPerPage}
            onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        <div className="result-counter">
          Showing <strong>{startRecord}</strong>–<strong>{endRecord}</strong> of{' '}
          <strong>{filteredRecordsCount}</strong> records
          {totalRecords !== filteredRecordsCount && (
            <span className="total-raw-text"> (filtered from {totalRecords} total)</span>
          )}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="pagination-controls">
        <button
          type="button"
          className="btn-page-nav"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          title="First page"
          aria-label="First page"
        >
          <ChevronsLeft size={15} />
        </button>

        <button
          type="button"
          className="btn-page-nav"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          title="Previous page"
          aria-label="Previous page"
        >
          <ChevronLeft size={15} />
          <span className="btn-page-nav-text">Prev</span>
        </button>

        <div className="page-numbers">
          {getPageList().map((p, i) => {
            if (p === '...') {
              return (
                <span key={`dots-${i}`} className="page-ellipsis">
                  &hellip;
                </span>
              );
            }
            return (
              <button
                key={`page-btn-${p}`}
                type="button"
                className={`btn-page-number ${currentPage === p ? 'active' : ''}`}
                onClick={() => onPageChange(p)}
              >
                {p}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className="btn-page-nav"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          title="Next page"
          aria-label="Next page"
        >
          <span className="btn-page-nav-text">Next</span>
          <ChevronRight size={15} />
        </button>

        <button
          type="button"
          className="btn-page-nav"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages || totalPages === 0}
          title="Last page"
          aria-label="Last page"
        >
          <ChevronsRight size={15} />
        </button>
      </div>
    </div>
  );
}
