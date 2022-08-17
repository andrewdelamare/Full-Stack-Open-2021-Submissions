import diagnoses from "../../data/diagnoses.json";
import { Diagnoses } from "./types";


export const getAllDiagnoses = (): Diagnoses[] => {
  return diagnoses;
};