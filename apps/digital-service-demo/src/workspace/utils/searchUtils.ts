// Sort configuration types for DataTable
export interface SortLevel {
  key: string;
  direction: 'asc' | 'desc';
}

export interface SortConfig {
  primary: SortLevel | null;
  secondary: SortLevel | null;
}

// Compare two values for sorting
const compareValues = <T>(
  a: T,
  b: T,
  key: string,
  direction: 'asc' | 'desc'
): number => {
  const aValue = (a as Record<string, unknown>)[key];
  const bValue = (b as Record<string, unknown>)[key];
  const sortDir = direction === 'asc' ? 1 : -1;

  if (aValue == null && bValue == null) return 0;
  if (aValue == null) return 1;
  if (bValue == null) return -1;

  // Date sorting for specific fields
  if (key === 'submittedAt') {
    const aDate = new Date(aValue as string);
    const bDate = new Date(bValue as string);
    if (!isNaN(aDate.getTime()) && !isNaN(bDate.getTime())) {
      return (aDate.getTime() - bDate.getTime()) * sortDir;
    }
  }

  if (aValue > bValue) return 1 * sortDir;
  if (aValue < bValue) return -1 * sortDir;
  return 0;
};

// Sort data based on primary and optional secondary sort
export const sortData = <T extends Record<string, unknown>>(
  data: T[],
  primaryKey: string | null,
  primaryDirection: 'asc' | 'desc' | 'none',
  secondaryKey?: string | null,
  secondaryDirection?: 'asc' | 'desc'
): T[] => {
  if (primaryDirection === 'none' || !primaryKey) return data;

  return [...data].sort((a: T, b: T) => {
    const primaryCompare = compareValues(a, b, primaryKey, primaryDirection as 'asc' | 'desc');
    if (primaryCompare === 0 && secondaryKey && secondaryDirection) {
      return compareValues(a, b, secondaryKey, secondaryDirection);
    }
    return primaryCompare;
  });
};
