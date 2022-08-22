import patients from "../../data/patients";
import { PatientSensitive, newPatient, Gender, PublicPatient, Entry, HealthCheckRating } from "./types";
import { v4 as uuidv4 } from 'uuid';


export const getAllPatients = (): PublicPatient[] => {
  const nonSensitive: PublicPatient[] = patients.map(({ id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
  return nonSensitive;
};

export const getPatient = (pId: string): PatientSensitive | undefined => {
  const pat: PatientSensitive | undefined = patients.filter(p => p.id === pId)[0];
  const patSen: PatientSensitive = !pat.entries ? { ...pat, entries: []} : pat;
  return patSen;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (s: unknown): string => {
  if (!s || !isString(s)) {
    throw new Error('Incorrect or missing value');
  }

  return s;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
}; 

const isGender = (str: string): str is Gender => {
  return ['male', 'female', 'other'].includes(str);
};

const parseGender = (g: unknown): Gender => {
  if (!g || !isString(g) || !isGender(g)) {
      throw new Error('Incorrect or missing gender: ' + g);
  }
  return g;
};

const isHCR = (num: any): num is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return [0, 1, 2, 3].includes(num);
};

const parseHCR = (hcr: unknown): HealthCheckRating => {
  if (!isHCR(hcr)) {
      throw new Error('Incorrect or missing health check rating: ' + hcr);
  }
  return hcr;
};

export const addPatient = (p: newPatient): PatientSensitive => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const newId = uuidv4();
  const newP = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    id: newId,
    name: parseString(p.name),
    dateOfBirth: parseDate(p.dateOfBirth),
    ssn: parseString(p.ssn),
    gender: parseGender(p.gender),
    occupation: parseString(p.occupation),
    entries:[]
  };
  patients.push(newP);
  return newP;
};

export const addEntry = (e: Entry, pId: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const newId = uuidv4();
  const patient: PatientSensitive | undefined = patients.filter(p => p.id === pId)[0];
  if (e.type === "HealthCheck"){
    const newE: Entry = {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      id: newId,
      description: parseString(e.description),
      date: parseDate(e.date),
      specialist: parseString(e.specialist),
      diagnosisCodes: e.diagnosisCodes?.map(d => parseString(d)),
      type: "HealthCheck",
      healthCheckRating: parseHCR(e.healthCheckRating)
    };
    if (patient){ patient.entries?.push(newE);}
    return patient;
  }else if (e.type === "Hospital"){
    const newE: Entry = {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      id: newId,
      description: parseString(e.description),
      date: parseDate(e.date),
      specialist: parseString(e.specialist),
      diagnosisCodes: e.diagnosisCodes?.map(d => parseString(d)),
      type: e.type,
      discharge: {
        date: parseDate(e.discharge.date), 
        criteria: parseString(e.discharge.criteria)
      }
    };
    if (patient){ patient.entries?.push(newE);}
    return patient;
  } else if (e.type === "OccupationalHealthcare"){
    if (e.sickLeave){
      const newE: Entry = {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        id: newId,
        description: parseString(e.description),
        date: parseDate(e.date),
        specialist: parseString(e.specialist),
        diagnosisCodes: e.diagnosisCodes?.map(d => parseString(d)),
        type: e.type,
        employerName: parseString(e.employerName),
        sickLeave: {
          startDate: parseDate(e.sickLeave?.startDate),
          endDate: parseDate(e.sickLeave?.endDate)
        }
      };
      if (patient){ patient.entries?.push(newE);}
      return patient;
    } else {
      const newE: Entry = {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        id: newId,
        description: parseString(e.description),
        date: parseDate(e.date),
        specialist: parseString(e.specialist),
        diagnosisCodes: e.diagnosisCodes?.map(d => parseString(d)),
        type: e.type,
        employerName: parseString(e.employerName),
      };
      if (patient){ patient.entries?.push(newE);}
      return patient;
    }
  }else{
    return patient;
  }
};
