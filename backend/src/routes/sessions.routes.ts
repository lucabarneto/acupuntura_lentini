import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { SessionController } from "../controllers/sessions.controller.js";

const sessionController = new SessionController();

export const sessionRouter = Router();

sessionRouter.post(
  "/login",
  authenticate("login", { session: false }),
  sessionController.logUserIn
);

sessionRouter.post(
  "/logout",
  authenticate("jwt", { session: false }),
  sessionController.logUserOut
);
