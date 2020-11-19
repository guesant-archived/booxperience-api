import { setupDB } from "@/utils/setup-db";
import config from "config";

export async function startServer() {
  await setupDB({ dbUri: config.get("api.db.dbMongoURI") as string });
}
