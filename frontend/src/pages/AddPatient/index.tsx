import "./AddPatient.css";
import { AddHeader } from "../../features/add/components/AddHeader";
import { Modal } from "../../components/ui/Modal";
import { AddPatientForm } from "../../features/add/components/AddPatientForm";
import { IPatientForm } from "../../features/patients/types/patient.types";
import { useAdd } from "../../features/add/useAdd";
import { useEffect } from "react";
import { usePatient } from "../../features/patients/usePatient";
import { useAppNavigate } from "../../hooks/useAppNavigate";

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
  const { addPatient, createURLName } = usePatient();
  const { formData, leaveAddFlowModal, confirmLeaveAddFlow, leaveAddFlow } =
    useAdd(initialForm);
  const { form } = formData;
  const { setNavigationState } = useAppNavigate();

  useEffect(() => {
    if (form.isSubmittable)
      addPatient(form.fields, (patient) => {
        leaveAddFlow(
          `/patients/${createURLName(patient)}`,
          setNavigationState("keep", "patient", { patientId: patient._id })
        );
      });
  }, [form.isSubmittable]);

  return (
    <section className="add-patient-pane">
      <AddHeader
        title="Añadir paciente"
        closeEvent={confirmLeaveAddFlow}
        formId="add-patient-form"
      />
      <div className="add-content-container">
        <AddPatientForm formData={formData} />
        <p className="required-fields-tip">
          Completa todos los <strong>campos requeridos</strong> (<b>*</b>) para
          poder agregar a la persona paciente al sistema
        </p>
      </div>
      <Modal
        ref={leaveAddFlowModal.modal}
        title="Salir de añadir paciente"
        text="Se perdera todo el progreso hecho. ¿Estás seguro que quieres salir?"
        buttonConfirmLabel="Salir"
        cancelEvent={leaveAddFlowModal.closeModal}
        confirmEvent={() =>
          leaveAddFlow(
            leaveAddFlowModal.state!,
            setNavigationState("keep", "add")
          )
        }
      />
    </section>
  );
};
