import { ControllerBase } from "@/controllers/ControllerBase";
import { IFunctionQueueFn } from "@/types/IFunctionQueueFn";

export const NeedsAuth = (
  needsAuth: boolean = true,
  reponseData?: any,
  statusCode: number = 401,
): IFunctionQueueFn => {
  return function (this: ControllerBase, _, ...args) {
    if (needsAuth && (!this.auth || !this.auth.isAuthed)) {
      return this.send(statusCode, reponseData);
    }
    return _.call(this, ...args);
  };
};
