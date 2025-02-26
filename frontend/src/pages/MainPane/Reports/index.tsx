import "./Reports.css";
import { useRef } from "react";
import { Search } from "../Search";
import { Button } from "../../../components/Button";
import { List } from "../../../components/List";
import { Menu } from "../components/Menu";
import { RadioInput } from "../../../components/Input/Radio";

export const Reports = () => {
  const menu = useRef<null | HTMLDialogElement>(null);

  const toggleMenu = () => {
    if (menu.current?.open) {
      menu.current?.close();
      menu.current?.setAttribute("aria-hidden", "true");
    } else {
      menu.current?.show();
      menu.current?.setAttribute("aria-hidden", "false");
    }
  };

  return (
    <section className="patients-pane">
      <div className="search-box">
        <Search />
      </div>
      <div className="query-buttons">
        <Button
          type="text"
          label="Ordenar por"
          icon="sort"
          aria={{
            "aria-haspopup": "dialog",
            "aria-controls": "sort-query-menu-reports",
            "aria-expanded": "false",
          }}
          onclickEvent={toggleMenu}
        />
      </div>
      <h1>Lista de reportes</h1>
      <ul>
        <List
          type="default"
          title="Reporte del 28/04/2025"
          overline="Reporte"
          text="Reporte del paciente Luca Barneto"
          divider
        />
      </ul>
      <Menu id="sort-query-menu" aria={{ "aria-hidden": "true" }} ref={menu}>
        <form>
          <RadioInput
            id="sort-date-asc"
            label="Más recientes"
            name="sort"
            value="date-asc"
          />
          <RadioInput
            id="sort-date-desc"
            label="Menos recientes"
            name="sort"
            value="name-desc"
          />
        </form>
      </Menu>
    </section>
  );
};
