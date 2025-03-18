import "./AddPresumptiveAnalysisForm.css";
import { TextInput } from "../../../../components/ui/Input/Text";
import { UseForm } from "../../../../hooks/useForm";
import { PresumptiveAnalysisType } from "../../../patients/types/presumptive_analysis.types";

type Props = {
  formData: UseForm<PresumptiveAnalysisType>;
  formId: string;
};

export const AddPresumptiveAnalysisForm = (props: Props) => {
  const { formData, formId } = props;
  const { form, formMethods } = formData;

  return (
    <>
      <form
        id={formId}
        className="add-presumptive-analysis-form"
        onSubmit={formMethods.handleSubmit}
      >
        <TextInput
          id="meridian_time"
          label="Horario de Meridiano"
          type="text"
          value={form.fields.meridian_time}
          error={form.errors.meridian_time}
          group="presumptive_analysis"
          blurEvent={formMethods.handleBlur}
          changeEvent={formMethods.handleChange}
        />
        <TextInput
          id="feeding"
          label="Alimentación"
          type="text"
          form="add-patient-form"
          value={form.fields.feeding}
          error={form.errors.feeding}
          group="presumptive_analysis"
          blurEvent={formMethods.handleBlur}
          changeEvent={formMethods.handleChange}
        />
        <TextInput
          id="yin"
          label="Yin"
          type="text"
          form="add-patient-form"
          value={form.fields.yin}
          error={form.errors.yin}
          group="presumptive_analysis"
          blurEvent={formMethods.handleBlur}
          changeEvent={formMethods.handleChange}
        />
        <TextInput
          id="yang"
          label="Yang"
          type="text"
          form="add-patient-form"
          value={form.fields.yang}
          error={form.errors.yang}
          group="presumptive_analysis"
          blurEvent={formMethods.handleBlur}
          changeEvent={formMethods.handleChange}
        />
        <TextInput
          id="qi"
          label="Qi"
          type="text"
          form="add-patient-form"
          value={form.fields.qi}
          error={form.errors.qi}
          group="presumptive_analysis"
          blurEvent={formMethods.handleBlur}
          changeEvent={formMethods.handleChange}
        />
        <TextInput
          id="xue"
          label="Xue"
          type="text"
          form="add-patient-form"
          value={form.fields.xue}
          error={form.errors.xue}
          group="presumptive_analysis"
          blurEvent={formMethods.handleBlur}
          changeEvent={formMethods.handleChange}
        />
        <TextInput
          id="jin_ye"
          label="Jin Ye"
          type="text"
          form="add-patient-form"
          value={form.fields.jin_ye}
          error={form.errors.jin_ye}
          group="presumptive_analysis"
          blurEvent={formMethods.handleBlur}
          changeEvent={formMethods.handleChange}
        />
        <TextInput
          id="mental_vitality_jing_shen"
          label="Jing Shen Vit. Mental"
          type="text"
          form="add-patient-form"
          value={form.fields.mental_vitality_jing_shen}
          error={form.errors.mental_vitality_jing_shen}
          group="presumptive_analysis"
          blurEvent={formMethods.handleBlur}
          changeEvent={formMethods.handleChange}
        />
        <TextInput
          id="ancestral_jing"
          label="Jing Ancestral"
          type="text"
          form="add-patient-form"
          value={form.fields.ancestral_jing}
          error={form.errors.ancestral_jing}
          group="presumptive_analysis"
          blurEvent={formMethods.handleBlur}
          changeEvent={formMethods.handleChange}
        />
      </form>
    </>
  );
};
