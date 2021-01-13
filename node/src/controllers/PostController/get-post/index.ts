import { AuthedRequestHandlerStrict } from "@/interfaces/Auth";
import { IVisibilityDoc } from "@/interfaces/IModelVisibility";
import { Post } from "@/models/Post";
import { isValidObjectId } from "mongoose";

export const GetPost = (async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) return res.sendStatus(404);
    const post = await Post.findById(id).populate("visibility");
    if (!post) return res.sendStatus(404);
    const { visibility } = post as typeof post & { visibility: IVisibilityDoc };
    if (!visibility.isUserAllowed(req.auth.user)) return res.sendStatus(401);
    return res.json(await post.publicJSON());
  } catch (e) {
    return res.sendStatus(401);
  }
}) as AuthedRequestHandlerStrict;
