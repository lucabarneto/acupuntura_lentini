import "./NavigationPane.css";
import { IconButton } from "../../ui/IconButton";
import { FAB } from "./FAB";
import { NavigationItem } from "./NavigationItem";
import { useAppNavigate } from "../../../hooks/useAppNavigate";
import { useModal } from "../../../hooks/useModal";
import { Menu } from "./Menu";
import { ListItem } from "../../ui/ListItem";

export const NavigationPane = () => {
  const { navigationData, mainNavigationData } = useAppNavigate();
  const { modal, modalControlButton, openModal, closeModal } =
    useModal("non-modal");

  return (
    <aside className="navigation-rail">
      <div>
        <IconButton
          icon="menu"
          ariaLabel="Abrir menú"
          ref={modalControlButton!}
          clickEvent={() => openModal()}
        />
        <FAB state={{ ...mainNavigationData, detailsPane: "add" }} />
      </div>
      <nav className="navigation-item-container">
        <NavigationItem
          icon="home"
          label="inicio"
          href="/"
          state={{ ...navigationData, mainPane: "/" }}
        />
        <NavigationItem
          icon="groups"
          label="pacientes"
          href="/patients"
          state={{ ...navigationData, mainPane: "patients" }}
        />
        <NavigationItem
          icon="calendar_month"
          label="turnos"
          href="/appointments"
          state={{ ...navigationData, mainPane: "/appointments" }}
        />
        <NavigationItem
          icon="lab_profile"
          label="reportes"
          href="/reports"
          state={{ ...navigationData, mainPane: "/reports" }}
        />
      </nav>
      <Menu ref={modal} clickEvent={() => closeModal()}>
        <ListItem
          variant="icon"
          icon="extension"
          title="Recursos"
          link="/resources"
          state={{ ...navigationData, mainPane: "resources" }}
          dataAttributes={{ role: "menuitem" }}
        />
        <ListItem
          variant="icon"
          icon="select_window"
          title="Plantillas"
          link="/templates"
          state={{ ...navigationData, mainPane: "templates" }}
          dataAttributes={{ role: "menuitem" }}
        />
      </Menu>
    </aside>
  );
};
