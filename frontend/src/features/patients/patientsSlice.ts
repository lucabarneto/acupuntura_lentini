import { RootState } from "../../app/store";
import { IPatient } from "./IPatient";
import { patientsAPI } from "./patientsAPI";
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

export const getAllPatients = createAsyncThunk(
  "patients/getAllPatients",
  async () => {
    try {
      const patients = await patientsAPI.getAllPatients();
      return patients as IPatient[];
    } catch (err) {
      console.log(err);
    }
  }
);

const patientsAdapter = createEntityAdapter({
  selectId: (patient: IPatient) => patient._id,
});

const initialState = patientsAdapter.getInitialState<{
  loading: "idle" | "pending";
  activeRequestId: string | null;
}>({
  loading: "idle",
  activeRequestId: null,
});

const patientsSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllPatients.pending, (state, action) => {
      state.loading = "pending";
      state.activeRequestId = action.meta.requestId;
    });

    builder.addCase(getAllPatients.fulfilled, (state, action) => {
      state.loading = "idle";
      state.activeRequestId = null;
      patientsAdapter.setAll(state, action.payload!);
    });
  },
});

export const {
  selectById: selectPatientById,
  selectIds: selectPatientsIds,
  selectEntities: selectPatientEntities,
  selectAll: selectAllPatients,
  selectTotal: selectTotalPatients,
} = patientsAdapter.getSelectors<RootState>((state) => state.patients);

export const patientActions = patientsSlice.actions;
export const patientsReducer = patientsSlice.reducer;
