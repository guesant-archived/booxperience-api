import { FunctionQueue } from "@/utils/FunctionQueue";
import { UsersController } from "@/controllers/UsersController";
import { BodyValidator } from "@/middlewares/ControllerValidators";
import { User } from "@/mock/User";
import { UserService } from "@/services/UserService";
import { object, string } from "yup";
import { ControllerBase } from "@/controllers/ControllerBase";
import { IUserDoc } from "@/types/IModelUser";

const validator = {
  body: object().shape({
    account: object()
      .shape({
        username: string()
          .trim()
          .matches(/^[a-zA-Z0-9]+$/)
          .required(),
        password: string().min(5).matches(/\d/).required(),
      })
      .required(),
  }),
};

export const queueLoginUser = new FunctionQueue()
  .fromArray([
    BodyValidator(validator.body),
    async function (this: ControllerBase, _) {
      try {
        const { username, password } = this.body.account;
        const user = await User.findOne({ username }).select("privateInfo");
        if (!user) throw { statusCode: 404 };
        if (
          !UserService.validPassword(
            user.privateInfo.hash,
            user.privateInfo.salt,
            password,
          )
        )
          throw { statusCode: 403 };
        return _.call(this, user);
      } catch (_) {
        return this.send(422, {
          messages: ["username or password does not match"],
          errors: [],
        });
      }
    },
    loginUser,
  ])
  .done();

async function loginUser(this: UsersController, _: any, user: IUserDoc) {
  return this.ok({ account: user.toAuthJSON() });
}
