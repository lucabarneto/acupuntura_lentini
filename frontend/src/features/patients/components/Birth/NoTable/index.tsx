import "./NoTable.css";
import { Icon } from "../../../../../components/ui/Icon";

export const NoTable = () => {
  return (
    <div className="no-table">
      <h4>Sin tabla BaZi</h4>
      <p>
        Agrega los datos para armar la tabla apretando el botón con el ícono{" "}
        <Icon icon="edit" /> en la parte superior derecha del panel{" "}
      </p>
    </div>
  );
};
