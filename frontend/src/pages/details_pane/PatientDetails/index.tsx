import { PersonalData } from "../../../features/patients/components/PersonalData";
import { TopAppBar } from "../../../components/ui/TopAppBar";
import { Birth } from "../../../features/patients/components/Birth";
import { Modal } from "../../../components/ui/Modal";
import { useModal } from "../../../hooks/useModal";
import { usePatient } from "../../../features/patients/hooks/usePatient";
import { PresumptiveAnalysis } from "../../../features/patients/components/PresumptiveAnalysis";
import { useAppNavigate } from "../../../hooks/useAppNavigate";
import { PatientChiefComplaints } from "../../../features/chief_complaints/components/PatientChiefComplaints";
import { PatientReports } from "../../../features/reports/components/PatientReports";

export const PatientDetails = () => {
  const { extraData, appNavigate, setNavigationState } = useAppNavigate();
  const patientId = extraData.patientId;
  const { modal, openModal, closeModal } = useModal("modal");
  const { entityData, crudMethods } = usePatient(patientId);
  const { patient } = entityData;
  const { deletePatient } = crudMethods;

  return (
    patient && (
      <section className="details-section">
        <TopAppBar
          pane="details"
          title="Paciente"
          deleteEvent={() => openModal()}
        />
        <PersonalData
          data={{
            first_name: patient.first_name,
            last_name: patient.last_name,
            age: patient.age,
            tel: patient.tel,
            mail: patient.mail,
            marital_status: patient.marital_status,
            profile_picture: patient.profile_picture,
          }}
        />
        <PatientChiefComplaints
          chiefComplaints={patient.chief_complaints}
          addEvent={() =>
            appNavigate(
              "/add/chiefcomplaint",
              setNavigationState("keep", "addchiefcomplaint")
            )
          }
        />
        <PatientReports reports={patient.reports} />
        <Birth
          birth={patient.birth}
          bazi_table={patient.bazi_table}
          addEvent={() =>
            appNavigate(
              "/add/bazitable",
              setNavigationState("keep", "addbazitable", { patientId })
            )
          }
        />
        <PresumptiveAnalysis
          presumptiveAnalysis={patient.presumptive_analysis}
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
            deletePatient(patientId, () =>
              appNavigate("/patients", setNavigationState("keep"))
            )
          }
        />
      </section>
    )
  );
};
