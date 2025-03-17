import "./NoTable.css";
import { Button } from "../../../../../components/ui/Button";
import { useLocation, useNavigate } from "react-router";

type Props = {
  patientId: string;
};

export const NoTable = (props: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const originalPathname = location.state?.from;

  return (
    <div className="no-table">
      <h4>Sin tabla BaZi</h4>
      <p>
        Agrega los datos para armar la tabla apretando el botón que se encuentra
        abajo.
      </p>
      <Button
        type="button"
        variant="filled"
        label="Agregar Tabla"
        icon="add"
        clickEvent={() =>
          navigate("/add/bazitable", {
            state: { from: originalPathname, patientId: props.patientId },
          })
        }
      />
    </div>
  );
};
