import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Clock, History as HistoryIcon } from "lucide-react";
import type { CommandLog } from "@/types/assistant";
import { formatRelative } from "@/utils/format";
import { cn } from "@/lib/utils";

export function CommandHistoryPanel({ history }: { history: CommandLog[] }) {
  return (
    <div className="glass-panel flex h-full min-h-[300px] flex-col">
      <div className="flex items-center justify-between border-b border-border/40 px-5 py-3.5">
        <div className="flex items-center gap-2">
          <HistoryIcon className="h-4 w-4 text-primary-glow" />
          <h3 className="font-display text-sm font-semibold tracking-wide">Activity Log</h3>
        </div>
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
          {history.length} entries
        </span>
      </div>

      <ul className="flex-1 space-y-2 overflow-y-auto px-3 py-3">
        {history.length === 0 ? (
          <li className="flex h-full items-center justify-center p-8 text-center text-sm text-muted-foreground">
            No commands yet. Ask Natasha something.
          </li>
        ) : (
          history.map((log, i) => <Row key={log.id} log={log} index={i} />)
        )}
      </ul>
    </div>
  );
}

function Row({ log, index }: { log: CommandLog; index: number }) {
  const Icon =
    log.status === "success" ? CheckCircle2 : log.status === "error" ? XCircle : Clock;
  const tone =
    log.status === "success"
      ? "text-success"
      : log.status === "error"
      ? "text-destructive"
      : "text-warning";

  return (
    <motion.li
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: Math.min(index * 0.03, 0.3) }}
      className="group rounded-xl border border-border/25 bg-card/40 p-3 transition-all duration-200 hover:border-primary/50 hover:bg-primary/5 active:border-primary"
    >
      <div className="flex items-start gap-3">
        <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", tone)} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-sm font-medium text-foreground">{log.command}</p>
            {log.category && (
              <span className="rounded-full border border-border/60 bg-secondary/50 px-2 py-0.5 text-[10px] text-muted-foreground">
                {log.category}
              </span>
            )}
          </div>
          <p className="mt-0.5 truncate text-xs text-muted-foreground">{log.response}</p>
          <p className="mt-1 text-[10px] text-muted-foreground/70">{formatRelative(log.timestamp)}</p>
        </div>
      </div>
    </motion.li>
  );
}
