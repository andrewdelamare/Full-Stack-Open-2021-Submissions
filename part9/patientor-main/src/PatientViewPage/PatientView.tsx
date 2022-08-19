import React from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { useParams } from "react-router-dom";
import { Patient } from "../types";
import { setPatientView } from "../state";
export const PatientView = () => {
  const [{ patient, diagnosisList }, dispatch] = useStateValue();
  const {id} = useParams();
  React.useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatientView(patientFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientData();
  }, [dispatch]);

  const patientEntries = patient?.entries?.map((e) => (
    <div key={e.id}>
      <p>{e.date} {e.description}</p>
      {e.diagnosisCodes?.map(d => (<p key={d}>{d} {diagnosisList?.filter(diag => diag.code === d)[0].name}</p>))}
    </div>
    ));

  return (
    <div>
      <h1>{patient?.name}</h1>
      <p>{patient?.gender}</p>
      <p>{patient?.ssn}</p>
      <p>{patient?.occupation}</p>
      <h2>Entries</h2>
      {patientEntries}
    </div>
  );
};