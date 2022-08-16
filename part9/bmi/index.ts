import express from "express";
import { bmiCalculator } from "./bmiCalculator";

const app = express();

app.set("query parser", "extended");

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  try {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    const bmi = bmiCalculator(height, weight);
    res.send({ height, weight, bmi });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
