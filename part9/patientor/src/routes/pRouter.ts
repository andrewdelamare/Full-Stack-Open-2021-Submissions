/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
import { getAllPatients, addPatient, getPatient } from "../services/pServices";
const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
  const p = getAllPatients();
  res.send(p);
});

patientRouter.get("/:id", (req, res) => {
  const id: string = req.params.id;
  const p = getPatient(id);
  res.send(p);
});

patientRouter.post('/', (req, res) => {
  const { name, ssn, dateOfBirth, occupation, gender, entries } = req.body;
  const newPatient = addPatient({
    name,
    ssn,
    dateOfBirth,
    occupation,
    gender,
    entries,
  });
  res.json(newPatient);
});

export default patientRouter;