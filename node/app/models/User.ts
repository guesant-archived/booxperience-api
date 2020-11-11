import { IUserDoc } from "@/interfaces/IModelUser";
import { GenerateAccountSchema } from "@/models/generic/GenerateAccountSchema";
import * as mongoose from "mongoose";

const UserSchema = GenerateAccountSchema({
  publicInfo: {
    isVerified: { type: mongoose.Schema.Types.Boolean, default: false },
    name: { type: mongoose.Schema.Types.String, default: "" },
  },
});

UserSchema.methods.publicJSON = function publicJSON(this: IUserDoc) {
  const { publicInfo, username } = this;
  return { username, publicInfo };
};

export const User = mongoose.model<IUserDoc>("User", UserSchema);
