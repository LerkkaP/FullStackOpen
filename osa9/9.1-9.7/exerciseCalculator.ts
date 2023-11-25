interface resultObject {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (hours: number[], target: number): resultObject => {
  const periodLength = hours.length;
  const trainingDays = hours.filter((hour) => hour > 0).length;
  const average = hours.reduce((acc, curr) => acc + curr, 0) / periodLength;
  const success = average >= target;

  var rating: number;
  var ratingDescription: string;

  if (average < target) {
    rating = 1;
    ratingDescription = "You are not moving enough!";
  } else if (average === target) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else if (average > target) {
    rating = 3;
    ratingDescription = "You are moving enough!";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  if (process.argv.length < 4) {
    throw new Error("Not enough arguments");
  }
  const array_hour = process.argv.slice(3);
  const hours: number[] = array_hour.map((hour) => Number(hour));
  const target: number = Number(process.argv[2]);

  const allNumbers = array_hour.every((hour) => !isNaN(Number(hour)));

  if (!isNaN(Number(target)) && allNumbers) {
    console.log(calculateExercises(hours, target));
  } else {
    throw new Error("Provided values were not numbers");
  }
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
