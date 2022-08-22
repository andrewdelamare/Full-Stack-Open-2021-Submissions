export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries?: Entry[];
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string, 
    criteria: string
  }
}

interface HospitalEntryForm extends BaseEntry {
  type: "HospitalForm";
  dischargeDate: string;
  criteria: string;
  
}

interface OccupationalHealthcareEntryForm extends BaseEntry {
  type: "OccupationalHealthcareForm";
  employerName: string;
  startDate?: string, 
  endDate?: string
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string, 
    endDate: string
  }
}

export type Entry =
  | HospitalEntry
  | HospitalEntryForm
  | OccupationalHealthcareEntry
  | OccupationalHealthcareEntryForm
  | HealthCheckEntry;
