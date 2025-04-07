import { useEffect, useState } from "react";
import { useTemplate } from "../../templates/hooks/useTemplate";
import { IResource } from "../../resources/types/resource.types";
import { useResource } from "../../resources/hooks/useResource";

export type UseConsultationTechniques = {
  techniqueData: TechniqueData;
  techniqueMethods: TechniquesMethods;
};

type TechniqueData = {
  techniques: string[];
  currentTechnique?: IResource;
  currentStage?: number;
  remainingStages?: number;
  inputTechniques?: SelectedTechniques;
  inputEntity?: SelectionEntities;
};

type TechniquesMethods = {
  selectInputEntity(entity: SelectionEntities): void;
  selectInputTechniques(techniques: SelectedTechniques): void;
  setConsultationTechniques(techniques: SelectedTechniques): Promise<void>;
  startForm(): void;
  moveToNextTechnique(): void;
  moveToPreviousTechnique(): void;
};

type SelectionEntities = "template" | "resource";

type SelectedTechniques = string | ArrayLike<HTMLInputElement>;

export const useConsultationTechniques = (): UseConsultationTechniques => {
  const [techniqueData, setTechniqueData] = useState<TechniqueData>({
    techniques: [],
    currentTechnique: undefined,
    currentStage: undefined,
    remainingStages: undefined,
    inputEntity: undefined,
    inputTechniques: undefined,
  });
  const { getTemplateById } = useTemplate();
  const { getResourceById } = useResource();

  useEffect(() => {
    if (techniqueData.currentStage) {
      setCurrentTechnique();
    }
  }, [techniqueData.currentStage]);

  const setCurrentTechnique = async () => {
    const { techniques, currentStage } = techniqueData;

    const technique = await getResourceById(
      techniques[(currentStage as number) - 1]
    );
    if (!technique) throw new Error("Technique not found");

    setTechniqueData((prev) => {
      return {
        ...prev,
        currentTechnique: technique,
      };
    });
  };

  const selectInputEntity = (entity: SelectionEntities) =>
    setTechniqueData((prev) => {
      return { ...prev, inputEntity: entity };
    });

  const selectInputTechniques = (techniques: SelectedTechniques) =>
    setTechniqueData((prev) => {
      return { ...prev, inputTechniques: techniques };
    });

  const setConsultationTechniques = async (techniques: SelectedTechniques) => {
    if (techniques === undefined) return;

    if (typeof techniques === "string") {
      const pickedTechniques = await pickTechniquesFromTemplateInput(
        techniques
      );
      setTechniqueData((prev) => {
        return { ...prev, techniques: pickedTechniques };
      });
    } else {
      const pickedTechniques = pickTechniquesFromResourceInput(techniques);
      setTechniqueData((prev) => {
        return { ...prev, techniques: pickedTechniques };
      });
    }
  };

  const pickTechniquesFromTemplateInput = async (
    templateInput: string
  ): Promise<string[]> => {
    const template = await getTemplateById(templateInput);
    return template!.resources.map((technique) => technique.resource._id);
  };

  const pickTechniquesFromResourceInput = (
    resourceInput: ArrayLike<HTMLInputElement>
  ): string[] => {
    const techniques = Array.from(resourceInput);
    return techniques.map((technique) => technique.value);
  };

  const startForm = () => {
    setTechniqueData((prev) => {
      return {
        ...prev,
        remainingStages: prev.techniques.length,
        currentStage: 1,
      };
    });
  };

  const moveToNextTechnique = () =>
    setTechniqueData((prev) => {
      const { remainingStages, currentStage } = prev;

      return {
        ...prev,
        remainingStages: remainingStages! - 1,
        currentStage: currentStage! + 1,
      };
    });

  const moveToPreviousTechnique = () =>
    setTechniqueData((prev) => {
      const { remainingStages, currentStage } = prev;

      return {
        ...prev,
        remainingStages: remainingStages! + 1,
        currentStage: currentStage! - 1,
      };
    });

  return {
    techniqueData,
    techniqueMethods: {
      selectInputEntity,
      selectInputTechniques,
      setConsultationTechniques,
      startForm,
      moveToNextTechnique,
      moveToPreviousTechnique,
    },
  };
};
