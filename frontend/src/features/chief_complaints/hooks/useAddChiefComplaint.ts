import { useEffect } from "react";
import { useAddFlow } from "../../../hooks/useAddFlow";
import { useAppNavigate } from "../../../hooks/useAppNavigate";
import { useForm } from "../../../hooks/useForm";
import { usePatient } from "../../patients/hooks/usePatient";
import { IChiefComplaintForm } from "../types/chief_complaint.types";
import { useChiefComplaint } from "./useChiefComplaint";

export const useAddChiefComplaint = (initialForm: IChiefComplaintForm) => {
  const { confirmLeaveAddFlow, leaveAddFlow, leaveAddFlowModal } = useAddFlow();
  const { entityData } = usePatient();
  const { crudMethods, utilityMethods } = useChiefComplaint();
  const { setNavigationState } = useAppNavigate();
  const form = useForm(initialForm);
  const { formData } = form;
  const formId = "add-chief-complaint-form";

  useEffect(() => {
    if (formData.isSubmittable) {
      crudMethods.addChiefComplaint(formData.fields, (chiefComplaint) => {
        leaveAddFlow(
          `/chiefcomplaints/${utilityMethods.createURLName(chiefComplaint)}`,
          setNavigationState("keep", "chiefcomplaint", {
            chiefComplaintId: chiefComplaint._id,
            patientId: formData.fields.patient,
          })
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
      patientSelectOptions: entityData.patientSelectOptions,
    },
  };
};
