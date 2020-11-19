import { ExpressApp } from "@/ExpressApp";
import { Router } from "@/routing/Router";
import { IndexRoutes } from "@/routing/routes/api/v1/IndexRoutes";
import { Security } from "@/security/Security";
import { setupDB } from "@/utils/setup-db";
import config from "config";

export async function startServer() {
  await setupDB({ dbUri: config.get("api.db.dbMongoURI") as string });
  const router = new Router([
    new IndexRoutes(),
  ]);
  const security = new Security(config.get("api.security.jwtSecret"));
  const expressApp = new ExpressApp(router, security);
  expressApp.run();
}
