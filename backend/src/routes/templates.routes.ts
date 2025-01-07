import { Router } from "express";
import { ITemplate } from "../types/mongo/ITemplate.ts";
import { TemplateController } from "../controllers/templates.controller.ts";
import { validateRequest } from "../middlewares/validateRequest.ts";
import { RequestParams } from "../types/express/RequestParams.ts";

const templateRouter = Router();
const templateController = new TemplateController();

templateRouter.param("id", templateController.handleId);

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
