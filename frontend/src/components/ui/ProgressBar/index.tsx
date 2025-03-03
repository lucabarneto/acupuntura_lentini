import { ProgressSegmentType } from "../../../types/progress.types";
import "./ProgressBar.css";
import { ProgressSegment } from "./ProgressSegment";

type Props = {
  segments: ProgressSegmentType[];
};

export const ProgressBar = ({ segments }: Props) => {
  return (
    <div className="progress-bar">
      {segments.map((segment, index) => (
        <ProgressSegment
          key={index}
          position={segment.position}
          filled={segment.filled}
        />
      ))}
    </div>
  );
};
