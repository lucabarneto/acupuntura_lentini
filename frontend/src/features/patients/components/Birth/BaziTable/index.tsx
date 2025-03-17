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
                heading="heavenly_stems"
                tabularData={props.bazi_table.heavenly_stems}
              />
              <BaziTableRow
                heading="earthly_branches"
                tabularData={props.bazi_table.earthly_branches}
              />
              <BaziTableRow
                heading="hidden_stems"
                tabularData={props.bazi_table.hidden_stems}
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
        <option value="Madera Yang"></option>
        <option value="Madera Yin"></option>
        <option value="Fuego Yin"></option>
        <option value="Fuego Yang"></option>
        <option value="Metal Yin"></option>
        <option value="Metal Yang"></option>
        <option value="Agua Yin"></option>
        <option value="Agua Yang"></option>
        <option value="Tierra Yin"></option>
        <option value="Tierra Yang"></option>
      </datalist>
      <datalist id="branches">
        <option value="Rata Zi"></option>
        <option value="Buey Chou"></option>
        <option value="Tigre Yin"></option>
        <option value="Conejo Mau"></option>
        <option value="Dragon Chen"></option>
        <option value="Serpiente Si"></option>
        <option value="Caballo Wu"></option>
        <option value="Cabra Wei"></option>
        <option value="Mono Shen"></option>
        <option value="Gallo You"></option>
        <option value="Perro Xu"></option>
        <option value="Cerdo Hai"></option>
      </datalist>
    </>
  );
};
