import { ITemplate, ITemplateDTO } from "../types/template.types";
import { API } from "../../../app/api.ts";
import { BASEURL } from "../../../utils/axios.ts";

const URL = BASEURL + "/api/templates";

class TemplatesAPI extends API<ITemplate, ITemplateDTO, ITemplate> {}

export const templatesAPI = new TemplatesAPI(URL);
