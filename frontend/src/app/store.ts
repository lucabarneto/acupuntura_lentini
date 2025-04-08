import { configureStore } from "@reduxjs/toolkit";
import { patientsReducer } from "../features/patients/services/patientsSlice";
import { chiefComplaintsReducer } from "../features/chief_complaints/services/chiefComplaintsSlice";
import { useDispatch } from "react-redux";
import { resourcesReducer } from "../features/resources/services/resourcesSlice";
import { templatesReducer } from "../features/templates/services/templatesSlice";
import { consultationsReducer } from "../features/consultations/services/consultationsSlice";
import { reportsReducer } from "../features/reports/services/reportsSlice";

export const store = configureStore({
  reducer: {
    patients: patientsReducer,
    chief_complaints: chiefComplaintsReducer,
    resources: resourcesReducer,
    templates: templatesReducer,
    consultations: consultationsReducer,
    reports: reportsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
