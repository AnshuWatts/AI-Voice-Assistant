import { useMemo } from "react";
import { motion } from "framer-motion";
import { VoiceInteractionPanel } from "@/components/VoiceInteractionPanel";
import { SystemStatusPanel } from "@/components/SystemStatusPanel";
import { useAssistantContext } from "@/context/AssistantContext";
import type { ChatMessage } from "@/types/assistant";

interface Exchange {
  id: string;
  user: ChatMessage;
  assistant?: ChatMessage;
}

export default function Dashboard() {
  const { status, messages, startListening } = useAssistantContext();

  const lastUser = useMemo(
    () => [...messages].reverse().find((m) => m.role === "user")?.text,
    [messages]
  );
  const lastAssistant = useMemo(
    () => [...messages].reverse().find((m) => m.role === "assistant" && !m.pending)?.text,
    [messages]
  );

  const recentExchanges = useMemo<Exchange[]>(() => {
    const exchanges: Exchange[] = [];
    for (let i = 0; i < messages.length; i++) {
      const m = messages[i];
      if (m.role !== "user") continue;
      const next = messages[i + 1];
      const assistant =
        next && next.role === "assistant" && !next.pending ? next : undefined;
      exchanges.push({ id: m.id, user: m, assistant });
    }
    return exchanges.slice(-3).reverse();
  }, [messages]);

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
      <section className="lg:col-span-8 space-y-5">
        <VoiceInteractionPanel
          state={status.state}
          transcript={lastUser}
          response={lastAssistant}
          onToggle={startListening}
        />

        <div className="glass-panel p-5">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              Recent Exchanges
            </p>
            <span className="text-[11px] text-muted-foreground/70">
              Showing last {recentExchanges.length}
            </span>
          </div>

          {recentExchanges.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No commands yet. Tap the orb or type a command to get started.
            </p>
          ) : (
            <ul className="space-y-3">
              {recentExchanges.map((ex, idx) => (
                <motion.li
                  key={ex.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="rounded-xl border border-border/25 bg-card/40 p-3 transition-all duration-200 hover:border-primary/40"
                >
                  <p className="font-mono text-sm text-muted-foreground">
                    <span className="mr-2 text-[10px] uppercase tracking-[0.2em] text-primary/70">
                      You
                    </span>
                    "{ex.user.text}"
                  </p>
                  <p className="mt-1.5 text-sm text-foreground">
                    <span className="mr-2 text-[10px] uppercase tracking-[0.2em] text-primary-glow/80">
                      Natasha
                    </span>
                    {ex.assistant ? (
                      ex.assistant.text
                    ) : (
                      <span className="italic text-muted-foreground">…</span>
                    )}
                  </p>
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </section>
      <aside className="lg:col-span-4">
        <SystemStatusPanel status={status} />
      </aside>
    </div>
  );
}
