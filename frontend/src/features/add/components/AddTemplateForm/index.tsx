import "./AddTemplateForm.css";
import { TextInput } from "../../../../components/ui/Input/Text";
import { TextArea } from "../../../../components/ui/Input/TextArea";
import { ResourceCarrousel } from "../../../resources/components/ResourceCarrousel";
import { IResource } from "../../../resources/types/resource.types";
import { ITemplateForm } from "../../../templates/types/template.types";
import { FormProps } from "../../../../types/general.types";

type Props = FormProps<ITemplateForm> & {
  resources: IResource[];
};

export const AddTemplateForm = (props: Props) => {
  const { formId, form, resources } = props;
  const { formData, formMethods } = form;

  return (
    <>
      <form id={formId} onSubmit={formMethods.handleSubmit} className={formId}>
        <TextInput
          id="title"
          label="Título *"
          type="text"
          value={formData.fields.title}
          error={formData.errors.title}
          changeEvent={(e) => formMethods.handleChange(e)}
          blurEvent={formMethods.handleBlur}
          required
        />
        <TextArea
          id="description"
          label="Descripción"
          value={formData.fields.description}
          error={formData.errors.description}
          changeEvent={(e) => formMethods.handleChange(e)}
        />
        <ResourceCarrousel
          formId={formId}
          resources={resources}
          changeEvent={(e) => formMethods.handleChange(e)}
        />
      </form>
    </>
  );
};
