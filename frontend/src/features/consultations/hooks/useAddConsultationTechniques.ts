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
  const templateHook = useTemplate();
  const resourceHook = useResource();
  const { setNavigationState, extraData } = useAppNavigate();
  const consultationHook = useConsultation(extraData.consultationId);
  const { confirmLeaveAddFlow, leaveAddFlow, leaveAddFlowModal } = useAddFlow();
  const consultationTechniques = useConsultationTechniques();
  const form = useForm(initialForm);
  const { formData } = form;
  const formId = "add-consultation-form";

  const navigationStateOptions = {
    consultationId: consultationHook.entityData.consultation._id,
    chiefComplaintId:
      consultationHook.entityData.consultation.chief_complaint._id,
    patientId: consultationHook.entityData.consultation.patient._id,
  };

  useEffect(() => {
    if (formData.isSubmittable) {
      consultationHook.crudMethods.addConsultationsTechniques(
        {
          consultation: consultationHook.entityData.consultation,
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
      templateSelectOptions: templateHook.entityData.templateSelectOptions,
      resources: resourceHook.entityData.allResources,
    },
    consultationTechniques,
  };
};
