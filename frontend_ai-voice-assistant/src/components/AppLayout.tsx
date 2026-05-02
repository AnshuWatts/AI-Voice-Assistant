import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { TopStatusBar } from "@/components/TopStatusBar";
import { useAssistantContext } from "@/context/AssistantContext";

const pathToId: Record<string, string> = {
  "/dashboard": "dashboard",
  "/conversation": "chat",
  "/activity": "history",
  "/skills": "skills",
  "/settings": "settings",
};

const idToPath: Record<string, string> = {
  dashboard: "/dashboard",
  chat: "/conversation",
  history: "/activity",
  skills: "/skills",
  settings: "/settings",
};

export function AppLayout() {
  const { status } = useAssistantContext();
  const location = useLocation();
  const navigate = useNavigate();
  const active = pathToId[location.pathname] ?? "dashboard";

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <AppSidebar active={active} onSelect={(id) => navigate(idToPath[id] ?? "/dashboard")} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopStatusBar status={status} />
        <main className="flex-1 overflow-y-auto p-5">
          <div className="mx-auto w-full max-w-[1500px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
