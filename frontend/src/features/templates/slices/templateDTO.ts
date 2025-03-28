import { ITemplateNoId, ITemplateForm } from "../types/template.types";

export class TemplateDTO {
  static adapt(template: ITemplateForm): ITemplateNoId {
    const resources = template.resources.map((resource) => {
      return { resource };
    });

    return { ...template, resources };
  }
}
