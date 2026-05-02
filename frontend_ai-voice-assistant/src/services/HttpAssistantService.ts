import type { AssistantService } from "./AssistantService";
import type {
  AssistantStatus,
  CommandLog,
  SendCommandResult,
} from "@/types/assistant";

/**
 * HTTP adapter for a future Python bridge API (e.g. FastAPI wrapping main.py).
 *
 * Expected (suggested) endpoints — not yet implemented on the backend:
 *   GET    /status
 *   POST   /listen/start    -> { transcript }
 *   POST   /listen/stop
 *   POST   /command         { command }  -> { message, log }
 *   GET    /history
 *   POST   /settings/voice  { enabled }
 *
 * Until the bridge exists, instantiate MockAssistantService instead.
 */
export class HttpAssistantService implements AssistantService {
  constructor(private baseUrl: string) {}

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
}
