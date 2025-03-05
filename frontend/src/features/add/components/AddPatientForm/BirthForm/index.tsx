import { Button } from "../../../../../components/ui/Button";
import { TextInput } from "../../../../../components/ui/Input/Text";
import { DateInput } from "../../../../../components/ui/Input/Date";
import { UseForm } from "../../../../../hooks/useForm";
import { BaziTable } from "../../../../patients/components/Birth/BaziTable";

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
            type="text"
            label="Volver"
            onclickEvent={moveToPreviousStage}
          />
          <Button
            type="filled"
            label="Continuar"
            onclickEvent={moveToNextStage}
          />
        </div>
      </header>
      <div className="birth-form">
        <div className="birth-data">
          <DateInput
            id="date"
            label="Fecha"
            form="add-patient-form"
            value={rawForm.date.value as string}
            error={errors.date}
            onblurEvent={handleBlur}
            onchangeEvent={handleChange}
          />
          <TextInput
            type="text"
            id="time"
            label="Hora"
            form="add-patient-form"
            value={rawForm.time.value as string}
            error={errors.time}
            onblurEvent={handleBlur}
            onchangeEvent={handleChange}
          />
          <TextInput
            type="text"
            id="location"
            label="Localidad"
            form="add-patient-form"
            value={rawForm.location.value as string}
            error={errors.location}
            onblurEvent={handleBlur}
            onchangeEvent={handleChange}
          />
        </div>
        <BaziTable type="input" />
      </div>
    </>
  );
};
