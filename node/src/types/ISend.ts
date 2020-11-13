export type ISend = (
  statusCode?: number,
  resource?: string | null,
  location?: string,
) => void;
