import { ControllerBaseAuthed } from "@/controllers/ControllerBase";
import { NeedsAuth } from "@/middlewares/NeedsAuth";
import { FunctionQueue } from "@/utils/FunctionQueue";

export const queueGetLoggedUserInfo = new FunctionQueue()
  .fromArray([NeedsAuth(true), getLoggedUserInfo])
  .done();

export function getLoggedUserInfo(this: ControllerBaseAuthed) {
  try {
    return this.ok(this.auth.user.publicJSON());
  } catch (_) {}
  return this.send(403);
}
