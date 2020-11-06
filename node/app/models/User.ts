import * as mongoose from "mongoose";
import {
  AccountDoc,
  GenerateAccountSchema,
} from "./generic/GenerateAccountSchema";

const UserSchema = GenerateAccountSchema({
  publicInfo: {
    isVerified: { type: mongoose.Schema.Types.Boolean, default: false },
    name: { type: mongoose.Schema.Types.String, default: "" },
  },
});

export type UserDoc = AccountDoc & {
  publicInfo: {
    isVerified: boolean;
    name: string;
  };
  publicJSON: () => UserDoc["publicInfo"] & { username: string };
};

UserSchema.methods.publicJSON = function publicJSON(this: UserDoc) {
  const { publicInfo, username } = this;
  return { username, publicInfo };
};

export const User = mongoose.model<UserDoc>("User", UserSchema);
