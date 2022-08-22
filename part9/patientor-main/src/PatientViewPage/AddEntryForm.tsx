import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import { TextField, SelectEntryField, DiagnosisSelection, EntryTypeOption } from "../AddPatientModal/FormField";
import { Entry } from "../types";
import { useStateValue } from "../state";

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type EntryFormValues = Omit<Entry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const HealthCheckOptions: EntryTypeOption[] = [
  { value: 0, label: "Healthy" },
  { value: 1, label: "Low Risk" },
  { value: 2, label: "High Risk" },
  { value: 3, label: "Critical Risk" },
];

const EntryOptions: EntryTypeOption[] = [
  { value: "Hospital", label: "Hospital" },
  { value: "HealthCheck", label: "Health Check" },
  { value: "OccupationalHealthcareForm", label: "Occupational Healthcare" },
];


export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnosisList }] = useStateValue();
  return (
    <Formik
      initialValues={{
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [],
        type: 'HealthCheck',
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.description) {
          errors.occupation = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <SelectEntryField label="Entry Type" name="type" options={EntryOptions}/>
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={diagnosisList}
          />
          {values.type === "HealthCheck" ? (<SelectEntryField label="Health Check Rating" name="healthCheckRating" options={HealthCheckOptions}/>) 
          : (<div></div>)}
          {values.type === "OccupationalHealthcareForm" ? (<Field label="Employer Name" placeholder="Employer Name" name="employerName" component={TextField} />) 
          : (<div></div>)}
          {values.type === "OccupationalHealthcareForm" ? (<Field label="Sick Leave Start" placeholder="YYYY-MM-DD" name="startDate" component={TextField} />) 
          : (<div></div>)}
          {values.type === "OccupationalHealthcareForm" ? (<Field label="Sick Leave End" placeholder="YYYY-MM-DD" name="endDate" component={TextField} />) 
          : (<div></div>)}
          {values.type === "Hospital" ? (<Field label="Date" placeholder="YYYY-MM-DD" name="date" component={TextField} />) 
          : (<div></div>)}
          {values.type === "Hospital" ? (<Field label="Date" placeholder="YYYY-MM-DD" name="date" component={TextField} />) 
          : (<div></div>)}
          {values.type === "Hospital" ? (<Field label="Date" placeholder="YYYY-MM-DD" name="date" component={TextField} />) 
          : (<div></div>)}
            
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;