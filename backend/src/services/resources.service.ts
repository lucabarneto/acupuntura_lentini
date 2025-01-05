import IResource from "../interfaces/IResource.interface.ts";
import { resourceDAO } from "../database/resources.dao.ts";
import { BaseService } from "./base.service.ts";

class ResourceService extends BaseService<IResource, typeof resourceDAO> {}

export const resourceService = new ResourceService(resourceDAO);
