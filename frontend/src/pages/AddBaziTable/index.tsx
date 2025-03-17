import "./AddBaziTable.css";
import { useLocation, useNavigate } from "react-router";
import { Modal } from "../../components/ui/Modal";
import { AddHeader } from "../../features/add/components/AddHeader";
import { useAdd } from "../../features/add/hooks/useAdd";
import { useEffect } from "react";
import { usePatient } from "../../features/patients/hooks/usePatient";
import { PatientDetailsPreview } from "../../features/patients/components/PatientDetailsPreview";
import { AddBaziTableForm } from "../../features/add/components/AddBaziTableForm";
import { BaziTableType } from "../../features/patients/types/bazi_table.types";

const totalStages = 1;

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
  const { confirmLeaveAddFlow, leaveAddFlowModal, leaveAddFlow, formData } =
    useAdd(totalStages, initialForm);
  const { form } = formData;
  const location = useLocation();
  const navigate = useNavigate();
  const originalPathname = location.state?.from;
  const patientId = location.state?.patientId;
  const { patient, updatePatient } = usePatient(patientId);

  useEffect(() => {
    if (form.isSubmittable) {
      const updatedPatient = { ...patient, bazi_table: form.fields };

      updatePatient(updatedPatient, () => {
        navigate("/patients/" + patientId);
      });
    }
  }, [form.isSubmittable]);

  return (
    <section className="add-patient-pane add-bazi-table-pane">
      <AddHeader
        title="Añadir Tabla Bazi"
        closeEvent={(e) => confirmLeaveAddFlow(e!, `/patients/${patientId}`)}
        formId="add-patient-bazi-table-form"
      />
      <div>
        {patient && <PatientDetailsPreview patient={patient} />}
        <AddBaziTableForm formData={formData} />
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
