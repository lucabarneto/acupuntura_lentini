import { Button } from "../../../../../components/ui/Button";
import { TextInput } from "../../../../../components/ui/Input/Text";
// import { DateInput } from "../../../../../components/ui/Input/Date";
import { UseForm } from "../../../../../hooks/useForm";
import { BaziTable } from "../../../../patients/components/BaziTable";

type Props = {
  formData: UseForm;
  moveToNextStage(): void;
  moveToPreviousStage(): void;
};
export const BirthForm = ({
  formData,
  moveToNextStage,
  moveToPreviousStage,
}: Props) => {
  const { rawForm, errors, handleBlur, handleChange } = formData;

  return (
    <>
      <header>
        <h1>Nacimiento</h1>
        <div className="stage-buttons">
          <Button
            type="button"
            variant="text"
            label="Volver"
            clickEvent={moveToPreviousStage}
          />
          <Button
            type="button"
            variant="filled"
            label="Continuar"
            clickEvent={moveToNextStage}
          />
        </div>
      </header>
      <div className="birth-form">
        <div className="birth-data">
          <TextInput
            type="date"
            id="date"
            label="Fecha"
            form="add-patient-form"
            value={rawForm.date.value as string}
            error={errors.date}
            group="birth"
            blurEvent={handleBlur}
            changeEvent={handleChange}
          />
          <TextInput
            type="text"
            id="time"
            label="Hora"
            form="add-patient-form"
            value={rawForm.time.value as string}
            error={errors.time}
            group="birth"
            blurEvent={handleBlur}
            changeEvent={handleChange}
          />
          <TextInput
            type="text"
            id="location"
            label="Localidad"
            form="add-patient-form"
            value={rawForm.location.value as string}
            error={errors.location}
            group="birth"
            blurEvent={handleBlur}
            changeEvent={handleChange}
          />
        </div>
        <BaziTable type="input" />
      </div>
    </>
  );
};
