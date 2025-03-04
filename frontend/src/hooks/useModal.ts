import { useState, useRef, RefObject } from "react";

interface UseModalMethods {
  openModal(extra?: string): void;
  closeModal(): void;
}

interface UseModalStates {
  modal: RefObject<HTMLDialogElement | null>;
  associatedValue: null | string;
}

interface UseModal extends UseModalStates, UseModalMethods {}

export const useModal = (type: "modal" | "non-modal"): UseModal => {
  const modal = useRef<null | HTMLDialogElement>(null);
  const [display, setDisplay] = useState<"visible" | "hidden">("hidden");
  const [associatedValue, setAssociatedValue] = useState<null | string>(null);

  const openModal = (extra?: string): void => {
    const currentModal = modal.current as HTMLDialogElement;

    if (display === "visible") return;

    if (type === "modal") {
      currentModal.showModal();
    } else {
      currentModal.show();
    }

    currentModal.setAttribute("aria-hidden", "false");
    setDisplay("visible");
    if (extra) setAssociatedValue(extra);
  };

  const closeModal = (): void => {
    const currentModal = modal.current as HTMLDialogElement;

    if (display === "hidden") return;

    currentModal.close();
    currentModal.setAttribute("aria-hidden", "true");
    setDisplay("hidden");
  };

  return { modal, associatedValue, closeModal, openModal };
};
