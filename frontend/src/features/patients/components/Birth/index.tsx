import "./Birth.css";

type Props = {
  date?: string;
  time?: string;
  location?: string;
};

export const Birth = ({ date, time, location }: Props) => {
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
    </article>
  );
};
