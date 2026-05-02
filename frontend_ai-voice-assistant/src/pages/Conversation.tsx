import { ChatInterface } from "@/components/ChatInterface";
import { useAssistantContext } from "@/context/AssistantContext";

export default function Conversation() {
  const { messages, sendCommand } = useAssistantContext();
  return (
    <div className="h-[calc(100vh-9rem)]">
      <ChatInterface messages={messages} onSend={sendCommand} />
    </div>
  );
}
