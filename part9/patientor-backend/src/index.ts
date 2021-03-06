import express from "express";
import cors from "cors";
import diagnosesRouter from "./routes/diagnoses";
import patietRouter from "./routes/patient";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
    console.log("pinged");
    res.send("pong");
});

app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patietRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});