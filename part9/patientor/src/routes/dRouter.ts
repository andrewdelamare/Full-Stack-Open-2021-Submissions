import express from "express";
import { getAllDiagnosis } from "../services/diagServices";
import { Diagnosis } from "../services/types";
const diagnosesRouter = express.Router();

diagnosesRouter.get("/", (_req, res) => {
  const d: Diagnosis[] = getAllDiagnosis();
  res.send(d);
});

export default diagnosesRouter;