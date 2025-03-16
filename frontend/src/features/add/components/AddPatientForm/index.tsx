import "./AddPatientForm.css";
import { FileInput } from "../../../../components/ui/Input/File";
import { TextInput } from "../../../../components/ui/Input/Text";
import { UseForm } from "../../../../hooks/useForm";
import { IPatientForm } from "../../../patients/types/IPatient";

type Props = {
  formData: UseForm<IPatientForm>;
};

export const AddPatientForm = ({ formData }: Props) => {
  const { form, formMethods } = formData;

  return (
    <>
      <form
        className="add-patient-form"
        id="add-patient-form"
        onSubmit={formMethods.handleSubmit}
      >
        <div className="add-patient-personal-data">
          <h2>Datos personales</h2>
          <div className="add-patient-personal-data-inputs">
            <TextInput
              label="Nombre*"
              id="first_name"
              type="text"
              value={form.fields.first_name}
              error={form.errors.first_name}
              changeEvent={formMethods.handleChange}
              blurEvent={formMethods.handleBlur}
              required
              title="Escribe el nombre del paciente aquí"
            />
            <TextInput
              label="Apellido*"
              id="last_name"
              type="text"
              value={form.fields.last_name}
              error={form.errors.last_name}
              changeEvent={formMethods.handleChange}
              blurEvent={formMethods.handleBlur}
              required
              title="Escribe el apellido del paciente aquí"
            />
            <TextInput
              label="Correo*"
              id="mail"
              type="email"
              value={form.fields.mail}
              error={form.errors.mail}
              changeEvent={formMethods.handleChange}
              blurEvent={formMethods.handleBlur}
              required
              title="Escribe el correo electrónico del paciente aquí"
            />
            <TextInput
              label="Edad*"
              id="age"
              type="text"
              value={form.fields.age}
              error={form.errors.age}
              changeEvent={formMethods.handleChange}
              blurEvent={formMethods.handleBlur}
              required
              title="Escribe la edad del paciente aquí"
            />
            <TextInput
              label="Teléfono*"
              id="tel"
              type="tel"
              value={form.fields.tel}
              error={form.errors.tel}
              changeEvent={formMethods.handleChange}
              blurEvent={formMethods.handleBlur}
              required
              title="Escribe el número de teléfono del paciente aquí"
            />
            <TextInput
              label="Estado civil*"
              id="marital_status"
              type="text"
              value={form.fields.marital_status}
              error={form.errors.marital_status}
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
        </div>
        <div className="add-patient-birth-data">
          <h2>Nacimiento</h2>
          <div className="add-patient-birth-data-inputs">
            <TextInput
              type="date"
              id="date"
              label="Fecha"
              value={form.fields.birth.date}
              error={form.errors.date}
              group="birth"
              blurEvent={formMethods.handleBlur}
              changeEvent={(e) => formMethods.handleChange(e, 1)}
            />
            <TextInput
              type="text"
              id="time"
              label="Hora"
              value={form.fields.birth.time}
              error={form.errors.time}
              group="birth"
              blurEvent={formMethods.handleBlur}
              changeEvent={(e) => formMethods.handleChange(e, 1)}
            />
            <TextInput
              type="text"
              id="location"
              label="Localidad"
              value={form.fields.birth.location}
              error={form.errors.location}
              group="birth"
              blurEvent={formMethods.handleBlur}
              changeEvent={(e) => formMethods.handleChange(e, 1)}
            />
          </div>
        </div>
      </form>
    </>
  );
};
