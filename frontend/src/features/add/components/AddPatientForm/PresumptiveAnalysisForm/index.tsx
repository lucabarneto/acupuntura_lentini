import { RefObject } from "react";
import { Button } from "../../../../../components/ui/Button";
import { TextInput } from "../../../../../components/ui/Input/Text";
import { UseForm } from "../../../../../hooks/useForm";

type Props = {
  formData: UseForm;
  moveToPreviousStage(): void;
  submitButton: RefObject<null | HTMLButtonElement>;
};
export const PresumptiveAnalysisForm = ({
  formData,
  moveToPreviousStage,
  submitButton,
}: Props) => {
  const { rawForm, errors, handleBlur, handleChange } = formData;

  return (
    <>
      <header>
        <h1>Análisis Presuntivo</h1>
        <div className="stage-buttons">
          <Button
            type="button"
            variant="text"
            label="Volver"
            clickEvent={moveToPreviousStage}
          />
          <Button
            type="submit"
            variant="filled"
            ref={submitButton}
            icon="add"
            label="Añadir paciente"
            form="add-patient-form"
          />
        </div>
      </header>
      <div className="presumptive-analysis-form">
        <TextInput
          id="meridian_time"
          label="Horario de Meridiano"
          type="text"
          form="add-patient-form"
          value={rawForm.meridian_time.value as string}
          error={errors.meridian_time}
          blurEvent={handleBlur}
          changeEvent={handleChange}
        />
        <TextInput
          id="feeding"
          label="Alimentación"
          type="text"
          form="add-patient-form"
          value={rawForm.feeding.value as string}
          error={errors.feeding}
          blurEvent={handleBlur}
          changeEvent={handleChange}
        />
        <TextInput
          id="yin"
          label="Yin"
          type="text"
          form="add-patient-form"
          value={rawForm.yin.value as string}
          error={errors.yin}
          blurEvent={handleBlur}
          changeEvent={handleChange}
        />
        <TextInput
          id="yang"
          label="Yang"
          type="text"
          form="add-patient-form"
          value={rawForm.yang.value as string}
          error={errors.yang}
          blurEvent={handleBlur}
          changeEvent={handleChange}
        />
        <TextInput
          id="qi"
          label="Qi"
          type="text"
          form="add-patient-form"
          value={rawForm.qi.value as string}
          error={errors.qi}
          blurEvent={handleBlur}
          changeEvent={handleChange}
        />
        <TextInput
          id="xue"
          label="Xue"
          type="text"
          form="add-patient-form"
          value={rawForm.xue.value as string}
          error={errors.xue}
          blurEvent={handleBlur}
          changeEvent={handleChange}
        />
        <TextInput
          id="jin_ye"
          label="Jin Ye"
          type="text"
          form="add-patient-form"
          value={rawForm.jin_ye.value as string}
          error={errors.jin_ye}
          blurEvent={handleBlur}
          changeEvent={handleChange}
        />
        <TextInput
          id="mental_vitality_jing_shen"
          label="Jing Shen Vit. Mental"
          type="text"
          form="add-patient-form"
          value={rawForm.mental_vitality_jing_shen.value as string}
          error={errors.mental_vitality_jing_shen}
          blurEvent={handleBlur}
          changeEvent={handleChange}
        />
        <TextInput
          id="ancestral_jing"
          label="Jing Ancestral"
          type="text"
          form="add-patient-form"
          value={rawForm.ancestral_jing.value as string}
          error={errors.ancestral_jing}
          blurEvent={handleBlur}
          changeEvent={handleChange}
        />
      </div>
    </>
  );
};
