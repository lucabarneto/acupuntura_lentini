import { RootState } from "../../../app/store";
import * as thunk from "./consultationsThunk";
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { IConsultation } from "../types/consultation.types";

const consultationsAdapter = createEntityAdapter({
  selectId: (consultation: IConsultation) => consultation._id,
});

const initialState = consultationsAdapter.getInitialState<{
  loading: "idle" | "pending";
  activeRequestId: string | null;
  previousCrudAction: null | "get" | "post" | "put" | "delete";
}>({
  loading: "idle",
  activeRequestId: null,
  previousCrudAction: null,
});

const consultationsSlice = createSlice({
  name: "consultations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(thunk.getAllConsultations.pending, (state, action) => {
      state.loading = "pending";
      state.activeRequestId = action.meta.requestId;
    });

    builder.addCase(thunk.getAllConsultations.fulfilled, (state, action) => {
      state.loading = "idle";
      state.activeRequestId = null;
      state.previousCrudAction = "get";
      consultationsAdapter.setAll(state, action.payload!);
    });

    builder.addCase(thunk.getConsultationById.pending, (state, action) => {
      state.loading = "pending";
      state.activeRequestId = action.meta.requestId;
    });

    builder.addCase(thunk.getConsultationById.fulfilled, (state) => {
      state.loading = "idle";
      state.activeRequestId = null;
      state.previousCrudAction = "get";
    });

    builder.addCase(thunk.addConsultation.pending, (state, action) => {
      state.loading = "pending";
      state.activeRequestId = action.meta.requestId;
    });

    builder.addCase(thunk.addConsultation.fulfilled, (state, action) => {
      state.loading = "idle";
      state.activeRequestId = null;
      state.previousCrudAction = "post";
      consultationsAdapter.addOne(state, action.payload!);
    });

    builder.addCase(thunk.updateConsultation.pending, (state, action) => {
      state.loading = "pending";
      state.activeRequestId = action.meta.requestId;
    });

    builder.addCase(thunk.updateConsultation.fulfilled, (state, action) => {
      state.loading = "idle";
      state.activeRequestId = null;
      state.previousCrudAction = "put";
      consultationsAdapter.setOne(state, action.payload!);
    });

    builder.addCase(thunk.deleteConsultation.pending, (state, action) => {
      state.loading = "pending";
      state.activeRequestId = action.meta.requestId;
    });

    builder.addCase(thunk.deleteConsultation.fulfilled, (state, action) => {
      state.loading = "idle";
      state.activeRequestId = null;
      state.previousCrudAction = "delete";
      consultationsAdapter.removeOne(state, action.meta.arg);
    });
  },
});

export const { selectById, selectAll } =
  consultationsAdapter.getSelectors<RootState>((state) => state.consultations);

export const consultationsReducer = consultationsSlice.reducer;
