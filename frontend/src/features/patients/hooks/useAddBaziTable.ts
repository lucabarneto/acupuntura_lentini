import { useEffect } from "react";
import { useAddFlow } from "../../../hooks/useAddFlow";
import { useAppNavigate } from "../../../hooks/useAppNavigate";
import { useForm } from "../../../hooks/useForm";
import { BaziTableType } from "../types/bazi_table.types";
import { usePatient } from "./usePatient";

export const useAddBaziTable = (initialForm: BaziTableType) => {
  const { confirmLeaveAddFlow, leaveAddFlowModal, leaveAddFlow } = useAddFlow();
  const { extraData, appNavigate, setNavigationState } = useAppNavigate();
  const patientId = extraData.patientId;
  const { entityData, crudMethods, utilityMethods } = usePatient(patientId);
  const patientURLName = utilityMethods.createURLName(entityData.patient);
  const form = useForm(initialForm);
  const { formData } = form;
  const formId = "add-bazi-table-form";

  useEffect(() => {
    if (formData.isSubmittable) {
      const updatedPatient = {
        ...entityData.patient,
        bazi_table: formData.fields,
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
