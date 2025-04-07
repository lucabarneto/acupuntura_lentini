import { Modal } from "../../../components/ui/Modal";
import { AddHeader } from "../../../components/ui/AddHeader";
import { IConsultationForm } from "../../../features/consultations/types/consultation.types";
import { AddConsultationForm } from "../../../features/consultations/components/AddConsultationForm";
import { useAddConsultation } from "../../../features/consultations/hooks/useAddConsultation";

const initialForm: IConsultationForm = {
  date: "",
  treatment: "",
  patient_tongue_image: "",
  evolution: "",
  chief_complaint: "",
  patient: "",
};

export const AddConsultation = () => {
  const { navigation, addForm } = useAddConsultation(initialForm);

  return (
    <section className="add-consultation-pane">
      <AddHeader
        title="Añadir sesión"
        closeEvent={navigation.confirmLeaveAddFlow}
        formId={addForm.formId}
      />
      <div className="add-content-container">
        <AddConsultationForm
          formId={addForm.formId}
          form={addForm.form}
          patientSelectOptions={addForm.patientSelectOptions}
        />
        <p className="required-fields-tip">
          Completa todos los <strong>campos requeridos</strong> (<b>*</b>) para
          poder agregar a la persona paciente al sistema
        </p>
      </div>
      <Modal
        ref={navigation.leaveAddFlowModal.modal}
        title="Salir de añadir sesión"
        text="Se perdera todo el progreso hecho. ¿Estás seguro que quieres salir?"
        buttonConfirmLabel="Salir"
        cancelEvent={navigation.leaveAddFlowModal.closeModal}
        confirmEvent={() =>
          navigation.leaveAddFlow(
            navigation.leaveAddFlowModal.state!,
            navigation.setNavigationState("keep", "add")
          )
        }
      />
    </section>
  );
};
