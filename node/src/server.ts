import { ExpressApp } from "@/ExpressApp";
import { db } from "@/mock/db";
import config from "config";
import { Repository } from "@/repositories/Repository";
import { Router } from "@/routing/Router";
import { BooksListRoutes } from "@/routing/routes/BooksListRoutes";
import { IndexRoutes } from "@/routing/routes/IndexRoutes";
import { Security } from "./security/security";

export function startServer() {
  const router = new Router([new IndexRoutes(), new BooksListRoutes()]);
  const repository = new Repository(db);
  const security = new Security(
    repository,
    config.get("api.security.jwtSecret"),
  );
  const expressApp = new ExpressApp(router, repository, security);
  expressApp.run();
}
