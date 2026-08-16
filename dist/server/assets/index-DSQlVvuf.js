import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, HeartPulse, Stethoscope, Brain, Activity, ShieldCheck } from "lucide-react";
const stats = [{
  label: "Model Accuracy",
  value: "94.7%",
  icon: Brain
}, {
  label: "Predictions Run",
  value: "1.2M+",
  icon: Activity
}, {
  label: "Clinics Trusted",
  value: "320+",
  icon: ShieldCheck
}];
function Home() {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-16", children: [
    /* @__PURE__ */ jsxs("section", { className: "relative glass-strong rounded-[2.5rem] p-8 md:p-14 overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute -top-20 -right-20 w-80 h-80 rounded-full gradient-aurora-bg animate-aurora blur-3xl opacity-40" }),
      /* @__PURE__ */ jsx("div", { className: "absolute -bottom-24 -left-10 w-72 h-72 rounded-full bg-[color:var(--accent-cyan)] blur-3xl opacity-30" }),
      /* @__PURE__ */ jsxs("div", { className: "relative grid md:grid-cols-2 gap-10 items-center", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs(motion.div, { initial: {
            opacity: 0,
            y: 10
          }, animate: {
            opacity: 1,
            y: 0
          }, className: "inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full text-xs font-medium mb-6", children: [
            /* @__PURE__ */ jsx(Sparkles, { className: "w-3.5 h-3.5 text-primary" }),
            "Next-generation medical AI"
          ] }),
          /* @__PURE__ */ jsxs(motion.h1, { initial: {
            opacity: 0,
            y: 20
          }, animate: {
            opacity: 1,
            y: 0
          }, transition: {
            delay: 0.1
          }, className: "font-[Space_Grotesk] text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight", children: [
            "Predict diabetes risk with",
            " ",
            /* @__PURE__ */ jsx("span", { className: "gradient-text", children: "neural precision" })
          ] }),
          /* @__PURE__ */ jsx(motion.p, { initial: {
            opacity: 0,
            y: 20
          }, animate: {
            opacity: 1,
            y: 0
          }, transition: {
            delay: 0.2
          }, className: "mt-5 text-lg text-muted-foreground max-w-lg", children: "NeuroDiab combines decades of clinical data with deep learning to deliver instant, interpretable diabetes risk assessments." }),
          /* @__PURE__ */ jsxs(motion.div, { initial: {
            opacity: 0,
            y: 20
          }, animate: {
            opacity: 1,
            y: 0
          }, transition: {
            delay: 0.3
          }, className: "mt-8 flex flex-wrap gap-3", children: [
            /* @__PURE__ */ jsxs(Link, { to: "/predict", className: "group relative inline-flex items-center gap-2 gradient-primary-bg text-primary-foreground px-6 py-3.5 rounded-2xl font-semibold shadow-glow hover:scale-[1.02] transition-transform", children: [
              "Start prediction",
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 group-hover:translate-x-1 transition-transform" })
            ] }),
            /* @__PURE__ */ jsx(Link, { to: "/analytics", className: "inline-flex items-center gap-2 glass px-6 py-3.5 rounded-2xl font-semibold hover:glow-ring transition-all", children: "View analytics" })
          ] })
        ] }),
        /* @__PURE__ */ jsx(motion.div, { initial: {
          opacity: 0,
          scale: 0.9
        }, animate: {
          opacity: 1,
          scale: 1
        }, transition: {
          delay: 0.3
        }, className: "relative flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "relative w-72 h-72 md:w-80 md:h-80", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-full gradient-aurora-bg animate-aurora opacity-30 blur-2xl" }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-6 rounded-full glass-strong flex items-center justify-center animate-float-slow", children: /* @__PURE__ */ jsx(HeartPulse, { className: "w-24 h-24 text-primary animate-heartbeat", strokeWidth: 1.2 }) }),
          [Stethoscope, Brain, Activity].map((Icon, i) => /* @__PURE__ */ jsx(motion.div, { animate: {
            rotate: 360
          }, transition: {
            duration: 18 + i * 4,
            repeat: Infinity,
            ease: "linear"
          }, className: "absolute inset-0", style: {
            transformOrigin: "50% 50%"
          }, children: /* @__PURE__ */ jsx("div", { className: "absolute glass rounded-2xl p-3 shadow-glow", style: {
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) translateY(-${130 + i * 8}px)`
          }, children: /* @__PURE__ */ jsx(Icon, { className: "w-5 h-5 text-primary" }) }) }, i))
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "grid sm:grid-cols-3 gap-4", children: stats.map((s, i) => /* @__PURE__ */ jsxs(motion.div, { initial: {
      opacity: 0,
      y: 20
    }, whileInView: {
      opacity: 1,
      y: 0
    }, viewport: {
      once: true
    }, transition: {
      delay: i * 0.1
    }, className: "glass rounded-2xl p-6 hover:glow-ring transition-all hover:-translate-y-1", children: [
      /* @__PURE__ */ jsx(s.icon, { className: "w-7 h-7 text-primary mb-3" }),
      /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold gradient-text", children: s.value }),
      /* @__PURE__ */ jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground mt-1", children: s.label })
    ] }, s.label)) }),
    /* @__PURE__ */ jsxs("section", { children: [
      /* @__PURE__ */ jsx("h2", { className: "font-[Space_Grotesk] text-3xl font-bold mb-2", children: "A complete clinical AI suite" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-8", children: "Everything you need to translate patient data into action." }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-4", children: [{
        t: "Real-time prediction",
        d: "Sub-second inference on 8 clinical signals.",
        i: Activity
      }, {
        t: "Explainable insights",
        d: "Visualize which features drove each prediction.",
        i: Brain
      }, {
        t: "HIPAA-grade security",
        d: "End-to-end encryption with audit trails.",
        i: ShieldCheck
      }].map((f, i) => /* @__PURE__ */ jsxs(motion.div, { initial: {
        opacity: 0,
        y: 20
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true
      }, transition: {
        delay: i * 0.1
      }, className: "glass rounded-2xl p-6 group hover:glow-ring transition-all", children: [
        /* @__PURE__ */ jsx("div", { className: "w-11 h-11 rounded-xl gradient-primary-bg flex items-center justify-center mb-4 group-hover:animate-pulse-glow", children: /* @__PURE__ */ jsx(f.i, { className: "w-5 h-5 text-primary-foreground" }) }),
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg mb-1", children: f.t }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: f.d })
      ] }, f.t)) })
    ] })
  ] });
}
export {
  Home as component
};
