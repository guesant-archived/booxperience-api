import { RequestHandler } from "express";
import yup from "yup";

const BodyValidatorMiddleware = (validationContract: yup.ObjectSchema) =>
  (async (req, res, next) => {
    await validationContract
      .validate(req.body)
      .then(() => {
        req.body = validationContract.cast(req.body);
        return next();
      })
      .catch((err) => {
        const { path, errors, message } = err;
        return res.status(422).json({ errors: [{ path, errors, message }] });
      });
  }) as RequestHandler;

export default BodyValidatorMiddleware;
