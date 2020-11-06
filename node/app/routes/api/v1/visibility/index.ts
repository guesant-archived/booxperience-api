import { DeleteVisibility } from "@/controllers/VisibilityController/delete-visibility";
import { GetVisibility } from "@/controllers/VisibilityController/get-visibility";
import {
  ListVisibilities,
  ListVisibilitiesValidation,
} from "@/controllers/VisibilityController/list-visibilities";
import {
  NewVisibility,
  NewVisibilityValidation,
} from "@/controllers/VisibilityController/new-visibility";
import {
  UpdateVisibility,
  UpdateVisibilityValidation,
} from "@/controllers/VisibilityController/update-visibility";
import { AuthRequired } from "@/middlewares/auth";
import BodyValidatorMiddleware from "@/middlewares/body-validator-middleware";
import { RequestHandler, Router } from "express";

const visibility = Router();

visibility.get(
  "/",
  AuthRequired,
  BodyValidatorMiddleware(ListVisibilitiesValidation),
  [ListVisibilities] as RequestHandler[],
);
visibility.get("/:id", AuthRequired, [GetVisibility] as RequestHandler[]);
visibility.post(
  "/",
  AuthRequired,
  BodyValidatorMiddleware(NewVisibilityValidation),
  [NewVisibility] as RequestHandler[],
);
visibility.put(
  "/:id",
  AuthRequired,
  BodyValidatorMiddleware(UpdateVisibilityValidation),
  [UpdateVisibility] as RequestHandler[],
);
visibility.delete("/:id", AuthRequired, [DeleteVisibility] as RequestHandler[]);

export { visibility };
