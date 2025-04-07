import { useEffect } from "react";
import { useAddFlow } from "../../../hooks/useAddFlow";
import { useAppNavigate } from "../../../hooks/useAppNavigate";
import { useForm } from "../../../hooks/useForm";
import { IPatientForm } from "../types/patient.types";
import { usePatient } from "./usePatient";

export const useAddPatient = (initialForm: IPatientForm) => {
  const { leaveAddFlowModal, confirmLeaveAddFlow, leaveAddFlow } = useAddFlow();
  const { addPatient, createURLName } = usePatient();
  const { setNavigationState } = useAppNavigate();
  const form = useForm(initialForm);
  const formId = "add-patient-form";

  useEffect(() => {
    if (form.formData.isSubmittable)
      addPatient(form.formData.fields, (patient) => {
        leaveAddFlow(
          `/patients/${createURLName(patient)}`,
          setNavigationState("keep", "patient", { patientId: patient._id })
        );
      });
  }, [form.formData.isSubmittable]);

  return {
    navigation: {
      leaveAddFlowModal,
      leaveAddFlow,
      confirmLeaveAddFlow,
      setNavigationState,
    },
    addForm: {
      form,
      formId,
    },
  };
};
