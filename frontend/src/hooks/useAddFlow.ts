import { useModal } from "./useModal";
import { AppNavigateState, useAppNavigate } from "./useAppNavigate";

export const useAddFlow = () => {
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
