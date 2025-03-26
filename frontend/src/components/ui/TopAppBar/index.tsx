import { IconButton } from "../IconButton";
import { TopAppBarType } from "./top_app_bar.types";
import "./TopAppBar.css";

type Props = TopAppBarType;

export const TopAppBar = (props: Props) => {
  const { pane, title, navigation_back, navigateBackEvent } = props;

  const className =
    pane === "main" ? "top-app-bar on-main-pane" : "top-app-bar";

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
      <h3 className={pane === "main" ? "compact" : undefined}>{title}</h3>
      {pane === "details" && props.deleteEvent && (
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
