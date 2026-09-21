# 📊 DataViewX

<p align="center">
  <a href="https://data-grid-x.vercel.app/">
    <img src="https://img.shields.io/badge/🚀_Live_Demo-data--grid--x.vercel.app-4f46e5?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
  </a>
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-6.1-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite 6" />
  <img src="https://img.shields.io/badge/Recharts-3.10-22c55e?style=for-the-badge&logo=chartdotjs&logoColor=white" alt="Recharts" />
  <img src="https://img.shields.io/badge/License-MIT-f59e0b?style=for-the-badge" alt="MIT License" />
</p>

<p align="center">
  <b>Modern In-Browser CSV Analytics, Multi-Column Data Grid & Real-Time Visualization Dashboard</b><br />
  <i>100% Client-Side • Zero Backend • Complete Data Privacy • Sub-Millisecond Speed</i>
</p>

<p align="center">
  <a href="https://data-grid-x.vercel.app/"><strong>🌐 Open Live Demo on Vercel »</strong></a>
</p>

---

## 🌟 Overview

**DataViewX** is a fast, responsive, and privacy-first CSV data analysis and visualization tool built with **React 19** and **Vite**. 

Unlike conventional tools that upload sensitive spreadsheets to external servers, **DataViewX processes 100% of your data client-side in the browser**. Your files never leave your device.

Whether you are exploring sales figures, student records, logs, or sensor metrics, DataViewX provides instant multi-column filtering, numeric sorting, real-time KPI metrics, dynamic chart generation (Bar, Area, Donut), and filtered CSV export.

---

## 🚀 Live Demo

Experience DataViewX directly in your browser:

👉 **[https://data-grid-x.vercel.app/](https://data-grid-x.vercel.app/)**

*No installation, registration, or setup required. Drop any `.csv` or click **"Load Sample Dataset"** to start exploring.*

---

## 📸 Interface Preview

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ 📊 DATAVIEWX                              [ ☀️ Light ]  [ 📄 Grid ] [ 📊 Charts ] │
├─────────────────────────────────────────────────────────────────────────────┤
│ 📁 students.csv   •   500 records   •   6 columns   •   [ 💾 Export CSV ]        │
├─────────────────────────────────────────────────────────────────────────────┤
│ 🔍 Filters [Clear]                                                          │
│ Name: [___________]   City: [Delhi______]   Course: [CSE________]           │
├─────────────────────────────────────────────────────────────────────────────┤
│  #  │ Name      │ Age (↑) │ City      │ Course    │ Score   │ Date          │
├─────┼───────────┼─────────┼───────────┼───────────┼─────────┼───────────────┤
│  1  │ Aman      │ 21      │ Delhi     │ CSE       │ 88      │ 2023-08-15    │
│  2  │ Avanish   │ 21      │ Delhi     │ CSE       │ 92      │ 2023-08-15    │
│  3  │ Karan     │ 23      │ Delhi     │ CSE       │ 76      │ 2023-08-23    │
├─────────────────────────────────────────────────────────────────────────────┤
│ Showing 1–3 of 3 matching records (filtered from 500 total)  •  Rows: [25 ▼]│
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## ✨ Key Features

- 🔒 **100% Private & Client-Side:** All parsing, filtering, aggregation, and rendering run locally using Web APIs. Zero network requests with your data.
- 📁 **Drag & Drop Upload:** Drop any `.csv` file or click to browse. Includes built-in file validation and instant sample dataset loader.
- 🧠 **Smart Schema Discovery:** Automatically extracts headers and classifies columns as **Numeric**, **Categorical**, or **Date**.
- 🎯 **Multi-Column AND Filtering:** Filter across multiple columns at the same time with case-insensitive sub-string matching.
- 🔎 **Global Search:** Search through all columns simultaneously from a single unified input.
- 🔢 **Numeric-Aware Sorting:** Click headers to cycle through Ascending $\rightarrow$ Descending $\rightarrow$ Default. Correctly handles numbers (`20` < `100`).
- 📊 **Interactive Recharts Dashboard:**
  - **Bar Charts:** Compare metrics across categories.
  - **Area Trend Charts:** Visualize temporal or sequential data progression.
  - **Donut / Pie Charts:** Inspect categorical distributions and market shares.
  - **Dynamic Axes & Modes:** Switch X-axis, Y-axis, and calculation modes (Average, Sum, Count) on the fly.
- 📈 **Real-Time KPI Metric Cards:** Instant cards for Total Records, Primary Average, Min / Max range, Dominant Category, and Data Completeness.
- 📄 **Configurable Pagination:** Select rows per page (`10`, `25`, `50`, `100`), jump between pages, and monitor live row counters.
- 💾 **Filtered CSV Export:** Export the actively filtered/sorted dataset back to a clean `.csv` file via HTML5 Blob API.
- 🌓 **Theme Switcher:** Seamless Dark & Light mode toggle with `localStorage` memory and OS system preference detection.

---

## 🏗️ Architecture & Data Flow

```text
                     [ User Drops CSV File ]
                                │
                                ▼
                    [ HTML5 File & FileReader ]
                                │
                                ▼
                   [ Papa Parse Client Engine ]
                                │
                                ▼
                  State Store (App.jsx Container)
                                │
        ┌───────────────────────┴───────────────────────┐
        ▼                                               ▼
 1. Multi-Filter Engine                         2. Sorting Engine
 • Multi-column AND logic                       • Number() numeric detection
 • Case-insensitive sub-string                  • localeCompare string fallback
 • useMemo optimization                         • 3-state toggle (asc/desc/none)
        │                                               │
        └───────────────────────┬───────────────────────┘
                                │
                                ▼
                    3. Pagination & Slicing
                    • (page - 1) * rowsPerPage
                    • Auto-resets on filter change
                                │
                ┌───────────────┴───────────────┐
                ▼                               ▼
      [ 📄 Data Grid View ]           [ 📊 Visual Analytics ]
      • Responsive scroll wrapper     • Dynamic Recharts builder
      • Sort indicators & badges      • KPI metric summary cards
      • Empty & error states          • Real-time reactive sync
```

---

## 📁 Repository Structure

```text
task_internship/
│
├── 📊 DataViewX/                    # Advanced Flagship Edition (Recharts + Dark Mode)
│   ├── public/
│   │   └── sample_students.csv     # Bundled dataset for instant preview
│   ├── src/
│   │   ├── components/
│   │   │   ├── AnalyticsDashboard.jsx  # Interactive Recharts visualizer (Bar, Area, Donut)
│   │   │   ├── MetricCards.jsx         # Summary KPI cards (Avg, Min, Max, Completeness)
│   │   │   ├── DataTable.jsx           # Dynamic sortable table grid
│   │   │   ├── FileUpload.jsx          # Drag & drop upload & validation
│   │   │   ├── FilterPanel.jsx         # Dynamic column filters & global search
│   │   │   ├── Pagination.jsx          # Rows per page selector & navigation
│   │   │   └── Toolbar.jsx             # File metadata & view switcher tabs
│   │   ├── utils/
│   │   │   └── dataAnalyzer.js         # Type discovery & statistical aggregations
│   │   ├── App.jsx                     # Core state & data flow orchestrator
│   │   ├── App.css                     # Complete light/dark design system
│   │   ├── index.css                   # Global CSS resets
│   │   └── main.jsx                    # React entry point
│   ├── package.json
│   ├── index.html
│   └── README.md
│
└── 🟢 csv-data-viewer-basic/       # Clean Baseline Edition (Minimal MVP)
    ├── src/
    │   ├── components/
    │   │   ├── FileUpload.jsx
    │   │   ├── Toolbar.jsx
    │   │   ├── FilterPanel.jsx
    │   │   ├── DataTable.jsx
    │   │   └── Pagination.jsx
    │   ├── App.jsx
    │   └── App.css
    ├── package.json
    └── README.md
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Component-based UI with modern hooks (`useState`, `useMemo`, `useRef`, `useEffect`) |
| **Vite 6** | Lightning-fast development server and optimized rollup production bundling |
| **Papa Parse** | High-performance in-browser CSV parsing, schema extraction, and serialization |
| **Recharts** | Composable, responsive SVG charts (Bar, Area, Pie/Donut) |
| **Lucide React** | Modern, accessible iconography |
| **CSS3 Design System** | Custom CSS variables, CSS Grid, Flexbox, and responsive dark/light themes |

---

## 🚀 Local Development Setup

### 1. Clone the repository
```bash
git clone https://github.com/AvanishSingh09/DataGridX.git
cd DataGridX
```

### 2. Run DataViewX (Advanced Flagship)
```bash
cd DataViewX
npm install
npm run dev
```
Open **`http://localhost:5173`** in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## 🧪 Testing Checklist & Verification

You can test all capabilities using the bundled sample data:

```csv
Name,Age,City,Course,Score,Enrollment Date
Avanish,21,Delhi,CSE,92,2023-08-15
Rahul,22,Noida,IT,85,2023-08-16
Aman,21,Delhi,CSE,88,2023-08-15
Priya,20,Gurgaon,ECE,95,2023-08-18
Rohan,23,Noida,CSE,78,2023-08-19
```

- [x] **Upload Test:** Drop a CSV or click **"Load Sample Dataset"** $\rightarrow$ verifies column detection and row rendering.
- [x] **Filter Test:** Type `Delhi` in City and `CSE` in Course $\rightarrow$ table displays only matching rows (AND logic).
- [x] **Case-Insensitive Test:** Type `delhi` or `DELHI` $\rightarrow$ verifies case-insensitivity.
- [x] **Sorting Test:** Click **Age** header $\rightarrow$ sorts numerically (`20`, `21`, `22`, `23`).
- [x] **Visual Analytics Test:** Switch to **Visual Analytics** tab $\rightarrow$ inspect charts, KPI metric cards, and category breakdown.
- [x] **Dynamic Axis Test:** Change Group By to `Course` and Value to `Score` $\rightarrow$ chart plots average score per course.
- [x] **Theme Switcher Test:** Click the Sun/Moon button $\rightarrow$ verifies instant dark/light mode toggle with stored preference.
- [x] **Export Test:** Click **"Export Filtered CSV"** $\rightarrow$ downloads only active filtered rows.
- [x] **Error Handling Test:** Try uploading a `.txt` file $\rightarrow$ prompts `"Please upload a CSV file."`.

---

## 📄 License

This project is open-source and licensed under the **MIT License**.

---

<p align="center">
  <sub>Developed by <b>Avanish Singh</b> • <a href="https://data-grid-x.vercel.app/">Live Demo</a></sub>
</p>
