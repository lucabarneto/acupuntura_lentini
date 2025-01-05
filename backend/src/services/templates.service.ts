import ITemplate from "../interfaces/ITemplate.interface.ts";
import { templateDAO } from "../database/templates.dao.ts";
import { BaseService } from "./base.service.ts";

class TemplateService extends BaseService<ITemplate, typeof templateDAO> {}

export const templateService = new TemplateService(templateDAO);
