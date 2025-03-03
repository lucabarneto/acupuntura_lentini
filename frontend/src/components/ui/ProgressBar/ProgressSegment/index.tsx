import { ProgressSegmentType } from "../../../../types/progress.types";
import "./ProgressSegment.css";

export type Props = ProgressSegmentType;

export const ProgressSegment = ({ position, filled }: Props) => {
  let className = `progress-segment ${position}`;
  if (filled) className += " filled";

  return <div className={className}></div>;
};
