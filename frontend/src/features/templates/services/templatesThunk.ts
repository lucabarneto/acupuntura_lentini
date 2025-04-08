import { createAsyncThunk } from "@reduxjs/toolkit";
import { ITemplate, ITemplateForm } from "../types/template.types";
import { RootState } from "../../../app/store";
import { templatesAPI } from "./templatesAPI";
import { TemplateDTO } from "./templateDTO";

export const getAllTemplates = createAsyncThunk<
  ITemplate[] | undefined,
  undefined,
  { state: RootState }
>(
  "templates/getAllTemplates",
  async () => {
    try {
      const templates = await templatesAPI.getAllEntities();
      return templates as ITemplate[];
    } catch (err) {
      console.log(err);
    }
  },
  {
    condition: (arg: undefined, { getState }) => {
      const { templates } = getState();

      if (templates.ids.length !== 0 && templates.previousCrudAction !== null) {
        return false;
      }
    },
  }
);

export const getTemplateById = createAsyncThunk(
  "templates/getTemplateById",
  async (id: string) => {
    try {
      const result = await templatesAPI.getEntityById(id);
      return result as ITemplate;
    } catch (err) {
      console.log(err);
    }
  }
);

export const addTemplate = createAsyncThunk(
  "templates/addTemplate",
  async (body: ITemplateForm) => {
    try {
      const template = TemplateDTO.adapt(body);
      const newTemplate = await templatesAPI.addEntity(template);
      return newTemplate;
    } catch (err) {
      console.log(err);
    }
  }
);

export const updateTemplate = createAsyncThunk(
  "templates/updateTemplate",
  async (data: ITemplate) => {
    try {
      const result = await templatesAPI.updateEntity(data._id, data);
      return result as ITemplate;
    } catch (err) {
      console.error(err);
    }
  }
);

export const deleteTemplate = createAsyncThunk(
  "templates/deleteTemplate",
  async (id: string) => {
    try {
      const result = await templatesAPI.deleteEntity(id);
      return result;
    } catch (err) {
      console.error(err);
    }
  }
);
