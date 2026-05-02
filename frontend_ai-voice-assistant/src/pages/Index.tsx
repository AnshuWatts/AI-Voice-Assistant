import { useMemo, useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { TopStatusBar } from "@/components/TopStatusBar";
import { VoiceInteractionPanel } from "@/components/VoiceInteractionPanel";
import { ChatInterface } from "@/components/ChatInterface";
import { SystemStatusPanel } from "@/components/SystemStatusPanel";
import { CommandHistoryPanel } from "@/components/CommandHistoryPanel";
import { QuickActions } from "@/components/QuickActions";
import { SettingsPanel } from "@/components/SettingsPanel";
import { useAssistant } from "@/hooks/useAssistant";

const Index = () => {
  const [active, setActive] = useState("dashboard");
  const {
    status,
    messages,
    history,
    settings,
    sendCommand,
    startListening,
    updateSettings,
  } = useAssistant();

  const lastUser = useMemo(
    () => [...messages].reverse().find((m) => m.role === "user")?.text,
    [messages]
  );
  const lastAssistant = useMemo(
    () => [...messages].reverse().find((m) => m.role === "assistant" && !m.pending)?.text,
    [messages]
  );

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <AppSidebar active={active} onSelect={setActive} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <TopStatusBar status={status} />

        <main className="flex-1 overflow-y-auto p-5">
          <div className="mx-auto grid w-full max-w-[1500px] grid-cols-1 gap-5 lg:grid-cols-12">
            {/* Left column */}
            <section className="space-y-5 lg:col-span-8">
              <VoiceInteractionPanel
                state={status.state}
                transcript={lastUser}
                response={lastAssistant}
                onToggle={startListening}
              />

              <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                <ChatInterface messages={messages} onSend={sendCommand} />
                <CommandHistoryPanel history={history} />
              </div>

              <QuickActions onSelect={sendCommand} />
            </section>

            {/* Right column */}
            <aside className="space-y-5 lg:col-span-4">
              <SystemStatusPanel status={status} />
              <SettingsPanel settings={settings} onChange={updateSettings} />
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
