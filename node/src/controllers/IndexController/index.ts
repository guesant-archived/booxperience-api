import { ControllerBase } from "@/controllers/ControllerBase";
import { indexQueue } from "./index/index";

export class IndexController extends ControllerBase {
  index = indexQueue;
}
