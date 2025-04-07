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
  const { navigation, addForm, entity } = useAddBaziTable(initialForm);

  return (
    <section className="add-patient-pane add-bazi-table-pane">
      <AddHeader
        title="Añadir Tabla Bazi"
        closeEvent={(e) =>
          navigation.confirmLeaveAddFlow(
            e!,
            `/patients/${entity.patientURLName}`
          )
        }
        formId={addForm.formId}
      />
      <div>
        {entity.patient && <PatientDetailsPreview patient={entity.patient} />}
        <AddBaziTableForm form={addForm.form} formId={addForm.formId} />
      </div>

      <Modal
        ref={navigation.leaveAddFlowModal.modal}
        title="Salir de añadir tabla bazi"
        text="Se perdera todo el progreso hecho. ¿Estás seguro que quieres salir?"
        buttonConfirmLabel="Salir"
        cancelEvent={navigation.leaveAddFlowModal.closeModal}
        confirmEvent={() =>
          navigation.leaveAddFlow(
            navigation.leaveAddFlowModal.state!,
            navigation.setNavigationState("keep", "patient", {
              patientId: entity.patientId,
            })
          )
        }
      />
    </section>
  );
};
