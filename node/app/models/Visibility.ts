import { ApplyDefault } from "@/utils/apply-default";
import * as mongoose from "mongoose";
import * as yup from "yup";
import { User, UserDoc } from "./User";

export const VisibilityObjectSchema = ({
  strict = false,
  defaults = true,
}: { strict?: boolean; defaults?: boolean } = {}) => {
  const isRequired = strict ? "required" : "notRequired";
  const applyDefault = ApplyDefault(defaults);
  return yup
    .object()
    .shape({
      isPrivate: yup.boolean()[isRequired]().default(applyDefault(false)),
      isIndexable: yup.boolean()[isRequired]().default(applyDefault(true)),
      privateAllowedUsers: yup
        .array()
        .of(yup.string())
        [isRequired]()
        .default(applyDefault([])),
      publicBlockedUsers: yup
        .array()
        .of(yup.string())
        [isRequired]()
        .default(applyDefault([])),
    })
    [isRequired]()
    .default(applyDefault({}));
};

type ISetUserGeneric<T extends "privateAllowedUsers" | "publicBlockedUsers"> = (
  users: VisibilityGeneric[T],
) => void;

export type VisibilityGeneric = {
  isPrivate: boolean;
  isIndexable: boolean;
  user: mongoose.Schema.Types.ObjectId & UserDoc;
  usedIn: mongoose.Schema.Types.ObjectId[];
  privateAllowedUsers: mongoose.Schema.Types.ObjectId[];
  publicBlockedUsers: mongoose.Schema.Types.ObjectId[];
  setPrivateAllowedUsers: ISetUserGeneric<"privateAllowedUsers">;
  setPublicBlockedUsers: ISetUserGeneric<"publicBlockedUsers">;
};

export type VisibilityDoc = mongoose.Document & VisibilityGeneric;

const VisibilitySchemaValidators = {
  EmptyBlockedUsersInPrivateVisibility: function (this: VisibilityDoc) {
    if (this.isPrivate && this.publicBlockedUsers.length) {
      this.publicBlockedUsers = [];
    }
    return true;
  },
  EmptyAllowedUsersInPublicVisibility: function (this: VisibilityDoc) {
    if (!this.isPrivate && this.privateAllowedUsers.length) {
      this.privateAllowedUsers = [];
    }
    return true;
  },
};

const {
  EmptyAllowedUsersInPublicVisibility,
  EmptyBlockedUsersInPrivateVisibility,
} = VisibilitySchemaValidators;

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
      validator: EmptyBlockedUsersInPrivateVisibility,
    },
  },
  privateAllowedUsers: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: User }],
    required: true,
    default: () => [],
    validate: {
      validator: EmptyAllowedUsersInPublicVisibility,
    },
  },
  usedIn: {
    type: [{ type: mongoose.Schema.Types.ObjectId }],
    required: true,
    default: () => [],
  },
});

type generics = "privateAllowedUsers" | "publicBlockedUsers";

const SetUserGeneric = <T extends generics>(prop: T) =>
  function (this: VisibilityDoc, users: VisibilityGeneric[T]) {
    this[prop] = Array.from(new Set(users)).sort();
  };

VisibilitySchema.methods.setPrivateAllowedUsers = SetUserGeneric(
  "privateAllowedUsers",
);

VisibilitySchema.methods.setPublicBlockedUsers = SetUserGeneric(
  "publicBlockedUsers",
);

VisibilitySchema.pre("save", function (this: VisibilityDoc, next) {
  this.setPrivateAllowedUsers(this.privateAllowedUsers);
  this.setPublicBlockedUsers(this.publicBlockedUsers);
  return next();
});

export const Visibility = mongoose.model<VisibilityDoc>(
  "Visibility",
  VisibilitySchema,
);
