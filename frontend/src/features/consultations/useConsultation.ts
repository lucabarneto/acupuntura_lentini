/* eslint-disable @typescript-eslint/no-explicit-any */

import * as slice from "./consultationsSlice.ts";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/store.ts";
import { RootState } from "../../app/store.ts";
import { useEffect } from "react";
import { SelectOptions } from "../../components/ui/Input/input.types.ts";
import { IConsultationForm } from "./types/consultation.types.ts";

type DispatchCallback = (arg: any) => void;

export const useTemplate = (id: string = "") => {
  const dispatch = useAppDispatch();
  const allConsulations = useSelector(slice.selectAll);
  const consultation = useSelector((state: RootState) =>
    slice.selectById(state, id)
  );

  useEffect(() => {
    dispatch(slice.getAllConsultations());
  }, [dispatch]);

  const TemplateSelectOptions: SelectOptions[] = allConsulations.map(
    (consultations) => {
      return {
        label: `Sesión del ${consultation.date}`,
        value: consultations._id,
      };
    }
  );

  const addTemplate = (body: IConsultationForm, callback?: DispatchCallback) =>
    dispatch(slice.addConsultation(body)).unwrap().then(callback);

  return {
    allConsulations,
    consultation,
    TemplateSelectOptions,
    addTemplate,
  };
};
