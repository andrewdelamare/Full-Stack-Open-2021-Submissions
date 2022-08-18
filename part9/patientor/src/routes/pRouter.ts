/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
import { getAllPatients, addPatient } from "../services/pServices";
const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
  const p = getAllPatients();
  res.send(p);
});

patientRouter.post('/', (req, res) => {
  const { name, ssn, dateOfBirth, occupation, gender } = req.body;
  const newPatient = addPatient({
    name,
    ssn,
    dateOfBirth,
    occupation,
    gender,
  });
  res.json(newPatient);
});

export default patientRouter;