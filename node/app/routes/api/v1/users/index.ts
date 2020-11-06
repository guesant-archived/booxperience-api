import {
  LoginUser,
  LoginUserValidation,
} from "@/controllers/UsersController/login-user";
import {
  NewUser,
  NewUserValidation,
} from "@/controllers/UsersController/new-user";
import BodyValidatorMiddleware from "@/middlewares/body-validator-middleware";
import express from "express";

const users = express.Router();

users.post("/", BodyValidatorMiddleware(NewUserValidation), NewUser);
users.post("/login", BodyValidatorMiddleware(LoginUserValidation), LoginUser);

export { users };
