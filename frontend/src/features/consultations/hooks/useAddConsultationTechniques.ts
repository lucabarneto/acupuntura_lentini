import { useEffect } from "react";
import { useAddFlow } from "../../../hooks/useAddFlow";
import { useAppNavigate } from "../../../hooks/useAppNavigate";
import { useForm } from "../../../hooks/useForm";
import { AnyObject, AnyStringArrayObject } from "../../../types/general.types";
import { useResource } from "../../resources/hooks/useResource";
import { useTemplate } from "../../templates/hooks/useTemplate";
import { useConsultation } from "./useConsultation";
import { useConsultationTechniques } from "./useConsultationTechniques";

export const useAddConsultationTechniques = (initialForm: AnyObject) => {
  const { templateSelectOptions } = useTemplate();
  const { allResources } = useResource();
  const { setNavigationState, extraData } = useAppNavigate();
  const { consultation, addConsultationsTechniques } = useConsultation(
    extraData.consultationId
  );
  const { confirmLeaveAddFlow, leaveAddFlow, leaveAddFlowModal } = useAddFlow();
  const consultationTechniques = useConsultationTechniques();
  const form = useForm(initialForm);
  const { formData } = form;
  const formId = "add-consultation-form";

  const navigationStateOptions = {
    consultationId: consultation._id,
    chiefComplaintId: consultation.chief_complaint._id,
    patientId: consultation.patient._id,
  };

  useEffect(() => {
    if (formData.isSubmittable) {
      addConsultationsTechniques(
        {
          consultation,
          techniques: formData.fields as AnyStringArrayObject,
        },
        (consultation) => {
          leaveAddFlow(
            `/consultations/${consultation._id}`,
            setNavigationState("keep", "consultation", navigationStateOptions)
          );
        }
      );
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
    },
    entity: {
      templateSelectOptions,
      resources: allResources,
    },
    consultationTechniques,
  };
};
