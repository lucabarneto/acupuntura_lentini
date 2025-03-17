type TableProps = "hour" | "day" | "month" | "year";

interface HiddenStems {
  heading: "hidden_stems";
  tabularData: {
    first_row: Record<TableProps, string>;
    second_row: Record<TableProps, string>;
    third_row: Record<TableProps, string>;
  };
}

interface HeavenlyStems {
  heading: "heavenly_stems";
  tabularData: Record<TableProps, string>;
}

interface EarthlyBranches {
  heading: "earthly_branches";
  tabularData: Record<TableProps, string>;
}

type Props = HeavenlyStems | EarthlyBranches | HiddenStems;

export const BaziTableRow = ({ heading, tabularData }: Props) => {
  return (
    <>
      {heading === "hidden_stems" ? (
        <>
          <tr>
            <th rowSpan={3}>Troncos Ocultos</th>
            <td>{tabularData.first_row.hour}</td>
            <td>{tabularData.first_row.day}</td>
            <td>{tabularData.first_row.month}</td>
            <td>{tabularData.first_row.year}</td>
          </tr>
          <tr>
            <td>{tabularData.second_row.hour}</td>
            <td>{tabularData.second_row.day}</td>
            <td>{tabularData.second_row.month}</td>
            <td>{tabularData.second_row.year}</td>
          </tr>
          <tr>
            <td>{tabularData.third_row.hour}</td>
            <td>{tabularData.third_row.day}</td>
            <td>{tabularData.third_row.month}</td>
            <td>{tabularData.third_row.year}</td>
          </tr>
        </>
      ) : (
        <tr>
          <th>
            {heading === "heavenly_stems"
              ? "Troncos Celestiales"
              : "Ramas Terrestres"}
          </th>
          <td>{tabularData.hour}</td>
          <td>{tabularData.day}</td>
          <td>{tabularData.month}</td>
          <td>{tabularData.year}</td>
        </tr>
      )}
    </>
  );
};
