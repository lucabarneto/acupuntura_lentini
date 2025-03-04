import { useNavigate } from "react-router";
import { useModal } from "../../../hooks/useModal";
import { LinkState } from "../../../types/link.types";
import { useForm } from "../../../hooks/useForm";
import { patientInitialForm } from "../utils/patientInitialForm";
import { useProgressBar } from "../../../hooks/useProgressBar";

export const useAdd = (totalStages: number) => {
  const navigate = useNavigate();
  const leaveAddFlowModal = useModal("modal");
  const form = useForm(patientInitialForm);
  const progress = useProgressBar(totalStages);

  const leaveAddFlow = (link: string, state?: LinkState) =>
    state ? navigate(link, { state }) : navigate(link);

  const confirmLeaveAddFlow = (e: React.MouseEvent, link?: string) => {
    e.preventDefault();
    const target = e.target as Element;
    const valueToAssociate = link || `/add/${target.id}`;
    leaveAddFlowModal.openModal(valueToAssociate);
  };

  return {
    progress,
    form,
    leaveAddFlowModal,
    leaveAddFlow,
    confirmLeaveAddFlow,
  };
};
