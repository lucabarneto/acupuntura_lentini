import { UseForm } from "../../../../hooks/useForm";
import { FileInput } from "../../../../components/ui/Input/File";
import { TextInput } from "../../../../components/ui/Input/Text";
import { DateInput } from "../../../../components/ui/Input/Date";
import { BaziTable } from "../../../patients/components/Birth/BaziTable";

type Props = {
  form: UseForm;
  currentStage: number;
};

export const AddPatientForm = ({ form, currentStage }: Props) => {
  const { rawForm, errors, handleChange, handleBlur, handleSubmit } = form;

  return (
    <form onSubmit={handleSubmit} id="add-patient-form">
      {currentStage === 1 && (
        <div className="personal-data">
          <FileInput
            value={rawForm.profile_picture.value}
            onchangeEvent={handleChange}
          />
          <TextInput
            label="Nombre"
            id="first_name"
            type="text"
            value={rawForm.first_name.value}
            error={errors.first_name}
            onchangeEvent={handleChange}
            onblurEvent={handleBlur}
          />
          <TextInput
            label="Apellido"
            id="last_name"
            type="text"
            value={rawForm.last_name.value}
            error={errors.last_name}
            onchangeEvent={handleChange}
            onblurEvent={handleBlur}
          />
          <TextInput
            label="Correo"
            id="mail"
            type="email"
            value={rawForm.mail.value}
            error={errors.mail}
            onchangeEvent={handleChange}
            onblurEvent={handleBlur}
          />
          <TextInput
            label="Edad"
            id="age"
            type="text"
            value={rawForm.age.value}
            error={errors.age}
            onblurEvent={handleBlur}
            onchangeEvent={handleChange}
          />
          <TextInput
            label="Teléfono"
            id="tel"
            type="tel"
            value={rawForm.tel.value}
            error={errors.tel}
            onblurEvent={handleBlur}
            onchangeEvent={handleChange}
          />
          <TextInput
            label="Estado civil"
            id="marital_status"
            type="text"
            error={errors.marital_status}
            value={rawForm.marital_status.value as string}
            onblurEvent={handleBlur}
            onchangeEvent={handleChange}
          />
        </div>
      )}
      {currentStage === 2 && (
        <div className="birth">
          <div className="birth-data">
            <DateInput
              id="date"
              label="Fecha"
              value={rawForm.date.value}
              error={errors.date}
              onblurEvent={handleBlur}
              onchangeEvent={handleChange}
            />
            <TextInput
              type="text"
              id="time"
              label="Hora"
              value={rawForm.time.value}
              error={errors.time}
              onblurEvent={handleBlur}
              onchangeEvent={handleChange}
            />
            <TextInput
              type="text"
              id="location"
              label="Localidad"
              value={rawForm.location.value}
              error={errors.location}
              onblurEvent={handleBlur}
              onchangeEvent={handleChange}
            />
          </div>
          <BaziTable type="input" />
        </div>
      )}
      {currentStage === 3 && (
        <div className="presumptive-analysis">
          <TextInput
            id="meridian_time"
            label="Horario de Meridiano"
            type="text"
            value={rawForm.meridian_time.value}
            error={errors.meridian_time}
            onblurEvent={handleBlur}
            onchangeEvent={handleChange}
          />
          <TextInput
            id="feeding"
            label="Alimentación"
            type="text"
            value={rawForm.feeding.value}
            error={errors.feeding}
            onblurEvent={handleBlur}
            onchangeEvent={handleChange}
          />
          <TextInput
            id="yin"
            label="Yin"
            type="text"
            value={rawForm.yin.value}
            error={errors.yin}
            onblurEvent={handleBlur}
            onchangeEvent={handleChange}
          />
          <TextInput
            id="yang"
            label="Yang"
            type="text"
            value={rawForm.yang.value}
            error={errors.yang}
            onblurEvent={handleBlur}
            onchangeEvent={handleChange}
          />
          <TextInput
            id="qi"
            label="Qi"
            type="text"
            value={rawForm.qi.value}
            error={errors.qi}
            onblurEvent={handleBlur}
            onchangeEvent={handleChange}
          />
          <TextInput
            id="xue"
            label="Xue"
            type="text"
            value={rawForm.xue.value}
            error={errors.xue}
            onblurEvent={handleBlur}
            onchangeEvent={handleChange}
          />
          <TextInput
            id="jin_ye"
            label="Jin Ye"
            type="text"
            value={rawForm.jin_ye.value}
            error={errors.jin_ye}
            onblurEvent={handleBlur}
            onchangeEvent={handleChange}
          />
          <TextInput
            id="mental_vitality_jing_shen"
            label="Jing Shen Vit. Mental"
            type="text"
            value={rawForm.mental_vitality_jing_shen.value}
            error={errors.mental_vitality_jing_shen}
            onblurEvent={handleBlur}
            onchangeEvent={handleChange}
          />
          <TextInput
            id="ancestral_jing"
            label="Jing Ancestral"
            type="text"
            value={rawForm.ancestral_jing.value}
            error={errors.ancestral_jing}
            onblurEvent={handleBlur}
            onchangeEvent={handleChange}
          />
        </div>
      )}
    </form>
  );
};
