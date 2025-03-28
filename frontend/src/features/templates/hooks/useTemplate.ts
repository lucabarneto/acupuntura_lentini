/* eslint-disable @typescript-eslint/no-explicit-any */

import * as slice from "../slices/templatesSlice";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../app/store";
import { RootState } from "../../../app/store";
import { useEffect } from "react";
import { SelectOptions } from "../../../components/ui/Input/input.types.ts";
import { ITemplateForm } from "../types/template.types.ts";

type DispatchCallback = (arg: any) => void;

export const useTemplate = (id: string = "") => {
  const dispatch = useAppDispatch();
  const allTemplates = useSelector(slice.selectAll);
  const template = useSelector((state: RootState) =>
    slice.selectById(state, id)
  );

  useEffect(() => {
    dispatch(slice.getAllTemplates());
  }, [dispatch]);

  const TemplateSelectOptions: SelectOptions[] = allTemplates.map(
    (template) => {
      return {
        label: template.title,
        value: template._id,
      };
    }
  );

  const addTemplate = (body: ITemplateForm, callback?: DispatchCallback) =>
    dispatch(slice.addTemplate(body)).unwrap().then(callback);

  return {
    allTemplates,
    template,
    TemplateSelectOptions,
    addTemplate,
  };
};
