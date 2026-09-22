# 📊 DataViewX

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-data--grid--x.vercel.app-4f46e5?style=for-the-badge&logo=vercel&logoColor=white)](https://data-grid-x.vercel.app/)
[![React 19](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Recharts](https://img.shields.io/badge/Recharts-3.10-22c55e?style=for-the-badge&logo=chartdotjs&logoColor=white)](https://recharts.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-f59e0b?style=for-the-badge)](LICENSE)

**Modern In-Browser CSV Analytics, Multi-Column Data Grid & Real-Time Visualization Dashboard**

*100% Client-Side • Zero Backend • Complete Data Privacy • Sub-Millisecond Speed*

🔗 **[Click Here to Open Live Demo (Vercel)](https://data-grid-x.vercel.app/)**

---

## ⚡ Highlights

- 🔒 **100% Client-Side Processing:** All parsing, filtering, sorting, and aggregations run locally in the browser with zero cloud transmission.
- 📁 **Drag & Drop CSV Ingestion:** Instant upload with `.csv` validation and bundled sample dataset loader.
- 🧠 **Dynamic Schema Inference:** Discovers column names and categorizes types into **Numeric**, **Categorical**, or **Date**.
- 🎯 **Multi-Column Filtering & Global Search:** Simultaneous column filters evaluated with case-insensitive `AND` logic.
- 🔢 **Numeric-Aware Sorting:** Intelligently compares numeric strings (`20` < `100`) with text collation fallback.
- 📊 **Interactive Recharts Visualizer:** Auto-generates **Bar Charts**, **Area Trend Charts**, and **Donut / Pie Charts** with customizable X/Y axes and calculation modes (Average, Sum, Count).
- 📈 **Real-Time KPI Metric Cards:** Instant cards for active records, numeric averages, min/max ranges, dominant category, and data completeness.
- 📄 **Configurable Pagination:** Slices data with configurable rows per page (`10`, `25`, `50`, `100`) and result counters.
- 💾 **Filtered CSV Export:** Generates clean browser downloads of the active filtered dataset using the HTML5 Blob API.
- 🌓 **Persistent Dark & Light Mode:** Theme switcher with `localStorage` persistence and system OS detection.

---

## 📁 Project Structure

```text
DataViewX/
│
├── public/
│   └── sample_students.csv     # Bundled dataset for instant testing
│
├── src/
│   ├── components/
│   │   ├── AnalyticsDashboard.jsx  # Interactive Recharts visualizer (Bar, Area, Donut)
│   │   ├── MetricCards.jsx         # Summary KPI cards (Avg, Min, Max, Completeness)
│   │   ├── DataTable.jsx           # Dynamic sortable table grid
│   │   ├── FileUpload.jsx          # Drag & drop upload & validation
│   │   ├── FilterPanel.jsx         # Dynamic column filters & global search
│   │   ├── Pagination.jsx          # Rows per page selector & navigation
│   │   └── Toolbar.jsx             # File metadata & view switcher tabs
│   │
│   ├── utils/
│   │   └── dataAnalyzer.js         # Type discovery & statistical aggregations
│   │
│   ├── App.jsx                     # Main state orchestrator & data flow pipeline
│   ├── App.css                     # Complete light/dark design system
│   ├── index.css                   # Global CSS resets
│   └── main.jsx                    # React root entry
│
├── package.json
├── index.html
└── README.md
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Component-based UI with modern hooks (`useState`, `useMemo`, `useRef`, `useEffect`) |
| **Vite 6** | Ultra-fast build tool and development server with native ESM |
| **Papa Parse** | High-performance CSV parsing & serialization |
| **Recharts** | Interactive SVG Data Visualizations (Bar, Area, Donut) |
| **Lucide React** | Modern, clean UI icons |
| **CSS3** | CSS Variables & Grid with full Dark/Light theme support |

---

## 🏃 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Locally

```bash
npm run dev
```

Open **`http://localhost:5173`** in your browser.

### 3. Build for Production

```bash
npm run build
```

---

## 📄 License

Distributed under the **MIT License**. Free for personal and commercial use.

Developed by **Avanish Singh** • [Live Demo](https://data-grid-x.vercel.app/)
