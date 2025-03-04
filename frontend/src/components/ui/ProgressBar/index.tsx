import "./ProgressBar.css";
import { ProgressSegmentType } from "../../../types/progress.types";
import { ProgressSegment } from "./ProgressSegment";

type Props = {
  segments: ProgressSegmentType[];
  currentStage: number;
  totalStages: number;
};

export const ProgressBar = ({ segments, currentStage, totalStages }: Props) => {
  return (
    <div className="total-progress">
      <div className="current-stage">
        {currentStage} de {totalStages}
      </div>
      <div className="progress-bar">
        {segments.map((segment, index) => (
          <ProgressSegment
            key={index}
            position={segment.position}
            filled={segment.filled}
          />
        ))}
      </div>
    </div>
  );
};
