const calculateBmi = (height: number, weight: number): string => {
  if (height === 0 || weight === 0) {
    return "Only positive numbers are allowed!";
  }
  var bmi = weight / (height / 100) ** 2;
  if (bmi < 16.0) {
    return "Underweight (Severe thinness)";
  } else if (bmi >= 16.0 && bmi <= 16.9) {
    return "Underweight (Moderate thinness)";
  } else if (bmi >= 17.0 && bmi <= 18.4) {
    return "Underweight (Mild thinness)";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return "Normal (healthy weight)";
  } else if (bmi >= 25.0 && bmi <= 29.9) {
    return "Overweight (Pre-obese)";
  } else if (bmi >= 30.0 && bmi <= 34.9) {
    return "Obese (Class 1)";
  } else if (bmi >= 35.0 && bmi <= 39.9) {
    return "Obese (Class 2)";
  } else if (bmi >= 40.0) {
    return "Obese (Class 3)";
  }
};

const height: number = Number(process.argv[2]);
const weight: number = Number(process.argv[3]);

console.log(calculateBmi(height, weight));
