import "./Birth.css";
import { NoTable } from "./NoTable";
import { BaziTableRow } from "./BaziTableRow";
import { BaziTable } from "../../types/IPatient";

type Props = {
  date: string;
  time: string;
  location: string;
  bazi_table?: BaziTable;
};

export const Birth = ({ date, time, location, bazi_table }: Props) => {
  return (
    <article className="birth">
      <h2>Nacimiento</h2>
      <div className="birth-data">
        <span>
          <b>Fecha de nacimiento:</b> {date}
        </span>
        <span>
          <b>Hora de nacimiento:</b> {time}
        </span>
        <span>
          <b>Localidad:</b> {location}
        </span>
      </div>
      {bazi_table ? (
        <table className="bazi-table">
          <caption>Tabla BaZi</caption>
          <thead>
            <tr>
              <th className="empty-cell"></th>
              <th>Hora</th>
              <th>Día</th>
              <th>Mes</th>
              <th>Año</th>
            </tr>
          </thead>
          <tbody>
            <BaziTableRow
              heading="Troncos celestiales"
              tabularData={bazi_table.heavenly_stems}
            />
            <BaziTableRow
              heading="Ramas terrestres"
              tabularData={bazi_table.earthly_branches}
            />
            <BaziTableRow
              heading="Troncos ocultos"
              tabularData={bazi_table.hidden_stems}
              nestedRows
            />
          </tbody>
        </table>
      ) : (
        <NoTable />
      )}
    </article>
  );
};
