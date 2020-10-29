import User from "@/models/User";
import { RequestHandler } from "express";
import * as yup from "yup";

export const UsersLoginValidation = yup.object().shape({
  account: yup
    .object()
    .shape({
      username: yup
        .string()
        .trim()
        .matches(/^[a-zA-Z0-9]+$/)
        .required(),
      password: yup.string().min(5).matches(/\d/).required(),
    })
    .required(),
});

export const UsersLogin: RequestHandler = async (req, res) => {
  const { username, password } = req.body.account;
  return await User.findOne({ username }).then((user) => {
    if (user && user.validPassword(password)) {
      return res.json({ account: user.toAuthJSON() });
    } else {
      return res.status(422).json({
        messages: ["username or password does not match"],
        errors: [],
      });
    }
  });
};
