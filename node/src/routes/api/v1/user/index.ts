import { GetLoggedUserInfo } from "@/controllers/UserController/get-logged-user-info";
import { AuthRequired } from "@/middlewares/auth";
import express, { RequestHandler } from "express";

const user = express.Router();

user.get("/", AuthRequired, [GetLoggedUserInfo] as RequestHandler[]);

export { user };
