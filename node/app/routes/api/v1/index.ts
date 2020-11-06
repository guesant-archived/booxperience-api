import { Router } from "express";
import { user } from "./user";
import { users } from "./users";
import { visibility } from "./visibility";

const v1 = Router();

v1.use("/user", user);
v1.use("/users", users);
v1.use("/visibility", visibility);

export default v1;
