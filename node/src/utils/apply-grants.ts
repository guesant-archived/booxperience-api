import { RBACAuthorization } from "@/security/RBACAuthorization";
import { IGrants } from "@/types/IGrants";
import { AccessControl } from "role-acl";

export const applyGrants = (ac: AccessControl, grants: IGrants) => {
  Object.entries(grants).forEach(
    ([role, { extend = [], roleActions = {} }]) => {
      const acRole = ac.grant(role);
      Array.isArray(extend) && acRole.extend(extend);
      Object.entries(roleActions).forEach((roleAction) => {
        const [controller, actions = []] = roleAction;
        actions.forEach((act) => {
          if (typeof act === "string") {
            acRole
              .condition(() => true)
              .execute(RBACAuthorization.parseActionName(act))
              .on(controller);
          } else {
            let action, context;
            if (Array.isArray(act)) {
              [action, context] = act;
            } else {
              ({ action, context } = act);
            }
            acRole
              .condition(context || (() => true))
              .execute(RBACAuthorization.parseActionName(action))
              .on(controller);
          }
        });
      });
    },
  );
  return ac;
};
