import { createAsyncThunk } from "@reduxjs/toolkit";
import { IResource, IResourceForm } from "../types/resource.types";
import { resourcesAPI } from "./resourcesAPI";
import { RootState } from "../../../app/store";

export const getAllResources = createAsyncThunk<
  IResource[] | undefined,
  undefined,
  { state: RootState }
>(
  "resources/getAllResources",
  async () => {
    try {
      const result = await resourcesAPI.getAllEntities();
      return result as IResource[];
    } catch (err) {
      console.log(err);
    }
  },
  {
    condition: (arg: undefined, { getState }) => {
      const { resources } = getState();

      if (resources.ids.length !== 0 && resources.previousCrudAction !== null) {
        return false;
      }
    },
  }
);

export const getResourceById = createAsyncThunk(
  "resources/getResourceById",
  async (id: string) => {
    try {
      const result = await resourcesAPI.getEntityById(id);
      return result as IResource;
    } catch (error) {
      console.error(error);
    }
  }
);

export const addResource = createAsyncThunk(
  "resources/addResource",
  async (body: IResourceForm) => {
    try {
      const result = await resourcesAPI.addEntity(body, true);
      return result as IResource;
    } catch (err) {
      console.log(err);
    }
  }
);

export const updateResource = createAsyncThunk(
  "resources/updateResource",
  async (data: IResource) => {
    try {
      const result = await resourcesAPI.updateEntity(data._id, data);
      return result as IResource;
    } catch (err) {
      console.error(err);
    }
  }
);

export const deleteResource = createAsyncThunk(
  "resources/deleteResource",
  async (id: string) => {
    try {
      const result = await resourcesAPI.deleteEntity(id);
      return result;
    } catch (err) {
      console.error(err);
    }
  }
);
