import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/store";
import { fetchAllPatients } from "../../features/patients/slices/patientsSlice";
import { RootState } from "../../app/store";
import { useParams } from "react-router";
import { selectPatientById } from "../../features/patients/slices/patientsSlice";
import { PersonalData } from "../../features/patients/components/PersonalData";
import { TopAppBar } from "../../components/ui/TopAppBar";
import { Birth } from "../../features/patients/components/Birth";

export const PatientDetails = () => {
  const patientId = useParams().id!;
  const patient = useSelector((state: RootState) =>
    selectPatientById(state, patientId)
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (patient === undefined) dispatch(fetchAllPatients());
  }, []);

  return (
    patient && (
      <>
        <TopAppBar title="Paciente" />
        <PersonalData
          firstName={patient.first_name}
          lastName={patient.last_name}
          age={patient.age}
          tel={patient.tel}
          mail={patient.mail}
          maritalStatus={patient.marital_status}
          profilePicture={patient.profile_picture}
        />
        {patient.birth && (
          <Birth
            date={patient.birth.date}
            time={patient.birth.time}
            location={patient.birth.location}
            bazi_table={patient.birth.bazi_table}
          />
        )}
      </>
    )
  );
};
