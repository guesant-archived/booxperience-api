import { ControllerBase } from "@/controllers/ControllerBase";
import { rbac } from "@/security/RBACAuthorization";
import { IFunctionQueueFn } from "@/types/IFunctionQueueFn";
import { IGrantsCtx } from "@/types/IGrantsCtx";

export function AccessLevel(
  controller: string,
  action: string,
  context: IGrantsCtx = { progress: "act-request" },
): IFunctionQueueFn {
  return function (this: ControllerBase, _, ...args) {
    try {
      const hasAccess = rbac.hasAccess(
        this.auth.user.role,
        controller,
        action,
        context,
      );
      if (!hasAccess) throw "UNAUTHORIZED";
      return _.call(this, ...args);
    } catch (_) {}
    return this.send(401);
  };
}
