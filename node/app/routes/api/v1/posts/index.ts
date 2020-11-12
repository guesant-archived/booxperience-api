import * as deletePost from "@/controllers/PostController/delete-post";
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

posts.delete("/:id", AuthRequired, [deletePost.DeletePost] as RequestHandler[]);

export { posts };
