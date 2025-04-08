import { useEffect } from "react";
import { useAddFlow } from "../../../hooks/useAddFlow";
import { useAppNavigate } from "../../../hooks/useAppNavigate";
import { useForm } from "../../../hooks/useForm";
import { usePatient } from "../../patients/hooks/usePatient";
import { IConsultationForm } from "../types/consultation.types";
import { useConsultation } from "./useConsultation";

export const useAddConsultation = (initialForm: IConsultationForm) => {
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

  return {
    navigation: {
      setNavigationState,
      leaveAddFlow,
      confirmLeaveAddFlow,
      leaveAddFlowModal,
    },
    addForm: {
      form,
      formId,
      patientSelectOptions: entityData.patientSelectOptions,
    },
  };
};
