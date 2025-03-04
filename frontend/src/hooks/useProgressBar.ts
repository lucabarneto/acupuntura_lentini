import { useState, useEffect } from "react";
import { ProgressSegmentType } from "../types/progress.types";

interface UseProgressBarStates {
  currentStage: number;
  segments: ProgressSegmentType[];
}

interface UseProgressBarMethods {
  moveToNextStage(): void;
  moveToPreviousStage(): void;
}

interface UseProgressBar extends UseProgressBarStates, UseProgressBarMethods {}

export const useProgressBar = (totalStages: number): UseProgressBar => {
  const [currentStage, setCurrentStage] = useState<number>(1);
  const [segments, setSegments] = useState<ProgressSegmentType[]>([]);

  useEffect(() => calculateSegmentsAmount, []);

  const calculateSegmentsAmount = (): void => {
    for (let i = 1; i <= totalStages; i++) {
      if (segments.length === 0)
        segments.push({ position: "start", filled: false });
      if (segments.length > 0 && segments.length < totalStages - 1)
        segments.push({ position: "center", filled: false });
      if (segments.length === totalStages - 1)
        segments.push({ position: "end", filled: false });

      setSegments([...segments]);
    }
  };

  useEffect(() => {
    if (segments.length !== 0) fillSegments();
  }, [currentStage]);

  const fillSegments = (): void => {
    if (currentStage === 1) {
      segments.forEach((segment) =>
        segments.indexOf(segment) === 0
          ? (segment.filled = true)
          : (segment.filled = false)
      );
    } else {
      segments.forEach((segment) =>
        segments.indexOf(segment) < currentStage
          ? (segment.filled = true)
          : (segment.filled = false)
      );
    }

    setSegments([...segments]);
  };

  const moveToNextStage = (): void => {
    if (currentStage === totalStages) {
      console.warn("Cannot move to next stage, segment limit reached");
      return;
    }
    setCurrentStage(currentStage + 1);
    console.log("A", currentStage);
  };

  const moveToPreviousStage = (): void => {
    if (currentStage === 1) {
      console.warn("Cannot move to previous stage, already in first stage");
      return;
    }
    setCurrentStage(currentStage - 1);
  };

  return { segments, currentStage, moveToNextStage, moveToPreviousStage };
};
