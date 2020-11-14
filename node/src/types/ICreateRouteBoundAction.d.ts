import { IBoundActions } from "@/types/IBoundActions";

export type ICreateRouteBoundAction = (
  controllerClass: typeof ControllerBase,
  method: string,
) => IBoundActions;
