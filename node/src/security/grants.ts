import { contextFromRequester } from "@/security/RBACAuthorization";
import { IGrants } from "@/types/IGrants";

const Controllers = {
  VisibilityController: {
    name: "VisibilityController",
    newVisibility: "newVisibility",
    listVisibilities: "listVisibilities",
  },
};

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
      [Controllers.VisibilityController.name]: [
        { action: "*", context: contextFromRequester },
        Controllers.VisibilityController.newVisibility,
        Controllers.VisibilityController.listVisibilities,
      ],
    },
  },
  admin: {
    extend: ["user"],
    roleActions: { [Controllers.VisibilityController.name]: ["*"] },
  },
};
