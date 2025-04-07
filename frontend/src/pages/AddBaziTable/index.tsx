import "./AddBaziTable.css";
import { Modal } from "../../components/ui/Modal";
import { AddHeader } from "../../features/add/components/AddHeader";
import { useAdd } from "../../features/add/useAdd";
import { useEffect } from "react";
import { usePatient } from "../../features/patients/usePatient";
import { PatientDetailsPreview } from "../../features/patients/components/PatientDetailsPreview";
import { AddBaziTableForm } from "../../features/add/components/AddBaziTableForm";
import { BaziTableType } from "../../features/patients/types/bazi_table.types";
import { useAppNavigate } from "../../hooks/useAppNavigate";
import { useForm } from "../../hooks/useForm";

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
  const { confirmLeaveAddFlow, leaveAddFlowModal, leaveAddFlow } = useAdd();
  const form = useForm(initialForm);
  const { extraData, appNavigate, setNavigationState } = useAppNavigate();
  const patientId = extraData.patientId;
  const { patient, createURLName, updatePatient } = usePatient(patientId);

  const formId = "add-bazi-table-form";
  const patientURLName = createURLName(patient);

  useEffect(() => {
    if (form.formData.isSubmittable) {
      const updatedPatient = { ...patient, bazi_table: form.formData.fields };

      updatePatient(updatedPatient, () => {
        appNavigate(
          `/patients/${patientURLName}`,
          setNavigationState("keep", "patient", { patientId })
        );
      });
    }
  }, [form.formData.isSubmittable]);

  return (
    <section className="add-patient-pane add-bazi-table-pane">
      <AddHeader
        title="Añadir Tabla Bazi"
        closeEvent={(e) =>
          confirmLeaveAddFlow(e!, `/patients/${patientURLName}`)
        }
        formId={formId}
      />
      <div>
        {patient && <PatientDetailsPreview patient={patient} />}
        <AddBaziTableForm form={form} formId={formId} />
      </div>

      <Modal
        ref={leaveAddFlowModal.modal}
        title="Salir de añadir tabla bazi"
        text="Se perdera todo el progreso hecho. ¿Estás seguro que quieres salir?"
        buttonConfirmLabel="Salir"
        cancelEvent={leaveAddFlowModal.closeModal}
        confirmEvent={() =>
          leaveAddFlow(
            leaveAddFlowModal.state!,
            setNavigationState("keep", "patient", { patientId })
          )
        }
      />
    </section>
  );
};
