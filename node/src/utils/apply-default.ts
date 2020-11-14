export const ApplyDefault = (defaults: boolean) => <T extends any>(
  defaultValue: T,
) => (): T | undefined => (defaults ? defaultValue : undefined);
