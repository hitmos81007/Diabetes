import { jsxs, jsx } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, PieChart, Pie, Cell, Legend, LineChart, Line } from "recharts";
import { Target, Zap, TrendingUp, Brain } from "lucide-react";
const featureImportance = [{
  name: "Glucose",
  value: 38
}, {
  name: "BMI",
  value: 22
}, {
  name: "Age",
  value: 14
}, {
  name: "Insulin",
  value: 11
}, {
  name: "Pedigree",
  value: 8
}, {
  name: "BP",
  value: 7
}];
const distribution = [{
  name: "Non-Diabetic",
  value: 612
}, {
  name: "Diabetic",
  value: 268
}];
const confidence = Array.from({
  length: 12
}, (_, i) => ({
  month: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"][i],
  acc: 0.88 + Math.sin(i / 2) * 0.03 + i * 5e-3,
  conf: 0.82 + Math.cos(i / 1.7) * 0.04 + i * 6e-3
}));
const COLORS = ["oklch(0.72 0.2 295)", "oklch(0.68 0.18 250)", "oklch(0.82 0.14 220)", "oklch(0.75 0.2 320)", "oklch(0.72 0.17 155)", "oklch(0.82 0.17 80)"];
const stats = [{
  label: "Accuracy",
  value: "94.7%",
  icon: Target
}, {
  label: "Precision",
  value: "92.1%",
  icon: Zap
}, {
  label: "Recall",
  value: "89.4%",
  icon: TrendingUp
}, {
  label: "F1 Score",
  value: "90.7%",
  icon: Brain
}];
function AnalyticsPage() {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h1", { className: "font-[Space_Grotesk] text-3xl md:text-4xl font-bold tracking-tight", children: "Analytics" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mt-1 text-sm", children: "Live performance metrics from the NeuroDiab inference engine." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-4", children: stats.map((s, i) => /* @__PURE__ */ jsxs(motion.div, { initial: {
      opacity: 0,
      y: 10
    }, animate: {
      opacity: 1,
      y: 0
    }, transition: {
      delay: i * 0.05
    }, className: "glass rounded-2xl p-5 hover:glow-ring transition-all", children: [
      /* @__PURE__ */ jsx(s.icon, { className: "w-6 h-6 text-primary mb-2" }),
      /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold gradient-text tabular-nums", children: s.value }),
      /* @__PURE__ */ jsx("div", { className: "text-[10px] uppercase tracking-widest text-muted-foreground mt-1", children: s.label })
    ] }, s.label)) }),
    /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxs(motion.div, { initial: {
        opacity: 0,
        y: 10
      }, animate: {
        opacity: 1,
        y: 0
      }, className: "glass-strong rounded-3xl p-6 lg:col-span-2", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-1", children: "Feature importance" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mb-4", children: "What drives the model's decisions" }),
        /* @__PURE__ */ jsx("div", { className: "h-72", children: /* @__PURE__ */ jsx(ResponsiveContainer, { children: /* @__PURE__ */ jsxs(BarChart, { data: featureImportance, children: [
          /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: "barGrad", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "oklch(0.72 0.2 295)" }),
            /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "oklch(0.68 0.18 250)" })
          ] }) }),
          /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "oklch(0.7 0.04 270 / 0.2)" }),
          /* @__PURE__ */ jsx(XAxis, { dataKey: "name", stroke: "currentColor", fontSize: 12 }),
          /* @__PURE__ */ jsx(YAxis, { stroke: "currentColor", fontSize: 12 }),
          /* @__PURE__ */ jsx(Tooltip, { contentStyle: {
            background: "var(--color-popover)",
            border: "1px solid var(--color-border)",
            borderRadius: 12
          } }),
          /* @__PURE__ */ jsx(Bar, { dataKey: "value", fill: "url(#barGrad)", radius: [12, 12, 0, 0] })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxs(motion.div, { initial: {
        opacity: 0,
        y: 10
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        delay: 0.1
      }, className: "glass-strong rounded-3xl p-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-1", children: "Prediction distribution" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mb-4", children: "Last 30 days" }),
        /* @__PURE__ */ jsx("div", { className: "h-72", children: /* @__PURE__ */ jsx(ResponsiveContainer, { children: /* @__PURE__ */ jsxs(PieChart, { children: [
          /* @__PURE__ */ jsx(Pie, { data: distribution, cx: "50%", cy: "50%", innerRadius: 55, outerRadius: 90, paddingAngle: 4, dataKey: "value", children: distribution.map((_, i) => /* @__PURE__ */ jsx(Cell, { fill: COLORS[i] }, i)) }),
          /* @__PURE__ */ jsx(Tooltip, { contentStyle: {
            background: "var(--color-popover)",
            border: "1px solid var(--color-border)",
            borderRadius: 12
          } }),
          /* @__PURE__ */ jsx(Legend, {})
        ] }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(motion.div, { initial: {
      opacity: 0,
      y: 10
    }, animate: {
      opacity: 1,
      y: 0
    }, transition: {
      delay: 0.15
    }, className: "glass-strong rounded-3xl p-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-1", children: "Confidence trend" }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mb-4", children: "Rolling 12-month accuracy vs confidence" }),
      /* @__PURE__ */ jsx("div", { className: "h-72", children: /* @__PURE__ */ jsx(ResponsiveContainer, { children: /* @__PURE__ */ jsxs(LineChart, { data: confidence, children: [
        /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "oklch(0.7 0.04 270 / 0.2)" }),
        /* @__PURE__ */ jsx(XAxis, { dataKey: "month", stroke: "currentColor", fontSize: 12 }),
        /* @__PURE__ */ jsx(YAxis, { stroke: "currentColor", fontSize: 12, domain: [0.7, 1] }),
        /* @__PURE__ */ jsx(Tooltip, { contentStyle: {
          background: "var(--color-popover)",
          border: "1px solid var(--color-border)",
          borderRadius: 12
        } }),
        /* @__PURE__ */ jsx(Legend, {}),
        /* @__PURE__ */ jsx(Line, { type: "monotone", dataKey: "acc", stroke: "oklch(0.72 0.2 295)", strokeWidth: 3, dot: {
          r: 3
        }, name: "Accuracy" }),
        /* @__PURE__ */ jsx(Line, { type: "monotone", dataKey: "conf", stroke: "oklch(0.78 0.15 220)", strokeWidth: 3, dot: {
          r: 3
        }, name: "Confidence" })
      ] }) }) })
    ] })
  ] });
}
export {
  AnalyticsPage as component
};
