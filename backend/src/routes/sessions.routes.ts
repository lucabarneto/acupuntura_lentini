import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.ts";
import { SessionController } from "../controllers/sessions.controller.ts";

const sessionController = new SessionController();

export const sessionRouter = Router();

sessionRouter.post(
  "/login",
  authenticate("login", { session: false }),
  sessionController.logUserIn
);
