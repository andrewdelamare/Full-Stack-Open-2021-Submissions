interface result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const exerciceCalculator = (arr: number[], goal: number) => {
  const numDays: number = arr.length;
  const trainingDays: number = arr.filter((val) => val > 0).length;
  const avg: number = arr.reduce((p, c) => p + c) / numDays;
  const difference: number = goal - avg;
  const rating: number =
    difference <= 0
      ? 3
      : difference > 0 && difference <= 0.3
      ? 2
      : difference > 0.3 && difference <= 0.5
      ? 1.5
      : 1;
  const success: boolean = difference <= 0 ? true : false;
  const message: string =
    difference <= 0
      ? "Great work!"
      : difference > 0 && difference <= 0.3
      ? "Good work but could use some improvement"
      : difference > 0.3 && difference <= 0.5
      ? "You really need to focus on improvement"
      : "Did you even try?";

  const result: result = {
    periodLength: numDays,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: message,
    target: goal,
    average: avg,
  };
  return result;
};

let args = process.argv;
let arg1 = parseFloat(process.argv[2]);
let arg2plus = process.argv.slice(3).map((i) => parseFloat(i));
console.log(exerciceCalculator(arg2plus, arg1));
