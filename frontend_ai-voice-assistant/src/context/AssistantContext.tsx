import { createContext, useContext, ReactNode } from "react";
import { useAssistant } from "@/hooks/useAssistant";

type AssistantCtx = ReturnType<typeof useAssistant>;

const Ctx = createContext<AssistantCtx | null>(null);

export function AssistantProvider({ children }: { children: ReactNode }) {
  const value = useAssistant();
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAssistantContext() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAssistantContext must be used within AssistantProvider");
  return v;
}
