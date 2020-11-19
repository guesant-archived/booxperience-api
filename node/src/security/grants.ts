import { contextFromRequester } from "@/security/RBACAuthorization";
import { IGrants } from "@/types/IGrants";

export const RBACSecurityGrants: IGrants = {
  restrict: {
    extend: [],
    roleActions: {},
  },
  guest: {
    extend: [],
    roleActions: {
      IndexController: ["index"],
    },
  },
  user: {
    extend: ["guest"],
    roleActions: {
      VisibilityController: [
        ["getVisibility", contextFromRequester],
        ...["newVisibility", "listVisibilities"],
      ],
    },
  },
  admin: {
    extend: ["user"],
    roleActions: { VisibilityController: ["*"] },
  },
};
