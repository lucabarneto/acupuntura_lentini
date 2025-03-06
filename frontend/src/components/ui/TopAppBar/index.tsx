import { IconButton } from "../IconButton";
import { TopAppBarType } from "./top_app_bar.types";
import "./TopAppBar.css";

type Props = TopAppBarType;

export const TopAppBar = (props: Props) => {
  const { title, navigationIcon, deleteEvent } = props;

  return (
    <header className="top-app-bar">
      {navigationIcon && (
        <IconButton
          icon="arrow_back"
          clickEvent={() => {}}
          ariaLabel="Volver"
        />
      )}
      <h3>{title}</h3>
      <div>
        <IconButton icon="edit" clickEvent={() => {}} ariaLabel="Editar" />
        <IconButton
          icon="delete"
          clickEvent={deleteEvent}
          ariaLabel="Eliminar"
        />
      </div>
    </header>
  );
};
