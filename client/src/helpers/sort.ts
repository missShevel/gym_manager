export type Order = 'asc' | 'desc';

export const getMultiplier = (orderBy: Order) => (orderBy === 'asc' ? 1 : -1);

// Sort objects by string field
export function sortByString<T>(arr: T[], orderBy: Order, key: string): T[] {
  const multiplier = getMultiplier(orderBy);

  return [...arr].sort((a, b) => multiplier * a[key].localeCompare(b[key]));
}

export function sortByNumber<T>(arr: T[], orderBy: Order, key: string): T[] {
  const multiplier = getMultiplier(orderBy);

  return [...arr].sort((a, b) => multiplier * a[key] - b[key]);
}
