/* eslint-disable @typescript-eslint/no-explicit-any */

import * as slice from "../services/consultationsSlice.ts";
import * as thunk from "../services/consultationsThunk.ts";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../app/store.ts";
import { RootState } from "../../../app/store.ts";
import { useEffect } from "react";
import { SelectOptions } from "../../../components/ui/Input/input.types.ts";
import {
  IConsultation,
  IConsultationForm,
} from "../types/consultation.types.ts";
import { AnyStringArrayObject } from "../../../types/general.types.ts";

type DispatchCallback = (arg: any) => void;

export const useConsultation = (id: string = "") => {
  const dispatch = useAppDispatch();
  const allConsulations = useSelector(slice.selectAll);
  const consultation = useSelector((state: RootState) =>
    slice.selectById(state, id)
  );

  useEffect(() => {
    dispatch(thunk.getAllConsultations());
  }, [dispatch]);

  const readableDate =
    consultation && consultation.date.split("-").reverse().join("/");

  const consultationSelectOptions: SelectOptions[] | undefined =
    consultation &&
    allConsulations.map((consultations) => {
      return {
        label: `Sesión del ${readableDate}`,
        value: consultations._id,
      };
    });

  const getConsultationById = (id: string) =>
    dispatch(thunk.getConsultationById(id)).then((res) => res);

  const addConsultation = (
    body: IConsultationForm,
    callback?: DispatchCallback
  ) => dispatch(thunk.addConsultation(body)).unwrap().then(callback);

  const addConsultationsTechniques = (
    data: { consultation: IConsultation; techniques: AnyStringArrayObject },
    callback?: DispatchCallback
  ) => dispatch(thunk.addConsultationTechniques(data)).unwrap().then(callback);

  const updateConsultation = (
    body: IConsultation,
    callback?: DispatchCallback
  ) => dispatch(thunk.updateConsultation(body)).unwrap().then(callback);

  const deleteConsultation = (id: string, callback?: DispatchCallback) =>
    dispatch(thunk.deleteConsultation(id)).then(callback);

  return {
    crudMethods: {
      getConsultationById,
      addConsultation,
      addConsultationsTechniques,
      updateConsultation,
      deleteConsultation,
    },
    entityData: {
      allConsulations,
      consultation,
      consultationSelectOptions,
      readableDate,
    },
  };
};
