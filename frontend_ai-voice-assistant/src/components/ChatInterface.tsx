import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send, Sparkles } from "lucide-react";
import type { ChatMessage } from "@/types/assistant";
import { formatTime } from "@/utils/format";
import { cn } from "@/lib/utils";

interface Props {
  messages: ChatMessage[];
  onSend: (text: string) => void;
}

export function ChatInterface({ messages, onSend }: Props) {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <div className="glass-panel flex h-full min-h-[420px] flex-col">
      <div className="flex items-center justify-between border-b border-border/30 px-5 py-3.5">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary-glow" />
          <h3 className="font-display text-sm font-semibold tracking-wide">Conversation</h3>
        </div>
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
          {messages.length} msg
        </span>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <Bubble key={m.id} message={m} />
          ))}
        </AnimatePresence>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t border-border/30 p-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Send a command to Natasha…"
          className="flex-1 rounded-xl border border-border/30 bg-input/40 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors hover:border-primary/40 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow-soft transition-all hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}

function Bubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm",
          isUser
            ? "rounded-br-sm bg-gradient-primary text-primary-foreground"
            : "rounded-bl-sm border border-border/30 bg-card/60 text-foreground backdrop-blur"
        )}
      >
        {message.pending ? (
          <span className="inline-flex items-center gap-1 text-muted-foreground">
            <Pulse /> <Pulse delay={0.15} /> <Pulse delay={0.3} />
          </span>
        ) : (
          <>
            <p className="whitespace-pre-wrap">{message.text}</p>
            <p className={cn("mt-1 text-[10px]", isUser ? "text-primary-foreground/60" : "text-muted-foreground")}>
              {formatTime(message.timestamp)}
            </p>
          </>
        )}
      </div>
    </motion.div>
  );
}

function Pulse({ delay = 0 }: { delay?: number }) {
  return (
    <motion.span
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ repeat: Infinity, duration: 1, delay }}
      className="inline-block h-1.5 w-1.5 rounded-full bg-current"
    />
  );
}
