import "./Birth.css";
import { BaziTableType } from "../../types/IPatient";
import { NoTable } from "./NoTable";
import { BaziTable } from "./BaziTable";

type Props = {
  date?: string;
  time?: string;
  location?: string;
  bazi_table?: BaziTableType;
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
        <BaziTable bazi_table={bazi_table} type="readonly" />
      ) : (
        <NoTable />
      )}
    </article>
  );
};
