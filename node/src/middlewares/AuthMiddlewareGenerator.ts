import { User } from "@/mock/User";
import { IControllerAuth } from "@/types/IControllerAuth";
import { getTokenFromHeader } from "@/utils/get-token-from-header";
import config from "config";
import { Request, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { isValidObjectId } from "mongoose";

const setRequestAuth = (req: Request, auth: IControllerAuth) => {
  (req as any).auth = auth;
};

const getPayloadFromToken = (
  token: string,
): {
  data: { id: string };
} => jwt.verify(token, config.get("api.security.jwtSecret")) as any;

export const AuthMiddlewareGenerator = (
  strict = false,
): RequestHandler => async (req, res, next) => {
  const token = getTokenFromHeader(req);
  const objAuth = {
    value: { isAuthed: false, user: null },
    getAuth(): IControllerAuth {
      return this.value;
    },
    setAuth(auth: IControllerAuth) {
      this.value = auth;
    },
  };
  try {
    if (token === null || !String(token).length) throw "";
    const payload = getPayloadFromToken(token);
    if (!payload) throw "";
    const { id } = payload.data;
    if (!id || !isValidObjectId(id)) throw "";
    const user = await User.findById(id);
    if (!user) return res.sendStatus(403);
    objAuth.setAuth({
      user,
      isAuthed: true,
    });
  } catch (_) {
    if (strict) return res.sendStatus(403);
  } finally {
    setRequestAuth(req, objAuth.getAuth());
    return next();
  }
};
