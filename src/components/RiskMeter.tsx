import { motion } from "framer-motion";

export function RiskMeter({ value }: { value: number }) {
  const angle = -90 + value * 180;
  return (
    <div className="w-full max-w-sm">
      <svg viewBox="0 0 200 120" className="w-full">
        <defs>
          <linearGradient id="meter-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="oklch(0.72 0.17 155)" />
            <stop offset="50%" stopColor="oklch(0.82 0.17 80)" />
            <stop offset="100%" stopColor="oklch(0.62 0.24 25)" />
          </linearGradient>
        </defs>
        <path
          d="M20 100 A80 80 0 0 1 180 100"
          stroke="url(#meter-grad)"
          strokeWidth="14"
          fill="none"
          strokeLinecap="round"
        />
        <motion.line
          x1="100"
          y1="100"
          x2="100"
          y2="30"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          style={{ transformOrigin: "100px 100px" }}
          initial={{ rotate: -90 }}
          animate={{ rotate: angle }}
          transition={{ type: "spring", stiffness: 80, damping: 14 }}
        />
        <circle cx="100" cy="100" r="8" className="fill-primary" />
      </svg>
      <div className="flex justify-between text-[10px] uppercase tracking-widest text-muted-foreground px-2 -mt-2">
        <span>Low</span>
        <span>Moderate</span>
        <span>High</span>
      </div>
    </div>
  );
}