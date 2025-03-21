import "./Patients.css";
import { usePatient } from "../../features/patients/hooks/usePatient";
import { useModal } from "../../hooks/useModal";
import { Button } from "../../components/ui/Button";
import { Menu } from "../../components/ui/Menu";
import { RadioInput } from "../../components/ui/Input/Radio";
import { PatientListItem } from "../../features/patients/components/PatientListItem";
import { SearchViewPatient } from "../../features/patients/components/Search/SearchPatient";
import { useAppNavigate } from "../../hooks/useAppNavigate";

export const Patients = () => {
  const { mainNavigationData } = useAppNavigate();
  const { allPatients, sortPatients } = usePatient();
  const { modal, toggleModal } = useModal("non-modal");

  return (
    <section className="patients-pane">
      <SearchViewPatient
        entities={allPatients}
        mappedResults={(patient) => (
          <PatientListItem
            key={patient._id}
            patient={patient}
            state={{
              ...mainNavigationData,
              detailsPane: "patient",
              patientId: patient._id,
            }}
          />
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
        {allPatients.map((patient) => (
          <PatientListItem
            key={patient._id}
            patient={patient}
            state={{
              ...mainNavigationData,
              detailsPane: "patient",
              patientId: patient._id,
            }}
          />
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
              sortPatients("asc");
              toggleModal();
            }}
          />
          <RadioInput
            id="sort-name-desc"
            label="Nombre descendente (Z-A)"
            name="sort"
            value="name-desc"
            clickEvent={() => {
              sortPatients("desc");
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
