import "./Input.css";
import { useRef } from "react";
import { TextInputTypes } from "../../types/input.types";

type Props = {
  id: string;
  type: TextInputTypes;
  required?: true;
  title?: string;
};
export const TextInput = ({ id, title, type }: Props) => {
  const input = useRef<null | HTMLInputElement>(null);

  return (
    <>
      <input
        className="field-input"
        type={type}
        id={id}
        name={id}
        placeholder="Escribe aquí"
        title={title}
        ref={input}
      />
    </>
  );
};
