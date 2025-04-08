import { RootState } from "../../../app/store";
import { IPatient } from "../types/patient.types";
import * as thunk from "./patientsThunk";
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const patientsAdapter = createEntityAdapter({
  selectId: (patient: IPatient) => patient._id,
  sortComparer: (a, b) => a.first_name.localeCompare(b.first_name),
});

const initialState = patientsAdapter.getInitialState<{
  loading: "idle" | "pending";
  activeRequestId: string | null;
  previousCrudAction: null | "get" | "post" | "put" | "delete";
}>({
  loading: "idle",
  activeRequestId: null,
  previousCrudAction: null,
});

const patientsSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    sortByName: (state, action) => {
      const patients = state.ids.map((id) => {
        return state.entities[id];
      });

      if (action.payload === "asc") {
        patients.sort((a, b) => a.first_name.localeCompare(b.first_name));
      } else {
        patients.sort((a, b) => b.first_name.localeCompare(a.first_name));
      }

      state.ids = patients.map((patient) => patient._id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(thunk.getAllPatients.pending, (state, action) => {
      state.loading = "pending";
      state.activeRequestId = action.meta.requestId;
    });

    builder.addCase(thunk.getAllPatients.fulfilled, (state, action) => {
      state.loading = "idle";
      state.activeRequestId = null;
      state.previousCrudAction = "get";
      patientsAdapter.setAll(state, action.payload!);
    });

    builder.addCase(thunk.getPatientById.pending, (state, action) => {
      state.loading = "pending";
      state.activeRequestId = action.meta.requestId;
    });

    builder.addCase(thunk.getPatientById.fulfilled, (state) => {
      state.loading = "idle";
      state.activeRequestId = null;
      state.previousCrudAction = "get";
    });

    builder.addCase(thunk.addPatient.pending, (state, action) => {
      state.loading = "pending";
      state.activeRequestId = action.meta.requestId;
    });

    builder.addCase(thunk.addPatient.fulfilled, (state, action) => {
      state.loading = "idle";
      state.activeRequestId = null;
      state.previousCrudAction = "post";
      patientsAdapter.addOne(state, action.payload!);
    });

    builder.addCase(thunk.updatePatient.pending, (state, action) => {
      state.loading = "pending";
      state.activeRequestId = action.meta.requestId;
    });

    builder.addCase(thunk.updatePatient.fulfilled, (state, action) => {
      state.loading = "idle";
      state.activeRequestId = null;
      state.previousCrudAction = "put";
      patientsAdapter.setOne(state, action.payload!);
    });

    builder.addCase(thunk.deletePatient.pending, (state, action) => {
      state.loading = "pending";
      state.activeRequestId = action.meta.requestId;
    });

    builder.addCase(thunk.deletePatient.fulfilled, (state, action) => {
      state.loading = "idle";
      state.activeRequestId = null;
      state.previousCrudAction = "delete";
      patientsAdapter.removeOne(state, action.meta.arg);
    });
  },
});

export const { selectById, selectAll } =
  patientsAdapter.getSelectors<RootState>((state) => state.patients);
export const { sortByName } = patientsSlice.actions;
export const patientsReducer = patientsSlice.reducer;
