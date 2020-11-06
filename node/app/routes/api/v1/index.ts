import { Router } from "express";
import { user } from "./user";
import { users } from "./users";

const v1 = Router();

v1.use("/user", user);
v1.use("/users", users);

export default v1;
