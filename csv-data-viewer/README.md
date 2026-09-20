# CSV Data Viewer

A React web application built with Vite and Papa Parse to view, filter, sort, paginate, and export CSV files directly in the browser with no backend required.

---

## Features

- **Drag & Drop / File Upload**: Upload CSV files easily via drag-and-drop or file picker with `.csv` validation.
- **Client-Side Parsing**: Reads and parses CSV files locally in the browser using Papa Parse.
- **Automatic Column Detection**: Dynamically inspects CSV headers and adjusts table columns automatically.
- **Multi-Column Filtering**: Filter rows across multiple columns simultaneously with case-insensitive `AND` logic.
- **Global Search**: Search across all columns from a single search box.
- **Sortable Columns**: Click table headers to sort ascending/descending, with automatic detection of numeric vs string columns.
- **Pagination**: Paginate data with configurable rows per page (10, 25, 50, 100) and previous/next navigation.
- **CSV Export**: Export the active filtered and sorted dataset back to a downloadable `.csv` file.
- **Error & Empty State Handling**: User-friendly alerts for non-CSV files, empty datasets, parsing issues, and zero matching filter results.
- **Responsive Layout**: Designed with clean CSS, including horizontal scroll for wide tables and mobile-friendly stacking.

---

## Project Structure

```
csv-data-viewer/
│
├── public/
│   └── sample_students.csv     # Sample dataset for instant testing
│
├── src/
│   ├── components/
│   │   ├── FileUpload.jsx      # Handles drag & drop, file selection, and extension validation
│   │   ├── Toolbar.jsx         # Shows file info, record counts, and export button
│   │   ├── FilterPanel.jsx     # Dynamic inputs for column filters and global search
│   │   ├── DataTable.jsx       # Dynamic table with sortable column headers
│   │   └── Pagination.jsx      # Rows per page selector and page navigation
│   │
│   ├── App.jsx                 # Main component managing state, parsing, and data flow
│   ├── App.css                 # Component and layout styling
│   ├── index.css               # Global CSS resets
│   └── main.jsx                # React root render
│
├── package.json
├── index.html
└── README.md
```

---

## Tech Stack

- **React** (v19)
- **Vite**
- **Papa Parse** (for CSV parsing & unparsing)
- **Lucide React** (icons)
- **CSS3** (Flexbox, Grid, CSS Variables)

---

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Locally

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

### 3. Build for Production

```bash
npm run build
```

---

## How to Test

You can test the application using the included sample file or any custom `.csv` file:

1. **Upload**: Drag and drop a CSV file (e.g. `students.csv`) or click **"Load Sample Dataset"**.
2. **Filter by Column**: Type `Delhi` in the City filter input. Only matching rows will appear.
3. **Multi-Column Filter**: Keep `City = Delhi` and enter `Course = CSE`. The table displays only rows matching both conditions.
4. **Case Insensitive**: Try typing `delhi` or `DELHI` — filtering works regardless of letter case.
5. **Clear Filters**: Click **"Clear Filters"** to restore all records.
6. **Sorting**: Click the **Age** header once to sort ascending (20, 21, 22...), click again for descending.
7. **Pagination**: Change rows per page (e.g. from 25 to 10) and navigate between pages.
8. **Export**: Click **"Export Filtered CSV"** to download only the currently filtered rows.
9. **Invalid File Test**: Try uploading a `.txt` file to verify the validation message (`Please upload a CSV file.`).
