import {
  UsersLogin,
  UsersLoginValidation,
} from "@/controllers/UsersController/login";
import {
  UsersNew,
  UsersNewValidation,
} from "@/controllers/UsersController/new";
import BodyValidatorMiddleware from "@/middlewares/body-validator-middleware";
import express from "express";

const users = express.Router();
users.post("/", BodyValidatorMiddleware(UsersNewValidation), UsersNew);
users.post("/login", BodyValidatorMiddleware(UsersLoginValidation), UsersLogin);

export default users;
