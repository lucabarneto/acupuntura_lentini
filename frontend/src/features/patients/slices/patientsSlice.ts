import { RootState } from "../../../app/store";
import { IPatient } from "../types/IPatient";
import { patientsAPI } from "../services/patientsAPI";
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

const patientsAdapter = createEntityAdapter({
  selectId: (patient: IPatient) => patient._id,
  sortComparer: (a, b) => a.first_name.localeCompare(b.first_name),
});

const initialState = patientsAdapter.getInitialState<{
  loading: "idle" | "pending";
  activeRequestId: string | null;
  previousCrudAction: null | "get" | "post" | "delete" | "put";
}>({
  loading: "idle",
  activeRequestId: null,
  previousCrudAction: null,
});

export const getAllPatients = createAsyncThunk<
  IPatient[] | undefined,
  undefined,
  { state: RootState }
>(
  "patients/getAllPatients",
  async () => {
    try {
      const patients = await patientsAPI.getAllPatients();
      return patients as IPatient[];
    } catch (err) {
      console.log(err);
    }
  },
  {
    condition: (arg: undefined, { getState }) => {
      const { patients } = getState();

      if (patients.ids.length !== 0 && patients.previousCrudAction === "get")
        return false;
    },
  }
);

export const deletePatient = createAsyncThunk(
  "patients/deletePatient",
  async (patientId: string) => {
    try {
      const result = await patientsAPI.deletePatient(patientId);
      return result;
    } catch (err) {
      console.error(err);
    }
  }
);

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
    builder.addCase(getAllPatients.pending, (state, action) => {
      state.loading = "pending";
      state.activeRequestId = action.meta.requestId;
    });

    builder.addCase(getAllPatients.fulfilled, (state, action) => {
      state.loading = "idle";
      state.activeRequestId = null;
      state.previousCrudAction = "get";
      patientsAdapter.setAll(state, action.payload!);
    });

    builder.addCase(deletePatient.pending, (state, action) => {
      state.loading = "pending";
      state.activeRequestId = action.meta.requestId;
    });

    builder.addCase(deletePatient.fulfilled, (state, action) => {
      state.loading = "idle";
      state.activeRequestId = null;
      state.previousCrudAction = "delete";
      patientsAdapter.removeOne(state, action.meta.arg);
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

export const { sortByName } = patientsSlice.actions;
export const patientsReducer = patientsSlice.reducer;
