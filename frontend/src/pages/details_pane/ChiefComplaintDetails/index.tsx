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
  const deleteModal = useModal("modal");
  const addReportModal = useModal("modal");
  const patientHook = usePatient(patientId);
  const { patient, patientURLName } = patientHook.entityData;
  const chiefComplaintHook = useChiefComplaint(chiefComplaintId);
  const { chiefComplaint } = chiefComplaintHook.entityData;
  const { deleteChiefComplaint } = chiefComplaintHook.crudMethods;

  return (
    patient &&
    chiefComplaint && (
      <section className="details-section">
        <TopAppBar
          pane="details"
          title="Motivo de consulta"
          navigation_back
          deleteEvent={() => deleteModal.openModal()}
          navigateBackEvent={() =>
            appNavigate(
              `/patients/${patientURLName}`,
              setNavigationState("keep", "patient", { patientId })
            )
          }
        />
        <article>
          <div className="chief-complaint-title">
            <h1>{chiefComplaint.title}</h1>
            <Button
              type="button"
              label="Crear reporte"
              variant="filled"
              clickEvent={() => addReportModal.openModal()}
            />
          </div>
          <div className="chief-complaint-data">
            <p>{chiefComplaint.diagnosis}</p>
            <p>
              <b>Remedios:</b> {chiefComplaint.initial_medicine}
            </p>
            <p>
              <b>Sueño:</b> {chiefComplaint.initial_sleep_condition}
            </p>
          </div>
        </article>
        <ChiefComplaintConsultations
          consultations={chiefComplaint.consultations}
          addEvent={() =>
            appNavigate(
              "/add/consultation",
              setNavigationState("keep", "addconsultation")
            )
          }
          stateExtraData={{ patientId, chiefComplaintId }}
        />
        <Modal
          ref={deleteModal.modal}
          title="Eliminar motivo de consulta"
          text="Una vez eliminado, no podrás recuperar la información del motivo de consulta. ¿Estás seguro que quieres eliminarlo?"
          buttonConfirmLabel="Eliminar"
          cancelEvent={deleteModal.closeModal}
          confirmEvent={() =>
            deleteChiefComplaint(chiefComplaintId, () =>
              appNavigate("/patients", setNavigationState("keep"))
            )
          }
        />
        <Modal
          ref={addReportModal.modal}
          title="Crear Reporte"
          text="Una vez creado el reporte, no podrás volver a acceder a este motivo de consulta. ¿Estás seguro que quieres crearlo?"
          buttonConfirmLabel="Crear"
          cancelEvent={addReportModal.closeModal}
          confirmEvent={() =>
            appNavigate(
              "/add/report",
              setNavigationState("keep", "addreport", { chiefComplaintId })
            )
          }
        />
      </section>
    )
  );
};
