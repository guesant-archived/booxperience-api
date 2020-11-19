import { ControllerBase } from "@/controllers/ControllerBase";
import { queueLoginUser } from "@/controllers/UsersController/login-user";

export class UsersController extends ControllerBase {
  loginUser = queueLoginUser;
}
