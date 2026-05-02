import { SettingsPanel } from "@/components/SettingsPanel";
import { useAssistantContext } from "@/context/AssistantContext";

export default function Settings() {
  const { settings, updateSettings } = useAssistantContext();
  return (
    <div className="mx-auto max-w-2xl">
      <SettingsPanel settings={settings} onChange={updateSettings} />
    </div>
  );
}
