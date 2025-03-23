import { RootState } from "../../../app/store";
import {
  IChiefComplaint,
  IChiefComplaintForm,
} from "../types/chief_complaint.types";
import { chiefComplaintsAPI } from "../services/chiefComplaintsAPI";
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

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

export const getAllChiefComplaints = createAsyncThunk<
  IChiefComplaint[] | undefined,
  undefined,
  { state: RootState }
>(
  "patients/getAllPatients",
  async () => {
    try {
      const patients = await chiefComplaintsAPI.getAllChiefComplaints();
      return patients as IChiefComplaint[];
    } catch (err) {
      console.log(err);
    }
  },
  {
    condition: (arg: undefined, { getState }) => {
      const { chief_complaints } = getState();

      if (
        chief_complaints.ids.length !== 0 &&
        chief_complaints.previousCrudAction !== null
      ) {
        console.log("Fetch to server was cancelled for chief_complaint entity");
        return false;
      }
    },
  }
);

export const addChiefComplaint = createAsyncThunk(
  "patients/addPatient",
  async (body: IChiefComplaintForm) => {
    try {
      const newChiefComplaint = await chiefComplaintsAPI.addChiefComplaint(
        body
      );
      return newChiefComplaint;
    } catch (err) {
      console.log(err);
    }
  }
);

const chiefComplaintsSlice = createSlice({
  name: "chief_complaints",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllChiefComplaints.pending, (state, action) => {
      state.loading = "pending";
      state.activeRequestId = action.meta.requestId;
    });

    builder.addCase(getAllChiefComplaints.fulfilled, (state, action) => {
      state.loading = "idle";
      state.activeRequestId = null;
      state.previousCrudAction = "get";
      chiefComplaintsAdapter.setAll(state, action.payload!);
    });

    builder.addCase(addChiefComplaint.pending, (state, action) => {
      state.loading = "pending";
      state.activeRequestId = action.meta.requestId;
    });

    builder.addCase(addChiefComplaint.fulfilled, (state, action) => {
      state.loading = "idle";
      state.activeRequestId = null;
      state.previousCrudAction = "get";
      chiefComplaintsAdapter.addOne(state, action.payload!);
    });
  },
});

export const {
  selectById: selectChiefComplaintById,
  selectIds: selectChiefComplaintsIds,
  selectEntities: selectChiefComplaintEntities,
  selectAll: selectAllChiefComplaints,
  selectTotal: selectTotalChiefComplaints,
} = chiefComplaintsAdapter.getSelectors<RootState>(
  (state) => state.chief_complaints
);

export const chiefComplaintsReducer = chiefComplaintsSlice.reducer;
