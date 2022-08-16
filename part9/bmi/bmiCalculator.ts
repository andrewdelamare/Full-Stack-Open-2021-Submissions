const bmiCalculator = (h: number, w: number) => {
  const hAdj = (h/100)^2
  const calc: number = (w/hAdj)
  calc <= 16 ? console.log("Underweight (Severe thinness)")
  : calc > 16 && calc < 17? console.log("Underweight (Moderate thinness)")
  : calc >= 17 && calc < 18.5 ? console.log("Underweight (Mild thinness)")
  : calc >= 18.5 && calc < 25? console.log("Normal range")
  : calc >= 25 && calc < 30? console.log("Overweight (pre-obese)")
  : calc >= 30 && calc < 35? console.log("Obese (Class 1)")
  : calc >= 35 && calc < 40? console.log("Obese (Class 2)")
  : calc >= 40 ? console.log("Obese (Class 3)")
  : console.log("An unknown error occured")
}

let argss = process.argv
let args1 = parseFloat(process.argv[2])
let arg2 = parseInt(argss[3])
bmiCalculator(args1, arg2)
