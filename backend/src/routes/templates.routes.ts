import { Router } from "express";
import TemplateController from "../controllers/templates.controller.ts";

import ITemplate from "../interfaces/ITemplate.interface.ts";
import { validateRequest } from "../middlewares/validateRequest.ts";
import RequestParams from "../interfaces/RequestParams.interface.ts";

const templateRouter = Router();
const templateController = new TemplateController();

templateRouter.get("/", templateController.getAllTemplates);

templateRouter.get(
  "/:id",
  validateRequest({ params: RequestParams }),
  templateController.getTemplateById
);

templateRouter.post(
  "/",
  validateRequest({ body: ITemplate }),
  templateController.createTemplate
);

templateRouter.put(
  "/:id",
  validateRequest({ params: RequestParams, body: ITemplate }),
  templateController.updateTemplate
);

templateRouter.delete(
  "/:id",
  validateRequest({ params: RequestParams }),
  templateController.deleteTemplate
);

export default templateRouter;
