import { RootState } from "../../../app/store";
import * as thunk from "./templatesThunk";
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { ITemplate } from "../types/template.types";

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

const templatesSlice = createSlice({
  name: "templates",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(thunk.getAllTemplates.pending, (state, action) => {
      state.loading = "pending";
      state.activeRequestId = action.meta.requestId;
    });

    builder.addCase(thunk.getAllTemplates.fulfilled, (state, action) => {
      state.loading = "idle";
      state.activeRequestId = null;
      state.previousCrudAction = "get";
      templatesAdapter.setAll(state, action.payload!);
    });

    builder.addCase(thunk.getTemplateById.pending, (state, action) => {
      state.loading = "pending";
      state.activeRequestId = action.meta.requestId;
    });

    builder.addCase(thunk.getTemplateById.fulfilled, (state) => {
      state.loading = "idle";
      state.activeRequestId = null;
      state.previousCrudAction = "get";
    });

    builder.addCase(thunk.addTemplate.pending, (state, action) => {
      state.loading = "pending";
      state.activeRequestId = action.meta.requestId;
    });

    builder.addCase(thunk.addTemplate.fulfilled, (state, action) => {
      state.loading = "idle";
      state.activeRequestId = null;
      state.previousCrudAction = "post";
      templatesAdapter.addOne(state, action.payload!);
    });

    builder.addCase(thunk.updateTemplate.pending, (state, action) => {
      state.loading = "pending";
      state.activeRequestId = action.meta.requestId;
    });

    builder.addCase(thunk.updateTemplate.fulfilled, (state, action) => {
      state.loading = "idle";
      state.activeRequestId = null;
      state.previousCrudAction = "put";
      templatesAdapter.setOne(state, action.payload!);
    });

    builder.addCase(thunk.deleteTemplate.pending, (state, action) => {
      state.loading = "pending";
      state.activeRequestId = action.meta.requestId;
    });

    builder.addCase(thunk.deleteTemplate.fulfilled, (state, action) => {
      state.loading = "idle";
      state.activeRequestId = null;
      state.previousCrudAction = "delete";
      templatesAdapter.removeOne(state, action.meta.arg);
    });
  },
});

export const { selectById, selectAll } =
  templatesAdapter.getSelectors<RootState>((state) => state.templates);

export const templatesReducer = templatesSlice.reducer;
