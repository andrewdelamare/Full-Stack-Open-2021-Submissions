/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { State } from "./state";
import { Diagnosis, Patient } from "../types";


export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
    type: "SET_PATIENT_VIEW"
    payload: Patient;
  }
  | {
    type: "SET_DIAGNOSIS"
    payload: Diagnosis[];
  };

export const setPatientList = (pList: Patient[]): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: pList
  };
};

export const addPatient = (p: Patient) => {
  return {
    type: 'ADD_PATIENT',
    payload: p
  };
};

export const setPatientView = (p: Patient): Action => {
  return {
    type: 'SET_PATIENT_VIEW',
    payload: p
  };
};

export const setDiagnosisList = (dList: Diagnosis[]): Action => {
  return {
    type: 'SET_DIAGNOSIS',
    payload: dList
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_PATIENT_VIEW":
        if (action.payload !== state.patient){
          return {
            ...state,
            patient: action.payload
          };
        }else{
          return state;
        }
    case "SET_DIAGNOSIS":
        if (action.payload !== state.diagnosisList){
          return {
            ...state,
            diagnosisList: action.payload
          };
        }else{
          return state;
        }
    default:
      return state;
  }
};
