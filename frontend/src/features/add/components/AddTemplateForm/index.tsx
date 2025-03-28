import "./AddTemplateForm.css";
import { TextInput } from "../../../../components/ui/Input/Text";
import { TextArea } from "../../../../components/ui/Input/TextArea";
import { UseForm } from "../../../../hooks/useForm";
import { ResourceCarrousel } from "../../../resources/components/ResourceCarrousel";
import { IResource } from "../../../resources/types/resource.types";
import { ITemplateForm } from "../../../templates/types/template.types";

type Props = {
  formId: string;
  formData: UseForm<ITemplateForm>;
  resources: IResource[];
};

export const AddTemplateForm = (props: Props) => {
  const { formId, formData, resources } = props;
  const { form, formMethods } = formData;

  return (
    <>
      <form id={formId} onSubmit={formMethods.handleSubmit} className={formId}>
        <TextInput
          id="title"
          label="Título *"
          type="text"
          value={form.fields.title}
          error={form.errors.title}
          changeEvent={(e) => formMethods.handleChange(e)}
          blurEvent={formMethods.handleBlur}
          required
        />
        <TextArea
          id="description"
          label="Descripción"
          value={form.fields.description}
          error={form.errors.description}
          changeEvent={(e) => formMethods.handleChange(e)}
        />
        <ResourceCarrousel
          formId={formId}
          formData={formData}
          resources={resources}
        />
      </form>
    </>
  );
};
