import { useEffect } from "react";
import { useAddFlow } from "../../../hooks/useAddFlow";
import { useAppNavigate } from "../../../hooks/useAppNavigate";
import { useForm } from "../../../hooks/useForm";
import { usePatient } from "./usePatient";
import { PresumptiveAnalysisType } from "../types/presumptive_analysis.types";

export const useAddPresumptiveAnalysisa = (
  initialForm: PresumptiveAnalysisType
) => {
  const { confirmLeaveAddFlow, leaveAddFlowModal, leaveAddFlow } = useAddFlow();
  const { extraData, appNavigate, setNavigationState } = useAppNavigate();
  const patientId = extraData.patientId;
  const { entityData, utilityMethods, crudMethods } = usePatient(patientId);
  const patientURLName = utilityMethods.createURLName(entityData.patient);
  const form = useForm(initialForm);
  const { formData } = form;
  const formId = "add-presumptive-analysis-form";

  useEffect(() => {
    if (formData.isSubmittable) {
      const updatedPatient = {
        ...entityData.patient,
        presumptive_analysis: formData.fields,
      };

      crudMethods.updatePatient(updatedPatient, () => {
        appNavigate(
          `/patients/${patientURLName}`,
          setNavigationState("keep", "patient", { patientId })
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
    },
    entity: {
      patientId,
      patient: entityData.patient,
      patientURLName,
    },
  };
};
