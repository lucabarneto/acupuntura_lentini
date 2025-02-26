import "./Patients.css";
import { useEffect } from "react";
import { useRef } from "react";
import { useModal } from "../../hooks/useModal";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/store";
import {
  selectAllPatients,
  fetchAllPatients,
  sortByName,
} from "../../features/patients/slices/patientsSlice";

import { Search } from "../../features/search/components/Search";
import { Button } from "../../components/ui/Button";
import { Menu } from "../../components/ui/Menu";
import { RadioInput } from "../../components/ui/Input/Radio";
import { PatientListItem } from "../../features/patients/components/PatientListItem";
import { SearchNoQuery } from "../../features/patients/components/Search/SearchNoQuery";
import { SearchNoResults } from "../../features/patients/components/Search/SearchNoResults";

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
      <Search
        entities={patients}
        noQueryView={<SearchNoQuery />}
        noResultsView={<SearchNoResults />}
        mapResults={(patient) => (
          <PatientListItem key={patient._id} patient={patient} />
        )}
      />
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
          <PatientListItem key={patient._id} patient={patient} />
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
            inputProps={{ defaultChecked: true }}
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
