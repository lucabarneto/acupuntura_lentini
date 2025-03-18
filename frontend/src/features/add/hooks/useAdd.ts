import { useNavigate } from "react-router";
import { useModal } from "../../../hooks/useModal";
import { LinkState } from "../../../types/link.types";
import { useProgressBar } from "../../../hooks/useProgressBar";
import { useForm } from "../../../hooks/useForm";

export const useAdd = <T extends { [key: string]: unknown }>(
  initialForm: T,
  totalStages: number = 1
) => {
  const navigate = useNavigate();
  const leaveAddFlowModal = useModal("modal");
  const progress = useProgressBar(totalStages);
  const formData = useForm(initialForm);

  const leaveAddFlow = (link: string, state?: LinkState) => {
    formData.formMethods.handleReset();
    return state ? navigate(link, { state }) : navigate(link);
  };

  const confirmLeaveAddFlow = (e: React.MouseEvent, link?: string) => {
    e.preventDefault();
    const target = e.target as Element;
    const valueToAssociate = link || `/add/${target.id}`;
    leaveAddFlowModal.openModal(valueToAssociate);
  };

  return {
    progress,
    leaveAddFlowModal,
    formData,
    leaveAddFlow,
    confirmLeaveAddFlow,
  };
};
