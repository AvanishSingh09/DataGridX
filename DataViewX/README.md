# DataViewX 📊

[![Live Demo](https://img.shields.io/badge/Live_Demo-data--grid--x.vercel.app-4f46e5?style=for-the-badge&logo=vercel&logoColor=white)](https://data-grid-x.vercel.app/)
[![React 19](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite 6](https://img.shields.io/badge/Vite-6.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Recharts](https://img.shields.io/badge/Recharts-3.10-22c55e?style=for-the-badge&logo=chartdotjs&logoColor=white)](https://recharts.org/)

> **A high-performance in-browser CSV data workbench, dynamic chart visualizer, and grid analytics suite built with React, Vite, Papa Parse, and Recharts.**

---

## 🌐 Live Application

🚀 **Live Deployment:** **[https://data-grid-x.vercel.app/](https://data-grid-x.vercel.app/)**

---

## 🚀 Key Features

- **📁 Drag & Drop / File Upload**: Upload CSV files effortlessly with `.csv` extension validation.
- **⚡ Client-Side Processing**: 100% in-browser processing via Papa Parse with zero backend overhead.
- **🔍 Auto-Detection of Columns & Types**: Dynamically discovers headers and automatically classifies columns into **Numeric**, **Categorical**, or **Date**.
- **📊 Interactive Visual Analytics (Recharts)**:
  - **KPI Metric Cards**: Real-time record counts, primary numeric averages, min/max metrics, dominant categories, and data health scores.
  - **Dynamic Chart Builder**: Switch between **Bar**, **Area**, and **Donut/Pie** charts with custom X-Axis, Y-Axis, and calculations (**Average**, **Total Sum**, **Count**).
  - **Distribution Breakdown**: Real-time category share rankings and distribution donut charts.
- **🎯 Multi-Column Filtering & Global Search**: Filter multiple columns simultaneously with case-insensitive `AND` logic and quick search across all columns.
- **🔢 Numeric & String Sorting**: Click column headers to toggle ascending/descending with intelligent numeric vs text collation.
- **📄 Pagination**: Configurable rows per page (`10`, `25`, `50`, `100`), boundary-disabled controls, and result counters.
- **💾 Filtered CSV Export**: Download the active filtered/sorted dataset directly back to a CSV file.
- **🌓 Dark & Light Theme Modes**: Persistent theme switching saved in `localStorage` with system preference detection.
- **📱 Responsive Design**: Modern UI with horizontal scroll for wide tables and mobile-friendly stacking.

---

## 📁 Project Structure

```
DataViewX/
│
├── public/
│   └── sample_students.csv     # Sample dataset for instant testing
│
├── src/
│   ├── components/
│   │   ├── FileUpload.jsx          # Drag & drop upload & validation
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

## 🛠️ Tech Stack

- **React** (v19)
- **Vite**
- **Papa Parse** (CSV parsing & unparsing)
- **Recharts** (Interactive data visualization)
- **Lucide React** (Icons)
- **CSS3** (Flexbox, Grid, CSS Variables)

---

## 🏃 Getting Started

### 1. Install Dependencies
```bash
cd DataViewX
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
