import { RootState } from "../../../app/store";
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { IConsultation, IConsultationForm } from "../types/consultation.types";
import { consultationsAPI } from "./consultationsAPI";
import { AnyStringArrayObject } from "../../../types/general.types";

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
        return false;
      }
    },
  }
);

export const addConsultation = createAsyncThunk(
  "consultations/addConsultation",
  async (body: IConsultationForm) => {
    try {
      const newConsultation = await consultationsAPI.addEntity(body, true);
      return newConsultation;
    } catch (err) {
      console.log(err);
    }
  }
);

export const addConsultationTechniques = createAsyncThunk(
  "consultations/addConsultationsTechniques",
  async (data: {
    consultation: IConsultation;
    techniques: AnyStringArrayObject;
  }) => {
    try {
      const result = await consultationsAPI.addConsultationTechniques(
        data.consultation,
        data.techniques
      );
      return result;
    } catch (err) {
      console.log(err);
    }
  }
);

export const updateConsultation = createAsyncThunk(
  "consultations/updateConsultation",
  async (consultation: IConsultation) => {
    try {
      const result = await consultationsAPI.updateEntity(
        consultation._id,
        consultation
      );
      return result as IConsultation;
    } catch (err) {
      console.error(err);
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
      state.previousCrudAction = "post";
      consultationsAdapter.addOne(state, action.payload!);
    });

    builder.addCase(addConsultationTechniques.pending, (state, action) => {
      state.loading = "pending";
      state.activeRequestId = action.meta.requestId;
    });

    builder.addCase(addConsultationTechniques.fulfilled, (state, action) => {
      state.loading = "idle";
      state.activeRequestId = null;
      state.previousCrudAction = "put";
      consultationsAdapter.setOne(state, action.payload!);
    });

    builder.addCase(updateConsultation.pending, (state, action) => {
      state.loading = "pending";
      state.activeRequestId = action.meta.requestId;
    });

    builder.addCase(updateConsultation.fulfilled, (state, action) => {
      state.loading = "idle";
      state.activeRequestId = null;
      state.previousCrudAction = "put";
      consultationsAdapter.setOne(state, action.payload!);
    });
  },
});

export const { selectById, selectAll } =
  consultationsAdapter.getSelectors<RootState>((state) => state.consultations);

export const consultationsReducer = consultationsSlice.reducer;
