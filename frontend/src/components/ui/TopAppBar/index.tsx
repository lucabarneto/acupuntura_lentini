import { IconButton } from "../IconButton";
import { TopAppBarType } from "./top_app_bar.types";
import "./TopAppBar.css";

type Props = TopAppBarType;

export const TopAppBar = (props: Props) => {
  const { title, goBackIcon, deleteEvent, goBackEvent } = props;

  return (
    <header className="top-app-bar">
      {goBackIcon && (
        <>
          <span className="go-back-icon"></span>
          <IconButton
            icon="arrow_back"
            clickEvent={goBackEvent}
            ariaLabel="Volver"
          />
        </>
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
