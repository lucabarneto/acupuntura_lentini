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
  const { patient, createURLName, updatePatient } = usePatient(patientId);
  const patientURLName = createURLName(patient);
  const form = useForm(initialForm);
  const { formData } = form;
  const formId = "add-bazi-table-form";

  useEffect(() => {
    if (formData.isSubmittable) {
      const updatedPatient = { ...patient, bazi_table: formData.fields };

      updatePatient(updatedPatient, () => {
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
      patient,
      patientURLName,
    },
  };
};
