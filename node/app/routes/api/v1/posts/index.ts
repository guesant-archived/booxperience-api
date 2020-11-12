import * as newPost from "@/controllers/PostController/new-post";
import { AuthRequired } from "@/middlewares/auth";
import BodyValidatorMiddleware from "@/middlewares/body-validator-middleware";
import express, { RequestHandler } from "express";

const posts = express.Router();

posts.post(
  "/",
  AuthRequired,
  BodyValidatorMiddleware(newPost.NewPostValidation),
  [newPost.NewPost] as RequestHandler[],
);

export { posts };
