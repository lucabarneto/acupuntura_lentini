import "./AddPatient.css";
import { useEffect } from "react";
import { useLocation } from "react-router";
import { useAdd } from "../../features/add/hooks/useAdd";
import { AddHeader } from "../../features/add/components/AddHeader";
import { Modal } from "../../components/ui/Modal";
import { ProgressBar } from "../../components/ui/ProgressBar";
import { AddOptions } from "../../features/add/components/AddOptions";
import { useAppDispatch } from "../../app/store";
import { addPatient } from "../../features/patients/slices/patientsSlice";
import { PersonalDataForm } from "../../features/add/components/AddPatientForm/PersonalDataForm";
import { BirthForm } from "../../features/add/components/AddPatientForm/BirthForm";
import { PresumptiveAnalysisForm } from "../../features/add/components/AddPatientForm/PresumptiveAnalysisForm";

const totalProgressStages = 3;

const PERSONAL_DATA_STAGE = 1;
const BIRTH_STAGE = 2;
const PRESUMPTIVE_ANALYSIS_STAGE = 3;

export const AddPatient = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const {
    submitButton,
    progress,
    form,
    leaveAddFlowModal,
    leaveAddFlow,
    confirmLeaveAddFlow,
  } = useAdd(totalProgressStages);

  const originalPathName = location.state?.from;

  useEffect(() => {
    if (form.canSubmit)
      dispatch(addPatient(form.adaptableForm!)).then(() =>
        leaveAddFlow("/add/", { from: originalPathName })
      );
  }, [form.canSubmit]);

  return (
    <section className="add-patient-pane">
      <AddHeader
        title="Añadir paciente"
        oncloseEvent={(e) => confirmLeaveAddFlow(e!, "/add/")}
      />
      <div>
        <AddOptions onclickEvent={(e) => confirmLeaveAddFlow(e!)} />
        <ProgressBar
          currentStage={progress.currentStage}
          totalStages={totalProgressStages}
        />
        <section className="add-content-container">
          <form id="add-patient-form" onSubmit={form.handleSubmit}></form>
          {progress.currentStage === PERSONAL_DATA_STAGE && (
            <PersonalDataForm
              formData={form}
              moveToNextStage={progress.moveToNextStage}
            />
          )}
          {progress.currentStage === BIRTH_STAGE && (
            <BirthForm
              formData={form}
              moveToNextStage={progress.moveToNextStage}
              moveToPreviousStage={progress.moveToPreviousStage}
            />
          )}
          {progress.currentStage === PRESUMPTIVE_ANALYSIS_STAGE && (
            <PresumptiveAnalysisForm
              formData={form}
              moveToPreviousStage={progress.moveToPreviousStage}
              submitButton={submitButton}
            />
          )}
          <p className="required-fields-tip">
            Completa todos los <strong>campos requeridos</strong> (<b>*</b>)
            para poder agregar a la persona paciente al sistema
          </p>
        </section>
      </div>

      <Modal
        ref={leaveAddFlowModal.modal}
        title="Salir de añadir paciente"
        text="Se perdera todo el progreso hecho. ¿Estás seguro que quieres salir?"
        buttonConfirmLabel="Salir"
        cancelEvent={leaveAddFlowModal.closeModal}
        confirmEvent={() =>
          leaveAddFlow(leaveAddFlowModal.associatedValue!, {
            from: location.pathname,
          })
        }
      />
    </section>
  );
};
