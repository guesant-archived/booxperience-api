import { ExpressApp } from "@/ExpressApp";
import { Router } from "@/routing/Router";

export function startServer() {
  const expressApp = new ExpressApp(new Router([]));
  expressApp.run();
}
