import { RBACAuthorization } from "@/security/RBACAuthorization";
import { IGrants } from "@/types/IGrants";
import { AccessControl } from "role-acl";

const getActCtx = (act: any) => {
  if (typeof act === "string") {
    return [act, () => true];
  } else if (Array.isArray(act)) {
    const [action, context] = act;
    return [action, context];
  } else {
    const { action: action, context: context } = act;
    return [action, context];
  }
};

export const applyGrants = (ac: AccessControl, grants: IGrants) => {
  Object.entries(grants).forEach(
    ([role, { extend = [], roleActions = {} }]) => {
      const acRole = ac.grant(role);
      Array.isArray(extend) && acRole.extend(extend);
      Object.entries(roleActions).forEach((roleAction) => {
        const [controller, actions = []] = roleAction;
        actions.forEach((act) => {
          const [action, context] = getActCtx(act);
          acRole
            .condition(context || (() => true))
            .execute(RBACAuthorization.parseActionName(action))
            .on(controller);
        });
      });
    },
  );
  return ac;
};
