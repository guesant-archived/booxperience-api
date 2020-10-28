import { setupEnv } from "./setup-env";

setupEnv();

export const DEFAULT_ENV = {
  PORT: "1337",
  NODE_ENV: "production",
};

export const getEnv = () => ({
  ...DEFAULT_ENV,
  ...process.env,
});
