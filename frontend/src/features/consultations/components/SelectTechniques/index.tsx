import "./SelectTechniques.css";
import { Button } from "../../../../components/ui/Button";
import { RadioInput } from "../../../../components/ui/Input/Radio";
import { SelectInput } from "../../../../components/ui/Input/Select";
import { ResourceCarrousel } from "../../../resources/components/ResourceCarrousel";
import { UseConsultationTechniques } from "../../hooks/useConsultationTechniques";
import { IResource } from "../../../resources/types/resource.types";
import { SelectOptions } from "../../../../components/ui/Input/input.types";

type Props = {
  resources: IResource[];
  templateSelectOptions: SelectOptions[];
  consultationTechniques: UseConsultationTechniques;
};

export const SelectTechniques = (props: Props) => {
  const { resources, templateSelectOptions, consultationTechniques } = props;
  const { techniqueData, techniqueMethods } = consultationTechniques;

  return (
    <section className="select-techniques">
      <header>
        <h1>Elige qué técnicas utilizar</h1>
        <Button
          label="Continuar"
          type="button"
          variant="filled"
          clickEvent={async () => {
            if (techniqueData.inputTechniques) {
              await techniqueMethods.setConsultationTechniques(
                techniqueData.inputTechniques
              );
              techniqueMethods.startForm();
            }
          }}
        />
      </header>

      <div className="choose-entity">
        <RadioInput
          label="Una plantilla"
          name="entity-to-use"
          id="entity-used-template"
          clickEvent={() => techniqueMethods.selectInputEntity("template")}
        />
        <RadioInput
          label="Recursos individuales"
          name="entity-to-use"
          id="entity-used-resources"
          clickEvent={() => techniqueMethods.selectInputEntity("resource")}
        />
      </div>

      {techniqueData.inputEntity === "template" ? (
        <SelectInput
          label="Plantilla"
          id="technique-templates"
          options={templateSelectOptions}
          changeEvent={(e) => {
            techniqueMethods.selectInputTechniques(e.target.value);
          }}
        />
      ) : techniqueData.inputEntity === "resource" ? (
        <ResourceCarrousel
          resources={resources}
          formId=""
          changeEvent={() => {
            const checkboxes = document.querySelectorAll<HTMLInputElement>(
              "input[name='resources']:checked"
            );
            techniqueMethods.selectInputTechniques(checkboxes);
          }}
        />
      ) : (
        <></>
      )}
    </section>
  );
};
