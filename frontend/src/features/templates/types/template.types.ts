import { ResourceRef } from "../../resources/types/resource.types";

export type ITemplate = {
  _id: string;
  title: string;
  description: string;
  resources: ResourceRef[];
};

export type ITemplateNoId = Omit<ITemplate, "_id">;

export type ITemplateForm = {
  title: string;
  description: string;
  resources: string[];
};

export type ITemplateDTO = {
  title: string;
  description: string;
  resources: { resource: string }[];
};
