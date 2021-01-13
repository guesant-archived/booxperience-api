import { IUserDoc } from "@/types/IModelUser";
import { GenerateAccountSchema } from "@/mock/generic/GenerateAccountSchema";
import * as mongoose from "mongoose";

const UserSchema = GenerateAccountSchema({
  role: {
    type: String,
    lowercase: true,
    required: true,
    default: () => "user",
  },
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
