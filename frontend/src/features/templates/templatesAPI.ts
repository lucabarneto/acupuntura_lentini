import { ITemplate, ITemplateDTO } from "./types/template.types";
import { API } from "../../app/api.ts";

const URL = "http://localhost:8080/api/templates";

class TemplatesAPI extends API<ITemplate, ITemplateDTO> {}

export const templatesAPI = new TemplatesAPI(URL);
