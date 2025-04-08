import { useEffect } from "react";
import { useAddFlow } from "../../../hooks/useAddFlow";
import { useAppNavigate } from "../../../hooks/useAppNavigate";
import { useForm } from "../../../hooks/useForm";
import { usePatient } from "../../patients/hooks/usePatient";
import { IChiefComplaintForm } from "../types/chief_complaint.types";
import { useChiefComplaint } from "./useChiefComplaint";
import { AddHookReturnType } from "../../../types/add.feature.types";
import { AnyStringObject } from "../../../types/general.types";

export const useAddChiefComplaint = (
  initialForm: IChiefComplaintForm
): AddHookReturnType<IChiefComplaintForm> => {
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
      patientSelectOptions: entityData.patientSelectOptions,
    },
  };
};
