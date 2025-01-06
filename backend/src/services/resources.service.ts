import IResource from "../interfaces/IResource.interface.ts";
import { resourceDAO } from "../database/resources.dao.ts";
import { BaseService } from "./base.service.ts";

class ResourceService extends BaseService<IResource, typeof resourceDAO> {
  findEqual = (data: IResource, resources: IResource[]): boolean =>
    resources.some(
      (resource) => resource.title.toLowerCase() === data.title.toLowerCase()
    );
}

export const resourceService = new ResourceService(resourceDAO);
