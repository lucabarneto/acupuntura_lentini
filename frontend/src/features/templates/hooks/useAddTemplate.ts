import { useEffect } from "react";
import { useAddFlow } from "../../../hooks/useAddFlow";
import { useAppNavigate } from "../../../hooks/useAppNavigate";
import { useForm } from "../../../hooks/useForm";
import { useResource } from "../../resources/hooks/useResource";
import { ITemplateForm } from "../types/template.types";
import { useTemplate } from "./useTemplate";
import { AddHookReturnType } from "../../../types/add.feature.types";
import { AnyStringObject } from "../../../types/general.types";

export const useAddTemplate = (
  initialForm: ITemplateForm
): AddHookReturnType<ITemplateForm> => {
  const { setNavigationState } = useAppNavigate();
  const { confirmLeaveAddFlow, leaveAddFlow, leaveAddFlowModal } = useAddFlow();
  const { entityData } = useResource();
  const { crudMethods, utilityMethods } = useTemplate();
  const form = useForm(initialForm);
  const { formData } = form;
  const formId = "add-template-form";

  useEffect(() => {
    if (formData.isSubmittable) {
      crudMethods.addTemplate(formData.fields, (template) => {
        leaveAddFlow(
          `/templates/${utilityMethods.createURLName(template)}`,
          setNavigationState("keep", "patient", { templateId: template._id })
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
      closeLeaveModal: leaveAddFlowModal.closeModal,
      openLeaveModal: confirmLeaveAddFlow,
      leaveFlow,
    },
    addForm: {
      form,
      formId,
      resources: entityData.allResources,
    },
  };
};
