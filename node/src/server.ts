import { ExpressApp } from "@/ExpressApp";
import { Router } from "@/routing/Router";
import { UserRoutes } from "@/routing/routes/api/v1/UserRoutes";
import { UsersRoutes } from "@/routing/routes/api/v1/UsersRoutes";
import { IndexRoutes } from "@/routing/routes/api/v1/IndexRoutes";
import { Security } from "@/security/Security";
import { setupDB } from "@/utils/setup-db";
import config from "config";

export async function startServer() {
  await setupDB({ dbUri: config.get("api.db.dbMongoURI") as string });
  const router = new Router([
    new IndexRoutes(),
    new UserRoutes(),
    new UsersRoutes(),
  ]);
  const security = new Security(config.get("api.security.jwtSecret"));
  const expressApp = new ExpressApp(router, security);
  expressApp.run();
}
