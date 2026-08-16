import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useRouterState, Link, createRootRouteWithContext, useRouter, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { HeartPulse, Home, Activity, BarChart3, Brain, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useRef, useMemo, useState, useEffect } from "react";
import { Toaster as Toaster$1 } from "sonner";
const appCss = "/assets/styles-CNE5GH0R.css";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "Prediction", url: "/predict", icon: Activity },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "AI Insights", url: "/insights", icon: Brain }
];
function AppSidebar() {
  const currentPath = useRouterState({ select: (s) => s.location.pathname });
  return /* @__PURE__ */ jsx("aside", { className: "hidden md:flex w-64 shrink-0 flex-col p-4 gap-2", children: /* @__PURE__ */ jsxs("div", { className: "glass-strong rounded-3xl p-5 flex flex-col gap-6 h-full", children: [
    /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-3 px-2", children: [
      /* @__PURE__ */ jsx("div", { className: "relative w-10 h-10 rounded-2xl gradient-aurora-bg animate-aurora flex items-center justify-center shadow-glow", children: /* @__PURE__ */ jsx(HeartPulse, { className: "w-5 h-5 text-white animate-heartbeat" }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col leading-tight", children: [
        /* @__PURE__ */ jsx("span", { className: "font-bold text-base tracking-tight", children: "NeuroDiab" }),
        /* @__PURE__ */ jsx("span", { className: "text-[10px] text-muted-foreground tracking-widest uppercase", children: "AI Health" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("nav", { className: "flex flex-col gap-1", children: items.map((item, i) => {
      const active = currentPath === item.url;
      return /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, x: -10 },
          animate: { opacity: 1, x: 0 },
          transition: { delay: i * 0.06 },
          children: /* @__PURE__ */ jsxs(
            Link,
            {
              to: item.url,
              className: cn(
                "group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                active ? "text-primary-foreground gradient-primary-bg shadow-glow" : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
              ),
              children: [
                /* @__PURE__ */ jsx(item.icon, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsx("span", { children: item.title })
              ]
            }
          )
        },
        item.url
      );
    }) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-auto glass rounded-2xl p-4 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
        /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-[color:var(--success)] animate-pulse" }),
        /* @__PURE__ */ jsx("span", { className: "font-semibold text-foreground", children: "Model online" })
      ] }),
      /* @__PURE__ */ jsx("p", { children: "NeuroDiab v3.2 · 94.7% accuracy" })
    ] })
  ] }) });
}
function MobileNav() {
  const currentPath = useRouterState({ select: (s) => s.location.pathname });
  return /* @__PURE__ */ jsx("nav", { className: "md:hidden fixed bottom-4 left-4 right-4 z-30 glass-strong rounded-2xl px-2 py-2 flex justify-around", children: items.map((item) => {
    const active = currentPath === item.url;
    return /* @__PURE__ */ jsxs(
      Link,
      {
        to: item.url,
        className: cn(
          "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl text-[10px] font-medium transition-all",
          active ? "text-primary-foreground gradient-primary-bg" : "text-muted-foreground"
        ),
        children: [
          /* @__PURE__ */ jsx(item.icon, { className: "w-4 h-4" }),
          item.title
        ]
      },
      item.url
    );
  }) });
}
function Particles() {
  const ref = useRef(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(1500 * 3);
    for (let i = 0; i < arr.length; i++) arr[i] = (Math.random() - 0.5) * 12;
    return arr;
  }, []);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.02;
    ref.current.rotation.y += delta * 0.03;
  });
  return /* @__PURE__ */ jsx(Points, { ref, positions, stride: 3, frustumCulled: false, children: /* @__PURE__ */ jsx(
    PointMaterial,
    {
      transparent: true,
      color: "#a78bfa",
      size: 0.025,
      sizeAttenuation: true,
      depthWrite: false,
      opacity: 0.85
    }
  ) });
}
function FloatingOrb({
  position,
  color,
  speed = 1
}) {
  const ref = useRef(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed;
    ref.current.position.y = position[1] + Math.sin(t) * 0.4;
    ref.current.rotation.x = t * 0.3;
    ref.current.rotation.y = t * 0.5;
  });
  return /* @__PURE__ */ jsxs("mesh", { ref, position, children: [
    /* @__PURE__ */ jsx("icosahedronGeometry", { args: [0.6, 1] }),
    /* @__PURE__ */ jsx(
      "meshStandardMaterial",
      {
        color,
        emissive: color,
        emissiveIntensity: 0.6,
        roughness: 0.2,
        metalness: 0.8,
        wireframe: true
      }
    )
  ] });
}
function ParticleBackground() {
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 -z-10 pointer-events-none", children: /* @__PURE__ */ jsxs(Canvas, { camera: { position: [0, 0, 5], fov: 75 }, dpr: [1, 1.5], children: [
    /* @__PURE__ */ jsx("ambientLight", { intensity: 0.4 }),
    /* @__PURE__ */ jsx("pointLight", { position: [10, 10, 10], intensity: 1, color: "#a78bfa" }),
    /* @__PURE__ */ jsx("pointLight", { position: [-10, -10, 5], intensity: 0.8, color: "#60a5fa" }),
    /* @__PURE__ */ jsx(Particles, {}),
    /* @__PURE__ */ jsx(FloatingOrb, { position: [-3, 1, -2], color: "#a78bfa", speed: 0.6 }),
    /* @__PURE__ */ jsx(FloatingOrb, { position: [3, -1, -3], color: "#60a5fa", speed: 0.8 }),
    /* @__PURE__ */ jsx(FloatingOrb, { position: [0, 2, -4], color: "#22d3ee", speed: 0.5 })
  ] }) });
}
function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const isDark = stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };
  return /* @__PURE__ */ jsx(
    motion.button,
    {
      whileHover: { scale: 1.05 },
      whileTap: { scale: 0.95 },
      onClick: toggle,
      className: "glass rounded-xl p-2.5 hover:glow-ring transition-all",
      "aria-label": "Toggle theme",
      children: dark ? /* @__PURE__ */ jsx(Sun, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(Moon, { className: "w-4 h-4" })
    }
  );
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router = useRouter();
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$4 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "NeuroDiab — AI Diabetes Prediction Platform" },
      { name: "description", content: "Futuristic AI-powered diabetes risk prediction with real-time analytics and personalized insights." },
      { property: "og:title", content: "NeuroDiab — AI Diabetes Prediction" },
      { property: "og:description", content: "Predict diabetes risk with a state-of-the-art neural model. Beautiful, real-time medical analytics." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap"
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$4.useRouteContext();
  return /* @__PURE__ */ jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsx(ParticleBackground, {}),
    /* @__PURE__ */ jsxs("div", { className: "relative flex min-h-screen w-full", children: [
      /* @__PURE__ */ jsx(AppSidebar, {}),
      /* @__PURE__ */ jsxs("main", { className: "flex-1 min-w-0 px-4 md:px-6 py-4 md:py-6 pb-24 md:pb-6", children: [
        /* @__PURE__ */ jsx("div", { className: "flex justify-end mb-4", children: /* @__PURE__ */ jsx(ThemeToggle, {}) }),
        /* @__PURE__ */ jsx(Outlet, {})
      ] }),
      /* @__PURE__ */ jsx(MobileNav, {})
    ] }),
    /* @__PURE__ */ jsx(Toaster, { position: "top-right", richColors: true })
  ] });
}
const $$splitComponentImporter$3 = () => import("./index-DSQlVvuf.js");
const Route$3 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "NeuroDiab — AI Diabetes Prediction"
    }, {
      name: "description",
      content: "Predict diabetes risk in seconds with our advanced AI medical platform."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./analytics-BqHR9QEs.js");
const Route$2 = createFileRoute("/analytics")({
  head: () => ({
    meta: [{
      title: "Analytics — NeuroDiab"
    }, {
      name: "description",
      content: "Model performance and prediction analytics."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./insights-D-9zmP1M.js");
const Route$1 = createFileRoute("/insights")({
  head: () => ({
    meta: [{
      title: "AI Insights — NeuroDiab"
    }, {
      name: "description",
      content: "Personalized AI-generated medical recommendations."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./predict-Bhe1xsKi.js");
const Route = createFileRoute("/predict")({
  head: () => ({
    meta: [{
      title: "Prediction Dashboard — NeuroDiab"
    }, {
      name: "description",
      content: "Run an AI-powered diabetes risk prediction."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const IndexRoute = Route$3.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$4
});
const AnalyticsRoute = Route$2.update({
  id: "/analytics",
  path: "/analytics",
  getParentRoute: () => Route$4
});
const InsightsRoute = Route$1.update({
  id: "/insights",
  path: "/insights",
  getParentRoute: () => Route$4
});
const PredictRoute = Route.update({
  id: "/predict",
  path: "/predict",
  getParentRoute: () => Route$4
});
const rootRouteChildren = {
  IndexRoute,
  AnalyticsRoute,
  InsightsRoute,
  PredictRoute
};
const routeTree = Route$4._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router;
};
export {
  getRouter
};
