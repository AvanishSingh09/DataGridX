/**
 * Safely parse a value into a Date object, or null if not a valid date
 */
export function parseDateValue(val) {
  if (val === undefined || val === null || String(val).trim() === '') {
    return null;
  }

  // If already a Date object
  if (val instanceof Date && !isNaN(val.getTime())) {
    return val;
  }

  const str = String(val).trim();

  // Try standard ISO / standard Date string parsing
  const timestamp = Date.parse(str);
  if (!isNaN(timestamp)) {
    const d = new Date(timestamp);
    // Sanity check for reasonable year range
    if (d.getFullYear() >= 1900 && d.getFullYear() <= 2100) {
      return d;
    }
  }

  // Handle DD-MM-YYYY or DD/MM/YYYY
  const dmyMatch = str.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})(.*)$/);
  if (dmyMatch) {
    const day = parseInt(dmyMatch[1], 10);
    const month = parseInt(dmyMatch[2], 10) - 1;
    const year = parseInt(dmyMatch[3], 10);
    const date = new Date(year, month, day);
    if (!isNaN(date.getTime()) && date.getDate() === day) {
      return date;
    }
  }

  // Handle YYYY-MM-DD or YYYY/MM/DD
  const ymdMatch = str.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})(.*)$/);
  if (ymdMatch) {
    const year = parseInt(ymdMatch[1], 10);
    const month = parseInt(ymdMatch[2], 10) - 1;
    const day = parseInt(ymdMatch[3], 10);
    const date = new Date(year, month, day);
    if (!isNaN(date.getTime()) && date.getDate() === day) {
      return date;
    }
  }

  return null;
}

/**
 * Get min and max date bounds from a date column
 */
export function getDateColumnBounds(data, column) {
  if (!data || data.length === 0 || !column) return null;
  let minDate = null;
  let maxDate = null;

  data.forEach((row) => {
    const d = parseDateValue(row[column]);
    if (d) {
      if (!minDate || d < minDate) minDate = d;
      if (!maxDate || d > maxDate) maxDate = d;
    }
  });

  if (!minDate || !maxDate) return null;

  const formatYMD = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  return {
    minDateStr: formatYMD(minDate),
    maxDateStr: formatYMD(maxDate),
    minDate,
    maxDate
  };
}

/**
 * Detect column data type (numeric, date, or categorical)
 */
export function detectColumnTypes(data, columns) {
  const types = {};

  if (!data || data.length === 0 || !columns || columns.length === 0) {
    return types;
  }

  // Sample up to 50 rows for performance
  const sampleSize = Math.min(data.length, 50);
  const sampleData = data.slice(0, sampleSize);

  columns.forEach((column) => {
    let numericCount = 0;
    let dateCount = 0;
    let filledCount = 0;

    sampleData.forEach((row) => {
      const val = row[column];
      if (val !== undefined && val !== null && String(val).trim() !== '') {
        filledCount++;
        const str = String(val).trim();
        const num = Number(str);

        // Check if date-like first (to avoid pure numeric timestamps or dates matching numbers)
        const parsedDate = parseDateValue(str);
        if (
          parsedDate &&
          (str.includes('-') || str.includes('/') || str.includes('T') || isNaN(num)) &&
          str.length >= 8
        ) {
          dateCount++;
        }
        // Check if valid number
        else if (!isNaN(num) && str !== '') {
          numericCount++;
        }
      }
    });

    if (filledCount === 0) {
      types[column] = 'categorical';
    } else if (dateCount / filledCount >= 0.7) {
      types[column] = 'date';
    } else if (numericCount / filledCount >= 0.8) {
      types[column] = 'numeric';
    } else {
      types[column] = 'categorical';
    }
  });

  return types;
}

/**
 * Get category frequency distribution (top N categories with count)
 */
export function getCategoryCounts(data, column, maxItems = 8) {
  if (!data || data.length === 0 || !column) return [];

  const counts = {};
  data.forEach((row) => {
    const rawVal = row[column];
    const key =
      rawVal === undefined || rawVal === null || String(rawVal).trim() === ''
        ? '(Empty)'
        : String(rawVal).trim();

    counts[key] = (counts[key] || 0) + 1;
  });

  const sorted = Object.entries(counts)
    .map(([name, count]) => ({
      name,
      count,
      percentage: ((count / data.length) * 100).toFixed(1)
    }))
    .sort((a, b) => b.count - a.count);

  if (sorted.length <= maxItems) {
    return sorted;
  }

  // Group remainder into 'Other'
  const topItems = sorted.slice(0, maxItems);
  const otherCount = sorted
    .slice(maxItems)
    .reduce((sum, item) => sum + item.count, 0);

  topItems.push({
    name: 'Other',
    count: otherCount,
    percentage: ((otherCount / data.length) * 100).toFixed(1)
  });

  return topItems;
}

/**
 * Group numeric metrics by category column (e.g. Average Score by Course)
 */
export function getGroupedMetrics(data, categoryCol, numericCol, metric = 'avg') {
  if (!data || data.length === 0 || !categoryCol || !numericCol) return [];

  const groups = {};

  data.forEach((row) => {
    const rawCat = row[categoryCol];
    const cat =
      rawCat === undefined || rawCat === null || String(rawCat).trim() === ''
        ? '(Empty)'
        : String(rawCat).trim();

    const rawNum = row[numericCol];
    const num = Number(rawNum);

    if (!isNaN(num) && String(rawNum).trim() !== '') {
      if (!groups[cat]) {
        groups[cat] = { sum: 0, count: 0, values: [] };
      }
      groups[cat].sum += num;
      groups[cat].count += 1;
      groups[cat].values.push(num);
    }
  });

  return Object.entries(groups).map(([name, stat]) => {
    const value =
      metric === 'avg'
        ? Number((stat.sum / stat.count).toFixed(1))
        : metric === 'sum'
        ? stat.sum
        : stat.count;

    return {
      name,
      value,
      count: stat.count
    };
  });
}

/**
 * Get summary stats for a numeric column (min, max, average, sum, median)
 */
export function getNumericStats(data, column) {
  if (!data || data.length === 0 || !column) {
    return { min: 0, max: 0, avg: 0, sum: 0, count: 0 };
  }

  const values = [];
  let sum = 0;

  data.forEach((row) => {
    const raw = row[column];
    const num = Number(raw);
    if (!isNaN(num) && raw !== undefined && raw !== null && String(raw).trim() !== '') {
      values.push(num);
      sum += num;
    }
  });

  if (values.length === 0) {
    return { min: 0, max: 0, avg: 0, sum: 0, count: 0 };
  }

  values.sort((a, b) => a - b);
  const min = values[0];
  const max = values[values.length - 1];
  const avg = Number((sum / values.length).toFixed(1));
  const mid = Math.floor(values.length / 2);
  const median =
    values.length % 2 !== 0
      ? values[mid]
      : Number(((values[mid - 1] + values[mid]) / 2).toFixed(1));

  return { min, max, avg, sum, median, count: values.length };
}
