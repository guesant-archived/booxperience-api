import config from "config";
import mongoose from "mongoose";

export const setupDB = async ({ dbUri }: { dbUri: string }) => {
  config.get("debug") && mongoose.set("debug", true);
  mongoose.set("useNewUrlParser", true);
  mongoose.set("useUnifiedTopology", true);
  await mongoose.connect(dbUri);
  return mongoose;
};
