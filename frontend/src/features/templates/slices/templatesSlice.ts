import { RootState } from "../../../app/store";
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { ITemplate } from "../types/template.types";
import { templatesAPI } from "../services/templatesAPI";

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
        console.log("Fetch to server was cancelled for chief_complaint entity");
        return false;
      }
    },
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
  },
});

export const { selectById, selectAll } =
  templatesAdapter.getSelectors<RootState>((state) => state.templates);

export const templatesReducer = templatesSlice.reducer;
