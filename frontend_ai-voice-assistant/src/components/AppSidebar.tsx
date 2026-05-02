import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  MessageSquare,
  History,
  Settings,
  Sparkles,
  Power,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "chat", label: "Conversation", icon: MessageSquare },
  { id: "history", label: "Activity Log", icon: History },
  { id: "skills", label: "Skills", icon: Sparkles },
  { id: "settings", label: "Settings", icon: Settings },
];

interface Props {
  active: string;
  onSelect: (id: string) => void;
}

export function AppSidebar({ active, onSelect }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleShutdown = () => {
    sessionStorage.removeItem("natasha:auth");
    sessionStorage.removeItem("natasha:user");
    navigate("/signin", { replace: true });
  };

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex h-full flex-col border-r border-sidebar-border bg-sidebar/60 backdrop-blur-xl"
    >
      <div className="flex items-center gap-3 px-4 py-5">
        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-primary shadow-glow-primary">
          <span className="font-display text-lg font-bold text-primary-foreground">N</span>
          <span className="absolute -inset-1 rounded-2xl bg-primary/20 blur-md" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="font-display text-sm font-bold tracking-wider">NATASHA</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Online
            </p>
          </div>
        )}
      </div>

      <nav className="flex-1 px-3 py-2">
        <ul className="space-y-1">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onSelect(item.id)}
                  className={cn(
                    "group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-300",
                    isActive
                      ? "bg-sidebar-accent text-foreground shadow-glow-soft"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-foreground"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="sidebar-active"
                      className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-gradient-primary"
                    />
                  )}
                  <Icon className={cn("h-4.5 w-4.5 shrink-0", isActive && "text-primary-glow")} />
                  {!collapsed && <span className="truncate font-medium">{item.label}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <button
          onClick={handleShutdown}
          className={cn(
            "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent/50 hover:text-destructive"
          )}
        >
          <Power className="h-4.5 w-4.5 shrink-0" />
          {!collapsed && <span>Shutdown</span>}
        </button>
      </div>

      <button
        onClick={() => setCollapsed((c) => !c)}
        className="absolute -right-3 top-20 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-md transition-colors hover:text-foreground"
        aria-label="Toggle sidebar"
      >
        {collapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
      </button>
    </motion.aside>
  );
}
