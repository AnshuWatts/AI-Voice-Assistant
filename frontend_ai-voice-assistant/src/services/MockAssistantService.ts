import type { AssistantService } from "./AssistantService";
import type {
  AssistantStatus,
  CommandLog,
  SendCommandResult,
} from "@/types/assistant";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
const uid = () => Math.random().toString(36).slice(2, 10);

const COMMAND_RESPONSES: Array<{ match: RegExp; reply: (cmd: string) => string; category: string }> = [
  { match: /\b(who are you|your name|introduce)\b/i, reply: () => "I am Natasha, your personal AI assistant. Standing by.", category: "Identity" },
  { match: /\b(time|clock)\b/i, reply: () => `The current time is ${new Date().toLocaleTimeString()}.`, category: "Time" },
  { match: /\b(date|today)\b/i, reply: () => `Today is ${new Date().toDateString()}.`, category: "Date" },
  { match: /\b(open\s+youtube)\b/i, reply: () => "Opening YouTube in your browser.", category: "Browser" },
  { match: /\b(open\s+google)\b/i, reply: () => "Opening Google.", category: "Browser" },
  { match: /\b(open\s+facebook)\b/i, reply: () => "Opening Facebook.", category: "Browser" },
  { match: /\b(whatsapp)\b/i, reply: () => "Launching WhatsApp Web.", category: "Browser" },
  { match: /\b(search\s+(.+))\b/i, reply: (c) => `Searching the web for "${c.replace(/.*search\s+/i, "")}".`, category: "Search" },
  { match: /\b(wikipedia\s+(.+))\b/i, reply: (c) => `According to Wikipedia: ${c.replace(/.*wikipedia\s+/i, "")} is a fascinating topic.`, category: "Search" },
  { match: /\b(cpu|battery)\b/i, reply: () => "CPU at 34% load. Battery at 78% and discharging.", category: "System" },
  { match: /\b(screenshot)\b/i, reply: () => "Screenshot captured and saved to your desktop.", category: "System" },
  { match: /\b(news|headlines)\b/i, reply: () => "Top headline: AI assistants are reshaping productivity in 2026.", category: "News" },
  { match: /\b(note|remember)\b/i, reply: () => "Got it. I'll remember that for you.", category: "Notes" },
  { match: /\b(song|play music)\b/i, reply: () => "Playing your favorite track.", category: "Media" },
  { match: /\b(location|where am i)\b/i, reply: () => "You appear to be in Colombo, Sri Lanka.", category: "Location" },
  { match: /\b(calculate|what is\s+\d)\b/i, reply: () => "The answer is 42.", category: "Math" },
  { match: /\b(shutdown|restart|lock|logout)\b/i, reply: () => "System command acknowledged. Awaiting confirmation.", category: "System" },
  { match: /\b(sleep|stop listening)\b/i, reply: () => "Going to sleep. Wake me when you need me.", category: "Control" },
];

function resolveResponse(cmd: string) {
  for (const r of COMMAND_RESPONSES) {
    if (r.match.test(cmd)) return { text: r.reply(cmd), category: r.category };
  }
  return { text: `I heard "${cmd}". Working on it.`, category: "General" };
}

const SAMPLE_HISTORY: CommandLog[] = [
  { id: uid(), command: "What time is it?", response: "The current time is 09:42.", status: "success", timestamp: Date.now() - 1000 * 60 * 12, category: "Time" },
  { id: uid(), command: "Open YouTube", response: "Opening YouTube in your browser.", status: "success", timestamp: Date.now() - 1000 * 60 * 28, category: "Browser" },
  { id: uid(), command: "Take a screenshot", response: "Screenshot captured.", status: "success", timestamp: Date.now() - 1000 * 60 * 41, category: "System" },
  { id: uid(), command: "Play song Sinhala", response: "Playing your favorite track.", status: "success", timestamp: Date.now() - 1000 * 60 * 55, category: "Media" },
  { id: uid(), command: "Send WhatsApp to John", response: "Recipient not found.", status: "error", timestamp: Date.now() - 1000 * 60 * 68, category: "Messaging" },
];

const SAMPLE_TRANSCRIPTS = [
  "What's the weather like today?",
  "Open YouTube",
  "Take a screenshot",
  "Read the news headlines",
  "What time is it?",
  "Play a Sinhala song",
];

export class MockAssistantService implements AssistantService {
  private status: AssistantStatus = {
    state: "idle",
    connection: "mock",
    micAvailable: true,
    voiceOutputEnabled: true,
    lastCommand: undefined,
  };
  private history: CommandLog[] = [...SAMPLE_HISTORY];
  private listeners = new Set<(s: AssistantStatus) => void>();

  private setStatus(patch: Partial<AssistantStatus>) {
    this.status = { ...this.status, ...patch };
    this.listeners.forEach((l) => l(this.status));
  }

  subscribe(listener: (s: AssistantStatus) => void) {
    this.listeners.add(listener);
    listener(this.status);
    return () => this.listeners.delete(listener);
  }

  async getStatus() {
    return this.status;
  }

  async startListening() {
    this.setStatus({ state: "listening" });
    await delay(1400);
    this.setStatus({ state: "recognizing" });
    await delay(900);
    const transcript = SAMPLE_TRANSCRIPTS[Math.floor(Math.random() * SAMPLE_TRANSCRIPTS.length)];
    this.setStatus({ state: "idle" });
    return { transcript };
  }

  async stopListening() {
    this.setStatus({ state: "idle" });
  }

  async sendTextCommand(command: string) {
    this.setStatus({ state: "executing", lastCommand: command });
    await delay(700 + Math.random() * 600);

    const { text, category } = resolveResponse(command);

    if (this.status.voiceOutputEnabled) {
      this.setStatus({ state: "speaking" });
      await delay(900);
    }

    const log: CommandLog = {
      id: uid(),
      command,
      response: text,
      status: "success",
      timestamp: Date.now(),
      category,
    };
    this.history = [log, ...this.history].slice(0, 100);

    this.setStatus({ state: "idle" });

    return {
      message: {
        id: uid(),
        role: "assistant" as const,
        text,
        timestamp: Date.now(),
      },
      log,
    };
  }

  async getHistory() {
    return this.history;
  }

  async toggleVoiceOutput(enabled: boolean) {
    this.setStatus({ voiceOutputEnabled: enabled });
    return this.status;
  }
}

export const mockAssistantService = new MockAssistantService();
