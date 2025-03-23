import "./PersonalData.css";
import { Button } from "../../../../components/ui/Button";
import { IPatientForm } from "../../types/patient.types";

type Props = {
  data: Omit<IPatientForm, "birth">;
};

export const PersonalData = (props: Props) => {
  const {
    first_name,
    last_name,
    tel,
    mail,
    marital_status,
    profile_picture,
    age,
  } = props.data;
  return (
    <article className="personal-data">
      <img
        src={profile_picture as string}
        alt="Foto de perfil de la persona usuaria"
      />
      <div className="personal-data-content">
        <h1>
          {first_name} {last_name}
        </h1>
        <ul>
          <li className="text-item">Edad: {age} años</li>
          <li className="text-item">Estado civil: {marital_status}</li>
          <li className="text-item">Correo: {mail}</li>
          <li className="text-item">Teléfono: {tel}</li>
        </ul>
        <div className="contact-buttons-container">
          <Button
            icon="chat"
            label="Enviar Mensaje"
            variant="outlined"
            type="button"
          />
          <Button
            icon="mail"
            label="Enviar Correo"
            variant="outlined"
            type="button"
          />
        </div>
      </div>
    </article>
  );
};
