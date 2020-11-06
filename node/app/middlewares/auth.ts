import { JWT_SECRET } from "@/config/security";
import { User } from "@/models/User";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { getTokenFromHeader } from "../utils/get-token-from-header";
import { AuthedRequest, AuthPayload } from "../interfaces/Auth";

const authMiddlewareGenerator = (strict: boolean) =>
  ((req, res, next) => {
    const token = getTokenFromHeader(req);
    if (token === null || !token) {
      if (!strict) {
        (req as AuthedRequest).auth = {
          isAuthed: false,
          user: null,
        };
        return next();
      }
      return res.sendStatus(401);
    } else {
      jwt.verify(token, JWT_SECRET, async (err: null | Error, payload: any) => {
        if (err || !payload) {
          if (strict) {
            return res.sendStatus(403);
          }
          (req as AuthedRequest).auth = {
            isAuthed: false,
            user: null,
          };
        } else {
          const {
            data: { id },
          } = payload as AuthPayload;
          const user = await User.findById(id);
          if (!user) {
            return res.sendStatus(403);
          }
          (req as AuthedRequest).auth = {
            isAuthed: true,
            user,
          };
        }
        return next();
      });
    }
  }) as RequestHandler;

export const AuthRequired = authMiddlewareGenerator(true);
export const AuthOptional = authMiddlewareGenerator(false);
