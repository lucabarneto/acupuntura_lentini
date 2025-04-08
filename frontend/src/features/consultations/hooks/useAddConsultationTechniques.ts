import { useEffect } from "react";
import { useAddFlow } from "../../../hooks/useAddFlow";
import { useAppNavigate } from "../../../hooks/useAppNavigate";
import { useForm } from "../../../hooks/useForm";
import {
  AnyObject,
  AnyStringArrayObject,
  AnyStringObject,
} from "../../../types/general.types";
import { useResource } from "../../resources/hooks/useResource";
import { useTemplate } from "../../templates/hooks/useTemplate";
import { useConsultation } from "./useConsultation";
import { useConsultationTechniques } from "./useConsultationTechniques";
import { AddHookReturnTypeWithEntityData } from "../../../types/add.feature.types";
import { IConsultation } from "../types/consultation.types";

export const useAddConsultationTechniques = (
  initialForm: AnyObject
): AddHookReturnTypeWithEntityData<AnyObject, IConsultation> => {
  const { setNavigationState, extraData } = useAppNavigate();
  const { confirmLeaveAddFlow, leaveAddFlow, leaveAddFlowModal } = useAddFlow();
  const templateHook = useTemplate();
  const resourceHook = useResource();
  const consultationHook = useConsultation(extraData.consultationId);
  const { consultation } = consultationHook.entityData;
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
      consultationHook.crudMethods.addConsultationsTechniques(
        {
          consultation: consultation,
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

  const leaveFlow = (extra?: AnyStringObject) =>
    leaveAddFlow(
      leaveAddFlowModal.state!,
      setNavigationState("keep", "add", extra)
    );

  return {
    addNavigation: {
      leaveModal: leaveAddFlowModal.modal,
      leaveFlow,
      openLeaveModal: confirmLeaveAddFlow,
      closeLeaveModal: leaveAddFlowModal.closeModal,
    },
    addForm: {
      form,
      formId,
      templateSelectOptions: templateHook.entityData.templateSelectOptions,
      resources: resourceHook.entityData.allResources,
      consultationTechniques,
    },
    entityData: {
      entity: consultation,
      entityId: consultation._id,
    },
  };
};
