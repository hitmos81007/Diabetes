import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Activity, Brain, ShieldCheck, Sparkles, HeartPulse, Stethoscope } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NeuroDiab — AI Diabetes Prediction" },
      { name: "description", content: "Predict diabetes risk in seconds with our advanced AI medical platform." },
    ],
  }),
  component: Home,
});

const stats = [
  { label: "Model Accuracy", value: "94.7%", icon: Brain },
  { label: "Predictions Run", value: "1.2M+", icon: Activity },
  { label: "Clinics Trusted", value: "320+", icon: ShieldCheck },
];

function Home() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="relative glass-strong rounded-[2.5rem] p-8 md:p-14 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full gradient-aurora-bg animate-aurora blur-3xl opacity-40" />
        <div className="absolute -bottom-24 -left-10 w-72 h-72 rounded-full bg-[color:var(--accent-cyan)] blur-3xl opacity-30" />

        <div className="relative grid md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full text-xs font-medium mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              Next-generation medical AI
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-[Space_Grotesk] text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight"
            >
              Predict diabetes risk with{" "}
              <span className="gradient-text">neural precision</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-5 text-lg text-muted-foreground max-w-lg"
            >
              NeuroDiab combines decades of clinical data with deep learning to
              deliver instant, interpretable diabetes risk assessments.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link
                to="/predict"
                className="group relative inline-flex items-center gap-2 gradient-primary-bg text-primary-foreground px-6 py-3.5 rounded-2xl font-semibold shadow-glow hover:scale-[1.02] transition-transform"
              >
                Start prediction
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/analytics"
                className="inline-flex items-center gap-2 glass px-6 py-3.5 rounded-2xl font-semibold hover:glow-ring transition-all"
              >
                View analytics
              </Link>
            </motion.div>
          </div>

          {/* Holographic medical card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="relative flex justify-center"
          >
            <div className="relative w-72 h-72 md:w-80 md:h-80">
              <div className="absolute inset-0 rounded-full gradient-aurora-bg animate-aurora opacity-30 blur-2xl" />
              <div className="absolute inset-6 rounded-full glass-strong flex items-center justify-center animate-float-slow">
                <HeartPulse className="w-24 h-24 text-primary animate-heartbeat" strokeWidth={1.2} />
              </div>
              {[Stethoscope, Brain, Activity].map((Icon, i) => (
                <motion.div
                  key={i}
                  animate={{
                    rotate: 360,
                  }}
                  transition={{ duration: 18 + i * 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                  style={{ transformOrigin: "50% 50%" }}
                >
                  <div
                    className="absolute glass rounded-2xl p-3 shadow-glow"
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: `translate(-50%, -50%) translateY(-${130 + i * 8}px)`,
                    }}
                  >
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid sm:grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-2xl p-6 hover:glow-ring transition-all hover:-translate-y-1"
          >
            <s.icon className="w-7 h-7 text-primary mb-3" />
            <div className="text-3xl font-bold gradient-text">{s.value}</div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
              {s.label}
            </div>
          </motion.div>
        ))}
      </section>

      {/* Feature grid */}
      <section>
        <h2 className="font-[Space_Grotesk] text-3xl font-bold mb-2">A complete clinical AI suite</h2>
        <p className="text-muted-foreground mb-8">Everything you need to translate patient data into action.</p>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { t: "Real-time prediction", d: "Sub-second inference on 8 clinical signals.", i: Activity },
            { t: "Explainable insights", d: "Visualize which features drove each prediction.", i: Brain },
            { t: "HIPAA-grade security", d: "End-to-end encryption with audit trails.", i: ShieldCheck },
          ].map((f, i) => (
            <motion.div
              key={f.t}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 group hover:glow-ring transition-all"
            >
              <div className="w-11 h-11 rounded-xl gradient-primary-bg flex items-center justify-center mb-4 group-hover:animate-pulse-glow">
                <f.i className="w-5 h-5 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-lg mb-1">{f.t}</h3>
              <p className="text-sm text-muted-foreground">{f.d}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
