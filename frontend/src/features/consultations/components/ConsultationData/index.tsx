import "./ConsultationData.css";
import { IConsultation } from "../../types/consultation.types";

type Props = {
  consultation: IConsultation;
  readableDate: string;
};
export const ConsultationData = (props: Props) => {
  const { readableDate, consultation } = props;

  return (
    <article className="consultation-data">
      <h1>Sesión del {readableDate}</h1>
      <div className="consultation-data-content">
        <img
          src={consultation.patient_tongue_image || "/img/placeholder.svg"}
          alt="Imagen de la lengua del paciente"
        />
        <div className="consultation-description">
          <hgroup>
            <h3>Evolución del paciente</h3>
            <p>{consultation.evolution}</p>
          </hgroup>
          <hgroup>
            <h3>Tratamiento</h3>
            <p>{consultation.treatment}</p>
          </hgroup>
        </div>
      </div>
    </article>
  );
};
