import express from "express";
import { bmiCalculator } from "./bmiCalculator";
import { exerciceCalculator } from "./exerciseCalculator";

const app = express();
app.use(express.json());
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    res.status(400).send({error: error.message});
  }
});

app.post("/exercises", (req, res) => {
    try{
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const {daily_exercises, target} = req.body;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const result = exerciceCalculator(daily_exercises, target);
      res.send(result);
    }catch (error){
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      res.status(400).send({error: error.message});
    }
});


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
