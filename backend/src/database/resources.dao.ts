import IResource from "../interfaces/IResource.interface.ts";
import { ResourceModel } from "../models/resource.model.ts";
import { MongoDAO } from "./mongo.dao.ts";

class ResourceDAO extends MongoDAO<IResource, typeof ResourceModel> {}

export const resourceDAO = new ResourceDAO(ResourceModel);
