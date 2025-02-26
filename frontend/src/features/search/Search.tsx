import "./Search.css";
import { useSelector } from "react-redux";
import { IPatient } from "../patients/IPatient";
import { selectAllPatients } from "../patients/patientsSlice";
import { IconButton } from "../../components/ui/IconButton";
import { Divider } from "../../components/ui/Divider";
import { Icon } from "../../components/ui/Icon";
import { List } from "../../components/ui/List";
import { useSearch } from "./useSearch";

export const Search = () => {
  const patients = useSelector(selectAllPatients);

  const filter = (patient: IPatient): boolean => {
    const fullName = `${patient.first_name} ${patient.last_name}`
      .trim()
      .toUpperCase();

    return fullName.startsWith(query.toUpperCase());
  };

  const {
    searchActive,
    filteredResults,
    query,
    toggleSearchVisibility,
    handleQueryChange,
    filterResults,
  } = useSearch(patients, filter);

  return searchActive ? (
    <div className="search-view">
      <form className="search-form">
        <IconButton
          type="standard"
          icon="arrow_back"
          onclickEvent={(e) => {
            e?.preventDefault();
            toggleSearchVisibility();
          }}
        />
        <input
          type="text"
          name="q"
          id="q"
          placeholder="Buscar pacientes..."
          value={query}
          onChange={(e) => {
            handleQueryChange(e.target.value);
            filterResults();
          }}
        />
        <IconButton
          icon="close"
          type="standard"
          onclickEvent={(e) => {
            e?.preventDefault();
            handleQueryChange("");
          }}
        />
        <Divider />
      </form>
      <div className="search-results">
        {query === "" ? (
          <div>
            <Icon icon="groups" />
            <h3>Buscar pacientes</h3>
            <p>
              Escribe el nombre del paciente que quieres buscar en la barra de
              arriba
            </p>
          </div>
        ) : patients.length !== 0 ? (
          <ul>
            {filteredResults.map((patient) => (
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
        ) : (
          <p>No se encontraron pacientes</p>
        )}
      </div>
    </div>
  ) : (
    <div className="search-bar" onClick={toggleSearchVisibility}>
      <input type="text" name="q" id="q" placeholder="Buscar pacientes..." />
      <IconButton icon="search" type="standard" />
    </div>
  );
};
