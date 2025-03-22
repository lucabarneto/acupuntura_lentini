import { Button } from "../../../../components/ui/Button";
import "./NoChiefComplaints.css";

export const NoChiefComplaints = () => {
  return (
    <div className="no-chief-complaints">
      <h4>Sin motivos de consulta</h4>
      <p>
        El paciente no tiene ningún motivo de consulta actual. Agregar uno
        haciendo click en el botón de abajo, o apretando el botón "+" ubicado en
        la parte superior izquierda de la pantalla
      </p>
      <Button
        variant="filled"
        type="button"
        label="Agregar motivo de consulta"
        icon="add"
      />
    </div>
  );
};
