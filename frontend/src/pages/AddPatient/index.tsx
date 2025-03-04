import "./AddPatient.css";
import { AddHeader } from "../../features/add/components/AddHeader";
import { Modal } from "../../components/ui/Modal";
import { useModal } from "../../hooks/useModal";
import { useLocation, useNavigate } from "react-router";
import { ProgressBar } from "../../components/ui/ProgressBar";
import { useProgressBar } from "../../hooks/useProgressBar";
import { Button } from "../../components/ui/Button";
import { AddOptions } from "../../features/add/components/AddOptions";
import { LinkState } from "../../types/link.types";
import { patientInitialForm } from "../../features/add/utils/patientInitialForm";
import { useForm } from "../../hooks/useForm";
import { IPatient } from "../../features/patients/types/IPatient";
import { AddPatientForm } from "../../features/add/components/AddPatientForm";

const progressSteps = 3;

export const AddPatient = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const form = useForm<IPatient>(patientInitialForm);
  const { modal, associatedValue, closeModal, openModal } = useModal("modal");
  const { segments, currentStage, moveToNextStage, moveToPreviousStage } =
    useProgressBar(progressSteps);

  const leaveAddFlow = (link: string, state?: LinkState) =>
    state ? navigate(link, { state }) : navigate(link);

  const confirmLeaveAddFlow = (e: React.MouseEvent, link?: string) => {
    e.preventDefault();
    const target = e.target as Element;
    const valueToAssociate = link || `/add/${target.id}`;
    openModal(valueToAssociate);
  };

  return (
    <>
      <AddHeader
        title="Añadir paciente"
        oncloseEvent={(e) => confirmLeaveAddFlow(e!, "/add/")}
      />
      <main>
        <AddOptions onclickEvent={(e) => confirmLeaveAddFlow(e!)} />
        <div className="total-progress">
          <div className="current-stage">
            {currentStage} de {progressSteps}
          </div>
          <ProgressBar segments={segments} />
        </div>
        <section className="add-content-container">
          <header>
            {currentStage === 1 && (
              <>
                <h1>Datos personales</h1>
                <Button
                  type="filled"
                  label="Continuar"
                  onclickEvent={moveToNextStage}
                />
              </>
            )}
            {currentStage === 2 && (
              <>
                <h1>Nacimiento</h1>
                <div className="stage-buttons">
                  <Button
                    type="text"
                    label="Volver"
                    onclickEvent={moveToPreviousStage}
                  />
                  <Button
                    type="filled"
                    label="Continuar"
                    onclickEvent={moveToNextStage}
                  />
                </div>
              </>
            )}
            {currentStage === progressSteps && (
              <>
                <h1>Análisis Presuntivo</h1>
                <div className="stage-buttons">
                  <Button
                    type="text"
                    label="Volver"
                    onclickEvent={moveToPreviousStage}
                  />
                  <Button type="filled" icon="add" label="Añadir paciente" />
                </div>
              </>
            )}
          </header>
          <AddPatientForm form={form} currentStage={currentStage} />
        </section>
      </main>

      <Modal
        ref={modal}
        title="Salir de añadir paciente"
        text="Se perdera todo el progreso hecho. ¿Estás seguro que quieres salir?"
        buttonConfirmLabel="Salir"
        oncancelEvent={closeModal}
        onconfirmEvent={() =>
          leaveAddFlow(associatedValue!, { from: location.pathname })
        }
      />
    </>
  );
};
