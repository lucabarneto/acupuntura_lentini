import { BaziTableVariants } from "../../types/bazi_table.types";
import "./BaziTable.css";
import { BaziTableDataRow } from "./BaziTableDataRow";
import { BaziTableInputRow } from "./BaziTableInputRow";

type Props = BaziTableVariants;
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
          {props.variant === "tabular_data" ? (
            <>
              <BaziTableDataRow
                heading="heavenly_stems"
                tabularData={props.tabularData.heavenly_stems}
              />
              <BaziTableDataRow
                heading="earthly_branches"
                tabularData={props.tabularData.earthly_branches}
              />
              <BaziTableDataRow
                heading="hidden_stems"
                tabularData={props.tabularData.hidden_stems}
              />
            </>
          ) : (
            <>
              <BaziTableInputRow
                heading="heavenly_stems"
                datalistId="stems"
                form={props.form}
                formId={props.formId}
              />
              <BaziTableInputRow
                heading="earthly_branches"
                datalistId="branches"
                form={props.form}
                formId={props.formId}
              />
              <BaziTableInputRow
                heading="hidden_stems"
                datalistId="stems"
                form={props.form}
                formId={props.formId}
              />
            </>
          )}
        </tbody>
      </table>
    </>
  );
};
