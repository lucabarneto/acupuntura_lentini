import "./NavigationPane.css";
import { IconButton } from "../../ui/IconButton";
import { FAB } from "./FAB";
import { NavigationItem } from "./NavigationItem";
import { useAppNavigate } from "../../../hooks/useAppNavigate";

export const NavigationPane = () => {
  const { navigationData, mainNavigationData } = useAppNavigate();
  return (
    <aside className="navigation-rail">
      <div>
        <IconButton icon="menu" ariaLabel="Abrir menú" clickEvent={() => {}} />
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
          state={{ ...navigationData, mainPane: "/patients" }}
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
    </aside>
  );
};
