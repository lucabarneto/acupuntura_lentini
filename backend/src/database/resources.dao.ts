import { IResource } from "../types/mongo/IResource";
import { ResourceModel } from "../models/resource.model";
import { MongoDAO } from "./mongo.dao";

class ResourceDAO extends MongoDAO<IResource> {}

export const resourceDAO = new ResourceDAO(ResourceModel);
