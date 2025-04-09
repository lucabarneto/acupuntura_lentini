import "./AddReportForm.css";
import { SelectOptions } from "../../../../components/ui/Input/input.types";
import { SelectInput } from "../../../../components/ui/Input/Select";
import { TextArea } from "../../../../components/ui/Input/TextArea";
import { FormProps } from "../../../../types/general.types";
import { useChiefComplaint } from "../../../chief_complaints/hooks/useChiefComplaint";
import { IReportForm } from "../../types/report.types";

type Props = FormProps<IReportForm> & {
  patientSelectOptions: SelectOptions[];
};

export const AddReportForm = (props: Props) => {
  const { form, formId, patientSelectOptions } = props;
  const { formData } = form;
  const { handleSubmit, handleChange, handleBlur } = form.formMethods;
  const { utilityMethods } = useChiefComplaint();
  return (
    <form onSubmit={handleSubmit} id={formId} className={formId}>
      <SelectInput
        label="Paciente"
        id="patient"
        options={patientSelectOptions}
        error={formData.errors.patient}
        changeEvent={(e) => handleChange(e)}
        blurEvent={handleBlur}
        required
      />
      <SelectInput
        label="Motivo de consulta"
        id="chief_complaint"
        options={utilityMethods.getChiefComplaintSelectOptions(
          formData.fields.patient
        )}
        error={formData.errors.patient}
        changeEvent={(e) => handleChange(e)}
        blurEvent={handleBlur}
        required
        disabled={formData.fields.patient.length === 0 ? true : undefined}
      />
      <TextArea
        label="Diagnostico"
        id="diagnosis"
        value={formData.fields.diagnosis}
        error={formData.errors.diagnosis}
        changeEvent={(e) => handleChange(e)}
        blurEvent={handleBlur}
        required
      />
      <TextArea
        label="Tratamiento"
        id="treatment"
        value={formData.fields.treatment}
        error={formData.errors.treatment}
        changeEvent={(e) => handleChange(e)}
        blurEvent={handleBlur}
        required
      />
      <TextArea
        label="Evolución del paciente"
        id="last_recorded_evolution"
        value={formData.fields.last_recorded_evolution}
        error={formData.errors.last_recorded_evolution}
        changeEvent={(e) => handleChange(e)}
        blurEvent={handleBlur}
        required
      />
    </form>
  );
};
