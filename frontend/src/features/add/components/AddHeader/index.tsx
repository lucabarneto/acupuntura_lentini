import "./AddHeader.css";
import { IconButton } from "../../../../components/ui/IconButton";
import { NavLink, useLocation } from "react-router";
import { Button } from "../../../../components/ui/Button";

type Props = {
  title: string;
  formId: string;
  closeEvent(e?: React.MouseEvent): void;
};
export const AddHeader = ({ title, closeEvent, formId }: Props) => {
  const location = useLocation();
  const originalPathname = location.state;

  return (
    <header className="add-header">
      <NavLink to="/add" state={{ from: originalPathname }}>
        <IconButton icon="close" clickEvent={closeEvent} ariaLabel="Cerrar" />
      </NavLink>
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
