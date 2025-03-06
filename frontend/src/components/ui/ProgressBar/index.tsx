import { ProgressBarType } from "./progress.types";
import "./ProgressBar.css";

type Props = ProgressBarType;

export const ProgressBar = (props: Props) => {
  const { currentStage, totalStages } = props;

  return (
    <div className="total-progress">
      <div className="current-stage">
        {currentStage} de {totalStages}
      </div>
      <progress
        className="progress-bar"
        aria-label="progreso del flujo"
        value={currentStage / totalStages}
      ></progress>
    </div>
  );
};
