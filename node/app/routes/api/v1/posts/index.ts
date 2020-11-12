import * as addPostRevision from "@/controllers/PostController/add-post-revision";
import * as deletePost from "@/controllers/PostController/delete-post";
import * as getPost from "@/controllers/PostController/get-post";
import * as newPost from "@/controllers/PostController/new-post";
import { AuthRequired } from "@/middlewares/auth";
import BodyValidatorMiddleware from "@/middlewares/body-validator-middleware";
import express, { RequestHandler } from "express";

const posts = express.Router();

posts.get("/id/:id", AuthRequired, [getPost.GetPost] as RequestHandler[]);

posts.post(
  "/",
  AuthRequired,
  BodyValidatorMiddleware(newPost.NewPostValidation),
  [newPost.NewPost] as RequestHandler[],
);

posts.put(
  "/:id",
  AuthRequired,
  BodyValidatorMiddleware(addPostRevision.AddPostRevisionValidation),
  [addPostRevision.AddPostRevision] as RequestHandler[],
);

posts.delete("/:id", AuthRequired, [deletePost.DeletePost] as RequestHandler[]);

export { posts };
