import { AuthedRequestHandlerStrict } from "@/interfaces/Auth";
import { IVisibilityGeneric } from "@/interfaces/IModelVisibility";
import { SVisibility } from "@/models/validators/SVisibility";
import { autoVisibility } from "@/utils/auto-visibility";

export const NewVisibilityValidation = SVisibility({
  strict: false,
  defaults: true,
});

export const NewVisibility = (async (req, res, next) => {
  try {
    const {
      isPrivate,
      isIndexable,
      publicBlockedUsers,
      privateAllowedUsers,
    }: IVisibilityGeneric = req.body;
    return res.json(
      await autoVisibility(req.auth.user, {
        isPrivate,
        isIndexable,
        privateAllowedUsers: isPrivate ? privateAllowedUsers : [],
        publicBlockedUsers: !isPrivate ? publicBlockedUsers : [],
      }),
    );
  } catch (e) {
    return next(e);
  }
}) as AuthedRequestHandlerStrict;
