import patients from "../../data/patients.json";
import { Patient } from "./types";


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