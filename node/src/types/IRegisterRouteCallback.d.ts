import { IBoundActions } from "@/types/IBoundActions";

export type IRegisterRouteCallback = (
  uri: string,
  httpMethod: string,
  boundAction: IBoundActions,
) => void;
