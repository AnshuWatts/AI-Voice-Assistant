import { useNavigate } from "react-router-dom";
import { QuickActions } from "@/components/QuickActions";
import { useAssistantContext } from "@/context/AssistantContext";

export default function Skills() {
  const { sendCommand } = useAssistantContext();
  const navigate = useNavigate();

  const handleSelect = (command: string) => {
    navigate("/");
    // Defer so the dashboard mounts before the command resolves
    setTimeout(() => sendCommand(command), 50);
  };

  return <QuickActions onSelect={handleSelect} />;
}
