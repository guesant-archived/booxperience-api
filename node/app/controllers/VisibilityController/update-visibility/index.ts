import { AuthedRequestHandlerStrict } from "@/interfaces/Auth";
import { Optional } from "@/interfaces/Optional";
import {
  Visibility,
  VisibilityGeneric,
  VisibilityObjectSchema,
} from "@/models/Visibility";
import { equalDocumentID } from "@/utils/compare-id";

export const UpdateVisibilityValidation = VisibilityObjectSchema({
  defaults: false,
});

export const UpdateVisibility = (async (req, res, next) => {
  try {
    const { id } = req.params;
    const visibility = await Visibility.findById(id);
    if (!visibility || !equalDocumentID(visibility.user, req.auth.user)) {
      return res.status(401);
    }
    const {
      isPrivate,
      isIndexable,
      publicBlockedUsers,
      privateAllowedUsers,
    }: Optional<VisibilityGeneric> = req.body;
    typeof isPrivate !== "undefined" && visibility.set({ isPrivate });
    typeof isIndexable !== "undefined" && visibility.set({ isIndexable });
    visibility.setPrivateAllowedUsers(
      visibility.isPrivate && typeof privateAllowedUsers !== "undefined"
        ? privateAllowedUsers
        : [],
    );
    visibility.setPublicBlockedUsers(
      !visibility.isPrivate && typeof publicBlockedUsers !== "undefined"
        ? publicBlockedUsers
        : [],
    );
    await visibility.save();
    return res.json(visibility);
  } catch (e) {
    return next(e);
  }
}) as AuthedRequestHandlerStrict;
