import { RootState } from "../../../app/store";
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { ITemplate, ITemplateForm } from "../types/template.types";
import { templatesAPI } from "../services/templatesAPI";
import { TemplateDTO } from "./templateDTO";

const templatesAdapter = createEntityAdapter({
  selectId: (template: ITemplate) => template._id,
});

const initialState = templatesAdapter.getInitialState<{
  loading: "idle" | "pending";
  activeRequestId: string | null;
  previousCrudAction: null | "get" | "post" | "put" | "delete";
}>({
  loading: "idle",
  activeRequestId: null,
  previousCrudAction: null,
});

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
        console.log("Fetch to server was cancelled for template entity");
        return false;
      }
    },
  }
);

export const addTemplate = createAsyncThunk(
  "templates/addTemplate",
  async (body: ITemplateForm) => {
    try {
      const template = TemplateDTO.adapt(body);
      console.log("template");
      console.log(template);
      const newChiefComplaint = await templatesAPI.addEntity(template);
      return newChiefComplaint;
    } catch (err) {
      console.log(err);
    }
  }
);

const templatesSlice = createSlice({
  name: "chief_complaints",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllTemplates.pending, (state, action) => {
      state.loading = "pending";
      state.activeRequestId = action.meta.requestId;
    });

    builder.addCase(getAllTemplates.fulfilled, (state, action) => {
      state.loading = "idle";
      state.activeRequestId = null;
      state.previousCrudAction = "get";
      templatesAdapter.setAll(state, action.payload!);
    });

    builder.addCase(addTemplate.pending, (state, action) => {
      state.loading = "pending";
      state.activeRequestId = action.meta.requestId;
    });

    builder.addCase(addTemplate.fulfilled, (state, action) => {
      state.loading = "idle";
      state.activeRequestId = null;
      state.previousCrudAction = "get";
      templatesAdapter.addOne(state, action.payload!);
    });
  },
});

export const { selectById, selectAll } =
  templatesAdapter.getSelectors<RootState>((state) => state.templates);

export const templatesReducer = templatesSlice.reducer;
