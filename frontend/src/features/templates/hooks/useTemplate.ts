import * as slice from "../slices/templatesSlice";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../app/store";
import { RootState } from "../../../app/store";
import { useEffect } from "react";
import { SelectOptions } from "../../../components/ui/Input/input.types.ts";

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

  return {
    allTemplates,
    template,
    TemplateSelectOptions,
  };
};
