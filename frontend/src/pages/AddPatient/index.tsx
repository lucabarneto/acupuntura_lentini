import "./AddPatient.css";
import { AddHeader } from "../../features/add/components/AddHeader";
import { Modal } from "../../components/ui/Modal";
import { useModal } from "../../hooks/useModal";
import { useNavigate } from "react-router";
import { ProgressBar } from "../../components/ui/ProgressBar";
import { useProgressBar } from "../../hooks/useProgressBar";
import { Button } from "../../components/ui/Button";
import { AddOptions } from "../../features/add/components/AddOptions";
import { TextInput } from "../../components/ui/Input/Text";
import { DateInput } from "../../components/ui/Input/Date";
import { BaziTable } from "../../features/patients/components/Birth/BaziTable";
import { FileInput } from "../../components/ui/Input/File";

const progressSteps = 3;

export const AddPatient = () => {
  const navigate = useNavigate();
  const { modal, associatedValue, closeModal, openModal } = useModal("modal");
  const { segments, currentStage, moveToNextStage, moveToPreviousStage } =
    useProgressBar(progressSteps);

  const leaveAddFlow = (link: string) => {
    navigate(link);
  };

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
        oncloseEvent={(e) => confirmLeaveAddFlow(e!, "/add")}
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
          <div>
            <form>
              {currentStage === 1 && (
                <div className="personal-data">
                  <FileInput />
                  <TextInput label="Nombre" id="first_name" type="text" />
                  <TextInput label="Apellido" id="last_name" type="text" />
                  <TextInput label="Correo" id="mail" type="email" />
                  <TextInput label="Edad" id="age" type="text" />
                  <TextInput label="Teléfono" id="tel" type="tel" />
                  <TextInput
                    label="Estado civil"
                    id="marital_status"
                    type="text"
                  />
                </div>
              )}
              {currentStage === 2 && (
                <div className="birth">
                  <div className="birth-data">
                    <DateInput id="birth_date" label="Fecha" />
                    <TextInput type="text" id="birth-time" label="Hora" />
                    <TextInput
                      type="text"
                      id="birth_location"
                      label="Localidad"
                    />
                  </div>
                  <BaziTable type="input" />
                </div>
              )}
              {currentStage === progressSteps && (
                <div className="presumptive-analysis">
                  <TextInput
                    id="meridian_time"
                    label="Horario de Meridiano"
                    type="text"
                  />
                  <TextInput id="feeding" label="Alimentación" type="text" />
                  <TextInput id="yin" label="Yin" type="text" />
                  <TextInput id="yang" label="Yang" type="text" />
                  <TextInput id="qi" label="Qi" type="text" />
                  <TextInput id="xue" label="Xue" type="text" />
                  <TextInput id="jin_ye" label="Jin Ye" type="text" />
                  <TextInput
                    id="mental_vitality_jing_shen"
                    label="Jing Shen Vit. Mental"
                    type="text"
                  />
                  <TextInput
                    id="ancestral_jing"
                    label="Jing Ancestral"
                    type="text"
                  />
                </div>
              )}
            </form>
          </div>
        </section>
      </main>

      <Modal
        ref={modal}
        title="Salir de añadir paciente"
        text="Se perdera todo el progreso hecho. ¿Estás seguro que quieres salir?"
        buttonConfirmLabel="Salir"
        oncancelEvent={closeModal}
        onconfirmEvent={() => leaveAddFlow(associatedValue!)}
      />
    </>
  );
};
