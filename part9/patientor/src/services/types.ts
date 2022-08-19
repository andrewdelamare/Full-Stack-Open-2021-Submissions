// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export interface Diagnoses {
  code: string;
  name: string;
  latin?: string;
}
export interface PatientSensitive {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: string,
  occupation: string
  entries?: Entry[]
}
export type Patient = Omit<PatientSensitive, "ssn">;

export type newPatient = Omit<PatientSensitive, "id">;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}