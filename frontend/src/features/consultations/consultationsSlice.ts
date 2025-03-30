import { RootState } from "../../app/store";
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { IConsultation, IConsultationForm } from "./types/consultation.types";
import { consultationsAPI } from "./consultationsAPI";
import { ConsultationDTO } from "./consultationsDTO";

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

export const getAllConsultations = createAsyncThunk<
  IConsultation[] | undefined,
  undefined,
  { state: RootState }
>(
  "consultations/getAllConsulations",
  async () => {
    try {
      const consultations = await consultationsAPI.getAllEntities();
      return consultations as IConsultation[];
    } catch (err) {
      console.log(err);
    }
  },
  {
    condition: (arg: undefined, { getState }) => {
      const { consultations } = getState();

      if (
        consultations.ids.length !== 0 &&
        consultations.previousCrudAction !== null
      ) {
        console.log("Fetch to server was cancelled for template entity");
        return false;
      }
    },
  }
);

export const addConsultation = createAsyncThunk(
  "consultations/addConsultation",
  async (body: IConsultationForm) => {
    try {
      const template = ConsultationDTO.adapt(body);
      const newChiefComplaint = await consultationsAPI.addEntity(template);
      return newChiefComplaint;
    } catch (err) {
      console.log(err);
    }
  }
);

const consultationsSlice = createSlice({
  name: "consultations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllConsultations.pending, (state, action) => {
      state.loading = "pending";
      state.activeRequestId = action.meta.requestId;
    });

    builder.addCase(getAllConsultations.fulfilled, (state, action) => {
      state.loading = "idle";
      state.activeRequestId = null;
      state.previousCrudAction = "get";
      consultationsAdapter.setAll(state, action.payload!);
    });

    builder.addCase(addConsultation.pending, (state, action) => {
      state.loading = "pending";
      state.activeRequestId = action.meta.requestId;
    });

    builder.addCase(addConsultation.fulfilled, (state, action) => {
      state.loading = "idle";
      state.activeRequestId = null;
      state.previousCrudAction = "get";
      consultationsAdapter.addOne(state, action.payload!);
    });
  },
});

export const { selectById, selectAll } =
  consultationsAdapter.getSelectors<RootState>((state) => state.consultations);

export const consultationsReducer = consultationsSlice.reducer;
