import { Link, useRouterState } from "@tanstack/react-router";
import { Activity, Home, BarChart3, Brain, HeartPulse } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "Prediction", url: "/predict", icon: Activity },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "AI Insights", url: "/insights", icon: Brain },
];

export function AppSidebar() {
  const currentPath = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col p-4 gap-2">
      <div className="glass-strong rounded-3xl p-5 flex flex-col gap-6 h-full">
        <Link to="/" className="flex items-center gap-3 px-2">
          <div className="relative w-10 h-10 rounded-2xl gradient-aurora-bg animate-aurora flex items-center justify-center shadow-glow">
            <HeartPulse className="w-5 h-5 text-white animate-heartbeat" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-bold text-base tracking-tight">NeuroDiab</span>
            <span className="text-[10px] text-muted-foreground tracking-widest uppercase">AI Health</span>
          </div>
        </Link>

        <nav className="flex flex-col gap-1">
          {items.map((item, i) => {
            const active = currentPath === item.url;
            return (
              <motion.div
                key={item.url}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  to={item.url}
                  className={cn(
                    "group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                    active
                      ? "text-primary-foreground gradient-primary-bg shadow-glow"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/60",
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.title}</span>
                </Link>
              </motion.div>
            );
          })}
        </nav>

        <div className="mt-auto glass rounded-2xl p-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[color:var(--success)] animate-pulse" />
            <span className="font-semibold text-foreground">Model online</span>
          </div>
          <p>NeuroDiab v3.2 · 94.7% accuracy</p>
        </div>
      </div>
    </aside>
  );
}

export function MobileNav() {
  const currentPath = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="md:hidden fixed bottom-4 left-4 right-4 z-30 glass-strong rounded-2xl px-2 py-2 flex justify-around">
      {items.map((item) => {
        const active = currentPath === item.url;
        return (
          <Link
            key={item.url}
            to={item.url}
            className={cn(
              "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl text-[10px] font-medium transition-all",
              active ? "text-primary-foreground gradient-primary-bg" : "text-muted-foreground",
            )}
          >
            <item.icon className="w-4 h-4" />
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}