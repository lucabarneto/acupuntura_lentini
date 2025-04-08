import { RootState } from "../../../app/store";
import * as thunk from "./chiefComplaintsThunk";
import { IChiefComplaint } from "../types/chief_complaint.types";
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const chiefComplaintsAdapter = createEntityAdapter({
  selectId: (chief_complaint: IChiefComplaint) => chief_complaint._id,
});

const initialState = chiefComplaintsAdapter.getInitialState<{
  loading: "idle" | "pending";
  activeRequestId: string | null;
  previousCrudAction: null | "get" | "post" | "put" | "delete";
}>({
  loading: "idle",
  activeRequestId: null,
  previousCrudAction: null,
});

const chiefComplaintsSlice = createSlice({
  name: "chief_complaints",
  initialState,
  reducers: {},
  selectors: {
    selectByPatient: (state, patient) =>
      Object.values(state.entities).filter(
        (entity) => entity.patient === patient
      ),
  },
  extraReducers: (builder) => {
    builder.addCase(thunk.getAllChiefComplaints.pending, (state, action) => {
      state.loading = "pending";
      state.activeRequestId = action.meta.requestId;
    });

    builder.addCase(thunk.getAllChiefComplaints.fulfilled, (state, action) => {
      state.loading = "idle";
      state.activeRequestId = null;
      state.previousCrudAction = "get";
      chiefComplaintsAdapter.setAll(state, action.payload!);
    });

    builder.addCase(thunk.getChiefComplaintById.pending, (state, action) => {
      state.loading = "pending";
      state.activeRequestId = action.meta.requestId;
    });

    builder.addCase(thunk.getChiefComplaintById.fulfilled, (state) => {
      state.loading = "idle";
      state.activeRequestId = null;
      state.previousCrudAction = "get";
    });

    builder.addCase(thunk.addChiefComplaint.pending, (state, action) => {
      state.loading = "pending";
      state.activeRequestId = action.meta.requestId;
    });

    builder.addCase(thunk.addChiefComplaint.fulfilled, (state, action) => {
      state.loading = "idle";
      state.activeRequestId = null;
      state.previousCrudAction = "post";
      chiefComplaintsAdapter.addOne(state, action.payload!);
    });

    builder.addCase(thunk.updateChiefComplaint.pending, (state, action) => {
      state.loading = "pending";
      state.activeRequestId = action.meta.requestId;
    });

    builder.addCase(thunk.updateChiefComplaint.fulfilled, (state, action) => {
      state.loading = "idle";
      state.activeRequestId = null;
      state.previousCrudAction = "put";
      chiefComplaintsAdapter.setOne(state, action.payload!);
    });

    builder.addCase(thunk.deleteChiefComplaint.pending, (state, action) => {
      state.loading = "pending";
      state.activeRequestId = action.meta.requestId;
    });

    builder.addCase(thunk.deleteChiefComplaint.fulfilled, (state, action) => {
      state.loading = "idle";
      state.activeRequestId = null;
      state.previousCrudAction = "delete";
      chiefComplaintsAdapter.removeOne(state, action.meta.arg);
    });
  },
});

export const { selectById, selectAll } =
  chiefComplaintsAdapter.getSelectors<RootState>(
    (state) => state.chief_complaints
  );

export const { selectByPatient } = chiefComplaintsSlice.selectors;

export const chiefComplaintsReducer = chiefComplaintsSlice.reducer;
