import express from "express";
import {
  UsersNew,
  UsersNewValidation,
} from "../../../../controllers/UsersController/new";
import BodyValidatorMiddleware from "../../../../middlewares/body-validator-middleware";

const users = express.Router();
users.post("/", BodyValidatorMiddleware(UsersNewValidation), UsersNew);

export default users;
