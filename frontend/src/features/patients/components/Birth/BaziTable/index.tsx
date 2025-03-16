import "./BaziTable.css";
import { BaziTableRow } from "../BaziTableRow";
import { BaziTableForm, BaziTableType } from "../../../types/IPatient";
import { BaziTableInputRow } from "../BaziTableInputRow";
import { UseForm } from "../../../../../hooks/useForm";

interface ReadonlyBaziTable {
  type: "readonly";
  bazi_table: BaziTableType;
}

interface InputBaziTable {
  type: "form";
  formData: UseForm<BaziTableForm>;
}

type Props = ReadonlyBaziTable | InputBaziTable;

export const BaziTable = (props: Props) => {
  return (
    <>
      <table className="bazi-table">
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
              <BaziTableInputRow
                heading="heavenly_stems"
                datalistId="stems"
                formData={props.formData}
              />
              <BaziTableInputRow
                heading="earthly_branches"
                datalistId="branches"
                formData={props.formData}
              />
              <BaziTableInputRow
                heading="hidden_stems"
                datalistId="stems"
                formData={props.formData}
              />
            </>
          )}
        </tbody>
      </table>
      <datalist id="stems">
        <option value="madera yin"></option>
        <option value="madera yang"></option>
        <option value="fuego yin"></option>
        <option value="fuego yang"></option>
        <option value="metal yin"></option>
        <option value="metal yang"></option>
        <option value="agua yin"></option>
        <option value="agua yang"></option>
        <option value="tierra yin"></option>
        <option value="tierra yang"></option>
      </datalist>
      <datalist id="branches">
        <option value="rata zi"></option>
        <option value="buey chou"></option>
        <option value="tigre yin"></option>
        <option value="conejo mau"></option>
        <option value="dragon chen"></option>
        <option value="serpiente si"></option>
        <option value="caballo wu"></option>
        <option value="cabra wei"></option>
        <option value="mono shen"></option>
        <option value="gallo you"></option>
        <option value="perro xu"></option>
        <option value="cerdo hai"></option>
      </datalist>
    </>
  );
};
