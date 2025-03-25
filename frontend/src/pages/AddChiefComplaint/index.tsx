import { useEffect } from "react";
import { Modal } from "../../components/ui/Modal";
import { AddChiefComplaintForm } from "../../features/add/components/AddChiefComplaintForm";
import { AddHeader } from "../../features/add/components/AddHeader";
import { useAdd } from "../../features/add/hooks/useAdd";
import { useChiefComplaint } from "../../features/chief_complaints/hooks/useChiefComplaint";
import { IChiefComplaintForm } from "../../features/chief_complaints/types/chief_complaint.types";
import { usePatient } from "../../features/patients/hooks/usePatient";
import { useAppNavigate } from "../../hooks/useAppNavigate";
import "./AddChiefComplaint.css";

const initialForm: IChiefComplaintForm = {
  title: "",
  diagnosis: "",
  initial_medicine: "",
  initial_sleep_condition: "",
  patient: "",
};

export const AddChiefComplaint = () => {
  const { mainNavigationData } = useAppNavigate();
  const { confirmLeaveAddFlow, leaveAddFlow, leaveAddFlowModal, formData } =
    useAdd(initialForm);
  const { form } = formData;
  const { patientSelectOptions } = usePatient();
  const { addChiefComplaint } = useChiefComplaint();

  const formId = "add-chief-complaint-form";

  useEffect(() => {
    if (form.isSubmittable) {
      console.log(form.fields);
      addChiefComplaint(form.fields, (res) => {
        console.log(res);
      });
    }
  }, [form.isSubmittable]);

  return (
    <section className="add-chief-complaint-pane">
      <AddHeader
        title="Añadir motivo de consulta"
        closeEvent={confirmLeaveAddFlow}
        formId={formId}
      />
      <div className="add-content-container">
        <AddChiefComplaintForm
          formData={formData}
          formId={formId}
          patientOptions={patientSelectOptions}
        />
        <p className="required-fields-tip">
          Completa todos los <strong>campos requeridos</strong> (<b>*</b>) para
          poder agregar a la persona paciente al sistema
        </p>
      </div>
      <Modal
        ref={leaveAddFlowModal.modal}
        title="Salir de añadir paciente"
        text="Se perdera todo el progreso hecho. ¿Estás seguro que quieres salir?"
        buttonConfirmLabel="Salir"
        cancelEvent={leaveAddFlowModal.closeModal}
        confirmEvent={() =>
          leaveAddFlow(leaveAddFlowModal.state!, mainNavigationData)
        }
      />
    </section>
  );
};
