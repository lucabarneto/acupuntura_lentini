import { useSelector } from "react-redux";
import * as slice from "./resourcesSlice.ts";
import { useAppDispatch } from "../../app/store.ts";
import { RootState } from "../../app/store.ts";
import { useEffect } from "react";
import { SelectOptions } from "../../components/ui/Input/input.types.ts";
import { IResource } from "./types/resource.types.ts";

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

  const createURLName = (resource: IResource) =>
    `${resource.title.split(" ").join("_")}`;

  const getResourceById = (id: string) =>
    dispatch(slice.getResourceById(id))
      .unwrap()
      .then((res) => res);

  return {
    allResources,
    resource,
    ResourceSelectOptions,
    createURLName,
    getResourceById,
  };
};
