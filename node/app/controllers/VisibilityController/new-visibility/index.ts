import { AuthedRequestHandlerStrict } from "@/interfaces/Auth";
import { VisibilityGeneric, VisibilityObjectSchema } from "@/models/Visibility";
import { autoVisibility } from "@/utils/auto-visibility";

export const NewVisibilityValidation = VisibilityObjectSchema({
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
    }: VisibilityGeneric = req.body;
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
