import { setupEnv } from "@/config/setup-env";

setupEnv();

export const DEFAULT_ENV = {
  PORT: "1337",
  MONGODB_URI: "mongodb://localhost:27017/db",
  NODE_ENV: "production",
};

export const getEnv = () => ({
  ...DEFAULT_ENV,
  ...process.env,
});
