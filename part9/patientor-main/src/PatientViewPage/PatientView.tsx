/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { useParams } from "react-router-dom";
import { Entry, Patient } from "../types";
import { setPatientView } from "../state";
//import { EntryFormValues } from "./AddEntryForm";
import AddEntryModal from "./AddEntryModal";
import { Button } from "@material-ui/core";
export const PatientView = () => {
  const [{ patient, diagnosisList }, dispatch] = useStateValue();
  const {id} = useParams();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: any) => {
    try {
      if(values.type === "OccupationalHealthcareForm" && values.startDate && values.endDate){
        const formFixed = {
          type: "OccupationalHealthcare",
          description: values.description,
          date: values.date,
          specialist: values.specialist,
          diagnosisCodes: values.diagnosisCodes,
          employerName: values.employerName,
          sickLeave: {
            startDate: values.startDate,
            endDate: values.endDate
          }
        };
        const data = await axios.post<Patient>(
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          `${apiBaseUrl}/patients/${id}/entries`,
          formFixed
        );
        dispatch({ type: "SET_PATIENT_VIEW", payload: data.data });
        closeModal();
      }

      if(values.type === "HospitalForm" || values.type === "HospitalForm" && values.dischargeDate || values.type === "HospitalForm" && values.criteria || values.type === "HospitalForm" && values.criteria && values.dischargeDate){
        const formFixed = {
          type: "Hospital",
          description: values.description,
          date: values.date,
          specialist: values.specialist,
          diagnosisCodes: values.diagnosisCodes,
          discharge: {
            date: values.dischargeDate,
            criteria: values.criteria
          }
        };
        const data = await axios.post<Patient>(
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          `${apiBaseUrl}/patients/${id}/entries`,
          formFixed
        );
        dispatch({ type: "SET_PATIENT_VIEW", payload: data.data });
        closeModal();
      }

      const data = await axios.post<Patient>(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch({ type: "SET_PATIENT_VIEW", payload: data.data });
      closeModal();
    } catch (e: any) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data);
        setError(String(e?.response?.data?.error));
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setError(e?.rsponse?.data?.error);
      }
    }
  };

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
          { e.sickLeave ? (<p>Sick leave: {e.sickLeave?.startDate} - {e.sickLeave?.endDate} </p>) : (<div></div>) }
          {e.diagnosisCodes?.map(d => (<p key={d}>{d} {diagnosisList?.filter(diag => diag.code === d)[0].name} - {e.specialist}</p>))}
        </div>);
      case "OccupationalHealthcareForm":
          return (
            <div></div>
          );
      case "HospitalForm":
        return (
          <div></div>
        );
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
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </div>
  );
};