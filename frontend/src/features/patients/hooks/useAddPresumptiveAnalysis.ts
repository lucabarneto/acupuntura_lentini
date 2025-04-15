import { useEffect } from "react";
import { useAddFlow } from "../../../hooks/useAddFlow";
import { useAppNavigate } from "../../../hooks/useAppNavigate";
import { useForm } from "../../../hooks/useForm";
import { usePatient } from "./usePatient";
import { PresumptiveAnalysisType } from "../types/presumptive_analysis.types";
import { AddHookReturnTypeWithEntityData } from "../../../types/add.feature.types";
import { IPatient, IPatientUpdate } from "../types/patient.types";
import { AnyStringObject } from "../../../types/general.types";

export const useAddPresumptiveAnalysis = (
  initialForm: PresumptiveAnalysisType
): AddHookReturnTypeWithEntityData<PresumptiveAnalysisType, IPatient> => {
  const { confirmLeaveAddFlow, leaveAddFlowModal, leaveAddFlow } = useAddFlow();
  const { extraData, appNavigate, setNavigationState } = useAppNavigate();
  const patientId = extraData.patientId;
  const { entityData, utilityMethods, crudMethods } = usePatient(patientId);
  const patientURLName =
    entityData.patient && utilityMethods.createURLName(entityData.patient);
  const form = useForm(initialForm);
  const { formData } = form;
  const formId = "add-presumptive-analysis-form";

  useEffect(() => {
    if (formData.isSubmittable) {
      const updatedPatient: IPatientUpdate = {
        ...entityData.updatablePatient,
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
    },
    entityData: {
      entityId: patientId,
      entity: entityData.patient,
      entityURLName: patientURLName,
    },
  };
};
