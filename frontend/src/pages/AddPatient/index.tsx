import "./AddPatient.css";
import { useLocation } from "react-router";
import { useAdd } from "../../features/add/hooks/useAdd";
import { AddHeader } from "../../features/add/components/AddHeader";
import { Modal } from "../../components/ui/Modal";
import { ProgressBar } from "../../components/ui/ProgressBar";
import { Button } from "../../components/ui/Button";
import { AddOptions } from "../../features/add/components/AddOptions";
import { AddPatientForm } from "../../features/add/components/AddPatientForm";

const totalProgressStages = 3;

export const AddPatient = () => {
  const location = useLocation();
  const {
    progress,
    form,
    leaveAddFlowModal,
    leaveAddFlow,
    confirmLeaveAddFlow,
  } = useAdd(totalProgressStages);

  return (
    <>
      <AddHeader
        title="Añadir paciente"
        oncloseEvent={(e) => confirmLeaveAddFlow(e!, "/add/")}
      />
      <main>
        <AddOptions onclickEvent={(e) => confirmLeaveAddFlow(e!)} />
        <ProgressBar
          segments={progress.segments}
          currentStage={progress.currentStage}
          totalStages={totalProgressStages}
        />
        <section className="add-content-container">
          <header>
            {progress.currentStage === 1 && (
              <>
                <h1>Datos personales</h1>
                <Button
                  type="filled"
                  label="Continuar"
                  onclickEvent={progress.moveToNextStage}
                />
              </>
            )}
            {progress.currentStage === 2 && (
              <>
                <h1>Nacimiento</h1>
                <div className="stage-buttons">
                  <Button
                    type="text"
                    label="Volver"
                    onclickEvent={progress.moveToPreviousStage}
                  />
                  <Button
                    type="filled"
                    label="Continuar"
                    onclickEvent={progress.moveToNextStage}
                  />
                </div>
              </>
            )}
            {progress.currentStage === totalProgressStages && (
              <>
                <h1>Análisis Presuntivo</h1>
                <div className="stage-buttons">
                  <Button
                    type="text"
                    label="Volver"
                    onclickEvent={progress.moveToPreviousStage}
                  />
                  <Button
                    type="filled"
                    icon="add"
                    label="Añadir paciente"
                    buttonProps={{ type: "submit", form: "add-patient-form" }}
                  />
                </div>
              </>
            )}
          </header>
          <AddPatientForm form={form} currentStage={progress.currentStage} />
        </section>
      </main>

      <Modal
        ref={leaveAddFlowModal.modal}
        title="Salir de añadir paciente"
        text="Se perdera todo el progreso hecho. ¿Estás seguro que quieres salir?"
        buttonConfirmLabel="Salir"
        oncancelEvent={leaveAddFlowModal.closeModal}
        onconfirmEvent={() =>
          leaveAddFlow(leaveAddFlowModal.associatedValue!, {
            from: location.pathname,
          })
        }
      />
    </>
  );
};
