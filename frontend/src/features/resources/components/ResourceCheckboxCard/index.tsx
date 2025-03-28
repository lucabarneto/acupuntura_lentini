import { InputCard } from "../../../../components/ui/Card/InputCard";

import { IResource } from "../../types/resource.types";

type Props = {
  resource: IResource;
  formId: string;

  changeEvent(e: React.ChangeEvent<HTMLInputElement>): void;
};
export const ResourceCheckboxCard = (props: Props) => {
  const { resource, formId, changeEvent } = props;

  return (
    <InputCard
      image={resource.image}
      alt="Recurso"
      title={resource.title}
      id={resource.title}
      formId={formId}
      name="resources"
      value={resource._id}
      changeEvent={changeEvent}
    />
  );
};
