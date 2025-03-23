import "./AddChiefComplaintForm.css";
import { SelectOptions } from "../../../../components/ui/Input/input.types";
import { SelectInput } from "../../../../components/ui/Input/Select";
import { TextInput } from "../../../../components/ui/Input/Text";
import { TextArea } from "../../../../components/ui/Input/TextArea";
import { UseForm } from "../../../../hooks/useForm";
import { IChiefComplaintForm } from "../../../chief_complaints/types/chief_complaint.types";

type Props = {
  formData: UseForm<IChiefComplaintForm>;
  formId: string;
  patientOptions: SelectOptions[];
};

export const AddChiefComplaintForm = (props: Props) => {
  const { formData, formId, patientOptions } = props;
  const { form, formMethods } = formData;

  return (
    <>
      <h2>Datos generales</h2>
      <form className={formId} id={formId} onSubmit={formMethods.handleSubmit}>
        <SelectInput
          id="patient"
          label="Paciente"
          options={patientOptions}
          error={form.errors.patient}
          changeEvent={(e) => formMethods.handleChange(e)}
          blurEvent={formMethods.handleBlur}
          required
        />
        <TextInput
          id="title"
          label="Título"
          type="text"
          value={form.fields.title}
          error={form.errors.title}
          changeEvent={(e) => formMethods.handleChange(e)}
          blurEvent={formMethods.handleBlur}
          required
        />
        <TextInput
          id="initial_medicine"
          label="Remedios"
          type="text"
          value={form.fields.initial_medicine}
          error={form.errors.initial_medicine}
          changeEvent={(e) => formMethods.handleChange(e)}
          blurEvent={formMethods.handleBlur}
          required
        />
        <TextInput
          id="initial_sleep_condition"
          label="Sueño"
          type="text"
          value={form.fields.initial_sleep_condition}
          error={form.errors.initial_sleep_condition}
          changeEvent={(e) => formMethods.handleChange(e)}
          blurEvent={formMethods.handleBlur}
          required
        />
        <TextArea
          id="diagnosis"
          label="Diagnóstico"
          value={form.fields.diagnosis}
          error={form.errors.diagnosis}
          changeEvent={(e) => formMethods.handleChange(e)}
          blurEvent={formMethods.handleBlur}
          required
        />
      </form>
    </>
  );
};
