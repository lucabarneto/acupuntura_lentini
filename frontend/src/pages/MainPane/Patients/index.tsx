import "./Patients.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../app/store";
import {
  selectAllPatients,
  getAllPatients,
} from "../../../features/patients/patientsSlice";

import { List } from "../../../components/List";
import { Search } from "../components/Search";
import { Button } from "../../../components/Button";
import { Menu } from "../components/Menu";
import { RadioInput } from "../../../components/Input/Radio";
import { useRef } from "react";

/* la ul debe mostrar un map de todos los pacientes que se recojan de la base de datos */

export const Patients = () => {
  const patients = useSelector(selectAllPatients);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllPatients());
  }, []);

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
            "aria-controls": "sort-query-menu-patients",
            "aria-expanded": "false",
          }}
          onclickEvent={toggleMenu}
        />
      </div>
      <h1>Lista de pacientes</h1>
      <ul>
        {patients.map((patient, index) => (
          <List
            key={index}
            type="image"
            image="src/assets/placeholder.svg"
            alt="placeholder image"
            title={`${patient.first_name} ${patient.last_name}`}
            overline="Paciente"
            text="Proximo turno el 28/04/2025"
            divider
          />
        ))}
        {/* <List
          type="image"
          image="src/assets/placeholder.svg"
          alt="placeholder image"
          title="Luca Barneto"
          overline="Paciente"
          text="Proximo turno el 28/04/2025"
          divider
        /> */}
      </ul>
      <Menu
        id="sort-query-menu-patients"
        aria={{ "aria-hidden": "true" }}
        ref={menu}
      >
        <form>
          <RadioInput
            id="sort-name-asc"
            label="Nombre ascendente (A-Z)"
            name="sort"
            value="name-asc"
          />
          <RadioInput
            id="sort-name-desc"
            label="Nombre descendente (Z-A)"
            name="sort"
            value="name-desc"
          />
          <RadioInput
            id="sort-appointment-asc"
            label="Turno más cercano"
            name="sort"
            value="appointment-asc"
          />
          <RadioInput
            id="sort-appointment-desc"
            label="Turno más lejano"
            name="sort"
            value="appointment-desc"
          />
        </form>
      </Menu>
    </section>
  );
};
