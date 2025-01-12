import { Router } from "express";
import { IResource } from "../types/mongo/IResource.ts";
import { ResourceController } from "../controllers/resources.controller.ts";
import { validateRequest } from "../middlewares/validateRequest.ts";
import { RequestParams } from "../types/express/RequestParams.ts";

export const resourceRouter = Router();
const resourceController = new ResourceController();

resourceRouter.param("id", resourceController.handleId);

resourceRouter.get("/", resourceController.getAllResources);

resourceRouter.get(
  "/:id",
  validateRequest({ params: RequestParams }),
  resourceController.getResourceById
);

resourceRouter.post(
  "/",
  validateRequest({ body: IResource }),
  resourceController.createResource
);

resourceRouter.put(
  "/:id",
  validateRequest({ params: RequestParams, body: IResource }),
  resourceController.updateResource
);

resourceRouter.delete(
  "/:id",
  validateRequest({ params: RequestParams }),
  resourceController.deleteResource
);
