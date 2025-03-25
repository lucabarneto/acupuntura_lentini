import { useState, useRef, RefObject, useEffect } from "react";

interface UseModalMethods {
  openModal(state?: string): void;
  closeModal(): void;
  toggleModal(): void;
}

interface UseModalStates {
  modal: RefObject<HTMLDialogElement | null>;
  modalControlButton: RefObject<HTMLButtonElement | null>;
  state: null | string;
}

interface UseModal extends UseModalStates, UseModalMethods {}

export const useModal = (type: "modal" | "non-modal"): UseModal => {
  const modal = useRef<null | HTMLDialogElement>(null);
  const modalControlButton = useRef<null | HTMLButtonElement>(null);
  const [display, setDisplay] = useState<"visible" | "hidden">("hidden");
  const [state, setState] = useState<null | string>(null);

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [display]);

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      modal.current! &&
      modalControlButton.current! &&
      display === "visible" &&
      e.target !== modal.current &&
      e.target !== modalControlButton.current
    ) {
      closeModal();
    }
  };

  const openModal = (state?: string): void => {
    const currentModal = modal.current as HTMLDialogElement;

    console.log("OPENING MODAL");

    if (display === "visible") return;

    if (type === "modal") {
      currentModal.showModal();
    } else {
      currentModal.show();
    }

    currentModal.setAttribute("aria-hidden", "false");
    setDisplay("visible");
    if (state) setState(state);
  };

  const closeModal = (): void => {
    const currentModal = modal.current as HTMLDialogElement;

    console.log("CLOSING MODAL");

    if (display === "hidden") return;

    currentModal.close();
    console.log("MODAL CLOSED");
    currentModal.setAttribute("aria-hidden", "true");
    setDisplay("hidden");
  };

  const toggleModal = () =>
    display === "visible" ? closeModal() : openModal();

  return {
    modal,
    modalControlButton,
    state,
    closeModal,
    openModal,
    toggleModal,
  };
};
