import { ITemplateDTO, ITemplateForm } from "./types/template.types";

export class TemplateDTO {
  static adapt(template: ITemplateForm): ITemplateDTO {
    const resources = template.resources.map((resource) => {
      return { resource };
    });

    return { ...template, resources };
  }
}
