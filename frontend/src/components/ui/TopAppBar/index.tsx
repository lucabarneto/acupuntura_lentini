import { IconButton } from "../IconButton";
import { TopAppBarType } from "./top_app_bar.types";
import "./TopAppBar.css";

type Props = TopAppBarType;

export const TopAppBar = (props: Props) => {
  const { type, title, navigation_back, navigateBackEvent } = props;

  const className =
    type === "presentation" ? "top-app-bar presentation" : "top-app-bar";

  return (
    <header className={className}>
      {navigation_back && (
        <>
          <span className="go-back-icon"></span>
          <IconButton
            icon="arrow_back"
            clickEvent={navigateBackEvent!}
            ariaLabel="Volver"
          />
        </>
      )}
      <h3>{title}</h3>
      {type === "interactive" && (
        <div>
          <IconButton icon="edit" clickEvent={() => {}} ariaLabel="Editar" />
          <IconButton
            icon="delete"
            clickEvent={props.deleteEvent}
            ariaLabel="Eliminar"
          />
        </div>
      )}
    </header>
  );
};
