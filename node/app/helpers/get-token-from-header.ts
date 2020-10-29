import { Request } from "express";

export const getTokenFromHeader = (req: Request): string | null => {
  const headerAuthorization =
    req.headers["Authorization"] || req.headers["authorization"];
  if (typeof headerAuthorization !== "string") return null;
  const tokenFromHeader = headerAuthorization.trim();
  return (tokenFromHeader && tokenFromHeader.split(" ")[1]) || null;
};
