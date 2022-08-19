import diagnosis from "../../data/diagnosis";
import { Diagnosis } from "./types";


export const getAllDiagnosis = (): Diagnosis[] => {
  return diagnosis;
};