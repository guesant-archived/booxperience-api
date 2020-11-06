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

export type UserGeneric = {
  publicInfo: {
    isVerified: boolean;
    name: string;
  };
  publicJSON: () => {
    username: string;
    publicInfo: UserGeneric["publicInfo"];
  };
};

export type UserDoc = AccountDoc & UserGeneric;

UserSchema.methods.publicJSON = function publicJSON(this: UserDoc) {
  const { publicInfo, username } = this;
  return { username, publicInfo };
};

export const User = mongoose.model<UserDoc>("User", UserSchema);
