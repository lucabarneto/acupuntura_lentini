import { SelectOptions } from "../../../../components/ui/Input/input.types";
import { SelectInput } from "../../../../components/ui/Input/Select";
import { UseForm } from "../../../../hooks/useForm";
import { IConsultationForm } from "../../../consultations/types/consultation.types";
import "./AddConsultationForm.css";
import { useChiefComplaint } from "../../../chief_complaints/useChiefComplaint";
import { TextInput } from "../../../../components/ui/Input/Text";
import { TextArea } from "../../../../components/ui/Input/TextArea";
import { FileInput } from "../../../../components/ui/Input/File";

type Props = {
  formId: string;
  formData: UseForm<IConsultationForm>;
  patientSelectOptions: SelectOptions[];
};

export const AddConsultationForm = (props: Props) => {
  const { formId, formData, patientSelectOptions } = props;
  const { form, formMethods } = formData;

  const { getChiefComplaintSelectOptions } = useChiefComplaint();

  return (
    <form id={formId} className={formId} onSubmit={formMethods.handleSubmit}>
      <SelectInput
        label="Paciente"
        id="patient"
        options={patientSelectOptions}
        error={form.errors.patient}
        changeEvent={(e) => formMethods.handleChange(e)}
        blurEvent={formMethods.handleBlur}
        required
      />
      <SelectInput
        label="Motivo de consulta"
        id="chief_complaint"
        options={getChiefComplaintSelectOptions(form.fields.patient)}
        error={form.errors.patient}
        changeEvent={(e) => formMethods.handleChange(e)}
        blurEvent={formMethods.handleBlur}
        required
        disabled={form.fields.patient.length === 0 ? true : undefined}
      />

      <TextInput
        label="Fecha"
        id="date"
        type="date"
        value={form.fields.date}
        error={form.errors.date}
        changeEvent={(e) => formMethods.handleChange(e)}
        blurEvent={formMethods.handleBlur}
        required
      />
      <FileInput
        id="patient_tongue_image"
        form={formId}
        changeEvent={formMethods.handleChange}
      />
      <TextArea
        label="Tratamiento"
        id="treatment"
        value={form.fields.treatment}
        error={form.errors.treatment}
        changeEvent={(e) => formMethods.handleChange(e)}
        blurEvent={formMethods.handleBlur}
      />
      <TextArea
        label="Evolución del paciente"
        id="evolution"
        value={form.fields.evolution}
        error={form.errors.evolution}
        changeEvent={(e) => formMethods.handleChange(e)}
        blurEvent={formMethods.handleBlur}
      />
    </form>
  );
};
