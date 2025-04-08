import { useEffect } from "react";
import { useAddFlow } from "../../../hooks/useAddFlow";
import { useAppNavigate } from "../../../hooks/useAppNavigate";
import { useForm } from "../../../hooks/useForm";
import { usePatient } from "../../patients/hooks/usePatient";
import { IConsultationForm } from "../types/consultation.types";
import { useConsultation } from "./useConsultation";
import { AnyStringObject } from "../../../types/general.types";
import { AddHookReturnType } from "../../../types/add.feature.types";

export const useAddConsultation = (
  initialForm: IConsultationForm
): AddHookReturnType<IConsultationForm> => {
  const { setNavigationState } = useAppNavigate();
  const { confirmLeaveAddFlow, leaveAddFlow, leaveAddFlowModal } = useAddFlow();
  const { entityData } = usePatient();
  const { crudMethods } = useConsultation();
  const form = useForm(initialForm);
  const { formData } = form;
  const formId = "add-consultation-form";

  useEffect(() => {
    if (formData.isSubmittable) {
      crudMethods.addConsultation(formData.fields, (consultation) => {
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
  }, [formData.isSubmittable]);

  const leaveFlow = (extra?: AnyStringObject) =>
    leaveAddFlow(
      leaveAddFlowModal.state!,
      setNavigationState("keep", "add", extra)
    );

  return {
    addNavigation: {
      leaveModal: leaveAddFlowModal.modal,
      openLeaveModal: confirmLeaveAddFlow,
      closeLeaveModal: leaveAddFlowModal.closeModal,
      leaveFlow,
    },
    addForm: {
      form,
      formId,
      patientSelectOptions: entityData.patientSelectOptions,
    },
  };
};
