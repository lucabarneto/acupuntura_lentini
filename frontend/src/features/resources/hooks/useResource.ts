/* eslint-disable @typescript-eslint/no-explicit-any */

import { useSelector } from "react-redux";
import * as slice from "../services/resourcesSlice.ts";
import * as thunk from "../services/resourcesThunk.ts";
import { useAppDispatch } from "../../../app/store.ts";
import { RootState } from "../../../app/store.ts";
import { useEffect } from "react";
import { SelectOptions } from "../../../components/ui/Input/input.types.ts";
import { IResource, IResourceForm } from "../types/resource.types.ts";

type DispatchCallback = (arg: any) => void;

export const useResource = (id: string = "") => {
  const dispatch = useAppDispatch();
  const allResources = useSelector(slice.selectAll);
  const resource = useSelector((state: RootState) =>
    slice.selectById(state, id)
  );

  useEffect(() => {
    dispatch(thunk.getAllResources());
  }, [dispatch]);

  const resourceSelectOptions: SelectOptions[] = allResources.map(
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
    dispatch(thunk.getResourceById(id))
      .unwrap()
      .then((res) => res);

  const addResource = (body: IResourceForm, callback?: DispatchCallback) =>
    dispatch(thunk.addResource(body)).unwrap().then(callback);

  const updateResource = (body: IResource, callback?: DispatchCallback) =>
    dispatch(thunk.updateResource(body)).unwrap().then(callback);

  const deleteResource = (id: string, callback?: DispatchCallback) =>
    dispatch(thunk.deleteResource(id)).then(callback);

  return {
    crudMethods: {
      getResourceById,
      addResource,
      updateResource,
      deleteResource,
    },
    utilityMethods: {
      createURLName,
    },
    entityData: {
      allResources,
      resource,
      resourceSelectOptions,
    },
  };
};
