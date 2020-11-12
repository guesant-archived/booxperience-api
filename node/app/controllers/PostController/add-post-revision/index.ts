import { AuthedRequestHandlerStrict } from "@/interfaces/Auth";
import { IPostRevision } from "@/interfaces/IModelPost";
import {
  IVisibilityDoc,
  IVisibilityGeneric,
} from "@/interfaces/IModelVisibility";
import { Optional } from "@/interfaces/Optional";
import { Post } from "@/models/Post";
import * as yup from "yup";

export type NewPostBody = {
  visibility: Optional<IVisibilityGeneric>;
  postContent: IPostRevision;
};

export const AddPostRevisionValidation = yup
  .object()
  .shape({
    postContent: yup
      .object()
      .shape({ richTextContent: yup.string().required().min(1) })
      .default(() => ({}))
      .required(),
  })
  .default(() => ({}));

export const AddPostRevision = (async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      postContent: { richTextContent },
    } = req.body as NewPostBody;
    const post = await Post.findById(id).populate("visibility");
    const isUserAllowed = Boolean(
      post &&
        ((post.visibility as unknown) as IVisibilityDoc).isUserAllowed(
          req.auth.user,
        ),
    );
    if (!post || !isUserAllowed) {
      return res.sendStatus(401);
    }
    post.addRevision({ richTextContent });
    await post.save();
    return res.json(await post.publicJSON());
  } catch (e) {
    return next(e);
  }
}) as AuthedRequestHandlerStrict;
