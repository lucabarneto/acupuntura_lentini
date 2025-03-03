type Props = {
  nestedRows?: true;
  heading: string;
  tabularData: {
    hour: string | [string, string, string];
    day: string | [string, string, string];
    month: string | [string, string, string];
    year: string | [string, string, string];
  };
};

export const BaziTableRow = ({ heading, tabularData, nestedRows }: Props) => {
  return nestedRows ? (
    <>
      <tr>
        <th rowSpan={3}>{heading}</th>
        <td>{tabularData.hour[0]}</td>
        <td>{tabularData.day[0]}</td>
        <td>{tabularData.month[0]}</td>
        <td>{tabularData.year[0]}</td>
      </tr>
      <tr>
        <td>{tabularData.hour[1]}</td>
        <td>{tabularData.day[1]}</td>
        <td>{tabularData.month[1]}</td>
        <td>{tabularData.year[1]}</td>
      </tr>
      <tr>
        <td>{tabularData.hour[2]}</td>
        <td>{tabularData.day[2]}</td>
        <td>{tabularData.month[2]}</td>
        <td>{tabularData.year[2]}</td>
      </tr>
    </>
  ) : (
    <tr>
      <th>{heading}</th>
      <td>{tabularData.hour}</td>
      <td>{tabularData.day}</td>
      <td>{tabularData.month}</td>
      <td>{tabularData.year}</td>
    </tr>
  );
};
