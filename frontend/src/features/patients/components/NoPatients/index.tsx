import "./NoPatients.css";

export const NoPatients = () => {
  return (
    <div className="no-patients">
      <h2 className="compact">No tienes ningún paciente</h2>
      <p>
        Aquí verás y podrás acceder a todos tus pacientes. Añade uno haciendo
        click en el botón "+" ubicado en la parte superior izquierda
      </p>
    </div>
  );
};
