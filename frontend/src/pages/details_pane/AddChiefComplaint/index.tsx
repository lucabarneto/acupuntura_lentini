import { Modal } from "../../../components/ui/Modal";
import { AddChiefComplaintForm } from "../../../features/chief_complaints/components/AddChiefComplaintForm";
import { AddHeader } from "../../../components/ui/AddHeader";
import { IChiefComplaintForm } from "../../../features/chief_complaints/types/chief_complaint.types";
import "./AddChiefComplaint.css";
import { useAddChiefComplaint } from "../../../features/chief_complaints/hooks/useAddChiefComplaint";
import { SelectOptions } from "../../../components/ui/Input/input.types";

const initialForm: IChiefComplaintForm = {
  title: "",
  diagnosis: "",
  initial_medicine: "",
  initial_sleep_condition: "",
  patient: "",
};

export const AddChiefComplaint = () => {
  const { addNavigation, addForm } = useAddChiefComplaint(initialForm);

  return (
    <section className="add-chief-complaint-pane">
      <AddHeader
        title="Añadir motivo de consulta"
        closeEvent={addNavigation.openLeaveModal}
        formId={addForm.formId}
      />
      <div className="add-content-container">
        <AddChiefComplaintForm
          form={addForm.form}
          formId={addForm.formId}
          patientOptions={addForm.patientSelectOptions as SelectOptions[]}
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
