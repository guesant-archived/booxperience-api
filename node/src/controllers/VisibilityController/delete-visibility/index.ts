import { AuthedRequestHandlerStrict } from "@/interfaces/Auth";
import { Visibility } from "@/models/Visibility";
import { equalDocumentID } from "@/utils/compare-id";

export const DeleteVisibility = (async (req, res, next) => {
  try {
    const { id } = req.params;
    const visibility = await Visibility.findById(id);
    if (!visibility || !equalDocumentID(visibility.user, req.auth.user)) {
      return res.sendStatus(401);
    }
    if (visibility.usedIn.length) return res.status(422);
    await Visibility.deleteOne({ _id: id });
    return res.send();
  } catch (e) {
    return next(e);
  }
}) as AuthedRequestHandlerStrict;
