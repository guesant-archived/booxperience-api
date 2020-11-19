import { ControllerBase } from "@/controllers/ControllerBase";
import { queueGetLoggedUserInfo } from "@/controllers/UserController/get-logged-user-info";

export class UserController extends ControllerBase {
  getLoggedUserInfo = queueGetLoggedUserInfo;
}
