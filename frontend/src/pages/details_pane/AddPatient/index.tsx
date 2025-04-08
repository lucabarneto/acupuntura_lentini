import "./AddPatient.css";
import { AddHeader } from "../../../components/ui/AddHeader";
import { Modal } from "../../../components/ui/Modal";
import { AddPatientForm } from "../../../features/patients/components/AddPatientForm";
import { IPatientForm } from "../../../features/patients/types/patient.types";
import { useAddPatient } from "../../../features/patients/hooks/useAddPatient";

const initialForm: IPatientForm = {
  first_name: "",
  last_name: "",
  mail: "",
  tel: "",
  age: "",
  marital_status: "",
  profile_picture: "",
  birth: {
    date: "",
    time: "",
    location: "",
  },
};

export const AddPatient = () => {
  const { addForm, addNavigation } = useAddPatient(initialForm);

  return (
    <section className="add-patient-pane">
      <AddHeader
        title="Añadir paciente"
        closeEvent={addNavigation.openLeaveModal}
        formId={addForm.formId}
      />
      <div className="add-content-container">
        <AddPatientForm form={addForm.form} formId={addForm.formId} />
        <p className="required-fields-tip">
          Completa todos los <strong>campos requeridos</strong> (<b>*</b>) para
          poder agregar a la persona paciente al sistema
        </p>
      </div>
      <Modal
        ref={addNavigation.leaveModal}
        title="Salir de añadir paciente"
        text="Se perdera todo el progreso hecho. ¿Estás seguro que quieres salir?"
        buttonConfirmLabel="Salir"
        cancelEvent={addNavigation.closeLeaveModal}
        confirmEvent={() => addNavigation.leaveFlow()}
      />
    </section>
  );
};
