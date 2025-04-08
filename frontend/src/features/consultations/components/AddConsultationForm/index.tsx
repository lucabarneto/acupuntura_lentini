import "./AddConsultationForm.css";
import { SelectOptions } from "../../../../components/ui/Input/input.types";
import { SelectInput } from "../../../../components/ui/Input/Select";
import { IConsultationForm } from "../../types/consultation.types";
import { useChiefComplaint } from "../../../chief_complaints/hooks/useChiefComplaint";
import { TextInput } from "../../../../components/ui/Input/Text";
import { TextArea } from "../../../../components/ui/Input/TextArea";
import { FileInput } from "../../../../components/ui/Input/File";
import { FormProps } from "../../../../types/general.types";

type Props = FormProps<IConsultationForm> & {
  patientSelectOptions: SelectOptions[];
};

export const AddConsultationForm = (props: Props) => {
  const { formId, form, patientSelectOptions } = props;
  const { formData, formMethods } = form;
  const { utilityMethods } = useChiefComplaint();

  return (
    <form id={formId} className={formId} onSubmit={formMethods.handleSubmit}>
      <SelectInput
        label="Paciente"
        id="patient"
        options={patientSelectOptions}
        error={formData.errors.patient}
        changeEvent={(e) => formMethods.handleChange(e)}
        blurEvent={formMethods.handleBlur}
        required
      />
      <SelectInput
        label="Motivo de consulta"
        id="chief_complaint"
        options={utilityMethods.getChiefComplaintSelectOptions(
          formData.fields.patient
        )}
        error={formData.errors.patient}
        changeEvent={(e) => formMethods.handleChange(e)}
        blurEvent={formMethods.handleBlur}
        required
        disabled={formData.fields.patient.length === 0 ? true : undefined}
      />

      <TextInput
        label="Fecha"
        id="date"
        type="date"
        value={formData.fields.date}
        error={formData.errors.date}
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
        value={formData.fields.treatment}
        error={formData.errors.treatment}
        changeEvent={(e) => formMethods.handleChange(e)}
        blurEvent={formMethods.handleBlur}
      />
      <TextArea
        label="Evolución del paciente"
        id="evolution"
        value={formData.fields.evolution}
        error={formData.errors.evolution}
        changeEvent={(e) => formMethods.handleChange(e)}
        blurEvent={formMethods.handleBlur}
      />
    </form>
  );
};
