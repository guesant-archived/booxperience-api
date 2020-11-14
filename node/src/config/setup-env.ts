import dotenv from "dotenv";

export const setupEnv = () => {
  dotenv.config();
  return process.env;
};
