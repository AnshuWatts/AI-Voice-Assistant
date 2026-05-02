import { Settings as SettingsIcon, Volume2, VolumeX, Mic, Keyboard, Sparkles } from "lucide-react";
import type { AssistantSettings, InputMode } from "@/types/assistant";
import { cn } from "@/lib/utils";

interface Props {
  settings: AssistantSettings;
  onChange: (patch: Partial<AssistantSettings>) => void;
}

const MODES: Array<{ id: InputMode; label: string; icon: React.ElementType }> = [
  { id: "voice", label: "Voice", icon: Mic },
  { id: "text", label: "Text", icon: Keyboard },
  { id: "hybrid", label: "Hybrid", icon: Sparkles },
];

export function SettingsPanel({ settings, onChange }: Props) {
  return (
    <div className="glass-panel p-5">
      <div className="mb-4 flex items-center gap-2">
        <SettingsIcon className="h-4 w-4 text-primary-glow" />
        <h3 className="font-display text-sm font-semibold tracking-wide">Settings</h3>
      </div>

      <div className="space-y-5">
        {/* Voice output */}
        <div className="flex items-center justify-between rounded-xl border border-border/25 bg-card/40 p-3 transition-all duration-200 hover:border-primary/50 hover:bg-primary/5">
          <div className="flex items-center gap-2">
            {settings.voiceOutputEnabled ? (
              <Volume2 className="h-4 w-4 text-primary-glow" />
            ) : (
              <VolumeX className="h-4 w-4 text-muted-foreground" />
            )}
            <div>
              <p className="text-sm font-medium">Voice Output</p>
              <p className="text-[11px] text-muted-foreground">Speak responses out loud</p>
            </div>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={settings.voiceOutputEnabled}
            onClick={() => onChange({ voiceOutputEnabled: !settings.voiceOutputEnabled })}
            className={cn(
              "relative h-6 w-11 shrink-0 overflow-hidden rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
              settings.voiceOutputEnabled
                ? "bg-primary hover:bg-primary/90"
                : "bg-secondary hover:bg-primary/20 active:bg-primary/30"
            )}
          >
            <span
              className={cn(
                "absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-primary-foreground shadow-md transition-transform duration-200",
                settings.voiceOutputEnabled ? "translate-x-5" : "translate-x-0"
              )}
            />
          </button>
        </div>

        {/* Input mode */}
        <div className="rounded-xl border border-border/25 bg-card/40 p-3 transition-all duration-200 hover:border-primary/40">
          <p className="mb-2 text-sm font-medium">Input Mode</p>
          <div className="grid grid-cols-3 gap-1.5">
            {MODES.map((m) => {
              const Icon = m.icon;
              const active = settings.inputMode === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => onChange({ inputMode: m.id })}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-lg border px-2 py-2 text-xs transition-all duration-200",
                    active
                      ? "border-primary/60 bg-primary/10 text-foreground shadow-glow-soft"
                      : "border-border/25 text-muted-foreground hover:border-primary/50 hover:bg-primary/5 hover:text-foreground active:border-primary"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {m.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sensitivity */}
        <div className="rounded-xl border border-border/25 bg-card/40 p-3 transition-all duration-200 hover:border-primary/40">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-medium">Mic Sensitivity</p>
            <span className="font-mono text-xs text-primary-glow">{settings.sensitivity}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={settings.sensitivity}
            onChange={(e) => onChange({ sensitivity: Number(e.target.value) })}
            className="w-full accent-primary"
          />
          <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
            <span>Low</span>
            <span>High</span>
          </div>
        </div>
      </div>
    </div>
  );
}
