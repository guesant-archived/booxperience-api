import config from "config";
import mongoose from "mongoose";

export const setupDB = async () => {
  config.get("debug") && mongoose.set("debug", true);
  mongoose.set("useNewUrlParser", true);
  mongoose.set("useUnifiedTopology", true);
  await mongoose.connect(config.get("api.db.dbMongoURL") as string);
  return mongoose;
};
