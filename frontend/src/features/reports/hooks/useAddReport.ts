import { useEffect } from "react";
import { useAddFlow } from "../../../hooks/useAddFlow";
import { useAppNavigate } from "../../../hooks/useAppNavigate";
import { useForm } from "../../../hooks/useForm";
import { AddHookReturnType } from "../../../types/add.feature.types";
import { AnyStringObject } from "../../../types/general.types";
import { IReportForm } from "../types/report.types";
import { useReport } from "./useReport";
import { usePatient } from "../../patients/hooks/usePatient";

export const useAddReport = (
  initialForm: IReportForm
): AddHookReturnType<IReportForm> => {
  const { confirmLeaveAddFlow, leaveAddFlow, leaveAddFlowModal } = useAddFlow();
  const { setNavigationState } = useAppNavigate();
  const { patientSelectOptions } = usePatient().entityData;
  const { crudMethods } = useReport();
  const form = useForm(initialForm);
  const { formData } = form;
  const formId = "add-report-form";

  useEffect(() => {
    if (formData.isSubmittable) {
      const reportToAdd: IReportForm = {
        ...formData.fields,
        creation_date: Date.now(),
      };
      crudMethods.addReport(reportToAdd, (report) => {
        leaveAddFlow(
          `/reports/${report._id}`,
          setNavigationState("keep", "report", {
            reportId: report._id,
          })
        );
      });
    }
  }, [formData.isSubmittable]);

  const leaveFlow = (extra?: AnyStringObject) =>
    leaveAddFlow(
      leaveAddFlowModal.state!,
      setNavigationState("keep", "chiefcomplaint", extra)
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
      patientSelectOptions,
    },
  };
};
