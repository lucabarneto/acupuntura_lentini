import "./NavigationPane.css";
import { IconButton } from "../../ui/IconButton";
import { FAB } from "./FAB";
import { NavigationItem } from "./NavigationItem";
import { useAppNavigate } from "../../../hooks/useAppNavigate";
import { useModal } from "../../../hooks/useModal";
import { Menu } from "./Menu";
import { ListItem } from "../../ui/ListItem";

export const NavigationPane = () => {
  const { extraData, setNavigationState } = useAppNavigate();
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
        <FAB state={setNavigationState("keep", "add")} />
      </div>
      <nav className="navigation-item-container">
        <NavigationItem
          id="home"
          icon="home"
          label="inicio"
          href="/"
          state={setNavigationState("home", "keep", extraData)}
        />
        <NavigationItem
          id="patients"
          icon="groups"
          label="pacientes"
          href="/patients"
          state={setNavigationState("patients", "keep", extraData)}
        />
        {/* <NavigationItem
          id="appointments"
          icon="calendar_month"
          label="turnos"
          href="/appointments"
          state={setNavigationState("appointments", "keep", extraData)}
        /> */}
        <NavigationItem
          id="reports"
          icon="lab_profile"
          label="reportes"
          href="/reports"
          state={setNavigationState("reports", "keep", extraData)}
        />
      </nav>
      <Menu ref={modal} clickEvent={() => closeModal()}>
        <ListItem
          variant="icon"
          icon="extension"
          title="Recursos"
          link="/resources"
          state={setNavigationState("resources", "keep", extraData)}
          dataAttributes={{ role: "menuitem" }}
        />
        <ListItem
          variant="icon"
          icon="select_window"
          title="Plantillas"
          link="/templates"
          state={setNavigationState("templates", "keep", extraData)}
          dataAttributes={{ role: "menuitem" }}
        />
      </Menu>
    </aside>
  );
};
