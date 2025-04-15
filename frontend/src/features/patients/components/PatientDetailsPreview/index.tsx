import "./PatientDetailsPreview.css";
import { IPatient } from "../../types/patient.types";

type Props = {
  patient: IPatient;
};
export const PatientDetailsPreview = (props: Props) => {
  const { patient } = props;
  return (
    <article className="patient-details-preview">
      <img
        src={
          patient.profile_picture
            ? (patient.profile_picture as string)
            : "/img/user_placeholder.svg"
        }
        alt="Foto de perfil de la persona paciente"
      />
      <div>
        <p>Paciente</p>
        <h3>
          {patient.first_name} {patient.last_name}
        </h3>
        <p>{patient.mail}</p>
        <p>
          {patient.age} años - {patient.marital_status}
        </p>
      </div>
    </article>
  );
};
