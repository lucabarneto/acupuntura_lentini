import { useEffect } from "react";
import { useAddFlow } from "../../../hooks/useAddFlow";
import { useAppNavigate } from "../../../hooks/useAppNavigate";
import { useForm } from "../../../hooks/useForm";
import { useResource } from "../../resources/hooks/useResource";
import { ITemplateForm } from "../types/template.types";
import { useTemplate } from "./useTemplate";

export const useAddTemplate = (initialForm: ITemplateForm) => {
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
      resources: entityData.allResources,
    },
  };
};
