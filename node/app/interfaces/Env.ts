export interface Env extends NodeJS.ProcessEnv {
  PORT: string;
  MONGODB_URI: string;
  NODE_ENV: string;
}
