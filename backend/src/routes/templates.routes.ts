import { Router } from "express";
import { ITemplate } from "../types/mongo/ITemplate.js";
import { TemplateController } from "../controllers/templates.controller.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { RequestParams } from "../types/express/RequestParams.js";
import { authenticate } from "../middlewares/authenticate.js";

const templateController = new TemplateController();

export const templateRouter = Router();

templateRouter.param("id", templateController.handleId);

templateRouter.get(
  "/",
  authenticate("jwt", { session: false }),
  templateController.getAllTemplates
);

templateRouter.get(
  "/:id",
  authenticate("jwt", { session: false }),
  validateRequest({ params: RequestParams }),
  templateController.getTemplateById
);

templateRouter.post(
  "/",
  authenticate("jwt", { session: false }),
  validateRequest({ body: ITemplate }),
  templateController.createTemplate
);

templateRouter.put(
  "/:id",
  authenticate("jwt", { session: false }),
  validateRequest({ params: RequestParams, body: ITemplate }),
  templateController.updateTemplate
);

templateRouter.delete(
  "/:id",
  authenticate("jwt", { session: false }),
  validateRequest({ params: RequestParams }),
  templateController.deleteTemplate
);
