import "../Search.css";

export const SearchNoResults = () => {
  return (
    <div className="search-no-results">
      <h3>Sin resultados</h3>
      <p>No se ha encontrado ningún paciente con el nombre indicado.</p>
    </div>
  );
};
