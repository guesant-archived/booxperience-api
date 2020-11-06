import { AuthedRequestHandlerStrict } from "@/interfaces/Auth";
import { Visibility } from "@/models/Visibility";
import * as yup from "yup";

export const ListVisibilitiesValidation = yup.object().shape({});

export const ListVisibilities = (async (req, res, next) => {
  try {
    const visibilities = await Visibility.find({
      user: req.auth.user._id,
    }).lean();
    return res.json(visibilities || []);
  } catch (e) {
    return next(e);
  }
}) as AuthedRequestHandlerStrict;
