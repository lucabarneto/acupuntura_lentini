import "./ChiefComplaintDetails.css";
import { Button } from "../../components/ui/Button";
import { TopAppBar } from "../../components/ui/TopAppBar";
import { useChiefComplaint } from "../../features/chief_complaints/hooks/useChiefComplaint";
import { usePatient } from "../../features/patients/hooks/usePatient";
import { useAppNavigate } from "../../hooks/useAppNavigate";

export const ChiefComplaintDetails = () => {
  const { mainNavigationData, navigationData, appNavigate } = useAppNavigate();
  const { patientId, chiefComplaintId } = navigationData;
  const { patient, createPatientURLName } = usePatient(patientId);
  const { chiefComplaint } = useChiefComplaint(chiefComplaintId);

  return (
    patient &&
    chiefComplaint && (
      <section className="details-section">
        <TopAppBar
          type="interactive"
          title="Motivo de consulta"
          navigation_back
          deleteEvent={() => {}}
          navigateBackEvent={() =>
            appNavigate(`/patients/${createPatientURLName(patient)}`, {
              ...mainNavigationData,
              detailsPane: "patient",
              patientId,
            })
          }
        />
        <article>
          <div className="chief-complaint-title">
            <h1>{chiefComplaint.title}</h1>
            <Button type="button" label="Finalizar consulta" variant="filled" />
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
        {/* <Modal
          ref={modal}
          title="Eliminar motivo de consulta"
          text="Una vez eliminado, no podrás recuperar la información del motivo de consulta. ¿Estás seguro que quieres eliminarlo?"
          buttonConfirmLabel="Eliminar"
          cancelEvent={closeModal}
          confirmEvent={() =>
            deletePatient(patientId, () =>
              appNavigate("/patients", mainNavigationData)
            )
          }
        /> */}
      </section>
    )
  );
};
