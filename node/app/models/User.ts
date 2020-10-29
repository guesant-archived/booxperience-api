import mongoose from "mongoose";
import { AccountDoc, getAccountSchema } from "./GenericAccount";

const UserSchema = getAccountSchema({
  name: String,
});

export interface UserDoc extends AccountDoc {
  name: string;
  publicJSON: () => any;
}

UserSchema.methods.publicJSON = function publicJSON() {
  const {
    _doc: { hash, salt, ...personalInfo },
  } = this;
  return { ...personalInfo };
};

const User = mongoose.model<UserDoc>("User", UserSchema);

export default User;
