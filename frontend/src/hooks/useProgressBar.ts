import { useState } from "react";

interface UseProgressBarStates {
  currentStage: number;
}

interface UseProgressBarMethods {
  moveToNextStage(): void;
  moveToPreviousStage(): void;
}

interface UseProgressBar extends UseProgressBarStates, UseProgressBarMethods {}

export const useProgressBar = (totalStages: number): UseProgressBar => {
  const [currentStage, setCurrentStage] = useState(1);

  const moveToNextStage = (): void => {
    if (currentStage === totalStages) {
      console.warn("Cannot move to next stage, segment limit reached");
      return;
    }
    setCurrentStage(currentStage + 1);
  };

  const moveToPreviousStage = (): void => {
    if (currentStage === 1) {
      console.warn("Cannot move to previous stage, already in first stage");
      return;
    }
    setCurrentStage(currentStage - 1);
  };

  return { currentStage, moveToNextStage, moveToPreviousStage };
};
