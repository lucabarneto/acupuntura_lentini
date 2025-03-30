import { useModal } from "../../../hooks/useModal";
import { useProgressBar } from "../../../hooks/useProgressBar";
import { useForm } from "../../../hooks/useForm";
import {
  AppNavigateState,
  useAppNavigate,
} from "../../../hooks/useAppNavigate";

export const useAdd = <T extends { [key: string]: unknown }>(
  initialForm: T,
  totalStages: number = 1
) => {
  const { appNavigate } = useAppNavigate();
  const leaveAddFlowModal = useModal("modal");
  const progress = useProgressBar(totalStages);
  const formData = useForm(initialForm);

  const leaveAddFlow = (link: string, state: AppNavigateState) => {
    formData.formMethods.handleReset();
    return appNavigate(link, state);
  };

  const confirmLeaveAddFlow = (e: React.MouseEvent, link?: string) => {
    e.preventDefault();
    const target = e.target as Element;
    const extra = link || `/add/${target.id}`;
    leaveAddFlowModal.openModal(extra);
  };

  return {
    progress,
    leaveAddFlowModal,
    formData,
    leaveAddFlow,
    confirmLeaveAddFlow,
  };
};
