import "./AddHeader.css";
import { IconButton } from "../IconButton";
import { Button } from "../Button";

type Props = {
  title: string;
  formId: string;
  closeEvent(e?: React.MouseEvent): void;
};

export const AddHeader = (props: Props) => {
  const { title, closeEvent, formId } = props;
  return (
    <header className="add-header">
      <IconButton icon="close" clickEvent={closeEvent} ariaLabel="Cerrar" />
      <h3>{title}</h3>
      <Button
        type="submit"
        form={formId}
        label="Añadir"
        icon="add"
        variant="filled"
      />
    </header>
  );
};
