import "./AddChiefComplaintForm.css";
import { SelectOptions } from "../../../../components/ui/Input/input.types";
import { SelectInput } from "../../../../components/ui/Input/Select";
import { TextInput } from "../../../../components/ui/Input/Text";
import { TextArea } from "../../../../components/ui/Input/TextArea";
import { IChiefComplaintForm } from "../../../chief_complaints/types/chief_complaint.types";
import { FormProps } from "../../../../types/general.types";

type Props = FormProps<IChiefComplaintForm>  & {
  patientOptions: SelectOptions[];
};

export const AddChiefComplaintForm = (props: Props) => {
  const { form, formId, patientOptions } = props;
  const { formData, formMethods } = form;

  return (
    <>
      <h2>Datos generales</h2>
      <form className={formId} id={formId} onSubmit={formMethods.handleSubmit}>
        <SelectInput
          id="patient"
          label="Paciente"
          options={patientOptions}
          error={formData.errors.patient}
          changeEvent={(e) => formMethods.handleChange(e)}
          blurEvent={formMethods.handleBlur}
          required
        />
        <TextInput
          id="title"
          label="Título"
          type="text"
          value={formData.fields.title}
          error={formData.errors.title}
          changeEvent={(e) => formMethods.handleChange(e)}
          blurEvent={formMethods.handleBlur}
          required
        />
        <TextInput
          id="initial_medicine"
          label="Remedios"
          type="text"
          value={formData.fields.initial_medicine}
          error={formData.errors.initial_medicine}
          changeEvent={(e) => formMethods.handleChange(e)}
          blurEvent={formMethods.handleBlur}
          required
        />
        <TextInput
          id="initial_sleep_condition"
          label="Sueño"
          type="text"
          value={formData.fields.initial_sleep_condition}
          error={formData.errors.initial_sleep_condition}
          changeEvent={(e) => formMethods.handleChange(e)}
          blurEvent={formMethods.handleBlur}
          required
        />
        <TextArea
          id="diagnosis"
          label="Diagnóstico"
          value={formData.fields.diagnosis}
          error={formData.errors.diagnosis}
          changeEvent={(e) => formMethods.handleChange(e)}
          blurEvent={formMethods.handleBlur}
          required
        />
      </form>
    </>
  );
};
