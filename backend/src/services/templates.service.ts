import { ITemplate } from "../types/mongo/ITemplate.js";
import { templateDAO } from "../database/templates.dao.js";
import { BaseService } from "./base.service.js";

const TEST_FAILED = false;
const TEST_PASSED = true;

class TemplateService extends BaseService<ITemplate> {
  findEqual = (data: ITemplate, templates: ITemplate[]): boolean => {
    let result: boolean = TEST_FAILED;

    templates.forEach((template) => {
      const test: boolean[] = [];

      for (let i = 0; i < template.resources.length; i++) {
        if (template.resources[i].resource !== data.resources[i].resource) {
          test.push(TEST_FAILED);
          break;
        }
      }

      if (!test.includes(TEST_FAILED)) result = TEST_PASSED;
    });

    return result;
  };
}

export const templateService = new TemplateService(templateDAO);
