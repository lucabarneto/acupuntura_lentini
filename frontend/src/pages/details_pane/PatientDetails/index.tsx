import { PersonalData } from "../../../features/patients/components/PersonalData";
import { TopAppBar } from "../../../components/ui/TopAppBar";
import { Birth } from "../../../features/patients/components/Birth";
import { Modal } from "../../../components/ui/Modal";
import { useModal } from "../../../hooks/useModal";
import { usePatient } from "../../../features/patients/hooks/usePatient";
import { PresumptiveAnalysis } from "../../../features/patients/components/PresumptiveAnalysis";
import { useAppNavigate } from "../../../hooks/useAppNavigate";
import { PatientChiefComplaints } from "../../../features/chief_complaints/components/PatientChiefComplaints";

export const PatientDetails = () => {
  const { extraData, appNavigate, setNavigationState } = useAppNavigate();
  const patientId = extraData.patientId;
  const { entityData, crudMethods } = usePatient(patientId);
  const { modal, openModal, closeModal } = useModal("modal");

  return (
    entityData.patient && (
      <section className="details-section">
        <TopAppBar
          pane="details"
          title="Paciente"
          deleteEvent={() => openModal()}
        />
        <PersonalData
          data={{
            first_name: entityData.patient.first_name,
            last_name: entityData.patient.last_name,
            age: entityData.patient.age,
            tel: entityData.patient.tel,
            mail: entityData.patient.mail,
            marital_status: entityData.patient.marital_status,
            profile_picture: entityData.patient.profile_picture,
          }}
        />
        <PatientChiefComplaints
          chiefComplaints={entityData.patient.chief_complaints}
          addEvent={() =>
            appNavigate(
              "/add/chiefcomplaint",
              setNavigationState("keep", "addchiefcomplaint")
            )
          }
        />
        <Birth
          birth={entityData.patient.birth}
          bazi_table={entityData.patient.bazi_table}
          addEvent={() =>
            appNavigate(
              "/add/bazitable",
              setNavigationState("keep", "addbazitable", { patientId })
            )
          }
        />
        <PresumptiveAnalysis
          presumptiveAnalysis={entityData.patient.presumptive_analysis}
          addEvent={() =>
            appNavigate(
              "/add/presumptiveanalysis",
              setNavigationState("keep", "addpresumptiveanalysis", {
                patientId,
              })
            )
          }
        />
        <Modal
          ref={modal}
          title="Eliminar paciente"
          text="Una vez eliminado, no podrás recuperar la información del paciente. ¿Estás seguro que quieres eliminarlo?"
          buttonConfirmLabel="Eliminar"
          cancelEvent={closeModal}
          confirmEvent={() =>
            crudMethods.deletePatient(patientId, () =>
              appNavigate("/patients", setNavigationState("keep"))
            )
          }
        />
      </section>
    )
  );
};
