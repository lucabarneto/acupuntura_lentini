import { ITemplate } from "../types/mongo/ITemplate.js";
import { TemplateModel } from "../models/template.model.js";
import { MongoDAO } from "./mongo.dao.js";

class TemplateDAO extends MongoDAO<ITemplate> {}

export const templateDAO = new TemplateDAO(TemplateModel);
