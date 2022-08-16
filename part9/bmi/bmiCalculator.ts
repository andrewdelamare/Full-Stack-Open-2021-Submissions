export const bmiCalculator = (h: number, w: number) => {
  const hAdj = (h / 100) ^ 2;
  const calc: number = w / hAdj;
  const bmi: string =
    calc <= 16
      ? "Underweight (Severe thinness)"
      : calc > 16 && calc < 17
      ? "Underweight (Moderate thinness)"
      : calc >= 17 && calc < 18.5
      ? "Underweight (Mild thinness)"
      : calc >= 18.5 && calc < 25
      ? "Normal range"
      : calc >= 25 && calc < 30
      ? "Overweight (pre-obese)"
      : calc >= 30 && calc < 35
      ? "Obese (Class 1)"
      : calc >= 35 && calc < 40
      ? "Obese (Class 2)"
      : calc >= 40
      ? "Obese (Class 3)"
      : "An unknown error occured";
  return bmi;
};

let argss = process.argv;
let args1 = parseFloat(process.argv[2]);
let arg2 = parseInt(argss[3]);
bmiCalculator(args1, arg2);
