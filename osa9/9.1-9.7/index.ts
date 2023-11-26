import express from "express";
import calculateBmi from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";

const app = express();
app.use(express.json());

const PORT = 3001;

interface ExerciseRequest {
    daily_exercises: number[];
    target: number;
  }

app.get("/hello", (_req, res) => {
    res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
    const weight = req.query.weight;
    const height = req.query.height;
    if (weight === "" || height === "" || isNaN(Number(weight)) || isNaN(Number(height))) {
        res.status(400).send({ error: "malformatted parameters" });
    }
    const bmi = calculateBmi(Number(height), Number(weight));
    res.json({
        weight, height, bmi
    });
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isValidArray(arr: any[]): boolean {
    return Array.isArray(arr) && arr.every(item => !isNaN(Number(item)) === true) && arr.length > 0;
}

app.post("/exercises", (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target }: ExerciseRequest = req.body;

    if (!daily_exercises || !target) {
        res.status(400).send({ error: "parameters missing"});
    } else if (isNaN(Number(target)) || !isValidArray(daily_exercises)) {
        res.status(400).send({ error: "malformatted parameters"});
    }
    const result = calculateExercises(daily_exercises, target);
    res.send({ result });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});