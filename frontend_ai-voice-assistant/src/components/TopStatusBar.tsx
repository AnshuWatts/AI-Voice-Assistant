import { motion } from "framer-motion";
import { stateColors, stateLabels, connectionLabels } from "@/utils/format";
import type { AssistantStatus } from "@/types/assistant";
import { Activity, Wifi, WifiOff, Cpu } from "lucide-react";

interface Props {
  status: AssistantStatus;
}

export function TopStatusBar({ status }: Props) {
  const live = status.connection === "connected";
  const ConnIcon = status.connection === "disconnected" ? WifiOff : Wifi;

  return (
    <header className="flex items-center justify-between gap-4 border-b border-border/40 bg-background/40 px-6 py-3 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-glow-soft"
        >
          <Cpu className="h-4 w-4 text-primary-foreground" />
        </motion.div>
        <div>
          <p className="font-display text-sm font-semibold leading-tight tracking-wide">
            NATASHA <span className="text-muted-foreground">/ v2.6</span>
          </p>
          <p className="text-[11px] text-muted-foreground">Personal AI assistant</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <StatusPill
          icon={<Activity className="h-3.5 w-3.5" />}
          label={stateLabels[status.state]}
          tone={stateColors[status.state]}
          pulse={["listening", "recognizing", "executing", "speaking"].includes(status.state)}
        />
        <StatusPill
          icon={<ConnIcon className="h-3.5 w-3.5" />}
          label={connectionLabels[status.connection]}
          tone={live ? "text-success" : status.connection === "mock" ? "text-warning" : "text-destructive"}
        />
      </div>
    </header>
  );
}

function StatusPill({
  icon,
  label,
  tone,
  pulse,
}: {
  icon: React.ReactNode;
  label: string;
  tone: string;
  pulse?: boolean;
}) {
  return (
    <div className="relative flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3 py-1.5 text-xs backdrop-blur">
      <span className={`relative flex items-center ${tone}`}>
        {icon}
        {pulse && (
          <span className="absolute inset-0 -m-1 animate-pulse-ring rounded-full bg-current opacity-30" />
        )}
      </span>
      <span className="font-medium tracking-wide text-foreground/90">{label}</span>
    </div>
  );
}
