import { configureStore } from "@reduxjs/toolkit";
import { patientsReducer } from "../features/patients/patientsSlice";
import { chiefComplaintsReducer } from "../features/chief_complaints/chiefComplaintsSlice";
import { useDispatch } from "react-redux";
import { resourcesReducer } from "../features/resources/resourcesSlice";
import { templatesReducer } from "../features/templates/templatesSlice";
import { consultationsReducer } from "../features/consultations/consultationsSlice";

export const store = configureStore({
  reducer: {
    patients: patientsReducer,
    chief_complaints: chiefComplaintsReducer,
    resources: resourcesReducer,
    templates: templatesReducer,
    consultations: consultationsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
