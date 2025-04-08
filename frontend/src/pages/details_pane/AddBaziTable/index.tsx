import "./AddBaziTable.css";
import { Modal } from "../../../components/ui/Modal";
import { AddHeader } from "../../../components/ui/AddHeader";
import { PatientDetailsPreview } from "../../../features/patients/components/PatientDetailsPreview";
import { AddBaziTableForm } from "../../../features/patients/components/AddBaziTableForm";
import { BaziTableType } from "../../../features/patients/types/bazi_table.types";
import { useAddBaziTable } from "../../../features/patients/hooks/useAddBaziTable";

const initialForm: BaziTableType = {
  heavenly_stems: {
    hour: "",
    day: "",
    month: "",
    year: "",
  },
  earthly_branches: {
    hour: "",
    day: "",
    month: "",
    year: "",
  },
  hidden_stems: {
    principal_qi: {
      hour: "",
      day: "",
      month: "",
      year: "",
    },
    central_qi: {
      hour: "",
      day: "",
      month: "",
      year: "",
    },
    residual_qi: {
      hour: "",
      day: "",
      month: "",
      year: "",
    },
  },
};

export const AddBaziTable = () => {
  const { addNavigation, addForm, entityData } = useAddBaziTable(initialForm);

  return (
    <section className="add-patient-pane add-bazi-table-pane">
      <AddHeader
        title="Añadir Tabla Bazi"
        closeEvent={(e) =>
          addNavigation.openLeaveModal(
            e!,
            `/patients/${entityData?.entityURLName}`
          )
        }
        formId={addForm.formId}
      />
      <div>
        {entityData?.entity && (
          <PatientDetailsPreview patient={entityData.entity} />
        )}
        <AddBaziTableForm form={addForm.form} formId={addForm.formId} />
      </div>

      <Modal
        ref={addNavigation.leaveModal}
        title="Salir de añadir tabla bazi"
        text="Se perdera todo el progreso hecho. ¿Estás seguro que quieres salir?"
        buttonConfirmLabel="Salir"
        cancelEvent={addNavigation.closeLeaveModal}
        confirmEvent={() =>
          addNavigation.leaveFlow({ patientId: entityData.entityId })
        }
      />
    </section>
  );
};
