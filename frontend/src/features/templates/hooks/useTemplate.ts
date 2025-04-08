/* eslint-disable @typescript-eslint/no-explicit-any */

import * as slice from "../services/templatesSlice.ts";
import * as thunk from "../services/templatesThunk.ts";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../app/store.ts";
import { RootState } from "../../../app/store.ts";
import { useEffect } from "react";
import { SelectOptions } from "../../../components/ui/Input/input.types.ts";
import { ITemplate, ITemplateForm } from "../types/template.types.ts";

type DispatchCallback = (arg: any) => void;

export const useTemplate = (id: string = "") => {
  const dispatch = useAppDispatch();
  const allTemplates = useSelector(slice.selectAll);
  const template = useSelector((state: RootState) =>
    slice.selectById(state, id)
  );

  useEffect(() => {
    dispatch(thunk.getAllTemplates());
  }, [dispatch]);

  const templateSelectOptions: SelectOptions[] = allTemplates.map(
    (template) => {
      return {
        label: template.title,
        value: template._id,
        extra: template.resources,
      };
    }
  );

  const getTemplateById = (id: string): Promise<ITemplate | undefined> =>
    dispatch(thunk.getTemplateById(id))
      .unwrap()
      .then((res) => res);

  const addTemplate = (body: ITemplateForm, callback?: DispatchCallback) =>
    dispatch(thunk.addTemplate(body)).unwrap().then(callback);

  const updateTemplate = (body: ITemplate, callback?: DispatchCallback) =>
    dispatch(thunk.updateTemplate(body)).unwrap().then(callback);

  const deleteTemplate = (id: string, callback?: DispatchCallback) =>
    dispatch(thunk.deleteTemplate(id)).then(callback);

  const createURLName = (template: ITemplate) =>
    `${template.title.split(" ").join("_")}`;

  return {
    crudMethods: {
      getTemplateById,
      addTemplate,
      updateTemplate,
      deleteTemplate,
    },
    utilityMethods: {
      createURLName,
    },
    entityData: {
      allTemplates,
      template,
      templateSelectOptions,
    },
  };
};
