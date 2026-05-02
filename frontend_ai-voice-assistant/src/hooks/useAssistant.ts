import { useCallback, useEffect, useState } from "react";
import { assistantService } from "@/services";
import type {
  AssistantSettings,
  AssistantStatus,
  ChatMessage,
  CommandLog,
} from "@/types/assistant";

const uid = () => Math.random().toString(36).slice(2, 10);

const initialStatus: AssistantStatus = {
  state: "idle",
  connection: "disconnected",
  micAvailable: false,
  voiceOutputEnabled: true,
};

export function useAssistant() {
  const [status, setStatus] = useState<AssistantStatus>(initialStatus);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: uid(),
      role: "assistant",
      text: "Hello — I'm Natasha. Ask me anything, or tap the mic to speak.",
      timestamp: Date.now(),
    },
  ]);
  const [history, setHistory] = useState<CommandLog[]>([]);
  const [settings, setSettings] = useState<AssistantSettings>({
    voiceOutputEnabled: true,
    inputMode: "hybrid",
    sensitivity: 65,
    themeMode: "neon",
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsub = assistantService.subscribe?.(setStatus);
    assistantService.getStatus().then(setStatus).catch(() => {});
    assistantService.getHistory().then(setHistory).catch(() => {});
    return () => { unsub?.(); };
  }, []);

  const sendCommand = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setError(null);

    const userMsg: ChatMessage = {
      id: uid(),
      role: "user",
      text: trimmed,
      timestamp: Date.now(),
    };
    const pendingMsg: ChatMessage = {
      id: uid(),
      role: "assistant",
      text: "",
      timestamp: Date.now(),
      pending: true,
    };
    setMessages((m) => [...m, userMsg, pendingMsg]);

    try {
      const { message, log } = await assistantService.sendTextCommand(trimmed);
      setMessages((m) => m.map((msg) => (msg.id === pendingMsg.id ? message : msg)));
      setHistory((h) => [log, ...h]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Command failed");
      setMessages((m) => m.filter((msg) => msg.id !== pendingMsg.id));
    }
  }, []);

  const startListening = useCallback(async () => {
    try {
      const { transcript } = await assistantService.startListening();
      if (transcript) await sendCommand(transcript);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Listening failed");
    }
  }, [sendCommand]);

  const stopListening = useCallback(() => assistantService.stopListening(), []);

  const toggleVoice = useCallback(async (enabled: boolean) => {
    setSettings((s) => ({ ...s, voiceOutputEnabled: enabled }));
    await assistantService.toggleVoiceOutput(enabled);
  }, []);

  const updateSettings = useCallback((patch: Partial<AssistantSettings>) => {
    setSettings((s) => ({ ...s, ...patch }));
    if (patch.voiceOutputEnabled !== undefined) {
      assistantService.toggleVoiceOutput(patch.voiceOutputEnabled).catch(() => {});
    }
  }, []);

  return {
    status,
    messages,
    history,
    settings,
    error,
    sendCommand,
    startListening,
    stopListening,
    toggleVoice,
    updateSettings,
  };
}
