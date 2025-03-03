import "./AddOptions.css";
import { SegmentedButton } from "../../../../components/ui/SegmentedButton";
import { useLocation } from "react-router";

type Props = {
  onclickEvent?(e?: React.MouseEvent): void;
};

export const AddOptions = ({ onclickEvent }: Props) => {
  const location = useLocation();
  const originalPathname = location.state?.from;

  return (
    <div className="add-options">
      <SegmentedButton
        id="patient"
        state={{ from: originalPathname }}
        label="Paciente"
        position="left"
        link="/add/patient"
        onclickEvent={onclickEvent}
      />
      <SegmentedButton
        id="chief_complaint"
        state={{ from: originalPathname }}
        label="Motivo de consulta"
        position="middle"
        link="/add/chief_complaint"
        onclickEvent={onclickEvent}
      />
      <SegmentedButton
        id="consultation"
        state={{ from: originalPathname }}
        label="Sesión"
        position="middle"
        link="/add/consultation"
        onclickEvent={onclickEvent}
      />
      <SegmentedButton
        id="appointment"
        state={{ from: originalPathname }}
        label="Turno"
        position="middle"
        link="/add/appointment"
        onclickEvent={onclickEvent}
      />
      <SegmentedButton
        id="template"
        state={{ from: originalPathname }}
        label="Plantilla"
        position="right"
        link="/add/template"
        onclickEvent={onclickEvent}
      />
    </div>
  );
};
