import { motion } from "framer-motion";

export function CircularProgress({
  value,
  size = 200,
  label,
  sublabel,
  danger,
}: {
  value: number;
  size?: number;
  label?: string;
  sublabel?: string;
  danger?: boolean;
}) {
  const stroke = 14;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - value);
  const gradId = danger ? "grad-danger" : "grad-ok";

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id="grad-ok" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.78 0.15 220)" />
            <stop offset="100%" stopColor="oklch(0.72 0.17 155)" />
          </linearGradient>
          <linearGradient id="grad-danger" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.72 0.2 295)" />
            <stop offset="100%" stopColor="oklch(0.62 0.24 25)" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="color-mix(in oklab, var(--color-border) 90%, transparent)"
          strokeWidth={stroke}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.6, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-4xl font-bold gradient-text tabular-nums"
        >
          {Math.round(value * 100)}%
        </motion.span>
        {label && <span className="text-xs font-semibold mt-1">{label}</span>}
        {sublabel && (
          <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
}