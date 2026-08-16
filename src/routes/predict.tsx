import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Loader2, Sparkles, AlertTriangle, CheckCircle2 } from "lucide-react";
import { predictDiabetes, type PredictionInput, type PredictionResult } from "@/lib/predict";
import { CircularProgress } from "@/components/CircularProgress";
import { RiskMeter } from "@/components/RiskMeter";
import { toast } from "sonner";

export const Route = createFileRoute("/predict")({
  head: () => ({
    meta: [
      { title: "Prediction Dashboard — NeuroDiab" },
      { name: "description", content: "Run an AI-powered diabetes risk prediction." },
    ],
  }),
  component: PredictPage,
});

const fields: {
  name: keyof PredictionInput;
  label: string;
  step?: string;
  min?: number;
  max?: number;
  unit?: string;
}[] = [
  { name: "pregnancies", label: "Pregnancies", min: 0, max: 20 },
  { name: "glucose", label: "Glucose", min: 0, max: 300, unit: "mg/dL" },
  { name: "blood_pressure", label: "Blood Pressure", min: 0, max: 200, unit: "mmHg" },
  { name: "skin_thickness", label: "Skin Thickness", min: 0, max: 100, unit: "mm" },
  { name: "insulin", label: "Insulin", min: 0, max: 900, unit: "µU/mL" },
  { name: "bmi", label: "BMI", step: "0.1", min: 0, max: 70 },
  {
    name: "diabetes_pedigree_function",
    label: "Pedigree Function",
    step: "0.01",
    min: 0,
    max: 3,
  },
  { name: "age", label: "Age", min: 1, max: 120 },
];

const defaults: PredictionInput = {
  pregnancies: 2,
  glucose: 120,
  blood_pressure: 70,
  skin_thickness: 20,
  insulin: 85,
  bmi: 30.5,
  diabetes_pedigree_function: 0.45,
  age: 33,
};

function PredictPage() {
  const [input, setInput] = useState<PredictionInput>(defaults);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const r = await predictDiabetes(input);
      setResult(r);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  const isDiabetic = result?.prediction === "Diabetic";

  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-[Space_Grotesk] text-3xl md:text-4xl font-bold tracking-tight">
            Prediction Dashboard
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Enter clinical signals and run the NeuroDiab model.
          </p>
        </div>
        <div className="glass px-4 py-2 rounded-xl text-xs flex items-center gap-2">
          <Activity className="w-4 h-4 text-primary" />
          Model v3.2 · sub-second inference
        </div>
      </header>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="glass-strong rounded-3xl p-6 md:p-8 lg:col-span-3 space-y-5"
        >
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <h2 className="font-semibold">Clinical inputs</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {fields.map((f) => (
              <label key={f.name} className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {f.label}
                  {f.unit && <span className="ml-1 opacity-60 normal-case">({f.unit})</span>}
                </span>
                <input
                  type="number"
                  step={f.step ?? "1"}
                  min={f.min}
                  max={f.max}
                  value={input[f.name]}
                  onChange={(e) =>
                    setInput((p) => ({ ...p, [f.name]: Number(e.target.value) }))
                  }
                  className="glass rounded-xl px-4 py-2.5 text-sm font-medium outline-none focus:glow-ring transition-all"
                  required
                />
              </label>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            disabled={loading}
            type="submit"
            className="w-full gradient-primary-bg text-primary-foreground rounded-2xl py-4 font-semibold shadow-glow flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing neural signals...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Run AI Prediction
              </>
            )}
          </motion.button>
        </motion.form>

        {/* Result */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass-strong rounded-3xl p-8 h-full min-h-[400px] flex flex-col items-center justify-center gap-4"
              >
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 rounded-full gradient-aurora-bg animate-aurora opacity-50 blur-xl" />
                  <div className="absolute inset-2 rounded-full glass flex items-center justify-center animate-pulse-glow">
                    <Loader2 className="w-10 h-10 text-primary animate-spin" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground text-center max-w-[200px]">
                  Processing through 12-layer neural network...
                </p>
              </motion.div>
            )}

            {!loading && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div
                  className={`glass-strong rounded-3xl p-6 text-center relative overflow-hidden ${
                    isDiabetic ? "" : ""
                  }`}
                >
                  <div
                    className="absolute inset-0 opacity-30 blur-2xl"
                    style={{
                      background: isDiabetic
                        ? "radial-gradient(circle at 50% 50%, oklch(0.62 0.24 25), transparent 70%)"
                        : "radial-gradient(circle at 50% 50%, oklch(0.72 0.17 155), transparent 70%)",
                    }}
                  />
                  <div className="relative">
                    <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      {isDiabetic ? (
                        <AlertTriangle className="w-3.5 h-3.5 text-destructive" />
                      ) : (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[color:var(--success)]" />
                      )}
                      AI Diagnosis
                    </div>
                    <h2 className="text-3xl font-bold mt-2">
                      {result.prediction}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Probability {(result.diabetes_probability * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>

                <div className="glass rounded-3xl p-6 flex flex-col items-center gap-4">
                  <CircularProgress
                    value={result.diabetes_probability}
                    danger={isDiabetic}
                    label="Diabetes Risk"
                    sublabel="Confidence"
                  />
                </div>

                <div className="glass rounded-3xl p-6">
                  <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                    Risk Meter
                  </div>
                  <RiskMeter value={result.diabetes_probability} />
                </div>
              </motion.div>
            )}

            {!loading && !result && (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-strong rounded-3xl p-8 h-full min-h-[400px] flex flex-col items-center justify-center text-center gap-3"
              >
                <div className="w-16 h-16 rounded-full glass flex items-center justify-center animate-float-slow">
                  <Activity className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold">Awaiting input</h3>
                <p className="text-xs text-muted-foreground max-w-[220px]">
                  Fill the clinical signals and run the model to see your AI-driven risk assessment.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}