import { ControllerBase } from "@/controllers/ControllerBase";
import { queueLoginUser } from "@/controllers/UsersController/login-user";
import { queueNewUser } from "@/controllers/UsersController/new-user";

export class UsersController extends ControllerBase {
  loginUser = queueLoginUser;
  newUser = queueNewUser;
}
