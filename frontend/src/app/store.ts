import { configureStore } from "@reduxjs/toolkit";
import { patientsReducer } from "../features/patients/slices/patientsSlice";
import { chiefComplaintsReducer } from "../features/chief_complaints/slices/chief_complaint.slice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    patients: patientsReducer,
    chief_complaints: chiefComplaintsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
