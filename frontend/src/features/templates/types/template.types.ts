import { IResource } from "../../resources/types/resource.types";

export type ITemplate = {
  _id: string;
  title: string;
  description: string;
  resources: ResourceRef[];
};

type ResourceRef = {
  resource: IResource;
};

export type ITemplateForm = Omit<ITemplate, "_id">;
