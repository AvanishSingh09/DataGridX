# CSV Data Viewer & Visual Analytics Studio

A modern, fast React web application built with Vite, Papa Parse, and Recharts to view, filter, sort, paginate, visually analyze, and export CSV files directly in the browser with no backend required.

---

## Features

- **Drag & Drop / File Upload**: Upload CSV files easily via drag-and-drop or file picker with `.csv` validation.
- **Client-Side Parsing**: Reads and parses CSV files locally in the browser using Papa Parse.
- **Automatic Column & Type Detection**: Dynamically inspects CSV headers and auto-detects Numeric, Date, and Categorical column types.
- **Visual Analytics Dashboard (Recharts)**:
  - **KPI Metric Cards**: Real-time count, primary numeric averages, min/max ranges, dominant categories, and data health scores.
  - **Interactive Chart Visualizer**: Switch between Bar, Area, and Donut/Pie charts with custom X-Axis, Y-Axis, and aggregation calculations (Average, Sum, Count).
  - **Distribution Breakdown**: Visual frequency charts and rank bars that update in real-time as filters change.
- **Multi-Column Filtering**: Filter rows across multiple columns simultaneously with case-insensitive `AND` logic.
- **Global Search**: Search across all columns from a single search box.
- **Sortable Columns**: Click table headers to sort ascending/descending, with automatic detection of numeric vs string columns.
- **Pagination**: Paginate data with configurable rows per page (10, 25, 50, 100) and previous/next navigation.
- **CSV Export**: Export the active filtered and sorted dataset back to a downloadable `.csv` file.
- **Error & Empty State Handling**: User-friendly alerts for non-CSV files, empty datasets, parsing issues, and zero matching filter results.
- **Responsive Layout**: Designed with clean CSS, including horizontal scroll for wide tables, responsive chart grids, and mobile-friendly stacking.

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
│   │   ├── FileUpload.jsx          # Drag & drop, file selection & validation
│   │   ├── Toolbar.jsx             # File stats, View Switcher & export actions
│   │   ├── FilterPanel.jsx         # Dynamic column filters & global search
│   │   ├── DataTable.jsx           # Dynamic sortable table with numeric awareness
│   │   ├── Pagination.jsx          # Rows per page selector & navigation
│   │   ├── MetricCards.jsx         # KPI summary cards (Avg, Min, Max, Completeness)
│   │   └── AnalyticsDashboard.jsx  # Interactive dynamic charts with Recharts
│   │
│   ├── utils/
│   │   └── dataAnalyzer.js         # Column type detection & statistical aggregation
│   │
│   ├── App.jsx                     # Main state orchestrator & data flow pipeline
│   ├── App.css                     # Component & responsive dashboard styling
│   ├── index.css                   # Global CSS resets
│   └── main.jsx                    # React root entry
│
├── package.json
├── index.html
└── README.md
```

---

## Tech Stack

- **React** (v19)
- **Vite**
- **Papa Parse** (CSV parsing & unparsing)
- **Recharts** (Interactive data visualization)
- **Lucide React** (Icons)
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

1. **Upload & Switch Views**:
   - Drag & drop `students.csv` or click **"Load Sample Dataset"**.
   - Use the **[ 📄 Table View ]** and **[ 📊 Visual Analytics ]** buttons in the toolbar to switch views.
2. **Interactive Chart Visualizer**:
   - In **Visual Analytics**, change Group By (X-Axis) between `Course`, `City`, and `Name`.
   - Change Value (Y-Axis) to `Score` and switch calculation between `Average` and `Total Sum`.
   - Toggle chart styles: **Bar**, **Area**, and **Donut**.
3. **Reactive Filter Sync**:
   - Type `Delhi` in the City filter.
   - Switch to **Visual Analytics** $\rightarrow$ charts instantly reflect *only* Delhi records!
4. **Sort, Paginate & Export**:
   - Sort columns, change rows per page, and click **"Export Filtered CSV"** to download the active dataset.
