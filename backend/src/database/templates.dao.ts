import { ITemplate } from "../types/mongo/ITemplate";
import { TemplateModel } from "../models/template.model";
import { MongoDAO } from "./mongo.dao";

class TemplateDAO extends MongoDAO<ITemplate> {}

export const templateDAO = new TemplateDAO(TemplateModel);
