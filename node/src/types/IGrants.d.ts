import { IGrantsRoles } from "@/types/IGrantsRoles";
import { ICondition } from "role-acl";

export type IGrants = {
  [key in IGrantsRoles]: {
    extend: string[];
    roleActions: {
      [key: string]: (
        | string
        | { action: string; context?: ICondition }
        | [string, ICondition]
      )[];
    };
  };
};
