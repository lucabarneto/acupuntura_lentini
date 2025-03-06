import "./AddHeader.css";
import { IconButton } from "../../../../components/ui/IconButton";
import { NavLink, useLocation } from "react-router";

type Props = {
  title: string;
  oncloseEvent(e?: React.MouseEvent): void;
};
export const AddHeader = ({ title, oncloseEvent }: Props) => {
  const location = useLocation();
  const originalPathname = location.state;

  return (
    <header className="add-header">
      <NavLink to="/add" state={{ from: originalPathname }}>
        <IconButton icon="close" clickEvent={oncloseEvent} ariaLabel="Cerrar" />
      </NavLink>
      <h3>{title}</h3>
    </header>
  );
};
