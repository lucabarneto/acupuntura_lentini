import { useModal } from "../../hooks/useModal";
import { AppNavigateState, useAppNavigate } from "../../hooks/useAppNavigate";

export const useAdd = () => {
  const { appNavigate } = useAppNavigate();
  const leaveAddFlowModal = useModal("modal");

  const confirmLeaveAddFlow = (e: React.MouseEvent, link?: string) => {
    e.preventDefault();
    const target = e.target as Element;
    const extra = link || `/add/${target.id}`;
    leaveAddFlowModal.openModal(extra);
  };

  const leaveAddFlow = (link: string, state: AppNavigateState) => {
    return appNavigate(link, state);
  };

  return {
    leaveAddFlowModal,
    leaveAddFlow,
    confirmLeaveAddFlow,
  };
};
