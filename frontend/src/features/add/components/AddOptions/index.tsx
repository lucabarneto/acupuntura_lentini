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
        clickEvent={onclickEvent}
        ariaDescription="Ir a interfaz añadir paciente"
      />
      <SegmentedButton
        id="chief_complaint"
        state={{ from: originalPathname }}
        label="Motivo de consulta"
        position="middle"
        link="/add/chief_complaint"
        clickEvent={onclickEvent}
        ariaDescription="Ir a interfaz añadir motivo de consulta"
      />
      <SegmentedButton
        id="consultation"
        state={{ from: originalPathname }}
        label="Sesión"
        position="middle"
        link="/add/consultation"
        clickEvent={onclickEvent}
        ariaDescription="Ir a interfaz añadir sesión"
      />
      <SegmentedButton
        id="appointment"
        state={{ from: originalPathname }}
        label="Turno"
        position="middle"
        link="/add/appointment"
        clickEvent={onclickEvent}
        ariaDescription="Ir a interfaz añadir turno"
      />
      <SegmentedButton
        id="template"
        state={{ from: originalPathname }}
        label="Plantilla"
        position="right"
        link="/add/template"
        clickEvent={onclickEvent}
        ariaDescription="Ir a interfaz añadir plantilla"
      />
    </div>
  );
};
