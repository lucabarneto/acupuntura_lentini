import { IconButton } from "../../components/IconButton";
import { FAB } from "./FAB";
import { NavigationItem } from "./NavigationItem";
import "./NavigationRail.css";

export const NavigationRail = () => {
  return (
    <aside className="navigation-rail">
      <div>
        <IconButton type="standard" icon="menu" />
        <FAB />
      </div>
      <nav className="navigation-item-container">
        <NavigationItem icon="home" label="inicio" href="/" />
        <NavigationItem icon="groups" label="pacientes" href="/patients" />
        <NavigationItem
          icon="calendar_month"
          label="turnos"
          href="/appointments"
        />
        <NavigationItem icon="lab_profile" label="reportes" href="/reports" />
      </nav>
    </aside>
  );
};
