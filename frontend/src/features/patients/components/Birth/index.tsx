import { useLocation, useNavigate } from "react-router";
import { Card } from "../../../../components/ui/Card";
import { BaziTableType } from "../../types/bazi_table.types";
import { BirthType } from "../../types/patient.types";
import { BaziTable } from "../BaziTable";
import "./Birth.css";

type Props = {
  birth?: BirthType;
  bazi_table?: BaziTableType;
  patientId: string;
};

export const Birth = (props: Props) => {
  const { birth, bazi_table, patientId } = props;

  const navigate = useNavigate();
  const location = useLocation();
  const originalPathname = location.state?.from;

  return (
    <article className="birth">
      <h2>Nacimiento</h2>
      <div className="birth-data">
        <span>
          <b>Fecha de nacimiento:</b> {birth?.date || "Desconocido"}
        </span>
        <span>
          <b>Hora de nacimiento:</b> {birth?.time || "Desconocido"}
        </span>
        <span>
          <b>Localidad:</b> {birth?.location || "Desconocido"}
        </span>
      </div>
      <h3>Tabla Bazi</h3>
      {bazi_table ? (
        <BaziTable variant="tabular_data" tabularData={bazi_table} />
      ) : (
        <Card
          title="Sin tabla bazi"
          text="Agrega los datos para armar la tabla apretando el botón que se encuentra abajo."
          buttonLabel="Agregar Tabla"
          buttonIcon="add"
          clickEvent={() => {
            navigate("/add/bazitable", {
              state: { from: originalPathname, patientId: patientId },
            });
          }}
        />
      )}
    </article>
  );
};
