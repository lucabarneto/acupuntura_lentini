import "./PersonalData.css";
import { IPatientForm } from "../../types/patient.types";
import { Icon } from "../../../../components/ui/Icon";

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
        src={
          profile_picture
            ? (profile_picture as string)
            : "/img/user_placeholder.svg"
        }
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
          <a
            className="button outlined has-icon"
            href={`https://wa.me/${tel}`}
            target="_blank"
            rel="external"
            title="Abre una nueva pestaña"
          >
            <Icon icon="chat" /> Enviar mensage
          </a>
          <a
            className="button outlined has-icon"
            href={`mailto:${mail}`}
            target="_blank"
            rel="external"
            title="Abre una nueva pestaña"
          >
            <Icon icon="mail" /> Enviar correo
          </a>
        </div>
      </div>
    </article>
  );
};
