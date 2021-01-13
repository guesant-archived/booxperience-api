export const sortedSet = <T extends any[]>(arr: T) =>
  Array.from(new Set(arr)).sort();
