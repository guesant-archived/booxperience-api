import { AuthedRequestHandlerStrict } from "@/interfaces/Auth";
import { Visibility } from "@/models/Visibility";
import { equalDocumentID } from "@/utils/compare-id";

export const GetVisibility = (async (req, res, next) => {
  try {
    const { id } = req.params;
    const visibility = await Visibility.findById(id).lean();
    if (!visibility || !equalDocumentID(visibility.user, req.auth.user)) {
      return res.sendStatus(401);
    }
    return res.json(visibility);
  } catch (e) {
    return next(e);
  }
}) as AuthedRequestHandlerStrict;
