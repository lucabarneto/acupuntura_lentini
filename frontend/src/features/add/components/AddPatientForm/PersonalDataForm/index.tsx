import { Button } from "../../../../../components/ui/Button";
import { FileInput } from "../../../../../components/ui/Input/File";
import { TextInput } from "../../../../../components/ui/Input/Text";
import { UseForm } from "../../../../../hooks/useForm";

type Props = { formData: UseForm; moveToNextStage(): void };

export const PersonalDataForm = ({ formData, moveToNextStage }: Props) => {
  const { rawForm, errors, handleChange, handleBlur } = formData;

  return (
    <>
      <header>
        <h1>Datos personales</h1>
        <Button
          type="filled"
          label="Continuar"
          onclickEvent={(e) => {
            e!.preventDefault();
            moveToNextStage();
          }}
        />
      </header>
      <div className="personal-data-form">
        <FileInput onchangeEvent={handleChange} form="add-patient-form" />
        <TextInput
          label="Nombre*"
          id="first_name"
          type="text"
          form="add-patient-form"
          value={rawForm.first_name.value as string}
          error={errors.first_name}
          onchangeEvent={handleChange}
          onblurEvent={handleBlur}
          required
        />
        <TextInput
          label="Apellido*"
          id="last_name"
          type="text"
          form="add-patient-form"
          value={rawForm.last_name.value as string}
          error={errors.last_name}
          onchangeEvent={handleChange}
          onblurEvent={handleBlur}
          required
        />
        <TextInput
          label="Correo*"
          id="mail"
          type="email"
          form="add-patient-form"
          value={rawForm.mail.value as string}
          error={errors.mail}
          onchangeEvent={handleChange}
          onblurEvent={handleBlur}
          required
        />
        <TextInput
          label="Edad*"
          id="age"
          type="text"
          form="add-patient-form"
          value={rawForm.age.value as string}
          error={errors.age}
          onblurEvent={handleBlur}
          onchangeEvent={handleChange}
          required
        />
        <TextInput
          label="Teléfono*"
          id="tel"
          type="tel"
          form="add-patient-form"
          value={rawForm.tel.value as string}
          error={errors.tel}
          onblurEvent={handleBlur}
          onchangeEvent={handleChange}
          required
        />
        <TextInput
          label="Estado civil*"
          id="marital_status"
          type="text"
          form="add-patient-form"
          error={errors.marital_status}
          value={rawForm.marital_status.value as string}
          onblurEvent={handleBlur}
          onchangeEvent={handleChange}
          required
        />
      </div>
    </>
  );
};
