import { useEffect } from "react";
import { Modal } from "../../components/ui/Modal";
import { AddHeader } from "../../features/add/components/AddHeader";
import { useAdd } from "../../features/add/useAdd";
import { usePatient } from "../../features/patients/usePatient";
import { useAppNavigate } from "../../hooks/useAppNavigate";
import { IConsultationForm } from "../../features/consultations/types/consultation.types";
import { useConsultation } from "../../features/consultations/useConsultation";
import { AddConsultationForm } from "../../features/add/components/AddConsultationForm";
import { useForm } from "../../hooks/useForm";

const initialForm: IConsultationForm = {
  date: "",
  treatment: "",
  patient_tongue_image: "",
  evolution: "",
  chief_complaint: "",
  patient: "",
};

export const AddConsultation = () => {
  const { setNavigationState } = useAppNavigate();
  const { confirmLeaveAddFlow, leaveAddFlow, leaveAddFlowModal } =
    useAdd();
  const form = useForm(initialForm);
  const { patientSelectOptions } = usePatient();
  const { addConsultation } = useConsultation();

  const formId = "add-consultation-form";

  useEffect(() => {
    if (form.formData.isSubmittable) {
      addConsultation(form.formData.fields, (consultation) => {
        leaveAddFlow(
          `/consultations/${consultation._id}`,
          setNavigationState("keep", "consultation", {
            consultationId: consultation._id,
            chiefComplaintId: consultation.chief_complaint,
            patientId: consultation.patient,
          })
        );
      });
    }
  }, [form.formData.isSubmittable]);

  return (
    <section className="add-consultation-pane">
      <AddHeader
        title="Añadir sesión"
        closeEvent={confirmLeaveAddFlow}
        formId={formId}
      />
      <div className="add-content-container">
        <AddConsultationForm
          formId={formId}
          form={form}
          patientSelectOptions={patientSelectOptions}
        />
        <p className="required-fields-tip">
          Completa todos los <strong>campos requeridos</strong> (<b>*</b>) para
          poder agregar a la persona paciente al sistema
        </p>
      </div>
      <Modal
        ref={leaveAddFlowModal.modal}
        title="Salir de añadir sesión"
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
