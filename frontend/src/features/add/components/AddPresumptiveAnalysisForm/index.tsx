import "./AddPresumptiveAnalysisForm.css";
import { TextInput } from "../../../../components/ui/Input/Text";
import { PresumptiveAnalysisType } from "../../../patients/types/presumptive_analysis.types";
import { FormProps } from "../../../../types/general.types";

type Props = FormProps<PresumptiveAnalysisType>;

export const AddPresumptiveAnalysisForm = (props: Props) => {
  const { form, formId } = props;
  const { formData, formMethods } = form;

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
          value={formData.fields.meridian_time}
          error={formData.errors.meridian_time}
          group="presumptive_analysis"
          blurEvent={formMethods.handleBlur}
          changeEvent={formMethods.handleChange}
        />
        <TextInput
          id="feeding"
          label="Alimentación"
          type="text"
          form="add-patient-form"
          value={formData.fields.feeding}
          error={formData.errors.feeding}
          group="presumptive_analysis"
          blurEvent={formMethods.handleBlur}
          changeEvent={formMethods.handleChange}
        />
        <TextInput
          id="yin"
          label="Yin"
          type="text"
          form="add-patient-form"
          value={formData.fields.yin}
          error={formData.errors.yin}
          group="presumptive_analysis"
          blurEvent={formMethods.handleBlur}
          changeEvent={formMethods.handleChange}
        />
        <TextInput
          id="yang"
          label="Yang"
          type="text"
          form="add-patient-form"
          value={formData.fields.yang}
          error={formData.errors.yang}
          group="presumptive_analysis"
          blurEvent={formMethods.handleBlur}
          changeEvent={formMethods.handleChange}
        />
        <TextInput
          id="qi"
          label="Qi"
          type="text"
          form="add-patient-form"
          value={formData.fields.qi}
          error={formData.errors.qi}
          group="presumptive_analysis"
          blurEvent={formMethods.handleBlur}
          changeEvent={formMethods.handleChange}
        />
        <TextInput
          id="xue"
          label="Xue"
          type="text"
          form="add-patient-form"
          value={formData.fields.xue}
          error={formData.errors.xue}
          group="presumptive_analysis"
          blurEvent={formMethods.handleBlur}
          changeEvent={formMethods.handleChange}
        />
        <TextInput
          id="jin_ye"
          label="Jin Ye"
          type="text"
          form="add-patient-form"
          value={formData.fields.jin_ye}
          error={formData.errors.jin_ye}
          group="presumptive_analysis"
          blurEvent={formMethods.handleBlur}
          changeEvent={formMethods.handleChange}
        />
        <TextInput
          id="mental_vitality_jing_shen"
          label="Jing Shen Vit. Mental"
          type="text"
          form="add-patient-form"
          value={formData.fields.mental_vitality_jing_shen}
          error={formData.errors.mental_vitality_jing_shen}
          group="presumptive_analysis"
          blurEvent={formMethods.handleBlur}
          changeEvent={formMethods.handleChange}
        />
        <TextInput
          id="ancestral_jing"
          label="Jing Ancestral"
          type="text"
          form="add-patient-form"
          value={formData.fields.ancestral_jing}
          error={formData.errors.ancestral_jing}
          group="presumptive_analysis"
          blurEvent={formMethods.handleBlur}
          changeEvent={formMethods.handleChange}
        />
      </form>
    </>
  );
};
