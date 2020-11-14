import { AuthedRequestHandlerStrict } from "@/interfaces/Auth";
import { Post } from "@/models/Post";
import { equalDocumentID } from "@/utils/compare-id";
import { isValidObjectId } from "mongoose";

export const DeletePost = (async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) return res.sendStatus(404);
    const post = await Post.findById(id);
    if (!post || !equalDocumentID(post.user, req.auth.user)) {
      return res.sendStatus(401);
    }
    await Post.deleteOne({ _id: id });
    return res.send();
  } catch (e) {
    return next(e);
  }
}) as AuthedRequestHandlerStrict;
