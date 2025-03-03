import { Button } from "../Button";
import "./Modal.css";

type Props = {
  ref: React.RefObject<HTMLDialogElement | null>;

  title: string;
  text: string;
  buttonConfirmLabel: string;
  extraValue?: string;

  oncancelEvent(e?: React.MouseEvent): void;
  onconfirmEvent(e?: React.MouseEvent): void;
};

export const Modal = ({
  ref,
  title,
  text,
  buttonConfirmLabel,
  oncancelEvent,
  onconfirmEvent,
}: Props) => {
  return (
    <dialog ref={ref} className="modal">
      <div className="modal-content">
        <h3>{title}</h3>
        <p>{text}</p>
        <div className="modal-buttons">
          <Button type="text" label="Cancelar" onclickEvent={oncancelEvent} />
          <Button
            type="filled"
            label={buttonConfirmLabel}
            onclickEvent={onconfirmEvent}
          />
        </div>
      </div>
    </dialog>
  );
};
