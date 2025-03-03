import "./BaziTable.css";
import { BaziTableRow } from "../BaziTableRow";
import { BaziTableType } from "../../../types/IPatient";
import { BaziTableInput } from "../BaziTableInput";

interface ReadonlyBaziTable {
  type: "readonly";
  bazi_table: BaziTableType;
}

interface InputBaziTable {
  type: "input";
}

type Props = ReadonlyBaziTable | InputBaziTable;

export const BaziTable = (props: Props) => {
  return (
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
        {props.type === "readonly" ? (
          <>
            <BaziTableRow
              heading="Troncos celestiales"
              tabularData={props.bazi_table.heavenly_stems}
            />
            <BaziTableRow
              heading="Ramas terrestres"
              tabularData={props.bazi_table.earthly_branches}
            />
            <BaziTableRow
              heading="Troncos ocultos"
              tabularData={props.bazi_table.hidden_stems}
              nestedRows
            />
          </>
        ) : (
          <>
            <BaziTableInput heading="Troncos celestiales" />
            <BaziTableInput heading="Ramas terrestres" />
            <BaziTableInput heading="Troncos ocultos" nestedRows />
          </>
        )}
      </tbody>
    </table>
  );
};
