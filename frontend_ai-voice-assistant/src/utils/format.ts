import type { AssistantState, ConnectionState } from "@/types/assistant";

export const stateLabels: Record<AssistantState, string> = {
  password_required: "Auth Required",
  idle: "Idle",
  listening: "Listening",
  recognizing: "Recognizing",
  executing: "Executing",
  speaking: "Speaking",
  sleeping: "Sleeping",
  offline: "Offline",
  error: "Error",
};

export const stateColors: Record<AssistantState, string> = {
  password_required: "text-warning",
  idle: "text-muted-foreground",
  listening: "text-primary-glow",
  recognizing: "text-info",
  executing: "text-primary",
  speaking: "text-success",
  sleeping: "text-muted-foreground",
  offline: "text-destructive",
  error: "text-destructive",
};

export const connectionLabels: Record<ConnectionState, string> = {
  connected: "Live Backend",
  mock: "Simulated",
  disconnected: "Disconnected",
};

export function formatTime(ts: number) {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function formatRelative(ts: number) {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return new Date(ts).toLocaleDateString();
}
