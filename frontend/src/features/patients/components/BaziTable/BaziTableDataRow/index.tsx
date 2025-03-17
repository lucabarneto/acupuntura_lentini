import { BaziTableTabularData } from "../../../types/bazi_table.types";

type Props = BaziTableTabularData;

export const BaziTableDataRow = (props: Props) => {
  const { heading, tabularData } = props;

  return (
    <>
      {heading === "hidden_stems" ? (
        <>
          <tr>
            <th rowSpan={3}>Troncos Ocultos</th>
            {Object.values(tabularData.principal_qi).map((value, index) => {
              return <td key={index}>{value}</td>;
            })}
          </tr>
          <tr>
            {Object.values(tabularData.central_qi).map((value, index) => {
              return <td key={index}>{value}</td>;
            })}
          </tr>
          <tr>
            {Object.values(tabularData.residual_qi).map((value, index) => {
              return <td key={index}>{value}</td>;
            })}
          </tr>
        </>
      ) : (
        <tr>
          <th>
            {heading === "heavenly_stems"
              ? "Troncos Celestiales"
              : "Ramas Terrestres"}
          </th>
          {Object.values(tabularData).map((value, index) => {
            return <td key={index}>{value}</td>;
          })}
        </tr>
      )}
    </>
  );
};
