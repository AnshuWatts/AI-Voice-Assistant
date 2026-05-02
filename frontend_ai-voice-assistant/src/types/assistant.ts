export type AssistantState =
  | "password_required"
  | "idle"
  | "listening"
  | "recognizing"
  | "executing"
  | "speaking"
  | "sleeping"
  | "offline"
  | "error";

export type ConnectionState = "connected" | "mock" | "disconnected";

export type InputMode = "voice" | "text" | "hybrid";

export interface AssistantStatus {
  state: AssistantState;
  connection: ConnectionState;
  micAvailable: boolean;
  voiceOutputEnabled: boolean;
  lastCommand?: string;
}

export type MessageRole = "user" | "assistant" | "system";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  text: string;
  timestamp: number;
  pending?: boolean;
}

export type CommandStatus = "success" | "error" | "pending";

export interface CommandLog {
  id: string;
  command: string;
  response: string;
  status: CommandStatus;
  timestamp: number;
  category?: string;
}

export interface AssistantSettings {
  voiceOutputEnabled: boolean;
  inputMode: InputMode;
  sensitivity: number; // 0-100
  themeMode: "neon" | "minimal";
}

export interface SendCommandResult {
  message: ChatMessage;
  log: CommandLog;
}
