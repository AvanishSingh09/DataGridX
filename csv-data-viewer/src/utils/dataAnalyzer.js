/**
 * Utility functions for automatic column type detection and statistical aggregation
 */

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

        // Check if valid number
        if (!isNaN(num) && str !== '') {
          numericCount++;
        }
        // Check if date-like string (e.g. YYYY-MM-DD or parseable date with hyphen/slash)
        else if (
          (str.includes('-') || str.includes('/')) &&
          !isNaN(Date.parse(str)) &&
          str.length >= 8
        ) {
          dateCount++;
        }
      }
    });

    if (filledCount === 0) {
      types[column] = 'categorical';
    } else if (numericCount / filledCount >= 0.8) {
      types[column] = 'numeric';
    } else if (dateCount / filledCount >= 0.8) {
      types[column] = 'date';
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
