import { ControllerBase } from "@/controllers/ControllerBase";

export class IndexController extends ControllerBase {
  index() {
    this.ok({ api: { info: "api v1" } });
  }
}
