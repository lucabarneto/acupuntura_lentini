import { useSelector } from "react-redux";
import * as slice from "../slices/resourcesSlice.ts";
import { useAppDispatch } from "../../../app/store";
import { RootState } from "../../../app/store";
import { useEffect } from "react";
import { SelectOptions } from "../../../components/ui/Input/input.types.ts";

export const useResource = (id: string = "") => {
  const dispatch = useAppDispatch();
  const allResources = useSelector(slice.selectAll);
  const resource = useSelector((state: RootState) =>
    slice.selectById(state, id)
  );

  useEffect(() => {
    dispatch(slice.getAllResources());
  }, [dispatch]);

  const ResourceSelectOptions: SelectOptions[] = allResources.map(
    (resource) => {
      return {
        label: resource.title,
        value: resource._id,
      };
    }
  );

  return {
    allResources,
    resource,
    ResourceSelectOptions,
  };
};
