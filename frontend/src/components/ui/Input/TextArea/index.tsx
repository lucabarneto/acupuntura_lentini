import "../Input.css";
import "./TextArea.css";

type Props = {
  id: string;
  message: string;
};
export const TextArea = ({ id, message }: Props) => {
  return (
    <textarea
      className="field-input field-textarea"
      name={id}
      id={id}
      value={message}
    ></textarea>
  );
};
