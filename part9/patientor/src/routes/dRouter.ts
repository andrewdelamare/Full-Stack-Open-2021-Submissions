import express from "express";
import { getAllDiagnoses } from "../services/diagServices";
const diagnosesRouter = express.Router();

diagnosesRouter.get("/", (_req, res) => {
  const d = getAllDiagnoses();
  res.send(d);
});

export default diagnosesRouter;