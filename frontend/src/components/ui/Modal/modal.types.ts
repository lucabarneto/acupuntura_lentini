export interface ModalType {
  ref: React.RefObject<HTMLDialogElement | null>;
  title: string;
  text: string;
  buttonConfirmLabel: string;

  cancelEvent(e?: React.MouseEvent): void;
  confirmEvent(e?: React.MouseEvent): void;
}
