import { RootState } from "../../app/store";
import { IResource } from "./types/resource.types";
import { resourcesAPI } from "./resourcesAPI";
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

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

export const getAllResources = createAsyncThunk<
  IResource[] | undefined,
  undefined,
  { state: RootState }
>(
  "resources/getAllResources",
  async () => {
    try {
      const resources = await resourcesAPI.getAllEntities();
      return resources as IResource[];
    } catch (err) {
      console.log(err);
    }
  },
  {
    condition: (arg: undefined, { getState }) => {
      const { resources } = getState();

      if (resources.ids.length !== 0 && resources.previousCrudAction !== null) {
        console.log("Fetch to server was cancelled for chief_complaint entity");
        return false;
      }
    },
  }
);

const resourcesSlice = createSlice({
  name: "chief_complaints",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllResources.pending, (state, action) => {
      state.loading = "pending";
      state.activeRequestId = action.meta.requestId;
    });

    builder.addCase(getAllResources.fulfilled, (state, action) => {
      state.loading = "idle";
      state.activeRequestId = null;
      state.previousCrudAction = "get";
      resourcesAdapter.setAll(state, action.payload!);
    });
  },
});

export const { selectById, selectAll } =
  resourcesAdapter.getSelectors<RootState>((state) => state.resources);

export const resourcesReducer = resourcesSlice.reducer;
