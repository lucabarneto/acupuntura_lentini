import "./Patients.css";
import { useEffect } from "react";
import { useModal } from "../../hooks/useModal";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/store";
import {
  selectAllPatients,
  getAllPatients,
  sortByName,
} from "../../features/patients/slices/patientsSlice";
import { Button } from "../../components/ui/Button";
import { Menu } from "../../components/ui/Menu";
import { RadioInput } from "../../components/ui/Input/Radio";
import { PatientListItem } from "../../features/patients/components/PatientListItem";
import { SearchViewPatient } from "../../features/patients/components/Search/SearchPatient";

export const Patients = () => {
  const patients = useSelector(selectAllPatients);
  const dispatch = useAppDispatch();
  const { modal, toggleModal } = useModal("non-modal");

  useEffect(() => {
    dispatch(getAllPatients());
  }, [dispatch]);

  return (
    <section className="patients-pane">
      <SearchViewPatient
        entities={patients}
        mappedResults={(patient) => (
          <PatientListItem key={patient._id} patient={patient} />
        )}
      />
      <div className="query-buttons">
        <Button
          type="button"
          variant="text"
          label="Ordenar por"
          icon="sort"
          ariaProps={{
            "aria-haspopup": "dialog",
            "aria-controls": "sort-query-menu-patients",
            "aria-expanded": "false",
          }}
          clickEvent={toggleModal}
        />
      </div>
      <h1>Lista de pacientes</h1>
      <ul>
        {patients.map((patient) => (
          <PatientListItem key={patient._id} patient={patient} />
        ))}
      </ul>
      <Menu id="sort-query-menu-patients" ref={modal}>
        <form>
          <RadioInput
            id="sort-name-asc"
            label="Nombre ascendente (A-Z)"
            name="sort"
            value="name-asc"
            checked
            clickEvent={() => {
              dispatch(sortByName("asc"));
              toggleModal();
            }}
          />
          <RadioInput
            id="sort-name-desc"
            label="Nombre descendente (Z-A)"
            name="sort"
            value="name-desc"
            clickEvent={() => {
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
