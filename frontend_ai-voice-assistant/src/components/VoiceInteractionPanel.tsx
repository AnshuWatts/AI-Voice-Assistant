import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Loader2, Volume2 } from "lucide-react";
import type { AssistantState } from "@/types/assistant";
import { cn } from "@/lib/utils";

interface Props {
  state: AssistantState;
  transcript?: string;
  response?: string;
  onToggle: () => void;
}

export function VoiceInteractionPanel({ state, transcript, response, onToggle }: Props) {
  const isListening = state === "listening";
  const isProcessing = state === "recognizing" || state === "executing";
  const isSpeaking = state === "speaking";
  const isActive = isListening || isProcessing || isSpeaking;

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label="Activate voice command"
      className={cn(
        "glass-panel group relative flex w-full flex-col items-center overflow-hidden p-8 text-left md:p-10",
        "cursor-pointer transition-all duration-500",
        "hover:border-primary/60 hover:shadow-glow-primary",
        isActive && "border-primary/60 shadow-glow-primary"
      )}
    >
      <div className="pointer-events-none absolute inset-0 grid-fade opacity-40 transition-opacity duration-500 group-hover:opacity-70" />
      <div className="pointer-events-none absolute inset-x-0 -top-24 h-64 bg-gradient-glow opacity-60 transition-opacity duration-500 group-hover:opacity-90" />
      {/* Scanning line on hover */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100"
        animate={{ y: isActive ? ["0%", "1800%"] : 0 }}
        transition={{ duration: 3, repeat: isActive ? Infinity : 0, ease: "linear" }}
      />

      <div className="relative z-10 flex w-full flex-col items-center gap-6">
        <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
          Voice Interface
        </p>

        <div className="relative flex h-44 w-44 items-center justify-center">
          {/* Outer rings */}
          {isActive && (
            <>
              <span className="absolute inset-0 animate-pulse-ring rounded-full bg-primary/40" />
              <span
                className="absolute inset-0 animate-pulse-ring rounded-full bg-primary/30"
                style={{ animationDelay: "0.4s" }}
              />
            </>
          )}
          <span
            className={cn(
              "absolute inset-4 rounded-full border border-primary/30 transition-all",
              isActive && "animate-pulse-glow",
              "group-hover:border-primary/70"
            )}
          />

          <div
            className={cn(
              "relative z-10 flex h-28 w-28 items-center justify-center rounded-full transition-all duration-500",
              "bg-gradient-primary shadow-glow-primary group-hover:scale-105",
              isListening && "scale-110"
            )}
          >
            <AnimatePresence mode="wait">
              {isProcessing ? (
                <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Loader2 className="h-10 w-10 animate-spin text-primary-foreground" />
                </motion.div>
              ) : isSpeaking ? (
                <motion.div key="speak" initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}>
                  <Volume2 className="h-10 w-10 text-primary-foreground" />
                </motion.div>
              ) : isListening ? (
                <motion.div key="listen" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
                  <Mic className="h-10 w-10 text-primary-foreground" />
                </motion.div>
              ) : (
                <motion.div key="idle" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
                  <MicOff className="h-9 w-9 text-primary-foreground/80" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Waveform */}
        <Waveform active={isActive} />

        {/* Transcript / response */}
        <div className="min-h-[72px] w-full max-w-xl space-y-2 text-center">
          <AnimatePresence mode="wait">
            {transcript && (
              <motion.p
                key={transcript}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="font-mono text-sm text-muted-foreground"
              >
                "{transcript}"
              </motion.p>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {state === "executing" ? (
              <motion.p
                key="thinking"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-display text-base text-primary-glow"
              >
                Thinking
                <span className="inline-flex">
                  <Dot delay={0} /><Dot delay={0.15} /><Dot delay={0.3} />
                </span>
              </motion.p>
            ) : response ? (
              <motion.p
                key={response}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="font-display text-base text-foreground"
              >
                {response}
              </motion.p>
            ) : (
              <p className="text-sm text-muted-foreground">
                {isListening ? "I'm listening…" : "Click anywhere in this panel to start a voice command."}
              </p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </button>
  );
}

function Dot({ delay }: { delay: number }) {
  return (
    <motion.span
      animate={{ opacity: [0.2, 1, 0.2] }}
      transition={{ repeat: Infinity, duration: 1, delay }}
      className="ml-0.5"
    >
      .
    </motion.span>
  );
}

function Waveform({ active }: { active: boolean }) {
  const bars = 28;
  return (
    <div className="flex h-10 items-center gap-1">
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "w-1 rounded-full bg-gradient-to-t from-primary to-primary-glow transition-all",
            active ? "animate-wave" : "h-1 opacity-30"
          )}
          style={{
            height: active ? `${20 + Math.abs(Math.sin(i * 0.7)) * 28}px` : undefined,
            animationDelay: `${i * 0.06}s`,
            animationDuration: `${0.7 + (i % 5) * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
}
