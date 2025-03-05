import { useNavigate } from "react-router";
import { useModal } from "../../../hooks/useModal";
import { LinkState } from "../../../types/link.types";
import { useForm } from "../../../hooks/useForm";
import { patientInitialForm } from "../utils/patientInitialForm";
import { useProgressBar } from "../../../hooks/useProgressBar";
import { useRef } from "react";

export const useAdd = (totalStages: number) => {
  const navigate = useNavigate();
  const submitButton = useRef<null | HTMLButtonElement>(null);
  const leaveAddFlowModal = useModal("modal");
  const form = useForm(patientInitialForm, submitButton.current!);
  const progress = useProgressBar(totalStages);

  const leaveAddFlow = (link: string, state?: LinkState) => {
    form.resetFormData();
    return state ? navigate(link, { state }) : navigate(link);
  };

  const confirmLeaveAddFlow = (e: React.MouseEvent, link?: string) => {
    e.preventDefault();
    const target = e.target as Element;
    const valueToAssociate = link || `/add/${target.id}`;
    leaveAddFlowModal.openModal(valueToAssociate);
  };

  return {
    submitButton,
    progress,
    form,
    leaveAddFlowModal,
    leaveAddFlow,
    confirmLeaveAddFlow,
  };
};
