import { CommandHistoryPanel } from "@/components/CommandHistoryPanel";
import { useAssistantContext } from "@/context/AssistantContext";

export default function Activity() {
  const { history } = useAssistantContext();
  return (
    <div className="h-[calc(100vh-9rem)]">
      <CommandHistoryPanel history={history} />
    </div>
  );
}
