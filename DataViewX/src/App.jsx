import { useState, useMemo } from 'react';
import Papa from 'papaparse';
import { Table, AlertCircle, Loader2 } from 'lucide-react';
import FileUpload from './components/FileUpload';
import Toolbar from './components/Toolbar';
import FilterPanel from './components/FilterPanel';
import DataTable from './components/DataTable';
import Pagination from './components/Pagination';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import './App.css';

export default function App() {
  // Main application state
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [filters, setFilters] = useState({});
  const [globalSearch, setGlobalSearch] = useState('');
  const [sortConfig, setSortConfig] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeView, setActiveView] = useState('table'); // 'table' | 'analytics'

  // Handle uploaded or selected CSV file
  const handleFile = (file) => {
    if (!file) return;

    // Check extension
    if (!file.name.toLowerCase().endsWith('.csv')) {
      setError('Please upload a CSV file.');
      return;
    }

    setError('');
    setLoading(true);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setLoading(false);

        if (!results.data || results.data.length === 0) {
          setError('The CSV file does not contain any data.');
          return;
        }

        // Get detected columns from the first record
        const firstRow = results.data[0];
        const detectedColumns = Object.keys(firstRow).filter(
          (col) => col && col.trim().length > 0
        );

        if (detectedColumns.length === 0) {
          setError('Could not detect valid column headers in the CSV file.');
          return;
        }

        setData(results.data);
        setColumns(detectedColumns);
        setFileName(file.name);
        setFilters({});
        setGlobalSearch('');
        setSortConfig(null);
        setCurrentPage(1);
        setActiveView('table');
        setError('');
      },
      error: (err) => {
        setLoading(false);
        setError(`Could not parse the CSV file: ${err.message || 'Unknown error'}`);
      }
    });
  };

  // Update specific column filter
  const handleFilterChange = (column, value) => {
    setFilters((prev) => ({
      ...prev,
      [column]: value
    }));
    setCurrentPage(1); // Always reset page when filters change
  };

  // Update global search
  const handleGlobalSearchChange = (value) => {
    setGlobalSearch(value);
    setCurrentPage(1);
  };

  // Reset all filters
  const handleClearFilters = () => {
    setFilters({});
    setGlobalSearch('');
    setCurrentPage(1);
  };

  // Handle column header clicks for sorting (asc -> desc -> none)
  const handleSort = (column) => {
    setSortConfig((prev) => {
      if (!prev || prev.key !== column) {
        return { key: column, direction: 'asc' };
      }
      if (prev.direction === 'asc') {
        return { key: column, direction: 'desc' };
      }
      return null;
    });
  };

  // Filter dataset (AND logic across all column filters + global search)
  const filteredData = useMemo(() => {
    return data.filter((row) => {
      // Check column filters
      const matchesColumnFilters = columns.every((column) => {
        const filterVal = filters[column];
        if (!filterVal || filterVal.trim() === '') {
          return true;
        }
        const cellVal = row[column];
        if (cellVal === undefined || cellVal === null) {
          return false;
        }
        return String(cellVal)
          .toLowerCase()
          .includes(filterVal.trim().toLowerCase());
      });

      if (!matchesColumnFilters) return false;

      // Check global search keyword
      if (globalSearch && globalSearch.trim() !== '') {
        const keyword = globalSearch.trim().toLowerCase();
        const matchesGlobal = columns.some((column) => {
          const cellVal = row[column];
          if (cellVal === undefined || cellVal === null) return false;
          return String(cellVal).toLowerCase().includes(keyword);
        });
        if (!matchesGlobal) return false;
      }

      return true;
    });
  }, [data, columns, filters, globalSearch]);

  // Sort dataset (handles numeric vs string values properly)
  const sortedData = useMemo(() => {
    if (!sortConfig || !sortConfig.key) {
      return filteredData;
    }

    const { key, direction } = sortConfig;
    const factor = direction === 'asc' ? 1 : -1;

    return [...filteredData].sort((a, b) => {
      const valA = a[key];
      const valB = b[key];

      const isEmptyA = valA === undefined || valA === null || valA === '';
      const isEmptyB = valB === undefined || valB === null || valB === '';

      if (isEmptyA && isEmptyB) return 0;
      if (isEmptyA) return 1;
      if (isEmptyB) return -1;

      const strA = String(valA).trim();
      const strB = String(valB).trim();
      const numA = Number(strA);
      const numB = Number(strB);

      // If both values are valid numbers, compare numerically
      if (!isNaN(numA) && !isNaN(numB) && strA !== '' && strB !== '') {
        return (numA - numB) * factor;
      }

      // Default string comparison with numeric collation
      return strA.localeCompare(strB, undefined, { numeric: true, sensitivity: 'base' }) * factor;
    });
  }, [filteredData, sortConfig]);

  // Pagination calculations
  const totalPages = Math.ceil(sortedData.length / rowsPerPage) || 1;
  const safeCurrentPage = Math.min(Math.max(currentPage, 1), totalPages);
  const startIndex = (safeCurrentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, sortedData.length);
  const pageData = sortedData.slice(startIndex, endIndex);

  // Change rows per page
  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);
  };

  // Export filtered rows back to a CSV file
  const handleExport = () => {
    if (sortedData.length === 0) return;

    try {
      const csvContent = Papa.unparse(sortedData);
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');

      const nameWithoutExt = fileName ? fileName.replace(/\.[^/.]+$/, '') : 'dataset';
      link.setAttribute('href', downloadUrl);
      link.setAttribute('download', `${nameWithoutExt}_filtered.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      setError(`Failed to export CSV: ${err.message || 'Unknown error'}`);
    }
  };

  // Reset to initial upload state
  const handleReset = () => {
    setData([]);
    setColumns([]);
    setFilters({});
    setGlobalSearch('');
    setSortConfig(null);
    setCurrentPage(1);
    setFileName('');
    setActiveView('table');
    setError('');
  };

  const hasActiveFilters =
    Object.values(filters).some((v) => v && v.trim() !== '') ||
    (globalSearch && globalSearch.trim() !== '');

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-brand">
          <div className="brand-icon-wrapper">
            <Table size={26} className="brand-icon" />
          </div>
          <div className="brand-text">
            <h1 className="app-title">DATAVIEWX</h1>
            <p className="app-subtitle">Fast in-browser CSV analytics, dynamic charts & data grid</p>
          </div>
        </div>
      </header>

      <main className="app-main">
        {/* Error message */}
        {error && (
          <div className="error-banner" role="alert">
            <AlertCircle size={18} className="error-icon" />
            <span className="error-text">{error}</span>
            <button
              type="button"
              className="error-dismiss"
              onClick={() => setError('')}
              aria-label="Dismiss error"
            >
              &times;
            </button>
          </div>
        )}

        {/* Loading indicator */}
        {loading && (
          <div className="loading-card">
            <Loader2 className="spinner-icon" size={34} />
            <p className="loading-text">Reading CSV...</p>
          </div>
        )}

        {/* Upload screen */}
        {!loading && data.length === 0 && (
          <section className="section-upload">
            <FileUpload
              onFileSelect={handleFile}
              onError={(msg) => setError(msg)}
              disabled={loading}
            />
          </section>
        )}

        {/* Data table / analytics view */}
        {!loading && data.length > 0 && (
          <div className="data-view-container">
            <Toolbar
              fileName={fileName}
              totalRecords={data.length}
              totalColumns={columns.length}
              filteredRecords={sortedData.length}
              activeView={activeView}
              onViewChange={setActiveView}
              onExport={handleExport}
              onReset={handleReset}
            />

            <FilterPanel
              columns={columns}
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              globalSearch={globalSearch}
              onGlobalSearchChange={handleGlobalSearchChange}
            />

            {/* View Switcher: Table View vs Visual Analytics */}
            {activeView === 'table' ? (
              <>
                <DataTable
                  columns={columns}
                  data={pageData}
                  sortConfig={sortConfig}
                  onSort={handleSort}
                  startIndex={startIndex}
                  hasFilters={hasActiveFilters}
                  onClearFilters={handleClearFilters}
                />

                <Pagination
                  currentPage={safeCurrentPage}
                  totalPages={totalPages}
                  rowsPerPage={rowsPerPage}
                  totalRecords={data.length}
                  filteredRecordsCount={sortedData.length}
                  onPageChange={(p) => setCurrentPage(p)}
                  onRowsPerPageChange={handleRowsPerPageChange}
                />
              </>
            ) : (
              <AnalyticsDashboard
                data={sortedData}
                totalRawCount={data.length}
                columns={columns}
              />
            )}
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>DataViewX &bull; Fast in-browser CSV analytics & data explorer</p>
      </footer>
    </div>
  );
}
