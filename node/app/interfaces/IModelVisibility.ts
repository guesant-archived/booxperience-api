import { IUserDoc } from "@/interfaces/IModelUser";
import * as mongoose from "mongoose";

type ISetUserGeneric<T extends "privateAllowedUsers" | "publicBlockedUsers"> = (
  users: IVisibilityGeneric[T],
) => void;

export type IVisibilityDoc = mongoose.Document & IVisibilityGeneric;

export type IVisibilityGeneric = {
  isPrivate: boolean;
  isIndexable: boolean;
  user: mongoose.Schema.Types.ObjectId & IUserDoc;
  usedIn: (mongoose.Schema.Types.ObjectId | string)[];
  privateAllowedUsers: mongoose.Schema.Types.ObjectId[];
  publicBlockedUsers: mongoose.Schema.Types.ObjectId[];
  setPrivateAllowedUsers: ISetUserGeneric<"privateAllowedUsers">;
  setPublicBlockedUsers: ISetUserGeneric<"publicBlockedUsers">;
  setUsedIn: (items: IVisibilityGeneric["usedIn"]) => void;
  pushUsedIn: (item: string) => void;
  isUserAllowed: (
    targetUser: IUserDoc,
    options?: { allowPublicIndexable?: boolean },
  ) => boolean;
};
