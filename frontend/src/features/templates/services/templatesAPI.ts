import { ITemplate, ITemplateNoId } from "../types/template.types";
import { API } from "../../../app/api.ts";

const URL = "http://localhost:8080/api/templates";

class TemplatesAPI extends API<ITemplate, ITemplateNoId> {}

export const templatesAPI = new TemplatesAPI(URL);
