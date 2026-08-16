export interface PredictionInput {
  pregnancies: number;
  glucose: number;
  blood_pressure: number;
  skin_thickness: number;
  insulin: number;
  bmi: number;
  diabetes_pedigree_function: number;
  age: number;
}

export interface PredictionResult {
  prediction: "Diabetic" | "Non-Diabetic";
  diabetes_probability: number;
}

const API_URL = (import.meta.env.VITE_PREDICT_API_URL as string | undefined) || "";

function mockPredict(input: PredictionInput): PredictionResult {
  const score =
    (input.glucose - 100) * 0.025 +
    (input.bmi - 25) * 0.04 +
    (input.age - 30) * 0.012 +
    input.diabetes_pedigree_function * 0.6 +
    (input.insulin > 200 ? 0.1 : 0) +
    (input.blood_pressure - 70) * 0.005;
  const prob = Math.min(0.98, Math.max(0.02, 1 / (1 + Math.exp(-score))));
  return {
    prediction: prob >= 0.5 ? "Diabetic" : "Non-Diabetic",
    diabetes_probability: Number(prob.toFixed(4)),
  };
}

export async function predictDiabetes(input: PredictionInput): Promise<PredictionResult> {
  if (!API_URL) {
    await new Promise((r) => setTimeout(r, 1400));
    return mockPredict(input);
  }
  const res = await fetch(`${API_URL.replace(/\/$/, "")}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(`Prediction failed (${res.status})`);
  return res.json();
}