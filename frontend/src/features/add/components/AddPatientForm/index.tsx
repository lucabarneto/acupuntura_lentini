import "./AddPatientForm.css";
import { FileInput } from "../../../../components/ui/Input/File";
import { TextInput } from "../../../../components/ui/Input/Text";
import { IPatientForm } from "../../../patients/types/patient.types";
import { FormProps } from "../../../../types/general.types";
type Props = FormProps<IPatientForm>;

export const AddPatientForm = (props: Props) => {
  const { form, formId } = props;
  const { formData, formMethods } = form;

  return (
    <>
      <form
        className="add-patient-form"
        id={formId}
        onSubmit={formMethods.handleSubmit}
      >
        <article className="add-patient-personal-data">
          <h2>Datos personales</h2>
          <div className="add-patient-personal-data-inputs">
            <TextInput
              label="Nombre*"
              id="first_name"
              type="text"
              value={formData.fields.first_name}
              error={formData.errors.first_name}
              changeEvent={formMethods.handleChange}
              blurEvent={formMethods.handleBlur}
              required
              title="Escribe el nombre del paciente aquí"
            />
            <TextInput
              label="Apellido*"
              id="last_name"
              type="text"
              value={formData.fields.last_name}
              error={formData.errors.last_name}
              changeEvent={formMethods.handleChange}
              blurEvent={formMethods.handleBlur}
              required
              title="Escribe el apellido del paciente aquí"
            />
            <TextInput
              label="Correo*"
              id="mail"
              type="email"
              value={formData.fields.mail}
              error={formData.errors.mail}
              changeEvent={formMethods.handleChange}
              blurEvent={formMethods.handleBlur}
              required
              title="Escribe el correo electrónico del paciente aquí"
            />
            <TextInput
              label="Edad*"
              id="age"
              type="text"
              value={formData.fields.age}
              error={formData.errors.age}
              changeEvent={formMethods.handleChange}
              blurEvent={formMethods.handleBlur}
              required
              title="Escribe la edad del paciente aquí"
            />
            <TextInput
              label="Teléfono*"
              id="tel"
              type="tel"
              value={formData.fields.tel}
              error={formData.errors.tel}
              changeEvent={formMethods.handleChange}
              blurEvent={formMethods.handleBlur}
              required
              title="Escribe el número de teléfono del paciente aquí"
            />
            <TextInput
              label="Estado civil*"
              id="marital_status"
              type="text"
              value={formData.fields.marital_status}
              error={formData.errors.marital_status}
              changeEvent={formMethods.handleChange}
              blurEvent={formMethods.handleBlur}
              required
              title="Selecciona el estado civil del paciente aquí"
            />
            <FileInput
              id="profile_picture"
              changeEvent={formMethods.handleChange}
            />
          </div>
        </article>
        <article className="add-patient-birth-data">
          <h2>Nacimiento</h2>
          <div className="add-patient-birth-data-inputs">
            <TextInput
              type="date"
              id="date"
              label="Fecha"
              value={formData.fields.birth.date}
              error={formData.errors.date}
              group="birth"
              blurEvent={formMethods.handleBlur}
              changeEvent={(e) => formMethods.handleChange(e, 1)}
            />
            <TextInput
              type="text"
              id="time"
              label="Hora"
              value={formData.fields.birth.time}
              error={formData.errors.time}
              group="birth"
              blurEvent={formMethods.handleBlur}
              changeEvent={(e) => formMethods.handleChange(e, 1)}
            />
            <TextInput
              type="text"
              id="location"
              label="Localidad"
              value={formData.fields.birth.location}
              error={formData.errors.location}
              group="birth"
              blurEvent={formMethods.handleBlur}
              changeEvent={(e) => formMethods.handleChange(e, 1)}
            />
          </div>
        </article>
      </form>
    </>
  );
};
