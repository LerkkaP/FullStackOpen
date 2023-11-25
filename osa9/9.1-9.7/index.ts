import express from "express";
import calculateBmi from "./bmiCalculator";
const app = express();

const PORT = 3001;

app.get("/hello", (_req, res) => {
    res.send("Hello Full Stack");
})

app.get("/bmi", (req, res) => {
    var weight = req.query.weight;
    var height = req.query.height
    if (weight === "" || height === "" || isNaN(Number(weight)) || isNaN(Number(height))) {
        res.status(400).send({ error: "malformatted parameters" });
    }
    var bmi = calculateBmi(Number(height), Number(weight))
    res.json({
        weight, height, bmi
    })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})