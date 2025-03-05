import "./PersonalData.css";
import { Button } from "../../../../components/ui/Button";

type Props = {
  firstName: string;
  lastName: string;
  age: string;
  maritalStatus: "casado/a" | "soltero/a";
  tel: string;
  mail: string;
  profilePicture?: string;
};
export const PersonalData = ({
  firstName,
  lastName,
  age,
  maritalStatus,
  tel,
  mail,
  profilePicture,
}: Props) => {
  return (
    <article className="personal-data">
      <img src={profilePicture} alt="Foto de perfil de la persona usuaria" />
      <div className="personal-data-content">
        <h1>
          {firstName} {lastName}
        </h1>
        <ul>
          <li>Edad: {age} años</li>
          <li>Estado civil: {maritalStatus}</li>
          <li>Correo: {mail}</li>
          <li>Teléfono: {tel}</li>
        </ul>
        <div className="contact-buttons-container">
          <Button icon="chat" label="Enviar Mensaje" type="outlined" />
          <Button icon="mail" label="Enviar Correo" type="outlined" />
        </div>
      </div>
    </article>
  );
};
