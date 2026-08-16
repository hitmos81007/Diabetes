import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Sparkles, Loader2, AlertTriangle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
function mockPredict(input) {
  const score = (input.glucose - 100) * 0.025 + (input.bmi - 25) * 0.04 + (input.age - 30) * 0.012 + input.diabetes_pedigree_function * 0.6 + (input.insulin > 200 ? 0.1 : 0) + (input.blood_pressure - 70) * 5e-3;
  const prob = Math.min(0.98, Math.max(0.02, 1 / (1 + Math.exp(-score))));
  return {
    prediction: prob >= 0.5 ? "Diabetic" : "Non-Diabetic",
    diabetes_probability: Number(prob.toFixed(4))
  };
}
async function predictDiabetes(input) {
  {
    await new Promise((r) => setTimeout(r, 1400));
    return mockPredict(input);
  }
}
function CircularProgress({
  value,
  size = 200,
  label,
  sublabel,
  danger
}) {
  const stroke = 14;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - value);
  const gradId = danger ? "grad-danger" : "grad-ok";
  return /* @__PURE__ */ jsxs("div", { className: "relative", style: { width: size, height: size }, children: [
    /* @__PURE__ */ jsxs("svg", { width: size, height: size, className: "-rotate-90", children: [
      /* @__PURE__ */ jsxs("defs", { children: [
        /* @__PURE__ */ jsxs("linearGradient", { id: "grad-ok", x1: "0", y1: "0", x2: "1", y2: "1", children: [
          /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "oklch(0.78 0.15 220)" }),
          /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "oklch(0.72 0.17 155)" })
        ] }),
        /* @__PURE__ */ jsxs("linearGradient", { id: "grad-danger", x1: "0", y1: "0", x2: "1", y2: "1", children: [
          /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "oklch(0.72 0.2 295)" }),
          /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "oklch(0.62 0.24 25)" })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        "circle",
        {
          cx: size / 2,
          cy: size / 2,
          r,
          fill: "none",
          stroke: "color-mix(in oklab, var(--color-border) 90%, transparent)",
          strokeWidth: stroke
        }
      ),
      /* @__PURE__ */ jsx(
        motion.circle,
        {
          cx: size / 2,
          cy: size / 2,
          r,
          fill: "none",
          stroke: `url(#${gradId})`,
          strokeWidth: stroke,
          strokeLinecap: "round",
          strokeDasharray: c,
          initial: { strokeDashoffset: c },
          animate: { strokeDashoffset: offset },
          transition: { duration: 1.6, ease: "easeOut" }
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center", children: [
      /* @__PURE__ */ jsxs(
        motion.span,
        {
          initial: { opacity: 0, y: 6 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.4 },
          className: "text-4xl font-bold gradient-text tabular-nums",
          children: [
            Math.round(value * 100),
            "%"
          ]
        }
      ),
      label && /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold mt-1", children: label }),
      sublabel && /* @__PURE__ */ jsx("span", { className: "text-[10px] text-muted-foreground uppercase tracking-widest", children: sublabel })
    ] })
  ] });
}
function RiskMeter({ value }) {
  const angle = -90 + value * 180;
  return /* @__PURE__ */ jsxs("div", { className: "w-full max-w-sm", children: [
    /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 200 120", className: "w-full", children: [
      /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: "meter-grad", x1: "0", y1: "0", x2: "1", y2: "0", children: [
        /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "oklch(0.72 0.17 155)" }),
        /* @__PURE__ */ jsx("stop", { offset: "50%", stopColor: "oklch(0.82 0.17 80)" }),
        /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "oklch(0.62 0.24 25)" })
      ] }) }),
      /* @__PURE__ */ jsx(
        "path",
        {
          d: "M20 100 A80 80 0 0 1 180 100",
          stroke: "url(#meter-grad)",
          strokeWidth: "14",
          fill: "none",
          strokeLinecap: "round"
        }
      ),
      /* @__PURE__ */ jsx(
        motion.line,
        {
          x1: "100",
          y1: "100",
          x2: "100",
          y2: "30",
          stroke: "currentColor",
          strokeWidth: "3",
          strokeLinecap: "round",
          style: { transformOrigin: "100px 100px" },
          initial: { rotate: -90 },
          animate: { rotate: angle },
          transition: { type: "spring", stiffness: 80, damping: 14 }
        }
      ),
      /* @__PURE__ */ jsx("circle", { cx: "100", cy: "100", r: "8", className: "fill-primary" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-[10px] uppercase tracking-widest text-muted-foreground px-2 -mt-2", children: [
      /* @__PURE__ */ jsx("span", { children: "Low" }),
      /* @__PURE__ */ jsx("span", { children: "Moderate" }),
      /* @__PURE__ */ jsx("span", { children: "High" })
    ] })
  ] });
}
const fields = [{
  name: "pregnancies",
  label: "Pregnancies",
  min: 0,
  max: 20
}, {
  name: "glucose",
  label: "Glucose",
  min: 0,
  max: 300,
  unit: "mg/dL"
}, {
  name: "blood_pressure",
  label: "Blood Pressure",
  min: 0,
  max: 200,
  unit: "mmHg"
}, {
  name: "skin_thickness",
  label: "Skin Thickness",
  min: 0,
  max: 100,
  unit: "mm"
}, {
  name: "insulin",
  label: "Insulin",
  min: 0,
  max: 900,
  unit: "µU/mL"
}, {
  name: "bmi",
  label: "BMI",
  step: "0.1",
  min: 0,
  max: 70
}, {
  name: "diabetes_pedigree_function",
  label: "Pedigree Function",
  step: "0.01",
  min: 0,
  max: 3
}, {
  name: "age",
  label: "Age",
  min: 1,
  max: 120
}];
const defaults = {
  pregnancies: 2,
  glucose: 120,
  blood_pressure: 70,
  skin_thickness: 20,
  insulin: 85,
  bmi: 30.5,
  diabetes_pedigree_function: 0.45,
  age: 33
};
function PredictPage() {
  const [input, setInput] = useState(defaults);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
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
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("header", { className: "flex items-end justify-between gap-4 flex-wrap", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "font-[Space_Grotesk] text-3xl md:text-4xl font-bold tracking-tight", children: "Prediction Dashboard" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mt-1 text-sm", children: "Enter clinical signals and run the NeuroDiab model." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "glass px-4 py-2 rounded-xl text-xs flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Activity, { className: "w-4 h-4 text-primary" }),
        "Model v3.2 · sub-second inference"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-5 gap-6", children: [
      /* @__PURE__ */ jsxs(motion.form, { initial: {
        opacity: 0,
        y: 10
      }, animate: {
        opacity: 1,
        y: 0
      }, onSubmit: handleSubmit, className: "glass-strong rounded-3xl p-6 md:p-8 lg:col-span-3 space-y-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
          /* @__PURE__ */ jsx(Sparkles, { className: "w-4 h-4 text-primary" }),
          /* @__PURE__ */ jsx("h2", { className: "font-semibold", children: "Clinical inputs" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 gap-4", children: fields.map((f) => /* @__PURE__ */ jsxs("label", { className: "flex flex-col gap-1.5", children: [
          /* @__PURE__ */ jsxs("span", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider", children: [
            f.label,
            f.unit && /* @__PURE__ */ jsxs("span", { className: "ml-1 opacity-60 normal-case", children: [
              "(",
              f.unit,
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsx("input", { type: "number", step: f.step ?? "1", min: f.min, max: f.max, value: input[f.name], onChange: (e) => setInput((p) => ({
            ...p,
            [f.name]: Number(e.target.value)
          })), className: "glass rounded-xl px-4 py-2.5 text-sm font-medium outline-none focus:glow-ring transition-all", required: true })
        ] }, f.name)) }),
        /* @__PURE__ */ jsx(motion.button, { whileHover: {
          scale: 1.01
        }, whileTap: {
          scale: 0.99
        }, disabled: loading, type: "submit", className: "w-full gradient-primary-bg text-primary-foreground rounded-2xl py-4 font-semibold shadow-glow flex items-center justify-center gap-2 disabled:opacity-70", children: loading ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Loader2, { className: "w-5 h-5 animate-spin" }),
          "Analyzing neural signals..."
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Sparkles, { className: "w-5 h-5" }),
          "Run AI Prediction"
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-2 space-y-4", children: /* @__PURE__ */ jsxs(AnimatePresence, { mode: "wait", children: [
        loading && /* @__PURE__ */ jsxs(motion.div, { initial: {
          opacity: 0
        }, animate: {
          opacity: 1
        }, exit: {
          opacity: 0
        }, className: "glass-strong rounded-3xl p-8 h-full min-h-[400px] flex flex-col items-center justify-center gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative w-24 h-24", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-full gradient-aurora-bg animate-aurora opacity-50 blur-xl" }),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-2 rounded-full glass flex items-center justify-center animate-pulse-glow", children: /* @__PURE__ */ jsx(Loader2, { className: "w-10 h-10 text-primary animate-spin" }) })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground text-center max-w-[200px]", children: "Processing through 12-layer neural network..." })
        ] }, "loading"),
        !loading && result && /* @__PURE__ */ jsxs(motion.div, { initial: {
          opacity: 0,
          y: 20
        }, animate: {
          opacity: 1,
          y: 0
        }, className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: `glass-strong rounded-3xl p-6 text-center relative overflow-hidden ${isDiabetic ? "" : ""}`, children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-30 blur-2xl", style: {
              background: isDiabetic ? "radial-gradient(circle at 50% 50%, oklch(0.62 0.24 25), transparent 70%)" : "radial-gradient(circle at 50% 50%, oklch(0.72 0.17 155), transparent 70%)"
            } }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground", children: [
                isDiabetic ? /* @__PURE__ */ jsx(AlertTriangle, { className: "w-3.5 h-3.5 text-destructive" }) : /* @__PURE__ */ jsx(CheckCircle2, { className: "w-3.5 h-3.5 text-[color:var(--success)]" }),
                "AI Diagnosis"
              ] }),
              /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mt-2", children: result.prediction }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
                "Probability ",
                (result.diabetes_probability * 100).toFixed(1),
                "%"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "glass rounded-3xl p-6 flex flex-col items-center gap-4", children: /* @__PURE__ */ jsx(CircularProgress, { value: result.diabetes_probability, danger: isDiabetic, label: "Diabetes Risk", sublabel: "Confidence" }) }),
          /* @__PURE__ */ jsxs("div", { className: "glass rounded-3xl p-6", children: [
            /* @__PURE__ */ jsx("div", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3", children: "Risk Meter" }),
            /* @__PURE__ */ jsx(RiskMeter, { value: result.diabetes_probability })
          ] })
        ] }, "result"),
        !loading && !result && /* @__PURE__ */ jsxs(motion.div, { initial: {
          opacity: 0
        }, animate: {
          opacity: 1
        }, className: "glass-strong rounded-3xl p-8 h-full min-h-[400px] flex flex-col items-center justify-center text-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-full glass flex items-center justify-center animate-float-slow", children: /* @__PURE__ */ jsx(Activity, { className: "w-7 h-7 text-primary" }) }),
          /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: "Awaiting input" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground max-w-[220px]", children: "Fill the clinical signals and run the model to see your AI-driven risk assessment." })
        ] }, "empty")
      ] }) })
    ] })
  ] });
}
export {
  PredictPage as component
};
