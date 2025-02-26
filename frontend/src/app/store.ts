import { configureStore } from "@reduxjs/toolkit";
import { patientsReducer } from "../features/patients/slices/patientsSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    patients: patientsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
