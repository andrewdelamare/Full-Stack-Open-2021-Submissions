import express from "express";
import cors from "cors";
import diagnosesRouter from "./routes/dRouter";
const app = express();
app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

app.use("/api/diagnoses", diagnosesRouter);


app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});