import { AuthedRequestHandlerStrict } from "@/interfaces/Auth";

export const GetLoggedUserInfo = (async (req, res) => {
  res.json(req.auth.user.publicJSON());
}) as AuthedRequestHandlerStrict;
