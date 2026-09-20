import { useState, useRef } from 'react';
import { UploadCloud, FileSpreadsheet } from 'lucide-react';

export default function FileUpload({ onFileSelect, onError, disabled }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Validate .csv extension before passing up
  const processFile = (file) => {
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.csv')) {
      if (onError) {
        onError('Please upload a CSV file.');
      }
      return;
    }

    if (onFileSelect) {
      onFileSelect(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (disabled) return;

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles && droppedFiles.length > 0) {
      processFile(droppedFiles[0]);
    }
  };

  const handleFileInputChange = (e) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      processFile(selectedFiles[0]);
    }
    // Clear input value so same file can be selected again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Helper to load sample dataset from public folder
  const handleLoadSample = async () => {
    try {
      const response = await fetch('/sample_students.csv');
      const csvText = await response.text();
      const sampleBlob = new Blob([csvText], { type: 'text/csv' });
      const sampleFile = new File([sampleBlob], 'students.csv', { type: 'text/csv' });
      processFile(sampleFile);
    } catch {
      if (onError) {
        onError('Failed to load sample dataset.');
      }
    }
  };

  return (
    <div className="upload-container">
      <div
        className={`dropzone ${isDragging ? 'drag-active' : ''} ${disabled ? 'disabled' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current && fileInputRef.current.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            !disabled && fileInputRef.current && fileInputRef.current.click();
          }
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,text/csv"
          onChange={handleFileInputChange}
          style={{ display: 'none' }}
          disabled={disabled}
        />

        <div className="dropzone-content">
          <div className="upload-icon-wrapper">
            <UploadCloud className="upload-icon" size={44} />
          </div>
          <h3 className="upload-title">Upload CSV File</h3>
          <p className="upload-subtitle">
            Drag & drop your CSV here, or <span className="browse-link">browse</span> from computer
          </p>
          <div className="upload-badge-wrapper">
            <span className="file-format-badge">.csv files only</span>
          </div>
        </div>
      </div>

      <div className="sample-data-prompt">
        <span>Need sample data?</span>
        <button
          type="button"
          className="btn-sample"
          onClick={handleLoadSample}
          disabled={disabled}
        >
          <FileSpreadsheet size={15} />
          Load Sample Dataset (students.csv)
        </button>
      </div>
    </div>
  );
}
