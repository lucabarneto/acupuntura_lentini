import "./ChiefComplaintDetails.css";
import { Button } from "../../../components/ui/Button";
import { TopAppBar } from "../../../components/ui/TopAppBar";
import { useChiefComplaint } from "../../../features/chief_complaints/hooks/useChiefComplaint";
import { usePatient } from "../../../features/patients/hooks/usePatient";
import { useAppNavigate } from "../../../hooks/useAppNavigate";
import { ChiefComplaintConsultations } from "../../../features/consultations/components/ChiefComplaintConsultations";
import { Modal } from "../../../components/ui/Modal";
import { useModal } from "../../../hooks/useModal";

export const ChiefComplaintDetails = () => {
  const { extraData, appNavigate, setNavigationState } = useAppNavigate();
  const { patientId, chiefComplaintId } = extraData;
  const { modal, openModal, closeModal } = useModal("modal");
  const patientHook = usePatient(patientId);
  const chiefComplaintHook = useChiefComplaint(chiefComplaintId);

  const patientUrlName =
    patientHook.entityData.patient &&
    patientHook.utilityMethods.createURLName(patientHook.entityData.patient);

  return (
    patientHook.entityData.patient &&
    chiefComplaintHook.entityData.chiefComplaint && (
      <section className="details-section">
        <TopAppBar
          pane="details"
          title="Motivo de consulta"
          navigation_back
          deleteEvent={() => openModal()}
          navigateBackEvent={() =>
            appNavigate(
              `/patients/${patientUrlName}`,
              setNavigationState("keep", "patient", { patientId })
            )
          }
        />
        <article>
          <div className="chief-complaint-title">
            <h1>{chiefComplaintHook.entityData.chiefComplaint.title}</h1>
            <Button type="button" label="Finalizar consulta" variant="filled" />
          </div>
          <div className="chief-complaint-data">
            <p>{chiefComplaintHook.entityData.chiefComplaint.diagnosis}</p>
            <p>
              <b>Remedios:</b>{" "}
              {chiefComplaintHook.entityData.chiefComplaint.initial_medicine}
            </p>
            <p>
              <b>Sueño:</b>{" "}
              {
                chiefComplaintHook.entityData.chiefComplaint
                  .initial_sleep_condition
              }
            </p>
          </div>
        </article>
        <ChiefComplaintConsultations
          consultations={
            chiefComplaintHook.entityData.chiefComplaint.consultations
          }
          addEvent={() =>
            appNavigate(
              "/add/consultation",
              setNavigationState("keep", "addconsultation")
            )
          }
        />
        <Modal
          ref={modal}
          title="Eliminar motivo de consulta"
          text="Una vez eliminado, no podrás recuperar la información del motivo de consulta. ¿Estás seguro que quieres eliminarlo?"
          buttonConfirmLabel="Eliminar"
          cancelEvent={closeModal}
          confirmEvent={() =>
            chiefComplaintHook.crudMethods.deleteChiefComplaint(
              chiefComplaintId,
              () => appNavigate("/patients", setNavigationState("keep"))
            )
          }
        />
      </section>
    )
  );
};
