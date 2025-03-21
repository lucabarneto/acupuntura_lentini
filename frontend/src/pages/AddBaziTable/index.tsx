import "./AddBaziTable.css";
import { Modal } from "../../components/ui/Modal";
import { AddHeader } from "../../features/add/components/AddHeader";
import { useAdd } from "../../features/add/hooks/useAdd";
import { useEffect } from "react";
import { usePatient } from "../../features/patients/hooks/usePatient";
import { PatientDetailsPreview } from "../../features/patients/components/PatientDetailsPreview";
import { AddBaziTableForm } from "../../features/add/components/AddBaziTableForm";
import { BaziTableType } from "../../features/patients/types/bazi_table.types";
import { useAppNavigate } from "../../hooks/useAppNavigate";

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
    useAdd(initialForm);
  const { form } = formData;
  const { navigationData, appNavigate } = useAppNavigate();
  const patientId = navigationData.patientId;
  const { patient, createPatientURLName, updatePatient } =
    usePatient(patientId);

  const formId = "add-bazi-table-form";
  const patientURLName = createPatientURLName(patient);

  useEffect(() => {
    if (form.isSubmittable) {
      const updatedPatient = { ...patient, bazi_table: form.fields };

      updatePatient(updatedPatient, () => {
        appNavigate(`/patients/${patientURLName}`, {
          ...navigationData,
          detailsPane: "patient",
        });
      });
    }
  }, [form.isSubmittable]);

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
        <AddBaziTableForm formData={formData} formId={formId} />
      </div>

      <Modal
        ref={leaveAddFlowModal.modal}
        title="Salir de añadir tabla bazi"
        text="Se perdera todo el progreso hecho. ¿Estás seguro que quieres salir?"
        buttonConfirmLabel="Salir"
        cancelEvent={leaveAddFlowModal.closeModal}
        confirmEvent={() =>
          leaveAddFlow(leaveAddFlowModal.associatedValue!, {
            ...navigationData,
            detailsPane: "patient",
          })
        }
      />
    </section>
  );
};
