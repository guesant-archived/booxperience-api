import { RBACSecurityGrants } from "@/security/grants";
import { IGrantsCtx } from "@/types/IGrantsCtx";
import { IGrantsRoles } from "@/types/IGrantsRoles";
import { applyGrants } from "@/utils/apply-grants";
import { equalDocumentID } from "@/utils/compare-id";
import { AccessControl, Permission } from "role-acl";
import slug from "slug";

export const contextFromRequester = (
  ctx: IGrantsCtx = { progress: "act-request" },
) =>
  ctx.progress === "act-request"
    ? true
    : equalDocumentID(ctx.requester, ctx.owner);

export class RBACAuthorization {
  ac: AccessControl;
  constructor() {
    this.ac = new AccessControl();
    applyGrants(this.ac, RBACSecurityGrants);
  }
  hasAccess(
    role: IGrantsRoles = this.getGuestAccessLevel(),
    controller: string,
    action: string,
    context: IGrantsCtx = { progress: "act-request" },
  ) {
    try {
      const ac = this.ac;
      const granted = (ac
        .can(role || this.getGuestAccessLevel())
        .context(context || {})
        .execute(RBACAuthorization.parseActionName(action))
        .sync()
        .on(controller) as Permission).granted;
      return granted;
    } catch (_) {}
    return false;
  }
  getGuestAccessLevel(): "guest" {
    return "guest";
  }
  static parseActionName(name: string) {
    return slug(name.replace(/([A-Z])/g, (c) => ` ${c}`));
  }
}

export const rbac = new RBACAuthorization();
