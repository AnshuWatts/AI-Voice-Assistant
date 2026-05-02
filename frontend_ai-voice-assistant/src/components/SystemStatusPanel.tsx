import { motion } from "framer-motion";
import { Mic, MicOff, Volume2, VolumeX, Radio, Activity } from "lucide-react";
import type { AssistantStatus } from "@/types/assistant";
import { stateLabels, connectionLabels, stateColors } from "@/utils/format";

export function SystemStatusPanel({ status }: { status: AssistantStatus }) {
  const rows: Array<{ label: string; value: string; icon: React.ReactNode; tone?: string }> = [
    {
      label: "Assistant State",
      value: stateLabels[status.state],
      icon: <Activity className="h-3.5 w-3.5" />,
      tone: stateColors[status.state],
    },
    {
      label: "Backend",
      value: connectionLabels[status.connection],
      icon: <Radio className="h-3.5 w-3.5" />,
      tone:
        status.connection === "connected"
          ? "text-success"
          : status.connection === "mock"
          ? "text-warning"
          : "text-destructive",
    },
    {
      label: "Microphone",
      value: status.micAvailable ? "Available" : "Unavailable",
      icon: status.micAvailable ? <Mic className="h-3.5 w-3.5" /> : <MicOff className="h-3.5 w-3.5" />,
      tone: status.micAvailable ? "text-success" : "text-destructive",
    },
    {
      label: "Voice Output",
      value: status.voiceOutputEnabled ? "Enabled" : "Muted",
      icon: status.voiceOutputEnabled ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />,
      tone: status.voiceOutputEnabled ? "text-success" : "text-muted-foreground",
    },
  ];

  return (
    <div className="glass-panel flex flex-col p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-sm font-semibold tracking-wide">System Status</h3>
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Live</span>
      </div>
      <ul className="space-y-3">
        {rows.map((r, i) => (
          <motion.li
            key={r.label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center justify-between rounded-xl border border-border/25 bg-card/40 px-3 py-2.5 transition-all duration-200 hover:border-primary/50 hover:bg-primary/5"
          >
            <span className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className={r.tone}>{r.icon}</span>
              {r.label}
            </span>
            <span className={`text-xs font-medium ${r.tone ?? ""}`}>{r.value}</span>
          </motion.li>
        ))}
      </ul>

    </div>
  );
}
