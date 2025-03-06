import "./PatientDetails.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/store";
import {
  getAllPatients,
  deletePatient,
} from "../../features/patients/slices/patientsSlice";
import { RootState } from "../../app/store";
import { useNavigate, useParams } from "react-router";
import { selectPatientById } from "../../features/patients/slices/patientsSlice";
import { PersonalData } from "../../features/patients/components/PersonalData";
import { TopAppBar } from "../../components/ui/TopAppBar";
import { Birth } from "../../features/patients/components/Birth";
import { Modal } from "../../components/ui/Modal";
import { useModal } from "../../hooks/useModal";

export const PatientDetails = () => {
  const patientId = useParams().id!;
  const patient = useSelector((state: RootState) =>
    selectPatientById(state, patientId)
  );
  const dispatch = useAppDispatch();
  const { modal, openModal, closeModal } = useModal("modal");
  const navigate = useNavigate();

  useEffect(() => {
    if (patient === undefined) dispatch(getAllPatients());
  }, []);

  const deleteEntity = () => {
    dispatch(deletePatient(patientId)).then(() => {
      navigate("/patients");
    });
  };

  return (
    patient && (
      <section className="patient-details-pane">
        <TopAppBar title="Paciente" deleteEvent={() => openModal} />
        <PersonalData
          firstName={patient.first_name}
          lastName={patient.last_name}
          age={patient.age}
          tel={patient.tel}
          mail={patient.mail}
          maritalStatus={patient.marital_status}
          profilePicture={patient.profile_picture as string}
        />
        {patient.birth && (
          <Birth
            date={patient.birth.date}
            time={patient.birth.time}
            location={patient.birth.location}
            bazi_table={patient.birth.bazi_table}
          />
        )}
        <Modal
          ref={modal}
          title="Eliminar paciente"
          text="Una vez eliminado, no podrás recuperar la información del paciente. ¿Estás seguro que quieres eliminarlo?"
          buttonConfirmLabel="Eliminar"
          cancelEvent={closeModal}
          confirmEvent={deleteEntity}
        />
      </section>
    )
  );
};
