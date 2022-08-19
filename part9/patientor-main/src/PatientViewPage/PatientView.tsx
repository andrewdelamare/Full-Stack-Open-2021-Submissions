import React from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { useParams } from "react-router-dom";
import { Entry, Patient } from "../types";
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

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const patientEntries = patient?.entries?.map((e: Entry) => { 
    switch (e.type) {
      case "Hospital":
      return (
      <div key={e.id}>
        <p>{e.date} Hospital Care</p>
        <p>{e.description} </p>
        <p>Discharge: {e.discharge.date} {e.discharge.criteria}</p>
        {e.diagnosisCodes?.map(d => (<p key={d}>{d} {diagnosisList?.filter(diag => diag.code === d)[0].name} - {e.specialist} </p>))}
      </div>);
      case "HealthCheck":
        return (
        <div key={e.id}>
          <p>{e.date} Health Check</p>
          <p>{e.description} </p>
          <p>Health check rating: {e.healthCheckRating}</p>
          {e.diagnosisCodes?.map(d => (<p key={d}>{d} {diagnosisList?.filter(diag => diag.code === d)[0].name} - {e.specialist}</p>))}
        </div>);
      case "OccupationalHealthcare":
        return (
        <div key={e.id}>
          <p>{e.date} Occupational Healthcare </p>
          <p>{e.description} </p>
          <p>Sick leave: {e.sickLeave?.startDate} - {e.sickLeave?.endDate} </p>
          {e.diagnosisCodes?.map(d => (<p key={d}>{d} {diagnosisList?.filter(diag => diag.code === d)[0].name} - {e.specialist}</p>))}
        </div>);
      default:
        return assertNever(e);
    }
    });

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