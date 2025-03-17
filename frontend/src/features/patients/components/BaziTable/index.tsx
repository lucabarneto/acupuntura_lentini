import "./BaziTable.css";

type Props = {
  children: React.ReactNode;
};

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
        <tbody>{props.children}</tbody>
      </table>
    </>
  );
};
