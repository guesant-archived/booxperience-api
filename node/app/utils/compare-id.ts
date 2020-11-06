export const getIDFrom = (x: any) =>
  typeof x === "string"
    ? x
    : typeof x._id !== "undefined"
    ? String(x._id)
    : String(x);
