import express from "express";
import { getAllPatients } from "../services/pServices";
const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
  const p = getAllPatients();
  res.send(p);
});

export default patientRouter;