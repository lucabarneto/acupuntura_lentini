import { RootState } from "../../../app/store";
import { IResource } from "../types/resource.types";
import * as thunk from "./resourcesThunk";
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const resourcesAdapter = createEntityAdapter({
  selectId: (resource: IResource) => resource._id,
});

const initialState = resourcesAdapter.getInitialState<{
  loading: "idle" | "pending";
  activeRequestId: string | null;
  previousCrudAction: null | "get" | "post" | "put" | "delete";
}>({
  loading: "idle",
  activeRequestId: null,
  previousCrudAction: null,
});

const resourcesSlice = createSlice({
  name: "chief_complaints",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(thunk.getAllResources.pending, (state, action) => {
      state.loading = "pending";
      state.activeRequestId = action.meta.requestId;
    });

    builder.addCase(thunk.getAllResources.fulfilled, (state, action) => {
      state.loading = "idle";
      state.activeRequestId = null;
      state.previousCrudAction = "get";
      resourcesAdapter.setAll(state, action.payload!);
    });

    builder.addCase(thunk.getResourceById.pending, (state, action) => {
      state.loading = "pending";
      state.activeRequestId = action.meta.requestId;
    });

    builder.addCase(thunk.getResourceById.fulfilled, (state) => {
      state.loading = "idle";
      state.activeRequestId = null;
      state.previousCrudAction = "get";
    });

    builder.addCase(thunk.addResource.pending, (state, action) => {
      state.loading = "pending";
      state.activeRequestId = action.meta.requestId;
    });

    builder.addCase(thunk.addResource.fulfilled, (state, action) => {
      state.loading = "idle";
      state.activeRequestId = null;
      state.previousCrudAction = "post";
      resourcesAdapter.addOne(state, action.payload!);
    });

    builder.addCase(thunk.updateResource.pending, (state, action) => {
      state.loading = "pending";
      state.activeRequestId = action.meta.requestId;
    });

    builder.addCase(thunk.updateResource.fulfilled, (state, action) => {
      state.loading = "idle";
      state.activeRequestId = null;
      state.previousCrudAction = "put";
      resourcesAdapter.setOne(state, action.payload!);
    });

    builder.addCase(thunk.deleteResource.pending, (state, action) => {
      state.loading = "pending";
      state.activeRequestId = action.meta.requestId;
    });

    builder.addCase(thunk.deleteResource.fulfilled, (state, action) => {
      state.loading = "idle";
      state.activeRequestId = null;
      state.previousCrudAction = "delete";
      resourcesAdapter.removeOne(state, action.meta.arg);
    });
  },
});

export const { selectById, selectAll } =
  resourcesAdapter.getSelectors<RootState>((state) => state.resources);

export const resourcesReducer = resourcesSlice.reducer;
