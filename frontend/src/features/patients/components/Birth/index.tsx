import { TextCard } from "../../../../components/ui/Card/TextCard";
import { BaziTableType } from "../../types/bazi_table.types";
import { BirthType } from "../../types/patient.types";
import { BaziTable } from "../BaziTable";
import "./Birth.css";

type Props = {
  birth?: BirthType;
  bazi_table?: BaziTableType;
  addEvent(): void;
};

export const Birth = (props: Props) => {
  const { birth, bazi_table, addEvent } = props;

  return (
    <article className="birth">
      <h2>Nacimiento</h2>
      <div className="birth-data content-block">
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
        <TextCard
          title="Sin tabla bazi"
          text="Añade los datos para armar la tabla apretando el botón que se encuentra abajo."
          buttonLabel="Añadir Tabla"
          buttonIcon="add"
          clickEvent={addEvent}
        />
      )}
    </article>
  );
};
