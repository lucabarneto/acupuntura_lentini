import { Modal } from "../../components/ui/Modal";
import { AddHeader } from "../../features/add/components/AddHeader";
import { useAdd } from "../../features/add/useAdd";
import { useAppNavigate } from "../../hooks/useAppNavigate";
import { SelectTechniques } from "../../features/consultations/components/SelectTechniques";
import { useConsultationTechniques } from "../../features/consultations/useConsultationTechniques";
import { AddConsultationTechniquesForm } from "../../features/add/components/AddConsultationTechniquesForm";
import { useResource } from "../../features/resources/useResource";
import { useTemplate } from "../../features/templates/useTemplate";
import { useEffect } from "react";
import { AnyObject, AnyStringArrayObject } from "../../types/general.types";
import { useForm } from "../../hooks/useForm";
import { useConsultation } from "../../features/consultations/useConsultation";

const initialForm: AnyObject = {};

export const AddConsultationTechniques = () => {
  const { templateSelectOptions } = useTemplate();
  const { allResources } = useResource();
  const { setNavigationState, extraData } = useAppNavigate();
  const { consultation, addConsultationsTechniques } = useConsultation(
    extraData.consultationId
  );
  const { confirmLeaveAddFlow, leaveAddFlow, leaveAddFlowModal } = useAdd();
  const form = useForm(initialForm);
  const consultationTechniques = useConsultationTechniques();
  const { techniqueData } = consultationTechniques;
  const formId = "add-consultation-form";

  useEffect(() => {
    if (form.formData.isSubmittable) {
      addConsultationsTechniques(
        {
          consultation,
          techniques: form.formData.fields as AnyStringArrayObject,
        },
        (consultation) => {
          leaveAddFlow(
            `/consultations/${consultation._id}`,
            setNavigationState("keep", "consultation", {
              consultationId: consultation._id,
              chiefComplaintId: consultation.chief_complaint,
              patientId: consultation.patient,
            })
          );
        }
      );
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
        {techniqueData.techniques.length === 0 ? (
          <SelectTechniques
            consultationTechniques={consultationTechniques}
            resources={allResources}
            templateSelectOptions={templateSelectOptions}
          />
        ) : (
          <AddConsultationTechniquesForm
            consultationTechniques={consultationTechniques}
            form={form}
            formId={formId}
          />
        )}
      </div>
      <Modal
        ref={leaveAddFlowModal.modal}
        title="Salir de añadir técnicas de sesión"
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
