import type { AssistantService } from "./AssistantService";
import type {
  AssistantStatus,
  CommandLog,
  SendCommandResult,
} from "@/types/assistant";

/**
 * HTTP adapter for the Python bridge API.
 *
 * Endpoints:
 *   GET    /status
 *   POST   /listen/start    -> { transcript }
 *   POST   /listen/stop
 *   POST   /command         { command }  -> { message, log }
 *   GET    /history
 *   POST   /settings/voice  { enabled }
 */
export class HttpAssistantService implements AssistantService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/+$/, "");
  }

  private async req<T>(path: string, init?: RequestInit): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...init,
    });
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    return res.json() as Promise<T>;
  }

  getStatus() {
    return this.req<AssistantStatus>("/status");
  }

  startListening() {
    return this.req<{ transcript: string }>("/listen/start", { method: "POST" });
  }

  async stopListening() {
    await this.req<void>("/listen/stop", { method: "POST" });
  }

  sendTextCommand(command: string) {
    return this.req<SendCommandResult>("/command", {
      method: "POST",
      body: JSON.stringify({ command }),
    });
  }

  getHistory() {
    return this.req<CommandLog[]>("/history");
  }

  toggleVoiceOutput(enabled: boolean) {
    return this.req<AssistantStatus>("/settings/voice", {
      method: "POST",
      body: JSON.stringify({ enabled }),
    });
  }

  subscribe(listener: (status: AssistantStatus) => void) {
    let cancelled = false;

    const poll = async () => {
      try {
        const status = await this.getStatus();
        if (!cancelled) listener(status);
      } catch {
        if (!cancelled) {
          listener({
            state: "offline",
            connection: "disconnected",
            micAvailable: false,
            voiceOutputEnabled: false,
          });
        }
      }
    };

    void poll();
    const id = window.setInterval(() => void poll(), 1200);

    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }
}
