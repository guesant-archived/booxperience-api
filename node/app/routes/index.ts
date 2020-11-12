import api from "@/routes/api";
import { Router } from "express";

const routes = Router();
routes.use("/api", api);

export default routes;
