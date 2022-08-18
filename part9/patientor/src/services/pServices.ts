import patients from "../../data/patients.json";
import { Patient, PatientSensitive, newPatient } from "./types";
import { v4 as uuidv4 } from 'uuid';


export const getAllPatients = (): Patient[] => {
  const nonSensitive = patients.map(({ id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
  return nonSensitive;
};

/* const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
}; */

export const addPatient = (p: newPatient): PatientSensitive => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const newId = uuidv4();
  const newP = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    id: newId,
    ...p
  };
  patients.push(newP);
  return newP;
};
