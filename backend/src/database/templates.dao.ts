import { ITemplate } from "../types/mongo/ITemplate.ts";
import { TemplateModel } from "../models/template.model.ts";
import { MongoDAO } from "./mongo.dao.ts";

class TemplateDAO extends MongoDAO<ITemplate> {}

export const templateDAO = new TemplateDAO(TemplateModel);
