import { RootState } from "../../../app/store";
import { IReport } from "../types/report.types";
import * as thunk from "./reportsThunk";
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const reportsAdapter = createEntityAdapter({
  selectId: (report: IReport) => report._id,
});

const initialState = reportsAdapter.getInitialState<{
  loading: "idle" | "pending";
  activeRequestId: string | null;
  previousCrudAction: null | "get" | "post" | "put" | "delete";
}>({
  loading: "idle",
  activeRequestId: null,
  previousCrudAction: null,
});

const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(thunk.getAllReports.pending, (state, action) => {
      state.loading = "pending";
      state.activeRequestId = action.meta.requestId;
    });

    builder.addCase(thunk.getAllReports.fulfilled, (state, action) => {
      state.loading = "idle";
      state.activeRequestId = null;
      state.previousCrudAction = "get";
      reportsAdapter.setAll(state, action.payload!);
    });

    builder.addCase(thunk.getReportById.pending, (state, action) => {
      state.loading = "pending";
      state.activeRequestId = action.meta.requestId;
    });

    builder.addCase(thunk.getReportById.fulfilled, (state) => {
      state.loading = "idle";
      state.activeRequestId = null;
      state.previousCrudAction = "get";
    });

    builder.addCase(thunk.addReport.pending, (state, action) => {
      state.loading = "pending";
      state.activeRequestId = action.meta.requestId;
    });

    builder.addCase(thunk.addReport.fulfilled, (state, action) => {
      state.loading = "idle";
      state.activeRequestId = null;
      state.previousCrudAction = "post";
      reportsAdapter.addOne(state, action.payload!);
    });

    builder.addCase(thunk.updateReport.pending, (state, action) => {
      state.loading = "pending";
      state.activeRequestId = action.meta.requestId;
    });

    builder.addCase(thunk.updateReport.fulfilled, (state, action) => {
      state.loading = "idle";
      state.activeRequestId = null;
      state.previousCrudAction = "put";
      reportsAdapter.setOne(state, action.payload!);
    });

    builder.addCase(thunk.deleteReport.pending, (state, action) => {
      state.loading = "pending";
      state.activeRequestId = action.meta.requestId;
    });

    builder.addCase(thunk.deleteReport.fulfilled, (state, action) => {
      state.loading = "idle";
      state.activeRequestId = null;
      state.previousCrudAction = "delete";
      reportsAdapter.removeOne(state, action.meta.arg);
    });
  },
});

export const { selectById, selectAll } = reportsAdapter.getSelectors<RootState>(
  (state) => state.reports
);

export const reportsReducer = reportsSlice.reducer;
