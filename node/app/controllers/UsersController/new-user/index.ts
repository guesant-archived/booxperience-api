import { User } from "@/models/User";
import { RequestHandler } from "express";
import * as yup from "yup";

export const NewUserValidation = yup.object().shape({
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

export const NewUser = (async (req, res, next) => {
  try {
    const user = new User();
    const { username, password } = req.body.account;
    user.username = username;
    user.setPassword(password);
    await user.save();
    return res.json({ account: user.toAuthJSON() });
  } catch (e) {
    return next(e);
  }
}) as RequestHandler;
