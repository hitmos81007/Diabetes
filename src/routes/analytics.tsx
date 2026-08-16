import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Brain, Target, TrendingUp, Zap } from "lucide-react";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — NeuroDiab" },
      { name: "description", content: "Model performance and prediction analytics." },
    ],
  }),
  component: AnalyticsPage,
});

const featureImportance = [
  { name: "Glucose", value: 38 },
  { name: "BMI", value: 22 },
  { name: "Age", value: 14 },
  { name: "Insulin", value: 11 },
  { name: "Pedigree", value: 8 },
  { name: "BP", value: 7 },
];

const distribution = [
  { name: "Non-Diabetic", value: 612 },
  { name: "Diabetic", value: 268 },
];

const confidence = Array.from({ length: 12 }, (_, i) => ({
  month: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"][i],
  acc: 0.88 + Math.sin(i / 2) * 0.03 + i * 0.005,
  conf: 0.82 + Math.cos(i / 1.7) * 0.04 + i * 0.006,
}));

const COLORS = [
  "oklch(0.72 0.2 295)",
  "oklch(0.68 0.18 250)",
  "oklch(0.82 0.14 220)",
  "oklch(0.75 0.2 320)",
  "oklch(0.72 0.17 155)",
  "oklch(0.82 0.17 80)",
];

const stats = [
  { label: "Accuracy", value: "94.7%", icon: Target },
  { label: "Precision", value: "92.1%", icon: Zap },
  { label: "Recall", value: "89.4%", icon: TrendingUp },
  { label: "F1 Score", value: "90.7%", icon: Brain },
];

function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-[Space_Grotesk] text-3xl md:text-4xl font-bold tracking-tight">
          Analytics
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Live performance metrics from the NeuroDiab inference engine.
        </p>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass rounded-2xl p-5 hover:glow-ring transition-all"
          >
            <s.icon className="w-6 h-6 text-primary mb-2" />
            <div className="text-2xl font-bold gradient-text tabular-nums">{s.value}</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong rounded-3xl p-6 lg:col-span-2"
        >
          <h3 className="font-semibold mb-1">Feature importance</h3>
          <p className="text-xs text-muted-foreground mb-4">What drives the model's decisions</p>
          <div className="h-72">
            <ResponsiveContainer>
              <BarChart data={featureImportance}>
                <defs>
                  <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.72 0.2 295)" />
                    <stop offset="100%" stopColor="oklch(0.68 0.18 250)" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.7 0.04 270 / 0.2)" />
                <XAxis dataKey="name" stroke="currentColor" fontSize={12} />
                <YAxis stroke="currentColor" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 12,
                  }}
                />
                <Bar dataKey="value" fill="url(#barGrad)" radius={[12, 12, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-strong rounded-3xl p-6"
        >
          <h3 className="font-semibold mb-1">Prediction distribution</h3>
          <p className="text-xs text-muted-foreground mb-4">Last 30 days</p>
          <div className="h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={distribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {distribution.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 12,
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="glass-strong rounded-3xl p-6"
      >
        <h3 className="font-semibold mb-1">Confidence trend</h3>
        <p className="text-xs text-muted-foreground mb-4">Rolling 12-month accuracy vs confidence</p>
        <div className="h-72">
          <ResponsiveContainer>
            <LineChart data={confidence}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.7 0.04 270 / 0.2)" />
              <XAxis dataKey="month" stroke="currentColor" fontSize={12} />
              <YAxis stroke="currentColor" fontSize={12} domain={[0.7, 1]} />
              <Tooltip
                contentStyle={{
                  background: "var(--color-popover)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 12,
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="acc"
                stroke="oklch(0.72 0.2 295)"
                strokeWidth={3}
                dot={{ r: 3 }}
                name="Accuracy"
              />
              <Line
                type="monotone"
                dataKey="conf"
                stroke="oklch(0.78 0.15 220)"
                strokeWidth={3}
                dot={{ r: 3 }}
                name="Confidence"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}