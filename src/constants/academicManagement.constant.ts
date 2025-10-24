const year = new Date().getFullYear();

// Generate year filter options programmatically. Change `count` to include
// more or fewer years in the filters.
export const yearFilters = Array.from({ length: 3 }, (_, i) => ({
  text: `${year + i}`,
  value: `${year + i}`,
}));
