import { AuthMiddlewareGenerator } from "@/middlewares/AuthMiddlewareGenerator";
import { rbac, RBACAuthorization } from "@/security/RBACAuthorization";
import { RequestHandler } from "express";

const authMiddleware = AuthMiddlewareGenerator(false);

export class Security {
  jwtSecret: string;
  rbacAuthorization: RBACAuthorization;
  constructor(jwtSecret: string) {
    this.rbacAuthorization = rbac;
    this.jwtSecret = jwtSecret;
  }
  authenticate(): RequestHandler[] {
    return [authMiddleware];
  }
}
