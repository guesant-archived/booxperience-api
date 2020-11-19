import config from "config";

export type IAppLogsActions = "log" | "error" | "info" | "debug" | "trace";

export type IAppLogsOptionsMap = Map<IAppLogsActions, boolean>;

export type IAppLogsOptionsObj = {
  [key in IAppLogsActions]?: boolean;
};

const defaultOptions = (): IAppLogsOptionsObj =>
  (config.has("api.logs") && (config.get("api.logs") || {})) || {};

export class AppLogs {
  options = new Map<IAppLogsActions, boolean | undefined>();
  constructor(options: IAppLogsOptionsObj = defaultOptions()) {
    this.setup(options);
  }
  setup(options: IAppLogsOptionsObj = {}) {
    const entries = Object.entries(options) as [
      IAppLogsActions,
      boolean | undefined,
    ][];
    for (const [key, value] of entries) {
      this.options.set(key, value);
    }
    return this;
  }
  log(...messages: any[]) {
    console.log(...messages);
  }
  error(...messages: any[]) {
    console.log(...messages);
  }
  info(...messages: any[]) {
    console.info(...messages);
  }
  debug(...messages: any[]) {
    console.debug(...messages);
  }
  trace(...messages: any[]) {
    console.trace(...messages);
  }
}

export const appLogs = new AppLogs();
