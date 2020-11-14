import { Env } from "@/interfaces/Env";
import mongoose from "mongoose";

export const setupDB = async (env: Env) => {
  env.NODE_ENV !== "production" && mongoose.set("debug", true);
  mongoose.set("useNewUrlParser", true);
  mongoose.set("useUnifiedTopology", true);
  await mongoose.connect(env.MONGODB_URI);
  return mongoose;
};
