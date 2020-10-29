import * as yup from "yup";
import { RequestHandler } from "express";
import User from "../../../models/User";

export const UsersNewValidation = yup.object().shape({
  account: yup
    .object()
    .shape({
      username: yup
        .string()
        .trim()
        .matches(/^[a-zA-Z0-9]+$/)
        .required()
        .test(
          "account.username must be unique",
          "account.username is already taken",
          async (username: unknown) =>
            !Boolean(
              await User.findOne({
                username: username as string,
              }),
            ),
        ),
      password: yup.string().min(5).matches(/\d/).required(),
    })
    .required(),
});

export const UsersNew: RequestHandler = async (req, res, next) => {
  const user = new User();
  const { username, password } = req.body.account;
  user.username = username;
  user.setPassword(password);
  user
    .save()
    .then(() => {
      return res.json({ account: user.toAuthJSON() });
    })
    .catch(next);
};
