import { Router } from "express";
import { users } from "./users";

const v1 = Router();
v1.use("/users", users);

export default v1;
