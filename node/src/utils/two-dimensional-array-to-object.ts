export const twoDimensionalArrayToObject = <T extends any = {}>(
  arr: [string, any][],
) => arr.reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}) as T;
