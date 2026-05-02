import type {
  AssistantStatus,
  ChatMessage,
  CommandLog,
  SendCommandResult,
} from "@/types/assistant";

export interface AssistantService {
  getStatus(): Promise<AssistantStatus>;
  startListening(): Promise<{ transcript: string }>;
  stopListening(): Promise<void>;
  sendTextCommand(command: string): Promise<SendCommandResult>;
  getHistory(): Promise<CommandLog[]>;
  toggleVoiceOutput(enabled: boolean): Promise<AssistantStatus>;
  subscribe?(listener: (status: AssistantStatus) => void): () => void;
}

export interface ChatStreamEvent {
  message: ChatMessage;
}
