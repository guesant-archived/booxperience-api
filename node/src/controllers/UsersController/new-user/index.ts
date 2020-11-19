import { UsersController } from "@/controllers/UsersController";
import { BodyValidator } from "@/middlewares/ControllerValidators";
import { User } from "@/mock/User";
import { FunctionQueue } from "@/utils/FunctionQueue";
import { object, string } from "yup";

const validator = {
  body: object().shape({
    account: object()
      .shape({
        username: string()
          .trim()
          .matches(/^[a-zA-Z0-9]+$/)
          .required()
          .test(
            "account.username",
            "account.username is already taken",
            async (username: unknown) =>
              !Boolean(
                await User.findOne({
                  username: username as string,
                }),
              ),
          ),
        password: string().min(5).matches(/\d/).required(),
      })
      .required(),
  }),
};

export const queueNewUser = new FunctionQueue()
  .fromArray([BodyValidator(validator.body), newUser])
  .done();

async function newUser(this: UsersController) {
  try {
    const user = new User();
    const { username, password } = this.body.account;
    user.username = username;
    user.setPassword(password);
    await user.save();
    return this.ok({ account: user.toAuthJSON() });
  } catch (_) {}
  return this.send(403);
}
