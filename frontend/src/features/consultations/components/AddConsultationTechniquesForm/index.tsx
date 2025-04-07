import "./AddConsultationTechniquesForm.css";
import { Button } from "../../../../components/ui/Button";
import { CheckboxInput } from "../../../../components/ui/Input/Checkbox";
import { AnyObject, FormProps } from "../../../../types/general.types";
import { UseConsultationTechniques } from "../../hooks/useConsultationTechniques";

type Props = FormProps<AnyObject> & {
  consultationTechniques: UseConsultationTechniques;
};

export const AddConsultationTechniquesForm = (props: Props) => {
  const { consultationTechniques, form, formId } = props;
  const { formMethods } = form;
  const { techniqueData, techniqueMethods } = consultationTechniques;
  const { remainingStages, currentTechnique, techniques } = techniqueData;
  return (
    <section className="add-consultation-techniques-form">
      <header>
        <h1>Selección de valores</h1>
        <div>
          {remainingStages !== techniques.length && (
            <Button
              type="button"
              variant="text"
              label="Volver"
              clickEvent={techniqueMethods.moveToPreviousTechnique}
            />
          )}
          {remainingStages === 1 ? (
            <Button
              key="submitbutton"
              type="submit"
              form={formId}
              label="Añadir técnicas"
              icon="add"
              variant="filled"
              clickEvent={() => console.log("Submit button was clicked!")}
            />
          ) : (
            <Button
              key="continuebutton"
              type="button"
              variant="outlined"
              label="Continuar"
              clickEvent={techniqueMethods.moveToNextTechnique}
            />
          )}
        </div>
      </header>
      <form id={formId} onSubmit={formMethods.handleSubmit}></form>
      <article className="technique-values">
        <img src={currentTechnique?.image} alt="" />
        <div>
          <hgroup>
            <h2>{currentTechnique?.title}</h2>
            <p>Elige uno o varios de los valores a continuación.</p>
          </hgroup>
          <div className="technique-values-inputs">
            {currentTechnique?.resource_values.map((value, index) => (
              <CheckboxInput
                key={`${index}-${currentTechnique._id}`}
                label={value}
                value={value}
                name={currentTechnique._id}
                id={`${currentTechnique.title}-${value}`}
                form={formId}
                changeEvent={formMethods.handleChange}
              />
            ))}
          </div>
        </div>
      </article>
    </section>
  );
};
