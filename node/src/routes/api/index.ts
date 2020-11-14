import v1 from "@/routes/api/v1";
import { Router } from "express";

const api = Router();
api.use("/v1", v1);

export default api;
