import { AddHeader } from "../../../components/ui/AddHeader";
import { SelectOptions } from "../../../components/ui/Input/input.types";
import { Modal } from "../../../components/ui/Modal";
import { AddReportForm } from "../../../features/reports/components/AddReportForm";
import { useAddReport } from "../../../features/reports/hooks/useAddReport";
import { IReportForm } from "../../../features/reports/types/report.types";

const initialForm: IReportForm = {
  creation_date: 0,
  diagnosis: "",
  treatment: "",
  last_recorded_evolution: "",
  initial_patient_tongue: "",
  last_recorded_patient_tongue: "",
  patient: "",
  chief_complaint: "",
};

export const AddReport = () => {
  const { addNavigation, addForm } = useAddReport(initialForm);

  return (
    <section className="details-section add-report-pane">
      <AddHeader
        title="Añadir Reporte"
        closeEvent={addNavigation.openLeaveModal}
        formId={addForm.formId}
      />
      <div className="add-content-container">
        <AddReportForm
          form={addForm.form}
          formId={addForm.formId}
          patientSelectOptions={addForm.patientSelectOptions as SelectOptions[]}
        />
        <p className="required-fields-tip">
          Completa todos los <strong>campos requeridos</strong> (<b>*</b>) para
          poder agregar a la persona paciente al sistema
        </p>
      </div>
      <Modal
        ref={addNavigation.leaveModal}
        title="Salir de añadir motivo de consulta"
        text="Se perdera todo el progreso hecho. ¿Estás seguro que quieres salir?"
        buttonConfirmLabel="Salir"
        cancelEvent={addNavigation.closeLeaveModal}
        confirmEvent={() => addNavigation.leaveFlow()}
      />
    </section>
  );
};
