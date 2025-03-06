import { Button } from "../Button";
import "./Modal.css";
import { ModalType } from "./modal.types";

type Props = ModalType;

export const Modal = (props: Props) => {
  const { ref, title, text, buttonConfirmLabel, cancelEvent, confirmEvent } =
    props;

  return (
    <dialog
      ref={ref}
      className="modal"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="modal-content">
        <h3 id="modal-title">{title}</h3>
        <p id="modal-description">{text}</p>
        <div className="modal-buttons">
          <Button
            type="button"
            variant="text"
            label="Cancelar"
            clickEvent={cancelEvent}
          />
          <Button
            type="button"
            variant="filled"
            label={buttonConfirmLabel}
            clickEvent={confirmEvent}
          />
        </div>
      </div>
    </dialog>
  );
};
