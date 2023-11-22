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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
