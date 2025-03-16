import "./AddBaziTable.css";
import { useLocation } from "react-router";
import { Modal } from "../../components/ui/Modal";
import { AddHeader } from "../../features/add/components/AddHeader";
import { useAdd } from "../../features/add/hooks/useAdd";
import { BaziTableForm } from "../../features/patients/types/IPatient";
import { BaziTable } from "../../features/patients/components/Birth/BaziTable";
import { useEffect } from "react";
import { usePatient } from "../../features/patients/hooks/usePatient";
import { PatientDetailsPreview } from "../../features/patients/components/PatientDetailsPreview";

const totalStages = 1;

const initialForm: BaziTableForm = {
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
    first_row: {
      hour: "",
      day: "",
      month: "",
      year: "",
    },
    second_row: {
      hour: "",
      day: "",
      month: "",
      year: "",
    },
    third_row: {
      hour: "",
      day: "",
      month: "",
      year: "",
    },
  },
};

export const AddBaziTable = () => {
  const { confirmLeaveAddFlow, leaveAddFlowModal, leaveAddFlow, formData } =
    useAdd(totalStages, initialForm);

  const location = useLocation();
  const originalPathname = location.state?.from;
  const patientId = location.state?.patientId;

  const { patient } = usePatient(patientId);

  useEffect(() => {
    if (formData.form.isSubmittable) console.log(formData.form.fields);
  }, [formData.form.isSubmittable]);

  return (
    <section className="add-patient-pane add-bazi-table-pane">
      <AddHeader
        title="Añadir Tabla Bazi"
        closeEvent={(e) => confirmLeaveAddFlow(e!, `/patients/${patientId}`)}
        formId="add-patient-bazi-table-form"
      />
      <div>
        <PatientDetailsPreview patient={patient} />
        <h2>Tabla BaZi</h2>
        <BaziTable type="form" formData={formData} />
      </div>

      <Modal
        ref={leaveAddFlowModal.modal}
        title="Salir de añadir paciente"
        text="Se perdera todo el progreso hecho. ¿Estás seguro que quieres salir?"
        buttonConfirmLabel="Salir"
        cancelEvent={leaveAddFlowModal.closeModal}
        confirmEvent={() =>
          leaveAddFlow(leaveAddFlowModal.associatedValue!, {
            from: originalPathname,
          })
        }
      />
    </section>
  );
};
