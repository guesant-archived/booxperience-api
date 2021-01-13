import { ControllerBase } from "@/controllers/ControllerBase";
import { FunctionQueue } from "@/utils/FunctionQueue";

export const indexQueue = new FunctionQueue().next(index).done();

export function index(this: ControllerBase) {
  return this.ok({ api: { info: "v1" } });
}
