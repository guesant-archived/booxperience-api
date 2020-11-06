import { UserDoc } from "@/models/User";
import { NextFunction, Request, Response } from "express";

export type AuthPayload = { [key: string]: any } & {
  data: {
    id: string;
    username: string;
  };
};

export type AuthedRequestStrict = Request & {
  auth: {
    isAuthed: true;
    user: UserDoc;
  };
};

export type AuthedRequest =
  | AuthedRequestStrict
  | (Request & {
      auth: {
        isAuthed: false;
        user: null;
      };
    });

export type AuthedRequestHandler = (
  req: AuthedRequest,
  res: Response,
  next: NextFunction,
) => any | Promise<any>;

export type AuthedRequestHandlerStrict = (
  req: AuthedRequestStrict,
  res: Response,
  next: NextFunction,
) => any | Promise<any>;
