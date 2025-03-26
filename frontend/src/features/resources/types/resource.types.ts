export type IResource = {
  _id: string;
  title: string;
  description: string;
  image: string;
  input_values: string[];
};

export type IResourceNoId = Omit<IResource, "_id">;

export type IResourceForm = Omit<IResource, "_id">;
