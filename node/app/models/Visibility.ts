import { IUserDoc } from "@/interfaces/IModelUser";
import { IVisibilityDoc } from "@/interfaces/IModelVisibility";
import { equalDocumentID } from "@/utils/compare-id";
import * as mongoose from "mongoose";
import { User } from "./User";

const VisibilitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
  isPrivate: {
    type: mongoose.Schema.Types.Boolean,
    default: false,
    required: true,
  },
  isIndexable: {
    type: mongoose.Schema.Types.Boolean,
    required: true,
    default: true,
  },
  publicBlockedUsers: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: User }],
    required: true,
    default: () => [],
    validate: {
      validator: function (this: IVisibilityDoc) {
        if (this.isPrivate && this.publicBlockedUsers.length) {
          this.publicBlockedUsers = [];
        }
        return true;
      },
    },
  },
  privateAllowedUsers: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: User }],
    required: true,
    default: () => [],
    validate: {
      validator: function (this: IVisibilityDoc) {
        if (!this.isPrivate && this.privateAllowedUsers.length) {
          this.privateAllowedUsers = [];
        }
        return true;
      },
    },
  },
  usedIn: {
    type: [{ type: mongoose.Schema.Types.ObjectId }],
    required: true,
    default: () => [],
  },
});

const SetArrayObjectGeneric = (
  prop: "privateAllowedUsers" | "publicBlockedUsers" | "usedIn",
) =>
  function (this: IVisibilityDoc, arr: any[]) {
    (this as any)[prop] = Array.from(new Set(arr)).sort();
  };

VisibilitySchema.methods.isUserAllowed = function (
  this: IVisibilityDoc,
  targetUser: IUserDoc,
  { allowPublicIndexable = true }: { allowPublicIndexable?: boolean } = {},
) {
  if (!this.isIndexable && !allowPublicIndexable) return false;
  if (!equalDocumentID(this.user, targetUser)) {
    if (this.isPrivate) {
      if (
        this.privateAllowedUsers.every((u) => !equalDocumentID(u, targetUser))
      ) {
        return false;
      }
    } else {
      if (this.publicBlockedUsers.some((u) => equalDocumentID(u, targetUser))) {
        return false;
      }
    }
  }
  return true;
};

VisibilitySchema.methods.setPrivateAllowedUsers = SetArrayObjectGeneric(
  "privateAllowedUsers",
);

VisibilitySchema.methods.setPublicBlockedUsers = SetArrayObjectGeneric(
  "publicBlockedUsers",
);

VisibilitySchema.methods.setUsedIn = SetArrayObjectGeneric("usedIn");

VisibilitySchema.pre("save", function (this: IVisibilityDoc, next) {
  this.setUsedIn(this.usedIn);
  this.setPrivateAllowedUsers(this.privateAllowedUsers);
  this.setPublicBlockedUsers(this.publicBlockedUsers);
  return next();
});

export const Visibility = mongoose.model<IVisibilityDoc>(
  "Visibility",
  VisibilitySchema,
);
