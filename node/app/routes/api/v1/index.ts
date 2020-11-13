import { info } from "@/routes/api/v1/info";
import { posts } from "@/routes/api/v1/posts";
import { user } from "@/routes/api/v1/user";
import { users } from "@/routes/api/v1/users";
import { visibility } from "@/routes/api/v1/visibility";
import { Router } from "express";

const v1 = Router();

v1.use("/info", info);
v1.use("/user", user);
v1.use("/users", users);
v1.use("/posts", posts);
v1.use("/visibility", visibility);

export default v1;
