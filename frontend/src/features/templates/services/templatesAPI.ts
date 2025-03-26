import { ITemplate, ITemplateForm } from "../types/template.types";
import { API } from "../../../app/api.ts";

const URL = "http://localhost:8080/api/resources";

class TemplatesAPI extends API<ITemplate, ITemplateForm> {}

export const templatesAPI = new TemplatesAPI(URL);
