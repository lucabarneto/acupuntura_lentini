import "./Patients.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../app/store";
import {
  selectAllPatients,
  fetchAllPatients,
  sortByName,
} from "../../../features/patients/patientsSlice";

import { List } from "../../../components/List";
import { Search } from "../components/Search";
import { Button } from "../../../components/Button";
import { Menu } from "../components/Menu";
import { RadioInput } from "../../../components/Input/Radio";
import { useRef } from "react";
import { useModal } from "../../../hooks/useModal";

export const Patients = () => {
  const patients = useSelector(selectAllPatients);
  const dispatch = useAppDispatch();
  const menu = useRef<null | HTMLDialogElement>(null);
  const { toggleModal } = useModal(
    menu.current as HTMLDialogElement,
    "non-modal"
  );

  useEffect(() => {
    dispatch(fetchAllPatients());
  }, [dispatch]);

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
          onclickEvent={toggleModal}
        />
      </div>
      <h1>Lista de pacientes</h1>
      <ul>
        {patients.map((patient) => (
          <List
            key={patient._id}
            type="image"
            image={
              patient.profile_picture
                ? patient.profile_picture
                : "src/assets/placeholder.svg"
            }
            alt="Rostro de la persona paciente"
            title={`${patient.first_name} ${patient.last_name}`}
            overline="Paciente"
            text={
              patient.next_appointment
                ? `Próximo turno el ${new Date(
                    patient.next_appointment
                  ).toLocaleDateString()}`
                : "No posee un turno agendado."
            }
            divider
          />
        ))}
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
            inputProps={{ checked: "true" }}
            onclickEvent={() => {
              dispatch(sortByName("asc"));
              toggleModal();
            }}
          />
          <RadioInput
            id="sort-name-desc"
            label="Nombre descendente (Z-A)"
            name="sort"
            value="name-desc"
            onclickEvent={() => {
              dispatch(sortByName("desc"));
              toggleModal();
            }}
          />
          {/* <RadioInput
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
          /> */}
        </form>
      </Menu>
    </section>
  );
};
