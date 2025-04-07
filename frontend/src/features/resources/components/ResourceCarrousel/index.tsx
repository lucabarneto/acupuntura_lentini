import "./ResourceCarrousel.css";
import { IResource } from "../../types/resource.types";
import { ResourceCheckboxCard } from "../ResourceCheckboxCard";

type Props = {
  resources: IResource[];
  formId: string;
  changeEvent(e: React.ChangeEvent<HTMLInputElement>): void;
};
export const ResourceCarrousel = (props: Props) => {
  const { resources, formId, changeEvent } = props;

  return (
    <>
      <h3>Seleccionar recursos</h3>
      <div className="resource-carrousel">
        {resources.map((resource) => (
          <ResourceCheckboxCard
            key={resource._id}
            resource={resource}
            formId={formId}
            changeEvent={changeEvent}
          />
        ))}
      </div>
    </>
  );
};
