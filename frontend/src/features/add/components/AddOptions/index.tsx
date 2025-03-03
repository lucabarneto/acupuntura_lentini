import "./AddOptions.css";
import { SegmentedButton } from "../../../../components/ui/SegmentedButton";

type Props = {
  onclickEvent?(e?: React.MouseEvent): void;
};

export const AddOptions = ({ onclickEvent }: Props) => {
  return (
    <div className="add-options">
      <SegmentedButton
        id="patient"
        label="Paciente"
        position="left"
        link="/add/patient"
        onclickEvent={onclickEvent}
      />
      <SegmentedButton
        id="chief_complaint"
        label="Motivo de consulta"
        position="middle"
        link="/add/chief_complaint"
        onclickEvent={onclickEvent}
      />
      <SegmentedButton
        id="consultation"
        label="Sesión"
        position="middle"
        link="/add/consultation"
        onclickEvent={onclickEvent}
      />
      <SegmentedButton
        id="appointment"
        label="Turno"
        position="middle"
        link="/add/appointment"
        onclickEvent={onclickEvent}
      />
      <SegmentedButton
        id="template"
        label="Plantilla"
        position="right"
        link="/add/template"
        onclickEvent={onclickEvent}
      />
    </div>
  );
};
