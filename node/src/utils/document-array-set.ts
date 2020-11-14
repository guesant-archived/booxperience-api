import { Document } from "mongoose";

export const documentArraySet = <T extends Document>() => <P extends keyof T>(
  prop: P,
) =>
  function (this: T, arr: any[]) {
    this[prop] = Array.from(new Set(arr)) as any;
  };
