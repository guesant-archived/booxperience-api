import { AuthedRequestHandlerStrict } from "@/interfaces/Auth";
import { IPostRevision } from "@/interfaces/IModelPost";
import { IVisibilityGeneric } from "@/interfaces/IModelVisibility";
import { Optional } from "@/interfaces/Optional";
import { Post } from "@/models/Post";
import { SVisibility } from "@/models/validators/SVisibility";
import { autoVisibility } from "@/utils/auto-visibility";
import * as yup from "yup";

export type INewPostBody = {
  visibility: Optional<IVisibilityGeneric>;
  postContent: IPostRevision;
};

export const NewPostValidation = yup
  .object()
  .shape({
    visibility: SVisibility({
      strict: false,
      defaults: false,
    }).default(() => ({})),
    postContent: yup
      .object()
      .shape({ richTextContent: yup.string().required().min(1) })
      .default(() => ({}))
      .required(),
  })
  .default(() => ({}));

export const NewPost = (async (req, res, next) => {
  try {
    const {
      visibility = {},
      postContent: { richTextContent },
    }: INewPostBody = req.body;
    const post = new Post();
    post.user = req.auth.user._id;
    post.visibility = (await autoVisibility(req.auth.user, visibility))._id;
    post.addRevision({ richTextContent });
    await post.save();
    return res.json(await post.publicJSON());
  } catch (e) {
    return next(e);
  }
}) as AuthedRequestHandlerStrict;
