const exerciceCalculator = (arr: number[] , goal: number) => {
  const numDays: number = arr.length
  const trainingDays: number = arr.filter(val => val > 0).length
  const avg: number = arr.reduce((p, c) => p + c)/numDays
  const difference: number = (goal - avg)
  const rating: number = difference <= 0 ? 3 
  : difference > 0 && difference <= 0.3 ? 2
  : difference > 0.3 && difference <= 0.5 ? 1.5
  : 1
  const success: boolean = difference <= 0 ? true : false 
  const message: string = difference <= 0 ? "Great work!" 
  : difference > 0 && difference <= 0.3 ? "Good work but could use some improvement"
  : difference > 0.3 && difference <= 0.5 ? "You really need to focus on improvement"
  : "Did you even try?"
  interface result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
  }
  const result: result = {
    periodLength: numDays,
    trainingDays: trainingDays,
    success: success, 
    rating: rating,
    ratingDescription: message,
    target: goal,
    average: avg
  }
  return result
}
console.log(exerciceCalculator([3, 0, 2, 4.5, 0, 3, 1], 2))
