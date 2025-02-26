import "../Search.css";
import { Icon } from "../../../../../components/ui/Icon";

export const SearchNoQuery = () => {
  return (
    <div className="search-no-results">
      <Icon icon="groups" />
      <h3>Buscar pacientes</h3>
      <p>
        Escribe el nombre del paciente que quieres buscar en la barra de arriba
      </p>
    </div>
  );
};
