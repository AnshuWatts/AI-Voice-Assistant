import { motion } from "framer-motion";
import {
  Clock,
  Globe,
  Search,
  Newspaper,
  Music,
  Camera,
  Cpu,
  StickyNote,
  MessageCircle,
  MapPin,
  Calculator,
  Power,
} from "lucide-react";

const SKILLS = [
  { label: "What time is it?", icon: Clock, group: "Time" },
  { label: "Open YouTube", icon: Globe, group: "Browser" },
  { label: "Search Google for AI news", icon: Search, group: "Search" },
  { label: "Read the news headlines", icon: Newspaper, group: "News" },
  { label: "Play a Sinhala song", icon: Music, group: "Media" },
  { label: "Take a screenshot", icon: Camera, group: "System" },
  { label: "CPU and battery status", icon: Cpu, group: "System" },
  { label: "Take a note", icon: StickyNote, group: "Notes" },
  { label: "Send WhatsApp message", icon: MessageCircle, group: "Messaging" },
  { label: "Where am I?", icon: MapPin, group: "Location" },
  { label: "Calculate 24 * 18", icon: Calculator, group: "Math" },
  { label: "Lock the system", icon: Power, group: "Control" },
];

interface Props {
  onSelect: (command: string) => void;
}

export function QuickActions({ onSelect }: Props) {
  return (
    <div className="glass-panel p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-sm font-semibold tracking-wide">Quick Skills</h3>
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
          Tap to run
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
        {SKILLS.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.button
              key={s.label}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelect(s.label)}
              className="group flex items-center gap-2.5 rounded-xl border border-border/30 bg-card/40 p-3 text-left transition-all duration-200 hover:border-primary/60 hover:bg-primary/5 hover:shadow-glow-soft active:border-primary active:bg-primary/10"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary-glow transition-colors group-hover:bg-primary/20">
                <Icon className="h-4 w-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-xs font-medium">{s.label}</span>
                <span className="block text-[10px] text-muted-foreground">{s.group}</span>
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
