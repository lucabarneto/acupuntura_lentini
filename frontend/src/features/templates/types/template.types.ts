import { IResource } from "../../resources/types/resource.types";

export type ITemplate = {
  _id: string;
  title: string;
  description: string;
  resources: ResourceRef[];
};
export type ITemplateNoId = Omit<ITemplate, "_id">;
type ResourceRef = {
  resource: IResource;
};

export type ITemplateForm = {
  title: string;
  description: string;
  resources: string[];
};
