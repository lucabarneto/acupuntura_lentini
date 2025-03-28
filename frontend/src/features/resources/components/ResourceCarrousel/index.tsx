import "./ResourceCarrousel.css";
import { UseForm } from "../../../../hooks/useForm";
import { ITemplateForm } from "../../../templates/types/template.types";
import { IResource } from "../../types/resource.types";
import { ResourceCheckboxCard } from "../ResourceCheckboxCard";

type Props = {
  resources: IResource[];
  formId: string;
  formData: UseForm<ITemplateForm>;
};
export const ResourceCarrousel = (props: Props) => {
  const { resources, formId, formData } = props;

  return (
    <>
      <h3>Seleccionar recursos *</h3>
      <div className="resource-carrousel">
        {resources.map((resource) => (
          <ResourceCheckboxCard
            key={resource._id}
            resource={resource}
            formId={formId}
            changeEvent={formData.formMethods.handleChange}
          />
        ))}
      </div>
    </>
  );
};
