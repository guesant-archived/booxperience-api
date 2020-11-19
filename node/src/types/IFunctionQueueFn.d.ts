import { IFunctionQueueRunNext } from "./IFunctionQueueRunNext";

export type IFunctionQueueFn = (
  runNext: IFunctionQueueRunNext,
  ...args: any
) => any;
