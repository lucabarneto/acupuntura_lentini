import "./SelectionModal.css";
import { SelectionModalType } from "./selection_modal.types";

type Props = SelectionModalType;

export const SelectionModal = (props: Props) => {
  const { id, ref, children } = props;
  return (
    <dialog className="selection-modal" id={id} ref={ref} role="dialog">
      <div className="scrim"></div>
      <div className="selection-modal-content">{children}</div>
    </dialog>
  );
};
