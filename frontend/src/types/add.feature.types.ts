import { UseForm } from "../hooks/useForm";
import { AnyObject, AnyStringObject } from "./general.types";

export type AddHookReturnType<F extends AnyObject> = {
  addNavigation: AddNavigation;
  addForm: AddForm<F>;
};

export type AddHookReturnTypeWithEntityData<
  F extends AnyObject,
  E extends AnyObject
> = {
  addNavigation: AddNavigation;
  addForm: AddForm<F>;
  entityData: EntityData<E>;
};

type AddNavigation = {
  leaveModal: React.RefObject<HTMLDialogElement | null>;
  openLeaveModal(e: React.MouseEvent, extra?: string): void;
  closeLeaveModal(): void;
  leaveFlow(extra?: AnyStringObject): void;
};

type AddForm<T extends AnyObject> = {
  form: UseForm<T>;
  formId: string;

  // extra information the form may need to work correctly
  [extra: string]: unknown;
};

type EntityData<E extends AnyObject> = {
  entity: E;
  entityId: string;
  entityURLName?: string;

  // extra information about the related entity
  [extra: string]: unknown;
};
